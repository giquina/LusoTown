'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import {
  Zap,
  Activity,
  Clock,
  Database,
  Smartphone,
  CheckCircle
} from 'lucide-react'

export default function PerformanceOptimization() {
  const { language } = useLanguage()

  const optimizations = [
    {
      title: language === 'pt' ? 'Cache Inteligente' : 'Smart Caching',
      description: language === 'pt' 
        ? 'Carregamento instantâneo de conteúdo previamente acessado'
        : 'Instant loading of previously accessed content',
      icon: <Database className="w-5 h-5" />,
      status: 'active'
    },
    {
      title: language === 'pt' ? 'Otimização Móvel' : 'Mobile Optimization',
      description: language === 'pt'
        ? 'Experiência otimizada para dispositivos móveis'
        : 'Optimized experience for mobile devices',
      icon: <Smartphone className="w-5 h-5" />,
      status: 'active'
    },
    {
      title: language === 'pt' ? 'Carregamento Rápido' : 'Fast Loading',
      description: language === 'pt'
        ? 'Páginas carregam em menos de 2 segundos'
        : 'Pages load in under 2 seconds',
      icon: <Zap className="w-5 h-5" />,
      status: 'active'
    }
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {language === 'pt' ? 'Otimização de Performance' : 'Performance Optimization'}
          </h3>
          <p className="text-sm text-gray-600">
            {language === 'pt' ? 'Otimizações ativas' : 'Active optimizations'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {optimizations.map((opt, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="text-primary-600">{opt.icon}</div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{opt.title}</h4>
              <p className="text-sm text-gray-600">{opt.description}</p>
            </div>
            <div className="text-green-600">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            {language === 'pt' ? 'Performance Score' : 'Performance Score'}
          </span>
          <span className="text-green-600 font-semibold">95/100</span>
        </div>
      </div>
    </div>
  )
}