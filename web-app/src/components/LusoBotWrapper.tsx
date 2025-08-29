'use client'

import { useLanguage } from '@/context/LanguageContext'
import { HERITAGE_COLORS } from '@/config/brand'

export default function LusoBotWrapper({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-primary-50">
      {children}
      
      {/* LusoBot Integration Wrapper */}
      <div 
        className="fixed bottom-4 right-4 z-50 transition-all duration-300"
        style={{
          '--heritage-primary': HERITAGE_COLORS.primary,
          '--heritage-secondary': HERITAGE_COLORS.secondary
        } as React.CSSProperties}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-primary-200">
          <div className="text-xs text-primary-600 font-medium">
            {t('bot.wrapper.ready')}
          </div>
        </div>
      </div>
    </div>
  )
}