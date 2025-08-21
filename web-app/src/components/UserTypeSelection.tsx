'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayCircleIcon, HeartIcon, WrenchScrewdriverIcon, CalendarDaysIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config/routes'

export default function UserTypeSelection() {
  const [showModal, setShowModal] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const { language } = useLanguage()

  useEffect(() => {
    try {
      const hasSeen = localStorage.getItem('lusotown-onboarded-v2')
      if (!hasSeen) setShowModal(true)
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
    try { localStorage.setItem('lusotown-onboarded-v2', '1') } catch {}
    setDismissed(true)
    setShowModal(false)
  }

  const go = (path: string) => {
    closeAndRemember()
    window.location.href = path
  }

  // For testing - add to window object
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).showUserTypeModal = () => {
        localStorage.removeItem('lusotown-onboarded-v2')
        setDismissed(false)
        setShowModal(true)
      }
    }
  }, [])

  const strings = {
    en: {
      title: 'Welcome to LusoTown',
      subtitle: "London's Portuguese community platform • 750+ members across UK",
      skip: 'Skip for now',
      cards: [
        { 
          title: 'Meet Your Match', 
          desc: 'Find love, friendships & business connections with Portuguese speakers who share your values, culture, and location in London', 
          cta: 'Start Matching', 
          href: '/matches', 
          icon: HeartIcon, 
          color: 'from-secondary-600 via-action-600 to-accent-600',
          benefit: '2,750+ verified Portuguese speakers',
          stats: '94% cultural compatibility'
        },
        { 
          title: 'Portuguese Events', 
          desc: 'Discover authentic fado nights, Santos Populares, football screenings, business networking & cultural celebrations across London', 
          cta: 'Browse Events', 
          href: ROUTES.events, 
          icon: CalendarDaysIcon, 
          color: 'from-primary-600 via-secondary-600 to-action-600',
          benefit: '150+ monthly events',
          stats: 'Hosted by Portuguese speakers'
        },
        { 
          title: 'LusoTown TV', 
          desc: 'Watch live Portuguese cultural content, business workshops, fado performances & community discussions - exclusive to UK Portuguese speakers', 
          cta: 'Watch Now', 
          href: '/live', 
          icon: PlayCircleIcon, 
          color: 'from-accent-600 via-action-600 to-secondary-600',
          benefit: '24/7 Portuguese content',
          stats: 'Live chat with community'
        },
        { 
          title: 'Community Features', 
          desc: 'Access Portuguese-led London tours, student support (8 university partnerships), housing assistance & business directory', 
          cta: 'Discover More', 
          href: '/community', 
          icon: WrenchScrewdriverIcon, 
          color: 'from-premium-600 via-secondary-600 to-action-600',
          benefit: 'Comprehensive support system',
          stats: '8 UK university partnerships'
        },
      ],
    },
    pt: {
      title: 'Bem-vindo à LusoTown',
      subtitle: 'Plataforma da comunidade portuguesa em Londres • 750+ membros no Reino Unido',
      skip: 'Pular por agora',
      cards: [
        { 
          title: 'Encontra o Teu Match', 
          desc: 'Encontra amor, amizades e conexões de negócio com falantes de português que partilham os teus valores, cultura e localização em Londres', 
          cta: 'Começar Matching', 
          href: '/matches', 
          icon: HeartIcon, 
          color: 'from-secondary-600 via-action-600 to-accent-600',
          benefit: '2.750+ falantes de português verificados',
          stats: '94% compatibilidade cultural'
        },
        { 
          title: 'Eventos Portugueses', 
          desc: 'Descobre noites de fado autênticas, Santos Populares, jogos de futebol, networking de negócios e celebrações culturais por Londres', 
          cta: 'Ver Eventos', 
          href: ROUTES.events, 
          icon: CalendarDaysIcon, 
          color: 'from-primary-600 via-secondary-600 to-action-600',
          benefit: '150+ eventos mensais',
          stats: 'Apresentados por falantes de português'
        },
        { 
          title: 'LusoTown TV', 
          desc: 'Vê conteúdo cultural português ao vivo, workshops de negócios, apresentações de fado e discussões comunitárias - exclusivo para portugueses no Reino Unido', 
          cta: 'Ver Agora', 
          href: '/live', 
          icon: PlayCircleIcon, 
          color: 'from-accent-600 via-action-600 to-secondary-600',
          benefit: 'Conteúdo português 24/7',
          stats: 'Chat ao vivo com a comunidade'
        },
        { 
          title: 'Funcionalidades Comunitárias', 
          desc: 'Acede a tours de Londres liderados por portugueses, apoio estudantil (8 parcerias universitárias), assistência habitacional e diretório de negócios', 
          cta: 'Descobrir Mais', 
          href: '/community', 
          icon: WrenchScrewdriverIcon, 
          color: 'from-premium-600 via-secondary-600 to-action-600',
          benefit: 'Sistema de apoio abrangente',
          stats: '8 parcerias universitárias no Reino Unido'
        },
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
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          onClick={closeAndRemember}
        >
          {/* Mobile Layout */}
          <div className="sm:hidden flex items-center justify-center min-h-full p-4">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Header - Compact */}
              <div className="relative px-4 pt-6 pb-4 border-b bg-gradient-to-br from-primary-50 to-secondary-50">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <HeartIcon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">{t.title}</h2>
                  <p className="text-xs text-secondary-600 leading-tight">{t.subtitle}</p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeAndRemember}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                >
                  <XMarkIcon className="h-4 w-4 text-secondary-600" />
                </button>
              </div>

              {/* Mobile Cards - Compact 2x2 Grid */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="grid grid-cols-2 gap-3">
                  {t.cards.map((card, index) => (
                    <motion.button
                      key={card.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      onClick={() => go(card.href)}
                      className="group text-left rounded-xl border border-secondary-200 shadow-sm hover:shadow-lg transition-all bg-white overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-300 active:scale-95"
                    >
                      <div className={`h-1.5 w-full bg-gradient-to-r ${card.color}`} />
                      <div className="p-3">
                        <div className="flex flex-col items-center text-center mb-2">
                          <div className="w-10 h-10 rounded-xl bg-secondary-50 flex items-center justify-center mb-2">
                            <card.icon className="h-5 w-5 text-primary-600" />
                          </div>
                          <div className="text-sm font-bold text-gray-900">{card.title}</div>
                        </div>
                        <div className="text-xs text-secondary-600 leading-snug mb-2 line-clamp-3">{card.desc}</div>
                        <div className="text-xs text-primary-700 font-semibold group-hover:underline text-center">
                          {card.cta}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Mobile Footer - Compact Skip Button */}
              <div className="p-4 border-t bg-secondary-50">
                <button
                  onClick={closeAndRemember}
                  className="w-full py-2 px-4 text-sm text-secondary-600 hover:text-secondary-800 text-center font-medium rounded-lg hover:bg-secondary-100 transition-colors"
                >
                  {t.skip}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center justify-center min-h-full p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              className="bg-white max-w-3xl w-full rounded-2xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Desktop Header - Compact */}
              <div className="relative px-6 pt-6 pb-4 border-b bg-gradient-to-br from-primary-50 via-white to-secondary-50">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HeartIcon className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h2>
                  <p className="text-sm text-secondary-600">{t.subtitle}</p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeAndRemember}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary-100 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5 text-secondary-600" />
                </button>
              </div>

              {/* Desktop Cards - Compact 2x2 Grid */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  {t.cards.map((card, index) => (
                    <motion.button
                      key={card.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      onClick={() => go(card.href)}
                      className="group text-left rounded-xl border border-secondary-200 shadow-sm hover:shadow-lg transition-all bg-white overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <div className={`h-1.5 w-full bg-gradient-to-r ${card.color}`} />
                      <div className="p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 rounded-xl bg-secondary-50 flex items-center justify-center flex-shrink-0">
                            <card.icon className="h-6 w-6 text-primary-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-lg font-bold text-gray-900 mb-1">{card.title}</div>
                            <div className="text-xs text-primary-600 font-medium">{card.benefit}</div>
                          </div>
                        </div>
                        <div className="text-sm text-secondary-600 leading-relaxed mb-3 line-clamp-3">{card.desc}</div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500 font-medium">{card.stats}</div>
                          <div className="inline-flex items-center text-primary-700 text-sm font-semibold group-hover:underline">
                            {card.cta}
                            <svg className="ml-1 w-4 h-4 transition-transform group-hover:transecondary-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Desktop Footer - Compact Skip Button */}
              <div className="p-4 border-t bg-secondary-50 text-center">
                <button
                  onClick={closeAndRemember}
                  className="px-6 py-2 text-sm text-secondary-600 hover:text-secondary-800 font-medium rounded-lg hover:bg-secondary-100 transition-colors"
                >
                  {t.skip}
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}