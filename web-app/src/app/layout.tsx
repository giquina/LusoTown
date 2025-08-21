import type { Metadata } from "next";
import { ROUTES } from '@/config'
import { Inter, Poppins } from "next/font/google";
import { ROUTES } from '@/config'
import { Toaster } from "react-hot-toast";
import { ROUTES } from '@/config'
import "./globals.css";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { ROUTES } from '@/config'
import LiveFeedNotifications from "@/components/LiveFeedNotifications";
import { ROUTES } from '@/config'
import UserTypeSelection from "@/components/UserTypeSelection";
import { ROUTES } from '@/config'
import { LanguageProvider } from "@/context/LanguageContext";
import { ROUTES } from '@/config'
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ROUTES } from '@/config'
import { FollowingProvider } from "@/context/FollowingContext";
import { ROUTES } from '@/config'
import { CartProvider } from "@/context/CartContext";
import { ROUTES } from '@/config'
import { NetworkingProvider } from "@/context/NetworkingContext";
import { ROUTES } from '@/config'
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import { ROUTES } from '@/config'
import { NotificationProvider } from "@/context/NotificationContext";
import { ROUTES } from '@/config'
import { PlatformIntegrationProvider } from "@/context/PlatformIntegrationContext";
import { ROUTES } from '@/config'
import { WaitingListProvider } from "@/context/WaitingListContext";
import { ROUTES } from '@/config'
import { AuthPopupProvider } from "@/components/AuthPopupProvider";
import { ROUTES } from '@/config'
import AuthPopup from "@/components/AuthPopup";
import { ROUTES } from '@/config'
import AuthIntentHandler from "@/components/AuthIntentHandler";
import { ROUTES } from '@/config'
import FavoriteNotification from "@/components/FavoriteNotification";
import { ROUTES } from '@/config'
import Header from "@/components/Header";
import { ROUTES } from '@/config'
import ScrollToTop from "@/components/ScrollToTop";
import { ROUTES } from '@/config'
import ErrorBoundary, {
  ComponentErrorBoundary,
} from "@/components/ErrorBoundary";
import { METADATA_BASE } from "@/config/site";
import { ROUTES } from '@/config'

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
  title: "LusoTown - London | Portuguese Social & Business Network",
  description:
    "The Portuguese social and business network in London. Connect with Portuguese speakers, book cultural events, attend technology workshops, and build professional networks. Unidos pela Língua.",
  keywords: [
    // Primary Portuguese SEO Keywords
    "portuguese social calendar london",
    "agenda social portuguesa londres",
    "comunidade portuguesa londres",
    "portugueses em londres",
    "brasileiros em londres",
    "lusófonos londres",
    "angolanos em londres",
    "moçambicanos em londres",
    "cabo-verdianos londres",

    // Activity-focused (not "finding community")
    "atividades para portugueses londres",
    "eventos portugueses londres",
    "fazer amigos portugueses londres",
    "conhecer portugueses londres",
    "sair com portugueses londres",
    "cultura portuguesa londres",
    "portuguese activities london",
    "portuguese events london",
    "portuguese friends london",
    "portuguese culture london",

    // Business & Networking
    "negócios portugueses londres",
    "empresários portugueses londres",
    "networking português londres",
    "portuguese business london",
    "portuguese entrepreneurs london",
    "portuguese networking london",
    "portuguese business directory london",

    // Cultural & Social
    "fado nights london",
    "noites de fado londres",
    "portuguese restaurants london",
    "restaurantes portugueses londres",
    "portuguese music london",
    "música portuguesa londres",
    "brazilian events london",
    "eventos brasileiros londres",
    "angolan culture london",
    "cultura angolana londres",
    "mozambican heritage uk",
    "património moçambicano uk",
    "cape verdean music london",
    "música cabo-verdiana londres",
    "portuguese heritage preservation",
    "diaspora community london",
    // Portuguese Keywords
    "comunidade portuguesa londres",
    "comunidade brasileira londres",
    "comunidade angolana londres",
    "comunidade moçambicana londres",
    "cabo-verdianos londres",
    "calendário social português londres",
    "comunidade lusófona reino unido",
    "eventos portugueses londres",
    "networking português londres",
    "negócios portugueses londres",
    "noites de fado londres",
    "restaurantes portugueses londres",
    "eventos brasileiros londres",
    "cultura angolana londres",
    "herança moçambicana reino unido",
    "música cabo-verdiana londres",
    "preservação herança portuguesa",
    "diáspora lusófona londres",
  ],
  authors: [{ name: "LusoTown" }],
  creator: "LusoTown",
  publisher: "LusoTown",
  openGraph: {
    type: "website",
    locale: "en_GB",
    alternateLocale: ["pt_PT", "pt_BR"],
    url: METADATA_BASE.toString(),
    title: "LusoTown London - Your Portuguese Social Calendar",
    description:
      "Connect with Portuguese speakers from Portugal, Brazil, Angola, Mozambique, Cape Verde & beyond in London. Book experiences, join activities, live life together with your lusophone community.",
    siteName: "LusoTown London",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LusoTown - Real-Life Portuguese Meetups in London & UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LusoTown London - Your Portuguese Social Calendar",
    description:
      "Connect with Portuguese speakers from Portugal, Brazil, Angola, Mozambique, Cape Verde & beyond. Book experiences, live life together.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        <meta name="theme-color" content="#1E40AF" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ErrorBoundary>
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

                              <ComponentErrorBoundary componentName="WhatsApp Widget">
                                <WhatsAppWidget />
                              </ComponentErrorBoundary>

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
        </ErrorBoundary>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#fff",
              color: "var(--color-secondary-700)",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              borderRadius: "0.75rem",
              padding: "12px 16px",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
