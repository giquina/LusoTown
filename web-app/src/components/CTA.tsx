'use client'

import { motion } from 'framer-motion'
import { ArrowRightIcon, CheckIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

const getBenefits = (t: any) => [
  t('cta.benefits.join-community', "Join the Luso-London community"),
  t('cta.benefits.cultural-access', "Access to Portuguese cultural events"), 
  t('cta.benefits.find-businesses', "Find Portuguese businesses and services"),
  t('cta.benefits.connect-diaspora', "Connect with the Portuguese diaspora"),
  t('cta.benefits.safe-environment', "Safe and welcoming environment"),
  t('cta.benefits.free-start', "Free to get started")
]

export default function CTA() {
  const { t } = useLanguage()
  const benefits = getBenefits(t)
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="container-width section-padding relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white font-medium mb-6 border border-white/30">
              <SparklesIcon className="h-4 w-4" />
              Limited Time - Join Today
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              A Sua Comunidade Está Aqui
            </h2>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Não passe mais fins-de-semana sozinho. Junte-se ao LusoTown London hoje e descubra a comunidade portuguesa que procurava.
            </p>
          </motion.div>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 max-w-3xl mx-auto"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              >
                <CheckIcon className="h-5 w-5 text-white flex-shrink-0" />
                <span className="text-white font-medium">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6"
          >
            <a href="/signup" className="bg-white text-primary-600 hover:bg-gray-50 font-bold text-lg sm:text-xl px-10 sm:px-16 py-5 sm:py-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 group inline-flex items-center">
              JOIN NOW
              <ArrowRightIcon className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            
            <p className="text-white/80 text-sm">
              Sem compromisso • Comece a conectar-se imediatamente • Cancele quando quiser
            </p>
          </motion.div>

          {/* Urgency/Scarcity */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white"
                    style={{
                      backgroundColor: `hsl(${(i * 60) % 360}, 70%, 60%)`,
                    }}
                  />
                ))}
              </div>
            </div>
            <p className="text-white font-semibold text-lg mb-2">
              23 portugueses juntaram-se nas últimas 24 horas
            </p>
            <p className="text-white/80">
              Junte-se agora e conecte-se com a comunidade luso-londrina em 48 horas
            </p>
          </motion.div>

          {/* Trust Signals - Enhanced Multi-Column Layout */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12 grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 text-white/80"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">100%</div>
              <div className="text-sm">Perfis Verificados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm">Apoio Comunitário</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">30-Dias</div>
              <div className="text-sm">Garantia Satisfação</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}