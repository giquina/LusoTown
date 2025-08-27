import React from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import Header from "@/components/Header";
import ErrorBoundary from "@/components/ErrorBoundary";
import dynamic from "next/dynamic";

// Dynamic imports for heavy components
const LusoBotWrapper = dynamic(() => import("@/components/LusoBotWrapper"), {
  ssr: false,
  loading: () => null,
});

export const metadata = {
  title: {
    template: "%s | LusoTown - Portuguese-speaking Community in London",
    default: "LusoTown - Portuguese-speaking Community Platform in London"
  },
  description: "Connect with the Portuguese-speaking community in London. Discover events, businesses, and cultural experiences.",
  metadataBase: new URL('https://web-99kxh0sku-giquinas-projects.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-sans">
      <body className="font-sans antialiased">
        <ErrorBoundary>
          <LanguageProvider>
            <SubscriptionProvider>
              {/* Essential Header */}
              <Header />
              
              {/* Main Content */}
              <main className="relative">
                {children}
              </main>
              
              {/* Essential Widgets */}
              <LusoBotWrapper />
              
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
            </SubscriptionProvider>
          </LanguageProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}