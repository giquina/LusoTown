'use client'

import React, { useState, useEffect } from 'react'

interface Flag {
  country: string
  emoji: string
  name: {
    en: string
    pt: string
  }
}

const lusophones: Flag[] = [
  { country: 'PT', emoji: '🇵🇹', name: { en: 'Portugal', pt: 'Portugal' } },
  { country: 'BR', emoji: '🇧🇷', name: { en: 'Brazil', pt: 'Brasil' } },
  { country: 'AO', emoji: '🇦🇴', name: { en: 'Angola', pt: 'Angola' } },
  { country: 'MZ', emoji: '🇲🇿', name: { en: 'Mozambique', pt: 'Moçambique' } },
  { country: 'CV', emoji: '🇨🇻', name: { en: 'Cape Verde', pt: 'Cabo Verde' } },
  { country: 'GW', emoji: '🇬🇼', name: { en: 'Guinea-Bissau', pt: 'Guiné-Bissau' } },
  { country: 'ST', emoji: '🇸🇹', name: { en: 'São Tomé and Príncipe', pt: 'São Tomé e Príncipe' } },
  { country: 'TL', emoji: '🇹🇱', name: { en: 'East Timor', pt: 'Timor-Leste' } }
]

interface RotatingFlagDisplayProps {
  interval?: number
  showName?: boolean
  language?: 'en' | 'pt'
  className?: string
}

export default function RotatingFlagDisplay({
  interval = 2000,
  showName = true,
  language = 'en',
  className = ''
}: RotatingFlagDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % lusophones.length)
    }, interval)

    return () => clearInterval(timer)
  }, [interval, isHydrated])

  if (!isHydrated) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <span className="text-4xl">🇵🇹</span>
        {showName && <span className="ml-2 text-lg">Portugal</span>}
      </div>
    )
  }

  const currentFlag = lusophones[currentIndex]

  return (
    <div className={`flex items-center justify-center transition-all duration-500 ${className}`}>
      <span className="text-4xl animate-pulse">{currentFlag.emoji}</span>
      {showName && (
        <span className="ml-2 text-lg font-medium">
          {currentFlag.name[language]}
        </span>
      )}
    </div>
  )
}
