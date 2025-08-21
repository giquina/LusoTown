"use client";

import { useState } from "react";
import { ROUTES } from '@/config'
import { motion, AnimatePresence } from "framer-motion";
import { ROUTES } from '@/config'
import Link from "next/link";
import { ROUTES } from '@/config'
import { useRouter, usePathname } from "next/navigation";
import { ROUTES } from '@/config'
import {
  BookOpenIcon,
  ChartBarIcon,
  UserGroupIcon,
  CogIcon,
  HomeIcon,
  ArrowLeftIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  BookOpen,
  GraduationCap,
  Target,
  Users,
  Heart,
  Video,
  MapPin,
  Home,
  MessageCircle,
  BarChart3,
  Settings,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ROUTES } from '@/config'

interface AcademyLayoutProps {
  children: React.ReactNode;
}

export default function AcademyLayout({ children }: AcademyLayoutProps) {
  const { language } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isPortuguese = language === "pt";

  // Academy navigation structure
  const navigationSections = [
    {
      id: "overview",
      title: isPortuguese ? "Visão Geral" : "Overview",
      items: [
        {
          id: "academy-home",
          label: isPortuguese ? "Início da Academia" : "Academy Home",
          href: "/academy",
          icon: GraduationCap,
          description: isPortuguese
            ? "Página principal da academia"
            : "Main academy page",
        },
        {
          id: "learning-paths",
          label: isPortuguese ? "Caminhos de Aprendizado" : "Learning Paths",
          href: "/academy/paths",
          icon: Target,
          description: isPortuguese
            ? "Percursos personalizados"
            : "Personalized learning tracks",
        },
        {
          id: "progress",
          label: isPortuguese ? "Meu Progresso" : "My Progress",
          href: "/academy/progress",
          icon: BarChart3,
          description: isPortuguese
            ? "Acompanhe seu progresso"
            : "Track your progress",
        },
      ],
    },
    {
      id: "services",
      title: isPortuguese ? "Guias de Serviços" : "Service Guides",
      items: [
        {
          id: "dating-matching",
          label: isPortuguese
            ? "Encontros & Compatibilidade"
            : "Dating & Matching",
          href: "/academy/dating-matching",
          icon: Heart,
          difficulty: "Beginner",
          estimatedTime: "20 min",
        },
        {
          id: "live-streaming",
          label: isPortuguese ? "Transmissão Ao Vivo" : "Live Streaming",
          href: "/academy/live-streaming",
          icon: Video,
          difficulty: "Intermediate",
          estimatedTime: "35 min",
        },
        {
          id: "transport-chauffeur",
          label: isPortuguese
            ? "Transporte & Motorista"
            : "Transport & Chauffeur",
          href: "/academy/transport-chauffeur",
          icon: MapPin,
          difficulty: "Beginner",
          estimatedTime: "15 min",
        },
        {
          id: "business-networking",
          label: isPortuguese
            ? "Networking Empresarial"
            : "Business Networking",
          href: "/academy/business-networking",
          icon: Users,
          difficulty: "Intermediate",
          estimatedTime: "25 min",
        },
        {
          id: "cultural-events",
          label: isPortuguese ? "Eventos Culturais" : "Cultural Events",
          href: "/academy/cultural-events",
          icon: BookOpen,
          difficulty: "Beginner",
          estimatedTime: "10 min",
        },
        {
          id: "housing-assistance",
          label: isPortuguese
            ? "Assistência Habitacional"
            : "Housing Assistance",
          href: "/academy/housing-assistance",
          icon: Home,
          difficulty: "Beginner",
          estimatedTime: "18 min",
        },
        {
          id: "student-support",
          label: isPortuguese ? "Apoio Estudantil" : "Student Support",
          href: "/academy/student-support",
          icon: GraduationCap,
          difficulty: "Beginner",
          estimatedTime: "22 min",
        },
        {
          id: "community-forums",
          label: isPortuguese ? "Fóruns Comunitários" : "Community Forums",
          href: "/academy/community-forums",
          icon: MessageCircle,
          difficulty: "Beginner",
          estimatedTime: "12 min",
        },
      ],
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "Advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-secondary-100 text-secondary-700";
    }
  };

  const isCurrentPath = (href: string) => {
    if (href === "/academy") {
      return pathname === ROUTES.academy;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Academy Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container-width">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push({ROUTES.home})}
                className="flex items-center gap-2 text-secondary-600 hover:text-primary-600 transition-colors"
                title={
                  isPortuguese
                    ? "Voltar ao site principal"
                    : "Back to main site"
                }
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:block text-sm font-medium">
                  {isPortuguese ? "Voltar" : "Back"}
                </span>
              </button>

              <div className="h-6 w-px bg-gray-300"></div>

              <Link href="/academy" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">
                    {isPortuguese ? "Academia LusoTown" : "LusoTown Academy"}
                  </h1>
                  <p className="text-xs text-secondary-600 hidden sm:block">
                    {isPortuguese ? "Centro de Aprendizado" : "Learning Center"}
                  </p>
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-secondary-600 hover:text-primary-600 transition-colors"
              aria-label={isPortuguese ? "Abrir menu" : "Open menu"}
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Desktop Progress Indicator */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="text-sm text-secondary-600">
                {isPortuguese ? "Progresso:" : "Progress:"}
              </div>
              <div className="w-32 bg-secondary-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full w-0 transition-all duration-500"></div>
              </div>
              <div className="text-sm font-medium text-primary-600">0%</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <AnimatePresence>
          {(sidebarOpen ||
            (typeof window !== "undefined" && window.innerWidth >= 1024)) && (
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed lg:sticky top-16 left-0 z-30 w-80 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 overflow-y-auto lg:block"
            >
              <div className="p-6">
                {/* Academy Stats */}
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-4 mb-6 border border-primary-100">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-primary-600">
                        8
                      </div>
                      <div className="text-xs text-secondary-600">
                        {isPortuguese ? "Serviços" : "Services"}
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-secondary-600">
                        32
                      </div>
                      <div className="text-xs text-secondary-600">
                        {isPortuguese ? "Módulos" : "Modules"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Sections */}
                <nav className="space-y-6">
                  {navigationSections.map((section) => (
                    <div key={section.id}>
                      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                        {section.title}
                      </h3>
                      <ul className="space-y-1">
                        {section.items.map((item) => (
                          <li key={item.id}>
                            <Link
                              href={item.href}
                              onClick={() => setSidebarOpen(false)}
                              className={`group flex items-start gap-3 p-3 rounded-xl transition-all duration-200 ${
                                isCurrentPath(item.href)
                                  ? "bg-primary-50 text-primary-700 border border-primary-200"
                                  : "text-secondary-700 hover:bg-gray-50 hover:text-primary-600"
                              }`}
                            >
                              <item.icon
                                className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                                  isCurrentPath(item.href)
                                    ? "text-primary-600"
                                    : "text-gray-400 group-hover:text-primary-500"
                                }`}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium leading-tight">
                                  {item.label}
                                </div>
                                {item.description && (
                                  <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                                    {item.description}
                                  </div>
                                )}
                                {(item.difficulty || item.estimatedTime) && (
                                  <div className="flex items-center gap-2 mt-2">
                                    {item.difficulty && (
                                      <span
                                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(
                                          item.difficulty
                                        )}`}
                                      >
                                        {item.difficulty}
                                      </span>
                                    )}
                                    {item.estimatedTime && (
                                      <span className="text-xs text-gray-500">
                                        {item.estimatedTime}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>

                {/* Help Section */}
                <div className="mt-8 p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-secondary-600" />
                    <h4 className="text-sm font-semibold text-gray-900">
                      {isPortuguese ? "Precisa de Ajuda?" : "Need Help?"}
                    </h4>
                  </div>
                  <p className="text-xs text-secondary-600 mb-3">
                    {isPortuguese
                      ? "Contacte a nossa equipa de apoio para assistência personalizada."
                      : "Contact our support team for personalized assistance."}
                  </p>
                  <button className="w-full bg-primary-600 text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-primary-700 transition-colors">
                    {isPortuguese ? "Contactar Apoio" : "Contact Support"}
                  </button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">{children}</main>
      </div>
    </div>
  );
}
