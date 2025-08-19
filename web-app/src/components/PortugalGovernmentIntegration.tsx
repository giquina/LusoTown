'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { usePlatformIntegration } from '@/context/PlatformIntegrationContext'
import {
  BuildingLibraryIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  CheckBadgeIcon,
  StarIcon,
  ArrowRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CurrencyPoundIcon,
  BanknotesIcon,
  UserGroupIcon,
  HandshakeIcon,
  PresentationChartLineIcon,
  LanguageIcon,
  GiftIcon,
  TrophyIcon,
  HeartIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

interface GovernmentPartnership {
  id: string
  institution: string
  institutionPortuguese: string
  type: 'ministry' | 'secretariat' | 'agency' | 'foundation' | 'institute'
  location: string
  status: 'active' | 'negotiating' | 'proposed'
  establishedDate: string
  keyContact: {
    name: string
    title: string
    titlePortuguese: string
    email: string
    phone: string
  }
  services: string[]
  servicesPortuguese: string[]
  communityReach: number
  monthlyEngagement: number
  fundingProvided: number
  programsOffered: number
  description: string
  descriptionPortuguese: string
  officialWebsite: string
  logo: string
}

interface CulturalProgram {
  id: string
  name: string
  namePortuguese: string
  provider: string
  type: 'cultural_exchange' | 'language_certification' | 'heritage_preservation' | 'arts_program' | 'educational_scholarship'
  duration: string
  durationPortuguese: string
  eligibility: string[]
  eligibilityPortuguese: string[]
  benefits: string[]
  benefitsPortuguese: string[]
  applicationDeadline: string
  fundingAmount: number
  participantsExpected: number
  status: 'open' | 'closed' | 'upcoming'
  applicationUrl: string
  contactEmail: string
}

interface DiasporaSupport {
  id: string
  program: string
  programPortuguese: string
  category: 'consular_services' | 'business_support' | 'cultural_initiatives' | 'educational_programs' | 'social_support'
  description: string
  descriptionPortuguese: string
  eligibility: string
  eligibilityPortuguese: string
  benefits: string[]
  benefitsPortuguese: string[]
  applicationProcess: string[]
  applicationProcessPortuguese: string[]
  contactInfo: {
    office: string
    address: string
    phone: string
    email: string
    hours: string
  }
  documentsRequired: string[]
  documentsRequiredPortuguese: string[]
  processingTime: string
  fees: number
}

const PortugalGovernmentIntegration: React.FC = () => {
  const { language } = useLanguage()
  const { trackActivity } = usePlatformIntegration()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [governmentPartnerships, setGovernmentPartnerships] = useState<GovernmentPartnership[]>([])
  const [culturalPrograms, setCulturalPrograms] = useState<CulturalProgram[]>([])
  const [diasporaSupport, setDiasporaSupport] = useState<DiasporaSupport[]>([])

  useEffect(() => {
    loadGovernmentData()
    trackActivity({
      activityType: 'government_integration_access',
      metadata: { section: 'portugal_government', timestamp: new Date().toISOString() }
    })
  }, [])

  const loadGovernmentData = async () => {
    setLoading(true)
    try {
      // Simulate API call - in real implementation, this would fetch from Portuguese government APIs
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setGovernmentPartnerships([
        {
          id: 'ministry-culture',
          institution: 'Ministry of Culture',
          institutionPortuguese: 'Ministério da Cultura',
          type: 'ministry',
          location: 'Lisbon, Portugal',
          status: 'active',
          establishedDate: '2023-06-15',
          keyContact: {
            name: 'Dr. Ana Silva',
            title: 'Director of International Cultural Relations',
            titlePortuguese: 'Diretora de Relações Culturais Internacionais',
            email: 'ana.silva@cultura.gov.pt',
            phone: '+351 213 816 000'
          },
          services: [
            'Cultural event funding',
            'Heritage preservation programs',
            'Artist exchange programs',
            'Portuguese language promotion'
          ],
          servicesPortuguese: [
            'Financiamento de eventos culturais',
            'Programas de preservação patrimonial',
            'Programas de intercâmbio artístico',
            'Promoção da língua portuguesa'
          ],
          communityReach: 25000,
          monthlyEngagement: 1200,
          fundingProvided: 150000,
          programsOffered: 12,
          description: 'Official partnership for promoting Portuguese culture and heritage in the UK through funded programs and cultural initiatives.',
          descriptionPortuguese: 'Parceria oficial para promover a cultura e património português no Reino Unido através de programas financiados e iniciativas culturais.',
          officialWebsite: 'https://www.cultura.gov.pt',
          logo: '/images/government/ministry-culture-pt.png'
        },
        {
          id: 'secretariat-communities',
          institution: 'Secretariat of State for Portuguese Communities',
          institutionPortuguese: 'Secretaria de Estado das Comunidades Portuguesas',
          type: 'secretariat',
          location: 'Lisbon, Portugal',
          status: 'active',
          establishedDate: '2023-03-20',
          keyContact: {
            name: 'Dr. Miguel Santos',
            title: 'Secretary of State',
            titlePortuguese: 'Secretário de Estado',
            email: 'gabinete@secp.gov.pt',
            phone: '+351 217 781 600'
          },
          services: [
            'Diaspora community support',
            'Portuguese citizenship services',
            'Community organization funding',
            'Cultural identity programs'
          ],
          servicesPortuguese: [
            'Apoio à comunidade da diáspora',
            'Serviços de cidadania portuguesa',
            'Financiamento de organizações comunitárias',
            'Programas de identidade cultural'
          ],
          communityReach: 45000,
          monthlyEngagement: 2800,
          fundingProvided: 280000,
          programsOffered: 18,
          description: 'Strategic partnership providing comprehensive support for Portuguese diaspora communities worldwide.',
          descriptionPortuguese: 'Parceria estratégica que fornece apoio abrangente às comunidades da diáspora portuguesa em todo o mundo.',
          officialWebsite: 'https://www.portaldascomunidades.mne.gov.pt',
          logo: '/images/government/secretariat-communities-pt.png'
        },
        {
          id: 'camoes-institute',
          institution: 'Camões Institute for Cooperation and Language',
          institutionPortuguese: 'Instituto Camões de Cooperação e da Língua',
          type: 'institute',
          location: 'Lisbon, Portugal',
          status: 'active',
          establishedDate: '2023-01-10',
          keyContact: {
            name: 'Professor João Oliveira',
            title: 'Director of International Programs',
            titlePortuguese: 'Diretor de Programas Internacionais',
            email: 'joao.oliveira@instituto-camoes.pt',
            phone: '+351 213 109 200'
          },
          services: [
            'Portuguese language certification',
            'Cultural center programming',
            'Educational scholarships',
            'Literary promotion programs'
          ],
          servicesPortuguese: [
            'Certificação da língua portuguesa',
            'Programação de centros culturais',
            'Bolsas educacionais',
            'Programas de promoção literária'
          ],
          communityReach: 35000,
          monthlyEngagement: 1850,
          fundingProvided: 200000,
          programsOffered: 15,
          description: 'Official institute promoting Portuguese language and culture globally through educational and cultural programs.',
          descriptionPortuguese: 'Instituto oficial que promove a língua e cultura portuguesa globalmente através de programas educacionais e culturais.',
          officialWebsite: 'https://instituto-camoes.pt',
          logo: '/images/government/instituto-camoes.png'
        },
        {
          id: 'aicep-portugal',
          institution: 'AICEP Portugal Global',
          institutionPortuguese: 'AICEP Portugal Global',
          type: 'agency',
          location: 'Porto, Portugal / London, UK',
          status: 'negotiating',
          establishedDate: '2024-01-15',
          keyContact: {
            name: 'Dr. Carla Mendes',
            title: 'UK Regional Director',
            titlePortuguese: 'Diretora Regional do Reino Unido',
            email: 'carla.mendes@aicep.pt',
            phone: '+44 20 7201 6666'
          },
          services: [
            'Business investment support',
            'Trade promotion programs',
            'Startup incubation',
            'Export assistance'
          ],
          servicesPortuguese: [
            'Apoio ao investimento empresarial',
            'Programas de promoção comercial',
            'Incubação de startups',
            'Assistência à exportação'
          ],
          communityReach: 15000,
          monthlyEngagement: 850,
          fundingProvided: 120000,
          programsOffered: 8,
          description: 'Portuguese trade and investment promotion agency supporting Portuguese business expansion in the UK.',
          descriptionPortuguese: 'Agência portuguesa de promoção comercial e de investimento que apoia a expansão de negócios portugueses no Reino Unido.',
          officialWebsite: 'https://www.portugalglobal.pt',
          logo: '/images/government/aicep-portugal.png'
        }
      ])

      setCulturalPrograms([
        {
          id: 'heritage-preservation-2024',
          name: 'Portuguese Heritage Preservation Program UK',
          namePortuguese: 'Programa de Preservação do Património Português Reino Unido',
          provider: 'Ministry of Culture',
          type: 'heritage_preservation',
          duration: '12 months',
          durationPortuguese: '12 meses',
          eligibility: [
            'Portuguese community organizations in the UK',
            'Cultural associations promoting Portuguese heritage',
            'Educational institutions with Portuguese programs'
          ],
          eligibilityPortuguese: [
            'Organizações comunitárias portuguesas no Reino Unido',
            'Associações culturais que promovem o património português',
            'Instituições educacionais com programas portugueses'
          ],
          benefits: [
            'Funding up to £25,000',
            'Technical expertise support',
            'Official government recognition',
            'Networking opportunities'
          ],
          benefitsPortuguese: [
            'Financiamento até £25.000',
            'Apoio de especialistas técnicos',
            'Reconhecimento oficial do governo',
            'Oportunidades de networking'
          ],
          applicationDeadline: '2024-09-30',
          fundingAmount: 25000,
          participantsExpected: 15,
          status: 'open',
          applicationUrl: 'https://cultura.gov.pt/heritage-uk-program',
          contactEmail: 'heritage.uk@cultura.gov.pt'
        },
        {
          id: 'language-certification-2024',
          name: 'Portuguese Language Proficiency Certification',
          namePortuguese: 'Certificação de Proficiência em Língua Portuguesa',
          provider: 'Camões Institute',
          type: 'language_certification',
          duration: '6 months preparation',
          durationPortuguese: '6 meses de preparação',
          eligibility: [
            'Portuguese speakers seeking official certification',
            'Professionals requiring language credentials',
            'Students applying for Portuguese universities'
          ],
          eligibilityPortuguese: [
            'Falantes de português que procuram certificação oficial',
            'Profissionais que necessitam de credenciais linguísticas',
            'Estudantes candidatos a universidades portuguesas'
          ],
          benefits: [
            'Internationally recognized certificate',
            'Free preparation courses',
            '50% discount on examination fees',
            'Career advancement opportunities'
          ],
          benefitsPortuguese: [
            'Certificado reconhecido internacionalmente',
            'Cursos de preparação gratuitos',
            '50% de desconto nas taxas de exame',
            'Oportunidades de progressão na carreira'
          ],
          applicationDeadline: '2024-10-15',
          fundingAmount: 500,
          participantsExpected: 200,
          status: 'open',
          applicationUrl: 'https://instituto-camoes.pt/certification-uk',
          contactEmail: 'certification.uk@instituto-camoes.pt'
        },
        {
          id: 'cultural-exchange-2024',
          name: 'UK-Portugal Cultural Exchange Program',
          namePortuguese: 'Programa de Intercâmbio Cultural Reino Unido-Portugal',
          provider: 'Secretariat for Portuguese Communities',
          type: 'cultural_exchange',
          duration: '3 months',
          durationPortuguese: '3 meses',
          eligibility: [
            'Portuguese artists and cultural professionals',
            'UK-based Portuguese community leaders',
            'Cultural organizations with bilateral projects'
          ],
          eligibilityPortuguese: [
            'Artistas e profissionais culturais portugueses',
            'Líderes comunitários portugueses baseados no Reino Unido',
            'Organizações culturais com projetos bilaterais'
          ],
          benefits: [
            'Travel and accommodation funding',
            'Professional development opportunities',
            'Network expansion in both countries',
            'Cultural project support'
          ],
          benefitsPortuguese: [
            'Financiamento de viagem e alojamento',
            'Oportunidades de desenvolvimento profissional',
            'Expansão da rede em ambos os países',
            'Apoio a projetos culturais'
          ],
          applicationDeadline: '2024-11-30',
          fundingAmount: 8000,
          participantsExpected: 25,
          status: 'upcoming',
          applicationUrl: 'https://portaldascomunidades.mne.gov.pt/uk-exchange',
          contactEmail: 'exchange.uk@secp.gov.pt'
        }
      ])

      setDiasporaSupport([
        {
          id: 'consular-services-uk',
          program: 'Portuguese Consular Services UK',
          programPortuguese: 'Serviços Consulares Portugueses Reino Unido',
          category: 'consular_services',
          description: 'Comprehensive consular services for Portuguese citizens and descendants living in the UK.',
          descriptionPortuguese: 'Serviços consulares abrangentes para cidadãos portugueses e descendentes que vivem no Reino Unido.',
          eligibility: 'Portuguese citizens and eligible descendants',
          eligibilityPortuguese: 'Cidadãos portugueses e descendentes elegíveis',
          benefits: [
            'Document issuance and renewal',
            'Citizenship application processing',
            'Legal assistance referrals',
            'Emergency support services'
          ],
          benefitsPortuguese: [
            'Emissão e renovação de documentos',
            'Processamento de pedidos de cidadania',
            'Referências de assistência jurídica',
            'Serviços de apoio de emergência'
          ],
          applicationProcess: [
            'Schedule appointment online',
            'Prepare required documents',
            'Attend consultation',
            'Follow up on processing'
          ],
          applicationProcessPortuguese: [
            'Agendar consulta online',
            'Preparar documentos necessários',
            'Comparecer à consulta',
            'Acompanhar o processamento'
          ],
          contactInfo: {
            office: 'Portuguese Consulate General London',
            address: '11 Belgrave Square, London SW1X 8PP',
            phone: '+44 20 7235 5331',
            email: 'consulado.londres@mne.pt',
            hours: 'Monday-Friday 9:00-17:00'
          },
          documentsRequired: [
            'Valid Portuguese ID or Passport',
            'Proof of UK residence',
            'Birth certificate (if applicable)',
            'Marriage certificate (if applicable)'
          ],
          documentsRequiredPortuguese: [
            'ID ou Passaporte português válido',
            'Comprovativo de residência no Reino Unido',
            'Certidão de nascimento (se aplicável)',
            'Certidão de casamento (se aplicável)'
          ],
          processingTime: '2-8 weeks depending on service',
          fees: 0
        },
        {
          id: 'business-support-uk',
          program: 'Portuguese Business Development Support UK',
          programPortuguese: 'Apoio ao Desenvolvimento de Negócios Portugueses Reino Unido',
          category: 'business_support',
          description: 'Comprehensive business support for Portuguese entrepreneurs and companies expanding to the UK.',
          descriptionPortuguese: 'Apoio empresarial abrangente para empreendedores portugueses e empresas que expandem para o Reino Unido.',
          eligibility: 'Portuguese businesses and entrepreneurs in the UK',
          eligibilityPortuguese: 'Empresas e empreendedores portugueses no Reino Unido',
          benefits: [
            'Business registration assistance',
            'Market research support',
            'Networking opportunities',
            'Funding guidance and connections'
          ],
          benefitsPortuguese: [
            'Assistência no registo de empresas',
            'Apoio em pesquisa de mercado',
            'Oportunidades de networking',
            'Orientação e conexões de financiamento'
          ],
          applicationProcess: [
            'Complete online business profile',
            'Submit business plan',
            'Attend consultation session',
            'Receive tailored support plan'
          ],
          applicationProcessPortuguese: [
            'Completar perfil empresarial online',
            'Submeter plano de negócios',
            'Participar em sessão de consulta',
            'Receber plano de apoio personalizado'
          ],
          contactInfo: {
            office: 'AICEP Portugal Global - London Office',
            address: '1-5 Pall Mall East, London SW1Y 5AU',
            phone: '+44 20 7201 6666',
            email: 'london@aicep.pt',
            hours: 'Monday-Friday 9:30-17:30'
          },
          documentsRequired: [
            'Business registration documents',
            'Financial statements',
            'Market analysis report',
            'Proof of Portuguese connection'
          ],
          documentsRequiredPortuguese: [
            'Documentos de registo da empresa',
            'Demonstrações financeiras',
            'Relatório de análise de mercado',
            'Comprovativo de ligação portuguesa'
          ],
          processingTime: '4-6 weeks for assessment',
          fees: 0
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleProgramApplication = (program: CulturalProgram) => {
    trackActivity({
      activityType: 'government_program_application',
      metadata: {
        programId: program.id,
        provider: program.provider,
        type: program.type,
        timestamp: new Date().toISOString()
      }
    })
    window.open(program.applicationUrl, '_blank')
  }

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      negotiating: 'bg-yellow-100 text-yellow-800',
      proposed: 'bg-blue-100 text-blue-800',
      open: 'bg-green-100 text-green-800',
      closed: 'bg-red-100 text-red-800',
      upcoming: 'bg-purple-100 text-purple-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
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
        <div className="flex items-center justify-center mb-6">
          <BuildingLibraryIcon className="w-12 h-12 text-primary-500 mr-4" />
          <div className="flex items-center space-x-3">
            <img 
              src="/images/flags/portugal.png" 
              alt="Portugal Flag" 
              className="w-8 h-6 rounded"
            />
            <span className="text-2xl">🤝</span>
            <img 
              src="/images/flags/uk.png" 
              alt="UK Flag" 
              className="w-8 h-6 rounded"
            />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {language === 'pt' 
            ? 'Integração Governamental Portuguesa'
            : 'Portuguese Government Integration'
          }
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {language === 'pt'
            ? 'Parcerias oficiais com instituições governamentais portuguesas para apoiar a comunidade portuguesa no Reino Unido através de programas culturais, educacionais e de apoio à diáspora.'
            : 'Official partnerships with Portuguese government institutions to support the Portuguese community in the United Kingdom through cultural, educational, and diaspora support programs.'
          }
        </p>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
          <BuildingLibraryIcon className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-2xl font-bold">{governmentPartnerships.length}</p>
          <p className="text-sm opacity-90">
            {language === 'pt' ? 'Parcerias Oficiais' : 'Official Partnerships'}
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl p-6 text-white">
          <UserGroupIcon className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-2xl font-bold">
            {governmentPartnerships.reduce((sum, p) => sum + p.communityReach, 0).toLocaleString()}
          </p>
          <p className="text-sm opacity-90">
            {language === 'pt' ? 'Alcance Comunitário' : 'Community Reach'}
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl p-6 text-white">
          <BanknotesIcon className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-2xl font-bold">
            {formatCurrency(governmentPartnerships.reduce((sum, p) => sum + p.fundingProvided, 0))}
          </p>
          <p className="text-sm opacity-90">
            {language === 'pt' ? 'Financiamento Total' : 'Total Funding'}
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-premium-500 to-premium-600 rounded-xl p-6 text-white">
          <GiftIcon className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-2xl font-bold">
            {governmentPartnerships.reduce((sum, p) => sum + p.programsOffered, 0)}
          </p>
          <p className="text-sm opacity-90">
            {language === 'pt' ? 'Programas Ativos' : 'Active Programs'}
          </p>
        </div>
      </div>

      {/* Government Partnerships */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {language === 'pt' ? 'Parcerias Governamentais Ativas' : 'Active Government Partnerships'}
        </h2>
        
        <div className="grid gap-6">
          {governmentPartnerships.map((partnership) => (
            <div key={partnership.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <img 
                    src={partnership.logo} 
                    alt={`${partnership.institution} logo`}
                    className="w-16 h-16 rounded-lg object-contain bg-gray-50 p-2"
                    onError={(e) => {
                      e.currentTarget.src = '/images/government/placeholder-gov.png'
                    }}
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {language === 'pt' ? partnership.institutionPortuguese : partnership.institution}
                    </h3>
                    <p className="text-gray-600">{partnership.location}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(partnership.status)}`}>
                        {partnership.status.charAt(0).toUpperCase() + partnership.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {language === 'pt' ? 'Desde' : 'Since'} {new Date(partnership.establishedDate).getFullYear()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <a 
                    href={partnership.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    {language === 'pt' ? 'Site Oficial' : 'Official Website'}
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>

              <p className="text-gray-700 mb-6">
                {language === 'pt' ? partnership.descriptionPortuguese : partnership.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {language === 'pt' ? 'Serviços Oferecidos' : 'Services Offered'}
                  </h4>
                  <ul className="space-y-2">
                    {(language === 'pt' ? partnership.servicesPortuguese : partnership.services).slice(0, 3).map((service, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <CheckBadgeIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {language === 'pt' ? 'Impacto Comunitário' : 'Community Impact'}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{language === 'pt' ? 'Alcance:' : 'Reach:'}</span>
                      <span className="font-medium">{partnership.communityReach.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{language === 'pt' ? 'Engajamento:' : 'Engagement:'}</span>
                      <span className="font-medium">{partnership.monthlyEngagement}/mês</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{language === 'pt' ? 'Programas:' : 'Programs:'}</span>
                      <span className="font-medium">{partnership.programsOffered}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {language === 'pt' ? 'Contacto Principal' : 'Key Contact'}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">{partnership.keyContact.name}</p>
                    <p className="text-gray-600">
                      {language === 'pt' ? partnership.keyContact.titlePortuguese : partnership.keyContact.title}
                    </p>
                    <div className="flex items-center text-gray-600">
                      <EnvelopeIcon className="w-4 h-4 mr-2" />
                      <a href={`mailto:${partnership.keyContact.email}`} className="hover:text-primary-600">
                        {partnership.keyContact.email}
                      </a>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <PhoneIcon className="w-4 h-4 mr-2" />
                      <a href={`tel:${partnership.keyContact.phone}`} className="hover:text-primary-600">
                        {partnership.keyContact.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  {language === 'pt' ? 'Financiamento disponibilizado:' : 'Funding provided:'} <span className="font-semibold text-green-600">{formatCurrency(partnership.fundingProvided)}</span>
                </div>
                <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">
                  {language === 'pt' ? 'Ver Programas' : 'View Programs'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Programs */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {language === 'pt' ? 'Programas Culturais Disponíveis' : 'Available Cultural Programs'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {culturalPrograms.map((program) => (
            <div key={program.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(program.status)}`}>
                  {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                </span>
                <span className="text-xs text-gray-500 flex items-center">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {language === 'pt' ? program.durationPortuguese : program.duration}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'pt' ? program.namePortuguese : program.name}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4">
                {language === 'pt' ? 'Fornecido por:' : 'Provided by:'} <span className="font-medium">{program.provider}</span>
              </p>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  {language === 'pt' ? 'Benefícios:' : 'Benefits:'}
                </h4>
                <ul className="space-y-1">
                  {(language === 'pt' ? program.benefitsPortuguese : program.benefits).slice(0, 3).map((benefit, index) => (
                    <li key={index} className="flex items-center text-xs text-gray-700">
                      <CheckBadgeIcon className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  {language === 'pt' ? 'Elegibilidade:' : 'Eligibility:'}
                </h4>
                <ul className="space-y-1">
                  {(language === 'pt' ? program.eligibilityPortuguese : program.eligibility).slice(0, 2).map((criterion, index) => (
                    <li key={index} className="text-xs text-gray-600">
                      • {criterion}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between mb-4 text-sm">
                <span className="text-gray-600">
                  {language === 'pt' ? 'Financiamento:' : 'Funding:'}
                </span>
                <span className="font-semibold text-green-600">
                  {formatCurrency(program.fundingAmount)}
                </span>
              </div>

              <div className="flex items-center justify-between mb-4 text-sm">
                <span className="text-gray-600">
                  {language === 'pt' ? 'Prazo:' : 'Deadline:'}
                </span>
                <span className="font-medium">
                  {new Date(program.applicationDeadline).toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB')}
                </span>
              </div>

              <button
                onClick={() => handleProgramApplication(program)}
                className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                disabled={program.status === 'closed'}
              >
                {program.status === 'closed' 
                  ? (language === 'pt' ? 'Prazo Encerrado' : 'Deadline Closed')
                  : program.status === 'upcoming'
                  ? (language === 'pt' ? 'Em Breve' : 'Coming Soon')
                  : (language === 'pt' ? 'Candidatar' : 'Apply Now')
                }
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Diaspora Support Services */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {language === 'pt' ? 'Serviços de Apoio à Diáspora' : 'Diaspora Support Services'}
        </h2>
        
        <div className="space-y-6">
          {diasporaSupport.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {language === 'pt' ? service.programPortuguese : service.program}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'pt' ? service.descriptionPortuguese : service.description}
                  </p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {service.category.replace('_', ' ')}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {language === 'pt' ? 'Benefícios do Serviço:' : 'Service Benefits:'}
                  </h4>
                  <ul className="space-y-2">
                    {(language === 'pt' ? service.benefitsPortuguese : service.benefits).map((benefit, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <CheckBadgeIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {language === 'pt' ? 'Processo de Candidatura:' : 'Application Process:'}
                  </h4>
                  <ol className="space-y-2">
                    {(language === 'pt' ? service.applicationProcessPortuguese : service.applicationProcess).map((step, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <span className="bg-primary-100 text-primary-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-2 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  {language === 'pt' ? 'Informações de Contacto:' : 'Contact Information:'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">{service.contactInfo.office}</p>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPinIcon className="w-4 h-4 mr-2" />
                      {service.contactInfo.address}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <PhoneIcon className="w-4 h-4 mr-2" />
                      <a href={`tel:${service.contactInfo.phone}`} className="hover:text-primary-600">
                        {service.contactInfo.phone}
                      </a>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <EnvelopeIcon className="w-4 h-4 mr-2" />
                      <a href={`mailto:${service.contactInfo.email}`} className="hover:text-primary-600">
                        {service.contactInfo.email}
                      </a>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      {service.contactInfo.hours}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">
                    {language === 'pt' ? 'Tempo de processamento:' : 'Processing time:'} 
                  </span> {service.processingTime}
                  {service.fees > 0 && (
                    <span className="ml-4">
                      <span className="font-medium">
                        {language === 'pt' ? 'Taxa:' : 'Fee:'} 
                      </span> {formatCurrency(service.fees)}
                    </span>
                  )}
                  {service.fees === 0 && (
                    <span className="ml-4 text-green-600 font-medium">
                      {language === 'pt' ? 'Gratuito' : 'Free'}
                    </span>
                  )}
                </div>
                <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">
                  {language === 'pt' ? 'Saber Mais' : 'Learn More'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8">
        <HandshakeIcon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {language === 'pt' ? 'Fortaleça Sua Conexão com Portugal' : 'Strengthen Your Connection with Portugal'}
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          {language === 'pt'
            ? 'Acesse programas oficiais, serviços consulares e oportunidades de financiamento através das nossas parcerias governamentais estratégicas.'
            : 'Access official programs, consular services, and funding opportunities through our strategic government partnerships.'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">
            {language === 'pt' ? 'Explorar Programas' : 'Explore Programs'}
          </button>
          <button className="px-8 py-3 bg-white border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 transition-colors font-medium">
            {language === 'pt' ? 'Contactar Consulado' : 'Contact Consulate'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PortugalGovernmentIntegration