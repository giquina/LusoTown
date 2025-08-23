'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useAIConsent } from '@/context/AIConsentContext'
import { privacyPolicyManager } from '@/services/PrivacyPolicyManager'
import { createPortuguesePrivacyFramework } from '@/lib/privacy/PrivacyProtectionFramework'

// =============================================================================
// PRIVACY DASHBOARD COMPONENT
// =============================================================================

export default function PrivacyDashboard() {
  const { language, t } = useLanguage()
  const aiConsent = useAIConsent()
  const [activeTab, setActiveTab] = useState<'overview' | 'permissions' | 'data' | 'cultural' | 'rights'>('overview')
  const [privacyFramework] = useState(() => createPortuguesePrivacyFramework())
  const [dataClassification, setDataClassification] = useState<any>(null)

  useEffect(() => {
    // Initialize privacy dashboard data
    initializePrivacyData()
  }, [])

  const initializePrivacyData = async () => {
    // Classify user's current data
    const userData = {
      culturalPreferences: aiConsent.culturalSensitivityLevel,
      familyData: aiConsent.familyConnections,
      heritageSharing: aiConsent.heritageSharing,
      language: aiConsent.languagePreference
    }

    const classification = privacyFramework.dataClassification.classifyData(userData)
    setDataClassification(classification)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">
            {language === 'pt' ? 'Painel de Privacidade' : 'Privacy Dashboard'}
          </h1>
          <p className="text-lg text-primary-700 max-w-3xl mx-auto">
            {language === 'pt' 
              ? 'Gerir as suas definições de privacidade com sensibilidade cultural portuguesa'
              : 'Manage your privacy settings with Portuguese cultural sensitivity'
            }
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-8 bg-white rounded-xl shadow-lg p-2">
          {[
            { key: 'overview', label: language === 'pt' ? 'Visão Geral' : 'Overview' },
            { key: 'permissions', label: language === 'pt' ? 'Permissões' : 'Permissions' },
            { key: 'data', label: language === 'pt' ? 'Os Meus Dados' : 'My Data' },
            { key: 'cultural', label: language === 'pt' ? 'Preferências Culturais' : 'Cultural Preferences' },
            { key: 'rights', label: language === 'pt' ? 'Os Meus Direitos' : 'My Rights' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-primary-600 hover:bg-primary-50 hover:text-primary-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {activeTab === 'overview' && <PrivacyOverview />}
          {activeTab === 'permissions' && <PrivacyPermissions />}
          {activeTab === 'data' && <DataManagement />}
          {activeTab === 'cultural' && <CulturalPreferences />}
          {activeTab === 'rights' && <PrivacyRights />}
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// PRIVACY OVERVIEW COMPONENT
// =============================================================================

function PrivacyOverview() {
  const { language, t } = useLanguage()
  const aiConsent = useAIConsent()

  const getPrivacyScore = (): number => {
    let score = 0
    
    // Base privacy practices
    score += 20
    
    // Consent management
    if (aiConsent.hasGivenConsent) score += 15
    
    // Cultural sensitivity
    if (aiConsent.culturalSensitivityLevel === 'maximum') score += 20
    else if (aiConsent.culturalSensitivityLevel === 'enhanced') score += 15
    else score += 10
    
    // Data minimization
    if (!aiConsent.analytics) score += 10
    if (!aiConsent.globalData) score += 10
    
    // Family protection
    if (!aiConsent.familyConnections || aiConsent.culturalSensitivityLevel === 'maximum') score += 15
    
    // Heritage protection
    if (!aiConsent.heritageSharing) score += 10
    
    return Math.min(score, 100)
  }

  const privacyScore = getPrivacyScore()

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-primary-900 mb-6">
        {language === 'pt' ? 'Resumo da Privacidade' : 'Privacy Summary'}
      </h2>

      {/* Privacy Score */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-primary-900 mb-4">
            {language === 'pt' ? 'Pontuação de Privacidade' : 'Privacy Score'}
          </h3>
          <div className="flex items-center space-x-4">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="45"
                  fill="none" stroke="#e5e7eb" strokeWidth="8"
                />
                <circle
                  cx="50" cy="50" r="45"
                  fill="none" stroke="#059669" strokeWidth="8"
                  strokeDasharray={`${privacyScore * 2.83} 283`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-900">{privacyScore}%</span>
              </div>
            </div>
            <div>
              <p className="text-primary-700">
                {language === 'pt' 
                  ? 'As suas definições de privacidade seguem as melhores práticas portuguesas'
                  : 'Your privacy settings follow Portuguese best practices'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-accent-50 to-secondary-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-primary-900 mb-4">
            {language === 'pt' ? 'Sensibilidade Cultural' : 'Cultural Sensitivity'}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>{language === 'pt' ? 'Nível' : 'Level'}:</span>
              <span className="font-medium capitalize">{aiConsent.culturalSensitivityLevel}</span>
            </div>
            <div className="flex justify-between">
              <span>{language === 'pt' ? 'Proteção Familiar' : 'Family Protection'}:</span>
              <span className={`font-medium ${!aiConsent.familyConnections ? 'text-green-600' : 'text-yellow-600'}`}>
                {!aiConsent.familyConnections ? 
                  (language === 'pt' ? 'Máxima' : 'Maximum') : 
                  (language === 'pt' ? 'Padrão' : 'Standard')
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span>{language === 'pt' ? 'Preservação do Património' : 'Heritage Preservation'}:</span>
              <span className={`font-medium ${aiConsent.dialectPreservation ? 'text-green-600' : 'text-gray-600'}`}>
                {aiConsent.dialectPreservation ? 
                  (language === 'pt' ? 'Ativa' : 'Active') : 
                  (language === 'pt' ? 'Inativa' : 'Inactive')
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <QuickActionCard
          title={language === 'pt' ? 'Gerir Permissões' : 'Manage Permissions'}
          description={language === 'pt' ? 'Controlar acesso aos seus dados culturais' : 'Control access to your cultural data'}
          icon="🔒"
          onClick={() => {}}
        />
        <QuickActionCard
          title={language === 'pt' ? 'Exportar Dados' : 'Export Data'}
          description={language === 'pt' ? 'Descarregar os seus dados pessoais' : 'Download your personal data'}
          icon="📥"
          onClick={() => {}}
        />
        <QuickActionCard
          title={language === 'pt' ? 'Definições Culturais' : 'Cultural Settings'}
          description={language === 'pt' ? 'Personalizar preferências culturais' : 'Customize cultural preferences'}
          icon="🇵🇹"
          onClick={() => {}}
        />
      </div>
    </div>
  )
}

// =============================================================================
// PRIVACY PERMISSIONS COMPONENT
// =============================================================================

function PrivacyPermissions() {
  const { language } = useLanguage()
  const aiConsent = useAIConsent()

  const permissionSections = [
    {
      title: language === 'pt' ? 'Funcionalidades de IA' : 'AI Features',
      permissions: [
        {
          key: 'notifications',
          name: language === 'pt' ? 'Notificações Inteligentes' : 'Smart Notifications',
          description: language === 'pt' ? 'IA personaliza notificações com base na cultura' : 'AI personalizes notifications based on culture',
          enabled: aiConsent.notifications,
          critical: false
        },
        {
          key: 'matching',
          name: language === 'pt' ? 'Correspondência Cultural' : 'Cultural Matching',
          description: language === 'pt' ? 'IA sugere conexões compatíveis culturalmente' : 'AI suggests culturally compatible connections',
          enabled: aiConsent.matching,
          critical: true
        },
        {
          key: 'lusobot',
          name: language === 'pt' ? 'Assistente LusoBot' : 'LusoBot Assistant',
          description: language === 'pt' ? 'Assistente cultural com IA treinado no património português' : 'AI cultural assistant trained on Portuguese heritage',
          enabled: aiConsent.lusobot,
          critical: false
        }
      ]
    },
    {
      title: language === 'pt' ? 'Dados Culturais' : 'Cultural Data',
      permissions: [
        {
          key: 'heritageSharing',
          name: language === 'pt' ? 'Partilha do Património' : 'Heritage Sharing',
          description: language === 'pt' ? 'Partilhar histórias e tradições culturais' : 'Share cultural stories and traditions',
          enabled: aiConsent.heritageSharing,
          critical: true
        },
        {
          key: 'familyConnections',
          name: language === 'pt' ? 'Ligações Familiares' : 'Family Connections',
          description: language === 'pt' ? 'Conectar com membros da família na plataforma' : 'Connect with family members on the platform',
          enabled: aiConsent.familyConnections,
          critical: true
        },
        {
          key: 'regionalPreferences',
          name: language === 'pt' ? 'Preferências Regionais' : 'Regional Preferences',
          description: language === 'pt' ? 'Personalização baseada na região portuguesa' : 'Personalization based on Portuguese region',
          enabled: aiConsent.regionalPreferences,
          critical: false
        }
      ]
    }
  ]

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-primary-900 mb-6">
        {language === 'pt' ? 'Permissões de Privacidade' : 'Privacy Permissions'}
      </h2>

      <div className="space-y-8">
        {permissionSections.map((section, index) => (
          <div key={index} className="border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-primary-900 mb-4">{section.title}</h3>
            <div className="space-y-4">
              {section.permissions.map((permission) => (
                <PermissionToggle
                  key={permission.key}
                  permission={permission}
                  onToggle={(enabled) => aiConsent.toggleFeatureConsent(permission.key as any, enabled)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Privacy Templates */}
      <div className="mt-8 border-t pt-8">
        <h3 className="text-xl font-semibold text-primary-900 mb-4">
          {language === 'pt' ? 'Modelos de Privacidade' : 'Privacy Templates'}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              template: 'conservative' as const,
              name: language === 'pt' ? 'Conservador' : 'Conservative',
              description: language === 'pt' ? 'Privacidade máxima, funcionalidades mínimas de IA' : 'Maximum privacy, minimal AI features'
            },
            {
              template: 'balanced' as const,
              name: language === 'pt' ? 'Equilibrado' : 'Balanced',
              description: language === 'pt' ? 'Boas funcionalidades de IA com proteção forte de privacidade' : 'Good AI features with strong privacy protection'
            },
            {
              template: 'enhanced' as const,
              name: language === 'pt' ? 'Melhorado' : 'Enhanced',
              description: language === 'pt' ? 'Funcionalidades completas de IA com práticas de privacidade transparentes' : 'Full AI features with transparent privacy practices'
            }
          ].map((template) => (
            <button
              key={template.template}
              onClick={() => aiConsent.applyPrivacyTemplate(template.template)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                aiConsent.privacyTemplate === template.template
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
              }`}
            >
              <h4 className="font-semibold text-primary-900">{template.name}</h4>
              <p className="text-sm text-primary-700 mt-1">{template.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// PERMISSION TOGGLE COMPONENT
// =============================================================================

interface PermissionToggleProps {
  permission: {
    key: string
    name: string
    description: string
    enabled: boolean
    critical: boolean
  }
  onToggle: (enabled: boolean) => void
}

function PermissionToggle({ permission, onToggle }: PermissionToggleProps) {
  const { language } = useLanguage()

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <h4 className="font-medium text-primary-900">{permission.name}</h4>
          {permission.critical && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
              {language === 'pt' ? 'Crítico' : 'Critical'}
            </span>
          )}
        </div>
        <p className="text-sm text-primary-700 mt-1">{permission.description}</p>
      </div>
      <button
        onClick={() => onToggle(!permission.enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
          permission.enabled ? 'bg-primary-500' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            permission.enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )
}

// =============================================================================
// DATA MANAGEMENT COMPONENT
// =============================================================================

function DataManagement() {
  const { language } = useLanguage()
  const aiConsent = useAIConsent()

  const handleDataExport = async () => {
    await aiConsent.requestDataExport()
  }

  const handleDataDeletion = async () => {
    await aiConsent.requestDataDeletion()
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-primary-900 mb-6">
        {language === 'pt' ? 'Gestão de Dados' : 'Data Management'}
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Data Export */}
        <div className="border border-gray-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-primary-900 mb-4">
            {language === 'pt' ? 'Exportar Os Meus Dados' : 'Export My Data'}
          </h3>
          <p className="text-primary-700 mb-4">
            {language === 'pt' 
              ? 'Descarregue todos os seus dados pessoais, incluindo preferências culturais e conteúdo do património.'
              : 'Download all your personal data, including cultural preferences and heritage content.'
            }
          </p>
          <button
            onClick={handleDataExport}
            className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium"
          >
            {language === 'pt' ? 'Solicitar Exportação' : 'Request Export'}
          </button>
        </div>

        {/* Data Deletion */}
        <div className="border border-red-200 rounded-xl p-6 bg-red-50">
          <h3 className="text-xl font-semibold text-red-900 mb-4">
            {language === 'pt' ? 'Eliminar Os Meus Dados' : 'Delete My Data'}
          </h3>
          <p className="text-red-700 mb-4">
            {language === 'pt' 
              ? 'Elimine permanentemente todos os seus dados pessoais. Esta ação não pode ser revertida.'
              : 'Permanently delete all your personal data. This action cannot be undone.'
            }
          </p>
          <button
            onClick={handleDataDeletion}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
          >
            {language === 'pt' ? 'Solicitar Eliminação' : 'Request Deletion'}
          </button>
        </div>
      </div>

      {/* Data Usage Report */}
      <div className="mt-8 border border-gray-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-primary-900 mb-4">
          {language === 'pt' ? 'Relatório de Uso de Dados' : 'Data Usage Report'}
        </h3>
        <p className="text-primary-700 mb-4">
          {language === 'pt' 
            ? 'Veja como os seus dados são utilizados na plataforma, incluindo processamento de IA e partilha cultural.'
            : 'See how your data is used on the platform, including AI processing and cultural sharing.'
          }
        </p>
        <button
          onClick={async () => {
            const report = await aiConsent.getDataUsageReport()
            console.log('Data Usage Report:', report)
          }}
          className="bg-accent-500 text-white px-6 py-3 rounded-lg hover:bg-accent-600 transition-colors duration-200 font-medium"
        >
          {language === 'pt' ? 'Ver Relatório' : 'View Report'}
        </button>
      </div>
    </div>
  )
}

// =============================================================================
// CULTURAL PREFERENCES COMPONENT
// =============================================================================

function CulturalPreferences() {
  const { language } = useLanguage()
  const aiConsent = useAIConsent()

  const handleSensitivityChange = (level: 'standard' | 'enhanced' | 'maximum') => {
    aiConsent.updateCulturalSettings({ sensitivityLevel: level })
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-primary-900 mb-6">
        {language === 'pt' ? 'Preferências Culturais' : 'Cultural Preferences'}
      </h2>

      <div className="space-y-8">
        {/* Cultural Sensitivity Level */}
        <div className="border border-gray-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-primary-900 mb-4">
            {language === 'pt' ? 'Nível de Sensibilidade Cultural' : 'Cultural Sensitivity Level'}
          </h3>
          <div className="space-y-4">
            {[
              {
                level: 'standard' as const,
                name: language === 'pt' ? 'Padrão' : 'Standard',
                description: language === 'pt' ? 'Proteção básica com consciência cultural' : 'Basic protection with cultural awareness'
              },
              {
                level: 'enhanced' as const,
                name: language === 'pt' ? 'Melhorado' : 'Enhanced',
                description: language === 'pt' ? 'Proteção forte com considerações culturais profundas' : 'Strong protection with deep cultural considerations'
              },
              {
                level: 'maximum' as const,
                name: language === 'pt' ? 'Máximo' : 'Maximum',
                description: language === 'pt' ? 'Proteção máxima para dados culturais sensíveis' : 'Maximum protection for sensitive cultural data'
              }
            ].map((option) => (
              <label key={option.level} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="culturalSensitivity"
                  value={option.level}
                  checked={aiConsent.culturalSensitivityLevel === option.level}
                  onChange={() => handleSensitivityChange(option.level)}
                  className="w-4 h-4 text-primary-500"
                />
                <div>
                  <div className="font-medium text-primary-900">{option.name}</div>
                  <div className="text-sm text-primary-700">{option.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Dialect Preservation */}
        <div className="border border-gray-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-primary-900 mb-4">
            {language === 'pt' ? 'Preservação de Dialetos' : 'Dialect Preservation'}
          </h3>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={aiConsent.dialectPreservation}
              onChange={(e) => aiConsent.updateCulturalSettings({ dialectPreservation: e.target.checked })}
              className="w-4 h-4 text-primary-500"
            />
            <div>
              <div className="font-medium text-primary-900">
                {language === 'pt' ? 'Ativar Preservação de Dialetos' : 'Enable Dialect Preservation'}
              </div>
              <div className="text-sm text-primary-700">
                {language === 'pt' 
                  ? 'Ajudar a preservar dialetos regionais portugueses e variações linguísticas'
                  : 'Help preserve Portuguese regional dialects and linguistic variations'
                }
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// PRIVACY RIGHTS COMPONENT
// =============================================================================

function PrivacyRights() {
  const { language } = useLanguage()

  const rights = [
    {
      title: language === 'pt' ? 'Direito de Acesso' : 'Right to Access',
      description: language === 'pt' 
        ? 'Aceder aos seus dados pessoais e compreender como os processamos, com contexto cultural.'
        : 'Access your personal data and understand how we process it, with cultural context provided.',
      action: language === 'pt' ? 'Solicitar Acesso' : 'Request Access'
    },
    {
      title: language === 'pt' ? 'Direito de Retificação' : 'Right to Rectification',
      description: language === 'pt' 
        ? 'Corrigir dados pessoais incorretos, especialmente informações culturais e familiares.'
        : 'Correct inaccurate personal data, especially cultural and family information.',
      action: language === 'pt' ? 'Corrigir Dados' : 'Correct Data'
    },
    {
      title: language === 'pt' ? 'Direito ao Apagamento' : 'Right to Erasure',
      description: language === 'pt' 
        ? 'Solicitar a eliminação dos seus dados, com disposições especiais para dados culturais e familiares.'
        : 'Request deletion of your data, with special provisions for cultural and family data.',
      action: language === 'pt' ? 'Solicitar Eliminação' : 'Request Deletion'
    },
    {
      title: language === 'pt' ? 'Direito à Portabilidade' : 'Right to Portability',
      description: language === 'pt' 
        ? 'Receber os seus dados num formato portável, incluindo preferências culturais e conteúdo do património.'
        : 'Receive your data in a portable format, including cultural preferences and heritage content.',
      action: language === 'pt' ? 'Exportar Dados' : 'Export Data'
    }
  ]

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-primary-900 mb-6">
        {language === 'pt' ? 'Os Meus Direitos de Privacidade' : 'My Privacy Rights'}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {rights.map((right, index) => (
          <div key={index} className="border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-primary-900 mb-3">{right.title}</h3>
            <p className="text-primary-700 mb-4">{right.description}</p>
            <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-200 text-sm font-medium">
              {right.action}
            </button>
          </div>
        ))}
      </div>

      {/* Contact Information */}
      <div className="mt-8 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-primary-900 mb-4">
          {language === 'pt' ? 'Contacto para Questões de Privacidade' : 'Privacy Contact Information'}
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-primary-900">
              {language === 'pt' ? 'Responsável pela Proteção de Dados' : 'Data Protection Officer'}
            </h4>
            <p className="text-primary-700">Dr. Maria Santos</p>
            <p className="text-primary-700">privacy@lusotown.com</p>
            <p className="text-primary-700">+44 20 1234 5678</p>
          </div>
          <div>
            <h4 className="font-medium text-primary-900">
              {language === 'pt' ? 'Apoio em Português' : 'Portuguese Support'}
            </h4>
            <p className="text-primary-700">privacidade@lusotown.com</p>
            <p className="text-primary-700">
              {language === 'pt' ? 'Segunda-Sexta: 9:00-17:00 GMT' : 'Monday-Friday: 9:00-17:00 GMT'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// QUICK ACTION CARD COMPONENT
// =============================================================================

interface QuickActionCardProps {
  title: string
  description: string
  icon: string
  onClick: () => void
}

function QuickActionCard({ title, description, icon, onClick }: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="text-left p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-200 group"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-primary-900 mb-2 group-hover:text-primary-700">
        {title}
      </h3>
      <p className="text-primary-600 text-sm">{description}</p>
    </button>
  )
}