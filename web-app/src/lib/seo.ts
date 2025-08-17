'use client'

// Portuguese Community SEO Strategy
// Optimized for Portuguese speakers seeking community and business connections in London

export interface SEOMetadata {
  title: string
  titlePortuguese?: string
  description: string
  descriptionPortuguese?: string
  keywords: string[]
  canonicalUrl?: string
  ogImage?: string
  structuredData?: any
  hreflang?: { [key: string]: string }
}

// Primary Portuguese SEO Keywords
export const PRIMARY_PORTUGUESE_KEYWORDS = [
  // Community focused
  'comunidade portuguesa londres',
  'portugueses em londres', 
  'brasileiros em londres',
  'lusófonos londres',
  'angolanos em londres',
  'moçambicanos em londres',
  'cabo-verdianos londres',
  'comunidade lusófona reino unido',
  'familia portuguesa londres',
  'casa portuguesa londres',
  
  // Activity focused (replacing "finding community")
  'atividades para portugueses londres',
  'eventos portugueses londres',
  'fazer amigos portugueses londres',
  'conhecer portugueses londres',
  'grupos portugueses londres',
  'sair com portugueses londres',
  'cultura portuguesa londres',
  'encontros lusófonos londres',
  'agenda social portuguesa',
  'fim de semana português londres',
  
  // Business focused
  'negócios portugueses londres',
  'empresários portugueses londres',
  'networking português londres',
  'trabalho para portugueses londres',
  'empreendedores portugueses',
  
  // Location specific
  'portuguese community london',
  'portuguese people london',
  'brazilian community london',
  'lusophone london',
  'portuguese events london',
  'portuguese business london',
  'portuguese networking london',
  'portuguese cultural events london'
]

// Long-tail Keywords for Activities and Social Calendar
export const LONG_TAIL_KEYWORDS = [
  // Social calendar keywords
  'agenda social portuguesa londres',
  'calendário de eventos portugueses',
  'próximos eventos portugueses londres',
  'fim de semana português londres',
  'atividades culturais portuguesas',
  'programação lusófona londres',
  'eventos fim de semana português',
  
  // Activity-specific
  'restaurantes portugueses londres',
  'fado em londres',
  'futebol português londres',
  'passeios portugueses londres',
  'festas portuguesas londres',
  'música portuguesa londres',
  'cinema português londres',
  'teatro português londres',
  'santos populares londres',
  'pastéis de nata londres',
  'francesinha em londres',
  'bifana londres',
  'matança do porco tradições',
  'festa das vindimas',
  
  // Social connections (not "finding community")
  'conhecer pessoas portuguesas londres',
  'amigos portugueses londres',
  'namorar portugueses londres',
  'grupos de amizade portugueses',
  'conversas em português londres',
  'whatsapp portugueses londres',
  
  // Business networking
  'câmara de comércio portuguesa londres',
  'associação empresários portugueses',
  'startup portuguesa londres',
  'investir portugal desde londres',
  'importar portugal para reino unido',
  'consultoria portuguesa londres'
]

// Location-based Keywords
export const LOCATION_KEYWORDS = [
  // London areas with Portuguese communities
  'portugueses stockwell',
  'portugueses vauxhall', 
  'portugueses south lambeth',
  'portugueses elephant castle',
  'portugueses bermondsey',
  'portugueses east london',
  'portugueses camden',
  'portugueses kilburn',
  'portugueses harrow',
  'portugueses hounslow',
  
  // Transportation hubs
  'portugueses victoria station',
  'portugueses liverpool street',
  'portugueses paddington',
  'portuguese community tube stations',
  
  // Nearby cities
  'portuguese community birmingham',
  'portuguese community manchester',
  'portuguese community glasgow',
  'portuguese community dublin',
  'portuguese community paris'
]

// Competitor Analysis Keywords
export const COMPETITOR_KEYWORDS = [
  // Generic community platforms
  'meetup portuguese london',
  'facebook grupos portugueses londres',
  'portuguese meetup groups london',
  'whatsapp grupos portugueses uk',
  
  // Business platforms
  'portuguese chamber commerce uk',
  'luso british chamber commerce',
  'portuguese trade association uk',
  'invest portugal uk',
  
  // Cultural organizations
  'instituto camões londres',
  'casa do brasil londres',
  'centro cultural português londres',
  'portuguese embassy cultural events'
]

// SEO Page Configurations
export const SEO_PAGES: { [key: string]: SEOMetadata } = {
  home: {
    title: 'LusoTown London - Your Portuguese Social Calendar in London',
    titlePortuguese: 'LusoTown London - Sua Agenda Social Portuguesa em Londres',
    description: 'Your Portuguese social calendar in London. Book experiences, find activities, and connect with Portuguese speakers from museums and football to concerts and weekend trips.',
    descriptionPortuguese: 'Sua agenda social portuguesa em Londres. Reserve experiências, encontre atividades e conecte-se com lusófonos - de museus e futebol a concertos e viagens de fim de semana.',
    keywords: [
      'portuguese social calendar london',
      'agenda social portuguesa londres',
      'portuguese community london',
      'comunidade portuguesa londres',
      'portuguese events london',
      'eventos portugueses londres',
      'brazilian community london',
      'brasileiros em londres',
      'lusophone activities london',
      'atividades lusófonas londres',
      'portuguese friends london',
      'amigos portugueses londres',
      'portuguese culture london',
      'cultura portuguesa londres'
    ],
    canonicalUrl: 'https://lusotown.com',
    ogImage: 'https://lusotown.com/og-image-home.jpg',
    hreflang: {
      'en': 'https://lusotown.com',
      'pt': 'https://lusotown.com?lang=pt'
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "LusoTown London",
      "alternateName": "LusoTown",
      "description": "Portuguese social calendar and community platform in London",
      "url": "https://lusotown.com",
      "logo": "https://lusotown.com/logo.png",
      "sameAs": [
        "https://facebook.com/lusotownlondon",
        "https://instagram.com/lusotownlondon",
        "https://linkedin.com/company/lusotown"
      ],
      "areaServed": {
        "@type": "City",
        "name": "London",
        "addressCountry": "GB"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "Portuguese speakers in London"
      }
    }
  },
  
  events: {
    title: 'Portuguese Events in London - Cultural Activities & Social Calendar',
    titlePortuguese: 'Eventos Portugueses em Londres - Atividades Culturais e Agenda Social',
    description: 'Discover Portuguese cultural events, social activities, and community gatherings in London. From Fado nights to business networking, find your next Portuguese experience.',
    descriptionPortuguese: 'Descubra eventos culturais portugueses, atividades sociais e encontros comunitários em Londres. De noites de Fado a networking empresarial, encontre sua próxima experiência portuguesa.',
    keywords: [
      'portuguese events london',
      'eventos portugueses londres',
      'fado nights london',
      'noites de fado londres',
      'portuguese festivals london',
      'festivais portugueses londres',
      'portuguese cultural events',
      'eventos culturais portugueses',
      'portuguese music london',
      'música portuguesa londres',
      'portuguese food events london',
      'eventos gastronomia portuguesa'
    ]
  },
  
  businessDirectory: {
    title: 'Portuguese Business Directory London - Authentic Lusophone Services',
    titlePortuguese: 'Diretório de Negócios Portugueses Londres - Serviços Lusófonos Autênticos',
    description: 'Find verified Portuguese-owned businesses in London. Restaurants, services, consulting, and more from authentic Portuguese entrepreneurs across the UK.',
    descriptionPortuguese: 'Encontre negócios verificados de proprietários portugueses em Londres. Restaurantes, serviços, consultoria e mais de empreendedores portugueses autênticos no Reino Unido.',
    keywords: [
      'portuguese business directory london',
      'diretório negócios portugueses londres',
      'portuguese restaurants london',
      'restaurantes portugueses londres',
      'portuguese services london',
      'serviços portugueses londres',
      'portuguese entrepreneurs london',
      'empreendedores portugueses londres',
      'verified portuguese businesses',
      'negócios portugueses verificados',
      'lusophone business london',
      'empresas lusófonas londres'
    ]
  },
  
  businessNetworking: {
    title: 'Portuguese Business Networking London - Entrepreneur Events & Partnerships',
    titlePortuguese: 'Networking Empresarial Português Londres - Eventos e Parcerias',
    description: 'Connect with Portuguese entrepreneurs and business professionals in London. Networking events, investor meetups, and partnership opportunities for the Portuguese business community.',
    descriptionPortuguese: 'Conecte-se com empreendedores e profissionais portugueses em Londres. Eventos de networking, encontros de investidores e oportunidades de parceria para a comunidade empresarial portuguesa.',
    keywords: [
      'portuguese business networking london',
      'networking empresarial português londres',
      'portuguese entrepreneurs london',
      'empreendedores portugueses londres',
      'portuguese business events london',
      'eventos negócios portugueses londres',
      'portuguese chamber commerce',
      'câmara comércio portuguesa',
      'portuguese startup ecosystem london',
      'ecossistema startup português',
      'portuguese investors london',
      'investidores portugueses londres'
    ]
  },
  
  community: {
    title: 'Portuguese Community London - Your Lusophone Family in the UK',
    titlePortuguese: 'Comunidade Portuguesa Londres - A Sua Família Lusófona no Reino Unido',
    description: 'Join London\'s vibrant Portuguese community where saudade transforms into joy. Make lifelong friends, celebrate our heritage, and stay connected to Portuguese culture while living in the UK.',
    descriptionPortuguese: 'Junte-se à vibrante comunidade portuguesa de Londres onde a saudade se transforma em alegria. Faça amizades para a vida, celebre a nossa herança, e mantenha-se conectado à cultura portuguesa enquanto vive no Reino Unido.',
    keywords: [
      'portuguese community london',
      'comunidade portuguesa londres',
      'familia portuguesa londres',
      'casa portuguesa londres',
      'portuguese friends london',
      'amigos portugueses londres',
      'portuguese culture london',
      'cultura portuguesa londres',
      'brazilian community london',
      'comunidade brasileira londres',
      'angolan community london',
      'comunidade angolana londres',
      'mozambican community london',
      'cabo-verdianos londres',
      'lusophone community uk',
      'comunidade lusófona reino unido',
      'saudade portugal london',
      'heritage preservation portuguese',
      'preservação cultural portuguesa'
    ]
  },
  
  heritage: {
    title: 'Portuguese Culture & Community Preservation London - Instituto Camões Partnership',
    titlePortuguese: 'Cultura Portuguesa e Preservação Comunitária Londres - Parceria Instituto Camões',
    description: 'Preserve and celebrate Portuguese culture in London through our official Instituto Camões partnership. Cultural workshops, language classes, and community preservation programs',
    descriptionPortuguese: 'Preserve e celebre o património português em Londres através da nossa parceria oficial com o Instituto Camões. Oficinas culturais, aulas de língua e programas de preservação cultural.',
    keywords: [
      'portuguese culture london',
      'cultura portuguesa londres',
      'instituto camões london',
      'instituto camões londres',
      'portuguese cultural preservation',
      'preservação cultural portuguesa',
      'portuguese traditions london',
      'tradições portuguesas londres',
      'lusophone culture uk',
      'património lusófono reino unido',
      'fado traditions london',
      'tradições fado londres',
      'portuguese folklore london',
      'folclore português londres'
    ]
  }
}

// SEO Utility Functions
export class SEOService {
  
  static generateMetaTags(page: keyof typeof SEO_PAGES, language: 'en' | 'pt' = 'en'): {
    title: string
    description: string
    keywords: string
    canonical?: string
    ogTitle: string
    ogDescription: string
    ogImage?: string
    structuredData?: string
  } {
    const pageConfig = SEO_PAGES[page]
    if (!pageConfig) {
      throw new Error(`SEO configuration not found for page: ${page}`)
    }

    const title = language === 'pt' && pageConfig.titlePortuguese 
      ? pageConfig.titlePortuguese 
      : pageConfig.title
    
    const description = language === 'pt' && pageConfig.descriptionPortuguese
      ? pageConfig.descriptionPortuguese
      : pageConfig.description

    return {
      title,
      description,
      keywords: pageConfig.keywords.join(', '),
      canonical: pageConfig.canonicalUrl,
      ogTitle: title,
      ogDescription: description,
      ogImage: pageConfig.ogImage,
      structuredData: pageConfig.structuredData ? JSON.stringify(pageConfig.structuredData) : undefined
    }
  }

  static generateSitemap(): string {
    const baseUrl = 'https://lusotown.com'
    const pages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/events', priority: '0.9', changefreq: 'daily' },
      { url: '/business-directory', priority: '0.9', changefreq: 'weekly' },
      { url: '/business-networking', priority: '0.8', changefreq: 'weekly' },
      { url: '/community', priority: '0.8', changefreq: 'weekly' },
      { url: '/about', priority: '0.7', changefreq: 'monthly' },
      { url: '/contact', priority: '0.6', changefreq: 'monthly' },
      { url: '/feed', priority: '0.8', changefreq: 'daily' },
      { url: '/directory', priority: '0.7', changefreq: 'weekly' },
      { url: '/groups', priority: '0.7', changefreq: 'weekly' }
    ]

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`

    pages.forEach(page => {
      sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.url}" />
    <xhtml:link rel="alternate" hreflang="pt" href="${baseUrl}${page.url}?lang=pt" />
  </url>`
    })

    sitemap += `
</urlset>`

    return sitemap
  }

  static generateRobotsTxt(): string {
    const baseUrl = 'https://lusotown.com'
    
    return `User-agent: *
Allow: /

# Portuguese content optimization
Allow: /?lang=pt
Allow: /events?lang=pt
Allow: /business-directory?lang=pt
Allow: /business-networking?lang=pt

# Important pages for crawling
Allow: /events
Allow: /business-directory
Allow: /business-networking
Allow: /community
Allow: /directory
Allow: /groups

# Block admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /profile/edit
Disallow: /dashboard/private

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay for better performance
Crawl-delay: 1`
  }

  static generateLocalBusinessStructuredData(business: any): any {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": business.name,
      "alternateName": business.namePortuguese,
      "description": business.description,
      "url": business.website,
      "telephone": business.phone,
      "email": business.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": business.address,
        "postalCode": business.postcode,
        "addressLocality": "London",
        "addressCountry": "GB"
      },
      "geo": business.coordinates ? {
        "@type": "GeoCoordinates",
        "latitude": business.coordinates.lat,
        "longitude": business.coordinates.lng
      } : undefined,
      "openingHours": Object.entries(business.openingHours || {}).map(([day, hours]) => 
        `${day.substring(0, 2).toUpperCase()} ${hours}`
      ),
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": business.rating,
        "reviewCount": business.reviewCount
      },
      "servedCuisine": business.category === 'restaurant' ? "Portuguese" : undefined,
      "priceRange": business.price < 20 ? "£" : business.price < 50 ? "££" : "£££",
      "acceptedPaymentMethod": ["Cash", "Credit Card"],
      "areaServed": "London",
      "audience": {
        "@type": "Audience",
        "audienceType": "Portuguese speakers"
      }
    }
  }

  static generateEventStructuredData(event: any): any {
    return {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": event.title,
      "description": event.description,
      "startDate": `${event.date}T${event.time}:00`,
      "endDate": `${event.date}T${event.endTime}:00`,
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": event.location,
        "address": event.address
      },
      "image": event.images,
      "organizer": {
        "@type": "Organization",
        "name": event.hostName,
        "url": "https://lusotown.com"
      },
      "offers": {
        "@type": "Offer",
        "price": event.price,
        "priceCurrency": event.currency,
        "availability": event.currentAttendees < event.maxAttendees 
          ? "https://schema.org/InStock" 
          : "https://schema.org/SoldOut",
        "url": `https://lusotown.com/events/${event.id}`
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "Portuguese speakers"
      },
      "inLanguage": ["pt", "en"],
      "about": event.culturalTheme
    }
  }

  // Portuguese SEO Content Templates
  static getPortugueseContentTemplates() {
    return {
      welcomeMessage: {
        en: "Welcome to London's Portuguese community platform",
        pt: "Bem-vindos à plataforma da comunidade portuguesa de Londres"
      },
      ctaButtons: {
        exploreEvents: { en: "Explore Events", pt: "Explorar Eventos" },
        joinCommunity: { en: "Join Community", pt: "Juntar-se à Comunidade" },
        findBusiness: { en: "Find Business", pt: "Encontrar Negócio" },
        startNetworking: { en: "Start Networking", pt: "Começar Networking" }
      },
      metaDescriptions: {
        home: {
          en: "Connect with Portuguese speakers in London. Join events, make friends, discover businesses.",
          pt: "Conecte-se com lusófonos em Londres. Participe em eventos, faça amigos, descubra negócios."
        },
        events: {
          en: "Portuguese cultural events and activities in London. From Fado to business networking.",
          pt: "Eventos culturais e atividades portuguesas em Londres. Do Fado ao networking empresarial."
        }
      }
    }
  }

  // Search Console Integration
  static generateSearchConsoleVerification(): string {
    return `<meta name="google-site-verification" content="portuguese-community-london-verification" />`
  }

  // Analytics tracking for Portuguese content
  static getAnalyticsEvents() {
    return {
      pageViews: {
        'page_view_portuguese': 'Portuguese page viewed',
        'page_view_english': 'English page viewed'
      },
      interactions: {
        'language_switch_pt': 'Switched to Portuguese',
        'language_switch_en': 'Switched to English',
        'business_click': 'Portuguese business clicked',
        'event_registration': 'Portuguese event registration',
        'networking_signup': 'Business networking signup'
      },
      conversions: {
        'community_join': 'Joined Portuguese community',
        'business_verified': 'Portuguese business verified',
        'event_attended': 'Portuguese event attended'
      }
    }
  }
}

// Export for use in components and pages
export default SEOService