"use client";

import React, { useEffect, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useHeritage } from '@/context/HeritageContext';
import PWAInstaller, { usePWAStatus } from './PWAInstaller';
import EnhancedMobileGestures from './EnhancedMobileGestures';
import { PremiumMobileNavigation } from './PremiumMobileNavigation';

interface MobilePWAWrapperProps {
  children: ReactNode;
  enablePWAInstaller?: boolean;
  enableMobileGestures?: boolean;
  enablePortugueseCulturalFeatures?: boolean;
  showMobileNavigation?: boolean;
  className?: string;
}

interface NetworkInfo {
  effectiveType: string;
  saveData: boolean;
  downlink: number;
}

interface DeviceMemory {
  deviceMemory: number;
}

export function MobilePWAWrapper({
  children,
  enablePWAInstaller = true,
  enableMobileGestures = true,
  enablePortugueseCulturalFeatures = true,
  showMobileNavigation = true,
  className = ''
}: MobilePWAWrapperProps) {
  const pathname = usePathname();
  const { language } = useLanguage();
  const { colors } = useHeritage();
  const { isInstalled, isOnline, updateAvailable, updateServiceWorker } = usePWAStatus();
  
  const [isMobile, setIsMobile] = useState(false);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [deviceCapabilities, setDeviceCapabilities] = useState({
    memory: 4,
    cores: 2,
    isLowEnd: false
  });
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);

  // Detect mobile and device capabilities
  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent;
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      setIsMobile(mobile);

      // Get network information
      const connection = (navigator as any).connection;
      if (connection) {
        setNetworkInfo({
          effectiveType: connection.effectiveType || '4g',
          saveData: connection.saveData || false,
          downlink: connection.downlink || 10
        });
      }

      // Get device memory
      const deviceMemory = (navigator as any).deviceMemory || 4;
      const hardwareConcurrency = navigator.hardwareConcurrency || 2;
      
      setDeviceCapabilities({
        memory: deviceMemory,
        cores: hardwareConcurrency,
        isLowEnd: deviceMemory < 4 || hardwareConcurrency < 4
      });
    };

    detectDevice();
  }, []);

  // Handle service worker update
  useEffect(() => {
    if (updateAvailable) {
      setShowUpdatePrompt(true);
    }
  }, [updateAvailable]);

  // Mobile gesture handlers for Lusophone cultural navigation
  const handleSwipe = (gesture: any) => {
    if (!enableMobileGestures) return;

    // Lusophone cultural navigation patterns
    switch (gesture.direction) {
      case 'right':
        // Navigate back (common mobile pattern)
        if (pathname !== '/') {
          window.history.back();
        }
        break;
      case 'left':
        // Could implement forward navigation or contextual actions
        break;
      case 'up':
        // Refresh or load more content
        if (gesture.velocity > 1) {
          window.location.reload();
        }
        break;
      case 'down':
        // Could implement pull-to-refresh
        break;
    }
  };

  const handleLongPress = () => {
    if (!enableMobileGestures) return;
    
    // Show contextual menu or quick actions
    if ('navigator' in window && 'vibrate' in navigator) {
      navigator.vibrate([50, 50, 50]);
    }
  };

  const handleDoubleTap = () => {
    if (!enableMobileGestures) return;
    
    // Quick action for Lusophone community (e.g., bookmark/favorite)
    if ('navigator' in window && 'vibrate' in navigator) {
      navigator.vibrate(100);
    }
  };

  // Install PWA prompt conditions
  const shouldShowPWAInstaller = enablePWAInstaller && 
    isMobile && 
    !isInstalled && 
    isOnline &&
    ['/events', '/community', '/'].includes(pathname);

  return (
    <div className={`mobile-pwa-wrapper min-h-screen ${className}`}>
      {/* Network Status Indicator */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-0 left-0 right-0 bg-orange-500 text-white text-center py-2 text-sm font-medium z-50"
          >
            {language === 'pt' 
              ? '🔄 Modo offline - Algumas funcionalidades podem estar limitadas'
              : '🔄 Offline mode - Some features may be limited'
            }
          </motion.div>
        )}
      </AnimatePresence>

      {/* Update Available Prompt */}
      <AnimatePresence>
        {showUpdatePrompt && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 bg-blue-600 text-white text-center py-3 px-4 z-50"
          >
            <div className="flex items-center justify-between max-w-md mx-auto">
              <span className="text-sm">
                {language === 'pt' 
                  ? '🚀 Nova atualização disponível!'
                  : '🚀 New update available!'
                }
              </span>
              <div className="space-x-2">
                <button
                  onClick={updateServiceWorker}
                  className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm transition-colors"
                >
                  {language === 'pt' ? 'Atualizar' : 'Update'}
                </button>
                <button
                  onClick={() => setShowUpdatePrompt(false)}
                  className="text-white/80 hover:text-white text-sm"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Mobile Gestures Wrapper */}
      {enableMobileGestures && isMobile ? (
        <EnhancedMobileGestures
          onSwipe={handleSwipe}
          onLongPress={handleLongPress}
          onDoubleTap={handleDoubleTap}
          enablePortugueseGestures={enablePortugueseCulturalFeatures}
          enableHapticFeedback={true}
          enableVoiceAnnouncements={false} // Disabled by default to not be intrusive
          showSwipeIndicators={deviceCapabilities.isLowEnd ? false : true}
          showTouchRipples={deviceCapabilities.isLowEnd ? false : true}
          className="min-h-screen"
        >
          {children}
        </EnhancedMobileGestures>
      ) : (
        children
      )}

      {/* PWA Installer */}
      {shouldShowPWAInstaller && (
        <PWAInstaller
          style="floating"
          position="bottom"
          autoShow={true}
          showAfterDelay={5000}
          showOnRoutes={['/events', '/community', '/']}
        />
      )}

      {/* Mobile Navigation */}
      {showMobileNavigation && isMobile && (
        <PremiumMobileNavigation
          style={deviceCapabilities.isLowEnd ? 'standard' : 'luxury'}
          notifications={0}
        />
      )}

      {/* Lusophone Cultural Enhancements */}
      {enablePortugueseCulturalFeatures && (
        <>
          {/* Lusophone Heritage CSS Variables */}
          <style jsx global>{`
            :root {
              --portuguese-red: #C5282F;
              --portuguese-green: #00A859;
              --portuguese-gold: #FFD700;
              --heritage-gradient: linear-gradient(135deg, #C5282F 0%, #FFD700 50%, #00A859 100%);
              --mobile-safe-area-top: env(safe-area-inset-top);
              --mobile-safe-area-bottom: env(safe-area-inset-bottom);
              --mobile-safe-area-left: env(safe-area-inset-left);
              --mobile-safe-area-right: env(safe-area-inset-right);
            }

            /* Mobile-first optimizations for Lusophone content */
            @media (max-width: 768px) {
              /* Lusophone text optimization */
              .portuguese-text {
                hyphens: auto;
                word-break: break-word;
                line-height: 1.6;
              }

              /* Touch target optimization */
              button, a[href], input, select, textarea {
                min-height: 44px;
                min-width: 44px;
                touch-action: manipulation;
              }

              /* Lusophone cultural spacing */
              .cultural-content {
                padding-left: max(16px, env(safe-area-inset-left));
                padding-right: max(16px, env(safe-area-inset-right));
              }

              /* Low-end device optimizations */
              .low-end-device * {
                will-change: auto !important;
                transform: translateZ(0);
              }

              /* Data saver mode */
              @media (prefers-reduced-data: reduce) {
                .background-image {
                  background-image: none !important;
                }
                
                video {
                  display: none;
                }
                
                .decorative-animation {
                  animation: none !important;
                }
              }

              /* Reduced motion support */
              @media (prefers-reduced-motion: reduce) {
                * {
                  animation-duration: 0.01ms !important;
                  animation-iteration-count: 1 !important;
                  transition-duration: 0.01ms !important;
                }
              }

              /* High contrast mode for Portuguese heritage colors */
              @media (prefers-contrast: high) {
                .heritage-primary {
                  background-color: #000000 !important;
                  color: #ffffff !important;
                  border: 2px solid #ffffff !important;
                }
              }
            }

            /* PWA-specific styling */
            @media (display-mode: standalone) {
              /* Remove default browser chrome styling */
              body {
                padding-top: env(safe-area-inset-top);
                padding-bottom: env(safe-area-inset-bottom);
              }
              
              /* Enhanced Lusophone cultural theming for PWA */
              .pwa-header {
                background: var(--heritage-gradient);
                padding-top: calc(env(safe-area-inset-top) + 12px);
              }
            }

            /* Network-aware styling */
            @media (max-width: 768px) {
              .slow-connection .hero-background {
                background: linear-gradient(135deg, #C5282F 0%, #00A859 100%) !important;
              }
              
              .slow-connection .animation-heavy {
                animation: none !important;
              }
            }
          `}</style>
        </>
      )}

      {/* Performance monitoring for mobile */}
      {process.env.NODE_ENV === 'development' && isMobile && (
        <div className="fixed bottom-20 left-4 bg-black/80 text-white text-xs p-2 rounded z-50 font-mono">
          <div>📱 Mobile: {isMobile ? 'Yes' : 'No'}</div>
          <div>🏠 PWA: {isInstalled ? 'Yes' : 'No'}</div>
          <div>📶 Online: {isOnline ? 'Yes' : 'No'}</div>
          {networkInfo && (
            <>
              <div>🌐 Network: {networkInfo.effectiveType}</div>
              <div>💾 Data Saver: {networkInfo.saveData ? 'Yes' : 'No'}</div>
            </>
          )}
          <div>🧠 Memory: {deviceCapabilities.memory}GB</div>
          <div>⚡ Low-end: {deviceCapabilities.isLowEnd ? 'Yes' : 'No'}</div>
        </div>
      )}
    </div>
  );
}

export default MobilePWAWrapper;