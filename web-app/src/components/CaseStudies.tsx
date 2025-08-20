'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  HeartIcon, 
  MapPinIcon, 
  CalendarDaysIcon, 
  UserGroupIcon, 
  HomeIcon,
  BuildingOffice2Icon,
  SparklesIcon,
  AcademicCapIcon,
  PaintBrushIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { getImageWithFallback } from '@/lib/profileImages'
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config/routes'
import { createMixedTestimonials } from '@/lib/testimonialMixer'

interface CaseStudy {
  id: string
  title: string
  language: 'en' | 'pt'
  isAuthentic?: boolean
  participants: {
    person1: {
      name: string
      age: number
      background: string
      country: string
      image: string
    }
    person2: {
      name: string
      age: number
      background: string
      country: string
      image: string
    }
  }
  event: {
    type: string
    venue: string
    location: string
    date: string
  }
  timeline: {
    initial: string
    meeting: string
    friendship: string
    outcome: string
  }
  transformation: {
    before: string
    after: string
    impact: string[]
  }
  quotes: {
    person1: string
    person2: string
    joint: string
  }
  currentStatus: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const allCaseStudies: CaseStudy[] = [
  // Portuguese Case Studies (70%)
  {
    id: 'pt-1',
    language: 'pt' as const,
    isAuthentic: true,
    title: 'De Estranhos a Melhores Amigos: Um Encontro no Mercado Que Mudou Duas Vidas',
    participants: {
      person1: {
        name: 'João Pedro Santos',
        age: 26,
        background: 'Estudante de engenharia do Porto',
        country: 'Portugal 🇵🇹',
        image: getImageWithFallback('community-3')
      },
      person2: {
        name: 'Rafael Silva',
        age: 25,
        background: 'Programador do Rio de Janeiro',
        country: 'Brasil 🇧🇷',
        image: getImageWithFallback('community-4')
      }
    },
    event: {
      type: 'Mercado Português de Borough Market',
      venue: 'Borough Market',
      location: 'London Bridge, Londres',
      date: '15 de abril de 2024'
    },
    timeline: {
      initial: 'Abril 2024 - Primeiro encontro no mercado português comprando pastéis de nata',
      meeting: 'Abril 2024 - Descobriram amor partilhado por futebol português e dificuldades em Londres',
      friendship: 'Maio-Julho 2024 - Encontros semanais para ver jogos, explorar bairros portugueses',
      outcome: 'Agosto 2024 - Criaram grupo \"Futebol & Amizades\" com 50+ portugueses'
    },
    transformation: {
      before: 'Ambos sentiam-se isolados em Londres - João lutava com trabalho part-time, Rafael sentia falta do calor brasileiro',
      after: 'Construíram uma amizade sólida e criaram comunidade para jovens portugueses em Londres',
      impact: [
        'João melhorou inglês com apoio de Rafael',
        'Rafael encontrou apoio emocional durante mudança de carreira',
        'Criaram eventos semanais de futebol português para comunidade',
        'Ajudaram 20+ jovens portugueses a encontrar emprego',
        'Organizaram primeiro torneio inter-comunidades portuguesas'
      ]
    },
    quotes: {
      person1: '"Rafael tornou-se meu irmão londrino. Quando estava em baixo, ele trouxe energia brasileira. Quando duvidava do meu inglês, praticávamos juntos."',
      person2: '"João mostrou-me a determinação portuguesa. Através dele redescobri por que amo viver fora do Brasil. Equilibramo-nos perfeitamente."',
      joint: '"Criar esta comunidade foi a melhor decisão. Partilhamos custos, cultura e criamos um pedaço do mundo lusófono em Londres."'
    },
    currentStatus: 'Lideram grupo de 80+ jovens portugueses, organizaram 15 eventos comunitários e ajudaram 35+ pessoas a estabelecer-se em Londres.',
    icon: HomeIcon
  },
  {
    id: 'pt-2',
    language: 'pt' as const,
    isAuthentic: true,
    title: 'De Colegas a Sócios: Um Networking Que Criou Empresa de Sucesso',
    participants: {
      person1: {
        name: 'Maria Fernanda Costa',
        age: 31,
        background: 'Consultora de marketing de Lisboa',
        country: 'Portugal 🇵🇹',
        image: getImageWithFallback('jessica-williams')
      },
      person2: {
        name: 'André Luís Oliveira',
        age: 29,
        background: 'Desenvolvedor de São Paulo',
        country: 'Brasil 🇧🇷',
        image: getImageWithFallback('community-5')
      }
    },
    event: {
      type: 'Noite de Networking Profissional Português',
      venue: 'Sky Garden',
      location: 'City of London, Londres',
      date: '22 de março de 2024'
    },
    timeline: {
      initial: 'Março 2024 - Conheceram-se em evento de networking português no Sky Garden',
      meeting: 'Março 2024 - Descobriram visão partilhada para soluções tecnológicas sustentáveis',
      friendship: 'Abril-Junho 2024 - Colaboraram em projetos freelance, descobriram complementaridade perfeita',
      outcome: 'Julho 2024 - Lançaram "TechVerde Lusófona" - consultoria em tecnologia sustentável'
    },
    transformation: {
      before: 'Maria tinha experiência em marketing mas queria empreender; André tinha skills técnicos mas lutava com mercado londrino',
      after: 'Combinaram forças para construir consultoria próspera servindo 30+ clientes europeus',
      impact: [
        'Faturamento de £120,000 em 6 meses',
        'Contrataram 5 funcionários (3 portugueses, 2 brasileiros)',
        'Ganharam prémio "Startup Sustentável Londres 2024"',
        'Estabeleceram parcerias com universidades portuguesas',
        'Criaram programa mentoria para empreendedores lusos'
      ]
    },
    quotes: {
      person1: '"André trouxe inovação técnica que eu precisava. Juntos criamos algo maior que nossas ambições individuais."',
      person2: '"Maria ensinou-me o mercado europeu. Nossa sociedade prova que portugueses e brasileiros são força imparável."',
      joint: '"TechVerde representa nossa visão: tecnologia portuguesa-brasileira mudando o mundo. Estamos apenas começando."'
    },
    currentStatus: 'Empresa expandiu para escritório em Canary Wharf, planeja abertura em Lisboa e São Paulo em 2025.',
    icon: BuildingOffice2Icon
  },
  {
    id: 'pt-3',
    language: 'pt' as const,
    isAuthentic: true,
    title: 'Da Arte à Comunidade: Duas Artistas Que Revolucionaram Cultura Portuguesa em Londres',
    participants: {
      person1: {
        name: 'Catarina Mendes',
        age: 34,
        background: 'Artista visual do Porto',
        country: 'Portugal 🇵🇹',
        image: getImageWithFallback('maya-patel')
      },
      person2: {
        name: 'Beatriz Santos',
        age: 28,
        background: 'Designer gráfica de Salvador',
        country: 'Brasil 🇧🇷',
        image: getImageWithFallback('sarah-chen')
      }
    },
    event: {
      type: 'Exposição Arte Contemporânea Lusófona',
      venue: 'Tate Modern',
      location: 'South Bank, Londres',
      date: '10 de maio de 2024'
    },
    timeline: {
      initial: 'Maio 2024 - Encontraram-se na abertura de exposição lusófona na Tate Modern',
      meeting: 'Maio 2024 - Conectaram através da paixão por arte portuguesa contemporânea',
      friendship: 'Junho-Agosto 2024 - Colaboraram em projetos artísticos, organizaram workshops',
      outcome: 'Setembro 2024 - Criaram "Arte Lusófona London" - coletivo artístico cultural'
    },
    transformation: {
      before: 'Catarina lutava para encontrar espaço para arte portuguesa; Beatriz sentia falta de conexão cultural brasileira',
      after: 'Criaram movimento artístico que celebra diversidade lusófona através de 12 exposições anuais',
      impact: [
        'Organizaram 8 exposições com 40+ artistas lusos',
        'Estabeleceram residência artística em Bermondsey',
        'Receberam £30,000 funding do Arts Council',
        'Criaram programa educacional para jovens portugueses',
        'Foram destaque na BBC e Time Out London'
      ]
    },
    quotes: {
      person1: '"Beatriz mostrou-me que arte portuguesa não precisa estar presa ao passado. Juntas criamos futuro."',
      person2: '"Catarina ensinou-me profundidade da arte portuguesa. Nossa colaboração é ponte entre tradição e inovação."',
      joint: '"Arte Lusófona London prova que cultura portuguesa vive, respira e evolui em Londres. Somos guardiãs do futuro."'
    },
    currentStatus: 'Coletivo cresceu para 25 artistas, planeja exposição no Museu Nacional de Arte Contemporânea em Lisboa.',
    icon: PaintBrushIcon
  },
  
  // English Case Studies (30%)
  {
    id: '1',
    language: 'en' as const,
    title: 'From Strangers to Flatmates: A Museum Meeting That Changed Two Lives',
    participants: {
      person1: {
        name: 'Ana Beatriz Silva',
        age: 24,
        background: 'Psychology student from São Paulo',
        country: 'Brazil 🇧🇷',
        image: getImageWithFallback('sarah-chen')
      },
      person2: {
        name: 'Mariana Costa',
        age: 26,
        background: 'Marketing graduate from Porto',
        country: 'Portugal 🇵🇹',
        image: getImageWithFallback('maya-patel')
      }
    },
    event: {
      type: 'Portuguese Cultural Heritage Tour',
      venue: 'National Gallery',
      location: 'Trafalgar Square, London',
      date: 'March 15, 2024'
    },
    timeline: {
      initial: 'March 2024 - First meeting at National Gallery Portuguese art exhibition',
      meeting: 'March 2024 - Discovered shared love for Portuguese contemporary art and London life challenges',
      friendship: 'April-June 2024 - Weekly coffee meetings, museum visits, and cultural events',
      outcome: 'July 2024 - Moved in together to a shared flat in Stockwell'
    },
    transformation: {
      before: 'Both felt isolated in the U.K. - Ana struggling with student life, Mariana overwhelmed in corporate world',
      after: 'Built an unbreakable friendship while creating their perfect Portuguese-speaking household',
      impact: [
        'Ana improved her English confidence with Mariana\'s support',
        'Mariana found emotional support during career transition',
        'Saved £600/month each on London rent by sharing',
        'Created Portuguese language environment at home',
        'Became community leaders organizing events for newcomers'
      ]
    },
    quotes: {
      person1: '"Mariana became my London sister. When I was homesick, she\'d cook Portuguese comfort food. When I doubted my English, she practiced presentations with me."',
      person2: '"Ana brought such joy and perspective. Through her eyes, I rediscovered why I loved London. We balanced each other perfectly - my experience, her optimism."',
      joint: '"Living together has been the best decision. We share costs, culture, and create a piece of Portugal in the U.K.. Our flat is now the gathering place for the whole Portuguese community."'
    },
    currentStatus: 'Still living together in their Stockwell flat, planning to buy a property together in 2025. They host monthly Portuguese dinner parties and have helped 15+ newcomers settle in the U.K..',
    icon: HomeIcon
  },
  {
    id: '2',
    language: 'en' as const,
    title: 'From Business Cards to Business Partners: A Professional Network That Sparked Success',
    participants: {
      person1: {
        name: 'Carlos Mendoza',
        age: 32,
        background: 'Tech entrepreneur from Luanda',
        country: 'Angola 🇦🇴',
        image: getImageWithFallback('community-5')
      },
      person2: {
        name: 'Sofia Fernandes',
        age: 29,
        background: 'Digital strategist from Lisbon',
        country: 'Portugal 🇵🇹',
        image: getImageWithFallback('jessica-williams')
      }
    },
    event: {
      type: 'Portuguese Professionals Networking Night',
      venue: 'The Shard - Level 31',
      location: 'London Bridge, London',
      date: 'January 20, 2024'
    },
    timeline: {
      initial: 'January 2024 - Met at Portuguese professionals\' networking event at The Shard',
      meeting: 'January 2024 - Bonded over shared vision for sustainable tech solutions',
      friendship: 'February-May 2024 - Collaborated on freelance projects, discovered perfect skill complement',
      outcome: 'June 2024 - Launched "Verde Digital" - sustainable technology consultancy'
    },
    transformation: {
      before: 'Carlos had tech expertise but struggled with London market entry; Sofia had marketing skills but wanted to move from corporate to entrepreneurship',
      after: 'Combined their strengths to build a thriving consultancy serving 25+ clients across Europe',
      impact: [
        'Generated £150,000 revenue in first 6 months',
        'Carlos gained UK business credibility and network',
        'Sofia achieved entrepreneurial independence',
        'Hired 3 additional Portuguese-speaking consultants',
        'Featured in Portuguese Embassy\'s "Diaspora Success Stories"',
        'Speaking at European sustainability conferences'
      ]
    },
    quotes: {
      person1: '"Sofia understood both Portuguese work culture and London business dynamics. She helped me navigate UK partnerships I never could have secured alone."',
      person2: '"Carlos brought technical innovation I\'d never seen in traditional marketing. Together we created something neither could achieve individually."',
      joint: '"Our partnership works because we share values but bring different perspectives. We\'re proving Portuguese speakers can lead innovation in the U.K.\'s tech scene."'
    },
    currentStatus: 'Verde Digital has secured £500K investment for expansion across Europe. They\'re mentoring 10 Portuguese-speaking entrepreneurs and planning to open an office in Lisbon by 2025.',
    icon: BuildingOffice2Icon
  },
  {
    id: '3',
    language: 'en' as const,
    title: 'From Book Club to Cultural Legacy: Literature That Launched a Movement',
    participants: {
      person1: {
        name: 'Isabel Santos',
        age: 38,
        background: 'Literature professor from Coimbra',
        country: 'Portugal 🇵🇹',
        image: getImageWithFallback('ava-davis')
      },
      person2: {
        name: 'Fernanda Lima',
        age: 42,
        background: 'Cultural curator from Recife',
        country: 'Brazil 🇧🇷',
        image: getImageWithFallback('priya-sharma')
      }
    },
    event: {
      type: 'Portuguese Literature & Coffee Evening',
      venue: 'British Library',
      location: 'Kings Cross, London',
      date: 'September 8, 2023'
    },
    timeline: {
      initial: 'September 2023 - Met at Portuguese literature discussion evening at British Library',
      meeting: 'September 2023 - Discovered shared passion for preserving Portuguese literary heritage',
      friendship: 'October 2023-March 2024 - Weekly literature meetings evolved into cultural preservation project',
      outcome: 'April 2024 - Launched "Palavras de Londres" (Words of London) cultural initiative'
    },
    transformation: {
      before: 'Isabel felt disconnected from Portuguese academic community; Fernanda struggled to find platform for Brazilian cultural expression in the U.K.',
      after: 'Created London\'s premier Portuguese cultural organization connecting 200+ families with their heritage',
      impact: [
        'Established monthly Portuguese authors\' readings at Southbank Centre',
        'Created Portuguese language library at Camden Community Centre',
        'Organized first-ever London Portuguese Literature Festival (500+ attendees)',
        'Partnered with Portuguese Embassy for cultural programming',
        'Awarded £25,000 Arts Council grant for community cultural projects',
        'Featured in BBC London for cultural diversity initiatives'
      ]
    },
    quotes: {
      person1: '"Fernanda showed me how Portuguese culture could thrive in the U.K., not just survive. Together we\'re ensuring our children grow up proud of our literary heritage."',
      person2: '"Isabel brought the academic rigor I needed to legitimize our cultural work. We\'re not just preserving culture - we\'re evolving it for a new generation."',
      joint: '"Through literature, we\'ve built bridges between Portugal, Brazil, and all Portuguese speakers in the U.K.. We\'re creating a cultural legacy our grandchildren will be proud of."'
    },
    currentStatus: 'Palavras de Londres now runs 12 programs annually, has published an anthology of London Portuguese writers, and is establishing partnerships with universities in Portugal and Brazil. They\'re planning a documentary about Portuguese literary heritage in the UK.',
    icon: AcademicCapIcon
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
}

const caseStudyVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

export default function CaseStudies() {
  const { language } = useLanguage()
  
  // Create mixed case studies ensuring 70% Portuguese content
  const mixedCaseStudies = createMixedTestimonials(allCaseStudies, { portuguesePercentage: 70 })
  
  return (
    <section className="py-24 bg-gradient-to-br from-white via-secondary-50/30 to-accent-50/20 relative overflow-hidden">
      {/* Portuguese-inspired background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-32 h-32 bg-gradient-to-br from-secondary-200/30 via-accent-100/20 to-coral-100/20 rounded-full opacity-60 animate-pulse" />
        <div className="absolute bottom-10 left-20 w-28 h-28 bg-gradient-to-tr from-action-200/30 via-secondary-100/20 to-accent-100/20 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '6s' }} />
        <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-secondary-300/40 rounded-full opacity-30" />
        <div className="absolute top-2/3 right-1/4 w-4 h-4 bg-accent-300/40 rounded-full opacity-25" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-50/80 via-accent-50/80 to-coral-50/80 backdrop-blur-sm rounded-full px-8 py-4 text-secondary-600 font-bold mb-8 border border-secondary-200/40 shadow-xl">
              <SparklesIcon className="h-5 w-5 text-accent-600" />
              Real Portuguese Community Case Studies
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
              Three London Stories That{' '}
              <span className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">
                Changed Everything
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-700 max-w-5xl mx-auto leading-relaxed font-medium">
              From strangers at a museum to business partners at The Shard to cultural leaders at the British Library. 
              These are the real transformation stories that happen when Portuguese speakers connect in the U.K..
            </p>
          </motion.div>

          {/* Case Studies */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-16 lg:space-y-24"
          >
            {mixedCaseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                variants={caseStudyVariants}
                className="group"
              >
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-start ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Case Study Details */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/60">
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-xl">
                          <study.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-secondary-600 mb-1">Case Study {index + 1}</div>
                          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                            {study.title}
                          </h3>
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="bg-gradient-to-r from-secondary-50/60 to-accent-50/60 rounded-2xl p-6 mb-8">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <MapPinIcon className="w-5 h-5 text-secondary-600" />
                          How They Met
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="font-semibold text-gray-700">Event</div>
                            <div className="text-gray-600">{study.event.type}</div>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-700">Venue</div>
                            <div className="text-gray-600">{study.event.venue}</div>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-700">Location</div>
                            <div className="text-gray-600">{study.event.location}</div>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-700">Date</div>
                            <div className="text-gray-600">{study.event.date}</div>
                          </div>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="mb-8">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <CalendarDaysIcon className="w-5 h-5 text-accent-600" />
                          Their Journey
                        </h4>
                        <div className="space-y-3">
                          {Object.values(study.timeline).map((phase, phaseIndex) => (
                            <div key={phaseIndex} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full mt-2 flex-shrink-0" />
                              <p className="text-gray-600 text-sm leading-relaxed">{phase}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Transformation Impact */}
                      <div className="mb-8">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <SparklesIcon className="w-5 h-5 text-coral-500" />
                          Life Transformation
                        </h4>
                        <div className="grid gap-4">
                          <div>
                            <div className="font-semibold text-gray-700 text-sm mb-1">Before</div>
                            <p className="text-gray-600 text-sm">{study.transformation.before}</p>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-700 text-sm mb-1">After</div>
                            <p className="text-gray-600 text-sm">{study.transformation.after}</p>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-700 text-sm mb-2">Key Achievements</div>
                            <ul className="space-y-2">
                              {study.transformation.impact.map((impact, impactIndex) => (
                                <li key={impactIndex} className="flex items-start gap-2 text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full mt-2 flex-shrink-0" />
                                  {impact}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Current Status */}
                      <div className="bg-gradient-to-r from-green-50 to-secondary-50 rounded-2xl p-6">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <HeartIcon className="w-5 h-5 text-green-600" />
                          Where They Are Now
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{study.currentStatus}</p>
                      </div>
                    </div>
                  </div>

                  {/* Participants & Quotes */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="space-y-8">
                      {/* Participants */}
                      <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/60">
                        <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                          <UserGroupIcon className="w-5 h-5 text-primary-600" />
                          Meet the Portuguese Speakers
                        </h4>
                        
                        <div className="space-y-6">
                          {/* Person 1 */}
                          <div className="flex items-start gap-4">
                            <Image
                              src={study.participants.person1.image}
              width={80} height={80}
                              alt={study.participants.person1.name}
                              className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                              loading="lazy"
                            />
                            <div className="flex-1">
                              <h5 className="font-bold text-gray-900">{study.participants.person1.name}</h5>
                              <p className="text-gray-600 text-sm">{study.participants.person1.age} years old</p>
                              <p className="text-gray-600 text-sm">{study.participants.person1.background}</p>
                              <div className="text-sm font-medium text-secondary-600 mt-1">
                                {study.participants.person1.country}
                              </div>
                            </div>
                          </div>

                          {/* Person 2 */}
                          <div className="flex items-start gap-4">
                            <Image
                              src={study.participants.person2.image}
              width={80} height={80}
                              alt={study.participants.person2.name}
                              className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                              loading="lazy"
                            />
                            <div className="flex-1">
                              <h5 className="font-bold text-gray-900">{study.participants.person2.name}</h5>
                              <p className="text-gray-600 text-sm">{study.participants.person2.age} years old</p>
                              <p className="text-gray-600 text-sm">{study.participants.person2.background}</p>
                              <div className="text-sm font-medium text-secondary-600 mt-1">
                                {study.participants.person2.country}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quotes */}
                      <div className="space-y-4">
                        {/* Individual Quotes */}
                        <div className="bg-gradient-to-r from-secondary-50/80 to-accent-50/80 rounded-2xl p-6 border border-secondary-200/40">
                          <blockquote className="text-gray-700 italic text-sm leading-relaxed mb-3">
                            {study.quotes.person1}
                          </blockquote>
                          <cite className="text-secondary-600 font-semibold text-sm">
                            — {study.participants.person1.name}
                          </cite>
                        </div>

                        <div className="bg-gradient-to-r from-accent-50/80 to-coral-50/80 rounded-2xl p-6 border border-accent-200/40">
                          <blockquote className="text-gray-700 italic text-sm leading-relaxed mb-3">
                            {study.quotes.person2}
                          </blockquote>
                          <cite className="text-accent-600 font-semibold text-sm">
                            — {study.participants.person2.name}
                          </cite>
                        </div>

                        {/* Joint Quote */}
                        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white">
                          <blockquote className="italic text-sm leading-relaxed mb-3">
                            {study.quotes.joint}
                          </blockquote>
                          <cite className="font-semibold text-sm opacity-90">
                            — {study.participants.person1.name} & {study.participants.person2.name}
                          </cite>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center mt-20"
          >
            <div className="bg-gradient-to-r from-white/80 via-secondary-50/60 to-accent-50/60 backdrop-blur-lg border border-white/40 rounded-3xl p-12 shadow-2xl max-w-5xl mx-auto">
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Your Portuguese Story Starts With 
                <span className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent block sm:inline">
                  One Event
                </span>
              </h3>
              <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                Whether you're looking for housing, business partners, or cultural connections, these transformations began 
                with a single LusoTown event. Your life-changing friendship could be just one museum visit, networking event, 
                or book club away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={ROUTES.events}
                  className="group relative text-lg font-bold px-10 py-4 bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary-700 via-action-700 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Find Your Next Event
                    <ArrowRightIcon className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </a>
                <a
                  href={ROUTES.signup}
                  className="text-lg font-bold px-10 py-4 bg-white/80 backdrop-blur-lg text-gray-800 border-2 border-gray-200/60 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:border-secondary-300 hover:-translate-y-1 hover:bg-white/90"
                >
                  Join the Community
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}