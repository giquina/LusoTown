import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import GroupEventsPageClient from '@/components/GroupEventsPageClient'

// Page metadata
export const metadata: Metadata = {
  title: 'Portuguese Group Events & Tours in London | LusoTown',
  description: 'Join Portuguese-speaking groups for cultural tours, museum visits, and London adventures. Connect with Portuguese-speaking community through organized group experiences.',
  keywords: 'Portuguese groups London, Portuguese tours London, Portuguese cultural events, Portuguese-speaking community groups UK',
  openGraph: {
    title: 'Portuguese Group Events & Tours in London | LusoTown',
    description: 'Join Portuguese-speaking groups for cultural tours, museum visits, and London adventures.',
    type: 'website',
    locale: 'en_GB',
    url: 'https://lusotown.london/events/groups',
    siteName: 'LusoTown London',
    images: [
      {
        url: 'https://lusotown.london/og-group-events.jpg',
        width: 1200,
        height: 630,
        alt: 'Portuguese Group Events in London'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portuguese Group Events & Tours in London | LusoTown',
    description: 'Join Portuguese-speaking groups for cultural tours, museum visits, and London adventures.',
    images: ['https://lusotown.london/og-group-events.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://lusotown.london/events/groups',
    languages: {
      'en': 'https://lusotown.london/events/groups',
      'pt': 'https://lusotown.london/pt/eventos/grupos'
    }
  }
}

// Structured data for group events
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EventSeries',
  name: 'Portuguese Group Events & Tours in London',
  description: 'Regular group events and tours for Portuguese speakers in London, including cultural experiences, historical tours, and family activities.',
  url: 'https://lusotown.london/events/groups',
  organizer: {
    '@type': 'Organization',
    name: 'LusoTown London',
    url: 'https://lusotown.london'
  },
  location: {
    '@type': 'City',
    name: 'London',
    addressCountry: 'GB'
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Portuguese-speaking community'
  },
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  inLanguage: ['en', 'pt'],
  keywords: ['Portuguese-speaking community', 'London tours', 'cultural events', 'group activities'],
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: 25,
    highPrice: 55,
    priceCurrency: 'GBP'
  }
}

export default function GroupEventsPage() {
  return (
    <>
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen w-full overflow-x-hidden">
        <div className="pt-16 w-full">
          <GroupEventsPageClient />
          <Footer />
        </div>
      </main>
    </>
  )
}