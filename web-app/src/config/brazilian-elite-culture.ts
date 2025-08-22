/**
 * Brazilian Elite Cultural Configuration
 * Sophisticated luxury content for high-class Brazilian community in UK
 * Targeting affluent Brazilian professionals, executives, and cultural elites
 */

export interface BrazilianCulturalVenue {
  id: string
  name: string
  namePortuguese: string
  type: 'opera_house' | 'art_gallery' | 'luxury_restaurant' | 'private_club' | 'cultural_institution' | 'fashion_house' | 'samba_school' | 'music_venue' | 'dance_studio' | 'brazilian_nightclub' | 'churrascaria' | 'capoeira_academy' | 'cultural_center'
  
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
  type: 'gala' | 'exhibition' | 'concert' | 'networking' | 'cultural_exchange' | 'fashion_show' | 'samba_night' | 'roda_de_samba' | 'capoeira_performance' | 'brazilian_festival' | 'carnival_celebration' | 'forró_night' | 'bossa_nova_evening' | 'brazilian_bbq' | 'football_watch_party'
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
  category: 'fashion' | 'jewelry' | 'automotive' | 'real_estate' | 'hospitality' | 'finance' | 'music_production' | 'dance_academies' | 'food_beverage' | 'entertainment' | 'sports_clubs'
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
    id: 'som-livre-music',
    name: 'Som Livre Music Production',
    category: 'music_production',
    description: 'Brazil\'s leading music label revolutionizing how Brazilian music reaches global audiences with cutting-edge production and artist development',
    prestige_level: 'world_class',
    uk_presence: {
      london_locations: ['Abbey Road Studios partnership', 'Soho music production facilities', 'Camden recording studios'],
      exclusive_partnerships: ['BBC Radio collaborations', 'UK music festival partnerships', 'British music industry networks'],
      vip_services: ['International artist development', 'UK music industry introductions', 'Cross-cultural music production', 'Global music distribution']
    },
    target_market: ['Brazilian musicians in UK', 'International music industry professionals', 'Cultural music enthusiasts', 'Brazilian music investors'],
    cultural_connection: 'Showcases Brazil\'s incredible musical diversity and innovation, bringing authentic Brazilian sounds to global audiences through professional production'
  },
  
  {
    id: 'espacial-dance-academy',
    name: 'Espaçial Dance Academy',
    category: 'dance_academies',
    description: 'Premier Brazilian dance academy offering authentic samba, forró, and Brazilian funk instruction that connects people through the joy of movement',
    prestige_level: 'luxury',
    uk_presence: {
      london_locations: ['Shoreditch dance studios', 'Camden community centers', 'Covent Garden performance spaces'],
      exclusive_partnerships: ['London dance festival collaborations', 'Cultural center partnerships', 'International dance competitions'],
      vip_services: ['Private dance instruction', 'Brazilian dance performance bookings', 'Cultural dance workshops', 'Community event entertainment']
    },
    target_market: ['Dance enthusiasts', 'Brazilian culture seekers', 'Fitness community', 'Cultural event organizers'],
    cultural_connection: 'Preserves and shares authentic Brazilian dance traditions while creating community connections through the universal language of movement'
  },
  
  {
    id: 'guarana-antarctica-uk',
    name: 'Guaraná Antarctica UK',
    category: 'food_beverage',
    description: 'Brazil\'s iconic soft drink bringing that unique guaraná energy and authentic Brazilian flavor experience to the UK market',
    prestige_level: 'luxury',
    uk_presence: {
      london_locations: ['Harrods international section', 'Selfridges world foods', 'Brazilian restaurants and bars'],
      exclusive_partnerships: ['Brazilian restaurant supply', 'Cultural event sponsorships', 'Brazilian community partnerships'],
      vip_services: ['Event beverage catering', 'Brazilian culture education', 'Authentic flavor experiences', 'Community event support']
    },
    target_market: ['Brazilian expatriates', 'International flavor seekers', 'Cultural event organizers', 'Authentic beverage enthusiasts'],
    cultural_connection: 'Delivers authentic Brazilian energy and flavor, connecting people to Brazil\'s unique cultural identity through this beloved national beverage'
  },
  
  {
    id: 'flamengo-supporters-uk',
    name: 'Flamengo Supporters Club UK',
    category: 'sports_clubs',
    description: 'Official UK supporters club for Brazil\'s most passionate football team, creating incredible community celebrations and match experiences',
    prestige_level: 'luxury',
    uk_presence: {
      london_locations: ['Brazilian sports bars', 'Community centers for match viewing', 'Wembley Stadium events'],
      exclusive_partnerships: ['Brazilian Embassy cultural events', 'UK-Brazil football exchanges', 'Community integration programs'],
      vip_services: ['VIP match viewing experiences', 'Brazilian football culture education', 'Community celebration organization', 'Player meet-and-greet events']
    },
    target_market: ['Brazilian football fanatics', 'Sports community enthusiasts', 'Brazilian cultural participants', 'Football culture seekers'],
    cultural_connection: 'Channels the incredible passion and community spirit of Brazilian football culture, creating powerful social bonds through shared sporting love'
  },
  
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
  // Add London venues from other categories
  ...BRAZILIAN_MUSIC_DANCE_VENUES.filter(venue => venue.city === 'London'),
  ...BRAZILIAN_NIGHTLIFE_VENUES,
  ...BRAZILIAN_FOOD_CULTURE_VENUES.filter(venue => venue.city === 'London'),
  
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
  ],
  cultural_magnetism: [
    'Samba: The heartbeat that gets everyone moving - infectious rhythms creating instant community',
    'Bossa Nova: Smooth, intimate sounds perfect for sophisticated UK evening gatherings',
    'Capoeira: Incredible martial art combining music, acrobatics, and community spirit',
    'Brazilian BBQ (Churrasco): Amazing social dining experiences that bring people together',
    'Football Culture: Massive community celebrations during matches creating electric atmosphere',
    'Carnival Energy: Street parties bringing authentic Brazilian joy to UK communities',
    'Açaí Culture: Healthy, delicious lifestyle that connects wellness with community',
    'Forró Dancing: Traditional couples dancing that creates romantic connections',
    'Funk Carioca: High-energy urban beats that get entire communities moving',
    'Brigadeiro Tradition: Sweet treats that make any gathering instantly more special'
  ]
}

/**
 * Get all Brazilian cultural venues
 */
export function getAllBrazilianVenues(): BrazilianCulturalVenue[] {
  return [
    ...SAO_PAULO_CULTURAL_ELITE, 
    ...RIO_LUXURY_LIFESTYLE, 
    ...BRAZILIAN_MUSIC_DANCE_VENUES,
    ...BRAZILIAN_NIGHTLIFE_VENUES,
    ...BRAZILIAN_FOOD_CULTURE_VENUES,
    ...LONDON_BRAZILIAN_ELITE_VENUES.filter(venue => 
      !BRAZILIAN_MUSIC_DANCE_VENUES.some(mv => mv.id === venue.id) &&
      !BRAZILIAN_NIGHTLIFE_VENUES.some(nv => nv.id === venue.id) &&
      !BRAZILIAN_FOOD_CULTURE_VENUES.some(fv => fv.id === venue.id)
    )
  ]
}

/**
 * Get Brazilian cultural venues by type
 */
export function getBrazilianVenuesByType(type: BrazilianCulturalVenue['type']): BrazilianCulturalVenue[] {
  const allVenues = getAllBrazilianVenues()
  return allVenues.filter(venue => venue.type === type)
}

/**
 * Get Brazilian music and dance venues
 */
export function getBrazilianMusicDanceVenues(): BrazilianCulturalVenue[] {
  return BRAZILIAN_MUSIC_DANCE_VENUES
}

/**
 * Get Brazilian nightlife venues
 */
export function getBrazilianNightlifeVenues(): BrazilianCulturalVenue[] {
  return BRAZILIAN_NIGHTLIFE_VENUES
}

/**
 * Get Brazilian food culture venues
 */
export function getBrazilianFoodVenues(): BrazilianCulturalVenue[] {
  return BRAZILIAN_FOOD_CULTURE_VENUES
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
 * Get all Brazilian cultural events
 */
export function getAllBrazilianEvents(): EliteEvent[] {
  const allVenues = getAllBrazilianVenues()
  const allEvents: EliteEvent[] = []
  
  allVenues.forEach(venue => {
    allEvents.push(...venue.signature_events)
  })
  
  return allEvents
}

/**
 * Get Brazilian music and dance events
 */
export function getBrazilianMusicDanceEvents(): EliteEvent[] {
  const musicVenues = BRAZILIAN_MUSIC_DANCE_VENUES
  const allEvents: EliteEvent[] = []
  
  musicVenues.forEach(venue => {
    allEvents.push(...venue.signature_events)
  })
  
  return allEvents
}

/**
 * Get Brazilian nightlife events
 */
export function getBrazilianNightlifeEvents(): EliteEvent[] {
  const nightlifeVenues = BRAZILIAN_NIGHTLIFE_VENUES
  const allEvents: EliteEvent[] = []
  
  nightlifeVenues.forEach(venue => {
    allEvents.push(...venue.signature_events)
  })
  
  return allEvents
}

/**
 * Get Brazilian food culture events
 */
export function getBrazilianFoodEvents(): EliteEvent[] {
  const foodVenues = BRAZILIAN_FOOD_CULTURE_VENUES
  const allEvents: EliteEvent[] = []
  
  foodVenues.forEach(venue => {
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
  const allVenues = getAllBrazilianVenues()
  return allVenues.filter(venue => 
    venue.business_networking && 
    (venue.prestige === 'iconic' || venue.prestige === 'prestigious')
  )
}

/**
 * Get exclusive invitation-only events
 */
export function getExclusiveInvitationEvents(): EliteEvent[] {
  const allVenues = getAllBrazilianVenues()
  const allEvents: EliteEvent[] = []
  
  allVenues.forEach(venue => {
    allEvents.push(...venue.signature_events.filter(event => event.exclusivity === 'invitation_only'))
  })
  
  return allEvents
}

/**
 * Get community-focused Brazilian events (accessible and welcoming)
 */
export function getCommunityBrazilianEvents(): EliteEvent[] {
  const allEvents = getAllBrazilianEvents()
  return allEvents.filter(event => 
    event.exclusivity === 'luxury_ticketed' && 
    (event.type === 'roda_de_samba' || 
     event.type === 'forró_night' || 
     event.type === 'capoeira_performance' || 
     event.type === 'brazilian_festival' || 
     event.type === 'carnival_celebration')
  )
}

/**
 * Get food and social dining events
 */
export function getBrazilianSocialDiningEvents(): EliteEvent[] {
  const allEvents = getAllBrazilianEvents()
  return allEvents.filter(event => 
    event.type === 'brazilian_bbq' || 
    event.type === 'brazilian_festival'
  )
}

/**
 * Get Brazilian cultural magnetism highlights
 */
export function getBrazilianCulturalMagnetism(): string[] {
  return BRAZILIAN_ECONOMIC_POWERHOUSE.cultural_magnetism
}

/**
 * Brazilian Music & Dance Culture Venues
 * Incredible spaces where Brazilian rhythms come alive and communities connect
 */
export const BRAZILIAN_MUSIC_DANCE_VENUES: BrazilianCulturalVenue[] = [
  {
    id: 'vila-madalena-samba',
    name: 'Vila Madalena Samba Circle',
    namePortuguese: 'Roda de Samba da Vila Madalena',
    type: 'samba_school',
    prestige: 'iconic',
    membershipRequired: false,
    dressCode: 'Casual Brazilian street style - colorful and comfortable for dancing',
    
    address: 'Rua Aspicuelta, Vila Madalena',
    city: 'São Paulo',
    neighborhood: 'Vila Madalena',
    coordinates: {
      latitude: -23.5562,
      longitude: -46.6856
    },
    
    phone: '+55 11 9876-5432',
    email: 'contato@rodavilamadalena.com.br',
    website: 'https://sambavilamadalena.com.br',
    
    description: 'The heartbeat of São Paulo\'s samba scene - where infectious rhythms unite people from all walks of life in pure musical joy',
    descriptionPortuguese: 'O coração da cena do samba paulistano - onde ritmos contagiantes unem pessoas de todas as origens em pura alegria musical',
    culturalImportance: 'Authentic community samba circle where the spirit of Brazilian music creates magical connections every weekend',
    
    signature_events: [
      {
        id: 'roda-de-samba-domingo',
        name: 'Sunday Samba Circle',
        namePortuguese: 'Roda de Samba de Domingo',
        type: 'roda_de_samba',
        description: 'Weekly community samba gathering where everyone participates - from beginners to masters, creating pure Brazilian magic',
        target_audience: ['Samba enthusiasts', 'Brazilian community', 'Music lovers', 'Dance beginners', 'Local families'],
        dress_code: 'Comfortable clothes ready for dancing and singing',
        price_range: 'R$ 15 - R$ 40 (includes caipirinha)',
        exclusivity: 'luxury_ticketed',
        networking_potential: 'high'
      },
      {
        id: 'pagode-noite-especial',
        name: 'Special Pagode Night',
        namePortuguese: 'Noite Especial de Pagode',
        type: 'samba_night',
        description: 'Monthly celebration featuring renowned pagode artists that gets the entire community moving to irresistible beats',
        target_audience: ['Pagode lovers', 'Brazilian diaspora', 'Music enthusiasts', 'Night life lovers'],
        dress_code: 'Brazilian party style - bright colors and dancing shoes',
        price_range: 'R$ 50 - R$ 120',
        exclusivity: 'luxury_ticketed',
        networking_potential: 'high'
      }
    ],
    
    vip_services: [
      'Personal samba instruction from masters',
      'Premium caipirinha and Brazilian snacks',
      'Reserved seating in the music circle',
      'Meet-and-greet with visiting artists',
      'Brazilian percussion instrument rentals'
    ],
    
    partnership_benefits: [
      'Community integration through music',
      'Cultural exchange opportunities',
      'Local musician networking',
      'Brazilian cultural immersion',
      'Authentic community connections'
    ],
    
    target_demographic: [
      'Brazilian music enthusiasts',
      'International samba lovers',
      'Community culture seekers',
      'Dance and music students',
      'Cultural experience seekers'
    ],
    
    social_occasions: [
      'Community celebration gatherings',
      'Cultural exchange meetups',
      'Musical learning experiences',
      'Brazilian friendship building',
      'International cultural appreciation'
    ],
    
    business_networking: true,
    
    architectural_style: 'Open-air community space with traditional Brazilian decorations',
    capacity: 300,
    established_year: 1995,
    notable_patrons: [
      'Local samba musicians and masters',
      'Brazilian cultural associations',
      'International music students',
      'Community cultural leaders'
    ],
    
    socialMedia: {
      instagram: '@rodavilamadalena',
      facebook: 'SambaVilaMadalena'
    }
  },
  
  {
    id: 'lapa-arches-forró',
    name: 'Lapa Arches Forró House',
    namePortuguese: 'Casa do Forró dos Arcos da Lapa',
    type: 'dance_studio',
    prestige: 'prestigious',
    membershipRequired: false,
    dressCode: 'Comfortable for partner dancing - flowing dresses and comfortable shoes recommended',
    
    address: 'Rua dos Arcos, Lapa',
    city: 'Rio de Janeiro',
    neighborhood: 'Lapa',
    
    phone: '+55 21 9876-5432',
    email: 'contato@forrolapa.com.br',
    website: 'https://forrolapa.com.br',
    
    description: 'Rio\'s premier forró destination where couples dance brings people together in the most romantic Brazilian tradition',
    descriptionPortuguese: 'Principal destino de forró do Rio onde a dança a dois une pessoas na mais romântica tradição brasileira',
    culturalImportance: 'Historic venue where traditional Brazilian couples dancing creates magical connections under Rio\'s iconic arches',
    
    signature_events: [
      {
        id: 'noite-de-forró-tradicional',
        name: 'Traditional Forró Night',
        namePortuguese: 'Noite de Forró Tradicional',
        type: 'forró_night',
        description: 'Weekly celebration where beginners and experts dance together to infectious northeastern Brazilian rhythms',
        target_audience: ['Forró enthusiasts', 'Couples', 'Dance learners', 'Brazilian culture lovers', 'Social dancers'],
        dress_code: 'Comfortable dancing attire with flowing fabrics',
        price_range: 'R$ 25 - R$ 60 (includes dance lesson)',
        exclusivity: 'luxury_ticketed',
        networking_potential: 'high'
      }
    ],
    
    vip_services: [
      'Private forró lessons with renowned instructors',
      'Premium dance floor access',
      'Traditional northeastern Brazilian snacks',
      'Live accordion and zabumba performances',
      'Partner matching for single dancers'
    ],
    
    target_demographic: [
      'Brazilian dance enthusiasts',
      'Couples seeking cultural experiences',
      'International dance students',
      'Cultural immersion seekers',
      'Social connection seekers'
    ],
    
    business_networking: true,
    architectural_style: 'Traditional Brazilian colonial with open dance spaces',
    capacity: 200,
    established_year: 1980,
    
    socialMedia: {
      instagram: '@forrolapa',
      facebook: 'ForroLapa'
    }
  },
  
  {
    id: 'capoeira-cordao-de-ouro-london',
    name: 'Capoeira Cordão de Ouro London',
    namePortuguese: 'Capoeira Cordão de Ouro Londres',
    type: 'capoeira_academy',
    prestige: 'prestigious',
    membershipRequired: true,
    dressCode: 'Traditional white capoeira uniform (abadá) or comfortable athletic wear',
    
    address: '45 Great Eastern Street',
    city: 'London',
    neighborhood: 'Shoreditch',
    coordinates: {
      latitude: 51.5254,
      longitude: -0.0844
    },
    
    phone: '+44 20 7739-8234',
    email: 'london@cordaodeouro.co.uk',
    website: 'https://cordaodeouro.co.uk',
    
    description: 'London\'s premier capoeira academy where Brazilian martial arts, music, and acrobatics create an incredible community experience',
    descriptionPortuguese: 'Principal academia de capoeira de Londres onde artes marciais, música e acrobacias brasileiras criam uma experiência comunitária incrível',
    culturalImportance: 'Authentic Brazilian cultural institution bringing the complete capoeira experience - movement, music, and community - to London',
    
    signature_events: [
      {
        id: 'roda-de-capoeira-mensal',
        name: 'Monthly Capoeira Roda',
        namePortuguese: 'Roda de Capoeira Mensal',
        type: 'capoeira_performance',
        description: 'Spectacular monthly gathering where capoeiristas showcase incredible acrobatics while live berimbau creates magical atmosphere',
        target_audience: ['Capoeira practitioners', 'Brazilian community', 'Martial arts enthusiasts', 'Cultural experience seekers'],
        dress_code: 'Traditional capoeira whites or comfortable athletic wear',
        price_range: '£15 - £35 (includes traditional Brazilian snacks)',
        exclusivity: 'luxury_ticketed',
        networking_potential: 'high'
      },
      {
        id: 'batizado-anual',
        name: 'Annual Batizado Ceremony',
        namePortuguese: 'Batizado Anual',
        type: 'brazilian_festival',
        description: 'Incredible annual celebration where new students receive their first cordão in authentic Brazilian ceremony with master capoeiristas',
        target_audience: ['Capoeira students', 'Brazilian cultural enthusiasts', 'Martial arts community', 'Cultural ceremony attendees'],
        dress_code: 'Traditional white capoeira uniform',
        price_range: '£25 - £75 (includes ceremonial meal)',
        exclusivity: 'member_exclusive',
        networking_potential: 'exclusive'
      }
    ],
    
    vip_services: [
      'Private lessons with Mestre (master)',
      'Traditional berimbau and pandeiro instruction',
      'Brazilian Portuguese language lessons',
      'Cultural immersion workshops',
      'International capoeira event coordination'
    ],
    
    target_demographic: [
      'Brazilian martial arts enthusiasts',
      'Fitness and acrobatics lovers',
      'Cultural immersion seekers',
      'Brazilian community members',
      'International capoeira practitioners'
    ],
    
    business_networking: true,
    architectural_style: 'Modern studio with traditional Brazilian cultural elements',
    capacity: 80,
    established_year: 2005,
    
    socialMedia: {
      instagram: '@cordaodeourolondon',
      facebook: 'CapoeiraCordaoDeOuroLondon'
    }
  }
]

/**
 * Brazilian Nightlife & Social Scene Venues
 * Where Brazilian energy and community spirit create unforgettable nights
 */
export const BRAZILIAN_NIGHTLIFE_VENUES: BrazilianCulturalVenue[] = [
  {
    id: 'boteco-do-brasil-london',
    name: 'Boteco do Brasil London',
    namePortuguese: 'Boteco do Brasil Londres',
    type: 'brazilian_nightclub',
    prestige: 'luxury',
    membershipRequired: false,
    dressCode: 'Brazilian party style - colorful, fun, and ready to dance all night',
    
    address: '32 Kingsland Road',
    city: 'London',
    neighborhood: 'Shoreditch',
    
    phone: '+44 20 7739-9876',
    email: 'festa@botecobrasilondon.com',
    website: 'https://botecobrasilondon.com',
    
    description: 'London\'s hottest Brazilian nightlife destination where authentic Brazilian energy meets UK nightlife sophistication',
    descriptionPortuguese: 'Destino noturno brasileiro mais quente de Londres onde a autêntica energia brasileira encontra a sofisticação noturna do Reino Unido',
    culturalImportance: 'Premier venue bringing authentic Brazilian party culture to London with live music, incredible cocktails, and infectious energy',
    
    signature_events: [
      {
        id: 'samba-saturday-nights',
        name: 'Samba Saturday Nights',
        namePortuguese: 'Noites de Samba dos Sábados',
        type: 'samba_night',
        description: 'Weekly celebration where Brazilian DJs and live samba keep the dance floor packed until dawn with pure Brazilian magic',
        target_audience: ['Brazilian nightlife lovers', 'Samba enthusiasts', 'London party scene', 'International students', 'Brazilian expatriates'],
        dress_code: 'Party ready - colorful and comfortable for dancing',
        price_range: '£15 - £35 (includes welcome caipirinha)',
        exclusivity: 'luxury_ticketed',
        networking_potential: 'high'
      },
      {
        id: 'carnival-preview-party',
        name: 'Carnival Preview Party',
        namePortuguese: 'Festa Prévia de Carnaval',
        type: 'carnival_celebration',
        description: 'Epic monthly celebration bringing Rio carnival energy to London with costumes, percussion, and non-stop Brazilian dancing',
        target_audience: ['Carnival enthusiasts', 'Brazilian community', 'Costume party lovers', 'Cultural celebration seekers'],
        dress_code: 'Carnival costumes or bright Brazilian colors',
        price_range: '£25 - £60 (includes Brazilian buffet)',
        exclusivity: 'luxury_ticketed',
        networking_potential: 'high'
      }
    ],
    
    vip_services: [
      'Premium caipirinha and Brazilian cocktail service',
      'VIP lounge with Brazilian snacks',
      'Meet-and-greet with Brazilian artists',
      'Private carnival costume consultations',
      'Brazilian music requests and dedications'
    ],
    
    target_demographic: [
      'Brazilian nightlife enthusiasts',
      'London party scene participants',
      'Cultural celebration seekers',
      'International students',
      'Brazilian expatriate community'
    ],
    
    business_networking: true,
    architectural_style: 'Modern Brazilian-themed nightclub with authentic decorations',
    capacity: 250,
    established_year: 2015,
    
    socialMedia: {
      instagram: '@botecobrasilondon',
      facebook: 'BotecoBrasilLondon'
    }
  }
]

/**
 * Brazilian Food Culture Venues
 * Incredible Brazilian culinary experiences that bring people together
 */
export const BRAZILIAN_FOOD_CULTURE_VENUES: BrazilianCulturalVenue[] = [
  {
    id: 'fogo-de-chao-london',
    name: 'Fogo de Chão London',
    namePortuguese: 'Fogo de Chão Londres',
    type: 'churrascaria',
    prestige: 'luxury',
    membershipRequired: false,
    dressCode: 'Smart casual to business casual for the ultimate Brazilian dining experience',
    
    address: '25 Maiden Lane',
    city: 'London',
    neighborhood: 'Covent Garden',
    coordinates: {
      latitude: 51.5106,
      longitude: -0.1225
    },
    
    phone: '+44 20 7395-4333',
    email: 'london@fogodechao.com',
    website: 'https://fogodechao.com/location/london',
    
    description: 'London\'s premier Brazilian steakhouse where the authentic gaucho tradition creates an incredible social dining experience that brings people together',
    descriptionPortuguese: 'Principal churrascaria brasileira de Londres onde a autêntica tradição gaúcha cria uma experiência gastronômica social incrível que une as pessoas',
    culturalImportance: 'Authentic Brazilian churrasco experience showcasing the social dining culture that makes Brazilian gatherings so special and communal',
    
    signature_events: [
      {
        id: 'domingo-churrasco-family',
        name: 'Sunday Family Churrasco',
        namePortuguese: 'Churrasco Familiar de Domingo',
        type: 'brazilian_bbq',
        description: 'Traditional Brazilian Sunday gathering where families and friends share incredible grilled meats and create lasting memories together',
        target_audience: ['Brazilian families', 'Food enthusiasts', 'Social dining lovers', 'Cultural experience seekers', 'Weekend celebrators'],
        dress_code: 'Comfortable family dining attire',
        price_range: '£45 - £85 per person (includes unlimited meat service)',
        exclusivity: 'luxury_ticketed',
        networking_potential: 'high'
      },
      {
        id: 'feijoada-festival',
        name: 'Monthly Feijoada Festival',
        namePortuguese: 'Festival Mensal de Feijoada',
        type: 'brazilian_festival',
        description: 'Monthly celebration of Brazil\'s ultimate comfort food - bringing together the community for this beloved Saturday tradition',
        target_audience: ['Brazilian community', 'Comfort food lovers', 'Cultural tradition seekers', 'Social dining enthusiasts'],
        dress_code: 'Casual and comfortable for this traditional weekend meal',
        price_range: '£35 - £65 (includes traditional feijoada and accompaniments)',
        exclusivity: 'luxury_ticketed',
        networking_potential: 'high'
      }
    ],
    
    vip_services: [
      'Premium meat cuts and exclusive selections',
      'Traditional caipirinha and Brazilian wine pairings',
      'Private dining rooms for group celebrations',
      'Brazilian culinary education experiences',
      'Gaucho cultural storytelling during meals'
    ],
    
    target_demographic: [
      'Brazilian food enthusiasts',
      'Social dining lovers',
      'Cultural experience seekers',
      'Business entertainment hosts',
      'Family celebration organizers'
    ],
    
    business_networking: true,
    architectural_style: 'Authentic Brazilian steakhouse with gaucho cultural elements',
    capacity: 220,
    established_year: 2016,
    
    socialMedia: {
      instagram: '@fogodechaolondon',
      facebook: 'FogodeChaoLondon'
    }
  }
]