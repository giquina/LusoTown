'use client'

import React, { useState, useEffect, useRef } from 'react'
import { X, MessageCircle, Heart, Users, Shield, Calendar, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
  options?: string[]
  icon?: React.ReactNode
}

const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [showWidget, setShowWidget] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()

  // Conversation flow for Portuguese social network (21+)
  const conversationFlow = {
    en: [
      {
        message: "Olá! 👋 Welcome to LusoTown London - the social network for Portuguese speakers (21+) in London! I'm here to help you find your Portuguese tribe for nightlife, events, and genuine friendships.",
        options: ["Tell me about LusoTown", "I want to meet Portuguese people", "What social events do you have?", "Just browsing"],
        icon: <Heart className="w-4 h-4 text-green-600" />
      },
      {
        message: "Fantástico! 🇵🇹 LusoTown connects Portuguese adults in London for real social experiences:\n\n🍻 Portuguese nightlife & bar crawls\n🥘 Restaurant meetups & brunches\n🏋️ Gym groups & fitness sessions\n🎉 Cultural events & parties\n\nNo more going out alone!",
        options: ["This sounds perfect!", "What about age groups?", "How do I verify I'm Portuguese?", "Tell me about safety"],
        icon: <Users className="w-4 h-4 text-red-600" />
      },
      {
        message: "We have groups for different ages and interests! 🎯\n\n👥 General 21+ social groups\n🍷 30+ professional networking & wine tastings\n💃 35+ sophisticated events & cultural experiences\n👭 Women-only groups (all ages 21+)\n\nAll verified Portuguese speakers!",
        options: ["Perfect for my age!", "What about women-only events?", "How does verification work?", "Show me upcoming events"],
        icon: <Calendar className="w-4 h-4 text-yellow-600" />
      },
      {
        message: "Amazing choice! 🌟 Our women-only groups are super popular:\n\n👭 Ladies' brunches in Portuguese areas\n🍷 Wine & cheese nights in Vauxhall\n💃 Salsa dancing classes\n🛍️ Shopping trips to Portuguese markets\n🏋️ Women's fitness groups\n\nSafe, verified, Portuguese-speaking women only!",
        options: ["I love this!", "How do I join?", "What about mixed groups too?", "Tell me about verification"],
        icon: <Shield className="w-4 h-4 text-green-600" />
      },
      {
        message: "Excelente! 🎉 Joining is super easy:\n\n1️⃣ Quick signup (must be 21+)\n2️⃣ Portuguese language verification\n3️⃣ Photo verification for safety\n4️⃣ Choose your social interests\n5️⃣ Start attending events immediately!\n\nReady to never be alone in London again?",
        options: ["Yes, let's do this!", "I have questions about age verification", "What if I'm Brazilian/Angolan?", "Take me to signup"],
        icon: <ArrowRight className="w-4 h-4 text-red-600" />
      }
    ],
    pt: [
      {
        message: "Olá! 👋 Bem-vindo à LusoTown London - a rede social para falantes de português (21+) em Londres! Estou aqui para te ajudar a encontrar a tua tribo portuguesa para vida noturna, eventos e amizades genuínas.",
        options: ["Conta-me sobre a LusoTown", "Quero conhecer portugueses", "Que eventos sociais têm?", "Só estou a ver"],
        icon: <Heart className="w-4 h-4 text-green-600" />
      },
      {
        message: "Fantástico! 🇵🇹 A LusoTown conecta adultos portugueses em Londres para experiências sociais reais:\n\n🍻 Vida noturna portuguesa & pub crawls\n🥘 Encontros em restaurantes & brunches\n🏋️ Grupos de ginásio & fitness\n🎉 Eventos culturais & festas\n\nNunca mais saias sozinho!",
        options: ["Isto parece perfeito!", "E sobre grupos etários?", "Como verifico que sou português?", "Fala-me sobre segurança"],
        icon: <Users className="w-4 h-4 text-red-600" />
      },
      {
        message: "Temos grupos para diferentes idades e interesses! 🎯\n\n👥 Grupos sociais gerais 21+\n🍷 Networking profissional 30+ & degustações de vinho\n💃 Eventos sofisticados 35+ & experiências culturais\n👭 Grupos só para mulheres (todas as idades 21+)\n\nTodos falantes de português verificados!",
        options: ["Perfeito para a minha idade!", "E eventos só para mulheres?", "Como funciona a verificação?", "Mostra-me eventos próximos"],
        icon: <Calendar className="w-4 h-4 text-yellow-600" />
      },
      {
        message: "Escolha incrível! 🌟 Os nossos grupos só para mulheres são super populares:\n\n👭 Brunches de senhoras em áreas portuguesas\n🍷 Noites de vinho & queijo em Vauxhall\n💃 Aulas de dança salsa\n🛍️ Idas às compras a mercados portugueses\n🏋️ Grupos de fitness femininos\n\nSeguro, verificado, só mulheres lusófonas!",
        options: ["Adoro isto!", "Como me junto?", "E sobre grupos mistos também?", "Fala-me da verificação"],
        icon: <Shield className="w-4 h-4 text-green-600" />
      },
      {
        message: "Excelente! 🎉 Juntar-se é super fácil:\n\n1️⃣ Registo rápido (tens de ter 21+)\n2️⃣ Verificação da língua portuguesa\n3️⃣ Verificação de foto para segurança\n4️⃣ Escolhe os teus interesses sociais\n5️⃣ Começa a participar em eventos imediatamente!\n\nPronto para nunca mais estares sozinho em Londres?",
        options: ["Sim, vamos a isto!", "Tenho questões sobre verificação de idade", "E se for brasileiro/angolano?", "Leva-me ao registo"],
        icon: <ArrowRight className="w-4 h-4 text-red-600" />
      }
    ]
  }

  // Check if device is mobile
  const isMobile = () => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  // Always show widget, but control auto-popup behavior
  useEffect(() => {
    // Show widget immediately on load
    setShowWidget(true)
    
    // Auto-open only on desktop after 3 minutes
    if (!isMobile()) {
      const timer = setTimeout(() => {
        if (!hasInteracted) {
          setIsOpen(true)
          setTimeout(() => {
            addBotMessage(conversationFlow[language as keyof typeof conversationFlow][0])
          }, 800)
        }
      }, 180000) // 3 minutes = 180000ms
      
      return () => clearTimeout(timer)
    }
  }, [hasInteracted, language])

  const addBotMessage = (step: any) => {
    const newMessage: Message = {
      id: Date.now(),
      text: step.message,
      isBot: true,
      timestamp: new Date(),
      options: step.options,
      icon: step.icon
    }
    setMessages(prev => [...prev, newMessage])
  }

  const handleOptionClick = (option: string) => {
    setHasInteracted(true)
    
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: option,
      isBot: false,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])

    // Handle signup actions
    if (option.includes("let's do this") || option.includes("Take me to signup") || option.includes("signup") || 
        option.includes("vamos a isto") || option.includes("Leva-me ao registo")) {
      setTimeout(() => {
        const finalMessage: Message = {
          id: Date.now() + 1,
          text: language === 'pt' 
            ? "Fantástico! 🚀 Bem-vindo à tua nova aventura social portuguesa!\n\nA levar-te para a página de registo..." 
            : "Fantastic! 🚀 Welcome to your new Portuguese social adventure!\n\nTaking you to the signup page...",
          isBot: true,
          timestamp: new Date(),
          icon: <Heart className="w-4 h-4 text-green-600" />
        }
        setMessages(prev => [...prev, finalMessage])
        
        // Redirect to signup after showing message
        setTimeout(() => {
          window.open('/signup', '_blank')
        }, 2000)
      }, 1000)
      return
    }

    // Handle "maybe later" responses
    if (option.includes("browsing") || option.includes("Só estou a ver")) {
      setTimeout(() => {
        const laterMessage: Message = {
          id: Date.now() + 1,
          text: language === 'pt'
            ? "Sem problema! 😊 Estarei aqui sempre que estiveres pronto para explorar a nossa comunidade portuguesa incrível. Sente-te à vontade para navegar no site!"
            : "No worries at all! 😊 I'll be here whenever you're ready to explore our amazing Portuguese community. Feel free to browse our website!",
          isBot: true,
          timestamp: new Date(),
          icon: <Heart className="w-4 h-4 text-green-600" />
        }
        setMessages(prev => [...prev, laterMessage])
      }, 1000)
      return
    }

    // Progress through conversation
    setTimeout(() => {
      const currentFlow = conversationFlow[language as keyof typeof conversationFlow]
      const nextStep = currentStep + 1
      if (nextStep < currentFlow.length) {
        addBotMessage(currentFlow[nextStep])
        setCurrentStep(nextStep)
      } else {
        // End of conversation - encourage signup
        const finalMessage: Message = {
          id: Date.now() + 1,
          text: language === 'pt'
            ? "Obrigado por falares comigo! 💕 A LusoTown está aqui para te ajudar a encontrar a tua tribo portuguesa em Londres. Pronto para começar?"
            : "Thanks for chatting with me! 💕 LusoTown is here to help you find your Portuguese tribe in London. Ready to start?",
          isBot: true,
          timestamp: new Date(),
          options: language === 'pt' 
            ? ["Sim, regista-me!", "Vou pensar nisso"]
            : ["Yes, sign me up!", "I'll think about it"],
          icon: <Users className="w-4 h-4 text-red-600" />
        }
        setMessages(prev => [...prev, finalMessage])
      }
    }, 1500)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  const toggleWidget = () => {
    setHasInteracted(true)
    if (!isOpen) {
      setIsOpen(true)
      setIsMinimized(false)
      if (messages.length === 0) {
        setTimeout(() => {
          addBotMessage(conversationFlow[language as keyof typeof conversationFlow][0])
        }, 500)
      }
    } else {
      setIsMinimized(!isMinimized)
    }
  }

  const closeWidget = () => {
    setIsOpen(false)
    setIsMinimized(false)
  }

  if (!showWidget) return null

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans">
      {/* Chat Window */}
      {isOpen && !isMinimized && (
        <div className="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-200 w-[calc(100vw-2rem)] sm:w-80 md:w-96 lg:w-80 max-w-[calc(100vw-2rem)] max-h-[85vh] sm:max-h-[32rem] flex flex-col animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-600 via-red-600 to-yellow-600 text-white rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="text-green-600 font-bold text-sm">LT</span>
              </div>
              <div>
                <h3 className="font-semibold text-sm">LusoTown Helper</h3>
                <p className="text-xs opacity-90">Tua tribo portuguesa 🇵🇹</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleWidget}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Minimize"
              >
                <div className="w-4 h-1 bg-white rounded"></div>
              </button>
              <button
                onClick={closeWidget}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-50 min-h-[200px] max-h-[50vh] sm:max-h-80">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] sm:max-w-xs md:max-w-sm ${
                  message.isBot 
                    ? 'bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-sm border border-gray-200' 
                    : 'bg-gradient-to-r from-green-600 to-red-600 text-white rounded-2xl rounded-br-md shadow-sm'
                } p-3`}>
                  {message.isBot && message.icon && (
                    <div className="flex items-center space-x-2 mb-2">
                      {message.icon}
                      <span className="text-xs font-medium text-gray-600">LusoTown Helper</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                  {message.options && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          className="block w-full text-left p-2.5 text-xs bg-gradient-to-r from-green-600 to-red-600 text-white rounded-xl hover:from-green-700 hover:to-red-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex items-center justify-center space-x-2 text-gray-500 text-xs">
              <MessageCircle className="w-4 h-4" />
              <span>{language === 'pt' ? 'Clica nas opções acima para continuar!' : 'Click the options above to continue chatting!'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleWidget}
        className={`w-16 h-16 bg-gradient-to-r from-green-600 via-red-600 to-yellow-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative overflow-hidden ${
          isOpen && !isMinimized ? 'scale-90' : 'scale-100 hover:scale-105'
        }`}
        aria-label="Open chat"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-red-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {isOpen && !isMinimized ? (
          <div className="w-6 h-1 bg-white rounded relative z-10"></div>
        ) : (
          <MessageCircle className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-200 relative z-10" />
        )}
        
        {/* Notification Badge */}
        {!hasInteracted && !isOpen && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white text-xs rounded-full flex items-center justify-center animate-pulse font-bold shadow-lg">
            1
          </div>
        )}

        {/* Pulse animation ring */}
        {!hasInteracted && !isOpen && (
          <div className="absolute inset-0 rounded-full border-4 border-red-600 animate-ping opacity-20"></div>
        )}
      </button>

      {/* Initial Welcome Tooltip */}
      {!hasInteracted && !isOpen && (
        <div className="absolute bottom-20 right-0 sm:bottom-20 bg-white p-3 sm:p-4 rounded-xl shadow-xl border border-gray-200 max-w-[280px] sm:max-w-xs animate-fade-in">
          <div className="text-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Heart className="w-4 h-4 text-green-600" />
              <strong className="text-green-600">
                {language === 'pt' ? 'Bem-vindo à LusoTown!' : 'Welcome to LusoTown!'}
              </strong>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {language === 'pt' 
                ? 'Encontra a tua tribo portuguesa em Londres! Fala comigo para começar 🇵🇹'
                : 'Find your Portuguese tribe in London! Chat with me to get started 🇵🇹'
              }
            </p>
            <div className="mt-2 text-xs text-red-600 font-medium">
              {language === 'pt' ? 'Clica para começar →' : 'Click to start →'}
            </div>
          </div>
          {/* Arrow pointing to button */}
          <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
          <div className="absolute -bottom-3 right-8 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-200"></div>
        </div>
      )}
    </div>
  )
}

export default WhatsAppWidget