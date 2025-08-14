'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { 
  UserGroupIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  MegaphoneIcon,
  CameraIcon,
  BuildingStorefrontIcon,
  ShieldCheckIcon,
  LanguageIcon,
  HeartIcon,
  BriefcaseIcon,
  MapPinIcon,
  CurrencyPoundIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

interface JobRole {
  id: string
  title: string
  titlePt: string
  department: string
  departmentPt: string
  location: string
  type: string
  typePt: string
  salary: string
  description: string
  descriptionPt: string
  responsibilities: string[]
  responsibilitiesPt: string[]
  requirements: string[]
  requirementsPt: string[]
  icon: React.ComponentType<any>
  isHot?: boolean
}

const jobRoles: JobRole[] = [
  {
    id: 'community-manager',
    title: 'Portuguese Community Manager',
    titlePt: 'Gestor de Comunidade Portuguesa',
    department: 'Community',
    departmentPt: 'Comunidade',
    location: 'London, UK',
    type: 'Full-time',
    typePt: 'Tempo integral',
    salary: '£35,000 - £45,000',
    description: 'Lead and grow our Portuguese-speaking community across London. Build authentic connections and foster cultural engagement.',
    descriptionPt: 'Lidere e faça crescer a nossa comunidade lusófona em Londres. Construa conexões autênticas e promova o envolvimento cultural.',
    responsibilities: [
      'Manage and grow Portuguese community engagement',
      'Create culturally authentic content for Portuguese speakers',
      'Coordinate community events and meetups',
      'Handle community moderation with cultural sensitivity',
      'Build partnerships with Portuguese organizations'
    ],
    responsibilitiesPt: [
      'Gerir e expandir o envolvimento da comunidade portuguesa',
      'Criar conteúdo culturalmente autêntico para lusófonos',
      'Coordenar eventos e encontros comunitários',
      'Moderar a comunidade com sensibilidade cultural',
      'Construir parcerias com organizações portuguesas'
    ],
    requirements: [
      'Native Portuguese speaker (European or Brazilian)',
      'Fluent English (spoken and written)',
      '2+ years community management experience',
      'Deep understanding of Portuguese culture and diaspora',
      'Experience with social media platforms'
    ],
    requirementsPt: [
      'Falante nativo de português (europeu ou brasileiro)',
      'Inglês fluente (falado e escrito)',
      '2+ anos de experiência em gestão de comunidades',
      'Conhecimento profundo da cultura portuguesa e diáspora',
      'Experiência com plataformas de redes sociais'
    ],
    icon: UserGroupIcon,
    isHot: true
  },
  {
    id: 'event-coordinator',
    title: 'Portuguese Event Coordinator',
    titlePt: 'Coordenador de Eventos Portugueses',
    department: 'Events',
    departmentPt: 'Eventos',
    location: 'London, UK',
    type: 'Full-time',
    typePt: 'Tempo integral',
    salary: '£28,000 - £35,000',
    description: 'Plan and execute authentic Portuguese cultural events across London. Create memorable experiences that bring the community together.',
    descriptionPt: 'Planeie e execute eventos culturais portugueses autênticos em Londres. Crie experiências memoráveis que unam a comunidade.',
    responsibilities: [
      'Plan Portuguese cultural events (Fado nights, festivals, Santos Populares)',
      'Coordinate with London venues and Portuguese venues',
      'Manage event logistics, registration, and attendance',
      'Work with Portuguese artists, musicians, and performers',
      'Ensure events reflect authentic Portuguese culture'
    ],
    responsibilitiesPt: [
      'Planear eventos culturais portugueses (noites de Fado, festivais, Santos Populares)',
      'Coordenar com locais em Londres e espaços portugueses',
      'Gerir logística, registo e participação em eventos',
      'Trabalhar com artistas, músicos e performers portugueses',
      'Garantir que os eventos reflitam a cultura portuguesa autêntica'
    ],
    requirements: [
      'Portuguese speaker with cultural knowledge',
      'Experience in event planning or coordination',
      'Knowledge of London venues and Portuguese community',
      'Strong organizational and project management skills',
      'Ability to work evenings and weekends for events'
    ],
    requirementsPt: [
      'Falante de português com conhecimento cultural',
      'Experiência em planeamento ou coordenação de eventos',
      'Conhecimento de locais em Londres e comunidade portuguesa',
      'Fortes competências organizacionais e de gestão de projetos',
      'Disponibilidade para trabalhar noites e fins de semana para eventos'
    ],
    icon: CalendarDaysIcon,
    isHot: true
  },
  {
    id: 'content-creator',
    title: 'Bilingual Content Creator',
    titlePt: 'Criador de Conteúdo Bilingue',
    department: 'Marketing',
    departmentPt: 'Marketing',
    location: 'London, UK',
    type: 'Full-time',
    typePt: 'Tempo integral',
    salary: '£29,000 - £38,000',
    description: 'Create engaging Portuguese and English content for our community. Tell authentic stories of Portuguese life in London.',
    descriptionPt: 'Crie conteúdo envolvente em português e inglês para a nossa comunidade. Conte histórias autênticas da vida portuguesa em Londres.',
    responsibilities: [
      'Create bilingual content for social media and website',
      'Produce videos, photos, and written content about Portuguese culture',
      'Interview community members and tell their stories',
      'Manage content calendar across Portuguese and English',
      'Collaborate with community members for user-generated content'
    ],
    responsibilitiesPt: [
      'Criar conteúdo bilingue para redes sociais e website',
      'Produzir vídeos, fotos e conteúdo escrito sobre cultura portuguesa',
      'Entrevistar membros da comunidade e contar as suas histórias',
      'Gerir calendário de conteúdo em português e inglês',
      'Colaborar com membros da comunidade para conteúdo gerado por utilizadores'
    ],
    requirements: [
      'Bilingual Portuguese-English content creation experience',
      'Photography and video editing skills',
      'Understanding of Portuguese culture and London Portuguese community',
      'Experience with social media platforms and content scheduling',
      'Creative storytelling abilities'
    ],
    requirementsPt: [
      'Experiência em criação de conteúdo bilingue português-inglês',
      'Competências em fotografia e edição de vídeo',
      'Compreensão da cultura portuguesa e comunidade portuguesa de Londres',
      'Experiência com plataformas de redes sociais e agendamento de conteúdo',
      'Capacidades criativas de storytelling'
    ],
    icon: CameraIcon
  },
  {
    id: 'social-media-manager',
    title: 'Portuguese Social Media Manager',
    titlePt: 'Gestor de Redes Sociais Portuguesas',
    department: 'Marketing',
    departmentPt: 'Marketing',
    location: 'London, UK',
    type: 'Full-time',
    typePt: 'Tempo integral',
    salary: '£32,000 - £42,000',
    description: 'Drive Portuguese community growth through strategic social media management across platforms.',
    descriptionPt: 'Impulsione o crescimento da comunidade portuguesa através da gestão estratégica de redes sociais.',
    responsibilities: [
      'Manage Portuguese-focused social media strategy',
      'Grow follower base within Portuguese diaspora in UK',
      'Create and schedule Portuguese and English content',
      'Engage with Portuguese community online',
      'Analyze social media metrics and optimize strategy'
    ],
    responsibilitiesPt: [
      'Gerir estratégia de redes sociais focada em portugueses',
      'Aumentar base de seguidores na diáspora portuguesa no Reino Unido',
      'Criar e agendar conteúdo em português e inglês',
      'Envolver-se com a comunidade portuguesa online',
      'Analisar métricas de redes sociais e otimizar estratégia'
    ],
    requirements: [
      'Bilingual Portuguese-English social media expertise',
      'Experience with Instagram, Facebook, TikTok, LinkedIn',
      'Knowledge of Portuguese social media trends and culture',
      'Analytics and data-driven decision making',
      '2+ years social media management experience'
    ],
    requirementsPt: [
      'Especialização em redes sociais bilingue português-inglês',
      'Experiência com Instagram, Facebook, TikTok, LinkedIn',
      'Conhecimento de tendências e cultura portuguesa em redes sociais',
      'Tomada de decisões baseada em análises e dados',
      '2+ anos de experiência em gestão de redes sociais'
    ],
    icon: MegaphoneIcon
  },
  {
    id: 'translator-interpreter',
    title: 'Portuguese Translator & Interpreter',
    titlePt: 'Tradutor e Intérprete Português',
    department: 'Content',
    departmentPt: 'Conteúdo',
    location: 'London, UK',
    type: 'Freelance/Part-time',
    typePt: 'Freelance/Meio período',
    salary: '£35 - £45 per hour',
    description: 'Provide high-quality translation and interpretation services for Portuguese community events and content.',
    descriptionPt: 'Forneça serviços de tradução e interpretação de alta qualidade para eventos e conteúdo da comunidade portuguesa.',
    responsibilities: [
      'Translate website content between Portuguese and English',
      'Interpret at Portuguese community events',
      'Ensure cultural accuracy in all translations',
      'Work with legal and business documents',
      'Support Portuguese speakers with UK services navigation'
    ],
    responsibilitiesPt: [
      'Traduzir conteúdo do website entre português e inglês',
      'Interpretar em eventos da comunidade portuguesa',
      'Garantir precisão cultural em todas as traduções',
      'Trabalhar com documentos legais e empresariais',
      'Apoiar lusófonos na navegação de serviços do Reino Unido'
    ],
    requirements: [
      'Professional translation/interpretation certification',
      'Native Portuguese with excellent English',
      'Experience with cultural and legal translation',
      'Understanding of UK Portuguese diaspora context',
      'Ability to work flexible hours for events'
    ],
    requirementsPt: [
      'Certificação profissional de tradução/interpretação',
      'Português nativo com excelente inglês',
      'Experiência com tradução cultural e legal',
      'Compreensão do contexto da diáspora portuguesa no Reino Unido',
      'Capacidade de trabalhar horários flexíveis para eventos'
    ],
    icon: LanguageIcon
  },
  {
    id: 'business-liaison',
    title: 'Portuguese Business Development Liaison',
    titlePt: 'Ligação de Desenvolvimento de Negócios Portugueses',
    department: 'Business',
    departmentPt: 'Negócios',
    location: 'London, UK',
    type: 'Full-time',
    typePt: 'Tempo integral',
    salary: '£40,000 - £55,000',
    description: 'Build relationships with Portuguese businesses across London and facilitate partnerships within our platform.',
    descriptionPt: 'Construa relacionamentos com empresas portuguesas em Londres e facilite parcerias dentro da nossa plataforma.',
    responsibilities: [
      'Identify and onboard Portuguese-owned businesses in London',
      'Develop business directory and partnership programs',
      'Support Portuguese entrepreneurs and business owners',
      'Organize business networking events',
      'Create business-to-business opportunities within community'
    ],
    responsibilitiesPt: [
      'Identificar e integrar negócios portugueses em Londres',
      'Desenvolver diretório de negócios e programas de parceria',
      'Apoiar empreendedores e proprietários de negócios portugueses',
      'Organizar eventos de networking empresarial',
      'Criar oportunidades business-to-business dentro da comunidade'
    ],
    requirements: [
      'Portuguese speaker with business development experience',
      'Understanding of London business landscape',
      'Experience in partnership development or sales',
      'Network within Portuguese business community',
      'Strong negotiation and relationship building skills'
    ],
    requirementsPt: [
      'Falante de português com experiência em desenvolvimento de negócios',
      'Compreensão do panorama empresarial de Londres',
      'Experiência em desenvolvimento de parcerias ou vendas',
      'Rede dentro da comunidade empresarial portuguesa',
      'Fortes competências de negociação e construção de relacionamentos'
    ],
    icon: BuildingStorefrontIcon
  },
  {
    id: 'cultural-ambassador',
    title: 'Portuguese Cultural Ambassador',
    titlePt: 'Embaixador Cultural Português',
    department: 'Community',
    departmentPt: 'Comunidade',
    location: 'London, UK',
    type: 'Part-time',
    typePt: 'Meio período',
    salary: '£20,000 - £28,000',
    description: 'Preserve and promote Portuguese heritage within the London community through educational and cultural initiatives.',
    descriptionPt: 'Preserve e promova o património português dentro da comunidade de Londres através de iniciativas educacionais e culturais.',
    responsibilities: [
      'Develop Portuguese heritage and cultural education programs',
      'Create content about Portuguese history and traditions',
      'Coordinate with Portuguese cultural organizations',
      'Organize heritage tours and cultural workshops',
      'Work with schools and educational institutions'
    ],
    responsibilitiesPt: [
      'Desenvolver programas de educação sobre património e cultura portuguesa',
      'Criar conteúdo sobre história e tradições portuguesas',
      'Coordenar com organizações culturais portuguesas',
      'Organizar tours patrimoniais e workshops culturais',
      'Trabalhar com escolas e instituições educacionais'
    ],
    requirements: [
      'Deep knowledge of Portuguese history and culture',
      'Experience in education or cultural programming',
      'Excellent communication and presentation skills',
      'Passion for heritage preservation',
      'Ability to engage diverse age groups'
    ],
    requirementsPt: [
      'Conhecimento profundo da história e cultura portuguesa',
      'Experiência em educação ou programação cultural',
      'Excelentes competências de comunicação e apresentação',
      'Paixão pela preservação do património',
      'Capacidade de envolver diversas faixas etárias'
    ],
    icon: HeartIcon
  },
  {
    id: 'safety-moderator',
    title: 'Portuguese Community Safety Moderator',
    titlePt: 'Moderador de Segurança da Comunidade Portuguesa',
    department: 'Safety',
    departmentPt: 'Segurança',
    location: 'Remote/London',
    type: 'Part-time',
    typePt: 'Meio período',
    salary: '£25,000 - £32,000',
    description: 'Ensure community safety through culturally-sensitive moderation of Portuguese community interactions.',
    descriptionPt: 'Garanta a segurança da comunidade através da moderação culturalmente sensível das interações da comunidade portuguesa.',
    responsibilities: [
      'Moderate Portuguese and English community discussions',
      'Handle community reports and safety concerns',
      'Implement community guidelines with cultural sensitivity',
      'Support members experiencing difficulties',
      'Work with law enforcement when necessary'
    ],
    responsibilitiesPt: [
      'Moderar discussões comunitárias em português e inglês',
      'Lidar com relatórios da comunidade e preocupações de segurança',
      'Implementar diretrizes comunitárias com sensibilidade cultural',
      'Apoiar membros que enfrentam dificuldades',
      'Trabalhar com autoridades quando necessário'
    ],
    requirements: [
      'Bilingual Portuguese-English communication',
      'Experience in community moderation or customer service',
      'Understanding of cultural nuances and sensitivities',
      'Conflict resolution and de-escalation skills',
      'Ability to work flexible hours including evenings'
    ],
    requirementsPt: [
      'Comunicação bilingue português-inglês',
      'Experiência em moderação comunitária ou atendimento ao cliente',
      'Compreensão de nuances e sensibilidades culturais',
      'Competências de resolução de conflitos e desescalamento',
      'Capacidade de trabalhar horários flexíveis incluindo noites'
    ],
    icon: ShieldCheckIcon
  },
  {
    id: 'customer-support',
    title: 'Bilingual Customer Support Specialist',
    titlePt: 'Especialista em Suporte ao Cliente Bilingue',
    department: 'Support',
    departmentPt: 'Suporte',
    location: 'London, UK',
    type: 'Full-time',
    typePt: 'Tempo integral',
    salary: '£26,000 - £33,000',
    description: 'Provide exceptional customer support to Portuguese-speaking community members in their preferred language.',
    descriptionPt: 'Forneça suporte ao cliente excecional aos membros da comunidade lusófona na sua língua preferida.',
    responsibilities: [
      'Handle customer inquiries in Portuguese and English',
      'Support users with platform navigation and features',
      'Resolve billing and membership issues',
      'Provide cultural context and guidance to users',
      'Document common issues and suggest improvements'
    ],
    responsibilitiesPt: [
      'Lidar com consultas de clientes em português e inglês',
      'Apoiar utilizadores com navegação e funcionalidades da plataforma',
      'Resolver problemas de faturação e adesão',
      'Fornecer contexto cultural e orientação aos utilizadores',
      'Documentar problemas comuns e sugerir melhorias'
    ],
    requirements: [
      'Fluent Portuguese and English communication',
      'Customer service experience preferred',
      'Patience and empathy when helping users',
      'Technical aptitude for troubleshooting',
      'Familiarity with SaaS platforms and subscription models'
    ],
    requirementsPt: [
      'Comunicação fluente em português e inglês',
      'Experiência em atendimento ao cliente preferida',
      'Paciência e empatia ao ajudar utilizadores',
      'Aptidão técnica para resolução de problemas',
      'Familiaridade com plataformas SaaS e modelos de subscrição'
    ],
    icon: ChatBubbleLeftRightIcon
  },
  {
    id: 'partnership-manager',
    title: 'Portuguese Institutional Partnership Manager',
    titlePt: 'Gestor de Parcerias Institucionais Portuguesas',
    department: 'Partnerships',
    departmentPt: 'Parcerias',
    location: 'London, UK',
    type: 'Full-time',
    typePt: 'Tempo integral',
    salary: '£45,000 - £60,000',
    description: 'Build strategic partnerships with Portuguese institutions, embassies, and cultural organizations.',
    descriptionPt: 'Construa parcerias estratégicas com instituições portuguesas, embaixadas e organizações culturais.',
    responsibilities: [
      'Develop partnerships with Portuguese Embassy and Consulates',
      'Work with Camões Institute and Portuguese cultural centers',
      'Coordinate with Portuguese universities and schools',
      'Establish relationships with Portuguese government organizations',
      'Manage institutional partnership agreements and programs'
    ],
    responsibilitiesPt: [
      'Desenvolver parcerias com Embaixada e Consulados Portugueses',
      'Trabalhar com Instituto Camões e centros culturais portugueses',
      'Coordenar com universidades e escolas portuguesas',
      'Estabelecer relacionamentos com organizações governamentais portuguesas',
      'Gerir acordos e programas de parceria institucional'
    ],
    requirements: [
      'Senior level experience in partnership development',
      'Understanding of Portuguese institutional landscape',
      'Experience working with government and cultural organizations',
      'Strong diplomatic and negotiation skills',
      'Established network within Portuguese institutions'
    ],
    requirementsPt: [
      'Experiência sénior em desenvolvimento de parcerias',
      'Compreensão do panorama institucional português',
      'Experiência a trabalhar com organizações governamentais e culturais',
      'Fortes competências diplomáticas e de negociação',
      'Rede estabelecida dentro de instituições portuguesas'
    ],
    icon: BriefcaseIcon,
    isHot: true
  }
]

export default function CareersPage() {
  const { t, language } = useLanguage()

  const isPortuguese = language === 'pt'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-secondary-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-width section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {isPortuguese ? 'Junte-se à Nossa Equipa' : 'Join Our Team'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {isPortuguese 
                ? 'Ajude a construir a maior comunidade portuguesa em Londres'
                : 'Help build London\'s largest Portuguese community'
              }
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-6 h-6" />
                <span>{isPortuguese ? 'Londres, Reino Unido' : 'London, UK'}</span>
              </div>
              <div className="flex items-center gap-2">
                <UserGroupIcon className="w-6 h-6" />
                <span>{isPortuguese ? '10 Posições Abertas' : '10 Open Positions'}</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartIcon className="w-6 h-6" />
                <span>{isPortuguese ? 'Cultura Portuguesa' : 'Portuguese Culture'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Work With Us */}
      <div className="section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {isPortuguese ? 'Porquê Trabalhar Connosco?' : 'Why Work With Us?'}
            </h2>
            <p className="text-xl text-gray-600">
              {isPortuguese 
                ? 'Somos uma startup em crescimento dedicada a unir a comunidade portuguesa em Londres através de experiências autênticas.'
                : 'We\'re a growing startup dedicated to uniting the Portuguese community in London through authentic experiences.'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {isPortuguese ? 'Missão Significativa' : 'Meaningful Mission'}
              </h3>
              <p className="text-gray-600">
                {isPortuguese 
                  ? 'Trabalhe numa missão que importa - conectar portugueses e preservar a nossa cultura em Londres.'
                  : 'Work on a mission that matters - connecting Portuguese people and preserving our culture in London.'
                }
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-action-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BriefcaseIcon className="w-8 h-8 text-action-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {isPortuguese ? 'Crescimento Profissional' : 'Professional Growth'}
              </h3>
              <p className="text-gray-600">
                {isPortuguese 
                  ? 'Oportunidades de desenvolvimento em uma startup dinâmica com foco na comunidade portuguesa.'
                  : 'Development opportunities in a dynamic startup focused on the Portuguese community.'
                }
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {isPortuguese ? 'Equipa Diversa' : 'Diverse Team'}
              </h3>
              <p className="text-gray-600">
                {isPortuguese 
                  ? 'Trabalhe com uma equipa multicultural que valoriza a diversidade e a inclusão.'
                  : 'Work with a multicultural team that values diversity and inclusion.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="section-padding bg-gray-50">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Posições Abertas' : 'Open Positions'}
            </h2>
            <p className="text-lg text-gray-600">
              {isPortuguese 
                ? 'Encontre a posição perfeita para ajudar a nossa comunidade portuguesa a crescer'
                : 'Find the perfect position to help our Portuguese community grow'
              }
            </p>
          </div>

          <div className="grid gap-8">
            {jobRoles.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Left Column - Job Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-xl flex items-center justify-center">
                        <job.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {isPortuguese ? job.titlePt : job.title}
                          </h3>
                          {job.isHot && (
                            <span className="bg-action-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              {isPortuguese ? '🔥 Popular' : '🔥 Hot'}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <BriefcaseIcon className="w-4 h-4" />
                            {isPortuguese ? job.departmentPt : job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPinIcon className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <ClockIcon className="w-4 h-4" />
                            {isPortuguese ? job.typePt : job.type}
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-secondary-600">
                            <CurrencyPoundIcon className="w-4 h-4" />
                            {job.salary}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4">
                          {isPortuguese ? job.descriptionPt : job.description}
                        </p>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {isPortuguese ? 'Responsabilidades:' : 'Responsibilities:'}
                      </h4>
                      <ul className="space-y-1">
                        {(isPortuguese ? job.responsibilitiesPt : job.responsibilities).map((responsibility, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-600">
                            <CheckCircleIcon className="w-4 h-4 text-secondary-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Requirements */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {isPortuguese ? 'Requisitos:' : 'Requirements:'}
                      </h4>
                      <ul className="space-y-1">
                        {(isPortuguese ? job.requirementsPt : job.requirements).map((requirement, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-600">
                            <CheckCircleIcon className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column - Apply Button */}
                  <div className="flex-shrink-0 lg:w-48">
                    <button className="btn-primary w-full text-center">
                      {isPortuguese ? 'Candidatar-se' : 'Apply Now'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="section-padding bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {isPortuguese ? 'Pronto para Se Juntar?' : 'Ready to Join?'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {isPortuguese 
                ? 'Não encontra a posição perfeita? Envie-nos o seu CV e entraremos em contacto quando algo adequado aparecer.'
                : 'Can\'t find the perfect position? Send us your CV and we\'ll get in touch when something suitable comes up.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-secondary">
                {isPortuguese ? 'Enviar CV' : 'Send CV'}
              </button>
              <button className="btn-outline text-white border-white hover:bg-white hover:text-secondary-600">
                {isPortuguese ? 'Saber Mais' : 'Learn More'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}