'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import PWAManager from '@/components/PWAManager';
import MobileCameraIntegration from '@/components/MobileCameraIntegration';
import MobileGeolocationServices from '@/components/MobileGeolocationServices';
import PushNotificationSystem from '@/components/PushNotificationSystem';
import PerformanceOptimization from '@/components/PerformanceOptimization';
import AccessibilityFeatures from '@/components/AccessibilityFeatures';
import { 
  Smartphone, 
  Camera, 
  MapPin, 
  Bell, 
  Zap, 
  Eye,
  Download,
  Wifi,
  Settings,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

export default function PWAFeaturesPage() {
  const { language, t } = useLanguage();
  
  // Feature demonstration states
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [pwaSupported, setPwaSupported] = useState(false);
  const [demoProgress, setDemoProgress] = useState({
    camera: false,
    location: false,
    notifications: false,
    performance: false,
    accessibility: false
  });

  useEffect(() => {
    checkPWASupport();
  }, []);

  const checkPWASupport = () => {
    const supported = 'serviceWorker' in navigator && 
                     'PushManager' in window && 
                     'Notification' in window &&
                     'geolocation' in navigator;
    setPwaSupported(supported);
  };

  const demoFeatures = [
    {
      id: 'pwa-installation',
      title: language === 'pt' ? 'Instalação PWA' : 'PWA Installation',
      titlePortuguese: 'Instalação PWA',
      description: language === 'pt' 
        ? 'Instala a LusoTown como app nativo no teu dispositivo para acesso rápido à comunidade portuguesa'
        : 'Install LusoTown as a native app on your device for quick access to the Portuguese community',
      icon: Download,
      color: 'blue',
      component: PWAManager
    },
    {
      id: 'camera-integration',
      title: language === 'pt' ? 'Integração da Câmara' : 'Camera Integration',
      titlePortuguese: 'Integração da Câmara',
      description: language === 'pt'
        ? 'Captura fotos de eventos portugueses, scanner QR de negócios e partilha momentos culturais'
        : 'Capture photos of Portuguese events, scan business QR codes, and share cultural moments',
      icon: Camera,
      color: 'green',
      component: MobileCameraIntegration
    },
    {
      id: 'geolocation-services',
      title: language === 'pt' ? 'Serviços de Localização' : 'Geolocation Services',
      titlePortuguese: 'Serviços de Localização',
      description: language === 'pt'
        ? 'Descobre portugueses próximos, negócios locais e eventos culturais baseados na tua localização'
        : 'Discover nearby Portuguese speakers, local businesses, and cultural events based on your location',
      icon: MapPin,
      color: 'red',
      component: MobileGeolocationServices
    },
    {
      id: 'push-notifications',
      title: language === 'pt' ? 'Notificações Push' : 'Push Notifications',
      titlePortuguese: 'Notificações Push',
      description: language === 'pt'
        ? 'Recebe alertas sobre eventos culturais, matches da comunidade e atualizações importantes'
        : 'Receive alerts about cultural events, community matches, and important updates',
      icon: Bell,
      color: 'purple',
      component: PushNotificationSystem
    },
    {
      id: 'performance',
      title: language === 'pt' ? 'Otimização de Performance' : 'Performance Optimization',
      titlePortuguese: 'Otimização de Performance',
      description: language === 'pt'
        ? 'Carregamento rápido de conteúdo português, cache inteligente e modo de dados limitados'
        : 'Fast loading of Portuguese content, intelligent caching, and data-saving mode',
      icon: Zap,
      color: 'yellow',
      component: PerformanceOptimization
    },
    {
      id: 'accessibility',
      title: language === 'pt' ? 'Funcionalidades de Acessibilidade' : 'Accessibility Features',
      titlePortuguese: 'Funcionalidades de Acessibilidade',
      description: language === 'pt'
        ? 'Leitor de ecrã em português, controlo por voz, navegação por teclado e alto contraste'
        : 'Portuguese screen reader, voice control, keyboard navigation, and high contrast',
      icon: Eye,
      color: 'indigo',
      component: AccessibilityFeatures
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    green: 'bg-green-50 border-green-200 text-green-800',
    red: 'bg-red-50 border-red-200 text-red-800',
    purple: 'bg-purple-50 border-purple-200 text-purple-800',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800'
  };

  const iconColorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    purple: 'text-purple-600',
    yellow: 'text-yellow-600',
    indigo: 'text-indigo-600'
  };

  const buttonColorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    red: 'bg-red-600 hover:bg-red-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
    yellow: 'bg-yellow-600 hover:bg-yellow-700',
    indigo: 'bg-indigo-600 hover:bg-indigo-700'
  };

  const toggleDemo = (featureId: string) => {
    if (activeDemo === featureId) {
      setActiveDemo(null);
    } else {
      setActiveDemo(featureId);
      markFeatureAsExplored(featureId);
    }
  };

  const markFeatureAsExplored = (featureId: string) => {
    if (featureId === 'camera-integration') {
      setDemoProgress(prev => ({ ...prev, camera: true }));
    } else if (featureId === 'geolocation-services') {
      setDemoProgress(prev => ({ ...prev, location: true }));
    } else if (featureId === 'push-notifications') {
      setDemoProgress(prev => ({ ...prev, notifications: true }));
    } else if (featureId === 'performance') {
      setDemoProgress(prev => ({ ...prev, performance: true }));
    } else if (featureId === 'accessibility') {
      setDemoProgress(prev => ({ ...prev, accessibility: true }));
    }
  };

  const completedFeatures = Object.values(demoProgress).filter(Boolean).length;
  const progressPercentage = (completedFeatures / Object.keys(demoProgress).length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
              <Smartphone className="h-16 w-16" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === 'pt' ? 'LusoTown PWA' : 'LusoTown PWA'}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            {language === 'pt'
              ? 'Experiência móvel completa para a comunidade portuguesa em Londres. App nativo, câmara, localização, notificações e muito mais.'
              : 'Complete mobile experience for the Portuguese community in London. Native app experience, camera, location, notifications, and much more.'
            }
          </p>
          
          {/* PWA Support Status */}
          <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full ${
            pwaSupported 
              ? 'bg-green-500 bg-opacity-20 border border-green-300' 
              : 'bg-red-500 bg-opacity-20 border border-red-300'
          }`}>
            {pwaSupported ? (
              <>
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">
                  {language === 'pt' ? 'PWA Totalmente Suportado' : 'PWA Fully Supported'}
                </span>
              </>
            ) : (
              <>
                <Settings className="h-5 w-5" />
                <span className="font-semibold">
                  {language === 'pt' ? 'Suporte PWA Limitado' : 'Limited PWA Support'}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {language === 'pt' ? 'Progresso da Exploração' : 'Exploration Progress'}
            </h2>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold text-gray-900">
                {completedFeatures}/5
              </span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-red-600 to-green-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <p className="text-gray-600">
            {language === 'pt'
              ? `Explora todas as funcionalidades PWA da comunidade portuguesa. ${completedFeatures === 5 ? 'Parabéns! Completaste toda a experiência.' : `${5 - completedFeatures} funcionalidades por explorar.`}`
              : `Explore all PWA features for the Portuguese community. ${completedFeatures === 5 ? 'Congratulations! You\'ve completed the entire experience.' : `${5 - completedFeatures} features left to explore.`}`
            }
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid gap-8 md:gap-12">
          {demoFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = activeDemo === feature.id;
            const isCompleted = feature.id === 'camera-integration' ? demoProgress.camera :
                             feature.id === 'geolocation-services' ? demoProgress.location :
                             feature.id === 'push-notifications' ? demoProgress.notifications :
                             feature.id === 'performance' ? demoProgress.performance :
                             feature.id === 'accessibility' ? demoProgress.accessibility : false;

            return (
              <div key={feature.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Feature Header */}
                <div className={`p-8 border-l-4 ${colorClasses[feature.color as keyof typeof colorClasses]} border-l-4`}>
                  <div className="flex items-start space-x-6">
                    <div className={`flex-shrink-0 p-3 bg-white rounded-xl shadow-sm`}>
                      <Icon className={`h-8 w-8 ${iconColorClasses[feature.color as keyof typeof iconColorClasses]}`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {language === 'pt' ? feature.titlePortuguese : feature.title}
                        </h3>
                        {isCompleted && (
                          <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            <CheckCircle className="h-4 w-4" />
                            <span>{language === 'pt' ? 'Explorado' : 'Explored'}</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        {feature.description}
                      </p>
                      
                      <button
                        onClick={() => toggleDemo(feature.id)}
                        className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 ${buttonColorClasses[feature.color as keyof typeof buttonColorClasses]}`}
                      >
                        <span>
                          {isActive 
                            ? (language === 'pt' ? 'Ocultar Demo' : 'Hide Demo')
                            : (language === 'pt' ? 'Ver Demo' : 'View Demo')
                          }
                        </span>
                        <ArrowRight className={`h-5 w-5 transition-transform ${isActive ? 'rotate-90' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Feature Demo */}
                {isActive && (
                  <div className="p-8 bg-gray-50 border-t border-gray-200">
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {language === 'pt' ? 'Demonstração Interativa' : 'Interactive Demo'}
                      </h4>
                      <p className="text-gray-600">
                        {language === 'pt' 
                          ? 'Experimenta esta funcionalidade diretamente na plataforma LusoTown'
                          : 'Try this feature directly on the LusoTown platform'
                        }
                      </p>
                    </div>
                    
                    {/* Render the specific component */}
                    {feature.id === 'pwa-installation' && <PWAManager />}
                    {feature.id === 'camera-integration' && (
                      <MobileCameraIntegration
                        mode="cultural"
                        onCapture={(imageData) => console.log('Photo captured:', imageData)}
                        onQRScan={(data) => console.log('QR scanned:', data)}
                      />
                    )}
                    {feature.id === 'geolocation-services' && <MobileGeolocationServices />}
                    {feature.id === 'push-notifications' && <PushNotificationSystem />}
                    {feature.id === 'performance' && <PerformanceOptimization />}
                    {feature.id === 'accessibility' && <AccessibilityFeatures />}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Final CTA Section */}
      {completedFeatures === 5 && (
        <div className="bg-gradient-to-r from-green-600 to-red-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'pt' ? '🎉 Parabéns!' : '🎉 Congratulations!'}
            </h2>
            <p className="text-xl mb-8">
              {language === 'pt'
                ? 'Exploraste todas as funcionalidades PWA da LusoTown! Agora podes desfrutar da experiência completa da comunidade portuguesa em Londres.'
                : 'You\'ve explored all LusoTown PWA features! Now you can enjoy the complete Portuguese community experience in London.'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="inline-flex items-center space-x-2 bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <span>{language === 'pt' ? 'Voltar à Comunidade' : 'Back to Community'}</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              
              <a
                href="/events"
                className="inline-flex items-center space-x-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                <span>{language === 'pt' ? 'Ver Eventos' : 'View Events'}</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}