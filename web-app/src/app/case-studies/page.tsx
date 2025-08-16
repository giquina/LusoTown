import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudies from '@/components/CaseStudies'
import CTA from '@/components/CTA'
import { 
  HeartIcon, 
  UserGroupIcon, 
  SparklesIcon,
  CalendarIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  TrophyIcon,
  StarIcon,
  ChatBubbleOvalLeftIcon
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Case Studies - Real Portuguese Community Connections | LusoTown London',
  description: 'Discover how Portuguese speakers from Brazil, Portugal, Angola, and beyond have transformed their London lives through LusoTown connections. Real stories of friendship, business partnerships, and cultural impact.',
  keywords: [
    'LusoTown case studies',
    'Portuguese community London',
    'Portuguese speakers UK',
    'Portuguese friendship stories',
    'Portuguese business partnerships',
    'Portuguese cultural connections',
    'Brazilian Portuguese London',
    'Angola Portuguese UK',
    'Portuguese diaspora success',
    'Portuguese community transformation'
  ],
  openGraph: {
    title: 'Case Studies - Real Portuguese Community Connections | LusoTown London',
    description: 'Discover how Portuguese speakers have transformed their London lives through meaningful connections at LusoTown events.',
    type: 'website',
    url: 'https://lusotown.london/case-studies',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LusoTown Case Studies - Portuguese Community Connections',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies - Real Portuguese Community Connections | LusoTown London',
    description: 'Real stories of how Portuguese speakers transformed their London lives through LusoTown connections.',
    images: ['/og-image.jpg'],
  },
}

// Page-specific structured data for Portuguese community case studies
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'LusoTown Portuguese Community Case Studies',
  description: 'Real transformation stories from Portuguese speakers who connected through LusoTown events in London',
  url: 'https://lusotown.london/case-studies',
  mainEntity: {
    '@type': 'ItemList',
    name: 'Portuguese Community Success Stories',
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
        description: 'How Isabel from Portugal and Fernanda from Brazil created London\'s premier Portuguese cultural organization',
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
        <Header />
        <div className="pt-16">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
            <div className="container-width">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium text-primary-600 mb-6">
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  Portuguese Community Case Studies
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">
                  Real Stories, Real Transformations
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed text-balance">
                  Detailed case studies showing how Portuguese speakers from Brazil, Portugal, Angola, and beyond 
                  have transformed their London lives through meaningful LusoTown connections. From flatmates to business 
                  partners to cultural leaders - these are the stories that prove community changes everything.
                </p>
              </div>
            </div>
          </section>

          {/* Portuguese Community Impact Stats */}
          <section className="py-16 bg-white">
            <div className="container-width">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
                  Portuguese Community Impact in London
                </h2>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary-100 to-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <HeartIcon className="w-8 h-8 text-secondary-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
                    <div className="text-sm text-gray-600">Portuguese Speakers Connected</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent-100 to-coral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <UserGroupIcon className="w-8 h-8 text-accent-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">150+</div>
                    <div className="text-sm text-gray-600">Meaningful Friendships Formed</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-coral-100 to-action-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <TrophyIcon className="w-8 h-8 text-coral-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">25+</div>
                    <div className="text-sm text-gray-600">Business Partnerships Created</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-action-100 to-premium-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <SparklesIcon className="w-8 h-8 text-action-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">8</div>
                    <div className="text-sm text-gray-600">Countries Represented</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Case Studies Component */}
          <CaseStudies />

          {/* Why These Stories Matter */}
          <section className="py-20 bg-gradient-to-br from-secondary-50 to-accent-50">
            <div className="container-width">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                  Why These Stories Matter
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <MapPinIcon className="w-8 h-8 text-secondary-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Real London Venues</h3>
                    <p className="text-gray-600">
                      These connections happened at actual London locations - the National Gallery, The Shard, 
                      British Library. Every Portuguese speaker can envision themselves at these accessible venues.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CalendarIcon className="w-8 h-8 text-accent-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentic Timelines</h3>
                    <p className="text-gray-600">
                      From first meeting to life transformation - these timelines show realistic progression 
                      of Portuguese community relationships over months, not overnight magic.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <UserGroupIcon className="w-8 h-8 text-coral-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Diverse Portuguese Heritage</h3>
                    <p className="text-gray-600">
                      Stories include speakers from Portugal, Brazil, Angola - showcasing how all Portuguese 
                      speakers find common ground and mutual support in London's diaspora community.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <TrophyIcon className="w-8 h-8 text-action-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Measurable Impact</h3>
                    <p className="text-gray-600">
                      Specific achievements: savings on rent, business revenue, cultural recognition, 
                      community leadership. These aren't just feel-good stories - they're life improvements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How to Write Your Own Story */}
          <section className="py-20 bg-white">
            <div className="container-width">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  How to Write Your Own Portuguese Story in London
                </h2>
                <p className="text-xl text-gray-600 mb-12">
                  These transformations all started with someone attending their first LusoTown event. 
                  Here's how you can begin your own story.
                </p>
                
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                      1
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Browse Events</h3>
                    <p className="text-gray-600">
                      Look for events that match your interests - cultural, professional, social, or creative. 
                      Start with one that feels comfortable.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-coral-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                      2
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Attend & Connect</h3>
                    <p className="text-gray-600">
                      Be open to conversations. Exchange contact details with people who share your interests 
                      or background. Follow up after the event.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-coral-500 to-action-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                      3
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Build Relationships</h3>
                    <p className="text-gray-600">
                      Meet regularly, support each other's goals, explore collaborations. Great friendships 
                      and partnerships grow from consistent connection.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-secondary-50 to-accent-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Ready to Start Your Story?
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Your next life-changing connection could be at this week's event. Join the Portuguese 
                    community that's transforming lives across London.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/events"
                      className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 font-semibold px-8 py-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
                    >
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      Browse This Week's Events
                    </a>
                    <a
                      href="/signup"
                      className="bg-white text-secondary-600 hover:bg-gray-50 border-2 border-secondary-200 font-semibold px-8 py-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
                    >
                      <UserGroupIcon className="w-5 h-5 mr-2" />
                      Join the Community
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="py-16 bg-gray-50">
            <div className="container-width">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Get More Portuguese Community Stories
                </h3>
                <p className="text-gray-600 mb-8">
                  Subscribe to receive monthly case studies, community highlights, and inspiring stories 
                  from Portuguese speakers across London and the UK.
                </p>
                
                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-400 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="bg-secondary-600 text-white hover:bg-secondary-700 font-semibold px-6 py-3 rounded-lg transition-colors duration-200 whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
                
                <p className="text-xs text-gray-500 mt-4">
                  We respect your privacy. Unsubscribe anytime. No spam, just inspiring Portuguese community stories.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <CTA />
        </div>
        <Footer />
      </main>
    </>
  )
}