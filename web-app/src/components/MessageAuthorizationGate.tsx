'use client'

import { useState, useEffect, ReactNode } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Shield, Heart, Users, Check } from 'lucide-react'

interface MessageAuthorizationGateProps {
  targetUserId: string
  targetUserName: string
  targetUserImage?: string
  onPermissionGranted: () => void
  onPermissionDenied: () => void
  children: ReactNode
}

export default function MessageAuthorizationGate({
  targetUserId,
  targetUserName,
  targetUserImage,
  onPermissionGranted,
  onPermissionDenied,
  children
}: MessageAuthorizationGateProps) {
  const { language } = useLanguage()
  const [hasPermission, setHasPermission] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const t = {
    en: {
      title: 'Safe Messaging',
      subtitle: 'Portuguese-speaking community protection',
      description: 'We prioritize safety in our community. All messages are moderated to ensure a positive experience.',
      safetyFeatures: [
        'Messages are reviewed for appropriate content',
        'Both users must consent to messaging',
        'Report and block features available',
        'Community guidelines enforced'
      ],
      continue: 'Continue to Messages',
      decline: 'Not Now',
      guidelines: 'Community Guidelines'
    },
    pt: {
      title: 'Mensagens Seguras',
      subtitle: 'Proteção da comunidade de falantes de português',
      description: 'Priorizamos a segurança na nossa comunidade. Todas as mensagens são moderadas para garantir uma experiência positiva.',
      safetyFeatures: [
        'As mensagens são revistas para conteúdo apropriado',
        'Ambos os utilizadores devem consentir às mensagens',
        'Funcionalidades de reportar e bloquear disponíveis',
        'Diretrizes da comunidade aplicadas'
      ],
      continue: 'Continuar para Mensagens',
      decline: 'Agora Não',
      guidelines: 'Diretrizes da Comunidade'
    }
  }

  const text = t[language]

  useEffect(() => {
    // Simulate checking permissions
    const timer = setTimeout(() => {
      setIsLoading(false)
      // For demo purposes, always grant permission
      // In real implementation, check actual permissions
      setHasPermission(true)
      onPermissionGranted()
    }, 500)

    return () => clearTimeout(timer)
  }, [onPermissionGranted])

  const handleContinue = () => {
    setHasPermission(true)
    onPermissionGranted()
  }

  const handleDecline = () => {
    onPermissionDenied()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!hasPermission) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{text.title}</h3>
          <p className="text-sm text-gray-600">{text.subtitle}</p>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-4">{text.description}</p>
          
          <div className="space-y-3">
            {text.safetyFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleContinue}
            className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            {text.continue}
          </button>
          
          <button
            onClick={handleDecline}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            {text.decline}
          </button>
        </div>

        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-primary-600 hover:underline">
            {text.guidelines}
          </a>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
