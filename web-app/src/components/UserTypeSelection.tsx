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

  const closeAndRemember = () => {
    try { localStorage.setItem('lusotown-onboarded-v2', '1') } catch {}
    setDismissed(true)
    setShowModal(false)
  }

  const go = (path: string) => {
    closeAndRemember()
    window.location.href = path
  }

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
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="bg-white w-full sm:max-w-3xl rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative px-5 sm:px-8 pt-5 sm:pt-8 pb-2 border-b">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t.title}</h2>
              <p className="text-gray-600 mt-1">{t.subtitle}</p>
              <button
                aria-label="Close"
                onClick={closeAndRemember}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
              >
                <XMarkIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 p-5 sm:p-8">
              {t.cards.map((card) => (
                <button
                  key={card.title}
                  onClick={() => go(card.href)}
                  className="group text-left rounded-2xl border border-gray-200 shadow hover:shadow-lg transition-all bg-white overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-300"
                >
                  <div className={`h-1.5 w-full bg-gradient-to-r ${card.color}`} />
                  <div className="p-4 sm:p-5 flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                      <card.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-base sm:text-lg font-bold text-gray-900 truncate">{card.title}</div>
                      <div className="text-sm text-gray-600 line-clamp-2">{card.desc}</div>
                      <div className="mt-2 text-primary-700 text-sm font-semibold group-hover:underline">{card.cta}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="px-5 sm:px-8 pb-6 sm:pb-8">
              <button
                onClick={closeAndRemember}
                className="w-full sm:w-auto sm:inline-flex text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                {t.skip}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}