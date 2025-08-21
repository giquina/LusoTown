'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MessageCircle, Send, X, Heart, Users, Calendar, Shield, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

type ChatMessage = { text: string; isUser: boolean; options?: string[] };

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
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

  const isPortuguese = language === 'pt';

  // Focused conversion flow targeting three key areas
  const conversationFlow = useMemo(
    () => ({
      en: [
        {
          message:
            "Ola! 👋 Welcome to LusoTown - London's Portuguese community!\n\nI'm here to help you discover:\n🤝 Meet Your Match\n📺 Live Streams\n🚗 Premium Transport\n\nWhat interests you most?",
          options: [
            '🤝 Find my Portuguese match',
            '📺 Watch Portuguese streams',
            '🚗 Book Portuguese driver',
            '❓ How does LusoTown work?',
          ],
        },
        {
          message:
            'Meet Your Match connects Portuguese speakers in London for meaningful relationships. Ready to find your connections?',
          options: ['🚀 Sign up for matching', '💰 Tell me about pricing', '🛡️ How safe is it?', "📍 Who's in my area?"],
        },
        {
          message:
            'LusoTown TV streams Portuguese culture, business workshops, and community events. Want to start watching or creating?',
          options: ['📱 Start watching streams', '🎥 Become a creator', '💬 Join community chat', '🔔 Get stream notifications'],
        },
        {
          message:
            'Premium Transport connects you with Portuguese-speaking drivers across London. Ready to book your driver?',
          options: ['🚗 Book chauffeur now', '🛡️ Need security driver', '💰 Get pricing quote', '📍 Coverage areas'],
        },
        {
          message:
            "LusoTown is London's complete Portuguese community platform. Which area interests you most?",
          options: ['❤️ Find my Portuguese match', '📺 Explore streaming platform', '🚗 Book premium transport', '🎪 Join events & groups'],
        },
        {
          message:
            'As an event creator on LusoTown you get tools, revenue options and analytics. Start creating events today!',
          options: ['Register me as creator!', 'Revenue opportunities?', 'Marketing support details', 'Community reach info'],
        },
        {
          message:
            'Need help? Quick actions: book a driver, browse tours, site navigation help, or email support@lusotown.com',
          options: ['🚗 Book driver now', '🌆 Browse London tours', '📱 Site navigation help', '✉️ Email support team'],
        },
      ],
      pt: [
        {
          message:
            'Ola! 👋 Bem-vindo a LusoTown - a comunidade portuguesa de Londres! O que te interessa mais?',
          options: [
            '🤝 Encontrar o meu match',
            '📺 Ver streams',
            '🚗 Reservar motorista portugues',
            '❓ Como funciona a LusoTown?',
          ],
        },
        {
          message:
            'Encontra o Teu Match conecta lusofonos em Londres para relacionamentos significativos. Pronto para comecar?',
          options: ['🚀 Registar para matching', '💰 Precos', '🛡️ E seguro?', '📍 Quem esta na minha area?'],
        },
        {
          message:
            'LusoTown TV transmite cultura portuguesa, workshops e eventos comunitarios. Queres ver ou criar?',
          options: ['📱 Ver streams', '🎥 Tornar-me criador', '💬 Entrar no chat', '🔔 Notificacoes de streams'],
        },
        {
          message:
            'Transporte Premium com motoristas que falam portugues em Londres. Pronto para reservar?',
          options: ['🚗 Reservar chauffeur agora', '🛡️ Motorista de seguranca', '💰 Orcamento', '📍 Areas de cobertura'],
        },
        {
          message:
            'LusoTown e a plataforma completa da comunidade portuguesa de Londres. O que te interessa mais?',
          options: [
            '❤️ Encontrar o meu match portugues',
            '📺 Explorar plataforma streaming',
            '🚗 Reservar transporte premium',
            '🎪 Juntar-me a eventos e grupos',
          ],
        },
        {
          message:
            'Como criador recebes ferramentas, oportunidades de receita e analytics. Comeca a criar eventos hoje!',
          options: ['Regista-me como criador!', 'Oportunidades de receita?', 'Apoio de marketing', 'Alcance comunitario'],
        },
        {
          message:
            'Precisas de ajuda? Acoes rapidas: reservar motorista, ver tours, ajuda do site ou email support@lusotown.com',
          options: ['🚗 Reservar motorista agora', '🌆 Explorar tours de Londres', '📱 Ajuda de navegacao', '✉️ Email equipa de apoio'],
        },
      ],
    }),
  []
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
    setMessages((prev) => [...prev, { text: option, isUser: true }]);

    let nextStep = 0;
    if (currentStep === 0) {
      if (optionIndex === 0) nextStep = 1;
      else if (optionIndex === 1) nextStep = 2;
      else if (optionIndex === 2) nextStep = 3;
      else if (optionIndex === 3) nextStep = 4;
    } else if (currentStep >= 1 && currentStep <= 4) {
      nextStep = 5;
    } else {
      nextStep = 6;
    }

    setTimeout(() => {
      if (nextStep < currentFlow.length) {
        const nextMessage = currentFlow[nextStep];
        setMessages((prev) => [
          ...prev,
          { text: nextMessage.message, isUser: false, options: nextMessage.options },
        ]);
        setCurrentStep(nextStep);
      }
    }, 800);
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      setMessages((prev) => [...prev, { text: userInput, isUser: true }]);
      setUserInput('');

      setTimeout(() => {
        const helpMessage = isPortuguese
          ? 'Obrigado pela tua mensagem! Usa as opcoes acima ou contacta support@lusotown.com 📧'
          : 'Thank you! Use the options above or contact support@lusotown.com 📧';
        setMessages((prev) => [...prev, { text: helpMessage, isUser: false }]);
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
      <div className="fixed bottom-20 sm:bottom-6 right-6 z-50">
        <div className="relative">
          {/* Pulsing background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full animate-ping opacity-75"></div>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative bg-gradient-to-r from-secondary-600 via-accent-600 to-coral-600 hover:from-secondary-700 hover:via-accent-700 hover:to-coral-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-secondary-300 group"
            aria-label={isPortuguese ? 'Abrir chat LusoTown' : 'Open LusoTown chat'}
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {isOpen ? (
              <X className="relative w-6 h-6 z-10" />
            ) : (
              <div className="relative z-10 flex items-center">
                <MessageCircle className="w-6 h-6" />
                {/* Notification dot */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 border-2 border-white rounded-full animate-pulse"></div>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-32 sm:bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-primary-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-secondary-600 via-accent-600 to-coral-600 text-white p-5 flex items-center justify-between relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl transform translate-x-10 -translate-y-10"></div>
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">LT</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">LusoTown</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-xs text-white/90 font-medium">
                    {isPortuguese ? 'Comunidade Portuguesa Online' : 'Portuguese Community Online'}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={resetChat}
              className="relative z-10 text-white/80 hover:text-white text-sm bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-200"
              title={isPortuguese ? 'Reiniciar chat' : 'Reset chat'}
            >
              {isPortuguese ? 'Reiniciar' : 'Reset'}
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-5 bg-gradient-to-b from-primary-50/30 to-secondary-50/30 relative">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full" style={{backgroundImage: 'radial-gradient(circle, #0066cc 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
            </div>
            
            <div className="relative z-10">
              {messages.map((message, index) => (
                <div key={index} className="mb-4">
                  <div
                    className={`max-w-xs p-4 rounded-2xl shadow-lg ${
                      message.isUser
                        ? 'bg-gradient-to-r from-secondary-600 to-accent-600 text-white ml-auto border border-secondary-500/20'
                        : 'bg-white text-gray-800 border border-primary-200/50 backdrop-blur-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                  </div>

                  {message.options && !message.isUser && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          onClick={() => handleOptionClick(option, optionIndex)}
                          className="group block w-full text-left text-sm bg-gradient-to-r from-primary-50 to-secondary-50 hover:from-primary-100 hover:to-secondary-100 text-primary-800 p-3 rounded-xl border border-primary-200 hover:border-primary-300 transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                            <span className="font-medium">{option}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="p-5 border-t border-primary-200 bg-white">
            <div className="flex gap-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={isPortuguese ? 'Escreve uma mensagem...' : 'Type a message...'}
                className="flex-1 border border-primary-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-secondary-400 focus:ring-2 focus:ring-secondary-200 bg-primary-50/50 transition-all duration-200"
              />
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-secondary-600 to-accent-600 hover:from-secondary-700 hover:to-accent-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
                aria-label={isPortuguese ? 'Enviar mensagem' : 'Send message'}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-600 font-medium flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full"></div>
                {isPortuguese ? 'Comunidade Portuguesa em Londres' : 'Portuguese Community in London'}
                <div className="w-2 h-2 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full"></div>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}