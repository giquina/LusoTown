'use client'

import React from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'
import { PORTUGUESE_COLORS, DESIGN_TOKENS } from '@/config/brand'

interface EliteHoverCardProps {
  children: React.ReactNode
  className?: string
  sophistication?: 'refined' | 'opulent' | 'majestic' | 'imperial'
  culturalPattern?: boolean
  goldLeafAccent?: boolean
}

export function EliteHoverCard({
  children,
  className = '',
  sophistication = 'refined',
  culturalPattern = false,
  goldLeafAccent = false
}: EliteHoverCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  
  const sophisticationVariants = {
    refined: {
      scale: [1, 1.02, 1.01],
      y: [0, -4, -2],
      rotateX: [0, 2, 1],
      transition: { duration: 0.4, ease: "easeOut" }
    },
    opulent: {
      scale: [1, 1.03, 1.02],
      y: [0, -6, -3],
      rotateX: [0, 4, 2],
      rotateY: [0, 1, 0.5],
      transition: { duration: 0.5, ease: "easeOut" }
    },
    majestic: {
      scale: [1, 1.04, 1.03],
      y: [0, -8, -4],
      rotateX: [0, 6, 3],
      rotateY: [0, 2, 1],
      rotateZ: [0, 0.5, 0.25],
      transition: { duration: 0.6, ease: "easeOut" }
    },
    imperial: {
      scale: [1, 1.05, 1.04],
      y: [0, -10, -5],
      rotateX: [0, 8, 4],
      rotateY: [0, 3, 1.5],
      rotateZ: [0, 1, 0.5],
      transition: { duration: 0.7, ease: "easeOut" }
    }
  }

  return (
    <motion.div
      className={cn(
        'relative bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden cursor-pointer',
        'shadow-lg hover:shadow-2xl transition-shadow duration-500',
        sophistication === 'majestic' && 'shadow-amber-200/30 hover:shadow-amber-300/50',
        sophistication === 'imperial' && 'shadow-amber-300/40 hover:shadow-amber-400/60',
        className
      )}
      whileHover={sophisticationVariants[sophistication]}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Lusophone cultural pattern overlay */}
      {culturalPattern && (
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-amber-500/30 to-green-500/20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Cpattern id='azulejo-pattern' x='0' y='0' width='30' height='30' patternUnits='userSpaceOnUse'%3E%3Crect width='30' height='30' fill='none'/%3E%3Cpath d='M15,3 L27,15 L15,27 L3,15 Z' fill='rgba(212,165,116,0.15)' stroke='rgba(212,165,116,0.1)' stroke-width='1'/%3E%3Ccircle cx='15' cy='15' r='4' fill='rgba(220,38,38,0.1)'/%3E%3Ccircle cx='15' cy='15' r='2' fill='rgba(22,163,74,0.1)'/%3E%3C/pattern%3E%3Crect width='60' height='60' fill='url(%23azulejo-pattern)'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>
      )}

      {/* Gold leaf accent overlay */}
      {goldLeafAccent && (
        <motion.div
          className="absolute top-0 right-0 w-16 h-16 opacity-30"
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={isHovered ? { opacity: 0.6, scale: 1, rotate: 15 } : { opacity: 0.3, scale: 0.8, rotate: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 rounded-full blur-sm" />
          <div className="absolute top-2 left-2 w-4 h-4 bg-amber-400 rounded-full opacity-80" />
          <div className="absolute bottom-2 right-2 w-3 h-3 bg-amber-500 rounded-full opacity-60" />
        </motion.div>
      )}

      {/* Sophisticated shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
        initial={{ x: "-100%" }}
        animate={isHovered ? { x: "200%" } : { x: "-100%" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* Imperial glow ring effect */}
      {sophistication === 'imperial' && (
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 rounded-2xl -z-10"
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 0.6 } : { opacity: 0.2 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  )
}

interface MajesticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'aristocratic' | 'royal' | 'imperial' | 'diamond'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  luxury?: boolean
  culturalHeritage?: boolean
  hapticFeedback?: boolean
}

export function MajesticButton({
  children,
  className = '',
  variant = 'aristocratic',
  size = 'md',
  luxury = false,
  culturalHeritage = false,
  hapticFeedback = false,
  disabled = false,
  ...props
}: MajesticButtonProps) {
  const [isPressed, setIsPressed] = React.useState(false)
  const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([])

  const variantStyles = {
    aristocratic: 'bg-gradient-to-br from-red-600 via-amber-500 to-green-600 text-white shadow-lg shadow-red-500/40 hover:shadow-xl hover:shadow-red-500/50',
    royal: 'bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 text-white shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-500/50',
    imperial: 'bg-gradient-to-br from-amber-600 via-yellow-500 to-orange-600 text-white shadow-lg shadow-amber-500/40 hover:shadow-xl hover:shadow-amber-500/50',
    diamond: 'bg-gradient-to-br from-slate-50 via-white to-cyan-50 text-slate-800 shadow-lg shadow-cyan-200/40 hover:shadow-xl hover:shadow-cyan-200/50 border border-cyan-200'
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm font-medium min-h-[36px]',
    md: 'px-6 py-3 text-base font-semibold min-h-[44px]',
    lg: 'px-8 py-4 text-lg font-semibold min-h-[52px]',
    xl: 'px-10 py-5 text-xl font-bold min-h-[60px]'
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const newRipple = { id: Date.now(), x, y }
    
    setRipples(prev => [...prev, newRipple])
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 1000)

    if (hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(50)
    }

    props.onClick?.(e)
  }

  return (
    <motion.button
      className={cn(
        'relative group inline-flex items-center justify-center font-display rounded-2xl overflow-hidden',
        'focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-amber-500/30',
        'disabled:opacity-50 disabled:cursor-not-allowed transform-gpu',
        'transition-all duration-300 ease-out',
        variantStyles[variant],
        sizeStyles[size],
        luxury && 'shadow-2xl hover:shadow-amber-500/60',
        className
      )}
      whileHover={disabled ? {} : { 
        scale: 1.02, 
        y: -2,
        transition: { duration: 0.2, type: "spring", stiffness: 400, damping: 25 }
      }}
      whileTap={disabled ? {} : { 
        scale: 0.98, 
        y: 0,
        transition: { duration: 0.1 }
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {/* Cultural heritage pattern */}
      {culturalHeritage && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-red-300/30 via-amber-300/40 to-green-300/30" />
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Cpattern id='heritage-pattern' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Crect width='20' height='20' fill='none'/%3E%3Cpath d='M10,2 L18,10 L10,18 L2,10 Z' fill='rgba(255,255,255,0.1)'/%3E%3Ccircle cx='10' cy='10' r='1.5' fill='rgba(245,158,11,0.3)'/%3E%3C/pattern%3E%3Crect width='40' height='40' fill='url(%23heritage-pattern)'/%3E%3C/svg%3E")`,
              backgroundSize: '20px 20px'
            }}
          />
        </div>
      )}

      {/* Luxury glow effect */}
      {luxury && (
        <motion.div
          className="absolute -inset-0.5 rounded-2xl opacity-50 -z-10"
          style={{
            background: variant === 'aristocratic' 
              ? 'linear-gradient(45deg, #dc2626, #f59e0b, #16a34a)' 
              : variant === 'royal'
              ? 'linear-gradient(45deg, #9333ea, #4f46e5, #1d4ed8)'
              : variant === 'imperial'
              ? 'linear-gradient(45deg, #d97706, #eab308, #ea580c)'
              : 'linear-gradient(45deg, #0891b2, #06b6d4, #0284c7)'
          }}
          animate={isPressed ? { opacity: 0.8 } : { opacity: 0.5 }}
        />
      )}

      {/* Elite shine effect */}
      <motion.div
        className={cn(
          "absolute inset-0 transform translate-x-[-100%] group-hover:translate-x-[100%]",
          "bg-gradient-to-r from-transparent via-white/40 to-transparent",
          "transition-transform duration-700 ease-in-out"
        )}
      />

      {/* Portuguese flag shine for aristocratic variant */}
      {variant === 'aristocratic' && (
        <>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-red-300/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out delay-100"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1200 ease-in-out delay-200"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-green-300/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1400 ease-in-out delay-300"
          />
        </>
      )}

      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute bg-white/30 rounded-full pointer-events-none"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center space-x-2 font-medium tracking-wide">
        {children}
      </span>

      {/* Haptic feedback indicator */}
      {hapticFeedback && (
        <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-amber-400/60 rounded-full animate-pulse" />
      )}
    </motion.button>
  )
}

interface SophisticatedLoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'refined' | 'opulent' | 'majestic'
  message?: string
  culturalTheme?: boolean
  className?: string
}

export function SophisticatedLoading({
  size = 'md',
  variant = 'refined',
  message,
  culturalTheme = false,
  className = ''
}: SophisticatedLoadingProps) {
  const { t } = useLanguage()

  const sizeClasses = {
    sm: { container: 'w-8 h-8', ring: 'w-8 h-8 border-2', text: 'text-sm' },
    md: { container: 'w-12 h-12', ring: 'w-12 h-12 border-3', text: 'text-base' },
    lg: { container: 'w-16 h-16', ring: 'w-16 h-16 border-4', text: 'text-lg' },
    xl: { container: 'w-24 h-24', ring: 'w-24 h-24 border-6', text: 'text-xl' }
  }

  const variantStyles = {
    refined: culturalTheme 
      ? 'border-amber-300 border-t-red-500 border-r-amber-400 border-b-green-500'
      : 'border-gray-200 border-t-amber-500',
    opulent: culturalTheme
      ? 'border-amber-400 border-t-red-600 border-r-amber-500 border-b-green-600'
      : 'border-gray-300 border-t-amber-600',
    majestic: culturalTheme
      ? 'border-amber-500 border-t-red-700 border-r-amber-600 border-b-green-700'
      : 'border-gray-400 border-t-amber-700'
  }

  return (
    <div className={cn('flex flex-col items-center justify-center space-y-4', className)}>
      <div className="relative">
        {/* Main spinning ring */}
        <motion.div
          className={cn(
            'rounded-full',
            sizeClasses[size].ring,
            variantStyles[variant]
          )}
          animate={{ rotate: 360 }}
          transition={{
            duration: variant === 'majestic' ? 1.5 : variant === 'opulent' ? 1.2 : 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Inner cultural pattern ring for majestic variant */}
        {variant === 'majestic' && culturalTheme && (
          <motion.div
            className={cn(
              'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-amber-400/60',
              size === 'xl' ? 'w-16 h-16' : size === 'lg' ? 'w-10 h-10' : size === 'md' ? 'w-6 h-6' : 'w-4 h-4'
            )}
            animate={{ rotate: -360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}

        {/* Center Lusophone symbol */}
        {culturalTheme && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-amber-600">👑</span>
          </motion.div>
        )}

        {/* Luxury glow effect */}
        {variant === 'majestic' && (
          <motion.div
            className={cn(
              'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/20',
              sizeClasses[size].container
            )}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>

      {/* Loading message */}
      {message && (
        <motion.p
          className={cn(
            'text-center text-gray-600 font-medium',
            sizeClasses[size].text,
            culturalTheme && 'text-amber-700'
          )}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {message}
        </motion.p>
      )}

      {/* Sophisticated dots indicator */}
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={cn(
              'w-2 h-2 rounded-full',
              culturalTheme ? 'bg-amber-500' : 'bg-gray-400'
            )}
            animate={{ 
              scale: [0.8, 1.2, 0.8],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </div>
  )
}

interface EliteProgressBarProps {
  progress: number
  variant?: 'refined' | 'opulent' | 'majestic'
  culturalTheme?: boolean
  showPercentage?: boolean
  className?: string
}

export function EliteProgressBar({
  progress,
  variant = 'refined',
  culturalTheme = false,
  showPercentage = true,
  className = ''
}: EliteProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100)

  const variantStyles = {
    refined: culturalTheme
      ? 'bg-gradient-to-r from-red-400 via-amber-400 to-green-400'
      : 'bg-gradient-to-r from-amber-400 to-amber-500',
    opulent: culturalTheme
      ? 'bg-gradient-to-r from-red-500 via-amber-500 to-green-500'
      : 'bg-gradient-to-r from-amber-500 to-amber-600',
    majestic: culturalTheme
      ? 'bg-gradient-to-r from-red-600 via-amber-500 to-green-600 shadow-lg shadow-amber-500/50'
      : 'bg-gradient-to-r from-amber-600 to-amber-700 shadow-lg shadow-amber-600/50'
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          {culturalTheme ? 'Progresso Cultural' : 'Progress'}
        </span>
        {showPercentage && (
          <motion.span
            className={cn(
              'text-sm font-semibold',
              culturalTheme ? 'text-amber-700' : 'text-gray-600'
            )}
            key={clampedProgress}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {Math.round(clampedProgress)}%
          </motion.span>
        )}
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <motion.div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            variantStyles[variant]
          )}
          style={{ width: `${clampedProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>

      {/* Luxury particles for majestic variant */}
      {variant === 'majestic' && clampedProgress > 0 && (
        <div className="relative">
          {Array.from({ length: 3 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full"
              style={{
                left: `${Math.min(clampedProgress - 5, 90) + i * 3}%`,
                top: '-8px'
              }}
              animate={{
                y: [0, -8, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}