'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  ArrowLeft, 
  Shield, 
  Flag, 
  MoreVertical,
  Heart,
  User,
  Clock,
  CheckCircle,
  AlertTriangle,
  X,
  Languages
} from 'lucide-react';

// Import Portuguese conversation starters
import { getPortugueseConversationStarters } from '@/lib/cultural-matching';
import { PORTUGUESE_SPEAKING_COUNTRIES } from '@/config/portuguese-countries';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  language?: 'pt' | 'en';
}

interface ChatUser {
  id: string;
  name: string;
  heritage: string[];
  isVerified: boolean;
  isOnline: boolean;
  lastSeen: Date;
  safetyScore: number;
}

interface CulturalMessagingProps {
  matchId: string;
  matchName: string;
  onClose: () => void;
  className?: string;
}

export default function CulturalMessaging({
  matchId,
  matchName,
  onClose,
  className = ''
}: CulturalMessagingProps) {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatUser, setChatUser] = useState<ChatUser | null>(null);
  const [showSafety, setShowSafety] = useState(false);
  const [messageLanguage, setMessageLanguage] = useState<'pt' | 'en'>(language as 'pt' | 'en');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const translations = {
    en: {
      title: 'Chat with {name}',
      typePlaceholder: 'Type your message...',
      send: 'Send',
      online: 'Online',
      lastSeen: 'Last seen {time}',
      verified: 'Verified Member',
      safety: {
        title: 'Safety & Reporting',
        subtitle: 'Your safety is our priority',
        report: 'Report User',
        block: 'Block User',
        guidelines: 'Community Guidelines',
        close: 'Close'
      },
      starters: {
        title: 'Conversation Starters',
        subtitle: 'Based on your Portuguese cultural connection'
      },
      languages: {
        portuguese: 'Portuguese',
        english: 'English',
        switch: 'Switch to'
      },
      messages: {
        today: 'Today',
        yesterday: 'Yesterday',
        delivered: 'Delivered',
        read: 'Read'
      }
    },
    pt: {
      title: 'Conversa com {name}',
      typePlaceholder: 'Digite a sua mensagem...',
      send: 'Enviar',
      online: 'Online',
      lastSeen: 'Visto pela última vez {time}',
      verified: 'Membro Verificado',
      safety: {
        title: 'Segurança e Denúncias',
        subtitle: 'A sua segurança é a nossa prioridade',
        report: 'Denunciar Utilizador',
        block: 'Bloquear Utilizador',
        guidelines: 'Diretrizes da Comunidade',
        close: 'Fechar'
      },
      starters: {
        title: 'Ideias para Conversar',
        subtitle: 'Baseadas na vossa ligação cultural portuguesa'
      },
      languages: {
        portuguese: 'Português',
        english: 'Inglês',
        switch: 'Mudar para'
      },
      messages: {
        today: 'Hoje',
        yesterday: 'Ontem',
        delivered: 'Entregue',
        read: 'Lido'
      }
    }
  };

  const tr = translations[language];

  // Mock chat user data
  useEffect(() => {
    setChatUser({
      id: matchId,
      name: matchName,
      heritage: ['PT', 'BR'],
      isVerified: true,
      isOnline: Math.random() > 0.5,
      lastSeen: new Date(Date.now() - Math.random() * 3600000),
      safetyScore: 8.5
    });

    // Mock initial messages
    setMessages([
      {
        id: '1',
        senderId: matchId,
        content: language === 'pt' 
          ? 'Olá! Vi que também tem ligações à cultura portuguesa. Como tem sido a experiência de viver no Reino Unido?'
          : 'Hello! I saw you also have connections to Portuguese culture. How has your experience living in the UK been?',
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: true,
        language: language as 'pt' | 'en'
      }
    ]);
  }, [matchId, matchName, language]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && chatUser) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: 'current-user',
        content: newMessage,
        timestamp: new Date(),
        isRead: false,
        language: messageLanguage
      };

      setMessages(prev => [...prev, message]);
      setNewMessage('');

      // Simulate response after delay
      setTimeout(() => {
        const responses = [
          language === 'pt' 
            ? 'Que interessante! Também adoro a comunidade portuguesa aqui.'
            : 'That\'s interesting! I also love the Portuguese community here.',
          language === 'pt'
            ? 'Concordo completamente! Conhece algum evento cultural por aqui?'
            : 'I completely agree! Do you know any cultural events around here?',
          language === 'pt'
            ? 'Obrigado por partilhar! Gostava de conversar mais sobre isso.'
            : 'Thanks for sharing! I\'d love to chat more about that.'
        ];
        
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          senderId: chatUser.id,
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
          isRead: false,
          language: language as 'pt' | 'en'
        };

        setMessages(prev => [...prev, responseMessage]);
      }, 2000);
    }
  };

  const getConversationStarters = () => {
    if (!chatUser) return [];
    
    return getPortugueseConversationStarters(
      ['portuguese_culture', 'community_events'], // Mock shared interests
      chatUser.heritage,
      language as 'en' | 'pt'
    );
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (messageDate.getTime() === today.getTime()) {
      return `${tr.messages.today} ${date.toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit' })}`;
    } else if (messageDate.getTime() === yesterday.getTime()) {
      return `${tr.messages.yesterday} ${date.toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString(language, { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  };

  const renderSafetyPanel = () => (
    <div className="absolute inset-0 bg-white z-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{tr.safety.title}</h3>
          <p className="text-sm text-gray-600">{tr.safety.subtitle}</p>
        </div>
        <button
          onClick={() => setShowSafety(false)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="space-y-4">
        {chatUser && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Safety Score: {chatUser.safetyScore}/10
              </span>
            </div>
            <p className="text-xs text-green-700 mt-1">
              This user has been verified by our Portuguese community moderators.
            </p>
          </div>
        )}

        <button className="w-full p-4 text-left border border-red-200 rounded-lg hover:bg-red-50">
          <div className="flex items-center space-x-3">
            <Flag className="w-5 h-5 text-red-600" />
            <div>
              <div className="font-medium text-red-800">{tr.safety.report}</div>
              <div className="text-sm text-red-600">Report inappropriate behavior</div>
            </div>
          </div>
        </button>

        <button className="w-full p-4 text-left border border-red-200 rounded-lg hover:bg-red-50">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <div>
              <div className="font-medium text-red-800">{tr.safety.block}</div>
              <div className="text-sm text-red-600">Block this user from contacting you</div>
            </div>
          </div>
        </button>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">{tr.safety.guidelines}</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Be respectful of Portuguese cultural values</li>
            <li>• Keep conversations friendly and community-focused</li>
            <li>• Report any suspicious or inappropriate behavior</li>
            <li>• Don't share personal information too quickly</li>
          </ul>
        </div>
      </div>
    </div>
  );

  if (!chatUser) {
    return (
      <div className={`max-w-md mx-auto bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-md mx-auto bg-white rounded-lg border border-gray-200 relative ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-4 h-4 text-gray-500" />
          </button>
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{chatUser.name}</h3>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              {chatUser.isOnline ? (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{tr.online}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{tr.lastSeen.replace('{time}', formatTime(chatUser.lastSeen))}</span>
                </div>
              )}
              {chatUser.isVerified && (
                <div className="flex items-center space-x-1">
                  <Shield className="w-3 h-3 text-green-500" />
                  <span>{tr.verified}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Heritage flags */}
          {chatUser.heritage.slice(0, 2).map(code => {
            const country = PORTUGUESE_SPEAKING_COUNTRIES.find(c => c.code === code);
            return country ? (
              <span key={code} className="text-sm">{country.flag}</span>
            ) : null;
          })}
          
          <button
            onClick={() => setShowSafety(true)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Conversation starters */}
      {messages.length <= 1 && (
        <div className="p-4 bg-primary-50 border-b border-primary-100">
          <div className="text-xs font-medium text-primary-700 mb-2">
            {tr.starters.title}
          </div>
          <div className="space-y-1">
            {getConversationStarters().slice(0, 2).map((starter, index) => (
              <button
                key={index}
                onClick={() => setNewMessage(starter)}
                className="block w-full text-left text-xs text-primary-600 hover:text-primary-800 p-1 rounded hover:bg-primary-100"
              >
                "{starter}"
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              message.senderId === 'current-user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg ${
                message.senderId === 'current-user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <div className={`flex items-center justify-between mt-1 text-xs ${
                message.senderId === 'current-user' ? 'text-primary-100' : 'text-gray-500'
              }`}>
                <span>{formatTime(message.timestamp)}</span>
                {message.senderId === 'current-user' && (
                  <div className="flex items-center space-x-1">
                    {message.language && (
                      <Languages className="w-3 h-3" />
                    )}
                    {message.isRead ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <CheckCircle className="w-3 h-3 opacity-50" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="p-4 border-t border-gray-200">
        {/* Language selector */}
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xs text-gray-500">{tr.languages.switch}:</span>
          <button
            onClick={() => setMessageLanguage('pt')}
            className={`text-xs px-2 py-1 rounded ${
              messageLanguage === 'pt' ? 'bg-primary-100 text-primary-700' : 'text-gray-500'
            }`}
          >
            🇵🇹 {tr.languages.portuguese}
          </button>
          <button
            onClick={() => setMessageLanguage('en')}
            className={`text-xs px-2 py-1 rounded ${
              messageLanguage === 'en' ? 'bg-primary-100 text-primary-700' : 'text-gray-500'
            }`}
          >
            🇬🇧 {tr.languages.english}
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={tr.typePlaceholder}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Safety panel overlay */}
      {showSafety && renderSafetyPanel()}
    </div>
  );
}