'use client'

import React, { useState } from 'react'
import { ChevronDownIcon, CheckIcon, MusicalNoteIcon, HeartIcon, BookOpenIcon, SparklesIcon } from '@heroicons/react/24/outline'

export interface CulturalInterest {
  value: string
  label: string
  icon: string
  category: 'music' | 'celebration' | 'literature' | 'heritage' | 'community'
  description: string
  origin: string
}

export const CULTURAL_INTERESTS: CulturalInterest[] = [
  // Portuguese Music & Arts
  {
    value: 'fado',
    label: 'Fado (Portuguese traditional)',
    icon: '🎤',
    category: 'music',
    description: 'Traditional Portuguese melancholic music',
    origin: 'Portugal'
  },
  {
    value: 'samba_brazilian',
    label: 'Samba & Brazilian music',
    icon: '🎵',
    category: 'music', 
    description: 'Brazilian rhythmic music and dance',
    origin: 'Brazil'
  },
  {
    value: 'kizomba_semba',
    label: 'Kizomba & Semba (Angolan)',
    icon: '💃',
    category: 'music',
    description: 'Angolan partner dance and music styles',
    origin: 'Angola'
  },
  {
    value: 'morna_coladeira',
    label: 'Morna & Coladeira (Cape Verdean)',
    icon: '🌊',
    category: 'music',
    description: 'Cape Verdean traditional and popular music',
    origin: 'Cape Verde'
  },
  {
    value: 'marrabenta',
    label: 'Marrabenta (Mozambican)',
    icon: '🥁',
    category: 'music',
    description: 'Mozambican popular music genre',
    origin: 'Mozambique'
  },

  // Cultural Celebrations
  {
    value: 'palop_independence',
    label: 'PALOP independence celebrations',
    icon: '🎆',
    category: 'celebration',
    description: 'African Portuguese-speaking countries independence days',
    origin: 'PALOP Nations'
  },
  {
    value: 'brazilian_carnival',
    label: 'Brazilian Carnival culture',
    icon: '🎭',
    category: 'celebration',
    description: 'Brazilian carnival traditions and festivities',
    origin: 'Brazil'
  },
  {
    value: 'santos_populares',
    label: 'Santos Populares (Portuguese June festivals)',
    icon: '🔥',
    category: 'celebration', 
    description: 'Traditional Portuguese popular saints festivals',
    origin: 'Portugal'
  },
  {
    value: 'christmas_traditions',
    label: 'Portuguese Christmas traditions',
    icon: '🎄',
    category: 'celebration',
    description: 'Portuguese holiday customs and celebrations',
    origin: 'Portugal'
  },
  {
    value: 'lusophone_celebrations',
    label: 'All Lusophone cultural celebrations',
    icon: '🌍',
    category: 'celebration',
    description: 'Celebrations across all Portuguese-speaking nations',
    origin: 'Global Lusophone'
  },

  // Literature & Arts
  {
    value: 'portuguese_literature',
    label: 'Portuguese literature and poetry',
    icon: '📚',
    category: 'literature',
    description: 'Classical and contemporary Portuguese writing',
    origin: 'Portugal'
  },
  {
    value: 'brazilian_literature',
    label: 'Brazilian literature and arts',
    icon: '✍️',
    category: 'literature',
    description: 'Brazilian literary tradition and contemporary arts',
    origin: 'Brazil'
  },
  {
    value: 'african_portuguese_literature',
    label: 'African Portuguese literature',
    icon: '📖',
    category: 'literature',
    description: 'Literature from PALOP countries in Portuguese',
    origin: 'PALOP Nations'
  },

  // Heritage & Traditions
  {
    value: 'portuguese_cuisine',
    label: 'Portuguese traditional cuisine',
    icon: '🍽️',
    category: 'heritage',
    description: 'Traditional Portuguese cooking and food culture',
    origin: 'Portugal'
  },
  {
    value: 'brazilian_cuisine',
    label: 'Brazilian cuisine and culture',
    icon: '🌶️',
    category: 'heritage',
    description: 'Brazilian culinary traditions and culture',
    origin: 'Brazil'
  },
  {
    value: 'palop_traditions',
    label: 'PALOP cultural traditions',
    icon: '🏺',
    category: 'heritage',
    description: 'Cultural traditions from African Portuguese-speaking countries',
    origin: 'PALOP Nations'
  },
  {
    value: 'azorean_madeiran',
    label: 'Azorean & Madeiran heritage',
    icon: '🏝️',
    category: 'heritage',
    description: 'Portuguese island cultural heritage',
    origin: 'Portuguese Islands'
  },

  // Community & Language
  {
    value: 'language_preservation',
    label: 'Portuguese language preservation',
    icon: '🗣️',
    category: 'community',
    description: 'Maintaining Portuguese language in diaspora',
    origin: 'Global Community'
  },
  {
    value: 'second_generation_support',
    label: 'Second-generation community support',
    icon: '👥',
    category: 'community',
    description: 'Supporting Portuguese heritage youth in UK',
    origin: 'UK Community'
  },
  {
    value: 'cross_cultural_lusophone',
    label: 'Cross-cultural Lusophone experiences',
    icon: '🤝',
    category: 'community',
    description: 'Connecting different Portuguese-speaking cultures',
    origin: 'Global Lusophone'
  },
  {
    value: 'business_networking',
    label: 'Portuguese business networking',
    icon: '💼',
    category: 'community',
    description: 'Professional networking in Portuguese community',
    origin: 'UK Business Community'
  }
]

interface CulturalInterestsPickerProps {
  selectedInterests: string[]
  onInterestsChange: (interests: string[]) => void
  maxSelection?: number
  required?: boolean
  error?: string
}

export function CulturalInterestsPicker({
  selectedInterests,
  onInterestsChange,
  maxSelection = 10,
  required = false,
  error
}: CulturalInterestsPickerProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = [
    { key: 'music', label: 'Music & Dance', icon: '🎵' },
    { key: 'celebration', label: 'Celebrations', icon: '🎉' },
    { key: 'literature', label: 'Literature & Arts', icon: '📚' },
    { key: 'heritage', label: 'Heritage & Cuisine', icon: '🏛️' },
    { key: 'community', label: 'Community & Language', icon: '👥' }
  ]

  const handleInterestToggle = (value: string) => {
    const isSelected = selectedInterests.includes(value)
    
    if (isSelected) {
      onInterestsChange(selectedInterests.filter(interest => interest !== value))
    } else if (selectedInterests.length < maxSelection) {
      onInterestsChange([...selectedInterests, value])
    }
  }

  const getInterestsByCategory = (category: string) => {
    return CULTURAL_INTERESTS.filter(interest => interest.category === category)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-primary-700 mb-2">
          Your Cultural Interests {required && <span className="text-red-500">*</span>}
        </label>
        <p className="text-sm text-gray-600 mb-4">
          Select up to {maxSelection} cultural interests that resonate with you. 
          ({selectedInterests.length}/{maxSelection} selected)
        </p>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Cultural categories">
          {categories.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => setActiveCategory(activeCategory === category.key ? null : category.key)}
              className={`
                whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeCategory === category.key
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </nav>
      </div>

      {/* All Interests Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CULTURAL_INTERESTS
          .filter(interest => !activeCategory || interest.category === activeCategory)
          .map((interest) => {
            const isSelected = selectedInterests.includes(interest.value)
            const canSelect = isSelected || selectedInterests.length < maxSelection

            return (
              <button
                key={interest.value}
                type="button"
                onClick={() => handleInterestToggle(interest.value)}
                disabled={!canSelect}
                className={`
                  relative p-4 rounded-lg border-2 text-left transition-all duration-200 min-h-[120px]
                  ${isSelected
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : canSelect
                      ? 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-25 text-gray-900'
                      : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                  }
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                  disabled:cursor-not-allowed
                `}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xl">{interest.icon}</span>
                      <span className="font-medium text-sm leading-tight">
                        {interest.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      {interest.description}
                    </p>
                    <div className="text-xs text-primary-600 font-medium">
                      {interest.origin}
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <CheckIcon className="h-5 w-5 text-primary-600" />
                    </div>
                  )}
                </div>
              </button>
            )
          })}
      </div>

      {/* Selected Interests Summary */}
      {selectedInterests.length > 0 && (
        <div className="bg-primary-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-primary-900 mb-3">
            Your Selected Cultural Interests ({selectedInterests.length}):
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedInterests.map(value => {
              const interest = CULTURAL_INTERESTS.find(int => int.value === value)
              return interest ? (
                <span
                  key={value}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-primary-700 border border-primary-200"
                >
                  <span className="mr-1">{interest.icon}</span>
                  {interest.label}
                  <button
                    type="button"
                    onClick={() => handleInterestToggle(value)}
                    className="ml-2 text-primary-500 hover:text-primary-700 focus:outline-none"
                    aria-label={`Remove ${interest.label}`}
                  >
                    ×
                  </button>
                </span>
              ) : null
            })}
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}