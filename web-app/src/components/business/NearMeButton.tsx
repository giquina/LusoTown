'use client'

import React, { useState, useCallback } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { 
  geolocationService, 
  type Location, 
  type GeolocationResult,
  type BusinessDistance 
} from '@/lib/geolocation'
import type { BusinessCarouselItem } from '@/config/business-directory-carousels'
import {
  MapPinIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

interface NearMeButtonProps {
  businesses: BusinessCarouselItem[]
  onLocationUpdate: (result: GeolocationResult, businessDistances: BusinessDistance[]) => void
  radiusKm?: number
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

interface RadiusSelectorProps {
  value: number
  onChange: (value: number) => void
  options?: number[]
  className?: string
}

type LocationState = 'idle' | 'requesting' | 'granted' | 'denied' | 'error'

export default function NearMeButton({
  businesses,
  onLocationUpdate,
  radiusKm = 10,
  variant = 'primary',
  size = 'md',
  className = ''
}: NearMeButtonProps) {
  const { t, language } = useLanguage()
  const [locationState, setLocationState] = useState<LocationState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const getButtonStyles = () => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
    
    const sizeStyles = {
      sm: 'px-3 py-2 text-sm gap-2',
      md: 'px-4 py-2.5 text-sm gap-2',
      lg: 'px-6 py-3 text-base gap-3'
    }
    
    const variantStyles = {
      primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-sm',
      secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500 shadow-sm',
      outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-500'
    }
    
    return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`
  }

  const getLocationPermissionMessage = (state: LocationState): string => {
    const messages = {
      en: {
        idle: 'Find businesses near me',
        requesting: 'Requesting location...',
        granted: 'Location detected',
        denied: 'Location access denied',
        error: 'Location error'
      },
      pt: {
        idle: 'Encontrar negócios próximos',
        requesting: 'Solicitando localização...',
        granted: 'Localização detectada',
        denied: 'Acesso à localização negado',
        error: 'Erro de localização'
      }
    }
    
    return messages[language][state]
  }

  const handleLocationRequest = useCallback(async () => {
    if (locationState === 'requesting') return

    setLocationState('requesting')
    setErrorMessage(null)

    try {
      // Check geolocation support first
      const support = await geolocationService.checkGeolocationSupport()
      
      if (!support.supported) {
        throw new Error(
          language === 'pt' 
            ? 'Geolocalização não é suportada neste navegador' 
            : 'Geolocation is not supported in this browser'
        )
      }

      // Request current location
      const result = await geolocationService.getCurrentLocation()
      
      if (result.method === 'fallback') {
        setErrorMessage(
          language === 'pt'
            ? 'Usando localização aproximada de Londres'
            : 'Using approximate London location'
        )
      }

      // Calculate distances to businesses within radius
      const businessDistances = geolocationService.getBusinessesWithinRadius(
        businesses,
        result.location,
        radiusKm
      )

      // Update parent component
      onLocationUpdate(result, businessDistances)
      
      setLocationState('granted')

      // Show success message briefly
      setTimeout(() => {
        if (result.method === 'browser') {
          setErrorMessage(
            language === 'pt'
              ? `Encontrados ${businessDistances.length} negócios dentro de ${radiusKm}km`
              : `Found ${businessDistances.length} businesses within ${radiusKm}km`
          )
        }
      }, 500)

    } catch (error: any) {
      console.error('Location request failed:', error)
      setLocationState('error')
      
      const errorMsg = error.message || (
        language === 'pt'
          ? 'Não foi possível obter sua localização'
          : 'Unable to get your location'
      )
      
      setErrorMessage(errorMsg)

      // Reset state after error display
      setTimeout(() => {
        setLocationState('idle')
        setErrorMessage(null)
      }, 3000)
    }
  }, [businesses, radiusKm, onLocationUpdate, language, locationState])

  const getButtonIcon = () => {
    switch (locationState) {
      case 'requesting':
        return (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
        )
      case 'granted':
        return <CheckCircleIcon className="w-4 h-4" />
      case 'error':
      case 'denied':
        return <ExclamationTriangleIcon className="w-4 h-4" />
      default:
        return <MapPinIcon className="w-4 h-4" />
    }
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleLocationRequest}
        disabled={locationState === 'requesting'}
        className={`${getButtonStyles()} ${
          locationState === 'requesting' ? 'opacity-75 cursor-not-allowed' : ''
        } ${locationState === 'error' ? 'bg-red-500 hover:bg-red-600' : ''} ${
          locationState === 'granted' ? 'bg-green-500 hover:bg-green-600' : ''
        }`}
        title={getLocationPermissionMessage(locationState)}
      >
        {getButtonIcon()}
        <span className="hidden sm:inline">
          {getLocationPermissionMessage(locationState)}
        </span>
        <span className="sm:hidden">
          {language === 'pt' ? 'Próximo' : 'Near Me'}
        </span>
      </button>

      {/* Error/Success Message */}
      {errorMessage && (
        <div className={`absolute top-full mt-2 left-0 right-0 p-2 rounded-lg text-xs z-10 ${
          locationState === 'error' 
            ? 'bg-red-100 text-red-800 border border-red-200' 
            : 'bg-blue-100 text-blue-800 border border-blue-200'
        }`}>
          {errorMessage}
        </div>
      )}
    </div>
  )
}

/**
 * Radius Selector Component for adjusting search radius
 */
export function RadiusSelector({
  value,
  onChange,
  options = [1, 2, 5, 10, 20, 50],
  className = ''
}: RadiusSelectorProps) {
  const { t, language } = useLanguage()

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {language === 'pt' ? 'Raio de busca' : 'Search radius'}: {value}km
      </label>
      
      <div className="flex items-center space-x-2">
        <input
          type="range"
          min={Math.min(...options)}
          max={Math.max(...options)}
          step={1}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        
        <select
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {options.map(option => (
            <option key={option} value={option}>
              {option}km
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>{Math.min(...options)}km</span>
        <span>{Math.max(...options)}km</span>
      </div>
    </div>
  )
}

export { NearMeButton }