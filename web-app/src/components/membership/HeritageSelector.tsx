'use client'

import React, { useState } from 'react'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline'

export interface HeritageOption {
  value: string
  label: string
  flag: string
  description?: string
}

export const HERITAGE_OPTIONS: HeritageOption[] = [
  {
    value: 'portugal_continental',
    label: 'Portugal (Continental)',
    flag: '🇵🇹',
    description: 'Mainland Portugal heritage'
  },
  {
    value: 'portugal_azores',
    label: 'Portugal (Azores)',
    flag: '🇵🇹',
    description: 'Azorean island heritage'
  },
  {
    value: 'portugal_madeira',
    label: 'Portugal (Madeira)',
    flag: '🇵🇹', 
    description: 'Madeiran island heritage'
  },
  {
    value: 'brazil',
    label: 'Brazil (All regions)',
    flag: '🇧🇷',
    description: 'Brazilian heritage from any region'
  },
  {
    value: 'angola',
    label: 'Angola',
    flag: '🇦🇴',
    description: 'Angolan heritage'
  },
  {
    value: 'cape_verde',
    label: 'Cape Verde',
    flag: '🇨🇻',
    description: 'Cape Verdean heritage'
  },
  {
    value: 'mozambique',
    label: 'Mozambique',
    flag: '🇲🇿',
    description: 'Mozambican heritage'
  },
  {
    value: 'guinea_bissau',
    label: 'Guinea-Bissau',
    flag: '🇬🇼',
    description: 'Guinea-Bissauan heritage'
  },
  {
    value: 'sao_tome',
    label: 'São Tomé and Príncipe',
    flag: '🇸🇹',
    description: 'São Toméan heritage'
  },
  {
    value: 'east_timor',
    label: 'East Timor',
    flag: '🇹🇱',
    description: 'East Timorese heritage'
  },
  {
    value: 'macau',
    label: 'Macau',
    flag: '🇲🇴',
    description: 'Macanese heritage'
  },
  {
    value: 'uk_portuguese',
    label: 'UK Heritage (Portuguese-speaking families)',
    flag: '🇬🇧',
    description: 'Born in UK with Portuguese-speaking family background'
  },
  {
    value: 'mixed_heritage',
    label: 'Mixed Heritage',
    flag: '🌍',
    description: 'Multiple Portuguese-speaking heritage backgrounds'
  },
  {
    value: 'language_learner',
    label: 'Lusophone Language Learner (Culturally Connected)',
    flag: '📚',
    description: 'Learning Lusophone with deep cultural connection'
  },
  {
    value: 'other_lusophone',
    label: 'Other Portuguese-speaking background',
    flag: '🗣️',
    description: 'Other Portuguese-speaking cultural connection'
  }
]

interface HeritageSelectorProps {
  selectedHeritage: string[]
  onHeritageChange: (heritage: string[]) => void
  required?: boolean
  multiSelect?: boolean
  placeholder?: string
  error?: string
}

export function HeritageSelector({
  selectedHeritage,
  onHeritageChange,
  required = false,
  multiSelect = true,
  placeholder = "Select your Portuguese heritage...",
  error
}: HeritageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOptionClick = (value: string) => {
    if (multiSelect) {
      const newSelection = selectedHeritage.includes(value)
        ? selectedHeritage.filter(h => h !== value)
        : [...selectedHeritage, value]
      onHeritageChange(newSelection)
    } else {
      onHeritageChange([value])
      setIsOpen(false)
    }
  }

  const getDisplayText = () => {
    if (selectedHeritage.length === 0) return placeholder
    
    if (selectedHeritage.length === 1) {
      const option = HERITAGE_OPTIONS.find(opt => opt.value === selectedHeritage[0])
      return option ? `${option.flag} ${option.label}` : placeholder
    }
    
    return `${selectedHeritage.length} heritages selected`
  }

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-primary-700 mb-2">
        Your Lusophone Heritage {required && <span className="text-red-500">*</span>}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative w-full cursor-pointer rounded-lg border py-3 px-4 pr-10 text-left shadow-sm
          transition-colors duration-200 min-h-[44px] 
          ${error 
            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500' 
            : 'border-primary-200 bg-white focus:border-primary-500 focus:ring-primary-500'
          }
          focus:outline-none focus:ring-2 focus:ring-offset-2
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="block truncate text-primary-900">
          {getDisplayText()}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDownIcon 
            className={`h-5 w-5 text-primary-400 transform transition-transform duration-200 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`} 
          />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-primary-200 rounded-lg shadow-lg max-h-80 overflow-auto">
          <div className="py-1">
            {HERITAGE_OPTIONS.map((option) => {
              const isSelected = selectedHeritage.includes(option.value)
              
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleOptionClick(option.value)}
                  className={`
                    w-full text-left px-4 py-3 text-sm transition-colors duration-150
                    ${isSelected 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-900 hover:bg-primary-50'
                    }
                    focus:bg-primary-50 focus:outline-none
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{option.flag}</span>
                      <div>
                        <div className="font-medium">{option.label}</div>
                        {option.description && (
                          <div className="text-xs text-gray-500">{option.description}</div>
                        )}
                      </div>
                    </div>
                    {isSelected && multiSelect && (
                      <CheckIcon className="h-5 w-5 text-primary-600" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setIsOpen(false)}
        />
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {selectedHeritage.length > 0 && (
        <div className="mt-3">
          <div className="text-xs text-primary-600 font-medium mb-2">Selected Heritage:</div>
          <div className="flex flex-wrap gap-2">
            {selectedHeritage.map(value => {
              const option = HERITAGE_OPTIONS.find(opt => opt.value === value)
              return option ? (
                <span
                  key={value}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700"
                >
                  <span className="mr-1">{option.flag}</span>
                  {option.label}
                  {multiSelect && (
                    <button
                      type="button"
                      onClick={() => handleOptionClick(value)}
                      className="ml-2 text-primary-500 hover:text-primary-700 focus:outline-none"
                      aria-label={`Remove ${option.label}`}
                    >
                      ×
                    </button>
                  )}
                </span>
              ) : null
            })}
          </div>
        </div>
      )}
    </div>
  )
}