'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { ModernButton } from '@/components/ui/ModernButton'
import { Card, CardContent } from '@/components/ui/card'

/**
 * Stream Categories for Portuguese Cultural Content
 * Organized by cultural themes and community interests
 */
export default function StreamCategories() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    {
      id: 'all',
      name: t('streaming.categories.all') || 'All Streams',
      icon: '🌍',
      count: 12
    },
    {
      id: 'cultural',
      name: t('streaming.categories.cultural') || 'Cultural Events',
      icon: '🎭',
      count: 5
    },
    {
      id: 'music',
      name: t('streaming.categories.music') || 'Music & Fado',
      icon: '🎵',
      count: 3
    },
    {
      id: 'food',
      name: t('streaming.categories.food') || 'Culinary Arts',
      icon: '🍽️',
      count: 2
    },
    {
      id: 'language',
      name: t('streaming.categories.language') || 'Language Learning',
      icon: '📚',
      count: 4
    },
    {
      id: 'community',
      name: t('streaming.categories.community') || 'Community Talk',
      icon: '💬',
      count: 6
    }
  ]

  const featuredStreams = [
    {
      id: '1',
      title: 'Traditional Portuguese Cooking Class',
      category: 'food',
      viewers: 89,
      isLive: true
    },
    {
      id: '2',
      title: 'Fado Guitar Workshop',
      category: 'music',
      viewers: 156,
      isLive: true
    },
    {
      id: '3',
      title: 'PALOP Stories & Traditions',
      category: 'cultural',
      viewers: 203,
      isLive: false
    }
  ]

  const filteredStreams = activeCategory === 'all' 
    ? featuredStreams 
    : featuredStreams.filter(stream => stream.category === activeCategory)

  return (
    <div className="space-y-8">
      {/* Category Navigation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {t('streaming.categories.title') || 'Browse by Category'}
        </h2>
        
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <ModernButton
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className="flex items-center gap-2"
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
              <span className="bg-white bg-opacity-20 px-1.5 py-0.5 rounded-full text-xs">
                {category.count}
              </span>
            </ModernButton>
          ))}
        </div>
      </div>

      {/* Stream Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {activeCategory === 'all' 
            ? (t('streaming.featuredStreams') || 'Featured Streams')
            : categories.find(cat => cat.id === activeCategory)?.name
          }
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStreams.map((stream) => (
            <Card key={stream.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-green-500 relative flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">
                    {stream.isLive ? '🔴' : '▶️'}
                  </div>
                  <div className="text-sm">
                    {stream.isLive ? 'LIVE' : 'RECORDED'}
                  </div>
                </div>
                {stream.isLive && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    LIVE
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold text-base mb-2 line-clamp-2">
                  {stream.title}
                </h4>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>
                    {categories.find(cat => cat.id === stream.category)?.icon} 
                    {categories.find(cat => cat.id === stream.category)?.name}
                  </span>
                  <span className="flex items-center gap-1">
                    👥 {stream.viewers}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {filteredStreams.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🎦</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t('streaming.noStreams.title') || 'No streams in this category'}
          </h3>
          <p className="text-gray-600 mb-4">
            {t('streaming.noStreams.description') || 'Check back later for new Portuguese cultural content.'}
          </p>
          <ModernButton 
            variant="outline"
            onClick={() => setActiveCategory('all')}
          >
            {t('streaming.viewAll') || 'View All Categories'}
          </ModernButton>
        </div>
      )}
    </div>
  )
}