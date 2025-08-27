'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useNotification } from '@/context/NotificationContext';
import { NOTIFICATION_CATEGORIES, NOTIFICATION_TEMPLATES, PORTUGUESE_CULTURAL_CALENDAR } from '@/config/push-notifications';
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
  Globe,
  Flag,
  Brain,
  Briefcase,
  Check,
  X,
  ChevronRight,
  AlertTriangle,
  Gift
} from 'lucide-react';

interface PortuguesePushNotificationManagerProps {
  className?: string;
}

interface NotificationPreferences {
  [key: string]: boolean;
}

interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

interface NotificationStats {
  totalSent: number;
  totalClicked: number;
  byType: Record<string, number>;
  recentEvents: Array<{
    type: string;
    timestamp: number;
    title: string;
  }>;
}

export default function PortuguesePushNotificationManager({ 
  className = '' 
}: PortuguesePushNotificationManagerProps) {
  const { language, t } = useLanguage();
  const { addNotification } = useNotification();

  // Core notification states
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Preferences management
  const [preferences, setPreferences] = useState<NotificationPreferences>({});
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  
  // Portuguese cultural settings
  const [culturalRegion, setCulturalRegion] = useState<string>('all');
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(true);
  const [priorityOnly, setPriorityOnly] = useState(false);
  
  // UI states
  const [activeTab, setActiveTab] = useState<'preferences' | 'stats' | 'test'>('preferences');
  const [testNotificationSent, setTestNotificationSent] = useState(false);
  const [notificationStats, setNotificationStats] = useState<NotificationStats>({
    totalSent: 0,
    totalClicked: 0,
    byType: {},
    recentEvents: []
  });

  useEffect(() => {
    initializeNotificationSystem();
    loadPreferences();
    loadNotificationStats();
  }, []);

  const initializeNotificationSystem = () => {
    const supported = 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
    setIsSupported(supported);
    
    if (supported) {
      setPermission(Notification.permission);
      checkSubscriptionStatus();
    }

    logger.debug('Lusophone push notification system initialized', {
      supported,
      permission: Notification.permission,
      serviceWorker: 'serviceWorker' in navigator,
      pushManager: 'PushManager' in window,
      area: 'messaging',
      culturalContext: 'lusophone',
      action: 'notification_system_initialized'
    });
  };

  const loadPreferences = () => {
    try {
      const savedPreferences = localStorage.getItem('lusotown-notification-preferences');
      if (savedPreferences) {
        const prefs = JSON.parse(savedPreferences);
        setPreferences(prefs);
      } else {
        // Set default preferences based on categories
        const defaultPrefs: NotificationPreferences = {};
        Object.values(NOTIFICATION_CATEGORIES).forEach(category => {
          defaultPrefs[category.id] = category.defaultEnabled;
        });
        setPreferences(defaultPrefs);
      }

      // Load cultural preferences
      const culturalRegion = localStorage.getItem('lusotown-cultural-region') || 'all';
      const quietHours = localStorage.getItem('lusotown-quiet-hours-enabled') === 'true';
      const priorityOnly = localStorage.getItem('lusotown-priority-only') === 'true';
      
      setCulturalRegion(culturalRegion);
      setQuietHoursEnabled(quietHours);
      setPriorityOnly(priorityOnly);
    } catch (error) {
      logger.error('Failed to load Lusophone notification preferences', error, {
        area: 'messaging',
        culturalContext: 'lusophone',
        action: 'load_preferences_error'
      });
    }
  };

  const savePreferences = useCallback(async (newPreferences: NotificationPreferences) => {
    try {
      localStorage.setItem('lusotown-notification-preferences', JSON.stringify(newPreferences));
      setPreferences(newPreferences);
      
      // Update subscription with new preferences if subscribed
      if (isSubscribed && subscription) {
        await updateSubscriptionPreferences(newPreferences);
      }
    } catch (error) {
      logger.error('Failed to save Lusophone notification preferences', error, {
        area: 'messaging',
        culturalContext: 'lusophone',
        action: 'save_preferences_error'
      });
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
        logger.debug('Existing Lusophone push subscription found', {
          area: 'messaging',
          culturalContext: 'lusophone',
          action: 'existing_subscription_found'
        });
      }
    } catch (error) {
      logger.error('Failed to check Lusophone push subscription', error, {
        area: 'messaging',
        culturalContext: 'lusophone',
        action: 'check_subscription_error'
      });
    }
  };

  const requestPermissionAndSubscribe = async () => {
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
      return;
    }

    setIsLoading(true);

    try {
      // Request permission
      const permission = await Notification.requestPermission();
      setPermission(permission);

      if (permission !== 'granted') {
        addNotification({
          id: 'notifications-denied',
          type: 'warning',
          title: language === 'pt' ? 'Permissão Negada' : 'Permission Denied',
          message: language === 'pt' 
            ? 'Podes ativar nas definições do navegador' 
            : 'You can enable notifications in browser settings',
          duration: 5000
        });
        return;
      }

      // Create push subscription
      const registration = await navigator.serviceWorker.ready;
      const existingSubscription = await registration.pushManager.getSubscription();
      
      if (existingSubscription) {
        setIsSubscribed(true);
        setSubscription(existingSubscription);
        return;
      }

      // Subscribe to push notifications
      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || 
          'BEl62iUYgUivxIkv69yViEuiBIa40HI80j4xKg9XlQjC0I1LVIE7w_P8YcLgL1C0LB-S9w4PQC5xqm2zWMOz1GM'
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
        title: language === 'pt' ? 'Notificações Ativadas!' : 'Notifications Enabled!',
        message: language === 'pt' 
          ? 'Vais receber alertas sobre eventos portugueses e atualizações da comunidade' 
          : 'You will receive alerts about Portuguese events and community updates',
        duration: 5000
      });

    } catch (error) {
      logger.error('Lusophone push notification subscription failed', error, {
        area: 'messaging',
        culturalContext: 'lusophone',
        action: 'subscription_failed'
      });
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
      logger.error('Lusophone push notification unsubscription failed', error, {
        area: 'messaging',
        culturalContext: 'lusophone',
        action: 'unsubscription_failed'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendSubscriptionToBackend = async (subscription: PushSubscription) => {
    try {
      await fetch('/api/push-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscription,
          preferences,
          culturalRegion,
          language,
          quietHoursEnabled,
          priorityOnly,
          userAgent: navigator.userAgent,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        })
      });
    } catch (error) {
      logger.error('Failed to send Lusophone subscription to backend', error, {
        area: 'messaging',
        culturalContext: 'lusophone',
        action: 'send_subscription_error'
      });
    }
  };

  const removeSubscriptionFromBackend = async () => {
    try {
      await fetch('/api/push-subscription', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription })
      });
    } catch (error) {
      logger.error('Failed to remove Lusophone subscription from backend', error, {
        area: 'messaging',
        culturalContext: 'lusophone',
        action: 'remove_subscription_error'
      });
    }
  };

  const updateSubscriptionPreferences = async (newPreferences: NotificationPreferences) => {
    try {
      await fetch('/api/push-subscription/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscription,
          preferences: newPreferences,
          culturalRegion,
          language,
          quietHoursEnabled,
          priorityOnly
        })
      });
    } catch (error) {
      logger.error('Failed to update Lusophone notification preferences', error, {
        area: 'messaging',
        culturalContext: 'lusophone',
        action: 'update_preferences_error'
      });
    }
  };

  const showWelcomeNotification = () => {
    if (permission === 'granted') {
      const notification = new Notification(
        language === 'pt' ? '🇵🇹 Bem-vindo à LusoTown!' : '🇵🇹 Welcome to LusoTown!',
        {
          body: language === 'pt'
            ? 'A tua comunidade de falantes de português está conectada!'
            : 'Your Portuguese-speaking community is now connected!',
          icon: '/icons/icon-192x192.png',
          badge: '/icons/badge-72x72.png',
          tag: 'welcome',
          requireInteraction: false
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscription,
          language,
          culturalRegion,
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
      logger.error('Lusophone test notification failed', error, {
        area: 'messaging',
        culturalContext: 'lusophone',
        action: 'test_notification_failed'
      });
    } finally {
      setTimeout(() => setTestNotificationSent(false), 3000);
    }
  };

  const loadNotificationStats = () => {
    try {
      const events = JSON.parse(localStorage.getItem('lusotown-notification-events') || '[]');
      const interactions = JSON.parse(localStorage.getItem('lusotown-notification-interactions') || '[]');
      
      const byType: Record<string, number> = {};
      events.forEach((event: any) => {
        byType[event.type] = (byType[event.type] || 0) + 1;
      });

      setNotificationStats({
        totalSent: events.length,
        totalClicked: interactions.length,
        byType,
        recentEvents: events.slice(-10)
      });
    } catch (error) {
      logger.error('Failed to load Lusophone notification stats', error, {
        area: 'messaging',
        culturalContext: 'lusophone',
        action: 'load_stats_error'
      });
    }
  };

  const updatePreference = (categoryId: string, enabled: boolean) => {
    const newPreferences = { ...preferences, [categoryId]: enabled };
    savePreferences(newPreferences);
  };

  const updateCulturalSetting = (setting: string, value: any) => {
    try {
      localStorage.setItem(`lusotown-${setting}`, value.toString());
      
      switch (setting) {
        case 'cultural-region':
          setCulturalRegion(value);
          break;
        case 'quiet-hours-enabled':
          setQuietHoursEnabled(value);
          break;
        case 'priority-only':
          setPriorityOnly(value);
          break;
      }

      // Update backend preferences if subscribed
      if (isSubscribed && subscription) {
        updateSubscriptionPreferences(preferences);
      }
    } catch (error) {
      logger.error('Failed to update Lusophone cultural notification setting', error, {
        setting,
        value,
        area: 'messaging',
        culturalContext: 'lusophone',
        action: 'update_cultural_setting_error'
      });
    }
  };

  if (!isSupported) {
    return (
      <div className={`bg-yellow-50 border border-yellow-200 rounded-lg p-6 ${className}`}>
        <div className="flex items-start space-x-3">
          <BellOff className="h-8 w-8 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-800">
              {language === 'pt' ? 'Notificações Não Suportadas' : 'Notifications Not Supported'}
            </h3>
            <p className="text-yellow-700 mt-1">
              {language === 'pt' 
                ? 'O teu navegador não suporta notificações push. Tenta usar Chrome, Firefox ou Safari para receber alertas sobre eventos portugueses.' 
                : 'Your browser does not support push notifications. Try using Chrome, Firefox, or Safari to receive Portuguese cultural event alerts.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                Chrome ✓
              </span>
              <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                Firefox ✓
              </span>
              <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                Safari ✓
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main notification toggle */}
      <div className="bg-gradient-to-r from-red-50 via-white to-green-50 border-2 border-red-200 rounded-xl p-6 shadow-lg">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="relative">
              {isSubscribed ? (
                <div className="relative">
                  <Bell className="h-10 w-10 text-red-600" />
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full animate-pulse" />
                </div>
              ) : (
                <BellOff className="h-10 w-10 text-gray-400" />
              )}
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <span>{language === 'pt' ? 'Notificações Culturais Portuguesas' : 'Portuguese Cultural Notifications'}</span>
              <Flag className="h-5 w-5 text-red-600" />
            </h2>
            <p className="text-gray-600 mt-2">
              {language === 'pt' 
                ? 'Recebe alertas personalizados sobre eventos culturais portugueses, matches da comunidade lusófona, negócios PALOP, e celebrações do património.' 
                : 'Get personalized alerts about Portuguese cultural events, Lusophone community matches, PALOP businesses, and heritage celebrations.'}
            </p>
            
            <div className="mt-6 flex flex-wrap gap-3">
              {!isSubscribed ? (
                <button
                  onClick={requestPermissionAndSubscribe}
                  disabled={isLoading}
                  className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 shadow-md"
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
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={sendTestNotification}
                    disabled={testNotificationSent}
                    className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {testNotificationSent ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Smartphone className="h-5 w-5" />
                    )}
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
                    className="inline-flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
                  >
                    <BellOff className="h-5 w-5" />
                    <span>{language === 'pt' ? 'Desativar' : 'Disable'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick stats if subscribed */}
        {isSubscribed && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-red-600">{notificationStats.totalSent}</div>
                <div className="text-sm text-gray-600">
                  {language === 'pt' ? 'Recebidas' : 'Received'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{notificationStats.totalClicked}</div>
                <div className="text-sm text-gray-600">
                  {language === 'pt' ? 'Clicadas' : 'Clicked'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{Object.keys(preferences).filter(k => preferences[k]).length}</div>
                <div className="text-sm text-gray-600">
                  {language === 'pt' ? 'Categorias' : 'Categories'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{culturalRegion === 'all' ? '8' : '1'}</div>
                <div className="text-sm text-gray-600">
                  {language === 'pt' ? 'Regiões' : 'Regions'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detailed settings if subscribed */}
      {isSubscribed && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'preferences', label: language === 'pt' ? 'Preferências' : 'Preferences', icon: Settings },
                { id: 'stats', label: language === 'pt' ? 'Estatísticas' : 'Statistics', icon: Clock },
                { id: 'test', label: language === 'pt' ? 'Testar' : 'Test', icon: Gift }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-red-600 text-red-600'
                        : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                {/* Cultural Region Selector */}
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <Flag className="h-5 w-5 text-red-600" />
                    <span>{language === 'pt' ? 'Preferência Cultural' : 'Cultural Preference'}</span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'all', label: language === 'pt' ? 'Todos Lusófonos' : 'All Lusophone', flag: '🌍' },
                      { id: 'portugal', label: 'Portugal', flag: '🇵🇹' },
                      { id: 'brazil', label: 'Brasil', flag: '🇧🇷' },
                      { id: 'angola', label: 'Angola', flag: '🇦🇴' },
                      { id: 'cape-verde', label: 'Cabo Verde', flag: '🇨🇻' },
                      { id: 'mozambique', label: 'Moçambique', flag: '🇲🇿' },
                      { id: 'guinea-bissau', label: 'Guiné-Bissau', flag: '🇬🇼' },
                      { id: 'timor-leste', label: 'Timor-Leste', flag: '🇹🇱' }
                    ].map((region) => (
                      <button
                        key={region.id}
                        onClick={() => updateCulturalSetting('cultural-region', region.id)}
                        className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors text-sm ${
                          culturalRegion === region.id
                            ? 'border-red-600 bg-red-100 text-red-900'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <span className="text-lg">{region.flag}</span>
                        <span className="font-medium">{region.label}</span>
                        {culturalRegion === region.id && <Check className="h-4 w-4 text-red-600 ml-auto" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notification Categories */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-gray-600" />
                    <span>{language === 'pt' ? 'Categorias de Notificações' : 'Notification Categories'}</span>
                  </h3>
                  
                  <div className="space-y-4">
                    {Object.values(NOTIFICATION_CATEGORIES).map((category) => {
                      const isEnabled = preferences[category.id] ?? category.defaultEnabled;
                      const IconComponent = getIconForCategory(category.id);
                      
                      return (
                        <div key={category.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <IconComponent className="h-6 w-6" style={{ color: category.color }} />
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {language === 'pt' ? category.name.pt : category.name.en}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {language === 'pt' ? category.description.pt : category.description.en}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => updatePreference(category.id, !isEnabled)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              isEnabled ? 'bg-red-600' : 'bg-gray-300'
                            }`}
                          >
                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              isEnabled ? 'translate-x-6' : 'translate-x-0.5'
                            }`} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Advanced Settings */}
                <div>
                  <button
                    onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    <Settings className="h-5 w-5" />
                    <span>{language === 'pt' ? 'Definições Avançadas' : 'Advanced Settings'}</span>
                    <ChevronRight className={`h-4 w-4 transition-transform ${showAdvancedSettings ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {showAdvancedSettings && (
                    <div className="mt-4 space-y-4 pl-7">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">
                            {language === 'pt' ? 'Horas Silenciosas (22:00-08:00)' : 'Quiet Hours (10 PM - 8 AM)'}
                          </div>
                          <div className="text-sm text-gray-600">
                            {language === 'pt' 
                              ? 'Pausar notificações durante a noite (exceto emergências)'
                              : 'Pause notifications during night hours (except emergencies)'
                            }
                          </div>
                        </div>
                        <button
                          onClick={() => updateCulturalSetting('quiet-hours-enabled', !quietHoursEnabled)}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            quietHoursEnabled ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                            quietHoursEnabled ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">
                            {language === 'pt' ? 'Apenas Alta Prioridade' : 'High Priority Only'}
                          </div>
                          <div className="text-sm text-gray-600">
                            {language === 'pt' 
                              ? 'Receber apenas eventos culturais importantes e emergências'
                              : 'Receive only important cultural events and emergencies'
                            }
                          </div>
                        </div>
                        <button
                          onClick={() => updateCulturalSetting('priority-only', !priorityOnly)}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            priorityOnly ? 'bg-orange-600' : 'bg-gray-300'
                          }`}
                        >
                          <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                            priorityOnly ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Stats Tab */}
            {activeTab === 'stats' && (
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  {language === 'pt' ? 'Estatísticas de Notificações' : 'Notification Statistics'}
                </h3>
                
                {/* Stats overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{notificationStats.totalSent}</div>
                    <div className="text-blue-700">{language === 'pt' ? 'Total Recebidas' : 'Total Received'}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{notificationStats.totalClicked}</div>
                    <div className="text-green-700">{language === 'pt' ? 'Total Clicadas' : 'Total Clicked'}</div>
                  </div>
                </div>

                {/* By type breakdown */}
                {Object.keys(notificationStats.byType).length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">
                      {language === 'pt' ? 'Por Tipo de Notificação' : 'By Notification Type'}
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(notificationStats.byType).map(([type, count]) => (
                        <div key={type} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="capitalize">{type.replace('-', ' ')}</span>
                          <span className="font-medium">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent events */}
                {notificationStats.recentEvents.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">
                      {language === 'pt' ? 'Eventos Recentes' : 'Recent Events'}
                    </h4>
                    <div className="space-y-2">
                      {notificationStats.recentEvents.map((event, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-sm">{event.title}</div>
                            <div className="text-xs text-gray-600 capitalize">{event.type.replace('-', ' ')}</div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(event.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Test Tab */}
            {activeTab === 'test' && (
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  {language === 'pt' ? 'Testar Notificações' : 'Test Notifications'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {NOTIFICATION_TEMPLATES.slice(0, 6).map((template) => (
                    <div key={template.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{getEmojiForType(template.type)}</div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {language === 'pt' ? template.title.pt : template.title.en}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {language === 'pt' ? template.body.pt : template.body.en}
                          </p>
                          <button
                            onClick={() => sendTestNotification()}
                            className="mt-3 text-sm text-red-600 hover:text-red-700 font-medium"
                          >
                            {language === 'pt' ? 'Testar →' : 'Test →'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper functions
function getIconForCategory(categoryId: string) {
  switch (categoryId) {
    case 'cultural': return Calendar;
    case 'community': return Heart;
    case 'business': return Briefcase;
    case 'heritage': return Flag;
    case 'ai-insights': return Brain;
    case 'emergency': return AlertTriangle;
    default: return Bell;
  }
}

function getEmojiForType(type: string): string {
  switch (type) {
    case 'fado-night': return '🎸';
    case 'festa': return '🎉';
    case 'cultural-event': return '🎭';
    case 'community-match': return '💝';
    case 'restaurant-special': return '🍽️';
    case 'heritage-reminder': return '🇵🇹';
    case 'lusobot-insight': return '🧠';
    case 'emergency': return '🚨';
    default: return '📱';
  }
}