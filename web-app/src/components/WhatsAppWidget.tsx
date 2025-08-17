"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  X,
  MessageCircle,
  Heart,
  Users,
  Shield,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  options?: string[];
  icon?: React.ReactNode;
}

const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showWidget, setShowWidget] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  // Helper function to check if language is Portuguese
  const isPortuguese = language === "pt";

  // Conversation flow for dual-audience Portuguese community platform
  const conversationFlow = useMemo(
    () => ({
      en: [
        {
          message:
            "Olá! 👋 Planning a trip to London? Need a Portuguese-speaking guide or driver?",
          options: [
            "Yes, I'm visiting London!",
            "I live here, show me events",
            "Just browsing",
          ],
          icon: <Heart className="w-4 h-4 text-green-600" />,
        },
        {
          message:
            "Perfect! 🇬🇧 We have Portuguese-speaking drivers & guides ready to show you London. What interests you most?",
          options: [
            "Personal driver for my trip",
            "Guided London tour", 
            "Both driver & guide",
          ],
          icon: <Calendar className="w-4 h-4 text-action-600" />,
        },
        {
          message:
            "Great! 🎉 You're local. Join our Portuguese community events across London:",
          options: [
            "Show me upcoming events",
            "Cultural & social meetups", 
            "Business networking",
          ],
          icon: <Users className="w-4 h-4 text-secondary-600" />,
        },
        {
          message:
            "Fantástico! 🎯 You want to organize events for Portuguese speakers! LusoTown helps you:\n\n📅 Create social & business events for our community\n🌆 Reach Portuguese speakers across London and UK\n💰 Monetize through tickets, sponsorships & partnerships\n📈 Track attendance and build long-term relationships\n🎉 Access promotional tools and bilingual templates\n\nReady to become a community leader?",
          options: [
            "Yes, I want to organize!",
            "What about monetization?",
            "How do I reach the community?",
            "Tell me about promotional tools",
          ],
          icon: <Calendar className="w-4 h-4 text-green-600" />,
        },
        {
          message:
            "Great! 🎉 You want experiences. We offer Portuguese-guided tours and private transport across London. What would you like to do now?",
          options: [
            "See all London tours",
            "Get a quote for private transport",
            "Private transport for events",
            "Contact support",
          ],
          icon: <Users className="w-4 h-4 text-red-600" />,
        },
        {
          message:
            "Excelente! 💼 Ready for business networking! LusoTown offers:\n\n🚀 AI workshops & tech masterclasses\n💻 Website creation & digital marketing training\n🤝 Portuguese business community networking\n📈 Entrepreneurship workshops & mentoring\n🎯 Professional development opportunities\n\n*Build your business network with Portuguese professionals!*",
          options: [
            "Show me tech workshops!",
            "Find networking events",
            "Business mentoring options",
            "Professional development",
          ],
          icon: <Calendar className="w-4 h-4 text-action-600" />,
        },
        {
          message:
            "Excelente! 🌆 LusoTown serves dual audiences in London & UK:\n\n🎪 **Event Creators:** Tools to create, promote & monetize social/business events\n🎭 **Social Users:** Cultural experiences, tours, entertainment & connections\n💼 **Business Professionals:** Networking, workshops, training & mentoring\n🌍 **Bilingual Platform:** Complete English/Portuguese experience\n\n*Professional, inclusive & welcoming to all Portuguese speakers!*",
          options: [
            "I want to create events",
            "Show me social experiences",
            "Business networking options",
            "Platform features",
          ],
          icon: <Calendar className="w-4 h-4 text-premium-600" />,
        },
        {
          message:
            "Amazing! 🚀 As an event creator on LusoTown you get:\n\n💡 **Dual-Audience Tools:** Create both social & business events\n💰 **Revenue Opportunities:** Tickets, sponsorships & partnerships\n📊 **Advanced Analytics:** Track engagement & build relationships\n🌆 **Community Reach:** Access Portuguese speakers across UK\n📢 **Bilingual Marketing:** Templates in English & Portuguese\n🎯 **Quality Audience:** Verified community members only\n\nStart creating events today!",
          options: [
            "Sign me up as creator!",
            "Revenue opportunities?",
            "Marketing support details",
            "Community reach info",
          ],
          icon: <ArrowRight className="w-4 h-4 text-action-600" />,
        },
        {
          message:
            "Need a hand? Here are quick actions:\n\n🚗 Book a personal or security driver\n🌆 Explore all London tours\n👣 How to navigate and use the site\n✉️ Email support: support@lusotown.com",
          options: [
            "Book a personal driver",
            "Book a security driver",
            "See all London tours",
            "How do I use the site?",
          ],
          icon: <Shield className="w-4 h-4 text-secondary-600" />,
        },
      ],
      pt: [
        {
          message:
            "Olá! 👋 Vens visitar Londres? Precisas de guia ou motorista que fale português?",
          options: [
            "Sim, vou visitar Londres!",
            "Vivo aqui, mostra eventos",
            "Só estou a ver",
          ],
          icon: <Heart className="w-4 h-4 text-green-600" />,
        },
        {
          message:
            "Perfeito! 🇬🇧 Temos motoristas e guias portugueses prontos para te mostrar Londres. O que te interessa mais?",
          options: [
            "Motorista pessoal para a viagem",
            "Tour guiado de Londres", 
            "Motorista e guia juntos",
          ],
          icon: <Calendar className="w-4 h-4 text-action-600" />,
        },
        {
          message:
            "Ótimo! 🎉 És local. Junta-te aos eventos da comunidade portuguesa em Londres:",
          options: [
            "Mostrar próximos eventos",
            "Encontros culturais e sociais", 
            "Networking empresarial",
          ],
          icon: <Users className="w-4 h-4 text-secondary-600" />,
        },
        {
          message:
            "Fantástico! 🎯 Queres organizar eventos para lusófonos! A LusoTown ajuda-te a:\n\n📅 Criar eventos sociais e empresariais para a comunidade\n🌍 Alcançar lusófonos em Londres e Reino Unido\n💰 Monetizar através de bilhetes, patrocínios e parcerias\n📈 Acompanhar participação e construir relacionamentos duradouros\n🎉 Aceder a ferramentas promocionais bilingues\n\nPronto para te tornares um líder comunitário?",
          options: [
            "Sim, quero organizar!",
            "Oportunidades de receita?",
            "Como alcanço a comunidade?",
            "Ferramentas promocionais",
          ],
          icon: <Calendar className="w-4 h-4 text-green-600" />,
        },
        {
          message:
            "Ótimo! 🎉 Queres experiências. Temos tours guiados em português e transporte privado em Londres. O que queres fazer agora?",
          options: [
            "Ver todos os tours de Londres",
            "Pedir orçamento transporte privado",
            "Transporte privado para eventos",
            "Contactar apoio",
          ],
          icon: <Users className="w-4 h-4 text-red-600" />,
        },
        {
          message:
            "Excelente! 💼 Pronto para networking empresarial! A LusoTown oferece:\n\n🚀 Workshops de IA e masterclasses tecnológicas\n💻 Criação de websites e treino de marketing digital\n🤝 Networking da comunidade empresarial portuguesa\n📈 Workshops de empreendedorismo e mentoria\n🎯 Oportunidades de desenvolvimento profissional\n\n*Constrói a tua rede empresarial com profissionais portugueses!*",
          options: [
            "Mostra-me workshops tecnológicos!",
            "Encontrar eventos de networking",
            "Opções de mentoria empresarial",
            "Desenvolvimento profissional",
          ],
          icon: <Calendar className="w-4 h-4 text-action-600" />,
        },
        {
          message:
            "Excelente! 🌆 A LusoTown serve duas audiências em Londres e Reino Unido:\n\n🎪 **Criadores de Eventos:** Ferramentas para criar, promover e monetizar eventos sociais/empresariais\n🎭 **Utilizadores Sociais:** Experiências culturais, tours, entretenimento e conexões\n💼 **Profissionais Empresariais:** Networking, workshops, treino e mentoria\n🌍 **Plataforma Bilingue:** Experiência completa Português/Inglês\n\n*Profissional, inclusiva e acolhedora para todos os lusófonos!*",
          options: [
            "Quero criar eventos",
            "Mostra-me experiências sociais",
            "Opções de networking empresarial",
            "Funcionalidades da plataforma",
          ],
          icon: <Calendar className="w-4 h-4 text-premium-600" />,
        },
        {
          message:
            "Incrível! 🚀 Como criador de eventos na LusoTown recebes:\n\n💡 **Ferramentas Duais:** Cria eventos sociais e empresariais\n💰 **Oportunidades de Receita:** Bilhetes, patrocínios e parcerias\n📊 **Analytics Avançadas:** Acompanha envolvimento e constrói relacionamentos\n🌆 **Alcance Comunitário:** Acesso a lusófonos em todo Reino Unido\n📢 **Marketing Bilingue:** Modelos em Inglês e Português\n🎯 **Audiência de Qualidade:** Apenas membros verificados da comunidade\n\nComeça a criar eventos hoje!",
          options: [
            "Regista-me como criador!",
            "Oportunidades de receita?",
            "Detalhes do apoio de marketing",
            "Informações sobre alcance comunitário",
          ],
          icon: <ArrowRight className="w-4 h-4 text-action-600" />,
        },
        {
          message:
            "Precisas de ajuda? Ações rápidas:\n\n🚗 Reservar motorista pessoal ou de segurança\n🌆 Ver todos os tours de Londres\n👣 Como navegar e usar o site\n✉️ Email de apoio: support@lusotown.com",
          options: [
            "Reservar motorista pessoal",
            "Reservar motorista de segurança",
            "Ver todos os tours de Londres",
            "Como usar o site?",
          ],
          icon: <Shield className="w-4 h-4 text-secondary-600" />,
        },
      ],
    }),
    []
  );

  // Check if device is mobile
  const isMobile = () => {
    if (typeof window === "undefined") return false;
    return (
      window.innerWidth < 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  };

  // Always show widget, but control auto-popup behavior
  useEffect(() => {
    // Show widget immediately on load
    setShowWidget(true);

    // Auto-open only on desktop after 3 minutes
    if (!isMobile()) {
      const timer = setTimeout(() => {
        if (!hasInteracted) {
          setIsOpen(true);
          setTimeout(() => {
            addBotMessage(
              conversationFlow[language as keyof typeof conversationFlow][0]
            );
          }, 800);
        }
      }, 180000); // 3 minutes = 180000ms

      return () => clearTimeout(timer);
    }
  }, [hasInteracted, language, conversationFlow]);

  const addBotMessage = (step: any) => {
    const newMessage: Message = {
      id: Date.now(),
      text: step.message,
      isBot: true,
      timestamp: new Date(),
      options: step.options,
      icon: step.icon,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleCustomMessage = () => {
    if (!customMessage.trim()) return;
    
    setHasInteracted(true);
    setIsTyping(true);

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: customMessage,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setCustomMessage("");

    // Send message to WhatsApp (your mobile)
    const whatsappNumber = "+447407655203";
    const encodedMessage = encodeURIComponent(`New message from LusoTown website:\n\n"${customMessage}"\n\n--- Sent via LusoTown Chat Widget ---`);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: isPortuguese
          ? `Obrigado pela tua mensagem! 📱 Vou enviar isto para o WhatsApp do nosso suporte. Também podes contactar-nos diretamente: support@lusotown.com`
          : `Thank you for your message! 📱 I'll send this to our support WhatsApp. You can also contact us directly: support@lusotown.com`,
        isBot: true,
        timestamp: new Date(),
        icon: <MessageCircle className="w-4 h-4 text-green-600" />,
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
      
      // Open WhatsApp with the message
      setTimeout(() => {
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
      }, 1000);
    }, 1500);
  };

  const handleOptionClick = (option: string) => {
    setHasInteracted(true);

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: option,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Fast-path: primary actions for tourism/transport/events
    const opt = option.toLowerCase();
    if (
      opt.includes("personal driver") ||
      opt.includes("motorista pessoal") ||
      opt.includes("book a driver") ||
      opt.includes("reservar motorista") ||
      opt.includes("both driver & guide") ||
      opt.includes("motorista e guia juntos")
    ) {
      setTimeout(() => {
        const msg: Message = {
          id: Date.now() + 1,
          text: isPortuguese
            ? "Excelente! 🚗 A abrir a página de reservas de motorista…"
            : "Excellent! 🚗 Opening driver booking page…",
          isBot: true,
          timestamp: new Date(),
          icon: <Shield className="w-4 h-4 text-secondary-600" />,
        };
        setMessages((prev) => [...prev, msg]);
        setTimeout(() => window.open("/transport", "_blank"), 1200);
      }, 800);
      return;
    }

    if (
      opt.includes("book a security driver") ||
      opt.includes("reservar motorista de segurança")
    ) {
      setTimeout(() => {
        const msg: Message = {
          id: Date.now() + 1,
          text: isPortuguese
            ? "A preparar reserva com motorista de segurança…"
            : "Preparing a booking with a security driver…",
          isBot: true,
          timestamp: new Date(),
          icon: <Shield className="w-4 h-4 text-secondary-600" />,
        };
        setMessages((prev) => [...prev, msg]);
        setTimeout(() => window.open("/transport", "_blank"), 1200);
      }, 800);
      return;
    }

    if (
      opt.includes("guided london tour") ||
      opt.includes("tour guiado de londres") ||
      opt.includes("london tour") ||
      opt.includes("tour de londres")
    ) {
      setTimeout(() => {
        const msg: Message = {
          id: Date.now() + 1,
          text: isPortuguese
            ? "Perfeito! 🗺️ A mostrar os nossos tours guiados em português…"
            : "Perfect! 🗺️ Showing our Portuguese-guided tours…",
          isBot: true,
          timestamp: new Date(),
          icon: <Calendar className="w-4 h-4 text-action-600" />,
        };
        setMessages((prev) => [...prev, msg]);
        setTimeout(() => window.open("/tours", "_blank"), 1200);
      }, 800);
      return;
    }

    if (
      opt.includes("show me upcoming events") ||
      opt.includes("mostrar próximos eventos") ||
      opt.includes("see all events") ||
      opt.includes("ver todos os eventos") ||
      opt.includes("cultural & social meetups") ||
      opt.includes("encontros culturais e sociais")
    ) {
      setTimeout(() => {
        const msg: Message = {
          id: Date.now() + 1,
          text: isPortuguese
            ? "Óptimo! 🎉 A mostrar eventos da comunidade portuguesa…"
            : "Great! 🎉 Showing Portuguese community events…",
          isBot: true,
          timestamp: new Date(),
          icon: <Calendar className="w-4 h-4 text-action-600" />,
        };
        setMessages((prev) => [...prev, msg]);
        setTimeout(() => window.open("/events", "_blank"), 1200);
      }, 800);
      return;
    }

    if (
      opt.includes("email support") ||
      opt.includes("email de apoio") ||
      opt.includes("contact support") ||
      opt.includes("contactar apoio")
    ) {
      setTimeout(() => {
        const msg: Message = {
          id: Date.now() + 1,
          text: isPortuguese
            ? "A abrir o teu email para contactar: support@lusotown.com"
            : "Opening your email to contact: support@lusotown.com",
          isBot: true,
          timestamp: new Date(),
          icon: <Heart className="w-4 h-4 text-green-600" />,
        };
        setMessages((prev) => [...prev, msg]);
        setTimeout(
          () => window.open("mailto:support@lusotown.com", "_blank"),
          1000
        );
      }, 600);
      return;
    }

    if (
      opt.includes("how do i use the site") ||
      opt.includes("como usar o site")
    ) {
      setTimeout(() => {
        const tips: Message = {
          id: Date.now() + 1,
          text: isPortuguese
            ? "Dica rápida:\n\n• Tours: vê todos em /london-tours (clica em London Tours → Tours)\n• Transporte: reservas rápidas em /transport\n• Apoio: support@lusotown.com\n\nQueres abrir uma destas páginas agora?"
            : "Quick tip:\n\n• Tours: see them all at /london-tours (hover London Tours → Tours)\n• Transport: quick bookings at /transport\n• Support: support@lusotown.com\n\nWant me to open one now?",
          isBot: true,
          timestamp: new Date(),
          options: isPortuguese
            ? [
                "Ver todos os tours de Londres",
                "Reservar motorista pessoal",
                "Email de apoio",
              ]
            : [
                "See all London tours",
                "Book a personal driver",
                "Email support",
              ],
          icon: <MessageCircle className="w-4 h-4 text-action-600" />,
        };
        setMessages((prev) => [...prev, tips]);
      }, 600);
      return;
    }

    // Handle signup/registration actions
    if (
      option.includes("sign me up") ||
      option.includes("signup") ||
      option.includes("organizer") ||
      option.includes("creator") ||
      option.includes("regista-me") ||
      option.includes("Leva-me ao registo") ||
      option.includes("Regista-me") ||
      option.includes("criador") ||
      option.includes("let's start") ||
      option.includes("vamos começar")
    ) {
      setTimeout(() => {
        const finalMessage: Message = {
          id: Date.now() + 1,
          text: isPortuguese
            ? "Fantástico! 🚀 Bem-vindo à LusoTown global!\n\nA levar-te para a página de registo..."
            : "Fantastic! 🚀 Welcome to global LusoTown!\n\nTaking you to the signup page...",
          isBot: true,
          timestamp: new Date(),
          icon: <Heart className="w-4 h-4 text-green-600" />,
        };
        setMessages((prev) => [...prev, finalMessage]);

        // Redirect to signup after showing message
        setTimeout(() => {
          window.open("/signup", "_blank");
        }, 2000);
      }, 1000);
      return;
    }

    // Handle join community actions
    if (
      option.includes("Join the community") ||
      option.includes("Juntar-me à comunidade")
    ) {
      setTimeout(() => {
        const joinMessage: Message = {
          id: Date.now() + 1,
          text: isPortuguese
            ? "Excelente escolha! 🎉 Vamos conectar-te com lusófonos em todo o mundo!\n\nA levar-te para te juntares à comunidade..."
            : "Excellent choice! 🎉 Let's connect you with Portuguese speakers worldwide!\n\nTaking you to join the community...",
          isBot: true,
          timestamp: new Date(),
          icon: <Users className="w-4 h-4 text-green-600" />,
        };
        setMessages((prev) => [...prev, joinMessage]);

        // Redirect to events page after showing message
        setTimeout(() => {
          window.open("/events", "_blank");
        }, 2000);
      }, 1000);
      return;
    }

    // Handle "browsing" responses
    if (
      opt.includes("just browsing") || 
      opt.includes("só estou a ver") || 
      opt.includes("browsing")
    ) {
      setTimeout(() => {
        const laterMessage: Message = {
          id: Date.now() + 1,
          text: isPortuguese
            ? "Sem problema! 😊 Se mudares de ideias, estou aqui. Também podes escrever-me uma mensagem directa!"
            : "No problem! 😊 If you change your mind, I'm here. You can also type me a direct message!",
          isBot: true,
          timestamp: new Date(),
          icon: <Heart className="w-4 h-4 text-green-600" />,
        };
        setMessages((prev) => [...prev, laterMessage]);
      }, 1000);
      return;
    }

    // Handle path selection and routing
    setTimeout(() => {
      const currentFlow =
        conversationFlow[language as keyof typeof conversationFlow];
      let nextStepIndex = 1; // Default to first step after intro

      // Route based on user selection in new tourism-focused flow
      if (
        opt.includes("yes, i'm visiting london") ||
        opt.includes("sim, vou visitar londres") ||
        opt.includes("visiting london") ||
        opt.includes("visitar londres")
      ) {
        nextStepIndex = 1; // Tourism services path
      } else if (
        opt.includes("i live here") ||
        opt.includes("vivo aqui") ||
        opt.includes("show me events") ||
        opt.includes("mostra eventos")
      ) {
        nextStepIndex = 2; // Local events path
      } else if (
        opt.includes("business networking") ||
        opt.includes("networking empresarial")
      ) {
        // Business networking - direct to business networking page
        setTimeout(() => {
          const businessMsg: Message = {
            id: Date.now() + 1,
            text: isPortuguese
              ? "Excelente! 💼 A mostrar eventos de networking empresarial português…"
              : "Excellent! 💼 Showing Portuguese business networking events…",
            isBot: true,
            timestamp: new Date(),
            icon: <Users className="w-4 h-4 text-premium-600" />,
          };
          setMessages((prev) => [...prev, businessMsg]);
          setTimeout(() => window.open("/business-networking", "_blank"), 1200);
        }, 800);
        return;
      } else {
        // Default progression for remaining steps
        nextStepIndex = Math.min(currentStep + 1, currentFlow.length - 1);
      }

      if (nextStepIndex < currentFlow.length) {
        addBotMessage(currentFlow[nextStepIndex]);
        setCurrentStep(nextStepIndex);
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
          icon: <Users className="w-4 h-4 text-red-600" />,
        };
        setMessages((prev) => [...prev, finalMessage]);
      }
    }, 1500);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const toggleWidget = () => {
    setHasInteracted(true);
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
      if (messages.length === 0) {
        setTimeout(() => {
          addBotMessage(
            conversationFlow[language as keyof typeof conversationFlow][0]
          );
        }, 500);
      }
    } else {
      setIsMinimized(!isMinimized);
    }
  };

  const closeWidget = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const dismissWidget = () => {
    setIsDismissed(true);
    setShowWidget(false);
  };

  if (!showWidget || isDismissed) return null;

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
              <div
                key={message.id}
                className={`flex ${
                  message.isBot ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[90%] ${
                    message.isBot
                      ? "bg-white text-gray-800 rounded-xl rounded-bl-md shadow-sm border border-gray-200"
                      : "bg-gradient-to-r from-green-600 to-red-600 text-white rounded-xl rounded-br-md shadow-sm"
                  } p-2.5`}
                >
                  {message.isBot && message.icon && (
                    <div className="flex items-center space-x-2 mb-2">
                      {message.icon}
                      <span className="text-xs font-medium text-gray-600">
                        LusoTown Helper
                      </span>
                    </div>
                  )}
                  <p className="text-xs whitespace-pre-line leading-relaxed">
                    {message.text}
                  </p>
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
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-xl rounded-bl-md shadow-sm border border-gray-200 p-2.5 max-w-[90%]">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-medium text-gray-600">LusoTown Helper</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Footer with Message Input */}
          <div className="border-t border-gray-200 bg-white rounded-b-xl">
            {/* Message Input */}
            <div className="p-3">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCustomMessage()}
                  placeholder={isPortuguese ? "Escreve a tua mensagem..." : "Type your message..."}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={isTyping}
                />
                <button
                  onClick={handleCustomMessage}
                  disabled={!customMessage.trim() || isTyping}
                  className="px-4 py-2 bg-gradient-to-r from-primary-600 to-action-600 text-white rounded-lg hover:from-primary-700 hover:to-action-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium min-w-[60px]"
                >
                  {isTyping ? "..." : (isPortuguese ? "Enviar" : "Send")}
                </button>
              </div>
            </div>
            
            {/* Help Text */}
            <div className="px-3 pb-3">
              <div className="flex items-center justify-center space-x-2 text-gray-500 text-xs">
                <MessageCircle className="w-4 h-4" />
                <span>
                  {isPortuguese
                    ? "Escolhe opções acima ou escreve uma mensagem"
                    : "Choose options above or type a message"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleWidget}
        className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-primary-600 via-action-600 to-premium-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group relative overflow-hidden border-2 border-white/20 ${
          isOpen && !isMinimized ? "scale-90" : "scale-100 hover:scale-110"
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
            {isPortuguese ? "Clica para começar →" : "Click to start →"}
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
  );
};

export default WhatsAppWidget;
