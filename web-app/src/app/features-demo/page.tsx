'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  ChatBubbleLeftRightIcon, 
  HeartIcon, 
  CalendarDaysIcon,
  UserGroupIcon,
  MapPinIcon,
  LanguageIcon
} from '@heroicons/react/24/outline'
import LanguageToggleDemo from '@/components/LanguageToggleDemo'
import AutoPostDemo from '@/components/AutoPostDemo'
import FavoritesDemo from '@/components/FavoritesDemo'

export default function FeaturesDemo() {
  const features = [
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'LusoFeed - Community Feed',
      description: 'Share updates, photos, and links with the LusoTown community. Posts can be linked to events or businesses.',
      demo: <LanguageToggleDemo />
    },
    {
      icon: HeartIcon,
      title: 'Save Your Favourites',
      description: 'Bookmark events, businesses, and feed posts you love. Access all saved items from your profile.',
      demo: <FavoritesDemo />
    },
    {
      icon: UserGroupIcon,
      title: 'Auto-Post on RSVP',
      description: 'When you RSVP to an event, it automatically creates a post in LusoFeed to share with the community.',
      demo: <AutoPostDemo />
    }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                LusoTown <span className="gradient-text">Features</span> Demo
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Explore the new features that make LusoTown the ultimate platform for Portuguese speakers in London
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-gray-900">Community Feed</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                  <HeartIcon className="w-5 h-5 text-red-500" />
                  <span className="font-medium text-gray-900">Save Favorites</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                  <UserGroupIcon className="w-5 h-5 text-secondary-600" />
                  <span className="font-medium text-gray-900">Auto-Post RSVPs</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Showcase */}
        <section className="py-20 bg-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  New Features <span className="gradient-text">Overview</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Discover how LusoTown helps you connect, share, and build community with Portuguese speakers in London
                </p>
              </div>
              
              <div className="space-y-20">
                {features.map((feature, index) => (
                  <div 
                    key={feature.title} 
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                    }`}
                  >
                    <div className={`lg:col-span-1 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <div className="max-w-lg">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-xl flex items-center justify-center mb-6">
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                        <p className="text-lg text-gray-600 mb-6">{feature.description}</p>
                        
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-primary-600 text-xs">✓</span>
                            </div>
                            <p className="text-gray-700">Simple and intuitive interface</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-primary-600 text-xs">✓</span>
                            </div>
                            <p className="text-gray-700">Works seamlessly across devices</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-primary-600 text-xs">✓</span>
                            </div>
                            <p className="text-gray-700">Built for the Portuguese-speaking community</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`lg:col-span-1 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                      {feature.demo}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Why <span className="gradient-text">LusoTown</span> Features Matter
              </h2>
              <p className="text-lg text-gray-600">
                Designed to help you build meaningful connections in London's Portuguese community
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-xl flex items-center justify-center mb-4">
                  <UserGroupIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Build Community</h3>
                <p className="text-gray-600">
                  Connect with others who share your language, culture, and experiences in London.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-xl flex items-center justify-center mb-4">
                  <CalendarDaysIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Stay Updated</h3>
                <p className="text-gray-600">
                  Never miss events, businesses, or community updates that matter to you.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-secondary-400 rounded-xl flex items-center justify-center mb-4">
                  <HeartIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Save What You Love</h3>
                <p className="text-gray-600">
                  Bookmark your favorite content to easily access later and share with friends.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Ready to Join the <span className="bg-white text-transparent bg-clip-text">LusoTown</span> Community?
              </h2>
              <p className="text-xl opacity-90 leading-relaxed mb-8">
                Connect with Portuguese speakers and friends in London. Share your experiences, discover events, and build lasting friendships.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/signup" 
                  className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-200 inline-flex items-center gap-2"
                >
                  Join for Free
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a 
                  href="/events" 
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200"
                >
                  Explore Events
                </a>
              </div>
              
              <p className="text-sm opacity-75 mt-6">
                No commitment required • Completely free • Open to all Portuguese-speaking community members and friends
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}