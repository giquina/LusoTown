import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import WhatsAppWidget from '@/components/WhatsAppWidget'
import LiveFeedNotifications from '@/components/LiveFeedNotifications'

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
  title: 'AdyaTribe - Where Amazing Women Connect in London & UK',
  description: 'Join the premier UK community for 30+ single & childfree women. Find your tribe in London, make meaningful friendships, and discover shared adventures across the UK.',
  keywords: [
    'women community UK',
    'London women',
    '30+ women London',
    'childfree women UK', 
    'single women London',
    'friendship London',
    'UK women community',
    'London social network',
    'female friendships UK',
    'women over 30 London',
    'British women tribe'
  ],
  authors: [{ name: 'AdyaTribe' }],
  creator: 'AdyaTribe',
  publisher: 'AdyaTribe',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://adyatribe.com',
    title: 'AdyaTribe - Where Amazing Women Connect in London & UK',
    description: 'Join the premier UK community for 30+ single & childfree women. Find your tribe in London, make meaningful friendships, and discover shared adventures across the UK.',
    siteName: 'AdyaTribe',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AdyaTribe - Women Community Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AdyaTribe - Where Amazing Women Connect in London & UK',
    description: 'Join the premier UK community for 30+ single & childfree women in London.',
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
        <meta name="theme-color" content="#ff6b6b" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <WhatsAppWidget />
        <LiveFeedNotifications />
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