'use client'

import { useEffect, ReactNode } from 'react'
import { useHeritage } from '@/context/HeritageContext'
import { applyHeritageCSSProperties } from '@/lib/heritage-tailwind'

interface HeritageStyleProviderProps {
  children: ReactNode
}

/**
 * Provider that applies heritage-specific CSS custom properties to the document
 * This allows Tailwind classes to use heritage colors dynamically
 */
export default function HeritageStyleProvider({ children }: HeritageStyleProviderProps) {
  const { heritage } = useHeritage()

  useEffect(() => {
    // Apply heritage CSS properties to document root
    applyHeritageCSSProperties(heritage)

    // Update theme-color meta tag for heritage
    const themeColorMeta = document.getElementById('theme-color') as HTMLMetaElement
    if (themeColorMeta) {
      themeColorMeta.content = heritage.branding.colors.primary
    }

    // Listen for heritage changes and reapply styles
    const handleHeritageChange = (event: CustomEvent) => {
      applyHeritageCSSProperties(event.detail.heritage)
      // Update theme color for new heritage
      if (themeColorMeta) {
        themeColorMeta.content = event.detail.heritage.branding.colors.primary
      }
    }

    window.addEventListener('heritage-changed', handleHeritageChange as EventListener)
    
    return () => {
      window.removeEventListener('heritage-changed', handleHeritageChange as EventListener)
    }
  }, [heritage])

  return <>{children}</>
}

// Heritage-aware styled components
export function HeritageCard({ 
  children, 
  className = '',
  variant = 'default'
}: { 
  children: ReactNode
  className?: string
  variant?: 'default' | 'primary' | 'accent' | 'gradient'
}) {
  const { heritage } = useHeritage()

  const baseClasses = 'rounded-lg border shadow-sm transition-all duration-200'
  
  const variantClasses = {
    default: 'bg-white border-gray-200 hover:shadow-md',
    primary: 'bg-[var(--heritage-primary-50)] border-[var(--heritage-primary-200)] hover:border-[var(--heritage-primary-300)]',
    accent: 'bg-[var(--heritage-accent-50)] border-[var(--heritage-accent-200)] hover:border-[var(--heritage-accent-300)]',
    gradient: 'bg-gradient-to-br from-[var(--heritage-primary-50)] to-[var(--heritage-secondary-50)] border-[var(--heritage-primary-200)]'
  }

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  )
}

export function HeritageButton({ 
  children, 
  className = '',
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  ...props
}: { 
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'accent' | 'action' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  [key: string]: any
}) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  const variantClasses = {
    primary: 'bg-[var(--heritage-primary)] hover:bg-[var(--heritage-primary-600)] text-white focus:ring-[var(--heritage-primary-500)]',
    secondary: 'bg-[var(--heritage-secondary)] hover:bg-[var(--heritage-secondary-600)] text-white focus:ring-[var(--heritage-secondary-500)]',
    accent: 'bg-[var(--heritage-accent)] hover:bg-[var(--heritage-accent-600)] text-white focus:ring-[var(--heritage-accent-500)]',
    action: 'bg-[var(--heritage-action)] hover:bg-[var(--heritage-action-600)] text-white focus:ring-[var(--heritage-action-500)]',
    outline: 'bg-transparent border-2 border-[var(--heritage-primary)] text-[var(--heritage-primary)] hover:bg-[var(--heritage-primary)] hover:text-white focus:ring-[var(--heritage-primary-500)]',
    ghost: 'bg-transparent text-[var(--heritage-primary)] hover:bg-[var(--heritage-primary-50)] focus:ring-[var(--heritage-primary-500)]'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function HeritageBadge({ 
  children, 
  className = '',
  variant = 'primary',
  size = 'md'
}: { 
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'accent' | 'action' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
}) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full'
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  }

  const variantClasses = {
    primary: 'bg-[var(--heritage-primary-100)] text-[var(--heritage-primary-800)]',
    secondary: 'bg-[var(--heritage-secondary-100)] text-[var(--heritage-secondary-800)]',
    accent: 'bg-[var(--heritage-accent-100)] text-[var(--heritage-accent-800)]',
    action: 'bg-[var(--heritage-action-100)] text-[var(--heritage-action-800)]',
    neutral: 'bg-gray-100 text-gray-800'
  }

  return (
    <span className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}

export function HeritageGradientText({ 
  children, 
  className = '',
  variant = 'brand'
}: { 
  children: ReactNode
  className?: string
  variant?: 'brand' | 'primary' | 'accent' | 'action'
}) {
  const variantClasses = {
    brand: 'bg-gradient-to-r from-[var(--heritage-primary)] via-[var(--heritage-secondary)] to-[var(--heritage-accent)] bg-clip-text text-transparent',
    primary: 'bg-gradient-to-r from-[var(--heritage-primary)] to-[var(--heritage-primary-700)] bg-clip-text text-transparent',
    accent: 'bg-gradient-to-r from-[var(--heritage-accent)] to-[var(--heritage-accent-700)] bg-clip-text text-transparent',
    action: 'bg-gradient-to-r from-[var(--heritage-action)] to-[var(--heritage-action-700)] bg-clip-text text-transparent'
  }

  return (
    <span className={`font-bold ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}

// Heritage-aware icon wrapper
export function HeritageIcon({ 
  children, 
  className = '',
  variant = 'primary',
  size = 'md'
}: { 
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'accent' | 'action' | 'neutral'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  }

  const variantClasses = {
    primary: 'text-[var(--heritage-primary)]',
    secondary: 'text-[var(--heritage-secondary)]',
    accent: 'text-[var(--heritage-accent)]',
    action: 'text-[var(--heritage-action)]',
    neutral: 'text-gray-500'
  }

  return (
    <div className={`${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  )
}

// Heritage-aware progress bar
export function HeritageProgressBar({ 
  progress, 
  className = '',
  variant = 'primary',
  size = 'md'
}: { 
  progress: number
  className?: string
  variant?: 'primary' | 'secondary' | 'accent' | 'action'
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  }

  const variantClasses = {
    primary: 'bg-[var(--heritage-primary)]',
    secondary: 'bg-[var(--heritage-secondary)]',
    accent: 'bg-[var(--heritage-accent)]',
    action: 'bg-[var(--heritage-action)]'
  }

  return (
    <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]} ${className}`}>
      <div 
        className={`${sizeClasses[size]} rounded-full transition-all duration-300 ${variantClasses[variant]}`}
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
      />
    </div>
  )
}