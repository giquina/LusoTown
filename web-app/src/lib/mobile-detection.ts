/**
 * Mobile Device Detection and App Installation Detection
 * 
 * Comprehensive mobile device detection system for LusoTown's Portuguese-speaking community,
 * including app installation detection, deep link testing, and analytics tracking.
 */

import { DEVICE_DETECTION_CONFIG, MOBILE_APP_CONFIG } from '@/config/mobile-app';

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  userAgent: string;
  viewport: {
    width: number;
    height: number;
  };
  touchSupport: boolean;
  appInstalled?: boolean;
  deepLinkSupport?: boolean;
}

export interface AppInstallationStatus {
  isInstalled: boolean;
  platform: 'ios' | 'android' | 'unknown';
  canInstallPWA: boolean;
  installPromptAvailable: boolean;
  lastChecked: number;
}

/**
 * Mobile Device Detection Class
 * Provides comprehensive device detection for Portuguese-speaking community members
 */
export class MobileDeviceDetector {
  private static instance: MobileDeviceDetector;
  private deviceInfo: DeviceInfo | null = null;
  private installationStatus: AppInstallationStatus | null = null;

  private constructor() {}

  public static getInstance(): MobileDeviceDetector {
    if (!MobileDeviceDetector.instance) {
      MobileDeviceDetector.instance = new MobileDeviceDetector();
    }
    return MobileDeviceDetector.instance;
  }

  /**
   * Get comprehensive device information
   */
  public getDeviceInfo(): DeviceInfo {
    if (typeof window === 'undefined') {
      // Server-side rendering fallback
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isIOS: false,
        isAndroid: false,
        userAgent: '',
        viewport: { width: 1024, height: 768 },
        touchSupport: false
      };
    }

    if (this.deviceInfo) {
      return this.deviceInfo;
    }

    const userAgent = navigator.userAgent;
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Detect device types using user agent patterns
    const isIOS = this.matchesAnyPattern(userAgent, DEVICE_DETECTION_CONFIG.userAgentPatterns.ios);
    const isAndroid = this.matchesAnyPattern(userAgent, DEVICE_DETECTION_CONFIG.userAgentPatterns.android);
    const isMobileUA = this.matchesAnyPattern(userAgent, DEVICE_DETECTION_CONFIG.userAgentPatterns.mobile);
    const isTabletUA = this.matchesAnyPattern(userAgent, DEVICE_DETECTION_CONFIG.userAgentPatterns.tablet);

    // Viewport-based detection for more accuracy
    const isMobileViewport = viewport.width < DEVICE_DETECTION_CONFIG.viewportBreakpoints.mobile;
    const isTabletViewport = viewport.width >= DEVICE_DETECTION_CONFIG.viewportBreakpoints.mobile && 
                           viewport.width < DEVICE_DETECTION_CONFIG.viewportBreakpoints.desktop;

    // Combine user agent and viewport detection
    const isMobile = (isMobileUA || isMobileViewport) && !isTabletUA;
    const isTablet = isTabletUA || (isTabletViewport && !isMobileUA);
    const isDesktop = !isMobile && !isTablet;

    // Touch support detection
    const touchSupport = 'ontouchstart' in window || 
                        navigator.maxTouchPoints > 0 || 
                        (navigator as any).msMaxTouchPoints > 0;

    this.deviceInfo = {
      isMobile,
      isTablet,
      isDesktop,
      isIOS,
      isAndroid,
      userAgent,
      viewport,
      touchSupport
    };

    return this.deviceInfo;
  }

  /**
   * Check if native app is installed using deep link testing
   */
  public async checkAppInstallation(): Promise<AppInstallationStatus> {
    if (typeof window === 'undefined') {
      return {
        isInstalled: false,
        platform: 'unknown',
        canInstallPWA: false,
        installPromptAvailable: false,
        lastChecked: Date.now()
      };
    }

    const deviceInfo = this.getDeviceInfo();
    const platform = deviceInfo.isIOS ? 'ios' : deviceInfo.isAndroid ? 'android' : 'unknown';

    // Check if we've recently tested (cache for 5 minutes)
    if (this.installationStatus && 
        Date.now() - this.installationStatus.lastChecked < 300000) {
      return this.installationStatus;
    }

    let isInstalled = false;

    try {
      // Test deep link support
      if (platform === 'ios') {
        isInstalled = await this.testIOSDeepLink();
      } else if (platform === 'android') {
        isInstalled = await this.testAndroidDeepLink();
      }
    } catch (error) {
      console.log('Deep link test failed:', error);
      isInstalled = false;
    }

    // Check PWA installation capability
    const canInstallPWA = this.canInstallPWA();
    const installPromptAvailable = (window as any).deferredPrompt !== undefined;

    this.installationStatus = {
      isInstalled,
      platform,
      canInstallPWA,
      installPromptAvailable,
      lastChecked: Date.now()
    };

    return this.installationStatus;
  }

  /**
   * Test iOS deep link support
   */
  private async testIOSDeepLink(): Promise<boolean> {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => resolve(false), 2000);
      
      const deepLinkUrl = `${MOBILE_APP_CONFIG.deepLink.scheme}://open?utm_source=web_app_detection`;
      
      // Try to open the deep link
      window.location.href = deepLinkUrl;
      
      // If we can navigate back quickly, the app likely isn't installed
      const startTime = Date.now();
      const checkFocus = () => {
        if (Date.now() - startTime > 1500) {
          clearTimeout(timeout);
          resolve(true); // App likely opened
        } else {
          setTimeout(checkFocus, 500);
        }
      };
      
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          clearTimeout(timeout);
          resolve(true); // App opened, page became hidden
        }
      });
      
      checkFocus();
    });
  }

  /**
   * Test Android deep link support
   */
  private async testAndroidDeepLink(): Promise<boolean> {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => resolve(false), 2000);
      
      const intentUrl = `intent://${MOBILE_APP_CONFIG.deepLink.scheme}://open#Intent;scheme=${MOBILE_APP_CONFIG.deepLink.scheme};package=${MOBILE_APP_CONFIG.stores.android.id};end`;
      
      try {
        window.location.href = intentUrl;
        
        // Android intent URLs will fail if app isn't installed
        setTimeout(() => {
          clearTimeout(timeout);
          resolve(true);
        }, 1000);
        
      } catch (error) {
        clearTimeout(timeout);
        resolve(false);
      }
    });
  }

  /**
   * Check if PWA can be installed
   */
  private canInstallPWA(): boolean {
    if (typeof window === 'undefined') return false;
    
    // Check for beforeinstallprompt event support
    if ('serviceWorker' in navigator && (window as any).beforeinstallprompt !== undefined) {
      return true;
    }
    
    // Check for iOS Safari PWA support
    const deviceInfo = this.getDeviceInfo();
    if (deviceInfo.isIOS && 'standalone' in (navigator as any)) {
      return true;
    }
    
    return false;
  }

  /**
   * Track user's choice for app download
   */
  public trackDownloadChoice(choice: 'download_app' | 'continue_web' | 'install_pwa', platform?: string): void {
    const deviceInfo = this.getDeviceInfo();
    
    // Store choice in localStorage for returning user logic
    const choiceData = {
      choice,
      platform: platform || (deviceInfo.isIOS ? 'ios' : deviceInfo.isAndroid ? 'android' : 'web'),
      timestamp: Date.now(),
      userAgent: deviceInfo.userAgent,
      viewport: deviceInfo.viewport
    };
    
    try {
      localStorage.setItem('lusotown_app_choice', JSON.stringify(choiceData));
      
      // Send analytics event (if analytics is configured)
      this.sendAnalyticsEvent('app_download_choice', choiceData);
    } catch (error) {
      console.warn('Could not store app choice:', error);
    }
  }

  /**
   * Check if user has previously made a download choice
   */
  public getPreviousDownloadChoice(): any | null {
    try {
      const stored = localStorage.getItem('lusotown_app_choice');
      if (stored) {
        const choice = JSON.parse(stored);
        // Check if choice is less than 7 days old
        if (Date.now() - choice.timestamp < 7 * 24 * 60 * 60 * 1000) {
          return choice;
        }
      }
    } catch (error) {
      console.warn('Could not retrieve app choice:', error);
    }
    return null;
  }

  /**
   * Should show app download prompt
   */
  public shouldShowDownloadPrompt(): boolean {
    const deviceInfo = this.getDeviceInfo();
    const previousChoice = this.getPreviousDownloadChoice();
    
    // Don't show on desktop
    if (deviceInfo.isDesktop) return false;
    
    // Don't show if user recently declined
    if (previousChoice && previousChoice.choice === 'continue_web') {
      return false;
    }
    
    // Don't show if user recently downloaded
    if (previousChoice && previousChoice.choice === 'download_app') {
      return false;
    }
    
    return true;
  }

  /**
   * Get appropriate app store URL for the device
   */
  public getAppStoreUrl(): string {
    const deviceInfo = this.getDeviceInfo();
    
    if (deviceInfo.isIOS) {
      return MOBILE_APP_CONFIG.stores.ios.url;
    } else if (deviceInfo.isAndroid) {
      return MOBILE_APP_CONFIG.stores.android.url;
    }
    
    // Default to Play Store for unknown mobile devices
    return MOBILE_APP_CONFIG.stores.android.url;
  }

  /**
   * Get appropriate app store scheme URL for native opening
   */
  public getAppStoreSchemeUrl(): string {
    const deviceInfo = this.getDeviceInfo();
    
    if (deviceInfo.isIOS) {
      return MOBILE_APP_CONFIG.stores.ios.scheme;
    } else if (deviceInfo.isAndroid) {
      return MOBILE_APP_CONFIG.stores.android.scheme;
    }
    
    return MOBILE_APP_CONFIG.stores.android.scheme;
  }

  /**
   * Send analytics event for mobile app interactions
   */
  private sendAnalyticsEvent(eventName: string, data: any): void {
    // Placeholder for analytics implementation
    // This would integrate with your analytics service (Google Analytics, Mixpanel, etc.)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        event_category: 'mobile_app',
        event_label: 'portuguese_community',
        custom_parameters: data
      });
    }
    
    console.log(`Analytics: ${eventName}`, data);
  }

  /**
   * Helper method to test user agent patterns
   */
  private matchesAnyPattern(userAgent: string, patterns: RegExp[]): boolean {
    return patterns.some(pattern => pattern.test(userAgent));
  }

  /**
   * Reset cached data (useful for testing)
   */
  public resetCache(): void {
    this.deviceInfo = null;
    this.installationStatus = null;
  }
}

// Utility functions for easy access
export const mobileDetector = MobileDeviceDetector.getInstance();

export const getDeviceInfo = (): DeviceInfo => {
  return mobileDetector.getDeviceInfo();
};

export const checkAppInstallation = async (): Promise<AppInstallationStatus> => {
  return await mobileDetector.checkAppInstallation();
};

export const shouldShowDownloadPrompt = (): boolean => {
  return mobileDetector.shouldShowDownloadPrompt();
};

export const getAppStoreUrl = (): string => {
  return mobileDetector.getAppStoreUrl();
};

export const trackDownloadChoice = (choice: 'download_app' | 'continue_web' | 'install_pwa', platform?: string): void => {
  return mobileDetector.trackDownloadChoice(choice, platform);
};

export default MobileDeviceDetector;