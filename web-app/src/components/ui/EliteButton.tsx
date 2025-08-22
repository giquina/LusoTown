'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'
import { PORTUGUESE_COLORS, DESIGN_TOKENS } from '@/config/brand'

interface EliteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'premium' | 'heritage' | 'coral' | 'ghost' | 'outline' | 'elite' | 'platinum'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  gradient?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  luxury?: boolean
  portuguese?: boolean
  elevation?: 'none' | 'low' | 'medium' | 'high' | 'ultra'
  glow?: boolean
  shimmer?: boolean
}

const sizeClasses = {
  xs: 'px-3 py-1.5 text-xs font-medium',
  sm: 'px-4 py-2 text-sm font-medium',
  md: 'px-6 py-3 text-base font-semibold',
  lg: 'px-8 py-4 text-lg font-semibold',
  xl: 'px-10 py-5 text-xl font-bold',
  '2xl': 'px-12 py-6 text-2xl font-bold'
}

const elevationClasses = {
  none: '',
  low: 'shadow-md hover:shadow-lg',
  medium: 'shadow-lg hover:shadow-xl',
  high: 'shadow-xl hover:shadow-2xl',
  ultra: 'shadow-2xl hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'
}

const variantClasses = {
  primary: 'bg-gradient-to-br from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-lg shadow-amber-500/30',
  secondary: 'bg-gradient-to-br from-amber-800 to-amber-900 text-white hover:from-amber-900 hover:to-amber-950 shadow-lg shadow-amber-800/30',
  premium: 'bg-gradient-to-br from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-lg shadow-purple-500/30',
  heritage: 'bg-gradient-to-br from-amber-500 via-red-500 to-green-500 text-white hover:shadow-xl shadow-lg shadow-amber-500/40',
  coral: 'bg-gradient-to-br from-coral-500 to-coral-600 text-white hover:from-coral-600 hover:to-coral-700 shadow-lg shadow-coral-500/30',
  ghost: 'bg-white/10 backdrop-blur-sm text-gray-700 hover:bg-white/20 hover:text-gray-900 border border-white/20',
  outline: 'bg-transparent border-2 border-amber-500 text-amber-600 hover:bg-amber-50 hover:border-amber-600',
  elite: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border border-amber-500/30 shadow-xl shadow-slate-900/50 hover:border-amber-400/50',
  platinum: 'bg-gradient-to-br from-gray-100 via-white to-gray-100 text-slate-800 border border-slate-200 shadow-xl shadow-slate-300/50 hover:shadow-slate-400/60'
}

const luxuryClasses = {
  primary: 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-xl shadow-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/60 hover:from-amber-500 hover:to-amber-700',
  secondary: 'bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 shadow-xl shadow-amber-800/40 hover:shadow-2xl hover:shadow-amber-800/60',
  premium: 'bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 shadow-xl shadow-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/60',
  heritage: 'bg-gradient-to-br from-amber-400 via-red-500 to-green-500 shadow-xl shadow-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/60',
  coral: 'bg-gradient-to-br from-coral-500 via-coral-600 to-coral-700 shadow-xl shadow-coral-500/40 hover:shadow-2xl hover:shadow-coral-500/60',
  ghost: 'bg-white/20 backdrop-blur-md text-gray-700 hover:bg-white/30 hover:text-gray-900 border border-white/30 shadow-lg hover:shadow-xl',
  outline: 'bg-transparent border-2 border-amber-400 text-amber-600 hover:bg-amber-50 hover:border-amber-500 hover:shadow-lg',
  elite: 'bg-gradient-to-br from-slate-800 via-slate-900 to-black text-white border border-amber-400/40 shadow-2xl shadow-slate-900/80 hover:border-amber-300/60 hover:shadow-amber-500/20',
  platinum: 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 border border-slate-300 shadow-2xl shadow-slate-400/60 hover:shadow-slate-500/80 hover:border-slate-400'
}

const portugueseClasses = {
  primary: 'bg-gradient-to-br from-red-500 via-amber-500 to-green-500 shadow-xl shadow-red-500/40 text-white',
  secondary: 'bg-gradient-to-br from-green-500 via-amber-500 to-red-500 shadow-xl shadow-green-500/40 text-white',
  premium: 'bg-gradient-to-br from-amber-400 via-red-500 to-green-500 shadow-xl shadow-amber-500/40 text-white',
  heritage: 'bg-gradient-to-br from-red-600 via-amber-500 to-green-600 shadow-xl shadow-red-500/40 text-white',
  coral: 'bg-gradient-to-br from-coral-600 via-amber-500 to-red-600 shadow-xl shadow-coral-500/40 text-white',
  ghost: 'bg-gradient-to-br from-red-50 to-green-50 text-red-700 hover:from-red-100 hover:to-green-100 border border-red-200',
  outline: 'border-2 border-red-500 text-red-600 hover:bg-gradient-to-br hover:from-red-50 hover:to-green-50',
  elite: 'bg-gradient-to-br from-red-800 via-black to-green-800 text-white border border-amber-400/40 shadow-2xl',
  platinum: 'bg-gradient-to-br from-amber-100 via-white to-amber-100 text-amber-800 border border-amber-300 shadow-2xl'
}

export default function EliteButton({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  gradient = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  luxury = false,
  portuguese = false,
  elevation = 'medium',
  glow = false,
  shimmer = false,
  disabled,
  ...props
}: EliteButtonProps) {
  const { t } = useLanguage()

  const getVariantClasses = () => {
    if (luxury) return luxuryClasses[variant]
    if (portuguese) return portugueseClasses[variant]
    return variantClasses[variant]
  }

  return (
    <motion.button
      whileHover={{ 
        scale: disabled ? 1 : 1.02,
        y: disabled ? 0 : -1,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ 
        scale: disabled ? 1 : 0.98,
        transition: { duration: 0.1 }
      }}
      className={cn(
        // Base styles
        'group relative inline-flex items-center justify-center font-display rounded-2xl transition-all duration-300 ease-in-out transform-gpu focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden',
        
        // Size
        sizeClasses[size],
        
        // Elevation
        elevationClasses[elevation],
        
        // Variant styles
        getVariantClasses(),
        
        // Full width
        fullWidth && 'w-full',
        
        // Loading state
        loading && 'cursor-wait',
        
        // Glow effect
        glow && 'hover:drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]',
        
        // Custom classes
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {/* Portuguese cultural pattern overlay */}
      {portuguese && (
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 animate-shimmer" />
          <div className="absolute top-0 left-0 w-full h-full opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M20,20 Q50,0 80,20 Q100,50 80,80 Q50,100 20,80 Q0,50 20,20 Z' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E")`
          }} />
        </div>
      )}
      
      {/* Luxury shimmer effect */}
      {(luxury || shimmer) && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 animate-shimmer-slow" />
        </div>
      )}

      {/* Elite glow ring */}
      {variant === 'elite' && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 rounded-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
      )}

      {/* Platinum shine */}
      {variant === 'platinum' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
      )}
      
      {/* Content */}
      <div className="relative flex items-center justify-center space-x-2 z-10">
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span className="text-sm opacity-80">{t('common.loading')}</span>
          </div>
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">{icon}</span>
            )}
            <span className="font-medium tracking-wide">{children}</span>
            {icon && iconPosition === 'right' && (
              <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">{icon}</span>
            )}
          </>
        )}
      </div>

      {/* Ripple effect on click */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 transform scale-0 bg-white/20 rounded-full group-active:scale-100 transition-transform duration-300 ease-out" />
      </div>
    </motion.button>
  )
}