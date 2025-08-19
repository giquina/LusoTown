'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { usePlatformIntegration } from '@/context/PlatformIntegrationContext'
import {
  AcademicCapIcon,
  BuildingLibraryIcon,
  GlobeAltIcon,
  UserGroupIcon,
  BookOpenIcon,
  TrophyIcon,
  CurrencyPoundIcon,
  ClockIcon,
  CalendarDaysIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  LinkIcon,
  CheckBadgeIcon,
  StarIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  PresentationChartLineIcon,
  HandshakeIcon,
  SparklesIcon,
  BriefcaseIcon,
  LanguageIcon,
  HomeIcon,
  ChartBarIcon,
  GiftIcon
} from '@heroicons/react/24/outline'

interface PortugueseUniversity {
  id: string
  name: string
  namePortuguese: string
  location: string
  founded: number
  type: 'public' | 'private' | 'polytechnic'
  typePortuguese: string
  ranking: {
    world: number
    portugal: number
    europeanUnion: number
  }
  studentsTotal: number
  internationalStudents: number
  facultiesCount: number
  researchCenters: number
  description: string
  descriptionPortuguese: string
  logo: string
  website: string
  internationalOffice: {
    email: string
    phone: string
    director: string
  }
  specializations: string[]
  specializationsPortuguese: string[]
  partnerships: string[]
  partnershipsPortuguese: string[]
  campuses: Campus[]
  tuitionFees: TuitionStructure
  scholarships: ScholarshipProgram[]
  exchangePrograms: ExchangeProgram[]
}

interface Campus {
  id: string
  name: string
  namePortuguese: string
  location: string
  address: string
  facilities: string[]
  facilitiesPortuguese: string[]
  studentsCount: number
  faculties: string[]
  facultiesPortuguese: string[]
}

interface TuitionStructure {
  eu_students: {
    undergraduate: number
    masters: number
    phd: number
  }
  international_students: {
    undergraduate: number
    masters: number
    phd: number
  }
  currency: string
}

interface ScholarshipProgram {
  id: string
  name: string
  namePortuguese: string
  provider: string
  type: 'merit' | 'need_based' | 'research' | 'mobility' | 'specific_field'
  amount: number
  currency: string
  description: string
  descriptionPortuguese: string
  eligibility: string[]
  eligibilityPortuguese: string[]
  applicationDeadline: string
  duration: string
  durationPortuguese: string
  renewable: boolean
  applicationUrl: string
}

interface ExchangeProgram {
  id: string
  name: string
  namePortuguese: string
  type: 'erasmus' | 'bilateral' | 'consortium' | 'research'
  duration: string
  durationPortuguese: string
  description: string
  descriptionPortuguese: string
  partnerInstitutions: string[]
  eligibility: string[]
  eligibilityPortuguese: string[]
  benefits: string[]
  benefitsPortuguese: string[]
  applicationProcess: string[]
  applicationProcessPortuguese: string[]
  applicationDeadline: string
  contactEmail: string
}

interface ResearchOpportunity {
  id: string
  title: string
  titlePortuguese: string
  university: string
  department: string
  departmentPortuguese: string
  supervisor: string
  level: 'masters' | 'phd' | 'postdoc'
  field: string
  fieldPortuguese: string
  description: string
  descriptionPortuguese: string
  requirements: string[]
  requirementsPortuguese: string[]
  funding: {
    available: boolean
    amount: number
    currency: string
    duration: string
    durationPortuguese: string
  }
  applicationDeadline: string
  startDate: string
  contactEmail: string
}

const PortugueseUniversityNetwork: React.FC = () => {
  const { language } = useLanguage()
  const { trackActivity } = usePlatformIntegration()
  const [selectedUniversity, setSelectedUniversity] = useState<string>('lisboa')
  const [selectedTab, setSelectedTab] = useState<string>('overview')
  const [loading, setLoading] = useState(true)
  const [universities, setUniversities] = useState<PortugueseUniversity[]>([])
  const [researchOpportunities, setResearchOpportunities] = useState<ResearchOpportunity[]>([])
  const [featuredScholarships, setFeaturedScholarships] = useState<ScholarshipProgram[]>([])

  useEffect(() => {
    loadUniversityData()
    trackActivity({
      activityType: 'portuguese_universities_access',
      metadata: { section: 'academic_institutions', timestamp: new Date().toISOString() }
    })
  }, [])

  const loadUniversityData = async () => {
    setLoading(true)
    try {
      // Simulate API call - in real implementation, this would fetch from university APIs
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setUniversities([
        {
          id: 'lisboa',
          name: 'University of Lisbon',
          namePortuguese: 'Universidade de Lisboa',
          location: 'Lisbon, Portugal',
          founded: 1288,
          type: 'public',
          typePortuguese: 'Pública',
          ranking: {
            world: 305,
            portugal: 1,
            europeanUnion: 85
          },
          studentsTotal: 50000,
          internationalStudents: 7500,
          facultiesCount: 18,
          researchCenters: 45,
          description: 'Portugal\'s largest and most prestigious university, offering world-class education and research opportunities across diverse fields.',
          descriptionPortuguese: 'A maior e mais prestigiada universidade de Portugal, oferecendo educação e oportunidades de investigação de classe mundial em diversas áreas.',
          logo: '/images/universities/universidade-lisboa.png',
          website: 'https://www.ulisboa.pt',
          internationalOffice: {
            email: 'international@ulisboa.pt',
            phone: '+351 217 967 624',
            director: 'Dr. Helena Santos'
          },
          specializations: [
            'Medicine and Health Sciences',
            'Engineering and Technology',
            'Natural Sciences',
            'Social Sciences and Humanities',
            'Architecture and Fine Arts',
            'Economics and Management'
          ],
          specializationsPortuguese: [
            'Medicina e Ciências da Saúde',
            'Engenharia e Tecnologia',
            'Ciências Naturais',
            'Ciências Sociais e Humanidades',
            'Arquitetura e Belas Artes',
            'Economia e Gestão'
          ],
          partnerships: [
            'Harvard University (USA)',
            'Oxford University (UK)',
            'Sorbonne University (France)',
            'MIT (USA)',
            'ETH Zurich (Switzerland)'
          ],
          partnershipsPortuguese: [
            'Universidade de Harvard (EUA)',
            'Universidade de Oxford (Reino Unido)',
            'Universidade Sorbonne (França)',
            'MIT (EUA)',
            'ETH Zurich (Suíça)'
          ],
          campuses: [
            {
              id: 'cidade-universitaria',
              name: 'Cidade Universitária Campus',
              namePortuguese: 'Campus da Cidade Universitária',
              location: 'Lisbon',
              address: 'Alameda da Universidade, 1649-004 Lisboa',
              facilities: [
                'Central Library',
                'Research laboratories',
                'Student residences',
                'Sports complex',
                'Medical center',
                'Cultural center'
              ],
              facilitiesPortuguese: [
                'Biblioteca Central',
                'Laboratórios de investigação',
                'Residências estudantis',
                'Complexo desportivo',
                'Centro médico',
                'Centro cultural'
              ],
              studentsCount: 25000,
              faculties: [
                'Faculty of Sciences',
                'Faculty of Medicine',
                'Faculty of Engineering',
                'Faculty of Economics'
              ],
              facultiesPortuguese: [
                'Faculdade de Ciências',
                'Faculdade de Medicina',
                'Faculdade de Engenharia',
                'Faculdade de Economia'
              ]
            }
          ],
          tuitionFees: {
            eu_students: {
              undergraduate: 1063,
              masters: 1250,
              phd: 2750
            },
            international_students: {
              undergraduate: 7000,
              masters: 8500,
              phd: 3500
            },
            currency: 'EUR'
          },
          scholarships: [],
          exchangePrograms: []
        },
        {
          id: 'porto',
          name: 'University of Porto',
          namePortuguese: 'Universidade do Porto',
          location: 'Porto, Portugal',
          founded: 1911,
          type: 'public',
          typePortuguese: 'Pública',
          ranking: {
            world: 358,
            portugal: 2,
            europeanUnion: 95
          },
          studentsTotal: 32000,
          internationalStudents: 4500,
          facultiesCount: 14,
          researchCenters: 35,
          description: 'Leading Portuguese university renowned for engineering, medicine, and research excellence, with strong international partnerships.',
          descriptionPortuguese: 'Universidade portuguesa líder reconhecida pela engenharia, medicina e excelência em investigação, com fortes parcerias internacionais.',
          logo: '/images/universities/universidade-porto.png',
          website: 'https://www.up.pt',
          internationalOffice: {
            email: 'international@up.pt',
            phone: '+351 220 408 000',
            director: 'Dr. Carlos Ferreira'
          },
          specializations: [
            'Engineering and Technology',
            'Medicine and Biomedical Sciences',
            'Architecture',
            'Economics and Business',
            'Psychology and Education',
            'Natural Sciences'
          ],
          specializationsPortuguese: [
            'Engenharia e Tecnologia',
            'Medicina e Ciências Biomédicas',
            'Arquitetura',
            'Economia e Gestão',
            'Psicologia e Educação',
            'Ciências Naturais'
          ],
          partnerships: [
            'Carnegie Mellon University (USA)',
            'Technical University of Munich (Germany)',
            'King\'s College London (UK)',
            'University of São Paulo (Brazil)',
            'McGill University (Canada)'
          ],
          partnershipsPortuguese: [
            'Universidade Carnegie Mellon (EUA)',
            'Universidade Técnica de Munique (Alemanha)',
            'King\'s College London (Reino Unido)',
            'Universidade de São Paulo (Brasil)',
            'Universidade McGill (Canadá)'
          ],
          campuses: [
            {
              id: 'polo-asprela',
              name: 'Asprela Campus',
              namePortuguese: 'Campus de Asprela',
              location: 'Porto',
              address: 'Rua Dr. Roberto Frias, 4200-465 Porto',
              facilities: [
                'Engineering complex',
                'Science laboratories',
                'Innovation center',
                'Student housing',
                'Library and study areas'
              ],
              facilitiesPortuguese: [
                'Complexo de engenharia',
                'Laboratórios de ciências',
                'Centro de inovação',
                'Alojamento estudantil',
                'Biblioteca e áreas de estudo'
              ],
              studentsCount: 18000,
              faculties: [
                'Faculty of Engineering',
                'Faculty of Sciences',
                'Faculty of Medicine',
                'Faculty of Economics'
              ],
              facultiesPortuguese: [
                'Faculdade de Engenharia',
                'Faculdade de Ciências',
                'Faculdade de Medicina',
                'Faculdade de Economia'
              ]
            }
          ],
          tuitionFees: {
            eu_students: {
              undergraduate: 1063,
              masters: 1250,
              phd: 2750
            },
            international_students: {
              undergraduate: 6500,
              masters: 8000,
              phd: 3500
            },
            currency: 'EUR'
          },
          scholarships: [],
          exchangePrograms: []
        },
        {
          id: 'nova-lisboa',
          name: 'NOVA University Lisbon',
          namePortuguese: 'Universidade NOVA de Lisboa',
          location: 'Lisbon, Portugal',
          founded: 1973,
          type: 'public',
          typePortuguese: 'Pública',
          ranking: {
            world: 465,
            portugal: 3,
            europeanUnion: 120
          },
          studentsTotal: 19000,
          internationalStudents: 3200,
          facultiesCount: 9,
          researchCenters: 25,
          description: 'Modern, innovative university known for excellence in economics, law, and technology, with strong business school reputation.',
          descriptionPortuguese: 'Universidade moderna e inovadora conhecida pela excelência em economia, direito e tecnologia, com forte reputação na escola de negócios.',
          logo: '/images/universities/universidade-nova.png',
          website: 'https://www.unl.pt',
          internationalOffice: {
            email: 'international@unl.pt',
            phone: '+351 213 571 500',
            director: 'Dr. Ana Oliveira'
          },
          specializations: [
            'Economics and Management',
            'Law',
            'Science and Technology',
            'Social and Human Sciences',
            'Medical Sciences',
            'Public Health'
          ],
          specializationsPortuguese: [
            'Economia e Gestão',
            'Direito',
            'Ciência e Tecnologia',
            'Ciências Sociais e Humanas',
            'Ciências Médicas',
            'Saúde Pública'
          ],
          partnerships: [
            'London School of Economics (UK)',
            'HEC Paris (France)',
            'Georgetown University (USA)',
            'IE Business School (Spain)',
            'University of Toronto (Canada)'
          ],
          partnershipsPortuguese: [
            'London School of Economics (Reino Unido)',
            'HEC Paris (França)',
            'Universidade Georgetown (EUA)',
            'IE Business School (Espanha)',
            'Universidade de Toronto (Canadá)'
          ],
          campuses: [
            {
              id: 'campus-campolide',
              name: 'Campolide Campus',
              namePortuguese: 'Campus de Campolide',
              location: 'Lisbon',
              address: 'Campus de Campolide, 1099-085 Lisboa',
              facilities: [
                'Business school building',
                'Technology center',
                'Research institutes',
                'Conference facilities',
                'Student services center'
              ],
              facilitiesPortuguese: [
                'Edifício da escola de negócios',
                'Centro de tecnologia',
                'Institutos de investigação',
                'Instalações de conferências',
                'Centro de serviços estudantis'
              ],
              studentsCount: 12000,
              faculties: [
                'Nova School of Business',
                'Faculty of Science and Technology',
                'Faculty of Social Sciences',
                'Nova School of Law'
              ],
              facultiesPortuguese: [
                'Nova School of Business',
                'Faculdade de Ciências e Tecnologia',
                'Faculdade de Ciências Sociais',
                'Nova School of Law'
              ]
            }
          ],
          tuitionFees: {
            eu_students: {
              undergraduate: 1063,
              masters: 2500,
              phd: 2750
            },
            international_students: {
              undergraduate: 8000,
              masters: 12000,
              phd: 4000
            },
            currency: 'EUR'
          },
          scholarships: [],
          exchangePrograms: []
        }
      ])

      setFeaturedScholarships([
        {
          id: 'merit-scholarship-ulisboa',
          name: 'University of Lisbon Merit Scholarship',
          namePortuguese: 'Bolsa de Mérito da Universidade de Lisboa',
          provider: 'University of Lisbon',
          type: 'merit',
          amount: 3000,
          currency: 'EUR',
          description: 'Merit-based scholarship for outstanding international students pursuing undergraduate or graduate studies.',
          descriptionPortuguese: 'Bolsa de mérito para estudantes internacionais excepcionais que cursam estudos de licenciatura ou pós-graduação.',
          eligibility: [
            'International student status',
            'Minimum GPA of 3.5/4.0 or equivalent',
            'Demonstrated academic excellence',
            'Financial need consideration'
          ],
          eligibilityPortuguese: [
            'Estatuto de estudante internacional',
            'Média mínima de 3.5/4.0 ou equivalente',
            'Excelência académica demonstrada',
            'Consideração de necessidade financeira'
          ],
          applicationDeadline: '2024-05-15',
          duration: '1 academic year',
          durationPortuguese: '1 ano letivo',
          renewable: true,
          applicationUrl: 'https://www.ulisboa.pt/en/scholarships'
        },
        {
          id: 'erasmus-mundus-portugal',
          name: 'Erasmus Mundus Portugal Scholarship',
          namePortuguese: 'Bolsa Erasmus Mundus Portugal',
          provider: 'European Commission',
          type: 'mobility',
          amount: 1400,
          currency: 'EUR',
          description: 'Monthly scholarship for EU and international students participating in joint master\'s programs.',
          descriptionPortuguese: 'Bolsa mensal para estudantes da UE e internacionais que participam em programas de mestrado conjunto.',
          eligibility: [
            'Enrollment in Erasmus Mundus program',
            'EU citizenship or international student status',
            'Bachelor\'s degree completed',
            'Language proficiency requirements'
          ],
          eligibilityPortuguese: [
            'Inscrição no programa Erasmus Mundus',
            'Cidadania da UE ou estatuto de estudante internacional',
            'Licenciatura concluída',
            'Requisitos de proficiência linguística'
          ],
          applicationDeadline: '2024-01-15',
          duration: '24 months',
          durationPortuguese: '24 meses',
          renewable: false,
          applicationUrl: 'https://ec.europa.eu/programmes/erasmus-plus/opportunities/individuals/students/erasmus-mundus-joint-master-degrees_en'
        },
        {
          id: 'fct-phd-scholarship',
          name: 'FCT PhD Research Scholarship',
          namePortuguese: 'Bolsa de Doutoramento FCT',
          provider: 'Foundation for Science and Technology',
          type: 'research',
          amount: 2128,
          currency: 'EUR',
          description: 'Monthly stipend for PhD students conducting research in Portuguese institutions.',
          descriptionPortuguese: 'Bolsa mensal para estudantes de doutoramento que conduzem investigação em instituições portuguesas.',
          eligibility: [
            'Enrollment in PhD program',
            'Research project approval',
            'Supervisor agreement',
            'Portuguese residency during studies'
          ],
          eligibilityPortuguese: [
            'Inscrição em programa de doutoramento',
            'Aprovação do projeto de investigação',
            'Acordo do orientador',
            'Residência portuguesa durante os estudos'
          ],
          applicationDeadline: '2024-03-31',
          duration: '48 months',
          durationPortuguese: '48 meses',
          renewable: true,
          applicationUrl: 'https://www.fct.pt/apoios/bolsas/concursos/'
        }
      ])

      setResearchOpportunities([
        {
          id: 'biomedical-engineering-ulisboa',
          title: 'Biomedical Engineering Research Position',
          titlePortuguese: 'Posição de Investigação em Engenharia Biomédica',
          university: 'University of Lisbon',
          department: 'Institute for Bioengineering and Biosciences',
          departmentPortuguese: 'Instituto de Bioengenharia e Biociências',
          supervisor: 'Prof. Dr. Maria Silva',
          level: 'phd',
          field: 'Biomedical Engineering',
          fieldPortuguese: 'Engenharia Biomédica',
          description: 'Research opportunity in developing innovative medical devices for neurological applications.',
          descriptionPortuguese: 'Oportunidade de investigação no desenvolvimento de dispositivos médicos inovadores para aplicações neurológicas.',
          requirements: [
            'Master\'s degree in Biomedical Engineering or related field',
            'Strong background in biomaterials',
            'Programming skills (Python, MATLAB)',
            'English proficiency'
          ],
          requirementsPortuguese: [
            'Mestrado em Engenharia Biomédica ou área relacionada',
            'Forte formação em biomateriais',
            'Competências de programação (Python, MATLAB)',
            'Proficiência em inglês'
          ],
          funding: {
            available: true,
            amount: 2128,
            currency: 'EUR',
            duration: '4 years',
            durationPortuguese: '4 anos'
          },
          applicationDeadline: '2024-06-30',
          startDate: '2024-09-01',
          contactEmail: 'maria.silva@tecnico.ulisboa.pt'
        },
        {
          id: 'ai-research-up',
          title: 'Artificial Intelligence Research Fellowship',
          titlePortuguese: 'Bolsa de Investigação em Inteligência Artificial',
          university: 'University of Porto',
          department: 'Faculty of Engineering',
          departmentPortuguese: 'Faculdade de Engenharia',
          supervisor: 'Prof. Dr. João Santos',
          level: 'postdoc',
          field: 'Computer Science - AI',
          fieldPortuguese: 'Ciência da Computação - IA',
          description: 'Postdoctoral research position focusing on machine learning applications in healthcare.',
          descriptionPortuguese: 'Posição de investigação pós-doutoral focada em aplicações de aprendizagem automática na área da saúde.',
          requirements: [
            'PhD in Computer Science, AI, or related field',
            'Publications in top-tier conferences',
            'Experience with deep learning frameworks',
            'Strong analytical skills'
          ],
          requirementsPortuguese: [
            'Doutoramento em Ciência da Computação, IA ou área relacionada',
            'Publicações em conferências de topo',
            'Experiência com frameworks de deep learning',
            'Fortes competências analíticas'
          ],
          funding: {
            available: true,
            amount: 2500,
            currency: 'EUR',
            duration: '2 years',
            durationPortuguese: '2 anos'
          },
          applicationDeadline: '2024-07-15',
          startDate: '2024-10-01',
          contactEmail: 'joao.santos@fe.up.pt'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const selectedUniversityData = universities.find(uni => uni.id === selectedUniversity)

  const formatCurrency = (amount: number, currency: string): string => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const handleScholarshipApplication = (scholarship: ScholarshipProgram) => {
    trackActivity({
      activityType: 'scholarship_application',
      metadata: {
        scholarshipId: scholarship.id,
        provider: scholarship.provider,
        amount: scholarship.amount,
        timestamp: new Date().toISOString()
      }
    })
    window.open(scholarship.applicationUrl, '_blank')
  }

  const handleResearchInterest = (opportunity: ResearchOpportunity) => {
    trackActivity({
      activityType: 'research_opportunity_interest',
      metadata: {
        opportunityId: opportunity.id,
        university: opportunity.university,
        field: opportunity.field,
        timestamp: new Date().toISOString()
      }
    })
    window.open(`mailto:${opportunity.contactEmail}?subject=Research Opportunity Interest - ${opportunity.title}`, '_blank')
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
          <AcademicCapIcon className="w-12 h-12 text-secondary-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {language === 'pt' 
            ? 'Rede de Universidades Portuguesas'
            : 'Portuguese University Network'
          }
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {language === 'pt'
            ? 'Descubra oportunidades de educação superior, investigação e intercâmbio nas principais universidades portuguesas, conectando-se com excelência académica e inovação.'
            : 'Discover higher education, research, and exchange opportunities at leading Portuguese universities, connecting with academic excellence and innovation.'
          }
        </p>
      </div>

      {/* University Selection */}
      <div className="mb-12">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {universities.map((university) => (
            <button
              key={university.id}
              onClick={() => setSelectedUniversity(university.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedUniversity === university.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {language === 'pt' ? university.namePortuguese : university.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected University Details */}
      {selectedUniversityData && (
        <div className="mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={selectedUniversityData.logo} 
                    alt={`${selectedUniversityData.name} logo`}
                    className="w-16 h-16 rounded-lg bg-white p-2"
                    onError={(e) => {
                      e.currentTarget.src = '/images/universities/placeholder-university.png'
                    }}
                  />
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {language === 'pt' ? selectedUniversityData.namePortuguese : selectedUniversityData.name}
                    </h2>
                    <div className="flex items-center space-x-4 text-sm opacity-90">
                      <div className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        {selectedUniversityData.location}
                      </div>
                      <div className="flex items-center">
                        <CalendarDaysIcon className="w-4 h-4 mr-1" />
                        {language === 'pt' ? 'Fundada em' : 'Founded'} {selectedUniversityData.founded}
                      </div>
                      <div className="flex items-center">
                        <TrophyIcon className="w-4 h-4 mr-1" />
                        #{selectedUniversityData.ranking.world} {language === 'pt' ? 'mundial' : 'worldwide'}
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  href={selectedUniversityData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                >
                  {language === 'pt' ? 'Site Oficial' : 'Official Website'}
                </a>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {['overview', 'programs', 'research', 'admissions'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      selectedTab === tab
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab === 'overview' && (language === 'pt' ? 'Visão Geral' : 'Overview')}
                    {tab === 'programs' && (language === 'pt' ? 'Programas' : 'Programs')}
                    {tab === 'research' && (language === 'pt' ? 'Investigação' : 'Research')}
                    {tab === 'admissions' && (language === 'pt' ? 'Admissões' : 'Admissions')}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {selectedTab === 'overview' && (
                <div className="space-y-8">
                  {/* University Statistics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <UserGroupIcon className="w-8 h-8 text-primary-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{selectedUniversityData.studentsTotal.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{language === 'pt' ? 'Estudantes Totais' : 'Total Students'}</p>
                    </div>
                    <div className="text-center">
                      <GlobeAltIcon className="w-8 h-8 text-secondary-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{selectedUniversityData.internationalStudents.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{language === 'pt' ? 'Estudantes Internacionais' : 'International Students'}</p>
                    </div>
                    <div className="text-center">
                      <BuildingLibraryIcon className="w-8 h-8 text-accent-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{selectedUniversityData.facultiesCount}</p>
                      <p className="text-sm text-gray-600">{language === 'pt' ? 'Faculdades' : 'Faculties'}</p>
                    </div>
                    <div className="text-center">
                      <ChartBarIcon className="w-8 h-8 text-premium-500 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{selectedUniversityData.researchCenters}</p>
                      <p className="text-sm text-gray-600">{language === 'pt' ? 'Centros de Investigação' : 'Research Centers'}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {language === 'pt' ? 'Sobre a Universidade' : 'About the University'}
                    </h3>
                    <p className="text-gray-700">
                      {language === 'pt' ? selectedUniversityData.descriptionPortuguese : selectedUniversityData.description}
                    </p>
                  </div>

                  {/* Specializations and Partnerships */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {language === 'pt' ? 'Áreas de Especialização' : 'Specialization Areas'}
                      </h3>
                      <ul className="space-y-2">
                        {(language === 'pt' ? selectedUniversityData.specializationsPortuguese : selectedUniversityData.specializations).map((spec, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-700">
                            <CheckBadgeIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {language === 'pt' ? 'Parcerias Internacionais' : 'International Partnerships'}
                      </h3>
                      <ul className="space-y-2">
                        {(language === 'pt' ? selectedUniversityData.partnershipsPortuguese : selectedUniversityData.partnerships).map((partnership, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-700">
                            <HandshakeIcon className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                            {partnership}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {language === 'pt' ? 'Gabinete Internacional' : 'International Office'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-900">{selectedUniversityData.internationalOffice.director}</p>
                        <p className="text-gray-600">{language === 'pt' ? 'Diretor' : 'Director'}</p>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <EnvelopeIcon className="w-4 h-4 mr-2" />
                        <a href={`mailto:${selectedUniversityData.internationalOffice.email}`} className="hover:text-primary-600">
                          {selectedUniversityData.internationalOffice.email}
                        </a>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <PhoneIcon className="w-4 h-4 mr-2" />
                        <a href={`tel:${selectedUniversityData.internationalOffice.phone}`} className="hover:text-primary-600">
                          {selectedUniversityData.internationalOffice.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'admissions' && (
                <div className="space-y-8">
                  {/* Tuition Fees */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                      {language === 'pt' ? 'Propinas e Taxas' : 'Tuition Fees'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h4 className="font-semibold text-blue-900 mb-4">
                          {language === 'pt' ? 'Estudantes da UE/EEE' : 'EU/EEA Students'}
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-blue-800">{language === 'pt' ? 'Licenciatura:' : 'Undergraduate:'}</span>
                            <span className="font-medium">
                              {formatCurrency(selectedUniversityData.tuitionFees.eu_students.undergraduate, selectedUniversityData.tuitionFees.currency)}
                              {language === 'pt' ? '/ano' : '/year'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-blue-800">{language === 'pt' ? 'Mestrado:' : 'Masters:'}</span>
                            <span className="font-medium">
                              {formatCurrency(selectedUniversityData.tuitionFees.eu_students.masters, selectedUniversityData.tuitionFees.currency)}
                              {language === 'pt' ? '/ano' : '/year'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-blue-800">{language === 'pt' ? 'Doutoramento:' : 'PhD:'}</span>
                            <span className="font-medium">
                              {formatCurrency(selectedUniversityData.tuitionFees.eu_students.phd, selectedUniversityData.tuitionFees.currency)}
                              {language === 'pt' ? '/ano' : '/year'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                        <h4 className="font-semibold text-orange-900 mb-4">
                          {language === 'pt' ? 'Estudantes Internacionais' : 'International Students'}
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-orange-800">{language === 'pt' ? 'Licenciatura:' : 'Undergraduate:'}</span>
                            <span className="font-medium">
                              {formatCurrency(selectedUniversityData.tuitionFees.international_students.undergraduate, selectedUniversityData.tuitionFees.currency)}
                              {language === 'pt' ? '/ano' : '/year'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-orange-800">{language === 'pt' ? 'Mestrado:' : 'Masters:'}</span>
                            <span className="font-medium">
                              {formatCurrency(selectedUniversityData.tuitionFees.international_students.masters, selectedUniversityData.tuitionFees.currency)}
                              {language === 'pt' ? '/ano' : '/year'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-orange-800">{language === 'pt' ? 'Doutoramento:' : 'PhD:'}</span>
                            <span className="font-medium">
                              {formatCurrency(selectedUniversityData.tuitionFees.international_students.phd, selectedUniversityData.tuitionFees.currency)}
                              {language === 'pt' ? '/ano' : '/year'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Application Information */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {language === 'pt' ? 'Informações de Candidatura' : 'Application Information'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          {language === 'pt' ? 'Prazos de Candidatura:' : 'Application Deadlines:'}
                        </h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• {language === 'pt' ? '1ª Fase:' : '1st Phase:'} {language === 'pt' ? '15 de maio' : 'May 15th'}</li>
                          <li>• {language === 'pt' ? '2ª Fase:' : '2nd Phase:'} {language === 'pt' ? '15 de julho' : 'July 15th'}</li>
                          <li>• {language === 'pt' ? '3ª Fase:' : '3rd Phase:'} {language === 'pt' ? '15 de setembro' : 'September 15th'}</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          {language === 'pt' ? 'Documentos Necessários:' : 'Required Documents:'}
                        </h4>
                        <ul className="space-y-1 text-gray-700">
                          <li>• {language === 'pt' ? 'Diploma de ensino secundário' : 'High school diploma'}</li>
                          <li>• {language === 'pt' ? 'Certificado de proficiência linguística' : 'Language proficiency certificate'}</li>
                          <li>• {language === 'pt' ? 'Carta de motivação' : 'Motivation letter'}</li>
                          <li>• {language === 'pt' ? 'Documento de identificação' : 'Identification document'}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Featured Scholarships */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {language === 'pt' ? 'Bolsas de Estudo em Destaque' : 'Featured Scholarships'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredScholarships.map((scholarship) => (
            <div key={scholarship.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  scholarship.type === 'merit' ? 'bg-blue-100 text-blue-800' :
                  scholarship.type === 'need_based' ? 'bg-green-100 text-green-800' :
                  scholarship.type === 'research' ? 'bg-purple-100 text-purple-800' :
                  scholarship.type === 'mobility' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {scholarship.type.replace('_', ' ')}
                </span>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">
                    {formatCurrency(scholarship.amount, scholarship.currency)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {scholarship.type === 'mobility' ? (language === 'pt' ? '/mês' : '/month') : ''}
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'pt' ? scholarship.namePortuguese : scholarship.name}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4">
                {language === 'pt' ? 'Fornecido por:' : 'Provided by:'} <span className="font-medium">{scholarship.provider}</span>
              </p>

              <p className="text-sm text-gray-700 mb-4">
                {language === 'pt' ? scholarship.descriptionPortuguese : scholarship.description}
              </p>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  {language === 'pt' ? 'Elegibilidade:' : 'Eligibility:'}
                </h4>
                <ul className="space-y-1">
                  {(language === 'pt' ? scholarship.eligibilityPortuguese : scholarship.eligibility).slice(0, 3).map((criterion, index) => (
                    <li key={index} className="flex items-start text-xs text-gray-600">
                      <CheckBadgeIcon className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {criterion}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between mb-4 text-sm">
                <div>
                  <span className="text-gray-600">{language === 'pt' ? 'Duração:' : 'Duration:'}</span>
                  <span className="font-medium ml-1">
                    {language === 'pt' ? scholarship.durationPortuguese : scholarship.duration}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">{language === 'pt' ? 'Renovável:' : 'Renewable:'}</span>
                  <span className={`font-medium ml-1 ${scholarship.renewable ? 'text-green-600' : 'text-red-600'}`}>
                    {scholarship.renewable ? (language === 'pt' ? 'Sim' : 'Yes') : (language === 'pt' ? 'Não' : 'No')}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4 text-sm">
                <span className="text-gray-600">{language === 'pt' ? 'Prazo:' : 'Deadline:'}</span>
                <span className="font-medium">
                  {new Date(scholarship.applicationDeadline).toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB')}
                </span>
              </div>

              <button
                onClick={() => handleScholarshipApplication(scholarship)}
                className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
              >
                {language === 'pt' ? 'Candidatar' : 'Apply Now'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Research Opportunities */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {language === 'pt' ? 'Oportunidades de Investigação' : 'Research Opportunities'}
        </h2>
        
        <div className="space-y-6">
          {researchOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {language === 'pt' ? opportunity.titlePortuguese : opportunity.title}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      opportunity.level === 'phd' ? 'bg-purple-100 text-purple-800' :
                      opportunity.level === 'masters' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {opportunity.level.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span>{opportunity.university}</span>
                    <span>•</span>
                    <span>{language === 'pt' ? opportunity.departmentPortuguese : opportunity.department}</span>
                    <span>•</span>
                    <span>{opportunity.supervisor}</span>
                  </div>
                  <p className="text-gray-700 mb-4">
                    {language === 'pt' ? opportunity.descriptionPortuguese : opportunity.description}
                  </p>
                </div>
                {opportunity.funding.available && (
                  <div className="text-right ml-6">
                    <p className="text-lg font-bold text-green-600">
                      {formatCurrency(opportunity.funding.amount, opportunity.funding.currency)}
                      <span className="text-sm text-gray-600">/mês</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      {language === 'pt' ? opportunity.funding.durationPortuguese : opportunity.funding.duration}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {language === 'pt' ? 'Requisitos:' : 'Requirements:'}
                  </h4>
                  <ul className="space-y-2">
                    {(language === 'pt' ? opportunity.requirementsPortuguese : opportunity.requirements).map((req, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <CheckBadgeIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {language === 'pt' ? 'Detalhes da Posição:' : 'Position Details:'}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{language === 'pt' ? 'Área:' : 'Field:'}</span>
                      <span className="font-medium">{language === 'pt' ? opportunity.fieldPortuguese : opportunity.field}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{language === 'pt' ? 'Prazo:' : 'Deadline:'}</span>
                      <span className="font-medium">
                        {new Date(opportunity.applicationDeadline).toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{language === 'pt' ? 'Início:' : 'Start Date:'}</span>
                      <span className="font-medium">
                        {new Date(opportunity.startDate).toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-GB')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleResearchInterest(opportunity)}
                  className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                >
                  {language === 'pt' ? 'Expressar Interesse' : 'Express Interest'}
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
          {language === 'pt' ? 'Conecte-se com a Excelência Académica Portuguesa' : 'Connect with Portuguese Academic Excellence'}
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          {language === 'pt'
            ? 'Descubra oportunidades únicas de educação superior, investigação e intercâmbio nas universidades portuguesas de maior prestígio internacional.'
            : 'Discover unique opportunities for higher education, research, and exchange at Portugal\'s most internationally prestigious universities.'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">
            {language === 'pt' ? 'Explorar Programas' : 'Explore Programs'}
          </button>
          <button className="px-8 py-3 bg-white border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 transition-colors font-medium">
            {language === 'pt' ? 'Contactar Universidades' : 'Contact Universities'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PortugueseUniversityNetwork