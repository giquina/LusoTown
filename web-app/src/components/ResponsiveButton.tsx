'use client'

import { ReactNode } from 'react'
import { useLanguage } from '@/context/LanguageContext'

interface ResponsiveButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  fullWidth?: boolean
  portugueseTextFallback?: string
  'aria-label'?: string
}

export default function ResponsiveButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  portugueseTextFallback,
  'aria-label': ariaLabel,
  ...props
}: ResponsiveButtonProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  
  // Base classes for responsive design
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-semibold rounded-xl
    transition-all duration-200
    active:scale-98
    text-center
    leading-tight
    ${fullWidth ? 'w-full' : ''}
  `
  
  // Size classes with Portuguese text considerations
  const sizeClasses = {
    sm: `
      text-sm px-4 py-2.5
      min-h-[44px]
      ${isPortuguese ? 'text-xs leading-relaxed' : ''}
    `,
    md: `
      text-base px-6 py-3
      min-h-[48px]
      ${isPortuguese ? 'text-sm leading-relaxed px-5' : ''}
    `,
    lg: `
      text-lg px-8 py-4
      min-h-[56px]
      ${isPortuguese ? 'text-base leading-relaxed px-6 py-3.5' : ''}
    `
  }
  
  // Variant classes
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-green-500 to-red-500
      text-white
      hover:from-green-600 hover:to-red-600
      shadow-lg hover:shadow-xl
      transform hover:-translate-y-0.5
    `,
    secondary: `
      bg-white
      text-gray-900
      border-2 border-gray-200
      hover:border-green-300
      hover:shadow-md
    `,
    outline: `
      bg-transparent
      text-green-600
      border-2 border-green-500
      hover:bg-green-500
      hover:text-white
    `
  }
  
  const finalClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `.trim().replace(/\s+/g, ' ')
  
  // Handle text truncation for Portuguese
  const displayText = isPortuguese && portugueseTextFallback && 
    typeof children === 'string' && children.length > 20
    ? portugueseTextFallback
    : children

  const commonProps = {
    className: finalClasses,
    'aria-label': ariaLabel,
    ...props
  }

  if (href) {
    return (
      <a href={href} {...commonProps}>
        <span className="truncate max-w-full">
          {displayText}
        </span>
      </a>
    )
  }

  return (
    <button onClick={onClick} {...commonProps}>
      <span className="truncate max-w-full">
        {displayText}
      </span>
    </button>
  )
}