'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { useWelcomePopup } from './WelcomePopupProvider'
import { ROUTES } from '@/config/routes'

export default function WelcomeBanner() {
  const { t } = useLanguage()
  const { shouldShowBanner, dismissBanner } = useWelcomePopup()
  const router = useRouter()

  const handleJoinNow = () => {
    dismissBanner()
    router.push(ROUTES.signup)
  }

  const handleDismiss = () => {
    dismissBanner()
  }

  return (
    <AnimatePresence>
      {shouldShowBanner && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🇵🇹</span>
                  <span className="text-lg">🇧🇷</span>
                  <span className="text-lg">🇦🇴</span>
                  <span className="text-lg">🇨🇻</span>
                  <span className="text-sm text-white/80">→</span>
                  <span className="text-lg">🇬🇧</span>
                </div>
                
                <div className="hidden sm:block w-px h-6 bg-white/30"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="font-semibold text-sm sm:text-base">
                    {t('welcome.title')}
                  </span>
                  <span className="text-xs sm:text-sm text-white/90">
                    {t('homepage.cta.subtitle', 'Free to join • Events • Networking • Culture • Friendship')}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleJoinNow}
                  className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 border border-white/20 hover:border-white/30"
                >
                  <SparklesIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {t('welcome.get_started', 'Get Started')}
                  </span>
                  <span className="sm:hidden">
                    {t('mobile.join_community_short', 'Join Free')}
                  </span>
                </button>
                
                <button
                  onClick={handleDismiss}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Dismiss banner"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}