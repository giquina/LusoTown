"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SpeakerWaveIcon,
  EyeIcon,
  HandRaisedIcon,
  AdjustmentsHorizontalIcon,
  DevicePhoneMobileIcon,
  LanguageIcon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
  CogIcon,
  SparklesIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import {
  SpeakerWaveIcon as SpeakerSolidIcon,
  EyeIcon as EyeSolidIcon,
  SunIcon as SunSolidIcon,
  MoonIcon as MoonSolidIcon
} from '@heroicons/react/24/solid';
import { useLanguage } from '@/context/LanguageContext';

// Lusophone Mobile Accessibility Interface
interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  contrast: 'normal' | 'high' | 'enhanced';
  colorScheme: 'light' | 'dark' | 'auto';
  reducedMotion: boolean;
  voiceAnnouncements: boolean;
  touchTargetSize: 'standard' | 'large' | 'xlarge';
  screenReader: boolean;
  keyboardNavigation: boolean;
  hapticFeedback: boolean;
  autoTranslate: boolean;
}

interface MobileAccessibilityEnhancedProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsChange: (settings: AccessibilitySettings) => void;
  currentSettings?: Partial<AccessibilitySettings>;
}

export function MobileAccessibilityEnhanced({
  isOpen,
  onClose,
  onSettingsChange,
  currentSettings = {}
}: MobileAccessibilityEnhancedProps) {
  const { language } = useLanguage();
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 'medium',
    contrast: 'normal',
    colorScheme: 'auto',
    reducedMotion: false,
    voiceAnnouncements: false,
    touchTargetSize: 'standard',
    screenReader: false,
    keyboardNavigation: false,
    hapticFeedback: true,
    autoTranslate: false,
    ...currentSettings
  });

  const [activeTab, setActiveTab] = useState<'visual' | 'motor' | 'cognitive' | 'cultural'>('visual');
  const [previewMode, setPreviewMode] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K, 
    value: AccessibilitySettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
    
    // Announce change to screen readers
    announceToScreenReader(
      language === 'pt' 
        ? `Configuração alterada: ${key} definida como ${value}`
        : `Setting changed: ${key} set to ${value}`
    );
  };

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const tabs = [
    {
      id: 'visual' as const,
      label: language === 'pt' ? 'Visual' : 'Visual',
      icon: EyeIcon,
      solidIcon: EyeSolidIcon,
      description: language === 'pt' ? 'Ajustes de visão e contraste' : 'Vision and contrast adjustments'
    },
    {
      id: 'motor' as const,
      label: language === 'pt' ? 'Motor' : 'Motor',
      icon: HandRaisedIcon,
      solidIcon: HandRaisedIcon,
      description: language === 'pt' ? 'Controles de toque e movimento' : 'Touch and motion controls'
    },
    {
      id: 'cognitive' as const,
      label: language === 'pt' ? 'Cognitivo' : 'Cognitive',
      icon: SpeakerWaveIcon,
      solidIcon: SpeakerSolidIcon,
      description: language === 'pt' ? 'Ajuda de áudio e navegação' : 'Audio assistance and navigation'
    },
    {
      id: 'cultural' as const,
      label: language === 'pt' ? 'Cultural' : 'Cultural',
      icon: LanguageIcon,
      solidIcon: LanguageIcon,
      description: language === 'pt' ? 'Suporte linguístico português' : 'Portuguese language support'
    }
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center sm:justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-title"
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-lg max-h-[90vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 portuguese-safe-area-top">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: previewMode ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center"
              >
                <AdjustmentsHorizontalIcon className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h1 id="accessibility-title" className="font-bold text-gray-900 responsive-portuguese-title">
                  {language === 'pt' ? 'Acessibilidade' : 'Accessibility'}
                </h1>
                <p className="text-sm text-gray-500">
                  {language === 'pt' ? 'Personalize sua experiência' : 'Customize your experience'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setPreviewMode(!previewMode)}
                className={`
                  p-2 rounded-full transition-colors lusophone-touch-target
                  ${previewMode ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}
                `}
                aria-label={language === 'pt' ? 'Modo de pré-visualização' : 'Preview mode'}
              >
                <EyeIcon className="w-5 h-5" />
              </motion.button>
              
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all lusophone-touch-target"
                aria-label={language === 'pt' ? 'Fechar acessibilidade' : 'Close accessibility'}
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex overflow-x-auto portuguese-scrollbar-hide" role="tablist">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const IconComponent = isActive ? tab.solidIcon : tab.icon;
              
              return (
                <motion.button
                  key={tab.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex flex-col items-center gap-1 px-4 py-3 whitespace-nowrap transition-all duration-200 min-w-[80px]
                    ${isActive 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-blue-600'
                    }
                    lusophone-touch-target
                  `}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-xs font-semibold">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto portuguese-smooth-scroll">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="p-6 space-y-6"
              role="tabpanel"
              id={`panel-${activeTab}`}
            >
              {activeTab === 'visual' && (
                <VisualAccessibilityPanel 
                  settings={settings}
                  updateSetting={updateSetting}
                  language={language}
                />
              )}
              {activeTab === 'motor' && (
                <MotorAccessibilityPanel 
                  settings={settings}
                  updateSetting={updateSetting}
                  language={language}
                />
              )}
              {activeTab === 'cognitive' && (
                <CognitiveAccessibilityPanel 
                  settings={settings}
                  updateSetting={updateSetting}
                  language={language}
                />
              )}
              {activeTab === 'cultural' && (
                <CulturalAccessibilityPanel 
                  settings={settings}
                  updateSetting={updateSetting}
                  language={language}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 px-6 py-4 portuguese-safe-area-bottom">
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                // Reset to defaults
                const defaults: AccessibilitySettings = {
                  fontSize: 'medium',
                  contrast: 'normal',
                  colorScheme: 'auto',
                  reducedMotion: false,
                  voiceAnnouncements: false,
                  touchTargetSize: 'standard',
                  screenReader: false,
                  keyboardNavigation: false,
                  hapticFeedback: true,
                  autoTranslate: false
                };
                setSettings(defaults);
                onSettingsChange(defaults);
                announceToScreenReader(
                  language === 'pt' 
                    ? 'Configurações restauradas para padrão'
                    : 'Settings reset to defaults'
                );
              }}
              className="flex-1 px-4 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all font-semibold lusophone-touch-target"
            >
              {language === 'pt' ? 'Restaurar Padrão' : 'Reset to Default'}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all lusophone-touch-target"
            >
              {language === 'pt' ? 'Aplicar Mudanças' : 'Apply Changes'}
            </motion.button>
          </div>
          
          {/* Accessibility Tip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200"
          >
            <div className="flex items-start gap-3">
              <SparklesIcon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-blue-800 mb-1">
                  {language === 'pt' ? 'Dica de Acessibilidade' : 'Accessibility Tip'}
                </p>
                <p className="text-sm text-blue-700 responsive-portuguese-text">
                  {language === 'pt'
                    ? 'Suas configurações são salvas automaticamente e aplicadas em toda a experiência LusoTown.'
                    : 'Your settings are automatically saved and applied throughout the LusoTown experience.'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Visual Accessibility Panel
function VisualAccessibilityPanel({ settings, updateSetting, language }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 responsive-portuguese-title">
          {language === 'pt' ? 'Configurações Visuais' : 'Visual Settings'}
        </h3>
        <p className="text-sm text-gray-600 responsive-portuguese-text">
          {language === 'pt'
            ? 'Ajuste o texto, cores e contraste para melhor visibilidade'
            : 'Adjust text, colors, and contrast for better visibility'}
        </p>
      </div>

      {/* Font Size */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-900">
          {language === 'pt' ? 'Tamanho do Texto' : 'Text Size'}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: 'small', label: language === 'pt' ? 'Pequeno' : 'Small', size: 'text-sm' },
            { value: 'medium', label: language === 'pt' ? 'Médio' : 'Medium', size: 'text-base' },
            { value: 'large', label: language === 'pt' ? 'Grande' : 'Large', size: 'text-lg' },
            { value: 'xlarge', label: language === 'pt' ? 'Extra Grande' : 'Extra Large', size: 'text-xl' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateSetting('fontSize', option.value)}
              className={`
                p-3 rounded-xl border-2 transition-all duration-200 text-left
                ${settings.fontSize === option.value 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                }
                lusophone-touch-target
              `}
              aria-pressed={settings.fontSize === option.value}
            >
              <div className={`font-semibold ${option.size}`}>
                {option.label}
              </div>
              <div className={`text-gray-600 ${option.size}`}>Aa</div>
            </button>
          ))}
        </div>
      </div>

      {/* Contrast */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-900">
          {language === 'pt' ? 'Contraste' : 'Contrast'}
        </label>
        <div className="space-y-2">
          {[
            { 
              value: 'normal', 
              label: language === 'pt' ? 'Normal' : 'Normal',
              description: language === 'pt' ? 'Contraste padrão' : 'Standard contrast'
            },
            { 
              value: 'high', 
              label: language === 'pt' ? 'Alto Contraste' : 'High Contrast',
              description: language === 'pt' ? 'Melhor para baixa visão' : 'Better for low vision'
            },
            { 
              value: 'enhanced', 
              label: language === 'pt' ? 'Contraste Aprimorado' : 'Enhanced Contrast',
              description: language === 'pt' ? 'Máximo contraste disponível' : 'Maximum available contrast'
            }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateSetting('contrast', option.value)}
              className={`
                w-full p-4 rounded-xl border-2 transition-all duration-200 text-left
                ${settings.contrast === option.value 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 bg-white hover:border-blue-300'
                }
                lusophone-touch-target
              `}
              aria-pressed={settings.contrast === option.value}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.description}</div>
                </div>
                {settings.contrast === option.value && (
                  <CheckCircleIcon className="w-6 h-6 text-blue-600" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Color Scheme */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-900">
          {language === 'pt' ? 'Tema de Cores' : 'Color Theme'}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: 'light', label: language === 'pt' ? 'Claro' : 'Light', icon: SunIcon },
            { value: 'dark', label: language === 'pt' ? 'Escuro' : 'Dark', icon: MoonIcon },
            { value: 'auto', label: language === 'pt' ? 'Automático' : 'Auto', icon: DevicePhoneMobileIcon }
          ].map((option) => {
            const IconComponent = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => updateSetting('colorScheme', option.value)}
                className={`
                  p-4 rounded-xl border-2 transition-all duration-200 text-center
                  ${settings.colorScheme === option.value 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                  }
                  lusophone-touch-target
                `}
                aria-pressed={settings.colorScheme === option.value}
              >
                <IconComponent className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-semibold">{option.label}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Motor Accessibility Panel
function MotorAccessibilityPanel({ settings, updateSetting, language }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 responsive-portuguese-title">
          {language === 'pt' ? 'Configurações Motoras' : 'Motor Settings'}
        </h3>
        <p className="text-sm text-gray-600 responsive-portuguese-text">
          {language === 'pt'
            ? 'Ajuste controles de toque e movimento para facilitar interação'
            : 'Adjust touch and motion controls for easier interaction'}
        </p>
      </div>

      {/* Touch Target Size */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-900">
          {language === 'pt' ? 'Tamanho dos Botões' : 'Button Size'}
        </label>
        <div className="space-y-2">
          {[
            { 
              value: 'standard', 
              label: language === 'pt' ? 'Padrão (44px)' : 'Standard (44px)',
              description: language === 'pt' ? 'Tamanho recomendado para a maioria' : 'Recommended for most users'
            },
            { 
              value: 'large', 
              label: language === 'pt' ? 'Grande (56px)' : 'Large (56px)',
              description: language === 'pt' ? 'Mais fácil de tocar' : 'Easier to tap'
            },
            { 
              value: 'xlarge', 
              label: language === 'pt' ? 'Extra Grande (72px)' : 'Extra Large (72px)',
              description: language === 'pt' ? 'Máximo tamanho de botão' : 'Maximum button size'
            }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateSetting('touchTargetSize', option.value)}
              className={`
                w-full p-4 rounded-xl border-2 transition-all duration-200 text-left
                ${settings.touchTargetSize === option.value 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 bg-white hover:border-green-300'
                }
                lusophone-touch-target
              `}
              aria-pressed={settings.touchTargetSize === option.value}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.description}</div>
                </div>
                {settings.touchTargetSize === option.value && (
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Reduced Motion */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              {language === 'pt' ? 'Reduzir Animações' : 'Reduce Motion'}
            </label>
            <p className="text-sm text-gray-600">
              {language === 'pt'
                ? 'Minimiza animações e transições'
                : 'Minimizes animations and transitions'}
            </p>
          </div>
          <button
            onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
            className={`
              relative w-12 h-7 rounded-full transition-colors duration-200
              ${settings.reducedMotion ? 'bg-green-500' : 'bg-gray-300'}
              lusophone-touch-target
            `}
            role="switch"
            aria-checked={settings.reducedMotion}
          >
            <motion.div
              className="w-5 h-5 bg-white rounded-full shadow-md"
              animate={{ x: settings.reducedMotion ? 20 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{ y: 4 }}
            />
          </button>
        </div>
      </div>

      {/* Haptic Feedback */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              {language === 'pt' ? 'Vibração Tátil' : 'Haptic Feedback'}
            </label>
            <p className="text-sm text-gray-600">
              {language === 'pt'
                ? 'Vibração ao tocar em botões'
                : 'Vibration when tapping buttons'}
            </p>
          </div>
          <button
            onClick={() => updateSetting('hapticFeedback', !settings.hapticFeedback)}
            className={`
              relative w-12 h-7 rounded-full transition-colors duration-200
              ${settings.hapticFeedback ? 'bg-purple-500' : 'bg-gray-300'}
              lusophone-touch-target
            `}
            role="switch"
            aria-checked={settings.hapticFeedback}
          >
            <motion.div
              className="w-5 h-5 bg-white rounded-full shadow-md"
              animate={{ x: settings.hapticFeedback ? 20 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{ y: 4 }}
            />
          </button>
        </div>
      </div>

      {/* Keyboard Navigation */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              {language === 'pt' ? 'Navegação por Teclado' : 'Keyboard Navigation'}
            </label>
            <p className="text-sm text-gray-600">
              {language === 'pt'
                ? 'Melhor suporte para teclados externos'
                : 'Enhanced support for external keyboards'}
            </p>
          </div>
          <button
            onClick={() => updateSetting('keyboardNavigation', !settings.keyboardNavigation)}
            className={`
              relative w-12 h-7 rounded-full transition-colors duration-200
              ${settings.keyboardNavigation ? 'bg-blue-500' : 'bg-gray-300'}
              lusophone-touch-target
            `}
            role="switch"
            aria-checked={settings.keyboardNavigation}
          >
            <motion.div
              className="w-5 h-5 bg-white rounded-full shadow-md"
              animate={{ x: settings.keyboardNavigation ? 20 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{ y: 4 }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

// Cognitive Accessibility Panel
function CognitiveAccessibilityPanel({ settings, updateSetting, language }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 responsive-portuguese-title">
          {language === 'pt' ? 'Configurações Cognitivas' : 'Cognitive Settings'}
        </h3>
        <p className="text-sm text-gray-600 responsive-portuguese-text">
          {language === 'pt'
            ? 'Ajuda de áudio e navegação para melhor compreensão'
            : 'Audio assistance and navigation for better understanding'}
        </p>
      </div>

      {/* Voice Announcements */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              {language === 'pt' ? 'Anúncios de Voz' : 'Voice Announcements'}
            </label>
            <p className="text-sm text-gray-600">
              {language === 'pt'
                ? 'Narração de ações e navegação'
                : 'Narrates actions and navigation'}
            </p>
          </div>
          <button
            onClick={() => updateSetting('voiceAnnouncements', !settings.voiceAnnouncements)}
            className={`
              relative w-12 h-7 rounded-full transition-colors duration-200
              ${settings.voiceAnnouncements ? 'bg-blue-500' : 'bg-gray-300'}
              lusophone-touch-target
            `}
            role="switch"
            aria-checked={settings.voiceAnnouncements}
          >
            <motion.div
              className="w-5 h-5 bg-white rounded-full shadow-md"
              animate={{ x: settings.voiceAnnouncements ? 20 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{ y: 4 }}
            />
          </button>
        </div>
      </div>

      {/* Screen Reader Support */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              {language === 'pt' ? 'Suporte a Leitor de Tela' : 'Screen Reader Support'}
            </label>
            <p className="text-sm text-gray-600">
              {language === 'pt'
                ? 'Otimizado para VoiceOver e TalkBack'
                : 'Optimized for VoiceOver and TalkBack'}
            </p>
          </div>
          <button
            onClick={() => updateSetting('screenReader', !settings.screenReader)}
            className={`
              relative w-12 h-7 rounded-full transition-colors duration-200
              ${settings.screenReader ? 'bg-green-500' : 'bg-gray-300'}
              lusophone-touch-target
            `}
            role="switch"
            aria-checked={settings.screenReader}
          >
            <motion.div
              className="w-5 h-5 bg-white rounded-full shadow-md"
              animate={{ x: settings.screenReader ? 20 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{ y: 4 }}
            />
          </button>
        </div>
      </div>

      {/* Audio Cues */}
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
        <div className="flex items-start gap-3">
          <SpeakerSolidIcon className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">
              {language === 'pt' ? 'Teste de Áudio' : 'Audio Test'}
            </h4>
            <p className="text-sm text-blue-700 mb-3">
              {language === 'pt'
                ? 'Teste se os anúncios de voz funcionam no seu dispositivo'
                : 'Test if voice announcements work on your device'}
            </p>
            <button
              onClick={() => {
                const text = language === 'pt' 
                  ? 'Esta é uma mensagem de teste do LusoTown. Os anúncios de voz estão funcionando.'
                  : 'This is a test message from LusoTown. Voice announcements are working.';
                  
                if ('speechSynthesis' in window) {
                  const utterance = new SpeechSynthesisUtterance(text);
                  utterance.lang = language === 'pt' ? 'pt-PT' : 'en-US';
                  speechSynthesis.speak(utterance);
                }
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors lusophone-touch-target"
            >
              {language === 'pt' ? 'Testar Áudio' : 'Test Audio'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Cultural Accessibility Panel
function CulturalAccessibilityPanel({ settings, updateSetting, language }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 responsive-portuguese-title">
          {language === 'pt' ? 'Configurações Culturais' : 'Cultural Settings'}
        </h3>
        <p className="text-sm text-gray-600 responsive-portuguese-text">
          {language === 'pt'
            ? 'Suporte linguístico e cultural para comunidade lusófona'
            : 'Language and cultural support for Portuguese-speaking community'}
        </p>
      </div>

      {/* Auto Translate */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              {language === 'pt' ? 'Tradução Automática' : 'Auto Translate'}
            </label>
            <p className="text-sm text-gray-600">
              {language === 'pt'
                ? 'Traduz automaticamente entre português e inglês'
                : 'Automatically translates between Lusophone and English'}
            </p>
          </div>
          <button
            onClick={() => updateSetting('autoTranslate', !settings.autoTranslate)}
            className={`
              relative w-12 h-7 rounded-full transition-colors duration-200
              ${settings.autoTranslate ? 'bg-red-500' : 'bg-gray-300'}
              lusophone-touch-target
            `}
            role="switch"
            aria-checked={settings.autoTranslate}
          >
            <motion.div
              className="w-5 h-5 bg-white rounded-full shadow-md"
              animate={{ x: settings.autoTranslate ? 20 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{ y: 4 }}
            />
          </button>
        </div>
      </div>

      {/* Lusophone Cultural Context */}
      <div className="p-4 bg-gradient-to-r from-red-50 via-yellow-50 to-green-50 rounded-xl border border-red-200">
        <div className="flex items-start gap-3">
          <HeartIcon className="w-6 h-6 text-red-600 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">
              {language === 'pt' ? 'Inclusão Cultural' : 'Cultural Inclusion'}
            </h4>
            <p className="text-sm text-gray-700 mb-3 responsive-portuguese-text">
              {language === 'pt'
                ? 'LusoTown celebra TODAS as culturas lusófonas: Portugal, Brasil, Cabo Verde, Angola, Moçambique, Guiné-Bissau, São Tomé e Príncipe, e Timor-Leste.'
                : 'LusoTown celebrates ALL Portuguese-speaking cultures: Portugal, Brazil, Cape Verde, Angola, Mozambique, Guinea-Bissau, São Tomé and Príncipe, and Timor-Leste.'}
            </p>
            
            <div className="text-2xl mb-2 text-center">
              🇵🇹🇧🇷🇨🇻🇦🇴🇲🇿🇬🇼🇸🇹🇹🇱
            </div>
            
            <p className="text-sm text-gray-600 text-center italic">
              {language === 'pt' ? 'Unidos pela Língua' : 'Unidos pela Língua'}
            </p>
          </div>
        </div>
      </div>

      {/* Accessibility Guidelines */}
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">
          {language === 'pt' ? 'Diretrizes de Acessibilidade' : 'Accessibility Guidelines'}
        </h4>
        <ul className="space-y-2 text-sm text-blue-700">
          <li className="flex items-start gap-2">
            <CheckCircleIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <span>WCAG 2.1 AA {language === 'pt' ? 'compliant' : 'compliant'}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircleIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <span>{language === 'pt' ? 'Suporte total a leitores de tela' : 'Full screen reader support'}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircleIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <span>{language === 'pt' ? 'Navegação por teclado completa' : 'Full keyboard navigation'}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircleIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <span>{language === 'pt' ? 'Suporte multilíngue português' : 'Lusophone multilingual support'}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MobileAccessibilityEnhanced;