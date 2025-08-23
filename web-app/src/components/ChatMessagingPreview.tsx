"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  HeartIcon,
  MapPinIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowRightIcon,
  FlagIcon,
  MusicalNoteIcon,
  BeakerIcon,
  CheckCircleIcon,
  EyeIcon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  Heart,
  MessageCircle,
  Users,
  MapPin,
  Crown,
  Coffee,
  Music,
  Football,
  Star,
  Clock,
  Smile,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

interface ChatMessage {
  id: string;
  user: {
    name: string;
    avatar: string;
    location: string;
    isModerator?: boolean;
    isPremium?: boolean;
    region: "portugal" | "brazil" | "angola" | "mozambique" | "diaspora";
  };
  message: string;
  timestamp: Date;
  type: "text" | "event" | "group" | "location" | "cultural";
  emotes?: string[];
  reactions?: { emoji: string; count: number }[];
  eventId?: string;
  groupId?: string;
  isTranslated?: boolean;
}

interface ChatGroup {
  id: string;
  name: string;
  nameEn: string;
  memberCount: number;
  isActive: boolean;
  category: "cultural" | "events" | "business" | "social" | "location";
  icon: React.ReactNode;
}

export default function ChatMessagingPreview() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"live" | "groups" | "events">(
    "live"
  );
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showModerationFeatures, setShowModerationFeatures] = useState(false);
  const [viewerCount, setViewerCount] = useState(1247);

  // Mock Portuguese-speaking community messages with cultural mixing
  const mockMessages: ChatMessage[] = useMemo(
    () => [
      {
        id: "1",
        user: {
          name: "Maria Santos",
          avatar: "MS",
          location: "Camden",
          region: "portugal",
          isPremium: true,
        },
        message:
          language === "pt"
            ? "Alguém vai ao Fado na Ronnie Scott's amanhã? 🎭"
            : "Anyone going to Fado at Ronnie Scott's tomorrow? 🎭",
        timestamp: new Date(Date.now() - 30000),
        type: "cultural",
        emotes: [":fado:", ":festa:"],
        reactions: [
          { emoji: "🎵", count: 8 },
          { emoji: "❤️", count: 12 },
        ],
      },
      {
        id: "2",
        user: {
          name: "João Silva",
          avatar: "JS",
          location: "Vauxhall",
          region: "brazil",
          isModerator: true,
        },
        message:
          language === "pt"
            ? "Vou organizar um evento para assistir Portugal vs França! Who's in? ⚽"
            : "I'm organizing an event to watch Portugal vs France! Who's in? ⚽",
        timestamp: new Date(Date.now() - 120000),
        type: "event",
        emotes: [":futebol:", ":portugal:"],
        reactions: [
          { emoji: "⚽", count: 23 },
          { emoji: "🇵🇹", count: 18 },
        ],
        eventId: "portugal-france-match",
      },
      {
        id: "3",
        user: {
          name: "Ana Rodrigues",
          avatar: "AR",
          location: "Stockwell",
          region: "angola",
        },
        message:
          language === "pt"
            ? "Found amazing pastéis de nata in Borough Market! £2.50 cada 🥧"
            : "Found amazing pastéis de nata in Borough Market! £2.50 each 🥧",
        timestamp: new Date(Date.now() - 300000),
        type: "location",
        reactions: [
          { emoji: "🥧", count: 15 },
          { emoji: "😋", count: 9 },
        ],
      },
      {
        id: "4",
        user: {
          name: "Pedro Costa",
          avatar: "PC",
          location: "Brixton",
          region: "diaspora",
          isPremium: true,
        },
        message:
          language === "pt"
            ? "Saudade de casa hoje... someone wants to grab coffee and talk? ☕"
            : "Missing home today... someone wants to grab coffee and talk? ☕",
        timestamp: new Date(Date.now() - 480000),
        type: "cultural",
        emotes: [":saudade:", ":cafe:"],
        reactions: [
          { emoji: "☕", count: 6 },
          { emoji: "🤗", count: 11 },
        ],
      },
      {
        id: "5",
        user: {
          name: "Catarina Lopes",
          avatar: "CL",
          location: "Elephant & Castle",
          region: "mozambique",
        },
        message:
          language === "pt"
            ? "Portuguese book club meeting Sunday at Southbank! Saramago this month 📚"
            : "Portuguese book club meeting Sunday at Southbank! Saramago this month 📚",
        timestamp: new Date(Date.now() - 600000),
        type: "group",
        groupId: "portuguese-book-club",
        reactions: [
          { emoji: "📚", count: 7 },
          { emoji: "🇵🇹", count: 5 },
        ],
      },
      {
        id: "6",
        user: {
          name: "Ricardo Mendes",
          avatar: "RM",
          location: "Bermondsey",
          region: "portugal",
          isPremium: true,
        },
        message:
          language === "pt"
            ? "Business networking this Thursday! Vai ser great for connections 💼"
            : "Business networking this Thursday! It's going to be great for connections 💼",
        timestamp: new Date(Date.now() - 720000),
        type: "event",
        eventId: "portuguese-business-networking",
        reactions: [
          { emoji: "💼", count: 14 },
          { emoji: "🤝", count: 8 },
        ],
      },
    ],
    [language]
  );

  // Mock chat groups with Portuguese cultural focus
  const chatGroups: ChatGroup[] = useMemo(
    () => [
      {
        id: "fado-lovers",
        name: "Amantes do Fado",
        nameEn: "Fado Lovers",
        memberCount: 342,
        isActive: true,
        category: "cultural",
        icon: <MusicalNoteIcon className="w-5 h-5" />,
      },
      {
        id: "santos-populares",
        name: "Santos Populares London",
        nameEn: "Santos Populares London",
        memberCount: 567,
        isActive: true,
        category: "events",
        icon: <SparklesIcon className="w-5 h-5" />,
      },
      {
        id: "portuguese-food",
        name: "Comida Portuguesa",
        nameEn: "Portuguese Food",
        memberCount: 891,
        isActive: true,
        category: "cultural",
        icon: <Coffee className="w-5 h-5" />,
      },
      {
        id: "south-london",
        name: "South London Lusos",
        nameEn: "South London Portuguese",
        memberCount: 423,
        isActive: true,
        category: "location",
        icon: <MapPinIcon className="w-5 h-5" />,
      },
      {
        id: "business-network",
        name: "Negócios & Carreiras",
        nameEn: "Business & Careers",
        memberCount: 234,
        isActive: true,
        category: "business",
        icon: <UserGroupIcon className="w-5 h-5" />,
      },
      {
        id: "portuguese-football",
        name: "Futebol Português",
        nameEn: "Portuguese Football",
        memberCount: 678,
        isActive: true,
        category: "cultural",
        icon: <Football className="w-5 h-5" />,
      },
    ],
    []
  );

  // Auto-cycle through messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % mockMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [mockMessages.length]);

  // Simulate real-time viewer count changes
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getRegionFlag = (region: string) => {
    const flags = {
      portugal: "🇵🇹",
      brazil: "🇧🇷",
      angola: "🇦🇴",
      mozambique: "🇲🇿",
      diaspora: "🌍",
    };
    return flags[region as keyof typeof flags] || "🌍";
  };

  const getRegionColor = (region: string) => {
    const colors = {
      portugal: "bg-primary-500",
      brazil: "bg-secondary-500",
      angola: "bg-action-500",
      mozambique: "bg-premium-500",
      diaspora: "bg-coral-500",
    };
    return colors[region as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <ChatBubbleLeftRightIcon className="w-8 h-8 text-primary-600 mr-3" />
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide">
              {t("chat.preview.badge", "Real-time Community")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {language === "pt"
              ? "Conversas da Comunidade de Falantes de Português"
              : "Portuguese-speaking community Conversations"}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === "pt"
              ? "Junte-se a milhares de portugueses em Londres. Chat em tempo real, grupos culturais, coordenação de eventos - tudo num só lugar."
              : "Join thousands of Portuguese speakers in London. Real-time chat, cultural groups, event coordination - all in one place."}
          </p>

          {/* Live indicator */}
          <div className="flex items-center justify-center mt-6 space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-secondary-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm font-medium text-gray-700">
                {language === "pt" ? "AO VIVO" : "LIVE"}
              </span>
            </div>
            <div className="flex items-center">
              <EyeIcon className="w-4 h-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-600">
                {viewerCount.toLocaleString()}{" "}
                {language === "pt" ? "online" : "online"}
              </span>
            </div>
            <div className="flex items-center">
              <UserGroupIcon className="w-4 h-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-600">
                12{language === "pt" ? "k membros" : "k members"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Main Chat Interface */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 bg-gray-50">
              <div className="flex space-x-8 px-6 py-4">
                {(["live", "groups", "events"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-primary-500 text-white"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white"
                    }`}
                  >
                    {tab === "live" && (
                      <ChatBubbleLeftRightIcon className="w-4 h-4" />
                    )}
                    {tab === "groups" && <UserGroupIcon className="w-4 h-4" />}
                    {tab === "events" && (
                      <CalendarDaysIcon className="w-4 h-4" />
                    )}
                    <span>
                      {tab === "live" &&
                        (language === "pt" ? "Chat Ao Vivo" : "Live Chat")}
                      {tab === "groups" &&
                        (language === "pt" ? "Grupos" : "Groups")}
                      {tab === "events" &&
                        (language === "pt" ? "Eventos" : "Events")}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 h-96">
              {/* Chat Messages */}
              <div className="lg:col-span-2 flex flex-col">
                {/* Chat Header */}
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-primary-500 to-secondary-500">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                      <h3 className="font-semibold text-white">
                        {language === "pt"
                          ? "Comunidade Geral"
                          : "General Community"}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-4">
                      <ShieldCheckIcon
                        className="w-5 h-5 text-white cursor-pointer hover:text-yellow-200 transition-colors"
                        onClick={() =>
                          setShowModerationFeatures(!showModerationFeatures)
                        }
                      />
                      <span className="text-white text-sm">
                        {mockMessages.length}{" "}
                        {language === "pt" ? "mensagens" : "messages"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50">
                  <AnimatePresence mode="popLayout">
                    {mockMessages.slice(0, 4).map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: index === currentMessageIndex ? 1 : 0.7,
                          y: 0,
                          scale: index === currentMessageIndex ? 1 : 0.98,
                        }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className={`flex space-x-3 ${
                          index === currentMessageIndex
                            ? "ring-2 ring-primary-200 rounded-lg p-2"
                            : ""
                        }`}
                      >
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${getRegionColor(
                              message.user.region
                            )}`}
                          >
                            {message.user.avatar}
                          </div>
                          <div className="text-xs text-center mt-1">
                            {getRegionFlag(message.user.region)}
                          </div>
                        </div>

                        {/* Message Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900 text-sm">
                              {message.user.name}
                            </span>
                            {message.user.isModerator && (
                              <ShieldCheckIcon className="w-4 h-4 text-primary-500" />
                            )}
                            {message.user.isPremium && (
                              <Crown className="w-4 h-4 text-premium-500" />
                            )}
                            <span className="text-xs text-gray-500 flex items-center">
                              <MapPinIcon className="w-3 h-3 mr-1" />
                              {message.user.location}
                            </span>
                            <span className="text-xs text-gray-400">
                              {new Intl.RelativeTimeFormat(language, {
                                numeric: "auto",
                              }).format(
                                Math.floor(
                                  (message.timestamp.getTime() - Date.now()) /
                                    60000
                                ),
                                "minute"
                              )}
                            </span>
                          </div>

                          <p className="text-gray-800 text-sm mt-1 leading-relaxed">
                            {message.message}
                          </p>

                          {/* Message Type Indicators */}
                          {message.type === "event" && (
                            <div className="mt-2 inline-flex items-center px-2 py-1 rounded-md bg-secondary-100 text-secondary-700 text-xs">
                              <CalendarDaysIcon className="w-3 h-3 mr-1" />
                              {language === "pt" ? "Evento" : "Event"}
                            </div>
                          )}

                          {message.type === "cultural" && (
                            <div className="mt-2 inline-flex items-center px-2 py-1 rounded-md bg-premium-100 text-premium-700 text-xs">
                              <SparklesIcon className="w-3 h-3 mr-1" />
                              {language === "pt" ? "Cultural" : "Cultural"}
                            </div>
                          )}

                          {/* Reactions */}
                          {message.reactions && (
                            <div className="flex items-center space-x-2 mt-2">
                              {message.reactions.map((reaction, idx) => (
                                <motion.button
                                  key={idx}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="flex items-center space-x-1 px-2 py-1 rounded-full bg-white border border-gray-200 text-xs hover:bg-gray-50 transition-colors"
                                >
                                  <span>{reaction.emoji}</span>
                                  <span className="text-gray-600">
                                    {reaction.count}
                                  </span>
                                </motion.button>
                              ))}
                              <button className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors">
                                <PlusIcon className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Message Input */}
                <div className="px-6 py-4 border-t border-gray-200 bg-white">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder={
                          language === "pt"
                            ? "Escreva sua mensagem..."
                            : "Type your message..."
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        disabled
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                        <Smile className="w-4 h-4 text-gray-400" />
                        <div className="w-px h-4 bg-gray-300"></div>
                        <span className="text-xs text-gray-500">🇵🇹</span>
                      </div>
                    </div>
                    <button
                      disabled
                      className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
                    >
                      <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quick emotes */}
                  <div className="flex items-center space-x-2 mt-3">
                    <span className="text-xs text-gray-500">
                      {language === "pt" ? "Emotes rápidos:" : "Quick emotes:"}
                    </span>
                    {[
                      ":saudade:",
                      ":festa:",
                      ":futebol:",
                      ":fado:",
                      ":cafe:",
                    ].map((emote, idx) => (
                      <button
                        key={idx}
                        className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                        disabled
                      >
                        {emote}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="border-l border-gray-200 bg-gray-50">
                {activeTab === "groups" && (
                  <div className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <UserGroupIcon className="w-5 h-5 mr-2 text-primary-500" />
                      {language === "pt" ? "Grupos Ativos" : "Active Groups"}
                    </h4>
                    <div className="space-y-3">
                      {chatGroups.map((group) => (
                        <motion.div
                          key={group.id}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-primary-200 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="text-primary-500">{group.icon}</div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">
                                {language === "pt" ? group.name : group.nameEn}
                              </p>
                              <p className="text-xs text-gray-500">
                                {group.memberCount}{" "}
                                {language === "pt" ? "membros" : "members"}
                              </p>
                            </div>
                          </div>
                          {group.isActive && (
                            <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "live" && (
                  <div className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <EyeIcon className="w-5 h-5 mr-2 text-primary-500" />
                      {language === "pt" ? "Online Agora" : "Online Now"}
                    </h4>
                    <div className="space-y-2">
                      {mockMessages.slice(0, 6).map((message) => (
                        <div
                          key={message.id}
                          className="flex items-center space-x-2"
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${getRegionColor(
                              message.user.region
                            )}`}
                          >
                            {message.user.avatar}
                          </div>
                          <span className="text-sm text-gray-700 truncate flex-1">
                            {message.user.name}
                          </span>
                          <span className="text-xs">
                            {getRegionFlag(message.user.region)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Moderation Features */}
                    {showModerationFeatures && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200"
                      >
                        <h5 className="font-semibold text-primary-900 mb-3 flex items-center">
                          <ShieldCheckIcon className="w-4 h-4 mr-2" />
                          {language === "pt" ? "Moderação" : "Moderation"}
                        </h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-secondary-700">
                            <CheckCircleIcon className="w-4 h-4 mr-2" />
                            {language === "pt"
                              ? "Sistema Anti-Toxicidade"
                              : "Smart Anti-Toxicity"}
                          </div>
                          <div className="flex items-center text-secondary-700">
                            <CheckCircleIcon className="w-4 h-4 mr-2" />
                            {language === "pt"
                              ? "Filtros Culturais"
                              : "Cultural Filters"}
                          </div>
                          <div className="flex items-center text-secondary-700">
                            <CheckCircleIcon className="w-4 h-4 mr-2" />
                            {language === "pt"
                              ? "Verificação Manual"
                              : "Manual Review"}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {activeTab === "events" && (
                  <div className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <CalendarDaysIcon className="w-5 h-5 mr-2 text-primary-500" />
                      {language === "pt" ? "Eventos em Chat" : "Events in Chat"}
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-white rounded-lg border">
                        <p className="font-medium text-sm text-gray-900">
                          {language === "pt"
                            ? "Portugal vs França"
                            : "Portugal vs France"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          23{" "}
                          {language === "pt" ? "participantes" : "participants"}
                        </p>
                      </div>
                      <div className="p-3 bg-white rounded-lg border">
                        <p className="font-medium text-sm text-gray-900">
                          {language === "pt"
                            ? "Fado Night Soho"
                            : "Fado Night Soho"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          18{" "}
                          {language === "pt" ? "participantes" : "participants"}
                        </p>
                      </div>
                      <div className="p-3 bg-white rounded-lg border">
                        <p className="font-medium text-sm text-gray-900">
                          {language === "pt"
                            ? "Business Networking"
                            : "Business Networking"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          31{" "}
                          {language === "pt" ? "participantes" : "participants"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              {language === "pt"
                ? "Junte-se à Conversa Portuguesa"
                : "Join the Portuguese Conversation"}
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              {language === "pt"
                ? "Conecte-se com milhares de portugueses em Londres. Chat em tempo real, grupos culturais, e coordenação de eventos."
                : "Connect with thousands of Portuguese speakers in London. Real-time chat, cultural groups, and event coordination."}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href={ROUTES.signup}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center"
                >
                  {language === "pt" ? "Começar Chat" : "Start Chatting"}
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </motion.button>
              </Link>

              <Link href={ROUTES.groups}>
                <button className="px-8 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                  {language === "pt" ? "Explorar Grupos" : "Explore Groups"}
                </button>
              </Link>
            </div>

            {/* Features highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <ChatBubbleLeftRightIcon className="w-6 h-6 mx-auto mb-2 opacity-80" />
                <p className="text-sm opacity-90">
                  {language === "pt" ? "Chat Tempo Real" : "Real-time Chat"}
                </p>
              </div>
              <div className="text-center">
                <UserGroupIcon className="w-6 h-6 mx-auto mb-2 opacity-80" />
                <p className="text-sm opacity-90">
                  {language === "pt" ? "Grupos Culturais" : "Cultural Groups"}
                </p>
              </div>
              <div className="text-center">
                <ShieldCheckIcon className="w-6 h-6 mx-auto mb-2 opacity-80" />
                <p className="text-sm opacity-90">
                  {language === "pt" ? "Moderação Inteligente" : "Smart Moderation"}
                </p>
              </div>
              <div className="text-center">
                <CalendarDaysIcon className="w-6 h-6 mx-auto mb-2 opacity-80" />
                <p className="text-sm opacity-90">
                  {language === "pt"
                    ? "Eventos Integrados"
                    : "Event Integration"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
