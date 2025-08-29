'use client'

import { useLanguage } from '@/context/LanguageContext'
import { Zap, Gauge, Wifi } from 'lucide-react'

export default function PerformanceOptimization() {
  const { t } = useLanguage()

  const optimizations = [
    {
      icon: Zap,
      title: t('pwa.performance.fastLoading.title') || 'Lightning Fast Loading',
      description: t('pwa.performance.fastLoading.description') || 'Optimized for Portuguese cultural content and business directories',
      metric: '< 1.5s'
    },
    {
      icon: Gauge,
      title: t('pwa.performance.offlineMode.title') || 'Offline Functionality',
      description: t('pwa.performance.offlineMode.description') || 'Access community information even without internet connection',
      metric: '100% Available'
    },
    {
      icon: Wifi,
      title: t('pwa.performance.dataEfficiency.title') || 'Data Efficient',
      description: t('pwa.performance.dataEfficiency.description') || 'Minimized data usage for Portuguese content and images',
      metric: '60% Less Data'
    }
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('pwa.performance.title') || 'Performance Optimization'}
        </h2>
        <p className="text-gray-600">
          {t('pwa.performance.subtitle') || 'Optimized for Portuguese community mobile usage patterns'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {optimizations.map((optimization, index) => (
          <div key={index} className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <optimization.icon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{optimization.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{optimization.description}</p>
            <div className="text-lg font-bold text-green-600">{optimization.metric}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
