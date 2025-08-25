'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'

interface AccessibilityEnhancerProps {
  children: React.ReactNode
  announcePageChanges?: boolean
  skipToMain?: boolean
  highContrast?: boolean
}

/**
 * AccessibilityEnhancer - Wraps content with accessibility improvements
 * 
 * Features:
 * - Skip to main content link
 * - Page change announcements for screen readers
 * - High contrast mode support
 * - Portuguese language support for screen readers
 */
export function AccessibilityEnhancer({
  children,
  announcePageChanges = true,
  skipToMain = true,
  highContrast = false
}: AccessibilityEnhancerProps) {
  const { language, t } = useLanguage()

  React.useEffect(() => {
    // Set language attribute on document for screen readers
    document.documentElement.setAttribute('lang', language === 'pt' ? 'pt' : 'en')
  }, [language])

  return (
    <>
      {/* Skip to main content link for keyboard navigation */}
      {skipToMain && (
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                     bg-primary-600 text-white px-4 py-2 rounded-lg font-medium
                     z-50 transition-all duration-200
                     focus:ring-2 focus:ring-primary-300 focus:ring-offset-2"
          tabIndex={1}
        >
          {t('accessibility.skipToMain', 'Skip to main content')}
        </a>
      )}

      {/* Live region for page announcements */}
      {announcePageChanges && (
        <div
          id="page-announcements"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        />
      )}

      {/* Main content wrapper */}
      <div
        id="main-content"
        className={highContrast ? 'high-contrast' : ''}
        role="main"
        tabIndex={-1}
      >
        {children}
      </div>
    </>
  )
}

/**
 * Form field wrapper with automatic accessibility enhancements
 */
interface AccessibleFormFieldProps {
  id?: string
  label: string
  children: React.ReactElement
  required?: boolean
  description?: string
  error?: string
  className?: string
}

export function AccessibleFormField({
  id,
  label,
  children,
  required = false,
  description,
  error,
  className = ''
}: AccessibleFormFieldProps) {
  const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`
  const descriptionId = description ? `${fieldId}-description` : undefined
  const errorId = error ? `${fieldId}-error` : undefined
  const { t } = useLanguage()

  const ariaDescribedBy = [descriptionId, errorId].filter(Boolean).join(' ')

  return (
    <div className={`space-y-2 ${className}`}>
      <label 
        htmlFor={fieldId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label={t('accessibility.required', 'required')}>
            *
          </span>
        )}
      </label>
      
      {description && (
        <p id={descriptionId} className="text-sm text-gray-600">
          {description}
        </p>
      )}
      
      {React.cloneElement(children, {
        id: fieldId,
        'aria-required': required,
        'aria-describedby': ariaDescribedBy || undefined,
        'aria-invalid': error ? 'true' : undefined,
        className: `${children.props.className || ''} ${
          error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
            : 'focus:border-primary-500 focus:ring-primary-500'
        } focus:outline-none focus:ring-2 focus:ring-offset-2`,
      })}
      
      {error && (
        <p
          id={errorId}
          className="text-sm text-red-600"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Accessible button component with Lusophone support
 */
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  loading?: boolean
  loadingText?: string
  children: React.ReactNode
}

export function AccessibleButton({
  variant = 'primary',
  size = 'medium',
  loading = false,
  loadingText,
  children,
  disabled,
  className = '',
  ...props
}: AccessibleButtonProps) {
  const { t } = useLanguage()

  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
    ghost: 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500'
  }

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm min-h-[32px]',
    medium: 'px-4 py-2 text-base min-h-[44px]', // 44px minimum touch target
    large: 'px-6 py-3 text-lg min-h-[48px]'
  }

  const isDisabled = disabled || loading

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={isDisabled}
      aria-describedby={loading ? `${props.id || ''}-loading` : undefined}
      {...props}
    >
      {loading && (
        <>
          <span className="sr-only" id={`${props.id || ''}-loading`}>
            {loadingText || t('accessibility.loading', 'Loading')}
          </span>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </>
      )}
      {children}
    </button>
  )
}

/**
 * Accessible card component for events, businesses, etc.
 */
interface AccessibleCardProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  title: string
  description?: string
  imageAlt?: string
}

export function AccessibleCard({
  href,
  onClick,
  children,
  className = '',
  title,
  description,
  imageAlt
}: AccessibleCardProps) {
  const Component = href ? 'a' : 'div'
  const isInteractive = href || onClick

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`
        block rounded-lg shadow-sm border border-gray-200 overflow-hidden
        ${isInteractive ? 'hover:shadow-md transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2' : ''}
        ${className}
      `}
      role={isInteractive && !href ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={
        isInteractive && !href
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick?.()
              }
            }
          : undefined
      }
      aria-label={`${title}${description ? ` - ${description}` : ''}`}
    >
      {children}
    </Component>
  )
}

/**
 * Hook for managing focus and announcements
 */
export function useAccessibilityAnnouncements() {
  const { t } = useLanguage()

  const announceToScreenReader = React.useCallback((message: string) => {
    const announcement = document.getElementById('page-announcements')
    if (announcement) {
      announcement.textContent = message
      // Clear after announcement to allow repeat announcements
      setTimeout(() => {
        announcement.textContent = ''
      }, 1000)
    }
  }, [])

  const announcePageChange = React.useCallback((pageName: string) => {
    announceToScreenReader(
      t('accessibility.pageChanged', `Navigated to ${pageName}`, { pageName })
    )
  }, [announceToScreenReader, t])

  const announceSuccess = React.useCallback((action: string) => {
    announceToScreenReader(
      t('accessibility.actionSuccess', `${action} successful`, { action })
    )
  }, [announceToScreenReader, t])

  const announceError = React.useCallback((error: string) => {
    announceToScreenReader(
      t('accessibility.error', `Error: ${error}`, { error })
    )
  }, [announceToScreenReader, t])

  return {
    announceToScreenReader,
    announcePageChange,
    announceSuccess,
    announceError
  }
}

export default AccessibilityEnhancer