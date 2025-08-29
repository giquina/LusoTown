/**
 * Portuguese Address and Location Validation
 * Specialized validation for Portuguese, Brazilian, and UK addresses
 */

import { PORTUGUESE_PATTERNS } from '@/lib/security/input-validation';

// Portuguese regional data for validation
export const PORTUGUESE_REGIONS = {
  portugal: {
    districts: [
      'Aveiro', 'Beja', 'Braga', 'Bragança', 'Castelo Branco', 'Coimbra',
      'Évora', 'Faro', 'Guarda', 'Leiria', 'Lisboa', 'Portalegre',
      'Porto', 'Santarém', 'Setúbal', 'Viana do Castelo', 'Vila Real', 'Viseu'
    ],
    islands: [
      'Açores', 'Madeira', 'São Miguel', 'Terceira', 'Faial', 'Pico',
      'São Jorge', 'Graciosa', 'Flores', 'Corvo', 'Porto Santo'
    ],
    postalCodeRanges: [
      { min: 1000, max: 1999, region: 'Lisboa' },
      { min: 2000, max: 2999, region: 'Santarém/Setúbal' },
      { min: 3000, max: 3999, region: 'Coimbra/Leiria' },
      { min: 4000, max: 4999, region: 'Porto/Braga/Viana do Castelo' },
      { min: 5000, max: 5999, region: 'Guarda/Vila Real/Bragança' },
      { min: 6000, max: 6999, region: 'Castelo Branco/Portalegre' },
      { min: 7000, max: 7999, region: 'Évora/Beja' },
      { min: 8000, max: 8999, region: 'Faro' },
      { min: 9000, max: 9999, region: 'Açores/Madeira' }
    ]
  },
  brazil: {
    states: [
      'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
      'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
      'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ],
    postalCodeRanges: [
      { min: 1000, max: 19999, state: 'SP' },
      { min: 20000, max: 28999, state: 'RJ' },
      { min: 29000, max: 29999, state: 'ES' },
      { min: 30000, max: 39999, state: 'MG' },
      { min: 40000, max: 48999, state: 'BA' },
      { min: 49000, max: 56999, state: 'SE/PE/PB/RN/AL' },
      { min: 57000, max: 63999, state: 'CE/PI/MA' },
      { min: 64000, max: 72999, state: 'GO/TO/DF' },
      { min: 73000, max: 77999, state: 'BA' },
      { min: 78000, max: 78999, state: 'MT' },
      { min: 79000, max: 79999, state: 'MS' },
      { min: 80000, max: 87999, state: 'PR' },
      { min: 88000, max: 89999, state: 'SC' },
      { min: 90000, max: 99999, state: 'RS' }
    ]
  },
  uk: {
    londonBoroughs: [
      'Barking and Dagenham', 'Barnet', 'Bexley', 'Brent', 'Bromley',
      'Camden', 'Croydon', 'Ealing', 'Enfield', 'Greenwich', 'Hackney',
      'Hammersmith and Fulham', 'Haringey', 'Harrow', 'Havering',
      'Hillingdon', 'Hounslow', 'Islington', 'Kensington and Chelsea',
      'Kingston upon Thames', 'Lambeth', 'Lewisham', 'Merton', 'Newham',
      'Redbridge', 'Richmond upon Thames', 'Southwark', 'Sutton',
      'Tower Hamlets', 'Waltham Forest', 'Wandsworth', 'Westminster',
      'City of London'
    ],
    portugueseAreas: [
      { area: 'Stockwell', postcode: 'SW9', description: 'Little Portugal' },
      { area: 'Vauxhall', postcode: 'SW8', description: 'Portuguese Community Hub' },
      { area: 'Elephant & Castle', postcode: 'SE1', description: 'Portuguese Businesses' },
      { area: 'Bermondsey', postcode: 'SE16', description: 'Portuguese Families' },
      { area: 'Tufnell Park', postcode: 'N7', description: 'Portuguese Cultural Center' },
      { area: 'Golders Green', postcode: 'NW11', description: 'Portuguese Services' },
      { area: 'East Ham', postcode: 'E6', description: 'Portuguese Community' },
      { area: 'Harrow', postcode: 'HA1', description: 'Portuguese Businesses' }
    ]
  }
};

// Address validation interface
export interface AddressValidationResult {
  isValid: boolean;
  country: 'portugal' | 'brazil' | 'uk' | 'unknown';
  region?: string;
  confidence: number;
  suggestions: string[];
  errors: string[];
  warnings: string[];
  geocoding?: {
    latitude: number;
    longitude: number;
    accuracy: 'high' | 'medium' | 'low';
  };
}

// Phone number validation interface
export interface PhoneValidationResult {
  isValid: boolean;
  country: 'portugal' | 'brazil' | 'uk' | 'unknown';
  format: string;
  confidence: number;
  suggestions: string[];
  type: 'mobile' | 'landline' | 'unknown';
}

// Postal code validation interface
export interface PostalCodeValidationResult {
  isValid: boolean;
  country: 'portugal' | 'brazil' | 'uk';
  region?: string;
  confidence: number;
  suggestions: string[];
}

/**
 * Comprehensive Portuguese address validator
 */
export class PortugueseAddressValidator {
  
  // Validate complete address
  static async validateAddress(
    address: string,
    postcode: string,
    city?: string,
    country?: string
  ): Promise<AddressValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];
    let confidence = 0;
    let detectedCountry: AddressValidationResult['country'] = 'unknown';
    let region: string | undefined;

    // Validate postal code first to determine country
    const postalValidation = this.validatePostalCode(postcode);
    
    if (postalValidation.isValid) {
      detectedCountry = postalValidation.country;
      region = postalValidation.region;
      confidence += 30;
    } else {
      errors.push('Invalid postal code format');
    }

    // Validate address format based on detected country
    const addressValidation = this.validateAddressFormat(address, detectedCountry);
    confidence += addressValidation.confidence;
    errors.push(...addressValidation.errors);
    warnings.push(...addressValidation.warnings);
    suggestions.push(...addressValidation.suggestions);

    // City validation
    if (city) {
      const cityValidation = this.validateCity(city, detectedCountry, region);
      confidence += cityValidation.confidence;
      errors.push(...cityValidation.errors);
      warnings.push(...cityValidation.warnings);
    }

    // Portuguese community area detection for UK addresses
    if (detectedCountry === 'uk') {
      const portugalDetection = this.detectPortugueseArea(address, postcode);
      if (portugalDetection.isPortugueseArea) {
        warnings.push(`This address is in a known Portuguese community area: ${portugalDetection.areaName}`);
        suggestions.push('Consider adding Portuguese language services for this location');
        confidence += 10;
      }
    }

    return {
      isValid: errors.length === 0,
      country: detectedCountry,
      region,
      confidence: Math.min(100, confidence),
      suggestions,
      errors,
      warnings,
      geocoding: await this.attemptGeocoding(address, postcode, city, detectedCountry)
    };
  }

  // Validate postal code and determine country/region
  static validatePostalCode(postcode: string): PostalCodeValidationResult {
    const suggestions: string[] = [];
    
    // Clean postal code
    const cleanPostcode = postcode.replace(/\s+/g, '').toUpperCase();
    
    // Test Portuguese postal code: 1234-123
    if (PORTUGUESE_PATTERNS.portugalPostalCode.test(postcode)) {
      const numeric = parseInt(cleanPostcode.substring(0, 4));
      const region = this.getPortugalRegionByPostalCode(numeric);
      
      return {
        isValid: true,
        country: 'portugal',
        region,
        confidence: 90,
        suggestions: region ? [`This postal code is in ${region}, Portugal`] : []
      };
    }

    // Test Brazilian postal code: 12345-678
    if (PORTUGUESE_PATTERNS.brazilPostalCode.test(postcode)) {
      const numeric = parseInt(cleanPostcode.substring(0, 5));
      const state = this.getBrazilStateByPostalCode(numeric);
      
      return {
        isValid: true,
        country: 'brazil',
        region: state,
        confidence: 90,
        suggestions: state ? [`This postal code is in ${state}, Brazil`] : []
      };
    }

    // Test UK postal code: SW1A 1AA
    if (PORTUGUESE_PATTERNS.ukPostalCode.test(postcode)) {
      const area = cleanPostcode.match(/^([A-Z]{1,2})/)?.[1] || '';
      const londonArea = this.isLondonPostcode(area);
      
      return {
        isValid: true,
        country: 'uk',
        region: londonArea ? 'London' : 'UK',
        confidence: 85,
        suggestions: londonArea ? ['This is a London postcode with Portuguese community presence'] : []
      };
    }

    // Invalid format - suggest corrections
    if (cleanPostcode.length === 7 && cleanPostcode.includes('-')) {
      suggestions.push('Format looks Portuguese. Try: 1234-123');
    } else if (cleanPostcode.length === 8 && cleanPostcode.includes('-')) {
      suggestions.push('Format looks Brazilian. Try: 12345-678');
    } else if (cleanPostcode.length >= 5 && cleanPostcode.length <= 7) {
      suggestions.push('Format looks UK. Try: SW1A 1AA');
    }

    return {
      isValid: false,
      country: 'uk', // Default to UK for Portuguese community
      confidence: 0,
      suggestions
    };
  }

  // Validate phone number with Portuguese community context
  static validatePhoneNumber(phone: string): PhoneValidationResult {
    const suggestions: string[] = [];
    let country: PhoneValidationResult['country'] = 'unknown';
    let type: PhoneValidationResult['type'] = 'unknown';
    let confidence = 0;

    // Clean phone number
    const cleanPhone = phone.replace(/\s+/g, '').replace(/[\-\(\)]/g, '');

    // Test Portuguese numbers: +351
    if (PORTUGUESE_PATTERNS.portugalPhone.test(phone)) {
      country = 'portugal';
      confidence = 90;
      
      // Determine if mobile or landline
      const number = cleanPhone.substring(4); // Remove +351
      if (number.startsWith('9')) {
        type = 'mobile';
        suggestions.push('Portuguese mobile number detected');
      } else {
        type = 'landline';
        suggestions.push('Portuguese landline number detected');
      }
    }
    // Test Brazilian numbers: +55
    else if (PORTUGUESE_PATTERNS.brazilPhone.test(phone)) {
      country = 'brazil';
      confidence = 90;
      type = 'mobile'; // Brazilian format usually indicates mobile
      suggestions.push('Brazilian mobile number detected');
    }
    // Test UK numbers: +44
    else if (PORTUGUESE_PATTERNS.ukPhone.test(phone)) {
      country = 'uk';
      confidence = 85;
      
      const areaCode = cleanPhone.substring(3, 5); // Remove +44
      if (areaCode === '20') {
        suggestions.push('London number - Portuguese community area');
        confidence += 5;
      }
      
      type = areaCode.startsWith('7') ? 'mobile' : 'landline';
    }
    // Test international format
    else if (PORTUGUESE_PATTERNS.internationalPhone.test(phone)) {
      confidence = 60;
      suggestions.push('International format detected');
      
      if (cleanPhone.startsWith('+351')) {
        suggestions.push('Appears to be Portuguese number - consider using +351 123 456 789 format');
      } else if (cleanPhone.startsWith('+55')) {
        suggestions.push('Appears to be Brazilian number - consider using +55 (11) 12345-6789 format');
      } else if (cleanPhone.startsWith('+44')) {
        suggestions.push('Appears to be UK number - consider using +44 20 1234 5678 format');
      }
    }

    // Format suggestions for invalid numbers
    if (confidence === 0) {
      suggestions.push('Suggested formats:');
      suggestions.push('Portugal: +351 123 456 789');
      suggestions.push('Brazil: +55 (11) 12345-6789');
      suggestions.push('UK: +44 20 1234 5678');
    }

    return {
      isValid: confidence > 0,
      country,
      format: this.suggestPhoneFormat(phone, country),
      confidence,
      suggestions,
      type
    };
  }

  // Validate address format
  private static validateAddressFormat(
    address: string,
    country: AddressValidationResult['country']
  ): { confidence: number; errors: string[]; warnings: string[]; suggestions: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];
    let confidence = 0;

    // Basic address validation
    if (!address || address.trim().length < 5) {
      errors.push('Address too short');
      return { confidence: 0, errors, warnings, suggestions };
    }

    if (!PORTUGUESE_PATTERNS.address.test(address)) {
      errors.push('Address contains invalid characters');
      return { confidence: 0, errors, warnings, suggestions };
    }

    confidence += 20;

    // Country-specific validation
    switch (country) {
      case 'portugal':
        if (this.containsPortugueseAddressKeywords(address)) {
          confidence += 15;
          suggestions.push('Portuguese address format detected');
        }
        break;
      case 'brazil':
        if (this.containsBrazilianAddressKeywords(address)) {
          confidence += 15;
          suggestions.push('Brazilian address format detected');
        }
        break;
      case 'uk':
        if (this.containsUKAddressKeywords(address)) {
          confidence += 15;
          suggestions.push('UK address format detected');
        }
        break;
    }

    // Check for common Portuguese street names/types
    const portugueseStreetTypes = ['Rua', 'Avenida', 'Praça', 'Largo', 'Travessa', 'Estrada'];
    const hasPortugueseStreetType = portugueseStreetTypes.some(type => 
      address.toLowerCase().includes(type.toLowerCase())
    );

    if (hasPortugueseStreetType) {
      confidence += 10;
      warnings.push('Portuguese street naming detected - ensure correct country selection');
    }

    return { confidence, errors, warnings, suggestions };
  }

  // Validate city name
  private static validateCity(
    city: string,
    country: AddressValidationResult['country'],
    region?: string
  ): { confidence: number; errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];
    let confidence = 0;

    if (!city || city.trim().length < 2) {
      errors.push('City name too short');
      return { confidence: 0, errors, warnings };
    }

    confidence += 10;

    // Country-specific city validation
    switch (country) {
      case 'portugal':
        if (PORTUGUESE_REGIONS.portugal.districts.includes(city)) {
          confidence += 20;
        } else if (PORTUGUESE_REGIONS.portugal.islands.includes(city)) {
          confidence += 20;
        }
        break;
      case 'uk':
        if (PORTUGUESE_REGIONS.uk.londonBoroughs.includes(city)) {
          confidence += 15;
        }
        // Check for Portuguese areas
        const portugueseArea = PORTUGUESE_REGIONS.uk.portugueseAreas.find(area => 
          area.area.toLowerCase() === city.toLowerCase()
        );
        if (portugueseArea) {
          confidence += 10;
          warnings.push(`${city} is known for its Portuguese community`);
        }
        break;
    }

    return { confidence, errors, warnings };
  }

  // Detect Portuguese community areas in UK
  private static detectPortugueseArea(address: string, postcode: string): {
    isPortugueseArea: boolean;
    areaName?: string;
    confidence: number;
  } {
    const portugueseAreas = PORTUGUESE_REGIONS.uk.portugueseAreas;
    
    for (const area of portugueseAreas) {
      // Check by postcode prefix
      const postcodePrefix = postcode.split(' ')[0];
      if (postcodePrefix === area.postcode) {
        return {
          isPortugueseArea: true,
          areaName: `${area.area} - ${area.description}`,
          confidence: 90
        };
      }
      
      // Check by area name in address
      if (address.toLowerCase().includes(area.area.toLowerCase())) {
        return {
          isPortugueseArea: true,
          areaName: `${area.area} - ${area.description}`,
          confidence: 70
        };
      }
    }

    return { isPortugueseArea: false, confidence: 0 };
  }

  // Helper methods
  private static getPortugalRegionByPostalCode(code: number): string | undefined {
    const range = PORTUGUESE_REGIONS.portugal.postalCodeRanges.find(
      range => code >= range.min && code <= range.max
    );
    return range?.region;
  }

  private static getBrazilStateByPostalCode(code: number): string | undefined {
    const range = PORTUGUESE_REGIONS.brazil.postalCodeRanges.find(
      range => code >= range.min && code <= range.max
    );
    return range?.state;
  }

  private static isLondonPostcode(area: string): boolean {
    const londonAreas = ['E', 'EC', 'N', 'NW', 'SE', 'SW', 'W', 'WC'];
    return londonAreas.includes(area);
  }

  private static containsPortugueseAddressKeywords(address: string): boolean {
    const keywords = ['Rua', 'Avenida', 'Praça', 'Largo', 'Travessa', 'Estrada', 'Vila', 'Quinta'];
    return keywords.some(keyword => 
      address.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  private static containsBrazilianAddressKeywords(address: string): boolean {
    const keywords = ['Rua', 'Avenida', 'Praça', 'Alameda', 'Travessa', 'Vila', 'Conjunto'];
    return keywords.some(keyword => 
      address.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  private static containsUKAddressKeywords(address: string): boolean {
    const keywords = ['Street', 'Road', 'Avenue', 'Lane', 'Close', 'Gardens', 'Square', 'Crescent'];
    return keywords.some(keyword => 
      address.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  private static suggestPhoneFormat(phone: string, country: PhoneValidationResult['country']): string {
    switch (country) {
      case 'portugal':
        return '+351 123 456 789';
      case 'brazil':
        return '+55 (11) 12345-6789';
      case 'uk':
        return '+44 20 1234 5678';
      default:
        return '+351 123 456 789';
    }
  }

  // Basic geocoding attempt (in production, use proper geocoding service)
  private static async attemptGeocoding(
    address: string,
    postcode: string,
    city?: string,
    country?: AddressValidationResult['country']
  ): Promise<AddressValidationResult['geocoding']> {
    // This is a placeholder - in production, integrate with:
    // - Google Geocoding API
    // - OpenStreetMap Nominatim
    // - UK Postcode API for UK addresses
    
    // Mock geocoding for demonstration
    const mockCoordinates: Record<string, { lat: number; lng: number }> = {
      'SW9': { lat: 51.4634, lng: -0.1174 }, // Stockwell
      'SW8': { lat: 51.4858, lng: -0.1235 }, // Vauxhall
      'SE1': { lat: 51.4951, lng: -0.0984 }, // Elephant & Castle
      'N7': { lat: 51.5523, lng: -0.1372 }, // Tufnell Park
    };

    const postcodePrefix = postcode.split(' ')[0];
    const coords = mockCoordinates[postcodePrefix];

    if (coords) {
      return {
        latitude: coords.lat,
        longitude: coords.lng,
        accuracy: 'medium' as const
      };
    }

    return undefined;
  }
}

// Export convenience functions
export const validatePortugueseAddress = PortugueseAddressValidator.validateAddress;
export const validatePortuguesePostalCode = PortugueseAddressValidator.validatePostalCode;
export const validatePortuguesePhone = PortugueseAddressValidator.validatePhoneNumber;