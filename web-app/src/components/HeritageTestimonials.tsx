'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { HeartIcon, SparklesIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { useHeritage } from '@/context/HeritageContext'
import { getImageWithFallback } from '@/lib/profileImages'

interface HeritageTestimonial {
  id: string
  name: string
  age: number
  location: string
  profileImage: string
  partnerName: string
  partnerImage: string
  story: string
  connectionType: string
  timeframe: string
  category: string
  heritage_quote: string
  english_translation: string
  cultural_bond: string
  how_they_met: string
  current_status: string
  heritage_specific: {
    traditions: string[]
    foods: string[]
    celebrations: string[]
  }
}

// Generate heritage-specific testimonials based on current heritage
function generateHeritageTestimonials(heritage: any): HeritageTestimonial[] {
  const { identity, culture, geography } = heritage
  const heritageCode = identity.code

  if (heritageCode === 'pt') {
    return [
      {
        id: 'romantic-1',
        name: 'Ana Catarina',
        age: 28,
        location: `Stockwell, ${geography.diasporaHub.city}`,
        profileImage: getImageWithFallback('ana-catarina'),
        partnerName: 'Ricardo Manuel',
        partnerImage: getImageWithFallback('ricardo-manuel'),
        story: `I moved from Porto to ${geography.diasporaHub.city} for banking, but the city felt cold as winter rain. Ricardo appeared at HeritageTown's Santos Populares event in Vauxhall Park - a guy from Braga with the same saudade for home. "Do you miss the smell of sardines on the fire?" he asked, offering grilled sardines. Six months later, we're planning our engagement party at The Portuguese Centre.`,
        connectionType: 'Saudade Sweethearts',
        timeframe: '18 months ago',
        category: 'Found Love',
        heritage_quote: 'Encontrei não só o amor, mas alguém que entende a minha alma portuguesa.',
        english_translation: 'I found not just love, but someone who understands my Portuguese soul.',
        cultural_bond: 'Santos Populares celebration and shared nostalgia for northern Portugal traditions',
        how_they_met: 'Mutual match through cultural compatibility algorithm, met at HeritageTown\'s Santos Populares event',
        current_status: 'Engaged, planning Portuguese wedding with fado music and London reception',
        heritage_specific: {
          traditions: ['Santos Populares', 'Fado music'],
          foods: ['Sardines', 'Traditional Portuguese cuisine'],
          celebrations: ['Portuguese wedding traditions']
        }
      },
      {
        id: 'business-1',
        name: 'Mariana Santos',
        age: 35,
        location: `Canary Wharf, ${geography.diasporaHub.city}`,
        profileImage: getImageWithFallback('mariana-santos'),
        partnerName: 'João Pereira',
        partnerImage: getImageWithFallback('joao-pereira'),
        story: `From Lisboa's Avenidas Novas to Canary Wharf towers, carrying MBA dreams and Portuguese determination. Met João at HeritageTown's "Portuguese Professionals" breakfast in The Shard - an entrepreneur from Coimbra struggling with the same cultural isolation in ${geography.diasporaHub.city}'s business world. "We need to create something of our own," he said over galão coffee. Our FinTech startup "LusoLink" now connects 500+ Portuguese SMEs across Europe.`,
        connectionType: 'Empreendedores Lusos',
        timeframe: '3 years ago',
        category: 'Business Partners',
        heritage_quote: 'Dois portugueses em Londres podem conquistar a Europa inteira.',
        english_translation: 'Two Portuguese in London can conquer all of Europe.',
        cultural_bond: 'Shared entrepreneurial spirit and Portuguese business ethics in global finance',
        how_they_met: 'Professional networking match through business interests filter',
        current_status: 'Business partners who raised £3.2M Series A, planning European expansion',
        heritage_specific: {
          traditions: ['Portuguese work ethic', 'Galão coffee culture'],
          foods: ['Galão coffee'],
          celebrations: ['Professional achievements']
        }
      }
    ]
  } else if (heritageCode === 'it') {
    return [
      {
        id: 'romantic-1',
        name: 'Giulia Romano',
        age: 29,
        location: `Clerkenwell, ${geography.diasporaHub.city}`,
        profileImage: getImageWithFallback('giulia-romano'),
        partnerName: 'Marco Bianchi',
        partnerImage: getImageWithFallback('marco-bianchi'),
        story: `I moved from Milano to ${geography.diasporaHub.city} for fashion, but missed the warmth of Sunday family dinners. Marco appeared at HeritageTown's Ferragosto celebration in Little Italy - a chef from Napoli with the same passion for authentic Italian cuisine. "You know the difference between carbonara and alfredo?" he asked, offering homemade pasta. Eight months later, we're opening our family restaurant together.`,
        connectionType: 'Famiglia Italiana',
        timeframe: '14 months ago',
        category: 'Found Love',
        heritage_quote: 'Ho trovato non solo l\'amore, ma qualcuno che capisce la mia anima italiana.',
        english_translation: 'I found not just love, but someone who understands my Italian soul.',
        cultural_bond: 'Ferragosto celebration and shared passion for authentic Italian family traditions',
        how_they_met: 'Mutual match through cultural compatibility algorithm, met at HeritageTown\'s Ferragosto event',
        current_status: 'Engaged, planning Italian wedding with opera music and traditional reception',
        heritage_specific: {
          traditions: ['Ferragosto', 'Family Sunday dinners', 'Opera'],
          foods: ['Homemade pasta', 'Carbonara', 'Traditional Italian cuisine'],
          celebrations: ['Italian wedding traditions']
        }
      },
      {
        id: 'business-1',
        name: 'Alessandro Ferrari',
        age: 36,
        location: `Soho, ${geography.diasporaHub.city}`,
        profileImage: getImageWithFallback('alessandro-ferrari'),
        partnerName: 'Sofia Rossi',
        partnerImage: getImageWithFallback('sofia-rossi'),
        story: `From Roma's fashion district to ${geography.diasporaHub.city}'s design scene, bringing Italian style and craftsmanship. Met Sofia at HeritageTown's "Italian Creatives" networking event in Soho - a designer from Firenze with the same vision for bringing authentic Italian design to the United Kingdom market. "Let's show them what real Italian design means," she said over espresso. Our design studio "Bella Creatività" now works with luxury brands across Europe.`,
        connectionType: 'Creativi Italiani',
        timeframe: '2 years ago',
        category: 'Business Partners',
        heritage_quote: 'Due italiani a Londra possono portare la bellezza italiana nel mondo.',
        english_translation: 'Two Italians in London can bring Italian beauty to the world.',
        cultural_bond: 'Shared passion for Italian design excellence and artistic heritage',
        how_they_met: 'Creative networking match through design interests and Italian heritage',
        current_status: 'Business partners expanding to Paris and Milan, featured in Vogue Italia',
        heritage_specific: {
          traditions: ['Italian design heritage', 'Espresso culture'],
          foods: ['Authentic espresso'],
          celebrations: ['Creative achievements', 'Italian craftsmanship']
        }
      }
    ]
  }

  // Default fallback testimonials
  return []
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export default function HeritageTestimonials() {
  const { t } = useLanguage()
  const { heritage, symbols } = useHeritage()
  
  const testimonials = generateHeritageTestimonials(heritage)

  if (testimonials.length === 0) {
    return null
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Found Love':
        return <HeartIcon className="w-5 h-5 text-red-500" />
      case 'Business Partners':
        return <SparklesIcon className="w-5 h-5 text-blue-500" />
      case 'Cultural Connection':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />
      default:
        return <HeartIcon className="w-5 h-5 text-red-500" />
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="text-2xl">{symbols.flag}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {heritage.identity.name} Success Stories
            </h2>
            <span className="text-2xl">💕</span>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Real connections made through our {heritage.identity.name} heritage community platform
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid md:grid-cols-2 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(testimonial.category)}
                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      {testimonial.category}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{testimonial.timeframe}</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <Image
                      src={testimonial.profileImage}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full border-2 border-white object-cover"
                    />
                    <Image
                      src={testimonial.partnerImage}
                      alt={testimonial.partnerName}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full border-2 border-white object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {testimonial.name} & {testimonial.partnerName}
                    </h3>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                    <p className="text-xs text-blue-600 font-medium">{testimonial.connectionType}</p>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <blockquote className="text-gray-700 mb-4 leading-relaxed">
                  "{testimonial.story}"
                </blockquote>

                {/* Heritage Quote */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-gray-800 italic mb-1">
                    "{testimonial.heritage_quote}"
                  </p>
                  <p className="text-xs text-gray-600">
                    {testimonial.english_translation}
                  </p>
                </div>

                {/* Cultural Bond */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900">Cultural Connection:</h4>
                  <p className="text-sm text-gray-600">{testimonial.cultural_bond}</p>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {testimonial.heritage_specific.traditions.map((tradition, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {tradition}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Current Status */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-green-700 font-medium">
                    💚 {testimonial.current_status}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to find your {heritage.identity.name} connection?
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
            Join {heritage.identity.name} Community
          </button>
        </motion.div>
      </div>
    </section>
  )
}