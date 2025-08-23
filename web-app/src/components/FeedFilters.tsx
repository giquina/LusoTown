'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FunnelIcon,
  MapPinIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  TagIcon,
  ClockIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

export interface FeedFilters {
  eventType: string[]
  location: string[]
  dateRange: 'all' | 'today' | 'this_week' | 'this_month' | 'upcoming'
  priceRange: 'all' | 'free' | 'under_25' | 'under_50' | 'premium'
  spotsAvailable: boolean
  culturalTags: string[]
  followingOnly: boolean
}

interface FeedFiltersProps {
  filters: FeedFilters
  onFiltersChange: (filters: FeedFilters) => void
  className?: string
  isOpen?: boolean
  onToggle?: () => void
}

const defaultFilters: FeedFilters = {
  eventType: [],
  location: [],
  dateRange: 'all',
  priceRange: 'all',
  spotsAvailable: false,
  culturalTags: [],
  followingOnly: false
}

export default function FeedFilters({ 
  filters, 
  onFiltersChange, 
  className = '',
  isOpen = false,
  onToggle
}: FeedFiltersProps) {
  const { language } = useLanguage()
  const [localFilters, setLocalFilters] = useState<FeedFilters>(filters)
  
  const isPortuguese = language === 'pt'

  // Event types available
  const eventTypes = [
    { key: 'music', label: isPortuguese ? 'Música & Fado' : 'Music & Fado' },
    { key: 'food', label: isPortuguese ? 'Culinária' : 'Food & Dining' },
    { key: 'sports', label: isPortuguese ? 'Desporto' : 'Sports' },
    { key: 'business', label: isPortuguese ? 'Negócios' : 'Business' },
    { key: 'language', label: isPortuguese ? 'Intercâmbio Linguístico' : 'Language Exchange' },
    { key: 'cultural', label: isPortuguese ? 'Eventos Culturais' : 'Cultural Events' },
    { key: 'social', label: isPortuguese ? 'Social & Festa' : 'Social & Party' },
    { key: 'family', label: isPortuguese ? 'Família' : 'Family' }
  ]

  // London areas popular with Portuguese-speaking community
  const locations = [
    { key: 'stockwell', label: 'Stockwell' },
    { key: 'elephant_castle', label: 'Elephant & Castle' },
    { key: 'vauxhall', label: 'Vauxhall' },
    { key: 'south_lambeth', label: 'South Lambeth' },
    { key: 'brixton', label: 'Brixton' },
    { key: 'clapham', label: 'Clapham' },
    { key: 'battersea', label: 'Battersea' },
    { key: 'central_london', label: 'Central London' },
    { key: 'east_london', label: 'East London' },
    { key: 'north_london', label: 'North London' },
    { key: 'west_london', label: 'West London' }
  ]

  // Cultural tags
  const culturalTags = [
    { key: 'portugal', label: 'Portugal 🇵🇹' },
    { key: 'brazil', label: 'Brasil 🇧🇷' },
    { key: 'angola', label: 'Angola 🇦🇴' },
    { key: 'mozambique', label: 'Moçambique 🇲🇿' },
    { key: 'cape_verde', label: 'Cabo Verde 🇨🇻' },
    { key: 'fado', label: 'Fado' },
    { key: 'football', label: isPortuguese ? 'Futebol' : 'Football' },
    { key: 'traditional', label: isPortuguese ? 'Tradicional' : 'Traditional' },
    { key: 'modern', label: isPortuguese ? 'Moderno' : 'Modern' },
    { key: 'professional_networking', label: isPortuguese ? 'Profissional' : 'Professional' }
  ]

  const dateRanges = [
    { key: 'all', label: isPortuguese ? 'Todas as datas' : 'All dates' },
    { key: 'today', label: isPortuguese ? 'Hoje' : 'Today' },
    { key: 'this_week', label: isPortuguese ? 'Esta semana' : 'This week' },
    { key: 'this_month', label: isPortuguese ? 'Este mês' : 'This month' },
    { key: 'upcoming', label: isPortuguese ? 'Próximos' : 'Upcoming' }
  ]

  const priceRanges = [
    { key: 'all', label: isPortuguese ? 'Todos os preços' : 'All prices' },
    { key: 'free', label: isPortuguese ? 'Grátis' : 'Free' },
    { key: 'under_25', label: isPortuguese ? 'Até £25' : 'Under £25' },
    { key: 'under_50', label: isPortuguese ? 'Até £50' : 'Under £50' },
    { key: 'premium', label: '£50+' }
  ]

  const updateFilter = <K extends keyof FeedFilters>(
    key: K, 
    value: FeedFilters[K]
  ) => {
    const updatedFilters = { ...localFilters, [key]: value }
    setLocalFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const toggleArrayFilter = (
    filterKey: 'eventType' | 'location' | 'culturalTags',
    value: string
  ) => {
    const currentArray = localFilters[filterKey]
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    
    updateFilter(filterKey, newArray)
  }

  const clearAllFilters = () => {
    setLocalFilters(defaultFilters)
    onFiltersChange(defaultFilters)
  }

  const hasActiveFilters = () => {
    return (
      localFilters.eventType.length > 0 ||
      localFilters.location.length > 0 ||
      localFilters.dateRange !== 'all' ||
      localFilters.priceRange !== 'all' ||
      localFilters.spotsAvailable ||
      localFilters.culturalTags.length > 0 ||
      localFilters.followingOnly
    )
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (localFilters.eventType.length > 0) count += localFilters.eventType.length
    if (localFilters.location.length > 0) count += localFilters.location.length
    if (localFilters.dateRange !== 'all') count += 1
    if (localFilters.priceRange !== 'all') count += 1
    if (localFilters.spotsAvailable) count += 1
    if (localFilters.culturalTags.length > 0) count += localFilters.culturalTags.length
    if (localFilters.followingOnly) count += 1
    return count
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-white rounded-2xl shadow-lg border border-gray-200 p-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <AdjustmentsHorizontalIcon className="w-6 h-6 text-primary-500" />
          <h3 className="text-xl font-bold text-gray-900">
            {isPortuguese ? 'Filtros Avançados' : 'Advanced Filters'}
          </h3>
          {hasActiveFilters() && (
            <span className="bg-primary-100 text-primary-700 text-sm px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {hasActiveFilters() && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-500 hover:text-gray-700 underline p-2 min-h-[44px] flex items-center"
            >
              {isPortuguese ? 'Limpar tudo' : 'Clear all'}
            </button>
          )}
          {onToggle && (
            <button
              onClick={onToggle}
              className="text-gray-400 hover:text-gray-600 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Type */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TagIcon className="w-5 h-5 text-gray-500" />
            <h4 className="font-semibold text-gray-900">
              {isPortuguese ? 'Tipo de Evento' : 'Event Type'}
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {eventTypes.map((type) => (
              <button
                key={type.key}
                onClick={() => toggleArrayFilter('eventType', type.key)}
                className={`px-3 py-2 text-sm rounded-full border transition-colors whitespace-nowrap min-h-[36px] ${
                  localFilters.eventType.includes(type.key)
                    ? 'bg-primary-100 text-primary-700 border-primary-300'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <span className="break-keep">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPinIcon className="w-5 h-5 text-gray-500" />
            <h4 className="font-semibold text-gray-900">
              {isPortuguese ? 'Localização' : 'Location'}
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {locations.map((location) => (
              <button
                key={location.key}
                onClick={() => toggleArrayFilter('location', location.key)}
                className={`px-3 py-2 text-sm rounded-full border transition-colors whitespace-nowrap min-h-[36px] ${
                  localFilters.location.includes(location.key)
                    ? 'bg-secondary-100 text-secondary-700 border-secondary-300'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <span className="break-keep">{location.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CalendarDaysIcon className="w-5 h-5 text-gray-500" />
            <h4 className="font-semibold text-gray-900">
              {isPortuguese ? 'Data' : 'Date'}
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {dateRanges.map((range) => (
              <button
                key={range.key}
                onClick={() => updateFilter('dateRange', range.key as FeedFilters['dateRange'])}
                className={`px-3 py-2 text-sm rounded-full border transition-colors min-h-[36px] ${
                  localFilters.dateRange === range.key
                    ? 'bg-accent-100 text-accent-700 border-accent-300'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-5 text-gray-500 text-sm font-bold">£</span>
            <h4 className="font-semibold text-gray-900">
              {isPortuguese ? 'Preço' : 'Price'}
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {priceRanges.map((range) => (
              <button
                key={range.key}
                onClick={() => updateFilter('priceRange', range.key as FeedFilters['priceRange'])}
                className={`px-3 py-2 text-sm rounded-full border transition-colors min-h-[36px] ${
                  localFilters.priceRange === range.key
                    ? 'bg-premium-100 text-premium-700 border-premium-300'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cultural Tags */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🇵🇹</span>
          <h4 className="font-semibold text-gray-900">
            {isPortuguese ? 'Cultura & Origem' : 'Culture & Origin'}
          </h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {culturalTags.map((tag) => (
            <button
              key={tag.key}
              onClick={() => toggleArrayFilter('culturalTags', tag.key)}
              className={`px-3 py-2 text-sm rounded-full border transition-colors whitespace-nowrap min-h-[36px] ${
                localFilters.culturalTags.includes(tag.key)
                  ? 'bg-coral-100 text-coral-700 border-coral-300'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <span className="break-keep">{tag.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Additional Options */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">
          {isPortuguese ? 'Opções Adicionais' : 'Additional Options'}
        </h4>
        
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={localFilters.spotsAvailable}
              onChange={(e) => updateFilter('spotsAvailable', e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-gray-700">
              {isPortuguese ? 'Apenas eventos com vagas disponíveis' : 'Only events with spots available'}
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={localFilters.followingOnly}
              onChange={(e) => updateFilter('followingOnly', e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-gray-700">
              {isPortuguese ? 'Apenas de pessoas que sigo' : 'Only from people I follow'}
            </span>
          </label>
        </div>
      </div>
    </motion.div>
  )
}