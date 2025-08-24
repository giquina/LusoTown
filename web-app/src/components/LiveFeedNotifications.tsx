'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import { PORTUGUESE_COLORS, brandColors } from '@/config/brand';

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

  // Portuguese names and United Kingdom locations
  const portugalMockData = [
    // Recent signups
    { type: 'signup', name: 'Sofia Pereira', location: 'Camden, London', icon: '👋', 
      message: 'just joined LusoTown', messagePt: 'juntou-se ao LusoTown' },
    { type: 'signup', name: 'Miguel Santos', location: 'Vauxhall, London', icon: '🎉', 
      message: 'joined the Portuguese-speaking community', messagePt: 'juntou-se à comunidade de falantes de português' },
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
      message: 'joined Smart Website Building Workshop', messagePt: 'juntou-se ao Workshop de Criação de Websites Inteligentes' },
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
      message: 'completed Smart Technology Workshop', messagePt: 'completou Workshop de Tecnologia Inteligente' },
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
      case 'signup': return { 
        gradient: `from-[${PORTUGUESE_COLORS.green[400]}] to-[${PORTUGUESE_COLORS.green[500]}]`,
        glow: PORTUGUESE_COLORS.green[400],
        background: PORTUGUESE_COLORS.green[50]
      };
      case 'subscription': return { 
        gradient: `from-[${brandColors.premium}] to-[${brandColors.premium}CC]`,
        glow: brandColors.premium,
        background: '#F3E8FF'
      };
      case 'event': return { 
        gradient: `from-[${brandColors.primary}] to-[${PORTUGUESE_COLORS.gold[600]}]`,
        glow: brandColors.primary,
        background: PORTUGUESE_COLORS.gold[50]
      };
      case 'match': return { 
        gradient: `from-[${brandColors.action}] to-[${PORTUGUESE_COLORS.red[600]}]`,
        glow: brandColors.action,
        background: PORTUGUESE_COLORS.red[50]
      };
      case 'business': return { 
        gradient: `from-[${brandColors.coral}] to-[${brandColors.coral}DD]`,
        glow: brandColors.coral,
        background: '#FFF7ED'
      };
      case 'cultural': return { 
        gradient: `from-[${PORTUGUESE_COLORS.gold[500]}] to-[${PORTUGUESE_COLORS.brown[500]}]`,
        glow: PORTUGUESE_COLORS.gold[500],
        background: PORTUGUESE_COLORS.gold[50]
      };
      case 'streaming': return { 
        gradient: `from-[${brandColors.action}] to-[#E11D48]`,
        glow: brandColors.action,
        background: PORTUGUESE_COLORS.red[50]
      };
      default: return { 
        gradient: `from-[${brandColors.primary}] to-[${PORTUGUESE_COLORS.gold[600]}]`,
        glow: brandColors.primary,
        background: PORTUGUESE_COLORS.gold[50]
      };
    }
  };

  const hideNotification = () => {
    setIsVisible(false);
  };

  const colorScheme = currentNotification ? getNotificationColor(currentNotification.type) : null;

  return (
    <AnimatePresence>
      {isVisible && currentNotification && colorScheme && (
        <motion.div
          initial={{ 
            opacity: 0, 
            x: -400, 
            scale: 0.9,
            rotateY: -15
          }}
          animate={{ 
            opacity: 1, 
            x: 0, 
            scale: 1,
            rotateY: 0
          }}
          exit={{ 
            opacity: 0, 
            x: -400, 
            scale: 0.9,
            rotateY: -15
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.6
          }}
          className="fixed bottom-6 left-6 z-50 max-w-sm hidden md:block"
          style={{
            filter: `drop-shadow(0 8px 32px ${colorScheme.glow}40)`
          }}
        >
          <motion.div
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(20px)" }}
            className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl"
            style={{
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.25) 0%, 
                rgba(255, 255, 255, 0.05) 100%),
                linear-gradient(135deg, 
                ${colorScheme.background}20 0%, 
                ${colorScheme.background}05 100%)`
            }}
          >
            {/* Animated gradient border */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${colorScheme.gradient} origin-left`}
            />
            
            {/* Sparkle effects */}
            <div className="absolute top-2 right-8 opacity-60">
              <SparklesIcon 
                className="w-4 h-4 text-white animate-pulse" 
                style={{ color: colorScheme.glow }}
              />
            </div>

            {/* Close button with enhanced design */}
            <motion.button
              onClick={hideNotification}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 text-white/80 hover:text-white hover:bg-white/30 transition-all duration-200"
            >
              <XMarkIcon className="w-3.5 h-3.5" />
            </motion.button>

            {/* Main content */}
            <div className="p-5">
              <div className="flex items-start gap-4">
                {/* Enhanced icon with glow effect */}
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="relative"
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-medium shadow-lg border border-white/30"
                    style={{
                      background: `linear-gradient(135deg, ${colorScheme.glow}30, ${colorScheme.glow}10)`,
                      boxShadow: `0 0 20px ${colorScheme.glow}30`
                    }}
                  >
                    {currentNotification.icon}
                  </div>
                </motion.div>

                {/* Content section */}
                <div className="flex-1 min-w-0">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col gap-1 mb-2"
                  >
                    <span className="font-semibold text-white text-sm truncate drop-shadow-sm">
                      {currentNotification.name}
                    </span>
                    <span className="text-xs text-white/70 truncate">
                      📍 {currentNotification.location}
                    </span>
                  </motion.div>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm text-white/90 leading-relaxed mb-3 font-medium drop-shadow-sm"
                  >
                    {isPortuguese ? currentNotification.messagePt : currentNotification.message}
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-xs text-white/60 font-medium">
                      ⏰ {new Date(currentNotification.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: colorScheme.glow }}
                      />
                      <span 
                        className="text-xs font-bold uppercase tracking-wider drop-shadow-sm"
                        style={{ color: colorScheme.glow }}
                      >
                        LIVE
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Subtle shine animation */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ 
                delay: 0.8,
                duration: 1.5,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{ 
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  rgba(255, 255, 255, 0.1) 50%, 
                  transparent 100%)`
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
