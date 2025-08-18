'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayIcon, PauseIcon, SpeakerWaveIcon, SpeakerXMarkIcon, ArrowsPointingOutIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import { Crown, Zap, Users, Eye, Heart, Share2 } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'

interface StreamData {
  id: string
  title: string
  description: string
  stream_key: string
  playback_url: string
  thumbnail_url: string
  is_live: boolean
  is_premium: boolean
  is_featured: boolean
  language: string
  cultural_region: string
  viewer_count: number
  total_viewers: number
  peak_viewers: number
  status: 'scheduled' | 'live' | 'ended' | 'cancelled'
  started_at: string
  tags: string[]
  profiles: {
    id: string
    first_name: string
    last_name: string
    profile_picture_url: string
    verification_status: string
  }
  stream_categories: {
    id: string
    name_pt: string
    name_en: string
    slug: string
    portuguese_focused: boolean
  }
  hasAccess?: boolean
  viewerAccess?: {
    canView: boolean
    canChat: boolean
    requiresSubscription: boolean
  }
}

interface EnhancedStreamPlayerProps {
  stream: StreamData
  onInteraction?: (type: string, data?: any) => void
  showChat?: boolean
  autoplay?: boolean
}

export default function EnhancedStreamPlayer({ 
  stream, 
  onInteraction, 
  showChat = true,
  autoplay = false 
}: EnhancedStreamPlayerProps) {
  const { language } = useLanguage()
  const { hasActiveSubscription, isInTrial } = useSubscription()
  
  // Player state
  const [isPlaying, setIsPlaying] = useState(autoplay && stream.is_live)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  // Stream state
  const [viewerCount, setViewerCount] = useState(stream.viewer_count)
  const [isLive, setIsLive] = useState(stream.is_live)
  const [connectionState, setConnectionState] = useState<'connecting' | 'connected' | 'error' | 'offline'>('offline')
  
  // UI state
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [previewTimeLeft, setPreviewTimeLeft] = useState(300) // 5 minutes
  
  // Refs
  const playerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()
  const viewerSessionRef = useRef<string | null>(null)

  // Access control
  const canFullAccess = stream.hasAccess || hasActiveSubscription || isInTrial || !stream.is_premium
  const isPreviewMode = !canFullAccess && stream.is_premium
  const canChat = stream.viewerAccess?.canChat && canFullAccess

  useEffect(() => {
    if (stream.is_live && canFullAccess) {
      initializeStream()
    }
    
    return () => {
      if (viewerSessionRef.current) {
        leaveStream()
      }
    }
  }, [stream.id, canFullAccess])

  useEffect(() => {
    if (isPreviewMode && isPlaying) {
      const interval = setInterval(() => {
        setPreviewTimeLeft(prev => {
          if (prev <= 1) {
            setIsPlaying(false)
            setShowSubscriptionPrompt(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isPreviewMode, isPlaying])

  const initializeStream = async () => {
    try {
      setConnectionState('connecting')
      
      // Join stream as viewer
      const response = await fetch(`/api/streams/${stream.id}/viewers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionToken: generateSessionToken(),
          userAgent: navigator.userAgent,
          ipAddress: null // Will be populated server-side
        })
      })

      if (response.ok) {
        const data = await response.json()
        viewerSessionRef.current = data.sessionToken
        setConnectionState('connected')
        
        // Start viewer count updates
        startViewerCountUpdates()
        
        onInteraction?.('stream_joined', { streamId: stream.id, sessionId: data.sessionId })
      } else {
        setConnectionState('error')
      }
    } catch (error) {
      console.error('Error joining stream:', error)
      setConnectionState('error')
    }
  }

  const leaveStream = async () => {
    if (!viewerSessionRef.current) return

    try {
      await fetch(`/api/streams/${stream.id}/viewers`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionToken: viewerSessionRef.current,
          action: 'leave',
          watchTime: getWatchTime(),
          chatMessagesSent: 0 // Will be tracked by chat component
        })
      })

      onInteraction?.('stream_left', { streamId: stream.id })
    } catch (error) {
      console.error('Error leaving stream:', error)
    }
  }

  const startViewerCountUpdates = () => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/streams/${stream.id}/viewers`)
        if (response.ok) {
          const data = await response.json()
          setViewerCount(data.currentViewers)
          setIsLive(data.streamId === stream.id) // Basic live check
        }
      } catch (error) {
        console.error('Error updating viewer count:', error)
      }
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }

  const generateSessionToken = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const getWatchTime = () => {
    // This would track actual watch time
    return 0
  }

  const handlePlay = () => {
    if (isPreviewMode && previewTimeLeft <= 0) {
      setShowSubscriptionPrompt(true)
      return
    }
    
    if (!canFullAccess && stream.is_premium) {
      setShowSubscriptionPrompt(true)
      return
    }

    setIsPlaying(!isPlaying)
    onInteraction?.(isPlaying ? 'pause' : 'play', { streamId: stream.id })
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying && !isPreviewMode) setShowControls(false)
    }, 3000)
  }

  const handleFullscreen = async () => {
    if (!playerRef.current) return

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
        setIsFullscreen(false)
      } else {
        await playerRef.current.requestFullscreen()
        setIsFullscreen(true)
      }
    } catch (error) {
      console.warn('Fullscreen request failed:', error)
    }
  }

  const handleShare = () => {
    setShowShareModal(true)
    onInteraction?.('share_opened', { streamId: stream.id })
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    onInteraction?.('like', { streamId: stream.id, liked: !isLiked })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getConnectionStatusColor = () => {
    switch (connectionState) {
      case 'connected': return 'bg-green-500'
      case 'connecting': return 'bg-yellow-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className={`relative w-full ${showChat ? 'lg:flex lg:gap-4' : ''}`}>
      {/* Main Player */}
      <div className={`${showChat ? 'lg:flex-1' : 'w-full'}`}>
        <div 
          ref={playerRef}
          className="relative w-full h-56 sm:h-64 md:h-80 lg:h-96 xl:h-[32rem] bg-black rounded-xl overflow-hidden group"
          onMouseMove={handleMouseMove}
          onTouchStart={handleMouseMove}
        >
          {/* Video Player */}
          {canFullAccess && isPlaying && stream.playback_url ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay={autoplay}
              muted={isMuted}
              controls={false}
              playsInline
            >
              <source src={stream.playback_url} type="application/vnd.apple.mpegurl" />
              {/* Fallback for browsers that don't support HLS */}
              Your browser does not support video playback.
            </video>
          ) : (
            <>
              {/* Stream Thumbnail */}
              <img
                src={stream.thumbnail_url || '/events/networking.jpg'}
                alt={stream.title}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/events/networking.jpg' }}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                {/* Premium Content Lock */}
                {!canFullAccess && stream.is_premium && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center text-white space-y-4"
                  >
                    <div className="bg-premium-600 p-4 rounded-full mx-auto w-fit">
                      <Crown className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        {language === 'pt' ? 'Conteúdo Premium' : 'Premium Content'}
                      </h3>
                      <p className="text-gray-200 mb-4 max-w-md">
                        {language === 'pt'
                          ? 'Este stream é exclusivo para membros premium da LusoTown.'
                          : 'This stream is exclusive to LusoTown premium members.'
                        }
                      </p>
                      <button
                        onClick={() => setShowSubscriptionPrompt(true)}
                        className="bg-premium-600 hover:bg-premium-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        {language === 'pt' ? 'Tornar-se Premium' : 'Go Premium'}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Play Button - Mobile Optimized */}
                {canFullAccess && !isPlaying && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePlay}
                    className="bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-sm p-4 sm:p-6 rounded-full transition-all duration-200 touch-manipulation"
                  >
                    <PlayIcon className="w-10 h-10 sm:w-12 sm:h-12 text-white ml-1" />
                  </motion.button>
                )}

                {/* Offline Message */}
                {!isLive && connectionState === 'offline' && (
                  <div className="text-center text-white">
                    <h3 className="text-lg font-semibold mb-2">
                      {language === 'pt' ? 'Stream Offline' : 'Stream Offline'}
                    </h3>
                    <p className="text-gray-300">
                      {language === 'pt' 
                        ? 'Este stream não está atualmente ao vivo.'
                        : 'This stream is not currently live.'
                      }
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Live Badge */}
          {isLive && (
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-4 left-4 bg-action-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2"
            >
              <div className={`w-2 h-2 rounded-full ${getConnectionStatusColor()}`}></div>
              {language === 'pt' ? 'AO VIVO' : 'LIVE'}
            </motion.div>
          )}

          {/* Viewer Count */}
          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm flex items-center gap-2">
            <Eye className="w-4 h-4" />
            {viewerCount.toLocaleString()}
          </div>

          {/* Preview Timer */}
          {isPreviewMode && isPlaying && previewTimeLeft > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-16 left-4 bg-accent-500 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>
                {language === 'pt' ? 'Pré-visualização:' : 'Preview:'} {formatTime(previewTimeLeft)}
              </span>
            </motion.div>
          )}

          {/* Enhanced Controls - Mobile First */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-transparent p-3 sm:p-4"
              >
                {/* Mobile Layout: Stack controls for easier touch */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  {/* Primary Controls */}
                  <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-3">
                    {canFullAccess && (
                      <>
                        <button
                          onClick={handlePlay}
                          className="text-white hover:text-gray-300 active:scale-95 transition-all touch-manipulation p-2 sm:p-0"
                        >
                          {isPlaying ? (
                            <PauseIcon className="w-7 h-7 sm:w-6 sm:h-6" />
                          ) : (
                            <PlayIcon className="w-7 h-7 sm:w-6 sm:h-6" />
                          )}
                        </button>
                        
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="text-white hover:text-gray-300 active:scale-95 transition-all touch-manipulation p-2 sm:p-0"
                        >
                          {isMuted ? (
                            <SpeakerXMarkIcon className="w-7 h-7 sm:w-6 sm:h-6" />
                          ) : (
                            <SpeakerWaveIcon className="w-7 h-7 sm:w-6 sm:h-6" />
                          )}
                        </button>
                      </>
                    )}

                    {isLive && (
                      <div className="hidden sm:flex text-white text-sm items-center gap-2">
                        <div className="w-2 h-2 bg-action-500 rounded-full animate-pulse"></div>
                        <span className="whitespace-nowrap">{language === 'pt' ? 'Ao vivo' : 'Live'}</span>
                      </div>
                    )}
                  </div>

                  {/* Secondary Controls */}
                  <div className="flex items-center justify-center sm:justify-end gap-4 sm:gap-3">
                    <button
                      onClick={handleLike}
                      className={`text-white hover:text-red-400 active:scale-95 transition-all touch-manipulation p-2 sm:p-0 ${isLiked ? 'text-red-500' : ''}`}
                    >
                      <Heart className={`w-6 h-6 sm:w-5 sm:h-5 ${isLiked ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={handleShare}
                      className="text-white hover:text-gray-300 active:scale-95 transition-all touch-manipulation p-2 sm:p-0"
                    >
                      <Share2 className="w-6 h-6 sm:w-5 sm:h-5" />
                    </button>

                    {showChat && canChat && (
                      <button
                        className="text-white hover:text-gray-300 active:scale-95 transition-all touch-manipulation p-2 sm:p-0 lg:hidden"
                      >
                        <ChatBubbleLeftIcon className="w-6 h-6 sm:w-5 sm:h-5" />
                      </button>
                    )}

                    <button
                      onClick={handleFullscreen}
                      className="text-white hover:text-gray-300 active:scale-95 transition-all touch-manipulation p-2 sm:p-0"
                    >
                      <ArrowsPointingOutIcon className="w-7 h-7 sm:w-6 sm:h-6" />
                    </button>
                  </div>
                </div>

                {/* Mobile Live Indicator */}
                {isLive && (
                  <div className="flex sm:hidden text-white text-xs items-center justify-center gap-2 mt-2">
                    <div className="w-1.5 h-1.5 bg-action-500 rounded-full animate-pulse"></div>
                    <span>{language === 'pt' ? 'Transmissão ao vivo' : 'Live broadcast'}</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stream Info */}
        <div className="mt-4 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {stream.title}
              </h2>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <img
                    src={stream.profiles.profile_picture_url || '/default-avatar.png'}
                    alt={`${stream.profiles.first_name} ${stream.profiles.last_name}`}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{stream.profiles.first_name} {stream.profiles.last_name}</span>
                  {stream.profiles.verification_status === 'verified' && (
                    <Crown className="w-4 h-4 text-primary-500" />
                  )}
                </div>
                <span>•</span>
                <span>{language === 'pt' ? stream.stream_categories.name_pt : stream.stream_categories.name_en}</span>
                <span>•</span>
                <span>{stream.total_viewers.toLocaleString()} {language === 'pt' ? 'visualizações' : 'views'}</span>
              </div>
            </div>
          </div>

          {stream.description && (
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {stream.description}
            </p>
          )}

          {stream.tags && stream.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {stream.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Panel */}
      {showChat && canChat && (
        <div className="lg:w-80 mt-4 lg:mt-0">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 h-96 lg:h-[32rem] flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <ChatBubbleLeftIcon className="w-5 h-5" />
                {language === 'pt' ? 'Chat ao Vivo' : 'Live Chat'}
              </h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                {language === 'pt' ? 'Chat será implementado em breve...' : 'Chat coming soon...'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Prompt Modal */}
      <AnimatePresence>
        {showSubscriptionPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => setShowSubscriptionPrompt(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-premium-100 p-4 rounded-full mx-auto w-fit mb-4">
                <Crown className="w-8 h-8 text-premium-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'pt' ? 'Acesso Premium Necessário' : 'Premium Access Required'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {language === 'pt'
                  ? 'Torne-se membro premium para assistir este conteúdo exclusivo e aceder a todas as funcionalidades.'
                  : 'Become a premium member to watch this exclusive content and access all features.'
                }
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSubscriptionPrompt(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {language === 'pt' ? 'Fechar' : 'Close'}
                </button>
                <button
                  onClick={() => window.location.href = '/premium-membership'}
                  className="flex-1 px-4 py-2 bg-premium-600 text-white rounded-lg hover:bg-premium-700 transition-colors font-medium"
                >
                  {language === 'pt' ? 'Upgrade' : 'Upgrade'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}