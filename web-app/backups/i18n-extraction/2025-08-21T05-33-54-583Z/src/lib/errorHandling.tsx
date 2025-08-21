/**
 * Comprehensive error handling utilities for LusoTown platform
 * Provides secure error handling, logging, and user-friendly error messages
 */

import React from 'react'
import { toast } from 'react-hot-toast'

// Error types for categorization
export enum ErrorType {
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  NETWORK = 'network',
  VALIDATION = 'validation',
  NOT_FOUND = 'not_found',
  SERVER_ERROR = 'server_error',
  CLIENT_ERROR = 'client_error',
  UNKNOWN = 'unknown'
}

// Custom error class with additional context
export class LusoTownError extends Error {
  public readonly type: ErrorType
  public readonly code?: string
  public readonly context?: Record<string, any>
  public readonly userMessage?: string
  public readonly timestamp: Date

  constructor(
    message: string,
    type: ErrorType = ErrorType.UNKNOWN,
    code?: string,
    context?: Record<string, any>,
    userMessage?: string
  ) {
    super(message)
    this.name = 'LusoTownError'
    this.type = type
    this.code = code
    this.context = context
    this.userMessage = userMessage
    this.timestamp = new Date()
  }
}

// Safe async operation wrapper
export async function safeAsync<T>(
  operation: () => Promise<T>,
  errorContext?: {
    operationName?: string
    showToast?: boolean
    fallbackValue?: T
    onError?: (error: Error) => void
  }
): Promise<{ data?: T; error?: LusoTownError; success: boolean }> {
  try {
    const data = await operation()
    return { data, success: true }
  } catch (error) {
    console.error(`Error in ${errorContext?.operationName || 'async operation'}:`, error)
    
    const lusoError = error instanceof LusoTownError 
      ? error 
      : new LusoTownError(
          error instanceof Error ? error.message : 'Unknown error occurred',
          categorizeError(error),
          undefined,
          { originalError: error, operation: errorContext?.operationName }
        )

    // Show user-friendly toast if requested
    if (errorContext?.showToast) {
      const userMessage = lusoError.userMessage || getErrorMessage(lusoError.type)
      toast.error(userMessage)
    }

    // Call custom error handler if provided
    if (errorContext?.onError) {
      errorContext.onError(lusoError)
    }

    // Log to error tracking service in production
    if (process.env.NODE_ENV === 'production') {
      logError(lusoError, errorContext)
    }

    return { 
      error: lusoError, 
      success: false,
      data: errorContext?.fallbackValue
    }
  }
}

// Categorize errors based on type and message
function categorizeError(error: any): ErrorType {
  if (!error) return ErrorType.UNKNOWN

  const message = error.message?.toLowerCase() || ''
  const status = error.status || error.statusCode

  // HTTP status codes
  if (status === 401) return ErrorType.AUTHENTICATION
  if (status === 403) return ErrorType.AUTHORIZATION
  if (status === 404) return ErrorType.NOT_FOUND
  if (status >= 400 && status < 500) return ErrorType.CLIENT_ERROR
  if (status >= 500) return ErrorType.SERVER_ERROR

  // Network errors
  if (message.includes('network') || message.includes('fetch') || message.includes('connection')) {
    return ErrorType.NETWORK
  }

  // Authentication errors
  if (message.includes('unauthorized') || message.includes('login') || message.includes('token')) {
    return ErrorType.AUTHENTICATION
  }

  // Validation errors
  if (message.includes('validation') || message.includes('invalid') || message.includes('required')) {
    return ErrorType.VALIDATION
  }

  return ErrorType.UNKNOWN
}

// Get user-friendly error messages
function getErrorMessage(type: ErrorType): string {
  const messages = {
    [ErrorType.AUTHENTICATION]: 'Sessão expirada. Por favor, faça login novamente.',
    [ErrorType.AUTHORIZATION]: 'Não tem permissão para realizar esta ação.',
    [ErrorType.NETWORK]: 'Problema de conexão. Verifique sua internet e tente novamente.',
    [ErrorType.VALIDATION]: 'Dados inválidos. Verifique as informações e tente novamente.',
    [ErrorType.NOT_FOUND]: 'Recurso não encontrado.',
    [ErrorType.SERVER_ERROR]: 'Erro do servidor. Tente novamente em alguns minutos.',
    [ErrorType.CLIENT_ERROR]: 'Erro na solicitação. Verifique os dados e tente novamente.',
    [ErrorType.UNKNOWN]: 'Ocorreu um erro inesperado. Tente novamente.'
  }
  
  return messages[type] || messages[ErrorType.UNKNOWN]
}

// Log error to external service in production
function logError(error: LusoTownError, context?: any) {
  // In production, this would send to your error tracking service
  // For now, we'll just structure the error for logging
  const errorReport = {
    message: error.message,
    type: error.type,
    code: error.code,
    stack: error.stack,
    timestamp: error.timestamp,
    context: error.context,
    operationContext: context,
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    url: typeof window !== 'undefined' ? window.location.href : undefined
  }

  console.error('Production Error Report:', errorReport)
}

// Safe localStorage operations
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return null
    }
  },

  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value)
      return true
    } catch (error) {
      console.error('Error writing to localStorage:', error)
      return false
    }
  },

  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('Error removing from localStorage:', error)
      return false
    }
  },

  getJSON: <T extends unknown>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error)
      return null
    }
  },

  setJSON: <T extends unknown>(key: string, value: T): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('Error storing JSON to localStorage:', error)
      return false
    }
  }
}

// Safe DOM operations
export const safeDOMOperations = {
  querySelector: (selector: string): Element | null => {
    try {
      return document.querySelector(selector)
    } catch (error) {
      console.error('Error with querySelector:', error)
      return null
    }
  },

  getElementById: (id: string): HTMLElement | null => {
    try {
      return document.getElementById(id)
    } catch (error) {
      console.error('Error with getElementById:', error)
      return null
    }
  },

  addEventListener: (
    element: Element | Window | Document,
    event: string,
    handler: EventListener,
    options?: boolean | AddEventListenerOptions
  ): boolean => {
    try {
      element.addEventListener(event, handler, options)
      return true
    } catch (error) {
      console.error('Error adding event listener:', error)
      return false
    }
  },

  removeEventListener: (
    element: Element | Window | Document,
    event: string,
    handler: EventListener,
    options?: boolean | EventListenerOptions
  ): boolean => {
    try {
      element.removeEventListener(event, handler, options)
      return true
    } catch (error) {
      console.error('Error removing event listener:', error)
      return false
    }
  }
}

// Input validation helpers
export const inputValidation = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  sanitizeString: (input: string): string => {
    // Basic XSS prevention - remove potentially dangerous characters
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=\s*"[^"]*"/gi, '')
      .replace(/on\w+\s*=\s*'[^']*'/gi, '')
  },

  isValidLength: (input: string, min: number = 0, max: number = Infinity): boolean => {
    return input.length >= min && input.length <= max
  },

  containsOnlyAllowedChars: (input: string, allowedChars: RegExp): boolean => {
    return allowedChars.test(input)
  }
}

// Network request helpers with error handling
export async function safeFetch(
  url: string,
  options?: RequestInit,
  errorContext?: {
    operationName?: string
    showToast?: boolean
    retries?: number
  }
): Promise<{ data?: Response; error?: LusoTownError; success: boolean }> {
  const maxRetries = errorContext?.retries ?? 0
  let attempt = 0

  while (attempt <= maxRetries) {
    const result = await safeAsync(
      () => fetch(url, options),
      {
        operationName: errorContext?.operationName || `fetch ${url}`,
        showToast: errorContext?.showToast && attempt === maxRetries // Only show toast on last attempt
      }
    )

    if (result.success) {
      return result
    }

    attempt++
    if (attempt <= maxRetries) {
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
    }
  }

  return { 
    error: new LusoTownError(
      'Network request failed after retries',
      ErrorType.NETWORK
    ), 
    success: false 
  }
}

// React component error wrapper
export function withErrorHandling<P extends object>(
  Component: React.ComponentType<P>,
  errorContext?: {
    componentName?: string
    fallbackRender?: (error: Error) => React.ReactNode
  }
) {
  return function WrappedComponent(props: P) {
    try {
      return <Component {...props} />
    } catch (error) {
      console.error(`Error in component ${errorContext?.componentName || 'Unknown'}:`, error)
      
      if (errorContext?.fallbackRender) {
        return errorContext.fallbackRender(error as Error)
      }

      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">
            Erro ao carregar componente{errorContext?.componentName ? ` ${errorContext.componentName}` : ''}.
            <button 
              onClick={() => window.location.reload()} 
              className="ml-2 text-red-600 hover:text-red-700 underline"
            >
              Recarregar página
            </button>
          </p>
        </div>
      )
    }
  }
}

export default {
  safeAsync,
  safeLocalStorage,
  safeDOMOperations,
  inputValidation,
  safeFetch,
  withErrorHandling,
  LusoTownError,
  ErrorType
}