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
    name: 'Sofia Silva',
    age: 34,
    location: 'Stockwell, London',
    profileImage: getImageWithFallback('sarah-chen'),
    friendImage: getImageWithFallback('maya-patel'),
    friendName: 'Maria Santos',
    story: 'After moving from Porto, I felt lost in London until I met Maria at a Fado night in Little Portugal. We discovered we both worked in fintech and started a Portuguese Women in Tech group that now helps 50+ Lusophone professionals thrive in London\'s startup scene.',
    connectionType: 'Portuguese Tech Heritage',
    timeframe: '1 year ago',
    activities: ['Fintech networking', 'Portuguese startups', 'Mentorship programs', 'Cultural preservation']
  },
  {
    id: '2',
    name: 'Ana Ferreira',
    age: 31,
    location: 'South London',
    profileImage: getImageWithFallback('jessica-williams'),
    friendImage: getImageWithFallback('emma-johnson'),
    friendName: 'Beatriz Rodrigues',
    story: 'From Luanda to London - Beatriz and I connected over our shared experience as Angolan-Portuguese professionals. Together we launched "Heritage & Hustle," a business network supporting Portuguese-speaking entrepreneurs across all CPLP nations, now with 200+ members and £2M in collective funding raised.',
    connectionType: 'CPLP Business Network',
    timeframe: '8 months ago',
    activities: ['Startup funding', 'Cultural entrepreneurship', 'Heritage preservation', 'Cross-border partnerships']
  },
  {
    id: '3',
    name: 'Carla Mendes',
    age: 29,
    location: 'Camden, London',
    profileImage: getImageWithFallback('priya-sharma'),
    friendImage: getImageWithFallback('lisa-thompson'),
    friendName: 'Lucia Tavares',
    story: 'Coming from São Paulo, I was struggling with imposter syndrome in London\'s creative industry. Lucia, a Mozambican-Portuguese designer, became my accountability partner through LusoTown. We\'ve now co-founded a award-winning creative agency celebrating Lusophone storytelling and won the London Cultural Diversity Award 2024.',
    connectionType: 'Creative Heritage Collective',
    timeframe: '10 months ago',
    activities: ['Creative agency', 'Cultural storytelling', 'Award recognition', 'Community impact']
  },
  {
    id: '4',
    name: 'Inês Costa',
    age: 32,
    location: 'East London',
    profileImage: getImageWithFallback('ava-davis'),
    friendImage: getImageWithFallback('community-4'),
    friendName: 'Raquel Pereira',
    story: 'As a researcher from Coimbra studying at Imperial College, I met Raquel, a Cape Verdean doctor, through our Portuguese Academic Network. We collaborated on groundbreaking research combining Portuguese traditional medicine with modern healthcare, now published in Nature and featured by the Portuguese Embassy as a model of diaspora excellence.',
    connectionType: 'Academic Excellence Network',
    timeframe: '1.5 years ago',
    activities: ['Academic research', 'Medical innovation', 'Embassy recognition', 'International publication']
  },
  {
    id: '5',
    name: 'Miguel Oliveira',
    age: 35,
    location: 'West London',
    profileImage: getImageWithFallback('community-5'),
    friendImage: getImageWithFallback('community-6'),
    friendName: 'João Ribeiro',
    story: 'From Madeira to London\'s finance district - João and I transformed our weekend Portuguese football matches into "Goal & Growth," a sports-based mentorship program. We\'ve helped 100+ young Portuguese-speaking men develop leadership skills through sport, with 85% achieving career promotions and many becoming community leaders themselves.',
    connectionType: 'Sports Leadership Program',
    timeframe: '2 years ago',
    activities: ['Sports mentorship', 'Leadership development', 'Career advancement', 'Community building']
  },
  {
    id: '6',
    name: 'Teresa Almeida',
    age: 40,
    location: 'North London',
    profileImage: getImageWithFallback('community-7'),
    friendImage: getImageWithFallback('community-8'),
    friendName: 'Helena Sousa',
    story: 'As working mothers from Braga and Viseu, Helena and I started "Mães em Londres" (Mothers in London) to support Portuguese-speaking families. Our community has grown to 300+ families, offering everything from childcare co-ops to university prep workshops. We\'ve been featured in Portuguese media and received funding from London Borough of Camden for our cultural integration programs.',
    connectionType: 'Family Heritage Network',
    timeframe: '3 years ago',
    activities: ['Family support', 'Cultural integration', 'Government recognition', 'Media features']
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
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-50/80 via-accent-50/80 to-coral-50/80 backdrop-blur-sm rounded-full px-6 py-3 text-secondary-600 font-bold mb-6 border border-secondary-200/40 shadow-lg">
            <SparklesIcon className="h-5 w-5 text-accent-600" />
            Portuguese Heritage Success Stories
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            From Social Calendar to{' '}
            <span className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">Life-Changing Impact</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Portuguese speakers who transformed their London experience through LusoTown connections. Discover inspiring achievements in business, academia, creative arts, and community leadership - showcasing the power of Portuguese diaspora excellence.
          </p>
        </motion.div>

        {/* Success Stories Grid - Enhanced Multi-Column Responsive Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
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
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Ready to Build Your Own Portuguese Legacy in London?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join 500+ Portuguese speakers from Portugal, Brazil, Angola, Mozambique, Cape Verde & beyond who are achieving extraordinary things together. Your social calendar could be the foundation of your next big breakthrough.
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