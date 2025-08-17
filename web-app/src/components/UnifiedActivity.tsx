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

  const displayActivities = activities.length > 0 ? activities : defaultActivities

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Activity className="w-6 h-6 text-primary-500" />
        <h2 className="text-xl font-semibold text-gray-900">
          {language === 'pt' ? 'Atividade Recente' : 'Recent Activity'}
        </h2>
      </div>
      <div className="text-center py-8">
        <p className="text-gray-600">Recent activity will be displayed here</p>
      </div>
    </div>
  )
}
