'use client'

import { ROUTES } from '@/config';
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  XMarkIcon,
  HeartIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  StarIcon,
  ShieldCheckIcon,
  EyeIcon,
  GiftIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import { useAuthPopup } from './AuthPopupProvider'
import { useLanguage } from '@/context/LanguageContext'

export default function AuthPopup() {
  const { currentPopup, hidePopup, authIntent } = useAuthPopup()
  const { language } = useLanguage()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  
  const isPortuguese = language === 'pt'
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Prevent body scroll when popup is open
  useEffect(() => {
    if (currentPopup) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'unset'
      }
    }
  }, [currentPopup])
  
  if (!mounted) return null
  
  const handleSignupClick = () => {
    hidePopup()
    // Store auth intent in localStorage for post-signup restoration
    if (authIntent) {
      localStorage.setItem('lusotown-auth-intent', JSON.stringify(authIntent))
    }
    router.push('/signup')
  }
  
  const handleLoginClick = () => {
    hidePopup()
    // Store auth intent in localStorage for post-login restoration
    if (authIntent) {
      localStorage.setItem('lusotown-auth-intent', JSON.stringify(authIntent))
    }
    router.push(ROUTES.auth.login)
  }
  
  const getPopupContent = () => {
    switch (currentPopup) {
      case 'add-to-cart':
        return {
          title: isPortuguese ? 'Quer usar esta funcionalidade? Registe-se agora!' : 'Want to use this feature? Sign up now!',
          message: isPortuguese ? 'Esta funcionalidade está disponível apenas para membros registados.' : 'This feature is only available for registered members.',
          benefits: [
            {
              icon: ShoppingCartIcon,
              text: isPortuguese ? 'Guardar múltiplas experiências para mais tarde' : 'Save multiple experiences for later',
              color: 'text-primary-500'
            },
            {
              icon: GiftIcon,
              text: isPortuguese ? 'Obter descontos exclusivos para membros' : 'Get member-only discounts',
              color: 'text-secondary-500'
            },
            {
              icon: SparklesIcon,
              text: isPortuguese ? 'Processo de checkout fácil' : 'Easy checkout process',
              color: 'text-accent-500'
            },
            {
              icon: StarIcon,
              text: isPortuguese ? 'Acompanhar as suas reservas num só lugar' : 'Track your bookings in one place',
              color: 'text-premium-500'
            }
          ],
          primaryCTA: isPortuguese ? 'Registar Grátis' : 'Sign Up Free',
          icon: ShoppingCartIcon,
          iconColor: 'from-primary-400 to-secondary-400'
        }
      
      case 'view-details':
        return {
          title: isPortuguese ? 'Quer ver todos os detalhes do evento? Registe-se gratuitamente!' : 'Want to see full event details? Sign up for free!',
          message: isPortuguese ? 'Informações detalhadas estão disponíveis apenas para falantes de português.' : 'Detailed information is available to Portuguese speakers only.',
          benefits: [
            {
              icon: EyeIcon,
              text: isPortuguese ? 'Informações completas do evento' : 'Complete event information',
              color: 'text-primary-500'
            },
            {
              icon: UserGroupIcon,
              text: isPortuguese ? 'Detalhes de contacto do organizador' : 'Host contact details',
              color: 'text-secondary-500'
            },
            {
              icon: StarIcon,
              text: isPortuguese ? 'Avaliações e fotos de membros' : 'Member reviews and photos',
              color: 'text-accent-500'
            },
            {
              icon: GiftIcon,
              text: isPortuguese ? 'Preços exclusivos para membros' : 'Exclusive member pricing',
              color: 'text-premium-500'
            }
          ],
          primaryCTA: isPortuguese ? 'Juntar à Comunidade' : 'Join Community',
          icon: EyeIcon,
          iconColor: 'from-accent-400 to-premium-400'
        }
      
      default:
        return null
    }
  }
  
  const content = getPopupContent()
  if (!content) return null
  
  return (
    <AnimatePresence>
      {currentPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={hidePopup}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={hidePopup}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all z-10"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            
            {/* Header with gradient background */}
            <div className={`bg-gradient-to-r ${content.iconColor} px-6 pt-8 pb-6 text-white relative overflow-hidden`}>
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
              </div>
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <content.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <HeartIcon className="w-5 h-5 text-white" />
                    <span className="text-lg font-bold">LusoTown</span>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold mb-2 leading-tight">
                  {content.title}
                </h2>
                
                <p className="text-white/90 text-sm leading-relaxed">
                  {content.message}
                </p>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {/* Benefits List */}
              <div className="space-y-4 mb-6">
                {content.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 flex-shrink-0`}>
                      <benefit.icon className={`w-4 h-4 ${benefit.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 text-sm font-medium leading-relaxed">
                        {benefit.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Community Stats */}
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4 mb-6 border border-primary-100">
                <div className="flex items-center gap-2 mb-3">
                  <CheckBadgeIcon className="w-5 h-5 text-primary-500" />
                  <span className="text-sm font-semibold text-primary-900">
                    {isPortuguese ? 'Comunidade Verificada' : 'Verified Community'}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-primary-600">750+</div>
                    <div className="text-xs text-primary-700">
                      {isPortuguese ? 'Falantes de Português' : 'Portuguese Speakers'}
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-secondary-600">50+</div>
                    <div className="text-xs text-secondary-700">
                      {isPortuguese ? 'Eventos Mensais' : 'Monthly Events'}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleSignupClick}
                  className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <SparklesIcon className="w-5 h-5" />
                  <span>{content.primaryCTA}</span>
                </button>
                
                <button
                  onClick={handleLoginClick}
                  className="w-full text-gray-600 hover:text-primary-600 font-medium py-2 px-4 transition-colors text-sm"
                >
                  {isPortuguese ? 'Já tem conta? Entrar aqui' : 'Already have an account? Sign in here'}
                </button>
              </div>
              
              {/* Trust Signals */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <ShieldCheckIcon className="w-4 h-4 text-secondary-500" />
                    <span>{isPortuguese ? 'Seguro' : 'Safe'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckBadgeIcon className="w-4 h-4 text-primary-500" />
                    <span>{isPortuguese ? 'Verificado' : 'Verified'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GiftIcon className="w-4 h-4 text-accent-500" />
                    <span>{isPortuguese ? 'Gratuito' : 'Free'}</span>
                  </div>
                </div>
                
                <p className="text-center text-xs text-gray-500 mt-3 leading-relaxed">
                  {isPortuguese ? 
                    'Junte-se a centenas de falantes de português em Londres' : 
                    'Join hundreds of Portuguese speakers in London'
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}