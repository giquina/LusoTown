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
    <div className={`flex items-center ${size === 'small' ? 'space-x-1 sm:space-x-2' : size === 'medium' ? 'space-x-2 sm:space-x-3' : 'space-x-3'} ${className}`}>
      {/* Logo Icon - Portuguese-inspired design */}
      <div className={`${sizes[size]} aspect-square flex items-center justify-center rounded-xl bg-gradient-to-br from-green-600 via-red-600 to-yellow-600 shadow-lg`}>
        <div className="text-white font-bold text-sm flex flex-col items-center leading-none">
          <span className={size === 'small' ? 'text-[10px] sm:text-xs' : 'text-xs sm:text-sm'}>LT</span>
          {size !== 'small' && (
            <div className="w-3 sm:w-4 h-0.5 bg-white/60 mt-0.5 rounded-full" />
          )}
        </div>
      </div>
      
      {/* Brand Name */}
      <div className="flex flex-col">
        <h1 className={`${textSizes[size]} font-bold bg-gradient-to-r from-green-600 via-red-600 to-yellow-600 bg-clip-text text-transparent leading-none`}>
          LusoTown
        </h1>
        {size !== 'small' && (
          <span className={`text-xs font-medium text-gray-500 uppercase tracking-wider ${size === 'large' ? 'sm:text-sm' : ''}`}>
            UK
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
      className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-green-600 via-red-600 to-yellow-600 shadow-lg ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="text-white font-bold flex flex-col items-center leading-none">
        <span style={{ fontSize: Math.max(8, size * 0.3) }}>LT</span>
        {size > 24 && (
          <div 
            className="bg-white/60 rounded-full mt-0.5" 
            style={{ width: size * 0.25, height: Math.max(1, size * 0.03) }}
          />
        )}
      </div>
    </div>
  )
}