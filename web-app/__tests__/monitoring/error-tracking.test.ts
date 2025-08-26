/**
 * Error Tracking System Tests
 * Tests Portuguese community-specific error tracking functionality
 */

import { errorTracker, ErrorTracker } from '@/lib/monitoring/error-tracker'
import { getErrorMessage, getContextualErrorMessage } from '@/lib/monitoring/portuguese-error-messages'
import { ERROR_SEVERITY, PORTUGUESE_ERROR_CONTEXTS } from '@/config/error-monitoring'
import { ErrorType } from '@/lib/errorHandling'

// Mock Sentry
jest.mock('@sentry/nextjs', () => ({
  withScope: (callback: Function) => {
    const mockScope = {
      setTag: jest.fn(),
      setContext: jest.fn(),
      setUser: jest.fn(),
      addBreadcrumb: jest.fn(),
      setLevel: jest.fn()
    }
    callback(mockScope)
  },
  captureException: jest.fn(),
  captureMessage: jest.fn(),
  addBreadcrumb: jest.fn(),
  setUser: jest.fn(),
  setContext: jest.fn(),
  setTags: jest.fn()
}))

describe('Portuguese Community Error Tracking', () => {
  let tracker: ErrorTracker

  beforeEach(() => {
    // Create a fresh tracker instance for each test
    tracker = new ErrorTracker()
    
    // Mock console methods to avoid test noise
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(console, 'group').mockImplementation(() => {})
    jest.spyOn(console, 'groupEnd').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('Error Tracker Core Functionality', () => {
    it('should track basic errors with Portuguese context', () => {
      const testError = {
        message: 'Test Portuguese community error',
        type: ErrorType.CLIENT_ERROR,
        severity: ERROR_SEVERITY.HIGH,
        context: 'test-context',
        portugueseContext: {
          language: 'pt' as const,
          culturalFeature: 'CULTURAL_CONTENT' as const,
          mobileDevice: true
        }
      }

      tracker.trackError(testError)
      const summary = tracker.getErrorSummary()

      expect(summary.totalErrors).toBe(1)
      expect(summary.portugueseRelatedErrors).toBe(1)
      expect(summary.errorsByContext['test-context-HIGH']).toBe(1)
    })

    it('should track Portuguese feature errors correctly', () => {
      const businessDirectoryError = new Error('Business directory PostGIS query failed')
      
      tracker.trackPortugueseFeatureError(
        'BUSINESS_DIRECTORY',
        businessDirectoryError,
        {
          searchQuery: 'pastéis de nata London',
          location: 'SW1A',
          userLanguage: 'pt'
        }
      )

      const summary = tracker.getErrorSummary()
      expect(summary.totalErrors).toBe(1)
      expect(summary.portugueseRelatedErrors).toBe(1)
    })

    it('should handle performance metrics correctly', () => {
      const performanceData = {
        name: 'Portuguese Content Load Time',
        value: 2500, // 2.5 seconds
        context: 'portuguese-content-loading',
        threshold: 2000 // 2 second threshold
      }

      tracker.trackPerformanceMetric(performanceData)

      // Should trigger error for exceeding threshold
      const summary = tracker.getErrorSummary()
      expect(summary.totalErrors).toBe(1) // Performance issue tracked as error
    })

    it('should generate unique error IDs', () => {
      tracker.trackError({
        message: 'Error 1',
        type: ErrorType.CLIENT_ERROR,
        severity: ERROR_SEVERITY.MEDIUM,
        context: 'test'
      })

      tracker.trackError({
        message: 'Error 2', 
        type: ErrorType.CLIENT_ERROR,
        severity: ERROR_SEVERITY.MEDIUM,
        context: 'test'
      })

      const summary = tracker.getErrorSummary()
      expect(summary.totalErrors).toBe(2)
    })
  })

  describe('Portuguese Error Messages', () => {
    it('should return Portuguese error messages correctly', () => {
      const message = getErrorMessage(
        ErrorType.AUTHENTICATION,
        'pt',
        'userFriendly'
      )

      expect(message).toBe('Sessão expirada. Por favor, faça login novamente.')
    })

    it('should return English error messages correctly', () => {
      const message = getErrorMessage(
        ErrorType.AUTHENTICATION,
        'en',
        'userFriendly'
      )

      expect(message).toBe('Session expired. Please log in again.')
    })

    it('should handle Portuguese feature-specific errors', () => {
      const message = getErrorMessage(
        PORTUGUESE_ERROR_CONTEXTS.BUSINESS_DIRECTORY,
        'pt',
        'userFriendly'
      )

      expect(message).toBe('O diretório de empresas portuguesas está temporariamente indisponível.')
    })

    it('should provide contextual error messages', () => {
      const error = new Error('Business directory failed')
      const contextualMessage = getContextualErrorMessage(
        error,
        {
          isPortugueseFeature: true,
          language: 'pt',
          userAction: PORTUGUESE_ERROR_CONTEXTS.BUSINESS_DIRECTORY
        }
      )

      expect(contextualMessage.pt).toBe('O diretório de empresas portuguesas está temporariamente indisponível.')
      expect(contextualMessage.en).toBe('Portuguese business directory is temporarily unavailable.')
    })

    it('should handle mobile-specific error messages', () => {
      const mobileError = getErrorMessage('OFFLINE', 'pt', 'userFriendly')
      expect(mobileError).toBe('Está atualmente offline. Algumas funcionalidades podem não estar disponíveis.')
    })

    it('should fallback to default messages for unknown errors', () => {
      const message = getErrorMessage(
        'UNKNOWN_ERROR_TYPE' as any,
        'pt',
        'userFriendly'
      )

      expect(message).toBe('Ocorreu um erro inesperado. Tente novamente.')
    })
  })

  describe('Portuguese Cultural Context', () => {
    it('should handle cultural content errors', () => {
      tracker.trackPortugueseFeatureError(
        'CULTURAL_CONTENT',
        'Failed to load Portuguese cultural events',
        {
          eventType: 'santos_populares',
          region: 'lisboa',
          userPreferences: ['fado', 'cuisine']
        }
      )

      const summary = tracker.getErrorSummary()
      expect(summary.portugueseRelatedErrors).toBe(1)
    })

    it('should handle language switching errors', () => {
      tracker.trackPortugueseFeatureError(
        'LANGUAGE_SWITCHING',
        'Bilingual context failed to update',
        {
          fromLanguage: 'en',
          toLanguage: 'pt',
          switchDuration: 1200 // Slow switch
        }
      )

      const summary = tracker.getErrorSummary()
      expect(summary.portugueseRelatedErrors).toBe(1)
    })

    it('should handle character encoding issues', () => {
      tracker.trackPortugueseFeatureError(
        'CHARACTER_ENCODING',
        'Portuguese diacritics not displaying correctly',
        {
          affectedCharacters: ['ç', 'ã', 'õ'],
          browserInfo: 'Chrome/120.0',
          userAgent: 'Mobile Safari'
        }
      )

      const summary = tracker.getErrorSummary()
      expect(summary.portugueseRelatedErrors).toBe(1)
    })

    it('should handle cultural matching errors', () => {
      tracker.trackPortugueseFeatureError(
        'CULTURAL_MATCHING',
        'AI cultural compatibility algorithm timeout',
        {
          userProfile: 'portugal_heritage',
          matchingCriteria: ['saudade_intensity', 'cultural_celebrations'],
          timeoutDuration: 6000
        }
      )

      const summary = tracker.getErrorSummary()
      expect(summary.criticalErrors).toBe(1) // Cultural matching is critical
    })
  })

  describe('Error Severity and Alerting', () => {
    it('should classify critical errors correctly', () => {
      tracker.trackError({
        message: 'Database connection lost',
        type: ErrorType.SERVER_ERROR,
        severity: ERROR_SEVERITY.CRITICAL,
        context: 'database-error'
      })

      const summary = tracker.getErrorSummary()
      expect(summary.criticalErrors).toBe(1)
    })

    it('should handle error count thresholds', () => {
      // Simulate multiple errors in same context
      for (let i = 0; i < 5; i++) {
        tracker.trackError({
          message: `Portuguese business error ${i}`,
          type: ErrorType.CLIENT_ERROR,
          severity: ERROR_SEVERITY.HIGH,
          context: PORTUGUESE_ERROR_CONTEXTS.BUSINESS_DIRECTORY
        })
      }

      const summary = tracker.getErrorSummary()
      expect(summary.portugueseRelatedErrors).toBe(5)
      
      const contextKey = `${PORTUGUESE_ERROR_CONTEXTS.BUSINESS_DIRECTORY}-${ERROR_SEVERITY.HIGH}`
      expect(summary.errorsByContext[contextKey]).toBe(5)
    })

    it('should track mobile user errors separately', () => {
      tracker.trackError({
        message: 'Touch target too small',
        type: ErrorType.CLIENT_ERROR,
        severity: ERROR_SEVERITY.MEDIUM,
        context: 'mobile-ux',
        portugueseContext: {
          language: 'pt',
          mobileDevice: true,
          culturalFeature: 'BUSINESS_DIRECTORY'
        }
      })

      const summary = tracker.getErrorSummary()
      expect(summary.portugueseRelatedErrors).toBe(1)
    })
  })

  describe('Performance Monitoring', () => {
    it('should track Portuguese content loading performance', () => {
      const performanceMetric = {
        name: 'Cultural Events Load Time',
        value: 1800, // Under threshold
        context: 'cultural-content',
        threshold: 2000
      }

      tracker.trackPerformanceMetric(performanceMetric)
      
      // Should not trigger error for good performance
      const summary = tracker.getErrorSummary()
      expect(summary.totalErrors).toBe(0)
    })

    it('should detect slow language switching', () => {
      const slowSwitchMetric = {
        name: 'Language Switch Duration',
        value: 800, // Above 500ms threshold
        context: 'language-switching',
        threshold: 500
      }

      tracker.trackPerformanceMetric(slowSwitchMetric)
      
      // Should trigger error for slow performance
      const summary = tracker.getErrorSummary()
      expect(summary.totalErrors).toBe(1)
    })

    it('should track business directory response times', () => {
      const businessQueryMetric = {
        name: 'Business Directory PostGIS Query',
        value: 3200, // Slow query
        context: 'business-directory',
        threshold: 2000
      }

      tracker.trackPerformanceMetric(businessQueryMetric)
      
      const summary = tracker.getErrorSummary()
      expect(summary.totalErrors).toBe(1) // Performance issue
    })
  })

  describe('Error Recovery and Retry Logic', () => {
    it('should handle retry scenarios', () => {
      const originalError = {
        message: 'Portuguese event booking failed',
        type: ErrorType.CLIENT_ERROR,
        severity: ERROR_SEVERITY.HIGH,
        context: PORTUGUESE_ERROR_CONTEXTS.EVENT_BOOKING
      }

      tracker.trackError(originalError)

      // Simulate retry
      tracker.trackError({
        message: 'User retry attempt 1',
        type: ErrorType.CLIENT_ERROR,
        severity: ERROR_SEVERITY.MEDIUM,
        context: 'error-recovery',
        metadata: {
          originalError: originalError.message,
          retryCount: 1
        }
      })

      const summary = tracker.getErrorSummary()
      expect(summary.totalErrors).toBe(2)
    })
  })

  describe('Integration with Global Error Tracker', () => {
    it('should work with global error tracker instance', () => {
      // Test the global instance
      errorTracker.trackPortugueseFeatureError(
        'CULTURAL_CONTENT',
        'Global tracker test',
        { testData: 'integration' }
      )

      const summary = errorTracker.getErrorSummary()
      expect(summary.totalErrors).toBeGreaterThan(0)
      expect(summary.portugueseRelatedErrors).toBeGreaterThan(0)
    })
  })
})

describe('Error Monitoring Configuration', () => {
  it('should have all Portuguese error contexts defined', () => {
    const requiredContexts = [
      'CULTURAL_CONTENT',
      'BUSINESS_DIRECTORY', 
      'LANGUAGE_SWITCHING',
      'CHARACTER_ENCODING',
      'CULTURAL_MATCHING',
      'EVENT_BOOKING',
      'UNIVERSITY_PARTNERSHIPS'
    ]

    requiredContexts.forEach(context => {
      expect(PORTUGUESE_ERROR_CONTEXTS[context as keyof typeof PORTUGUESE_ERROR_CONTEXTS]).toBeDefined()
    })
  })

  it('should have proper error severity levels', () => {
    const severityLevels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
    
    severityLevels.forEach(level => {
      expect(ERROR_SEVERITY[level as keyof typeof ERROR_SEVERITY]).toBeDefined()
    })
  })
})