'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useAIConsent } from '@/context/AIConsentContext'
import { privacyPolicyManager } from '@/services/PrivacyPolicyManager'
import { createPortuguesePrivacyFramework } from '@/lib/privacy/PrivacyProtectionFramework'
import { gdprComplianceAuditEngine, type GDPRComplianceAudit } from '@/lib/privacy/GDPRComplianceAuditEngine'
import { ChevronDownIcon, ChevronUpIcon, ExclamationTriangleIcon, CheckCircleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

// =============================================================================
// COMPREHENSIVE PRIVACY DASHBOARD COMPONENT
// =============================================================================

export default function ComprehensivePrivacyDashboard() {
  const { language, t } = useLanguage()
  const aiConsent = useAIConsent()
  const [activeTab, setActiveTab] = useState<'overview' | 'permissions' | 'data' | 'cultural' | 'rights' | 'compliance' | 'audit'>('overview')
  const [privacyFramework] = useState(() => createPortuguesePrivacyFramework())
  const [dataClassification, setDataClassification] = useState<any>(null)
  const [complianceAudit, setComplianceAudit] = useState<GDPRComplianceAudit | null>(null)
  const [auditLoading, setAuditLoading] = useState(false)
  const [dataExportProgress, setDataExportProgress] = useState(0)
  const [dataDeletionProgress, setDataDeletionProgress] = useState(0)

  useEffect(() => {
    // Initialize privacy dashboard data
    initializePrivacyData()
    // Run initial compliance audit
    runComplianceAudit()
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

  const runComplianceAudit = async () => {
    setAuditLoading(true)
    try {
      const audit = await gdprComplianceAuditEngine.performComplianceAudit()
      setComplianceAudit(audit)
    } catch (error) {
      console.error('Failed to run compliance audit:', error)
    } finally {
      setAuditLoading(false)
    }
  }

  const handleDataExport = async () => {
    setDataExportProgress(10)
    // Simulate export progress
    const interval = setInterval(() => {
      setDataExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 500)

    await aiConsent.requestDataExport()
  }

  const handleDataDeletion = async () => {
    setDataDeletionProgress(10)
    // Simulate deletion progress
    const interval = setInterval(() => {
      setDataDeletionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 500)

    await aiConsent.requestDataDeletion()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">
            {language === 'pt' ? 'Centro de Controlo de Privacidade' : 'Privacy Control Center'}
          </h1>
          <p className="text-lg text-primary-700 max-w-4xl mx-auto">
            {language === 'pt' 
              ? 'Gerir as suas definições de privacidade com sensibilidade cultural portuguesa e conformidade RGPD completa'
              : 'Manage your privacy settings with Lusophone cultural sensitivity and full GDPR compliance'
            }
          </p>
          
          {/* Compliance Status */}
          {complianceAudit && (
            <div className="mt-6 flex justify-center">
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                complianceAudit.overallScore >= 90 ? 'bg-green-100 text-green-800' :
                complianceAudit.overallScore >= 70 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {complianceAudit.overallScore >= 90 ? (
                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                ) : complianceAudit.overallScore >= 70 ? (
                  <ExclamationTriangleIcon className="w-4 h-4 mr-2" />
                ) : (
                  <XCircleIcon className="w-4 h-4 mr-2" />
                )}
                {language === 'pt' ? 'Conformidade RGPD' : 'GDPR Compliance'}: {complianceAudit.overallScore}%
              </div>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-8 bg-white rounded-xl shadow-lg p-2">
          {[
            { key: 'overview', label: language === 'pt' ? 'Visão Geral' : 'Overview', icon: '📊' },
            { key: 'permissions', label: language === 'pt' ? 'Permissões' : 'Permissions', icon: '🔒' },
            { key: 'data', label: language === 'pt' ? 'Os Meus Dados' : 'My Data', icon: '📁' },
            { key: 'cultural', label: language === 'pt' ? 'Preferências Culturais' : 'Cultural Preferences', icon: '🇵🇹' },
            { key: 'rights', label: language === 'pt' ? 'Os Meus Direitos' : 'My Rights', icon: '⚖️' },
            { key: 'compliance', label: language === 'pt' ? 'Conformidade RGPD' : 'GDPR Compliance', icon: '✅' },
            { key: 'audit', label: language === 'pt' ? 'Auditoria' : 'Audit Trail', icon: '📋' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                activeTab === tab.key
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-primary-600 hover:bg-primary-50 hover:text-primary-700'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:block">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {activeTab === 'overview' && (
            <PrivacyOverviewTab 
              complianceAudit={complianceAudit} 
              dataClassification={dataClassification}
            />
          )}
          {activeTab === 'permissions' && <PermissionsTab />}
          {activeTab === 'data' && (
            <DataManagementTab 
              onDataExport={handleDataExport}
              onDataDeletion={handleDataDeletion}
              exportProgress={dataExportProgress}
              deletionProgress={dataDeletionProgress}
            />
          )}
          {activeTab === 'cultural' && <CulturalPreferencesTab />}
          {activeTab === 'rights' && <PrivacyRightsTab />}
          {activeTab === 'compliance' && (
            <GDPRComplianceTab 
              complianceAudit={complianceAudit} 
              auditLoading={auditLoading} 
              onRunAudit={runComplianceAudit} 
            />
          )}
          {activeTab === 'audit' && <AuditTrailTab />}
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// PRIVACY OVERVIEW TAB
// =============================================================================

function PrivacyOverviewTab({ 
  complianceAudit, 
  dataClassification 
}: { 
  complianceAudit: GDPRComplianceAudit | null
  dataClassification: any 
}) {
  const { language } = useLanguage()
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

      {/* Privacy Metrics Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Privacy Score */}
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-primary-900 mb-4">
            {language === 'pt' ? 'Pontuação de Privacidade' : 'Privacy Score'}
          </h3>
          <div className="flex items-center space-x-4">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="40"
                  fill="none" stroke="#e5e7eb" strokeWidth="8"
                />
                <circle
                  cx="50" cy="50" r="40"
                  fill="none" stroke="#059669" strokeWidth="8"
                  strokeDasharray={`${privacyScore * 2.51} 251`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-primary-900">{privacyScore}%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-primary-700">
                {language === 'pt' 
                  ? 'Proteção robusta com sensibilidade cultural'
                  : 'Robust protection with cultural sensitivity'
                }
              </p>
            </div>
          </div>
        </div>

        {/* GDPR Compliance Score */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-primary-900 mb-4">
            {language === 'pt' ? 'Conformidade RGPD' : 'GDPR Compliance'}
          </h3>
          <div className="flex items-center space-x-4">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="40"
                  fill="none" stroke="#e5e7eb" strokeWidth="8"
                />
                <circle
                  cx="50" cy="50" r="40"
                  fill="none" stroke="#3b82f6" strokeWidth="8"
                  strokeDasharray={`${(complianceAudit?.overallScore || 0) * 2.51} 251`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-primary-900">{complianceAudit?.overallScore || 0}%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-primary-700">
                {language === 'pt' 
                  ? 'Conformidade total com regulamentos'
                  : 'Full regulatory compliance'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Cultural Sensitivity */}
        <div className="bg-gradient-to-r from-accent-50 to-secondary-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-primary-900 mb-4">
            {language === 'pt' ? 'Sensibilidade Cultural' : 'Cultural Sensitivity'}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">{language === 'pt' ? 'Nível' : 'Level'}:</span>
              <span className="font-medium capitalize text-sm">{aiConsent.culturalSensitivityLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">{language === 'pt' ? 'Proteção Familiar' : 'Family Protection'}:</span>
              <span className={`font-medium text-sm ${!aiConsent.familyConnections ? 'text-green-600' : 'text-yellow-600'}`}>
                {!aiConsent.familyConnections ? 
                  (language === 'pt' ? 'Máxima' : 'Maximum') : 
                  (language === 'pt' ? 'Padrão' : 'Standard')
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">{language === 'pt' ? 'Património' : 'Heritage'}:</span>
              <span className={`font-medium text-sm ${aiConsent.dialectPreservation ? 'text-green-600' : 'text-gray-600'}`}>
                {aiConsent.dialectPreservation ? 
                  (language === 'pt' ? 'Ativa' : 'Active') : 
                  (language === 'pt' ? 'Inativa' : 'Inactive')
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Issues Alert */}
      {complianceAudit && complianceAudit.compliance.criticalIssues.length > 0 && (
        <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-400 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">
                {language === 'pt' ? 'Questões Críticas de Privacidade' : 'Critical Privacy Issues'}
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc pl-5">
                  {complianceAudit.compliance.criticalIssues.slice(0, 3).map((issue, index) => (
                    <li key={index}>{issue.description}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-4">
        <QuickActionCard
          title={language === 'pt' ? 'Gerir Permissões' : 'Manage Permissions'}
          description={language === 'pt' ? 'Controlar acesso aos dados culturais' : 'Control cultural data access'}
          icon="🔒"
          onClick={() => {}}
        />
        <QuickActionCard
          title={language === 'pt' ? 'Exportar Dados' : 'Export Data'}
          description={language === 'pt' ? 'Descarregar dados pessoais' : 'Download personal data'}
          icon="📥"
          onClick={() => {}}
        />
        <QuickActionCard
          title={language === 'pt' ? 'Auditoria RGPD' : 'GDPR Audit'}
          description={language === 'pt' ? 'Ver conformidade detalhada' : 'View detailed compliance'}
          icon="📋"
          onClick={() => {}}
        />
        <QuickActionCard
          title={language === 'pt' ? 'Definições Culturais' : 'Cultural Settings'}
          description={language === 'pt' ? 'Personalizar preferências' : 'Customize preferences'}
          icon="🇵🇹"
          onClick={() => {}}
        />
      </div>
    </div>
  )
}

// =============================================================================
// GDPR COMPLIANCE TAB
// =============================================================================

function GDPRComplianceTab({ 
  complianceAudit, 
  auditLoading, 
  onRunAudit 
}: { 
  complianceAudit: GDPRComplianceAudit | null
  auditLoading: boolean
  onRunAudit: () => void 
}) {
  const { language } = useLanguage()
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null)

  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold text-primary-900 mb-2">
            {language === 'pt' ? 'Conformidade RGPD' : 'GDPR Compliance'}
          </h2>
          <p className="text-primary-700">
            {language === 'pt' 
              ? 'Auditoria completa da conformidade com regulamentos de proteção de dados'
              : 'Comprehensive audit of data protection regulation compliance'
            }
          </p>
        </div>
        <button
          onClick={onRunAudit}
          disabled={auditLoading}
          className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium disabled:opacity-50"
        >
          {auditLoading ? 
            (language === 'pt' ? 'A auditar...' : 'Auditing...') :
            (language === 'pt' ? 'Executar Auditoria' : 'Run Audit')
          }
        </button>
      </div>

      {auditLoading && (
        <div className="mb-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-lg">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-3"></div>
            <span className="text-blue-700">
              {language === 'pt' ? 'A executar auditoria RGPD...' : 'Running GDPR audit...'}
            </span>
          </div>
        </div>
      )}

      {complianceAudit && (
        <>
          {/* Overall Compliance Score */}
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-primary-900">
                {language === 'pt' ? 'Pontuação Geral' : 'Overall Score'}
              </h3>
              <div className="flex items-center space-x-2">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  complianceAudit.overallScore >= 90 ? 'bg-green-100 text-green-800' :
                  complianceAudit.overallScore >= 70 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {complianceAudit.overallScore}%
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${
                  complianceAudit.overallScore >= 90 ? 'bg-green-500' :
                  complianceAudit.overallScore >= 70 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${complianceAudit.overallScore}%` }}
              ></div>
            </div>
            <p className="text-sm text-primary-700">
              {language === 'pt' ? 'Última auditoria: ' : 'Last audit: '}
              {new Date(complianceAudit.timestamp).toLocaleString(language === 'pt' ? 'pt-PT' : 'en-GB')}
            </p>
          </div>

          {/* Article Compliance */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-primary-900 mb-4">
              {language === 'pt' ? 'Conformidade por Artigo' : 'Article Compliance'}
            </h3>
            <div className="space-y-4">
              {complianceAudit.compliance.articles.map((article) => (
                <div key={article.article} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setExpandedArticle(
                      expandedArticle === article.article ? null : article.article
                    )}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        article.compliant ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <h4 className="font-medium text-primary-900">
                          {language === 'pt' ? 'Artigo' : 'Article'} {article.article}: {article.title}
                        </h4>
                        <p className="text-sm text-primary-600 mt-1">
                          {language === 'pt' ? 'Pontuação' : 'Score'}: {article.score}%
                        </p>
                      </div>
                    </div>
                    {expandedArticle === article.article ? (
                      <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  
                  {expandedArticle === article.article && (
                    <div className="px-6 pb-4 border-t border-gray-100">
                      <div className="mt-4">
                        {article.portugueseContext && (
                          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">
                              <strong>{language === 'pt' ? 'Contexto Português:' : 'Portuguese Context:'}</strong> {article.portugueseContext}
                            </p>
                          </div>
                        )}
                        
                        <h5 className="font-medium text-primary-900 mb-2">
                          {language === 'pt' ? 'Requisitos:' : 'Requirements:'}
                        </h5>
                        <div className="space-y-2">
                          {article.requirements.map((req, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                req.status === 'compliant' ? 'bg-green-500' :
                                req.status === 'partially_compliant' ? 'bg-yellow-500' :
                                req.status === 'non_compliant' ? 'bg-red-500' :
                                'bg-gray-400'
                              }`}></div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-primary-900">{req.requirement}</p>
                                <p className="text-xs text-primary-600 capitalize">{req.status.replace('_', ' ')}</p>
                                {req.evidence && req.evidence.length > 0 && (
                                  <div className="mt-1">
                                    <p className="text-xs text-gray-600 font-medium">
                                      {language === 'pt' ? 'Evidência:' : 'Evidence:'}
                                    </p>
                                    <ul className="text-xs text-gray-600 list-disc list-inside ml-2">
                                      {req.evidence.map((ev, evIndex) => (
                                        <li key={evIndex}>{ev}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {article.recommendations && article.recommendations.length > 0 && (
                          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                            <h6 className="text-sm font-medium text-yellow-800 mb-2">
                              {language === 'pt' ? 'Recomendações:' : 'Recommendations:'}
                            </h6>
                            <ul className="text-sm text-yellow-700 list-disc list-inside">
                              {article.recommendations.map((rec, recIndex) => (
                                <li key={recIndex}>{rec}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Portuguese Cultural Compliance */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-primary-900 mb-4">
              {language === 'pt' ? 'Conformidade Cultural Portuguesa' : 'Portuguese Cultural Compliance'}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(complianceAudit.portugueseCommunityCompliance.culturalDataProtection).map(([key, value]: [string, any]) => (
                <div key={key} className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-4">
                  <h4 className="font-medium text-primary-900 mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary-900">{value.score}%</span>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      value.status === 'excellent' ? 'bg-green-100 text-green-800' :
                      value.status === 'good' ? 'bg-blue-100 text-blue-800' :
                      value.status === 'needs_improvement' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {value.status}
                    </div>
                  </div>
                  <p className="text-xs text-primary-600 mt-2">{value.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Systems Compliance */}
          <div>
            <h3 className="text-xl font-semibold text-primary-900 mb-4">
              {language === 'pt' ? 'Conformidade dos Sistemas de IA' : 'AI Systems Compliance'}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(complianceAudit.aiSystemsCompliance).map(([key, system]: [string, any]) => (
                <div key={key} className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-primary-900 mb-3">{system.systemName}</h4>
                  <div className="space-y-3">
                    {Object.entries({
                      gdprCompliance: language === 'pt' ? 'Conformidade RGPD' : 'GDPR Compliance',
                      dataMinimization: language === 'pt' ? 'Minimização de Dados' : 'Data Minimization',
                      transparency: language === 'pt' ? 'Transparência' : 'Transparency',
                      userControl: language === 'pt' ? 'Controlo do Utilizador' : 'User Control',
                      culturalSensitivity: language === 'pt' ? 'Sensibilidade Cultural' : 'Cultural Sensitivity'
                    }).map(([metric, label]) => (
                      <div key={metric} className="flex justify-between items-center">
                        <span className="text-sm text-primary-700">{label}:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{system[metric].score}%</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${system[metric].score}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {system.issues && system.issues.length > 0 && (
                    <div className="mt-4 p-3 bg-red-50 rounded-lg">
                      <h5 className="text-sm font-medium text-red-800 mb-1">
                        {language === 'pt' ? 'Questões:' : 'Issues:'}
                      </h5>
                      <ul className="text-sm text-red-700 list-disc list-inside">
                        {system.issues.map((issue: string, index: number) => (
                          <li key={index}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {system.recommendations && system.recommendations.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <h5 className="text-sm font-medium text-blue-800 mb-1">
                        {language === 'pt' ? 'Recomendações:' : 'Recommendations:'}
                      </h5>
                      <ul className="text-sm text-blue-700 list-disc list-inside">
                        {system.recommendations.map((rec: string, index: number) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// =============================================================================
// ENHANCED DATA MANAGEMENT TAB
// =============================================================================

function DataManagementTab({ 
  onDataExport, 
  onDataDeletion, 
  exportProgress, 
  deletionProgress 
}: {
  onDataExport: () => void
  onDataDeletion: () => void
  exportProgress: number
  deletionProgress: number
}) {
  const { language } = useLanguage()
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([])

  const dataTypes = [
    { 
      id: 'profile', 
      name: language === 'pt' ? 'Dados do Perfil' : 'Profile Data',
      description: language === 'pt' ? 'Nome, email, preferências básicas' : 'Name, email, basic preferences',
      size: '2.3 KB'
    },
    { 
      id: 'cultural', 
      name: language === 'pt' ? 'Dados Culturais' : 'Cultural Data',
      description: language === 'pt' ? 'Preferências culturais, património, tradições' : 'Cultural preferences, heritage, traditions',
      size: '15.7 KB'
    },
    { 
      id: 'ai_interactions', 
      name: language === 'pt' ? 'Interações de IA' : 'AI Interactions',
      description: language === 'pt' ? 'Conversas LusoBot, correspondências, notificações' : 'LusoBot conversations, matches, notifications',
      size: '45.2 KB'
    },
    { 
      id: 'usage_analytics', 
      name: language === 'pt' ? 'Análise de Utilização' : 'Usage Analytics',
      description: language === 'pt' ? 'Padrões de utilização, métricas de funcionalidades' : 'Usage patterns, feature metrics',
      size: '8.9 KB'
    }
  ]

  const toggleDataType = (dataTypeId: string) => {
    setSelectedDataTypes(prev => 
      prev.includes(dataTypeId) 
        ? prev.filter(id => id !== dataTypeId)
        : [...prev, dataTypeId]
    )
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-primary-900 mb-6">
        {language === 'pt' ? 'Gestão de Dados' : 'Data Management'}
      </h2>

      {/* Data Overview */}
      <div className="mb-8 grid md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            {language === 'pt' ? 'Total de Dados' : 'Total Data'}
          </h3>
          <p className="text-2xl font-bold text-blue-900">72.1 KB</p>
          <p className="text-sm text-blue-700 mt-1">
            {language === 'pt' ? 'Todos os seus dados pessoais' : 'All your personal data'}
          </p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 mb-2">
            {language === 'pt' ? 'Dados Culturais' : 'Cultural Data'}
          </h3>
          <p className="text-2xl font-bold text-green-900">15.7 KB</p>
          <p className="text-sm text-green-700 mt-1">
            {language === 'pt' ? 'Património e tradições' : 'Heritage and traditions'}
          </p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="font-semibold text-purple-900 mb-2">
            {language === 'pt' ? 'Dados de IA' : 'AI Data'}
          </h3>
          <p className="text-2xl font-bold text-purple-900">45.2 KB</p>
          <p className="text-sm text-purple-700 mt-1">
            {language === 'pt' ? 'Interações e personalizações' : 'Interactions and personalizations'}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Data Export */}
        <div className="border border-gray-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-primary-900 mb-4">
            {language === 'pt' ? 'Exportar Os Meus Dados' : 'Export My Data'}
          </h3>
          <p className="text-primary-700 mb-4">
            {language === 'pt' 
              ? 'Descarregue todos os seus dados pessoais num formato portável. Inclui dados culturais, preferências e interações de IA.'
              : 'Download all your personal data in a portable format. Includes cultural data, preferences, and AI interactions.'
            }
          </p>

          {/* Data Type Selection */}
          <div className="mb-6">
            <h4 className="font-medium text-primary-900 mb-3">
              {language === 'pt' ? 'Selecionar Tipos de Dados:' : 'Select Data Types:'}
            </h4>
            <div className="space-y-2">
              {dataTypes.map((dataType) => (
                <label key={dataType.id} className="flex items-start space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={selectedDataTypes.includes(dataType.id)}
                    onChange={() => toggleDataType(dataType.id)}
                    className="w-4 h-4 text-primary-500 mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-primary-900">{dataType.name}</p>
                        <p className="text-sm text-primary-600">{dataType.description}</p>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {dataType.size}
                      </span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {exportProgress > 0 && exportProgress < 100 && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>{language === 'pt' ? 'A exportar...' : 'Exporting...'}</span>
                <span>{exportProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${exportProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <button
              onClick={onDataExport}
              disabled={selectedDataTypes.length === 0 || exportProgress > 0}
              className="flex-1 bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium disabled:opacity-50"
            >
              {exportProgress === 100 ? 
                (language === 'pt' ? 'Exportado ✓' : 'Exported ✓') :
                (language === 'pt' ? 'Exportar Dados Selecionados' : 'Export Selected Data')
              }
            </button>
            <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <InformationCircleIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Data Deletion */}
        <div className="border border-red-200 rounded-xl p-6 bg-red-50">
          <h3 className="text-xl font-semibold text-red-900 mb-4">
            {language === 'pt' ? 'Eliminar Os Meus Dados' : 'Delete My Data'}
          </h3>
          <p className="text-red-700 mb-4">
            {language === 'pt' 
              ? 'Elimine permanentemente todos os seus dados pessoais. Esta ação não pode ser revertida e afetará todas as funcionalidades da plataforma.'
              : 'Permanently delete all your personal data. This action cannot be undone and will affect all platform functionality.'
            }
          </p>

          {/* Deletion Options */}
          <div className="mb-6 space-y-3">
            <div className="bg-white rounded-lg p-4 border border-red-200">
              <h4 className="font-medium text-red-900 mb-2">
                {language === 'pt' ? 'Opções de Eliminação:' : 'Deletion Options:'}
              </h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="deletion-type" value="immediate" className="text-red-500" defaultChecked />
                  <span className="text-sm text-red-800">
                    {language === 'pt' ? 'Eliminação imediata (recomendado)' : 'Immediate deletion (recommended)'}
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="deletion-type" value="delayed" className="text-red-500" />
                  <span className="text-sm text-red-800">
                    {language === 'pt' ? 'Eliminação em 30 dias (período de reflexão)' : 'Delete in 30 days (reflection period)'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Cultural Data Warning */}
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start">
              <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400 mt-0.5 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">
                  {language === 'pt' ? 'Aviso sobre Dados Culturais' : 'Cultural Data Warning'}
                </h4>
                <p className="text-sm text-yellow-700 mt-1">
                  {language === 'pt' 
                    ? 'A eliminação incluirá o seu património cultural, histórias familiares e preferências culturais partilhadas com a comunidade.'
                    : 'Deletion will include your cultural heritage, family stories, and cultural preferences shared with the community.'
                  }
                </p>
              </div>
            </div>
          </div>

          {deletionProgress > 0 && deletionProgress < 100 && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-red-800">{language === 'pt' ? 'A eliminar...' : 'Deleting...'}</span>
                <span className="text-red-800">{deletionProgress}%</span>
              </div>
              <div className="w-full bg-red-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${deletionProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <button
            onClick={onDataDeletion}
            disabled={deletionProgress > 0}
            className="w-full bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium disabled:opacity-50"
          >
            {deletionProgress === 100 ? 
              (language === 'pt' ? 'Dados Eliminados ✓' : 'Data Deleted ✓') :
              (language === 'pt' ? 'Confirmar Eliminação Permanente' : 'Confirm Permanent Deletion')
            }
          </button>
        </div>
      </div>

      {/* Data Processing Activity Log */}
      <div className="mt-8 border border-gray-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-primary-900 mb-4">
          {language === 'pt' ? 'Registo de Atividade de Processamento' : 'Data Processing Activity Log'}
        </h3>
        <p className="text-primary-700 mb-4">
          {language === 'pt' 
            ? 'Veja como os seus dados são processados, incluindo finalidades, bases legais e partilhas.'
            : 'See how your data is processed, including purposes, legal bases, and sharing.'
          }
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-primary-900">
                  {language === 'pt' ? 'Atividade' : 'Activity'}
                </th>
                <th className="text-left py-3 px-4 font-medium text-primary-900">
                  {language === 'pt' ? 'Finalidade' : 'Purpose'}
                </th>
                <th className="text-left py-3 px-4 font-medium text-primary-900">
                  {language === 'pt' ? 'Base Legal' : 'Legal Basis'}
                </th>
                <th className="text-left py-3 px-4 font-medium text-primary-900">
                  {language === 'pt' ? 'Retenção' : 'Retention'}
                </th>
                <th className="text-left py-3 px-4 font-medium text-primary-900">
                  {language === 'pt' ? 'Estado' : 'Status'}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-primary-800">
                  {language === 'pt' ? 'Gestão de Perfil' : 'Profile Management'}
                </td>
                <td className="py-3 px-4 text-primary-700">
                  {language === 'pt' ? 'Fornecimento de serviços' : 'Service delivery'}
                </td>
                <td className="py-3 px-4 text-primary-700">
                  {language === 'pt' ? 'Execução de contrato' : 'Contract performance'}
                </td>
                <td className="py-3 px-4 text-primary-700">7 {language === 'pt' ? 'anos' : 'years'}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    {language === 'pt' ? 'Ativo' : 'Active'}
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-primary-800">
                  {language === 'pt' ? 'Correspondência Cultural' : 'Cultural Matching'}
                </td>
                <td className="py-3 px-4 text-primary-700">
                  {language === 'pt' ? 'Conexões comunitárias' : 'Community connections'}
                </td>
                <td className="py-3 px-4 text-primary-700">
                  {language === 'pt' ? 'Consentimento explícito' : 'Explicit consent'}
                </td>
                <td className="py-3 px-4 text-primary-700">2 {language === 'pt' ? 'anos' : 'years'}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {language === 'pt' ? 'Consentido' : 'Consented'}
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-primary-800">
                  {language === 'pt' ? 'Conversas LusoBot' : 'LusoBot Conversations'}
                </td>
                <td className="py-3 px-4 text-primary-700">
                  {language === 'pt' ? 'Assistência de IA' : 'AI assistance'}
                </td>
                <td className="py-3 px-4 text-primary-700">
                  {language === 'pt' ? 'Consentimento explícito' : 'Explicit consent'}
                </td>
                <td className="py-3 px-4 text-primary-700">1 {language === 'pt' ? 'ano' : 'year'}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {language === 'pt' ? 'Consentido' : 'Consented'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// AUDIT TRAIL TAB
// =============================================================================

function AuditTrailTab() {
  const { language } = useLanguage()
  const [auditFilter, setAuditFilter] = useState('all')

  const auditEvents = [
    {
      id: 1,
      timestamp: '2024-01-15T10:30:00Z',
      event: language === 'pt' ? 'Consentimento para correspondência cultural concedido' : 'Consent granted for cultural matching',
      category: 'consent',
      details: language === 'pt' ? 'Utilizador ativou correspondência baseada em compatibilidade cultural' : 'User enabled cultural compatibility-based matching'
    },
    {
      id: 2,
      timestamp: '2024-01-14T15:45:00Z',
      event: language === 'pt' ? 'Dados de perfil atualizados' : 'Profile data updated',
      category: 'data_modification',
      details: language === 'pt' ? 'Preferências culturais regionais atualizadas para incluir Minho' : 'Regional cultural preferences updated to include Minho'
    },
    {
      id: 3,
      timestamp: '2024-01-13T09:15:00Z',
      event: language === 'pt' ? 'Acesso aos dados pessoais solicitado' : 'Personal data access requested',
      category: 'data_access',
      details: language === 'pt' ? 'Utilizador solicitou exportação completa de dados através do painel de privacidade' : 'User requested full data export via privacy dashboard'
    },
    {
      id: 4,
      timestamp: '2024-01-12T14:20:00Z',
      event: language === 'pt' ? 'LusoBot ativado' : 'LusoBot activated',
      category: 'ai_interaction',
      details: language === 'pt' ? 'Consentimento explícito concedido para assistente cultural de IA' : 'Explicit consent granted for AI cultural assistant'
    },
    {
      id: 5,
      timestamp: '2024-01-11T11:00:00Z',
      event: language === 'pt' ? 'Definições de privacidade alteradas' : 'Privacy settings changed',
      category: 'privacy_control',
      details: language === 'pt' ? 'Nível de sensibilidade cultural alterado para máximo' : 'Cultural sensitivity level changed to maximum'
    }
  ]

  const filteredEvents = auditFilter === 'all' 
    ? auditEvents 
    : auditEvents.filter(event => event.category === auditFilter)

  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold text-primary-900 mb-2">
            {language === 'pt' ? 'Registo de Auditoria' : 'Audit Trail'}
          </h2>
          <p className="text-primary-700">
            {language === 'pt' 
              ? 'Histórico completo de todas as atividades relacionadas com os seus dados pessoais'
              : 'Complete history of all activities related to your personal data'
            }
          </p>
        </div>
        
        {/* Filter Controls */}
        <div className="flex items-center space-x-3">
          <select
            value={auditFilter}
            onChange={(e) => setAuditFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">{language === 'pt' ? 'Todos os eventos' : 'All events'}</option>
            <option value="consent">{language === 'pt' ? 'Consentimentos' : 'Consents'}</option>
            <option value="data_modification">{language === 'pt' ? 'Modificações' : 'Modifications'}</option>
            <option value="data_access">{language === 'pt' ? 'Acesso a dados' : 'Data access'}</option>
            <option value="ai_interaction">{language === 'pt' ? 'Interações IA' : 'AI interactions'}</option>
            <option value="privacy_control">{language === 'pt' ? 'Controlo privacidade' : 'Privacy control'}</option>
          </select>
          
          <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200">
            {language === 'pt' ? 'Exportar' : 'Export'}
          </button>
        </div>
      </div>

      {/* Audit Statistics */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-1">
            {language === 'pt' ? 'Total de Eventos' : 'Total Events'}
          </h3>
          <p className="text-2xl font-bold text-blue-900">{auditEvents.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-green-900 mb-1">
            {language === 'pt' ? 'Consentimentos' : 'Consents'}
          </h3>
          <p className="text-2xl font-bold text-green-900">
            {auditEvents.filter(e => e.category === 'consent').length}
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-purple-900 mb-1">
            {language === 'pt' ? 'Interações IA' : 'AI Interactions'}
          </h3>
          <p className="text-2xl font-bold text-purple-900">
            {auditEvents.filter(e => e.category === 'ai_interaction').length}
          </p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-orange-900 mb-1">
            {language === 'pt' ? 'Modificações' : 'Modifications'}
          </h3>
          <p className="text-2xl font-bold text-orange-900">
            {auditEvents.filter(e => e.category === 'data_modification').length}
          </p>
        </div>
      </div>

      {/* Audit Events Timeline */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-primary-900">
            {language === 'pt' ? 'Cronologia de Eventos' : 'Event Timeline'}
          </h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {filteredEvents.map((event) => (
            <div key={event.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-start space-x-4">
                <div className={`w-3 h-3 rounded-full mt-2 ${
                  event.category === 'consent' ? 'bg-green-500' :
                  event.category === 'data_modification' ? 'bg-blue-500' :
                  event.category === 'data_access' ? 'bg-purple-500' :
                  event.category === 'ai_interaction' ? 'bg-indigo-500' :
                  event.category === 'privacy_control' ? 'bg-orange-500' :
                  'bg-gray-500'
                }`}></div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-primary-900">{event.event}</h4>
                    <time className="text-xs text-gray-500">
                      {new Date(event.timestamp).toLocaleString(language === 'pt' ? 'pt-PT' : 'en-GB')}
                    </time>
                  </div>
                  <p className="text-sm text-primary-600">{event.details}</p>
                  <div className="mt-2">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      event.category === 'consent' ? 'bg-green-100 text-green-800' :
                      event.category === 'data_modification' ? 'bg-blue-100 text-blue-800' :
                      event.category === 'data_access' ? 'bg-purple-100 text-purple-800' :
                      event.category === 'ai_interaction' ? 'bg-indigo-100 text-indigo-800' :
                      event.category === 'privacy_control' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {event.category.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredEvents.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500">
              {language === 'pt' ? 'Nenhum evento encontrado para o filtro selecionado' : 'No events found for the selected filter'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// =============================================================================
// ENHANCED PERMISSIONS TAB (placeholder)
// =============================================================================

function PermissionsTab() {
  return <div className="p-8">Enhanced permissions management with Portuguese cultural controls will be implemented here</div>
}

function CulturalPreferencesTab() {
  return <div className="p-8">Cultural preferences with heritage protection controls will be implemented here</div>
}

function PrivacyRightsTab() {
  return <div className="p-8">GDPR rights management with Portuguese context will be implemented here</div>
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