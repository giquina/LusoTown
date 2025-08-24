"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  SparklesIcon,
  GiftIcon,
  ClockIcon,
  UserGroupIcon,
  TruckIcon,
  CalendarDaysIcon,
  HeartIcon,
  ChartBarIcon,
  CurrencyPoundIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { REVENUE_OPTIMIZATION, PAYMENT_PREFERENCES, CULTURAL_VALUE_PROPOSITIONS, formatPrice } from "@/config/pricing";

interface PortugueseRevenueOptimizerProps {
  onConversion?: (tier: string, strategy: string) => void;
  currentService?: "events" | "transport" | "networking" | "community";
  userSegment?: "newcomer" | "established" | "family" | "business" | "student";
}

export default function PortugueseRevenueOptimizer({
  onConversion,
  currentService,
  userSegment = "newcomer",
}: PortugueseRevenueOptimizerProps) {
  const { language } = useLanguage();
  const { membershipTier, hasActiveSubscription } = useSubscription();
  const [activeStrategy, setActiveStrategy] = useState<string | null>(null);
  const [urgencyTimer, setUrgencyTimer] = useState(0);
  const isPortuguese = language === "pt";

  // Initialize urgency timer for conversion
  useEffect(() => {
    if (!hasActiveSubscription) {
      const timer = setInterval(() => {
        setUrgencyTimer(prev => prev + 1);
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [hasActiveSubscription]);

  // Portuguese-speaking community Specific Conversion Strategies
  const conversionStrategies = {
    culturalMoment: {
      id: "cultural_moment",
      name: isPortuguese ? "Oferta Santos Populares" : "Santos Populares Offer",
      description: isPortuguese 
        ? "Especial para celebrar as tradi��es portuguesas - s� at� domingo!"
        : "Special offer to celebrate Portuguese traditions - until Sunday only!",
      discount: 0.25, // 25% off
      urgency: true,
      culturalContext: isPortuguese 
        ? "N�o perca os Santos Populares com a sua comunidade portuguesa"
        : "Don't miss Santos Populares with your Portuguese community",
      icon: <FireIcon className="w-5 h-5 text-orange-500" />,
    },
    familyValue: {
      id: "family_value",
      name: isPortuguese ? "Plano Familiar Especial" : "Special Family Plan",
      description: isPortuguese
        ? "4 pessoas por �5 cada - perfeito para fam�lias portuguesas"
        : "4 people for �5 each - perfect for Portuguese families",
      discount: 0.50, // 50% off per person for families
      familyFocused: true,
      culturalContext: isPortuguese
        ? "As fam�lias portuguesas fazem tudo juntas - por que n�o LusoTown?"
        : "Portuguese families do everything together - why not LusoTown?",
      icon: <UserGroupIcon className="w-5 h-5 text-emerald-500" />,
    },
    newcomerSpecial: {
      id: "newcomer_special", 
      name: isPortuguese ? "Bem-vindos ao Reino Unido" : "Welcome to the United Kingdom",
      description: isPortuguese
        ? "50% desconto para rec�m-chegados - encontre a sua comunidade"
        : "50% discount for newcomers - find your community",
      discount: 0.50,
      supportFocused: true,
      culturalContext: isPortuguese
        ? "Sabemos como � dif�cil estar longe de casa - n�s ajudamos"
        : "We know how hard it is being away from home - we help",
      icon: <HeartIcon className="w-5 h-5 text-red-500" />,
    },
    eventBased: {
      id: "event_based",
      name: isPortuguese ? "Upgrade Durante Evento" : "Event Upgrade Offer",
      description: isPortuguese
        ? "Upgrade agora e ganhe acesso VIP a este evento"
        : "Upgrade now and get VIP access to this event",
      eventContext: true,
      immediateValue: true,
      culturalContext: isPortuguese
        ? "N�o seja o �nico sem acesso premium neste evento portugu�s"
        : "Don't be the only one without premium access at this Portuguese event",
      icon: <CalendarDaysIcon className="w-5 h-5 text-purple-500" />,
    }
  };

  // Revenue Retention Strategies
  const retentionStrategies = {
    winBack: {
      name: isPortuguese ? "Volta Para Casa" : "Come Back Home",
      description: isPortuguese
        ? "A comunidade sente a sua falta - volte com 50% desconto"
        : "The community misses you - come back with 50% off",
      personalTouch: true,
      emotionalAppeal: "saudade",
    },
    pause: {
      name: isPortuguese ? "Pausar em Vez de Cancelar" : "Pause Instead of Cancel",
      description: isPortuguese
        ? "Pause por at� 3 meses - mantenha o seu lugar na comunidade"
        : "Pause for up to 3 months - keep your place in the community",
      flexibilityFocused: true,
    },
    culturalCalendar: {
      name: isPortuguese ? "Calendario Cultural" : "Cultural Calendar",
      description: isPortuguese
        ? "Santos Populares aproxima-se - n�o perca a celebra��o!"
        : "Santos Populares is coming - don't miss the celebration!",
      eventReminder: true,
    }
  };

  // Payment Optimization for Portuguese-speaking community
  const paymentOptimizations = {
    bankTransfer: {
      name: isPortuguese ? "Transfer�ncia Banc�ria" : "Bank Transfer",
      preference: PAYMENT_PREFERENCES.preferredMethods.bankTransfer,
      benefit: isPortuguese ? "5% desconto extra" : "5% extra discount",
      culturalNote: isPortuguese 
        ? "M�todo preferido por 45% dos portugueses no Reino Unido"
        : "Preferred by 45% of Portuguese speakers in the United Kingdom",
    },
    quarterly: {
      name: isPortuguese ? "Pagamento Trimestral" : "Quarterly Payment",
      preference: PAYMENT_PREFERENCES.billingCycles.quarterly.preference,
      discount: PAYMENT_PREFERENCES.billingCycles.quarterly.incentive,
      culturalNote: isPortuguese
        ? "Pague menos, planeie melhor - ao estilo portugu�s"
        : "Pay less, plan better - Portuguese style",
    }
  };

  const handleStrategyActivation = (strategyId: string, tier: string) => {
    setActiveStrategy(strategyId);
    onConversion?.(tier, strategyId);
  };

  const getCulturalValueProposition = () => {
    const cultural = CULTURAL_VALUE_PROPOSITIONS;
    return {
      emotional: isPortuguese ? cultural.emotional.saudadeConnection.descriptionPt : cultural.emotional.saudadeConnection.description,
      practical: isPortuguese ? cultural.practical.businessOpportunities.value : cultural.practical.businessOpportunities.value,
    };
  };

  if (hasActiveSubscription && membershipTier !== 'none') {
    return null; // Don't show to active premium members
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border-2 border-primary-200 shadow-xl"
    >
      {/* Header with Cultural Context */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-primary-700 mb-3">
          <SparklesIcon className="w-4 h-4 mr-2" />
          {isPortuguese ? "Oferta Especial Para Portugueses" : "Special Offer for Portuguese Speakers"}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {isPortuguese 
            ? "Encontre a Sua Fam�lia Portuguesa no Reino Unido" 
            : "Find Your Portuguese Family in the United Kingdom"}
        </h3>
        <p className="text-gray-600">
          {getCulturalValueProposition().emotional}
        </p>
      </div>

      {/* Active Conversion Strategy */}
      <div className="space-y-4">
        {Object.entries(conversionStrategies).map(([key, strategy]) => {
          const isActive = activeStrategy === strategy.id;
          const isRelevant = 
            (userSegment === 'family' && strategy.id === 'family_value') ||
            (userSegment === 'newcomer' && strategy.id === 'newcomer_special') ||
            (currentService === 'events' && strategy.id === 'event_based') ||
            strategy.id === 'cultural_moment'; // Cultural moment always relevant

          if (!isRelevant) return null;

          return (
            <motion.div
              key={strategy.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 rounded-xl border-2 transition-all ${
                isActive 
                  ? 'border-primary-400 bg-primary-50 shadow-lg' 
                  : 'border-primary-200 bg-white/70 hover:border-primary-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {strategy.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{strategy.name}</h4>
                    {strategy.urgency && (
                      <div className="flex items-center text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {Math.max(0, 72 - Math.floor(urgencyTimer / 3600))}h {isPortuguese ? "restantes" : "left"}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{strategy.description}</p>
                  <p className="text-xs text-gray-600 italic">{strategy.culturalContext}</p>
                  
                  {strategy.discount && (
                    <div className="mt-3">
                      <div className="inline-flex items-center bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                        <GiftIcon className="w-4 h-4 mr-1" />
                        {Math.round(strategy.discount * 100)}% {isPortuguese ? "desconto" : "off"}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleStrategyActivation(strategy.id, 'community')}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-all transform hover:scale-[1.02]"
                >
                  {isPortuguese ? "Ativar Oferta" : "Activate Offer"}
                </button>
                <button className="px-4 py-2 text-primary-600 text-sm font-medium hover:bg-primary-100 rounded-lg transition-colors">
                  {isPortuguese ? "Detalhes" : "Details"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Payment Preferences for Portuguese-speaking community */}
      <div className="mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50">
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">
          {isPortuguese ? "M�todos de Pagamento Preferidos" : "Preferred Payment Methods"}
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(paymentOptimizations).map(([key, method]) => (
            <div key={key} className="text-center">
              <div className="text-lg font-bold text-primary-600">
                {key === 'bankTransfer' ? '45%' : '25%'}
              </div>
              <div className="text-xs text-gray-600">{method.name}</div>
              {method.benefit && (
                <div className="text-xs text-green-600">{method.benefit}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Conversion Stats */}
      <div className="mt-4 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <ChartBarIcon className="w-4 h-4" />
          <span>
            {isPortuguese 
              ? "92% dos membros premium recomendam aos amigos portugueses"
              : "92% of premium members recommend to Portuguese friends"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}