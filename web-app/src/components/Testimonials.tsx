'use client'

import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import { getProfileImage, getImagesByCategory, getImageWithFallback, getAltTextWithFallback } from '@/lib/profileImages'

const testimonials = [
  {
    name: "Maria Santos",
    age: "34",
    location: "Stockwell, London",
    imageId: "maria-santos",
    quote: "Mudei-me do Porto para Londres há 3 anos e sentia muita saudade de casa. No LusoTown encontrei mulheres que entendem a nossa cultura e agora celebramos o São João juntas em Londres! É como ter família aqui.",
    rating: 5,
    relationship: "Encontrou a sua família portuguesa em Londres"
  },
  {
    name: "Ana Ferreira",
    age: "29", 
    location: "Elephant & Castle, London",
    imageId: "ana-ferreira",
    quote: "Being Brazilian in London, I struggled to find community that understood my culture. Through LusoTown, I met amazing Portuguese-speaking women who've become my chosen family. We share feijoada recipes and help each other navigate life in London.",
    rating: 5,
    relationship: "Found her Brazilian-Portuguese sisterhood"
  },
  {
    name: "Carla Mendes",
    age: "38",
    location: "Vauxhall, London", 
    imageId: "carla-mendes",
    quote: "Como mãe angolana em Londres, era difícil manter as tradições dos meus filhos. As mulheres do LusoTown ajudam-me a ensinar português aos miúdos e organizamos eventos culturais maravilhosos juntas.",
    rating: 5,
    relationship: "Preserving Angolan culture for her children"
  },
  {
    name: "Joana Silva",
    age: "42",
    location: "South Lambeth, London",
    imageId: "joana-silva",
    quote: "After 15 years in London, I thought I'd lost touch with my Portuguese roots. LusoTown reconnected me with women who share the same saudade and helped me rediscover my heritage while thriving in British life.",
    rating: 5,
    relationship: "Reconnected with Portuguese heritage"
  },
  {
    name: "Beatriz Costa",
    age: "31",
    location: "Brixton, London",
    imageId: "beatriz-costa",
    quote: "Working in the City as a Portuguese professional, I felt isolated from my culture. Through LusoTown, I found successful women who balance British career ambitions with Portuguese values. We support each other's dreams.",
    rating: 5,
    relationship: "Professional Portuguese network"
  },
  {
    name: "Teresa Rodrigues",
    age: "36",
    location: "Oval, London",
    imageId: "teresa-rodrigues",
    quote: "Vim de Cabo Verde para Londres jovem e sozinha. No LusoTown encontrei mulheres que me ensinaram a navegar na vida britânica sem perder as minhas raízes. Somos uma verdadeira comunidade lusófona.",
    rating: 5,
    relationship: "Cape Verdean community support"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
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

export default function Testimonials() {
  return (
    <section className="py-20 gradient-bg relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary-200 rounded-full opacity-20 animate-pulse animation-delay-400"></div>
        <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2 animate-pulse animation-delay-200"></div>
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
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-primary-600 font-medium mb-6 border border-white/30">
            <StarIcon className="h-4 w-4 text-yellow-400" />
            Histórias Reais, Amizades Verdadeiras
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Conheça a Nossa{' '}
            <span className="gradient-text">Comunidade Lusófona</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Descubra como centenas de mulheres portuguesas, brasileiras, angolanas e cabo-verdianas encontraram a sua família em Londres através do LusoTown.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              className="group"
            >
              <div className="card p-8 h-full hover:scale-105 transition-all duration-300 group-hover:shadow-2xl bg-white/80 backdrop-blur-sm border border-white/50">
                {/* Quote Icon */}
                <div className="mb-6">
                  <ChatBubbleLeftIcon className="h-8 w-8 text-primary-300" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 leading-relaxed mb-6 text-base">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg ring-2 ring-white">
                    <img 
                      src={getImageWithFallback(testimonial.imageId)} 
                      alt={getAltTextWithFallback(testimonial.imageId)}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}, {testimonial.age}
                    </h4>
                    <p className="text-sm text-gray-500 mb-1">
                      {testimonial.location}
                    </p>
                    <p className="text-xs text-primary-600 font-medium">
                      {testimonial.relationship}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Community Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Conheça as Suas <span className="gradient-text">Futuras Amigas</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Junte-se a centenas de mulheres incríveis de países lusófonos que estão a construir ligações significativas em Londres e no Reino Unido.
            </p>
          </div>
          
          {/* Photo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
            {getImagesByCategory('community').map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="aspect-square rounded-2xl overflow-hidden shadow-lg ring-2 ring-white hover:ring-primary-200 transition-all duration-300"
              >
                <img 
                  src={member.path}
                  alt={member.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
            <div className="grid sm:grid-cols-3 gap-8">
              <div>
                <p className="text-4xl font-bold text-primary-400 mb-2">4.9/5</p>
                <p className="text-gray-600">Avaliação Média</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-secondary-400 mb-2">250+</p>
                <p className="text-gray-600">Membros Verificadas</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary-400 mb-2">92%</p>
                <p className="text-gray-600">Encontraram Amizades Reais</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-12"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Pronta para Escrever a Sua História de Sucesso?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de mulheres lusófonas que encontraram a sua tribo em Londres. A sua amizade perfeita está apenas a um clique de distância.
          </p>
          <a href="/signup" className="btn-primary text-lg px-10 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 inline-block">
            Comece a Sua Jornada Hoje
          </a>
        </motion.div>
      </div>
    </section>
  )
}