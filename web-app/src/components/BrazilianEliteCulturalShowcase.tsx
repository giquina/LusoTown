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
  BRAZILIAN_MUSIC_DANCE_VENUES,
  BRAZILIAN_NIGHTLIFE_VENUES,
  BRAZILIAN_FOOD_CULTURE_VENUES,
  getBrazilianVenuesByType,
  getBrazilianEliteEventsLondon,
  getBrazilianLuxuryBrandsByCategory,
  getBusinessNetworkingVenues,
  getExclusiveInvitationEvents,
  getAllBrazilianVenues,
  getBrazilianMusicDanceVenues,
  getBrazilianNightlifeVenues,
  getBrazilianFoodVenues,
  getBrazilianMusicDanceEvents,
  getBrazilianNightlifeEvents,
  getBrazilianFoodEvents,
  getCommunityBrazilianEvents,
  getBrazilianSocialDiningEvents,
  getBrazilianCulturalMagnetism
} from '@/config/brazilian-elite-culture'
import { getCulturalCenterById } from '@/config/cultural-centers'
import { SubscriptionGate } from './SubscriptionGate'
import { GradientBackground, AnimatedGradient } from './ui'
import { LuxuryCard } from './ui'
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
  const [selectedCategory, setSelectedCategory] = useState<'venues' | 'brands' | 'networking' | 'economic' | 'music_dance' | 'nightlife' | 'food_culture'>('music_dance')
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
    { id: 'music_dance', label: '🎵 Music & Dance', labelPT: '🎵 Música e Dança', color: 'from-green-500 to-yellow-500' },
    { id: 'nightlife', label: '🌃 Nightlife & Social', labelPT: '🌃 Vida Noturna', color: 'from-purple-500 to-pink-500' },
    { id: 'food_culture', label: '🍽️ Food Culture', labelPT: '🍽️ Cultura Gastronômica', color: 'from-orange-500 to-red-500' },
    { id: 'venues', label: 'Elite Venues', labelPT: 'Locais de Elite', color: 'from-blue-500 to-indigo-500' },
    { id: 'brands', label: 'Luxury Brands', labelPT: 'Marcas de Luxo', color: 'from-gray-600 to-gray-800' },
    { id: 'networking', label: 'High Society', labelPT: 'Alta Sociedade', color: 'from-indigo-500 to-purple-500' },
    { id: 'economic', label: 'Economic Power', labelPT: 'Poder Econômico', color: 'from-emerald-500 to-cyan-500' }
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

  const BrazilianCulturalMagnetism = () => (
    <div className="space-y-8">
      <GradientBackground className="text-center py-8 rounded-xl">
        <h3 className="text-3xl font-bold text-white mb-2">
          🇧🇷 Brazilian Cultural Magnetism
        </h3>
        <p className="text-blue-100 text-lg">
          The incredible energy, music, dancing, food & nightlife that makes Brazilian culture absolutely irresistible
        </p>
      </GradientBackground>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getBrazilianCulturalMagnetism().map((magnetism, idx) => {
          const [title, description] = magnetism.split(': ')
          const isMusic = title.includes('Samba') || title.includes('Bossa Nova') || title.includes('Funk')
          const isFood = title.includes('BBQ') || title.includes('Açaí') || title.includes('Brigadeiro')
          const isDance = title.includes('Capoeira') || title.includes('Forró')
          const isNightlife = title.includes('Football') || title.includes('Carnival')
          
          const bgGradient = isMusic ? 'from-green-50 to-yellow-50' :
                            isFood ? 'from-orange-50 to-red-50' :
                            isDance ? 'from-purple-50 to-pink-50' :
                            isNightlife ? 'from-blue-50 to-indigo-50' :
                            'from-gray-50 to-gray-100'
          
          const borderColor = isMusic ? 'border-green-400' :
                             isFood ? 'border-orange-400' :
                             isDance ? 'border-purple-400' :
                             isNightlife ? 'border-blue-400' :
                             'border-gray-400'
          
          return (
            <LuxuryCard key={idx} className={`bg-gradient-to-br ${bgGradient} border-l-4 ${borderColor}`}>
              <div className="p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">{title}</h4>
                <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
                <div className="mt-4">
                  <span className={`inline-block w-3 h-3 rounded-full ${
                    isMusic ? 'bg-gradient-to-r from-green-400 to-yellow-400' :
                    isFood ? 'bg-gradient-to-r from-orange-400 to-red-400' :
                    isDance ? 'bg-gradient-to-r from-purple-400 to-pink-400' :
                    isNightlife ? 'bg-gradient-to-r from-blue-400 to-indigo-400' :
                    'bg-gradient-to-r from-gray-400 to-gray-500'
                  }`}></span>
                  <span className="ml-2 text-xs font-medium text-gray-600 uppercase tracking-wider">
                    {isMusic ? 'Music Culture' :
                     isFood ? 'Food Culture' :
                     isDance ? 'Dance Culture' :
                     isNightlife ? 'Social Culture' :
                     'Brazilian Culture'}
                  </span>
                </div>
              </div>
            </LuxuryCard>
          )
        })}
      </div>
      
      {/* Economic Power Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl">
          <div className="text-3xl font-bold text-green-600 mb-2">12th</div>
          <div className="text-sm text-gray-600">Largest Economy Globally</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
          <div className="text-3xl font-bold text-blue-600 mb-2">#1</div>
          <div className="text-sm text-gray-600">Economy in Latin America</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
          <div className="text-3xl font-bold text-orange-600 mb-2">3rd</div>
          <div className="text-sm text-gray-600">Aircraft Manufacturer</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
          <div className="text-3xl font-bold text-purple-600 mb-2">4th</div>
          <div className="text-sm text-gray-600">Luxury Car Market</div>
        </div>
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
    if (selectedCategory === 'music_dance') {
      return (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              🎵 Brazilian Music & Dance Culture
            </h3>
            <p className="text-xl text-gray-600 mb-4">
              Where infectious rhythms create magical connections and communities come alive
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getBrazilianMusicDanceVenues().map((venue, idx) => (
              <VenueCard key={idx} venue={venue} isPremium={venue.prestige === 'iconic'} />
            ))}
          </div>
          
          <div className="mt-8">
            <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">🎪 Community Events & Celebrations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getBrazilianMusicDanceEvents().map((event, idx) => (
                <LuxuryCard key={idx} className="bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50">
                  <div className="p-6">
                    <h5 className="text-lg font-bold text-gray-900 mb-2">{event.name}</h5>
                    <p className="text-sm text-gray-700 mb-3">{event.description}</p>
                    <div className="flex justify-between items-center text-xs mb-3">
                      <span className="font-medium text-green-700">{event.price_range}</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {event.type.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      <strong>Perfect for:</strong> {event.target_audience.slice(0, 3).join(', ')}
                    </div>
                  </div>
                </LuxuryCard>
              ))}
            </div>
          </div>
        </div>
      )
    }
    
    if (selectedCategory === 'nightlife') {
      return (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              🌃 Brazilian Nightlife & Social Scene
            </h3>
            <p className="text-xl text-gray-600 mb-4">
              Where Brazilian energy meets UK sophistication for unforgettable nights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getBrazilianNightlifeVenues().map((venue, idx) => (
              <VenueCard key={idx} venue={venue} isPremium={true} />
            ))}
          </div>
          
          <div className="mt-8">
            <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">🎉 Epic Night Events</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getBrazilianNightlifeEvents().map((event, idx) => (
                <LuxuryCard key={idx} className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
                  <div className="p-6">
                    <h5 className="text-lg font-bold text-gray-900 mb-2">{event.name}</h5>
                    <p className="text-sm text-gray-700 mb-3">{event.description}</p>
                    <div className="flex justify-between items-center text-xs mb-3">
                      <span className="font-medium text-purple-700">{event.price_range}</span>
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                        {event.type.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      <strong>Vibe:</strong> {event.target_audience.slice(0, 3).join(', ')}
                    </div>
                  </div>
                </LuxuryCard>
              ))}
            </div>
          </div>
        </div>
      )
    }
    
    if (selectedCategory === 'food_culture') {
      return (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              🍽️ Brazilian Food Culture
            </h3>
            <p className="text-xl text-gray-600 mb-4">
              Incredible flavors and social dining experiences that bring people together
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getBrazilianFoodVenues().map((venue, idx) => (
              <VenueCard key={idx} venue={venue} isPremium={true} />
            ))}
          </div>
          
          <div className="mt-8">
            <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">🎪 Food Festivals & Social Dining</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getBrazilianFoodEvents().map((event, idx) => (
                <LuxuryCard key={idx} className="bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
                  <div className="p-6">
                    <h5 className="text-lg font-bold text-gray-900 mb-2">{event.name}</h5>
                    <p className="text-sm text-gray-700 mb-3">{event.description}</p>
                    <div className="flex justify-between items-center text-xs mb-3">
                      <span className="font-medium text-orange-700">{event.price_range}</span>
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                        {event.type.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      <strong>Experience:</strong> {event.target_audience.slice(0, 3).join(', ')}
                    </div>
                  </div>
                </LuxuryCard>
              ))}
            </div>
          </div>
        </div>
      )
    }
    
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
      return <BrazilianCulturalMagnetism />
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
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          🇧🇷 Amazing Brazilian Culture
        </h2>
        <p className="text-xl text-gray-600 mb-6">
          Discover the incredible music, dancing, food, and nightlife that makes Brazilian culture absolutely magnetic
        </p>
        <div className="bg-gradient-to-r from-green-100 via-yellow-100 to-blue-100 rounded-xl p-6 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-lg">
            <span className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold">🎵 Infectious Rhythms</span>
            <span className="bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold">💃 Community Dancing</span>
            <span className="bg-orange-500 text-white px-4 py-2 rounded-full font-semibold">🍖 Amazing Food</span>
            <span className="bg-purple-500 text-white px-4 py-2 rounded-full font-semibold">🌃 Vibrant Nightlife</span>
          </div>
        </div>
        <p className="text-lg text-gray-700">
          <span className="font-semibold text-green-600">Brazil:</span> Where culture creates instant community and every gathering becomes a celebration
        </p>
      </div>

      {/* Category Navigation */}
      <div className="flex flex-wrap justify-center gap-2">
        {categoryTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id as any)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              selectedCategory === tab.id
                ? `bg-gradient-to-r ${tab.color} text-white shadow-lg transform scale-105`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Location Navigation (for venues) */}
      {(selectedCategory === 'venues' || selectedCategory === 'music_dance') && (
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
        <GradientBackground className="p-8 rounded-xl">
          <h3 className="text-3xl font-bold text-white mb-4">
            🎉 Experience Amazing Brazilian Culture in London
          </h3>
          <p className="text-blue-100 mb-6">
            Join the most vibrant community in London - where Brazilian music, dance, food, and nightlife create unforgettable connections
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
        </GradientBackground>
      </div>
    </div>
  )
}

export default BrazilianEliteCulturalShowcase