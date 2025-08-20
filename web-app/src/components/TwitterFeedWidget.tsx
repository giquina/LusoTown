'use client'

import React, { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Twitter, Users, TrendingUp, MessageCircle, ExternalLink } from 'lucide-react'

interface TwitterFeedWidgetProps {
  hashtag?: string
  maxTweets?: number
  className?: string
}

interface TwitterEmbedOptions {
  theme?: 'light' | 'dark'
  'tweet-limit'?: number
  'chrome'?: string
  'border-color'?: string
  'aria-polite'?: 'polite' | 'assertive' | 'off'
}

const PORTUGUESE_HASHTAGS = {
  community: 'LusoLondon',
  events: 'PortugueseEvents',
  business: 'PortugueseBusiness',
  cultural: 'PortugueseCulture',
  uk: 'PortugueseUK',
  lusotown: 'LusoTown',
  food: 'PortugueseFood',
  fado: 'FadoLondon'
} as const

export default function TwitterFeedWidget({ 
  hashtag = 'LusoLondon',
  maxTweets = 5,
  className = ''
}: TwitterFeedWidgetProps) {
  const { language, t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const loadTwitterWidget = () => {
      setIsLoading(true)
      setHasError(false)

      // Check if Twitter script is already loaded
      if (typeof window !== 'undefined' && (window as any).twttr) {
        (window as any).twttr.widgets.load()
        setIsLoading(false)
        return
      }

      // Load Twitter widget script
      const script = document.createElement('script')
      script.src = 'https://platform.twitter.com/widgets.js'
      script.async = true
      script.charset = 'utf-8'
      
      script.onload = () => {
        timeoutId = setTimeout(() => {
          if ((window as any).twttr && (window as any).twttr.widgets) {
            (window as any).twttr.widgets.load()
            setIsLoading(false)
          } else if (retryCount < 3) {
            setRetryCount(prev => prev + 1)
            loadTwitterWidget()
          } else {
            setHasError(true)
            setIsLoading(false)
          }
        }, 1000)
      }

      script.onerror = () => {
        if (retryCount < 3) {
          setRetryCount(prev => prev + 1)
          setTimeout(loadTwitterWidget, 2000)
        } else {
          setHasError(true)
          setIsLoading(false)
        }
      }

      document.head.appendChild(script)
    }

    loadTwitterWidget()

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [retryCount])

  const getTwitterUrl = () => {
    const searchQuery = `%23${hashtag} OR %23PortugueseUK OR %23LusoLondon`
    return `https://twitter.com/search?q=${searchQuery}&src=typed_query&f=live`
  }

  const fallbackContent = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="text-center">
        <Twitter className="w-12 h-12 text-[#1DA1F2] mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t('twitter_feed.unavailable_title')}
        </h3>
        <p className="text-gray-600 mb-4">
          {t('twitter_feed.unavailable_subtitle')}
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <span className="font-medium">#{hashtag}</span>
            <span>•</span>
            <span>#PortugueseUK</span>
            <span>•</span>
            <span>#LusoLondon</span>
          </div>
          <a
            href={getTwitterUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a91da] transition-colors"
          >
            <Twitter className="w-4 h-4" />
            <span>
              {t('twitter_feed.view_on_twitter')}
            </span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  )

  const loadingContent = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="animate-pulse space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="flex space-x-4">
          <div className="h-8 bg-gray-200 rounded w-16"></div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  )

  if (hasError) {
    return fallbackContent()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-lg flex items-center justify-center">
            <Twitter className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {t('twitter_feed.title')}
            </h2>
            <p className="text-sm text-gray-600">
              {t('twitter_feed.subtitle')}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <a
            href={getTwitterUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs bg-[#1DA1F2] text-white rounded-full hover:bg-[#1a91da] transition-colors"
          >
            <span>{t('twitter_feed.view_more')}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center space-x-1 text-xs text-gray-600">
              <Users className="w-3 h-3" />
              <span>{t('twitter_feed.community_stats')}</span>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center space-x-1 text-xs text-gray-600">
              <TrendingUp className="w-3 h-3" />
              <span>{t('twitter_feed.trending_stats')}</span>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center space-x-1 text-xs text-gray-600">
              <MessageCircle className="w-3 h-3" />
              <span>{t('twitter_feed.conversations_stats')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Twitter Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading && loadingContent()}
        
        {!isLoading && !hasError && (
          <a
            className="twitter-timeline"
            href={getTwitterUrl()}
            data-tweet-limit={maxTweets}
            data-theme="light"
            data-chrome="noheader nofooter noborders transparent"
            data-border-color="#e5e7eb"
            data-aria-polite="polite"
          >
            {language === 'pt' 
              ? 'Tweets sobre a comunidade portuguesa em Londres'
              : 'Tweets about Portuguese community in the U.K.'
            }
          </a>
        )}
      </div>

      {/* Hashtag Links */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(PORTUGUESE_HASHTAGS).map(([key, tag]) => (
          <a
            key={key}
            href={`https://twitter.com/hashtag/${tag}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 rounded-full text-xs transition-colors"
          >
            #{tag}
          </a>
        ))}
      </div>
    </div>
  )
}