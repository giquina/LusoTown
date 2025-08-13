'use client'

import { motion } from 'framer-motion'
import { 
  CalendarDaysIcon, 
  UserGroupIcon, 
  BuildingStorefrontIcon, 
  BookOpenIcon,
  DocumentTextIcon,
  MapPinIcon,
  HeartIcon,
  SparklesIcon,
  CursorArrowRippleIcon
} from '@heroicons/react/24/outline'
import { getImagesByCategory } from '@/lib/profileImages'
import { useLanguage } from '@/context/LanguageContext'

const getFeatures = (t: any) => [
  {
    icon: CalendarDaysIcon,
    title: t('features.events.title'),
    description: t('features.events.description'),
    color: "text-red-500",
    bgColor: "bg-red-50"
  },
  {
    icon: UserGroupIcon,
    title: t('features.groups.title'),
    description: t('features.groups.description'),
    color: "text-primary-500",
    bgColor: "bg-primary-50"
  },
  {
    icon: BuildingStorefrontIcon,
    title: t('features.business.title'),
    description: t('features.business.description'),
    color: "text-secondary-500",
    bgColor: "bg-secondary-50"
  },
  {
    icon: CursorArrowRippleIcon,
    title: t('features.resources.title'),
    description: t('features.resources.description'),
    color: "text-purple-500",
    bgColor: "bg-purple-50"
  },
  {
    icon: DocumentTextIcon,
    title: t('features.stories.title'),
    description: t('features.stories.description'),
    color: "text-pink-500",
    bgColor: "bg-pink-50"
  },
  {
    icon: MapPinIcon,
    title: t('features.local.title'),
    description: t('features.local.description'),
    color: "text-green-500",
    bgColor: "bg-green-50"
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
  const { t } = useLanguage()
  const features = getFeatures(t)

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
            {t('features.title')}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">{t('features.subtitle')}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
            Connect with Portuguese adults (21+) who love nightlife, dining, fitness, and socializing in London. Because you shouldn't navigate this city alone.
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
              <div className="card p-6 sm:p-8 h-full hover:scale-105 transition-all duration-300 group-hover:shadow-2xl">
                <div className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
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
                        alt={photos[index % photos.length]?.alt || 'LusoTown London member'}
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
                <h3 className="text-2xl font-semibold text-gray-900">21+ Portuguese Social Network</h3>
              </div>
              
              {/* Featured Community Testimonial */}
              <div className="max-w-3xl mx-auto mb-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg ring-2 ring-white">
                    <img 
                      src={getImagesByCategory('community')[0]?.path || '/profiles/default-avatar.svg'}
                      alt="LusoTown London member"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Carlos Silva, 28</p>
                    <p className="text-sm text-gray-600">Portuguese Professional, Shoreditch</p>
                  </div>
                </div>
                <p className="text-lg text-gray-600 italic mb-4">
                  "I was tired of going to bars alone. Through LusoTown, I found my Portuguese crew for nights out, brunches, and gym sessions. London feels like home now."
                </p>
              </div>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Created by Portuguese adults who know what it's like to feel isolated in a new city. 
                Every feature is designed to help you build genuine friendships and enjoy London's social scene with your Portuguese tribe.
                After participating in events or group activities, members can leave reviews to help improve future experiences - just like Google My Business!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}