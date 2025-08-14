'use client'

import { motion } from 'framer-motion'
import { 
  HeartIcon, 
  BuildingOfficeIcon,
  AcademicCapIcon,
  UserGroupIcon,
  GlobeAltIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

export default function DiverseSuccessStories() {
  const { t } = useLanguage()

  const successStories = [
    {
      id: 'maria-portugal',
      name: 'Maria Fernandes',
      country: 'Portugal',
      flag: '🇵🇹',
      city: 'Originally from Porto',
      location: 'Now in Camden, London',
      profession: 'Software Engineer at FinTech Startup',
      story: 'Moved to London 3 years ago feeling isolated. Through LusoTown, I found not just Portuguese friends, but a professional network that helped me land my dream job. Now I mentor other Portuguese women in tech.',
      achievement: 'Founded "Portuguese Women in Tech London" group with 150+ members',
      category: 'Professional Success',
      icon: BuildingOfficeIcon,
      color: 'from-primary-500 to-secondary-500',
      memberSince: '2022',
      eventsAttended: 45
    },
    {
      id: 'carlos-brazil',
      name: 'Carlos Oliveira',
      country: 'Brazil',
      flag: '🇧🇷',
      city: 'Originally from São Paulo',
      location: 'Now in Elephant & Castle',
      profession: 'Restaurant Owner',
      story: 'Started with a small Brazilian food stall. The Portuguese-speaking community rallied around me - customers became family. Now I employ 12 people and host weekly community dinners.',
      achievement: 'Opened "Sabores do Brasil" - top-rated Brazilian restaurant in South London',
      category: 'Business Success',
      icon: HeartIcon,
      color: 'from-yellow-500 to-green-500',
      memberSince: '2021',
      eventsAttended: 78
    },
    {
      id: 'antonio-angola',
      name: 'António Dos Santos',
      country: 'Angola',
      flag: '🇦🇴',
      city: 'Originally from Luanda',
      location: 'Now in Stockwell',
      profession: 'PhD Student in African Studies, King\'s College',
      story: 'Pursuing my doctorate was lonely until I found this community. Other Portuguese speakers understood my research passion and helped me connect with academic networks. I\'ve presented my work internationally.',
      achievement: 'Published research on Angolan diaspora communities, featured in academic journals',
      category: 'Academic Achievement',
      icon: AcademicCapIcon,
      color: 'from-red-500 to-yellow-500',
      memberSince: '2021',
      eventsAttended: 32
    },
    {
      id: 'fatima-cape-verde',
      name: 'Fátima Rodrigues',
      country: 'Cape Verde',
      flag: '🇨🇻',
      city: 'Originally from Praia',
      location: 'Now in Brixton',
      profession: 'Community Healthcare Worker & Cultural Organizer',
      story: 'Coming from Cape Verde, I wanted to preserve our music and traditions for my children. LusoTown helped me organize Cape Verdean cultural events that now attract people from across London.',
      achievement: 'Organizes annual "Sounds of Cape Verde Festival" attended by 500+ people',
      category: 'Cultural Preservation',
      icon: UserGroupIcon,
      color: 'from-primary-500 to-accent-500',
      memberSince: '2020',
      eventsAttended: 67
    },
    {
      id: 'isabel-mozambique',
      name: 'Isabel Machava',
      country: 'Mozambique',
      flag: '🇲🇿',
      city: 'Originally from Maputo',
      location: 'Now in Vauxhall',
      profession: 'Social Worker & Community Advocate',
      story: 'As a single mother, building a support network was crucial. The Portuguese community became my extended family - helping with childcare, job applications, and emotional support. Now I help other families.',
      achievement: 'Started "Mozambican Mothers Support Network" helping 40+ families',
      category: 'Community Support',
      icon: HeartIcon,
      color: 'from-green-500 to-red-500',
      memberSince: '2019',
      eventsAttended: 89
    },
    {
      id: 'joao-mixed-heritage',
      name: 'João Silva-Brown',
      country: 'Mixed Heritage',
      flag: '🌍',
      city: 'British-Portuguese (Goan heritage)',
      location: 'Grew up in London',
      profession: 'Cultural Heritage Consultant',
      story: 'Growing up mixed-heritage, I struggled to connect with my Portuguese roots. This community helped me embrace my multicultural identity and now I help preserve Portuguese heritage stories in UK museums.',
      achievement: 'Curated "Luso-London Stories" exhibition at Museum of London',
      category: 'Heritage Preservation',
      icon: GlobeAltIcon,
      color: 'from-premium-500 to-primary-500',
      memberSince: '2020',
      eventsAttended: 54
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container-width section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-50 via-primary-50 to-accent-50 border border-secondary-200 rounded-full px-4 py-2 text-primary-600 font-medium mb-6">
            <SparklesIcon className="h-4 w-4 text-secondary-600" />
            Diverse Success Stories
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">Real People, Real Success</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Meet Portuguese speakers from across the lusophone world who found their community, built their careers, 
            and created lasting impact in London while celebrating their diverse cultural heritage.
          </p>
        </motion.div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {successStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                {/* Story Header */}
                <div className={`bg-gradient-to-r ${story.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 text-8xl opacity-10">
                    {story.flag}
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{story.name}</h3>
                        <div className="flex items-center gap-2 text-sm mb-2">
                          <span className="text-2xl">{story.flag}</span>
                          <span>{story.country}</span>
                        </div>
                        <p className="text-sm opacity-90">{story.city}</p>
                        <p className="text-sm opacity-90">{story.location}</p>
                      </div>
                      <story.icon className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full inline-block">
                      {story.profession}
                    </p>
                  </div>
                </div>

                {/* Story Content */}
                <div className="p-6">
                  <div className="mb-6">
                    <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {story.category}
                    </span>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      "{story.story}"
                    </p>
                  </div>

                  {/* Achievement Highlight */}
                  <div className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-xl p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Achievement:</h4>
                    <p className="text-gray-700 text-sm">
                      {story.achievement}
                    </p>
                  </div>

                  {/* Community Stats */}
                  <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
                    <div>
                      <span className="font-medium">Member since</span>
                      <br />
                      <span className="text-primary-600">{story.memberSince}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">Events attended</span>
                      <br />
                      <span className="text-secondary-600">{story.eventsAttended}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Community Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-secondary-50 via-primary-50 to-accent-50 rounded-2xl p-8 border border-secondary-200 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Collective Community Impact
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
                <div className="text-sm text-gray-600">Portuguese speakers connected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Businesses supported</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600 mb-2">200+</div>
                <div className="text-sm text-gray-600">Cultural events organized</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-coral-600 mb-2">10</div>
                <div className="text-sm text-gray-600">Countries represented</div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white rounded-xl">
              <p className="text-lg text-gray-600 italic">
                "Unidos pela língua, fortes pela diversidade" 
                <br />
                <span className="text-base font-normal">
                  - United by language, strong through diversity
                </span>
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {['🇵🇹', '🇧🇷', '🇦🇴', '🇲🇿', '🇨🇻', '🇬🇼', '🇸🇹', '🇹🇱', '🇲🇴', '🇬🇶'].map((flag, index) => (
                  <span key={index} className="text-3xl animate-pulse" style={{ animationDelay: `${index * 0.2}s` }}>
                    {flag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}