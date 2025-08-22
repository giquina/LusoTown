/**
 * Brazilian Elite Cultural Configuration
 * Sophisticated luxury content for high-class Brazilian community in UK
 * Targeting affluent Brazilian professionals, executives, and cultural elites
 */

export interface BrazilianCulturalVenue {
  id: string
  name: string
  namePortuguese: string
  type: 'opera_house' | 'art_gallery' | 'luxury_restaurant' | 'private_club' | 'cultural_institution' | 'fashion_house'
  
  // Elite Status
  prestige: 'iconic' | 'prestigious' | 'luxury' | 'exclusive'
  membershipRequired: boolean
  dressCode: string
  
  // Location
  address: string
  city: string
  neighborhood: string
  coordinates?: {
    latitude: number
    longitude: number
  }
  
  // Contact
  phone: string
  email: string
  website: string
  reservations?: string
  
  // Cultural Significance
  description: string
  descriptionPortuguese: string
  culturalImportance: string
  
  // Elite Programs & Events
  signature_events: EliteEvent[]
  vip_services: string[]
  partnership_benefits: string[]
  
  // Networking
  target_demographic: string[]
  social_occasions: string[]
  business_networking: boolean
  
  // Luxury Details
  architectural_style: string
  capacity: number
  established_year: number
  notable_patrons: string[]
  awards?: string[]
  
  // Social Media
  socialMedia: {
    instagram?: string
    facebook?: string
    twitter?: string
    linkedin?: string
  }
}

export interface EliteEvent {
  id: string
  name: string
  namePortuguese: string
  type: 'gala' | 'exhibition' | 'concert' | 'networking' | 'cultural_exchange' | 'fashion_show'
  description: string
  target_audience: string[]
  dress_code: string
  price_range: string
  exclusivity: 'invitation_only' | 'member_exclusive' | 'luxury_ticketed' | 'corporate_sponsored'
  networking_potential: 'high' | 'medium' | 'exclusive'
}

export interface BrazilianLuxuryBrand {
  id: string
  name: string
  category: 'fashion' | 'jewelry' | 'automotive' | 'real_estate' | 'hospitality' | 'finance'
  description: string
  prestige_level: 'world_class' | 'luxury' | 'premium'
  uk_presence: {
    london_locations: string[]
    exclusive_partnerships: string[]
    vip_services: string[]
  }
  target_market: string[]
  cultural_connection: string
}

/**
 * São Paulo High Society Cultural Venues
 * World-class institutions representing Brazilian cultural sophistication
 */
export const SAO_PAULO_CULTURAL_ELITE: BrazilianCulturalVenue[] = [
  {
    id: 'teatro-municipal-sao-paulo',
    name: 'Municipal Theatre of São Paulo',
    namePortuguese: 'Teatro Municipal de São Paulo',
    type: 'opera_house',
    prestige: 'iconic',
    membershipRequired: false,
    dressCode: 'Black tie for galas, cocktail attire for regular performances',
    
    address: 'Praça Ramos de Azevedo, s/n - República',
    city: 'São Paulo',
    neighborhood: 'Centro',
    coordinates: {
      latitude: -23.5447,
      longitude: -46.6364
    },
    
    phone: '+55 11 3397-0300',
    email: 'atendimento@theatromunicipal.org.br',
    website: 'https://theatromunicipal.org.br',
    reservations: 'reservas@theatromunicipal.org.br',
    
    description: 'Brazil\'s premier opera house, hosting world-class performances and the epicenter of São Paulo\'s cultural aristocracy',
    descriptionPortuguese: 'Principal teatro de ópera do Brasil, sede de apresentações de classe mundial e epicentro da aristocracia cultural paulistana',
    culturalImportance: 'Architectural masterpiece modeled after Paris Opera, symbol of Brazilian cultural refinement since 1911',
    
    signature_events: [
      {
        id: 'aniversario-municipal',
        name: 'Municipal Theatre Anniversary Gala',
        namePortuguese: 'Gala de Aniversário do Teatro Municipal',
        type: 'gala',
        description: 'Annual black-tie gala featuring international opera stars and São Paulo\'s cultural elite',
        target_audience: ['Cultural patrons', 'Business executives', 'Government dignitaries', 'International diplomats'],
        dress_code: 'White tie and tails / Full evening gown',
        price_range: 'R$ 5,000 - R$ 50,000 per table',
        exclusivity: 'invitation_only',
        networking_potential: 'exclusive'
      },
      {
        id: 'festival-inverno-bonneaud',
        name: 'Winter Festival Bonneaud',
        namePortuguese: 'Festival de Inverno Bonneaud',
        type: 'concert',
        description: 'Prestigious classical music festival attracting global maestros and discerning audiences',
        target_audience: ['Classical music connoisseurs', 'Cultural philanthropists', 'International artists'],
        dress_code: 'Formal evening wear',
        price_range: 'R$ 800 - R$ 8,000',
        exclusivity: 'luxury_ticketed',
        networking_potential: 'high'
      }
    ],
    
    vip_services: [
      'Private box rentals with champagne service',
      'Exclusive intermission lounges',
      'Meet-and-greet with international artists',
      'Private dining at Restaurante do Teatro',
      'Valet parking and limousine service',
      'Cultural concierge services'
    ],
    
    partnership_benefits: [
      'Corporate box sponsorship opportunities',
      'Exclusive business networking events',
      'Cultural diplomacy programs',
      'International artist collaborations',
      'Tax-deductible cultural patronage'
    ],
    
    target_demographic: [
      'C-suite executives and entrepreneurs',
      'Cultural patrons and philanthropists',
      'International business leaders',
      'Diplomatic community',
      'Luxury lifestyle enthusiasts'
    ],
    
    social_occasions: [
      'Business development dinners',
      'International client entertainment',
      'Cultural diplomacy events',
      'Philanthropic fundraising galas',
      'Exclusive networking receptions'
    ],
    
    business_networking: true,
    
    architectural_style: 'Neo-Baroque with Italian Renaissance influences',
    capacity: 1500,
    established_year: 1911,
    notable_patrons: [
      'Família Matarazzo (industrial dynasty)',
      'Banco Itaú cultural foundation',
      'Fundação Maria Luisa e Oscar Americano',
      'International opera and ballet companies'
    ],
    awards: [
      'UNESCO World Heritage recognition consideration',
      'Brazilian National Historic Monument',
      'São Paulo Cultural Heritage Landmark'
    ],
    
    socialMedia: {
      instagram: '@theatromunicipal',
      facebook: 'TeatroMunicipalSP',
      twitter: '@TeatroMunicipal'
    }
  },
  
  {
    id: 'pinacoteca-sao-paulo',
    name: 'Pinacoteca do Estado de São Paulo',
    namePortuguese: 'Pinacoteca do Estado de São Paulo',
    type: 'art_gallery',
    prestige: 'prestigious',
    membershipRequired: false,
    dressCode: 'Smart casual to cocktail attire for galas',
    
    address: 'Praça da Luz, 2 - Luz',
    city: 'São Paulo',
    neighborhood: 'Luz',
    coordinates: {
      latitude: -23.5352,
      longitude: -46.6346
    },
    
    phone: '+55 11 3324-1000',
    email: 'info@pinacoteca.org.br',
    website: 'https://pinacoteca.org.br',
    reservations: 'eventos@pinacoteca.org.br',
    
    description: 'Brazil\'s oldest art museum, showcasing the finest Brazilian artistic heritage and international masterpieces',
    descriptionPortuguese: 'Museu de arte mais antigo do Brasil, exibindo o melhor patrimônio artístico brasileiro e obras-primas internacionais',
    culturalImportance: 'Premier institution preserving Brazilian artistic heritage, hosting world-renowned exhibitions and cultural diplomacy',
    
    signature_events: [
      {
        id: 'noite-dos-mecenas',
        name: 'Night of Patrons',
        namePortuguese: 'Noite dos Mecenas',
        type: 'gala',
        description: 'Exclusive evening celebrating art patrons with private exhibition previews and fine dining',
        target_audience: ['Art collectors', 'Cultural philanthropists', 'Museum board members', 'International curators'],
        dress_code: 'Black tie optional',
        price_range: 'R$ 2,500 - R$ 15,000',
        exclusivity: 'member_exclusive',
        networking_potential: 'exclusive'
      }
    ],
    
    vip_services: [
      'Private curator-led tours',
      'Exclusive exhibition previews',
      'Art acquisition consultation',
      'Corporate art rental programs',
      'Cultural event hosting facilities'
    ],
    
    partnership_benefits: [
      'Corporate membership programs',
      'Executive networking events',
      'International cultural exchange',
      'Art investment advisory services',
      'Tax-beneficial art donation programs'
    ],
    
    target_demographic: [
      'Art collectors and investors',
      'Cultural institution leaders',
      'International art dealers',
      'Luxury lifestyle connoisseurs',
      'Corporate cultural sponsors'
    ],
    
    social_occasions: [
      'Private collection viewings',
      'Art investment seminars',
      'Cultural diplomacy receptions',
      'International curator meetups',
      'Artistic philanthropy events'
    ],
    
    business_networking: true,
    
    architectural_style: 'Neoclassical with contemporary renovation by Paulo Mendes da Rocha',
    capacity: 800,
    established_year: 1905,
    notable_patrons: [
      'Família Mindlin (bibliophile collectors)',
      'Instituto Moreira Salles',
      'Fundação Bienal de São Paulo',
      'International museum partnerships'
    ],
    
    socialMedia: {
      instagram: '@pinacotecasp',
      facebook: 'PinacotecaSP',
      twitter: '@PinacotecaSP'
    }
  }
]

/**
 * Rio de Janeiro Luxury Lifestyle Venues
 * Sophisticated venues representing Rio's cultural aristocracy and luxury lifestyle
 */
export const RIO_LUXURY_LIFESTYLE: BrazilianCulturalVenue[] = [
  {
    id: 'theatro-municipal-rio',
    name: 'Municipal Theatre of Rio de Janeiro',
    namePortuguese: 'Teatro Municipal do Rio de Janeiro',
    type: 'opera_house',
    prestige: 'iconic',
    membershipRequired: false,
    dressCode: 'Formal evening wear for galas, cocktail attire for performances',
    
    address: 'Praça Floriano, s/n - Centro',
    city: 'Rio de Janeiro',
    neighborhood: 'Centro',
    
    phone: '+55 21 2332-9191',
    email: 'contato@theatromunicipal.rj.gov.br',
    website: 'https://theatromunicipal.rj.gov.br',
    
    description: 'Rio\'s crown jewel of performing arts, epitomizing the city\'s sophisticated cultural scene and carnival elegance',
    descriptionPortuguese: 'Joia da coroa das artes cênicas cariocas, simbolizando a sofisticada cena cultural da cidade e elegância carnavalesca',
    culturalImportance: 'Architectural masterpiece inspired by Paris Opera, center of Rio\'s cultural elite since 1909',
    
    signature_events: [
      {
        id: 'baile-municipal-carnival',
        name: 'Municipal Carnival Ball',
        namePortuguese: 'Baile de Carnaval do Municipal',
        type: 'gala',
        description: 'Rio\'s most prestigious carnival ball, where high society celebrates in elaborate costumes and masks',
        target_audience: ['Rio\'s social elite', 'International celebrities', 'Cultural ambassadors', 'Luxury tourists'],
        dress_code: 'Elaborate carnival costumes or formal masquerade attire',
        price_range: 'R$ 8,000 - R$ 80,000 per table',
        exclusivity: 'invitation_only',
        networking_potential: 'exclusive'
      }
    ],
    
    vip_services: [
      'Imperial box rentals with champagne service',
      'Private carnival costume consultations',
      'Exclusive pre-show receptions',
      'Celebrity meet-and-greet arrangements',
      'Luxury transportation coordination'
    ],
    
    target_demographic: [
      'Rio\'s cultural aristocracy',
      'International high society',
      'Luxury lifestyle enthusiasts',
      'Cultural diplomats',
      'Entertainment industry executives'
    ],
    
    business_networking: true,
    architectural_style: 'Eclectic with Louis XVI influences',
    capacity: 2357,
    established_year: 1909,
    notable_patrons: [
      'Brazilian cultural elite families',
      'International opera companies',
      'Rio\'s carnival royalty',
      'Global entertainment executives'
    ],
    
    socialMedia: {
      instagram: '@theatromunicipalrj',
      facebook: 'TeatroMunicipalRJ'
    }
  },
  
  {
    id: 'copacabana-palace',
    name: 'Copacabana Palace',
    namePortuguese: 'Copacabana Palace',
    type: 'luxury_restaurant',
    prestige: 'iconic',
    membershipRequired: false,
    dressCode: 'Resort elegant to black tie depending on venue and occasion',
    
    address: 'Avenida Atlântica, 1702 - Copacabana',
    city: 'Rio de Janeiro',
    neighborhood: 'Copacabana',
    
    phone: '+55 21 2548-7070',
    email: 'reservations@copacabanapalace.com.br',
    website: 'https://www.belmond.com/hotels/south-america/brazil/rio-de-janeiro/belmond-copacabana-palace',
    
    description: 'South America\'s most glamorous hotel, synonymous with Rio\'s golden age of luxury and international sophistication',
    descriptionPortuguese: 'Hotel mais glamouroso da América do Sul, sinônimo da era dourada do luxo carioca e sofisticação internacional',
    culturalImportance: 'Historic palace where Hollywood stars, royalty, and global elite have celebrated Rio\'s mystique since 1923',
    
    signature_events: [
      {
        id: 'reveillon-gala',
        name: 'New Year\'s Eve Gala',
        namePortuguese: 'Gala de Réveillon',
        type: 'gala',
        description: 'World\'s most exclusive New Year\'s celebration overlooking Copacabana beach with international celebrities',
        target_audience: ['Global elite', 'Entertainment celebrities', 'Business magnates', 'International socialites'],
        dress_code: 'White formal attire (traditional Brazilian New Year)',
        price_range: 'R$ 15,000 - R$ 150,000 per person',
        exclusivity: 'invitation_only',
        networking_potential: 'exclusive'
      }
    ],
    
    vip_services: [
      'Private beach club access',
      'Penthouse suite accommodations',
      'Personal concierge services',
      'Celebrity chef private dining',
      'Yacht charter arrangements',
      'Private helicopter transfers'
    ],
    
    target_demographic: [
      'Ultra-high-net-worth individuals',
      'International celebrities and royalty',
      'Global business executives',
      'Luxury lifestyle connoisseurs',
      'Cultural ambassadors'
    ],
    
    business_networking: true,
    architectural_style: 'Art Deco palace architecture',
    capacity: 400,
    established_year: 1923,
    notable_patrons: [
      'Hollywood golden age stars',
      'International royalty',
      'Brazilian business dynasties',
      'Global entertainment industry'
    ],
    
    socialMedia: {
      instagram: '@copacabanapalace',
      facebook: 'CopacabanaPalace'
    }
  }
]

/**
 * Brazilian Luxury Brands with UK Presence
 * Representing Brazil's economic powerhouse status and luxury market sophistication
 */
export const BRAZILIAN_LUXURY_BRANDS: BrazilianLuxuryBrand[] = [
  {
    id: 'antonio-bernardo',
    name: 'Antonio Bernardo',
    category: 'jewelry',
    description: 'Internationally acclaimed Brazilian jewelry designer, creating sophisticated pieces that embody Brazilian elegance and craftsmanship',
    prestige_level: 'world_class',
    uk_presence: {
      london_locations: ['Harrods Fine Jewelry Department', 'Selfridges Luxury Accessories', 'Private Bond Street showroom'],
      exclusive_partnerships: ['Harrods VIP services', 'Personal shopping experiences', 'Bespoke design consultations'],
      vip_services: ['Private fittings', 'Custom design services', 'Brazilian gemstone sourcing', 'International delivery']
    },
    target_market: ['High-net-worth women', 'Jewelry collectors', 'Brazilian cultural enthusiasts', 'Luxury gift buyers'],
    cultural_connection: 'Represents Brazil\'s sophisticated artistic heritage through contemporary jewelry design using native Brazilian gemstones'
  },
  
  {
    id: 'embraer-executive-jets',
    name: 'Embraer Executive Jets',
    category: 'automotive',
    description: 'World\'s third-largest aircraft manufacturer, representing Brazilian aerospace excellence and luxury private aviation',
    prestige_level: 'world_class',
    uk_presence: {
      london_locations: ['Farnborough Airport VIP terminal', 'London Biggin Hill Airport', 'Exclusive aircraft showroom'],
      exclusive_partnerships: ['NetJets Europe fleet', 'Flexjet UK operations', 'Private aviation concierge services'],
      vip_services: ['Private jet consultations', 'Custom interior design', 'UK-Brazil flight planning', 'Luxury ground transportation']
    },
    target_market: ['Ultra-high-net-worth individuals', 'Corporate executives', 'International business leaders', 'Brazilian expatriate executives'],
    cultural_connection: 'Showcases Brazil as a global technology leader and represents the sophistication of Brazilian engineering and design'
  },
  
  {
    id: 'havaianas-luxury',
    name: 'Havaianas Luxury Collection',
    category: 'fashion',
    description: 'Elevated luxury versions of Brazil\'s iconic footwear, featuring precious materials and designer collaborations',
    prestige_level: 'luxury',
    uk_presence: {
      london_locations: ['Selfridges Brazilian lifestyle section', 'Harrods summer collections', 'Exclusive pop-up stores'],
      exclusive_partnerships: ['Designer collaboration launches', 'Brazilian lifestyle events', 'Summer luxury campaigns'],
      vip_services: ['Custom embellishments', 'Limited edition access', 'Brazilian cultural styling', 'International shipping']
    },
    target_market: ['Luxury lifestyle enthusiasts', 'Brazilian culture admirers', 'Fashion-forward professionals', 'Celebrity clientele'],
    cultural_connection: 'Transforms Brazil\'s beach culture into luxury fashion, representing the country\'s lifestyle sophistication and global influence'
  },
  
  {
    id: 'banco-itau-private',
    name: 'Itaú Private Bank International',
    category: 'finance',
    description: 'Latin America\'s largest private bank offering exclusive wealth management for ultra-high-net-worth Brazilian and international clients',
    prestige_level: 'world_class',
    uk_presence: {
      london_locations: ['Mayfair private banking suite', 'Canary Wharf corporate office', 'Exclusive client lounges'],
      exclusive_partnerships: ['London Metal Exchange access', 'UK real estate investment services', 'Art acquisition financing'],
      vip_services: ['Private banking consultations', 'International wealth planning', 'Brazil-UK investment corridor', 'Cultural investment advisory']
    },
    target_market: ['Brazilian expatriate executives', 'International investors in Brazil', 'Family offices', 'Cultural institution investors'],
    cultural_connection: 'Represents Brazil\'s position as Latin America\'s financial powerhouse and sophisticated banking ecosystem'
  }
]

/**
 * London-Based Brazilian Elite Networking Opportunities
 * Exclusive venues and events for high-class Brazilian professionals in London
 */
export const LONDON_BRAZILIAN_ELITE_VENUES: BrazilianCulturalVenue[] = [
  {
    id: 'brazilian-embassy-london',
    name: 'Brazilian Embassy Cultural Centre',
    namePortuguese: 'Centro Cultural da Embaixada do Brasil',
    type: 'cultural_institution',
    prestige: 'prestigious',
    membershipRequired: true,
    dressCode: 'Business formal to black tie depending on event',
    
    address: '14-16 Cockspur Street',
    city: 'London',
    neighborhood: 'Westminster',
    coordinates: {
      latitude: 51.5074,
      longitude: -0.1278
    },
    
    phone: '+44 20 7747 4500',
    email: 'cultural@brazilian-embassy.org.uk',
    website: 'https://londres.itamaraty.gov.br',
    
    description: 'Official diplomatic venue hosting Brazil\'s most prestigious cultural and business events in London',
    descriptionPortuguese: 'Local diplomático oficial que hospeda os eventos culturais e empresariais mais prestigiosos do Brasil em Londres',
    culturalImportance: 'Center of Brazilian diplomatic and cultural activity, bridging Brazil\'s elite with London\'s high society',
    
    signature_events: [
      {
        id: 'independence-gala',
        name: 'Brazilian Independence Day Gala',
        namePortuguese: 'Gala do Dia da Independência do Brasil',
        type: 'gala',
        description: 'Annual black-tie celebration bringing together Brazilian and British business leaders, diplomats, and cultural figures',
        target_audience: ['Brazilian expatriate executives', 'British-Brazilian business leaders', 'Diplomatic community', 'Cultural ambassadors'],
        dress_code: 'Black tie',
        price_range: '£250 - £2,500 per person',
        exclusivity: 'invitation_only',
        networking_potential: 'exclusive'
      },
      {
        id: 'uk-brazil-business-forum',
        name: 'UK-Brazil Business Excellence Forum',
        namePortuguese: 'Fórum de Excelência Empresarial Reino Unido-Brasil',
        type: 'networking',
        description: 'Exclusive networking event for C-suite executives facilitating high-level business partnerships',
        target_audience: ['CEOs and Managing Directors', 'Private equity leaders', 'International investors', 'Government trade officials'],
        dress_code: 'Business formal',
        price_range: '£150 - £1,000 per person',
        exclusivity: 'member_exclusive',
        networking_potential: 'high'
      }
    ],
    
    vip_services: [
      'Diplomatic reception hosting',
      'Private meeting facilities',
      'Cultural event coordination',
      'Business introduction services',
      'Official document services',
      'Cultural diplomacy programs'
    ],
    
    target_demographic: [
      'Brazilian expatriate executives',
      'International business leaders',
      'Diplomatic community',
      'Cultural institution leaders',
      'Government officials'
    ],
    
    business_networking: true,
    architectural_style: 'Georgian townhouse with contemporary Brazilian cultural elements',
    capacity: 200,
    established_year: 1825,
    notable_patrons: [
      'Brazilian government officials',
      'UK-Brazil Chamber of Commerce',
      'Brazilian multinational corporations',
      'British diplomatic community'
    ],
    
    socialMedia: {
      instagram: '@brazilinuk',
      twitter: '@BrazilInUK',
      linkedin: 'Brazilian Embassy London'
    }
  },
  
  {
    id: 'gilgamesh-brazilian-nights',
    name: 'Gilgamesh Brazilian Elite Nights',
    namePortuguese: 'Noites da Elite Brasileira no Gilgamesh',
    type: 'private_club',
    prestige: 'luxury',
    membershipRequired: true,
    dressCode: 'Smart casual to cocktail attire',
    
    address: 'The Stables Market, Chalk Farm Road',
    city: 'London',
    neighborhood: 'Camden',
    
    phone: '+44 20 7482 5757',
    email: 'vip@gilgameshrestaurant.com',
    website: 'https://www.gilgameshrestaurant.com',
    
    description: 'Exclusive monthly gatherings for London\'s Brazilian professional elite in one of the city\'s most prestigious Asian fusion venues',
    descriptionPortuguese: 'Encontros mensais exclusivos para a elite profissional brasileira de Londres em um dos locais de fusão asiática mais prestigiosos da cidade',
    culturalImportance: 'Monthly networking hub where successful Brazilians in London connect, fostering business relationships and cultural exchange',
    
    signature_events: [
      {
        id: 'brazilian-professionals-mixer',
        name: 'Brazilian Professionals Elite Mixer',
        namePortuguese: 'Mixer da Elite Profissional Brasileira',
        type: 'networking',
        description: 'Monthly exclusive networking event for Brazilian executives and entrepreneurs in London\'s luxury dining scene',
        target_audience: ['Brazilian expatriate professionals', 'Entrepreneurs and business owners', 'Investment bankers', 'Consultants and lawyers'],
        dress_code: 'Smart casual to business elegant',
        price_range: '£80 - £300 per person',
        exclusivity: 'member_exclusive',
        networking_potential: 'high'
      }
    ],
    
    vip_services: [
      'Private dining rooms',
      'Curated Brazilian cocktail menus',
      'Business introduction services',
      'Cultural event planning',
      'Professional networking facilitation'
    ],
    
    target_demographic: [
      'Brazilian professionals in finance',
      'Technology entrepreneurs',
      'Legal and consulting executives',
      'Creative industry leaders',
      'Investment professionals'
    ],
    
    business_networking: true,
    architectural_style: 'Contemporary Asian fusion with Brazilian cultural elements',
    capacity: 150,
    established_year: 2008,
    
    socialMedia: {
      instagram: '@gilgameshrestaurant'
    }
  }
]

/**
 * Elite Brazilian Industries & Economic Powerhouse Showcase
 * Highlighting Brazil's position as Latin America's largest economy
 */
export const BRAZILIAN_ECONOMIC_POWERHOUSE = {
  gdp_ranking: 12, // 12th largest economy globally
  latin_america_position: 1, // Largest economy in Latin America
  key_industries: [
    {
      name: 'Financial Services',
      description: 'Home to Latin America\'s largest banks and financial institutions',
      global_companies: ['Itaú Unibanco', 'Banco do Brasil', 'Bradesco'],
      uk_presence: 'Major private banking operations in London'
    },
    {
      name: 'Mining & Commodities',
      description: 'World leader in iron ore, coffee, and agricultural commodities',
      global_companies: ['Vale', 'Petrobras'],
      uk_presence: 'Trading operations and commodity financing'
    },
    {
      name: 'Aerospace',
      description: 'Third-largest aircraft manufacturer globally',
      global_companies: ['Embraer'],
      uk_presence: 'European headquarters and luxury jet services'
    },
    {
      name: 'Technology',
      description: 'Leading Latin American tech hub with global reach',
      global_companies: ['Magazine Luiza', 'MercadoLibre', 'Stone Pagamentos'],
      uk_presence: 'European expansion and fintech partnerships'
    }
  ],
  cultural_sophistication: [
    'São Paulo: Global fashion capital with luxury shopping districts',
    'Rio de Janeiro: International tourism and luxury hospitality',
    'Brasília: UNESCO World Heritage architectural masterpiece',
    'Belo Horizonte: Contemporary art and cultural innovation center'
  ],
  luxury_lifestyle_indicators: [
    'World\'s 4th largest luxury car market',
    'Growing luxury real estate market in major cities',
    'Sophisticated culinary scene with Michelin-starred restaurants',
    'High-end fashion and jewelry design recognition',
    'Premium coffee culture and luxury hospitality'
  ]
}

/**
 * Get Brazilian cultural venues by type
 */
export function getBrazilianVenuesByType(type: BrazilianCulturalVenue['type']): BrazilianCulturalVenue[] {
  const allVenues = [...SAO_PAULO_CULTURAL_ELITE, ...RIO_LUXURY_LIFESTYLE, ...LONDON_BRAZILIAN_ELITE_VENUES]
  return allVenues.filter(venue => venue.type === type)
}

/**
 * Get elite networking events in London
 */
export function getBrazilianEliteEventsLondon(): EliteEvent[] {
  const londonVenues = LONDON_BRAZILIAN_ELITE_VENUES
  const allEvents: EliteEvent[] = []
  
  londonVenues.forEach(venue => {
    allEvents.push(...venue.signature_events)
  })
  
  return allEvents
}

/**
 * Get Brazilian luxury brands by category
 */
export function getBrazilianLuxuryBrandsByCategory(category: BrazilianLuxuryBrand['category']): BrazilianLuxuryBrand[] {
  return BRAZILIAN_LUXURY_BRANDS.filter(brand => brand.category === category)
}

/**
 * Get high-prestige venues for business networking
 */
export function getBusinessNetworkingVenues(): BrazilianCulturalVenue[] {
  const allVenues = [...SAO_PAULO_CULTURAL_ELITE, ...RIO_LUXURY_LIFESTYLE, ...LONDON_BRAZILIAN_ELITE_VENUES]
  return allVenues.filter(venue => 
    venue.business_networking && 
    (venue.prestige === 'iconic' || venue.prestige === 'prestigious')
  )
}

/**
 * Get exclusive invitation-only events
 */
export function getExclusiveInvitationEvents(): EliteEvent[] {
  const allVenues = [...SAO_PAULO_CULTURAL_ELITE, ...RIO_LUXURY_LIFESTYLE, ...LONDON_BRAZILIAN_ELITE_VENUES]
  const allEvents: EliteEvent[] = []
  
  allVenues.forEach(venue => {
    allEvents.push(...venue.signature_events.filter(event => event.exclusivity === 'invitation_only'))
  })
  
  return allEvents
}