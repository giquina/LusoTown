'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import logger from '@/utils/logger'

interface PWAInstallationState {
  canInstall: boolean
  isInstalled: boolean
  installPromptEvent: any
  hasShownPrompt: boolean
  installationSource: 'banner' | 'button' | 'automatic' | null
}

interface OfflineCapabilities {
  isOffline: boolean
  hasOfflineContent: boolean
  cachedPagesCount: number
  offlineEventsCount: number
  offlineBusinessesCount: number
  lastSyncTime: Date | null
  pendingActions: OfflineAction[]
}

interface OfflineAction {
  id: string
  type: 'favorite-event' | 'save-business' | 'send-message' | 'rsvp-event'
  data: any
  timestamp: Date
  retryCount: number
}

interface PushNotificationSettings {
  enabled: boolean
  culturalEvents: boolean
  businessUpdates: boolean
  communityMessages: boolean
  festivalReminders: boolean
  fadoNights: boolean
  portugalDay: boolean
  brazilianEvents: boolean
  capeVerdeanEvents: boolean
  quietHoursStart: string
  quietHoursEnd: string
  language: 'en' | 'pt'
}

interface BackgroundSyncData {
  culturalEvents: any[]
  featuredBusinesses: any[]
  communityUpdates: any[]
  userPreferences: any
  lastSyncTimestamp: Date
}

const DEFAULT_NOTIFICATION_SETTINGS: PushNotificationSettings = {
  enabled: true,
  culturalEvents: true,
  businessUpdates: true,
  communityMessages: true,
  festivalReminders: true,
  fadoNights: true,
  portugalDay: true,
  brazilianEvents: true,
  capeVerdeanEvents: true,
  quietHoursStart: '22:00',
  quietHoursEnd: '08:00',
  language: 'en'
}

export function usePortuguesePWAFeatures() {
  const { language, t } = useLanguage()
  const [installationState, setInstallationState] = useState<PWAInstallationState>({
    canInstall: false,
    isInstalled: false,
    installPromptEvent: null,
    hasShownPrompt: false,
    installationSource: null
  })

  const [offlineCapabilities, setOfflineCapabilities] = useState<OfflineCapabilities>({
    isOffline: typeof navigator !== 'undefined' ? !typeof navigator !== "undefined" && navigator.onLine : false,
    hasOfflineContent: false,
    cachedPagesCount: 0,
    offlineEventsCount: 0,
    offlineBusinessesCount: 0,
    lastSyncTime: null,
    pendingActions: []
  })

  const [notificationSettings, setNotificationSettings] = useState<PushNotificationSettings>({
    ...DEFAULT_NOTIFICATION_SETTINGS,
    language: language as 'en' | 'pt'
  })

  const [backgroundSyncData, setBackgroundSyncData] = useState<BackgroundSyncData>({
    culturalEvents: [],
    featuredBusinesses: [],
    communityUpdates: [],
    userPreferences: {},
    lastSyncTimestamp: new Date()
  })

  const syncInterval = useRef<NodeJS.Timeout>()
  const installPromptTimeout = useRef<NodeJS.Timeout>()

  // Portuguese cultural PWA install prompts
  const getPortugueseInstallMessage = useCallback(() => {
    const messages = {
      en: {
        title: 'Install LusoTown App',
        subtitle: 'Get instant access to Portuguese cultural events',
        description: 'Never miss Fado nights, festivals, or community gatherings. Install LusoTown for the best Portuguese-speaking community experience.',
        install: 'Install App',
        later: 'Maybe Later',
        benefits: [
          'Offline access to Portuguese events',
          'Push notifications for cultural celebrations',
          'Faster loading of business directory',
          'Portuguese flag homescreen icon'
        ]
      },
      pt: {
        title: 'Instalar App LusoTown',
        subtitle: 'Acesso instantâneo a eventos culturais portugueses',
        description: 'Nunca percas noites de Fado, festivais ou encontros comunitários. Instala LusoTown para a melhor experiência da comunidade lusófona.',
        install: 'Instalar App',
        later: 'Talvez Mais Tarde',
        benefits: [
          'Acesso offline a eventos portugueses',
          'Notificações de celebrações culturais',
          'Carregamento mais rápido do diretório',
          'Ícone da bandeira portuguesa no ecrã inicial'
        ]
      }
    }
    
    return messages[language as keyof typeof messages] || messages.en
  }, [language])

  // PWA installation management
  const handleInstallPrompt = useCallback(async (source: 'banner' | 'button' | 'automatic' = 'button') => {
    if (!installationState.canInstall || !installationState.installPromptEvent) {
      logger.warn('[PWA] No install prompt available')
      return false
    }

    try {
      setInstallationState(prev => ({ ...prev, installationSource: source }))
      
      // Show the install prompt
      installationState.installPromptEvent.prompt()
      
      // Wait for user choice
      const result = await installationState.installPromptEvent.userChoice
      
      if (result.outcome === 'accepted') {
        setInstallationState(prev => ({
          ...prev,
          isInstalled: true,
          canInstall: false,
          installPromptEvent: null
        }))
        
        // Track installation for Portuguese community analytics
        if ('gtag' in window) {
          (window as any).gtag('event', 'pwa_install', {
            event_category: 'pwa',
            event_label: `portuguese_community_${source}`,
            language: language
          })
        }
        
        logger.info('[PWA] Portuguese community app installed successfully', { source, language })
        return true
      } else {
        setInstallationState(prev => ({ ...prev, hasShownPrompt: true }))
        return false
      }
    } catch (error) {
      logger.error('[PWA] Installation failed:', error)
      return false
    }
  }, [installationState, language])

  // Portuguese cultural push notifications
  const requestPortugueseNotifications = useCallback(async () => {
    if (!('Notification' in window) || !(typeof navigator !== 'undefined' && 'serviceWorker' in navigator)) {
      return false
    }

    try {
      const permission = await Notification.requestPermission()
      
      if (permission === 'granted') {
        setNotificationSettings(prev => ({ ...prev, enabled: true }))
        
        // Register for Portuguese cultural event categories
        const registration = await typeof navigator !== "undefined" && navigator.serviceWorker.ready
        
        if ('pushManager' in registration) {
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
          })
          
          // Send subscription to server with Portuguese preferences
          await fetch('/api/notifications/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              subscription,
              preferences: notificationSettings,
              language,
              culturalInterests: [
                'fado-nights',
                'portuguese-festivals', 
                'brazilian-events',
                'cape-verdean-music',
                'lusophone-networking'
              ]
            })
          })
          
          logger.info('[PWA] Portuguese community notifications enabled')
          return true
        }
      }
      
      return false
    } catch (error) {
      logger.error('[PWA] Notification setup failed:', error)
      return false
    }
  }, [notificationSettings, language])

  // Enhanced offline functionality for Portuguese content
  const enableOfflineMode = useCallback(async () => {
    try {
      if ('serviceWorker' in navigator) {
        const registration = await typeof navigator !== "undefined" && navigator.serviceWorker.ready
        
        // Trigger background sync for Portuguese cultural content
        if ('sync' in registration) {
          await registration.sync.register('portuguese-community-sync')
          await registration.sync.register('cultural-events-sync')
          await registration.sync.register('business-directory-sync')
        }
        
        // Cache Portuguese cultural content
        const cache = await caches.open('portuguese-cultural-v3.0.1')
        
        const culturalResources = [
          '/api/events?category=fado-nights&limit=10',
          '/api/events?category=portuguese-festivals&limit=10',
          '/api/events?category=brazilian-events&limit=10',
          '/api/businesses?type=restaurants&portuguese=true&limit=20',
          '/api/businesses?type=cultural&portuguese=true&limit=10',
          '/events',
          '/business-directory',
          '/community'
        ]
        
        const cachePromises = culturalResources.map(async (url) => {
          try {
            const response = await fetch(url)
            if (response.ok) {
              await cache.put(url, response)
            }
          } catch (error) {
            logger.warn(`[PWA] Failed to cache ${url}:`, error)
          }
        })
        
        await Promise.allSettled(cachePromises)
        
        // Update offline capabilities
        const cachedRequests = await cache.keys()
        setOfflineCapabilities(prev => ({
          ...prev,
          hasOfflineContent: true,
          cachedPagesCount: cachedRequests.length,
          lastSyncTime: new Date()
        }))
        
        logger.info('[PWA] Portuguese cultural content cached for offline use')
      }
    } catch (error) {
      logger.error('[PWA] Offline mode setup failed:', error)
    }
  }, [])

  // Background sync for Portuguese community data
  const syncPortugueseContent = useCallback(async () => {
    try {
      if (!typeof navigator !== "undefined" && navigator.onLine) {
        logger.info('[PWA] Device offline, skipping sync')
        return
      }

      const syncPromises = [
        // Portuguese cultural events
        fetch('/api/events?featured=true&lang=pt&limit=20').then(r => r.json()),
        // Featured Portuguese businesses
        fetch('/api/businesses?featured=true&portuguese=true&limit=15').then(r => r.json()),
        // Community updates
        fetch('/api/community/updates?lang=pt&limit=10').then(r => r.json())
      ]

      const [events, businesses, updates] = await Promise.allSettled(syncPromises)

      setBackgroundSyncData({
        culturalEvents: events.status === 'fulfilled' ? events.value : [],
        featuredBusinesses: businesses.status === 'fulfilled' ? businesses.value : [],
        communityUpdates: updates.status === 'fulfilled' ? updates.value : [],
        userPreferences: notificationSettings,
        lastSyncTimestamp: new Date()
      })

      setOfflineCapabilities(prev => ({
        ...prev,
        offlineEventsCount: events.status === 'fulfilled' ? events.value.length : 0,
        offlineBusinessesCount: businesses.status === 'fulfilled' ? businesses.value.length : 0,
        lastSyncTime: new Date()
      }))

      logger.info('[PWA] Portuguese community content synced successfully')
    } catch (error) {
      logger.error('[PWA] Background sync failed:', error)
    }
  }, [notificationSettings])

  // Handle offline actions
  const queueOfflineAction = useCallback((action: Omit<OfflineAction, 'id' | 'timestamp' | 'retryCount'>) => {
    const offlineAction: OfflineAction = {
      ...action,
      id: `offline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      retryCount: 0
    }

    setOfflineCapabilities(prev => ({
      ...prev,
      pendingActions: [...prev.pendingActions, offlineAction]
    }))

    // Store in IndexedDB for persistence
    if ('indexedDB' in window) {
      const request = indexedDB.open('LusoTownOffline', 1)
      request.onsuccess = (event) => {
        const db = (event.target as any).result
        const transaction = db.transaction(['offlineActions'], 'readwrite')
        const store = transaction.objectStore('offlineActions')
        store.add(offlineAction)
      }
    }

    logger.info('[PWA] Offline action queued:', offlineAction.type)
  }, [])

  // Process offline actions when back online
  const processOfflineActions = useCallback(async () => {
    if (!typeof navigator !== "undefined" && navigator.onLine || offlineCapabilities.pendingActions.length === 0) {
      return
    }

    const actionsToProcess = [...offlineCapabilities.pendingActions]
    const processedActions: string[] = []

    for (const action of actionsToProcess) {
      try {
        let success = false

        switch (action.type) {
          case 'favorite-event':
            await fetch('/api/events/favorite', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(action.data)
            })
            success = true
            break

          case 'save-business':
            await fetch('/api/businesses/save', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(action.data)
            })
            success = true
            break

          case 'rsvp-event':
            await fetch('/api/events/rsvp', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(action.data)
            })
            success = true
            break
        }

        if (success) {
          processedActions.push(action.id)
        } else {
          // Increment retry count
          action.retryCount++
          if (action.retryCount >= 3) {
            processedActions.push(action.id) // Remove after 3 failed attempts
          }
        }
      } catch (error) {
        logger.warn(`[PWA] Failed to process offline action ${action.type}:`, error)
        action.retryCount++
        if (action.retryCount >= 3) {
          processedActions.push(action.id)
        }
      }
    }

    // Remove processed actions
    setOfflineCapabilities(prev => ({
      ...prev,
      pendingActions: prev.pendingActions.filter(action => !processedActions.includes(action.id))
    }))

    if (processedActions.length > 0) {
      logger.info(`[PWA] Processed ${processedActions.length} offline actions`)
    }
  }, [offlineCapabilities.pendingActions])

  // Smart install prompt timing for Portuguese users
  const schedulePortugueseInstallPrompt = useCallback(() => {
    if (installationState.hasShownPrompt || !installationState.canInstall) {
      return
    }

    // Show install prompt after user has engaged with Portuguese cultural content
    const engagementThreshold = 3 // 3 interactions with cultural content
    let engagementCount = 0

    const trackEngagement = () => {
      engagementCount++
      if (engagementCount >= engagementThreshold) {
        installPromptTimeout.current = setTimeout(() => {
          handleInstallPrompt('automatic')
        }, 2000) // Small delay for better UX
      }
    }

    // Track Portuguese cultural content interactions
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-portuguese-content]') || 
          target.closest('.cultural-event') ||
          target.closest('.portuguese-business')) {
        trackEngagement()
      }
    })
  }, [installationState.hasShownPrompt, installationState.canInstall, handleInstallPrompt])

  // Initialize PWA features
  useEffect(() => {
    const initializePWAFeatures = async () => {
      // Check if already installed
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setInstallationState(prev => ({ ...prev, isInstalled: true }))
      }

      // Listen for install prompt
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault()
        setInstallationState(prev => ({
          ...prev,
          canInstall: true,
          installPromptEvent: e
        }))
        schedulePortugueseInstallPrompt()
      }

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

      // Online/offline status
      const handleOnline = () => {
        setOfflineCapabilities(prev => ({ ...prev, isOffline: false }))
        processOfflineActions()
        syncPortugueseContent()
      }

      const handleOffline = () => {
        setOfflineCapabilities(prev => ({ ...prev, isOffline: true }))
      }

      window.addEventListener('online', handleOnline)
      window.addEventListener('offline', handleOffline)

      // Initial content sync
      if (typeof navigator !== "undefined" && navigator.onLine) {
        await enableOfflineMode()
        await syncPortugueseContent()
      }

      // Set up periodic sync
      syncInterval.current = setInterval(() => {
        if (typeof navigator !== "undefined" && navigator.onLine) {
          syncPortugueseContent()
        }
      }, 5 * 60 * 1000) // Sync every 5 minutes

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        window.removeEventListener('online', handleOnline)
        window.removeEventListener('offline', handleOffline)
        
        if (syncInterval.current) {
          clearInterval(syncInterval.current)
        }
        
        if (installPromptTimeout.current) {
          clearTimeout(installPromptTimeout.current)
        }
      }
    }

    initializePWAFeatures()
  }, [enableOfflineMode, syncPortugueseContent, processOfflineActions, schedulePortugueseInstallPrompt])

  // Update notification settings language
  useEffect(() => {
    setNotificationSettings(prev => ({
      ...prev,
      language: language as 'en' | 'pt'
    }))
  }, [language])

  return {
    installationState,
    offlineCapabilities,
    notificationSettings,
    backgroundSyncData,
    getPortugueseInstallMessage,
    handleInstallPrompt,
    requestPortugueseNotifications,
    enableOfflineMode,
    syncPortugueseContent,
    queueOfflineAction,
    processOfflineActions,
    setNotificationSettings,
    isFullyOfflineCapable: offlineCapabilities.hasOfflineContent && offlineCapabilities.cachedPagesCount > 0
  }
}