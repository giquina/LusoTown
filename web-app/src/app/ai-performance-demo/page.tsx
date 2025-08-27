'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useAIPerformance } from '@/hooks/useAIPerformance'
import DynamicAISystemsLoader from '@/components/DynamicAISystemsLoader'
import DynamicAINotificationDashboard from '@/components/ai/DynamicAINotificationDashboard'
import DynamicAIMatchingEngine from '@/components/matches/DynamicAIMatchingEngine'
import { 
  CpuChipIcon as Brain, 
  BoltIcon as Zap, 
  ChartBarSquareIcon,
  PlayIcon,
  PauseIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

export default function AIPerformanceDemoPage() {
  const { language, t } = useLanguage()
  const { 
    performance, 
    loadService, 
    loadMultipleServices, 
    refreshMetrics, 
    disposeServices,
    getServiceStatus 
  } = useAIPerformance()
  
  const [activeDemo, setActiveDemo] = useState<'loader' | 'notifications' | 'matching' | null>(null)
  const [isLoadingDemo, setIsLoadingDemo] = useState(false)

  const handleLoadDemo = async (demoType: 'loader' | 'notifications' | 'matching') => {
    setIsLoadingDemo(true)
    setActiveDemo(demoType)
    
    try {
      if (demoType === 'notifications') {
        await loadService('notifications')
      } else if (demoType === 'matching') {
        await loadService('matching')
      } else if (demoType === 'loader') {
        await loadMultipleServices(['notifications', 'matching', 'analytics'])
      }
    } catch (error) {
      console.error(`Failed to load ${demoType} demo:`, error)
    } finally {
      setIsLoadingDemo(false)
    }
  }

  const handleDisposeAll = async () => {
    setIsLoadingDemo(true)
    setActiveDemo(null)
    await disposeServices()
    setIsLoadingDemo(false)
  }

  const performanceData = Array.from(performance.services.entries()).map(([name, metrics]) => ({
    name,
    ...metrics,
    status: getServiceStatus(name)
  }))

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white rounded-lg p-8 mb-8">
          <div className="flex items-center space-x-4">
            <Brain className="h-10 w-10" />
            <div>
              <h1 className="text-3xl font-bold">
                {language === 'pt' 
                  ? 'Demo de Performance dos Sistemas de IA'
                  : 'AI Systems Performance Demo'
                }
              </h1>
              <p className="text-white/90 mt-2">
                {language === 'pt'
                  ? 'Teste de carregamento dinâmico e otimização de bundle para comunidade de falantes de português'
                  : 'Dynamic loading and bundle optimization testing for Portuguese-speaking community'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'pt' ? 'Serviços Carregados' : 'Services Loaded'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{performance.services.size}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'pt' ? 'Tempo Total' : 'Total Load Time'}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {performance.totalLoadTime.toFixed(0)}ms
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ChartBarSquareIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'pt' ? 'Precisão Cultural' : 'Cultural Accuracy'}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {performanceData.length > 0 
                    ? (performanceData.reduce((sum, item) => sum + item.culturalAccuracy, 0) / performanceData.length).toFixed(1)
                    : '0'
                  }%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <ArrowPathIcon className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'pt' ? 'Erros' : 'Errors'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{performance.errors.size}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Controls */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {language === 'pt' ? 'Controles de Demo' : 'Demo Controls'}
          </h2>
          
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleLoadDemo('notifications')}
              disabled={isLoadingDemo}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoadingDemo && activeDemo === 'notifications' ? (
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
              ) : (
                <PlayIcon className="h-5 w-5" />
              )}
              {language === 'pt' ? 'IA Notificações' : 'AI Notifications'}
            </button>

            <button
              onClick={() => handleLoadDemo('matching')}
              disabled={isLoadingDemo}
              className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50"
            >
              {isLoadingDemo && activeDemo === 'matching' ? (
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
              ) : (
                <PlayIcon className="h-5 w-5" />
              )}
              {language === 'pt' ? 'IA Compatibilidade' : 'AI Matching'}
            </button>

            <button
              onClick={() => handleLoadDemo('loader')}
              disabled={isLoadingDemo}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {isLoadingDemo && activeDemo === 'loader' ? (
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
              ) : (
                <PlayIcon className="h-5 w-5" />
              )}
              {language === 'pt' ? 'Carregar Tudo' : 'Load All Systems'}
            </button>

            <button
              onClick={refreshMetrics}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              <ArrowPathIcon className="h-5 w-5" />
              {language === 'pt' ? 'Atualizar Métricas' : 'Refresh Metrics'}
            </button>

            <button
              onClick={handleDisposeAll}
              disabled={isLoadingDemo}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              <PauseIcon className="h-5 w-5" />
              {language === 'pt' ? 'Limpar Tudo' : 'Dispose All'}
            </button>
          </div>
        </div>

        {/* Performance Metrics Table */}
        {performanceData.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {language === 'pt' ? 'Métricas de Performance' : 'Performance Metrics'}
            </h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'pt' ? 'Serviço' : 'Service'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'pt' ? 'Status' : 'Status'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'pt' ? 'Tempo de Carga' : 'Load Time'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'pt' ? 'Precisão Cultural' : 'Cultural Accuracy'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'pt' ? 'Cache Hit' : 'Cache Hit Rate'}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {performanceData.map((item, index) => (
                    <tr key={item.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item.status === 'loaded' ? 'bg-green-100 text-green-800' :
                          item.status === 'loading' ? 'bg-yellow-100 text-yellow-800' :
                          item.status === 'error' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`font-medium ${
                          item.loadTime <= 100 ? 'text-green-600' :
                          item.loadTime <= 300 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {item.loadTime.toFixed(0)}ms
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`font-medium ${
                          item.culturalAccuracy >= 95 ? 'text-purple-600' :
                          item.culturalAccuracy >= 85 ? 'text-blue-600' :
                          'text-orange-600'
                        }`}>
                          {item.culturalAccuracy.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {(item.cacheHitRate * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Demo Content */}
        <div className="space-y-8">
          {activeDemo === 'loader' && (
            <DynamicAISystemsLoader 
              systems={['notifications', 'matching', 'analytics']}
              className="animate-fadeIn"
            />
          )}

          {activeDemo === 'notifications' && (
            <DynamicAINotificationDashboard className="animate-fadeIn" />
          )}

          {activeDemo === 'matching' && (
            <DynamicAIMatchingEngine className="animate-fadeIn" />
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            {language === 'pt'
              ? 'Demo de otimização de bundle para sistemas de IA da comunidade de falantes de português'
              : 'Bundle optimization demo for Portuguese-speaking community AI systems'
            }
          </p>
          <p className="text-xs mt-1">
            {performance.lastUpdated && (
              <>
                {language === 'pt' ? 'Última atualização: ' : 'Last updated: '}
                {performance.lastUpdated.toLocaleTimeString()}
              </>
            )}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}