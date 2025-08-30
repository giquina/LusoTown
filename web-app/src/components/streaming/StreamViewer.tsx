'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useAuth } from '@/context/AuthContext'
import { STREAMING_CONFIG } from '@/config/streaming'
import { Button } from '@/components/ui/button'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import { 
  LiveKitRoom, 
  VideoConference, 
  RoomAudioRenderer,
  ControlBar,
  GridLayout,
  ParticipantTile,
  useTracks,
  useParticipants
} from '@livekit/components-react'
import { Track, Room, RoomEvent, Participant } from 'livekit-client'
import { 
  HandRaisedIcon, 
  ChatBubbleLeftIcon, 
  HeartIcon,
  ShareIcon,
  UserGroupIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon
} from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import io, { Socket } from 'socket.io-client'

interface StreamViewerProps {
  roomName: string
  category?: string
  title?: string
  description?: string
  onLeave?: () => void
}

interface ChatMessage {
  id: string
  userId: string
  username: string
  message: string
  timestamp: number
  type: 'message' | 'reaction' | 'system'
  avatar?: string
}

interface CulturalReaction {
  id: string
  type: 'applause' | 'heart' | 'fire' | 'tada'
  emoji: string
  userId: string
  username: string
  timestamp: number
}

export function StreamViewer({ 
  roomName, 
  category = 'general',
  title,
  description,
  onLeave 
}: StreamViewerProps) {
  const { t, language } = useLanguage()
  const { user, profile } = useAuth()
  const [token, setToken] = useState<string>('')
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [showChat, setShowChat] = useState(true)
  const [reactions, setReactions] = useState<CulturalReaction[]>([])
  const [participantCount, setParticipantCount] = useState(0)
  const socketRef = useRef<Socket | null>(null)
  const roomRef = useRef<Room | null>(null)
  const chatRef = useRef<HTMLDivElement>(null)

  // Portuguese cultural reactions
  const culturalReactions = [
    { type: 'applause', emoji: '👏', label: { pt: 'Palmas', en: 'Applause' } },
    { type: 'heart', emoji: '❤️', label: { pt: 'Coração', en: 'Love' } },
    { type: 'fire', emoji: '🔥', label: { pt: 'Fantástico', en: 'Amazing' } },
    { type: 'tada', emoji: '🎉', label: { pt: 'Parabéns', en: 'Celebration' } }
  ]

  // Get stream token on component mount
  useEffect(() => {
    if (user && profile) {
      generateStreamToken()
    }
  }, [user, profile, roomName])

  // Initialize WebSocket connection for real-time features
  useEffect(() => {
    const serverUrl = process.env.NEXT_PUBLIC_STREAMING_SERVER_URL || 'http://localhost:8080'
    socketRef.current = io(serverUrl, {
      transports: ['websocket', 'polling']
    })

    socketRef.current.on('connect', () => {
      console.log('🔌 Connected to Portuguese streaming server')
    })

    socketRef.current.on('portuguese-chat', (message: ChatMessage) => {
      setChatMessages(prev => [...prev, message].slice(-100)) // Keep last 100 messages
    })

    socketRef.current.on('cultural-reaction', (reaction: CulturalReaction) => {
      setReactions(prev => [...prev, reaction])
      // Remove reaction after animation
      setTimeout(() => {
        setReactions(prev => prev.filter(r => r.id !== reaction.id))
      }, 3000)
    })

    socketRef.current.on('participant-count-update', ({ count }) => {
      setParticipantCount(count)
    })

    return () => {
      socketRef.current?.disconnect()
    }
  }, [])

  // Scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [chatMessages])

  const generateStreamToken = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/streaming/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomName,
          participantName: `${profile?.first_name} ${profile?.last_name}`.trim() || 'Viewer',
          category,
          role: 'viewer',
          metadata: {
            heritage: profile?.portuguese_heritage,
            avatar: profile?.avatar_url
          }
        })
      })

      if (response.ok) {
        const data = await response.json()
        setToken(data.token)
        console.log('🎫 Received LiveKit token for Portuguese stream viewing')
      } else {
        console.error('Failed to get stream token')
      }
    } catch (error) {
      console.error('Error generating stream token:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRoomConnection = useCallback((room: Room) => {
    roomRef.current = room
    setIsConnected(true)

    // Notify server about participant join
    socketRef.current?.emit('participant-update', {
      roomName,
      action: 'join',
      participantName: `${profile?.first_name} ${profile?.last_name}`.trim() || 'Viewer'
    })

    // Add system message
    const systemMessage: ChatMessage = {
      id: `system-${Date.now()}`,
      userId: 'system',
      username: 'Sistema',
      message: t('streaming.chat.userJoined', { 
        name: `${profile?.first_name} ${profile?.last_name}`.trim() || 'Viewer' 
      }),
      timestamp: Date.now(),
      type: 'system'
    }
    setChatMessages(prev => [...prev, systemMessage])

  }, [roomName, profile, t])

  const handleRoomDisconnection = useCallback(() => {
    setIsConnected(false)

    // Notify server about participant leave
    socketRef.current?.emit('participant-update', {
      roomName,
      action: 'leave',
      participantName: `${profile?.first_name} ${profile?.last_name}`.trim() || 'Viewer'
    })
  }, [roomName, profile])

  const sendChatMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random()}`,
      userId: user?.id || '',
      username: `${profile?.first_name} ${profile?.last_name}`.trim() || 'Anónimo',
      message: newMessage.trim(),
      timestamp: Date.now(),
      type: 'message',
      avatar: profile?.avatar_url
    }

    // Send to WebSocket server
    socketRef.current?.emit('portuguese-chat', message)
    setNewMessage('')
  }

  const sendCulturalReaction = (reactionType: string, emoji: string) => {
    const reaction: CulturalReaction = {
      id: `reaction-${Date.now()}-${Math.random()}`,
      type: reactionType as 'applause' | 'heart' | 'fire' | 'tada',
      emoji,
      userId: user?.id || '',
      username: `${profile?.first_name} ${profile?.last_name}`.trim() || 'Anónimo',
      timestamp: Date.now()
    }

    // Send to WebSocket server
    socketRef.current?.emit('cultural-reaction', reaction)
  }

  const toggleMute = () => {
    if (roomRef.current) {
      roomRef.current.localParticipant.setMicrophoneEnabled(!isMuted)
      setIsMuted(!isMuted)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-900 to-primary-800 flex items-center justify-center">
        <div className="text-center text-white">
          <ArrowPathIcon className="animate-spin h-12 w-12 text-white mb-4" />
          <h2 className="text-2xl font-bold mb-2">
            {t('streaming.viewer.connecting')}
          </h2>
          <p className="text-primary-200">
            {t('streaming.viewer.connectingDescription')}
          </p>
        </div>
      </div>
    )
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-900 to-primary-800 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">🎥</div>
          <h2 className="text-2xl font-bold mb-2">
            {t('streaming.viewer.noAccess')}
          </h2>
          <p className="text-primary-200 mb-6">
            {t('streaming.viewer.noAccessDescription')}
          </p>
          <Button onClick={() => window.history.back()}>
            {t('common.goBack')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        onConnected={handleRoomConnection}
        onDisconnected={handleRoomDisconnection}
        style={{ height: '100vh', width: '100vw' }}
        data-lk-theme="default"
      >
        {/* Main Video Area */}
        <div className="absolute inset-0">
          <VideoConference />
        </div>

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 to-transparent p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onLeave}
                className="text-white hover:bg-white/20"
              >
                ← {t('common.back')}
              </Button>
              
              <div className="text-white">
                <h1 className="text-xl font-bold">{title}</h1>
                {description && (
                  <p className="text-primary-200 text-sm">{description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Live Indicator */}
              <div className="flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">
                  {t('streaming.viewer.live')}
                </span>
              </div>

              {/* Participant Count */}
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-white">
                <UserGroupIcon className="w-4 h-4" />
                <span className="text-sm">{participantCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="absolute top-0 right-0 w-80 h-full bg-black/90 backdrop-blur-sm border-l border-white/20 z-40"
            >
              <div className="flex flex-col h-full">
                {/* Chat Header */}
                <div className="p-4 border-b border-white/20">
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-semibold">
                      💬 {t('streaming.chat.title')}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowChat(false)}
                      className="text-white hover:bg-white/20"
                    >
                      ✕
                    </Button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div ref={chatRef} className="flex-1 p-4 overflow-y-auto space-y-3">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`${
                        message.type === 'system' 
                          ? 'text-center text-primary-300 text-sm'
                          : 'text-white'
                      }`}
                    >
                      {message.type === 'system' ? (
                        <p>{message.message}</p>
                      ) : (
                        <div className="flex gap-3">
                          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-sm font-bold">
                            {message.avatar ? (
                              <img src={message.avatar} alt="" className="w-full h-full rounded-full" />
                            ) : (
                              message.username[0].toUpperCase()
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-primary-300 text-xs mb-1">
                              {message.username}
                            </p>
                            <p className="text-sm">{message.message}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Cultural Reactions */}
                <div className="px-4 py-2 border-t border-white/20">
                  <div className="flex gap-2 mb-3">
                    {culturalReactions.map((reaction) => (
                      <Button
                        key={reaction.type}
                        size="sm"
                        variant="ghost"
                        onClick={() => sendCulturalReaction(reaction.type, reaction.emoji)}
                        className="text-white hover:bg-white/20 text-lg"
                        title={reaction.label[language as keyof typeof reaction.label]}
                      >
                        {reaction.emoji}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-white/20">
                  <form onSubmit={sendChatMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={t('streaming.chat.placeholder')}
                      className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm focus:ring-primary-500 focus:border-primary-500"
                      maxLength={STREAMING_CONFIG.chat.maxLength}
                    />
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!newMessage.trim()}
                      className="bg-primary-600 hover:bg-primary-700"
                    >
                      ↑
                    </Button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Control Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex justify-center items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className={`text-white hover:bg-white/20 ${isMuted ? 'bg-red-600' : 'bg-white/20'}`}
            >
              {isMuted ? (
                <SpeakerXMarkIcon className="w-5 h-5" />
              ) : (
                <SpeakerWaveIcon className="w-5 h-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowChat(!showChat)}
              className="text-white hover:bg-white/20"
            >
              <ChatBubbleLeftIcon className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <ShareIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Floating Reactions */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <AnimatePresence>
            {reactions.map((reaction) => (
              <motion.div
                key={reaction.id}
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight,
                  scale: 0.5,
                  opacity: 0 
                }}
                animate={{ 
                  y: -100,
                  scale: [0.5, 1.2, 1],
                  opacity: [0, 1, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3, ease: 'easeOut' }}
                className="absolute text-4xl"
              >
                {reaction.emoji}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  )
}