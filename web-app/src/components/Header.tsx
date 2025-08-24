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
  EnvelopeIcon,
  MusicalNoteIcon,
  BriefcaseIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  FireIcon,
  PaintBrushIcon,
  TrophyIcon,
  CalendarDaysIcon,
  TruckIcon,
  TvIcon,
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
import { ROUTES } from '@/config/routes';
import { LuxuryRipple } from "@/components/LuxuryMobileInteraction";
import { EliteMobileHeader } from "@/components/EliteMobileInterface";
import MobileNavigation, { MobileNavButton } from "@/components/MobileNavigation";

const getNavigationLinks = (t: any) => [
  { name: t("nav.whats_on", "What's On"), href: "/events" },
  { name: t("nav.discover_businesses", "Discover Businesses"), href: ROUTES.businessDirectory },
  { name: t("nav.matches", "Matches"), href: ROUTES.matches },
  { name: t("nav.discover_students", "Discover Student Life"), href: "/students" },
  { name: t("nav.pricing", "Pricing"), href: "/pricing" },
];

const getAuthenticatedNavigationLinks = (t: any) => [
  { name: t("nav.whats_on", "What's On"), href: "/events" },
  { name: t("nav.discover_businesses", "Discover Businesses"), href: ROUTES.businessDirectory },
  { name: t("nav.matches", "Matches"), href: ROUTES.matches },
  { name: t("nav.discover_students", "Discover Student Life"), href: "/students" },
  { name: t("referral.title", "Referrals"), href: "/referrals" },
  { name: t("nav.pricing", "Pricing"), href: "/pricing" },
];

// Tours dropdown links
const getToursDropdownLinks = (t: any) => [
  { 
    name: t("nav.london-tours", "London Tours"), 
    href: ROUTES.londonTours,
    description: t("nav.london-tours-desc", "Portuguese-guided tours of Westminster, Camden Market, Tower Bridge & London attractions"),
    icon: MapPinIcon,
    iconColor: "text-primary-500"
  },
  { 
    name: t("nav.london-transport", "London Transport"), 
    href: ROUTES.transport,
    description: t("nav.london-transport-desc", "Airport transfers, London city rides with verified Portuguese-speaking drivers"),
    icon: TruckIcon,
    iconColor: "text-secondary-500"
  },
];

// Events dropdown links
const getEventsDropdownLinks = (t: any) => [
  { 
    name: t("nav.cultural-events", "Cultural Events"), 
    href: `${ROUTES.events}?category=Cultural`,
    description: t("nav.cultural-events-desc", "Music nights in Camden, cultural celebrations in Stockwell, festivals for Portuguese speakers across London & United Kingdom"),
    icon: MusicalNoteIcon,
    iconColor: "text-purple-500"
  },
  { 
    name: t("palop.events.independence.celebrations", "PALOP Independence Celebrations"), 
    href: `${ROUTES.events}?category=PALOP`,
    description: "🇦🇴 🇨🇻 🇬🇼 🇲🇿 🇸🇹 - Angola, Cape Verde, Guinea-Bissau, Mozambique, São Tomé independence festivals & cultural celebrations",
    icon: TrophyIcon,
    iconColor: "text-orange-500"
  },
  { 
    name: t("nav.business-networking", "Business Networking"), 
    href: ROUTES.businessNetworking,
    description: t("nav.business-networking-desc", "Professional meetups for Portuguese speakers in London, startup events, United Kingdom career workshops"),
    icon: BriefcaseIcon,
    iconColor: "text-blue-500"
  },
  { 
    name: t("nav.social-meetups", "Social Meetups"), 
    href: `${ROUTES.events}?category=Social`,
    description: t("nav.social-meetups-desc", "Portuguese-speaking community gatherings in London pubs, United Kingdom social events, weekend meetups"),
    icon: UserGroupIcon,
    iconColor: "text-green-500"
  },
  { 
    name: t("nav.portuguese-language", "Portuguese Language"), 
    href: `${ROUTES.events}?category=Language`,
    description: t("nav.portuguese-language-desc", "Portuguese conversation groups in London, language practice sessions across United Kingdom cities"),
    icon: ChatBubbleLeftRightIcon,
    iconColor: "text-orange-500"
  },
  { 
    name: t("nav.food-dining", "Food & Dining"), 
    href: `${ROUTES.events}?category=Food`,
    description: t("nav.food-dining-desc", "Cooking classes in London, wine tastings, dining experiences at United Kingdom restaurants"),
    icon: FireIcon,
    iconColor: "text-red-500"
  },
  { 
    name: t("nav.arts-entertainment", "Arts & Entertainment"), 
    href: `${ROUTES.events}?category=Arts`,
    description: t("nav.arts-entertainment-desc", "Live music in London venues, cultural shows, art exhibitions across the United Kingdom"),
    icon: PaintBrushIcon,
    iconColor: "text-pink-500"
  },
  { 
    name: t("nav.sports-fitness", "Sports & Fitness"), 
    href: `${ROUTES.events}?category=Sports`,
    description: t("nav.sports-fitness-desc", "Football viewing parties in London pubs, sports clubs, fitness groups across United Kingdom"),
    icon: TrophyIcon,
    iconColor: "text-yellow-500"
  },
  { 
    name: t("nav.all-events", "All Events"), 
    href: ROUTES.events,
    description: t("nav.all-events-desc", "Complete calendar of events for Portuguese speakers happening across London & the United Kingdom"),
    icon: CalendarDaysIcon,
    iconColor: "text-indigo-500"
  },
];

// Simplified navigation dropdown links - Services & Community only
const getMoreDropdownLinks = (t: any) => ({
  services: [
    { 
      name: "Find Your Match", 
      href: ROUTES.matches,
      description: "Connect with Portuguese speakers throughout the United Kingdom who share your interests and lifestyle",
      icon: HeartIcon,
      iconColor: "text-red-500"
    },
    { 
      name: t("palop.business.directory.title", "PALOP Business Directory"), 
      href: `${ROUTES.businessDirectory}?filter=palop`,
      description: "🇦🇴🇨🇻🇬🇼🇲🇿🇸🇹 - Discover businesses from Angola, Cape Verde, Guinea-Bissau, Mozambique, São Tomé entrepreneurs in the UK",
      icon: BriefcaseIcon,
      iconColor: "text-orange-500"
    },
    { 
      name: "Live TV", 
      href: ROUTES.tv,
      description: "Watch shows for Portuguese speakers, United Kingdom business workshops, and cultural content from London",
      icon: TvIcon,
      iconColor: "text-purple-500"
    },
    { 
      name: "Streaming Income", 
      href: ROUTES.live,
      description: "Monetize your expertise through live streaming - create content and earn revenue",
      icon: CurrencyPoundIcon,
      iconColor: "text-green-500"
    },
  ],
  company: [
    { name: "About Us", href: ROUTES.about },
    { name: "Careers", href: ROUTES.careers },
    { name: "Case Studies", href: ROUTES.caseStudies },
    { name: "Success Stories", href: ROUTES.successStories },
  ],
  legal: [
    { name: "Privacy Policy", href: ROUTES.privacy },
    { name: "Terms of Service", href: ROUTES.terms },
  ],
});

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
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showToursDropdown, setShowToursDropdown] = useState(false);
  const [showEventsDropdown, setShowEventsDropdown] = useState(false);
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

  const navigationLinks = user
    ? getAuthenticatedNavigationLinks(t)
    : getNavigationLinks(t);

  const moreDropdownLinks = getMoreDropdownLinks(t);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/60 min-h-[80px] lg:min-h-[88px] shadow-lg shadow-gray-900/5">
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

          {/* Desktop Navigation - Premium with sophisticated micro-interactions */}
          <div className="hidden xl:flex items-center space-x-4 xl:space-x-6 ml-4 xl:ml-8">
            {navigationLinks.map((link) => (
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

            {/* Events Dropdown - Premium with sophisticated animations */}
            <div
              className="relative"
              onMouseEnter={() => setShowEventsDropdown(true)}
              onMouseLeave={() => setShowEventsDropdown(false)}
            >
              <motion.button 
                className="relative text-gray-600 hover:text-primary-600 px-3 py-3 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-1 group min-h-[44px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="relative z-10">{t("nav.events", "Events")}</span>
                <motion.div
                  animate={{ rotate: showEventsDropdown ? 180 : 0 }}
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
                {showEventsDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[1000px] max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/60 py-8 z-50"
                    style={{
                      left: "50%",
                      transform: "translateX(-50%)",
                      maxWidth: "calc(100vw - 2rem)",
                      marginLeft: "max(-500px, calc(-50vw + 1rem))",
                      marginRight: "max(-500px, calc(-50vw + 1rem))",
                    }}
                  >
                    <div className="grid grid-cols-4 gap-4 px-8">
                      {getEventsDropdownLinks(t).map((link, index) => (
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
                              <link.icon className={`w-5 h-5 ${link.iconColor}`} />
                            </motion.div>
                            <div className="font-semibold text-sm group-hover:text-primary-700 transition-colors duration-300">{link.name}</div>
                          </div>
                          <div className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">{link.description}</div>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tours Dropdown - Premium with sophisticated animations */}
            <div
              className="relative"
              onMouseEnter={() => setShowToursDropdown(true)}
              onMouseLeave={() => setShowToursDropdown(false)}
            >
              <motion.button 
                className="relative text-gray-600 hover:text-secondary-600 px-3 py-3 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-1 group min-h-[44px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="relative z-10">{t("nav.tours", "Tours")}</span>
                <motion.div
                  animate={{ rotate: showToursDropdown ? 180 : 0 }}
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
                {showToursDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[1000px] max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-gray-200 py-6 z-50"
                    style={{
                      left: "50%",
                      transform: "translateX(-50%)",
                      maxWidth: "calc(100vw - 2rem)",
                      marginLeft: "max(-500px, calc(-50vw + 1rem))",
                      marginRight: "max(-500px, calc(-50vw + 1rem))",
                    }}
                  >
                    <div className="grid grid-cols-3 gap-4 px-6">
                      {getToursDropdownLinks(t).map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          className="block p-4 text-gray-600 hover:text-secondary-600 hover:bg-secondary-50 transition-colors duration-200 rounded-lg border border-gray-100 hover:border-secondary-200"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {link.icon && <link.icon className={`w-5 h-5 ${link.iconColor}`} />}
                            <span className="font-medium text-sm">{link.name}</span>
                          </div>
                          <div className="text-xs text-gray-500 leading-relaxed">{link.description}</div>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* More Dropdown - Premium with sophisticated animations */}
            <div
              className="relative"
              onMouseEnter={() => setShowMoreDropdown(true)}
              onMouseLeave={() => setShowMoreDropdown(false)}
            >
              <motion.button 
                className="relative text-gray-600 hover:text-premium-600 px-3 py-3 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-1 group min-h-[44px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="relative z-10">More</span>
                <motion.div
                  animate={{ rotate: showMoreDropdown ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  <ChevronDownIcon className="w-4 h-4" />
                </motion.div>
                {/* Premium background hover effect */}
                <motion.div
                  className="absolute inset-0 bg-premium-50 rounded-md"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>

              <AnimatePresence>
                {showMoreDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[1000px] max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-gray-200 py-6 z-50"
                    style={{
                      left: "50%",
                      transform: "translateX(-50%)",
                      maxWidth: "calc(100vw - 2rem)",
                      marginLeft: "max(-500px, calc(-50vw + 1rem))",
                      marginRight: "max(-500px, calc(-50vw + 1rem))",
                    }}
                  >
                    <div className="px-6">
                      <h3 className="text-lg font-semibold mb-4 text-premium-600 text-center">
                        Services
                      </h3>
                      <div className="grid grid-cols-4 gap-4">
                        {moreDropdownLinks.services.map((link) => (
                          <a
                            key={link.name}
                            href={link.href}
                            className="block p-4 text-gray-600 hover:text-premium-600 hover:bg-premium-50 transition-colors duration-200 rounded-lg border border-gray-100 hover:border-premium-200"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {link.icon && <link.icon className={`w-5 h-5 ${link.iconColor}`} />}
                              <span className="font-medium text-sm">{link.name}</span>
                              {link.href === "/matches" && (
                                <span
                                  className="inline-block text-[10px] leading-4 font-semibold uppercase bg-secondary-100 text-secondary-700 px-2 py-0.5 rounded-full border border-secondary-200"
                                  aria-label="New feature"
                                >
                                  New
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 leading-relaxed">{link.description}</div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop CTA / User Menu */}
          <div className="hidden xl:flex items-center gap-2 lg:gap-3 flex-shrink-0">
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
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
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
                  href={ROUTES.signup}
                  className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white font-bold py-3 px-4 lg:px-6 rounded-lg shadow-lg hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 hover:shadow-xl transition-all duration-300 whitespace-nowrap min-h-[44px] flex items-center text-sm relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {/* Premium shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10 hidden lg:inline">
                    {t("nav.start-free", "Start Free")}
                  </span>
                  <span className="relative z-10 lg:hidden">START</span>
                </motion.a>
              </>
            )}
          </div>

          {/* Mobile menu button - Optimized for Portuguese-speaking community */}
          <div className="flex xl:hidden items-center gap-1 relative z-50 flex-shrink-0">
            {/* Only show notifications when user is signed in */}
            {user && (
              <>
                <NotificationBell className="md:hidden" />
              </>
            )}
            <LanguageToggle />
            <MobileNavButton 
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Mobile menu backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 xl:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Mobile menu content */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="xl:hidden relative z-50 bg-white border-t border-primary-200 shadow-2xl rounded-b-lg mx-2 mb-2 max-h-[80vh] overflow-y-auto"
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

                  {/* Main Navigation Links */}
                  <div className="pb-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-primary-600 mb-3">
                      Navigation
                    </h3>
                    {navigationLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-4 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-primary-200 min-h-[48px] flex items-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>

                  {/* Events Category Links for Mobile */}
                  <div className="pb-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-primary-600 mb-3">
                      Events
                    </h3>
                    {getEventsDropdownLinks(t).map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-4 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-primary-200 min-h-[48px] flex items-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                    
                  {/* Tours Dropdown Links for Mobile */}
                  <div className="pb-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-secondary-600 mb-3">
                      Tours
                    </h3>
                    {getToursDropdownLinks(t).map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="text-gray-700 hover:text-secondary-600 hover:bg-secondary-50 px-4 py-4 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-secondary-200 min-h-[48px] flex items-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>

                  {/* London Services Section */}
                  <div className="pb-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-premium-600 mb-3">
                      London Services
                    </h3>
                    <a
                      href={`${ROUTES.services}#executive-transport`}
                      className="text-gray-700 hover:text-premium-600 hover:bg-premium-50 px-4 py-4 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-premium-200 min-h-[48px] flex items-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Executive Transport
                    </a>
                    <a
                      href={ROUTES.transport}
                      className="text-gray-700 hover:text-premium-600 hover:bg-premium-50 px-4 py-4 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-premium-200 min-h-[48px] flex items-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      London Transport
                    </a>
                    <a
                      href={`${ROUTES.services  }/close-protection`}
                      className="text-gray-700 hover:text-premium-600 hover:bg-premium-50 px-4 py-4 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-premium-200 min-h-[48px] flex items-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Security Services
                    </a>
                  </div>


                  {/* Services Section */}
                  <div className="pb-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-premium-600 mb-3">
                      Services
                    </h3>
                    {moreDropdownLinks.services.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="text-gray-700 hover:text-premium-600 hover:bg-premium-50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-premium-200 min-h-[44px] flex items-center gap-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>{link.name}</span>
                        {link.href === "/matches" && (
                          <span
                            className="ml-1 inline-block text-[10px] leading-4 font-semibold uppercase bg-secondary-100 text-secondary-700 px-2 py-0.5 rounded-full border border-secondary-200"
                            aria-label="New feature"
                          >
                            New
                          </span>
                        )}
                      </a>
                    ))}
                  </div>


                  {/* Company & Legal Section */}
                  <div className="pb-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-accent-600 mb-3">
                      Company & Legal
                    </h3>
                    {moreDropdownLinks.company.slice(0, 4).map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="text-gray-700 hover:text-accent-600 hover:bg-accent-50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-accent-200 min-h-[44px] flex items-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </a>
                    ))}
                    {moreDropdownLinks.legal.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent hover:border-gray-200 min-h-[44px] flex items-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </a>
                    ))}
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
                              {t("nav.start-free", "Start Free").toUpperCase()}
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
