'use client'

import { motion } from 'framer-motion'

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'compact'
  className?: string
  animated?: boolean
}

export default function Logo({ size = 'medium', className = '', animated = false }: LogoProps) {
  const sizes = {
    small: 'h-6 sm:h-8',
    medium: 'h-8 sm:h-10',
    large: 'h-12 sm:h-14 lg:h-16',
    compact: 'h-8'
  }

  const textSizes = {
    small: 'text-lg sm:text-xl',
    medium: 'text-xl sm:text-2xl',
    large: 'text-2xl sm:text-3xl lg:text-4xl',
    compact: 'text-lg font-bold'
  }

  // Compact header variant
  if (size === 'compact') {
    const CompactLogo = (
      <div className={`flex items-center space-x-2 ${className}`}>
        {/* Smaller icon for header */}
        <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-secondary-600 via-action-600 to-premium-600 shadow-md border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-500/20 via-action-500/20 to-accent-500/20"></div>
          <span className="text-white font-black text-sm relative z-10">🏛️</span>
        </div>
        
        {/* Compact brand name with London tagline */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-1">
            <h1 className="text-lg font-black bg-gradient-to-r from-secondary-600 via-action-600 to-premium-600 bg-clip-text text-transparent leading-none tracking-tight">
              LusoTown
            </h1>
            <div className="flex items-center space-x-0.5 ml-1">
              <span className="text-xs">🇵🇹</span>
              <span className="text-xs">🇬🇧</span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest leading-none mt-0.5">
            London
          </span>
        </div>
      </div>
    )
    
    return animated ? (
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {CompactLogo}
      </motion.div>
    ) : CompactLogo
  }

  const LogoComponent = (
    <div className={`flex items-center ${size === 'small' ? 'space-x-2 sm:space-x-3' : size === 'medium' ? 'space-x-3 sm:space-x-4' : 'space-x-4'} ${className}`}>
      {/* Logo Icon - Enhanced Portuguese-inspired design */}
      <div className={`${sizes[size]} aspect-square flex items-center justify-center rounded-2xl bg-gradient-to-br from-secondary-600 via-action-600 to-premium-600 shadow-xl border-2 border-white/20 relative overflow-hidden`}>
        {/* Portuguese flag colors accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-500/20 via-action-500/20 to-accent-500/20 animate-pulse"></div>
        
        <div className="text-white font-black flex flex-col items-center leading-none relative z-10">
          <span className={size === 'small' ? 'text-sm sm:text-base' : size === 'medium' ? 'text-base sm:text-lg' : 'text-lg sm:text-xl lg:text-2xl'}>
            🏛️
          </span>
          {size !== 'small' && (
            <div className={`${size === 'large' ? 'w-5 sm:w-6 lg:w-7' : 'w-4 sm:w-5'} h-0.5 bg-white/80 mt-1 rounded-full shadow-sm`} />
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