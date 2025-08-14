'use client'

import { motion } from 'framer-motion'
import { HeartIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { getImageWithFallback } from '@/lib/profileImages'

interface SuccessStory {
  id: string
  name: string
  age: number
  location: string
  profileImage: string
  friendImage: string
  friendName: string
  story: string
  connectionType: string
  timeframe: string
  activities: string[]
}

const successStories: SuccessStory[] = [
  {
    id: '1',
    name: 'Sofia',
    age: 34,
    location: 'Stockwell',
    profileImage: getImageWithFallback('sarah-chen'),
    friendImage: getImageWithFallback('maya-patel'),
    friendName: 'Maria',
    story: 'Met Maria at a Portuguese cultural event in Vauxhall and instantly connected over our shared homesickness for Portugal. Six months later, we\'ve created our own Portuguese book club at a local café!',
    connectionType: 'Portuguese Cultural Event',
    timeframe: '6 months ago',
    activities: ['Portuguese cafés', 'Book discussions', 'Cultural events']
  },
  {
    id: '2',
    name: 'Ana',
    age: 31,
    location: 'Elephant & Castle',
    profileImage: getImageWithFallback('jessica-williams'),
    friendImage: getImageWithFallback('emma-johnson'),
    friendName: 'Beatriz',
    story: 'Beatriz and I met at a Portuguese professionals meetup at a Stockwell restaurant. We bonded over our shared experience of building careers in London while staying connected to our Portuguese roots.',
    connectionType: 'Portuguese Professionals',
    timeframe: '8 months ago',
    activities: ['Portuguese restaurants', 'Networking events', 'Career support']
  },
  {
    id: '3',
    name: 'Carla',
    age: 35,
    location: 'Vauxhall',
    profileImage: getImageWithFallback('priya-sharma'),
    friendImage: getImageWithFallback('lisa-thompson'),
    friendName: 'Lucia',
    story: 'Lucia invited me to join her Portuguese walking group, and it transformed both my fitness and homesickness. Our Sunday walks through Portuguese neighborhoods have become the highlight of my week.',
    connectionType: 'Portuguese Walking Group',
    timeframe: '4 months ago',
    activities: ['Portuguese neighborhoods', 'Cultural walks', 'Community fitness']
  },
  {
    id: '4',
    name: 'Inês',
    age: 38,
    location: 'Camden',
    profileImage: getImageWithFallback('ava-davis'),
    friendImage: getImageWithFallback('community-4'),
    friendName: 'Raquel',
    story: 'Raquel and I met at a Portuguese art exhibition in South London and discovered we both miss the creative spirit of Portugal. We now attend cultural events together and started our own Portuguese arts group.',
    connectionType: 'Portuguese Arts & Culture',
    timeframe: '1 year ago',
    activities: ['Portuguese exhibitions', 'Cultural events', 'Creative workshops']
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export default function SuccessStories() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-secondary-200 rounded-full opacity-20 animate-pulse animation-delay-400"></div>
      </div>

      <div className="container-width section-padding relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-primary-600 font-medium mb-6 border border-white/30">
            <HeartIcon className="h-4 w-4 text-pink-400" />
            Real Friendship Success Stories
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            From Strangers to{' '}
            <span className="gradient-text">Best Friends</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Portuguese speakers who found their London community through real meetups at authentic venues. Read inspiring stories of connection, cultural preservation, and genuine friendship in London's Portuguese community.
          </p>
        </motion.div>

        {/* Success Stories Grid - Enhanced Multi-Column Responsive Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-7 lg:gap-8 xl:gap-10"
        >
          {successStories.map((story) => (
            <motion.div
              key={story.id}
              variants={cardVariants}
              className="group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-7 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 h-full">
                {/* Connection Type Badge */}
                <div className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
                  <SparklesIcon className="h-3 w-3" />
                  {story.connectionType}
                </div>

                {/* Friend Photos */}
                <div className="flex items-center justify-center mb-6">
                  <div className="flex -space-x-6">
                    <motion.div 
                      whileHover={{ scale: 1.05, zIndex: 10 }}
                      className="relative"
                    >
                      <img
                        src={story.profileImage}
                        alt={`${story.name} profile`}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                        loading="lazy"
                      />
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <HeartIcon className="h-3 w-3 text-white fill-current" />
                      </div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05, zIndex: 10 }}
                      className="relative"
                    >
                      <img
                        src={story.friendImage}
                        alt={`${story.friendName} profile`}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                        loading="lazy"
                      />
                      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-500 rounded-full border-2 border-white flex items-center justify-center">
                        <HeartIcon className="h-3 w-3 text-white fill-current" />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Names and Location */}
                <div className="text-center mb-4">
                  <h3 className="font-bold text-lg text-gray-900">
                    {story.name} & {story.friendName}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {story.age} • {story.location} • Friends for {story.timeframe}
                  </p>
                </div>

                {/* Story */}
                <blockquote className="text-gray-700 text-center italic mb-6 leading-relaxed">
                  "{story.story}"
                </blockquote>

                {/* Activities */}
                <div className="flex flex-wrap justify-center gap-2">
                  {story.activities.map((activity, index) => (
                    <span
                      key={index}
                      className="bg-secondary-100 text-secondary-700 text-xs px-3 py-1 rounded-full"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Write Your Own Success Story?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of Portuguese speakers who\'ve found their London community. Your next Portuguese friend could be just one authentic venue away.
          </p>
          <a 
            href="/signup" 
            className="inline-flex items-center justify-center bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105"
          >
            JOIN NOW
          </a>
        </motion.div>
      </div>
    </section>
  )
}