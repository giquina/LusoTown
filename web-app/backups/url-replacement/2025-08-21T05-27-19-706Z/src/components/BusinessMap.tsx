'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { PortugueseBusiness, BusinessCategory } from '@/lib/businessDirectory'
import { geolocationService, Location, LONDON_CENTER, PORTUGUESE_AREAS } from '@/lib/geolocation'
import NearMeButton, { RadiusSelector } from './NearMeButton'
import { 
  MapPinIcon, 
  BuildingStorefrontIcon, 
  PhoneIcon, 
  StarIcon as StarSolidIcon,
  XMarkIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

// Using Leaflet for OpenStreetMap integration (free alternative to Google Maps)
// Note: In a real implementation, you would install react-leaflet and leaflet packages
// For this example, we'll create the interface and structure

interface BusinessMapProps {
  businesses: PortugueseBusiness[]
  selectedBusiness?: PortugueseBusiness | null
  onBusinessSelect?: (business: PortugueseBusiness | null) => void
  center?: Location
  zoom?: number
  height?: string
  className?: string
  showClusters?: boolean
  showRadiusSelector?: boolean
  showNearMeButton?: boolean
}

interface BusinessMarker {
  business: PortugueseBusiness
  location: Location
  category: BusinessCategory
}

const BusinessMap: React.FC<BusinessMapProps> = ({
  businesses,
  selectedBusiness,
  onBusinessSelect,
  center = LONDON_CENTER,
  zoom = 12,
  height = '500px',
  className = '',
  showClusters = true,
  showRadiusSelector = true,
  showNearMeButton = true
}) => {
  const { t, language } = useLanguage()
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [mapReady, setMapReady] = useState(false)
  const [userLocation, setUserLocation] = useState<Location | null>(null)
  const [radiusKm, setRadiusKm] = useState(5)
  const [businessMarkers, setBusinessMarkers] = useState<BusinessMarker[]>([])
  const [selectedMarker, setSelectedMarker] = useState<BusinessMarker | null>(null)
  const [mapError, setMapError] = useState<string | null>(null)

  // Portuguese flag colors for markers
  const PORTUGUESE_COLORS = {
    primary: '#006600', // Green from Portuguese flag
    secondary: '#FF0000', // Red from Portuguese flag
    accent: '#FFD700', // Gold accent
    verified: '#008000',
    featured: '#FF4500'
  }

  // Category colors for business markers
  const getCategoryColor = (category: BusinessCategory): string => {
    const categoryColors: Record<BusinessCategory, string> = {
      restaurant: '#FF6B6B',
      cafe: '#8B4513',
      bakery: '#DEB887',
      grocery: '#32CD32',
      services: '#4169E1',
      travel: '#1E90FF',
      cultural_center: '#9932CC',
      healthcare: '#00CED1',
      legal: '#2F4F4F',
      education: '#FF8C00',
      beauty: '#FF69B4',
      retail: '#20B2AA',
      real_estate: '#B8860B',
      financial: '#2E8B57',
      consulting: '#4682B4',
      automotive: '#696969',
      home_services: '#CD853F',
      entertainment: '#DC143C',
      technology: '#00FF00'
    }
    return categoryColors[category] || PORTUGUESE_COLORS.primary
  }

  // Initialize map when component mounts
  useEffect(() => {
    initializeMap()
  }, [])

  // Update markers when businesses change
  useEffect(() => {
    updateBusinessMarkers()
  }, [businesses])

  // Update selected marker when selected business changes
  useEffect(() => {
    if (selectedBusiness) {
      const marker = businessMarkers.find(m => m.business.id === selectedBusiness.id)
      setSelectedMarker(marker || null)
    } else {
      setSelectedMarker(null)
    }
  }, [selectedBusiness, businessMarkers])

  const initializeMap = async () => {
    try {
      // In a real implementation, you would initialize Leaflet here
      // For this demo, we'll simulate map initialization
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMapReady(true)
    } catch (error) {
      console.error('Map initialization failed:', error)
      setMapError(t('map.initialization_error', 'Failed to load map'))
    }
  }

  const updateBusinessMarkers = async () => {
    const markers: BusinessMarker[] = []

    for (const business of businesses) {
      let location: Location | null = null

      // Try to get coordinates from business data
      if (business.latitude && business.longitude) {
        location = {
          latitude: business.latitude,
          longitude: business.longitude
        }
      } else {
        // Geocode the address
        location = await geolocationService.geocodeAddress(
          `${business.address}, ${business.postcode}, London`
        )
      }

      if (!location) {
        // Use approximate location based on London area
        location = geolocationService.getApproximateLocationForArea(business.londonArea)
      }

      if (location) {
        markers.push({
          business,
          location,
          category: business.category
        })
      }
    }

    setBusinessMarkers(markers)
  }

  const handleLocationUpdate = (result: any, businessDistances: any[]) => {
    setUserLocation(result.location)
    
    // Filter businesses within radius and update parent
    const nearbyBusinesses = businesses.filter(business =>
      businessDistances.some(bd => bd.businessId === business.id)
    )

    // You can emit this data to parent component if needed
    console.log('Nearby businesses:', nearbyBusinesses)
  }

  const handleMarkerClick = (marker: BusinessMarker) => {
    setSelectedMarker(marker)
    onBusinessSelect?.(marker.business)
  }

  const getBusinessImageUrl = (business: PortugueseBusiness): string => {
    return business.photos[0] || '/images/default-business.jpg'
  }

  const formatBusinessHours = (hours: string): string => {
    if (hours === 'Closed') {
      return language === 'pt' ? 'Fechado' : 'Closed'
    }
    return hours
  }

  const getRegionFlag = (region: string): string => {
    const flags: Record<string, string> = {
      portugal_mainland: '🇵🇹',
      portugal_azores: '🇵🇹',
      portugal_madeira: '🇵🇹',
      brazil: '🇧🇷',
      angola: '🇦🇴',
      mozambique: '🇲🇿',
      cape_verde: '🇨🇻',
      guinea_bissau: '🇬🇼',
      sao_tome_principe: '🇸🇹',
      east_timor: '🇹🇱',
      macau: '🇲🇴',
      portuguese_diaspora: '🌍'
    }
    return flags[region] || '🇵🇹'
  }

  if (mapError) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`} style={{ height }}>
        <div className="text-center p-8">
          <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t('map.error_title', 'Map Unavailable')}
          </h3>
          <p className="text-gray-600">
            {mapError}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {showNearMeButton && (
          <NearMeButton
            businesses={businesses}
            onLocationUpdate={handleLocationUpdate}
            radiusKm={radiusKm}
            variant="primary"
            size="sm"
          />
        )}
        
        {showRadiusSelector && (
          <div className="bg-white rounded-lg shadow-md p-3">
            <RadiusSelector
              value={radiusKm}
              onChange={setRadiusKm}
              options={[1, 2, 5, 10, 20]}
            />
          </div>
        )}
      </div>

      {/* Portuguese Areas Legend */}
      <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-md p-3 max-w-xs">
        <h4 className="font-medium text-sm mb-2 text-gray-900">
          {t('map.portuguese_areas', 'Portuguese Areas')}
        </h4>
        <div className="space-y-1">
          {Object.entries(PORTUGUESE_AREAS).map(([key, area]) => (
            <div key={key} className="flex items-center gap-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: PORTUGUESE_COLORS.accent }}
              />
              <span className="text-gray-700">{area.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div 
        ref={mapContainerRef}
        className="w-full bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center"
        style={{ height }}
      >
        {!mapReady ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-600">{t('map.loading', 'Loading map...')}</p>
          </div>
        ) : (
          <div className="w-full h-full relative">
            {/* Simulated Map View */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-yellow-50">
              {/* Thames River representation */}
              <div className="absolute inset-0">
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  <path 
                    d="M50,150 Q150,120 250,140 T350,160" 
                    stroke="#4A90E2" 
                    strokeWidth="8" 
                    fill="none"
                    opacity="0.6"
                  />
                </svg>
              </div>

              {/* Business Markers */}
              {businessMarkers.slice(0, 20).map((marker, index) => (
                <div
                  key={marker.business.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${20 + (index % 8) * 10}%`,
                    top: `${30 + Math.floor(index / 8) * 15}%`,
                  }}
                  onClick={() => handleMarkerClick(marker)}
                >
                  <div className="relative group">
                    <div 
                      className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center transform transition-transform group-hover:scale-110 ${
                        selectedMarker?.business.id === marker.business.id ? 'scale-125 ring-2 ring-primary-300' : ''
                      }`}
                      style={{ backgroundColor: getCategoryColor(marker.category) }}
                    >
                      <BuildingStorefrontIcon className="w-4 h-4 text-white" />
                    </div>
                    
                    {/* Verification badge */}
                    {marker.business.verificationStatus === 'verified' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                    )}

                    {/* Hover tooltip */}
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                      {marker.business.name}
                    </div>
                  </div>
                </div>
              ))}

              {/* User location marker */}
              {userLocation && (
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                >
                  <div className="relative">
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Business Details Popup */}
      {selectedMarker && (
        <div className="absolute bottom-4 left-4 right-4 z-20 bg-white rounded-lg shadow-xl border max-h-64 overflow-hidden">
          <div className="flex">
            {/* Business Image */}
            <div className="w-24 h-24 flex-shrink-0">
              <img 
                src={getBusinessImageUrl(selectedMarker.business)}
                alt={selectedMarker.business.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Business Details */}
            <div className="flex-1 p-4 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-gray-900 truncate">
                  {language === 'pt' && selectedMarker.business.namePortuguese 
                    ? selectedMarker.business.namePortuguese 
                    : selectedMarker.business.name}
                </h3>
                <button
                  onClick={() => {
                    setSelectedMarker(null)
                    onBusinessSelect?.(null)
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full flex-shrink-0"
                >
                  <XMarkIcon className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Rating and Region */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-600 ml-1">
                    {selectedMarker.business.rating}
                  </span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-600">
                  {getRegionFlag(selectedMarker.business.ownerRegion)}
                  {selectedMarker.business.ownerRegion.replace('_', ' ')}
                </span>
              </div>

              {/* Address and Phone */}
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPinIcon className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{selectedMarker.business.address}</span>
                </div>
                <div className="flex items-center gap-1">
                  <PhoneIcon className="w-3 h-3 flex-shrink-0" />
                  <span>{selectedMarker.business.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-4 pb-4 flex gap-2">
            <button className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-primary-600 hover:to-secondary-600 transition-all">
              {t('buttons.view_details', 'View Details')}
            </button>
            <button 
              onClick={() => window.open(`tel:${selectedMarker.business.phone}`, '_self')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <PhoneIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Map Attribution */}
      <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white bg-opacity-75 px-2 py-1 rounded">
        © OpenStreetMap contributors
      </div>
    </div>
  )
}

export default BusinessMap