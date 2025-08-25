'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import {
  HomeIcon,
  HeartIcon,
  UsersIcon,
  MapPinIcon,
  StarIcon as StarIconOutline,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  CurrencyPoundIcon,
  WifiIcon,
  AcademicCapIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

interface HostFamily {
  id: string
  name: string
  location: string
  languages: string[]
  originCountry: {
    en: string
    pt: string
  }
  flag: string
  profileImage: string
  familyType: 'couple' | 'single-parent' | 'family-with-kids' | 'retired-couple'
  accommodation: {
    type: 'private-room' | 'ensuite-room' | 'studio'
    weeklyPrice: number
    deposit: number
    utilitiesIncluded: boolean
    internetIncluded: boolean
  }
  amenities: string[]
  culturalConnection: {
    en: string
    pt: string
  }
  experience: {
    yearsHosting: number
    studentsHosted: number
  }
  description: {
    en: string
    pt: string
  }
  preferredStudents: string[]
  rating: number
  reviews: number
  verified: boolean
  availableFrom: string
  proximityToTransport: {
    en: string
    pt: string
  }
  nearbyUniversities: string[]
  householdRules: string[]
  culturalActivities: string[]
  testimonial: {
    en: string
    pt: string
  }
}

const HOST_FAMILIES: HostFamily[] = [
  {
    id: 'santos-family-london',
    name: 'Santos Family',
    location: 'Camden, London',
    languages: ['Lusophone', 'English', 'Spanish'],
    originCountry: { en: 'Portugal', pt: 'Portugal' },
    flag: '🇵🇹',
    profileImage: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=400',
    familyType: 'family-with-kids',
    accommodation: {
      type: 'private-room',
      weeklyPrice: 185,
      deposit: 400,
      utilitiesIncluded: true,
      internetIncluded: true
    },
    amenities: ['Shared Kitchen', 'Garden Access', 'Laundry Facilities', 'Study Area', 'Lusophone Library'],
    culturalConnection: {
      en: 'Native Lusophone family from Porto offering authentic cultural immersion and home-cooked meals',
      pt: 'Família portuguesa nativa do Porto oferecendo imersão cultural autêntica e refeições caseiras'
    },
    experience: {
      yearsHosting: 8,
      studentsHosted: 24
    },
    description: {
      en: 'Warm Lusophone family home where students experience authentic Portuguese culture, language practice, and family traditions. Perfect for students wanting cultural immersion.',
      pt: 'Casa familiar portuguesa calorosa onde estudantes experienciam cultura portuguesa autêntica, prática da língua e tradições familiares. Perfeito para estudantes que querem imersão cultural.'
    },
    preferredStudents: ['Lusophone Studies', 'Language Learners', 'Cultural Exchange Students'],
    rating: 4.9,
    reviews: 18,
    verified: true,
    availableFrom: '2024-09-01',
    proximityToTransport: {
      en: '5 min walk to Camden Town Station (Northern Line)',
      pt: '5 min a pé da Estação Camden Town (Linha Norte)'
    },
    nearbyUniversities: ['UCL (20 min)', 'King\'s College (25 min)', 'SOAS (15 min)'],
    householdRules: ['No smoking indoors', 'Respect quiet hours', 'Join family meals when possible'],
    culturalActivities: ['Lusophone cooking lessons', 'Fado music evenings', 'Portuguese language practice'],
    testimonial: {
      en: 'Living with the Santos family transformed my understanding of Portuguese culture. Their warmth and generosity made London feel like home.',
      pt: 'Viver com a família Santos transformou a minha compreensão da cultura portuguesa. O seu carinho e generosidade fizeram de Londres um lar.'
    }
  },
  {
    id: 'oliveira-couple-kensington',
    name: 'Oliveira Couple',
    location: 'South Kensington, London',
    languages: ['Lusophone', 'English', 'French'],
    originCountry: { en: 'Brazil', pt: 'Brasil' },
    flag: '🇧🇷',
    profileImage: 'https://images.unsplash.com/photo-1559601748-6d37b7d05c1b?w=400',
    familyType: 'couple',
    accommodation: {
      type: 'ensuite-room',
      weeklyPrice: 240,
      deposit: 500,
      utilitiesIncluded: true,
      internetIncluded: true
    },
    amenities: ['Private Bathroom', 'Modern Kitchen', 'Gym Access', 'Roof Terrace', 'Brazilian Music Collection'],
    culturalConnection: {
      en: 'Brazilian couple from São Paulo sharing their vibrant culture, music, and culinary traditions',
      pt: 'Casal brasileiro de São Paulo partilhando a sua cultura vibrante, música e tradições culinárias'
    },
    experience: {
      yearsHosting: 5,
      studentsHosted: 15
    },
    description: {
      en: 'Sophisticated Brazilian couple offering luxury accommodation near Imperial College and Natural History Museum. Perfect blend of Brazilian warmth and London convenience.',
      pt: 'Casal brasileiro sofisticado oferecendo acomodação de luxo perto do Imperial College e Museu de História Natural. Combinação perfeita de calor brasileiro e conveniência londrina.'
    },
    preferredStudents: ['Graduate Students', 'Brazilian Studies', 'Music Students'],
    rating: 4.8,
    reviews: 12,
    verified: true,
    availableFrom: '2024-08-15',
    proximityToTransport: {
      en: '3 min walk to South Kensington Station (Piccadilly, Circle, District Lines)',
      pt: '3 min a pé da Estação South Kensington (Linhas Piccadilly, Circle, District)'
    },
    nearbyUniversities: ['Imperial College (10 min)', 'Royal College of Art (8 min)', 'Natural History Museum (2 min)'],
    householdRules: ['Professional environment', 'Guest notification required', 'Shared common areas'],
    culturalActivities: ['Brazilian cooking workshops', 'Samba nights', 'Lusophone conversation practice'],
    testimonial: {
      en: 'The Oliveiras provided not just accommodation but a Brazilian cultural experience in the heart of London. Unforgettable!',
      pt: 'Os Oliveiras proporcionaram não apenas acomodação mas uma experiência cultural brasileira no coração de Londres. Inesquecível!'
    }
  },
  {
    id: 'fernandes-grandmother-hampstead',
    name: 'Dona Maria Fernandes',
    location: 'Hampstead, London',
    languages: ['Lusophone', 'English'],
    originCountry: { en: 'Cape Verde', pt: 'Cabo Verde' },
    flag: '🇨🇻',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    familyType: 'single-parent',
    accommodation: {
      type: 'private-room',
      weeklyPrice: 165,
      deposit: 350,
      utilitiesIncluded: true,
      internetIncluded: true
    },
    amenities: ['Shared Kitchen', 'Beautiful Garden', 'Piano Access', 'Traditional Textiles', 'Cape Verdean Library'],
    culturalConnection: {
      en: 'Cape Verdean matriarch sharing island wisdom, Morna music traditions, and legendary hospitality (Morabeza)',
      pt: 'Matriarca cabo-verdiana partilhando sabedoria das ilhas, tradições musicais Morna e hospitalidade lendária (Morabeza)'
    },
    experience: {
      yearsHosting: 12,
      studentsHosted: 35
    },
    description: {
      en: 'Grandmother figure offering maternal care and authentic Cape Verdean cultural immersion. Students become part of the extended family with genuine island hospitality.',
      pt: 'Figura materna oferecendo cuidado maternal e imersão cultural cabo-verdiana autêntica. Estudantes tornam-se parte da família alargada com hospitalidade genuína das ilhas.'
    },
    preferredStudents: ['Music Students', 'Anthropology', 'Female Students Preferred'],
    rating: 5.0,
    reviews: 22,
    verified: true,
    availableFrom: '2024-09-15',
    proximityToTransport: {
      en: '8 min walk to Hampstead Station (Northern Line)',
      pt: '8 min a pé da Estação Hampstead (Linha Norte)'
    },
    nearbyUniversities: ['UCL (30 min)', 'Royal Academy of Music (25 min)', 'Hampstead Campus (5 min)'],
    householdRules: ['Respect for elders', 'Family meal participation', 'Cultural appreciation'],
    culturalActivities: ['Morna music sessions', 'Cape Verdean cooking', 'Traditional crafts', 'Storytelling evenings'],
    testimonial: {
      en: 'Dona Maria is like the grandmother I never had. Her Morabeza spirit and cultural wisdom enriched my entire university experience.',
      pt: 'Dona Maria é como a avó que nunca tive. O seu espírito de Morabeza e sabedoria cultural enriqueceu toda a minha experiência universitária.'
    }
  },
  {
    id: 'costa-retired-couple-greenwich',
    name: 'Costa Retired Couple',
    location: 'Greenwich, London',
    languages: ['Lusophone', 'English'],
    originCountry: { en: 'Angola', pt: 'Angola' },
    flag: '🇦🇴',
    profileImage: 'https://images.unsplash.com/photo-1569466896818-335b1bedfcce?w=400',
    familyType: 'retired-couple',
    accommodation: {
      type: 'private-room',
      weeklyPrice: 155,
      deposit: 320,
      utilitiesIncluded: true,
      internetIncluded: true
    },
    amenities: ['Quiet Study Environment', 'Large Garden', 'Cultural Artifacts', 'Traditional Music Collection', 'Academic Support'],
    culturalConnection: {
      en: 'Retired Angolan educators sharing African Portuguese heritage, Kizomba culture, and academic mentorship',
      pt: 'Educadores angolanos reformados partilhando herança portuguesa africana, cultura Kizomba e mentoria acadêmica'
    },
    experience: {
      yearsHosting: 6,
      studentsHosted: 18
    },
    description: {
      en: 'Academic-minded retired couple offering structured environment perfect for serious students. Rich Angolan cultural heritage with professional academic support.',
      pt: 'Casal reformado com mentalidade acadêmica oferecendo ambiente estruturado perfeito para estudantes sérios. Rica herança cultural angolana com apoio acadêmico profissional.'
    },
    preferredStudents: ['PhD Students', 'African Studies', 'Mature Students'],
    rating: 4.7,
    reviews: 14,
    verified: true,
    availableFrom: '2024-10-01',
    proximityToTransport: {
      en: '12 min walk to Greenwich Station (DLR, National Rail)',
      pt: '12 min a pé da Estação Greenwich (DLR, Comboios Nacionais)'
    },
    nearbyUniversities: ['University of Greenwich (15 min)', 'Trinity Laban (20 min)', 'King\'s College (35 min)'],
    householdRules: ['Academic focus environment', 'Scheduled meal times', 'Cultural respect'],
    culturalActivities: ['Kizomba dance lessons', 'African Portuguese history', 'Academic mentorship', 'Cultural discussions'],
    testimonial: {
      en: 'The Costas provided the perfect balance of cultural richness and academic support. Their wisdom guided my entire PhD journey.',
      pt: 'Os Costas proporcionaram o equilíbrio perfeito entre riqueza cultural e apoio acadêmico. A sua sabedoria guiou toda a minha jornada de doutoramento.'
    }
  },
  {
    id: 'silva-young-family-clapham',
    name: 'Silva Young Family',
    location: 'Clapham, London',
    languages: ['Lusophone', 'English'],
    originCountry: { en: 'Mozambique', pt: 'Moçambique' },
    flag: '🇲🇿',
    profileImage: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=400',
    familyType: 'family-with-kids',
    accommodation: {
      type: 'private-room',
      weeklyPrice: 175,
      deposit: 370,
      utilitiesIncluded: true,
      internetIncluded: true
    },
    amenities: ['Modern Facilities', 'Multicultural Environment', 'Children\'s Play Area', 'African Art Collection', 'Study Desk'],
    culturalConnection: {
      en: 'Young Mozambican family showcasing East African Portuguese culture, multicultural fusion, and modern African identity',
      pt: 'Família moçambicana jovem mostrando cultura portuguesa da África Oriental, fusão multicultural e identidade africana moderna'
    },
    experience: {
      yearsHosting: 3,
      studentsHosted: 8
    },
    description: {
      en: 'Dynamic young family offering contemporary African Lusophone cultural experience. Perfect for students interested in multicultural perspectives and modern African identity.',
      pt: 'Família jovem dinâmica oferecendo experiência cultural portuguesa africana contemporânea. Perfeito para estudantes interessados em perspetivas multiculturais e identidade africana moderna.'
    },
    preferredStudents: ['International Relations', 'Development Studies', 'Young Adults'],
    rating: 4.6,
    reviews: 6,
    verified: true,
    availableFrom: '2024-08-20',
    proximityToTransport: {
      en: '7 min walk to Clapham Common Station (Northern Line)',
      pt: '7 min a pé da Estação Clapham Common (Linha Norte)'
    },
    nearbyUniversities: ['King\'s College (25 min)', 'LSE (30 min)', 'Imperial College (35 min)'],
    householdRules: ['Family-friendly environment', 'Children consideration', 'Cultural openness'],
    culturalActivities: ['Multicultural cooking', 'African music appreciation', 'Language exchange', 'Community engagement'],
    testimonial: {
      en: 'The Silva family opened my eyes to the beautiful complexity of modern Mozambican culture. Their energy and warmth were infectious.',
      pt: 'A família Silva abriu-me os olhos para a bela complexidade da cultura moçambicana moderna. A sua energia e calor eram contagiosos.'
    }
  }
]

interface AccommodationHostFamiliesProps {
  limit?: number
  showPricing?: boolean
}

export default function AccommodationHostFamilies({ limit = 5, showPricing = true }: AccommodationHostFamiliesProps) {
  const { language } = useLanguage()
  const [selectedFamily, setSelectedFamily] = useState<HostFamily | null>(null)
  const familiesToShow = HOST_FAMILIES.slice(0, limit)

  const getFamilyTypeIcon = (type: string) => {
    switch (type) {
      case 'couple': return <HeartIcon className="w-4 h-4" />
      case 'single-parent': return <HomeIcon className="w-4 h-4" />
      case 'family-with-kids': return <UsersIcon className="w-4 h-4" />
      case 'retired-couple': return <AcademicCapIcon className="w-4 h-4" />
      default: return <HomeIcon className="w-4 h-4" />
    }
  }

  const getFamilyTypeLabel = (type: string) => {
    const labels: Record<string, { en: string, pt: string }> = {
      'couple': { en: 'Couple', pt: 'Casal' },
      'single-parent': { en: 'Single Parent', pt: 'Pai/Mãe Solteiro(a)' },
      'family-with-kids': { en: 'Family with Children', pt: 'Família com Crianças' },
      'retired-couple': { en: 'Retired Couple', pt: 'Casal Reformado' }
    }
    return labels[type]?.[language] || type
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container-width">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {language === 'pt' 
              ? 'Famílias de Acolhimento Portuguesas' 
              : 'Lusophone-Speaking Host Families'
            }
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'pt'
              ? 'Viva com famílias lusófonas autênticas e experiencie verdadeira hospitalidade cultural em Londres'
              : 'Live with authentic Portuguese-speaking families and experience true cultural hospitality in London'
            }
          </p>
        </motion.div>

        {/* Host Families Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {familiesToShow.map((family, index) => (
            <motion.div
              key={family.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Family Image & Header */}
              <div className="relative h-48 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${family.profileImage}')` }}
                />
                
                {/* Country Flag */}
                <div className="absolute top-4 left-4">
                  <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2">
                    <span className="text-xl">{family.flag}</span>
                    <span className="text-sm font-medium text-gray-700">{family.originCountry[language]}</span>
                  </div>
                </div>

                {/* Verified Badge */}
                {family.verified && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-green-500 text-white rounded-full p-2 shadow-lg">
                      <ShieldCheckIcon className="w-4 h-4" />
                    </div>
                  </div>
                )}

                {/* Rating */}
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                    <div className="flex items-center space-x-1">
                      <StarIconSolid className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-bold text-gray-800">{family.rating}</span>
                      <span className="text-xs text-gray-600">({family.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                {showPricing && (
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-primary-500 text-white rounded-lg px-3 py-2 shadow-lg">
                      <div className="text-sm font-bold">£{family.accommodation.weeklyPrice}/week</div>
                      <div className="text-xs opacity-90">{family.accommodation.type.replace('-', ' ')}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Family Details */}
              <div className="p-6">
                {/* Name & Location */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {family.name}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    {family.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    {getFamilyTypeIcon(family.familyType)}
                    <span className="ml-2">{getFamilyTypeLabel(family.familyType)}</span>
                  </div>
                </div>

                {/* Cultural Connection */}
                <div className="mb-4">
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {family.culturalConnection[language]}
                  </p>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {family.languages.map((lang, langIndex) => (
                      <span 
                        key={langIndex}
                        className="inline-block px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full border border-blue-200"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Amenities */}
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    {family.amenities.slice(0, 4).map((amenity, amenityIndex) => (
                      <div key={amenityIndex} className="flex items-center">
                        <div className="w-1 h-1 bg-primary-400 rounded-full mr-2" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="mb-4 bg-gray-50 rounded-lg p-3">
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div>
                      <div className="text-lg font-bold text-primary-600">{family.experience.yearsHosting}</div>
                      <div className="text-xs text-gray-600">{language === 'pt' ? 'Anos' : 'Years'}</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-secondary-600">{family.experience.studentsHosted}</div>
                      <div className="text-xs text-gray-600">{language === 'pt' ? 'Estudantes' : 'Students'}</div>
                    </div>
                  </div>
                </div>

                {/* Transport Info */}
                <div className="mb-4 text-xs text-gray-600">
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2 mt-1 flex-shrink-0" />
                    {family.proximityToTransport[language]}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedFamily(family)}
                    className="
                      flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 
                      text-white font-medium py-3 px-4 rounded-xl 
                      hover:from-primary-600 hover:to-secondary-600 
                      transform hover:scale-[1.02] active:scale-[0.98]
                      transition-all duration-200 shadow-lg hover:shadow-xl
                      min-h-[44px] text-sm
                    "
                  >
                    {language === 'pt' ? 'Ver Detalhes' : 'View Details'}
                  </button>
                  <button className="
                    px-3 py-3 bg-gray-100 text-gray-700 rounded-xl 
                    hover:bg-gray-200 transition-all duration-200 
                    min-h-[44px] shadow-lg hover:shadow-xl
                  ">
                    <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Families CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <button className="
            bg-white border-2 border-primary-200 text-primary-600 
            font-semibold py-4 px-8 rounded-xl 
            hover:bg-primary-50 hover:border-primary-300
            transition-all duration-200 shadow-lg hover:shadow-xl
            min-h-[44px]
          ">
            {language === 'pt' ? 'Ver Todas as Famílias de Acolhimento' : 'View All Host Families'}
          </button>
        </motion.div>

        {/* Family Details Modal */}
        {selectedFamily && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                {/* Header Image */}
                <div className="relative h-48 bg-gradient-to-r from-primary-500 to-secondary-500">
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url('${selectedFamily.profileImage}')` }}
                  />
                  <button 
                    onClick={() => setSelectedFamily(null)}
                    className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-gray-600 hover:text-gray-800 p-2 rounded-full transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  {/* Family Info Overlay */}
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-3xl">{selectedFamily.flag}</span>
                      <div>
                        <h2 className="text-2xl font-bold">{selectedFamily.name}</h2>
                        <p className="text-lg opacity-90">{selectedFamily.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="text-center p-4 bg-primary-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary-600 mb-1">{selectedFamily.rating}</div>
                      <div className="text-sm text-gray-600">{language === 'pt' ? 'Classificação' : 'Rating'}</div>
                    </div>
                    <div className="text-center p-4 bg-secondary-50 rounded-lg">
                      <div className="text-2xl font-bold text-secondary-600 mb-1">{selectedFamily.experience.yearsHosting}</div>
                      <div className="text-sm text-gray-600">{language === 'pt' ? 'Anos' : 'Years'}</div>
                    </div>
                    <div className="text-center p-4 bg-accent-50 rounded-lg">
                      <div className="text-2xl font-bold text-accent-600 mb-1">{selectedFamily.experience.studentsHosted}</div>
                      <div className="text-sm text-gray-600">{language === 'pt' ? 'Estudantes' : 'Students'}</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-1">£{selectedFamily.accommodation.weeklyPrice}</div>
                      <div className="text-sm text-gray-600">{language === 'pt' ? 'Por semana' : 'Per week'}</div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {language === 'pt' ? 'Sobre a Família' : 'About the Family'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {selectedFamily.description[language]}
                    </p>
                    
                    {/* Testimonial */}
                    <blockquote className="italic text-gray-600 p-4 bg-gray-50 rounded-lg border-l-4 border-primary-400">
                      "{selectedFamily.testimonial[language]}"
                    </blockquote>
                  </div>

                  {/* Accommodation Details & Cultural Activities - 2 columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Accommodation */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4">
                        {language === 'pt' ? 'Detalhes da Acomodação' : 'Accommodation Details'}
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{language === 'pt' ? 'Tipo:' : 'Type:'}</span>
                          <span className="font-medium capitalize">{selectedFamily.accommodation.type.replace('-', ' ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{language === 'pt' ? 'Preço semanal:' : 'Weekly price:'}</span>
                          <span className="font-medium">£{selectedFamily.accommodation.weeklyPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{language === 'pt' ? 'Depósito:' : 'Deposit:'}</span>
                          <span className="font-medium">£{selectedFamily.accommodation.deposit}</span>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="mt-6">
                        <h5 className="font-semibold text-gray-900 mb-3">
                          {language === 'pt' ? 'Comodidades:' : 'Amenities:'}
                        </h5>
                        <div className="grid grid-cols-1 gap-2">
                          {selectedFamily.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                              {amenity}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Cultural Activities */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4">
                        {language === 'pt' ? 'Atividades Culturais' : 'Cultural Activities'}
                      </h4>
                      <div className="space-y-3">
                        {selectedFamily.culturalActivities.map((activity, index) => (
                          <div key={index} className="flex items-start">
                            <SparklesIcon className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{activity}</span>
                          </div>
                        ))}
                      </div>

                      {/* Nearby Universities */}
                      <div className="mt-6">
                        <h5 className="font-semibold text-gray-900 mb-3">
                          {language === 'pt' ? 'Universidades Próximas:' : 'Nearby Universities:'}
                        </h5>
                        <div className="space-y-2">
                          {selectedFamily.nearbyUniversities.map((uni, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <AcademicCapIcon className="w-4 h-4 text-blue-500 mr-2" />
                              {uni}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-gray-200">
                    <button className="
                      flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 
                      text-white font-bold py-4 px-6 rounded-xl 
                      hover:from-primary-600 hover:to-secondary-600 
                      transition-all duration-200 shadow-lg hover:shadow-xl
                      min-h-[48px]
                    ">
                      {language === 'pt' ? 'Contactar Família' : 'Contact Family'}
                    </button>
                    <button className="
                      flex-1 border-2 border-primary-200 text-primary-600 
                      font-bold py-4 px-6 rounded-xl 
                      hover:bg-primary-50 hover:border-primary-300
                      transition-all duration-200 shadow-lg hover:shadow-xl
                      min-h-[48px]
                    ">
                      {language === 'pt' ? 'Marcar Visita' : 'Schedule Visit'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}