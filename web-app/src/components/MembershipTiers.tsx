"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  HeartIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  StarIcon,
  SparklesIcon,
  UsersIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";
import { Crown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { plans, formatPrice } from "@/config/pricing";

interface MembershipTiersProps {
  showCurrentTier?: boolean;
  allowUpgrade?: boolean;
  compact?: boolean;
  showAnnualDiscount?: boolean;
  userSegment?: string;
  promoCode?: string;
}

// New 3-Tier Pricing Structure - Matches recent agreement
const membershipTiers = [
  {
    id: "free",
    name: "Grátis",
    nameEn: "Free",
    price: 0,
    monthlyPrice: 0,
    description: "Comece a explorar a comunidade portuguesa",
    descriptionEn: "Start exploring the Portuguese community",
    icon: <HeartIcon className="w-6 h-6" />,
    solidIcon: <HeartIconSolid className="w-6 h-6" />,
    color: "gray",
    features: [
      "3 matches por dia",
      "10 mensagens por mês",
      "Perfil básico",
      "Pesquisa limitada",
    ],
    featuresEn: [
      "3 matches per day",
      "10 messages per month",
      "Basic profile",
      "Limited search",
    ],
    limitations: [
      "Matches limitados",
      "Mensagens limitadas",
      "Sem acesso a eventos premium",
    ],
    limitationsEn: [
      "Limited matches",
      "Limited messages",
      "No premium events access",
    ],
    buttonText: "Começar Grátis",
    buttonTextEn: "Start Free",
    highlighted: false,
  },
  {
    id: "community",
    name: "Membro da Comunidade",
    nameEn: "Community Member",
    price: plans.community.monthly,
    monthlyPrice: plans.community.monthly,
    description: "Acesso completo à comunidade portuguesa",
    descriptionEn: "Full access to Portuguese community",
    icon: <UsersIcon className="w-6 h-6" />,
    solidIcon: <StarIconSolid className="w-6 h-6" />,
    color: "primary",
    features: [
      "Matches ilimitados",
      "Mensagens ilimitadas",
      "Acesso a todos os eventos",
      "Perfil completo",
      "Pesquisa avançada",
      "Networking profissional",
    ],
    featuresEn: [
      "Unlimited matches",
      "Unlimited messaging",
      "Access to all events",
      "Complete profile",
      "Advanced search",
      "Professional networking",
    ],
    limitations: [],
    limitationsEn: [],
    buttonText: "Juntar-se à Comunidade",
    buttonTextEn: "Join Community",
    highlighted: true,
    badge: "Popular",
    badgeEn: "Popular",
  },
  {
    id: "ambassador",
    name: "Embaixador Cultural",
    nameEn: "Cultural Ambassador",
    price: plans.ambassador.monthly,
    monthlyPrice: plans.ambassador.monthly,
    description: "Lidere a comunidade portuguesa em Londres",
    descriptionEn: "Lead the Portuguese community in London",
    icon: <Crown className="w-6 h-6" />,
    solidIcon: <TrophyIcon className="w-6 h-6" />,
    color: "premium",
    features: [
      "Tudo do Membro da Comunidade",
      "Visibilidade prioritária nos matches",
      "Organizador de eventos",
      "Perfil destacado",
      "Acesso VIP a eventos",
      "Mentoria comunitária",
      "Suporte prioritário",
    ],
    featuresEn: [
      "Everything in Community Member",
      "Priority visibility in matches",
      "Event hosting capabilities",
      "Featured profile",
      "VIP events access",
      "Community mentorship",
      "Priority support",
    ],
    limitations: [],
    limitationsEn: [],
    buttonText: "Tornar-se Embaixador",
    buttonTextEn: "Become Ambassador",
    highlighted: false,
    badge: "Premium",
    badgeEn: "Premium",
  },
];

export default function MembershipTiers({
  showCurrentTier = true,
  allowUpgrade = true,
  compact = false,
  showAnnualDiscount = true,
  userSegment,
  promoCode,
}: MembershipTiersProps) {
  const { language } = useLanguage();
  const { membershipTier, createSubscription } = useSubscription();
  const [isCreating, setIsCreating] = useState<string | null>(null);

  const isPortuguese = language === "pt";

  const handleSubscribe = async (tierId: string) => {
    setIsCreating(tierId);
    try {
      await createSubscription(
        tierId === "community" ? "community" : "ambassador"
      );
    } catch (error) {
      console.error("Error creating subscription:", error);
    } finally {
      setIsCreating(null);
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      gray: {
        border: "border-gray-200",
        bg: "bg-gray-50",
        iconBg: "bg-gray-100",
        iconText: "text-gray-600",
        button: "bg-gray-500 hover:bg-gray-600 text-white",
        badge: "bg-gray-100 text-gray-800",
      },
      primary: {
        border: "border-primary-300",
        bg: "bg-primary-50",
        iconBg: "bg-primary-100",
        iconText: "text-primary-600",
        button: "bg-primary-500 hover:bg-primary-600 text-white",
        badge: "bg-primary-100 text-primary-800",
      },
      premium: {
        border: "border-premium-300",
        bg: "bg-premium-50",
        iconBg: "bg-premium-100",
        iconText: "text-premium-600",
        button: "bg-premium-500 hover:bg-premium-600 text-white",
        badge: "bg-premium-100 text-premium-800",
      },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  return (
    <section className="py-12">
      <div className="container-width">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-primary-600 mb-6">
            <HeartIconSolid className="w-4 h-4 mr-2" />
            {isPortuguese
              ? "Unidos pela Língua • Encontre a sua comunidade"
              : "United by Language • Find Your Community"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {isPortuguese ? "Planos de Adesão" : "Membership Plans"}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            {isPortuguese
              ? "Escolha o plano ideal para se conectar com a comunidade portuguesa de Londres."
              : "Choose the perfect plan to connect with London's Portuguese community."}
          </p>
        </motion.div>

        {/* Current Tier Display */}
        {showCurrentTier && membershipTier !== "basic" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-800">
              <span className="text-sm font-medium">
                {isPortuguese ? "Membro Atual" : "Current Member"}
              </span>
            </div>
          </motion.div>
        )}

        {/* Membership Tiers Grid */}
        <div
          className={`grid gap-8 ${
            compact
              ? "md:grid-cols-2 lg:grid-cols-3"
              : "md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {membershipTiers.map((tier, index) => {
            const colors = getColorClasses(tier.color);
            const isCurrentTier = false; // Placeholder for current tier logic
            const isProcessing = isCreating === tier.id;
            const isHighlighted = tier.highlighted;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg border-2 ${
                  isHighlighted
                    ? "border-primary-400 ring-4 ring-primary-100 scale-105"
                    : colors.border
                } overflow-hidden ${compact ? "p-4" : "p-6"}`}
              >
                {/* Badge */}
                {tier.badge && (
                  <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    {isPortuguese ? tier.badge : tier.badgeEn}
                  </div>
                )}

                {/* Current Tier Badge */}
                {isCurrentTier && (
                  <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                    {isPortuguese ? "Atual" : "Current"}
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-16 h-16 ${colors.iconBg} rounded-2xl flex items-center justify-center mb-6 mx-auto`}
                >
                  {tier.solidIcon}
                </div>

                {/* Tier Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                  {isPortuguese ? tier.name : tier.nameEn}
                </h3>

                {/* Price */}
                <div className="mb-6 text-center">
                  {tier.price === 0 ? (
                    <div className="text-4xl font-bold text-gray-900">
                      {isPortuguese ? "Grátis" : "Free"}
                    </div>
                  ) : (
                    <>
                      <div className="text-4xl font-bold text-gray-900">
                        £{tier.price}
                      </div>
                      <div className="text-sm text-gray-500">
                        {isPortuguese ? "por mês" : "per month"}
                      </div>
                    </>
                  )}
                </div>

                {/* Description */}
                <p
                  className={`text-gray-600 mb-6 text-center ${
                    compact ? "text-sm" : ""
                  }`}
                >
                  {isPortuguese ? tier.description : tier.descriptionEn}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {(isPortuguese ? tier.features : tier.featuresEn).map(
                    (feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start gap-3"
                      >
                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span
                          className={`text-gray-700 ${
                            compact ? "text-sm" : ""
                          }`}
                        >
                          {feature}
                        </span>
                      </div>
                    )
                  )}
                </div>

                {/* Action Button */}
                <div className="space-y-2">
                  {isCurrentTier ? (
                    <div className="w-full py-3 px-4 bg-green-100 text-green-700 rounded-lg text-center font-medium">
                      {isPortuguese ? "Plano Atual" : "Current Plan"}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleSubscribe(tier.id)}
                      disabled={isProcessing}
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                        colors.button
                      } ${
                        isHighlighted
                          ? "shadow-xl hover:shadow-2xl"
                          : "shadow-lg hover:shadow-xl"
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {isPortuguese ? "Processando..." : "Processing..."}
                        </>
                      ) : (
                        <>
                          {isPortuguese ? tier.buttonText : tier.buttonTextEn}
                          <ArrowRightIcon className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {isPortuguese ? "Porquê LusoTown?" : "Why LusoTown?"}
            </h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeartIcon className="w-6 h-6 text-primary-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {isPortuguese
                    ? "Comunidade Autêntica"
                    : "Authentic Community"}
                </h4>
                <p className="text-sm text-gray-600">
                  {isPortuguese
                    ? "Conecte-se com portugueses reais em Londres"
                    : "Connect with real Portuguese speakers in London"}
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon className="w-6 h-6 text-secondary-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {isPortuguese ? "Perfis Verificados" : "Verified Profiles"}
                </h4>
                <p className="text-sm text-gray-600">
                  {isPortuguese
                    ? "Todos os membros são verificados para segurança"
                    : "All members are verified for safety"}
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SparklesIcon className="w-6 h-6 text-accent-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {isPortuguese ? "Eventos Culturais" : "Cultural Events"}
                </h4>
                <p className="text-sm text-gray-600">
                  {isPortuguese
                    ? "Participe em eventos e atividades portuguesas"
                    : "Join Portuguese events and activities"}
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                {isPortuguese
                  ? "Junte-se a 750+ portugueses que já encontraram a sua comunidade"
                  : "Join 750+ Portuguese speakers who found their community"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
