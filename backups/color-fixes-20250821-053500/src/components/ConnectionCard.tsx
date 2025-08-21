'use client'

import { useState } from 'react'
import { buildUnsplashUrl } from '@/config'
import { motion } from 'framer-motion'
import { buildUnsplashUrl } from '@/config'
import { 
  MapPinIcon,
  CalendarIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  ShareIcon,
  EllipsisVerticalIcon,
  SparklesIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { buildUnsplashUrl } from '@/config'
import { CrownIcon } from 'lucide-react'
import { buildUnsplashUrl } from '@/config'
import { useLanguage } from '@/context/LanguageContext'
import { buildUnsplashUrl } from '@/config'
import { Connection } from '@/context/NetworkingContext'
import { buildUnsplashUrl } from '@/config'

interface ConnectionCardProps {
  connection: Connection
}

export default function ConnectionCard({ connection }: ConnectionCardProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  const [showOptions, setShowOptions] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const { connectedUser, sharedEventsCount, firstMetEvent, connectionStrength, lastInteractionAt } = connection

  // Get membership badge
  const getMembershipBadge = () => {
    const badges = {
      free: { icon: '🆓', color: 'text-neutral-600', label: 'Free' },
      core: { icon: '❤️', color: 'text-coral-600', label: 'Core' },
      premium: { icon: <CrownIcon className="w-4 h-4" />, color: 'text-premium-600', label: 'Premium' }
    }
    return badges[connectedUser.membershipTier] || badges.free
  }

  // Format connection strength as stars
  const getConnectionStrengthStars = () => {
    const rating = Math.round(connectionStrength / 2) // Convert 0-10 to 0-5 stars
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-accent-400 fill-current' : 'text-neutral-300'}`} 
      />
    ))
  }

  // Format time ago
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 24) {
      return isPortuguese ? `há ${diffInHours}h` : `${diffInHours}h ago`
    }
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) {
      return isPortuguese ? `há ${diffInDays}d` : `${diffInDays}d ago`
    }
    
    const diffInWeeks = Math.floor(diffInDays / 7)
    return isPortuguese ? `há ${diffInWeeks}sem` : `${diffInWeeks}w ago`
  }

  // Format event date
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(isPortuguese ? 'pt-PT' : 'en-GB', {
      day: 'numeric',
      month: 'short'
    })
  }

  const badge = getMembershipBadge()

  return (
    <motion.div 
      className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-neutral-100 min-h-[380px] sm:min-h-[420px] flex flex-col group"
      whileHover={{ scale: 1.02 }}
    >
      {/* Header with profile info */}
      <div className="p-4 sm:p-6 pb-3 sm:pb-4 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4 flex-1">
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={connectedUser.profilePictureUrl || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face&auto=format`}
                alt={`${connectedUser.firstName} ${connectedUser.lastName || ''}`}
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
              />
              {connectedUser.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>

            {/* Name and Location */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base sm:text-lg font-semibold text-neutral-900 break-words line-clamp-1 leading-tight flex-1 min-w-0">
                  {connectedUser.firstName} {connectedUser.lastName || ''}
                </h3>
                <div className={`flex items-center gap-1 ${badge.color}`} title={`${badge.label} Member`}>
                  {typeof badge.icon === 'string' ? (
                    <span className="text-sm">{badge.icon}</span>
                  ) : (
                    badge.icon
                  )}
                </div>
              </div>
              {connectedUser.location && (
                <div className="flex items-center text-neutral-500 text-sm min-w-0">
                  <MapPinIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span className="truncate max-w-full">{connectedUser.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Options Menu */}
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <EllipsisVerticalIcon className="w-5 h-5 text-neutral-400" />
            </button>
            
            {showOptions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-1 z-10"
              >
                <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                  {isPortuguese ? 'Ver Perfil' : 'View Profile'}
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                  {isPortuguese ? 'Enviar Mensagem' : 'Send Message'}
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                  {isPortuguese ? 'Eventos em Comum' : 'Shared Events'}
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Connection Strength */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {getConnectionStrengthStars()}
          </div>
          <div className="text-xs text-neutral-500">
            {isPortuguese ? 'Força da conexão' : 'Connection strength'}
          </div>
        </div>
      </div>

      {/* First Met Event */}
      {firstMetEvent && (
        <div className="px-4 sm:px-6 pb-3 sm:pb-4">
          <div className="bg-neutral-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                {isPortuguese ? 'Conheceram-se em' : 'Met at'}
              </span>
              <span className="text-xs text-neutral-500">
                {formatEventDate(firstMetEvent.date)}
              </span>
            </div>
            <h4 className="text-sm font-medium text-neutral-900 break-words line-clamp-2 leading-tight">
              {firstMetEvent.title}
            </h4>
          </div>
        </div>
      )}

      {/* Stats Row */}
      <div className="px-4 sm:px-6 pb-3 sm:pb-4">
        <div className="flex items-center justify-between text-sm min-w-0">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="flex items-center gap-1 text-neutral-600 flex-shrink-0">
              <CalendarIcon className="w-4 h-4" />
              <span>{sharedEventsCount}</span>
              <span className="text-xs">
                {isPortuguese ? 'eventos' : 'events'}
              </span>
            </div>
            <div className="text-neutral-500 text-xs truncate">
              {isPortuguese ? 'Última interação' : 'Last seen'} {getTimeAgo(lastInteractionAt)}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6 mt-auto">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button className="flex-1 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700 transition-all duration-200 text-xs sm:text-sm font-medium shadow-lg hover:shadow-xl min-w-0 min-h-[44px] flex items-center justify-center">
            <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="hidden sm:inline">{isPortuguese ? 'Enviar Mensagem' : 'Send Message'}</span>
            <span className="sm:hidden">{isPortuguese ? 'Mensagem' : 'Message'}</span>
          </button>
          
          <div className="flex gap-2 sm:gap-3 sm:flex-shrink-0">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2.5 sm:p-3 rounded-lg transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center ${
                isLiked 
                  ? 'bg-action-50 text-action-500 hover:bg-action-100' 
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {isLiked ? (
                <HeartSolidIcon className="w-4 h-4" />
              ) : (
                <HeartIcon className="w-4 h-4" />
              )}
            </button>
            
            <button className="p-2.5 sm:p-3 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-neutral-200 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
              <ShareIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Click outside to close options */}
      {showOptions && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setShowOptions(false)}
        />
      )}
    </motion.div>
  )
}