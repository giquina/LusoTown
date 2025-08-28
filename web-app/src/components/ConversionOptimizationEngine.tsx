'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import {
  TrophyIcon,
  ChartBarIcon,
  UserGroupIcon,
  SparklesIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'

export default function ConversionOptimizationEngine() {
  const { language } = useLanguage()

  const metrics = [
    {
      label: language === 'pt' ? 'Taxa de Conversão' : 'Conversion Rate',
      value: '12.4%',
      change: '+2.1%',
      icon: <ChartBarIcon className="w-5 h-5" />
    },
    {
      label: language === 'pt' ? 'Usuários Ativos' : 'Active Users',
      value: '2,456',
      change: '+18%',
      icon: <UserGroupIcon className="w-5 h-5" />
    },
    {
      label: language === 'pt' ? 'Engajamento' : 'Engagement',
      value: '89%',
      change: '+5.2%',
      icon: <SparklesIcon className="w-5 h-5" />
    }
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
          <TrophyIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {language === 'pt' ? 'Otimização de Conversão' : 'Conversion Optimization'}
          </h3>
          <p className="text-sm text-gray-600">
            {language === 'pt' ? 'Métricas da comunidade' : 'Community metrics'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-center mb-2 text-primary-600">
              {metric.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
            <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
            <div className="text-xs text-green-600 flex items-center justify-center space-x-1">
              <ArrowTrendingUpIcon className="w-3 h-3" />
              <span>{metric.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {language === 'pt' 
              ? 'Algoritmo inteligente otimizando experiência do usuário'
              : 'Smart algorithm optimizing user experience'
            }
          </p>
        </div>
      </div>
    </div>
  )
}