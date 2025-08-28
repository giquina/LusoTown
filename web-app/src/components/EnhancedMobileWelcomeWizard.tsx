"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  XMarkIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";
import { ROUTES } from "@/config/routes";
import { Card } from "@/components/ui/card";
import GradientBackground from "@/components/ui/GradientBackground";
import { GradientText } from "@/components/ui";

// Mobile Language Toggle Component
function MobileLanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pt" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-primary-300 transition-all text-sm font-medium shadow-lg"
      title="Toggle language / Alternar idioma"
      aria-label={
        language === "en" ? "Mudar para Português" : "Switch to English"
      }
    >
      <span className="text-lg">{language === "en" ? "🇬🇧" : "🇵🇹"}</span>
      <span className="text-sm font-bold text-gray-700">
        {language === "en" ? "EN" : "PT"}
      </span>
    </button>
  );
}

// Flag Flow Animation Component
function FlagFlowAnimation() {
  const flags = ["🇵🇹", "🇧🇷", "🇦🇴", "🇨🇻", "🇲🇿", "🇬🇼", "🇸🇹", "🇹🇱"];

  return (
    <div className="flex justify-center items-center space-x-2 my-4">
      {flags.map((flag, index) => (
        <motion.span
          key={flag}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: index * 0.1,
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 3,
          }}
          className="text-2xl"
        >
          {flag}
        </motion.span>
      ))}
    </div>
  );
}

interface EnhancedMobileWelcomeWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (selection: string) => void;
}

interface MembershipOption {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  membershipBenefit: string;
  heritageExamples: string;
  emoji: string;
  gradient: string;
  flags: string;
  route: string;
}

export default function EnhancedMobileWelcomeWizard({
  isOpen,
  onClose,
  onComplete,
}: EnhancedMobileWelcomeWizardProps) {
  const { language, t } = useLanguage();
  const router = useRouter();
  const [selectedMembership, setSelectedMembership] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isPortuguese = language === "pt";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  // Exclusive Membership Options
  const exclusiveMembershipOptions: MembershipOption[] = [
    {
      id: "cultural",
      title: t("wizard.enhanced.cultural.title"),
      subtitle: t("wizard.enhanced.cultural.subtitle"),
      description: t("wizard.enhanced.cultural.description"),
      membershipBenefit: t("wizard.enhanced.cultural.benefit"),
      heritageExamples: t("wizard.enhanced.cultural.heritage"),
      emoji: "🎭",
      gradient: "from-purple-500 to-pink-500",
      flags: "🇵🇹🇧🇷🇦🇴🇨🇻",
      route: ROUTES.culturalMembership,
    },
    {
      id: "connections",
      title: t("wizard.enhanced.connections.title"),
      subtitle: t("wizard.enhanced.connections.subtitle"),
      description: t("wizard.enhanced.connections.description"),
      membershipBenefit: t("wizard.enhanced.connections.benefit"),
      heritageExamples: t("wizard.enhanced.connections.heritage"),
      emoji: "💎",
      gradient: "from-red-500 to-orange-500",
      flags: "🇲🇿🇬🇼🇸🇹🇹🇱",
      route: ROUTES.socialMembership,
    },
    {
      id: "community",
      title: t("wizard.enhanced.community.title"),
      subtitle: t("wizard.enhanced.community.subtitle"),
      description: t("wizard.enhanced.community.description"),
      membershipBenefit: t("wizard.enhanced.community.benefit"),
      heritageExamples: t("wizard.enhanced.community.heritage"),
      emoji: "🤝",
      gradient: "from-green-500 to-teal-500",
      flags: "🇬🇧🌍",
      route: ROUTES.communityMembership,
    },
    {
      id: "business",
      title: t("wizard.enhanced.business.title"),
      subtitle: t("wizard.enhanced.business.subtitle"),
      description: t("wizard.enhanced.business.description"),
      membershipBenefit: t("wizard.enhanced.business.benefit"),
      heritageExamples: t("wizard.enhanced.business.heritage"),
      emoji: "💼",
      gradient: "from-blue-500 to-indigo-500",
      flags: "💰🌐",
      route: ROUTES.businessMembership,
    },
  ];

  const handleMembershipSelection = async (membershipId: string) => {
    setSelectedMembership(membershipId);
    setIsLoading(true);

    try {
      // Store selection in localStorage for persistence
      localStorage.setItem("lusotown-membership-selection", membershipId);
      localStorage.setItem("lusotown-welcome-completed", "true");

      // Find the selected option and navigate to its route
      const selectedOption = exclusiveMembershipOptions.find(
        (option) => option.id === membershipId
      );
      if (selectedOption) {
        // Call the completion handler
        onComplete(membershipId);

        // Navigate to the membership application page
        router.push(selectedOption.route);
      }
    } catch (error) {
      console.error("Error handling membership selection:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <GradientBackground variant="heritage" className="rounded-3xl">
              <Card
                variant="glassmorphism"
                elevation="2xl"
                className="p-6 space-y-6"
                animate={false}
              >
                {/* Header with Close Button and Language Toggle */}
                <div className="flex justify-between items-center">
                  <MobileLanguageToggle />
                  <button
                    onClick={onClose}
                    className="p-2 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-red-300 transition-colors shadow-lg"
                    aria-label={t("wizard.enhanced.close")}
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Welcome Header */}
                <div className="text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl"
                  >
                    <span className="text-3xl">🌍</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <GradientText
                      variant="heritage"
                      size="2xl"
                      className="font-bold"
                    >
                      {t("wizard.enhanced.title")}
                    </GradientText>

                    <p className="text-lg font-semibold text-primary-600">
                      {t("wizard.enhanced.subtitle")}
                    </p>

                    <p className="text-sm text-gray-600 font-medium">
                      {t("wizard.enhanced.tagline")}
                    </p>
                  </motion.div>

                  {/* Flag Flow Animation */}
                  <FlagFlowAnimation />
                </div>

                {/* Membership Options */}
                <div className="space-y-4">
                  {exclusiveMembershipOptions.map((option, index) => (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <Card
                        variant="default"
                        elevation="lg"
                        hover={true}
                        className={`cursor-pointer transition-all duration-300 ${
                          selectedMembership === option.id
                            ? "ring-2 ring-primary-500 bg-primary-50 border-primary-500"
                            : "hover:border-primary-300 hover:shadow-xl"
                        }`}
                        onClick={() => handleMembershipSelection(option.id)}
                      >
                        <div className="p-4 space-y-4">
                          {/* Header with Icon and Flags */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-14 h-14 bg-gradient-to-r ${option.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                              >
                                <span className="text-2xl">{option.emoji}</span>
                              </div>
                              <div className="text-left">
                                <div className="font-bold text-gray-900 text-sm leading-tight">
                                  {option.title}
                                </div>
                                <div className="text-xs text-primary-600 font-semibold">
                                  {option.subtitle}
                                </div>
                              </div>
                            </div>
                            <div className="text-xl">{option.flags}</div>
                          </div>

                          {/* Description */}
                          <div className="text-xs text-gray-600 leading-relaxed">
                            {option.description}
                          </div>

                          {/* Membership Benefit Badge */}
                          <div className="bg-gradient-to-r from-green-50 to-red-50 rounded-xl p-3 border border-green-200">
                            <div className="text-xs font-semibold text-green-700 mb-1 flex items-center gap-1">
                              <CheckIcon className="w-3 h-3" />
                              {t("wizard.enhanced.membership_benefit")}
                            </div>
                            <div className="text-xs text-green-600 font-medium">
                              {option.membershipBenefit}
                            </div>
                          </div>

                          {/* Heritage Promise */}
                          <div className="text-xs text-gray-500 italic text-center p-2 bg-gray-50 rounded-lg">
                            {option.heritageExamples}
                          </div>

                          {/* Selection Indicator */}
                          {selectedMembership === option.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex justify-center"
                            >
                              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                                <CheckIcon className="w-5 h-5 text-white" />
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Loading State */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-4"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-xl">
                      <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm font-medium text-primary-600">
                        {t("wizard.enhanced.processing")}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Footer */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    {t("wizard.enhanced.welcome_message")}
                  </p>
                </div>
              </Card>
            </GradientBackground>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
