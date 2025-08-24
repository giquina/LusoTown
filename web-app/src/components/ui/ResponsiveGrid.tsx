'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ResponsiveGridProps {
  children: React.ReactNode
  columns?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
  gap?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
  className?: string
  animate?: boolean
  staggerDelay?: number
}

export default function ResponsiveGrid({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = { mobile: 4, tablet: 6, desktop: 8 },
  className = '',
  animate = true,
  staggerDelay = 0.1
}: ResponsiveGridProps) {
  const gridCols = `grid-cols-${columns.mobile} md:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop}`
  const gridGap = `gap-${gap.mobile} md:gap-${gap.tablet} lg:gap-${gap.desktop}`
  
  const gridClass = `grid ${gridCols} ${gridGap} ${className}`

  if (!animate) {
    return (
      <div className={gridClass}>
        {children}
      </div>
    )
  }

  const childrenArray = React.Children.toArray(children)

  return (
    <div className={gridClass}>
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: index * staggerDelay,
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}