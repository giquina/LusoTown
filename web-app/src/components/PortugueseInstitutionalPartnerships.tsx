'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { partnershipsService, PartnershipOrganization } from '@/lib/partnerships'
import { universityPartnershipsService, University } from '@/lib/universityPartnerships'
import {
  BuildingOffice2Icon,
  AcademicCapIcon,
  GlobeAltIcon,
  HandRaisedIcon,
  ChartBarIcon,
  UserGroupIcon,
  StarIcon,
  ArrowRightIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  LinkIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  TrophyIcon,
  CheckBadgeIcon,
  SparklesIcon,
  BuildingLibraryIcon,
  HomeIcon,
  BriefcaseIcon,
  HeartIcon,
  DocumentTextIcon,
  PresentationChartLineIcon,
  CurrencyPoundIcon,
  LanguageIcon,
  GiftIcon
} from '@heroicons/react/24/outline'

interface InstitutionalPartnershipCategory {
  id: string
  name: string
  namePortuguese: string
  description: string
  descriptionPortuguese: string
  icon: React.ReactNode
  color: string
  partnerCount: number
  memberBenefits: string[]
  totalCommunityReach: number
  establishedPartnerships: PartnershipOrganization[]
  upcomingPartnerships: string[]
}

interface PartnershipDevelopmentPipeline {
  id: string
  institutionName: string
  institutionType: string
  stage: 'initial_contact' | 'proposal_sent' | 'negotiations' | 'agreement_draft' | 'final_approval'
  stagePortuguese: string
  priority: 'high' | 'medium' | 'low'
  expectedValue: number
  timelineWeeks: number
  keyContact: {
    name: string
    title: string
    email: string
  }
  nextSteps: string[]
  strategicImportance: string
}

interface CommunityImpactMetrics {
  totalPartnerInstitutions: number
  totalCommunityMembers: number
  monthlyEngagement: number
  cumulativeSavings: number
  eventsHosted: number
  programsOffered: number
  satisfaction: number
  retention: number
}

const PortugueseInstitutionalPartnerships: React.FC = () => {
  const { language } = useLanguage()
  const [partnerships, setPartnerships] = useState<PartnershipOrganization[]>([])
  const [universities, setUniversities] = useState<University[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [impactMetrics, setImpactMetrics] = useState<CommunityImpactMetrics | null>(null)
  const [developmentPipeline, setDevelopmentPipeline] = useState<PartnershipDevelopmentPipeline[]>([])

  useEffect(() => {
    loadPartnershipData()
  }, [])

  const loadPartnershipData = async () => {
    try {
      setLoading(true)
      
      const [allPartnerships, allUniversities] = await Promise.all([
        partnershipsService.getAllPartnerships(),
        universityPartnershipsService.getAllUniversities()
      ])
      
      setPartnerships(allPartnerships)
      setUniversities(allUniversities)
      
      // Calculate impact metrics
      const totalCommunityReach = allPartnerships.reduce((sum, p) => sum + p.communitySize, 0)
      const metrics: CommunityImpactMetrics = {
        totalPartnerInstitutions: allPartnerships.length + allUniversities.length,
        totalCommunityMembers: totalCommunityReach + 15000, // Including university students
        monthlyEngagement: 2850,
        cumulativeSavings: 485000,
        eventsHosted: 156,
        programsOffered: 89,
        satisfaction: 4.7,
        retention: 92
      }
      setImpactMetrics(metrics)
      
      // Mock development pipeline
      const pipeline: PartnershipDevelopmentPipeline[] = [
        {
          id: 'pipeline-1',
          institutionName: 'Lusophone Medical Association United Kingdom',
          institutionType: 'Professional Association',
          stage: 'negotiations',
          stagePortuguese: 'Negociações',
          priority: 'high',
          expectedValue: 25000,
          timelineWeeks: 8,
          keyContact: {
            name: 'Dr. Sofia Correia',
            title: 'Director of International Relations',
            email: 'sofia.correia@pmauk.org'
          },
          nextSteps: ['Review partnership agreement draft', 'Propose member benefits package', 'Schedule final presentation'],
          strategicImportance: 'Critical for healthcare professional community expansion'
        },
        {
          id: 'pipeline-2',
          institutionName: 'Lusophone Lawyers Association London',
          institutionType: 'Legal Professional Body',
          stage: 'proposal_sent',
          stagePortuguese: 'Proposta Enviada',
          priority: 'high',
          expectedValue: 18000,
          timelineWeeks: 12,
          keyContact: {
            name: 'Dr. Miguel Santos',
            title: 'President',
            email: 'president@plal.org.uk'
          },
          nextSteps: ['Follow up on proposal', 'Arrange partnership presentation', 'Draft service agreements'],
          strategicImportance: 'Essential for legal services and immigration support'
        },
        {
          id: 'pipeline-3',
          institutionName: 'Lusophone Tech Professionals Network United Kingdom',
          institutionType: 'Technology Professional Network',
          stage: 'initial_contact',
          stagePortuguese: 'Contacto Inicial',
          priority: 'medium',
          expectedValue: 15000,
          timelineWeeks: 16,
          keyContact: {
            name: 'Ana Torres',
            title: 'Community Manager',
            email: 'ana@ptpnuk.com'
          },
          nextSteps: ['Schedule introductory meeting', 'Prepare partnership proposal', 'Identify collaboration opportunities'],
          strategicImportance: 'Important for tech sector professional development'
        },
        {
          id: 'pipeline-4',
          institutionName: 'Lusophone Cultural Heritage Trust',
          institutionType: 'Cultural Heritage Organization',
          stage: 'agreement_draft',
          stagePortuguese: 'Rascunho do Acordo',
          priority: 'medium',
          expectedValue: 12000,
          timelineWeeks: 6,
          keyContact: {
            name: 'Professor João Oliveira',
            title: 'Heritage Director',
            email: 'joao.oliveira@pcht.org.uk'
          },
          nextSteps: ['Review legal terms', 'Finalize funding arrangements', 'Plan heritage preservation projects'],
          strategicImportance: 'Vital for cultural preservation and community identity'
        },
        {
          id: 'pipeline-5',
          institutionName: 'Lusophone Business Women Network',
          institutionType: 'Business Professional Network',
          stage: 'final_approval',
          stagePortuguese: 'Aprovação Final',
          priority: 'high',
          expectedValue: 22000,
          timelineWeeks: 3,
          keyContact: {
            name: 'Carla Mendes',
            title: 'Executive Director',
            email: 'carla@pbwn.co.uk'
          },
          nextSteps: ['Board approval confirmation', 'Sign partnership agreement', 'Launch announcement planning'],
          strategicImportance: 'Key for women\'s professional empowerment and business development'
        }
      ]
      setDevelopmentPipeline(pipeline)
      
    } catch (error) {
      console.error('Error loading partnership data:', error)
    } finally {
      setLoading(false)
    }
  }

  const institutionalCategories: InstitutionalPartnershipCategory[] = [
    {
      id: 'government_diplomatic',
      name: 'Government & Diplomatic',
      namePortuguese: 'Governo e Diplomático',
      description: 'Official Lusophone government institutions and diplomatic missions',
      descriptionPortuguese: 'Instituições oficiais do governo português e missões diplomáticas',
      icon: <BuildingLibraryIcon className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-700',
      partnerCount: partnerships.filter(p => p.type === 'embassy' || p.type === 'consulate').length,
      memberBenefits: ['Consular service discounts', 'Cultural event access', 'Document assistance'],
      totalCommunityReach: partnerships.filter(p => p.type === 'embassy' || p.type === 'consulate').reduce((sum, p) => sum + p.communitySize, 0),
      establishedPartnerships: partnerships.filter(p => p.type === 'embassy' || p.type === 'consulate'),
      upcomingPartnerships: ['Lusophone Consulate Manchester', 'Lusophone Trade Office', 'AICEP Portugal Global']
    },
    {
      id: 'cultural_educational',
      name: 'Cultural & Educational',
      namePortuguese: 'Cultural e Educacional',
      description: 'Cultural centers, educational institutions, and heritage organizations',
      descriptionPortuguese: 'Centros culturais, instituições educacionais e organizações de património',
      icon: <AcademicCapIcon className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-700',
      partnerCount: partnerships.filter(p => p.type === 'cultural_center' || p.type === 'educational_institution').length,
      memberBenefits: ['Course discounts', 'Cultural programming', 'Heritage workshops'],
      totalCommunityReach: partnerships.filter(p => p.type === 'cultural_center' || p.type === 'educational_institution').reduce((sum, p) => sum + p.communitySize, 0),
      establishedPartnerships: partnerships.filter(p => p.type === 'cultural_center' || p.type === 'educational_institution'),
      upcomingPartnerships: ['Lusophone Heritage Trust', 'Lisbon Culture Institute', 'Lusophone Film Institute']
    },
    {
      id: 'business_professional',
      name: 'Business & Professional',
      namePortuguese: 'Empresarial e Profissional',
      description: 'Chambers of commerce, professional associations, and business networks',
      descriptionPortuguese: 'Câmaras de comércio, associações profissionais e redes empresariais',
      icon: <BriefcaseIcon className="w-6 h-6" />,
      color: 'bg-green-100 text-green-700',
      partnerCount: partnerships.filter(p => p.type === 'chamber_commerce' || p.type === 'business_association').length,
      memberBenefits: ['Networking events', 'Business support', 'Investment guidance'],
      totalCommunityReach: partnerships.filter(p => p.type === 'chamber_commerce' || p.type === 'business_association').reduce((sum, p) => sum + p.communitySize, 0),
      establishedPartnerships: partnerships.filter(p => p.type === 'chamber_commerce' || p.type === 'business_association'),
      upcomingPartnerships: ['Lusophone Medical Association', 'Lusophone Lawyers Network', 'Lusophone Tech Professionals']
    },
    {
      id: 'community_religious',
      name: 'Community & Religious',
      namePortuguese: 'Comunitário e Religioso',
      description: 'Community organizations, religious institutions, and social groups',
      descriptionPortuguese: 'Organizações comunitárias, instituições religiosas e grupos sociais',
      icon: <HeartIcon className="w-6 h-6" />,
      color: 'bg-red-100 text-red-700',
      partnerCount: partnerships.filter(p => p.type === 'community_association' || p.type === 'religious_organization').length,
      memberBenefits: ['Community support', 'Religious services', 'Social activities'],
      totalCommunityReach: partnerships.filter(p => p.type === 'community_association' || p.type === 'religious_organization').reduce((sum, p) => sum + p.communitySize, 0),
      establishedPartnerships: partnerships.filter(p => p.type === 'community_association' || p.type === 'religious_organization'),
      upcomingPartnerships: ['Lusophone Social Club Birmingham', 'Lusophone Methodist Church', 'Lusophone Senior Citizens Association']
    },
    {
      id: 'media_sports',
      name: 'Media & Sports',
      namePortuguese: 'Media e Desporto',
      description: 'Lusophone media outlets, sports clubs, and entertainment organizations',
      descriptionPortuguese: 'Meios de comunicação portugueses, clubes desportivos e organizações de entretenimento',
      icon: <TrophyIcon className="w-6 h-6" />,
      color: 'bg-yellow-100 text-yellow-700',
      partnerCount: partnerships.filter(p => p.type === 'media_organization' || p.type === 'sports_club').length,
      memberBenefits: ['Event coverage', 'Sports activities', 'Entertainment discounts'],
      totalCommunityReach: partnerships.filter(p => p.type === 'media_organization' || p.type === 'sports_club').reduce((sum, p) => sum + p.communitySize, 0),
      establishedPartnerships: partnerships.filter(p => p.type === 'media_organization' || p.type === 'sports_club'),
      upcomingPartnerships: ['Lusophone Radio London', 'Benfica Supporters Club', 'Lusophone Football Federation United Kingdom']
    }
  ]

  const getStageColor = (stage: PartnershipDevelopmentPipeline['stage']) => {
    const colors = {
      initial_contact: 'bg-gray-100 text-gray-700',
      proposal_sent: 'bg-blue-100 text-blue-700',
      negotiations: 'bg-yellow-100 text-yellow-700',
      agreement_draft: 'bg-purple-100 text-purple-700',
      final_approval: 'bg-green-100 text-green-700'
    }
    return colors[stage]
  }

  const getPriorityColor = (priority: PartnershipDevelopmentPipeline['priority']) => {
    const colors = {
      high: 'text-red-600',
      medium: 'text-yellow-600',
      low: 'text-green-600'
    }
    return colors[priority]
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {language === 'pt' 
            ? 'Parcerias Institucionais Portuguesas'
            : 'Lusophone Institutional Partnerships'
          }
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {language === 'pt'
            ? 'Construindo pontes estratégicas entre a comunidade de falantes de português e instituições de prestígio no Reino Unido para fortalecer conexões culturais, empresariais e educacionais.'
            : 'Building strategic bridges between the Portuguese-speaking community and prestigious institutions in the United Kingdom to strengthen cultural, business, and educational connections.'
          }
        </p>
      </div>

      {/* Impact Metrics */}
      {impactMetrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
            <BuildingOffice2Icon className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-2xl font-bold">{impactMetrics.totalPartnerInstitutions}</p>
            <p className="text-sm opacity-90">
              {language === 'pt' ? 'Instituições Parceiras' : 'Partner Institutions'}
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl p-6 text-white">
            <UserGroupIcon className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-2xl font-bold">{impactMetrics.totalCommunityMembers.toLocaleString()}</p>
            <p className="text-sm opacity-90">
              {language === 'pt' ? 'Membros da Comunidade' : 'Community Members'}
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl p-6 text-white">
            <CurrencyPoundIcon className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-2xl font-bold">{formatCurrency(impactMetrics.cumulativeSavings)}</p>
            <p className="text-sm opacity-90">
              {language === 'pt' ? 'Poupanças Cumulativas' : 'Cumulative Savings'}
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-premium-500 to-premium-600 rounded-xl p-6 text-white">
            <StarIcon className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-2xl font-bold">{impactMetrics.satisfaction}/5</p>
            <p className="text-sm opacity-90">
              {language === 'pt' ? 'Satisfação dos Membros' : 'Member Satisfaction'}
            </p>
          </div>
        </div>
      )}

      {/* Partnership Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {language === 'pt' ? 'Categorias de Parcerias' : 'Partnership Categories'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {institutionalCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${category.color} mr-4`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {language === 'pt' ? category.namePortuguese : category.name}
                  </h3>
                  <p className="text-sm text-gray-600">{category.partnerCount} {language === 'pt' ? 'parceiros' : 'partners'}</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">
                {language === 'pt' ? category.descriptionPortuguese : category.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <p className="text-xs font-medium text-gray-700">
                  {language === 'pt' ? 'Benefícios Principais:' : 'Key Benefits:'}
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {category.memberBenefits.slice(0, 3).map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <CheckBadgeIcon className="w-3 h-3 text-green-500 mr-1 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {category.totalCommunityReach.toLocaleString()} {language === 'pt' ? 'membros' : 'members'}
                </span>
                <button
                  onClick={() => setSelectedCategory(category.id)}
                  className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                >
                  {language === 'pt' ? 'Ver Mais' : 'View More'}
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partnership Development Pipeline */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {language === 'pt' ? 'Pipeline de Desenvolvimento de Parcerias' : 'Partnership Development Pipeline'}
        </h2>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">
              {language === 'pt' ? 'Novas Parcerias em Desenvolvimento' : 'New Partnerships in Development'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {language === 'pt' 
                ? 'Instituições portuguesas estratégicas em processo de parceria'
                : 'Strategic Lusophone institutions in partnership process'
              }
            </p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {developmentPipeline.map((item) => (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{item.institutionName}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStageColor(item.stage)}`}>
                        {language === 'pt' ? item.stagePortuguese : item.stage.replace('_', ' ')}
                      </span>
                      <span className={`text-xs font-medium ${getPriorityColor(item.priority)}`}>
                        {item.priority.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{item.institutionType}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">{language === 'pt' ? 'Valor Esperado' : 'Expected Value'}</p>
                        <p className="font-medium text-green-600">{formatCurrency(item.expectedValue)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{language === 'pt' ? 'Cronograma' : 'Timeline'}</p>
                        <p className="font-medium">{item.timelineWeeks} {language === 'pt' ? 'semanas' : 'weeks'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{language === 'pt' ? 'Contacto Principal' : 'Key Contact'}</p>
                        <p className="font-medium">{item.keyContact.name}</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-1">{language === 'pt' ? 'Próximos Passos:' : 'Next Steps:'}</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {item.nextSteps.slice(0, 2).map((step, index) => (
                          <li key={index} className="flex items-center">
                            <ArrowRightIcon className="w-3 h-3 text-gray-400 mr-2 flex-shrink-0" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <p className="text-xs text-gray-600 italic">{item.strategicImportance}</p>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2 ml-4">
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      {language === 'pt' ? 'Ver Detalhes' : 'View Details'}
                    </button>
                    <div className="flex items-center space-x-2">
                      <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                      <a href={`mailto:${item.keyContact.email}`} className="text-xs text-gray-600 hover:text-gray-800">
                        {language === 'pt' ? 'Contactar' : 'Contact'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strategic Benefits Summary */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {language === 'pt' ? 'Benefícios Estratégicos das Parcerias' : 'Strategic Partnership Benefits'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <LanguageIcon className="w-8 h-8 text-primary-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">
              {language === 'pt' ? 'Preservação Cultural' : 'Cultural Preservation'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'pt'
                ? 'Programas dedicados à preservação e promoção da cultura portuguesa no Reino Unido'
                : 'Dedicated programs for preserving and promoting Portuguese culture in the United Kingdom'
              }
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <BriefcaseIcon className="w-8 h-8 text-secondary-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">
              {language === 'pt' ? 'Desenvolvimento Profissional' : 'Professional Development'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'pt'
                ? 'Oportunidades de networking e crescimento profissional para a comunidade de falantes de português'
                : 'Networking opportunities and professional growth for the Portuguese-speaking community'
              }
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <AcademicCapIcon className="w-8 h-8 text-accent-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">
              {language === 'pt' ? 'Acesso Educacional' : 'Educational Access'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'pt'
                ? 'Descontos e programas especiais em instituições educacionais de prestígio'
                : 'Discounts and special programs at prestigious educational institutions'
              }
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <GiftIcon className="w-8 h-8 text-premium-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">
              {language === 'pt' ? 'Benefícios Exclusivos' : 'Exclusive Benefits'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'pt'
                ? 'Acesso prioritário a eventos e serviços exclusivos para membros da LusoTown'
                : 'Priority access to exclusive events and services for LusoTown members'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {language === 'pt' ? 'Junte-se à Nossa Rede de Parcerias' : 'Join Our Partnership Network'}
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          {language === 'pt'
            ? 'Seja parte de uma rede exclusiva de instituições portuguesas que estão a construir o futuro da comunidade de falantes de português no Reino Unido.'
            : 'Be part of an exclusive network of Lusophone institutions building the future of the Portuguese-speaking community in the United Kingdom.'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">
            {language === 'pt' ? 'Tornar-se Parceiro' : 'Become a Partner'}
          </button>
          <button className="px-8 py-3 bg-white border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 transition-colors font-medium">
            {language === 'pt' ? 'Ver Benefícios' : 'View Benefits'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PortugueseInstitutionalPartnerships