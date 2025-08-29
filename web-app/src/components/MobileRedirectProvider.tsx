'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { MOBILE_APP_CONFIG, DEVICE_DETECTION_CONFIG } from '@/config/mobile-app'

interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isIOS: boolean
  isAndroid: boolean
  userAgent: string
  viewport: {
    width: number
    height: number
  }
}

interface MobileRedirectContextType {
  deviceInfo: DeviceInfo
  showDownloadPrompt: boolean
  triggerAppDownload: () => void
  dismissDownloadPrompt: () => void
  setShowDownloadPrompt: (show: boolean) => void
}

const MobileRedirectContext = createContext<MobileRedirectContextType | undefined>(undefined)

export function useMobileRedirect() {
  const context = useContext(MobileRedirectContext)
  if (context === undefined) {
    throw new Error('useMobileRedirect must be used within a MobileRedirectProvider')
  }
  return context
}

interface MobileRedirectProviderProps {
  children: React.ReactNode
}

export default function MobileRedirectProvider({ children }: MobileRedirectProviderProps) {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isIOS: false,
    isAndroid: false,
    userAgent: '',
    viewport: {
      width: 1024,
      height: 768
    }
  })

  const [showDownloadPrompt, setShowDownloadPrompt] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const userAgent = navigator.userAgent
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    const isIOS = DEVICE_DETECTION_CONFIG.userAgentPatterns.ios.some(pattern => pattern.test(userAgent))
    const isAndroid = DEVICE_DETECTION_CONFIG.userAgentPatterns.android.some(pattern => pattern.test(userAgent))
    const isMobileByUA = DEVICE_DETECTION_CONFIG.userAgentPatterns.mobile.some(pattern => pattern.test(userAgent))
    const isTabletByUA = DEVICE_DETECTION_CONFIG.userAgentPatterns.tablet.some(pattern => pattern.test(userAgent))
    
    const isMobileByViewport = viewport.width < DEVICE_DETECTION_CONFIG.viewportBreakpoints.mobile
    const isTabletByViewport = viewport.width < DEVICE_DETECTION_CONFIG.viewportBreakpoints.tablet && viewport.width >= DEVICE_DETECTION_CONFIG.viewportBreakpoints.mobile

    const isMobile = isMobileByUA || isMobileByViewport
    const isTablet = isTabletByUA || isTabletByViewport
    const isDesktop = !isMobile && !isTablet

    setDeviceInfo({
      isMobile,
      isTablet,
      isDesktop,
      isIOS,
      isAndroid,
      userAgent,
      viewport
    })

    // Show download prompt for mobile users (but not tablets)
    if (isMobile && !isTablet) {
      const hasSeenPrompt = localStorage.getItem('lusotown_app_prompt_dismissed')
      if (!hasSeenPrompt) {
        setShowDownloadPrompt(true)
      }
    }

    // Handle viewport changes
    const handleResize = () => {
      const newViewport = {
        width: window.innerWidth,
        height: window.innerHeight
      }
      setDeviceInfo(prev => ({
        ...prev,
        viewport: newViewport
      }))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const triggerAppDownload = () => {
    if (deviceInfo.isIOS) {
      window.open(MOBILE_APP_CONFIG.stores.ios.url, '_blank')
    } else if (deviceInfo.isAndroid) {
      window.open(MOBILE_APP_CONFIG.stores.android.url, '_blank')
    } else {
      // Fallback to app store based on user agent
      window.open(MOBILE_APP_CONFIG.stores.ios.url, '_blank')
    }
  }

  const dismissDownloadPrompt = () => {
    setShowDownloadPrompt(false)
    localStorage.setItem('lusotown_app_prompt_dismissed', 'true')
  }

  const value: MobileRedirectContextType = {
    deviceInfo,
    showDownloadPrompt,
    triggerAppDownload,
    dismissDownloadPrompt,
    setShowDownloadPrompt
  }

  return (
    <MobileRedirectContext.Provider value={value}>
      {children}
    </MobileRedirectContext.Provider>
  )
}

// Mobile Download Prompt Component
export function MobileDownloadPrompt() {
  const { deviceInfo, showDownloadPrompt, triggerAppDownload, dismissDownloadPrompt } = useMobileRedirect()

  if (!showDownloadPrompt || !deviceInfo.isMobile) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-4 shadow-lg">
      <div className="flex items-center justify-between max-w-sm mx-auto">
        <div className="flex-1">
          <h3 className="font-semibold text-sm">Get the LusoTown App</h3>
          <p className="text-xs text-primary-100">Better experience for Portuguese community</p>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={triggerAppDownload}
            className="bg-white text-primary-600 px-3 py-1 rounded text-xs font-semibold hover:bg-primary-50"
          >
            Download
          </button>
          <button
            onClick={dismissDownloadPrompt}
            className="text-primary-100 hover:text-white text-xs"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
