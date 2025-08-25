"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  ClockIcon,
  CalendarDaysIcon,
  MapPinIcon,
  HeartIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  StarIcon,
  FlagIcon,
  MusicalNoteIcon,
  CakeIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";

interface ConversationContext {
  eventId: string;
  eventTitle: string;
  eventCategory: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  culturalCategory: string;
  languageLevel: 'Lusophone' | 'English' | 'Bilingual';
}

interface MatchProfile {
  id: string;
  name: string;
  age: number;
  origin: string;
  profession: string;
  interests: string[];
  culturalBackground: string;
  membershipType: 'Free' | 'Community' | 'Ambassador';
  verificationStatus: 'Verified' | 'Pending' | 'Unverified';
  lastActive: string;
  eventAttendanceStatus: 'confirmed' | 'interested' | 'maybe';
}

interface ConversationStarter {
  id: string;
  category: 'cultural' | 'event_specific' | 'personal_connection' | 'professional' | 'safety_focused';
  text: string;
  context: string;
  appropriateness: 'high' | 'medium' | 'low';
  culturalRelevance: number;
  safetyLevel: 'safe' | 'moderate' | 'caution';
  recommendedTiming: 'pre_event' | 'during_event' | 'post_event';
  responseRate: number;
}

interface EventConversationStartersProps {
  matchProfile: MatchProfile;
  eventContext: ConversationContext;
  userInterests: string[];
  userCulturalBackground: string;
  onConversationStart: (starterId: string, text: string) => void;
  onSafetyReport?: (matchId: string, reason: string) => void;
  isVisible: boolean;
  onClose: () => void;
}

export default function EventConversationStarters({
  matchProfile,
  eventContext,
  userInterests,
  userCulturalBackground,
  onConversationStart,
  onSafetyReport,
  isVisible,
  onClose,
}: EventConversationStartersProps) {
  const { language } = useLanguage();
  const { hasActiveSubscription } = useSubscription();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [conversationStarters, setConversationStarters] = useState<ConversationStarter[]>([]);
  const [customMessage, setCustomMessage] = useState('');
  const [showSafetyTips, setShowSafetyTips] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  // Generate conversation starters based on event and match context
  useEffect(() => {
    const generateStarters = (): ConversationStarter[] => {
      const starters: ConversationStarter[] = [];

      // Cultural/Event-specific starters
      if (eventContext.culturalCategory === "Fado Music") {
        starters.push({
          id: "fado-1",
          category: "cultural",
          text: language === "pt" 
            ? `Olá ${matchProfile.name}! Vejo que também vais à noite de Fado. Qual é a tua fadista favorita?`
            : `Hi ${matchProfile.name}! I see you're also going to the Fado night. Who's your favorite fadista?`,
          context: "Fado music appreciation",
          appropriateness: "high",
          culturalRelevance: 95,
          safetyLevel: "safe",
          recommendedTiming: "pre_event",
          responseRate: 87
        });

        starters.push({
          id: "fado-2",
          category: "event_specific",
          text: language === "pt"
            ? `A música portuguesa tem uma alma única, não achas? Estou ansioso(a) por ouvir fado autêntico!`
            : `Portuguese music has such a unique soul, don't you think? I'm excited to hear authentic fado!`,
          context: "Cultural appreciation",
          appropriateness: "high",
          culturalRelevance: 90,
          safetyLevel: "safe",
          recommendedTiming: "pre_event",
          responseRate: 82
        });
      }

      if (eventContext.culturalCategory === "Santos Populares") {
        starters.push({
          id: "santos-1",
          category: "cultural",
          text: language === "pt"
            ? `Olá! Já foste às festas de São João em Portugal? Esta vai ser uma noite especial!`
            : `Hi! Have you been to the São João festivals in Portugal? This is going to be a special night!`,
          context: "Traditional festivals",
          appropriateness: "high",
          culturalRelevance: 100,
          safetyLevel: "safe",
          recommendedTiming: "pre_event",
          responseRate: 91
        });

        starters.push({
          id: "santos-2",
          category: "event_specific",
          text: language === "pt"
            ? `Adoro que celebremos as nossas tradições aqui em Londres! Vais levar manjerico?`
            : `I love that we celebrate our traditions here in London! Are you bringing manjerico?`,
          context: "Cultural traditions in diaspora",
          appropriateness: "high",
          culturalRelevance: 88,
          safetyLevel: "safe",
          recommendedTiming: "pre_event",
          responseRate: 85
        });
      }

      if (eventContext.culturalCategory === "Lusophone Cuisine") {
        starters.push({
          id: "cuisine-1",
          category: "cultural",
          text: language === "pt"
            ? `Olá! Também vais aprender a fazer pastéis de nata? Tenho curiosidade sobre os segredos da receita!`
            : `Hi! Are you also learning to make pastéis de nata? I'm curious about the recipe secrets!`,
          context: "Lusophone cooking",
          appropriateness: "high",
          culturalRelevance: 95,
          safetyLevel: "safe",
          recommendedTiming: "pre_event",
          responseRate: 89
        });
      }

      if (eventContext.culturalCategory === "Football") {
        starters.push({
          id: "football-1",
          category: "cultural",
          text: language === "pt"
            ? `Força Portugal! 🇵🇹 De que região és? Vamos torcer juntos!`
            : `Força Portugal! 🇵🇹 Which region are you from? Let's cheer together!`,
          context: "Lusophone football support",
          appropriateness: "high",
          culturalRelevance: 92,
          safetyLevel: "safe",
          recommendedTiming: "pre_event",
          responseRate: 94
        });
      }

      // Origin-based starters
      if (matchProfile.origin.includes("Portugal")) {
        const region = matchProfile.origin.split(',')[0];
        starters.push({
          id: "origin-portugal",
          category: "personal_connection",
          text: language === "pt"
            ? `Vi que és de ${region}! Que saudades de casa, não é? Como tem sido a adaptação a Londres?`
            : `I saw you're from ${region}! Missing home, right? How has adapting to London been?`,
          context: "Shared Portuguese heritage",
          appropriateness: "high",
          culturalRelevance: 85,
          safetyLevel: "safe",
          recommendedTiming: "pre_event",
          responseRate: 78
        });
      } else if (matchProfile.origin.includes("Brasil")) {
        starters.push({
          id: "origin-brazil",
          category: "personal_connection",
          text: language === "pt"
            ? `Oi! Que bom encontrar outro(a) lusófono(a) em Londres! Como achas a comunidade de falantes de português aqui?`
            : `Hi! So good to find another Portuguese speaker in London! What do you think of the Portuguese-speaking community here?`,
          context: "Lusophone connection",
          appropriateness: "high",
          culturalRelevance: 80,
          safetyLevel: "safe",
          recommendedTiming: "pre_event",
          responseRate: 83
        });
      }

      // Interest-based starters
      const sharedInterests = matchProfile.interests.filter(interest =>
        userInterests.some(userInterest =>
          userInterest.toLowerCase().includes(interest.toLowerCase()) ||
          interest.toLowerCase().includes(userInterest.toLowerCase())
        )
      );

      if (sharedInterests.length > 0) {
        starters.push({
          id: "shared-interest",
          category: "personal_connection",
          text: language === "pt"
            ? `Olá! Vi que também gostas de ${sharedInterests[0]}. Vamos conversar sobre isso no evento?`
            : `Hi! I saw you also like ${sharedInterests[0]}. Let's chat about it at the event?`,
          context: "Shared interests",
          appropriateness: "high",
          culturalRelevance: 70,
          safetyLevel: "safe",
          recommendedTiming: "pre_event",
          responseRate: 76
        });
      }

      // Professional starters
      if (matchProfile.profession) {
        starters.push({
          id: "professional",
          category: "professional",
          text: language === "pt"
            ? `Olá! És ${matchProfile.profession}? Seria interessante conhecer mais sobre o teu trabalho em Londres.`
            : `Hi! Are you a ${matchProfile.profession}? Would be interesting to learn more about your work in London.`,
          context: "Professional networking",
          appropriateness: "medium",
          culturalRelevance: 60,
          safetyLevel: "safe",
          recommendedTiming: "pre_event",
          responseRate: 71
        });
      }

      // Safety-focused starters for first meetings
      starters.push({
        id: "safety-meetup",
        category: "safety_focused",
        text: language === "pt"
          ? `Olá! Primeira vez neste tipo de evento? Parece que vai ser fantástico! Vamos estar num local público e seguro.`
          : `Hi! First time at this type of event? It looks like it's going to be fantastic! We'll be in a safe public location.`,
        context: "Safe public meeting",
        appropriateness: "high",
        culturalRelevance: 50,
        safetyLevel: "safe",
        recommendedTiming: "pre_event",
        responseRate: 69
      });

      // Event timing-specific starters
      starters.push({
        id: "timing-pre",
        category: "event_specific",
        text: language === "pt"
          ? `Olá! Que horas pensas chegar ao evento? Podemos encontrar-nos lá e apresentar-nos pessoalmente!`
          : `Hi! What time are you thinking of arriving at the event? We could meet there and introduce ourselves in person!`,
        context: "Event coordination",
        appropriateness: "high",
        culturalRelevance: 65,
        safetyLevel: "safe",
        recommendedTiming: "pre_event",
        responseRate: 74
      });

      // Cultural appreciation starters
      starters.push({
        id: "cultural-appreciation",
        category: "cultural",
        text: language === "pt"
          ? `É tão bom ver eventos que celebram a nossa cultura portuguesa em Londres! Sentes-te em casa nestes eventos?`
          : `It's so good to see events celebrating our Portuguese culture in London! Do you feel at home at these events?`,
        context: "Cultural identity in diaspora",
        appropriateness: "high",
        culturalRelevance: 88,
        safetyLevel: "safe",
        recommendedTiming: "pre_event",
        responseRate: 81
      });

      return starters.sort((a, b) => b.responseRate - a.responseRate);
    };

    setConversationStarters(generateStarters());
  }, [matchProfile, eventContext, userInterests, language]);

  const getOriginFlag = (origin: string) => {
    if (origin.includes("Portugal")) return "🇵🇹";
    if (origin.includes("Brasil")) return "🇧🇷";
    if (origin.includes("Angola")) return "🇦🇴";
    if (origin.includes("Mozambique")) return "🇲🇿";
    return "🌍";
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "cultural":
        return MusicalNoteIcon;
      case "event_specific":
        return CalendarDaysIcon;
      case "personal_connection":
        return HeartIcon;
      case "professional":
        return AcademicCapIcon;
      case "safety_focused":
        return ShieldCheckIcon;
      default:
        return ChatBubbleLeftRightIcon;
    }
  };

  const getSafetyLevelColor = (level: string) => {
    switch (level) {
      case "safe":
        return "text-green-600 bg-green-100";
      case "moderate":
        return "text-yellow-600 bg-yellow-100";
      case "caution":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const handleStartConversation = (starter: ConversationStarter) => {
    onConversationStart(starter.id, starter.text);
    setMessageSent(true);
    
    // Auto-close after success message
    setTimeout(() => {
      setMessageSent(false);
      onClose();
    }, 2000);
  };

  const handleCustomMessage = () => {
    if (customMessage.trim()) {
      onConversationStart('custom', customMessage);
      setMessageSent(true);
      
      setTimeout(() => {
        setMessageSent(false);
        setCustomMessage('');
        onClose();
      }, 2000);
    }
  };

  const filteredStarters = selectedCategory === 'all' 
    ? conversationStarters 
    : conversationStarters.filter(starter => starter.category === selectedCategory);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Success Message */}
          <AnimatePresence>
            {messageSent && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-green-500 text-white p-4 text-center"
              >
                <div className="flex items-center justify-center gap-2">
                  <CheckCircleIcon className="w-5 h-5" />
                  <span className="font-semibold">
                    {language === "pt" ? "Mensagem enviada!" : "Message sent!"}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full flex items-center justify-center text-xl">
                👤
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">
                    {matchProfile.name}, {matchProfile.age}
                  </h3>
                  <span className="text-lg">{getOriginFlag(matchProfile.origin)}</span>
                  {matchProfile.verificationStatus === 'Verified' && (
                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{matchProfile.profession}</p>
                
                {/* Event Context */}
                <div className="bg-primary-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <CalendarDaysIcon className="w-4 h-4 text-primary-600" />
                    <span className="font-semibold text-primary-800 text-sm">
                      {eventContext.eventTitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-primary-600">
                    <span>{eventContext.eventDate} • {eventContext.eventTime}</span>
                    <span>{eventContext.eventLocation}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Safety Notice */}
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheckIcon className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">
                  {language === "pt" ? "Encontro Seguro" : "Safe Meeting"}
                </span>
              </div>
              <p className="text-xs text-blue-700">
                {language === "pt"
                  ? "Este é um evento público numa localização verificada. Mantenha sempre conversas respeitosas."
                  : "This is a public event at a verified location. Always maintain respectful conversations."}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                {language === "pt" ? "Tipo de Conversa:" : "Conversation Type:"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: language === "pt" ? 'Todas' : 'All' },
                  { key: 'cultural', label: language === "pt" ? 'Cultural' : 'Cultural' },
                  { key: 'event_specific', label: language === "pt" ? 'Evento' : 'Event' },
                  { key: 'personal_connection', label: language === "pt" ? 'Pessoal' : 'Personal' },
                  { key: 'professional', label: language === "pt" ? 'Profissional' : 'Professional' },
                  { key: 'safety_focused', label: language === "pt" ? 'Seguro' : 'Safe' }
                ].map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.key
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Suggested Starters */}
            <div className="space-y-3 mb-6">
              <h4 className="font-semibold text-gray-900">
                {language === "pt" ? "Sugestões de Conversa:" : "Conversation Suggestions:"}
              </h4>
              
              {filteredStarters.slice(0, 6).map((starter, index) => {
                const IconComponent = getCategoryIcon(starter.category);
                
                return (
                  <motion.div
                    key={starter.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => handleStartConversation(starter)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <IconComponent className="w-4 h-4 text-primary-600" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSafetyLevelColor(starter.safetyLevel)}`}>
                            {starter.safetyLevel === 'safe' ? '✓' : starter.safetyLevel === 'moderate' ? '⚠' : '!'}
                          </div>
                          <div className="flex items-center gap-1">
                            <StarIcon className="w-3 h-3 text-yellow-500" />
                            <span className="text-xs text-gray-600">{starter.responseRate}% response rate</span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {starter.culturalRelevance}% {language === "pt" ? "cultural" : "cultural"}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-800 mb-2">"{starter.text}"</p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 capitalize">
                            {starter.category.replace('_', ' ')} • {starter.recommendedTiming.replace('_', ' ')}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartConversation(starter);
                            }}
                            className="bg-primary-600 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-primary-700 transition-colors"
                          >
                            {language === "pt" ? "Enviar" : "Send"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Custom Message */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">
                {language === "pt" ? "Mensagem Personalizada:" : "Custom Message:"}
              </h4>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder={language === "pt" 
                  ? "Escreva a sua própria mensagem..."
                  : "Write your own message..."}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none"
                rows={3}
                maxLength={300}
              />
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-gray-500">
                  {customMessage.length}/300 {language === "pt" ? "caracteres" : "characters"}
                </span>
                <button
                  onClick={handleCustomMessage}
                  disabled={!customMessage.trim()}
                  className="bg-secondary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-secondary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {language === "pt" ? "Enviar Mensagem" : "Send Message"}
                </button>
              </div>
            </div>

            {/* Safety Tips Toggle */}
            <div className="mt-6">
              <button
                onClick={() => setShowSafetyTips(!showSafetyTips)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ShieldCheckIcon className="w-4 h-4" />
                {language === "pt" ? "Dicas de Segurança" : "Safety Tips"}
              </button>
              
              <AnimatePresence>
                {showSafetyTips && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-3 bg-gray-50 rounded-lg p-4"
                  >
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5" />
                        {language === "pt" 
                          ? "Encontrem-se sempre em locais públicos durante eventos"
                          : "Always meet in public locations during events"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5" />
                        {language === "pt"
                          ? "Mantenham conversas respeitosas e apropriadas"
                          : "Keep conversations respectful and appropriate"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5" />
                        {language === "pt"
                          ? "Reportem qualquer comportamento inadequado"
                          : "Report any inappropriate behavior"}
                      </li>
                    </ul>
                    
                    {onSafetyReport && (
                      <button
                        onClick={() => onSafetyReport(matchProfile.id, 'inappropriate_behavior')}
                        className="mt-3 flex items-center gap-2 text-sm text-red-600 hover:text-red-800 transition-colors"
                      >
                        <ExclamationTriangleIcon className="w-4 h-4" />
                        {language === "pt" ? "Reportar Problema" : "Report Issue"}
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Premium Features for Free Users */}
          {!hasActiveSubscription && (
            <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 border-t border-orange-200">
              <div className="flex items-center gap-3">
                <SparklesIcon className="w-5 h-5 text-orange-600" />
                <div className="flex-1">
                  <p className="text-sm text-orange-800 font-medium">
                    {language === "pt"
                      ? "Membros Premium recebem sugestões de conversa personalizadas e verificação de compatibilidade cultural."
                      : "Premium members get personalized conversation suggestions and cultural compatibility verification."}
                  </p>
                </div>
                <button className="bg-orange-600 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-orange-700 transition-colors">
                  {language === "pt" ? "Upgrade" : "Upgrade"}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}