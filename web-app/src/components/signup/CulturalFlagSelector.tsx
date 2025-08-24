/**
 * Cultural Flag Selector Component
 * Portuguese-speaking countries with regions and cultural backgrounds
 */

"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { PortugueseOriginWithRegions, PortugueseCountry, PORTUGUESE_REGIONS } from '@/types/enhanced-signup'

interface CulturalFlagSelectorProps {
  value: PortugueseOriginWithRegions
  onChange: (value: PortugueseOriginWithRegions) => void
  showRegions?: boolean
  showCulturalBackground?: boolean
  className?: string
}

const PORTUGUESE_COUNTRIES = [
  { 
    code: 'portugal' as PortugueseCountry, 
    name: 'Portugal', 
    flag: '🇵🇹',
    description: 'Continental Portugal, Açores, Madeira'
  },
  { 
    code: 'brazil' as PortugueseCountry, 
    name: 'Brasil', 
    flag: '🇧🇷',
    description: 'All Brazilian states and regions'
  },
  { 
    code: 'angola' as PortugueseCountry, 
    name: 'Angola', 
    flag: '🇦🇴',
    description: 'Angolan provinces and cultural regions'
  },
  { 
    code: 'mozambique' as PortugueseCountry, 
    name: 'Moçambique', 
    flag: '🇲🇿',
    description: 'Mozambican provinces'
  },
  { 
    code: 'cape-verde' as PortugueseCountry, 
    name: 'Cabo Verde', 
    flag: '🇨🇻',
    description: 'Cape Verdean islands'
  },
  { 
    code: 'guinea-bissau' as PortugueseCountry, 
    name: 'Guiné-Bissau', 
    flag: '🇬🇼',
    description: 'Guinea-Bissau regions'
  },
  { 
    code: 'sao-tome' as PortugueseCountry, 
    name: 'São Tomé e Príncipe', 
    flag: '🇸🇹',
    description: 'São Tomé and Príncipe islands'
  },
  { 
    code: 'east-timor' as PortugueseCountry, 
    name: 'Timor-Leste', 
    flag: '🇹🇱',
    description: 'East Timor districts'
  },
  { 
    code: 'macau' as PortugueseCountry, 
    name: 'Macau', 
    flag: '🇲🇴',
    description: 'Macau SAR'
  },
  { 
    code: 'equatorial-guinea' as PortugueseCountry, 
    name: 'Guiné Equatorial', 
    flag: '🇬🇶',
    description: 'Portuguese-speaking regions'
  },
  { 
    code: 'uk-heritage' as PortugueseCountry, 
    name: 'UK-Born Portuguese Heritage', 
    flag: '🇬🇧',
    description: 'Born in UK with Portuguese family heritage'
  }
]

const CULTURAL_BACKGROUNDS = [
  'Portuguese traditions', 'Brazilian culture', 'Angolan heritage', 
  'Mozambican culture', 'Cape Verdean traditions', 'Guinea-Bissau culture',
  'São Tomé culture', 'Timorese heritage', 'Macanese culture',
  'Portuguese diaspora', 'Mixed heritage', 'Second generation',
  'Third generation', 'Recent immigrant', 'Long-established family'
]

export default function CulturalFlagSelector({
  value,
  onChange,
  showRegions = true,
  showCulturalBackground = false,
  className = ""
}: CulturalFlagSelectorProps) {
  const { t } = useLanguage()

  const handleCountryChange = (country: PortugueseCountry) => {
    onChange({
      country,
      region: value.region,
      culturalBackground: value.culturalBackground
    })
  }

  const handleRegionChange = (region: string) => {
    onChange({
      ...value,
      region: region || undefined
    })
  }

  const handleCulturalBackgroundToggle = (background: string) => {
    const currentBackgrounds = value.culturalBackground || []
    const isSelected = currentBackgrounds.includes(background)
    
    const newBackgrounds = isSelected
      ? currentBackgrounds.filter(bg => bg !== background)
      : [...currentBackgrounds, background]
    
    onChange({
      ...value,
      culturalBackground: newBackgrounds.length > 0 ? newBackgrounds : undefined
    })
  }

  const availableRegions = value.country && PORTUGUESE_REGIONS[value.country] 
    ? PORTUGUESE_REGIONS[value.country] 
    : []

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Country Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('signup.portuguese-origin', 'Portuguese Origin')}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PORTUGUESE_COUNTRIES.map((country, index) => (
            <motion.button
              key={country.code}
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleCountryChange(country.code)}
              className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                value.country === country.code
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{country.flag}</span>
                <span className="font-semibold text-gray-900">{country.name}</span>
              </div>
              <p className="text-xs text-gray-600">{country.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Region Selection */}
      {showRegions && value.country && availableRegions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('signup.select-region', 'Select Region (Optional)')}
          </label>
          <select
            value={value.region || ''}
            onChange={(e) => handleRegionChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white"
          >
            <option value="">
              {t('signup.select-region-placeholder', 'Select your region...')}
            </option>
            {availableRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </motion.div>
      )}

      {/* Cultural Background Selection */}
      {showCulturalBackground && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('signup.cultural-background', 'Cultural Background (Select all that apply)')}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CULTURAL_BACKGROUNDS.map((background) => (
              <button
                key={background}
                type="button"
                onClick={() => handleCulturalBackgroundToggle(background)}
                className={`p-2 rounded-lg text-sm transition-all ${
                  value.culturalBackground?.includes(background)
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {background}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Cultural Context Display */}
      {value.country && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-xl border border-primary-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">
              {PORTUGUESE_COUNTRIES.find(c => c.code === value.country)?.flag}
            </span>
            <h4 className="font-semibold text-gray-900">
              {t('signup.cultural-connection', 'Your Cultural Connection')}
            </h4>
          </div>
          <p className="text-sm text-gray-700">
            {t('signup.cultural-community', 
              `You'll connect with others from ${PORTUGUESE_COUNTRIES.find(c => c.code === value.country)?.name} and the broader Portuguese-speaking community in the UK.`
            )}
          </p>
          {value.region && (
            <p className="text-xs text-gray-600 mt-2">
              {t('signup.regional-connection', `Specifically connecting with others from ${value.region}`)}
            </p>
          )}
          {value.culturalBackground && value.culturalBackground.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-gray-600 mb-1">
                {t('signup.cultural-elements', 'Cultural elements:')}
              </p>
              <div className="flex flex-wrap gap-1">
                {value.culturalBackground.map((bg) => (
                  <span 
                    key={bg}
                    className="px-2 py-1 text-xs bg-white/60 rounded-full text-gray-600"
                  >
                    {bg}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}