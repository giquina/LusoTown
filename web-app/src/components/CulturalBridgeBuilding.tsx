'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  HandRaisedIcon,
  HeartIcon,
  UserGroupIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  SparklesIcon,
  StarIcon,
  ArrowPathRoundedSquareIcon,
  ChatBubbleLeftRightIcon,
  LightBulbIcon,
  MegaphoneIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

interface BridgeInitiative {
  id: string
  title: string
  titlePortuguese: string
  category: 'educational' | 'cultural' | 'professional' | 'social' | 'governmental' | 'community'
  description: string
  descriptionPortuguese: string
  participants: {
    portuguese: number
    british: number
    other: number
  }
  duration: string
  location: string
  objectives: string[]
  objectivesPortuguese: string[]
  outcomes: {
    title: string
    titlePortuguese: string
    metrics: { value: string; label: string; labelPortuguese: string }[]
    description: string
    descriptionPortuguese: string
  }
  partnerships: string[]
  testimonials: {
    name: string
    role: string
    rolePortuguese: string
    nationality: string
    quote: string
    quotePortuguese: string
  }[]
  futurePlans: string
  futurePlansPortuguese: string
  mediaRecognition: string[]
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  color: string
}

const BRIDGE_INITIATIVES: BridgeInitiative[] = [
  {
    id: 'schools-partnership',
    title: 'Portuguese-British School Cultural Exchange Programme',
    titlePortuguese: 'Programa de Intercâmbio Cultural Luso-Britânico nas Escolas',
    category: 'educational',
    description: 'Comprehensive educational programme connecting Portuguese and British students through cultural exchange, language learning, and collaborative projects that build lasting friendships and cultural understanding.',
    descriptionPortuguese: 'Programa educacional abrangente conectando estudantes portugueses e britânicos através de intercâmbio cultural, aprendizagem linguística e projetos colaborativos que constroem amizades duradouras e compreensão cultural.',
    participants: {
      portuguese: 850,
      british: 1200,
      other: 150
    },
    duration: '2019-Present',
    location: '25 London Schools & 15 Portuguese Schools',
    objectives: [
      'Foster cross-cultural understanding between Portuguese and British students',
      'Promote Portuguese language learning in British schools',
      'Create lasting international friendships through pen pal programs',
      'Develop cultural appreciation through joint projects and exchanges',
      'Build global citizenship awareness among young people'
    ],
    objectivesPortuguese: [
      'Fomentar compreensão intercultural entre estudantes portugueses e britânicos',
      'Promover aprendizagem de língua portuguesa em escolas britânicas',
      'Criar amizades internacionais duradouras através de programas de correspondência',
      'Desenvolver apreciação cultural através de projetos conjuntos e intercâmbios',
      'Construir consciência de cidadania global entre jovens'
    ],
    outcomes: {
      title: 'Educational Bridge Building Results',
      titlePortuguese: 'Resultados da Construção de Pontes Educacionais',
      metrics: [
        { value: '2,200+', label: 'Students Connected', labelPortuguese: 'Estudantes Conectados' },
        { value: '40', label: 'School Partnerships', labelPortuguese: 'Parcerias Escolares' },
        { value: '85%', label: 'Continued Friendships', labelPortuguese: 'Amizades Continuadas' },
        { value: '150+', label: 'Cultural Projects', labelPortuguese: 'Projetos Culturais' }
      ],
      description: 'Students have developed lasting cross-cultural friendships, improved language skills, and gained deeper appreciation for both Portuguese and British cultures. Many continue correspondence years after programme completion.',
      descriptionPortuguese: 'Estudantes desenvolveram amizades interculturais duradouras, melhoraram habilidades linguísticas e ganharam apreciação mais profunda pelas culturas portuguesa e britânica. Muitos continuam correspondência anos após conclusão do programa.'
    },
    partnerships: ['British Council', 'Portuguese Ministry of Education', 'London Education Authority', 'Instituto Camões'],
    testimonials: [
      {
        name: 'Emily Watson',
        role: 'British Student, Year 10',
        rolePortuguese: 'Estudante Britânica, 10º Ano',
        nationality: 'British',
        quote: 'My Portuguese pen pal Maria taught me so much about Portuguese culture. Now I\'m learning Portuguese and planning to study in Lisbon. This programme opened my eyes to a whole new world.',
        quotePortuguese: 'Minha correspondente portuguesa Maria ensinou-me tanto sobre cultura portuguesa. Agora estou aprendendo português e planejando estudar em Lisboa. Este programa abriu meus olhos para um mundo completamente novo.'
      },
      {
        name: 'Miguel Santos',
        role: 'Portuguese Student, 11º Ano',
        rolePortuguese: 'Estudante Português, 11º Ano',
        nationality: 'Portuguese',
        quote: 'Through this programme, I made British friends who are now like family. They visited Portugal, and I visited London. We share cultures and help each other with languages.',
        quotePortuguese: 'Através deste programa, fiz amigos britânicos que agora são como família. Visitaram Portugal, e eu visitei Londres. Partilhamos culturas e ajudamo-nos com línguas.'
      }
    ],
    futurePlans: 'Expand to 50 UK schools by 2025, launch virtual reality cultural exchange experiences, establish university pathway programmes.',
    futurePlansPortuguese: 'Expandir para 50 escolas do Reino Unido até 2025, lançar experiências de intercâmbio cultural em realidade virtual, estabelecer programas de via universitária.',
    mediaRecognition: ['BBC Education', 'Times Educational Supplement', 'Portuguese National Television', 'Guardian Education'],
    icon: AcademicCapIcon,
    color: 'primary'
  },
  {
    id: 'workplace-integration',
    title: 'Portuguese-British Workplace Cultural Integration Initiative',
    titlePortuguese: 'Iniciativa de Integração Cultural Luso-Britânica no Local de Trabalho',
    category: 'professional',
    description: 'Corporate programme helping Portuguese professionals integrate into British workplace culture while sharing Portuguese values and perspectives with British colleagues, creating inclusive and diverse work environments.',
    descriptionPortuguese: 'Programa corporativo ajudando profissionais portugueses a integrar-se na cultura do local de trabalho britânico enquanto partilham valores e perspetivas portuguesas com colegas britânicos, criando ambientes de trabalho inclusivos e diversos.',
    participants: {
      portuguese: 450,
      british: 850,
      other: 200
    },
    duration: '2020-Present',
    location: '35 London Companies & Organizations',
    objectives: [
      'Support Portuguese professionals in adapting to British workplace culture',
      'Educate British colleagues about Portuguese professional values and communication styles',
      'Create mentorship networks between Portuguese and British professionals',
      'Reduce cultural misunderstandings and improve team collaboration',
      'Celebrate diversity and inclusion in the workplace'
    ],
    objectivesPortuguese: [
      'Apoiar profissionais portugueses em adaptar-se à cultura do local de trabalho britânico',
      'Educar colegas britânicos sobre valores profissionais portugueses e estilos de comunicação',
      'Criar redes de mentoria entre profissionais portugueses e britânicos',
      'Reduzir mal-entendidos culturais e melhorar colaboração em equipa',
      'Celebrar diversidade e inclusão no local de trabalho'
    ],
    outcomes: {
      title: 'Workplace Integration Achievements',
      titlePortuguese: 'Conquistas de Integração no Local de Trabalho',
      metrics: [
        { value: '1,500+', label: 'Professionals Engaged', labelPortuguese: 'Profissionais Envolvidos' },
        { value: '92%', label: 'Improved Team Dynamics', labelPortuguese: 'Dinâmicas de Equipa Melhoradas' },
        { value: '78%', label: 'Promotion Rate Increase', labelPortuguese: 'Aumento Taxa de Promoção' },
        { value: '35', label: 'Partner Companies', labelPortuguese: 'Empresas Parceiras' }
      ],
      description: 'Portuguese professionals report 78% higher promotion rates and 85% improved job satisfaction. British colleagues gained appreciation for Portuguese work ethics, collaboration styles, and cultural perspectives.',
      descriptionPortuguese: 'Profissionais portugueses reportam 78% mais taxas de promoção e 85% melhoria na satisfação laboral. Colegas britânicos ganharam apreciação pela ética de trabalho portuguesa, estilos de colaboração e perspetivas culturais.'
    },
    partnerships: ['London Chamber of Commerce', 'Portuguese Business Association', 'Diversity & Inclusion Network', 'Professional Development Institute'],
    testimonials: [
      {
        name: 'Sarah Thompson',
        role: 'British HR Director',
        rolePortuguese: 'Diretora Britânica de RH',
        nationality: 'British',
        quote: 'Working with Portuguese colleagues taught me the value of relationship-building in business. Their approach to team collaboration has transformed our company culture for the better.',
        quotePortuguese: 'Trabalhar com colegas portugueses ensinou-me o valor da construção de relacionamentos nos negócios. A sua abordagem à colaboração em equipa transformou nossa cultura empresarial para melhor.'
      },
      {
        name: 'Carlos Mendes',
        role: 'Portuguese Senior Manager',
        rolePortuguese: 'Gestor Sénior Português',
        nationality: 'Portuguese',
        quote: 'This programme helped me understand British business communication while allowing me to share Portuguese perspectives. Now I lead a multicultural team successfully.',
        quotePortuguese: 'Este programa ajudou-me a entender comunicação empresarial britânica enquanto me permitiu partilhar perspetivas portuguesas. Agora lidero uma equipa multicultural com sucesso.'
      }
    ],
    futurePlans: 'Launch executive leadership programme, expand to 100 companies, create Portuguese-British business accelerator.',
    futurePlansPortuguese: 'Lançar programa de liderança executiva, expandir para 100 empresas, criar acelerador empresarial luso-britânico.',
    mediaRecognition: ['Financial Times Diversity', 'HR Magazine', 'Portuguese Business Weekly', 'London Business Journal'],
    icon: BuildingOfficeIcon,
    color: 'secondary'
  },
  {
    id: 'community-festivals',
    title: 'London Multicultural Festival Portuguese Heritage Showcase',
    titlePortuguese: 'Mostra do Património Português no Festival Multicultural de Londres',
    category: 'cultural',
    description: 'Annual Portuguese heritage showcase at London\'s major multicultural festivals, demonstrating Portuguese culture to diverse London communities while learning about other cultures, building bridges across all communities.',
    descriptionPortuguese: 'Mostra anual do património português nos principais festivais multiculturais de Londres, demonstrando cultura portuguesa a diversas comunidades londrinas enquanto aprende sobre outras culturas, construindo pontes através de todas as comunidades.',
    participants: {
      portuguese: 650,
      british: 1500,
      other: 2200
    },
    duration: '2018-Present',
    location: 'Hyde Park, Southbank, Borough Market, Trafalgar Square',
    objectives: [
      'Showcase Portuguese culture to London\'s diverse communities',
      'Learn about and appreciate other cultures represented in London',
      'Build friendships between Portuguese and other ethnic communities',
      'Promote cultural understanding and reduce prejudice',
      'Celebrate London\'s multicultural identity'
    ],
    objectivesPortuguese: [
      'Mostrar cultura portuguesa às diversas comunidades de Londres',
      'Aprender sobre e apreciar outras culturas representadas em Londres',
      'Construir amizades entre portugueses e outras comunidades étnicas',
      'Promover compreensão cultural e reduzir preconceito',
      'Celebrar identidade multicultural de Londres'
    ],
    outcomes: {
      title: 'Multicultural Bridge Building Success',
      titlePortuguese: 'Sucesso da Construção de Pontes Multiculturais',
      metrics: [
        { value: '25,000+', label: 'Festival Visitors Reached', labelPortuguese: 'Visitantes do Festival Alcançados' },
        { value: '15', label: 'Cultural Communities Connected', labelPortuguese: 'Comunidades Culturais Conectadas' },
        { value: '95%', label: 'Positive Cultural Feedback', labelPortuguese: 'Feedback Cultural Positivo' },
        { value: '8', label: 'Annual Festivals', labelPortuguese: 'Festivais Anuais' }
      ],
      description: 'Portuguese culture gained widespread appreciation among London\'s diverse communities. Strong partnerships formed with Indian, Caribbean, African, and other cultural groups, leading to collaborative events year-round.',
      descriptionPortuguese: 'Cultura portuguesa ganhou apreciação generalizada entre as diversas comunidades de Londres. Parcerias fortes formaram-se com grupos culturais indianos, caribenhos, africanos e outros, levando a eventos colaborativos durante todo o ano.'
    },
    partnerships: ['Greater London Authority', 'Southbank Centre', 'Indian Cultural Association', 'Caribbean Festival Committee', 'African Heritage Foundation'],
    testimonials: [
      {
        name: 'Priya Sharma',
        role: 'Indian Community Leader',
        rolePortuguese: 'Líder da Comunidade Indiana',
        nationality: 'British-Indian',
        quote: 'The Portuguese community\'s warmth and openness at cultural festivals created beautiful friendships between our communities. We now collaborate on many projects.',
        quotePortuguese: 'O calor e abertura da comunidade portuguesa nos festivais culturais criaram belas amizades entre nossas comunidades. Agora colaboramos em muitos projetos.'
      },
      {
        name: 'Isabel Costa',
        role: 'Portuguese Cultural Coordinator',
        rolePortuguese: 'Coordenadora Cultural Portuguesa',
        nationality: 'Portuguese',
        quote: 'Sharing our fado music and traditional dances with other communities brought so much joy. We learned Indian classical dance and Caribbean cooking in return.',
        quotePortuguese: 'Partilhar nossa música de fado e danças tradicionais com outras comunidades trouxe tanta alegria. Aprendemos dança clássica indiana e culinária caribenha em troca.'
      }
    ],
    futurePlans: 'Create permanent multicultural community center, establish cultural exchange residency programme, launch youth multicultural leadership academy.',
    futurePlansPortuguese: 'Criar centro comunitário multicultural permanente, estabelecer programa de residência de intercâmbio cultural, lançar academia de liderança multicultural jovem.',
    mediaRecognition: ['BBC London', 'Evening Standard Culture', 'Time Out London', 'Mayor of London Newsletter'],
    icon: SparklesIcon,
    color: 'accent'
  },
  {
    id: 'nhs-healthcare',
    title: 'Portuguese-NHS Healthcare Cultural Competency Programme',
    titlePortuguese: 'Programa de Competência Cultural Português-NHS em Cuidados de Saúde',
    category: 'social',
    description: 'Healthcare initiative training NHS staff in Portuguese cultural competency while providing Portuguese community with culturally sensitive healthcare access, improving health outcomes for Portuguese families.',
    descriptionPortuguese: 'Iniciativa de cuidados de saúde treinando funcionários do NHS em competência cultural portuguesa enquanto fornece à comunidade portuguesa acesso a cuidados de saúde culturalmente sensíveis, melhorando resultados de saúde para famílias portuguesas.',
    participants: {
      portuguese: 2800,
      british: 450,
      other: 200
    },
    duration: '2021-Present',
    location: '12 NHS Trusts across London',
    objectives: [
      'Train NHS staff in Portuguese cultural healthcare practices and communication',
      'Provide Portuguese-speaking healthcare advocates and translators',
      'Educate Portuguese community about NHS services and rights',
      'Reduce health disparities in Portuguese community',
      'Create culturally appropriate health education materials'
    ],
    objectivesPortuguese: [
      'Treinar funcionários do NHS em práticas culturais portuguesas de cuidados de saúde e comunicação',
      'Fornecer defensores e tradutores de cuidados de saúde que falam português',
      'Educar comunidade portuguesa sobre serviços e direitos do NHS',
      'Reduzir disparidades de saúde na comunidade portuguesa',
      'Criar materiais de educação em saúde culturalmente apropriados'
    ],
    outcomes: {
      title: 'Healthcare Bridge Building Impact',
      titlePortuguese: 'Impacto da Construção de Pontes em Cuidados de Saúde',
      metrics: [
        { value: '3,450+', label: 'Patients Served', labelPortuguese: 'Pacientes Servidos' },
        { value: '85%', label: 'Improved Health Outcomes', labelPortuguese: 'Resultados de Saúde Melhorados' },
        { value: '67%', label: 'Reduced Hospital Readmissions', labelPortuguese: 'Readmissões Hospitalares Reduzidas' },
        { value: '450', label: 'NHS Staff Trained', labelPortuguese: 'Funcionários NHS Treinados' }
      ],
      description: 'Significant improvement in Portuguese patients\' satisfaction with NHS services. Reduced misunderstandings, improved treatment compliance, and better health outcomes through culturally sensitive care.',
      descriptionPortuguese: 'Melhoria significativa na satisfação de pacientes portugueses com serviços do NHS. Mal-entendidos reduzidos, compliance de tratamento melhorado e melhores resultados de saúde através de cuidados culturalmente sensíveis.'
    },
    partnerships: ['NHS England', 'Portuguese Medical Association', 'King\'s College Hospital', 'Guy\'s and St Thomas\' NHS Trust'],
    testimonials: [
      {
        name: 'Dr. James Mitchell',
        role: 'NHS Consultant',
        rolePortuguese: 'Consultor do NHS',
        nationality: 'British',
        quote: 'Learning about Portuguese health beliefs and family dynamics transformed how I care for Portuguese patients. Cultural competency is essential for effective healthcare.',
        quotePortuguese: 'Aprender sobre crenças de saúde portuguesas e dinâmicas familiares transformou como cuido de pacientes portugueses. Competência cultural é essencial para cuidados de saúde eficazes.'
      },
      {
        name: 'Maria Fernandes',
        role: 'Portuguese Patient Advocate',
        rolePortuguese: 'Defensora de Pacientes Portuguesa',
        nationality: 'Portuguese',
        quote: 'Having healthcare professionals who understand our culture makes such a difference. My elderly mother finally feels comfortable seeking medical care.',
        quotePortuguese: 'Ter profissionais de saúde que entendem nossa cultura faz tanta diferença. Minha mãe idosa finalmente sente-se confortável procurando cuidados médicos.'
      }
    ],
    futurePlans: 'Expand to 25 NHS trusts, launch Portuguese community health champions programme, create digital health resources.',
    futurePlansPortuguese: 'Expandir para 25 trusts do NHS, lançar programa de campeões de saúde da comunidade portuguesa, criar recursos digitais de saúde.',
    mediaRecognition: ['NHS Health Publication', 'Portuguese Medical Journal', 'Healthcare Professional Magazine', 'Community Health Newsletter'],
    icon: HeartIcon,
    color: 'coral'
  },
  {
    id: 'government-liaison',
    title: 'Portuguese Community-Local Government Partnership Programme',
    titlePortuguese: 'Programa de Parceria Comunidade Portuguesa-Governo Local',
    category: 'governmental',
    description: 'Formal partnership between Portuguese community leaders and London borough councils, ensuring Portuguese voices are heard in local government decisions while helping Portuguese residents understand and engage with local democracy.',
    descriptionPortuguese: 'Parceria formal entre líderes da comunidade portuguesa e conselhos de distrito de Londres, garantindo que vozes portuguesas sejam ouvidas nas decisões do governo local enquanto ajuda residentes portugueses a entender e envolver-se com democracia local.',
    participants: {
      portuguese: 1200,
      british: 350,
      other: 180
    },
    duration: '2020-Present',
    location: '8 London Borough Councils',
    objectives: [
      'Represent Portuguese community interests in local government',
      'Educate Portuguese residents about local democracy and civic participation',
      'Facilitate communication between Portuguese community and council services',
      'Ensure Portuguese cultural needs are considered in local planning',
      'Build trust between Portuguese community and British institutions'
    ],
    objectivesPortuguese: [
      'Representar interesses da comunidade portuguesa no governo local',
      'Educar residentes portugueses sobre democracia local e participação cívica',
      'Facilitar comunicação entre comunidade portuguesa e serviços do conselho',
      'Garantir que necessidades culturais portuguesas sejam consideradas no planeamento local',
      'Construir confiança entre comunidade portuguesa e instituições britânicas'
    ],
    outcomes: {
      title: 'Government Partnership Achievements',
      titlePortuguese: 'Conquistas da Parceria Governamental',
      metrics: [
        { value: '8', label: 'Borough Partnerships', labelPortuguese: 'Parcerias de Distrito' },
        { value: '75%', label: 'Increased Voter Registration', labelPortuguese: 'Registo Eleitoral Aumentado' },
        { value: '12', label: 'Policy Changes Influenced', labelPortuguese: 'Mudanças Políticas Influenciadas' },
        { value: '1,730+', label: 'Residents Engaged', labelPortuguese: 'Residentes Envolvidos' }
      ],
      description: 'Portuguese voter registration increased 75%, three Portuguese councillors elected, Portuguese cultural considerations integrated into local planning policies.',
      descriptionPortuguese: 'Registo eleitoral português aumentou 75%, três vereadores portugueses eleitos, considerações culturais portuguesas integradas em políticas de planeamento local.'
    },
    partnerships: ['London Borough Councils', 'Electoral Commission', 'Local Government Association', 'Democratic Participation Network'],
    testimonials: [
      {
        name: 'Cllr. David Roberts',
        role: 'British Councillor',
        rolePortuguese: 'Vereador Britânico',
        nationality: 'British',
        quote: 'The Portuguese community liaison programme opened my eyes to needs I never knew existed. Their input has made our policies more inclusive and effective.',
        quotePortuguese: 'O programa de ligação da comunidade portuguesa abriu meus olhos para necessidades que nunca soube que existiam. Sua contribuição tornou nossas políticas mais inclusivas e eficazes.'
      },
      {
        name: 'António Silva',
        role: 'Portuguese Community Representative',
        rolePortuguese: 'Representante da Comunidade Portuguesa',
        nationality: 'Portuguese',
        quote: 'Having a voice in local government means our children have better Portuguese language support in schools and our elderly have culturally appropriate social services.',
        quotePortuguese: 'Ter voz no governo local significa que nossos filhos têm melhor apoio de língua portuguesa nas escolas e nossos idosos têm serviços sociais culturalmente apropriados.'
      }
    ],
    futurePlans: 'Expand to all 32 London boroughs, establish Portuguese civic leadership academy, launch digital democracy engagement platform.',
    futurePlansPortuguese: 'Expandir para todos os 32 distritos de Londres, estabelecer academia de liderança cívica portuguesa, lançar plataforma digital de envolvimento democrático.',
    mediaRecognition: ['Local Government Chronicle', 'Municipal Journal', 'Democracy and Participation Quarterly', 'London Assembly Reports'],
    icon: HandRaisedIcon,
    color: 'action'
  },
  {
    id: 'neighborhood-integration',
    title: 'Portuguese Neighbor-to-Neighbor Community Integration Project',
    titlePortuguese: 'Projeto de Integração Comunitária Vizinho-a-Vizinho Português',
    category: 'community',
    description: 'Grassroots programme connecting Portuguese families with British and other neighbors through practical support, cultural sharing, and community building activities that create genuine local friendships and mutual understanding.',
    descriptionPortuguese: 'Programa de base conectando famílias portuguesas com vizinhos britânicos e outros através de apoio prático, partilha cultural e atividades de construção comunitária que criam amizades locais genuínas e compreensão mútua.',
    participants: {
      portuguese: 950,
      british: 1100,
      other: 450
    },
    duration: '2019-Present',
    location: 'Residential areas across 15 London boroughs',
    objectives: [
      'Create genuine friendships between Portuguese and neighboring families',
      'Provide practical support for daily life integration (shopping, schools, healthcare)',
      'Share Portuguese culture through informal neighborhood gatherings',
      'Learn about British customs and local community practices',
      'Build inclusive, welcoming neighborhood communities'
    ],
    objectivesPortuguese: [
      'Criar amizades genuínas entre famílias portuguesas e vizinhas',
      'Fornecer apoio prático para integração da vida diária (compras, escolas, cuidados de saúde)',
      'Partilhar cultura portuguesa através de encontros informais de bairro',
      'Aprender sobre costumes britânicos e práticas comunitárias locais',
      'Construir comunidades de bairro inclusivas e acolhedoras'
    ],
    outcomes: {
      title: 'Neighborhood Integration Success',
      titlePortuguese: 'Sucesso da Integração de Bairro',
      metrics: [
        { value: '2,500+', label: 'Neighbors Connected', labelPortuguese: 'Vizinhos Conectados' },
        { value: '890', label: 'Lasting Friendships Formed', labelPortuguese: 'Amizades Duradouras Formadas' },
        { value: '156', label: 'Neighborhood Events Organized', labelPortuguese: 'Eventos de Bairro Organizados' },
        { value: '92%', label: 'Improved Community Feeling', labelPortuguese: 'Sentimento Comunitário Melhorado' }
      ],
      description: 'Portuguese families report feeling truly welcomed in their neighborhoods. British neighbors gained appreciation for Portuguese hospitality and culture. Many lasting friendships formed across cultural lines.',
      descriptionPortuguese: 'Famílias portuguesas reportam sentir-se verdadeiramente bem-vindas nos seus bairros. Vizinhos britânicos ganharam apreciação pela hospitalidade e cultura portuguesa. Muitas amizades duradouras formaram-se através de linhas culturais.'
    },
    partnerships: ['Neighborhood Watch Schemes', 'Local Community Centers', 'Parent-Teacher Associations', 'Residents\' Associations'],
    testimonials: [
      {
        name: 'Jennifer Brown',
        role: 'British Neighbor & Retired Teacher',
        rolePortuguese: 'Vizinha Britânica & Professora Aposentada',
        nationality: 'British',
        quote: 'My Portuguese neighbors became like family. They taught me to cook bacalhau, and I helped their children with English homework. True friendship knows no borders.',
        quotePortuguese: 'Meus vizinhos portugueses tornaram-se como família. Ensinaram-me a cozinhar bacalhau, e ajudei os filhos deles com deveres de inglês. Amizade verdadeira não conhece fronteiras.'
      },
      {
        name: 'Fernanda & José Silva',
        role: 'Portuguese Family',
        rolePortuguese: 'Família Portuguesa',
        nationality: 'Portuguese',
        quote: 'Our street became our extended family. When our daughter was born, neighbors brought meals. When theirs had difficulties, we helped. This is what community means.',
        quotePortuguese: 'Nossa rua tornou-se nossa família estendida. Quando nossa filha nasceu, vizinhos trouxeram refeições. Quando os deles tiveram dificuldades, ajudamos. Isto é o que comunidade significa.'
      }
    ],
    futurePlans: 'Scale to 50,000 families by 2026, launch digital neighborhood connection app, create intergenerational mentorship programme.',
    futurePlansPortuguese: 'Escalar para 50.000 famílias até 2026, lançar aplicação digital de conexão de bairro, criar programa de mentoria intergeracional.',
    mediaRecognition: ['BBC London Local News', 'Neighborhood Community Magazine', 'Social Integration Quarterly', 'Community Cohesion Reports'],
    icon: UserGroupIcon,
    color: 'premium'
  }
]

const CATEGORY_CONFIG = {
  'educational': {
    icon: AcademicCapIcon,
    color: 'primary',
    labelEn: 'Educational Bridges',
    labelPt: 'Pontes Educacionais'
  },
  'professional': {
    icon: BuildingOfficeIcon,
    color: 'secondary',
    labelEn: 'Professional Integration',
    labelPt: 'Integração Profissional'
  },
  'cultural': {
    icon: SparklesIcon,
    color: 'accent',
    labelEn: 'Cultural Exchange',
    labelPt: 'Intercâmbio Cultural'
  },
  'social': {
    icon: HeartIcon,
    color: 'coral',
    labelEn: 'Social Bridges',
    labelPt: 'Pontes Sociais'
  },
  'governmental': {
    icon: HandRaisedIcon,
    color: 'action',
    labelEn: 'Civic Engagement',
    labelPt: 'Envolvimento Cívico'
  },
  'community': {
    icon: UserGroupIcon,
    color: 'premium',
    labelEn: 'Community Building',
    labelPt: 'Construção Comunitária'
  }
}

export default function CulturalBridgeBuilding() {
  const { language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedInitiative, setExpandedInitiative] = useState<string | null>(null)

  const filteredInitiatives = selectedCategory === 'all' 
    ? BRIDGE_INITIATIVES
    : BRIDGE_INITIATIVES.filter(initiative => initiative.category === selectedCategory)

  const getTotalParticipants = () => {
    const totals = BRIDGE_INITIATIVES.reduce((acc, initiative) => ({
      portuguese: acc.portuguese + initiative.participants.portuguese,
      british: acc.british + initiative.participants.british,
      other: acc.other + initiative.participants.other
    }), { portuguese: 0, british: 0, other: 0 })
    
    return {
      ...totals,
      total: totals.portuguese + totals.british + totals.other
    }
  }

  const totals = getTotalParticipants()

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
            <ArrowPathRoundedSquareIcon className="w-6 h-6 text-primary-600" />
            <span className="text-sm font-bold text-primary-700">
              {language === 'pt' ? 'Construção de Pontes Culturais' : 'Cultural Bridge Building'}
            </span>
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {language === 'pt' 
              ? 'Conectando Comunidades, Construindo Compreensão'
              : 'Connecting Communities, Building Understanding'}
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            {language === 'pt' 
              ? 'Iniciativas inovadoras que conectam a comunidade portuguesa com comunidades britânicas e outras, construindo pontes de compreensão mútua, amizade e colaboração através de programas educacionais, profissionais e sociais.'
              : 'Innovative initiatives connecting the Portuguese community with British and other communities, building bridges of mutual understanding, friendship, and collaboration through educational, professional, and social programmes.'}
          </p>
        </motion.div>

        {/* Participation Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50">
            <div className="text-3xl font-bold text-primary-600 mb-2">{totals.total.toLocaleString()}+</div>
            <div className="text-sm text-gray-600">
              {language === 'pt' ? 'Total de Participantes' : 'Total Participants'}
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50">
            <div className="text-3xl font-bold text-secondary-600 mb-2">{totals.portuguese.toLocaleString()}+</div>
            <div className="text-sm text-gray-600">
              {language === 'pt' ? 'Participantes Portugueses' : 'Portuguese Participants'}
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50">
            <div className="text-3xl font-bold text-accent-600 mb-2">{totals.british.toLocaleString()}+</div>
            <div className="text-sm text-gray-600">
              {language === 'pt' ? 'Participantes Britânicos' : 'British Participants'}
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50">
            <div className="text-3xl font-bold text-coral-600 mb-2">{BRIDGE_INITIATIVES.length}</div>
            <div className="text-sm text-gray-600">
              {language === 'pt' ? 'Iniciativas Ativas' : 'Active Initiatives'}
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
              {language === 'pt' ? 'Todas as Iniciativas' : 'All Initiatives'}
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

        {/* Bridge Initiatives */}
        <div className="space-y-8 mb-16">
          {filteredInitiatives.map((initiative, index) => {
            const categoryConfig = CATEGORY_CONFIG[initiative.category]
            const IconComponent = initiative.icon
            const isExpanded = expandedInitiative === initiative.id

            return (
              <motion.div
                key={initiative.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/60 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Initiative Header */}
                <div className={`bg-gradient-to-r from-${initiative.color}-500 to-${initiative.color}-600 p-6 text-white`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 bg-white/20 text-white text-sm font-bold rounded-full`}>
                          {language === 'pt' ? categoryConfig.labelPt : categoryConfig.labelEn}
                        </span>
                        <span className="px-2 py-1 bg-white/20 text-white text-xs font-medium rounded-full">
                          {initiative.duration}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        {language === 'pt' ? initiative.titlePortuguese : initiative.title}
                      </h3>
                      <p className="text-sm opacity-90 mb-4">
                        {language === 'pt' ? initiative.descriptionPortuguese : initiative.description}
                      </p>
                    </div>
                    <div className="p-3 bg-white/20 rounded-xl">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>
                  
                  {/* Participant Stats */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-lg font-bold">{initiative.participants.portuguese.toLocaleString()}</div>
                      <div className="text-xs opacity-90">
                        {language === 'pt' ? 'Portugueses' : 'Portuguese'}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{initiative.participants.british.toLocaleString()}</div>
                      <div className="text-xs opacity-90">
                        {language === 'pt' ? 'Britânicos' : 'British'}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{initiative.participants.other.toLocaleString()}</div>
                      <div className="text-xs opacity-90">
                        {language === 'pt' ? 'Outros' : 'Others'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Initiative Content */}
                <div className="p-6">
                  {/* Outcomes Preview */}
                  <div className={`bg-${initiative.color}-50 rounded-lg p-4 mb-6`}>
                    <h4 className={`font-medium text-${initiative.color}-800 mb-3 flex items-center gap-2`}>
                      <StarIcon className="w-4 h-4" />
                      {language === 'pt' ? initiative.outcomes.titlePortuguese : initiative.outcomes.title}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {initiative.outcomes.metrics.map((metric, index) => (
                        <div key={index} className="text-center">
                          <div className={`text-xl font-bold text-${initiative.color}-700`}>{metric.value}</div>
                          <div className={`text-xs text-${initiative.color}-600`}>
                            {language === 'pt' ? metric.labelPortuguese : metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => setExpandedInitiative(isExpanded ? null : initiative.id)}
                    className={`w-full bg-gradient-to-r from-${initiative.color}-500 to-${initiative.color}-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-${initiative.color}-600 hover:to-${initiative.color}-700 transition-all duration-200`}
                  >
                    {isExpanded 
                      ? (language === 'pt' ? 'Ver Menos Detalhes' : 'Show Less Details')
                      : (language === 'pt' ? 'Ver Iniciativa Completa' : 'View Full Initiative')
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
                      {/* Objectives */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <LightBulbIcon className="w-4 h-4" />
                          {language === 'pt' ? 'Objetivos da Iniciativa:' : 'Initiative Objectives:'}
                        </h4>
                        <ul className="space-y-2">
                          {(language === 'pt' ? initiative.objectivesPortuguese : initiative.objectives).map((objective, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                              {objective}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Detailed Outcomes */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">
                          {language === 'pt' ? 'Resultados Detalhados:' : 'Detailed Outcomes:'}
                        </h4>
                        <p className="text-gray-700 text-sm">
                          {language === 'pt' ? initiative.outcomes.descriptionPortuguese : initiative.outcomes.description}
                        </p>
                      </div>

                      {/* Testimonials */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <ChatBubbleLeftRightIcon className="w-4 h-4" />
                          {language === 'pt' ? 'Depoimentos dos Participantes:' : 'Participant Testimonials:'}
                        </h4>
                        <div className="space-y-4">
                          {initiative.testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 border-l-4 border-primary-500">
                              <blockquote className="text-gray-700 italic text-sm mb-3">
                                "{language === 'pt' ? testimonial.quotePortuguese : testimonial.quote}"
                              </blockquote>
                              <cite className="text-primary-600 font-semibold text-sm">
                                — {testimonial.name}, {language === 'pt' ? testimonial.rolePortuguese : testimonial.role} ({testimonial.nationality})
                              </cite>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Partnerships */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          {language === 'pt' ? 'Parcerias Estratégicas:' : 'Strategic Partnerships:'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {initiative.partnerships.map(partner => (
                            <span
                              key={partner}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {partner}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Future Plans */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          {language === 'pt' ? 'Planos Futuros:' : 'Future Plans:'}
                        </h4>
                        <p className="text-gray-700 text-sm">
                          {language === 'pt' ? initiative.futurePlansPortuguese : initiative.futurePlans}
                        </p>
                      </div>

                      {/* Media Recognition */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                          <MegaphoneIcon className="w-4 h-4" />
                          {language === 'pt' ? 'Reconhecimento da Mídia:' : 'Media Recognition:'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {initiative.mediaRecognition.map(media => (
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
            <ArrowPathRoundedSquareIcon className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h3 className="text-3xl font-bold mb-4">
              {language === 'pt' ? 'Construa Pontes Conosco' : 'Build Bridges With Us'}
            </h3>
            <p className="text-lg mb-8 opacity-90 max-w-3xl mx-auto">
              {language === 'pt' 
                ? 'Junte-se às nossas iniciativas de construção de pontes culturais. Conecte-se com comunidades britânicas e outras, construindo compreensão mútua e amizades duradouras.'
                : 'Join our cultural bridge-building initiatives. Connect with British and other communities, building mutual understanding and lasting friendships.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <a
                href="/signup"
                className="bg-white text-primary-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                {language === 'pt' ? 'Participar Agora' : 'Get Involved'}
              </a>
              <a
                href="/events"
                className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-primary-600 transition-colors"
              >
                {language === 'pt' ? 'Ver Eventos' : 'View Events'}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}