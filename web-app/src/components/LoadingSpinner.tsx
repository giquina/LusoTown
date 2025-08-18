'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export default function LoadingSpinner({ 
  size = 'md', 
  text,
  className = '' 
}: LoadingSpinnerProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  }

  const defaultText = isPortuguese ? 'Carregando...' : 'Loading...'

  return (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      <div className={`${sizeClasses[size]} animate-spin`}>
        <div className="h-full w-full rounded-full border-4 border-gray-200 border-t-primary-600"></div>
      </div>
      {(text || size === 'lg') && (
        <p className="text-sm text-gray-600 font-medium">
          {text || defaultText}
        </p>
      )}
    </div>
  )
}

// Loading skeleton for cards
export function LoadingCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4 sm:p-6">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
        <div className="h-3 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

// Portuguese-themed loading states
export function PortugueseLoadingSpinner() {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-secondary-200 border-t-secondary-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🇵🇹</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-900 mb-1">
          {isPortuguese ? 'Conectando a comunidade...' : 'Connecting the community...'}
        </p>
        <p className="text-sm text-gray-600">
          {isPortuguese ? 'Unidos pela Língua' : 'United by Language'}
        </p>
      </div>
    </div>
  )
}