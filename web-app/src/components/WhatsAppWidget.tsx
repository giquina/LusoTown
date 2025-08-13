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

  // Conversation flow for global Portuguese community platform
  const conversationFlow = {
    en: [
      {
        message: "Olá! 👋 Welcome to LusoTown - the global platform connecting Portuguese speakers worldwide! I'm here to help you either organize events for our community or find amazing Portuguese events to attend.",
        options: ["I want to organize events", "I want to find events to attend", "Tell me about LusoTown", "Just browsing"],
        icon: <Heart className="w-4 h-4 text-green-600" />
      },
      // Organizer path
      {
        message: "Fantástico! 🎯 You want to organize events for Portuguese speakers! LusoTown helps you:\n\n📅 Create and promote Portuguese cultural events\n🌍 Reach Portuguese speakers globally (starting with London)\n💰 Monetize your events with our pricing tools\n📈 Track attendance and grow your community\n🎉 Access promotional tools and templates\n\nReady to become a community leader?",
        options: ["Yes, I want to organize!", "What about pricing my events?", "How do I reach people globally?", "Tell me about promotional tools"],
        icon: <Calendar className="w-4 h-4 text-green-600" />
      },
      // Member path  
      {
        message: "Perfeito! 🎉 You want to find Portuguese events to attend! LusoTown connects you with:\n\n🎭 Portuguese cultural events worldwide\n🍷 Wine tastings, fado nights, festivals\n👥 Portuguese speakers in your area and globally\n🏆 Quality verified events and organizers\n💬 Chat with other Portuguese speakers\n\n*Currently featuring London events, expanding globally soon!*",
        options: ["Show me London events!", "I'm in another city", "How do I connect with people?", "What types of events?"],
        icon: <Users className="w-4 h-4 text-red-600" />
      },
      // Platform info
      {
        message: "Excelente! 🌍 LusoTown is the global home for Portuguese speakers:\n\n🎪 **For Event Organizers:** Tools to create, promote, and monetize Portuguese events\n🎭 **For Community Members:** Discover events and connect with Portuguese speakers\n🌐 **Global Reach:** Currently in London, expanding worldwide\n🌍 All Portuguese-speaking countries welcome!\n\nUniting our global Portuguese family!",
        options: ["I want to organize events", "I want to attend events", "Tell me about global expansion", "How do I join?"],
        icon: <Calendar className="w-4 h-4 text-yellow-600" />
      },
      // Event organizer details
      {
        message: "Amazing! 🚀 As an event organizer on LusoTown you get:\n\n💡 **Event Creation Tools:** Easy setup for Portuguese cultural events\n💰 **Flexible Pricing:** Free, paid, or donation-based events\n📊 **Analytics:** Track registrations and engagement\n🌍 **Global Reach:** Access to Portuguese speakers worldwide\n📢 **Marketing Support:** Social media templates and promotion\n🎯 **Targeted Audience:** Verified Portuguese speakers only\n\nStart organizing today!",
        options: ["Sign me up as organizer!", "What about event fees?", "How do I promote globally?", "Show me organizer tools"],
        icon: <ArrowRight className="w-4 h-4 text-green-600" />
      },
      // Event attendee details  
      {
        message: "Incrível! 🎭 As a community member you can:\n\n🎪 **Discover Events:** Portuguese festivals, cultural nights, networking\n🗺️ **London Events Now:** Currently available in London\n🌍 **Global Expansion:** Coming to your city soon!\n👥 **Connect:** Chat with other Portuguese speakers\n💫 **Verified Community:** Safe, authentic Portuguese speakers\n🎯 **Personalized:** Events matched to your interests\n\nJoin our growing Portuguese family!",
        options: ["Join the community!", "When will you expand to my city?", "What London events are available?", "How do I connect with people?"],
        icon: <Shield className="w-4 h-4 text-red-600" />
      }
    ],
    pt: [
      {
        message: "Olá! 👋 Bem-vindo à LusoTown - a plataforma global que conecta lusófonos em todo o mundo! Estou aqui para te ajudar a organizar eventos para a nossa comunidade ou encontrar eventos portugueses incríveis para participar.",
        options: ["Quero organizar eventos", "Quero encontrar eventos para participar", "Conta-me sobre a LusoTown", "Só estou a ver"],
        icon: <Heart className="w-4 h-4 text-green-600" />
      },
      // Organizer path
      {
        message: "Fantástico! 🎯 Queres organizar eventos para lusófonos! A LusoTown ajuda-te a:\n\n📅 Criar e promover eventos culturais portugueses\n🌍 Alcançar lusófonos globalmente (começando em Londres)\n💰 Monetizar os teus eventos com as nossas ferramentas\n📈 Acompanhar participação e fazer crescer a comunidade\n🎉 Aceder a ferramentas e modelos promocionais\n\nPronto para te tornares um líder comunitário?",
        options: ["Sim, quero organizar!", "E sobre preços dos eventos?", "Como alcanço pessoas globalmente?", "Fala-me das ferramentas promocionais"],
        icon: <Calendar className="w-4 h-4 text-green-600" />
      },
      // Member path
      {
        message: "Perfeito! 🎉 Queres encontrar eventos portugueses para participar! A LusoTown conecta-te com:\n\n🎭 Eventos culturais portugueses em todo o mundo\n🍷 Provas de vinho, noites de fado, festivais\n👥 Lusófonos na tua área e globalmente\n🏆 Eventos e organizadores verificados e de qualidade\n💬 Conversa com outros lusófonos\n\n*Atualmente com eventos em Londres, expandindo globalmente em breve!*",
        options: ["Mostra-me eventos em Londres!", "Estou noutra cidade", "Como me conecto com pessoas?", "Que tipos de eventos?"],
        icon: <Users className="w-4 h-4 text-red-600" />
      },
      // Platform info
      {
        message: "Excelente! 🌍 A LusoTown é o lar global dos lusófonos:\n\n🎪 **Para Organizadores:** Ferramentas para criar, promover e monetizar eventos portugueses\n🎭 **Para Membros da Comunidade:** Descobrir eventos e conectar com lusófonos\n🌐 **Alcance Global:** Atualmente em Londres, expandindo mundialmente\n🌍 Todos os países lusófonos são bem-vindos!\n\nUnindo a nossa família portuguesa global!",
        options: ["Quero organizar eventos", "Quero participar em eventos", "Fala-me da expansão global", "Como me junto?"],
        icon: <Calendar className="w-4 h-4 text-yellow-600" />
      },
      // Event organizer details
      {
        message: "Incrível! 🚀 Como organizador de eventos na LusoTown recebes:\n\n💡 **Ferramentas de Criação:** Configuração fácil para eventos culturais portugueses\n💰 **Preços Flexíveis:** Eventos gratuitos, pagos ou baseados em doações\n📊 **Analytics:** Acompanha inscrições e envolvimento\n🌍 **Alcance Global:** Acesso a lusófonos em todo o mundo\n📢 **Apoio de Marketing:** Modelos e promoção para redes sociais\n🎯 **Audiência Direcionada:** Apenas lusófonos verificados\n\nComeça a organizar hoje!",
        options: ["Regista-me como organizador!", "E sobre taxas de eventos?", "Como promovo globalmente?", "Mostra-me ferramentas de organizador"],
        icon: <ArrowRight className="w-4 h-4 text-green-600" />
      },
      // Event attendee details
      {
        message: "Incrível! 🎭 Como membro da comunidade podes:\n\n🎪 **Descobrir Eventos:** Festivais portugueses, noites culturais, networking\n🗺️ **Eventos em Londres Agora:** Atualmente disponíveis em Londres\n🌍 **Expansão Global:** Chegando à tua cidade em breve!\n👥 **Conectar:** Conversa com outros lusófonos\n💫 **Comunidade Verificada:** Lusófonos seguros e autênticos\n🎯 **Personalizado:** Eventos adaptados aos teus interesses\n\nJunta-te à nossa família portuguesa em crescimento!",
        options: ["Juntar-me à comunidade!", "Quando expandem para a minha cidade?", "Que eventos há em Londres?", "Como me conecto com pessoas?"],
        icon: <Shield className="w-4 h-4 text-red-600" />
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

    // Handle signup/registration actions
    if (option.includes("sign me up") || option.includes("signup") || option.includes("organizer") ||
        option.includes("regista-me") || option.includes("Leva-me ao registo") || option.includes("Regista-me") ||
        option.includes("let's start") || option.includes("vamos começar")) {
      setTimeout(() => {
        const finalMessage: Message = {
          id: Date.now() + 1,
          text: language === 'pt' 
            ? "Fantástico! 🚀 Bem-vindo à LusoTown global!\n\nA levar-te para a página de registo..." 
            : "Fantastic! 🚀 Welcome to global LusoTown!\n\nTaking you to the signup page...",
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

    // Handle join community actions
    if (option.includes("Join the community") || option.includes("Juntar-me à comunidade")) {
      setTimeout(() => {
        const joinMessage: Message = {
          id: Date.now() + 1,
          text: language === 'pt' 
            ? "Excelente escolha! 🎉 Vamos conectar-te com lusófonos em todo o mundo!\n\nA levar-te para te juntares à comunidade..." 
            : "Excellent choice! 🎉 Let's connect you with Portuguese speakers worldwide!\n\nTaking you to join the community...",
          isBot: true,
          timestamp: new Date(),
          icon: <Users className="w-4 h-4 text-green-600" />
        }
        setMessages(prev => [...prev, joinMessage])
        
        // Redirect to events page after showing message
        setTimeout(() => {
          window.open('/events', '_blank')
        }, 2000)
      }, 1000)
      return
    }

    // Handle "browsing" responses
    if (option.includes("browsing") || option.includes("Só estou a ver")) {
      setTimeout(() => {
        const laterMessage: Message = {
          id: Date.now() + 1,
          text: language === 'pt'
            ? "Sem problema! 😊 Estarei aqui sempre que estiveres pronto para explorar a nossa comunidade portuguesa global. Sente-te à vontade para navegar no site!"
            : "No worries at all! 😊 I'll be here whenever you're ready to explore our amazing global Portuguese community. Feel free to browse our website!",
          isBot: true,
          timestamp: new Date(),
          icon: <Heart className="w-4 h-4 text-green-600" />
        }
        setMessages(prev => [...prev, laterMessage])
      }, 1000)
      return
    }

    // Handle path selection and routing
    setTimeout(() => {
      const currentFlow = conversationFlow[language as keyof typeof conversationFlow]
      let nextStepIndex = 1 // Default to first step after intro

      // Route based on user selection
      if (option.includes("organize") || option.includes("organizar")) {
        nextStepIndex = 1 // Organizer path
      } else if (option.includes("find events") || option.includes("attend") || option.includes("encontrar eventos") || option.includes("participar")) {
        nextStepIndex = 2 // Member/attendee path  
      } else if (option.includes("Tell me about") || option.includes("Conta-me sobre")) {
        nextStepIndex = 3 // Platform info path
      } else if (currentStep === 1 || currentStep === 2) {
        // Continue with organizer or member specific flows
        nextStepIndex = 4 // Detailed info for organizers
      } else if (currentStep === 3) {
        // From platform info, route based on choice
        if (option.includes("organize") || option.includes("organizar")) {
          nextStepIndex = 4 // Organizer details
        } else {
          nextStepIndex = 5 // Member details
        }
      } else {
        // Default progression
        nextStepIndex = Math.min(currentStep + 1, currentFlow.length - 1)
      }

      if (nextStepIndex < currentFlow.length) {
        addBotMessage(currentFlow[nextStepIndex])
        setCurrentStep(nextStepIndex)
      } else {
        // End of conversation - encourage action
        const finalMessage: Message = {
          id: Date.now() + 1,
          text: language === 'pt'
            ? "Obrigado por falares comigo! 💕 A LusoTown está aqui para conectar lusófonos em todo o mundo. Pronto para começar?"
            : "Thanks for chatting with me! 💕 LusoTown is here to connect Portuguese speakers worldwide. Ready to start?",
          isBot: true,
          timestamp: new Date(),
          options: language === 'pt' 
            ? ["Sim, vamos começar!", "Vou pensar nisso"]
            : ["Yes, let's start!", "I'll think about it"],
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
                <p className="text-xs opacity-90">Conectando lusófonos 🌍</p>
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
                ? 'Conecta lusófonos globalmente! Organiza ou encontra eventos portugueses 🌍'
                : 'Connecting Portuguese speakers globally! Organize or find Portuguese events 🌍'
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