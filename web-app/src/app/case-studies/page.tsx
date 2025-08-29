import dynamic from 'next/dynamic';

import { Metadata } from 'next'
import Footer from '@/components/Footer'
const CaseStudies = dynamic(() => import('@/components/CaseStudies'), { loading: () => <div>Loading...</div> });
import CTA from '@/components/CTA'
import { 
  HeartIcon, 
  UsersIcon, 
  SparklesIcon,
  CalendarIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  TrophyIcon,
  StarIcon,
  ChatBubbleOvalLeftIcon
} from '@heroicons/react/24/outline'
import { ROUTES } from '@/config/routes'

export const metadata: Metadata = {
  title: 'Case Studies - Real Portuguese-speaking community Connections | LusoTown London',
  description: 'Discover how Portuguese speakers from Brazil, Portugal, Angola, and beyond have transformed their London lives through LusoTown connections. Real stories of friendship, business partnerships, and cultural impact.',
  keywords: [
    'LusoTown case studies',
    'Portuguese-speaking community London',
    'Portuguese speakers United Kingdom',
    'Portuguese-speaking friendship stories',
    'Portuguese business partnerships',
    'Lusophone cultural connections',
    'Brazilian Lusophone London',
    'Angola Lusophone United Kingdom',
    'Lusophone diaspora success',
    'Portuguese-speaking community transformation'
  ],
  openGraph: {
    title: 'Case Studies - Real Portuguese-speaking community Connections | LusoTown London',
    description: 'Discover how Portuguese speakers have transformed their London lives through meaningful connections at LusoTown events.',
    type: 'website',
    url: 'https://lusotown.london/case-studies',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LusoTown Case Studies - Portuguese-speaking community Connections',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies - Real Portuguese-speaking community Connections | LusoTown London',
    description: 'Real stories of how Portuguese speakers transformed their London lives through LusoTown connections.',
    images: ['/og-image.jpg'],
  },
}

// Page-specific structured data for Portuguese-speaking community case studies
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'LusoTown Portuguese-speaking community Case Studies',
  description: 'Real transformation stories from Portuguese speakers who connected through LusoTown events in London',
  url: 'https://lusotown.london/case-studies',
  mainEntity: {
    '@type': 'ItemList',
    name: 'Portuguese-speaking community Success Stories',
    description: 'Detailed case studies showing how Portuguese speakers built meaningful connections in London',
    numberOfItems: 3,
    itemListElement: [
      {
        '@type': 'Article',
        name: 'From Strangers to Flatmates: A Museum Meeting That Changed Two Lives',
        description: 'How Ana from Brazil and Mariana from Portugal met at the National Gallery and became best friends and flatmates',
        author: {
          '@type': 'Organization',
          name: 'LusoTown London'
        }
      },
      {
        '@type': 'Article', 
        name: 'From Business Cards to Business Partners: A Professional Network That Sparked Success',
        description: 'How Carlos from Angola and Sofia from Portugal launched a successful consultancy after meeting at a networking event',
        author: {
          '@type': 'Organization',
          name: 'LusoTown London'
        }
      },
      {
        '@type': 'Article',
        name: 'From Book Club to Cultural Legacy: Literature That Launched a Movement',
        description: 'How Isabel from Portugal and Fernanda from Brazil created London\'s premier Lusophone cultural organization',
        author: {
          '@type': 'Organization',
          name: 'LusoTown London'
        }
      }
    ]
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Portuguese-speaking community',
    geographicArea: {
      '@type': 'Country',
      name: 'United Kingdom'
    }
  }
}

export default function CaseStudiesPage() {
  return (
    <>
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen">
        <div className="pt-24 sm:pt-28 lg:pt-32">
          {/* Hero Section */}
          <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
            <div className="container-width">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium text-primary-600 mb-6">
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  Lusophone Communities in London Case Studies
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">
                  Lusophone Communities in London Case Studies
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed text-balance">
                  Detailed case studies showing how Portuguese speakers from Brazil, Portugal, Angola, and beyond 
                  have transformed their London lives through meaningful LusoTown connections. From flatmates to business 
                  partners to cultural leaders - these are the stories that prove community changes everything.
                </p>
              </div>
            </div>
          </section>

          {/* Main Case Studies Component */}
          <CaseStudies />

          {/* Call to Action */}
          <CTA />
        </div>
        <Footer />
      </main>
    </>
  )
}

