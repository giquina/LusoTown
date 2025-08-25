/**
 * LusoTown Mobile App Store Configuration
 * Phase 7: Launch Preparation
 * 
 * Comprehensive app store metadata and marketing materials
 * for both Apple App Store and Google Play Store submissions
 */

import { brandColors, PORTUGUESE_COLORS } from '../web-app/src/config/brand';
import { contactInfo, socialMedia } from '../web-app/src/config/contact';
import { UNIVERSITY_STATS } from '../web-app/src/config/universities';
import { SUBSCRIPTION_PLANS, formatPrice } from '../web-app/src/config/pricing';

// App Store Optimization (ASO) Keywords
export const ASO_KEYWORDS = {
  primary: [
    'Portuguese community',
    'Portuguese speakers UK',
    'Lusophone community',
    'Portuguese events London',
    'Portuguese culture UK',
    'Portuguese networking',
    'Portuguese dating app',
    'Portuguese business directory',
    'Fado music events',
    'Portuguese restaurants UK'
  ],
  secondary: [
    'Brazilian community UK',
    'Cape Verdean community',
    'Angolan community',
    'Mozambican community',
    'Portuguese heritage',
    'Lusophone culture',
    'Portuguese language exchange',
    'Portuguese festivals UK',
    'Santos Populares',
    'Portuguese immigrants UK'
  ],
  long_tail: [
    'Portuguese community app London',
    'meet Portuguese speakers UK',
    'Portuguese cultural events near me',
    'Portuguese speaking friends UK',
    'authentic Portuguese experiences',
    'Portuguese community networking',
    'Portuguese heritage preservation',
    'Lusophone cultural activities',
    'Portuguese social events UK',
    'connect Portuguese diaspora'
  ]
} as const;

// App Store Descriptions
export const APP_STORE_DESCRIPTIONS = {
  short: {
    en: "Connect with the vibrant Portuguese-speaking community across the United Kingdom. Discover authentic cultural events, meet like-minded people, and celebrate your heritage.",
    pt: "Conecte-se com a vibrante comunidade lusófona em todo o Reino Unido. Descubra eventos culturais autênticos, conheça pessoas com interesses semelhantes e celebre a sua herança."
  },
  long: {
    en: `<õ<ù Welcome to LusoTown - The Ultimate Portuguese Community App for the UK!

Join over 1500+ Portuguese speakers across the United Kingdom in the most authentic Lusophone community platform. Whether you're from Portugal, Brazil, Cape Verde, Angola, Mozambique, or any Portuguese-speaking nation, LusoTown is your digital home away from home.

( DISCOVER AUTHENTIC EXPERIENCES
" Exclusive Portuguese cultural events (Fado nights, Santos Populares, Portugal Day)
" Traditional festivals celebrating all Lusophone nations
" Authentic Portuguese restaurants and businesses
" Language exchange meetups and cultural workshops
" Premium events featuring Portuguese wine tastings and culinary experiences

> MEANINGFUL CONNECTIONS
" AI-powered matching based on cultural compatibility and interests
" Connect with Portuguese speakers from your homeland or region
" Join conversations in Portuguese or English
" Build lasting friendships and professional networks
" Family-friendly community with multi-generational connections

<ê BUSINESS DIRECTORY
" Discover 200+ verified Portuguese-owned businesses
" Support your community while getting exclusive member discounts
" From traditional bakeries to modern tech startups
" Professional services in Portuguese language
" Real estate, legal, and financial services for the Portuguese community

<“ UNIVERSITY PARTNERSHIPS
We partner with 8 leading UK universities including UCL, King's College, Imperial, LSE, Oxford, and Cambridge, supporting 1000+ Portuguese-speaking students.

< ALL LUSOPHONE NATIONS WELCOME
Our inclusive community celebrates:
" Portugal <õ<ù - Rich history, Fado music, and traditional cuisine
" Brazil <ç<÷ - Vibrant culture, samba, and business excellence
" Cape Verde <è<û - Beautiful music traditions and island hospitality
" Angola <æ<ô - Dynamic urban culture and traditional heritage
" Mozambique <ò<ÿ - Cultural diversity and community spirit
" Guinea-Bissau, São Tomé and Príncipe, East Timor

=ñ PREMIUM FEATURES
" Free tier: 2 matches, 3 messages, access to community events
" Community Member (£15.99/month): Unlimited connections, exclusive discounts
" Cultural Ambassador (£29.99/month): Premium events, monthly Portuguese wine delivery
" Família Plan (£39.99/month): Perfect for Portuguese families

<¯ WHY CHOOSE LUSOTOWN?
" Authentic Portuguese cultural focus - not generic international
" UK-wide coverage from London to Edinburgh, Manchester to Cardiff
" GDPR compliant with Portuguese language customer support
" Safe, moderated community with verified Portuguese businesses
" Regular cultural content and community highlights
" Integration with Portuguese cultural centers and institutions

Join thousands of Portuguese speakers who have found their UK community through LusoTown. Download now and discover your Lusophone family across the United Kingdom!

Keywords: Portuguese community UK, Lusophone networking, Portuguese events London, Portuguese culture, Fado music, Portuguese restaurants, Brazilian community, Cape Verdean culture, Portuguese heritage, Santos Populares`,
    
    pt: `<õ<ù Bem-vindos ao LusoTown - A Melhor App da Comunidade Portuguesa no Reino Unido!

Junte-se a mais de 1500+ lusófonos em todo o Reino Unido na plataforma de comunidade lusófona mais autêntica. Seja de Portugal, Brasil, Cabo Verde, Angola, Moçambique, ou qualquer nação lusófona, o LusoTown é o seu lar digital longe de casa.

( DESCUBRA EXPERIÊNCIAS AUTÊNTICAS
" Eventos culturais portugueses exclusivos (noites de Fado, Santos Populares, Dia de Portugal)
" Festivais tradicionais celebrando todas as nações lusófonas
" Restaurantes e negócios portugueses autênticos
" Encontros de intercâmbio linguístico e workshops culturais
" Eventos premium com provas de vinhos portugueses e experiências culinárias

> CONEXÕES SIGNIFICATIVAS
" Sistema de matching com IA baseado na compatibilidade cultural e interesses
" Conecte-se com lusófonos da sua terra natal ou região
" Participe em conversas em português ou inglês
" Construa amizades duradouras e redes profissionais
" Comunidade familiar com conexões multi-geracionais

<ê DIRETÓRIO DE NEGÓCIOS
" Descubra 200+ negócios verificados de proprietários portugueses
" Apoie a sua comunidade enquanto obtém descontos exclusivos para membros
" Desde padarias tradicionais a startups modernas de tecnologia
" Serviços profissionais em língua portuguesa
" Serviços imobiliários, legais e financeiros para a comunidade portuguesa

<“ PARCERIAS UNIVERSITÁRIAS
Temos parcerias com 8 universidades líderes no Reino Unido incluindo UCL, King's College, Imperial, LSE, Oxford, e Cambridge, apoiando 1000+ estudantes lusófonos.

< TODAS AS NAÇÕES LUSÓFONAS BEM-VINDAS
A nossa comunidade inclusiva celebra:
" Portugal <õ<ù - Rica história, música Fado, e culinária tradicional
" Brasil <ç<÷ - Cultura vibrante, samba, e excelência empresarial
" Cabo Verde <è<û - Belas tradições musicais e hospitalidade das ilhas
" Angola <æ<ô - Cultura urbana dinâmica e herança tradicional
" Moçambique <ò<ÿ - Diversidade cultural e espírito comunitário
" Guiné-Bissau, São Tomé e Príncipe, Timor-Leste

=ñ FUNCIONALIDADES PREMIUM
" Nível gratuito: 2 matches, 3 mensagens, acesso a eventos comunitários
" Membro da Comunidade (£15.99/mês): Conexões ilimitadas, descontos exclusivos
" Embaixador Cultural (£29.99/mês): Eventos premium, entrega mensal de vinhos portugueses
" Plano Família (£39.99/mês): Perfeito para famílias portuguesas

<¯ PORQUÊ ESCOLHER O LUSOTOWN?
" Foco cultural português autêntico - não genérico internacional
" Cobertura em todo o Reino Unido de Londres a Edimburgo, Manchester a Cardiff
" Compatível com GDPR e suporte ao cliente em português
" Comunidade segura e moderada com negócios portugueses verificados
" Conteúdo cultural regular e destaques da comunidade
" Integração com centros culturais e instituições portuguesas

Junte-se a milhares de lusófonos que encontraram a sua comunidade no Reino Unido através do LusoTown. Descarregue agora e descubra a sua família lusófona em todo o Reino Unido!`
  }
} as const;

// App Store Screenshots Configuration
export const SCREENSHOT_CONCEPTS = {
  ios: [
    {
      title: "Welcome to Your Portuguese Community",
      description: "Beautiful onboarding showcasing Portuguese cultural elements",
      features: ["Portuguese flag colors", "Cultural heritage selection", "Warm welcome message"],
      screen_type: "onboarding"
    },
    {
      title: "Discover Authentic Portuguese Events",
      description: "Browse Fado nights, Santos Populares, and cultural festivals",
      features: ["Event categories", "Portuguese cultural imagery", "Location-based events"],
      screen_type: "events_list"
    },
    {
      title: "Connect with Like-minded Portuguese Speakers",
      description: "AI-powered matching based on cultural compatibility",
      features: ["Cultural compatibility scores", "Shared Portuguese interests", "Heritage connections"],
      screen_type: "matches"
    },
    {
      title: "Support Portuguese Businesses",
      description: "Directory of verified Portuguese-owned businesses across UK",
      features: ["Business categories", "Verified badges", "Member discounts"],
      screen_type: "business_directory"
    },
    {
      title: "Your Cultural Profile",
      description: "Personalized experience celebrating your Portuguese heritage",
      features: ["Heritage badges", "Cultural statistics", "Community connections"],
      screen_type: "profile"
    }
  ],
  android: [
    // Similar structure adapted for Android design guidelines
    {
      title: "Bem-vindos à Comunidade Portuguesa",
      description: "Beautiful onboarding with Material Design and Portuguese elements",
      features: ["Portuguese cultural colors", "Heritage selection", "Inclusive messaging"],
      screen_type: "onboarding"
    },
    {
      title: "Eventos Culturais Portugueses",
      description: "Discover authentic events with clean Material Design",
      features: ["Event filtering", "Cultural categories", "Map integration"],
      screen_type: "events"
    },
    {
      title: "Matches Culturalmente Compatíveis",
      description: "Connect with Portuguese speakers using cultural matching",
      features: ["Compatibility algorithms", "Shared interests", "Cultural bonds"],
      screen_type: "matching"
    },
    {
      title: "Diretório de Negócios Portugueses",
      description: "Support community businesses with modern interface",
      features: ["Business search", "Verification system", "Member benefits"],
      screen_type: "directory"
    },
    {
      title: "Perfil Cultural Personalizado",
      description: "Showcase your Portuguese heritage and community involvement",
      features: ["Cultural badges", "Activity tracking", "Community stats"],
      screen_type: "profile"
    }
  ]
} as const;

// App Preview Video Scripts
export const VIDEO_SCRIPTS = {
  ios: {
    duration: "30 seconds",
    script: [
      "0-3s: Logo animation with Portuguese golden colors",
      "4-7s: Onboarding showing heritage selection (Portugal, Brazil, Cape Verde, etc.)",
      "8-12s: Events screen showing Fado night and Santos Populares",
      "13-17s: Matching screen with cultural compatibility scores",
      "18-22s: Business directory showcasing Portuguese restaurants and services",
      "23-27s: Community features and cultural celebrations",
      "28-30s: 'Join thousands of Portuguese speakers' with download CTA"
    ],
    voiceover_en: "Connect with your Portuguese community across the UK. Discover authentic events, meet compatible matches, and support local Portuguese businesses. LusoTown - Your Portuguese family awaits.",
    voiceover_pt: "Conecte-se com a sua comunidade portuguesa em todo o Reino Unido. Descubra eventos autênticos, conheça matches compatíveis e apoie negócios portugueses locais. LusoTown - A sua família portuguesa espera."
  },
  android: {
    duration: "30 seconds", 
    script: [
      "0-3s: Animated Portuguese tile patterns forming LusoTown logo",
      "4-8s: Smooth onboarding flow with Lusophone nation selection",
      "9-13s: Events discovery with beautiful Portuguese cultural imagery",
      "14-18s: Smart matching showcasing cultural connections",
      "19-23s: Business directory with Portuguese authenticity verification",
      "24-27s: Community celebration montage",
      "28-30s: 'Disponível agora - Download grátis' call-to-action"
    ]
  }
} as const;

// Marketing Campaign Configuration
export const MARKETING_CAMPAIGNS = {
  pre_launch: {
    duration: "4 weeks before launch",
    channels: ["Portuguese cultural centers", "University partnerships", "Social media"],
    content_themes: [
      "Coming soon: Your digital Portuguese community",
      "Beta signup for exclusive early access",
      "Portuguese university student previews",
      "Cultural ambassador program recruitment"
    ],
    kpis: ["Email signups", "Social media engagement", "Beta user acquisition"]
  },
  launch_week: {
    duration: "Launch week",
    channels: ["All available channels", "Paid advertising", "Influencer partnerships"],
    content_themes: [
      "LusoTown is live! Join your community",
      "Free download - Connect with Portuguese speakers",
      "Authentic Portuguese experiences await",
      "Student discounts and university partnerships"
    ],
    promotions: [
      "Free premium trial for first 1000 users",
      "Student discount campaigns at partner universities",
      "Portuguese business partnership launch offers"
    ],
    kpis: ["App downloads", "User registrations", "DAU (Daily Active Users)"]
  }
} as const;

// Portuguese Cultural Organizations Partnership
export const CULTURAL_PARTNERSHIPS = {
  london: [
    {
      name: "Instituto Camões Centre London",
      type: "Official Portuguese Cultural Institution",
      partnership_level: "Strategic",
      collaboration_areas: ["Cultural events", "Language programs", "Community outreach"],
      contact: "londres@instituto-camoes.pt"
    },
    {
      name: "Centro Cultural Português de Londres", 
      type: "Community Cultural Center",
      partnership_level: "Community",
      collaboration_areas: ["Local events", "Community support", "Cultural workshops"],
      contact: "info@centroculturalportugues.org.uk"
    },
    {
      name: "Casa do Brasil in London",
      type: "Brazilian Cultural Center",
      partnership_level: "Elite",
      collaboration_areas: ["Business networking", "Cultural events", "Premium experiences"],
      contact: "info@casadobrasil.org.uk"
    }
  ]
} as const;

// Launch Timeline and Milestones
export const LAUNCH_TIMELINE = {
  "Week -4": {
    milestone: "Pre-launch Marketing Campaign",
    deliverables: [
      "Social media campaign launch",
      "Portuguese cultural center partnerships",
      "University student group engagement",
      "Beta user recruitment"
    ],
    success_metrics: ["500+ email signups", "Social media buzz", "University partnerships confirmed"]
  },
  "Week -2": {
    milestone: "App Store Submission",
    deliverables: [
      "iOS App Store submission complete",
      "Google Play Store submission complete", 
      "Marketing materials finalized",
      "PR campaign preparation"
    ],
    success_metrics: ["Apps submitted", "Marketing assets approved", "Media contacts confirmed"]
  },
  "Week 0": {
    milestone: "Official Launch",
    deliverables: [
      "Simultaneous iOS and Android launch",
      "Press release distribution",
      "Social media launch campaign",
      "Community event celebrations"
    ],
    success_metrics: ["1000+ downloads Day 1", "Media coverage", "Community engagement"]
  }
} as const;

export default {
  ASO_KEYWORDS,
  APP_STORE_DESCRIPTIONS,
  SCREENSHOT_CONCEPTS,
  VIDEO_SCRIPTS,
  MARKETING_CAMPAIGNS,
  CULTURAL_PARTNERSHIPS,
  LAUNCH_TIMELINE
};