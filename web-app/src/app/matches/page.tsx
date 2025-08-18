'use client'

import { Suspense, useState, useEffect } from 'react'
import { HeartIcon, UserGroupIcon, CalendarIcon, ChatBubbleLeftRightIcon, SparklesIcon, CheckCircleIcon, XMarkIcon, MapPinIcon, AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { plans, formatPrice } from '@/config/pricing'

// Mock Portuguese profiles for demonstration
const mockProfiles = [
  {
    id: 1,
    name: "Ana Sofia",
    age: 28,
    location: "Stockwell",
    profession: "Marketing Manager",
    origin: "Porto, Portugal",
    interests: ["Fado", "Portuguese Cuisine", "Professional Networking", "Arts & Crafts"],
    bio: "Portuguese marketing professional looking to connect with fellow lusófonos in London. Love fado nights and traditional cooking!",
    image: "/images/profiles/ana-sofia.jpg",
    compatibility: 94
  },
  {
    id: 2,
    name: "Miguel Santos",
    age: 32,
    location: "Vauxhall",
    profession: "Software Engineer",
    origin: "Lisboa, Portugal",
    interests: ["Professional Networking", "Football", "Language Exchange", "Tech Meetups"],
    bio: "Tech enthusiast from Lisbon. Always up for watching Benfica games and meeting other Portuguese professionals in tech.",
    image: "/images/profiles/miguel-santos.jpg",
    compatibility: 89
  },
  {
    id: 3,
    name: "Beatriz Oliveira",
    age: 26,
    location: "Camden",
    profession: "Medical Student",
    origin: "Braga, Portugal",
    interests: ["Dancing", "Cultural Events", "Young Professionals", "Education"],
    bio: "Medical student from Braga. Love traditional Portuguese dancing and meeting other young professionals.",
    image: "/images/profiles/beatriz-oliveira.jpg",
    compatibility: 91
  },
  {
    id: 4,
    name: "João Ferreira",
    age: 35,
    location: "Bermondsey", 
    profession: "Chef",
    origin: "Aveiro, Portugal",
    interests: ["Portuguese Cuisine", "Cultural Events", "Business Networking", "Sports"],
    bio: "Chef specializing in traditional Portuguese cuisine. Looking to connect with food lovers and fellow entrepreneurs.",
    image: "/images/profiles/joao-ferreira.jpg",
    compatibility: 87
  },
  {
    id: 5,
    name: "Carolina Lima",
    age: 29,
    location: "Kensington",
    profession: "Financial Analyst",
    origin: "São Paulo, Brasil",
    interests: ["Professional Networking", "Language Exchange", "Arts & Crafts", "Dance"],
    bio: "Brazilian financial analyst living in London. Love connecting with Portuguese speakers and exploring the city.",
    image: "/images/profiles/carolina-lima.jpg",
    compatibility: 92
  },
  {
    id: 6,
    name: "Ricardo Costa",
    age: 31,
    location: "Elephant & Castle",
    profession: "Architect",
    origin: "Coimbra, Portugal",
    interests: ["Cultural Events", "Professional Networking", "Football", "Architecture"],
    bio: "Architect from Coimbra passionate about Portuguese culture and design. Always ready for a good conversation over coffee.",
    image: "/images/profiles/ricardo-costa.jpg",
    compatibility: 88
  }
]

type Profile = typeof mockProfiles[number]

function MatchesContent() {
  const { t } = useLanguage()
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0)
  const [profiles, setProfiles] = useState(mockProfiles)
  const [isLiking, setIsLiking] = useState(false)
  const [isSkipping, setIsSkipping] = useState(false)
  const [showMatchModal, setShowMatchModal] = useState(false)
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null)

  const currentProfile = profiles[currentProfileIndex]

  const handleLike = () => {
    if (isLiking || isSkipping) return
    setIsLiking(true)
    
    // Simulate match probability (30% chance for demo)
    const isMatch = Math.random() > 0.7
    
    setTimeout(() => {
      if (isMatch && currentProfile) {
        setMatchedProfile(currentProfile)
        setShowMatchModal(true)
      }
      nextProfile()
      setIsLiking(false)
    }, 600)
  }

  const handleSkip = () => {
    if (isLiking || isSkipping) return
    setIsSkipping(true)
    
    setTimeout(() => {
      nextProfile()
      setIsSkipping(false)
    }, 400)
  }

  const nextProfile = () => {
    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1)
    } else {
      // Reset to beginning or show "no more profiles" message
      setCurrentProfileIndex(0)
    }
  }

  const getOriginFlag = (origin: string) => {
    if (origin.includes('Portugal') || origin.includes('Porto') || origin.includes('Lisboa') || origin.includes('Braga') || origin.includes('Aveiro') || origin.includes('Coimbra')) return '🇵🇹'
    if (origin.includes('Brasil') || origin.includes('São Paulo') || origin.includes('Rio')) return '🇧🇷'
    if (origin.includes('Angola')) return '🇦🇴'
    if (origin.includes('Mozambique')) return '🇲🇿'
    if (origin.includes('Cabo Verde')) return '🇨🇻'
    return '🌍'
  }

  const steps = [
    {
      icon: UserGroupIcon,
      title: "Complete Your Profile",
      description: "Share your interests, location in London, and what you're looking for in the Portuguese community",
      titlePt: "Complete o Seu Perfil",
      descriptionPt: "Partilhe os seus interesses, localização em Londres e o que procura na comunidade portuguesa"
    },
    {
      icon: SparklesIcon,
      title: "Smart Matching",
      description: "Our algorithm connects you with Portuguese speakers based on compatibility, interests, and proximity",
      titlePt: "Correspondência Inteligente",
      descriptionPt: "O nosso algoritmo conecta-o com falantes de português baseado em compatibilidade, interesses e proximidade"
    },
    {
      icon: CalendarIcon,
      title: "Attend Events Together",
      description: "Meet your matches at Portuguese cultural events, networking meetups, and social gatherings",
      titlePt: "Participem em Eventos Juntos",
      descriptionPt: "Conheça as suas correspondências em eventos culturais portugueses, encontros de networking e reuniões sociais"
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Build Connections",
      description: "Start conversations in Portuguese or English and build lasting friendships or professional relationships",
      titlePt: "Construa Conexões",
      descriptionPt: "Inicie conversas em português ou inglês e construa amizades duradouras ou relacionamentos profissionais"
    }
  ]

  const benefits = [
    "All matches are Portuguese speakers in London & UK",
    "Cultural compatibility scoring",
    "Event-based meetups for natural connections",
    "Professional and social networking opportunities",
    "Safe and verified community members"
  ]

  const benefitsPt = [
    "Todas as correspondências são falantes de português em Londres e Reino Unido",
    "Pontuação de compatibilidade cultural",
    "Encontros baseados em eventos para conexões naturais",
    "Oportunidades de networking profissional e social",
    "Membros da comunidade seguros e verificados"
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Enhanced Hero Section */}
      <div className="relative min-h-[70vh] bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 overflow-hidden">
        {/* Portuguese flag inspired decorative elements */}
        <div className="absolute top-12 left-12 w-32 h-32 bg-gradient-to-br from-secondary-400/20 to-secondary-500/30 rounded-full animate-pulse" />
        <div className="absolute bottom-16 right-16 w-24 h-24 bg-gradient-to-br from-action-400/20 to-action-500/30 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-accent-400/20 to-accent-500/30 rounded-full animate-pulse delay-500" />
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-primary-900/10" />
        
        <div className="relative z-10 flex items-center justify-center min-h-[70vh] px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Hero Content */}
            <div className="mb-8">
              <HeartIcon className="w-16 h-16 text-white/90 mx-auto mb-6 animate-pulse" />
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {t('findYourMatch') || 'Find Your Match'}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                {t('connectWithPortugueseSpeakers') || 'Connect with Portuguese speakers in London who share your interests, values, and cultural background'}
              </p>
              
              {/* Cultural Quote */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
                <blockquote className="text-lg md:text-xl text-white/95 italic">
                  "{t('culturalQuote') || 'Unidos pela língua, conectados pelo coração'}"
                </blockquote>
                <cite className="text-white/80 text-sm block mt-2">
                  {t('culturalQuoteAuthor') || 'Portuguese Community in London'}
                </cite>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                {t('startMatchingFree') || 'Start Free Matching'}
              </button>
              <button className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                {t('upgradeToPremium') || 'Upgrade from £15/month'}
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">750+</div>
                <div className="text-white/80 text-sm">{t('members') || 'Portuguese Speakers'}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">200+</div>
                <div className="text-white/80 text-sm">{t('successfulMatches') || 'Successful Matches'}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">50+</div>
                <div className="text-white/80 text-sm">{t('monthlyEvents') || 'Monthly Events'}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">95%</div>
                <div className="text-white/80 text-sm">{t('satisfaction') || 'Satisfaction Rate'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Matching Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
              {t('discoverYourMatches') || 'Discover Your Matches'}
            </h2>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto">
              {t('swipeToConnect') || 'Swipe through Portuguese speakers in London who share your interests and cultural background'}
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {/* Profile Card Stack */}
            <div className="relative h-[600px] mb-8">
              <AnimatePresence mode="wait">
                {currentProfile && (
                  <motion.div
                    key={currentProfile.id}
                    initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1, 
                      rotateY: 0,
                      x: isLiking ? 100 : isSkipping ? -100 : 0,
                      rotate: isLiking ? 10 : isSkipping ? -10 : 0
                    }}
                    exit={{ 
                      scale: 0.8, 
                      opacity: 0,
                      x: isLiking ? 200 : isSkipping ? -200 : 0,
                      rotate: isLiking ? 20 : isSkipping ? -20 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden border border-primary-100"
                  >
                    {/* Profile Image */}
                    <div className="relative h-72 bg-gradient-to-br from-primary-200 to-secondary-200">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl text-primary-400">👤</div>
                      </div>
                      
                      {/* Compatibility Badge */}
                      <div className="absolute top-4 right-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        {currentProfile.compatibility}% Match
                      </div>
                      
                      {/* Origin Flag */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        {getOriginFlag(currentProfile.origin)} {currentProfile.origin}
                      </div>
                    </div>

                    {/* Profile Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-primary-900 mb-1">
                            {currentProfile.name}, {currentProfile.age}
                          </h3>
                          <div className="flex items-center gap-2 text-primary-600 mb-2">
                            <BriefcaseIcon className="w-4 h-4" />
                            <span className="text-sm">{currentProfile.profession}</span>
                          </div>
                          <div className="flex items-center gap-2 text-primary-600">
                            <MapPinIcon className="w-4 h-4" />
                            <span className="text-sm">{currentProfile.location}, London</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-primary-700 text-sm mb-4 leading-relaxed">
                        {currentProfile.bio}
                      </p>

                      {/* Interests */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-primary-800 mb-2">Interests:</h4>
                        <div className="flex flex-wrap gap-2">
                          {currentProfile.interests.slice(0, 4).map((interest, index) => (
                            <span
                              key={index}
                              className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Portuguese Community Connection */}
                      <div className="bg-gradient-to-r from-secondary-50 to-accent-50 p-4 rounded-xl border border-secondary-200">
                        <div className="flex items-center gap-2 text-secondary-700 text-sm">
                          <SparklesIcon className="w-4 h-4" />
                          <span className="font-medium">
                            {t('sharedCulturalBackground') || 'Shared Portuguese cultural background'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Background Cards for Stack Effect */}
              <div className="absolute inset-0 bg-white rounded-3xl shadow-lg transform translate-y-2 translate-x-1 border border-primary-50 -z-10"></div>
              <div className="absolute inset-0 bg-white rounded-3xl shadow-md transform translate-y-4 translate-x-2 border border-primary-50 -z-20"></div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-6">
              <button
                onClick={handleSkip}
                disabled={isLiking || isSkipping || !currentProfile}
                className="w-16 h-16 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <XMarkIcon className="w-8 h-8 text-gray-500" />
              </button>
              
              <button
                onClick={handleLike}
                disabled={isLiking || isSkipping || !currentProfile}
                className="w-16 h-16 bg-gradient-to-r from-action-500 to-action-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <HeartIconSolid className="w-8 h-8 text-white" />
              </button>
            </div>

            {/* Instructions */}
            <div className="text-center mt-6">
              <p className="text-primary-600 text-sm">
                {t('swipeInstructions') || 'Tap ❌ to skip • Tap ❤️ to like • Meet at Portuguese events!'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Match Modal */}
      <AnimatePresence>
        {showMatchModal && matchedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowMatchModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl font-bold text-primary-900 mb-2">It's a Match!</h3>
              <p className="text-primary-700 mb-6">
                You and {matchedProfile?.name} both liked each other! Start chatting and plan to meet at a Portuguese event.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowMatchModal(false)}
                  className="flex-1 bg-primary-100 text-primary-700 py-3 rounded-xl font-semibold hover:bg-primary-200 transition-colors"
                >
                  Keep Swiping
                </button>
                <button
                  onClick={() => setShowMatchModal(false)}
                  className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all"
                >
                  Send Message
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
              {t('howItWorks') || 'How It Works'}
            </h2>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto">
              {t('howItWorksDescription') || 'Our matching system is designed specifically for Portuguese speakers in London, focusing on cultural compatibility and shared experiences'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-primary-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-primary-600 mb-4">{index + 1}</div>
                  <h3 className="text-xl font-bold text-primary-900 mb-3">
                    {t('currentLang') === 'pt' ? step.titlePt : step.title}
                  </h3>
                  <p className="text-primary-700 leading-relaxed">
                    {t('currentLang') === 'pt' ? step.descriptionPt : step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-8">
                {t('whyChooseOurMatching') || 'Why Choose Our Matching System?'}
              </h2>
              <div className="space-y-4">
                {(t('currentLang') === 'pt' ? benefitsPt : benefits).map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircleIcon className="w-6 h-6 text-secondary-500 mt-1 flex-shrink-0" />
                    <p className="text-lg text-primary-800">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-3">
                <button className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto">
                  {t('startFreeMembership') || 'START FREE (3 matches/day)'}
                </button>
                <div className="text-center">
                  <span className="text-sm text-primary-600">
                    {t('upgradeAnytime') || `Upgrade anytime: Community Member ${formatPrice(plans.community.monthly)}/month • Cultural Ambassador ${formatPrice(plans.ambassador.monthly)}/month`}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-primary-200 shadow-lg">
              <div className="text-center">
                <HeartIcon className="w-16 h-16 text-action-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-primary-900 mb-4">
                  {t('joinCommunity') || 'Join Our Community'}
                </h3>
                <p className="text-primary-700 mb-6">
                  {t('joinCommunityDescription') || 'Connect with Portuguese speakers who understand your culture, language, and journey in London'}
                </p>
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-xl border border-primary-100">
                  <div className="text-3xl font-bold text-primary-600">750+</div>
                  <div className="text-sm text-primary-600">{t('activeMember') || 'Active Portuguese Speakers'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function MatchesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    }>
      <MatchesContent />
    </Suspense>
  )
}