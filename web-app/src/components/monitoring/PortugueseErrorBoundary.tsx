'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { ExclamationTriangleIcon, ArrowPathIcon, HomeIcon, LanguageIcon } from '@heroicons/react/24/outline'
import { getContextualErrorMessage } from '@/lib/monitoring/portuguese-error-messages'
import { errorTracker } from '@/lib/monitoring/error-tracker'
import { PORTUGUESE_ERROR_CONTEXTS } from '@/config/error-monitoring'
import { ROUTES } from '@/config/routes'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  portugueseContext?: keyof typeof PORTUGUESE_ERROR_CONTEXTS
  language?: 'en' | 'pt'
  isMobileOptimized?: boolean
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
  language: 'en' | 'pt'
}

class PortugueseErrorBoundary extends Component<Props, State> {
  private retryCount = 0
  private maxRetries = 3

  constructor(props: Props) {
    super(props)
    this.state = { 
      hasError: false,
      language: props.language || 'en'
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Enhanced error tracking with Portuguese context
    this.setState({
      error,
      errorInfo
    })

    // Track the error with Portuguese community context
    errorTracker.trackError({
      message: error.message,
      type: 'CLIENT_ERROR' as any,
      severity: 'HIGH' as any,
      context: this.props.portugueseContext ? 
        PORTUGUESE_ERROR_CONTEXTS[this.props.portugueseContext] : 
        'component-error',
      stack: error.stack,
      portugueseContext: {
        language: this.state.language,
        culturalFeature: this.props.portugueseContext,
        mobileDevice: this.props.isMobileOptimized
      },
      metadata: {
        componentStack: errorInfo.componentStack,
        errorBoundary: 'PortugueseErrorBoundary',
        retryCount: this.retryCount
      }
    })

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Portuguese Error Boundary - Error Caught')
      console.error('Error:', error)
      console.error('Error Info:', errorInfo)
      console.error('Portuguese Context:', this.props.portugueseContext)
      console.error('Language:', this.state.language)
      console.groupEnd()
    }
  }

  handleRetry = () => {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++
      this.setState({ 
        hasError: false, 
        error: undefined, 
        errorInfo: undefined 
      })
      
      // Track retry attempt
      errorTracker.trackError({
        message: `User initiated retry attempt ${this.retryCount}`,
        type: 'CLIENT_ERROR' as any,
        severity: 'MEDIUM' as any,
        context: 'error-recovery',
        metadata: {
          retryCount: this.retryCount,
          originalError: this.state.error?.message
        }
      })
    }
  }

  handleLanguageSwitch = () => {
    const newLanguage = this.state.language === 'en' ? 'pt' : 'en'
    this.setState({ language: newLanguage })
  }

  handleGoHome = () => {
    window.location.href = ROUTES.home
  }

  handleContactSupport = () => {
    const errorDetails = this.state.error ? 
      `Error: ${this.state.error.message}\nContext: ${this.props.portugueseContext || 'unknown'}\nLanguage: ${this.state.language}` :
      'Unknown error in Portuguese community feature'

    const subject = encodeURIComponent('Error Report - Portuguese Community Feature')
    const body = encodeURIComponent(errorDetails)
    window.open(`mailto:support@lusotown.com?subject=${subject}&body=${body}`)
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Get contextual error messages
      const errorMessages = getContextualErrorMessage(
        this.state.error,
        {
          isPortugueseFeature: !!this.props.portugueseContext,
          isMobile: this.props.isMobileOptimized,
          language: this.state.language,
          userAction: this.props.portugueseContext
        }
      )

      const currentLanguageMessage = this.state.language === 'en' ? 
        errorMessages.en : errorMessages.pt

      // Mobile-optimized error UI
      if (this.props.isMobileOptimized) {
        return (
          <div className="min-h-screen bg-gray-50 flex flex-col justify-center p-4">
            <div className="bg-white rounded-lg shadow-sm p-6 mx-auto max-w-sm w-full">
              <div className="text-center">
                <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-primary-500 mb-4" />
                
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {this.state.language === 'pt' ? 
                    'Algo deu errado' : 
                    'Something went wrong'}
                </h2>
                
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {currentLanguageMessage}
                </p>

                {/* Portuguese Cultural Context */}
                {this.props.portugueseContext && (
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-center space-x-2 text-primary-700">
                      <LanguageIcon className="w-4 h-4" />
                      <span className="text-xs font-medium">
                        {this.state.language === 'pt' ? 
                          'Funcionalidade da Comunidade Portuguesa' :
                          'Portuguese Community Feature'}
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {this.retryCount < this.maxRetries && (
                    <button
                      onClick={this.handleRetry}
                      className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                    >
                      <ArrowPathIcon className="w-4 h-4 mr-2" />
                      {this.state.language === 'pt' ? 'Tentar novamente' : 'Try again'}
                    </button>
                  )}
                  
                  <button
                    onClick={this.handleGoHome}
                    className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                  >
                    <HomeIcon className="w-4 h-4 mr-2" />
                    {this.state.language === 'pt' ? 'Voltar ao início' : 'Go home'}
                  </button>

                  <button
                    onClick={this.handleLanguageSwitch}
                    className="w-full flex justify-center items-center py-2 px-4 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    <LanguageIcon className="w-4 h-4 mr-2" />
                    {this.state.language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }

      // Desktop error UI
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10 border border-gray-200">
              <div className="text-center">
                <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-primary-500 mb-4" />
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {this.state.language === 'pt' ? 
                    'Algo deu errado' : 
                    'Something went wrong'}
                </h2>
                
                <p className="text-gray-600 mb-6">
                  {currentLanguageMessage}
                </p>

                {/* Portuguese Cultural Context */}
                {this.props.portugueseContext && (
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-center space-x-2 text-primary-700 mb-2">
                      <LanguageIcon className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        {this.state.language === 'pt' ? 
                          'Funcionalidade da Comunidade Portuguesa' :
                          'Portuguese Community Feature'}
                      </span>
                    </div>
                    <p className="text-xs text-primary-600">
                      {this.state.language === 'pt' ? 
                        'Este erro afeta uma funcionalidade específica da comunidade portuguesa' :
                        'This error affects a Portuguese community-specific feature'}
                    </p>
                  </div>
                )}

                {/* Development error details */}
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="text-left mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                    <summary className="cursor-pointer text-red-800 font-medium mb-2">
                      {this.state.language === 'pt' ? 
                        'Detalhes do erro (modo desenvolvimento)' :
                        'Error details (development mode)'}
                    </summary>
                    <pre className="text-xs text-red-700 overflow-auto max-h-32 whitespace-pre-wrap">
                      {this.state.error.toString()}
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </details>
                )}

                <div className="space-y-3">
                  {this.retryCount < this.maxRetries && (
                    <button
                      onClick={this.handleRetry}
                      className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                    >
                      <ArrowPathIcon className="w-4 h-4 mr-2" />
                      {this.state.language === 'pt' ? 
                        `Tentar novamente (${this.maxRetries - this.retryCount} tentativas restantes)` :
                        `Try again (${this.maxRetries - this.retryCount} attempts remaining)`}
                    </button>
                  )}
                  
                  <button
                    onClick={this.handleGoHome}
                    className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                  >
                    <HomeIcon className="w-4 h-4 mr-2" />
                    {this.state.language === 'pt' ? 'Voltar ao início' : 'Go back home'}
                  </button>

                  <div className="flex space-x-2">
                    <button
                      onClick={this.handleLanguageSwitch}
                      className="flex-1 flex justify-center items-center py-2 px-4 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <LanguageIcon className="w-4 h-4 mr-2" />
                      {this.state.language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
                    </button>
                    
                    <button
                      onClick={this.handleContactSupport}
                      className="flex-1 text-sm font-medium text-gray-600 hover:text-gray-700 transition-colors"
                    >
                      {this.state.language === 'pt' ? 'Contactar suporte' : 'Contact support'}
                    </button>
                  </div>
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

// HOC for easy wrapping with Portuguese context
export function withPortugueseErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    portugueseContext?: keyof typeof PORTUGUESE_ERROR_CONTEXTS
    language?: 'en' | 'pt'
    isMobileOptimized?: boolean
    fallback?: ReactNode
  } = {}
) {
  const WrappedComponent = (props: P) => (
    <PortugueseErrorBoundary {...options}>
      <Component {...props} />
    </PortugueseErrorBoundary>
  )
  
  WrappedComponent.displayName = `withPortugueseErrorBoundary(${Component.displayName || Component.name})`
  return WrappedComponent
}

export default PortugueseErrorBoundary
