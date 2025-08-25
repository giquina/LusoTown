"use client";

import React from "react";
import { motion } from "framer-motion";

interface SkeletonEventGridProps {
  count?: number;
  variant?: "portuguese" | "standard";
  className?: string;
}

export function SkeletonEventGrid({
  count = 6,
  variant = "portuguese",
  className = "",
}: SkeletonEventGridProps) {
  const renderSkeleton = (index: number) => (
    <motion.div
      key={index}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      {/* Image skeleton */}
      <div className="relative h-48 overflow-hidden">
        {variant === "portuguese" ? (
          <motion.div
            className="w-full h-full bg-gradient-to-r from-green-200 via-white to-red-200"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 2,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        )}
        
        {/* Portuguese flag corner */}
        {variant === "portuguese" && (
          <div className="absolute top-3 right-3">
            <motion.div
              className="w-6 h-4 rounded-sm bg-gradient-to-r from-green-500 to-red-500"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        )}
      </div>

      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
        </div>
        
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="h-8 w-20 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
        </div>
        
        <div className="h-12 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    </motion.div>
  );

  return (
    <div className={className}>
      {Array.from({ length: count }, (_, index) => renderSkeleton(index))}
    </div>
  );
}
