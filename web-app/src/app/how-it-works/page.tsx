'use client'

import { motion } from 'framer-motion'
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
      icon: CalendarDaysIcon,
      title: 'Real-Life Event Feed',
      description: 'Browse live events happening at real places across London & UK. From gyms to galleries, restaurants to tours.',
      details: [
        'See events happening at gyms, galleries, restaurants, tours & more',
        'All events are for Portuguese speakers to meet in person',
        'Filter by location, date, and activity type',
        'View event details including exact address and meetup time',
        'See who else is attending each real-life meetup'
      ]
    },
    {
      icon: HeartIcon,
      title: 'Save & Favourite Events',
      description: 'Save events and locations you love so you never miss a real-life meetup that interests you.',
      details: [
        'Click the heart icon to save any real-life event',
        'Create your personal list of favorite events and locations',
        'Get notified about similar events at your saved locations',
        'Access your favorites anytime from your profile',
        'Never miss a meetup at places you love'
      ]
    },
    {
      icon: UserGroupIcon,
      title: 'Create & Join Meetups',
      description: 'Create your own real-life meetups or join existing ones. Meet Portuguese speakers for activities you enjoy.',
      details: [
        'Create meetups at your favorite gyms, cafes, or cultural venues',
        'Set real addresses and specific meeting points',
        'RSVP to events you want to attend in person',
        'Meet Portuguese speakers who share your interests',
        'Build real friendships through in-person activities'
      ]
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Connect at Real Events',
      description: 'Share experiences from real-life meetups and discover new Portuguese speakers in your area.',
      details: [
        'Share photos and stories from events you attended',
        'Tag the real locations where you met other Portuguese speakers',
        'Recommend venues and activities to the community',
        'Connect with people you met at real-life events',
        'Plan future meetups with your new Portuguese-speaking friends'
      ]
    }
  ]

  return (
    <main className="min-h-screen">
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                How Real-Life <span className="gradient-text">Meetups</span> Work
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Join 750+ Portuguese speakers meeting in real places across London & UK
              </p>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-gray-600 font-medium">
                    Real places, real people, real connections
                  </p>
                </div>
                <p className="text-gray-500 text-sm">
                  From gyms and galleries to restaurants and tours, meet Portuguese speakers at actual locations across London & UK. All events are designed for in-person connections.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Explanation */}
        <section className="py-20 bg-white">
          <div className="container-width">
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
          <div className="container-width">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Real-Life Meetups in Detail
                </h2>
                <p className="text-lg text-gray-600">
                  How Portuguese speakers connect at real places across London & UK
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Event Discovery</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary-600 text-xs">1</span>
                      </div>
                      <span className="text-gray-700">Browse events at real locations: gyms, galleries, restaurants, cultural venues</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary-600 text-xs">2</span>
                      </div>
                      <span className="text-gray-700">See exact addresses, meeting times, and who's attending each event</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary-600 text-xs">3</span>
                      </div>
                      <span className="text-gray-700">Filter by location, date, activity type to find meetups near you</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Join Real Meetups</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span className="text-gray-700">RSVP to confirm your attendance at real-life events</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        📍
                      </div>
                      <span className="text-gray-700">Get exact location details and directions to venues</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        👥
                      </div>
                      <span className="text-gray-700">See other Portuguese speakers who'll be at the same event</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        +
                      </div>
                      <span className="text-gray-700">Create your own meetups at places you love</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Favourites Deep Dive */}
        <section className="py-20 bg-white">
          <div className="container-width">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Your Favorites System
                </h2>
                <p className="text-lg text-gray-600">
                  Save events and locations for real-life Portuguese meetups
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                      <HeartIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Save Real Events</h3>
                    <p className="text-gray-600 text-sm">Click the heart icon on any real-life meetup or venue</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                      <HeartIcon className="w-8 h-8 text-red-500 fill-current" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Access Saved Events</h3>
                    <p className="text-gray-600 text-sm">View all your saved real-life events from your favorites page</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                      <ArrowRightIcon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Never Miss Meetups</h3>
                    <p className="text-gray-600 text-sm">Get notified about similar events at your favorite locations</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">How It Works:</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                    <li>When you see a real-life event you like, click the heart icon ❤️</li>
                    <li>The heart will fill with red to show the event is saved</li>
                    <li>Go to your profile and click "My Favourites" to see all saved events</li>
                    <li>Click any saved event to see details and RSVP for the meetup</li>
                    <li>Get notified about similar events at locations you've favorited</li>
                  </ol>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
          <div className="container-width">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Ready to Join Real-Life Portuguese Meetups?
              </h2>
              <p className="text-xl opacity-90 leading-relaxed mb-8">
                Meet Portuguese speakers at real places across London & UK. Join gyms, galleries, restaurants, tours and more.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/events" 
                  className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-200 inline-flex items-center gap-2"
                >
                  Browse Real Meetups
                  <ArrowRightIcon className="w-5 h-5" />
                </a>
                <a 
                  href="/signup" 
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200"
                >
                  JOIN NOW
                </a>
              </div>
              
              <p className="text-sm opacity-75 mt-6">
                Real places, real people, real connections • Completely free • Portuguese speakers across London & UK
              </p>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}