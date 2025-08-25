'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { usePlatformIntegration } from '@/context/PlatformIntegrationContext'
import {
  AcademicCapIcon,
  LanguageIcon,
  BookOpenIcon,
  GlobeAltIcon,
  CalendarDaysIcon,
  MapPinIcon,
  UserGroupIcon,
  TrophyIcon,
  CheckBadgeIcon,
  StarIcon,
  ArrowRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  LinkIcon,
  DocumentTextIcon,
  PresentationChartLineIcon,
  CurrencyPoundIcon,
  ClockIcon,
  GiftIcon,
  ScaleIcon,
  SparklesIcon,
  BuildingLibraryIcon
} from '@heroicons/react/24/outline'

interface CamoesCenter {
  id: string
  name: string
  namePortuguese: string
  location: string
  address: string
  established: string
  director: {
    name: string
    title: string
    titlePortuguese: string
    email: string
    phone: string
  }
  programs: CulturalProgram[]
  facilities: string[]
  facilitiesPortuguese: string[]
  membershipTiers: MembershipTier[]
  monthlyEvents: number
  studentsEnrolled: number
  partnerInstitutions: number
  culturalExchanges: number
  website: string
  socialMedia: {
    facebook: string
    instagram: string
    twitter: string
  }
  openingHours: {
    weekdays: string
    weekends: string
  }
  specializations: string[]
  specializationsPortuguese: string[]
}

interface CulturalProgram {
  id: string
  title: string
  titlePortuguese: string
  category: 'language_learning' | 'cultural_workshops' | 'academic_courses' | 'certification' | 'heritage_studies'
  description: string
  descriptionPortuguese: string
  duration: string
  durationPortuguese: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'all_levels'
  levelPortuguese: string
  price: number
  memberPrice: number
  schedule: {
    days: string[]
    times: string
    timesPortuguese: string
  }
  instructor: {
    name: string
    qualifications: string
    qualificationsPortuguese: string
  }
  capacity: number
  enrolled: number
  startDate: string
  endDate: string
  materials: string[]
  materialsPortuguese: string[]
  certification: boolean
  prerequisites: string
  prerequisitesPortuguese: string
}

interface MembershipTier {
  id: string
  name: string
  namePortuguese: string
  price: number
  duration: string
  durationPortuguese: string
  benefits: string[]
  benefitsPortuguese: string[]
  discounts: {
    courses: number
    events: number
    materials: number
  }
  priority: boolean
  exclusive: string[]
  exclusivePortuguese: string[]
}

interface LanguageCertification {
  id: string
  name: string
  namePortuguese: string
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  description: string
  descriptionPortuguese: string
  requirements: string[]
  requirementsPortuguese: string[]
  examFee: number
  preparationCourse: {
    available: boolean
    duration: string
    durationPortuguese: string
    price: number
  }
  examDates: string[]
  resultProcessing: string
  resultProcessingPortuguese: string
  validityPeriod: string
  validityPeriodPortuguese: string
  recognition: string[]
  recognitionPortuguese: string[]
}

const CamoesInstitutesIntegration: React.FC = () => {
  const { language } = useLanguage()
  const { trackActivity } = usePlatformIntegration()
  const [selectedCenter, setSelectedCenter] = useState<string>('london')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [camoesCenters, setCamoesCenters] = useState<CamoesCenter[]>([])
  const [languageCertifications, setLanguageCertifications] = useState<LanguageCertification[]>([])
  const [featuredPrograms, setFeaturedPrograms] = useState<CulturalProgram[]>([])

  useEffect(() => {
    loadCamoesData()
    trackActivity({
      activityType: 'camoes_institutes_access',
      metadata: { section: 'cultural_institutions', timestamp: new Date().toISOString() }
    })
  }, [])

  const loadCamoesData = async () => {
    setLoading(true)
    try {
      // Simulate API call - in real implementation, this would fetch from Camões Institute APIs
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setCamoesCenters([
        {
          id: 'london',
          name: 'Camões Centre London',
          namePortuguese: 'Centro Camões Londres',
          location: 'London, United Kingdom',
          address: 'King\'s College London, Strand, London WC2R 2LS',
          established: '2019',
          director: {
            name: 'Dr. Sofia Tavares',
            title: 'Centre Director',
            titlePortuguese: 'Diretora do Centro',
            email: 'sofia.tavares@kcl.ac.uk',
            phone: '+44 20 7848 2299'
          },
          programs: [], // Will be populated with featured programs
          facilities: [
            'Modern classrooms with interactive technology',
            'Lusophone literature library',
            'Cultural exhibition space',
            'Conference and seminar rooms',
            'Student common area',
            'Computer lab with language software'
          ],
          facilitiesPortuguese: [
            'Salas de aula modernas com tecnologia interativa',
            'Biblioteca de literatura portuguesa',
            'Espaço de exposições culturais',
            'Salas de conferência e seminário',
            'Área comum para estudantes',
            'Laboratório informático com software linguístico'
          ],
          membershipTiers: [
            {
              id: 'student',
              name: 'Student Membership',
              namePortuguese: 'Sócio Estudante',
              price: 25,
              duration: 'Annual',
              durationPortuguese: 'Anual',
              benefits: [
                '20% discount on all courses',
                'Free access to cultural events',
                'Library borrowing privileges',
                'Study space access',
                'Course materials discount'
              ],
              benefitsPortuguese: [
                '20% desconto em todos os cursos',
                'Acesso gratuito a eventos culturais',
                'Privilégios de empréstimo da biblioteca',
                'Acesso ao espaço de estudo',
                'Desconto em materiais de curso'
              ],
              discounts: { courses: 20, events: 100, materials: 15 },
              priority: false,
              exclusive: ['Student study groups', 'Exam preparation sessions'],
              exclusivePortuguese: ['Grupos de estudo estudantis', 'Sessões de preparação para exames']
            },
            {
              id: 'community',
              name: 'Community Membership',
              namePortuguese: 'Sócio Comunitário',
              price: 45,
              duration: 'Annual',
              durationPortuguese: 'Anual',
              benefits: [
                '25% discount on all courses',
                'Free access to cultural events',
                'Library and digital resources access',
                'Priority booking for popular courses',
                'Networking event invitations'
              ],
              benefitsPortuguese: [
                '25% desconto em todos os cursos',
                'Acesso gratuito a eventos culturais',
                'Acesso à biblioteca e recursos digitais',
                'Reserva prioritária para cursos populares',
                'Convites para eventos de networking'
              ],
              discounts: { courses: 25, events: 100, materials: 20 },
              priority: true,
              exclusive: ['Monthly Lusophone conversation groups', 'Cultural heritage workshops'],
              exclusivePortuguese: ['Grupos de conversa portuguesa mensais', 'Oficinas de património cultural']
            },
            {
              id: 'professional',
              name: 'Professional Membership',
              namePortuguese: 'Sócio Profissional',
              price: 75,
              duration: 'Annual',
              durationPortuguese: 'Anual',
              benefits: [
                '35% discount on all courses',
                'Free access to all events and conferences',
                'Premium library access',
                'One-on-one language coaching sessions',
                'Business Lusophone certification programs'
              ],
              benefitsPortuguese: [
                '35% desconto em todos os cursos',
                'Acesso gratuito a todos os eventos e conferências',
                'Acesso premium à biblioteca',
                'Sessões de coaching linguístico individual',
                'Programas de certificação em português empresarial'
              ],
              discounts: { courses: 35, events: 100, materials: 25 },
              priority: true,
              exclusive: ['Business Lusophone workshops', 'Professional certification fast-track'],
              exclusivePortuguese: ['Oficinas de português empresarial', 'Certificação profissional acelerada']
            }
          ],
          monthlyEvents: 12,
          studentsEnrolled: 485,
          partnerInstitutions: 8,
          culturalExchanges: 6,
          website: 'https://www.kcl.ac.uk/camoes',
          socialMedia: {
            facebook: 'https://facebook.com/CamoesKCL',
            instagram: 'https://instagram.com/camoes_kcl',
            twitter: 'https://twitter.com/CamoesKCL'
          },
          openingHours: {
            weekdays: 'Monday-Friday: 9:00-21:00',
            weekends: 'Saturday: 9:00-17:00, Sunday: Closed'
          },
          specializations: [
            'Lusophone Language Certification',
            'Lusophone Literature Studies',
            'Lusophone History and Culture',
            'Business Lusophone',
            'Lusophone for Academic Purposes'
          ],
          specializationsPortuguese: [
            'Certificação da Língua Portuguesa',
            'Estudos de Literatura Lusófona',
            'História e Cultura Portuguesa',
            'Português Empresarial',
            'Português para Fins Académicos'
          ]
        },
        {
          id: 'manchester',
          name: 'Camões Centre Manchester',
          namePortuguese: 'Centro Camões Manchester',
          location: 'Manchester, United Kingdom',
          address: 'University of Manchester, Oxford Rd, Manchester M13 9PL',
          established: '2021',
          director: {
            name: 'Dr. João Pereira',
            title: 'Centre Director',
            titlePortuguese: 'Diretor do Centro',
            email: 'joao.pereira@manchester.ac.uk',
            phone: '+44 161 275 2000'
          },
          programs: [],
          facilities: [
            'Language laboratory',
            'Cultural resource center',
            'Video conference facilities',
            'Lusophone film screening room',
            'Study and research areas'
          ],
          facilitiesPortuguese: [
            'Laboratório de línguas',
            'Centro de recursos culturais',
            'Instalações de videoconferência',
            'Sala de projeção de filmes portugueses',
            'Áreas de estudo e investigação'
          ],
          membershipTiers: [
            {
              id: 'basic',
              name: 'Basic Membership',
              namePortuguese: 'Sócio Básico',
              price: 30,
              duration: 'Annual',
              durationPortuguese: 'Anual',
              benefits: [
                '15% discount on courses',
                'Cultural event access',
                'Basic library access',
                'Community newsletter'
              ],
              benefitsPortuguese: [
                '15% desconto em cursos',
                'Acesso a eventos culturais',
                'Acesso básico à biblioteca',
                'Newsletter da comunidade'
              ],
              discounts: { courses: 15, events: 50, materials: 10 },
              priority: false,
              exclusive: ['Monthly cultural talks'],
              exclusivePortuguese: ['Palestras culturais mensais']
            }
          ],
          monthlyEvents: 8,
          studentsEnrolled: 245,
          partnerInstitutions: 5,
          culturalExchanges: 3,
          website: 'https://www.manchester.ac.uk/camoes',
          socialMedia: {
            facebook: 'https://facebook.com/CamoesManchester',
            instagram: 'https://instagram.com/camoes_manchester',
            twitter: 'https://twitter.com/CamoesManchester'
          },
          openingHours: {
            weekdays: 'Monday-Friday: 9:30-20:00',
            weekends: 'Saturday: 10:00-16:00, Sunday: Closed'
          },
          specializations: [
            'Lusophone Language Learning',
            'Cultural Integration Programs',
            'Lusophone Media and Cinema',
            'Community Engagement Projects'
          ],
          specializationsPortuguese: [
            'Aprendizagem da Língua Portuguesa',
            'Programas de Integração Cultural',
            'Media e Cinema Português',
            'Projetos de Envolvimento Comunitário'
          ]
        }
      ])

      setLanguageCertifications([
        {
          id: 'ciple-a2',
          name: 'CIPLE - Initial Certificate in Lusophone as a Foreign Language',
          namePortuguese: 'CIPLE - Certificado Inicial de Português Língua Estrangeira',
          level: 'A2',
          description: 'Basic level certification demonstrating fundamental Lusophone communication skills.',
          descriptionPortuguese: 'Certificação de nível básico que demonstra competências fundamentais de comunicação em português.',
          requirements: [
            'Completion of A2 level course or equivalent',
            'Basic understanding of Lusophone grammar',
            'Ability to communicate in simple everyday situations'
          ],
          requirementsPortuguese: [
            'Conclusão de curso de nível A2 ou equivalente',
            'Compreensão básica da gramática portuguesa',
            'Capacidade de comunicar em situações quotidianas simples'
          ],
          examFee: 95,
          preparationCourse: {
            available: true,
            duration: '8 weeks',
            durationPortuguese: '8 semanas',
            price: 280
          },
          examDates: ['2024-09-15', '2024-11-10', '2024-12-08'],
          resultProcessing: '6-8 weeks',
          resultProcessingPortuguese: '6-8 semanas',
          validityPeriod: 'Lifetime',
          validityPeriodPortuguese: 'Vitalício',
          recognition: [
            'Lusophone universities',
            'EU academic institutions',
            'Lusophone employer recognition',
            'Immigration applications'
          ],
          recognitionPortuguese: [
            'Universidades portuguesas',
            'Instituições académicas da UE',
            'Reconhecimento por empregadores portugueses',
            'Pedidos de imigração'
          ]
        },
        {
          id: 'deple-b2',
          name: 'DEPLE - Diploma of Lusophone as a Foreign Language',
          namePortuguese: 'DEPLE - Diploma de Português Língua Estrangeira',
          level: 'B2',
          description: 'Intermediate level certification for professional and academic Lusophone proficiency.',
          descriptionPortuguese: 'Certificação de nível intermédio para proficiência portuguesa profissional e académica.',
          requirements: [
            'Completion of B2 level course or equivalent',
            'Intermediate Lusophone grammar mastery',
            'Ability to discuss complex topics in Lusophone'
          ],
          requirementsPortuguese: [
            'Conclusão de curso de nível B2 ou equivalente',
            'Domínio da gramática portuguesa intermédia',
            'Capacidade de discutir tópicos complexos em português'
          ],
          examFee: 125,
          preparationCourse: {
            available: true,
            duration: '12 weeks',
            durationPortuguese: '12 semanas',
            price: 420
          },
          examDates: ['2024-10-20', '2024-12-15'],
          resultProcessing: '8-10 weeks',
          resultProcessingPortuguese: '8-10 semanas',
          validityPeriod: 'Lifetime',
          validityPeriodPortuguese: 'Vitalício',
          recognition: [
            'Lusophone higher education',
            'Professional qualification recognition',
            'European language framework compliance',
            'Corporate hiring standards'
          ],
          recognitionPortuguese: [
            'Ensino superior português',
            'Reconhecimento de qualificações profissionais',
            'Conformidade com quadro linguístico europeu',
            'Padrões de contratação empresarial'
          ]
        },
        {
          id: 'duple-c1',
          name: 'DUPLE - Advanced Diploma of Lusophone as a Foreign Language',
          namePortuguese: 'DUPLE - Diploma Universitário de Português Língua Estrangeira',
          level: 'C1',
          description: 'Advanced level certification for academic and professional excellence in Lusophone.',
          descriptionPortuguese: 'Certificação de nível avançado para excelência académica e profissional em português.',
          requirements: [
            'Completion of C1 level course or equivalent',
            'Advanced Lusophone grammar and syntax',
            'Academic writing and presentation skills'
          ],
          requirementsPortuguese: [
            'Conclusão de curso de nível C1 ou equivalente',
            'Gramática e sintaxe portuguesa avançadas',
            'Competências de escrita e apresentação académicas'
          ],
          examFee: 165,
          preparationCourse: {
            available: true,
            duration: '16 weeks',
            durationPortuguese: '16 semanas',
            price: 680
          },
          examDates: ['2024-11-25'],
          resultProcessing: '10-12 weeks',
          resultProcessingPortuguese: '10-12 semanas',
          validityPeriod: 'Lifetime',
          validityPeriodPortuguese: 'Vitalício',
          recognition: [
            'Lusophone doctoral programs',
            'Academic teaching positions',
            'Translation and interpretation work',
            'High-level professional positions'
          ],
          recognitionPortuguese: [
            'Programas de doutoramento portugueses',
            'Posições de ensino académico',
            'Trabalho de tradução e interpretação',
            'Posições profissionais de alto nível'
          ]
        }
      ])

      setFeaturedPrograms([
        {
          id: 'intensive-portuguese',
          title: 'Intensive Lusophone Language Course',
          titlePortuguese: 'Curso Intensivo de Língua Portuguesa',
          category: 'language_learning',
          description: 'Comprehensive intensive course covering all aspects of Portuguese language from beginner to intermediate level.',
          descriptionPortuguese: 'Curso intensivo abrangente que cobre todos os aspectos da língua portuguesa do nível iniciante ao intermédio.',
          duration: '12 weeks',
          durationPortuguese: '12 semanas',
          level: 'beginner',
          levelPortuguese: 'Iniciante',
          price: 450,
          memberPrice: 315,
          schedule: {
            days: ['Tuesday', 'Thursday'],
            times: '18:30-20:30',
            timesPortuguese: '18:30-20:30'
          },
          instructor: {
            name: 'Prof. Maria Santos',
            qualifications: 'PhD in Lusophone Linguistics, 15 years teaching experience',
            qualificationsPortuguese: 'Doutoramento em Linguística Portuguesa, 15 anos de experiência de ensino'
          },
          capacity: 20,
          enrolled: 16,
          startDate: '2024-09-10',
          endDate: '2024-12-05',
          materials: [
            'Official textbook and workbook',
            'Audio and video materials',
            'Online learning platform access',
            'Cultural activity participation'
          ],
          materialsPortuguese: [
            'Manual oficial e livro de exercícios',
            'Materiais áudio e vídeo',
            'Acesso à plataforma de aprendizagem online',
            'Participação em atividades culturais'
          ],
          certification: true,
          prerequisites: 'No previous Lusophone knowledge required',
          prerequisitesPortuguese: 'Não é necessário conhecimento prévio de português'
        },
        {
          id: 'business-portuguese',
          title: 'Business Lusophone Certificate Program',
          titlePortuguese: 'Programa de Certificação em Português Empresarial',
          category: 'certification',
          description: 'Specialized program for professionals seeking to enhance their business communication in Lusophone.',
          descriptionPortuguese: 'Programa especializado para profissionais que procuram melhorar a sua comunicação empresarial em português.',
          duration: '8 weeks',
          durationPortuguese: '8 semanas',
          level: 'intermediate',
          levelPortuguese: 'Intermédio',
          price: 380,
          memberPrice: 247,
          schedule: {
            days: ['Wednesday', 'Friday'],
            times: '19:00-21:00',
            timesPortuguese: '19:00-21:00'
          },
          instructor: {
            name: 'Dr. Carlos Ferreira',
            qualifications: 'MBA in International Business, Portuguese business consultant',
            qualificationsPortuguese: 'MBA em Negócios Internacionais, consultor empresarial português'
          },
          capacity: 15,
          enrolled: 12,
          startDate: '2024-10-02',
          endDate: '2024-11-27',
          materials: [
            'Business Lusophone textbook',
            'Case study materials',
            'Professional vocabulary guides',
            'Networking event access'
          ],
          materialsPortuguese: [
            'Manual de português empresarial',
            'Materiais de estudos de caso',
            'Guias de vocabulário profissional',
            'Acesso a eventos de networking'
          ],
          certification: true,
          prerequisites: 'Intermediate Lusophone level (B1) required',
          prerequisitesPortuguese: 'Necessário nível intermédio de português (B1)'
        },
        {
          id: 'cultural-heritage',
          title: 'Lusophone Cultural Heritage Workshop Series',
          titlePortuguese: 'Série de Oficinas de Património Cultural Português',
          category: 'cultural_workshops',
          description: 'Monthly workshops exploring different aspects of Lusophone cultural heritage, traditions, and contemporary culture.',
          descriptionPortuguese: 'Oficinas mensais explorando diferentes aspetos do património cultural português, tradições e cultura contemporânea.',
          duration: '6 months',
          durationPortuguese: '6 meses',
          level: 'all_levels',
          levelPortuguese: 'Todos os níveis',
          price: 180,
          memberPrice: 90,
          schedule: {
            days: ['Saturday'],
            times: '14:00-17:00',
            timesPortuguese: '14:00-17:00'
          },
          instructor: {
            name: 'Prof. Ana Rodrigues',
            qualifications: 'PhD in Lusophone Cultural Studies, Museum curator',
            qualificationsPortuguese: 'Doutoramento em Estudos Culturais Portugueses, Curadora de museu'
          },
          capacity: 25,
          enrolled: 18,
          startDate: '2024-09-14',
          endDate: '2025-02-08',
          materials: [
            'Workshop handouts and materials',
            'Cultural artifact replicas',
            'Digital resource library access',
            'Museum visit tickets'
          ],
          materialsPortuguese: [
            'Folhetos e materiais da oficina',
            'Réplicas de artefatos culturais',
            'Acesso à biblioteca de recursos digitais',
            'Bilhetes para visitas ao museu'
          ],
          certification: false,
          prerequisites: 'Interest in Portuguese culture and heritage',
          prerequisitesPortuguese: 'Interesse na cultura e património português'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleProgramEnrollment = (program: CulturalProgram) => {
    trackActivity({
      activityType: 'camoes_program_enrollment',
      metadata: {
        programId: program.id,
        category: program.category,
        price: program.price,
        timestamp: new Date().toISOString()
      }
    })
    // In real implementation, this would open enrollment modal or redirect to enrollment page
    console.log('Enrolling in program:', program.title)
  }

  const handleMembershipSignup = (tier: MembershipTier, centerId: string) => {
    trackActivity({
      activityType: 'camoes_membership_signup',
      metadata: {
        tierId: tier.id,
        centerId,
        price: tier.price,
        timestamp: new Date().toISOString()
      }
    })
    // In real implementation, this would open membership signup flow
    console.log('Signing up for membership:', tier.name)
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const selectedCenterData = camoesCenters.find(center => center.id === selectedCenter)

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
          <LanguageIcon className="w-12 h-12 text-secondary-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {language === 'pt' 
            ? 'Rede Global de Centros Camões'
            : 'Global Camões Centers Network'
          }
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {language === 'pt'
            ? 'Conecte-se com a rede mundial de Centros Camões para aprendizagem da língua portuguesa, certificações oficiais e imersão cultural autêntica.'
            : 'Connect with the worldwide network of Camões Centers for Portuguese language learning, official certifications, and authentic cultural immersion.'
          }
        </p>
      </div>

      {/* Center Selection */}
      <div className="mb-12">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {camoesCenters.map((center) => (
            <button
              key={center.id}
              onClick={() => setSelectedCenter(center.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedCenter === center.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {language === 'pt' ? center.namePortuguese : center.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Center Details */}
      {selectedCenterData && (
        <div className="mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {language === 'pt' ? selectedCenterData.namePortuguese : selectedCenterData.name}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm opacity-90">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      {selectedCenterData.location}
                    </div>
                    <div className="flex items-center">
                      <CalendarDaysIcon className="w-4 h-4 mr-1" />
                      {language === 'pt' ? 'Estabelecido em' : 'Established'} {selectedCenterData.established}
                    </div>
                  </div>
                </div>
                <a
                  href={selectedCenterData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                >
                  {language === 'pt' ? 'Site Oficial' : 'Official Website'}
                </a>
              </div>
            </div>

            <div className="p-6">
              {/* Center Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <UserGroupIcon className="w-8 h-8 text-primary-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{selectedCenterData.studentsEnrolled}</p>
                  <p className="text-sm text-gray-600">{language === 'pt' ? 'Estudantes Inscritos' : 'Students Enrolled'}</p>
                </div>
                <div className="text-center">
                  <CalendarDaysIcon className="w-8 h-8 text-secondary-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{selectedCenterData.monthlyEvents}</p>
                  <p className="text-sm text-gray-600">{language === 'pt' ? 'Eventos Mensais' : 'Monthly Events'}</p>
                </div>
                <div className="text-center">
                  <ScaleIcon className="w-8 h-8 text-accent-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{selectedCenterData.partnerInstitutions}</p>
                  <p className="text-sm text-gray-600">{language === 'pt' ? 'Instituições Parceiras' : 'Partner Institutions'}</p>
                </div>
                <div className="text-center">
                  <GlobeAltIcon className="w-8 h-8 text-premium-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{selectedCenterData.culturalExchanges}</p>
                  <p className="text-sm text-gray-600">{language === 'pt' ? 'Intercâmbios Culturais' : 'Cultural Exchanges'}</p>
                </div>
              </div>

              {/* Facilities and Specializations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === 'pt' ? 'Instalações' : 'Facilities'}
                  </h3>
                  <ul className="space-y-2">
                    {(language === 'pt' ? selectedCenterData.facilitiesPortuguese : selectedCenterData.facilities).map((facility, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <CheckBadgeIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {language === 'pt' ? 'Especializações' : 'Specializations'}
                  </h3>
                  <ul className="space-y-2">
                    {(language === 'pt' ? selectedCenterData.specializationsPortuguese : selectedCenterData.specializations).map((specialization, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <StarIcon className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                        {specialization}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Director Information */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {language === 'pt' ? 'Informações de Contacto' : 'Contact Information'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-medium text-gray-900">{selectedCenterData.director.name}</p>
                    <p className="text-gray-600 text-sm">
                      {language === 'pt' ? selectedCenterData.director.titlePortuguese : selectedCenterData.director.title}
                    </p>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <EnvelopeIcon className="w-4 h-4 mr-2" />
                        <a href={`mailto:${selectedCenterData.director.email}`} className="hover:text-primary-600">
                          {selectedCenterData.director.email}
                        </a>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <PhoneIcon className="w-4 h-4 mr-2" />
                        <a href={`tel:${selectedCenterData.director.phone}`} className="hover:text-primary-600">
                          {selectedCenterData.director.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-2">
                      {language === 'pt' ? 'Horário de Funcionamento' : 'Opening Hours'}
                    </p>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{selectedCenterData.openingHours.weekdays}</p>
                      <p>{selectedCenterData.openingHours.weekends}</p>
                    </div>
                    <p className="font-medium text-gray-900 mt-4 mb-2">
                      {language === 'pt' ? 'Endereço' : 'Address'}
                    </p>
                    <p className="text-sm text-gray-600">{selectedCenterData.address}</p>
                  </div>
                </div>
              </div>

              {/* Membership Tiers */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  {language === 'pt' ? 'Opções de Associação' : 'Membership Options'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedCenterData.membershipTiers.map((tier) => (
                    <div key={tier.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="text-center mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {language === 'pt' ? tier.namePortuguese : tier.name}
                        </h4>
                        <div className="mt-2">
                          <span className="text-3xl font-bold text-primary-600">{formatCurrency(tier.price)}</span>
                          <span className="text-gray-600 text-sm">/{language === 'pt' ? tier.durationPortuguese : tier.duration}</span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h5 className="font-medium text-gray-900 mb-3">
                          {language === 'pt' ? 'Benefícios:' : 'Benefits:'}
                        </h5>
                        <ul className="space-y-2">
                          {(language === 'pt' ? tier.benefitsPortuguese : tier.benefits).map((benefit, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-700">
                              <CheckBadgeIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {tier.priority && (
                        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center">
                            <StarIcon className="w-4 h-4 text-yellow-500 mr-2" />
                            <span className="text-sm font-medium text-yellow-800">
                              {language === 'pt' ? 'Prioridade de Reserva' : 'Priority Booking'}
                            </span>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => handleMembershipSignup(tier, selectedCenter)}
                        className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                      >
                        {language === 'pt' ? 'Tornar-se Sócio' : 'Become Member'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Featured Programs */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {language === 'pt' ? 'Programas em Destaque' : 'Featured Programs'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPrograms.map((program) => (
            <div key={program.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {program.category.replace('_', ' ')}
                </span>
                <div className="flex items-center text-xs text-gray-500">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {language === 'pt' ? program.durationPortuguese : program.duration}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'pt' ? program.titlePortuguese : program.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4">
                {language === 'pt' ? program.descriptionPortuguese : program.description}
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{language === 'pt' ? 'Nível:' : 'Level:'}</span>
                  <span className="font-medium">
                    {language === 'pt' ? program.levelPortuguese : program.level}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{language === 'pt' ? 'Instrutor:' : 'Instructor:'}</span>
                  <span className="font-medium">{program.instructor.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{language === 'pt' ? 'Horário:' : 'Schedule:'}</span>
                  <span className="font-medium">
                    {program.schedule.days.join(', ')} {language === 'pt' ? program.schedule.timesPortuguese : program.schedule.times}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{language === 'pt' ? 'Vagas:' : 'Availability:'}</span>
                  <span className={`font-medium ${program.enrolled >= program.capacity ? 'text-red-600' : 'text-green-600'}`}>
                    {program.capacity - program.enrolled} {language === 'pt' ? 'vagas' : 'spots'}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(program.memberPrice)}</p>
                    <p className="text-sm text-gray-500 line-through">{formatCurrency(program.price)}</p>
                    <p className="text-xs text-green-600">
                      {language === 'pt' ? 'Preço de sócio' : 'Member price'}
                    </p>
                  </div>
                  {program.certification && (
                    <div className="text-center">
                      <TrophyIcon className="w-6 h-6 text-yellow-500 mx-auto" />
                      <p className="text-xs text-gray-600 mt-1">
                        {language === 'pt' ? 'Certificação' : 'Certification'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleProgramEnrollment(program)}
                className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                disabled={program.enrolled >= program.capacity}
              >
                {program.enrolled >= program.capacity
                  ? (language === 'pt' ? 'Esgotado' : 'Full')
                  : (language === 'pt' ? 'Inscrever-se' : 'Enroll Now')
                }
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Language Certifications */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {language === 'pt' ? 'Certificações Oficiais de Português' : 'Official Lusophone Certifications'}
        </h2>
        
        <div className="space-y-6">
          {languageCertifications.map((cert) => (
            <div key={cert.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {language === 'pt' ? cert.namePortuguese : cert.name}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {language === 'pt' ? 'Nível' : 'Level'} {cert.level}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    {language === 'pt' ? cert.descriptionPortuguese : cert.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-600">{formatCurrency(cert.examFee)}</p>
                  <p className="text-sm text-gray-600">{language === 'pt' ? 'Taxa de exame' : 'Exam fee'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {language === 'pt' ? 'Requisitos:' : 'Requirements:'}
                  </h4>
                  <ul className="space-y-1">
                    {(language === 'pt' ? cert.requirementsPortuguese : cert.requirements).map((req, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <CheckBadgeIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {language === 'pt' ? 'Reconhecimento:' : 'Recognition:'}
                  </h4>
                  <ul className="space-y-1">
                    {(language === 'pt' ? cert.recognitionPortuguese : cert.recognition).map((recog, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <TrophyIcon className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        {recog}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {language === 'pt' ? 'Detalhes do Exame:' : 'Exam Details:'}
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>{language === 'pt' ? 'Processamento:' : 'Processing:'}</span>
                      <span>{language === 'pt' ? cert.resultProcessingPortuguese : cert.resultProcessing}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{language === 'pt' ? 'Validade:' : 'Validity:'}</span>
                      <span>{language === 'pt' ? cert.validityPeriodPortuguese : cert.validityPeriod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{language === 'pt' ? 'Próximos exames:' : 'Next exams:'}</span>
                      <span>{cert.examDates.length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {cert.preparationCourse.available && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    {language === 'pt' ? 'Curso de Preparação Disponível' : 'Preparation Course Available'}
                  </h4>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-blue-800">
                      <p>
                        {language === 'pt' ? 'Duração:' : 'Duration:'} {language === 'pt' ? cert.preparationCourse.durationPortuguese : cert.preparationCourse.duration}
                      </p>
                      <p>
                        {language === 'pt' ? 'Preço:' : 'Price:'} {formatCurrency(cert.preparationCourse.price)}
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
                      {language === 'pt' ? 'Inscrever no Curso' : 'Enroll in Course'}
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">
                  {language === 'pt' ? 'Registar para Exame' : 'Register for Exam'}
                </button>
                <button className="px-6 py-3 bg-white border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 transition-colors font-medium">
                  {language === 'pt' ? 'Mais Informações' : 'More Information'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8">
        <AcademicCapIcon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {language === 'pt' ? 'Comece Sua Jornada de Aprendizagem' : 'Start Your Learning Journey'}
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          {language === 'pt'
            ? 'Junte-se à rede global de Centros Camões e acesse programas de qualidade mundial, certificações oficiais e experiências culturais autênticas.'
            : 'Join the global network of Camões Centers and access world-class programs, official certifications, and authentic cultural experiences.'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">
            {language === 'pt' ? 'Explorar Programas' : 'Explore Programs'}
          </button>
          <button className="px-8 py-3 bg-white border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 transition-colors font-medium">
            {language === 'pt' ? 'Contactar Centro Local' : 'Contact Local Center'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CamoesInstitutesIntegration