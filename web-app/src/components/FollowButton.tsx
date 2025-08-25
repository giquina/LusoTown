'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  HeartIcon as HeartOutline,
  PlusIcon,
  BellIcon,
  BellSlashIcon
} from '@heroicons/react/24/outline'
import { 
  HeartIcon as HeartSolid,
  CheckIcon
} from '@heroicons/react/24/solid'
import { useFollowing, FollowableEntity } from '@/context/FollowingContext'
import { useLanguage } from '@/context/LanguageContext'

interface FollowButtonProps {
  entity: FollowableEntity
  variant?: 'default' | 'compact' | 'icon-only'
  showNotificationToggle?: boolean
  className?: string
  onFollowChange?: (isFollowing: boolean) => void
}

export default function FollowButton({ 
  entity, 
  variant = 'default', 
  showNotificationToggle = false,
  className = '',
  onFollowChange
}: FollowButtonProps) {
  const { 
    isFollowing, 
    toggleFollow, 
    following,
    toggleNotifications 
  } = useFollowing()
  const { language, t } = useLanguage()
  
  const [isHovered, setIsHovered] = useState(false)
  const isCurrentlyFollowing = isFollowing(entity.id)
  const followingEntry = following.find(f => f.entity.id === entity.id)
  const notificationsEnabled = followingEntry?.notificationsEnabled ?? false
  
  // Helper function to check if language is Lusophone
  const isPortuguese = language === 'pt'

  const handleFollow = () => {
    toggleFollow(entity)
    onFollowChange?.(!isCurrentlyFollowing)
  }

  const handleNotificationToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleNotifications(entity.id)
  }

  const getButtonText = () => {
    if (variant === 'icon-only') return ''
    
    if (isCurrentlyFollowing) {
      if (isHovered) {
return isPortuguese ? 'Deixar de seguir' : 'Unfollow'
      }
return isPortuguese ? 'A seguir' : 'Following'
    }
    
    switch (entity.type) {
      case 'person':
return isPortuguese ? 'Seguir' : 'Follow'
      case 'group':
return isPortuguese ? 'Juntar-se' : 'Join'
      case 'community':
return isPortuguese ? 'Juntar-se' : 'Join'
      case 'event_organizer':
return isPortuguese ? 'Seguir' : 'Follow'
      default:
return isPortuguese ? 'Seguir' : 'Follow'
    }
  }

  const getIcon = () => {
    if (isCurrentlyFollowing) {
      if (entity.type === 'person') {
        return <HeartSolid className="w-4 h-4" />
      }
      return <CheckIcon className="w-4 h-4" />
    }
    
    if (entity.type === 'person') {
      return <HeartOutline className="w-4 h-4" />
    }
    return <PlusIcon className="w-4 h-4" />
  }

  const baseClasses = `
    inline-flex items-center gap-2 font-medium transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50
  `

  const variantClasses = {
    default: `px-4 py-2 rounded-lg ${
      isCurrentlyFollowing 
        ? `bg-gray-100 text-gray-700 border border-gray-300 hover:bg-red-50 hover:border-red-300`
        : `bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 shadow-sm hover:shadow-md`
    }`,
    compact: `px-3 py-1.5 text-sm rounded-md ${
      isCurrentlyFollowing 
        ? `bg-gray-100 text-gray-700 border border-gray-300 hover:bg-red-50 hover:border-red-300`
        : `bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600`
    }`,
    'icon-only': `p-2 rounded-full ${
      isCurrentlyFollowing 
        ? `bg-gray-100 text-gray-700 hover:bg-red-50`
        : `bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600`
    }`
  }

  return (
    <div className="flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleFollow}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        aria-label={`${isCurrentlyFollowing ? 'Unfollow' : 'Follow'} ${entity.name}`}
      >
        {getIcon()}
        {variant !== 'icon-only' && (
          <span 
            style={isCurrentlyFollowing && isHovered ? { color: '#dc2626' } : {}}
          >
            {getButtonText()}
          </span>
        )}
      </motion.button>

      {/* Notification Toggle */}
      {showNotificationToggle && isCurrentlyFollowing && (
        <button
          onClick={handleNotificationToggle}
          className="p-2 rounded-full text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
          title={
            notificationsEnabled 
? (isPortuguese ? 'Desativar notificações' : 'Turn off notifications')
              : (isPortuguese ? 'Ativar notificações' : 'Turn on notifications')
          }
        >
          {notificationsEnabled ? (
            <BellIcon className="w-4 h-4" />
          ) : (
            <BellSlashIcon className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  )
}

// Specialized button for different entity types
export function FollowPersonButton(props: Omit<FollowButtonProps, 'entity'> & { person: FollowableEntity }) {
  return <FollowButton {...props} entity={{ ...props.person, type: 'person' }} />
}

export function JoinGroupButton(props: Omit<FollowButtonProps, 'entity'> & { group: FollowableEntity }) {
  return <FollowButton {...props} entity={{ ...props.group, type: 'group' }} />
}

export function JoinCommunityButton(props: Omit<FollowButtonProps, 'entity'> & { community: FollowableEntity }) {
  return <FollowButton {...props} entity={{ ...props.community, type: 'community' }} />
}

export function FollowOrganizerButton(props: Omit<FollowButtonProps, 'entity'> & { organizer: FollowableEntity }) {
  return <FollowButton {...props} entity={{ ...props.organizer, type: 'event_organizer' }} />
}