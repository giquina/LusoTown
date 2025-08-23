'use client'

import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'
import { createMixedTestimonials, getTestimonialText, authenticPortugueseTestimonials } from '@/lib/testimonialMixer'

// Combined transport testimonials with language indicators for mixed display
const allTransportTestimonials = [
  // Authentic Portuguese testimonials (always displayed in Portuguese)
  ...authenticPortugueseTestimonials.transport.map(t => ({
    ...t,
    id: `auth-pt-transport-${t.name.toLowerCase().replace(/\s+/g, '-')}`,
    language: 'pt' as const,
    isAuthentic: true
  })),
  
  // English testimonials with Portuguese translations
  {
    id: 'maria-silva',
    name: 'Maria Silva',
    location: 'Kensington',
    locationPortuguese: 'Kensington',
    rating: 5,
    text: 'Exceptional service! The driver was professional, punctual, and made me feel completely safe during my late-night event. Having a Portuguese-speaking driver made all the difference.',
    textPortuguese: 'Serviço excecional! O motorista foi profissional, pontual e fez-me sentir completamente segura durante o meu evento noturno. Ter um motorista que fala português fez toda a diferença.',
    service: 'Premium Security',
    servicePortuguese: 'Segurança Premium',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b632?w=150&h=150&fit=crop&crop=face',
    language: 'en' as const
  },
  {
    id: 'carlos-mendes',
    name: 'Carlos Mendes',
    location: 'Chelsea',
    locationPortuguese: 'Chelsea',
    rating: 5,
    text: 'Outstanding experience with the VIP London tour. The driver not only provided excellent security but also shared fascinating insights about London history in perfect Portuguese.',
    textPortuguese: 'Experiência extraordinária com o tour VIP de Londres. O motorista não só forneceu excelente segurança como também partilhou insights fascinantes sobre a história de Londres em português perfeito.',
    service: 'VIP London Experience',
    servicePortuguese: 'Experiência VIP de Londres',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    language: 'en' as const
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
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'João Santos',
    location: 'Notting Hill',
    locationPortuguese: 'Notting Hill',
    rating: 5,
    text: 'The Harry Potter Studio Tour package was magical! Great security, comfortable ride, and having a Portuguese-speaking guide made the experience perfect for our family.',
    textPortuguese: 'O pacote do Tour dos Estúdios Harry Potter foi mágico! Ótima segurança, viagem confortável e ter um guia que fala português tornou a experiência perfeita para nossa família.',
    service: 'Harry Potter Studio Tour',
    servicePortuguese: 'Tour dos Estúdios Harry Potter',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 5,
    name: 'Beatriz Costa',
    location: 'Belgravia',
    locationPortuguese: 'Belgravia',
    rating: 5,
    text: 'Incredible shopping experience! The driver waited patiently while I shopped at Harrods and Bond Street. Professional security made me feel safe with my purchases.',
    textPortuguese: 'Experiência de compras incrível! O motorista esperou pacientemente enquanto fazia compras em Harrods e Bond Street. Segurança profissional fez-me sentir segura com as minhas compras.',
    service: 'Shopping Experience',
    servicePortuguese: 'Experiência de Compras',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
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
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 7,
    name: 'Sofia Pereira',
    location: 'Southwark',
    locationPortuguese: 'Southwark',
    rating: 5,
    text: 'Amazing service! The driver spoke perfect Portuguese and shared wonderful stories about London history. It felt like having a friend show me around the city rather than just a driver.',
    textPortuguese: 'Serviço fantástico! O motorista falava português perfeito e partilhou histórias maravilhosas sobre a história de Londres. Foi como ter um amigo a mostrar-me a cidade em vez de apenas um motorista.',
    service: 'VIP London Experience',
    servicePortuguese: 'Experiência VIP de Londres',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 8,
    name: 'Ricardo Oliveira',
    location: 'Greenwich',
    locationPortuguese: 'Greenwich',
    rating: 5,
    text: 'Excellent Portuguese communication throughout the journey. The driver understood our cultural preferences and recommended authentic British experiences that we truly enjoyed.',
    textPortuguese: 'Excelente comunicação em português durante toda a viagem. O motorista compreendeu as nossas preferências culturais e recomendou experiências britânicas autênticas que realmente apreciámos.',
    service: 'Premium Security',
    servicePortuguese: 'Segurança Premium',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 9,
    name: 'Cristina Martins',
    location: 'Camden',
    locationPortuguese: 'Camden',
    rating: 5,
    text: 'The Portuguese-speaking service made our London tour absolutely perfect. We could ask questions, share jokes, and truly connect with our guide. Highly recommend for Portuguese families!',
    textPortuguese: 'O serviço falante de português tornou o nosso tour de Londres absolutamente perfeito. Pudemos fazer perguntas, partilhar piadas e realmente conectar com o nosso guia. Altamente recomendado para famílias portuguesas!',
    service: 'Family London Tour',
    servicePortuguese: 'Tour Familiar de Londres',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face'
  }
]

export default function TransportTestimonials() {
  const { language } = useLanguage()
  const isPortuguese = language === 'pt'
  
  // Create mixed testimonials ensuring 30% Portuguese reviews
  const mixedTestimonials = createMixedTestimonials(allTransportTestimonials.slice(0, 9), { portuguesePercentage: 30 })

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-premium-50">
      <div className="container-width">
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
              ? 'Experiências reais de membros da comunidade de falantes de português em Londres'
              : 'Real experiences from Portuguese-speaking community members in London'
            }
          </motion.p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {mixedTestimonials.map((testimonial, index) => {
            const displayContent = getTestimonialText(testimonial, language)
            
            return (
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

              {/* Language indicator for Portuguese reviews */}
              {testimonial.language === 'pt' && (
                <div className="mb-4 flex justify-center">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                    🇵🇹 Português
                  </span>
                </div>
              )}

              {/* Testimonial Text */}
              <blockquote className="text-gray-700 text-center mb-6 leading-relaxed">
                "{displayContent.text}"
              </blockquote>

              {/* Service Badge */}
              <div className="flex justify-center mb-4">
                <span className="inline-block bg-premium-100 text-premium-800 text-xs font-medium px-3 py-1 rounded-full">
                  {displayContent.service}
                </span>
              </div>

              {/* Author */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-full h-full rounded-full object-cover shadow-lg"
                    loading="lazy"
                  />
                </div>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">
                  {displayContent.location}
                </div>
              </div>
            </motion.div>
            )
          })}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mixedTestimonials.slice(0, 4).map((testimonial, index) => {
              const displayContent = getTestimonialText(testimonial, language)
              
              return (
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

                {/* Language indicator for Portuguese reviews */}
                {testimonial.language === 'pt' && (
                  <div className="mb-4 flex justify-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                      🇵🇹 Português
                    </span>
                  </div>
                )}

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 text-center mb-6 leading-relaxed">
                  "{displayContent.text}"
                </blockquote>

                {/* Service Badge */}
                <div className="flex justify-center mb-4">
                  <span className="inline-block bg-premium-100 text-premium-800 text-xs font-medium px-3 py-1 rounded-full">
                    {displayContent.service}
                  </span>
                </div>

                {/* Author */}
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-full h-full rounded-full object-cover shadow-lg"
                      loading="lazy"
                    />
                  </div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">
                    {displayContent.location}
                  </div>
                </div>
              </motion.div>
              )
            })}
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