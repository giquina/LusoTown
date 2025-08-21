'use client'

import React, { useState } from 'react'
import { useHeritage } from '@/context/HeritageContext'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

interface HeritageSelectorProps {
  className?: string
  showLabel?: boolean
  compact?: boolean
}

export default function HeritageSelector({ 
  className = '', 
  showLabel = true, 
  compact = false 
}: HeritageSelectorProps) {
  const { heritage, heritageCode, setHeritage, availableHeritages } = useHeritage()
  const [isOpen, setIsOpen] = useState(false)

  // Don't show if only one heritage available
  if (availableHeritages.length <= 1) {
    return null
  }

  const handleHeritageChange = (code: string) => {
    setHeritage(code)
    setIsOpen(false)
  }

  const currentHeritage = availableHeritages.find(h => h.code === heritageCode)

  if (compact) {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Select heritage community"
        >
          <span className="text-sm">{currentHeritage?.flag}</span>
          <ChevronDownIcon className={`w-3 h-3 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[150px] z-50"
            >
              {availableHeritages.map((h) => (
                <button
                  key={h.code}
                  onClick={() => handleHeritageChange(h.code)}
                  className={`w-full px-3 py-2 text-left flex items-center space-x-2 hover:bg-gray-50 transition-colors ${
                    h.code === heritageCode ? 'bg-gray-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <span className="text-lg">{h.flag}</span>
                  <span className="text-sm">{h.name}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {showLabel && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Heritage Community
        </label>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        aria-label="Select heritage community"
      >
        <div className="flex items-center space-x-3">
          <span className="text-lg">{currentHeritage?.flag}</span>
          <div className="text-left">
            <div className="font-medium text-gray-900">{currentHeritage?.name}</div>
            <div className="text-xs text-gray-500">
              {heritage.geography.diasporaHub.city} Community
            </div>
          </div>
        </div>
        <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
          >
            {availableHeritages.map((h) => (
              <button
                key={h.code}
                onClick={() => handleHeritageChange(h.code)}
                className={`w-full px-3 py-3 text-left flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                  h.code === heritageCode ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{h.flag}</span>
                <div>
                  <div className="font-medium">{h.name}</div>
                  <div className="text-xs text-gray-500">
                    Heritage Community Platform
                  </div>
                </div>
                {h.code === heritageCode && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

// Mini heritage indicator for headers/footers
export function HeritageIndicator({ className = '' }: { className?: string }) {
  const { heritage } = useHeritage()
  
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <span className="text-sm">{heritage.branding.symbols.flag}</span>
      <span className="text-xs text-gray-600 font-medium">
        {heritage.identity.name}
      </span>
    </div>
  )
}

// Heritage badge for cards and components
export function HeritageBadge({ 
  className = '',
  showText = true 
}: { 
  className?: string
  showText?: boolean 
}) {
  const { heritage, colors } = useHeritage()
  
  return (
    <div 
      className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${className}`}
      style={{ 
        backgroundColor: `${colors.primary}20`,
        color: colors.primary 
      }}
    >
      <span>{heritage.branding.symbols.flag}</span>
      {showText && (
        <span>{heritage.identity.name}</span>
      )}
    </div>
  )
}