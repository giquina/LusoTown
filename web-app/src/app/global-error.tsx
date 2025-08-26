'use client'

import React from 'react'
import * as Sentry from '@sentry/nextjs'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  React.useEffect(() => {
    // Log critical error to Sentry
    Sentry.withScope((scope) => {
      scope.setTag('error_type', 'global_error')
      scope.setTag('severity', 'critical')
      scope.setTag('community_focus', 'portuguese-speaking')
      scope.setLevel('fatal')
      scope.setContext('global_error', {
        digest: error.digest,
        message: error.message,
        name: error.name,
        stack: error.stack
      })
      Sentry.captureException(error)
    })
  }, [error])

  const handleReload = () => {
    Sentry.addBreadcrumb({
      message: 'User triggered global error reset',
      category: 'ui',
      level: 'info'
    })
    
    // Force full page reload for global errors
    window.location.href = '/'
  }

  const handleContactSupport = () => {
    const errorDetails = `
Global Error Report:
- Message: ${error.message}
- Name: ${error.name}
- Digest: ${error.digest || 'N/A'}
- Timestamp: ${new Date().toISOString()}
- User Agent: ${navigator.userAgent}
- URL: ${window.location.href}

Please describe what you were doing when this error occurred:
`
    
    const subject = encodeURIComponent('Critical Error - Portuguese Community Platform')
    const body = encodeURIComponent(errorDetails)
    window.open(`mailto:support@lusotown.com?subject=${subject}&body=${body}`)
  }

  return (
    <html lang="en">
      <head>
        <title>Critical Error - LusoTown</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style jsx>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
          }
          
          .error-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            max-width: 500px;
            width: 100%;
            text-align: center;
            border: 2px solid #dc2626;
          }
          
          .error-icon {
            width: 64px;
            height: 64px;
            background: #fee2e2;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
          }
          
          .error-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 0.5rem;
          }
          
          .error-subtitle {
            font-size: 1rem;
            color: #6b7280;
            margin-bottom: 1.5rem;
            line-height: 1.5;
          }
          
          .portuguese-context {
            background: #f0f9ff;
            border: 1px solid #0ea5e9;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1.5rem;
          }
          
          .portuguese-context-header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            color: #0369a1;
            font-weight: 600;
            font-size: 0.875rem;
            margin-bottom: 0.5rem;
          }
          
          .portuguese-context-text {
            color: #0369a1;
            font-size: 0.75rem;
          }
          
          .error-actions {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
          
          .btn {
            padding: 0.75rem 1rem;
            border-radius: 6px;
            font-size: 0.875rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s;
            cursor: pointer;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
          }
          
          .btn-primary {
            background: #dc2626;
            color: white;
          }
          
          .btn-primary:hover {
            background: #b91c1c;
          }
          
          .btn-secondary {
            background: #f3f4f6;
            color: #374151;
            border: 1px solid #d1d5db;
          }
          
          .btn-secondary:hover {
            background: #e5e7eb;
          }
          
          .support-section {
            margin-top: 1.5rem;
            padding-top: 1rem;
            border-top: 1px solid #e5e7eb;
          }
          
          .support-text {
            font-size: 0.75rem;
            color: #6b7280;
            margin-bottom: 0.5rem;
          }
          
          .support-link {
            color: #0ea5e9;
            text-decoration: none;
            font-size: 0.75rem;
            font-weight: 600;
          }
          
          .support-link:hover {
            color: #0284c7;
          }
          
          .error-details {
            background: #fef2f2;
            border: 1px solid #fca5a5;
            border-radius: 6px;
            padding: 0.75rem;
            margin-top: 1rem;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 0.75rem;
            text-align: left;
            color: #991b1b;
            max-height: 120px;
            overflow-y: auto;
          }
          
          @media (max-width: 640px) {
            .error-container {
              padding: 1.5rem;
            }
            
            .error-title {
              font-size: 1.25rem;
            }
            
            .error-subtitle {
              font-size: 0.875rem;
            }
          }
        `}</style>
      </head>
      <body>
        <div className="error-container">
          {/* Critical Error Icon */}
          <div className="error-icon">
            <svg width="32" height="32" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="error-title">
            Critical System Error
          </h1>
          <p className="error-subtitle">
            A critical error has occurred in the LusoTown platform. Our Portuguese community features may be temporarily unavailable.
          </p>

          {/* Portuguese Community Context */}
          <div className="portuguese-context">
            <div className="portuguese-context-header">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m6.586 10l4.414-4.414A2 2 0 0011.172 9l-7 7a2 2 0 01-2.829 0l-7-7a2 2 0 011.415-1.415L9 13l7-7z" />
              </svg>
              <span>Portuguese Community Platform</span>
            </div>
            <p className="portuguese-context-text">
              Esta é uma falha crítica do sistema. A nossa equipa técnica foi automaticamente notificada e está a trabalhar para restaurar todos os serviços da comunidade portuguesa.
            </p>
          </div>

          {/* Error Actions */}
          <div className="error-actions">
            <button
              onClick={handleReload}
              className="btn btn-primary"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reload Platform
            </button>
            
            <button
              onClick={handleContactSupport}
              className="btn btn-secondary"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Report Critical Error
            </button>
          </div>

          {/* Support Contact */}
          <div className="support-section">
            <p className="support-text">
              Critical system failure affecting Portuguese community features
            </p>
            <a
              href="https://status.lusotown.com"
              target="_blank"
              rel="noopener noreferrer"
              className="support-link"
            >
              Check System Status →
            </a>
          </div>

          {/* Error Details in Development */}
          {process.env.NODE_ENV === 'development' && (
            <details className="error-details">
              <summary style={{ cursor: 'pointer', marginBottom: '8px', fontWeight: 'bold' }}>
                Development Error Details
              </summary>
              <pre>
                {error.name}: {error.message}
                {error.stack && `\n\nStack Trace:\n${error.stack}`}
                {error.digest && `\n\nDigest: ${error.digest}`}
              </pre>
            </details>
          )}
        </div>
      </body>
    </html>
  )
}