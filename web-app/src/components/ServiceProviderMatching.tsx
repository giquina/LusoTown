'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TruckIcon,
  BriefcaseIcon,
  HomeIcon,
  CalendarIcon,
  StarIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyPoundIcon,
  CheckCircleIcon,
  UserGroupIcon,
  SparklesIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'

interface ServiceProvider {
  id: string
  name: string
  type: 'transport' | 'tour_guide' | 'event_organizer' | 'business_service' | 'housing'
  rating: number
  reviews: number
  location: string
  priceRange: string
  availability: 'available' | 'busy' | 'unavailable'
  specialties: string[]
  culturalFocus: string[]
  languages: string[]
  verified: boolean
  matchCompatibility: number
  description: string
  responseTime: string
  bookingPrice?: number
  discount?: number
}

interface MatchProfile {
  id: string
  name: string
  location: string
  serviceNeeds?: string[]
  interests: string[]
  compatibility: number
}

interface ServiceProviderMatchingProps {
  className?: string
  matches: MatchProfile[]
  onServiceRequest?: (matchId: string, serviceType: string) => void
}

const mockServiceProviders: ServiceProvider[] = [
  {
    id: 'sp-1',
    name: 'Carlos Portuguese Tours',
    type: 'tour_guide',
    rating: 4.9,
    reviews: 127,
    location: 'Central London',
    priceRange: '£40-80',
    availability: 'available',
    specialties: ['Cultural Tours', 'Portuguese History', 'Hidden Gems'],
    culturalFocus: ['Portuguese Heritage', 'Fado Culture', 'Traditional Cuisine'],
    languages: ['Portuguese', 'English', 'Spanish'],
    verified: true,
    matchCompatibility: 95,
    description: 'Authentic Portuguese cultural tours with deep knowledge of London\'s Portuguese community.',
    responseTime: '< 2 hours',
    bookingPrice: 65,
    discount: 15
  },
  {
    id: 'sp-2',
    name: 'Ana\'s Executive Transport',
    type: 'transport',
    rating: 4.8,
    reviews: 89,
    location: 'London-wide',
    priceRange: '£25-50',
    availability: 'available',
    specialties: ['Airport Transfers', 'Event Transport', 'Cultural Tours'],
    culturalFocus: ['Portuguese Community', 'Cultural Events', 'Business Travel'],
    languages: ['Portuguese', 'English'],
    verified: true,
    matchCompatibility: 92,
    description: 'Luxury transport with Portuguese-speaking drivers for cultural events and business meetings.',
    responseTime: '< 1 hour',
    bookingPrice: 35,
    discount: 10
  },
  {
    id: 'sp-3',
    name: 'Portuguese Housing Solutions',
    type: 'housing',
    rating: 4.7,
    reviews: 156,
    location: 'Stockwell, Vauxhall, Camden',
    priceRange: '£800-2000',
    availability: 'available',
    specialties: ['Portuguese Areas', 'Short-term Rental', 'Community Housing'],
    culturalFocus: ['Portuguese Neighborhoods', 'Cultural Integration', 'Community Support'],
    languages: ['Portuguese', 'English'],
    verified: true,
    matchCompatibility: 88,
    description: 'Specialized housing services in Portuguese community areas with cultural support.',
    responseTime: '< 4 hours',
    bookingPrice: 1200,
    discount: 5
  },
  {
    id: 'sp-4',
    name: 'Fado Events & Entertainment',
    type: 'event_organizer',
    rating: 4.9,
    reviews: 203,
    location: 'London',
    priceRange: '£200-800',
    availability: 'busy',
    specialties: ['Fado Nights', 'Cultural Events', 'Private Parties'],
    culturalFocus: ['Traditional Music', 'Portuguese Culture', 'Authentic Experiences'],
    languages: ['Portuguese', 'English'],
    verified: true,
    matchCompatibility: 94,
    description: 'Authentic Portuguese cultural events and entertainment with traditional Fado performances.',
    responseTime: '< 3 hours',
    bookingPrice: 450,
    discount: 20
  },
  {
    id: 'sp-5',
    name: 'Portuguese Business Consultancy',
    type: 'business_service',
    rating: 4.6,
    reviews: 78,
    location: 'City of London',
    priceRange: '£100-300',
    availability: 'available',
    specialties: ['Business Setup', 'Legal Services', 'Tax Consultation'],
    culturalFocus: ['Portuguese Entrepreneurs', 'UK Business Law', 'Cross-border Trade'],
    languages: ['Portuguese', 'English'],
    verified: true,
    matchCompatibility: 85,
    description: 'Professional business services for Portuguese entrepreneurs and professionals in the UK.',
    responseTime: '< 6 hours',
    bookingPrice: 200,
    discount: 12
  }
]

export default function ServiceProviderMatching({
  className = '',
  matches,
  onServiceRequest
}: ServiceProviderMatchingProps) {
  const { language } = useLanguage()
  const { membershipTier, hasActiveSubscription } = useSubscription()
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null)
  const [serviceFilter, setServiceFilter] = useState<'all' | 'transport' | 'tour_guide' | 'event_organizer' | 'business_service' | 'housing'>('all')
  const [sortBy, setSortBy] = useState<'compatibility' | 'rating' | 'price'>('compatibility')
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null)

  const isPortuguese = language === 'pt'
  const isPremiumUser = hasActiveSubscription && (membershipTier === 'community' || membershipTier === 'ambassador')

  // Calculate match-specific compatibility for service providers
  const getProviderCompatibilityForMatch = (provider: ServiceProvider, match: MatchProfile): number => {
    let compatibility = provider.matchCompatibility * 0.6 // Base provider compatibility
    
    // Service needs matching
    if (match.serviceNeeds) {
      const serviceMatches = match.serviceNeeds.filter(need => 
        provider.specialties.some(specialty => 
          specialty.toLowerCase().includes(need.toLowerCase()) ||
          need.toLowerCase().includes(specialty.toLowerCase())
        )
      ).length
      compatibility += serviceMatches * 10
    }
    
    // Interest matching with cultural focus
    const interestMatches = match.interests.filter(interest =>
      provider.culturalFocus.some(focus =>
        focus.toLowerCase().includes(interest.toLowerCase()) ||
        interest.toLowerCase().includes(focus.toLowerCase())
      )
    ).length
    compatibility += interestMatches * 8
    
    // Location proximity bonus
    if (provider.location.toLowerCase().includes(match.location.toLowerCase()) ||
        match.location.toLowerCase().includes(provider.location.toLowerCase())) {
      compatibility += 15
    }
    
    return Math.min(100, Math.round(compatibility))
  }

  // Filter and sort providers based on selected match
  const filteredProviders = useMemo(() => {
    let providers = mockServiceProviders
    
    if (serviceFilter !== 'all') {
      providers = providers.filter(p => p.type === serviceFilter)
    }
    
    // Calculate compatibility for selected match
    if (selectedMatch) {
      const match = matches.find(m => m.id === selectedMatch)
      if (match) {
        providers = providers.map(provider => ({
          ...provider,
          calculatedCompatibility: getProviderCompatibilityForMatch(provider, match)
        }))
      }
    }
    
    // Sort providers
    return providers.sort((a, b) => {
      switch (sortBy) {
        case 'compatibility':
          const aCompat = selectedMatch ? (a as any).calculatedCompatibility || a.matchCompatibility : a.matchCompatibility
          const bCompat = selectedMatch ? (b as any).calculatedCompatibility || b.matchCompatibility : b.matchCompatibility
          return bCompat - aCompat
        case 'rating':
          return b.rating - a.rating
        case 'price':
          return (a.bookingPrice || 0) - (b.bookingPrice || 0)
        default:
          return 0
      }
    })
  }, [serviceFilter, sortBy, selectedMatch, matches])

  const getServiceTypeIcon = (type: ServiceProvider['type']) => {
    switch (type) {
      case 'transport': return TruckIcon
      case 'tour_guide': return MapPinIcon
      case 'event_organizer': return CalendarIcon
      case 'business_service': return BriefcaseIcon
      case 'housing': return HomeIcon
      default: return SparklesIcon
    }
  }

  const getServiceTypeLabel = (type: ServiceProvider['type']) => {
    switch (type) {
      case 'transport': return isPortuguese ? 'Transporte' : 'Transport'
      case 'tour_guide': return isPortuguese ? 'Guia Turístico' : 'Tour Guide'
      case 'event_organizer': return isPortuguese ? 'Eventos' : 'Events'
      case 'business_service': return isPortuguese ? 'Negócios' : 'Business'
      case 'housing': return isPortuguese ? 'Habitação' : 'Housing'
      default: return isPortuguese ? 'Serviço' : 'Service'
    }
  }

  const getAvailabilityColor = (availability: ServiceProvider['availability']) => {
    switch (availability) {
      case 'available': return 'text-action-600 bg-green-100'
      case 'busy': return 'text-yellow-600 bg-yellow-100'
      case 'unavailable': return 'text-coral-600 bg-red-100'
    }
  }

  const getAvailabilityLabel = (availability: ServiceProvider['availability']) => {
    switch (availability) {
      case 'available': return isPortuguese ? 'Disponível' : 'Available'
      case 'busy': return isPortuguese ? 'Ocupado' : 'Busy'
      case 'unavailable': return isPortuguese ? 'Indisponível' : 'Unavailable'
    }
  }

  const handleServiceRequest = (provider: ServiceProvider) => {
    if (!selectedMatch) {
      toast.error(isPortuguese ? 'Selecione um match primeiro' : 'Please select a match first')
      return
    }
    
    setSelectedProvider(provider)
    setShowRequestModal(true)
  }

  const confirmServiceRequest = () => {
    if (selectedProvider && selectedMatch) {
      onServiceRequest?.(selectedMatch, selectedProvider.type)
      setShowRequestModal(false)
      setSelectedProvider(null)
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Service Provider Matching Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-secondary-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TruckIcon className="w-5 h-5 text-secondary-500" />
          {isPortuguese ? 'Fornecedores de Serviços Compatíveis' : 'Compatible Service Providers'}
        </h2>
        
        {/* Match Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            {isPortuguese ? 'Selecionar Match para Recomendações' : 'Select Match for Recommendations'}
          </label>
          <select
            value={selectedMatch || ''}
            onChange={(e) => setSelectedMatch(e.target.value || null)}
            className="w-full md:w-auto rounded-lg border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">{isPortuguese ? 'Todos os Matches' : 'All Matches'}</option>
            {matches.map(match => (
              <option key={match.id} value={match.id}>
                {match.name} - {match.location}
              </option>
            ))}
          </select>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Service Type Filter */}
          <div className="flex gap-2 overflow-x-auto">
            {['all', 'transport', 'tour_guide', 'event_organizer', 'business_service', 'housing'].map(type => (
              <button
                key={type}
                onClick={() => setServiceFilter(type as any)}
                className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  serviceFilter === type
                    ? 'bg-secondary-500 text-white'
                    : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                }`}
              >
                {type === 'all' ? (isPortuguese ? 'Todos' : 'All') : getServiceTypeLabel(type as any)}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-lg border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="compatibility">{isPortuguese ? 'Compatibilidade' : 'Compatibility'}</option>
            <option value="rating">{isPortuguese ? 'Avaliação' : 'Rating'}</option>
            <option value="price">{isPortuguese ? 'Preço' : 'Price'}</option>
          </select>
        </div>

        {/* Selected Match Info */}
        {selectedMatch && (
          <div className="bg-primary-50 rounded-lg p-4 mb-6 border border-primary-200">
            {(() => {
              const match = matches.find(m => m.id === selectedMatch)
              return match ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {match.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-900">{match.name}</h4>
                    <p className="text-sm text-primary-700">
                      {isPortuguese ? 'Procurando serviços em' : 'Looking for services in'} {match.location}
                    </p>
                    {match.serviceNeeds && (
                      <div className="flex gap-2 mt-2">
                        {match.serviceNeeds.map(need => (
                          <span key={need} className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">
                            {need}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : null
            })()}
          </div>
        )}
      </div>

      {/* Service Providers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.map(provider => {
          const IconComponent = getServiceTypeIcon(provider.type)
          const compatibility = selectedMatch ? 
            (provider as any).calculatedCompatibility || provider.matchCompatibility : 
            provider.matchCompatibility

          return (
            <motion.div
              key={provider.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-sm border border-secondary-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Provider Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-secondary-400 to-accent-400 rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                      <p className="text-sm text-secondary-600">{getServiceTypeLabel(provider.type)}</p>
                    </div>
                  </div>
                  
                  {provider.verified && (
                    <CheckCircleIcon className="w-5 h-5 text-primary-500" />
                  )}
                </div>

                {/* Compatibility Score */}
                {selectedMatch && (
                  <div className="mb-4 p-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border border-primary-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary-700">
                        {isPortuguese ? 'Compatibilidade com Match' : 'Match Compatibility'}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold text-primary-600">{compatibility}%</div>
                        <HeartIcon className="w-4 h-4 text-coral-500" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Rating and Reviews */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{provider.rating}</span>
                    <span className="text-sm text-secondary-600">({provider.reviews})</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(provider.availability)}`}>
                    {getAvailabilityLabel(provider.availability)}
                  </span>
                </div>

                {/* Location and Price */}
                <div className="flex items-center justify-between mb-3 text-sm text-secondary-600">
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" />
                    {provider.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <CurrencyPoundIcon className="w-4 h-4" />
                    {provider.priceRange}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-secondary-700 mb-4 line-clamp-2">{provider.description}</p>

                {/* Specialties */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {provider.specialties.slice(0, 3).map(specialty => (
                      <span key={specialty} className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full text-xs">
                        {specialty}
                      </span>
                    ))}
                    {provider.specialties.length > 3 && (
                      <span className="text-xs text-gray-500">+{provider.specialties.length - 3}</span>
                    )}
                  </div>
                </div>

                {/* Cultural Focus */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {provider.culturalFocus.slice(0, 2).map(focus => (
                      <span key={focus} className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Response Time and Pricing */}
                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="flex items-center gap-1 text-secondary-600">
                    <ClockIcon className="w-4 h-4" />
                    {provider.responseTime}
                  </div>
                  {provider.discount && isPremiumUser && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      {provider.discount}% {isPortuguese ? 'desconto' : 'off'}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 pb-6">
                <div className="space-y-2">
                  <button
                    onClick={() => handleServiceRequest(provider)}
                    disabled={provider.availability === 'unavailable' || !selectedMatch}
                    className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                      provider.availability === 'unavailable' || !selectedMatch
                        ? 'bg-secondary-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-secondary-500 to-accent-500 text-white hover:from-secondary-600 hover:to-accent-600'
                    }`}
                  >
                    {isPortuguese ? 'Solicitar Serviço' : 'Request Service'}
                  </button>
                  
                  {provider.bookingPrice && (
                    <div className="text-center text-sm text-secondary-600">
                      {isPortuguese ? 'A partir de' : 'Starting from'} £{provider.bookingPrice}
                      {provider.discount && isPremiumUser && (
                        <span className="text-action-600 ml-1">
                          (£{Math.round(provider.bookingPrice * (1 - provider.discount / 100))})
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Service Request Modal */}
      <AnimatePresence>
        {showRequestModal && selectedProvider && selectedMatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRequestModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {isPortuguese ? 'Confirmar Solicitação' : 'Confirm Service Request'}
              </h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <span className="text-sm text-secondary-600">{isPortuguese ? 'Fornecedor' : 'Provider'}:</span>
                  <p className="font-semibold text-gray-900">{selectedProvider.name}</p>
                </div>
                
                <div>
                  <span className="text-sm text-secondary-600">{isPortuguese ? 'Serviço' : 'Service'}:</span>
                  <p className="font-semibold text-gray-900">{getServiceTypeLabel(selectedProvider.type)}</p>
                </div>
                
                <div>
                  <span className="text-sm text-secondary-600">{isPortuguese ? 'Para Match' : 'For Match'}:</span>
                  <p className="font-semibold text-gray-900">
                    {matches.find(m => m.id === selectedMatch)?.name}
                  </p>
                </div>
                
                {selectedProvider.bookingPrice && (
                  <div>
                    <span className="text-sm text-secondary-600">{isPortuguese ? 'Preço Estimado' : 'Estimated Price'}:</span>
                    <p className="font-semibold text-gray-900">
                      £{selectedProvider.bookingPrice}
                      {selectedProvider.discount && isPremiumUser && (
                        <span className="text-action-600 ml-2">
                          ({selectedProvider.discount}% {isPortuguese ? 'desconto' : 'discount'})
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 bg-secondary-100 text-secondary-700 py-2 px-4 rounded-lg font-semibold hover:bg-secondary-200 transition-colors"
                >
                  {isPortuguese ? 'Cancelar' : 'Cancel'}
                </button>
                <button
                  onClick={confirmServiceRequest}
                  className="flex-1 bg-gradient-to-r from-secondary-500 to-accent-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-secondary-600 hover:to-accent-600 transition-all"
                >
                  {isPortuguese ? 'Confirmar' : 'Confirm'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Benefits */}
      {!isPremiumUser && (
        <div className="bg-gradient-to-r from-secondary-50 to-accent-50 rounded-2xl p-6 border border-secondary-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isPortuguese ? 'Benefícios Premium para Serviços' : 'Premium Service Benefits'}
              </h3>
              <ul className="text-sm text-secondary-600 space-y-1">
                <li>• {isPortuguese ? 'Descontos exclusivos nos serviços' : 'Exclusive service discounts'}</li>
                <li>• {isPortuguese ? 'Prioridade nas reservas' : 'Priority booking'}</li>
                <li>• {isPortuguese ? 'Recomendações personalizadas' : 'Personalized recommendations'}</li>
              </ul>
            </div>
            <button className="bg-secondary-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-secondary-600 transition-colors">
              {isPortuguese ? 'Upgrade' : 'Upgrade'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}