'use client'

import { useEffect } from 'react'

/**
 * Component to prevent Framer Motion color animation errors
 * Fixes the "text-red-600 is not an animatable color" error
 */
export default function FramerMotionFix() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Add CSS overrides to prevent Framer Motion from trying to animate Tailwind color classes
    const style = document.createElement('style')
    style.id = 'framer-motion-color-fix'
    style.textContent = `
      /* Prevent Framer Motion color animation errors */
      .framer-motion-fix * {
        --tw-text-red-600: #dc2626 !important;
        --tw-text-red-500: #ef4444 !important; 
        --tw-text-blue-600: #2563eb !important;
        --tw-bg-red-50: #fef2f2 !important;
        --tw-bg-red-100: #fee2e2 !important;
      }
    `
    
    // Only add if not already present
    if (!document.getElementById('framer-motion-color-fix')) {
      document.head.appendChild(style)
    }

    // Add the fix class to body
    document.body.classList.add('framer-motion-fix')

    return () => {
      document.body.classList.remove('framer-motion-fix')
    }
  }, [])

  return null
}