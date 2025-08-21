'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { communityStats } from '@/config/community'
import { ROUTES } from '@/config/routes'
import { 
  HeartIcon,
  CalendarDaysIcon,
  MapPinIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  PlayIcon,
  PauseIcon,
  SparklesIcon,
  FireIcon,
  TrophyIcon,
  GlobeEuropeAfricaIcon
} from '@heroicons/react/24/outline'
import { 
  HeartIcon as HeartSolid,
  CalendarDaysIcon as CalendarSolid,
  MapPinIcon as MapSolid,
  AcademicCapIcon as AcademicSolid,
  ChatBubbleLeftRightIcon as ChatSolid,
  UserGroupIcon as UserGroupSolid
} from '@heroicons/react/24/solid'

interface FeatureStats {
  primary: string
  secondary: string
  highlight: string
}

interface CoreFeature {
  id: string
  icon: React.ComponentType<{ className?: string }>
  iconSolid: React.ComponentType<{ className?: string }>
  titleKey: string
  descriptionKey: string
  featuresKey: string[]
  statsKey: FeatureStats
  ctaKey: string
  ctaUrl: string
  gradient: string
  accentColor: string
  bgPattern: string
  liveActivity?: {
    count: number
    labelKey: string
  }
}

const coreFeatures: CoreFeature[] = [
  {
    id: 'matches',
    icon: HeartIcon,
    iconSolid: HeartSolid,
    titleKey: 'core_features.matches.title',
    descriptionKey: 'core_features.matches.description',
    featuresKey: [
      'core_features.matches.features.cultural_compatibility',
      'core_features.matches.features.verified_profiles',
      'core_features.matches.features.conversation_starters',
      'core_features.matches.features.event_connections'
    ],
    statsKey: {
      primary: 'core_features.matches.stats.primary',
      secondary: 'core_features.matches.stats.secondary',
      highlight: 'core_features.matches.stats.highlight'
    },
    ctaKey: 'core_features.matches.cta',
    ctaUrl: '/matches',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    accentColor: 'text-rose-600',
    bgPattern: 'bg-gradient-to-br from-rose-50/60 via-pink-50/40 to-red-50/30',
    liveActivity: {
      count: 12,
      labelKey: 'core_features.matches.live_activity'
    }
  },
  {
    id: 'events',
    icon: CalendarDaysIcon,
    iconSolid: CalendarSolid,
    titleKey: 'core_features.events.title',
    descriptionKey: 'core_features.events.description',
    featuresKey: [
      'core_features.events.features.cultural_events',
      'core_features.events.features.networking_meetups',
      'core_features.events.features.portuguese_hosts',
      'core_features.events.features.community_calendar'
    ],
    statsKey: {
      primary: 'core_features.events.stats.primary',
      secondary: 'core_features.events.stats.secondary', 
      highlight: 'core_features.events.stats.highlight'
    },
    ctaKey: 'core_features.events.cta',
    ctaUrl: ROUTES.events,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    accentColor: 'text-emerald-600',
    bgPattern: 'bg-gradient-to-br from-emerald-50/60 via-teal-50/40 to-cyan-50/30',
    liveActivity: {
      count: 8,
      labelKey: 'core_features.events.live_activity'
    }
  },
  {
    id: 'tours',
    icon: MapPinIcon,
    iconSolid: MapSolid,
    titleKey: 'core_features.tours.title',
    descriptionKey: 'core_features.tours.description',
    featuresKey: [
      'core_features.tours.features.portuguese_guides',
      'core_features.tours.features.authentic_experiences',
      'core_features.tours.features.cultural_insights',
      'core_features.tours.features.small_groups'
    ],
    statsKey: {
      primary: 'core_features.tours.stats.primary',
      secondary: 'core_features.tours.stats.secondary',
      highlight: 'core_features.tours.stats.highlight'
    },
    ctaKey: 'core_features.tours.cta',
    ctaUrl: '/tours',
    gradient: 'from-violet-500 via-accent-500 to-primary-500',
    accentColor: 'text-violet-600',
    bgPattern: 'bg-gradient-to-br from-violet-50/60 via-accent-50/40 to-primary-50/30',
    liveActivity: {
      count: 5,
      labelKey: 'core_features.tours.live_activity'
    }
  },
  {
    id: 'students',
    icon: AcademicCapIcon,
    iconSolid: AcademicSolid,
    titleKey: 'core_features.students.title',
    descriptionKey: 'core_features.students.description',
    featuresKey: [
      'core_features.students.features.university_partnerships',
      'core_features.students.features.academic_support',
      'core_features.students.features.career_guidance',
      'core_features.students.features.student_community'
    ],
    statsKey: {
      primary: 'core_features.students.stats.primary',
      secondary: 'core_features.students.stats.secondary',
      highlight: 'core_features.students.stats.highlight'
    },
    ctaKey: 'core_features.students.cta',
    ctaUrl: '/students',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    accentColor: 'text-amber-600',
    bgPattern: 'bg-gradient-to-br from-amber-50/60 via-orange-50/40 to-red-50/30',
    liveActivity: {
      count: 23,
      labelKey: 'core_features.students.live_activity'
    }
  },
  {
    id: 'community',
    icon: ChatBubbleLeftRightIcon,
    iconSolid: ChatSolid,
    titleKey: 'core_features.community.title',
    descriptionKey: 'core_features.community.description',
    featuresKey: [
      'core_features.community.features.real_time_chat',
      'core_features.community.features.group_discussions',
      'core_features.community.features.cultural_topics',
      'core_features.community.features.safe_spaces'
    ],
    statsKey: {
      primary: 'core_features.community.stats.primary',
      secondary: 'core_features.community.stats.secondary',
      highlight: 'core_features.community.stats.highlight'
    },
    ctaKey: 'core_features.community.cta',
    ctaUrl: '/community',
    gradient: 'from-blue-500 via-primary-500 to-accent-500',
    accentColor: 'text-primary-600',
    bgPattern: 'bg-gradient-to-br from-blue-50/60 via-primary-50/40 to-accent-50/30',
    liveActivity: {
      count: 67,
      labelKey: 'core_features.community.live_activity'
    }
  }
]

// Target audience segmentation data
const audienceSegments = [
  {
    labelKey: 'core_features.audience.london_locals',
    percentage: 50,
    color: 'bg-secondary-500',
    count: '375+'
  },
  {
    labelKey: 'core_features.audience.uk_wide',
    percentage: 25,
    color: 'bg-accent-500',
    count: '188+'
  },
  {
    labelKey: 'core_features.audience.international',
    percentage: 25,
    color: 'bg-coral-500',
    count: '187+'
  }
]

export default function CoreFeaturesShowcase() {
  const { t } = useLanguage()
  const [activeFeature, setActiveFeature] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel')
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % coreFeatures.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && activeFeature < coreFeatures.length - 1) {
      setActiveFeature(prev => prev + 1)
      setIsAutoPlaying(false)
    }
    if (isRightSwipe && activeFeature > 0) {
      setActiveFeature(prev => prev - 1)
      setIsAutoPlaying(false)
    }
  }

  const currentFeature = coreFeatures[activeFeature]

  return (
    <section className="py-24 bg-gradient-to-br from-white via-gray-50/30 to-secondary-50/20 relative overflow-hidden" aria-labelledby="core-features-title">
      {/* Portuguese-inspired background elements */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-secondary-200/30 via-accent-100/20 to-coral-100/20 rounded-full opacity-60 animate-pulse" />
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-gradient-to-tr from-action-200/30 via-secondary-100/20 to-accent-100/20 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-secondary-300/40 rounded-full opacity-30" />
        <div className="absolute top-2/3 right-1/5 w-4 h-4 bg-accent-300/40 rounded-full opacity-25" />
        <div className="absolute bottom-1/4 left-2/3 w-3 h-3 bg-coral-300/40 rounded-full opacity-30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-50/90 via-accent-50/70 to-coral-50/70 border border-secondary-200/50 rounded-full px-8 py-4 shadow-xl mb-8 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-red-500 animate-pulse shadow-sm" />
                <span className="text-sm font-bold bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
                  {t('core_features.badge')}
                </span>
              </div>
              <SparklesIcon className="w-4 h-4 text-secondary-600 animate-pulse" />
            </div>

            <h2 id="core-features-title" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
              {t('core_features.title')}
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-secondary-700 mb-8 font-medium max-w-5xl mx-auto leading-relaxed">
              {t('core_features.subtitle')}
            </p>

            {/* Audience Segmentation Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 max-w-4xl mx-auto">
              <div className="flex items-center gap-4">
                <GlobeEuropeAfricaIcon className="w-8 h-8 text-secondary-600" />
                <span className="text-lg font-semibold text-secondary-800">{t('core_features.audience.title')}</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {audienceSegments.map((segment, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-secondary-200/60 rounded-full px-4 py-2 shadow-md">
                    <div className={`w-3 h-3 rounded-full ${segment.color}`} />
                    <span className="text-sm font-medium text-secondary-700">
                      {t(segment.labelKey)} ({segment.count})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={() => setViewMode('carousel')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  viewMode === 'carousel'
                    ? 'bg-secondary-600 text-white shadow-lg'
                    : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                }`}
              >
                {t('core_features.view_modes.carousel')}
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-secondary-600 text-white shadow-lg'
                    : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                }`}
              >
                {t('core_features.view_modes.grid')}
              </button>
            </div>
          </div>

          {/* Carousel View */}
          {viewMode === 'carousel' && (
            <div className="relative">
              {/* Main Feature Display */}
              <div 
                className="relative overflow-hidden rounded-3xl"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className={`min-h-[600px] lg:min-h-[700px] p-8 lg:p-12 ${currentFeature.bgPattern} backdrop-blur-sm border border-white/60 shadow-2xl transition-all duration-500 transform`}>
                  {/* Live Activity Indicator */}
                  {currentFeature.liveActivity && (
                    <div className="absolute top-6 right-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-secondary-200/60 rounded-full px-4 py-2 shadow-lg">
                      <div className="w-2 h-2 bg-action-500 rounded-full animate-pulse" />
                      <span className="text-sm font-semibold text-secondary-800">
                        {currentFeature.liveActivity.count} {t(currentFeature.liveActivity.labelKey)}
                      </span>
                      <FireIcon className="w-4 h-4 text-orange-500" />
                    </div>
                  )}

                  <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
                    {/* Feature Content */}
                    <div className="space-y-8">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${currentFeature.gradient} rounded-2xl flex items-center justify-center shadow-xl transform rotate-3 hover:rotate-6 transition-transform duration-300`}>
                          <currentFeature.iconSolid className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2">
                            {t(currentFeature.titleKey)}
                          </h3>
                          <div className="flex items-center gap-2">
                            <TrophyIcon className="w-5 h-5 text-accent-500" />
                            <span className="text-lg font-semibold bg-gradient-to-r from-secondary-600 to-accent-600 bg-clip-text text-transparent">
                              {t('core_features.premium_feature')}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xl lg:text-2xl text-secondary-700 leading-relaxed">
                        {t(currentFeature.descriptionKey)}
                      </p>

                      {/* Feature List */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        {currentFeature.featuresKey.map((featureKey, index) => (
                          <div key={index} className="flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-white/80 rounded-xl p-4 shadow-md">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentFeature.gradient} shadow-sm`} />
                            <span className="text-base font-medium text-secondary-800">
                              {t(featureKey)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <a
                          href={currentFeature.ctaUrl}
                          className={`group inline-flex items-center justify-center gap-3 text-lg font-bold px-8 py-4 bg-gradient-to-r ${currentFeature.gradient} text-white rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-transecondary-y-1 hover:scale-105`}
                        >
                          <span>{t(currentFeature.ctaKey)}</span>
                          <ArrowRightIcon className="w-5 h-5 group-hover:transecondary-x-1 transition-transform duration-200" />
                        </a>
                        <button className="inline-flex items-center justify-center gap-3 text-lg font-semibold px-8 py-4 bg-white/80 backdrop-blur-sm text-secondary-800 border-2 border-secondary-200/60 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/90">
                          <span>{t('core_features.learn_more')}</span>
                        </button>
                      </div>
                    </div>

                    {/* Stats Section */}
                    <div className="space-y-6">
                      <div className="bg-white/80 backdrop-blur-sm border border-white/80 rounded-2xl p-8 shadow-xl">
                        <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                          {t('core_features.live_stats')}
                        </h4>
                        <div className="space-y-4">
                          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/60">
                            <div className="text-3xl font-black text-action-600 mb-1">
                              {t(currentFeature.statsKey.primary)}
                            </div>
                            <div className="text-sm font-medium text-green-700">
                              {t('core_features.stats.primary')}
                            </div>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200/60">
                            <div className="text-3xl font-black text-primary-600 mb-1">
                              {t(currentFeature.statsKey.secondary)}
                            </div>
                            <div className="text-sm font-medium text-primary-700">
                              {t('core_features.stats.secondary')}
                            </div>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-r from-accent-50 to-violet-50 rounded-xl border border-accent-200/60">
                            <div className="text-3xl font-black text-accent-600 mb-1">
                              {t(currentFeature.statsKey.highlight)}
                            </div>
                            <div className="text-sm font-medium text-accent-700">
                              {t('core_features.stats.highlight')}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Tips */}
                      <div className="bg-gradient-to-br from-yellow-50/80 to-orange-50/80 backdrop-blur-sm border border-yellow-200/60 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center gap-2 mb-4">
                          <SparklesIcon className="w-5 h-5 text-yellow-600" />
                          <h5 className="text-lg font-bold text-yellow-800">
                            {t('core_features.how_this_works')}
                          </h5>
                        </div>
                        <p className="text-yellow-700 leading-relaxed">
                          {t(`core_features.${currentFeature.id}.how_it_works`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={() => {
                    setActiveFeature(prev => prev === 0 ? coreFeatures.length - 1 : prev - 1)
                    setIsAutoPlaying(false)
                  }}
                  className="flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm border border-secondary-200/60 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white group"
                >
                  <ArrowLeftIcon className="w-5 h-5 text-secondary-600 group-hover:text-secondary-800" />
                </button>

                {/* Feature Dots */}
                <div className="flex items-center gap-3">
                  {coreFeatures.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveFeature(index)
                        setIsAutoPlaying(false)
                      }}
                      className={`transition-all duration-300 rounded-full ${
                        index === activeFeature
                          ? 'w-12 h-3 bg-secondary-600'
                          : 'w-3 h-3 bg-secondary-300 hover:bg-secondary-400'
                      }`}
                    />
                  ))}
                </div>

                {/* Auto-play Control */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm border border-secondary-200/60 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white group"
                  >
                    {isAutoPlaying ? (
                      <PauseIcon className="w-5 h-5 text-secondary-600 group-hover:text-secondary-800" />
                    ) : (
                      <PlayIcon className="w-5 h-5 text-secondary-600 group-hover:text-secondary-800" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setActiveFeature(prev => prev === coreFeatures.length - 1 ? 0 : prev + 1)
                      setIsAutoPlaying(false)
                    }}
                    className="flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm border border-secondary-200/60 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white group"
                  >
                    <ArrowRightIcon className="w-5 h-5 text-secondary-600 group-hover:text-secondary-800" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreFeatures.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`group relative ${feature.bgPattern} backdrop-blur-sm border border-white/60 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-transecondary-y-2 hover:scale-105 cursor-pointer`}
                  onClick={() => {
                    setViewMode('carousel')
                    setActiveFeature(index)
                    setIsAutoPlaying(false)
                  }}
                >
                  {/* Live Activity Indicator */}
                  {feature.liveActivity && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-md">
                      <div className="w-1.5 h-1.5 bg-action-500 rounded-full animate-pulse" />
                      <span className="text-xs font-semibold text-secondary-700">
                        {feature.liveActivity.count}
                      </span>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300`}>
                        <feature.iconSolid className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-secondary-800">
                        {t(feature.titleKey)}
                      </h3>
                    </div>

                    <p className="text-secondary-600 leading-relaxed">
                      {t(feature.descriptionKey)}
                    </p>

                    <div className="space-y-2">
                      {feature.featuresKey.slice(0, 2).map((featureKey, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient}`} />
                          <span className="text-secondary-700">{t(featureKey)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-secondary-200/60">
                      <div className="text-center">
                        <div className="text-2xl font-black text-secondary-800 mb-1">
                          {t(feature.statsKey.primary).split(' ')[0]}
                        </div>
                        <div className="text-xs font-medium text-secondary-600">
                          {t(feature.statsKey.primary).split(' ').slice(1).join(' ')}
                        </div>
                      </div>
                    </div>

                    <a
                      href={feature.ctaUrl}
                      className={`group/cta inline-flex items-center gap-2 text-sm font-semibold ${feature.accentColor} hover:underline`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t(feature.ctaKey)}
                      <ArrowRightIcon className="w-4 h-4 group-hover/cta:transecondary-x-1 transition-transform duration-200" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Community Call-to-Action */}
          <div className="text-center mt-20">
            <div className="bg-gradient-to-r from-white/80 via-secondary-50/60 to-accent-50/60 backdrop-blur-lg border border-white/40 rounded-3xl p-12 shadow-2xl max-w-6xl mx-auto">
              <UserGroupIcon className="w-16 h-16 text-secondary-600 mx-auto mb-6" />
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {t('core_features.join_title')}
              </h3>
              <p className="text-lg lg:text-xl text-secondary-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                {t('core_features.join_description').replace('{members}', communityStats.members)}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={ROUTES.signup}
                  className="group relative text-lg font-bold px-10 py-4 bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-transecondary-y-1 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary-700 via-action-700 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {t('core_features.join_now')}
                    <ArrowRightIcon className="h-6 w-6 group-hover:transecondary-x-1 transition-transform duration-200" />
                  </span>
                </a>
                <a
                  href={ROUTES.events}
                  className="text-lg font-bold px-10 py-4 bg-white/80 backdrop-blur-lg text-secondary-800 border-2 border-secondary-200/60 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:border-secondary-300 hover:-transecondary-y-1 hover:bg-white/90"
                >
                  {t('core_features.explore_features')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}