'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useNotification } from '@/context/NotificationContext';
import logger from '@/utils/logger';
import { 
  Bell, 
  BellOff, 
  Settings, 
  Calendar,
  Users,
  Heart,
  MapPin,
  Music,
  Coffee,
  Star,
  Clock,
  Volume2,
  Smartphone,
  Globe
} from 'lucide-react';

interface PushNotificationSystemProps {
  className?: string;
}

interface NotificationPreferences {
  culturalEvents: boolean;
  communityMatches: boolean;
  businessUpdates: boolean;
  festivalReminders: boolean;
  fadoNights: boolean;
  portugueseFestas: boolean;
  networkingEvents: boolean;
  restaurantSpecials: boolean;
  communityNews: boolean;
  emergencyAlerts: boolean;
}

interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

interface CulturalNotification {
  id: string;
  type: 'cultural-event' | 'festa' | 'fado-night' | 'community-match' | 'business-update' | 'emergency';
  title: string;
  titlePortuguese?: string;
  body: string;
  bodyPortuguese?: string;
  icon?: string;
  badge?: string;
  data?: any;
  scheduledTime?: string;
  culturalContext?: {
    region: 'portugal' | 'brazil' | 'angola' | 'mozambique' | 'cape-verde' | 'all';
    tradition: string;
    significance: string;
  };
}

// Lusophone cultural holidays and events for automated notifications
const PORTUGUESE_CULTURAL_CALENDAR = [
  {
    date: '04-25',
    name: 'Freedom Day',
    namePortuguese: 'Dia da Liberdade',
    type: 'national-holiday',
    description: 'Celebrating Lusophone freedom and democracy'
  },
  {
    date: '06-10',
    name: 'Portugal Day',
    namePortuguese: 'Dia de Portugal',
    type: 'national-holiday',
    description: 'Celebrating Portuguese culture and heritage'
  },
  {
    date: '06-13',
    name: 'Santo António',
    namePortuguese: 'Santo António',
    type: 'cultural-festa',
    description: 'Traditional Lusophone festa with sardines and folk dancing'
  },
  {
    date: '06-24',
    name: 'São João',
    namePortuguese: 'São João',
    type: 'cultural-festa',
    description: 'Porto festival with street parties and fireworks'
  }
];

export default function PushNotificationSystem({ className = '' }: PushNotificationSystemProps) {
  const { language, t } = useLanguage();
  const { addNotification } = useNotification();

  // Notification states
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Preferences
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    culturalEvents: true,
    communityMatches: true,
    businessUpdates: false,
    festivalReminders: true,
    fadoNights: true,
    portugueseFestas: true,
    networkingEvents: true,
    restaurantSpecials: false,
    communityNews: true,
    emergencyAlerts: true
  });

  // UI states
  const [showSettings, setShowSettings] = useState(false);
  const [testNotificationSent, setTestNotificationSent] = useState(false);

  useEffect(() => {
    checkNotificationSupport();
    loadPreferences();
    checkSubscriptionStatus();
    setupCulturalCalendarNotifications();
  }, []);

  const checkNotificationSupport = () => {
    const supported = 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
    setIsSupported(supported);
    
    if (supported) {
      setPermission(Notification.permission);
    }

    logger.debug('Push notifications support check', { area: 'mobile',
      supported,
      permission: Notification.permission,
      serviceWorker: 'serviceWorker' in navigator,
      pushManager: 'PushManager' in window
    });
  };

  const loadPreferences = () => {
    try {
      const savedPreferences = localStorage.getItem('lusotown-notification-preferences');
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    } catch (error) {
      logger.error('Failed to load push notification preferences', error, { area: 'mobile', action: 'load_preferences' });
    }
  };

  const savePreferences = useCallback((newPreferences: NotificationPreferences) => {
    try {
      localStorage.setItem('lusotown-notification-preferences', JSON.stringify(newPreferences));
      setPreferences(newPreferences);
      
      // Update subscription with new preferences
      if (isSubscribed && subscription) {
        updateSubscriptionPreferences(newPreferences);
      }
    } catch (error) {
      logger.error('Failed to save push notification preferences', error, { area: 'mobile', action: 'save_preferences' });
    }
  }, [isSubscribed, subscription]);

  const checkSubscriptionStatus = async () => {
    if (!isSupported) return;

    try {
      const registration = await navigator.serviceWorker.ready;
      const existingSubscription = await registration.pushManager.getSubscription();
      
      if (existingSubscription) {
        setIsSubscribed(true);
        setSubscription(existingSubscription);
        logger.info('Existing push subscription found', { area: 'mobile', action: 'check_subscription' });
      }
    } catch (error) {
      logger.error('Failed to check push subscription', error, { area: 'mobile', action: 'check_subscription' });
    }
  };

  const requestPermission = async () => {
    if (!isSupported) {
      addNotification({
        id: 'notifications-not-supported',
        type: 'error',
        title: language === 'pt' ? 'Não Suportado' : 'Not Supported',
        message: language === 'pt' 
          ? 'Notificações não são suportadas neste navegador' 
          : 'Push notifications are not supported in this browser',
        duration: 5000
      });
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      setPermission(permission);

      if (permission === 'granted') {
        addNotification({
          id: 'notifications-granted',
          type: 'success',
          title: language === 'pt' ? 'Notificações Ativadas!' : 'Notifications Enabled!',
          message: language === 'pt' 
            ? 'Vais receber alertas sobre eventos portugueses' 
            : 'You will receive alerts about Lusophone cultural events',
          duration: 5000
        });
        return true;
      } else {
        addNotification({
          id: 'notifications-denied',
          type: 'warning',
          title: language === 'pt' ? 'Permissão Negada' : 'Permission Denied',
          message: language === 'pt' 
            ? 'Podes ativar nas definições do navegador' 
            : 'You can enable notifications in browser settings',
          duration: 5000
        });
        return false;
      }
    } catch (error) {
      logger.error('Push notification permission request failed', error, { area: 'mobile', action: 'request_permission' });
      return false;
    }
  };

  const subscribe = async () => {
    if (permission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) return;
    }

    setIsLoading(true);

    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Check if already subscribed
      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        setIsSubscribed(true);
        setSubscription(existingSubscription);
        setIsLoading(false);
        return;
      }

      // Create new subscription
      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || urlB64ToUint8Array('BEl62iUYgUivxIkv69yViEuiBIa40HI80j4xKg9XlQjC0I1LVIE7w_P8YcLgL1C0LB-S9w4PQC5xqm2zWMOz1GM')
      });

      setIsSubscribed(true);
      setSubscription(newSubscription);
      
      // Send subscription to backend
      await sendSubscriptionToBackend(newSubscription);
      
      // Show welcome notification
      showWelcomeNotification();
      
      addNotification({
        id: 'subscription-success',
        type: 'success',
        title: language === 'pt' ? 'Subscrição Ativa!' : 'Subscription Active!',
        message: language === 'pt' 
          ? 'Notificações da comunidade de falantes de português ativadas' 
          : 'Portuguese-speaking community notifications enabled',
        duration: 5000
      });

    } catch (error) {
      logger.error('Push notification subscription failed', error, { area: 'mobile', action: 'subscribe', culturalContext: 'lusophone' });
      addNotification({
        id: 'subscription-error',
        type: 'error',
        title: language === 'pt' ? 'Erro na Subscrição' : 'Subscription Error',
        message: language === 'pt' 
          ? 'Não foi possível ativar as notificações' 
          : 'Could not enable notifications',
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribe = async () => {
    if (!subscription) return;

    setIsLoading(true);

    try {
      await subscription.unsubscribe();
      
      // Remove subscription from backend
      await removeSubscriptionFromBackend();
      
      setIsSubscribed(false);
      setSubscription(null);
      
      addNotification({
        id: 'unsubscription-success',
        type: 'info',
        title: language === 'pt' ? 'Notificações Desativadas' : 'Notifications Disabled',
        message: language === 'pt' 
          ? 'Podes reativar a qualquer momento' 
          : 'You can re-enable them anytime',
        duration: 3000
      });

    } catch (error) {
      logger.error('Push notification unsubscription failed', error, { area: 'mobile', action: 'unsubscribe' });
      addNotification({
        id: 'unsubscription-error',
        type: 'error',
        title: language === 'pt' ? 'Erro ao Desativar' : 'Unsubscription Error',
        message: language === 'pt' 
          ? 'Não foi possível desativar as notificações' 
          : 'Could not disable notifications',
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendSubscriptionToBackend = async (subscription: PushSubscription) => {
    try {
      const response = await fetch('/api/push-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subscription,
          preferences,
          language,
          userAgent: navigator.userAgent,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save subscription');
      }

      logger.info('Push subscription sent to backend', { area: 'mobile', action: 'send_subscription' });
    } catch (error) {
      logger.error('Failed to send push subscription to backend', error, { area: 'mobile', action: 'send_subscription' });
    }
  };

  const removeSubscriptionFromBackend = async () => {
    try {
      await fetch('/api/push-subscription', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subscription })
      });

      logger.info('Push subscription removed from backend', { area: 'mobile', action: 'remove_subscription' });
    } catch (error) {
      logger.error('Failed to remove push subscription from backend', error, { area: 'mobile', action: 'remove_subscription' });
    }
  };

  const updateSubscriptionPreferences = async (newPreferences: NotificationPreferences) => {
    try {
      await fetch('/api/push-subscription/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subscription,
          preferences: newPreferences,
          language
        })
      });

      logger.info('Push notification preferences updated', { area: 'mobile', action: 'update_preferences' });
    } catch (error) {
      logger.error('Failed to update push notification preferences', error, { area: 'mobile', action: 'update_preferences' });
    }
  };

  const setupCulturalCalendarNotifications = () => {
    // Schedule notifications for Lusophone cultural events
    PORTUGUESE_CULTURAL_CALENDAR.forEach(event => {
      const today = new Date();
      const eventDate = new Date(today.getFullYear(), parseInt(event.date.split('-')[0]) - 1, parseInt(event.date.split('-')[1]));
      
      // If event has passed this year, schedule for next year
      if (eventDate < today) {
        eventDate.setFullYear(today.getFullYear() + 1);
      }
      
      // Schedule notification 3 days before the event
      const notificationDate = new Date(eventDate);
      notificationDate.setDate(notificationDate.getDate() - 3);
      
      if (notificationDate > today) {
        scheduleLocalNotification({
          id: `cultural-${event.date}`,
          type: 'cultural-event',
          title: language === 'pt' 
            ? `${event.namePortuguese} aproxima-se!` 
            : `${event.name} is coming!`,
          titlePortuguese: `${event.namePortuguese} aproxima-se!`,
          body: language === 'pt'
            ? `Preparate para celebrar a cultura portuguesa em Londres`
            : `Get ready to celebrate Portuguese culture in London`,
          bodyPortuguese: `Preparate para celebrar a cultura portuguesa em Londres`,
          scheduledTime: notificationDate.toISOString(),
          culturalContext: {
            region: 'portugal',
            tradition: event.type,
            significance: event.description
          }
        });
      }
    });
  };

  const scheduleLocalNotification = (notification: CulturalNotification) => {
    // For now, store in localStorage. In production, this would be handled by service worker
    try {
      const scheduledNotifications = JSON.parse(localStorage.getItem('lusotown-scheduled-notifications') || '[]');
      scheduledNotifications.push(notification);
      localStorage.setItem('lusotown-scheduled-notifications', JSON.stringify(scheduledNotifications));
      
      logger.debug('Scheduled push notification', { area: 'mobile', action: 'schedule_notification', notificationType: notification.type });
    } catch (error) {
      logger.error('Failed to schedule push notification', error, { area: 'mobile', action: 'schedule_notification' });
    }
  };

  const showWelcomeNotification = () => {
    if (permission === 'granted') {
      const notification = new Notification(
        language === 'pt' ? '🇵🇹 Bem-vindo à LusoTown!' : '🇵🇹 Welcome to LusoTown!',
        {
          body: language === 'pt'
            ? 'A tua comunidade de falantes de português em Londres está conectada!'
            : 'Your Portuguese-speaking community in London is now connected!',
          icon: '/icons/icon-192x192.png',
          badge: '/icons/badge-72x72.png',
          tag: 'welcome',
          requireInteraction: false,
          data: {
            url: '/',
            type: 'welcome'
          }
        }
      );

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      setTimeout(() => notification.close(), 8000);
    }
  };

  const sendTestNotification = async () => {
    if (!isSubscribed) return;

    setTestNotificationSent(true);

    try {
      await fetch('/api/push-notification/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subscription,
          language,
          type: 'test'
        })
      });

      addNotification({
        id: 'test-notification-sent',
        type: 'success',
        title: language === 'pt' ? 'Notificação de Teste Enviada!' : 'Test Notification Sent!',
        message: language === 'pt' 
          ? 'Deves receber a notificação em breve' 
          : 'You should receive the notification shortly',
        duration: 5000
      });

    } catch (error) {
      logger.error('Test push notification failed', error, { area: 'mobile', action: 'test_notification', culturalContext: 'lusophone' });
      addNotification({
        id: 'test-notification-error',
        type: 'error',
        title: language === 'pt' ? 'Erro no Teste' : 'Test Error',
        message: language === 'pt' 
          ? 'Não foi possível enviar a notificação de teste' 
          : 'Could not send test notification',
        duration: 5000
      });
    } finally {
      setTimeout(() => setTestNotificationSent(false), 3000);
    }
  };

  const updatePreference = (key: keyof NotificationPreferences, value: boolean) => {
    const newPreferences = { ...preferences, [key]: value };
    savePreferences(newPreferences);
  };

  // Utility function to convert VAPID key
  function urlB64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  if (!isSupported) {
    return (
      <div className={`bg-yellow-50 border border-yellow-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-start space-x-3">
          <BellOff className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-sm font-semibold text-yellow-800">
              {language === 'pt' ? 'Notificações Não Suportadas' : 'Notifications Not Supported'}
            </h3>
            <p className="text-sm text-yellow-700 mt-1">
              {language === 'pt' 
                ? 'O teu navegador não suporta notificações push. Tenta usar Chrome, Firefox ou Safari.' 
                : 'Your browser does not support push notifications. Try using Chrome, Firefox, or Safari.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main notification toggle */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {isSubscribed ? (
              <Bell className="h-8 w-8 text-blue-600" />
            ) : (
              <BellOff className="h-8 w-8 text-gray-400" />
            )}
          </div>
          
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">
              {language === 'pt' ? 'Notificações da Comunidade' : 'Community Notifications'}
            </h2>
            <p className="text-gray-600 mt-1">
              {language === 'pt' 
                ? 'Recebe alertas sobre eventos portugueses, matches da comunidade e atualizações culturais' 
                : 'Get alerts about Lusophone events, community matches, and cultural updates'}
            </p>
            
            <div className="mt-4 flex space-x-3">
              {!isSubscribed ? (
                <button
                  onClick={subscribe}
                  disabled={isLoading}
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <Bell className="h-5 w-5" />
                  )}
                  <span>
                    {isLoading 
                      ? (language === 'pt' ? 'A ativar...' : 'Enabling...')
                      : (language === 'pt' ? 'Ativar Notificações' : 'Enable Notifications')
                    }
                  </span>
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="inline-flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                  >
                    <Settings className="h-5 w-5" />
                    <span>{language === 'pt' ? 'Definições' : 'Settings'}</span>
                  </button>
                  
                  <button
                    onClick={sendTestNotification}
                    disabled={testNotificationSent}
                    className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    <Smartphone className="h-5 w-5" />
                    <span>
                      {testNotificationSent 
                        ? (language === 'pt' ? 'Enviado!' : 'Sent!')
                        : (language === 'pt' ? 'Testar' : 'Test')
                      }
                    </span>
                  </button>
                  
                  <button
                    onClick={unsubscribe}
                    disabled={isLoading}
                    className="inline-flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    <BellOff className="h-5 w-5" />
                    <span>{language === 'pt' ? 'Desativar' : 'Disable'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notification preferences */}
      {isSubscribed && showSettings && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>{language === 'pt' ? 'Preferências de Notificações' : 'Notification Preferences'}</span>
          </h3>
          
          <div className="space-y-4">
            {/* Cultural Events */}
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-red-600" />
                <div>
                  <h4 className="font-medium text-gray-900">
                    {language === 'pt' ? 'Eventos Culturais' : 'Cultural Events'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === 'pt' ? 'Fado, festas, workshops portugueses' : 'Fado nights, Portuguese festivals, workshops'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => updatePreference('culturalEvents', !preferences.culturalEvents)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  preferences.culturalEvents ? 'bg-red-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  preferences.culturalEvents ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Community Matches */}
            <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Heart className="h-5 w-5 text-pink-600" />
                <div>
                  <h4 className="font-medium text-gray-900">
                    {language === 'pt' ? 'Matches da Comunidade' : 'Community Matches'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === 'pt' ? 'Novos portugueses compatíveis' : 'New compatible Portuguese speakers'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => updatePreference('communityMatches', !preferences.communityMatches)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  preferences.communityMatches ? 'bg-pink-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  preferences.communityMatches ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Festival Reminders */}
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-green-600" />
                <div>
                  <h4 className="font-medium text-gray-900">
                    {language === 'pt' ? 'Lembretes de Festas' : 'Festival Reminders'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === 'pt' ? 'Santo António, São João, Festa do Avante' : 'Santo António, São João, Festa do Avante'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => updatePreference('festivalReminders', !preferences.festivalReminders)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  preferences.festivalReminders ? 'bg-green-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  preferences.festivalReminders ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Fado Nights */}
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Music className="h-5 w-5 text-purple-600" />
                <div>
                  <h4 className="font-medium text-gray-900">
                    {language === 'pt' ? 'Noites de Fado' : 'Fado Nights'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === 'pt' ? 'Performances de fado autêntico' : 'Authentic fado performances'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => updatePreference('fadoNights', !preferences.fadoNights)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  preferences.fadoNights ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  preferences.fadoNights ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Restaurant Specials */}
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Coffee className="h-5 w-5 text-orange-600" />
                <div>
                  <h4 className="font-medium text-gray-900">
                    {language === 'pt' ? 'Especiais dos Restaurantes' : 'Restaurant Specials'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === 'pt' ? 'Ofertas em restaurantes portugueses' : 'Deals at Portuguese restaurants'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => updatePreference('restaurantSpecials', !preferences.restaurantSpecials)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  preferences.restaurantSpecials ? 'bg-orange-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  preferences.restaurantSpecials ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Emergency Alerts */}
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-red-600" />
                <div>
                  <h4 className="font-medium text-gray-900">
                    {language === 'pt' ? 'Alertas de Emergência' : 'Emergency Alerts'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === 'pt' ? 'Avisos importantes para a comunidade' : 'Important community alerts'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => updatePreference('emergencyAlerts', !preferences.emergencyAlerts)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  preferences.emergencyAlerts ? 'bg-red-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  preferences.emergencyAlerts ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status information */}
      {isSubscribed && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-green-800">
            <Bell className="h-5 w-5" />
            <span className="font-medium">
              {language === 'pt' ? 'Notificações Ativas' : 'Notifications Active'}
            </span>
          </div>
          <p className="text-sm text-green-700 mt-1">
            {language === 'pt' 
              ? 'A comunidade de falantes de português pode enviar-te notificações sobre eventos e atualizações' 
              : 'The Portuguese-speaking community can send you notifications about events and updates'}
          </p>
        </div>
      )}
    </div>
  );
}