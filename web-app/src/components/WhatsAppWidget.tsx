'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MessageCircle, Send, X, Heart, Users, Calendar, Shield, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; options?: string[] }>>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Helper function to check if language is Portuguese
  const isPortuguese = language === "pt";

  // Focused conversion flow targeting three key areas
  const conversationFlow = useMemo(
    () => ({
      en: [
        {
          message:
            "Ola! 👋 Welcome to LusoTown - London's Portuguese community! \n\nI'm here to help you discover:\n🤝 **Meet Your Match** - Connect with Portuguese speakers\n📺 **Live Streams** - Portuguese cultural content & events\n🚗 **Premium Transport** - Portuguese-speaking drivers\n\nWhat interests you most?",
          options: [
            "🤝 Find my Portuguese match",
            "📺 Watch Portuguese streams",
            "🚗 Book Portuguese driver",
            "❓ How does LusoTown work?",
          ],
          icon: <Heart className="w-4 h-4 text-green-600" />,
        },
        {
          message:
            "Fantastico! 💕 Meet Your Match connects Portuguese speakers in London for meaningful relationships!\n\n✨ **Cultural Compatibility Matching**\n🎯 **3 matches daily** (Free) or **unlimited** (£19.99/month)\n💬 **Portuguese conversation starters**\n🇵🇹 **Verified Portuguese community members**\n🎉 **Event-based connections** at fado nights, festivals\n\nReady to find your Portuguese connections?",
          options: [
            "🚀 Sign up for matching",
            "💰 Tell me about pricing",
            "🛡️ How safe is it?",
            "📍 Who's in my area?",
          ],
          icon: <Heart className="w-4 h-4 text-red-600" />,
        },
        {
          message:
            "Incrivel! 📺 LusoTown TV streams Portuguese culture, business workshops & community events!\n\n🎭 **Live Cultural Shows** - Fado, Portuguese music\n💼 **Business Workshops** - Entrepreneurship, AI training\n⚽ **Sports Events** - Portuguese football watch parties\n🗣️ **Community Discussions** - Real-time chat in Portuguese\n🎪 **Creator Economy** - Earn by streaming content\n\nWant to start watching or creating?",
          options: [
            "📱 Start watching streams",
            "🎥 Become a creator",
            "💬 Join community chat",
            "🔔 Get stream notifications",
          ],
          icon: <Users className="w-4 h-4 text-purple-600" />,
        },
        {
          message:
            "Perfeito! 🚗 Premium Transport connects you with Portuguese-speaking drivers across London!\n\n🛡️ **SIA-Licensed Security Drivers** - £45-65/hour\n👔 **Professional Chauffeurs** - Airport, business, events\n🗣️ **Portuguese-Speaking** - Comfortable conversations\n🎉 **Event Transport** - Fado nights, Portuguese festivals\n⭐ **Luxury Vehicles** - Mercedes, BMW fleet\n\nReady to book your Portuguese driver?",
          options: [
            "🚗 Book chauffeur now",
            "🛡️ Need security driver",
            "💰 Get pricing quote",
            "📍 Coverage areas",
          ],
          icon: <Shield className="w-4 h-4 text-blue-600" />,
        },
        {
          message:
            "Excelente! 🏠 LusoTown is London's complete Portuguese community platform:\n\n❤️ **Meet Your Match** - Find meaningful Portuguese connections\n📺 **LusoTown TV** - Stream & watch Portuguese cultural content\n🚗 **Premium Transport** - Portuguese-speaking drivers\n🎪 **Events & Groups** - Cultural festivals, business networking\n🎯 **All in Portuguese & English** - Feel at home in London\n\nWhich area interests you most?",
          options: [
            "❤️ Find my Portuguese match",
            "📺 Explore streaming platform",
            "🚗 Book premium transport",
            "🎪 Join events & groups",
          ],
          icon: <Calendar className="w-4 h-4 text-premium-600" />,
        },
        {
          message:
            "Amazing! 🚀 As an event creator on LusoTown you get:\n\n💡 **Dual Tools:** Create both social and business events\n💰 **Revenue Opportunities:** Tickets, sponsorships and partnerships\n📊 **Advanced Analytics:** Track engagement and build long-term relationships\n🌆 **Community Reach:** Access Portuguese speakers across the UK\n📢 **Bilingual Marketing:** Templates in English and Portuguese\n🎯 **Quality Audience:** Verified community members only\n\nStart creating events today!",
          options: [
            "Register me as creator!",
            "Revenue opportunities?",
            "Marketing support details",
            "Community reach info",
          ],
          icon: <ArrowRight className="w-4 h-4 text-action-600" />,
        },
        {
          message:
            "Need help? Quick actions:\n\n🚗 Book personal or security driver\n🌆 See all London tours\n👣 How to navigate and use the site\n✉️ Support email: support@lusotown.com",
          options: [
            "🚗 Book driver now",
            "🌆 Browse London tours",
            "📱 Site navigation help",
            "✉️ Email support team",
          ],
          icon: <Users className="w-4 h-4 text-green-600" />,
        },
      ],
      pt: [
        {
          message:
            "Ola! 👋 Bem-vindo a LusoTown - a comunidade portuguesa de Londres! \n\nEstou aqui para te ajudar a descobrir:\n🤝 **Encontra o Teu Match** - Conecta com lusofonos\n📺 **Streams ao Vivo** - Conteudo cultural portugues\n🚗 **Transporte Premium** - Motoristas que falam portugues\n\nO que te interessa mais?",
          options: [
            "🤝 Encontrar o meu match portugues",
            "📺 Ver streams portugueses",
            "🚗 Reservar motorista portugues",
            "❓ Como funciona a LusoTown?",
          ],
          icon: <Heart className="w-4 h-4 text-green-600" />,
        },
        {
          message:
            "Fantastico! 💕 Encontra o Teu Match conecta lusofonos em Londres para relacionamentos significativos!\n\n✨ **Compatibilidade Cultural**\n🎯 **3 matches diarios** (Gratis) ou **ilimitados** (£19.99/mes)\n💬 **Conversas em portugues**\n🇵🇹 **Comunidade portuguesa verificada**\n🎉 **Conexoes em eventos** - noites de fado, festivais\n\nPronto para encontrar as tuas conexoes portuguesas?",
          options: [
            "🚀 Registar para matching",
            "💰 Fala-me dos precos",
            "🛡️ E seguro?",
            "📍 Quem esta na minha area?",
          ],
          icon: <Heart className="w-4 h-4 text-red-600" />,
        },
        {
          message:
            "Incrivel! 📺 LusoTown TV transmite cultura portuguesa, workshops empresariais e eventos comunitarios!\n\n🎭 **Shows Culturais ao Vivo** - Fado, musica portuguesa\n💼 **Workshops Empresariais** - Empreendedorismo, treino IA\n⚽ **Eventos Desportivos** - Jogos de futebol portugues\n🗣️ **Discussoes Comunitarias** - Chat em tempo real\n🎪 **Economia de Criadores** - Ganha dinheiro a transmitir\n\nQueres comecar a ver ou criar conteudo?",
          options: [
            "📱 Comecar a ver streams",
            "🎥 Tornar-me criador",
            "💬 Juntar-me ao chat",
            "🔔 Receber notificacoes",
          ],
          icon: <Users className="w-4 h-4 text-purple-600" />,
        },
        {
          message:
            "Perfeito! 🚗 Transporte Premium conecta-te com motoristas que falam portugues em Londres!\n\n🛡️ **Motoristas de Seguranca SIA** - £45-65/hora\n👔 **Chauffeurs Profissionais** - Aeroporto, negocios, eventos\n🗣️ **Falam Portugues** - Conversas confortaveis\n🎉 **Transporte para Eventos** - Noites de fado, festivais\n⭐ **Veiculos de Luxo** - Frota Mercedes, BMW\n\nPronto para reservar o teu motorista portugues?",
          options: [
            "🚗 Reservar chauffeur agora",
            "🛡️ Preciso motorista seguranca",
            "💰 Pedir orcamento",
            "📍 Areas de cobertura",
          ],
          icon: <Shield className="w-4 h-4 text-blue-600" />,
        },
        {
          message:
            "Excelente! 🏠 LusoTown e a plataforma completa da comunidade portuguesa de Londres:\n\n❤️ **Encontra o Teu Match** - Conexoes portuguesas significativas\n📺 **LusoTown TV** - Transmite e ve conteudo cultural portugues\n🚗 **Transporte Premium** - Motoristas que falam portugues\n🎪 **Eventos e Grupos** - Festivais culturais, networking\n🎯 **Tudo em Portugues e Ingles** - Sente-te em casa em Londres\n\nQue area te interessa mais?",
          options: [
            "❤️ Encontrar o meu match portugues",
            "📺 Explorar plataforma streaming",
            "🚗 Reservar transporte premium",
            "🎪 Juntar-me a eventos e grupos",
          ],
          icon: <Calendar className="w-4 h-4 text-premium-600" />,
        },
        {
          message:
            "Incrivel! 🚀 Como criador de eventos na LusoTown recebes:\n\n💡 **Ferramentas Duais:** Cria eventos sociais e empresariais\n💰 **Oportunidades de Receita:** Bilhetes, patrocinios e parcerias\n📊 **Analytics Avancadas:** Acompanha envolvimento e constroi relacionamentos\n🌆 **Alcance Comunitario:** Acesso a lusofonos em todo Reino Unido\n📢 **Marketing Bilingue:** Modelos em Ingles e Portugues\n🎯 **Audiencia de Qualidade:** Apenas membros verificados da comunidade\n\nComeca a criar eventos hoje!",
          options: [
            "Regista-me como criador!",
            "Oportunidades de receita?",
            "Detalhes do apoio de marketing",
            "Informacoes sobre alcance comunitario",
          ],
          icon: <ArrowRight className="w-4 h-4 text-action-600" />,
        },
        {
          message:
            "Precisas de ajuda? Acoes rapidas:\n\n🚗 Reservar motorista pessoal ou de seguranca\n🌆 Ver todos os tours de Londres\n👣 Como navegar e usar o site\n✉️ Email de apoio: support@lusotown.com",
          options: [
            "🚗 Reservar motorista agora",
            "🌆 Explorar tours de Londres",
            "📱 Ajuda de navegacao do site",
            "✉️ Email equipa de apoio",
          ],
          icon: <Users className="w-4 h-4 text-green-600" />,
        },
      ],
    }),
    [language]
  );

  const currentFlow = isPortuguese ? conversationFlow.pt : conversationFlow.en;

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = currentFlow[0];
      setMessages([
        {
          text: welcomeMessage.message,
          isUser: false,
          options: welcomeMessage.options,
        },
      ]);
    }
  }, [isOpen, messages.length, currentFlow]);

  const handleOptionClick = (option: string, optionIndex: number) => {
    // Add user's selection
    setMessages((prev) => [...prev, { text: option, isUser: true }]);

    // Determine next step based on current step and option selected
    let nextStep = 0;
    
    // Main menu navigation
    if (currentStep === 0) {
      if (optionIndex === 0) nextStep = 1; // Meet Your Match
      else if (optionIndex === 1) nextStep = 2; // Streaming
      else if (optionIndex === 2) nextStep = 3; // Transport
      else if (optionIndex === 3) nextStep = 4; // How it works
    }
    // Sub-menu navigation - redirect to signup/relevant pages
    else if (currentStep >= 1 && currentStep <= 4) {
      nextStep = 5; // Event creator info
    }
    // Final step - support options
    else {
      nextStep = 6; // Support options
    }

    // Add bot response after short delay
    setTimeout(() => {
      if (nextStep < currentFlow.length) {
        const nextMessage = currentFlow[nextStep];
        setMessages((prev) => [
          ...prev,
          {
            text: nextMessage.message,
            isUser: false,
            options: nextMessage.options,
          },
        ]);
        setCurrentStep(nextStep);
      }
    }, 800);
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      setMessages((prev) => [...prev, { text: userInput, isUser: true }]);
      setUserInput('');
      
      // Add generic helpful response
      setTimeout(() => {
        const helpMessage = isPortuguese
          ? "Obrigado pela tua mensagem! Para melhor assistencia, usa as opcoes acima ou contacta support@lusotown.com 📧"
          : "Thank you for your message! For better assistance, use the options above or contact support@lusotown.com 📧";
        setMessages((prev) => [
          ...prev,
          { text: helpMessage, isUser: false },
        ]);
      }, 1000);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentStep(0);
    setUserInput('');
  };

  return (
    <>
      {/* WhatsApp Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          aria-label={isPortuguese ? "Abrir chat WhatsApp" : "Open WhatsApp chat"}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-lg shadow-2xl border">
          {/* Header */}
          <div className="bg-green-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-green-500 font-bold">LT</span>
              </div>
              <div>
                <h3 className="font-semibold">LusoTown</h3>
                <p className="text-xs text-green-100">
                  {isPortuguese ? "Comunidade Portuguesa" : "Portuguese Community"}
                </p>
              </div>
            </div>
            <button
              onClick={resetChat}
              className="text-green-200 hover:text-white text-sm"
              title={isPortuguese ? "Reiniciar chat" : "Reset chat"}
            >
              {isPortuguese ? "Reiniciar" : "Reset"}
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message, index) => (
              <div key={index} className="mb-4">
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-green-500 text-white ml-auto'
                      : 'bg-white text-gray-800 shadow-sm border'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
                
                {/* Option buttons */}
                {message.options && !message.isUser && (
                  <div className="mt-2 space-y-2">
                    {message.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleOptionClick(option, optionIndex)}
                        className="block w-full text-left text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 p-2 rounded border transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t bg-white rounded-b-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={isPortuguese ? "Escreve uma mensagem..." : "Type a message..."}
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-green-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
                aria-label={isPortuguese ? "Enviar mensagem" : "Send message"}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {isPortuguese
                ? "Comunidade Portuguesa em Londres"
                : "Portuguese Community in London"}
            </p>
          </div>
        </div>
      )}
    </>
  );
}