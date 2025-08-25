"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDownTrayIcon,
  BellIcon,
  ShareIcon,
  PhotoIcon,
  WifiIcon,
  SignalIcon,
  DevicePhoneMobileIcon,
  SparklesIcon,
  CheckCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { BellIcon as BellSolidIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '@/context/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: ReadonlyArray<string>;
  prompt(): Promise<void>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
}

interface PWAFeatures {
  isInstallable: boolean;
  isInstalled: boolean;
  isOnline: boolean;
  notificationsEnabled: boolean;
  supportsSharing: boolean;
  supportsCamera: boolean;
}

interface AdvancedPWAFeaturesProps {
  className?: string;
  showInstallPrompt?: boolean;
  onInstallSuccess?: () => void;
  onNotificationToggle?: (enabled: boolean) => void;
}

export default function AdvancedPWAFeatures({
  className = '',
  showInstallPrompt = true,
  onInstallSuccess,
  onNotificationToggle,
}: AdvancedPWAFeaturesProps) {
  const { language } = useLanguage();
  const isPortuguese = language === 'pt';

  const [pwaFeatures, setPWAFeatures] = useState<PWAFeatures>({
    isInstallable: false,
    isInstalled: false,
    isOnline: navigator.onLine,
    notificationsEnabled: false,
    supportsSharing: false,
    supportsCamera: false,
  });

  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPWAFeatures, setShowPWAFeatures] = useState(false);

  // Check PWA installation status
  useEffect(() => {
    const checkPWAStatus = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isPWA = window.navigator.standalone === true || isStandalone;
      
      setPWAFeatures(prev => ({
        ...prev,
        isInstalled: isPWA,
        supportsSharing: 'share' in navigator,
        supportsCamera: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
      }));
    };

    checkPWAStatus();
    
    // Listen for online/offline status
    const handleOnline = () => setPWAFeatures(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setPWAFeatures(prev => ({ ...prev, isOnline: false }));
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Handle PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const installEvent = e as BeforeInstallPromptEvent;
      setInstallPromptEvent(installEvent);
      setPWAFeatures(prev => ({ ...prev, isInstallable: true }));
      
      if (showInstallPrompt) {
        setShowInstallBanner(true);
      }
    };

    const handleAppInstalled = () => {
      setPWAFeatures(prev => ({ ...prev, isInstalled: true, isInstallable: false }));
      setShowInstallBanner(false);
      if (onInstallSuccess) {
        onInstallSuccess();
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [showInstallPrompt, onInstallSuccess]);

  // Check notification permissions
  useEffect(() => {
    if ('Notification' in window) {
      const permission = Notification.permission;
      setPWAFeatures(prev => ({ 
        ...prev, 
        notificationsEnabled: permission === 'granted' 
      }));
    }
  }, []);

  // Install PWA
  const handleInstallClick = async () => {
    if (installPromptEvent) {
      try {
        await installPromptEvent.prompt();
        const choiceResult = await installPromptEvent.userChoice;
        
        if (choiceResult.outcome === 'accepted') {
          setPWAFeatures(prev => ({ ...prev, isInstallable: false }));
          setShowInstallBanner(false);
        }
      } catch (error) {
        console.error('Install failed:', error);
      }
    }
  };

  // Request notification permission
  const handleNotificationToggle = async () => {
    if (!('Notification' in window)) {
      alert(isPortuguese 
        ? 'Notificações não são suportadas neste navegador'
        : 'Notifications are not supported in this browser'
      );
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      const enabled = permission === 'granted';
      
      setPWAFeatures(prev => ({ ...prev, notificationsEnabled: enabled }));
      
      if (enabled) {
        // Show welcome notification
        new Notification(
          isPortuguese ? '🇵🇹 LusoTown Notificações Ativadas' : '🇵🇹 LusoTown Notifications Enabled',
          {
            body: isPortuguese 
              ? 'Receberá notificações sobre eventos portugueses próximos!'
              : 'You\'ll receive notifications about nearby Lusophone events!',
            icon: '/icons/icon-192x192.png',
            badge: '/icons/badge-72x72.png',
            tag: 'lusotown-welcome',
          }
        );
      }

      if (onNotificationToggle) {
        onNotificationToggle(enabled);
      }
    } catch (error) {
      console.error('Notification permission error:', error);
    }
  };

  // Share content
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: isPortuguese ? 'LusoTown - Comunidade Portuguesa' : 'LusoTown - Lusophone Community',
          text: isPortuguese 
            ? 'Descubra eventos portugueses em Londres!'
            : 'Discover Lusophone events in London!',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert(isPortuguese ? 'Link copiado!' : 'Link copied!');
    }
  };

  return (
    <div className={className}>
      {/* PWA Install Banner */}
      <AnimatePresence>
        {showInstallBanner && pwaFeatures.isInstallable && !pwaFeatures.isInstalled && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-4 left-4 right-4 z-50"
          >
            <div className="bg-gradient-to-r from-green-500 to-red-500 text-white rounded-2xl p-4 shadow-2xl border border-white/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <DevicePhoneMobileIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-1">
                    {isPortuguese ? '📱 Instalar LusoTown' : '📱 Install LusoTown'}
                  </h3>
                  <p className="text-sm text-white/90">
                    {isPortuguese 
                      ? 'Acesso rápido aos eventos portugueses!'
                      : 'Quick access to Lusophone events!'
                    }
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleInstallClick}
                    className="bg-white text-green-600 px-4 py-2 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors"
                  >
                    {isPortuguese ? 'Instalar' : 'Install'}
                  </button>
                  <button
                    onClick={() => setShowInstallBanner(false)}
                    className="text-white/80 hover:text-white p-2"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PWA Features Panel */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-red-500 rounded-full flex items-center justify-center">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">
                {isPortuguese ? 'Recursos Avançados' : 'Advanced Features'}
              </h3>
              <p className="text-sm text-gray-600">
                {isPortuguese ? 'Experiência móvel aprimorada' : 'Enhanced mobile experience'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowPWAFeatures(!showPWAFeatures)}
            className="text-gray-500 hover:text-gray-700"
          >
            <motion.div
              animate={{ rotate: showPWAFeatures ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ▼
            </motion.div>
          </button>
        </div>

        {/* PWA Status Indicators */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Installation Status */}
          <div className={`p-3 rounded-xl ${
            pwaFeatures.isInstalled 
              ? 'bg-green-50 border border-green-200' 
              : pwaFeatures.isInstallable 
                ? 'bg-blue-50 border border-blue-200'
                : 'bg-gray-50 border border-gray-200'
          }`}>
            <div className="flex items-center gap-2 mb-1">
              <DevicePhoneMobileIcon className={`w-4 h-4 ${
                pwaFeatures.isInstalled ? 'text-green-600' : 'text-gray-500'
              }`} />
              <span className="text-sm font-medium text-gray-900">
                {isPortuguese ? 'App Instalada' : 'App Installed'}
              </span>
            </div>
            <div className={`text-xs ${
              pwaFeatures.isInstalled 
                ? 'text-green-600' 
                : pwaFeatures.isInstallable 
                  ? 'text-blue-600'
                  : 'text-gray-500'
            }`}>
              {pwaFeatures.isInstalled 
                ? (isPortuguese ? '✅ Instalada' : '✅ Installed')
                : pwaFeatures.isInstallable 
                  ? (isPortuguese ? '📲 Disponível' : '📲 Available')
                  : (isPortuguese ? '🌐 Web apenas' : '🌐 Web only')
              }
            </div>
          </div>

          {/* Online Status */}
          <div className={`p-3 rounded-xl ${
            pwaFeatures.isOnline 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center gap-2 mb-1">
              <WifiIcon className={`w-4 h-4 ${
                pwaFeatures.isOnline ? 'text-green-600' : 'text-red-600'
              }`} />
              <span className="text-sm font-medium text-gray-900">
                {isPortuguese ? 'Conexão' : 'Connection'}
              </span>
            </div>
            <div className={`text-xs ${
              pwaFeatures.isOnline ? 'text-green-600' : 'text-red-600'
            }`}>
              {pwaFeatures.isOnline 
                ? (isPortuguese ? '🟢 Online' : '🟢 Online')
                : (isPortuguese ? '🔴 Offline' : '🔴 Offline')
              }
            </div>
          </div>
        </div>

        {/* Expanded Features */}
        <AnimatePresence>
          {showPWAFeatures && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              {/* Install App Button */}
              {pwaFeatures.isInstallable && !pwaFeatures.isInstalled && (
                <button
                  onClick={handleInstallClick}
                  className="w-full bg-gradient-to-r from-green-500 to-red-500 text-white rounded-xl p-4 font-semibold hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center justify-center gap-3">
                    <ArrowDownTrayIcon className="w-5 h-5" />
                    <span>
                      {isPortuguese ? 'Instalar App LusoTown' : 'Install LusoTown App'}
                    </span>
                  </div>
                  <div className="text-sm text-white/80 mt-1">
                    {isPortuguese 
                      ? 'Acesso offline e notificações push'
                      : 'Offline access and push notifications'
                    }
                  </div>
                </button>
              )}

              {/* Feature Toggles */}
              <div className="space-y-3">
                {/* Notifications */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      pwaFeatures.notificationsEnabled 
                        ? 'bg-green-100' 
                        : 'bg-gray-100'
                    }`}>
                      {pwaFeatures.notificationsEnabled ? (
                        <BellSolidIcon className="w-4 h-4 text-green-600" />
                      ) : (
                        <BellIcon className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-900">
                        {isPortuguese ? 'Notificações Push' : 'Push Notifications'}
                      </div>
                      <div className="text-xs text-gray-600">
                        {isPortuguese 
                          ? 'Eventos portugueses próximos'
                          : 'Nearby Lusophone events'
                        }
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleNotificationToggle}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      pwaFeatures.notificationsEnabled
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  >
                    <motion.div
                      className="w-5 h-5 bg-white rounded-full shadow-sm"
                      animate={{
                        x: pwaFeatures.notificationsEnabled ? 28 : 2,
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>

                {/* Share */}
                {pwaFeatures.supportsSharing && (
                  <button
                    onClick={handleShare}
                    className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <ShareIcon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-900">
                        {isPortuguese ? 'Partilhar LusoTown' : 'Share LusoTown'}
                      </div>
                      <div className="text-xs text-gray-600">
                        {isPortuguese 
                          ? 'Convide amigos portugueses'
                          : 'Invite Lusophone friends'
                        }
                      </div>
                    </div>
                  </button>
                )}

                {/* Camera Access */}
                {pwaFeatures.supportsCamera && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <PhotoIcon className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-900">
                        {isPortuguese ? 'Acesso à Câmara' : 'Camera Access'}
                      </div>
                      <div className="text-xs text-gray-600">
                        {isPortuguese 
                          ? 'Partilhar fotos de eventos'
                          : 'Share event photos'
                        }
                      </div>
                    </div>
                    <CheckCircleIcon className="w-5 h-5 text-green-500 ml-auto" />
                  </div>
                )}
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-r from-green-50 to-red-50 rounded-xl p-4 mt-4">
                <h4 className="font-semibold text-gray-900 mb-3">
                  {isPortuguese ? '🚀 Benefícios do App' : '🚀 App Benefits'}
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span>
                      {isPortuguese 
                        ? 'Acesso offline aos eventos guardados'
                        : 'Offline access to saved events'
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span>
                      {isPortuguese 
                        ? 'Notificações de eventos próximos'
                        : 'Notifications for nearby events'
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span>
                      {isPortuguese 
                        ? 'Experiência nativa no telemóvel'
                        : 'Native mobile experience'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}