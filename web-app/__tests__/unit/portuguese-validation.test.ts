/**
 * Portuguese validation and utility function tests
 * Tests core Portuguese-speaking community validation logic
 */

import '@testing-library/jest-dom'

// Portuguese name validation function
function validatePortugueseName(name: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!name || name.trim().length === 0) {
    errors.push('Name is required')
    return { isValid: false, errors }
  }
  
  if (name.length < 2) {
    errors.push('Name must be at least 2 characters')
  }
  
  if (name.length > 100) {
    errors.push('Name must be less than 100 characters')
  }
  
  // Portuguese name pattern (allows accented characters)
  const portugueseNamePattern = /^[A-Za-zÀ-ÿçÇãõÃÕáéíóúàèìòù\s'-]+$/
  if (!portugueseNamePattern.test(name)) {
    errors.push('Name contains invalid characters')
  }
  
  return { isValid: errors.length === 0, errors }
}

// Portuguese business category validation
function validateBusinessCategory(category: string): boolean {
  const validCategories = [
    'restaurant',
    'cafe',
    'grocery',
    'bakery',
    'clothing',
    'services',
    'healthcare',
    'education',
    'entertainment',
    'professional_services',
    'cultural_center',
    'religious_organization',
    'sports_recreation',
    'travel_tourism',
    'media_communication',
    'other'
  ]
  
  return validCategories.includes(category)
}

// Portuguese phone number validation (UK format)
function validateUKPhoneNumber(phone: string): boolean {
  // UK phone patterns including mobile and landline
  const ukPhonePatterns = [
    /^\+44\s?\d{2,4}\s?\d{6,8}$/, // +44 format
    /^0\d{2,4}\s?\d{6,8}$/, // 0 format
    /^\d{11}$/ // Simple 11 digit format
  ]
  
  return ukPhonePatterns.some(pattern => pattern.test(phone.replace(/\s/g, '')))
}

// Portuguese text sanitization while preserving cultural terms
function sanitizePortugueseText(text: string): string {
  if (!text) return ''
  
  // Preserve Portuguese cultural terms
  const culturalTerms = ['Fado', 'Saudade', 'Pastéis de Nata', 'Santos Populares']
  
  // Basic HTML sanitization
  let sanitized = text
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .trim()
  
  // Ensure cultural terms are preserved in correct case
  culturalTerms.forEach(term => {
    const regex = new RegExp(term, 'gi')
    sanitized = sanitized.replace(regex, term)
  })
  
  return sanitized
}

// Distance calculation for Portuguese businesses
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
           Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
           Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

describe('Portuguese Validation Functions', () => {
  describe('validatePortugueseName', () => {
    it('validates simple Portuguese names', () => {
      const result = validatePortugueseName('João Silva')
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })
    
    it('validates names with Portuguese accented characters', () => {
      const names = [
        'José António',
        'Maria João',
        'Luís Cândido',
        'Conceição Santos',
        'João Soares'
      ]
      
      names.forEach(name => {
        const result = validatePortugueseName(name)
        expect(result.isValid).toBe(true)
        expect(result.errors).toHaveLength(0)
      })
    })
    
    it('rejects empty names', () => {
      const result = validatePortugueseName('')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Name is required')
    })
    
    it('rejects names that are too short', () => {
      const result = validatePortugueseName('A')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Name must be at least 2 characters')
    })
    
    it('rejects names with invalid characters', () => {
      const result = validatePortugueseName('João123')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Name contains invalid characters')
    })
    
    it('allows Portuguese special characters', () => {
      const result = validatePortugueseName('José Luís Martínez')
      expect(result.isValid).toBe(true)
    })
  })
  
  describe('validateBusinessCategory', () => {
    it('validates standard business categories', () => {
      const validCategories = [
        'restaurant',
        'cafe',
        'grocery',
        'services',
        'healthcare'
      ]
      
      validCategories.forEach(category => {
        expect(validateBusinessCategory(category)).toBe(true)
      })
    })
    
    it('validates Portuguese-specific categories', () => {
      const portugueseCategories = [
        'cultural_center',
        'religious_organization',
        'travel_tourism'
      ]
      
      portugueseCategories.forEach(category => {
        expect(validateBusinessCategory(category)).toBe(true)
      })
    })
    
    it('rejects invalid categories', () => {
      const invalidCategories = [
        'invalid_category',
        'random_string',
        '',
        'RESTAURANT' // case sensitive
      ]
      
      invalidCategories.forEach(category => {
        expect(validateBusinessCategory(category)).toBe(false)
      })
    })
  })
  
  describe('validateUKPhoneNumber', () => {
    it('validates UK phone numbers with +44 prefix', () => {
      const validNumbers = [
        '+44 20 1234 5678',
        '+44 7700 123456',
        '+44 161 123 4567'
      ]
      
      validNumbers.forEach(number => {
        expect(validateUKPhoneNumber(number)).toBe(true)
      })
    })
    
    it('validates UK phone numbers with 0 prefix', () => {
      const validNumbers = [
        '020 1234 5678',
        '07700 123456',
        '0161 123 4567'
      ]
      
      validNumbers.forEach(number => {
        expect(validateUKPhoneNumber(number)).toBe(true)
      })
    })
    
    it('rejects invalid phone numbers', () => {
      const invalidNumbers = [
        '123',
        '+1 555 123 4567', // US number
        'abc def ghij'
      ]
      
      invalidNumbers.forEach(number => {
        expect(validateUKPhoneNumber(number)).toBe(false)
      })
    })
  })
  
  describe('sanitizePortugueseText', () => {
    it('removes HTML tags', () => {
      const input = 'Hello <script>alert("XSS")</script> World'
      const result = sanitizePortugueseText(input)
      expect(result).toBe('Hello  World')
      expect(result).not.toContain('<script>')
    })
    
    it('preserves Portuguese cultural terms', () => {
      const input = 'I love <b>fado</b> and <em>saudade</em>'
      const result = sanitizePortugueseText(input)
      expect(result).toContain('Fado')
      expect(result).toContain('Saudade')
      expect(result).not.toContain('<b>')
      expect(result).not.toContain('<em>')
    })
    
    it('removes javascript: protocols', () => {
      const input = 'Click javascript:alert("XSS") here'
      const result = sanitizePortugueseText(input)
      expect(result).not.toContain('javascript:')
    })
    
    it('handles empty input', () => {
      expect(sanitizePortugueseText('')).toBe('')
      expect(sanitizePortugueseText(null as any)).toBe('')
      expect(sanitizePortugueseText(undefined as any)).toBe('')
    })
    
    it('preserves Pastéis de Nata correctly', () => {
      const input = 'We serve delicious <span>pastéis de nata</span>'
      const result = sanitizePortugueseText(input)
      expect(result).toContain('Pastéis de Nata')
    })
  })
  
  describe('calculateDistance', () => {
    it('calculates distance between London locations', () => {
      // London coordinates
      const londonLat = 51.5074
      const londonLng = -0.1278
      
      // Camberwell coordinates (approximate)
      const camberwellLat = 51.4744
      const camberwellLng = -0.0877
      
      const distance = calculateDistance(londonLat, londonLng, camberwellLat, camberwellLng)
      
      expect(distance).toBeGreaterThan(0)
      expect(distance).toBeLessThan(20) // Should be less than 20km
    })
    
    it('returns 0 for identical coordinates', () => {
      const distance = calculateDistance(51.5074, -0.1278, 51.5074, -0.1278)
      expect(distance).toBe(0)
    })
    
    it('calculates correct distance for known locations', () => {
      // London to Manchester (approximate)
      const distance = calculateDistance(51.5074, -0.1278, 53.4808, -2.2426)
      
      expect(distance).toBeGreaterThan(250) // At least 250km
      expect(distance).toBeLessThan(300) // Less than 300km
    })
  })
  
  describe('Portuguese Community Edge Cases', () => {
    it('handles mixed Portuguese/English names', () => {
      const result = validatePortugueseName('João Smith-Santos')
      expect(result.isValid).toBe(true)
    })
    
    it('validates PALOP heritage names', () => {
      const paloNames = [
        'Amílcar Cabral',
        'José Eduardo',
        'Mário Pinto'
      ]
      
      paloNames.forEach(name => {
        const result = validatePortugueseName(name)
        expect(result.isValid).toBe(true)
      })
    })
    
    it('preserves cultural context in mixed content', () => {
      const input = 'Join our <strong>Santos Populares</strong> celebration!'
      const result = sanitizePortugueseText(input)
      expect(result).toBe('Join our Santos Populares celebration!')
    })
    
    it('handles London Portuguese business phone numbers', () => {
      const portugueseBusinessNumbers = [
        '+44 20 7735 1234', // Camberwell area
        '+44 20 7587 5678', // South Kensington area
        '020 7735 9876' // Stockwell area
      ]
      
      portugueseBusinessNumbers.forEach(number => {
        expect(validateUKPhoneNumber(number)).toBe(true)
      })
    })
  })
})