import Head from 'next/head'
import { useLanguage } from '@/context/LanguageContext'

interface PortugueseSEOProps {
  title?: string
  description?: string
  keywords?: string[]
  canonicalUrl?: string
  ogImage?: string
  eventSchema?: any
  organizationSchema?: any
}

export default function PortugueseSEO({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage,
  eventSchema,
  organizationSchema
}: PortugueseSEOProps) {
  const { language, t } = useLanguage()
  
  // Base Portuguese SEO keywords
  const basePortugueseKeywords = [
    'comunidade portuguesa londres',
    'comunidade lusófona reino unido',
    'eventos portugueses londres',
    'calendário social português',
    'networking português londres',
    'comunidade brasileira londres',
    'comunidade angolana londres',
    'comunidade moçambicana londres',
    'cabo-verdianos londres',
    'diáspora portuguesa',
    'herança portuguesa',
    'cultura portuguesa londres',
    'negócios portugueses',
    'restaurantes portugueses londres',
    'noites de fado londres'
  ]

  const baseEnglishKeywords = [
    'portuguese community london',
    'lusophone community uk',
    'portuguese events london',
    'portuguese social calendar',
    'portuguese networking london',
    'brazilian community london',
    'angolan community london',
    'mozambican community london',
    'cape verdean london',
    'portuguese diaspora',
    'portuguese heritage',
    'portuguese culture london',
    'portuguese business',
    'portuguese restaurants london',
    'fado nights london'
  ]

  const allKeywords = [
    ...baseEnglishKeywords,
    ...basePortugueseKeywords,
    ...keywords
  ]

  const siteTitle = title 
    ? `${title} ${t('seo.title-suffix')}`
    : language.startsWith('pt') 
      ? 'LusoTown Londres - Seu Calendário Social Português'
      : 'LusoTown London - Your Portuguese Social Calendar'

  const siteDescription = description || t('seo.description.default')

  // Create structured data
  const organizationStructuredData = organizationSchema || {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'LusoTown London',
    'description': 'Portuguese social calendar and community platform in London',
    'url': 'https://lusotown.vercel.app',
    'logo': 'https://lusotown.vercel.app/logo.png',
    'sameAs': [
      'https://www.instagram.com/lusotown_london',
      'https://www.facebook.com/lusotown.london'
    ],
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'London',
      'addressCountry': 'United Kingdom'
    },
    'areaServed': {
      '@type': 'Place',
      'name': 'London, United Kingdom'
    },
    'audience': {
      '@type': 'Audience',
      'audienceType': 'Portuguese speakers, Brazilian community, Angolan community, Mozambican community, Cape Verdean community, Lusophone diaspora'
    }
  }

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={allKeywords.join(', ')} />
        
        {/* Language and Locale */}
        <meta httpEquiv="content-language" content={language} />
        <link rel="alternate" hrefLang="en" href="https://lusotown.vercel.app" />
        <link rel="alternate" hrefLang="pt-PT" href="https://lusotown.vercel.app?lang=pt-pt" />
        <link rel="alternate" hrefLang="pt-BR" href="https://lusotown.vercel.app?lang=pt-br" />
        <link rel="alternate" hrefLang="x-default" href="https://lusotown.vercel.app" />
        
        {/* Canonical URL */}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={ogImage || 'https://lusotown.vercel.app/og-image.jpg'} />
        <meta property="og:url" content={canonicalUrl || 'https://lusotown.vercel.app'} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="LusoTown London" />
        <meta property="og:locale" content={language === 'pt-pt' ? 'pt_PT' : language === 'pt-br' ? 'pt_BR' : 'en_GB'} />
        <meta property="og:locale:alternate" content="en_GB" />
        <meta property="og:locale:alternate" content="pt_PT" />
        <meta property="og:locale:alternate" content="pt_BR" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={ogImage || 'https://lusotown.vercel.app/og-image.jpg'} />
        
        {/* Additional SEO Meta Tags */}
        <meta name="author" content="LusoTown London" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Geo Tags for London */}
        <meta name="geo.region" content="GB-LND" />
        <meta name="geo.placename" content="London" />
        <meta name="geo.position" content="51.5074;-0.1278" />
        <meta name="ICBM" content="51.5074, -0.1278" />
        
        {/* Portuguese Community Specific Tags */}
        <meta name="audience" content="Portuguese speakers, Brazilian community, Angolan community, Mozambican community, Cape Verdean community" />
        <meta name="coverage" content="London, United Kingdom" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData)
          }}
        />
        
        {/* Event Schema if provided */}
        {eventSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(eventSchema)
            }}
          />
        )}
      </Head>
    </>
  )
}