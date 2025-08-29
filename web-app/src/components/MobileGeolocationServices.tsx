'use client'

import { useLanguage } from '@/context/LanguageContext'
import { Map, Navigation, MapPin } from 'lucide-react'

export default function MobileGeolocationServices() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Map,
      title: t('pwa.geolocation.businessFinder.title') || 'Portuguese Business Finder',
      description: t('pwa.geolocation.businessFinder.description') || 'Locate Portuguese businesses near you with precise GPS positioning'
    },
    {
      icon: Navigation,
      title: t('pwa.geolocation.eventNavigation.title') || 'Event Navigation',
      description: t('pwa.geolocation.eventNavigation.description') || 'Get directions to Portuguese community events and gatherings'
    },
    {
      icon: MapPin,
      title: t('pwa.geolocation.communityMap.title') || 'Community Mapping',
      description: t('pwa.geolocation.communityMap.description') || 'Discover Portuguese-speaking communities across the UK'
    }
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('pwa.geolocation.title') || 'Mobile Geolocation Services'}
        </h2>
        <p className="text-gray-600">
          {t('pwa.geolocation.subtitle') || 'Location-aware features for the Portuguese-speaking community'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <feature.icon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
