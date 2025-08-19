'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayCircleIcon, HeartIcon, WrenchScrewdriverIcon, CalendarDaysIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

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
      subtitle: "Choose what you're here for",
      skip: 'Skip for now',
      cards: [
        { title: 'Meet Your Match', desc: 'Connect with Portuguese speakers', cta: 'Go to Matches', href: '/matches', icon: HeartIcon, color: 'from-secondary-600 via-action-600 to-accent-600' },
        { title: 'Events', desc: 'Explore Portuguese events in London', cta: 'Go to Events', href: '/events', icon: CalendarDaysIcon, color: 'from-primary-600 via-secondary-600 to-action-600' },
  { title: 'Streaming', desc: 'Watch live Portuguese content', cta: 'Go to Streaming', href: '/live', icon: PlayCircleIcon, color: 'from-accent-600 via-action-600 to-secondary-600' },
        { title: 'Tools', desc: 'Creator and business tools', cta: 'Go to Tools', href: '/tools', icon: WrenchScrewdriverIcon, color: 'from-premium-600 via-secondary-600 to-action-600' },
      ],
    },
    pt: {
      title: 'Bem-vindo à LusoTown',
      subtitle: 'O que procuras hoje?',
      skip: 'Saltar por agora',
      cards: [
        { title: 'Encontra o Teu Match', desc: 'Conecta com falantes de português', cta: 'Ir para Matches', href: '/matches', icon: HeartIcon, color: 'from-secondary-600 via-action-600 to-accent-600' },
        { title: 'Eventos', desc: 'Explora eventos portugueses em Londres', cta: 'Ir para Eventos', href: '/events', icon: CalendarDaysIcon, color: 'from-primary-600 via-secondary-600 to-action-600' },
  { title: 'Streaming', desc: 'Vê conteúdo português ao vivo', cta: 'Ir para Streaming', href: '/live', icon: PlayCircleIcon, color: 'from-accent-600 via-action-600 to-secondary-600' },
        { title: 'Ferramentas', desc: 'Ferramentas para criadores e negócios', cta: 'Ir para Ferramentas', href: '/tools', icon: WrenchScrewdriverIcon, color: 'from-premium-600 via-secondary-600 to-action-600' },
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
        >
          {/* Mobile Layout */}
          <div className="block sm:hidden h-full overflow-y-auto">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="min-h-full bg-white flex flex-col"
            >
              {/* Mobile Header */}
              <div className="relative px-6 pt-8 pb-6 border-b bg-gradient-to-br from-primary-50 to-secondary-50">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HeartIcon className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h2>
                  <p className="text-gray-600">{t.subtitle}</p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeAndRemember}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Mobile Cards - Single Column */}
              <div className="flex-1 p-6 space-y-4">
                {t.cards.map((card, index) => (
                  <motion.button
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => go(card.href)}
                    className="group w-full text-left rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all bg-white overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-300 active:scale-[0.98]"
                  >
                    <div className={`h-2 w-full bg-gradient-to-r ${card.color}`} />
                    <div className="p-5 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                        <card.icon className="h-7 w-7 text-primary-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-lg font-bold text-gray-900 mb-1">{card.title}</div>
                        <div className="text-sm text-gray-600 leading-relaxed">{card.desc}</div>
                        <div className="mt-3 inline-flex items-center text-primary-700 text-sm font-semibold group-hover:underline">
                          {card.cta}
                          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Mobile Footer */}
              <div className="p-6 border-t bg-gray-50">
                <button
                  onClick={closeAndRemember}
                  className="w-full py-3 px-4 text-gray-600 hover:text-gray-800 text-center font-medium rounded-xl hover:bg-gray-100 transition-colors"
                >
                  {t.skip}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center justify-center min-h-full p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white max-w-4xl w-full rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Desktop Header */}
              <div className="relative px-8 pt-8 pb-6 border-b bg-gradient-to-br from-primary-50 via-white to-secondary-50">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <HeartIcon className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">{t.title}</h2>
                  <p className="text-lg text-gray-600">{t.subtitle}</p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeAndRemember}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              {/* Desktop Cards - 2x2 Grid */}
              <div className="p-8">
                <div className="grid grid-cols-2 gap-6">
                  {t.cards.map((card, index) => (
                    <motion.button
                      key={card.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      onClick={() => go(card.href)}
                      className="group text-left rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 bg-white overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <div className={`h-2 w-full bg-gradient-to-r ${card.color}`} />
                      <div className="p-6 flex items-start gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                          <card.icon className="h-8 w-8 text-primary-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xl font-bold text-gray-900 mb-2">{card.title}</div>
                          <div className="text-gray-600 leading-relaxed mb-4">{card.desc}</div>
                          <div className="inline-flex items-center text-primary-700 font-semibold group-hover:underline">
                            {card.cta}
                            <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Desktop Footer */}
                <div className="mt-8 text-center">
                  <button
                    onClick={closeAndRemember}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    {t.skip}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}