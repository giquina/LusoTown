"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import { Lock, Crown, Zap, Sparkles, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import SubscriptionGate from "@/components/SubscriptionGate";
import { ROUTES } from "@/config/routes";
import LuxuryLoader from "@/components/LuxuryLoader";
import LuxuryImageOptimizer from "@/components/LuxuryImageOptimizer";
import { usePerformanceOptimization, useMemoryManagement } from "@/hooks/usePerformanceOptimization";

interface StreamPlayerProps {
  stream: {
    id: string;
    title: string;
    youtubeVideoId: string;
    isLive: boolean;
    isPremium: boolean;
    thumbnail: string;
    viewerCount: number;
    previewDuration?: number;
  hlsUrl?: string; // optional self-hosted HLS URL
  };
  hasAccess: boolean;
  onInteraction: (type: string) => void;
}

export default function StreamPlayer({
  stream,
  hasAccess,
  onInteraction,
}: StreamPlayerProps) {
  const { language, t } = useLanguage();
  const { hasActiveSubscription, isInTrial } = useSubscription();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [previewTimeLeft, setPreviewTimeLeft] = useState(
    stream.previewDuration || 300
  ); // 5 minutes default
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [videoQuality, setVideoQuality] = useState('auto');
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor'>('good');
  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Performance optimization hooks
  const { metrics, preloadRoute } = usePerformanceOptimization();
  const { safeSetTimeout, isMounted } = useMemoryManagement();

  const canFullAccess = hasAccess || hasActiveSubscription || isInTrial;
  const isPreviewMode = !canFullAccess && stream.isPremium;
  
  // Monitor connection quality for adaptive streaming
  useEffect(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const updateQuality = () => {
        const effectiveType = connection.effectiveType;
        if (effectiveType === '4g') {
          setConnectionQuality('excellent');
          setVideoQuality('1080p');
        } else if (effectiveType === '3g') {
          setConnectionQuality('good');
          setVideoQuality('720p');
        } else {
          setConnectionQuality('poor');
          setVideoQuality('480p');
        }
      };
      
      updateQuality();
      connection.addEventListener('change', updateQuality);
      
      return () => connection.removeEventListener('change', updateQuality);
    }
  }, []);

  useEffect(() => {
    if (isPreviewMode && isPlaying) {
      const interval = setInterval(() => {
        setPreviewTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            setShowSubscriptionPrompt(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPreviewMode, isPlaying]);

  const handlePlay = useCallback(() => {
    if (isPreviewMode && previewTimeLeft <= 0) {
      setShowSubscriptionPrompt(true);
      return;
    }

    setIsBuffering(true);
    setIsPlaying(!isPlaying);
    onInteraction(isPlaying ? "pause" : "play");
    
    // Simulate buffering for premium experience
    safeSetTimeout(() => {
      if (isMounted()) {
        setIsBuffering(false);
      }
    }, 1000);
  }, [isPreviewMode, previewTimeLeft, isPlaying, onInteraction, safeSetTimeout, isMounted]);

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = safeSetTimeout(() => {
      if (isPlaying && isMounted()) setShowControls(false);
    }, 3000);
  }, [isPlaying, safeSetTimeout, isMounted]);

  const handleFullscreen = () => {
    if (typeof document === "undefined") return;
    const el = playerRef.current as any;
    try {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen();
      } else if (el) {
        const req =
          el.requestFullscreen ||
          el.webkitRequestFullscreen ||
          el.msRequestFullscreen;
        if (req) req.call(el);
      }
    } catch (e) {
      console.warn("Fullscreen request failed", e);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Initialize HLS if self-hosted URL is present (dynamic import to avoid SSR/type issues)
  useEffect(() => {
    if (!stream.hlsUrl || !videoRef.current) return;
    const video = videoRef.current;
    let hls: any;
    const setup = async () => {
      const mod: any = await import("hls.js");
      const HLS = mod.default;
      if (HLS && HLS.isSupported && HLS.isSupported()) {
        hls = new HLS({ enableWorker: true, lowLatencyMode: true });
        hls.loadSource(stream.hlsUrl as string);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = stream.hlsUrl as string;
      }
    };
    setup();
    return () => {
      if (hls) {
        try { hls.destroy(); } catch {}
      }
    };
  }, [stream.hlsUrl]);

  return (
    <div
      ref={playerRef}
      className="relative w-full h-64 md:h-96 lg:h-[28rem] bg-black rounded-t-xl overflow-hidden group"
      onMouseMove={handleMouseMove}
    >
      {/* HLS Player (self-hosted) or YouTube fallback */}
      {canFullAccess && isPlaying && (stream.hlsUrl ? (
        <video
          ref={videoRef}
          className="w-full h-full"
          autoPlay
          muted={isMuted}
          controls={false}
          playsInline
        />
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${stream.youtubeVideoId}${
            stream.isLive ? "?autoplay=1&mute=0" : "?autoplay=1"
          }`}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={stream.title}
        />
      ))}
      {!isPlaying && (
        <>
          {/* Luxury Loading State */}
          <LuxuryLoader
            isLoading={isBuffering}
            loadingText={language === "pt" ? "Carregando" : "Loading"}
            subText={language === "pt" ? "Preparando transmissão premium" : "Preparing premium stream"}
            variant="premium"
            className="rounded-t-xl"
          />
          {/* Luxury Stream Thumbnail */}
          <div className="absolute inset-0">
            <LuxuryImageOptimizer
              src={stream.thumbnail || "/events/networking.jpg"}
              alt={stream.title}
              priority={false}
              quality={95}
              gradient={true}
              className="w-full h-full"
              showLoadingState={true}
            />
          </div>

          {/* Overlay for non-premium users or when paused */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            {/* Premium Content Lock */}
            {!canFullAccess && stream.isPremium && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center text-white space-y-6"
              >
                {/* Premium Crown with Luxury Animation */}
                <div className="relative">
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 4,
                      ease: "easeInOut"
                    }}
                    className="bg-gradient-to-br from-premium-500 to-premium-700 p-6 rounded-full mx-auto w-fit shadow-2xl"
                  >
                    <Crown className="w-10 h-10" />
                  </motion.div>
                  
                  {/* Orbiting sparkles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                      style={{
                        top: "50%",
                        left: "50%",
                        marginTop: "-4px",
                        marginLeft: "-4px",
                      }}
                      animate={{
                        rotate: [0, 360],
                        scale: [0.5, 1, 0.5],
                        x: [0, 50 * Math.cos((i * 60 * Math.PI) / 180)],
                        y: [0, 50 * Math.sin((i * 60 * Math.PI) / 180)],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
                
                <div className="space-y-4">
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold mb-2 bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent"
                  >
                    {language === "pt" ? "Conteúdo Premium Exclusivo" : "Exclusive Premium Content"}
                  </motion.h3>
                  
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-200 mb-6 max-w-md mx-auto leading-relaxed"
                  >
                    {language === "pt"
                      ? "Esta transmissão cultural exclusiva é reservada para membros premium da comunidade LusoTown em Londres."
                      : "This exclusive cultural broadcast is reserved for LusoTown premium community members in London."}
                  </motion.p>
                  
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSubscriptionPrompt(true)}
                    className="group relative bg-gradient-to-r from-premium-500 via-premium-600 to-premium-700 hover:from-premium-600 hover:via-premium-700 hover:to-premium-800 text-white px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Button shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    
                    <span className="relative flex items-center gap-2">
                      <Crown className="w-5 h-5" />
                      {language === "pt" ? "Upgrade para Premium" : "Upgrade to Premium"}
                      <Sparkles className="w-4 h-4" />
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Luxury Play Button */}
            {canFullAccess && (
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePlay}
                className="group relative bg-gradient-to-br from-white/30 to-white/10 hover:from-white/40 hover:to-white/20 backdrop-blur-lg p-8 rounded-full border border-white/30 shadow-2xl transition-all duration-300"
              >
                {/* Play button glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400/30 to-secondary-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                
                {/* Loading state */}
                <AnimatePresence>
                  {isBuffering ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      >
                        <Loader2 className="w-12 h-12 text-white" />
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      {isPlaying ? (
                        <PauseIcon className="w-12 h-12 text-white relative z-10" />
                      ) : (
                        <PlayIcon className="w-12 h-12 text-white ml-1 relative z-10" />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}
          </div>
        </>
      )}

      {/* Luxury Live Badge */}
      {stream.isLive && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0, scale: [1, 1.05, 1] }}
          transition={{ 
            opacity: { duration: 0.5 },
            x: { duration: 0.5 },
            scale: { repeat: Infinity, duration: 2 }
          }}
          className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg backdrop-blur-sm border border-red-400/30"
        >
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-2 h-2 bg-white rounded-full"
          />
          <span className="tracking-wide">
            {language === "pt" ? "AO VIVO" : "LIVE"}
          </span>
          
          {/* Pulse ring effect */}
          <motion.div
            className="absolute inset-0 border-2 border-red-300 rounded-full"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </motion.div>
      )}

      {/* Luxury Viewer Count */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-4 right-4 bg-gradient-to-r from-black/60 to-black/40 text-white px-4 py-2 rounded-full text-sm backdrop-blur-lg border border-white/20 shadow-lg"
      >
        <div className="flex items-center gap-2">
          {stream.viewerCount > 0 ? (
            <>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-2 h-2 bg-green-400 rounded-full"
              />
              <span className="font-medium">
                {stream.viewerCount.toLocaleString()}
              </span>
              <span className="text-gray-300 text-xs">
                {language === "pt" ? "espectadores" : "viewers"}
              </span>
            </>
          ) : (
            <>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-2 h-2 bg-yellow-400 rounded-full"
              />
              <span className="text-xs font-medium">
                {language === "pt" ? "Seja o primeiro" : "Be the first"}
              </span>
            </>
          )}
        </div>
        
        {/* Connection quality indicator */}
        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
          connectionQuality === 'excellent' ? 'bg-green-500' :
          connectionQuality === 'good' ? 'bg-yellow-500' : 'bg-red-500'
        }`} />
      </motion.div>

      {/* Preview Timer for Premium Content */}
      {isPreviewMode && isPlaying && previewTimeLeft > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-16 left-4 bg-accent-500 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
        >
          <Zap className="w-4 h-4" />
          <span>
            {language === "pt" ? "Pré-visualização:" : "Preview:"}{" "}
            {formatTime(previewTimeLeft)}
          </span>
        </motion.div>
      )}

      {/* Player Controls */}
      <AnimatePresence>
        {showControls && canFullAccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlay}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {isPlaying ? (
                    <PauseIcon className="w-6 h-6" />
                  ) : (
                    <PlayIcon className="w-6 h-6" />
                  )}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {isMuted ? (
                    <SpeakerXMarkIcon className="w-6 h-6" />
                  ) : (
                    <SpeakerWaveIcon className="w-6 h-6" />
                  )}
                </button>

                {stream.isLive && (
                  <div className="text-white text-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-action-500 rounded-full animate-pulse"></div>
                    <span>
                      {language === "pt"
                        ? "Transmissão ao vivo"
                        : "Live broadcast"}
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={handleFullscreen}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <ArrowsPointingOutIcon className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subscription Prompt Modal */}
      <AnimatePresence>
        {showSubscriptionPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full text-center"
            >
              <div className="bg-premium-100 p-4 rounded-full mx-auto w-fit mb-4">
                <Crown className="w-8 h-8 text-premium-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === "pt"
                  ? "Pré-visualização Terminada"
                  : "Preview Ended"}
              </h3>
              <p className="text-gray-600 mb-6">
                {language === "pt"
                  ? "Torne-se membro premium para continuar a assistir e aceder a conteúdo exclusivo."
                  : "Become a premium member to continue watching and access exclusive content."}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSubscriptionPrompt(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {language === "pt" ? "Fechar" : "Close"}
                </button>
                <button
                  onClick={() => (window.location.href = ROUTES.subscription)}
                  className="flex-1 px-4 py-2 bg-premium-600 text-white rounded-lg hover:bg-premium-700 transition-colors font-medium"
                >
                  {language === "pt" ? "Upgrade" : "Upgrade"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
