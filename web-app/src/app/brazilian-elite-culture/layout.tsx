import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brazilian Elite Culture | LusoTown',
  description: 'Discover Brazil\'s sophisticated cultural scene and connect with London\'s Brazilian elite through exclusive venues, luxury brands, and high-society networking.',
  keywords: 'Brazilian elite, São Paulo high society, Rio luxury, Brazilian professionals London, Casa do Brasil, Brazilian Embassy events, luxury Brazilian culture',
  openGraph: {
    title: 'Brazilian Elite Culture & Luxury Lifestyle | LusoTown',
    description: 'Connect with Brazil\'s economic powerhouse. Exclusive access to São Paulo high society, Rio luxury lifestyle, and London\'s Brazilian professional elite.',
    url: 'https://lusotown.com/brazilian-elite-culture',
    siteName: 'LusoTown',
    locale: 'en_GB',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lusotown.com/brazilian-elite-culture',
    languages: {
      'en-GB': 'https://lusotown.com/brazilian-elite-culture',
      'pt-PT': 'https://lusotown.com/pt/cultura-elite-brasileira'
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function BrazilianEliteCultureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      {children}
    </div>
  )
}