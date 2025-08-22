import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import LiveFeedNotifications from "@/components/LiveFeedNotifications";
import UserTypeSelection from "@/components/UserTypeSelection";
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
import LusoBotWidget from "@/components/LusoBotWidget";
import ErrorBoundary, {
  ComponentErrorBoundary,
} from "@/components/ErrorBoundary";
import { METADATA_BASE } from "@/config/site";
import { generateMetadata as generateSEOMetadata, generateJsonLd } from "@/config/seo";

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
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1E40AF" id="theme-color" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateJsonLd('organization'),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ErrorBoundary>
          <HeritageProvider>
            <HeritageStyleProvider>
              <LanguageProvider>
                <FavoritesProvider>
                  <FollowingProvider>
                    <CartProvider>
                      <NetworkingProvider>
                        <SubscriptionProvider>
                          <NotificationProvider>
                            <AuthPopupProvider>
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
                                      </MobileExperienceOptimizer>
                                    </ComponentErrorBoundary>
                                  </NavigationProvider>
                                </WaitingListProvider>
                              </PlatformIntegrationProvider>
                            </AuthPopupProvider>
                          </NotificationProvider>
                        </SubscriptionProvider>
                      </NetworkingProvider>
                    </CartProvider>
                  </FollowingProvider>
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
