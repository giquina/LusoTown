'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'
import { PORTUGUESE_COLORS, DESIGN_TOKENS } from '@/config/brand'

interface GlassmorphismProps {
  children: React.ReactNode
  className?: string
  variant?: 'light' | 'dark' | 'portuguese' | 'premium' | 'elite' | 'heritage'
  intensity?: 'subtle' | 'medium' | 'strong' | 'ultra'
  gradient?: boolean
  bordered?: boolean
  shadow?: 'none' | 'soft' | 'medium' | 'strong'
  hover?: boolean
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  as?: 'div' | 'section' | 'article' | 'nav' | 'header' | 'footer'
}

const intensityClasses = {
  subtle: 'backdrop-blur-sm bg-white/10',
  medium: 'backdrop-blur-md bg-white/15',
  strong: 'backdrop-blur-lg bg-white/20',
  ultra: 'backdrop-blur-xl bg-white/25'
}

const variantClasses = {
  light: {
    subtle: 'backdrop-blur-sm bg-white/20 border-white/30',
    medium: 'backdrop-blur-md bg-white/30 border-white/40',
    strong: 'backdrop-blur-lg bg-white/40 border-white/50',
    ultra: 'backdrop-blur-xl bg-white/50 border-white/60'
  },
  dark: {
    subtle: 'backdrop-blur-sm bg-black/20 border-white/10',
    medium: 'backdrop-blur-md bg-black/30 border-white/15',
    strong: 'backdrop-blur-lg bg-black/40 border-white/20',
    ultra: 'backdrop-blur-xl bg-black/50 border-white/25'
  },
  portuguese: {
    subtle: 'backdrop-blur-sm bg-gradient-to-br from-red-500/10 via-amber-500/10 to-green-500/10 border-amber-400/30',
    medium: 'backdrop-blur-md bg-gradient-to-br from-red-500/15 via-amber-500/15 to-green-500/15 border-amber-400/40',
    strong: 'backdrop-blur-lg bg-gradient-to-br from-red-500/20 via-amber-500/20 to-green-500/20 border-amber-400/50',
    ultra: 'backdrop-blur-xl bg-gradient-to-br from-red-500/25 via-amber-500/25 to-green-500/25 border-amber-400/60'
  },
  premium: {
    subtle: 'backdrop-blur-sm bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 border-purple-400/30',
    medium: 'backdrop-blur-md bg-gradient-to-br from-purple-500/15 via-pink-500/15 to-purple-500/15 border-purple-400/40',
    strong: 'backdrop-blur-lg bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-500/20 border-purple-400/50',
    ultra: 'backdrop-blur-xl bg-gradient-to-br from-purple-500/25 via-pink-500/25 to-purple-500/25 border-purple-400/60'
  },
  elite: {
    subtle: 'backdrop-blur-sm bg-gradient-to-br from-slate-900/20 via-amber-600/10 to-slate-900/20 border-amber-400/30',
    medium: 'backdrop-blur-md bg-gradient-to-br from-slate-900/30 via-amber-600/15 to-slate-900/30 border-amber-400/40',
    strong: 'backdrop-blur-lg bg-gradient-to-br from-slate-900/40 via-amber-600/20 to-slate-900/40 border-amber-400/50',
    ultra: 'backdrop-blur-xl bg-gradient-to-br from-slate-900/50 via-amber-600/25 to-slate-900/50 border-amber-400/60'
  },
  heritage: {
    subtle: 'backdrop-blur-sm bg-gradient-to-br from-amber-400/15 via-white/10 to-amber-800/15 border-amber-300/30',
    medium: 'backdrop-blur-md bg-gradient-to-br from-amber-400/20 via-white/15 to-amber-800/20 border-amber-300/40',
    strong: 'backdrop-blur-lg bg-gradient-to-br from-amber-400/25 via-white/20 to-amber-800/25 border-amber-300/50',
    ultra: 'backdrop-blur-xl bg-gradient-to-br from-amber-400/30 via-white/25 to-amber-800/30 border-amber-300/60'
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
  full: 'rounded-full'
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10'
}

export default function Glassmorphism({
  children,
  className = '',
  variant = 'light',
  intensity = 'medium',
  gradient = false,
  bordered = true,
  shadow = 'medium',
  hover = true,
  rounded = 'xl',
  padding = 'md',
  as: Component = 'div',
  ...props
}: GlassmorphismProps) {
  const baseClasses = cn(
    // Base glass styles
    'relative overflow-hidden transition-all duration-300 ease-in-out',
    
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
    hover && 'hover:shadow-xl hover:scale-[1.02] hover:bg-white/30 dark:hover:bg-white/20',
    
    // Custom classes
    className
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={baseClasses}
      {...props}
    >
      {/* Portuguese cultural pattern overlay */}
      {variant === 'portuguese' && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpattern id='azulejo' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Crect width='20' height='20' fill='none'/%3E%3Ccircle cx='10' cy='10' r='3' fill='rgba(212,165,116,0.3)'/%3E%3C/pattern%3E%3Crect width='100' height='100' fill='url(%23azulejo)'/%3E%3C/svg%3E")`
          }} />
        </div>
      )}

      {/* Elite sparkle effect */}
      {variant === 'elite' && (
        <div className="absolute inset-0 opacity-20">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 bg-[${PORTUGUESE_COLORS.gold[400]}] rounded-full`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${15 + i * 10}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      )}

      {/* Heritage ornamental border */}
      {variant === 'heritage' && bordered && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50" />
          <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50" />
          <div className="absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-amber-400 to-transparent opacity-50" />
          <div className="absolute right-0 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-amber-400 to-transparent opacity-50" />
        </div>
      )}

      {/* Premium glow effect */}
      {variant === 'premium' && (
        <div className="absolute -inset-px bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-purple-400/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
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

export function EliteGlassCard({ children, className, ...props }: Omit<GlassmorphismProps, 'as'>) {
  return (
    <Glassmorphism
      className={cn('w-full', className)}
      variant="elite"
      intensity="strong"
      shadow="strong"
      rounded="2xl"
      padding="xl"
      {...props}
    >
      {children}
    </Glassmorphism>
  )
}

export function PremiumGlassModal({ children, className, ...props }: Omit<GlassmorphismProps, 'as'>) {
  return (
    <Glassmorphism
      className={cn('max-w-lg w-full mx-auto', className)}
      variant="premium"
      intensity="ultra"
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