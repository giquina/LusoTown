"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  FireIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  LightBulbIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ClockIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";

interface BusinessProfile {
  id: string;
  name: string;
  profession: string;
  company: string;
  industry: string;
  experience: string;
  networkingGoals: string[];
  businessInterests: string[];
  mentorshipInterest: "mentor" | "mentee" | "peer" | "both";
  conversationStarters: Array<{
    id: string;
    text: string;
    category: string;
    culturalContext: string;
    businessRelevance: string;
    popularity: number;
  }>;
}

interface PortugueseBusinessConversationStartersProps {
  profile: BusinessProfile;
  onStartConversation: (starterId: string) => void;
}

export default function PortugueseBusinessConversationStarters({
  profile,
  onStartConversation,
}: PortugueseBusinessConversationStartersProps) {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'business' | 'cultural' | 'mentorship' | 'networking'>('all');
  const [selectedStarter, setSelectedStarter] = useState<string | null>(null);

  // Generate comprehensive business conversation starters
  const generateBusinessConversationStarters = () => {
    const businessStarters = [
      // Industry-specific starters
      {
        id: "bs1",
        text: language === "pt" 
          ? `Vi que trabalhas no setor ${profile.industry}. Que tendências vês no mercado português nesta área?`
          : `I see you work in ${profile.industry}. What trends do you see in the Portuguese market for this sector?`,
        category: language === "pt" ? "Tendências do Setor" : "Industry Trends",
        culturalContext: language === "pt" ? "Focado no mercado português específico" : "Focused on Portuguese market specifics",
        businessRelevance: language === "pt" ? "Análise de mercado e oportunidades setoriais" : "Market analysis and sector opportunities",
        popularity: 89,
      },
      {
        id: "bs2", 
        text: language === "pt"
          ? `Como é trabalhar na ${profile.company}? Que oportunidades vês para profissionais portugueses na empresa?`
          : `How is it working at ${profile.company}? What opportunities do you see for Portuguese professionals there?`,
        category: language === "pt" ? "Cultura Empresarial" : "Company Culture",
        culturalContext: language === "pt" ? "Experiência de portugueses em empresas britânicas" : "Portuguese experience in British companies",
        businessRelevance: language === "pt" ? "Cultura organizacional e oportunidades de carreira" : "Organizational culture and career opportunities",
        popularity: 92,
      },
      // Experience-based starters
      {
        id: "bs3",
        text: language === "pt"
          ? `Com ${profile.experience} de experiência, que conselhos darias a um profissional português que está a começar em Londres?`
          : `With ${profile.experience} of experience, what advice would you give to a Portuguese professional starting out in London?`,
        category: language === "pt" ? "Mentoria Profissional" : "Professional Mentorship",
        culturalContext: language === "pt" ? "Adaptação profissional de portugueses em Londres" : "Professional adaptation of Portuguese in London",
        businessRelevance: language === "pt" ? "Desenvolvimento de carreira e networking" : "Career development and networking",
        popularity: 95,
      },
      // Networking goals starters
      {
        id: "bs4",
        text: language === "pt"
          ? `Vejo que procuras ${profile.networkingGoals[0]}. Como posso ajudar-te a alcançar esse objetivo?`
          : `I see you're looking for ${profile.networkingGoals[0]}. How can I help you achieve that goal?`,
        category: language === "pt" ? "Objetivos de Networking" : "Networking Goals",
        culturalContext: language === "pt" ? "Colaboração dentro da comunidade portuguesa" : "Collaboration within Portuguese community",
        businessRelevance: language === "pt" ? "Parcerias estratégicas e apoio mútuo" : "Strategic partnerships and mutual support",
        popularity: 87,
      },
      // Cultural business starters
      {
        id: "bs5",
        text: language === "pt"
          ? "Que vantagens competitivas achas que os profissionais portugueses têm no mercado britânico?"
          : "What competitive advantages do you think Portuguese professionals have in the British market?",
        category: language === "pt" ? "Vantagens Culturais" : "Cultural Advantages",
        culturalContext: language === "pt" ? "Valorização da identidade portuguesa no trabalho" : "Valuing Portuguese identity at work",
        businessRelevance: language === "pt" ? "Diferenciação profissional e value proposition" : "Professional differentiation and value proposition",
        popularity: 83,
      },
      // Business interests starters
      {
        id: "bs6",
        text: language === "pt"
          ? `Interessante veres ${profile.businessInterests[0]} como área de interesse. Já colaboraste com empresas portuguesas nesta área?`
          : `Interesting to see ${profile.businessInterests[0]} as an area of interest. Have you collaborated with Portuguese companies in this field?`,
        category: language === "pt" ? "Interesses Comerciais" : "Business Interests",
        culturalContext: language === "pt" ? "Conexões comerciais Portugal-Reino Unido" : "Portugal-UK business connections",
        businessRelevance: language === "pt" ? "Oportunidades de colaboração e parcerias" : "Collaboration and partnership opportunities",
        popularity: 78,
      },
      // Entrepreneurship starters
      {
        id: "bs7",
        text: language === "pt"
          ? "Já pensaste em empreender ou tens algum projeto secundário? A comunidade portuguesa tem muito potencial empresarial!"
          : "Have you thought about entrepreneurship or have any side projects? The Portuguese community has so much business potential!",
        category: language === "pt" ? "Empreendedorismo" : "Entrepreneurship",
        culturalContext: language === "pt" ? "Espírito empreendedor da comunidade portuguesa" : "Entrepreneurial spirit of Portuguese community",
        businessRelevance: language === "pt" ? "Inovação e criação de negócios" : "Innovation and business creation",
        popularity: 91,
      },
      // Market expansion starters
      {
        id: "bs8",
        text: language === "pt"
          ? "Se pudesses expandir o teu negócio/empresa para Portugal, que estratégia usarias?"
          : "If you could expand your business/company to Portugal, what strategy would you use?",
        category: language === "pt" ? "Expansão de Mercado" : "Market Expansion",
        culturalContext: language === "pt" ? "Conhecimento dos mercados português e britânico" : "Knowledge of Portuguese and British markets",
        businessRelevance: language === "pt" ? "Estratégia de internacionalização" : "Internationalization strategy",
        popularity: 85,
      },
      // Skills and expertise starters
      {
        id: "bs9",
        text: language === "pt"
          ? "Que competências desenvolveste em Londres que não terias desenvolvido em Portugal?"
          : "What skills have you developed in London that you wouldn't have developed in Portugal?",
        category: language === "pt" ? "Desenvolvimento de Competências" : "Skill Development",
        culturalContext: language === "pt" ? "Crescimento profissional no contexto internacional" : "Professional growth in international context",
        businessRelevance: language === "pt" ? "Desenvolvimento pessoal e profissional" : "Personal and professional development",
        popularity: 88,
      },
      // Remote work and flexibility starters
      {
        id: "bs10",
        text: language === "pt"
          ? "Como vês o futuro do trabalho remoto para profissionais portugueses que querem manter ligações com Portugal?"
          : "How do you see the future of remote work for Portuguese professionals who want to maintain connections with Portugal?",
        category: language === "pt" ? "Trabalho Remoto" : "Remote Work",
        culturalContext: language === "pt" ? "Flexibilidade para manter conexões com Portugal" : "Flexibility to maintain connections with Portugal",
        businessRelevance: language === "pt" ? "Modelos de trabalho híbrido e global" : "Hybrid and global work models",
        popularity: 82,
      },
      // Portuguese community business networking
      {
        id: "bs11",
        text: language === "pt"
          ? "Participas em alguma associação ou rede profissional portuguesa em Londres?"
          : "Do you participate in any Portuguese professional association or network in London?",
        category: language === "pt" ? "Redes Profissionais" : "Professional Networks",
        culturalContext: language === "pt" ? "Engagement com organizações da comunidade portuguesa" : "Engagement with Portuguese community organizations",
        businessRelevance: language === "pt" ? "Networking estruturado e desenvolvimento profissional" : "Structured networking and professional development",
        popularity: 79,
      },
      // Innovation and technology
      {
        id: "bs12",
        text: language === "pt"
          ? "Que tecnologias ou inovações achas que Portugal poderia exportar para o Reino Unido?"
          : "What technologies or innovations do you think Portugal could export to the UK?",
        category: language === "pt" ? "Inovação e Tecnologia" : "Innovation & Technology",
        culturalContext: language === "pt" ? "Potencial tecnológico e inovador de Portugal" : "Portugal's technological and innovation potential",
        businessRelevance: language === "pt" ? "Oportunidades de transferência tecnológica" : "Technology transfer opportunities",
        popularity: 86,
      },
    ];

    return businessStarters;
  };

  const allStarters = [...profile.conversationStarters, ...generateBusinessConversationStarters()];

  const filteredStarters = allStarters.filter(starter => {
    switch (selectedCategory) {
      case 'business':
        return starter.category.includes('Negócio') || 
               starter.category.includes('Business') ||
               starter.category.includes('Setor') ||
               starter.category.includes('Industry') ||
               starter.category.includes('Empresa') ||
               starter.category.includes('Company');
      case 'cultural':
        return starter.category.includes('Cultural') ||
               starter.category.includes('Vantagens') ||
               starter.category.includes('Advantages');
      case 'mentorship':
        return starter.category.includes('Mentoria') ||
               starter.category.includes('Mentorship') ||
               starter.category.includes('Desenvolvimento') ||
               starter.category.includes('Development');
      case 'networking':
        return starter.category.includes('Networking') ||
               starter.category.includes('Objetivos') ||
               starter.category.includes('Goals') ||
               starter.category.includes('Redes') ||
               starter.category.includes('Networks');
      default:
        return true;
    }
  });

  const categories = [
    {
      id: 'all' as const,
      label: language === "pt" ? "Todos" : "All",
      icon: SparklesIcon,
      count: allStarters.length,
    },
    {
      id: 'business' as const,
      label: language === "pt" ? "Negócios" : "Business",
      icon: BriefcaseIcon,
      count: allStarters.filter(s => s.category.includes('Negócio') || s.category.includes('Business') || s.category.includes('Industry') || s.category.includes('Company')).length,
    },
    {
      id: 'cultural' as const,
      label: language === "pt" ? "Cultural" : "Cultural",
      icon: GlobeAltIcon,
      count: allStarters.filter(s => s.category.includes('Cultural') || s.category.includes('Vantagens') || s.category.includes('Advantages')).length,
    },
    {
      id: 'mentorship' as const,
      label: language === "pt" ? "Mentoria" : "Mentorship",
      icon: AcademicCapIcon,
      count: allStarters.filter(s => s.category.includes('Mentoria') || s.category.includes('Mentorship') || s.category.includes('Development')).length,
    },
    {
      id: 'networking' as const,
      label: language === "pt" ? "Networking" : "Networking",
      icon: UserGroupIcon,
      count: allStarters.filter(s => s.category.includes('Networking') || s.category.includes('Goals') || s.category.includes('Networks')).length,
    },
  ];

  const getPopularityColor = (popularity: number) => {
    if (popularity >= 90) return "text-green-600 bg-green-50";
    if (popularity >= 80) return "text-blue-600 bg-blue-50";
    if (popularity >= 70) return "text-yellow-600 bg-yellow-50";
    return "text-gray-600 bg-gray-50";
  };

  const getPopularityIcon = (popularity: number) => {
    if (popularity >= 90) return "🔥";
    if (popularity >= 80) return "⭐";
    if (popularity >= 70) return "👍";
    return "💡";
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-primary-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 border-b border-primary-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl">
            <ChatBubbleLeftRightIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary-900">
              {language === "pt" ? "Conversa de Negócios" : "Business Conversation"}
            </h3>
            <p className="text-sm text-primary-600">
              {language === "pt" ? "Inicie conexões profissionais autênticas" : "Start authentic professional connections"}
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-primary-600 text-white shadow-lg"
                    : "bg-white text-primary-600 hover:bg-primary-100 border border-primary-200"
                }`}
              >
                <Icon className="w-3 h-3" />
                {category.label}
                <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                  selectedCategory === category.id
                    ? "bg-white/20 text-white"
                    : "bg-primary-100 text-primary-700"
                }`}>
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Business Conversation Starters */}
      <div className="p-6">
        <div className="space-y-4 max-h-80 overflow-y-auto">
          <AnimatePresence mode="wait">
            {filteredStarters.length > 0 ? (
              filteredStarters.map((starter, index) => (
                <motion.div
                  key={starter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`border rounded-xl p-4 transition-all duration-300 cursor-pointer ${
                    selectedStarter === starter.id
                      ? "border-primary-300 bg-primary-25 shadow-lg"
                      : "border-primary-200 hover:border-primary-300 hover:bg-primary-25"
                  }`}
                  onClick={() => setSelectedStarter(selectedStarter === starter.id ? null : starter.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-sm text-primary-800 leading-relaxed flex-1 font-medium">
                      "{starter.text}"
                    </p>
                    <div className={`flex items-center gap-1 ml-3 px-2 py-1 rounded-lg ${getPopularityColor(starter.popularity)}`}>
                      <span className="text-xs">{getPopularityIcon(starter.popularity)}</span>
                      <span className="text-xs font-bold">{starter.popularity}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-lg font-medium">
                        {starter.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <GlobeAltIcon className="w-3 h-3 text-primary-500" />
                        <span className="text-xs text-primary-600 font-medium">
                          {language === "pt" ? "Contexto PT" : "PT Context"}
                        </span>
                      </div>
                    </div>
                    
                    {selectedStarter === starter.id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onStartConversation(starter.id);
                        }}
                        className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all"
                      >
                        {language === "pt" ? "Usar Esta" : "Use This"}
                      </button>
                    )}
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {selectedStarter === starter.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden mt-3 pt-3 border-t border-primary-200"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <div className="w-4 h-4 bg-accent-100 rounded-full flex items-center justify-center mt-0.5">
                              <GlobeAltIcon className="w-2.5 h-2.5 text-accent-600" />
                            </div>
                            <div>
                              <h5 className="text-xs font-bold text-accent-800">
                                {language === "pt" ? "Contexto Cultural:" : "Cultural Context:"}
                              </h5>
                              <p className="text-xs text-accent-700">{starter.culturalContext}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <div className="w-4 h-4 bg-secondary-100 rounded-full flex items-center justify-center mt-0.5">
                              <BriefcaseIcon className="w-2.5 h-2.5 text-secondary-600" />
                            </div>
                            <div>
                              <h5 className="text-xs font-bold text-secondary-800">
                                {language === "pt" ? "Relevância Profissional:" : "Business Relevance:"}
                              </h5>
                              <p className="text-xs text-secondary-700">{starter.businessRelevance}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChatBubbleLeftRightIcon className="w-8 h-8 text-primary-600" />
                </div>
                <h4 className="font-semibold text-primary-900 mb-2">
                  {language === "pt" ? "Nenhuma conversa encontrada" : "No conversations found"}
                </h4>
                <p className="text-primary-600 text-sm">
                  {language === "pt"
                    ? "Tente selecionar uma categoria diferente."
                    : "Try selecting a different category."}
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Business Networking Tips */}
        <div className="mt-6 bg-gradient-to-r from-accent-50 to-coral-50 rounded-xl p-4 border border-accent-200">
          <div className="flex items-center gap-2 mb-3">
            <LightBulbIcon className="w-4 h-4 text-accent-600" />
            <h4 className="font-bold text-accent-900 text-sm">
              {language === "pt" ? "Dicas de Networking Português" : "Portuguese Networking Tips"}
            </h4>
          </div>
          <div className="space-y-2 text-xs text-accent-800">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-3 h-3 text-green-500" />
              <span>
                {language === "pt" 
                  ? "Mencione experiências ou desafios específicos de portugueses em Londres"
                  : "Mention specific experiences or challenges of Portuguese in London"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ScaleIcon className="w-3 h-3 text-blue-500" />
              <span>
                {language === "pt"
                  ? "Procure oportunidades de colaboração e apoio mútuo"
                  : "Look for collaboration opportunities and mutual support"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowTrendingUpIcon className="w-3 h-3 text-purple-500" />
              <span>
                {language === "pt"
                  ? "Partilhe insights sobre mercados português e britânico"
                  : "Share insights about Portuguese and British markets"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}