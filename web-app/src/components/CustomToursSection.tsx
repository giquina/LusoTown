'use client'

import { motion } from 'framer-motion'
import { MapPinIcon, ShieldCheckIcon, StarIcon, CameraIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon, Crown, Users } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface CustomToursSectionProps {
  onBookTour?: (tourId: string) => void
  showHeader?: boolean
}

const customTourFeatures = [
  {
    icon: ShieldCheckIcon,
    title: 'Professional Security Driver',
    titlePortuguese: 'Motorista de Segurança Profissional',
    description: 'Dedicated private security-trained driver with extensive UK and London knowledge',
    descriptionPortuguese: 'Motorista dedicado com treino de segurança e amplo conhecimento do Reino Unido e Londres'
  },
  {
    icon: MapPinIcon,
    title: 'Take You Anywhere',
    titlePortuguese: 'Levamos-te a Qualquer Lugar',
    description: 'Complete freedom to explore any destination across the UK with Portuguese-speaking support',
    descriptionPortuguese: 'Liberdade completa para explorar qualquer destino no Reino Unido com apoio falante de português'
  },
  {
    icon: CameraIcon,
    title: 'Photography Included',
    titlePortuguese: 'Fotografia Incluída',
    description: 'Professional photography at every stop to capture your perfect UK memories',
    descriptionPortuguese: 'Fotografia profissional em cada paragem para capturar as suas memórias perfeitas do Reino Unido'
  },
  {
    icon: Crown,
    title: 'Fully Customizable',
    titlePortuguese: 'Totalmente Personalizável',
    description: 'Design your perfect tour - timing, destinations, and experiences tailored just for you',
    descriptionPortuguese: 'Desenhe o seu tour perfeito - timing, destinos e experiências adaptadas apenas para si'
  }
]

const popularDestinations = [
  {
    name: 'London Landmarks',
    namePortuguese: 'Marcos de Londres',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop',
    description: 'Big Ben, Tower Bridge, Buckingham Palace, Westminster',
    descriptionPortuguese: 'Big Ben, Tower Bridge, Palácio de Buckingham, Westminster'
  },
  {
    name: 'Windsor & Countryside',
    namePortuguese: 'Windsor e Campo',
    image: 'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=400&h=300&fit=crop',
    description: 'Windsor Castle, Cotswolds villages, English countryside',
    descriptionPortuguese: 'Castelo de Windsor, aldeias dos Cotswolds, campo inglês'
  },
  {
    name: 'Oxford & Cambridge',
    namePortuguese: 'Oxford e Cambridge',
    image: 'https://images.unsplash.com/photo-1542977604-16df8b66d0be?w=400&h=300&fit=crop',
    description: 'Historic universities, beautiful architecture, academic heritage',
    descriptionPortuguese: 'Universidades históricas, arquitetura bela, herança académica'
  },
  {
    name: 'Bath & Stonehenge',
    namePortuguese: 'Bath e Stonehenge',
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d00ad8?w=400&h=300&fit=crop',
    description: 'Roman baths, ancient mysteries, Georgian architecture',
    descriptionPortuguese: 'Banhos romanos, mistérios antigos, arquitetura georgiana'
  }
]

export default function CustomToursSection({ onBookTour, showHeader = true }: CustomToursSectionProps) {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'

  const handleBooking = () => {
    if (onBookTour) {
      onBookTour('custom-tour')
    } else {
      // Redirect to transport page
      window.location.href = '/transport'
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-white via-secondary-50/20 to-premium-50/20">
      <div className="container-width px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-secondary-100 via-premium-50 to-accent-100 border border-secondary-200">
                <MapPinIcon className="w-4 h-4 mr-2" />
                {isPortuguese ? 'Tours Personalizados' : 'Custom Tours'}
              </span>
            </motion.div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {isPortuguese ? 'Crie o Seu Tour Perfeito' : 'Create Your Perfect Tour'}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              {isPortuguese 
                ? 'Com um motorista de segurança dedicado que conhece profundamente o Reino Unido e Londres, pode ir a qualquer lugar com total segurança e apoio em português'
                : 'With a dedicated security driver who knows the UK and London inside out, you can go anywhere with complete safety and Portuguese-speaking support'
              }
            </p>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {customTourFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/60 hover:shadow-xl transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-secondary-100 to-premium-100 rounded-2xl mb-4">
                <feature.icon className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isPortuguese ? feature.titlePortuguese : feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {isPortuguese ? feature.descriptionPortuguese : feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Popular Destinations */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {isPortuguese ? 'Destinos Populares' : 'Popular Destinations'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={handleBooking}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={isPortuguese ? destination.namePortuguese : destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-lg font-semibold mb-1">
                      {isPortuguese ? destination.namePortuguese : destination.name}
                    </h4>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm">
                    {isPortuguese ? destination.descriptionPortuguese : destination.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-secondary-50 via-premium-50 to-accent-50 rounded-2xl p-8 border border-secondary-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {isPortuguese ? 'Pronto para a Sua Aventura?' : 'Ready for Your Adventure?'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {isPortuguese 
                ? 'Contacte-nos para desenhar a sua experiência perfeita no Reino Unido. Desde castelos históricos a paisagens deslumbrantes, levamo-lo onde quiser ir com total segurança e conforto.'
                : 'Contact us to design your perfect UK experience. From historic castles to stunning landscapes, we\'ll take you wherever you want to go with complete safety and comfort.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBooking}
                className="bg-gradient-to-r from-secondary-600 via-premium-600 to-accent-600 hover:from-secondary-700 hover:via-premium-700 hover:to-accent-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                {isPortuguese ? 'Planear o Meu Tour' : 'Plan My Tour'}
              </button>
              <a
                href="tel:+447777777777"
                className="border-2 border-secondary-600 text-secondary-600 px-8 py-3 rounded-xl font-semibold hover:bg-secondary-50 transition-colors"
              >
                {isPortuguese ? 'Ligar Agora' : 'Call Now'}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}