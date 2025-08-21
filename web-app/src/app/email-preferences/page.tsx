"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  EnvelopeIcon, 
  BellIcon, 
  CalendarDaysIcon,
  HeartIcon,
  UserGroupIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import PageHeader from '@/components/PageHeader';
import { ROUTES } from '@/config/routes';

interface EmailPreference {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  enabled: boolean;
  frequency?: string;
}

export default function EmailPreferencesPage() {
  const { t, language } = useLanguage();
  const isPortuguese = language === 'pt';
  const [preferences, setPreferences] = useState<EmailPreference[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Initialize preferences
    setPreferences([
      {
        id: 'events',
        title: isPortuguese ? 'Notificações de Eventos' : 'Event Notifications',
        description: isPortuguese 
          ? 'Novos eventos portugueses, lembretes e atualizações'
          : 'New Portuguese events, reminders, and updates',
        icon: CalendarDaysIcon,
        enabled: true,
        frequency: isPortuguese ? 'Semanal' : 'Weekly'
      },
      {
        id: 'matches',
        title: isPortuguese ? 'Matches e Mensagens' : 'Matches and Messages',
        description: isPortuguese
          ? 'Novos matches, mensagens e conexões da comunidade'
          : 'New matches, messages, and community connections',
        icon: HeartIcon,
        enabled: true,
        frequency: isPortuguese ? 'Instantâneo' : 'Instant'
      },
      {
        id: 'community',
        title: isPortuguese ? 'Atualizações da Comunidade' : 'Community Updates',
        description: isPortuguese
          ? 'Novidades, histórias de sucesso e destaques da comunidade'
          : 'News, success stories, and community highlights',
        icon: UserGroupIcon,
        enabled: true,
        frequency: isPortuguese ? 'Bi-semanal' : 'Bi-weekly'
      },
      {
        id: 'marketing',
        title: isPortuguese ? 'Promoções e Funcionalidades' : 'Promotions and Features',
        description: isPortuguese
          ? 'Novas funcionalidades, descontos e ofertas especiais'
          : 'New features, discounts, and special offers',
        icon: BellIcon,
        enabled: false,
        frequency: isPortuguese ? 'Mensal' : 'Monthly'
      },
      {
        id: 'newsletter',
        title: isPortuguese ? 'Newsletter LusoTown' : 'LusoTown Newsletter',
        description: isPortuguese
          ? 'Resumo mensal da comunidade portuguesa no Reino Unido'
          : 'Monthly summary of the Portuguese community in the UK',
        icon: EnvelopeIcon,
        enabled: true,
        frequency: isPortuguese ? 'Mensal' : 'Monthly'
      }
    ]);

    // Load saved preferences (mock API call)
    loadPreferences();
  }, [isPortuguese]);

  const loadPreferences = async () => {
    setIsLoading(true);
    try {
      // Mock API call - in real implementation, load from backend
      await new Promise(resolve => setTimeout(resolve, 500));
      // Preferences would be loaded from API here
    } catch (error) {
      console.error('Failed to load preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePreference = (id: string) => {
    setPreferences(prev => 
      prev.map(pref => 
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
  };

  const handleSavePreferences = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      // Mock API call to save preferences
      const response = await fetch('/api/email/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferences: preferences.reduce((acc, pref) => {
            acc[pref.id] = pref.enabled;
            return acc;
          }, {} as Record<string, boolean>)
        }),
      });

      if (response.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        throw new Error('Failed to save preferences');
      }
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <PageHeader
        title={isPortuguese ? 'Preferências de Email' : 'Email Preferences'}
        titlePt="Preferências de Email"
        subtitle={isPortuguese 
          ? 'Controle que tipos de comunicação deseja receber por email.'
          : 'Control what types of communications you receive by email.'
        }
        subtitlePt="Controle que tipos de comunicação deseja receber por email."
        theme="primary"
        size="md"
        icon={EnvelopeIcon}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Status Messages */}
          {saveStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-secondary-50 border border-secondary-200 rounded-lg flex items-center gap-2"
            >
              <CheckCircleIcon className="w-5 h-5 text-secondary-600 flex-shrink-0" />
              <span className="text-secondary-700">
                {isPortuguese 
                  ? 'Preferências guardadas com sucesso!' 
                  : 'Preferences saved successfully!'
                }
              </span>
            </motion.div>
          )}

          {saveStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-action-50 border border-action-200 rounded-lg flex items-center gap-2"
            >
              <XMarkIcon className="w-5 h-5 text-action-600 flex-shrink-0" />
              <span className="text-action-700">
                {isPortuguese 
                  ? 'Erro ao guardar preferências. Tente novamente.' 
                  : 'Error saving preferences. Please try again.'
                }
              </span>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-xl border border-primary-200 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-primary-900">
                {isPortuguese ? 'Notificações por Email' : 'Email Notifications'}
              </h2>
              <p className="text-gray-600 mt-2">
                {isPortuguese
                  ? 'Escolha que tipos de emails deseja receber da LusoTown.'
                  : 'Choose what types of emails you want to receive from LusoTown.'
                }
              </p>
            </div>

            {/* Preferences List */}
            <div className="divide-y divide-gray-200">
              {preferences.map((preference) => (
                <motion.div
                  key={preference.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <preference.icon className="w-6 h-6 text-primary-600" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {preference.title}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {preference.description}
                          </p>
                          {preference.frequency && (
                            <p className="text-sm text-primary-600 mt-2 font-medium">
                              {isPortuguese ? 'Frequência: ' : 'Frequency: '}
                              {preference.frequency}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex-shrink-0 ml-6">
                          <button
                            onClick={() => handleTogglePreference(preference.id)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                              preference.enabled
                                ? 'bg-primary-600'
                                : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                preference.enabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="text-sm text-gray-600">
                  {isPortuguese
                    ? 'As suas preferências são guardadas automaticamente quando alteradas.'
                    : 'Your preferences are saved automatically when changed.'
                  }
                </div>
                
                <div className="flex gap-3">
                  <a
                    href={ROUTES.unsubscribe}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    {isPortuguese ? 'Cancelar Tudo' : 'Unsubscribe All'}
                  </a>
                  
                  <button
                    onClick={handleSavePreferences}
                    disabled={isSaving}
                    className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {isPortuguese ? 'Guardando...' : 'Saving...'}
                      </>
                    ) : (
                      isPortuguese ? 'Guardar Preferências' : 'Save Preferences'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-white rounded-lg border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {isPortuguese ? 'Informação Adicional' : 'Additional Information'}
            </h3>
            
            <div className="prose prose-sm max-w-none text-gray-600">
              <ul className="space-y-2">
                <li>
                  {isPortuguese
                    ? 'Pode alterar estas preferências a qualquer momento.'
                    : 'You can change these preferences at any time.'
                  }
                </li>
                <li>
                  {isPortuguese
                    ? 'Emails de segurança e confirmações de conta não podem ser desativados.'
                    : 'Security and account confirmation emails cannot be disabled.'
                  }
                </li>
                <li>
                  {isPortuguese
                    ? 'Para cancelar completamente todos os emails, use o link "Cancelar Tudo" acima.'
                    : 'To completely unsubscribe from all emails, use the "Unsubscribe All" link above.'
                  }
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                {isPortuguese
                  ? 'Precisa de ajuda? '
                  : 'Need help? '
                }
                <a href={ROUTES.contact} className="text-primary-600 hover:text-primary-700 underline">
                  {isPortuguese ? 'Contacte-nos' : 'Contact us'}
                </a>
                {isPortuguese
                  ? ' ou consulte a nossa '
                  : ' or check our '
                }
                <a href={ROUTES.privacy} className="text-primary-600 hover:text-primary-700 underline">
                  {isPortuguese ? 'política de privacidade' : 'privacy policy'}
                </a>
                .
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}