'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { geolocationService, GeolocationResult, BusinessDistance } from '@/lib/geolocation'
import { PortugueseBusiness } from '@/lib/businessDirectory'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { MapPinIcon as MapPinSolidIcon } from '@heroicons/react/24/solid'

interface NearMeButtonProps {
  businesses: PortugueseBusiness[]
  onLocationUpdate: (result: GeolocationResult, businessDistances: BusinessDistance[]) => void
  onPermissionDenied?: () => void
  radiusKm?: number
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const NearMeButton: React.FC<NearMeButtonProps> = ({
  businesses,
  onLocationUpdate,
  onPermissionDenied,
  radiusKm = 10,
  className = '',
  variant = 'primary',
  size = 'md'
}) => {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [permissionStatus, setPermissionStatus] = useState<'unknown' | 'granted' | 'denied' | 'prompt'>('unknown')

  // Check permission status on mount
  React.useEffect(() => {
    checkPermissionStatus()
  }, [])

  const checkPermissionStatus = async () => {
    const support = await geolocationService.checkGeolocationSupport()
    setPermissionStatus(support.permission)
  }

  const handleLocationRequest = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await geolocationService.getCurrentLocation()
      
      if (result.method === 'fallback') {
        setError(t('location.fallback_used', 'Using approximate location'))
      }

      // Calculate distances to businesses
      const businessDistances = geolocationService.getBusinessesWithinRadius(
        businesses,
        result.location,
        radiusKm
      )

      // Sort businesses by distance
      businessDistances.sort((a, b) => a.distance - b.distance)

      onLocationUpdate(result, businessDistances)

      // Update permission status based on result
      if (result.method === 'browser') {
        setPermissionStatus('granted')
      }

    } catch (error) {
      console.error('Location request failed:', error)
      setError(t('location.error', 'Unable to get your location'))
      
      if (error instanceof GeolocationPositionError) {
        if (error.code === error.PERMISSION_DENIED) {
          setPermissionStatus('denied')
          onPermissionDenied?.()
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  const getButtonVariantClasses = () => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
    
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm gap-1.5',
      md: 'px-4 py-2.5 text-sm gap-2',
      lg: 'px-6 py-3 text-base gap-2.5'
    }

    const variantClasses = {
      primary: 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 focus:ring-primary-500',
      secondary: 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500',
      outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500'
    }

    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`
  }

  const getStatusMessage = () => {
    if (error) {
      return error
    }

    if (permissionStatus === 'denied') {
      return t('location.permission_denied', 'Location access denied. Using approximate location.')
    }

    if (isLoading) {
      return t('location.getting_location', 'Getting your location...')
    }

    return null
  }

  const getButtonText = () => {
    if (isLoading) {
      return t('location.loading', 'Getting Location...')
    }

    if (permissionStatus === 'granted') {
      return t('location.update_location', 'Update Location')
    }

    return t('location.near_me', 'Near Me')
  }

  const getIcon = () => {
    if (isLoading) {
      return (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
      )
    }

    if (permissionStatus === 'granted') {
      return <MapPinSolidIcon className="w-4 h-4" />
    }

    return <MapPinIcon className="w-4 h-4" />
  }

  return (
    <div className="relative">
      <button
        onClick={handleLocationRequest}
        disabled={isLoading}
        className={`${getButtonVariantClasses()} ${className} ${
          isLoading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {getIcon()}
        <span>{getButtonText()}</span>
      </button>

      {/* Status Message */}
      {getStatusMessage() && (
        <div className={`absolute top-full mt-2 left-0 right-0 text-xs px-3 py-1 rounded-md z-10 ${
          error || permissionStatus === 'denied' 
            ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
            : 'bg-blue-100 text-blue-800 border border-blue-200'
        }`}>
          {getStatusMessage()}
        </div>
      )}

      {/* Help Text for First Time Users */}
      {permissionStatus === 'unknown' && (
        <div className="absolute top-full mt-2 left-0 right-0 text-xs text-gray-600 px-3 py-1 bg-gray-100 rounded-md border border-gray-200 z-10">
          {t('location.help_text', 'Find Portuguese businesses near your location')}
        </div>
      )}
    </div>
  )
}

export default NearMeButton

// Distance indicator component for business cards
interface DistanceIndicatorProps {
  distance: number
  className?: string
}

export const DistanceIndicator: React.FC<DistanceIndicatorProps> = ({ 
  distance, 
  className = '' 
}) => {
  const { language } = useLanguage()
  const distanceText = geolocationService.formatDistance(distance, language)

  return (
    <div className={`inline-flex items-center gap-1 text-sm text-gray-600 ${className}`}>
      <MapPinIcon className="w-4 h-4" />
      <span>{distanceText}</span>
    </div>
  )
}

// Radius selector component
interface RadiusSelectorProps {
  value: number
  onChange: (radius: number) => void
  options?: number[]
  className?: string
}

export const RadiusSelector: React.FC<RadiusSelectorProps> = ({
  value,
  onChange,
  options = [1, 2, 5, 10, 20],
  className = ''
}) => {
  const { t } = useLanguage()

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-gray-600 whitespace-nowrap">
        {t('location.radius', 'Radius:')}
      </span>
      <div className="flex gap-1">
        {options.map(radius => (
          <button
            key={radius}
            onClick={() => onChange(radius)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              value === radius
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {radius}km
          </button>
        ))}
      </div>
    </div>
  )
}