'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { HeartIcon, SparklesIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useHeritage } from '@/context/HeritageContext'
import { getImageWithFallback } from '@/lib/profileImages'
import { useMemo } from 'react'

interface MatchTestimonial {
  id: string
  name: string
  age: number
  location: string
  profileImage: string
  partnerName: string
  partnerImage: string
  story: string
  connectionType: string
  timeframe: string
  category: string
  heritage_quote: string
  english_translation: string
  cultural_bond: string
  how_they_met: string
  current_status: string
}

// Generate dynamic testimonials based on heritage context
function generateMatchTestimonials(heritage: any, geography: any): MatchTestimonial[] {
  const culturalEvents = heritage?.streaming?.contentCategories ? Object.keys(heritage.streaming.contentCategories) : []
  const mainTradition = heritage?.culture?.traditions?.[0] || 'Cultural celebration'
  const culturalAreas = geography?.culturalAreas || ['Central', 'South']
  const mainCountry = geography?.mainCountry?.name || 'Portugal'
  const diasporaCity = geography?.city || 'London'

  return [
    {
      id: 'romantic-1',
      name: 'Ana Catarina',
      age: 28,
      location: `${culturalAreas[0] || 'Central'}, ${diasporaCity}`,
      profileImage: getImageWithFallback('ana-catarina'),
      partnerName: 'Ricardo Manuel',
      partnerImage: getImageWithFallback('ricardo-manuel'),
      story: `I moved from ${mainCountry} to ${diasporaCity} for banking, but the city felt cold as winter rain. Ricardo appeared at HeritageTown's ${mainTradition} event in ${culturalAreas[1] || 'Central'} - someone with the same longing for home. "Do you miss the cultural celebrations from back home?" he asked. Six months later, we're planning our engagement party at The Heritage Centre.`,
      connectionType: 'Heritage Sweethearts',
      timeframe: '18 months ago',
      category: 'Found Love',
      heritage_quote: `Encontrei não só o amor, mas alguém que entende a minha alma ${heritage?.identity?.name?.toLowerCase() || 'portuguesa'}.`,
      english_translation: `I found not just love, but someone who understands my ${heritage?.identity?.name || 'Lusophone'} soul.`,
      cultural_bond: `${mainTradition} celebration and shared nostalgia for ${heritage?.identity?.name || 'Lusophone'} traditions`,
      how_they_met: `Mutual match through cultural compatibility algorithm, met at HeritageTown's ${mainTradition} event`,
      current_status: `Engaged, planning ${heritage?.identity?.name || 'Lusophone'} wedding with traditional music and ${diasporaCity} reception`
    },
    {
      id: 'business-1',
      name: 'Mariana Santos',
      age: 35, 
      location: `Business District, ${diasporaCity}`,
      profileImage: getImageWithFallback('mariana-santos'),
      partnerName: 'João Pereira',
      partnerImage: getImageWithFallback('joao-pereira'),
      story: `From ${mainCountry}'s business district to ${diasporaCity}'s financial towers, carrying MBA dreams and ${heritage?.identity?.name || 'Lusophone'} determination. Met João at HeritageTown's "${heritage?.identity?.name || 'Lusophone'} Professionals" breakfast - an entrepreneur struggling with the same cultural isolation in ${diasporaCity}'s business world. "We need to create something of our own," he said over traditional coffee. Our startup now connects 500+ ${heritage?.identity?.name || 'Lusophone'} SMEs across Europe.`,
      connectionType: 'Heritage Entrepreneurs',
      timeframe: '3 years ago',
      category: 'Business Partners',
      heritage_quote: `Dois ${heritage?.identity?.name?.toLowerCase() || 'portugueses'} em ${diasporaCity} podem conquistar a Europa inteira.`,
      english_translation: `Two ${heritage?.identity?.name || 'Lusophone'} people in ${diasporaCity} can conquer all of Europe.`,
      cultural_bond: `Shared entrepreneurial spirit and ${heritage?.identity?.name || 'Lusophone'} business ethics in global finance`,
      how_they_met: 'Professional networking match through business interests filter',
      current_status: 'Business partners who raised £3.2M Series A, planning European expansion'
    },
    {
      id: 'cultural-1',
      name: 'Beatriz Oliveira',
      age: 26,
      location: `Cultural District, ${diasporaCity}`,
      profileImage: getImageWithFallback('beatriz-oliveira'),
      partnerName: 'Luciana Santos', 
      partnerImage: getImageWithFallback('luciana-santos'),
      story: `From ${heritage?.geography?.relatedCountries?.[0]?.name || mainCountry} to ${diasporaCity}'s cultural scene, bringing diverse energy and ${heritage?.identity?.name || 'Lusophone'} heritage. Luciana connected through HeritageTown's "${heritage?.identity?.name || 'Lusophone'} Artists" network - a performer mixing traditional and modern sounds. "Let's show that our culture is universal," she proposed. Our collective performs monthly, blending traditional and contemporary ${heritage?.identity?.name || 'Lusophone'} arts.`,
      connectionType: 'Cultural Voices',
      timeframe: '2 years ago',
      category: 'Cultural Connection',
      heritage_quote: `A cultura ${heritage?.identity?.name?.toLowerCase() || 'portuguesa'} não tem fronteiras - somos um só povo.`,
      english_translation: `${heritage?.identity?.name || 'Lusophone'} culture has no borders - we are one people.`,
      cultural_bond: `Shared ${heritage?.identity?.name || 'Lusophone'} cultural heritage spanning continents and communities`,
      how_they_met: `Arts and culture match through creative interests and ${heritage?.identity?.name || 'Lusophone'} heritage`,
      current_status: `Cultural collective featured on BBC, performing monthly shows across ${diasporaCity}`
    }
  ]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export default function MatchTestimonials() {
  const { t, language } = useLanguage()
  const { heritage } = useHeritage()
  
  const matchTestimonials = useMemo(() => 
    generateMatchTestimonials(heritage, heritage?.geography?.diasporaHub || { city: 'London', culturalAreas: ['Central', 'South'], mainCountry: { name: 'Portugal' } }),
    [heritage]
  )

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-secondary-200 rounded-full opacity-15 animate-pulse animation-delay-400"></div>
      </div>

      <div className="container-width section-padding relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-50/80 via-accent-50/80 to-coral-50/80 backdrop-blur-sm rounded-full px-6 py-3 text-secondary-600 font-bold mb-6 border border-secondary-200/40 shadow-lg">
            <HeartIcon className="h-5 w-5 text-accent-600" />
            {t('success_stories.title')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
              {t('success_stories.subtitle')}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            {t('success_stories.description')}
          </p>
        </motion.div>

        {/* Success Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { label: t('success_stories.found_love'), count: 1, color: 'bg-red-100 text-red-700' },
            { label: t('success_stories.business_partners'), count: 1, color: 'bg-blue-100 text-blue-700' },
            { label: t('success_stories.cultural_connection'), count: 1, color: 'bg-orange-100 text-orange-700' }
          ].map((category, index) => (
            <div key={index} className={`${category.color} px-4 py-2 rounded-full text-sm font-semibold`}>
              {category.label} ({category.count})
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
        >
          {matchTestimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              className="group"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/60 h-full flex flex-col">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-1 bg-gradient-to-r from-secondary-100 to-accent-100 text-secondary-800 text-xs font-bold px-3 py-1 rounded-full mb-4 self-start border border-secondary-200">
                  <SparklesIcon className="h-3 w-3" />
                  {testimonial.category}
                </div>

                {/* Partner Photos */}
                <div className="flex items-center justify-center mb-4">
                  <div className="flex -space-x-4">
                    <motion.div 
                      whileHover={{ scale: 1.05, zIndex: 10 }}
                      className="relative"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-200 via-secondary-200 to-accent-200 flex items-center justify-center border-4 border-white shadow-lg">
                        <div className="text-2xl text-primary-400">👤</div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <HeartIcon className="h-2 w-2 text-white fill-current" />
                      </div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05, zIndex: 10 }}
                      className="relative"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-200 via-secondary-200 to-accent-200 flex items-center justify-center border-4 border-white shadow-lg">
                        <div className="text-2xl text-primary-400">👤</div>
                      </div>
                      <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-pink-500 rounded-full border-2 border-white flex items-center justify-center">
                        <HeartIcon className="h-2 w-2 text-white fill-current" />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Names and Details */}
                <div className="text-center mb-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {testimonial.name} & {testimonial.partnerName}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {testimonial.age} • {testimonial.location} • {testimonial.timeframe}
                  </p>
                  <div className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 text-xs font-medium px-2 py-1 rounded-full mt-2">
                    <HeartIcon className="h-3 w-3" />
                    {testimonial.connectionType}
                  </div>
                </div>

                {/* Story */}
                <blockquote className="text-gray-700 text-sm italic mb-4 leading-relaxed flex-grow">
                  "{testimonial.story}"
                </blockquote>

                {/* Lusophone Quote */}
                <div className="bg-gradient-to-r from-secondary-50 via-accent-50 to-coral-50 p-3 rounded-xl border border-secondary-200 mb-4">
                  <blockquote className="text-secondary-800 font-medium text-center mb-2 text-sm">
                    "{testimonial.heritage_quote}"
                  </blockquote>
                  <p className="text-secondary-600 text-center text-xs italic">
                    "{testimonial.english_translation}"
                  </p>
                </div>

                {/* How They Met */}
                <div className="bg-primary-50 p-3 rounded-lg border border-primary-200 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircleIcon className="w-4 h-4 text-primary-600" />
                    <span className="font-semibold text-primary-800 text-xs">
                      {t('success_stories.how_they_met')}
                    </span>
                  </div>
                  <p className="text-primary-700 text-xs leading-relaxed">
                    {testimonial.how_they_met}
                  </p>
                </div>

                {/* Current Status */}
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <SparklesIcon className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-800 text-xs">
                      {t('success_stories.current_status')}
                    </span>
                  </div>
                  <p className="text-green-700 text-xs leading-relaxed">
                    {testimonial.current_status}
                  </p>
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
          className="text-center mt-12"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {t('success_stories.ready_title')}
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('success_stories.ready_description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/signup" 
              className="inline-flex items-center justify-center bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              {t('success_stories.start_now')}
            </a>
            <a 
              href="/success-stories" 
              className="inline-flex items-center justify-center bg-white text-secondary-600 hover:bg-gray-50 border-2 border-secondary-200 hover:border-secondary-300 font-bold text-lg px-10 py-4 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
            >
              {t('success_stories.read_more')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}