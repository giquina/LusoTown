'use client'

import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import { getImagesByCategory, getImageWithFallback, getAltTextWithFallback } from '@/lib/profileImages'
import { useLanguage } from '@/context/LanguageContext'

const testimonials = {
  en: [
    {
      name: "Carlos Silva",
      age: "28",
      location: "São Paulo, Brazil",
      imageId: "carlos-silva",
      quote: "I organized my first Portuguese business networking event through LusoTown and 150 people showed up! Now I host monthly meetups connecting Brazilian entrepreneurs across the city.",
      rating: 5,
      relationship: "Business Event Organizer"
    },
    {
      name: "Ana Ferreira",
      age: "34", 
      location: "Toronto, Canada",
      imageId: "ana-ferreira",
      quote: "As a cultural coordinator, LusoTown helped me organize Festa Junina celebrations that brought together 300+ Portuguese families. The platform made promotion and community building effortless.",
      rating: 5,
      relationship: "Cultural Event Organizer"
    },
    {
      name: "Miguel Santos",
      age: "32",
      location: "Lisbon, Portugal", 
      imageId: "miguel-santos",
      quote: "I found an incredible fado evening in London through LusoTown while traveling for work. Connected with Portuguese expats who became lifelong friends. The global reach is amazing!",
      rating: 5,
      relationship: "Global Portuguese Network Member"
    },
    {
      name: "Joana Silva",
      age: "29",
      location: "Paris, France",
      imageId: "joana-silva",
      quote: "Started organizing Portuguese food festivals in Paris using LusoTown. From 20 people to 500+ attendees in just 6 months. The community support has been incredible!",
      rating: 5,
      relationship: "Food Festival Organizer"
    },
    {
      name: "Pedro Costa",
      age: "41",
      location: "New York, USA",
      imageId: "pedro-costa",
      quote: "Through LusoTown, I discovered Portuguese tech meetups happening worldwide. Attended events in 5 different cities during business trips - always found my Portuguese tech community!",
      rating: 5,
      relationship: "Tech Professional & Global Attendee"
    },
    {
      name: "Teresa Rodrigues",
      age: "37",
      location: "Cape Town, South Africa",
      imageId: "teresa-rodrigues",
      quote: "From organizing small Cape Verdean music nights to hosting 400-person Portuguese cultural festivals - LusoTown gave me the tools and community to grow beyond my dreams.",
      rating: 5,
      relationship: "Music & Cultural Event Organizer"
    },
    {
      name: "Ricardo Oliveira",
      age: "30",
      location: "Sydney, Australia",
      imageId: "ricardo-oliveira",
      quote: "I organize Portuguese football viewing parties and beach barbecues in Sydney. Started with 8 friends, now we're 200+ strong! LusoTown connected me with Portuguese families across Australia.",
      rating: 5,
      relationship: "Sports & Social Event Organizer"
    },
    {
      name: "Fernanda Santos",
      age: "26",
      location: "Berlin, Germany",
      imageId: "fernanda-santos",
      quote: "Found amazing Portuguese language exchange events and dance workshops through LusoTown. As a Brazilian in Berlin, the platform helped me discover our thriving Lusophone community here.",
      rating: 5,
      relationship: "Language & Dance Event Attendee"
    },
    {
      name: "António Pereira",
      age: "45",
      location: "Dubai, UAE",
      imageId: "antonio-pereira",
      quote: "Organized the first Portuguese business expo in Dubai using LusoTown's event tools. Connected 80+ Portuguese entrepreneurs and attracted 300 attendees from across the Middle East.",
      rating: 5,
      relationship: "Business Expo Organizer"
    }
  ],
  pt: [
    {
      name: "Carlos Silva",
      age: "28",
      location: "São Paulo, Brasil",
      imageId: "carlos-silva",
      quote: "Organizei o meu primeiro evento de networking português através da LusoTown e apareceram 150 pessoas! Agora organizo encontros mensais conectando empreendedores brasileiros pela cidade.",
      rating: 5,
      relationship: "Organizador de Eventos de Negócios"
    },
    {
      name: "Ana Ferreira",
      age: "34", 
      location: "Toronto, Canadá",
      imageId: "ana-ferreira",
      quote: "Como coordenadora cultural, a LusoTown ajudou-me a organizar celebrações de Festa Junina que juntaram 300+ famílias portuguesas. A plataforma tornou a promoção e construção de comunidade sem esforço.",
      rating: 5,
      relationship: "Organizadora de Eventos Culturais"
    },
    {
      name: "Miguel Santos",
      age: "32",
      location: "Lisboa, Portugal", 
      imageId: "miguel-santos",
      quote: "Encontrei uma noite de fado incrível em Londres através da LusoTown enquanto viajava a trabalho. Conectei-me com expatriados portugueses que se tornaram amigos para a vida. O alcance global é incrível!",
      rating: 5,
      relationship: "Membro da Rede Global Portuguesa"
    },
    {
      name: "Joana Silva",
      age: "29",
      location: "Paris, França",
      imageId: "joana-silva",
      quote: "Comecei a organizar festivais de comida portuguesa em Paris usando a LusoTown. De 20 pessoas para 500+ participantes em apenas 6 meses. O apoio da comunidade tem sido incrível!",
      rating: 5,
      relationship: "Organizadora de Festivais Gastronómicos"
    },
    {
      name: "Pedro Costa",
      age: "41",
      location: "Nova Iorque, EUA",
      imageId: "pedro-costa",
      quote: "Através da LusoTown, descobri encontros de tecnologia portugueses acontecendo pelo mundo. Participei em eventos em 5 cidades diferentes durante viagens de negócios - sempre encontrei a minha comunidade tech portuguesa!",
      rating: 5,
      relationship: "Profissional de Tecnologia & Participante Global"
    },
    {
      name: "Teresa Rodrigues",
      age: "37",
      location: "Cidade do Cabo, África do Sul",
      imageId: "teresa-rodrigues",
      quote: "De organizar pequenas noites de música cabo-verdiana a organizar festivais culturais portugueses de 400 pessoas - a LusoTown deu-me as ferramentas e comunidade para crescer além dos meus sonhos.",
      rating: 5,
      relationship: "Organizadora de Eventos Musicais & Culturais"
    },
    {
      name: "Ricardo Oliveira",
      age: "30",
      location: "Sydney, Austrália",
      imageId: "ricardo-oliveira",
      quote: "Organizo festas para ver futebol português e churrascos na praia em Sydney. Começámos com 8 amigos, agora somos 200+ fortes! A LusoTown conectou-me com famílias portuguesas por toda a Austrália.",
      rating: 5,
      relationship: "Organizador de Eventos Desportivos & Sociais"
    },
    {
      name: "Fernanda Santos",
      age: "26",
      location: "Berlim, Alemanha",
      imageId: "fernanda-santos",
      quote: "Encontrei eventos incríveis de intercâmbio de língua portuguesa e workshops de dança através da LusoTown. Como brasileira em Berlim, a plataforma ajudou-me a descobrir a nossa próspera comunidade lusófona aqui.",
      rating: 5,
      relationship: "Participante de Eventos de Língua & Dança"
    },
    {
      name: "António Pereira",
      age: "45",
      location: "Dubai, Emirados Árabes Unidos",
      imageId: "antonio-pereira",
      quote: "Organizei a primeira expo de negócios portuguesa no Dubai usando as ferramentas de eventos da LusoTown. Conectei 80+ empreendedores portugueses e atraí 300 participantes de todo o Médio Oriente.",
      rating: 5,
      relationship: "Organizador de Expo de Negócios"
    }
  ]
}

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

export default function TestimonialsNew() {
  const { t, language } = useLanguage()
  const currentTestimonials = testimonials[language as keyof typeof testimonials] || testimonials.en

  return (
    <section className="py-20 gradient-bg relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-red-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse animation-delay-400"></div>
        <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-gradient-to-r from-red-100 to-green-100 rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2 animate-pulse animation-delay-200"></div>
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
            {t('testimonials.badge')}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">{t('testimonials.title')}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
            {t('testimonials.subtitle')}
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
          {currentTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              className="group"
            >
              <div className="card p-6 sm:p-8 h-full hover:scale-105 transition-all duration-300 group-hover:shadow-2xl bg-white/80 backdrop-blur-sm border border-white/50">
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
                <blockquote className="text-gray-700 leading-relaxed mb-6 text-sm sm:text-base">
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
              Meet Your <span className="gradient-text">Global Portuguese Community</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of Portuguese speakers worldwide who are organizing events, building communities, and connecting across continents.
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
                <p className="text-gray-600">Average Rating</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-secondary-400 mb-2">15K+</p>
                <p className="text-gray-600">Global Members</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-red-400 mb-2">50+</p>
                <p className="text-gray-600">Countries Represented</p>
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
            Ready to Connect with Portuguese Speakers Worldwide?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of Portuguese speakers across 50+ countries who are organizing events, building communities, and creating lasting connections worldwide.
          </p>
          <a href="/signup" className="btn-primary text-lg px-10 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 inline-block">
            Join the Global Community
          </a>
        </motion.div>
      </div>
    </section>
  )
}