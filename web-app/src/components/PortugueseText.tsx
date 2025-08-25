'use client'

import { ReactNode } from 'react'
import { useLanguage } from '@/context/LanguageContext'

interface PortugueseTextProps {
  children: ReactNode
  fallback?: string
  className?: string
  maxLength?: number
  breakWords?: boolean
  responsive?: boolean
}

export default function PortugueseText({
  children,
  fallback,
  className = '',
  maxLength,
  breakWords = true,
  responsive = true
}: PortugueseTextProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  
  // Base text handling classes
  const baseClasses = `
    ${breakWords ? 'break-words hyphens-auto' : ''}
    ${responsive && isPortuguese ? 'leading-relaxed' : 'leading-normal'}
  `
  
  // Handle text truncation and fallbacks
  let displayText = children
  
  if (typeof children === 'string') {
    // If Lusophone text is too long and we have a fallback
    if (isPortuguese && maxLength && children.length > maxLength && fallback) {
      displayText = fallback
    }
    // Or just truncate if no fallback
    else if (maxLength && children.length > maxLength) {
      displayText = `${children.substring(0, maxLength)  }...`
    }
  }
  
  const finalClasses = `${baseClasses} ${className}`.trim().replace(/\s+/g, ' ')

  return (
    <span className={finalClasses} lang={isPortuguese ? 'pt' : 'en'}>
      {displayText}
    </span>
  )
}