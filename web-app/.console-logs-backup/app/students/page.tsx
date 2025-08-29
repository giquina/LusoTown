'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import { communityStats } from '@/config/community'
import { SUBSCRIPTION_PLANS, STUDENT_PRICING, formatPrice } from '@/config/pricing'
import { IMAGES, UNIVERSITY_URLS } from '@/config/cdn'

import dynamic from 'next/dynamic'

// Dynamic imports for heavy student components to improve performance
const StudentEventsSection = dynamic(() => import('@/components/students/StudentEventsSection'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />,
  ssr: false
})

const AcademicNetworkingSection = dynamic(() => import('@/components/students/AcademicNetworkingSection'), {
  loading: () => <div className="h-48 bg-gray-100 animate-pulse rounded-xl" />,
  ssr: false
})

const CareerHubSection = dynamic(() => import('@/components/students/CareerHubSection'), {
  loading: () => <div className="h-56 bg-gray-100 animate-pulse rounded-xl" />,
  ssr: false
})

const StudentDiscountsSection = dynamic(() => import('@/components/students/StudentDiscountsSection'), {
  loading: () => <div className="h-40 bg-gray-100 animate-pulse rounded-xl" />,
  ssr: false
})

const AccommodationSupportSection = dynamic(() => import('@/components/students/AccommodationSupportSection'), {
  loading: () => <div className="h-44 bg-gray-100 animate-pulse rounded-xl" />,
  ssr: false
})

const StudentBenefitsShowcase = dynamic(() => import('@/components/students/StudentBenefitsShowcase'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-xl" />,
  ssr: false
})

const UniversityPartnershipDashboard = dynamic(() => import('@/components/students/UniversityPartnershipDashboard'), {
  loading: () => <div className="h-screen bg-gray-100 animate-pulse rounded-xl" />,
  ssr: false
})
import { 
  AcademicCapIcon,
  StarIcon,
  UsersIcon,
  CalendarDaysIcon,
  GlobeAltIcon,
  CheckBadgeIcon,
  CurrencyPoundIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  HeartIcon,
  SparklesIcon,
  TrophyIcon,
  ArrowRightIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  LinkIcon,
  BanknotesIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  PresentationChartLineIcon,
  BriefcaseIcon,
  LanguageIcon
} from '@heroicons/react/24/outline'
import { CheckIcon as CheckIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { LusophoneCarousel, CAROUSEL_CONFIGS, AUTO_ADVANCE_TIMINGS } from '@/components/carousels'

// Import new enhanced components
import LusophoneFlagGrid from '@/components/students/LusophoneFlagGrid'
import CulturalEventCards from '@/components/students/CulturalEventCards'
import StudentJourneyVisualization from '@/components/students/StudentJourneyVisualization'
import AccommodationHostFamilies from '@/components/students/AccommodationHostFamilies'
import SuccessStoriesCarousel from '@/components/students/SuccessStoriesCarousel'

interface University {
  id: string
  name: string
  namePortuguese: string
  location: string
  type: 'russell_group' | 'london_university' | 'red_brick' | 'modern' | 'specialist'
  hasPortugueseProgram: boolean
  partnershipLevel: 'strategic' | 'official' | 'community' | 'pending'
  studentPopulation: number
  internationalStudents: number
  portugueseStudents: number
  programs: {
    undergraduate: string[]
    postgraduate: string[]
    research: string[]
    languageCourses: string[]
  }
  benefits: string[]
  website: string
  contact: {
    name: string
    title: string
    email: string
    phone: string
  }
  logo?: string
}

interface StudentBenefit {
  id: string
  title: string
  titlePortuguese: string
  description: string
  descriptionPortuguese: string
  category: 'academic' | 'cultural' | 'professional' | 'social' | 'financial'
  discountAmount?: string
  eligibility: string[]
  verificationRequired: boolean
  value: string
}

interface StudentEvent {
  id: string
  title: string
  titlePortuguese: string
  type: 'workshop' | 'networking' | 'cultural' | 'academic' | 'career'
  date: string
  time: string
  location: string
  university?: string
  price: number
  originalPrice?: number
  capacity: number
  description: string
  speakers: string[]
  isStudentExclusive: boolean
}

const UNIVERSITIES: University[] = [
  {
    id: 'ucl',
    name: 'University College London (UCL)',
    namePortuguese: 'Universidade College Londres',
    location: 'London',
    type: 'russell_group',
    hasPortugueseProgram: true,
    partnershipLevel: 'strategic',
    studentPopulation: 43800,
    internationalStudents: 22000,
    portugueseStudents: 420,
    programs: {
      undergraduate: ['Lusophone & Brazilian Studies', 'Modern Languages with Lusophone', 'International Business with Lusophone'],
      postgraduate: ['Lusophone Literature MA', 'Lusophone Studies MA', 'Brazilian Cultural Studies MA'],
      research: ['Lusophone Language PhD', 'Lusophone Literature PhD', 'Lusophone History PhD'],
      languageCourses: ['Lusophone A1-C2', 'Business Lusophone', 'Lusophone for Heritage Speakers']
    },
    benefits: [
      '50% discount on LusoTown membership (£9.99/month)',
      'Priority access to Lusophone cultural events',
      'Free Portuguese language exchange sessions',
      'Career mentorship with Lusophone professionals',
      'Exclusive networking events with Lusophone Alumni'
    ],
    website: UNIVERSITY_URLS.ucl,
    contact: {
      name: 'Dr. Maria Fernandes',
      title: 'Lusophone Studies Coordinator & LusoTown Liaison',
      email: 'portuguese.studies@ucl.ac.uk',
      phone: '+44 20 7679 2000'
    }
  },
  {
    id: 'kings-college',
    name: 'King\'s College London',
    namePortuguese: 'Faculdade do Rei de Londres',
    location: 'London',
    type: 'russell_group',
    hasPortugueseProgram: true,
    partnershipLevel: 'strategic',
    studentPopulation: 31000,
    internationalStudents: 15500,
    portugueseStudents: 380,
    programs: {
      undergraduate: ['Lusophone Studies', 'Comparative Literature with Lusophone', 'European Studies with Lusophone'],
      postgraduate: ['Lusophone & Brazilian Studies MA', 'Digital Humanities with Lusophone Sources MA'],
      research: ['Lusophone Cultural Studies PhD', 'Lusophone Digital Humanities PhD'],
      languageCourses: ['Lusophone Language & Culture', 'Advanced Lusophone Communication', 'Lusophone Translation Studies']
    },
    benefits: [
      '50% discount on LusoTown membership',
      'Free access to Instituto Camões events',
      'Portuguese business networking opportunities',
      'Study abroad support for Portugal/Brazil',
      'Career services with Lusophone connections'
    ],
    website: UNIVERSITY_URLS.kcl,
    contact: {
      name: 'Prof. João Silva',
      title: 'Head of Lusophone Department',
      email: 'portuguese@kcl.ac.uk',
      phone: '+44 20 7836 5454'
    }
  },
  {
    id: 'oxford',
    name: 'University of Oxford',
    namePortuguese: 'Universidade de Oxford',
    location: 'Oxford',
    type: 'russell_group',
    hasPortugueseProgram: true,
    partnershipLevel: 'official',
    studentPopulation: 24500,
    internationalStudents: 11500,
    portugueseStudents: 95,
    programs: {
      undergraduate: ['Lusophone', 'Modern Languages (Lusophone)', 'Lusophone & Linguistics'],
      postgraduate: ['Lusophone Studies MPhil', 'Comparative Literature & Criticism'],
      research: ['Lusophone Literature DPhil', 'Lusophone Studies DPhil'],
      languageCourses: ['Lusophone Language (all levels)', 'Lusophone Literature & Culture']
    },
    benefits: [
      '50% discount on LusoTown membership',
      'Access to Oxford Lusophone Society',
      'Lusophone academic conferences',
      'Research collaboration opportunities',
      'Alumni network in Portuguese-speaking countries'
    ],
    website: UNIVERSITY_URLS.oxford,
    contact: {
      name: 'Dr. Ana Rebelo',
      title: 'Lecturer in Lusophone Literature',
      email: 'portuguese@ox.ac.uk',
      phone: '+44 1865 270000'
    }
  },
  {
    id: 'cambridge',
    name: 'University of Cambridge',
    namePortuguese: 'Universidade de Cambridge',
    location: 'Cambridge',
    type: 'russell_group',
    hasPortugueseProgram: true,
    partnershipLevel: 'official',
    studentPopulation: 23200,
    internationalStudents: 8900,
    portugueseStudents: 85,
    programs: {
      undergraduate: ['Modern & Medieval Languages (Lusophone)', 'Lusophone Studies'],
      postgraduate: ['Lusophone Literature MPhil', 'Romance Linguistics MPhil'],
      research: ['Lusophone Language & Literature PhD', 'Comparative Romance Studies PhD'],
      languageCourses: ['Lusophone Language (Beginner to Advanced)', 'Lusophone Cultural Studies']
    },
    benefits: [
      '50% discount on LusoTown membership',
      'Cambridge Lusophone Society membership',
      'Academic Portuguese language support',
      'Research funding for Lusophone studies',
      'International exchange program support'
    ],
    website: UNIVERSITY_URLS.cambridge,
    contact: {
      name: 'Dr. Carlos Mendes',
      title: 'Director of Lusophone Studies',
      email: 'portuguese@cam.ac.uk',
      phone: '+44 1223 337733'
    }
  },
  {
    id: 'lse',
    name: 'London School of Economics',
    namePortuguese: 'Escola de Economia de Londres',
    location: 'London',
    type: 'specialist',
    hasPortugueseProgram: false,
    partnershipLevel: 'community',
    studentPopulation: 12000,
    internationalStudents: 7200,
    portugueseStudents: 340,
    programs: {
      undergraduate: ['International Relations', 'Economics', 'Government & Politics'],
      postgraduate: ['Development Studies', 'International Political Economy', 'European Studies'],
      research: ['Latin American Studies PhD', 'Development Economics PhD'],
      languageCourses: ['Lusophone for Business', 'Lusophone for Social Scientists']
    },
    benefits: [
      '50% discount on LusoTown membership',
      'Portuguese business networking events',
      'Career services for Lusophone market',
      'Lusophone economist speaker series',
      'Brazil-United Kingdom business connections'
    ],
    website: UNIVERSITY_URLS.lse,
    contact: {
      name: 'Dr. Ricardo Costa',
      title: 'Latin American Studies Programme Director',
      email: 'latin.american@lse.ac.uk',
      phone: '+44 20 7405 7686'
    }
  },
  {
    id: 'imperial',
    name: 'Imperial College London',
    namePortuguese: 'Faculdade Imperial de Londres',
    location: 'London',
    type: 'specialist',
    hasPortugueseProgram: false,
    partnershipLevel: 'community',
    studentPopulation: 17000,
    internationalStudents: 10000,
    portugueseStudents: 280,
    programs: {
      undergraduate: ['Engineering', 'Computer Science', 'Natural Sciences', 'Medicine'],
      postgraduate: ['Business School Programs', 'Engineering Masters', 'Data Science'],
      research: ['Engineering PhD', 'Computer Science PhD', 'Medical Sciences PhD'],
      languageCourses: ['Lusophone for Engineers', 'Technical Lusophone Communication']
    },
    benefits: [
      '50% discount on LusoTown membership',
      'Lusophone tech networking events',
      'Career support for Lusophone tech sector',
      'Lusophone startup ecosystem connections',
      'Research collaboration with Lusophone institutions'
    ],
    website: UNIVERSITY_URLS.imperial,
    contact: {
      name: 'Dr. Miguel Santos',
      title: 'International Student Support Coordinator',
      email: 'international@imperial.ac.uk',
      phone: '+44 20 7589 5111'
    }
  },
  {
    id: 'manchester',
    name: 'University of Manchester',
    namePortuguese: 'Universidade de Manchester',
    location: 'Manchester',
    type: 'red_brick',
    hasPortugueseProgram: true,
    partnershipLevel: 'official',
    studentPopulation: 40000,
    internationalStudents: 12000,
    portugueseStudents: 290,
    programs: {
      undergraduate: ['Spanish & Lusophone Studies', 'Modern Languages with Lusophone'],
      postgraduate: ['Hispanic & Lusophone Studies MA', 'Translation & Interpretation Studies'],
      research: ['Lusophone Literature PhD', 'Comparative Literature PhD'],
      languageCourses: ['Lusophone Language & Culture', 'Business Lusophone for International Trade']
    },
    benefits: [
      '50% discount on LusoTown membership',
      'Manchester Lusophone Society support',
      'Northern Portuguese-speaking community connections',
      'Lusophone cultural event organization support',
      'Mentorship with Lusophone alumni network'
    ],
    website: UNIVERSITY_URLS.manchester,
    contact: {
      name: 'Dr. Luisa Rodrigues',
      title: 'Lusophone Studies Programme Leader',
      email: 'portuguese@manchester.ac.uk',
      phone: '+44 161 275 2000'
    }
  },
  {
    id: 'edinburgh',
    name: 'University of Edinburgh',
    namePortuguese: 'Universidade de Edimburgo',
    location: 'Edinburgh',
    type: 'russell_group',
    hasPortugueseProgram: true,
    partnershipLevel: 'official',
    studentPopulation: 35000,
    internationalStudents: 15000,
    portugueseStudents: 180,
    programs: {
      undergraduate: ['Lusophone Studies', 'Hispanic Studies with Lusophone', 'Comparative Literature'],
      postgraduate: ['Lusophone Studies MSc', 'Celtic & Scottish Studies with Lusophone connections'],
      research: ['Lusophone Cultural Studies PhD', 'Comparative Celtic-Lusophone Studies PhD'],
      languageCourses: ['Lusophone Language (All Levels)', 'Lusophone Cultural Immersion']
    },
    benefits: [
      '50% discount on LusoTown membership',
      'Edinburgh Lusophone Society partnership',
      'Scottish-Lusophone cultural exchange',
      'Research funding for Lusophone studies',
      'Virtual connection to London Portuguese-speaking community'
    ],
    website: UNIVERSITY_URLS.edinburgh,
    contact: {
      name: 'Dr. Fernando Alves',
      title: 'Senior Lecturer in Lusophone Studies',
      email: 'portuguese@ed.ac.uk',
      phone: '+44 131 650 1000'
    }
  }
]

const STUDENT_BENEFITS: StudentBenefit[] = [
  {
    id: 'membership-discount',
    title: '50% Student Discount on Community Membership',
    titlePortuguese: '50% Desconto Estudante na Adesão Comunidade',
    description: `Exclusive 50% discount on LusoTown Community membership for verified students. Pay only ${formatPrice(STUDENT_PRICING.community.monthly)}/month instead of ${formatPrice(SUBSCRIPTION_PLANS.community.monthly)} for full community access.`,
    descriptionPortuguese: `Desconto exclusivo de 50% na adesão Comunidade LusoTown para estudantes verificados. Pague apenas ${formatPrice(STUDENT_PRICING.community.monthly)}/mês em vez de ${formatPrice(SUBSCRIPTION_PLANS.community.monthly)} por acesso completo à comunidade.`,
    category: 'financial',
    discountAmount: '50%',
    eligibility: ['Current university students', 'Valid .ac.uk email required', 'Student ID verification'],
    verificationRequired: true,
    value: '£9.99 savings per year'
  },
  {
    id: 'language-exchange',
    title: 'Free Lusophone Language Exchange Programs',
    titlePortuguese: 'Programas Gratuitos de Intercâmbio de Língua Portuguesa',
    description: 'Weekly language exchange sessions with native speakers from all Portuguese-speaking countries - from Lisbon to São Paulo, Luanda to Praia. Experience diverse accents, cultural expressions, and regional variations.',
    descriptionPortuguese: 'Sessões semanais de intercâmbio linguístico com falantes nativos de todos os países lusófonos - de Lisboa a São Paulo, Luanda à Praia. Experiencie sotaques diversos, expressões culturais e variações regionais.',
    category: 'academic',
    eligibility: ['University students', 'All Lusophone levels welcome', 'All Lusophone backgrounds'],
    verificationRequired: true,
    value: '£200 equivalent value'
  },
  {
    id: 'career-mentorship',
    title: 'Lusophone Professional Mentorship Program',
    titlePortuguese: 'Programa de Mentoria Profissional Lusófona',
    description: 'One-on-one mentorship with established Portuguese-speaking professionals from your cultural background - whether São Paulo business leaders, Luanda entrepreneurs, or Lusophone tech innovators. Find your mentor from any Portuguese-speaking nation.',
    descriptionPortuguese: 'Mentoria individual com profissionais lusófonos estabelecidos da sua origem cultural - sejam líderes empresariais de São Paulo, empresários de Luanda, ou inovadores tecnológicos portugueses. Encontre o seu mentor de qualquer nação lusófona.',
    category: 'professional',
    eligibility: ['Final year students', 'Recent graduates', 'All academic disciplines', 'All Lusophone backgrounds'],
    verificationRequired: true,
    value: '£300+ equivalent value'
  },
  {
    id: 'study-groups',
    title: 'Lusophone Student Study Groups',
    titlePortuguese: 'Grupos de Estudo de Estudantes Lusófonos',
    description: 'Subject-specific study groups connecting Portuguese-speaking students across United Kingdom universities. From Brazilian study groups to Lusophone academic workshops - collaborate with students who share your cultural background and language.',
    descriptionPortuguese: 'Grupos de estudo específicos por disciplina conectando estudantes lusófonos em universidades do Reino Unido. De grupos de estudo brasileiros a workshops acadêmicos portugueses - colabore com estudantes que partilham a sua origem cultural e linguística.',
    category: 'academic',
    eligibility: ['University students', 'All subjects welcome', 'All Lusophone backgrounds'],
    verificationRequired: true,
    value: 'Free collaboration platform'
  },
  {
    id: 'cultural-events',
    title: 'Student-Exclusive Lusophone Cultural Events',
    titlePortuguese: 'Eventos Culturais Lusófonos Exclusivos para Estudantes',
    description: 'Monthly multicultural events celebrating all Portuguese-speaking nations: Lusophone Music nights (Fado, Samba, Kizomba), Brazilian carnival celebrations, Angolan traditional dance, Cape Verdean morna evenings, and pan-Lusophone festivals.',
    descriptionPortuguese: 'Eventos multiculturais mensais celebrando todas as nações lusófonas: noites de Música Lusófona (Fado, Samba, Kizomba), celebrações de carnaval brasileiro, dança tradicional angolana, noites de morna cabo-verdiana e festivais pan-lusófonos.',
    category: 'cultural',
    eligibility: ['University students', 'Student verification required', 'All Lusophone backgrounds welcome'],
    verificationRequired: true,
    value: 'Monthly multicultural programming'
  },
  {
    id: 'internship-opportunities',
    title: 'Lusophone Business Internship Network',
    titlePortuguese: 'Rede de Estágios em Negócios Lusófonos',
    description: 'Exclusive access to internship opportunities with Portuguese-speaking businesses in London, United Kingdom, Portugal, Brazil, Angola, and other Lusophone markets. Gain professional experience in culturally familiar environments.',
    descriptionPortuguese: 'Acesso exclusivo a oportunidades de estágio com empresas lusófonas em Londres, Reino Unido, Portugal, Brasil, Angola e outros mercados lusófonos. Ganhe experiência profissional em ambientes culturalmente familiares.',
    category: 'professional',
    eligibility: ['University students', 'Recent graduates', 'All disciplines considered', 'All Lusophone backgrounds'],
    verificationRequired: true,
    value: 'Global career opportunities'
  },
  {
    id: 'academic-support',
    title: 'Lusophone Academic Support Services',
    titlePortuguese: 'Serviços de Apoio Acadêmico Lusófono',
    description: 'Academic writing support, research guidance, and dissertation help for any Lusophone-related studies. Connect with academic mentors specializing in Lusophone, Brazilian, Angolan, Cape Verdean, and other Lusophone academic fields.',
    descriptionPortuguese: 'Apoio à escrita acadêmica, orientação de pesquisa e ajuda com dissertações para estudos relacionados com qualquer área lusófona. Conecte-se com mentores acadêmicos especializados em áreas acadêmicas portuguesas, brasileiras, angolanas, cabo-verdianas e outras lusófonas.',
    category: 'academic',
    eligibility: ['Students in Lusophone studies', 'Portuguese-speaking research students', 'Any Lusophone-related academic work'],
    verificationRequired: true,
    value: 'Specialized multicultural guidance'
  },
  {
    id: 'networking-events',
    title: 'Lusophone Professional Networking Events',
    titlePortuguese: 'Eventos de Networking Profissional Lusófono',
    description: 'Quarterly networking events connecting students with Portuguese-speaking professionals, entrepreneurs, and recent graduates from all 10 Lusophone countries. Build meaningful connections with professionals who understand your cultural background.',
    descriptionPortuguese: 'Eventos trimestrais de networking conectando estudantes com profissionais lusófonos, empresários e recém-graduados dos 10 países lusófonos. Construa conexões significativas com profissionais que compreendem a sua origem cultural.',
    category: 'professional',
    eligibility: ['University students', 'All years and disciplines', 'All Lusophone backgrounds'],
    verificationRequired: true,
    value: 'Multicultural professional network'
  },
  {
    id: 'live-streams',
    title: 'Student-Only Live Stream Content',
    titlePortuguese: 'Conteúdo de Transmissão ao Vivo Exclusivo para Estudantes',
    description: 'Weekly live streams covering study tips, career advice, Portuguese culture, and academic life in the United Kingdom. Interactive Q&A sessions with experts.',
    descriptionPortuguese: 'Transmissões ao vivo semanais cobrindo dicas de estudo, conselhos de carreira, cultura portuguesa e vida acadêmica no Reino Unido. Sessões interativas de perguntas e respostas com especialistas.',
    category: 'academic',
    eligibility: ['University students', 'Portuguese-speaking community interest'],
    verificationRequired: true,
    value: 'Weekly educational content'
  },
  {
    id: 'study-abroad',
    title: 'Portugal Study Abroad Support Program',
    titlePortuguese: 'Programa de Apoio a Estudos no Estrangeiro em Portugal',
    description: 'Comprehensive support for students planning to study in Portugal: university connections, accommodation help, cultural preparation, and ongoing support.',
    descriptionPortuguese: 'Apoio abrangente para estudantes que planeiam estudar em Portugal: conexões universitárias, ajuda com alojamento, preparação cultural e apoio contínuo.',
    category: 'academic',
    eligibility: ['Students planning Portugal exchange', 'Portuguese language students', 'Erasmus+ participants'],
    verificationRequired: true,
    value: 'Complete study abroad support'
  }
]

const STUDENT_EVENTS: StudentEvent[] = [
  {
    id: 'career-workshop-tech',
    title: 'Lusophone Tech Career Workshop',
    titlePortuguese: 'Workshop de Carreira em Tecnologia Portuguesa',
    type: 'career',
    date: '2024-09-15',
    time: '14:00',
    location: 'Imperial College London',
    university: 'Imperial College London',
    price: 0,
    originalPrice: 25,
    capacity: 40,
    description: 'Explore career opportunities in Portugal\'s booming tech sector. Learn about Lusophone startups, multinational tech companies, and remote work opportunities.',
    speakers: ['Ana Silva - CTO at Lusophone Startup', 'Miguel Costa - Google Portugal', 'Joana Fernandes - Startup Founder'],
    isStudentExclusive: true
  },
  {
    id: 'portuguese-film-night',
    title: 'Lusophone Cinema Student Night',
    titlePortuguese: 'Noite de Cinema Português para Estudantes',
    type: 'cultural',
    date: '2024-09-20',
    time: '19:00',
    location: 'King\'s College London - Cinema',
    university: 'King\'s College London',
    price: 5,
    originalPrice: 15,
    capacity: 80,
    description: 'Monthly Lusophone film screening followed by discussion with Lusophone studies students and film experts. This month: contemporary Lusophone cinema.',
    speakers: ['Dr. Maria Fernandes - Lusophone Studies', 'Carlos Mendes - Film Critic'],
    isStudentExclusive: true
  },
  {
    id: 'networking-business',
    title: 'Student-Professional Networking Mixer',
    titlePortuguese: 'Mixer de Networking Estudante-Profissional',
    type: 'networking',
    date: '2024-09-25',
    time: '18:30',
    location: 'Portugal-United Kingdom Chamber of Commerce',
    price: 10,
    originalPrice: 35,
    capacity: 60,
    description: 'Connect with Lusophone professionals across industries. Practice networking skills, learn about career paths, and discover internship opportunities.',
    speakers: ['Multiple Lusophone professionals from various industries'],
    isStudentExclusive: false
  },
  {
    id: 'study-abroad-info',
    title: 'Study in Portugal Information Session',
    titlePortuguese: 'Sessão de Informação Estudar em Portugal',
    type: 'academic',
    date: '2024-10-02',
    time: '16:00',
    location: 'UCL - Lusophone Studies Department',
    university: 'University College London',
    price: 0,
    capacity: 50,
    description: 'Learn about study abroad opportunities in Portugal, Erasmus+ programs, Lusophone universities, and cultural preparation for your exchange.',
    speakers: ['Lusophone Embassy Education Attaché', 'Erasmus+ Coordinator', 'Student Exchange Alumni'],
    isStudentExclusive: true
  },
  {
    id: 'portuguese-startup-pitch',
    title: 'Lusophone Startup Pitch Competition',
    titlePortuguese: 'Competição de Pitch de Startups Portuguesas',
    type: 'career',
    date: '2024-10-10',
    time: '13:00',
    location: 'LSE - Entrepreneurship Hub',
    university: 'London School of Economics',
    price: 0,
    capacity: 100,
    description: 'Student entrepreneurs pitch their business ideas to Lusophone investors and successful entrepreneurs. Win mentorship and potential funding.',
    speakers: ['Lusophone Angel Investors', 'Successful Lusophone Entrepreneurs', 'Business Mentors'],
    isStudentExclusive: true
  },
  {
    id: 'lusophone-music-workshop',
    title: 'Lusophone Music Workshop: Fado, Samba & Kizomba',
    titlePortuguese: 'Workshop de Música Lusófona: Fado, Samba e Kizomba',
    type: 'cultural',
    date: '2024-10-15',
    time: '19:30',
    location: 'Instituto Camões Centre London',
    price: 8,
    originalPrice: 25,
    capacity: 50,
    description: 'Explore the rich musical heritage of Portuguese-speaking countries! Learn Fado from Portugal 🇵🇹, Samba from Brazil 🇧🇷, and Kizomba from Angola 🇦🇴. Workshop includes instruments, dance basics, and cultural history.',
    speakers: ['Maria João - Professional Fadista (Portugal)', 'Carlos Silva - Samba Musician (Brazil)', 'Ana Santos - Kizomba Dance Teacher (Angola)'],
    isStudentExclusive: true
  }
]

export default function StudentsPage() {
  const { language, t } = useLanguage()
  const [selectedUniversityType, setSelectedUniversityType] = useState<string>('all')
  const [selectedBenefitCategory, setSelectedBenefitCategory] = useState<string>('all')
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [verificationStep, setVerificationStep] = useState(1)
  const [emailVerified, setEmailVerified] = useState(false)

  const filteredUniversities = selectedUniversityType === 'all' 
    ? UNIVERSITIES 
    : UNIVERSITIES.filter(uni => uni.type === selectedUniversityType)

  const filteredBenefits = selectedBenefitCategory === 'all' 
    ? STUDENT_BENEFITS 
    : STUDENT_BENEFITS.filter(benefit => benefit.category === selectedBenefitCategory)

  const universityTypes = [
    { value: 'all', label: { en: 'All Universities', pt: 'Todas as Universidades' } },
    { value: 'russell_group', label: { en: 'Russell Group', pt: 'Grupo Russell' } },
    { value: 'london_university', label: { en: 'London Universities', pt: 'Universidades de Londres' } },
    { value: 'red_brick', label: { en: 'Red Brick', pt: 'Red Brick' } },
    { value: 'specialist', label: { en: 'Specialist', pt: 'Especializadas' } }
  ]

  const benefitCategories = [
    { value: 'all', label: { en: 'All Benefits', pt: 'Todos os Benefícios' } },
    { value: 'financial', label: { en: 'Financial', pt: 'Financeiros' } },
    { value: 'academic', label: { en: 'Academic', pt: 'Acadêmicos' } },
    { value: 'professional', label: { en: 'Professional', pt: 'Profissionais' } },
    { value: 'cultural', label: { en: 'Cultural', pt: 'Culturais' } },
    { value: 'social', label: { en: 'Social', pt: 'Sociais' } }
  ]

  const handleVerification = () => {
    setShowVerificationModal(true)
  }

  const handleEmailVerification = () => {
    setEmailVerified(true)
    setVerificationStep(2)
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url('${IMAGES.backgrounds.universityStudents}')` }}></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 via-transparent to-secondary-900/10"></div>
          <div className="relative container-width py-16 lg:py-24">
            <div className="text-center max-w-4xl mx-auto">
              {/* PALOP Student Recognition Banner */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white px-6 py-3 rounded-full font-bold text-sm shadow-xl">
                  <GlobeAltIcon className="w-5 h-5" />
                  <span>{t('palop.students.support', 'PALOP Student Support Network')}</span>
                  <div className="flex gap-1">
                    <span className="text-xs">🇦🇴🇨🇻🇬🇼🇲🇿🇸🇹</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-primary-100 via-secondary-50 to-accent-100 border border-primary-200 shadow-lg">
                  <AcademicCapIcon className="w-4 h-4 mr-2 text-secondary-600" />
                  <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent font-bold">
                    {language === 'pt'
                      ? "Estudantes Lusófonos • 8 Universidades Parceiras"
                      : "Lusophone Students • 8 Partner Universities"}
                  </span>
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight"
              >
                {/* Desktop full title */}
                <span className="hidden sm:block">
                  {language === 'pt' ? (
                    <>
                      Estudantes de língua portuguesa em
                      <br />
                      <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                        universidades do Reino Unido
                      </span>
                    </>
                  ) : (
                    <>
                      Portuguese-speaking students at
                      <br />
                      <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                        United Kingdom universities
                      </span>
                    </>
                  )}
                </span>
                {/* Mobile short title */}
                <span className="sm:hidden">
                  {language === 'pt' ? (
                    <>
                      Estudantes
                      <br />
                      <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                        Lusófonos
                      </span>
                    </>
                  ) : (
                    <>
                      Lusophone
                      <br />
                      <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                        Students
                      </span>
                    </>
                  )}
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-lg font-medium text-gray-700 mb-6 max-w-4xl mx-auto"
              >
                {language === 'pt' ? 
                  "Conecte-se com estudantes de Portugal 🇵🇹 Brasil 🇧🇷 Angola 🇦🇴 Cabo Verde 🇨🇻 Moçambique 🇲🇿 Guiné-Bissau 🇬🇼 São Tomé e Príncipe 🇸🇹 Timor-Leste 🇹🇱 Macau 🇲🇴 e Guiné Equatorial 🇬🇶" :
                  "Connect with students from Portugal 🇵🇹 Brazil 🇧🇷 Angola 🇦🇴 Cape Verde 🇨🇻 Mozambique 🇲🇿 Guinea-Bissau 🇬🇼 São Tomé & Príncipe 🇸🇹 East Timor 🇹🇱 Macau 🇲🇴 and Equatorial Guinea 🇬🇶"
                }
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              >
                {/* Desktop full subtitle */}
                <span className="hidden sm:block">
                  {language === 'pt'
                    ? "Conecte-se com a maior comunidade de estudantes lusófonos em universidades de Londres e do Reino Unido. Descontos exclusivos de 50%, eventos culturais autênticos dos 10 países lusófonos, networking profissional e apoio académico especializado."
                    : "Connect with the largest community of Portuguese-speaking students at London and United Kingdom universities. Exclusive 50% discounts, authentic cultural events from all 10 Lusophone countries, professional networking, and specialized academic support."}
                </span>
                {/* Mobile short subtitle */}
                <span className="sm:hidden">
                  {language === 'pt'
                    ? "Conecte-se com estudantes lusófonos em universidades do Reino Unido. Descontos exclusivos, eventos culturais multiculturais e networking profissional."
                    : "Connect with Portuguese-speaking students at United Kingdom universities. Exclusive discounts, multicultural events, and professional networking."}
                </span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
              >
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">
                    {language === 'pt'
                      ? `${communityStats.viewers} Estudantes de 10 Países Lusófonos`
                      : `${communityStats.viewers} Students from 10 Lusophone Countries`}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse"></div>
                  <span className="font-bold text-secondary-600">
                    {language === 'pt'
                      ? "50% DESCONTO - Apenas £9.99/mês"
                      : "50% OFF - Only £9.99/month"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
                  <span>
                    {language === 'pt'
                      ? "Eventos Exclusivos + Mentoria"
                      : "Exclusive Events + Mentorship"}
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              >
                <button
                  onClick={handleVerification}
                  className="relative bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white px-10 py-4 rounded-2xl font-bold hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1 group"
                >
                  <span className="flex items-center justify-center">
                    <AcademicCapIcon className="w-5 h-5 mr-2" />
                    {language === 'pt' ? "Junte-se à sua Comunidade Cultural" : "Join Your Cultural Academic Community"}
                  </span>
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                    {language === 'pt' ? "50% OFF" : "50% OFF"}
                  </div>
                </button>
                <button
                  onClick={() => document.getElementById('partner-universities')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-primary-400 text-primary-700 px-8 py-4 rounded-2xl font-semibold hover:bg-primary-50 hover:border-primary-500 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <GlobeAltIcon className="w-5 h-5 mr-2" />
                  {language === 'pt' ? "Explorar 8 Universidades Parceiras" : "Explore 8 Partner Universities"}
                </button>
              </motion.div>
              
              {/* Urgency Banner */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-orange-200 rounded-xl p-4 mb-8 text-center max-w-2xl mx-auto"
              >
                <div className="flex items-center justify-center mb-2">
                  <ClockIcon className="w-5 h-5 text-orange-600 mr-2" />
                  <span className="font-bold text-orange-800">
                    {language === 'pt' ? "Oferta Limitada para Estudantes" : "Limited Time Student Offer"}
                  </span>
                </div>
                <p className="text-sm text-orange-700">
                  {language === 'pt' 
                    ? "Verificação gratuita + 30 dias de garantia de devolução do dinheiro. Já aderiram mais de 2150+ estudantes!"
                    : "Free verification + 30-day money back guarantee. Over students already joined!"}
                </p>
              </motion.div>

              {/* Enhanced Success Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-primary-100 hover:shadow-xl transition-all duration-300">
                  <div className="text-2xl font-bold text-primary-600 mb-1 flex items-center">
                    {communityStats.viewers}
                    <span className="text-xs ml-1">🇵🇹🇧🇷🇦🇴</span>
                  </div>
                  <div className="text-xs text-gray-600 font-medium">{language === 'pt' ? 'Estudantes Lusófonos' : 'Lusophone Students'}</div>
                  <div className="text-xs text-primary-600 mt-1">{language === 'pt' ? 'De 10 países' : 'From 10 countries'}</div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-secondary-100 hover:shadow-xl transition-all duration-300">
                  <div className="text-2xl font-bold text-secondary-600 mb-1">94%</div>
                  <div className="text-xs text-gray-600 font-medium">{language === 'pt' ? 'Taxa de Sucesso' : 'Success Rate'}</div>
                  <div className="text-xs text-secondary-600 mt-1">{language === 'pt' ? 'Graduação' : 'Graduation'}</div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-accent-100 hover:shadow-xl transition-all duration-300">
                  <div className="text-2xl font-bold text-accent-600 mb-1">87%</div>
                  <div className="text-xs text-gray-600 font-medium">{language === 'pt' ? 'Colocação Career' : 'Career Placement'}</div>
                  <div className="text-xs text-accent-600 mt-1">{language === 'pt' ? '6 meses' : '6 months'}</div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-premium-100 hover:shadow-xl transition-all duration-300 relative">
                  <div className="text-2xl font-bold text-premium-600 mb-1">£9.99</div>
                  <div className="text-xs text-gray-600 font-medium">{language === 'pt' ? 'Por mês' : 'Per month'}</div>
                  <div className="text-xs text-red-600 mt-1 font-semibold">{language === 'pt' ? '50% desconto!' : '50% off!'}</div>
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                    {language === 'pt' ? 'OFERTA' : 'OFFER'}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Student Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container-width">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === 'pt' ? 'Benefícios Exclusivos para Estudantes' : 'Exclusive Student Benefits'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {language === 'pt' ?
                  'Descontos especiais, eventos exclusivos e apoio acadêmico para estudantes lusófonos de todas as 10 nações que falam português, estudando em universidades de Londres e do Reino Unido' :
                  'Special discounts, exclusive events, and academic support for Portuguese-speaking students from all 10 Lusophone nations studying at London and United Kingdom universities'
                }
              </p>

              {/* Benefit Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center mb-12">
                {benefitCategories.map(category => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedBenefitCategory(category.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedBenefitCategory === category.value
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label[language]}
                  </button>
                ))}
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredBenefits.map(benefit => (
                <div key={benefit.id} className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        benefit.category === 'financial' ? 'bg-secondary-100 text-secondary-600' :
                        benefit.category === 'academic' ? 'bg-primary-100 text-primary-600' :
                        benefit.category === 'professional' ? 'bg-premium-100 text-premium-600' :
                        benefit.category === 'cultural' ? 'bg-coral-100 text-coral-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {benefit.category === 'financial' && <BanknotesIcon className="w-6 h-6" />}
                        {benefit.category === 'academic' && <BookOpenIcon className="w-6 h-6" />}
                        {benefit.category === 'professional' && <BriefcaseIcon className="w-6 h-6" />}
                        {benefit.category === 'cultural' && <HeartIcon className="w-6 h-6" />}
                        {benefit.category === 'social' && <UsersIcon className="w-6 h-6" />}
                      </div>
                      {benefit.discountAmount && (
                        <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full text-xs font-medium">
                          {benefit.discountAmount} {language === 'pt' ? 'desconto' : 'off'}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-bold text-lg text-gray-900 mb-3">
                      {language === 'pt' ? benefit.titlePortuguese : benefit.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {language === 'pt' ? benefit.descriptionPortuguese : benefit.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {language === 'pt' ? 'Elegibilidade:' : 'Eligibility:'}
                      </div>
                      {benefit.eligibility.slice(0, 2).map((req, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-600">
                          <CheckIconSolid className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                          {req}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary-600">
                        {benefit.value}
                      </span>
                      {benefit.verificationRequired && (
                        <span className="text-xs bg-accent-100 text-accent-700 px-2 py-1 rounded-full">
                          {language === 'pt' ? 'Verificação requerida' : 'Verification required'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Value Proposition */}
            <div className="bg-gradient-to-br from-secondary-50 via-primary-50 to-accent-50 rounded-2xl p-8 text-center border border-secondary-200 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {language === 'pt' ? '🎯 Valor Excepcional para Sua Educação Cultural' : '🎯 Exceptional Value for Your Cultural Education'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl font-bold text-secondary-600 mb-2">£1,200+</div>
                  <div className="text-sm text-gray-600 mb-2">{language === 'pt' ? 'Valor anual em benefícios' : 'Annual value in benefits'}</div>
                  <div className="text-xs text-secondary-600">{language === 'pt' ? 'Mentoria + Eventos + Networking' : 'Mentorship + Events + Networking'}</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-primary-200">
                  <div className="text-4xl font-bold text-primary-600 mb-2">£9.99</div>
                  <div className="text-sm text-gray-600 mb-2">{language === 'pt' ? 'Custo mensal estudante' : 'Monthly student cost'}</div>
                  <div className="text-xs text-primary-600 font-semibold">{language === 'pt' ? '50% desconto garantido' : '50% discount guaranteed'}</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl font-bold text-accent-600 mb-2">1200%</div>
                  <div className="text-sm text-gray-600 mb-2">{language === 'pt' ? 'Retorno do investimento' : 'Return on investment'}</div>
                  <div className="text-xs text-accent-600">{language === 'pt' ? 'ROI comprovado' : 'Proven ROI'}</div>
                </div>
              </div>
              
              {/* Multiple Strong CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleVerification}
                  className="bg-gradient-to-r from-secondary-600 to-primary-600 text-white px-8 py-4 rounded-xl font-bold hover:from-secondary-700 hover:to-primary-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center"
                >
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  {language === 'pt' ? 'Começar Agora - Verificação Gratuita' : 'Start Now - Free Verification'}
                </button>
                <button
                  onClick={() => window.open('https://calendly.com/lusotown-demo', '_blank')}
                  className="border-2 border-primary-600 text-primary-700 px-6 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300 flex items-center justify-center"
                >
                  <VideoCameraIcon className="w-5 h-5 mr-2" />
                  {language === 'pt' ? 'Demo Personalizada' : 'Personal Demo'}
                </button>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                {language === 'pt' ? 
                  '✅ 30 dias garantia de devolução • ✅ Sem taxas ocultas • ✅ Cancele quando quiser' :
                  '✅ 30-day money back guarantee • ✅ No hidden fees • ✅ Cancel anytime'
                }
              </div>
            </div>
          </div>
        </section>

        {/* University Programs Carousel */}
        <section id="university-programs" className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
          <div className="container-width">
            <LusophoneCarousel
              items={[
                {
                  id: 'ucl-programs',
                  title: { en: 'University College London (UCL)', pt: 'University College London (UCL)' },
                  subtitle: { en: 'Strategic Partner • Russell Group', pt: 'Parceiro Estratégico • Grupo Russell' },
                  description: {
                    en: 'Premier London university with dedicated Portuguese Studies program, Brazilian Literature courses, and strong Lusophone student community. 180+ Portuguese-speaking students across all faculties.',
                    pt: 'Universidade de Londres de primeiro nível com programa dedicado de Estudos Portugueses, cursos de Literatura Brasileira e forte comunidade estudantil lusófona. Mais de 180 estudantes lusófonos em todas as faculdades.'
                  },
                  image: '/images/universities/ucl.jpg',
                  metadata: {
                    programs: { en: 'Portuguese Studies, Brazilian Literature, Linguistics', pt: 'Estudos Portugueses, Literatura Brasileira, Linguística' },
                    students: { en: '180+ Portuguese speakers', pt: 'Mais de 180 falantes de português' },
                    partnership: { en: 'Strategic Academic Partnership', pt: 'Parceria Académica Estratégica' },
                    support: { en: 'Portuguese Society, Academic Mentoring, Career Support', pt: 'Sociedade Portuguesa, Mentoria Académica, Apoio de Carreira' }
                  }
                },
                {
                  id: 'kings-programs',
                  title: { en: 'King\'s College London', pt: 'King\'s College London' },
                  subtitle: { en: 'Strategic Partner • Literature & Arts Focus', pt: 'Parceiro Estratégico • Foco em Literatura e Artes' },
                  description: {
                    en: 'Renowned for Comparative Literature with Portuguese focus, Modern Languages, and Cultural Studies. Strong connections to Brazilian and African Portuguese cultural institutions.',
                    pt: 'Renomado por Literatura Comparada com foco português, Línguas Modernas e Estudos Culturais. Fortes conexões com instituições culturais brasileiras e africanas portuguesas.'
                  },
                  image: '/images/universities/kings.jpg',
                  metadata: {
                    programs: { en: 'Comparative Literature, Modern Languages, Cultural Studies', pt: 'Literatura Comparada, Línguas Modernas, Estudos Culturais' },
                    students: { en: '145+ Portuguese speakers', pt: 'Mais de 145 falantes de português' },
                    specialization: { en: 'Brazilian and African Literature', pt: 'Literatura Brasileira e Africana' },
                    events: { en: 'Monthly Lusophone Literary Evenings', pt: 'Noites Literárias Lusófonas Mensais' }
                  }
                },
                {
                  id: 'imperial-programs',
                  title: { en: 'Imperial College London', pt: 'Imperial College London' },
                  subtitle: { en: 'Official Partner • STEM Excellence', pt: 'Parceiro Oficial • Excelência STEM' },
                  description: {
                    en: 'Leading STEM university with growing Portuguese-speaking engineering and tech student community. Strong links to Brazil tech sector and Portuguese innovation hubs.',
                    pt: 'Universidade STEM líder com crescente comunidade de estudantes lusófonos de engenharia e tecnologia. Fortes ligações ao setor tecnológico brasileiro e centros de inovação portugueses.'
                  },
                  image: '/images/universities/imperial.jpg',
                  metadata: {
                    programs: { en: 'Engineering, Computing, Business Tech', pt: 'Engenharia, Computação, Tecnologia Empresarial' },
                    students: { en: '120+ Portuguese speakers', pt: 'Mais de 120 falantes de português' },
                    focus: { en: 'Tech Innovation & Entrepreneurship', pt: 'Inovação Tecnológica e Empreendedorismo' },
                    networking: { en: 'Lusophone Tech Society, Startup Incubator', pt: 'Sociedade Tecnológica Lusófona, Incubadora de Startups' }
                  }
                },
                {
                  id: 'lse-programs',
                  title: { en: 'London School of Economics (LSE)', pt: 'London School of Economics (LSE)' },
                  subtitle: { en: 'Strategic Partner • Social Sciences Leader', pt: 'Parceiro Estratégico • Líder em Ciências Sociais' },
                  description: {
                    en: 'World-renowned for Economics, International Relations, and Development Studies with focus on Lusophone economies and African development.',
                    pt: 'Mundialmente reconhecido por Economia, Relações Internacionais e Estudos de Desenvolvimento com foco em economias lusófonas e desenvolvimento africano.'
                  },
                  image: '/images/universities/lse.jpg',
                  metadata: {
                    programs: { en: 'Economics, International Relations, Development Studies', pt: 'Economia, Relações Internacionais, Estudos de Desenvolvimento' },
                    students: { en: '95+ Portuguese speakers', pt: 'Mais de 95 falantes de português' },
                    research: { en: 'Lusophone Economies Research Center', pt: 'Centro de Pesquisa de Economias Lusófonas' },
                    opportunities: { en: 'PALOP Development Internships', pt: 'Estágios de Desenvolvimento PALOP' }
                  }
                }
              ]}
              title={{ en: 'University Partnership Programs', pt: 'Programas de Parcerias Universitárias' }}
              subtitle={{ en: 'Discover Portuguese-focused programs at leading UK universities', pt: 'Descubra programas focados no português nas principais universidades do Reino Unido' }}
              responsive={CAROUSEL_CONFIGS.hero}
              autoAdvance={true}
              autoAdvanceInterval={AUTO_ADVANCE_TIMINGS.showcase}
              renderItem={(university) => (
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-primary-200/50 h-full hover:shadow-3xl transition-all duration-500 group">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <BuildingLibraryIcon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
                        {university.title.en}
                      </h3>
                      <p className="text-sm font-semibold text-primary-600">
                        {university.subtitle.en}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    {university.description.en}
                  </p>
                  <div className="space-y-3">
                    {university.metadata?.programs && (
                      <div className="bg-primary-50/80 rounded-lg p-3">
                        <span className="font-semibold text-primary-700 text-xs">{t('university.programs', 'Programs')}: </span>
                        <span className="text-gray-700 text-xs">{university.metadata.programs.en}</span>
                      </div>
                    )}
                    {university.metadata?.students && (
                      <div className="bg-secondary-50/80 rounded-lg p-3">
                        <span className="font-semibold text-secondary-700 text-xs">{t('university.students', 'Students')}: </span>
                        <span className="text-gray-700 text-xs">{university.metadata.students.en}</span>
                      </div>
                    )}
                    {university.metadata?.support && (
                      <div className="bg-accent-50/80 rounded-lg p-3">
                        <span className="font-semibold text-accent-700 text-xs">{t('university.support', 'Support')}: </span>
                        <span className="text-gray-700 text-xs">{university.metadata.support.en}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <button className="w-full py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-300">
                      {t('university.learnMore', 'Learn More')}
                    </button>
                  </div>
                </div>
              )}
            />
          </div>
        </section>

        {/* Student Events Carousel */}
        <section className="py-20 bg-gradient-to-br from-secondary-50 via-white to-accent-50">
          <div className="container-width">
            <LusophoneCarousel
              items={[
                {
                  id: 'tech-workshop',
                  title: { en: 'Lusophone Tech Career Workshop', pt: 'Workshop de Carreira Tecnológica Lusófona' },
                  subtitle: { en: 'Professional Development • Imperial College', pt: 'Desenvolvimento Profissional • Imperial College' },
                  description: {
                    en: 'Connect with Portuguese-speaking tech professionals working at London startups and global companies. CV reviews, interview prep, and networking with Brazilian, Portuguese, and African tech leaders.',
                    pt: 'Conecte-se com profissionais de tecnologia lusófonos trabalhando em startups de Londres e empresas globais. Revisão de CV, preparação para entrevistas e networking com líderes tecnológicos brasileiros, portugueses e africanos.'
                  },
                  image: '/images/events/tech-workshop.jpg',
                  metadata: {
                    date: { en: 'October 25, 2024', pt: '25 de Outubro de 2024' },
                    time: { en: '6:00 PM - 9:00 PM', pt: '18:00 - 21:00' },
                    location: { en: 'Imperial College Business School', pt: 'Imperial College Business School' },
                    price: { en: 'FREE for students', pt: 'GRATUITO para estudantes' },
                    attendees: { en: '45 registered', pt: '45 inscritos' }
                  }
                },
                {
                  id: 'academic-network',
                  title: { en: 'Academic Excellence Network', pt: 'Rede de Excelência Académica' },
                  subtitle: { en: 'Study Groups • Multiple Universities', pt: 'Grupos de Estudo • Várias Universidades' },
                  description: {
                    en: 'Join Portuguese-speaking study groups across London universities. From UCL Portuguese Literature to LSE Development Economics - connect with students from your academic field.',
                    pt: 'Junte-se a grupos de estudo lusófonos em universidades de Londres. Da Literatura Portuguesa da UCL à Economia do Desenvolvimento da LSE - conecte-se com estudantes da sua área académica.'
                  },
                  image: '/images/events/study-groups.jpg',
                  metadata: {
                    date: { en: 'Every Wednesday', pt: 'Todas as Quartas-feiras' },
                    time: { en: '5:00 PM - 7:00 PM', pt: '17:00 - 19:00' },
                    location: { en: 'Rotating university libraries', pt: 'Bibliotecas universitárias rotativas' },
                    price: { en: 'FREE', pt: 'GRATUITO' },
                    groups: { en: '8 active study groups', pt: '8 grupos de estudo ativos' }
                  }
                },
                {
                  id: 'cultural-celebration',
                  title: { en: 'Portuguese Heritage Month Celebration', pt: 'Celebração do Mês da Herança Portuguesa' },
                  subtitle: { en: 'Cultural Festival • King\'s College', pt: 'Festival Cultural • King\'s College' },
                  description: {
                    en: 'Annual celebration featuring traditional music from all 10 Lusophone countries, authentic cuisine, poetry readings, and dance performances. Students showcase their cultural heritage pride.',
                    pt: 'Celebração anual com música tradicional dos 10 países lusófonos, culinária autêntica, leituras de poesia e apresentações de dança. Estudantes mostram o orgulho da sua herança cultural.'
                  },
                  image: '/images/events/heritage-month.jpg',
                  metadata: {
                    date: { en: 'November 15, 2024', pt: '15 de Novembro de 2024' },
                    time: { en: '2:00 PM - 8:00 PM', pt: '14:00 - 20:00' },
                    location: { en: 'King\'s College Strand Campus', pt: 'King\'s College Campus Strand' },
                    price: { en: '£8 students / £12 general', pt: '£8 estudantes / £12 geral' },
                    features: { en: 'Live music, food, cultural exhibits', pt: 'Música ao vivo, comida, exposições culturais' }
                  }
                },
                {
                  id: 'career-mentorship',
                  title: { en: 'Lusophone Professional Mentorship', pt: 'Mentoria Profissional Lusófona' },
                  subtitle: { en: 'Career Guidance • Cross-University', pt: 'Orientação de Carreira • Inter-Universitário' },
                  description: {
                    en: 'Monthly mentorship sessions with successful Portuguese-speaking professionals in London. One-on-one career guidance, industry insights, and professional network expansion.',
                    pt: 'Sessões mensais de mentoria com profissionais lusófonos de sucesso em Londres. Orientação de carreira individual, insights da indústria e expansão da rede profissional.'
                  },
                  image: '/images/events/mentorship.jpg',
                  metadata: {
                    date: { en: 'First Saturday monthly', pt: 'Primeiro sábado do mês' },
                    time: { en: '10:00 AM - 2:00 PM', pt: '10:00 - 14:00' },
                    location: { en: 'Central London venues', pt: 'Locais no centro de Londres' },
                    price: { en: '£5 for students', pt: '£5 para estudantes' },
                    mentors: { en: '25+ professional mentors', pt: 'Mais de 25 mentores profissionais' }
                  }
                }
              ]}
              title={{ en: 'Student Cultural Events', pt: 'Eventos Culturais Estudantis' }}
              subtitle={{ en: 'Academic, professional, and cultural activities for Portuguese-speaking students', pt: 'Atividades académicas, profissionais e culturais para estudantes lusófonos' }}
              responsive={CAROUSEL_CONFIGS.standard}
              autoAdvance={true}
              autoAdvanceInterval={AUTO_ADVANCE_TIMINGS.standard}
              renderItem={(event) => (
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-secondary-200/50 h-full hover:shadow-3xl transition-all duration-500 group">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <CalendarDaysIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold bg-gradient-to-r from-secondary-600 to-accent-600 bg-clip-text text-transparent mb-1">
                        {event.title.en}
                      </h3>
                      <p className="text-xs font-semibold text-secondary-600">
                        {event.subtitle.en}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {event.description.en}
                  </p>
                  <div className="space-y-2">
                    {event.metadata?.date && (
                      <div className="flex items-center text-xs">
                        <ClockIcon className="w-3 h-3 mr-2 text-secondary-600" />
                        <span className="font-medium text-secondary-700">{event.metadata.date.en}</span>
                      </div>
                    )}
                    {event.metadata?.location && (
                      <div className="flex items-center text-xs">
                        <MapPinIcon className="w-3 h-3 mr-2 text-accent-600" />
                        <span className="text-gray-600">{event.metadata.location.en}</span>
                      </div>
                    )}
                    {event.metadata?.price && (
                      <div className="flex items-center text-xs">
                        <BanknotesIcon className="w-3 h-3 mr-2 text-green-600" />
                        <span className="font-semibold text-green-700">{event.metadata.price.en}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <button className="w-full py-2 bg-gradient-to-r from-secondary-500 to-accent-500 text-white rounded-lg text-sm font-medium hover:from-secondary-600 hover:to-accent-600 transition-all duration-300">
                      {t('events.register', 'Register')}
                    </button>
                  </div>
                </div>
              )}
            />
          </div>
        </section>

        {/* Partner Universities Section */}
        <section id="partner-universities" className="py-20 bg-gray-50">
          <div className="container-width">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === 'pt' ? 'Universidades Parceiras no Reino Unido' : 'United Kingdom Partner Universities'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {language === 'pt' ?
                  'Colaboramos com as principais universidades de Londres e do Reino Unido para apoiar estudantes portugueses e programas de estudos portugueses' :
                  'We collaborate with leading London and United Kingdom universities to support Lusophone students and Lusophone studies programs'
                }
              </p>

              {/* University Type Filter */}
              <div className="flex flex-wrap gap-2 justify-center mb-12">
                {universityTypes.map(type => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedUniversityType(type.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedUniversityType === type.value
                        ? 'bg-primary-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {type.label[language]}
                  </button>
                ))}
              </div>
            </div>

            {/* Universities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredUniversities.map(university => (
                <div key={university.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                  {/* Header with Partnership Level */}
                  <div className={`px-6 py-3 ${
                    university.partnershipLevel === 'strategic' ? 'bg-primary-500' :
                    university.partnershipLevel === 'official' ? 'bg-secondary-500' :
                    'bg-gray-500'
                  } text-white`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">
                        {university.partnershipLevel === 'strategic' ? 
                          (language === 'pt' ? 'Parceiro Estratégico' : 'Strategic Partner') :
                          university.partnershipLevel === 'official' ?
                          (language === 'pt' ? 'Parceiro Oficial' : 'Official Partner') :
                          (language === 'pt' ? 'Parceiro Comunitário' : 'Community Partner')
                        }
                      </span>
                      {university.hasPortugueseProgram && (
                        <LanguageIcon className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {language === 'pt' ? university.namePortuguese : university.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        {university.location}
                        <span className="mx-2">•</span>
                        <span className="capitalize">{university.type.replace('_', ' ')}</span>
                      </div>
                    </div>
                    
                    {/* Student Statistics */}
                    <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-lg font-bold text-primary-600">{university.portugueseStudents}</div>
                        <div className="text-xs text-gray-600">{language === 'pt' ? 'Estudantes PT' : 'PT Students'}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-lg font-bold text-secondary-600">{(university.internationalStudents/1000).toFixed(0)}k</div>
                        <div className="text-xs text-gray-600">{language === 'pt' ? 'Internacionais' : 'International'}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-lg font-bold text-accent-600">{(university.studentPopulation/1000).toFixed(0)}k</div>
                        <div className="text-xs text-gray-600">{language === 'pt' ? 'Total' : 'Total'}</div>
                      </div>
                    </div>
                    
                    {/* Programs */}
                    {university.hasPortugueseProgram && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                          <BookOpenIcon className="w-4 h-4 mr-2" />
                          {language === 'pt' ? 'Programas Portugueses' : 'Lusophone Programs'}
                        </h4>
                        <div className="space-y-1 text-sm">
                          {university.programs.undergraduate.slice(0, 2).map((program, index) => (
                            <div key={index} className="text-gray-600">• {program}</div>
                          ))}
                          {university.programs.undergraduate.length > 2 && (
                            <div className="text-primary-600 text-xs">
                              +{university.programs.undergraduate.length - 2} {language === 'pt' ? 'mais programas' : 'more programs'}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Benefits Preview */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <SparklesIcon className="w-4 h-4 mr-2" />
                        {language === 'pt' ? 'Benefícios para Estudantes' : 'Student Benefits'}
                      </h4>
                      <div className="space-y-1">
                        {university.benefits.slice(0, 2).map((benefit, index) => (
                          <div key={index} className="flex items-start text-sm text-gray-600">
                            <CheckIconSolid className="w-3 h-3 text-secondary-500 mr-2 mt-0.5 flex-shrink-0" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Contact */}
                    <div className="mb-4 bg-gray-50 rounded-lg p-3">
                      <h4 className="font-medium text-gray-900 mb-2 text-sm">
                        {language === 'pt' ? 'Contacto LusoTown' : 'LusoTown Contact'}
                      </h4>
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">{university.contact.name}</p>
                        <p className="text-gray-600 text-xs">{university.contact.title}</p>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium py-3 px-4 rounded-lg text-sm hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 min-h-[44px] shadow-xl hover:shadow-2xl">
                        {language === 'pt' ? 'Ver Detalhes' : 'View Details'}
                      </button>
                      <a
                        href={university.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 min-h-[44px] shadow-lg hover:shadow-xl"
                      >
                        <LinkIcon className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* University Partnership Statistics */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {language === 'pt' ? 'Impacto das Parcerias Universitárias' : 'University Partnership Impact'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary-600 mb-2">{communityStats.viewers}</div>
                  <div className="text-sm text-gray-600">{language === 'pt' ? 'Estudantes Lusófonos Apoiados' : 'Portuguese-speaking Students Supported'}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary-600 mb-2">45</div>
                  <div className="text-sm text-gray-600">{language === 'pt' ? 'Programas de Estudos Portugueses' : 'Lusophone Studies Programs'}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-600 mb-2">£1.7M</div>
                  <div className="text-sm text-gray-600">{language === 'pt' ? 'Valor em Benefícios Estudantis' : 'Value in Student Benefits'}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-premium-600 mb-2">92%</div>
                  <div className="text-sm text-gray-600">{language === 'pt' ? 'Satisfação dos Estudantes' : 'Student Satisfaction'}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* University Societies Network Section */}
        <section className="py-20 bg-gradient-to-br from-accent-50 via-white to-primary-50">
          <div className="container-width">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-accent-100 to-primary-100 px-6 py-3 rounded-full mb-6">
                <UsersIcon className="w-5 h-5 mr-2 text-accent-600" />
                <span className="font-bold text-accent-700">
                  {language === 'pt' ? '🤝 50+ Sociedades • Unidos pela Língua' : '🤝 50+ Societies • United by Language'}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {language === 'pt' ? 'Rede de Sociedades Universitárias' : 'University Societies Network'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {language === 'pt'
                  ? 'Conecte sociedades lusófonas de universidades do Reino Unido. Planeie eventos em conjunto, partilhe recursos e crie celebrações culturais maiores.'
                  : 'Connect Portuguese-speaking societies across UK universities. Plan joint events, share resources, and create larger cultural celebrations together.'
                }
              </p>
              
              {/* Key Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                  <div className="text-2xl font-bold text-accent-600 mb-1">50+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'pt' ? 'Sociedades Lusófonas' : 'Portuguese-speaking Societies'}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                  <div className="text-2xl font-bold text-primary-600 mb-1">300+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'pt' ? 'Participação Conjunta' : 'Combined Attendance'}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                  <div className="text-2xl font-bold text-secondary-600 mb-1">12</div>
                  <div className="text-sm text-gray-600">
                    {language === 'pt' ? 'Cidades do Reino Unido' : 'UK Cities Connected'}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                  <div className="text-2xl font-bold text-green-600 mb-1">£15k</div>
                  <div className="text-sm text-gray-600">
                    {language === 'pt' ? 'Arrecadado para Caridade' : 'Raised for Charity'}
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works - Simple Steps */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {language === 'pt' ? 'Como Funciona?' : 'How It Works?'}
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {language === 'pt'
                    ? 'Três passos simples para conectar sua sociedade lusófona com outras em todo o Reino Unido'
                    : 'Three simple steps to connect your Portuguese-speaking society with others across the UK'
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-blue-100 to-primary-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-primary-600">1</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {language === 'pt' ? '📝 Crie o Perfil da Sociedade' : '📝 Create Society Profile'}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {language === 'pt'
                      ? 'Registe a sua sociedade lusófona gratuitamente. Adicione informações básicas, número de membros e contacto do presidente.'
                      : 'Register your Portuguese-speaking society for free. Add basic info, member count, and president contact.'
                    }
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <span className="text-green-700 font-medium text-sm">
                      {language === 'pt' ? '💰 Plano Gratuito Disponível' : '💰 Free Plan Available'}
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-gradient-to-br from-green-100 to-accent-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-accent-600">2</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {language === 'pt' ? '🤝 Conecte com Outras Sociedades' : '🤝 Connect with Other Societies'}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {language === 'pt'
                      ? 'Navegue no diretório de 50+ sociedades lusófonas. Contacte presidentes de Oxford a Edimburgo, Manchester a Cardiff.'
                      : 'Browse directory of 50+ Portuguese-speaking societies. Contact presidents from Oxford to Edinburgh, Manchester to Cardiff.'
                    }
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <span className="text-blue-700 font-medium text-sm">
                      {language === 'pt' ? '🌍 50+ Sociedades no Reino Unido' : '🌍 50+ Societies Across UK'}
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-orange-600">3</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {language === 'pt' ? '🎉 Planeie Eventos Conjuntos' : '🎉 Plan Joint Events'}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {language === 'pt'
                      ? 'Use ferramentas de planeamento para organizar eventos culturais maiores. Divida custos, partilhe receitas, conecte comunidades.'
                      : 'Use planning tools to organize bigger cultural events. Split costs, share revenues, connect communities.'
                    }
                  </p>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <span className="text-purple-700 font-medium text-sm">
                      {language === 'pt' ? '🏆 Eventos de 300+ Pessoas' : '🏆 Events with 300+ Attendance'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Real Example */}
              <div className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold text-gray-900 flex items-center justify-center">
                    <TrophyIcon className="w-5 h-5 mr-2 text-yellow-600" />
                    {language === 'pt' ? 'Exemplo Real: Como Funciona na Prática' : 'Real Example: How It Works in Practice'}
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-white rounded-lg p-4 border border-yellow-100">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {language === 'pt' ? '1. UCL Sociedade Portuguesa' : '1. UCL Lusophone Society'}
                    </div>
                    <div className="text-xs text-gray-600">
                      {language === 'pt' ? 'Propõe festival cultural' : 'Proposes cultural festival'}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-yellow-100">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {language === 'pt' ? '2. + 7 Sociedades de Londres' : '2. + 7 London Societies'}
                    </div>
                    <div className="text-xs text-gray-600">
                      {language === 'pt' ? 'Juntam-se no planeamento' : 'Join planning platform'}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-yellow-100">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {language === 'pt' ? '3. Planeamento Conjunto' : '3. Joint Planning'}
                    </div>
                    <div className="text-xs text-gray-600">
                      {language === 'pt' ? 'Orçamento, locais, performers' : 'Budget, venues, performers'}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-yellow-100">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {language === 'pt' ? '4. Festival de Herança' : '4. Heritage Festival'}
                    </div>
                    <div className="text-xs text-gray-600">
                      {language === 'pt' ? '1.200+ estudantes, £15k caridade' : 'students, charity raised'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Student Benefits Explanation */}
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">
                  {language === 'pt' ? 'O Que Isto Significa Para Estudantes?' : 'What Does This Mean for Students?'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <SparklesIcon className="w-4 h-4 mr-2 text-blue-600" />
                      {language === 'pt' ? 'Eventos Maiores e Melhores' : 'Bigger & Better Events'}
                    </h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• {language === 'pt' ? 'Festivais com 300+ estudantes lusófonos' : 'Festivals with 300+ Portuguese-speaking students'}</li>
                      <li>• {language === 'pt' ? 'Mais patrocinadores e melhores locais' : 'More sponsors and better venues'}</li>
                      <li>• {language === 'pt' ? 'Performers de qualidade profissional' : 'Professional-quality performers'}</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <HeartIcon className="w-4 h-4 mr-2 text-green-600" />
                      {language === 'pt' ? 'Mais Conexões Culturais' : 'More Cultural Connections'}
                    </h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• {language === 'pt' ? 'Conhecer estudantes de outras universidades' : 'Meet students from other universities'}</li>
                      <li>• {language === 'pt' ? 'Celebrar TODAS as culturas lusófonas' : 'Celebrate ALL Portuguese-speaking cultures'}</li>
                      <li>• {language === 'pt' ? 'Network profissional mais forte' : 'Stronger professional network'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-accent-100 rounded-lg p-3 w-fit mb-4">
                  <BuildingLibraryIcon className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {language === 'pt' ? 'Diretório de Sociedades' : 'Society Directory & Networking'}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {language === 'pt'
                    ? 'Navegue sociedades lusófonas de todas as universidades do Reino Unido. Conecte-se com presidentes e membros do comité.'
                    : 'Browse Portuguese-speaking societies across all UK universities. Connect with presidents and committee members.'
                  }
                </p>
                <div className="flex items-center text-accent-600 font-medium text-sm">
                  <UsersIcon className="w-4 h-4 mr-2" />
                  {language === 'pt' ? 'Londres a Edimburgo' : 'London to Edinburgh'}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-primary-100 rounded-lg p-3 w-fit mb-4">
                  <CalendarDaysIcon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {language === 'pt' ? 'Planeamento de Eventos' : 'Joint Event Planning Tools'}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {language === 'pt'
                    ? 'Coordene eventos culturais multi-universitários. Partilha de orçamentos e divisão automática de custos.'
                    : 'Coordinate multi-university cultural events. Shared budget tracking and automatic cost splitting.'
                  }
                </p>
                <div className="flex items-center text-primary-600 font-medium text-sm">
                  <BanknotesIcon className="w-4 h-4 mr-2" />
                  {language === 'pt' ? 'Gestão de Receitas' : 'Revenue Sharing'}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-secondary-100 rounded-lg p-3 w-fit mb-4">
                  <LinkIcon className="w-6 h-6 text-secondary-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {language === 'pt' ? 'Partilha de Recursos' : 'Resource Sharing Network'}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {language === 'pt'
                    ? 'Partilhe performers culturais, oradores e equipamento. Coordene reservas de locais entre cidades.'
                    : 'Share cultural performers, speakers, and equipment. Coordinate venue bookings across cities.'
                  }
                </p>
                <div className="flex items-center text-secondary-600 font-medium text-sm">
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  {language === 'pt' ? 'Base de Patrocinadores' : 'Sponsor Database'}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-green-100 rounded-lg p-3 w-fit mb-4">
                  <TrophyIcon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {language === 'pt' ? 'Histórias de Sucesso' : 'Success Stories Showcase'}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {language === 'pt'
                    ? 'Celebre conquistas conjuntas. Festival de Herança Portuguesa de Londres 2024: 8 sociedades, 1.200+ estudantes.'
                    : 'Celebrate joint achievements. London Lusophone Heritage Festival 2024: 8 societies, students.'
                  }
                </p>
                <div className="flex items-center text-green-600 font-medium text-sm">
                  <StarIcon className="w-4 h-4 mr-2" />
                  {language === 'pt' ? 'Eventos Premiados' : 'Award-Winning Events'}
                </div>
              </motion.div>
            </div>

            {/* Society Directory Preview */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-16">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">
                  {language === 'pt' ? 'Sociedades Lusófonas em Destaque' : 'Featured Lusophone-Speaking University Societies'}
                </h3>
                <button className="flex items-center text-accent-600 font-medium hover:text-accent-700 transition-colors">
                  {language === 'pt' ? 'Ver Todas' : 'View All'}
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </button>
              </div>

              {/* London Universities */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPinIcon className="w-5 h-5 mr-2 text-primary-600" />
                  {language === 'pt' ? '🏫 Universidades de Londres' : '🏫 London Universities'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'UCL Lusophone-Speaking Society', members: 420, university: 'University College London' },
                    { name: "King's College Lusophone Society", members: 380, university: "King's College London" },
                    { name: 'Imperial Lusophone Language Society', members: 290, university: 'Imperial College London' },
                    { name: 'LSE Lusophone-Speaking Students', members: 350, university: 'London School of Economics' },
                    { name: 'Queen Mary Lusophone Cultural Society', members: 180, university: 'Queen Mary University' }
                  ].slice(0, 3).map((society, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h5 className="font-medium text-gray-900 mb-1 text-sm">{society.name}</h5>
                      <p className="text-xs text-gray-600 mb-2">{society.university}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-primary-600 font-medium">
                          {society.members} {language === 'pt' ? 'membros' : 'members'}
                        </span>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                          {language === 'pt' ? 'Ativa' : 'Active'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Major UK Universities */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <GlobeAltIcon className="w-5 h-5 mr-2 text-secondary-600" />
                  {language === 'pt' ? '🎓 Principais Universidades do Reino Unido' : '🎓 Major UK Universities'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: 'Oxford Lusophone-Speaking Society', members: 95, city: 'Oxford' },
                    { name: 'Cambridge Lusophone Cultural Society', members: 110, city: 'Cambridge' },
                    { name: 'Manchester Lusophone Language Society', members: 290, city: 'Manchester' },
                    { name: 'Edinburgh Lusophone-Speaking Society', members: 180, city: 'Edinburgh' }
                  ].map((society, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h5 className="font-medium text-gray-900 mb-1 text-sm">{society.name}</h5>
                      <p className="text-xs text-gray-600 mb-2">{society.city}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-secondary-600 font-medium">
                          {society.members} {language === 'pt' ? 'membros' : 'members'}
                        </span>
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                          {language === 'pt' ? 'Parceira' : 'Partner'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regional Networks */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPinIcon className="w-5 h-5 mr-2 text-green-600" />
                  {language === 'pt' ? '🌍 Redes Regionais' : '🌍 Regional Networks'}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {[
                    { name: 'Birmingham Lusophone-Speaking Students', members: 200 },
                    { name: 'Leeds Lusophone Cultural Society', members: 150 },
                    { name: 'Bristol Lusophone Society', members: 160 },
                    { name: 'Glasgow Lusophone Language Society', members: 90 },
                    { name: 'Cardiff Lusophone-Speaking Society', members: 110 }
                  ].map((society, index) => (
                    <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-3 border border-green-100">
                      <h5 className="font-medium text-gray-900 mb-1 text-xs">{society.name}</h5>
                      <span className="text-xs text-green-600 font-medium">
                        {society.members} {language === 'pt' ? 'membros' : 'members'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Yearly Subscription Pricing */}
            <div className="bg-gradient-to-r from-accent-500 to-primary-500 rounded-2xl p-8 text-white mb-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {language === 'pt' ? 'Planos Anuais para Sociedades Universitárias' : 'University Society Annual Plans'}
                </h3>
                <p className="text-accent-100 max-w-2xl mx-auto">
                  {language === 'pt'
                    ? 'Conecte sua sociedade lusófona com 50+ outras sociedades em todo o Reino Unido'
                    : 'Connect your Portuguese-speaking society with 50+ others across the United Kingdom'
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Free Starter Plan */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold mb-2">
                      {language === 'pt' ? 'Plano Inicial' : 'Free Starter Plan'}
                    </h4>
                    <div className="text-3xl font-bold mb-1">£0</div>
                    <div className="text-accent-100 text-sm">
                      {language === 'pt' ? 'Para sempre' : 'Forever'}
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <CheckIconSolid className="w-5 h-5 text-green-300 mr-3" />
                      <span className="text-sm">
                        {language === 'pt' ? 'Perfil básico no diretório' : 'Basic society profile in directory'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckIconSolid className="w-5 h-5 text-green-300 mr-3" />
                      <span className="text-sm">
                        {language === 'pt' ? 'Contactos de outras sociedades' : 'Browse other society contacts'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckIconSolid className="w-5 h-5 text-green-300 mr-3" />
                      <span className="text-sm">
                        {language === 'pt' ? 'Partilha simples de eventos' : 'Simple event sharing'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckIconSolid className="w-5 h-5 text-green-300 mr-3" />
                      <span className="text-sm">
                        {language === 'pt' ? 'Mensagens básicas' : 'Basic messaging between societies'}
                      </span>
                    </li>
                  </ul>
                  <button className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                    {language === 'pt' ? 'Começar Grátis' : 'Start Free'}
                  </button>
                </div>

                {/* Premium Collaboration Plan */}
                <div className="bg-white rounded-xl p-6 text-gray-900 relative border-2 border-yellow-300">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-300 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">
                      {language === 'pt' ? 'MAIS POPULAR' : 'MOST POPULAR'}
                    </span>
                  </div>
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold mb-2">
                      {language === 'pt' ? 'Plano Colaboração' : 'Premium Collaboration Plan'}
                    </h4>
                    <div className="text-3xl font-bold mb-1 text-accent-600">£75</div>
                    <div className="text-gray-600 text-sm mb-2">
                      {language === 'pt' ? 'por ano' : 'per year'}
                    </div>
                    <div className="text-green-600 text-xs font-medium">
                      {language === 'pt' ? 'Poupe £21 (era £8/mês)' : 'Save £21 (was £8/month)'}
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <CheckIconSolid className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-sm">
                        {language === 'pt' ? 'Dashboard avançado de planeamento' : 'Advanced joint event planning dashboard'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckIconSolid className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-sm">
                        {language === 'pt' ? 'Divisão automática de orçamentos' : 'Shared budget tracking and expense splitting'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckIconSolid className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-sm">
                        {language === 'pt' ? 'Base de dados de patrocinadores' : 'Corporate sponsor matching database'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckIconSolid className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-sm">
                        {language === 'pt' ? 'Gestão de projetos multi-sociedade' : 'Multi-society project management tools'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckIconSolid className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-sm">
                        {language === 'pt' ? 'Partilha de receitas (2% comissão)' : 'Revenue sharing for ticket sales (2% commission)'}
                      </span>
                    </li>
                  </ul>
                  <button className="w-full bg-gradient-to-r from-accent-500 to-primary-500 hover:from-accent-600 hover:to-primary-600 text-white font-medium py-3 px-4 rounded-lg transition-all">
                    {language === 'pt' ? 'Escolher Plano' : 'Choose Plan'}
                  </button>
                </div>

                {/* Multi-Society University Plan */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold mb-2">
                      {language === 'pt' ? 'Plano Multi-Sociedade' : 'Multi-Society University Plan'}
                    </h4>
                    <div className="text-3xl font-bold mb-1">£120</div>
                    <div className="text-accent-100 text-sm">
                      {language === 'pt' ? 'por ano' : 'per year'}
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <CheckIconSolid className="w-5 h-5 text-green-300 mr-3" />
                      <span className="text-sm">
                        {language === 'pt' ? 'Múltiplas sociedades numa conta' : 'Manage multiple societies under one account'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckIconSolid className="w-5 h-5 text-green-300 mr-3" />
                      <span className="text-sm">
                        {language === 'pt' ? 'Coordenação entre sociedades' : 'Cross-society coordination tools'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckIconSolid className="w-5 h-5 text-green-300 mr-3" />
                      <span className="text-sm">
                        {language === 'pt' ? 'Planeamento universitário completo' : 'University-wide event planning'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckIconSolid className="w-5 h-5 text-green-300 mr-3" />
                      <span className="text-sm">
                        {language === 'pt' ? 'Parcerias corporativas avançadas' : 'Enhanced corporate partnership opportunities'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckIconSolid className="w-5 h-5 text-green-300 mr-3" />
                      <span className="text-sm">
                        {language === 'pt' ? 'Gestão de conta dedicada' : 'Dedicated account management support'}
                      </span>
                    </li>
                  </ul>
                  <button className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                    {language === 'pt' ? 'Contactar Vendas' : 'Contact Sales'}
                  </button>
                </div>
              </div>
            </div>

            {/* Success Stories */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {language === 'pt' ? 'Histórias de Sucesso em Colaboração' : 'Collaboration Success Stories'}
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {language === 'pt'
                    ? 'Celebrando conquistas extraordinárias quando sociedades lusófonas se unem'
                    : 'Celebrating extraordinary achievements when Portuguese-speaking societies unite'
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-100">
                  <div className="text-center mb-4">
                    <TrophyIcon className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <h4 className="font-bold text-gray-900">
                      {language === 'pt' ? 'Festival de Herança Portuguesa de Londres 2024' : 'London Lusophone Heritage Festival 2024'}
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center mb-4">
                    <div>
                      <div className="text-xl font-bold text-yellow-600">8</div>
                      <div className="text-xs text-gray-600">
                        {language === 'pt' ? 'Sociedades' : 'Societies'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-yellow-600">1,200+</div>
                      <div className="text-xs text-gray-600">
                        {language === 'pt' ? 'Estudantes' : 'Students'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-yellow-600">£15k</div>
                      <div className="text-xs text-gray-600">
                        {language === 'pt' ? 'Caridade' : 'Charity'}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {language === 'pt'
                      ? 'O maior evento cultural lusófono estudantil do Reino Unido'
                      : 'The largest student Portuguese-speaking cultural event in the UK'
                    }
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 border border-blue-100">
                  <div className="text-center mb-4">
                    <GlobeAltIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-bold text-gray-900">
                      {language === 'pt' ? 'Mês Cultural de Estudantes Lusófonos do Reino Unido' : 'UK Lusophone-Speaking Students Cultural Month'}
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center mb-4">
                    <div>
                      <div className="text-xl font-bold text-blue-600">12</div>
                      <div className="text-xs text-gray-600">
                        {language === 'pt' ? 'Universidades' : 'Universities'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-blue-600">30</div>
                      <div className="text-xs text-gray-600">
                        {language === 'pt' ? 'Eventos' : 'Events'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-blue-600">2,000+</div>
                      <div className="text-xs text-gray-600">
                        {language === 'pt' ? 'Participação' : 'Attendance'}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {language === 'pt'
                      ? 'Celebração coordenada da diversidade lusófona em todo o Reino Unido'
                      : 'Coordinated celebration of Lusophone diversity across the United Kingdom'
                    }
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-purple-50 rounded-xl p-6 border border-green-100">
                  <div className="text-center mb-4">
                    <MapPinIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-bold text-gray-900">
                      {language === 'pt' ? 'Circuito de Celebrações Culturais' : 'Cultural Celebration Circuit'}
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center mb-4">
                    <div>
                      <div className="text-xl font-bold text-green-600">6</div>
                      <div className="text-xs text-gray-600">
                        {language === 'pt' ? 'Cidades' : 'Cities'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-green-600">3,000+</div>
                      <div className="text-xs text-gray-600">
                        {language === 'pt' ? 'Participação' : 'Combined'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-green-600">95%</div>
                      <div className="text-xs text-gray-600">
                        {language === 'pt' ? 'Satisfação' : 'Satisfaction'}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {language === 'pt'
                      ? 'Turnê cultural conectando sociedades lusófonas de Londres a Edimburgo'
                      : 'Cultural tour connecting Portuguese-speaking societies from London to Edinburgh'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Cultural Event Categories */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 mb-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {language === 'pt' ? 'Tipos de Eventos em Colaboração' : 'Joint Event Categories'}
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {language === 'pt'
                    ? 'Explore as categorias de eventos culturais que as sociedades lusófonas organizam em conjunto'
                    : 'Explore the cultural event categories that Portuguese-speaking societies organize together'
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { 
                    icon: '🎭', 
                    title: language === 'pt' ? 'Eventos de Herança Cultural' : 'Cultural Heritage Events',
                    description: language === 'pt' ? 'Festivais de língua portuguesa, celebrações de herança cultural' : 'Portuguese language festivals, cultural heritage celebrations'
                  },
                  { 
                    icon: '🎵', 
                    title: language === 'pt' ? 'Música e Artes' : 'Music & Arts',
                    description: language === 'pt' ? 'Música tradicional e contemporânea lusófona, workshops de dança' : 'Traditional and contemporary Portuguese-speaking music events, dance workshops'
                  },
                  { 
                    icon: '🏢', 
                    title: language === 'pt' ? 'Desenvolvimento Profissional' : 'Professional Development',
                    description: language === 'pt' ? 'Networking de carreira, conexões empresariais lusófonas' : 'Career networking, Portuguese-speaking business connections'
                  },
                  { 
                    icon: '🎓', 
                    title: language === 'pt' ? 'Acadêmico e Educacional' : 'Academic & Educational',
                    description: language === 'pt' ? 'Conferências de língua portuguesa, apresentações de pesquisa cultural' : 'Portuguese language conferences, cultural research presentations'
                  },
                  { 
                    icon: '🚌', 
                    title: language === 'pt' ? 'Experiências Culturais' : 'Cultural Experiences',
                    description: language === 'pt' ? 'Tours de herança, experiências de imersão cultural' : 'Heritage tours, cultural immersion experiences'
                  },
                  { 
                    icon: '🍽️', 
                    title: language === 'pt' ? 'Comida e Tradição' : 'Food & Tradition',
                    description: language === 'pt' ? 'Festivais de culinária lusófona, celebrações tradicionais' : 'Portuguese-speaking cuisine festivals, traditional celebrations'
                  }
                ].map((category, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <h4 className="font-semibold text-gray-900 mb-2">{category.title}</h4>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {language === 'pt' ? 'Conecte Sua Sociedade Lusófona' : 'Connect Your Lusophone-Speaking Society'}
                </h3>
                <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
                  {language === 'pt'
                    ? 'Junte-se a 50+ sociedades lusófonas planeando eventos culturais incríveis juntas. Unidos pela língua, fortalecidos pela colaboração.'
                    : 'Join 50+ Portuguese-speaking societies planning amazing cultural events together. United by language, strengthened by collaboration.'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-primary-600 hover:bg-gray-50 font-bold py-3 px-8 rounded-lg transition-colors">
                    {language === 'pt' ? 'Conectar Sociedade - A partir de £75/ano' : 'Connect Your Society - Starting £75/year'}
                  </button>
                  <button className="border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-6 rounded-lg transition-colors">
                    {language === 'pt' ? 'Começar Grátis' : 'Start Free'}
                  </button>
                </div>
                <div className="mt-6 text-sm text-primary-100">
                  {language === 'pt' 
                    ? 'Celebramos TODAS as culturas lusófonas - Portugal, Brasil, Cabo Verde, Angola, Moçambique e muito mais'
                    : 'We celebrate ALL Portuguese-speaking cultures - Portugal, Brazil, Cape Verde, Angola, Mozambique and more'
                  }
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lusophone-Speaking Countries Flag Grid */}
        <section className="py-20 bg-white">
          <div className="container-width">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === 'pt' 
                  ? 'Estudantes de Países Lusófonos' 
                  : 'Students from Lusophone-Speaking Countries'
                }
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {language === 'pt'
                  ? 'Celebrando a diversidade cultural dos estudantes portugueses de todas as nações lusófonas no Reino Unido'
                  : 'Celebrating the cultural diversity of Lusophone students from all Lusophone nations in United Kingdom'
                }
              </p>
            </div>
            <LusophoneFlagGrid showStudentCounts={true} />
          </div>
        </section>

        {/* Cultural Events for Students */}
        <CulturalEventCards limit={6} showPricing={true} />

        {/* Student Journey Visualization */}
        <StudentJourneyVisualization />

        {/* Enhanced Student Events Section */}
        <StudentEventsSection />

        {/* Exclusive Multicultural Student Programming */}
        <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50">
          <div className="container-width">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-blue-100 px-6 py-3 rounded-full mb-6">
                <GlobeAltIcon className="w-5 h-5 mr-2 text-green-600" />
                <span className="font-bold text-green-700">
                  {language === 'pt' ? '🌍 Eventos Exclusivos • 10 Culturas Lusófonas' : '🌍 Exclusive Events • 10 Lusophone Cultures'}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {language === 'pt' ? 'Programação Cultural Exclusiva para Estudantes' : 'Exclusive Cultural Programming for Students'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {language === 'pt' ?
                  'Celebre sua herança cultural com eventos únicos que conectam estudantes de Portugal, Brasil, Angola, Cabo Verde, Moçambique e todos os países lusófonos.' :
                  'Celebrate your cultural heritage with unique events connecting students from Portugal, Brazil, Angola, Cape Verde, Mozambique and all Lusophone countries.'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: language === 'pt' ? 'Feira de Carreiras Lusófona' : 'Lusophone Career Fair',
                  subtitle: language === 'pt' ? '10 Países • 50+ Empresas' : '10 Countries • 50+ Companies',
                  icon: '🌍',
                  date: '25 Oct',
                  price: 'FREE',
                  description: language === 'pt' ?
                    'Conecte-se com empregadores de todos os países lusófonos. Oportunidades exclusivas em Portugal, Brasil, Angola e mais.' :
                    'Connect with employers from all Lusophone countries. Exclusive opportunities in Portugal, Brazil, Angola and more.',
                  highlights: [
                    language === 'pt' ? 'Empresas de 10 países' : 'Companies from 10 countries',
                    language === 'pt' ? 'CV em português/inglês' : 'Lusophone/English CV reviews',
                    language === 'pt' ? 'Networking multicultural' : 'Multicultural networking'
                  ]
                },
                {
                  title: language === 'pt' ? 'Intercâmbio Linguístico Intensivo' : 'Intensive Language Exchange',
                  subtitle: language === 'pt' ? 'Sotaques Autênticos' : 'Authentic Accents',
                  icon: '🗣️',
                  date: '1 Nov',
                  price: '£5',
                  description: language === 'pt' ?
                    'Pratique português com falantes nativos do Brasil, Angola, Cabo Verde. Diferentes sotaques, mesma paixão cultural.' :
                    'Practice Lusophone with native speakers from Brazil, Angola, Cape Verde. Different accents, same cultural passion.',
                  highlights: [
                    language === 'pt' ? 'Falantes de 8 países' : 'Speakers from 8 countries',
                    language === 'pt' ? 'Grupos por nível' : 'Level-based groups',
                    language === 'pt' ? 'Certificado participação' : 'Participation certificate'
                  ]
                },
                {
                  title: language === 'pt' ? 'Noite Cultural Lusófona' : 'Lusophone Cultural Night',
                  subtitle: language === 'pt' ? 'Música • Dança • Gastronomia' : 'Music • Dance • Cuisine',
                  icon: '🎭',
                  date: '8 Nov',
                  price: '£12',
                  description: language === 'pt' ?
                    'Uma noite celebrando Fado português, Samba brasileiro, Kizomba angolana, Morna cabo-verdiana e muito mais.' :
                    'A night celebrating Lusophone Fado, Brazilian Samba, Angolan Kizomba, Cape Verdean Morna and much more.',
                  highlights: [
                    language === 'pt' ? 'Música ao vivo' : 'Live music',
                    language === 'pt' ? 'Comida tradicional' : 'Traditional food',
                    language === 'pt' ? 'Aulas de dança' : 'Dance lessons'
                  ]
                }
              ].map((event, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{event.icon}</div>
                      <div className="text-right">
                        <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                          {event.date}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                          event.price === 'FREE' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {event.price}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-sm text-primary-600 font-medium mb-3">{event.subtitle}</p>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{event.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      {event.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-600">
                          <CheckBadgeIcon className="w-4 h-4 text-secondary-500 mr-2 flex-shrink-0" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                    
                    <button 
                      onClick={handleVerification}
                      className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium py-3 px-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 flex items-center justify-center"
                    >
                      <CalendarDaysIcon className="w-4 h-4 mr-2" />
                      {language === 'pt' ? 'Reservar Lugar' : 'Reserve Spot'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA for More Events */}
            <div className="text-center">
              <button
                onClick={handleVerification}
                className="bg-gradient-to-r from-accent-600 to-secondary-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-accent-700 hover:to-secondary-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 inline-flex items-center"
              >
                <SparklesIcon className="w-6 h-6 mr-3" />
                {language === 'pt' ? 'Ver Todos os Eventos Exclusivos' : 'See All Exclusive Events'}
                <ArrowRightIcon className="w-6 h-6 ml-3" />
              </button>
              <p className="text-sm text-gray-600 mt-4 max-w-2xl mx-auto">
                {language === 'pt' ?
                  'Acesso instantâneo a 12+ eventos mensais exclusivos para estudantes. Networking, cultura e apoio acadêmico.' :
                  'Instant access to 12+ monthly exclusive student events. Networking, culture, and academic support.'
                }
              </p>
            </div>
          </div>
        </section>

        {/* New Enhanced Student Sections */}
        
        {/* Academic Networking Section */}
        <AcademicNetworkingSection />
        
        {/* Career Hub Section */}
        <CareerHubSection />
        
        {/* Student Discounts Section */}
        <StudentDiscountsSection />
        
        {/* Lusophone-Speaking Host Families */}
        <AccommodationHostFamilies limit={5} showPricing={true} />
        
        {/* Accommodation Support Section */}
        <AccommodationSupportSection />

        {/* Success Stories Carousel */}
        <SuccessStoriesCarousel autoplay={true} autoplayInterval={10000} />

        {/* Student Verification Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-width">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {language === 'pt' ? 'Como Verificar o Seu Status de Estudante' : 'How to Verify Your Student Status'}
                </h2>
                <p className="text-xl text-gray-600">
                  {language === 'pt' ?
                    'Processo simples e seguro para verificar o seu email universitário e desbloquear benefícios exclusivos' :
                    'Simple and secure process to verify your university email and unlock exclusive benefits'
                  }
                </p>
              </div>

              {/* Verification Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <EnvelopeIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {language === 'pt' ? '1. Email Universitário' : '1. University Email'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'pt' ?
                      'Use o seu email universitário oficial (.ac.uk) para verificação automática' :
                      'Use your official university email (.ac.uk) for automatic verification'
                    }
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DocumentTextIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {language === 'pt' ? '2. Documentação' : '2. Documentation'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'pt' ?
                      'Carregue uma cópia do seu cartão de estudante ou carta de confirmação' :
                      'Upload a copy of your student ID or confirmation letter'
                    }
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckBadgeIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {language === 'pt' ? '3. Aprovação' : '3. Approval'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'pt' ?
                      'Verificação em 24-48 horas e acesso imediato aos benefícios' :
                      'Verification within 24-48 hours and immediate access to benefits'
                    }
                  </p>
                </div>
              </div>

              {/* Required Documents */}
              <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  {language === 'pt' ? 'Documentos Aceites para Verificação' : 'Accepted Documents for Verification'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {language === 'pt' ? 'Documentos Primários:' : 'Primary Documents:'}
                    </h4>
                    <div className="space-y-2">
                      {[
                        language === 'pt' ? 'Cartão de estudante universitário válido' : 'Valid university student ID card',
                        language === 'pt' ? 'Carta oficial de confirmação de matrícula' : 'Official enrollment confirmation letter',
                        language === 'pt' ? 'Comprovante de pagamento de propinas' : 'Tuition payment receipt',
                        language === 'pt' ? 'Declaração da universidade (em papel timbrado)' : 'University statement (on letterhead)'
                      ].map((doc, index) => (
                        <div key={index} className="flex items-start">
                          <CheckIconSolid className="w-4 h-4 text-secondary-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {language === 'pt' ? 'Requisitos Técnicos:' : 'Technical Requirements:'}
                    </h4>
                    <div className="space-y-2">
                      {[
                        language === 'pt' ? 'Email universitário ativo (.ac.uk)' : 'Active university email (.ac.uk)',
                        language === 'pt' ? 'Formato de arquivo: PDF, JPG ou PNG' : 'File format: PDF, JPG, or PNG',
                        language === 'pt' ? 'Tamanho máximo: 5MB por arquivo' : 'Maximum size: 5MB per file',
                        language === 'pt' ? 'Imagem clara e legível' : 'Clear and readable image'
                      ].map((req, index) => (
                        <div key={index} className="flex items-start">
                          <CheckIconSolid className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <ShieldCheckIcon className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-yellow-800">
                      <strong>{language === 'pt' ? 'Privacidade e Segurança:' : 'Privacy & Security:'}</strong>
                      <span className="ml-1">
                        {language === 'pt' ?
                          'Todos os documentos são processados de forma segura e eliminados após verificação. Nunca partilhamos informações pessoais.' :
                          'All documents are processed securely and deleted after verification. We never share personal information.'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Start Verification CTA */}
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-4">
                  {language === 'pt' ? 'Pronto para Começar?' : 'Ready to Get Started?'}
                </h3>
                <p className="text-lg mb-6 opacity-90">
                  {language === 'pt' ?
                    'Verifique o seu status de estudante agora e desbloqueie todos os benefícios exclusivos' :
                    'Verify your student status now and unlock all exclusive benefits'
                  }
                </p>
                <button 
                  onClick={handleVerification}
                  className="bg-white text-primary-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {language === 'pt' ? 'Iniciar Verificação' : 'Start Verification'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Student Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="container-width">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === 'pt' ? 'O Que Dizem os Nossos Estudantes' : 'What Our Students Say'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {language === 'pt' ?
                  'Histórias de sucesso de estudantes portugueses que encontraram a sua comunidade através da LusoTown' :
                  'Success stories from Lusophone students who found their community through LusoTown'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sofia Martins',
                  flag: '🇵🇹',
                  country: 'Portugal',
                  university: 'UCL - Lusophone Studies',
                  year: '3º ano',
                  quote: 'A LusoTown mudou completamente a minha experiência universitária. Encontrei amigos de todos os países lusófonos, oportunidades de estágio e até um mentor brasileiro na minha área.',
                  quoteEn: 'LusoTown completely changed my university experience. I found friends from all Portuguese-speaking countries, internship opportunities, and even a Brazilian mentor in my field.',
                  benefits: ['Estágio em empresa brasileira', 'Rede lusófona profissional', 'Eventos multiculturais gratuitos']
                },
                {
                  name: 'Carlos da Silva',
                  flag: '🇧🇷',
                  country: 'Brasil',
                  university: 'Imperial College - Engineering',
                  year: '2º ano',
                  quote: 'Como brasileiro estudando engenharia, encontrei uma comunidade incrível que celebra nossa diversidade. Os eventos de Samba e networking tech abriram muitas portas.',
                  quoteEn: 'As a Brazilian engineering student, I found an incredible community that celebrates our diversity. The Samba events and tech networking opened many doors.',
                  benefits: ['Networking tech lusófono', 'Eventos de Samba/Fado', 'Mentoria multicultural']
                },
                {
                  name: 'Ana Fernandes',
                  flag: '🇦🇴',
                  country: 'Angola',
                  university: 'King\'s College - Literatura',
                  year: 'Mestrado',
                  quote: 'Como estudante angolana, encontrei aqui não só apoio acadêmico mas também eventos de Kizomba e conexão com a minha cultura. Sinto-me verdadeiramente incluída.',
                  quoteEn: 'As an Angolan student, I found not only academic support but also Kizomba events and connection with my culture. I feel truly included.',
                  benefits: ['Eventos de Kizomba', 'Apoio acadêmico', 'Comunidade angolana ativa']
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">
                        {testimonial.flag}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">{testimonial.country}</span>
                      </div>
                      <p className="text-sm text-gray-600">{testimonial.university}</p>
                      <p className="text-xs text-primary-600">{testimonial.year}</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
                    "{language === 'pt' ? testimonial.quote : testimonial.quoteEn}"
                  </blockquote>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2 text-sm">
                      {language === 'pt' ? 'Benefícios utilizados:' : 'Benefits used:'}
                    </h5>
                    <div className="space-y-1">
                      {testimonial.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center text-xs text-gray-600">
                          <CheckIconSolid className="w-3 h-3 text-secondary-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIconSolid key={i} className="w-4 h-4 text-yellow-400" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container-width text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
                <AcademicCapIcon className="w-4 h-4 mr-2" />
                {language === 'pt' ? 
                  `Comunidade Estudantil Lusófona • ${communityStats.viewers}+ estudantes de 10 países lusófonos em universidades do Reino Unido` :
                  `Lusophone Student Community • ${communityStats.viewers}+ students from 10 Portuguese-speaking countries at United Kingdom universities`
                }
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                {language === 'pt' ? 
                  'Junte-se à Maior Comunidade de Estudantes Lusófonos em Universidades do Reino Unido' :
                  'Join the United Kingdom\'s Largest Community of Lusophone-Speaking Students'
                }
              </h2>
              
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                {language === 'pt' ?
                  'Apenas £9.99/mês para acesso completo a benefícios exclusivos, eventos culturais e networking profissional.' :
                  'Just £9.99/month for full access to exclusive benefits, cultural events, and professional networking.'
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button 
                  onClick={handleVerification}
                  className="relative bg-white text-primary-600 font-bold py-5 px-10 rounded-xl hover:bg-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-300 group transform hover:scale-105"
                >
                  <span className="flex items-center justify-center">
                    <AcademicCapIcon className="w-6 h-6 mr-3" />
                    {language === 'pt' ? 'Juntar à Comunidade Agora - £9.99/mês' : 'Join Community Now - £9.99/month'}
                    <ArrowRightIcon className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full animate-bounce font-bold">
                    {language === 'pt' ? '50% OFF' : '50% OFF'}
                  </div>
                </button>
                <button 
                  onClick={() => window.open('https://calendly.com/lusotown-student-demo', '_blank')}
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-bold py-5 px-8 rounded-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105"
                >
                  <VideoCameraIcon className="w-6 h-6 mr-2" />
                  {language === 'pt' ? 'Demo Gratuita (15 min)' : 'Free Demo (15 min)'}
                </button>
              </div>
              
              {/* Additional Social Proof & Urgency */}
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-8 max-w-3xl mx-auto">
                <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
                  <div className="flex items-center text-white/90">
                    <CheckBadgeIcon className="w-5 h-5 mr-2 text-green-300" />
                    <span className="font-medium">{language === 'pt' ? '2150+ estudantes já aderiram' : 'students already joined'}</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <ClockIcon className="w-5 h-5 mr-2 text-yellow-300" />
                    <span className="font-medium">{language === 'pt' ? 'Verificação em 24h' : '24h verification'}</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <GlobeAltIcon className="w-5 h-5 mr-2 text-blue-300" />
                    <span className="font-medium">{language === 'pt' ? '10 países lusófonos' : '10 Lusophone countries'}</span>
                  </div>
                </div>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap justify-center gap-6 text-sm opacity-80">
                <div className="flex items-center">
                  <CheckBadgeIcon className="w-4 h-4 mr-2" />
                  {language === 'pt' ? 'Verificação Segura' : 'Secure Verification'}
                </div>
                <div className="flex items-center">
                  <AcademicCapIcon className="w-4 h-4 mr-2" />
                  {language === 'pt' ? '8 Universidades Parceiras' : '8 Partner Universities'}
                </div>
                <div className="flex items-center">
                  <CurrencyPoundIcon className="w-4 h-4 mr-2" />
                  {language === 'pt' ? '50% Desconto Estudante' : '50% Student Discount'}
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  {language === 'pt' ? 'Aprovação em 24-48h' : '24-48h Approval'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Student Success Stories Carousel */}
        <section className="py-20 bg-gradient-to-br from-premium-50 via-white to-gold-50">
          <div className="container-width">
            <LusophoneCarousel
              items={[
                {
                  id: 'success-maria-engineering',
                  title: {
                    en: 'Maria\'s Engineering Journey',
                    pt: 'Jornada de Engenharia da Maria'
                  },
                  description: {
                    en: 'From Lisbon to Imperial College London - How LusoTown helped me excel in Engineering',
                    pt: 'De Lisboa ao Imperial College London - Como o LusoTown me ajudou a destacar-me em Engenharia'
                  },
                  flagEmoji: '🇵🇹',
                  countries: ['Portugal'],
                  category: 'STEM',
                  studentName: 'Maria Cardoso',
                  university: 'Imperial College London',
                  degree: 'MEng Aeronautical Engineering',
                  year: '3rd Year',
                  achievements: ['Dean\'s List 2023', 'Rolls-Royce Internship', 'Portuguese Society President'],
                  testimonial: {
                    en: 'LusoTown connected me with Portuguese engineers already working in London. Their mentorship was invaluable during my studies and internship applications.',
                    pt: 'O LusoTown ligou-me a engenheiros portugueses que já trabalhavam em Londres. A sua mentoria foi inestimável durante os meus estudos e candidaturas a estágios.'
                  },
                  impact: 'Secured aerospace internship through network'
                },
                {
                  id: 'success-joao-medicine',
                  title: {
                    en: 'João\'s Medical School Success',
                    pt: 'Sucesso do João na Escola de Medicina'
                  },
                  description: {
                    en: 'Brazilian student at UCL Medical School shares his journey and community support',
                    pt: 'Estudante brasileiro da Escola de Medicina da UCL partilha a sua jornada e apoio comunitário'
                  },
                  flagEmoji: '🇧🇷',
                  countries: ['Brazil'],
                  category: 'Medicine',
                  studentName: 'João Santos',
                  university: 'University College London',
                  degree: 'MBBS Medicine',
                  year: '5th Year',
                  achievements: ['Clinical Excellence Award', 'NHS Foundation Trust Placement', 'Brazilian Society VP'],
                  testimonial: {
                    en: 'The Brazilian medical students network through LusoTown helped me navigate clinical placements and understand the NHS system better.',
                    pt: 'A rede de estudantes brasileiros de medicina através do LusoTown ajudou-me a navegar os estágios clínicos e compreender melhor o sistema NHS.'
                  },
                  impact: 'Connected with 50+ medical students'
                },
                {
                  id: 'success-ana-business',
                  title: {
                    en: 'Ana\'s Business Leadership',
                    pt: 'Liderança Empresarial da Ana'
                  },
                  description: {
                    en: 'Angolan entrepreneur building bridges between UK and Africa through her LSE experience',
                    pt: 'Empreendedora angolana construindo pontes entre o Reino Unido e África através da sua experiência na LSE'
                  },
                  flagEmoji: '🇦🇴',
                  countries: ['Angola'],
                  category: 'Business',
                  studentName: 'Ana Ferreira',
                  university: 'London School of Economics',
                  degree: 'MSc International Business',
                  year: 'Graduate',
                  achievements: ['Africa Business Society Founder', 'Goldman Sachs Internship', 'TEDx Speaker'],
                  testimonial: {
                    en: 'LusoTown\'s business network introduced me to African entrepreneurs in London. This led to my fintech startup focusing on Angola-UK trade.',
                    pt: 'A rede de negócios do LusoTown apresentou-me a empreendedores africanos em Londres. Isto levou à minha startup fintech focada no comércio Angola-Reino Unido.'
                  },
                  impact: 'Founded successful fintech startup'
                },
                {
                  id: 'success-carlos-arts',
                  title: {
                    en: 'Carlos\'s Creative Journey',
                    pt: 'Jornada Criativa do Carlos'
                  },
                  description: {
                    en: 'Cape Verdean artist studying at Royal College of Art, preserving culture through contemporary art',
                    pt: 'Artista cabo-verdiano estudando no Royal College of Art, preservando cultura através da arte contemporânea'
                  },
                  flagEmoji: '🇨🇻',
                  countries: ['Cape Verde'],
                  category: 'Arts',
                  studentName: 'Carlos Mendes',
                  university: 'Royal College of Art',
                  degree: 'MA Contemporary Art Practice',
                  year: '2nd Year',
                  achievements: ['Tate Modern Exhibition', 'Arts Council Funding', 'Cultural Ambassador'],
                  testimonial: {
                    en: 'Through LusoTown, I connected with galleries showcasing Lusophone art. My morna-inspired installations now represent Cape Verdean culture in London.',
                    pt: 'Através do LusoTown, conectei-me com galerias que exibem arte lusófona. As minhas instalações inspiradas na morna agora representam a cultura cabo-verdiana em Londres.'
                  },
                  impact: 'Featured in major London galleries'
                }
              ]}
              title={{
                en: 'Portuguese-speaking Student Success Stories',
                pt: 'Histórias de Sucesso de Estudantes Lusófonos'
              }}
              subtitle={{
                en: 'Real journeys of Portuguese-speaking students excelling in UK universities with community support',
                pt: 'Jornadas reais de estudantes lusófonos destacando-se em universidades do Reino Unido com apoio comunitário'
              }}
              renderItem={(story, index) => (
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                  {/* Header with university and flag */}
                  <div className="h-32 bg-gradient-to-r from-primary-500 to-secondary-500 p-4 flex items-end relative">
                    <div className="absolute top-4 right-4 text-3xl">{story.flagEmoji}</div>
                    <div className="text-white">
                      <div className="text-xs opacity-90 mb-1">{story.category}</div>
                      <h3 className="font-bold text-lg line-clamp-2">{story.title[language]}</h3>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1">
                    {/* Student Info */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-900">{story.studentName}</span>
                        <span className="text-sm bg-primary-100 text-primary-700 px-2 py-1 rounded-full">{story.year}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <div className="font-medium">{story.university}</div>
                        <div>{story.degree}</div>
                      </div>
                    </div>

                    {/* Testimonial */}
                    <blockquote className="text-sm text-gray-700 italic mb-4 border-l-4 border-primary-300 pl-3">
                      "{story.testimonial[language]}"
                    </blockquote>

                    {/* Key Achievements */}
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-gray-800 mb-2">Key Achievements:</div>
                      <div className="flex flex-wrap gap-1">
                        {story.achievements.slice(0, 2).map((achievement, i) => (
                          <span 
                            key={i}
                            className="bg-gold-100 text-gold-800 px-2 py-1 rounded text-xs"
                          >
                            {achievement}
                          </span>
                        ))}
                        {story.achievements.length > 2 && (
                          <span className="text-xs text-gray-500 px-2 py-1">
                            +{story.achievements.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Impact */}
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm">
                        <TrophyIcon className="w-4 h-4 text-gold-500" />
                        <span className="text-gray-600">Impact:</span>
                        <span className="font-medium text-primary-600">{story.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              showControls={true}
              showDots={true}
              autoAdvance={true}
              autoAdvanceInterval={9000}
              className="mb-12"
              onItemClick={(story) => {
                console.log('Selected success story:', story.studentName)
              }}
              mobileSettings={{
                enableSwipeGestures: true,
                enablePullToRefresh: true,
                enableLazyLoading: true
              }}
              enablePortugueseGestures={true}
              enableAccessibilityAnnouncements={true}
            />
          </div>
        </section>

        {/* Student Verification Modal */}
        {showVerificationModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {language === 'pt' ? 'Verificação de Estudante' : 'Student Verification'}
                  </h3>
                  <button 
                    onClick={() => setShowVerificationModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="sr-only">{language === 'pt' ? 'Fechar' : 'Close'}</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center mb-6">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    verificationStep >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    1
                  </div>
                  <div className={`flex-1 h-1 mx-2 ${verificationStep >= 2 ? 'bg-primary-500' : 'bg-gray-200'}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    verificationStep >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    2
                  </div>
                  <div className={`flex-1 h-1 mx-2 ${verificationStep >= 3 ? 'bg-primary-500' : 'bg-gray-200'}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    verificationStep >= 3 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    3
                  </div>
                </div>

                {verificationStep === 1 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      {language === 'pt' ? 'Passo 1: Email Universitário' : 'Step 1: University Email'}
                    </h4>
                    <p className="text-gray-600 mb-6">
                      {language === 'pt' ?
                        'Por favor, insira o seu email universitário oficial (.ac.uk) para verificação automática.' :
                        'Please enter your official university email (.ac.uk) for automatic verification.'
                      }
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'pt' ? 'Email Universitário' : 'University Email'}
                        </label>
                        <input
                          type="email"
                          placeholder="your.name@university.ac.uk"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'pt' ? 'Universidade' : 'University'}
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                          <option value="">{language === 'pt' ? 'Selecione a sua universidade' : 'Select your university'}</option>
                          {UNIVERSITIES.map(uni => (
                            <option key={uni.id} value={uni.id}>{uni.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'pt' ? 'Ano de Estudo' : 'Year of Study'}
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                          <option value="">{language === 'pt' ? 'Selecione o ano' : 'Select year'}</option>
                          <option value="1st">1st Year</option>
                          <option value="2nd">2nd Year</option>
                          <option value="3rd">3rd Year</option>
                          <option value="4th">4th Year</option>
                          <option value="masters">Masters</option>
                          <option value="phd">PhD</option>
                        </select>
                      </div>
                      <button 
                        onClick={handleEmailVerification}
                        className="w-full bg-primary-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors"
                      >
                        {language === 'pt' ? 'Enviar Email de Verificação' : 'Send Verification Email'}
                      </button>
                    </div>
                  </div>
                )}

                {verificationStep === 2 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      {language === 'pt' ? 'Passo 2: Documentação' : 'Step 2: Documentation'}
                    </h4>
                    <p className="text-gray-600 mb-6">
                      {language === 'pt' ?
                        'Carregue uma cópia do seu cartão de estudante ou carta de confirmação da universidade.' :
                        'Upload a copy of your student ID or university confirmation letter.'
                      }
                    </p>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">
                          {language === 'pt' ? 'Arraste ficheiros aqui ou clique para selecionar' : 'Drag files here or click to select'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {language === 'pt' ? 'PDF, JPG ou PNG (máx. 5MB)' : 'PDF, JPG or PNG (max 5MB)'}
                        </p>
                        <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                      </div>
                      <button 
                        onClick={() => setVerificationStep(3)}
                        className="w-full bg-primary-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors"
                      >
                        {language === 'pt' ? 'Carregar Documento' : 'Upload Document'}
                      </button>
                    </div>
                  </div>
                )}

                {verificationStep === 3 && (
                  <div className="text-center">
                    <CheckBadgeIcon className="w-16 h-16 text-secondary-500 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      {language === 'pt' ? 'Verificação Submetida!' : 'Verification Submitted!'}
                    </h4>
                    <p className="text-gray-600 mb-6">
                      {language === 'pt' ?
                        'A sua verificação foi submetida com sucesso. Receberá um email de confirmação em 24-48 horas com acesso aos benefícios estudantis.' :
                        'Your verification has been successfully submitted. You will receive a confirmation email within 24-48 hours with access to student benefits.'
                      }
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <h5 className="font-medium text-green-800 mb-2">
                        {language === 'pt' ? 'Próximos Passos:' : 'Next Steps:'}
                      </h5>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• {language === 'pt' ? 'Verifique o seu email para confirmação' : 'Check your email for confirmation'}</li>
                        <li>• {language === 'pt' ? 'Complete o seu perfil LusoTown' : 'Complete your LusoTown profile'}</li>
                        <li>• {language === 'pt' ? 'Explore eventos exclusivos para estudantes' : 'Explore student-exclusive events'}</li>
                        <li>• {language === 'pt' ? 'Conecte-se com outros estudantes portugueses' : 'Connect with other Lusophone students'}</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => setShowVerificationModal(false)}
                      className="bg-primary-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      {language === 'pt' ? 'Concluir' : 'Complete'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}