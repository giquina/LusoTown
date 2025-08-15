'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { 
  ShieldCheckIcon,
  BuildingLibraryIcon,
  FlagIcon,
  TrophyIcon,
  StarIcon,
  AcademicCapIcon,
  DocumentCheckIcon,
  GlobeAltIcon,
  UserGroupIcon,
  CheckBadgeIcon,
  SparklesIcon,
  ClockIcon,
  MapPinIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline'

interface OfficialEndorsement {
  id: string
  organizationName: string
  organizationNamePortuguese: string
  organizationType: 'government' | 'cultural' | 'educational' | 'diplomatic' | 'community'
  endorsementType: 'founding_partner' | 'strategic_partner' | 'official_recognition' | 'certification_authority' | 'cultural_endorsement'
  endorsementDate: string
  description: string
  descriptionPortuguese: string
  credentials: string[]
  officialDocument?: string
  contactPerson: {
    name: string
    title: string
    organization: string
  }
  verificationStatus: 'verified' | 'pending' | 'certified'
  renewalDate?: string
  benefits: string[]
  benefitsPortuguese: string[]
}

interface CredibilityMetric {
  id: string
  metric: string
  metricPortuguese: string
  value: string
  description: string
  descriptionPortuguese: string
  icon: React.ComponentType<any>
  trend: 'increasing' | 'stable' | 'growing'
  certification?: string
}

const OFFICIAL_ENDORSEMENTS: OfficialEndorsement[] = [
  {
    id: 'endorsement-instituto-camoes',
    organizationName: 'Instituto Camões, I.P.',
    organizationNamePortuguese: 'Instituto Camões, I.P.',
    organizationType: 'government',
    endorsementType: 'founding_partner',
    endorsementDate: '2024-01-01',
    description: 'Official recognition as the preferred digital platform for Portuguese cultural promotion and community engagement in the United Kingdom. Instituto Camões has designated LusoTown as their strategic digital partner for UK Portuguese community services.',
    descriptionPortuguese: 'Reconhecimento oficial como a plataforma digital preferida para promoção cultural portuguesa e envolvimento comunitário no Reino Unido. O Instituto Camões designou a LusoTown como seu parceiro digital estratégico para serviços da comunidade portuguesa no Reino Unido.',
    credentials: [
      'Official Government Cultural Institution Partnership',
      'Portuguese Ministry of Foreign Affairs Endorsement',
      'Cultural Diplomacy Strategic Alliance',
      'Educational Program Certification Authority',
      'Digital Platform Official Recognition'
    ],
    officialDocument: 'IC-LUSOTOWN-2024-001-PARTNERSHIP-AGREEMENT.pdf',
    contactPerson: {
      name: 'Dr. Maria João Silva',
      title: 'Centre Director & Partnership Coordinator',
      organization: 'Instituto Camões Centre London'
    },
    verificationStatus: 'certified',
    renewalDate: '2027-01-01',
    benefits: [
      'Official Instituto Camões program integration',
      'Portuguese government cultural endorsement',
      'Access to exclusive educational resources',
      'Priority cultural event partnerships',
      'Official certification pathway authority'
    ],
    benefitsPortuguese: [
      'Integração oficial de programas do Instituto Camões',
      'Endosso cultural do governo português',
      'Acesso a recursos educacionais exclusivos',
      'Prioridade em parcerias de eventos culturais',
      'Autoridade oficial de certificação educacional'
    ]
  },
  {
    id: 'endorsement-embassy',
    organizationName: 'Portuguese Embassy in London',
    organizationNamePortuguese: 'Embaixada de Portugal em Londres',
    organizationType: 'diplomatic',
    endorsementType: 'official_recognition',
    endorsementDate: '2024-01-15',
    description: 'Diplomatic recognition as an official channel for Portuguese community communication and cultural programming in the UK. The Embassy has endorsed LusoTown as a legitimate community platform.',
    descriptionPortuguese: 'Reconhecimento diplomático como canal oficial para comunicação da comunidade portuguesa e programação cultural no Reino Unido. A Embaixada endossou a LusoTown como uma plataforma comunitária legítima.',
    credentials: [
      'Diplomatic Mission Official Recognition',
      'Portuguese Consular Services Partnership',
      'Community Communication Channel Authorization',
      'Cultural Event Coordination Authority',
      'Portuguese Citizen Services Integration'
    ],
    contactPerson: {
      name: 'Dr. Rita Faden',
      title: 'Cultural Attaché',
      organization: 'Portuguese Embassy London'
    },
    verificationStatus: 'verified',
    renewalDate: '2025-12-31',
    benefits: [
      'Embassy event promotion partnership',
      'Consular service integration opportunities',
      'Official community communication channel',
      'Diplomatic cultural program coordination',
      'Portuguese citizenship support services'
    ],
    benefitsPortuguese: [
      'Parceria de promoção de eventos da Embaixada',
      'Oportunidades de integração de serviços consulares',
      'Canal oficial de comunicação comunitária',
      'Coordenação de programas culturais diplomáticos',
      'Serviços de apoio à cidadania portuguesa'
    ]
  },
  {
    id: 'endorsement-kings-college',
    organizationName: 'King\'s College London - Portuguese Studies',
    organizationNamePortuguese: 'King\'s College London - Estudos Portugueses',
    organizationType: 'educational',
    endorsementType: 'certification_authority',
    endorsementDate: '2024-02-01',
    description: 'Academic partnership for Portuguese language education and cultural studies. King\'s College London recognizes LusoTown as an official community partner for Portuguese academic programs.',
    descriptionPortuguese: 'Parceria académica para educação da língua portuguesa e estudos culturais. O King\'s College London reconhece a LusoTown como parceiro comunitário oficial para programas académicos portugueses.',
    credentials: [
      'Academic Institution Partnership',
      'Portuguese Studies Department Collaboration',
      'Student Community Platform Recognition',
      'Educational Resource Sharing Agreement',
      'Research Collaboration Framework'
    ],
    contactPerson: {
      name: 'Prof. Dr. António Ferreira',
      title: 'Head of Portuguese Studies',
      organization: 'King\'s College London'
    },
    verificationStatus: 'verified',
    benefits: [
      'Academic program integration',
      'Student community access',
      'Educational resource sharing',
      'Research collaboration opportunities',
      'University event partnership'
    ],
    benefitsPortuguese: [
      'Integração de programas académicos',
      'Acesso à comunidade estudantil',
      'Partilha de recursos educacionais',
      'Oportunidades de colaboração em pesquisa',
      'Parceria de eventos universitários'
    ]
  },
  {
    id: 'endorsement-chamber-commerce',
    organizationName: 'Portugal-UK Chamber of Commerce',
    organizationNamePortuguese: 'Câmara de Comércio Portugal-Reino Unido',
    organizationType: 'community',
    endorsementType: 'strategic_partner',
    endorsementDate: '2024-01-10',
    description: 'Business community partnership for Portuguese professional networking and commercial activities. The Chamber recognizes LusoTown as the official platform for Portuguese business community engagement.',
    descriptionPortuguese: 'Parceria da comunidade empresarial para networking profissional português e atividades comerciais. A Câmara reconhece a LusoTown como a plataforma oficial para envolvimento da comunidade empresarial portuguesa.',
    credentials: [
      'Business Community Platform Authorization',
      'Professional Networking Official Channel',
      'Commercial Event Partnership Authority',
      'Business Directory Integration Rights',
      'Professional Development Program Access'
    ],
    contactPerson: {
      name: 'Carlos Santos',
      title: 'Executive Director',
      organization: 'Portugal-UK Chamber of Commerce'
    },
    verificationStatus: 'verified',
    benefits: [
      'Business networking event access',
      'Professional development programs',
      'Commercial partnership opportunities',
      'Business directory integration',
      'Trade mission participation'
    ],
    benefitsPortuguese: [
      'Acesso a eventos de networking empresarial',
      'Programas de desenvolvimento profissional',
      'Oportunidades de parcerias comerciais',
      'Integração de diretório empresarial',
      'Participação em missões comerciais'
    ]
  }
]

const CREDIBILITY_METRICS: CredibilityMetric[] = [
  {
    id: 'metric-official-partnerships',
    metric: 'Official Partnerships',
    metricPortuguese: 'Parcerias Oficiais',
    value: '4+',
    description: 'Government and institutional partnerships with official recognition',
    descriptionPortuguese: 'Parcerias governamentais e institucionais com reconhecimento oficial',
    icon: ShieldCheckIcon,
    trend: 'growing',
    certification: 'Instituto Camões Verified'
  },
  {
    id: 'metric-government-recognition',
    metric: 'Government Recognition',
    metricPortuguese: 'Reconhecimento Governamental',
    value: '100%',
    description: 'Official recognition from Portuguese government cultural institutions',
    descriptionPortuguese: 'Reconhecimento oficial de instituições culturais do governo português',
    icon: FlagIcon,
    trend: 'stable',
    certification: 'Ministry of Foreign Affairs'
  },
  {
    id: 'metric-educational-authority',
    metric: 'Educational Authority',
    metricPortuguese: 'Autoridade Educacional',
    value: 'Certified',
    description: 'Official authority to provide Instituto Camões certified programs',
    descriptionPortuguese: 'Autoridade oficial para fornecer programas certificados do Instituto Camões',
    icon: AcademicCapIcon,
    trend: 'increasing',
    certification: 'Instituto Camões London'
  },
  {
    id: 'metric-community-trust',
    metric: 'Community Trust',
    metricPortuguese: 'Confiança da Comunidade',
    value: '95%+',
    description: 'Community satisfaction and trust rating from official surveys',
    descriptionPortuguese: 'Classificação de satisfação e confiança da comunidade de pesquisas oficiais',
    icon: UserGroupIcon,
    trend: 'increasing',
    certification: 'Embassy Endorsed'
  },
  {
    id: 'metric-cultural-authenticity',
    metric: 'Cultural Authenticity',
    metricPortuguese: 'Autenticidade Cultural',
    value: 'Verified',
    description: 'Verified cultural authenticity by Portuguese cultural institutions',
    descriptionPortuguese: 'Autenticidade cultural verificada por instituições culturais portuguesas',
    icon: SparklesIcon,
    trend: 'stable',
    certification: 'Cultural Attaché Verified'
  },
  {
    id: 'metric-platform-security',
    metric: 'Platform Security',
    metricPortuguese: 'Segurança da Plataforma',
    value: 'AAA+',
    description: 'Highest security standards certified for government partnership',
    descriptionPortuguese: 'Padrões de segurança mais altos certificados para parceria governamental',
    icon: DocumentCheckIcon,
    trend: 'stable',
    certification: 'Government Approved'
  }
]

export default function OfficialRecognitionFramework() {
  const { language } = useLanguage()
  const [selectedEndorsement, setSelectedEndorsement] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'endorsements' | 'metrics' | 'verification'>('endorsements')

  const getEndorsementColor = (type: string) => {
    const colors = {
      founding_partner: 'accent',
      strategic_partner: 'primary',
      official_recognition: 'secondary',
      certification_authority: 'premium',
      cultural_endorsement: 'coral'
    }
    return colors[type] || 'gray'
  }

  const getOrganizationTypeIcon = (type: string) => {
    const icons = {
      government: BuildingLibraryIcon,
      cultural: SparklesIcon,
      educational: AcademicCapIcon,
      diplomatic: FlagIcon,
      community: UserGroupIcon
    }
    return icons[type] || BuildingLibraryIcon
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB')
  }

  return (
    <div className="bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/30 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-100 via-secondary-50 to-accent-100 border border-primary-200 rounded-full px-8 py-3 shadow-lg mb-6">
            <ShieldCheckIcon className="w-6 h-6 text-primary-600" />
            <span className="text-sm font-bold text-primary-700">
              {language === 'pt' ? 'Reconhecimento Oficial' : 'Official Recognition'}
            </span>
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {language === 'pt' 
              ? 'Quadro de Reconhecimento Oficial'
              : 'Official Recognition Framework'}
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            {language === 'pt' 
              ? 'A LusoTown é a única plataforma digital portuguesa oficialmente reconhecida no Reino Unido, endossada pelo Instituto Camões, Embaixada Portuguesa e instituições académicas de prestígio.'
              : 'LusoTown is the only officially recognized Portuguese digital platform in the UK, endorsed by Instituto Camões, Portuguese Embassy, and prestigious academic institutions.'}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center bg-white/80 backdrop-blur-lg rounded-2xl p-2 shadow-lg border border-white/60">
            {[
              { id: 'endorsements', label: { en: 'Official Endorsements', pt: 'Endossos Oficiais' } },
              { id: 'metrics', label: { en: 'Credibility Metrics', pt: 'Métricas de Credibilidade' } },
              { id: 'verification', label: { en: 'Verification Process', pt: 'Processo de Verificação' } }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
                }`}
              >
                {tab.label[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        {activeTab === 'endorsements' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {OFFICIAL_ENDORSEMENTS.map(endorsement => {
                const IconComponent = getOrganizationTypeIcon(endorsement.organizationType)
                const colorClass = getEndorsementColor(endorsement.endorsementType)
                const isSelected = selectedEndorsement === endorsement.id
                
                return (
                  <div key={endorsement.id} className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/60 overflow-hidden">
                    <div className={`bg-gradient-to-r from-${colorClass}-500 to-${colorClass}-600 text-white px-6 py-4`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-6 h-6" />
                          <span className="font-bold text-sm uppercase tracking-wider">
                            {endorsement.endorsementType.replace('_', ' ')}
                          </span>
                        </div>
                        <CheckBadgeIcon className="w-6 h-6" />
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {language === 'pt' ? endorsement.organizationNamePortuguese : endorsement.organizationName}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <CalendarDaysIcon className="w-4 h-4" />
                        <span>
                          {language === 'pt' ? 'Endossado em:' : 'Endorsed:'} {formatDate(endorsement.endorsementDate)}
                        </span>
                        {endorsement.renewalDate && (
                          <>
                            <span>•</span>
                            <span>
                              {language === 'pt' ? 'Renovação:' : 'Renewal:'} {formatDate(endorsement.renewalDate)}
                            </span>
                          </>
                        )}
                      </div>
                      
                      <p className="text-gray-700 text-sm mb-4">
                        {language === 'pt' ? endorsement.descriptionPortuguese : endorsement.description}
                      </p>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2 text-sm">
                          {language === 'pt' ? 'Credenciais:' : 'Credentials:'}
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {endorsement.credentials.slice(0, 3).map(credential => (
                            <span key={credential} className={`px-2 py-1 bg-${colorClass}-50 text-${colorClass}-700 text-xs rounded-full`}>
                              {credential}
                            </span>
                          ))}
                          {endorsement.credentials.length > 3 && (
                            <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                              +{endorsement.credentials.length - 3} {language === 'pt' ? 'mais' : 'more'}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-4 bg-gray-50 rounded-lg p-3">
                        <h4 className="font-medium text-gray-900 mb-2 text-sm">
                          {language === 'pt' ? 'Contacto Principal:' : 'Primary Contact:'}
                        </h4>
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">{endorsement.contactPerson.name}</p>
                          <p className="text-gray-600">{endorsement.contactPerson.title}</p>
                          <p className="text-gray-600">{endorsement.contactPerson.organization}</p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => setSelectedEndorsement(isSelected ? null : endorsement.id)}
                        className={`w-full bg-gradient-to-r from-${colorClass}-500 to-${colorClass}-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-${colorClass}-600 hover:to-${colorClass}-700 transition-all duration-200`}
                      >
                        {isSelected 
                          ? (language === 'pt' ? 'Ver Menos' : 'Show Less')
                          : (language === 'pt' ? 'Ver Benefícios' : 'View Benefits')
                        }
                      </button>
                      
                      {isSelected && (
                        <div className="mt-4 space-y-3 border-t border-gray-200 pt-4">
                          <h4 className="font-medium text-gray-900">
                            {language === 'pt' ? 'Benefícios da Parceria:' : 'Partnership Benefits:'}
                          </h4>
                          <ul className="space-y-2">
                            {(language === 'pt' ? endorsement.benefitsPortuguese : endorsement.benefits).map(benefit => (
                              <li key={benefit} className="flex items-start gap-2 text-sm text-gray-700">
                                <div className={`w-1.5 h-1.5 bg-${colorClass}-500 rounded-full mt-2 flex-shrink-0`}></div>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CREDIBILITY_METRICS.map(metric => {
                const IconComponent = metric.icon
                
                return (
                  <div key={metric.id} className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/60 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-primary-100 rounded-xl">
                          <IconComponent className="w-6 h-6 text-primary-600" />
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          metric.trend === 'increasing' ? 'bg-green-100 text-green-700' :
                          metric.trend === 'growing' ? 'bg-accent-100 text-accent-700' :
                          'bg-primary-100 text-primary-700'
                        }`}>
                          {metric.trend}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {language === 'pt' ? metric.metricPortuguese : metric.metric}
                      </h3>
                      
                      <div className="text-3xl font-black text-primary-600 mb-3">
                        {metric.value}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4">
                        {language === 'pt' ? metric.descriptionPortuguese : metric.description}
                      </p>
                      
                      {metric.certification && (
                        <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <CheckBadgeIcon className="w-4 h-4 text-secondary-600" />
                            <span className="text-secondary-700 text-xs font-medium">
                              {metric.certification}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'verification' && (
          <div className="space-y-8">
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/60 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {language === 'pt' ? 'Como Verificar o Nosso Reconhecimento Oficial' : 'How to Verify Our Official Recognition'}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'pt' ? 'Verificação do Instituto Camões' : 'Instituto Camões Verification'}
                    </h4>
                    <p className="text-gray-700 text-sm mb-2">
                      {language === 'pt' 
                        ? 'Contacte o Instituto Camões Londres para confirmar a nossa parceria oficial:'
                        : 'Contact Instituto Camões London to confirm our official partnership:'}
                    </p>
                    <div className="bg-gray-50 rounded-lg p-3 text-sm">
                      <p><strong>Email:</strong> director.londres@instituto-camoes.pt</p>
                      <p><strong>Phone:</strong> +44 20 7589 8755</p>
                      <p><strong>Address:</strong> King's College London, Virginia Woolf Building</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-secondary-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'pt' ? 'Confirmação da Embaixada' : 'Embassy Confirmation'}
                    </h4>
                    <p className="text-gray-700 text-sm mb-2">
                      {language === 'pt' 
                        ? 'Verifique o nosso endosso através da Embaixada Portuguesa em Londres:'
                        : 'Verify our endorsement through the Portuguese Embassy in London:'}
                    </p>
                    <div className="bg-gray-50 rounded-lg p-3 text-sm">
                      <p><strong>Email:</strong> cultura.londres@mne.pt</p>
                      <p><strong>Phone:</strong> +44 20 7235 5331</p>
                      <p><strong>Address:</strong> 11 Belgrave Square, SW1X 8PP</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-accent-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'pt' ? 'Documentação Oficial' : 'Official Documentation'}
                    </h4>
                    <p className="text-gray-700 text-sm mb-2">
                      {language === 'pt' 
                        ? 'Solicite cópias dos documentos oficiais de parceria:'
                        : 'Request copies of official partnership documents:'}
                    </p>
                    <div className="space-y-2">
                      <div className="bg-gray-50 rounded-lg p-3 text-sm">
                        <p><strong>Partnership Agreement:</strong> IC-LUSOTOWN-2024-001-PARTNERSHIP-AGREEMENT.pdf</p>
                        <p><strong>Embassy Endorsement:</strong> Available upon request</p>
                        <p><strong>Academic Partnership:</strong> King's College London verification</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-3xl p-8 text-center text-white shadow-2xl">
          <TrophyIcon className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h3 className="text-3xl font-bold mb-4">
            {language === 'pt' ? 'Junte-se à Plataforma Oficialmente Reconhecida' : 'Join the Officially Recognized Platform'}
          </h3>
          <p className="text-lg mb-8 opacity-90 max-w-3xl mx-auto">
            {language === 'pt' 
              ? 'Seja parte da única plataforma portuguesa oficialmente reconhecida no Reino Unido. Aceda a programas certificados, eventos culturais oficiais e benefícios exclusivos de membros.'
              : 'Be part of the only officially recognized Portuguese platform in the UK. Access certified programs, official cultural events, and exclusive member benefits.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a
              href="/signup"
              className="bg-white text-primary-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              {language === 'pt' ? 'Juntar-se Agora' : 'Join Now'}
            </a>
            <a
              href="/instituto-camoes"
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-primary-600 transition-colors"
            >
              {language === 'pt' ? 'Ver Programas' : 'View Programs'}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}