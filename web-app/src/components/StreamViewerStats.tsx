"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  EyeIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { Users, Activity, BarChart3, Globe, TrendingUp, Zap, Crown, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";

interface StreamViewerStatsProps {
  currentViewers: number;
  peakViewers: number;
  totalViews: number;
  language: string;
}

export default function StreamViewerStats({
  currentViewers,
  peakViewers,
  totalViews,
  language,
}: StreamViewerStatsProps) {
  const [animatedViewers, setAnimatedViewers] = useState(0);
  const [animatedPeak, setAnimatedPeak] = useState(0);
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const { metrics } = usePerformanceOptimization();
  
  // Calculate growth percentage with improved logic
  let viewerGrowth = Math.round(
    ((currentViewers - peakViewers * 0.8) / (peakViewers * 0.8)) * 100
  );
  const isLowTraffic = peakViewers <= 5 || currentViewers <= 1;
  if (isLowTraffic || !isFinite(viewerGrowth)) viewerGrowth = 0;
  
  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Animated counters
  useEffect(() => {
    if (!isVisible) return;
    
    const animateValue = (start: number, end: number, setter: (value: number) => void, duration: number = 2000) => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * easeOut);
        setter(current);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    };
    
    animateValue(0, currentViewers, setAnimatedViewers, 1500);
    animateValue(0, peakViewers, setAnimatedPeak, 2000);
    animateValue(0, totalViews, setAnimatedTotal, 2500);
  }, [isVisible, currentViewers, peakViewers, totalViews]);

  // Mock engagement data
  const engagementStats = [
    {
      label: language === "pt" ? "Tempo Médio" : "Avg. Watch Time",
      value: "23min",
      icon: ClockIcon,
    },
    {
      label: language === "pt" ? "Engagement" : "Engagement Rate",
      value: "87%",
      icon: Activity,
    },
    {
      label: language === "pt" ? "Comunidade PT" : "PT Community",
      value: "92%",
      icon: Globe,
    },
  ];

  return (
    <Card
      ref={statsRef}
      variant="premium"
      hoverable={true}
      glowEffect={true}
      className="p-0 overflow-hidden"
    >
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 p-6 text-white relative overflow-hidden">
        {/* Background particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="bg-white/20 p-3 rounded-xl backdrop-blur-sm"
            >
              <BarChart3 className="w-6 h-6" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold">
                {language === "pt" ? "Estatísticas Premium" : "Premium Analytics"}
              </h3>
              <p className="text-white/80 text-sm">
                {language === "pt" ? "Dados em tempo real" : "Real-time insights"}
              </p>
            </div>
          </div>
          
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="bg-white/20 p-2 rounded-lg"
          >
            <Crown className="w-5 h-5" />
          </motion.div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Current Viewers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ delay: 0.1 }}
            className="relative bg-gradient-to-br from-action-50 to-action-100 rounded-xl p-6 border border-action-200 overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-action-200/30 rounded-full -translate-y-10 translate-x-10" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <EyeIcon className="w-6 h-6 text-action-600" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-3 h-3 bg-action-500 rounded-full"
                />
              </div>
              <div className="text-3xl font-bold text-action-700 mb-1">
                {animatedViewers.toLocaleString()}
              </div>
              <div className="text-sm text-action-600 mb-2">
                {language === "pt" ? "Espectadores Atuais" : "Current Viewers"}
              </div>
              <div className="flex items-center gap-1 text-xs">
                <TrendingUp className="w-3 h-3" />
                <span className={viewerGrowth > 0 ? "text-green-600" : "text-gray-500"}>
                  {viewerGrowth > 0 ? `+${viewerGrowth}%` : "—"}
                </span>
              </div>
            </div>
          </motion.div>
          
          {/* Peak Viewers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ delay: 0.2 }}
            className="relative bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-6 border border-secondary-200 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-secondary-200/30 rounded-full -translate-y-10 translate-x-10" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <ArrowTrendingUpIcon className="w-6 h-6 text-secondary-600" />
                <Sparkles className="w-4 h-4 text-secondary-500" />
              </div>
              <div className="text-3xl font-bold text-secondary-700 mb-1">
                {animatedPeak.toLocaleString()}
              </div>
              <div className="text-sm text-secondary-600 mb-2">
                {language === "pt" ? "Pico de Audiência" : "Peak Viewers"}
              </div>
              <div className="text-xs text-gray-500">
                {language === "pt" ? "hoje" : "today"}
              </div>
            </div>
          </motion.div>
          
          {/* Total Views */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ delay: 0.3 }}
            className="relative bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary-200/30 rounded-full -translate-y-10 translate-x-10" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <BarChart3 className="w-6 h-6 text-primary-600" />
                <Zap className="w-4 h-4 text-primary-500" />
              </div>
              <div className="text-3xl font-bold text-primary-700 mb-1">
                {animatedTotal.toLocaleString()}
              </div>
              <div className="text-sm text-primary-600 mb-2">
                {language === "pt" ? "Total de Visualizações" : "Total Views"}
              </div>
              <div className="text-xs text-gray-500">
                {language === "pt" ? "histórico" : "all time"}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Engagement Metrics */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-premium-500 to-premium-600 p-2 rounded-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900">
              {language === "pt" ? "Métricas Premium" : "Premium Metrics"}
            </h4>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {engagementStats.map((metric, index) => {
              const IconComponent = metric.icon;

              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                  transition={{ delay: 0.4 + 0.1 * index }}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-gradient-to-br from-primary-100 to-secondary-100 p-2 rounded-lg group-hover:scale-110 transition-transform">
                      <IconComponent className="w-4 h-4 text-primary-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                      {metric.label}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {metric.value}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Live Indicator with Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-action-50 via-secondary-50 to-primary-50 border border-action-200 rounded-xl p-4 relative overflow-hidden"
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-action-100/50 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-3 h-3 bg-green-500 rounded-full"
                />
                <span className="text-sm font-semibold text-gray-700">
                  {language === "pt" ? "Sistema Ativo" : "System Active"}
                </span>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Globe className="w-3 h-3" />
                <span>{metrics.connectionType || 'auto'}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="text-center">
                <div className="font-bold text-gray-900">
                  {Math.round(metrics.loadTime)}ms
                </div>
                <div className="text-gray-500">
                  {language === "pt" ? "Carregamento" : "Load Time"}
                </div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-900">30s</div>
                <div className="text-gray-500">
                  {language === "pt" ? "Atualização" : "Update Rate"}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Real-time Activity */}
        <div className="mt-4 text-center">
          <div className="text-xs text-gray-500">
            {language === "pt"
              ? `Última atualização: ${new Date().toLocaleTimeString("pt-PT")}`
              : `Last updated: ${new Date().toLocaleTimeString("en-GB")}`}
          </div>
        </div>
      </div>
    </Card>
  );
}
