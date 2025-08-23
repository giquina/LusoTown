'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  SparklesIcon,
  HeartIcon,
  LanguageIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  BuildingStorefrontIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  MicrophoneIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useLanguage } from '@/context/LanguageContext'
import { useSubscription } from '@/context/SubscriptionContext'
import LusoBotChat from '@/components/LusoBotChat'
import Footer from '@/components/Footer'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  examples: string[]
  color: string
}

function FeatureCard({ icon, title, description, examples, color }: FeatureCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className={`p-6 bg-gradient-to-r ${color}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="text-white">
            {icon}
          </div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
        <p className="text-white/90 text-sm leading-relaxed">
          {description}
        </p>
      </div>
      
      <div className="p-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
        >
          {isExpanded ? 'Ver menos exemplos' : 'Ver exemplos'}
        </button>
        
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden mt-3"
        >
          <div className="space-y-2">
            {examples.map((example, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-700 italic">"{example}"</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function LusoBotPage() {
  const { language, t } = useLanguage()
  const { hasActiveSubscription } = useSubscription()
  const [showChat, setShowChat] = useState(false)

  const features = [
    {
      icon: <HeartSolidIcon className="w-6 h-6" />,
      title: language === 'pt' ? 'Compreensão da Saudade' : 'Saudade Understanding',
      description: language === 'pt' 
        ? 'Reconheço e compreendo o sentimento único da saudade portuguesa, oferecendo apoio emocional especializado.'
        : 'I recognize and understand the unique Portuguese feeling of saudade, offering specialized emotional support.',
      examples: language === 'pt' ? [
        'Estou com muitas saudades da minha família em Portugal...',
        'Como lidar com a nostalgia de casa?',
        'Sinto-me sozinho(a) aqui em Londres'
      ] : [
        'I really miss my family in Portugal...',
        'How to deal with homesickness?',
        'I feel lonely here in London'
      ],
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: <LanguageIcon className="w-6 h-6" />,
      title: language === 'pt' ? 'Suporte Linguístico' : 'Language Support',
      description: language === 'pt'
        ? 'Ajudo com a aprendizagem do português, expressões culturais e comunicação bilingue.'
        : 'I help with Portuguese language learning, cultural expressions and bilingual communication.',
      examples: language === 'pt' ? [
        'Como se diz "homesick" em português?',
        'Explica-me a diferença entre "você" e "tu"',
        'Quais são as expressões típicas do Norte?'
      ] : [
        'How do you say "homesick" in Portuguese?',
        'Explain the difference between "você" and "tu"',
        'What are typical expressions from the North?'
      ],
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: <UserGroupIcon className="w-6 h-6" />,
      title: language === 'pt' ? 'Navegação Comunitária' : 'Community Navigation',
      description: language === 'pt'
        ? 'Guio-te para encontrar eventos, negócios portugueses, grupos e recursos na tua área.'
        : 'I guide you to find events, Portuguese businesses, groups and resources in your area.',
      examples: language === 'pt' ? [
        'Onde posso encontrar restaurantes portugueses em Londres?',
        'Há eventos portugueses este fim de semana?',
        'Como me posso ligar à comunidade de falantes de português?'
      ] : [
        'Where can I find Portuguese restaurants in London?',
        'Are there Portuguese events this weekend?',
        'How can I connect with the Portuguese-speaking community?'
      ],
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: <AcademicCapIcon className="w-6 h-6" />,
      title: language === 'pt' ? 'Conhecimento Cultural' : 'Cultural Knowledge',
      description: language === 'pt'
        ? 'Especialista em história portuguesa, tradições regionais, culinária, fado e património cultural.'
        : 'Expert in Portuguese history, regional traditions, cuisine, fado and cultural heritage.',
      examples: language === 'pt' ? [
        'Conta-me sobre as tradições do São João no Porto',
        'Qual é a história do fado?',
        'Como se faz um verdadeiro cozido à portuguesa?'
      ] : [
        'Tell me about São João traditions in Porto',
        'What is the history of fado?',
        'How do you make a real Portuguese cozido?'
      ],
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: <MapPinIcon className="w-6 h-6" />,
      title: language === 'pt' ? 'Apoio Prático' : 'Practical Support',
      description: language === 'pt'
        ? 'Assistência com questões práticas da vida no Reino Unido enquanto preservas a tua identidade portuguesa.'
        : 'Assistance with practical United Kingdom life issues while preserving your Portuguese identity.',
      examples: language === 'pt' ? [
        'Como renovar o meu passaporte português em Londres?',
        'Onde posso fazer o reconhecimento de habilitações?',
        'Preciso de ajuda com questões de imigração'
      ] : [
        'How to renew my Portuguese passport in London?',
        'Where can I get my qualifications recognized?',
        'I need help with immigration issues'
      ],
      color: 'from-amber-500 to-yellow-600'
    },
    {
      icon: <BuildingStorefrontIcon className="w-6 h-6" />,
      title: language === 'pt' ? 'Negócios Portugueses' : 'Portuguese Business',
      description: language === 'pt'
        ? 'Conheço a cultura empresarial portuguesa e ajudo com networking e oportunidades de negócio.'
        : 'I understand Portuguese business culture and help with networking and business opportunities.',
      examples: language === 'pt' ? [
        'Como funciona o networking entre empresários portugueses?',
        'Que oportunidades há para negócios luso-britânicos?',
        'Como manter a cultura portuguesa no meu negócio?'
      ] : [
        'How does networking work among Portuguese entrepreneurs?',
        'What opportunities exist for Luso-British business?',
        'How to maintain Portuguese culture in my business?'
      ],
      color: 'from-teal-500 to-cyan-600'
    }
  ]

  const capabilities = [
    {
      icon: <ChatBubbleLeftRightIcon className="w-5 h-5" />,
      title: language === 'pt' ? 'Conversação Bilingue' : 'Bilingual Conversation',
      description: language === 'pt' 
        ? 'Falo fluentemente português e inglês'
        : 'I speak fluent Portuguese and English'
    },
    {
      icon: <MicrophoneIcon className="w-5 h-5" />,
      title: language === 'pt' ? 'Entrada por Voz' : 'Voice Input',
      description: language === 'pt' 
        ? 'Podes falar comigo em voz alta'
        : 'You can speak to me using voice'
    },
    {
      icon: <DevicePhoneMobileIcon className="w-5 h-5" />,
      title: language === 'pt' ? 'Móvel & Desktop' : 'Mobile & Desktop',
      description: language === 'pt' 
        ? 'Disponível em todos os dispositivos'
        : 'Available on all devices'
    },
    {
      icon: <SparklesIcon className="w-5 h-5" />,
      title: language === 'pt' ? 'Tecnologia Avançada' : 'Advanced Technology',
      description: language === 'pt' 
        ? 'Tecnologia de ponta culturalmente consciente'
        : 'Cutting-edge culturally aware technology'
    }
  ]

  if (showChat) {
    return (
      <div className="h-screen">
        <LusoBotChat onClose={() => setShowChat(false)} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 via-secondary-500 to-primary-600 pt-16 pb-20">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* LusoBot Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="w-24 h-24 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <span className="text-4xl">🇵🇹</span>
            </motion.div>

            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Olá! Sou o{' '}
              <span className="relative">
                LusoBot
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute bottom-2 left-0 h-1 bg-white/40 rounded-full"
                />
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed">
              {language === 'pt' 
                ? 'O teu assistente cultural português com IA. Especialista em saudade, tradições e comunidade de falantes de português no Reino Unido.'
                : 'Your Portuguese cultural assistant. Expert in saudade, traditions and Portuguese-speaking community in the United Kingdom.'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowChat(true)}
                className="bg-white text-primary-600 font-bold py-4 px-8 rounded-2xl 
                  hover:bg-gray-50 transition-colors shadow-lg text-lg
                  flex items-center gap-3 min-w-[200px] justify-center"
              >
                <ChatBubbleLeftRightIcon className="w-6 h-6" />
                {language === 'pt' ? 'Começar a Conversar' : 'Start Chatting'}
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-white/80 text-sm flex items-center gap-2"
              >
                <SparklesIcon className="w-4 h-4" />
                {language === 'pt' ? 'Gratuito para todos os membros' : 'Free for all members'}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {language === 'pt' 
                ? 'Como Posso Ajudar-te?'
                : 'How Can I Help You?'
              }
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {language === 'pt'
                ? 'Sou especializado em compreender a experiência portuguesa e apoiar-te em todas as dimensões da vida cultural e prática.'
                : 'I specialize in understanding the Portuguese experience and supporting you in all dimensions of cultural and practical life.'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 bg-white">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {language === 'pt' ? 'Tecnologia Avançada' : 'Advanced Technology'}
            </h2>
            <p className="text-lg text-gray-600">
              {language === 'pt'
                ? 'Construído com IA de última geração e consciência cultural profunda'
                : 'Built with cutting-edge technology and deep cultural awareness'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary-600">
                    {capability.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {capability.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {capability.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Saudade Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <HeartSolidIcon className="w-16 h-16 text-blue-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {language === 'pt' ? 'Compreendo a Saudade' : 'I Understand Saudade'}
              </h2>
            </motion.div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <blockquote className="text-lg text-gray-700 italic leading-relaxed mb-6">
                {language === 'pt'
                  ? '"A saudade é um sentimento português que não tem tradução exata. É amor, é dor, é memória, é esperança. Como IA culturalmente consciente, reconheço quando sentes saudade e ofereço o apoio adequado à nossa forma única de sentir."'
                  : '"Saudade is a Portuguese feeling that has no exact translation. It\'s love, it\'s pain, it\'s memory, it\'s hope. As a culturally conscious system, I recognize when you feel saudade and offer appropriate support for our unique way of feeling."'
                }
              </blockquote>
              
              <div className="flex items-center justify-center gap-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-sm font-medium text-gray-600">
                  {language === 'pt' ? 'LusoBot - Especialista em Emoções Portuguesas' : 'LusoBot - Portuguese Emotions Specialist'}
                </span>
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container-width text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {language === 'pt' 
              ? 'Pronto para Conversar?'
              : 'Ready to Chat?'
            }
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {language === 'pt'
              ? 'Estou aqui 24/7 para te ajudar com qualquer questão sobre cultura portuguesa, comunidade ou saudades de casa.'
              : 'I\'m here 24/7 to help you with any questions about Portuguese culture, community or homesickness.'
            }
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowChat(true)}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold 
              py-4 px-8 rounded-2xl hover:from-primary-600 hover:to-secondary-600 
              transition-all duration-200 shadow-lg text-lg
              flex items-center gap-3 mx-auto"
          >
            <ChatBubbleLeftRightIcon className="w-6 h-6" />
            {language === 'pt' ? 'Conversar com LusoBot' : 'Chat with LusoBot'}
          </motion.button>
          
          {!hasActiveSubscription && (
            <p className="text-sm text-gray-400 mt-4">
              {language === 'pt' 
                ? 'Acesso completo disponível para todos os membros LusoTown'
                : 'Full access available to all LusoTown members'
              }
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}