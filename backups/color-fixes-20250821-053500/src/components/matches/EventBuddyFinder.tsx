"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserGroupIcon,
  CalendarDaysIcon,
  MapPinIcon,
  SparklesIcon,
  HeartIcon,
  ClockIcon,
  StarIcon,
  CheckCircleIcon,
  XMarkIcon,
  ChatBubbleLeftRightIcon,
  TicketIcon,
  FireIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid, StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { formatPrice } from "@/config/pricing";
import Image from "next/image";

interface BuddyRequest {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventPrice: number;
  eventCategory: string;
  requesterName: string;
  requesterAge: number;
  requesterImage?: string;
  requesterInterests: string[];
  compatibilityScore: number;
  sharedInterests: string[];
  culturalAlignment: number;
  buddyDiscountPercent: number;
  message?: string;
  timePosted: string;
  responseRate: number;
  isVerified: boolean;
  preferredBuddyCriteria: {
    ageRange: [number, number];
    interests: string[];
    genderPreference: string;
    portugueseSpeakerOnly: boolean;
  };
}

interface EventBuddyFinderProps {
  selectedEventId?: string;
  onBuddyRequestCreated?: (requestId: string) => void;
  onBuddyRequestAccepted?: (requestId: string) => void;
  showCreateRequest?: boolean;
}

export default function EventBuddyFinder({
  selectedEventId,
  onBuddyRequestCreated,
  onBuddyRequestAccepted,
  showCreateRequest = true,
}: EventBuddyFinderProps) {
  const { language } = useLanguage();
  const { hasActiveSubscription } = useSubscription();
  const [activeTab, setActiveTab] = useState<'find' | 'create'>('find');
  const [buddyRequests, setBuddyRequests] = useState<BuddyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<BuddyRequest | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 100],
    compatibility: 70,
  });

  // Mock buddy requests data
  useEffect(() => {
    const mockRequests: BuddyRequest[] = [
      {
        id: "1",
        eventId: "evt1",
        eventTitle: language === "pt" ? "Noite de Fado Autêntico" : "Authentic Fado Night",
        eventDate: "2025-08-25",
        eventTime: "19:30",
        eventLocation: "Vauxhall",
        eventPrice: 25,
        eventCategory: "Cultural",
        requesterName: "Sofia",
        requesterAge: 29,
        requesterInterests: ["Fado", "Portuguese Culture", "Music", "Arts"],
        compatibilityScore: 94,
        sharedInterests: ["Fado", "Portuguese Culture", "Music"],
        culturalAlignment: 96,
        buddyDiscountPercent: 15,
        message: language === "pt" 
          ? "Adoro Fado mas não gosto de ir sozinha. Procuro alguém que aprecie a nossa música tradicional!"
          : "I love Fado but don't like going alone. Looking for someone who appreciates our traditional music!",
        timePosted: "2h ago",
        responseRate: 85,
        isVerified: true,
        preferredBuddyCriteria: {
          ageRange: [25, 35],
          interests: ["Fado", "Portuguese Culture"],
          genderPreference: "any",
          portugueseSpeakerOnly: true,
        },
      },
      {
        id: "2",
        eventId: "evt2",
        eventTitle: language === "pt" ? "Degustação de Vinhos do Porto" : "Port Wine Tasting",
        eventDate: "2025-08-30",
        eventTime: "18:00",
        eventLocation: "Borough Market",
        eventPrice: 40,
        eventCategory: "Gastronomy",
        requesterName: "Miguel",
        requesterAge: 32,
        requesterInterests: ["Wine", "Portuguese Cuisine", "Networking", "Business"],
        compatibilityScore: 87,
        sharedInterests: ["Wine", "Portuguese Cuisine"],
        culturalAlignment: 89,
        buddyDiscountPercent: 20,
        message: language === "pt"
          ? "Sou apaixonado por vinhos portugueses. Seria ótimo partilhar esta experiência com alguém!"
          : "I'm passionate about Portuguese wines. Would be great to share this experience with someone!",
        timePosted: "5h ago",
        responseRate: 92,
        isVerified: true,
        preferredBuddyCriteria: {
          ageRange: [28, 40],
          interests: ["Wine", "Gastronomy"],
          genderPreference: "any",
          portugueseSpeakerOnly: false,
        },
      },
      {
        id: "3",
        eventId: "evt3",
        eventTitle: language === "pt" ? "Final Portugal vs Espanha" : "Portugal vs Spain Final",
        eventDate: "2025-09-01",
        eventTime: "20:00",
        eventLocation: "Stockwell",
        eventPrice: 15,
        eventCategory: "Sports",
        requesterName: "Carlos",
        requesterAge: 35,
        requesterInterests: ["Football", "Sports", "Portuguese Pride", "Community"],
        compatibilityScore: 91,
        sharedInterests: ["Football", "Portuguese Pride"],
        culturalAlignment: 94,
        buddyDiscountPercent: 10,
        message: language === "pt"
          ? "Vamos apoiar a Seleção juntos! A energia da torcida portuguesa é incrível!"
          : "Let's support the national team together! The energy of Portuguese fans is incredible!",
        timePosted: "1d ago",
        responseRate: 78,
        isVerified: true,
        preferredBuddyCriteria: {
          ageRange: [25, 45],
          interests: ["Football", "Sports"],
          genderPreference: "any",
          portugueseSpeakerOnly: true,
        },
      },
    ];

    setTimeout(() => {
      setBuddyRequests(mockRequests);
      setLoading(false);
    }, 1000);
  }, [language]);

  const handleAcceptRequest = (request: BuddyRequest) => {
    setSelectedRequest(request);
    setShowRequestModal(true);
  };

  const confirmAcceptRequest = () => {
    if (selectedRequest) {
      onBuddyRequestAccepted?.(selectedRequest.id);
      setShowRequestModal(false);
      setSelectedRequest(null);
      // Remove accepted request from list
      setBuddyRequests(prev => prev.filter(req => req.id !== selectedRequest.id));
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50";
    if (score >= 80) return "text-blue-600 bg-blue-50";
    if (score >= 70) return "text-orange-600 bg-orange-50";
    return "text-gray-600 bg-gray-50";
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Cultural":
        return "🎭";
      case "Gastronomy":
        return "🍷";
      case "Sports":
        return "⚽";
      case "Workshop":
        return "👨‍🍳";
      default:
        return "🎉";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-primary-100">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-primary-100 rounded w-1/2"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-primary-50 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-primary-100">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-xl">
            <UserGroupIcon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-primary-900">
            {language === "pt" ? "Encontrar Companheiros de Evento" : "Find Event Buddies"}
          </h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-primary-50 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('find')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'find'
                ? "bg-white text-primary-700 shadow-sm"
                : "text-primary-600 hover:text-primary-700"
            }`}
          >
            {language === "pt" ? "Encontrar Companheiros" : "Find Buddies"}
          </button>
          {showCreateRequest && (
            <button
              onClick={() => setActiveTab('create')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'create'
                  ? "bg-white text-primary-700 shadow-sm"
                  : "text-primary-600 hover:text-primary-700"
              }`}
            >
              {language === "pt" ? "Criar Pedido" : "Create Request"}
            </button>
          )}
        </div>
      </div>

      {/* Find Buddies Tab */}
      {activeTab === 'find' && (
        <div className="space-y-4">
          {/* Quick Stats */}
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-xl border border-primary-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-primary-900">{buddyRequests.length}</div>
                <div className="text-xs text-primary-600">
                  {language === "pt" ? "Pedidos Ativos" : "Active Requests"}
                </div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary-900">89%</div>
                <div className="text-xs text-primary-600">
                  {language === "pt" ? "Taxa de Sucesso" : "Success Rate"}
                </div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary-900">£12</div>
                <div className="text-xs text-primary-600">
                  {language === "pt" ? "Poupança Média" : "Avg Savings"}
                </div>
              </div>
            </div>
          </div>

          {/* Buddy Requests List */}
          <div className="space-y-3">
            {buddyRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-primary-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:border-primary-300"
              >
                {/* Request Header */}
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center text-xl">
                      {getCategoryIcon(request.eventCategory)}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-primary-900 text-sm leading-tight">
                          {request.eventTitle}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-primary-600">
                            {request.requesterName}, {request.requesterAge}
                          </span>
                          {request.isVerified && (
                            <CheckCircleIcon className="w-3 h-3 text-green-500" />
                          )}
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-lg text-xs font-bold ${getCompatibilityColor(request.compatibilityScore)}`}>
                        {request.compatibilityScore}%
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                      <div className="flex items-center gap-1 text-primary-600">
                        <CalendarDaysIcon className="w-3 h-3" />
                        <span>{request.eventDate} • {request.eventTime}</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary-600">
                        <MapPinIcon className="w-3 h-3" />
                        <span>{request.eventLocation}</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary-600">
                        <TicketIcon className="w-3 h-3" />
                        <span>{formatPrice(request.eventPrice)}</span>
                        <span className="text-green-600 font-semibold">
                          (-{request.buddyDiscountPercent}%)
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-primary-600">
                        <ClockIcon className="w-3 h-3" />
                        <span>{request.timePosted}</span>
                      </div>
                    </div>

                    {/* Message Preview */}
                    {request.message && (
                      <div className="bg-primary-25 p-2 rounded-lg mb-3">
                        <p className="text-xs text-primary-700 line-clamp-2">
                          "{request.message}"
                        </p>
                      </div>
                    )}

                    {/* Shared Interests */}
                    <div className="mb-3">
                      <div className="flex items-center gap-1 mb-2">
                        <SparklesIcon className="w-3 h-3 text-secondary-500" />
                        <span className="text-xs font-semibold text-primary-800">
                          {language === "pt" ? "Interesses Comuns:" : "Shared Interests:"}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {request.sharedInterests.slice(0, 3).map((interest, idx) => (
                          <span
                            key={idx}
                            className="bg-secondary-50 text-secondary-700 px-2 py-0.5 rounded text-xs font-medium"
                          >
                            {interest}
                          </span>
                        ))}
                        {request.sharedInterests.length > 3 && (
                          <span className="text-primary-500 text-xs">
                            +{request.sharedInterests.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Compatibility Metrics */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="text-center">
                        <div className="text-xs font-bold text-primary-900">{request.compatibilityScore}%</div>
                        <div className="text-xs text-primary-500">
                          {language === "pt" ? "Geral" : "Overall"}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-bold text-primary-900">{request.culturalAlignment}%</div>
                        <div className="text-xs text-primary-500">
                          {language === "pt" ? "Cultural" : "Cultural"}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-bold text-primary-900">{request.responseRate}%</div>
                        <div className="text-xs text-primary-500">
                          {language === "pt" ? "Resposta" : "Response"}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAcceptRequest(request)}
                        className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all flex items-center justify-center gap-1"
                      >
                        <UsersIcon className="w-3 h-3" />
                        {language === "pt" ? "Aceitar" : "Accept"}
                      </button>
                      <button className="p-2 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
                        <ChatBubbleLeftRightIcon className="w-3 h-3" />
                      </button>
                      <button className="p-2 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
                        <HeartIcon className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {buddyRequests.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="font-semibold text-primary-900 mb-2">
                {language === "pt" 
                  ? "Nenhum pedido de companheiro no momento" 
                  : "No buddy requests at the moment"}
              </h4>
              <p className="text-primary-600 text-sm">
                {language === "pt"
                  ? "Seja o primeiro a criar um pedido para um evento!"
                  : "Be the first to create a request for an event!"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Create Request Tab */}
      {activeTab === 'create' && showCreateRequest && (
        <div className="space-y-4">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <SparklesIcon className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-primary-900 mb-2">
              {language === "pt" 
                ? "Criar Pedido de Companheiro" 
                : "Create Buddy Request"}
            </h4>
            <p className="text-primary-600 text-sm mb-4">
              {language === "pt"
                ? "Encontre alguém para participar em eventos portugueses juntos!"
                : "Find someone to attend Portuguese events together!"}
            </p>
            <button className="bg-gradient-to-r from-secondary-600 to-accent-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-secondary-700 hover:to-accent-700 transition-all">
              {language === "pt" ? "Criar Pedido" : "Create Request"}
            </button>
          </div>
        </div>
      )}

      {/* Accept Request Modal */}
      <AnimatePresence>
        {showRequestModal && selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRequestModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="text-xl font-bold text-primary-900 mb-2">
                  {language === "pt" ? "Confirmar Pedido" : "Confirm Request"}
                </h3>
                <p className="text-primary-700">
                  {language === "pt"
                    ? `Quer aceitar o convite de ${selectedRequest.requesterName} para "${selectedRequest.eventTitle}"?`
                    : `Want to accept ${selectedRequest.requesterName}'s invitation to "${selectedRequest.eventTitle}"?`}
                </p>
              </div>

              {/* Event and Savings Details */}
              <div className="bg-primary-50 p-4 rounded-xl mb-4 space-y-3">
                <div className="text-center">
                  <div className="font-bold text-primary-900 text-lg">
                    {formatPrice(selectedRequest.eventPrice * 2 * (1 - selectedRequest.buddyDiscountPercent / 100))}
                  </div>
                  <div className="text-primary-600 text-sm">
                    {language === "pt" ? "Total para dois (com desconto)" : "Total for two (with discount)"}
                  </div>
                  <div className="text-xs text-primary-500 line-through">
                    {formatPrice(selectedRequest.eventPrice * 2)}
                  </div>
                </div>

                <div className="border-t border-primary-200 pt-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-700">
                      {language === "pt" ? "Poupança:" : "Savings:"}
                    </span>
                    <span className="font-bold text-green-600">
                      {formatPrice(selectedRequest.eventPrice * 2 * (selectedRequest.buddyDiscountPercent / 100))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Compatibility Summary */}
              <div className="bg-secondary-50 p-4 rounded-xl mb-6">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className="text-center">
                    <div className="text-lg font-bold text-secondary-800">{selectedRequest.compatibilityScore}%</div>
                    <div className="text-xs text-secondary-600">
                      {language === "pt" ? "Compatibilidade" : "Compatibility"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-secondary-800">{selectedRequest.culturalAlignment}%</div>
                    <div className="text-xs text-secondary-600">
                      {language === "pt" ? "Cultural" : "Cultural"}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-secondary-700">
                    {selectedRequest.sharedInterests.length} {language === "pt" ? "interesses comuns" : "shared interests"}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 border border-primary-300 text-primary-700 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-colors"
                >
                  {language === "pt" ? "Cancelar" : "Cancel"}
                </button>
                <button
                  onClick={confirmAcceptRequest}
                  className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all"
                >
                  {language === "pt" ? "Aceitar" : "Accept"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Feature Promotion */}
      {!hasActiveSubscription && (
        <div className="mt-6 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <FireIcon className="w-5 h-5 text-orange-600" />
            <div className="flex-1">
              <h5 className="font-semibold text-orange-900 mb-1">
                {language === "pt" 
                  ? "Quer mais opções de companheiros?" 
                  : "Want more buddy options?"}
              </h5>
              <p className="text-orange-700 text-sm">
                {language === "pt"
                  ? "Membros Premium veem 5x mais pedidos e têm descontos exclusivos."
                  : "Premium members see 5x more requests and get exclusive discounts."}
              </p>
            </div>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors">
              {language === "pt" ? "Upgrade" : "Upgrade"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}