'use client'

import React, { Component, ErrorInfo, ReactNode, memo, useCallback, useMemo } from 'react'
import { ExclamationTriangleIcon, HomeIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config/routes'
import logger from '@/utils/logger'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  t?: (key: string, fallback?: string) => string
  componentName?: string
  level?: 'page' | 'component' | 'critical'
  enableRetry?: boolean
  maxRetries?: number
  enableTelemetry?: boolean
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
  retryCount: number
  isRetrying: boolean
  errorId: string
  timestamp: number
}

class ErrorBoundary extends Component<Props, State> {
  private retryTimeout?: NodeJS.Timeout
  private errorReportTimeout?: NodeJS.Timeout
  private maxRetries: number

  constructor(props: Props) {
    super(props)
    this.maxRetries = props.maxRetries ?? 3
    this.state = {
      hasError: false,
      retryCount: 0,
      isRetrying: false,
      errorId: '',
      timestamp: 0
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Generate unique error ID for tracking
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    return {
      hasError: true,
      error,
      errorId,
      timestamp: Date.now(),
      isRetrying: false
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { componentName, level = 'component', enableTelemetry = true } = this.props
    
    // Enhanced error logging with Portuguese cultural context
    const errorContext = {
      component: componentName || 'Unknown',
      level,
      errorId: this.state.errorId,
      timestamp: this.state.timestamp,
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'SSR',
      url: typeof window !== 'undefined' ? window.location.href : 'Unknown',
      viewport: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'Unknown',
      language: typeof window !== 'undefined' ? document.documentElement.lang : 'Unknown',
      culturalContext: 'Portuguese-speaking community platform'
    }

    // Log error with context
    if (process.env.NODE_ENV === 'development') {
      logger.error('ErrorBoundary caught error:', {
        error,
        errorInfo,
        context: errorContext
      })
    }

    // Update state with error info
    this.setState({ errorInfo })

    // Call custom error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Send telemetry in production (non-blocking)
    if (process.env.NODE_ENV === 'production' && enableTelemetry) {
      this.errorReportTimeout = setTimeout(() => {
        this.reportError(error, errorInfo, errorContext)
      }, 100) // Defer to avoid blocking UI
    }
  }

  handleRetry = () => {
    const { retryCount } = this.state
    
    if (retryCount >= this.maxRetries) {
      logger.warn(`Max retry attempts (${this.maxRetries}) reached for component ${this.props.componentName}`)
      return
    }

    this.setState({
      isRetrying: true,
      retryCount: retryCount + 1
    })

    // Debounced retry to prevent rapid error loops
    this.retryTimeout = setTimeout(() => {
      this.setState({
        hasError: false,
        error: undefined,
        errorInfo: undefined,
        isRetrying: false
      })
    }, Math.min(1000 * Math.pow(2, retryCount), 5000)) // Exponential backoff, max 5s
  }

  private reportError = async (error: Error, errorInfo: ErrorInfo, context: any) => {
    try {
      // Report to logging service (placeholder for actual implementation)
      const errorReport = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        context,
        retryCount: this.state.retryCount
      }
      
      // In a real implementation, send to Sentry, LogRocket, etc.
      logger.info('Error reported to telemetry service:', errorReport)
    } catch (reportError) {
      logger.error('Failed to report error to telemetry:', reportError)
    }
  }

  componentWillUnmount() {
    // Cleanup timeouts to prevent memory leaks
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout)
    }
    if (this.errorReportTimeout) {
      clearTimeout(this.errorReportTimeout)
    }
  }

  render() {
    const { isRetrying, hasError, retryCount } = this.state
    const { enableRetry = true, level = 'component' } = this.props
    
    if (hasError) {
      // Show loading during retry
      if (isRetrying) {
        return (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <span className="ml-3 text-gray-600">Retrying...</span>
          </div>
        )
      }

      // Custom fallback UI provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      const t = this.props.t || ((key: string, fallback?: string) => fallback || key)
      const isPageLevel = level === 'page' || level === 'critical'
      const isCritical = level === 'critical'
      const canRetry = enableRetry && retryCount < this.maxRetries

      // Minimal error UI for component-level errors
      if (!isPageLevel) {
        return (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-2">
            <div className="flex items-start">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-red-800">
                  {t('error.component.title', 'Component Error')}
                </h4>
                <p className="text-sm text-red-700 mt-1">
                  {isCritical 
                    ? t('error.component.critical', 'A critical component failed to load.')
                    : t('error.component.description', 'This section is temporarily unavailable.')
                  }
                </p>
                {canRetry && (
                  <button
                    onClick={this.handleRetry}
                    disabled={isRetrying}
                    className="mt-2 text-sm bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200 transition-colors disabled:opacity-50"
                  >
                    {t('error.boundary.retry', 'Try again')} {retryCount > 0 && `(${retryCount}/${this.maxRetries})`}
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      }

      // Full-page error UI for page-level errors
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="text-center">
                <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-red-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isCritical 
                    ? t('error.boundary.critical-title', 'Critical System Error')
                    : t('error.boundary.title', 'Something went wrong')
                  }
                </h2>
                <p className="text-gray-600 mb-6">
                  {isCritical
                    ? t('error.boundary.critical-description', 'A critical error has occurred. Please refresh the page or contact support.')
                    : t('error.boundary.description', 'An unexpected error occurred. Please try again or contact support if the problem persists.')
                  }
                </p>
                
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="text-left mb-6 p-4 bg-red-50 rounded-lg">
                    <summary className="cursor-pointer text-red-800 font-medium mb-2">
                      {t('error.boundary.details-title', 'Error details (development mode)')}
                    </summary>
                    <pre className="text-xs text-red-700 overflow-auto max-h-32">
                      Error ID: {this.state.errorId}\n
                      Component: {this.props.componentName || 'Unknown'}\n
                      {this.state.error.toString()}\n
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </details>
                )}

                <div className="space-y-3">
                  {canRetry && (
                    <button
                      onClick={this.handleRetry}
                      disabled={isRetrying}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50"
                    >
                      <ArrowPathIcon className="w-4 h-4 mr-2" />
                      {t('error.boundary.retry', 'Try again')} {retryCount > 0 && `(${retryCount}/${this.maxRetries})`}
                    </button>
                  )}
                  
                  <button
                    onClick={() => window.location.href = ROUTES.home}
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                  >
                    <HomeIcon className="w-4 h-4 mr-2" />
                    {t('error.boundary.home', 'Go back home')}
                  </button>
                  
                  <a
                    href={`mailto:support@lusotown.com?subject=Error Report&body=Error ID: ${this.state.errorId}%0AComponent: ${this.props.componentName}%0ATimestamp: ${new Date(this.state.timestamp).toISOString()}%0A%0AAn error occurred on the LusoTown Portuguese-speaking community platform.`}
                    className="w-full flex justify-center py-2 px-4 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    {t('error.boundary.contact-support', 'Contact technical support')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// HOC for easy wrapping of components
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
  onError?: (error: Error, errorInfo: ErrorInfo) => void
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback} onError={onError}>
      <Component {...props} />
    </ErrorBoundary>
  )
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  return WrappedComponent
}

// Specialized Error Boundary for different sections (legacy - use PageErrorBoundaryWithTranslations)
export function PageErrorBoundary({ children }: { children: ReactNode }) {
  return <PageErrorBoundaryWithTranslations>{children}</PageErrorBoundaryWithTranslations>
}

export const ComponentErrorBoundary = memo(({ 
  children, 
  componentName,
  level = 'component',
  enableRetry = true,
  maxRetries = 3
}: { 
  children: ReactNode
  componentName?: string
  level?: 'page' | 'component' | 'critical'
  enableRetry?: boolean
  maxRetries?: number
}) => {
  const onError = useCallback((error: Error, errorInfo: ErrorInfo) => {
    logger.error(`${componentName || 'Component'} Error:`, {
      error,
      errorInfo,
      level,
      component: componentName
    })
  }, [componentName, level])

  return (
    <ErrorBoundaryWithTranslations
      componentName={componentName}
      level={level}
      enableRetry={enableRetry}
      maxRetries={maxRetries}
      onError={onError}
    >
      {children}
    </ErrorBoundaryWithTranslations>
  )
})

// Safe hook that handles missing context during SSG
function useSafeLanguage() {
  try {
    return useLanguage()
  } catch (error) {
    // Fallback for when LanguageProvider is not available (SSG)
    return {
      t: (key: string, fallback?: string) => fallback || key,
      language: 'en' as const,
      setLanguage: () => {},
      isLoading: false
    }
  }
}

// Optimized component error fallback with translations
const ComponentErrorFallback = memo(({ componentName, level }: { componentName?: string, level?: string }) => {
  const { t } = useSafeLanguage()
  
  const handleReload = useCallback(() => {
    window.location.reload()
  }, [])
  
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-red-800 text-sm">
        {t('error.component.loading-error', 'Error loading')} {componentName || 'component'}.
        {level === 'critical' && (
          <span className="block mt-1 text-red-900 font-medium">
            {t('error.component.critical-notice', 'This is a critical component that affects core functionality.')}
          </span>
        )}
        <button 
          onClick={handleReload}
          className="ml-2 text-red-600 hover:text-red-700 underline transition-colors"
        >
          {t('error.component.reload', 'Reload page')}
        </button>
      </p>
    </div>
  )
})

// Optimized functional wrapper with translations and performance tracking
export const ErrorBoundaryWithTranslations = memo(({ 
  children, 
  fallback, 
  onError,
  componentName,
  level = 'component',
  enableRetry = true,
  maxRetries = 3,
  enableTelemetry = true
}: { 
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  componentName?: string
  level?: 'page' | 'component' | 'critical'
  enableRetry?: boolean
  maxRetries?: number
  enableTelemetry?: boolean
}) => {
  const { t } = useSafeLanguage()
  
  const memoizedFallback = useMemo(() => {
    return fallback || <ComponentErrorFallback componentName={componentName} level={level} />
  }, [fallback, componentName, level])
  
  return (
    <ErrorBoundary 
      fallback={memoizedFallback}
      onError={onError}
      componentName={componentName}
      level={level}
      enableRetry={enableRetry}
      maxRetries={maxRetries}
      enableTelemetry={enableTelemetry}
      t={t}
    >
      {children}
    </ErrorBoundary>
  )
})

export function PageErrorBoundaryWithTranslations({ children }: { children: ReactNode }) {
  const { t } = useSafeLanguage()
  
  return (
    <ErrorBoundary
      t={t}
      onError={(error, errorInfo) => {
        console.error('Page Error:', error, errorInfo)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}

export default ErrorBoundaryWithTranslations