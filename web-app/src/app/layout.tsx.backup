// Note: avoid strict typing here to prevent build-time type mismatches from metadata helpers
import React from "react";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { FollowingProvider } from "@/context/FollowingContext";
import { CartProvider } from "@/context/CartContext";
import { NetworkingProvider } from "@/context/NetworkingContext";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { PlatformIntegrationProvider } from "@/context/PlatformIntegrationContext";
import { WaitingListProvider } from "@/context/WaitingListContext";
import { HeritageProvider } from "@/context/HeritageContext";
import { NavigationProvider } from "@/context/NavigationContext";
import { TooltipProvider } from "@/context/TooltipContext";
// WelcomeProvider removed - welcome functionality disabled (no UI components)

import HeritageStyleProvider from "@/components/HeritageStyleProvider";
import { AuthPopupProvider } from "@/components/AuthPopupProvider";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import ErrorBoundary, {
  ComponentErrorBoundary,
} from "@/components/ErrorBoundary";
import { METADATA_BASE } from "@/config/site";
import {
  generateMetadata as generateSEOMetadata,
  generateJsonLd,
} from "@/config/seo";
// Performance optimization
import Script from "next/script";
import dynamic from "next/dynamic";

// Critical components that need SSR - import directly
// Header component will render server-side for better performance

// Dynamic imports ONLY for heavy, non-critical components
// LiveFeedNotifications removed per user request

const AuthPopup = dynamic(() => import("@/components/AuthPopup"), {
  loading: () => null,
  ssr: false,
});

const FavoriteNotification = dynamic(
  () => import("@/components/FavoriteNotification"),
  {
    loading: () => null,
    ssr: false,
  }
);

const LusoBotWrapper = dynamic(
  () => import("@/components/LusoBotWrapper"),
  {
    loading: () => null,
    ssr: false,
  }
);

const WidgetManager = dynamic(() => import("@/components/WidgetManager"), {
  loading: () => null,
  ssr: false,
});

const AppDownloadBar = dynamic(() => import("@/components/AppDownloadBar"), {
  loading: () => null,
  ssr: false,
});

// Minimal dynamic imports - only for heavy client-only components
// Header and core navigation components render server-side

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  metadataBase: METADATA_BASE,
  ...generateSEOMetadata(),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// Allow Next.js to optimize SSR vs CSR automatically
// Header will render server-side, dynamic components client-side
// Remove dynamic export to avoid naming conflict with import
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1E40AF" id="theme-color" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateJsonLd("organization"),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Performance optimization script */}
        <Script
          id="performance-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Critical performance optimizations
              if (typeof window !== 'undefined') {
                // Preconnect to external domains
                ['https://images.unsplash.com', 'https://res.cloudinary.com'].forEach(domain => {
                  const link = document.createElement('link');
                  link.rel = 'preconnect';
                  link.href = domain;
                  document.head.appendChild(link);
                });
                
                // Monitor Core Web Vitals
                if ('PerformanceObserver' in window) {
                  const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                      if (entry.entryType === 'largest-contentful-paint') {
                        if (entry.startTime > 2500) {
                          console.warn('LCP is slow:', entry.startTime + 'ms');
                        }
                      }
                    }
                  });
                  observer.observe({type: 'largest-contentful-paint', buffered: true});
                }
              }
            `,
          }}
        />

        {/* PWA initialization script */}
  <Script
          id="pwa-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize PWA for Portuguese-speaking community
              if (typeof window !== 'undefined') {
    // Only enable Service Worker in production to avoid caching issues during development
    const ENABLE_SW = ${process.env.NODE_ENV === 'production'};
                // Register service worker
    if (ENABLE_SW && 'serviceWorker' in navigator) {
                  window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js')
                      .then((registration) => {
                        console.log('PWA: Service Worker registered for Portuguese community');
                      })
                      .catch((error) => {
                        console.log('PWA: Service Worker registration failed:', error);
                      });
                  });
                }
                
                // Handle app install prompt
                let deferredPrompt;
                window.addEventListener('beforeinstallprompt', (e) => {
                  e.preventDefault();
                  deferredPrompt = e;
                  console.log('PWA: Install prompt available for LusoTown');
                });
                
                // Store install prompt globally for access
                window.lusotownInstallPrompt = () => {
                  if (deferredPrompt) {
                    deferredPrompt.prompt();
                    return deferredPrompt.userChoice;
                  }
                  return Promise.reject('Install prompt not available');
                };
              }
            `,
          }}
        />

        <ErrorBoundary level="critical" componentName="Root Application" enableTelemetry={true}>
          <AuthPopupProvider>
            <HeritageProvider>
              <HeritageStyleProvider>
                <LanguageProvider>
                  <FavoritesProvider>
                    <FollowingProvider>
                      <CartProvider>
                        <NetworkingProvider>
                          <SubscriptionProvider>
                            <NotificationProvider>
                              <PlatformIntegrationProvider>
                                <WaitingListProvider>
                                  <NavigationProvider>
                                    {/* OPTIMIZED: Header with improved error boundary */}
                                    <ComponentErrorBoundary 
                                      componentName="Header" 
                                      level="critical"
                                      maxRetries={2}
                                    >
                                      <Header />
                                    </ComponentErrorBoundary>

                                    <ScrollToTop />

                                    {/* Main content with page-level error boundary */}
                                    <ComponentErrorBoundary 
                                      componentName="Main Content" 
                                      level="page"
                                      maxRetries={1}
                                    >
                                      {children}
                                    </ComponentErrorBoundary>

                                    {/* CLIENT-ONLY components with reduced error boundaries */}
                                    <ComponentErrorBoundary 
                                      componentName="Favorite Notifications"
                                      level="component"
                                      maxRetries={3}
                                    >
                                      <FavoriteNotification />
                                    </ComponentErrorBoundary>

                                    <ComponentErrorBoundary 
                                      componentName="Auth System"
                                      level="component"
                                      maxRetries={2}
                                    >
                                      <AuthPopup />
                                    </ComponentErrorBoundary>

                                    {/* Widget Management System - Single error boundary */}
                                    <ComponentErrorBoundary 
                                      componentName="Widget System"
                                      level="component"
                                      maxRetries={2}
                                    >
                                      <WidgetManager>
                                        <AppDownloadBar />
                                        <LusoBotWrapper />
                                      </WidgetManager>
                                    </ComponentErrorBoundary>
                                  </NavigationProvider>
                                </WaitingListProvider>
                              </PlatformIntegrationProvider>
                            </NotificationProvider>
                          </SubscriptionProvider>
                        </NetworkingProvider>
                      </CartProvider>
                    </FollowingProvider>
                  </FavoritesProvider>
                </LanguageProvider>
              </HeritageStyleProvider>
            </HeritageProvider>
          </AuthPopupProvider>
        </ErrorBoundary>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#fff",
              color: "#374151",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              borderRadius: "0.75rem",
              padding: "12px 16px",
            },
            success: {
              iconTheme: {
                primary: "var(--heritage-secondary, #10b981)",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "var(--heritage-action, #ef4444)",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
