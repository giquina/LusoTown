/**
 * Enhanced UK Location Selector
 * Shows Portuguese community density and cultural events for each location
 */

"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { UKLocationExpanded, UK_LOCATIONS_WITH_COMMUNITY } from '@/types/enhanced-signup'
import { 
  MapPinIcon, 
  UsersIcon, 
  CalendarIcon,
  ChevronDownIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

interface UKLocationSelectorProps {
  value: UKLocationExpanded | ''
  onChange: (location: UKLocationExpanded | '') => void
  showCommunitySize?: boolean
  showCulturalEvents?: boolean
  className?: string
}

const ADDITIONAL_LOCATIONS = [
  { location: 'Oxford', communitySize: 'small', culturalEvents: 'university-based' },
  { location: 'Cambridge', communitySize: 'small', culturalEvents: 'university-based' },
  { location: 'Brighton', communitySize: 'medium', culturalEvents: 'monthly' },
  { location: 'Portsmouth', communitySize: 'small', culturalEvents: 'occasional' },
  { location: 'Southampton', communitySize: 'small', culturalEvents: 'occasional' },
  { location: 'Newcastle', communitySize: 'small', culturalEvents: 'seasonal' },
  { location: 'Sheffield', communitySize: 'small', culturalEvents: 'occasional' },
  { location: 'Nottingham', communitySize: 'small', culturalEvents: 'occasional' },
  { location: 'Leicester', communitySize: 'small', culturalEvents: 'rare' },
  { location: 'Coventry', communitySize: 'small', culturalEvents: 'rare' }
] as const

const ALL_LOCATIONS = [...UK_LOCATIONS_WITH_COMMUNITY, ...ADDITIONAL_LOCATIONS]

const getCommunityIcon = (size: string) => {
  switch (size) {
    case 'large': return '🏛️'
    case 'medium': return '🏘️'
    case 'small': return '🏠'
    default: return '📍'
  }
}

const getCommunityLabel = (size: string, language: string) => {
  const labels = {
    large: language === 'pt' ? 'Grande comunidade' : 'Large community',
    medium: language === 'pt' ? 'Comunidade média' : 'Medium community', 
    small: language === 'pt' ? 'Pequena comunidade' : 'Small community'
  }
  return labels[size as keyof typeof labels] || size
}

const getEventsLabel = (events: string, language: string) => {
  const labels = {
    weekly: language === 'pt' ? 'Eventos semanais' : 'Weekly events',
    monthly: language === 'pt' ? 'Eventos mensais' : 'Monthly events',
    occasional: language === 'pt' ? 'Eventos ocasionais' : 'Occasional events',
    seasonal: language === 'pt' ? 'Eventos sazonais' : 'Seasonal events',
    'university-based': language === 'pt' ? 'Eventos universitários' : 'University events',
    rare: language === 'pt' ? 'Eventos raros' : 'Rare events'
  }
  return labels[events as keyof typeof labels] || events
}

export default function UKLocationSelector({
  value,
  onChange,
  showCommunitySize = true,
  showCulturalEvents = true,
  className = ""
}: UKLocationSelectorProps) {
  const { t, language } = useLanguage()
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const selectedLocation = ALL_LOCATIONS.find(loc => loc.location === value)
  
  const filteredLocations = searchTerm
    ? ALL_LOCATIONS.filter(loc => 
        loc.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : ALL_LOCATIONS

  const handleLocationSelect = (location: string) => {
    onChange(location as UKLocationExpanded)
    setIsExpanded(false)
    setSearchTerm('')
  }

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {t('signup.uk-location', 'UK Location')}
      </label>
      
      {/* Location Selector */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-left focus:ring-2 focus:ring-primary-400 focus:border-transparent flex items-center justify-between hover:border-gray-400 transition-colors"
        >
          <div className="flex items-center gap-3">
            <MapPinIcon className="h-5 w-5 text-gray-400" />
            <span className={value ? 'text-gray-900' : 'text-gray-500'}>
              {value || t('signup.select-location', 'Select your location...')}
            </span>
          </div>
          <ChevronDownIcon 
            className={`h-5 w-5 text-gray-400 transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`} 
          />
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 z-50 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl max-h-80 overflow-hidden"
            >
              {/* Search Input */}
              <div className="p-3 border-b border-gray-200">
                <input
                  type="text"
                  placeholder={t('signup.search-location', 'Search locations...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                />
              </div>

              {/* Location List */}
              <div className="max-h-60 overflow-y-auto">
                {filteredLocations.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    {t('signup.no-locations-found', 'No locations found')}
                  </div>
                ) : (
                  filteredLocations.map((location, index) => (
                    <motion.button
                      key={location.location}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.02 }}
                      type="button"
                      onClick={() => handleLocationSelect(location.location)}
                      className="w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">
                            {getCommunityIcon(location.communitySize)}
                          </span>
                          <span className="font-medium text-gray-900">
                            {location.location}
                          </span>
                        </div>
                        {location.location === 'London' && (
                          <span className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full font-medium">
                            {language === 'pt' ? 'Principal' : 'Main Hub'}
                          </span>
                        )}
                      </div>
                      
                      {(showCommunitySize || showCulturalEvents) && (
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          {showCommunitySize && (
                            <div className="flex items-center gap-1">
                              <UsersIcon className="h-3 w-3" />
                              <span>{getCommunityLabel(location.communitySize, language)}</span>
                            </div>
                          )}
                          {showCulturalEvents && (
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-3 w-3" />
                              <span>{getEventsLabel(location.culturalEvents, language)}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.button>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected Location Details */}
      {selectedLocation && (showCommunitySize || showCulturalEvents) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-3 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border border-primary-200"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{getCommunityIcon(selectedLocation.communitySize)}</span>
            <h4 className="font-semibold text-gray-900">
              {selectedLocation.location} {language === 'pt' ? 'Comunidade' : 'Community'}
            </h4>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {showCommunitySize && (
              <div className="flex items-center gap-2 text-sm">
                <UsersIcon className="h-4 w-4 text-primary-500" />
                <span className="text-gray-700">
                  {getCommunityLabel(selectedLocation.communitySize, language)}
                </span>
              </div>
            )}
            
            {showCulturalEvents && (
              <div className="flex items-center gap-2 text-sm">
                <CalendarIcon className="h-4 w-4 text-primary-500" />
                <span className="text-gray-700">
                  {getEventsLabel(selectedLocation.culturalEvents, language)}
                </span>
              </div>
            )}
          </div>

          {/* Special notes for major locations */}
          {selectedLocation.location === 'London' && (
            <div className="mt-3 p-3 bg-primary-100 rounded-md">
              <div className="flex items-start gap-2">
                <InformationCircleIcon className="h-4 w-4 text-primary-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-primary-800">
                  <p className="font-medium mb-1">
                    {language === 'pt' ? 'Centro Principal' : 'Main Hub'}
                  </p>
                  <p>
                    {language === 'pt'
                      ? 'Londres tem a maior comunidade portuguesa no Reino Unido com eventos regulares em Stockwell, Vauxhall e outras áreas portuguesas.'
                      : 'London has the largest Portuguese community in the UK with regular events in Stockwell, Vauxhall, and other Portuguese areas.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {(selectedLocation.location === 'Manchester' || selectedLocation.location === 'Birmingham') && (
            <div className="mt-3 p-3 bg-secondary-100 rounded-md">
              <div className="flex items-start gap-2">
                <InformationCircleIcon className="h-4 w-4 text-secondary-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-secondary-800">
                  <p>
                    {language === 'pt'
                      ? 'Comunidade portuguesa crescente com eventos mensais e oportunidades de networking.'
                      : 'Growing Portuguese community with monthly events and networking opportunities.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Community Growth Indicator */}
      <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
        <span>📈</span>
        <span>
          {language === 'pt' 
            ? 'A comunidade portuguesa está crescendo em todo o Reino Unido'
            : 'Portuguese community is growing across the UK'}
        </span>
      </div>
    </div>
  )
}