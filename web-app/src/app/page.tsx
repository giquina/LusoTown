import type { Metadata } from 'next'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import AboutLusoTown from '@/components/AboutLusoTown'
import EventsShowcase from '@/components/EventsShowcase'
import SuccessStories from '@/components/SuccessStories'
import AppDownloadSection from '@/components/AppDownloadSection'
import TestimonialsNew from '@/components/TestimonialsNew'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import { 
  ChatBubbleLeftRightIcon, 
  HeartIcon, 
  CalendarDaysIcon 
} from '@heroicons/react/24/outline'

// Page-specific structured data for Portuguese community
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LusoTown London',
  description: 'A digital home for Portuguese-speaking communities in London',
  url: 'https://lusotown.london',
  logo: 'https://lusotown.london/logo.png',
  sameAs: [
    'https://facebook.com/lusotownlondon',
    'https://instagram.com/lusotownlondon',
    'https://twitter.com/lusotownlondon'
  ],
  areaServed: {
    '@type': 'City',
    name: 'London',
    addressCountry: 'GB'
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Portuguese-speaking community',
    geographicArea: {
      '@type': 'City',
      name: 'London'
    }
  }
}

export default function Home() {
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
          <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-secondary-50 relative overflow-hidden">
            {/* Background decorative elements matching hero style */}
            <div className="absolute inset-0">
              <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-accent-200 via-coral-100 to-secondary-100 rounded-full opacity-30 animate-pulse" />
              <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-tr from-secondary-200 via-accent-100 to-action-100 rounded-full opacity-25" />
              <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-secondary-400 rounded-full opacity-40" />
              <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-accent-400 rounded-full" />
              <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-action-400 rounded-full opacity-50" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-50 via-accent-50 to-action-50 border border-secondary-200 rounded-2xl px-6 py-3 shadow-lg mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold bg-gradient-to-r from-secondary-600 to-action-600 bg-clip-text text-transparent">
                      Quick Start Guide
                    </span>
                  </div>
                  <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Explore LusoTown Features</h2>
                <p className="text-lg sm:text-xl text-gray-700 mb-12 font-medium">Discover everything our Portuguese community has to offer</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  <a 
                    href="/feed" 
                    className="group bg-white/70 backdrop-blur-lg border border-white/30 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                      <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-secondary-600 transition-colors duration-300">Community Feed</h3>
                    <p className="text-gray-600 leading-relaxed">Share updates, connect with others, and stay in the loop with the latest from our Portuguese community.</p>
                  </a>
                  
                  <a 
                    href="/favorites" 
                    className="group bg-white/70 backdrop-blur-lg border border-white/30 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-action-500 to-action-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                      <HeartIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-action-600 transition-colors duration-300">My Favourites</h3>
                    <p className="text-gray-600 leading-relaxed">Keep track of the events, businesses, and posts you love so you never miss out.</p>
                  </a>
                  
                  <a 
                    href="/events" 
                    className="group bg-white/70 backdrop-blur-lg border border-white/30 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-coral-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                      <CalendarDaysIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-accent-600 transition-colors duration-300">Events</h3>
                    <p className="text-gray-600 leading-relaxed">Find cultural festivals, food markets, live music, networking meetups, and more.</p>
                  </a>
                </div>
              </div>
            </div>
          </section>
          <Features />
          <EventsShowcase />
          <SuccessStories />
          <AppDownloadSection />
          <TestimonialsNew />
          <CTA />
          <Footer />
        </div>
      </main>
    </>
  )
}