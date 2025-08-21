'use client'

import { motion } from 'framer-motion'
import { useHeritage } from '@/context/HeritageContext'

// Cultural flag component for heritage-aware rendering
const CulturalFlag = ({ type, className = "" }: { type: 'heritage' | 'local', className?: string }) => {
  const { heritage } = useHeritage()
  
  const flags = {
    heritage: {
      emoji: heritage.branding.symbols.flag,
      fallback: heritage.identity.code.toUpperCase(),
      label: `${heritage.identity.name} flag`
    },
    local: {
      emoji: '🇬🇧', // Always UK for diaspora hub
      fallback: 'GB',
      label: 'United Kingdom flag'
    }
  }
  
  const flag = flags[type]
  
  return (
    <span 
      className={`flag-emoji ${className}`}
      data-flag={flag.fallback}
      role="img"
      aria-label={flag.label}
    >
      {flag.emoji}
    </span>
  )
}

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'compact'
  className?: string
  animated?: boolean
}

export default function Logo({ size = 'medium', className = '', animated = false }: LogoProps) {
  const { heritage, colors, symbols } = useHeritage()
  
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

  // Generate heritage-aware gradient classes
  const gradientBg = `bg-gradient-to-br from-secondary-600 via-action-600 to-premium-600`
  const gradientText = `bg-gradient-to-r from-secondary-600 via-action-600 to-premium-600 bg-clip-text text-transparent`

  // Compact header variant
  if (size === 'compact') {
    const CompactLogo = (
      <div className={`flex items-center space-x-2 ${className}`}>
        {/* Smaller icon for header */}
        <div className={`h-8 w-8 flex items-center justify-center rounded-lg ${gradientBg} shadow-md border border-white/20 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-500/20 via-action-500/20 to-accent-500/20"></div>
          <span className="text-white font-black text-sm relative z-10">{symbols.primary}</span>
        </div>
        
        {/* Compact brand name with heritage flags */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-1">
            <h1 className={`text-lg font-black ${gradientText} leading-none tracking-tight`}>
              {process.env.NEXT_PUBLIC_BRAND_NAME || 'HeritageTown'}
            </h1>
            <div className="flex items-center space-x-0.5 ml-1">
              <CulturalFlag type="heritage" className="text-xs" />
              <CulturalFlag type="local" className="text-xs" />
            </div>
          </div>
          <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest leading-none mt-0.5">
            {heritage.geography.diasporaHub.city}
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
      {/* Logo Icon - Heritage-inspired design */}
      <div className={`${sizes[size]} aspect-square flex items-center justify-center rounded-2xl ${gradientBg} shadow-xl border-2 border-white/20 relative overflow-hidden`}>
        {/* Heritage colors accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-500/20 via-action-500/20 to-accent-500/20 animate-pulse"></div>
        
        <div className="text-white font-black flex flex-col items-center leading-none relative z-10">
          <span className={size === 'small' ? 'text-sm sm:text-base' : size === 'medium' ? 'text-base sm:text-lg' : 'text-lg sm:text-xl lg:text-2xl'}>
            {symbols.primary}
          </span>
          {size !== 'small' && (
            <div className={`${size === 'large' ? 'w-5 sm:w-6 lg:w-7' : 'w-4 sm:w-5'} h-0.5 bg-white/80 mt-1 rounded-full shadow-sm`} />
          )}
        </div>
      </div>
      
      {/* Brand Name */}
      <div className="flex flex-col">
        <h1 className={`${textSizes[size]} font-black ${gradientText} leading-none tracking-tight`}>
          {process.env.NEXT_PUBLIC_BRAND_NAME || 'HeritageTown'}
        </h1>
        {size !== 'small' && (
          <span className={`text-xs font-bold text-gray-600 uppercase tracking-widest ${size === 'large' ? 'sm:text-sm' : ''} flex items-center gap-1`}>
            <CulturalFlag type="heritage" className="text-[8px]" />
            {heritage.geography.diasporaHub.city}
            <CulturalFlag type="local" className="text-[8px]" />
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
  const { symbols } = useHeritage()
  
  return (
    <div 
      className={`flex items-center justify-center rounded-2xl bg-gradient-to-br from-secondary-600 via-action-600 to-premium-600 shadow-xl border-2 border-white/20 relative overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Heritage colors accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary-500/20 via-action-500/20 to-accent-500/20"></div>
      
      <div className="text-white font-black flex flex-col items-center leading-none relative z-10">
        <span style={{ fontSize: Math.max(12, size * 0.5) }}>{symbols.primary}</span>
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