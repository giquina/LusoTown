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
    name: 'Sarah',
    age: 34,
    location: 'Clapham',
    profileImage: getImageWithFallback('sarah-chen'),
    friendImage: getImageWithFallback('maya-patel'),
    friendName: 'Maya',
    story: 'Met Maya at a book club event and instantly clicked over our shared love of psychological thrillers. Six months later, we\'re planning our first girls\' trip to Edinburgh!',
    connectionType: 'Book Club',
    timeframe: '6 months ago',
    activities: ['Weekend brunches', 'Book discussions', 'Museum visits']
  },
  {
    id: '2',
    name: 'Jessica',
    age: 31,
    location: 'Notting Hill',
    profileImage: getImageWithFallback('jessica-williams'),
    friendImage: getImageWithFallback('emma-johnson'),
    friendName: 'Emma',
    story: 'Emma and I bonded over our career ambitions at a networking event. She\'s become my biggest cheerleader and we support each other through all of life\'s challenges.',
    connectionType: 'Professional Network',
    timeframe: '8 months ago',
    activities: ['Career planning', 'Industry events', 'Coffee dates']
  },
  {
    id: '3',
    name: 'Priya',
    age: 35,
    location: 'Canary Wharf',
    profileImage: getImageWithFallback('priya-sharma'),
    friendImage: getImageWithFallback('lisa-thompson'),
    friendName: 'Lisa',
    story: 'Lisa invited me to join her walking group, and it transformed both my fitness and social life. Our Sunday Thames walks have become the highlight of my week.',
    connectionType: 'Fitness Group',
    timeframe: '4 months ago',
    activities: ['Thames walks', 'Yoga classes', 'Healthy cooking']
  },
  {
    id: '4',
    name: 'Rachel',
    age: 38,
    location: 'Richmond',
    profileImage: getImageWithFallback('ava-davis'),
    friendImage: getImageWithFallback('community-4'),
    friendName: 'Hannah',
    story: 'Hannah and I met at an art gallery event and discovered we both love creative pursuits. We now attend every major exhibition together and have started our own painting sessions.',
    connectionType: 'Arts & Culture',
    timeframe: '1 year ago',
    activities: ['Gallery visits', 'Art classes', 'Creative workshops']
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
            These amazing women found their perfect friendship matches through AdyaTribe. Read their inspiring stories of connection, growth, and genuine friendship.
          </p>
        </motion.div>

        {/* Success Stories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {successStories.map((story) => (
            <motion.div
              key={story.id}
              variants={cardVariants}
              className="group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 h-full">
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
            Join hundreds of women who\'ve found their perfect friendship matches. Your next best friend could be just one event away.
          </p>
          <a 
            href="/signup" 
            className="btn-primary text-lg px-10 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 inline-block"
          >
            Start Your Friendship Journey
          </a>
        </motion.div>
      </div>
    </section>
  )
}