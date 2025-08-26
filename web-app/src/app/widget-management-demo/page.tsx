'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useWidgetManager } from '@/components/WidgetManager';
import { 
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  TabletLandscapeIcon,
  ChatBubbleLeftRightIcon,
  BellIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

/**
 * Widget Management System Demo Page
 * 
 * Tests the Priority 1 Widget Management System at different breakpoints:
 * - 375px (mobile)
 * - 768px (tablet) 
 * - 1024px (desktop)
 * 
 * Features demonstrated:
 * - Z-index hierarchy management
 * - Dynamic positioning based on AppDownloadBar visibility
 * - Mobile-first responsive design
 * - Portuguese cultural theming
 */
export default function WidgetManagementDemoPage() {
  const { language } = useLanguage();
  const { isAppBarVisible, setAppBarVisible, activeWidgets, getWidgetZIndex } = useWidgetManager();
  const [selectedBreakpoint, setSelectedBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

  const isPortuguese = language === 'pt';

  const breakpoints = {
    mobile: '375px',
    tablet: '768px', 
    desktop: '1024px'
  };

  const toggleAppBar = () => {
    setAppBarVisible(!isAppBarVisible);
  };

  const widgetTypes = [
    { type: 'appBar', name: isPortuguese ? 'Barra de Download' : 'App Download Bar', zIndex: 50 },
    { type: 'notification', name: isPortuguese ? 'Notificações' : 'Notifications', zIndex: 60 },
    { type: 'fab', name: isPortuguese ? 'Botão Flutuante' : 'FAB Button', zIndex: 65 },
    { type: 'chat', name: isPortuguese ? 'LusoBot Chat' : 'LusoBot Chat', zIndex: 70 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b-2 border-primary-200">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary-900 mb-2">
              {isPortuguese ? 'Sistema de Gestão de Widgets' : 'Widget Management System'}
            </h1>
            <p className="text-primary-700">
              {isPortuguese 
                ? 'Teste o sistema Priority 1 em diferentes breakpoints'
                : 'Test the Priority 1 system at different breakpoints'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-primary-900 mb-4">
            {isPortuguese ? 'Controlos de Teste' : 'Test Controls'}
          </h2>

          {/* Breakpoint Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary-800 mb-3">
              {isPortuguese ? 'Breakpoint de Teste' : 'Test Breakpoint'}
            </h3>
            <div className="flex gap-3">
              {Object.entries(breakpoints).map(([key, size]) => (
                <button
                  key={key}
                  onClick={() => setSelectedBreakpoint(key as any)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                    selectedBreakpoint === key
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                  }`}
                >
                  {key === 'mobile' && <DevicePhoneMobileIcon className="w-5 h-5" />}
                  {key === 'tablet' && <TabletLandscapeIcon className="w-5 h-5" />}
                  {key === 'desktop' && <ComputerDesktopIcon className="w-5 h-5" />}
                  <span className="font-medium capitalize">{key}</span>
                  <span className="text-sm opacity-80">({size})</span>
                </button>
              ))}
            </div>
          </div>

          {/* App Bar Toggle */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary-800 mb-3">
              {isPortuguese ? 'Estado da Barra de Download' : 'App Download Bar State'}
            </h3>
            <button
              onClick={toggleAppBar}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                isAppBarVisible
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isAppBarVisible 
                ? (isPortuguese ? 'Barra Visível - Clique para Esconder' : 'Bar Visible - Click to Hide')
                : (isPortuguese ? 'Barra Escondida - Clique para Mostrar' : 'Bar Hidden - Click to Show')
              }
            </button>
          </div>
        </div>

        {/* Widget Hierarchy Display */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-primary-900 mb-4">
            {isPortuguese ? 'Hierarquia Z-Index' : 'Z-Index Hierarchy'}
          </h2>
          
          <div className="space-y-3">
            {widgetTypes.map((widget) => (
              <motion.div
                key={widget.type}
                className={`p-4 rounded-lg border-2 ${
                  widget.type === 'appBar' && !isAppBarVisible 
                    ? 'bg-gray-100 border-gray-300 opacity-50'
                    : 'bg-primary-50 border-primary-200'
                }`}
                style={{ 
                  position: 'relative',
                  zIndex: widget.zIndex 
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {widget.type === 'chat' && <ChatBubbleLeftRightIcon className="w-6 h-6 text-primary-600" />}
                    {widget.type === 'notification' && <BellIcon className="w-6 h-6 text-primary-600" />}
                    {widget.type === 'fab' && <PlusIcon className="w-6 h-6 text-primary-600" />}
                    {widget.type === 'appBar' && <DevicePhoneMobileIcon className="w-6 h-6 text-primary-600" />}
                    
                    <div>
                      <h3 className="font-semibold text-primary-900">{widget.name}</h3>
                      <p className="text-sm text-primary-600">
                        Z-Index: {widget.zIndex}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-primary-600">
                      {widget.type === 'appBar' && !isAppBarVisible && (
                        <span className="text-red-500 font-medium">
                          {isPortuguese ? 'Escondida' : 'Hidden'}
                        </span>
                      )}
                      {(widget.type !== 'appBar' || isAppBarVisible) && (
                        <span className="text-green-600 font-medium">
                          {isPortuguese ? 'Ativa' : 'Active'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Breakpoint Simulator */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-primary-900 mb-4">
            {isPortuguese ? 'Simulador de Breakpoint' : 'Breakpoint Simulator'}
          </h2>
          
          <div className="border-4 border-primary-200 rounded-xl overflow-hidden mx-auto bg-primary-50" 
               style={{ 
                 width: breakpoints[selectedBreakpoint],
                 minHeight: '400px',
                 maxWidth: '100%'
               }}>
            <div className="bg-primary-600 text-white px-4 py-2 text-sm font-medium">
              {selectedBreakpoint.toUpperCase()} - {breakpoints[selectedBreakpoint]}
            </div>
            
            <div className="relative h-96 overflow-hidden">
              {/* Simulated Page Content */}
              <div className="p-4 text-center text-primary-700">
                <h3 className="text-lg font-semibold mb-2">
                  {isPortuguese ? 'Conteúdo da Página' : 'Page Content'}
                </h3>
                <p className="text-sm">
                  {isPortuguese 
                    ? 'Os widgets flutuantes aparecem sobre este conteúdo'
                    : 'Floating widgets appear over this content'
                  }
                </p>
              </div>

              {/* Simulated App Download Bar */}
              {isAppBarVisible && (
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-3 text-xs"
                  style={{ zIndex: 50 }}
                >
                  <div className="flex items-center justify-between">
                    <span>📱 {isPortuguese ? 'Descarregar App LusoTown' : 'Download LusoTown App'}</span>
                    <button className="bg-white text-primary-600 px-2 py-1 rounded text-xs">
                      {isPortuguese ? 'Obter' : 'Get'}
                    </button>
                  </div>
                </div>
              )}

              {/* Simulated Chat Widget */}
              <div 
                className={`absolute right-2 w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-lg ${
                  isAppBarVisible ? 'bottom-16' : 'bottom-4'
                } transition-all duration-300`}
                style={{ zIndex: 70 }}
              >
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
              </div>

              {/* Simulated FAB */}
              <div 
                className={`absolute right-2 w-10 h-10 bg-secondary-600 rounded-full flex items-center justify-center shadow-lg ${
                  isAppBarVisible ? 'bottom-32' : 'bottom-20'
                } transition-all duration-300`}
                style={{ zIndex: 65 }}
              >
                <PlusIcon className="w-5 h-5 text-white" />
              </div>

              {/* Simulated Notification */}
              <div 
                className={`absolute left-2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg ${
                  isAppBarVisible ? 'bottom-24' : 'bottom-12'
                } transition-all duration-300`}
                style={{ zIndex: 60 }}
              >
                <BellIcon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center text-sm text-primary-600">
            {isPortuguese 
              ? 'Redimensione a janela do navegador para testar a responsividade real'
              : 'Resize the browser window to test real responsiveness'
            }
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-bold text-primary-900 mb-4">
            {isPortuguese ? 'Estado do Sistema' : 'System Status'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-primary-50 p-4 rounded-lg">
              <h3 className="font-semibold text-primary-800 mb-2">
                {isPortuguese ? 'Widgets Ativos' : 'Active Widgets'}
              </h3>
              <p className="text-primary-600">{activeWidgets.size}</p>
            </div>
            
            <div className="bg-primary-50 p-4 rounded-lg">
              <h3 className="font-semibold text-primary-800 mb-2">
                {isPortuguese ? 'Barra de Download' : 'Download Bar'}
              </h3>
              <p className={`font-medium ${isAppBarVisible ? 'text-green-600' : 'text-red-600'}`}>
                {isAppBarVisible 
                  ? (isPortuguese ? 'Visível' : 'Visible')
                  : (isPortuguese ? 'Escondida' : 'Hidden')
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}