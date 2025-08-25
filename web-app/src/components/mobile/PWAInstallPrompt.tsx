"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DevicePhoneMobileIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
  SparklesIcon,
  HeartIcon,
  StarIcon,
  CheckCircleIcon,
  DeviceTabletIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';

// PWA Install Interface
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
    appinstalled: Event;
  }
}

// Device detection
const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop';
  
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent);
  
  if (isTablet) return 'tablet';
  if (isMobile) return 'mobile';
  return 'desktop';
};

// Platform-specific install instructions
const getInstallInstructions = (language: string, deviceType: string, browser: string) => {
  const isPortuguese = language === 'pt';
  
  const instructions = {
    ios: {
      safari: {
        title: isPortuguese ? 'Adicionar ao Ecrã Principal' : 'Add to Home Screen',
        steps: isPortuguese 
          ? ['Toque no botão partilhar', 'Selecione "Adicionar ao Ecrã Principal"', 'Toque em "Adicionar"']
          : ['Tap the share button', 'Select "Add to Home Screen"', 'Tap "Add"'],
        icon: '📱'
      }
    },
    android: {
      chrome: {
        title: isPortuguese ? 'Instalar App' : 'Install App',
        steps: isPortuguese 
          ? ['Toque em "Adicionar ao ecrã principal"', 'Confirme a instalação']
          : ['Tap "Add to home screen"', 'Confirm installation'],
        icon: '🤖'
      }
    },
    desktop: {
      chrome: {
        title: isPortuguese ? 'Instalar LusoTown' : 'Install LusoTown',
        steps: isPortuguese 
          ? ['Clique no ícone de instalação', 'Confirme a instalação']
          : ['Click the install icon', 'Confirm installation'],
        icon: '💻'
      }
    }
  };

  return instructions;
};

interface PWAInstallPromptProps {
  className?: string;
  showBenefits?: boolean;
  autoShow?: boolean;
  onInstall?: () => void;
  onDismiss?: () => void;
}

export function PWAInstallPrompt({
  className = '',
  showBenefits = true,
  autoShow = true,
  onInstall,
  onDismiss
}: PWAInstallPromptProps) {
  const { language, t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [isDismissed, setIsDismissed] = useState(false);

  // Check if app is already installed
  const checkIfInstalled = useCallback(() => {
    if (typeof window === 'undefined') return false;
    
    // Check for standalone display mode (PWA installed)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return true;
    }
    
    // Check for iOS home screen app
    if ((navigator as any).standalone === true) {
      return true;
    }
    
    return false;
  }, []);

  // Initialize PWA install prompt
  useEffect(() => {
    setDeviceType(getDeviceType());
    setIsInstalled(checkIfInstalled());

    // Check if user previously dismissed
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const daysSince = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
      
      // Show again after 7 days
      if (daysSince < 7) {
        setIsDismissed(true);
        return;
      }
    }

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      
      // Save the event for later use
      setDeferredPrompt(e);
      
      if (autoShow && !isDismissed) {
        // Show after a delay to not interrupt initial experience
        setTimeout(() => {
          setIsVisible(true);
        }, 10000); // 10 seconds
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsVisible(false);
      onInstall?.();
      
      // Show success message
      const announcement = language === 'pt'
        ? 'LusoTown foi instalado com sucesso!'
        : 'LusoTown installed successfully!';
        
      const announcer = document.createElement('div');
      announcer.setAttribute('aria-live', 'polite');
      announcer.className = 'sr-only';
      announcer.textContent = announcement;
      document.body.appendChild(announcer);
      setTimeout(() => document.body.removeChild(announcer), 2000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [autoShow, checkIfInstalled, isDismissed, language, onInstall]);

  // Handle install click
  const handleInstallClick = useCallback(async () => {
    if (!deferredPrompt) return;
    
    setIsInstalling(true);
    
    try {
      // Show the install prompt
      await deferredPrompt.prompt();
      
      // Wait for user choice
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted PWA install');
      } else {
        console.log('User dismissed PWA install');
      }
      
      // Clear the deferred prompt
      setDeferredPrompt(null);
      setIsVisible(false);
    } catch (error) {
      console.error('Error during PWA installation:', error);
    } finally {
      setIsInstalling(false);
    }
  }, [deferredPrompt]);

  // Handle dismiss
  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    setIsDismissed(true);
    
    // Remember dismissal for 7 days
    localStorage.setItem('pwa-install-dismissed', new Date().toISOString());
    
    onDismiss?.();
  }, [onDismiss]);

  // Manual show (for button triggers)
  const showPrompt = useCallback(() => {
    if (isInstalled || isDismissed) return;
    setIsVisible(true);
  }, [isInstalled, isDismissed]);

  // Don't show if installed or dismissed
  if (isInstalled || (isDismissed && !isVisible)) {
    return null;
  }

  const DeviceIcon = deviceType === 'mobile' ? DevicePhoneMobileIcon : 
                   deviceType === 'tablet' ? DeviceTabletIcon : 
                   ComputerDesktopIcon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-green-600 p-8 text-white text-center">
              {/* Close button */}
              <button
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
                onClick={handleDismiss}
                aria-label={language === 'pt' ? 'Fechar' : 'Close'}
              >
                <XMarkIcon className="w-5 h-5" />
              </button>

              {/* Portuguese flag pattern background */}
              <div className="absolute inset-0 opacity-20">
                <div 
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>

              <div className="relative z-10">
                <motion.div
                  className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <DeviceIcon className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-2xl font-bold mb-2">
                  {language === 'pt' 
                    ? 'Instalar LusoTown'
                    : 'Install LusoTown'
                  }
                </h2>

                <p className="text-white/90 text-sm">
                  {language === 'pt'
                    ? 'A sua comunidade portuguesa no bolso'
                    : 'Your Portuguese community in your pocket'
                  }
                </p>
              </div>
            </div>

            {/* Benefits */}
            {showBenefits && (
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  {language === 'pt' ? 'Porquê instalar?' : 'Why install?'}
                </h3>

                <div className="space-y-3">
                  {[
                    {
                      icon: SparklesIcon,
                      title: language === 'pt' ? 'Acesso mais rápido' : 'Faster access',
                      description: language === 'pt' 
                        ? 'Lance directamente do seu ecrã principal'
                        : 'Launch directly from your home screen'
                    },
                    {
                      icon: HeartIcon,
                      title: language === 'pt' ? 'Funciona offline' : 'Works offline',
                      description: language === 'pt'
                        ? 'Veja eventos e contactos sem internet'
                        : 'View events and contacts without internet'
                    },
                    {
                      icon: StarIcon,
                      title: language === 'pt' ? 'Notificações' : 'Notifications',
                      description: language === 'pt'
                        ? 'Receba alertas sobre novos eventos'
                        : 'Get alerts about new events'
                    }
                  ].map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                        <benefit.icon className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          {benefit.title}
                        </h4>
                        <p className="text-gray-600 text-xs">
                          {benefit.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="p-6 pt-0">
              <div className="space-y-3">
                {/* Install button */}
                <motion.button
                  className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-3"
                  onClick={handleInstallClick}
                  disabled={isInstalling || !deferredPrompt}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isInstalling ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      {language === 'pt' ? 'A instalar...' : 'Installing...'}
                    </>
                  ) : (
                    <>
                      <ArrowDownTrayIcon className="w-5 h-5" />
                      {language === 'pt' ? 'Instalar Agora' : 'Install Now'}
                    </>
                  )}
                </motion.button>

                {/* Later button */}
                <button
                  className="w-full text-gray-600 font-medium py-2 px-4 rounded-xl hover:bg-gray-100 transition-colors"
                  onClick={handleDismiss}
                >
                  {language === 'pt' ? 'Talvez mais tarde' : 'Maybe later'}
                </button>
              </div>

              {/* Trust indicators */}
              <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <CheckCircleIcon className="w-3 h-3 text-green-500" />
                    <span>{language === 'pt' ? 'Seguro' : 'Safe'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircleIcon className="w-3 h-3 text-green-500" />
                    <span>{language === 'pt' ? 'Rápido' : 'Fast'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircleIcon className="w-3 h-3 text-green-500" />
                    <span>{language === 'pt' ? 'Confiável' : 'Reliable'}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Compact PWA Install Button (for headers/footers)
interface PWAInstallButtonProps {
  variant?: 'button' | 'banner' | 'floating';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showText?: boolean;
}

export function PWAInstallButton({
  variant = 'button',
  size = 'medium',
  className = '',
  showText = true
}: PWAInstallButtonProps) {
  const { language } = useLanguage();
  const [isInstalled, setIsInstalled] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if app is installed
    const checkInstalled = () => {
      if (typeof window === 'undefined') return false;
      
      return window.matchMedia('(display-mode: standalone)').matches ||
             (navigator as any).standalone === true;
    };

    setIsInstalled(checkInstalled());
  }, []);

  if (isInstalled) return null;

  const sizeClasses = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-3 text-base',
    large: 'px-6 py-4 text-lg'
  };

  const variantClasses = {
    button: 'bg-red-600 hover:bg-red-700 text-white rounded-xl',
    banner: 'bg-gradient-to-r from-red-50 to-green-50 border border-red-200 text-red-700 rounded-xl',
    floating: 'bg-white shadow-lg hover:shadow-xl border border-gray-200 text-gray-700 rounded-full'
  };

  return (
    <>
      <motion.button
        className={`
          inline-flex items-center gap-2 font-medium transition-all
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${className}
        `}
        onClick={() => setShowPrompt(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowDownTrayIcon className="w-4 h-4" />
        {showText && (
          <span>
            {language === 'pt' ? 'Instalar App' : 'Install App'}
          </span>
        )}
      </motion.button>

      <PWAInstallPrompt
        isVisible={showPrompt}
        onDismiss={() => setShowPrompt(false)}
        autoShow={false}
      />
    </>
  );
}

export default PWAInstallPrompt;