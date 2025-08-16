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
  const [isDismissed, setIsDismissed] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()
  
  // Helper function to check if language is Portuguese
  const isPortuguese = language === 'pt'

  // Conversation flow for dual-audience Portuguese community platform
  const conversationFlow = {
    en: [
      {
        message: "Olá! 👋 Welcome to LusoTown - the bilingual platform connecting Portuguese speakers in London and UK! Whether you're looking for social experiences or business networking, I'm here to help you find events or become an event creator yourself.",
        options: ["I want to organize events", "I want to find social events", "I want business networking", "Tell me about LusoTown"],
        icon: <Heart className="w-4 h-4 text-green-600" />
      },
      // Organizer path
      {
        message: "Fantástico! 🎯 You want to organize events for Portuguese speakers! LusoTown helps you:\n\n📅 Create social & business events for our community\n🌆 Reach Portuguese speakers across London and UK\n💰 Monetize through tickets, sponsorships & partnerships\n📈 Track attendance and build long-term relationships\n🎉 Access promotional tools and bilingual templates\n\nReady to become a community leader?",
        options: ["Yes, I want to organize!", "What about monetization?", "How do I reach the community?", "Tell me about promotional tools"],
        icon: <Calendar className="w-4 h-4 text-green-600" />
      },
      // Social events path  
      {
        message: "Perfeito! 🎉 You want to find social events! LusoTown connects you with:\n\n🎭 Portuguese cultural experiences & festivals\n🍷 Wine tastings, fado nights, food tours\n🌆 London tours with Portuguese guides\n🎵 Music events, club nights & social gatherings\n👥 Connect with Portuguese speakers through events\n\n*Your Portuguese social calendar awaits!*",
        options: ["Show me cultural events!", "Find music & nightlife", "Book a chauffeur tour", "How do I connect?"],
        icon: <Users className="w-4 h-4 text-red-600" />
      },
      // Business networking path
      {
        message: "Excelente! 💼 Ready for business networking! LusoTown offers:\n\n🚀 AI workshops & tech masterclasses\n💻 Website creation & digital marketing training\n🤝 Portuguese business community networking\n📈 Entrepreneurship workshops & mentoring\n🎯 Professional development opportunities\n\n*Build your business network with Portuguese professionals!*",
        options: ["Show me tech workshops!", "Find networking events", "Business mentoring options", "Professional development"],
        icon: <Calendar className="w-4 h-4 text-action-600" />
      },
      // Platform info
      {
        message: "Excelente! 🌆 LusoTown serves dual audiences in London & UK:\n\n🎪 **Event Creators:** Tools to create, promote & monetize social/business events\n🎭 **Social Users:** Cultural experiences, tours, entertainment & connections\n💼 **Business Professionals:** Networking, workshops, training & mentoring\n🌍 **Bilingual Platform:** Complete English/Portuguese experience\n\n*Professional, inclusive & welcoming to all Portuguese speakers!*",
        options: ["I want to create events", "Show me social experiences", "Business networking options", "Platform features"],
        icon: <Calendar className="w-4 h-4 text-premium-600" />
      },
      // Event organizer details
      {
        message: "Amazing! 🚀 As an event creator on LusoTown you get:\n\n💡 **Dual-Audience Tools:** Create both social & business events\n💰 **Revenue Opportunities:** Tickets, sponsorships & partnerships\n📊 **Advanced Analytics:** Track engagement & build relationships\n🌆 **Community Reach:** Access Portuguese speakers across UK\n📢 **Bilingual Marketing:** Templates in English & Portuguese\n🎯 **Quality Audience:** Verified community members only\n\nStart creating events today!",
        options: ["Sign me up as creator!", "Revenue opportunities?", "Marketing support details", "Community reach info"],
        icon: <ArrowRight className="w-4 h-4 text-action-600" />
      },
      // Community member details  
      {
        message: "Incrível! 🎭 As a community member you can:\n\n🎪 **Social Experiences:** Festivals, tours, cultural nights & entertainment\n💼 **Business Growth:** Workshops, networking & professional development\n🚗 **Luxury Services:** Portuguese chauffeur & cultural tours\n👥 **Networking System:** Connect through shared event attendance\n💫 **Annual Membership:** £25/year for premium features\n🎯 **Bilingual Experience:** Complete Portuguese/English platform\n\nJoin our thriving Portuguese community!",
        options: ["Join the community!", "Annual membership benefits", "Chauffeur services info", "Networking features"],
        icon: <Shield className="w-4 h-4 text-secondary-600" />
      }
    ],
    pt: [
      {
        message: "Olá! 👋 Bem-vindo à LusoTown - a plataforma bilingue que conecta lusófonos em Londres e Reino Unido! Quer procures experiências sociais ou networking empresarial, estou aqui para te ajudar a encontrar eventos ou tornares-te criador de eventos.",
        options: ["Quero organizar eventos", "Quero eventos sociais", "Networking empresarial", "Conta-me sobre LusoTown"],
        icon: <Heart className="w-4 h-4 text-green-600" />
      },
      // Organizer path
      {
        message: "Fantástico! 🎯 Queres organizar eventos para lusófonos! A LusoTown ajuda-te a:\n\n📅 Criar eventos sociais e empresariais para a comunidade\n🌍 Alcançar lusófonos em Londres e Reino Unido\n💰 Monetizar através de bilhetes, patrocínios e parcerias\n📈 Acompanhar participação e construir relacionamentos duradouros\n🎉 Aceder a ferramentas promocionais bilingues\n\nPronto para te tornares um líder comunitário?",
        options: ["Sim, quero organizar!", "Oportunidades de receita?", "Como alcanço a comunidade?", "Ferramentas promocionais"],
        icon: <Calendar className="w-4 h-4 text-green-600" />
      },
      // Social events path
      {
        message: "Perfeito! 🎉 Queres encontrar eventos sociais! A LusoTown conecta-te com:\n\n🎭 Experiências culturais portuguesas e festivais\n🍷 Provas de vinho, noites de fado, tours gastronómicos\n🌆 Tours por Londres com guias portugueses\n🎵 Eventos musicais, noites de club e encontros sociais\n👥 Conecta-te com lusófonos através de eventos\n\n*O teu calendário social português espera por ti!*",
        options: ["Mostra-me eventos culturais!", "Música e vida noturna", "Reservar tour de chauffeur", "Como me conecto?"],
        icon: <Users className="w-4 h-4 text-red-600" />
      },
      // Business networking path
      {
        message: "Excelente! 💼 Pronto para networking empresarial! A LusoTown oferece:\n\n🚀 Workshops de IA e masterclasses tecnológicas\n💻 Criação de websites e treino de marketing digital\n🤝 Networking da comunidade empresarial portuguesa\n📈 Workshops de empreendedorismo e mentoria\n🎯 Oportunidades de desenvolvimento profissional\n\n*Constrói a tua rede empresarial com profissionais portugueses!*",
        options: ["Mostra-me workshops tecnológicos!", "Encontrar eventos de networking", "Opções de mentoria empresarial", "Desenvolvimento profissional"],
        icon: <Calendar className="w-4 h-4 text-action-600" />
      },
      // Platform info
      {
        message: "Excelente! 🌆 A LusoTown serve duas audiências em Londres e Reino Unido:\n\n🎪 **Criadores de Eventos:** Ferramentas para criar, promover e monetizar eventos sociais/empresariais\n🎭 **Utilizadores Sociais:** Experiências culturais, tours, entretenimento e conexões\n💼 **Profissionais Empresariais:** Networking, workshops, treino e mentoria\n🌍 **Plataforma Bilingue:** Experiência completa Português/Inglês\n\n*Profissional, inclusiva e acolhedora para todos os lusófonos!*",
        options: ["Quero criar eventos", "Mostra-me experiências sociais", "Opções de networking empresarial", "Funcionalidades da plataforma"],
        icon: <Calendar className="w-4 h-4 text-premium-600" />
      },
      // Event organizer details
      {
        message: "Incrível! 🚀 Como criador de eventos na LusoTown recebes:\n\n💡 **Ferramentas Duais:** Cria eventos sociais e empresariais\n💰 **Oportunidades de Receita:** Bilhetes, patrocínios e parcerias\n📊 **Analytics Avançadas:** Acompanha envolvimento e constrói relacionamentos\n🌆 **Alcance Comunitário:** Acesso a lusófonos em todo Reino Unido\n📢 **Marketing Bilingue:** Modelos em Inglês e Português\n🎯 **Audiência de Qualidade:** Apenas membros verificados da comunidade\n\nComeça a criar eventos hoje!",
        options: ["Regista-me como criador!", "Oportunidades de receita?", "Detalhes do apoio de marketing", "Informações sobre alcance comunitário"],
        icon: <ArrowRight className="w-4 h-4 text-action-600" />
      },
      // Community member details
      {
        message: "Incrível! 🎭 Como membro da comunidade podes:\n\n🎪 **Experiências Sociais:** Festivais, tours, noites culturais e entretenimento\n💼 **Crescimento Empresarial:** Workshops, networking e desenvolvimento profissional\n🚗 **Serviços de Luxo:** Chauffeur português e tours culturais\n👥 **Sistema de Networking:** Conecta através de participação partilhada em eventos\n💫 **Membership Anual:** £25/ano para funcionalidades premium\n🎯 **Experiência Bilingue:** Plataforma completa Português/Inglês\n\nJunta-te à nossa próspera comunidade portuguesa!",
        options: ["Juntar-me à comunidade!", "Benefícios do membership anual", "Informações sobre serviços de chauffeur", "Funcionalidades de networking"],
        icon: <Shield className="w-4 h-4 text-secondary-600" />
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
    if (option.includes("sign me up") || option.includes("signup") || option.includes("organizer") || option.includes("creator") ||
        option.includes("regista-me") || option.includes("Leva-me ao registo") || option.includes("Regista-me") || option.includes("criador") ||
        option.includes("let's start") || option.includes("vamos começar")) {
      setTimeout(() => {
        const finalMessage: Message = {
          id: Date.now() + 1,
          text: isPortuguese 
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
          text: isPortuguese 
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
          text: isPortuguese
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
      if (option.includes("organize") || option.includes("organizar") || option.includes("create events") || option.includes("criar eventos")) {
        nextStepIndex = 1 // Organizer path
      } else if (option.includes("social events") || option.includes("eventos sociais") || option.includes("find social") || option.includes("social experiences") || option.includes("experiências sociais")) {
        nextStepIndex = 2 // Social events path  
      } else if (option.includes("business networking") || option.includes("networking empresarial") || option.includes("Business") || option.includes("Empresarial")) {
        nextStepIndex = 3 // Business networking path
      } else if (option.includes("Tell me about") || option.includes("Conta-me sobre") || option.includes("Platform features") || option.includes("Funcionalidades")) {
        nextStepIndex = 4 // Platform info path
      } else if (currentStep === 1 || currentStep === 2 || currentStep === 3) {
        // Continue with specific detailed flows
        nextStepIndex = 5 // Detailed info for organizers/social/business
      } else if (currentStep === 4) {
        // From platform info, route based on choice
        if (option.includes("create events") || option.includes("criar eventos")) {
          nextStepIndex = 5 // Creator details
        } else {
          nextStepIndex = 6 // Member details
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
          text: isPortuguese
            ? "Obrigado por falares comigo! 💕 A LusoTown está aqui para conectar lusófonos em todo o mundo. Pronto para começar?"
            : "Thanks for chatting with me! 💕 LusoTown is here to connect Portuguese speakers worldwide. Ready to start?",
          isBot: true,
          timestamp: new Date(),
          options: isPortuguese 
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

  const dismissWidget = () => {
    setIsDismissed(true)
    setShowWidget(false)
  }

  if (!showWidget || isDismissed) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      {/* Chat Window */}
      {isOpen && !isMinimized && (
        <div className="mb-3 bg-white rounded-xl shadow-xl border border-gray-200 w-[calc(100vw-2rem)] sm:w-72 max-w-[calc(100vw-2rem)] max-h-[70vh] sm:max-h-96 flex flex-col animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary-600 via-action-600 to-premium-600 text-white rounded-t-xl shadow-md">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-white/20">
                <span className="text-primary-600 font-bold text-xs">LT</span>
              </div>
              <div>
                <h3 className="font-semibold text-sm">LusoTown Assistant</h3>
                <p className="text-xs opacity-90 flex items-center">
                  <span className="w-2 h-2 bg-secondary-400 rounded-full mr-2 animate-pulse"></span>
                  Online now
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleWidget}
                className="p-3 hover:bg-white/20 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Minimize"
              >
                <div className="w-4 h-1 bg-white rounded"></div>
              </button>
              <button
                onClick={closeWidget}
                className="p-3 hover:bg-white/20 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50 min-h-[150px] max-h-[40vh] sm:max-h-60">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[90%] ${
                  message.isBot 
                    ? 'bg-white text-gray-800 rounded-xl rounded-bl-md shadow-sm border border-gray-200' 
                    : 'bg-gradient-to-r from-green-600 to-red-600 text-white rounded-xl rounded-br-md shadow-sm'
                } p-2.5`}>
                  {message.isBot && message.icon && (
                    <div className="flex items-center space-x-2 mb-2">
                      {message.icon}
                      <span className="text-xs font-medium text-gray-600">LusoTown Helper</span>
                    </div>
                  )}
                  <p className="text-xs whitespace-pre-line leading-relaxed">{message.text}</p>
                  {message.options && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          className="block w-full text-left p-2.5 text-xs bg-gradient-to-r from-primary-600 to-action-600 text-white rounded-lg hover:from-primary-700 hover:to-action-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02] border border-white/10"
                        >
                          <span className="flex items-center justify-between">
                            {option}
                            <ArrowRight className="w-3 h-3 opacity-70" />
                          </span>
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
          <div className="p-3 border-t border-gray-200 bg-white rounded-b-xl">
            <div className="flex items-center justify-center space-x-2 text-gray-500 text-xs">
              <MessageCircle className="w-4 h-4" />
              <span>{isPortuguese ? 'Clica nas opções acima para continuar!' : 'Click the options above to continue chatting!'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleWidget}
        className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-primary-600 via-action-600 to-premium-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group relative overflow-hidden border-2 border-white/20 ${
          isOpen && !isMinimized ? 'scale-90' : 'scale-100 hover:scale-110'
        }`}
        aria-label="Open LusoTown chat"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-700 via-action-700 to-premium-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {isOpen && !isMinimized ? (
          <div className="w-6 h-1 bg-white rounded relative z-10"></div>
        ) : (
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform duration-200 relative z-10" />
        )}
        
        {/* Notification Badge */}
        {!hasInteracted && !isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center animate-pulse font-bold shadow-lg">
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
        <div className="absolute bottom-16 right-0 bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200 animate-fade-in whitespace-nowrap">
          <div className="text-xs text-red-600 font-medium">
            {isPortuguese ? 'Clica para começar →' : 'Click to start →'}
          </div>
          {/* Arrow pointing to button */}
          <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-6 border-t-white"></div>
          <div className="absolute -bottom-2.5 right-6 w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-6 border-t-gray-200"></div>
          
          {/* Close button for tooltip */}
          <button
            onClick={dismissWidget}
            className="absolute top-1 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Dismiss widget"
          >
            <X className="w-3 h-3 text-gray-400" />
          </button>
        </div>
      )}
    </div>
  )
}

export default WhatsAppWidget