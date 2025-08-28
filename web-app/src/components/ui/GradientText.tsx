'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface GradientTextProps {
  children: React.ReactNode
  variant?: 'heritage' | 'primary' | 'accent' | 'brand'
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  className?: string
}

export default function GradientText({
  children,
  variant = 'heritage',
  size = 'base',
  className
}: GradientTextProps) {
  const variantClasses = {
    heritage: 'bg-gradient-to-r from-red-600 via-green-600 to-red-600 bg-clip-text text-transparent',
    primary: 'bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent',
    accent: 'bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent',
    brand: 'bg-gradient-to-r from-red-600 via-green-600 to-red-600 bg-clip-text text-transparent'
  }

  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl'
  }

  return (
    <span 
      className={cn(
        'font-bold',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  )
}