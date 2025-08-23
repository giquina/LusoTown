'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import { communityStats } from '@/config/community'
import { SUBSCRIPTION_PLANS, STUDENT_PRICING, formatPrice } from '@/config/pricing'
import { IMAGES, UNIVERSITY_URLS } from '@/config/cdn'

// Import new student-specific components
import StudentEventsSection from '@/components/students/StudentEventsSection'
import AcademicNetworkingSection from '@/components/students/AcademicNetworkingSection'
import CareerHubSection from '@/components/students/CareerHubSection'
import StudentDiscountsSection from '@/components/students/StudentDiscountsSection'
import AccommodationSupportSection from '@/components/students/AccommodationSupportSection'
import { 
  AcademicCapIcon,
  StarIcon,
  UsersIcon,
  CalendarDaysIcon,
  GlobeAltIcon,
  CheckBadgeIcon,
  CurrencyPoundIcon,
  UserGroupIcon,
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
      undergraduate: ['Portuguese & Brazilian Studies', 'Modern Languages with Portuguese', 'International Business with Portuguese'],
      postgraduate: ['Portuguese Literature MA', 'Lusophone Studies MA', 'Brazilian Cultural Studies MA'],
      research: ['Portuguese Language PhD', 'Lusophone Literature PhD', 'Portuguese History PhD'],
      languageCourses: ['Portuguese A1-C2', 'Business Portuguese', 'Portuguese for Heritage Speakers']
    },
    benefits: [
      '50% discount on LusoTown membership (£9.99/month)',
      'Priority access to Portuguese cultural events',
      'Free Portuguese language exchange sessions',
      'Career mentorship with Portuguese professionals',
      'Exclusive networking events with Portuguese Alumni'
    ],
    website: UNIVERSITY_URLS.ucl,
    contact: {
      name: 'Dr. Maria Fernandes',
      title: 'Portuguese Studies Coordinator & LusoTown Liaison',
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
      undergraduate: ['Portuguese Studies', 'Comparative Literature with Portuguese', 'European Studies with Portuguese'],
      postgraduate: ['Portuguese & Brazilian Studies MA', 'Digital Humanities with Portuguese Sources MA'],
      research: ['Portuguese Cultural Studies PhD', 'Lusophone Digital Humanities PhD'],
      languageCourses: ['Portuguese Language & Culture', 'Advanced Portuguese Communication', 'Portuguese Translation Studies']
    },
    benefits: [
      '50% discount on LusoTown membership',
      'Free access to Instituto Camões events',
      'Portuguese business networking opportunities',
      'Study abroad support for Portugal/Brazil',
      'Career services with Portuguese connections'
    ],
    website: UNIVERSITY_URLS.kcl,
    contact: {
      name: 'Prof. João Silva',
      title: 'Head of Portuguese Department',
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
      undergraduate: ['Portuguese', 'Modern Languages (Portuguese)', 'Portuguese & Linguistics'],
      postgraduate: ['Portuguese Studies MPhil', 'Comparative Literature & Criticism'],
      research: ['Portuguese Literature DPhil', 'Lusophone Studies DPhil'],
      languageCourses: ['Portuguese Language (all levels)', 'Portuguese Literature & Culture']
    },
    benefits: [
      '50% discount on LusoTown membership',
      'Access to Oxford Portuguese Society',
      'Portuguese academic conferences',
      'Research collaboration opportunities',
      'Alumni network in Portuguese-speaking countries'
    ],
    website: UNIVERSITY_URLS.oxford,
    contact: {
      name: 'Dr. Ana Rebelo',
      title: 'Lecturer in Portuguese Literature',
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
      undergraduate: ['Modern & Medieval Languages (Portuguese)', 'Portuguese Studies'],
      postgraduate: ['Portuguese Literature MPhil', 'Romance Linguistics MPhil'],
      research: ['Portuguese Language & Literature PhD', 'Comparative Romance Studies PhD'],
      languageCourses: ['Portuguese Language (Beginner to Advanced)', 'Portuguese Cultural Studies']
    },
    benefits: [
      '50% discount on LusoTown membership',
      'Cambridge Portuguese Society membership',
      'Academic Portuguese language support',
      'Research funding for Portuguese studies',
      'International exchange program support'
    ],
    website: UNIVERSITY_URLS.cambridge,
    contact: {
      name: 'Dr. Carlos Mendes',
      title: 'Director of Portuguese Studies',
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
      languageCourses: ['Portuguese for Business', 'Portuguese for Social Scientists']
    },
    benefits: [
      '50% discount on LusoTown membership',
      'Portuguese business networking events',
      'Career services for Portuguese market',
      'Portuguese economist speaker series',
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
      languageCourses: ['Portuguese for Engineers', 'Technical Portuguese Communication']
    },
    benefits: [
      '50% discount on LusoTown membership',
      'Portuguese tech networking events',
      'Career support for Portuguese tech sector',
      'Portuguese startup ecosystem connections',
      'Research collaboration with Portuguese institutions'
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
      undergraduate: ['Spanish & Portuguese Studies', 'Modern Languages with Portuguese'],
      postgraduate: ['Hispanic & Lusophone Studies MA', 'Translation & Interpretation Studies'],
      research: ['Portuguese Literature PhD', 'Comparative Literature PhD'],
      languageCourses: ['Portuguese Language & Culture', 'Business Portuguese for International Trade']
    },
    benefits: [
      '50% discount on LusoTown membership',
      'Manchester Portuguese Society support',
      'Northern Portuguese-speaking community connections',
      'Portuguese cultural event organization support',
      'Mentorship with Portuguese alumni network'
    ],
    website: UNIVERSITY_URLS.manchester,
    contact: {
      name: 'Dr. Luisa Rodrigues',
      title: 'Portuguese Studies Programme Leader',
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
      undergraduate: ['Portuguese Studies', 'Hispanic Studies with Portuguese', 'Comparative Literature'],
      postgraduate: ['Lusophone Studies MSc', 'Celtic & Scottish Studies with Portuguese connections'],
      research: ['Portuguese Cultural Studies PhD', 'Comparative Celtic-Lusophone Studies PhD'],
      languageCourses: ['Portuguese Language (All Levels)', 'Portuguese Cultural Immersion']
    },
    benefits: [
      '50% discount on LusoTown membership',
      'Edinburgh Portuguese Society partnership',
      'Scottish-Portuguese cultural exchange',
      'Research funding for Portuguese studies',
      'Virtual connection to London Portuguese-speaking community'
    ],
    website: UNIVERSITY_URLS.edinburgh,
    contact: {
      name: 'Dr. Fernando Alves',
      title: 'Senior Lecturer in Portuguese Studies',
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
    title: 'Free Portuguese Language Exchange Programs',
    titlePortuguese: 'Programas Gratuitos de Intercâmbio de Língua Portuguesa',
    description: 'Weekly language exchange sessions with native Portuguese speakers and heritage learners. Improve your Portuguese while helping others learn English.',
    descriptionPortuguese: 'Sessões semanais de intercâmbio linguístico com falantes nativos de português e estudantes de herança. Melhore o seu português enquanto ajuda outros a aprender inglês.',
    category: 'academic',
    eligibility: ['University students', 'All Portuguese levels welcome'],
    verificationRequired: true,
    value: '£200 equivalent value'
  },
  {
    id: 'career-mentorship',
    title: 'Portuguese Professional Mentorship Program',
    titlePortuguese: 'Programa de Mentoria Profissional Portuguesa',
    description: 'One-on-one mentorship with established Portuguese professionals in your field of study. Career guidance, industry insights, and networking opportunities.',
    descriptionPortuguese: 'Mentoria individual com profissionais portugueses estabelecidos na sua área de estudo. Orientação profissional, insights da indústria e oportunidades de networking.',
    category: 'professional',
    eligibility: ['Final year students', 'Recent graduates', 'All academic disciplines'],
    verificationRequired: true,
    value: '£300+ equivalent value'
  },
  {
    id: 'study-groups',
    title: 'Portuguese Student Study Groups',
    titlePortuguese: 'Grupos de Estudo de Estudantes Portugueses',
    description: 'Subject-specific study groups connecting Portuguese students across United Kingdom universities. Share resources, collaborate on projects, and support each other academically.',
    descriptionPortuguese: 'Grupos de estudo específicos por disciplina conectando estudantes portugueses em universidades do Reino Unido. Partilhe recursos, colabore em projetos e apoiem-se mutuamente academicamente.',
    category: 'academic',
    eligibility: ['University students', 'All subjects welcome'],
    verificationRequired: true,
    value: 'Free collaboration platform'
  },
  {
    id: 'cultural-events',
    title: 'Student-Exclusive Cultural Events',
    titlePortuguese: 'Eventos Culturais Exclusivos para Estudantes',
    description: 'Monthly cultural events designed specifically for Portuguese students: movie nights, traditional food experiences, fado evenings, and festival celebrations.',
    descriptionPortuguese: 'Eventos culturais mensais desenhados especificamente para estudantes portugueses: noites de cinema, experiências de comida tradicional, noites de fado e celebrações de festivais.',
    category: 'cultural',
    eligibility: ['University students', 'Student verification required'],
    verificationRequired: true,
    value: 'Monthly cultural programming'
  },
  {
    id: 'internship-opportunities',
    title: 'Portuguese Business Internship Network',
    titlePortuguese: 'Rede de Estágios em Negócios Portugueses',
    description: 'Exclusive access to internship opportunities with Portuguese businesses in London, United Kingdom, and Portugal. Gain professional experience in Portuguese-speaking environments.',
    descriptionPortuguese: 'Acesso exclusivo a oportunidades de estágio com empresas portuguesas em Londres, Reino Unido e Portugal. Ganhe experiência profissional em ambientes de língua portuguesa.',
    category: 'professional',
    eligibility: ['University students', 'Recent graduates', 'All disciplines considered'],
    verificationRequired: true,
    value: 'Career advancement opportunities'
  },
  {
    id: 'academic-support',
    title: 'Portuguese Academic Support Services',
    titlePortuguese: 'Serviços de Apoio Acadêmico Português',
    description: 'Academic writing support, research guidance, and dissertation help specifically for Portuguese-related studies. Connect with Portuguese academic mentors.',
    descriptionPortuguese: 'Apoio à escrita acadêmica, orientação de pesquisa e ajuda com dissertações especificamente para estudos relacionados com Portugal. Conecte-se com mentores acadêmicos portugueses.',
    category: 'academic',
    eligibility: ['Students in Portuguese studies', 'Lusophone research students', 'Any Portuguese-related academic work'],
    verificationRequired: true,
    value: 'Specialized academic guidance'
  },
  {
    id: 'networking-events',
    title: 'Student Professional Networking Events',
    titlePortuguese: 'Eventos de Networking Profissional para Estudantes',
    description: 'Quarterly networking events connecting students with Portuguese professionals, entrepreneurs, and recent graduates. Build your professional network early.',
    descriptionPortuguese: 'Eventos trimestrais de networking conectando estudantes com profissionais portugueses, empresários e recém-graduados. Construa a sua rede profissional desde cedo.',
    category: 'professional',
    eligibility: ['University students', 'All years and disciplines'],
    verificationRequired: true,
    value: 'Professional network building'
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
    title: 'Portuguese Tech Career Workshop',
    titlePortuguese: 'Workshop de Carreira em Tecnologia Portuguesa',
    type: 'career',
    date: '2024-09-15',
    time: '14:00',
    location: 'Imperial College London',
    university: 'Imperial College London',
    price: 0,
    originalPrice: 25,
    capacity: 40,
    description: 'Explore career opportunities in Portugal\'s booming tech sector. Learn about Portuguese startups, multinational tech companies, and remote work opportunities.',
    speakers: ['Ana Silva - CTO at Portuguese Startup', 'Miguel Costa - Google Portugal', 'Joana Fernandes - Startup Founder'],
    isStudentExclusive: true
  },
  {
    id: 'portuguese-film-night',
    title: 'Portuguese Cinema Student Night',
    titlePortuguese: 'Noite de Cinema Português para Estudantes',
    type: 'cultural',
    date: '2024-09-20',
    time: '19:00',
    location: 'King\'s College London - Cinema',
    university: 'King\'s College London',
    price: 5,
    originalPrice: 15,
    capacity: 80,
    description: 'Monthly Portuguese film screening followed by discussion with Portuguese studies students and film experts. This month: contemporary Portuguese cinema.',
    speakers: ['Dr. Maria Fernandes - Portuguese Studies', 'Carlos Mendes - Film Critic'],
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
    description: 'Connect with Portuguese professionals across industries. Practice networking skills, learn about career paths, and discover internship opportunities.',
    speakers: ['Multiple Portuguese professionals from various industries'],
    isStudentExclusive: false
  },
  {
    id: 'study-abroad-info',
    title: 'Study in Portugal Information Session',
    titlePortuguese: 'Sessão de Informação Estudar em Portugal',
    type: 'academic',
    date: '2024-10-02',
    time: '16:00',
    location: 'UCL - Portuguese Studies Department',
    university: 'University College London',
    price: 0,
    capacity: 50,
    description: 'Learn about study abroad opportunities in Portugal, Erasmus+ programs, Portuguese universities, and cultural preparation for your exchange.',
    speakers: ['Portuguese Embassy Education Attaché', 'Erasmus+ Coordinator', 'Student Exchange Alumni'],
    isStudentExclusive: true
  },
  {
    id: 'portuguese-startup-pitch',
    title: 'Portuguese Startup Pitch Competition',
    titlePortuguese: 'Competição de Pitch de Startups Portuguesas',
    type: 'career',
    date: '2024-10-10',
    time: '13:00',
    location: 'LSE - Entrepreneurship Hub',
    university: 'London School of Economics',
    price: 0,
    capacity: 100,
    description: 'Student entrepreneurs pitch their business ideas to Portuguese investors and successful entrepreneurs. Win mentorship and potential funding.',
    speakers: ['Portuguese Angel Investors', 'Successful Portuguese Entrepreneurs', 'Business Mentors'],
    isStudentExclusive: true
  },
  {
    id: 'fado-workshop',
    title: 'Traditional Fado Workshop for Students',
    titlePortuguese: 'Workshop de Fado Tradicional para Estudantes',
    type: 'cultural',
    date: '2024-10-15',
    time: '19:30',
    location: 'Instituto Camões Centre London',
    price: 8,
    originalPrice: 25,
    capacity: 30,
    description: 'Learn about the history and techniques of Fado with professional Fado singers. Workshop includes basic guitar techniques and singing fundamentals.',
    speakers: ['Maria João - Professional Fadista', 'António Silva - Portuguese Guitar Master'],
    isStudentExclusive: true
  }
]

export default function StudentsPage() {
  const { language } = useLanguage()
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
                      ? "Estudantes Portugueses • 8 Universidades Parceiras"
                      : "Portuguese Students • 8 Partner Universities"}
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
                      Estudantes portugueses em
                      <br />
                      <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                        universidades do Reino Unido
                      </span>
                    </>
                  ) : (
                    <>
                      Portuguese students at
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
                        Portugueses
                      </span>
                    </>
                  ) : (
                    <>
                      Portuguese
                      <br />
                      <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                        Students
                      </span>
                    </>
                  )}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              >
                {/* Desktop full subtitle */}
                <span className="hidden sm:block">
                  {language === 'pt'
                    ? "Conecte-se com a maior comunidade de estudantes portugueses em universidades de Londres e do Reino Unido. Descontos exclusivos de 50%, eventos culturais autênticos, networking profissional e apoio académico especializado."
                    : "Connect with the largest community of Portuguese students at London and United Kingdom universities. Exclusive 50% discounts, authentic cultural events, professional networking, and specialized academic support."}
                </span>
                {/* Mobile short subtitle */}
                <span className="sm:hidden">
                  {language === 'pt'
                    ? "Conecte-se com estudantes portugueses em universidades do Reino Unido. Descontos exclusivos, eventos culturais e networking profissional."
                    : "Connect with Portuguese students at United Kingdom universities. Exclusive discounts, cultural events, and professional networking."}
                </span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
              >
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span>
                    {language === 'pt'
                      ? `${communityStats.viewers} Estudantes Portugueses`
                      : `${communityStats.viewers} Portuguese Students`}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                  <span>
                    {language === 'pt'
                      ? "50% Desconto na Adesão"
                      : "50% Membership Discount"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                  <span>
                    {language === 'pt'
                      ? "Eventos Exclusivos"
                      : "Exclusive Events"}
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
                  className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1"
                >
                  {language === 'pt' ? "Verificar Email Estudante" : "Verify Student Email"}
                </button>
                <button
                  onClick={() => document.getElementById('partner-universities')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {language === 'pt' ? "Ver Universidades Parceiras" : "View Partner Universities"}
                </button>
              </motion.div>

              {/* Key Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="text-2xl font-bold text-primary-600 mb-1">{communityStats.viewers}</div>
                  <div className="text-xs text-gray-600">{language === 'pt' ? 'Estudantes Portugueses no Reino Unido' : 'Portuguese Students in United Kingdom'}</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="text-2xl font-bold text-secondary-600 mb-1">8</div>
                  <div className="text-xs text-gray-600">{language === 'pt' ? 'Universidades Parceiras' : 'Partner Universities'}</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="text-2xl font-bold text-accent-600 mb-1">50%</div>
                  <div className="text-xs text-gray-600">{language === 'pt' ? 'Desconto Estudante' : 'Student Discount'}</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="text-2xl font-bold text-premium-600 mb-1">£9.99</div>
                  <div className="text-xs text-gray-600">{language === 'pt' ? 'Por mês (estudante)' : 'Per month (student)'}</div>
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
                  'Descontos especiais, eventos exclusivos e apoio acadêmico para estudantes portugueses que estudam em universidades de Londres e do Reino Unido' :
                  'Special discounts, exclusive events, and academic support for Portuguese students studying at London and United Kingdom universities'
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
                        {benefit.category === 'social' && <UserGroupIcon className="w-6 h-6" />}
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

            {/* Value Proposition */}
            <div className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {language === 'pt' ? 'Valor Total dos Benefícios para Estudantes' : 'Total Value of Student Benefits'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-secondary-600 mb-2">£800+</div>
                  <div className="text-sm text-gray-600">{language === 'pt' ? 'Valor anual em benefícios' : 'Annual value in benefits'}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600 mb-2">£9.99</div>
                  <div className="text-sm text-gray-600">{language === 'pt' ? 'Custo anual para estudantes' : 'Annual cost for students'}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary-600 mb-2">6400%</div>
                  <div className="text-sm text-gray-600">{language === 'pt' ? 'Retorno do investimento' : 'Return on investment'}</div>
                </div>
              </div>
            </div>
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
                  'We collaborate with leading London and United Kingdom universities to support Portuguese students and Portuguese studies programs'
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
                          {language === 'pt' ? 'Programas Portugueses' : 'Portuguese Programs'}
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
                  <div className="text-sm text-gray-600">{language === 'pt' ? 'Estudantes Portugueses Apoiados' : 'Portuguese Students Supported'}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary-600 mb-2">45</div>
                  <div className="text-sm text-gray-600">{language === 'pt' ? 'Programas de Estudos Portugueses' : 'Portuguese Studies Programs'}</div>
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

        {/* Enhanced Student Events Section */}
        <StudentEventsSection />

        {/* New Enhanced Student Sections */}
        
        {/* Academic Networking Section */}
        <AcademicNetworkingSection />
        
        {/* Career Hub Section */}
        <CareerHubSection />
        
        {/* Student Discounts Section */}
        <StudentDiscountsSection />
        
        {/* Accommodation Support Section */}
        <AccommodationSupportSection />

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
                  'Success stories from Portuguese students who found their community through LusoTown'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sofia Martins',
                  university: 'UCL - Portuguese Studies',
                  year: '3º ano',
                  quote: 'A LusoTown mudou completamente a minha experiência universitária. Encontrei amigos portugueses, oportunidades de estágio e até um mentor na minha área.',
                  quoteEn: 'LusoTown completely changed my university experience. I found Portuguese-speaking friends, internship opportunities, and even a mentor in my field.',
                  benefits: ['Estágio em empresa portuguesa', 'Rede de contactos profissionais', 'Eventos culturais gratuitos']
                },
                {
                  name: 'Miguel Santos',
                  university: 'Imperial College - Engineering',
                  year: '2º ano',
                  quote: 'Como estudante de engenharia, não esperava encontrar uma comunidade de falantes de português tão forte. Os eventos de networking abriram-me muitas portas.',
                  quoteEn: 'As an engineering student, I didn\'t expect to find such a strong Portuguese-speaking community. The networking events opened many doors for me.',
                  benefits: ['Networking tech português', 'Mentoria profissional', 'Desconto na adesão']
                },
                {
                  name: 'Ana Rodrigues',
                  university: 'King\'s College - Literatura',
                  year: 'Mestrado',
                  quote: 'A ligação com o Instituto Camões através da LusoTown foi crucial para a minha investigação. Tive acesso a recursos únicos.',
                  quoteEn: 'The connection with Instituto Camões through LusoTown was crucial for my research. I had access to unique resources.',
                  benefits: ['Acesso biblioteca digital', 'Apoio académico', 'Conferências gratuitas']
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary-600 font-bold text-lg">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
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
                  `Comunidade Estudantil • ${communityStats.viewers} estudantes portugueses em universidades do Reino Unido` :
                  `Student Community • ${communityStats.viewers} Portuguese students at United Kingdom universities`
                }
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                {language === 'pt' ? 
                  'Junte-se à Maior Comunidade de Estudantes Portugueses em Universidades do Reino Unido' :
                  'Join the United Kingdom\'s Largest Community of Portuguese Students at United Kingdom Universities'
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
                  className="bg-white text-primary-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-200 group"
                >
                  <span className="flex items-center justify-center">
                    {language === 'pt' ? 'Verificar Email Universitário' : 'Verify University Email'}
                    <ArrowRightIcon className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-bold py-4 px-8 rounded-xl transition-all duration-200">
                  {language === 'pt' ? 'Saber Mais sobre Benefícios' : 'Learn About Benefits'}
                </button>
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
                        <li>• {language === 'pt' ? 'Conecte-se com outros estudantes portugueses' : 'Connect with other Portuguese students'}</li>
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