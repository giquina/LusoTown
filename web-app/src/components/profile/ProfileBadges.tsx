'use client'

import { ProfileBadge } from '@/lib/connections'
import { motion } from 'framer-motion'

interface ProfileBadgesProps {
  badges: ProfileBadge[]
  maxVisible?: number
  showAll?: boolean
}

export default function ProfileBadges({ badges, maxVisible = 8, showAll = false }: ProfileBadgesProps) {
  const visibleBadges = showAll ? badges : badges.slice(0, maxVisible)
  const hiddenCount = badges.length - maxVisible

  const getBadgeStyle = (color: string) => {
    const styles = {
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      green: 'bg-green-100 text-green-700 border-green-200',
      gold: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      pink: 'bg-pink-100 text-pink-700 border-pink-200',
      red: 'bg-red-100 text-red-700 border-red-200',
      gray: 'bg-gray-100 text-gray-700 border-gray-200'
    }
    return styles[color as keyof typeof styles] || styles.gray
  }

  if (badges.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="text-4xl mb-2">🏆</div>
        <p>No badges earned yet</p>
        <p className="text-sm mt-1">Join events and connect with members to earn badges!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {visibleBadges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center gap-3 p-4 rounded-lg border ${getBadgeStyle(badge.color)} hover:shadow-sm transition-shadow`}
          >
            {/* Badge Icon */}
            <div className="text-2xl flex-shrink-0">
              {badge.icon}
            </div>
            
            {/* Badge Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm">{badge.name}</h4>
              <p className="text-xs opacity-80 mt-1">{badge.description}</p>
              <p className="text-xs opacity-60 mt-1">
                Earned {new Date(badge.earnedAt).toLocaleDateString('en-GB', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show More Indicator */}
      {!showAll && hiddenCount > 0 && (
        <div className="text-center">
          <span className="text-sm text-gray-500">
            +{hiddenCount} more badge{hiddenCount !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* Badge Categories Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Badge Categories</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-purple-600">🎉</span>
            <span>Community Engagement</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-600">🤝</span>
            <span>Connection Building</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">🧘‍♀️</span>
            <span>Wellness & Activities</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-600">⭐</span>
            <span>Special Achievements</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-pink-600">🦋</span>
            <span>Social Participation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-600">🎨</span>
            <span>Creative & Cultural</span>
          </div>
        </div>
      </div>
    </div>
  )
}