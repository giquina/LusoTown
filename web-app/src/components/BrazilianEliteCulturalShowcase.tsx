'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useHeritage } from '@/context/HeritageContext'
import { 
  SAO_PAULO_CULTURAL_ELITE, 
  RIO_LUXURY_LIFESTYLE, 
  LONDON_BRAZILIAN_ELITE_VENUES,
  BRAZILIAN_LUXURY_BRANDS,
  BRAZILIAN_ECONOMIC_POWERHOUSE,
  getBrazilianVenuesByType,
  getBrazilianEliteEventsLondon,
  getBrazilianLuxuryBrandsByCategory,
  getBusinessNetworkingVenues,
  getExclusiveInvitationEvents
} from '@/config/brazilian-elite-culture'
import { getCulturalCenterById } from '@/config/cultural-centers'
import { SubscriptionGate } from './SubscriptionGate'
import { PremiumGradients } from './ui/PremiumGradients'
import { LuxuryCard } from './ui/LuxuryCard'
import EliteButton from './ui/EliteButton'

interface BrazilianEliteCulturalShowcaseProps {
  variant?: 'full' | 'preview' | 'networking' | 'business'
  showSubscriptionGate?: boolean
  className?: string
}

export function BrazilianEliteCulturalShowcase({ 
  variant = 'full', 
  showSubscriptionGate = true,
  className = '' 
}: BrazilianEliteCulturalShowcaseProps) {
  const { t } = useLanguage()
  const { colors } = useHeritage()
  const [selectedCategory, setSelectedCategory] = useState<'venues' | 'brands' | 'networking' | 'economic'>('venues')
  const [selectedLocation, setSelectedLocation] = useState<'sao_paulo' | 'rio' | 'london'>('london')
  const [showExclusiveContent, setShowExclusiveContent] = useState(false)

  // Get Brazilian cultural center data
  const casaDoBrasil = getCulturalCenterById('casa-do-brasil-london')
  
  // Get curated data based on selection
  const operaHouses = getBrazilianVenuesByType('opera_house')
  const luxuryRestaurants = getBrazilianVenuesByType('luxury_restaurant')
  const privateLondonClubs = getBrazilianVenuesByType('private_club')
  const culturalInstitutions = getBrazilianVenuesByType('cultural_institution')
  
  const eliteEventsLondon = getBrazilianEliteEventsLondon()
  const exclusiveEvents = getExclusiveInvitationEvents()
  const businessNetworkingVenues = getBusinessNetworkingVenues()
  
  const jewelryBrands = getBrazilianLuxuryBrandsByCategory('jewelry')
  const financeBrands = getBrazilianLuxuryBrandsByCategory('finance')
  const fashionBrands = getBrazilianLuxuryBrandsByCategory('fashion')

  const categoryTabs = [
    { id: 'venues', label: 'Elite Venues', labelPT: 'Locais de Elite' },
    { id: 'brands', label: 'Luxury Brands', labelPT: 'Marcas de Luxo' },
    { id: 'networking', label: 'High Society', labelPT: 'Alta Sociedade' },
    { id: 'economic', label: 'Economic Power', labelPT: 'Poder Econômico' }
  ]

  const locationTabs = [
    { id: 'london', label: 'London Elite', labelPT: 'Elite de Londres', flag: '🇬🇧' },
    { id: 'sao_paulo', label: 'São Paulo High Society', labelPT: 'Alta Sociedade Paulistana', flag: '🇧🇷' },
    { id: 'rio', label: 'Rio Luxury', labelPT: 'Luxo Carioca', flag: '🇧🇷' }
  ]

  const VenueCard = ({ venue, isPremium = false }: any) => (
    <LuxuryCard className={`group transition-all duration-300 hover:scale-105 ${isPremium ? 'border-2 border-yellow-400' : ''}`}>
      <div className="relative">
        {isPremium && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Exclusive Access
            </span>
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{venue.name}</h3>
              <p className="text-gray-600 font-medium">{venue.namePortuguese}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`inline-block w-3 h-3 rounded-full ${
                  venue.prestige === 'iconic' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                  venue.prestige === 'prestigious' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                  'bg-gradient-to-r from-green-500 to-emerald-500'
                }`}></span>
                <span className="text-sm font-medium capitalize text-gray-700">
                  {venue.prestige} Status
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">{venue.city}</div>
              <div className="text-xs text-gray-400">{venue.neighborhood}</div>
            </div>
          </div>
          
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">{venue.description}</p>
          
          {venue.dressCode && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Dress Code</div>
              <div className="text-sm text-gray-800">{venue.dressCode}</div>
            </div>
          )}
          
          {venue.signature_events && venue.signature_events.length > 0 && (
            <div className="mb-4">
              <div className="text-sm font-semibold text-gray-700 mb-2">Signature Events</div>
              <div className="space-y-2">
                {venue.signature_events.slice(0, 2).map((event: any, idx: number) => (
                  <div key={idx} className="text-xs p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded border-l-2 border-blue-400">
                    <div className="font-medium text-blue-900">{event.name}</div>
                    <div className="text-blue-700 mt-1">{event.price_range}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {venue.target_demographic && (
            <div className="mb-4">
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Elite Clientele</div>
              <div className="flex flex-wrap gap-1">
                {venue.target_demographic.slice(0, 3).map((demo: string, idx: number) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {demo}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex gap-2 pt-3 border-t border-gray-100">
            <EliteButton 
              variant="primary" 
              size="sm"
              className="flex-1"
              onClick={() => setShowExclusiveContent(true)}
            >
              View Details
            </EliteButton>
            {venue.website && (
              <EliteButton 
                variant="outline" 
                size="sm"
                onClick={() => window.open(venue.website, '_blank')}
              >
                Website
              </EliteButton>
            )}
          </div>
        </div>
      </div>
    </LuxuryCard>
  )

  const BrandCard = ({ brand }: any) => (
    <LuxuryCard className="group transition-all duration-300 hover:scale-105">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{brand.name}</h3>
            <div className="flex items-center gap-2">
              <span className={`inline-block w-2 h-2 rounded-full ${
                brand.prestige_level === 'world_class' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                brand.prestige_level === 'luxury' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                'bg-gradient-to-r from-green-500 to-emerald-500'
              }`}></span>
              <span className="text-xs font-medium uppercase tracking-wider text-gray-600">
                {brand.prestige_level.replace('_', ' ')}
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
              {brand.category}
            </span>
          </div>
        </div>
        
        <p className="text-gray-700 text-sm mb-4">{brand.description}</p>
        
        <div className="mb-4">
          <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">UK Presence</div>
          <div className="space-y-1">
            {brand.uk_presence.london_locations.slice(0, 2).map((location: string, idx: number) => (
              <div key={idx} className="text-xs text-gray-700 flex items-center gap-1">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                {location}
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
          <strong>Cultural Connection:</strong> {brand.cultural_connection}
        </div>
      </div>
    </LuxuryCard>
  )

  const EconomicPowerShowcase = () => (
    <div className="space-y-8">
      <PremiumGradients className="text-center py-8 rounded-xl">
        <h3 className="text-2xl font-bold text-white mb-2">
          Brazil: Latin America's Economic Powerhouse
        </h3>
        <p className="text-blue-100 text-lg">
          12th largest economy globally • #1 in Latin America
        </p>
      </PremiumGradients>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LuxuryCard>
          <div className="p-6">
            <h4 className="text-lg font-bold text-gray-900 mb-4">Key Industries</h4>
            <div className="space-y-4">
              {BRAZILIAN_ECONOMIC_POWERHOUSE.key_industries.map((industry, idx) => (
                <div key={idx} className="border-l-4 border-blue-400 pl-4">
                  <h5 className="font-semibold text-gray-800">{industry.name}</h5>
                  <p className="text-sm text-gray-600 mb-2">{industry.description}</p>
                  <div className="text-xs text-gray-500">
                    <strong>UK Presence:</strong> {industry.uk_presence}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {industry.global_companies.map((company, companyIdx) => (
                      <span key={companyIdx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </LuxuryCard>
        
        <LuxuryCard>
          <div className="p-6">
            <h4 className="text-lg font-bold text-gray-900 mb-4">Cultural Sophistication</h4>
            <div className="space-y-3">
              {BRAZILIAN_ECONOMIC_POWERHOUSE.cultural_sophistication.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h5 className="font-semibold text-gray-800 mb-3">Luxury Lifestyle Indicators</h5>
              <div className="space-y-2">
                {BRAZILIAN_ECONOMIC_POWERHOUSE.luxury_lifestyle_indicators.map((indicator, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-xs text-gray-600">{indicator}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </LuxuryCard>
      </div>
    </div>
  )

  const NetworkingSection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Elite Brazilian Networking in London
        </h3>
        <p className="text-gray-600">
          Exclusive opportunities for high-class Brazilian professionals
        </p>
      </div>
      
      {/* Casa do Brasil Elite Programs */}
      {casaDoBrasil && (
        <LuxuryCard className="border-2 border-yellow-400">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-blue-500 rounded-full"></div>
              <h4 className="text-xl font-bold text-gray-900">{casaDoBrasil.name}</h4>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold">
                PREMIUM PARTNER
              </span>
            </div>
            <p className="text-gray-700 mb-4">{casaDoBrasil.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {casaDoBrasil.programs.slice(0, 2).map((program, idx) => (
                <div key={idx} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <h5 className="font-semibold text-blue-900 mb-2">{program.name}</h5>
                  <p className="text-sm text-blue-800 mb-2">{program.description}</p>
                  <div className="text-xs text-blue-700">
                    <strong>Cost:</strong> {program.cost} • <strong>Duration:</strong> {program.duration}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {program.targetAudience.slice(0, 2).map((audience, audienceIdx) => (
                      <span key={audienceIdx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {audience}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </LuxuryCard>
      )}
      
      {/* London Elite Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {privateLondonClubs.map((venue, idx) => (
          <VenueCard key={idx} venue={venue} isPremium={true} />
        ))}
      </div>
      
      {/* Exclusive Events */}
      <LuxuryCard>
        <div className="p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Invitation-Only Events</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exclusiveEvents.slice(0, 4).map((event, idx) => (
              <div key={idx} className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <h5 className="font-semibold text-purple-900 mb-1">{event.name}</h5>
                <p className="text-sm text-purple-800 mb-2">{event.description}</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-purple-700 font-medium">{event.price_range}</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                    {event.exclusivity.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </LuxuryCard>
    </div>
  )

  const renderContent = () => {
    if (selectedCategory === 'venues') {
      const venues = selectedLocation === 'london' ? LONDON_BRAZILIAN_ELITE_VENUES :
                    selectedLocation === 'sao_paulo' ? SAO_PAULO_CULTURAL_ELITE :
                    RIO_LUXURY_LIFESTYLE
      
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {venues.map((venue, idx) => (
            <VenueCard key={idx} venue={venue} isPremium={venue.prestige === 'iconic'} />
          ))}
        </div>
      )
    }
    
    if (selectedCategory === 'brands') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BRAZILIAN_LUXURY_BRANDS.map((brand, idx) => (
            <BrandCard key={idx} brand={brand} />
          ))}
        </div>
      )
    }
    
    if (selectedCategory === 'networking') {
      return <NetworkingSection />
    }
    
    if (selectedCategory === 'economic') {
      return <EconomicPowerShowcase />
    }
    
    return null
  }

  if (showSubscriptionGate && variant === 'full') {
    return (
      <SubscriptionGate 
        requiredPlan="ambassador"
        title="Brazilian Elite Cultural Access"
        description="Unlock exclusive access to Brazil's most prestigious cultural venues, luxury brands, and high-society networking opportunities in London and Brazil."
      >
        <BrazilianEliteCulturalShowcase 
          variant={variant} 
          showSubscriptionGate={false}
          className={className}
        />
      </SubscriptionGate>
    )
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Brazilian Elite Culture & Luxury Lifestyle
        </h2>
        <p className="text-xl text-gray-600 mb-4">
          Discover Brazil's sophisticated cultural scene and connect with London's Brazilian elite
        </p>
        <div className="flex items-center justify-center gap-2 text-lg">
          <span className="font-semibold text-green-600">Brazil:</span>
          <span className="text-gray-700">Latin America's Economic Powerhouse</span>
          <span className="text-sm text-gray-500">(12th largest economy globally)</span>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="flex flex-wrap justify-center gap-2">
        {categoryTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id as any)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              selectedCategory === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Location Navigation (for venues) */}
      {selectedCategory === 'venues' && (
        <div className="flex flex-wrap justify-center gap-2">
          {locationTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedLocation(tab.id as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedLocation === tab.id
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.flag}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      {renderContent()}

      {/* Call to Action */}
      <div className="text-center pt-8">
        <PremiumGradients className="p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-white mb-4">
            Join London's Brazilian Elite Network
          </h3>
          <p className="text-blue-100 mb-6">
            Connect with successful Brazilian professionals and experience Brazil's cultural sophistication in London
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <EliteButton 
              variant="secondary" 
              size="lg"
              onClick={() => window.location.href = '/premium-membership'}
            >
              Explore Premium Membership
            </EliteButton>
            <EliteButton 
              variant="outline" 
              size="lg"
              className="text-white border-white hover:bg-white hover:text-blue-600"
              onClick={() => window.location.href = '/contact'}
            >
              Request Invitation
            </EliteButton>
          </div>
        </PremiumGradients>
      </div>
    </div>
  )
}

export default BrazilianEliteCulturalShowcase