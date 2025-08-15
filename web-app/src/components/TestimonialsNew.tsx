'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/solid'
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import { getImagesByCategory, getImageWithFallback, getAltTextWithFallback } from '@/lib/profileImages'
import { useLanguage } from '@/context/LanguageContext'

const testimonials = {
  en: [
    {
      name: "Carlos Silva",
      age: "28",
      location: "Camden, London",
      imageId: "carlos-silva",
      quote: "Started attending Portuguese movie nights at Rich Mix Cinema through LusoTown, just wanting to hear nossa língua on screen. Met other young Portuguese who missed our cultural conversations. Now we organize monthly 'Cinema & Conversa' events mixing Portuguese films with networking over bifanas. From lonely evenings to building meaningful friendships and business connections!",
      rating: 5,
      relationship: "Cultural Events & Networking Organizer"
    },
    {
      name: "Ana Ferreira",
      age: "34", 
      location: "Stockwell, London",
      imageId: "ana-ferreira",
      quote: "Minha alma brasileira was homesick until LusoTown helped me find Brazilian dance workshops at Southbank Centre. Learning samba steps with Portuguese hearts who understand nossa alegria! From missing Brazil's warmth to creating our own tropical London community. Now we dance together every week, sharing stories between the steps. Dance heals saudade, community amplifies joy!",
      rating: 5,
      relationship: "Brazilian Dance & Social Community Leader"
    },
    {
      name: "Miguel Santos",
      age: "32",
      location: "Elephant & Castle, London", 
      imageId: "miguel-santos",
      quote: "Through LusoTown found magical fado evening at Southbank Centre that cured my London saudade. Listening to 'Lágrima' under Thames stars, surrounded by Portuguese souls sharing the same ache for home... tears of recognition, not sadness. Now we meet monthly at Taberna Real do Fado in Bermondsey, our voices joining ancient melodies. Fado taught me: saudade shared becomes love multiplied.",
      rating: 5,
      relationship: "Fado Soul & Cultural Heritage Keeper"
    },
    {
      name: "Joana Silva",
      age: "29",
      location: "Canary Wharf, London",
      imageId: "joana-silva",
      quote: "Started attending Portuguese cooking workshops through LusoTown to learn minha avó's lost receitas. Discovered other Portuguese hearts hungry for authentic flavors and cultural connections. Now we organize 'Sabores & Stories' dinners at local community centers, sharing traditional dishes while building professional networks. Food connects, friendship follows, business grows naturally!",
      rating: 5,
      relationship: "Culinary Culture & Professional Networking"
    },
    {
      name: "Pedro Costa",
      age: "41",
      location: "Hampstead, London",
      imageId: "pedro-costa",
      quote: "Found Portuguese book club through LusoTown discussing literatura lusófona at Hampstead libraries. From Pessoa's poetry to modern Portuguese novels, sharing thoughts with almas who understand literary saudade. Our discussions became AI workshops when we realized many were tech professionals. Now 'Books & Code' meetups blend Portuguese culture with professional growth!",
      rating: 5,
      relationship: "Literature & Tech Community Builder"
    },
    {
      name: "Teresa Rodrigues",
      age: "37",
      location: "Brixton, London",
      imageId: "teresa-rodrigues",
      quote: "From playing morna alone in my Brixton flat, missing Cabo Verde's musical soul, to discovering Portuguese music appreciation evenings through LusoTown. Started with 6 homesick souls, now 'Música Lusófona' at local venues draws 100+ people sharing our diverse musical heritage. Music heals, community amplifies, friendships flourish across all Portuguese-speaking cultures!",
      rating: 5,
      relationship: "Music Appreciation & Cultural Unity"
    },
    {
      name: "Ricardo Oliveira",
      age: "30",
      location: "Greenwich, London",
      imageId: "ricardo-oliveira",
      quote: "Joined Portuguese football viewing parties through LusoTown just to watch Portugal games with people who understand our passion. Started with 8 friends at local pubs, now we organize weekend barbecues in Greenwich Park for 200+ Portuguese families. From match nights to community picnics - LusoTown showed me how sport builds lasting friendships!",
      rating: 5,
      relationship: "Sports & Social Community Organizer"
    },
    {
      name: "Fernanda Santos",
      age: "26",
      location: "King's Cross, London",
      imageId: "fernanda-santos",
      quote: "Discovered Portuguese language exchange sessions through LusoTown, perfect for maintaining meu português while improving English. Met Brazilian, Portuguese, and African Portuguese speakers creating beautiful linguistic harmony. From language practice to salsa workshops to professional networking - LusoTown became my gateway to London's diverse Portuguese-speaking community!",
      rating: 5,
      relationship: "Language Exchange & Cultural Bridge"
    },
    {
      name: "António Pereira",
      age: "45",
      location: "City of London",
      imageId: "antonio-pereira",
      quote: "Started attending Portuguese heritage walks through London's historic areas via LusoTown. Learning about Portuguese contributions to British culture while meeting fellow history enthusiasts. These cultural connections naturally evolved into business networking. Now 'Heritage & Commerce' tours blend cultural education with professional opportunities. History connects hearts, business follows naturally!",
      rating: 5,
      relationship: "Heritage Tours & Business Development"
    }
  ],
  pt: [
    {
      name: "Carlos Silva",
      age: "28",
      location: "Camden, Londres",
      imageId: "carlos-silva",
      quote: "Comecei a ir a noites de cinema português no Rich Mix Cinema através da LusoTown, só queria ouvir nossa língua no ecrã. Conheci outros jovens portugueses que sentiam falta das nossas conversas culturais. Agora organizamos 'Cinema & Conversa' mensais misturando filmes portugueses com networking. De noites solitárias a construir amizades e conexões profissionais!",
      rating: 5,
      relationship: "Organizador de Eventos Culturais & Networking"
    },
    {
      name: "Ana Ferreira",
      age: "34", 
      location: "Stockwell, Londres",
      imageId: "ana-ferreira",
      quote: "Minha alma brasileira tinha saudades até a LusoTown me ajudar a encontrar workshops de dança brasileira no Southbank Centre. Aprendendo passos de samba com corações portugueses que entendem nossa alegria! De sentir falta do calor brasileiro a criar nossa própria comunidade tropical londrina. Agora dançamos juntos todas as semanas!",
      rating: 5,
      relationship: "Líder de Dança & Comunidade Social Brasileira"
    },
    {
      name: "Miguel Santos",
      age: "32",
      location: "Elephant & Castle, Londres", 
      imageId: "miguel-santos",
      quote: "Através da LusoTown encontrei uma noite de fado mágica no Southbank Centre que curou minha saudade londrina. Ouvindo 'Lágrima' sob as estrelas do Tamisa, rodeado de almas portuguesas partilhando a mesma dor de casa... lágrimas de reconhecimento, não tristeza. Agora encontramo-nos mensalmente, vozes unindo melodias antigas.",
      rating: 5,
      relationship: "Alma do Fado & Guardião da Herança Cultural"
    },
    {
      name: "Joana Silva",
      age: "29",
      location: "Canary Wharf, Londres",
      imageId: "joana-silva",
      quote: "Comecei a frequentar workshops de culinária portuguesa através da LusoTown para aprender as receitas perdidas da minha avó. Descobri outros corações portugueses famintos por sabores autênticos. Agora organizamos jantares 'Sabores & Histórias' partilhando pratos tradicionais enquanto construímos redes profissionais. Comida conecta, amizade segue!",
      rating: 5,
      relationship: "Cultura Culinária & Networking Profissional"
    },
    {
      name: "Pedro Costa",
      age: "41",
      location: "Hampstead, Londres",
      imageId: "pedro-costa",
      quote: "Encontrei clube de livros português através da LusoTown discutindo literatura lusófona nas bibliotecas de Hampstead. Da poesia de Pessoa aos romances portugueses modernos, partilhando pensamentos com almas que entendem saudade literária. Discussões tornaram-se workshops de IA quando percebemos que muitos eram profissionais tech!",
      rating: 5,
      relationship: "Literatura & Construtor de Comunidade Tech"
    },
    {
      name: "Teresa Rodrigues",
      age: "37",
      location: "Brixton, Londres",
      imageId: "teresa-rodrigues",
      quote: "De tocar morna sozinha no meu apartamento em Brixton, sentindo falta da alma musical de Cabo Verde, a descobrir noites de apreciação musical portuguesa através da LusoTown. Começou com 6 almas saudosas, agora 'Música Lusófona' atrai 100+ pessoas partilhando nossa herança musical diversa. Música cura, comunidade amplifica!",
      rating: 5,
      relationship: "Apreciação Musical & Unidade Cultural"
    },
    {
      name: "Ricardo Oliveira",
      age: "30",
      location: "Greenwich, Londres",
      imageId: "ricardo-oliveira",
      quote: "Juntei-me a festas para ver futebol português através da LusoTown só para ver jogos de Portugal com pessoas que entendem nossa paixão. Começámos com 8 amigos em pubs locais, agora organizamos churrascos de fim de semana no Greenwich Park para 200+ famílias portuguesas. Do futebol aos piqueniques comunitários!",
      rating: 5,
      relationship: "Organizador de Comunidade Desportiva & Social"
    },
    {
      name: "Fernanda Santos",
      age: "26",
      location: "King's Cross, Londres",
      imageId: "fernanda-santos",
      quote: "Descobri sessões de intercâmbio de língua portuguesa através da LusoTown, perfeitas para manter meu português enquanto melhoro o inglês. Conheci falantes brasileiros, portugueses e africanos criando harmonia linguística linda. Do intercâmbio a workshops de salsa a networking profissional - LusoTown tornou-se minha porta para a diversa comunidade lusófona!",
      rating: 5,
      relationship: "Intercâmbio Linguístico & Ponte Cultural"
    },
    {
      name: "António Pereira",
      age: "45",
      location: "City de Londres",
      imageId: "antonio-pereira",
      quote: "Comecei a participar em caminhadas pela herança portuguesa através das áreas históricas de Londres via LusoTown. Aprendendo sobre contribuições portuguesas à cultura britânica enquanto conhecia entusiastas da história. Essas conexões culturais evoluíram naturalmente para networking empresarial. História conecta corações, negócios seguem naturalmente!",
      rating: 5,
      relationship: "Tours de Herança & Desenvolvimento Empresarial"
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
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-secondary-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-accent-200 via-coral-100 to-secondary-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-tr from-secondary-200 via-accent-100 to-action-100 rounded-full opacity-25 animate-pulse animation-delay-400"></div>
        <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-gradient-to-r from-accent-100 via-secondary-100 to-coral-100 rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2 animate-pulse animation-delay-200"></div>
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-secondary-400 rounded-full opacity-40"></div>
        <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-accent-400 rounded-full"></div>
        <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-action-400 rounded-full opacity-50"></div>
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

        {/* Testimonials Grid - Enhanced Multi-Column Responsive Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-7 lg:gap-8 xl:gap-10"
        >
          {currentTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              className="group"
            >
              <div className="card p-4 sm:p-6 md:p-7 lg:p-8 h-full hover:scale-105 transition-all duration-300 group-hover:shadow-2xl bg-white/80 backdrop-blur-sm border border-white/50">
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
                    <Image 
                      width={56}
                      height={56}
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
              Meet Your <span className="gradient-text">London Portuguese Community</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of Portuguese speakers across London who are organizing events, building communities, and connecting throughout the city.
            </p>
          </div>
          
          {/* Photo Grid - Enhanced Multi-Column Layout */}
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 xs:gap-3 sm:gap-4 md:gap-5 mb-12">
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
                <Image 
                  width={400}
                  height={400}
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <div>
                <p className="text-4xl font-bold text-primary-500 mb-2">4.9/5</p>
                <p className="text-gray-600">Average Rating</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-secondary-500 mb-2">8K+</p>
                <p className="text-gray-600">London Members</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-accent-500 mb-2">32+</p>
                <p className="text-gray-600">London Boroughs</p>
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
            Ready to Connect with Portuguese Speakers in London?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of Portuguese speakers across London who are organizing events, building communities, and creating lasting connections throughout the city.
          </p>
          <a href="/signup" className="btn-primary text-lg px-10 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 inline-block">
            Join the London Community
          </a>
        </motion.div>
      </div>
    </section>
  )
}