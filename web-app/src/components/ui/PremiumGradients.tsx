'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface GradientBackgroundProps {
  children: React.ReactNode
  variant?: 'portuguese' | 'luxury' | 'heritage' | 'premium' | 'coral' | 'sunset' | 'ocean' | 'forest'
  className?: string
  opacity?: number
  overlay?: boolean
}

const gradientVariants = {
  portuguese: 'bg-gradient-to-br from-red-600 via-yellow-500 to-green-600',
  luxury: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
  heritage: 'bg-gradient-to-br from-primary-600 via-secondary-600 to-coral-600',
  premium: 'bg-gradient-to-br from-premium-600 via-premium-800 to-premium-900',
  coral: 'bg-gradient-to-br from-coral-500 via-accent-500 to-coral-700',
  sunset: 'bg-gradient-to-br from-orange-500 via-red-500 to-pink-600',
  ocean: 'bg-gradient-to-br from-blue-600 via-teal-600 to-cyan-600',
  forest: 'bg-gradient-to-br from-green-700 via-emerald-600 to-teal-700'
}

export function GradientBackground({
  children,
  variant = 'heritage',
  className = '',
  opacity = 100,
  overlay = false
}: GradientBackgroundProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Gradient background */}
      <div 
        className={cn(
          'absolute inset-0',
          gradientVariants[variant]
        )}
        style={{ opacity: opacity / 100 }}
      />
      
      {/* Optional overlay for better text readability */}
      {overlay && (
        <div className="absolute inset-0 bg-black/20" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

interface GradientTextProps {
  children: React.ReactNode
  variant?: 'portuguese' | 'luxury' | 'heritage' | 'premium' | 'coral'
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
}

const textGradients = {
  portuguese: 'bg-gradient-to-r from-red-600 via-yellow-500 to-green-600',
  luxury: 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600',
  heritage: 'bg-gradient-to-r from-primary-600 via-secondary-600 to-coral-600',
  premium: 'bg-gradient-to-r from-premium-600 via-premium-700 to-premium-800',
  coral: 'bg-gradient-to-r from-coral-500 via-accent-500 to-coral-700'
}

const textSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl'
}

export function GradientText({
  children,
  variant = 'heritage',
  className = '',
  size = 'md'
}: GradientTextProps) {
  return (
    <span 
      className={cn(
        'bg-clip-text text-transparent font-bold',
        textGradients[variant],
        textSizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}

interface AnimatedGradientProps {
  children: React.ReactNode
  className?: string
  speed?: 'slow' | 'normal' | 'fast'
}

export function AnimatedGradient({
  children,
  className = '',
  speed = 'normal'
}: AnimatedGradientProps) {
  const speedClasses = {
    slow: 'animate-pulse duration-[4s]',
    normal: 'animate-pulse duration-[3s]',
    fast: 'animate-pulse duration-[2s]'
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Animated background */}
      <div className={cn(
        'absolute inset-0 bg-gradient-to-r from-primary-600 via-secondary-600 to-coral-600',
        speedClasses[speed]
      )} />
      
      {/* Moving highlight */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

interface GlassmorphismProps {
  children: React.ReactNode
  className?: string
  blur?: 'sm' | 'md' | 'lg' | 'xl'
  opacity?: number
  border?: boolean
}

const blurClasses = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl'
}

export function Glassmorphism({
  children,
  className = '',
  blur = 'lg',
  opacity = 80,
  border = true
}: GlassmorphismProps) {
  return (
    <div 
      className={cn(
        'rounded-3xl',
        blurClasses[blur],
        border && 'border border-white/20 shadow-xl',
        className
      )}
      style={{ 
        backgroundColor: `rgba(255, 255, 255, ${opacity / 100})` 
      }}
    >
      {children}
    </div>
  )
}

interface PatternOverlayProps {
  children: React.ReactNode
  pattern?: 'dots' | 'grid' | 'waves' | 'portuguese'
  className?: string
  opacity?: number
}

export function PatternOverlay({
  children,
  pattern = 'dots',
  className = '',
  opacity = 10
}: PatternOverlayProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Pattern background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: opacity / 100 }}
      >
        {pattern === 'dots' && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.3)_1px,transparent_0)] bg-[length:20px_20px]" />
        )}
        {pattern === 'grid' && (
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
        )}
        {pattern === 'waves' && (
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M30%2030c0-11.046-8.954-20-20-20s-20%208.954-20%2020%208.954%2020%2020%2020%2020-8.954%2020-20z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        )}
        {pattern === 'portuguese' && (
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23dc2626%22%20fill-opacity%3D%220.05%22%3E%3Cpolygon%20points%3D%2220%200%2040%2020%2020%2040%200%2020%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        )}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}