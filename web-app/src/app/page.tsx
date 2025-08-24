'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { communityStats } from '@/config/community'
import { generateJsonLd } from '@/config/seo'
import dynamic from 'next/dynamic'
import Footer from '@/components/Footer'
import { ROUTES } from '@/config/routes'
import MobileWelcomeWizard from '@/components/MobileWelcomeWizard'
import ResponsiveButton from '@/components/ResponsiveButton'

// Strategic component loading for cohesive experience
const SuccessStories = dynamic(() => import('@/components/SuccessStories'), {
  loading: () => <div className="h-60 bg-gray-100 animate-pulse rounded-xl" />
})
const TestimonialsNew = dynamic(() => import('@/components/TestimonialsNew'), {
  loading: () => <div className="h-48 bg-gray-100 animate-pulse rounded-xl" />
})
const EventsShowcase = dynamic(() => import('@/components/EventsShowcase'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />
})

import { 
  HeartIcon,
  UsersIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  MapPinIcon,
  StarIcon,
  CheckIcon,
  SparklesIcon,
  BuildingOffice2Icon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'

// Page-specific structured data for Portuguese social calendar
const jsonLd = generateJsonLd('organization')

export default function Home() {
  const { t } = useLanguage()
  const [showWelcomeWizard, setShowWelcomeWizard] = useState(false)

  // Show welcome wizard on first visit (mobile only) - Less aggressive
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('lusotown_welcome_seen')
    const isMobile = window.innerWidth < 768
    
    if (!hasSeenWelcome && isMobile) {
      const timer = setTimeout(() => {
        if (!localStorage.getItem('lusotown_welcome_seen')) {
          setShowWelcomeWizard(true)
        }
      }, 15000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleWelcomeComplete = (action: string) => {
    localStorage.setItem('lusotown_welcome_seen', 'true')
    
    switch (action) {
      case 'matches':
        window.location.href = '/matches'
        break
      case 'events':
        window.location.href = ROUTES.events
        break
      default:
        break
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      
      <main className="min-h-screen w-full overflow-x-hidden" role="main">
        <div className="pt-24 w-full">
          {/* HERO SECTION - Redesigned for cohesion and free signup emphasis */}
          <section className="relative min-h-[600px] lg:min-h-[700px] bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center overflow-hidden">
            {/* Portuguese flag inspired background */}
            <div className="absolute inset-0" aria-hidden="true">
              <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-r from-green-100/30 to-green-200/20"></div>
              <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-l from-red-100/30 to-red-200/20"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-50/20 to-transparent"></div>
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                {/* Left Column - Value Proposition */}
                <div className="text-center lg:text-left space-y-8">
                  {/* Free Badge */}
                  <div className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse">
                    <CheckIcon className="w-4 h-4" />
                    {t('hero.free_badge', '100% FREE TO JOIN')}
                  </div>
                  
                  {/* Main Headline */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                    <span className="text-primary-600">Find Your</span><br />
                    <span className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 bg-clip-text text-transparent">
                      Portuguese
                    </span><br />
                    <span className="text-secondary-600">Match</span> 🇵🇹
                  </h1>
                  
                  {/* Sub-headline */}
                  <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-2xl">
                    {t('hero.subheadline', 'Connect with 750+ Portuguese speakers across the United Kingdom. Find friends, dates, business partners, or your soulmate.')}
                  </p>
                  
                  {/* Trust indicators */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-gray-600">
                    <div className="flex items-center gap-2">
                      <UsersIcon className="w-5 h-5 text-primary-500" />
                      <span className="font-semibold">750+ Members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-5 h-5 text-secondary-500" />
                      <span className="font-semibold">United Kingdom-Wide</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <StarIcon className="w-5 h-5 text-yellow-500" />
                      <span className="font-semibold">4.9/5 Rating</span>
                    </div>
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a
                      href={ROUTES.signup}
                      className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 min-h-[60px] min-w-[200px]"
                    >
                      <span className="mr-3">🇵🇹</span>
                      {t('hero.cta_primary', 'JOIN FREE NOW')}
                      <ArrowRightIcon className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    
                    <a
                      href="#how-matching-works"
                      className="inline-flex items-center justify-center px-6 py-4 border-2 border-primary-300 text-primary-700 text-lg font-semibold rounded-2xl hover:bg-primary-50 transition-all duration-300 min-h-[60px] min-w-[160px]"
                    >
                      {t('hero.cta_secondary', 'See How It Works')}
                    </a>
                  </div>
                  
                  {/* Social proof */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-md mx-auto lg:mx-0">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex -space-x-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-red-400 flex items-center justify-center text-white font-bold text-sm">M</div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm">J</div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center text-white font-bold text-sm">A</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">Maria & João</div>
                        <div className="text-sm text-gray-600">Found love through LusoTown 💕</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 italic">
                      "Conhecemo-nos aqui e agora estamos noivos! A comunidade portuguesa no Reino Unido é incrível." ⭐⭐⭐⭐⭐
                    </p>
                  </div>
                </div>
                
                {/* Right Column - Visual Content */}
                <div className="relative">
                  <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    {/* Mock Portuguese profile cards */}
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-green-50 to-red-50 rounded-2xl p-4 border border-green-200/50">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-red-500 flex items-center justify-center text-white font-bold">C</div>
                          <div>
                            <div className="font-bold text-gray-900">Carlos, 28</div>
                            <div className="text-sm text-gray-600">🇵🇹 Lisboa → London</div>
                          </div>
                          <div className="ml-auto bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">95% MATCH</div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">"Adoro fado e procuro alguém para explorar o Reino Unido comigo. Trabalho em tech e amo futebol!"</p>
                        <div className="flex gap-2">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Fado</span>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Tech</span>
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Futebol</span>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-200/50">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">A</div>
                          <div>
                            <div className="font-bold text-gray-900">Ana, 26</div>
                            <div className="text-sm text-gray-600">🇧🇷 São Paulo → Manchester</div>
                          </div>
                          <div className="ml-auto bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">92% MATCH</div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">"Brasileira apaixonada por cultura portuguesa. Vamos tomar um café?"</p>
                        <div className="flex gap-2">
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Café</span>
                          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Arte</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-bounce">
                        <HeartIcon className="w-4 h-4" />
                        New matches daily!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* HOW MATCHING WORKS SECTION - Core Value Proposition */}
          <section id="how-matching-works" className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 via-yellow-100 to-red-100 px-6 py-3 rounded-full text-primary-700 font-bold text-sm mb-6">
                    <SparklesIcon className="w-4 h-4" />
                    {t('matching.badge', 'SMART PORTUGUESE MATCHING')}
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                    {t('matching.title', 'Find Your Perfect Portuguese Match')}
                  </h2>
                  
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                    {t('matching.subtitle', 'Our AI matches you with Portuguese speakers based on culture, interests, location, and what you\'re looking for.')}
                  </p>
                  
                  {/* Free Emphasis */}
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6 max-w-md mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <CheckIcon className="w-6 h-6 text-green-600" />
                      <span className="text-lg font-bold text-green-800">100% FREE to start matching</span>
                    </div>
                    <p className="text-sm text-green-700">No credit card required • Cancel anytime</p>
                  </div>
                </div>
                
                {/* Matching Types Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                  {/* Romance */}
                  <div className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <HeartIcon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('matching.romance.title', 'Find Love')}</h3>
                    <p className="text-gray-600 text-sm">{t('matching.romance.description', 'Dates, relationships, Portuguese soulmates')}</p>
                  </div>
                  
                  {/* Friendship */}
                  <div className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <UsersIcon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('matching.friendship.title', 'Make Friends')}</h3>
                    <p className="text-gray-600 text-sm">{t('matching.friendship.description', 'Portuguese-speaking friends for life')}</p>
                  </div>
                  
                  {/* Business */}
                  <div className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <BuildingOffice2Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('matching.business.title', 'Network')}</h3>
                    <p className="text-gray-600 text-sm">{t('matching.business.description', 'Business partners, mentors, careers')}</p>
                  </div>
                  
                  {/* Cultural */}
                  <div className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <AcademicCapIcon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('matching.cultural.title', 'Learn')}</h3>
                    <p className="text-gray-600 text-sm">{t('matching.cultural.description', 'Language exchange, cultural sharing')}</p>
                  </div>
                </div>
                
                {/* How It Works Steps */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12 mb-16">
                  <h3 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-12">
                    {t('matching.how_it_works.title', 'How Portuguese Matching Works')}
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Step 1 */}
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        1
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{t('matching.step1.title', 'Join Free')}</h4>
                      <p className="text-gray-600">{t('matching.step1.description', 'Sign up with your Portuguese heritage and what you\'re looking for')}</p>
                    </div>
                    
                    {/* Step 2 */}
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        2
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{t('matching.step2.title', 'Get Matches')}</h4>
                      <p className="text-gray-600">{t('matching.step2.description', 'AI finds compatible Portuguese speakers near you in the United Kingdom')}</p>
                    </div>
                    
                    {/* Step 3 */}
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        3
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{t('matching.step3.title', 'Connect')}</h4>
                      <p className="text-gray-600">{t('matching.step3.description', 'Chat, meet at events, build relationships that matter')}</p>
                    </div>
                  </div>
                </div>
                
                {/* Success Stories Preview */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-red-500 flex items-center justify-center text-white font-bold">M</div>
                      <div>
                        <div className="font-bold text-gray-900">Miguel & Sofia</div>
                        <div className="text-sm text-gray-600">🇵🇹 Matched 3 months ago</div>
                      </div>
                      <div className="ml-auto text-2xl">💕</div>
                    </div>
                    <p className="text-gray-700 italic mb-3">
                      "Conhecemo-nos através do LusoTown e descobrimos que tínhamos tanto em comum! Agora estamos a planear viajar juntos por Portugal e explorar o Reino Unido."
                    </p>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckIcon className="w-4 h-4" />
                      <span className="font-medium">Found through Portuguese Culture Match</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">C</div>
                      <div>
                        <div className="font-bold text-gray-900">Carlos & Business Partner</div>
                        <div className="text-sm text-gray-600">🇧🇷 Business Network Match</div>
                      </div>
                      <div className="ml-auto text-2xl">🤝</div>
                    </div>
                    <p className="text-gray-700 italic mb-3">
                      "Encontrei o meu sócio de negócios aqui! Criámos uma empresa de importação Brasil-Reino Unido. O networking português funciona!"
                    </p>
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <CheckIcon className="w-4 h-4" />
                      <span className="font-medium">Found through Business Networking</span>
                    </div>
                  </div>
                </div>
                
                {/* CTA */}
                <div className="text-center">
                  <a
                    href={ROUTES.signup}
                    className="inline-flex items-center justify-center px-12 py-6 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-2 hover:scale-105"
                  >
                    <HeartIcon className="w-6 h-6 mr-3" />
                    {t('matching.cta', 'Start Matching - FREE')}
                    <ArrowRightIcon className="w-6 h-6 ml-3" />
                  </a>
                  
                  <p className="text-sm text-gray-600 mt-4">
                    {t('matching.guarantee', 'Free to join • No credit card • 750+ Portuguese speakers waiting')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* EVENTS & COMMUNITY SECTION - Connected Experience */}
          <section className="py-20 bg-gradient-to-br from-secondary-50 to-accent-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                    {t('events.title', 'Meet Your Matches at Portuguese Events')}
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    {t('events.subtitle', 'Join cultural events, festivals, and meetups where Portuguese speakers connect naturally.')}
                  </p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                  {/* Left - Event Types */}
                  <div>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-lg">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold">
                          🎵
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">Fado Nights</h3>
                          <p className="text-gray-600 text-sm">Authentic Portuguese music evenings in London pubs</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-lg">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                          🍷
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">Wine Tastings</h3>
                          <p className="text-gray-600 text-sm">Portuguese wine discovery with fellow lusófonos</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-lg">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold">
                          ⚽
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">Football Screenings</h3>
                          <p className="text-gray-600 text-sm">Watch Portugal & Brazil games with passionate fans</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-lg">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold">
                          🎭
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">Cultural Festivals</h3>
                          <p className="text-gray-600 text-sm">Santos Populares, Festa Junina, and more</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <a
                        href={ROUTES.events}
                        className="inline-flex items-center justify-center px-8 py-4 bg-secondary-600 text-white font-bold rounded-2xl hover:bg-secondary-700 transition-colors duration-300"
                      >
                        <CalendarDaysIcon className="w-5 h-5 mr-2" />
                        {t('events.cta', 'Browse All Events')}
                        <ArrowRightIcon className="w-5 h-5 ml-2" />
                      </a>
                    </div>
                  </div>
                  
                  {/* Right - Success Story */}
                  <div className="bg-white rounded-3xl p-8 shadow-2xl">
                    <div className="text-center mb-6">
                      <div className="flex justify-center -space-x-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-red-500 border-4 border-white flex items-center justify-center text-white font-bold text-lg">J</div>
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-white flex items-center justify-center text-white font-bold text-lg">A</div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">João & Ana</h3>
                      <p className="text-gray-600 mb-4">Met at Fado Night • Now Dating 💕</p>
                    </div>
                    
                    <blockquote className="text-gray-700 italic text-center mb-6">
                      "Conhecemo-nos numa noite de fado no Camden. A música portuguesa criou uma conexão instantânea. Agora exploramos o Reino Unido juntos todos os fins de semana!"
                    </blockquote>
                    
                    <div className="bg-green-50 rounded-2xl p-4 text-center">
                      <div className="text-sm font-medium text-green-800 mb-1">
                        ⭐⭐⭐⭐⭐ "Perfect Match"
                      </div>
                      <div className="text-xs text-green-600">
                        🇵🇹 Both from Porto • Love for Fado • Now inseparable
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <TestimonialsNew />
          {/* FINAL FREE SIGNUP CTA - Cohesive ending */}
          <section className="py-20 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-bold mb-8">
                  <CheckIcon className="w-4 h-4" />
                  {t('final_cta.badge', 'JOIN 750+ PORTUGUESE SPEAKERS')}
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6">
                  {t('final_cta.title', 'Ready to Find Your Portuguese Match?')}
                </h2>
                
                <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                  {t('final_cta.subtitle', 'Join free today and start connecting with Portuguese speakers across the United Kingdom. No credit card required.')}
                </p>
                
                {/* Trust indicators */}
                <div className="flex flex-wrap justify-center gap-8 mb-12 text-white/80">
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-green-300" />
                    <span className="font-semibold">100% Free to Join</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UsersIcon className="w-5 h-5" />
                    <span className="font-semibold">750+ Active Members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HeartIcon className="w-5 h-5 text-red-300" />
                    <span className="font-semibold">Daily New Matches</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5" />
                    <span className="font-semibold">Across United Kingdom</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <a
                    href={ROUTES.signup}
                    className="group inline-flex items-center justify-center px-12 py-6 bg-white text-primary-700 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-2 hover:scale-105"
                  >
                    <span className="mr-3">🇵🇹</span>
                    {t('final_cta.primary', 'JOIN FREE NOW')}
                    <ArrowRightIcon className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </a>
                  
                  <a
                    href={ROUTES.login}
                    className="inline-flex items-center justify-center px-8 py-6 border-2 border-white/30 text-white text-lg font-semibold rounded-2xl hover:border-white hover:bg-white/10 transition-all duration-300"
                  >
                    {t('final_cta.secondary', 'Try Demo Account')}
                  </a>
                </div>
                
                <p className="text-sm text-white/70 mt-8">
                  {t('final_cta.guarantee', 'No spam, no credit card required. Cancel anytime. Join the United Kingdom\'s largest Portuguese-speaking community.')}
                </p>
              </div>
            </div>
          </section>

          <EventsShowcase />
          <SuccessStories />
          <Footer />
        </div>
        
        {/* Mobile Floating CTA - Prominent matching action */}
        <div className="md:hidden fixed bottom-20 right-4 z-40">
          <a
            href={ROUTES.signup}
            className="group w-18 h-18 bg-gradient-to-br from-green-600 via-yellow-500 to-red-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center active:scale-95 animate-pulse"
            aria-label="Join Portuguese community - FREE"
          >
            <div className="flex flex-col items-center">
              <HeartIcon className="w-6 h-6 group-hover:scale-110 transition-transform mb-1" />
              <span className="text-xs font-bold leading-tight">JOIN<br />FREE</span>
            </div>
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <span className="text-xs font-bold text-white">🇵🇹</span>
            </div>
          </a>
          
          {/* Enhanced Tooltip */}
          <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            🇵🇹 Join 750+ Portuguese speakers - FREE!
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-0 h-0 border-l-[8px] border-l-gray-900 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"></div>
          </div>
        </div>
        
        
        {/* Mobile Welcome Wizard */}
        <MobileWelcomeWizard
          isOpen={showWelcomeWizard}
          onClose={() => setShowWelcomeWizard(false)}
          onComplete={handleWelcomeComplete}
        />
      </main>
    </>
  )
}