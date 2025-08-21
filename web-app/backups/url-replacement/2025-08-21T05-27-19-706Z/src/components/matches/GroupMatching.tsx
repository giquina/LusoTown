"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserGroupIcon,
  HeartIcon,
  SparklesIcon,
  CalendarDaysIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  XMarkIcon,
  StarIcon,
  UsersIcon,
  FireIcon,
  ClockIcon,
  GiftIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolid,
  StarIcon as StarSolid,
  UserGroupIcon as UserGroupSolid,
} from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { formatPrice } from "@/config/pricing";

interface GroupMember {
  id: string;
  name: string;
  age: number;
  image?: string;
  interests: string[];
  location: string;
  isVerified: boolean;
  compatibilityScore: number;
  culturalAlignment: number;
}

interface GroupMatchRequest {
  id: string;
  initiatorId: string;
  initiatorName: string;
  initiatorAge: number;
  initiatorImage?: string;
  friendId?: string;
  friendName?: string;
  friendAge?: number;
  friendImage?: string;
  requestType: 'double_date' | 'friend_introduction' | 'group_activity' | 'cultural_exploration';
  targetGroupSize: number;
  preferredActivityTypes: string[];
  preferredCulturalFocus: string[];
  ageRangeMin: number;
  ageRangeMax: number;
  genderPreferences: string;
  portugueseSpeakersOnly: boolean;
  preferredNeighborhoods: string[];
  description: string;
  status: 'open' | 'matched' | 'completed' | 'cancelled';
  createdAt: string;
  expiresAt: string;
  suggestedGroups?: GroupMember[][];
  groupCompatibilityScore: number;
  culturalAlignmentScore: number;
}

interface GroupMatchingProps {
  currentUserId?: string;
  friendId?: string;
  onGroupMatchCreated?: (requestId: string) => void;
  onGroupMatchAccepted?: (requestId: string, groupMembers: GroupMember[]) => void;
  showCreateForm?: boolean;
}

export default function GroupMatching({
  currentUserId,
  friendId,
  onGroupMatchCreated,
  onGroupMatchAccepted,
  showCreateForm = true,
}: GroupMatchingProps) {
  const { language } = useLanguage();
  const { hasActiveSubscription } = useSubscription();
  const [activeTab, setActiveTab] = useState<'browse' | 'create' | 'my_requests'>('browse');
  const [groupRequests, setGroupRequests] = useState<GroupMatchRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<GroupMatchRequest | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const requestTypes = [
    {
      id: 'double_date' as const,
      name: language === "pt" ? "Encontro Duplo" : "Double Date",
      description: language === "pt" 
        ? "Duas pessoas procuram outro casal para um encontro conjunto"
        : "Two people looking for another couple for a joint date",
      icon: "💕",
      minSize: 4,
      maxSize: 4,
    },
    {
      id: 'friend_introduction' as const,
      name: language === "pt" ? "Apresentação de Amigos" : "Friend Introduction",
      description: language === "pt"
        ? "Apresentar amigos solteiros para possíveis conexões"
        : "Introducing single friends for potential connections",
      icon: "🤝",
      minSize: 3,
      maxSize: 6,
    },
    {
      id: 'group_activity' as const,
      name: language === "pt" ? "Atividade em Grupo" : "Group Activity",
      description: language === "pt"
        ? "Formar um grupo para atividades culturais portuguesas"
        : "Form a group for Portuguese cultural activities",
      icon: "🎉",
      minSize: 4,
      maxSize: 8,
    },
    {
      id: 'cultural_exploration' as const,
      name: language === "pt" ? "Exploração Cultural" : "Cultural Exploration",
      description: language === "pt"
        ? "Explorar a herança portuguesa em Londres juntos"
        : "Explore Portuguese heritage in London together",
      icon: "🇵🇹",
      minSize: 3,
      maxSize: 6,
    },
  ];

  // Mock group match requests
  useEffect(() => {
    const mockRequests: GroupMatchRequest[] = [
      {
        id: "1",
        initiatorId: "user1",
        initiatorName: "Sofia & Miguel",
        initiatorAge: 29,
        friendId: "user2",
        friendName: "Miguel",
        friendAge: 32,
        requestType: "double_date",
        targetGroupSize: 4,
        preferredActivityTypes: ["Gastronomy", "Cultural", "Social"],
        preferredCulturalFocus: ["Portuguese Cuisine", "Fado Music", "Wine Tasting"],
        ageRangeMin: 26,
        ageRangeMax: 35,
        genderPreferences: "mixed",
        portugueseSpeakersOnly: true,
        preferredNeighborhoods: ["Vauxhall", "Stockwell", "Borough Market"],
        description: language === "pt"
          ? "Casal português procura outro casal para jantares e eventos culturais. Adoramos música e gastronomia portuguesa!"
          : "Portuguese couple looking for another couple for dinners and cultural events. We love music and Portuguese gastronomy!",
        status: "open",
        createdAt: "2025-08-20",
        expiresAt: "2025-09-03",
        groupCompatibilityScore: 91,
        culturalAlignmentScore: 94,
        suggestedGroups: [
          [
            {
              id: "u3",
              name: "Ana",
              age: 28,
              interests: ["Portuguese Cuisine", "Wine", "Cultural Events"],
              location: "Vauxhall",
              isVerified: true,
              compatibilityScore: 89,
              culturalAlignment: 92,
            },
            {
              id: "u4",
              name: "Carlos",
              age: 31,
              interests: ["Fado Music", "Portuguese Culture", "Gastronomy"],
              location: "Stockwell",
              isVerified: true,
              compatibilityScore: 93,
              culturalAlignment: 95,
            },
          ],
        ],
      },
      {
        id: "2",
        initiatorId: "user3",
        initiatorName: "Ricardo",
        initiatorAge: 34,
        requestType: "friend_introduction",
        targetGroupSize: 4,
        preferredActivityTypes: ["Professional Networking", "Social", "Sports"],
        preferredCulturalFocus: ["Business", "Football", "Portuguese Community"],
        ageRangeMin: 28,
        ageRangeMax: 40,
        genderPreferences: "any",
        portugueseSpeakersOnly: false,
        preferredNeighborhoods: ["Camden", "Islington", "City"],
        description: language === "pt"
          ? "Profissional português em Londres procura expandir rede social. Interessado em networking e desporto."
          : "Portuguese professional in London looking to expand social network. Interested in networking and sports.",
        status: "open",
        createdAt: "2025-08-19",
        expiresAt: "2025-09-02",
        groupCompatibilityScore: 85,
        culturalAlignmentScore: 88,
      },
      {
        id: "3",
        initiatorId: "user4",
        initiatorName: "Beatriz & Friends",
        initiatorAge: 26,
        requestType: "cultural_exploration",
        targetGroupSize: 6,
        preferredActivityTypes: ["Cultural", "Educational", "Arts"],
        preferredCulturalFocus: ["Portuguese Heritage", "Museums", "Language Exchange"],
        ageRangeMin: 22,
        ageRangeMax: 32,
        genderPreferences: "mixed",
        portugueseSpeakersOnly: true,
        preferredNeighborhoods: ["Central London", "South London"],
        description: language === "pt"
          ? "Grupo de jovens portugueses interessados em explorar museus e locais históricos portugueses em Londres."
          : "Group of young Portuguese interested in exploring museums and Portuguese historical sites in London.",
        status: "open",
        createdAt: "2025-08-18",
        expiresAt: "2025-09-01",
        groupCompatibilityScore: 88,
        culturalAlignmentScore: 96,
      },
    ];

    setTimeout(() => {
      setGroupRequests(mockRequests);
      setLoading(false);
    }, 1000);
  }, [language]);

  const handleAcceptGroupMatch = (request: GroupMatchRequest) => {
    setSelectedRequest(request);
    setShowRequestModal(true);
  };

  const confirmGroupMatch = () => {
    if (selectedRequest && selectedRequest.suggestedGroups?.[0]) {
      onGroupMatchAccepted?.(selectedRequest.id, selectedRequest.suggestedGroups[0]);
      setShowRequestModal(false);
      setSelectedRequest(null);
      // Remove accepted request from list
      setGroupRequests(prev => prev.filter(req => req.id !== selectedRequest.id));
    }
  };

  const getRequestTypeInfo = (type: string) => {
    return requestTypes.find(rt => rt.id === type) || requestTypes[0];
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50";
    if (score >= 80) return "text-blue-600 bg-blue-50";
    if (score >= 70) return "text-orange-600 bg-orange-50";
    return "text-gray-600 bg-gray-50";
  };

  const tabs = [
    {
      id: 'browse' as const,
      label: language === "pt" ? "Procurar Grupos" : "Browse Groups",
      icon: UserGroupIcon,
    },
    {
      id: 'create' as const,
      label: language === "pt" ? "Criar Pedido" : "Create Request",
      icon: PlusIcon,
    },
    {
      id: 'my_requests' as const,
      label: language === "pt" ? "Meus Pedidos" : "My Requests",
      icon: ChatBubbleLeftRightIcon,
    },
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-primary-100">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-primary-100 rounded w-1/2"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-primary-50 rounded-xl"></div>
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
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
            <UserGroupSolid className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-primary-900">
            {language === "pt" ? "Matches de Grupo" : "Group Matching"}
          </h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-primary-50 rounded-xl p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-primary-700 shadow-sm"
                    : "text-primary-600 hover:text-primary-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Browse Groups Tab */}
      {activeTab === 'browse' && (
        <div className="space-y-4">
          {/* Quick Stats */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-primary-900">{groupRequests.length}</div>
                <div className="text-xs text-primary-600">
                  {language === "pt" ? "Grupos Ativos" : "Active Groups"}
                </div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary-900">94%</div>
                <div className="text-xs text-primary-600">
                  {language === "pt" ? "Taxa de Sucesso" : "Success Rate"}
                </div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary-900">12</div>
                <div className="text-xs text-primary-600">
                  {language === "pt" ? "Grupos Formados" : "Groups Formed"}
                </div>
              </div>
            </div>
          </div>

          {/* Request Type Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {requestTypes.map((type) => (
              <button
                key={type.id}
                className="flex items-center gap-2 px-3 py-2 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-primary-200 transition-colors"
              >
                <span>{type.icon}</span>
                {type.name}
              </button>
            ))}
          </div>

          {/* Group Requests List */}
          <div className="space-y-4">
            {groupRequests.map((request, index) => {
              const typeInfo = getRequestTypeInfo(request.requestType);
              return (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-primary-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:border-primary-300"
                >
                  {/* Request Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-2xl">
                        {typeInfo.icon}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-primary-900 text-lg">
                            {typeInfo.name}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-primary-600">
                            <span>{request.initiatorName}</span>
                            <span>•</span>
                            <span>{request.targetGroupSize} {language === "pt" ? "pessoas" : "people"}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <ClockIcon className="w-3 h-3" />
                              {new Date(request.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        
                        <div className={`px-3 py-1 rounded-lg text-sm font-bold ${getCompatibilityColor(request.groupCompatibilityScore)}`}>
                          {request.groupCompatibilityScore}% match
                        </div>
                      </div>

                      {/* Description */}
                      <div className="bg-primary-25 p-3 rounded-lg mb-4">
                        <p className="text-primary-800 text-sm leading-relaxed">
                          {request.description}
                        </p>
                      </div>

                      {/* Request Details */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-primary-600">
                            <UsersIcon className="w-4 h-4" />
                            <span>
                              {language === "pt" ? "Idades:" : "Ages:"} {request.ageRangeMin}-{request.ageRangeMax}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-primary-600">
                            <MapPinIcon className="w-4 h-4" />
                            <span className="truncate">
                              {request.preferredNeighborhoods.slice(0, 2).join(", ")}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-primary-600">
                            <CheckCircleIcon className="w-4 h-4" />
                            <span>
                              {request.portugueseSpeakersOnly 
                                ? (language === "pt" ? "Só português" : "Portuguese only")
                                : (language === "pt" ? "Qualquer idioma" : "Any language")
                              }
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-primary-600">
                            <StarIcon className="w-4 h-4" />
                            <span>
                              {request.culturalAlignmentScore}% {language === "pt" ? "cultural" : "cultural"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Preferred Activities */}
                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-primary-800 mb-2">
                          {language === "pt" ? "Atividades Preferidas:" : "Preferred Activities:"}
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {request.preferredActivityTypes.slice(0, 3).map((activity, idx) => (
                            <span
                              key={idx}
                              className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs font-medium"
                            >
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Cultural Focus */}
                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-primary-800 mb-2">
                          {language === "pt" ? "Foco Cultural:" : "Cultural Focus:"}
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {request.preferredCulturalFocus.slice(0, 3).map((focus, idx) => (
                            <span
                              key={idx}
                              className="bg-secondary-50 text-secondary-700 px-2 py-1 rounded text-xs font-medium"
                            >
                              {focus}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Compatibility Metrics */}
                      <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary-900">{request.groupCompatibilityScore}%</div>
                          <div className="text-xs text-primary-600">
                            {language === "pt" ? "Compatibilidade" : "Compatibility"}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary-900">{request.culturalAlignmentScore}%</div>
                          <div className="text-xs text-primary-600">
                            {language === "pt" ? "Alinhamento Cultural" : "Cultural Alignment"}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleAcceptGroupMatch(request)}
                          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2"
                        >
                          <UserGroupIcon className="w-4 h-4" />
                          {language === "pt" ? "Juntar ao Grupo" : "Join Group"}
                        </button>
                        <button className="p-3 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
                          <HeartIcon className="w-4 h-4" />
                        </button>
                        <button className="p-3 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
                          <ChatBubbleLeftRightIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Empty State */}
          {groupRequests.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-primary-900 mb-2">
                {language === "pt" 
                  ? "Nenhum grupo ativo no momento" 
                  : "No active groups at the moment"}
              </h4>
              <p className="text-primary-600 text-sm">
                {language === "pt"
                  ? "Seja o primeiro a criar um pedido de grupo!"
                  : "Be the first to create a group request!"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Create Request Tab */}
      {activeTab === 'create' && showCreateForm && (
        <div className="space-y-4">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <PlusIcon className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-primary-900 mb-2">
              {language === "pt" 
                ? "Criar Pedido de Grupo" 
                : "Create Group Request"}
            </h4>
            <p className="text-primary-600 text-sm mb-6">
              {language === "pt"
                ? "Forme grupos para explorar a cultura portuguesa em Londres juntos!"
                : "Form groups to explore Portuguese culture in London together!"}
            </p>

            {/* Request Type Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {requestTypes.map((type) => (
                <button
                  key={type.id}
                  className="p-4 border border-primary-200 rounded-xl text-left hover:border-primary-300 hover:bg-primary-25 transition-all"
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <h5 className="font-semibold text-primary-900 mb-1">{type.name}</h5>
                  <p className="text-sm text-primary-600">{type.description}</p>
                  <div className="text-xs text-primary-500 mt-2">
                    {type.minSize}-{type.maxSize} {language === "pt" ? "pessoas" : "people"}
                  </div>
                </button>
              ))}
            </div>

            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              {language === "pt" ? "Criar Pedido" : "Create Request"}
            </button>
          </div>
        </div>
      )}

      {/* My Requests Tab */}
      {activeTab === 'my_requests' && (
        <div className="space-y-4">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-primary-600" />
            </div>
            <h4 className="font-semibold text-primary-900 mb-2">
              {language === "pt" 
                ? "Seus Pedidos de Grupo" 
                : "Your Group Requests"}
            </h4>
            <p className="text-primary-600 text-sm">
              {language === "pt"
                ? "Acompanhe o status dos seus pedidos ativos"
                : "Track the status of your active requests"}
            </p>
          </div>
        </div>
      )}

      {/* Accept Group Match Modal */}
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
              className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="text-xl font-bold text-primary-900 mb-2">
                  {language === "pt" ? "Juntar ao Grupo!" : "Join the Group!"}
                </h3>
                <p className="text-primary-700">
                  {language === "pt"
                    ? `Quer juntar-se ao grupo de ${selectedRequest.initiatorName}?`
                    : `Want to join ${selectedRequest.initiatorName}'s group?`}
                </p>
              </div>

              {/* Group Details */}
              <div className="bg-purple-50 p-4 rounded-xl mb-4">
                <div className="text-center mb-3">
                  <h4 className="font-bold text-purple-900">
                    {getRequestTypeInfo(selectedRequest.requestType).name}
                  </h4>
                  <p className="text-sm text-purple-700">
                    {selectedRequest.targetGroupSize} {language === "pt" ? "pessoas no total" : "people total"}
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-700">
                      {language === "pt" ? "Compatibilidade:" : "Compatibility:"}
                    </span>
                    <span className="font-bold text-purple-900">
                      {selectedRequest.groupCompatibilityScore}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-700">
                      {language === "pt" ? "Alinhamento Cultural:" : "Cultural Alignment:"}
                    </span>
                    <span className="font-bold text-purple-900">
                      {selectedRequest.culturalAlignmentScore}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Group Members Preview */}
              {selectedRequest.suggestedGroups?.[0] && (
                <div className="mb-6">
                  <h5 className="font-semibold text-primary-900 mb-3">
                    {language === "pt" ? "Membros do Grupo:" : "Group Members:"}
                  </h5>
                  <div className="space-y-2">
                    {selectedRequest.suggestedGroups[0].map((member) => (
                      <div key={member.id} className="flex items-center gap-3 p-2 bg-primary-25 rounded-lg">
                        <div className="w-8 h-8 bg-primary-200 rounded-full flex items-center justify-center text-sm">
                          👤
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-primary-900 text-sm">
                            {member.name}, {member.age}
                          </div>
                          <div className="text-xs text-primary-600">
                            {member.location} • {member.compatibilityScore}% match
                          </div>
                        </div>
                        {member.isVerified && (
                          <CheckCircleIcon className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 border border-primary-300 text-primary-700 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-colors"
                >
                  {language === "pt" ? "Cancelar" : "Cancel"}
                </button>
                <button
                  onClick={confirmGroupMatch}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  {language === "pt" ? "Juntar" : "Join"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Feature Promotion */}
      {!hasActiveSubscription && (
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <GiftIcon className="w-5 h-5 text-purple-600" />
            <div className="flex-1">
              <h5 className="font-semibold text-purple-900 mb-1">
                {language === "pt" 
                  ? "Quer criar grupos ilimitados?" 
                  : "Want unlimited group creation?"}
              </h5>
              <p className="text-purple-700 text-sm">
                {language === "pt"
                  ? "Membros Premium podem criar grupos ilimitados e têm acesso a recursos avançados."
                  : "Premium members can create unlimited groups and access advanced features."}
              </p>
            </div>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors">
              {language === "pt" ? "Upgrade" : "Upgrade"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}