'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { 
  Globe,
  Users,
  Star,
  Car,
  Calendar,
  TrendingUp,
  Filter
} from 'lucide-react'

interface FeedFiltersProps {
  activeFilter: 'all' | 'following' | 'cultural' | 'services' | 'events'
  onFilterChange: (filter: 'all' | 'following' | 'cultural' | 'services' | 'events') => void
  className?: string
}

export default function FeedFilters({ activeFilter, onFilterChange, className = '' }: FeedFiltersProps) {
  const { language, t } = useLanguage()

  const filters = [
    {
      id: 'all' as const,
      label: t('feed_filters.all') || 'All Posts',
      description: t('feed_filters.all_desc') || 'Everything from the Portuguese community',
      icon: <Globe className="w-4 h-4" />,
      color: 'primary'
    },
    {
      id: 'following' as const,
      label: t('feed_filters.following') || 'Following',
      description: t('feed_filters.following_desc') || 'Posts from people you follow',
      icon: <Users className="w-4 h-4" />,
      color: 'secondary'
    },
    {
      id: 'cultural' as const,
      label: t('feed_filters.cultural') || 'Cultural',
      description: t('feed_filters.cultural_desc') || 'Portuguese culture, events, and traditions',
      icon: <Star className="w-4 h-4" />,
      color: 'accent'
    },
    {
      id: 'services' as const,
      label: t('feed_filters.services') || 'Services',
      description: t('feed_filters.services_desc') || 'Transport, tours, and business services',
      icon: <Car className="w-4 h-4" />,
      color: 'coral'
    },
    {
      id: 'events' as const,
      label: t('feed_filters.events') || 'Events',
      description: t('feed_filters.events_desc') || 'Community events and gatherings',
      icon: <Calendar className="w-4 h-4" />,
      color: 'action'
    }
  ]

  const getFilterStyles = (filterId: string, color: string, isActive: boolean) => {
    const colorMap = {
      primary: isActive 
        ? 'bg-primary-500 text-white border-primary-500 shadow-lg' 
        : 'bg-primary-50 text-primary-700 border-primary-200 hover:bg-primary-100',
      secondary: isActive 
        ? 'bg-secondary-500 text-white border-secondary-500 shadow-lg' 
        : 'bg-secondary-50 text-secondary-700 border-secondary-200 hover:bg-secondary-100',
      accent: isActive 
        ? 'bg-accent-500 text-white border-accent-500 shadow-lg' 
        : 'bg-accent-50 text-accent-700 border-accent-200 hover:bg-accent-100',
      coral: isActive 
        ? 'bg-coral-500 text-white border-coral-500 shadow-lg' 
        : 'bg-coral-50 text-coral-700 border-coral-200 hover:bg-coral-100',
      action: isActive 
        ? 'bg-action-500 text-white border-action-500 shadow-lg' 
        : 'bg-action-50 text-action-700 border-action-200 hover:bg-action-100'
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.primary
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-secondary-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900">
            {t('feed_filters.title') || 'Filter Feed'}
          </h3>
        </div>
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <TrendingUp className="w-4 h-4" />
          <span>{t('feed_filters.algorithm') || 'Smart Algorithm'}</span>
        </div>
      </div>

      {/* Desktop Filter Buttons */}
      <div className="hidden md:grid md:grid-cols-5 gap-3">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`
              relative flex flex-col items-center justify-center p-4 rounded-lg border transition-all duration-200
              ${getFilterStyles(filter.id, filter.color, activeFilter === filter.id)}
            `}
            aria-label={`Filter by ${filter.label}`}
          >
            <div className="flex items-center space-x-2 mb-2">
              {filter.icon}
              <span className="font-medium">{filter.label}</span>
            </div>
            <p className="text-xs text-center leading-tight opacity-80">
              {filter.description}
            </p>
            
            {/* Active indicator */}
            {activeFilter === filter.id && (
              <div className="absolute -bottom-1 left-1/2 transform -transecondary-x-1/2 w-8 h-1 bg-current rounded-full opacity-60" />
            )}
          </button>
        ))}
      </div>

      {/* Mobile Filter Tabs */}
      <div className="md:hidden">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-full border whitespace-nowrap transition-all duration-200
                ${getFilterStyles(filter.id, filter.color, activeFilter === filter.id)}
              `}
            >
              {filter.icon}
              <span className="font-medium">{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Filter Description */}
      <div className="mt-4 p-3 bg-secondary-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className={`
            w-8 h-8 rounded-lg flex items-center justify-center
            ${
              activeFilter === 'all' ? 'bg-primary-100 text-primary-600' :
              activeFilter === 'following' ? 'bg-secondary-100 text-secondary-600' :
              activeFilter === 'cultural' ? 'bg-accent-100 text-accent-600' :
              activeFilter === 'services' ? 'bg-coral-100 text-coral-600' :
              'bg-action-100 text-action-600'
            }
          `}>
            {filters.find(f => f.id === activeFilter)?.icon}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">
              {t(`feed_filters.active_${activeFilter}`) || filters.find(f => f.id === activeFilter)?.label}
            </h4>
            <p className="text-sm text-secondary-600">
              {filters.find(f => f.id === activeFilter)?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
        <div>
          <p className="font-semibold text-primary-600">247</p>
          <p className="text-secondary-600">{t('feed_filters.posts_today') || 'Posts Today'}</p>
        </div>
        <div>
          <p className="font-semibold text-secondary-600">1.2k</p>
          <p className="text-secondary-600">{t('feed_filters.interactions') || 'Interactions'}</p>
        </div>
        <div>
          <p className="font-semibold text-accent-600">89%</p>
          <p className="text-secondary-600">{t('feed_filters.relevance') || 'Relevance'}</p>
        </div>
      </div>
    </div>
  )
}