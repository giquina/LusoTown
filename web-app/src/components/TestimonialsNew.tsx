'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/solid'
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import { getImagesByCategory, getImageWithFallback, getAltTextWithFallback } from '@/lib/profileImages'
import { useLanguage } from '@/context/LanguageContext'
import { createMixedTestimonials, getTestimonialText, authenticPortugueseTestimonials } from '@/lib/testimonialMixer'

// Curated testimonials - Shortened and focused on LusoTown features
const allTestimonials = [
  // Portuguese testimonials (70%) - Shortened and LusoTown-focused
  {
    id: "fernanda-oliveira",
    name: "Fernanda Oliveira",
    age: "31",
    location: "Stockwell, Londres",
    imageId: "fernanda-oliveira",
    quote: "Através da LusoTown descobri eventos de fado e organizamos saraus mensais. É como ter Portugal em Londres!",
    rating: 5,
    relationship: "Organizadora de Eventos Culturais",
    language: 'pt' as const,
    isAuthentic: true
  },
  {
    id: "marco-santos", 
    name: "Marco Santos",
    age: "28",
    location: "Bermondsey, Londres",
    imageId: "marco-santos",
    quote: "A LusoTown ajudou-me a encontrar brasileiros e portugueses que amam samba. Temos roda de samba aos domingos!",
    rating: 5,
    relationship: "Músico Brasileiro",
    language: 'pt' as const,
    isAuthentic: true
  },
  {
    id: "catarina-lopes",
    name: "Catarina Lopes", 
    age: "35",
    location: "Nine Elms, Londres",
    imageId: "catarina-lopes",
    quote: "Organizamos workshops de português para crianças. Ver os pequenos cantar em português é a minha alegria!",
    rating: 5,
    relationship: "Educadora Luso-Britânica",
    language: 'pt' as const,
    isAuthentic: true
  },
  {
    id: "joao-pereira",
    name: "João Pereira",
    age: "42", 
    location: "Camden, Londres",
    imageId: "joao-pereira",
    quote: "Na LusoTown encontrei cabo-verdianos e portugueses. Organizamos noites de música crioula juntos!",
    rating: 5,
    relationship: "Músico Cabo-verdiano",
    language: 'pt' as const,
    isAuthentic: true
  },
  {
    id: "adelaide-silva",
    name: "Adelaide Silva",
    age: "39",
    location: "Brixton, Londres", 
    imageId: "adelaide-silva",
    quote: "Conheci mulheres angolanas e brasileiras em finanças. Criámos um grupo de networking profissional!",
    rating: 5,
    relationship: "Consultora Angolana",
    language: 'pt' as const,
    isAuthentic: true
  },
  
  // English testimonials (30%) - Shortened and feature-focused  
  {
    id: "sofia-costa",
    name: "Sofia Costa",
    age: "27",
    location: "Greenwich, London",
    locationPortuguese: "Greenwich, Londres",
    imageId: "sofia-costa",
    quote: "LusoTown's business networking events help me connect with Portuguese professionals while sharing pastéis de nata!",
    text: "LusoTown's business networking events help me connect with Portuguese professionals while sharing pastéis de nata!",
    textPortuguese: "Os eventos de networking da LusoTown ajudam-me a conectar com profissionais portugueses partilhando pastéis de nata!",
    rating: 5,
    relationship: "Portuguese Business Professional",
    relationshipPortuguese: "Profissional Portuguesa",
    language: 'en' as const
  },
  {
    id: "paulo-rodrigues", 
    name: "Paulo Rodrigues",
    age: "34",
    location: "Canary Wharf, London", 
    locationPortuguese: "Canary Wharf, Londres",
    imageId: "paulo-rodrigues",
    quote: "Found my Brazilian community through LusoTown. Now we organize churrasco weekends in London parks!",
    text: "Found my Brazilian community through LusoTown. Now we organize churrasco weekends in London parks!",
    textPortuguese: "Encontrei minha comunidade brasileira na LusoTown. Agora organizamos churrascos nos parques!",
    rating: 5,
    relationship: "Brazilian Community Organizer",
    relationshipPortuguese: "Organizador Brasileiro", 
    language: 'en' as const
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
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

export default function TestimonialsNew() {
  const { t, language } = useLanguage()
  
  // Create mixed testimonials ensuring 70% Portuguese reviews
  const mixedTestimonials = createMixedTestimonials(allTestimonials, { portuguesePercentage: 70 })

  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-secondary-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-accent-200 via-coral-100 to-secondary-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-tr from-secondary-200 via-accent-100 to-action-100 rounded-full opacity-25 animate-pulse animation-delay-400"></div>
        <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-gradient-to-r from-accent-100 via-secondary-100 to-coral-100 rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2 animate-pulse animation-delay-200"></div>
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-secondary-400 rounded-full opacity-40"></div>
        <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-accent-400 rounded-full"></div>
        <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-action-400 rounded-full opacity-50"></div>
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
            <StarIcon className="h-4 w-4 text-yellow-400" />
            {t('testimonials.badge')}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">{t('testimonials.title')}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Testimonials Grid - Enhanced Multi-Column Responsive Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-7 lg:gap-8 xl:gap-10"
        >
          {mixedTestimonials.map((testimonial, index) => {
            const displayContent = getTestimonialText(testimonial, language)
            
            return (
              <motion.div
                key={testimonial.id || testimonial.name}
                variants={cardVariants}
                className="group"
              >
                <div className="card p-4 sm:p-6 md:p-7 lg:p-8 h-full hover:scale-105 transition-all duration-300 group-hover:shadow-2xl bg-white/80 backdrop-blur-sm border border-white/50">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <ChatBubbleLeftIcon className="h-8 w-8 text-primary-300" />
                  </div>
                  
                  {/* Language indicator for Portuguese reviews */}
                  {testimonial.language === 'pt' && (
                    <div className="mb-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                        🇵🇹 Português
                      </span>
                    </div>
                  )}

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-700 leading-relaxed mb-6 text-sm sm:text-base">
                    "{displayContent.text}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg ring-2 ring-white">
                      <Image 
                        width={56}
                        height={56}
                        src={getImageWithFallback(testimonial.imageId)} 
                        alt={getAltTextWithFallback(testimonial.imageId)}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}{testimonial.age && `, ${testimonial.age}`}
                      </h4>
                      <p className="text-sm text-gray-500 mb-1">
                        {displayContent.location}
                      </p>
                      <p className="text-xs text-primary-600 font-medium">
                        {displayContent.relationship}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Community Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Meet Your <span className="gradient-text">London Portuguese Community</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of Portuguese speakers across London who are organizing events, building communities, and connecting throughout the city.
            </p>
          </div>
          
          {/* Photo Grid - Enhanced Multi-Column Layout */}
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 xs:gap-3 sm:gap-4 md:gap-5 mb-12">
            {getImagesByCategory('community').map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="aspect-square rounded-2xl overflow-hidden shadow-lg ring-2 ring-white hover:ring-primary-200 transition-all duration-300"
              >
                <Image 
                  width={400}
                  height={400}
                  src={member.path}
                  alt={member.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <div>
                <p className="text-4xl font-bold text-primary-500 mb-2">4.9/5</p>
                <p className="text-gray-600">Average Rating</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-secondary-500 mb-2">8K+</p>
                <p className="text-gray-600">London Members</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-accent-500 mb-2">32+</p>
                <p className="text-gray-600">London Boroughs</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-12"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Ready to Connect with Portuguese Speakers in London?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of Portuguese speakers across London who are organizing events, building communities, and creating lasting connections throughout the city.
          </p>
          <a href="/signup" className="btn-primary text-lg px-10 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 inline-block">
            Join the London Community
          </a>
        </motion.div>
      </div>
    </section>
  )
}