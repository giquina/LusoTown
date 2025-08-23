import { Metadata } from 'next'
import Footer from '@/components/Footer'
import SuccessStoriesComponent from '@/components/SuccessStories'
import MatchTestimonials from '@/components/MatchTestimonials'
import HeritagePreservationHub from '@/components/HeritagePreservationHub'
import { communityStats } from '@/config/community'
import { 
  HeartIcon, 
  UsersIcon, 
  SparklesIcon,
  CalendarIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  TrophyIcon,
  StarIcon,
  ChatBubbleOvalLeftIcon
} from '@heroicons/react/24/outline'
import { ROUTES } from '@/config/routes'

// Portuguese success stories dedicated page

export const metadata: Metadata = {
  title: 'Success Stories - Portuguese-speaking community Connections | LusoTown London',
  description: 'Real success stories from Portuguese speakers who found their community in London. From Portugal to Brazil, Angola to Mozambique - discover how LusoTown connects Portuguese hearts across the United Kingdom.',
  keywords: [
    'Portuguese-speaking community London success stories',
    'Brazilian community United Kingdom testimonials',
    'Angolan community London connections',
    'Mozambican community United Kingdom experiences',
    'Cape Verdean London networking',
    'Portuguese business partnerships United Kingdom',
    'Lusophone community success',
    'Portuguese cultural preservation London',
    'Portuguese-speaking friendship networks United Kingdom',
    'Portuguese heritage community'
  ],
  openGraph: {
    title: 'Success Stories - Real Women, Real Connections | LusoTown',
    description: 'Discover how LusoTown has helped thousands of women 30+ across the United Kingdom build lasting friendships, launch businesses, and create meaningful support networks.',
    type: 'website',
    url: 'https://adyatribe.com/success-stories',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LusoTown Success Stories - Women Building Connections',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Success Stories - Real Women, Real Connections | LusoTown',
    description: 'Discover how LusoTown has helped thousands of women 30+ across the United Kingdom build lasting friendships and support networks.',
    images: ['/og-image.jpg'],
  },
}

export default function SuccessStories() {
  return (
    <main className="min-h-screen">
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-primary-600 mb-6">
                <HeartIcon className="w-4 h-4 mr-2" />
                Real Stories • Real Connections
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">
                From Saudade to Success: Portuguese Hearts United in London
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed text-balance">
                Real Portuguese souls who transformed London loneliness into thriving community connections. From pastéis de nata meetups in Stockwell to fado nights in Camden - discover how nossa gente builds lasting bonds while preserving Portuguese heart in the city's rhythm.
              </p>
            </div>
          </div>
        </section>

        {/* Match Testimonials - Detailed Success Stories */}
        <MatchTestimonials />

        {/* Success Stories Component - Additional Stories */}
        <SuccessStoriesComponent />

        {/* Heritage Preservation Hub */}
        <HeritagePreservationHub />

        {/* Join the Community CTA */}
        <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
          <div className="container-width">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-balance">
                Ready to Write Your Own Success Story?
              </h2>
              <p className="text-lg sm:text-xl mb-8 opacity-90 text-balance">
                Join hundreds of Portuguese speakers who've found their tribe through LusoTown. 
                Your next best friend, business partner, or support network is waiting for you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href={ROUTES.signup}
                  className="bg-white text-primary-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
                >
                  <UsersIcon className="w-5 h-5 mr-2" />
                  Join LusoTown
                </a>
                <a
                  href="/matches"
                  className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 font-semibold px-8 py-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                  Start Matching
                </a>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm opacity-75">
                <div className="flex items-center justify-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  All Portuguese Speakers Welcome
                </div>
                <div className="flex items-center justify-center">
                  <HeartIcon className="w-4 h-4 mr-2" />
                  Love, Friendship & Business
                </div>
                <div className="flex items-center justify-center">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  United Kingdom-Wide Community
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-white">
          <div className="container-width">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Get Inspired by More Success Stories
              </h3>
              <p className="text-gray-600 mb-8">
                Subscribe to receive monthly success stories, community highlights, and tips for building 
                meaningful connections in London's Portuguese-speaking community.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="btn-primary whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              
              <p className="text-xs text-gray-500 mt-4">
                We respect your privacy. Unsubscribe anytime. No spam, just inspiring stories.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}