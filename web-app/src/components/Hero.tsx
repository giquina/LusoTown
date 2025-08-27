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
import "../styles/hero-mobile-enhancements.css";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[100vh] md:min-h-screen flex items-center overflow-hidden w-full bg-gradient-to-br from-white via-gray-50 to-secondary-50">
      {/* Background decorative elements - Mobile optimized */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 md:-top-40 md:-right-40 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-br from-accent-200 via-coral-100 to-secondary-100 rounded-full opacity-30 animate-pulse" />
        <div
          className="absolute -bottom-16 -left-16 md:-bottom-32 md:-left-32 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-tr from-secondary-200 via-accent-100 to-action-100 rounded-full opacity-25 animate-bounce"
          style={{ animationDuration: "4s" }}
        />
        {/* Mobile-friendly decorative dots */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 md:w-6 md:h-6 bg-secondary-400 rounded-full opacity-40" />
        <div className="absolute top-3/4 right-1/3 w-2 h-2 md:w-4 md:h-4 bg-accent-400 rounded-full" />
        <div className="absolute bottom-1/3 left-2/3 w-2 h-2 md:w-3 md:h-3 bg-action-400 rounded-full opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-8 relative z-10 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 max-w-full overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Content */}
          <div
            className={`space-y-8 sm:space-y-10 transition-all duration-1000 ${
              mounted
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            {/* Enhanced Lusophone Community Badge - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="portuguese-community-badge inline-flex items-center gap-2 sm:gap-3 rounded-2xl px-3 py-2 sm:px-4 sm:py-3 transition-all duration-300"
            >
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Enhanced Lusophone Flag - More Prominent */}
                <div className="portuguese-flag-enhanced flex items-center gap-1 portuguese-flag-pulse">
                  <span className="text-lg sm:text-xl">🇵🇹</span>
                  <div className="hidden xs:block w-0.5 h-4 bg-gradient-to-b from-red-300 via-amber-300 to-green-300"></div>
                  <span className="text-lg sm:text-xl">🇬🇧</span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-800 tracking-wide">
                  {/* Mobile-friendly text */}
                  <span className="block sm:hidden">Lusophone Community United Kingdom</span>
                  <span className="hidden sm:block">United Kingdom Portuguese-speaking Community</span>
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </motion.div>

            {/* Mobile-Optimized Headlines */}
            <div className="space-y-3 sm:space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="hero-mobile-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-[1.1] sm:leading-tight"
              >
                {/* Mobile-first headline structure */}
                <span className="block sm:inline">
                  <span className="bg-gradient-to-r from-red-600 via-amber-600 to-green-600 bg-clip-text text-transparent">
                    Connect
                  </span>{" "}
                  <span className="text-gray-900">with</span>
                </span>{" "}
                <span className="block sm:inline text-gray-900">
                  Portuguese speakers
                </span>{" "}
                <span className="block sm:inline text-gray-700 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                  across the United Kingdom
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="hero-mobile-subtitle text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl"
              >
                {t('hero.subheadline')}
              </motion.p>
            </div>

            {/* Mobile-Optimized Search Bar */}
            <div
              className={`transition-all duration-1000 delay-400 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <div className="w-full max-w-3xl">
                <SearchBar variant="homepage" className="w-full h-14 sm:h-16" />
                <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center px-2">
                  🔍 Search events, people, or Portuguese businesses
                </p>
              </div>
            </div>

            {/* Mobile-Enhanced Feature Grid - Touch-Optimized */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {[
                {
                  href: ROUTES.events,
                  icon: HeartIcon,
                  label: "DISCOVER EVENTS",
                  mobileLabel: "EVENTS",
                  gradient: "from-action-500 to-action-600",
                  color: "red",
                  delay: 0
                },
                {
                  href: ROUTES.community,
                  icon: UsersIcon,
                  label: "PORTUGUESE COMMUNITY",
                  mobileLabel: "COMMUNITY", 
                  gradient: "from-secondary-500 to-secondary-600",
                  color: "green",
                  delay: 0.1
                },
                {
                  href: ROUTES.groups,
                  icon: SparklesIcon,
                  label: "JOIN GROUPS",
                  mobileLabel: "GROUPS",
                  gradient: "from-accent-500 to-coral-500",
                  color: "yellow",
                  delay: 0.2
                },
                {
                  href: ROUTES.myNetwork,
                  icon: ArrowRightIcon,
                  label: "EXPAND NETWORK",
                  mobileLabel: "NETWORK",
                  gradient: "from-premium-500 to-premium-600",
                  color: "blue",
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
                    className="hero-feature-card hero-mobile-touch-target luxury-glass-card min-h-[80px] sm:min-h-[96px] md:min-h-[104px] cursor-pointer"
                    hapticFeedback="light"
                    rippleColor="rgba(255, 255, 255, 0.4)"
                    onClick={() => window.location.href = item.href}
                  >
                    <motion.div
                      className="flex flex-col items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 h-full"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}
                        whileHover={{ 
                          rotate: [0, -5, 5, 0],
                          scale: 1.05
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <item.icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                      </motion.div>
                      <span className="text-[10px] sm:text-xs font-bold text-gray-800 tracking-wide text-center leading-tight px-1">
                        {/* Responsive label text */}
                        <span className="block sm:hidden">{item.mobileLabel}</span>
                        <span className="hidden sm:block">{item.label}</span>
                      </span>
                    </motion.div>
                  </LuxuryRipple>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile-Enhanced Premium Services - Touch-Optimized */}
            <div
              className={`transition-all duration-1000 delay-700 lg:hidden ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <div className="hero-premium-services bg-white/70 backdrop-blur-lg rounded-3xl p-4 sm:p-5 shadow-xl">
                <div className="text-center mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1">
                    🇵🇹 {t("hero.services.title", "Premium Lusophone Services")}
                  </h3>
                  <p className="text-xs text-gray-600">Luxury experiences for Portuguese speakers</p>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <LuxuryRipple
                    onClick={() => window.location.href = ROUTES.londonTours}
                    className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-150 transition-all duration-300 hover:scale-105 min-h-[70px] sm:min-h-[80px] shadow-lg hover:shadow-xl border border-red-200/50"
                    hapticFeedback="light"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-md">
                      <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-red-800 text-center leading-tight">
                      United Kingdom Tours
                    </span>
                  </LuxuryRipple>

                  <LuxuryRipple
                    onClick={() => window.location.href = ROUTES.transport}
                    className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-150 transition-all duration-300 hover:scale-105 min-h-[70px] sm:min-h-[80px] shadow-lg hover:shadow-xl border border-green-200/50"
                    hapticFeedback="light"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center shadow-md">
                      <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-green-800 text-center leading-tight">
                      Executive Transport
                    </span>
                  </LuxuryRipple>

                  <LuxuryRipple
                    onClick={() => window.location.href = ROUTES.transport}
                    className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-150 transition-all duration-300 hover:scale-105 min-h-[70px] sm:min-h-[80px] shadow-lg hover:shadow-xl border border-amber-200/50"
                    hapticFeedback="light"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-md">
                      <ShieldCheckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-amber-800 text-center leading-tight">
                      Protection
                    </span>
                  </LuxuryRipple>
                </div>
              </div>
            </div>

            {/* Mobile-Enhanced CTA Section - Touch-Optimized */}
            <motion.div
              className="space-y-3 sm:space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {/* Primary CTA - Mobile-Optimized */}
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
                  className="hero-cta-primary-mobile hero-mobile-primary-cta luxury-btn-primary relative overflow-hidden rounded-2xl text-center min-h-[56px] sm:min-h-[60px] w-full shadow-2xl"
                  onClick={() => window.location.href = ROUTES.signup}
                  hapticFeedback="medium"
                  rippleColor="rgba(255, 255, 255, 0.3)"
                >
                  <motion.div
                    className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-4 text-base sm:text-lg font-bold text-white"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-800 to-red-900 opacity-0 rounded-2xl"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      🇵🇹 {t("hero.cta.primary", "Join FREE")}
                    </span>
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </motion.div>
                  </motion.div>
                </LuxuryRipple>
              </motion.div>

              {/* Secondary CTAs - Mobile Stack on Small Screens */}
              <motion.div
                className="flex flex-col sm:grid sm:grid-cols-2 gap-2 sm:gap-3"
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
                  className="luxury-btn-secondary bg-white/90 backdrop-blur-sm border-2 border-red-200 hover:border-red-300 relative overflow-hidden rounded-2xl text-center min-h-[48px] sm:min-h-[52px] shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.location.href = ROUTES.services}
                  hapticFeedback="light"
                  rippleColor="rgba(197, 40, 47, 0.1)"
                >
                  <motion.div
                    className="relative z-10 flex items-center justify-center gap-2 px-4 py-3 text-sm sm:text-base font-bold text-red-700"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>🏆 {t("hero.cta.services", "Premium Services")}</span>
                  </motion.div>
                </LuxuryRipple>

                <LuxuryRipple
                  className="luxury-btn-secondary bg-white/90 backdrop-blur-sm border-2 border-green-200 hover:border-green-300 relative overflow-hidden rounded-2xl text-center min-h-[48px] sm:min-h-[52px] shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.location.href = ROUTES.host}
                  hapticFeedback="light"
                  rippleColor="rgba(0, 168, 89, 0.1)"
                >
                  <motion.div
                    className="relative z-10 flex items-center justify-center gap-2 px-4 py-3 text-sm sm:text-base font-bold text-green-700"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{t("hero.cta.host", "Create Magic")}</span>
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <SparklesIcon className="h-4 w-4" />
                    </motion.div>
                  </motion.div>
                </LuxuryRipple>
              </motion.div>
              
              {/* Mobile-Specific Trust Indicators */}
              <motion.div
                className="hero-trust-indicators"
                initial={{ opacity: 0 }}
                animate={mounted ? { opacity: 0.8 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <div className="hero-trust-indicator">
                  <div className="hero-trust-dot green"></div>
                  <span>{t('hero.trust.members', 'Active Members')}</span>
                </div>
                <div className="hero-trust-indicator">
                  <div className="hero-trust-dot red"></div>
                  <span>{t('hero.trust.nationwide', 'United Kingdom-Wide')}</span>
                </div>
                <div className="hero-trust-indicator">
                  <div className="hero-trust-dot gold"></div>
                  <span>{t('hero.trust.culture', 'Lusophone Culture')}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Mobile-Optimized Community Showcase */}
          <div
            className={`relative transition-all duration-1000 delay-600 ${
              mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            } self-start lg:-mt-8 mt-8 lg:mt-0`}
          >
            {/* Mobile-Enhanced Membership Card */}
            <div className="hero-membership-card-mobile relative z-10 rounded-3xl p-5 sm:p-6 lg:p-8 shadow-2xl">
              <div className="space-y-6 sm:space-y-7 lg:space-y-8">
                {/* Mobile-Optimized Header Section */}
                <div className="text-center space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl">🇵🇹</span>
                    <div className="w-px h-6 bg-gray-400"></div>
                    <span className="text-2xl">🇬🇧</span>
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 leading-tight">
                    Join the Portuguese-speaking Community
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-2">
                    From <span className="font-bold text-red-600">{formatPrice(plans.community.monthly)}/month</span> - Connect
                    with Portuguese speakers across the United Kingdom.
                    <span className="block mt-1 text-xs sm:text-sm text-gray-500">
                      Unlimited matches, events, and networking nationwide.
                    </span>
                  </p>
                </div>

                {/* Mobile-Optimized Pricing Section */}
                <div className="bg-white/50 rounded-2xl p-4 sm:p-5 lg:p-6 space-y-3 border border-white/30">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-red-600 text-sm sm:text-base">
                      Community Member:
                    </span>
                    <span className="text-base sm:text-lg font-bold text-gray-800">
                      {formatPrice(plans.community.monthly)}/mo
                    </span>
                  </div>
                  <div className="w-full h-px bg-gradient-to-r from-red-200 via-gray-200 to-green-200"></div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-green-600 text-sm sm:text-base">
                      Cultural Ambassador:
                    </span>
                    <span className="text-base sm:text-lg font-bold text-gray-800">
                      {formatPrice(plans.ambassador.monthly)}/mo
                    </span>
                  </div>
                </div>

                {/* Mobile-Enhanced Member Avatars */}
                <div className="flex justify-center">
                  <div className="flex -space-x-2 sm:-space-x-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 sm:border-3 border-white shadow-lg bg-gradient-to-br from-green-400 via-red-400 to-yellow-400 flex items-center justify-center text-white font-bold text-xs sm:text-sm"
                      >
                        {["M", "A", "J", "L"][i]}
                      </div>
                    ))}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 sm:border-3 border-white shadow-lg bg-gradient-to-r from-green-500 to-red-500 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">
                      {t('hero.stats.more', '+more')}
                    </div>
                  </div>
                </div>

                {/* Mobile-Enhanced Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                  <div className="bg-white/60 rounded-2xl p-3 sm:p-4 border border-white/40 shadow-sm">
                    <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">
                      {t('hero.stats.events', 'Many')}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium leading-tight">
                      {t('hero.stats.events_label', 'Monthly Events')}
                    </div>
                  </div>
                  <div className="bg-white/60 rounded-2xl p-3 sm:p-4 border border-white/40 shadow-sm">
                    <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1">
                      {t('hero.stats.cities', 'Many')}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium leading-tight">{t('hero.stats.cities_label', 'United Kingdom Cities')}</div>
                  </div>
                </div>

                {/* Mobile-Optimized Social Login */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                    🚀 Quick Join - Start Today
                  </div>
                  <div className="px-2">
                    <SocialLogin mode="signup" />
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 px-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span>Free to start connecting</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Services Quick Access (desktop-only, placed under the membership card) */}
            <div className="hidden lg:block mt-6">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/40 shadow-xl">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                  {t("hero.services.title", "Premium Lusophone Services")}
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
