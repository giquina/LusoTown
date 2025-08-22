import { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'
import BrazilianEliteCulturalShowcase from '@/components/BrazilianEliteCulturalShowcase'
import PremiumPageLayout from '@/components/PremiumPageLayout'
import { generateSEOMetadata } from '@/lib/next-metadata'

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: 'Brazilian Elite Culture & Luxury Lifestyle in London',
    description: 'Discover Brazil\'s sophisticated cultural scene and connect with London\'s Brazilian elite. Access exclusive venues, luxury brands, and high-society networking opportunities.',
    keywords: 'Brazilian elite London, São Paulo high society, Rio luxury lifestyle, Brazilian business networking, Brazilian cultural institutions, luxury Brazilian brands, Brazilian professionals UK, Casa do Brasil London, Brazilian Embassy events, Copacabana Palace, Teatro Municipal, Brazilian art investment',
    canonicalUrl: '/brazilian-elite-culture',
    openGraph: {
      title: 'Brazilian Elite Culture & Luxury Lifestyle | LusoTown London',
      description: 'Connect with Brazil\'s economic powerhouse. Exclusive access to São Paulo high society, Rio luxury lifestyle, and London\'s Brazilian professional elite.',
      images: [
        {
          url: '/og-image-brazilian-elite.jpg',
          width: 1200,
          height: 630,
          alt: 'Brazilian Elite Culture - São Paulo, Rio, London'
        }
      ]
    }
  })
}

export default function BrazilianEliteCulturePage() {
  return (
    <PremiumPageLayout
      title="Brazilian Elite Culture"
      subtitle="Brazil: Latin America's Economic Powerhouse"
      className="min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="Brazilian Elite Culture & Luxury Lifestyle"
          subtitle="Discover Brazil's sophisticated cultural scene and connect with London's Brazilian elite. Experience the cultural sophistication of Latin America's largest economy through exclusive venues, luxury brands, and elite networking opportunities connecting São Paulo high society, Rio luxury lifestyle, and London's Brazilian professionals."
          badge="12th Largest Economy Globally"
          theme="premium"
          size="xl"
          className="mb-12"
        />

        <BrazilianEliteCulturalShowcase 
          variant="full" 
          showSubscriptionGate={true}
        />

        {/* Additional Content Sections */}
        <div className="mt-16 space-y-12">
          {/* Economic Powerhouse Stats */}
          <section className="bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Brazil: Economic & Cultural Leadership
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                As Latin America's largest economy and cultural powerhouse, Brazil represents sophisticated luxury, 
                world-class industries, and refined cultural institutions that rival global capitals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-green-600 mb-2">12th</div>
                <div className="text-sm text-gray-600">Largest Economy Globally</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-2">#1</div>
                <div className="text-sm text-gray-600">Economy in Latin America</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-purple-600 mb-2">3rd</div>
                <div className="text-sm text-gray-600">Largest Aircraft Manufacturer</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-yellow-600 mb-2">4th</div>
                <div className="text-sm text-gray-600">Largest Luxury Car Market</div>
              </div>
            </div>
          </section>

          {/* London Connection */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Brazilian Elite in London
                </h2>
                <p className="text-gray-700 mb-4">
                  London hosts one of Europe's most sophisticated Brazilian professional communities, 
                  including executives from major Brazilian multinationals, investment bankers, 
                  cultural ambassadors, and luxury lifestyle entrepreneurs.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm text-gray-700">Brazilian Embassy Cultural Centre - diplomatic hub</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="text-sm text-gray-700">Casa do Brasil London - enhanced elite programming</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span className="text-sm text-gray-700">Exclusive monthly networking at premium venues</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    <span className="text-sm text-gray-700">Annual Brazil-UK Business Excellence Forum</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Elite Professional Sectors</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Investment Banking & Finance</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">High Presence</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Mining & Commodities Trading</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Luxury Fashion & Jewelry</span>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Growing</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Cultural Diplomacy & Arts</span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Established</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-gradient-to-r from-blue-600 via-green-600 to-yellow-500 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Join Brazil's Elite Network in London?
            </h2>
            <p className="text-xl mb-6 text-blue-100">
              Access exclusive Brazilian cultural institutions, luxury brands, and high-society networking opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/premium-membership"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200"
              >
                Explore Premium Access
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Request Elite Invitation
              </a>
            </div>
          </section>
        </div>
      </div>
    </PremiumPageLayout>
  )
}