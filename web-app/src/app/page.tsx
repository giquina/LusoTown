'use client'

import type { Metadata } from 'next'
import { useLanguage } from '@/context/LanguageContext'
import { communityStats } from '@/config/community'
import { generateJsonLd } from '@/config/seo'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Footer from '@/components/Footer'
import { ROUTES } from '@/config/routes'

// Optimized lazy loading with priority-based loading and better placeholders
const HowItWorks = dynamic(() => import('@/components/HowItWorks'), {
  loading: () => <div className="h-80 bg-gradient-to-r from-gray-50 to-gray-100 animate-pulse rounded-xl" />
})
const AboutLusoTown = dynamic(() => import('@/components/AboutLusoTown'), {
  loading: () => <div className="h-80 bg-gradient-to-r from-secondary-50 to-accent-50 animate-pulse rounded-xl" />
})
// Critical above-the-fold - load immediately
const EventsShowcase = dynamic(() => import('@/components/EventsShowcase'))
const GroupsShowcase = dynamic(() => import('@/components/GroupsShowcase'), {
  loading: () => <div className="h-96 bg-gradient-to-r from-accent-50 to-coral-50 animate-pulse rounded-xl" />
})
// Lower priority components - defer loading
const SuccessStories = dynamic(() => import('@/components/SuccessStories'), {
  loading: () => <div className="h-80 bg-gradient-to-r from-coral-50 to-secondary-50 animate-pulse rounded-xl" />,
  ssr: false // Client-side only for better initial load
})
const AppDownloadSection = dynamic(() => import('@/components/AppDownloadSection'), {
  loading: () => <div className="h-64 bg-gradient-to-r from-action-50 to-premium-50 animate-pulse rounded-xl" />,
  ssr: false
})
const TestimonialsNew = dynamic(() => import('@/components/TestimonialsNew'), {
  loading: () => <div className="h-64 bg-gradient-to-r from-premium-50 to-secondary-50 animate-pulse rounded-xl" />
})
const CustomToursSection = dynamic(() => import('@/components/CustomToursSection'), {
  loading: () => <div className="h-96 bg-gradient-to-r from-accent-50 to-coral-50 animate-pulse rounded-xl" />,
  ssr: false
})
const MatchHowItWorks = dynamic(() => import('@/components/MatchHowItWorks'), {
  loading: () => <div className="h-screen bg-gradient-to-r from-secondary-50 to-action-50 animate-pulse rounded-xl" />
})
const CTA = dynamic(() => import('@/components/CTA'), {
  loading: () => <div className="h-48 bg-gradient-to-r from-secondary-600 to-accent-600 animate-pulse rounded-xl" />
})
const StudentSupportSection = dynamic(() => import('@/components/StudentSupportSection'), {
  loading: () => <div className="h-64 bg-gradient-to-r from-premium-50 to-coral-50 animate-pulse rounded-xl" />,
  ssr: false
})
const CoreFeaturesShowcase = dynamic(() => import('@/components/CoreFeaturesShowcase'), {
  loading: () => <div className="h-screen bg-gradient-to-r from-secondary-50 to-accent-50 animate-pulse rounded-xl" />
})
const CommunityFeedSection = dynamic(() => import('@/components/CommunityFeedSection'), {
  loading: () => <div className="h-screen bg-gradient-to-r from-coral-50 to-action-50 animate-pulse rounded-xl" />,
  ssr: false // Client-side only for Twitter API calls
})
import { 
  ChatBubbleLeftRightIcon, 
  CalendarDaysIcon,
  ArrowRightIcon as ArrowRight,
  UserGroupIcon,
  RssIcon,
  BookmarkIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  HomeIcon
} from '@heroicons/react/24/outline'

// Page-specific structured data for Portuguese social calendar
const jsonLd = generateJsonLd('organization')

export default function Home() {
  const { t } = useLanguage()

  // Mock user activity for homepage
  const userActivity = ['visited_homepage', 'viewed_events', 'explored_services']

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
          <CoreFeaturesShowcase />
          <TestimonialsNew />
          <HowItWorks />
          <MatchHowItWorks />
          <AboutLusoTown />
          {/* Portuguese Community Activities Section */}
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
                
                {/* Portuguese Community Activities Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-20" role="group" aria-label="Portuguese community activities">
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
                          <UserGroupIcon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
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
                      Join {communityStats.members} Portuguese speakers from Brazil, Portugal, Africa and beyond living meaningful lives together in London - from cultural events to professional networking, family-friendly activities to weekend getaways.
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
        
        {/* Cross-Platform Engagement Triggers */}
        {/* CrossPlatformEngagementTriggers component removed */}
      </main>
    </>
  )
}