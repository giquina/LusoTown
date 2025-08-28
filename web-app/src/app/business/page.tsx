'use client'

import React from 'react'
import { BusinessDirectory } from '@/components'
import { useLanguage } from '@/context/LanguageContext'

// SEO titles and descriptions for the business directory page
const pageTitle = {
  en: 'Portuguese Business Directory | LusoTown - Discover Portuguese Businesses Across the UK',
  pt: 'Diretório de Negócios Portugueses | LusoTown - Descubra Negócios Portugueses em Todo o Reino Unido'
}

const pageDescription = {
  en: 'Discover Portuguese-speaking businesses across the United Kingdom. Find authentic restaurants, services, shops, and professionals from all lusophone countries with PostGIS location search and cultural reviews.',
  pt: 'Descubra negócios lusófonos em todo o Reino Unido. Encontre restaurantes autênticos, serviços, lojas e profissionais de todos os países lusófonos com pesquisa de localização PostGIS e avaliações culturais.'
}

export default function BusinessDirectoryPage() {
  const { language } = useLanguage()

  // Set document title and meta description client-side
  React.useEffect(() => {
    document.title = pageTitle[language]
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescription[language])
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = pageDescription[language]
      document.head.appendChild(meta)
    }

    // Set Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', pageTitle[language])
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:title')
      meta.content = pageTitle[language]
      document.head.appendChild(meta)
    }

    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', pageDescription[language])
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:description')
      meta.content = pageDescription[language]
      document.head.appendChild(meta)
    }

    // Set structured data for local business directory
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": pageTitle[language],
      "description": pageDescription[language],
      "url": "https://lusotown.com/business",
      "inLanguage": language === 'pt' ? 'pt-PT' : 'en-GB',
      "mainEntity": {
        "@type": "ItemList",
        "name": language === 'pt' ? "Diretório de Negócios Portugueses no Reino Unido" : "Portuguese Business Directory in the UK",
        "description": language === 'pt' 
          ? "Lista abrangente de negócios lusófonos em todo o Reino Unido, incluindo restaurantes, serviços, lojas e profissionais."
          : "Comprehensive listing of Portuguese-speaking businesses across the United Kingdom, including restaurants, services, shops, and professionals.",
        "itemListElement": []
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "LusoTown",
            "item": "https://lusotown.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": language === 'pt' ? "Diretório de Negócios" : "Business Directory",
            "item": "https://lusotown.com/business"
          }
        ]
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://lusotown.com/business?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }

    const scriptTag = document.getElementById('structured-data')
    if (scriptTag) {
      scriptTag.textContent = JSON.stringify(structuredData)
    } else {
      const script = document.createElement('script')
      script.id = 'structured-data'
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(structuredData)
      document.head.appendChild(script)
    }
  }, [language])

  return (
    <main className="min-h-screen">
      {/* 
        Enhanced Business Directory Component with:
        - PostGIS geolocation search
        - Multi-view modes (grid, list, map)
        - Advanced filtering and sorting
        - UK-wide business coverage
        - Real-time distance calculations
        - Cultural context and verification
        - Bilingual support
        - Reviews system integration
        - Business verification badges
        - Cultural specialties display
      */}
      <BusinessDirectory 
        showMap={true}
        className="business-directory-page"
      />
    </main>
  )
}

// Enhanced SEO and accessibility features:
// - Dynamic meta tags based on language
// - Structured data for search engines
// - Open Graph meta tags for social sharing
// - Breadcrumb navigation schema
// - Search action schema for rich snippets
// - Accessible main landmark
// - Mobile-first responsive design