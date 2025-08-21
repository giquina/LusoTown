'use client'

import { motion } from 'framer-motion'
import { ROUTES } from '@/config'
import { HeartIcon, StarIcon } from '@heroicons/react/24/outline'
import { ROUTES } from '@/config'
import { useLanguage } from '@/context/LanguageContext'
import { ROUTES } from '@/config'

interface QuickTestimonial {
  name: string
  age: number
  origin: string
  quote_pt: string
  quote_en: string
  category: string
  outcome: string
}

const quickTestimonials: QuickTestimonial[] = [
  {
    name: 'Ana Catarina',
    age: 28,
    origin: 'Porto',
    quote_pt: 'Encontrei não só o amor, mas alguém que entende a minha alma portuguesa.',
    quote_en: 'I found not just love, but someone who understands my Portuguese soul.',
    category: 'Found Love',
    outcome: 'Engaged to Ricardo from Braga'
  },
  {
    name: 'Mariana Santos',
    age: 35,
    origin: 'Lisboa',
    quote_pt: 'Dois portugueses em Londres podem conquistar a Europa inteira.',
    quote_en: 'Two Portuguese in London can conquer all of Europe.',
    category: 'Business Partners',
    outcome: 'Co-founded FinTech startup, raised £3.2M'
  },
  {
    name: 'Isabel Rodrigues',
    age: 38,
    origin: 'Braga',
    quote_pt: 'As nossas crianças não vão esquecer de onde vêm.',
    quote_en: 'Our children will not forget where they come from.',
    category: 'Community Family',
    outcome: 'Created Portuguese Saturday school with 120+ children'
  }
]

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export default function QuickTestimonials() {
  const { t, language } = useLanguage()

  return (
    <section className="py-12 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container-width section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {language === 'pt' ? 'Histórias de Sucesso' : 'Success Stories'}
          </h3>
          <p className="text-gray-600">
            {language === 'pt' 
              ? 'Verdadeiras conexões portuguesas que mudaram vidas em Londres'
              : 'Real Portuguese connections that changed lives in London'}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {quickTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/60 h-full flex flex-col">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-1 bg-gradient-to-r from-secondary-100 to-accent-100 text-secondary-800 text-xs font-bold px-3 py-1 rounded-full mb-4 self-start">
                  <HeartIcon className="h-3 w-3" />
                  {testimonial.category}
                </div>

                {/* Stars */}
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 italic mb-4 leading-relaxed flex-grow">
                  "{language === 'pt' ? testimonial.quote_pt : testimonial.quote_en}"
                </blockquote>

                {/* Attribution */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}, {testimonial.age}
                      </div>
                      <div className="text-sm text-gray-600">
                        {language === 'pt' ? 'Do' : 'From'} {testimonial.origin}
                      </div>
                    </div>
                    <div className="text-2xl">
                      {testimonial.origin.includes('Porto') || testimonial.origin.includes('Lisboa') || testimonial.origin.includes('Braga') ? '🇵🇹' : 
                       testimonial.origin.includes('São Paulo') ? '🇧🇷' : '🌍'}
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-green-700 font-medium">
                    ✓ {testimonial.outcome}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-10"
        >
          <p className="text-gray-600 mb-6">
            {language === 'pt'
              ? 'Junte-se a centenas de portugueses que já encontraram conexões autênticas'
              : 'Join hundreds of Portuguese speakers who found authentic connections'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/success-stories" 
              className="inline-flex items-center justify-center bg-white text-secondary-600 hover:bg-gray-50 border-2 border-secondary-200 hover:border-secondary-300 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {language === 'pt' ? 'Ver Mais Histórias' : 'Read More Stories'}
            </a>
            <a 
              href={ROUTES.auth.signup} 
              className="inline-flex items-center justify-center bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {language === 'pt' ? 'Começar Agora' : 'Start Now'}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}