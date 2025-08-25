"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useNotification } from "@/context/NotificationContext";
import {
  Download,
  Smartphone,
  Bell,
  BellOff,
  Wifi,
  WifiOff,
} from "lucide-react";
import logger from "@/utils/logger";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAManagerProps {
  className?: string;
}

export default function PWAManager({ className = "" }: PWAManagerProps) {
  const { language, t } = useLanguage();
  const { addNotification } = useNotification();

  // PWA states
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationPermission, setNotificationPermission] =
    useState<NotificationPermission>("default");

  // Service Worker states
  const [swRegistration, setSwRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const [swUpdateAvailable, setSwUpdateAvailable] = useState(false);
  const [swInstalling, setSwInstalling] = useState(false);

  // Handlers and helpers

  const initializePWA = async () => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "imports",
        });

        setSwRegistration(registration);
        logger.info("[PWA] Service Worker registered:", registration);

        // Check for updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            setSwInstalling(true);
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                setSwUpdateAvailable(true);
                setSwInstalling(false);
                showUpdateNotification();
              }
            });
          }
        });

        // Listen for controlling service worker changes
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          window.location.reload();
        });
      } catch (error) {
        logger.error("[PWA] Service Worker registration failed:", error);
      }
    }

    // Setup install prompt listener
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check notification permission
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission);
      setNotificationsEnabled(Notification.permission === "granted");
    }

    // Setup push notifications if supported
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setupPushNotifications();
    }
  };

  const handleBeforeInstallPrompt = (e: Event) => {
    e.preventDefault();
    setInstallPrompt(e as BeforeInstallPromptEvent);
    setIsInstallable(true);

    // Show install banner after delay for Lusophone cultural context
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
          type: "system_update",
          category: "system",
          title: language === "pt" ? "Conectado!" : "Back Online!",
          message:
            language === "pt"
              ? "Ligação à comunidade de falantes de português restaurada"
              : "Connection to Portuguese-speaking community restored",
          userId: "current-user",
          priority: "medium",
        });
      } else {
        addNotification({
          type: "system_update",
          category: "system",
          title: language === "pt" ? "Sem Ligação" : "Offline",
          message:
            language === "pt"
              ? "Alguns conteúdos ficam disponíveis offline"
              : "Some content remains available offline",
          userId: "current-user",
          priority: "medium",
        });
      }
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
  };

  const checkInstallStatus = () => {
    // Check if app is installed
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.matchMedia("(display-mode: fullscreen)").matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsInstalled(true);
      setIsInstallable(false);
    }
  };

  const installApp = async () => {
    if (!installPrompt) return;

    try {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;

      if (choice.outcome === "accepted") {
        logger.info("[PWA] App installation accepted");
        addNotification({
          type: "system_update",
          category: "system",
          title: language === "pt" ? "App Instalado!" : "App Installed!",
          message:
            language === "pt"
              ? "LusoTown agora no teu dispositivo"
              : "LusoTown is now on your device",
          userId: "current-user",
          priority: "medium",
        });
      } else {
        logger.info("[PWA] App installation dismissed");
      }

      setInstallPrompt(null);
      setIsInstallable(false);
    } catch (error) {
      logger.error("[PWA] Installation error:", error);
    }
  };

  const setupPushNotifications = async () => {
    if (!swRegistration) return;

    try {
      // Check if push notifications are supported
      if (!("PushManager" in window)) {
        logger.warn("[PWA] Push notifications not supported");
        return;
      }

      // Get existing subscription
      const existingSubscription =
        await swRegistration.pushManager.getSubscription();

      if (existingSubscription) {
        logger.info("[PWA] Existing push subscription found");
        // Send subscription to backend
        await sendSubscriptionToBackend(existingSubscription);
      }
    } catch (error) {
      logger.error("[PWA] Push notification setup error:", error);
    }
  };

  const enableNotifications = async () => {
    if (!("Notification" in window)) {
      addNotification({
        type: "system_update",
        category: "system",
        title: language === "pt" ? "Não Suportado" : "Not Supported",
        message:
          language === "pt"
            ? "Notificações não são suportadas neste navegador"
            : "Notifications are not supported in this browser",
        userId: "current-user",
        priority: "high",
      });
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);

      if (permission === "granted") {
        setNotificationsEnabled(true);
        await subscribeToPushNotifications();

        addNotification({
          type: "system_update",
          category: "system",
          title:
            language === "pt"
              ? "Notificações Ativadas!"
              : "Notifications Enabled!",
          message:
            language === "pt"
              ? "Recebe alertas de eventos portugueses"
              : "Get alerts about Lusophone cultural events",
          userId: "current-user",
          priority: "medium",
        });

        // Show welcome notification
        showWelcomeNotification();
      } else {
        addNotification({
          type: "system_update",
          category: "system",
          title:
            language === "pt" ? "Notificações Negadas" : "Notifications Denied",
          message:
            language === "pt"
              ? "Podes ativar nas definições do navegador"
              : "You can enable them in browser settings",
          userId: "current-user",
          priority: "medium",
        });
      }
    } catch (error) {
      logger.error("[PWA] Notification permission error:", error);
    }
  };

  // Convert VAPID public key from URL-safe base64 to Uint8Array
  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData =
      typeof window !== "undefined"
        ? window.atob(base64)
        : Buffer.from(base64, "base64").toString("binary");
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const subscribeToPushNotifications = async () => {
    if (!swRegistration || !("PushManager" in window)) return;

    try {
      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      const appServerKey = vapidKey ? urlBase64ToUint8Array(vapidKey) : null;
      const subscription = await swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: appServerKey,
      });

      logger.info("[PWA] Push subscription created:", subscription);
      await sendSubscriptionToBackend(subscription);
    } catch (error) {
      logger.error("[PWA] Push subscription error:", error);
    }
  };

  const sendSubscriptionToBackend = async (subscription: PushSubscription) => {
    try {
      await fetch("/api/push-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription,
          language,
          preferences: {
            culturalEvents: true,
            communityMatches: true,
            businessUpdates: true,
            festivalReminders: true,
          },
        }),
      });
    } catch (error) {
      logger.error("[PWA] Failed to send subscription to backend:", error);
    }
  };

  const showInstallBanner = () => {
    addNotification({
      type: "system_update",
      category: "system",
      title: language === "pt" ? "Instalar App" : "Install App",
      message:
        language === "pt"
          ? "Adiciona LusoTown ao teu ecrã inicial"
          : "Add LusoTown to your home screen",
      userId: "current-user",
      priority: "low",
      actionUrl: "/",
      actionLabel: language === "pt" ? "Instalar" : "Install",
    });
  };

  const showUpdateNotification = () => {
    addNotification({
      type: "system_update",
      category: "system",
      title: language === "pt" ? "Atualização Disponível" : "Update Available",
      message:
        language === "pt"
          ? "Nova versão da comunidade de falantes de português — atualiza a página"
          : "New version of the Portuguese-speaking community — refresh the page",
      userId: "current-user",
      priority: "high",
      actionUrl: "/",
      actionLabel: language === "pt" ? "Atualizar" : "Update",
    });
  };

  const showWelcomeNotification = () => {
    if ("Notification" in window && Notification.permission === "granted") {
      const notification = new Notification(
        language === "pt"
          ? "🇵🇹 Bem-vindo à LusoTown!"
          : "🇵🇹 Welcome to LusoTown!",
        {
          body:
            language === "pt"
              ? "A tua comunidade de falantes de português em Londres está aqui!"
              : "Your Portuguese-speaking community in London is here!",
          icon: "/icons/icon-192x192.png",
          badge: "/icons/badge-72x72.png",
          tag: "welcome",
          requireInteraction: false,
          data: {
            url: "/",
          },
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
      type: "system_update",
      category: "system",
      title:
        language === "pt"
          ? "Notificações Desativadas"
          : "Notifications Disabled",
      message:
        language === "pt"
          ? "Podes reativar a qualquer momento"
          : "You can re-enable them anytime",
      userId: "current-user",
      priority: "low",
    });
  };

  // Initialize on mount
  useEffect(() => {
    initializePWA();
    setupNetworkListener();
    checkInstallStatus();

    return () => {
      // Cleanup listeners if needed
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isInstalled) {
    return (
      <div className={`flex items-center space-x-4 ${className}`}>
        {/* Network Status Indicator */}
        <div
          className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
            isOnline
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {isOnline ? (
            <>
              <Wifi className="h-4 w-4" />
              <span>{language === "pt" ? "Online" : "Online"}</span>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4" />
              <span>{language === "pt" ? "Offline" : "Offline"}</span>
            </>
          )}
        </div>

        {/* Notification Toggle */}
        <button
          onClick={
            notificationsEnabled ? disableNotifications : enableNotifications
          }
          className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm transition-colors ${
            notificationsEnabled
              ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {notificationsEnabled ? (
            <>
              <Bell className="h-4 w-4" />
              <span>{language === "pt" ? "Ativadas" : "Enabled"}</span>
            </>
          ) : (
            <>
              <BellOff className="h-4 w-4" />
              <span>{language === "pt" ? "Desativadas" : "Disabled"}</span>
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
                {language === "pt"
                  ? "Instalar App LusoTown"
                  : "Install LusoTown App"}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {language === "pt"
                  ? "Acesso rápido à comunidade de falantes de português no teu dispositivo"
                  : "Quick access to the Portuguese-speaking community on your device"}
              </p>
              <div className="mt-3 flex space-x-3">
                <button
                  onClick={installApp}
                  className="inline-flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>{language === "pt" ? "Instalar" : "Install"}</span>
                </button>
                <button
                  onClick={() => {
                    setIsInstallable(false);
                    setInstallPrompt(null);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2"
                >
                  {language === "pt" ? "Agora não" : "Not now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enable Notifications */}
      {notificationPermission === "default" && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Bell className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900">
                {language === "pt"
                  ? "Ativar Notificações"
                  : "Enable Notifications"}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {language === "pt"
                  ? "Recebe alertas sobre eventos portugueses e novos contactos"
                  : "Get alerts about Lusophone cultural events and new connections"}
              </p>
              <div className="mt-3 flex space-x-3">
                <button
                  onClick={enableNotifications}
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <Bell className="h-4 w-4" />
                  <span>{language === "pt" ? "Ativar" : "Enable"}</span>
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
                {language === "pt"
                  ? "Atualização Disponível"
                  : "Update Available"}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {language === "pt"
                  ? "Nova versão com melhorias para a comunidade de falantes de português"
                  : "New version with improvements for the Portuguese-speaking community"}
              </p>
              <div className="mt-3">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>
                    {language === "pt" ? "Atualizar Agora" : "Update Now"}
                  </span>
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
              {language === "pt"
                ? "A instalar atualização..."
                : "Installing update..."}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
