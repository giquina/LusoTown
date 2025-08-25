'use client'

import React from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'

export interface BusinessMarket {
  value: string
  label: string
  flag: string
  description: string
  opportunities: string[]
  gdp?: string
  population?: string
}

export const BUSINESS_MARKETS: BusinessMarket[] = [
  {
    value: 'palop_markets',
    label: 'PALOP Markets (Angola, Cape Verde, Guinea-Bissau, Mozambique, São Tomé)',
    flag: '🌍',
    description: 'African Portuguese-speaking countries with growing economies',
    opportunities: ['Oil & Gas', 'Mining', 'Infrastructure', 'Tourism', 'Agriculture'],
    gdp: '$200B+ combined',
    population: '60M+ people'
  },
  {
    value: 'brazil',
    label: 'Brazilian business opportunities',
    flag: '🇧🇷',
    description: 'South America\'s largest economy with diverse sectors',
    opportunities: ['Technology', 'Agriculture', 'Manufacturing', 'Financial Services', 'Energy'],
    gdp: '$2.1T',
    population: '215M people'
  },
  {
    value: 'portugal',
    label: 'Lusophone market connections',
    flag: '🇵🇹',
    description: 'EU gateway with strong maritime and tech sectors',
    opportunities: ['Technology', 'Maritime', 'Tourism', 'Renewable Energy', 'Wine & Food'],
    gdp: '$238B',
    population: '10.3M people'
  },
  {
    value: 'east_timor',
    label: 'East Timor emerging markets',
    flag: '🇹🇱',
    description: 'Emerging Southeast Asian market with oil revenues',
    opportunities: ['Oil & Gas', 'Infrastructure', 'Agriculture', 'Tourism', 'Education'],
    gdp: '$2.4B',
    population: '1.3M people'
  },
  {
    value: 'macau_asia_pacific',
    label: 'Macau/Asia-Pacific Lusophone connections',
    flag: '🇲🇴',
    description: 'Gateway to China and Asia-Pacific Portuguese business',
    opportunities: ['Gaming', 'Tourism', 'Financial Services', 'Trade', 'Real Estate'],
    gdp: '$35B',
    population: '650K people'
  },
  {
    value: 'uk_diaspora',
    label: 'UK diaspora business community',
    flag: '🇬🇧',
    description: 'Portuguese-speaking business community across the UK',
    opportunities: ['Professional Services', 'Restaurants', 'Construction', 'Healthcare', 'Education'],
    gdp: 'Part of $3.1T economy',
    population: '500K+ Portuguese speakers'
  },
  {
    value: 'cross_border_trade',
    label: 'Cross-border Lusophone trade',
    flag: '🌐',
    description: 'International trade between Portuguese-speaking markets',
    opportunities: ['Import/Export', 'Logistics', 'Legal Services', 'Consulting', 'Banking'],
    gdp: '$2.5T+ combined',
    population: '260M+ speakers globally'
  },
  {
    value: 'cultural_business',
    label: 'Cultural business partnerships',
    flag: '🎭',
    description: 'Business opportunities in Lusophone cultural sector',
    opportunities: ['Media & Entertainment', 'Cultural Events', 'Language Services', 'Publishing', 'Arts'],
    gdp: 'Niche high-value sector',
    population: 'Global Lusophone diaspora'
  }
]

interface BusinessMarketSelectorProps {
  selectedMarkets: string[]
  onMarketsChange: (markets: string[]) => void
  maxSelection?: number
  required?: boolean
  error?: string
}

export function BusinessMarketSelector({
  selectedMarkets,
  onMarketsChange,
  maxSelection = 6,
  required = false,
  error
}: BusinessMarketSelectorProps) {

  const handleMarketToggle = (value: string) => {
    const isSelected = selectedMarkets.includes(value)
    
    if (isSelected) {
      onMarketsChange(selectedMarkets.filter(market => market !== value))
    } else if (selectedMarkets.length < maxSelection) {
      onMarketsChange([...selectedMarkets, value])
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-primary-700 mb-2">
          Business Market Interests {required && <span className="text-red-500">*</span>}
        </label>
        <p className="text-sm text-gray-600 mb-4">
          Select up to {maxSelection} markets you're interested in for business opportunities.
          ({selectedMarkets.length}/{maxSelection} selected)
        </p>
      </div>

      {/* Markets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {BUSINESS_MARKETS.map((market) => {
          const isSelected = selectedMarkets.includes(market.value)
          const canSelect = isSelected || selectedMarkets.length < maxSelection

          return (
            <button
              key={market.value}
              type="button"
              onClick={() => handleMarketToggle(market.value)}
              disabled={!canSelect}
              className={`
                relative p-6 rounded-lg border-2 text-left transition-all duration-200
                ${isSelected
                  ? 'border-primary-500 bg-primary-50'
                  : canSelect
                    ? 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-25'
                    : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
                }
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
              `}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{market.flag}</span>
                  <div>
                    <h3 className="font-semibold text-primary-900 text-sm leading-tight">
                      {market.label}
                    </h3>
                  </div>
                </div>
                {isSelected && (
                  <CheckIcon className="h-6 w-6 text-primary-600 flex-shrink-0" />
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                {market.description}
              </p>

              {/* Market Stats */}
              <div className="flex justify-between text-xs text-primary-700 mb-3 border-t border-gray-100 pt-2">
                <span><strong>GDP:</strong> {market.gdp}</span>
                <span><strong>Market:</strong> {market.population}</span>
              </div>

              {/* Key Opportunities */}
              <div>
                <div className="text-xs font-semibold text-primary-800 mb-2">Key Opportunities:</div>
                <div className="flex flex-wrap gap-1">
                  {market.opportunities.slice(0, 3).map((opportunity, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium"
                    >
                      {opportunity}
                    </span>
                  ))}
                  {market.opportunities.length > 3 && (
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{market.opportunities.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Selected Markets Summary */}
      {selectedMarkets.length > 0 && (
        <div className="bg-primary-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-primary-900 mb-3">
            Your Selected Markets ({selectedMarkets.length}):
          </h4>
          <div className="space-y-2">
            {selectedMarkets.map(value => {
              const market = BUSINESS_MARKETS.find(m => m.value === value)
              return market ? (
                <div key={value} className="flex items-center justify-between bg-white rounded-lg p-3 border border-primary-200">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{market.flag}</span>
                    <div>
                      <div className="font-medium text-sm text-primary-900">{market.label}</div>
                      <div className="text-xs text-gray-600">{market.gdp} • {market.population}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleMarketToggle(value)}
                    className="text-primary-500 hover:text-primary-700 focus:outline-none"
                    aria-label={`Remove ${market.label}`}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
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