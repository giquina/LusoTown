'use client'

import { motion } from 'framer-motion'
import { 
  ShieldCheckIcon, 
  UserGroupIcon, 
  CalendarIcon, 
  ChatBubbleLeftRightIcon,
  PhotoIcon,
  MapPinIcon,
  HeartIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { getImagesByCategory } from '@/lib/profileImages'

const features = [
  {
    icon: ShieldCheckIcon,
    title: "Safe & Verified",
    description: "Multi-step verification including selfie confirmation ensures authentic, genuine members only.",
    color: "text-green-500",
    bgColor: "bg-green-50"
  },
  {
    icon: UserGroupIcon,
    title: "Interest-Based Groups",
    description: "Join 30+ specialized groups from London walks and book clubs to cooking and UK travel adventures.",
    color: "text-primary-500",
    bgColor: "bg-primary-50"
  },
  {
    icon: CalendarIcon,
    title: "Events & Meetups",
    description: "Discover London events, organize meetups, and RSVP to exciting activities across the UK.",
    color: "text-secondary-500",
    bgColor: "bg-secondary-50"
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Meaningful Conversations",
    description: "Connect through thoughtful discussions, group chats, and one-on-one conversations.",
    color: "text-purple-500",
    bgColor: "bg-purple-50"
  },
  {
    icon: PhotoIcon,
    title: "Share Your Journey",
    description: "Document adventures, share experiences, and celebrate milestones with your tribe.",
    color: "text-pink-500",
    bgColor: "bg-pink-50"
  },
  {
    icon: MapPinIcon,
    title: "Local & Global",
    description: "Find nearby friends for London coffee dates or connect with women across the UK who share your passions.",
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

export default function Features() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary-100 rounded-full opacity-40"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-secondary-100 rounded-full opacity-40"></div>
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
          <div className="inline-flex items-center gap-2 bg-primary-50 rounded-full px-4 py-2 text-primary-600 font-medium mb-6">
            <SparklesIcon className="h-4 w-4" />
            Why Choose AdyaTribe
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need for{' '}
            <span className="gradient-text">Authentic Connections</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            We've thoughtfully designed every feature to help 30+ women build genuine, lasting friendships in a safe and supportive environment.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group"
            >
              <div className="card p-8 h-full hover:scale-105 transition-all duration-300 group-hover:shadow-2xl">
                <div className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators with Member Photos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-white shadow-lg relative overflow-hidden">
            {/* Background Member Photos */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-6 gap-2 h-full">
                {Array.from({ length: 24 }).map((_, index) => {
                  const photos = getImagesByCategory('community').slice(0, 6)
                  return (
                    <div key={index} className="aspect-square rounded-xl overflow-hidden">
                      <img 
                        src={photos[index % photos.length]?.path || '/profiles/default-avatar.svg'}
                        alt={photos[index % photos.length]?.alt || 'AdyaTribe member'}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-6">
                <HeartIcon className="h-6 w-6 text-primary-400" />
                <h3 className="text-2xl font-semibold text-gray-900">Built by Women, for Women</h3>
              </div>
              
              {/* Featured Member Testimonial */}
              <div className="max-w-3xl mx-auto mb-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg ring-2 ring-white">
                    <img 
                      src={getImagesByCategory('community')[0]?.path || '/profiles/default-avatar.svg'}
                      alt="Adyam Embaie, AdyaTribe founder"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Adyam Embaie, Founder</p>
                    <p className="text-sm text-gray-600">London, UK</p>
                  </div>
                </div>
                <p className="text-lg text-gray-600 italic mb-4">
                  "After moving to London and struggling to make authentic friendships in my 30s, I created AdyaTribe to solve a problem I knew hundreds of women faced."
                </p>
              </div>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                AdyaTribe was created by women who understand the unique challenges of making meaningful adult friendships. 
                Every feature is designed with empathy, safety, and authenticity at its core.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}