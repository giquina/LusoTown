"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Crown, Home, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  variant?: "premium" | "standard" | "elite";
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class LuxuryErrorBoundaryClass extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to monitoring service
    console.error("LuxuryErrorBoundary caught an error:", error, errorInfo);
    
    // In production, send to error tracking service
    if (process.env.NODE_ENV === "production") {
      // Send to Sentry, LogRocket, etc.
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <LuxuryErrorDisplay
          error={this.state.error}
          onRetry={this.handleRetry}
          variant={this.props.variant || "premium"}
        />
      );
    }

    return this.props.children;
  }
}

interface ErrorDisplayProps {
  error: Error | null;
  onRetry: () => void;
  variant: "premium" | "standard" | "elite";
}

function LuxuryErrorDisplay({ error, onRetry, variant }: ErrorDisplayProps) {
  const { language } = useLanguage();
  const isPortuguese = language === "pt";

  const variants = {
    premium: {
      bg: "bg-gradient-to-br from-premium-50 via-white to-premium-100",
      card: "bg-white/80 border-premium-200",
      accent: "text-premium-600",
      button: "bg-premium-600 hover:bg-premium-700",
      icon: "text-premium-500",
    },
    standard: {
      bg: "bg-gradient-to-br from-gray-50 via-white to-gray-100",
      card: "bg-white/80 border-gray-200",
      accent: "text-gray-700",
      button: "bg-primary-600 hover:bg-primary-700",
      icon: "text-gray-500",
    },
    elite: {
      bg: "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-100",
      card: "bg-white/90 border-amber-200",
      accent: "text-amber-800",
      button: "bg-amber-600 hover:bg-amber-700",
      icon: "text-amber-600",
    },
  };

  const currentVariant = variants[variant];

  const messages = {
    title: isPortuguese ? "Algo Correu Mal" : "Something Went Wrong",
    subtitle: isPortuguese
      ? "Pedimos desculpa, mas ocorreu um erro inesperado."
      : "We apologize, but an unexpected error occurred.",
    description: isPortuguese
      ? "A nossa equipa foi notificada e está a trabalhar para resolver este problema. Por favor, tente novamente."
      : "Our team has been notified and is working to resolve this issue. Please try again.",
    retryButton: isPortuguese ? "Tentar Novamente" : "Try Again",
    homeButton: isPortuguese ? "Voltar ao Início" : "Go Home",
    contactButton: isPortuguese ? "Contactar Suporte" : "Contact Support",
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${currentVariant.bg}`}>
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className={`relative max-w-md w-full rounded-3xl ${currentVariant.card} backdrop-blur-xl p-8 shadow-2xl border`}
      >
        {/* Error Icon */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-100 to-red-200 mb-4"
          >
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </motion.div>
          
          {variant === "elite" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2 text-amber-600"
            >
              <Crown className="w-5 h-5" />
              <span className="text-sm font-medium">
                {isPortuguese ? "Experiência Premium" : "Premium Experience"}
              </span>
            </motion.div>
          )}
        </div>

        {/* Error Content */}
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-2xl font-bold ${currentVariant.accent} mb-4`}
          >
            {messages.title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-4"
          >
            {messages.subtitle}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-gray-500"
          >
            {messages.description}
          </motion.p>
        </div>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === "development" && error && (
          <motion.details
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-6 text-xs"
          >
            <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
              Error Details (Dev Mode)
            </summary>
            <div className="mt-2 p-3 bg-gray-100 rounded-lg overflow-auto max-h-32">
              <pre className="whitespace-pre-wrap text-xs text-gray-700">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </div>
          </motion.details>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRetry}
            className={`w-full ${currentVariant.button} text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2`}
          >
            <RefreshCw className="w-5 h-5" />
            {messages.retryButton}
          </motion.button>
          
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = "/"}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              {messages.homeButton}
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = "/contact"}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              {messages.contactButton}
            </motion.button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-premium-300/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Higher-order component wrapper
export default function LuxuryErrorBoundary(props: Props) {
  return <LuxuryErrorBoundaryClass {...props} />;
}

// Hook for manual error throwing
export function useErrorHandler() {
  return (error: Error, errorInfo?: ErrorInfo) => {
    console.error("Manual error:", error, errorInfo);
    throw error;
  };
}