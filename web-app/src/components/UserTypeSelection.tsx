'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HeartIcon, 
  CalendarDaysIcon, 
  MapPinIcon, 
  XMarkIcon,
  StarIcon,
  UserGroupIcon,
  SparklesIcon,
  ArrowRightIcon,
  CurrencyPoundIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { 
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon 
} from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config/routes'

export default function UserTypeSelection() {
  const [showModal, setShowModal] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [selectedRole, setSelectedRole] = useState<'user' | 'curator' | null>(null)
  const { language } = useLanguage()

  useEffect(() => {
    try {
  const hasSeen = localStorage.getItem('lusotown-onboarded-v3')
  const skipped = localStorage.getItem('lusotown-skipped-onboarding')
  if (!hasSeen && !skipped) setShowModal(true)
    } catch {}
  }, [])

  useEffect(() => {
    // Prevent body scroll when modal is open on mobile
    if (showModal) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [showModal])

  const closeAndRemember = () => {
    try { localStorage.setItem('lusotown-onboarded-v3', '1') } catch {}
    setDismissed(true)
    setShowModal(false)
  }

  const skipForNow = () => {
    try {
      // Treat skip as onboarded to prevent repeat popups
      localStorage.setItem('lusotown-skipped-onboarding', '1')
      localStorage.setItem('lusotown-onboarded-v3', '1')
    } catch {}
    setDismissed(true)
    setShowModal(false)
  }

  const go = (path: string, role?: 'user' | 'curator') => {
    // Save user role preference if provided
    if (role) {
      try { localStorage.setItem('lusotown-user-role', role) } catch {}
    }
    closeAndRemember()
    window.location.href = path
  }

  // For testing - add to window object
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).showUserTypeModal = () => {
        localStorage.removeItem('lusotown-onboarded-v3')
        setDismissed(false)
        setShowModal(true)
      }
    }
  }, [])

  const strings = {
    en: {
      title: 'Welcome to LusoTown',
      subtitle: "London's Portuguese community platform • 2,750+ verified members",
      skipForNow: 'Skip for now',
      roleQuestion: 'How would you like to participate?',
      userRole: 'Join as Member',
      curatorRole: 'Become a Curator',
      userRoleDesc: 'Discover events, make connections, enjoy experiences',
      curatorRoleDesc: 'Create events, build community, earn through hosting',
      options: [
        { 
          id: 'match',
          title: 'Meet Your Match', 
          subtitle: 'FREE',
          desc: 'Find Portuguese speakers who share your values, culture, and location. Perfect matches based on heritage, interests, and lifestyle.', 
          cta: 'Start Matching for Free', 
          href: '/matches', 
          icon: HeartIcon, 
          color: 'from-secondary-500 via-action-500 to-accent-500',
          badge: 'Free Forever',
          benefit: '2,750+ verified Portuguese speakers',
          stats: '94% success rate',
          pricing: 'Always Free',
          isFree: true
        },
        { 
          title: 'Events Discovery', 
          subtitle: 'From £5',
          desc: 'Authentic fado nights, Santos Populares, networking events, and cultural celebrations. Curated by Portuguese community leaders.', 
          cta: 'Browse Events', 
          href: ROUTES.events, 
          icon: CalendarDaysIcon, 
          color: 'from-primary-500 via-secondary-500 to-action-500',
          badge: 'Most Popular',
          benefit: '150+ monthly events',
          stats: 'Across 12 London boroughs',
          pricing: '£5-£45 per event',
          isFree: false
        },
        { 
          title: 'Premium Tours', 
          subtitle: 'From £49',
          desc: 'Exclusive Portuguese-led London experiences. Hidden gems, cultural tours, food walks, and business networking tours.', 
          cta: 'Explore Tours', 
          href: '/tours', 
          icon: MapPinIcon, 
          color: 'from-accent-500 via-coral-500 to-premium-500',
          badge: 'Premium Experience',
          benefit: 'Expert Portuguese guides',
          stats: 'Small groups (max 12)',
          pricing: '£49-£149 per tour',
          isFree: false
        }
      ],
    },
    pt: {
      title: 'Bem-vindo à LusoTown',
      subtitle: 'Plataforma da comunidade portuguesa em Londres • 2.750+ membros verificados',
      skipForNow: 'Pular por agora',
      roleQuestion: 'Como gostaria de participar?',
      userRole: 'Juntar como Membro',
      curatorRole: 'Tornar-se Curador',
      userRoleDesc: 'Descobrir eventos, fazer conexões, desfrutar experiências',
      curatorRoleDesc: 'Criar eventos, construir comunidade, ganhar através de hospedagem',
      options: [
        { 
          id: 'match',
          title: 'Encontra o Teu Match', 
          subtitle: 'GRÁTIS',
          desc: 'Encontra falantes de português que partilham os teus valores, cultura e localização. Matches perfeitos baseados em herança, interesses e estilo de vida.', 
          cta: 'Começar Matching Grátis', 
          href: '/matches', 
          icon: HeartIcon, 
          color: 'from-secondary-500 via-action-500 to-accent-500',
          badge: 'Grátis Para Sempre',
          benefit: '2.750+ falantes de português verificados',
          stats: '94% taxa de sucesso',
          pricing: 'Sempre Grátis',
          isFree: true
        },
        { 
          title: 'Descoberta de Eventos', 
          subtitle: 'A partir de £5',
          desc: 'Noites de fado autênticas, Santos Populares, eventos de networking e celebrações culturais. Curados por líderes da comunidade portuguesa.', 
          cta: 'Ver Eventos', 
          href: ROUTES.events, 
          icon: CalendarDaysIcon, 
          color: 'from-primary-500 via-secondary-500 to-action-500',
          badge: 'Mais Popular',
          benefit: '150+ eventos mensais',
          stats: 'Em 12 bairros de Londres',
          pricing: '£5-£45 por evento',
          isFree: false
        },
        { 
          title: 'Tours Premium', 
          subtitle: 'A partir de £49',
          desc: 'Experiências exclusivas de Londres lideradas por portugueses. Jóias escondidas, tours culturais, caminhadas gastronómicas e tours de networking empresarial.', 
          cta: 'Explorar Tours', 
          href: '/tours', 
          icon: MapPinIcon, 
          color: 'from-accent-500 via-coral-500 to-premium-500',
          badge: 'Experiência Premium',
          benefit: 'Guias portugueses especialistas',
          stats: 'Grupos pequenos (máx. 12)',
          pricing: '£49-£149 por tour',
          isFree: false
        }
      ],
    },
  } as const

  const t = strings[language as 'en' | 'pt'] || strings.en

  if (dismissed) return null

  return (
    <AnimatePresence>
    {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md"
      onClick={closeAndRemember}
        >
          {/* Mobile Layout */}
          <div className="md:hidden flex items-center justify-center min-h-full p-4">
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Header */}
              <div className="relative px-6 pt-8 pb-6 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
                <motion.div 
                  className="text-center"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <HeartSolidIcon className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{t.title}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">{t.subtitle}</p>
                </motion.div>
                <button
                  aria-label="Close"
                  onClick={closeAndRemember}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-200 shadow-lg"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Role Selection */}
              <div className="px-6 py-4 border-b bg-gray-50/50">
                <h3 className="text-sm font-semibold text-gray-800 mb-3 text-center">{t.roleQuestion}</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedRole('user')}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                      selectedRole === 'user' 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <UserGroupIcon className="h-6 w-6 mx-auto mb-1 text-primary-600" />
                    <div className="text-xs font-semibold text-gray-900">{t.userRole}</div>
                    <div className="text-xs text-gray-600 mt-1">{t.userRoleDesc}</div>
                  </button>
                  <button
                    onClick={() => setSelectedRole('curator')}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                      selectedRole === 'curator' 
                        ? 'border-accent-500 bg-accent-50' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <SparklesIcon className="h-6 w-6 mx-auto mb-1 text-accent-600" />
                    <div className="text-xs font-semibold text-gray-900">{t.curatorRole}</div>
                    <div className="text-xs text-gray-600 mt-1">{t.curatorRoleDesc}</div>
                  </button>
                </div>
              </div>

              {/* Mobile Options */}
              <div className="flex-1 p-4 overflow-hidden">
                <div className="space-y-3">
                  {t.options.map((option, index) => (
                    <motion.button
                      key={option.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                      onClick={() => go(option.href, selectedRole || 'user')}
                      className="group w-full text-left rounded-2xl border-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300 bg-white overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-300 active:scale-95"
                    >
                      <div className={`h-2 w-full bg-gradient-to-r ${option.color}`} />
                      <div className="p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                            <option.icon className="h-5 w-5 text-primary-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="text-sm font-bold text-gray-900">{option.title}</div>
                              {option.isFree && (
                                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                                  {option.subtitle}
                                </span>
                              )}
                              {!option.isFree && (
                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                                  {option.subtitle}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-primary-600 font-medium">{option.benefit}</div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 leading-relaxed mb-2 line-clamp-2">{option.desc}</div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500 font-medium">{option.stats}</div>
                          <div className="inline-flex items-center text-primary-700 text-xs font-semibold group-hover:gap-2 transition-all">
                            {option.cta}
                            <ArrowRightIcon className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Mobile Footer */}
              <div className="p-4 border-t bg-gray-50">
                <button
                  onClick={skipForNow}
                  className="w-full py-3 px-4 text-sm text-gray-600 hover:text-gray-800 text-center font-medium rounded-xl hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ClockIcon className="w-4 h-4" />
                  {t.skipForNow}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-center min-h-full p-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="bg-white max-w-4xl w-full rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Desktop Header */}
              <div className="relative px-8 pt-8 pb-6 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
                <motion.div 
                  className="text-center"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <HeartSolidIcon className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">{t.title}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">{t.subtitle}</p>
                </motion.div>
                <button
                  aria-label="Close"
                  onClick={closeAndRemember}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-200 shadow-lg"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              {/* Role Selection */}
              <div className="px-8 py-6 border-b bg-gray-50/50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">{t.roleQuestion}</h3>
                <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <button
                    onClick={() => setSelectedRole('user')}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      selectedRole === 'user' 
                        ? 'border-primary-500 bg-primary-50 shadow-lg' 
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <UserGroupIcon className="h-8 w-8 mx-auto mb-3 text-primary-600" />
                    <div className="text-base font-semibold text-gray-900 mb-2">{t.userRole}</div>
                    <div className="text-sm text-gray-600">{t.userRoleDesc}</div>
                  </button>
                  <button
                    onClick={() => setSelectedRole('curator')}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      selectedRole === 'curator' 
                        ? 'border-accent-500 bg-accent-50 shadow-lg' 
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <SparklesIcon className="h-8 w-8 mx-auto mb-3 text-accent-600" />
                    <div className="text-base font-semibold text-gray-900 mb-2">{t.curatorRole}</div>
                    <div className="text-sm text-gray-600">{t.curatorRoleDesc}</div>
                  </button>
                </div>
              </div>

              {/* Desktop Options */}
              <div className="flex-1 p-8 overflow-hidden">
                <div className="grid grid-cols-3 gap-4 h-full">
                  {t.options.map((option, index) => (
                    <motion.button
                      key={option.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5, type: "spring" }}
                      onClick={() => go(option.href, selectedRole || 'user')}
                      className="group text-left rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-300 hover:scale-105 hover:border-gray-300 h-full flex flex-col"
                    >
                      <div className={`h-3 w-full bg-gradient-to-r ${option.color}`} />
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <option.icon className="h-6 w-6 text-primary-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <div className="text-lg font-bold text-gray-900">{option.title}</div>
                              {option.isFree && (
                                <span className="bg-green-100 text-green-800 text-sm font-bold px-2 py-1 rounded-full">
                                  {option.subtitle}
                                </span>
                              )}
                              {!option.isFree && (
                                <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2 py-1 rounded-full">
                                  {option.subtitle}
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-primary-600 font-medium">{option.benefit}</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 leading-relaxed mb-3 flex-1">{option.desc}</div>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="text-sm text-gray-500 font-medium">{option.stats}</div>
                          <div className="inline-flex items-center text-primary-700 text-sm font-semibold group-hover:gap-2 transition-all">
                            {option.cta}
                            <ArrowRightIcon className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Desktop Footer */}
              <div className="p-6 border-t bg-gray-50 text-center">
                <button
                  onClick={skipForNow}
                  className="px-8 py-3 text-base text-gray-600 hover:text-gray-800 font-medium rounded-xl hover:bg-gray-100 transition-all duration-200 inline-flex items-center gap-2"
                >
                  <ClockIcon className="w-5 h-5" />
                  {t.skipForNow}
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}