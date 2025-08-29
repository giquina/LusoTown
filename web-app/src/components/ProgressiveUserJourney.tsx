'use client'

import { useLanguage } from '@/context/LanguageContext'
import { PORTUGUESE_COLORS } from '@/config/brand'

export default function ProgressiveUserJourney() {
  const { language } = useLanguage()

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: PORTUGUESE_COLORS.brown[700] }}>
          {language === 'pt' ? 'Jornada do Utilizador' : 'User Journey'}
        </h2>
        <p className="text-lg text-gray-600">
          {language === 'pt'
            ? 'Uma experiência progressiva adaptada às suas necessidades'
            : 'A progressive experience tailored to your needs'
          }
        </p>
      </div>
    </section>
  )
}
