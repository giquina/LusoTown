'use client'

import React, { ReactNode, useCallback, useEffect } from 'react'
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion'

interface EnhancedMobileGesturesProps {
  children: ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  swipeThreshold?: number
  className?: string
}

export function EnhancedMobileGestures({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  swipeThreshold = 100,
  className = ''
}: EnhancedMobileGesturesProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [5, -5])
  const rotateY = useTransform(x, [-100, 100], [-5, 5])

  const handlePanEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset } = info
    
    if (Math.abs(offset.x) > swipeThreshold) {
      if (offset.x > 0 && onSwipeRight) {
        onSwipeRight()
      } else if (offset.x < 0 && onSwipeLeft) {
        onSwipeLeft()
      }
    }
    
    if (Math.abs(offset.y) > swipeThreshold) {
      if (offset.y > 0 && onSwipeDown) {
        onSwipeDown()
      } else if (offset.y < 0 && onSwipeUp) {
        onSwipeUp()
      }
    }
    
    // Reset position
    x.set(0)
    y.set(0)
  }

  const handlePan = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    x.set(info.offset.x)
    y.set(info.offset.y)
  }

  return (
    <motion.div
      className={className}
      style={{
        x,
        y,
        rotateX,
        rotateY
      }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      onPan={handlePan}
      onPanEnd={handlePanEnd}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  )
}

// Hook for Portuguese-specific gestures
export function usePortugueseGestures() {
  const handlePortugueseSwipe = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    // Portuguese-specific gesture handling
    console.log(`Portuguese gesture: ${direction}`)
  }, [])

  return {
    handlePortugueseSwipe,
    swipeLeft: () => handlePortugueseSwipe('left'),
    swipeRight: () => handlePortugueseSwipe('right'),
    swipeUp: () => handlePortugueseSwipe('up'),
    swipeDown: () => handlePortugueseSwipe('down')
  }
}

export default EnhancedMobileGestures