/**
 * AccessibilityButton - WCAG 2.1 AA Compliant Button for Portuguese Community Platform
 * Provides comprehensive keyboard navigation and screen reader support
 */

'use client'

import React, { forwardRef } from 'react'
import { usePortugueseKeyboardNavigation } from '@/hooks/useKeyboardNavigation'
import { useLanguage } from '@/context/LanguageContext'

interface AccessibilityButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  loadingText?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  culturalContext?: 'portuguese' | 'brazilian' | 'cape-verdean' | 'angolan' | 'mozambican' | 'general'
  ariaDescribedBy?: string
  ariaExpanded?: boolean
  ariaHaspopup?: boolean
  ariaPressed?: boolean
  fullWidth?: boolean
}

const AccessibilityButton = forwardRef<HTMLButtonElement, AccessibilityButtonProps>(
  ({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    loadingText,
    icon,
    iconPosition = 'left',
    culturalContext = 'general',
    className = '',
    disabled,
    onClick,
    ariaDescribedBy,
    ariaExpanded,
    ariaHaspopup,
    ariaPressed,
    fullWidth,
    type = 'button',
    ...props
  }, ref) => {
    const { t } = useLanguage()

    // Portuguese-aware keyboard navigation
    const keyboardProps = usePortugueseKeyboardNavigation({
      onClick,
      culturalContext,
      disabled: disabled || loading
    })

    // Base button styles with Portuguese brand colors
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'

    // Variant styles using Portuguese heritage colors
    const variantStyles = {
      primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500',
      secondary: 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 focus:ring-emerald-500',
      outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      ghost: 'text-gray-700 hover:bg-gray-50 focus:ring-gray-300',
      danger: 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 focus:ring-red-500'
    }

    // Size styles with mobile-optimized touch targets (minimum 56px)
    const sizeStyles = {
      sm: 'px-3 py-2 text-sm min-h-[44px]', // 44px for mobile accessibility
      md: 'px-4 py-2.5 text-sm min-h-[56px]', // 56px recommended touch target
      lg: 'px-6 py-3 text-base min-h-[56px]'
    }

    // Loading spinner component
    const LoadingSpinner = () => (
      <svg 
        className="animate-spin h-4 w-4 text-current" 
        fill="none" 
        viewBox="0 0 24 24"
        role="img"
        aria-label={t('accessibility.loading', 'Loading')}
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
    )

    // Construct final className
    const finalClassName = [
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth ? 'w-full' : '',
      className
    ].filter(Boolean).join(' ')

    // Accessible button content
    const buttonContent = (
      <>
        {loading && (
          <span className="mr-2" aria-hidden="true">
            <LoadingSpinner />
          </span>
        )}
        
        {!loading && icon && iconPosition === 'left' && (
          <span className="mr-2" aria-hidden="true">
            {icon}
          </span>
        )}
        
        <span>
          {loading && loadingText ? loadingText : children}
        </span>
        
        {!loading && icon && iconPosition === 'right' && (
          <span className="ml-2" aria-hidden="true">
            {icon}
          </span>
        )}
      </>
    )

    return (
      <button
        ref={ref}
        type={type}
        className={finalClassName}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-describedby={ariaDescribedBy}
        aria-expanded={ariaExpanded}
        aria-haspopup={ariaHaspopup}
        aria-pressed={ariaPressed}
        data-cultural-context={culturalContext}
        {...keyboardProps}
        {...props}
      >
        {buttonContent}
      </button>
    )
  }
)

AccessibilityButton.displayName = 'AccessibilityButton'

export default AccessibilityButton

// Portuguese community specific button variants
export const PortugueseButton = forwardRef<HTMLButtonElement, AccessibilityButtonProps>(
  (props, ref) => (
    <AccessibilityButton 
      ref={ref} 
      culturalContext="portuguese" 
      {...props} 
    />
  )
)

export const BrazilianButton = forwardRef<HTMLButtonElement, AccessibilityButtonProps>(
  (props, ref) => (
    <AccessibilityButton 
      ref={ref} 
      culturalContext="brazilian" 
      {...props} 
    />
  )
)

export const CapeVerdeanButton = forwardRef<HTMLButtonElement, AccessibilityButtonProps>(
  (props, ref) => (
    <AccessibilityButton 
      ref={ref} 
      culturalContext="cape-verdean" 
      {...props} 
    />
  )
)

PortugueseButton.displayName = 'PortugueseButton'
BrazilianButton.displayName = 'BrazilianButton' 
CapeVerdeanButton.displayName = 'CapeVerdeanButton'