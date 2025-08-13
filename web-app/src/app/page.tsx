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
import WelcomeModal from '@/components/WelcomeModal'
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
      
      <WelcomeModal />
      <main className="min-h-screen w-full overflow-x-hidden">
        <Header />
        <div className="pt-16 w-full">
          <Hero />
          <HowItWorks />
          <AboutLusoTown />
          <section className="py-12 bg-white">
            <div className="container-width px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore LusoTown Features</h2>
                <p className="text-lg text-gray-600 mb-8">Discover everything our community has to offer</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <a 
                    href="/feed" 
                    className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Feed</h3>
                    <p className="text-gray-600">Share updates, connect with others, and stay in the loop with the latest from our Portuguese community.</p>
                  </a>
                  
                  <a 
                    href="/favorites" 
                    className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <HeartIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">My Favourites</h3>
                    <p className="text-gray-600">Keep track of the events, businesses, and posts you love so you never miss out.</p>
                  </a>
                  
                  <a 
                    href="/events" 
                    className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <CalendarDaysIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Events</h3>
                    <p className="text-gray-600">Find cultural festivals, food markets, live music, networking meetups, and more.</p>
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