'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Activity, Calendar, Users, MapPin } from 'lucide-react'

interface ActivityItem {
  id?: string
  type: 'event' | 'networking' | 'service' | 'community' | string
  title: string
  description?: string
  timestamp?: string
  date?: string
  platform?: string
  icon?: React.ReactNode
  metadata?: Record<string, any>
}

interface UnifiedActivityProps {
  activities: ActivityItem[]
}

export default function UnifiedActivity({ activities = [] }: UnifiedActivityProps) {
  const { language } = useLanguage()

  const defaultActivities = [
    {
      id: '1',
      type: 'event' as const,
      title: language === 'pt' ? 'Participou no evento Wine Tasting' : 'Attended Wine Tasting event',
      description: language === 'pt' ? 'Evento de degustação de vinhos em Marylebone' : 'Wine tasting event in Marylebone',
      timestamp: '2 hours ago',
      platform: 'Events',
      icon: <Calendar className="w-4 h-4" />
    }
  ]

  // Normalize activities to match expected format
  const normalizedActivities = activities.map(activity => ({
    id: activity.id || `activity-${Math.random()}`,
    type: activity.type,
    title: activity.title,
    description: activity.description || '',
    timestamp: activity.timestamp || activity.date || 'Recently',
    platform: activity.platform || activity.metadata?.platform || 'Platform',
    icon: activity.icon || <Activity className="w-4 h-4" />
  }))

  const displayActivities = normalizedActivities.length > 0 ? normalizedActivities : defaultActivities

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Activity className="w-6 h-6 text-primary-500" />
        <h2 className="text-xl font-semibold text-gray-900">
          {language === 'pt' ? 'Atividade Recente' : 'Recent Activity'}
        </h2>
      </div>
      
      <div className="space-y-4">
        {displayActivities.map((activity, index) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-secondary-100 transition-colors">
            <div className="flex-shrink-0 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white">
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {activity.title}
                </h3>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                  {activity.timestamp}
                </span>
              </div>
              {activity.description && (
                <p className="text-sm text-secondary-600 mt-1">
                  {activity.description}
                </p>
              )}
              <div className="flex items-center space-x-2 mt-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {activity.platform}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800 capitalize">
                  {activity.type}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {displayActivities.length === 0 && (
          <div className="text-center py-8">
            <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-secondary-600">
              {language === 'pt' ? 'Nenhuma atividade recente' : 'No recent activity'}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {language === 'pt' 
                ? 'Comece a participar em eventos e usar serviços para ver sua atividade aqui'
                : 'Start attending events and using services to see your activity here'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
