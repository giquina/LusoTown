'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  TrophyIcon,
  HeartIcon,
  StarIcon as StarIconOutline,
  MapPinIcon,
  CalendarIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

interface Achievement {
  id: string
  title: {
    en: string
    pt: string
  }
  description: {
    en: string
    pt: string
  }
  icon: string
  color: string
}

interface SuccessStory {
  id: string
  name: string
  age: number
  originCountry: {
    en: string
    pt: string
  }
  flag: string
  currentLocation: string
  university: string
  degree: string
  graduationYear: string
  currentRole: string
  company: string
  profileImage: string
  story: {
    en: string
    pt: string
  }
  quote: {
    en: string
    pt: string
  }
  achievements: Achievement[]
  culturalImpact: {
    en: string
    pt: string
  }
  lusoTownConnection: {
    en: string
    pt: string
  }
  keyMetrics: {
    networkingScore: number
    culturalEngagement: number
    careerGrowth: number
    communityImpact: number
  }
  socialLinks: {
    linkedin?: string
    website?: string
    portfolio?: string
  }
  mentorshipOffered: boolean
  categories: string[]
  testimonial: {
    en: string
    pt: string
  }
}

const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'ana-tech-entrepreneur',
    name: 'Ana Ribeiro',
    age: 28,
    originCountry: { en: 'Portugal', pt: 'Portugal' },
    flag: '🇵🇹',
    currentLocation: 'London, United Kingdom',
    university: 'Imperial College London',
    degree: 'Computer Science & Innovation',
    graduationYear: '2019',
    currentRole: 'Co-Founder & CTO',
    company: 'PortugueseTech Ventures',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600',
    story: {
      en: 'From a small town in Northern Portugal to leading a £5M tech startup in London. Ana\'s journey through Imperial College and LusoTown\'s Portuguese-speaking community network opened doors to investors, mentors, and co-founders who shared her cultural values.',
      pt: 'De uma pequena cidade no Norte de Portugal a liderar uma startup tecnológica de £5M em Londres. A jornada da Ana através do Imperial College e da rede da comunidade lusófona LusoTown abriu portas para investidores, mentores e co-fundadores que partilhavam os seus valores culturais.'
    },
    quote: {
      en: 'LusoTown didn\'t just connect me to other Portuguese students - it connected me to my future co-founder and our biggest investor. Cultural bonds created business success.',
      pt: 'A LusoTown não me conectou apenas a outros estudantes portugueses - conectou-me ao meu futuro co-fundador e ao nosso maior investidor. Laços culturais criaram sucesso empresarial.'
    },
    achievements: [
      {
        id: 'startup-founded',
        title: { en: 'Tech Startup Founded', pt: 'Startup Tecnológica Fundada' },
        description: { en: '£5M Series A funding raised', pt: '£5M financiamento Série A levantado' },
        icon: '🚀',
        color: 'text-blue-600'
      },
      {
        id: 'team-leadership',
        title: { en: 'Team Leadership', pt: 'Liderança de Equipa' },
        description: { en: '25-person diverse tech team', pt: 'Equipa tecnológica diversa de 25 pessoas' },
        icon: '👥',
        color: 'text-green-600'
      },
      {
        id: 'cultural-bridge',
        title: { en: 'Cultural Bridge', pt: 'Ponte Cultural' },
        description: { en: 'UK-Portugal tech partnerships', pt: 'Parcerias tecnológicas Reino Unido-Portugal' },
        icon: '🌉',
        color: 'text-purple-600'
      },
      {
        id: 'awards-recognition',
        title: { en: 'Awards & Recognition', pt: 'Prémios e Reconhecimento' },
        description: { en: 'Tech Entrepreneur of the Year 2023', pt: 'Empresária Tecnológica do Ano 2023' },
        icon: '🏆',
        color: 'text-yellow-600'
      }
    ],
    culturalImpact: {
      en: 'Promotes Portuguese tech talent internationally and mentors 50+ Portuguese students in STEM fields',
      pt: 'Promove talento tecnológico português internacionalmente e mentoriza mais de 50 estudantes portugueses em áreas STEM'
    },
    lusoTownConnection: {
      en: 'Met co-founder at LusoTown tech networking event, secured initial funding through Portuguese investor network',
      pt: 'Conheceu co-fundador num evento de networking tecnológico LusoTown, garantiu financiamento inicial através de rede de investidores portugueses'
    },
    keyMetrics: {
      networkingScore: 98,
      culturalEngagement: 96,
      careerGrowth: 95,
      communityImpact: 94
    },
    socialLinks: {
      linkedin: 'ana-ribeiro-tech',
      website: 'ana-ribeiro.com',
      portfolio: 'portuguesetech.ventures'
    },
    mentorshipOffered: true,
    categories: ['Technology', 'Entrepreneurship', 'Women in Tech', 'Cultural Leadership'],
    testimonial: {
      en: 'Ana transformed our understanding of what Portuguese tech leadership looks like in London. Her success inspires our entire community.',
      pt: 'Ana transformou a nossa compreensão do que parece a liderança tecnológica portuguesa em Londres. O seu sucesso inspira toda a nossa comunidade.'
    }
  },
  {
    id: 'miguel-financial-analyst',
    name: 'Miguel Santos',
    age: 26,
    originCountry: { en: 'Brazil', pt: 'Brasil' },
    flag: '🇧🇷',
    currentLocation: 'Canary Wharf, London',
    university: 'London School of Economics',
    degree: 'Economics & Finance',
    graduationYear: '2021',
    currentRole: 'Senior Financial Analyst',
    company: 'Goldman Sachs International',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
    story: {
      en: 'From São Paulo\'s favelas to Wall Street\'s London office. Miguel\'s LSE education combined with LusoTown\'s professional network helped him navigate British finance culture while maintaining his Brazilian identity and social consciousness.',
      pt: 'Das favelas de São Paulo ao escritório londrino de Wall Street. A educação da LSE do Miguel combinada com a rede profissional da LusoTown ajudou-o a navegar a cultura financeira britânica mantendo a sua identidade brasileira e consciência social.'
    },
    quote: {
      en: 'LusoTown taught me that success isn\'t about abandoning your roots - it\'s about leveraging them. My Brazilian perspective became my competitive advantage in London finance.',
      pt: 'A LusoTown ensinou-me que sucesso não é abandonar as suas raízes - é alavancá-las. A minha perspetiva brasileira tornou-se a minha vantagem competitiva nas finanças londrinas.'
    },
    achievements: [
      {
        id: 'goldman-promotion',
        title: { en: 'Goldman Sachs Promotion', pt: 'Promoção Goldman Sachs' },
        description: { en: 'Youngest Senior Analyst in department', pt: 'Analista Sénior mais jovem do departamento' },
        icon: '💼',
        color: 'text-blue-600'
      },
      {
        id: 'scholarship-program',
        title: { en: 'Scholarship Program', pt: 'Programa de Bolsas' },
        description: { en: '£100k fund for Brazilian students', pt: 'Fundo de £100k para estudantes brasileiros' },
        icon: '🎓',
        color: 'text-green-600'
      },
      {
        id: 'cultural-finance',
        title: { en: 'Cultural Finance Bridge', pt: 'Ponte Financeira Cultural' },
        description: { en: 'Brazil-UK investment initiatives', pt: 'Iniciativas de investimento Brasil-Reino Unido' },
        icon: '🌎',
        color: 'text-orange-600'
      },
      {
        id: 'community-giving',
        title: { en: 'Community Giving', pt: 'Doação Comunitária' },
        description: { en: 'Social impact investing focus', pt: 'Foco em investimento de impacto social' },
        icon: '❤️',
        color: 'text-red-600'
      }
    ],
    culturalImpact: {
      en: 'Created scholarship fund for underrepresented Brazilian students and advocates for diversity in London finance',
      pt: 'Criou fundo de bolsas para estudantes brasileiros sub-representados e advoga pela diversidade nas finanças londrinas'
    },
    lusoTownConnection: {
      en: 'LusoTown mentorship program connected him with senior Brazilian finance professionals who guided his career trajectory',
      pt: 'Programa de mentoria LusoTown conectou-o com profissionais financeiros brasileiros seniores que guiaram a sua trajetória profissional'
    },
    keyMetrics: {
      networkingScore: 92,
      culturalEngagement: 88,
      careerGrowth: 96,
      communityImpact: 90
    },
    socialLinks: {
      linkedin: 'miguel-santos-finance',
      website: 'miguel-santos-impact.com'
    },
    mentorshipOffered: true,
    categories: ['Finance', 'Social Impact', 'Brazilian Culture', 'Diversity & Inclusion'],
    testimonial: {
      en: 'Miguel proves that you can reach the highest levels of London finance while staying true to your cultural values and social mission.',
      pt: 'Miguel prova que pode alcançar os mais altos níveis das finanças londrinas mantendo-se fiel aos seus valores culturais e missão social.'
    }
  },
  {
    id: 'joana-creative-director',
    name: 'Joana Fernandes',
    age: 30,
    originCountry: { en: 'Cape Verde', pt: 'Cabo Verde' },
    flag: '🇨🇻',
    currentLocation: 'Shoreditch, London',
    university: 'Central Saint Martins',
    degree: 'Creative Arts & Design',
    graduationYear: '2017',
    currentRole: 'Creative Director',
    company: 'Morabeza Creative Studio',
    profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600',
    story: {
      en: 'Bringing Cape Verdean island aesthetics to London\'s creative scene. Joana\'s journey from Praia to Central Saint Martins showcases how LusoTown\'s cultural network helped her maintain artistic authenticity while building international recognition.',
      pt: 'Trazendo estética das ilhas cabo-verdianas para a cena criativa londrina. A jornada da Joana da Praia para Central Saint Martins mostra como a rede cultural da LusoTown a ajudou a manter autenticidade artística construindo reconhecimento internacional.'
    },
    quote: {
      en: 'Through LusoTown, I discovered that my Cape Verdean heritage wasn\'t something to overcome - it was my unique creative superpower that London\'s art world was hungry for.',
      pt: 'Através da LusoTown, descobri que a minha herança cabo-verdiana não era algo a superar - era o meu superpoder criativo único pelo qual o mundo artístico londrino tinha fome.'
    },
    achievements: [
      {
        id: 'studio-founded',
        title: { en: 'Creative Studio Founded', pt: 'Estúdio Criativo Fundado' },
        description: { en: 'Morabeza Creative Studio - 15 employees', pt: 'Estúdio Criativo Morabeza - 15 funcionários' },
        icon: '🎨',
        color: 'text-purple-600'
      },
      {
        id: 'brand-partnerships',
        title: { en: 'Global Brand Partnerships', pt: 'Parcerias de Marcas Globais' },
        description: { en: 'Nike, Adidas, British Museum campaigns', pt: 'Campanhas Nike, Adidas, Museu Britânico' },
        icon: '🤝',
        color: 'text-blue-600'
      },
      {
        id: 'cultural-exhibitions',
        title: { en: 'Cultural Exhibitions', pt: 'Exposições Culturais' },
        description: { en: 'Tate Modern Cape Verdean showcase', pt: 'Mostra cabo-verdiana Tate Modern' },
        icon: '🖼️',
        color: 'text-green-600'
      },
      {
        id: 'design-awards',
        title: { en: 'Design Awards', pt: 'Prémios de Design' },
        description: { en: 'London Design Festival winner 2022', pt: 'Vencedora Festival de Design de Londres 2022' },
        icon: '🏅',
        color: 'text-yellow-600'
      }
    ],
    culturalImpact: {
      en: 'Showcases Cape Verdean art globally and mentors African creative students in London\'s competitive art scene',
      pt: 'Mostra arte cabo-verdiana globalmente e mentoriza estudantes criativos africanos na cena artística competitiva de Londres'
    },
    lusoTownConnection: {
      en: 'LusoTown cultural events provided platform to showcase Cape Verdean art, leading to major gallery connections',
      pt: 'Eventos culturais LusoTown proporcionaram plataforma para mostrar arte cabo-verdiana, levando a conexões importantes com galerias'
    },
    keyMetrics: {
      networkingScore: 94,
      culturalEngagement: 98,
      careerGrowth: 91,
      communityImpact: 96
    },
    socialLinks: {
      linkedin: 'joana-fernandes-creative',
      website: 'morabeza-creative.com',
      portfolio: 'joana-fernandes-art.com'
    },
    mentorshipOffered: true,
    categories: ['Creative Arts', 'Cultural Heritage', 'African Arts', 'Design Leadership'],
    testimonial: {
      en: 'Joana\'s success shows how authentic cultural expression can become a powerful business advantage in London\'s creative economy.',
      pt: 'O sucesso da Joana mostra como expressão cultural autêntica pode tornar-se uma vantagem empresarial poderosa na economia criativa londrina.'
    }
  },
  {
    id: 'ricardo-medical-researcher',
    name: 'Dr. Ricardo Silva',
    age: 32,
    originCountry: { en: 'Angola', pt: 'Angola' },
    flag: '🇦🇴',
    currentLocation: 'Cambridge, United Kingdom',
    university: 'University of Cambridge',
    degree: 'Medical Research & Tropical Medicine',
    graduationYear: '2020',
    currentRole: 'Principal Research Scientist',
    company: 'Cambridge Institute for Medical Research',
    profileImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600',
    story: {
      en: 'Leading breakthrough research in tropical diseases affecting African Portuguese-speaking communities. Ricardo\'s Cambridge PhD and LusoTown network enabled him to bridge academic excellence with real-world impact in Angola and Mozambique.',
      pt: 'Liderando investigação inovadora em doenças tropicais afetando comunidades africanas lusófonas. O doutoramento em Cambridge do Ricardo e a rede LusoTown permitiram-lhe fazer a ponte entre excelência acadêmica e impacto real em Angola e Moçambique.'
    },
    quote: {
      en: 'LusoTown connected me with Angolan doctors and researchers worldwide. Our shared language and culture accelerated collaborations that are literally saving lives back home.',
      pt: 'A LusoTown conectou-me com médicos e investigadores angolanos mundialmente. A nossa língua e cultura partilhadas aceleraram colaborações que literalmente estão salvando vidas em casa.'
    },
    achievements: [
      {
        id: 'research-breakthrough',
        title: { en: 'Research Breakthrough', pt: 'Descoberta de Investigação' },
        description: { en: 'Malaria treatment published in Nature', pt: 'Tratamento de malária publicado na Nature' },
        icon: '🔬',
        color: 'text-green-600'
      },
      {
        id: 'health-program',
        title: { en: 'Health Program Launch', pt: 'Lançamento Programa de Saúde' },
        description: { en: 'Angola-Cambridge medical partnership', pt: 'Parceria médica Angola-Cambridge' },
        icon: '🏥',
        color: 'text-blue-600'
      },
      {
        id: 'student-training',
        title: { en: 'Student Training Program', pt: 'Programa de Formação de Estudantes' },
        description: { en: '200+ African medical students trained', pt: '200+ estudantes de medicina africanos formados' },
        icon: '👨‍⚕️',
        color: 'text-purple-600'
      },
      {
        id: 'global-recognition',
        title: { en: 'Global Recognition', pt: 'Reconhecimento Global' },
        description: { en: 'WHO Young Scientist Award 2023', pt: 'Prémio Jovem Cientista OMS 2023' },
        icon: '🌍',
        color: 'text-orange-600'
      }
    ],
    culturalImpact: {
      en: 'Established medical training partnerships benefiting Portuguese-speaking African nations and trains next generation of African doctors',
      pt: 'Estabeleceu parcerias de formação médica beneficiando nações africanas lusófonas e forma a próxima geração de médicos africanos'
    },
    lusoTownConnection: {
      en: 'LusoTown\'s professional network facilitated research collaborations with medical professionals across Portuguese-speaking Africa',
      pt: 'Rede profissional LusoTown facilitou colaborações de investigação com profissionais médicos em toda a África lusófona'
    },
    keyMetrics: {
      networkingScore: 89,
      culturalEngagement: 93,
      careerGrowth: 97,
      communityImpact: 99
    },
    socialLinks: {
      linkedin: 'ricardo-silva-research',
      website: 'ricardo-tropical-medicine.cam.ac.uk'
    },
    mentorshipOffered: true,
    categories: ['Medical Research', 'Global Health', 'African Development', 'Scientific Innovation'],
    testimonial: {
      en: 'Dr. Ricardo represents the best of Portuguese-speaking scientific diaspora - using world-class education to solve problems that matter to our communities.',
      pt: 'Dr. Ricardo representa o melhor da diáspora científica lusófona - usando educação de classe mundial para resolver problemas importantes para as nossas comunidades.'
    }
  },
  {
    id: 'carla-sustainability-consultant',
    name: 'Carla Mendes',
    age: 29,
    originCountry: { en: 'Mozambique', pt: 'Moçambique' },
    flag: '🇲🇿',
    currentLocation: 'Edinburgh, United Kingdom',
    university: 'University of Edinburgh',
    degree: 'Environmental Science & Policy',
    graduationYear: '2018',
    currentRole: 'Senior Sustainability Consultant',
    company: 'UN Environment Programme',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600',
    story: {
      en: 'From Maputo to Edinburgh to the UN - Carla\'s journey showcases how Portuguese-speaking African perspectives are essential for global environmental solutions. LusoTown\'s network provided the cultural support system that enabled her international career.',
      pt: 'De Maputo para Edimburgo para a ONU - a jornada da Carla mostra como perspetivas africanas lusófonas são essenciais para soluções ambientais globais. A rede LusoTown forneceu o sistema de apoio cultural que permitiu a sua carreira internacional.'
    },
    quote: {
      en: 'LusoTown helped me realize that my Mozambican environmental knowledge wasn\'t just valuable locally - it was exactly what the world needed to hear in global climate discussions.',
      pt: 'A LusoTown ajudou-me a perceber que o meu conhecimento ambiental moçambicano não era apenas valioso localmente - era exatamente o que o mundo precisava ouvir em discussões climáticas globais.'
    },
    achievements: [
      {
        id: 'un-appointment',
        title: { en: 'UN Appointment', pt: 'Nomeação da ONU' },
        description: { en: 'Senior Consultant at 29 years old', pt: 'Consultora Sénior aos 29 anos' },
        icon: '🌐',
        color: 'text-blue-600'
      },
      {
        id: 'climate-policy',
        title: { en: 'Climate Policy Development', pt: 'Desenvolvimento de Política Climática' },
        description: { en: 'African climate adaptation strategies', pt: 'Estratégias de adaptação climática africana' },
        icon: '🌱',
        color: 'text-green-600'
      },
      {
        id: 'academic-publications',
        title: { en: 'Academic Publications', pt: 'Publicações Acadêmicas' },
        description: { en: '15+ peer-reviewed environmental papers', pt: '15+ artigos ambientais revistos por pares' },
        icon: '📚',
        color: 'text-purple-600'
      },
      {
        id: 'conference-speaker',
        title: { en: 'International Speaker', pt: 'Palestrante Internacional' },
        description: { en: 'COP28 keynote presentation', pt: 'Apresentação principal COP28' },
        icon: '🎤',
        color: 'text-orange-600'
      }
    ],
    culturalImpact: {
      en: 'Advocates for African environmental perspectives in international forums and mentors Mozambican environmental science students',
      pt: 'Advoga por perspetivas ambientais africanas em fóruns internacionais e mentoriza estudantes moçambicanos de ciências ambientais'
    },
    lusoTownConnection: {
      en: 'LusoTown connected her with Portuguese environmental researchers, creating research partnerships spanning three continents',
      pt: 'LusoTown conectou-a com investigadores ambientais portugueses, criando parcerias de investigação abrangendo três continentes'
    },
    keyMetrics: {
      networkingScore: 95,
      culturalEngagement: 92,
      careerGrowth: 94,
      communityImpact: 97
    },
    socialLinks: {
      linkedin: 'carla-mendes-environment',
      website: 'carla-climate-solutions.org'
    },
    mentorshipOffered: true,
    categories: ['Environmental Science', 'Climate Policy', 'African Development', 'International Relations'],
    testimonial: {
      en: 'Carla demonstrates how Portuguese-speaking perspectives are crucial for addressing global challenges. Her success inspires environmental students across all our communities.',
      pt: 'Carla demonstra como perspetivas lusófonas são cruciais para abordar desafios globais. O seu sucesso inspira estudantes ambientais em todas as nossas comunidades.'
    }
  }
]

interface SuccessStoriesCarouselProps {
  autoplay?: boolean
  autoplayInterval?: number
}

export default function SuccessStoriesCarousel({ 
  autoplay = true, 
  autoplayInterval = 8000 
}: SuccessStoriesCarouselProps) {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoplay)

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SUCCESS_STORIES.length)
    }, autoplayInterval)

    return () => clearInterval(interval)
  }, [isPlaying, autoplayInterval])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsPlaying(false) // Pause autoplay when user interacts
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + SUCCESS_STORIES.length) % SUCCESS_STORIES.length)
    setIsPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % SUCCESS_STORIES.length)
    setIsPlaying(false)
  }

  const currentStory = SUCCESS_STORIES[currentIndex]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50 overflow-hidden">
      <div className="container-width">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {language === 'pt' 
              ? 'Histórias de Sucesso Inspiradoras' 
              : 'Inspiring Success Stories'
            }
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'pt'
              ? 'Estudantes portugueses que transformaram as suas experiências universitárias em carreiras extraordinárias'
              : 'Portuguese students who transformed their university experiences into extraordinary careers'
            }
          </p>
        </motion.div>

        {/* Main Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 group"
            aria-label={language === 'pt' ? 'História anterior' : 'Previous story'}
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-600 group-hover:text-primary-600" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 group"
            aria-label={language === 'pt' ? 'Próxima história' : 'Next story'}
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-600 group-hover:text-primary-600" />
          </button>

          {/* Story Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left Side - Story Details */}
                <div className="p-8 lg:p-12">
                  {/* Profile Header */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="relative">
                      <img
                        src={currentStory.profileImage}
                        alt={currentStory.name}
                        className="w-20 h-20 rounded-full object-cover shadow-lg"
                      />
                      <div className="absolute -bottom-2 -right-2 text-2xl">
                        {currentStory.flag}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {currentStory.name}
                      </h3>
                      <p className="text-lg text-primary-600 font-semibold mb-2">
                        {currentStory.currentRole}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          {currentStory.currentLocation}
                        </div>
                        <div className="flex items-center">
                          <AcademicCapIcon className="w-4 h-4 mr-1" />
                          {currentStory.university}
                        </div>
                        <div className="flex items-center">
                          <BriefcaseIcon className="w-4 h-4 mr-1" />
                          {currentStory.company}
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          {language === 'pt' ? 'Graduado em' : 'Graduated'} {currentStory.graduationYear}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Story Quote */}
                  <blockquote className="italic text-lg text-gray-700 leading-relaxed mb-6 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border-l-4 border-primary-400">
                    "{currentStory.quote[language]}"
                  </blockquote>

                  {/* Story Description */}
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {currentStory.story[language]}
                  </p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {Object.entries(currentStory.keyMetrics).map(([key, value]) => (
                      <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-xl font-bold text-primary-600 mb-1">{value}%</div>
                        <div className="text-xs text-gray-600 capitalize">
                          {language === 'pt' ? 
                            (key === 'networkingScore' ? 'Networking' : 
                             key === 'culturalEngagement' ? 'Cultural' :
                             key === 'careerGrowth' ? 'Carreira' : 'Impacto') :
                            key.replace(/([A-Z])/g, ' $1').trim()
                          }
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* LusoTown Connection */}
                  <div className="bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <HeartIcon className="w-5 h-5 mr-2 text-primary-600" />
                      {language === 'pt' ? 'Conexão LusoTown:' : 'LusoTown Connection:'}
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {currentStory.lusoTownConnection[language]}
                    </p>
                  </div>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentStory.categories.map((category, index) => (
                      <span 
                        key={index}
                        className="inline-block px-3 py-1 text-xs bg-secondary-50 text-secondary-700 rounded-full border border-secondary-200"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {currentStory.mentorshipOffered && (
                      <button className="
                        flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 
                        text-white font-medium py-3 px-6 rounded-xl 
                        hover:from-primary-600 hover:to-secondary-600 
                        transition-all duration-200 shadow-lg hover:shadow-xl
                        min-h-[48px] text-sm
                      ">
                        {language === 'pt' ? 'Conectar como Mentor' : 'Connect as Mentor'}
                      </button>
                    )}
                    <button className="
                      flex-1 border-2 border-primary-200 text-primary-600 
                      font-medium py-3 px-6 rounded-xl 
                      hover:bg-primary-50 hover:border-primary-300
                      transition-all duration-200 shadow-lg hover:shadow-xl
                      min-h-[48px] text-sm
                    ">
                      {language === 'pt' ? 'Ver Perfil Completo' : 'View Full Profile'}
                    </button>
                  </div>
                </div>

                {/* Right Side - Achievements & Visual */}
                <div className="bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 p-8 lg:p-12 text-white">
                  {/* Achievements Grid */}
                  <h4 className="text-xl font-bold mb-6">
                    {language === 'pt' ? 'Principais Conquistas' : 'Key Achievements'}
                  </h4>
                  
                  <div className="space-y-4 mb-8">
                    {currentStory.achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white/20 backdrop-blur-sm rounded-xl p-4"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-semibold mb-1">
                              {achievement.title[language]}
                            </h5>
                            <p className="text-sm opacity-90">
                              {achievement.description[language]}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Cultural Impact */}
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                    <h5 className="font-semibold mb-3 flex items-center">
                      <GlobeAltIcon className="w-5 h-5 mr-2" />
                      {language === 'pt' ? 'Impacto Cultural' : 'Cultural Impact'}
                    </h5>
                    <p className="text-sm opacity-90 leading-relaxed">
                      {currentStory.culturalImpact[language]}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {SUCCESS_STORIES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${index === currentIndex 
                  ? 'bg-primary-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
                }
              `}
              aria-label={`${language === 'pt' ? 'Ver história' : 'View story'} ${index + 1}`}
            />
          ))}
        </div>

        {/* Carousel Controls */}
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <span>{isPlaying ? '⏸️' : '▶️'}</span>
            <span className="text-gray-700">
              {language === 'pt' 
                ? (isPlaying ? 'Pausar' : 'Reproduzir')
                : (isPlaying ? 'Pause' : 'Play')
              }
            </span>
          </button>
          <span className="text-sm text-gray-600">
            {currentIndex + 1} / {SUCCESS_STORIES.length}
          </span>
        </div>
      </div>
    </section>
  )
}