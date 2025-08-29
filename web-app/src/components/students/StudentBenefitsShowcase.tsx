'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function StudentBenefitsShowcase() {
  const { t } = useLanguage()

  return (
    <div className="py-16 bg-primary-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-primary-900 mb-6">
          {t('student.benefits.title')}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('student.benefits.description')}
        </p>
      </div>
    </div>
  )
}