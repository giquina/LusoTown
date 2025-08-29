'use client'

import { useLanguage } from '@/context/LanguageContext'
import { HERITAGE_COLORS } from '@/config/brand'

interface ResponsiveButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export default function ResponsiveButton({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className = '',
  type = 'button'
}: ResponsiveButtonProps) {
  const { t } = useLanguage()

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[44px] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: `bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 border border-primary-600`,
    secondary: `bg-secondary-600 hover:bg-secondary-700 text-white focus:ring-secondary-500 border border-secondary-600`,
    outline: `bg-transparent hover:bg-primary-50 text-primary-700 border border-primary-300 focus:ring-primary-500`
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      style={{
        '--heritage-primary': HERITAGE_COLORS.primary,
        '--heritage-secondary': HERITAGE_COLORS.secondary
      } as React.CSSProperties}
    >
      {children}
    </button>
  )
}