'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LuxuryCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'premium' | 'heritage' | 'coral' | 'glassmorphism'
  elevation?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  hover?: boolean
  gradient?: boolean
  border?: boolean
  backdropBlur?: boolean
  onClick?: () => void
  animate?: boolean
}

const elevationClasses = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg shadow-gray-200/50',
  xl: 'shadow-xl shadow-gray-300/30',
  '2xl': 'shadow-2xl shadow-gray-400/20'
}

const variantClasses = {
  default: 'bg-white border-gray-100/50',
  premium: 'bg-gradient-to-br from-premium-50 via-white to-premium-50/30 border-premium-200/50',
  heritage: 'bg-gradient-to-br from-primary-50 via-white to-secondary-50/30 border-primary-200/50',
  coral: 'bg-gradient-to-br from-coral-50 via-white to-accent-50/30 border-coral-200/50',
  glassmorphism: 'bg-white/80 backdrop-blur-xl border-white/20'
}

export default function LuxuryCard({
  children,
  className = '',
  variant = 'default',
  elevation = 'lg',
  hover = true,
  gradient = false,
  border = true,
  backdropBlur = false,
  onClick,
  animate = true
}: LuxuryCardProps) {
  const Component = animate ? motion.div : 'div'
  
  const motionProps = animate ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    whileHover: hover ? { 
      y: -4, 
      scale: 1.02,
      transition: { duration: 0.2 }
    } : undefined
  } : {}

  return (
    <Component
      className={cn(
        // Base styles
        'rounded-3xl overflow-hidden transition-all duration-300 ease-in-out',
        
        // Elevation
        elevationClasses[elevation],
        
        // Variant styles
        variantClasses[variant],
        
        // Border
        border && 'border',
        
        // Backdrop blur
        backdropBlur && 'backdrop-blur-xl',
        
        // Hover effects
        hover && 'hover:shadow-2xl hover:shadow-gray-400/25 hover:border-primary-300/50',
        
        // Gradient overlay
        gradient && 'bg-gradient-to-br from-white via-gray-50/50 to-primary-50/30',
        
        // Cursor
        onClick && 'cursor-pointer',
        
        // Custom classes
        className
      )}
      onClick={onClick}
      {...motionProps}
    >
      {/* Lusophone-inspired decorative elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-500/20 to-transparent rounded-full transform translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary-500/20 to-transparent rounded-full transform -translate-x-12 translate-y-12" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </Component>
  )
}