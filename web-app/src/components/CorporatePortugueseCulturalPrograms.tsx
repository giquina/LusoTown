'use client'

import { motion } from 'framer-motion'
import { BuildingOffice2Icon, UsersIcon, GlobeAltIcon, AcademicCapIcon, TrophyIcon, ClockIcon } from '@heroicons/react/24/outline'
import { Crown, Users, Briefcase, Globe, Trophy, BookOpen, Heart, Handshake } from 'lucide-react'
import { useState } from 'react'

interface CorporateProgram {
  id: string
  name: string
  namePortuguese: string
  description: string
  descriptionPortuguese: string
  duration: string
  price: number
  category: 'language-immersion' | 'cultural-training' | 'business-etiquette' | 'team-building' | 'leadership' | 'partnership'
  targetAudience: string
  targetAudiencePortuguese: string
  groupSize: string
  outcomes: string[]
  outcomesPortuguese: string[]
  modules: ProgramModule[]
  businessBenefits: string[]
  businessBenefitsPortuguese: string[]
  includes: string[]
  includesPortuguese: string[]
  certificationsOffered: string[]
  certificationsOfferedPortuguese: string[]
  chamberOfCommercePartnership?: boolean
}

interface ProgramModule {
  name: string
  namePortuguese: string
  duration: string
  description: string
  descriptionPortuguese: string
  type: 'workshop' | 'immersion' | 'networking' | 'cultural' | 'practical'
}

const corporatePrograms: CorporateProgram[] = [
  {
    id: 'executive-portuguese-immersion',
    name: 'Executive Portuguese Language & Cultural Immersion',
    namePortuguese: 'Imersão Executiva em Língua e Cultura Portuguesa',
    description: 'Comprehensive 5-day Portuguese language and cultural immersion program designed for executives and senior professionals doing business with Portuguese-speaking markets.',
    descriptionPortuguese: 'Programa abrangente de 5 dias de imersão em língua e cultura portuguesa desenhado para executivos e profissionais seniores fazendo negócios com mercados lusófonos.',
    duration: '5 days intensive',
    price: 2850,
    category: 'language-immersion',
    targetAudience: 'C-level executives, senior managers, business development professionals',
    targetAudiencePortuguese: 'Executivos de topo, gestores seniores, profissionais de desenvolvimento de negócios',
    groupSize: 'Maximum 8 participants',
    outcomes: [
      'Conversational Portuguese proficiency for business contexts',
      'Deep understanding of Portuguese and Brazilian business cultures',
      'Practical knowledge of Portuguese business etiquette and protocols',
      'Network of Portuguese business contacts and partnerships',
      'Cultural competency for successful Portuguese market entry'
    ],
    outcomesPortuguese: [
      'Proficiência conversacional em português para contextos empresariais',
      'Compreensão profunda das culturas empresariais portuguesa e brasileira',
      'Conhecimento prático de etiqueta e protocolos empresariais portugueses',
      'Rede de contactos e parcerias empresariais portuguesas',
      'Competência cultural para entrada bem-sucedida no mercado português'
    ],
    modules: [
      {
        name: 'Portuguese Business Language Intensive',
        namePortuguese: 'Intensivo de Língua Portuguesa Empresarial',
        duration: '16 hours',
        description: 'Accelerated Portuguese language training focused on business vocabulary, presentations, negotiations, and formal communication.',
        descriptionPortuguese: 'Treino acelerado de língua portuguesa focado em vocabulário empresarial, apresentações, negociações e comunicação formal.',
        type: 'workshop'
      },
      {
        name: 'Portuguese Cultural Intelligence Workshop',
        namePortuguese: 'Workshop de Inteligência Cultural Portuguesa',
        duration: '8 hours',
        description: 'Deep dive into Portuguese values, communication styles, hierarchy, decision-making processes, and relationship-building approaches.',
        descriptionPortuguese: 'Mergulho profundo em valores portugueses, estilos de comunicação, hierarquia, processos de tomada de decisão e abordagens de construção de relacionamentos.',
        type: 'cultural'
      },
      {
        name: 'Portuguese Business Etiquette & Protocol Masterclass',
        namePortuguese: 'Masterclass de Etiqueta e Protocolo Empresarial Português',
        duration: '4 hours',
        description: 'Practical training in Portuguese business dining, gift-giving, meeting conduct, and professional relationship management.',
        descriptionPortuguese: 'Treino prático em jantares empresariais portugueses, oferta de presentes, conduta em reuniões e gestão de relacionamentos profissionais.',
        type: 'practical'
      },
      {
        name: 'Portuguese Business Network Integration',
        namePortuguese: 'Integração na Rede Empresarial Portuguesa',
        duration: '4 hours',
        description: 'Facilitated networking sessions with Portuguese Chamber of Commerce members, business leaders, and potential partners.',
        descriptionPortuguese: 'Sessões de networking facilitadas com membros da Câmara de Comércio Portuguesa, líderes empresariais e potenciais parceiros.',
        type: 'networking'
      },
      {
        name: 'Portuguese Market Entry Strategy Session',
        namePortuguese: 'Sessão de Estratégia de Entrada no Mercado Português',
        duration: '8 hours',
        description: 'Strategic planning workshop for Portuguese and Brazilian market entry, including cultural considerations and partnership strategies.',
        descriptionPortuguese: 'Workshop de planeamento estratégico para entrada nos mercados português e brasileiro, incluindo considerações culturais e estratégias de parceria.',
        type: 'workshop'
      }
    ],
    businessBenefits: [
      'Accelerated market entry into Portuguese-speaking regions',
      'Enhanced credibility and trust with Portuguese business partners',
      'Reduced cultural miscommunication and business mistakes',
      'Access to exclusive Portuguese business networks and opportunities',
      'Competitive advantage in Portuguese and Brazilian markets'
    ],
    businessBenefitsPortuguese: [
      'Entrada acelerada no mercado em regiões lusófonas',
      'Credibilidade e confiança melhoradas com parceiros empresariais portugueses',
      'Redução de má comunicação cultural e erros empresariais',
      'Acesso a redes e oportunidades empresariais portuguesas exclusivas',
      'Vantagem competitiva nos mercados português e brasileiro'
    ],
    includes: [
      'Intensive Portuguese language training with native instructors',
      'Cultural immersion experiences with Portuguese families',
      'Executive networking events with Portuguese Chamber of Commerce',
      'Portuguese business dinner with formal etiquette training',
      'Comprehensive Portuguese market entry strategy consultation',
      'Portuguese language learning materials and cultural guide',
      'Certificate of completion from Instituto Camões partnership'
    ],
    includesPortuguese: [
      'Treino intensivo de língua portuguesa com instrutores nativos',
      'Experiências de imersão cultural com famílias portuguesas',
      'Eventos de networking executivo com Câmara de Comércio Portuguesa',
      'Jantar empresarial português com treino formal de etiqueta',
      'Consultoria abrangente de estratégia de entrada no mercado português',
      'Materiais de aprendizagem de língua portuguesa e guia cultural',
      'Certificado de conclusão da parceria Instituto Camões'
    ],
    certificationsOffered: [
      'Portuguese Business Cultural Competency Certificate',
      'Instituto Camões Portuguese Language Proficiency Certificate',
      'Portuguese Chamber of Commerce Business Network Member'
    ],
    certificationsOfferedPortuguese: [
      'Certificado de Competência Cultural Empresarial Portuguesa',
      'Certificado de Proficiência em Língua Portuguesa Instituto Camões',
      'Membro da Rede Empresarial da Câmara de Comércio Portuguesa'
    ],
    chamberOfCommercePartnership: true
  },
  {
    id: 'portuguese-team-cultural-integration',
    name: 'Portuguese Team Cultural Integration Program',
    namePortuguese: 'Programa de Integração Cultural de Equipas Portuguesas',
    description: 'Comprehensive team development program designed to integrate Portuguese employees and create cultural bridges within multinational organizations.',
    descriptionPortuguese: 'Programa abrangente de desenvolvimento de equipas desenhado para integrar funcionários portugueses e criar pontes culturais dentro de organizações multinacionais.',
    duration: '3 days program',
    price: 1950,
    category: 'team-building',
    targetAudience: 'HR managers, team leaders, multinational teams with Portuguese members',
    targetAudiencePortuguese: 'Gestores de RH, líderes de equipa, equipas multinacionais com membros portugueses',
    groupSize: 'Maximum 20 participants',
    outcomes: [
      'Enhanced cross-cultural communication within teams',
      'Better integration of Portuguese employees and perspectives',
      'Reduced cultural misunderstandings and conflicts',
      'Improved team cohesion and collaboration',
      'Leveraged Portuguese cultural strengths for business advantage'
    ],
    outcomesPortuguese: [
      'Comunicação intercultural melhorada dentro das equipas',
      'Melhor integração de funcionários e perspectivas portuguesas',
      'Redução de mal-entendidos e conflitos culturais',
      'Coesão e colaboração de equipa melhoradas',
      'Aproveitamento das forças culturais portuguesas para vantagem empresarial'
    ],
    modules: [
      {
        name: 'Portuguese Cultural Values Workshop',
        namePortuguese: 'Workshop de Valores Culturais Portugueses',
        duration: '6 hours',
        description: 'Interactive exploration of Portuguese cultural values, communication patterns, and workplace expectations for team understanding.',
        descriptionPortuguese: 'Exploração interativa de valores culturais portugueses, padrões de comunicação e expectativas no local de trabalho para compreensão da equipa.',
        type: 'cultural'
      },
      {
        name: 'Cross-Cultural Communication Skills Training',
        namePortuguese: 'Treino de Competências de Comunicação Intercultural',
        duration: '8 hours',
        description: 'Practical training in effective communication across Portuguese and international cultural contexts within workplace settings.',
        descriptionPortuguese: 'Treino prático em comunicação eficaz através de contextos culturais portugueses e internacionais dentro de ambientes de trabalho.',
        type: 'workshop'
      },
      {
        name: 'Portuguese-International Team Building Activities',
        namePortuguese: 'Atividades de Construção de Equipas Português-Internacionais',
        duration: '6 hours',
        description: 'Structured team building exercises that celebrate Portuguese culture while building international team cohesion and understanding.',
        descriptionPortuguese: 'Exercícios estruturados de construção de equipas que celebram a cultura portuguesa enquanto constroem coesão e compreensão de equipas internacionais.',
        type: 'immersion'
      },
      {
        name: 'Cultural Bridge Leadership Training',
        namePortuguese: 'Treino de Liderança de Ponte Cultural',
        duration: '4 hours',
        description: 'Training for team leaders on leveraging Portuguese cultural perspectives and managing multicultural teams effectively.',
        descriptionPortuguese: 'Treino para líderes de equipa sobre aproveitamento de perspectivas culturais portuguesas e gestão eficaz de equipas multiculturais.',
        type: 'workshop'
      }
    ],
    businessBenefits: [
      'Improved employee retention and satisfaction among Portuguese team members',
      'Enhanced team performance through cultural diversity leverage',
      'Reduced HR costs related to cultural conflicts and misunderstandings',
      'Stronger company culture that values international perspectives',
      'Better preparation for Portuguese market expansion or partnerships'
    ],
    businessBenefitsPortuguese: [
      'Retenção e satisfação melhoradas de funcionários entre membros portugueses da equipa',
      'Desempenho de equipa melhorado através do aproveitamento da diversidade cultural',
      'Custos de RH reduzidos relacionados com conflitos culturais e mal-entendidos',
      'Cultura empresarial mais forte que valoriza perspectivas internacionais',
      'Melhor preparação para expansão ou parcerias no mercado português'
    ],
    includes: [
      'Comprehensive cultural assessment and team analysis',
      'Professional Portuguese cultural trainers and facilitators',
      'Portuguese cultural experience activities and workshops',
      'Team building exercises with Portuguese cultural themes',
      'Ongoing support and consultation for 6 months',
      'Cultural integration toolkit and resources',
      'Team cultural competency certification'
    ],
    includesPortuguese: [
      'Avaliação cultural abrangente e análise de equipa',
      'Formadores e facilitadores culturais portugueses profissionais',
      'Atividades e workshops de experiência cultural portuguesa',
      'Exercícios de construção de equipas com temas culturais portugueses',
      'Apoio contínuo e consultoria por 6 meses',
      'Kit de ferramentas e recursos de integração cultural',
      'Certificação de competência cultural de equipa'
    ],
    certificationsOffered: [
      'Cultural Integration Team Leadership Certificate',
      'Portuguese Cultural Competency Team Certification',
      'Multicultural Workplace Excellence Recognition'
    ],
    certificationsOfferedPortuguese: [
      'Certificado de Liderança de Equipa de Integração Cultural',
      'Certificação de Competência Cultural Portuguesa de Equipa',
      'Reconhecimento de Excelência no Local de Trabalho Multicultural'
    ],
    chamberOfCommercePartnership: true
  },
  {
    id: 'portuguese-chamber-commerce-partnership',
    name: 'Portuguese Chamber of Commerce Strategic Partnership Program',
    namePortuguese: 'Programa de Parceria Estratégica da Câmara de Comércio Portuguesa',
    description: 'Exclusive partnership program connecting British companies with Portuguese Chamber of Commerce for strategic business relationships and market expansion opportunities.',
    descriptionPortuguese: 'Programa de parceria exclusivo conectando empresas britânicas com a Câmara de Comércio Portuguesa para relacionamentos empresariais estratégicos e oportunidades de expansão de mercado.',
    duration: '6 months partnership',
    price: 4500,
    category: 'partnership',
    targetAudience: 'Companies seeking Portuguese/Brazilian market entry, export opportunities, investment partnerships',
    targetAudiencePortuguese: 'Empresas procurando entrada nos mercados português/brasileiro, oportunidades de exportação, parcerias de investimento',
    groupSize: 'Individual company partnerships',
    outcomes: [
      'Official Portuguese Chamber of Commerce partnership status',
      'Direct access to Portuguese business networks and opportunities',
      'Facilitated introductions to potential Portuguese business partners',
      'Priority access to Portuguese trade missions and business events',
      'Strategic guidance for Portuguese and Brazilian market entry'
    ],
    outcomesPortuguese: [
      'Estatuto oficial de parceria da Câmara de Comércio Portuguesa',
      'Acesso direto a redes e oportunidades empresariais portuguesas',
      'Introduções facilitadas a potenciais parceiros empresariais portugueses',
      'Acesso prioritário a missões comerciais e eventos empresariais portugueses',
      'Orientação estratégica para entrada nos mercados português e brasileiro'
    ],
    modules: [
      {
        name: 'Portuguese Chamber of Commerce Integration',
        namePortuguese: 'Integração na Câmara de Comércio Portuguesa',
        duration: 'Ongoing',
        description: 'Formal introduction and integration into Portuguese Chamber of Commerce network with ongoing relationship management.',
        descriptionPortuguese: 'Introdução formal e integração na rede da Câmara de Comércio Portuguesa com gestão contínua de relacionamentos.',
        type: 'networking'
      },
      {
        name: 'Portuguese Market Intelligence Briefings',
        namePortuguese: 'Briefings de Inteligência do Mercado Português',
        duration: 'Monthly',
        description: 'Regular market intelligence updates, trends analysis, and business opportunity identification in Portuguese-speaking markets.',
        descriptionPortuguese: 'Atualizações regulares de inteligência de mercado, análise de tendências e identificação de oportunidades de negócio em mercados lusófonos.',
        type: 'workshop'
      },
      {
        name: 'Portuguese Business Matchmaking Services',
        namePortuguese: 'Serviços de Encontro de Negócios Portugueses',
        duration: 'Ongoing',
        description: 'Professional matchmaking with suitable Portuguese business partners, suppliers, distributors, and investment opportunities.',
        descriptionPortuguese: 'Encontro profissional com parceiros empresariais portugueses adequados, fornecedores, distribuidores e oportunidades de investimento.',
        type: 'networking'
      },
      {
        name: 'Portuguese Trade Mission Participation',
        namePortuguese: 'Participação em Missões Comerciais Portuguesas',
        duration: 'Quarterly',
        description: 'Facilitated participation in official Portuguese trade missions, business delegations, and international partnership events.',
        descriptionPortuguese: 'Participação facilitada em missões comerciais portuguesas oficiais, delegações empresariais e eventos de parceria internacional.',
        type: 'networking'
      }
    ],
    businessBenefits: [
      'Accelerated entry into Portuguese and Brazilian markets',
      'Access to exclusive Portuguese business opportunities and partnerships',
      'Enhanced credibility through official Chamber of Commerce endorsement',
      'Strategic guidance from Portuguese market experts and business leaders',
      'Long-term competitive advantage in Lusophone markets'
    ],
    businessBenefitsPortuguese: [
      'Entrada acelerada nos mercados português e brasileiro',
      'Acesso a oportunidades e parcerias empresariais portuguesas exclusivas',
      'Credibilidade melhorada através de endosso oficial da Câmara de Comércio',
      'Orientação estratégica de especialistas e líderes empresariais portugueses',
      'Vantagem competitiva a longo prazo em mercados lusófonos'
    ],
    includes: [
      'Official Portuguese Chamber of Commerce membership and certification',
      'Dedicated Portuguese business relationship manager',
      'Monthly Portuguese market intelligence reports and analysis',
      'Quarterly Portuguese business networking events and receptions',
      'Priority access to Portuguese trade missions and delegations',
      'Professional translation services for Portuguese business communications',
      'Legal and regulatory guidance for Portuguese market entry'
    ],
    includesPortuguese: [
      'Adesão e certificação oficial da Câmara de Comércio Portuguesa',
      'Gestor dedicado de relacionamentos empresariais portugueses',
      'Relatórios e análises mensais de inteligência do mercado português',
      'Eventos trimestrais de networking empresarial português e receções',
      'Acesso prioritário a missões e delegações comerciais portuguesas',
      'Serviços de tradução profissional para comunicações empresariais portuguesas',
      'Orientação legal e regulamentar para entrada no mercado português'
    ],
    certificationsOffered: [
      'Portuguese Chamber of Commerce Strategic Partner Certificate',
      'Portuguese Market Entry Specialist Certification',
      'Lusophone Business Network Member Credential'
    ],
    certificationsOfferedPortuguese: [
      'Certificado de Parceiro Estratégico da Câmara de Comércio Portuguesa',
      'Certificação de Especialista em Entrada no Mercado Português',
      'Credencial de Membro da Rede Empresarial Lusófona'
    ],
    chamberOfCommercePartnership: true
  }
]

const PROGRAM_CATEGORIES = [
  { id: 'all', icon: BuildingOffice2Icon, label: { en: 'All Programs', pt: 'Todos os Programas' } },
  { id: 'language-immersion', icon: AcademicCapIcon, label: { en: 'Language Immersion', pt: 'Imersão Linguística' } },
  { id: 'cultural-training', icon: Globe, label: { en: 'Cultural Training', pt: 'Treino Cultural' } },
  { id: 'business-etiquette', icon: Crown, label: { en: 'Business Etiquette', pt: 'Etiqueta Empresarial' } },
  { id: 'team-building', icon: Users, label: { en: 'Team Building', pt: 'Construção de Equipas' } },
  { id: 'leadership', icon: Trophy, label: { en: 'Leadership', pt: 'Liderança' } },
  { id: 'partnership', icon: Handshake, label: { en: 'Partnerships', pt: 'Parcerias' } }
]

interface CorporatePortugueseCulturalProgramsProps {
  isPortuguese: boolean
  onRequestProgram: (programId: string) => void
}

export default function CorporatePortugueseCulturalPrograms({ isPortuguese, onRequestProgram }: CorporatePortugueseCulturalProgramsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null)

  const filteredPrograms = selectedCategory === 'all' 
    ? corporatePrograms
    : corporatePrograms.filter(program => program.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    const colors = {
      'language-immersion': 'primary',
      'cultural-training': 'secondary',
      'business-etiquette': 'accent',
      'team-building': 'premium',
      'leadership': 'coral',
      'partnership': 'action'
    }
    return colors[category] || 'gray'
  }

  const getCategoryIcon = (category: string) => {
    const categoryData = PROGRAM_CATEGORIES.find(cat => cat.id === category)
    return categoryData ? categoryData.icon : BuildingOffice2Icon
  }

  return (
    <section className="py-16 bg-gradient-to-br from-white via-primary-50/30 to-secondary-50/30">
      <div className="container-width">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-primary-100 via-secondary-50 to-accent-100 border border-primary-200">
              <BuildingOffice2Icon className="w-4 h-4 mr-2" />
              {isPortuguese ? 'Programas Corporativos Portugueses' : 'Portuguese Corporate Programs'}
            </span>
          </motion.div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {isPortuguese ? 'Programas Culturais Corporativos Portugueses' : 'Corporate Portuguese Cultural Programs'}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {isPortuguese 
              ? 'Acelere o sucesso empresarial com programas corporativos especializados em cultura e negócios portugueses, desenvolvidos em parceria com a Câmara de Comércio Portuguesa e Instituto Camões'
              : 'Accelerate business success with specialized Portuguese culture and business corporate programs, developed in partnership with Portuguese Chamber of Commerce and Instituto Camões'
            }
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {PROGRAM_CATEGORIES.map(category => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                      : 'bg-white/80 text-gray-700 hover:bg-gray-100 hover:text-primary-600 border border-gray-200'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {category.label[isPortuguese ? 'pt' : 'en']}
                </button>
              )
            })}
          </div>
        </div>

        {/* Programs List */}
        <div className="space-y-8">
          {filteredPrograms.map((program, index) => {
            const IconComponent = getCategoryIcon(program.category)
            const colorClass = getCategoryColor(program.category)
            const isExpanded = expandedProgram === program.id
            
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
              >
                {/* Program Header */}
                <div className={`bg-gradient-to-r ${colorClass === 'primary' ? 'from-primary-50 to-primary-100/50' : colorClass === 'secondary' ? 'from-secondary-50 to-secondary-100/50' : colorClass === 'accent' ? 'from-accent-50 to-accent-100/50' : colorClass === 'premium' ? 'from-premium-50 to-premium-100/50' : colorClass === 'coral' ? 'from-coral-50 to-coral-100/50' : 'from-action-50 to-action-100/50'} p-6`}>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 ${colorClass === 'primary' ? 'bg-primary-500' : colorClass === 'secondary' ? 'bg-secondary-500' : colorClass === 'accent' ? 'bg-accent-500' : colorClass === 'premium' ? 'bg-premium-500' : colorClass === 'coral' ? 'bg-coral-500' : 'bg-action-500'} rounded-xl flex items-center justify-center`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className={`text-xs font-medium ${colorClass === 'primary' ? 'text-primary-600' : colorClass === 'secondary' ? 'text-secondary-600' : colorClass === 'accent' ? 'text-accent-600' : colorClass === 'premium' ? 'text-premium-600' : colorClass === 'coral' ? 'text-coral-600' : 'text-action-600'} uppercase tracking-wide`}>
                              {program.category} • {program.duration}
                            </span>
                            {program.chamberOfCommercePartnership && (
                              <span className="text-xs bg-premium-100 text-premium-700 px-2 py-1 rounded-full">
                                {isPortuguese ? 'Parceria Câmara Comércio' : 'Chamber Partnership'}
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {isPortuguese ? program.namePortuguese : program.name}
                          </h3>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">
                        {isPortuguese ? program.descriptionPortuguese : program.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>{program.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <UsersIcon className="w-4 h-4" />
                          <span>{program.groupSize}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-lg text-gray-900">£{program.price.toLocaleString()}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        <strong>{isPortuguese ? 'Público-alvo: ' : 'Target Audience: '}</strong>
                        {isPortuguese ? program.targetAudiencePortuguese : program.targetAudience}
                      </p>
                    </div>
                    
                    <div className="text-center lg:text-right">
                      <button
                        onClick={() => onRequestProgram(program.id)}
                        className={`${colorClass === 'primary' ? 'bg-primary-600 hover:bg-primary-700' : colorClass === 'secondary' ? 'bg-secondary-600 hover:bg-secondary-700' : colorClass === 'accent' ? 'bg-accent-600 hover:bg-accent-700' : colorClass === 'premium' ? 'bg-premium-600 hover:bg-premium-700' : colorClass === 'coral' ? 'bg-coral-600 hover:bg-coral-700' : 'bg-action-600 hover:bg-action-700'} text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg text-sm`}
                      >
                        {isPortuguese ? 'Solicitar Programa' : 'Request Program'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Program Content */}
                <div className="p-6">
                  {/* Outcomes */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      {isPortuguese ? 'Resultados do Programa' : 'Program Outcomes'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {(isPortuguese ? program.outcomesPortuguese : program.outcomes).slice(0, 4).map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <TrophyIcon className={`w-4 h-4 ${colorClass === 'primary' ? 'text-primary-500' : colorClass === 'secondary' ? 'text-secondary-500' : colorClass === 'accent' ? 'text-accent-500' : colorClass === 'premium' ? 'text-premium-500' : colorClass === 'coral' ? 'text-coral-500' : 'text-action-500'} mt-0.5 flex-shrink-0`} />
                          <span className="text-gray-700 text-sm">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Business Benefits */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      {isPortuguese ? 'Benefícios Empresariais' : 'Business Benefits'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {(isPortuguese ? program.businessBenefitsPortuguese : program.businessBenefits).slice(0, 3).map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Briefcase className={`w-4 h-4 ${colorClass === 'primary' ? 'text-primary-500' : colorClass === 'secondary' ? 'text-secondary-500' : colorClass === 'accent' ? 'text-accent-500' : colorClass === 'premium' ? 'text-premium-500' : colorClass === 'coral' ? 'text-coral-500' : 'text-action-500'} mt-0.5 flex-shrink-0`} />
                          <span className="text-gray-700 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => setExpandedProgram(isExpanded ? null : program.id)}
                    className={`w-full ${colorClass === 'primary' ? 'bg-primary-500 hover:bg-primary-600' : colorClass === 'secondary' ? 'bg-secondary-500 hover:bg-secondary-600' : colorClass === 'accent' ? 'bg-accent-500 hover:bg-accent-600' : colorClass === 'premium' ? 'bg-premium-500 hover:bg-premium-600' : colorClass === 'coral' ? 'bg-coral-500 hover:bg-coral-600' : 'bg-action-500 hover:bg-action-600'} text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200`}
                  >
                    {isExpanded 
                      ? (isPortuguese ? 'Ver Menos' : 'Show Less')
                      : (isPortuguese ? 'Ver Módulos e Detalhes' : 'Show Modules & Details')
                    }
                  </button>
                  
                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mt-6 space-y-6 border-t border-gray-200 pt-6">
                      {/* Program Modules */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">
                          {isPortuguese ? 'Módulos do Programa:' : 'Program Modules:'}
                        </h4>
                        <div className="space-y-3">
                          {program.modules.map((module, moduleIndex) => (
                            <div key={moduleIndex} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h5 className="font-semibold text-gray-900 text-sm">
                                  {isPortuguese ? module.namePortuguese : module.name}
                                </h5>
                                <span className="text-xs text-gray-500">{module.duration}</span>
                              </div>
                              <p className="text-gray-700 text-xs">
                                {isPortuguese ? module.descriptionPortuguese : module.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* What's Included */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">
                          {isPortuguese ? 'O Que Está Incluído:' : 'What\'s Included:'}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {(isPortuguese ? program.includesPortuguese : program.includes).map((include, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <Heart className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{include}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Certifications Offered */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          {isPortuguese ? 'Certificações Oferecidas:' : 'Certifications Offered:'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(isPortuguese ? program.certificationsOfferedPortuguese : program.certificationsOffered).map(cert => (
                            <span
                              key={cert}
                              className="px-3 py-1 bg-premium-100 text-premium-700 text-xs rounded-full"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 via-secondary-50 to-accent-50 rounded-2xl p-8 border border-primary-200">
            <BuildingOffice2Icon className="w-16 h-16 mx-auto mb-4 text-primary-500" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Programa Corporativo Personalizado' : 'Custom Corporate Program'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {isPortuguese 
                ? 'Desenvolvemos programas corporativos personalizados baseados nas necessidades específicas da sua empresa, objetivos de mercado português e metas de integração cultural.'
                : 'We develop custom corporate programs based on your company\'s specific needs, Portuguese market objectives, and cultural integration goals.'
              }
            </p>
            <button
              onClick={() => onRequestProgram('custom-corporate')}
              className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {isPortuguese ? 'Solicitar Programa Personalizado' : 'Request Custom Program'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}