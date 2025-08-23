"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DevicePhoneMobileIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
  CheckCircleIcon,
  ShareIcon,
  HomeIcon,
  SparklesIcon,
  GlobeEuropeAfricaIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import { useHeritage } from '@/context/HeritageContext';

// PWA Install Event interface
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAInstallerProps {
  showOnlyIfInstallable?: boolean;
  className?: string;
  style?: 'banner' | 'modal' | 'floating' | 'inline';
  position?: 'top' | 'bottom' | 'center';
  autoShow?: boolean;
  showAfterDelay?: number;
  showOnRoutes?: string[];
}

export function PWAInstaller({
  showOnlyIfInstallable = true,
  className = '',
  style = 'floating',
  position = 'bottom',
  autoShow = true,
  showAfterDelay = 3000,
  showOnRoutes = ['/']
}: PWAInstallerProps) {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [showInstaller, setShowInstaller] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [deviceInfo, setDeviceInfo] = useState({
    isIOS: false,
    isMobile: false,
    isStandalone: false,
    browser: 'unknown'
  });
  
  const { language, t } = useLanguage();
  const { colors } = useHeritage();
  const installPromptRef = useRef<BeforeInstallPromptEvent | null>(null);

  // Detect device and PWA capabilities
  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent;
      const isIOS = /iPad|iPhone|iPod/.test(userAgent);
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                          (window.navigator as any).standalone === true;
      
      let browser = 'unknown';
      if (userAgent.includes('Chrome')) browser = 'chrome';
      else if (userAgent.includes('Firefox')) browser = 'firefox';
      else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) browser = 'safari';
      else if (userAgent.includes('Edge')) browser = 'edge';

      setDeviceInfo({ isIOS, isMobile, isStandalone, browser });
      setIsInstalled(isStandalone);
    };

    detectDevice();
  }, []);

  // Listen for PWA install events
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const installEvent = e as BeforeInstallPromptEvent;
      setInstallPrompt(installEvent);
      installPromptRef.current = installEvent;
      setIsInstallable(true);

      // Auto-show installer after delay
      if (autoShow) {
        setTimeout(() => {
          setShowInstaller(true);
        }, showAfterDelay);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setShowInstaller(false);
      
      // Show success notification
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification('LusoTown Instalado!', {
            body: language === 'pt' 
              ? 'A aplicação foi instalada com sucesso. Bem-vindo à comunidade de falantes de português!'
              : 'App installed successfully. Welcome to the Portuguese-speaking community!',
            icon: '/icons/icon-192x192.png',
            badge: '/icons/badge-72x72.png',
            tag: 'pwa-installed',
            requireInteraction: true
          });
        });
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [autoShow, showAfterDelay, language]);

  // Check if current route should show installer
  useEffect(() => {
    if (showOnRoutes.length > 0) {
      const currentPath = window.location.pathname;
      const shouldShow = showOnRoutes.some(route => 
        route === currentPath || currentPath.startsWith(route)
      );
      
      if (!shouldShow) {
        setShowInstaller(false);
      }
    }
  }, [showOnRoutes]);

  const installPWA = async () => {
    if (!installPrompt) return;

    setIsInstalling(true);
    
    try {
      await installPrompt.prompt();
      const choiceResult = await installPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
        setShowInstaller(false);
        
        // Track installation event
        if ('gtag' in window) {
          (window as any).gtag('event', 'pwa_install', {
            event_category: 'engagement',
            event_label: 'lusotown_pwa_install',
            value: 1
          });
        }
      }
    } catch (error) {
      console.error('PWA installation failed:', error);
    } finally {
      setIsInstalling(false);
      setInstallPrompt(null);
      installPromptRef.current = null;
    }
  };

  const dismissInstaller = () => {
    setShowInstaller(false);
    
    // Don't show again for this session
    sessionStorage.setItem('lusotown_pwa_dismissed', 'true');
    
    // Track dismissal
    if ('gtag' in window) {
      (window as any).gtag('event', 'pwa_install_dismissed', {
        event_category: 'engagement',
        event_label: 'lusotown_pwa_dismissed'
      });
    }
  };

  // Don't show if dismissed this session
  useEffect(() => {
    const dismissed = sessionStorage.getItem('lusotown_pwa_dismissed');
    if (dismissed && showOnlyIfInstallable) {
      setShowInstaller(false);
    }
  }, [showOnlyIfInstallable]);

  // iOS-specific install instructions
  const IOSInstallInstructions = () => (
    <div className="text-sm space-y-3">
      <div className="flex items-center space-x-2">
        <ShareIcon className="w-5 h-5 text-blue-600" />
        <span>
          {language === 'pt' 
            ? 'Toca no ícone de partilha'
            : 'Tap the share icon'
          }
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <HomeIcon className="w-5 h-5 text-blue-600" />
        <span>
          {language === 'pt' 
            ? 'Seleciona "Adicionar ao Ecrã Principal"'
            : 'Select "Add to Home Screen"'
          }
        </span>
      </div>
      <div className="text-xs text-gray-600">
        {language === 'pt' 
          ? 'A LusoTown aparecerá como uma aplicação no teu dispositivo'
          : 'LusoTown will appear as an app on your device'
        }
      </div>
    </div>
  );

  // Don't render if conditions aren't met
  if (isInstalled || (!isInstallable && showOnlyIfInstallable) || !showInstaller) {
    return null;
  }

  const getStyleClasses = () => {
    const baseClasses = 'bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden';
    
    switch (style) {
      case 'banner':
        return `${baseClasses} w-full max-w-none`;
      case 'modal':
        return `${baseClasses} w-full max-w-md mx-auto`;
      case 'floating':
        return `${baseClasses} fixed z-50 m-4 max-w-sm ${getPositionClasses()}`;
      case 'inline':
        return `${baseClasses} w-full max-w-md`;
      default:
        return baseClasses;
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'top-0 left-0 right-0';
      case 'bottom':
        return 'bottom-0 left-0 right-0';
      case 'center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      default:
        return 'bottom-4 right-4';
    }
  };

  return (
    <AnimatePresence>
      {showInstaller && (
        <motion.div
          className={`${getStyleClasses()} ${className}`}
          initial={{ 
            opacity: 0, 
            scale: style === 'floating' ? 0.8 : 1,
            y: style === 'banner' ? -100 : style === 'floating' && position === 'bottom' ? 100 : 0 
          }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0 
          }}
          exit={{ 
            opacity: 0, 
            scale: style === 'floating' ? 0.8 : 1,
            y: style === 'banner' ? -100 : style === 'floating' && position === 'bottom' ? 100 : 0 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 25 
          }}
          role="dialog"
          aria-labelledby="pwa-installer-title"
          aria-describedby="pwa-installer-description"
        >
          {/* Portuguese Heritage Accent */}
          <div 
            className="h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-green-600"
            style={{
              background: `linear-gradient(90deg, ${colors.action}, #FFD700, ${colors.secondary})`
            }}
          />

          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-green-600 rounded-2xl flex items-center justify-center">
                    <GlobeEuropeAfricaIcon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div>
                  <h3 id="pwa-installer-title" className="text-lg font-bold text-gray-900">
                    {language === 'pt' ? 'Instalar LusoTown' : 'Install LusoTown'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'pt' 
                      ? 'Comunidade de falantes de português'
                      : 'Portuguese-speaking community'
                    }
                  </p>
                </div>
              </div>

              {style !== 'banner' && (
                <button
                  onClick={dismissInstaller}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={language === 'pt' ? 'Fechar' : 'Close'}
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Description */}
            <div id="pwa-installer-description" className="mb-6">
              <p className="text-sm text-gray-700 mb-3">
                {language === 'pt' 
                  ? 'Instala a aplicação LusoTown para uma experiência mais rápida e acesso offline aos eventos e comunidade.'
                  : 'Install the LusoTown app for a faster experience and offline access to events and community.'
                }
              </p>

              {/* Features */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span>
                    {language === 'pt' ? 'Acesso offline aos eventos' : 'Offline access to events'}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span>
                    {language === 'pt' ? 'Notificações de novos eventos' : 'Notifications for new events'}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  <span>
                    {language === 'pt' ? 'Experiência nativa da aplicação' : 'Native app experience'}
                  </span>
                </div>
              </div>
            </div>

            {/* Install Instructions for iOS */}
            {deviceInfo.isIOS ? (
              <IOSInstallInstructions />
            ) : (
              /* Install Button for Android/Desktop */
              <div className="flex space-x-3">
                <button
                  onClick={installPWA}
                  disabled={isInstalling || !installPrompt}
                  className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-green-600 text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: `linear-gradient(135deg, ${colors.action}, ${colors.secondary})`
                  }}
                >
                  {isInstalling ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>
                        {language === 'pt' ? 'A instalar...' : 'Installing...'}
                      </span>
                    </>
                  ) : (
                    <>
                      <ArrowDownTrayIcon className="w-5 h-5" />
                      <span>
                        {language === 'pt' ? 'Instalar Aplicação' : 'Install App'}
                      </span>
                    </>
                  )}
                </button>

                {style !== 'banner' && (
                  <button
                    onClick={dismissInstaller}
                    className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    {language === 'pt' ? 'Mais tarde' : 'Later'}
                  </button>
                )}
              </div>
            )}

            {/* Device Info for Developers */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <details className="text-xs text-gray-500">
                  <summary className="cursor-pointer">Debug Info</summary>
                  <div className="mt-2 space-y-1">
                    <div>Device: {deviceInfo.isMobile ? 'Mobile' : 'Desktop'}</div>
                    <div>iOS: {deviceInfo.isIOS ? 'Yes' : 'No'}</div>
                    <div>Standalone: {deviceInfo.isStandalone ? 'Yes' : 'No'}</div>
                    <div>Browser: {deviceInfo.browser}</div>
                    <div>Installable: {isInstallable ? 'Yes' : 'No'}</div>
                  </div>
                </details>
              </div>
            )}
          </div>

          {/* Premium Animation Effect */}
          <div className="absolute top-0 left-0 right-0 h-full pointer-events-none overflow-hidden">
            <motion.div
              className="absolute -top-1/2 -left-1/2 w-full h-full opacity-10"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                background: `conic-gradient(from 0deg, ${colors.action}, #FFD700, ${colors.secondary}, ${colors.action})`
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Enhanced PWA Status Hook
export function usePWAStatus() {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    // Check if PWA is installed
    const checkInstallStatus = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                          (window.navigator as any).standalone === true;
      setIsInstalled(isStandalone);
    };

    // Check online status
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    // Listen for install prompt
    const handleBeforeInstallPrompt = () => {
      setIsInstallable(true);
    };

    // Listen for app installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
    };

    // Service worker update detection
    const checkForUpdates = async () => {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        
        if (registration.waiting) {
          setUpdateAvailable(true);
        }
        
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setUpdateAvailable(true);
              }
            });
          }
        });
      }
    };

    checkInstallStatus();
    updateOnlineStatus();
    checkForUpdates();

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const updateServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      }
    }
  };

  return {
    isInstalled,
    isInstallable,
    isOnline,
    updateAvailable,
    updateServiceWorker
  };
}

export default PWAInstaller;