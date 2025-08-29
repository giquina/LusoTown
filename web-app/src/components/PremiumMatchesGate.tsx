'use client'

import { useLanguage } from '@/context/LanguageContext'
import { HERITAGE_COLORS } from '@/config/brand'
import { SUBSCRIPTION_PLANS } from '@/config/pricing'

interface PremiumMatchesGateProps {
  children: React.ReactNode
  isPremium?: boolean
}

export default function PremiumMatchesGate({ children, isPremium = false }: PremiumMatchesGateProps) {
  const { t } = useLanguage()

  if (isPremium) {
    return <>{children}</>
  }

  return (
    <div className="relative">
      {/* Blurred content behind gate */}
      <div className="filter blur-sm pointer-events-none opacity-50">
        {children}
      </div>
      
      {/* Premium gate overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-primary-600/90 via-primary-500/80 to-transparent flex items-center justify-center backdrop-blur-sm rounded-lg"
        style={{
          '--heritage-primary': HERITAGE_COLORS.primary,
          '--heritage-secondary': HERITAGE_COLORS.secondary
        } as React.CSSProperties}
      >
        <div className="text-center p-8 max-w-md">
          <div className="mb-4">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👑</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {t('matches.premium.title')}
            </h3>
            <p className="text-primary-100 text-sm mb-6">
              {t('matches.premium.description')}
            </p>
          </div>
          
          <button className="w-full bg-white text-primary-600 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors min-h-[44px]">
            {t('matches.premium.upgrade')} - {SUBSCRIPTION_PLANS.cultural.price}
          </button>
          
          <p className="text-primary-200 text-xs mt-3">
            {t('matches.premium.benefits')}
          </p>
        </div>
      </div>
    </div>
  )
}