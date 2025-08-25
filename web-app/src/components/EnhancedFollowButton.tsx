'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HeartIcon as HeartOutline,
  PlusIcon,
  BellIcon,
  BellSlashIcon,
  InformationCircleIcon,
  CheckIcon,
  UserPlusIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  CalendarDaysIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import { 
  HeartIcon as HeartSolid,
  CheckIcon as CheckSolid
} from '@heroicons/react/24/solid'
import { useFollowing, FollowableEntity } from '@/context/EnhancedFollowingContext'
import { useLanguage } from '@/context/LanguageContext'

interface FollowButtonProps {
  entity: FollowableEntity
  variant?: 'default' | 'compact' | 'icon-only' | 'detailed'
  showNotificationToggle?: boolean
  showBenefits?: boolean
  className?: string
  onFollowChange?: (isFollowing: boolean) => void
}

export default function EnhancedFollowButton({ 
  entity, 
  variant = 'default', 
  showNotificationToggle = false,
  showBenefits = false,
  className = '',
  onFollowChange
}: FollowButtonProps) {
  const { 
    isFollowing: checkIsFollowing, 
    toggleFollow, 
    following,
    toggleNotifications,
    getFollowBenefits,
    loading,
    isAuthenticated
  } = useFollowing()
  const { language, t } = useLanguage()
  
  const [isHovered, setIsHovered] = useState(false)
  const [showBenefitsTooltip, setShowBenefitsTooltip] = useState(false)
  const [isToggling, setIsToggling] = useState(false)
  
  const isCurrentlyFollowing = checkIsFollowing(entity.id)
  const followingEntry = following.find(f => f.entity.id === entity.id)
  const notificationsEnabled = followingEntry?.notificationsEnabled ?? false
  const benefits = getFollowBenefits(entity.type)
  
  // Helper function to check if language is Lusophone
  const isPortuguese = language === 'pt'

  const handleFollow = async () => {
    if (loading || isToggling) return
    
    setIsToggling(true)
    try {
      const success = await toggleFollow(entity)
      if (success) {
        onFollowChange?.(!isCurrentlyFollowing)
      }
    } finally {
      setIsToggling(false)
    }
  }

  const handleNotificationToggle = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isAuthenticated || loading) return
    
    await toggleNotifications(entity.id)
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
      case 'portuguese_nation':
        return isPortuguese ? 'Seguir País' : 'Follow Country'
      default:
        return isPortuguese ? 'Seguir' : 'Follow'
    }
  }

  const getIcon = () => {
    if (isCurrentlyFollowing) {
      if (entity.type === 'person') {
        return <HeartSolid className="w-4 h-4" />
      }
      return <CheckSolid className="w-4 h-4" />
    }
    
    switch (entity.type) {
      case 'person':
        return <UserPlusIcon className="w-4 h-4" />
      case 'group':
        return <UserGroupIcon className="w-4 h-4" />
      case 'community':
        return <BuildingOfficeIcon className="w-4 h-4" />
      case 'event_organizer':
        return <CalendarDaysIcon className="w-4 h-4" />
      case 'portuguese_nation':
        return <GlobeAltIcon className="w-4 h-4" />
      default:
        return <PlusIcon className="w-4 h-4" />
    }
  }

  const getEntityTypeLabel = () => {
    const labels = {
      en: {
        person: 'Person',
        group: 'Group',
        community: 'Community',
        event_organizer: 'Event Organizer',
        portuguese_nation: 'Lusophone-Speaking Nation'
      },
      pt: {
        person: 'Pessoa',
        group: 'Grupo',
        community: 'Comunidade',
        event_organizer: 'Organizador',
        portuguese_nation: 'País Lusófono'
      }
    }
    return labels[language][entity.type]
  }

  const getBenefitsDescription = () => {
    const descriptions = {
      en: {
        person: 'Get notified of their posts, events, and networking opportunities',
        group: 'Join group discussions, events, and collaborative projects',
        community: 'Stay updated with community news, events, and opportunities',
        event_organizer: 'Get early access to events, VIP invitations, and exclusive content',
        portuguese_nation: 'Receive updates on cultural events, business opportunities, and embassy activities'
      },
      pt: {
        person: 'Seja notificado das suas publicações, eventos e oportunidades de networking',
        group: 'Participe em discussões do grupo, eventos e projetos colaborativos',
        community: 'Mantenha-se atualizado com notícias da comunidade, eventos e oportunidades',
        event_organizer: 'Obtenha acesso antecipado a eventos, convites VIP e conteúdo exclusivo',
        portuguese_nation: 'Receba atualizações sobre eventos culturais, oportunidades de negócio e atividades da embaixada'
      }
    }
    return descriptions[language][entity.type]
  }

  const baseClasses = `
    inline-flex items-center gap-2 font-medium transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50
    disabled:opacity-50 disabled:cursor-not-allowed
  `

  const variantClasses = {
    default: `px-4 py-2 rounded-lg ${
      isCurrentlyFollowing 
        ? `bg-primary-100 text-primary-700 border border-primary-300 hover:bg-red-50 hover:text-red-600 hover:border-red-300`
        : `bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 shadow-sm hover:shadow-md`
    }`,
    compact: `px-3 py-1.5 text-sm rounded-md ${
      isCurrentlyFollowing 
        ? `bg-primary-100 text-primary-700 border border-primary-300 hover:bg-red-50 hover:text-red-600 hover:border-red-300`
        : `bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600`
    }`,
    'icon-only': `p-2 rounded-full ${
      isCurrentlyFollowing 
        ? `bg-primary-100 text-primary-700 hover:bg-red-50 hover:text-red-600`
        : `bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600`
    }`,
    detailed: `px-6 py-3 rounded-xl ${
      isCurrentlyFollowing 
        ? `bg-primary-50 text-primary-700 border border-primary-200 hover:bg-red-50 hover:text-red-600 hover:border-red-300`
        : `bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 shadow-lg hover:shadow-xl`
    }`
  }

  if (variant === 'detailed') {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* Main Follow Button with Benefits */}
        <div className="bg-white rounded-2xl border border-primary-200 p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-primary-900 mb-1">
                {isPortuguese ? 'Seguir' : 'Follow'} {entity.name}
              </h3>
              <p className="text-sm text-primary-600">
                {getEntityTypeLabel()}
              </p>
            </div>
            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
              {entity.followers} {isPortuguese ? 'seguidores' : 'followers'}
            </span>
          </div>

          <p className="text-sm text-primary-700 mb-4">
            {getBenefitsDescription()}
          </p>

          {/* Benefits List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <div>
              <h4 className="text-xs font-semibold text-primary-800 mb-2 uppercase tracking-wide">
                {isPortuguese ? 'Notificações' : 'Notifications'}
              </h4>
              <ul className="space-y-1">
                {benefits.notifications.slice(0, 2).map((benefit, index) => (
                  <li key={index} className="text-xs text-primary-600 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-primary-800 mb-2 uppercase tracking-wide">
                {isPortuguese ? 'Eventos' : 'Events'}
              </h4>
              <ul className="space-y-1">
                {benefits.events.slice(0, 2).map((benefit, index) => (
                  <li key={index} className="text-xs text-primary-600 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full flex-shrink-0"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFollow}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              disabled={isToggling || loading}
              className={`${baseClasses} ${variantClasses[variant]} flex-1`}
              aria-label={`${isCurrentlyFollowing ? 'Unfollow' : 'Follow'} ${entity.name}`}
            >
              {isToggling ? (
                <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full"></div>
              ) : (
                getIcon()
              )}
              <span 
                style={isCurrentlyFollowing && isHovered ? { color: '#dc2626' } : {}}
              >
                {getButtonText()}
              </span>
            </motion.button>

            {/* Notification Toggle */}
            {isCurrentlyFollowing && (
              <button
                onClick={handleNotificationToggle}
                className="p-3 rounded-xl text-primary-600 hover:text-primary-700 hover:bg-primary-50 transition-colors border border-primary-200"
                title={
                  notificationsEnabled 
                    ? (isPortuguese ? 'Desativar notificações' : 'Turn off notifications')
                    : (isPortuguese ? 'Ativar notificações' : 'Turn on notifications')
                }
              >
                {notificationsEnabled ? (
                  <BellIcon className="w-5 h-5" />
                ) : (
                  <BellSlashIcon className="w-5 h-5" />
                )}
              </button>
            )}
          </div>

          {/* Authentication Notice */}
          {!isAuthenticated && (
            <div className="mt-4 p-3 bg-primary-50 border border-primary-200 rounded-lg">
              <p className="text-xs text-primary-700 flex items-center gap-2">
                <InformationCircleIcon className="w-4 h-4 flex-shrink-0" />
                {isPortuguese 
                  ? 'Faça login ou registe-se para seguir e receber notificações'
                  : 'Sign in or register to follow and receive notifications'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Standard variants
  return (
    <div className="flex items-center gap-2 relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleFollow}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={isToggling || loading}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        aria-label={`${isCurrentlyFollowing ? 'Unfollow' : 'Follow'} ${entity.name}`}
      >
        {isToggling ? (
          <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full"></div>
        ) : (
          getIcon()
        )}
        {variant !== 'icon-only' && (
          <span 
            style={isCurrentlyFollowing && isHovered ? { color: '#dc2626' } : {}}
          >
            {getButtonText()}
          </span>
        )}
      </motion.button>

      {/* Benefits Tooltip */}
      {showBenefits && (
        <div className="relative">
          <button
            onMouseEnter={() => setShowBenefitsTooltip(true)}
            onMouseLeave={() => setShowBenefitsTooltip(false)}
            className="p-1 rounded-full text-primary-500 hover:text-primary-700 hover:bg-primary-50 transition-colors"
          >
            <InformationCircleIcon className="w-4 h-4" />
          </button>
          
          <AnimatePresence>
            {showBenefitsTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full right-0 mb-2 w-80 bg-white border border-primary-200 rounded-lg shadow-lg p-4 z-50"
              >
                <h4 className="font-semibold text-primary-900 mb-2">
                  {isPortuguese ? 'Ao seguir, receberá:' : 'By following, you get:'}
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <h5 className="font-medium text-primary-800 mb-1">{isPortuguese ? 'Notificações' : 'Notifications'}</h5>
                    <ul className="space-y-1">
                      {benefits.notifications.slice(0, 2).map((benefit, index) => (
                        <li key={index} className="text-primary-600 flex items-center gap-1">
                          <div className="w-1 h-1 bg-primary-500 rounded-full"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-primary-800 mb-1">{isPortuguese ? 'Eventos' : 'Events'}</h5>
                    <ul className="space-y-1">
                      {benefits.events.slice(0, 2).map((benefit, index) => (
                        <li key={index} className="text-primary-600 flex items-center gap-1">
                          <div className="w-1 h-1 bg-secondary-500 rounded-full"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Notification Toggle */}
      {showNotificationToggle && isCurrentlyFollowing && (
        <button
          onClick={handleNotificationToggle}
          className="p-2 rounded-full text-primary-600 hover:text-primary-700 hover:bg-primary-50 transition-colors"
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

// Specialized button components for different entity types
export function FollowPersonButton(props: Omit<FollowButtonProps, 'entity'> & { person: FollowableEntity }) {
  return <EnhancedFollowButton {...props} entity={{ ...props.person, type: 'person' }} />
}

export function JoinGroupButton(props: Omit<FollowButtonProps, 'entity'> & { group: FollowableEntity }) {
  return <EnhancedFollowButton {...props} entity={{ ...props.group, type: 'group' }} />
}

export function JoinCommunityButton(props: Omit<FollowButtonProps, 'entity'> & { community: FollowableEntity }) {
  return <EnhancedFollowButton {...props} entity={{ ...props.community, type: 'community' }} />
}

export function FollowOrganizerButton(props: Omit<FollowButtonProps, 'entity'> & { organizer: FollowableEntity }) {
  return <EnhancedFollowButton {...props} entity={{ ...props.organizer, type: 'event_organizer' }} />
}

export function FollowNationButton(props: Omit<FollowButtonProps, 'entity'> & { nation: FollowableEntity }) {
  return <EnhancedFollowButton {...props} entity={{ ...props.nation, type: 'portuguese_nation' }} />
}