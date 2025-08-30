'use client'

import React from 'react'

interface FlagBackgroundPatternProps {
  opacity?: number
  className?: string
  variant?: 'subtle' | 'mosaic' | 'wave' | 'gradient'
  primaryNationsOnly?: boolean
}

export default function FlagBackgroundPattern({
  opacity = 0.1,
  className = '',
  variant = 'subtle',
  primaryNationsOnly = false
}: FlagBackgroundPatternProps) {
  const getPatternStyle = () => {
    switch (variant) {
      case 'mosaic':
        return {
          backgroundImage: 'linear-gradient(45deg, rgba(30, 64, 175, 0.1) 25%, transparent 25%)',
          backgroundSize: '40px 40px'
        }
      case 'wave':
        return {
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(30, 64, 175, 0.1) 0px, rgba(5, 150, 105, 0.1) 20px)',
          backgroundSize: '80px 100%'
        }
      case 'gradient':
        return {
          background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)'
        }
      default: // subtle
        return {
          backgroundColor: 'rgba(30, 64, 175, 0.05)',
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(5, 150, 105, 0.03) 0%, transparent 50%)'
        }
    }
  }

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={getPatternStyle()}
      aria-hidden="true"
    />
  )
}

// Preset variants for easy use
export function SubtleFlagBackground({ opacity = 0.05, className = '' }: { opacity?: number, className?: string }) {
  return <FlagBackgroundPattern variant="subtle" opacity={opacity} className={className} />
}

export function CulturalMosaicBackground({ opacity = 0.1, className = '' }: { opacity?: number, className?: string }) {
  return <FlagBackgroundPattern variant="mosaic" opacity={opacity} className={className} />
}

export function HeritageWaveBackground({ 
  opacity = 0.08, 
  className = '', 
  primaryNationsOnly = true 
}: { 
  opacity?: number
  className?: string
  primaryNationsOnly?: boolean 
}) {
  return <FlagBackgroundPattern variant="wave" opacity={opacity} className={className} primaryNationsOnly={primaryNationsOnly} />
}

export function FlagGradientBackground({ opacity = 0.12, className = '' }: { opacity?: number, className?: string }) {
  return <FlagBackgroundPattern variant="gradient" opacity={opacity} className={className} />
}
