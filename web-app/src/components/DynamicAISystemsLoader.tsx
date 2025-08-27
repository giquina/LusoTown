'use client'

import React, { useState, Suspense, lazy, useCallback } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { 
  CpuChipIcon as Brain, 
  BoltIcon as Zap, 
  ArrowTrendingUpIcon as TrendingUp, 
  EyeIcon as Target,
  UsersIcon as Users,
  ChartBarSquareIcon
} from '@heroicons/react/24/outline'

// Dynamic imports for AI systems with Portuguese cultural context
const AINotificationDashboard = lazy(() => 
  import('@/components/AINotificationDashboard').then(module => ({
    default: module.default
  }))
)

const AIEnhancedMatchingEngine = lazy(() => 
  import('@/components/matches/AIEnhancedMatchingEngine').then(module => ({
    default: module.default
  }))
)

const AIMonitoringDashboard = lazy(() => 
  import('@/components/ai/AIMonitoringDashboard').then(module => ({
    default: module.default
  }))
)

const PredictiveCommunityAnalytics = lazy(() => 
  import('@/lib/ai/PredictiveCommunityAnalytics').then(module => ({
    default: module.PredictiveCommunityAnalyticsEngine
  }))
)

// AI System Loading States with Portuguese Cultural Context
function AISystemLoader({ type, title }: { type: string; title: string }) {
  const { language } = useLanguage()
  
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg border border-primary-200">
      <div className="relative">
        <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full"></div>
        <Brain className="absolute inset-0 w-6 h-6 m-auto text-primary-600" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-primary-900">{title}</h3>
      <p className="mt-2 text-sm text-primary-700 text-center max-w-md">
        {language === 'pt' 
          ? 'Carregando sistema de IA otimizado para comunidade de falantes de português...'
          : 'Loading AI system optimized for Portuguese-speaking community...'
        }
      </p>
      <div className="mt-4 flex items-center gap-2 text-xs text-primary-600">
        <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
        <span>
          {language === 'pt' ? 'Processamento Cultural Avançado' : 'Advanced Cultural Processing'}
        </span>
      </div>
    </div>
  )
}

// Error Boundary for AI Systems
function AISystemError({ error, retry, title }: { error: Error; retry: () => void; title: string }) {
  const { language } = useLanguage()
  
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
        <Zap className="w-6 h-6 text-red-600" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-red-900">{title}</h3>
      <p className="mt-2 text-sm text-red-700 text-center max-w-md">
        {language === 'pt' 
          ? 'Erro ao carregar sistema de IA. Tentando reconectar...'
          : 'AI system loading error. Attempting to reconnect...'
        }
      </p>
      <button
        onClick={retry}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
      >
        {language === 'pt' ? 'Tentar Novamente' : 'Retry Connection'}
      </button>
      <p className="mt-2 text-xs text-red-600">
        {error.message}
      </p>
    </div>
  )
}

type AISystemType = 'notifications' | 'matching' | 'analytics' | 'monitoring'

interface DynamicAISystemsLoaderProps {
  systems: AISystemType[]
  className?: string
}

export default function DynamicAISystemsLoader({ 
  systems, 
  className = "" 
}: DynamicAISystemsLoaderProps) {
  const { language } = useLanguage()
  const [loadedSystems, setLoadedSystems] = useState<Set<AISystemType>>(new Set())
  const [errors, setErrors] = useState<Map<AISystemType, Error>>(new Map())

  const systemConfig = {
    notifications: {
      title: language === 'pt' ? 'IA Notificações' : 'AI Notifications',
      icon: TrendingUp,
      component: AINotificationDashboard,
      description: language === 'pt' 
        ? 'Sistema inteligente de notificações culturais'
        : 'Intelligent cultural notifications system'
    },
    matching: {
      title: language === 'pt' ? 'IA Compatibilidade' : 'AI Matching',
      icon: Target,
      component: AIEnhancedMatchingEngine,
      description: language === 'pt'
        ? 'Motor de compatibilidade cultural avançado'
        : 'Advanced cultural compatibility engine'
    },
    analytics: {
      title: language === 'pt' ? 'IA Analytics' : 'AI Analytics',
      icon: ChartBarSquareIcon,
      component: PredictiveCommunityAnalytics,
      description: language === 'pt'
        ? 'Analytics preditivos da comunidade'
        : 'Predictive community analytics'
    },
    monitoring: {
      title: language === 'pt' ? 'IA Monitorização' : 'AI Monitoring',
      icon: Users,
      component: AIMonitoringDashboard,
      description: language === 'pt'
        ? 'Painel de monitorização de IA'
        : 'AI monitoring dashboard'
    }
  }

  const loadSystem = useCallback((systemType: AISystemType) => {
    setLoadedSystems(prev => new Set(prev).add(systemType))
    setErrors(prev => {
      const newErrors = new Map(prev)
      newErrors.delete(systemType)
      return newErrors
    })
  }, [])

  const handleError = useCallback((systemType: AISystemType, error: Error) => {
    setErrors(prev => new Map(prev).set(systemType, error))
    setLoadedSystems(prev => {
      const newLoaded = new Set(prev)
      newLoaded.delete(systemType)
      return newLoaded
    })
  }, [])

  const retrySystem = useCallback((systemType: AISystemType) => {
    setErrors(prev => {
      const newErrors = new Map(prev)
      newErrors.delete(systemType)
      return newErrors
    })
    // Force re-render to retry loading
    setLoadedSystems(prev => {
      const newLoaded = new Set(prev)
      newLoaded.delete(systemType)
      return newLoaded
    })
  }, [])

  return (
    <div className={`space-y-6 ${className}`}>
      {systems.map((systemType) => {
        const config = systemConfig[systemType]
        const error = errors.get(systemType)
        const Component = config.component

        return (
          <div key={systemType} className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* AI System Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-secondary-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <config.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-900">{config.title}</h3>
                  <p className="text-sm text-primary-700">{config.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  error ? 'bg-red-500' : 
                  loadedSystems.has(systemType) ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'
                }`} />
                <span className="text-xs text-gray-600">
                  {error ? 'Error' : loadedSystems.has(systemType) ? 'Loaded' : 'Loading...'}
                </span>
              </div>
            </div>

            {/* AI System Content */}
            <div className="p-4">
              {error ? (
                <AISystemError 
                  error={error} 
                  retry={() => retrySystem(systemType)}
                  title={config.title}
                />
              ) : (
                <Suspense fallback={<AISystemLoader type={systemType} title={config.title} />}>
                  <ErrorBoundary
                    onError={(error) => handleError(systemType, error)}
                    fallback={
                      <AISystemError 
                        error={new Error('Component failed to load')} 
                        retry={() => retrySystem(systemType)}
                        title={config.title}
                      />
                    }
                  >
                    <Component onLoad={() => loadSystem(systemType)} />
                  </ErrorBoundary>
                </Suspense>
              )}
            </div>
          </div>
        )
      })}

      {/* Performance Metrics */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {language === 'pt' ? 'Performance da IA' : 'AI Performance'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>
              {language === 'pt' ? 'Carregados:' : 'Loaded:'} {loadedSystems.size}/{systems.length}
            </span>
            <span>
              {language === 'pt' ? 'Erros:' : 'Errors:'} {errors.size}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Simple Error Boundary Component
class ErrorBoundary extends React.Component<{
  children: React.ReactNode
  fallback: React.ReactNode
  onError?: (error: Error) => void
}, { hasError: boolean }> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('AI System Error:', error, errorInfo)
    this.props.onError?.(error)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}