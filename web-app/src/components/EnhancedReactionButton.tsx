'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useEnhancedKeyboardNavigation } from '@/hooks/useEnhancedKeyboardNavigation'
import keyboardNavEN from '@/i18n/keyboard-navigation-en.json'
import keyboardNavPT from '@/i18n/keyboard-navigation-pt.json'

interface EnhancedReactionButtonProps {
  emoji: string
  count: number
  isActive: boolean
  onClick: () => void
  tooltip: string
  culturalContext?: 'portugal' | 'brazil' | 'cape-verde' | 'angola' | 'mozambique' | 'general'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export default function EnhancedReactionButton({
  emoji,
  count,
  isActive,
  onClick,
  tooltip,
  culturalContext = 'general',
  size = 'md',
  disabled = false
}: EnhancedReactionButtonProps) {
  const { language } = useLanguage()
  const translations = language === 'pt' ? keyboardNavPT : keyboardNavEN

  const [showTooltip, setShowTooltip] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const handleClick = () => {
    if (!disabled) {
      setIsPressed(true)
      onClick()
      setTimeout(() => setIsPressed(false), 150)
    }
  }

  const buttonProps = useEnhancedKeyboardNavigation({
    onClick: handleClick,
    culturalContext,
    ariaLabel: `${tooltip} ${translations.post.reaction.love || 'reaction'} - ${count}`,
    announceActions: true,
    disabled
  })

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs min-h-[32px] min-w-[32px]'
      case 'lg':
        return 'px-4 py-3 text-base min-h-[52px] min-w-[52px]'
      default:
        return 'px-3 py-2 text-sm min-h-[44px] min-w-[44px]'
    }
  }

  const getEmojiSize = () => {
    switch (size) {
      case 'sm':
        return 'text-sm'
      case 'lg':
        return 'text-xl'
      default:
        return 'text-base'
    }
  }

  return (
    <div className="relative inline-block">
      <button
        {...buttonProps}
        className={`
          ${getSizeClasses()}
          flex items-center gap-2 rounded-full transition-all duration-200 
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1
          ${disabled 
            ? 'cursor-not-allowed opacity-50' 
            : 'cursor-pointer hover:scale-105 active:scale-95'
          }
          ${isActive
            ? 'bg-primary-100 text-primary-700 border border-primary-300 shadow-sm'
            : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 hover:text-gray-700'
          }
          ${isPressed ? 'scale-90' : ''}
        `}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        disabled={disabled}
      >
        <span 
          className={`${getEmojiSize()} transition-transform duration-200 ${
            isActive ? 'animate-bounce' : ''
          } ${
            isPressed ? 'scale-125' : ''
          }`}
          role="img" 
          aria-label={emoji}
        >
          {emoji}
        </span>
        
        {count > 0 && (
          <span className={`font-medium transition-all duration-200 ${
            isActive ? 'text-primary-800' : 'text-gray-700'
          }`}>
            {count}
          </span>
        )}
        
        {/* Visual feedback for active state */}
        {isActive && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full animate-ping opacity-75" />
        )}
      </button>
      
      {/* Enhanced Tooltip */}
      {showTooltip && !disabled && (
        <div 
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10 whitespace-nowrap opacity-90"
          role="tooltip"
          aria-hidden="true"
        >
          <div className="flex items-center gap-2">
            <span>{tooltip}</span>
            {culturalContext !== 'general' && (
              <span className="text-xs opacity-75">
                {culturalContext === 'portugal' ? '🇵🇹' :
                 culturalContext === 'brazil' ? '🇧🇷' :
                 culturalContext === 'cape-verde' ? '🇨🇻' :
                 culturalContext === 'angola' ? '🇦🇴' :
                 culturalContext === 'mozambique' ? '🇲🇿' : '🌍'}
              </span>
            )}
          </div>
          
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900" />
          
          {/* Keyboard hint */}
          <div className="text-xs opacity-75 mt-1 border-t border-gray-700 pt-1">
            {language === 'pt' ? 'Enter/Espaço para reagir' : 'Enter/Space to react'}
          </div>
        </div>
      )}
      
      {/* Ripple effect for visual feedback */}
      {isPressed && !disabled && (
        <div className="absolute inset-0 rounded-full bg-primary-400 opacity-25 animate-ping" />
      )}
    </div>
  )
}