'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useHeritage } from '@/context/HeritageContext'

interface Business {
  id: string
  name: string
  business_type: string
  address: string
  coordinates?: [number, number]
  cultural_focus: string
  portuguese_specialties: string[]
  average_rating: number
  is_premium: boolean
  is_verified: boolean
}

interface BusinessMapProps {
  businesses: Business[]
  userLocation?: {
    latitude: number
    longitude: number
  }
  onBusinessSelect?: (business: Business) => void
  height?: string
  className?: string
}

export default function BusinessMap({
  businesses,
  userLocation,
  onBusinessSelect,
  height = '400px',
  className = ''
}: BusinessMapProps) {
  const { t } = useLanguage()
  const { colors } = useHeritage()
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mapInstance, setMapInstance] = useState<any>(null)
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null)

  // Initialize map when component mounts
  useEffect(() => {
    const initializeMap = async () => {
      try {
        // Check if Google Maps is available
        if (typeof window !== 'undefined' && window.google && window.google.maps) {
          createMap()
        } else {
          // Load Google Maps API dynamically
          await loadGoogleMapsAPI()
          createMap()
        }
      } catch (error) {
        console.error('Failed to initialize map:', error)
        setError('Failed to load map')
        setIsLoading(false)
      }
    }

    initializeMap()
  }, [])

  // Update markers when businesses change
  useEffect(() => {
    if (mapInstance && businesses.length > 0) {
      updateMapMarkers()
    }
  }, [mapInstance, businesses])

  const loadGoogleMapsAPI = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        resolve()
        return
      }

      const script = document.createElement('script')
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      
      if (!apiKey) {
        // Fallback to OpenStreetMap or show static map
        setError('Google Maps API key not configured')
        reject(new Error('Google Maps API key not configured'))
        return
      }

      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`
      script.async = true
      script.defer = true
      
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Failed to load Google Maps API'))
      
      document.head.appendChild(script)
    })
  }

  const createMap = () => {
    if (!mapRef.current) return

    // Default center (London)
    const defaultCenter = { lat: 51.5074, lng: -0.1278 }
    const center = userLocation 
      ? { lat: userLocation.latitude, lng: userLocation.longitude }
      : businesses.length > 0 && businesses[0].coordinates
        ? { lat: businesses[0].coordinates[1], lng: businesses[0].coordinates[0] }
        : defaultCenter

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: userLocation ? 12 : 10,
      styles: [
        {
          featureType: 'poi.business',
          stylers: [{ visibility: 'off' }]
        },
        {
          featureType: 'poi.medical',
          stylers: [{ visibility: 'off' }]
        }
      ],
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true
    })

    // Add user location marker if available
    if (userLocation) {
      new window.google.maps.Marker({
        position: { lat: userLocation.latitude, lng: userLocation.longitude },
        map,
        title: t('map.your_location', 'Your Location'),
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="${colors.primary}" stroke="white" stroke-width="2"/>
              <circle cx="12" cy="12" r="4" fill="white"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(24, 24),
          anchor: new window.google.maps.Point(12, 12)
        }
      })
    }

    setMapInstance(map)
    setIsLoading(false)
  }

  const updateMapMarkers = () => {
    if (!mapInstance) return

    const bounds = new window.google.maps.LatLngBounds()
    const infoWindow = new window.google.maps.InfoWindow()

    // Add user location to bounds
    if (userLocation) {
      bounds.extend(new window.google.maps.LatLng(userLocation.latitude, userLocation.longitude))
    }

    businesses.forEach((business) => {
      if (!business.coordinates) return

      const [lng, lat] = business.coordinates
      const position = { lat, lng }

      // Add to bounds
      bounds.extend(position)

      // Get cultural focus color
      const getMarkerColor = (culturalFocus: string) => {
        switch (culturalFocus) {
          case 'portugal': return '#1e40af' // Blue
          case 'brazil': return '#059669' // Green
          case 'africa': return '#f59e0b' // Yellow
          default: return '#6b7280' // Gray
        }
      }

      // Create custom marker
      const marker = new window.google.maps.Marker({
        position,
        map: mapInstance,
        title: business.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0C7.163 0 0 7.163 0 16c0 16 16 26 16 26s16-10 16-26C32 7.163 24.837 0 16 0z" fill="${getMarkerColor(business.cultural_focus)}"/>
              <circle cx="16" cy="16" r="8" fill="white"/>
              <circle cx="16" cy="16" r="4" fill="${getMarkerColor(business.cultural_focus)}"/>
              ${business.is_premium ? '<circle cx="24" cy="8" r="4" fill="#fbbf24" stroke="white" stroke-width="1"/>' : ''}
              ${business.is_verified ? '<circle cx="8" cy="8" r="4" fill="#10b981" stroke="white" stroke-width="1"/>' : ''}
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 42),
          anchor: new window.google.maps.Point(16, 42)
        }
      })

      // Info window content
      const infoWindowContent = `
        <div class="p-3 max-w-xs">
          <div class="flex items-center space-x-2 mb-2">
            <h3 class="font-semibold text-gray-900">${business.name}</h3>
            ${business.is_verified ? '<span class="text-blue-500" title="Verified">✓</span>' : ''}
            ${business.is_premium ? '<span class="text-yellow-500" title="Premium">⭐</span>' : ''}
          </div>
          <p class="text-sm text-gray-600 mb-2">${business.address}</p>
          <div class="flex items-center space-x-2 mb-2">
            <span class="text-sm text-gray-500 capitalize">${business.business_type.replace('_', ' ')}</span>
            ${business.average_rating > 0 ? 
              `<span class="text-sm text-yellow-500">★ ${business.average_rating.toFixed(1)}</span>` : 
              ''
            }
          </div>
          ${business.portuguese_specialties.length > 0 ? 
            `<div class="flex flex-wrap gap-1 mb-2">
              ${business.portuguese_specialties.slice(0, 2).map(specialty => 
                `<span class="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">${specialty.replace('_', ' ')}</span>`
              ).join('')}
              ${business.portuguese_specialties.length > 2 ? 
                `<span class="text-xs text-gray-500">+${business.portuguese_specialties.length - 2} more</span>` : 
                ''
              }
            </div>` : 
            ''
          }
          <button 
            onclick="window.selectBusiness('${business.id}')" 
            class="w-full mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            ${t('business.view_details', 'View Details')}
          </button>
        </div>
      `

      // Add click listener to marker
      marker.addListener('click', () => {
        infoWindow.setContent(infoWindowContent)
        infoWindow.open(mapInstance, marker)
        setSelectedBusiness(business)
      })
    })

    // Fit map to show all markers
    if (businesses.length > 0 || userLocation) {
      mapInstance.fitBounds(bounds)
      
      // Ensure minimum zoom level
      const listener = window.google.maps.event.addListener(mapInstance, 'idle', () => {
        if (mapInstance.getZoom() > 15) mapInstance.setZoom(15)
        window.google.maps.event.removeListener(listener)
      })
    }

    // Global function for info window buttons
    window.selectBusiness = (businessId: string) => {
      const business = businesses.find(b => b.id === businessId)
      if (business && onBusinessSelect) {
        onBusinessSelect(business)
      }
    }
  }

  // Fallback static map component
  const StaticMapFallback = () => (
    <div 
      className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`}
      style={{ height }}
    >
      <div className="text-center">
        <div className="text-4xl mb-4">🗺️</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {t('map.unavailable', 'Map Unavailable')}
        </h3>
        <p className="text-gray-600 text-sm max-w-xs">
          {error || t('map.fallback_message', 'Interactive map could not be loaded. Business locations are shown below.')}
        </p>
        <div className="mt-4 space-y-2">
          {businesses.slice(0, 3).map((business) => (
            <div key={business.id} className="text-sm text-gray-700">
              📍 {business.name} - {business.address}
            </div>
          ))}
          {businesses.length > 3 && (
            <div className="text-xs text-gray-500">
              +{businesses.length - 3} more businesses
            </div>
          )}
        </div>
      </div>
    </div>
  )

  if (error) {
    return <StaticMapFallback />
  }

  return (
    <div className="relative">
      {isLoading && (
        <div 
          className={`absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center z-10 ${className}`}
          style={{ height }}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">{t('map.loading', 'Loading map...')}</p>
          </div>
        </div>
      )}
      
      <div
        ref={mapRef}
        className={`w-full rounded-lg ${className}`}
        style={{ height }}
      />

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-20">
        <h4 className="text-xs font-semibold text-gray-700 mb-2">
          {t('map.legend', 'Legend')}
        </h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span>🇵🇹 {t('map.portugal', 'Portuguese')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
            <span>🇧🇷 {t('map.brazilian', 'Brazilian')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
            <span>🌍 {t('map.african', 'African')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-500">⭐</span>
            <span>{t('map.premium', 'Premium')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-blue-500">✓</span>
            <span>{t('map.verified', 'Verified')}</span>
          </div>
        </div>
      </div>

      {/* Selected Business Info */}
      {selectedBusiness && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-20">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">{selectedBusiness.name}</h3>
            <button
              onClick={() => setSelectedBusiness(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-2">{selectedBusiness.address}</p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 capitalize">
              {selectedBusiness.business_type.replace('_', ' ')}
            </span>
            {selectedBusiness.average_rating > 0 && (
              <span className="text-sm text-yellow-500">
                ★ {selectedBusiness.average_rating.toFixed(1)}
              </span>
            )}
          </div>
          {onBusinessSelect && (
            <button
              onClick={() => onBusinessSelect(selectedBusiness)}
              className="w-full mt-3 px-3 py-2 text-white text-sm rounded hover:opacity-90"
              style={{ backgroundColor: colors.primary }}
            >
              {t('business.view_details', 'View Details')}
            </button>
          )}
        </div>
      )}
    </div>
  )
}