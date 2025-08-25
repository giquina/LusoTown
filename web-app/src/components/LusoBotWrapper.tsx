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
 * - Hides the global chat widget on pages that already embed chat (/lusobot routes)
 * - Disables welcome/suggestion popups to prevent recurring popups on navigation
 */
export default function LusoBotWrapper() {
  const pathname = usePathname() || "";

  // Do not render widget on dedicated chat pages to avoid duplicates
  if (pathname.startsWith("/lusobot")) {
    return null;
  }

  return (
    <LusoBotWidget
      position="bottom-right"
      // Suppress welcome/suggestion popups globally; users can still open the widget
      showWelcomeMessage={false}
      theme="portuguese"
    />
  );
}
