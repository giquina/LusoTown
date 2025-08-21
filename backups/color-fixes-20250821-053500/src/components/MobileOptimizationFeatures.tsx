'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useNotification } from '@/context/NotificationContext';
import { 
  Smartphone,
  Touch,
  RefreshCw,
  Swipe,
  Menu,
  ChevronLeft,
  ChevronRight,
  Heart,
  X,
  Home,
  Calendar,
  Users,
  MessageCircle,
  Settings,
  Search,
  Filter,
  ArrowUp,
  Vibrate,
  Eye,
  Volume2,
  VolumeX
} from 'lucide-react';

interface MobileOptimizationFeaturesProps {
  enableSwipeGestures?: boolean;
  enablePullToRefresh?: boolean;
  enableHapticFeedback?: boolean;
  enableTouchOptimization?: boolean;
  className?: string;
}

interface TouchGesture {
  startX: number;
  startY: number;
  startTime: number;
  element: HTMLElement;
}

interface SwipeAction {
  direction: 'left' | 'right' | 'up' | 'down';
  threshold: number;
  action: () => void;
  description: string;
}

// Portuguese cultural UI elements optimized for mobile
const PORTUGUESE_MOBILE_NAVIGATION = [
  { id: 'home', label: 'Início', labelEnglish: 'Home', icon: Home, route: '/' },
  { id: 'events', label: 'Eventos', labelEnglish: 'Events', icon: Calendar, route: '/events' },
  { id: 'community', label: 'Pessoas', labelEnglish: 'People', icon: Users, route: '/my-network' },
  { id: 'matches', label: 'Matches', labelEnglish: 'Matches', icon: Heart, route: '/matches' },
  { id: 'chat', label: 'Chat', labelEnglish: 'Chat', icon: MessageCircle, route: '/messages' }
];

export default function MobileOptimizationFeatures({
  enableSwipeGestures = true,
  enablePullToRefresh = true,
  enableHapticFeedback = true,
  enableTouchOptimization = true,
  className = ''
}: MobileOptimizationFeaturesProps) {
  const { language, t } = useLanguage();
  const { addNotification } = useNotification();

  // Mobile optimization states
  const [isMobile, setIsMobile] = useState(false);
  const [touchOptimized, setTouchOptimized] = useState(false);
  const [swipeEnabled, setSwipeEnabled] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  
  // Navigation states
  const [activeTab, setActiveTab] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['home']);
  
  // Touch interaction states
  const [currentTouch, setCurrentTouch] = useState<TouchGesture | null>(null);
  const [swipeActions, setSwipeActions] = useState<SwipeAction[]>([]);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Accessibility states
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const pullToRefreshRef = useRef<HTMLDivElement>(null);
  const swipeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    detectMobileDevice();
    setupSwipeGestures();
    setupPullToRefresh();
    checkAccessibilityPreferences();
    
    return () => {
      cleanup();
    };
  }, []);

  const detectMobileDevice = () => {
    const userAgent = navigator.userAgent;
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;

    const mobile = isMobileDevice || (isTouchDevice && isSmallScreen);
    setIsMobile(mobile);
    setTouchOptimized(mobile && enableTouchOptimization);
    setSwipeEnabled(mobile && enableSwipeGestures);

      isMobileDevice,
      isTouchDevice,
      isSmallScreen,
      mobile
    });

    // Add mobile-specific CSS classes
    if (mobile) {
      document.documentElement.classList.add('mobile-optimized');
      document.body.style.touchAction = 'manipulation';
      document.body.style.userSelect = 'none';
      document.body.style.webkitTouchCallout = 'none';
    }
  };

  const checkAccessibilityPreferences = () => {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
    }

    // Check for high contrast preference
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      setHighContrast(true);
    }

    // Check stored preferences
    const storedPreferences = localStorage.getItem('lusotown-accessibility-preferences');
    if (storedPreferences) {
      try {
        const preferences = JSON.parse(storedPreferences);
        setHighContrast(preferences.highContrast || false);
        setLargeText(preferences.largeText || false);
        setHapticEnabled(preferences.hapticEnabled !== false);
        setSoundEnabled(preferences.soundEnabled !== false);
      } catch (error) {
        console.error('[Mobile] Failed to parse accessibility preferences:', error);
      }
    }
  };

  const setupSwipeGestures = () => {
    if (!enableSwipeGestures || !swipeContainerRef.current) return;

    const container = swipeContainerRef.current;

    const swipeActions: SwipeAction[] = [
      {
        direction: 'left',
        threshold: 100,
        action: () => navigateNext(),
        description: language === 'pt' ? 'Próxima página' : 'Next page'
      },
      {
        direction: 'right',
        threshold: 100,
        action: () => navigateBack(),
        description: language === 'pt' ? 'Página anterior' : 'Previous page'
      },
      {
        direction: 'up',
        threshold: 150,
        action: () => scrollToTop(),
        description: language === 'pt' ? 'Subir para o topo' : 'Scroll to top'
      },
      {
        direction: 'down',
        threshold: 150,
        action: () => refreshContent(),
        description: language === 'pt' ? 'Atualizar conteúdo' : 'Refresh content'
      }
    ];

    setSwipeActions(swipeActions);

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        setCurrentTouch({
          startX: touch.clientX,
          startY: touch.clientY,
          startTime: Date.now(),
          element: e.target as HTMLElement
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!currentTouch || e.touches.length !== 1) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - currentTouch.startX;
      const deltaY = touch.clientY - currentTouch.startY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Update pull to refresh distance for downward swipes at top of page
      if (deltaY > 0 && window.scrollY === 0 && Math.abs(deltaX) < 50) {
        const pullDistance = Math.min(deltaY * 0.5, 100);
        setPullDistance(pullDistance);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!currentTouch) return;

      const touchEndTime = Date.now();
      const touchDuration = touchEndTime - currentTouch.startTime;
      
      if (e.changedTouches.length === 1) {
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - currentTouch.startX;
        const deltaY = touch.clientY - currentTouch.startY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const velocity = distance / touchDuration;

        // Determine swipe direction and trigger action
        if (distance > 50 && velocity > 0.1) {
          let direction: 'left' | 'right' | 'up' | 'down';
          
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            direction = deltaX > 0 ? 'right' : 'left';
          } else {
            direction = deltaY > 0 ? 'down' : 'up';
          }

          const action = swipeActions.find(a => a.direction === direction);
          if (action && distance > action.threshold) {
            performHapticFeedback('light');
            action.action();
            
            addNotification({
              id: `swipe-${direction}`,
              type: 'info',
              title: language === 'pt' ? 'Gesto Reconhecido' : 'Gesture Recognized',
              message: action.description,
              duration: 1500
            });
          }
        }
      }

      // Reset pull to refresh
      setPullDistance(0);
      setCurrentTouch(null);
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  };

  const setupPullToRefresh = () => {
    if (!enablePullToRefresh || !pullToRefreshRef.current) return;

    let startY = 0;
    let currentY = 0;
    let isPulling = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY;
        isPulling = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling) return;

      currentY = e.touches[0].clientY;
      const pullDistance = currentY - startY;

      if (pullDistance > 0 && pullDistance < 150) {
        setPullDistance(pullDistance);
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      if (isPulling && pullDistance > 100) {
        refreshContent();
      }
      isPulling = false;
      setPullDistance(0);
    };

    const container = pullToRefreshRef.current;
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  };

  const performHapticFeedback = useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (!hapticEnabled) return;

    try {
      // Modern devices with Haptic API
      if ('vibrate' in navigator) {
        const patterns = {
          light: [50],
          medium: [100],
          heavy: [200]
        };
        navigator.vibrate(patterns[type]);
      }

      // Capacitor haptics (if available)
      if ((window as any).Capacitor?.Plugins?.Haptics) {
        const { Haptics, ImpactStyle } = (window as any).Capacitor.Plugins;
        const styles = {
          light: ImpactStyle.Light,
          medium: ImpactStyle.Medium,
          heavy: ImpactStyle.Heavy
        };
        Haptics.impact({ style: styles[type] });
      }
    } catch (error) {
    }
  }, [hapticEnabled]);

  const playInteractionSound = useCallback((type: 'tap' | 'swipe' | 'success' | 'error' = 'tap') => {
    if (!soundEnabled) return;

    try {
      // Create audio context for interaction sounds
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Configure sound based on type
      const frequencies = {
        tap: 800,
        swipe: 600,
        success: 1000,
        error: 400
      };

      oscillator.frequency.value = frequencies[type];
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
    }
  }, [soundEnabled]);

  const refreshContent = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    performHapticFeedback('medium');
    playInteractionSound('swipe');

    try {
      // Simulate content refresh for Portuguese community
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      addNotification({
        id: 'content-refreshed',
        type: 'success',
        title: language === 'pt' ? 'Conteúdo Atualizado!' : 'Content Refreshed!',
        message: language === 'pt' 
          ? 'Comunidade portuguesa atualizada' 
          : 'Portuguese community updated',
        duration: 3000
      });

      // Trigger page refresh or content update
      window.location.reload();
      
    } catch (error) {
      console.error('[Mobile] Refresh failed:', error);
      addNotification({
        id: 'refresh-error',
        type: 'error',
        title: language === 'pt' ? 'Erro na Atualização' : 'Refresh Error',
        message: language === 'pt' 
          ? 'Não foi possível atualizar' 
          : 'Could not refresh content',
        duration: 5000
      });
    } finally {
      setIsRefreshing(false);
      setPullDistance(0);
    }
  };

  const navigateBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop();
      const previousTab = newHistory[newHistory.length - 1];
      
      setNavigationHistory(newHistory);
      setActiveTab(previousTab);
      performHapticFeedback('light');
      playInteractionSound('swipe');
      
      // Navigate to previous route
      const navItem = PORTUGUESE_MOBILE_NAVIGATION.find(item => item.id === previousTab);
      if (navItem) {
        window.history.back();
      }
    }
  };

  const navigateNext = () => {
    const currentIndex = PORTUGUESE_MOBILE_NAVIGATION.findIndex(item => item.id === activeTab);
    const nextIndex = (currentIndex + 1) % PORTUGUESE_MOBILE_NAVIGATION.length;
    const nextTab = PORTUGUESE_MOBILE_NAVIGATION[nextIndex].id;
    
    navigateToTab(nextTab);
  };

  const navigateToTab = (tabId: string) => {
    setActiveTab(tabId);
    setNavigationHistory(prev => [...prev, tabId]);
    performHapticFeedback('light');
    playInteractionSound('tap');

    const navItem = PORTUGUESE_MOBILE_NAVIGATION.find(item => item.id === tabId);
    if (navItem) {
      window.location.href = navItem.route;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    performHapticFeedback('medium');
    playInteractionSound('success');
  };

  const toggleAccessibilityFeature = (feature: string) => {
    const newPreferences: any = {
      highContrast,
      largeText,
      hapticEnabled,
      soundEnabled
    };

    switch (feature) {
      case 'highContrast':
        const newHighContrast = !highContrast;
        setHighContrast(newHighContrast);
        newPreferences.highContrast = newHighContrast;
        document.documentElement.classList.toggle('high-contrast', newHighContrast);
        break;
      case 'largeText':
        const newLargeText = !largeText;
        setLargeText(newLargeText);
        newPreferences.largeText = newLargeText;
        document.documentElement.classList.toggle('large-text', newLargeText);
        break;
      case 'haptic':
        const newHapticEnabled = !hapticEnabled;
        setHapticEnabled(newHapticEnabled);
        newPreferences.hapticEnabled = newHapticEnabled;
        break;
      case 'sound':
        const newSoundEnabled = !soundEnabled;
        setSoundEnabled(newSoundEnabled);
        newPreferences.soundEnabled = newSoundEnabled;
        break;
    }

    localStorage.setItem('lusotown-accessibility-preferences', JSON.stringify(newPreferences));
    performHapticFeedback('light');
  };

  const cleanup = () => {
    document.documentElement.classList.remove('mobile-optimized', 'high-contrast', 'large-text');
  };

  const renderPullToRefresh = () => (
    <div 
      className={`fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-red-600 to-green-600 text-white transition-transform duration-200 ease-out ${
        pullDistance > 0 ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{ 
        height: `${Math.min(pullDistance, 80)}px`,
        transform: `translateY(${pullDistance > 80 ? '0' : `${pullDistance - 80}px`})`
      }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="flex items-center space-x-2">
          {isRefreshing ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              <span className="text-sm font-medium">
                {language === 'pt' ? 'A atualizar...' : 'Refreshing...'}
              </span>
            </>
          ) : (
            <>
              <RefreshCw className={`h-5 w-5 transition-transform ${pullDistance > 60 ? 'rotate-180' : ''}`} />
              <span className="text-sm font-medium">
                {pullDistance > 60 
                  ? (language === 'pt' ? 'Soltar para atualizar' : 'Release to refresh')
                  : (language === 'pt' ? 'Puxar para atualizar' : 'Pull to refresh')
                }
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderMobileNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-bottom">
      <div className="grid grid-cols-5 h-16">
        {PORTUGUESE_MOBILE_NAVIGATION.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => navigateToTab(item.id)}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                isActive 
                  ? 'text-red-600 bg-red-50' 
                  : 'text-gray-600 hover:text-gray-900'
              } ${touchOptimized ? 'min-h-12' : ''}`}
              style={{ 
                minWidth: touchOptimized ? '48px' : 'auto',
                minHeight: touchOptimized ? '48px' : 'auto'
              }}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className="text-xs font-medium">
                {language === 'pt' ? item.label : item.labelEnglish}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderSwipeIndicator = () => (
    <div className="fixed top-4 right-4 z-40 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full text-sm">
      <div className="flex items-center space-x-2">
        <Swipe className="h-4 w-4" />
        <span>{language === 'pt' ? 'Desliza' : 'Swipe'}</span>
      </div>
    </div>
  );

  const renderAccessibilityControls = () => (
    <div className="fixed top-4 left-4 z-40">
      <button
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <Settings className="h-5 w-5" />
      </button>
      
      {showMobileMenu && (
        <div className="absolute top-12 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64">
          <h3 className="font-semibold text-gray-900 mb-3">
            {language === 'pt' ? 'Acessibilidade' : 'Accessibility'}
          </h3>
          
          <div className="space-y-3">
            <button
              onClick={() => toggleAccessibilityFeature('highContrast')}
              className={`flex items-center justify-between w-full text-left p-2 rounded ${
                highContrast ? 'bg-blue-100 text-blue-800' : 'text-gray-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span className="text-sm">
                  {language === 'pt' ? 'Alto Contraste' : 'High Contrast'}
                </span>
              </div>
              <div className={`w-4 h-4 rounded ${highContrast ? 'bg-blue-600' : 'bg-gray-300'}`} />
            </button>
            
            <button
              onClick={() => toggleAccessibilityFeature('largeText')}
              className={`flex items-center justify-between w-full text-left p-2 rounded ${
                largeText ? 'bg-green-100 text-green-800' : 'text-gray-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">A</span>
                <span className="text-sm">
                  {language === 'pt' ? 'Texto Grande' : 'Large Text'}
                </span>
              </div>
              <div className={`w-4 h-4 rounded ${largeText ? 'bg-green-600' : 'bg-gray-300'}`} />
            </button>
            
            <button
              onClick={() => toggleAccessibilityFeature('haptic')}
              className={`flex items-center justify-between w-full text-left p-2 rounded ${
                hapticEnabled ? 'bg-purple-100 text-purple-800' : 'text-gray-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Vibrate className="h-4 w-4" />
                <span className="text-sm">
                  {language === 'pt' ? 'Vibração' : 'Haptic Feedback'}
                </span>
              </div>
              <div className={`w-4 h-4 rounded ${hapticEnabled ? 'bg-purple-600' : 'bg-gray-300'}`} />
            </button>
            
            <button
              onClick={() => toggleAccessibilityFeature('sound')}
              className={`flex items-center justify-between w-full text-left p-2 rounded ${
                soundEnabled ? 'bg-yellow-100 text-yellow-800' : 'text-gray-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                <span className="text-sm">
                  {language === 'pt' ? 'Sons' : 'Sound Effects'}
                </span>
              </div>
              <div className={`w-4 h-4 rounded ${soundEnabled ? 'bg-yellow-600' : 'bg-gray-300'}`} />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderScrollToTopButton = () => (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-20 right-4 z-40 bg-red-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 ${
        window.scrollY > 400 ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
      }`}
      style={{
        minWidth: touchOptimized ? '48px' : 'auto',
        minHeight: touchOptimized ? '48px' : 'auto'
      }}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );

  if (!isMobile) {
    return null;
  }

  return (
    <div className={`mobile-optimization-container ${className}`} ref={containerRef}>
      {/* Pull to refresh */}
      <div ref={pullToRefreshRef}>
        {enablePullToRefresh && renderPullToRefresh()}
      </div>
      
      {/* Swipe container */}
      <div ref={swipeContainerRef} className="min-h-screen">
        {/* Content goes here */}
        {enableSwipeGestures && swipeEnabled && renderSwipeIndicator()}
        
        {/* Accessibility controls */}
        {renderAccessibilityControls()}
        
        {/* Scroll to top button */}
        {renderScrollToTopButton()}
        
        {/* Mobile navigation */}
        {renderMobileNavigation()}
      </div>
    </div>
  );
}