"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, Loader2, AlertCircle } from "lucide-react";
import { useImageOptimization } from "@/hooks/usePerformanceOptimization";

interface LuxuryImageOptimizerProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  blur?: boolean;
  gradient?: boolean;
  fallbackSrc?: string;
  showLoadingState?: boolean;
  showErrorState?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export default function LuxuryImageOptimizer({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 90,
  blur = true,
  gradient = true,
  fallbackSrc = "/images/placeholder.jpg",
  showLoadingState = true,
  showErrorState = true,
  onLoad,
  onError,
}: LuxuryImageOptimizerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const { imgRef, shouldLoad } = useImageOptimization();
  const retryCountRef = useRef(0);
  const maxRetries = 3;

  // Progressive image loading
  useEffect(() => {
    if (shouldLoad || priority) {
      const img = new window.Image();
      img.onload = () => {
        setIsLoading(false);
        setHasError(false);
        onLoad?.();
      };
      img.onerror = () => {
        if (retryCountRef.current < maxRetries) {
          retryCountRef.current++;
          // Retry with a delay
          setTimeout(() => {
            img.src = currentSrc;
          }, 1000 * retryCountRef.current);
        } else {
          setHasError(true);
          setIsLoading(false);
          if (fallbackSrc && currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
            retryCountRef.current = 0;
            setHasError(false);
            setIsLoading(true);
          } else {
            onError?.();
          }
        }
      };
      img.src = currentSrc;
    }
  }, [currentSrc, shouldLoad, priority, fallbackSrc, onLoad, onError]);

  // Generate blur placeholder
  const blurDataURL = `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width || 400}" height="${
      height || 300
    }" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#059669;stop-opacity:0.1" /><stop offset="100%" style="stop-color:#1e40af;stop-opacity:0.1" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#grad)" /></svg>`
  ).toString("base64")}`;

  const containerClass = `relative overflow-hidden ${className}`;

  if (hasError && !fallbackSrc) {
    return (
      <div className={containerClass}>
        {showErrorState && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full min-h-[200px] bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500"
          >
            <AlertCircle className="w-12 h-12 mb-2" />
            <p className="text-sm font-medium">Image failed to load</p>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div ref={imgRef} className={containerClass}>
      <AnimatePresence>
        {isLoading && showLoadingState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 z-10"
          >
            {/* Loading gradient background */}
            {gradient && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 opacity-50" />
            )}
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            
            {/* Loading content */}
            <div className="relative flex flex-col items-center justify-center text-gray-400">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="mb-3"
              >
                <Loader2 className="w-8 h-8" />
              </motion.div>
              <p className="text-sm font-medium">Loading premium content...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {(shouldLoad || priority) && (
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: isLoading ? 0 : 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Image
            src={currentSrc}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            quality={quality}
            placeholder={blur ? "blur" : "empty"}
            blurDataURL={blur ? blurDataURL : undefined}
            className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={() => {
              setIsLoading(false);
              onLoad?.();
            }}
            onError={() => {
              if (currentSrc !== fallbackSrc) {
                setCurrentSrc(fallbackSrc);
              } else {
                setHasError(true);
                onError?.();
              }
            }}
          />
        </motion.div>
      )}

      {/* Luxury overlay effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        
        {/* Premium border shimmer */}
        <div className="absolute inset-0 border border-transparent bg-gradient-to-r from-primary-200/50 via-secondary-200/50 to-accent-200/50 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Loading progress indicator */}
      {isLoading && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
      )}
    </div>
  );
}

// Pre-built luxury image variants
export function LuxuryHeroImage(props: Omit<LuxuryImageOptimizerProps, "priority" | "quality">) {
  return (
    <LuxuryImageOptimizer
      {...props}
      priority={true}
      quality={95}
      className={`aspect-[16/9] ${props.className || ""}`}
    />
  );
}

export function LuxuryThumbnail(props: Omit<LuxuryImageOptimizerProps, "quality" | "showLoadingState">) {
  return (
    <LuxuryImageOptimizer
      {...props}
      quality={80}
      showLoadingState={false}
      className={`aspect-square ${props.className || ""}`}
    />
  );
}

export function LuxuryGalleryImage(props: LuxuryImageOptimizerProps) {
  return (
    <div className="group cursor-pointer">
      <LuxuryImageOptimizer
        {...props}
        quality={85}
        className={`transition-transform duration-300 group-hover:scale-105 ${props.className || ""}`}
      />
      
      {/* Overlay for gallery interaction */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ImageIcon className="w-6 h-6 text-gray-700" />
        </motion.div>
      </div>
    </div>
  );
}