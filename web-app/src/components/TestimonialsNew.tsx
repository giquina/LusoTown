'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

const TestimonialsNew: React.FC = () => {
  const { t, language } = useLanguage()

  const testimonials = [
    {
      name: 'Maria Silva',
      location: 'Londres',
      flag: '🇵🇹',
      text: language === 'pt' 
        ? 'LusoTown me ajudou a encontrar minha comunidade portuguesa em Londres. Incrível!'
        : 'LusoTown helped me find my Portuguese community in London. Amazing!'
    },
    {
      name: 'João Santos',
      location: 'Manchester', 
      flag: '🇧🇷',
      text: language === 'pt'
        ? 'Como brasileiro no Reino Unido, encontrei aqui muitos amigos lusófonos.'
        : 'As a Brazilian in the UK, I found many Portuguese-speaking friends here.'
    },
    {
      name: 'Ana Costa',
      location: 'Birmingham',
      flag: '🇦🇴',
      text: language === 'pt'
        ? 'A comunidade angolana aqui é muito acolhedora através do LusoTown.'
        : 'The Angolan community here is very welcoming through LusoTown.'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'pt' ? 'O que nossa comunidade diz' : 'What our community says'}
          </h2>
          <p className="text-xl text-gray-600">
            {language === 'pt' 
              ? 'Histórias reais de portugueses falantes no Reino Unido'
              : 'Real stories from Portuguese speakers in the UK'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{testimonial.flag}</span>
                <div>
                  <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsNew
