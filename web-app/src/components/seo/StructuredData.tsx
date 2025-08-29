/**
 * Structured Data Component for Portuguese Community Platform
 * Implements JSON-LD schema markup for improved SEO performance
 */

'use client'

import { useLanguage } from '@/context/LanguageContext'
import { SITE_CONFIG } from '@/config/site-config'
import { useSafeJsonLD } from '@/hooks/useSafeHTML'

interface StructuredDataProps {
  type: 'website' | 'event' | 'business' | 'review' | 'organization' | 'local-business'
  data: any
  children?: React.ReactNode
}

interface EventSchema {
  name: string
  description: string
  startDate: string
  endDate?: string
  location: {
    name: string
    address: string
  }
  organizer: string
  image?: string
  offers?: {
    price: string
    currency: string
  }
}

interface BusinessSchema {
  name: string
  description: string
  address: string
  telephone?: string
  website?: string
  image?: string
  category: string
  priceRange?: string
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
  }
}

interface ReviewSchema {
  itemReviewed: {
    name: string
    type: string
  }
  author: string
  datePublished: string
  reviewBody: string
  reviewRating: {
    ratingValue: number
    bestRating: number
  }
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const { t, currentLanguage } = useLanguage()

  const generateWebsiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": t('site.name', 'LusoTown'),
    "alternateName": "Portuguese-speaking Community Platform UK",
    "description": t('site.description', 'Connecting Portuguese speakers across the United Kingdom'),
    "url": SITE_CONFIG.siteUrl,
    "sameAs": [
      "https://twitter.com/lusotown",
      "https://facebook.com/lusotown",
      "https://instagram.com/lusotown"
    ],
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_CONFIG.siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Portuguese-speaking community in the UK"
    },
    "inLanguage": [currentLanguage, "pt", "en"],
    "publisher": {
      "@type": "Organization",
      "name": "LusoTown",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.siteUrl}/logo.png`
      }
    }
  })

  const generateEventSchema = (eventData: EventSchema) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": eventData.name,
    "description": eventData.description,
    "startDate": eventData.startDate,
    "endDate": eventData.endDate,
    "location": {
      "@type": "Place",
      "name": eventData.location.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": eventData.location.address,
        "addressCountry": "GB"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": eventData.organizer
    },
    "image": eventData.image,
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "audience": {
      "@type": "Audience",
      "audienceType": "Portuguese-speaking community"
    },
    "inLanguage": ["pt", "en"],
    ...(eventData.offers && {
      "offers": {
        "@type": "Offer",
        "price": eventData.offers.price,
        "priceCurrency": eventData.offers.currency,
        "availability": "https://schema.org/InStock",
        "validFrom": new Date().toISOString()
      }
    })
  })

  const generateBusinessSchema = (businessData: BusinessSchema) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": businessData.name,
    "description": businessData.description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": businessData.address,
      "addressCountry": "GB"
    },
    "telephone": businessData.telephone,
    "url": businessData.website,
    "image": businessData.image,
    "priceRange": businessData.priceRange,
    "servedCuisine": businessData.category === 'restaurant' ? 'Portuguese' : undefined,
    "currenciesAccepted": "GBP",
    "paymentAccepted": "Cash, Credit Card",
    "audience": {
      "@type": "Audience",
      "audienceType": "Portuguese-speaking community and UK residents"
    },
    ...(businessData.aggregateRating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": businessData.aggregateRating.ratingValue,
        "reviewCount": businessData.aggregateRating.reviewCount,
        "bestRating": 5,
        "worstRating": 1
      }
    })
  })

  const generateReviewSchema = (reviewData: ReviewSchema) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": reviewData.itemReviewed.type,
      "name": reviewData.itemReviewed.name
    },
    "author": {
      "@type": "Person",
      "name": reviewData.author
    },
    "datePublished": reviewData.datePublished,
    "reviewBody": reviewData.reviewBody,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": reviewData.reviewRating.ratingValue,
      "bestRating": reviewData.reviewRating.bestRating,
      "worstRating": 1
    },
    "inLanguage": currentLanguage
  })

  const generateOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LusoTown",
    "alternateName": "Portuguese Community Platform UK",
    "description": "Connecting Portuguese-speaking communities across the United Kingdom",
    "url": SITE_CONFIG.siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_CONFIG.siteUrl}/logo.png`
    },
    "sameAs": [
      "https://twitter.com/lusotown",
      "https://facebook.com/lusotown"
    ],
    "foundingDate": "2024",
    "founders": [{
      "@type": "Person",
      "name": "LusoTown Team"
    }],
    "knowsAbout": [
      "Portuguese culture",
      "Community building",
      "Event organization",
      "Business networking",
      "Cultural heritage"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Portuguese-speaking community in the UK"
    }
  })

  const getSchemaData = () => {
    switch (type) {
      case 'website':
        return generateWebsiteSchema()
      case 'event':
        return generateEventSchema(data)
      case 'business':
      case 'local-business':
        return generateBusinessSchema(data)
      case 'review':
        return generateReviewSchema(data)
      case 'organization':
        return generateOrganizationSchema()
      default:
        return null
    }
  }

  const schemaData = getSchemaData()
  const safeJsonLD = useSafeJsonLD(schemaData)

  if (!schemaData) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: safeJsonLD
      }}
    />
  )
}

// Export utility functions for generating schema
export const generateEventStructuredData = (event: EventSchema) => ({
  type: 'event' as const,
  data: event
})

export const generateBusinessStructuredData = (business: BusinessSchema) => ({
  type: 'business' as const,
  data: business
})

export const generateReviewStructuredData = (review: ReviewSchema) => ({
  type: 'review' as const,
  data: review
})