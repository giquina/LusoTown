'use client'

import React, { Suspense, lazy, useState, useCallback } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useAIPerformance } from '@/hooks/useAIPerformance'
import { logger } from '@/utils/logger'
import { 
  CpuChipIcon as Brain, 
  BoltIcon as Zap, 
  TrendingUpIcon as TrendingUp,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

// Lazy load the original AI Notification Dashboard
const AINotificationDashboard = lazy(() => 
  import('@/components/AINotificationDashboard').then(module => ({
    default: module.default
  })).catch(error => {
    logger.error('Failed to load AINotificationDashboard for Portuguese-speaking community', error, {
      area: 'ai',
      culturalContext: 'lusophone',
      action: 'ai_notification_dashboard_load_error'
    })
    // Return a fallback component
    return {
      default: () => (
        <div className="p-6 text-center">
          <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-red-900 mb-2">
            AI System Temporarily Unavailable
          </h3>
          <p className="text-red-700">
            The AI notification system is currently unavailable. Please try again later.
          </p>
        </div>
      )
    }
  })
)

// Loading component with Portuguese cultural context
function AINotificationLoader() {
  const { language } = useLanguage()
  
  return (
    <div className="p-8 space-y-6">
      {/* Loading Header */}
      <div className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white rounded-lg p-6 relative overflow-hidden animate-pulse">
        <div className="flex items-center space-x-3">
          <Brain className="h-8 w-8 animate-spin" />
          <div>
            <div className="h-6 bg-white/20 rounded w-64 mb-2"></div>
            <div className="h-4 bg-white/15 rounded w-96"></div>
          </div>
        </div>
      </div>

      {/* Loading Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 animate-pulse">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <div className="h-5 bg-gray-300 rounded w-32"></div>
              </div>
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="p-4 space-y-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-gray-200 rounded flex-shrink-0 mt-0.5"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Loading Status */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">
            {language === 'pt' 
              ? 'Carregando IA de notificações culturais...'
              : 'Loading cultural notifications AI...'
            }
          </span>
        </div>
      </div>
    </div>
  )
}

// Error boundary specifically for AI systems
function AISystemError({ error, retry }: { error: Error; retry: () => void }) {
  const { language } = useLanguage()
  
  return (
    <div className="p-8 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
      </div>
      <h3 className="text-lg font-semibold text-red-900 mb-2">
        {language === 'pt' 
          ? 'Sistema de IA Temporariamente Indisponível'
          : 'AI System Temporarily Unavailable'
        }
      </h3>
      <p className="text-red-700 mb-4 max-w-md mx-auto">
        {language === 'pt'
          ? 'O sistema de notificações inteligentes encontrou um problema. Nossa equipe foi notificada.'
          : 'The intelligent notification system encountered an issue. Our team has been notified.'
        }
      </p>
      <button
        onClick={retry}
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
      >
        {language === 'pt' ? 'Tentar Novamente' : 'Try Again'}
      </button>
      <p className="mt-4 text-xs text-gray-500 font-mono">
        Error: {error.message}
      </p>
    </div>
  )
}

interface DynamicAINotificationDashboardProps {
  className?: string
  onLoad?: () => void
}

export default function DynamicAINotificationDashboard({ 
  className = "",
  onLoad
}: DynamicAINotificationDashboardProps) {
  const { language } = useLanguage()
  const { performance, loadService, getServiceStatus } = useAIPerformance()
  const [error, setError] = useState<Error | null>(null)
  const [retryKey, setRetryKey] = useState(0)

  const handleRetry = useCallback(() => {
    setError(null)
    setRetryKey(prev => prev + 1)
    loadService('notifications').catch(err => {
      setError(err)
    })
  }, [loadService])

  const handleLoad = useCallback(() => {
    onLoad?.()
    loadService('notifications').then(() => {
      logger.info('AI Notification Dashboard loaded successfully for Portuguese-speaking community', {
        area: 'ai',
        culturalContext: 'lusophone',
        action: 'ai_notification_dashboard_loaded'
      })
    }).catch(err => {
      logger.error('Failed to load AI Notification Dashboard for Portuguese-speaking community', err, {
        area: 'ai',
        culturalContext: 'lusophone',
        action: 'ai_notification_dashboard_load_failed'
      })
      setError(err)
    })
  }, [onLoad, loadService])

  // Initialize service loading on mount
  React.useEffect(() => {
    handleLoad()
  }, [handleLoad, retryKey])

  if (error) {
    return <AISystemError error={error} retry={handleRetry} />
  }

  const serviceStatus = getServiceStatus('notifications')
  const metrics = performance.services.get('notifications')

  return (
    <div className={`relative ${className}`}>
      {/* Performance Indicator */}
      {metrics && (
        <div className="absolute top-2 right-2 z-10">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            metrics.loadTime <= 100 
              ? 'bg-green-100 text-green-800'
              : metrics.loadTime <= 300
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {metrics.loadTime.toFixed(0)}ms
          </div>
        </div>
      )}

      {/* Service Status Badge */}
      {serviceStatus !== 'loaded' && (
        <div className="absolute top-2 left-2 z-10">
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            serviceStatus === 'loading' ? 'bg-blue-100 text-blue-800' :
            serviceStatus === 'error' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              serviceStatus === 'loading' ? 'bg-blue-500 animate-pulse' :
              serviceStatus === 'error' ? 'bg-red-500' :
              'bg-gray-500'
            }`} />
            {serviceStatus === 'loading' && (language === 'pt' ? 'Carregando' : 'Loading')}
            {serviceStatus === 'error' && (language === 'pt' ? 'Erro' : 'Error')}
            {serviceStatus === 'not-loaded' && (language === 'pt' ? 'Aguardando' : 'Waiting')}
          </div>
        </div>
      )}

      {/* Dynamic AI Dashboard */}
      <Suspense fallback={<AINotificationLoader />}>
        <ErrorBoundary
          onError={(error) => setError(error)}
          fallback={<AISystemError error={new Error('Component crashed')} retry={handleRetry} />}
        >
          <AINotificationDashboard />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}

// Error Boundary Class Component
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
    logger.error('AI Notification Dashboard Error in Portuguese community system', error, {
      area: 'ai',
      culturalContext: 'lusophone',
      action: 'ai_notification_dashboard_error_boundary',
      errorInfo: errorInfo?.componentStack || 'No component stack available'
    })
    this.props.onError?.(error)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}