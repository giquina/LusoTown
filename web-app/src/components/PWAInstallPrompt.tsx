/**
 * PWA Installation Prompt Component
 * 
 * Smart installation prompt for LusoTown PWA with Portuguese cultural context,
 * device detection, and optimized user experience for the Portuguese-speaking community.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { XMarkIcon, DevicePhoneMobileIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import { PWAInstallPrompt, getInstallationState, showInstallPrompt, isAppInstalled } from '@/lib/pwa-helper';
import { getDeviceInfo, trackDownloadChoice } from '@/lib/mobile-detection';
import { MOBILE_APP_CONFIG } from '@/config/mobile-app';

interface PWAInstallPromptProps {
  onInstall?: () => void;
  onDismiss?: () => void;
  variant?: 'banner' | 'modal' | 'bottom-sheet';
  showOnlyOnMobile?: boolean;
  culturalTheme?: 'portugal' | 'brazil' | 'palop' | 'mixed';
}

export default function PWAInstallPromptComponent({
  onInstall,
  onDismiss,
  variant = 'bottom-sheet',
  showOnlyOnMobile = true,
  culturalTheme = 'mixed'
}: PWAInstallPromptProps) {
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installationState, setInstallationState] = useState({
    isInstallable: false,
    isInstalled: false,
    canPrompt: false,
    promptEvent: null as PWAInstallPrompt | null
  });
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isIOS: false,
    isAndroid: false,
    platform: 'unknown' as string
  });

  useEffect(() => {
    checkInstallability();
    
    // Listen for PWA events
    window.addEventListener('pwa-install-available', handleInstallAvailable);
    window.addEventListener('pwa-app-installed', handleAppInstalled);
    
    return () => {
      window.removeEventListener('pwa-install-available', handleInstallAvailable);
      window.removeEventListener('pwa-app-installed', handleAppInstalled);
    };
  }, []);

  const checkInstallability = async () => {
    try {
      // Get device information
      const device = getDeviceInfo();
      setDeviceInfo({
        isMobile: device.isMobile,
        isIOS: device.isIOS,
        isAndroid: device.isAndroid,
        platform: device.isIOS ? 'ios' : device.isAndroid ? 'android' : 'web'
      });

      // Check if app is already installed
      if (isAppInstalled()) {
        setIsVisible(false);
        return;
      }

      // Get PWA installation state
      const state = getInstallationState();
      setInstallationState(state);

      // Show prompt if installable and mobile (if configured)
      if (state.isInstallable && (!showOnlyOnMobile || device.isMobile)) {
        // Delay showing prompt by 3 seconds for better UX
        setTimeout(() => {
          setIsVisible(true);
        }, 3000);
      }

    } catch (error) {
      console.error('PWA Install Prompt: Failed to check installability:', error);
    }
  };

  const handleInstallAvailable = () => {
    setInstallationState(prev => ({ ...prev, isInstallable: true }));
    if (!showOnlyOnMobile || deviceInfo.isMobile) {
      setIsVisible(true);
    }
  };

  const handleAppInstalled = () => {
    setIsVisible(false);
    onInstall?.();
  };

  const handleInstallClick = async () => {
    setIsInstalling(true);
    
    try {
      if (installationState.promptEvent) {
        // Use native PWA install prompt
        const result = await showInstallPrompt();
        trackDownloadChoice('install_pwa', deviceInfo.platform);
        
        if (result.outcome === 'accepted') {
          onInstall?.();
        }
      } else {
        // Fallback to manual installation instructions
        showManualInstallInstructions();
      }
    } catch (error) {
      console.error('PWA Install: Installation failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    trackDownloadChoice('continue_web', deviceInfo.platform);
    onDismiss?.();
  };

  const showManualInstallInstructions = () => {
    // Show platform-specific installation instructions
    const instructions = getManualInstallInstructions();
    alert(instructions); // Replace with proper modal in production
  };

  const getManualInstallInstructions = (): string => {
    if (deviceInfo.isIOS) {
      return language === 'pt' 
        ? 'Para instalar LusoTown: 1. Toque no botão Partilhar, 2. Selecione "Adicionar ao Ecrã Principal"'
        : 'To install LusoTown: 1. Tap the Share button, 2. Select "Add to Home Screen"';
    } else if (deviceInfo.isAndroid) {
      return language === 'pt'
        ? 'Para instalar LusoTown: 1. Toque no menu (⋮), 2. Selecione "Adicionar ao ecrã inicial"'
        : 'To install LusoTown: 1. Tap the menu (⋮), 2. Select "Add to home screen"';
    } else {
      return language === 'pt'
        ? 'Para instalar LusoTown como aplicação web, use um navegador compatível como Chrome, Edge ou Firefox'
        : 'To install LusoTown as a web app, use a compatible browser like Chrome, Edge, or Firefox';
    }
  };

  const getCulturalIcon = () => {
    switch (culturalTheme) {
      case 'portugal': return '🇵🇹';
      case 'brazil': return '🇧🇷';
      case 'palop': return '🌍';
      default: return '📱';
    }
  };

  const getCulturalColors = () => {
    switch (culturalTheme) {
      case 'portugal': return 'from-red-600 to-green-600';
      case 'brazil': return 'from-green-500 to-yellow-400';
      case 'palop': return 'from-blue-600 to-red-500';
      default: return 'from-blue-600 to-purple-600';
    }
  };

  if (!isVisible) {
    return null;
  }

  const renderBannerVariant = () => (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r ${getCulturalColors()} text-white p-4 shadow-lg`}>
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getCulturalIcon()}</span>
          <div>
            <h3 className="font-semibold text-sm">
              {t('pwa.install.title')}
            </h3>
            <p className="text-xs opacity-90">
              {t('pwa.install.subtitle')}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleInstallClick}
            disabled={isInstalling}
            className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {isInstalling ? (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                {t('pwa.install.installing')}
              </span>
            ) : (
              t('pwa.install.button')
            )}
          </button>
          <button
            onClick={handleDismiss}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderModalVariant = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="text-center">
          <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${getCulturalColors()} rounded-full flex items-center justify-center text-2xl mb-4`}>
            {getCulturalIcon()}
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {t('pwa.install.modal.title')}
          </h2>
          
          <p className="text-gray-600 mb-6">
            {t('pwa.install.modal.description')}
          </p>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <DevicePhoneMobileIcon className="h-6 w-6 mx-auto text-gray-500 mb-1" />
              <p className="text-xs text-gray-600">{t('pwa.benefits.offline')}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <ArrowDownIcon className="h-6 w-6 mx-auto text-gray-500 mb-1" />
              <p className="text-xs text-gray-600">{t('pwa.benefits.faster')}</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleDismiss}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              {t('pwa.install.later')}
            </button>
            <button
              onClick={handleInstallClick}
              disabled={isInstalling}
              className={`flex-1 py-3 px-4 bg-gradient-to-r ${getCulturalColors()} text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50`}
            >
              {isInstalling ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {t('pwa.install.installing')}
                </span>
              ) : (
                t('pwa.install.button')
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBottomSheetVariant = () => (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="fixed bottom-0 left-0 right-0 pointer-events-auto">
        <div className="bg-white rounded-t-3xl shadow-2xl border-t border-gray-200">
          <div className="p-6">
            {/* Drag handle */}
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
            
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${getCulturalColors()} rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>
                {getCulturalIcon()}
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {t('pwa.install.bottomSheet.title')}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t('pwa.install.bottomSheet.description')}
                </p>
                
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center text-xs text-gray-500">
                    <DevicePhoneMobileIcon className="h-4 w-4 mr-1" />
                    {t('pwa.benefits.homeScreen')}
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center text-xs text-gray-500">
                    <ArrowDownIcon className="h-4 w-4 mr-1" />
                    {t('pwa.benefits.pushNotifications')}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleDismiss}
                    className="flex-1 py-2.5 px-4 border border-gray-300 rounded-xl text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors"
                  >
                    {t('pwa.install.notNow')}
                  </button>
                  <button
                    onClick={handleInstallClick}
                    disabled={isInstalling}
                    className={`flex-1 py-2.5 px-4 bg-gradient-to-r ${getCulturalColors()} text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all disabled:opacity-50`}
                  >
                    {isInstalling ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {t('pwa.install.installing')}
                      </span>
                    ) : (
                      t('pwa.install.install')
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Portuguese cultural footer */}
          <div className={`bg-gradient-to-r ${getCulturalColors()} p-3`}>
            <p className="text-center text-white text-xs opacity-90">
              {t('pwa.install.culturalMessage')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  switch (variant) {
    case 'banner':
      return renderBannerVariant();
    case 'modal':
      return renderModalVariant();
    case 'bottom-sheet':
      return renderBottomSheetVariant();
    default:
      return renderBottomSheetVariant();
  }
}