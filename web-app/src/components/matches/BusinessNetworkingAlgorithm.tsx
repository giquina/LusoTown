'use client'

import { useLanguage } from '@/context/LanguageContext'
import { Card } from '@/components/ui/card'

/**
 * Simple business networking component
 * Consolidated from complex algorithm system
 */
export default function BusinessNetworkingAlgorithm() {
  const { t } = useLanguage()

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 text-primary-900">
        {t('matches.businessNetworking')}
      </h3>
      <p className="text-gray-600">
        {t('matches.businessNetworkingDescription')}
      </p>
    </Card>
  )
}