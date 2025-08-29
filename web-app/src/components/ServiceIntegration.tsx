'use client'

import { useLanguage } from '@/context/LanguageContext'
import { Zap, Shield, Users, Globe } from 'lucide-react'

interface ServiceIntegrationProps {
  isPortuguese?: boolean
}

export default function ServiceIntegration({ isPortuguese = false }: ServiceIntegrationProps) {
  const { t } = useLanguage()

  const integrations = [
    {
      icon: Users,
      title: t('services.integration.community.title') || 'Community Integration',
      description: t('services.integration.community.description') || 'Seamlessly connect with Portuguese-speaking community services'
    },
    {
      icon: Shield,
      title: t('services.integration.security.title') || 'Secure Platform',
      description: t('services.integration.security.description') || 'All services verified and trusted by the Portuguese community'
    },
    {
      icon: Globe,
      title: t('services.integration.global.title') || 'UK-Wide Network',
      description: t('services.integration.global.description') || 'Access services across all major UK cities and regions'
    },
    {
      icon: Zap,
      title: t('services.integration.instant.title') || 'Instant Connection',
      description: t('services.integration.instant.description') || 'Quick booking and immediate service provider contact'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('services.integration.title') || 'Service Integration'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.integration.subtitle') || 'Connecting Portuguese-speaking professionals with community members across the UK'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {integrations.map((integration, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <integration.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{integration.title}</h3>
              <p className="text-sm text-gray-600">{integration.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            {t('services.integration.cta') || 'Explore Services'}
          </button>
        </div>
      </div>
    </section>
  )
}
