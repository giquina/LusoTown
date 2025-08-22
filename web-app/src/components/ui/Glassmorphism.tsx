'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'
import { PORTUGUESE_COLORS, DESIGN_TOKENS } from '@/config/brand'

interface GlassmorphismProps {
  children: React.ReactNode
  className?: string
  variant?: 'light' | 'dark' | 'portuguese' | 'premium' | 'elite' | 'heritage' | 'aristocratic' | 'royal' | 'imperial' | 'diamond'
  intensity?: 'subtle' | 'medium' | 'strong' | 'ultra' | 'supreme'
  gradient?: boolean
  bordered?: boolean
  shadow?: 'none' | 'soft' | 'medium' | 'strong' | 'luxury'
  hover?: boolean
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  as?: 'div' | 'section' | 'article' | 'nav' | 'header' | 'footer'
  sophistication?: 'refined' | 'opulent' | 'majestic'
  culturalElements?: boolean
  luxuryFrame?: boolean
  premiumEffects?: boolean
}

const intensityClasses = {
  subtle: 'backdrop-blur-sm bg-white/10',
  medium: 'backdrop-blur-md bg-white/15',
  strong: 'backdrop-blur-lg bg-white/20',
  ultra: 'backdrop-blur-xl bg-white/25',
  supreme: 'backdrop-blur-2xl bg-white/30'
}

const variantClasses = {
  light: {
    subtle: 'backdrop-blur-sm bg-white/20 border-white/30',
    medium: 'backdrop-blur-md bg-white/30 border-white/40',
    strong: 'backdrop-blur-lg bg-white/40 border-white/50',
    ultra: 'backdrop-blur-xl bg-white/50 border-white/60',
    supreme: 'backdrop-blur-2xl bg-white/60 border-white/70'
  },
  dark: {
    subtle: 'backdrop-blur-sm bg-black/20 border-white/10',
    medium: 'backdrop-blur-md bg-black/30 border-white/15',
    strong: 'backdrop-blur-lg bg-black/40 border-white/20',
    ultra: 'backdrop-blur-xl bg-black/50 border-white/25',
    supreme: 'backdrop-blur-2xl bg-black/60 border-white/30'
  },
  portuguese: {
    subtle: 'backdrop-blur-sm bg-gradient-to-br from-red-500/10 via-amber-500/10 to-green-500/10 border-amber-400/30',
    medium: 'backdrop-blur-md bg-gradient-to-br from-red-500/15 via-amber-500/15 to-green-500/15 border-amber-400/40',
    strong: 'backdrop-blur-lg bg-gradient-to-br from-red-500/20 via-amber-500/20 to-green-500/20 border-amber-400/50',
    ultra: 'backdrop-blur-xl bg-gradient-to-br from-red-500/25 via-amber-500/25 to-green-500/25 border-amber-400/60',
    supreme: 'backdrop-blur-2xl bg-gradient-to-br from-red-500/30 via-amber-500/30 to-green-500/30 border-amber-400/70'
  },
  premium: {
    subtle: 'backdrop-blur-sm bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 border-purple-400/30',
    medium: 'backdrop-blur-md bg-gradient-to-br from-purple-500/15 via-pink-500/15 to-purple-500/15 border-purple-400/40',
    strong: 'backdrop-blur-lg bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-500/20 border-purple-400/50',
    ultra: 'backdrop-blur-xl bg-gradient-to-br from-purple-500/25 via-pink-500/25 to-purple-500/25 border-purple-400/60',
    supreme: 'backdrop-blur-2xl bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-purple-500/30 border-purple-400/70'
  },
  elite: {
    subtle: 'backdrop-blur-sm bg-gradient-to-br from-slate-900/20 via-amber-600/10 to-slate-900/20 border-amber-400/30',
    medium: 'backdrop-blur-md bg-gradient-to-br from-slate-900/30 via-amber-600/15 to-slate-900/30 border-amber-400/40',
    strong: 'backdrop-blur-lg bg-gradient-to-br from-slate-900/40 via-amber-600/20 to-slate-900/40 border-amber-400/50',
    ultra: 'backdrop-blur-xl bg-gradient-to-br from-slate-900/50 via-amber-600/25 to-slate-900/50 border-amber-400/60',
    supreme: 'backdrop-blur-2xl bg-gradient-to-br from-slate-900/60 via-amber-600/30 to-slate-900/60 border-amber-400/70'
  },
  heritage: {
    subtle: 'backdrop-blur-sm bg-gradient-to-br from-amber-400/15 via-white/10 to-amber-800/15 border-amber-300/30',
    medium: 'backdrop-blur-md bg-gradient-to-br from-amber-400/20 via-white/15 to-amber-800/20 border-amber-300/40',
    strong: 'backdrop-blur-lg bg-gradient-to-br from-amber-400/25 via-white/20 to-amber-800/25 border-amber-300/50',
    ultra: 'backdrop-blur-xl bg-gradient-to-br from-amber-400/30 via-white/25 to-amber-800/30 border-amber-300/60',
    supreme: 'backdrop-blur-2xl bg-gradient-to-br from-amber-400/35 via-white/30 to-amber-800/35 border-amber-300/70'
  },
  aristocratic: {
    subtle: 'backdrop-blur-sm bg-gradient-to-br from-red-600/12 via-amber-500/15 to-green-600/12 border-amber-300/40',
    medium: 'backdrop-blur-md bg-gradient-to-br from-red-600/18 via-amber-500/22 to-green-600/18 border-amber-300/50',
    strong: 'backdrop-blur-lg bg-gradient-to-br from-red-600/25 via-amber-500/30 to-green-600/25 border-amber-300/60',
    ultra: 'backdrop-blur-xl bg-gradient-to-br from-red-600/32 via-amber-500/38 to-green-600/32 border-amber-300/70',
    supreme: 'backdrop-blur-2xl bg-gradient-to-br from-red-600/40 via-amber-500/45 to-green-600/40 border-amber-300/80'
  },
  royal: {
    subtle: 'backdrop-blur-sm bg-gradient-to-br from-indigo-700/15 via-purple-600/20 to-blue-700/15 border-gold-400/30',
    medium: 'backdrop-blur-md bg-gradient-to-br from-indigo-700/22 via-purple-600/28 to-blue-700/22 border-gold-400/40',
    strong: 'backdrop-blur-lg bg-gradient-to-br from-indigo-700/30 via-purple-600/35 to-blue-700/30 border-gold-400/50',
    ultra: 'backdrop-blur-xl bg-gradient-to-br from-indigo-700/38 via-purple-600/43 to-blue-700/38 border-gold-400/60',
    supreme: 'backdrop-blur-2xl bg-gradient-to-br from-indigo-700/45 via-purple-600/50 to-blue-700/45 border-gold-400/70'
  },
  imperial: {
    subtle: 'backdrop-blur-sm bg-gradient-to-br from-amber-700/18 via-orange-600/22 to-red-700/18 border-yellow-400/35',
    medium: 'backdrop-blur-md bg-gradient-to-br from-amber-700/25 via-orange-600/30 to-red-700/25 border-yellow-400/45',
    strong: 'backdrop-blur-lg bg-gradient-to-br from-amber-700/33 via-orange-600/38 to-red-700/33 border-yellow-400/55',
    ultra: 'backdrop-blur-xl bg-gradient-to-br from-amber-700/40 via-orange-600/45 to-red-700/40 border-yellow-400/65',
    supreme: 'backdrop-blur-2xl bg-gradient-to-br from-amber-700/48 via-orange-600/53 to-red-700/48 border-yellow-400/75'
  },
  diamond: {
    subtle: 'backdrop-blur-sm bg-gradient-to-br from-cyan-100/25 via-blue-50/30 to-slate-100/25 border-cyan-300/40',
    medium: 'backdrop-blur-md bg-gradient-to-br from-cyan-100/35 via-blue-50/40 to-slate-100/35 border-cyan-300/50',
    strong: 'backdrop-blur-lg bg-gradient-to-br from-cyan-100/45 via-blue-50/50 to-slate-100/45 border-cyan-300/60',
    ultra: 'backdrop-blur-xl bg-gradient-to-br from-cyan-100/55 via-blue-50/60 to-slate-100/55 border-cyan-300/70',
    supreme: 'backdrop-blur-2xl bg-gradient-to-br from-cyan-100/65 via-blue-50/70 to-slate-100/65 border-cyan-300/80'
  }
}

const shadowClasses = {
  none: '',
  soft: 'shadow-lg shadow-black/5',
  medium: 'shadow-xl shadow-black/10',
  strong: 'shadow-2xl shadow-black/15',
  luxury: 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] drop-shadow-xl'
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
  gradient = false,
  bordered = true,
  shadow = 'medium',
  hover = true,
  rounded = 'xl',
  padding = 'md',
  as: Component = 'div',
  sophistication = 'refined',
  culturalElements = false,
  luxuryFrame = false,
  premiumEffects = false,
  ...props
}: GlassmorphismProps) {
  
  const getSophisticationEffect = () => {
    const effects = {
      refined: 'hover:backdrop-blur-xl hover:bg-opacity-80 transition-all duration-300 ease-out',
      opulent: 'hover:backdrop-blur-2xl hover:bg-opacity-90 hover:scale-[1.02] transition-all duration-400 ease-out',
      majestic: 'hover:backdrop-blur-2xl hover:bg-opacity-95 hover:scale-[1.03] hover:rotate-[0.5deg] transition-all duration-500 ease-out'
    }
    return effects[sophistication]
  }
  const baseClasses = cn(
    // Base glass styles with sophistication
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
    
    // Sophistication effects
    hover && getSophisticationEffect(),
    
    // Premium effects
    premiumEffects && 'animate-pulse hover:animate-none',
    
    // Luxury frame
    luxuryFrame && 'ring-1 ring-amber-400/20 hover:ring-amber-400/40',
    
    // Base hover (if not using sophistication)
    !hover && 'transition-all duration-300 ease-in-out',
    
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
      {/* Portuguese cultural pattern overlay with aristocratic sophistication */}
      {(variant === 'portuguese' || variant === 'aristocratic' || culturalElements) && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpattern id='azulejo-aristocratic' x='0' y='0' width='25' height='25' patternUnits='userSpaceOnUse'%3E%3Crect width='25' height='25' fill='none'/%3E%3Cpath d='M12.5,2 L23,12.5 L12.5,23 L2,12.5 Z' fill='rgba(212,165,116,0.15)' stroke='rgba(245,158,11,0.2)' stroke-width='0.5'/%3E%3Ccircle cx='12.5' cy='12.5' r='3' fill='rgba(245,158,11,0.25)'/%3E%3Cpath d='M5,5 L20,5 M5,20 L20,20 M5,5 L5,20 M20,5 L20,20' stroke='rgba(185,28,28,0.1)' stroke-width='0.3'/%3E%3C/pattern%3E%3Crect width='100' height='100' fill='url(%23azulejo-aristocratic)'/%3E%3C/svg%3E")`
          }} />
          {variant === 'aristocratic' && (
            <div className="absolute inset-0 bg-gradient-to-br from-red-400/5 via-amber-400/8 to-green-400/5 animate-gradient-shift" />
          )}
        </div>
      )}

      {/* Enhanced sparkle and luxury effects */}
      {(['elite', 'royal', 'imperial', 'diamond'].includes(variant) || premiumEffects) && (
        <div className="absolute inset-0 opacity-20">
          {[...Array(variant === 'royal' ? 12 : variant === 'imperial' ? 10 : variant === 'diamond' ? 8 : 6)].map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "absolute rounded-full",
                variant === 'elite' && "w-1 h-1 bg-amber-400",
                variant === 'royal' && "w-1.5 h-1.5 bg-purple-400",
                variant === 'imperial' && "w-1.5 h-1.5 bg-amber-500",
                variant === 'diamond' && "w-1 h-1 bg-cyan-400"
              )}
              style={{
                left: `${15 + (i * 12) % 70}%`,
                top: `${10 + (i * 8) % 80}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, sophistication === 'majestic' ? 1.5 : 1, 0],
                rotate: variant === 'diamond' ? [0, 180, 360] : 0
              }}
              transition={{
                duration: sophistication === 'majestic' ? 3 : 2,
                repeat: Infinity,
                delay: i * (variant === 'royal' ? 0.2 : 0.3),
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
      
      {/* Aristocratic floating elements */}
      {variant === 'aristocratic' && (
        <div className="absolute inset-0 opacity-15">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`heritage-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: `linear-gradient(45deg, rgba(220,38,38,0.6), rgba(245,158,11,0.6), rgba(22,163,74,0.6))`,
                left: `${25 + i * 20}%`,
                top: `${20 + i * 15}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Sophisticated ornamental borders */}
      {(['heritage', 'aristocratic', 'royal', 'imperial'].includes(variant) || luxuryFrame) && bordered && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Main border lines */}
          <div className={cn(
            "absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent to-transparent opacity-50",
            variant === 'heritage' && "via-amber-400",
            variant === 'aristocratic' && "via-amber-400",
            variant === 'royal' && "via-purple-400",
            variant === 'imperial' && "via-yellow-400"
          )} />
          <div className={cn(
            "absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent to-transparent opacity-50",
            variant === 'heritage' && "via-amber-400",
            variant === 'aristocratic' && "via-amber-400",
            variant === 'royal' && "via-purple-400",
            variant === 'imperial' && "via-yellow-400"
          )} />
          <div className={cn(
            "absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-transparent to-transparent opacity-50",
            variant === 'heritage' && "via-amber-400",
            variant === 'aristocratic' && "via-amber-400",
            variant === 'royal' && "via-purple-400",
            variant === 'imperial' && "via-yellow-400"
          )} />
          <div className={cn(
            "absolute right-0 top-4 bottom-4 w-px bg-gradient-to-b from-transparent to-transparent opacity-50",
            variant === 'heritage' && "via-amber-400",
            variant === 'aristocratic' && "via-amber-400",
            variant === 'royal' && "via-purple-400",
            variant === 'imperial' && "via-yellow-400"
          )} />
          
          {/* Corner embellishments for aristocratic variant */}
          {variant === 'aristocratic' && (
            <>
              <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-amber-400/30 rounded-tl-lg" />
              <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-amber-400/30 rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-amber-400/30 rounded-bl-lg" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-amber-400/30 rounded-br-lg" />
            </>
          )}
          
          {/* Royal crown elements */}
          {variant === 'royal' && (
            <>
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-br from-purple-400 to-gold-400 rounded-full opacity-60" />
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-br from-purple-400 to-gold-400 rounded-full opacity-60" />
            </>
          )}
        </div>
      )}

      {/* Enhanced premium glow effects */}
      {(['premium', 'royal', 'imperial', 'diamond'].includes(variant) || premiumEffects) && (
        <div className={cn(
          "absolute -inset-px blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500",
          roundedClasses[rounded]
        )}>
          <div className={cn(
            "w-full h-full",
            variant === 'premium' && "bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-purple-400/20",
            variant === 'royal' && "bg-gradient-to-r from-purple-400/25 via-indigo-400/30 to-blue-400/25",
            variant === 'imperial' && "bg-gradient-to-r from-amber-400/25 via-orange-400/30 to-red-400/25",
            variant === 'diamond' && "bg-gradient-to-r from-cyan-400/20 via-blue-400/25 to-slate-400/20",
            roundedClasses[rounded]
          )} />
        </div>
      )}
      
      {/* Luxury ambient glow */}
      {(sophistication === 'opulent' || sophistication === 'majestic') && (
        <div className="absolute -inset-4 opacity-0 group-hover:opacity-30 transition-all duration-700">
          <div className={cn(
            "w-full h-full bg-gradient-radial from-amber-300/20 via-transparent to-transparent blur-xl",
            roundedClasses[rounded]
          )} />
        </div>
      )}

      {/* Sophisticated content wrapper */}
      <div className={cn(
        "relative z-10",
        sophistication === 'majestic' && "transform-gpu",
        premiumEffects && "hover:scale-[1.01] transition-transform duration-300"
      )}>
        {children}
      </div>
      
      {/* Luxury finish overlay */}
      {(luxury || sophistication === 'majestic') && (
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/30 via-transparent to-transparent" />
        </div>
      )}
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