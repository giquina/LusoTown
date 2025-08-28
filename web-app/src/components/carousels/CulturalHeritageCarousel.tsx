'use client'

import React from 'react'
import { GlobeAltIcon, UserGroupIcon, MusicalNoteIcon, HeartIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import Carousel from '@/components/ui/Carousel'

export interface CulturalHeritage {
  id: string
  country: string
  countryCode: 'portugal' | 'brazil' | 'cape-verde' | 'angola' | 'mozambique' | 'guinea-bissau' | 'sao-tome-principe' | 'east-timor'
  flag: string
  capital: string
  population: string
  language: string
  culturalHighlights: string[]
  musicalTraditions: string[]
  traditionalFoods: string[]
  image: string
  description: string
  communitySize: string
  featuredEvents: number
  businesses: number
  color: {
    primary: string
    secondary: string
    accent: string
  }
}

interface CulturalHeritageCarouselProps {
  countries?: CulturalHeritage[]
  title?: string
  subtitle?: string
  onCountryClick?: (country: CulturalHeritage) => void
  className?: string
  autoPlay?: boolean
}

// Default PALOP countries data
const DEFAULT_PALOP_COUNTRIES: CulturalHeritage[] = [
  {
    id: 'portugal',
    country: 'Portugal',
    countryCode: 'portugal',
    flag: '🇵🇹',
    capital: 'Lisboa',
    population: '10.3M',
    language: 'Português',
    culturalHighlights: ['Fado', 'Azulejos', 'Porto', 'Mosteiros'],
    musicalTraditions: ['Fado', 'Música Popular', 'Folk'],
    traditionalFoods: ['Bacalhau', 'Pastéis de Nata', 'Francesinha', 'Caldo Verde'],
    image: '/images/heritage/portugal.jpg',
    description: 'Terra do fado e dos descobrimentos, Portugal é o berço da língua portuguesa e uma rica tradição cultural.',
    communitySize: '45,000+',
    featuredEvents: 24,
    businesses: 156,
    color: {
      primary: 'from-red-500 to-green-600',
      secondary: 'from-red-100 to-green-100',
      accent: 'red-600'
    }
  },
  {
    id: 'brazil',
    country: 'Brasil',
    countryCode: 'brazil',
    flag: '🇧🇷',
    capital: 'Brasília',
    population: '215M',
    language: 'Português Brasileiro',
    culturalHighlights: ['Carnaval', 'Samba', 'Capoeira', 'Cristo Redentor'],
    musicalTraditions: ['Samba', 'Bossa Nova', 'MPB', 'Forró'],
    traditionalFoods: ['Feijoada', 'Brigadeiro', 'Açaí', 'Pão de Açúcar'],
    image: '/images/heritage/brazil.jpg',
    description: 'O maior país lusófono, famoso pelo seu carnaval vibrante, música contagiante e cultura diversificada.',
    communitySize: '12,000+',
    featuredEvents: 18,
    businesses: 89,
    color: {
      primary: 'from-green-500 to-yellow-500',
      secondary: 'from-green-100 to-yellow-100',
      accent: 'green-600'
    }
  },
  {
    id: 'cape-verde',
    country: 'Cabo Verde',
    countryCode: 'cape-verde',
    flag: '🇨🇻',
    capital: 'Praia',
    population: '563K',
    language: 'Português e Crioulo',
    culturalHighlights: ['Morna', 'Coladeira', 'Cesária Évora', 'Mindelo'],
    musicalTraditions: ['Morna', 'Coladeira', 'Funaná', 'Batuque'],
    traditionalFoods: ['Cachupa', 'Pastéis', 'Grogue', 'Queijo de Cabra'],
    image: '/images/heritage/cape-verde.jpg',
    description: 'Arquipélago de música e saudade, conhecido pela morna e pelos ventos alísios que inspiram seus artistas.',
    communitySize: '3,500+',
    featuredEvents: 8,
    businesses: 23,
    color: {
      primary: 'from-blue-500 to-white',
      secondary: 'from-blue-100 to-gray-50',
      accent: 'blue-600'
    }
  },
  {
    id: 'angola',
    country: 'Angola',
    countryCode: 'angola',
    flag: '🇦🇴',
    capital: 'Luanda',
    population: '33.9M',
    language: 'Português',
    culturalHighlights: ['Kuduro', 'Semba', 'Kizomba', 'Fortaleza São Miguel'],
    musicalTraditions: ['Semba', 'Kizomba', 'Kuduro', 'Rebita'],
    traditionalFoods: ['Muamba de Galinha', 'Calulu', 'Funge', 'Kissaca'],
    image: '/images/heritage/angola.jpg',
    description: 'Berço do semba e da kizomba, Angola contribui com ritmos únicos para a música mundial lusófona.',
    communitySize: '2,800+',
    featuredEvents: 12,
    businesses: 34,
    color: {
      primary: 'from-red-600 to-black',
      secondary: 'from-red-100 to-gray-100',
      accent: 'red-700'
    }
  },
  {
    id: 'mozambique',
    country: 'Moçambique',
    countryCode: 'mozambique',
    flag: '🇲🇿',
    capital: 'Maputo',
    population: '32.4M',
    language: 'Português',
    culturalHighlights: ['Marrabenta', 'Timbila', 'Makonde', 'Ilha de Moçambique'],
    musicalTraditions: ['Marrabenta', 'Timbila', 'Pandza', 'Chopi'],
    traditionalFoods: ['Matapa', 'Xima', 'Piri-piri', 'Chamussas'],
    image: '/images/heritage/mozambique.jpg',
    description: 'Terra da marrabenta e dos timbila, Moçambique oferece uma rica tradição musical e cultural única.',
    communitySize: '1,200+',
    featuredEvents: 6,
    businesses: 18,
    color: {
      primary: 'from-green-600 to-red-600',
      secondary: 'from-green-100 to-red-100',
      accent: 'green-700'
    }
  },
  {
    id: 'guinea-bissau',
    country: 'Guiné-Bissau',
    countryCode: 'guinea-bissau',
    flag: '🇬🇼',
    capital: 'Bissau',
    population: '2.0M',
    language: 'Português e Crioulo',
    culturalHighlights: ['Gumbé', 'Carnaval de Bissau', 'Bijagós', 'Balanta'],
    musicalTraditions: ['Gumbé', 'Tina', 'Kundere', 'Folk'],
    traditionalFoods: ['Jollof Rice', 'Canje', 'Bissap', 'Cashew'],
    image: '/images/heritage/guinea-bissau.jpg',
    description: 'Pequeno país com grande coração, conhecido pelo gumbé e pela hospitalidade calorosa do seu povo.',
    communitySize: '800+',
    featuredEvents: 4,
    businesses: 12,
    color: {
      primary: 'from-red-500 to-yellow-400',
      secondary: 'from-red-100 to-yellow-100',
      accent: 'red-600'
    }
  },
  {
    id: 'sao-tome-principe',
    country: 'São Tomé e Príncipe',
    countryCode: 'sao-tome-principe',
    flag: '🇸🇹',
    capital: 'São Tomé',
    population: '223K',
    language: 'Português',
    culturalHighlights: ['Ússua', 'Danço-Congo', 'Tchiloli', 'Plantações de Cacau'],
    musicalTraditions: ['Ússua', 'Danço', 'Socopé', 'Dexa'],
    traditionalFoods: ['Calulu', 'Banana-Pão', 'Chocolate', 'Peixe Grelhado'],
    image: '/images/heritage/sao-tome-principe.jpg',
    description: 'Pérolas do Atlântico, as ilhas de São Tomé e Príncipe encantam com tradições únicas e natureza exuberante.',
    communitySize: '300+',
    featuredEvents: 3,
    businesses: 8,
    color: {
      primary: 'from-green-500 to-yellow-300',
      secondary: 'from-green-100 to-yellow-50',
      accent: 'green-600'
    }
  },
  {
    id: 'east-timor',
    country: 'Timor-Leste',
    countryCode: 'east-timor',
    flag: '🇹🇱',
    capital: 'Díli',
    population: '1.3M',
    language: 'Português e Tétum',
    culturalHighlights: ['Tais', 'Uma Lulik', 'Ai-Hulun', 'Cristo Rei'],
    musicalTraditions: ['Dadolin', 'Likurai', 'Traditional Folk', 'Modern Timorese'],
    traditionalFoods: ['Ikan Pepes', 'Batar Da\'an', 'Ai-Manas', 'Tukir'],
    image: '/images/heritage/east-timor.jpg',
    description: 'O mais jovem país lusófono, Timor-Leste combina tradições ancestrais com a língua portuguesa numa síntese única.',
    communitySize: '150+',
    featuredEvents: 2,
    businesses: 5,
    color: {
      primary: 'from-red-600 to-yellow-400',
      secondary: 'from-red-100 to-yellow-50',
      accent: 'red-700'
    }
  }
]

export default function CulturalHeritageCarousel({
  countries = DEFAULT_PALOP_COUNTRIES,
  title,
  subtitle,
  onCountryClick,
  className = '',
  autoPlay = true
}: CulturalHeritageCarouselProps) {
  const { language } = useLanguage()

  const renderCountryCard = (country: CulturalHeritage, index: number) => (
    <motion.div
      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden h-full
                 hover:shadow-xl transition-all duration-300 cursor-pointer group"
      whileHover={{ y: -6, scale: 1.02 }}
      style={{ touchAction: 'manipulation', userSelect: 'none' }}
    >
      {/* Country Image with Gradient Overlay */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={country.image}
          alt={country.country}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${country.color.secondary} opacity-20 group-hover:opacity-30 transition-opacity`} />
        
        {/* Flag */}
        <div className="absolute top-4 left-4 text-4xl drop-shadow-lg">
          {country.flag}
        </div>
        
        {/* Community Size */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm 
                       px-3 py-1 rounded-full text-sm font-bold text-gray-800">
          {country.communitySize} {language === 'pt' ? 'pessoas' : 'people'}
        </div>
        
        {/* Country Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <h3 className="text-2xl font-bold text-white mb-1">{country.country}</h3>
          <p className="text-white/90 text-sm">{country.capital} • {country.population}</p>
        </div>
      </div>

      {/* Country Content */}
      <div className="p-5 space-y-4">
        {/* Language */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <GlobeAltIcon className="w-4 h-4 text-primary-500" />
          <span>{country.language}</span>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">
          {country.description}
        </p>

        {/* Cultural Highlights */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
            <MusicalNoteIcon className="w-4 h-4 text-primary-500" />
            {language === 'pt' ? 'Destaques Culturais' : 'Cultural Highlights'}
          </h4>
          <div className="flex flex-wrap gap-1">
            {country.culturalHighlights.slice(0, 4).map((highlight, highlightIndex) => (
              <span
                key={highlightIndex}
                className={`px-2 py-1 rounded-md text-xs font-medium bg-gradient-to-r ${country.color.secondary} text-gray-700 border`}
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Traditional Foods */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            {language === 'pt' ? 'Gastronomia Tradicional' : 'Traditional Cuisine'}
          </h4>
          <div className="flex flex-wrap gap-1">
            {country.traditionalFoods.slice(0, 3).map((food, foodIndex) => (
              <span
                key={foodIndex}
                className="px-2 py-1 bg-amber-50 text-amber-700 rounded-md text-xs border border-amber-200"
              >
                {food}
              </span>
            ))}
          </div>
        </div>

        {/* Community Stats */}
        <div className="pt-3 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className={`text-lg font-bold text-${country.color.accent}`}>{country.featuredEvents}</div>
              <div className="text-xs text-gray-500">{language === 'pt' ? 'Eventos' : 'Events'}</div>
            </div>
            <div>
              <div className={`text-lg font-bold text-${country.color.accent}`}>{country.businesses}</div>
              <div className="text-xs text-gray-500">{language === 'pt' ? 'Negócios' : 'Businesses'}</div>
            </div>
          </div>
        </div>

        {/* Explore Button */}
        <button className={`w-full mt-4 bg-gradient-to-r ${country.color.primary} 
                          text-white py-2 px-4 rounded-lg font-medium text-sm
                          hover:shadow-lg transition-all duration-200
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${country.color.accent}`}
                style={{ touchAction: 'manipulation', userSelect: 'none' }}>
          {language === 'pt' ? 'Explorar Cultura' : 'Explore Culture'}
        </button>
      </div>
    </motion.div>
  )

  const defaultTitle = language === 'pt' 
    ? 'Herança Cultural Lusófona'
    : 'Portuguese-Speaking Cultural Heritage'
    
  const defaultSubtitle = language === 'pt'
    ? 'Descubra a rica diversidade cultural dos 8 países que falam português ao redor do mundo'
    : 'Discover the rich cultural diversity of the 8 Portuguese-speaking countries around the world'

  return (
    <div className={className}>
      <Carousel
        items={countries}
        renderItem={renderCountryCard}
        itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
        title={title || defaultTitle}
        subtitle={subtitle || defaultSubtitle}
        showArrows={true}
        showDots={true}
        autoPlay={autoPlay}
        autoPlayDelay={7000}
        gap="1.5rem"
        onItemClick={onCountryClick}
        ariaLabel={language === 'pt' ? 'Carrossel de herança cultural lusófona' : 'Portuguese cultural heritage carousel'}
        className="px-4 md:px-0"
      />
    </div>
  )
}