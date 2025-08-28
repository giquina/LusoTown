'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import {
  ChartBarIcon,
  TrendingUpIcon,
  UsersIcon,
  CalendarIcon,
  SparklesIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline'

interface NetworkMetric {
  label: string
  value: number
  change: number
  trend: 'up' | 'down' | 'neutral'
  color: string
}

export default function NetworkAnalytics() {
  const { language } = useLanguage()

  const metrics: NetworkMetric[] = [
    {
      label: language === 'pt' ? 'Novas Conexões' : 'New Connections',
      value: 8,
      change: 12,
      trend: 'up',
      color: 'text-green-600'
    },
    {
      label: language === 'pt' ? 'Eventos Partilhados' : 'Shared Events',
      value: 24,
      change: 5,
      trend: 'up',
      color: 'text-primary-600'
    },
    {
      label: language === 'pt' ? 'Taxa de Resposta' : 'Response Rate',
      value: 89,
      change: -3,
      trend: 'down',
      color: 'text-orange-600'
    },
    {
      label: language === 'pt' ? 'Pontos de Atividade' : 'Activity Score',
      value: 156,
      change: 18,
      trend: 'up',
      color: 'text-secondary-600'
    }
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
          <ChartBarIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {language === 'pt' ? 'Análise da Rede' : 'Network Analytics'}
          </h3>
          <p className="text-sm text-gray-600">
            {language === 'pt' ? 'Últimos 30 dias' : 'Last 30 days'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-700">{metric.label}</h4>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-lg font-bold ${metric.color}`}>
                  {metric.label.includes('Rate') || metric.label.includes('Taxa') ? `${metric.value}%` : metric.value}
                </span>
                <div className={`flex items-center space-x-1 text-xs ${
                  metric.trend === 'up' ? 'text-green-600' : 
                  metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {metric.trend === 'up' && <ArrowUpIcon className="w-3 h-3" />}
                  {metric.trend === 'down' && <ArrowDownIcon className="w-3 h-3" />}
                  <span>{Math.abs(metric.change)}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Activity Chart Placeholder */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          {language === 'pt' ? 'Atividade Semanal' : 'Weekly Activity'}
        </h4>
        <div className="flex items-end justify-between h-16 space-x-2">
          {[40, 65, 30, 85, 45, 70, 55].map((height, index) => (
            <div key={index} className="flex-1 bg-primary-100 rounded-t" style={{ height: `${height}%` }}>
              <div 
                className="w-full bg-gradient-to-t from-primary-500 to-secondary-500 rounded-t transition-all duration-300"
                style={{ height: '100%' }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, index) => (
            <span key={index}>{day}</span>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600">24</div>
            <div className="text-xs text-gray-600">
              {language === 'pt' ? 'Este mês' : 'This month'}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary-600">156</div>
            <div className="text-xs text-gray-600">
              {language === 'pt' ? 'Total de pontos' : 'Total points'}
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="mt-4">
        <div className="flex items-center justify-center space-x-1 text-yellow-500">
          <SparklesIcon className="w-4 h-4" />
          <span className="text-xs font-medium text-gray-600">
            {language === 'pt' ? 'Super Conectado!' : 'Super Connected!'}
          </span>
        </div>
      </div>
    </div>
  )
}