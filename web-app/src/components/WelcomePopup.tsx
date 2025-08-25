"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  XMarkIcon,
  HeartIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext";
import { ROUTES } from "@/config/routes";

export default function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const router = useRouter();
  const { t } = useLanguage();

  // Show welcome popup for new users after interaction
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("lusotown-welcome-seen");
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => {
        if (window.scrollY > 200 || true) {
          setIsVisible(true);
        }
      }, 6000); // shorter delay
      return () => clearTimeout(timer);
    }
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!isVisible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("lusotown-welcome-seen", "true");
  };

  const handleAction = (action: string) => {
    localStorage.setItem("lusotown-welcome-seen", "true");
    // Store heritage preference when available (optional)
    if (selectedCountries.length) {
      const primary = selectedCountries[0] ?? "";
      localStorage.setItem("lusotown-heritage", primary);
      localStorage.setItem(
        "lusotown-heritage-list",
        JSON.stringify(selectedCountries)
      );
    }
    setIsVisible(false);

    switch (action) {
      case "events":
        router.push(ROUTES.events);
        break;
      case "matches":
        router.push(ROUTES.matches);
        break;
      case "business":
        router.push(ROUTES.directory);
        break;
      default:
        break;
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto relative overflow-hidden"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 z-10"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>

          {/* Single concise step with optional heritage selection and clear navigation CTAs */}
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="text-3xl mb-3">🇵🇹🇧🇷🇦🇴🇨🇻🇲🇿</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {t("welcome.find_your_community", "Find your Portuguese community in the UK")}
              </h2>
              <p className="text-sm text-gray-600">
                {t("welcome.tagline", "Choose where to start — events, connections, or local businesses.")}
              </p>
            </div>

            {/* Optional heritage selector — two options per line */}
            <div className="mb-5">
              <div className="text-sm font-medium text-gray-700 mb-2">
                {t("welcome.where_from", "Where are you from?")}
                <span className="text-gray-500 font-normal"> {t("welcome.optional", "(Optional)")}</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">{t("welcome.select_all_apply", "Select all that apply")}</p>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-auto pr-1">
                {[
                  { code: "pt", name: "Portugal", flag: "🇵🇹" },
                  { code: "br", name: "Brazil", flag: "🇧🇷" },
                  { code: "ao", name: "Angola", flag: "🇦🇴" },
                  { code: "cv", name: "Cape Verde", flag: "🇨🇻" },
                  { code: "mz", name: "Mozambique", flag: "🇲🇿" },
                  { code: "other", name: "Other", flag: "🌍" },
                ].map((c) => (
                  <motion.button
                    key={c.code}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      setSelectedCountries((prev) =>
                        prev.includes(c.code)
                          ? prev.filter((x) => x !== c.code)
                          : [...prev, c.code]
                      )
                    }
                    aria-pressed={selectedCountries.includes(c.code)}
                    className={`flex items-center gap-2 w-full p-3 rounded-lg border text-left text-sm transition-all ${
                      selectedCountries.includes(c.code)
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-lg leading-none">{c.flag}</span>
                    <span className="font-medium">{c.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleAction("events")}
                className="w-full p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <motion.div whileHover={{ rotate: 3 }}>
                    <CalendarDaysIcon className="w-6 h-6 text-primary-600" />
                  </motion.div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {t("welcome.events", "What's Happening")}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t("welcome.events_desc", "Book cultural events and see the calendar")}
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleAction("matches")}
                className="w-full p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <HeartIcon className="w-6 h-6 text-red-600" />
                  </motion.div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {t("welcome.match", "Find Your Match")}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t("welcome.match_desc", "Dating and genuine connections")}
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleAction("business")}
                className="w-full p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <motion.div whileHover={{ y: -2 }}>
                    <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
                  </motion.div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {t("welcome.directory", "Business Directory")}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t("welcome.directory_desc", "Restaurants, services, and professionals")}
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={handleClose}
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                {t("welcome.not_now", "Not now")}
              </button>
              <a
                href={ROUTES.home}
                onClick={() => localStorage.setItem("lusotown-welcome-seen", "true")}
                className="text-sm text-primary-700 hover:text-primary-800 font-medium"
              >
                {t("welcome.explore_all", "Explore the site")}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
