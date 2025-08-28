'use client'

import { useState, useEffect, ReactNode } from 'react'

interface SSRSafeWrapperProps {
  children: ReactNode
  fallback?: ReactNode
  className?: string
  suppressWarning?: boolean
}

/**
 * SSR-Safe wrapper that prevents hydration mismatches
 * by only rendering children after hydration is complete
 */
export default function SSRSafeWrapper({ 
  children, 
  fallback = null,
  className = "",
  suppressWarning = true
}: SSRSafeWrapperProps) {
  const [hasMounted, setHasMounted] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setHasMounted(true)
  }, [])

  // Return nothing during SSR to prevent any hydration mismatch
  if (!isClient || !hasMounted) {
    return fallback ? <div className={className} suppressHydrationWarning={suppressWarning}>{fallback}</div> : null
  }

  return <div className={className} suppressHydrationWarning={suppressWarning}>{children}</div>
}