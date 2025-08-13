'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  ChatBubbleLeftRightIcon,
  HeartIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

export default function HowItWorks() {
  const features = [
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'LusoFeed - Your Community Hub',
      description: 'Share updates, photos, and links with the LusoTown community. Tag events or businesses to help others discover them.',
      details: [
        'Post text updates, photos, or links',
        'Tag events or businesses you\'re attending or recommending',
        'React with emojis (❤️, 👍, 😂, 😮, 😢, 🤩)',
        'Use hashtags to categorize your posts',
        'Toggle between English and Portuguese views'
      ]
    },
    {
      icon: HeartIcon,
      title: 'Save Your Favourites',
      description: 'Bookmark events, businesses, and feed posts you love to easily find them later.',
      details: [
        'Click the heart icon to save any event, business, or feed post',
        'Access all your saved items from your profile',
        'Quickly navigate back to saved content',
        'Never miss out on your favorite events or businesses'
      ]
    },
    {
      icon: UserGroupIcon,
      title: 'Join & Participate',
      description: 'Sign up for free and start connecting with the Portuguese community in London.',
      details: [
        'Create your free profile',
        'Browse events, businesses, and community members',
        'RSVP to events to automatically post to LusoFeed',
        'Share businesses you love with the community',
        'Connect with people who share your interests'
      ]
    },
    {
      icon: CalendarDaysIcon,
      title: 'Events & Community',
      description: 'Discover and participate in events that celebrate Portuguese culture and language.',
      details: [
        'Find cultural festivals, food markets, and meetups',
        'Join language exchange sessions',
        'Attend networking events for professionals',
        'Participate in family-friendly activities',
        'Support Portuguese businesses in London'
      ]
    }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                How LusoTown <span className="gradient-text">Works</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Everything you need to know about connecting with the Portuguese community in London
              </p>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-gray-600 font-medium">
                    Completely free to join and participate
                  </p>
                </div>
                <p className="text-gray-500 text-sm">
                  Built for people from Portugal, Brazil, Angola, Mozambique, Cape Verde, Guinea-Bissau, São Tomé and Príncipe, East Timor, Macau, and Equatorial Guinea — and for anyone who feels part of our Portuguese-speaking world.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Explanation */}
        <section className="py-20 bg-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-16">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8`}
                  >
                    <div className="lg:w-1/3">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-2xl flex items-center justify-center mb-6">
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                      <p className="text-gray-600 mb-6">{feature.description}</p>
                    </div>
                    
                    <div className="lg:w-2/3">
                      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100">
                        <ul className="space-y-3">
                          {feature.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircleIcon className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LusoFeed Deep Dive */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  LusoFeed in Detail
                </h2>
                <p className="text-lg text-gray-600">
                  Your social hub for connecting with the Portuguese community
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Auto-Posting Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary-600 text-xs">1</span>
                      </div>
                      <span className="text-gray-700">When you RSVP to an event, it automatically creates a post in LusoFeed</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary-600 text-xs">2</span>
                      </div>
                      <span className="text-gray-700">When you add a business to your favorites, it can create a post</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary-600 text-xs">3</span>
                      </div>
                      <span className="text-gray-700">Share your own updates, photos, and links anytime</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Interaction Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        ❤️
                      </div>
                      <span className="text-gray-700">Like posts with the heart button</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        👍
                      </div>
                      <span className="text-gray-700">React with various emojis</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        #
                      </div>
                      <span className="text-gray-700">Follow hashtags to see related content</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        🌐
                      </div>
                      <span className="text-gray-700">Toggle between English and Portuguese views</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Favourites Deep Dive */}
        <section className="py-20 bg-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Your Favourites System
                </h2>
                <p className="text-lg text-gray-600">
                  Keep track of everything you love in the LusoTown community
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                      <HeartIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Save Anything</h3>
                    <p className="text-gray-600 text-sm">Click the heart icon on any event, business, or feed post</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                      <HeartIcon className="w-8 h-8 text-red-500 fill-current" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">See All Saved</h3>
                    <p className="text-gray-600 text-sm">Access your "My Favourites" page from your profile</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                      <ArrowRightIcon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Quick Access</h3>
                    <p className="text-gray-600 text-sm">Click any saved item to go directly to it</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">How It Works:</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                    <li>When you see something you like, click the heart icon ❤️</li>
                    <li>The heart will fill with red to show it's saved</li>
                    <li>Go to your profile and click "My Favourites" to see all saved items</li>
                    <li>Click any item in your favourites to go directly to it</li>
                    <li>To unsave, just click the filled heart icon again</li>
                  </ol>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Ready to Join the LusoTown Community?
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
                  <ArrowRightIcon className="w-5 h-5" />
                </a>
                <a 
                  href="/events" 
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200"
                >
                  Explore Events
                </a>
              </div>
              
              <p className="text-sm opacity-75 mt-6">
                No commitment required • Completely free • Open to all Portuguese community members and friends
              </p>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}