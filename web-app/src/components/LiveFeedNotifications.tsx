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
  countryFlag: string;
  country: 'Portugal' | 'Brazil' | 'Angola' | 'Mozambique' | 'Cape Verde' | 'Guinea-Bissau' | 'São Tomé and Príncipe' | 'East Timor' | 'Macau';
  engagementHook: string;
  engagementHookPt: string;
}

export default function LiveFeedNotifications() {
  const { language } = useLanguage();
  const isPortuguese = language === 'pt';
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Portuguese-speaking nations members across UK
  const portugalMockData = [
    // Recent signups with compelling hooks
    { type: 'signup', name: 'Sofia Pereira', location: 'Camden, London', icon: '👋', countryFlag: '🇵🇹', country: 'Portugal',
      message: 'joined and found 3 events this week!', messagePt: 'juntou-se e encontrou 3 eventos esta semana!',
      engagementHook: '💎 Just discovered premium transport to Portuguese events', engagementHookPt: '💎 Acabou de descobrir transporte premium para eventos portugueses' },
    { type: 'signup', name: 'Miguel Santos', location: 'Vauxhall, London', icon: '🎉', countryFlag: '🇧🇷', country: 'Brazil',
      message: 'connected with 12 Brazilians in London!', messagePt: 'conectou-se com 12 brasileiros em Londres!',
      engagementHook: '🚀 Already booked 2 cultural meetups', engagementHookPt: '🚀 Já reservou 2 encontros culturais' },
    { type: 'signup', name: 'Ana Costa', location: 'Stockwell, London', icon: '💚', countryFlag: '🇦🇴', country: 'Angola',
      message: 'found her business networking group!', messagePt: 'encontrou o seu grupo de networking empresarial!',
      engagementHook: '⭐ Access to exclusive Angolan business network', engagementHookPt: '⭐ Acesso à rede empresarial angolana exclusiva' },
    { type: 'signup', name: 'João Ferreira', location: 'Greenwich, London', icon: '🎯', countryFlag: '🇲🇿', country: 'Mozambique',
      message: 'matched with 5 professionals instantly!', messagePt: 'fez match com 5 profissionais instantaneamente!',
      engagementHook: '🏆 Premium cultural matching unlocked', engagementHookPt: '🏆 Matching cultural premium desbloqueado' },
    { type: 'signup', name: 'Beatriz Silva', location: 'Bermondsey, London', icon: '✨', countryFlag: '🇨🇻', country: 'Cape Verde',
      message: 'got invited to 4 exclusive Cape Verdean events!', messagePt: 'foi convidada para 4 eventos cabo-verdianos exclusivos!',
      engagementHook: '🌟 VIP access to cultural celebrations', engagementHookPt: '🌟 Acesso VIP a celebrações culturais' },
    
    
    // Premium subscriptions with success metrics
    { type: 'subscription', name: 'Carlos Ribeiro', location: 'Kensington, London', icon: '⭐', countryFlag: '🇵🇹', country: 'Portugal',
      message: 'unlocked Cultural Ambassador - saved £200 on events!', messagePt: 'desbloqueou Embaixador Cultural - poupou £200 em eventos!',
      engagementHook: '💰 Members save average £150/month on Portuguese services', engagementHookPt: '💰 Membros poupam em média £150/mês em serviços portugueses' },
    { type: 'subscription', name: 'Mariana Lopes', location: 'Canary Wharf, London', icon: '🚀', countryFlag: '🇧🇷', country: 'Brazil',
      message: 'got premium transport + 15 exclusive invites!', messagePt: 'obteve transporte premium + 15 convites exclusivos!',
      engagementHook: '🎯 Premium members get 3x more business opportunities', engagementHookPt: '🎯 Membros premium obtêm 3x mais oportunidades de negócio' },
    { type: 'subscription', name: 'Ricardo Mendes', location: 'King\'s Cross, London', icon: '💎', countryFlag: '🇬🇼', country: 'Guinea-Bissau',
      message: 'connected with 50+ professionals in 24h!', messagePt: 'conectou-se com 50+ profissionais em 24h!',
      engagementHook: '⚡ Join 750+ active Portuguese-speaking professionals', engagementHookPt: '⚡ Junte-se a 750+ profissionais lusófonos ativos' },
    
    
    // Event bookings with social proof
    { type: 'event', name: 'Inês Rodrigues', location: 'Hampstead, London', icon: '🎭', countryFlag: '🇵🇹', country: 'Portugal',
      message: 'secured last spot at sold-out Fado Night!', messagePt: 'garantiu último lugar na Noite de Fado esgotada!',
      engagementHook: '🔥 89% of Portuguese events sell out within 24h', engagementHookPt: '🔥 89% dos eventos portugueses esgotam em 24h' },
    { type: 'event', name: 'Pedro Oliveira', location: 'Clapham, London', icon: '🍷', countryFlag: '🇵🇹', country: 'Portugal',
      message: 'met his future business partner at wine tasting!', messagePt: 'conheceu o seu futuro parceiro de negócios na prova de vinhos!',
      engagementHook: '💼 73% of members find business opportunities at events', engagementHookPt: '💼 73% dos membros encontram oportunidades de negócio em eventos' },
    { type: 'event', name: 'Ricardo Santos', location: 'Moorgate, London', icon: '💻', countryFlag: '🇦🇴', country: 'Angola',
      message: 'launched startup after coding workshop!', messagePt: 'lançou startup após workshop de programação!',
      engagementHook: '🚀 Join 200+ tech professionals building the future', engagementHookPt: '🚀 Junte-se a 200+ profissionais tech construindo o futuro' },
    { type: 'event', name: 'Sofia Martins', location: 'Camden, London', icon: '🤖', countryFlag: '🇲🇿', country: 'Mozambique',
      message: 'built website, gained 5 clients in 1 week!', messagePt: 'construiu website, ganhou 5 clientes em 1 semana!',
      engagementHook: '📈 Members average £2,500 income boost after workshops', engagementHookPt: '📈 Membros têm aumento médio de £2,500 após workshops' },
    { type: 'event', name: 'Catarina Nunes', location: 'Islington, London', icon: '💼', countryFlag: '🇨🇻', country: 'Cape Verde',
      message: 'secured 3 business partnerships at networking event!', messagePt: 'garantiu 3 parcerias empresariais no evento de networking!',
      engagementHook: '🤝 92% of attendees make valuable business connections', engagementHookPt: '🤝 92% dos participantes fazem conexões empresariais valiosas' },
    { type: 'event', name: 'Tiago Fernandes', location: 'Shoreditch, London', icon: '🎨', countryFlag: '🇬🇼', country: 'Guinea-Bissau',
      message: 'showcased art at cultural workshop - sold 2 pieces!', messagePt: 'exibiu arte no workshop cultural - vendeu 2 peças!',
      engagementHook: '🎨 Artists earn average £800 per cultural showcase', engagementHookPt: '🎨 Artistas ganham em média £800 por exposição cultural' },
    
    
    // Matches and connections with success stories
    { type: 'match', name: 'Diana Alves', location: 'Notting Hill, London', icon: '💕', countryFlag: '🇸🇹', country: 'São Tomé and Príncipe',
      message: 'found love match - planning wedding in 2025!', messagePt: 'encontrou amor - planejando casamento em 2025!',
      engagementHook: '💒 87% of our matches lead to long-term relationships', engagementHookPt: '💒 87% dos nossos matches levam a relacionamentos duradouros' },
    { type: 'match', name: 'Gonçalo Martins', location: 'Borough, London', icon: '🤝', countryFlag: '🇵🇹', country: 'Portugal',
      message: 'matched with business co-founder!', messagePt: 'fez match com co-fundador de negócio!',
      engagementHook: '🚀 Join 500+ successful business partnerships formed', engagementHookPt: '🚀 Junte-se a 500+ parcerias empresariais bem-sucedidas formadas' },
    { type: 'match', name: 'Liliana Castro', location: 'Elephant & Castle, London', icon: '💖', countryFlag: '🇹🇱', country: 'East Timor',
      message: 'connected with 15 professionals in her field!', messagePt: 'conectou-se com 15 profissionais da sua área!',
      engagementHook: '🌟 Premium matching increases connections by 300%', engagementHookPt: '🌟 Matching premium aumenta conexões em 300%' },
    
    
    // Business directory with success metrics
    { type: 'business', name: 'António Silva', location: 'Westminster, London', icon: '🏪', countryFlag: '🇵🇹', country: 'Portugal',
      message: 'got 47 new customers in first month!', messagePt: 'obteve 47 novos clientes no primeiro mês!',
      engagementHook: '📈 Directory businesses see 340% customer increase', engagementHookPt: '📈 Negócios no diretório veem aumento de 340% em clientes' },
    { type: 'business', name: 'Fernanda Carvalho', location: 'Bethnal Green, London', icon: '☕', countryFlag: '🇧🇷', country: 'Brazil',
      message: 'café became #1 Brazilian spot in East London!', messagePt: 'café tornou-se o local brasileiro #1 no East London!',
      engagementHook: '⭐ 94% of listed businesses get 5-star reviews', engagementHookPt: '⭐ 94% dos negócios listados recebem avaliações 5 estrelas' },
    { type: 'business', name: 'Bruno Moreira', location: 'Tottenham, London', icon: '🛠️', countryFlag: '🇦🇴', country: 'Angola',
      message: 'booked solid for 3 months - hired 4 staff!', messagePt: 'reservado por 3 meses - contratou 4 funcionários!',
      engagementHook: '💼 Construction services average £50k revenue boost', engagementHookPt: '💼 Serviços de construção têm aumento médio de £50k' },

    
    // Streaming activities with engagement metrics
    { type: 'streaming', name: 'Cristina Pinto', location: 'Brixton, London', icon: '📺', countryFlag: '🇲🇿', country: 'Mozambique',
      message: 'cooking stream hit 2,500 viewers - book deal offered!', messagePt: 'stream de culinária atingiu 2,500 espectadores - oferta de livro!',
      engagementHook: '📚 Streamers earn average £1,200/month + opportunities', engagementHookPt: '📚 Streamers ganham em média £1,200/mês + oportunidades' },
    { type: 'streaming', name: 'Manuel Rosa', location: 'Kennington, London', icon: '🎤', countryFlag: '🇵🇹', country: 'Portugal',
      message: 'Fado stream went viral - record label contacted!', messagePt: 'stream de Fado viralizou - gravadora fez contato!',
      engagementHook: '🎵 Musicians get discovered by industry professionals', engagementHookPt: '🎵 Músicos são descobertos por profissionais da indústria' },
    { type: 'streaming', name: 'Teresa Campos', location: 'Oval, London', icon: '💬', countryFlag: '🇨🇻', country: 'Cape Verde',
      message: 'chat room connected 300 Cape Verdeans across UK!', messagePt: 'sala de chat conectou 300 cabo-verdianos em todo o Reino Unido!',
      engagementHook: '🌍 Join the largest Portuguese-speaking network in UK', engagementHookPt: '🌍 Junte-se à maior rede lusófona do Reino Unido' },

    
    // Workshop activities with career success
    { type: 'workshop', name: 'Rodrigo Pereira', location: 'London Bridge, London', icon: '👨‍💻', countryFlag: '🆬🇼', country: 'Guinea-Bissau',
      message: 'landed £70k tech job after workshop!', messagePt: 'conseguiu emprego tech de £70k após workshop!',
      engagementHook: '💼 Workshop graduates earn 85% more within 6 months', engagementHookPt: '💼 Graduados de workshop ganham 85% mais em 6 meses' },
    { type: 'workshop', name: 'Carla Mendes', location: 'Angel, London', icon: '🎯', countryFlag: '🇵🇹', country: 'Portugal',
      message: 'started £5k/month marketing agency!', messagePt: 'iniciou agência de marketing de £5k/mês!',
      engagementHook: '📈 Marketing course alumni average £40k annual income', engagementHookPt: '📈 Ex-alunos de marketing ganham em média £40k anuais' },
    { type: 'workshop', name: 'Hugo Santos', location: 'Old Street, London', icon: '🚀', countryFlag: '🇧🇷', country: 'Brazil',
      message: 'startup valued at £500k after 6 months!', messagePt: 'startup avaliada em £500k após 6 meses!',
      engagementHook: '🎆 Join 150+ successful startups launched by our members', engagementHookPt: '🎆 Junte-se a 150+ startups bem-sucedidas lançadas pelos nossos membros' },

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
        timestamp: new Date(Date.now() - Math.random() * 600000).toISOString(), // Random time within last 10 minutes
        icon: item.icon,
        countryFlag: item.countryFlag,
        country: item.country,
        engagementHook: item.engagementHook,
        engagementHookPt: item.engagementHookPt
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

      // Hide after 9 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 9000);
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

  const getRelativeTime = (timestamp: string) => {
    const now = new Date().getTime();
    const notificationTime = new Date(timestamp).getTime();
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return isPortuguese ? 'agora mesmo' : 'just now';
    if (diffInMinutes === 1) return isPortuguese ? 'há 1 minuto' : '1 minute ago';
    if (diffInMinutes < 60) return isPortuguese ? `há ${diffInMinutes} minutos` : `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return isPortuguese ? 'há 1 hora' : '1 hour ago';
    return isPortuguese ? `há ${diffInHours} horas` : `${diffInHours} hours ago`;
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
            filter: `drop-shadow(0 8px 32px ${colorScheme.glow}50) drop-shadow(0 4px 16px rgba(0,0,0,0.2))`
          }}
        >
          <motion.div
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(20px)" }}
            className="relative overflow-hidden rounded-2xl border border-white/30 shadow-2xl backdrop-blur-xl"
            style={{
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.85) 0%, 
                rgba(255, 255, 255, 0.75) 100%),
                linear-gradient(135deg, 
                ${colorScheme.background}40 0%, 
                ${colorScheme.background}20 100%)`,
              boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 30px ${colorScheme.glow}20`
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
              className="absolute top-3 right-3 p-1.5 rounded-full bg-gray-200/80 backdrop-blur-sm border border-gray-300/40 text-gray-600 hover:text-gray-800 hover:bg-gray-300/80 transition-all duration-200"
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
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800 text-sm truncate drop-shadow-sm">
                        {currentNotification.name}
                      </span>
                      <span className="text-lg" title={currentNotification.country}>
                        {currentNotification.countryFlag}
                      </span>
                    </div>
                    <span className="text-xs text-gray-600 truncate">
                      📍 {currentNotification.location}
                    </span>
                  </motion.div>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm text-gray-700 leading-relaxed mb-2 font-medium drop-shadow-sm"
                  >
                    {isPortuguese ? currentNotification.messagePt : currentNotification.message}
                  </motion.p>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="text-xs text-blue-600 font-medium mb-3 italic"
                  >
                    {isPortuguese ? currentNotification.engagementHookPt : currentNotification.engagementHook}
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-xs text-gray-500 font-medium">
                      🕐 {getRelativeTime(currentNotification.timestamp)}
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
                        className="text-xs font-bold uppercase tracking-wider drop-shadow-sm text-white px-2 py-0.5 rounded-full"
                        style={{ 
                          backgroundColor: colorScheme.glow,
                          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}
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
