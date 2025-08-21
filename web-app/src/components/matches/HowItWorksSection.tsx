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
        : 'Create a profile that reflects your Portuguese heritage, cultural interests, UK location, and what you\'re looking for in a connection.',
      features: [
        isPortuguese ? 'Região portuguesa de origem' : 'Portuguese region of origin',
        isPortuguese ? 'Tradições culturais favoritas' : 'Favorite cultural traditions',
        isPortuguese ? 'Nível de fluência em português' : 'Portuguese fluency level',
        isPortuguese ? 'Interesses e hobbies' : 'Interests and hobbies'
      ]
    },
    {
      step: 2,
      icon: ChartBarIcon,
      title: isPortuguese ? 'Algoritmo de Compatibilidade Cultural' : 'Cultural Compatibility Algorithm',
      description: isPortuguese
        ? 'O nosso algoritmo analisa múltiplas dimensões da compatibilidade cultural portuguesa para encontrar as melhores correspondências.'
        : 'Our algorithm analyzes multiple dimensions of Portuguese cultural compatibility to find your best matches.',
      features: [
        isPortuguese ? 'Valores culturais partilhados' : 'Shared cultural values',
        isPortuguese ? 'Proximidade geográfica no Reino Unido' : 'Geographic proximity in the UK',
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
        isPortuguese ? 'Grupos locais de português' : 'Local Portuguese groups',
        isPortuguese ? 'Sugestões de encontros culturais' : 'Cultural meetup suggestions'
      ]
    }
  ];

  const algorithmFeatures = [
    {
      icon: GlobeEuropeAfricaIcon,
      title: isPortuguese ? 'Diversidade Lusófona' : 'Lusophone Diversity',
      description: isPortuguese
        ? 'Celebramos a riqueza da comunidade portuguesa global - desde Portugal ao Brasil, Angola a Cabo Verde.'
        : 'We celebrate the richness of the global Portuguese community - from Portugal to Brazil, Angola to Cape Verde.'
    },
    {
      icon: MapPinIcon,
      title: isPortuguese ? 'Localização no Reino Unido' : 'UK Location-Based',
      description: isPortuguese
        ? 'Encontre pessoas na sua área - Londres, Manchester, Birmingham, ou qualquer cidade no Reino Unido.'
        : 'Find people in your area - London, Manchester, Birmingham, or any city across the United Kingdom.'
    },
    {
      icon: ShieldCheckIcon,
      title: isPortuguese ? 'Verificação Cultural' : 'Cultural Verification',
      description: isPortuguese
        ? 'Todos os perfis são verificados para garantir ligações autênticas dentro da comunidade portuguesa.'
        : 'All profiles are verified to ensure authentic connections within the Portuguese community.'
    },
    {
      icon: CalendarIcon,
      title: isPortuguese ? 'Integração de Eventos' : 'Event Integration',
      description: isPortuguese
        ? 'Encontre matches que frequentam os mesmos eventos culturais portugueses no Reino Unido.'
        : 'Find matches who attend the same Portuguese cultural events across the UK.'
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
        ? 'Partilhe as suas experiências reais como português no Reino Unido. A autenticidade cria conexões mais profundas.'
        : 'Share your real experiences as a Portuguese person in the UK. Authenticity creates deeper connections.'
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
    <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100 to-secondary-100 px-4 py-2 rounded-full mb-4">
                <BoltIcon className="w-5 h-5 text-primary-600" />
                <span className="text-primary-700 font-semibold text-sm">
                  {isPortuguese ? 'Como Funciona' : 'How It Works'}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
                {isPortuguese 
                  ? 'O Seu Caminho para Conexões Portuguesas Autênticas'
                  : 'Your Path to Authentic Portuguese Connections'}
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                {isPortuguese
                  ? 'Desenvolvemos um algoritmo especializado que compreende as nuances da cultura portuguesa e conecta pessoas com base em valores, tradições e experiências partilhadas.'
                  : 'We\'ve developed a specialized algorithm that understands the nuances of Portuguese culture and connects people based on shared values, traditions, and experiences.'}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-xl border-2 border-primary-200 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>
                <ul className="text-left space-y-2">
                  {step.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
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
                  ? 'Algoritmo Especializado para a Comunidade Portuguesa'
                  : 'Specialized Algorithm for the Portuguese Community'}
              </h2>
              <p className="text-white/90 text-lg max-w-3xl mx-auto">
                {isPortuguese
                  ? 'Ao contrário de outras plataformas, o nosso algoritmo foi desenvolvido especificamente para compreender e celebrar a diversidade da cultura portuguesa.'
                  : 'Unlike other platforms, our algorithm was specifically developed to understand and celebrate the diversity of Portuguese culture.'}
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
                  ? 'Siga estas dicas comprovadas para obter melhores correspondências e criar conexões mais significativas na comunidade portuguesa.'
                  : 'Follow these proven tips to get better matches and create more meaningful connections in the Portuguese community.'}
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

          {/* Success Stats */}
          <div className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 md:p-12">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                {isPortuguese ? 'Resultados Comprovados' : 'Proven Results'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">94%</div>
                  <div className="text-white/90 font-medium">
                    {isPortuguese ? 'Taxa de Compatibilidade' : 'Compatibility Rate'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">2.3</div>
                  <div className="text-white/90 font-medium">
                    {isPortuguese ? 'Dias Médios para Match' : 'Average Days to Match'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">87%</div>
                  <div className="text-white/90 font-medium">
                    {isPortuguese ? 'Encontram-se Pessoalmente' : 'Meet in Person'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}