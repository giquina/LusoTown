"use client";

import { useState, useEffect, ReactNode } from "react";
import { ROUTES } from '@/config'
import { motion, AnimatePresence } from "framer-motion";
import { ROUTES } from '@/config'
import {
  ShieldCheckIcon,
  CreditCardIcon,
  ClockIcon,
  HeartIcon,
  CheckCircleIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";
import { ROUTES } from '@/config'
import { useSubscription } from "@/context/SubscriptionContext";
import { ROUTES } from '@/config'
import { authService } from "@/lib/auth";
import { ROUTES } from '@/config'
import { plans, formatPrice } from "@/config/pricing";
import { ROUTES } from '@/config'

interface SubscriptionGateProps {
  children: ReactNode;
  mode?: "login" | "signup" | "transport" | "general";
  title?: string;
  description?: string;
  showTrialInfo?: boolean;
}

export default function SubscriptionGate({
  children,
  mode = "general",
  title,
  description,
  showTrialInfo = true,
}: SubscriptionGateProps) {
  const { language, t } = useLanguage();
  const {
    subscriptionRequired,
    isLoading,
    trial,
    trialDaysRemaining,
    isInTrial,
    createSubscription,
    redirectToSubscription,
  } = useSubscription();
  const [isCreatingSubscription, setIsCreatingSubscription] = useState(false);

  const isPortuguese = language === "pt";

  // Allow demo users to bypass subscription requirement
  const isDemoUser = authService.isDemoUser();

  // If user is demo user or has active subscription/trial, show children
  if (isDemoUser || !subscriptionRequired || isLoading) {
    return <>{children}</>;
  }

  const handleSubscribe = async () => {
    setIsCreatingSubscription(true);
    try {
      await createSubscription();
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setIsCreatingSubscription(false);
    }
  };

  const getGateContent = () => {
    switch (mode) {
      case "login":
        return {
          title: isPortuguese
            ? "Subscrição Necessária para Entrar"
            : "Subscription Required to Login",
          description: isPortuguese
            ? "Para aceder à sua conta LusoTown e conectar-se com a comunidade portuguesa, precisa de uma subscrição ativa."
            : "To access your LusoTown account and connect with the Portuguese community, you need an active subscription.",
          icon: ShieldCheckIcon,
          buttonText: isPortuguese
            ? `Começar com ${formatPrice(plans.community.monthly)}/mês`
            : `Start from ${formatPrice(plans.community.monthly)}/month`,
        };

      case "signup":
        return {
          title: isPortuguese
            ? "Junte-se à Comunidade LusoTown"
            : "Join the LusoTown Community",
          description: isPortuguese
            ? `Escolha entre planos mensais a partir de ${formatPrice(
                plans.community.monthly
              )} para acesso completo à rede portuguesa de Londres.`
            : `Choose from monthly plans starting at ${formatPrice(
                plans.community.monthly
              )} for full access to London's Portuguese network.`,
          icon: HeartIcon,
          buttonText: isPortuguese ? "Escolher Plano" : "Choose Plan",
        };

      case "transport":
        return {
          title: isPortuguese
            ? "Subscrição Necessária para Reservas de Transporte"
            : "Subscription Required for Transport Bookings",
          description: isPortuguese
            ? `Para reservar os nossos serviços de transporte privado com motoristas falantes de português, precisa de uma subscrição Community Member (${formatPrice(plans.community.monthly)}/mês) ou superior.`
            : `To book our private transport services with Portuguese-speaking drivers, you need a Community Member subscription (${formatPrice(plans.community.monthly)}/month) or higher.`,
          icon: CreditCardIcon,
          buttonText: isPortuguese
            ? `Começar com ${formatPrice(plans.community.monthly)}/mês`
            : `Start from ${formatPrice(plans.community.monthly)}/month`,
        };

      default:
        return {
          title:
            title ||
            (isPortuguese
              ? "Subscrição LusoTown Necessária"
              : "LusoTown Subscription Required"),
          description:
            description ||
            (isPortuguese
              ? "Esta funcionalidade requer uma subscrição ativa para aceder à comunidade portuguesa completa."
              : "This feature requires an active subscription to access the full Portuguese community."),
          icon: ShieldCheckIcon,
          buttonText: isPortuguese ? "Ver Subscrição" : "View Subscription",
        };
    }
  };

  const content = getGateContent();
  const IconComponent = content.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 text-white text-center">
          <IconComponent className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">{content.title}</h1>
          <p className="text-primary-100 text-sm">{content.description}</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Trial Information */}
          {showTrialInfo && trial && isInTrial && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <ClockIcon className="w-5 h-5 text-amber-600" />
                <span className="font-semibold text-amber-900">
                  {isPortuguese ? "Período de Teste" : "Trial Period"}
                </span>
              </div>
              <p className="text-sm text-amber-700 mb-2">
                {isPortuguese
                  ? `Tem ${trialDaysRemaining} dias restantes no seu período de teste gratuito.`
                  : `You have ${trialDaysRemaining} days remaining in your free trial.`}
              </p>
              <p className="text-xs text-amber-600">
                {isPortuguese
                  ? "Subscreva agora para continuar a aceder após o teste."
                  : "Subscribe now to continue access after your trial ends."}
              </p>
            </motion.div>
          )}

          {/* Subscription Benefits */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              {isPortuguese ? "O que está incluído:" : "What's included:"}
            </h3>
            <div className="space-y-3">
              {[
                {
                  en: "Access to Portuguese community network",
                  pt: "Acesso à rede da comunidade portuguesa",
                },
                {
                  en: "Cultural events and experiences",
                  pt: "Eventos culturais e experiências",
                },
                {
                  en: "Business networking opportunities",
                  pt: "Oportunidades de networking profissional",
                },
                {
                  en: "Premium transport booking services",
                  pt: "Serviços premium de reserva de transporte",
                },
                {
                  en: "Community support and connections",
                  pt: "Apoio comunitário e conexões",
                },
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    {isPortuguese ? benefit.pt : benefit.en}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Options */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-4 text-center">
              {isPortuguese ? "Escolha o seu plano:" : "Choose your plan:"}
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {/* Community Member - Highlighted */}
              <div className="p-4 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg border-2 border-primary-200">
                <div className="text-center">
                  <div className="text-xs text-primary-600 font-bold mb-1">
                    POPULAR
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {formatPrice(plans.community.monthly)}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {isPortuguese ? "Membro da Comunidade" : "Community Member"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {isPortuguese
                      ? "Por mês • Matches & mensagens ilimitadas"
                      : "Per month • Unlimited matches & messages"}
                  </div>
                </div>
              </div>

              {/* Cultural Ambassador */}
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900 mb-1">
                    {formatPrice(plans.ambassador.monthly)}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    {isPortuguese
                      ? "Embaixador Cultural"
                      : "Cultural Ambassador"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {isPortuguese
                      ? "Por mês • Tudo + visibilidade prioritária"
                      : "Per month • Everything + priority visibility"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleSubscribe}
            disabled={isCreatingSubscription}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isCreatingSubscription ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {isPortuguese ? "Processando..." : "Processing..."}
              </>
            ) : (
              <>
                <CreditCardIcon className="w-5 h-5" />
                {content.buttonText}
              </>
            )}
          </button>

          {/* Support Link */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 mb-2">
              {isPortuguese
                ? "Precisa de ajuda? Entre em contacto connosco."
                : "Need help? Contact our support team."}
            </p>
            <a
              href={ROUTES.contact}
              className="text-xs text-primary-500 hover:text-primary-600 underline"
            >
              {isPortuguese ? "Suporte ao Cliente" : "Customer Support"}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
