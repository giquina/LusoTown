'use client'

import { motion } from 'framer-motion'
import { 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  StarIcon,
  UserGroupIcon,
  SparklesIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useNetworking } from '@/context/NetworkingContext'

export default function NetworkAnalytics() {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  const { getNetworkAnalytics, exportConnections } = useNetworking()
  
  const analytics = getNetworkAnalytics()

  const analyticsItems = [
    {
      icon: StarIcon,
      value: analytics.averageConnectionStrength,
      label: isPortuguese ? 'Força Média' : 'Avg. Strength',
      description: isPortuguese ? 'força média das conexões' : 'average connection strength',
      color: 'from-yellow-500 to-orange-500',
      unit: '/10'
    },
    {
      icon: CalendarIcon,
      value: analytics.topEventForConnections.connectionCount,
      label: isPortuguese ? 'Melhor Evento' : 'Top Event',
      description: analytics.topEventForConnections.eventTitle,
      color: 'from-green-500 to-emerald-500',
      unit: isPortuguese ? ' conexões' : ' connections'
    },
    {
      icon: ArrowTrendingUpIcon,
      value: analytics.connectionGrowthRate,
      label: isPortuguese ? 'Crescimento' : 'Growth Rate',
      description: isPortuguese ? 'conexões por mês' : 'connections per month',
      color: 'from-blue-500 to-primary-500',
      unit: '/mês'
    },
    {
      icon: UserGroupIcon,
      value: analytics.strongConnectionsPercent,
      label: isPortuguese ? 'Conexões Fortes' : 'Strong Connections',
      description: isPortuguese ? 'conexões com força ≥7' : 'connections with strength ≥7',
      color: 'from-accent-500 to-pink-500',
      unit: '%'
    }
  ]

  const handleExport = (format: 'csv' | 'json') => {
    exportConnections(format)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
            <ChartBarIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {isPortuguese ? 'Análise da Rede' : 'Network Analytics'}
            </h3>
            <p className="text-sm text-secondary-600">
              {isPortuguese ? 'Insights sobre as suas conexões' : 'Insights about your connections'}
            </p>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => handleExport('csv')}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-secondary-600 hover:text-secondary-800 border border-secondary-200 rounded-lg hover:border-secondary-300 transition-colors"
            title={isPortuguese ? 'Exportar como CSV' : 'Export as CSV'}
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            CSV
          </button>
          <button
            onClick={() => handleExport('json')}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-secondary-600 hover:text-secondary-800 border border-secondary-200 rounded-lg hover:border-secondary-300 transition-colors"
            title={isPortuguese ? 'Exportar como JSON' : 'Export as JSON'}
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            JSON
          </button>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {analyticsItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-secondary-50 rounded-xl p-4 text-center"
          >
            <div className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {item.value}{item.unit}
            </div>
            <div className="text-sm font-medium text-secondary-700 mb-1">
              {item.label}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {item.description}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Most Active Month */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4 border border-primary-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <SparklesIcon className="w-5 h-5 text-primary-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-primary-700">
              {isPortuguese ? 'Mês Mais Ativo' : 'Most Active Month'}
            </h4>
            <p className="text-sm text-primary-600">
              {analytics.mostActiveMonth.month} - {analytics.mostActiveMonth.newConnections} {isPortuguese ? 'novas conexões' : 'new connections'}
            </p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-4 p-3 bg-secondary-50 rounded-lg">
        <h5 className="text-sm font-medium text-secondary-700 mb-2">
          💡 {isPortuguese ? 'Dicas para Melhorar a Sua Rede:' : 'Tips to Improve Your Network:'}
        </h5>
        <ul className="text-xs text-secondary-600 space-y-1">
          <li>• {isPortuguese ? 'Participe em mais eventos para conhecer novas pessoas' : 'Attend more events to meet new people'}</li>
          <li>• {isPortuguese ? 'Interaja regularmente com as suas conexões' : 'Interact regularly with your connections'}</li>
          <li>• {isPortuguese ? 'Use os quebra-gelos para iniciar conversas' : 'Use conversation starters to begin chats'}</li>
        </ul>
      </div>
    </div>
  )
}