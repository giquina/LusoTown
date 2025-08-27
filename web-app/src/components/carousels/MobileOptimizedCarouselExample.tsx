'use client'

import React, { useState, useCallback } from 'react'
import { LusophoneCarousel, WeekendEventItem, MobileSettings, PWASettings, PerformanceMetrics } from './LusophoneCarousel'
import { useLanguage } from '@/context/LanguageContext'

/**
 * Mobile-optimized carousel example for Portuguese-speaking community
 * Demonstrates advanced mobile features and PWA capabilities
 */
export default function MobileOptimizedCarouselExample() {
  const { language, t } = useLanguage()
  const [performanceData, setPerformanceData] = useState<PerformanceMetrics | null>(null)
  const [refreshCount, setRefreshCount] = useState(0)

  // Enhanced mobile settings for Portuguese community
  const mobileSettings: Partial<MobileSettings> = {
    enableSwipeGestures: true,
    enableHapticFeedback: false,
    enableMomentumScrolling: true,
    enablePullToRefresh: true,
    touchThreshold: 44, // WCAG 2.1 AA compliance
    swipeVelocityThreshold: 0.3,
    enableLazyLoading: true,
    preloadDistance: 2
  }

  // PWA configuration for offline Portuguese cultural content
  const pwaSettings: Partial<PWASettings> = {
    enableOfflineMode: true,
    enablePushNotifications: true,
    enableBackgroundSync: true,
    cacheStrategy: 'stale-while-revalidate',
    offlineQueueLimit: 50
  }

  // Sample Portuguese cultural events
  const weekendEvents: WeekendEventItem[] = [
    {
      id: 'fado-night-1',
      title: {
        en: 'Authentic Fado Night at Heritage Centre',
        pt: 'Noite de Fado Autêntico no Centro Cultural'
      },
      description: {
        en: 'Experience the soul of Portuguese music with professional fadistas from Coimbra',
        pt: 'Experimente a alma da música portuguesa com fadistas profissionais de Coimbra'
      },
      image: '/events/fado-night.jpg',
      flagEmoji: '🇵🇹',
      countries: ['Portugal'],
      category: 'music',
      priority: 1,
      date: '2024-12-14',
      time: '20:00',
      location: 'Heritage Cultural Centre, London',
      price: 25,
      attendees: 45,
      maxAttendees: 80,
      tags: ['Fado', 'Traditional Music', 'Portuguese Culture']
    },
    {
      id: 'brazilian-carnival-1',
      title: {
        en: 'Brazilian Carnival Workshop',
        pt: 'Workshop de Carnaval Brasileiro'
      },
      description: {
        en: 'Learn samba steps and carnival traditions from Rio de Janeiro',
        pt: 'Aprenda passos de samba e tradições carnavalescas do Rio de Janeiro'
      },
      image: '/events/brazilian-carnival.jpg',
      flagEmoji: '🇧🇷',
      countries: ['Brazil'],
      category: 'dance',
      priority: 2,
      date: '2024-12-15',
      time: '14:00',
      location: 'South London Community Hall',
      price: 18,
      attendees: 32,
      maxAttendees: 60,
      tags: ['Samba', 'Carnival', 'Brazilian Culture', 'Dance']
    },
    {
      id: 'cape-verdean-music-1',
      title: {
        en: 'Cape Verdean Morna & Coladeira Night',
        pt: 'Noite de Morna e Coladeira Cabo-verdiana'
      },
      description: {
        en: 'Discover the musical heritage of Cape Verde with live performances',
        pt: 'Descubra o património musical de Cabo Verde com atuações ao vivo'
      },
      image: '/events/cape-verde-music.jpg',
      flagEmoji: '🇨🇻',
      countries: ['Cape Verde'],
      category: 'music',
      priority: 3,
      date: '2024-12-16',
      time: '19:30',
      location: 'East London Arts Centre',
      price: 20,
      attendees: 28,
      maxAttendees: 50,
      tags: ['Morna', 'Coladeira', 'Cape Verdean Music', 'Live Performance']
    },
    {
      id: 'angolan-cuisine-1',
      title: {
        en: 'Angolan Cuisine Masterclass',
        pt: 'Masterclass de Culinária Angolana'
      },
      description: {
        en: 'Learn to cook traditional Angolan dishes with chef Maria Santos',
        pt: 'Aprenda a cozinhar pratos tradicionais angolanos com a chef Maria Santos'
      },
      image: '/events/angolan-cuisine.jpg',
      flagEmoji: '🇦🇴',
      countries: ['Angola'],
      category: 'food',
      priority: 4,
      date: '2024-12-17',
      time: '16:00',
      location: 'North London Culinary School',
      price: 35,
      attendees: 18,
      maxAttendees: 25,
      tags: ['Angolan Cuisine', 'Cooking Class', 'Traditional Food', 'Cultural Heritage']
    },
    {
      id: 'portuguese-wine-1',
      title: {
        en: 'Portuguese Wine Tasting Journey',
        pt: 'Viagem de Prova de Vinhos Portugueses'
      },
      description: {
        en: 'Explore wines from Douro, Alentejo, and Vinho Verde regions',
        pt: 'Explore vinhos das regiões do Douro, Alentejo e Vinho Verde'
      },
      image: '/events/wine-tasting.jpg',
      flagEmoji: '🇵🇹',
      countries: ['Portugal'],
      category: 'wine',
      priority: 5,
      date: '2024-12-18',
      time: '18:00',
      location: 'West London Wine Bar',
      price: 45,
      attendees: 22,
      maxAttendees: 35,
      tags: ['Wine Tasting', 'Portuguese Wine', 'Douro', 'Alentejo', 'Vinho Verde']
    }
  ]

  // Handle swipe gestures with Portuguese cultural context
  const handleSwipeGesture = useCallback((direction: 'left' | 'right', item: WeekendEventItem) => {
    if (direction === 'left') {
      // Swipe left could indicate "not interested"
      console.log(`Swiped left on ${item.title[language]}`)
    } else {
      // Swipe right could indicate "interested"
      console.log(`Swiped right on ${item.title[language]}`)
    }
  }, [language])

  // Handle pull to refresh for Portuguese cultural content
  const handlePullToRefresh = useCallback(async () => {
    console.log('Refreshing Portuguese cultural content...')
    setRefreshCount(prev => prev + 1)
    
    // Simulate API call to refresh Portuguese events
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success message
    // Haptic feedback disabled for better UX
    // if ('navigator' in window && 'vibrate' in navigator) {
    //   navigator.vibrate([100, 50, 100]) // Success vibration pattern
    // }
  }, [])

  // Handle performance updates
  const handlePerformanceUpdate = useCallback((metrics: PerformanceMetrics) => {
    setPerformanceData(metrics)
    
    // Log performance issues for mobile optimization
    if (metrics.networkStatus === 'slow') {
      console.warn('Slow network detected - optimizing Portuguese cultural content delivery')
    }
    
    if (metrics.memoryUsage > 50) { // 50MB threshold
      console.warn('High memory usage detected - optimizing mobile carousel performance')
    }
  }, [])

  // Render event item with Portuguese cultural styling
  const renderEventItem = useCallback((item: WeekendEventItem, index: number) => {
    const isLowPrice = item.price <= 20
    const isPopular = item.attendees / item.maxAttendees > 0.7
    
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full">
        {/* Event Image with Cultural Flag */}
        <div className="relative h-32 bg-gradient-to-br from-primary-100 to-gold-100">
          <div className="absolute top-2 left-2 text-2xl">{item.flagEmoji}</div>
          <div className="absolute top-2 right-2">
            {isPopular && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Popular</span>}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm p-2">
            <h3 className="text-white font-semibold text-sm leading-tight">
              {item.title[language]}
            </h3>
          </div>
        </div>
        
        {/* Event Details */}
        <div className="p-3 space-y-2">
          <p className="text-xs text-gray-600 line-clamp-2">
            {item.description?.[language]}
          </p>
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-primary-600 font-medium">
              {new Date(item.date).toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB')}
            </span>
            <span className="text-gray-500">{item.time}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className={`font-bold ${isLowPrice ? 'text-green-600' : 'text-gray-900'}`}>
              £{item.price}
            </span>
            <span className="text-xs text-gray-500">
              {item.attendees}/{item.maxAttendees} {t('events.attendees', 'attendees')}
            </span>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 2).map((tag, tagIndex) => (
              <span key={tagIndex} className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }, [language, t])

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('carousel.example.title', 'Mobile-Optimized Portuguese Cultural Events')}
        </h2>
        <p className="text-gray-600">
          {t('carousel.example.subtitle', 'Experience enhanced mobile gestures, PWA features, and Portuguese cultural authenticity')}
        </p>
        
        {/* Performance Stats */}
        {performanceData && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div>
                <span className="font-medium">Load:</span> {performanceData.loadTime.toFixed(0)}ms
              </div>
              <div>
                <span className="font-medium">Memory:</span> {performanceData.memoryUsage.toFixed(1)}MB
              </div>
              <div>
                <span className="font-medium">Network:</span> {performanceData.networkStatus}
              </div>
              <div>
                <span className="font-medium">Refreshed:</span> {refreshCount} times
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Mobile Carousel */}
      <LusophoneCarousel
        items={weekendEvents}
        renderItem={renderEventItem}
        title={{
          en: 'This Weekend\'s Portuguese Cultural Events',
          pt: 'Eventos Culturais Portugueses Deste Fim de Semana'
        }}
        subtitle={{
          en: 'Swipe to explore authentic Portuguese-speaking community events across London',
          pt: 'Deslize para explorar eventos autênticos da comunidade lusófona em Londres'
        }}
        autoAdvance={true}
        autoAdvanceInterval={6000}
        showControls={true}
        showDots={true}
        className="mobile-portuguese-carousel"
        onItemClick={(item, index) => {
          console.log(`Clicked on ${item.title[language]} at index ${index}`)
        }}
        // Enhanced mobile features
        mobileSettings={mobileSettings}
        pwaSettings={pwaSettings}
        onSwipeGesture={handleSwipeGesture}
        onPullToRefresh={handlePullToRefresh}
        onPerformanceUpdate={handlePerformanceUpdate}
        enablePortugueseGestures={true}
        enableAccessibilityAnnouncements={true}
      />

      {/* Mobile Usage Instructions */}
      <div className="mt-8 p-4 bg-gradient-to-br from-primary-50 to-gold-50 rounded-xl border border-primary-200">
        <h3 className="font-semibold text-primary-900 mb-3">
          {t('carousel.mobileInstructions.title', 'Mobile Features Guide')}
        </h3>
        <div className="space-y-2 text-sm text-primary-700">
          <p>📱 <strong>{t('carousel.swipeGestures', 'Swipe Gestures:')}</strong> {t('carousel.swipeInstructions', 'Swipe left/right to navigate between Portuguese cultural events')}</p>
          <p>🔄 <strong>{t('carousel.pullToRefresh', 'Pull to Refresh:')}</strong> {t('carousel.pullInstructions', 'Pull down to refresh Portuguese community content')}</p>
          <p>📳 <strong>{t('carousel.hapticFeedback', 'Haptic Feedback:')}</strong> {t('carousel.hapticInstructions', 'Feel vibrations for navigation confirmations')}</p>
          <p>🎯 <strong>{t('carousel.portugueseGestures', 'Portuguese Gestures:')}</strong> {t('carousel.gestureInstructions', 'Draw patterns to unlock Portuguese cultural easter eggs')}</p>
          <p>🌐 <strong>{t('carousel.offlineMode', 'Offline Mode:')}</strong> {t('carousel.offlineInstructions', 'Portuguese cultural content cached for offline viewing')}</p>
          <p>♿ <strong>{t('carousel.accessibility', 'Accessibility:')}</strong> {t('carousel.accessibilityInstructions', 'Voice announcements in Portuguese and English')}</p>
        </div>
      </div>
    </div>
  )
}