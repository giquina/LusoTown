'use client'

import Head from 'next/head'
import { useLanguage } from '@/context/LanguageContext'
import SEOService, { SEO_PAGES } from '@/lib/seo'

interface SEOHeadProps {
  page: keyof typeof SEO_PAGES
  customTitle?: string
  customDescription?: string
  canonicalUrl?: string
  structuredData?: any
}

export default function SEOHead({ 
  page, 
  customTitle, 
  customDescription, 
  canonicalUrl,
  structuredData 
}: SEOHeadProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  
  const seoData = SEOService.generateMetaTags(page, isPortuguese ? 'pt' : 'en')
  
  const title = customTitle || seoData.title
  const description = customDescription || seoData.description
  const canonical = canonicalUrl || seoData.canonical
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={seoData.keywords} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Language Alternatives */}
      <link rel="alternate" hrefLang="en" href={canonical || ''} />
      <link rel="alternate" hrefLang="pt" href={`${canonical || ''}?lang=pt`} />
      <link rel="alternate" hrefLang="x-default" href={canonical || ''} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={seoData.ogTitle} />
      <meta property="og:description" content={seoData.ogDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical || ''} />
      <meta property="og:site_name" content="LusoTown London" />
      <meta property="og:locale" content={isPortuguese ? 'pt_PT' : 'en_GB'} />
      <meta property="og:locale:alternate" content={isPortuguese ? 'en_GB' : 'pt_PT'} />
      {seoData.ogImage && <meta property="og:image" content={seoData.ogImage} />}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.ogTitle} />
      <meta name="twitter:description" content={seoData.ogDescription} />
      {seoData.ogImage && <meta name="twitter:image" content={seoData.ogImage} />}
      
      {/* Portuguese-specific Tags */}
      <meta name="language" content={isPortuguese ? 'Portuguese' : 'English'} />
      <meta name="geo.region" content="GB-LND" />
      <meta name="geo.placename" content="London" />
      <meta name="geo.position" content="51.5074;-0.1278" />
      <meta name="ICBM" content="51.5074, -0.1278" />
      
      {/* Community and Cultural Tags */}
      <meta name="audience" content="Portuguese speakers in London" />
      <meta name="target" content="Portuguese community, Brazilian community, Lusophone diaspora" />
      <meta name="coverage" content="London, UK" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Structured Data */}
      {(structuredData || seoData.structuredData) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData || JSON.parse(seoData.structuredData || '{}'))
          }}
        />
      )}
      
      {/* Portuguese Community Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "LusoTown London",
            "alternateName": "LusoTown",
            "description": isPortuguese 
              ? "Plataforma da comunidade portuguesa em Londres - agenda social e conexões lusófonas"
              : "Portuguese community platform in London - social calendar and lusophone connections",
            "url": "https://lusotown.com",
            "logo": "https://lusotown.com/logo.png",
            "foundingDate": "2024",
            "areaServed": {
              "@type": "Country",
              "name": "United Kingdom",
              "addressCountry": "GB"
            },
            "audience": {
              "@type": "Audience",
              "audienceType": "Portuguese speakers across the UK",
              "geographicArea": "United Kingdom, with main focus on London"
            },
            "memberOf": {
              "@type": "Organization",
              "name": "Portuguese Community Organizations UK"
            },
            "keywords": [
              "portuguese community",
              "comunidade portuguesa",
              "lusophone",
              "social calendar",
              "agenda social",
              "networking",
              "eventos",
              "events"
            ],
            "inLanguage": ["pt", "en"],
            "serves": {
              "@type": "Audience",
              "audienceType": "Portuguese diaspora in London",
              "geographicArea": "London, United Kingdom"
            }
          })
        }}
      />
      
      {/* Business Directory Schema (if on business pages) */}
      {(page === 'businessDirectory' || page === 'businessNetworking') && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": title,
              "description": description,
              "url": canonical,
              "inLanguage": [isPortuguese ? "pt" : "en"],
              "isPartOf": {
                "@type": "WebSite",
                "name": "LusoTown London",
                "url": "https://lusotown.com"
              },
              "about": {
                "@type": "Thing",
                "name": page === 'businessDirectory' 
                  ? "Portuguese Business Directory"
                  : "Portuguese Business Networking",
                "description": page === 'businessDirectory'
                  ? "Directory of verified Portuguese-owned businesses in London"
                  : "Networking events for Portuguese entrepreneurs and professionals"
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "Portuguese business community in London"
              }
            })
          }}
        />
      )}
      
      {/* Location-based Schema for London Portuguese Community */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Place",
            "name": "London Portuguese Community Hub",
            "description": "Virtual hub for Portuguese speakers in London",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 51.5074,
              "longitude": -0.1278
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "London",
              "addressCountry": "GB"
            },
            "containsPlace": [
              {
                "@type": "Place",
                "name": "South London Portuguese Community",
                "description": "Areas with high Portuguese population: Stockwell, Vauxhall, Elephant & Castle"
              },
              {
                "@type": "Place", 
                "name": "East London Portuguese Community",
                "description": "Growing Portuguese community in East London boroughs"
              }
            ],
            "event": {
              "@type": "Event",
              "name": "Portuguese Community Events",
              "description": "Regular cultural and social events for Portuguese speakers"
            }
          })
        }}
      />
    </Head>
  )
}