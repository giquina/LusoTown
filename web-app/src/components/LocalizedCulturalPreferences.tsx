'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGlobalPortuguese } from '@/context/GlobalPortugueseContext'
import { useLanguage } from '@/context/LanguageContext'
import { 
  PortugueseCountry, 
  LocalizedRegion, 
  CulturalItem, 
  Festival,
  RegionalPreferences 
} from '@/types/GlobalPortugueseExpansion'

interface LocalizedCulturalPreferencesProps {
  onPreferencesUpdate?: (preferences: RegionalPreferences) => void
  showRegionSelector?: boolean
  compactMode?: boolean
}

export default function LocalizedCulturalPreferences({ 
  onPreferencesUpdate,
  showRegionSelector = true,
  compactMode = false 
}: LocalizedCulturalPreferencesProps) {
  const { 
    currentCountry, 
    currentRegion, 
    switchRegion, 
    availableCountries,
    regionalPreferences,
    formatCurrency,
    formatDate,
    formatTime
  } = useGlobalPortuguese()
  const { t } = useLanguage()
  
  const [selectedPreferences, setSelectedPreferences] = useState<Partial<RegionalPreferences>>({})
  const [showCulturalDetails, setShowCulturalDetails] = useState(false)

  // Update local preferences when regional preferences change
  useEffect(() => {
    if (regionalPreferences) {
      setSelectedPreferences(regionalPreferences)
    }
  }, [regionalPreferences])

  // Notify parent of preference changes
  useEffect(() => {
    if (Object.keys(selectedPreferences).length > 0 && onPreferencesUpdate) {
      onPreferencesUpdate(selectedPreferences as RegionalPreferences)
    }
  }, [selectedPreferences, onPreferencesUpdate])

  const handlePreferenceChange = (key: keyof RegionalPreferences, value: any) => {
    setSelectedPreferences(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const getRegionFlag = (country: PortugueseCountry): string => {
    const flags: Record<PortugueseCountry, string> = {
      'portugal': '🇵🇹',
      'brazil': '🇧🇷', 
      'usa': '🇺🇸',
      'canada': '🇨🇦',
      'uk': '🇬🇧',
      'france': '🇫🇷',
      'germany': '🇩🇪',
      'switzerland': '🇨🇭',
      'luxembourg': '🇱🇺',
      'australia': '🇦🇺',
      'south-africa': '🇿🇦',
      'angola': '🇦🇴',
      'mozambique': '🇲🇿',
      'cape-verde': '🇨🇻',
      'macau': '🇲🇴',
      'east-timor': '🇹🇱',
      'india-goa': '🇮🇳',
      'venezuela': '🇻🇪',
      'argentina': '🇦🇷'
    }
    return flags[country] || '🌍'
  }

  const getCulturalInsights = (region: LocalizedRegion): CulturalItem[] => {
    // Mock cultural insights based on region
    const insights: Record<string, CulturalItem[]> = {
      'uk': [
        {
          id: 'fado-uk',
          name: 'Fado Nights',
          description: 'Traditional Portuguese music performances in London venues',
          origin: 'Portugal',
          significance: 'Maintains connection to Portuguese musical heritage',
          modernAdaptation: 'Fusion with contemporary music styles',
          preservationStatus: 'thriving'
        },
        {
          id: 'portuguese-markets-uk',
          name: 'Portuguese Markets',
          description: 'Weekly markets selling Portuguese products and foods',
          origin: 'Portugal',
          significance: 'Access to traditional Portuguese products',
          modernAdaptation: 'Online delivery services available',
          preservationStatus: 'thriving'
        }
      ],
      'usa': [
        {
          id: 'azorean-festivals-usa',
          name: 'Azorean Festivals',
          description: 'Celebrations of Azorean culture and traditions',
          origin: 'Azores, Portugal',
          significance: 'Preserves specific regional Portuguese culture',
          modernAdaptation: 'Adapted to American festival formats',
          preservationStatus: 'thriving'
        },
        {
          id: 'portuguese-holy-spirit-usa',
          name: 'Holy Spirit Festivals',
          description: 'Traditional religious celebrations',
          origin: 'Azores, Portugal',
          significance: 'Combines religious and cultural traditions',
          modernAdaptation: 'Community fundraising for local causes',
          preservationStatus: 'thriving'
        }
      ],
      'brazil': [
        {
          id: 'saudade-brazil',
          name: 'Saudade Culture',
          description: 'Deep emotional connection to Portuguese heritage',
          origin: 'Portugal',
          significance: 'Core emotional concept in Brazilian-Portuguese culture',
          modernAdaptation: 'Expressed through music, literature, and social media',
          preservationStatus: 'thriving'
        }
      ]
    }
    
    return insights[region.country] || []
  }

  const getTraditionalFestivals = (region: LocalizedRegion): Festival[] => {
    // Mock festivals data
    const festivals: Record<string, Festival[]> = {
      'uk': [
        {
          id: 'portuguese-festival-london',
          name: 'Portuguese Festival London',
          description: 'Annual celebration of Portuguese culture',
          date: '2025-09-15',
          location: 'London',
          significance: 'Largest Portuguese cultural event in the UK',
          traditions: ['Traditional music', 'Portuguese cuisine', 'Folk dancing'],
          modernCelebration: 'Combines traditional and contemporary Portuguese culture'
        }
      ],
      'usa': [
        {
          id: 'portuguese-festival-fall-river',
          name: 'Portuguese Festival of Fall River',
          description: 'Historic Portuguese-American celebration',
          date: '2025-08-10',
          location: 'Fall River, MA',
          significance: 'One of the oldest Portuguese festivals in America',
          traditions: ['Malasadas', 'Portuguese music', 'Cultural exhibits'],
          modernCelebration: 'Attracts Portuguese-Americans from across New England'
        }
      ]
    }
    
    return festivals[region.country] || []
  }

  if (compactMode) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getRegionFlag(currentCountry)}</span>
            <div>
              <h3 className="font-semibold text-gray-900">{currentRegion?.name}</h3>
              <p className="text-sm text-gray-600">{currentRegion?.nativeName}</p>
            </div>
          </div>
          {showRegionSelector && (
            <select
              value={currentCountry}
              onChange={(e) => switchRegion(e.target.value as PortugueseCountry)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {availableCountries.map(country => (
                <option key={country} value={country}>
                  {getRegionFlag(country)} {country.charAt(0).toUpperCase() + country.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Population:</span>
            <p className="font-medium">{currentRegion?.portuguesePopulation.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-gray-600">Currency:</span>
            <p className="font-medium">{formatCurrency(100)}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-red-500 to-yellow-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{getRegionFlag(currentCountry)}</span>
            <div>
              <h2 className="text-2xl font-bold">{currentRegion?.name}</h2>
              <p className="text-green-100">{currentRegion?.nativeName}</p>
              <p className="text-sm text-green-100">
                {currentRegion?.portuguesePopulation.toLocaleString()} Portuguese speakers
              </p>
            </div>
          </div>
          
          {showRegionSelector && (
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <label className="block text-sm font-medium mb-2">Switch Region</label>
              <select
                value={currentCountry}
                onChange={(e) => switchRegion(e.target.value as PortugueseCountry)}
                className="px-4 py-2 bg-white text-gray-900 rounded-md font-medium focus:ring-2 focus:ring-white focus:ring-opacity-50"
              >
                {availableCountries.map(country => (
                  <option key={country} value={country}>
                    {getRegionFlag(country)} {country.charAt(0).toUpperCase() + country.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Regional Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-blue-600">🌍</span>
              <h3 className="font-semibold text-blue-900">Region</h3>
            </div>
            <p className="text-blue-800">{currentRegion?.region.replace('-', ' ').toUpperCase()}</p>
            <p className="text-sm text-blue-600 mt-1">{currentRegion?.majorCities.join(', ')}</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-green-600">💰</span>
              <h3 className="font-semibold text-green-900">Currency</h3>
            </div>
            <p className="text-green-800">{currentRegion?.currency}</p>
            <p className="text-sm text-green-600 mt-1">Example: {formatCurrency(25)}</p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-purple-600">🗣️</span>
              <h3 className="font-semibold text-purple-900">Dialect</h3>
            </div>
            <p className="text-purple-800">{currentRegion?.dialect.replace('-', ' ')}</p>
            <p className="text-sm text-purple-600 mt-1">Regional Portuguese variant</p>
          </div>
        </div>

        {/* Cultural Features */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Cultural Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentRegion?.culturalFeatures.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-red-600">🎭</span>
                  <h4 className="font-medium text-gray-900">{feature}</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Active in {currentRegion.name} Portuguese-speaking community
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Insights */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Cultural Insights</h3>
            <button
              onClick={() => setShowCulturalDetails(!showCulturalDetails)}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
            >
              {showCulturalDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
          
          <AnimatePresence>
            {showCulturalDetails && currentRegion && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                {getCulturalInsights(currentRegion).map(insight => (
                  <div key={insight.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{insight.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        insight.preservationStatus === 'thriving' 
                          ? 'bg-green-100 text-green-800'
                          : insight.preservationStatus === 'declining'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {insight.preservationStatus}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{insight.description}</p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Origin:</strong> {insight.origin}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Significance:</strong> {insight.significance}
                    </p>
                    {insight.modernAdaptation && (
                      <p className="text-sm text-blue-600">
                        <strong>Modern Adaptation:</strong> {insight.modernAdaptation}
                      </p>
                    )}
                  </div>
                ))}
                
                {/* Traditional Festivals */}
                {currentRegion && getTraditionalFestivals(currentRegion).length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Traditional Festivals</h4>
                    <div className="space-y-3">
                      {getTraditionalFestivals(currentRegion).map(festival => (
                        <div key={festival.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-900">{festival.name}</h5>
                            <span className="text-sm text-gray-600">{formatDate(new Date(festival.date))}</span>
                          </div>
                          <p className="text-gray-700 text-sm mb-2">{festival.description}</p>
                          <p className="text-xs text-gray-600 mb-1">
                            <strong>Location:</strong> {festival.location}
                          </p>
                          <p className="text-xs text-gray-600">
                            <strong>Traditions:</strong> {festival.traditions.join(', ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Regional Preferences */}
        {regionalPreferences && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Regional Preferences</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                  <select
                    value={selectedPreferences.dateFormat || regionalPreferences.dateFormat}
                    onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Format</label>
                  <select
                    value={selectedPreferences.timeFormat || regionalPreferences.timeFormat}
                    onChange={(e) => handlePreferenceChange('timeFormat', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="24h">24 Hour</option>
                    <option value="12h">12 Hour (AM/PM)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Communication Style</label>
                  <select
                    value={selectedPreferences.communicationStyle || regionalPreferences.communicationStyle}
                    onChange={(e) => handlePreferenceChange('communicationStyle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="formal">Formal</option>
                    <option value="casual">Casual</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Day of Week</label>
                  <select
                    value={selectedPreferences.firstDayOfWeek ?? regionalPreferences.firstDayOfWeek}
                    onChange={(e) => handlePreferenceChange('firstDayOfWeek', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={0}>Sunday</option>
                    <option value={1}>Monday</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Family Structure Importance</label>
                  <select
                    value={selectedPreferences.familyStructureImportance || regionalPreferences.familyStructureImportance}
                    onChange={(e) => handlePreferenceChange('familyStructureImportance', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Business Hours</h4>
                  <p className="text-sm text-blue-800">
                    {regionalPreferences.businessHours.start} - {regionalPreferences.businessHours.end}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Timezone: {regionalPreferences.businessHours.timezone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Community Resources */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Community Resources</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">Cultural Centers</h4>
              <ul className="text-sm text-green-800 space-y-1">
                {currentRegion?.culturalCenters.slice(0, 3).map((center, index) => (
                  <li key={index}>• {center}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Consulates</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                {currentRegion?.consulateContacts.slice(0, 3).map((consulate, index) => (
                  <li key={index}>• {consulate}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h4 className="font-medium text-purple-900 mb-2">Time Zone</h4>
              <p className="text-sm text-purple-800">{currentRegion?.timezone}</p>
              <p className="text-xs text-purple-600 mt-1">
                Current time: {formatTime(new Date())}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}