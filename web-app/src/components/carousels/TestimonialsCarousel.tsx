'use client'

import React from 'react'
import { StarIcon, QuoteIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import Carousel from '@/components/ui/Carousel'

export interface CommunityTestimonial {
  id: string
  name: string
  age: number
  location: string
  heritage: 'portugal' | 'brazil' | 'cape-verde' | 'angola' | 'mozambique' | 'guinea-bissau' | 'sao-tome-principe' | 'east-timor'
  photo: string
  rating: number
  testimonial: string
  category: 'events' | 'business' | 'community' | 'transport' | 'general'
  occupation?: string
  timeInUK: string
  verified: boolean
  featured: boolean
  platform: 'events' | 'business-directory' | 'transport' | 'general'
  helpfulVotes: number
  date: string
}

interface TestimonialsCarouselProps {
  testimonials: CommunityTestimonial[]
  title?: string
  subtitle?: string
  onTestimonialClick?: (testimonial: CommunityTestimonial) => void
  className?: string
  autoPlay?: boolean
  category?: 'all' | 'events' | 'business' | 'community' | 'transport'
}

// Heritage flag emojis
const HERITAGE_FLAGS = {
  portugal: '🇵🇹',
  brazil: '🇧🇷',
  'cape-verde': '🇨🇻',
  angola: '🇦🇴',
  mozambique: '🇲🇿',
  'guinea-bissau': '🇬🇼',
  'sao-tome-principe': '🇸🇹',
  'east-timor': '🇹🇱'
}

// Category colors and labels
const CATEGORY_INFO = {
  events: { color: 'bg-red-100 text-red-700', label: { pt: 'Eventos', en: 'Events' }, icon: '🎉' },
  business: { color: 'bg-green-100 text-green-700', label: { pt: 'Negócios', en: 'Business' }, icon: '🏪' },
  community: { color: 'bg-blue-100 text-blue-700', label: { pt: 'Comunidade', en: 'Community' }, icon: '🤝' },
  transport: { color: 'bg-orange-100 text-orange-700', label: { pt: 'Transporte', en: 'Transport' }, icon: '🚗' },
  general: { color: 'bg-purple-100 text-purple-700', label: { pt: 'Geral', en: 'General' }, icon: '💬' }
}

// Default testimonials data
const DEFAULT_TESTIMONIALS: CommunityTestimonial[] = [
  {
    id: '1',
    name: 'Maria Silva',
    age: 28,
    location: 'Londres',
    heritage: 'portugal',
    photo: '/images/testimonials/maria-silva.jpg',
    rating: 5,
    testimonial: 'O LusoTown mudou completamente a minha experiência em Londres! Encontrei eventos incríveis e conheci pessoas fantásticas da nossa comunidade portuguesa. É como ter um pedacinho de casa aqui no Reino Unido.',
    category: 'events',
    occupation: 'Enfermeira',
    timeInUK: '3 anos',
    verified: true,
    featured: true,
    platform: 'events',
    helpfulVotes: 24,
    date: '2024-01-15'
  },
  {
    id: '2',
    name: 'João Santos',
    age: 35,
    location: 'Manchester',
    heritage: 'brazil',
    photo: '/images/testimonials/joao-santos.jpg',
    rating: 5,
    testimonial: 'Como empresário brasileiro, o diretório de negócios do LusoTown foi fundamental para conectar com a comunidade lusófona. Aumentei as vendas em 40% nos primeiros 6 meses!',
    category: 'business',
    occupation: 'Proprietário de Restaurante',
    timeInUK: '7 anos',
    verified: true,
    featured: true,
    platform: 'business-directory',
    helpfulVotes: 18,
    date: '2024-02-03'
  },
  {
    id: '3',
    name: 'Ana Tavares',
    age: 24,
    location: 'Oxford',
    heritage: 'cape-verde',
    photo: '/images/testimonials/ana-tavares.jpg',
    rating: 5,
    testimonial: 'Sendo estudante cabo-verdiana, encontrar a minha comunidade era difícil até descobrir o LusoTown. Agora tenho um grupo de amigos que entendem a minha cultura e língua!',
    category: 'community',
    occupation: 'Estudante Universitária',
    timeInUK: '2 anos',
    verified: true,
    featured: false,
    platform: 'general',
    helpfulVotes: 31,
    date: '2024-01-28'
  },
  {
    id: '4',
    name: 'Carlos Mendes',
    age: 42,
    location: 'Birmingham',
    heritage: 'angola',
    photo: '/images/testimonials/carlos-mendes.jpg',
    rating: 4,
    testimonial: 'O sistema de transporte comunitário é genial! Consegui boleia para eventos e conheci pessoas no caminho. É seguro, confiável e muito mais barato que táxi.',
    category: 'transport',
    occupation: 'Engenheiro',
    timeInUK: '5 anos',
    verified: true,
    featured: false,
    platform: 'transport',
    helpfulVotes: 12,
    date: '2024-02-10'
  },
  {
    id: '5',
    name: 'Isabel Rodrigues',
    age: 31,
    location: 'Edinburgh',
    heritage: 'mozambique',
    photo: '/images/testimonials/isabel-rodrigues.jpg',
    rating: 5,
    testimonial: 'Mudei-me para Edimburgo sem conhecer ninguém. Através do LusoTown encontrei não apenas eventos culturais moçambicanos, mas uma verdadeira família lusófona.',
    category: 'community',
    occupation: 'Médica',
    timeInUK: '1 ano',
    verified: true,
    featured: true,
    platform: 'general',
    helpfulVotes: 27,
    date: '2024-01-20'
  },
  {
    id: '6',
    name: 'Pedro Costa',
    age: 29,
    location: 'Cambridge',
    heritage: 'portugal',
    photo: '/images/testimonials/pedro-costa.jpg',
    rating: 5,
    testimonial: 'A qualidade dos eventos portugueses listados é excecional. Festivais de fado, noites de bacalhau, encontros culturais - tudo muito bem organizado e autêntico!',
    category: 'events',
    occupation: 'Investigador',
    timeInUK: '4 anos',
    verified: true,
    featured: false,
    platform: 'events',
    helpfulVotes: 15,
    date: '2024-02-05'
  }
]

export default function TestimonialsCarousel({
  testimonials = DEFAULT_TESTIMONIALS,
  title,
  subtitle,
  onTestimonialClick,
  className = '',
  autoPlay = true,
  category = 'all'
}: TestimonialsCarouselProps) {
  const { language } = useLanguage()

  // Filter testimonials by category
  const filteredTestimonials = category === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === category)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div key={i} className="relative">
        {i < Math.floor(rating) ? (
          <StarSolidIcon className="w-4 h-4 text-yellow-400" />
        ) : i < rating ? (
          <div className="relative">
            <StarIcon className="w-4 h-4 text-yellow-400" />
            <StarSolidIcon 
              className="w-4 h-4 text-yellow-400 absolute top-0 left-0"
              style={{ clipPath: `inset(0 ${100 - (rating - Math.floor(rating)) * 100}% 0 0)` }}
            />
          </div>
        ) : (
          <StarIcon className="w-4 h-4 text-gray-300" />
        )}
      </div>
    ))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB', {
      month: 'short',
      year: 'numeric'
    })
  }

  const renderTestimonialCard = (testimonial: CommunityTestimonial, index: number) => (
    <motion.div
      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden h-full
                 hover:shadow-xl transition-all duration-300 cursor-pointer group relative"
      whileHover={{ y: -4 }}
      style={{ touchAction: 'manipulation', userSelect: 'none' }}
    >
      {/* Featured ribbon */}
      {testimonial.featured && (
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-gradient-to-r from-red-500 to-green-500 text-white text-xs font-bold 
                         px-3 py-1 rounded-bl-lg">
            {language === 'pt' ? 'Destaque' : 'Featured'}
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="p-6 space-y-4">
        {/* Quote Icon */}
        <div className="flex justify-between items-start">
          <QuoteIcon className="w-8 h-8 text-primary-200" />
          {testimonial.verified && (
            <div className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
              ✓ {language === 'pt' ? 'Verificado' : 'Verified'}
            </div>
          )}
        </div>

        {/* Testimonial Text */}
        <blockquote className="text-gray-700 text-sm leading-relaxed line-clamp-4 italic">
          "{testimonial.testimonial}"
        </blockquote>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {renderStars(testimonial.rating)}
          </div>
          <span className="text-sm text-gray-600 font-medium">{testimonial.rating.toFixed(1)}</span>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
          {/* Photo */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-100">
              <Image
                src={testimonial.photo}
                alt={testimonial.name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Heritage flag */}
            <div className="absolute -bottom-1 -right-1 text-sm bg-white rounded-full border border-gray-200 w-6 h-6 flex items-center justify-center">
              {HERITAGE_FLAGS[testimonial.heritage]}
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 truncate">{testimonial.name}</h4>
            <p className="text-sm text-gray-600 truncate">
              {testimonial.occupation && `${testimonial.occupation} • `}
              {testimonial.age} {language === 'pt' ? 'anos' : 'years'}
            </p>
            <p className="text-xs text-gray-500">
              {testimonial.location} • {testimonial.timeInUK} {language === 'pt' ? 'no RU' : 'in UK'}
            </p>
          </div>
        </div>

        {/* Category & Helpful Votes */}
        <div className="flex justify-between items-center pt-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${CATEGORY_INFO[testimonial.category].color} inline-flex items-center gap-1`}>
            <span>{CATEGORY_INFO[testimonial.category].icon}</span>
            {CATEGORY_INFO[testimonial.category].label[language as keyof typeof CATEGORY_INFO.events.label]}
          </span>
          
          <div className="text-xs text-gray-500 flex items-center gap-1">
            👍 {testimonial.helpfulVotes} • {formatDate(testimonial.date)}
          </div>
        </div>
      </div>
    </motion.div>
  )

  const defaultTitle = language === 'pt' 
    ? 'Histórias da Nossa Comunidade'
    : 'Stories from Our Community'
    
  const defaultSubtitle = language === 'pt'
    ? 'Descubra como o LusoTown está a ajudar portugueses e lusófonos a conectarem-se e prosperarem no Reino Unido'
    : 'Discover how LusoTown is helping Portuguese speakers connect and thrive across the United Kingdom'

  if (filteredTestimonials.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {language === 'pt' ? 'Nenhum testemunho encontrado' : 'No testimonials found'}
      </div>
    )
  }

  return (
    <div className={className}>
      <Carousel
        items={filteredTestimonials}
        renderItem={renderTestimonialCard}
        itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
        title={title || defaultTitle}
        subtitle={subtitle || defaultSubtitle}
        showArrows={true}
        showDots={true}
        autoPlay={autoPlay}
        autoPlayDelay={8000}
        gap="1.5rem"
        onItemClick={onTestimonialClick}
        ariaLabel={language === 'pt' ? 'Carrossel de testemunhos da comunidade' : 'Community testimonials carousel'}
        className="px-4 md:px-0"
      />
    </div>
  )
}