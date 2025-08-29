'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'

/**
 * Simple calendar provider component
 * Consolidated from complex calendar system
 */
interface CulturalCalendarProviderProps {
  children: React.ReactNode
}

export default function CulturalCalendarProvider({ children }: CulturalCalendarProviderProps) {
  const { t } = useLanguage()

  return (
    <div className="cultural-calendar-provider">
      {children}
    </div>
  )
}