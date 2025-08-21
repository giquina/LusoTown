'use client'

import { motion } from 'framer-motion'
import { 
  UserGroupIcon,
  CalendarIcon,
  SparklesIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { NetworkStats } from '@/context/NetworkingContext'

interface NetworkHeaderProps {
  stats: NetworkStats
}

export default function NetworkHeader({ stats }: NetworkHeaderProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'

  const statItems = [
    {
      icon: UserGroupIcon,
      value: stats.totalConnections,
      label: isPortuguese ? 'Conexões' : 'Connections',
      color: 'text-primary-600 bg-primary-50',
      description: isPortuguese ? 'falantes de português' : 'Portuguese speakers'
    },
    {
      icon: CalendarIcon,
      value: stats.eventsAttended,
      label: isPortuguese ? 'Eventos' : 'Events',
      color: 'text-secondary-600 bg-secondary-50',
      description: isPortuguese ? 'eventos participados' : 'events attended'
    },
    {
      icon: SparklesIcon,
      value: stats.newConnectionsThisMonth,
      label: isPortuguese ? 'Este Mês' : 'This Month',
      color: 'text-accent-600 bg-accent-50',
      description: isPortuguese ? 'novas conexões' : 'new connections'
    },
    {
      icon: TrophyIcon,
      value: stats.achievements.length,
      label: isPortuguese ? 'Conquistas' : 'Achievements',
      color: 'text-premium-600 bg-premium-50',
      description: isPortuguese ? 'badges ganhos' : 'badges earned'
    }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8"
    >
      {statItems.map((item, index) => {
        const IconComponent = item.icon
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${item.color} mb-3`}>
              <IconComponent className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {item.value}
            </div>
            <div className="text-sm font-medium text-secondary-700 mb-1">
              {item.label}
            </div>
            <div className="text-xs text-gray-500">
              {item.description}
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}