'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { PALOP_COUNTRIES } from '@/config/palop-cultural-events'
import { ArrowRightIcon, MapPinIcon, CalendarDaysIcon, BuildingStorefrontIcon, HeartIcon } from '@heroicons/react/24/outline'
import { ROUTES } from '@/config/routes'

interface PALOPCountryCardsProps {
  className?: string
  variant?: 'grid' | 'horizontal' | 'featured'
  showDescriptions?: boolean
  limit?: number
}

/**
 * PALOP Country Cards with Clear CTAs
 * Fixes the critical UX issue where users didn't know how to explore PALOP countries
 * Each card now has clear action buttons and hover states
 */
export default function PALOPCountryCards({
  className = '',
  variant = 'grid',
  showDescriptions = true,
  limit
}: PALOPCountryCardsProps) {
  const { t, language } = useLanguage()
  const router = useRouter()
  const isPortuguese = language === 'pt'

  const countries = Object.values(PALOP_COUNTRIES).slice(0, limit)

  const getCountryActions = (countryCode: string) => {
    const baseUrl = ROUTES.events
    const businessUrl = ROUTES.businessDirectory
    
    return {
      events: `${baseUrl}?country=${countryCode}`,
      businesses: `${businessUrl}?country=${countryCode}`,
      culture: `${ROUTES.events}?type=cultural&country=${countryCode}`
    }
  }

  const handleCardClick = (countryCode: string, e: React.MouseEvent) => {
    // Don't navigate if clicking on buttons
    if ((e.target as HTMLElement).closest('button, a')) return
    
    const actions = getCountryActions(countryCode)
    router.push(actions.events)
  }

  const containerClasses = {
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    horizontal: 'flex flex-wrap gap-4',
    featured: 'grid grid-cols-1 lg:grid-cols-2 gap-8'
  }

  const cardClasses = {
    grid: 'bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl',
    horizontal: 'bg-white rounded-xl p-4 shadow-md hover:shadow-lg min-w-[280px]',
    featured: 'bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl'
  }

  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 via-yellow-100 to-red-100 px-6 py-3 rounded-full text-primary-700 font-bold text-sm mb-6">
            <MapPinIcon className="w-4 h-4" />
            {isPortuguese ? 'Descubra os Países PALOP' : 'Discover PALOP Countries'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {isPortuguese 
              ? 'Explore a Rica Herança Africana Lusófona'
              : 'Explore Rich African Lusophone Heritage'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {isPortuguese
              ? 'Conecte-se com eventos, negócios e cultura dos Países Africanos de Língua Oficial Portuguesa'
              : 'Connect with events, businesses and culture from Portuguese-speaking African Nations'}
          </p>
        </div>

        {/* Country Cards */}
        <div className={containerClasses[variant]}>
          {countries.map((country, index) => {
            const actions = getCountryActions(country.code)
            
            return (
              <motion.div
                key={country.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onClick={(e) => handleCardClick(country.code, e)}
                className={`${cardClasses[variant]} border-l-4 border-${country.color}-500 
                  cursor-pointer transition-all duration-300 hover:-translate-y-1 group
                  focus:outline-none focus:ring-2 focus:ring-primary-300`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    router.push(actions.events)
                  }
                }}
                aria-label={`Explore ${country.name} events and culture`}
              >
                
                {/* Country Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{country.flag}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                        {country.name}
                      </h3>
                      <p className="text-sm text-gray-600 font-medium">
                        {isPortuguese ? country.namePortuguese : country.name}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover indicator */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRightIcon className="w-5 h-5 text-primary-600" />
                  </div>
                </div>

                {/* Country Description */}
                {showDescriptions && (
                  <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {country.description}
                    </p>
                    
                    {/* Cultural highlights */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {country.culturalHighlights?.slice(0, 3).map((highlight, i) => (
                        <span
                          key={i}
                          className={`text-xs px-2 py-1 rounded-full bg-${country.color}-100 text-${country.color}-700`}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons - CLEAR CTAS */}
                <div className="space-y-3">
                  
                  {/* Primary CTA - Events with Pulsing Animation */}
                  <a
                    href={actions.events}
                    onClick={(e) => e.stopPropagation()}
                    className={`group/btn w-full flex items-center justify-center gap-2 
                      bg-gradient-to-r from-${country.color}-500 to-${country.color}-600 
                      text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300
                      hover:from-${country.color}-600 hover:to-${country.color}-700 
                      hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-105
                      animate-pulse hover:animate-none focus:animate-none
                      ring-2 ring-${country.color}-500/30 hover:ring-${country.color}-500/60`}
                  >
                    <CalendarDaysIcon className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    <span>
                      {isPortuguese 
                        ? `Explorar Eventos de ${country.namePortuguese}`
                        : `Explore ${country.name} Events`}
                    </span>
                    <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:scale-110 transition-transform" />
                  </a>

                  {/* Secondary CTAs */}
                  <div className="grid grid-cols-2 gap-2">
                    
                    {/* Businesses CTA */}
                    <a
                      href={actions.businesses}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 
                        text-gray-700 py-2 px-3 rounded-lg font-medium transition-colors text-sm"
                    >
                      <BuildingStorefrontIcon className="w-4 h-4" />
                      <span>
                        {isPortuguese ? 'Negócios' : 'Businesses'}
                      </span>
                    </a>

                    {/* Culture CTA */}
                    <a
                      href={actions.culture}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center gap-2 bg-primary-50 hover:bg-primary-100 
                        text-primary-700 py-2 px-3 rounded-lg font-medium transition-colors text-sm"
                    >
                      <HeartIcon className="w-4 h-4" />
                      <span>
                        {isPortuguese ? 'Cultura' : 'Culture'}
                      </span>
                    </a>
                  </div>
                </div>

                {/* Pulsing animation and hover message overlay */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-${country.color}-500/0 
                  to-${country.color}-500/0 group-hover:from-${country.color}-500/5 
                  group-hover:to-${country.color}-500/10 transition-all duration-300 pointer-events-none`} />
                
                {/* Hover message indicator */}
                <div className="absolute inset-x-0 top-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border border-gray-200">
                    <span className="text-xs font-medium text-gray-700 flex items-center gap-1">
                      👆 {isPortuguese ? 'Clique para explorar' : 'Click to explore'}
                    </span>
                  </div>
                </div>
                
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-50 to-secondary-50 
            px-6 py-3 rounded-2xl border border-primary-200">
            <span className="text-primary-700 font-medium">
              {isPortuguese 
                ? 'Não encontra o que procura?'
                : 'Can\'t find what you\'re looking for?'}
            </span>
            <a
              href={ROUTES.events}
              className="text-primary-600 hover:text-primary-700 font-semibold underline 
                underline-offset-2 hover:underline-offset-4 transition-all"
            >
              {isPortuguese ? 'Ver todos os eventos' : 'View all events'}
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

/**
 * Individual PALOP Country Card with CTA
 * Can be used standalone
 */
export function PALOPCountryCard({ 
  country, 
  showFullDescription = false 
}: { 
  country: typeof PALOP_COUNTRIES[keyof typeof PALOP_COUNTRIES]
  showFullDescription?: boolean 
}) {
  const { language } = useLanguage()
  const router = useRouter()
  const isPortuguese = language === 'pt'

  const actions = {
    events: `${ROUTES.events}?country=${country.code}`,
    businesses: `${ROUTES.businessDirectory}?country=${country.code}`,
    culture: `${ROUTES.events}?type=cultural&country=${country.code}`
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 
      border-l-4 border-orange-500 group cursor-pointer"
      onClick={() => router.push(actions.events)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-xl">{country.flag}</div>
          <h3 className="font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
            {country.name}
          </h3>
        </div>
        <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
      </div>

      <p className="text-gray-600 text-sm mb-4">
        {showFullDescription ? country.description : `${country.description.slice(0, 100)}...`}
      </p>

      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation()
            router.push(actions.events)
          }}
          className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-lg font-medium 
            hover:bg-primary-600 transition-colors text-sm"
        >
          {isPortuguese ? 'Ver Eventos' : 'View Events'} →
        </button>
      </div>
    </div>
  )
}