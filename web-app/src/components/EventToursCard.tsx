'use client'

import { useLanguage } from '@/context/LanguageContext'
import { Card } from '@/components/ui/card'
import { ModernButton } from '@/components/ui/ModernButton'

/**
 * Simple event tours card component
 */
export default function EventToursCard() {
  const { t } = useLanguage()

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 text-primary-900">
        {t('events.tours')}
      </h3>
      <p className="text-gray-600 mb-4">
        {t('events.toursDescription')}
      </p>
      <ModernButton>
        {t('events.bookTour')}
      </ModernButton>
    </Card>
  )
}