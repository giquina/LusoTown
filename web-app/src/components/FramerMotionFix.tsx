'use client'

import { useEffect } from 'react'

/**
 * Component to prevent Framer Motion color animation errors
 * Fixes the "text-red-600 is not an animatable color" error
 */
export default function FramerMotionFix() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Create comprehensive CSS overrides to prevent Framer Motion from trying to animate Tailwind color classes
    const style = document.createElement('style')
    style.id = 'framer-motion-color-fix'
    style.textContent = `
      /* Prevent Framer Motion color animation errors */
      :root {
        --framer-red-600: #dc2626;
        --framer-red-500: #ef4444;
        --framer-red-700: #b91c1c;
        --framer-blue-600: #2563eb;
        --framer-green-600: #059669;
        --framer-gray-600: #4b5563;
        --framer-red-50: #fef2f2;
        --framer-red-100: #fee2e2;
        --framer-red-200: #fecaca;
      }

      /* Override Tailwind classes with CSS custom properties for Framer Motion compatibility */
      .text-red-600 { color: var(--framer-red-600) !important; }
      .text-red-500 { color: var(--framer-red-500) !important; }
      .text-red-700 { color: var(--framer-red-700) !important; }
      .text-blue-600 { color: var(--framer-blue-600) !important; }
      .text-green-600 { color: var(--framer-green-600) !important; }
      .text-gray-600 { color: var(--framer-gray-600) !important; }
      
      .bg-red-50 { background-color: var(--framer-red-50) !important; }
      .bg-red-100 { background-color: var(--framer-red-100) !important; }
      .bg-red-200 { background-color: var(--framer-red-200) !important; }
      
      .border-red-200 { border-color: var(--framer-red-200) !important; }
      .border-red-300 { border-color: #fca5a5 !important; }
      .border-red-500 { border-color: var(--framer-red-500) !important; }
      .border-red-600 { border-color: var(--framer-red-600) !important; }
      
      /* Hover states */
      .hover\\:text-red-600:hover { color: var(--framer-red-600) !important; }
      .hover\\:text-red-700:hover { color: var(--framer-red-700) !important; }
      .hover\\:bg-red-50:hover { background-color: var(--framer-red-50) !important; }
      .hover\\:bg-red-100:hover { background-color: var(--framer-red-100) !important; }
      .hover\\:border-red-300:hover { border-color: #fca5a5 !important; }
      .hover\\:border-red-600:hover { border-color: var(--framer-red-600) !important; }
      
      /* Group hover states */
      .group:hover .group-hover\\:text-red-600 { color: var(--framer-red-600) !important; }
      .group:hover .group-hover\\:text-red-700 { color: var(--framer-red-700) !important; }
    `
    
    // Only add if not already present
    if (!document.getElementById('framer-motion-color-fix')) {
      document.head.appendChild(style)
    }

    return () => {
      const existingStyle = document.getElementById('framer-motion-color-fix')
      if (existingStyle) {
        existingStyle.remove()
      }
    }
  }, [])

  return null
}