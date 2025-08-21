"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Crown, Sparkles, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface LuxuryLoaderProps {
  isLoading: boolean;
  loadingText?: string;
  subText?: string;
  showProgress?: boolean;
  progress?: number;
  variant?: "premium" | "standard" | "elite";
  className?: string;
}

export default function LuxuryLoader({
  isLoading,
  loadingText = "Loading",
  subText = "Preparing your premium experience",
  showProgress = false,
  progress = 0,
  variant = "premium",
  className = "",
}: LuxuryLoaderProps) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [dots, setDots] = useState("");

  // Smooth progress animation
  useEffect(() => {
    if (showProgress) {
      const timer = setInterval(() => {
        setDisplayProgress(prev => {
          const diff = progress - prev;
          if (Math.abs(diff) < 0.1) return progress;
          return prev + diff * 0.1;
        });
      }, 16);
      return () => clearInterval(timer);
    }
  }, [progress, showProgress]);

  // Animated dots
  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setDots(prev => {
          if (prev.length >= 3) return "";
          return prev + ".";
        });
      }, 500);
      return () => clearInterval(timer);
    }
  }, [isLoading]);

  const variants = {
    premium: {
      bg: "bg-gradient-to-br from-premium-50 via-white to-premium-100",
      accent: "text-premium-600",
      spinner: "text-premium-500",
      progress: "from-premium-400 to-premium-600",
    },
    standard: {
      bg: "bg-gradient-to-br from-primary-50 via-white to-secondary-100",
      accent: "text-primary-600",
      spinner: "text-primary-500",
      progress: "from-primary-400 to-secondary-600",
    },
    elite: {
      bg: "bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-100",
      accent: "text-amber-700",
      spinner: "text-amber-600",
      progress: "from-amber-400 to-orange-600",
    },
  };

  const currentVariant = variants[variant];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 flex items-center justify-center ${currentVariant.bg} backdrop-blur-sm ${className}`}
        >
          <div className="absolute inset-0 bg-white/40 backdrop-blur-md" />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-12 max-w-md w-full mx-4 shadow-2xl border border-white/50"
          >
            {/* Premium Crown Icon */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className={`p-4 rounded-full bg-gradient-to-br ${currentVariant.progress} shadow-lg`}
                >
                  {variant === "elite" ? (
                    <Crown className="w-8 h-8 text-white" />
                  ) : (
                    <Sparkles className="w-8 h-8 text-white" />
                  )}
                </motion.div>
                
                {/* Orbiting sparkles */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-premium-400 rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                      marginTop: "-4px",
                      marginLeft: "-4px",
                    }}
                    animate={{
                      rotate: [0, 360],
                      scale: [0.5, 1, 0.5],
                      x: [0, 40 * Math.cos((i * 120 * Math.PI) / 180)],
                      y: [0, 40 * Math.sin((i * 120 * Math.PI) / 180)],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Loading Text */}
            <div className="text-center mb-6">
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`text-2xl font-bold ${currentVariant.accent} mb-2`}
              >
                {loadingText}{dots}
              </motion.h3>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 text-sm"
              >
                {subText}
              </motion.p>
            </div>

            {/* Progress Bar */}
            {showProgress && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-6"
              >
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${currentVariant.progress} rounded-full`}
                    style={{ width: `${displayProgress}%` }}
                    transition={{ type: "spring", damping: 20 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Loading...</span>
                  <span>{Math.round(displayProgress)}%</span>
                </div>
              </motion.div>
            )}

            {/* Spinning Loader */}
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className={`inline-block ${currentVariant.spinner}`}
              >
                <Loader2 className="w-6 h-6" />
              </motion.div>
            </div>

            {/* Luxury Background Elements */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-premium-300/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.5, 1.2, 0.5],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}