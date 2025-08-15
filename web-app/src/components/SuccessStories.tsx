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
}

const successStories: SuccessStory[] = [
  {
    id: '1',
    name: 'Sofia Silva',
    age: 34,
    location: 'Stockwell, London',
    profileImage: getImageWithFallback('sarah-chen'),
    friendImage: getImageWithFallback('maya-patel'),
    friendName: 'Maria Santos',
    story: 'After moving from Porto, the saudade was overwhelming. I missed minha avó\'s pastéis de nata and Portuguese conversation. Then I found Maria at Casa do Bacalhau in Stockwell through LusoTown. Over francesinha and vinho verde, we discovered we both worked in fintech and felt the same cultural isolation. Together we started "Mulheres Portuguesas em Tech Londres" - now 80+ strong, meeting monthly at The Portuguese Café in Vauxhall for networking over bifanas and dreams of changing London\'s startup scene while preserving nossa cultura.',
    connectionType: 'Saudade Tech Sisters',
    timeframe: '1 year ago',
    activities: ['Portuguese fintech meetups', 'Bifana networking brunches', 'Cultural tech innovation', 'Saudade support circle']
  },
  {
    id: '2',
    name: 'Ana Ferreira',
    age: 31,
    location: 'South London',
    profileImage: getImageWithFallback('jessica-williams'),
    friendImage: getImageWithFallback('emma-johnson'),
    friendName: 'Beatriz Rodrigues',
    story: 'From Luanda to London, carrying semba rhythms in my heart and entrepreneurial fire in my soul. Beatriz and I met at Portuguese Cultural Centre in South Lambeth, both feeling the weight of representing nossa África Portuguesa in London\'s business world. Over canja de galinha and stories of our grandmothers\' strength, we birthed "Herança & Hustle" - celebrating Angolan-Portuguese business heritage. Now 200+ CPLP entrepreneurs strong, we meet monthly at Elephant & Castle\'s Portuguese Heart restaurant, raising £2M while keeping our ancestors\' entrepreneurial spirit alive.',
    connectionType: 'África Portuguesa Power',
    timeframe: '8 months ago',
    activities: ['CPLP startup funding', 'Semba networking nights', 'Ancestral business wisdom', 'African-Portuguese heritage ventures']
  },
  {
    id: '3',
    name: 'Carla Mendes',
    age: 29,
    location: 'Camden, London',
    profileImage: getImageWithFallback('priya-sharma'),
    friendImage: getImageWithFallback('lisa-thompson'),
    friendName: 'Lucia Tavares',
    story: 'Vim de São Paulo with bossa nova dreams and saudade for creative community. London\'s creative scene felt cold until I met Lucia at a fado night in Little Portugal, Camden. She, uma moçambicana with marrabenta soul, understood my imposter syndrome - we were both fighting to bring Lusophone warmth to London\'s creative coldness. Over pastéis de nata at Gail\'s in Camden Market, we dreamed up "Coração Criativo" - our award-winning agency celebrating African-Brazilian-Portuguese storytelling. Now we work from Casa do Fado café, mixing capulana patterns with Brazilian colors, winning London Cultural Diversity Award 2024 while keeping nossa alma criativa alive.',
    connectionType: 'Coração Criativo Collective',
    timeframe: '10 months ago',
    activities: ['Lusophone creative agency', 'Fado & bossa inspiration sessions', 'Marrabenta design workshops', 'Saudade storytelling']
  },
  {
    id: '4',
    name: 'Inês Costa',
    age: 32,
    location: 'East London',
    profileImage: getImageWithFallback('ava-davis'),
    friendImage: getImageWithFallback('community-4'),
    friendName: 'Raquel Pereira',
    story: 'From Coimbra\'s ancient stones to Imperial College\'s laboratories, carrying minha avó\'s herbal wisdom in my scientist\'s heart. The loneliness of academia hit hard until I met Raquel, uma cabo-verdiana médica, at Portuguese Sunday mass in Bermondsey. Over caldeirada verde and stories of our islands\' healing traditions, we discovered our shared mission - proving que nossa medicina ancestral belongs in modern healthcare. Our research combining Cape Verdean plant medicine with Portuguese traditional healing is now published in Nature, celebrated by Portuguese Embassy as "Orgulho da Diáspora," and studied worldwide. We meet monthly at Tasca do Chico near Brick Lane, where grogue and ginjinha fuel our revolutionary academic dreams.',
    connectionType: 'Medicina da Alma Network',
    timeframe: '1.5 years ago',
    activities: ['Ancestral medicine research', 'Grogue & ginjinha study sessions', 'Embassy diaspora celebrations', 'Island healing wisdom']
  },
  {
    id: '5',
    name: 'Miguel Oliveira',
    age: 35,
    location: 'West London',
    profileImage: getImageWithFallback('community-5'),
    friendImage: getImageWithFallback('community-6'),
    friendName: 'João Ribeiro',
    story: 'From Madeira\'s volcanic fields where I learned futebol from meu pai, to London\'s finance towers where I found success but lost minha alma portuguesa. Weekend matches at Regent\'s Park felt empty until I met João through LusoTown - um verdadeiro craque from Funchal sharing the same saudade for home. Our Sunday football evolved into "Golo & Crescimento" - mentoring young Portuguese men while teaching them que nossa força comes from both feet and coração. We meet every Saturday at The Portuguese Tavern in Notting Hill for planning over Super Bock, then train on Hampstead Heath fields. 100+ rapazes later, 85% promoted in their careers, all carrying Portuguese pride. Como dizemos: "Futebol cura saudade, brotherhood builds future."',
    connectionType: 'Golo & Coração Brotherhood',
    timeframe: '2 years ago',
    activities: ['Portuguese football mentorship', 'Super Bock strategy sessions', 'Hampstead Heath training', 'Saudade healing through sport']
  },
  {
    id: '6',
    name: 'Teresa Almeida',
    age: 40,
    location: 'North London',
    profileImage: getImageWithFallback('community-7'),
    friendImage: getImageWithFallback('community-8'),
    friendName: 'Helena Sousa',
    story: 'From Braga with heart full of mothers\' wisdom and pockets full of dreams for meus filhos in London. The playground isolation was crushing - British mums were lovely but didn\'t understand the weight of raising Portuguese souls in English soil. Then Helena, uma mãe guerreira from Viseu, sat beside me at Primrose Hill playground, both watching our children speak English while we whispered Portuguese prayers. Over coffee at Portuguese Deli in Camden Town, sharing stories of our mothers\' strength and fears about losing nossa língua, we birthed "Mães Portuguesas de Londres." Now 300+ families strong, meeting at St. Pancras Portuguese Community Centre every Sunday after mass, teaching children fado songs between English homework, preserving receitas da avó while navigating British schools. RTP featured our work, and Camden Council funds our "Portuguese Roots, London Wings" program.',
    connectionType: 'Mães Guerreiras Network',
    timeframe: '3 years ago',
    activities: ['Portuguese family preservation', 'Fado children\'s workshops', 'Avó recipe exchanges', 'Bilingual parenting support']
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
                {/* Connection Type Badge */}
                <div className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
                  <SparklesIcon className="h-3 w-3" />
                  {story.connectionType}
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
                <blockquote className="text-gray-700 text-center italic mb-6 leading-relaxed">
                  "{story.story}"
                </blockquote>

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
            Join 500+ almas portuguesas from Portugal, Brazil, Angola, Mozambique, Cape Verde & beyond who found their London family through real connections. From Borough Market food adventures to Vauxhall fado nights - your Portuguese community awaits at authentic London venues where nossa cultura thrives.
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