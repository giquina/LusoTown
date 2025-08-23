"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XMarkIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import PageHeader from '@/components/PageHeader';
import { ROUTES } from '@/config/routes';

function UnsubscribeContent() {
  const { t, language } = useLanguage();
  const isPortuguese = language === 'pt';
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [unsubscribeType, setUnsubscribeType] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const unsubscribeOptions = [
    {
      id: 'marketing',
      title: isPortuguese ? 'Emails de Marketing' : 'Marketing Emails',
      description: isPortuguese 
        ? 'Novos eventos, funcionalidades e promoções especiais'
        : 'New events, features, and special promotions'
    },
    {
      id: 'events',
      title: isPortuguese ? 'Notificações de Eventos' : 'Event Notifications', 
      description: isPortuguese
        ? 'Atualizações sobre eventos próximos e convites'
        : 'Updates about upcoming events and invitations'
    },
    {
      id: 'matches',
      title: isPortuguese ? 'Notificações de Matches' : 'Match Notifications',
      description: isPortuguese
        ? 'Novos matches e mensagens de conexões'
        : 'New matches and connection messages'
    },
    {
      id: 'community',
      title: isPortuguese ? 'Atualizações da Comunidade' : 'Community Updates',
      description: isPortuguese
        ? 'Novidades e histórias da comunidade portuguesa'
        : 'News and stories from the Portuguese community'
    },
    {
      id: 'all',
      title: isPortuguese ? 'Todos os Emails' : 'All Emails',
      description: isPortuguese
        ? 'Cancelar todos os tipos de comunicação por email'
        : 'Unsubscribe from all email communications'
    }
  ];

  const handleUnsubscribe = async () => {
    if (!email || unsubscribeType.length === 0) {
      setError(isPortuguese ? 'Por favor selecione pelo menos uma opção' : 'Please select at least one option');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/email/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          types: unsubscribeType,
        }),
      });

      if (response.ok) {
        setIsComplete(true);
      } else {
        throw new Error('Failed to unsubscribe');
      }
    } catch (err) {
      setError(isPortuguese 
        ? 'Erro ao processar pedido. Tente novamente.' 
        : 'Error processing request. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionChange = (optionId: string) => {
    if (optionId === 'all') {
      setUnsubscribeType(['all']);
    } else {
      setUnsubscribeType(prev => {
        const newTypes = prev.filter(type => type !== 'all');
        if (prev.includes(optionId)) {
          return newTypes.filter(type => type !== optionId);
        } else {
          return [...newTypes, optionId];
        }
      });
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <PageHeader
          title={isPortuguese ? 'Cancelamento Confirmado' : 'Unsubscribed Successfully'}
          titlePt="Cancelamento Confirmado"
          subtitle={isPortuguese 
            ? 'As suas preferências de email foram atualizadas com sucesso.'
            : 'Your email preferences have been updated successfully.'
          }
          subtitlePt="As suas preferências de email foram atualizadas com sucesso."
          theme="primary"
          size="md"
          icon={CheckCircleIcon}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-xl border border-primary-200 p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircleIcon className="w-8 h-8 text-primary-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-primary-900 mb-4">
                {isPortuguese ? 'Tudo Pronto!' : 'All Done!'}
              </h3>
              
              <p className="text-gray-600 mb-8">
                {isPortuguese
                  ? 'Não receberá mais emails dos tipos que selecionou. Pode sempre alterar as suas preferências nas definições da conta.'
                  : 'You will no longer receive emails of the types you selected. You can always change your preferences in your account settings.'
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={ROUTES.home}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                >
                  {isPortuguese ? 'Voltar à Página Inicial' : 'Back to Home'}
                </a>
                <a
                  href={ROUTES.settings}
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary-300 text-base font-medium rounded-lg text-primary-700 bg-white hover:bg-primary-50 transition-colors"
                >
                  {isPortuguese ? 'Definições da Conta' : 'Account Settings'}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <PageHeader
        title={isPortuguese ? 'Cancelar Subscrição de Emails' : 'Unsubscribe from Emails'}
        titlePt="Cancelar Subscrição de Emails"
        subtitle={isPortuguese 
          ? 'Gerencie as suas preferências de comunicação por email.'
          : 'Manage your email communication preferences.'
        }
        subtitlePt="Gerencie as suas preferências de comunicação por email."
        theme="primary"
        size="md"
        icon={EnvelopeIcon}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-xl border border-primary-200 p-8"
          >
            {/* Email Input */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isPortuguese ? 'Endereço de Email' : 'Email Address'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isPortuguese ? 'seu.email@exemplo.com' : 'your.email@example.com'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                required
              />
            </div>

            {/* Unsubscribe Options */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {isPortuguese 
                  ? 'Que tipos de emails não quer mais receber?' 
                  : 'What types of emails would you like to unsubscribe from?'
                }
              </h3>
              
              <div className="space-y-4">
                {unsubscribeOptions.map((option) => (
                  <label 
                    key={option.id}
                    className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={unsubscribeType.includes(option.id)}
                      onChange={() => handleOptionChange(option.id)}
                      className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{option.title}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-action-50 border border-action-200 rounded-lg flex items-center gap-2">
                <XMarkIcon className="w-5 h-5 text-action-600 flex-shrink-0" />
                <span className="text-action-700">{error}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <a
                href={ROUTES.home}
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                {isPortuguese ? 'Cancelar' : 'Cancel'}
              </a>
              <button
                onClick={handleUnsubscribe}
                disabled={isLoading}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-action-600 hover:bg-action-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {isPortuguese ? 'Processando...' : 'Processing...'}
                  </>
                ) : (
                  isPortuguese ? 'Cancelar Subscrição' : 'Unsubscribe'
                )}
              </button>
            </div>
          </motion.div>

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600">
              {isPortuguese
                ? 'Precisa de ajuda? '
                : 'Need help? '
              }
              <a href={ROUTES.contact} className="text-primary-600 hover:text-primary-700 underline">
                {isPortuguese ? 'Contacte-nos' : 'Contact us'}
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  // Wrap the content that uses useSearchParams in a Suspense boundary per Next.js app router requirements
  return (
    <Suspense fallback={<div className="min-h-screen" />}> 
      <UnsubscribeContent />
    </Suspense>
  );
}