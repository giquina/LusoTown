'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'
import { PORTUGUESE_COLORS, DESIGN_TOKENS } from '@/config/brand'

interface EliteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'premium' | 'heritage' | 'coral' | 'ghost' | 'outline' | 'elite' | 'platinum' | 'diamond' | 'royal' | 'imperial'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  gradient?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  luxury?: boolean
  portuguese?: boolean
  elevation?: 'none' | 'low' | 'medium' | 'high' | 'ultra' | 'supreme'
  glow?: boolean
  shimmer?: boolean
  aristocratic?: boolean
  sophistication?: 'subtle' | 'refined' | 'opulent' | 'majestic'
  culturalElement?: boolean
  hapticFeedback?: boolean
  microAnimation?: 'none' | 'subtle' | 'elegant' | 'luxurious'
}

const sizeClasses = {
  xs: 'px-3 py-1.5 text-xs font-medium min-h-[32px]',
  sm: 'px-4 py-2 text-sm font-medium min-h-[36px]',
  md: 'px-6 py-3 text-base font-semibold min-h-[44px]',
  lg: 'px-8 py-4 text-lg font-semibold min-h-[52px]',
  xl: 'px-10 py-5 text-xl font-bold min-h-[60px]',
  '2xl': 'px-12 py-6 text-2xl font-bold min-h-[72px]',
  '3xl': 'px-16 py-8 text-3xl font-black min-h-[88px]'
}

const elevationClasses = {
  none: '',
  low: 'shadow-md hover:shadow-lg',
  medium: 'shadow-lg hover:shadow-xl',
  high: 'shadow-xl hover:shadow-2xl',
  ultra: 'shadow-2xl hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]',
  supreme: 'shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_-25px_rgba(0,0,0,0.5)] drop-shadow-2xl'
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
  platinum: 'bg-gradient-to-br from-gray-100 via-white to-gray-100 text-slate-800 border border-slate-200 shadow-xl shadow-slate-300/50 hover:shadow-slate-400/60',
  diamond: 'bg-gradient-to-br from-slate-50 via-cyan-100 to-slate-100 text-slate-900 border border-cyan-200 shadow-2xl shadow-cyan-300/60 hover:shadow-cyan-400/80 hover:from-cyan-50 hover:via-blue-50 hover:to-slate-50',
  royal: 'bg-gradient-to-br from-indigo-800 via-purple-800 to-blue-900 text-white border border-gold-400/40 shadow-2xl shadow-purple-800/60 hover:shadow-purple-700/80 hover:border-gold-300/60',
  imperial: 'bg-gradient-to-br from-yellow-800 via-amber-700 to-orange-800 text-white border border-yellow-400/50 shadow-2xl shadow-amber-700/70 hover:shadow-amber-600/90 hover:border-yellow-300/70'
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
  platinum: 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 border border-slate-300 shadow-2xl shadow-slate-400/60 hover:shadow-slate-500/80 hover:border-slate-400',
  diamond: 'bg-gradient-to-br from-white via-slate-50 to-cyan-50 text-slate-800 border-2 border-cyan-200 shadow-[0_20px_40px_-10px_rgba(8,145,178,0.4)] hover:shadow-[0_30px_60px_-15px_rgba(8,145,178,0.6)] hover:border-cyan-300',
  royal: 'bg-gradient-to-br from-indigo-600 via-purple-700 to-blue-800 text-white border-2 border-amber-300 shadow-[0_25px_50px_-12px_rgba(79,70,229,0.5)] hover:shadow-[0_35px_70px_-15px_rgba(79,70,229,0.7)] hover:border-amber-200',
  imperial: 'bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 text-white border-2 border-yellow-300 shadow-[0_30px_60px_-15px_rgba(217,119,6,0.6)] hover:shadow-[0_40px_80px_-20px_rgba(217,119,6,0.8)] hover:border-yellow-200'
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
  platinum: 'bg-gradient-to-br from-amber-100 via-white to-amber-100 text-amber-800 border border-amber-300 shadow-2xl',
  diamond: 'bg-gradient-to-br from-red-50 via-amber-50 to-green-50 text-red-800 border border-red-200 shadow-xl shadow-red-300/40',
  royal: 'bg-gradient-to-br from-red-700 via-purple-800 to-green-700 text-white border border-gold-400/40 shadow-2xl shadow-red-700/60',
  imperial: 'bg-gradient-to-br from-amber-700 via-red-700 to-green-700 text-white border border-yellow-400/50 shadow-2xl shadow-amber-700/70'
}

// Aristocratic styles for sophisticated Portuguese heritage appeal
const aristocraticClasses = {
  primary: 'bg-gradient-to-br from-red-600 via-amber-500 to-green-600 shadow-[0_20px_40px_-10px_rgba(220,38,38,0.4)] text-white hover:shadow-[0_30px_60px_-15px_rgba(220,38,38,0.6)]',
  secondary: 'bg-gradient-to-br from-green-600 via-amber-500 to-red-600 shadow-[0_20px_40px_-10px_rgba(22,163,74,0.4)] text-white hover:shadow-[0_30px_60px_-15px_rgba(22,163,74,0.6)]',
  premium: 'bg-gradient-to-br from-amber-500 via-red-500 to-green-500 shadow-[0_25px_50px_-12px_rgba(245,158,11,0.5)] text-white hover:shadow-[0_35px_70px_-15px_rgba(245,158,11,0.7)]',
  heritage: 'bg-gradient-to-br from-red-700 via-amber-600 to-green-700 shadow-[0_30px_60px_-15px_rgba(185,28,28,0.6)] text-white hover:shadow-[0_40px_80px_-20px_rgba(185,28,28,0.8)]',
  coral: 'bg-gradient-to-br from-coral-700 via-amber-600 to-red-700 shadow-[0_25px_50px_-12px_rgba(234,88,12,0.5)] text-white hover:shadow-[0_35px_70px_-15px_rgba(234,88,12,0.7)]',
  ghost: 'bg-gradient-to-br from-red-50/80 via-amber-50/60 to-green-50/80 backdrop-blur-sm text-red-800 hover:from-red-100/90 hover:to-green-100/90 border border-red-200/60 hover:border-red-300/80',
  outline: 'border-2 border-red-500 text-red-600 hover:bg-gradient-to-br hover:from-red-50 hover:via-amber-50 hover:to-green-50 hover:border-red-600 hover:text-red-700',
  elite: 'bg-gradient-to-br from-red-900 via-slate-900 to-green-900 text-white border-2 border-amber-400/50 shadow-[0_35px_70px_-15px_rgba(15,23,42,0.8)] hover:border-amber-300/70 hover:shadow-[0_45px_90px_-20px_rgba(15,23,42,0.9)]',
  platinum: 'bg-gradient-to-br from-amber-100 via-white to-amber-100 text-amber-900 border-2 border-amber-300 shadow-[0_30px_60px_-15px_rgba(245,158,11,0.3)] hover:shadow-[0_40px_80px_-20px_rgba(245,158,11,0.5)] hover:border-amber-400',
  diamond: 'bg-gradient-to-br from-red-50 via-amber-50 to-green-50 text-red-800 border-2 border-red-200 shadow-[0_25px_50px_-12px_rgba(220,38,38,0.2)] hover:shadow-[0_35px_70px_-15px_rgba(220,38,38,0.4)] hover:border-red-300',
  royal: 'bg-gradient-to-br from-red-800 via-purple-900 to-green-800 text-white border-2 border-gold-400/60 shadow-[0_40px_80px_-20px_rgba(147,51,234,0.6)] hover:shadow-[0_50px_100px_-25px_rgba(147,51,234,0.8)] hover:border-gold-300/80',
  imperial: 'bg-gradient-to-br from-amber-700 via-red-700 to-green-700 text-white border-2 border-yellow-400/60 shadow-[0_45px_90px_-20px_rgba(245,158,11,0.7)] hover:shadow-[0_55px_110px_-25px_rgba(245,158,11,0.9)] hover:border-yellow-300/80'
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
  aristocratic = false,
  sophistication = 'refined',
  culturalElement = false,
  hapticFeedback = false,
  microAnimation = 'elegant',
  disabled,
  ...props
}: EliteButtonProps) {
  const { t } = useLanguage()

  const getVariantClasses = () => {
    if (aristocratic) return aristocraticClasses[variant]
    if (luxury) return luxuryClasses[variant]
    if (portuguese) return portugueseClasses[variant]
    return variantClasses[variant]
  }

  const getSophisticationEffect = () => {
    const effects = {
      subtle: 'hover:brightness-105 transition-all duration-200',
      refined: 'hover:brightness-110 hover:saturate-110 transition-all duration-300 ease-out',
      opulent: 'hover:brightness-115 hover:saturate-125 hover:contrast-110 transition-all duration-400 ease-out',
      majestic: 'hover:brightness-120 hover:saturate-150 hover:contrast-125 hover:hue-rotate-3 transition-all duration-500 ease-out'
    }
    return effects[sophistication]
  }

  const getMicroAnimationClasses = () => {
    const animations = {
      none: '',
      subtle: 'hover:translate-y-[-1px] active:translate-y-[0px]',
      elegant: 'hover:translate-y-[-2px] hover:scale-[1.01] active:translate-y-[0px] active:scale-[0.99]',
      luxurious: 'hover:translate-y-[-3px] hover:scale-[1.02] hover:rotate-[0.5deg] active:translate-y-[0px] active:scale-[0.98] active:rotate-[0deg]'
    }
    return animations[microAnimation]
  }

  return (
    <motion.button
      whileHover={{ 
        scale: disabled ? 1 : (luxury || aristocratic ? 1.03 : 1.02),
        y: disabled ? 0 : (luxury || aristocratic ? -2 : -1),
        rotateX: disabled ? 0 : (sophistication === 'majestic' ? 5 : 0),
        transition: { 
          duration: sophistication === 'majestic' ? 0.4 : 0.3, 
          ease: "easeOut",
          type: "spring",
          stiffness: 300,
          damping: 20
        }
      }}
      whileTap={{ 
        scale: disabled ? 1 : (luxury || aristocratic ? 0.97 : 0.98),
        y: disabled ? 0 : 0,
        rotateX: disabled ? 0 : 0,
        transition: { duration: 0.1, type: "spring", stiffness: 500 }
      }}
      className={cn(
        // Base styles with sophistication
        'group relative inline-flex items-center justify-center font-display rounded-2xl transform-gpu focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden cursor-pointer select-none',
        
        // Sophistication and animation classes
        getSophisticationEffect(),
        getMicroAnimationClasses(),
        
        // Premium transition timing
        aristocratic || luxury ? 'transition-all duration-500 ease-out' : 'transition-all duration-300 ease-in-out',
        
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
      {/* Lusophone cultural pattern overlay with sophistication */}
      {(portuguese || culturalElement) && (
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 animate-shimmer" />
          <div className="absolute top-0 left-0 w-full h-full opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpattern id='azulejo' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Crect width='20' height='20' fill='none'/%3E%3Cpath d='M10,2 L18,10 L10,18 L2,10 Z' fill='rgba(255,255,255,0.1)'/%3E%3Ccircle cx='10' cy='10' r='2' fill='rgba(245,158,11,0.2)'/%3E%3C/pattern%3E%3Crect width='100' height='100' fill='url(%23azulejo)'/%3E%3C/svg%3E")`
          }} />
        </div>
      )}
      
      {/* Aristocratic shimmer effect */}
      {(aristocratic || luxury || shimmer) && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 animate-shimmer-slow" />
          {aristocratic && (
            <div className="absolute inset-0 bg-gradient-to-br from-amber-300/10 via-transparent to-amber-300/10 animate-pulse" />
          )}
        </div>
      )}

      {/* Elite and aristocratic glow rings */}
      {(['elite', 'diamond', 'royal', 'imperial'].includes(variant)) && (
        <div className={cn(
          "absolute -inset-0.5 rounded-2xl opacity-30 group-hover:opacity-50 transition-all duration-500 -z-10",
          variant === 'elite' && "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400",
          variant === 'diamond' && "bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300",
          variant === 'royal' && "bg-gradient-to-r from-purple-400 via-indigo-500 to-purple-400",
          variant === 'imperial' && "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400"
        )} />
      )}
      
      {/* Aristocratic Portuguese heritage ring */}
      {aristocratic && (
        <div className="absolute -inset-1 bg-gradient-to-r from-red-400/20 via-amber-400/30 to-green-400/20 rounded-3xl opacity-40 group-hover:opacity-60 group-hover:-inset-1.5 transition-all duration-700 -z-20 blur-sm" />
      )}

      {/* Premium shine effects */}
      {(['platinum', 'diamond', 'royal', 'imperial'].includes(variant)) && (
        <div className={cn(
          "absolute inset-0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out",
          variant === 'platinum' && "bg-gradient-to-r from-transparent via-white/60 to-transparent",
          variant === 'diamond' && "bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent",
          variant === 'royal' && "bg-gradient-to-r from-transparent via-purple-300/40 to-transparent",
          variant === 'imperial' && "bg-gradient-to-r from-transparent via-amber-300/40 to-transparent"
        )} />
      )}
      
      {/* Aristocratic multilayer shine */}
      {aristocratic && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-300/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out delay-100" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1200 ease-in-out delay-200" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-300/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1400 ease-in-out delay-300" />
        </>
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

      {/* Enhanced ripple effect with sophistication */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className={cn(
          "absolute inset-0 transform scale-0 rounded-full group-active:scale-100 transition-transform ease-out pointer-events-none",
          sophistication === 'majestic' ? 'duration-500 bg-white/30' : 'duration-300 bg-white/20'
        )} />
        {(aristocratic || sophistication === 'opulent' || sophistication === 'majestic') && (
          <div className="absolute inset-0 transform scale-0 bg-amber-300/20 rounded-full group-active:scale-110 group-active:opacity-0 transition-all duration-600 ease-out delay-100 pointer-events-none" />
        )}
      </div>
      
      {/* Haptic feedback indicator */}
      {hapticFeedback && (
        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-400/60 rounded-full animate-pulse" />
      )}
    </motion.button>
  )
}