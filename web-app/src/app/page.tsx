"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { communityStats } from "@/config/community";
import { generateJsonLd, seo } from "@/config/seo";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { ROUTES } from "@/config/routes";
import MobileWelcomeWizard from "@/components/MobileWelcomeWizard";
import StreamlinedCommunitySelector from "@/components/StreamlinedCommunitySelector";
import ResponsiveButton from "@/components/ResponsiveButton";
// Import Portuguese Cultural Mobile Styles
import "@/styles/mobile-portuguese-cultural.css";

// Strategic component loading for cohesive experience
const SuccessStories = dynamic(() => import("@/components/SuccessStories"), {
  loading: () => <div className="h-60 bg-gray-100 animate-pulse rounded-xl" />,
  ssr: false,
});
const TestimonialsNew = dynamic(() => import("@/components/TestimonialsNew"), {
  loading: () => <div className="h-48 bg-gray-100 animate-pulse rounded-xl" />,
  ssr: false,
});
const LusophoneTestimonials = dynamic(
  () => import("@/components/LusophoneTestimonials"),
  {
    loading: () => (
      <div className="h-48 bg-gray-100 animate-pulse rounded-xl" />
    ),
    ssr: false,
  }
);
const EventsShowcase = dynamic(() => import("@/components/EventsShowcase"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />,
  ssr: false,
});

import {
  HeartIcon,
  UsersIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  MapPinIcon,
  StarIcon,
  CheckIcon,
  SparklesIcon,
  BuildingOffice2Icon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

// Page-specific structured data for Lusophone social calendar
const jsonLd = generateJsonLd("organization");

// Page-level metadata removed (client component). Title is set via global SEO config.

export default function Home() {
  const { t } = useLanguage();
  const [showWelcomeWizard, setShowWelcomeWizard] = useState(false);
  const router = useRouter();

  // Mobile welcome wizard - Only trigger on signup intent (no automatic triggers)
  const handleSignupClick = () => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Show wizard on mobile for personalized signup flow
      setShowWelcomeWizard(true);
    } else {
      // Desktop: go directly to signup
      router.push("/signup");
    }
  };

  const handleWelcomeComplete = (action: string) => {
    setShowWelcomeWizard(false);
    localStorage.setItem("lusotown_welcome_seen", "true");

    // Route to specific signup forms based on wizard responses
    const signupRoutes = {
      matches: "/signup?focus=dating",
      dating: "/signup?focus=dating",
      events: "/signup?focus=community",
      community: "/signup?focus=community",
      business: "/signup?focus=business",
      networking: "/signup?focus=business",
      student: "/signup?focus=student",
      education: "/signup?focus=student",
      default: "/signup",
    };

    const route =
      signupRoutes[action as keyof typeof signupRoutes] || signupRoutes.default;
    router.push(route);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <main className="min-h-screen w-full overflow-x-hidden" role="main">
        {/* Fixed spacing: Added proper top margin and padding for hero section */}
        <div className="pt-24 lg:pt-32 w-full">
          {/* HERO SECTION - Mobile-First Portuguese Community */}
          <section
            className="relative min-h-[85vh] lg:min-h-[700px] bg-gradient-to-br from-green-50 via-yellow-50 to-red-50 flex items-center overflow-hidden"
            style={{ paddingTop: "40px", paddingBottom: "60px" }}
          >
            {/* Portuguese Heritage Background Pattern */}
            <div className="absolute inset-0" aria-hidden="true">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-r from-green-100/30 via-yellow-100/30 to-red-100/30"></div>
              <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-l from-red-100/30 via-gold-100/20 to-green-100/30"></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,165,116,0.1)_0%,transparent_70%)]"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
                {/* Left Column - Mobile-Optimized Portuguese Community */}
                <div className="text-center lg:text-left space-y-6">
                  {/* Mobile-First Title - 24px Bold Portuguese Heritage */}
                  <div className="space-y-4">
                    <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black leading-tight">
                      <span className="block text-gray-900 mb-2 text-[24px] sm:text-4xl lg:text-5xl font-black">
                        Unidos pela Língua
                      </span>
                      <span className="block text-gray-700 text-base sm:text-xl lg:text-2xl font-semibold leading-relaxed max-w-lg mx-auto lg:mx-0">
                        Discover events, businesses, and opportunities for verified Portuguese and Lusophone-speaking members across the United Kingdom.
                      </span>
                    </h1>
                    
                    {/* Enhanced Flag Row - 32px Mobile-Optimized */}
                    <div className="flex justify-center lg:justify-start gap-3 mt-6" aria-label="All 8 Lusophone nations represented">
                      <span role="img" aria-label="Portugal flag" className="text-[32px] hover:scale-110 transition-transform">🇵🇹</span>
                      <span role="img" aria-label="Brazil flag" className="text-[32px] hover:scale-110 transition-transform">🇧🇷</span>
                      <span role="img" aria-label="Angola flag" className="text-[32px] hover:scale-110 transition-transform">🇦🇴</span>
                      <span role="img" aria-label="Cape Verde flag" className="text-[32px] hover:scale-110 transition-transform">🇨🇻</span>
                      <span role="img" aria-label="Mozambique flag" className="text-[32px] hover:scale-110 transition-transform">🇲🇿</span>
                      <span role="img" aria-label="Guinea-Bissau flag" className="text-[32px] hover:scale-110 transition-transform">🇬🇼</span>
                      <span role="img" aria-label="São Tomé flag" className="text-[32px] hover:scale-110 transition-transform">🇸🇹</span>
                      <span role="img" aria-label="East Timor flag" className="text-[32px] hover:scale-110 transition-transform">🇹🇱</span>
                    </div>
                  </div>

                  {/* Mobile-Optimized Community Stats - 2x2 Grid with Portuguese Cultural Styling */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-sm mx-auto lg:max-w-md lg:mx-0 my-8">
                    <div className="heritage-selection-card lusophone-touch-target mobile-portuguese-card cultural-glow bg-gradient-to-br from-white/90 via-green-50/80 to-white/90 backdrop-blur-sm rounded-xl p-4 text-center border border-green-200 shadow-sm transition-all duration-300 hover:scale-105">
                      <div className="text-2xl sm:text-3xl font-black text-green-600 mb-1 cultural-pulse">{communityStats.members}</div>
                      <div className="text-xs sm:text-sm text-gray-600 font-medium responsive-portuguese-text">Active Members</div>
                    </div>
                    <div className="heritage-selection-card lusophone-touch-target mobile-portuguese-card bg-gradient-to-br from-white/90 via-yellow-50/80 to-white/90 backdrop-blur-sm rounded-xl p-4 text-center border border-yellow-200 shadow-sm transition-all duration-300 hover:scale-105">
                      <div className="text-2xl sm:text-3xl font-black text-yellow-600 mb-1">{communityStats.students}</div>
                      <div className="text-xs sm:text-sm text-gray-600 font-medium responsive-portuguese-text">Students</div>
                    </div>
                    <div className="heritage-selection-card lusophone-touch-target mobile-portuguese-card bg-gradient-to-br from-white/90 via-red-50/80 to-white/90 backdrop-blur-sm rounded-xl p-4 text-center border border-red-200 shadow-sm transition-all duration-300 hover:scale-105">
                      <div className="text-2xl sm:text-3xl font-black text-red-600 mb-1">{communityStats.partnerships}</div>
                      <div className="text-xs sm:text-sm text-gray-600 font-medium responsive-portuguese-text">Universities</div>
                    </div>
                    <div className="heritage-selection-card lusophone-touch-target mobile-portuguese-card bg-gradient-to-br from-white/90 via-blue-50/80 to-white/90 backdrop-blur-sm rounded-xl p-4 text-center border border-blue-200 shadow-sm transition-all duration-300 hover:scale-105">
                      <div className="text-2xl sm:text-3xl font-black text-blue-600 mb-1">{communityStats.events}</div>
                      <div className="text-xs sm:text-sm text-gray-600 font-medium responsive-portuguese-text">Monthly Events</div>
                    </div>
                  </div>

                  {/* Single Prominent Join Free CTA */}
                  <div className="space-y-4">
                    <button
                      onClick={handleSignupClick}
                      className="w-full sm:w-auto group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 min-h-[56px]"
                    >
                      <div className="flex items-center mr-3 gap-1">
                        <span className="text-base">🇵🇹</span>
                        <span className="text-base">🇧🇷</span>
                        <span className="text-base">🇦🇴</span>
                      </div>
                      {t("hero.cta_primary", "Join Free")}
                      <ArrowRightIcon className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    {/* Verification Badge */}
                    <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white/90 border border-green-200 rounded-full px-4 py-2">
                      <CheckIcon className="w-4 h-4 text-green-600" />
                      <span className="font-medium">All Portuguese & Lusophone-speaking members verified</span>
                    </div>
                  </div>


                  {/* Social proof - Enhanced testimonial with proper spacing */}
                  <div className="portuguese-testimonial hero-testimonial-mobile rounded-2xl p-6 shadow-lg max-w-md mx-auto lg:mx-0 mb-8 lg:mb-0">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex -space-x-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-red-400 flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-md">
                          M
                        </div>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-md">
                          J
                        </div>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-md">
                          A
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 text-base">
                          Maria & João
                        </div>
                        <div className="text-sm text-gray-600">
                          Found love through LusoTown 💕
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 italic leading-relaxed mb-3">
                      "Conhecemo-nos aqui e agora estamos noivos! A comunidade
                      portuguesa no Reino Unido é incrível."
                    </p>
                    <div className="flex items-center justify-center gap-1">
                      <span className="testimonial-stars text-lg">
                        ⭐⭐⭐⭐⭐
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column - Community Events Preview */}
                <div className="relative">
                  <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    {/* Mock Lusophone event cards */}
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-green-50 to-red-50 rounded-2xl p-4 border border-green-200/50">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-red-500 flex items-center justify-center text-white font-bold text-lg">
                            🎵
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">
                              Tonight: Fado Night
                            </div>
                            <div className="text-sm text-gray-600">
                              📅 8pm • Camden Town
                            </div>
                          </div>
                          <div className="ml-auto bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            TONIGHT
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          "Noite de fado tradicional com música ao vivo. Venha
                          celebrar a cultura portuguesa!"
                        </p>
                        <div className="flex gap-2">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            Fado
                          </span>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Music
                          </span>
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                            Culture
                          </span>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-200/50">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                            🍿
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">
                              Saturday: Kizomba Class
                            </div>
                            <div className="text-sm text-gray-600">
                              📅 7pm • Brixton
                            </div>
                          </div>
                          <div className="ml-auto bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            THIS WEEK
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          "Aula de kizomba para todos os níveis. Vamos dançar
                          juntos!"
                        </p>
                        <div className="flex gap-2">
                          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                            Kizomba
                          </span>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            Dance
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 text-center">
                      <Link
                        href={`${ROUTES.events}?ref=home&when=week`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-bounce hover:shadow-lg"
                      >
                        <CalendarDaysIcon className="w-4 h-4" />
                        50+ events weekly!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* STREAMLINED COMMUNITY SELECTOR - New 2x2 Grid Onboarding */}
          <StreamlinedCommunitySelector />

          {/* WHAT'S HAPPENING TODAY SECTION - Fixed spacing */}
          <section className="py-16 md:py-20 lg:py-24 bg-white section-spacing">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 via-yellow-100 to-red-100 px-6 py-3 rounded-full text-primary-700 font-bold text-sm mb-6">
                    <CalendarDaysIcon className="w-4 h-4" />
                    {t("today.badge", "WHAT'S HAPPENING TODAY")}
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                    {t("today.title", "Today in Lusophone Community")}
                  </h2>

                  <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                    {t(
                      "today.subtitle",
                      "Don't miss what's happening right now in the Portuguese-speaking community across London and the United Kingdom"
                    )}
                  </p>
                </div>

                {/* Today's Events Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      router.push(
                        `${ROUTES.events}?ref=home&day=today&tag=kizomba`
                      )
                    }
                    onClick={() =>
                      router.push(
                        `${ROUTES.events}?ref=home&day=today&tag=kizomba`
                      )
                    }
                    className="group bg-gradient-to-br from-green-50 to-red-50 rounded-2xl p-6 border border-green-200/50 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
                    aria-label="View today's Kizomba events"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-red-500 rounded-xl flex items-center justify-center text-2xl">
                        🎵
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">
                          Tonight: Chocolate Kizomba
                        </div>
                        <div className="text-sm text-gray-600">
                          8pm • One Regents Street
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">
                      "Noite especial de kizomba com chocolate quente. Ideal
                      para conhecer novos amigos portugueses!"
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex gap-2">
                        <Link
                          href={`${ROUTES.events}?ref=home&day=today`}
                          className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Tonight
                        </Link>
                        <Link
                          href={`${ROUTES.events}?ref=home&tag=kizomba`}
                          className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Kizomba
                        </Link>
                      </div>
                      <Link
                        href={`${ROUTES.events}?ref=home&day=today&tag=kizomba`}
                        className="text-sm font-medium text-primary-700 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t("common.view_more", "View more")}
                      </Link>
                    </div>
                  </div>

                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      router.push(
                        `${ROUTES.events}?ref=home&day=today&tag=food`
                      )
                    }
                    onClick={() =>
                      router.push(
                        `${ROUTES.events}?ref=home&day=today&tag=food`
                      )
                    }
                    className="group bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200/50 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
                    aria-label="View today's Food events"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl">
                        🍽️
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">
                          Today: New Brazilian Restaurant
                        </div>
                        <div className="text-sm text-gray-600">
                          All Day • Vauxhall
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">
                      "Abertura do novo restaurante brasileiro com pratos
                      tradicionais e ambiente acolhedor."
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex gap-2">
                        <Link
                          href={`${ROUTES.events}?ref=home&day=today`}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Today
                        </Link>
                        <Link
                          href={`${ROUTES.events}?ref=home&tag=food`}
                          className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Food
                        </Link>
                      </div>
                      <Link
                        href={`${ROUTES.events}?ref=home&day=today&tag=food`}
                        className="text-sm font-medium text-primary-700 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t("common.view_more", "View more")}
                      </Link>
                    </div>
                  </div>

                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      router.push(
                        `${ROUTES.events}?ref=home&day=tomorrow&tag=business`
                      )
                    }
                    onClick={() =>
                      router.push(
                        `${ROUTES.events}?ref=home&day=tomorrow&tag=business`
                      )
                    }
                    className="group bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200/50 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
                    aria-label="View tomorrow's Business events"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-2xl">
                        💼
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">
                          Tomorrow: Lusophone Business Breakfast
                        </div>
                        <div className="text-sm text-gray-600">
                          8am • Manchester
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">
                      "Networking matinal para profissionais portugueses no
                      setor financeiro."
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex gap-2">
                        <Link
                          href={`${ROUTES.events}?ref=home&day=tomorrow`}
                          className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Tomorrow
                        </Link>
                        <Link
                          href={`${ROUTES.events}?ref=home&tag=business`}
                          className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Business
                        </Link>
                      </div>
                      <Link
                        href={`${ROUTES.events}?ref=home&day=tomorrow&tag=business`}
                        className="text-sm font-medium text-primary-700 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t("common.view_more", "View more")}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* CTA for Today's Events */}
                <div className="text-center">
                  <a
                    href={ROUTES.events}
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2"
                  >
                    <CalendarDaysIcon className="w-5 h-5 mr-2" />
                    {t("today.cta", "See All Today's Events")}
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* QUICK NAVIGATION BAR - Mobile-First Sticky Navigation */}
          <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-4">
              <div className="flex gap-1 overflow-x-auto scrollbar-hide py-3" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style jsx>{`
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <a
                  href={`${ROUTES.events}?filter=tonight`}
                  className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-200 min-w-[100px] justify-center"
                >
                  <span className="text-base">🌙</span>
                  <span>Tonight</span>
                </a>
                <a
                  href={`${ROUTES.events}?filter=weekend`}
                  className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-sm font-semibold rounded-full hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 min-w-[100px] justify-center"
                >
                  <span className="text-base">🎉</span>
                  <span>Weekend</span>
                </a>
                <a
                  href={ROUTES.events}
                  className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-200 min-w-[100px] justify-center"
                >
                  <span className="text-base">📅</span>
                  <span>Events</span>
                </a>
                <a
                  href={ROUTES.businessDirectory}
                  className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-200 min-w-[100px] justify-center"
                >
                  <span className="text-base">🏢</span>
                  <span>Business</span>
                </a>
                <a
                  href={`${ROUTES.events}?category=cultural`}
                  className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-semibold rounded-full hover:from-purple-600 hover:to-purple-700 transition-all duration-200 min-w-[100px] justify-center"
                >
                  <span className="text-base">🎵</span>
                  <span>Culture</span>
                </a>
                <a
                  href={`${ROUTES.events}?category=food`}
                  className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-200 min-w-[100px] justify-center"
                >
                  <span className="text-base">🍽️</span>
                  <span>Food</span>
                </a>
              </div>
            </div>
          </section>

          {/* TODAY'S EVENT PREVIEWS - Mobile-Optimized 2x2 Grid */}
          <section className="py-8 md:py-12 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {t("today.title", "What's Happening Today")}
                  </h2>
                  <p className="text-gray-600">
                    {t("today.subtitle", "Join the Portuguese-speaking community's daily activities")}
                  </p>
                </div>

                {/* 2-Column Event Preview Grid with Portuguese Cultural Styling */}
                <div className="mobile-event-discovery grid grid-cols-2 gap-3 sm:gap-4 mb-8">
                  <div className="event-card heritage-selection-card lusophone-touch-target bg-white rounded-xl p-4 shadow-sm border border-green-200 hover:shadow-md transition-shadow cursor-pointer max-h-[140px] overflow-hidden"
                       onClick={() => router.push(`${ROUTES.events}?tag=fado`)}>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-red-500 rounded-lg flex items-center justify-center text-lg flag-flow-animation">🎵</div>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium heritage-indicator">Portugal</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 responsive-portuguese-title portuguese-text-clamp-2">Fado Night Camden</h3>
                        <p className="text-xs text-gray-600 leading-tight portuguese-text-clamp-2 responsive-portuguese-text">Traditional Portuguese music</p>
                        <p className="text-xs text-green-600 font-medium mt-1">8pm • Tonight</p>
                      </div>
                    </div>
                  </div>

                  <div className="event-card heritage-selection-card lusophone-touch-target bg-white rounded-xl p-4 shadow-sm border border-yellow-200 hover:shadow-md transition-shadow cursor-pointer max-h-[140px] overflow-hidden"
                       onClick={() => router.push(`${ROUTES.events}?tag=kizomba`)}>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg flex items-center justify-center text-lg flag-flow-animation">💃</div>
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium heritage-indicator">Angola</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 responsive-portuguese-title portuguese-text-clamp-2">Kizomba Classes</h3>
                        <p className="text-xs text-gray-600 leading-tight portuguese-text-clamp-2 responsive-portuguese-text">Learn partner dancing</p>
                        <p className="text-xs text-yellow-600 font-medium mt-1">7pm • Brixton</p>
                      </div>
                    </div>
                  </div>

                  <div className="event-card heritage-selection-card lusophone-touch-target bg-white rounded-xl p-4 shadow-sm border border-blue-200 hover:shadow-md transition-shadow cursor-pointer max-h-[140px] overflow-hidden"
                       onClick={() => router.push(`${ROUTES.events}?tag=food`)}>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-lg flag-flow-animation">🍽️</div>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium heritage-indicator">Brazil</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 responsive-portuguese-title portuguese-text-clamp-2">Brazilian Restaurant</h3>
                        <p className="text-xs text-gray-600 leading-tight portuguese-text-clamp-2 responsive-portuguese-text">New opening celebration</p>
                        <p className="text-xs text-blue-600 font-medium mt-1">All Day • Vauxhall</p>
                      </div>
                    </div>
                  </div>

                  <div className="event-card heritage-selection-card lusophone-touch-target bg-white rounded-xl p-4 shadow-sm border border-purple-200 hover:shadow-md transition-shadow cursor-pointer max-h-[140px] overflow-hidden"
                       onClick={() => router.push(`${ROUTES.events}?tag=business`)}>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-lg flag-flow-animation">💼</div>
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium heritage-indicator">PALOP</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 responsive-portuguese-title portuguese-text-clamp-2">Business Breakfast</h3>
                        <p className="text-xs text-gray-600 leading-tight portuguese-text-clamp-2 responsive-portuguese-text">Lusophone networking</p>
                        <p className="text-xs text-purple-600 font-medium mt-1">8am • Manchester</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* View All Events CTA */}
                <div className="text-center">
                  <a
                    href={ROUTES.events}
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <CalendarDaysIcon className="w-4 h-4 mr-2" />
                    {t("events.view_all", "View All Events")}
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* THIS WEEKEND'S LUSOPHONE EVENTS - Mobile-Optimized */}
          <section className="py-8 md:py-12 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {t("weekend.title", "This Weekend's Highlights")}
                  </h2>
                  <p className="text-gray-600">
                    {t("weekend.subtitle", "Lusophone community events across the United Kingdom")}
                  </p>
                </div>

                {/* Mobile-Optimized Weekend Events Grid with Portuguese Cultural Styling */}
                <div className="mobile-event-discovery grid grid-cols-2 gap-3 sm:gap-4 mb-8">
                  <div
                    className="event-card heritage-selection-card lusophone-touch-target bg-white rounded-xl p-4 shadow-sm border border-green-200 hover:shadow-md transition-shadow cursor-pointer max-h-[140px] overflow-hidden"
                    onClick={() => router.push(`${ROUTES.events}?tag=music&country=cv`)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-lg flag-flow-animation">🎶</div>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium heritage-indicator">Cape Verde</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 responsive-portuguese-title portuguese-text-clamp-2">Music Festival</h3>
                        <p className="text-xs text-gray-600 leading-tight portuguese-text-clamp-2 responsive-portuguese-text">International artists & Morna</p>
                        <p className="text-xs text-green-600 font-medium mt-1">Sat 7pm • Brixton</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="event-card heritage-selection-card lusophone-touch-target bg-white rounded-xl p-4 shadow-sm border border-red-200 hover:shadow-md transition-shadow cursor-pointer max-h-[140px] overflow-hidden"
                    onClick={() => router.push(`${ROUTES.events}?tag=dance&country=ao`)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg flex items-center justify-center text-lg flag-flow-animation">💃</div>
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium heritage-indicator">Angola</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 responsive-portuguese-title portuguese-text-clamp-2">Kizomba Night</h3>
                        <p className="text-xs text-gray-600 leading-tight portuguese-text-clamp-2 responsive-portuguese-text">Live music & partner dancing</p>
                        <p className="text-xs text-red-600 font-medium mt-1">Fri 8pm • E&Castle</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="event-card heritage-selection-card lusophone-touch-target bg-white rounded-xl p-4 shadow-sm border border-blue-200 hover:shadow-md transition-shadow cursor-pointer max-h-[140px] overflow-hidden"
                    onClick={() => router.push(`${ROUTES.events}?tag=food&country=mz`)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-lg flag-flow-animation">🌶️</div>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium heritage-indicator">Mozambique</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 responsive-portuguese-title portuguese-text-clamp-2">Spice Market</h3>
                        <p className="text-xs text-gray-600 leading-tight portuguese-text-clamp-2 responsive-portuguese-text">Authentic coastal flavors</p>
                        <p className="text-xs text-blue-600 font-medium mt-1">Sun 11am • Commercial</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="event-card heritage-selection-card lusophone-touch-target bg-white rounded-xl p-4 shadow-sm border border-purple-200 hover:shadow-md transition-shadow cursor-pointer max-h-[140px] overflow-hidden"
                    onClick={() => router.push(`${ROUTES.events}?tag=culture&country=pt`)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-red-500 rounded-lg flex items-center justify-center text-lg flag-flow-animation">🏰</div>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium heritage-indicator">Portugal</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 responsive-portuguese-title portuguese-text-clamp-2">Heritage Tour</h3>
                        <p className="text-xs text-gray-600 leading-tight portuguese-text-clamp-2 responsive-portuguese-text">Portuguese historical sites</p>
                        <p className="text-xs text-purple-600 font-medium mt-1">Sun 2pm • Central</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* View Weekend Events CTA */}
                <div className="text-center">
                  <a
                    href={`${ROUTES.events}?filter=weekend`}
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <span className="text-base mr-2">🎉</span>
                    {t("weekend.view_all", "See Full Weekend")}
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </section>


          {/* WEEKLY COMMUNITY DISCOVERY SECTION - Fixed spacing */}
          <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-purple-50 to-pink-50 section-spacing">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-6 py-3 rounded-full font-bold text-sm mb-6">
                    <UsersIcon className="w-4 h-4" />
                    {t("weekly.badge", "WEEKLY COMMUNITY DISCOVERY")}
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                    {t("weekly.title", "Weekly Lusophone Community Activities")}
                  </h2>

                  <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    {t(
                      "weekly.subtitle",
                      "Discover the recurring activities and meetups that bring our community together every week across London and the United Kingdom"
                    )}
                  </p>
                </div>

                {/* Weekly Activities Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      router.push(
                        `${ROUTES.events}?ref=home&when=weekly&tag=language`
                      )
                    }
                    onClick={() =>
                      router.push(
                        `${ROUTES.events}?ref=home&when=weekly&tag=language`
                      )
                    }
                    className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
                    aria-label="See weekly language exchange events"
                  >
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl">
                        🗣️
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Monday: Lusophone Language Exchange
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">7pm • Camden</p>
                    </div>
                    <p className="text-gray-700 text-sm mb-4">
                      "Encontro semanal para prática da língua. Ideal para
                      melhorar português e conhecer nativos."
                    </p>
                    <div className="flex items-center justify-between flex-wrap gap-2 mt-2">
                      <div className="flex gap-2 flex-wrap">
                        <Link
                          href={`${ROUTES.events}?ref=home&tag=language`}
                          className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Language
                        </Link>
                        <Link
                          href={`${ROUTES.events}?ref=home&when=weekly`}
                          className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Weekly
                        </Link>
                      </div>
                      <Link
                        href={`${ROUTES.events}?ref=home&when=weekly&tag=language`}
                        className="text-sm font-medium text-primary-700 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t("common.view_more", "View more")}
                      </Link>
                    </div>
                  </div>

                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      router.push(
                        `${ROUTES.events}?ref=home&when=weekly&tag=business&tag=palop`
                      )
                    }
                    onClick={() =>
                      router.push(
                        `${ROUTES.events}?ref=home&when=weekly&tag=business&tag=palop`
                      )
                    }
                    className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
                    aria-label="See weekly PALOP business networking"
                  >
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center text-3xl">
                        🏂
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Wednesday: PALOP Business Networking
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        6pm • City of London
                      </p>
                    </div>
                    <p className="text-gray-700 text-sm mb-4">
                      "Networking semanal para empresários PALOP. Oportunidades
                      de negócios e parcerias."
                    </p>
                    <div className="flex items-center justify-between flex-wrap gap-2 mt-2">
                      <div className="flex gap-2 flex-wrap">
                        <Link
                          href={`${ROUTES.events}?ref=home&tag=business`}
                          className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Business
                        </Link>
                        <Link
                          href={`${ROUTES.events}?ref=home&tag=palop`}
                          className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          PALOP
                        </Link>
                      </div>
                      <Link
                        href={`${ROUTES.events}?ref=home&when=weekly&tag=business&tag=palop`}
                        className="text-sm font-medium text-primary-700 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t("common.view_more", "View more")}
                      </Link>
                    </div>
                  </div>

                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      router.push(
                        `${ROUTES.events}?ref=home&when=weekly&tag=dance&country=br`
                      )
                    }
                    onClick={() =>
                      router.push(
                        `${ROUTES.events}?ref=home&when=weekly&tag=dance&country=br`
                      )
                    }
                    className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-500 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
                    aria-label="See weekly Brazilian dance classes"
                  >
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center text-3xl">
                        💃
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Friday: Brazilian Dance Classes
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        8pm • Multiple Locations
                      </p>
                    </div>
                    <p className="text-gray-700 text-sm mb-4">
                      "Aulas semanais de samba, forro e danças brasileiras.
                      Venha dançar e fazer amizades!"
                    </p>
                    <div className="flex items-center justify-between flex-wrap gap-2 mt-2">
                      <div className="flex gap-2 flex-wrap">
                        <Link
                          href={`${ROUTES.events}?ref=home&tag=dance`}
                          className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Dance
                        </Link>
                        <Link
                          href={`${ROUTES.events}?ref=home&country=br`}
                          className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          🇧🇷 Brazil
                        </Link>
                      </div>
                      <Link
                        href={`${ROUTES.events}?ref=home&when=weekly&tag=dance&country=br`}
                        className="text-sm font-medium text-primary-700 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t("common.view_more", "View more")}
                      </Link>
                    </div>
                  </div>

                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      router.push(
                        `${ROUTES.events}?ref=home&when=weekly&tag=football&tag=social`
                      )
                    }
                    onClick={() =>
                      router.push(
                        `${ROUTES.events}?ref=home&when=weekly&tag=football&tag=social`
                      )
                    }
                    className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
                    aria-label="See weekly Lusophone football socials"
                  >
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-3xl">
                        ⚽
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Sunday: Lusophone Football Social
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        3pm • Various Pubs
                      </p>
                    </div>
                    <p className="text-gray-700 text-sm mb-4">
                      "Assistir jogos de futebol português e brasileiro com a
                      comunidade. Tapas e cerveja!"
                    </p>
                    <div className="flex items-center justify-between flex-wrap gap-2 mt-2">
                      <div className="flex gap-2 flex-wrap">
                        <Link
                          href={`${ROUTES.events}?ref=home&tag=football`}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Football
                        </Link>
                        <Link
                          href={`${ROUTES.events}?ref=home&tag=social`}
                          className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Social
                        </Link>
                      </div>
                      <Link
                        href={`${ROUTES.events}?ref=home&when=weekly&tag=football&tag=social`}
                        className="text-sm font-medium text-primary-700 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t("common.view_more", "View more")}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Weekly Pattern Showcase */}
                <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-3xl p-8 lg:p-12 text-white mb-16">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                      {t(
                        "weekly.pattern.title",
                        "Your Weekly Lusophone Community Calendar"
                      )}
                    </h3>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                      {t(
                        "weekly.pattern.subtitle",
                        "Never wonder what's happening - your community has activities every day of the week"
                      )}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-7 gap-4 text-center">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-2xl mb-2">🗣️</div>
                      <div className="font-bold text-sm">Monday</div>
                      <div className="text-xs text-gray-300 mt-1">
                        Language Exchange
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-2xl mb-2">🍽️</div>
                      <div className="font-bold text-sm">Tuesday</div>
                      <div className="text-xs text-gray-300 mt-1">
                        Food Tours
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-2xl mb-2">🏂</div>
                      <div className="font-bold text-sm">Wednesday</div>
                      <div className="text-xs text-gray-300 mt-1">
                        Business Network
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-2xl mb-2">🎵</div>
                      <div className="font-bold text-sm">Thursday</div>
                      <div className="text-xs text-gray-300 mt-1">
                        Fado Nights
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-2xl mb-2">💃</div>
                      <div className="font-bold text-sm">Friday</div>
                      <div className="text-xs text-gray-300 mt-1">
                        Dance Classes
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-2xl mb-2">🎉</div>
                      <div className="font-bold text-sm">Saturday</div>
                      <div className="text-xs text-gray-300 mt-1">
                        Cultural Events
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-2xl mb-2">⚽</div>
                      <div className="font-bold text-sm">Sunday</div>
                      <div className="text-xs text-gray-300 mt-1">
                        Football Social
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weekly CTA */}
                <div className="text-center">
                  <a
                    href={ROUTES.events}
                    className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2 hover:scale-105"
                  >
                    <CalendarDaysIcon className="w-6 h-6 mr-3" />
                    {t("weekly.cta", "Join Weekly Community Activities")}
                    <ArrowRightIcon className="w-6 h-6 ml-3" />
                  </a>

                  <p className="text-sm text-gray-600 mt-4">
                    {t(
                      "weekly.guarantee",
                      "Free to join most activities • New members always welcome • Build lasting friendships"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* PALOP HERITAGE CELEBRATION SECTION - Fixed spacing */}
          <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 section-spacing">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-full font-bold text-sm mb-6">
                    <SparklesIcon className="w-4 h-4" />
                    {t(
                      "palop.community.pride",
                      "Celebrating PALOP Heritage Pride"
                    )}
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                    {t(
                      "palop.full_name",
                      "Países Africanos de Língua Oficial Portuguesa"
                    )}
                  </h2>

                  <div className="text-3xl mb-6">🇦🇴 🇨🇻 🇬🇼 🇲🇿 🇸🇹</div>

                  <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                    {t(
                      "palop.success.subtitle",
                      "Where PALOP Cultures Thrive in Britain"
                    )}{" "}
                    - Angola, Cape Verde, Guinea-Bissau, Mozambique, São Tomé
                    and Príncipe communities creating incredible businesses,
                    cultural events, and success stories across the United
                    Kingdom.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {/* Angola */}
                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      router.push(`${ROUTES.events}?ref=home&country=ao`)
                    }
                    onClick={() =>
                      router.push(`${ROUTES.events}?ref=home&country=ao`)
                    }
                    className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-red-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-3">🇦🇴</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Angola
                      </h3>
                      <p className="text-sm text-gray-600">
                        Diamond Capital & Kizomba Culture
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-red-50 rounded-lg p-3">
                        <div className="font-semibold text-red-800 text-sm">
                          💎 Elite Diamond Trading
                        </div>
                        <div className="text-xs text-red-600">
                          Hatton Garden luxury boutiques
                        </div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <div className="font-semibold text-orange-800 text-sm">
                          💃 Kizomba Dance Studios
                        </div>
                        <div className="text-xs text-orange-600">
                          Authentic partner connection culture
                        </div>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-3">
                        <div className="font-semibold text-yellow-800 text-sm">
                          🎵 November Independence Festival
                        </div>
                        <div className="text-xs text-yellow-600">
                          Celebrating 49+ years of freedom
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cape Verde */}
                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      router.push(`${ROUTES.events}?ref=home&country=cv`)
                    }
                    onClick={() =>
                      router.push(`${ROUTES.events}?ref=home&country=cv`)
                    }
                    className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-blue-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-3">🇨🇻</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Cape Verde
                      </h3>
                      <p className="text-sm text-gray-600">
                        Island Music & Community Spirit
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="font-semibold text-blue-800 text-sm">
                          🎵 Morna Music Schools
                        </div>
                        <div className="text-xs text-blue-600">
                          Soul-stirring island blues
                        </div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="font-semibold text-green-800 text-sm">
                          🍲 Authentic Cachupa Restaurants
                        </div>
                        <div className="text-xs text-green-600">
                          National dish served with love
                        </div>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-3">
                        <div className="font-semibold text-yellow-800 text-sm">
                          🏝️ July Independence Celebration
                        </div>
                        <div className="text-xs text-yellow-600">
                          Island freedom & community joy
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mozambique */}
                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      router.push(`${ROUTES.events}?ref=home&country=mz`)
                    }
                    onClick={() =>
                      router.push(`${ROUTES.events}?ref=home&country=mz`)
                    }
                    className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-green-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-3">🇲🇿</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Mozambique
                      </h3>
                      <p className="text-sm text-gray-600">
                        Coastal Spices & Trading Heritage
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="font-semibold text-green-800 text-sm">
                          🌶️ Spice Trading Companies
                        </div>
                        <div className="text-xs text-green-600">
                          Authentic peri-peri & coastal spices
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="font-semibold text-blue-800 text-sm">
                          🍤 Indian Ocean Cuisine
                        </div>
                        <div className="text-xs text-blue-600">
                          Prawns, coconut, & coastal flavors
                        </div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="font-semibold text-purple-800 text-sm">
                          🎶 June Independence Celebration
                        </div>
                        <div className="text-xs text-purple-600">
                          Marrabenta music & coastal culture
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Guinea-Bissau */}
                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      router.push(`${ROUTES.events}?ref=home&country=gw`)
                    }
                    onClick={() =>
                      router.push(`${ROUTES.events}?ref=home&country=gw`)
                    }
                    className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-purple-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-3">🇬🇼</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Guinea-Bissau
                      </h3>
                      <p className="text-sm text-gray-600">
                        Cultural Resilience & Heritage
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="font-semibold text-purple-800 text-sm">
                          🎨 Community Cultural Centers
                        </div>
                        <div className="text-xs text-purple-600">
                          Traditional arts & heritage preservation
                        </div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="font-semibold text-green-800 text-sm">
                          📚 Language Preservation Programs
                        </div>
                        <div className="text-xs text-green-600">
                          Crioulo & cultural identity support
                        </div>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-3">
                        <div className="font-semibold text-yellow-800 text-sm">
                          💪 September Independence Festival
                        </div>
                        <div className="text-xs text-yellow-600">
                          Cultural resilience & community strength
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* São Tomé and Príncipe */}
                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      router.push(`${ROUTES.events}?ref=home&country=st`)
                    }
                    onClick={() =>
                      router.push(`${ROUTES.events}?ref=home&country=st`)
                    }
                    className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-orange-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-3">🇸🇹</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        São Tomé
                      </h3>
                      <p className="text-sm text-gray-600">
                        Paradise Islands & Cocoa Heritage
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-orange-50 rounded-lg p-3">
                        <div className="font-semibold text-orange-800 text-sm">
                          ☕ Premium Cocoa Cafés
                        </div>
                        <div className="text-xs text-orange-600">
                          World-class cocoa & tropical atmosphere
                        </div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="font-semibold text-green-800 text-sm">
                          🏝️ Island Paradise Culture
                        </div>
                        <div className="text-xs text-green-600">
                          Tropical hospitality & natural beauty
                        </div>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-3">
                        <div className="font-semibold text-yellow-800 text-sm">
                          🌺 July Independence Celebration
                        </div>
                        <div className="text-xs text-yellow-600">
                          Paradise island freedom festival
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PALOP Business Excellence */}
                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      router.push(`${ROUTES.events}?ref=home&tag=palop`)
                    }
                    onClick={() =>
                      router.push(`${ROUTES.events}?ref=home&tag=palop`)
                    }
                    className="bg-gradient-to-br from-green-500 to-yellow-500 rounded-2xl p-6 shadow-xl text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-200"
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-3">🤝</div>
                      <h3 className="text-xl font-bold mb-2">
                        PALOP Business Summit
                      </h3>
                      <p className="text-sm opacity-90">
                        Annual Excellence Celebration
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                        <div className="font-semibold text-sm">
                          💼 300+ PALOP Entrepreneurs
                        </div>
                        <div className="text-xs opacity-80">
                          Cross-country business networking
                        </div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                        <div className="font-semibold text-sm">
                          🌍 £50M+ Combined Revenue
                        </div>
                        <div className="text-xs opacity-80">
                          PALOP business success in the United Kingdom
                        </div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                        <div className="font-semibold text-sm">
                          🏆 Excellence Recognition
                        </div>
                        <div className="text-xs opacity-80">
                          Celebrating 50+ years of independence
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PALOP Pride CTA */}
                <div className="text-center">
                  <a
                    href={ROUTES.events}
                    className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-orange-600 via-red-500 to-yellow-600 text-white text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 mr-4"
                  >
                    <div className="flex items-center mr-3">
                      <span className="text-sm">🇦🇴🇨🇻🇬🇼🇲🇿🇸🇹</span>
                    </div>
                    {t(
                      "palop.events.independence.celebrations",
                      "PALOP Independence Celebrations"
                    )}
                    <ArrowRightIcon className="w-6 h-6 ml-3" />
                  </a>
                  <a
                    href="/business-directory"
                    className="inline-flex items-center justify-center px-8 py-5 border-2 border-orange-500 text-orange-700 text-lg font-semibold rounded-2xl hover:bg-orange-50 transition-all duration-300"
                  >
                    <BuildingOffice2Icon className="w-5 h-5 mr-2" />
                    {t(
                      "palop.business.directory.title",
                      "PALOP Business Directory"
                    )}
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* MONTHLY CULTURAL CALENDAR SECTION - Fixed spacing */}
          <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-indigo-50 via-blue-50 to-teal-50 section-spacing">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-blue-500 to-teal-500 text-white px-6 py-3 rounded-full font-bold text-sm mb-6">
                    <StarIcon className="w-4 h-4" />
                    {t("monthly.badge", "MONTHLY CULTURAL CALENDAR")}
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                    {t("monthly.title", "Your Lusophone Cultural Calendar")}
                  </h2>

                  <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    {t(
                      "monthly.subtitle",
                      "Plan ahead with major Portuguese-speaking community celebrations, independence days, and cultural festivals happening throughout the year"
                    )}
                  </p>
                </div>

                {/* Monthly Highlights Grid */}
                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      router.push(`${ROUTES.events}?ref=home&month=november`)
                    }
                    onClick={() =>
                      router.push(`${ROUTES.events}?ref=home&month=november`)
                    }
                    className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-red-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center text-4xl">
                        🇬🇴
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        November: PALOP Independence Month
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        Major Celebrations Across the United Kingdom
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-red-50 rounded-lg p-3">
                        <div className="font-semibold text-red-800 text-sm">
                          🇦🇴 Angola Independence Day - Nov 11
                        </div>
                        <div className="text-xs text-red-600">
                          49+ years of freedom celebration
                        </div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <div className="font-semibold text-orange-800 text-sm">
                          🎭 PALOP Cultural Festival - All Month
                        </div>
                        <div className="text-xs text-orange-600">
                          Art, music, food from all 5 countries
                        </div>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-3">
                        <div className="font-semibold text-yellow-800 text-sm">
                          🎆 London PALOP Awards - Nov 30
                        </div>
                        <div className="text-xs text-yellow-600">
                          Business excellence recognition
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      router.push(`${ROUTES.events}?ref=home&month=december`)
                    }
                    onClick={() =>
                      router.push(`${ROUTES.events}?ref=home&month=december`)
                    }
                    className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-green-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-4xl">
                        🎄
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        December: Lusophone Christmas
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        Festive Community Traditions
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="font-semibold text-green-800 text-sm">
                          🎂 Festa do Bacalhau - Dec 15
                        </div>
                        <div className="text-xs text-green-600">
                          Traditional codfish Christmas feast
                        </div>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-3">
                        <div className="font-semibold text-emerald-800 text-sm">
                          🎤 Concerto de Natal - Dec 22
                        </div>
                        <div className="text-xs text-emerald-600">
                          Lusophone Christmas concert
                        </div>
                      </div>
                      <div className="bg-red-50 rounded-lg p-3">
                        <div className="font-semibold text-red-800 text-sm">
                          🎉 Brazilian Réveillon - Dec 31
                        </div>
                        <div className="text-xs text-red-600">
                          New Year’s celebration party
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      router.push(`${ROUTES.events}?ref=home&month=february`)
                    }
                    onClick={() =>
                      router.push(`${ROUTES.events}?ref=home&month=february`)
                    }
                    className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-purple-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-4xl">
                        🎉
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        February: Brazilian Carnival
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        London Carnival Preparations
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="font-semibold text-purple-800 text-sm">
                          🎭 Pre-Carnival Workshops - All Feb
                        </div>
                        <div className="text-xs text-purple-600">
                          Samba dance and costume making
                        </div>
                      </div>
                      <div className="bg-pink-50 rounded-lg p-3">
                        <div className="font-semibold text-pink-800 text-sm">
                          🇬🇧 United Kingdom Brazilian Carnival - Feb 29
                        </div>
                        <div className="text-xs text-pink-600">
                          London’s biggest Brazilian party
                        </div>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-3">
                        <div className="font-semibold text-yellow-800 text-sm">
                          🎤 Escola de Samba - Feb 15
                        </div>
                        <div className="text-xs text-yellow-600">
                          London samba schools showcase
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Year-Round Calendar Overview */}
                <div className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 rounded-3xl p-8 lg:p-12 text-white mb-16">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                      {t(
                        "monthly.year_round.title",
                        "Year-Round Lusophone Community Highlights"
                      )}
                    </h3>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                      {t(
                        "monthly.year_round.subtitle",
                        "Major celebrations and cultural events that bring our community together throughout the year"
                      )}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") &&
                        router.push(`${ROUTES.events}?ref=home&season=spring`)
                      }
                      onClick={() =>
                        router.push(`${ROUTES.events}?ref=home&season=spring`)
                      }
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
                      aria-label="View spring Lusophone community highlights"
                    >
                      <div className="text-3xl mb-2">🌸</div>
                      <div className="font-bold text-sm mb-1">March - May</div>
                      <div className="text-xs text-gray-300">
                        Lusophone Spring Festivals
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Santos Populares preparation
                      </div>
                      <div className="mt-3">
                        <a
                          href={`${ROUTES.events}?ref=home&season=spring`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center text-xs font-semibold text-white/90 hover:text-white underline decoration-white/30 underline-offset-4"
                        >
                          {t("common.view_more", "View more")}
                          <span className="ml-1">→</span>
                        </a>
                      </div>
                    </div>
                    <div
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") &&
                        router.push(`${ROUTES.events}?ref=home&season=summer`)
                      }
                      onClick={() =>
                        router.push(`${ROUTES.events}?ref=home&season=summer`)
                      }
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
                      aria-label="View summer Lusophone community highlights"
                    >
                      <div className="text-3xl mb-2">☀️</div>
                      <div className="font-bold text-sm mb-1">
                        June - August
                      </div>
                      <div className="text-xs text-gray-300">
                        Summer Cultural Peak
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Santos Populares, PALOP independence
                      </div>
                      <div className="mt-3">
                        <a
                          href={`${ROUTES.events}?ref=home&season=summer`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center text-xs font-semibold text-white/90 hover:text-white underline decoration-white/30 underline-offset-4"
                        >
                          {t("common.view_more", "View more")}
                          <span className="ml-1">→</span>
                        </a>
                      </div>
                    </div>
                    <div
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") &&
                        router.push(`${ROUTES.events}?ref=home&season=autumn`)
                      }
                      onClick={() =>
                        router.push(`${ROUTES.events}?ref=home&season=autumn`)
                      }
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
                      aria-label="View autumn Lusophone community highlights"
                    >
                      <div className="text-3xl mb-2">🍂</div>
                      <div className="font-bold text-sm mb-1">
                        September - November
                      </div>
                      <div className="text-xs text-gray-300">
                        Heritage Months
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Independence celebrations peak
                      </div>
                      <div className="mt-3">
                        <a
                          href={`${ROUTES.events}?ref=home&season=autumn`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center text-xs font-semibold text-white/90 hover:text-white underline decoration-white/30 underline-offset-4"
                        >
                          {t("common.view_more", "View more")}
                          <span className="ml-1">→</span>
                        </a>
                      </div>
                    </div>
                    <div
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") &&
                        router.push(`${ROUTES.events}?ref=home&season=winter`)
                      }
                      onClick={() =>
                        router.push(`${ROUTES.events}?ref=home&season=winter`)
                      }
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
                      aria-label="View winter Lusophone community highlights"
                    >
                      <div className="text-3xl mb-2">❄️</div>
                      <div className="font-bold text-sm mb-1">
                        December - February
                      </div>
                      <div className="text-xs text-gray-300">
                        Holiday Traditions
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Christmas, New Year, Carnival
                      </div>
                      <div className="mt-3">
                        <a
                          href={`${ROUTES.events}?ref=home&season=winter`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center text-xs font-semibold text-white/90 hover:text-white underline decoration-white/30 underline-offset-4"
                        >
                          {t("common.view_more", "View more")}
                          <span className="ml-1">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Monthly CTA */}
                <div className="text-center">
                  <a
                    href={ROUTES.events}
                    className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-600 text-white text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 mr-4"
                  >
                    <CalendarDaysIcon className="w-6 h-6 mr-3" />
                    {t("monthly.cta", "View Full Cultural Calendar")}
                    <ArrowRightIcon className="w-6 h-6 ml-3" />
                  </a>
                  <a
                    href="#subscribe"
                    className="inline-flex items-center justify-center px-8 py-5 border-2 border-indigo-500 text-indigo-700 text-lg font-semibold rounded-2xl hover:bg-indigo-50 transition-all duration-300"
                  >
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    {t("monthly.subscribe", "Get Calendar Updates")}
                  </a>

                  <p className="text-sm text-gray-600 mt-4">
                    {t(
                      "monthly.guarantee",
                      "Never miss major Lusophone community celebrations • Monthly email reminders • Early event access"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* EVENTS & COMMUNITY SECTION - Connected Experience - Fixed spacing */}
          <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-secondary-50 to-accent-50 section-spacing">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                    {t("events.title", "Meet Your Matches at Lusophone Events")}
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    {t(
                      "events.subtitle",
                      "Join cultural events, festivals, and meetups where Portuguese speakers connect naturally."
                    )}
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                  {/* Left - Event Types */}
                  <div>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-lg">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold">
                          🎵
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">
                            Fado & Samba Nights
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Lusophone, Brazilian & Cape Verdean music across
                            United Kingdom venues
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-lg">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                          🍷
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">
                            Wine & Culture Tastings
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Explore wines from Portugal, Brazil & Lusophone
                            Africa
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-lg">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold">
                          ⚽
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">
                            Football Screenings
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Portugal, Brazil, Angola & all Lusophone teams
                            together
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-lg">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold">
                          🎭
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">
                            Cultural Festivals
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Santos Populares, Festa Junina, Carnaval & more
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <a
                        href={ROUTES.events}
                        className="inline-flex items-center justify-center px-8 py-4 bg-secondary-600 text-white font-bold rounded-2xl hover:bg-secondary-700 transition-colors duration-300"
                      >
                        <CalendarDaysIcon className="w-5 h-5 mr-2" />
                        {t("events.cta", "Browse All Events")}
                        <ArrowRightIcon className="w-5 h-5 ml-2" />
                      </a>
                    </div>
                  </div>

                  {/* Right - Success Story */}
                  <div className="bg-white rounded-3xl p-8 shadow-2xl">
                    <div className="text-center mb-6">
                      <div className="flex justify-center -space-x-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-red-500 border-4 border-white flex items-center justify-center text-white font-bold text-lg">
                          J
                        </div>
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-white flex items-center justify-center text-white font-bold text-lg">
                          A
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        João & Ana
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Met at Fado Night • Now Dating 💕
                      </p>
                    </div>

                    <blockquote className="text-gray-700 italic text-center mb-6">
                      "Conhecemo-nos numa noite de fado no Camden. A música
                      portuguesa criou uma conexão instantânea. Agora exploramos
                      o Reino Unido juntos todos os fins de semana!"
                    </blockquote>

                    <div className="bg-green-50 rounded-2xl p-4 text-center">
                      <div className="text-sm font-medium text-green-800 mb-1">
                        ⭐⭐⭐⭐⭐ "Perfect Match"
                      </div>
                      <div className="text-xs text-green-600">
                        🇵🇹 Both from Porto • Love for Fado • Now inseparable
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TESTIMONIALS SECTION - Proper spacing and layout */}
          <div className="testimonial-section section-transition">
            <TestimonialsNew />
          </div>

          {/* FINAL FREE SIGNUP CTA - Cohesive ending - Fixed spacing */}
          <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 text-white relative z-10 section-spacing">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-bold mb-8">
                  <CheckIcon className="w-4 h-4" />
                  {t("final_cta.badge", "JOIN Portuguese speakers")}
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6">
                  {t("final_cta.title", "Ready to Find Your Lusophone Match?")}
                </h2>

                <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                  {t(
                    "final_cta.subtitle",
                    "Join free today and start connecting with Portuguese speakers across the United Kingdom. No credit card required."
                  )}
                </p>

                {/* Trust indicators */}
                <div className="flex flex-wrap justify-center gap-8 mb-12 text-white/80">
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-green-300" />
                    <span className="font-semibold">100% Free to Join</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UsersIcon className="w-5 h-5" />
                    <span className="font-semibold">
                      {t("hero.trust.members", "Active Members")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HeartIcon className="w-5 h-5 text-red-300" />
                    <span className="font-semibold">Daily New Matches</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5" />
                    <span className="font-semibold">Across United Kingdom</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button
                    onClick={handleSignupClick}
                    className="group inline-flex items-center justify-center px-12 py-6 bg-white text-primary-700 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-2 hover:scale-105"
                  >
                    <div className="flex items-center mr-3 gap-1">
                      <span className="text-sm">🇵🇹</span>
                      <span className="text-sm">🇧🇷</span>
                      <span className="text-sm">🇦🇴</span>
                      <span className="text-sm">🇨🇻</span>
                      <span className="text-sm">🇲🇿</span>
                    </div>
                    {t("final_cta.primary", "JOIN FREE NOW")}
                    <ArrowRightIcon className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href={ROUTES.login}
                    className="inline-flex items-center justify-center px-8 py-6 border-2 border-white/30 text-white text-lg font-semibold rounded-2xl hover:border-white hover:bg-white/10 transition-all duration-300"
                  >
                    {t("final_cta.secondary", "Try Demo Account")}
                  </a>
                </div>

                <p className="text-sm text-white/70 mt-8">
                  {t(
                    "final_cta.guarantee",
                    "No spam, no credit card required. Cancel anytime. Join the United Kingdom's largest Portuguese-speaking community."
                  )}
                </p>
              </div>
            </div>
          </section>

          <EventsShowcase />
          <SuccessStories />
          <LusophoneTestimonials />

          {/* PALOP Events Showcase - Fixed spacing */}
          <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 section-spacing">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-full font-bold text-sm mb-6">
                    <SparklesIcon className="w-4 h-4" />
                    {t(
                      "palop.events.calendar.title",
                      "PALOP Cultural Calendar"
                    )}
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                    {t(
                      "palop.events.independence.celebrations",
                      "PALOP Independence Celebrations"
                    )}
                  </h2>

                  <div className="text-3xl mb-6">🇦🇴 🇨🇻 🇬🇼 🇲🇿 🇸🇹</div>

                  <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                    Join authentic celebrations from Angola's November Freedom
                    Festival to Cape Verde's Island Independence Day,
                    Mozambique's Coastal Freedom Festival, Guinea-Bissau's
                    Cultural Resilience Festival, and São Tomé's Paradise Island
                    Celebration.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {/* Angola Independence */}
                  <div className="bg-white rounded-2xl p-6 shadow-xl border-l-4 border-red-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-red-600 bg-red-50">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        Angola Independence
                      </div>
                      <div className="text-2xl">🇦🇴</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      November Freedom Festival
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Grand celebration featuring powerful Semba & Kizomba
                      performances, traditional cuisine, business networking,
                      and cultural pride celebrations that unite London's
                      Angolan community.
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                        🎵 Kizomba
                      </span>
                      <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                        💎 Business
                      </span>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        November
                      </span>
                    </div>
                  </div>

                  {/* Cape Verde Independence */}
                  <div className="bg-white rounded-2xl p-6 shadow-xl border-l-4 border-blue-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-blue-600 bg-blue-50">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Cape Verde Independence
                      </div>
                      <div className="text-2xl">🇨🇻</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Island Freedom Celebration
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Joyful celebration featuring heartfelt Morna music,
                      energetic Coladeira dancing, incredible Cachupa feasts,
                      and amazing community spirit of Cape Verdean culture.
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        🎵 Morna
                      </span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        🍲 Cachupa
                      </span>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        July
                      </span>
                    </div>
                  </div>

                  {/* Mozambique Independence */}
                  <div className="bg-white rounded-2xl p-6 shadow-xl border-l-4 border-green-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-green-600 bg-green-50">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Mozambique Independence
                      </div>
                      <div className="text-2xl">🇲🇿</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Coastal Freedom Festival
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Vibrant celebration featuring energetic Marrabenta music,
                      incredible coastal cuisine, cultural performances
                      showcasing Mozambique's African, Lusophone & Indian Ocean
                      influences.
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        🌶️ Spices
                      </span>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        🍤 Seafood
                      </span>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        June
                      </span>
                    </div>
                  </div>
                </div>

                {/* All PALOP Events CTA */}
                <div className="text-center">
                  <a
                    href={ROUTES.events}
                    className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-orange-600 via-red-500 to-yellow-600 text-white text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2 hover:scale-105"
                  >
                    <div className="flex items-center mr-3">
                      <span className="text-sm">🇦🇴🇨🇻🇬🇼🇲🇿🇸🇹</span>
                    </div>
                    {t(
                      "palop.events.independence.celebrations",
                      "View All PALOP Celebrations"
                    )}
                    <ArrowRightIcon className="w-6 h-6 ml-3" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </div>

        {/* Mobile Floating CTA - Prominent matching action */}
        <div className="md:hidden fixed bottom-20 right-4 z-40">
          <button
            onClick={handleSignupClick}
            className="group w-18 h-18 bg-gradient-to-br from-green-600 via-yellow-500 to-red-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center active:scale-95 animate-pulse"
            aria-label="Join Lusophone community - FREE"
          >
            <div className="flex flex-col items-center">
              <HeartIcon className="w-6 h-6 group-hover:scale-110 transition-transform mb-1" />
              <span className="text-xs font-bold leading-tight">
                JOIN
                <br />
                FREE
              </span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-500 via-blue-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <div className="flex gap-0.5 text-xs">
                <span>🇵🇹</span>
                <span>🇦🇴</span>
              </div>
            </div>
          </button>

          {/* Enhanced PALOP Tooltip */}
          <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            <span className="flex gap-1 items-center">
              <span>🇵🇹🇧🇷🇦🇴🇨🇻🇲🇿🇬🇼🇸🇹</span>
              {t(
                "palop.community.welcome",
                "Join PALOP & Lusophone community - FREE!"
              )}
            </span>
            <div className="text-xs opacity-80 mt-1 text-center">
              PALOP Recognition Platform
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-0 h-0 border-l-[8px] border-l-gray-900 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"></div>
          </div>
        </div>

        {/* Mobile Welcome Wizard */}
        <MobileWelcomeWizard
          isOpen={showWelcomeWizard}
          onClose={() => setShowWelcomeWizard(false)}
          onComplete={handleWelcomeComplete}
        />
      </main>
    </>
  );
}
