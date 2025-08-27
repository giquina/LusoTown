"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  getDeviceInfo, 
  checkAppInstallation, 
  shouldShowDownloadPrompt,
  trackDownloadChoice,
  type DeviceInfo,
  type AppInstallationStatus 
} from '@/lib/mobile-detection';
import { MOBILE_APP_CONFIG, LANDING_PAGE_CONFIG } from '@/config/mobile-app';

interface MobileRedirectContextType {
  deviceInfo: DeviceInfo | null;
  installationStatus: AppInstallationStatus | null;
  showDownloadPrompt: boolean;
  showLandingPage: boolean;
  isLoading: boolean;
  dismissPrompt: () => void;
  triggerAppDownload: (platform?: 'ios' | 'android') => void;
  triggerPWAInstall: () => void;
  continuewithWebsite: () => void;
}

const MobileRedirectContext = createContext<MobileRedirectContextType | null>(null);

interface MobileRedirectProviderProps {
  children: React.ReactNode;
  forceShow?: boolean; // For testing purposes
  disabled?: boolean;  // Disable all mobile redirect logic
}

/**
 * MobileRedirectProvider - Manages mobile app transition strategy
 * 
 * Handles device detection, app installation status, download prompts,
 * and A/B testing for the Portuguese-speaking community mobile experience.
 */
export function MobileRedirectProvider({ 
  children, 
  forceShow = false, 
  disabled = false 
}: MobileRedirectProviderProps) {
  const { language } = useLanguage();
  
  // State management
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [installationStatus, setInstallationStatus] = useState<AppInstallationStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDownloadPrompt, setShowDownloadPrompt] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    if (disabled) {
      setIsLoading(false);
      return;
    }

    initializeMobileDetection();
    setupPWAInstallPrompt();
  }, [disabled]);

  /**
   * Initialize mobile device detection and app installation checking
   */
  const initializeMobileDetection = async () => {
    try {
      setIsLoading(true);
      
      // Get device information
      const device = getDeviceInfo();
      setDeviceInfo(device);
      
      // Check if we should show any prompts
      const shouldShow = forceShow || shouldShowDownloadPrompt();
      
      if (shouldShow && (device.isMobile || device.isTablet)) {
        // Check app installation status
        const installation = await checkAppInstallation();
        setInstallationStatus(installation);
        
        // Determine what to show based on installation status and device
        if (!installation.isInstalled) {
          // Decide between download prompt and landing page based on A/B testing
          const variant = selectABTestVariant();
          
          if (variant === 'landing_page' || device.isTablet) {
            setShowLandingPage(true);
          } else {
            setShowDownloadPrompt(true);
          }
        }
      }
      
    } catch (error) {
      console.warn('Mobile detection initialization failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Setup PWA installation prompt handling
   */
  const setupPWAInstallPrompt = () => {
    if (typeof window === 'undefined') return;

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  };

  /**
   * Select A/B testing variant for mobile experience
   */
  const selectABTestVariant = (): 'prompt' | 'landing_page' => {
    if (!MOBILE_APP_CONFIG.testing.enabled) return 'prompt';
    
    // Use user ID or session ID for consistent experience
    // For now, use random selection
    const random = Math.random() * 100;
    let cumulativeWeight = 0;
    
    for (const variant of MOBILE_APP_CONFIG.testing.variants) {
      cumulativeWeight += variant.weight;
      if (random <= cumulativeWeight) {
        return variant.id.includes('landing') ? 'landing_page' : 'prompt';
      }
    }
    
    return 'prompt';
  };

  /**
   * Dismiss the download prompt
   */
  const dismissPrompt = () => {
    setShowDownloadPrompt(false);
    setShowLandingPage(false);
    trackDownloadChoice('continue_web');
  };

  /**
   * Trigger native app download
   */
  const triggerAppDownload = (platform?: 'ios' | 'android') => {
    if (!deviceInfo) return;
    
    const targetPlatform = platform || (deviceInfo.isIOS ? 'ios' : 'android');
    const appStoreUrl = targetPlatform === 'ios' 
      ? MOBILE_APP_CONFIG.stores.ios.url 
      : MOBILE_APP_CONFIG.stores.android.url;
    
    // Track the download attempt
    trackDownloadChoice('download_app', targetPlatform);
    
    // Open app store
    window.open(appStoreUrl, '_blank');
    
    // Dismiss prompts after download attempt
    setShowDownloadPrompt(false);
    setShowLandingPage(false);
  };

  /**
   * Trigger PWA installation
   */
  const triggerPWAInstall = async () => {
    if (!deferredPrompt) return;
    
    try {
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      // Track the choice
      trackDownloadChoice('install_pwa');
      
      if (outcome === 'accepted') {
        console.log('PWA installation accepted');
      } else {
        console.log('PWA installation dismissed');
      }
      
      // Clear the deferredPrompt
      setDeferredPrompt(null);
      setShowDownloadPrompt(false);
      setShowLandingPage(false);
      
    } catch (error) {
      console.warn('PWA installation failed:', error);
    }
  };

  /**
   * Continue with website experience
   */
  const continuewithWebsite = () => {
    dismissPrompt();
  };

  const contextValue: MobileRedirectContextType = {
    deviceInfo,
    installationStatus,
    showDownloadPrompt,
    showLandingPage,
    isLoading,
    dismissPrompt,
    triggerAppDownload,
    triggerPWAInstall,
    continuewithWebsite
  };

  return (
    <MobileRedirectContext.Provider value={contextValue}>
      {children}
    </MobileRedirectContext.Provider>
  );
}

/**
 * Hook to use mobile redirect context
 */
export function useMobileRedirect(): MobileRedirectContextType {
  const context = useContext(MobileRedirectContext);
  if (!context) {
    throw new Error('useMobileRedirect must be used within a MobileRedirectProvider');
  }
  return context;
}

/**
 * Mobile Download Prompt Component
 * Compact prompt that appears for mobile users
 */
export function MobileDownloadPrompt() {
  const { t } = useLanguage();
  const {
    deviceInfo,
    installationStatus,
    showDownloadPrompt,
    dismissPrompt,
    triggerAppDownload,
  triggerPWAInstall
  } = useMobileRedirect();

  if (!showDownloadPrompt || !deviceInfo) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-primary-200 shadow-xl p-4 safe-area-pb">
      <div className="flex items-center gap-3">
        {/* App Icon */}
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
          <span className="text-white text-lg font-bold">LT</span>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900">
            {t('mobile.app.prompt.title', 'Get the LusoTown App')}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-1">
            {t('mobile.app.prompt.subtitle', 'Better experience for Portuguese community')}
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={dismissPrompt}
            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 min-h-[36px]"
          >
            {t('mobile.app.continue_web', 'Not now')}
          </button>
          
          {installationStatus?.canInstallPWA ? (
            <button
              onClick={triggerPWAInstall}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors min-h-[36px]"
            >
              {t('mobile.app.install', 'Install')}
            </button>
          ) : (
            <button
              onClick={() => triggerAppDownload()}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors min-h-[36px]"
            >
              {t('mobile.app.download', 'Get App')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileRedirectProvider;