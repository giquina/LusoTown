"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { WifiIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Offline Page for LusoTown Portuguese-speaking Community
 * 
 * Displays when users are offline with Portuguese cultural styling
 * and helpful guidance to reconnect to the community.
 */
export default function OfflinePage() {
  const { t, language } = useLanguage();
  const [isOnline, setIsOnline] = useState(false);
  const [retryAttempts, setRetryAttempts] = useState(0);

  useEffect(() => {
    // Check if we're online
    const updateOnlineStatus = () => {
      setIsOnline(typeof navigator !== 'undefined' ? navigator.onLine : true);
    };

    // Listen for online/offline events
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Initial check
    updateOnlineStatus();

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const handleRetry = async () => {
    setRetryAttempts(prev => prev + 1);
    
    try {
      // Test connectivity by trying to fetch a small resource
      const response = await fetch('/manifest.json', { 
        method: 'HEAD',
        cache: 'no-cache'
      });
      
      if (response.ok) {
        // We're back online, reload the page
        window.location.reload();
      }
    } catch (error) {
      // Still offline, show retry count
      console.log('Still offline, retry attempt:', retryAttempts + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 flex items-center justify-center p-4">
      {/* Cultural Elements Background */}
      <div className="absolute inset-0 overflow-hidden">
        {['🇵🇹', '🇧🇷', '🇨🇻', '🇦🇴', '🇲🇿'].map((flag, index) => (
          <motion.div
            key={index}
            className="absolute text-6xl opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 2,
              repeat: Infinity,
              delay: index * 1.2,
            }}
          >
            {flag}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-md w-full">
        <motion.div
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center border border-white/20"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Icon Animation */}
          <motion.div
            className="mb-6"
            animate={isOnline ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isOnline ? (
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <WifiIcon className="w-8 h-8 text-green-600" />
              </div>
            ) : (
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto relative">
                <WifiIcon className="w-8 h-8 text-gray-400" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-0.5 bg-red-500 rotate-45"></div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {isOnline 
              ? (language === 'pt' ? 'Reconectado!' : 'Back Online!')
              : (language === 'pt' ? 'Você Está Offline' : 'You\'re Offline')
            }
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-2 leading-relaxed">
            {isOnline 
              ? (language === 'pt' 
                  ? 'Conectado novamente à comunidade portuguesa. Recarregando...'
                  : 'Reconnected to the Portuguese community. Refreshing...')
              : (language === 'pt' 
                  ? 'Não consegues conectar à comunidade de falantes de português. Verifica a tua ligação à internet.'
                  : 'Can\'t connect to the Portuguese-speaking community right now. Check your internet connection and try again.')
            }
          </p>

          {/* Portuguese Cultural Message */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-primary-800 italic">
              {language === 'pt' 
                ? '"A saudade é uma palavra que não se traduz, mas que se sente até quando estamos desconectados."'
                : '"Even when disconnected, the Portuguese community\'s saudade keeps us united."'
              }
            </p>
          </div>

          {/* Retry Button */}
          {!isOnline && (
            <motion.button
              onClick={handleRetry}
              className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isOnline}
            >
              <ArrowPathIcon 
                className={`w-5 h-5 ${retryAttempts > 0 ? 'animate-spin' : ''}`} 
              />
              <span>
                {language === 'pt' ? 'Tentar Novamente' : 'Try Again'}
                {retryAttempts > 0 && ` (${retryAttempts})`}
              </span>
            </motion.button>
          )}

          {/* Auto-refresh when online */}
          {isOnline && (
            <div className="flex items-center justify-center gap-2 text-green-600">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">
                {language === 'pt' ? 'Recarregando...' : 'Refreshing...'}
              </span>
            </div>
          )}

          {/* Offline Tips */}
          {!isOnline && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                {language === 'pt' ? 'Enquanto estás offline:' : 'While you\'re offline:'}
              </h3>
              <ul className="text-xs text-gray-600 space-y-1 text-left">
                <li>• {language === 'pt' 
                    ? 'Podes navegar pelos eventos guardados'
                    : 'You can browse cached events'}</li>
                <li>• {language === 'pt' 
                    ? 'Ver negócios portugueses guardados'
                    : 'View saved Portuguese businesses'}</li>
                <li>• {language === 'pt' 
                    ? 'Ler conteúdo cultural guardado'
                    : 'Read saved cultural content'}</li>
              </ul>
            </div>
          )}

          {/* Portuguese Cultural Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-primary-600">
              <span className="text-lg">🇵🇹</span>
              <span className="text-sm font-medium">LusoTown</span>
              <span className="text-lg">🇬🇧</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {language === 'pt' 
                ? 'Unidos pela língua, mesmo offline'
                : 'United by language, even offline'}
            </p>
          </div>
        </motion.div>

        {/* Network Status Indicator */}
        <div className="mt-4 text-center">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
            isOnline 
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'
            }`}></div>
            {isOnline 
              ? (language === 'pt' ? 'Online' : 'Online')
              : (language === 'pt' ? 'Offline' : 'Offline')
            }
          </div>
        </div>
      </div>

      {/* Auto-reload when back online */}
      {isOnline && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            `,
          }}
        />
      )}
    </div>
  );
}