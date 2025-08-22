"use client";

import React from "react";
import {
  ArrowRightIcon,
  SparklesIcon,
  HeartIcon,
  UsersIcon,
  MapPinIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import SocialLogin from "./SocialLogin";
import SearchBar from "./SearchBar";
import { getImagesByCategory } from "@/lib/profileImages";
import { useLanguage } from "@/context/LanguageContext";
import { plans, formatPrice } from "@/config/pricing";
import { ROUTES } from "@/config/routes";
import { motion, AnimatePresence } from "framer-motion";
import { LuxuryRipple } from "./LuxuryMobileInteraction";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden w-full bg-gradient-to-br from-white via-gray-50 to-secondary-50">
      {/* Background decorative elements - CSS animations instead of framer-motion */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent-200 via-coral-100 to-secondary-100 rounded-full opacity-30 animate-pulse" />
        <div
          className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-secondary-200 via-accent-100 to-action-100 rounded-full opacity-25 animate-bounce"
          style={{ animationDuration: "4s" }}
        />
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-secondary-400 rounded-full opacity-40" />
        <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-accent-400 rounded-full" />
        <div className="absolute bottom-1/3 left-2/3 w-3 h-3 bg-action-400 rounded-full opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Content */}
          <div
            className={`space-y-8 sm:space-y-10 transition-all duration-1000 ${
              mounted
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            {/* Concise Dynamic Badge */}
    <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 via-amber-50 to-green-50 border border-red-200/40 rounded-full px-4 py-2 shadow-md"
            >
              <div className="flex items-center gap-1">
                <span className="text-xs">🇵🇹</span>
                <span className="text-xs font-semibold text-gray-700">
      UK Portuguese-speaking Community
                </span>
              </div>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            </motion.div>

            {/* Dynamic Headlines */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight"
              >
                <span className="bg-gradient-to-r from-red-600 via-amber-600 to-green-600 bg-clip-text text-transparent">
                  Connect
                </span>{" "}
                <span className="text-gray-900">with Portuguese speakers across the United Kingdom</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl"
              >
                Join 750+ Portuguese speakers across the UK. 
                <span className="font-semibold text-gray-800"> Events, networking, culture.</span>
              </motion.p>
            </div>

            {/* Search Bar */}
            <div
              className={`transition-all duration-1000 delay-400 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <SearchBar variant="homepage" className="max-w-3xl w-full" />
            </div>

            {/* Feature highlights - Clean 4-column grid with better spacing */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {[
                {
                  href: ROUTES.events,
                  icon: HeartIcon,
                  label: "BOOK & EXPERIENCE",
                  gradient: "from-action-500 to-action-600",
                  delay: 0
                },
                {
                  href: ROUTES.community,
                  icon: UsersIcon,
                  label: "PORTUGUESE SPEAKERS",
                  gradient: "from-secondary-500 to-secondary-600",
                  delay: 0.1
                },
                {
                  href: ROUTES.groups,
                  icon: SparklesIcon,
                  label: "LIVE TOGETHER",
                  gradient: "from-accent-500 to-coral-500",
                  delay: 0.2
                },
                {
                  href: ROUTES.myNetwork,
                  icon: ArrowRightIcon,
                  label: "GROW NETWORK",
                  gradient: "from-premium-500 to-premium-600",
                  delay: 0.3
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={mounted ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.6 + item.delay,
                    type: "spring",
                    stiffness: 300
                  }}
                >
                  <LuxuryRipple
                    className="luxury-glass-card min-h-[96px] sm:min-h-[104px] cursor-pointer"
                    hapticFeedback="light"
                    rippleColor="rgba(255, 255, 255, 0.4)"
                    onClick={() => window.location.href = item.href}
                  >
                    <motion.div
                      className="flex flex-col items-center gap-3 p-4"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}
                        whileHover={{ 
                          rotate: [0, -5, 5, 0],
                          scale: 1.05
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </motion.div>
                      <span className="text-xs font-bold text-gray-800 tracking-wide text-center leading-tight">
                        {item.label}
                      </span>
                    </motion.div>
                  </LuxuryRipple>
                </motion.div>
              ))}
            </motion.div>

            {/* Premium Services Quick Access (mobile-first). Hidden on desktop and placed under the right card there. */}
            <div
              className={`transition-all duration-1000 delay-700 lg:hidden ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                  {t("hero.services.title", "Premium Portuguese Services")}
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <a
                    href={ROUTES.londonTours}
                    className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-primary-50 hover:bg-primary-100 transition-all duration-200 hover:scale-105 min-h-[44px] shadow-lg hover:shadow-xl"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                      <MapPinIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 text-center">
                      London Tours
                    </span>
                  </a>
                  <a
                    href={ROUTES.transport}
                    className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary-50 hover:bg-secondary-100 transition-all duration-200 hover:scale-105 min-h-[44px] shadow-lg hover:shadow-xl"
                  >
                    <div className="w-8 h-8 rounded-lg bg-secondary-600 flex items-center justify-center">
                      <ArrowRightIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 text-center">
                      Executive Transport
                    </span>
                  </a>
                  <a
                    href={ROUTES.transport}
                    className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-premium-50 hover:bg-premium-100 transition-all duration-200 hover:scale-105 min-h-[44px] shadow-lg hover:shadow-xl"
                  >
                    <div className="w-8 h-8 rounded-lg bg-premium-600 flex items-center justify-center">
                      <ShieldCheckIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 text-center">
                      Close Protection
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Streamlined CTA Section - Primary action focus */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {/* Primary CTA - Most prominent */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={mounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.8,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <LuxuryRipple
                  className="luxury-btn-primary bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 relative overflow-hidden rounded-2xl text-center min-h-[56px] w-full"
                  onClick={() => window.location.href = ROUTES.events}
                  hapticFeedback="medium"
                  rippleColor="rgba(255, 255, 255, 0.3)"
                >
                  <motion.div
                    className="relative z-10 flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-white"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-secondary-700 via-action-700 to-accent-700 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">{t("hero.cta.primary")}</span>
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRightIcon className="h-6 w-6" />
                    </motion.div>
                  </motion.div>
                </LuxuryRipple>
              </motion.div>

              {/* Secondary CTAs - Smaller, side by side */}
              <motion.div
                className="grid grid-cols-2 gap-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={mounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.9,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <LuxuryRipple
                  className="luxury-btn-secondary relative overflow-hidden rounded-2xl text-center min-h-[48px]"
                  onClick={() => window.location.href = ROUTES.services}
                  hapticFeedback="light"
                  rippleColor="rgba(197, 40, 47, 0.2)"
                >
                  <motion.div
                    className="relative z-10 flex items-center justify-center px-4 py-3 text-sm font-bold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{t("hero.cta.services", "Premium Services")}</span>
                  </motion.div>
                </LuxuryRipple>

                <LuxuryRipple
                  className="luxury-btn-secondary relative overflow-hidden rounded-2xl text-center min-h-[48px]"
                  onClick={() => window.location.href = ROUTES.host}
                  hapticFeedback="light"
                  rippleColor="rgba(197, 40, 47, 0.2)"
                >
                  <motion.div
                    className="relative z-10 flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{t("hero.cta.host")}</span>
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <SparklesIcon className="h-4 w-4" />
                    </motion.div>
                  </motion.div>
                </LuxuryRipple>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Community Showcase */}
          <div
            className={`relative transition-all duration-1000 delay-600 ${
              mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            } self-start lg:-mt-8`}
          >
            {/* Membership Card - More elegant design */}
            <div className="relative z-10 bg-white/25 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40">
              <div className="space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Join the Portuguese-speaking Community
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    From {formatPrice(plans.community.monthly)}/month - Connect
                    with Portuguese speakers across the United Kingdom.
                    Unlimited matches, events, and networking nationwide.
                  </p>
                </div>

                {/* Pricing Section - More elegant presentation */}
                <div className="bg-white/40 rounded-2xl p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary-600">
                      Community Member:
                    </span>
                    <span className="text-lg font-bold text-gray-800">
                      {formatPrice(plans.community.monthly)}/month
                    </span>
                  </div>
                  <div className="w-full h-px bg-gray-200"></div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-premium-600">
                      Cultural Ambassador:
                    </span>
                    <span className="text-lg font-bold text-gray-800">
                      {formatPrice(plans.ambassador.monthly)}/month
                    </span>
                  </div>
                </div>

                {/* Member avatars */}
                <div className="flex justify-center">
                  <div className="flex -space-x-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-full border-3 border-white shadow-lg bg-gradient-to-br from-green-400 via-red-400 to-yellow-400 flex items-center justify-center text-white font-bold text-sm"
                      >
                        {["M", "A", "J", "L"][i]}
                      </div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-3 border-white shadow-lg bg-gradient-to-r from-green-500 to-red-500 flex items-center justify-center text-white text-xs font-bold">
                      +500
                    </div>
                  </div>
                </div>

                {/* Stats - Improved layout */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/50 rounded-2xl p-4 border border-white/30">
                    <div className="text-3xl font-bold text-secondary-600 mb-1">
                      150+
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      Monthly Experiences
                    </div>
                  </div>
                  <div className="bg-white/50 rounded-2xl p-4 border border-white/30">
                    <div className="text-3xl font-bold text-action-600 mb-1">
                      25+
                    </div>
                    <div className="text-sm text-gray-600 font-medium">UK Cities</div>
                  </div>
                </div>

                {/* Quick Social Login */}
                <div className="space-y-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                    Quick Join
                  </div>
                  <SocialLogin mode="signup" />
                </div>
              </div>
            </div>

            {/* Premium Services Quick Access (desktop-only, placed under the membership card) */}
            <div className="hidden lg:block mt-6">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/40 shadow-xl">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                  {t("hero.services.title", "Premium Portuguese Services")}
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <a
                    href={ROUTES.events}
                    className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-action-50 to-action-100 hover:from-action-100 hover:to-action-200 transition-all duration-200 hover:scale-105 min-h-[44px] shadow-lg hover:shadow-xl border border-action-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-action-600 flex items-center justify-center flex-shrink-0">
                      <HeartIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      Explore Events
                    </span>
                  </a>
                  <a
                    href={ROUTES.services}
                    className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-secondary-50 to-secondary-100 hover:from-secondary-100 hover:to-secondary-200 transition-all duration-200 hover:scale-105 min-h-[44px] shadow-lg hover:shadow-xl border border-secondary-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-secondary-600 flex items-center justify-center flex-shrink-0">
                      <ArrowRightIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      Premium Services
                    </span>
                  </a>
                  <a
                    href={ROUTES.host}
                    className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-premium-50 to-premium-100 hover:from-premium-100 hover:to-premium-200 transition-all duration-200 hover:scale-105 min-h-[44px] shadow-lg hover:shadow-xl border border-premium-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-premium-600 flex items-center justify-center flex-shrink-0">
                      <SparklesIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      Host Events
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
