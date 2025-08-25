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
  // Temporarily disabled - returning null to completely hide welcome screen
  return null;
  
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
      title: 'Find Your Portuguese Community in the United Kingdom',
      subtitle: 'Connect with 2,750+ verified Portuguese speakers through events, networking, and cultural experiences',
      skipForNow: 'Skip for now',
      primaryCta: 'Join Free',
      secondaryCta: 'Learn More',
      socialProof: '2,750+ Portuguese speakers • 150+ monthly events • 8 university partnerships',
      keyBenefit: {
        title: 'Authentic Portuguese Connections',
        desc: 'Meet Portuguese speakers who share your heritage, values, and experiences. From cultural events to professional networking - all curated by our community.',
        icon: HeartIcon,
        features: [
          '✓ Cultural compatibility matching',
          '✓ Authentic Portuguese events', 
          '✓ Professional networking opportunities',
          '✓ University student community'
        ]
      },
      curatorOption: {
        title: 'Become a Community Curator',
        desc: 'Create events and build community',
        cta: 'Apply as Curator'
      }
    },
    pt: {
      title: 'Encontre a Sua Comunidade Portuguesa no Reino Unido',
      subtitle: 'Conecte-se com 2.750+ falantes de português verificados através de eventos, networking e experiências culturais',
      skipForNow: 'Pular por agora',
      primaryCta: 'Juntar-se Gratuitamente',
      secondaryCta: 'Saber Mais',
      socialProof: '2.750+ falantes de português • 150+ eventos mensais • 8 parcerias universitárias',
      keyBenefit: {
        title: 'Conexões Portuguesas Autênticas',
        desc: 'Conheça falantes de português que partilham a sua herança, valores e experiências. De eventos culturais a networking profissional - tudo curado pela nossa comunidade.',
        icon: HeartIcon,
        features: [
          '✓ Compatibilidade cultural matching',
          '✓ Eventos portugueses autênticos',
          '✓ Oportunidades de networking profissional', 
          '✓ Comunidade de estudantes universitários'
        ]
      },
      curatorOption: {
        title: 'Torne-se um Curador da Comunidade',
        desc: 'Crie eventos e construa comunidade',
        cta: 'Candidatar-se como Curador'
      }
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

              {/* Key Benefit Section */}
              <div className="flex-1 p-6 overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-center mb-6"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary-600 via-action-600 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <t.keyBenefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{t.keyBenefit.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{t.keyBenefit.desc}</p>
                  
                  {/* Feature List */}
                  <div className="space-y-2 mb-6">
                    {t.keyBenefit.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-left text-sm text-gray-700">
                        <span className="text-primary-600 mr-2">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Social Proof */}
                  <div className="bg-primary-50 rounded-xl p-3 mb-6">
                    <div className="text-xs text-primary-700 font-medium">{t.socialProof}</div>
                  </div>

                  {/* Primary CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => go('/matches', 'user')}
                    className="w-full py-4 px-6 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-3"
                  >
                    {t.primaryCta}
                  </motion.button>

                  {/* Secondary CTA */}
                  <button
                    onClick={() => go('/about')}
                    className="w-full py-3 px-6 text-primary-700 font-semibold border-2 border-primary-200 rounded-xl hover:bg-primary-50 transition-all duration-200 mb-4"
                  >
                    {t.secondaryCta}
                  </button>

                  {/* Curator Option */}
                  <div className="border-t pt-4">
                    <button
                      onClick={() => go('/curator-application', 'curator')}
                      className="text-sm text-gray-600 hover:text-gray-800 font-medium flex items-center justify-center gap-2 mx-auto"
                    >
                      <SparklesIcon className="w-4 h-4" />
                      {t.curatorOption.cta}
                    </button>
                  </div>
                </motion.div>
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

              {/* Desktop Key Benefit Section */}
              <div className="flex-1 p-8 overflow-hidden">
                <div className="max-w-2xl mx-auto text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-secondary-600 via-action-600 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <t.keyBenefit.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.keyBenefit.title}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">{t.keyBenefit.desc}</p>
                    
                    {/* Feature Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {t.keyBenefit.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-left text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                          <span className="text-primary-600 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Social Proof */}
                    <div className="bg-primary-50 rounded-xl p-4 mb-8">
                      <div className="text-sm text-primary-700 font-medium">{t.socialProof}</div>
                    </div>

                    {/* CTAs */}
                    <div className="space-y-4 mb-8">
                      {/* Primary CTA */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => go('/matches', 'user')}
                        className="w-full py-4 px-8 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {t.primaryCta}
                      </motion.button>

                      {/* Secondary CTA */}
                      <button
                        onClick={() => go('/about')}
                        className="w-full py-3 px-8 text-primary-700 font-semibold text-base border-2 border-primary-200 rounded-xl hover:bg-primary-50 transition-all duration-200"
                      >
                        {t.secondaryCta}
                      </button>
                    </div>

                    {/* Curator Option */}
                    <div className="border-t pt-6">
                      <div className="text-sm text-gray-600 mb-2">{t.curatorOption.title}</div>
                      <button
                        onClick={() => go('/curator-application', 'curator')}
                        className="text-base text-gray-700 hover:text-gray-900 font-semibold flex items-center justify-center gap-2 mx-auto hover:underline"
                      >
                        <SparklesIcon className="w-5 h-5" />
                        {t.curatorOption.cta}
                      </button>
                    </div>
                  </motion.div>
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