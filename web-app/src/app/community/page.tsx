'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { StarIcon, CalendarDaysIcon, MapPinIcon, UsersIcon, HeartIcon, ChatBubbleLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { getImageWithFallback } from '@/lib/profileImages'

const communityStats = [
  { number: '300+', label: 'Verified Members', icon: UsersIcon },
  { number: '45+', label: 'Weekly Events', icon: CalendarDaysIcon },
  { number: '12', label: 'Active Groups', icon: HeartIcon },
  { number: '85%', label: 'Made Real Friends', icon: ChatBubbleLeftIcon }
]

const recentActivities = [
  {
    type: 'event',
    title: 'Saturday Morning Yoga in Hyde Park',
    group: 'Fitness & Wellness',
    attendees: 8,
    date: 'This Saturday, 9:00 AM',
    location: 'Hyde Park Corner',
    spots: 4
  },
  {
    type: 'event', 
    title: 'Wine Tasting at Borough Market',
    group: 'Wine & Dine',
    attendees: 12,
    date: 'Friday, 6:30 PM',
    location: 'Borough Market',
    spots: 2
  },
  {
    type: 'event',
    title: 'Book Club: "The Seven Husbands of Evelyn Hugo"',
    group: 'Book Clubs',
    attendees: 15,
    date: 'Tuesday, 7:00 PM',
    location: 'Covent Garden Café',
    spots: 0
  }
]

const memberSpotlight = [
  {
    name: 'Emma',
    age: 34,
    location: 'Clapham',
    image: getImageWithFallback('sarah-chen'),
    quote: 'Found my weekend hiking crew! 🥾',
    activity: 'Organized 3 events this month'
  },
  {
    name: 'Priya',
    age: 31,
    location: 'Shoreditch',
    image: getImageWithFallback('priya-sharma'),
    quote: 'The cooking group changed my London experience!',
    activity: 'Active in 4 groups'
  },
  {
    name: 'Sarah',
    age: 38,
    location: 'Richmond',
    image: getImageWithFallback('maya-patel'),
    quote: 'Finally found my West End theatre buddies! 🎭',
    activity: 'Attended 8 events'
  }
]

export default function Community() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-40 h-40 bg-primary-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary-200 rounded-full opacity-20 animate-pulse animation-delay-400"></div>
          </div>

          <div className="container-width px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-primary-600 font-medium mb-6 border border-white/30">
                  <HeartIcon className="h-4 w-4" />
                  Growing Community of Amazing Women
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                  Our <span className="gradient-text">Vibrant Community</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Join 300+ verified women across London who are building meaningful friendships, exploring the city, and supporting each other's journeys.
                </p>
              </motion.div>

              {/* Community Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
              >
                {communityStats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                      <Icon className="h-8 w-8 text-primary-400 mx-auto mb-3" />
                      <p className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Live Activity Feed */}
        <section className="py-16 bg-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  What's <span className="gradient-text">Happening Now</span>
                </h2>
                <p className="text-lg text-gray-600">
                  Join these exciting events happening this week across London
                </p>
              </div>

              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                    className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 border border-white/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {activity.attendees}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{activity.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <span className="inline-flex items-center gap-1">
                                <CalendarDaysIcon className="h-4 w-4" />
                                {activity.date}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <MapPinIcon className="h-4 w-4" />
                                {activity.location}
                              </span>
                            </div>
                            <span className="inline-block bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-xs font-medium">
                              {activity.group}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {activity.spots > 0 ? (
                          <>
                            <span className="text-sm text-green-600 font-medium">
                              {activity.spots} spots left
                            </span>
                            <button className="bg-primary-400 text-white px-4 py-2 rounded-lg hover:bg-primary-500 transition-colors text-sm font-medium">
                              Join Event
                            </button>
                          </>
                        ) : (
                          <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-2 rounded-lg">
                            Full (Join Waitlist)
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button className="inline-flex items-center gap-2 bg-white border border-primary-200 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors font-medium">
                  View All Events
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Interest Groups */}
        <section className="py-16 bg-gradient-to-br from-secondary-50 to-primary-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Find Your <span className="gradient-text">Perfect Group</span>
              </h2>
              <p className="text-lg text-gray-600 mb-12">
                From weekend adventures to cozy book clubs, there's something for every interest. After participating in group activities, members can leave reviews to help improve future experiences - just like Google My Business!
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="group"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition-all duration-300 border border-white/50 h-full">
                    <div className="w-16 h-16 bg-primary-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">🚶‍♀️</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Walking Groups</h3>
                    <p className="text-gray-600 mb-4">Explore London's parks and hidden gems with like-minded women.</p>
                    <div className="text-sm text-primary-600 font-medium mb-4">35 active members</div>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p>• Hampstead Heath walks</p>
                      <p>• Richmond Park adventures</p>
                      <p>• Thames Path explorations</p>
                    </div>
                    <button className="mt-6 w-full bg-primary-50 text-primary-600 py-2 rounded-lg hover:bg-primary-100 transition-colors font-medium">
                      Join Group
                    </button>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="group"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition-all duration-300 border border-white/50 h-full">
                    <div className="w-16 h-16 bg-secondary-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">🍷</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Wine & Dine</h3>
                    <p className="text-gray-600 mb-4">Discover London's best restaurants and wine bars together.</p>
                    <div className="text-sm text-secondary-600 font-medium mb-4">42 food lovers</div>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p>• Borough Market tastings</p>
                      <p>• Covent Garden dining</p>
                      <p>• Wine bar discoveries</p>
                    </div>
                    <button className="mt-6 w-full bg-secondary-50 text-secondary-600 py-2 rounded-lg hover:bg-secondary-100 transition-colors font-medium">
                      Join Group
                    </button>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="group"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition-all duration-300 border border-white/50 h-full">
                    <div className="w-16 h-16 bg-primary-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">🎭</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Arts & Culture</h3>
                    <p className="text-gray-600 mb-4">West End shows, galleries, and cultural events across London.</p>
                    <div className="text-sm text-primary-600 font-medium mb-4">28 culture enthusiasts</div>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p>• West End theatre nights</p>
                      <p>• Gallery openings</p>
                      <p>• Museum visits</p>
                    </div>
                    <button className="mt-6 w-full bg-primary-50 text-primary-600 py-2 rounded-lg hover:bg-primary-100 transition-colors font-medium">
                      Join Group
                    </button>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="group"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition-all duration-300 border border-white/50 h-full">
                    <div className="w-16 h-16 bg-secondary-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">💪</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Fitness & Wellness</h3>
                    <p className="text-gray-600 mb-4">Yoga, pilates, and fitness classes with supportive women.</p>
                    <div className="text-sm text-secondary-600 font-medium mb-4">51 fitness fans</div>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p>• Hyde Park yoga sessions</p>
                      <p>• Reformer pilates classes</p>
                      <p>• Running groups</p>
                    </div>
                    <button className="mt-6 w-full bg-secondary-50 text-secondary-600 py-2 rounded-lg hover:bg-secondary-100 transition-colors font-medium">
                      Join Group
                    </button>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="group"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition-all duration-300 border border-white/50 h-full">
                    <div className="w-16 h-16 bg-primary-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">✈️</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">UK Adventures</h3>
                    <p className="text-gray-600 mb-4">Weekend getaways and day trips across beautiful Britain.</p>
                    <div className="text-sm text-primary-600 font-medium mb-4">24 adventurers</div>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p>• Cotswolds weekends</p>
                      <p>• Brighton day trips</p>
                      <p>• Edinburgh escapes</p>
                    </div>
                    <button className="mt-6 w-full bg-primary-50 text-primary-600 py-2 rounded-lg hover:bg-primary-100 transition-colors font-medium">
                      Join Group
                    </button>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="group"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition-all duration-300 border border-white/50 h-full">
                    <div className="w-16 h-16 bg-secondary-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">📚</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Book Clubs</h3>
                    <p className="text-gray-600 mb-4">Literary discussions and cozy meetups in London's best cafes.</p>
                    <div className="text-sm text-secondary-600 font-medium mb-4">31 book lovers</div>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p>• Covent Garden cafes</p>
                      <p>• Author meet & greets</p>
                      <p>• Literary pub crawls</p>
                    </div>
                    <button className="mt-6 w-full bg-secondary-50 text-secondary-600 py-2 rounded-lg hover:bg-secondary-100 transition-colors font-medium">
                      Join Group
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Member Spotlight */}
        <section className="py-16 bg-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Meet Our <span className="gradient-text">Community Stars</span>
              </h2>
              <p className="text-lg text-gray-600 mb-12">
                Real women making real connections across London
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                {memberSpotlight.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                    className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 text-center border border-white/50"
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-white shadow-lg">
                      <img 
                        src={member.image} 
                        alt={`${member.name} - AdyaTribe member`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {member.name}, {member.age}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{member.location}</p>
                    <blockquote className="text-gray-700 italic mb-3 min-h-[2.5rem] flex items-center justify-center">
                      "{member.quote}"
                    </blockquote>
                    <span className="inline-block bg-white/70 text-primary-600 px-3 py-1 rounded-full text-xs font-medium">
                      {member.activity}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Community Guidelines */}
        <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/50">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                    Our <span className="gradient-text">Community Values</span>
                  </h2>
                  <p className="text-lg text-gray-600">
                    What makes our community special? These shared values that every member embraces.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircleIcon className="h-6 w-6 text-primary-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Authentic Connections</h3>
                        <p className="text-gray-600 text-sm">Be genuine, be yourself, and build real friendships</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircleIcon className="h-6 w-6 text-secondary-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Mutual Support</h3>
                        <p className="text-gray-600 text-sm">Celebrate successes and provide encouragement during challenges</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircleIcon className="h-6 w-6 text-primary-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Reliable Participation</h3>
                        <p className="text-gray-600 text-sm">Show up when you commit - others are counting on you</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircleIcon className="h-6 w-6 text-secondary-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Respect & Privacy</h3>
                        <p className="text-gray-600 text-sm">Honor confidentiality and respect personal boundaries</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircleIcon className="h-6 w-6 text-primary-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Inclusive Mindset</h3>
                        <p className="text-gray-600 text-sm">Welcome different perspectives and life experiences</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircleIcon className="h-6 w-6 text-secondary-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">London Love</h3>
                        <p className="text-gray-600 text-sm">Share your passion for this amazing city we call home</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-white">
          <div className="container-width px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Ready to Join Our <span className="gradient-text">Amazing Community?</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Your perfect friendship circle is waiting. Join 300+ verified women who are making London feel like home, one connection at a time.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <a 
                  href="/signup" 
                  className="inline-flex items-center justify-center bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                >
                  JOIN NOW
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </a>
                <a 
                  href="/how-it-works" 
                  className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
                >
                  Learn How It Works
                </a>
              </div>

              <div className="flex justify-center items-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  Free to join
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  Verified members only
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  No pressure, just friendship
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}