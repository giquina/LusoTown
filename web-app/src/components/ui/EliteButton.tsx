'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface EliteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'premium' | 'heritage' | 'coral' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  gradient?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  luxury?: boolean
  portuguese?: boolean
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm font-medium',
  md: 'px-6 py-3 text-base font-semibold',
  lg: 'px-8 py-4 text-lg font-semibold',
  xl: 'px-10 py-5 text-xl font-bold'
}

const variantClasses = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/30',
  secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 shadow-lg shadow-secondary-500/30',
  premium: 'bg-premium-600 text-white hover:bg-premium-700 shadow-lg shadow-premium-500/30',
  heritage: 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700 shadow-lg shadow-primary-500/30',
  coral: 'bg-coral-600 text-white hover:bg-coral-700 shadow-lg shadow-coral-500/30',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900',
  outline: 'bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:border-primary-600'
}

const luxuryClasses = {
  primary: 'bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 shadow-xl shadow-primary-500/40 hover:shadow-2xl hover:shadow-primary-500/50',
  secondary: 'bg-gradient-to-r from-secondary-600 via-secondary-700 to-secondary-800 shadow-xl shadow-secondary-500/40 hover:shadow-2xl hover:shadow-secondary-500/50',
  premium: 'bg-gradient-to-r from-premium-600 via-premium-700 to-premium-800 shadow-xl shadow-premium-500/40 hover:shadow-2xl hover:shadow-premium-500/50',
  heritage: 'bg-gradient-to-r from-primary-600 via-coral-600 to-secondary-600 shadow-xl shadow-primary-500/40 hover:shadow-2xl hover:shadow-coral-500/50',
  coral: 'bg-gradient-to-r from-coral-600 via-coral-700 to-coral-800 shadow-xl shadow-coral-500/40 hover:shadow-2xl hover:shadow-coral-500/50',
  ghost: 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:from-gray-100 hover:to-gray-200 shadow-lg hover:shadow-xl',
  outline: 'bg-gradient-to-r from-transparent to-transparent border-2 border-gradient-to-r border-primary-500 text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50'
}

const portugueseClasses = {
  primary: 'bg-gradient-to-r from-red-600 via-green-600 to-red-600 shadow-xl shadow-red-500/40',
  secondary: 'bg-gradient-to-r from-green-600 via-red-600 to-green-600 shadow-xl shadow-green-500/40',
  premium: 'bg-gradient-to-r from-yellow-500 via-red-600 to-green-600 shadow-xl shadow-yellow-500/40',
  heritage: 'bg-gradient-to-r from-red-700 via-yellow-500 to-green-700 shadow-xl shadow-red-500/40',
  coral: 'bg-gradient-to-r from-coral-600 via-yellow-500 to-red-600 shadow-xl shadow-coral-500/40',
  ghost: 'bg-gradient-to-r from-red-50 to-green-50 text-red-700 hover:from-red-100 hover:to-green-100',
  outline: 'border-2 border-red-500 text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-green-50'
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
  disabled,
  ...props
}: EliteButtonProps) {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center font-display rounded-2xl transition-all duration-300 ease-in-out transform-gpu focus:outline-none focus:ring-4 focus:ring-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden',
        
        // Size
        sizeClasses[size],
        
        // Variant styles
        luxury 
          ? luxuryClasses[variant]
          : portuguese 
            ? portugueseClasses[variant]
            : variantClasses[variant],
        
        // Full width
        fullWidth && 'w-full',
        
        // Loading state
        loading && 'cursor-wait',
        
        // Custom classes
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {/* Portuguese cultural pattern overlay */}
      {portuguese && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse" />
        </div>
      )}
      
      {/* Luxury shimmer effect */}
      {luxury && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse" />
        </div>
      )}
      
      {/* Content */}
      <div className="relative flex items-center justify-center space-x-2">
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className="flex-shrink-0">{icon}</span>
            )}
            <span>{children}</span>
            {icon && iconPosition === 'right' && (
              <span className="flex-shrink-0">{icon}</span>
            )}
          </>
        )}
      </div>
    </motion.button>
  )
}