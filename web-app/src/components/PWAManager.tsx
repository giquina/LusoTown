'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useNotification } from '@/context/NotificationContext';
import { Download, Smartphone, Bell, BellOff, Wifi, WifiOff } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAManagerProps {
  className?: string;
}

export default function PWAManager({ className = '' }: PWAManagerProps) {
  const { language, t } = useLanguage();
  const { addNotification } = useNotification();
  
  // PWA states
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  
  // Service Worker states
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [swUpdateAvailable, setSwUpdateAvailable] = useState(false);
  const [swInstalling, setSwInstalling] = useState(false);

  useEffect(() => {
    initializePWA();
    setupNetworkListener();
    checkInstallStatus();
    
    return () => {
      // Cleanup listeners
    };
  }, []);

  const initializePWA = async () => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'imports'
        });
        
        setSwRegistration(registration);
        console.log('[PWA] Service Worker registered:', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            setSwInstalling(true);
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setSwUpdateAvailable(true);
                setSwInstalling(false);
                showUpdateNotification();
              }
            });
          }
        });
        
        // Listen for controlling service worker changes
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          window.location.reload();
        });
        
      } catch (error) {
        console.error('[PWA] Service Worker registration failed:', error);
      }
    }
    
    // Setup install prompt listener
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
      setNotificationsEnabled(Notification.permission === 'granted');
    }
    
    // Setup push notifications if supported
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setupPushNotifications();
    }
  };

  const handleBeforeInstallPrompt = (e: Event) => {
    e.preventDefault();
    setInstallPrompt(e as BeforeInstallPromptEvent);
    setIsInstallable(true);
    
    // Show install banner after delay for Portuguese cultural context
    setTimeout(() => {
      showInstallBanner();
    }, 2000);
  };

  const setupNetworkListener = () => {
    const updateOnlineStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      
      if (online) {
        addNotification({
          id: 'network-online',
          type: 'success',
          title: language === 'pt' ? 'Conectado!' : 'Back Online!',
          message: language === 'pt' 
            ? 'Ligação à comunidade portuguesa restaurada' 
            : 'Connection to Portuguese community restored',
          duration: 3000
        });
      } else {
        addNotification({
          id: 'network-offline',
          type: 'info',
          title: language === 'pt' ? 'Sem Ligação' : 'Offline',
          message: language === 'pt' 
            ? 'Alguns conteúdos ficam disponíveis offline' 
            : 'Some content remains available offline',
          duration: 5000
        });
      }
    };
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  };

  const checkInstallStatus = () => {
    // Check if app is installed
    if (window.matchMedia('(display-mode: standalone)').matches ||
        window.matchMedia('(display-mode: fullscreen)').matches ||
        (window.navigator as any).standalone === true) {
      setIsInstalled(true);
      setIsInstallable(false);
    }
  };

  const installApp = async () => {
    if (!installPrompt) return;
    
    try {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      
      if (choice.outcome === 'accepted') {
        console.log('[PWA] App installation accepted');
        addNotification({
          id: 'install-success',
          type: 'success',
          title: language === 'pt' ? 'App Instalado!' : 'App Installed!',
          message: language === 'pt' 
            ? 'LusoTown agora no teu dispositivo' 
            : 'LusoTown is now on your device',
          duration: 5000
        });
      } else {
        console.log('[PWA] App installation dismissed');
      }
      
      setInstallPrompt(null);
      setIsInstallable(false);
    } catch (error) {
      console.error('[PWA] Installation error:', error);
    }
  };

  const setupPushNotifications = async () => {
    if (!swRegistration) return;
    
    try {
      // Check if push notifications are supported
      if (!('PushManager' in window)) {
        console.log('[PWA] Push notifications not supported');
        return;
      }
      
      // Get existing subscription
      const existingSubscription = await swRegistration.pushManager.getSubscription();
      
      if (existingSubscription) {
        console.log('[PWA] Existing push subscription found');
        // Send subscription to backend
        await sendSubscriptionToBackend(existingSubscription);
      }
    } catch (error) {
      console.error('[PWA] Push notification setup error:', error);
    }
  };

  const enableNotifications = async () => {
    if (!('Notification' in window)) {
      addNotification({
        id: 'notifications-not-supported',
        type: 'error',
        title: language === 'pt' ? 'Não Suportado' : 'Not Supported',
        message: language === 'pt' 
          ? 'Notificações não são suportadas neste navegador' 
          : 'Notifications are not supported in this browser',
        duration: 5000
      });
      return;
    }
    
    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        await subscribeToPushNotifications();
        
        addNotification({
          id: 'notifications-enabled',
          type: 'success',
          title: language === 'pt' ? 'Notificações Ativadas!' : 'Notifications Enabled!',
          message: language === 'pt' 
            ? 'Recebe alertas de eventos portugueses' 
            : 'Get alerts about Portuguese cultural events',
          duration: 5000
        });
        
        // Show welcome notification
        showWelcomeNotification();
      } else {
        addNotification({
          id: 'notifications-denied',
          type: 'warning',
          title: language === 'pt' ? 'Notificações Negadas' : 'Notifications Denied',
          message: language === 'pt' 
            ? 'Podes ativar nas definições do navegador' 
            : 'You can enable them in browser settings',
          duration: 5000
        });
      }
    } catch (error) {
      console.error('[PWA] Notification permission error:', error);
    }
  };

  const subscribeToPushNotifications = async () => {
    if (!swRegistration || !('PushManager' in window)) return;
    
    try {
      const subscription = await swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      });
      
      console.log('[PWA] Push subscription created:', subscription);
      await sendSubscriptionToBackend(subscription);
    } catch (error) {
      console.error('[PWA] Push subscription error:', error);
    }
  };

  const sendSubscriptionToBackend = async (subscription: PushSubscription) => {
    try {
      await fetch('/api/push-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subscription,
          language,
          preferences: {
            culturalEvents: true,
            communityMatches: true,
            businessUpdates: true,
            festivalReminders: true
          }
        })
      });
    } catch (error) {
      console.error('[PWA] Failed to send subscription to backend:', error);
    }
  };

  const showInstallBanner = () => {
    addNotification({
      id: 'install-banner',
      type: 'info',
      title: language === 'pt' ? 'Instalar App' : 'Install App',
      message: language === 'pt' 
        ? 'Adiciona LusoTown ao teu ecrã inicial' 
        : 'Add LusoTown to your home screen',
      duration: 10000,
      actions: [
        {
          label: language === 'pt' ? 'Instalar' : 'Install',
          action: installApp
        }
      ]
    });
  };

  const showUpdateNotification = () => {
    addNotification({
      id: 'app-update',
      type: 'info',
      title: language === 'pt' ? 'Atualização Disponível' : 'Update Available',
      message: language === 'pt' 
        ? 'Nova versão da comunidade portuguesa' 
        : 'New version of the Portuguese community',
      duration: 0,
      actions: [
        {
          label: language === 'pt' ? 'Atualizar' : 'Update',
          action: () => window.location.reload()
        }
      ]
    });
  };

  const showWelcomeNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(
        language === 'pt' ? '🇵🇹 Bem-vindo à LusoTown!' : '🇵🇹 Welcome to LusoTown!',
        {
          body: language === 'pt' 
            ? 'A tua comunidade portuguesa em Londres está aqui!' 
            : 'Your Portuguese community in the U.K. is here!',
          icon: '/icons/icon-192x192.png',
          badge: '/icons/badge-72x72.png',
          tag: 'welcome',
          requireInteraction: false,
          data: {
            url: '/'
          }
        }
      );
      
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
      
      setTimeout(() => notification.close(), 5000);
    }
  };

  const disableNotifications = () => {
    setNotificationsEnabled(false);
    addNotification({
      id: 'notifications-disabled',
      type: 'info',
      title: language === 'pt' ? 'Notificações Desativadas' : 'Notifications Disabled',
      message: language === 'pt' 
        ? 'Podes reativar a qualquer momento' 
        : 'You can re-enable them anytime',
      duration: 3000
    });
  };

  if (isInstalled) {
    return (
      <div className={`flex items-center space-x-4 ${className}`}>
        {/* Network Status Indicator */}
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
          isOnline 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {isOnline ? (
            <>
              <Wifi className="h-4 w-4" />
              <span>{language === 'pt' ? 'Online' : 'Online'}</span>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4" />
              <span>{language === 'pt' ? 'Offline' : 'Offline'}</span>
            </>
          )}
        </div>
        
        {/* Notification Toggle */}
        <button
          onClick={notificationsEnabled ? disableNotifications : enableNotifications}
          className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm transition-colors ${
            notificationsEnabled
              ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {notificationsEnabled ? (
            <>
              <Bell className="h-4 w-4" />
              <span>{language === 'pt' ? 'Ativadas' : 'Enabled'}</span>
            </>
          ) : (
            <>
              <BellOff className="h-4 w-4" />
              <span>{language === 'pt' ? 'Desativadas' : 'Disabled'}</span>
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Install App Button */}
      {isInstallable && (
        <div className="bg-gradient-to-r from-red-50 to-green-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Smartphone className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900">
                {language === 'pt' ? 'Instalar App LusoTown' : 'Install LusoTown App'}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'pt' 
                  ? 'Acesso rápido à comunidade portuguesa no teu dispositivo' 
                  : 'Quick access to the Portuguese community on your device'}
              </p>
              <div className="mt-3 flex space-x-3">
                <button
                  onClick={installApp}
                  className="inline-flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>{language === 'pt' ? 'Instalar' : 'Install'}</span>
                </button>
                <button
                  onClick={() => {
                    setIsInstallable(false);
                    setInstallPrompt(null);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2"
                >
                  {language === 'pt' ? 'Agora não' : 'Not now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enable Notifications */}
      {notificationPermission === 'default' && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Bell className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900">
                {language === 'pt' ? 'Ativar Notificações' : 'Enable Notifications'}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'pt' 
                  ? 'Recebe alertas sobre eventos portugueses e novos contactos' 
                  : 'Get alerts about Portuguese cultural events and new connections'}
              </p>
              <div className="mt-3 flex space-x-3">
                <button
                  onClick={enableNotifications}
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <Bell className="h-4 w-4" />
                  <span>{language === 'pt' ? 'Ativar' : 'Enable'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Worker Update */}
      {swUpdateAvailable && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Download className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900">
                {language === 'pt' ? 'Atualização Disponível' : 'Update Available'}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'pt' 
                  ? 'Nova versão com melhorias para a comunidade portuguesa' 
                  : 'New version with improvements for the Portuguese community'}
              </p>
              <div className="mt-3">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>{language === 'pt' ? 'Atualizar Agora' : 'Update Now'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Installing indicator */}
      {swInstalling && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600"></div>
            <span className="text-sm text-yellow-800">
              {language === 'pt' ? 'A instalar atualização...' : 'Installing update...'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}