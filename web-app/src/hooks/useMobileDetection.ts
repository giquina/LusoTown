'use client'

import { useState, useEffect } from 'react'

export function useMobileDetection(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    
    if (typeof window !== 'undefined') {
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth < breakpoint)
      }

      // Initial check
      checkIsMobile()

      // Add event listener for resize
      window.addEventListener('resize', checkIsMobile)

      return () => {
        window.removeEventListener('resize', checkIsMobile)
      }
    }
  }, [breakpoint])

  return { isMobile, isHydrated }
}
