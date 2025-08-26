"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  CalendarDaysIcon,
  BuildingOffice2Icon,
  AcademicCapIcon,
  CreditCardIcon,
  HeartIcon,
  UserCircleIcon,
  MapPinIcon,
  TruckIcon,
  MusicalNoteIcon,
  BriefcaseIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  FireIcon,
  PaintBrushIcon,
  TrophyIcon,
  TvIcon,
  CurrencyPoundIcon,
} from "@heroicons/react/24/outline";
import { UserIcon, LogOut, Download } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ROUTES } from '@/config/routes';
import { LuxuryRipple } from "@/components/LuxuryMobileInteraction";
import { useMobileRedirect } from "@/components/MobileRedirectProvider";

interface MobileNavigationProps {
  user?: any;
  onClose?: () => void;
  isOpen: boolean;
}

export default function MobileNavigation({ user, onClose, isOpen }: MobileNavigationProps) {
  const { t } = useLanguage();
  const { deviceInfo, triggerAppDownload, showDownloadPrompt } = useMobileRedirect();

  // Navigation sections for Portuguese-speaking community
  const navigationSections = [
    {
      title: t("nav.main", "Navigation"),
      items: [
        { name: t("nav.whats_on", "What's On"), href: ROUTES.events, icon: CalendarDaysIcon },
        { name: t("nav.discover_businesses", "Discover Businesses"), href: ROUTES.businessDirectory, icon: BuildingOffice2Icon },
        { name: t("nav.discover_students", "Discover Student Life"), href: "/students", icon: AcademicCapIcon },
        { name: t("nav.pricing", "Pricing"), href: "/pricing", icon: CreditCardIcon },
      ]
    },
    {
      title: t("nav.events", "Events"),
      items: [
        { name: t("nav.cultural-events", "Cultural Events"), href: `${ROUTES.events}?category=Cultural`, icon: MusicalNoteIcon },
        { name: t("nav.business-networking", "Business Networking"), href: ROUTES.businessNetworking, icon: BriefcaseIcon },
        { name: t("nav.social-meetups", "Social Meetups"), href: `${ROUTES.events}?category=Social`, icon: UserGroupIcon },
        { name: t("nav.portuguese-language", "Lusophone Language"), href: `${ROUTES.events}?category=Language`, icon: ChatBubbleLeftRightIcon },
        { name: t("nav.food-dining", "Food & Dining"), href: `${ROUTES.events}?category=Food`, icon: FireIcon },
      ]
    },
    {
      title: t("nav.tours", "Tours"),
      items: [
        { name: t("nav.london-tours", "London Tours"), href: ROUTES.londonTours, icon: MapPinIcon },
        { name: t("nav.london-transport", "London Transport"), href: ROUTES.transport, icon: TruckIcon },
      ]
    },
    {
      title: t("nav.services", "Services"),
      items: [
        { name: "Find Your Match", href: ROUTES.matches, icon: HeartIcon, badge: "New" },
        { name: "Live TV", href: ROUTES.tv, icon: TvIcon },
        { name: "Streaming Income", href: ROUTES.live, icon: CurrencyPoundIcon },
      ]
    }
  ];

  const handleLinkClick = () => {
    onClose?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile menu backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 xl:hidden"
            onClick={onClose}
          />

          {/* Mobile menu content */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="xl:hidden fixed top-[80px] left-2 right-2 z-50 bg-white border border-primary-200 shadow-2xl rounded-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="p-4 space-y-4">
              {/* App Download CTA for Mobile Users */}
              {deviceInfo?.isMobile && (
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-primary-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-sm font-bold">📱</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {t('mobile.nav.app_title', 'Get the LusoTown App')}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {t('mobile.nav.app_subtitle', 'Better mobile experience for Portuguese community')}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => {
                      triggerAppDownload();
                      handleLinkClick();
                    }}
                    className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium py-3 px-4 rounded-lg text-sm hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 flex items-center justify-center gap-2 min-h-[44px]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-4 h-4" />
                    <span>{t('mobile.nav.download_app', 'Download App')}</span>
                  </motion.button>
                </div>
              )}

              {navigationSections.map((section, sectionIndex) => (
                <div key={section.title} className="pb-4 border-b border-gray-200 last:border-b-0">
                  <h3 className="text-lg font-semibold text-primary-600 mb-3">
                    {section.title}
                  </h3>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        className="lusotown-touch-target flex items-center gap-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 p-3 rounded-xl lusotown-text-body font-medium transition-all duration-200 border border-transparent hover:border-primary-200"
                        onClick={handleLinkClick}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: sectionIndex * 0.1 + 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="flex-1">{item.name}</span>
                        {item.badge && (
                          <span className="inline-block text-[10px] leading-4 font-semibold uppercase bg-secondary-100 text-secondary-700 px-2 py-0.5 rounded-full border border-secondary-200">
                            {item.badge}
                          </span>
                        )}
                      </motion.a>
                    ))}
                  </div>
                </div>
              ))}

              {/* User Section */}
              <div className="border-t border-primary-100 pt-4">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-r from-action-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        {user.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1">
                        <div className="text-base font-medium text-gray-800 truncate">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          Premium Member
                        </div>
                      </div>
                    </div>

                    <motion.a
                      href={`/profile/${user.id}`}
                      className="flex items-center gap-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 p-3 rounded-xl text-base font-medium transition-all duration-200 border border-transparent hover:border-primary-200 min-h-[48px]"
                      onClick={handleLinkClick}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <UserIcon className="w-5 h-5" />
                      <span>My Profile</span>
                    </motion.a>

                    <motion.a
                      href={ROUTES.favorites}
                      className="flex items-center gap-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 p-3 rounded-xl text-base font-medium transition-all duration-200 border border-transparent hover:border-primary-200 min-h-[48px]"
                      onClick={handleLinkClick}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <HeartIcon className="w-5 h-5" />
                      <span>My Favourites</span>
                    </motion.a>

                    <button
                      className="flex items-center gap-3 text-action-600 hover:text-action-700 hover:bg-action-50 p-3 rounded-xl text-base font-medium transition-all duration-200 w-full text-left border border-transparent hover:border-action-200 min-h-[48px]"
                      onClick={() => {
                        // Handle logout
                        handleLinkClick();
                      }}
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <motion.a
                      href={ROUTES.login}
                      className="flex items-center gap-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 p-3 rounded-xl text-base font-medium transition-all duration-200 border border-transparent hover:border-primary-200 min-h-[48px]"
                      onClick={handleLinkClick}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <UserIcon className="w-5 h-5" />
                      <span>Log In</span>
                    </motion.a>

                    <motion.a
                      href={ROUTES.signup}
                      className="bg-gradient-to-r from-secondary-600 via-action-600 to-accent-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:from-secondary-700 hover:via-action-700 hover:to-accent-700 hover:shadow-xl transition-all duration-200 w-full text-center min-h-[48px] flex items-center justify-center"
                      onClick={handleLinkClick}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-base">
                        {t("nav.start-free", "START FREE").toUpperCase()}
                      </span>
                    </motion.a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Mobile Navigation Button Component
interface MobileNavButtonProps {
  "data-testid"?: string;
  "aria-label"?: string;
  isOpen: boolean;
  onClick: () => void;
}

export function MobileNavButton({ isOpen, onClick, "data-testid": testId, "aria-label": ariaLabel }: MobileNavButtonProps) {
  return (
    <LuxuryRipple
      className="inline-flex items-center justify-center p-3 rounded-lg text-primary-700 hover:text-primary-800 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 min-h-[48px] min-w-[48px] bg-white border-2 border-primary-200 shadow-lg active:bg-primary-50"
      onClick={onClick}
      hapticFeedback="medium"
      rippleColor="rgba(59, 130, 246, 0.2)"
    >
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <span className="sr-only">
          {isOpen ? "Close menu" : "Open main menu"}
        </span>
        {isOpen ? (
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
      </motion.div>
    </LuxuryRipple>
  );
}