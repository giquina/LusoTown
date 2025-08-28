import React from "react";
// Temporary fallback font for build without network access
// import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import { HeritageProvider } from "@/context/HeritageContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { FollowingProvider } from "@/context/EnhancedFollowingContext";
import { NetworkingProvider } from "@/context/NetworkingContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { PlatformIntegrationProvider } from "@/context/PlatformIntegrationContext";
import { WaitingListProvider } from "@/context/WaitingListContext";
import { NavigationProvider } from "@/context/NavigationContext";
import Header from "@/components/Header";
import ErrorBoundary, { ComponentErrorBoundary } from "@/components/ErrorBoundary";
import dynamic from "next/dynamic";
import { METADATA_BASE } from "@/config/site";

// Dynamic imports for heavy components
const LusoBotWrapper = dynamic(() => import("@/components/LusoBotWrapper"), {
  ssr: false,
  loading: () => null,
}) as unknown as React.FC;

const AppDownloadBar = dynamic(() => import("@/components/AppDownloadBar"), {
  ssr: false,
  loading: () => null,
}) as unknown as React.FC;

// Temporary fallback font configuration for build without network access
const inter = {
  variable: "--font-inter",
  className: "font-sans"
};

export const metadata = {
  title: {
    template: "%s | LusoTown - Portuguese-speaking Community in London",
    default: "LusoTown - Portuguese-speaking Community Platform in London"
  },
  description: "Connect with the Portuguese-speaking community in London. Discover events, businesses, and cultural experiences.",
  metadataBase: METADATA_BASE,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <ErrorBoundary>
          <HeritageProvider>
            <LanguageProvider>
              <FavoritesProvider>
                <FollowingProvider>
                  <NetworkingProvider>
                      <SubscriptionProvider>
                        <NotificationProvider>
                          <PlatformIntegrationProvider>
                            <WaitingListProvider>
                              <NavigationProvider>
                                {/* App Download Bar at top of screen */}
                                <ComponentErrorBoundary componentName="AppDownloadBar" level="component" maxRetries={0}>
                                  <AppDownloadBar position="top" />
                                </ComponentErrorBoundary>

                                {/* Essential Header (isolated to prevent app-wide crash) */}
                                <ComponentErrorBoundary componentName="Header" level="component" maxRetries={1}>
                                  <Header />
                                </ComponentErrorBoundary>

                                {/* Main Content */}
                                <main className="relative main-content-with-app-bar" 
                                  style={{ marginTop: 'calc(80px + var(--app-download-bar-height, 0px))' }}>
                                  {children}
                                </main>

                                {/* Client-only widgets (isolated) */}
                                <ComponentErrorBoundary componentName="LusoBotWrapper" level="component" maxRetries={0}>
                                  <LusoBotWrapper />
                                </ComponentErrorBoundary>

                                {/* Toast Notifications */}
                                <Toaster
                                  position="top-right"
                                  toastOptions={{
                                    duration: 4000,
                                    style: {
                                      background: '#fff',
                                      color: '#374151',
                                      border: '1px solid #d1d5db',
                                    },
                                  }}
                                />
                              </NavigationProvider>
                            </WaitingListProvider>
                          </PlatformIntegrationProvider>
                        </NotificationProvider>
                      </SubscriptionProvider>
                  </NetworkingProvider>
                </FollowingProvider>
              </FavoritesProvider>
            </LanguageProvider>
          </HeritageProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}