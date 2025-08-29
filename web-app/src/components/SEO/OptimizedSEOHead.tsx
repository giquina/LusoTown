/**
 * Optimized SEO Head Component for Portuguese-speaking Community Platform
 * Implements comprehensive structured data, meta tags, and performance optimizations
 */

'use client';

import Head from 'next/head';
import { useLanguage } from '@/context/LanguageContext';
import { 
  LUSOTOWN_ORGANIZATION_SCHEMA,
  generateEventSchema,
  generateBusinessSchema,
  generatePageSchema,
  PORTUGUESE_SEO_KEYWORDS,
  PORTUGUESE_COMMUNITY_AREAS
} from '@/config/schema-markup';
import { SITE_URL } from '@/config/site';

interface OptimizedSEOHeadProps {
  pageType: 'home' | 'events' | 'business' | 'community' | 'search';
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  eventData?: {
    id: string;
    name: string;
    description: string;
    startDate: string;
    location: string;
    countries?: string[];
  };
  businessData?: {
    name: string;
    description: string;
    category: string;
    address: any;
    phone?: string;
    website?: string;
    rating?: number;
    reviewCount?: number;
  };
  customSchema?: any[];
  noIndex?: boolean;
}

export default function OptimizedSEOHead({
  pageType,
  title,
  description,
  keywords = [],
  canonicalUrl,
  eventData,
  businessData,
  customSchema = [],
  noIndex = false
}: OptimizedSEOHeadProps) {
  const { language } = useLanguage();
  
  // Generate comprehensive schema markup
  const generateSchemas = () => {
    let schemas = [LUSOTOWN_ORGANIZATION_SCHEMA];
    
    // Add page-specific schemas
    if (eventData && pageType === 'events') {
      const eventSchema = {
        "@context": "https://schema.org",
        "@type": "CulturalEvent",
        "name": `${eventData.name} | Portuguese Cultural Event London`,
        "description": eventData.description,
        "startDate": eventData.startDate,
        "location": {
          "@type": "Place",
          "name": eventData.location,
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
          ...(eventData.countries?.map(country => `${country} culture`) || ["Portuguese culture"]),
          "Portuguese heritage preservation",
          "Lusophone community unity"
        ]
      };
      schemas.push(eventSchema);
    }
    
    if (businessData && pageType === 'business') {
      const businessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": businessData.name,
        "description": businessData.description,
        "address": businessData.address,
        "telephone": businessData.phone,
        "url": businessData.website,
        "aggregateRating": businessData.rating && businessData.reviewCount ? {
          "@type": "AggregateRating",
          "ratingValue": businessData.rating,
          "reviewCount": businessData.reviewCount,
          "bestRating": 5
        } : undefined,
        "knowsLanguage": ["Portuguese", "English", "pt-PT", "pt-BR"],
        "areaServed": {
          "@type": "City",
          "name": "London"
        },
        "currenciesAccepted": "GBP"
      };
      schemas.push(businessSchema);
    }
    
    // Add WebSite schema for home page
    if (pageType === 'home') {
      const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "LusoTown - Portuguese-speaking Community Platform",
        "url": SITE_URL,
        "description": "Premier Portuguese-speaking community platform connecting diaspora across the United Kingdom",
        "inLanguage": ["en-GB", "pt-PT", "pt-BR"],
        "areaServed": PORTUGUESE_COMMUNITY_AREAS,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${SITE_URL}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      };
      schemas.push(websiteSchema);
      
      // Add FAQ schema for home page
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is LusoTown?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "LusoTown is the premier Portuguese-speaking community platform in the UK, connecting Portuguese, Brazilian, and PALOP diaspora through cultural events, business networking, and social connections."
            }
          },
          {
            "@type": "Question", 
            "name": "Which Portuguese-speaking communities does LusoTown serve?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "LusoTown serves all Portuguese-speaking communities including Portuguese, Brazilian, Angolan, Cape Verdean, Mozambican, Guinea-Bissau, São Tomé and Príncipe, and East Timorese communities across the United Kingdom."
            }
          },
          {
            "@type": "Question",
            "name": "How can I find Portuguese events in London?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use our comprehensive event discovery system to find Portuguese cultural celebrations, business networking events, university meetups, and community gatherings across London and the UK."
            }
          }
        ]
      };
      schemas.push(faqSchema);
    }
    
    // Add breadcrumb schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": SITE_URL
        },
        ...(pageType !== 'home' ? [{
          "@type": "ListItem",
          "position": 2,
          "name": pageType === 'events' ? 'Events' : pageType === 'business' ? 'Business Directory' : 'Community',
          "item": `${SITE_URL}/${pageType}`
        }] : [])
      ]
    };
    schemas.push(breadcrumbSchema);
    
    return [...schemas, ...customSchema];
  };
  
  // Generate optimized keywords
  const generateKeywords = () => {
    const baseKeywords = [
      ...PORTUGUESE_SEO_KEYWORDS.primary,
      ...keywords
    ];
    
    if (pageType === 'events') {
      baseKeywords.push(...PORTUGUESE_SEO_KEYWORDS.cultural);
    }
    
    if (pageType === 'business') {
      baseKeywords.push(...PORTUGUESE_SEO_KEYWORDS.business);
    }
    
    return baseKeywords.slice(0, 20).join(', ');
  };
  
  // Generate hreflang for bilingual support
  const generateHrefLang = () => {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    return [
      { lang: 'en-GB', href: `${SITE_URL}${currentPath}` },
      { lang: 'pt-PT', href: `${SITE_URL}/pt${currentPath}` },
      { lang: 'pt-BR', href: `${SITE_URL}/pt-br${currentPath}` }
    ];
  };
  
  const schemas = generateSchemas();
  const optimizedKeywords = generateKeywords();
  const hrefLangLinks = generateHrefLang();
  
  return (
    <>
      {/* Basic Meta Tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      
      {title && <title>{title} | LusoTown - Portuguese Community Platform</title>}
      {description && <meta name="description" content={description} />}
      <meta name="keywords" content={optimizedKeywords} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Language and Locale */}
      <meta httpEquiv="content-language" content={language === 'pt' ? 'pt-PT' : 'en-GB'} />
      <meta name="locale" content={language === 'pt' ? 'pt_PT' : 'en_GB'} />
      
      {/* Hreflang for bilingual support */}
      {hrefLangLinks.map(({ lang, href }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={href} />
      ))}
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="LusoTown" />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:locale" content={language === 'pt' ? 'pt_PT' : 'en_GB'} />
      <meta property="og:locale:alternate" content={language === 'pt' ? 'en_GB' : 'pt_PT'} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={`${SITE_URL}/images/lusotown-social-${language}.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content="LusoTown - Portuguese-speaking Community Platform" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@LusoTownLondon" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={`${SITE_URL}/images/lusotown-social-${language}.jpg`} />
      
      {/* Portuguese Community Specific */}
      <meta name="geo.region" content="GB" />
      <meta name="geo.placename" content="London" />
      <meta name="geo.position" content="51.5074;-0.1278" />
      <meta name="ICBM" content="51.5074, -0.1278" />
      
      {/* Cultural Context */}
      <meta name="target-audience" content="Portuguese-speaking community" />
      <meta name="community-focus" content="Lusophone diaspora United Kingdom" />
      <meta name="cultural-context" content="Portuguese, Brazilian, PALOP nations" />
      
      {/* Mobile & Performance */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="theme-color" content="#1e40af" />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      
      {/* Favicon and App Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Search Engine Directives */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}
      
      {/* Structured Data (JSON-LD) */}
      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 0)
          }}
        />
      ))}
    </>
  );
}