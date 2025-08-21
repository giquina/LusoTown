'use client'

import { ROUTES } from '@/config';
import { useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function CulturalToursConfirmationRedirect() {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'

  useEffect(() => {
    // Redirect to transport page as cultural tours are no longer offered
    window.location.replace(ROUTES.transport)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {isPortuguese ? 'Redirecionando...' : 'Redirecting...'}
        </h1>
        <p className="text-gray-600">
          {isPortuguese
            ? 'Você está sendo redirecionado para nossos serviços de transporte.'
            : 'You are being redirected to our transport services.'
          }
        </p>
      </div>
    </div>
  )
}
