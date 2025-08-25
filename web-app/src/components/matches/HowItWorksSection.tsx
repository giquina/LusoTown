"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
  ChartBarIcon,
  BoltIcon,
  ShieldCheckIcon,
  GlobeEuropeAfricaIcon,
  LightBulbIcon,
  TrophyIcon,
  HeartIcon,
  UserGroupIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

export default function HowItWorksSection() {
  const { language } = useLanguage();
  const isPortuguese = language === 'pt';

  const steps = [
    {
      step: 1,
      icon: UserGroupIcon,
      title: isPortuguese ? 'Perfil Cultural Detalhado' : 'Detailed Cultural Profile',
      description: isPortuguese 
        ? 'Crie um perfil que reflete a sua herança portuguesa, interesses culturais, localização no Reino Unido e o que procura numa conexão.'
        : 'Create a profile that reflects your Portuguese heritage, cultural interests, United Kingdom location, and what you\'re looking for in a connection.',
      features: [
        isPortuguese ? 'Região portuguesa de origem' : 'Lusophone region of origin',
        isPortuguese ? 'Tradições culturais favoritas' : 'Favorite cultural traditions',
        isPortuguese ? 'Nível de fluência em português' : 'Lusophone fluency level',
        isPortuguese ? 'Interesses e hobbies' : 'Interests and hobbies'
      ]
    },
    {
      step: 2,
      icon: ChartBarIcon,
      title: isPortuguese ? 'Algoritmo de Compatibilidade Cultural' : 'Cultural Compatibility Algorithm',
      description: isPortuguese
        ? 'O nosso algoritmo analisa múltiplas dimensões da compatibilidade cultural portuguesa para encontrar as melhores correspondências.'
        : 'Our algorithm analyzes multiple dimensions of Lusophone cultural compatibility to find your best matches.',
      features: [
        isPortuguese ? 'Valores culturais partilhados' : 'Shared cultural values',
        isPortuguese ? 'Proximidade geográfica no Reino Unido' : 'Geographic proximity in the United Kingdom',
        isPortuguese ? 'Interesses e objetivos comuns' : 'Common interests and goals',
        isPortuguese ? 'Preferências de comunicação' : 'Communication preferences'
      ]
    },
    {
      step: 3,
      icon: HeartIcon,
      title: isPortuguese ? 'Matches Personalizados Diários' : 'Daily Personalized Matches',
      description: isPortuguese
        ? 'Receba matches cuidadosamente selecionados todos os dias, baseados na sua compatibilidade cultural e preferências pessoais.'
        : 'Receive carefully curated matches every day, based on your cultural compatibility and personal preferences.',
      features: [
        isPortuguese ? '3 matches gratuitos diários' : '3 free daily matches',
        isPortuguese ? 'Pontuação de compatibilidade' : 'Compatibility score',
        isPortuguese ? 'Interesses partilhados destacados' : 'Shared interests highlighted',
        isPortuguese ? 'Dicas de conversa cultural' : 'Cultural conversation starters'
      ]
    },
    {
      step: 4,
      icon: ChatBubbleLeftRightIcon,
      title: isPortuguese ? 'Conexão Autêntica' : 'Authentic Connection',
      description: isPortuguese
        ? 'Conecte-se com matches através de chat seguro e participe em eventos comunitários para conhecer pessoalmente.'
        : 'Connect with matches through secure chat and participate in community events to meet in person.',
      features: [
        isPortuguese ? 'Chat seguro e verificado' : 'Secure and verified chat',
        isPortuguese ? 'Eventos comunitários regulares' : 'Regular community events',
        isPortuguese ? 'Grupos locais de português' : 'Local Lusophone groups',
        isPortuguese ? 'Sugestões de encontros culturais' : 'Cultural meetup suggestions'
      ]
    }
  ];

  const algorithmFeatures = [
    {
      icon: GlobeEuropeAfricaIcon,
      title: isPortuguese ? 'Qualquer Falante de Português' : 'Any Lusophone Speaker Welcome',
      description: isPortuguese
        ? 'Não importa de onde você é - se você fala português, você faz parte da nossa comunidade. Portugal, Brasil, Angola, Cabo Verde, Moçambique ou qualquer lugar.'
        : 'It doesn\'t matter where you\'re from - if you speak Lusophone, you belong in our community. Portugal, Brazil, Angola, Cape Verde, Mozambique or anywhere.'
    },
    {
      icon: MapPinIcon,
      title: isPortuguese ? 'Localização no Reino Unido' : 'United Kingdom Location-Based',
      description: isPortuguese
        ? 'Encontre pessoas na sua área - Londres, Manchester, Birmingham, ou qualquer cidade no Reino Unido.'
        : 'Find people in your area - London, Manchester, Birmingham, or any city across the United Kingdom.'
    },
    {
      icon: ShieldCheckIcon,
      title: isPortuguese ? 'Verificação Cultural' : 'Cultural Verification',
      description: isPortuguese
        ? 'Todos os perfis são verificados para garantir ligações autênticas entre falantes de português no Reino Unido.'
        : 'All profiles are verified to ensure authentic connections between Portuguese speakers in the United Kingdom.'
    },
    {
      icon: CalendarIcon,
      title: isPortuguese ? 'Integração de Eventos' : 'Event Integration',
      description: isPortuguese
        ? 'Conecte-se com outros falantes de português em eventos culturais lusófonos no Reino Unido.'
        : 'Connect with fellow Portuguese speakers at Lusophone cultural events across the United Kingdom.'
    }
  ];

  const tips = [
    {
      icon: LightBulbIcon,
      title: isPortuguese ? 'Complete o Seu Perfil' : 'Complete Your Profile',
      description: isPortuguese
        ? 'Perfis completos recebem 3x mais matches. Adicione fotos, descreva as suas tradições favoritas e o que o torna único.'
        : 'Complete profiles receive 3x more matches. Add photos, describe your favorite traditions and what makes you unique.'
    },
    {
      icon: SparklesIcon,
      title: isPortuguese ? 'Seja Autêntico' : 'Be Authentic',
      description: isPortuguese
        ? 'Partilhe as suas experiências reais como falante de português no Reino Unido. A autenticidade cria conexões mais profundas.'
        : 'Share your real experiences as a Portuguese speaker in the United Kingdom. Authenticity creates deeper connections.'
    },
    {
      icon: TrophyIcon,
      title: isPortuguese ? 'Participe na Comunidade' : 'Engage with Community',
      description: isPortuguese
        ? 'Participe em eventos LusoTown para conhecer os seus matches pessoalmente e expandir a sua rede social.'
        : 'Participate in LusoTown events to meet your matches in person and expand your social network.'
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-accent-200 to-coral-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
      </div>

      {/* How It Works Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg border border-primary-200">
                <BoltIcon className="w-6 h-6 text-primary-600" />
                <span className="text-primary-700 font-bold text-base">
                  {isPortuguese ? 'Como Funciona' : 'How It Works'}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6 leading-tight">
                {isPortuguese 
                  ? 'O Seu Caminho para Conectar Falantes de Português'
                  : 'Your Path to Connect with Lusophone Speakers'}
              </h2>
              <p className="text-gray-700 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-medium">
                {isPortuguese
                  ? 'Desenvolvemos um algoritmo especializado que conecta falantes de português no Reino Unido, independentemente da sua origem. Se você fala português, você pertence aqui.'
                  : 'We\'ve developed a specialized algorithm that connects Portuguese speakers across the United Kingdom, regardless of your origin. If you speak Lusophone, you belong here.'}
              </p>
            </motion.div>
          </div>

          {/* Enhanced Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                {/* Card Background with Gradient */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-primary-100 group-hover:shadow-2xl group-hover:border-primary-200 transition-all duration-300">
                  {/* Step Number Circle */}
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl shadow-lg flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-accent-500 to-coral-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {step.step}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-primary-900 mb-4 group-hover:text-primary-700 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed mb-6">
                      {step.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    {step.features.map((feature, featureIndex) => (
                      <motion.div 
                        key={featureIndex} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                        className="flex items-center gap-3 text-sm text-gray-700 bg-primary-50/50 rounded-lg px-3 py-2"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex-shrink-0"></div>
                        <span className="font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Connecting Line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary-300 to-secondary-300 transform -translate-y-1/2 z-10">
                    <div className="absolute -right-1 top-1/2 w-2 h-2 bg-secondary-400 rounded-full transform -translate-y-1/2"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Algorithm Deep Dive */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {isPortuguese 
                  ? 'Algoritmo Especializado para Falantes de Português'
                  : 'Specialized Algorithm for Lusophone Speakers'}
              </h2>
              <p className="text-white/90 text-lg max-w-3xl mx-auto">
                {isPortuguese
                  ? 'Ao contrário de outras plataformas, o nosso algoritmo foi desenvolvido especificamente para falantes de português, independentemente do país de origem.'
                  : 'Unlike other platforms, our algorithm was specifically developed for Portuguese speakers, regardless of country of origin.'}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {algorithmFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center group hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/90 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips for Success */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-100 to-accent-100 px-4 py-2 rounded-full mb-4">
                <TrophyIcon className="w-5 h-5 text-secondary-600" />
                <span className="text-secondary-700 font-semibold text-sm">
                  {isPortuguese ? 'Dicas de Sucesso' : 'Success Tips'}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-secondary-600 to-accent-600 bg-clip-text text-transparent mb-4">
                {isPortuguese 
                  ? 'Como Maximizar as Suas Correspondências'
                  : 'How to Maximize Your Matches'}
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                {isPortuguese
                  ? 'Siga estas dicas comprovadas para obter melhores correspondências e conectar-se com outros falantes de português no Reino Unido.'
                  : 'Follow these proven tips to get better matches and connect with fellow Portuguese speakers across the United Kingdom.'}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-primary-200 text-center group hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <tip.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-4">{tip.title}</h3>
                <p className="text-gray-600 leading-relaxed">{tip.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Success Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-20 relative bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 rounded-3xl p-8 md:p-12 overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div 
                className="absolute inset-0" 
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
              />
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>

            <div className="relative z-10 text-center">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                {isPortuguese ? 'Resultados Comprovados' : 'Proven Results'}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-white/90 text-lg mb-12 max-w-2xl mx-auto"
              >
                {isPortuguese 
                  ? 'Os números falam por si - nossa plataforma realmente conecta falantes de português no Reino Unido'
                  : 'The numbers speak for themselves - our platform truly connects Portuguese speakers across the United Kingdom'}
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { number: '94%', label: isPortuguese ? 'Taxa de Compatibilidade' : 'Compatibility Rate' },
                  { number: '2.3', label: isPortuguese ? 'Dias Médios para Match' : 'Average Days to Match' },
                  { number: '87%', label: isPortuguese ? 'Encontram-se Pessoalmente' : 'Meet in Person' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                  >
                    <div className="text-5xl md:text-6xl font-bold text-white mb-3">{stat.number}</div>
                    <div className="text-white/90 font-semibold text-lg">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}