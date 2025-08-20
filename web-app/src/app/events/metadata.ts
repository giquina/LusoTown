import { Metadata } from 'next'
import { SITE_URL, absoluteUrl } from '@/config/site'
import { ROUTES } from '@/config/routes'

export const metadata: Metadata = {
  title: 'Portuguese Events in London | LusoTown - Social Calendar',
  description: 'Join Portuguese speakers in London for cultural events, business workshops, AI seminars, and social gatherings. Book authentic Portuguese experiences today.',
  keywords: [
    'portuguese events london',
    'eventos portugueses londres',
    'portuguese social calendar',
    'agenda portuguesa londres',
    'lusophone events',
    'portuguese business networking',
    'portuguese cultural events',
    'fado nights london',
    'portuguese workshops london',
    'brazilian events london',
    'angolan culture london',
    'mozambican events',
    'cape verdean music london'
  ],
  openGraph: {
    title: 'Portuguese Events in London | LusoTown Social Calendar',
    description: 'Connect with Portuguese speakers through authentic cultural events, professional workshops, and social gatherings across London.',
  url: absoluteUrl(ROUTES.events),
    siteName: 'LusoTown London',
    type: 'website',
    locale: 'en_GB',
    alternateLocale: ['pt_PT', 'pt_BR'],
  images: [
      {
        url: '/events-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Portuguese Events in London - LusoTown Community Calendar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portuguese Events in London | Join Your Community',
    description: 'Discover authentic Portuguese events, workshops, and cultural gatherings in London. Connect with your lusophone community today.',
    images: ['/events-og.jpg'],
  },
  alternates: {
    canonical: absoluteUrl(ROUTES.events),
    languages: {
      'en': absoluteUrl(ROUTES.events),
      'pt': `${absoluteUrl(ROUTES.events)}?lang=pt`,
    },
  },
}