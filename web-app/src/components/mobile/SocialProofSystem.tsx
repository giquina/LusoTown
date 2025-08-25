"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserGroupIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  TrophyIcon,
  StarIcon,
  FireIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';

// Live Attendance Counter with Lusophone cultural context
interface LiveAttendanceCounterProps {
  eventId: string;
  currentAttendees: number;
  maxAttendees: number;
  isLive?: boolean;
  className?: string;
  showRecentJoins?: boolean;
}

export function LiveAttendanceCounter({
  eventId,
  currentAttendees,
  maxAttendees,
  isLive = false,
  className = '',
  showRecentJoins = true
}: LiveAttendanceCounterProps) {
  const { language } = useLanguage();
  const [displayCount, setDisplayCount] = useState(currentAttendees);
  const [recentJoins, setRecentJoins] = useState<string[]>([]);
  const [liveViewers, setLiveViewers] = useState(0);

  // Simulate live updates for demo purposes
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // Simulate real-time attendance changes
      const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
      const newCount = Math.max(0, Math.min(maxAttendees, displayCount + change));
      
      if (newCount !== displayCount) {
        setDisplayCount(newCount);
        
        if (change > 0 && showRecentJoins) {
          // Simulate Lusophone names joining
          const portugueseNames = [
            'Maria Silva', 'João Santos', 'Ana Costa', 'Pedro Oliveira', 
            'Catarina Ferreira', 'Miguel Rodrigues', 'Sofia Pereira', 'Tiago Almeida',
            'Beatriz Carvalho', 'André Martins', 'Isabel Sousa', 'Bruno Fernandes'
          ];
          
          const randomName = portugueseNames[Math.floor(Math.random() * portugueseNames.length)];
          setRecentJoins(prev => [randomName, ...prev.slice(0, 2)]);
          
          // Remove after 5 seconds
          setTimeout(() => {
            setRecentJoins(prev => prev.filter(name => name !== randomName));
          }, 5000);
        }
      }
    }, 3000 + Math.random() * 7000); // 3-10 seconds

    return () => clearInterval(interval);
  }, [displayCount, maxAttendees, isLive, showRecentJoins]);

  // Simulate live viewers
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setLiveViewers(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(0, prev + change);
      });
    }, 2000);

    // Initial viewers
    setLiveViewers(Math.floor(Math.random() * 15) + 5);

    return () => clearInterval(interval);
  }, [isLive]);

  const spotsLeft = maxAttendees - displayCount;
  const fillPercentage = (displayCount / maxAttendees) * 100;
  const isAlmostFull = spotsLeft <= 3 && spotsLeft > 0;
  const isFull = spotsLeft <= 0;

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <UserGroupIcon className="w-5 h-5 text-gray-600" />
          <h4 className="font-semibold text-gray-900">
            {language === 'pt' ? 'Participantes' : 'Attendance'}
          </h4>
          {isLive && (
            <motion.div
              className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              LIVE
            </motion.div>
          )}
        </div>

        {isLive && liveViewers > 0 && (
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <EyeIcon className="w-4 h-4" />
            <span>{liveViewers} {language === 'pt' ? 'a ver' : 'watching'}</span>
          </div>
        )}
      </div>

      {/* Attendance Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {displayCount} / {maxAttendees}
          </span>
          <span className={`text-sm font-medium ${
            isFull ? 'text-red-600' : isAlmostFull ? 'text-orange-600' : 'text-green-600'
          }`}>
            {isFull 
              ? (language === 'pt' ? 'Esgotado' : 'Full')
              : isAlmostFull
              ? (language === 'pt' ? `${spotsLeft} vagas` : `${spotsLeft} spots left`)
              : (language === 'pt' ? 'Vagas disponíveis' : 'Available')
            }
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className={`h-full rounded-full transition-all duration-500 ${
              isFull 
                ? 'bg-gradient-to-r from-red-500 to-red-600'
                : isAlmostFull
                ? 'bg-gradient-to-r from-orange-500 to-red-500'
                : 'bg-gradient-to-r from-green-500 to-emerald-500'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${fillPercentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Recent Joins */}
      <AnimatePresence>
        {showRecentJoins && recentJoins.length > 0 && (
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h5 className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              {language === 'pt' ? 'Juntaram-se recentemente' : 'Recently joined'}
            </h5>
            
            {recentJoins.map((name, index) => (
              <motion.div
                key={`${name}-${index}`}
                className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-100"
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-900">{name}</span>
                <span className="text-xs text-green-600 font-medium ml-auto">
                  {language === 'pt' ? 'Novo' : 'New'}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Lusophone Cultural Engagement Metrics
interface CulturalEngagementProps {
  eventId: string;
  likes: number;
  comments: number;
  shares: number;
  culturalRating: number;
  authenticity: number;
  className?: string;
}

export function CulturalEngagementMetrics({
  eventId,
  likes,
  comments,
  shares,
  culturalRating,
  authenticity,
  className = ''
}: CulturalEngagementProps) {
  const { language } = useLanguage();
  const [animatedLikes, setAnimatedLikes] = useState(likes);
  const [showRecentActivity, setShowRecentActivity] = useState(false);

  // Simulate real-time engagement updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) { // 20% chance every 5 seconds
        setAnimatedLikes(prev => prev + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const engagementScore = Math.round(((likes + comments * 2 + shares * 3) / 100) * 10) / 10;

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-900">
          {language === 'pt' ? 'Envolvimento Cultural' : 'Cultural Engagement'}
        </h4>
        <div className="flex items-center gap-1">
          <StarIcon className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium text-gray-700">{engagementScore}</span>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <motion.div
          className="text-center"
          key={animatedLikes} // Force re-render for animation
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-center mb-1">
            <HeartIcon className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-lg font-bold text-gray-900">{animatedLikes}</div>
          <div className="text-xs text-gray-600">
            {language === 'pt' ? 'Gostos' : 'Likes'}
          </div>
        </motion.div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <ChatBubbleLeftIcon className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-lg font-bold text-gray-900">{comments}</div>
          <div className="text-xs text-gray-600">
            {language === 'pt' ? 'Comentários' : 'Comments'}
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <ShareIcon className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-lg font-bold text-gray-900">{shares}</div>
          <div className="text-xs text-gray-600">
            {language === 'pt' ? 'Partilhas' : 'Shares'}
          </div>
        </div>
      </div>

      {/* Cultural Authenticity Rating */}
      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">
              {language === 'pt' ? 'Autenticidade Cultural' : 'Cultural Authenticity'}
            </span>
            <span className="text-sm font-bold text-red-600">{authenticity}/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-red-500 to-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${authenticity * 10}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">
              {language === 'pt' ? 'Avaliação Geral' : 'Overall Rating'}
            </span>
            <span className="text-sm font-bold text-yellow-600">{culturalRating}/5</span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.div
                key={star}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: star * 0.1, type: "spring", stiffness: 300 }}
              >
                <StarIcon 
                  className={`w-4 h-4 ${
                    star <= culturalRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular with Lusophone Community Badge */}
      {engagementScore >= 7 && (
        <motion.div
          className="mt-4 p-3 bg-gradient-to-r from-red-50 to-green-50 border border-red-200 rounded-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <FireIcon className="w-5 h-5 text-red-500" />
            <span className="text-sm font-semibold text-red-700">
              {language === 'pt' 
                ? 'Popular na Comunidade Portuguesa'
                : 'Popular with Lusophone Community'
              }
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Real-time Activity Feed for Lusophone Events
interface ActivityItem {
  id: string;
  type: 'join' | 'like' | 'comment' | 'share';
  userName: string;
  timestamp: Date;
  eventTitle?: string;
  action: string;
  actionPt: string;
}

interface RealTimeActivityFeedProps {
  maxItems?: number;
  className?: string;
  autoRefresh?: boolean;
}

export function RealTimeActivityFeed({
  maxItems = 5,
  className = '',
  autoRefresh = true
}: RealTimeActivityFeedProps) {
  const { language } = useLanguage();
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  // Simulate real-time Lusophone community activity
  useEffect(() => {
    if (!autoRefresh) return;

    const generateActivity = (): ActivityItem => {
      const portugueseNames = [
        'Maria Silva', 'João Santos', 'Ana Costa', 'Pedro Oliveira', 
        'Catarina Ferreira', 'Miguel Rodrigues', 'Sofia Pereira', 'Tiago Almeida',
        'Beatriz Carvalho', 'André Martins', 'Isabel Sousa', 'Bruno Fernandes',
        'Francisca Gomes', 'Ricardo Nunes', 'Mariana Lopes', 'Carlos Ribeiro'
      ];

      const eventTitles = [
        'Fado Night at Camden Lusophone Club',
        'Lusophone Wine Tasting in Stockwell',
        'Santos Populares Celebration',
        'Lusophone Business Networking',
        'Cape Verdean Music Night',
        'Brazilian Festa Junina',
        'Angolan Cultural Evening',
        'Mozambican Heritage Showcase',
        'Lusophone Cooking Class',
        'Lusophone Literature Club'
      ];

      const activities = [
        { 
          type: 'join' as const, 
          action: 'joined', 
          actionPt: 'juntou-se a' 
        },
        { 
          type: 'like' as const, 
          action: 'liked', 
          actionPt: 'gostou de' 
        },
        { 
          type: 'comment' as const, 
          action: 'commented on', 
          actionPt: 'comentou em' 
        },
        { 
          type: 'share' as const, 
          action: 'shared', 
          actionPt: 'partilhou' 
        }
      ];

      const randomName = portugueseNames[Math.floor(Math.random() * portugueseNames.length)];
      const randomEvent = eventTitles[Math.floor(Math.random() * eventTitles.length)];
      const randomActivity = activities[Math.floor(Math.random() * activities.length)];

      return {
        id: `${Date.now()}-${Math.random()}`,
        type: randomActivity.type,
        userName: randomName,
        timestamp: new Date(),
        eventTitle: randomEvent,
        action: randomActivity.action,
        actionPt: randomActivity.actionPt
      };
    };

    // Initial activities
    const initialActivities = Array.from({ length: 3 }, generateActivity);
    setActivities(initialActivities);

    const interval = setInterval(() => {
      const newActivity = generateActivity();
      setActivities(prev => [newActivity, ...prev.slice(0, maxItems - 1)]);
    }, 8000 + Math.random() * 12000); // 8-20 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, maxItems]);

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'join': return UserGroupIcon;
      case 'like': return HeartIcon;
      case 'comment': return ChatBubbleLeftIcon;
      case 'share': return ShareIcon;
      default: return UserGroupIcon;
    }
  };

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'join': return 'text-green-500 bg-green-100';
      case 'like': return 'text-red-500 bg-red-100';
      case 'comment': return 'text-blue-500 bg-blue-100';
      case 'share': return 'text-purple-500 bg-purple-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const formatTimeAgo = (timestamp: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) {
      return language === 'pt' ? 'agora mesmo' : 'just now';
    } else if (diffMins < 60) {
      return language === 'pt' ? `há ${diffMins}min` : `${diffMins}min ago`;
    } else {
      const diffHours = Math.floor(diffMins / 60);
      return language === 'pt' ? `há ${diffHours}h` : `${diffHours}h ago`;
    }
  };

  if (activities.length === 0) return null;

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <h4 className="font-semibold text-gray-900">
          {language === 'pt' ? 'Atividade em Tempo Real' : 'Live Activity'}
        </h4>
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {activities.map((activity, index) => {
            const Icon = getActivityIcon(activity.type);
            const colorClasses = getActivityColor(activity.type);
            const action = language === 'pt' ? activity.actionPt : activity.action;

            return (
              <motion.div
                key={activity.id}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300,
                  delay: index * 0.1 
                }}
                layout
              >
                {/* Activity icon */}
                <div className={`p-2 rounded-full ${colorClasses}`}>
                  <Icon className="w-3 h-3" />
                </div>

                {/* Activity content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.userName}</span>
                    {' '}
                    <span className="text-gray-600">{action}</span>
                    {activity.eventTitle && (
                      <>
                        {' '}
                        <span className="font-medium text-gray-900 truncate">
                          {activity.eventTitle}
                        </span>
                      </>
                    )}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <ClockIcon className="w-3 h-3" />
                    <span>{formatTimeAgo(activity.timestamp)}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* View More Button */}
      <button
        className="w-full mt-3 py-2 text-center text-red-600 hover:text-red-700 font-medium text-sm hover:bg-red-50 rounded-lg transition-colors"
        onClick={() => setShowRecentActivity(!showRecentActivity)}
      >
        {language === 'pt' ? 'Ver Toda a Atividade' : 'View All Activity'}
      </button>
    </div>
  );
}

// Lusophone Community Trust Indicators
interface CommunityTrustIndicatorsProps {
  verifiedHost: boolean;
  communityRating: number;
  repeatAttendees: number;
  hostExperience: number;
  safetyRating: number;
  className?: string;
}

export function CommunityTrustIndicators({
  verifiedHost,
  communityRating,
  repeatAttendees,
  hostExperience,
  safetyRating,
  className = ''
}: CommunityTrustIndicatorsProps) {
  const { language } = useLanguage();

  const trustScore = Math.round(
    ((verifiedHost ? 2 : 0) + 
     (communityRating * 0.8) + 
     (Math.min(repeatAttendees / 10, 2)) + 
     (Math.min(hostExperience / 12, 2)) +
     (safetyRating * 0.4)) / 2
  );

  const getTrustLevel = (score: number) => {
    if (score >= 4) return { 
      level: language === 'pt' ? 'Excelente' : 'Excellent', 
      color: 'text-green-600 bg-green-100',
      icon: TrophyIcon
    };
    if (score >= 3) return { 
      level: language === 'pt' ? 'Muito Bom' : 'Very Good', 
      color: 'text-blue-600 bg-blue-100',
      icon: StarIcon
    };
    if (score >= 2) return { 
      level: language === 'pt' ? 'Bom' : 'Good', 
      color: 'text-yellow-600 bg-yellow-100',
      icon: HeartIcon
    };
    return { 
      level: language === 'pt' ? 'Novo' : 'New', 
      color: 'text-gray-600 bg-gray-100',
      icon: UserGroupIcon
    };
  };

  const trust = getTrustLevel(trustScore);
  const TrustIcon = trust.icon;

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-900">
          {language === 'pt' ? 'Confiança da Comunidade' : 'Community Trust'}
        </h4>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${trust.color}`}>
          <TrustIcon className="w-4 h-4" />
          <span>{trust.level}</span>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="space-y-3">
        {/* Verified Host */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {language === 'pt' ? 'Anfitrião Verificado' : 'Verified Host'}
          </span>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
            verifiedHost ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
          }`}>
            {verifiedHost ? '✓' : '○'}
          </div>
        </div>

        {/* Community Rating */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {language === 'pt' ? 'Avaliação da Comunidade' : 'Community Rating'}
          </span>
          <div className="flex items-center gap-1">
            <StarIcon className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-900">
              {communityRating.toFixed(1)}/5
            </span>
          </div>
        </div>

        {/* Repeat Attendees */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {language === 'pt' ? 'Participantes Regulares' : 'Repeat Attendees'}
          </span>
          <span className="text-sm font-medium text-gray-900">
            {repeatAttendees}%
          </span>
        </div>

        {/* Host Experience */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {language === 'pt' ? 'Experiência do Anfitrião' : 'Host Experience'}
          </span>
          <span className="text-sm font-medium text-gray-900">
            {hostExperience} {language === 'pt' ? 'eventos' : 'events'}
          </span>
        </div>

        {/* Safety Rating */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {language === 'pt' ? 'Classificação de Segurança' : 'Safety Rating'}
          </span>
          <div className="flex items-center gap-1">
            <div className={`w-4 h-4 rounded-full ${
              safetyRating >= 9 ? 'bg-green-500' :
              safetyRating >= 7 ? 'bg-yellow-500' : 'bg-red-500'
            }`} />
            <span className="text-sm font-medium text-gray-900">
              {safetyRating}/10
            </span>
          </div>
        </div>
      </div>

      {/* Trust Score Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            {language === 'pt' ? 'Pontuação de Confiança' : 'Trust Score'}
          </span>
          <div className="flex items-center gap-2">
            <div className="w-20 bg-gray-200 rounded-full h-2">
              <motion.div
                className="h-2 rounded-full bg-gradient-to-r from-red-500 to-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${(trustScore / 5) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <span className="text-sm font-bold text-gray-900">{trustScore}/5</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export {
  LiveAttendanceCounter,
  CulturalEngagementMetrics,
  RealTimeActivityFeed,
  CommunityTrustIndicators
};