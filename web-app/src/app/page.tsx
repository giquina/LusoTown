'use client'

import { useState, useEffect } from 'react'
import type { Metadata } from 'next'
import { useLanguage } from '@/context/LanguageContext'
import { communityStats } from '@/config/community'
import { generateJsonLd } from '@/config/seo'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Footer from '@/components/Footer'
import { ROUTES } from '@/config/routes'
import MobileWelcomeWizard from '@/components/MobileWelcomeWizard'
import ResponsiveButton from '@/components/ResponsiveButton'
import PortugueseText from '@/components/PortugueseText'

// Optimized mobile-first lazy loading - Only load what's critical for mobile
const EventsShowcase = dynamic(() => import('@/components/EventsShowcase'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />
})

// Defer everything below-the-fold with intersection observer for mobile performance
const HowItWorks = dynamic(() => import('@/components/HowItWorks'), {
  loading: () => <div className="h-60 bg-gray-100 animate-pulse rounded-xl" />,
  ssr: false
})
const AboutLusoTown = dynamic(() => import('@/components/AboutLusoTown'), {
  loading: () => <div className="h-60 bg-gray-100 animate-pulse rounded-xl" />,
  ssr: false
})
const GroupsShowcase = dynamic(() => import('@/components/GroupsShowcase'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />,
  ssr: false
})
const SuccessStories = dynamic(() => import('@/components/SuccessStories'), {
  loading: () => <div className="h-60 bg-gray-100 animate-pulse rounded-xl" />,
  ssr: false
})
const AppDownloadSection = dynamic(() => import('@/components/AppDownloadSection'), {
  loading: () => <div className="h-48 bg-gray-100 animate-pulse rounded-xl" />,
  ssr: false
})
const TestimonialsNew = dynamic(() => import('@/components/TestimonialsNew'), {
  loading: () => <div className="h-48 bg-gray-100 animate-pulse rounded-xl" />
})
const CustomToursSection = dynamic(() => import('@/components/CustomToursSection'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />,
  ssr: false
})
const MatchHowItWorks = dynamic(() => import('@/components/MatchHowItWorks'), {
  loading: () => <div className="h-80 bg-gray-100 animate-pulse rounded-xl" />,
  ssr: false
})
const CTA = dynamic(() => import('@/components/CTA'), {
  loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded-xl" />
})
const StudentSupportSection = dynamic(() => import('@/components/StudentSupportSection'), {
  loading: () => <div className="h-48 bg-gray-100 animate-pulse rounded-xl" />,
  ssr: false
})
const CoreFeaturesShowcase = dynamic(() => import('@/components/CoreFeaturesShowcase'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />
})
const CommunityFeedSection = dynamic(() => import('@/components/CommunityFeedSection'), {
  loading: () => <div className="h-60 bg-gray-100 animate-pulse rounded-xl" />,
  ssr: false
})
import { 
  ChatBubbleLeftRightIcon, 
  CalendarDaysIcon,
  ArrowRightIcon as ArrowRight,
  ArrowRightIcon,
  UsersIcon,
  RssIcon,
  BookmarkIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  HomeIcon,
  HeartIcon,
  MapPinIcon,
  StarIcon,
  CheckIcon
} from '@heroicons/react/24/outline'

// Page-specific structured data for Portuguese social calendar
const jsonLd = generateJsonLd('organization')

export default function Home() {
  const { t } = useLanguage()
  const [showWelcomeWizard, setShowWelcomeWizard] = useState(false)
  const [showMoreOptions, setShowMoreOptions] = useState(false)

  // Mock user activity for homepage
  const userActivity = ['visited_homepage', 'viewed_events', 'explored_services']

  // Show welcome wizard on first visit (mobile only) - Less aggressive
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('lusotown_welcome_seen')
    const isMobile = window.innerWidth < 768
    
    // Only show after user has been active for 10 seconds to avoid blocking immediate access
    if (!hasSeenWelcome && isMobile) {
      const timer = setTimeout(() => {
        // Double-check user is still on page and hasn't navigated away
        if (!localStorage.getItem('lusotown_welcome_seen')) {
          setShowWelcomeWizard(true)
        }
      }, 10000) // 10 seconds instead of 2

      // Clean up timer if component unmounts
      return () => clearTimeout(timer)
    }
  }, [])

  const handleWelcomeComplete = (action: string) => {
    localStorage.setItem('lusotown_welcome_seen', 'true')
    
    // Navigate based on selection
    switch (action) {
      case 'matches':
        window.location.href = '/matches'
        break
      case 'events':
        window.location.href = ROUTES.events
        break
      default:
        // Stay on homepage
        break
    }
  }

  return (
    <>
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      
      <main className="min-h-screen w-full overflow-x-hidden" role="main">
        <div className="pt-24 w-full">
          <Hero />
          
          {/* Prominent Homepage CTAs - Above the fold */}
          <section className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 py-8 px-4">
            <div className="container mx-auto text-center">
              <div className="max-w-4xl mx-auto space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  {t('homepage.cta.title', 'Join 750+ Portuguese Speakers in the UK')}
                </h2>
                <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
                  {t('homepage.cta.subtitle', 'Free to join • Events • Networking • Culture • Friendship')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
                  {/* Primary Sign Up Button */}
                  <a
                    href={ROUTES.signup}
                    className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:bg-gray-50 transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 min-h-[56px] min-w-[200px]"
                  >
                    <span className="mr-2">🇵🇹</span>
                    {t('homepage.cta.signup', 'Join Community - FREE')}
                    <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  
                  {/* Secondary Demo Button */}
                  <a
                    href={ROUTES.login}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 border-2 border-white/30 text-white rounded-2xl font-semibold text-base hover:border-white hover:bg-white/10 transition-all duration-300 min-h-[56px] min-w-[160px]"
                  >
                    {t('homepage.cta.demo', 'Try Demo')}
                  </a>
                </div>
                
                {/* Trust indicators */}
                <div className="flex flex-wrap justify-center items-center gap-6 text-white/80 text-sm">
                  <div className="flex items-center gap-2">
                    <UsersIcon className="h-4 w-4" />
                    <span>750+ Members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4" />
                    <span>London & UK</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarIcon className="h-4 w-4 text-yellow-300" />
                    <span>4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4" />
                    <span>Free to Join</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Mobile Quick Actions - Simplified Portuguese focus */}
          <section className="md:hidden bg-white py-6 border-b border-gray-100" aria-label="Quick actions for mobile users">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{t('mobile.quick_start_title', 'Quick Start')}</h2>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600 font-semibold">750+ portugueses</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-blue-600 font-semibold">Londres & UK</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-green-600 bg-green-100 px-3 py-1 rounded-full font-bold mb-1">
                    FREE
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="text-yellow-500">⭐</span>
                    <span className="ml-1">4.9/5</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                {/* Primary Action - Join Community */}
                <ResponsiveButton
                  href={ROUTES.signup}
                  variant="primary"
                  size="lg"
                  fullWidth
                  portugueseTextFallback={t('mobile.join_community_short', 'Join Free')}
                  aria-label="Join Portuguese community for free"
                  className="!p-5 !justify-between !text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <UsersIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <PortugueseText 
                        className="text-lg font-bold mb-1 text-white" 
                        maxLength={25}
                        fallback={t('mobile.join_community_short', 'Join Free')}
                      >
                        {t('mobile.join_community_title', 'Join Portuguese Community')}
                      </PortugueseText>
                      <PortugueseText 
                        className="text-sm text-white/90"
                        maxLength={35}
                        fallback={t('mobile.free_signup', 'FREE Signup')}
                      >
                        {t('mobile.join_community_subtitle', '750+ Portuguese speakers - FREE to join')}
                      </PortugueseText>
                    </div>
                  </div>
                  <div className="bg-white/20 px-3 py-1 rounded-full">
                    <span className="text-sm font-bold">FREE</span>
                  </div>
                </ResponsiveButton>

                {/* Secondary Action - Cultural Events */}
                <ResponsiveButton
                  href={ROUTES.events}
                  variant="secondary"
                  size="md"
                  fullWidth
                  portugueseTextFallback={t('mobile.events_short', 'Cultural Events')}
                  aria-label="Browse Portuguese cultural events and festivals"
                  className="!p-4 !justify-between !text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      <CalendarDaysIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <PortugueseText 
                        className="font-semibold text-gray-900 mb-1"
                        maxLength={22}
                        fallback={t('mobile.events_short', 'Cultural Events')}
                      >
                        {t('mobile.cultural_events_title', 'Browse Cultural Events')}
                      </PortugueseText>
                      <PortugueseText 
                        className="text-sm text-gray-600"
                        maxLength={28}
                        fallback={t('mobile.fado_more', 'Fado & more')}
                      >
                        {t('mobile.cultural_events_subtitle', 'Fado nights, festivals & more')}
                      </PortugueseText>
                    </div>
                  </div>
                  <ArrowRightIcon className="w-5 h-5 text-gray-400" />
                </ResponsiveButton>
              </div>

              {/* More Options Button */}
              <button
                onClick={() => setShowMoreOptions(!showMoreOptions)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-center hover:bg-gray-100 transition-colors active:scale-95"
              >
                <div className="text-sm font-medium text-gray-700">{t('mobile.more_features', 'Explore All Features')}</div>
              </button>
              
              {/* Expandable More Options */}
              {showMoreOptions && (
                <div className="mt-3 grid grid-cols-4 gap-2">
                  <a href={ROUTES.feed} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center hover:bg-gray-100 transition-colors">
                    <RssIcon className="w-5 h-5 text-coral-500 mx-auto mb-1" />
                    <div className="text-xs font-medium text-gray-700">Feed</div>
                  </a>
                  <a href="/tours" className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center hover:bg-gray-100 transition-colors">
                    <MapPinIcon className="w-5 h-5 text-accent-500 mx-auto mb-1" />
                    <div className="text-xs font-medium text-gray-700">Tours</div>
                  </a>
                  <a href={ROUTES.saved} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center hover:bg-gray-100 transition-colors">
                    <BookmarkIcon className="w-5 h-5 text-action-500 mx-auto mb-1" />
                    <div className="text-xs font-medium text-gray-700">Saved</div>
                  </a>
                  <a href={ROUTES.host} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center hover:bg-gray-100 transition-colors">
                    <BriefcaseIcon className="w-5 h-5 text-premium-500 mx-auto mb-1" />
                    <div className="text-xs font-medium text-gray-700">Host</div>
                  </a>
                </div>
              )}
              
              {/* Portuguese-speaking community Testimonial - Mobile Only */}
              <div className="mt-4 bg-gradient-to-r from-green-50 to-red-50 rounded-2xl p-4 border border-green-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                    M
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Maria, Lisboa → London</div>
                    <div className="flex items-center text-xs text-gray-600">
                      <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                      <span className="ml-1">Verified Portuguese</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 italic leading-relaxed">
                  "Encontrei portugueses incríveis aqui! Sinto-me em casa em Londres. 
                  Os eventos de fado são autênticos e a comunidade é muito acolhedora."
                </p>
                <div className="mt-2 text-xs text-green-600 font-medium">
                  🇵🇹 Joined 8 events • Found 12+ Portuguese-speaking friends
                </div>
              </div>
            </div>
          </section>

          <CoreFeaturesShowcase />
          <TestimonialsNew />
          <HowItWorks />
          <MatchHowItWorks />
          <AboutLusoTown />
          {/* Portuguese-speaking community Activities Section */}
          <section className="py-24 bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/30 relative overflow-hidden border-t border-gray-100" aria-labelledby="community-activities">
            {/* Portuguese-inspired background decorative elements */}
            <div className="absolute inset-0" aria-hidden="true">
              <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-secondary-200/40 via-accent-100/30 to-coral-100/30 rounded-full opacity-60 animate-pulse" />
              <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-tr from-action-200/40 via-secondary-100/30 to-accent-100/30 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '8s' }} />
              <div className="absolute top-1/4 left-1/6 w-6 h-6 bg-secondary-300/50 rounded-full opacity-40" />
              <div className="absolute top-3/4 right-1/5 w-4 h-4 bg-accent-300/50 rounded-full opacity-30" />
              <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-coral-300/50 rounded-full opacity-35" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-7xl mx-auto">
                {/* Section Header with Portuguese Cultural Elements */}
                <header className="text-center mb-20">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-50/80 via-accent-50/60 to-coral-50/60 border border-secondary-200/40 rounded-3xl px-10 py-5 shadow-2xl mb-10 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-red-500 animate-pulse shadow-sm" aria-hidden="true"></div>
                      <span className="text-sm font-bold bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
                        {t('what-you-can-do.badge')}
                      </span>
                    </div>
                    <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse" aria-hidden="true"></div>
                  </div>
                  
                  <h2 id="community-activities" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
                    {t('what-you-can-do.title')}
                  </h2>
                  <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 mb-6 font-medium max-w-6xl mx-auto leading-relaxed">
                    {t('what-you-can-do.subtitle')}
                  </p>
                  <blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-600 italic max-w-5xl mx-auto font-medium" cite="Maria, London">
                    {t('what-you-can-do.testimonial')}
                  </blockquote>
                </header>
                
                {/* Portuguese-speaking community Activities Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-20" role="group" aria-label="Portuguese-speaking community activities">
                  {/* Find & Join Events */}
                  <article className="group relative">
                    <div className="bg-white/90 backdrop-blur-lg border border-white/60 rounded-3xl p-6 lg:p-8 min-h-[380px] sm:min-h-[420px] lg:min-h-[450px] shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden flex flex-col">
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary-50/60 via-transparent to-accent-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" aria-hidden="true" />
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl" aria-hidden="true">
                          <ChatBubbleLeftRightIcon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                        </div>
                        <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-4 lg:mb-6 group-hover:text-secondary-600 transition-colors duration-300">
                          {t('what-you-can-do.events.title')}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4 lg:mb-6 flex-grow text-base lg:text-lg break-words">
                          {t('what-you-can-do.events.description')}
                        </p>
                        <div className="text-sm lg:text-base text-gray-500 mb-3 lg:mb-4 font-medium break-words">
                          {t('what-you-can-do.events.locations')}
                        </div>
                        <a 
                          href={ROUTES.events} 
                          className="inline-flex items-center gap-2 text-secondary-600 font-semibold hover:text-secondary-700 transition-colors group-hover:gap-3 duration-300 text-base lg:text-lg"
                          aria-describedby="events-description"
                        >
                          {t('what-you-can-do.events.cta')}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </article>

                  {/* Create Your Own Groups */}
                  <div className="group relative">
                    <div className="bg-white/90 backdrop-blur-lg border border-white/60 rounded-3xl p-6 lg:p-8 min-h-[380px] sm:min-h-[420px] lg:min-h-[450px] shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden flex flex-col">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-50/60 via-transparent to-coral-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-accent-500 to-coral-500 rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl">
                          <UsersIcon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                        </div>
                        <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-4 lg:mb-6 group-hover:text-accent-600 transition-colors duration-300">
                          {t('what-you-can-do.groups.title')}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4 lg:mb-6 flex-grow text-base lg:text-lg break-words">
                          {t('what-you-can-do.groups.description')}
                        </p>
                        <div className="text-sm lg:text-base text-gray-500 mb-3 lg:mb-4 font-medium break-words">
                          {t('what-you-can-do.groups.examples')}
                        </div>
                          <a 
                            href={`${ROUTES.groups}/create`} 
                            className="inline-flex items-center gap-2 text-accent-600 font-semibold hover:text-accent-700 transition-colors group-hover:gap-3 duration-300 text-base lg:text-lg"
                          >
                            {t('what-you-can-do.groups.cta')}
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </a>
                      </div>
                    </div>
                  </div>

                  {/* Stay Updated on LusoFeed */}
                  <div className="group relative">
                    <div className="bg-white/90 backdrop-blur-lg border border-white/60 rounded-3xl p-6 lg:p-8 min-h-[380px] sm:min-h-[420px] lg:min-h-[450px] shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden flex flex-col">
                      <div className="absolute inset-0 bg-gradient-to-br from-coral-50/60 via-transparent to-secondary-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-coral-500 to-action-500 rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl">
                          <RssIcon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                        </div>
                        <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-4 lg:mb-6 group-hover:text-coral-500 transition-colors duration-300">
                          {t('what-you-can-do.feed.title')}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4 lg:mb-6 flex-grow text-base lg:text-lg break-words">
                          {t('what-you-can-do.feed.description')}
                        </p>
                        <div className="text-sm lg:text-base text-gray-500 mb-3 lg:mb-4 font-medium break-words">
                          {t('what-you-can-do.feed.features')}
                        </div>
                        <a 
                          href={ROUTES.feed} 
                          className="inline-flex items-center gap-2 text-coral-500 font-semibold hover:text-coral-600 transition-colors group-hover:gap-3 duration-300 text-base lg:text-lg"
                        >
                          {t('what-you-can-do.feed.cta')}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Save Your Favourites */}
                  <div className="group relative">
                    <div className="bg-white/90 backdrop-blur-lg border border-white/60 rounded-3xl p-6 lg:p-8 min-h-[380px] sm:min-h-[420px] lg:min-h-[450px] shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden flex flex-col">
                      <div className="absolute inset-0 bg-gradient-to-br from-action-50/60 via-transparent to-premium-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-action-500 to-premium-500 rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl">
                          <BookmarkIcon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                        </div>
                        <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-4 lg:mb-6 group-hover:text-action-600 transition-colors duration-300">
                          {t('what-you-can-do.favorites.title')}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4 lg:mb-6 flex-grow text-base lg:text-lg break-words">
                          {t('what-you-can-do.favorites.description')}
                        </p>
                        <div className="text-sm lg:text-base text-gray-500 mb-3 lg:mb-4 font-medium break-words">
                          {t('what-you-can-do.favorites.types')}
                        </div>
                        <a 
                          href={ROUTES.saved} 
                          className="inline-flex items-center gap-2 text-action-600 font-semibold hover:text-action-700 transition-colors group-hover:gap-3 duration-300 text-base lg:text-lg"
                        >
                          {t('what-you-can-do.favorites.cta')}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Share Your Expertise - NEW */}
                  <div className="group relative">
                    <div className="bg-white/90 backdrop-blur-lg border border-white/60 rounded-3xl p-6 lg:p-8 min-h-[380px] sm:min-h-[420px] lg:min-h-[450px] shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden flex flex-col">
                      <div className="absolute inset-0 bg-gradient-to-br from-premium-50/60 via-transparent to-coral-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-premium-500 to-coral-500 rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl">
                          <AcademicCapIcon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                        </div>
                        <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-4 lg:mb-6 group-hover:text-premium-600 transition-colors duration-300">
                          {t('what-you-can-do.host.title')}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4 lg:mb-6 flex-grow text-base lg:text-lg break-words">
                          {t('what-you-can-do.host.description')}
                        </p>
                        <div className="text-sm lg:text-base text-gray-500 mb-3 lg:mb-4 font-medium break-words">
                          {t('what-you-can-do.host.examples')}
                        </div>
                          <a 
                            href={ROUTES.host} 
                            className="inline-flex items-center gap-2 text-premium-600 font-semibold hover:text-premium-700 transition-colors group-hover:gap-3 duration-300 text-base lg:text-lg"
                          >
                            {t('what-you-can-do.host.cta')}
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call-to-Action Section */}
                <div className="text-center">
                  <div className="bg-gradient-to-r from-white/80 via-secondary-50/60 to-accent-50/60 backdrop-blur-lg border border-white/40 rounded-3xl p-12 shadow-2xl max-w-5xl mx-auto">
                    <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                      {t('cta.title')}
                    </h3>
                    <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                      Join {communityStats.members} Portuguese speakers from Brazil, Portugal, Africa and beyond creating amazing memories together across the UK - from vibrant cultural events to inspiring professional networking, exciting family activities to magical weekend getaways throughout Britain!
                    </p>
                    <div className="flex flex-row gap-3 sm:gap-4 justify-center">
                      <a
                        href={ROUTES.signup}
                        className="group relative text-base sm:text-lg font-bold px-6 sm:px-10 py-4 bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 overflow-hidden flex-1 max-w-[180px] sm:max-w-none"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary-700 via-action-700 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 whitespace-nowrap">
                          {t('hero.cta.secondary')}
                          <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                      </a>
                      <a
                        href={ROUTES.events}
                        className="text-base sm:text-lg font-bold px-6 sm:px-10 py-4 bg-white/80 backdrop-blur-lg text-gray-800 border-2 border-gray-200/60 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:border-secondary-300 hover:-translate-y-1 hover:bg-white/90 whitespace-nowrap flex-1 max-w-[180px] sm:max-w-none text-center"
                      >
                        {t('core_features.explore_features')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          <Features />

          <EventsShowcase />
          <GroupsShowcase />
          <CommunityFeedSection />
          <SuccessStories />
          <CustomToursSection showHeader={true} />
          <AppDownloadSection />
          
          {/* Student Support Section */}
          <StudentSupportSection />
          
          <CTA />
          <Footer />
        </div>
        
        {/* Mobile Floating Action Button - Only show on mobile */}
        <div className="md:hidden fixed bottom-20 right-4 z-40">
          <button
            onClick={() => window.location.href = '/matches'}
            className="group w-14 h-14 bg-gradient-to-br from-secondary-600 to-action-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center active:scale-95"
            aria-label="Find your Portuguese match"
          >
            <HeartIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xs font-bold text-white">!</span>
            </div>
          </button>
          
          {/* Tooltip */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Find matches - FREE
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-0 h-0 border-l-[6px] border-l-gray-900 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
          </div>
        </div>
        
        {/* Cross-Platform Engagement Triggers */}
        {/* CrossPlatformEngagementTriggers component removed */}
        
        {/* Mobile Welcome Wizard */}
        <MobileWelcomeWizard
          isOpen={showWelcomeWizard}
          onClose={() => setShowWelcomeWizard(false)}
          onComplete={handleWelcomeComplete}
        />
      </main>
    </>
  )
}