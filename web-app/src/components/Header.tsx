"use client";

import { useState, useEffect } from "react";
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
} from "@heroicons/react/24/outline";
import { Crown, LogOut, ShoppingCart, Heart } from "lucide-react";
// import { authService, User } from '@/lib/auth'
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import LanguageToggle from "@/components/LanguageToggle";
import CartButton from "@/components/CartButton";
import SavedItemsButton from "@/components/SavedItemsButton";
import SearchBar from "@/components/SearchBar";
import NotificationBell from "@/components/NotificationBell";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { isAuthenticated, useAuthState } from "@/lib/auth";
import { useAuthPopup } from "@/components/AuthPopupProvider";

const getNavigationLinks = (t: any) => [
  { name: t("nav.events", "Events"), href: "/events" },
  { 
    name: t("nav.tours", "Tours"), 
    href: "/tours",
    dropdown: [
      { name: t("nav.london-tours", "London Tours"), href: "/tours" },
      { name: t("nav.transport", "London Transport"), href: "/transport" }
    ]
  },
  { name: t("nav.students", "Students"), href: "/students" },
  { name: t("nav.pricing", "Pricing"), href: "/pricing" },
];

const getAuthenticatedNavigationLinks = (t: any) => [
  { name: t("nav.events", "Events"), href: "/events" },
  { 
    name: t("nav.tours", "Tours"), 
    href: "/tours",
    dropdown: [
      { name: t("nav.london-tours", "London Tours"), href: "/tours" },
      { name: t("nav.transport", "London Transport"), href: "/transport" }
    ]
  },
  { name: t("nav.students", "Students"), href: "/students" },
  { name: t("nav.pricing", "Pricing"), href: "/pricing" },
];

// All footer links for the "More" dropdown
const getMoreDropdownLinks = (t: any) => ({
  community: [
    { name: 'Events & Culture', href: '/events' },
    { name: 'Community', href: '/community' },
    { name: 'Become a Host', href: '/host' },
    { name: 'Business Directory', href: '/directory' },
    { name: t('footer.housing-assistance', 'Housing Assistance'), href: '/housing-assistance' },
    { name: t('footer.neighborhood-groups', 'Neighborhood Groups'), href: '/neighborhood-groups' },
    { name: 'Mentorship Programs', href: '/mentorship' },
    { name: 'Community Guidelines', href: '/community-guidelines' },
  ],
  services: [
    { name: 'Premium Services', href: '/services' },
    { name: 'Executive Transport', href: '/services#executive-transport' },
    { name: 'Close Protection', href: '/services#close-protection' },
    { name: 'Transport & SIA', href: '/transport' },
    { name: 'Business Networking', href: '/business-networking' },
    { name: 'Meet Portuguese', href: '/matches', isNew: true },
    { name: 'Live TV', href: '/live' },
  ],
  support: [
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Safety & Verification', href: '/safety' },
  ],
  company: [
    { name: 'About LusoTown', href: '/about' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Success Stories', href: '/success-stories' },
    { name: 'Community Chat', href: '/forums' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Partnerships', href: '/partnerships' },
    { name: 'Careers', href: '/careers' },
    { name: 'Corporate Partnerships', href: '/corporate-partnerships' },
    { name: 'Institutional Partnerships', href: '/portuguese-institutional-partnerships' },
    { name: 'Instituto Camões Partnership', href: '/instituto-camoes' },
  ],
  legal: [
    { name: 'Community Guidelines', href: '/community-guidelines' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Community Safety', href: '/safety' },
  ],
});

// Quick Action Components for Dropdown Menu
function QuickActionCartButton() {
  const { cartCount } = useCart();
  const { t, language } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { showPopup } = useAuthPopup();
  const isPortuguese = language === 'pt';

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  useEffect(() => {
    const unsubscribe = useAuthState((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleCartClick = () => {
    if (isLoggedIn) {
      window.location.href = '/cart';
    } else {
      showPopup('add-to-cart', {
        type: 'add-to-cart',
        redirectPath: '/cart'
      });
    }
  };

  return (
    <button
      onClick={handleCartClick}
      className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-primary-50 rounded-lg transition-colors duration-200 group"
    >
      <div className="relative">
        <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-primary-600" />
        {cartCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-action-500 text-white text-xs rounded-full min-w-[16px] h-[16px] flex items-center justify-center font-bold text-[10px]">
            {cartCount > 99 ? '99+' : cartCount}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900 group-hover:text-primary-600">
          {isPortuguese ? 'Lista de Desejos' : 'Wish List'}
        </div>
        <div className="text-xs text-gray-500">
          {isLoggedIn ? (
            cartCount > 0 
              ? `${cartCount} ${isPortuguese ? (cartCount === 1 ? 'item' : 'itens') : (cartCount === 1 ? 'item' : 'items')}`
              : (isPortuguese ? 'Lista vazia' : 'Empty list')
          ) : (
            isPortuguese ? 'Registar para usar' : 'Sign up to use'
          )}
        </div>
      </div>
    </button>
  );
}

function QuickActionSavedButton() {
  const { savedCount } = useCart();
  const { t, language } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { showPopup } = useAuthPopup();
  const isPortuguese = language === 'pt';

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  useEffect(() => {
    const unsubscribe = useAuthState((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleSavedClick = () => {
    if (isLoggedIn) {
      window.location.href = '/saved';
    } else {
      showPopup('view-details', {
        type: 'view-details',
        redirectPath: '/saved'
      });
    }
  };

  return (
    <button
      onClick={handleSavedClick}
      className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-action-50 rounded-lg transition-colors duration-200 group"
    >
      <div className="relative">
        <Heart className={`w-5 h-5 ${savedCount > 0 ? 'text-action-500 fill-current' : 'text-gray-600'} group-hover:text-action-600`} />
        {savedCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-action-500 text-white text-xs rounded-full min-w-[16px] h-[16px] flex items-center justify-center font-bold text-[10px]">
            {savedCount > 99 ? '99+' : savedCount}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900 group-hover:text-action-600">
          {isPortuguese ? 'Guardados' : 'Saved Items'}
        </div>
        <div className="text-xs text-gray-500">
          {isLoggedIn ? (
            savedCount > 0 
              ? `${savedCount} ${isPortuguese ? (savedCount === 1 ? 'item guardado' : 'itens guardados') : (savedCount === 1 ? 'saved item' : 'saved items')}`
              : (isPortuguese ? 'Nenhum item guardado' : 'No saved items')
          ) : (
            isPortuguese ? 'Registar para usar' : 'Sign up to use'
          )}
        </div>
      </div>
    </button>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showToursDropdown, setShowToursDropdown] = useState(false);
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 min-h-[80px] lg:min-h-[88px]">
      <nav className="container-width" aria-label="Top">
        <div className="flex items-center justify-between py-3 sm:py-4 lg:py-5 gap-2 sm:gap-4">
          {/* Logo - Compact design for header */}
          <div className="flex items-center flex-shrink-0">
            <a href="/" className="flex items-center">
              <Logo size="compact" animated />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 ml-4 xl:ml-8">
            {navigationLinks.map((link) => (
              link.dropdown ? (
                <div 
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setShowToursDropdown(true)}
                  onMouseLeave={() => setShowToursDropdown(false)}
                >
                  <button className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1">
                    {link.name}
                    <ChevronDownIcon className="w-4 h-4" />
                  </button>
                  
                  <AnimatePresence>
                    {showToursDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                      >
                        {link.dropdown.map((dropdownLink) => (
                          <a
                            key={dropdownLink.name}
                            href={dropdownLink.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
                          >
                            {dropdownLink.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {link.name}
                </a>
              )
            ))}
            
            {/* More Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowMoreDropdown(true)}
              onMouseLeave={() => setShowMoreDropdown(false)}
            >
              <button className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1">
                More
                <ChevronDownIcon className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {showMoreDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-[320px] sm:w-[480px] md:w-[640px] lg:w-[800px] xl:w-[900px] max-w-[95vw] bg-white rounded-2xl shadow-2xl border border-gray-200 py-4 sm:py-6 lg:py-8 z-50"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8">
                      {/* Quick Actions Section */}
                      <div className="sm:border-r border-gray-200 sm:pr-6 mb-6 sm:mb-0">
                        <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Quick Actions</h3>
                        <div className="space-y-2 lg:space-y-3">
                          <QuickActionCartButton />
                          <QuickActionSavedButton />
                        </div>
                      </div>
                      
                      {/* Community Links */}
                      <div className="mb-6 lg:mb-0">
                        <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4 text-primary-600">Community</h3>
                        <ul className="space-y-1 lg:space-y-2">
                          {moreDropdownLinks.community.slice(0, 6).map((link) => (
                            <li key={link.name}>
                              <a
                                href={link.href}
                                className="block text-xs lg:text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 px-2 py-1 rounded transition-colors duration-200"
                              >
                                {link.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Services Links */}
                      <div className="mb-6 lg:mb-0">
                        <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4 text-premium-600">Services</h3>
                        <ul className="space-y-1 lg:space-y-2">
                          {moreDropdownLinks.services.slice(0, 6).map((link) => (
                            <li key={link.name}>
                              <a
                                href={link.href}
                                className="block text-xs lg:text-sm text-gray-600 hover:text-premium-600 hover:bg-premium-50 px-2 py-1 rounded transition-colors duration-200"
                              >
                                <div className="flex items-center justify-between">
                                  <span>{link.name}</span>
                                  {link.isNew && (
                                    <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-action-500 to-secondary-500 text-white">
                                      New
                                    </span>
                                  )}
                                </div>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Support Links - Hidden on mobile/tablet, shown on desktop */}
                      <div className="hidden lg:block mb-6 lg:mb-0">
                        <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4 text-secondary-600">Support</h3>
                        <ul className="space-y-1 lg:space-y-2 mb-4 lg:mb-6">
                          {moreDropdownLinks.support.map((link) => (
                            <li key={link.name}>
                              <a
                                href={link.href}
                                className="block text-xs lg:text-sm text-gray-600 hover:text-secondary-600 hover:bg-secondary-50 px-2 py-1 rounded transition-colors duration-200"
                              >
                                {link.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                        
                        <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4 text-accent-600">Company</h3>
                        <ul className="space-y-1 lg:space-y-2">
                          {moreDropdownLinks.company.slice(0, 4).map((link) => (
                            <li key={link.name}>
                              <a
                                href={link.href}
                                className="block text-xs lg:text-sm text-gray-600 hover:text-accent-600 hover:bg-accent-50 px-2 py-1 rounded transition-colors duration-200"
                              >
                                {link.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Contact & Legal - Spans full width on smaller screens */}
                      <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                        {/* Contact Info - Always visible */}
                        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg p-3 lg:p-4 mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Get in Touch</h4>
                          <div className="space-y-2 text-xs lg:text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <EnvelopeIcon className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0" />
                              <span className="leading-tight">connect@lusotown.co.uk</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPinIcon className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0" />
                              <span className="leading-tight">UK Portuguese Community</span>
                            </div>
                          </div>
                        </div>

                        {/* Legal Links - Hidden on mobile, visible on larger screens */}
                        <div className="hidden sm:block">
                          <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4 text-gray-700">Legal</h3>
                          <ul className="space-y-1 lg:space-y-2">
                            {moreDropdownLinks.legal.slice(0, 3).map((link) => (
                              <li key={link.name}>
                                <a
                                  href={link.href}
                                  className="block text-xs lg:text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded transition-colors duration-200"
                                >
                                  {link.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop CTA / User Menu */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
            <SearchBar variant="header" />
            <NotificationBell className="hidden md:block" showDropdown />
            <LanguageToggle />
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors h-10"
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
                        href="/favorites"
                        className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 min-h-[44px]"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <HeartIcon className="w-4 h-4" />
                        <span>My Favourites</span>
                      </a>
                      <a
                        href="/dashboard"
                        className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 min-h-[44px]"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <UserCircleIcon className="w-4 h-4" />
                        <span>Dashboard</span>
                      </a>
                      {user.role === "admin" && (
                        <a
                          href="/admin"
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
                  href="/login"
                  className="text-gray-600 hover:text-primary-600 p-2 rounded-md transition-colors duration-200 h-10 w-10 flex items-center justify-center"
                  title="Login"
                >
                  <UserIcon className="w-5 h-5" />
                </a>
                <a
                  href="/signup"
                  className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white font-bold py-2 px-4 lg:px-6 rounded-lg shadow-lg hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 hover:shadow-xl transform hover:scale-105 transition-all duration-200 whitespace-nowrap h-10 flex items-center text-sm"
                >
                  <span className="hidden lg:inline">
                    {t("nav.join-membership", "BECOME A MEMBER")}
                  </span>
                  <span className="lg:hidden">JOIN</span>
                </a>
              </>
            )}
          </div>

          {/* Mobile menu button - Fixed spacing for better touch targets */}
          <div className="flex md:hidden items-center gap-1 relative z-50 flex-shrink-0">
            {/* Only show notifications when user is signed in */}
            {user && (
              <>
                <NotificationBell className="md:hidden" />
              </>
            )}
            <LanguageToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center p-3 rounded-lg text-primary-700 hover:text-primary-800 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 h-12 w-12 bg-white border-2 border-primary-200 shadow-lg active:bg-primary-50 active:scale-95"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">
                {mobileMenuOpen ? "Close menu" : "Open main menu"}
              </span>
              {mobileMenuOpen ? (
                <XMarkIcon
                  className="h-6 w-6 text-primary-700 stroke-2"
                  aria-hidden="true"
                />
              ) : (
                <Bars3Icon
                  className="h-6 w-6 text-primary-700 stroke-2"
                  aria-hidden="true"
                />
              )}
            </button>
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
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Mobile menu content */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden fixed top-20 left-2 right-2 z-50 bg-white border border-primary-200 shadow-2xl rounded-lg max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-primary-300 scrollbar-track-gray-100"
                style={{ 
                  scrollBehavior: 'smooth',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                <div className="px-4 pt-6 pb-8 space-y-2">
                  {navigationLinks.map((link) => (
                    link.dropdown ? (
                      <div key={link.name} className="space-y-1">
                        <div className="text-gray-700 px-4 py-3 text-base font-medium min-h-[44px] flex items-center">
                          {link.name}
                        </div>
                        {link.dropdown.map((dropdownLink) => (
                          <a
                            key={dropdownLink.name}
                            href={dropdownLink.href}
                            className="text-gray-600 hover:text-primary-600 hover:bg-primary-50 block px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent hover:border-primary-200 min-h-[40px] flex items-center ml-4"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {dropdownLink.name}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <a
                        key={link.name}
                        href={link.href}
                        className="text-gray-700 hover:text-primary-600 hover:bg-primary-50 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-primary-200 min-h-[44px] flex items-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </a>
                    )
                  ))}

                  {/* Mobile "More" Section - Match Desktop Structure */}
                  <div className="space-y-1">
                    <div className="text-gray-700 px-4 py-3 text-base font-medium min-h-[44px] flex items-center">
                      More
                    </div>
                    
                    {/* Quick Actions in Mobile */}
                    <div className="ml-4 space-y-1 mb-2">
                      <div className="text-xs font-semibold text-primary-600 px-2 py-1 uppercase tracking-wide">
                        Quick Actions
                      </div>
                      <QuickActionCartButton />
                      <QuickActionSavedButton />
                    </div>
                    
                    {/* Community Links */}
                    <div className="ml-4 space-y-1 mb-2">
                      <div className="text-xs font-semibold text-primary-600 px-2 py-1 uppercase tracking-wide">
                        Community
                      </div>
                      {moreDropdownLinks.community.slice(0, 5).map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          className="text-gray-600 hover:text-primary-600 hover:bg-primary-50 block px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent hover:border-primary-200 min-h-[36px] flex items-center"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                    
                    {/* Services Links */}
                    <div className="ml-4 space-y-1 mb-2">
                      <div className="text-xs font-semibold text-premium-600 px-2 py-1 uppercase tracking-wide">
                        Services
                      </div>
                      {moreDropdownLinks.services.slice(0, 5).map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          className="text-gray-600 hover:text-premium-600 hover:bg-premium-50 block px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent hover:border-premium-200 min-h-[36px] flex items-center"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span>{link.name}</span>
                            {link.isNew && (
                              <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-action-500 to-secondary-500 text-white">
                                New
                              </span>
                            )}
                          </div>
                        </a>
                      ))}
                    </div>
                    
                    {/* Support & Company Combined for Mobile */}
                    <div className="ml-4 space-y-1">
                      <div className="text-xs font-semibold text-secondary-600 px-2 py-1 uppercase tracking-wide">
                        Support & Company
                      </div>
                      {[...moreDropdownLinks.support, ...moreDropdownLinks.company.slice(0, 4)].map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          className="text-gray-600 hover:text-secondary-600 hover:bg-secondary-50 block px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-transparent hover:border-secondary-200 min-h-[36px] flex items-center"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-primary-100 pt-4 pb-6">
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
                          href="/favorites"
                          className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-primary-200 min-h-[44px]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <HeartIcon className="w-5 h-5" />
                          <span>My Favourites</span>
                        </a>

                        <a
                          href="/dashboard"
                          className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-primary-200 min-h-[44px]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <UserCircleIcon className="w-5 h-5" />
                          <span>Dashboard</span>
                        </a>

                        {user.role === "admin" && (
                          <a
                            href="/admin"
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
                          href="/login"
                          className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-primary-200 min-h-[44px]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <UserIcon className="w-5 h-5" />
                          <span>Log In</span>
                        </a>
                        <div className="mt-4 px-0 mb-4">
                          <a
                            href="/signup"
                            className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 hover:shadow-xl transform hover:scale-[1.02] active:scale-95 transition-all duration-200 w-full text-center block min-h-[44px] flex items-center justify-center"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span className="text-base">BECOME A MEMBER</span>
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
