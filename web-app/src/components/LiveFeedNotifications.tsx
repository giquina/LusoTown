'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';

interface Notification {
  id: string;
  type: 'signup' | 'subscription' | 'event' | 'match' | 'business' | 'streaming' | 'workshop' | 'networking' | 'collaboration' | 'achievement' | 'cultural' | 'transport' | 'review' | 'partnership';
  message: string;
  messagePt: string;
  name: string;
  location: string;
  timestamp: string;
  icon: string;
}

export default function LiveFeedNotifications() {
  const { language } = useLanguage();
  const isPortuguese = language === 'pt';
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Portuguese names and UK locations
  const portugalMockData = [
    // Recent signups
    { type: 'signup', name: 'Sofia Pereira', location: 'Camden, London', icon: '👋', 
      message: 'just joined LusoTown', messagePt: 'juntou-se ao LusoTown' },
    { type: 'signup', name: 'Miguel Santos', location: 'Vauxhall, London', icon: '🎉', 
      message: 'joined the Portuguese community', messagePt: 'juntou-se à comunidade portuguesa' },
    { type: 'signup', name: 'Ana Costa', location: 'Stockwell, London', icon: '💚', 
      message: 'signed up for events', messagePt: 'registou-se para eventos' },
    { type: 'signup', name: 'João Ferreira', location: 'Greenwich, London', icon: '🇵🇹', 
      message: 'joined LusoTown', messagePt: 'juntou-se ao LusoTown' },
    { type: 'signup', name: 'Beatriz Silva', location: 'Bermondsey, London', icon: '✨', 
      message: 'created a profile', messagePt: 'criou um perfil' },
    
    // Premium subscriptions
    { type: 'subscription', name: 'Carlos Ribeiro', location: 'Kensington, London', icon: '⭐', 
      message: 'upgraded to Cultural Ambassador', messagePt: 'fez upgrade para Embaixador Cultural' },
    { type: 'subscription', name: 'Mariana Lopes', location: 'Canary Wharf, London', icon: '🚀', 
      message: 'joined Premium membership', messagePt: 'juntou-se à membresía Premium' },
    { type: 'subscription', name: 'Ricardo Mendes', location: 'King\'s Cross, London', icon: '💎', 
      message: 'subscribed to Community Member', messagePt: 'subscreveu Membro da Comunidade' },
    
    // Event bookings
    { type: 'event', name: 'Inês Rodrigues', location: 'Hampstead, London', icon: '🎭', 
      message: 'booked Fado Night in Camden', messagePt: 'reservou Noite de Fado em Camden' },
    { type: 'event', name: 'Pedro Oliveira', location: 'Clapham, London', icon: '🍷', 
      message: 'joined Wine Tasting in Covent Garden', messagePt: 'juntou-se à Prova de Vinhos em Covent Garden' },
    { type: 'event', name: 'Ricardo Santos', location: 'Moorgate, London', icon: '💻', 
      message: 'registered for Vibe Coding Workshop', messagePt: 'registou-se para Workshop de Vibe Coding' },
    { type: 'event', name: 'Sofia Martins', location: 'Camden, London', icon: '🤖', 
      message: 'joined AI Website Building Workshop', messagePt: 'juntou-se ao Workshop de Criação de Websites com IA' },
    { type: 'event', name: 'Catarina Nunes', location: 'Islington, London', icon: '💼', 
      message: 'registered for Business Networking', messagePt: 'registou-se para Networking Empresarial' },
    { type: 'event', name: 'Tiago Fernandes', location: 'Shoreditch, London', icon: '🎨', 
      message: 'booked Cultural Workshop', messagePt: 'reservou Workshop Cultural' },
    
    // Matches and connections
    { type: 'match', name: 'Diana Alves', location: 'Notting Hill, London', icon: '💕', 
      message: 'found a match!', messagePt: 'encontrou uma correspondência!' },
    { type: 'match', name: 'Gonçalo Martins', location: 'Borough, London', icon: '🤝', 
      message: 'connected with someone', messagePt: 'conectou-se com alguém' },
    { type: 'match', name: 'Liliana Castro', location: 'Elephant & Castle, London', icon: '💖', 
      message: 'made a successful match', messagePt: 'fez uma correspondência bem-sucedida' },
    
    // Business directory
    { type: 'business', name: 'António Silva', location: 'Westminster, London', icon: '🏪', 
      message: 'added their business to directory', messagePt: 'adicionou o seu negócio ao diretório' },
    { type: 'business', name: 'Fernanda Carvalho', location: 'Bethnal Green, London', icon: '☕', 
      message: 'listed Portuguese café', messagePt: 'listou café português' },
    { type: 'business', name: 'Bruno Moreira', location: 'Tottenham, London', icon: '🛠️', 
      message: 'registered construction services', messagePt: 'registou serviços de construção' },

    // Streaming activities
    { type: 'streaming', name: 'Cristina Pinto', location: 'Brixton, London', icon: '📺', 
      message: 'started streaming Portuguese cooking', messagePt: 'começou a transmitir culinária portuguesa' },
    { type: 'streaming', name: 'Manuel Rosa', location: 'Kennington, London', icon: '🎤', 
      message: 'went live with Fado session', messagePt: 'transmitiu sessão de Fado ao vivo' },
    { type: 'streaming', name: 'Teresa Campos', location: 'Oval, London', icon: '💬', 
      message: 'hosted Portuguese chat room', messagePt: 'organizou sala de chat portuguesa' },

    // Workshop activities  
    { type: 'workshop', name: 'Rodrigo Pereira', location: 'London Bridge, London', icon: '👨‍💻', 
      message: 'completed AI Workshop', messagePt: 'completou Workshop de IA' },
    { type: 'workshop', name: 'Carla Mendes', location: 'Angel, London', icon: '🎯', 
      message: 'finished Digital Marketing course', messagePt: 'terminou curso de Marketing Digital' },
    { type: 'workshop', name: 'Hugo Santos', location: 'Old Street, London', icon: '🚀', 
      message: 'graduated from Startup Bootcamp', messagePt: 'graduou-se do Bootcamp de Startups' },

    // Networking activities
    { type: 'networking', name: 'Isabel Ferreira', location: 'Fitzrovia, London', icon: '🤝', 
      message: 'attended Professional Meetup', messagePt: 'participou em Encontro Profissional' },
    { type: 'networking', name: 'Vítor Costa', location: 'Aldgate, London', icon: '💼', 
      message: 'joined Business Network', messagePt: 'juntou-se à Rede Empresarial' },
    { type: 'networking', name: 'Patrícia Lima', location: 'Liverpool Street, London', icon: '🌟', 
      message: 'expanded professional network', messagePt: 'expandiu rede profissional' },

    // Collaboration activities
    { type: 'collaboration', name: 'André Moura', location: 'Barbican, London', icon: '🤲', 
      message: 'started business collaboration', messagePt: 'iniciou colaboração empresarial' },
    { type: 'collaboration', name: 'Mónica Sousa', location: 'Holborn, London', icon: '⚡', 
      message: 'partnered on tech project', messagePt: 'fez parceria em projeto tech' },

    // Achievement activities
    { type: 'achievement', name: 'Fábio Rodrigues', location: 'Tower Hill, London', icon: '🏆', 
      message: 'reached 100 connections', messagePt: 'alcançou 100 conexões' },
    { type: 'achievement', name: 'Raquel Santos', location: 'Paddington, London', icon: '🎖️', 
      message: 'earned Community Leader badge', messagePt: 'conquistou distintivo de Líder Comunitário' },
    { type: 'achievement', name: 'Diogo Silva', location: 'Russell Square, London', icon: '✨', 
      message: 'became event host', messagePt: 'tornou-se anfitrião de eventos' },

    // Cultural activities
    { type: 'cultural', name: 'Leonor Almeida', location: 'Covent Garden, London', icon: '🇵🇹', 
      message: 'organized Portuguese cultural event', messagePt: 'organizou evento cultural português' },
    { type: 'cultural', name: 'Eduardo Neves', location: 'Camden Town, London', icon: '🎭', 
      message: 'promoted Portuguese heritage', messagePt: 'promoveu património português' },
    { type: 'cultural', name: 'Susana Lopes', location: 'Hampstead Heath, London', icon: '📚', 
      message: 'shared Portuguese story', messagePt: 'partilhou história portuguesa' },

    // Transport activities
    { type: 'transport', name: 'Nuno Cardoso', location: 'Canary Wharf, London', icon: '🚗', 
      message: 'booked premium transport', messagePt: 'reservou transporte premium' },
    { type: 'transport', name: 'Joana Ribeiro', location: 'Greenwich, London', icon: '🛣️', 
      message: 'used group transport service', messagePt: 'usou serviço de transporte em grupo' },

    // Review activities
    { type: 'review', name: 'Mário Pires', location: 'Waterloo, London', icon: '⭐', 
      message: 'left 5-star business review', messagePt: 'deixou avaliação de 5 estrelas' },
    { type: 'review', name: 'Cristina Marques', location: 'Bank, London', icon: '👍', 
      message: 'recommended Portuguese service', messagePt: 'recomendou serviço português' },

    // Partnership activities
    { type: 'partnership', name: 'Francisco Gomes', location: 'King\'s College, London', icon: '🎓', 
      message: 'joined university partnership', messagePt: 'juntou-se à parceria universitária' },
    { type: 'partnership', name: 'Bárbara Costa', location: 'UCL, London', icon: '📖', 
      message: 'enrolled in student program', messagePt: 'inscreveu-se no programa estudantil' },
  ];

  useEffect(() => {
    // Generate realistic notifications
    const generateNotifications = () => {
      const shuffled = [...portugalMockData].sort(() => Math.random() - 0.5);
      return shuffled.map((item, index) => ({
        id: `notification-${index}`,
        type: item.type as any,
        message: item.message,
        messagePt: item.messagePt,
        name: item.name,
        location: item.location,
        timestamp: new Date(Date.now() - Math.random() * 300000).toISOString(), // Random time within last 5 minutes
        icon: item.icon
      }));
    };

    setNotifications(generateNotifications());
  }, []);

  useEffect(() => {
    if (notifications.length === 0) return;

    const showNotification = () => {
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      setCurrentNotification(randomNotification);
      setIsVisible(true);

      // Hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(showNotification, 3000);

    // Then show notifications every 8-12 seconds
    const interval = setInterval(() => {
      if (!isVisible) {
        showNotification();
      }
    }, Math.random() * 4000 + 8000); // 8-12 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [notifications, isVisible]);

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'signup': return 'from-green-500 to-green-600';
      case 'subscription': return 'from-purple-500 to-purple-600';
      case 'event': return 'from-blue-500 to-blue-600';
      case 'match': return 'from-pink-500 to-pink-600';
      case 'business': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const hideNotification = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && currentNotification && (
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.8 }}
          className="fixed bottom-6 left-6 z-50 max-w-sm"
        >
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 relative overflow-hidden">
            {/* Gradient accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getNotificationColor(currentNotification.type)}`} />
            
            {/* Close button */}
            <button
              onClick={hideNotification}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="text-2xl mt-0.5">
                {currentNotification.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900 truncate">
                    {currentNotification.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {currentNotification.location}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 leading-relaxed">
                  {isPortuguese ? currentNotification.messagePt : currentNotification.message}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">
                    {new Date(currentNotification.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                  
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 font-medium">
                      {isPortuguese ? 'LIVE' : 'LIVE'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
