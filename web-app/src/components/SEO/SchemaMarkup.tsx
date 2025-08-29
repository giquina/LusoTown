/**
 * Schema Markup Component for Portuguese-speaking Community SEO
 * Renders JSON-LD structured data for improved search engine visibility
 */

'use client';

import React from 'react';
import SchemaService from '@/services/SchemaService';

interface SchemaMarkupProps {
  pageType: 'home' | 'events' | 'business' | 'community' | 'search';
  pageData?: any;
  eventId?: string;
  businessCategoryId?: string;
  customSchema?: any[];
  language?: 'en' | 'pt';
}

/**
 * SchemaMarkup Component
 * Automatically generates and injects appropriate JSON-LD schema based on page type
 */
export default function SchemaMarkup({ 
  pageType, 
  pageData, 
  eventId, 
  businessCategoryId,
  customSchema = [],
  language = 'en'
}: SchemaMarkupProps) {
  
  // Generate schemas based on page type
  const generateSchemas = React.useMemo(() => {
    let schemas: any[] = [];

    // Add page-specific schemas
    if (eventId && pageType === 'events') {
      const eventSchema = SchemaService.generateEventSchema(eventId);
      if (eventSchema) {
        schemas = [
          eventSchema.organization,
          eventSchema.event,
          eventSchema.breadcrumbList,
          ...eventSchema.relatedEvents
        ];
      }
    } else if (businessCategoryId && pageType === 'business') {
      const businessSchema = SchemaService.generateBusinessCategorySchema(businessCategoryId);
      if (businessSchema) {
        schemas = [
          businessSchema.organization,
          businessSchema.business,
          businessSchema.breadcrumbList,
          ...businessSchema.subcategories
        ];
      }
    } else {
      // Generate complete page schema
      schemas = SchemaService.generateCompletePageSchema(pageType, pageData);
    }

    // Add language-specific schema
    if (language === 'pt') {
      schemas.push(SchemaService.generateLanguagePageSchema('pt'));
    }

    // Add any custom schemas
    schemas = [...schemas, ...customSchema];

    // Filter and validate
    return schemas.filter(schema => SchemaService.validateSchema(schema));
  }, [pageType, pageData, eventId, businessCategoryId, customSchema, language]);

  // Don't render if no valid schemas
  if (generateSchemas.length === 0) {
    return null;
  }

  return (
    <>
      {generateSchemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2)
          }}
        />
      ))}
    </>
  );
}

/**
 * Home Page Schema Component
 */
export function HomePageSchema() {
  return (
    <SchemaMarkup 
      pageType="home"
      customSchema={[SchemaService.generateFAQSchema()]}
    />
  );
}

/**
 * Events Page Schema Component
 */
export function EventsPageSchema({ eventId }: { eventId?: string }) {
  return (
    <SchemaMarkup 
      pageType="events" 
      eventId={eventId}
    />
  );
}

/**
 * Business Directory Schema Component
 */
export function BusinessDirectorySchema({ categoryId }: { categoryId?: string }) {
  return (
    <SchemaMarkup 
      pageType="business"
      businessCategoryId={categoryId}
    />
  );
}

/**
 * Community Page Schema Component
 */
export function CommunityPageSchema() {
  return (
    <SchemaMarkup pageType="community" />
  );
}

/**
 * Portuguese Language Schema Component
 */
export function PortuguesePageSchema({ pageType }: { pageType: 'home' | 'events' | 'business' | 'community' }) {
  return (
    <SchemaMarkup 
      pageType={pageType}
      language="pt"
    />
  );
}

/**
 * Event-specific Schema Component
 */
export function EventSchema({ 
  eventName, 
  description, 
  startDate, 
  location, 
  organizer = "LusoTown London",
  countries = ["Portugal"]
}: {
  eventName: string;
  description: string;
  startDate: string;
  location: string;
  organizer?: string;
  countries?: string[];
}) {
  const eventSchema = React.useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "CulturalEvent",
    "name": eventName,
    "description": description,
    "startDate": startDate,
    "location": {
      "@type": "Place",
      "name": location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "London",
        "addressRegion": "England",
        "addressCountry": "GB"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": organizer
    },
    "audience": {
      "@type": "PeopleAudience",
      "name": "Portuguese-speaking community",
      "audienceType": "Lusophone diaspora"
    },
    "inLanguage": ["pt-PT", "pt-BR", "en-GB"],
    "about": countries.map(country => `${country} culture`)
  }), [eventName, description, startDate, location, organizer, countries]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(eventSchema, null, 2)
      }}
    />
  );
}

/**
 * Business Schema Component
 */
export function BusinessSchema({
  name,
  description,
  address,
  phone,
  website,
  category = "Restaurant",
  cuisine,
  rating,
  reviewCount
}: {
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    postcode: string;
  };
  phone?: string;
  website?: string;
  category?: string;
  cuisine?: string[];
  rating?: number;
  reviewCount?: number;
}) {
  const businessSchema = React.useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": name,
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.street,
      "addressLocality": address.city,
      "addressRegion": "England",
      "postalCode": address.postcode,
      "addressCountry": "GB"
    },
    "telephone": phone,
    "url": website,
    "servesCuisine": cuisine,
    "aggregateRating": rating && reviewCount ? {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "reviewCount": reviewCount,
      "bestRating": 5
    } : undefined,
    "knowsLanguage": ["Portuguese", "English"],
    "areaServed": {
      "@type": "City",
      "name": "London"
    }
  }), [name, description, address, phone, website, cuisine, rating, reviewCount]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(businessSchema, null, 2)
      }}
    />
  );
}

/**
 * Review Schema Component
 */
export function ReviewSchema({
  businessName,
  reviewerName,
  rating,
  reviewText,
  reviewDate = new Date().toISOString().split('T')[0],
  reviewerNationality = "Portuguese"
}: {
  businessName: string;
  reviewerName: string;
  rating: number;
  reviewText: string;
  reviewDate?: string;
  reviewerNationality?: string;
}) {
  const reviewSchema = React.useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "LocalBusiness",
      "name": businessName
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": rating,
      "bestRating": 5
    },
    "author": {
      "@type": "Person",
      "name": reviewerName,
      "nationality": reviewerNationality
    },
    "reviewBody": reviewText,
    "datePublished": reviewDate,
    "inLanguage": reviewText.match(/[áàãâéêíóôõúç]/i) ? "pt-PT" : "en-GB"
  }), [businessName, reviewerName, rating, reviewText, reviewDate, reviewerNationality]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(reviewSchema, null, 2)
      }}
    />
  );
}

/**
 * Search Results Schema Component
 */
export function SearchResultsSchema({
  query,
  results,
  totalResults
}: {
  query: string;
  results: Array<{ name: string; description: string; url: string; type?: string }>;
  totalResults: number;
}) {
  const searchSchema = React.useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    "name": `Search Results: ${query}`,
    "url": `https://lusotown.london/search?q=${encodeURIComponent(query)}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": totalResults,
      "itemListElement": results.map((result, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": result.type || "Thing",
          "name": result.name,
          "description": result.description,
          "url": result.url
        }
      }))
    }
  }), [query, results, totalResults]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(searchSchema, null, 2)
      }}
    />
  );
}