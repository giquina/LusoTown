'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Activity, Calendar, Users, MapPin } from 'lucide-react'

interface ActivityItem {
  id: string
  type: 'event' | 'networking' | 'service' | 'community'
  title: string
  description: string
  timestamp: string
  platform: string
  icon: React.ReactNode
}

interface UnifiedActivityProps {
  activities: ActivityItem[]
}

export default function UnifiedActivity({ activities = [] }: UnifiedActivityProps) {
  const { language, t } = useLanguage()

  const defaultActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'event',
      title: language === 'pt' ? 'Participou no evento Wine Tasting' : 'Attended Wine Tasting event',
      description: language === 'pt' ? 'Evento de degustação de vinhos em Marylebone' : 'Wine tasting event in Marylebone',
      timestamp: '2 hours ago',
      platform: 'Events',
      icon: <Calendar className="w-4 h-4" />
    },
    {
      id: '2',
      type: 'networking',
      title: language === 'pt' ? 'Nova conexão da rede' : 'New network connection',
      description: language === 'pt' ? 'Conectou-se com Maria Silva através do evento' : 'Connected with Maria Silva through event',
      timestamp: '1 day ago',
      platform: 'Network',
      icon: <Users className="w-4 h-4" />
    },
    {
      id: '3',
      type: 'service',
      title: language === 'pt' ? 'Transporte reservado' : 'Transport booked',
      description: language === 'pt' ? 'Tour cultural português agendado' : 'Portuguese cultural tour scheduled',
      timestamp: '2 days ago',
      platform: 'Transport',
      icon: <MapPin className="w-4 h-4" />
    }
  ]

  const displayActivities = activities.length > 0 ? activities : defaultActivities

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Activity className="w-6 h-6 text-primary-500" />
        <h2 className="text-xl font-semibold text-gray-900">
          {language === 'pt' ? 'Atividade Recente' : 'Recent Activity'}
        </h2>
      </div>

      <div className="space-y-4">
        {displayActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {activity.title}
                </h3>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {activity.platform}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
              <p className="text-xs text-gray-500">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {displayActivities.length === 0 && (
        <div className="text-center py-8">
          <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Nenhuma atividade ainda' : 'No activity yet'}
          </h3>
          <p className="text-gray-600">
            {language === 'pt' 
              ? 'Comece a participar em eventos para ver sua atividade aqui'
              : 'Start participating in events to see your activity here'
            }
          </p>
        </div>
      )}
    </div>
  )
}