'use client'

import { ROUTES } from '@/config';
import { motion } from 'framer-motion'
import { PlayIcon, EyeIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { Crown, Users, Briefcase, GraduationCap, Music, Camera, MapPin, Calendar } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config/routes'

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
  hlsUrl?: string
  youtubeVideoId?: string
  region?: 'portugal' | 'brazil' | 'africa' | 'diaspora'
  language: 'pt' | 'en'
  tags: string[]
  startedAt?: string
  scheduledStart?: string
  duration?: number
}

interface StreamCardProps {
  stream: Stream
  hasAccess: boolean
  onSelect: (stream: Stream) => void
  delay?: number
  compact?: boolean
}

export default function StreamCard({ 
  stream, 
  hasAccess, 
  onSelect, 
  delay = 0, 
  compact = false 
}: StreamCardProps) {
  const { language, t } = useLanguage()

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
    return `${(count / 1000).toFixed(1)}k`
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = date.getTime() - now.getTime()
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    
    if (diffMinutes < 0) {
      // Past time - show time since started
      const elapsed = Math.abs(diffMinutes)
      if (elapsed < 60) return `${elapsed}${language === 'pt' ? 'min' : 'min'}`
      const hours = Math.floor(elapsed / 60)
      return `${hours}h ${elapsed % 60}m`
    } else {
      // Future time - show time until start
      if (diffMinutes < 60) return `${diffMinutes}${language === 'pt' ? 'min' : 'min'}`
      const hours = Math.floor(diffMinutes / 60)
      if (hours < 24) return `${hours}h ${diffMinutes % 60}m`
      return `${Math.floor(hours / 24)}${language === 'pt' ? 'd' : 'd'}`
    }
  }

  const formatDuration = (minutes?: number) => {
    if (!minutes) return ''
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const IconComponent = getCategoryIcon(stream.category)
  const canWatch = !stream.isPremium || hasAccess

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer ${
        !canWatch ? 'opacity-75' : ''
      }`}
      onClick={() => canWatch && onSelect(stream)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-200">
        <img
          src={stream.thumbnail || buildRoute(ROUTES.events, { id: 'event-id' })}
          alt={stream.title}
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = buildRoute(ROUTES.events, { id: 'event-id' }) }}
          className="w-full h-full object-cover"
        />

        {/* Live Badge */}
        {stream.isLive && (
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-3 left-3 bg-action-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1"
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
            {t('streaming.live', 'LIVE')}
          </motion.div>
        )}

        {/* Premium Badge */}
        {stream.isPremium && (
          <div className="absolute top-3 right-3 bg-premium-500 rounded-full p-1.5">
            <Crown className="w-3 h-3 text-white" />
          </div>
        )}

        {/* Viewer Count (for live streams) */}
        {stream.isLive && (
          <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm flex items-center gap-1">
            <EyeIcon className="w-3 h-3" />
            <span>{formatViewerCount(stream.viewerCount)}</span>
          </div>
        )}

        {/* Duration (for scheduled streams) */}
        {!stream.isLive && stream.duration && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
            {formatDuration(stream.duration)}
          </div>
        )}

        {/* Region Flag */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-sm">
          {getRegionFlag(stream.region)}
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-200"
          >
            <PlayIcon className="w-6 h-6 text-white ml-0.5" />
          </motion.div>
        </div>

        {/* Access Restriction Overlay */}
        {!canWatch && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center text-white">
              <Crown className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm font-medium">
                {t('streaming.premium-required', 'Premium Required')}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`p-4 ${compact ? 'p-3' : 'p-4'}`}>
        {/* Category and Region */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 p-1 rounded">
              <IconComponent className="w-3 h-3 text-gray-600" />
            </div>
            <span className="text-xs text-gray-500">{stream.categoryName}</span>
          </div>
          {stream.region && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3" />
              <span>{t(`streaming.region-${stream.region}`, stream.region)}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className={`font-semibold text-gray-900 line-clamp-2 mb-2 ${
          compact ? 'text-sm' : 'text-base'
        }`}>
          {stream.title}
        </h3>

        {/* Description */}
        <p className={`text-gray-600 line-clamp-2 mb-3 ${
          compact ? 'text-xs' : 'text-sm'
        }`}>
          {stream.description}
        </p>

        {/* Host and Time */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <UserGroupIcon className="w-3 h-3" />
            <span>{stream.host}</span>
          </div>
          {stream.isLive && stream.startedAt ? (
            <div className="flex items-center gap-1">
              <ClockIcon className="w-3 h-3" />
              <span>{formatTime(stream.startedAt)} {language === 'pt' ? 'atrás' : 'ago'}</span>
            </div>
          ) : stream.scheduledStart ? (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{language === 'pt' ? 'Em' : 'In'} {formatTime(stream.scheduledStart)}</span>
            </div>
          ) : null}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {stream.tags.slice(0, compact ? 2 : 3).map(tag => (
            <span 
              key={tag}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
          {stream.tags.length > (compact ? 2 : 3) && (
            <span className="text-xs text-gray-400">
              +{stream.tags.length - (compact ? 2 : 3)}
            </span>
          )}
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {stream.isLive && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <EyeIcon className="w-3 h-3" />
                <span>{formatViewerCount(stream.viewerCount)} {t('streaming.viewers', 'viewers')}</span>
              </div>
            )}
          </div>
          
          {canWatch ? (
            <button className="px-3 py-1.5 bg-primary-600 text-white text-xs rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-1">
              <PlayIcon className="w-3 h-3" />
              <span>{stream.isLive ? t('streaming.watch', 'Watch') : t('streaming.join', 'Join')}</span>
            </button>
          ) : (
            <a
              href={ROUTES.subscription}
              className="px-3 py-1.5 bg-premium-600 text-white text-xs rounded-lg hover:bg-premium-700 transition-colors flex items-center gap-1"
            >
              <Crown className="w-3 h-3" />
              <span>{t('streaming.upgrade-to-watch', 'Upgrade')}</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}