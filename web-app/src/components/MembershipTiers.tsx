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
  MapPinIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";
import { Crown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { SUBSCRIPTION_PLANS, PORTUGUESE_PREMIUM_BENEFITS, CULTURAL_VALUE_PROPOSITIONS, formatPrice } from "@/config/pricing";
import { communityStats } from "@/config/community";

interface MembershipTiersProps {
  showCurrentTier?: boolean;
  allowUpgrade?: boolean;
  compact?: boolean;
  showAnnualDiscount?: boolean;
  userSegment?: string;
  promoCode?: string;
}

// Portuguese-speaking community Optimized Membership Tiers
const membershipTiers = [
  {
    id: "free",
    name: SUBSCRIPTION_PLANS.free.labelPt,
    nameEn: SUBSCRIPTION_PLANS.free.labelEn,
    price: SUBSCRIPTION_PLANS.free.monthly,
    monthlyPrice: SUBSCRIPTION_PLANS.free.monthly,
    description: SUBSCRIPTION_PLANS.free.culturalValuePt,
    descriptionEn: SUBSCRIPTION_PLANS.free.culturalValueEn,
    icon: <HeartIcon className="w-6 h-6" />,
    solidIcon: <HeartIconSolid className="w-6 h-6" />,
    color: "gray",
    features: [
      "2 matches por dia",
      "3 mensagens por mês",
      "Perfil básico",
      "2 eventos culturais por mês",
      "Acesso limitado ao diretório",
    ],
    featuresEn: [
      "2 matches per day",
      "3 messages per month",
      "Basic profile",
      "2 cultural events per month",
      "Limited directory access",
    ],
    limitations: [
      "Sem descontos em restaurantes portugueses",
      "Sem acesso a eventos premium",
      "Sem planos familiares",
      "Sem concierge pessoal",
    ],
    limitationsEn: [
      "No Portuguese restaurant discounts",
      "No premium events access",
      "No family plans",
      "No personal concierge",
    ],
    buttonText: "Começar Grátis",
    buttonTextEn: "Start Free",
    highlighted: false,
  },
  {
    id: "community",
    name: SUBSCRIPTION_PLANS.community.labelPt,
    nameEn: SUBSCRIPTION_PLANS.community.labelEn,
    price: SUBSCRIPTION_PLANS.community.monthly,
    monthlyPrice: SUBSCRIPTION_PLANS.community.monthly,
    description: SUBSCRIPTION_PLANS.community.culturalValuePt,
    descriptionEn: SUBSCRIPTION_PLANS.community.culturalValueEn,
    icon: <UsersIcon className="w-6 h-6" />,
    solidIcon: <StarIconSolid className="w-6 h-6" />,
    color: "primary",
    features: [
      "Matches ilimitados",
      "Mensagens ilimitadas",
      "Eventos culturais ilimitados",
      "10% desconto em restaurantes portugueses",
      "Acesso prioritário às Noites de Fado",
      "Newsletter cultural mensal",
      "Suporte para até 4 familiares",
      "Recursos de aprendizagem portuguesa",
    ],
    featuresEn: [
      "Unlimited matches",
      "Unlimited messaging",  
      "Unlimited cultural events",
      "10% discount at Portuguese restaurants",
      "Priority access to Fado Nights",
      "Monthly cultural newsletter",
      "Support for up to 4 family members",
      "Portuguese learning resources",
    ],
    culturalBenefits: [
      PORTUGUESE_PREMIUM_BENEFITS.cultural.fadoNightsAccess,
      PORTUGUESE_PREMIUM_BENEFITS.cultural.portugueseRestaurantNetwork,
      PORTUGUESE_PREMIUM_BENEFITS.business.businessDiscountNetwork,
    ],
    limitations: [],
    limitationsEn: [],
    buttonText: "Juntar-se à Comunidade",
    buttonTextEn: "Join Community",
    highlighted: true,
    badge: "Popular",
    badgeEn: "Most Popular",
    savings: "2 meses grátis anualmente",
    savingsEn: "2 months free annually",
  },
  {
    id: "ambassador",
    name: SUBSCRIPTION_PLANS.ambassador.labelPt,
    nameEn: SUBSCRIPTION_PLANS.ambassador.labelEn,
    price: SUBSCRIPTION_PLANS.ambassador.monthly,
    monthlyPrice: SUBSCRIPTION_PLANS.ambassador.monthly,
    description: SUBSCRIPTION_PLANS.ambassador.culturalValuePt,
    descriptionEn: SUBSCRIPTION_PLANS.ambassador.culturalValueEn,
    icon: <Crown className="w-6 h-6" />,
    solidIcon: <TrophyIcon className="w-6 h-6" />,
    color: "premium",
    features: [
      "Tudo do Membro da Comunidade",
      "20% desconto em empresas portuguesas",
      "Acesso VIP a Santos Populares",
      "Entrega mensal de vinhos portugueses",
      "Concierge cultural pessoal",
      "Eventos exclusivos de networking",
      "Badge de embaixador cultural",
      "Projetos de preservação cultural",
    ],
    featuresEn: [
      "Everything in Community Member",
      "20% discount at Portuguese businesses",
      "VIP access to Santos Populares",
      "Monthly Portuguese wine delivery", 
      "Personal cultural concierge",
      "Exclusive networking events",
      "Cultural ambassador badge",
      "Cultural preservation projects",
    ],
    culturalBenefits: [
      PORTUGUESE_PREMIUM_BENEFITS.cultural.culturalFestivalPriority,
      PORTUGUESE_PREMIUM_BENEFITS.cultural.monthlyPortugueseWineBox,
      PORTUGUESE_PREMIUM_BENEFITS.business.portugueseNetworking,
    ],
    limitations: [],
    limitationsEn: [],
    buttonText: "Tornar-se Embaixador",
    buttonTextEn: "Become Ambassador",
    highlighted: false,
    badge: "Premium",
    badgeEn: "Premium",
    savings: "£120 de valor em benefícios/mês",
    savingsEn: "£120 value in benefits/month",
  },
  {
    id: "familia",
    name: SUBSCRIPTION_PLANS.familia.labelPt,
    nameEn: SUBSCRIPTION_PLANS.familia.labelEn,
    price: SUBSCRIPTION_PLANS.familia.monthly,
    monthlyPrice: SUBSCRIPTION_PLANS.familia.monthly,
    description: SUBSCRIPTION_PLANS.familia.culturalValuePt,
    descriptionEn: SUBSCRIPTION_PLANS.familia.culturalValueEn,
    icon: <UsersIcon className="w-6 h-6" />,
    solidIcon: <HeartIconSolid className="w-6 h-6" />,
    color: "secondary",
    features: [
      "Todos os benefícios premium",
      "Suporte para até 8 familiares",
      "Aulas de português para crianças",
      "Rede de encontros familiares",
      "Programas de inclusão de avós",
      "Prioridade em eventos familiares",
      "15% desconto familiar",
      "Preservação do património cultural",
    ],
    featuresEn: [
      "All premium benefits",
      "Support for up to 8 family members", 
      "Portuguese classes for children",
      "Family playdate network",
      "Grandparent inclusion programs",
      "Family event priority",
      "15% family discount",
      "Cultural heritage preservation",
    ],
    culturalBenefits: [
      PORTUGUESE_PREMIUM_BENEFITS.family.childrenPortugueseClasses,
      PORTUGUESE_PREMIUM_BENEFITS.family.familyPlaydateNetwork,
      PORTUGUESE_PREMIUM_BENEFITS.family.grandparentInclusion,
    ],
    limitations: [],
    limitationsEn: [],
    buttonText: "Plano Familiar",
    buttonTextEn: "Family Plan",
    highlighted: false,
    badge: "Família",
    badgeEn: "Family",
    savings: "£5/pessoa por mês",
    savingsEn: "£5/person per month",
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
      // Map tier IDs to subscription types
      const tierMapping: { [key: string]: 'community' | 'ambassador' | 'familia' } = {
        'community': 'community',
        'ambassador': 'ambassador', 
        'familia': 'familia'
      };
      
      const subscriptionTier = tierMapping[tierId] || 'community';
      await createSubscription(subscriptionTier as any, "monthly");
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
        button: "bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]",
        badge: "bg-primary-100 text-primary-800",
      },
      premium: {
        border: "border-amber-300",
        bg: "bg-gradient-to-br from-amber-50 to-yellow-50",
        iconBg: "bg-gradient-to-br from-amber-100 to-yellow-100",
        iconText: "text-amber-600",
        button: "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]",
        badge: "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800",
      },
      secondary: {
        border: "border-emerald-300",
        bg: "bg-gradient-to-br from-emerald-50 to-green-50",
        iconBg: "bg-gradient-to-br from-emerald-100 to-green-100",
        iconText: "text-emerald-600",
        button: "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]",
        badge: "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800",
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
              ? "Escolha o plano ideal para se conectar com a comunidade de falantes de português de Londres."
              : "Choose the perfect plan to connect with London's Portuguese-speaking community."}
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
                      {tier.savings && (
                        <div className="mt-2">
                          <div className="inline-flex items-center bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                            <SparklesIcon className="w-3 h-3 mr-1" />
                            {isPortuguese ? tier.savings : tier.savingsEn}
                          </div>
                        </div>
                      )}
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

        {/* Portuguese Cultural Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 via-secondary-50 to-accent-50 rounded-2xl p-8 border border-primary-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {isPortuguese ? "Mais Que Uma Comunidade - É Saudade de Casa" : "More Than Community - It's Saudade for Home"}
            </h3>
            <div className="grid md:grid-cols-4 gap-6 text-center mb-8">
              <div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeartIcon className="w-6 h-6 text-primary-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {isPortuguese ? "Saudade Partilhada" : "Shared Saudade"}
                </h4>
                <p className="text-sm text-gray-600">
                  {isPortuguese
                    ? "Conecte-se com quem compreende esta emoção única"
                    : "Connect with those who understand this unique emotion"}
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPinIcon className="w-6 h-6 text-amber-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {isPortuguese ? "Negócios Portugueses" : "Portuguese Businesses"}
                </h4>
                <p className="text-sm text-gray-600">
                  {isPortuguese
                    ? "Descontos em 200+ empresas portuguesas no Reino Unido"
                    : "Discounts at 200+ Portuguese businesses across the United Kingdom"}
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarDaysIcon className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {isPortuguese ? "Santos Populares & Fado" : "Santos Populares & Fado"}
                </h4>
                <p className="text-sm text-gray-600">
                  {isPortuguese
                    ? "Celebre as tradições portuguesas autenticamente"
                    : "Celebrate Portuguese traditions authentically"}
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UsersIcon className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {isPortuguese ? "Famílias Portuguesas" : "Portuguese Families"}
                </h4>
                <p className="text-sm text-gray-600">
                  {isPortuguese
                    ? "Crianças aprendem português, avós participam"
                    : "Children learn Portuguese, grandparents participate"}
                </p>
              </div>
            </div>
            
            {/* Portuguese Community Stats */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary-600">750+</div>
                  <div className="text-sm text-gray-600">
                    {isPortuguese ? "Membros Portugueses" : "Portuguese Members"}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-600">200+</div>
                  <div className="text-sm text-gray-600">
                    {isPortuguese ? "Empresas Parceiras" : "Partner Businesses"}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">50+</div>
                  <div className="text-sm text-gray-600">
                    {isPortuguese ? "Eventos Mensais" : "Monthly Events"}
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm font-medium text-gray-700">
                  {isPortuguese
                    ? '"Finalmente encontrei a minha família portuguesa no Reino Unido!"'
                    : '"Finally found my Portuguese family in the United Kingdom!"'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  - Maria, {isPortuguese ? "Membro da Comunidade" : "Community Member"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
