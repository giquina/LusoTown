'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { HeartIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { getImageWithFallback } from '@/lib/profileImages'

interface SuccessStory {
  id: string
  name: string
  age: number
  location: string
  profileImage: string
  friendImage: string
  friendName: string
  story: string
  connectionType: string
  timeframe: string
  activities: string[]
  category?: string
  portuguese_quote?: string
  english_translation?: string
  cultural_bond?: string
}

const successStories: SuccessStory[] = [
  // Found Love Stories
  {
    id: 'love-1',
    name: 'Ana Catarina',
    age: 28,
    location: 'Stockwell, London',
    profileImage: getImageWithFallback('ana-catarina'),
    friendImage: getImageWithFallback('ricardo-manuel'),
    friendName: 'Ricardo Manuel',
    story: 'Moved from Porto to London for banking, but the city felt frio like winter rain. Ricardo appeared at LusoTown\'s Santos Populares event in Vauxhall Park - um rapaz from Braga with the same saudade for home. "Sentes falta do cheiro das sardinhas na fogueira?" he asked, offering grilled sardines. Six months later, we\'re planning nossa festa de noivado at The Portuguese Centre. From primeiro encontro over Super Bock to sharing apartamento in Stockwell, amor grew like manjericão in Portuguese sunshine. Now we cook francesinha on Sundays, planning Portuguese wedding with fado and London guests.',
    connectionType: 'Saudade Sweethearts',
    timeframe: '18 months ago',
    activities: ['Portuguese cultural events', 'Cooking traditional meals', 'London wedding planning', 'Weekend market trips'],
    category: 'Found Love',
    portuguese_quote: '"Encontrei não só o amor, mas alguém que entende a minha alma portuguesa."',
    english_translation: '"I found not just love, but someone who understands my Portuguese soul."',
    cultural_bond: 'Santos Populares celebration and shared nostalgia for northern Portugal traditions'
  },
  {
    id: 'love-2',
    name: 'Diogo Fernandes',
    age: 32,
    location: 'Bermondsey, London',
    profileImage: getImageWithFallback('diogo-fernandes'),
    friendImage: getImageWithFallback('sofia-lopes'),
    friendName: 'Sofia Lopes',
    story: 'From Aveiro\'s canals to London\'s Thames, carrying boat-building skills and fisherman\'s heart. Sofia caught meu olhar at LusoTown\'s professional networking event near London Bridge - uma advogada from Setúbal with law books and saudade for Atlantic beaches. "Também sonhas com o mar?" she asked, noticing meu oceano ring. Over bacalhau à Brás at Taberna Real, we shared stories of growing up pelo mar, missing salt air while building London careers. Now every Saturday, we take train to Brighton, collecting shells and planning return to Portugal someday, together.',
    connectionType: 'Atlantic Hearts',
    timeframe: '2 years ago', 
    activities: ['Weekend coastal trips', 'Portuguese cooking', 'Career planning', 'Ocean photography'],
    category: 'Found Love',
    portuguese_quote: '"O mar trouxe-nos juntos em Londres, longe das nossas praias."',
    english_translation: '"The sea brought us together in London, far from our beaches."',
    cultural_bond: 'Shared connection to Portuguese coastal heritage and Atlantic traditions'
  },

  // Business Partnership Stories
  {
    id: 'business-1',
    name: 'Mariana Santos',
    age: 35,
    location: 'Canary Wharf, London',
    profileImage: getImageWithFallback('mariana-santos'),
    friendImage: getImageWithFallback('joao-pereira'),
    friendName: 'João Pereira',
    story: 'From Lisboa\'s Avenidas Novas to Canary Wharf towers, carrying MBA dreams and Portuguese determination. Met João at LusoTown\'s "Portuguese Professionals" breakfast in The Shard - um entrepreneur from Coimbra struggling with same cultural isolation in London\'s business world. "Precisamos de criar algo nosso," he said over galão coffee. Our FinTech startup "LusoLink" now connects 500+ Portuguese SMEs across Europe, securing £3.2M Series A funding. Every Friday, we celebrate wins with pastéis de nata from Borough Market, planning expansion while preserving Portuguese business values of família and confiança.',
    connectionType: 'Empreendedores Lusos',
    timeframe: '3 years ago',
    activities: ['FinTech development', 'European business expansion', 'Portuguese SME networking', 'Investment meetings'],
    category: 'Business Partners',
    portuguese_quote: '"Dois portugueses em Londres podem conquistar a Europa inteira."',
    english_translation: '"Two Portuguese in London can conquer all of Europe."',
    cultural_bond: 'Shared entrepreneurial spirit and Portuguese business ethics in global finance'
  },
  {
    id: 'business-2',
    name: 'Carlos Ribeiro',
    age: 41,
    location: 'East London',
    profileImage: getImageWithFallback('carlos-ribeiro'),
    friendImage: getImageWithFallback('ana-miguel'),
    friendName: 'Ana Miguel',
    story: 'From Porto\'s Rua de Santa Catarina to Brick Lane\'s markets, bringing chef skills and Portuguese flavors. Ana found me through LusoTown\'s "Food Entrepreneurs" meetup at Boxpark Shoreditch - uma food blogger from Madeira missing proper espetada in London. "Vamos mostrar aos ingleses o que é boa comida portuguesa," she challenged over poncha cocktails. Our food truck "Sabor Atlântico" now serves authentic Portuguese street food across London markets, from Camden to Greenwich. Featured in Time Out London, planning brick-and-mortar restaurant while teaching British palates the joy of bifana and francesinha.',
    connectionType: 'Sabores Partnership',
    timeframe: '2.5 years ago',
    activities: ['Food truck operations', 'London market circuits', 'Restaurant planning', 'Portuguese cooking classes'],
    category: 'Business Partners',
    portuguese_quote: '"A comida portuguesa une corações em qualquer cidade do mundo."',
    english_translation: '"Portuguese food unites hearts in any city in the world."',
    cultural_bond: 'Shared passion for authentic Portuguese cuisine and cultural preservation through food'
  },

  // Community Family Stories  
  {
    id: 'family-1',
    name: 'Isabel Rodrigues',
    age: 38,
    location: 'North London',
    profileImage: getImageWithFallback('isabel-rodrigues'),
    friendImage: getImageWithFallback('teresa-costa'),
    friendName: 'Teresa Costa',
    story: 'From Braga\'s ancient streets to Finchley\'s suburbs, raising três filhos while preserving Portuguese soul. Teresa joined our LusoTown "Mães Portuguesas" group at Hampstead Heath playground - uma mãe from Viseu facing same struggles teaching Portuguese to English-speaking children. "Os meus filhos estão a esquecer quem são," she worried, watching her daughter play. Together we created "Little Lusos London" - Saturday Portuguese school at Golders Green Community Centre. Now 120+ crianças learn Portuguese through stories, songs, and traditional games. Our children are proud of being Portuguese-British, speaking both languages with confidence.',
    connectionType: 'Mães Guerreiras',
    timeframe: '4 years ago',
    activities: ['Portuguese Saturday school', 'Cultural children\'s events', 'Language preservation', 'Community playground meetups'],
    category: 'Community Family',
    portuguese_quote: '"As nossas crianças não vão esquecer de onde vêm."',
    english_translation: '"Our children will not forget where they come from."',
    cultural_bond: 'Shared mission to preserve Portuguese language and culture in next generation'
  },
  {
    id: 'family-2', 
    name: 'Miguel Tavares',
    age: 45,
    location: 'South London',
    profileImage: getImageWithFallback('miguel-tavares'),
    friendImage: getImageWithFallback('antonio-silva'),
    friendName: 'António Silva',
    story: 'From Funchal\'s mountains to Clapham Common, missing Madeira\'s festa spirit and community warmth. António discovered me at LusoTown\'s "Pais Solteiros" support group at The Rose pub - um divorciado from Azores, both struggling with London\'s parenting isolation. "Onde estão os vizinhos que ajudam?" he asked, remembering island community support. We organized "Portuguese Fathers United" - monthly activities from Regent\'s Park football to Richmond Park picnics. Our children now have Portuguese godfather figures, learning that família extends beyond blood, creating Atlantic islands community in London concrete.',
    connectionType: 'Padrinhos Brotherhood',
    timeframe: '3 years ago', 
    activities: ['Single father support', 'Children\'s Portuguese activities', 'Community picnics', 'Island traditions'],
    category: 'Community Family',
    portuguese_quote: '"Em Londres, criámos a nossa própria aldeia portuguesa."',
    english_translation: '"In London, we created our own Portuguese village."',
    cultural_bond: 'Island community values and extended família traditions in urban London'
  },

  // Cultural Connection Stories
  {
    id: 'culture-1',
    name: 'Beatriz Oliveira',
    age: 26,
    location: 'Camden, London',
    profileImage: getImageWithFallback('beatriz-oliveira'),
    friendImage: getImageWithFallback('luciana-santos'),
    friendName: 'Luciana Santos',
    story: 'From São Paulo\'s Vila Madalena to Camden\'s markets, bringing Brazilian energy and Portuguese heritage through minha avó carioca. Luciana connected through LusoTown\'s "Lusophone Artists" network at Roundhouse venue - uma cantora from Mozambique mixing marrabenta with London sounds. "Vamos mostrar que lusofonia é música universal," she proposed over caipirinha at Camden market. Our collective "Vozes Atlânticas" performs monthly at Rich Mix, blending fado, samba, and African rhythms. BBC featured our "Portuguese Empire Sounds" concert, proving that língua portuguesa creates música that transcends borders.',
    connectionType: 'Lusophone Voices',
    timeframe: '2 years ago',
    activities: ['Multicultural music events', 'Portuguese language concerts', 'BBC radio appearances', 'Cultural education workshops'],
    category: 'Cultural Connection',
    portuguese_quote: '"A música portuguesa não tem fronteiras - do fado ao samba, somos um só povo."',
    english_translation: '"Portuguese music has no borders - from fado to samba, we are one people."',
    cultural_bond: 'Shared Lusophone musical heritage spanning continents and cultures'
  },
  {
    id: 'culture-2',
    name: 'Pedro Gonçalves',
    age: 30,
    location: 'Westminster, London',
    profileImage: getImageWithFallback('pedro-goncalves'),
    friendImage: getImageWithFallback('fatima-lopes'),
    friendName: 'Fátima Lopes',
    story: 'From Coimbra\'s university halls to Westminster\'s policy corridors, studying International Relations while feeling disconnected from Portuguese diaspora politics. Fátima joined LusoTown\'s "Political Engagement" group at St. Pancras Library - uma advogada from Luanda passionate about Portuguese-speaking communities\' representation. "Precisamos de voz política em Londres," she declared during EU referendum discussions. Together we founded "Lusophone London Voices" - advocacy group ensuring Portuguese speakers\' interests in Brexit negotiations and local councils. Now advising Mayor of London on Portuguese community needs, proving our voto counts in British democracy.',
    connectionType: 'Political Partnership',
    timeframe: '5 years ago',
    activities: ['Political advocacy', 'Community representation', 'Local council engagement', 'Policy research'],
    category: 'Cultural Connection',
    portuguese_quote: '"A nossa voz portuguesa faz diferença na democracia britânica."',
    english_translation: '"Our Portuguese voice makes a difference in British democracy."',
    cultural_bond: 'Shared commitment to Portuguese community political representation and civic engagement'
  },

  // Student Success Stories
  {
    id: 'student-1',
    name: 'Inês Ferreira',
    age: 22,
    location: 'King\'s Cross, London',
    profileImage: getImageWithFallback('ines-ferreira'),
    friendImage: getImageWithFallback('professor-manuel'),
    friendName: 'Prof. Manuel Sousa',
    story: 'From Aveiro\'s canals to King\'s College London, pursuing Medicine while missing Portuguese mentorship and guidance. Professor Sousa reached out through LusoTown\'s "Academic Mentorship" program - um cardiology professor from Porto teaching at Imperial College, understanding Erasmus student struggles. "A medicina em português tem alma diferente," he explained during our first café meeting at British Library. Under his mentorship, I\'m excelling in Medical School while researching Portuguese genetic factors in cardiac disease. Now helping organize "Future Portuguese Doctors UK" network, ensuring próxima geração maintains connection to Portuguese medical traditions.',
    connectionType: 'Medical Mentorship',
    timeframe: '3 years ago',
    activities: ['Medical school excellence', 'Research collaboration', 'Student mentorship program', 'Portuguese medical network'],
    category: 'Student Success',
    portuguese_quote: '"Um mentor português fez toda a diferença na minha carreira médica."',
    english_translation: '"A Portuguese mentor made all the difference in my medical career."',
    cultural_bond: 'Portuguese medical tradition and academic excellence across generations'
  },
  {
    id: 'student-2',
    name: 'Gonçalo Pereira',
    age: 24,
    location: 'Greenwich, London',
    profileImage: getImageWithFallback('goncalo-pereira'),
    friendImage: getImageWithFallback('dr-maria-silva'),
    friendName: 'Dr. Maria Silva',
    story: 'From Évora\'s ancient walls to Greenwich Maritime University, studying Naval Architecture while feeling lost in London\'s academic maze. Dr. Silva connected through LusoTown\'s "STEM Portuguese" group at Royal Observatory - uma aerospace engineer from Azores who conquered British academia despite language barriers. "O conhecimento português dos oceanos é único no mundo," she encouraged during Thames riverside walks. Her guidance helped me secure internship at Rolls-Royce Marine, researching sustainable shipping technology inspired by Portuguese discoveries. Now planning PhD funded by Portuguese Foundation for Science, proving navegadores\' spirit lives in modern Portuguese students.',
    connectionType: 'Engineering Excellence',
    timeframe: '2 years ago',
    activities: ['STEM mentorship', 'Research internships', 'PhD planning', 'Portuguese maritime history'],
    category: 'Student Success',
    portuguese_quote: '"Os descobrimentos portugueses continuam através da ciência moderna."',
    english_translation: '"Portuguese discoveries continue through modern science."',
    cultural_bond: 'Portuguese maritime heritage inspiring modern engineering and academic achievement'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export default function SuccessStories() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-secondary-200 rounded-full opacity-20 animate-pulse animation-delay-400"></div>
      </div>

      <div className="container-width section-padding relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-50/80 via-accent-50/80 to-coral-50/80 backdrop-blur-sm rounded-full px-6 py-3 text-secondary-600 font-bold mb-6 border border-secondary-200/40 shadow-lg">
            <SparklesIcon className="h-5 w-5 text-accent-600" />
            Portuguese Heritage Success Stories
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            From Saudade to{' '}
            <span className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">Alma Portuguesa Realizada</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Real Portuguese souls who transformed their London saudade into thriving community connections. From pastéis de nata meetups in Stockwell to fado nights in Camden - discover how nossa gente builds lasting bonds while preserving Portuguese heart in the city\'s rhythm.
          </p>
        </motion.div>

        {/* Success Stories Grid - Enhanced Multi-Column Responsive Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
        >
          {successStories.map((story) => (
            <motion.div
              key={story.id}
              variants={cardVariants}
              className="group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-7 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 h-full">
                {/* Category & Connection Type Badge */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {story.category && (
                    <div className="inline-flex items-center gap-1 bg-gradient-to-r from-secondary-100 to-accent-100 text-secondary-800 text-xs font-bold px-3 py-1 rounded-full border border-secondary-200">
                      <SparklesIcon className="h-3 w-3" />
                      {story.category}
                    </div>
                  )}
                  <div className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">
                    <HeartIcon className="h-3 w-3" />
                    {story.connectionType}
                  </div>
                </div>

                {/* Friend Photos */}
                <div className="flex items-center justify-center mb-6">
                  <div className="flex -space-x-6">
                    <motion.div 
                      whileHover={{ scale: 1.05, zIndex: 10 }}
                      className="relative"
                    >
                      <Image
                        src={story.profileImage}
              width={80} height={80}
                        alt={`${story.name} profile`}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                        loading="lazy"
                      />
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <HeartIcon className="h-3 w-3 text-white fill-current" />
                      </div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05, zIndex: 10 }}
                      className="relative"
                    >
                      <Image
                        src={story.friendImage}
              width={80} height={80}
                        alt={`${story.friendName} profile`}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                        loading="lazy"
                      />
                      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-500 rounded-full border-2 border-white flex items-center justify-center">
                        <HeartIcon className="h-3 w-3 text-white fill-current" />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Names and Location */}
                <div className="text-center mb-4">
                  <h3 className="font-bold text-lg text-gray-900">
                    {story.name} & {story.friendName}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {story.age} • {story.location} • Friends for {story.timeframe}
                  </p>
                </div>

                {/* Story */}
                <blockquote className="text-gray-700 text-left italic mb-4 leading-relaxed text-sm">
                  "{story.story}"
                </blockquote>

                {/* Portuguese Quote with Translation */}
                {story.portuguese_quote && story.english_translation && (
                  <div className="bg-gradient-to-r from-secondary-50 via-accent-50 to-coral-50 p-4 rounded-xl border border-secondary-200 mb-4">
                    <blockquote className="text-secondary-800 font-medium text-center mb-2 text-sm">
                      {story.portuguese_quote}
                    </blockquote>
                    <p className="text-secondary-600 text-center text-xs italic">
                      {story.english_translation}
                    </p>
                  </div>
                )}

                {/* Cultural Bond */}
                {story.cultural_bond && (
                  <div className="bg-primary-50 p-3 rounded-lg border border-primary-200 mb-4">
                    <p className="text-primary-700 text-xs leading-relaxed">
                      <span className="font-semibold">Cultural Bond:</span> {story.cultural_bond}
                    </p>
                  </div>
                )}

                {/* Activities */}
                <div className="flex flex-wrap justify-center gap-2">
                  {story.activities.map((activity, index) => (
                    <span
                      key={index}
                      className="bg-secondary-100 text-secondary-700 text-xs px-3 py-1 rounded-full"
                    >
                      {activity}
                    </span>
                  ))}
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
          className="text-center mt-16"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your London Saudade Into Portuguese Success?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join 750+ almas portuguesas from Portugal, Brazil, Angola, Mozambique, Cape Verde & beyond who found their London community through real connections. From Borough Market food adventures to Vauxhall fado nights - your Portuguese community awaits at authentic London venues where nossa cultura thrives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/signup" 
              className="inline-flex items-center justify-center bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              JOIN NOW
            </a>
            <a 
              href="/case-studies" 
              className="inline-flex items-center justify-center bg-white text-secondary-600 hover:bg-gray-50 border-2 border-secondary-200 hover:border-secondary-300 font-bold text-lg px-10 py-4 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
            >
              Read Detailed Case Studies
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}