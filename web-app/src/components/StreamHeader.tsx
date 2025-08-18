'use client'

import { motion } from 'framer-motion'
import { EyeIcon, HeartIcon, ShareIcon, BookmarkIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'
import { Crown, Users, Briefcase, GraduationCap, Music, Camera, MapPin, Clock, Calendar } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

interface Stream {
  id: string
  title: string
  description: string
  category: string
  categoryName: string
  host: string
  thumbnail: string
  viewerCount: number
  isLive: boolean
  isPremium: boolean
  region?: 'portugal' | 'brazil' | 'africa' | 'diaspora'
  language: 'pt' | 'en'
  tags: string[]
  startedAt?: string
  scheduledStart?: string
  duration?: number
  likes?: number
  isFollowing?: boolean
}

interface StreamHeaderProps {
  stream: Stream
  hasAccess: boolean
  showChat?: boolean
  onToggleChat?: () => void
  onLike?: () => void
  onFollow?: () => void
  onShare?: () => void
  onSave?: () => void
}

export default function StreamHeader({ 
  stream, 
  hasAccess,
  showChat = false,
  onToggleChat,
  onLike,
  onFollow,
  onShare,
  onSave 
}: StreamHeaderProps) {
  const { language, t } = useLanguage()
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isFollowing, setIsFollowing] = useState(stream.isFollowing || false)

  const getCategoryIcon = (categoryId: string) => {
    const iconMap = {
      'portuguese-culture': Music,
      'business-workshops': Briefcase,
      'community-events': Users,
      'student-sessions': GraduationCap,
      'vip-business': Crown,
      'behind-scenes': Camera
    }
    
    return iconMap[categoryId as keyof typeof iconMap] || Users
  }

  const getRegionFlag = (region?: string) => {
    switch (region) {
      case 'portugal': return '🇵🇹'
      case 'brazil': return '🇧🇷'
      case 'africa': return '🌍'
      case 'diaspora': return '🌐'
      default: return '🇵🇹'
    }
  }

  const formatViewerCount = (count: number) => {
    if (count === 0) return '0'
    if (count < 1000) return count.toString()
    if (count < 10000) return `${(count / 1000).toFixed(1)}k`
    return `${Math.floor(count / 1000)}k`
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = Math.abs(now.getTime() - date.getTime())
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    
    if (diffMinutes < 60) {
      return `${diffMinutes} ${language === 'pt' ? 'min' : 'min'}`
    }
    const hours = Math.floor(diffMinutes / 60)
    if (hours < 24) {
      return `${hours}h ${diffMinutes % 60}m`
    }
    return date.toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB')
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike?.()
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    onSave?.()
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    onFollow?.()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: stream.title,
        text: stream.description,
        url: window.location.href
      }).catch(console.error)
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
    onShare?.()
  }

  const IconComponent = getCategoryIcon(stream.category)

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-b border-gray-200 px-4 py-3"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {/* Category and Region */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2">
              <div className="bg-gray-100 p-1.5 rounded-lg">
                <IconComponent className="w-4 h-4 text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">{stream.categoryName}</span>
            </div>
            
            {stream.region && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin className="w-3 h-3" />
                <span>{getRegionFlag(stream.region)} {t(`streaming.region-${stream.region}`, stream.region)}</span>
              </div>
            )}
            
            {stream.isPremium && (
              <div className="flex items-center gap-1 bg-premium-100 text-premium-700 px-2 py-1 rounded-full text-xs font-medium">
                <Crown className="w-3 h-3" />
                <span>{t('streaming.vip-exclusive', 'VIP')}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {stream.title}
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {stream.description}
          </p>

          {/* Stream Status */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {/* Live Status or Schedule */}
            {stream.isLive ? (
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="flex items-center gap-1 bg-action-500 text-white px-2 py-1 rounded-full text-xs font-bold"
                >
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  {t('streaming.live', 'LIVE')}
                </motion.div>
                {stream.startedAt && (
                  <span>{language === 'pt' ? 'Há' : 'Started'} {formatTime(stream.startedAt)}</span>
                )}
              </div>
            ) : stream.scheduledStart ? (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{language === 'pt' ? 'Programado para' : 'Scheduled for'} {new Date(stream.scheduledStart).toLocaleString(language === 'pt' ? 'pt-PT' : 'en-GB')}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{language === 'pt' ? 'Stream offline' : 'Stream offline'}</span>
              </div>
            )}

            {/* Viewer Count */}
            <div className="flex items-center gap-1">
              <EyeIcon className="w-4 h-4" />
              <span>
                {formatViewerCount(stream.viewerCount)} {stream.viewerCount === 1 ? t('streaming.viewer', 'viewer') : t('streaming.viewers', 'viewers')}
              </span>
            </div>

            {/* Host */}
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{language === 'pt' ? 'Com' : 'Hosted by'} {stream.host}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {stream.tags.slice(0, 5).map(tag => (
              <span 
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
            {stream.tags.length > 5 && (
              <span className="text-xs text-gray-400 px-2 py-1">
                +{stream.tags.length - 5} {language === 'pt' ? 'mais' : 'more'}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-start gap-2 ml-4">
          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isLiked 
                ? 'bg-red-100 text-red-700 border-red-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isLiked ? (
              <HeartSolidIcon className="w-4 h-4" />
            ) : (
              <HeartIcon className="w-4 h-4" />
            )}
            <span>{stream.likes ? stream.likes + (isLiked ? 1 : 0) : 0}</span>
          </motion.button>

          {/* Save Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className={`p-2 rounded-lg transition-colors ${
              isSaved 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title={language === 'pt' ? 'Guardar' : 'Save'}
          >
            {isSaved ? (
              <BookmarkSolidIcon className="w-4 h-4" />
            ) : (
              <BookmarkIcon className="w-4 h-4" />
            )}
          </motion.button>

          {/* Share Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            title={language === 'pt' ? 'Partilhar' : 'Share'}
          >
            <ShareIcon className="w-4 h-4" />
          </motion.button>

          {/* Chat Toggle */}
          {onToggleChat && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleChat}
              className={`p-2 rounded-lg transition-colors ${
                showChat 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title={language === 'pt' ? 'Chat' : 'Chat'}
            >
              <ChatBubbleLeftIcon className="w-4 h-4" />
            </motion.button>
          )}

          {/* Follow/Subscribe Button */}
          {hasAccess && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFollow}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isFollowing 
                  ? 'bg-secondary-100 text-secondary-700 border border-secondary-200' 
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              {isFollowing 
                ? (language === 'pt' ? 'A seguir' : 'Following')
                : (language === 'pt' ? 'Seguir' : 'Follow')
              }
            </motion.button>
          )}

          {/* Premium Upgrade Button */}
          {!hasAccess && stream.isPremium && (
            <a
              href="/subscription"
              className="px-4 py-2 bg-premium-600 text-white rounded-lg hover:bg-premium-700 transition-colors text-sm font-medium"
            >
              {t('streaming.upgrade-to-watch', 'Upgrade to watch')}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}