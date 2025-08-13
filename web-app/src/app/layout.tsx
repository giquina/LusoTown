import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import WhatsAppWidget from '@/components/WhatsAppWidget'
import LiveFeedNotifications from '@/components/LiveFeedNotifications'
import UserTypeSelection from '@/components/UserTypeSelection'
import { LanguageProvider } from '@/context/LanguageContext'
import { FavoritesProvider } from '@/context/FavoritesContext'
import { FollowingProvider } from '@/context/FollowingContext'
import FavoriteNotification from '@/components/FavoriteNotification'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'LusoTown - UK Portuguese Community Platform',
  description: 'The premier platform for Portuguese-speaking communities across the UK. Connect with culture, find events, discover businesses, and build friendships from London to Scotland.',
  keywords: [
    'portuguese community uk',
    'portuguese london',
    'lusophone britain',
    'portugal diaspora uk',
    'brazilian community uk',
    'angolan community britain',
    'portuguese culture uk',
    'portuguese events london',
    'portuguese business directory uk',
    'luso diaspora britain',
    'portuguese speakers uk',
    'lusophone culture britain',
    'portuguese community platform uk',
    'portuguese manchester',
    'portuguese birmingham',
    'portuguese scotland'
  ],
  authors: [{ name: 'LusoTown' }],
  creator: 'LusoTown',
  publisher: 'LusoTown',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://lusotown.com',
    title: 'LusoTown - UK Portuguese Community Platform',
    description: 'The premier platform for Portuguese-speaking communities across the UK. Connect with culture, find events, discover businesses, and build friendships from London to Scotland.',
    siteName: 'LusoTown',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LusoTown - UK Portuguese Community Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LusoTown - UK Portuguese Community Platform',
    description: 'The premier platform for Portuguese-speaking communities across the UK. Connect with culture, find events, discover businesses, and build friendships.',
    images: ['/og-image.jpg'],
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
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1E40AF" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <LanguageProvider>
          <FavoritesProvider>
            <FollowingProvider>
              <UserTypeSelection />
              {children}
              <WhatsAppWidget />
              <LiveFeedNotifications />
              <FavoriteNotification />
            </FollowingProvider>
          </FavoritesProvider>
        </LanguageProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#374151',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              borderRadius: '0.75rem',
              padding: '12px 16px',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}