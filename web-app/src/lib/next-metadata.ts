import type { Metadata } from 'next'
import { SEOService, SEO_PAGES } from '@/lib/seo'
import { SITE_URL } from '@/config/site'

const BASE = SITE_URL

export function metadataFor(page: keyof typeof SEO_PAGES, path: string, lang: 'en' | 'pt' = 'en'): Metadata {
  const data = SEOService.generateMetaTags(page, lang)
  const canonical = `${BASE}${path}`

  return {
    metadataBase: new URL(BASE),
    title: data.title,
    description: data.description,
    alternates: {
      canonical,
      languages: {
        'en-GB': canonical,
        'pt-PT': `${canonical}?lang=pt`,
      },
    },
    keywords: data.keywords.split(',').map(k => k.trim()),
    openGraph: {
      type: 'website',
      url: canonical,
      title: data.ogTitle,
      description: data.ogDescription,
      siteName: 'LusoTown London',
      images: data.ogImage ? [{ url: data.ogImage, width: 1200, height: 630, alt: data.ogTitle }] : undefined,
      locale: lang === 'pt' ? 'pt_PT' : 'en_GB',
      alternateLocale: lang === 'pt' ? ['en_GB'] : ['pt_PT'],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.ogTitle,
      description: data.ogDescription,
      images: data.ogImage ? [data.ogImage] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  }
}

interface SEOMetadataOptions {
  title: string
  description: string
  keywords?: string
  canonicalUrl: string
  openGraph?: {
    title?: string
    description?: string
    images?: Array<{
      url: string
      width?: number
      height?: number
      alt?: string
    }>
  }
}

export function generateSEOMetadata(options: SEOMetadataOptions): Metadata {
  const canonical = `${BASE}${options.canonicalUrl}`
  
  return {
    metadataBase: new URL(BASE),
    title: options.title,
    description: options.description,
    alternates: {
      canonical,
      languages: {
        'en-GB': canonical,
        'pt-PT': `${canonical}?lang=pt`,
      },
    },
    keywords: options.keywords?.split(',').map(k => k.trim()),
    openGraph: {
      type: 'website',
      url: canonical,
      title: options.openGraph?.title || options.title,
      description: options.openGraph?.description || options.description,
      siteName: 'LusoTown London',
      images: options.openGraph?.images,
      locale: 'en_GB',
      alternateLocale: ['pt_PT'],
    },
    twitter: {
      card: 'summary_large_image',
      title: options.openGraph?.title || options.title,
      description: options.openGraph?.description || options.description,
      images: options.openGraph?.images?.map(img => img.url),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  }
}
