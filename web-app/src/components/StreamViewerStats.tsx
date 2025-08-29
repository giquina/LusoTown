'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Card, CardContent } from '@/components/ui/card'

/**
 * Stream Viewer Statistics for Portuguese Community
 * Shows engagement metrics for cultural content
 */
export default function StreamViewerStats() {
  const { t } = useLanguage()

  const stats = [
    {
      label: t('streaming.stats.liveViewers') || 'Live Viewers',
      value: '245',
      icon: '👥',
      color: 'text-green-600'
    },
    {
      label: t('streaming.stats.totalViews') || 'Total Views',
      value: '12.5K',
      icon: '📺',
      color: 'text-blue-600'
    },
    {
      label: t('streaming.stats.engagement') || 'Engagement Rate',
      value: '87%',
      icon: '📊',
      color: 'text-purple-600'
    },
    {
      label: t('streaming.stats.avgWatch') || 'Avg. Watch Time',
      value: '24m',
      icon: '⏱️',
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('streaming.viewerStats.title') || 'Live Statistics'}
        </h2>
        <p className="text-gray-600">
          {t('streaming.viewerStats.subtitle') || 'Real-time engagement from our Portuguese-speaking community'}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className={`text-2xl font-bold mb-1 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-3">
            {t('streaming.communityActivity') || 'Community Activity'}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {t('streaming.activity.newMembers') || 'New members joined'}
              </span>
              <span className="font-semibold text-green-600">+23</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {t('streaming.activity.messages') || 'Messages in chat'}
              </span>
              <span className="font-semibold text-blue-600">156</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {t('streaming.activity.reactions') || 'Reactions given'}
              </span>
              <span className="font-semibold text-purple-600">89</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}