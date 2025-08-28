'use client'

import { useState, useEffect, ReactNode } from 'react'

interface ClientOnlyProps {
  children: ReactNode
  fallback?: ReactNode
  className?: string
}

export default function ClientOnly({ 
  children, 
  fallback = <div className="opacity-0" />,
  className = ""
}: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <div className={className}>{fallback}</div>
  }

  return <div className={className}>{children}</div>
}