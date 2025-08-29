'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { ModernButton } from '@/components/ui/ModernButton'
import { Card } from '@/components/ui/card'

/**
 * Simple group report modal
 * Consolidated from complex reporting system
 */
interface GroupReportModalProps {
  groupId?: string
  isOpen?: boolean
  onClose?: () => void
}

export default function GroupReportModal({ 
  groupId, 
  isOpen = false, 
  onClose 
}: GroupReportModalProps) {
  const { t } = useLanguage()
  const [reason, setReason] = useState('')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4 text-primary-900">
          {t('groups.reportGroup')}
        </h3>
        <div className="space-y-4">
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-3 border rounded-md"
            placeholder={t('groups.reportReason')}
            rows={4}
          />
          <div className="flex gap-3 justify-end">
            <ModernButton variant="outline" onClick={onClose}>
              {t('common.cancel')}
            </ModernButton>
            <ModernButton onClick={onClose}>
              {t('common.submit')}
            </ModernButton>
          </div>
        </div>
      </Card>
    </div>
  )
}