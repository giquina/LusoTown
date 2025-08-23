'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { 
  TrendingUp,
  Hash,
  MapPin,
  Calendar,
  Music,
  Utensils,
  Car,
  Users,
  ExternalLink,
  Flame as Fire
} from 'lucide-react'

interface TrendingItem {
  id: string
  type: 'hashtag' | 'location' | 'event' | 'topic'
  name: string
  displayName: string
  count: number
  growth: number
  icon?: React.ReactNode
  category: 'cultural' | 'location' | 'service' | 'general'
  description?: string
}

export default function TrendingSection({ className = '' }: { className?: string }) {
  const { language, t } = useLanguage()

  // Mock trending data - would come from real analytics in production
  const trendingItems: TrendingItem[] = [
    {
      id: 'fado',
      type: 'hashtag',
      name: 'fado',
      displayName: '#Fado',
      count: 127,
      growth: 45,
      icon: <Music className="w-4 h-4" />,
      category: 'cultural',
      description: 'Traditional Portuguese music'
    },
    {
      id: 'stockwell',
      type: 'location',
      name: 'stockwell',
      displayName: 'Stockwell',
      count: 89,
      growth: 23,
      icon: <MapPin className="w-4 h-4" />,
      category: 'location',
      description: 'Portuguese-speaking community hub'
    },
    {
      id: 'pasteis_de_nata',
      type: 'hashtag',
      name: 'pasteis_de_nata',
      displayName: '#PasteisDeNata',
      count: 76,
      growth: 67,
      icon: <Utensils className="w-4 h-4" />,
      category: 'cultural',
      description: 'Portuguese custard tarts'
    },
    {
      id: 'lusotown_transport',
      type: 'topic',
      name: 'transport',
      displayName: 'Portuguese Transport',
      count: 45,
      growth: 12,
      icon: <Car className="w-4 h-4" />,
      category: 'service',
      description: 'Community transport services'
    },
    {
      id: 'santos_populares',
      type: 'hashtag',
      name: 'santos_populares',
      displayName: '#SantosPopulares',
      count: 34,
      growth: 156,
      icon: <Calendar className="w-4 h-4" />,
      category: 'cultural',
      description: 'Portuguese popular saints festivals'
    },
    {
      id: 'vauxhall',
      type: 'location',
      name: 'vauxhall',
      displayName: 'Vauxhall',
      count: 32,
      growth: 8,
      icon: <MapPin className="w-4 h-4" />,
      category: 'location',
      description: 'Brazilian community area'
    }
  ]

  const getGrowthColor = (growth: number) => {
    if (growth > 50) return 'text-green-600'
    if (growth > 20) return 'text-yellow-600'
    return 'text-gray-600'
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cultural':
        return 'bg-primary-100 text-primary-700'
      case 'location':
        return 'bg-secondary-100 text-secondary-700'
      case 'service':
        return 'bg-accent-100 text-accent-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t('trending.title') || 'Trending'}
              </h3>
              <p className="text-sm text-gray-600">
                {t('trending.subtitle') || 'Popular in Portuguese-speaking community'}
              </p>
            </div>
          </div>
          <Fire className="w-5 h-5 text-orange-500" />
        </div>

        {/* Trending Items */}
        <div className="space-y-3">
          {trendingItems.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group"
            >
              <div className="flex items-center space-x-3 flex-1">
                {/* Ranking */}
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold text-gray-600">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getCategoryColor(item.category)}`}>
                  {item.icon || <Hash className="w-4 h-4" />}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                      {item.displayName}
                    </h4>
                    {item.growth > 30 && (
                      <div className="flex items-center space-x-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                        <TrendingUp className="w-3 h-3" />
                        <span>Hot</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-600">
                      {item.count} {t('trending.posts') || 'posts'}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className={getGrowthColor(item.growth)}>
                      +{item.growth}% {t('trending.growth') || 'growth'}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-xs text-gray-500 mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Arrow */}
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button className="w-full px-4 py-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors text-sm font-medium">
            {t('trending.view_all') || 'View All Trending'}
          </button>
        </div>
      </div>

      {/* Portuguese Cultural Highlights */}
      <div className="px-6 pb-6">
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
              <Star className="w-3 h-3 text-white" />
            </div>
            <h4 className="font-semibold text-primary-900">
              {t('trending.cultural_highlight') || 'Cultural Highlight'}
            </h4>
          </div>
          
          <div className="space-y-2">
            <h5 className="font-medium text-primary-800">
              {t('trending.fado_weekend') || 'Fado Weekend in London'}
            </h5>
            <p className="text-sm text-primary-700">
              {t('trending.fado_description') || 'Join the Portuguese-speaking community for an authentic Fado experience across London venues this weekend.'}
            </p>
            <div className="flex items-center space-x-4 text-xs text-primary-600 mt-3">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{t('trending.this_weekend') || 'This Weekend'}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>127 {t('trending.interested') || 'interested'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Star = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)