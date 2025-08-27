'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { OptimizedPortugueseCarousel } from '@/components/carousels/OptimizedPortugueseCarousel'
import {
  THIS_WEEKEND_LUSOPHONE_EVENTS,
  getFeaturedWeekendEvents,
  getWeekendEventsByCity,
  getWeekendEventsStats,
  type WeekendEventItem
} from '@/config/weekend-events'
import {
  FEATURED_PORTUGUESE_BUSINESSES,
  getPremiumBusinesses,
  getBusinessDirectoryStats,
  type BusinessCarouselItem
} from '@/config/business-directory-carousels'
import { CalendarDaysIcon, MapPinIcon, UsersIcon, SparklesIcon } from '@heroicons/react/24/outline'
import logger from '@/utils/logger'

// Weekend Event Card Component
function WeekendEventCard({ event, index, isVisible }: { event: WeekendEventItem; index: number; isVisible: boolean }) {
  const { language } = useLanguage()

  if (!isVisible) {
    return (
      <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl animate-pulse flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading Portuguese-speaking community event...</div>
      </div>
    )
  }

  const handleEventClick = () => {
    logger.culturalEvent.info(`Weekend event clicked: ${event.title[language]}`, {
      culturalContext: event.culturalOrigin === 'portugal' ? 'portuguese' : 
                      event.culturalOrigin === 'brazil' ? 'brazilian' : 'palop',
      eventId: event.id,
      metadata: {
        city: event.city,
        category: event.category,
        price: event.price,
        culturalOrigin: event.culturalOrigin
      }
    })
  }

  return (
    <motion.div
      className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full min-h-[280px] cursor-pointer"
      whileHover={{ y: -2 }}
      onClick={handleEventClick}
    >
      {/* Event Image with Cultural Flag */}
      <div className="relative h-40 bg-gradient-to-br from-primary-100 via-primary-50 to-gold-50 flex items-center justify-center overflow-hidden">
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="text-2xl" title={`Cultural origin: ${event.culturalOrigin}`}>
            {event.flagEmoji}
          </span>
          {event.featured && (
            <span className="bg-gold-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
              <SparklesIcon className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>
        
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            event.status === 'available' ? 'bg-green-100 text-green-700' :
            event.status === 'limited' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {event.status === 'available' ? 'Available' :
             event.status === 'limited' ? 'Limited' : 'Full'}
          </span>
        </div>
        
        {/* Category Icon */}
        <div className="text-primary-600">
          {event.category.includes('music') && '🎵'}
          {event.category.includes('dance') && '💃'}
          {event.category.includes('cuisine') && '🍽️'}
          {event.category.includes('wine') && '🍷'}
          {event.category.includes('literature') && '📚'}
          {event.category.includes('festival') && '🎭'}
          {event.category.includes('workshop') && '🎨'}
        </div>
      </div>

      {/* Event Details */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {event.title[language]}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {event.shortDescription[language]}
          </p>
          
          {/* Event Meta */}
          <div className="space-y-1 text-xs text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <CalendarDaysIcon className="w-4 h-4" />
              <span>{event.date} • {event.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPinIcon className="w-4 h-4" />
              <span>{event.city} • {event.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <UsersIcon className="w-4 h-4" />
              <span>{event.attendees}/{event.maxAttendees} attending</span>
            </div>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="text-right">
            <span className="text-lg font-bold text-primary-600">£{event.price}</span>
            {event.specialOffer && (
              <p className="text-xs text-green-600 font-medium">{event.specialOffer}</p>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500 text-right">
              <div className="flex items-center gap-1">
                <span>⭐</span>
                <span>{event.communityRating.toFixed(1)} ({event.reviewCount})</span>
              </div>
              <div className="text-gray-400">
                Cultural authenticity: {event.culturalAuthenticity}/10
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Business Card Component
function BusinessCard({ business, index, isVisible }: { business: BusinessCarouselItem; index: number; isVisible: boolean }) {
  const { language } = useLanguage()

  if (!isVisible) {
    return (
      <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl animate-pulse flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading Portuguese business...</div>
      </div>
    )
  }

  const handleBusinessClick = () => {
    logger.businessAction.info(`Business clicked: ${business.title[language]}`, {
      culturalContext: business.ownerCountry === 'portugal' ? 'portuguese' : 
                      business.ownerCountry === 'brazil' ? 'brazilian' : 'palop',
      businessId: business.id,
      metadata: {
        city: business.location.city,
        category: business.category,
        ownerCountry: business.ownerCountry,
        isPremium: business.isPremium
      }
    })
  }

  return (
    <motion.div
      className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full min-h-[280px] cursor-pointer"
      whileHover={{ y: -2 }}
      onClick={handleBusinessClick}
    >
      {/* Business Image with Flag */}
      <div className="relative h-40 bg-gradient-to-br from-primary-100 via-primary-50 to-gold-50 flex items-center justify-center">
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="text-2xl" title={`Owner from: ${business.ownerCountry}`}>
            {business.flagEmoji}
          </span>
          {business.isPremium && (
            <span className="bg-gold-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
              <SparklesIcon className="w-3 h-3" />
              Premium
            </span>
          )}
        </div>
        
        {business.isVerified && (
          <div className="absolute top-3 right-3">
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
              ✓ Verified
            </span>
          </div>
        )}
        
        {/* Category Icon */}
        <div className="text-4xl text-primary-600">
          {business.category === 'restaurant' && '🍽️'}
          {business.category === 'cultural_services' && '🎭'}
          {business.category === 'beauty_wellness' && '💄'}
          {business.category === 'grocery' && '🛍️'}
          {business.category === 'professional_services' && '💼'}
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between flex-1">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {business.title[language]}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {business.description[language]}
          </p>
          
          <div className="space-y-1 text-xs text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <MapPinIcon className="w-4 h-4" />
              <span>{business.location.city} • {business.location.region}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Owner: {business.ownerName}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="text-sm">
            <span className="text-primary-600 font-medium">{business.priceRange}</span>
            <div className="text-xs text-gray-500">
              Est. {business.establishedYear}
            </div>
          </div>
          
          <div className="text-xs text-gray-500 text-right">
            <div className="flex items-center gap-1">
              <span>⭐</span>
              <span>{business.rating.toFixed(1)} ({business.reviewCount})</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function HomePage() {
  const { language, t } = useLanguage()
  
  // Get carousel data
  const weekendEvents = THIS_WEEKEND_LUSOPHONE_EVENTS
  const featuredEvents = getFeaturedWeekendEvents()
  const londonEvents = getWeekendEventsByCity('London')
  const premiumBusinesses = getPremiumBusinesses()
  
  // Get stats for display
  const weekendStats = getWeekendEventsStats()
  const businessStats = getBusinessDirectoryStats()

  React.useEffect(() => {
    logger.culturalEvent.info('Homepage loaded with carousel system', {
      culturalContext: 'lusophone',
      metadata: {
        totalWeekendEvents: weekendEvents.length,
        featuredEvents: featuredEvents.length,
        premiumBusinesses: premiumBusinesses.length,
        userLanguage: language
      }
    })
  }, [weekendEvents.length, featuredEvents.length, premiumBusinesses.length, language])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50/30 to-gold-50/20">
      {/* Hero Section with Community Stats */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="absolute inset-0 bg-[url('/images/patterns/portuguese-tiles.svg')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                🇵🇹 LusoTown
                <br />
                <span className="text-gold-300">
                  {language === 'pt' ? 'Comunidade Lusófona' : 'Portuguese-speaking Community'}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
                {language === 'pt' 
                  ? 'Descubra eventos autênticos, negócios locais e conexões culturais em todo o Reino Unido'
                  : 'Discover authentic events, local businesses, and cultural connections across the United Kingdom'
                }
              </p>
              
              {/* Community Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gold-300 mb-1">{weekendStats.totalEvents}</div>
                  <div className="text-sm text-primary-200">
                    {language === 'pt' ? 'Eventos Este Fim de Semana' : 'Events This Weekend'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gold-300 mb-1">{businessStats.totalBusinesses}+</div>
                  <div className="text-sm text-primary-200">
                    {language === 'pt' ? 'Negócios Lusófonos' : 'Portuguese-speaking Businesses'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gold-300 mb-1">{weekendStats.citiesServed}</div>
                  <div className="text-sm text-primary-200">
                    {language === 'pt' ? 'Cidades no Reino Unido' : 'Cities Across UK'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gold-300 mb-1">{weekendStats.countriesRepresented}</div>
                  <div className="text-sm text-primary-200">
                    {language === 'pt' ? 'Países Lusófonos' : 'Lusophone Countries'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* This Weekend's Lusophone Community Carousel */}
        <section className="mb-16">
          <OptimizedPortugueseCarousel
            items={featuredEvents}
            renderItem={(event: WeekendEventItem, index: number, isVisible: boolean) => (
              <WeekendEventCard event={event} index={index} isVisible={isVisible} />
            )}
            title={{
              en: "This Weekend's Lusophone Community Events",
              pt: "Eventos da Comunidade Lusófona Este Fim de Semana"
            }}
            subtitle={{
              en: `Authentic cultural experiences from ${weekendStats.countriesRepresented} Portuguese-speaking nations across ${weekendStats.citiesServed} UK cities`,
              pt: `Experiências culturais autênticas de ${weekendStats.countriesRepresented} nações lusófonas em ${weekendStats.citiesServed} cidades do Reino Unido`
            }}
            autoAdvance={true}
            autoAdvanceInterval={6000}
            showControls={true}
            showDots={true}
            enablePerformanceOptimization={true}
            enablePortugueseCulturalOptimization={true}
            contentType="cultural"
            className="mb-8"
          />
        </section>

        {/* All Weekend Events Carousel */}
        <section className="mb-16">
          <OptimizedPortugueseCarousel
            items={weekendEvents}
            renderItem={(event: WeekendEventItem, index: number, isVisible: boolean) => (
              <WeekendEventCard event={event} index={index} isVisible={isVisible} />
            )}
            title={{
              en: "Explore All Weekend Events",
              pt: "Explore Todos os Eventos do Fim de Semana"
            }}
            subtitle={{
              en: `${weekendEvents.length} authentic Portuguese-speaking community events across the United Kingdom`,
              pt: `${weekendEvents.length} eventos autênticos da comunidade lusófona em todo o Reino Unido`
            }}
            autoAdvance={false}
            showControls={true}
            showDots={true}
            enablePerformanceOptimization={true}
            enablePortugueseCulturalOptimization={true}
            contentType="events"
            className="mb-8"
          />
        </section>

        {/* Premium Portuguese Businesses Carousel */}
        <section className="mb-16">
          <OptimizedPortugueseCarousel
            items={premiumBusinesses}
            renderItem={(business: BusinessCarouselItem, index: number, isVisible: boolean) => (
              <BusinessCard business={business} index={index} isVisible={isVisible} />
            )}
            title={{
              en: "Premium Portuguese-speaking Businesses",
              pt: "Negócios Premium da Comunidade Lusófona"
            }}
            subtitle={{
              en: `Discover ${businessStats.totalPremium} verified premium businesses from Portuguese-speaking entrepreneurs across the UK`,
              pt: `Descubra ${businessStats.totalPremium} negócios premium verificados de empreendedores lusófonos em todo o Reino Unido`
            }}
            autoAdvance={true}
            autoAdvanceInterval={8000}
            showControls={true}
            showDots={true}
            enablePerformanceOptimization={true}
            enablePortugueseCulturalOptimization={true}
            contentType="businesses"
            className="mb-8"
          />
        </section>

        {/* London Portuguese-speaking Community Spotlight */}
        <section className="mb-16">
          <OptimizedPortugueseCarousel
            items={londonEvents}
            renderItem={(event: WeekendEventItem, index: number, isVisible: boolean) => (
              <WeekendEventCard event={event} index={index} isVisible={isVisible} />
            )}
            title={{
              en: "London Portuguese-speaking Community Spotlight",
              pt: "Destaque da Comunidade Lusófona de Londres"
            }}
            subtitle={{
              en: `Experience authentic Portuguese culture in London with ${londonEvents.length} weekend events`,
              pt: `Experiencie a cultura portuguesa autêntica em Londres com ${londonEvents.length} eventos de fim de semana`
            }}
            autoAdvance={false}
            showControls={true}
            showDots={true}
            enablePerformanceOptimization={true}
            enablePortugueseCulturalOptimization={true}
            contentType="cultural"
            className="mb-8"
          />
        </section>

        {/* Cultural Diversity Footer */}
        <section className="text-center py-12 bg-gradient-to-r from-primary-50 to-gold-50 rounded-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'pt' 
                ? 'Celebrando a Diversidade Lusófona'
                : 'Celebrating Lusophone Diversity'
              }
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              {language === 'pt'
                ? 'Unindo portugueses, brasileiros, angolanos, cabo-verdianos, moçambicanos, bissau-guineenses e são-tomenses em todo o Reino Unido'
                : 'Uniting Portuguese, Brazilians, Angolans, Cape Verdeans, Mozambicans, Guinea-Bissauans, and São Toméans across the United Kingdom'
              }
            </p>
            
            <div className="flex justify-center items-center gap-4 text-4xl">
              <span title="Portugal">🇵🇹</span>
              <span title="Brazil">🇧🇷</span>
              <span title="Angola">🇦🇴</span>
              <span title="Cape Verde">🇨🇻</span>
              <span title="Mozambique">🇲🇿</span>
              <span title="Guinea-Bissau">🇬🇼</span>
              <span title="São Tomé and Príncipe">🇸🇹</span>
            </div>
            
            <div className="mt-8 text-sm text-gray-500">
              <p className="mb-2">
                {language === 'pt'
                  ? `${businessStats.averageRating.toFixed(1)}/5 avaliação média • ${businessStats.totalVerified} negócios verificados • ${weekendStats.verifiedOrganizers} organizadores verificados`
                  : `${businessStats.averageRating.toFixed(1)}/5 average rating • ${businessStats.totalVerified} verified businesses • ${weekendStats.verifiedOrganizers} verified organizers`
                }
              </p>
              <p>
                {language === 'pt'
                  ? 'Autenticidade cultural garantida pela comunidade lusófona'
                  : 'Cultural authenticity guaranteed by the Portuguese-speaking community'
                }
              </p>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}