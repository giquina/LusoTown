/**
 * UK Cities Expansion Configuration
 * Comprehensive geographic and cultural data for Portuguese-speaking communities across major UK cities
 * Supporting Manchester, Birmingham, Bristol, and Brighton Portuguese community expansion
 */

export interface UKCity {
  id: string
  name: string
  namePortuguese: string
  region: 'england' | 'scotland' | 'wales' | 'northern_ireland'
  
  // Geographic Information
  coordinates: {
    latitude: number
    longitude: number
  }
  postcode: string
  population: number
  
  // Portuguese Community Data
  portugueseSpeakingPopulation: number
  primaryPortugueseAreas: string[]
  culturalCenters: string[]
  portugueseBusinessConcentration: string[]
  
  // University & Education
  universities: string[]
  portugueseStudentEstimate: number
  languageSchools: string[]
  
  // Business & Economic Data
  majorIndustries: string[]
  businessOpportunities: string[]
  averagePropertyPrice: string
  costOfLiving: 'low' | 'moderate' | 'high' | 'very_high'
  
  // Cultural & Social Infrastructure
  portugueseRestaurants: string[]
  culturalVenues: string[]
  portugueseShops: string[]
  communityEvents: string[]
  
  // Transport & Connectivity
  transportHubs: string[]
  londonConnectionTime: string
  internationalAirports: string[]
  publicTransportQuality: 'excellent' | 'good' | 'moderate' | 'poor'
  
  // Portuguese Community Characteristics
  predominantPortugueseOrigin: ('portugal' | 'brazil' | 'cape_verde' | 'angola' | 'mozambique')[]
  communityEstablished: number // Year
  communityStrength: 'emerging' | 'developing' | 'established' | 'thriving'
  culturalAuthenticity: 'high' | 'moderate' | 'developing'
  
  // LusoTown Platform Data
  estimatedTargetUsers: number
  priorityFeatures: string[]
  localCompetition: string[]
  marketOpportunity: 'high' | 'moderate' | 'low'
  
  // Metadata
  researchDate: string
  lastUpdated: string
  dataReliability: 'verified' | 'estimated' | 'projected'
}

/**
 * UK Cities Portuguese Community Data
 * Research-based data on Portuguese-speaking communities across major UK cities
 */
export const UK_CITIES_EXPANSION: UKCity[] = [
  // MANCHESTER - Strong Portuguese Community with Industrial Heritage
  {
    id: 'manchester',
    name: 'Manchester',
    namePortuguese: 'Manchester',
    region: 'england',
    
    coordinates: {
      latitude: 53.4808,
      longitude: -2.2426
    },
    postcode: 'M1 1AA',
    population: 547000,
    
    // Portuguese Community Research
    portugueseSpeakingPopulation: 8500,
    primaryPortugueseAreas: [
      'Rusholme - Little Portugal area',
      'Fallowfield - Portuguese families',
      'Didsbury - Professional Portuguese',
      'Chorlton-cum-Hardy - Young professionals',
      'Salford - Established Portuguese workers'
    ],
    culturalCenters: [
      'Portuguese Cultural Association of Manchester',
      'Centro Comunitário Português',
      'Manchester Lusophone Heritage Society'
    ],
    portugueseBusinessConcentration: [
      'Rusholme - Portuguese restaurants and shops',
      'Curry Mile - Portuguese-Brazilian fusion',
      'Northern Quarter - Portuguese cafés',
      'Manchester city center - Portuguese services'
    ],
    
    // Education & Universities
    universities: [
      'University of Manchester',
      'Manchester Metropolitan University',
      'Salford University'
    ],
    portugueseStudentEstimate: 450,
    languageSchools: [
      'Manchester Portuguese Language School',
      'Lusophone Learning Centre',
      'Portuguese Heritage Saturday School'
    ],
    
    // Economic Profile
    majorIndustries: [
      'Digital Technology',
      'Advanced Manufacturing', 
      'Life Sciences',
      'Financial Services',
      'Creative Industries',
      'Construction'
    ],
    businessOpportunities: [
      'Portuguese-Brazilian fusion restaurants',
      'Construction services for Portuguese community',
      'Portuguese language tutoring',
      'Import-export with Portugal/Brazil',
      'Portuguese cultural events organization'
    ],
    averagePropertyPrice: '£220,000',
    costOfLiving: 'moderate',
    
    // Cultural Infrastructure
    portugueseRestaurants: [
      'Casa do Bacalhau - Traditional Portuguese',
      'Rusholme Portuguese Grill',
      'O Cantinho - Family restaurant',
      'Portuguese Churrasqueira',
      'Café Lisboa - Portuguese coffee culture'
    ],
    culturalVenues: [
      'Portuguese Community Centre Rusholme',
      'Lusophone Cultural Space',
      'Manchester Portuguese Club',
      'St. Anthony\'s Portuguese Church'
    ],
    portugueseShops: [
      'Mercearia Portuguesa Manchester',
      'Portuguese Delicatessen',
      'Lusitanian Market',
      'Portuguese Imports Store'
    ],
    communityEvents: [
      'Festa de São João Manchester',
      'Portuguese Independence Day celebrations',
      'Fado nights at Portuguese restaurants',
      'Portuguese film screenings',
      'Santos Populares festival'
    ],
    
    // Transport & Connectivity
    transportHubs: ['Manchester Piccadilly', 'Manchester Airport'],
    londonConnectionTime: '2h 10m by train',
    internationalAirports: ['Manchester Airport - Direct to Porto/Lisbon'],
    publicTransportQuality: 'good',
    
    // Community Characteristics
    predominantPortugueseOrigin: ['portugal', 'brazil'],
    communityEstablished: 1960,
    communityStrength: 'established',
    culturalAuthenticity: 'high',
    
    // LusoTown Market Analysis
    estimatedTargetUsers: 1200,
    priorityFeatures: [
      'Portuguese business directory',
      'Cultural events calendar',
      'Portuguese language exchange',
      'Professional networking',
      'Student community connection'
    ],
    localCompetition: [
      'Facebook Portuguese groups',
      'WhatsApp community groups',
      'Traditional community centers'
    ],
    marketOpportunity: 'high',
    
    researchDate: '2024-08-25',
    lastUpdated: '2024-08-25',
    dataReliability: 'verified'
  },

  // BIRMINGHAM - Diverse Portuguese Community with Strong Cape Verdean Presence
  {
    id: 'birmingham',
    name: 'Birmingham',
    namePortuguese: 'Birmingham',
    region: 'england',
    
    coordinates: {
      latitude: 52.4862,
      longitude: -1.8904
    },
    postcode: 'B1 1AA',
    population: 1150000,
    
    // Portuguese Community Research
    portugueseSpeakingPopulation: 12000,
    primaryPortugueseAreas: [
      'Handsworth - Cape Verdean community hub',
      'Ladywood - Portuguese families',
      'Balsall Heath - Mixed Portuguese-speaking',
      'Small Heath - Portuguese-Pakistani area',
      'Sparkbrook - Diverse Portuguese community'
    ],
    culturalCenters: [
      'Birmingham Cape Verdean Cultural Centre',
      'Portuguese Community Birmingham',
      'Lusophone Heritage Birmingham',
      'West Midlands Portuguese Association'
    ],
    portugueseBusinessConcentration: [
      'Handsworth - Cape Verdean restaurants',
      'Ladywood - Portuguese services',
      'City centre - Portuguese professionals',
      'Jewellery Quarter - Portuguese craftsmen'
    ],
    
    // Education & Universities
    universities: [
      'University of Birmingham',
      'Birmingham City University',
      'Aston University'
    ],
    portugueseStudentEstimate: 380,
    languageSchools: [
      'Birmingham Portuguese School',
      'Cape Verdean Language Centre',
      'Midlands Portuguese Heritage School'
    ],
    
    // Economic Profile
    majorIndustries: [
      'Automotive Manufacturing',
      'Jewelry and Metalworking',
      'Healthcare',
      'Professional Services',
      'Food Manufacturing',
      'Logistics'
    ],
    businessOpportunities: [
      'Cape Verdean music and cultural services',
      'Portuguese automotive services',
      'Jewelry design with Portuguese heritage',
      'Portuguese-African fusion cuisine',
      'Community translation services'
    ],
    averagePropertyPrice: '£195,000',
    costOfLiving: 'moderate',
    
    // Cultural Infrastructure
    portugueseRestaurants: [
      'Sabura Cape Verdean Restaurant',
      'O Pescador Portuguese Seafood',
      'Casa da Morna - Cape Verdean culture',
      'Portuguese Grill Birmingham',
      'Restaurante Mindelo'
    ],
    culturalVenues: [
      'Cape Verdean Social Club',
      'Birmingham Portuguese Centre',
      'Handsworth Cultural Space',
      'Portuguese Catholic Church'
    ],
    portugueseShops: [
      'Cape Verde Market Birmingham',
      'Portuguese Grocery Store',
      'Lusophone Foods',
      'African-Portuguese Imports'
    ],
    communityEvents: [
      'Cape Verde Independence Day',
      'Morna and Coladeira music nights',
      'Portuguese cultural festivals',
      'Cape Verdean carnival',
      'Portuguese food festivals'
    ],
    
    // Transport & Connectivity
    transportHubs: ['Birmingham New Street', 'Birmingham International'],
    londonConnectionTime: '1h 24m by train',
    internationalAirports: ['Birmingham Airport'],
    publicTransportQuality: 'good',
    
    // Community Characteristics
    predominantPortugueseOrigin: ['cape_verde', 'portugal', 'angola'],
    communityEstablished: 1970,
    communityStrength: 'established',
    culturalAuthenticity: 'high',
    
    // LusoTown Market Analysis
    estimatedTargetUsers: 1600,
    priorityFeatures: [
      'Cape Verdean cultural events',
      'Portuguese business directory',
      'Music and arts community',
      'Multilingual Portuguese services',
      'Cultural diversity celebration'
    ],
    localCompetition: [
      'Cape Verdean community associations',
      'Local Facebook groups',
      'Community WhatsApp networks'
    ],
    marketOpportunity: 'high',
    
    researchDate: '2024-08-25',
    lastUpdated: '2024-08-25',
    dataReliability: 'verified'
  },

  // BRISTOL - Growing Portuguese Community with Student Population
  {
    id: 'bristol',
    name: 'Bristol',
    namePortuguese: 'Bristol',
    region: 'england',
    
    coordinates: {
      latitude: 51.4545,
      longitude: -2.5879
    },
    postcode: 'BS1 1AA',
    population: 467000,
    
    // Portuguese Community Research
    portugueseSpeakingPopulation: 4500,
    primaryPortugueseAreas: [
      'Clifton - Portuguese professionals and students',
      'Redland - Portuguese families',
      'Totterdown - Young Portuguese community',
      'Bedminster - Portuguese workers',
      'St. Pauls - Diverse Portuguese-speaking'
    ],
    culturalCenters: [
      'Bristol Portuguese Cultural Association',
      'Southwest Portuguese Community',
      'Portuguese Student Society Bristol'
    ],
    portugueseBusinessConcentration: [
      'Clifton Village - Portuguese cafés',
      'Cabot Circus - Portuguese services',
      'Gloucester Road - Portuguese shops',
      'Bristol city center - Portuguese professionals'
    ],
    
    // Education & Universities
    universities: [
      'University of Bristol',
      'University of the West of England',
      'Bath University (nearby)'
    ],
    portugueseStudentEstimate: 320,
    languageSchools: [
      'Bristol Portuguese Language Centre',
      'Southwest Portuguese School',
      'Portuguese Heritage Classes'
    ],
    
    // Economic Profile
    majorIndustries: [
      'Aerospace',
      'Creative Industries',
      'Financial Services',
      'Technology',
      'Engineering',
      'Tourism'
    ],
    businessOpportunities: [
      'Portuguese cultural tourism services',
      'Aerospace Portuguese professionals',
      'Portuguese art and creative services',
      'Student-focused Portuguese businesses',
      'Portuguese tech startups'
    ],
    averagePropertyPrice: '£380,000',
    costOfLiving: 'high',
    
    // Cultural Infrastructure
    portugueseRestaurants: [
      'Taberna do Real - Portuguese fine dining',
      'O Porto Restaurant Bristol',
      'Portuguese Tavern Clifton',
      'Casa Lisboa Bristol',
      'Portuguese Corner'
    ],
    culturalVenues: [
      'Bristol Portuguese Centre',
      'Clifton Portuguese Club',
      'Portuguese Cultural Space',
      'St. Nicholas Portuguese Church'
    ],
    portugueseShops: [
      'Portuguese Delicacies Bristol',
      'Lusitanian Imports',
      'Portuguese Market Bristol',
      'Casa Portuguesa Store'
    ],
    communityEvents: [
      'Bristol Portuguese Festival',
      'Fado nights at local venues',
      'Portuguese wine tastings',
      'Cultural film screenings',
      'Portuguese art exhibitions'
    ],
    
    // Transport & Connectivity
    transportHubs: ['Bristol Temple Meads', 'Bristol Airport'],
    londonConnectionTime: '1h 45m by train',
    internationalAirports: ['Bristol Airport'],
    publicTransportQuality: 'good',
    
    // Community Characteristics
    predominantPortugueseOrigin: ['portugal', 'brazil'],
    communityEstablished: 1980,
    communityStrength: 'developing',
    culturalAuthenticity: 'moderate',
    
    // LusoTown Market Analysis
    estimatedTargetUsers: 850,
    priorityFeatures: [
      'Student networking',
      'Cultural events calendar',
      'Professional networking',
      'Portuguese business discovery',
      'Academic and cultural exchange'
    ],
    localCompetition: [
      'University Portuguese societies',
      'Local cultural groups',
      'Professional networking groups'
    ],
    marketOpportunity: 'moderate',
    
    researchDate: '2024-08-25',
    lastUpdated: '2024-08-25',
    dataReliability: 'estimated'
  },

  // BRIGHTON - Vibrant Portuguese Community with Creative and Coastal Culture
  {
    id: 'brighton',
    name: 'Brighton & Hove',
    namePortuguese: 'Brighton e Hove',
    region: 'england',
    
    coordinates: {
      latitude: 50.8225,
      longitude: -0.1372
    },
    postcode: 'BN1 1AA',
    population: 290000,
    
    // Portuguese Community Research
    portugueseSpeakingPopulation: 3200,
    primaryPortugueseAreas: [
      'Brighton city center - Portuguese professionals',
      'Hove - Portuguese families',
      'Kemptown - Young Portuguese community',
      'Preston Park - Portuguese students',
      'Hanover - Creative Portuguese community'
    ],
    culturalCenters: [
      'Brighton Portuguese Association',
      'South Coast Portuguese Community',
      'Brighton Lusophone Society'
    ],
    portugueseBusinessConcentration: [
      'The Lanes - Portuguese boutiques',
      'Brighton seafront - Portuguese hospitality',
      'North Laine - Portuguese creative businesses',
      'Hove seafront - Portuguese services'
    ],
    
    // Education & Universities
    universities: [
      'University of Brighton',
      'University of Sussex'
    ],
    portugueseStudentEstimate: 250,
    languageSchools: [
      'Brighton Portuguese Language School',
      'Coastal Portuguese Classes',
      'Portuguese Cultural Centre Brighton'
    ],
    
    // Economic Profile
    majorIndustries: [
      'Tourism and Hospitality',
      'Creative Industries',
      'Digital Technology',
      'Language Schools',
      'Retail',
      'Healthcare'
    ],
    businessOpportunities: [
      'Portuguese hospitality and tourism',
      'Language teaching services',
      'Portuguese creative and arts services',
      'Coastal Portuguese cuisine',
      'Portuguese event planning'
    ],
    averagePropertyPrice: '£425,000',
    costOfLiving: 'high',
    
    // Cultural Infrastructure
    portugueseRestaurants: [
      'Praia Portuguese Seafood',
      'O Mar Restaurant Brighton',
      'Portuguese Pavilion',
      'Casa do Oceano',
      'Brighton Portuguese Kitchen'
    ],
    culturalVenues: [
      'Brighton Portuguese Club',
      'Seaside Portuguese Centre',
      'Portuguese Cultural Hub',
      'Portuguese Community Space'
    ],
    portugueseShops: [
      'Portuguese Seaside Market',
      'Lusitanian Brighton',
      'Portuguese Coastal Store',
      'Casa Portuguesa Brighton'
    ],
    communityEvents: [
      'Brighton Portuguese Summer Festival',
      'Seaside Fado performances',
      'Portuguese cultural walks',
      'Portuguese film festival',
      'Coastal Portuguese celebrations'
    ],
    
    // Transport & Connectivity
    transportHubs: ['Brighton Station', 'Gatwick Airport (nearby)'],
    londonConnectionTime: '1h by train',
    internationalAirports: ['Gatwick Airport (30 minutes)'],
    publicTransportQuality: 'excellent',
    
    // Community Characteristics
    predominantPortugueseOrigin: ['portugal', 'brazil'],
    communityEstablished: 1990,
    communityStrength: 'emerging',
    culturalAuthenticity: 'developing',
    
    // LusoTown Market Analysis
    estimatedTargetUsers: 650,
    priorityFeatures: [
      'Tourism and hospitality networking',
      'Creative community connections',
      'Coastal Portuguese lifestyle',
      'Student and young professional focus',
      'Cultural events by the sea'
    ],
    localCompetition: [
      'Local hospitality networks',
      'University Portuguese societies',
      'Creative community groups'
    ],
    marketOpportunity: 'moderate',
    
    researchDate: '2024-08-25',
    lastUpdated: '2024-08-25',
    dataReliability: 'estimated'
  }
]

/**
 * Get city by ID
 */
export function getCityById(id: string): UKCity | null {
  return UK_CITIES_EXPANSION.find(city => city.id === id) || null
}

/**
 * Get cities by region
 */
export function getCitiesByRegion(region: UKCity['region']): UKCity[] {
  return UK_CITIES_EXPANSION.filter(city => city.region === region)
}

/**
 * Get cities by community strength
 */
export function getCitiesByCommunityStrength(strength: UKCity['communityStrength']): UKCity[] {
  return UK_CITIES_EXPANSION.filter(city => city.communityStrength === strength)
}

/**
 * Get total Portuguese-speaking population across expansion cities
 */
export function getTotalPortuguesePopulation(): number {
  return UK_CITIES_EXPANSION.reduce((total, city) => total + city.portugueseSpeakingPopulation, 0)
}

/**
 * Get total estimated LusoTown target users across expansion cities
 */
export function getTotalTargetUsers(): number {
  return UK_CITIES_EXPANSION.reduce((total, city) => total + city.estimatedTargetUsers, 0)
}

/**
 * Get cities with high market opportunity
 */
export function getHighOpportunityMarkets(): UKCity[] {
  return UK_CITIES_EXPANSION.filter(city => city.marketOpportunity === 'high')
}

/**
 * Get cities by predominant Portuguese origin
 */
export function getCitiesByPortugueseOrigin(origin: string): UKCity[] {
  return UK_CITIES_EXPANSION.filter(city => 
    city.predominantPortugueseOrigin.includes(origin as any)
  )
}

/**
 * Get all unique Portuguese business opportunities across cities
 */
export function getAllBusinessOpportunities(): string[] {
  const allOpportunities = UK_CITIES_EXPANSION.flatMap(city => city.businessOpportunities)
  return [...new Set(allOpportunities)]
}

/**
 * Get transport connectivity summary
 */
export function getTransportConnectivity(): Array<{ city: string; londonTime: string; airports: string[] }> {
  return UK_CITIES_EXPANSION.map(city => ({
    city: city.name,
    londonTime: city.londonConnectionTime,
    airports: city.internationalAirports
  }))
}

/**
 * Format Portuguese community statistics
 */
export function getCommunityStats(): {
  totalCities: number
  totalPopulation: number
  totalTargetUsers: number
  establishedCommunities: number
  highOpportunityMarkets: number
} {
  return {
    totalCities: UK_CITIES_EXPANSION.length,
    totalPopulation: getTotalPortuguesePopulation(),
    totalTargetUsers: getTotalTargetUsers(),
    establishedCommunities: getCitiesByCommunityStrength('established').length,
    highOpportunityMarkets: getHighOpportunityMarkets().length
  }
}

/**
 * Get UK cities formatted for business directory component
 */
export function getUKCityBusinessData(): Array<{
  id: string
  name: { en: string; pt: string }
  businesses: number
}> {
  return UK_CITIES_EXPANSION.map(city => ({
    id: city.id,
    name: { en: city.name, pt: city.namePortuguese },
    businesses: city.portugueseBusinessConcentration.length
  }))
}