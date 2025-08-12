'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeftIcon,
  UsersIcon,
  PaperAirplaneIcon,
  FaceSmileIcon,
  PhotoIcon,
  EllipsisVerticalIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import Header from '@/components/Header'
import { 
  ChatRoom, 
  ChatMessage, 
  TypingIndicator, 
  UserPresence,
  messagingService 
} from '@/lib/messaging'
import { authService } from '@/lib/auth'

// Emoji picker data
const QUICK_EMOJIS = ['❤️', '👍', '😊', '😮', '😢', '😡', '🔥', '👏']

const EmojiReaction = ({ 
  emoji, 
  count, 
  hasReacted, 
  onToggle 
}: { 
  emoji: string
  count: number
  hasReacted: boolean
  onToggle: () => void
}) => (
  <button
    onClick={onToggle}
    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
      hasReacted 
        ? 'bg-primary-100 text-primary-700 border border-primary-200' 
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    <span>{emoji}</span>
    <span className="font-medium">{count}</span>
  </button>
)

const MessageBubble = ({ 
  message, 
  isOwnMessage, 
  currentUserId, 
  onReact, 
  onReply, 
  onEdit, 
  onDelete 
}: {
  message: ChatMessage
  isOwnMessage: boolean
  currentUserId: string
  onReact: (messageId: string, emoji: string) => void
  onReply: (message: ChatMessage) => void
  onEdit: (message: ChatMessage) => void
  onDelete: (messageId: string) => void
}) => {
  const [showActions, setShowActions] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const getMembershipBadgeColor = (tier: string) => {
    switch (tier) {
      case 'premium': return 'bg-purple-100 text-purple-700'
      case 'core': return 'bg-primary-100 text-primary-700'
      default: return 'bg-green-100 text-green-700'
    }
  }

  // Group reactions by emoji
  const groupedReactions = message.reactions.reduce((acc, reaction) => {
    if (!acc[reaction.emoji]) {
      acc[reaction.emoji] = { count: 0, hasReacted: false, users: [] }
    }
    acc[reaction.emoji].count++
    acc[reaction.emoji].users.push(reaction.userName)
    if (reaction.userId === currentUserId) {
      acc[reaction.emoji].hasReacted = true
    }
    return acc
  }, {} as Record<string, { count: number; hasReacted: boolean; users: string[] }>)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 group ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => {
        setShowActions(false)
        setShowEmojiPicker(false)
      }}
    >
      {!isOwnMessage && (
        <div className="flex-shrink-0">
          {message.userAvatar ? (
            <img
              src={message.userAvatar}
              alt={message.userName}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {message.userName[0]}
            </div>
          )}
        </div>
      )}

      <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'} max-w-lg`}>
        {/* Message header */}
        {!isOwnMessage && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-900">{message.userName}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${getMembershipBadgeColor(message.membershipTier)}`}>
              {message.membershipTier}
            </span>
            <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
          </div>
        )}

        {/* Reply context */}
        {message.replyTo && (
          <div className="mb-2 p-2 bg-gray-50 rounded-lg border-l-4 border-gray-300 text-sm text-gray-600">
            <div className="font-medium">Replying to message</div>
            <div className="truncate">Original message content...</div>
          </div>
        )}

        {/* Message bubble */}
        <div className="relative">
          <div
            className={`px-4 py-2 rounded-2xl ${
              isOwnMessage
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                : 'bg-white border border-gray-200 text-gray-900'
            }`}
          >
            <div className="whitespace-pre-wrap break-words">{message.content}</div>
            
            {message.edited && (
              <div className="text-xs opacity-75 mt-1">
                Edited
              </div>
            )}

            {isOwnMessage && (
              <div className="text-xs opacity-75 mt-1">
                {formatTime(message.timestamp)}
              </div>
            )}
          </div>

          {/* Message actions */}
          <AnimatePresence>
            {showActions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`absolute top-0 flex gap-1 ${
                  isOwnMessage ? 'right-full mr-2' : 'left-full ml-2'
                }`}
              >
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-1 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  title="Add reaction"
                >
                  <FaceSmileIcon className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => onReply(message)}
                  className="p-1 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  title="Reply"
                >
                  <ChatBubbleLeftRightIcon className="w-4 h-4 text-gray-600" />
                </button>
                {isOwnMessage && (
                  <button
                    onClick={() => onEdit(message)}
                    className="p-1 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                    title="Edit"
                  >
                    <EllipsisVerticalIcon className="w-4 h-4 text-gray-600" />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Emoji picker */}
          <AnimatePresence>
            {showEmojiPicker && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`absolute top-full mt-2 bg-white rounded-lg shadow-lg border p-2 z-10 ${
                  isOwnMessage ? 'right-0' : 'left-0'
                }`}
              >
                <div className="flex gap-1">
                  {QUICK_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        onReact(message.id, emoji)
                        setShowEmojiPicker(false)
                      }}
                      className="p-1 hover:bg-gray-100 rounded text-lg"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Reactions */}
        {Object.keys(groupedReactions).length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {Object.entries(groupedReactions).map(([emoji, data]) => (
              <EmojiReaction
                key={emoji}
                emoji={emoji}
                count={data.count}
                hasReacted={data.hasReacted}
                onToggle={() => onReact(message.id, emoji)}
              />
            ))}
          </div>
        )}
      </div>

      {isOwnMessage && (
        <div className="flex-shrink-0">
          {message.userAvatar ? (
            <img
              src={message.userAvatar}
              alt={message.userName}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {message.userName[0]}
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

const TypingIndicators = ({ indicators }: { indicators: TypingIndicator[] }) => {
  if (indicators.length === 0) return null

  const names = indicators.map(i => i.userName).slice(0, 3)
  const remainingCount = indicators.length - 3

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600"
    >
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      <span>
        {names.join(', ')}
        {remainingCount > 0 && ` and ${remainingCount} other${remainingCount === 1 ? '' : 's'}`}
        {' '}
        {indicators.length === 1 ? 'is' : 'are'} typing...
      </span>
    </motion.div>
  )
}

const MessageInput = ({ 
  onSendMessage, 
  onTypingChange, 
  replyTo, 
  onCancelReply 
}: {
  onSendMessage: (content: string, replyTo?: string) => void
  onTypingChange: (isTyping: boolean) => void
  replyTo?: ChatMessage
  onCancelReply: () => void
}) => {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message.trim(), replyTo?.id)
      setMessage('')
      handleTypingStop()
    }
  }

  const handleTypingStart = () => {
    if (!isTyping) {
      setIsTyping(true)
      onTypingChange(true)
    }
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      handleTypingStop()
    }, 2000)
  }

  const handleTypingStop = () => {
    if (isTyping) {
      setIsTyping(false)
      onTypingChange(false)
    }
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  useEffect(() => {
    if (replyTo && inputRef.current) {
      inputRef.current.focus()
    }
  }, [replyTo])

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="border-t border-gray-200 bg-white">
      {/* Reply context */}
      <AnimatePresence>
        {replyTo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 border-b border-gray-100 bg-gray-50"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 mb-1">
                  Replying to {replyTo.userName}
                </div>
                <div className="text-sm text-gray-600 truncate">
                  {replyTo.content}
                </div>
              </div>
              <button
                onClick={onCancelReply}
                className="ml-2 p-1 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message input */}
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-end gap-3">
          <button
            type="button"
            className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Add photo"
          >
            <PhotoIcon className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                if (e.target.value.length > 0) {
                  handleTypingStart()
                } else {
                  handleTypingStop()
                }
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-none"
              style={{ maxHeight: '120px' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = 'auto'
                target.style.height = `${target.scrollHeight}px`
              }}
            />
          </div>

          <button
            type="button"
            className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Add emoji"
          >
            <FaceSmileIcon className="w-5 h-5" />
          </button>

          <button
            type="submit"
            disabled={!message.trim()}
            className="flex-shrink-0 p-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default function ChatRoomPage() {
  const params = useParams()
  const router = useRouter()
  const roomId = params.id as string

  const [room, setRoom] = useState<ChatRoom | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [typingIndicators, setTypingIndicators] = useState<TypingIndicator[]>([])
  const [userPresence, setUserPresence] = useState<UserPresence[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [replyTo, setReplyTo] = useState<ChatMessage | undefined>()
  const [editingMessage, setEditingMessage] = useState<ChatMessage | undefined>()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const currentUser = authService.getCurrentUser()

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load room data
  useEffect(() => {
    const loadRoom = async () => {
      if (!currentUser) {
        router.push('/login')
        return
      }

      try {
        setLoading(true)
        const roomData = await messagingService.getRoomById(roomId, currentUser.id)
        
        if (!roomData) {
          setError('Room not found')
          return
        }

        if (!roomData.isJoined) {
          setError('You must join this room to view messages')
          return
        }

        setRoom(roomData)
        
        // Load initial messages
        const initialMessages = await messagingService.getMessages(roomId)
        setMessages(initialMessages)
        
      } catch (err) {
        console.error('Error loading room:', err)
        setError('Failed to load room')
      } finally {
        setLoading(false)
      }
    }

    loadRoom()
  }, [roomId, currentUser, router])

  // Set up real-time subscriptions
  useEffect(() => {
    if (!currentUser || !room?.isJoined) return

    // Subscribe to messages
    const unsubscribeMessages = messagingService.subscribeToMessages(roomId, (newMessages) => {
      setMessages(newMessages)
    })

    // Subscribe to typing indicators
    const unsubscribeTyping = messagingService.subscribeToTypingIndicators(roomId, (indicators) => {
      // Filter out current user's typing indicator
      const filteredIndicators = indicators.filter(indicator => indicator.userId !== currentUser.id)
      setTypingIndicators(filteredIndicators)
    })

    // Subscribe to user presence
    const unsubscribePresence = messagingService.subscribeToUserPresence(roomId, (presence) => {
      setUserPresence(presence)
    })

    // Update user presence to online
    messagingService.updateUserPresence(currentUser.id, true, 'online')

    return () => {
      unsubscribeMessages()
      unsubscribeTyping()
      unsubscribePresence()
      
      // Update user presence to offline when leaving
      messagingService.updateUserPresence(currentUser.id, false, 'offline')
    }
  }, [roomId, currentUser, room?.isJoined])

  // Handle message sending
  const handleSendMessage = async (content: string, replyToId?: string) => {
    if (!currentUser || !room) return

    const result = await messagingService.sendMessage(
      roomId,
      currentUser.id,
      content,
      {
        name: currentUser.name,
        profileImage: currentUser.profileImage,
        membershipTier: currentUser.membershipTier
      },
      replyToId
    )

    if (!result.success) {
      alert(result.error || 'Failed to send message')
    }

    setReplyTo(undefined)
  }

  // Handle typing indicator
  const handleTypingChange = (isTyping: boolean) => {
    if (!currentUser) return
    messagingService.updateTypingIndicator(roomId, currentUser.id, isTyping)
  }

  // Handle reactions
  const handleReaction = async (messageId: string, emoji: string) => {
    if (!currentUser) return

    // Check if user already reacted with this emoji
    const message = messages.find(m => m.id === messageId)
    const existingReaction = message?.reactions.find(
      r => r.userId === currentUser.id && r.emoji === emoji
    )

    if (existingReaction) {
      // Remove reaction
      await messagingService.removeReaction(messageId, currentUser.id, emoji)
    } else {
      // Add reaction
      await messagingService.addReaction(messageId, currentUser.id, emoji, currentUser.name)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading chat room...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => router.push('/chat')}
              className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Back to Chat Rooms
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!room) {
    return null
  }

  const onlineMembers = userPresence.filter(p => p.isOnline).length

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Chat header */}
      <div className="pt-16 bg-white border-b border-gray-200 sticky top-16 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/chat')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3">
              {room.avatar ? (
                <img src={room.avatar} alt={room.name} className="w-10 h-10 rounded-lg object-cover" />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center text-white font-bold">
                  {room.name[0]}
                </div>
              )}
              
              <div>
                <h1 className="font-semibold text-gray-900">{room.name}</h1>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <UsersIcon className="w-4 h-4" />
                  <span>{room.currentMembers} members</span>
                  {onlineMembers > 0 && (
                    <>
                      <span>•</span>
                      <span className="text-green-600">{onlineMembers} online</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            title="Room info"
          >
            <InformationCircleIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwnMessage={message.userId === currentUser?.id}
              currentUserId={currentUser?.id || ''}
              onReact={handleReaction}
              onReply={setReplyTo}
              onEdit={setEditingMessage}
              onDelete={(messageId) => {
                if (currentUser) {
                  messagingService.deleteMessage(messageId, currentUser.id)
                }
              }}
            />
          ))}
        </AnimatePresence>
        
        <TypingIndicators indicators={typingIndicators} />
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <MessageInput
        onSendMessage={handleSendMessage}
        onTypingChange={handleTypingChange}
        replyTo={replyTo}
        onCancelReply={() => setReplyTo(undefined)}
      />
    </div>
  )
}