'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface GlassmorphismProps {
  children: React.ReactNode
  className?: string
  variant?: 'light' | 'dark' | 'portuguese' | 'heritage'
  intensity?: 'subtle' | 'medium' | 'strong'
  bordered?: boolean
  shadow?: 'none' | 'soft' | 'medium' | 'strong'
  hover?: boolean
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  as?: 'div' | 'section' | 'article' | 'nav' | 'header' | 'footer'
  culturalElements?: boolean
}

const variantClasses = {
  light: {
    subtle: 'backdrop-blur-sm bg-white/20 border-white/30',
    medium: 'backdrop-blur-md bg-white/30 border-white/40',
    strong: 'backdrop-blur-lg bg-white/40 border-white/50'
  },
  dark: {
    subtle: 'backdrop-blur-sm bg-black/20 border-white/10',
    medium: 'backdrop-blur-md bg-black/30 border-white/15',
    strong: 'backdrop-blur-lg bg-black/40 border-white/20'
  },
  portuguese: {
    subtle: 'backdrop-blur-sm bg-gradient-to-br from-red-500/10 via-amber-500/10 to-green-500/10 border-amber-400/30',
    medium: 'backdrop-blur-md bg-gradient-to-br from-red-500/15 via-amber-500/15 to-green-500/15 border-amber-400/40',
    strong: 'backdrop-blur-lg bg-gradient-to-br from-red-500/20 via-amber-500/20 to-green-500/20 border-amber-400/50'
  },
  heritage: {
    subtle: 'backdrop-blur-sm bg-gradient-to-br from-amber-400/15 via-white/10 to-amber-800/15 border-amber-300/30',
    medium: 'backdrop-blur-md bg-gradient-to-br from-amber-400/20 via-white/15 to-amber-800/20 border-amber-300/40',
    strong: 'backdrop-blur-lg bg-gradient-to-br from-amber-400/25 via-white/20 to-amber-800/25 border-amber-300/50'
  }
}

const shadowClasses = {
  none: '',
  soft: 'shadow-lg shadow-black/5',
  medium: 'shadow-xl shadow-black/10',
  strong: 'shadow-2xl shadow-black/15'
}

const roundedClasses = {
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  xl: 'rounded-3xl',
  '2xl': 'rounded-[2rem]',
  '3xl': 'rounded-[2.5rem]',
  full: 'rounded-full'
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
  '2xl': 'p-12'
}

export default function Glassmorphism({
  children,
  className = '',
  variant = 'light',
  intensity = 'medium',
  bordered = true,
  shadow = 'medium',
  hover = true,
  rounded = 'xl',
  padding = 'md',
  as: Component = 'div',
  culturalElements = false,
  ...props
}: GlassmorphismProps) {
  
  const baseClasses = cn(
    // Base glass styles
    'relative overflow-hidden',
    
    // Variant and intensity
    variantClasses[variant][intensity],
    
    // Border
    bordered && 'border',
    
    // Shadow
    shadowClasses[shadow],
    
    // Rounded corners
    roundedClasses[rounded],
    
    // Padding
    paddingClasses[padding],
    
    // Hover effects
    hover && 'hover:backdrop-blur-xl hover:bg-opacity-80 transition-all duration-300 ease-out',
    
    // Custom classes
    className
  )

  return (
    <Component
      className={baseClasses}
      {...props}
    >
      {/* Portuguese cultural pattern overlay */}
      {(variant === 'portuguese' || culturalElements) && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpattern id='azulejo-pattern' x='0' y='0' width='25' height='25' patternUnits='userSpaceOnUse'%3E%3Crect width='25' height='25' fill='none'/%3E%3Cpath d='M12.5,2 L23,12.5 L12.5,23 L2,12.5 Z' fill='rgba(212,165,116,0.1)' stroke='rgba(245,158,11,0.15)' stroke-width='0.5'/%3E%3Ccircle cx='12.5' cy='12.5' r='2' fill='rgba(245,158,11,0.2)'/%3E%3C/pattern%3E%3Crect width='100' height='100' fill='url(%23azulejo-pattern)'/%3E%3C/svg%3E")`
          }} />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </Component>
  )
}

// Specialized glassmorphism components
export function GlassCard({ children, className, ...props }: Omit<GlassmorphismProps, 'as'>) {
  return (
    <Glassmorphism
      className={cn('w-full', className)}
      variant="light"
      intensity="medium"
      shadow="medium"
      rounded="xl"
      padding="lg"
      {...props}
    >
      {children}
    </Glassmorphism>
  )
}

export function PortugueseGlassCard({ children, className, ...props }: Omit<GlassmorphismProps, 'as'>) {
  return (
    <Glassmorphism
      className={cn('w-full', className)}
      variant="portuguese"
      intensity="medium"
      shadow="strong"
      rounded="xl"
      padding="lg"
      {...props}
    >
      {children}
    </Glassmorphism>
  )
}

export function CommunityGlassModal({ children, className, ...props }: Omit<GlassmorphismProps, 'as'>) {
  return (
    <Glassmorphism
      className={cn('max-w-lg w-full mx-auto', className)}
      variant="light"
      intensity="strong"
      shadow="strong"
      rounded="2xl"
      padding="xl"
      hover={false}
      {...props}
    >
      {children}
    </Glassmorphism>
  )
}

export function HeritageGlassPanel({ children, className, ...props }: Omit<GlassmorphismProps, 'as'>) {
  return (
    <Glassmorphism
      className={cn('w-full', className)}
      variant="heritage"
      intensity="medium"
      shadow="soft"
      rounded="lg"
      padding="md"
      {...props}
    >
      {children}
    </Glassmorphism>
  )
}