'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '@/context/LanguageContext'
import { useEnhancedKeyboardNavigation } from '@/hooks/useEnhancedKeyboardNavigation'
import { XMarkIcon } from '@heroicons/react/24/outline'
import keyboardNavEN from '@/i18n/keyboard-navigation-en.json'
import keyboardNavPT from '@/i18n/keyboard-navigation-pt.json'

interface EnhancedModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  culturalContext?: 'portugal' | 'brazil' | 'cape-verde' | 'angola' | 'mozambique' | 'general'
  showCloseButton?: boolean
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  initialFocus?: string // CSS selector for initial focus element
  returnFocus?: HTMLElement | null // Element to return focus to when modal closes
  className?: string
  overlayClassName?: string
}

export default function EnhancedModal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  culturalContext = 'general',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  initialFocus,
  returnFocus,
  className = '',
  overlayClassName = ''
}: EnhancedModalProps) {
  const { language } = useLanguage()
  const translations = language === 'pt' ? keyboardNavPT : keyboardNavEN

  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)
  const isInitialMount = useRef(true)

  // Handle focus management
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement
      
      // Focus management
      setTimeout(() => {
        if (initialFocus) {
          const focusElement = document.querySelector(initialFocus) as HTMLElement
          if (focusElement) {
            focusElement.focus()
          }
        } else if (modalRef.current) {
          modalRef.current.focus()
        }
      }, 100)

      // Trap focus within modal
      document.body.style.overflow = 'hidden'
      
      // Screen reader announcement
      const announcement = document.createElement('div')
      announcement.setAttribute('aria-live', 'assertive')
      announcement.setAttribute('aria-atomic', 'true')
      announcement.className = 'sr-only'
      announcement.textContent = language === 'pt' 
        ? `Modal aberto${title ? `: ${title}` : ''}`
        : `Modal opened${title ? `: ${title}` : ''}`
      document.body.appendChild(announcement)
      
      setTimeout(() => {
        document.body.removeChild(announcement)
      }, 1000)

    } else if (!isInitialMount.current) {
      // Restore focus when modal closes
      document.body.style.overflow = ''
      
      if (returnFocus) {
        returnFocus.focus()
      } else if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }

    isInitialMount.current = false

    return () => {
      if (isOpen) {
        document.body.style.overflow = ''
      }
    }
  }, [isOpen, initialFocus, returnFocus, title, language])

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      // Escape key handling
      if (event.key === 'Escape' && closeOnEscape) {
        onClose()
        return
      }

      // Tab key handling for focus trap
      if (event.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
        )
        
        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0] as HTMLElement
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
          
          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              event.preventDefault()
              lastElement.focus()
            }
          } else {
            if (document.activeElement === lastElement) {
              event.preventDefault()
              firstElement.focus()
            }
          }
        }
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, closeOnEscape, onClose])

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      onClose()
    }
  }

  const closeButtonProps = useEnhancedKeyboardNavigation({
    onClick: onClose,
    culturalContext,
    ariaLabel: language === 'pt' ? 'Fechar modal' : 'Close modal',
    announceActions: true
  })

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-sm'
      case 'lg':
        return 'max-w-4xl'
      case 'xl':
        return 'max-w-6xl'
      case 'full':
        return 'max-w-full mx-4'
      default:
        return 'max-w-2xl'
    }
  }

  const getCulturalGradient = () => {
    switch (culturalContext) {
      case 'portugal':
        return 'from-green-50 via-red-25 to-green-50'
      case 'brazil':
        return 'from-green-50 via-yellow-25 to-blue-50'
      case 'cape-verde':
        return 'from-blue-50 via-white to-blue-50'
      default:
        return 'from-primary-50 to-secondary-50'
    }
  }

  if (!isOpen) return null

  const modalContent = (
    <div 
      className={`fixed inset-0 z-50 overflow-y-auto ${overlayClassName}`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={modalRef}
          className={`
            relative bg-white rounded-2xl shadow-xl w-full overflow-hidden
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50
            ${getSizeClasses()}
            ${className}
          `}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          tabIndex={-1}
        >
          {/* Cultural Header Accent */}
          <div className={`h-1 bg-gradient-to-r ${getCulturalGradient()}`} />
          
          {/* Header */}
          {(title || showCloseButton) && (
            <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              {title && (
                <h2 id="modal-title" className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  {culturalContext !== 'general' && (
                    <span role="img" aria-label={`${culturalContext} context`}>
                      {culturalContext === 'portugal' ? '🇵🇹' :
                       culturalContext === 'brazil' ? '🇧🇷' :
                       culturalContext === 'cape-verde' ? '🇨🇻' :
                       culturalContext === 'angola' ? '🇦🇴' :
                       culturalContext === 'mozambique' ? '🇲🇿' : '🌍'}
                    </span>
                  )}
                  {title}
                </h2>
              )}
              
              {showCloseButton && (
                <button
                  {...closeButtonProps}
                  className="p-2 text-gray-400 hover:text-gray-600 focus:text-gray-600 rounded-lg hover:bg-gray-100 focus:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[44px] min-w-[44px]"
                >
                  <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                </button>
              )}
            </header>
          )}
          
          {/* Content */}
          <main className="px-6 py-6 max-h-[70vh] overflow-y-auto">
            {children}
          </main>
          
          {/* Cultural Footer Accent */}
          <div className={`h-1 bg-gradient-to-r ${getCulturalGradient()}`} />
        </div>
      </div>
    </div>
  )

  // Use portal to render modal at body level
  return typeof document !== 'undefined' ? 
    createPortal(modalContent, document.body) : 
    null
}

// Specialized modal variants for common use cases
export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  culturalContext = 'general',
  isDestructive = false
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  culturalContext?: 'portugal' | 'brazil' | 'cape-verde' | 'angola' | 'mozambique' | 'general'
  isDestructive?: boolean
}) {
  const { language } = useLanguage()
  const translations = language === 'pt' ? keyboardNavPT : keyboardNavEN

  const confirmButtonProps = useEnhancedKeyboardNavigation({
    onClick: onConfirm,
    culturalContext,
    ariaLabel: confirmText || (language === 'pt' ? 'Confirmar' : 'Confirm'),
    announceActions: true
  })

  const cancelButtonProps = useEnhancedKeyboardNavigation({
    onClick: onClose,
    culturalContext,
    ariaLabel: cancelText || (language === 'pt' ? 'Cancelar' : 'Cancel'),
    announceActions: true
  })

  return (
    <EnhancedModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      culturalContext={culturalContext}
      initialFocus="#confirm-button"
    >
      <div className="text-center">
        <p className="text-gray-700 mb-6">{message}</p>
        
        <div className="flex gap-3 justify-center">
          <button
            {...cancelButtonProps}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 min-h-[44px]"
          >
            {cancelText || (language === 'pt' ? 'Cancelar' : 'Cancel')}
          </button>
          
          <button
            id="confirm-button"
            {...confirmButtonProps}
            className={`px-4 py-2 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 min-h-[44px] ${
              isDestructive
                ? 'bg-red-600 hover:bg-red-700 focus:bg-red-700 focus:ring-red-500'
                : 'bg-primary-600 hover:bg-primary-700 focus:bg-primary-700 focus:ring-primary-500'
            }`}
          >
            {confirmText || (language === 'pt' ? 'Confirmar' : 'Confirm')}
          </button>
        </div>
      </div>
    </EnhancedModal>
  )
}