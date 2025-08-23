'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { HeartIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useHeritage } from '@/context/HeritageContext'
import { getImageWithFallback } from '@/lib/profileImages'
import { useMemo } from 'react'
import { ROUTES } from '@/config/routes'

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

// Generate dynamic success stories based on heritage context
function generateSuccessStories(heritage: any, geography: any): SuccessStory[] {
  const culturalEvents = Object.keys(heritage?.streaming?.contentCategories || {})
  const mainTradition = heritage?.culture?.traditions?.[0] || 'Cultural celebration'
  const culturalAreas = geography?.culturalAreas || geography?.diasporaHub?.culturalAreas || []
  const mainCountry = geography?.mainCountry?.name || 'Portugal'
  const diasporaCity = geography?.city || geography?.diasporaHub?.city || 'London'
  const foods = heritage?.culture?.foods || []
  const celebrations = heritage?.culture?.celebrations || []
  const music = heritage?.culture?.music || []

  return [
  // Found Love Stories
  {
    id: 'love-1',
    name: 'Ana Catarina',
    age: 28,
    location: 'Stockwell, London',
    profileImage: getImageWithFallback('ana-catarina'),
    friendImage: getImageWithFallback('ricardo-manuel'),
    friendName: 'Ricardo Manuel',
    story: `Moved from ${mainCountry} to ${diasporaCity} for banking, but the city felt cold like winter rain. Ricardo appeared at HeritageTown's ${mainTradition} event in ${culturalAreas[1] || 'Central'} - someone with the same longing for home. "Do you miss our traditional celebrations?" he asked, offering traditional food. Six months later, we're planning our engagement party at The Heritage Centre. From first meeting to sharing apartment in ${culturalAreas[0] || 'Central'}, love grew in the warmth of shared culture. Now we cook ${foods[0] || 'traditional dishes'} on Sundays, planning ${heritage.identity.name} wedding with ${music[0] || 'traditional music'} and ${diasporaCity} guests.`,
    connectionType: 'Heritage Sweethearts',
    timeframe: '18 months ago',
    activities: ['Portuguese cultural events', 'Cooking traditional meals', 'London wedding planning', 'Weekend market trips'],
    category: 'Found Love',
    portuguese_quote: '"Encontrei não só o amor, mas alguém que entende a minha alma portuguesa."',
    english_translation: '"I found not just love, but someone who understands my Portuguese soul."',
    cultural_bond: `${mainTradition} celebration and shared nostalgia for ${heritage.identity.name} traditions`
  },
  {
    id: 'love-2',
    name: 'Diogo Fernandes',
    age: 32,
    location: 'Bermondsey, London',
    profileImage: getImageWithFallback('diogo-fernandes'),
    friendImage: getImageWithFallback('sofia-lopes'),
    friendName: 'Sofia Lopes',
    story: `From ${heritage.geography.relatedCountries?.[0]?.name || mainCountry}'s coastal regions to ${diasporaCity}'s waterways, carrying traditional skills and cultural heart. Sofia caught my attention at HeritageTown's professional networking event near the city center - a lawyer with books and longing for home's landscapes. "Do you also dream of home's natural beauty?" she asked. Over ${foods[1] || 'traditional cuisine'} at a cultural restaurant, we shared stories of growing up in our homeland, missing familiar landscapes while building ${diasporaCity} careers. Now every weekend, we explore nearby nature, collecting memories and planning return to ${mainCountry} someday, together.`,
    connectionType: 'Heritage Hearts',
    timeframe: '2 years ago', 
    activities: ['Weekend coastal trips', 'Portuguese cooking', 'Career planning', 'Ocean photography'],
    category: 'Found Love',
    portuguese_quote: '"O mar trouxe-nos juntos em Londres, longe das nossas praias."',
    english_translation: '"The sea brought us together in London, far from our beaches."',
    cultural_bond: `Shared connection to ${heritage.identity.name} natural heritage and traditional landscapes`
  },

  // Business Partnership Story (keeping 1 of 2)
  {
    id: 'business-1',
    name: 'Carlos Ribeiro',
    age: 41,
    location: 'East London',
    profileImage: getImageWithFallback('carlos-ribeiro'),
    friendImage: getImageWithFallback('ana-miguel'),
    friendName: 'Ana Miguel',
    story: `From ${mainCountry}'s main commercial street to ${diasporaCity}'s food markets, bringing culinary skills and ${heritage.identity.name} flavors. Ana found me through HeritageTown's "Food Entrepreneurs" meetup - a food blogger missing authentic ${foods[2] || 'traditional cuisine'} in ${diasporaCity}. "Let's show locals what good ${heritage.identity.name} food is," she challenged over traditional cocktails. Our food truck "Heritage Flavors" now serves authentic ${heritage.identity.name} street food across ${diasporaCity} markets. Featured in local media, planning brick-and-mortar restaurant while teaching local palates the joy of ${foods[1] || 'traditional dishes'} and ${foods[0] || 'heritage cuisine'}.`,
    connectionType: 'Heritage Flavors Partnership',
    timeframe: '2.5 years ago',
    activities: ['Food truck operations', 'London market circuits', 'Restaurant planning', 'Portuguese cooking classes'],
    category: 'Business Partners',
    portuguese_quote: '"A comida portuguesa une corações em qualquer cidade do mundo."',
    english_translation: '"Portuguese food unites hearts in any city in the world."',
    cultural_bond: `Shared passion for authentic ${heritage.identity.name} cuisine and cultural preservation through food`
  },

  // Community Family Story (keeping 1 of 2)
  {
    id: 'family-1',
    name: 'Isabel Rodrigues',
    age: 38,
    location: 'North London',
    profileImage: getImageWithFallback('isabel-rodrigues'),
    friendImage: getImageWithFallback('teresa-costa'),
    friendName: 'Teresa Costa',
    story: `From ${mainCountry}'s historic districts to ${diasporaCity}'s suburbs, raising children while preserving ${heritage.identity.name} identity. Teresa joined our HeritageTown "Heritage Families" group at local playground - a parent facing same struggles teaching ${heritage.identity.defaultLanguage} to English-speaking children. "My children are forgetting who they are," she worried, watching her daughter play. Together we created "Little Heritage ${diasporaCity}" - Saturday ${heritage.identity.name} school at community centre. Now 120+ children learn ${heritage.identity.defaultLanguage} through stories, songs, and traditional games. Our children are proud of being ${heritage.identity.name}-British, speaking both languages with confidence.`,
    connectionType: 'Heritage Warriors',
    timeframe: '4 years ago',
    activities: ['Portuguese Saturday school', 'Cultural children\'s events', 'Language preservation', 'Community playground meetups'],
    category: 'Community Family',
    portuguese_quote: '"As nossas crianças não vão esquecer de onde vêm."',
    english_translation: '"Our children will not forget where they come from."',
    cultural_bond: `Shared mission to preserve ${heritage.identity.name} language and culture in next generation`
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
    story: `From ${heritage.geography.relatedCountries?.[0]?.name || mainCountry}'s cultural districts to ${diasporaCity}'s markets, bringing diverse energy and ${heritage.identity.name} heritage. Luciana connected through HeritageTown's "${heritage.identity.name} Artists" network at cultural venue - a performer mixing traditional sounds with ${diasporaCity} influences. "Let's show that our culture creates universal music," she proposed over traditional drinks. Our collective "Heritage Voices" performs monthly at cultural venues, blending ${music[0] || 'traditional music'}, modern beats, and international rhythms. BBC featured our "${heritage.identity.name} Cultural Sounds" concert, proving that ${heritage.identity.name} language creates music that transcends borders.`,
    connectionType: 'Heritage Voices',
    timeframe: '2 years ago',
    activities: ['Multicultural music events', 'Portuguese language concerts', 'BBC radio appearances', 'Cultural education workshops'],
    category: 'Cultural Connection',
    portuguese_quote: '"A música portuguesa não tem fronteiras - do fado ao samba, somos um só povo."',
    english_translation: '"Portuguese music has no borders - from fado to samba, we are one people."',
    cultural_bond: `Shared ${heritage.identity.name} musical heritage spanning continents and cultures`
  },
  {
    id: 'culture-2',
    name: 'Pedro Gonçalves',
    age: 30,
    location: 'Westminster, London',
    profileImage: getImageWithFallback('pedro-goncalves'),
    friendImage: getImageWithFallback('fatima-lopes'),
    friendName: 'Fátima Lopes',
    story: `From ${mainCountry}'s university halls to ${diasporaCity}'s policy corridors, studying International Relations while feeling disconnected from ${heritage.identity.name} diaspora politics. Fátima joined HeritageTown's "Political Engagement" group at local library - a lawyer passionate about ${heritage.identity.name}-speaking communities' representation. "We need political voice in ${diasporaCity}," she declared during policy discussions. Together we founded "Heritage ${diasporaCity} Voices" - advocacy group ensuring ${heritage.identity.name} speakers' interests in local and national politics. Now advising Mayor of ${diasporaCity} on ${heritage.identity.name} community needs, proving our voice counts in British democracy.`,
    connectionType: 'Heritage Political Partnership',
    timeframe: '5 years ago',
    activities: ['Political advocacy', 'Community representation', 'Local council engagement', 'Policy research'],
    category: 'Cultural Connection',
    portuguese_quote: '"A nossa voz portuguesa faz diferença na democracia britânica."',
    english_translation: '"Our Portuguese voice makes a difference in British democracy."',
    cultural_bond: `Shared commitment to ${heritage.identity.name} community political representation and civic engagement`
  },

  // Student Success Story (keeping 1 of 2)
  {
    id: 'student-1',
    name: 'Inês Ferreira',
    age: 22,
    location: 'King\'s Cross, London',
    profileImage: getImageWithFallback('ines-ferreira'),
    friendImage: getImageWithFallback('professor-manuel'),
    friendName: 'Prof. Manuel Sousa',
    story: `From ${mainCountry}'s academic cities to ${diasporaCity}'s universities, pursuing Medicine while missing ${heritage.identity.name} mentorship and guidance. Professor Sousa reached out through HeritageTown's "Academic Mentorship" program - a professor from ${mainCountry} teaching at local college, understanding international student struggles. "Medicine taught in ${heritage.identity.defaultLanguage} has different soul," he explained during our first meeting at library. Under his mentorship, I'm excelling in Medical School while researching ${heritage.identity.name} genetic factors in health. Now helping organize "Future ${heritage.identity.name} Doctors United Kingdom" network, ensuring next generation maintains connection to ${heritage.identity.name} medical traditions.`,
    connectionType: 'Heritage Medical Mentorship',
    timeframe: '3 years ago',
    activities: ['Medical school excellence', 'Research collaboration', 'Student mentorship program', 'Portuguese medical network'],
    category: 'Student Success',
    portuguese_quote: '"Um mentor português fez toda a diferença na minha carreira médica."',
    english_translation: '"A Portuguese mentor made all the difference in my medical career."',
    cultural_bond: `${heritage.identity.name} medical tradition and academic excellence across generations`
  }
  ]
}

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
  const { t, language } = useLanguage()
  const { heritage } = useHeritage()
  
  const successStories = useMemo(() => 
    generateSuccessStories(heritage, heritage.geography.diasporaHub),
    [heritage]
  )
  
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
            {heritage.identity.name} Heritage Success Stories
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            From Longing to{' '}
            <span className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 bg-clip-text text-transparent">{heritage.identity.name} Dreams Realized</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Real {heritage.identity.name} souls who transformed their {heritage.geography.diasporaHub.city} longing into thriving community connections. From {heritage.culture.foods[0] || 'traditional food'} meetups in {heritage.geography.diasporaHub.culturalAreas[0] || 'cultural districts'} to {heritage.culture.music[0] || 'traditional music'} nights in cultural venues - discover how our people build lasting bonds while preserving {heritage.identity.name} heart in the city's rhythm.
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

                {/* Heritage Quote with Translation */}
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
            Ready to Transform Your {heritage.geography.diasporaHub.city} Longing Into {heritage.identity.name} Success?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join 750+ {heritage.identity.name} souls from {heritage.geography.mainCountry.name}{heritage.geography.relatedCountries ? `, ${  heritage.geography.relatedCountries.map(c => c.name).join(', ')}` : ''} & beyond who found their {heritage.geography.diasporaHub.city} community through real connections. From cultural market adventures to traditional music nights - your {heritage.identity.name} community awaits at authentic {heritage.geography.diasporaHub.city} venues where our culture thrives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={ROUTES.signup} 
              className="inline-flex items-center justify-center bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              JOIN NOW
            </a>
            <a 
              href={ROUTES.caseStudies} 
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