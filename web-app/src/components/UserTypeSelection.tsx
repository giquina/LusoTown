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
      title: 'Welcome Home',
      subtitle: 'Portuguese speakers in London',
      tagline: 'From Fado to Football, From Saudade to Success',
      description: 'Find your Portuguese community in the heart of London',
      skip: 'Explore later',
      cards: [
        { 
          title: 'Find Your Pessoa', 
          desc: 'Connect with Portuguese speakers who share your story', 
          cta: 'Meet People', 
          href: '/matches', 
          icon: HeartIcon, 
          color: 'from-red-500 via-green-500 to-red-600',
          emoji: '💕',
          benefit: 'Cultural connections that feel like home'
        },
        { 
          title: 'Portuguese Events', 
          desc: 'Fado nights, football watch parties & cultural celebrations', 
          cta: 'Join Events', 
          href: '/events', 
          icon: CalendarDaysIcon, 
          color: 'from-green-600 via-red-500 to-green-600',
          emoji: '🎉',
          benefit: 'Never miss Portuguese culture in London'
        },
        { 
          title: 'LusoTown TV', 
          desc: 'Live Portuguese content, talk shows & community streams', 
          cta: 'Watch Now', 
          href: '/live', 
          icon: PlayCircleIcon, 
          color: 'from-red-600 via-yellow-500 to-green-600',
          emoji: '📺',
          benefit: 'Portuguese voices, London stories'
        },
        { 
          title: 'Creator Hub', 
          desc: 'Share your talents with the Portuguese community', 
          cta: 'Start Creating', 
          href: '/tools', 
          icon: WrenchScrewdriverIcon, 
          color: 'from-yellow-500 via-red-500 to-green-600',
          emoji: '🚀',
          benefit: 'Turn your culture into your career'
        },
      ],
    },
    pt: {
      title: 'Bem-vindo a Casa',
      subtitle: 'Falantes de português em Londres',
      tagline: 'Do Fado ao Futebol, da Saudade ao Sucesso',
      description: 'Encontra a tua comunidade portuguesa no coração de Londres',
      skip: 'Explorar mais tarde',
      cards: [
        { 
          title: 'Encontra a Tua Pessoa', 
          desc: 'Conecta com portugueses que partilham a tua história', 
          cta: 'Conhecer Pessoas', 
          href: '/matches', 
          icon: HeartIcon, 
          color: 'from-red-500 via-green-500 to-red-600',
          emoji: '💕',
          benefit: 'Ligações culturais que sabem a casa'
        },
        { 
          title: 'Eventos Portugueses', 
          desc: 'Noites de fado, futebol e celebrações culturais', 
          cta: 'Juntar aos Eventos', 
          href: '/events', 
          icon: CalendarDaysIcon, 
          color: 'from-green-600 via-red-500 to-green-600',
          emoji: '🎉',
          benefit: 'Nunca percas a cultura portuguesa em Londres'
        },
        { 
          title: 'LusoTown TV', 
          desc: 'Conteúdo português ao vivo, talk shows e streams', 
          cta: 'Ver Agora', 
          href: '/live', 
          icon: PlayCircleIcon, 
          color: 'from-red-600 via-yellow-500 to-green-600',
          emoji: '📺',
          benefit: 'Vozes portuguesas, histórias de Londres'
        },
        { 
          title: 'Hub de Criadores', 
          desc: 'Partilha os teus talentos com a comunidade', 
          cta: 'Começar a Criar', 
          href: '/tools', 
          icon: WrenchScrewdriverIcon, 
          color: 'from-yellow-500 via-red-500 to-green-600',
          emoji: '🚀',
          benefit: 'Transforma a tua cultura na tua carreira'
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
              <div className="relative px-6 pt-8 pb-6 border-b bg-gradient-to-br from-red-50 via-yellow-50 to-green-50">
                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-yellow-400 to-green-600 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-2xl animate-bounce">🏠</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-xs">🇵🇹</span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 via-green-600 to-red-600 bg-clip-text text-transparent mb-2">{t.title}</h2>
                  <p className="text-lg font-medium text-gray-700 mb-1">{t.subtitle}</p>
                  <p className="text-sm text-gray-600 italic">{t.tagline}</p>
                  <p className="text-xs text-gray-500 mt-2">{t.description}</p>
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
                    className="group w-full text-left rounded-2xl border-2 border-gray-100 shadow-md hover:shadow-xl hover:border-red-200 transition-all duration-300 bg-white overflow-hidden focus:outline-none focus:ring-2 focus:ring-red-300 active:scale-[0.98] hover:scale-[1.02]"
                  >
                    <div className={`h-3 w-full bg-gradient-to-r ${card.color} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </div>
                    <div className="p-6 flex items-start gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <card.icon className="h-8 w-8 text-red-600 group-hover:text-green-600 transition-colors" />
                        </div>
                        <div className="absolute -top-1 -right-1 text-lg group-hover:animate-bounce">
                          {card.emoji}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-lg font-bold text-gray-900 mb-1 group-hover:text-red-700 transition-colors">{card.title}</div>
                        <div className="text-sm text-gray-600 leading-relaxed mb-2">{card.desc}</div>
                        <div className="text-xs text-green-600 font-medium mb-3 italic">{card.benefit}</div>
                        <div className="inline-flex items-center text-red-700 text-sm font-bold group-hover:text-green-700 group-hover:underline transition-colors">
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
              <div className="relative px-8 pt-8 pb-6 border-b bg-gradient-to-br from-red-50 via-yellow-50 to-green-50">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-red-500 via-yellow-400 to-green-600 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                      <span className="text-3xl animate-bounce">🏠</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 rounded-full border-3 border-white flex items-center justify-center shadow-md">
                      <span className="text-sm">🇵🇹</span>
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-red-200 animate-ping opacity-20"></div>
                  </div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-green-600 to-red-600 bg-clip-text text-transparent mb-3">{t.title}</h2>
                  <p className="text-xl font-semibold text-gray-700 mb-2">{t.subtitle}</p>
                  <p className="text-lg text-gray-600 italic mb-1">{t.tagline}</p>
                  <p className="text-sm text-gray-500">{t.description}</p>
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
                      className="group text-left rounded-2xl border-2 border-gray-100 shadow-lg hover:shadow-2xl hover:border-red-200 transition-all duration-300 bg-white overflow-hidden focus:outline-none focus:ring-2 focus:ring-red-300 hover:scale-[1.05] active:scale-[0.98]"
                    >
                      <div className={`h-4 w-full bg-gradient-to-r ${card.color} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      </div>
                      <div className="p-8 flex items-start gap-6">
                        <div className="relative">
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
                            <card.icon className="h-10 w-10 text-red-600 group-hover:text-green-600 transition-colors" />
                          </div>
                          <div className="absolute -top-2 -right-2 text-xl group-hover:animate-bounce">
                            {card.emoji}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-700 transition-colors">{card.title}</div>
                          <div className="text-gray-600 leading-relaxed mb-3">{card.desc}</div>
                          <div className="text-sm text-green-600 font-semibold mb-4 italic">{card.benefit}</div>
                          <div className="inline-flex items-center text-red-700 font-bold text-lg group-hover:text-green-700 group-hover:underline transition-colors">
                            {card.cta}
                            <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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