/**
 * PWA Helper Functions for LusoTown Portuguese-speaking Community
 * 
 * Handles service worker registration, PWA installation prompts,
 * and offline functionality for the Portuguese-speaking community platform.
 */

import { PWA_ENHANCEMENT_CONFIG } from '@/config/mobile-app';
import { logger } from '@/utils/logger';

export interface PWAInstallPrompt {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export interface PWAInstallationState {
  isInstallable: boolean;
  isInstalled: boolean;
  canPrompt: boolean;
  promptEvent: PWAInstallPrompt | null;
}

/**
 * PWA Helper Class for Portuguese-speaking Community
 */
export class PWAHelper {
  private static instance: PWAHelper;
  private installPromptEvent: PWAInstallPrompt | null = null;
  private isServiceWorkerReady = false;
  private notificationPermission: NotificationPermission = 'default';
  
  private constructor() {}

  public static getInstance(): PWAHelper {
    if (!PWAHelper.instance) {
      PWAHelper.instance = new PWAHelper();
    }
    return PWAHelper.instance;
  }

  /**
   * Initialize PWA functionality for Portuguese community
   */
  public async initialize(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      // Register service worker
      await this.registerServiceWorker();
      
      // Setup install prompt handling
      this.setupInstallPrompt();
      
      // Setup notification permissions
      await this.setupNotifications();
      
      // Cache Portuguese cultural content
      await this.cachePortugueseCulturalContent();
      
      logger.info('PWA initialized for Portuguese-speaking community', {
        area: 'mobile',
        culturalContext: 'lusophone',
        action: 'pwa_initialized'
      });
    } catch (error) {
      logger.error('PWA initialization failed for Portuguese-speaking community', error, {
        area: 'mobile',
        culturalContext: 'lusophone',
        action: 'pwa_initialization_failed'
      });
    }
  }

  /**
   * Register service worker for Portuguese cultural caching
   */
  private async registerServiceWorker(): Promise<void> {
    if (!('serviceWorker' in navigator)) {
      logger.warn('Service Worker not supported for Portuguese-speaking community PWA', {
        area: 'mobile',
        culturalContext: 'lusophone',
        action: 'service_worker_not_supported'
      });
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none'
      });

      logger.info('Service Worker registered for Portuguese-speaking community PWA', {
        area: 'mobile',
        culturalContext: 'lusophone',
        action: 'service_worker_registered'
      });

      // Handle service worker updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.notifyUpdate();
            }
          });
        }
      });

      // Listen for service worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        this.handleServiceWorkerMessage(event);
      });

      this.isServiceWorkerReady = true;
    } catch (error) {
      logger.error('Service Worker registration failed for Portuguese-speaking community PWA', error, {
        area: 'mobile',
        culturalContext: 'lusophone',
        action: 'service_worker_registration_failed'
      });
    }
  }

  /**
   * Setup PWA installation prompt
   */
  private setupInstallPrompt(): void {
    window.addEventListener('beforeinstallprompt', (event) => {
      logger.debug('PWA install prompt available for Portuguese-speaking community', {
        area: 'mobile',
        culturalContext: 'lusophone',
        action: 'install_prompt_available'
      });
      
      // Prevent Chrome 76 and later from showing mini-infobar
      event.preventDefault();
      
      // Store the event for later use
      this.installPromptEvent = event as PWAInstallPrompt;
      
      // Notify app about install availability
      this.dispatchInstallAvailable();
    });

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      logger.info('LusoTown PWA installed successfully for Portuguese-speaking community', {
        area: 'mobile',
        culturalContext: 'lusophone',
        action: 'app_installed_successfully'
      });
      this.installPromptEvent = null;
      this.dispatchAppInstalled();
    });
  }

  /**
   * Setup push notifications for Portuguese cultural events
   */
  private async setupNotifications(): Promise<void> {
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      logger.warn('Notifications not supported for Portuguese-speaking community PWA', {
        area: 'mobile',
        culturalContext: 'lusophone',
        action: 'notifications_not_supported'
      });
      return;
    }

    this.notificationPermission = Notification.permission;

    if (this.notificationPermission === 'default') {
      // Don't request permission immediately - wait for user action
      logger.debug('Notification permission not yet requested for Portuguese-speaking community', {
        area: 'mobile',
        culturalContext: 'lusophone',
        action: 'notification_permission_not_requested'
      });
    }
  }

  /**
   * Get PWA installation state
   */
  public getInstallationState(): PWAInstallationState {
    return {
      isInstallable: !!this.installPromptEvent,
      isInstalled: this.isAppInstalled(),
      canPrompt: !!this.installPromptEvent,
      promptEvent: this.installPromptEvent
    };
  }

  /**
   * Show PWA installation prompt
   */
  public async showInstallPrompt(): Promise<{ outcome: 'accepted' | 'dismissed' }> {
    if (!this.installPromptEvent) {
      throw new Error('PWA install prompt not available');
    }

    try {
      // Show the install prompt
      await this.installPromptEvent.prompt();
      
      // Wait for user choice
      const choiceResult = await this.installPromptEvent.userChoice;
      
      logger.info('PWA install prompt completed for Portuguese-speaking community', {
        outcome: choiceResult.outcome,
        area: 'mobile',
        culturalContext: 'lusophone',
        action: 'install_prompt_result'
      });
      
      // Clear the prompt event
      this.installPromptEvent = null;
      
      return choiceResult;
    } catch (error) {
      logger.error('PWA install prompt failed for Portuguese-speaking community', error, {
        area: 'mobile',
        culturalContext: 'lusophone',
        action: 'install_prompt_failed'
      });
      throw error;
    }
  }

  /**
   * Request notification permission for Portuguese cultural events
   */
  public async requestNotificationPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      throw new Error('Notifications not supported');
    }

    try {
      this.notificationPermission = await Notification.requestPermission();
      logger.info('Notification permission updated for Portuguese-speaking community PWA', {
        permission: this.notificationPermission,
        area: 'mobile',
        culturalContext: 'lusophone',
        action: 'notification_permission_updated'
      });
      
      if (this.notificationPermission === 'granted') {
        await this.subscribeToPortuguesePushNotifications();
      }
      
      return this.notificationPermission;
    } catch (error) {
      logger.error('Notification permission request failed for Portuguese-speaking community PWA', error, {
        area: 'mobile',
        culturalContext: 'lusophone',
        action: 'notification_permission_request_failed'
      });
      throw error;
    }
  }

  /**
   * Subscribe to push notifications for Portuguese cultural events
   */
  private async subscribeToPortuguesePushNotifications(): Promise<void> {
    if (!this.isServiceWorkerReady) return;

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''
        )
      });

      // Send subscription to server for Portuguese community notifications
      await this.sendSubscriptionToServer(subscription);
      
      logger.info('Subscribed to Portuguese cultural notifications via PWA', {
        area: 'mobile',
        culturalContext: 'portuguese',
        action: 'push_subscription_successful'
      });
    } catch (error) {
      logger.error('Push subscription failed for Portuguese-speaking community PWA', error, {
        area: 'mobile',
        culturalContext: 'lusophone',
        action: 'push_subscription_failed'
      });
    }
  }

  /**
   * Cache Portuguese cultural content for offline access
   */
  private async cachePortugueseCulturalContent(): Promise<void> {
    if (!this.isServiceWorkerReady) return;

    try {
      const culturalUrls = PWA_ENHANCEMENT_CONFIG.caching.culturalContent;
      const essentialPages = PWA_ENHANCEMENT_CONFIG.caching.essentialPages;
      
      // Send message to service worker to cache cultural content
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'CACHE_PORTUGUESE_CONTENT',
          urls: [...culturalUrls, ...essentialPages]
        });
      }
      
      logger.info('Portuguese cultural content caching initiated via PWA', {
        area: 'mobile',
        culturalContext: 'portuguese',
        action: 'cultural_content_caching_initiated'
      });
    } catch (error) {
      logger.error('Cultural content caching failed for Portuguese-speaking community PWA', error, {
        area: 'mobile',
        culturalContext: 'portuguese',
        action: 'cultural_content_caching_failed'
      });
    }
  }

  /**
   * Check if app is installed (running in standalone mode)
   */
  public isAppInstalled(): boolean {
    if (typeof window === 'undefined') return false;

    // Check if running in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    
    // Check for iOS Safari standalone mode
    const isIOSStandalone = (window.navigator as any).standalone === true;
    
    return isStandalone || isIOSStandalone;
  }

  /**
   * Get offline status and cached content availability
   */
  public async getOfflineStatus(): Promise<{
    isOnline: boolean;
    hasCachedContent: boolean;
    cachedPages: string[];
  }> {
    const isOnline = navigator.onLine;
    let hasCachedContent = false;
    let cachedPages: string[] = [];

    try {
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        if (cacheNames.length > 0) {
          hasCachedContent = true;
          
          // Get cached Portuguese cultural pages
          for (const cacheName of cacheNames) {
            const cache = await caches.open(cacheName);
            const requests = await cache.keys();
            cachedPages.push(...requests.map(req => req.url));
          }
        }
      }
    } catch (error) {
      logger.error('Failed to check PWA offline status for Portuguese-speaking community', error, {
        area: 'mobile',
        culturalContext: 'lusophone',
        action: 'offline_status_check_failed'
      });
    }

    return {
      isOnline,
      hasCachedContent,
      cachedPages
    };
  }

  /**
   * Handle service worker messages
   */
  private handleServiceWorkerMessage(event: MessageEvent): void {
    const { data } = event;
    
    if (data.type === 'PORTUGUESE_CONTENT_CACHED') {
      logger.info('Portuguese cultural content cached successfully via PWA', {
        area: 'mobile',
        culturalContext: 'portuguese',
        action: 'cultural_content_cached'
      });
      this.dispatchContentCached();
    }
    
    if (data.type === 'CULTURAL_EVENT_NOTIFICATION') {
      logger.info('Portuguese cultural event notification received via PWA', {
        payload: data.payload,
        area: 'mobile',
        culturalContext: 'portuguese',
        action: 'cultural_event_notification_received'
      });
    }
  }

  /**
   * Send push subscription to server
   */
  private async sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
    try {
      const response = await fetch('/api/push-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription,
          interests: ['portuguese-culture', 'lusophone-events', 'fado-nights', 'santos-populares']
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send subscription to server');
      }
    } catch (error) {
      logger.error('Failed to send push subscription to server for Portuguese-speaking community', error, {
        area: 'mobile',
        culturalContext: 'lusophone',
        action: 'subscription_server_send_failed'
      });
    }
  }

  /**
   * Notify about PWA update availability
   */
  private notifyUpdate(): void {
    logger.info('PWA update available for Portuguese-speaking community platform', {
      area: 'mobile',
      culturalContext: 'lusophone',
      action: 'pwa_update_available'
    });
    
    // Dispatch custom event for app to handle
    window.dispatchEvent(new CustomEvent('pwa-update-available', {
      detail: { message: 'A new version of LusoTown is available' }
    }));
  }

  /**
   * Dispatch install available event
   */
  private dispatchInstallAvailable(): void {
    window.dispatchEvent(new CustomEvent('pwa-install-available', {
      detail: { canInstall: true }
    }));
  }

  /**
   * Dispatch app installed event
   */
  private dispatchAppInstalled(): void {
    window.dispatchEvent(new CustomEvent('pwa-app-installed', {
      detail: { installed: true }
    }));
  }

  /**
   * Dispatch content cached event
   */
  private dispatchContentCached(): void {
    window.dispatchEvent(new CustomEvent('pwa-content-cached', {
      detail: { cached: true }
    }));
  }

  /**
   * Convert VAPID key to Uint8Array
   */
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    
    return outputArray;
  }
}

// Utility functions for easy access
export const pwaHelper = PWAHelper.getInstance();

export const initializePWA = async (): Promise<void> => {
  return await pwaHelper.initialize();
};

export const getInstallationState = (): PWAInstallationState => {
  return pwaHelper.getInstallationState();
};

export const showInstallPrompt = async (): Promise<{ outcome: 'accepted' | 'dismissed' }> => {
  return await pwaHelper.showInstallPrompt();
};

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  return await pwaHelper.requestNotificationPermission();
};

export const isAppInstalled = (): boolean => {
  return pwaHelper.isAppInstalled();
};

export const getOfflineStatus = async () => {
  return await pwaHelper.getOfflineStatus();
};

export default PWAHelper;