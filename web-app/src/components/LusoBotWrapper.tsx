"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { ComponentType } from "react";

// Dynamically import the widget client-side
const LusoBotWidget = dynamic(() => import("@/components/LusoBotWidget"), {
  ssr: false,
  loading: () => null,
}) as ComponentType<any>;

/**
 * LusoBotWrapper
 * - Page-aware Portuguese cultural assistant that adapts to current page context
 * - Hides the global chat widget on pages that already embed chat (/lusobot routes)
 * - Dynamic behavior: Events guide, business advisor, community guide, transport helper
 * - Uses Priority 1 Widget Management System for positioning
 */
export default function LusoBotWrapper() {
  const pathname = usePathname() || "";

  // Do not render widget on dedicated chat pages to avoid duplicates
  if (pathname.startsWith("/lusobot")) {
    return null;
  }

  // Get page-aware context for dynamic behavior
  const getPageContext = () => {
    if (pathname.includes("/events") || pathname.includes("/eventos")) {
      return {
        role: "events-guide",
        customGreeting: "Olá! Sou o seu guia de eventos portugueses. Que tipo de eventos culturais procura?",
        theme: "portuguese" as const,
      };
    }
    
    if (pathname.includes("/business") || pathname.includes("/directory")) {
      return {
        role: "business-advisor", 
        customGreeting: "Precisa de ajuda com negócios portugueses? Posso recomendar serviços na sua área!",
        theme: "portuguese" as const,
      };
    }
    
    if (pathname.includes("/transport")) {
      return {
        role: "transport-coordinator",
        customGreeting: "Procura transporte ou boleia? Posso ajudar a coordenar com outros portugueses!",
        theme: "portuguese" as const,
      };
    }
    
    if (pathname.includes("/students") || pathname.includes("/university")) {
      return {
        role: "student-advisor",
        customGreeting: "Estudante português no Reino Unido? Posso ajudar com recursos universitários!",
        theme: "portuguese" as const,
      };
    }
    
    // Homepage or general community pages
    return {
      role: "community-guide",
      customGreeting: "Bem-vindo à LusoTown! Sou o seu assistente cultural português. Como posso ajudar?",
      theme: "portuguese" as const,
    };
  };

  const pageContext = getPageContext();

  return (
    <LusoBotWidget
      position="bottom-right"
      // Enable contextual messages for page-aware behavior
      showWelcomeMessage={true}
      customGreeting={pageContext.customGreeting}
      theme={pageContext.theme}
      // Pass page context as data attribute for styling/behavior
      data-page-role={pageContext.role}
    />
  );
}
