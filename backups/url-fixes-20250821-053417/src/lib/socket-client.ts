'use client'

import { io, Socket } from 'socket.io-client'
import { ChatMessage, ChatRoom, ChatUser, PortuguesePoll } from '@/types/chat'

interface ServerToClientEvents {
  'chat:message': (message: ChatMessage) => void
  'chat:user-joined': (user: ChatUser) => void
  'chat:user-left': (userId: string) => void
  'chat:viewer-count': (count: number) => void
  'chat:room-update': (room: ChatRoom) => void
  'chat:message-deleted': (messageId: string) => void
  'chat:user-timeout': (userId: string, duration: number) => void
  'chat:poll-created': (poll: PortuguesePoll) => void
  'chat:poll-updated': (poll: PortuguesePoll) => void
  'chat:reaction-added': (messageId: string, emoji: string, userId: string) => void
  'chat:moderation-action': (action: any) => void
  'connection:error': (error: string) => void
  'connection:reconnect': () => void
}

interface ClientToServerEvents {
  'chat:join-room': (roomId: string, userId: string) => void
  'chat:leave-room': (roomId: string) => void
  'chat:send-message': (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void
  'chat:add-reaction': (messageId: string, emoji: string) => void
  'chat:create-poll': (poll: Omit<PortuguesePoll, 'id' | 'timestamp'>) => void
  'chat:vote-poll': (pollId: string, optionId: string) => void
  'moderation:delete-message': (messageId: string) => void
  'moderation:timeout-user': (userId: string, duration: number) => void
  'moderation:ban-user': (userId: string) => void
}

class SocketManager {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null
  private isConnected = false
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private currentRoom: string | null = null

  connect(userId: string, region: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // In production, this would be your Socket.io server URL
        const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'
        
        this.socket = io(socketUrl, {
          auth: {
            userId,
            region
          },
          transports: ['websocket', 'polling'],
          timeout: 10000,
          forceNew: true
        })

        this.socket.on('connect', () => {
          this.isConnected = true
          this.reconnectAttempts = 0
          resolve()
        })

        this.socket.on('disconnect', (reason) => {
          this.isConnected = false
          
          // Attempt reconnection for certain disconnect reasons
          if (reason === 'io server disconnect') {
            // Server initiated disconnect, don't reconnect
            return
          }
          
          this.handleReconnection()
        })

        this.socket.on('connect_error', (error) => {
          console.error('Socket connection error:', error)
          this.isConnected = false
          
          if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.handleReconnection()
          } else {
            reject(new Error('Failed to connect to chat server after multiple attempts'))
          }
        })

        this.socket.on('connection:error', (error) => {
          console.error('Chat server error:', error)
        })

        this.socket.on('connection:reconnect', () => {
          // Re-join current room if exists
          if (this.currentRoom && userId) {
            this.joinRoom(this.currentRoom, userId)
          }
        })

      } catch (error) {
        reject(error)
      }
    })
  }

  private handleReconnection() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached')
      return
    }

    this.reconnectAttempts++
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000)
    
    
    setTimeout(() => {
      if (this.socket && !this.isConnected) {
        this.socket.connect()
      }
    }, delay)
  }

  joinRoom(roomId: string, userId: string) {
    if (!this.socket || !this.isConnected) {
      console.warn('Socket not connected, cannot join room')
      return
    }

    this.currentRoom = roomId
    this.socket.emit('chat:join-room', roomId, userId)
  }

  leaveRoom(roomId: string) {
    if (!this.socket || !this.isConnected) {
      return
    }

    this.socket.emit('chat:leave-room', roomId)
    this.currentRoom = null
  }

  sendMessage(message: Omit<ChatMessage, 'id' | 'timestamp'>) {
    if (!this.socket || !this.isConnected) {
      console.warn('Socket not connected, cannot send message')
      return
    }

    this.socket.emit('chat:send-message', message)
  }

  addReaction(messageId: string, emoji: string) {
    if (!this.socket || !this.isConnected) {
      return
    }

    this.socket.emit('chat:add-reaction', messageId, emoji)
  }

  createPoll(poll: Omit<PortuguesePoll, 'id' | 'timestamp'>) {
    if (!this.socket || !this.isConnected) {
      return
    }

    this.socket.emit('chat:create-poll', poll)
  }

  votePoll(pollId: string, optionId: string) {
    if (!this.socket || !this.isConnected) {
      return
    }

    this.socket.emit('chat:vote-poll', pollId, optionId)
  }

  // Moderation functions
  deleteMessage(messageId: string) {
    if (!this.socket || !this.isConnected) {
      return
    }

    this.socket.emit('moderation:delete-message', messageId)
  }

  timeoutUser(userId: string, duration: number) {
    if (!this.socket || !this.isConnected) {
      return
    }

    this.socket.emit('moderation:timeout-user', userId, duration)
  }

  banUser(userId: string) {
    if (!this.socket || !this.isConnected) {
      return
    }

    this.socket.emit('moderation:ban-user', userId)
  }

  // Event listeners
  onMessage(callback: (message: ChatMessage) => void) {
    this.socket?.on('chat:message', callback)
  }

  onUserJoined(callback: (user: ChatUser) => void) {
    this.socket?.on('chat:user-joined', callback)
  }

  onUserLeft(callback: (userId: string) => void) {
    this.socket?.on('chat:user-left', callback)
  }

  onViewerCount(callback: (count: number) => void) {
    this.socket?.on('chat:viewer-count', callback)
  }

  onRoomUpdate(callback: (room: ChatRoom) => void) {
    this.socket?.on('chat:room-update', callback)
  }

  onMessageDeleted(callback: (messageId: string) => void) {
    this.socket?.on('chat:message-deleted', callback)
  }

  onUserTimeout(callback: (userId: string, duration: number) => void) {
    this.socket?.on('chat:user-timeout', callback)
  }

  onPollCreated(callback: (poll: PortuguesePoll) => void) {
    this.socket?.on('chat:poll-created', callback)
  }

  onPollUpdated(callback: (poll: PortuguesePoll) => void) {
    this.socket?.on('chat:poll-updated', callback)
  }

  onReactionAdded(callback: (messageId: string, emoji: string, userId: string) => void) {
    this.socket?.on('chat:reaction-added', callback)
  }

  onModerationAction(callback: (action: any) => void) {
    this.socket?.on('chat:moderation-action', callback)
  }

  // Cleanup
  removeAllListeners() {
    this.socket?.removeAllListeners()
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
    this.isConnected = false
    this.currentRoom = null
    this.reconnectAttempts = 0
  }

  get connected() {
    return this.isConnected
  }
}

// Singleton instance
export const socketManager = new SocketManager()
export default socketManager