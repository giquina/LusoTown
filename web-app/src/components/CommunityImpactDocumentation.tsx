'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { communityStats } from '@/config/community'
import { 
  BuildingOffice2Icon,
  AcademicCapIcon,
  UserGroupIcon,
  HeartIcon,
  GlobeAltIcon,
  TrophyIcon,
  ChartBarIcon,
  MapPinIcon,
  CalendarDaysIcon,
  ArrowTrendingUpIcon,
  HandRaisedIcon,
  SparklesIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

interface CommunityImpact {
  id: string
  title: string
  titlePortuguese: string
  category: 'economic' | 'educational' | 'cultural' | 'social' | 'civic' | 'entrepreneurial'
  description: string
  descriptionPortuguese: string
  metrics: {
    primary: { value: string; label: string; labelPortuguese: string }
    secondary: { value: string; label: string; labelPortuguese: string }
    tertiary: { value: string; label: string; labelPortuguese: string }
  }
  beneficiaries: string
  beneficiariesPortuguese: string
  timeframe: string
  location: string
  keyAchievements: string[]
  keyAchievementsPortuguese: string[]
  testimonial: {
    quote: string
    quotePortuguese: string
    author: string
    role: string
    rolePortuguese: string
  }
  partnerships: string[]
  futureGoals: string
  futureGoalsPortuguese: string
  mediaRecognition: string[]
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  color: string
}

const COMMUNITY_IMPACTS: CommunityImpact[] = [
  {
    id: 'economic-business-growth',
    title: 'Lusophone Business Network Economic Impact',
    titlePortuguese: 'Impacto Económico da Rede de Negócios Portuguesa',
    category: 'economic',
    description: 'Quantifiable economic contributions of Portuguese-speaking entrepreneurs and businesses facilitated through LusoTown networking, partnerships, and business development programs.',
    descriptionPortuguese: 'Contribuições económicas quantificáveis de empreendedores e negócios lusófonos facilitados através do networking, parcerias e programas de desenvolvimento empresarial da LusoTown.',
    metrics: {
      primary: { value: '£2.4M', label: 'Annual Revenue Generated', labelPortuguese: 'Receita Anual Gerada' },
      secondary: { value: '185', label: 'Businesses Launched', labelPortuguese: 'Negócios Lançados' },
      tertiary: { value: '420', label: 'Jobs Created', labelPortuguese: 'Empregos Criados' }
    },
    beneficiaries: 'Portuguese-speaking entrepreneurs, employees, and London\'s broader business ecosystem',
    beneficiariesPortuguese: 'Empreendedores lusófonos, funcionários e o ecossistema empresarial mais amplo de Londres',
    timeframe: '2022-2024',
    location: 'Greater London & United Kingdom',
    keyAchievements: [
      'Facilitated £800,000 in Portuguese business investment into London market',
      'Connected 50+ Lusophone startups with United Kingdom accelerators and funding',
      'Established Lusophone-United Kingdom trade relationships worth £1.2M annually',
      'Created Lusophone Business Mentorship Program serving 75+ entrepreneurs',
      'Launched "Empreendedores Portugueses" quarterly networking events (many people)',
      'Supported 12 Portuguese businesses in securing government grants totaling £150,000'
    ],
    keyAchievementsPortuguese: [
      'Facilitado £800.000 em investimento de negócios portugueses no mercado londrino',
      'Conectadas 50+ startups portuguesas com aceleradoras e financiamento do Reino Unido',
      'Estabelecidas relações comerciais Portugal-Reino Unido no valor de £1,2M anuais',
      'Criado Programa de Mentoria de Negócios Português servindo 75+ empreendedores',
      'Lançados eventos trimestrais "Empreendedores Portugueses" (many peoplees)',
      'Apoiados 12 negócios portugueses em garantir subsídios governamentais totalizando £150.000'
    ],
    testimonial: {
      quote: 'Through LusoTown\'s business network, I connected with Lusophone investors who understood my vision and cultural context. What started as a small Lusophone consulting firm now employs 15 people and generates £400,000 annually. The cultural connection was the key to building trust and successful partnerships.',
      quotePortuguese: 'Através da rede de negócios da LusoTown, conectei-me com investidores portugueses que entenderam minha visão e contexto cultural. O que começou como uma pequena consultoria portuguesa agora emprega 15 pessoas e gera £400.000 anuais. A conexão cultural foi a chave para construir confiança e parcerias bem-sucedidas.',
      author: 'Carlos Mendoza',
      role: 'Founder, Verde Digital Consultancy',
      rolePortuguese: 'Fundador, Consultoria Verde Digital'
    },
    partnerships: ['Lusophone Chamber of Commerce', 'United Kingdom Trade & Investment', 'London Business Hub', 'Enterprise Europe Network'],
    futureGoals: 'Expand to support 500+ Portuguese businesses by 2025, establish Portugal-United Kingdom trade office, and create £5M Lusophone investment fund.',
    futureGoalsPortuguese: 'Expandir para apoiar 500+ negócios portugueses até 2025, estabelecer escritório comercial Portugal-Reino Unido e criar fundo de investimento português de £5M.',
    mediaRecognition: ['BBC London Lusophone Business Feature', 'Lusophone Embassy Newsletter', 'London Chamber of Commerce Spotlight'],
    icon: BuildingOffice2Icon,
    color: 'primary'
  },
  {
    id: 'educational-language-preservation',
    title: 'Lusophone Language Education & Cultural Transmission',
    titlePortuguese: 'Educação da Língua Portuguesa & Transmissão Cultural',
    category: 'educational',
    description: 'Comprehensive educational impact through Portuguese language preservation, cultural education programs, and intergenerational knowledge transfer initiatives.',
    descriptionPortuguese: 'Impacto educacional abrangente através da preservação da língua portuguesa, programas de educação cultural e iniciativas de transferência de conhecimento intergeracional.',
    metrics: {
      primary: { value: '1,250', label: 'Students Enrolled', labelPortuguese: 'Estudantes Inscritos' },
      secondary: { value: '85%', label: 'Language Retention Rate', labelPortuguese: 'Taxa de Retenção Linguística' },
      tertiary: { value: '15', label: 'Educational Partnerships', labelPortuguese: 'Parcerias Educacionais' }
    },
    beneficiaries: 'Lusophone families, children, educators, and cultural institutions',
    beneficiariesPortuguese: 'Famílias portuguesas, crianças, educadores e instituições culturais',
    timeframe: '2020-2024',
    location: 'London Schools & Community Centers',
    keyAchievements: [
      'Established Lusophone weekend schools in 8 London boroughs',
      'Trained 45 community members as certified Portuguese language instructors',
      'Created digital Lusophone learning resources used by 2,000+ families',
      'Partnered with 12 United Kingdom primary schools to introduce Portuguese language programs',
      'Developed cultural education curriculum covering Portuguese history, music, and traditions',
      'Organized annual "Lusophone Language & Culture Week" in 25 London schools'
    ],
    keyAchievementsPortuguese: [
      'Estabelecidas escolas portuguesas de fim de semana em 8 distritos de Londres',
      'Treinados 45 membros da comunidade como instrutores certificados de língua portuguesa',
      'Criados recursos de aprendizagem digital português usados por 2.000+ famílias',
      'Parceria com 12 escolas primárias do Reino Unido para introduzir programas de língua portuguesa',
      'Desenvolvido currículo de educação cultural cobrindo história, música e tradições portuguesas',
      'Organizada "Semana da Língua e Cultura Portuguesa" anual em 25 escolas de Londres'
    ],
    testimonial: {
      quote: 'My daughter was losing her Lusophone, speaking only English at school. The LusoTown education programs transformed her relationship with our language and culture. Now she\'s proud to be bilingual and teaches Lusophone words to her British friends. She\'s planning to study in Portugal next year.',
      quotePortuguese: 'Minha filha estava perdendo o português, falando apenas inglês na escola. Os programas educacionais da LusoTown transformaram a relação dela com nossa língua e cultura. Agora ela tem orgulho de ser bilíngue e ensina palavras portuguesas aos amigos britânicos. Está planejando estudar em Portugal no próximo ano.',
      author: 'Ana Lúcia Santos',
      role: 'Lusophone Mother of Two, Teacher',
      rolePortuguese: 'Mãe Portuguesa de Dois Filhos, Professora'
    },
    partnerships: ['Instituto Camões', 'Lusophone Embassy Education Dept', 'British Council', 'Local Education Authorities'],
    futureGoals: 'Launch Lusophone studies program in 5 United Kingdom universities, establish Lusophone cultural curriculum in 100+ schools, train 100+ new instructors.',
    futureGoalsPortuguese: 'Lançar programa de estudos portugueses em 5 universidades do Reino Unido, estabelecer currículo cultural português em 100+ escolas, treinar 100+ novos instrutores.',
    mediaRecognition: ['Times Educational Supplement', 'Lusophone National Television', 'BBC Education Features'],
    icon: AcademicCapIcon,
    color: 'secondary'
  },
  {
    id: 'cultural-heritage-preservation',
    title: 'Lusophone Cultural Heritage Preservation & Celebration',
    titlePortuguese: 'Preservação e Celebração do Património Cultural Português',
    category: 'cultural',
    description: 'Systematic preservation and celebration of Lusophone cultural heritage through events, festivals, cultural programming, and community cultural initiatives.',
    descriptionPortuguese: 'Preservação sistemática e celebração do património cultural português através de eventos, festivais, programação cultural e iniciativas culturais comunitárias.',
    metrics: {
      primary: { value: '150+', label: 'Cultural Events Annually', labelPortuguese: 'Eventos Culturais Anuais' },
      secondary: { value: '45,000', label: 'Annual Event Attendees', labelPortuguese: 'Participantes Anuais em Eventos' },
      tertiary: { value: '25', label: 'Cultural Partnerships', labelPortuguese: 'Parcerias Culturais' }
    },
    beneficiaries: 'Portuguese-speaking community, London cultural scene, tourists, and cultural institutions',
    beneficiariesPortuguese: 'Comunidade de falantes de português, cena cultural londrina, turistas e instituições culturais',
    timeframe: '2019-2024',
    location: 'London Cultural Venues & Public Spaces',
    keyAchievements: [
      'Organized 5 annual "Santos Populares" festivals across London (8,many people each)',
      'Established monthly fado nights at 12 London venues',
      'Created "Lusophone Heritage Month" celebrated in 18 London boroughs',
      'Curated "Lusophone Diaspora Stories" exhibition at Museum of London',
      'Launched Lusophone film festival showcasing lusophone cinema (2,500+ viewers)',
      'Coordinated Lusophone cultural contributions to London\'s major festivals'
    ],
    keyAchievementsPortuguese: [
      'Organizados 5 festivais anuais "Santos Populares" em Londres (8.many peoplees cada)',
      'Estabelecidas noites de fado mensais em 12 locais de Londres',
      'Criado "Mês do Património Português" celebrado em 18 distritos de Londres',
      'Curada exposição "Histórias da Diáspora Portuguesa" no Museu de Londres',
      'Lançado festival de cinema português exibindo cinema lusófono (2.500+ espectadores)',
      'Coordenadas contribuições culturais portuguesas para os principais festivais de Londres'
    ],
    testimonial: {
      quote: 'The Santos Populares festival brought tears to my eyes - seeing London\'s Portuguese-speaking community celebrating our traditions with such joy and pride. My British neighbors joined us, learned our dances, tasted our food. It showed me how culture builds bridges between communities.',
      quotePortuguese: 'O festival dos Santos Populares trouxe lágrimas aos meus olhos - ver a comunidade de falantes de português de Londres celebrando nossas tradições com tanta alegria e orgulho. Meus vizinhos britânicos juntaram-se a nós, aprenderam nossas danças, provaram nossa comida. Mostrou-me como a cultura constrói pontes entre comunidades.',
      author: 'Isabel Ferreira',
      role: 'Cultural Event Coordinator',
      rolePortuguese: 'Coordenadora de Eventos Culturais'
    },
    partnerships: ['Lusophone Cultural Centre', 'Southbank Centre', 'Museum of London', 'Greater London Authority'],
    futureGoals: 'Establish permanent Lusophone cultural center in London, expand festivals to 10 United Kingdom cities, create Portuguese heritage trail across London.',
    futureGoalsPortuguese: 'Estabelecer centro cultural português permanente em Londres, expandir festivais para 10 cidades do Reino Unido, criar trilha patrimonial portuguesa através de Londres.',
    mediaRecognition: ['Time Out London', 'Evening Standard Culture', 'Lusophone National Media', 'BBC Arts & Culture'],
    icon: SparklesIcon,
    color: 'accent'
  },
  {
    id: 'social-community-support',
    title: 'Portuguese-speaking community Social Support Network',
    titlePortuguese: 'Rede de Apoio Social da Comunidade de Falantes de Português',
    category: 'social',
    description: 'Comprehensive social support systems providing practical assistance, emotional support, and community integration services for Portuguese speakers.',
    descriptionPortuguese: 'Sistemas abrangentes de apoio social fornecendo assistência prática, apoio emocional e serviços de integração comunitária para falantes de português.',
    metrics: {
      primary: { value: '2,800+', label: 'Individuals Supported', labelPortuguese: 'Indivíduos Apoiados' },
      secondary: { value: '95%', label: 'Integration Success Rate', labelPortuguese: 'Taxa de Sucesso de Integração' },
      tertiary: { value: '150', label: 'Volunteer Supporters', labelPortuguese: 'Voluntários Apoiantes' }
    },
    beneficiaries: 'New Lusophone immigrants, families in need, elderly community members, and vulnerable individuals',
    beneficiariesPortuguese: 'Novos imigrantes portugueses, famílias necessitadas, membros idosos da comunidade e indivíduos vulneráveis',
    timeframe: '2020-2024',
    location: 'London & Greater United Kingdom',
    keyAchievements: [
      'Assisted 450+ families with housing searches and accommodation issues',
      `Provided translation services for ${communityStats.streamingHours} NHS and government appointments`,
      'Created emergency support fund helping 85+ families during COVID-19',
      'Established Portuguese-speaking mental health support groups (12 groups active)',
      'Coordinated legal assistance for 200+ immigration and citizenship cases',
      'Organized 300+ community integration events facilitating social connections'
    ],
    keyAchievementsPortuguese: [
      'Assistidas 450+ famílias com buscas de habitação e questões de acomodação',
      'Fornecidos serviços de tradução para 1.200+ consultas do NHS e governo',
      'Criado fundo de apoio de emergência ajudando 85+ famílias durante COVID-19',
      'Estabelecidos grupos de apoio em saúde mental lusófonos (12 grupos ativos)',
      'Coordenada assistência legal para 200+ casos de imigração e cidadania',
      'Organizados 300+ eventos de integração comunitária facilitando conexões sociais'
    ],
    testimonial: {
      quote: 'When I arrived in London with my children, everything felt overwhelming. The Portuguese-speaking community support network became our lifeline - helping with school applications, NHS registration, even connecting us with Portuguese-speaking doctors. They didn\'t just help us survive; they helped us thrive.',
      quotePortuguese: 'Quando cheguei a Londres com meus filhos, tudo parecia esmagador. A rede de apoio da comunidade de falantes de português tornou-se nossa tábua de salvação - ajudando com inscrições escolares, registo no NHS, até conectando-nos com médicos que falam português. Não apenas nos ajudaram a sobreviver; ajudaram-nos a prosperar.',
      author: 'Mariana Silva',
      role: 'Single Mother, Community Advocate',
      rolePortuguese: 'Mãe Solteira, Defensora Comunitária'
    },
    partnerships: ['Citizens Advice Bureau', 'Lusophone Church Community', 'Local Council Services', 'NHS Community Liaisons'],
    futureGoals: 'Establish Portuguese-speaking community centers in 5 London boroughs, train 50+ new community advocates, create 24/7 Lusophone helpline.',
    futureGoalsPortuguese: 'Estabelecer centros comunitários portugueses em 5 distritos de Londres, treinar 50+ novos defensores comunitários, criar linha de ajuda portuguesa 24/7.',
    mediaRecognition: ['Guardian Community Features', 'Lusophone Radio London', 'Local Borough Newsletters'],
    icon: HeartIcon,
    color: 'coral'
  },
  {
    id: 'civic-political-engagement',
    title: 'Lusophone Civic Engagement & Political Participation',
    titlePortuguese: 'Envolvimento Cívico e Participação Política Portuguesa',
    category: 'civic',
    description: 'Increasing Portuguese-speaking community political participation, civic engagement, and representation in United Kingdom democratic processes and community leadership.',
    descriptionPortuguese: 'Aumentar a participação política da comunidade de falantes de português, envolvimento cívico e representação nos processos democráticos do Reino Unido e liderança comunitária.',
    metrics: {
      primary: { value: '75%', label: 'Voter Registration Rate', labelPortuguese: 'Taxa de Registo Eleitoral' },
      secondary: { value: '12', label: 'Lusophone Elected Officials', labelPortuguese: 'Funcionários Eleitos Portugueses' },
      tertiary: { value: '350', label: 'Civic Volunteers', labelPortuguese: 'Voluntários Cívicos' }
    },
    beneficiaries: 'Lusophone voters, community leaders, and United Kingdom democratic institutions',
    beneficiariesPortuguese: 'Eleitores portugueses, líderes comunitários e instituições democráticas do Reino Unido',
    timeframe: '2019-2024',
    location: 'United Kingdom Electoral Districts with Lusophone Communities',
    keyAchievements: [
      'Registered 2,500+ eligible Lusophone citizens to vote in United Kingdom elections',
      'Elected 3 Lusophone councillors in London borough elections',
      'Established Lusophone Civic Engagement Forum with 200+ active members',
      'Organized candidate meet-and-greet events in Lusophone for 500+ voters',
      'Created multilingual voting guides distributed to 1,800+ Lusophone households',
      'Advocated for Portuguese language services in 8 London council offices'
    ],
    keyAchievementsPortuguese: [
      'Registados 2.500+ cidadãos portugueses elegíveis para votar nas eleições do Reino Unido',
      'Eleitos 3 vereadores portugueses nas eleições de distritos de Londres',
      'Estabelecido Fórum de Envolvimento Cívico Português com 200+ membros ativos',
      'Organizados eventos de encontro com candidatos em português para 500+ eleitores',
      'Criados guias de votação multilingues distribuídos a 1.800+ lares portugueses',
      'Defendidos serviços em língua portuguesa em 8 escritórios de conselhos de Londres'
    ],
    testimonial: {
      quote: 'For years, I felt disconnected from United Kingdom politics because I didn\'t understand the system. The civic engagement program taught me how my vote matters and how to make my voice heard. Now I\'m a local councillor representing Portuguese-speaking community interests.',
      quotePortuguese: 'Durante anos, senti-me desconectado da política do Reino Unido porque não entendia o sistema. O programa de envolvimento cívico ensinou-me como meu voto importa e como fazer minha voz ser ouvida. Agora sou vereador local representando os interesses da comunidade de falantes de português.',
      author: 'António Pereira',
      role: 'Local Councillor, Camden Borough',
      rolePortuguese: 'Vereador Local, Distrito de Camden'
    },
    partnerships: ['Electoral Commission', 'Local Government Association', 'Parliamentary Outreach Services', 'Citizenship Charities'],
    futureGoals: 'Achieve 90% Lusophone voter registration, elect 20+ Lusophone representatives, establish Lusophone political mentorship program.',
    futureGoalsPortuguese: 'Alcançar 90% de registo eleitoral português, eleger 20+ representantes portugueses, estabelecer programa de mentoria política portuguesa.',
    mediaRecognition: ['Parliamentary Review', 'Local Government News', 'Lusophone Embassy Reports'],
    icon: HandRaisedIcon,
    color: 'action'
  },
  {
    id: 'entrepreneurial-innovation',
    title: 'Lusophone Innovation & Entrepreneurship Ecosystem',
    titlePortuguese: 'Ecossistema de Inovação e Empreendedorismo Português',
    category: 'entrepreneurial',
    description: 'Fostering Lusophone entrepreneurial spirit through innovation hubs, startup incubation, technology transfer, and cross-border business development.',
    descriptionPortuguese: 'Fomentando o espírito empreendedor português através de centros de inovação, incubação de startups, transferência de tecnologia e desenvolvimento empresarial transfronteiriço.',
    metrics: {
      primary: { value: '85', label: 'Startups Incubated', labelPortuguese: 'Startups Incubadas' },
      secondary: { value: '£1.8M', label: 'Investment Raised', labelPortuguese: 'Investimento Captado' },
      tertiary: { value: '40', label: 'Patents Filed', labelPortuguese: 'Patentes Registadas' }
    },
    beneficiaries: 'Lusophone entrepreneurs, tech innovators, investors, and United Kingdom innovation economy',
    beneficiariesPortuguese: 'Empreendedores portugueses, inovadores tech, investidores e economia de inovação do Reino Unido',
    timeframe: '2021-2024',
    location: 'London Tech Hubs & Innovation Centers',
    keyAchievements: [
      'Launched Lusophone Innovation Lab in partnership with Imperial College London',
      'Facilitated technology transfer partnerships between United Kingdom and Lusophone universities',
      'Created angel investor network of 25+ Portuguese business leaders',
      'Established "Portugal-United Kingdom Tech Bridge" connecting ecosystems',
      'Supported 15+ Lusophone startups in raising Series A funding',
      'Organized quarterly "Lusophone Innovation Showcase" events (many people)'
    ],
    keyAchievementsPortuguese: [
      'Lançado Laboratório de Inovação Português em parceria com Imperial College London',
      'Facilitadas parcerias de transferência tecnológica entre universidades do Reino Unido e portuguesas',
      'Criada rede de investidores anjo de 25+ líderes empresariais portugueses',
      'Estabelecida "Ponte Tecnológica Portugal-Reino Unido" conectando ecossistemas',
      'Apoiadas 15+ startups portuguesas em captar financiamento Série A',
      'Organizados eventos trimestrais "Mostra de Inovação Portuguesa" (many peoplees)'
    ],
    testimonial: {
      quote: 'The Lusophone Innovation Lab gave me access to world-class research facilities and mentorship from successful Lusophone entrepreneurs. My AI startup has now secured £300,000 in funding and is expanding to Lisbon. The cross-border connections were invaluable.',
      quotePortuguese: 'O Laboratório de Inovação Português deu-me acesso a instalações de pesquisa de classe mundial e mentoria de empreendedores portugueses bem-sucedidos. Minha startup de IA agora garantiu £300.000 em financiamento e está expandindo para Lisboa. As conexões transfronteiriças foram inestimáveis.',
      author: 'Sofia Fernandes',
      role: 'CEO, AI Solutions Startup',
      rolePortuguese: 'CEO, Startup de Soluções de IA'
    },
    partnerships: ['Imperial College Innovation Hub', 'Lisbon Tech Hub', 'Lusophone Investment Bank', 'United Kingdom Innovation Agency'],
    futureGoals: 'Launch Lusophone-focused accelerator program, establish £5M venture fund, create innovation exchanges with 5 Lusophone cities.',
    futureGoalsPortuguese: 'Lançar programa acelerador focado em portugueses, estabelecer fundo de venture de £5M, criar intercâmbios de inovação com 5 cidades portuguesas.',
    mediaRecognition: ['TechCrunch London', 'Lusophone Tech Media', 'Innovation Week Features'],
    icon: TrophyIcon,
    color: 'premium'
  }
]

const CATEGORY_CONFIG = {
  'economic': {
    icon: ChartBarIcon,
    color: 'primary',
    labelEn: 'Economic Impact',
    labelPt: 'Impacto Económico'
  },
  'educational': {
    icon: AcademicCapIcon,
    color: 'secondary',
    labelEn: 'Educational Impact',
    labelPt: 'Impacto Educacional'
  },
  'cultural': {
    icon: SparklesIcon,
    color: 'accent',
    labelEn: 'Cultural Impact',
    labelPt: 'Impacto Cultural'
  },
  'social': {
    icon: HeartIcon,
    color: 'coral',
    labelEn: 'Social Impact',
    labelPt: 'Impacto Social'
  },
  'civic': {
    icon: HandRaisedIcon,
    color: 'action',
    labelEn: 'Civic Impact',
    labelPt: 'Impacto Cívico'
  },
  'entrepreneurial': {
    icon: TrophyIcon,
    color: 'premium',
    labelEn: 'Innovation Impact',
    labelPt: 'Impacto de Inovação'
  }
}

export default function CommunityImpactDocumentation() {
  const { language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedImpact, setExpandedImpact] = useState<string | null>(null)

  const filteredImpacts = selectedCategory === 'all' 
    ? COMMUNITY_IMPACTS
    : COMMUNITY_IMPACTS.filter(impact => impact.category === selectedCategory)

  const getTotalMetrics = () => {
    const totals = {
      businessesSupported: 185,
      studentsEducated: 1250,
      culturalEventsOrganized: 150,
      individualsSupported: 2800,
      votersRegistered: 2500,
      startupsIncubated: 85
    }
    return totals
  }

  const totals = getTotalMetrics()

  return (
    <section className="py-20 bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-100 via-secondary-50 to-accent-100 border border-primary-200 rounded-full px-8 py-3 shadow-lg mb-6">
            <ArrowTrendingUpIcon className="w-6 h-6 text-primary-600" />
            <span className="text-sm font-bold text-primary-700">
              {language === 'pt' ? 'Impacto Comunitário Documentado' : 'Documented Community Impact'}
            </span>
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {language === 'pt' 
              ? 'Transformando Londres Através da Comunidade de Falantes de Português'
              : 'Transforming London Through Portuguese-speaking community'}
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            {language === 'pt' 
              ? 'Impacto quantificável e documentado da comunidade de falantes de português em Londres através de contribuições económicas, educacionais, culturais e sociais mensuráveis.'
              : 'Quantifiable and documented impact of the Portuguese-speaking community in London through measurable economic, educational, cultural, and social contributions.'}
          </p>
        </motion.div>

        {/* Overall Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border border-white/50">
            <div className="text-2xl font-bold text-primary-600 mb-1">{totals.businessesSupported}</div>
            <div className="text-xs text-gray-600">
              {language === 'pt' ? 'Negócios Apoiados' : 'Businesses Supported'}
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border border-white/50">
            <div className="text-2xl font-bold text-secondary-600 mb-1">{totals.studentsEducated}</div>
            <div className="text-xs text-gray-600">
              {language === 'pt' ? 'Estudantes Educados' : 'Students Educated'}
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border border-white/50">
            <div className="text-2xl font-bold text-accent-600 mb-1">{totals.culturalEventsOrganized}+</div>
            <div className="text-xs text-gray-600">
              {language === 'pt' ? 'Eventos Culturais' : 'Cultural Events'}
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border border-white/50">
            <div className="text-2xl font-bold text-coral-600 mb-1">{totals.individualsSupported}+</div>
            <div className="text-xs text-gray-600">
              {language === 'pt' ? 'Indivíduos Apoiados' : 'Individuals Supported'}
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border border-white/50">
            <div className="text-2xl font-bold text-action-600 mb-1">{totals.votersRegistered}+</div>
            <div className="text-xs text-gray-600">
              {language === 'pt' ? 'Eleitores Registados' : 'Voters Registered'}
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border border-white/50">
            <div className="text-2xl font-bold text-premium-600 mb-1">{totals.startupsIncubated}</div>
            <div className="text-xs text-gray-600">
              {language === 'pt' ? 'Startups Incubadas' : 'Startups Incubated'}
            </div>
          </div>
        </motion.div>

        {/* Category Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-gray-100 hover:text-primary-600 border border-gray-200'
              }`}
            >
              <GlobeAltIcon className="w-4 h-4" />
              {language === 'pt' ? 'Todos os Impactos' : 'All Impacts'}
            </button>
            {Object.entries(CATEGORY_CONFIG).map(([key, config]) => {
              const IconComponent = config.icon
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === key
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                      : 'bg-white/80 text-gray-700 hover:bg-gray-100 hover:text-primary-600 border border-gray-200'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {language === 'pt' ? config.labelPt : config.labelEn}
                </button>
              )
            })}
          </div>
        </div>

        {/* Impact Documentation */}
        <div className="space-y-8 mb-16">
          {filteredImpacts.map((impact, index) => {
            const categoryConfig = CATEGORY_CONFIG[impact.category]
            const IconComponent = impact.icon
            const isExpanded = expandedImpact === impact.id

            return (
              <motion.div
                key={impact.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/60 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Impact Header */}
                <div className={`bg-gradient-to-r from-${impact.color}-500 to-${impact.color}-600 p-6 text-white`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 bg-white/20 text-white text-sm font-bold rounded-full`}>
                          {language === 'pt' ? categoryConfig.labelPt : categoryConfig.labelEn}
                        </span>
                        <span className="px-2 py-1 bg-white/20 text-white text-xs font-medium rounded-full">
                          {impact.timeframe}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        {language === 'pt' ? impact.titlePortuguese : impact.title}
                      </h3>
                      <p className="text-sm opacity-90 mb-4">
                        {language === 'pt' ? impact.descriptionPortuguese : impact.description}
                      </p>
                    </div>
                    <div className="p-3 bg-white/20 rounded-xl">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>
                  
                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-1">{impact.metrics.primary.value}</div>
                      <div className="text-xs opacity-90">
                        {language === 'pt' ? impact.metrics.primary.labelPortuguese : impact.metrics.primary.label}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-1">{impact.metrics.secondary.value}</div>
                      <div className="text-xs opacity-90">
                        {language === 'pt' ? impact.metrics.secondary.labelPortuguese : impact.metrics.secondary.label}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-1">{impact.metrics.tertiary.value}</div>
                      <div className="text-xs opacity-90">
                        {language === 'pt' ? impact.metrics.tertiary.labelPortuguese : impact.metrics.tertiary.label}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Impact Content */}
                <div className="p-6">
                  {/* Beneficiaries */}
                  <div className={`bg-${impact.color}-50 rounded-lg p-4 mb-6`}>
                    <h4 className={`font-medium text-${impact.color}-800 mb-2 flex items-center gap-2`}>
                      <UserGroupIcon className="w-4 h-4" />
                      {language === 'pt' ? 'Beneficiários:' : 'Beneficiaries:'}
                    </h4>
                    <p className={`text-${impact.color}-700 text-sm`}>
                      {language === 'pt' ? impact.beneficiariesPortuguese : impact.beneficiaries}
                    </p>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 mb-6 border-l-4 border-primary-500">
                    <blockquote className="text-gray-700 italic text-sm mb-3">
                      "{language === 'pt' ? impact.testimonial.quotePortuguese : impact.testimonial.quote}"
                    </blockquote>
                    <cite className="text-primary-600 font-semibold text-sm">
                      — {impact.testimonial.author}, {language === 'pt' ? impact.testimonial.rolePortuguese : impact.testimonial.role}
                    </cite>
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => setExpandedImpact(isExpanded ? null : impact.id)}
                    className={`w-full bg-gradient-to-r from-${impact.color}-500 to-${impact.color}-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-${impact.color}-600 hover:to-${impact.color}-700 transition-all duration-200`}
                  >
                    {isExpanded 
                      ? (language === 'pt' ? 'Ver Menos Detalhes' : 'Show Less Details')
                      : (language === 'pt' ? 'Ver Todos os Detalhes' : 'View Full Details')
                    }
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 space-y-6 border-t border-gray-200 pt-6"
                    >
                      {/* Key Achievements */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <StarIcon className="w-4 h-4" />
                          {language === 'pt' ? 'Principais Conquistas:' : 'Key Achievements:'}
                        </h4>
                        <ul className="space-y-2">
                          {(language === 'pt' ? impact.keyAchievementsPortuguese : impact.keyAchievements).map((achievement, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Partnerships */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          {language === 'pt' ? 'Parcerias Estratégicas:' : 'Strategic Partnerships:'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {impact.partnerships.map(partner => (
                            <span
                              key={partner}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {partner}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Future Goals */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          {language === 'pt' ? 'Objetivos Futuros:' : 'Future Goals:'}
                        </h4>
                        <p className="text-gray-700 text-sm">
                          {language === 'pt' ? impact.futureGoalsPortuguese : impact.futureGoals}
                        </p>
                      </div>

                      {/* Media Recognition */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          {language === 'pt' ? 'Reconhecimento da Mídia:' : 'Media Recognition:'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {impact.mediaRecognition.map(media => (
                            <span
                              key={media}
                              className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                            >
                              {media}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
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
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-3xl p-8 text-center text-white shadow-2xl">
            <ArrowTrendingUpIcon className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h3 className="text-3xl font-bold mb-4">
              {language === 'pt' ? 'Contribua para o Impacto' : 'Contribute to the Impact'}
            </h3>
            <p className="text-lg mb-8 opacity-90 max-w-3xl mx-auto">
              {language === 'pt' 
                ? 'Junte-se à comunidade de falantes de português mais impactante de Londres. Juntos, continuamos a transformar Londres através da nossa cultura, valores e contribuições positivas.'
                : 'Join London\'s most impactful Portuguese-speaking community. Together, we continue transforming London through our culture, values, and positive contributions.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <a
                href="/signup"
                className="bg-white text-primary-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                {language === 'pt' ? 'Juntar-se ao Impacto' : 'Join the Impact'}
              </a>
              <a
                href="/partnerships"
                className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-primary-600 transition-colors"
              >
                {language === 'pt' ? 'Parceria Conosco' : 'Partner With Us'}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}