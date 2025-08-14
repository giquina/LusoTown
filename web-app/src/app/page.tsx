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
  description: 'Real-life meetups for Portuguese speakers across London & UK',
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
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Join Real-Life Portuguese Meetups</h2>
                <p className="text-lg sm:text-xl text-gray-700 mb-12 font-medium">Connect with Portuguese speakers at real locations across London & UK</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  <a 
                    href="/feed" 
                    className="group bg-white/70 backdrop-blur-lg border border-white/30 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                      <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-secondary-600 transition-colors duration-300">Event Feed</h3>
                    <p className="text-gray-600 leading-relaxed">Discover live events from gyms to galleries, restaurants to tours. Real places where Portuguese speakers meet up.</p>
                  </a>
                  
                  <a 
                    href="/favorites" 
                    className="group bg-white/70 backdrop-blur-lg border border-white/30 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-action-500 to-action-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                      <HeartIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-action-600 transition-colors duration-300">Save & Favourite</h3>
                    <p className="text-gray-600 leading-relaxed">Save events and locations you love. Never miss a real-life meetup that interests you.</p>
                  </a>
                  
                  <a 
                    href="/events" 
                    className="group bg-white/70 backdrop-blur-lg border border-white/30 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-coral-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                      <CalendarDaysIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-accent-600 transition-colors duration-300">Create & Join Events</h3>
                    <p className="text-gray-600 leading-relaxed">Create your own meetups or join existing ones. Real activities at real places with Portuguese speakers.</p>
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