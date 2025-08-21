'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import TwitterFeedWidget from './TwitterFeedWidget'
import { 
  Users, 
  Calendar, 
  Briefcase, 
  Palette, 
  MapPin,
  TrendingUp,
  Activity
} from 'lucide-react'

interface HashtagTab {
  id: string
  hashtag: string
  label: {
    en: string
    pt: string
  }
  description: {
    en: string
    pt: string
  }
  icon: React.ReactNode
  color: string
}

const HASHTAG_TABS: HashtagTab[] = [
  {
    id: 'community',
    hashtag: 'LusoLondon',
    label: {
      en: 'Community',
      pt: 'Comunidade'
    },
    description: {
      en: 'General Portuguese community in London',
      pt: 'Comunidade portuguesa geral em Londres'
    },
    icon: <Users className="w-4 h-4" />,
    color: 'primary'
  },
  {
    id: 'events',
    hashtag: 'PortugueseEvents',
    label: {
      en: 'Events',
      pt: 'Eventos'
    },
    description: {
      en: 'Cultural events and gatherings',
      pt: 'Eventos culturais e encontros'
    },
    icon: <Calendar className="w-4 h-4" />,
    color: 'secondary'
  },
  {
    id: 'business',
    hashtag: 'PortugueseBusiness',
    label: {
      en: 'Business',
      pt: 'Negócios'
    },
    description: {
      en: 'Professional networking and opportunities',
      pt: 'Rede profissional e oportunidades'
    },
    icon: <Briefcase className="w-4 h-4" />,
    color: 'accent'
  },
  {
    id: 'cultural',
    hashtag: 'PortugueseCulture',
    label: {
      en: 'Culture',
      pt: 'Cultura'
    },
    description: {
      en: 'Portuguese traditions and heritage',
      pt: 'Tradições e herança portuguesa'
    },
    icon: <Palette className="w-4 h-4" />,
    color: 'coral'
  },
  {
    id: 'uk',
    hashtag: 'PortugueseUK',
    label: {
      en: 'UK Wide',
      pt: 'Todo Reino Unido'
    },
    description: {
      en: 'Portuguese community across the UK',
      pt: 'Comunidade portuguesa em todo o Reino Unido'
    },
    icon: <MapPin className="w-4 h-4" />,
    color: 'action'
  }
]

interface TwitterHashtagTabsProps {
  className?: string
  defaultTab?: string
  maxTweets?: number
}

export default function TwitterHashtagTabs({ 
  className = '',
  defaultTab = 'community',
  maxTweets = 5
}: TwitterHashtagTabsProps) {
  const { language, t } = useLanguage()
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [tweetCounts, setTweetCounts] = useState<Record<string, number>>({})

  const getTabColorClasses = (color: string, isActive: boolean) => {
    const colorMap = {
      primary: isActive 
        ? 'bg-primary-500 text-white border-primary-500' 
        : 'bg-primary-50 text-primary-700 border-primary-200 hover:bg-primary-100',
      secondary: isActive 
        ? 'bg-secondary-500 text-white border-secondary-500' 
        : 'bg-secondary-50 text-secondary-700 border-secondary-200 hover:bg-secondary-100',
      accent: isActive 
        ? 'bg-accent-500 text-white border-accent-500' 
        : 'bg-accent-50 text-accent-700 border-accent-200 hover:bg-accent-100',
      coral: isActive 
        ? 'bg-coral-500 text-white border-coral-500' 
        : 'bg-coral-50 text-coral-700 border-coral-200 hover:bg-coral-100',
      action: isActive 
        ? 'bg-action-500 text-white border-action-500' 
        : 'bg-action-50 text-action-700 border-action-200 hover:bg-action-100'
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.primary
  }

  const activeTabData = HASHTAG_TABS.find(tab => tab.id === activeTab) || HASHTAG_TABS[0]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
        <div className="grid grid-cols-5 gap-1">
          {HASHTAG_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-200
                ${getTabColorClasses(tab.color, activeTab === tab.id)}
              `}
              aria-label={`${tab.label[language]} tab`}
            >
              <div className="flex items-center space-x-1.5 mb-1">
                {tab.icon}
                {tweetCounts[tab.id] && (
                  <span className="flex items-center space-x-1">
                    <Activity className="w-3 h-3" />
                    <span className="text-xs font-medium">
                      {tweetCounts[tab.id]}
                    </span>
                  </span>
                )}
              </div>
              <span className="text-xs font-medium text-center leading-tight">
                {t(`twitter_tabs.${tab.id}`)}
              </span>
              
              {/* Active indicator */}
              {activeTab === tab.id && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-current rounded-full opacity-60" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Description */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              activeTabData.color === 'primary' ? 'bg-primary-100 text-primary-600' :
              activeTabData.color === 'secondary' ? 'bg-secondary-100 text-secondary-600' :
              activeTabData.color === 'accent' ? 'bg-accent-100 text-accent-600' :
              activeTabData.color === 'coral' ? 'bg-coral-100 text-coral-600' :
              'bg-action-100 text-action-600'
            }`}>
              {activeTabData.icon}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                #{activeTabData.hashtag}
              </h3>
              <p className="text-sm text-gray-600">
                {t(`twitter_tabs.${activeTabData.id}_desc`)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">
              {t('twitter_tabs.live_indicator')}
            </span>
          </div>
        </div>
      </div>

      {/* Twitter Feed */}
      <TwitterFeedWidget 
        hashtag={activeTabData.hashtag}
        maxTweets={maxTweets}
        className="transition-all duration-300"
      />

      {/* Additional Hashtag Suggestions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          {t('twitter_tabs.popular_hashtags')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            'LusoTown', 'PortuguesesemLondres', 'ComunidadePortuguesa', 
            'FadoLondon', 'PortugueseFood', 'SantosPopulares',
            'PortugalUK', 'PortugueseDiaspora'
          ].map(hashtag => (
            <a
              key={hashtag}
              href={`https://twitter.com/hashtag/${hashtag}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 rounded-full text-xs transition-colors"
            >
              #{hashtag}
            </a>
          ))}
        </div>
      </div>

      {/* Community Engagement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {t('twitter_tabs.followers')}
              </p>
              <p className="text-xs text-gray-600">2.3K+</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {t('twitter_tabs.engagement')}
              </p>
              <p className="text-xs text-gray-600">+12% {t('twitter_tabs.this_week')}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {t('twitter_tabs.activity')}
              </p>
              <p className="text-xs text-gray-600">
                {t('twitter_tabs.daily')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}