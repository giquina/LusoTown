'use client'

import React, { Suspense, lazy, useState, useCallback } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useAIPerformance } from '@/hooks/useAIPerformance'
import { logger } from '@/utils/logger'
import { 
  HeartIcon, 
  UserGroupIcon, 
  ChartBarSquareIcon as TargetIcon,
  ExclamationTriangleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

// Lazy load the AI Enhanced Matching Engine
const AIEnhancedMatchingEngine = lazy(() => 
  import('@/components/matches/AIEnhancedMatchingEngine').then(module => ({
    default: module.default
  })).catch(error => {
    logger.error('Failed to load AIEnhancedMatchingEngine for Portuguese-speaking community', error, {
      area: 'matching',
      culturalContext: 'lusophone',
      action: 'ai_matching_engine_load_error'
    })
    // Return fallback component
    return {
      default: () => (
        <div className="p-6 text-center">
          <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-red-900 mb-2">
            AI Matching System Temporarily Unavailable
          </h3>
          <p className="text-red-700">
            The Portuguese cultural compatibility system is currently unavailable.
          </p>
        </div>
      )
    }
  })
)

// Loading component with Portuguese cultural matching context
function AIMatchingLoader() {
  const { language } = useLanguage()
  
  return (
    <div className="p-8 space-y-6">
      {/* Loading Header */}
      <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded-lg p-6 relative overflow-hidden animate-pulse">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <HeartIcon className="h-8 w-8 animate-pulse" />
            <SparklesIcon className="absolute -top-1 -right-1 h-4 w-4 animate-spin" />
          </div>
          <div>
            <div className="h-6 bg-white/20 rounded w-72 mb-2"></div>
            <div className="h-4 bg-white/15 rounded w-96"></div>
          </div>
        </div>
      </div>

      {/* Loading Match Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
            {/* Profile Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100"></div>
            
            <div className="p-4 space-y-3">
              {/* Name and Age */}
              <div className="flex items-center justify-between">
                <div className="h-5 bg-gray-300 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-8"></div>
              </div>
              
              {/* Cultural Region */}
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              
              {/* Compatibility Score */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-8"></div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full animate-pulse" 
                       style={{ width: `${60 + (i * 10)}%` }}></div>
                </div>
              </div>
              
              {/* Cultural Tags */}
              <div className="flex flex-wrap gap-1">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="h-6 bg-gray-200 rounded-full w-16"></div>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <div className="flex-1 h-10 bg-primary-100 rounded-lg"></div>
                <div className="h-10 w-10 bg-gray-100 rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading Status */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-700 rounded-full">
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">
            {language === 'pt' 
              ? 'Analisando compatibilidade cultural portuguesa...'
              : 'Analyzing Portuguese cultural compatibility...'
            }
          </span>
        </div>
      </div>
    </div>
  )
}

// Error component for AI matching system
function AIMatchingError({ error, retry }: { error: Error; retry: () => void }) {
  const { language } = useLanguage()
  
  return (
    <div className="p-8 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
  <HeartIcon className="w-8 h-8 text-red-600" />
      </div>
      <h3 className="text-lg font-semibold text-red-900 mb-2">
        {language === 'pt' 
          ? 'Sistema de Compatibilidade Temporariamente Indisponível'
          : 'Compatibility System Temporarily Unavailable'
        }
      </h3>
      <p className="text-red-700 mb-4 max-w-md mx-auto">
        {language === 'pt'
          ? 'O sistema de compatibilidade cultural não conseguiu carregar. Verificando a conexão...'
          : 'The cultural compatibility system failed to load. Checking connection...'
        }
      </p>
      <button
        onClick={retry}
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
      >
        {language === 'pt' ? 'Tentar Novamente' : 'Try Again'}
      </button>
      <div className="mt-4 p-3 bg-gray-50 rounded-lg text-left max-w-md mx-auto">
        <p className="text-xs text-gray-600 font-medium mb-1">
          {language === 'pt' ? 'Detalhes técnicos:' : 'Technical details:'}
        </p>
        <p className="text-xs text-gray-500 font-mono break-all">
          {error.message}
        </p>
      </div>
    </div>
  )
}

interface DynamicAIMatchingEngineProps {
  className?: string
  onLoad?: () => void
  maxMatches?: number
  filters?: Record<string, any>
}

export default function DynamicAIMatchingEngine({ 
  className = "",
  onLoad,
  maxMatches = 12,
  filters = {}
}: DynamicAIMatchingEngineProps) {
  const { language } = useLanguage()
  const { performance, loadService, getServiceStatus } = useAIPerformance()
  const [error, setError] = useState<Error | null>(null)
  const [retryKey, setRetryKey] = useState(0)

  const handleRetry = useCallback(() => {
    setError(null)
    setRetryKey(prev => prev + 1)
    loadService('matching').catch(err => {
      setError(err)
    })
  }, [loadService])

  const handleLoad = useCallback(() => {
    onLoad?.()
    loadService('matching').then(() => {
      logger.info('AI Matching Engine loaded successfully for Portuguese cultural compatibility', {
        area: 'matching',
        culturalContext: 'lusophone',
        action: 'ai_matching_engine_loaded'
      })
    }).catch(err => {
      logger.error('Failed to load AI Matching Engine for Portuguese-speaking community', err, {
        area: 'matching',
        culturalContext: 'lusophone',
        action: 'ai_matching_engine_load_failed'
      })
      setError(err)
    })
  }, [onLoad, loadService])

  // Initialize service loading on mount
  React.useEffect(() => {
    handleLoad()
  }, [handleLoad, retryKey])

  if (error) {
    return <AIMatchingError error={error} retry={handleRetry} />
  }

  const serviceStatus = getServiceStatus('matching')
  const metrics = performance.services.get('matching')

  return (
    <div className={`relative ${className}`}>
      {/* Performance & Cultural Accuracy Indicators */}
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        {metrics && (
          <>
            {/* Load Time */}
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              metrics.loadTime <= 100 
                ? 'bg-green-100 text-green-800'
                : metrics.loadTime <= 300
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {metrics.loadTime.toFixed(0)}ms
            </div>
            
            {/* Cultural Accuracy */}
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              metrics.culturalAccuracy >= 95
                ? 'bg-purple-100 text-purple-800'
                : metrics.culturalAccuracy >= 85
                ? 'bg-blue-100 text-blue-800'
                : 'bg-orange-100 text-orange-800'
            }`}>
              {language === 'pt' ? 'Cultural' : 'Cultural'} {metrics.culturalAccuracy.toFixed(0)}%
            </div>
          </>
        )}
      </div>

      {/* Service Status Badge */}
      {serviceStatus !== 'loaded' && (
        <div className="absolute top-2 left-2 z-10">
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            serviceStatus === 'loading' ? 'bg-pink-100 text-pink-800' :
            serviceStatus === 'error' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              serviceStatus === 'loading' ? 'bg-pink-500 animate-pulse' :
              serviceStatus === 'error' ? 'bg-red-500' :
              'bg-gray-500'
            }`} />
            {serviceStatus === 'loading' && (
              <>
                <HeartIcon className="w-3 h-3 animate-pulse" />
                <span>{language === 'pt' ? 'Analisando' : 'Analyzing'}</span>
              </>
            )}
            {serviceStatus === 'error' && (language === 'pt' ? 'Erro IA' : 'AI Error')}
            {serviceStatus === 'not-loaded' && (language === 'pt' ? 'Aguardando' : 'Waiting')}
          </div>
        </div>
      )}

      {/* Dynamic AI Matching Engine */}
      <Suspense fallback={<AIMatchingLoader />}>
        <ErrorBoundary
          onError={(error) => setError(error)}
          fallback={<AIMatchingError error={new Error('Matching component crashed')} retry={handleRetry} />}
        >
          <AIEnhancedMatchingEngine 
            maxMatches={maxMatches}
            filters={filters}
          />
        </ErrorBoundary>
      </Suspense>

      {/* Portuguese Cultural Context Information */}
      {serviceStatus === 'loaded' && metrics && (
        <div className="mt-4 p-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border border-primary-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-primary-600" />
              <span className="text-primary-800 font-medium">
                {language === 'pt' 
                  ? 'IA otimizada para compatibilidade cultural portuguesa'
                  : 'AI optimized for Portuguese cultural compatibility'
                }
              </span>
            </div>
            <div className="flex items-center gap-2 text-primary-700">
              <TargetIcon className="w-4 h-4" />
              <span>{metrics.culturalAccuracy.toFixed(1)}% {language === 'pt' ? 'precisão' : 'accuracy'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Error Boundary Class Component for AI Matching
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
    logger.error('AI Matching Engine Error in Portuguese cultural compatibility system', error, {
      area: 'matching',
      culturalContext: 'lusophone',
      action: 'ai_matching_engine_error_boundary',
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