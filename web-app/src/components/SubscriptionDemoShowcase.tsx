'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import FeatureGate from './FeatureGate'
import SubscriptionStatusValidator from './SubscriptionStatusValidator'
import UsageLimitIndicator from './UsageLimitIndicator'
import { 
  HeartIcon, 
  ChatBubbleLeftRightIcon, 
  CalendarIcon, 
  PlayIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export default function SubscriptionDemoShowcase() {
  const { language } = useLanguage()
  const [selectedDemo, setSelectedDemo] = useState<'gates' | 'usage' | 'status'>('gates')
  const isPortuguese = language === 'pt'

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isPortuguese ? 'Sistema de Subscrição Alinhado' : 'Aligned Subscription System'}
        </h2>
        <p className="text-gray-600">
          {isPortuguese 
            ? 'Benefícios prometidos = Funcionalidades implementadas'
            : 'Promised benefits = Implemented features'
          }
        </p>
      </div>

      {/* Demo Selector */}
      <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { key: 'gates', label: isPortuguese ? 'Portões de Funcionalidades' : 'Feature Gates', icon: HeartIcon },
          { key: 'usage', label: isPortuguese ? 'Indicadores de Uso' : 'Usage Indicators', icon: ChatBubbleLeftRightIcon },
          { key: 'status', label: isPortuguese ? 'Validador de Status' : 'Status Validator', icon: CheckCircleIcon }
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setSelectedDemo(key as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-all ${
              selectedDemo === key
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Demo Content */}
      <motion.div
        key={selectedDemo}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-[400px]"
      >
        {selectedDemo === 'gates' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isPortuguese ? 'Portões de Funcionalidades' : 'Feature Gates'}
              </h3>
              <p className="text-gray-600">
                {isPortuguese 
                  ? 'Demonstra bloqueio preciso baseado em limites reais'
                  : 'Demonstrates accurate blocking based on real limits'
                }
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  {isPortuguese ? 'Match Bloqueado (Limite Atingido)' : 'Match Blocked (Limit Reached)'}
                </h4>
                <FeatureGate feature="match" showUsageInfo={true}>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                    <HeartIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-green-800">
                      {isPortuguese ? 'Match Criado!' : 'Match Created!'}
                    </p>
                  </div>
                </FeatureGate>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  {isPortuguese ? 'Streaming Requer Ambassador' : 'Streaming Requires Ambassador'}
                </h4>
                <FeatureGate feature="livestream" showUsageInfo={true}>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                    <PlayIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-green-800">
                      {isPortuguese ? 'Stream Iniciado!' : 'Stream Started!'}
                    </p>
                  </div>
                </FeatureGate>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'usage' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isPortuguese ? 'Indicadores de Uso' : 'Usage Indicators'}
              </h3>
              <p className="text-gray-600">
                {isPortuguese 
                  ? 'Mostra limites reais com avisos progressivos'
                  : 'Shows real limits with progressive warnings'
                }
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  {isPortuguese ? 'Limite de Matches (Crítico)' : 'Match Limit (Critical)'}
                </h4>
                <UsageLimitIndicator 
                  type="matches" 
                  position="inline" 
                  showUpgradePrompt={true}
                  compact={false}
                />
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  {isPortuguese ? 'Limite de Mensagens (Alto)' : 'Message Limit (High)'}
                </h4>
                <UsageLimitIndicator 
                  type="messages" 
                  position="inline" 
                  showUpgradePrompt={true}
                  compact={false}
                />
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'status' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isPortuguese ? 'Validador de Status' : 'Status Validator'}
              </h3>
              <p className="text-gray-600">
                {isPortuguese 
                  ? 'Visão geral completa do status da subscrição'
                  : 'Complete overview of subscription status'
                }
              </p>
            </div>
            
            <SubscriptionStatusValidator 
              compact={false}
              showOnlyIssues={false}
              position="inline"
            />
          </div>
        )}
      </motion.div>

      {/* Key Features */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          {isPortuguese ? 'Melhorias Implementadas' : 'Implemented Improvements'}
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: isPortuguese ? 'Limites Precisos' : 'Accurate Limits',
              desc: isPortuguese ? '2 matches, 3 msgs' : '2 matches, 3 msgs'
            },
            {
              title: isPortuguese ? 'Enforcement Real' : 'Real Enforcement',
              desc: isPortuguese ? 'Bloqueios funcionam' : 'Blocks actually work'
            },
            {
              title: isPortuguese ? 'UI Honesta' : 'Honest UI',
              desc: isPortuguese ? 'Promessas = Realidade' : 'Promises = Reality'
            },
            {
              title: isPortuguese ? 'Upgrade Claro' : 'Clear Upgrades',
              desc: isPortuguese ? 'Benefícios reais' : 'Real benefits'
            }
          ].map((item, index) => (
            <div key={index} className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="font-medium text-green-800">{item.title}</div>
              <div className="text-sm text-green-600">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}