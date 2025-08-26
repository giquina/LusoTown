"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  SparklesIcon,
  HeartIcon,
  StarIcon,
  MapPinIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  BuildingLibraryIcon,
  ShareIcon,
  BookmarkIcon,
  PhoneIcon,
  GlobeAltIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

// Import our new Portuguese mobile design system
import { usePortugueseMobileDesign, usePortugueseMobileComponent, PORTUGUESE_MOBILE_ANIMATIONS } from '@/hooks/usePortugueseMobileDesign';
import { 
  PortugueseHeritageBadge, 
  PortugueseCulturalCard,
  PortugueseSwipeNavigation,
  PortugueseCulturalActionSheet
} from '@/components/mobile/PortugueseCulturalMobileComponents';
import { 
  PortugueseMobileNavigation,
  PortugueseMobileHeader,
  PortugueseMobileOnboarding
} from '@/components/mobile/PortugueseMobileInterface';
import { 
  PortugueseSwipeActions,
  PortugueseDoubleTap,
  PortugueseLongPressMenu
} from '@/components/mobile/PortugueseGestureSystem';
import { 
  MobileBusinessCard,
  MobileBusinessFilter
} from '@/components/mobile/PortugueseMobileBusinessDirectory';
import { EliteMobileCard, LuxuryMobileButton, LuxuryMobileInput } from '@/components/LuxuryMobileComponents';

/**
 * Portuguese Mobile Design System Showcase
 * 
 * Demonstrates the comprehensive mobile-first Portuguese cultural design system
 * with real examples of components, interactions, and design patterns.
 */
export default function PortugueseMobileDesignShowcase() {
  const { language } = useLanguage();
  const { device, theme, utils, isReady } = usePortugueseMobileDesign();
  const { optimizations } = usePortugueseMobileComponent('showcase');
  
  // Component states
  const [activeTab, setActiveTab] = useState<'components' | 'gestures' | 'business' | 'navigation'>('components');
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showBusinessFilter, setShowBusinessFilter] = useState(false);
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(new Set());

  // Sample data
  const sampleEvents = [
    {
      id: '1',
      title: 'Festival de Fado em Londres',
      description: 'Uma noite mágica de fado tradicional português com artistas renomados.',
      image: '/images/events/fado-festival.jpg',
      heritage: 'portugal' as const,
      date: '2024-03-15',
      location: 'Cultural Centre North'
    },
    {
      id: '2',
      title: 'Carnaval Brasileiro',
      description: 'Celebre o carnaval brasileiro com música, dança e comida típica.',
      image: '/images/events/brazilian-carnival.jpg',
      heritage: 'brazil' as const,
      date: '2024-03-20',
      location: 'Community Hub East'
    },
    {
      id: '3',
      title: 'Noite Cultural Cabo-Verdiana',
      description: 'Descubra a rica cultura de Cabo Verde através da música e gastronomia.',
      image: '/images/events/cape-verde-night.jpg',
      heritage: 'cape-verde' as const,
      date: '2024-03-25',
      location: 'Heritage Community West'
    }
  ];

  const sampleBusiness = {
    id: 'rest-001',
    name: 'Restaurante O Fado',
    category: 'restaurant' as const,
    description: 'Autêntica cozinha portuguesa no coração de Londres. Especialistas em bacalhau e pastéis de nata.',
    address: '123 Portuguese Street, London',
    postcode: 'SW1A 1AA',
    phone: '+44 20 1234 5678',
    website: 'https://restauranteofado.com',
    email: 'info@restauranteofado.com',
    heritage: 'portugal' as const,
    rating: 4.8,
    reviewCount: 127,
    images: [
      '/images/businesses/restaurant-interior.jpg',
      '/images/businesses/portuguese-food.jpg',
      '/images/businesses/dining-room.jpg'
    ],
    openingHours: {
      monday: { open: '12:00', close: '22:00' },
      tuesday: { open: '12:00', close: '22:00' },
      wednesday: { open: '12:00', close: '22:00' },
      thursday: { open: '12:00', close: '22:00' },
      friday: { open: '12:00', close: '23:00' },
      saturday: { open: '11:00', close: '23:00' },
      sunday: { open: '11:00', close: '21:00' }
    },
    specialties: ['Bacalhau à Brás', 'Pastéis de Nata', 'Francesinha', 'Vinho do Porto'],
    priceRange: '$$' as const,
    verified: true,
    distance: 2.3,
    coordinates: [51.5074, -0.1278] as [number, number]
  };

  const culturalActions = [
    {
      id: 'join-event',
      label: 'Participar no Evento',
      icon: <CalendarDaysIcon className="w-6 h-6" />,
      onClick: () => console.log('Join event'),
      color: 'red' as const,
      heritage: 'portugal' as const
    },
    {
      id: 'find-community',
      label: 'Encontrar Comunidade',
      icon: <UserGroupIcon className="w-6 h-6" />,
      onClick: () => console.log('Find community'),
      color: 'green' as const,
      heritage: 'brazil' as const
    },
    {
      id: 'explore-business',
      label: 'Explorar Negócios',
      icon: <BuildingLibraryIcon className="w-6 h-6" />,
      onClick: () => console.log('Explore business'),
      color: 'blue' as const,
      heritage: 'cape-verde' as const
    }
  ];

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          className="text-center"
          {...PORTUGUESE_MOBILE_ANIMATIONS.culturalCelebration}
        >
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">
            {language === 'pt' ? 'Carregando sistema de design...' : 'Loading design system...'}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <PortugueseMobileHeader
        title={language === 'pt' ? 'Design Lusófono' : 'Portuguese Design'}
        subtitle={language === 'pt' ? 'Sistema de design móvel' : 'Mobile design system'}
        showMenu={true}
        showNotifications={true}
        notificationCount={3}
        onMenuToggle={() => setShowActionSheet(true)}
        onNotifications={() => console.log('Show notifications')}
      />

      {/* Design System Information */}
      <div className="px-4 py-6 max-w-md mx-auto">
        <motion.div 
          className="bg-gradient-to-r from-red-50 via-white to-green-50 rounded-2xl p-6 mb-6 border border-red-100"
          {...PORTUGUESE_MOBILE_ANIMATIONS.heritagePride}
        >
          <div className="flex items-center gap-3 mb-4">
            <SparklesIcon className="w-8 h-8 text-red-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {language === 'pt' ? 'Sistema de Design Móvel' : 'Mobile Design System'}
              </h2>
              <p className="text-sm text-gray-600">
                {language === 'pt' ? 'Otimizado para a comunidade lusófona' : 'Optimized for Portuguese-speaking community'}
              </p>
            </div>
          </div>
          
          {/* Device Information */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold text-gray-700">
                {language === 'pt' ? 'Dispositivo:' : 'Device:'}
              </span>
              <br />
              <span className="text-gray-600">
                {device.isMobile ? (language === 'pt' ? 'Móvel' : 'Mobile') : 
                 device.isTablet ? 'Tablet' : 'Desktop'}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">
                {language === 'pt' ? 'Tela:' : 'Screen:'}
              </span>
              <br />
              <span className="text-gray-600 capitalize">
                {device.screenSize.replace('-', ' ')}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">
                {language === 'pt' ? 'Orientação:' : 'Orientation:'}
              </span>
              <br />
              <span className="text-gray-600">
                {device.orientation === 'portrait' ? 
                  (language === 'pt' ? 'Retrato' : 'Portrait') : 
                  (language === 'pt' ? 'Paisagem' : 'Landscape')
                }
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">
                {language === 'pt' ? 'Toque:' : 'Touch:'}
              </span>
              <br />
              <span className="text-gray-600">
                {device.touchCapable ? 
                  (language === 'pt' ? 'Suportado' : 'Supported') : 
                  (language === 'pt' ? 'Não suportado' : 'Not supported')
                }
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 p-1 bg-white rounded-2xl shadow-sm">
          {[
            { id: 'components', label: { pt: 'Componentes', en: 'Components' } },
            { id: 'gestures', label: { pt: 'Gestos', en: 'Gestures' } },
            { id: 'business', label: { pt: 'Negócios', en: 'Business' } },
            { id: 'navigation', label: { pt: 'Navegação', en: 'Navigation' } }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id as any)}
            >
              {tab.label[language as keyof typeof tab.label]}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'components' && (
            <motion.div
              key="components"
              {...utils.mobileAnimation('slide')}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {language === 'pt' ? 'Emblemas de Herança' : 'Heritage Badges'}
                </h3>
                <div className="flex flex-wrap gap-3 bg-white p-4 rounded-2xl">
                  <PortugueseHeritageBadge country="portugal" size="lg" />
                  <PortugueseHeritageBadge country="brazil" size="lg" />
                  <PortugueseHeritageBadge country="cape-verde" size="lg" />
                  <PortugueseHeritageBadge country="angola" size="lg" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {language === 'pt' ? 'Cartões Culturais' : 'Cultural Cards'}
                </h3>
                <PortugueseCulturalCard
                  title="Festival de Fado Tradicional"
                  description="Junte-se a nós para uma noite inesquecível de fado português autêntico no coração de Londres."
                  category="cultural"
                  heritage="portugal"
                  image="/images/events/fado-festival.jpg"
                  onClick={() => console.log('Card clicked')}
                  onShare={() => console.log('Share event')}
                  onBookmark={() => setBookmarkedItems(prev => new Set(prev).add('fado-festival'))}
                  isBookmarked={bookmarkedItems.has('fado-festival')}
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {language === 'pt' ? 'Componentes Premium' : 'Premium Components'}
                </h3>
                <div className="space-y-4">
                  <EliteMobileCard variant="premium" corner="portuguese">
                    <div className="flex items-center gap-3">
                      <HeartIcon className="w-6 h-6 text-red-600" />
                      <div>
                        <h4 className="font-bold text-gray-900">Premium Experience</h4>
                        <p className="text-sm text-gray-600">Luxury Portuguese cultural design</p>
                      </div>
                    </div>
                  </EliteMobileCard>
                  
                  <LuxuryMobileButton
                    variant="heritage"
                    size="lg"
                    fullWidth
                    icon={<StarIcon className="w-6 h-6" />}
                  >
                    {language === 'pt' ? 'Explorar Comunidade' : 'Explore Community'}
                  </LuxuryMobileButton>
                  
                  <LuxuryMobileInput
                    label={language === 'pt' ? 'Nome Completo' : 'Full Name'}
                    placeholder={language === 'pt' ? 'Digite seu nome' : 'Enter your name'}
                    variant="premium"
                    icon={<UserGroupIcon className="w-5 h-5" />}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'gestures' && (
            <motion.div
              key="gestures"
              {...utils.mobileAnimation('slide')}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {language === 'pt' ? 'Gestos Portugueses' : 'Portuguese Gestures'}
                </h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-2xl">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'pt' ? 'Deslizar para Ações' : 'Swipe for Actions'}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {language === 'pt' ? 'Deslize para a direita para curtir, esquerda para partilhar' : 'Swipe right to like, left to share'}
                    </p>
                    <PortugueseSwipeActions
                      onLike={() => console.log('Liked')}
                      onShare={() => console.log('Shared')}
                      onBookmark={() => console.log('Bookmarked')}
                    >
                      <div className="bg-gradient-to-r from-red-50 to-green-50 p-4 rounded-xl border border-red-100">
                        <div className="flex items-center gap-3">
                          <CalendarDaysIcon className="w-8 h-8 text-red-600" />
                          <div>
                            <h5 className="font-bold text-gray-900">Evento Cultural</h5>
                            <p className="text-sm text-gray-600">Noite de Fado em Londres</p>
                          </div>
                        </div>
                      </div>
                    </PortugueseSwipeActions>
                  </div>

                  <div className="bg-white p-4 rounded-2xl">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'pt' ? 'Duplo Toque' : 'Double Tap'}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {language === 'pt' ? 'Toque duas vezes para mostrar apreço' : 'Double tap to show appreciation'}
                    </p>
                    <PortugueseDoubleTap
                      onDoubleTap={() => console.log('Double tapped')}
                      feedbackType="heart"
                    >
                      <div className="bg-gradient-to-r from-amber-50 to-red-50 p-4 rounded-xl border border-amber-100 text-center">
                        <HeartIcon className="w-12 h-12 text-red-600 mx-auto mb-2" />
                        <p className="font-semibold text-gray-900">
                          {language === 'pt' ? 'Toque duas vezes para curtir' : 'Double tap to like'}
                        </p>
                      </div>
                    </PortugueseDoubleTap>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'business' && (
            <motion.div
              key="business"
              {...utils.mobileAnimation('slide')}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {language === 'pt' ? 'Diretório de Negócios' : 'Business Directory'}
                </h3>
                
                <div className="flex gap-2 mb-4">
                  <LuxuryMobileButton
                    variant="secondary"
                    size="md"
                    onClick={() => setShowBusinessFilter(true)}
                    icon={<AdjustmentsHorizontalIcon className="w-5 h-5" />}
                  >
                    {language === 'pt' ? 'Filtros' : 'Filters'}
                  </LuxuryMobileButton>
                </div>

                <MobileBusinessCard
                  business={sampleBusiness}
                  onSelect={(business) => console.log('Select business', business)}
                  onBookmark={(id) => console.log('Bookmark business', id)}
                  onShare={(business) => console.log('Share business', business)}
                  onGetDirections={(business) => console.log('Get directions', business)}
                  isBookmarked={false}
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'navigation' && (
            <motion.div
              key="navigation"
              {...utils.mobileAnimation('slide')}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {language === 'pt' ? 'Navegação Portuguesa' : 'Portuguese Navigation'}
                </h3>
                
                <div className="space-y-4">
                  <LuxuryMobileButton
                    variant="heritage"
                    fullWidth
                    onClick={() => setShowOnboarding(true)}
                  >
                    {language === 'pt' ? 'Mostrar Onboarding' : 'Show Onboarding'}
                  </LuxuryMobileButton>
                  
                  <div className="bg-white p-4 rounded-2xl">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {language === 'pt' ? 'Navegação de Eventos' : 'Event Navigation'}
                    </h4>
                    <PortugueseSwipeNavigation
                      items={sampleEvents}
                      renderItem={(event, index) => (
                        <PortugueseCulturalCard
                          key={event.id}
                          title={event.title}
                          description={event.description}
                          category="event"
                          heritage={event.heritage}
                          image={event.image}
                          onClick={() => console.log('Event selected', event)}
                          className="h-full"
                        />
                      )}
                      onItemSelect={(event) => console.log('Selected event', event)}
                      title={language === 'pt' ? 'Próximos Eventos' : 'Upcoming Events'}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Sheet */}
      <PortugueseCulturalActionSheet
        isOpen={showActionSheet}
        onClose={() => setShowActionSheet(false)}
        title={language === 'pt' ? 'Ações da Comunidade' : 'Community Actions'}
        description={language === 'pt' ? 'Escolha uma ação para a comunidade lusófona' : 'Choose an action for the Portuguese-speaking community'}
        actions={culturalActions}
      />

      {/* Onboarding Flow */}
      <PortugueseMobileOnboarding
        isVisible={showOnboarding}
        onComplete={() => setShowOnboarding(false)}
      />

      {/* Business Filter */}
      <MobileBusinessFilter
        isOpen={showBusinessFilter}
        onClose={() => setShowBusinessFilter(false)}
        onApplyFilters={(filters) => console.log('Apply filters', filters)}
        currentFilters={{
          categories: [],
          heritage: [],
          priceRange: [],
          rating: 0,
          distance: 25,
          verified: false,
          openNow: false
        }}
      />

      {/* Bottom Navigation */}
      <PortugueseMobileNavigation
        activeRoute="/"
        onNavigate={(route) => console.log('Navigate to', route)}
      />
    </div>
  );
}