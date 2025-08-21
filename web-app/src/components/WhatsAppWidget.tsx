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
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary-300"
          aria-label={isPortuguese ? 'Abrir chat WhatsApp' : 'Open WhatsApp chat'}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-32 sm:bottom-24 right-6 z-50 w-80 bg-white rounded-lg shadow-2xl border">
          {/* Header */}
          <div className="bg-primary-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold">LT</span>
              </div>
              <div>
                <h3 className="font-semibold">LusoTown</h3>
                <p className="text-xs text-primary-100">
                  {isPortuguese ? 'Comunidade Portuguesa' : 'Portuguese Community'}
                </p>
              </div>
            </div>
            <button
              onClick={resetChat}
              className="text-primary-100 hover:text-white text-sm"
              title={isPortuguese ? 'Reiniciar chat' : 'Reset chat'}
            >
              {isPortuguese ? 'Reiniciar' : 'Reset'}
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 bg-secondary-50">
            {messages.map((message, index) => (
              <div key={index} className="mb-4">
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-primary-600 text-white ml-auto'
                      : 'bg-white text-secondary-800 shadow-sm border'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>

                {message.options && !message.isUser && (
                  <div className="mt-2 space-y-2">
                    {message.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleOptionClick(option, optionIndex)}
                        className="block w-full text-left text-sm bg-primary-50 hover:bg-primary-100 text-primary-800 p-2 rounded border transition-colors"
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
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={isPortuguese ? 'Escreve uma mensagem...' : 'Type a message...'}
                className="flex-1 border border-secondary-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full transition-colors"
                aria-label={isPortuguese ? 'Enviar mensagem' : 'Send message'}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {isPortuguese ? 'Comunidade Portuguesa em Londres' : 'Portuguese Community in London'}
            </p>
          </div>
        </div>
      )}
    </>
  );
}