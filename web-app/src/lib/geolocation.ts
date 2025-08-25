'use client'

// Lusophone Business Directory Geolocation Service
// Handles user location detection and distance calculations

export interface Location {
  latitude: number
  longitude: number
}

export interface GeolocationResult {
  location: Location
  accuracy: number
  method: 'browser' | 'ip' | 'fallback'
}

export interface BusinessDistance {
  businessId: string
  distance: number // in kilometers
  distanceText: string // formatted distance text
}

// Default London center coordinates
export const LONDON_CENTER: Location = {
  latitude: 51.5074,
  longitude: -0.1278
}

// Lusophone cultural areas in London with coordinates
export const PORTUGUESE_AREAS = {
  vauxhall: { latitude: 51.4863, longitude: -0.1225, name: 'Vauxhall' },
  stockwell: { latitude: 51.4723, longitude: -0.1225, name: 'Stockwell' },
  golborne_road: { latitude: 51.5196, longitude: -0.2050, name: 'Golborne Road' },
  south_lambeth: { latitude: 51.4819, longitude: -0.1173, name: 'South Lambeth' },
  elephant_castle: { latitude: 51.4946, longitude: -0.0999, name: 'Elephant & Castle' }
}

export class GeolocationService {
  private static instance: GeolocationService
  private lastKnownLocation: Location | null = null
  private locationCache: Map<string, Location> = new Map()

  static getInstance(): GeolocationService {
    if (!GeolocationService.instance) {
      GeolocationService.instance = new GeolocationService()
    }
    return GeolocationService.instance
  }

  /**
   * Get user's current location with fallbacks
   */
  async getCurrentLocation(): Promise<GeolocationResult> {
    try {
      // Try browser geolocation first
      const browserLocation = await this.getBrowserLocation()
      if (browserLocation) {
        this.lastKnownLocation = browserLocation
        return {
          location: browserLocation,
          accuracy: 100, // Browser geolocation is most accurate
          method: 'browser'
        }
      }
    } catch (error) {
      console.warn('Browser geolocation failed:', error)
    }

    try {
      // Fallback to IP-based location
      const ipLocation = await this.getIPLocation()
      if (ipLocation) {
        this.lastKnownLocation = ipLocation
        return {
          location: ipLocation,
          accuracy: 50, // IP location is less accurate
          method: 'ip'
        }
      }
    } catch (error) {
      console.warn('IP geolocation failed:', error)
    }

    // Final fallback to London center
    this.lastKnownLocation = LONDON_CENTER
    return {
      location: LONDON_CENTER,
      accuracy: 0, // No accuracy for fallback
      method: 'fallback'
    }
  }

  /**
   * Get location using browser's geolocation API
   */
  private getBrowserLocation(): Promise<Location | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null)
        return
      }

      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes cache
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (error) => {
          console.warn('Browser geolocation error:', error)
          resolve(null)
        },
        options
      )
    })
  }

  /**
   * Get location using IP geolocation service
   */
  private async getIPLocation(): Promise<Location | null> {
    try {
      // Using ipapi.co as a free IP geolocation service
      const response = await fetch('https://ipapi.co/json/', {
        timeout: 5000
      })
      
      if (!response.ok) {
        throw new Error('IP geolocation service unavailable')
      }

      const data = await response.json()
      
      if (data.latitude && data.longitude) {
        return {
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude)
        }
      }
    } catch (error) {
      console.warn('IP geolocation failed:', error)
    }

    return null
  }

  /**
   * Check if geolocation is supported and permission status
   */
  async checkGeolocationSupport(): Promise<{
    supported: boolean
    permission: 'granted' | 'denied' | 'prompt' | 'unknown'
  }> {
    if (!navigator.geolocation) {
      return { supported: false, permission: 'unknown' }
    }

    try {
      if ('permissions' in navigator) {
        const permission = await navigator.permissions.query({ name: 'geolocation' })
        return { supported: true, permission: permission.state as any }
      }
    } catch (error) {
      console.warn('Permission query failed:', error)
    }

    return { supported: true, permission: 'unknown' }
  }

  /**
   * Request permission for geolocation
   */
  async requestLocationPermission(): Promise<boolean> {
    try {
      const result = await this.getBrowserLocation()
      return result !== null
    } catch (error) {
      console.warn('Location permission request failed:', error)
      return false
    }
  }

  /**
   * Calculate distance between two coordinates using Haversine formula
   */
  calculateDistance(point1: Location, point2: Location): number {
    const R = 6371 // Earth's radius in kilometers
    
    const dLat = this.toRadians(point2.latitude - point1.latitude)
    const dLon = this.toRadians(point2.longitude - point1.longitude)
    
    const lat1 = this.toRadians(point1.latitude)
    const lat2 = this.toRadians(point2.latitude)
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * 
              Math.cos(lat1) * Math.cos(lat2)
              
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    
    return R * c
  }

  /**
   * Format distance for display
   */
  formatDistance(distanceKm: number, language: 'en' | 'pt' = 'en'): string {
    if (distanceKm < 0.1) {
      return language === 'pt' ? 'Muito próximo' : 'Very close'
    }
    
    if (distanceKm < 1) {
      const meters = Math.round(distanceKm * 1000)
      return language === 'pt' ? `${meters}m` : `${meters}m`
    }
    
    if (distanceKm < 10) {
      return `${distanceKm.toFixed(1)}km`
    }
    
    return `${Math.round(distanceKm)}km`
  }

  /**
   * Get cached location or return null
   */
  getCachedLocation(): Location | null {
    return this.lastKnownLocation
  }

  /**
   * Geocode an address to coordinates
   */
  async geocodeAddress(address: string): Promise<Location | null> {
    // Check cache first
    if (this.locationCache.has(address)) {
      return this.locationCache.get(address) || null
    }

    try {
      // Using Nominatim (OpenStreetMap) for free geocoding
      const encodedAddress = encodeURIComponent(`${address}, London, United Kingdom`)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`,
        {
          headers: {
            'User-Agent': 'LusoTown Lusophone Business Directory'
          }
        }
      )

      if (!response.ok) {
        throw new Error('Geocoding service unavailable')
      }

      const data = await response.json()
      
      if (data && data.length > 0) {
        const location: Location = {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon)
        }
        
        // Cache the result
        this.locationCache.set(address, location)
        return location
      }
    } catch (error) {
      console.warn('Geocoding failed for address:', address, error)
    }

    return null
  }

  /**
   * Get businesses within radius
   */
  getBusinessesWithinRadius(
    businesses: any[], 
    centerLocation: Location, 
    radiusKm: number
  ): BusinessDistance[] {
    return businesses
      .map(business => {
        // Try to get business location from coordinates or geocode address
        let businessLocation: Location | null = null
        
        if (business.latitude && business.longitude) {
          businessLocation = {
            latitude: business.latitude,
            longitude: business.longitude
          }
        }
        
        if (!businessLocation) {
          // You would typically geocode the address here
          // For now, we'll use approximate locations for London areas
          const area = business.londonArea
          businessLocation = this.getApproximateLocationForArea(area)
        }

        if (!businessLocation) {
          return null
        }

        const distance = this.calculateDistance(centerLocation, businessLocation)
        
        if (distance <= radiusKm) {
          return {
            businessId: business.id,
            distance,
            distanceText: this.formatDistance(distance)
          }
        }
        
        return null
      })
      .filter(Boolean) as BusinessDistance[]
  }

  /**
   * Get approximate coordinates for London areas
   */
  getApproximateLocationForArea(area: string): Location {
    const areaCoordinates: Record<string, Location> = {
      central_london: { latitude: 51.5074, longitude: -0.1278 },
      north_london: { latitude: 51.5590, longitude: -0.1259 },
      south_london: { latitude: 51.4500, longitude: -0.1180 },
      east_london: { latitude: 51.5155, longitude: -0.0922 },
      west_london: { latitude: 51.5074, longitude: -0.1951 },
      northeast_london: { latitude: 51.5590, longitude: -0.0500 },
      northwest_london: { latitude: 51.5590, longitude: -0.2000 },
      southeast_london: { latitude: 51.4500, longitude: -0.0500 },
      southwest_london: { latitude: 51.4500, longitude: -0.2000 }
    }

    return areaCoordinates[area] || LONDON_CENTER
  }

  /**
   * Convert degrees to radians
   */
  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
  }

  /**
   * Clear location cache
   */
  clearCache(): void {
    this.locationCache.clear()
    this.lastKnownLocation = null
  }
}

export const geolocationService = GeolocationService.getInstance()