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
      location: "Shoreditch, London",
      imageId: "carlos-silva",
      quote: "I was tired of going to bars alone. Through LusoTown, I found my Portuguese crew for nights out, brunches, and gym sessions. London feels like home now - we're a proper squad!",
      rating: 5,
      relationship: "Found his Portuguese social circle"
    },
    {
      name: "Ana Ferreira",
      age: "26", 
      location: "Elephant & Castle, London",
      imageId: "ana-ferreira",
      quote: "As a Brazilian professional, I was struggling with London's social scene. LusoTown connected me with amazing Portuguese speakers who love cocktails, rooftop bars, and weekend adventures just like me.",
      rating: 5,
      relationship: "Brazilian nightlife enthusiast"
    },
    {
      name: "Miguel Santos",
      age: "32",
      location: "Vauxhall, London", 
      imageId: "miguel-santos",
      quote: "Moving from Lisbon to London at 30, I thought my party days were over. Wrong! My LusoTown crew showed me the best Portuguese clubs, secret speakeasies, and we have legendary Saturday brunches.",
      rating: 5,
      relationship: "Lisbon party scene in London"
    },
    {
      name: "Joana Silva",
      age: "29",
      location: "South Lambeth, London",
      imageId: "joana-silva",
      quote: "I used to spend weekends alone watching Netflix. Now I have a Portuguese gang for bottomless brunches, gym classes, and exploring London's nightlife. We're inseparable!",
      rating: 5,
      relationship: "Weekend warriors"
    },
    {
      name: "Pedro Costa",
      age: "31",
      location: "Brixton, London",
      imageId: "pedro-costa",
      quote: "Being Portuguese in London's finance world was lonely until LusoTown. Now I have friends for after-work drinks, weekend football, and the occasional wild night in Soho.",
      rating: 5,
      relationship: "Professional social network"
    },
    {
      name: "Teresa Rodrigues",
      age: "27",
      location: "Oval, London",
      imageId: "teresa-rodrigues",
      quote: "From Cape Verde to London's club scene - LusoTown introduced me to Portuguese friends who love dancing salsa, trying new restaurants, and exploring London's hidden gems together.",
      rating: 5,
      relationship: "Cape Verdean dance crew"
    }
  ],
  pt: [
    {
      name: "Carlos Silva",
      age: "28",
      location: "Shoreditch, Londres",
      imageId: "carlos-silva",
      quote: "Estava farto de ir aos bares sozinho. Através da LusoTown, encontrei a minha crew portuguesa para noitadas, brunches e sessões de ginásio. Londres agora parece casa!",
      rating: 5,
      relationship: "Encontrou o seu círculo social português"
    },
    {
      name: "Ana Ferreira",
      age: "26", 
      location: "Elephant & Castle, Londres",
      imageId: "ana-ferreira",
      quote: "Como profissional brasileira, estava a lutar com a cena social de Londres. A LusoTown conectou-me com lusófonos incríveis que adoram cocktails, bares no topo e aventuras de fim de semana como eu.",
      rating: 5,
      relationship: "Entusiasta brasileira da vida noturna"
    },
    {
      name: "Miguel Santos",
      age: "32",
      location: "Vauxhall, Londres", 
      imageId: "miguel-santos",
      quote: "Mudando de Lisboa para Londres aos 30, pensei que os meus dias de festa tinham acabado. Errado! A minha crew da LusoTown mostrou-me os melhores clubes portugueses e temos brunches lendários aos sábados.",
      rating: 5,
      relationship: "Cena de festa de Lisboa em Londres"
    },
    {
      name: "Joana Silva",
      age: "29",
      location: "South Lambeth, Londres",
      imageId: "joana-silva",
      quote: "Costumava passar fins de semana sozinha a ver Netflix. Agora tenho uma gang portuguesa para brunches ilimitados, aulas de ginásio e explorar a vida noturna de Londres. Somos inseparáveis!",
      rating: 5,
      relationship: "Guerreiras de fim de semana"
    },
    {
      name: "Pedro Costa",
      age: "31",
      location: "Brixton, Londres",
      imageId: "pedro-costa",
      quote: "Ser português no mundo financeiro de Londres era solitário até à LusoTown. Agora tenho amigos para bebidas pós-trabalho, futebol de fim de semana e a ocasional noite selvagem no Soho.",
      rating: 5,
      relationship: "Rede social profissional"
    },
    {
      name: "Teresa Rodrigues",
      age: "27",
      location: "Oval, Londres",
      imageId: "teresa-rodrigues",
      quote: "De Cabo Verde para a cena de clubes de Londres - a LusoTown apresentou-me amigos portugueses que adoram dançar salsa, experimentar restaurantes novos e explorar as jóias escondidas de Londres juntos.",
      rating: 5,
      relationship: "Crew de dança cabo-verdiana"
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">{t('testimonials.title')}</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
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
              Meet Your <span className="gradient-text">Portuguese Social Circle</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join hundreds of Portuguese speakers (21+) who are building genuine friendships and having amazing nights out in London.
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
                <p className="text-4xl font-bold text-secondary-400 mb-2">500+</p>
                <p className="text-gray-600">Active Members (21+)</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-red-400 mb-2">95%</p>
                <p className="text-gray-600">Found Real Friendships</p>
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
            Ready to Find Your Portuguese Squad?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of Portuguese speakers (21+) who found their tribe for London's best nights out, brunches, and social adventures.
          </p>
          <a href="/signup" className="btn-primary text-lg px-10 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 inline-block">
            Join the Social Revolution
          </a>
        </motion.div>
      </div>
    </section>
  )
}