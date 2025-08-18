'use client'

import { Suspense, useState, useEffect } from 'react'
import { 
  HeartIcon, 
  UserGroupIcon, 
  CalendarIcon, 
  ChatBubbleLeftRightIcon, 
  SparklesIcon, 
  CheckCircleIcon, 
  XMarkIcon, 
  MapPinIcon, 
  AcademicCapIcon, 
  BriefcaseIcon,
  FireIcon,
  ClockIcon,
  ChartBarIcon,
  StarIcon,
  ShieldCheckIcon,
  CrownIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { plans, formatPrice } from '@/config/pricing'
import PremiumMatchesGate from '@/components/PremiumMatchesGate'

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
  const { t, language } = useLanguage()
  const { hasActiveSubscription, createSubscription } = useSubscription()
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0)
  const [profiles, setProfiles] = useState(mockProfiles)
  const [isLiking, setIsLiking] = useState(false)
  const [isSkipping, setIsSkipping] = useState(false)
  const [showMatchModal, setShowMatchModal] = useState(false)
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null)
  const [dailyMatches, setDailyMatches] = useState(3) // Free tier daily matches
  const [dailyMatchesUsed, setDailyMatchesUsed] = useState(0)
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false)
  const [successStories, setSuccessStories] = useState(0)

  const currentProfile = profiles[currentProfileIndex]
  const remainingMatches = dailyMatches - dailyMatchesUsed
  const isFreeTier = !hasActiveSubscription

  // Initialize success stories count
  useEffect(() => {
    const interval = setInterval(() => {
      setSuccessStories(prev => (prev + 1) % 234) // Animate success counter
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleLike = () => {
    if (isLiking || isSkipping) return
    
    // Check if user has reached daily limit (free tier only)
    if (isFreeTier && dailyMatchesUsed >= dailyMatches) {
      setShowUpgradePrompt(true)
      return
    }
    
    setIsLiking(true)
    
    // Simulate match probability (35% chance for demo, higher for premium)
    const matchProbability = hasActiveSubscription ? 0.6 : 0.65
    const isMatch = Math.random() > matchProbability
    
    setTimeout(() => {
      if (isMatch && currentProfile) {
        setMatchedProfile(currentProfile)
        setShowMatchModal(true)
      }
      
      // Increment daily matches used for free tier
      if (isFreeTier) {
        setDailyMatchesUsed(prev => prev + 1)
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
    "Portuguese speakers from Brazil, Portugal, Africa & beyond",
    "Cultural understanding beyond language barriers",
    "Meet people who share your journey and heritage",
    "Professional and social connections with cultural depth",
    "Safe community of verified Portuguese speakers"
  ]

  const benefitsPt = [
    "Falantes de português do Brasil, Portugal, África e além",
    "Compreensão cultural além das barreiras linguísticas",
    "Conheça pessoas que partilham a sua jornada e herança",
    "Conexões profissionais e sociais com profundidade cultural",
    "Comunidade segura de falantes de português verificados"
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Enhanced Hero Section */}
      <div className="relative min-h-[70vh] xl:min-h-[85vh] 2xl:min-h-[90vh] bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 overflow-hidden">
        {/* Portuguese flag inspired decorative elements - Enhanced for desktop */}
        <div className="absolute top-12 left-12 w-32 h-32 xl:w-48 xl:h-48 2xl:w-56 2xl:h-56 xl:top-16 xl:left-16 2xl:top-20 2xl:left-20 bg-gradient-to-br from-secondary-400/20 to-secondary-500/30 rounded-full animate-pulse" />
        <div className="absolute bottom-16 right-16 w-24 h-24 xl:w-36 xl:h-36 2xl:w-44 2xl:h-44 xl:bottom-20 xl:right-20 2xl:bottom-24 2xl:right-24 bg-gradient-to-br from-action-400/20 to-action-500/30 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28 bg-gradient-to-br from-accent-400/20 to-accent-500/30 rounded-full animate-pulse delay-500" />
        
        {/* Additional desktop decorative elements */}
        <div className="hidden xl:block absolute top-1/2 left-8 w-20 h-20 2xl:w-24 2xl:h-24 bg-gradient-to-br from-primary-400/15 to-primary-500/25 rounded-full animate-pulse delay-2000" />
        <div className="hidden xl:block absolute bottom-1/3 left-1/3 w-12 h-12 2xl:w-16 2xl:h-16 bg-gradient-to-br from-accent-400/15 to-accent-500/25 rounded-full animate-pulse delay-3000" />
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-primary-900/10" />
        
        <div className="relative z-10 flex items-center justify-center min-h-[70vh] xl:min-h-[85vh] 2xl:min-h-[90vh] px-4 xl:px-8 2xl:px-12">
          <div className="text-center max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
            {/* Hero Content */}
            <div className="mb-6 sm:mb-8 xl:mb-12 2xl:mb-16">
              <div className="flex justify-center items-center gap-2 sm:gap-4 xl:gap-6 2xl:gap-8 mb-4 sm:mb-6 xl:mb-8 2xl:mb-10">
                <HeartIcon className="w-12 h-12 sm:w-16 sm:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 text-white/90 animate-pulse hover:scale-110 transition-transform duration-300" />
                <div className="text-2xl sm:text-4xl xl:text-5xl 2xl:text-6xl hover:scale-110 transition-transform duration-300">❤️</div>
                <HeartIcon className="w-12 h-12 sm:w-16 sm:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 text-white/90 animate-pulse hover:scale-110 transition-transform duration-300" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white mb-4 sm:mb-6 xl:mb-8 2xl:mb-10 leading-tight px-2 hover:scale-105 transition-transform duration-500">
                {language === 'pt' ? 'Encontre Conexões Significativas' : 'Find Meaningful Connections'}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white/90 mb-6 sm:mb-8 xl:mb-12 2xl:mb-16 leading-relaxed max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 xl:px-8">
                {language === 'pt' 
                  ? 'A única plataforma criada especificamente para falantes de português em Londres encontrarem conexões significativas com quem compreende a sua cultura, língua e jornada.' 
                  : 'The only app built specifically for Portuguese speakers in London to find meaningful connections who understand your culture, language, and journey.'}
              </p>
              
              {/* Live Success Counter */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl xl:rounded-3xl p-4 sm:p-6 xl:p-8 2xl:p-10 mb-6 sm:mb-8 xl:mb-12 2xl:mb-16 border border-white/20 mx-2 sm:mx-0 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-center gap-2 sm:gap-3 xl:gap-4 2xl:gap-6 mb-3 sm:mb-4 xl:mb-6 2xl:mb-8 flex-wrap">
                  <FireIcon className="w-5 h-5 sm:w-6 sm:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 text-orange-300 hover:scale-110 transition-transform duration-300" />
                  <span className="text-white font-semibold text-sm sm:text-lg xl:text-xl 2xl:text-2xl text-center">
                    {language === 'pt' ? 'Histórias de Sucesso em Tempo Real' : 'Live Success Stories'}
                  </span>
                  <FireIcon className="w-5 h-5 sm:w-6 sm:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 text-orange-300 hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-center">
                  <motion.div 
                    key={successStories}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className="text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white mb-2 xl:mb-4 2xl:mb-6 cursor-default"
                  >
                    {200 + successStories}+
                  </motion.div>
                  <p className="text-white/80 text-sm sm:text-base xl:text-lg 2xl:text-xl px-2 xl:px-4">
                    {language === 'pt' 
                      ? 'Português(as) conectaram-se através do LusoTown este mês' 
                      : 'Portuguese speakers connected through LusoTown this month'}
                  </p>
                </div>
              </div>
              
              {/* Cultural Quote */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl xl:rounded-3xl p-4 sm:p-6 xl:p-8 2xl:p-10 mb-6 sm:mb-8 xl:mb-12 2xl:mb-16 border border-white/20 mx-2 sm:mx-0 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <blockquote className="text-base sm:text-lg md:text-xl xl:text-2xl 2xl:text-3xl text-white/95 italic leading-relaxed">
                  "{language === 'pt' ? 'Finalmente alguém que percebe a saudade e ama pastéis de nata tanto quanto eu!' : 'Finally someone who understands saudade and loves pastéis de nata as much as I do!'}"
                </blockquote>
                <cite className="text-white/80 text-xs sm:text-sm xl:text-base 2xl:text-lg block mt-2 xl:mt-4 2xl:mt-6">
                  — {language === 'pt' ? 'Sofia, 29, Stockwell' : 'Sofia, 29, Stockwell'}
                </cite>
              </div>
            </div>

            {/* Usage Meter for Free Users */}
            {isFreeTier && (
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-white/20 mx-2 sm:mx-0">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <span className="text-white/90 text-xs sm:text-sm font-medium">
                    {language === 'pt' ? 'Matches Diários' : 'Daily Matches'}
                  </span>
                  <span className="text-white/90 text-xs sm:text-sm font-bold">
                    {remainingMatches}/{dailyMatches} {language === 'pt' ? 'restantes' : 'remaining'}
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(remainingMatches / dailyMatches) * 100}%` }}
                  />
                </div>
                <p className="text-white/70 text-xs mt-2">
                  {language === 'pt' ? 'Reinicia à meia-noite' : 'Resets at midnight'}
                </p>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row xl:flex-row gap-3 sm:gap-4 xl:gap-6 2xl:gap-8 justify-center px-4 xl:px-8">
              <button className="bg-white text-primary-600 px-6 py-3 sm:px-8 sm:py-4 xl:px-12 xl:py-6 2xl:px-16 2xl:py-8 rounded-xl xl:rounded-2xl font-semibold text-base sm:text-lg xl:text-xl 2xl:text-2xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 xl:hover:scale-110 shadow-lg xl:shadow-xl min-h-[48px] xl:min-h-[60px] 2xl:min-h-[72px] hover:shadow-2xl">
                {language === 'pt' ? 'Começar Grátis' : 'Start Free'}
              </button>
              <button 
                onClick={() => createSubscription('community')}
                className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-6 py-3 sm:px-8 sm:py-4 xl:px-12 xl:py-6 2xl:px-16 2xl:py-8 rounded-xl xl:rounded-2xl font-semibold text-base sm:text-lg xl:text-xl 2xl:text-2xl hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300 transform hover:scale-105 xl:hover:scale-110 shadow-lg xl:shadow-xl min-h-[48px] xl:min-h-[60px] 2xl:min-h-[72px] hover:shadow-2xl"
              >
                <span className="block sm:hidden">
                  {language === 'pt' ? `Premium ${formatPrice(plans.community.monthly)}` : `Premium ${formatPrice(plans.community.monthly)}`}
                </span>
                <span className="hidden sm:block xl:hidden">
                  {language === 'pt' 
                    ? `Premium por ${formatPrice(plans.community.monthly)}/mês` 
                    : `Premium from ${formatPrice(plans.community.monthly)}/month`}
                </span>
                <span className="hidden xl:block">
                  {language === 'pt' 
                    ? `Upgrade Premium - ${formatPrice(plans.community.monthly)}/mês` 
                    : `Upgrade to Premium - ${formatPrice(plans.community.monthly)}/month`}
                </span>
              </button>
            </div>

            {/* Enhanced Stats */}
            <div className="mt-8 sm:mt-12 xl:mt-16 2xl:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 xl:gap-8 2xl:gap-12 px-2 xl:px-8">
              <div className="text-center group hover:bg-white/10 rounded-2xl xl:rounded-3xl p-3 xl:p-6 2xl:p-8 transition-all duration-300 cursor-default">
                <motion.div 
                  className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-1 sm:mb-2 xl:mb-4 2xl:mb-6 group-hover:scale-110 transition-transform"
                  whileHover={{ scale: 1.1 }}
                >
                  750+
                </motion.div>
                <div className="text-white/80 text-xs sm:text-sm xl:text-base 2xl:text-lg leading-tight">
                  {language === 'pt' ? 'Falantes Português' : 'Portuguese Speakers'}
                </div>
                <div className="text-white/60 text-xs xl:text-sm 2xl:text-base mt-1 xl:mt-2 leading-tight">
                  {language === 'pt' ? 'Em Londres & Reino Unido' : 'In London & UK'}
                </div>
              </div>
              <div className="text-center group hover:bg-white/10 rounded-2xl xl:rounded-3xl p-3 xl:p-6 2xl:p-8 transition-all duration-300 cursor-default">
                <motion.div 
                  className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-1 sm:mb-2 xl:mb-4 2xl:mb-6 group-hover:scale-110 transition-transform"
                  whileHover={{ scale: 1.1 }}
                >
                  234+
                </motion.div>
                <div className="text-white/80 text-xs sm:text-sm xl:text-base 2xl:text-lg leading-tight">
                  {language === 'pt' ? 'Matches de Sucesso' : 'Success Stories'}
                </div>
                <div className="text-white/60 text-xs xl:text-sm 2xl:text-base mt-1 xl:mt-2 leading-tight">
                  {language === 'pt' ? 'Este mês' : 'This month'}
                </div>
              </div>
              <div className="text-center group hover:bg-white/10 rounded-2xl xl:rounded-3xl p-3 xl:p-6 2xl:p-8 transition-all duration-300 cursor-default">
                <motion.div 
                  className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-1 sm:mb-2 xl:mb-4 2xl:mb-6 group-hover:scale-110 transition-transform"
                  whileHover={{ scale: 1.1 }}
                >
                  60+
                </motion.div>
                <div className="text-white/80 text-xs sm:text-sm xl:text-base 2xl:text-lg leading-tight">
                  {language === 'pt' ? 'Eventos Mensais' : 'Monthly Events'}
                </div>
                <div className="text-white/60 text-xs xl:text-sm 2xl:text-base mt-1 xl:mt-2 leading-tight">
                  {language === 'pt' ? 'Para conhecer pessoalmente' : 'To meet in person'}
                </div>
              </div>
              <div className="text-center group hover:bg-white/10 rounded-2xl xl:rounded-3xl p-3 xl:p-6 2xl:p-8 transition-all duration-300 cursor-default">
                <motion.div 
                  className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-1 sm:mb-2 xl:mb-4 2xl:mb-6 group-hover:scale-110 transition-transform"
                  whileHover={{ scale: 1.1 }}
                >
                  97%
                </motion.div>
                <div className="text-white/80 text-xs sm:text-sm xl:text-base 2xl:text-lg leading-tight">
                  {language === 'pt' ? 'Taxa de Satisfação' : 'Satisfaction Rate'}
                </div>
                <div className="text-white/60 text-xs xl:text-sm 2xl:text-base mt-1 xl:mt-2 leading-tight">
                  {language === 'pt' ? 'Membros Premium' : 'Premium Members'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Matching Section */}
      <section className="py-20 xl:py-32 2xl:py-40 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
        <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto px-4 xl:px-8 2xl:px-12">
          <div className="text-center mb-12 xl:mb-20 2xl:mb-24">
            <h2 className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-primary-900 mb-6 xl:mb-10 2xl:mb-12 hover:scale-105 transition-transform duration-500">
              {language === 'pt' ? 'Descubra os Seus Matches' : 'Discover Your Matches'}
            </h2>
            <p className="text-xl xl:text-2xl 2xl:text-3xl text-primary-700 max-w-3xl xl:max-w-5xl 2xl:max-w-6xl mx-auto mb-6 xl:mb-10 2xl:mb-12 leading-relaxed">
              {language === 'pt' 
                ? 'Descubra falantes de português de todas as origens - Brasil, Portugal, África e comunidade lusófona - que vivem em Londres e compreendem a sua experiência única.' 
                : 'Discover Portuguese speakers from all backgrounds - Brazil, Portugal, Africa, and the broader lusophone community - living in London who understand your unique experience.'}
            </p>
            
            {/* Cultural Compatibility Highlight */}
            <div className="flex justify-center items-center gap-4 xl:gap-6 2xl:gap-8 flex-wrap">
              <div className="flex items-center gap-2 xl:gap-3 bg-primary-100 hover:bg-primary-200 px-4 py-2 xl:px-6 xl:py-3 2xl:px-8 2xl:py-4 rounded-full xl:rounded-2xl transition-all duration-300 hover:scale-105 cursor-default">
                <div className="w-3 h-3 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-primary-800 text-sm xl:text-base 2xl:text-lg font-medium">
                  {language === 'pt' ? 'Compatibilidade Cultural' : 'Cultural Compatibility'}
                </span>
              </div>
              <div className="flex items-center gap-2 xl:gap-3 bg-secondary-100 hover:bg-secondary-200 px-4 py-2 xl:px-6 xl:py-3 2xl:px-8 2xl:py-4 rounded-full xl:rounded-2xl transition-all duration-300 hover:scale-105 cursor-default">
                <ShieldCheckIcon className="w-4 h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 text-secondary-600" />
                <span className="text-secondary-800 text-sm xl:text-base 2xl:text-lg font-medium">
                  {language === 'pt' ? 'Perfis Verificados' : 'Verified Profiles'}
                </span>
              </div>
              <div className="flex items-center gap-2 xl:gap-3 bg-accent-100 hover:bg-accent-200 px-4 py-2 xl:px-6 xl:py-3 2xl:px-8 2xl:py-4 rounded-full xl:rounded-2xl transition-all duration-300 hover:scale-105 cursor-default">
                <MapPinIcon className="w-4 h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 text-accent-600" />
                <span className="text-accent-800 text-sm xl:text-base 2xl:text-lg font-medium">
                  {language === 'pt' ? 'Próximo de Si' : 'Near You'}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop: Side-by-side layout, Mobile: Single column */}
          <div className="xl:grid xl:grid-cols-5 xl:gap-12 2xl:gap-16 xl:items-center">
            {/* Profile Card Section */}
            <div className="xl:col-span-3 max-w-sm sm:max-w-md xl:max-w-lg 2xl:max-w-xl mx-auto xl:mx-0 px-4 xl:px-0">
              {/* Profile Card Stack */}
              <div className="relative h-[560px] sm:h-[600px] xl:h-[700px] 2xl:h-[800px] mb-6 sm:mb-8 xl:mb-0">
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
                    className="absolute inset-0 bg-white rounded-2xl sm:rounded-3xl xl:rounded-[2rem] 2xl:rounded-[2.5rem] shadow-2xl xl:shadow-3xl overflow-hidden border border-primary-100 hover:shadow-3xl xl:hover:shadow-4xl transition-shadow duration-300"
                  >
                    {/* Profile Image */}
                    <div className="relative h-64 sm:h-72 xl:h-80 2xl:h-96 bg-gradient-to-br from-primary-200 to-secondary-200">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-4xl sm:text-6xl xl:text-7xl 2xl:text-8xl text-primary-400">👤</div>
                      </div>
                      
                      {/* Compatibility Badge */}
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 xl:top-6 xl:right-6 2xl:top-8 2xl:right-8 bg-secondary-500 hover:bg-secondary-600 text-white px-2 py-1 sm:px-3 sm:py-1 xl:px-4 xl:py-2 2xl:px-5 2xl:py-3 rounded-full xl:rounded-2xl text-xs sm:text-sm xl:text-base 2xl:text-lg font-semibold shadow-lg xl:shadow-xl transition-all duration-300 hover:scale-105">
                        {currentProfile.compatibility}% Match
                      </div>
                      
                      {/* Origin Flag */}
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 xl:top-6 xl:left-6 2xl:top-8 2xl:left-8 bg-white/90 hover:bg-white backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1 xl:px-4 xl:py-2 2xl:px-5 2xl:py-3 rounded-full xl:rounded-2xl text-xs sm:text-sm xl:text-base 2xl:text-lg font-medium shadow-lg xl:shadow-xl max-w-[60%] transition-all duration-300 hover:scale-105">
                        <span className="block sm:hidden">
                          {getOriginFlag(currentProfile.origin)} {currentProfile.origin.split(',')[0]}
                        </span>
                        <span className="hidden sm:block">
                          {getOriginFlag(currentProfile.origin)} {currentProfile.origin}
                        </span>
                      </div>
                    </div>

                    {/* Profile Info */}
                    <div className="p-4 sm:p-6 xl:p-8 2xl:p-10">
                      <div className="flex items-start justify-between mb-3 sm:mb-4 xl:mb-6 2xl:mb-8">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-primary-900 mb-1 xl:mb-2 2xl:mb-3 truncate hover:scale-105 transition-transform duration-300">
                            {currentProfile.name}, {currentProfile.age}
                          </h3>
                          <div className="flex items-center gap-1 sm:gap-2 xl:gap-3 text-primary-600 mb-1 sm:mb-2 xl:mb-3">
                            <BriefcaseIcon className="w-3 h-3 sm:w-4 sm:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 flex-shrink-0" />
                            <span className="text-xs sm:text-sm xl:text-base 2xl:text-lg truncate">{currentProfile.profession}</span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2 xl:gap-3 text-primary-600">
                            <MapPinIcon className="w-3 h-3 sm:w-4 sm:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 flex-shrink-0" />
                            <span className="text-xs sm:text-sm xl:text-base 2xl:text-lg truncate">{currentProfile.location}, London</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-primary-700 text-xs sm:text-sm xl:text-base 2xl:text-lg mb-3 sm:mb-4 xl:mb-6 2xl:mb-8 leading-relaxed">
                        {currentProfile.bio}
                      </p>

                      {/* Interests */}
                      <div className="mb-3 sm:mb-4 xl:mb-6 2xl:mb-8">
                        <h4 className="text-xs sm:text-sm xl:text-base 2xl:text-lg font-semibold text-primary-800 mb-2 xl:mb-3 2xl:mb-4">Interests:</h4>
                        <div className="flex flex-wrap gap-1 sm:gap-2 xl:gap-3">
                          {currentProfile.interests.slice(0, 4).map((interest, index) => (
                            <span
                              key={index}
                              className="bg-primary-100 hover:bg-primary-200 text-primary-700 px-2 py-1 sm:px-3 sm:py-1 xl:px-4 xl:py-2 2xl:px-5 2xl:py-3 rounded-full xl:rounded-2xl text-xs xl:text-sm 2xl:text-base font-medium truncate transition-all duration-300 hover:scale-105 cursor-default"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Portuguese Community Connection */}
                      <div className="bg-gradient-to-r from-secondary-50 to-accent-50 hover:from-secondary-100 hover:to-accent-100 p-3 sm:p-4 xl:p-6 2xl:p-8 rounded-xl xl:rounded-2xl border border-secondary-200 hover:border-secondary-300 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                          <div className="flex items-center gap-1 sm:gap-2 text-secondary-700 text-xs sm:text-sm min-w-0">
                            <SparklesIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span className="font-medium truncate">
                              <span className="hidden sm:inline">
                                {language === 'pt' ? 'Património Cultural Partilhado' : 'Shared Cultural Heritage'}
                              </span>
                              <span className="sm:hidden">
                                {language === 'pt' ? 'Património Cultural' : 'Cultural Heritage'}
                              </span>
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <StarIconSolid key={i} className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs text-secondary-600">
                          <div className="flex items-center gap-1 truncate">
                            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                            <span className="truncate">
                              {language === 'pt' ? 'Língua Nativa' : 'Native Language'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 truncate">
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                            <span className="truncate">
                              {language === 'pt' ? 'Tradições' : 'Traditions'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 truncate">
                            <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                            <span className="truncate">
                              {language === 'pt' ? 'Valores' : 'Values'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 truncate">
                            <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                            <span className="truncate">
                              {language === 'pt' ? 'Experiências' : 'Experiences'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Background Cards for Stack Effect */}
              <div className="absolute inset-0 bg-white rounded-2xl sm:rounded-3xl xl:rounded-[2rem] 2xl:rounded-[2.5rem] shadow-lg xl:shadow-xl transform translate-y-2 translate-x-1 border border-primary-50 -z-10"></div>
              <div className="absolute inset-0 bg-white rounded-2xl sm:rounded-3xl xl:rounded-[2rem] 2xl:rounded-[2.5rem] shadow-md xl:shadow-lg transform translate-y-4 translate-x-2 border border-primary-50 -z-20"></div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 sm:gap-6 xl:gap-8 2xl:gap-10">
              <button
                onClick={handleSkip}
                disabled={isLiking || isSkipping || !currentProfile}
                className="w-14 h-14 sm:w-16 sm:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 bg-white border-2 border-gray-300 hover:border-gray-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl xl:hover:shadow-2xl transition-all duration-200 hover:scale-110 xl:hover:scale-125 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <XMarkIcon className="w-6 h-6 sm:w-8 sm:h-8 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 text-gray-500" />
              </button>
              
              <button
                onClick={handleLike}
                disabled={isLiking || isSkipping || !currentProfile}
                className="w-14 h-14 sm:w-16 sm:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 bg-gradient-to-r from-action-500 to-action-600 hover:from-action-600 hover:to-action-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl xl:hover:shadow-2xl transition-all duration-200 hover:scale-110 xl:hover:scale-125 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <HeartIconSolid className="w-6 h-6 sm:w-8 sm:h-8 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 text-white" />
              </button>
            </div>

            {/* Desktop Sidebar - Tips & Community Info */}
            <div className="hidden xl:block xl:col-span-2 xl:pl-8 2xl:pl-12">
              <div className="space-y-6 2xl:space-y-8">
                {/* Matching Tips */}
                <div className="bg-white rounded-2xl xl:rounded-3xl p-6 2xl:p-8 shadow-lg border border-primary-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-4 2xl:mb-6">
                    <div className="p-2 bg-primary-100 rounded-full">
                      <SparklesIcon className="w-5 h-5 2xl:w-6 2xl:h-6 text-primary-600" />
                    </div>
                    <h3 className="text-lg 2xl:text-xl font-bold text-primary-900">
                      {language === 'pt' ? 'Dicas de Match' : 'Matching Tips'}
                    </h3>
                  </div>
                  <div className="space-y-3 2xl:space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm 2xl:text-base text-primary-700 leading-relaxed">
                        {language === 'pt' 
                          ? 'Perfis com compatibilidade acima de 85% têm 3x mais probabilidade de match'
                          : 'Profiles with 85%+ compatibility have 3x higher match probability'}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm 2xl:text-base text-primary-700 leading-relaxed">
                        {language === 'pt' 
                          ? 'Membros que conhecem em eventos têm 95% taxa de sucesso'
                          : 'Members who meet at events have 95% success rate'}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm 2xl:text-base text-primary-700 leading-relaxed">
                        {language === 'pt' 
                          ? 'Conversas em português criam conexões mais profundas'
                          : 'Portuguese conversations create deeper connections'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Community Stats */}
                <div className="bg-gradient-to-br from-secondary-50 to-accent-50 rounded-2xl xl:rounded-3xl p-6 2xl:p-8 border border-secondary-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-4 2xl:mb-6">
                    <div className="p-2 bg-secondary-100 rounded-full">
                      <UserGroupIcon className="w-5 h-5 2xl:w-6 2xl:h-6 text-secondary-600" />
                    </div>
                    <h3 className="text-lg 2xl:text-xl font-bold text-secondary-900">
                      {language === 'pt' ? 'Comunidade' : 'Community'}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 2xl:gap-6">
                    <div className="text-center bg-white/50 rounded-xl p-3 2xl:p-4">
                      <div className="text-xl 2xl:text-2xl font-bold text-secondary-600 mb-1">750+</div>
                      <div className="text-xs 2xl:text-sm text-secondary-700 leading-tight">
                        {language === 'pt' ? 'Membros Ativos' : 'Active Members'}
                      </div>
                    </div>
                    <div className="text-center bg-white/50 rounded-xl p-3 2xl:p-4">
                      <div className="text-xl 2xl:text-2xl font-bold text-accent-600 mb-1">60+</div>
                      <div className="text-xs 2xl:text-sm text-accent-700 leading-tight">
                        {language === 'pt' ? 'Eventos/Mês' : 'Events/Month'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Success Stories Preview */}
                <div className="bg-white rounded-2xl xl:rounded-3xl p-6 2xl:p-8 shadow-lg border border-primary-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-4 2xl:mb-6">
                    <div className="p-2 bg-green-100 rounded-full">
                      <HeartIcon className="w-5 h-5 2xl:w-6 2xl:h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg 2xl:text-xl font-bold text-primary-900">
                      {language === 'pt' ? 'Histórias Recentes' : 'Recent Stories'}
                    </h3>
                  </div>
                  <div className="space-y-3 2xl:space-y-4">
                    <div className="bg-gray-50 rounded-xl p-3 2xl:p-4">
                      <p className="text-sm 2xl:text-base text-gray-700 italic mb-2">
                        "{language === 'pt' 
                          ? 'Conhecemo-nos no evento de fado e foi amor à primeira vista!'
                          : 'We met at the fado event and it was love at first sight!'}"
                      </p>
                      <cite className="text-xs 2xl:text-sm text-gray-500">
                        — {language === 'pt' ? 'Ana & Miguel' : 'Ana & Miguel'}
                      </cite>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Instructions & Encouragement */}
            <div className="text-center mt-4 sm:mt-6 xl:mt-8 2xl:mt-10 space-y-3 xl:space-y-4 px-4 xl:px-0">
              <p className="text-primary-600 text-xs sm:text-sm xl:text-base 2xl:text-lg font-medium leading-relaxed">
                <span className="xl:hidden">
                  {language === 'pt' 
                    ? 'Toque em ❌ para passar • Toque em ❤️ para gostar • Conheçam-se em eventos portugueses!' 
                    : 'Tap ❌ to skip • Tap ❤️ to like • Meet at Portuguese events!'}
                </span>
                <span className="hidden xl:block">
                  {language === 'pt' 
                    ? 'Clique em ❌ para passar • Clique em ❤️ para gostar • Conheçam-se pessoalmente em eventos portugueses!' 
                    : 'Click ❌ to skip • Click ❤️ to like • Meet in person at Portuguese events!'}
                </span>
              </p>
              
              {remainingMatches <= 1 && isFreeTier && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mx-2 sm:mx-0">
                  <p className="text-orange-800 text-xs sm:text-sm font-medium mb-2">
                    {language === 'pt' 
                      ? `⏰ Apenas ${remainingMatches} match${remainingMatches !== 1 ? 'es' : ''} restante${remainingMatches !== 1 ? 's' : ''}!` 
                      : `⏰ Only ${remainingMatches} match${remainingMatches !== 1 ? 'es' : ''} remaining!`}
                  </p>
                  <button 
                    onClick={() => setShowUpgradePrompt(true)}
                    className="bg-primary-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs font-semibold hover:bg-primary-700 transition-colors min-h-[40px]"
                  >
                    <span className="block sm:hidden">
                      {language === 'pt' 
                        ? `Ilimitados ${formatPrice(plans.community.monthly)}/mês` 
                        : `Unlimited ${formatPrice(plans.community.monthly)}/month`}
                    </span>
                    <span className="hidden sm:block">
                      {language === 'pt' 
                        ? `Matches ilimitados por ${formatPrice(plans.community.monthly)}/mês` 
                        : `Unlimited matches for ${formatPrice(plans.community.monthly)}/month`}
                    </span>
                  </button>
                </div>
              )}
              
              <div className="flex items-center justify-center gap-1 sm:gap-2 text-primary-500 text-xs flex-wrap">
                <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="text-center">
                  {language === 'pt' 
                    ? 'Tempo médio para encontrar um match: 2.3 dias' 
                    : 'Average time to find a match: 2.3 days'}
                </span>
              </div>
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
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-md w-full text-center shadow-2xl mx-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 animate-bounce">🎉</div>
              <h3 className="text-2xl sm:text-3xl font-bold text-primary-900 mb-2">
                {language === 'pt' ? 'É um Match!' : "It's a Match!"}
              </h3>
              <p className="text-primary-700 mb-4 text-sm sm:text-base leading-relaxed">
                {language === 'pt' 
                  ? `Você e ${matchedProfile?.name} gostaram um do outro! Iniciem uma conversa e planeiem encontrar-se num evento português.`
                  : `You and ${matchedProfile?.name} both liked each other! Start chatting and plan to meet at a Portuguese event.`}
              </p>
              
              {/* Match Quality Indicator */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-xl mb-4 sm:mb-6 border border-green-200">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <StarIconSolid className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  <span className="text-green-800 font-semibold text-xs sm:text-sm">
                    {matchedProfile?.compatibility}% {language === 'pt' ? 'Compatibilidade' : 'Compatibility'}
                  </span>
                </div>
                <p className="text-green-700 text-xs leading-relaxed">
                  {language === 'pt' 
                    ? 'Baseado em interesses culturais e localização' 
                    : 'Based on cultural interests and location'}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => setShowMatchModal(false)}
                  className="flex-1 bg-primary-100 text-primary-700 py-3 rounded-xl font-semibold hover:bg-primary-200 transition-colors min-h-[48px] text-sm sm:text-base"
                >
                  {language === 'pt' ? 'Continuar' : 'Keep Swiping'}
                </button>
                <button
                  onClick={() => setShowMatchModal(false)}
                  className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all min-h-[48px] text-sm sm:text-base"
                >
                  {language === 'pt' ? 'Enviar Mensagem' : 'Send Message'}
                </button>
              </div>
              
              {/* Conversion prompt for free users */}
              {isFreeTier && (
                <div className="mt-3 sm:mt-4 p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                  <p className="text-orange-800 text-xs sm:text-sm mb-2 leading-relaxed">
                    {language === 'pt' 
                      ? 'Parabéns! Membros Premium têm 3x mais matches como este.' 
                      : 'Congratulations! Premium members get 3x more matches like this.'}
                  </p>
                  <button
                    onClick={() => {
                      setShowMatchModal(false)
                      createSubscription('community')
                    }}
                    className="text-xs bg-primary-600 text-white px-3 py-2 rounded-full font-semibold hover:bg-primary-700 transition-colors min-h-[36px]"
                  >
                    {language === 'pt' 
                      ? `Upgrade ${formatPrice(plans.community.monthly)}/mês` 
                      : `Upgrade ${formatPrice(plans.community.monthly)}/month`}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* How It Works Section */}
      <section className="py-20 xl:py-32 2xl:py-40 bg-white">
        <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto px-4 xl:px-8 2xl:px-12">
          <div className="text-center mb-16 xl:mb-24 2xl:mb-32">
            <h2 className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-primary-900 mb-6 xl:mb-10 2xl:mb-12 hover:scale-105 transition-transform duration-500">
              {t('howItWorks') || 'How It Works'}
            </h2>
            <p className="text-xl xl:text-2xl 2xl:text-3xl text-primary-700 max-w-3xl xl:max-w-5xl 2xl:max-w-6xl mx-auto leading-relaxed">
              {t('howItWorksDescription') || 'Our matching system is designed specifically for Portuguese speakers in London, focusing on cultural compatibility and shared experiences'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12 2xl:gap-16">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white p-6 xl:p-8 2xl:p-10 rounded-2xl xl:rounded-3xl shadow-lg hover:shadow-xl xl:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 xl:hover:-translate-y-4 border border-primary-100 hover:border-primary-200">
                  <div className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 xl:mb-8 2xl:mb-10 group-hover:scale-110 xl:group-hover:scale-125 transition-transform duration-300">
                    <step.icon className="w-8 h-8 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 text-white" />
                  </div>
                  <div className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-primary-600 mb-4 xl:mb-6 2xl:mb-8">{index + 1}</div>
                  <h3 className="text-xl xl:text-2xl 2xl:text-3xl font-bold text-primary-900 mb-3 xl:mb-4 2xl:mb-6">
                    {t('currentLang') === 'pt' ? step.titlePt : step.title}
                  </h3>
                  <p className="text-primary-700 xl:text-lg 2xl:text-xl leading-relaxed">
                    {t('currentLang') === 'pt' ? step.descriptionPt : step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 xl:py-32 2xl:py-40 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
        <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto px-4 xl:px-8 2xl:px-12">
          <div className="grid lg:grid-cols-2 xl:grid-cols-5 gap-12 xl:gap-16 2xl:gap-20 items-center">
            <div className="xl:col-span-3">
              <h2 className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-primary-900 mb-8 xl:mb-12 2xl:mb-16 hover:scale-105 transition-transform duration-500">
                {t('whyChooseOurMatching') || 'Why Choose Our Matching System?'}
              </h2>
              <div className="space-y-4 xl:space-y-6 2xl:space-y-8">
                {(t('currentLang') === 'pt' ? benefitsPt : benefits).map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 xl:space-x-4 2xl:space-x-6 group hover:bg-white/50 rounded-xl xl:rounded-2xl p-3 xl:p-4 2xl:p-6 transition-all duration-300 hover:scale-105">
                    <CheckCircleIcon className="w-6 h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 text-secondary-500 group-hover:text-secondary-600 mt-1 flex-shrink-0 transition-colors duration-300" />
                    <p className="text-lg xl:text-xl 2xl:text-2xl text-primary-800 group-hover:text-primary-900 leading-relaxed transition-colors duration-300">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 sm:mt-8 xl:mt-12 2xl:mt-16 space-y-4 xl:space-y-6">
                <div className="bg-white p-4 sm:p-6 xl:p-8 2xl:p-10 rounded-2xl xl:rounded-3xl border border-primary-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <h4 className="text-base sm:text-lg xl:text-xl 2xl:text-2xl font-bold text-primary-900 mb-3 xl:mb-4 2xl:mb-6">
                    {language === 'pt' ? 'Planos de Subscrição' : 'Membership Plans'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 xl:gap-6 2xl:gap-8">
                    <div className="text-center p-3 sm:p-4 border border-gray-200 rounded-xl">
                      <div className="text-xl sm:text-2xl font-bold text-gray-600 mb-1">FREE</div>
                      <div className="text-xs sm:text-sm text-gray-500 mb-2">
                        {language === 'pt' ? '3 matches/dia' : '3 matches/day'}
                      </div>
                      <button className="w-full bg-gray-100 text-gray-600 py-2 rounded-lg text-xs sm:text-sm font-medium min-h-[40px]">
                        {language === 'pt' ? 'Começar Grátis' : 'Start Free'}
                      </button>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-300 rounded-xl">
                      <div className="text-xl sm:text-2xl font-bold text-primary-600 mb-1">
                        {formatPrice(plans.community.monthly)}
                      </div>
                      <div className="text-xs sm:text-sm text-primary-600 mb-2">
                        {language === 'pt' ? 'Matches ilimitados' : 'Unlimited matches'}
                      </div>
                      <button 
                        onClick={() => createSubscription('community')}
                        className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 rounded-lg text-xs sm:text-sm font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all min-h-[40px]"
                      >
                        {language === 'pt' ? 'Começar Premium' : 'Start Premium'}
                      </button>
                    </div>
                  </div>
                  <div className="text-center mt-3 sm:mt-4">
                    <p className="text-xs text-primary-600 leading-relaxed">
                      {language === 'pt' 
                        ? `Embaixador Cultural disponível por ${formatPrice(plans.ambassador.monthly)}/mês`
                        : `Cultural Ambassador available for ${formatPrice(plans.ambassador.monthly)}/month`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:col-span-2 bg-white p-8 xl:p-10 2xl:p-12 rounded-3xl xl:rounded-[2rem] 2xl:rounded-[2.5rem] border border-primary-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <HeartIcon className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 text-action-500 mx-auto mb-6 xl:mb-8 2xl:mb-10 hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-primary-900 mb-4 xl:mb-6 2xl:mb-8 hover:scale-105 transition-transform duration-300">
                  {t('joinCommunity') || 'Join Our Community'}
                </h3>
                <p className="text-primary-700 xl:text-lg 2xl:text-xl mb-6 xl:mb-8 2xl:mb-10 leading-relaxed">
                  {t('joinCommunityDescription') || 'Connect with Portuguese speakers who understand your culture, language, and journey in London'}
                </p>
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 hover:from-primary-100 hover:to-secondary-100 p-4 xl:p-6 2xl:p-8 rounded-xl xl:rounded-2xl border border-primary-100 hover:border-primary-200 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-primary-600 mb-2 xl:mb-3 2xl:mb-4">750+</div>
                  <div className="text-sm xl:text-base 2xl:text-lg text-primary-600">{t('activeMember') || 'Active Portuguese Speakers'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Upgrade Prompt Modal */}
      <AnimatePresence>
        {showUpgradePrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUpgradePrompt(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-md w-full text-center shadow-2xl mx-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-3xl sm:text-5xl mb-3 sm:mb-4">⚡</div>
              <h3 className="text-xl sm:text-2xl font-bold text-primary-900 mb-2">
                {language === 'pt' ? 'Limite de Matches Atingido' : 'Match Limit Reached'}
              </h3>
              <p className="text-primary-700 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                {language === 'pt' 
                  ? 'Usou os seus 3 matches diários gratuitos. Faça upgrade para matches ilimitados e continue a conectar-se com mais membros da comunidade portuguesa.'
                  : "You've used your 3 free daily matches. Upgrade to unlimited matches and continue connecting with more Portuguese community members."}
              </p>
              
              {/* Quick Benefits */}
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 text-left">
                <h4 className="font-semibold text-primary-900 mb-2 sm:mb-3 text-sm sm:text-base">
                  {language === 'pt' ? 'Com Premium obtém:' : 'With Premium you get:'}
                </h4>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                    <span className="leading-tight">{language === 'pt' ? 'Matches ilimitados diários' : 'Unlimited daily matches'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                    <span className="leading-tight">{language === 'pt' ? 'Mensagens ilimitadas' : 'Unlimited messaging'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                    <span className="leading-tight">{language === 'pt' ? 'Filtros de compatibilidade cultural' : 'Cultural compatibility filters'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                    <span className="leading-tight">{language === 'pt' ? 'Acesso a todos os eventos' : 'Access to all events'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setShowUpgradePrompt(false)
                    createSubscription('community')
                  }}
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-primary-700 hover:to-secondary-700 transition-all min-h-[48px]"
                >
                  {language === 'pt' 
                    ? `Upgrade por ${formatPrice(plans.community.monthly)}/mês` 
                    : `Upgrade for ${formatPrice(plans.community.monthly)}/month`}
                </button>
                <button
                  onClick={() => setShowUpgradePrompt(false)}
                  className="text-primary-600 hover:text-primary-800 font-medium text-sm min-h-[40px]"
                >
                  {language === 'pt' ? 'Talvez mais tarde' : 'Maybe later'}
                </button>
              </div>
              
              <div className="mt-3 sm:mt-4 text-xs text-gray-500 leading-relaxed">
                {language === 'pt' 
                  ? 'Pode cancelar a qualquer momento • Sem compromissos de longo prazo'
                  : 'Cancel anytime • No long-term commitments'}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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