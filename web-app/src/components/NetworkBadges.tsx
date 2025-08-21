'use client'

import { motion } from 'framer-motion'
import { TrophyIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { NetworkAchievement } from '@/context/NetworkingContext'

interface NetworkBadgesProps {
  achievements: NetworkAchievement[]
}

export default function NetworkBadges({ achievements }: NetworkBadgesProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'

  const getAchievementColor = (type: string) => {
    const colors = {
      connector: 'from-blue-500 to-purple-500',
      regular_attendee: 'from-green-500 to-emerald-500',
      event_starter: 'from-orange-500 to-red-500',
      culture_preserver: 'from-indigo-500 to-blue-500',
      community_builder: 'from-purple-500 to-pink-500'
    }
    return colors[type as keyof typeof colors] || 'from-gray-500 to-gray-600'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(isPortuguese ? 'pt-PT' : 'en-GB', {
      day: 'numeric',
      month: 'short'
    })
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-premium-500 to-accent-500 rounded-lg">
          <TrophyIcon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          {isPortuguese ? 'Conquistas' : 'Achievements'}
        </h3>
      </div>

      {achievements.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-3">🏆</div>
          <p className="text-gray-500 text-sm">
            {isPortuguese 
              ? 'Participe em mais eventos para ganhar conquistas!'
              : 'Attend more events to earn achievements!'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-secondary-100 transition-colors"
            >
              {/* Achievement Icon */}
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getAchievementColor(achievement.type)} flex items-center justify-center text-white text-lg shadow-md`}>
                {achievement.icon}
              </div>

              {/* Achievement Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-sm truncate">
                  {achievement.name}
                </h4>
                <p className="text-xs text-secondary-600 line-clamp-2">
                  {achievement.description}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">
                    {formatDate(achievement.earnedAt)}
                  </span>
                  {achievement.isActive && (
                    <SparklesIcon className="w-3 h-3 text-accent-500" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Progress Hint */}
          <div className="mt-4 p-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border border-primary-100">
            <div className="flex items-center gap-2 mb-2">
              <SparklesIcon className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">
                {isPortuguese ? 'Próxima Conquista' : 'Next Achievement'}
              </span>
            </div>
            <p className="text-xs text-primary-600">
              {isPortuguese 
                ? 'Conecte-se com 5+ pessoas para desbloquear "Super Conector"'
                : 'Connect with 5+ people to unlock "Super Connector"'
              }
            </p>
            <div className="mt-2 bg-white rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((achievements.length / 5) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}