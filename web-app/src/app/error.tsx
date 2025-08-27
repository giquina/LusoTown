'use client'

import React from 'react'
import * as Sentry from '@sentry/nextjs'
import { errorTracker } from '@/lib/monitoring/error-tracker'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  React.useEffect(() => {
    // Log the error to Sentry with Portuguese context
    Sentry.withScope((scope) => {
      scope.setTag('error_page', 'root')
      scope.setTag('community_focus', 'portuguese-speaking')
      scope.setContext('error_details', {
        digest: error.digest,
        message: error.message,
        name: error.name
      })
      Sentry.captureException(error)
    })

    // Track the error in our system
    errorTracker.trackError({
      message: error.message,
      type: 'CLIENT_ERROR' as any,
      severity: 'HIGH' as any,
      context: 'application-error',
      stack: error.stack,
      metadata: {
        digest: error.digest,
        errorBoundary: 'RootErrorPage'
      }
    })
  }, [error])

  const handleRetry = () => {
    // Add breadcrumb for retry action
    Sentry.addBreadcrumb({
      message: 'User clicked retry on error page',
      category: 'ui',
      level: 'info',
      data: {
        error_digest: error.digest,
        error_message: error.message
      }
    })
    
    reset()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg border border-primary-200 p-8 text-center">
          {/* Portuguese Cultural Header */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Algo deu errado
            </h1>
            <p className="text-gray-600">
              Ocorreu um erro inesperado na plataforma da comunidade portuguesa.
            </p>
          </div>

          {/* Portuguese Community Context */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 text-primary-700 mb-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m6.586 10l4.414-4.414A2 2 0 0111.172 9l-7 7a2 2 0 01-2.829 0l-7-7a2 2 0 011.415-1.415L9 13l7-7z" />
              </svg>
              <span className="text-sm font-medium">LusoTown Platform</span>
            </div>
            <p className="text-xs text-primary-600">
              A nossa equipa foi notificada e está a trabalhar para resolver esta questão.
            </p>
          </div>

          {/* Error Actions */}
          <div className="space-y-3">
            <button
              onClick={handleRetry}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Tentar novamente
            </button>
            
            <button
              onClick={() => (window.location.href = '/')}
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Voltar ao início
            </button>
          </div>

          {/* Support Contact */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Problema persistente?</p>
            <a
              href="mailto:support@lusotown.com?subject=Error%20Report&body=Error%20Details:%20Please%20describe%20what%20you%20were%20doing%20when%20this%20error%20occurred."
              className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              Contactar suporte técnico
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}