"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  Heart,
  MessageCircle,
  Calendar,
  Sparkles,
  X,
  Zap,
  Users,
  Clock,
  Star,
} from "lucide-react";
import { plans, formatPrice } from "@/config/pricing";

export interface UpgradePromptProps {
  trigger:
    | "matches_limit"
    | "messages_limit"
    | "after_match"
    | "premium_event"
    | "general";
  isVisible: boolean;
  onClose: () => void;
  onUpgrade?: (tier: "community" | "ambassador") => void;
  remainingCount?: number;
  contextData?: any;
}

export default function UpgradePrompts({
  trigger,
  isVisible,
  onClose,
  onUpgrade,
  remainingCount = 0,
  contextData,
}: UpgradePromptProps) {
  const { language } = useLanguage();
  const { createSubscription, trackFeatureUsage } = useSubscription();
  const [isProcessing, setIsProcessing] = useState(false);

  const trackConversionEvent = useCallback(
    async (event: string, trigger: string) => {
      try {
        await fetch("/api/analytics/conversion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event,
            trigger,
            language,
            timestamp: new Date().toISOString(),
            contextData,
          }),
        });
      } catch (error) {
        console.error("Analytics tracking error:", error);
      }
    },
    [language, contextData]
  );

  // Track conversion events
  useEffect(() => {
    if (isVisible) {
      // Analytics tracking for prompt shown
      trackConversionEvent("upgrade_prompt_shown", trigger);
    }
  }, [isVisible, trigger, trackConversionEvent]);

  const handleUpgrade = async (tier: "community" | "ambassador") => {
    setIsProcessing(true);
    try {
      await trackConversionEvent("upgrade_clicked", `${trigger}_${tier}`);

      if (onUpgrade) {
        onUpgrade(tier);
      } else {
        await createSubscription(tier);
      }
    } catch (error) {
      console.error("Upgrade error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getPromptContent = () => {
    const contents = {
      matches_limit: {
        en: {
          title: "Daily Match Limit Reached",
          subtitle: "Continue connecting with Portuguese speakers",
          description: `You've used your 3 daily matches. Upgrade to get unlimited matches and connect with more Portuguese community members in London.`,
          icon: Heart,
          color: "coral",
          urgency: "high",
        },
        pt: {
          title: "Limite Diário de Matches Atingido",
          subtitle: "Continue a conectar com falantes de português",
          description: `Usou os seus 3 matches diários. Faça upgrade para matches ilimitados e conecte-se com mais membros da comunidade portuguesa em Londres.`,
          icon: Heart,
          color: "coral",
          urgency: "high",
        },
      },
      messages_limit: {
        en: {
          title: "Monthly Message Limit Reached",
          subtitle: "Keep the conversation flowing",
          description: `You've sent ${remainingCount}/10 monthly messages. Upgrade for unlimited messaging with Portuguese community members.`,
          icon: MessageCircle,
          color: "primary",
          urgency: "medium",
        },
        pt: {
          title: "Limite Mensal de Mensagens Atingido",
          subtitle: "Mantenha a conversa a fluir",
          description: `Enviou ${remainingCount}/10 mensagens mensais. Faça upgrade para mensagens ilimitadas com membros da comunidade portuguesa.`,
          icon: MessageCircle,
          color: "primary",
          urgency: "medium",
        },
      },
      after_match: {
        en: {
          title: "Great Match!",
          subtitle: "Get unlimited matches with Premium",
          description:
            "You found a connection! With Premium, discover unlimited matches and access exclusive Portuguese community events.",
          icon: Sparkles,
          color: "secondary",
          urgency: "low",
        },
        pt: {
          title: "Ótimo Match!",
          subtitle: "Obtenha matches ilimitados com Premium",
          description:
            "Encontrou uma conexão! Com Premium, descubra matches ilimitados e acesse eventos exclusivos da comunidade portuguesa.",
          icon: Sparkles,
          color: "secondary",
          urgency: "low",
        },
      },
      premium_event: {
        en: {
          title: "Premium Event Access",
          subtitle: "Join exclusive Portuguese cultural events",
          description:
            "This event is for Premium members only. Upgrade to access cultural workshops, business networking, and community gatherings.",
          icon: Calendar,
          color: "premium",
          urgency: "medium",
        },
        pt: {
          title: "Acesso a Eventos Premium",
          subtitle: "Participe em eventos culturais portugueses exclusivos",
          description:
            "Este evento é só para membros Premium. Faça upgrade para aceder a workshops culturais, networking empresarial e encontros comunitários.",
          icon: Calendar,
          color: "premium",
          urgency: "medium",
        },
      },
      general: {
        en: {
          title: "Unlock Premium Features",
          subtitle: "Join the Portuguese community in London",
          description:
            "Discover unlimited matches, exclusive events, and connect with Portuguese speakers across London.",
          icon: Crown,
          color: "primary",
          urgency: "low",
        },
        pt: {
          title: "Desbloqueie Funcionalidades Premium",
          subtitle: "Junte-se à comunidade portuguesa em Londres",
          description:
            "Descubra matches ilimitados, eventos exclusivos e conecte-se com falantes de português em Londres.",
          icon: Crown,
          color: "primary",
          urgency: "low",
        },
      },
    };

    return contents[trigger][language];
  };

  const content = getPromptContent();
  const IconComponent = content.icon;

  const pricingOptions = {
    en: {
      community: {
        name: "Community Member",
        price: formatPrice(plans.community.monthly),
        period: "/month",
        yearlyPrice: `${formatPrice(199)}/year`,
        savings: "Save 17%",
        features: [
          "Unlimited matches & messaging",
          "Access to Portuguese cultural events",
          "Cultural compatibility filters",
          "Profile verification badge",
        ],
      },
      ambassador: {
        name: "Cultural Ambassador",
        price: formatPrice(plans.ambassador.monthly),
        period: "/month",
        yearlyPrice: `${formatPrice(399)}/year`,
        savings: "Save 17%",
        features: [
          "All Community features",
          "Priority profile visibility",
          "Event hosting privileges",
          "Direct community support",
          "Unlimited livestream hours",
        ],
      },
      trial: "Start 7-Day Free Trial",
      upgrade: "Upgrade Now",
    },
    pt: {
      community: {
        name: "Membro da Comunidade",
        price: formatPrice(plans.community.monthly),
        period: "/mês",
        yearlyPrice: `${formatPrice(199)}/ano`,
        savings: "Poupe 17%",
        features: [
          "Matches e mensagens ilimitados",
          "Acesso a eventos culturais portugueses",
          "Filtros de compatibilidade cultural",
          "Distintivo de perfil verificado",
        ],
      },
      ambassador: {
        name: "Embaixador Cultural",
        price: formatPrice(plans.ambassador.monthly),
        period: "/mês",
        yearlyPrice: `${formatPrice(399)}/ano`,
        savings: "Poupe 17%",
        features: [
          "Todas as funcionalidades da Comunidade",
          "Visibilidade prioritária do perfil",
          "Privilégios de organização de eventos",
          "Suporte direto da comunidade",
          "Horas de transmissão ilimitadas",
        ],
      },
      trial: "Iniciar Teste Gratuito de 7 Dias",
      upgrade: "Fazer Upgrade Agora",
    },
  };

  const pricing = pricingOptions[language];

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
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className={`relative bg-gradient-to-br from-${content.color}-500 to-${content.color}-600 text-white p-6 rounded-t-2xl`}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/20 rounded-full">
                <IconComponent className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{content.title}</h2>
                <p className="text-white/80">{content.subtitle}</p>
              </div>
            </div>

            <p className="text-white/90">{content.description}</p>

            {/* Urgency indicator */}
            {content.urgency === "high" && (
              <div className="mt-4 flex items-center gap-2 text-orange-200">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {language === "pt"
                    ? "Recarrega à meia-noite"
                    : "Resets at midnight"}
                </span>
              </div>
            )}
          </div>

          {/* Pricing Options */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Community Tier */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative bg-gradient-to-br from-primary-50 to-white rounded-xl border-2 border-primary-200 p-6 hover:border-primary-300 transition-colors"
              >
                <div className="absolute -top-3 left-4">
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {language === "pt" ? "Mais Popular" : "Most Popular"}
                  </span>
                </div>

                <div className="text-center mb-4">
                  <Star className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">
                    {pricing.community.name}
                  </h3>
                  <div className="text-3xl font-bold text-primary-600">
                    {pricing.community.price}
                    <span className="text-lg font-normal text-neutral-600">
                      {pricing.community.period}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 mt-1">
                    {pricing.community.yearlyPrice} •{" "}
                    {pricing.community.savings}
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {pricing.community.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-sm text-neutral-700">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleUpgrade("community")}
                  disabled={isProcessing}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  )}
                  {pricing.trial}
                </button>
              </motion.div>

              {/* Ambassador Tier */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-secondary-50 to-white rounded-xl border-2 border-secondary-200 p-6 hover:border-secondary-300 transition-colors"
              >
                <div className="text-center mb-4">
                  <Crown className="h-8 w-8 text-secondary-600 mx-auto mb-2" />
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">
                    {pricing.ambassador.name}
                  </h3>
                  <div className="text-3xl font-bold text-secondary-600">
                    {pricing.ambassador.price}
                    <span className="text-lg font-normal text-neutral-600">
                      {pricing.ambassador.period}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 mt-1">
                    {pricing.ambassador.yearlyPrice} •{" "}
                    {pricing.ambassador.savings}
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {pricing.ambassador.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                      <span className="text-sm text-neutral-700">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleUpgrade("ambassador")}
                  disabled={isProcessing}
                  className="w-full bg-secondary-600 hover:bg-secondary-700 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  )}
                  {pricing.upgrade}
                </button>
              </motion.div>
            </div>

            {/* Portuguese Community Value Proposition */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 bg-gradient-to-r from-coral-50 to-primary-50 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <Users className="h-6 w-6 text-coral-600" />
                <h4 className="text-lg font-semibold text-neutral-900">
                  {language === "pt"
                    ? "Junte-se à Comunidade Portuguesa em Londres"
                    : "Join the Portuguese Community in London"}
                </h4>
              </div>
              <p className="text-neutral-700 mb-4">
                {language === "pt"
                  ? "Conecte-se com milhares de falantes de português, participe em eventos culturais autênticos e construa relacionamentos duradouros na capital britânica."
                  : "Connect with thousands of Portuguese speakers, join authentic cultural events, and build lasting relationships in the British capital."}
              </p>
              <div className="flex items-center gap-4 text-sm text-neutral-600">
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4 text-coral-500" />
                  {language === "pt"
                    ? "2,500+ membros ativos"
                    : "2,500+ active members"}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-coral-500" />
                  {language === "pt"
                    ? "50+ eventos mensais"
                    : "50+ monthly events"}
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4 text-coral-500" />
                  {language === "pt"
                    ? "Foco cultural português"
                    : "Portuguese cultural focus"}
                </div>
              </div>
            </motion.div>

            {/* Close button */}
            <div className="mt-6 text-center">
              <button
                onClick={onClose}
                className="text-neutral-600 hover:text-neutral-900 font-medium px-4 py-2 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                {language === "pt"
                  ? "Continuar com conta gratuita"
                  : "Continue with free account"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Hook for easy integration
export function useUpgradePrompt() {
  const [activePrompt, setActivePrompt] = useState<{
    trigger: UpgradePromptProps["trigger"];
    remainingCount?: number;
    contextData?: any;
  } | null>(null);

  const showPrompt = (
    trigger: UpgradePromptProps["trigger"],
    remainingCount?: number,
    contextData?: any
  ) => {
    setActivePrompt({ trigger, remainingCount, contextData });
  };

  const hidePrompt = () => {
    setActivePrompt(null);
  };

  return {
    activePrompt,
    showPrompt,
    hidePrompt,
    isVisible: activePrompt !== null,
  };
}
