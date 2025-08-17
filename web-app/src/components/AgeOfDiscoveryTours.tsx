'use client'

import { motion } from 'framer-motion'
import { GlobeAltIcon, MapPinIcon, ClockIcon, AcademicCapIcon, BookOpenIcon, StarIcon } from '@heroicons/react/24/outline'
import { Crown, Compass, Ship, Map, Telescope, Anchor } from 'lucide-react'

interface DiscoveryLandmark {
  name: string
  namePortuguese: string
  location: string
  connectionToPortugal: string
  connectionToPortugalPortuguese: string
  historicalPeriod: string
  discoveryStory: string
  discoveryStoryPortuguese: string
  modernRelevance: string
  modernRelevancePortuguese: string
  duration: string
}

interface DiscoveryTour {
  id: string
  name: string
  namePortuguese: string
  description: string
  descriptionPortuguese: string
  duration: string
  price: number
  theme: 'maritime' | 'exploration' | 'trade' | 'navigation' | 'cultural-exchange'
  educationalLevel: 'family' | 'academic' | 'professional'
  landmarks: DiscoveryLandmark[]
  historicalContext: string
  historicalContextPortuguese: string
  educationalOutcomes: string[]
  educationalOutcomesPortuguese: string[]
  includes: string[]
  includesPortuguese: string[]
  culturalConnections: string[]
  culturalConnectionsPortuguese: string[]
}

const ageOfDiscoveryTours: DiscoveryTour[] = [
  {
    id: 'portuguese-maritime-london',
    name: 'Portuguese Maritime Culture in London',
    namePortuguese: 'Cultura Marítima Portuguesa em Londres',
    description: 'Explore London\'s deep connections to Portuguese maritime discoveries, from the National Maritime Museum to historic trading routes that connected Portugal to London.',
    descriptionPortuguese: 'Explore as profundas conexões de Londres às descobertas marítimas portuguesas, do Museu Marítimo Nacional às rotas comerciais históricas que conectaram Portugal a Londres.',
    duration: '6 hours',
    price: 185,
    theme: 'maritime',
    educationalLevel: 'academic',
    landmarks: [
      {
        name: 'National Maritime Museum - Portuguese Exploration Gallery',
        namePortuguese: 'Museu Marítimo Nacional - Galeria de Exploração Portuguesa',
        location: 'Greenwich, London SE10',
        connectionToPortugal: 'Houses the largest collection of Portuguese maritime artifacts outside Portugal, including original navigation instruments used by Portuguese explorers.',
        connectionToPortugalPortuguese: 'Abriga a maior coleção de artefatos marítimos portugueses fora de Portugal, incluindo instrumentos de navegação originais usados por exploradores portugueses.',
        historicalPeriod: '1415-1600 Age of Discoveries',
        discoveryStory: 'Portugal pioneered systematic ocean navigation, creating the first global maritime empire and establishing trade routes that connected Europe, Africa, Asia, and the Americas.',
        discoveryStoryPortuguese: 'Portugal foi pioneiro na navegação oceânica sistemática, criando o primeiro império marítimo global e estabelecendo rotas comerciais que conectaram Europa, África, Ásia e as Américas.',
        modernRelevance: 'These Portuguese innovations in navigation and cartography laid the foundation for modern global trade and maritime technology.',
        modernRelevancePortuguese: 'Estas inovações portuguesas em navegação e cartografia estabeleceram a base para o comércio global moderno e tecnologia marítima.',
        duration: '90 minutes'
      },
      {
        name: 'Tower of London - Portuguese Royal Connections',
        namePortuguese: 'Torre de Londres - Conexões Reais Portuguesas',
        location: 'Tower Hill, London EC3',
        connectionToPortugal: 'Site of diplomatic meetings between Portuguese and English royalty, including negotiations for Catherine of Braganza\'s marriage to Charles II.',
        connectionToPortugalPortuguese: 'Local de encontros diplomáticos entre a realeza portuguesa e inglesa, incluindo negociações para o casamento de Catarina de Bragança com Carlos II.',
        historicalPeriod: '1662 - Portuguese-English Royal Alliance',
        discoveryStory: 'Catherine of Braganza brought Bombay and Tangier as dowry, fundamentally changing British maritime power and establishing lasting Portuguese-British connections.',
        discoveryStoryPortuguese: 'Catarina de Bragança trouxe Bombaim e Tânger como dote, mudando fundamentalmente o poder marítimo britânico e estabelecendo conexões duradouras luso-britânicas.',
        modernRelevance: 'This alliance shaped modern diplomatic and cultural relationships between Portugal and Britain, influencing maritime law and trade agreements.',
        modernRelevancePortuguese: 'Esta aliança moldou relações diplomáticas e culturais modernas entre Portugal e Grã-Bretanha, influenciando direito marítimo e acordos comerciais.',
        duration: '75 minutes'
      },
      {
        name: 'Greenwich Royal Observatory - Portuguese Navigation Legacy',
        namePortuguese: 'Observatório Real de Greenwich - Legado de Navegação Portuguesa',
        location: 'Greenwich Park, London SE10',
        connectionToPortugal: 'Displays Portuguese innovations in celestial navigation, astrolabe technology, and cartographic techniques that enabled global exploration.',
        connectionToPortugalPortuguese: 'Exibe inovações portuguesas em navegação celestial, tecnologia de astrolábio e técnicas cartográficas que possibilitaram a exploração global.',
        historicalPeriod: '1400s-1500s Navigation Revolution',
        discoveryStory: 'Portuguese navigators developed revolutionary techniques for determining latitude using the North Star and Southern Cross, enabling accurate ocean navigation.',
        discoveryStoryPortuguese: 'Navegadores portugueses desenvolveram técnicas revolucionárias para determinar latitude usando a Estrela Polar e Cruzeiro do Sul, possibilitando navegação oceânica precisa.',
        modernRelevance: 'Portuguese navigation methods directly influenced the establishment of the Greenwich Prime Meridian and modern GPS technology.',
        modernRelevancePortuguese: 'Métodos de navegação portugueses influenciaram diretamente o estabelecimento do Meridiano Principal de Greenwich e tecnologia GPS moderna.',
        duration: '60 minutes'
      },
      {
        name: 'Thames - Historic Portuguese Trading Route',
        namePortuguese: 'Tâmisa - Rota Comercial Histórica Portuguesa',
        location: 'Thames River, Central London',
        connectionToPortugal: 'The Thames served as the endpoint for Portuguese spice trade routes, connecting London to Portuguese trading posts in India, China, and Brazil.',
        connectionToPortugalPortuguese: 'O Tâmisa serviu como ponto final para rotas comerciais portuguesas de especiarias, conectando Londres a postos comerciais portugueses na Índia, China e Brasil.',
        historicalPeriod: '1500s-1700s Global Trade Era',
        discoveryStory: 'Portuguese ships regularly arrived in London carrying exotic spices, silks, and precious goods from Portuguese colonies, establishing London as a global trading hub.',
        discoveryStoryPortuguese: 'Navios portugueses chegavam regularmente a Londres carregando especiarias exóticas, sedas e bens preciosos das colónias portuguesas, estabelecendo Londres como centro comercial global.',
        modernRelevance: 'This trade relationship laid the foundation for London\'s position as a global financial center and established lasting economic ties with Portuguese-speaking nations.',
        modernRelevancePortuguese: 'Esta relação comercial estabeleceu a base para a posição de Londres como centro financeiro global e estabeleceu laços económicos duradouros com nações lusófonas.',
        duration: '45 minutes'
      }
    ],
    historicalContext: 'Portugal\'s Age of Discoveries (1415-1600) fundamentally changed world history, establishing the first global empire and creating maritime technologies and trade routes that connected continents. London benefited enormously from these Portuguese innovations and partnerships.',
    historicalContextPortuguese: 'A Era dos Descobrimentos de Portugal (1415-1600) mudou fundamentalmente a história mundial, estabelecendo o primeiro império global e criando tecnologias marítimas e rotas comerciais que conectaram continentes. Londres beneficiou enormemente destas inovações e parcerias portuguesas.',
    educationalOutcomes: [
      'Understanding of Portuguese innovations in navigation and cartography',
      'Knowledge of how Portuguese discoveries shaped global trade',
      'Appreciation for Portuguese-British historical connections',
      'Insight into the foundations of modern maritime technology',
      'Understanding of cultural exchange during the Age of Discoveries'
    ],
    educationalOutcomesPortuguese: [
      'Compreensão das inovações portuguesas em navegação e cartografia',
      'Conhecimento de como as descobertas portuguesas moldaram o comércio global',
      'Apreciação das conexões históricas luso-britânicas',
      'Insight sobre as fundações da tecnologia marítima moderna',
      'Compreensão do intercâmbio cultural durante a Era dos Descobrimentos'
    ],
    includes: [
      'Expert maritime historian guide specializing in Portuguese exploration',
      'Private access to Portuguese artifacts at National Maritime Museum',
      'Detailed Portuguese exploration maps and navigation tools demonstration',
      'Traditional Portuguese maritime lunch with historical context',
      'Comprehensive educational materials and Portuguese discovery timeline'
    ],
    includesPortuguese: [
      'Guia historiador marítimo especialista em exploração portuguesa',
      'Acesso privado a artefatos portugueses no Museu Marítimo Nacional',
      'Demonstração detalhada de mapas de exploração portuguesa e ferramentas de navegação',
      'Almoço marítimo português tradicional com contexto histórico',
      'Materiais educativos abrangentes e cronologia das descobertas portuguesas'
    ],
    culturalConnections: [
      'Modern Portuguese community maritime traditions',
      'Portuguese navigation techniques still used today',
      'Contemporary Portuguese maritime industries',
      'Portuguese influence on British maritime law',
      'Ongoing cultural exchange between Portugal and Britain'
    ],
    culturalConnectionsPortuguese: [
      'Tradições marítimas modernas da comunidade portuguesa',
      'Técnicas de navegação portuguesas ainda usadas hoje',
      'Indústrias marítimas portuguesas contemporâneas',
      'Influência portuguesa no direito marítimo britânico',
      'Intercâmbio cultural contínuo entre Portugal e Grã-Bretanha'
    ]
  },
  {
    id: 'portuguese-cultural-exchange-london',
    name: 'Portuguese Cultural Exchange: How Discoveries Shaped London',
    namePortuguese: 'Intercâmbio Cultural Português: Como as Descobertas Moldaram Londres',
    description: 'Discover how Portuguese exploration brought global cultures to London, creating the cosmopolitan city we know today through spices, art, architecture, and cultural traditions.',
    descriptionPortuguese: 'Descubra como a exploração portuguesa trouxe culturas globais para Londres, criando a cidade cosmopolita que conhecemos hoje através de especiarias, arte, arquitetura e tradições culturais.',
    duration: '5 hours',
    price: 165,
    theme: 'cultural-exchange',
    educationalLevel: 'family',
    landmarks: [
      {
        name: 'Victoria & Albert Museum - Portuguese Global Art Collection',
        namePortuguese: 'Museu Victoria & Albert - Coleção de Arte Global Portuguesa',
        location: 'South Kensington, London SW7',
        connectionToPortugal: 'Houses extraordinary collection of artifacts from Portuguese colonies, showcasing how Portuguese explorers brought Asian, African, and American art to Europe.',
        connectionToPortugalPortuguese: 'Abriga coleção extraordinária de artefatos das colónias portuguesas, mostrando como exploradores portugueses trouxeram arte asiática, africana e americana para a Europa.',
        historicalPeriod: '1500s-1800s Global Cultural Exchange',
        discoveryStory: 'Portuguese traders and explorers collected and brought to Europe the finest examples of Asian ceramics, African textiles, and American indigenous art, creating the first global art collection.',
        discoveryStoryPortuguese: 'Comerciantes e exploradores portugueses coletaram e trouxeram para a Europa os melhores exemplos de cerâmicas asiáticas, têxteis africanos e arte indígena americana, criando a primeira coleção de arte global.',
        modernRelevance: 'This cultural exchange established London as a global arts center and created the foundation for modern multicultural museums and cultural appreciation.',
        modernRelevancePortuguese: 'Este intercâmbio cultural estabeleceu Londres como centro global das artes e criou a base para museus multiculturais modernos e apreciação cultural.',
        duration: '90 minutes'
      },
      {
        name: 'British Museum - Portuguese Global Discovery Collection',
        namePortuguese: 'Museu Britânico - Coleção de Descobertas Globais Portuguesas',
        location: 'Great Russell Street, London WC1',
        connectionToPortugal: 'Contains artifacts and cultural treasures that Portuguese explorers discovered and documented from around the world, many acquired through Portuguese trade networks.',
        connectionToPortugalPortuguese: 'Contém artefatos e tesouros culturais que exploradores portugueses descobriram e documentaram de todo o mundo, muitos adquiridos através de redes comerciais portuguesas.',
        historicalPeriod: '1400s-1700s Age of Global Discovery',
        discoveryStory: 'Portuguese expeditions systematically documented and preserved cultural artifacts from previously unknown civilizations, creating the first global cultural archive.',
        discoveryStoryPortuguese: 'Expedições portuguesas documentaram e preservaram sistematicamente artefatos culturais de civilizações anteriormente desconhecidas, criando o primeiro arquivo cultural global.',
        modernRelevance: 'This systematic approach to cultural documentation established modern anthropological and archaeological methods still used today.',
        modernRelevancePortuguese: 'Esta abordagem sistemática à documentação cultural estabeleceu métodos antropológicos e arqueológicos modernos ainda usados hoje.',
        duration: '75 minutes'
      },
      {
        name: 'Leadenhall Market - Historic Portuguese Spice Trading Center',
        namePortuguese: 'Mercado Leadenhall - Centro Histórico de Comércio de Especiarias Português',
        location: 'Gracechurch Street, London EC3',
        connectionToPortugal: 'Historic site where Portuguese spices, exotic foods, and global products first arrived in London, transforming British cuisine and culture forever.',
        connectionToPortugalPortuguese: 'Local histórico onde especiarias portuguesas, comidas exóticas e produtos globais chegaram primeiro a Londres, transformando para sempre a culinária e cultura britânica.',
        historicalPeriod: '1500s-1700s Global Food Revolution',
        discoveryStory: 'Portuguese ships brought previously unknown spices like cinnamon, cardamom, and black pepper to London, along with new foods like tomatoes, potatoes, and chocolate.',
        discoveryStoryPortuguese: 'Navios portugueses trouxeram especiarias anteriormente desconhecidas como canela, cardamomo e pimenta preta para Londres, junto com novos alimentos como tomates, batatas e chocolate.',
        modernRelevance: 'This culinary revolution created the foundation for London\'s modern multicultural food scene and global cuisine appreciation.',
        modernRelevancePortuguese: 'Esta revolução culinária criou a base para a cena gastronómica multicultural moderna de Londres e apreciação da culinária global.',
        duration: '45 minutes'
      },
      {
        name: 'St. Katherine Docks - Portuguese Maritime Trading Legacy',
        namePortuguese: 'Docas de St. Katherine - Legado Comercial Marítimo Português',
        location: 'St. Katherine\'s Way, London E1W',
        connectionToPortugal: 'Historic docks where Portuguese trading ships arrived with goods from Portuguese colonies, establishing London as the northern European center for global trade.',
        connectionToPortugalPortuguese: 'Docas históricas onde navios comerciais portugueses chegavam com bens das colónias portuguesas, estabelecendo Londres como centro do norte europeu para comércio global.',
        historicalPeriod: '1600s-1800s Global Trading Era',
        discoveryStory: 'These docks received regular shipments of Brazilian sugar, Indian textiles, Chinese porcelain, and African ivory, all brought by Portuguese trading networks.',
        discoveryStoryPortuguese: 'Estas docas recebiam carregamentos regulares de açúcar brasileiro, têxteis indianos, porcelana chinesa e marfim africano, tudo trazido por redes comerciais portuguesas.',
        modernRelevance: 'This established London\'s role as a global financial and trading center, directly leading to its modern position in international commerce.',
        modernRelevancePortuguese: 'Isto estabeleceu o papel de Londres como centro financeiro e comercial global, levando diretamente à sua posição moderna no comércio internacional.',
        duration: '60 minutes'
      }
    ],
    historicalContext: 'Portuguese discoveries didn\'t just map the world - they brought the world to Europe. Through Portuguese trade networks, London became the first truly global city, experiencing cultures, foods, arts, and ideas from every continent.',
    historicalContextPortuguese: 'As descobertas portuguesas não apenas mapearam o mundo - trouxeram o mundo para a Europa. Através das redes comerciais portuguesas, Londres tornou-se a primeira cidade verdadeiramente global, experimentando culturas, comidas, artes e ideias de todos os continentes.',
    educationalOutcomes: [
      'Understanding how Portuguese discoveries created global cultural exchange',
      'Knowledge of how exotic foods and spices transformed European cuisine',
      'Appreciation for Portuguese role in creating multicultural London',
      'Insight into the origins of global trade and cultural appreciation',
      'Understanding of how exploration created modern cosmopolitan cities'
    ],
    educationalOutcomesPortuguese: [
      'Compreensão de como as descobertas portuguesas criaram intercâmbio cultural global',
      'Conhecimento de como comidas exóticas e especiarias transformaram a culinária europeia',
      'Apreciação pelo papel português na criação da Londres multicultural',
      'Insight sobre as origens do comércio global e apreciação cultural',
      'Compreensão de como a exploração criou cidades cosmopolitas modernas'
    ],
    includes: [
      'Cultural historian specializing in Portuguese global impact',
      'Traditional Portuguese spice tasting and global food experience',
      'Hands-on exploration of Portuguese navigation and mapping tools',
      'Portuguese discovery artifacts examination and handling',
      'Portuguese-inspired global cuisine lunch with historical context'
    ],
    includesPortuguese: [
      'Historiador cultural especializado no impacto global português',
      'Prova tradicional de especiarias portuguesas e experiência gastronómica global',
      'Exploração prática de ferramentas de navegação e mapeamento portuguesas',
      'Exame e manuseio de artefatos das descobertas portuguesas',
      'Almoço de culinária global inspirada em Portugal com contexto histórico'
    ],
    culturalConnections: [
      'Modern Portuguese community contributions to London\'s cultural diversity',
      'Contemporary global food and cultural trends with Portuguese origins',
      'Modern navigation and GPS technology based on Portuguese innovations',
      'Current Portuguese cultural institutions preserving discovery heritage',
      'Ongoing influence of Portuguese exploration on global cultural exchange'
    ],
    culturalConnectionsPortuguese: [
      'Contribuições modernas da comunidade portuguesa para a diversidade cultural de Londres',
      'Tendências globais gastronómicas e culturais contemporâneas com origens portuguesas',
      'Tecnologia moderna de navegação e GPS baseada em inovações portuguesas',
      'Instituições culturais portuguesas atuais preservando o património das descobertas',
      'Influência contínua da exploração portuguesa no intercâmbio cultural global'
    ]
  }
]

interface AgeOfDiscoveryToursProps {
  isPortuguese: boolean
  onBookTour: (tourId: string) => void
}

export default function AgeOfDiscoveryTours({ isPortuguese, onBookTour }: AgeOfDiscoveryToursProps) {
  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case 'maritime':
        return Ship
      case 'exploration':
        return Compass
      case 'trade':
        return Crown
      case 'navigation':
        return Telescope
      case 'cultural-exchange':
        return GlobeAltIcon
      default:
        return Map
    }
  }

  const getThemeColor = (theme: string) => {
    switch (theme) {
      case 'maritime':
        return 'primary'
      case 'exploration':
        return 'secondary'
      case 'trade':
        return 'accent'
      case 'navigation':
        return 'premium'
      case 'cultural-exchange':
        return 'coral'
      default:
        return 'gray'
    }
  }

  const getEducationalIcon = (level: string) => {
    switch (level) {
      case 'family':
        return StarIcon
      case 'academic':
        return AcademicCapIcon
      case 'professional':
        return BookOpenIcon
      default:
        return AcademicCapIcon
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-white via-primary-50/20 to-secondary-50/20">
      <div className="container-width">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-primary-100 via-secondary-50 to-accent-100 border border-primary-200">
              <Compass className="w-4 h-4 mr-2" />
              {isPortuguese ? 'Era dos Descobrimentos Portugueses' : 'Portuguese Age of Discoveries'}
            </span>
          </motion.div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            {isPortuguese ? 'Tours da Era dos Descobrimentos' : 'Age of Discovery Tours'}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {isPortuguese 
              ? 'Descubra como os exploradores portugueses mudaram para sempre o mundo, criando as primeiras conexões globais e trazendo culturas distantes para Londres através de inovações revolucionárias em navegação e comércio'
              : 'Discover how Portuguese explorers forever changed the world, creating the first global connections and bringing distant cultures to London through revolutionary innovations in navigation and trade'
            }
          </p>
        </div>

        <div className="space-y-16">
          {ageOfDiscoveryTours.map((tour, tourIndex) => {
            const ThemeIcon = getThemeIcon(tour.theme)
            const EducationalIcon = getEducationalIcon(tour.educationalLevel)
            const colorClass = getThemeColor(tour.theme)
            
            return (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: tourIndex * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
              >
                {/* Tour Header */}
                <div className={`bg-gradient-to-r ${colorClass === 'primary' ? 'from-primary-50 to-primary-100/50' : colorClass === 'secondary' ? 'from-secondary-50 to-secondary-100/50' : colorClass === 'accent' ? 'from-accent-50 to-accent-100/50' : colorClass === 'premium' ? 'from-premium-50 to-premium-100/50' : 'from-coral-50 to-coral-100/50'} p-8`}>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 ${colorClass === 'primary' ? 'bg-primary-500' : colorClass === 'secondary' ? 'bg-secondary-500' : colorClass === 'accent' ? 'bg-accent-500' : colorClass === 'premium' ? 'bg-premium-500' : 'bg-coral-500'} rounded-xl flex items-center justify-center`}>
                          <ThemeIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className={`text-xs font-medium ${colorClass === 'primary' ? 'text-primary-600' : colorClass === 'secondary' ? 'text-secondary-600' : colorClass === 'accent' ? 'text-accent-600' : colorClass === 'premium' ? 'text-premium-600' : 'text-coral-600'} uppercase tracking-wide`}>
                              {tour.theme} • {tour.duration}
                            </span>
                            <div className={`flex items-center gap-1 px-2 py-1 ${colorClass === 'primary' ? 'bg-primary-100 text-primary-700' : colorClass === 'secondary' ? 'bg-secondary-100 text-secondary-700' : colorClass === 'accent' ? 'bg-accent-100 text-accent-700' : colorClass === 'premium' ? 'bg-premium-100 text-premium-700' : 'bg-coral-100 text-coral-700'} rounded-full text-xs`}>
                              <EducationalIcon className="w-3 h-3" />
                              {tour.educationalLevel}
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            {isPortuguese ? tour.namePortuguese : tour.name}
                          </h3>
                        </div>
                      </div>
                      <p className="text-gray-700 text-lg mb-4">
                        {isPortuguese ? tour.descriptionPortuguese : tour.description}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>{tour.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-lg text-gray-900">{isPortuguese ? 'a partir de' : 'from'} £{tour.price}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center lg:text-right">
                      <button
                        onClick={() => onBookTour(tour.id)}
                        className={`${colorClass === 'primary' ? 'bg-primary-600 hover:bg-primary-700' : colorClass === 'secondary' ? 'bg-secondary-600 hover:bg-secondary-700' : colorClass === 'accent' ? 'bg-accent-600 hover:bg-accent-700' : colorClass === 'premium' ? 'bg-premium-600 hover:bg-premium-700' : 'bg-coral-600 hover:bg-coral-700'} text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg`}
                      >
                        {isPortuguese ? 'Reservar Tour' : 'Book Tour'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tour Content */}
                <div className="p-8">
                  {/* Historical Context */}
                  <div className="mb-8 bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      {isPortuguese ? 'Contexto Histórico' : 'Historical Context'}
                    </h4>
                    <p className="text-gray-700">
                      {isPortuguese ? tour.historicalContextPortuguese : tour.historicalContext}
                    </p>
                  </div>

                  {/* Discovery Landmarks */}
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-gray-900 mb-6">
                      {isPortuguese ? 'Marcos das Descobertas' : 'Discovery Landmarks'}
                    </h4>
                    <div className="space-y-6">
                      {tour.landmarks.map((landmark, landmarkIndex) => (
                        <div key={landmarkIndex} className="bg-gray-50 rounded-xl p-6">
                          <div className="flex gap-4">
                            <div className="flex-shrink-0">
                              <div className={`w-10 h-10 ${colorClass === 'primary' ? 'bg-primary-100' : colorClass === 'secondary' ? 'bg-secondary-100' : colorClass === 'accent' ? 'bg-accent-100' : colorClass === 'premium' ? 'bg-premium-100' : 'bg-coral-100'} rounded-lg flex items-center justify-center`}>
                                <Map className={`w-5 h-5 ${colorClass === 'primary' ? 'text-primary-600' : colorClass === 'secondary' ? 'text-secondary-600' : colorClass === 'accent' ? 'text-accent-600' : colorClass === 'premium' ? 'text-premium-600' : 'text-coral-600'}`} />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                <h5 className="font-semibold text-gray-900">
                                  {isPortuguese ? landmark.namePortuguese : landmark.name}
                                </h5>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <ClockIcon className="w-4 h-4" />
                                    {landmark.duration}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPinIcon className="w-4 h-4" />
                                    {landmark.location}
                                  </span>
                                </div>
                              </div>
                              <p className="text-gray-700 text-sm mb-3">
                                {isPortuguese ? landmark.connectionToPortugalPortuguese : landmark.connectionToPortugal}
                              </p>
                              <div className={`bg-${colorClass}-50 rounded-lg p-3 mb-3`}>
                                <h6 className={`font-medium ${colorClass === 'primary' ? 'text-primary-800' : colorClass === 'secondary' ? 'text-secondary-800' : colorClass === 'accent' ? 'text-accent-800' : colorClass === 'premium' ? 'text-premium-800' : 'text-coral-800'} text-sm mb-1`}>
                                  {landmark.historicalPeriod}
                                </h6>
                                <p className={`${colorClass === 'primary' ? 'text-primary-700' : colorClass === 'secondary' ? 'text-secondary-700' : colorClass === 'accent' ? 'text-accent-700' : colorClass === 'premium' ? 'text-premium-700' : 'text-coral-700'} text-xs`}>
                                  {isPortuguese ? landmark.discoveryStoryPortuguese : landmark.discoveryStory}
                                </p>
                              </div>
                              <p className="text-gray-600 text-xs">
                                <strong>{isPortuguese ? 'Relevância Moderna: ' : 'Modern Relevance: '}</strong>
                                {isPortuguese ? landmark.modernRelevancePortuguese : landmark.modernRelevance}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Educational Outcomes */}
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">
                      {isPortuguese ? 'Resultados Educacionais' : 'Educational Outcomes'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(isPortuguese ? tour.educationalOutcomesPortuguese : tour.educationalOutcomes).map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <AcademicCapIcon className={`w-5 h-5 ${colorClass === 'primary' ? 'text-primary-500' : colorClass === 'secondary' ? 'text-secondary-500' : colorClass === 'accent' ? 'text-accent-500' : colorClass === 'premium' ? 'text-premium-500' : 'text-coral-500'} mt-0.5 flex-shrink-0`} />
                          <span className="text-gray-700">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What's Included */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4">
                      {isPortuguese ? 'O Que Está Incluído' : 'What\'s Included'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(isPortuguese ? tour.includesPortuguese : tour.includes).map((include, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Anchor className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{include}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 via-secondary-50 to-accent-50 rounded-2xl p-8 border border-primary-200">
            <Compass className="w-16 h-16 mx-auto mb-4 text-primary-500" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Tour Personalizado da Era dos Descobrimentos' : 'Custom Age of Discovery Tour'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {isPortuguese 
                ? 'Criamos tours personalizados focados em aspectos específicos das descobertas portuguesas - navegação, comércio, intercâmbio cultural, ou conexões familiares com a história marítima portuguesa.'
                : 'We create custom tours focused on specific aspects of Portuguese discoveries - navigation, trade, cultural exchange, or family connections to Portuguese maritime history.'
              }
            </p>
            <button
              onClick={() => onBookTour('custom-discovery')}
              className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {isPortuguese ? 'Criar Tour Personalizado' : 'Create Custom Tour'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}