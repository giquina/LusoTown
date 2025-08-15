'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { ExclamationTriangleIcon, HomeIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  t?: (key: string, fallback?: string) => string
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    // Update state with error info
    this.setState({
      error,
      errorInfo
    })

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // In production, you could send error to logging service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error tracking service
      // logErrorToService(error, errorInfo)
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      const t = this.props.t || ((key: string, fallback?: string) => fallback || key)

      // Default fallback UI
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="text-center">
                <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-action-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {t('error.boundary.title', 'Something went wrong')}
                </h2>
                <p className="text-gray-600 mb-6">
                  {t('error.boundary.description', 'An unexpected error occurred. Please try again or contact support if the problem persists.')}
                </p>
                
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="text-left mb-6 p-4 bg-red-50 rounded-lg">
                    <summary className="cursor-pointer text-red-800 font-medium mb-2">
                      {t('error.boundary.details-title', 'Error details (development mode)')}
                    </summary>
                    <pre className="text-xs text-red-700 overflow-auto max-h-32">
                      {this.state.error.toString()}
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </details>
                )}

                <div className="space-y-3">
                  <button
                    onClick={this.handleRetry}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                  >
                    <ArrowPathIcon className="w-4 h-4 mr-2" />
                    {t('error.boundary.retry', 'Try again')}
                  </button>
                  
                  <button
                    onClick={() => window.location.href = '/'}
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                  >
                    <HomeIcon className="w-4 h-4 mr-2" />
                    {t('error.boundary.home', 'Go back home')}
                  </button>
                  
                  <a
                    href="mailto:support@lusotown.com?subject=Error Report&body=An error occurred on the LusoTown platform"
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

export function ComponentErrorBoundary({ 
  children, 
  componentName 
}: { 
  children: ReactNode
  componentName?: string 
}) {
  return (
    <ErrorBoundaryWithTranslations
      fallback={
        <ComponentErrorFallback componentName={componentName} />
      }
      onError={(error, errorInfo) => {
        console.error(`${componentName || 'Component'} Error:`, error, errorInfo)
      }}
    >
      {children}
    </ErrorBoundaryWithTranslations>
  )
}

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

// Component error fallback with translations
function ComponentErrorFallback({ componentName }: { componentName?: string }) {
  const { t } = useSafeLanguage()
  
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-red-800 text-sm">
        {t('error.component.loading-error', 'Error loading')} {componentName || 'component'}. 
        <button 
          onClick={() => window.location.reload()} 
          className="ml-2 text-red-600 hover:text-red-700 underline"
        >
          {t('error.component.reload', 'Reload page')}
        </button>
      </p>
    </div>
  )
}

// Functional wrapper components that provide translations
export function ErrorBoundaryWithTranslations({ 
  children, 
  fallback, 
  onError 
}: { 
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}) {
  const { t } = useSafeLanguage()
  
  return (
    <ErrorBoundary 
      fallback={fallback} 
      onError={onError}
      t={t}
    >
      {children}
    </ErrorBoundary>
  )
}

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