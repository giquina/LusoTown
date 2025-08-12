import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import WhatsAppWidget from '@/components/WhatsAppWidget'
import LiveFeedNotifications from '@/components/LiveFeedNotifications'
import AgeVerification from '@/components/AgeVerification'
import { LanguageProvider } from '@/context/LanguageContext'

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
  title: 'LusoTown London - Portuguese Community Platform',
  description: 'A digital home for Portuguese-speaking communities in London. Connect with culture, find events, discover businesses, and build friendships in the heart of the UK.',
  keywords: [
    'portuguese community london',
    'lusophone london',
    'portugal diaspora uk',
    'brazilian community london',
    'angolan community london',
    'portuguese culture london',
    'portuguese events london',
    'portuguese business directory',
    'luso diaspora uk',
    'portuguese speakers london',
    'lusophone culture uk'
  ],
  authors: [{ name: 'LusoTown London' }],
  creator: 'LusoTown London',
  publisher: 'LusoTown London',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://lusotown.london',
    title: 'LusoTown London - Portuguese Community Platform',
    description: 'A digital home for Portuguese-speaking communities in London. Connect with culture, find events, discover businesses, and build friendships in the heart of the UK.',
    siteName: 'LusoTown London',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LusoTown London - Portuguese Community Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LusoTown London - Portuguese Community Platform',
    description: 'A digital home for Portuguese-speaking communities in London. Connect with culture, find events, discover businesses, and build friendships.',
    images: ['/og-image.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
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
          <AgeVerification />
          {children}
          <WhatsAppWidget />
          <LiveFeedNotifications />
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