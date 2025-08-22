"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SparklesIcon,
  TrophyIcon,
  HeartIcon,
  StarIcon,
  GlobeEuropeAfricaIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  ShoppingBagIcon,
  TrophyIcon as CrownIcon,
  FireIcon,
  BoltIcon,
  StarIcon as DiamondIcon,
  SparklesIcon as GemIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import { EliteMobileCard, LuxuryMobileButton, LuxuryMobileInput, QuickActionsMenu, LuxuryStatusIndicator } from '@/components/LuxuryMobileComponents';
import { EliteMobileHeader, EliteMobileSearch, EliteContentCard } from '@/components/EliteMobileInterface';
import { PremiumMobileNavigation, FloatingNavigation } from '@/components/PremiumMobileNavigation';
import { MobileGestureHandler } from '@/components/MobileExperienceOptimizer';

export default function EliteMobileShowcasePage() {
  const { language, t } = useLanguage();
  const [searchValue, setSearchValue] = useState('');
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [floatingNavOpen, setFloatingNavOpen] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState('overview');

  const demoSections = [
    { id: 'overview', label: language === 'pt' ? 'Visão Geral' : 'Overview', icon: SparklesIcon },
    { id: 'buttons', label: language === 'pt' ? 'Botões Elite' : 'Elite Buttons', icon: CrownIcon },
    { id: 'cards', label: language === 'pt' ? 'Cartões Premium' : 'Premium Cards', icon: DiamondIcon },
    { id: 'inputs', label: language === 'pt' ? 'Entradas Luxo' : 'Luxury Inputs', icon: GemIcon },
    { id: 'navigation', label: language === 'pt' ? 'Navegação' : 'Navigation', icon: TrophyIcon }
  ];

  const quickActions = [
    {
      label: 'Create Event',
      labelPt: 'Criar Evento',
      icon: CalendarDaysIcon,
      onClick: () => alert('Create Event'),
      variant: 'heritage' as const
    },
    {
      label: 'Find Community',
      labelPt: 'Encontrar Comunidade',
      icon: UserGroupIcon,
      onClick: () => alert('Find Community'),
      variant: 'primary' as const,
      badge: 5
    },
    {
      label: 'Portuguese Culture',
      labelPt: 'Cultura Portuguesa',
      icon: GlobeEuropeAfricaIcon,
      onClick: () => alert('Culture'),
      variant: 'heritage' as const
    },
    {
      label: 'Premium Shopping',
      labelPt: 'Compras Premium',
      icon: ShoppingBagIcon,
      onClick: () => alert('Shopping'),
      variant: 'secondary' as const,
      badge: 2
    }
  ];

  const sampleCards = [
    {
      title: language === 'pt' ? 'Festival do Fado em Londres' : 'Fado Festival in London',
      description: language === 'pt' 
        ? 'Uma noite mágica de fado tradicional português no coração de Londres, apresentando artistas renomados de Lisboa e Porto.'
        : 'A magical night of traditional Portuguese fado in the heart of London, featuring renowned artists from Lisbon and Porto.',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80',
      category: language === 'pt' ? 'Cultura' : 'Culture',
      author: {
        name: 'Maria Santos',
        verified: true
      },
      stats: {
        likes: 124,
        comments: 23,
        shares: 12
      },
      tags: ['fado', 'música', 'cultura'],
      premium: true,
      heritage: true
    },
    {
      title: language === 'pt' ? 'Degustação de Vinhos do Porto' : 'Port Wine Tasting Experience',
      description: language === 'pt'
        ? 'Descubra os melhores vinhos do Porto numa experiência exclusiva com sommeliers especializados.'
        : 'Discover the finest Port wines in an exclusive experience with specialized sommeliers.',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80',
      category: language === 'pt' ? 'Gastronomia' : 'Gastronomy',
      author: {
        name: 'João Silva',
        verified: false
      },
      stats: {
        likes: 89,
        comments: 15,
        shares: 8
      },
      tags: ['vinho', 'porto', 'degustação'],
      premium: true,
      heritage: true
    }
  ];

  const renderOverview = () => (
    <div className="space-y-8 p-6">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-600 via-amber-500 to-green-600 text-white rounded-2xl mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <CrownIcon className="w-6 h-6" />
          <span className="font-bold">
            {language === 'pt' ? 'Experiência Mobile Elite' : 'Elite Mobile Experience'}
          </span>
        </motion.div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {language === 'pt' 
            ? 'LusoTown Premium para Móvel' 
            : 'LusoTown Premium Mobile'}
        </h1>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {language === 'pt'
            ? 'Uma experiência móvel de luxo desenhada especificamente para a comunidade portuguesa affluente em Londres.'
            : 'A luxury mobile experience designed specifically for the affluent Portuguese community in London.'}
        </p>
      </motion.div>

      {/* Status Indicators */}
      <EliteMobileCard variant="premium" size="standard">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <StarIcon className="w-6 h-6 text-amber-500" />
          {language === 'pt' ? 'Indicadores de Status' : 'Status Indicators'}
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          <LuxuryStatusIndicator status="online" showLabel pulse />
          <LuxuryStatusIndicator status="premium" showLabel />
          <LuxuryStatusIndicator status="elite" showLabel />
          <LuxuryStatusIndicator status="busy" showLabel />
        </div>
      </EliteMobileCard>

      {/* Portuguese Heritage Elements */}
      <EliteMobileCard variant="elite" corner="elite" badge="PORTUGAL">
        <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
          <GlobeEuropeAfricaIcon className="w-6 h-6" />
          {language === 'pt' ? 'Património Português' : 'Portuguese Heritage'}
        </h3>
        <p className="text-gray-300 mb-4">
          {language === 'pt'
            ? 'Elementos culturais integrados com design premium para uma experiência autêntica.'
            : 'Cultural elements integrated with premium design for an authentic experience.'}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🇵🇹</span>
          <span className="font-semibold text-amber-400">
            {language === 'pt' ? 'Orgulhosamente Português' : 'Proudly Portuguese'}
          </span>
        </div>
      </EliteMobileCard>
    </div>
  );

  const renderButtons = () => (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {language === 'pt' ? 'Botões Elite' : 'Elite Buttons'}
      </h2>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Standard Variants</h3>
        <div className="space-y-3">
          <LuxuryMobileButton variant="heritage" icon={<HeartIcon className="w-5 h-5" />}>
            {language === 'pt' ? 'Herança Portuguesa' : 'Portuguese Heritage'}
          </LuxuryMobileButton>
          
          <LuxuryMobileButton variant="elite" icon={<CrownIcon className="w-5 h-5" />}>
            {language === 'pt' ? 'Experiência Elite' : 'Elite Experience'}
          </LuxuryMobileButton>
          
          <LuxuryMobileButton variant="platinum" icon={<DiamondIcon className="w-5 h-5" />}>
            {language === 'pt' ? 'Serviço Platinum' : 'Platinum Service'}
          </LuxuryMobileButton>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Loading & States</h3>
        <div className="space-y-3">
          <LuxuryMobileButton variant="primary" loading>
            {language === 'pt' ? 'A carregar...' : 'Loading...'}
          </LuxuryMobileButton>
          
          <LuxuryMobileButton variant="secondary" disabled>
            {language === 'pt' ? 'Desativado' : 'Disabled'}
          </LuxuryMobileButton>
        </div>
      </div>
    </div>
  );

  const renderCards = () => (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {language === 'pt' ? 'Cartões Premium' : 'Premium Cards'}
      </h2>

      <div className="space-y-6">
        {sampleCards.map((card, index) => (
          <EliteContentCard
            key={index}
            {...card}
            onLike={() => console.log('Liked')}
            onShare={() => console.log('Shared')}
            onClick={() => console.log('Clicked card')}
          />
        ))}
      </div>
    </div>
  );

  const renderInputs = () => (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {language === 'pt' ? 'Entradas de Luxo' : 'Luxury Inputs'}
      </h2>

      <div className="space-y-6">
        <LuxuryMobileInput
          label={language === 'pt' ? 'Email Premium' : 'Premium Email'}
          type="email"
          placeholder={language === 'pt' ? 'seu.email@premium.com' : 'your.email@premium.com'}
          variant="premium"
          icon={<BellIcon className="w-5 h-5" />}
          required
        />

        <LuxuryMobileInput
          label={language === 'pt' ? 'Busca Elite' : 'Elite Search'}
          type="search"
          placeholder={language === 'pt' ? 'Procurar na comunidade portuguesa...' : 'Search Portuguese community...'}
          variant="elite"
          icon={<MagnifyingGlassIcon className="w-5 h-5" />}
        />

        <LuxuryMobileInput
          label={language === 'pt' ? 'Mensagem Exclusiva' : 'Exclusive Message'}
          type="text"
          placeholder={language === 'pt' ? 'Sua mensagem exclusiva...' : 'Your exclusive message...'}
          variant="standard"
          error={language === 'pt' ? 'Este campo é obrigatório' : 'This field is required'}
        />
      </div>
    </div>
  );

  const renderNavigation = () => (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {language === 'pt' ? 'Navegação Premium' : 'Premium Navigation'}
      </h2>

      <EliteMobileCard variant="premium">
        <h3 className="text-lg font-semibold mb-4">
          {language === 'pt' ? 'Menu de Ações Rápidas' : 'Quick Actions Menu'}
        </h3>
        <LuxuryMobileButton 
          variant="heritage"
          onClick={() => setQuickActionsOpen(true)}
          icon={<BoltIcon className="w-5 h-5" />}
        >
          {language === 'pt' ? 'Abrir Menu' : 'Open Menu'}
        </LuxuryMobileButton>
      </EliteMobileCard>

      <EliteMobileCard variant="elite" badge="NEW">
        <h3 className="text-lg font-semibold mb-4 text-amber-400">
          {language === 'pt' ? 'Navegação Flutuante' : 'Floating Navigation'}
        </h3>
        <LuxuryMobileButton 
          variant="platinum"
          onClick={() => setFloatingNavOpen(!floatingNavOpen)}
          icon={<FireIcon className="w-5 h-5" />}
        >
          {floatingNavOpen 
            ? (language === 'pt' ? 'Fechar FAB' : 'Close FAB')
            : (language === 'pt' ? 'Abrir FAB' : 'Open FAB')
          }
        </LuxuryMobileButton>
      </EliteMobileCard>
    </div>
  );

  return (
    <MobileGestureHandler
      onSwipeLeft={() => console.log('Swiped left')}
      onSwipeRight={() => console.log('Swiped right')}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50"
    >
      {/* Elite Mobile Header */}
      <EliteMobileHeader
        title={language === 'pt' ? 'Elite Mobile' : 'Elite Mobile'}
        subtitle={language === 'pt' ? 'Experiência Premium' : 'Premium Experience'}
        premium
        notificationCount={3}
        onNotifications={() => console.log('Notifications')}
        onProfile={() => console.log('Profile')}
      />

      {/* Demo Navigation */}
      <div className="pt-24 pb-6 px-4">
        <EliteMobileSearch
          placeholder={language === 'pt' ? 'Procurar demos...' : 'Search demos...'}
          value={searchValue}
          onChange={setSearchValue}
          premium
        />
      </div>

      {/* Section Selector */}
      <div className="px-4 pb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {demoSections.map((section) => (
            <motion.button
              key={section.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold whitespace-nowrap transition-all ${
                selectedDemo === section.id
                  ? 'bg-gradient-to-r from-red-600 to-green-600 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 shadow-md'
              }`}
              onClick={() => setSelectedDemo(section.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <section.icon className="w-4 h-4" />
              {section.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <motion.div
        key={selectedDemo}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="pb-24"
      >
        {selectedDemo === 'overview' && renderOverview()}
        {selectedDemo === 'buttons' && renderButtons()}
        {selectedDemo === 'cards' && renderCards()}
        {selectedDemo === 'inputs' && renderInputs()}
        {selectedDemo === 'navigation' && renderNavigation()}
      </motion.div>

      {/* Quick Actions Menu */}
      <QuickActionsMenu
        isOpen={quickActionsOpen}
        onClose={() => setQuickActionsOpen(false)}
        actions={quickActions}
      />

      {/* Floating Navigation */}
      <FloatingNavigation
        isOpen={floatingNavOpen}
        onToggle={() => setFloatingNavOpen(!floatingNavOpen)}
        style="luxury"
      />
    </MobileGestureHandler>
  );
}