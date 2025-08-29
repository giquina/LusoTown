'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Card, CardContent } from '@/components/ui/card'
import { ModernButton } from '@/components/ui/ModernButton'

/**
 * Stream Replay Library for Portuguese Cultural Content
 * Optimized for mobile performance and cultural context
 */
export default function StreamReplayLibrary() {
  const { t } = useLanguage()

  const replays = [
    {
      id: '1',
      title: 'Fado Night in London',
      thumbnail: '/images/fado-night.jpg',
      duration: '2:15:30',
      views: 1250,
      date: '2024-08-15'
    },
    {
      id: '2', 
      title: 'PALOP Cultural Festival',
      thumbnail: '/images/palop-festival.jpg',
      duration: '1:45:20',
      views: 890,
      date: '2024-08-12'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {t('streaming.replayLibrary.title') || 'Cultural Content Library'}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('streaming.replayLibrary.description') || 'Watch recorded Portuguese cultural events and community gatherings.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {replays.map((replay) => (
          <Card key={replay.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-4xl mb-2">▶️</div>
                <div className="text-sm">{replay.duration}</div>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {replay.title}
              </h3>
              <div className="flex justify-between text-sm text-gray-600 mb-3">
                <span>{replay.views.toLocaleString()} views</span>
                <span>{new Date(replay.date).toLocaleDateString()}</span>
              </div>
              <ModernButton 
                variant="outline" 
                size="sm" 
                className="w-full"
              >
                {t('streaming.watchReplay') || 'Watch Replay'}
              </ModernButton>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <ModernButton variant="outline">
          {t('streaming.loadMore') || 'Load More Replays'}
        </ModernButton>
      </div>
    </div>
  )
}