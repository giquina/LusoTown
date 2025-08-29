'use client'

import { useLanguage } from '@/context/LanguageContext'
import { PORTUGUESE_COLORS } from '@/config/brand'

export default function ConversionOptimizationEngine() {
  const { language } = useLanguage()

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: PORTUGUESE_COLORS.brown[700] }}>
          {language === 'pt' ? 'Motor de Otimização' : 'Optimization Engine'}
        </h2>
        <p className="text-lg text-gray-600">
          {language === 'pt'
            ? 'Otimizando a experiência da comunidade lusófona'
            : 'Optimizing the Portuguese-speaking community experience'
          }
        </p>
      </div>
    </section>
  )
}
