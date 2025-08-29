'use client'

import { useLanguage } from '@/context/LanguageContext'
import { ModernButton } from '@/components/ui/ModernButton'

/**
 * Enhanced follow button component
 * Consolidated from complex follow system
 */
interface EnhancedFollowButtonProps {
  userId?: string
  isFollowing?: boolean
  onToggleFollow?: () => void
}

export default function EnhancedFollowButton({ 
  userId, 
  isFollowing = false, 
  onToggleFollow 
}: EnhancedFollowButtonProps) {
  const { t } = useLanguage()

  return (
    <ModernButton
      variant={isFollowing ? 'outline' : 'default'}
      onClick={onToggleFollow}
      className="text-sm"
    >
      {isFollowing ? t('common.following') : t('common.follow')}
    </ModernButton>
  )
}