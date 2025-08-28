'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, DevicePhoneMobileIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { COMPONENT_Z_INDEX } from '@/config/z-index-layers'
import { useAriaAnnouncements, ARIA_MESSAGES } from '@/hooks/useAriaAnnouncements'
import { useFocusIndicator } from '@/hooks/useFocusManagement'

interface AppDownloadBarProps {
  className?: string
  autoShow?: boolean
  showDelay?: number
  position?: 'bottom' | 'top'
}

/**
 * Bottom App Download Bar - Dismissible promotion for mobile app
 * Features:
 * - Clear dismiss options (X button + "Skip for now" link)
 * - Dynamic z-index positioning
 * - State management with localStorage
 * - Smooth animations
 * - Adjusts other widget positions when visible
 */
export default function AppDownloadBar({
  className = '',
  autoShow = true,
  showDelay = 5000, // 5 seconds delay
  position = 'bottom'
}: AppDownloadBarProps) {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // ARIA and Focus Management
  const { announcePolite } = useAriaAnnouncements()
  const { addFocusClasses } = useFocusIndicator()
  const barRef = useRef<HTMLDivElement>(null)
  const downloadButtonRef = useRef<HTMLAnchorElement>(null)
  const skipButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const STORAGE_KEY = 'lusotown_app_download_bar_dismissed'
  const SESSION_KEY = 'lusotown_app_download_shown'

  // Check if user is on mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      const isSmallScreen = window.innerWidth < 768
      setIsMobile(isMobileDevice || isSmallScreen)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-show logic
  useEffect(() => {
    if (!autoShow || !isMobile) return

    const isDismissed = localStorage.getItem(STORAGE_KEY)
    const hasShownInSession = sessionStorage.getItem(SESSION_KEY)

    if (isDismissed || hasShownInSession) return

    const timer = setTimeout(() => {
      setIsVisible(true)
      sessionStorage.setItem(SESSION_KEY, 'true')
      // Announce to screen readers
      announcePolite(ARIA_MESSAGES.appDownloadBar.shown, true)
      // Emit event for widget manager
      window.dispatchEvent(new CustomEvent('appDownloadBarShown'))
    }, showDelay)

    return () => clearTimeout(timer)
  }, [autoShow, showDelay, isMobile])

  // Add body padding when app bar is at top to prevent content overlap
  useEffect(() => {
    if (position === 'top' && isVisible) {
      document.body.style.paddingTop = '80px' // Height of the app bar
    } else {
      document.body.style.paddingTop = '0px'
    }
    
    return () => {
      document.body.style.paddingTop = '0px'
    }
  }, [position, isVisible])

  // Dismiss handlers
  const handleDismiss = (permanent: boolean = false) => {
    setIsAnimating(true)
    
    // Announce dismissal
    announcePolite(ARIA_MESSAGES.appDownloadBar.dismissed)
    
    setTimeout(() => {
      setIsVisible(false)
      setIsAnimating(false)
      
      if (permanent) {
        localStorage.setItem(STORAGE_KEY, 'true')
      }
      
      // Emit custom event for other widgets to reposition
      window.dispatchEvent(new CustomEvent('appDownloadBarDismissed'))
    }, 150)
  }

  const handleSkip = () => {
    handleDismiss(false) // Temporary dismiss for session only
  }

  const handleClose = () => {
    handleDismiss(true) // Permanent dismiss
  }

  const handleDownloadClick = () => {
    // Announce download started
    announcePolite(ARIA_MESSAGES.appDownloadBar.downloadStarted)
    
    // Track download attempt
    if (typeof gtag !== 'undefined') {
      gtag('event', 'app_download_click', {
        source: 'bottom_bar',
        platform: navigator.userAgent.includes('iPhone') ? 'ios' : 'android'
      })
    }
  }

  if (!isVisible || !isMobile) return null

  const isPortuguese = language === 'pt'

  return (
    <AnimatePresence>
      <motion.div
        ref={barRef}
        initial={{ y: position === 'bottom' ? 100 : -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: position === 'bottom' ? 100 : -100, opacity: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          duration: 0.4
        }}
        className={`fixed ${position === 'bottom' ? 'bottom-0' : 'top-0'} left-0 right-0 
          bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-2xl
          ${position === 'bottom' ? 'rounded-t-2xl border-t border-primary-400' : 'border-b border-primary-400'}
          ${className}`}
        style={{ zIndex: COMPONENT_Z_INDEX.appDownloadBar }}
        role="banner"
        aria-labelledby="app-download-title"
        aria-describedby="app-download-description"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 left-4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-2 right-8 w-1 h-1 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 py-3 px-4">
          <div className="flex items-center justify-between gap-4">
            
            {/* Content Section */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              
              {/* App Icon */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <DevicePhoneMobileIcon className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <SparklesIcon className="w-4 h-4 text-white" aria-hidden="true" />
                  <span id="app-download-title" className="font-bold text-sm">
                    {isPortuguese 
                      ? 'App LusoTown Disponível!' 
                      : 'LusoTown App Available!'}
                  </span>
                </div>
                <p id="app-download-description" className="text-xs text-white/90 leading-tight">
                  {isPortuguese
                    ? 'Conecte-se com a comunidade lusófona no Reino Unido, descubra eventos culturais e encontre a sua rede. Descarregue agora.'
                    : 'Connect with the Portuguese-speaking community across the UK, discover cultural events, and build your network. Download now.'}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              
              {/* Primary Download Button */}
              <a
                ref={downloadButtonRef}
                href={navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')
                  ? 'https://apps.apple.com/app/lusotown-london'
                  : 'https://play.google.com/store/apps/details?id=com.lusotown.london'
                }
                className="bg-white text-primary-600 px-3 py-2 rounded-lg font-semibold text-xs
                  hover:bg-white/95 transition-colors shadow-sm flex-shrink-0 min-h-[44px] min-w-[60px] flex items-center justify-center whitespace-nowrap"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDownloadClick}
                onFocus={() => {
                  if (downloadButtonRef.current) {
                    addFocusClasses(downloadButtonRef.current as HTMLElement, 'button');
                  }
                }}
                onBlur={() => {
                  if (downloadButtonRef.current) {
                    (downloadButtonRef.current as HTMLElement).classList.remove('lusotown-button-focus', 'lusotown-focus-smooth');
                  }
                }}
                aria-label={
                  isPortuguese 
                    ? `Descarregar app LusoTown para ${navigator.userAgent.includes('iPhone') ? 'iOS' : 'Android'}. Abre numa nova janela.`
                    : `Download LusoTown app for ${navigator.userAgent.includes('iPhone') ? 'iOS' : 'Android'}. Opens in a new window.`
                }
              >
                {isPortuguese ? 'App' : 'Get'}
              </a>

              {/* Skip Button */}
              <button
                ref={skipButtonRef}
                onClick={handleSkip}
                className="text-white/80 hover:text-white transition-colors px-2 py-1 text-xs
                  underline underline-offset-2 flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center whitespace-nowrap"
                onFocus={() => {
                  if (skipButtonRef.current) {
                    addFocusClasses(skipButtonRef.current, 'button');
                  }
                }}
                onBlur={() => {
                  if (skipButtonRef.current) {
                    skipButtonRef.current.classList.remove('lusotown-button-focus', 'lusotown-focus-smooth');
                  }
                }}
                aria-label={
                  isPortuguese 
                    ? 'Saltar por agora. Banner será mostrado novamente noutra sessão.'
                    : 'Skip for now. Banner will be shown again in another session.'
                }
              >
                {isPortuguese ? 'Agora não' : 'Later'}
              </button>

              {/* Close Button */}
              <button
                ref={closeButtonRef}
                onClick={handleClose}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center 
                  justify-center transition-colors flex-shrink-0 ml-1 min-h-[44px] min-w-[44px]"
                onFocus={() => {
                  if (closeButtonRef.current) {
                    addFocusClasses(closeButtonRef.current, 'button');
                  }
                }}
                onBlur={() => {
                  if (closeButtonRef.current) {
                    closeButtonRef.current.classList.remove('lusotown-button-focus', 'lusotown-focus-smooth');
                  }
                }}
                aria-label={
                  isPortuguese 
                    ? 'Fechar permanentemente. Banner não será mostrado novamente.' 
                    : 'Close permanently. Banner will not be shown again.'
                }
              >
                <XMarkIcon className="w-4 h-4 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Portuguese Heritage Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 via-yellow-300 to-red-400"></div>
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * Hook to check if App Download Bar is currently visible
 * Other components can use this to adjust their positioning
 */
export function useAppDownloadBarVisible(): boolean {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleDismiss = () => setIsVisible(false)
    const handleShow = () => setIsVisible(true)

    // Listen for visibility changes
    window.addEventListener('appDownloadBarDismissed', handleDismiss)
    window.addEventListener('appDownloadBarShown', handleShow)

    // Check initial state
    const isDismissed = localStorage.getItem('lusotown_app_download_bar_dismissed')
    const hasShownInSession = sessionStorage.getItem('lusotown_app_download_shown')
    setIsVisible(!isDismissed && hasShownInSession === 'true')

    return () => {
      window.removeEventListener('appDownloadBarDismissed', handleDismiss)
      window.removeEventListener('appDownloadBarShown', handleShow)
    }
  }, [])

  return isVisible
}