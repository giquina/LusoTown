import type { Metadata } from "next";
// Temporarily disabled Google Fonts for build environment
// import { Inter, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import LiveFeedNotifications from "@/components/LiveFeedNotifications";
import UserTypeSelection from "@/components/UserTypeSelection";
import { LanguageProvider } from "@/context/LanguageContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { FollowingProvider } from "@/context/EnhancedFollowingContext";
import { CartProvider } from "@/context/CartContext";
import { NetworkingProvider } from "@/context/NetworkingContext";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { PlatformIntegrationProvider } from "@/context/PlatformIntegrationContext";
import { WaitingListProvider } from "@/context/WaitingListContext";
import { HeritageProvider } from "@/context/HeritageContext";
import { NavigationProvider } from "@/context/NavigationContext";
import HeritageStyleProvider from "@/components/HeritageStyleProvider";
import { AuthPopupProvider } from "@/components/AuthPopupProvider";
import AuthPopup from "@/components/AuthPopup";
import AuthIntentHandler from "@/components/AuthIntentHandler";
import FavoriteNotification from "@/components/FavoriteNotification";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { ContextualMobileNav } from "@/components/LuxuryMobileNav";
import { PremiumMobileNavigation } from "@/components/PremiumMobileNavigation";
import { MobileExperienceOptimizer } from "@/components/MobileExperienceOptimizer";
import MobileCriticalFixes from "@/components/MobileCriticalFixes";
import LusoBotWidget from "@/components/LusoBotWidget";
import FramerMotionFix from "@/components/FramerMotionFix";
import ErrorBoundary, {
  ComponentErrorBoundary,
} from "@/components/ErrorBoundary";
import CoreWebVitalsMonitor from "@/components/CoreWebVitalsMonitor";
import MobilePerformanceOptimizer from "@/components/MobilePerformanceOptimizer";
import { METADATA_BASE } from "@/config/site";
import { generateMetadata as generateSEOMetadata, generateJsonLd } from "@/config/seo";

// Temporarily using system fonts for build environment
// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// });

// const poppins = Poppins({
//   weight: ["400", "500", "600", "700"],
//   subsets: ["latin", "latin-ext"],
//   variable: "--font-poppins",
//   display: "swap",
//   preload: true,
//   fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
// });

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  ...generateSEOMetadata(),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-sans">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1E40AF" id="theme-color" />
        {/* Preload Google Fonts for production */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateJsonLd('organization'),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <FramerMotionFix />
        <ErrorBoundary>
          <HeritageProvider>
            <HeritageStyleProvider>
              <LanguageProvider>
                <FavoritesProvider>
                  <CartProvider>
                    <NetworkingProvider>
                      <SubscriptionProvider>
                        <NotificationProvider>
                          <AuthPopupProvider>
                            <FollowingProvider>
                              <PlatformIntegrationProvider>
                                <WaitingListProvider>
                                  <NavigationProvider>
                                    {/* Premium Mobile Experience Wrapper */}
                                    <ComponentErrorBoundary componentName="Mobile Experience Optimizer">
                                      <MobileExperienceOptimizer
                                        enablePremiumAnimations={true}
                                        enableLuxuryEffects={true}
                                        enablePortugueseTheming={true}
                                      >
                                        <ComponentErrorBoundary componentName="Mobile Critical Fixes">
                                          <MobileCriticalFixes
                                            enablePortugueseFixes={true}
                                            enableTouchOptimizations={true}
                                            enablePerformanceMode={true}
                                          >
                                            <ComponentErrorBoundary componentName="User Type Selection">
                                              <UserTypeSelection />
                                            </ComponentErrorBoundary>

                                            <ComponentErrorBoundary componentName="Header">
                                              <Header />
                                            </ComponentErrorBoundary>

                                            <ScrollToTop />

                                            <ErrorBoundary>
                                              {/* Demo removed from SSR path to avoid server/client boundary issues */}
                                              {children}
                                            </ErrorBoundary>

                                            {/* WhatsApp widget removed per request; keeping LusoBot only */}

                                            <ComponentErrorBoundary componentName="Live Feed Notifications">
                                              <LiveFeedNotifications />
                                            </ComponentErrorBoundary>

                                            <ComponentErrorBoundary componentName="Favorite Notification">
                                              <FavoriteNotification />
                                            </ComponentErrorBoundary>

                                            <ComponentErrorBoundary componentName="Auth Popup">
                                              <AuthPopup />
                                            </ComponentErrorBoundary>

                                            <ComponentErrorBoundary componentName="Auth Intent Handler">
                                              <AuthIntentHandler />
                                            </ComponentErrorBoundary>

                                            {/* Premium Mobile Navigation with Elite Design */}
                                            <ComponentErrorBoundary componentName="Premium Mobile Navigation">
                                              <PremiumMobileNavigation 
                                                style="luxury"
                                                notifications={0}
                                              />
                                            </ComponentErrorBoundary>

                                            <ComponentErrorBoundary componentName="LusoBot Widget">
                                              <LusoBotWidget 
                                                position="bottom-right"
                                                showWelcomeMessage={true}
                                                theme="portuguese"
                                              />
                                            </ComponentErrorBoundary>

                                            {/* Performance Optimization Components */}
                                            <ComponentErrorBoundary componentName="Core Web Vitals Monitor">
                                              <CoreWebVitalsMonitor 
                                                enableReporting={process.env.NODE_ENV === 'production'}
                                                enableNotifications={process.env.NODE_ENV === 'development'}
                                                reportingEndpoint="/api/performance/vitals"
                                              />
                                            </ComponentErrorBoundary>

                                            <ComponentErrorBoundary componentName="Mobile Performance Optimizer">
                                              <MobilePerformanceOptimizer 
                                                enableAggressive={false}
                                                enableDataSaver={true}
                                                enableBatteryOptimization={true}
                                              />
                                            </ComponentErrorBoundary>
                                          </MobileCriticalFixes>
                                        </ComponentErrorBoundary>
                                      </MobileExperienceOptimizer>
                                    </ComponentErrorBoundary>
                                  </NavigationProvider>
                                </WaitingListProvider>
                              </PlatformIntegrationProvider>
                            </FollowingProvider>
                          </AuthPopupProvider>
                        </NotificationProvider>
                      </SubscriptionProvider>
                    </NetworkingProvider>
                  </CartProvider>
                </FavoritesProvider>
              </LanguageProvider>
            </HeritageStyleProvider>
          </HeritageProvider>
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
