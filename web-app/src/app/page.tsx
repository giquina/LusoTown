'use client'

import type { Metadata } from 'next'
import { useLanguage } from '@/context/LanguageContext'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import AboutLusoTown from '@/components/AboutLusoTown'
import EventsShowcase from '@/components/EventsShowcase'
import GroupsShowcase from '@/components/GroupsShowcase'
import GroupEventsSection from '@/components/GroupEventsSection'
import SuccessStories from '@/components/SuccessStories'
import CaseStudies from '@/components/CaseStudies'
import AppDownloadSection from '@/components/AppDownloadSection'
import TestimonialsNew from '@/components/TestimonialsNew'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import { 
  ChatBubbleLeftRightIcon, 
  HeartIcon, 
  CalendarDaysIcon,
  ArrowRightIcon as ArrowRight,
  UserGroupIcon,
  RssIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline'

// Page-specific structured data for Portuguese social calendar
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LusoTown London',
  description: 'Real-life meetups for Portuguese speakers across the UK',
  url: 'https://lusotown.london',
  logo: 'https://lusotown.london/logo.png',
  sameAs: [
    'https://facebook.com/lusotownlondon',
    'https://instagram.com/lusotownlondon',
    'https://twitter.com/lusotownlondon'
  ],
  areaServed: {
    '@type': 'Country',
    name: 'United Kingdom',
    addressCountry: 'GB'
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Portuguese-speaking community',
    geographicArea: {
      '@type': 'Country',
      name: 'United Kingdom'
    }
  }
}

export default function Home() {
  const { t } = useLanguage()

  return (
    <>
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen w-full overflow-x-hidden">
        <Header />
        <div className="pt-16 w-full">
          <Hero />
          <HowItWorks />
          <AboutLusoTown />
          {/* What You Can Do Section */}
          <section className="py-24 bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/30 relative overflow-hidden border-t border-gray-100">
            {/* Portuguese-inspired background decorative elements */}
            <div className="absolute inset-0">
              <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-secondary-200/40 via-accent-100/30 to-coral-100/30 rounded-full opacity-60 animate-pulse" />
              <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-tr from-action-200/40 via-secondary-100/30 to-accent-100/30 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '8s' }} />
              <div className="absolute top-1/4 left-1/6 w-6 h-6 bg-secondary-300/50 rounded-full opacity-40" />
              <div className="absolute top-3/4 right-1/5 w-4 h-4 bg-accent-300/50 rounded-full opacity-30" />
              <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-coral-300/50 rounded-full opacity-35" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-7xl mx-auto">
                {/* Section Header with Portuguese Cultural Elements */}
                <div className="text-center mb-20">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-50/80 via-accent-50/60 to-coral-50/60 border border-secondary-200/40 rounded-3xl px-10 py-5 shadow-2xl mb-10 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-red-500 animate-pulse shadow-sm"></div>
                      <span className="text-sm font-bold bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
                        {t('what-you-can-do.badge')}
                      </span>
                    </div>
                    <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
                    {t('what-you-can-do.title')}
                  </h2>
                  <p className="text-xl sm:text-2xl text-gray-700 mb-6 font-medium max-w-5xl mx-auto leading-relaxed">
                    {t('what-you-can-do.subtitle')}
                  </p>
                  <blockquote className="text-lg text-gray-600 italic max-w-4xl mx-auto font-medium">
                    {t('what-you-can-do.testimonial')}
                  </blockquote>
                </div>
                
                {/* 4-Column Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                  {/* Find & Join Events */}
                  <div className="group relative h-full">
                    <div className="bg-white/90 backdrop-blur-lg border border-white/60 rounded-3xl p-8 h-full shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden flex flex-col">
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary-50/60 via-transparent to-accent-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl">
                          <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-secondary-600 transition-colors duration-300">
                          {t('what-you-can-do.events.title')}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-6 flex-grow text-sm">
                          {t('what-you-can-do.events.description')}
                        </p>
                        <div className="text-xs text-gray-500 mb-4 font-medium">
                          {t('what-you-can-do.events.locations')}
                        </div>
                        <a 
                          href="/events" 
                          className="inline-flex items-center gap-2 text-secondary-600 font-semibold hover:text-secondary-700 transition-colors group-hover:gap-3 duration-300 text-sm"
                        >
                          {t('what-you-can-do.events.cta')}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Create Your Own Groups */}
                  <div className="group relative h-full">
                    <div className="bg-white/90 backdrop-blur-lg border border-white/60 rounded-3xl p-8 h-full shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden flex flex-col">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-50/60 via-transparent to-coral-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-coral-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl">
                          <UserGroupIcon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-accent-600 transition-colors duration-300">
                          {t('what-you-can-do.groups.title')}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-6 flex-grow text-sm">
                          {t('what-you-can-do.groups.description')}
                        </p>
                        <div className="text-xs text-gray-500 mb-4 font-medium">
                          {t('what-you-can-do.groups.examples')}
                        </div>
                        <a 
                          href="/groups/create" 
                          className="inline-flex items-center gap-2 text-accent-600 font-semibold hover:text-accent-700 transition-colors group-hover:gap-3 duration-300 text-sm"
                        >
                          {t('what-you-can-do.groups.cta')}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Stay Updated on LusoFeed */}
                  <div className="group relative h-full">
                    <div className="bg-white/90 backdrop-blur-lg border border-white/60 rounded-3xl p-8 h-full shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden flex flex-col">
                      <div className="absolute inset-0 bg-gradient-to-br from-coral-50/60 via-transparent to-secondary-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="w-16 h-16 bg-gradient-to-br from-coral-500 to-action-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl">
                          <RssIcon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-coral-500 transition-colors duration-300">
                          {t('what-you-can-do.feed.title')}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-6 flex-grow text-sm">
                          {t('what-you-can-do.feed.description')}
                        </p>
                        <div className="text-xs text-gray-500 mb-4 font-medium">
                          {t('what-you-can-do.feed.features')}
                        </div>
                        <a 
                          href="/feed" 
                          className="inline-flex items-center gap-2 text-coral-500 font-semibold hover:text-coral-600 transition-colors group-hover:gap-3 duration-300 text-sm"
                        >
                          {t('what-you-can-do.feed.cta')}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Save Your Favourites */}
                  <div className="group relative h-full">
                    <div className="bg-white/90 backdrop-blur-lg border border-white/60 rounded-3xl p-8 h-full shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 relative overflow-hidden flex flex-col">
                      <div className="absolute inset-0 bg-gradient-to-br from-action-50/60 via-transparent to-premium-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="w-16 h-16 bg-gradient-to-br from-action-500 to-premium-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl">
                          <BookmarkIcon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-action-600 transition-colors duration-300">
                          {t('what-you-can-do.favorites.title')}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-6 flex-grow text-sm">
                          {t('what-you-can-do.favorites.description')}
                        </p>
                        <div className="text-xs text-gray-500 mb-4 font-medium">
                          {t('what-you-can-do.favorites.types')}
                        </div>
                        <a 
                          href="/saved" 
                          className="inline-flex items-center gap-2 text-action-600 font-semibold hover:text-action-700 transition-colors group-hover:gap-3 duration-300 text-sm"
                        >
                          {t('what-you-can-do.favorites.cta')}
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
                      Ready to Fill Your 
                      <span className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent block sm:inline">
                        Social Calendar?
                      </span>
                    </h3>
                    <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                      Join 500+ Portuguese speakers from all Portuguese-speaking nations booking experiences together - from museum tours to concert nights, football matches to weekend getaways across London.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a
                        href="/signup"
                        className="group relative text-lg font-bold px-10 py-4 bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary-700 via-action-700 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          Start Your Social Calendar
                          <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                      </a>
                      <a
                        href="/events"
                        className="text-lg font-bold px-10 py-4 bg-white/80 backdrop-blur-lg text-gray-800 border-2 border-gray-200/60 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:border-secondary-300 hover:-translate-y-1 hover:bg-white/90"
                      >
                        Explore Experiences
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Features />
          
          {/* Instituto Camões Partnership Section */}
          <section className="py-24 bg-gradient-to-br from-primary-50/60 via-secondary-50/30 to-accent-50/20 relative overflow-hidden border-t border-gray-100">
            <div className="absolute inset-0">
              <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-primary-200/40 via-secondary-100/30 to-accent-100/30 rounded-full opacity-60 animate-pulse" />
              <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-tr from-secondary-200/40 via-accent-100/30 to-primary-100/30 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '8s' }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-100 via-secondary-50 to-accent-100 border border-primary-200 rounded-full px-8 py-3 shadow-lg mb-8">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-red-500 animate-pulse shadow-sm"></div>
                    <span className="text-sm font-bold text-primary-700">
                      {t('instituto.badge', 'Official Portuguese Government Partnership')}
                    </span>
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                  </div>
                  
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
                    {t('instituto.title', 'Recognized by Instituto Camões')}
                  </h2>
                  <p className="text-xl sm:text-2xl text-gray-700 mb-8 font-medium max-w-5xl mx-auto leading-relaxed">
                    {t('instituto.description', 'LusoTown is officially recognized by Instituto Camões as the preferred digital platform for Portuguese cultural promotion and community engagement in the United Kingdom.')}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/60">
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Instituto Camões</h3>
                      <p className="text-gray-600 mb-4">
                        {t('instituto.subtitle', 'Official institute for Portuguese language and culture')}
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span className="text-gray-700 text-sm">
                          {t('instituto.feature1', 'Founding strategic partnership')}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                        <span className="text-gray-700 text-sm">
                          {t('instituto.feature2', 'Certified educational programs')}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                        <span className="text-gray-700 text-sm">
                          {t('instituto.feature3', 'Official cultural resources')}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-premium-500 rounded-full"></div>
                        <span className="text-gray-700 text-sm">
                          {t('instituto.feature4', 'Portuguese government recognition')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/60">
                      <h4 className="font-bold text-gray-900 mb-2">
                        {t('instituto.benefit1.title', 'Exclusive Member Benefits')}
                      </h4>
                      <p className="text-gray-700 text-sm mb-3">
                        {t('instituto.benefit1.description', '25% discount on official Portuguese language courses')}
                      </p>
                      <span className="inline-block bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {t('instituto.benefit1.savings', 'Save up to £105')}
                      </span>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/60">
                      <h4 className="font-bold text-gray-900 mb-2">
                        {t('instituto.benefit2.title', 'Priority Access')}
                      </h4>
                      <p className="text-gray-700 text-sm mb-3">
                        {t('instituto.benefit2.description', 'Official cultural events and academic conferences')}
                      </p>
                      <span className="inline-block bg-secondary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {t('instituto.benefit2.access', 'Exclusive access')}
                      </span>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/60">
                      <h4 className="font-bold text-gray-900 mb-2">
                        {t('instituto.benefit3.title', 'Digital Library')}
                      </h4>
                      <p className="text-gray-700 text-sm mb-3">
                        {t('instituto.benefit3.description', 'Complete access to Portuguese educational resources')}
                      </p>
                      <span className="inline-block bg-accent-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {t('instituto.benefit3.value', '£200/year value')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-12">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/instituto-camoes"
                      className="group relative text-lg font-bold px-10 py-4 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-700 via-secondary-700 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {t('instituto.cta.primary', 'Explore Official Programs')}
                      </span>
                    </a>
                    <a
                      href="/heritage"
                      className="text-lg font-bold px-10 py-4 bg-white/80 backdrop-blur-lg text-gray-800 border-2 border-gray-200/60 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:border-primary-300 hover:-translate-y-1 hover:bg-white/90"
                    >
                      {t('instituto.cta.secondary', 'Cultural Heritage')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <EventsShowcase />
          <GroupEventsSection variant="homepage" maxEvents={6} />
          <GroupsShowcase />
          <SuccessStories />
          <CaseStudies />
          <AppDownloadSection />
          <TestimonialsNew />
          <CTA />
          <Footer />
        </div>
      </main>
    </>
  )
}