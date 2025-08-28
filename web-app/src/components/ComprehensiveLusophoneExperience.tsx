"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import GradientBackground from "@/components/ui/GradientBackground";

import {
  StarIcon,
  ArrowRightIcon,
  GlobeAltIcon,
  ChartBarIcon,
  UsersIcon,
  SparklesIcon,
  HeartIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";
import { useHeritage } from "@/context/HeritageContext";
import { ROUTES, communityStats, formatStat } from "@/config";
import { GradientText } from "@/components/ui";
import LusophoneTestimonials from "@/components/LusophoneTestimonials";
import EnhancedMobileWelcomeWizard from "@/components/EnhancedMobileWelcomeWizard";
import HeritageSelector, { HeritageBadge } from "@/components/HeritageSelector";
import { Card } from "@/components/ui/card";

// Touch-friendly swipe detection hook
function useSwipeDetection(onSwipeLeft: () => void, onSwipeRight: () => void) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) onSwipeLeft();
    if (isRightSwipe) onSwipeRight();
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}

// Flag Animation Component with Portuguese-speaking nations
function LusophoneFlagFlow() {
  const flags = ["🇵🇹", "🇧🇷", "🇦🇴", "🇨🇻", "🇲🇿", "🇬🇼", "🇸🇹", "🇹🇱"];
  const [currentFlagIndex, setCurrentFlagIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFlagIndex((prev) => (prev + 1) % flags.length);
    }, 800);
    return () => clearInterval(interval);
  }, [flags.length]);

  return (
    <div className="flex justify-center items-center space-x-1 my-6">
      {flags.map((flag, index) => (
        <motion.span
          key={index}
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{
            scale: index === currentFlagIndex ? 1.4 : 0.8,
            opacity: index === currentFlagIndex ? 1 : 0.6,
            y: index === currentFlagIndex ? -4 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-2xl cursor-pointer hover:scale-110 transition-transform"
        >
          {flag}
        </motion.span>
      ))}
    </div>
  );
}

// Heritage Selection Interface
interface HeritageOption {
  code: string;
  name: string;
  flag: string;
  color: string;
  description: string;
  region: string;
}

function HeritageSelectionSystem() {
  const { t } = useLanguage();
  const { heritage, setHeritage } = useHeritage();
  const [selectedHeritage, setSelectedHeritage] = useState("");

  const heritageOptions: HeritageOption[] = [
    {
      code: "pt",
      name: "Portugal",
      flag: "🇵🇹",
      color: "from-green-500 to-red-500",
      description: t(
        "heritage.portugal.description",
        "Birthplace of global Portuguese culture"
      ),
      region: "Europe",
    },
    {
      code: "br",
      name: "Brazil",
      flag: "🇧🇷",
      color: "from-green-500 via-yellow-500 to-blue-500",
      description: t(
        "heritage.brazil.description",
        "Largest Portuguese-speaking nation"
      ),
      region: "South America",
    },
    {
      code: "ao",
      name: "Angola",
      flag: "🇦🇴",
      color: "from-red-600 to-black",
      description: t("heritage.angola.description", "Heart of PALOP heritage"),
      region: "Africa (PALOP)",
    },
    {
      code: "cv",
      name: "Cape Verde",
      flag: "🇨🇻",
      color: "from-blue-600 to-yellow-400",
      description: t(
        "heritage.cape_verde.description",
        "Islands of Morna and culture"
      ),
      region: "Africa (PALOP)",
    },
    {
      code: "mz",
      name: "Mozambique",
      flag: "🇲🇿",
      color: "from-green-500 via-yellow-500 to-red-500",
      description: t(
        "heritage.mozambique.description",
        "Eastern African Portuguese culture"
      ),
      region: "Africa (PALOP)",
    },
    {
      code: "gw",
      name: "Guinea-Bissau",
      flag: "🇬🇼",
      color: "from-red-500 via-yellow-500 to-green-500",
      description: t(
        "heritage.guinea_bissau.description",
        "West African Portuguese heritage"
      ),
      region: "Africa (PALOP)",
    },
    {
      code: "st",
      name: "São Tomé & Príncipe",
      flag: "🇸🇹",
      color: "from-green-500 via-yellow-500 to-red-500",
      description: t(
        "heritage.sao_tome.description",
        "Island paradise Portuguese culture"
      ),
      region: "Africa (PALOP)",
    },
    {
      code: "tl",
      name: "Timor-Leste",
      flag: "🇹🇱",
      color: "from-red-600 via-yellow-400 to-black",
      description: t(
        "heritage.timor_leste.description",
        "Newest Portuguese-speaking nation"
      ),
      region: "Asia",
    },
  ];

  const handleHeritageSelection = (code: string) => {
    setSelectedHeritage(code);
    setHeritage(code);
    // Store selection for persistence
    localStorage.setItem("lusotown-heritage-selection", code);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <GradientText variant="heritage" size="xl" className="font-bold mb-2">
          {t("heritage.selection.title", "Choose Your Lusophone Heritage")}
        </GradientText>
        <p className="text-gray-600 text-sm">
          {t(
            "heritage.selection.subtitle",
            "Connect with your cultural roots across the Portuguese-speaking world"
          )}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {heritageOptions.map((option, index) => (
          <motion.div
            key={option.code}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              variant="default"
              elevation="md"
              className={`cursor-pointer transition-all duration-300 text-center ${
                selectedHeritage === option.code
                  ? "ring-2 ring-primary-500 bg-primary-50 border-primary-500"
                  : "hover:border-primary-300"
              }`}
              onClick={() => handleHeritageSelection(option.code)}
            >
              <div className="p-3 space-y-2">
                <div
                  className={`w-12 h-12 mx-auto bg-gradient-to-r ${option.color} rounded-full flex items-center justify-center shadow-lg`}
                >
                  <span className="text-2xl">{option.flag}</span>
                </div>
                <div className="text-xs font-semibold text-gray-900">
                  {option.name}
                </div>
                <div className="text-xs text-gray-500 leading-tight">
                  {option.description}
                </div>
                <div className="text-xs text-primary-600 font-medium">
                  {option.region}
                </div>

                {selectedHeritage === option.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex justify-center pt-1"
                  >
                    <CheckCircleIcon className="w-4 h-4 text-primary-500" />
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Community Statistics Dashboard
function CommunityStatsDashboard() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const stats = [
    {
      label: t("stats.members", "Lusophone Speakers"),
      value: formatStat(communityStats.members),
      icon: UsersIcon,
      color: "text-primary-600",
      bg: "bg-primary-50",
    },
    {
      label: t("stats.students", "University Students"),
      value: formatStat(communityStats.students),
      icon: GlobeAltIcon,
      color: "text-secondary-600",
      bg: "bg-secondary-50",
    },
    {
      label: t("stats.events", "Monthly Events"),
      value: formatStat(communityStats.events),
      icon: SparklesIcon,
      color: "text-accent-600",
      bg: "bg-accent-50",
    },
    {
      label: t("stats.partnerships", "University Partners"),
      value: communityStats.partnerships,
      icon: ChartBarIcon,
      color: "text-premium-600",
      bg: "bg-premium-50",
    },
  ];

  return (
    <div ref={ref} className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        className="text-center"
      >
        <GradientText variant="heritage" size="xl" className="font-bold mb-2">
          {t("community.title", "Our Growing Lusophone-Speaking Community")}
        </GradientText>
        <p className="text-gray-600 text-sm">
          {t(
            "community.subtitle",
            "Connecting Lusophone communities across the United Kingdom"
          )}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card variant="default" hover={true}>
              <div className="p-4 text-center space-y-3">
                <div
                  className={`w-12 h-12 mx-auto rounded-xl ${stat.bg} flex items-center justify-center`}
                >
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600 font-medium leading-tight">
                  {stat.label}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Business Benefits Showcase
function BusinessBenefitsShowcase() {
  const { t } = useLanguage();
  const [activeMarket, setActiveMarket] = useState(0);

  const markets = [
    {
      name: "Portugal",
      flag: "🇵🇹",
      value: "€240B GDP",
      opportunity: "10.3M population",
      key_sectors: "Tourism, Tech, Wine",
      uk_trade: "£2.8B annually",
    },
    {
      name: "Brazil",
      flag: "🇧🇷",
      value: "$1.6T GDP",
      opportunity: "215M population",
      key_sectors: "Agriculture, Mining, Manufacturing",
      uk_trade: "£5.2B annually",
    },
    {
      name: "PALOP Nations",
      flag: "🇦🇴🇨🇻🇲🇿🇬🇼🇸🇹",
      value: "$150B+ GDP",
      opportunity: "45M+ population",
      key_sectors: "Oil, Minerals, Agriculture",
      uk_trade: "£3.1B+ annually",
    },
  ];

  const swipeHandlers = useSwipeDetection(
    () => setActiveMarket((prev) => (prev + 1) % markets.length),
    () =>
      setActiveMarket((prev) => (prev - 1 + markets.length) % markets.length)
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <GradientText variant="heritage" size="xl" className="font-bold mb-2">
          {t("business.title", "Lusophone-Speaking Markets Opportunity")}
        </GradientText>
        <p className="text-gray-600 text-sm">
          {t(
            "business.subtitle",
            "Access 280M+ Portuguese speakers across global markets"
          )}
        </p>
      </motion.div>

      <div className="relative" {...swipeHandlers}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMarket}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <div className="text-center space-y-4">
                <div className="text-4xl mb-2">
                  {markets[activeMarket].flag}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {markets[activeMarket].name}
                </h3>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-primary-600">
                      Market Size
                    </div>
                    <div className="text-gray-700">
                      {markets[activeMarket].value}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-secondary-600">
                      Population
                    </div>
                    <div className="text-gray-700">
                      {markets[activeMarket].opportunity}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-accent-600">
                      Key Sectors
                    </div>
                    <div className="text-gray-700 text-xs">
                      {markets[activeMarket].key_sectors}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-premium-600">
                      UK Trade
                    </div>
                    <div className="text-gray-700">
                      {markets[activeMarket].uk_trade}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Market indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {markets.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveMarket(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeMarket ? "bg-primary-500 w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function ComprehensiveLusophoneExperience() {
  const { t } = useLanguage();
  const router = useRouter();
  const [showWelcomeWizard, setShowWelcomeWizard] = useState(false);
  const [activeSection, setActiveSection] = useState("heritage");

  useEffect(() => {
    // Check if user has completed welcome flow
    const welcomeCompleted = localStorage.getItem("lusotown-welcome-completed");
    if (!welcomeCompleted) {
      // Show welcome wizard after a short delay for better UX
      const timer = setTimeout(() => {
        setShowWelcomeWizard(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const sections = [
    { id: "heritage", label: t("sections.heritage", "Heritage"), icon: "🌍" },
    {
      id: "community",
      label: t("sections.community", "Community"),
      icon: "👥",
    },
    { id: "business", label: t("sections.business", "Business"), icon: "💼" },
    {
      id: "testimonials",
      label: t("sections.testimonials", "Stories"),
      icon: "💬",
    },
  ];

  const handleWelcomeComplete = (selection: string) => {
    setShowWelcomeWizard(false);
    // Analytics tracking could go here
    console.log("Welcome completed with selection:", selection);
  };

  const handleJoinCommunity = () => {
    router.push(ROUTES.membershipApplication);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "heritage":
        return <HeritageSelectionSystem />;
      case "community":
        return <CommunityStatsDashboard />;
      case "business":
        return <BusinessBenefitsShowcase />;
      case "testimonials":
        return <LusophoneTestimonials />;
      default:
        return <HeritageSelectionSystem />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Enhanced Mobile Welcome Wizard */}
      <EnhancedMobileWelcomeWizard
        isOpen={showWelcomeWizard}
        onClose={() => setShowWelcomeWizard(false)}
        onComplete={handleWelcomeComplete}
      />

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="flex justify-center">
            <LusophoneFlagFlow />
          </div>

          <div className="space-y-3">
            <GradientText variant="heritage" size="3xl" className="font-bold">
              {t(
                "lusophone.experience.title",
                "The Complete Lusophone Experience"
              )}
            </GradientText>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t(
                "lusophone.experience.subtitle",
                "Connecting Portuguese-speaking communities across Portugal, Brazil, PALOP nations, and the United Kingdom"
              )}
            </p>

            <HeritageBadge className="mx-auto" />
          </div>

          {/* Call-to-Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={handleJoinCommunity}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <HeartIcon className="w-5 h-5" />
              {t("cta.join_community", "Join Our Community")}
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>

        {/* Navigation Tabs - Mobile-First Design */}
        <div className="sticky top-4 z-40 bg-white/90 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-lg p-2">
          <div className="grid grid-cols-4 gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`relative px-3 py-3 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-primary-100 text-primary-700 shadow-md"
                    : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-lg">{section.icon}</span>
                  <span>{section.label}</span>
                </div>

                {activeSection === section.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary-100 rounded-xl -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Content Section */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-[400px]"
        >
          <Card className="p-6">{renderActiveSection()}</Card>
        </motion.div>

        {/* Footer Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <GradientBackground variant="heritage" className="rounded-3xl">
            <Card className="p-8 text-center space-y-4">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t(
                  "footer.ready_title",
                  "Ready to Join the Lusophone-Speaking Community?"
                )}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {t(
                  "footer.ready_description",
                  "Connect with fellow Portuguese speakers, discover cultural events, and build lasting friendships across the UK."
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleJoinCommunity}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <StarIcon className="w-4 h-4" />
                  {t("cta.become_member", "Become a Member")}
                </button>

                <button
                  onClick={() => setShowWelcomeWizard(true)}
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold border border-primary-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-300"
                >
                  <SparklesIcon className="w-4 h-4" />
                  {t("cta.explore_options", "Explore Membership Options")}
                </button>
              </div>
            </Card>
          </GradientBackground>
        </motion.div>
      </div>
    </div>
  );
}
