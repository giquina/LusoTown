"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  UserIcon,
  ChevronDownIcon,
  MapPinIcon,
  BriefcaseIcon,
  UserGroupIcon,
  TrophyIcon,
  CalendarDaysIcon,
  CurrencyPoundIcon,
} from "@heroicons/react/24/outline";
import { Crown, LogOut } from "lucide-react";
// import { authService, User } from '@/lib/auth'
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import LanguageToggle from "@/components/LanguageToggle";
import CartButton from "@/components/CartButton";
import SavedItemsButton from "@/components/SavedItemsButton";
import SearchBar from "@/components/SearchBar";
import NotificationBell from "@/components/NotificationBell";
import { useLanguage } from "@/context/LanguageContext";
import { ROUTES } from "@/config/routes";
import { LuxuryRipple } from "@/components/LuxuryMobileInteraction";
import { EliteMobileHeader } from "@/components/EliteMobileInterface";
import { MobileNavButton } from "@/components/MobileNavigation";

// New simplified main navigation for the redesigned structure
const getMainNavigationLinks = (t: any) => [
  {
    name: t("nav.whats_happening", "What's Happening"),
    href: ROUTES.events,
    description: "Discover events, activities, and community happenings",
  },
];

// Community dropdown links - action-oriented
const getCommunityDropdownLinks = (t: any) => [
  {
    name: t("nav.book_events", "Book Events"),
    href: ROUTES.events,
    description: t(
      "nav.book_events_desc",
      "Purchase tickets for Lusophone cultural events, festivals, and community gatherings"
    ),
    icon: CalendarDaysIcon,
    iconColor: "text-primary-500",
  },
  {
    name: t("nav.join_cultural_tours", "Join Cultural Tours"),
    href: ROUTES.londonTours,
    description: t(
      "nav.join_cultural_tours_desc",
      "Experience London's Portuguese culture with guided tours and local experiences"
    ),
    icon: MapPinIcon,
    iconColor: "text-green-500",
  },
  {
    name: t("nav.find_student_groups", "Find Student Groups"),
    href: "/students",
    description: t(
      "nav.find_student_groups_desc",
      "Connect with Portuguese-speaking students across UK universities"
    ),
    icon: UserGroupIcon,
    iconColor: "text-purple-500",
  },
  {
    name: t("nav.meet_portuguese_speakers", "Meet Lusophone Speakers"),
    href: ROUTES.directory,
    description: t(
      "nav.meet_portuguese_speakers_desc",
      "Explore our community directory and connect with members"
    ),
    icon: UserGroupIcon,
    iconColor: "text-orange-500",
  },
  {
    name: t("nav.see_event_calendar", "See Event Calendar"),
    href: `${ROUTES.events}?view=calendar`,
    description: t(
      "nav.see_event_calendar_desc",
      "Full calendar view of all upcoming Lusophone community events"
    ),
    icon: CalendarDaysIcon,
    iconColor: "text-red-500",
  },
];

// For Business dropdown links - action-oriented
const getForBusinessDropdownLinks = (t: any) => [
  {
    name: t("nav.discover_businesses", "Discover Businesses"),
    href: ROUTES.businessDirectory,
    description: t(
      "nav.discover_businesses_desc",
      "Browse Portuguese businesses, restaurants, and services across the UK"
    ),
    icon: BriefcaseIcon,
    iconColor: "text-primary-500",
  },
  {
    name: t("nav.list_your_business", "List Your Business"),
    href: `${ROUTES.businessDirectory}?action=add`,
    description: t(
      "nav.list_your_business_desc",
      "Add your business to our directory and reach Lusophone customers"
    ),
    icon: BriefcaseIcon,
    iconColor: "text-green-500",
  },
  {
    name: t("nav.find_portuguese_customers", "Find Lusophone Customers"),
    href: `${ROUTES.businessNetworking}?type=customers`,
    description: t(
      "nav.find_portuguese_customers_desc",
      "Connect with the Portuguese-speaking community for business growth"
    ),
    icon: UserGroupIcon,
    iconColor: "text-purple-500",
  },
  {
    name: t("nav.see_pricing_plans", "See Pricing Plans"),
    href: ROUTES.pricing,
    description: t(
      "nav.see_pricing_plans_desc",
      "Explore membership options and business advertising packages"
    ),
    icon: CurrencyPoundIcon,
    iconColor: "text-yellow-500",
  },
  {
    name: t("nav.get_market_insights", "Get Market Insights"),
    href: `${ROUTES.businessNetworking}?section=insights`,
    description: t(
      "nav.get_market_insights_desc",
      "Access data and trends about the Portuguese-speaking market in the UK"
    ),
    icon: TrophyIcon,
    iconColor: "text-indigo-500",
  },
];

// Footer-only links (includes the removed navigation items)
const getFooterOnlyLinks = (t: any) => [
  {
    name: t("footer.neighborhood-groups", "Neighborhood Groups"),
    href: ROUTES.neighborhoodGroups,
  },
  { name: "Premium Services", href: ROUTES.services },
  { name: "Community Chat", href: ROUTES.forums },
  // Add Cultural Tools and Housing Assistance when those pages are more developed
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);
  const [showForBusinessDropdown, setShowForBusinessDropdown] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    // Auth temporarily disabled for demo
    // const currentUser = authService.getCurrentUser()
    // setUser(currentUser)
    // const unsubscribe = authService.onAuthStateChange((newUser) => {
    //   setUser(newUser)
    // })
    // return unsubscribe
  }, []);

  const handleLogout = async () => {
    // Auth temporarily disabled for demo
    setShowUserMenu(false);
    router.push("/");
  };

  const getMembershipBadge = (tier: string) => {
    const badges = {
      free: {
        icon: <UserCircleIcon className="w-4 h-4" />,
        color: "text-gray-600",
        label: "Free",
      },
      core: {
        icon: <HeartIcon className="w-4 h-4" />,
        color: "text-coral-600",
        label: "Core",
      },
      premium: {
        icon: <Crown className="w-4 h-4" />,
        color: "text-premium-600",
        label: "Premium",
      },
    };
    return badges[tier as keyof typeof badges] || badges.free;
  };

  const mainNavigationLinks = getMainNavigationLinks(t);
  const communityDropdownLinks = getCommunityDropdownLinks(t);
  const forBusinessDropdownLinks = getForBusinessDropdownLinks(t);

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] bg-white/95 backdrop-blur-md border-b border-gray-200/60 min-h-[80px] lg:min-h-[88px] shadow-lg shadow-gray-900/5">
      <nav className="container-width" aria-label="Top">
        <div className="flex items-center justify-between py-3 sm:py-4 lg:py-5 gap-2 sm:gap-4">
          {/* Logo - Premium design with sophisticated hover effects */}
          <motion.div
            className="flex items-center flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <a href={ROUTES.home} className="flex items-center group">
              <div className="relative">
                <Logo size="compact" animated />
                {/* Premium glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-premium-400/20 to-secondary-400/20 blur-lg"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </a>
          </motion.div>

          {/* Desktop Navigation - New Redesigned Structure */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 ml-4 xl:ml-8">
            {/* What's Happening - Main Discovery Link */}
            {mainNavigationLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="relative text-gray-600 hover:text-primary-600 px-3 py-3 rounded-md text-sm font-medium transition-all duration-300 group min-h-[44px] flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="relative z-10">{link.name}</span>
                {/* Premium underline effect */}
                <motion.div
                  className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Subtle background hover effect */}
                <motion.div
                  className="absolute inset-0 bg-primary-50 rounded-md"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}

            {/* Community Dropdown */}
            <div
              className="relative dropdown-container"
              onMouseEnter={() => setShowCommunityDropdown(true)}
              onMouseLeave={() => setShowCommunityDropdown(false)}
            >
              <motion.button
                className="relative text-gray-600 hover:text-primary-600 px-3 py-3 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-1 group min-h-[44px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="relative z-10">
                  {t("nav.community", "Community")}
                </span>
                <motion.div
                  animate={{ rotate: showCommunityDropdown ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  <ChevronDownIcon className="w-4 h-4" />
                </motion.div>
                {/* Premium background hover effect */}
                <motion.div
                  className="absolute inset-0 bg-primary-50 rounded-md"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>

              <AnimatePresence>
                {showCommunityDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                    className="absolute top-full mt-2 w-[min(56rem,calc(100vw-2rem))] bg-white rounded-2xl shadow-2xl border border-gray-200 py-8 z-[9998]"
                    style={{ left: '50%', transform: 'translateX(-50%)' }}
                  >
                    <div className="px-8">
                      <h3 className="text-lg font-semibold mb-6 text-primary-600 text-center">
                        {t("nav.community_actions", "Community Actions")}
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {communityDropdownLinks.map((link, index) => (
                          <motion.a
                            key={link.name}
                            href={link.href}
                            className="block p-4 text-gray-600 hover:text-primary-600 hover:bg-primary-50/80 transition-all duration-300 rounded-xl border border-gray-100/80 hover:border-primary-200 hover:shadow-lg group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <motion.div
                                className={`group-hover:scale-110 transition-transform duration-300`}
                                whileHover={{ rotate: 5 }}
                              >
                                <link.icon
                                  className={`w-5 h-5 ${link.iconColor}`}
                                />
                              </motion.div>
                              <div className="font-semibold text-sm group-hover:text-primary-700 transition-colors duration-300">
                                {link.name}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                              {link.description}
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* For Business Dropdown */}
            <div
              className="relative dropdown-container"
              onMouseEnter={() => setShowForBusinessDropdown(true)}
              onMouseLeave={() => setShowForBusinessDropdown(false)}
            >
              <motion.button
                className="relative text-gray-600 hover:text-secondary-600 px-3 py-3 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-1 group min-h-[44px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="relative z-10">
                  {t("nav.for_business", "For Business")}
                </span>
                <motion.div
                  animate={{ rotate: showForBusinessDropdown ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  <ChevronDownIcon className="w-4 h-4" />
                </motion.div>
                {/* Premium background hover effect */}
                <motion.div
                  className="absolute inset-0 bg-secondary-50 rounded-md"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>

              <AnimatePresence>
                {showForBusinessDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                    className="absolute top-full mt-2 w-[min(56rem,calc(100vw-2rem))] bg-white rounded-2xl shadow-2xl border border-gray-200 py-8 z-[9998]"
                    style={{ left: '50%', transform: 'translateX(-50%)' }}
                  >
                    <div className="px-8">
                      <h3 className="text-lg font-semibold mb-6 text-secondary-600 text-center">
                        {t("nav.business_solutions", "Business Solutions")}
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {forBusinessDropdownLinks.map((link, index) => (
                          <motion.a
                            key={link.name}
                            href={link.href}
                            className="block p-4 text-gray-600 hover:text-secondary-600 hover:bg-secondary-50/80 transition-all duration-300 rounded-xl border border-gray-100/80 hover:border-secondary-200 hover:shadow-lg group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <motion.div
                                className={`group-hover:scale-110 transition-transform duration-300`}
                                whileHover={{ rotate: 5 }}
                              >
                                <link.icon
                                  className={`w-5 h-5 ${link.iconColor}`}
                                />
                              </motion.div>
                              <div className="font-semibold text-sm group-hover:text-secondary-700 transition-colors duration-300">
                                {link.name}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                              {link.description}
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Find Your Match - Heart Icon */}
            <motion.a
              href={ROUTES.matches}
              className="relative text-gray-600 hover:text-red-600 px-3 py-3 rounded-md text-sm font-medium transition-all duration-300 group min-h-[44px] flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="text-red-500 group-hover:text-red-600"
                whileHover={{ scale: 1.2 }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                💗
              </motion.div>
              <span className="relative z-10">
                {t("nav.find_your_match", "Find Your Match")}
              </span>
              {/* Premium background hover effect */}
              <motion.div
                className="absolute inset-0 bg-red-50 rounded-md"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              {/* Premium underline effect */}
              <motion.div
                className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-red-400 to-pink-400 rounded-full"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </div>

          {/* Desktop CTA / User Menu */}
          <div className="hidden lg:flex items-center gap-2 lg:gap-3 flex-shrink-0">
            <SearchBar variant="header" />
            <NotificationBell className="hidden md:block" showDropdown />
            <LanguageToggle />
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px]"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-action-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </div>
                  <div className="text-left min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {user.name.split(" ")[0]}
                    </div>
                    <div className="flex items-center gap-1">
                      {getMembershipBadge(user.membershipTier).icon}
                      <span
                        className={`text-xs ${
                          getMembershipBadge(user.membershipTier).color
                        } whitespace-nowrap`}
                      >
                        {getMembershipBadge(user.membershipTier).label}
                      </span>
                    </div>
                  </div>
                </button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-[9997]"
                    >
                      <a
                        href={`/profile/${user.id}`}
                        className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 min-h-[44px]"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <UserIcon className="w-4 h-4" />
                        <span>My Profile</span>
                      </a>
                      <a
                        href={ROUTES.favorites}
                        className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 min-h-[44px]"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <HeartIcon className="w-4 h-4" />
                        <span>My Favourites</span>
                      </a>
                      <a
                        href={ROUTES.dashboard}
                        className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 min-h-[44px]"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <UserCircleIcon className="w-4 h-4" />
                        <span>Dashboard</span>
                      </a>
                      {user.role === "admin" && (
                        <a
                          href={ROUTES.admin}
                          className="flex items-center space-x-2 px-4 py-3 text-sm text-premium-700 hover:bg-premium-50 min-h-[44px]"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <ShieldCheckIcon className="w-4 h-4" />
                          <span>Admin Panel</span>
                        </a>
                      )}
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-3 text-sm text-action-700 hover:bg-action-50 text-left min-h-[44px]"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <a
                  href={ROUTES.login}
                  className="text-gray-600 hover:text-primary-600 p-3 rounded-md transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  title="Login"
                >
                  <UserIcon className="w-5 h-5" />
                </a>
                <motion.a
                  href={ROUTES.apply}
                  className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white font-bold py-3 px-4 lg:px-6 rounded-lg shadow-lg hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 hover:shadow-xl transition-all duration-300 whitespace-nowrap min-h-[44px] flex items-center text-sm relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {/* Premium shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10 hidden lg:inline">
                    Apply for Membership
                  </span>
                  <span className="relative z-10 lg:hidden">APPLY</span>
                </motion.a>
              </>
            )}
          </div>

          {/* Mobile menu button - Optimized for Portuguese-speaking community */}
          <div className="flex lg:hidden items-center gap-1 relative z-[10000] flex-shrink-0">
            {/* Only show notifications when user is signed in */}
            {user && (
              <>
                <NotificationBell className="md:hidden" />
              </>
            )}
            <LanguageToggle />
            <MobileNavButton
              data-testid="mobile-menu-button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open main menu"}
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>
        </div>

        {/* Mobile Navigation - Enhanced with proper z-index layering */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Mobile menu backdrop - Higher z-index for proper layering */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-md z-[9998] xl:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Mobile menu content - Highest z-index with enhanced styling */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ 
                  duration: 0.4, 
                  ease: [0.215, 0.61, 0.355, 1],
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
                className="xl:hidden fixed top-[80px] left-2 right-2 z-[9999] bg-white/98 backdrop-blur-xl border border-primary-200/50 shadow-2xl rounded-2xl mx-0 mb-2 max-h-[85vh] overflow-y-auto"
                style={{
                  boxShadow: '0 25px 50px rgba(197, 40, 47, 0.15), 0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="px-4 pt-6 pb-4 space-y-2">
                  {/* Quick Actions Section */}
                  <div className="pb-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <SavedItemsButton className="flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 mb-1">
                            {t("favorites.title", "Saved Items")}
                          </h4>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {t(
                              "favorites.description",
                              "Access your favorite events, places, and services. Keep track of what interests you most."
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* What's Happening - Priority Link */}
                  <div className="pb-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-primary-600 mb-3">
                      {t("nav.discover", "Discover")}
                    </h3>
                    <motion.a
                      href={ROUTES.events}
                      className="text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 border border-transparent hover:border-primary-200 min-h-[56px] flex items-center gap-3 luxury-touch-target"
                      onClick={() => setMobileMenuOpen(false)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <CalendarDaysIcon className="w-5 h-5 text-primary-500" />
                      <span>
                        {t("nav.whats_happening", "What's Happening")}
                      </span>
                    </motion.a>
                  </div>

                  {/* Find Your Match - Heart Icon */}
                  <div className="pb-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-red-600 mb-3">
                      {t("nav.dating", "Dating")}
                    </h3>
                    <motion.a
                      href={ROUTES.matches}
                      className="text-gray-700 hover:text-red-600 hover:bg-red-50 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 border border-transparent hover:border-red-200 min-h-[56px] flex items-center gap-3 luxury-touch-target"
                      onClick={() => setMobileMenuOpen(false)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <span className="text-red-500 text-lg">💗</span>
                      <span>{t("nav.find_your_match", "Find Your Match")}</span>
                    </motion.a>
                  </div>

                  {/* Community Actions for Mobile */}
                  <div className="pb-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-primary-600 mb-3">
                      {t("nav.community_actions", "Community Actions")}
                    </h3>
                    {communityDropdownLinks.map((link, index) => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        className="text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 border border-transparent hover:border-primary-200 min-h-[56px] flex items-center gap-3 luxury-touch-target"
                        onClick={() => setMobileMenuOpen(false)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, type: "spring", stiffness: 400, damping: 25 }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <link.icon className={`w-5 h-5 ${link.iconColor} transition-transform duration-300 group-hover:scale-110`} />
                        <span>{link.name}</span>
                      </motion.a>
                    ))}
                  </div>

                  {/* For Business for Mobile */}
                  <div className="pb-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-secondary-600 mb-3">
                      {t("nav.business_solutions", "Business Solutions")}
                    </h3>
                    {forBusinessDropdownLinks.map((link, index) => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        className="text-gray-700 hover:text-secondary-600 hover:bg-secondary-50 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 border border-transparent hover:border-secondary-200 min-h-[56px] flex items-center gap-3 luxury-touch-target group"
                        onClick={() => setMobileMenuOpen(false)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, type: "spring", stiffness: 400, damping: 25 }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <link.icon className={`w-5 h-5 ${link.iconColor} transition-transform duration-300 group-hover:scale-110`} />
                        <span>{link.name}</span>
                      </motion.a>
                    ))}
                  </div>

                  {/* Additional Links */}
                  <div className="pb-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-600 mb-3">
                      {t("nav.more", "More")}
                    </h3>
                    <motion.a
                      href={ROUTES.about}
                      className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 border border-transparent hover:border-gray-200 min-h-[56px] flex items-center luxury-touch-target"
                      onClick={() => setMobileMenuOpen(false)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t("nav.about", "About Us")}
                    </motion.a>
                    <motion.a
                      href={ROUTES.pricing}
                      className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 border border-transparent hover:border-gray-200 min-h-[56px] flex items-center luxury-touch-target"
                      onClick={() => setMobileMenuOpen(false)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t("nav.pricing", "Pricing")}
                    </motion.a>
                  </div>

                  {/* User Section */}
                  <div className="border-t border-primary-100 pt-4 pb-3">
                    {user ? (
                      <>
                        <div className="flex items-center px-3 pb-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-action-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                            {user.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-base font-medium text-gray-800 truncate">
                              {user.name}
                            </div>
                            <div className="flex items-center space-x-1">
                              {getMembershipBadge(user.membershipTier).icon}
                              <span
                                className={`text-sm ${
                                  getMembershipBadge(user.membershipTier).color
                                } whitespace-nowrap`}
                              >
                                {getMembershipBadge(user.membershipTier).label}{" "}
                                Member
                              </span>
                            </div>
                          </div>
                        </div>

                        <a
                          href={`/profile/${user.id}`}
                          className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-primary-200 min-h-[44px]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <UserIcon className="w-5 h-5" />
                          <span>My Profile</span>
                        </a>
                        <a
                          href={ROUTES.favorites}
                          className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-primary-200 min-h-[44px]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <HeartIcon className="w-5 h-5" />
                          <span>My Favourites</span>
                        </a>

                        <a
                          href={ROUTES.dashboard}
                          className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-primary-200 min-h-[44px]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <UserCircleIcon className="w-5 h-5" />
                          <span>Dashboard</span>
                        </a>

                        {user.role === "admin" && (
                          <a
                            href={ROUTES.admin}
                            className="flex items-center space-x-3 text-premium-600 hover:text-premium-700 hover:bg-premium-50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-premium-200 min-h-[44px]"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <ShieldCheckIcon className="w-5 h-5" />
                            <span>Admin Panel</span>
                          </a>
                        )}

                        <button
                          onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                          }}
                          className="flex items-center space-x-3 text-action-600 hover:text-action-700 hover:bg-action-50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 w-full text-left border border-transparent hover:border-action-200 min-h-[44px]"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Sign Out</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <a
                          href={ROUTES.login}
                          className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-primary-200 min-h-[44px]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <UserIcon className="w-5 h-5" />
                          <span>Log In</span>
                        </a>
                        <div className="mt-4 px-0">
                          <a
                            href={ROUTES.signup}
                            className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 hover:shadow-xl transform hover:scale-[1.02] active:scale-95 transition-all duration-200 w-full text-center min-h-[44px] flex items-center justify-center"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span className="text-base">
                              {"Apply for Membership".toUpperCase()}
                            </span>
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
