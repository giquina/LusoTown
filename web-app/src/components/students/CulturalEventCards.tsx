'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { LUSOPHONE_CELEBRATIONS } from '@/config/lusophone-celebrations'
import { 
  CalendarIcon, 
  MapPinIcon, 
  UsersIcon,
  MusicalNoteIcon,
  SparklesIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

interface CulturalEvent {
  id: string
  name: {
    en: string
    pt: string
  }
  description: {
    en: string
    pt: string
  }
  date: string
  time: string
  location: string
  category: 'music' | 'festival' | 'cultural' | 'food' | 'art'
  countries: string[]
  flags: string[]
  price: number
  originalPrice?: number
  capacity: number
  enrolled: number
  image: string
  highlights: string[]
  culturalElements: string[]
  isStudentFriendly: boolean
  rating: number
}

const STUDENT_CULTURAL_EVENTS: CulturalEvent[] = [
  {
    id: 'santos-populares-student-night',
    name: {
      en: 'Santos Populares Student Festival',
      pt: 'Festival Estudantil dos Santos Populares'
    },
    description: {
      en: 'Authentic Portuguese June festival celebration with traditional food, folk dancing, and cultural workshops designed for students',
      pt: 'Celebração autêntica do festival português de junho com comida tradicional, danças folclóricas e workshops culturais desenhados para estudantes'
    },
    date: '2024-06-29',
    time: '18:00',
    location: 'Instituto Camões London',
    category: 'festival',
    countries: ['Portugal'],
    flags: ['🇵🇹'],
    price: 15,
    originalPrice: 25,
    capacity: 80,
    enrolled: 62,
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a8b?w=800',
    highlights: ['Live Fado Performance', 'Traditional Sardines', 'Folk Dance Workshop', 'Portuguese Students Network'],
    culturalElements: ['Marchas Populares', 'Grilled Sardines', 'Sangria Workshop', 'Papel de Lustre Decorations'],
    isStudentFriendly: true,
    rating: 4.8
  },
  {
    id: 'brazilian-capoeira-masterclass',
    name: {
      en: 'Brazilian Capoeira & Samba Masterclass',
      pt: 'Masterclass de Capoeira e Samba Brasileira'
    },
    description: {
      en: 'Interactive Brazilian cultural experience featuring Capoeira martial arts, Samba dancing, and Açaí tasting for university students',
      pt: 'Experiência cultural brasileira interativa com artes marciais de Capoeira, dança de Samba e degustação de Açaí para estudantes universitários'
    },
    date: '2024-07-15',
    time: '19:30',
    location: 'Southbank Centre',
    category: 'cultural',
    countries: ['Brazil'],
    flags: ['🇧🇷'],
    price: 18,
    originalPrice: 30,
    capacity: 60,
    enrolled: 45,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
    highlights: ['Capoeira Training', 'Samba Workshop', 'Brazilian BBQ Tasting', 'Cultural Stories'],
    culturalElements: ['Berimbau Music', 'Traditional Movements', 'Brazilian Rhythm', 'Community Roda'],
    isStudentFriendly: true,
    rating: 4.9
  },
  {
    id: 'angolan-kizomba-night',
    name: {
      en: 'Angolan Kizomba & Culture Night',
      pt: 'Noite de Kizomba e Cultura Angolana'
    },
    description: {
      en: 'Sensual Angolan Kizomba dance workshop combined with traditional Angolan cuisine and cultural storytelling',
      pt: 'Workshop sensual de dança Kizomba angolana combinado com culinária angolana tradicional e narrativas culturais'
    },
    date: '2024-08-10',
    time: '20:00',
    location: 'Rich Mix Cultural Centre',
    category: 'music',
    countries: ['Angola'],
    flags: ['🇦🇴'],
    price: 20,
    originalPrice: 35,
    capacity: 50,
    enrolled: 38,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    highlights: ['Professional Kizomba Lessons', 'Muamba de Galinha Tasting', 'Traditional Drumming', 'Cultural History Session'],
    culturalElements: ['Semba Origins', 'Traditional Drums', 'Angolan Cuisine', 'Cultural Pride'],
    isStudentFriendly: true,
    rating: 4.7
  },
  {
    id: 'cape-verdean-morna-session',
    name: {
      en: 'Cape Verdean Morna & Morabeza Experience',
      pt: 'Experiência de Morna e Morabeza Cabo-verdiana'
    },
    description: {
      en: 'Intimate evening of Cape Verdean Morna music, traditional Cachupa cooking class, and island hospitality culture',
      pt: 'Noite íntima de música Morna cabo-verdiana, aula de culinária tradicional de Cachupa, e cultura de hospitalidade das ilhas'
    },
    date: '2024-09-05',
    time: '19:00',
    location: 'Café Oto',
    category: 'music',
    countries: ['Cape Verde'],
    flags: ['🇨🇻'],
    price: 22,
    originalPrice: 40,
    capacity: 35,
    enrolled: 28,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    highlights: ['Live Morna Performance', 'Cachupa Cooking Class', 'Cape Verdean Hospitality', 'Island Stories'],
    culturalElements: ['Traditional Guitar', 'Morabeza Spirit', 'Island Cuisine', 'Poetic Lyrics'],
    isStudentFriendly: true,
    rating: 4.9
  },
  {
    id: 'lusophone-film-screening',
    name: {
      en: 'Lusophone Cinema Student Screening',
      pt: 'Sessão de Cinema Lusófono para Estudantes'
    },
    description: {
      en: 'Curated film screening featuring contemporary cinema from Portuguese-speaking countries with director Q&A and cultural discussion',
      pt: 'Sessão de cinema curada com cinema contemporâneo de países de língua portuguesa com perguntas ao diretor e discussão cultural'
    },
    date: '2024-09-20',
    time: '18:30',
    location: 'BFI Southbank',
    category: 'art',
    countries: ['Portugal', 'Brazil', 'Angola', 'Mozambique'],
    flags: ['🇵🇹', '🇧🇷', '🇦🇴', '🇲🇿'],
    price: 12,
    originalPrice: 20,
    capacity: 100,
    enrolled: 75,
    image: 'https://images.unsplash.com/photo-1489599511331-1d61dbada0e6?w=800',
    highlights: ['Contemporary Films', 'Director Q&A', 'Cultural Discussion', 'Networking Reception'],
    culturalElements: ['Diverse Narratives', 'Cultural Context', 'Language Appreciation', 'Artistic Expression'],
    isStudentFriendly: true,
    rating: 4.6
  },
  {
    id: 'mozambican-heritage-workshop',
    name: {
      en: 'Mozambican Heritage & Art Workshop',
      pt: 'Workshop de Património e Arte Moçambicana'
    },
    description: {
      en: 'Hands-on workshop exploring Mozambican art, traditional crafts, and fusion cuisine representing the country\'s multicultural heritage',
      pt: 'Workshop prático explorando arte moçambicana, artesanatos tradicionais e culinária de fusão representando a herança multicultural do país'
    },
    date: '2024-10-12',
    time: '14:00',
    location: 'Africa Centre',
    category: 'art',
    countries: ['Mozambique'],
    flags: ['🇲🇿'],
    price: 25,
    originalPrice: 45,
    capacity: 40,
    enrolled: 32,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
    highlights: ['Traditional Crafts', 'Art Workshop', 'Fusion Cuisine', 'Cultural Heritage'],
    culturalElements: ['Makonde Sculptures', 'Traditional Patterns', 'Multicultural Fusion', 'Artistic Traditions'],
    isStudentFriendly: true,
    rating: 4.8
  }
]

interface CulturalEventCardsProps {
  limit?: number
  showPricing?: boolean
}

export default function CulturalEventCards({ limit = 6, showPricing = true }: CulturalEventCardsProps) {
  const { language } = useLanguage()
  const eventsToShow = STUDENT_CULTURAL_EVENTS.slice(0, limit)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'music': return <MusicalNoteIcon className="w-5 h-5" />
      case 'festival': return <SparklesIcon className="w-5 h-5" />
      case 'cultural': return <HeartIcon className="w-5 h-5" />
      case 'art': return <SparklesIcon className="w-5 h-5" />
      default: return <CalendarIcon className="w-5 h-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'music': return 'from-purple-500 to-pink-500'
      case 'festival': return 'from-orange-500 to-red-500'
      case 'cultural': return 'from-green-500 to-teal-500'
      case 'art': return 'from-blue-500 to-indigo-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <section className="py-16">
      <div className="container-width">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {language === 'pt' 
              ? 'Eventos Culturais para Estudantes' 
              : 'Cultural Events for Students'
            }
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'pt'
              ? 'Experiências culturais autênticas com descontos especiais para estudantes de universidades do Reino Unido'
              : 'Authentic cultural experiences with special discounts for United Kingdom university students'
            }
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsToShow.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${event.image}')` }}
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <div className={`
                    inline-flex items-center px-3 py-2 rounded-full text-white text-sm font-medium
                    bg-gradient-to-r ${getCategoryColor(event.category)} shadow-lg backdrop-blur-sm
                  `}>
                    {getCategoryIcon(event.category)}
                    <span className="ml-2 capitalize">{event.category}</span>
                  </div>
                </div>

                {/* Countries Flags */}
                <div className="absolute top-4 right-4 flex space-x-1">
                  {event.flags.map((flag, flagIndex) => (
                    <span key={flagIndex} className="text-2xl filter drop-shadow-lg">
                      {flag}
                    </span>
                  ))}
                </div>

                {/* Price Badge */}
                {showPricing && (
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-primary-600">£{event.price}</span>
                        {event.originalPrice && (
                          <span className="text-sm line-through text-gray-500">£{event.originalPrice}</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-600">
                        {language === 'pt' ? 'Estudante' : 'Student'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Event Content */}
              <div className="p-6">
                {/* Event Title & Rating */}
                <div className="mb-3">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-primary-600 transition-colors">
                      {event.name[language]}
                    </h3>
                    <div className="flex items-center ml-2">
                      <StarIconSolid className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">{event.rating}</span>
                    </div>
                  </div>
                  
                  {/* Event Details */}
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-2 text-primary-500" />
                      <span>{new Date(event.date).toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB')} at {event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-2 text-secondary-500" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <UsersIcon className="w-4 h-4 mr-2 text-accent-500" />
                      <span>{event.enrolled}/{event.capacity} {language === 'pt' ? 'inscritos' : 'enrolled'}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                  {event.description[language]}
                </p>

                {/* Cultural Highlights */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    {language === 'pt' ? 'Destaques Culturais:' : 'Cultural Highlights:'}
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {event.highlights.slice(0, 3).map((highlight, highlightIndex) => (
                      <span 
                        key={highlightIndex}
                        className="inline-block px-2 py-1 text-xs bg-primary-50 text-primary-700 rounded-full border border-primary-200"
                      >
                        {highlight}
                      </span>
                    ))}
                    {event.highlights.length > 3 && (
                      <span className="inline-block px-2 py-1 text-xs bg-gray-50 text-gray-600 rounded-full border border-gray-200">
                        +{event.highlights.length - 3} {language === 'pt' ? 'mais' : 'more'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">
                      {language === 'pt' ? 'Inscrições' : 'Enrollment'}
                    </span>
                    <span className="text-xs text-gray-600">
                      {Math.round((event.enrolled / event.capacity) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(event.enrolled / event.capacity) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Action Button */}
                <button className="
                  w-full bg-gradient-to-r from-primary-500 to-secondary-500 
                  text-white font-medium py-3 px-4 rounded-xl 
                  hover:from-primary-600 hover:to-secondary-600 
                  transform hover:scale-[1.02] active:scale-[0.98]
                  transition-all duration-200 shadow-lg hover:shadow-xl
                  min-h-[44px]
                  group-hover:shadow-primary-500/25
                ">
                  {language === 'pt' ? 'Inscrever-se Agora' : 'Enroll Now'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Events CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="
            bg-white border-2 border-primary-200 text-primary-600 
            font-semibold py-3 px-8 rounded-xl 
            hover:bg-primary-50 hover:border-primary-300
            transition-all duration-200 shadow-lg hover:shadow-xl
            min-h-[44px]
          ">
            {language === 'pt' ? 'Ver Todos os Eventos' : 'View All Events'}
          </button>
        </motion.div>
      </div>
    </section>
  )
}