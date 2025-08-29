/**
 * Schema Markup Configuration for Portuguese-speaking Community SEO
 * Comprehensive JSON-LD structured data for search engines
 * Focused on Portuguese diaspora community across the United Kingdom
 */

import { seo } from './seo';
import { contact, officeLocations, socialMedia } from './contact';
import { LUSOPHONE_CELEBRATIONS, LusophoneCelebration, UniversityEvent } from './lusophone-celebrations';
import { PORTUGUESE_BUSINESS_CATEGORIES, BusinessCategory } from './business-categories';

// Base types for schema markup
export interface SchemaOrganization {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  logo: string;
  contactPoint: SchemaContactPoint;
  sameAs: string[];
  address: SchemaAddress;
  areaServed: SchemaPlace[];
  memberOf?: SchemaOrganization[];
  knowsAbout: string[];
}

export interface SchemaEvent {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: SchemaPlace;
  organizer: SchemaOrganization;
  audience: SchemaAudience;
  eventAttendanceMode: string;
  eventStatus: string;
  inLanguage: string[];
  about: string[];
  keywords: string[];
}

export interface SchemaLocalBusiness {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url?: string;
  telephone?: string;
  email?: string;
  address: SchemaAddress;
  geo: SchemaGeoCoordinates;
  areaServed: SchemaPlace;
  servesCuisine?: string[];
  priceRange: string;
  aggregateRating?: SchemaAggregateRating;
  review?: SchemaReview[];
  openingHours?: string[];
  paymentAccepted?: string[];
  currenciesAccepted: string;
  knowsLanguage: string[];
}

export interface SchemaReview {
  "@type": string;
  reviewRating: {
    "@type": string;
    ratingValue: number;
    bestRating: number;
  };
  author: {
    "@type": string;
    name: string;
    nationality?: string;
  };
  reviewBody: string;
  datePublished: string;
  inLanguage: string;
}

export interface SchemaContactPoint {
  "@type": string;
  telephone: string;
  contactType: string;
  email: string;
  areaServed: string;
  availableLanguage: string[];
}

export interface SchemaAddress {
  "@type": string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface SchemaPlace {
  "@type": string;
  name: string;
  geo?: SchemaGeoCoordinates;
  address?: SchemaAddress;
}

export interface SchemaGeoCoordinates {
  "@type": string;
  latitude: number;
  longitude: number;
}

export interface SchemaAudience {
  "@type": string;
  name: string;
  geographicArea: string;
  requiredGender?: string;
  requiredMinAge?: number;
  requiredMaxAge?: number;
  audienceType: string;
}

export interface SchemaAggregateRating {
  "@type": string;
  ratingValue: number;
  reviewCount: number;
  bestRating: number;
  worstRating: number;
}

export interface SchemaPerson {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  nationality: string;
  knowsLanguage: string[];
  memberOf?: SchemaOrganization[];
  worksFor?: SchemaOrganization;
  jobTitle?: string;
  alumniOf?: string[];
  areaServed: SchemaPlace[];
}

/**
 * Portuguese Community Areas across the United Kingdom
 */
export const PORTUGUESE_COMMUNITY_AREAS: SchemaPlace[] = [
  {
    "@type": "City",
    "name": "London",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.5074,
      "longitude": -0.1278
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressRegion": "England",
      "addressCountry": "GB"
    }
  },
  {
    "@type": "City", 
    "name": "Manchester",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 53.4808,
      "longitude": -2.2426
    }
  },
  {
    "@type": "City",
    "name": "Birmingham", 
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 52.4862,
      "longitude": -1.8904
    }
  },
  {
    "@type": "City",
    "name": "Edinburgh",
    "geo": {
      "@type": "GeoCoordinates", 
      "latitude": 55.9533,
      "longitude": -3.1883
    }
  },
  {
    "@type": "City",
    "name": "Bristol",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.4545,
      "longitude": -2.5879
    }
  }
];

/**
 * Main Organization Schema for LusoTown
 */
export const LUSOTOWN_ORGANIZATION_SCHEMA: SchemaOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "LusoTown London",
  "description": "Premier Portuguese-speaking community platform connecting diaspora across the United Kingdom through cultural events, business networking, and social connections",
  "url": seo.siteUrl,
  "logo": `${seo.siteUrl}/logo.png`,
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": contact.phone,
    "contactType": "customer service",
    "email": contact.support,
    "areaServed": "GB",
    "availableLanguage": ["Portuguese", "English", "pt-PT", "pt-BR", "en-GB"]
  },
  "sameAs": [
    socialMedia.facebook,
    socialMedia.instagram,
    socialMedia.twitter,
    socialMedia.linkedin,
    socialMedia.youtube
  ].filter(Boolean),
  "address": {
    "@type": "PostalAddress",
    "streetAddress": officeLocations.london.address,
    "addressLocality": "London",
    "addressRegion": "England", 
    "postalCode": officeLocations.london.postcode,
    "addressCountry": "GB"
  },
  "areaServed": PORTUGUESE_COMMUNITY_AREAS,
  "memberOf": [
    {
      "@context": "https://schema.org",
      "@type": "Organization", 
      "name": "Comunidade dos Países de Língua Portuguesa (CPLP)",
      "description": "Community of Portuguese Language Countries"
    }
  ],
  "knowsAbout": [
    "Portuguese diaspora community",
    "Brazilian community United Kingdom",
    "Angolan community London", 
    "Cape Verdean community",
    "Mozambican heritage",
    "Portuguese cultural events",
    "Lusophone business networking",
    "Portuguese language preservation",
    "PALOP nations culture",
    "Portuguese-speaking professionals"
  ]
};

/**
 * Generate Event Schema for Portuguese Cultural Events
 */
export function generateEventSchema(celebration: LusophoneCelebration): SchemaEvent {
  const currentYear = new Date().getFullYear();
  const eventDate = celebration.date || `${currentYear}-06-15`; // Default to Santos Populares
  
  return {
    "@context": "https://schema.org",
    "@type": "CulturalEvent",
    "name": `${celebration.name.en} | ${celebration.name.pt}`,
    "description": `${celebration.description.en} - ${celebration.description.pt}`,
    "startDate": eventDate,
    "location": {
      "@type": "Place",
      "name": "London Portuguese Community Centers",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 51.5074,
        "longitude": -0.1278
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "London",
        "addressRegion": "England",
        "addressCountry": "GB"
      }
    },
    "organizer": LUSOTOWN_ORGANIZATION_SCHEMA,
    "audience": {
      "@type": "PeopleAudience",
      "name": "Portuguese-speaking community",
      "geographicArea": "United Kingdom",
      "audienceType": "Lusophone diaspora"
    },
    "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "inLanguage": ["pt-PT", "pt-BR", "en-GB"],
    "about": [
      `${celebration.category} celebration`,
      ...celebration.countries.map(country => `${country} culture`),
      "Portuguese heritage preservation",
      "Lusophone community unity"
    ],
    "keywords": [
      celebration.name.pt,
      celebration.name.en,
      ...celebration.traditionalElements,
      "portuguese community london",
      "eventos portugueses londres",
      "lusophone celebrations"
    ]
  };
}

/**
 * Generate Local Business Schema for Portuguese Businesses
 */
export function generateBusinessSchema(
  category: BusinessCategory,
  businessDetails?: {
    name: string;
    description?: string;
    address?: SchemaAddress;
    phone?: string;
    website?: string;
    rating?: number;
    reviewCount?: number;
  }
): SchemaLocalBusiness {
  const defaultBusiness = {
    name: `${category.name.en} | ${category.name.pt}`,
    description: category.description.en,
    address: {
      "@type": "PostalAddress" as const,
      "streetAddress": "Portuguese Community Area",
      "addressLocality": "London",
      "addressRegion": "England",
      "postalCode": "SW8",
      "addressCountry": "GB"
    }
  };
  
  const business = { ...defaultBusiness, ...businessDetails };
  
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": business.name,
    "description": business.description || category.description.en,
    "url": business.website,
    "telephone": business.phone,
    "address": business.address,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.4816,  // Vauxhall/Stockwell area
      "longitude": -0.1233
    },
    "areaServed": {
      "@type": "City",
      "name": "London"
    },
    "servesCuisine": category.id === 'restaurants' ? [
      "Portuguese cuisine",
      "Brazilian cuisine", 
      "Angolan cuisine",
      "Cape Verdean cuisine",
      "Mozambican cuisine",
      "Lusophone fusion"
    ] : undefined,
    "priceRange": "££",
    "aggregateRating": business.rating && business.reviewCount ? {
      "@type": "AggregateRating",
      "ratingValue": business.rating,
      "reviewCount": business.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    } : undefined,
    "openingHours": [
      "Mo-Fr 09:00-18:00",
      "Sa 09:00-17:00"
    ],
    "paymentAccepted": ["Cash", "Credit Card", "Contactless"],
    "currenciesAccepted": "GBP",
    "knowsLanguage": ["Portuguese", "English", "pt-PT", "pt-BR"]
  };
}

/**
 * Generate Review Schema for Portuguese Business Reviews
 */
export function generateReviewSchema(
  businessName: string,
  authorName: string,
  rating: number,
  reviewText: string,
  nationality?: string,
  language: 'en' | 'pt' = 'en'
): SchemaReview {
  return {
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating", 
      "ratingValue": rating,
      "bestRating": 5
    },
    "author": {
      "@type": "Person",
      "name": authorName,
      "nationality": nationality || "Portuguese"
    },
    "reviewBody": reviewText,
    "datePublished": new Date().toISOString().split('T')[0],
    "inLanguage": language === 'pt' ? 'pt-PT' : 'en-GB'
  };
}

/**
 * Generate Person Schema for Portuguese Community Leaders
 */
export function generatePersonSchema(
  name: string,
  description: string,
  nationality: string,
  jobTitle?: string,
  organization?: string
): SchemaPerson {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "description": description,
    "nationality": nationality,
    "knowsLanguage": ["Portuguese", "English", "pt-PT", "pt-BR", "en-GB"],
    "memberOf": [LUSOTOWN_ORGANIZATION_SCHEMA],
    "worksFor": organization ? {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": organization
    } : undefined,
    "jobTitle": jobTitle,
    "areaServed": PORTUGUESE_COMMUNITY_AREAS
  };
}

/**
 * Portuguese Cultural Categories for Search Enhancement
 */
export const PORTUGUESE_CULTURAL_CATEGORIES = [
  "Portuguese restaurants London",
  "Brazilian restaurants London", 
  "Portuguese pastéis de nata",
  "Fado music venues London",
  "Portuguese cultural events",
  "Brazilian carnival London",
  "Kizomba dance classes London",
  "Portuguese wine tasting",
  "Cape Verdean morna music",
  "Angolan cultural center",
  "Mozambican heritage events",
  "Portuguese business networking",
  "Lusophone film festival",
  "Portuguese language schools",
  "Brazilian community London",
  "Portuguese festival Santos Populares",
  "Portuguese diaspora community",
  "PALOP cultural celebration",
  "Portuguese heritage preservation",
  "Lusophone professional network"
];

/**
 * University Events Schema for Portuguese Students
 */
export function generateUniversityEventSchema(event: UniversityEvent): SchemaEvent {
  return {
    "@context": "https://schema.org",
    "@type": "EducationEvent", 
    "name": `${event.title.en} | ${event.title.pt}`,
    "description": `${event.description.en} - ${event.description.pt}`,
    "startDate": `${event.date}T${event.time}:00`,
    "location": {
      "@type": "Place",
      "name": event.location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "London",
        "addressRegion": "England", 
        "addressCountry": "GB"
      }
    },
    "organizer": {
      "@type": "EducationalOrganization",
      "name": event.university
    },
    "audience": {
      "@type": "PeopleAudience",
      "name": "Portuguese-speaking university students",
      "geographicArea": "United Kingdom",
      "audienceType": "Students"
    },
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "inLanguage": ["pt-PT", "pt-BR", "en-GB"],
    "about": [
      "Portuguese student community",
      "University networking",
      "Academic support",
      "Cultural integration"
    ],
    "keywords": [
      "portuguese students uk",
      "university portuguese community", 
      "student networking",
      event.type
    ]
  };
}

/**
 * Generate complete schema markup for pages
 */
export function generatePageSchema(
  pageType: 'home' | 'events' | 'business' | 'community',
  additionalData?: any
) {
  const baseSchema = [LUSOTOWN_ORGANIZATION_SCHEMA];
  
  switch (pageType) {
    case 'events':
      const eventSchemas = LUSOPHONE_CELEBRATIONS
        .slice(0, 5)
        .map(celebration => generateEventSchema(celebration));
      return [...baseSchema, ...eventSchemas];
      
    case 'business':
      const businessSchemas = PORTUGUESE_BUSINESS_CATEGORIES
        .filter(cat => cat.isPopular)
        .slice(0, 6)
        .map(category => generateBusinessSchema(category));
      return [...baseSchema, ...businessSchemas];
      
    case 'community':
      const communityLeaders = [
        generatePersonSchema(
          "Maria Silva",
          "Portuguese community leader and cultural event organizer in London",
          "Portuguese",
          "Community Organizer",
          "LusoTown London"
        ),
        generatePersonSchema(
          "João Santos",
          "Brazilian business network coordinator and entrepreneur",
          "Brazilian", 
          "Business Network Coordinator",
          "LusoTown London"
        )
      ];
      return [...baseSchema, ...communityLeaders];
      
    default:
      return baseSchema;
  }
}

/**
 * Helper function to generate JSON-LD script tag
 */
export function generateJsonLdScript(schema: any): string {
  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}

/**
 * SEO-optimized keywords for Portuguese community
 */
export const PORTUGUESE_SEO_KEYWORDS = {
  primary: [
    "comunidade portuguesa londres",
    "portuguese community london", 
    "brasileiros em londres",
    "brazilians in london",
    "lusófonos reino unido",
    "portuguese speakers uk",
    "eventos portugueses londres",
    "portuguese events london",
    "negócios portugueses uk",
    "portuguese business uk"
  ],
  cultural: [
    "fado noites londres",
    "fado nights london",
    "santos populares uk",
    "portuguese cultural events",
    "kizomba aulas londres",
    "kizomba classes london",
    "carnaval brasileiro london",
    "brazilian carnival london"
  ],
  business: [
    "restaurantes portugueses londres",
    "portuguese restaurants london",
    "pastéis de nata london",
    "portuguese pastries uk",
    "negócios lusófonos",
    "lusophone businesses",
    "networking português uk",
    "portuguese networking uk"
  ],
  geographic: [
    "vauxhall portuguese community",
    "stockwell portuguese area",
    "elephant castle brazilian",
    "borough portuguese restaurants",
    "portuguese community manchester",
    "portuguese business birmingham"
  ]
};