'use client'

import { useLanguage } from '@/context/LanguageContext'
import { Card } from '@/components/ui/card'

/**
 * Simple event review component
 * Consolidated from complex review system
 */
export default function EventReviewSystem() {
  const { t } = useLanguage()

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 text-primary-900">
        {t('events.reviewSystem')}
      </h3>
      <p className="text-gray-600">
        {t('events.reviewSystemDescription')}
      </p>
    </Card>
  )
}