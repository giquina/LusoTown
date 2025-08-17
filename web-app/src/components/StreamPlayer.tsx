'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayIcon, PauseIcon, SpeakerWaveIcon, SpeakerXMarkIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline'
import { Lock, Crown, Zap } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import SubscriptionGate from '@/components/SubscriptionGate'

interface StreamPlayerProps {
  stream: {
    id: string
    title: string
    youtubeVideoId: string
    isLive: boolean
    isPremium: boolean
    thumbnail: string
    viewerCount: number
    previewDuration?: number
  }
  hasAccess: boolean
  onInteraction: (type: string) => void
}

export default function StreamPlayer({ stream, hasAccess, onInteraction }: StreamPlayerProps) {
  const { language, t } = useLanguage()
  const { hasActiveSubscription, isInTrial } = useSubscription()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [previewTimeLeft, setPreviewTimeLeft] = useState(stream.previewDuration || 300) // 5 minutes default
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false)
  const playerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  const canFullAccess = hasAccess || hasActiveSubscription || isInTrial
  const isPreviewMode = !canFullAccess && stream.isPremium

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

  const handlePlay = () => {
    if (isPreviewMode && previewTimeLeft <= 0) {
      setShowSubscriptionPrompt(true)
      return
    }
    
    setIsPlaying(!isPlaying)
    onInteraction(isPlaying ? 'pause' : 'play')
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false)
    }, 3000)
  }

  const handleFullscreen = () => {
    if (playerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        playerRef.current.requestFullscreen()
      }
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div 
      ref={playerRef}
      className="relative w-full h-64 md:h-96 lg:h-[28rem] bg-black rounded-t-xl overflow-hidden group"
      onMouseMove={handleMouseMove}
    >
      {/* YouTube Embed or Thumbnail */}
      {canFullAccess && isPlaying ? (
        <iframe
          src={`https://www.youtube.com/embed/${stream.youtubeVideoId}${stream.isLive ? '?autoplay=1&mute=0' : '?autoplay=1'}`}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={stream.title}
        />
      ) : (
        <>
          {/* Stream Thumbnail */}
          <img 
            src={stream.thumbnail} 
            alt={stream.title}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay for non-premium users or when paused */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            
            {/* Premium Content Lock */}
            {!canFullAccess && stream.isPremium && (
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

            {/* Regular Play Button */}
            {canFullAccess && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePlay}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-6 rounded-full transition-all duration-200"
              >
                {isPlaying ? (
                  <PauseIcon className="w-12 h-12 text-white" />
                ) : (
                  <PlayIcon className="w-12 h-12 text-white ml-1" />
                )}
              </motion.button>
            )}
          </div>
        </>
      )}

      {/* Live Badge */}
      {stream.isLive && (
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute top-4 left-4 bg-action-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2"
        >
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          {language === 'pt' ? 'AO VIVO' : 'LIVE'}
        </motion.div>
      )}

      {/* Viewer Count */}
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
        {stream.viewerCount.toLocaleString()} {language === 'pt' ? 'espectadores' : 'viewers'}
      </div>

      {/* Preview Timer for Premium Content */}
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

      {/* Player Controls */}
      <AnimatePresence>
        {showControls && canFullAccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlay}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {isPlaying ? (
                    <PauseIcon className="w-6 h-6" />
                  ) : (
                    <PlayIcon className="w-6 h-6" />
                  )}
                </button>
                
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {isMuted ? (
                    <SpeakerXMarkIcon className="w-6 h-6" />
                  ) : (
                    <SpeakerWaveIcon className="w-6 h-6" />
                  )}
                </button>

                {stream.isLive && (
                  <div className="text-white text-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-action-500 rounded-full animate-pulse"></div>
                    <span>{language === 'pt' ? 'Transmissão ao vivo' : 'Live broadcast'}</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleFullscreen}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <ArrowsPointingOutIcon className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subscription Prompt Modal */}
      <AnimatePresence>
        {showSubscriptionPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full text-center"
            >
              <div className="bg-premium-100 p-4 rounded-full mx-auto w-fit mb-4">
                <Crown className="w-8 h-8 text-premium-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === 'pt' ? 'Pré-visualização Terminada' : 'Preview Ended'}
              </h3>
              <p className="text-gray-600 mb-6">
                {language === 'pt'
                  ? 'Torne-se membro premium para continuar a assistir e aceder a conteúdo exclusivo.'
                  : 'Become a premium member to continue watching and access exclusive content.'
                }
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSubscriptionPrompt(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {language === 'pt' ? 'Fechar' : 'Close'}
                </button>
                <button
                  onClick={() => window.location.href = '/subscription'}
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