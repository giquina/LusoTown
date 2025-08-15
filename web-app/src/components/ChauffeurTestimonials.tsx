'use client'

import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

const testimonials = [
  {
    id: 1,
    name: 'Maria Silva',
    location: 'Kensington',
    locationPortuguese: 'Kensington',
    rating: 5,
    text: 'Exceptional service! The chauffeur was professional, punctual, and made me feel completely safe during my late-night event. The Portuguese cultural knowledge was a wonderful touch.',
    textPortuguese: 'Serviço excecional! O chauffeur foi profissional, pontual e fez-me sentir completamente segura durante o meu evento noturno. O conhecimento cultural português foi um toque maravilhoso.',
    service: 'Premium Security',
    servicePortuguese: 'Segurança Premium',
    avatar: '👩🏻‍💼'
  },
  {
    id: 2,
    name: 'Carlos Mendes',
    location: 'Chelsea',
    locationPortuguese: 'Chelsea',
    rating: 5,
    text: 'Outstanding experience with the VIP Cultural tour. The driver not only provided excellent security but also shared fascinating insights about Portuguese history in London.',
    textPortuguese: 'Experiência extraordinária com o tour Cultural VIP. O motorista não só forneceu excelente segurança como também partilhou insights fascinantes sobre a história portuguesa em Londres.',
    service: 'VIP Cultural Experience',
    servicePortuguese: 'Experiência Cultural VIP',
    avatar: '👨🏻‍💼'
  },
  {
    id: 3,
    name: 'Ana Rodrigues',
    location: 'Mayfair',
    locationPortuguese: 'Mayfair',
    rating: 5,
    text: 'Perfect for business meetings. The Elite Protection service gave me confidence during important negotiations. Discreet, professional, and culturally aware.',
    textPortuguese: 'Perfeito para reuniões de negócios. O serviço de Proteção Elite deu-me confiança durante negociações importantes. Discreto, profissional e culturalmente consciente.',
    service: 'Elite Protection',
    servicePortuguese: 'Proteção Elite',
    avatar: '👩🏽‍💼'
  },
  {
    id: 4,
    name: 'João Santos',
    location: 'Notting Hill',
    locationPortuguese: 'Notting Hill',
    rating: 5,
    text: 'The Harry Potter Studio Tour package was magical! Great security, comfortable ride, and the guide knew so much about both British and Portuguese cinema culture.',
    textPortuguese: 'O pacote do Tour dos Estúdios Harry Potter foi mágico! Ótima segurança, viagem confortável e o guia sabia muito sobre cultura cinematográfica britânica e portuguesa.',
    service: 'Harry Potter Studio Tour',
    servicePortuguese: 'Tour dos Estúdios Harry Potter',
    avatar: '👨🏻‍🦱'
  },
  {
    id: 5,
    name: 'Beatriz Costa',
    location: 'Belgravia',
    locationPortuguese: 'Belgravia',
    rating: 5,
    text: 'Incredible shopping experience! The chauffeur waited patiently while I shopped at Harrods and Bond Street. Professional security made me feel safe with my purchases.',
    textPortuguese: 'Experiência de compras incrível! O chauffeur esperou pacientemente enquanto fazia compras em Harrods e Bond Street. Segurança profissional fez-me sentir segura com as minhas compras.',
    service: 'Shopping Experience',
    servicePortuguese: 'Experiência de Compras',
    avatar: '👩🏻‍🦰'
  },
  {
    id: 6,
    name: 'Miguel Fernandes',
    location: 'Canary Wharf',
    locationPortuguese: 'Canary Wharf',
    rating: 5,
    text: 'Business class service for airport transfers. Always on time, impeccable vehicles, and the Portuguese-speaking service made international travel much more comfortable.',
    textPortuguese: 'Serviço de classe executiva para transferências do aeroporto. Sempre pontual, veículos impecáveis e o serviço falante de português tornou as viagens internacionais muito mais confortáveis.',
    service: 'Airport VIP Transfer',
    servicePortuguese: 'Transferência VIP Aeroporto',
    avatar: '👨🏽‍💼'
  }
]

export default function ChauffeurTestimonials() {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-premium-50">
      <div className="container-width px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            {isPortuguese ? 'O Que Dizem os Nossos Clientes' : 'What Our Clients Say'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {isPortuguese 
              ? 'Experiências reais de membros da comunidade portuguesa em Londres'
              : 'Real experiences from Portuguese community members in London'
            }
          </motion.p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-premium-100 rounded-full flex items-center justify-center">
                  <ChatBubbleLeftIcon className="w-6 h-6 text-premium-600" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-gray-700 text-center mb-6 leading-relaxed">
                "{isPortuguese ? testimonial.textPortuguese : testimonial.text}"
              </blockquote>

              {/* Service Badge */}
              <div className="flex justify-center mb-4">
                <span className="inline-block bg-premium-100 text-premium-800 text-xs font-medium px-3 py-1 rounded-full">
                  {isPortuguese ? testimonial.servicePortuguese : testimonial.service}
                </span>
              </div>

              {/* Author */}
              <div className="text-center">
                <div className="text-2xl mb-2">{testimonial.avatar}</div>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">
                  {isPortuguese ? testimonial.locationPortuguese : testimonial.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.slice(0, 4).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
              >
                {/* Quote Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-premium-100 rounded-full flex items-center justify-center">
                    <ChatBubbleLeftIcon className="w-6 h-6 text-premium-600" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 text-center mb-6 leading-relaxed">
                  "{isPortuguese ? testimonial.textPortuguese : testimonial.text}"
                </blockquote>

                {/* Service Badge */}
                <div className="flex justify-center mb-4">
                  <span className="inline-block bg-premium-100 text-premium-800 text-xs font-medium px-3 py-1 rounded-full">
                    {isPortuguese ? testimonial.servicePortuguese : testimonial.service}
                  </span>
                </div>

                {/* Author */}
                <div className="text-center">
                  <div className="text-2xl mb-2">{testimonial.avatar}</div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">
                    {isPortuguese ? testimonial.locationPortuguese : testimonial.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
            <div className="flex items-center space-x-2">
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold">4.9/5</span>
              <span>{isPortuguese ? 'Avaliação Média' : 'Average Rating'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
              <span>{isPortuguese ? '200+ Clientes Satisfeitos' : '200+ Happy Clients'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-premium-500 rounded-full"></div>
              <span>{isPortuguese ? '5 Anos de Experiência' : '5 Years Experience'}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}