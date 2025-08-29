
import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import GroupEventsPageClient from '@/components/GroupEventsPageClient'
import { EventsPageSchema, EventSchema } from '@/components/SEO/SchemaMarkup'

// Page metadata
export const metadata: Metadata = {
  title: 'Lusophone Group Events & Tours in London | LusoTown',
  description: 'Join Portuguese-speaking groups for cultural tours, museum visits, and London adventures. Connect with Portuguese-speaking community through organized group experiences.',
  keywords: 'Lusophone groups London, Lusophone tours London, Lusophone cultural events, Portuguese-speaking community groups United Kingdom',
  openGraph: {
    title: 'Lusophone Group Events & Tours in London | LusoTown',
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
        alt: 'Lusophone Group Events in London'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lusophone Group Events & Tours in London | LusoTown',
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

// Enhanced structured data using our comprehensive schema system

export default function GroupEventsPage() {
  return (
    <>
      {/* Enhanced Portuguese Community Schema Markup */}
      <EventsPageSchema />
      
      {/* Specific group events schema */}
      <EventSchema 
        eventName="Lusophone Group Events & Tours London | Eventos de Grupo Lusófonos"
        description="Regular group events and tours for Portuguese-speaking community in London. Eventos e tours regulares para a comunidade lusófona em Londres."
        startDate="2025-01-15T19:00:00"
        location="Various London Cultural Venues"
        organizer="LusoTown London"
        countries={["Portugal", "Brazil", "Angola", "Cape Verde", "Mozambique"]}
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