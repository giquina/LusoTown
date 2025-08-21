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
  ClockIcon,
  CheckCircleIcon,
  CogIcon,
  ChartBarIcon,
  UsersIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline'
import Footer from '@/components/Footer'

interface JobRole {
  id: string
  title: string
  titlePt: string
  department: string
  departmentPt: string
  location: string
  type: string
  typePt: string
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
    description: 'Preserve and promote Portuguese culture within the London community through educational and cultural initiatives.',
    descriptionPt: 'Preserve e promova a cultura portuguesa dentro da comunidade de Londres através de iniciativas educacionais e culturais.',
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
  },
  {
    id: 'community-social-media-manager',
    title: 'Portuguese Community Social Media Manager',
    titlePt: 'Gestor de Redes Sociais da Comunidade Portuguesa',
    department: 'Marketing',
    departmentPt: 'Marketing',
    location: 'London, UK',
    type: 'Full-time',
    typePt: 'Tempo integral',
    description: 'Drive bilingual social media management specifically for Portuguese diaspora engagement across all platforms.',
    descriptionPt: 'Conduza a gestão de redes sociais bilingue especificamente para o envolvimento da diáspora portuguesa em todas as plataformas.',
    responsibilities: [
      'Develop Portuguese-focused social media strategy across Instagram, Facebook, TikTok, LinkedIn',
      'Create culturally authentic content for Portuguese diaspora in London',
      'Manage bilingual community engagement and respond to comments/messages',
      'Analyze social media metrics and optimize for Portuguese community growth',
      'Collaborate with Portuguese influencers and community leaders'
    ],
    responsibilitiesPt: [
      'Desenvolver estratégia de redes sociais focada em portugueses no Instagram, Facebook, TikTok, LinkedIn',
      'Criar conteúdo culturalmente autêntico para a diáspora portuguesa em Londres',
      'Gerir envolvimento comunitário bilingue e responder a comentários/mensagens',
      'Analisar métricas de redes sociais e otimizar para crescimento da comunidade portuguesa',
      'Colaborar com influenciadores portugueses e líderes comunitários'
    ],
    requirements: [
      'Native Portuguese speaker with excellent English proficiency',
      '3+ years social media management experience',
      'Deep understanding of Portuguese culture and London diaspora',
      'Experience with social media analytics and growth strategies',
      'Creative content creation skills and cultural sensitivity'
    ],
    requirementsPt: [
      'Falante nativo de português com excelente proficiência em inglês',
      '3+ anos de experiência em gestão de redes sociais',
      'Compreensão profunda da cultura portuguesa e diáspora de Londres',
      'Experiência com análises de redes sociais e estratégias de crescimento',
      'Competências criativas de criação de conteúdo e sensibilidade cultural'
    ],
    icon: MegaphoneIcon,
    isHot: true
  },
  {
    id: 'api-technical-specialist',
    title: 'API Integration & Platform Technical Specialist',
    titlePt: 'Especialista Técnico em Integração de APIs e Plataforma',
    department: 'Technology',
    departmentPt: 'Tecnologia',
    location: 'London, UK',
    type: 'Full-time',
    typePt: 'Tempo integral',
    description: 'Manage technical partnerships with London venues and Portuguese businesses through API integrations and platform development.',
    descriptionPt: 'Gerir parcerias técnicas com locais de Londres e empresas portuguesas através de integrações de API e desenvolvimento de plataforma.',
    responsibilities: [
      'Develop and maintain API integrations with London venues and booking systems',
      'Create technical partnerships with Portuguese restaurants and cultural venues',
      'Build efficient systems for event booking and venue management',
      'Ensure platform scalability for Portuguese community growth',
      'Provide technical support for business directory integrations'
    ],
    responsibilitiesPt: [
      'Desenvolver e manter integrações de API com locais de Londres e sistemas de reserva',
      'Criar parcerias técnicas com restaurantes portugueses e locais culturais',
      'Construir sistemas automatizados para reserva de eventos e gestão de locais',
      'Garantir escalabilidade da plataforma para o crescimento da comunidade portuguesa',
      'Fornecer suporte técnico para integrações do diretório de negócios'
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      'Experience with API development and third-party integrations',
      'Knowledge of booking systems and venue management platforms',
      'Understanding of Portuguese business landscape in London',
      'Strong problem-solving and communication skills'
    ],
    requirementsPt: [
      'Licenciatura em Ciências da Computação ou área relacionada',
      'Experiência com desenvolvimento de APIs e integrações de terceiros',
      'Conhecimento de sistemas de reserva e plataformas de gestão de locais',
      'Compreensão do panorama empresarial português em Londres',
      'Fortes competências de resolução de problemas e comunicação'
    ],
    icon: ComputerDesktopIcon
  },
  {
    id: 'business-development-partnerships',
    title: 'Portuguese Business Development & Partnerships Manager',
    titlePt: 'Gestor de Desenvolvimento de Negócios e Parcerias Portuguesas',
    department: 'Business Development',
    departmentPt: 'Desenvolvimento de Negócios',
    location: 'London, UK',
    type: 'Full-time',
    typePt: 'Tempo integral',
    description: 'Build strategic partnerships with Portuguese restaurants, cultural centers, and institutions to expand our platform ecosystem.',
    descriptionPt: 'Construir parcerias estratégicas com restaurantes portugueses, centros culturais e instituições para expandir o nosso ecossistema de plataforma.',
    responsibilities: [
      'Identify and secure partnerships with Portuguese restaurants and cafés in London',
      'Develop relationships with Portuguese cultural centers and institutions',
      'Negotiate partnership agreements and revenue-sharing models',
      'Create business development strategies for Portuguese market expansion',
      'Manage ongoing relationships with Portuguese business partners'
    ],
    responsibilitiesPt: [
      'Identificar e garantir parcerias com restaurantes e cafés portugueses em Londres',
      'Desenvolver relacionamentos com centros culturais e instituições portuguesas',
      'Negociar acordos de parceria e modelos de partilha de receitas',
      'Criar estratégias de desenvolvimento de negócios para expansão do mercado português',
      'Gerir relacionamentos contínuos com parceiros comerciais portugueses'
    ],
    requirements: [
      'Business development or partnerships experience (3+ years)',
      'Portuguese speaker with understanding of Portuguese business culture',
      'Experience in restaurant/hospitality industry partnerships',
      'Strong negotiation and relationship-building skills',
      'Knowledge of London Portuguese business community'
    ],
    requirementsPt: [
      'Experiência em desenvolvimento de negócios ou parcerias (3+ anos)',
      'Falante de português com compreensão da cultura empresarial portuguesa',
      'Experiência em parcerias da indústria de restauração/hospitalidade',
      'Fortes competências de negociação e construção de relacionamentos',
      'Conhecimento da comunidade empresarial portuguesa de Londres'
    ],
    icon: BuildingStorefrontIcon,
    isHot: true
  },
  {
    id: 'platform-administrator-ux',
    title: 'Community Platform Administrator & User Experience Manager',
    titlePt: 'Administrador da Plataforma Comunitária e Gestor de Experiência do Utilizador',
    department: 'Operations',
    departmentPt: 'Operações',
    location: 'London, UK',
    type: 'Full-time',
    typePt: 'Tempo integral',
    description: 'Oversee daily platform operations and ensure exceptional user experience for Portuguese cultural community guidelines.',
    descriptionPt: 'Supervisionar as operações diárias da plataforma e garantir uma experiência excecional do utilizador para as diretrizes da comunidade cultural portuguesa.',
    responsibilities: [
      'Manage daily platform operations and user experience optimization',
      'Implement and enforce Portuguese cultural community guidelines',
      'Monitor platform performance and user engagement metrics',
      'Coordinate with technical team for platform improvements',
      'Handle escalated user issues and community disputes'
    ],
    responsibilitiesPt: [
      'Gerir operações diárias da plataforma e otimização da experiência do utilizador',
      'Implementar e aplicar diretrizes da comunidade cultural portuguesa',
      'Monitorizar desempenho da plataforma e métricas de envolvimento do utilizador',
      'Coordenar com equipa técnica para melhorias da plataforma',
      'Lidar com questões escaladas de utilizadores e disputas comunitárias'
    ],
    requirements: [
      'Experience in platform administration or community management',
      'Understanding of Portuguese cultural values and community dynamics',
      'Strong analytical and problem-solving skills',
      'Experience with user experience optimization',
      'Bilingual Portuguese-English communication skills'
    ],
    requirementsPt: [
      'Experiência em administração de plataforma ou gestão de comunidade',
      'Compreensão de valores culturais portugueses e dinâmicas comunitárias',
      'Fortes competências analíticas e de resolução de problemas',
      'Experiência com otimização da experiência do utilizador',
      'Competências de comunicação bilingue português-inglês'
    ],
    icon: CogIcon
  },
  {
    id: 'data-analytics-growth',
    title: 'Portuguese Community Data Analytics & Growth Specialist',
    titlePt: 'Especialista em Análise de Dados e Crescimento da Comunidade Portuguesa',
    department: 'Analytics',
    departmentPt: 'Análises',
    location: 'London, UK',
    type: 'Full-time',
    typePt: 'Tempo integral',
    description: 'Analyze Portuguese community behavior and optimize growth strategies through data-driven insights and cultural understanding.',
    descriptionPt: 'Analisar o comportamento da comunidade portuguesa e otimizar estratégias de crescimento através de insights baseados em dados e compreensão cultural.',
    responsibilities: [
      'Analyze Portuguese community engagement patterns and user behavior',
      'Develop growth strategies specific to Portuguese diaspora in London',
      'Create data-driven insights for community feature development',
      'Monitor KPIs and measure success of Portuguese community initiatives',
      'Provide analytics support for marketing and business development teams'
    ],
    responsibilitiesPt: [
      'Analisar padrões de envolvimento da comunidade portuguesa e comportamento do utilizador',
      'Desenvolver estratégias de crescimento específicas para a diáspora portuguesa em Londres',
      'Criar insights baseados em dados para desenvolvimento de funcionalidades da comunidade',
      'Monitorizar KPIs e medir sucesso de iniciativas da comunidade portuguesa',
      'Fornecer suporte de análises para equipas de marketing e desenvolvimento de negócios'
    ],
    requirements: [
      'Bachelor\'s degree in Data Science, Statistics, or related field',
      'Experience with data analytics tools and platforms',
      'Understanding of Portuguese community demographics and behavior',
      'Strong analytical and statistical skills',
      'Experience with growth marketing and community analytics'
    ],
    requirementsPt: [
      'Licenciatura em Ciência de Dados, Estatísticas ou área relacionada',
      'Experiência com ferramentas e plataformas de análise de dados',
      'Compreensão de demografia e comportamento da comunidade portuguesa',
      'Fortes competências analíticas e estatísticas',
      'Experiência com marketing de crescimento e análises comunitárias'
    ],
    icon: ChartBarIcon,
    isHot: true
  },
  {
    id: 'multilingual-customer-support',
    title: 'Multilingual Customer Support Manager',
    titlePt: 'Gestor de Suporte ao Cliente Multilingue',
    department: 'Customer Support',
    departmentPt: 'Suporte ao Cliente',
    location: 'London, UK',
    type: 'Full-time',
    typePt: 'Tempo integral',
    description: 'Lead bilingual customer service team with deep Portuguese cultural understanding and exceptional service delivery.',
    descriptionPt: 'Liderar equipa de atendimento ao cliente bilingue com profunda compreensão cultural portuguesa e entrega de serviço excecional.',
    responsibilities: [
      'Manage multilingual customer support team for Portuguese community',
      'Develop customer service protocols with Portuguese cultural sensitivity',
      'Handle complex customer issues requiring cultural understanding',
      'Train support staff in Portuguese culture and language nuances',
      'Maintain high customer satisfaction rates for Portuguese speakers'
    ],
    responsibilitiesPt: [
      'Gerir equipa de suporte ao cliente multilingue para a comunidade portuguesa',
      'Desenvolver protocolos de atendimento ao cliente com sensibilidade cultural portuguesa',
      'Lidar com questões complexas de clientes que requerem compreensão cultural',
      'Treinar staff de suporte em cultura portuguesa e nuances linguísticas',
      'Manter altas taxas de satisfação do cliente para falantes de português'
    ],
    requirements: [
      'Customer service management experience (3+ years)',
      'Native Portuguese speaker with excellent English',
      'Deep understanding of Portuguese cultural values and communication styles',
      'Experience with customer service software and protocols',
      'Leadership and team management skills'
    ],
    requirementsPt: [
      'Experiência em gestão de atendimento ao cliente (3+ anos)',
      'Falante nativo de português com excelente inglês',
      'Compreensão profunda de valores culturais portugueses e estilos de comunicação',
      'Experiência com software e protocolos de atendimento ao cliente',
      'Competências de liderança e gestão de equipas'
    ],
    icon: ChatBubbleLeftRightIcon
  },
  {
    id: 'community-growth-marketing',
    title: 'Portuguese Community Growth & Acquisition Marketing Manager',
    titlePt: 'Gestor de Marketing de Crescimento e Aquisição da Comunidade Portuguesa',
    department: 'Marketing',
    departmentPt: 'Marketing',
    location: 'London, UK',
    type: 'Full-time',
    typePt: 'Tempo integral',
    description: 'Execute targeted marketing campaigns to Portuguese speakers across London, driving community growth through cultural authenticity.',
    descriptionPt: 'Executar campanhas de marketing direcionadas a falantes de português em Londres, impulsionando o crescimento da comunidade através da autenticidade cultural.',
    responsibilities: [
      'Develop and execute marketing campaigns targeting Portuguese speakers in London',
      'Create user acquisition strategies for Portuguese diaspora community',
      'Manage digital advertising across Portuguese-focused channels',
      'Partner with Portuguese organizations and influencers for marketing',
      'Analyze campaign performance and optimize for Portuguese community growth'
    ],
    responsibilitiesPt: [
      'Desenvolver e executar campanhas de marketing direcionadas a falantes de português em Londres',
      'Criar estratégias de aquisição de utilizadores para a comunidade da diáspora portuguesa',
      'Gerir publicidade digital através de canais focados em portugueses',
      'Fazer parcerias com organizações portuguesas e influenciadores para marketing',
      'Analisar desempenho de campanhas e otimizar para crescimento da comunidade portuguesa'
    ],
    requirements: [
      'Digital marketing experience with focus on community growth',
      'Portuguese speaker with understanding of diaspora marketing',
      'Experience with Google Ads, Facebook Ads, and social media marketing',
      'Knowledge of Portuguese cultural channels and media consumption',
      'Data-driven approach to marketing optimization'
    ],
    requirementsPt: [
      'Experiência em marketing digital com foco no crescimento comunitário',
      'Falante de português com compreensão de marketing da diáspora',
      'Experiência com Google Ads, Facebook Ads e marketing de redes sociais',
      'Conhecimento de canais culturais portugueses e consumo de média',
      'Abordagem baseada em dados para otimização de marketing'
    ],
    icon: UsersIcon,
    isHot: true
  },
  {
    id: 'event-operations-cultural',
    title: 'Event Operations & Portuguese Cultural Programming Manager',
    titlePt: 'Gestor de Operações de Eventos e Programação Cultural Portuguesa',
    department: 'Events',
    departmentPt: 'Eventos',
    location: 'London, UK',
    type: 'Full-time',
    typePt: 'Tempo integral',
    description: 'Coordinate authentic Portuguese cultural events and festival programming, ensuring cultural authenticity and operational excellence.',
    descriptionPt: 'Coordenar eventos culturais portugueses autênticos e programação de festivais, garantindo autenticidade cultural e excelência operacional.',
    responsibilities: [
      'Plan and execute authentic Portuguese cultural events (Fado nights, Santos Populares, festivals)',
      'Coordinate with Portuguese artists, musicians, and cultural performers',
      'Manage event logistics, vendor relationships, and venue partnerships',
      'Ensure cultural authenticity and educational value of all programming',
      'Develop annual Portuguese cultural calendar for London community'
    ],
    responsibilitiesPt: [
      'Planear e executar eventos culturais portugueses autênticos (noites de Fado, Santos Populares, festivais)',
      'Coordenar com artistas, músicos e performers culturais portugueses',
      'Gerir logística de eventos, relacionamentos com fornecedores e parcerias de locais',
      'Garantir autenticidade cultural e valor educacional de toda a programação',
      'Desenvolver calendário cultural português anual para a comunidade de Londres'
    ],
    requirements: [
      'Event management experience with focus on cultural programming',
      'Deep knowledge of Portuguese culture, traditions, and festivals',
      'Experience working with Portuguese artists and cultural organizations',
      'Strong project management and organizational skills',
      'Bilingual Portuguese-English with cultural sensitivity'
    ],
    requirementsPt: [
      'Experiência em gestão de eventos com foco em programação cultural',
      'Conhecimento profundo da cultura, tradições e festivais portugueses',
      'Experiência a trabalhar com artistas portugueses e organizações culturais',
      'Fortes competências de gestão de projetos e organizacionais',
      'Bilingue português-inglês com sensibilidade cultural'
    ],
    icon: CalendarDaysIcon,
    isHot: true
  },
  {
    id: 'content-strategy-heritage',
    title: 'Content Strategy & Portuguese Heritage Manager',
    titlePt: 'Gestor de Estratégia de Conteúdo e Património Português',
    department: 'Content',
    departmentPt: 'Conteúdo',
    location: 'London, UK',
    type: 'Full-time',
    typePt: 'Tempo integral',
    description: 'Develop comprehensive content strategy focused on Portuguese heritage preservation and authentic cultural storytelling.',
    descriptionPt: 'Desenvolver estratégia abrangente de conteúdo focada na preservação do património português e storytelling cultural autêntico.',
    responsibilities: [
      'Develop content strategy for Portuguese heritage preservation and storytelling',
      'Create educational content about Portuguese history, culture, and traditions',
      'Manage content calendar incorporating Portuguese cultural calendar and celebrations',
      'Collaborate with Portuguese historians and cultural experts',
      'Ensure authentic representation of Portuguese culture across all content'
    ],
    responsibilitiesPt: [
      'Desenvolver estratégia de conteúdo para preservação do património português e storytelling',
      'Criar conteúdo educacional sobre história, cultura e tradições portuguesas',
      'Gerir calendário de conteúdo incorporando calendário cultural português e celebrações',
      'Colaborar com historiadores portugueses e especialistas culturais',
      'Garantir representação autêntica da cultura portuguesa em todo o conteúdo'
    ],
    requirements: [
      'Content strategy and management experience',
      'Portuguese heritage and cultural studies background',
      'Excellent writing and storytelling skills in Portuguese and English',
      'Understanding of digital content creation and distribution',
      'Network within Portuguese academic and cultural communities'
    ],
    requirementsPt: [
      'Experiência em estratégia e gestão de conteúdo',
      'Background em património português e estudos culturais',
      'Excelentes competências de escrita e storytelling em português e inglês',
      'Compreensão de criação e distribuição de conteúdo digital',
      'Rede dentro de comunidades académicas e culturais portuguesas'
    ],
    icon: DocumentTextIcon
  },
  {
    id: 'business-intelligence-research',
    title: 'Business Intelligence & Portuguese Market Research Analyst',
    titlePt: 'Analista de Business Intelligence e Pesquisa de Mercado Português',
    department: 'Research',
    departmentPt: 'Investigação',
    location: 'London, UK',
    type: 'Full-time',
    typePt: 'Tempo integral',
    description: 'Conduct comprehensive market research on Portuguese community demographics and business intelligence for strategic planning.',
    descriptionPt: 'Conduzir investigação de mercado abrangente sobre demografia da comunidade portuguesa e business intelligence para planeamento estratégico.',
    responsibilities: [
      'Research Portuguese community demographics and migration patterns in London',
      'Analyze economic impact and business opportunities within Portuguese diaspora',
      'Provide market intelligence for business development and expansion strategies',
      'Create detailed reports on Portuguese community trends and behaviors',
      'Support strategic decision-making with data-driven insights'
    ],
    responsibilitiesPt: [
      'Investigar demografia da comunidade portuguesa e padrões de migração em Londres',
      'Analisar impacto económico e oportunidades de negócio dentro da diáspora portuguesa',
      'Fornecer inteligência de mercado para estratégias de desenvolvimento e expansão de negócios',
      'Criar relatórios detalhados sobre tendências e comportamentos da comunidade portuguesa',
      'Apoiar tomada de decisões estratégicas com insights baseados em dados'
    ],
    requirements: [
      'Bachelor\'s degree in Economics, Market Research, or related field',
      'Experience in market research and business intelligence',
      'Understanding of Portuguese diaspora and migration studies',
      'Strong analytical and research skills',
      'Proficiency in data analysis tools and statistical software'
    ],
    requirementsPt: [
      'Licenciatura em Economia, Investigação de Mercado ou área relacionada',
      'Experiência em investigação de mercado e business intelligence',
      'Compreensão da diáspora portuguesa e estudos de migração',
      'Fortes competências analíticas e de investigação',
      'Proficiência em ferramentas de análise de dados e software estatístico'
    ],
    icon: AcademicCapIcon
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
                <span>{isPortuguese ? '21 Posições Abertas' : '21 Open Positions'}</span>
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
            <p className="text-xl text-secondary-600">
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
              <p className="text-secondary-600">
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
              <p className="text-secondary-600">
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
              <p className="text-secondary-600">
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
      <div className="section-padding bg-secondary-50">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Posições Abertas' : 'Open Positions'}
            </h2>
            <p className="text-lg text-secondary-600">
              {isPortuguese 
                ? 'Encontre a posição perfeita para ajudar a nossa comunidade portuguesa a crescer'
                : 'Find the perfect position to help our Portuguese community grow'
              }
            </p>
          </div>

          <div className="grid gap-8">
            {jobRoles.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-secondary-100">
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
                        <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-600 mb-3">
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
                        </div>
                        <p className="text-secondary-700 mb-4">
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
                          <li key={index} className="flex items-start gap-2 text-secondary-600">
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
                          <li key={index} className="flex items-start gap-2 text-secondary-600">
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
      <Footer />
    </div>
  )
}