'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface LuxuryHeadingProps {
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  variant?: 'default' | 'luxury' | 'portuguese' | 'heritage' | 'premium'
  className?: string
  gradient?: boolean
  uppercase?: boolean
}

const headingLevels = {
  1: 'text-5xl md:text-6xl lg:text-7xl font-black tracking-tight',
  2: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
  3: 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight',
  4: 'text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight',
  5: 'text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight',
  6: 'text-lg md:text-xl lg:text-2xl font-medium tracking-tight'
}

const variantStyles = {
  default: 'text-gray-900',
  luxury: 'text-premium-900 font-display',
  portuguese: 'text-red-800 font-display',
  heritage: 'text-primary-900 font-display',
  premium: 'text-premium-800 font-display'
}

const gradientStyles = {
  default: 'bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent',
  luxury: 'bg-gradient-to-r from-premium-600 via-premium-800 to-premium-900 bg-clip-text text-transparent',
  portuguese: 'bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 bg-clip-text text-transparent',
  heritage: 'bg-gradient-to-r from-primary-600 via-secondary-600 to-coral-600 bg-clip-text text-transparent',
  premium: 'bg-gradient-to-r from-premium-600 via-premium-700 to-premium-800 bg-clip-text text-transparent'
}

export function LuxuryHeading({
  children,
  level = 1,
  variant = 'default',
  className = '',
  gradient = false,
  uppercase = false
}: LuxuryHeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <Tag
      className={cn(
        // Base styles
        headingLevels[level],
        
        // Variant or gradient
        gradient ? gradientStyles[variant] : variantStyles[variant],
        
        // Uppercase
        uppercase && 'uppercase',
        
        // Custom classes
        className
      )}
    >
      {children}
    </Tag>
  )
}

interface LuxuryTextProps {
  children: React.ReactNode
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  variant?: 'default' | 'muted' | 'accent' | 'premium' | 'portuguese'
  className?: string
  gradient?: boolean
  spacing?: 'tight' | 'normal' | 'relaxed' | 'loose'
}

const textSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl'
}

const textWeights = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
}

const textVariants = {
  default: 'text-gray-900',
  muted: 'text-gray-600',
  accent: 'text-accent-600',
  premium: 'text-premium-700',
  portuguese: 'text-red-700'
}

const textGradients = {
  default: 'bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent',
  muted: 'bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text text-transparent',
  accent: 'bg-gradient-to-r from-accent-500 to-accent-700 bg-clip-text text-transparent',
  premium: 'bg-gradient-to-r from-premium-600 to-premium-800 bg-clip-text text-transparent',
  portuguese: 'bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent'
}

const textSpacing = {
  tight: 'leading-tight',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose'
}

export function LuxuryText({
  children,
  size = 'base',
  weight = 'normal',
  variant = 'default',
  className = '',
  gradient = false,
  spacing = 'normal'
}: LuxuryTextProps) {
  return (
    <p
      className={cn(
        // Base styles
        textSizes[size],
        textWeights[weight],
        textSpacing[spacing],
        
        // Variant or gradient
        gradient ? textGradients[variant] : textVariants[variant],
        
        // Custom classes
        className
      )}
    >
      {children}
    </p>
  )
}

interface QuoteProps {
  children: React.ReactNode
  author?: string
  role?: string
  className?: string
  variant?: 'default' | 'luxury' | 'portuguese'
}

export function LuxuryQuote({
  children,
  author,
  role,
  className = '',
  variant = 'default'
}: QuoteProps) {
  const variantClasses = {
    default: 'border-l-primary-500 text-gray-700',
    luxury: 'border-l-premium-500 text-premium-800',
    portuguese: 'border-l-red-500 text-red-800'
  }

  return (
    <blockquote className={cn(
      'border-l-4 pl-6 py-4 italic text-lg leading-relaxed',
      variantClasses[variant],
      className
    )}>
      <p className="mb-4">{children}</p>
      {(author || role) && (
        <footer className="text-sm font-medium not-italic">
          {author && <cite className="font-semibold">{author}</cite>}
          {role && <span className="text-gray-500 ml-2">{role}</span>}
        </footer>
      )}
    </blockquote>
  )
}

interface HighlightProps {
  children: React.ReactNode
  variant?: 'default' | 'portuguese' | 'premium' | 'accent'
  className?: string
}

export function TextHighlight({
  children,
  variant = 'default',
  className = ''
}: HighlightProps) {
  const highlightVariants = {
    default: 'bg-primary-100 text-primary-900',
    portuguese: 'bg-red-100 text-red-900',
    premium: 'bg-premium-100 text-premium-900',
    accent: 'bg-accent-100 text-accent-900'
  }

  return (
    <mark className={cn(
      'px-2 py-1 rounded-lg font-medium',
      highlightVariants[variant],
      className
    )}>
      {children}
    </mark>
  )
}

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'premium' | 'portuguese' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const badgeVariants = {
  default: 'bg-gray-100 text-gray-800 border-gray-200',
  premium: 'bg-premium-100 text-premium-800 border-premium-200',
  portuguese: 'bg-gradient-to-r from-red-100 to-green-100 text-red-800 border-red-200',
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  error: 'bg-red-100 text-red-800 border-red-200'
}

const badgeSizes = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-2 text-base'
}

export function LuxuryBadge({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center font-medium rounded-full border',
      badgeVariants[variant],
      badgeSizes[size],
      className
    )}>
      {children}
    </span>
  )
}

interface StatsProps {
  value: string | number
  label: string
  variant?: 'default' | 'premium' | 'portuguese'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LuxuryStats({
  value,
  label,
  variant = 'default',
  size = 'md',
  className = ''
}: StatsProps) {
  const sizeClasses = {
    sm: { value: 'text-2xl', label: 'text-sm' },
    md: { value: 'text-4xl', label: 'text-base' },
    lg: { value: 'text-6xl', label: 'text-lg' }
  }

  const variantClasses = {
    default: { value: 'text-primary-600', label: 'text-gray-600' },
    premium: { value: 'text-premium-600', label: 'text-premium-600' },
    portuguese: { value: 'bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent', label: 'text-red-600' }
  }

  return (
    <div className={cn('text-center', className)}>
      <div className={cn(
        'font-bold font-display',
        sizeClasses[size].value,
        variantClasses[variant].value
      )}>
        {value}
      </div>
      <div className={cn(
        'font-medium mt-1',
        sizeClasses[size].label,
        variantClasses[variant].label
      )}>
        {label}
      </div>
    </div>
  )
}