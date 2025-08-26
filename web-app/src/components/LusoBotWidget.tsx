"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  SparklesIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/LanguageContext";
import {
  COMPONENT_Z_INDEX,
  getMobileWidgetClasses,
} from "@/config/z-index-layers";
import LusoBotChat from "./LusoBotChat";
import { useAppDownloadBarVisible } from "./AppDownloadBar";
import { useWidget } from "./WidgetManager";
import { useAriaAnnouncements, ARIA_MESSAGES } from "@/hooks/useAriaAnnouncements";
import { useFocusManagement, useFocusIndicator } from "@/hooks/useFocusManagement";

// Simple, consistent welcome messages (no randomization)
const WELCOME_MESSAGES = {
  pt: ["Olá! Sou o LusoBot. Como posso ajudar-te hoje?"],
  en: ["Hi! I’m LusoBot. How can I help you today?"],
};

interface LusoBotWidgetProps {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  autoOpen?: boolean;
  showWelcomeMessage?: boolean;
  customGreeting?: string;
  theme?: "light" | "dark" | "portuguese";
}

interface FloatingMessage {
  id: string;
  text: string;
  type: "welcome" | "suggestion" | "help";
  visible: boolean;
}

export default function LusoBotWidget({
  position = "bottom-right",
  autoOpen = false,
  showWelcomeMessage = true,
  customGreeting,
  theme = "portuguese",
}: LusoBotWidgetProps) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [isMinimized, setIsMinimized] = useState(false);
  const [floatingMessages, setFloatingMessages] = useState<FloatingMessage[]>(
    []
  );
  const [hasInteracted, setHasInteracted] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  
  // Use Widget Management System
  const widgetId = 'lusobot-widget';
  const { isAppBarVisible, classes: widgetClasses, zIndex } = useWidget(widgetId, 'chat');

  // ARIA and Focus Management
  const { announce, announcePolite } = useAriaAnnouncements();
  const { addFocusClasses } = useFocusIndicator();
  const widgetRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Focus management for the chat widget when opened
  const { focusFirst } = useFocusManagement(
    widgetRef,
    isOpen && !isMinimized,
    {
      restoreFocus: true,
      initialFocus: 'first',
      preventScroll: false
    }
  );
  // Feature flag to disable extra contextual popups
  const ENABLE_CONTEXTUAL_SUGGESTIONS = false;

  // Lightweight routes for quick actions (fallbacks if import is unavailable)
  const ROUTES_SAFE = {
    events: "/events",
    businessDirectory: "/business-directory",
    signup: "/apply",
  } as const;

  // Position classes with mobile-safe positioning
  const positionClasses = {
    "bottom-right": "bottom-6 right-6 md:bottom-6 md:right-6",
    "bottom-left": "bottom-6 left-6 md:bottom-6 md:left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };

  // Dynamic positioning based on Widget Management System
  const getCurrentPositionClass = () => {
    if (isMobile) {
      // Use widget management system for mobile positioning
      const baseBottomClass = isAppBarVisible ? 'bottom-40' : 'bottom-24';
      return `${baseBottomClass} right-4 safe-area-bottom`;
    }
    return positionClasses[position];
  };

  // Mobile detection and resize handler
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Keyboard detection for mobile - hide widget when keyboard is open
  useEffect(() => {
    if (!isMobile) return;

    const initialViewportHeight =
      window.visualViewport?.height || window.innerHeight;

    const handleViewportChange = () => {
      if (window.visualViewport) {
        const currentHeight = window.visualViewport.height;
        const heightDifference = initialViewportHeight - currentHeight;
        setIsKeyboardOpen(heightDifference > 150); // Keyboard likely open if viewport shrunk by 150px+
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleViewportChange);
      return () =>
        window.visualViewport?.removeEventListener(
          "resize",
          handleViewportChange
        );
    }
  }, [isMobile]);

  // Theme configurations
  const themes = {
    light: {
      buttonBg: "bg-white shadow-lg border border-gray-200",
      buttonHover: "hover:shadow-xl",
      iconColor: "text-primary-600",
      chatBg: "bg-white",
      badgeColor: "bg-red-500",
    },
    dark: {
      buttonBg: "bg-gray-800 shadow-lg",
      buttonHover: "hover:shadow-xl",
      iconColor: "text-white",
      chatBg: "bg-gray-800",
      badgeColor: "bg-red-500",
    },
    portuguese: {
      buttonBg: "bg-gradient-to-r from-primary-500 to-secondary-500 shadow-lg",
      buttonHover:
        "hover:shadow-xl hover:from-primary-600 hover:to-secondary-600",
      iconColor: "text-white",
      chatBg: "bg-white",
      badgeColor: "bg-red-500",
    },
  };

  const currentTheme = themes[theme];

  // Welcome messages based on language and navigation guidance

  // Initialize floating messages (no randomization)
  useEffect(() => {
    if (!showWelcomeMessage || hasInteracted) return;

    const timer = setTimeout(() => {
      const messages =
        WELCOME_MESSAGES[language as keyof typeof WELCOME_MESSAGES];
      const welcomeText = messages[0];

      const newMessage: FloatingMessage = {
        id: `welcome_${Date.now()}`,
        text: (customGreeting ?? welcomeText) as string,
        type: "welcome",
        visible: true,
      };

      setFloatingMessages([newMessage]);
      setUnreadCount(1);

      // Hide message after 10 seconds
      setTimeout(() => {
        setFloatingMessages((prev) =>
          prev.map((msg) => ({ ...msg, visible: false }))
        );
      }, 10000);
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(timer);
  }, [language, showWelcomeMessage, hasInteracted, customGreeting]);

  // (Optional) contextual suggestions based on page — disabled when flag is false
  useEffect(() => {
    if (!ENABLE_CONTEXTUAL_SUGGESTIONS) return;
    const pathname = window.location.pathname;
    let suggestion = "";

    if (pathname.includes("/events")) {
      suggestion =
        language === "pt"
          ? "Vejo que estás na página de eventos! De que região és? Posso recomendar eventos específicos!"
          : "I see you're on the events page! Where are you from? I can recommend specific events!";
    } else if (pathname.includes("/business-directory")) {
      suggestion =
        language === "pt"
          ? "Procuras negócios portugueses? Diz-me a tua localização ou tipo de serviço!"
          : "Looking for Portuguese businesses? Tell me your location or type of service!";
    } else if (pathname.includes("/matches")) {
      suggestion =
        language === "pt"
          ? "Quer encontrar outros portugueses? Conte-me sobre os teus interesses!"
          : "Want to find other Portuguese speakers? Tell me about your interests!";
    } else if (pathname.includes("/community")) {
      suggestion =
        language === "pt"
          ? "Interessado na comunidade? De onde és e o que procuras?"
          : "Interested in the community? Where are you from and what are you looking for?";
    } else if (pathname === "/") {
      suggestion =
        language === "pt"
          ? "Bem-vindo ao LusoTown! De onde és e o que te traz aqui?"
          : "Welcome to LusoTown! Where are you from and what brings you here?";
    }

    if (showWelcomeMessage && suggestion && !hasInteracted) {
      const timer = setTimeout(() => {
        const newMessage: FloatingMessage = {
          id: `suggestion_${Date.now()}`,
          text: suggestion,
          type: "suggestion",
          visible: true,
        };

        setFloatingMessages((prev) => [...prev, newMessage]);
        setUnreadCount((prev) => prev + 1);

        setTimeout(() => {
          setFloatingMessages((prev) =>
            prev.map((msg) =>
              msg.id === newMessage.id ? { ...msg, visible: false } : msg
            )
          );
        }, 8000);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [
    language,
    hasInteracted,
    showWelcomeMessage,
    ENABLE_CONTEXTUAL_SUGGESTIONS,
  ]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasInteracted(true);
    setUnreadCount(0);
    setFloatingMessages([]);
    
    // Announce to screen readers
    announce(ARIA_MESSAGES.lusobot.opened, { priority: 'polite', bilingual: false });
    
    // Scroll chat to top when opened (Priority 1 enhancement)
    setTimeout(() => {
      const chatContainer = document.querySelector('[data-lusobot-chat-container]') || 
                            document.querySelector('.lusobot-chat-container');
      if (chatContainer) {
        chatContainer.scrollTop = 0;
        // Smooth scroll to top for better UX
        chatContainer.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      // Focus first interactive element in the widget
      focusFirst();
    }, 150);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
    
    // Announce to screen readers
    announcePolite(ARIA_MESSAGES.lusobot.closed);
    
    // Focus will be restored to the original trigger button by useFocusManagement
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    
    // Announce to screen readers
    announcePolite(ARIA_MESSAGES.lusobot.minimized);
  };

  const handleMaximize = () => {
    setIsMinimized(false);
    
    // Announce to screen readers
    announcePolite(ARIA_MESSAGES.widget.maximized);
    
    // Focus the first element when maximized
    setTimeout(() => {
      focusFirst();
    }, 100);
  };

  const dismissFloatingMessage = (messageId: string) => {
    setFloatingMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, visible: false } : msg
      )
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  return (
    <>
      {/* Floating Messages */}
      <AnimatePresence>
        {floatingMessages.map(
          (message) =>
            message.visible &&
            !isOpen && (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                className={`fixed ${getCurrentPositionClass()} z-[${zIndex}] ${
                  isMobile ? (isAppBarVisible ? "bottom-44" : "bottom-28") : "bottom-20"
                } max-w-xs`}
              >
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 relative">
                  {/* Close button */}
                  <button
                    onClick={() => dismissFloatingMessage(message.id)}
                    className="absolute top-2 right-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center
                    hover:bg-gray-200 transition-colors"
                  >
                    <XMarkIcon className="w-3 h-3 text-gray-500" />
                  </button>

                  {/* Message content */}
                  <div className="pr-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">🇵🇹</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        LusoBot
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 leading-relaxed">
                      {message.text}
                    </p>

                    {/* Beginner-friendly quick actions */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a
                        href={ROUTES_SAFE.events}
                        className="text-xs px-2 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-200 hover:bg-primary-100"
                      >
                        {language === "pt"
                          ? "Encontrar eventos"
                          : "Find events"}
                      </a>
                      <a
                        href={ROUTES_SAFE.businessDirectory}
                        className="text-xs px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100"
                      >
                        {language === "pt"
                          ? "Negócios portugueses"
                          : "Portuguese businesses"}
                      </a>
                      <a
                        href={ROUTES_SAFE.signup}
                        className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                      >
                        {language === "pt" ? "Começar" : "Get started"}
                      </a>
                    </div>

                    <button
                      onClick={handleOpen}
                      className="mt-3 text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {language === "pt" ? "Conversar agora" : "Chat now"}
                    </button>
                  </div>

                  {/* Tail */}
                  <div
                    className={`absolute ${
                      position.includes("right")
                        ? "-bottom-2 right-6"
                        : "-bottom-2 left-6"
                    } 
                  w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45`}
                  />
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Main Chat Widget */}
      <div
        className={
          isMobile
            ? getMobileWidgetClasses("chat", isAppBarVisible)
            : `fixed ${getCurrentPositionClass()}`
        }
        style={{
          // Only apply z-index for desktop, mobile classes already include it
          ...(isMobile ? {} : { zIndex: zIndex || 70 })
        }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={widgetRef}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`mb-4 ${
                isMinimized
                  ? "w-80 h-16 md:w-80 md:h-16"
                  : "w-[90vw] max-w-sm h-[68vh] max-h-[560px] md:w-96 md:h-[560px]"
              } ${
                currentTheme.chatBg
              } rounded-2xl shadow-2xl border border-gray-200 overflow-hidden`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="lusobot-title"
              aria-describedby="lusobot-description"
            >
              {isMinimized ? (
                <div className="h-full flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🇵🇹</span>
                    </div>
                    <span className="font-medium text-gray-900">LusoBot</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleMaximize}
                      className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center
                        hover:bg-gray-200 transition-colors"
                    >
                      <PlusIcon className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={handleClose}
                      className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center
                        hover:bg-gray-200 transition-colors"
                    >
                      <XMarkIcon className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  {/* Chat Header - Priority 1 Enhancement: Clear minimize/close buttons */}
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center" aria-hidden="true">
                        <span className="text-white text-sm">🇵🇹</span>
                      </div>
                      <div>
                        <h3 id="lusobot-title" className="font-bold text-white">LusoBot</h3>
                        <p id="lusobot-description" className="text-xs text-white/80">
                          {language === "pt"
                            ? "Assistente Cultural Português - Conecte-se com a comunidade lusófona"
                            : "Portuguese Cultural Assistant - Connect with the Portuguese-speaking community"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleMinimize}
                        className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center
                          hover:bg-white/30 transition-colors focus:ring-2 focus:ring-white/50
                          min-h-[44px] min-w-[44px]"
                        aria-label={language === "pt" ? "Minimizar" : "Minimize"}
                        title={language === "pt" ? "Minimizar" : "Minimize"}
                      >
                        <MinusIcon className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={handleClose}
                        className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center
                          hover:bg-white/30 transition-colors focus:ring-2 focus:ring-white/50
                          min-h-[44px] min-w-[44px]"
                        aria-label={language === "pt" ? "Fechar" : "Close"}
                        title={language === "pt" ? "Fechar" : "Close"}
                      >
                        <XMarkIcon className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Chat Content - Priority 1 Enhancement: Max height with internal scrolling */}
                  <div className="flex-1 relative overflow-hidden max-h-[400px]">
                    <LusoBotChat
                      isEmbedded={true}
                      className="h-full border-0 bg-transparent lusobot-chat-container"
                      onClose={handleClose}
                      data-lusobot-chat-container="true"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button */}
        {!isOpen && !isKeyboardOpen && (
          <motion.button
            ref={buttonRef}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleOpen}
            onFocus={() => {
              if (buttonRef.current) {
                addFocusClasses(buttonRef.current, 'widget');
              }
            }}
            onBlur={() => {
              if (buttonRef.current) {
                buttonRef.current.classList.remove('lusotown-widget-focus', 'lusotown-focus-smooth');
              }
            }}
            className={`${isMobile ? "w-14 h-14" : "w-16 h-16"} rounded-full ${
              currentTheme.buttonBg
            } ${currentTheme.buttonHover}
              flex items-center justify-center transition-all duration-200 relative group min-h-[44px] min-w-[44px]`}
            aria-label={
              language === "pt"
                ? "Abrir LusoBot - Assistente Cultural Português para a comunidade lusófona. Prima Enter para abrir."
                : "Open LusoBot - Portuguese Cultural Assistant for the Portuguese-speaking community. Press Enter to open."
            }
            aria-describedby={unreadCount > 0 ? "lusobot-unread-count" : undefined}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpen();
              }
            }}
          >
            {/* Pulse animation for attention */}
            {unreadCount > 0 && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-full bg-primary-400 opacity-30"
              />
            )}

            {/* Main Icon with Lusophone Context */}
            <div className="relative">
              {unreadCount > 0 ? (
                <HeartSolidIcon
                  className={`${isMobile ? "w-5 h-5" : "w-6 h-6"} ${
                    currentTheme.iconColor
                  }`}
                />
              ) : (
                <ChatBubbleLeftRightIcon
                  className={`${isMobile ? "w-5 h-5" : "w-6 h-6"} ${
                    currentTheme.iconColor
                  }`}
                />
              )}

              {/* Portuguese heritage indicator */}
              <div className="absolute -top-1 -left-1 w-3 h-3 text-[10px] flex items-center justify-center">
                🇵🇹
              </div>

              {/* Unread count badge */}
              {unreadCount > 0 && (
                <div
                  className={`absolute -top-2 -right-2 w-5 h-5 ${currentTheme.badgeColor} 
                  rounded-full flex items-center justify-center`}
                >
                  <span className="text-xs font-bold text-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                </div>
              )}
            </div>

            {/* Hover tooltip */}
            <div
              className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
              bg-gray-800 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 
              transition-opacity duration-200 whitespace-nowrap pointer-events-none"
            >
              {language === "pt"
                ? "Conversar com LusoBot"
                : "Chat with LusoBot"}
              <div
                className="absolute top-full left-1/2 transform -translate-x-1/2 
                w-2 h-2 bg-gray-800 rotate-45"
              />
            </div>
          </motion.button>
        )}
      </div>
    </>
  );
}
