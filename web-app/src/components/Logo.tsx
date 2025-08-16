'use client'

import { motion } from 'framer-motion'

interface LogoProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
  animated?: boolean
}

export default function Logo({ size = 'medium', className = '', animated = false }: LogoProps) {
  const sizes = {
    small: 'h-6 sm:h-8',
    medium: 'h-8 sm:h-10',
    large: 'h-10 sm:h-12'
  }

  const textSizes = {
    small: 'text-lg sm:text-xl',
    medium: 'text-xl sm:text-2xl',
    large: 'text-2xl sm:text-3xl'
  }

  const LogoComponent = (
    <div className={`flex items-center ${size === 'small' ? 'space-x-2 sm:space-x-3' : size === 'medium' ? 'space-x-3 sm:space-x-4' : 'space-x-4'} ${className}`}>
      {/* Logo Icon - Enhanced Portuguese-inspired design */}
      <div className={`${sizes[size]} aspect-square flex items-center justify-center rounded-2xl bg-gradient-to-br from-secondary-600 via-action-600 to-premium-600 shadow-xl border-2 border-white/20 relative overflow-hidden`}>
        {/* Portuguese flag colors accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-500/20 via-action-500/20 to-accent-500/20 animate-pulse"></div>
        
        <div className="text-white font-black flex flex-col items-center leading-none relative z-10">
          <span className={size === 'small' ? 'text-sm sm:text-base' : size === 'medium' ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'}>
            🏛️
          </span>
          {size !== 'small' && (
            <div className="w-4 sm:w-5 h-0.5 bg-white/80 mt-1 rounded-full shadow-sm" />
          )}
        </div>
      </div>
      
      {/* Brand Name */}
      <div className="flex flex-col">
        <h1 className={`${textSizes[size]} font-black bg-gradient-to-r from-secondary-600 via-action-600 to-premium-600 bg-clip-text text-transparent leading-none tracking-tight`}>
          LusoTown
        </h1>
        {size !== 'small' && (
          <span className={`text-xs font-bold text-gray-600 uppercase tracking-widest ${size === 'large' ? 'sm:text-sm' : ''} flex items-center gap-1`}>
            <span className="text-[8px]">🇵🇹</span>
            London
            <span className="text-[8px]">🇬🇧</span>
          </span>
        )}
      </div>
    </div>
  )

  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {LogoComponent}
      </motion.div>
    )
  }

  return LogoComponent
}

// Simplified logo for favicons and small spaces
export function LogoIcon({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <div 
      className={`flex items-center justify-center rounded-2xl bg-gradient-to-br from-secondary-600 via-action-600 to-premium-600 shadow-xl border-2 border-white/20 relative overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Portuguese flag colors accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary-500/20 via-action-500/20 to-accent-500/20"></div>
      
      <div className="text-white font-black flex flex-col items-center leading-none relative z-10">
        <span style={{ fontSize: Math.max(12, size * 0.5) }}>🏛️</span>
        {size > 24 && (
          <div 
            className="bg-white/80 rounded-full mt-1 shadow-sm" 
            style={{ width: size * 0.3, height: Math.max(2, size * 0.05) }}
          />
        )}
      </div>
    </div>
  )
}