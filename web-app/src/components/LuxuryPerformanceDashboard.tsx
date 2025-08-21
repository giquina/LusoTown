"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Crown, 
  TrendingUp, 
  Clock, 
  Gauge, 
  Sparkles,
  Shield,
  Wifi,
  Monitor,
  Smartphone
} from "lucide-react";
import { LuxuryCard, LuxuryProgress } from "@/components/LuxuryMicroInteractions";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";

interface LuxuryPerformanceDashboardProps {
  language: string;
  variant?: "premium" | "elite";
}

export default function LuxuryPerformanceDashboard({
  language,
  variant = "premium"
}: LuxuryPerformanceDashboardProps) {
  const { metrics } = usePerformanceOptimization();
  const [performanceScore, setPerformanceScore] = useState(0);
  const [optimizationLevel, setOptimizationLevel] = useState("excellent");
  const isPortuguese = language === "pt";

  // Calculate performance score based on metrics
  useEffect(() => {
    const calculateScore = () => {
      let score = 100;
      
      // Deduct points based on load time
      if (metrics.loadTime > 3000) score -= 30;
      else if (metrics.loadTime > 1500) score -= 15;
      else if (metrics.loadTime > 500) score -= 5;
      
      // Deduct points based on render time
      if (metrics.renderTime > 2000) score -= 20;
      else if (metrics.renderTime > 1000) score -= 10;
      
      // Deduct points based on memory usage
      if (metrics.memoryUsage > 100) score -= 15;
      else if (metrics.memoryUsage > 50) score -= 8;
      
      // Connection type bonus
      if (metrics.connectionType === '4g') score += 5;
      else if (metrics.connectionType === 'slow-2g') score -= 20;
      
      return Math.max(0, Math.min(100, score));
    };
    
    const score = calculateScore();
    setPerformanceScore(score);
    
    if (score >= 90) setOptimizationLevel("excellent");
    else if (score >= 75) setOptimizationLevel("good");
    else if (score >= 60) setOptimizationLevel("average");
    else setOptimizationLevel("poor");
  }, [metrics]);

  const optimizations = [
    {
      id: "image-optimization",
      name: isPortuguese ? "Otimização de Imagem" : "Image Optimization",
      description: isPortuguese 
        ? "Carregamento progressivo e compressão inteligente" 
        : "Progressive loading and intelligent compression",
      status: "active",
      impact: "high",
      icon: Monitor,
    },
    {
      id: "lazy-loading",
      name: isPortuguese ? "Carregamento Inteligente" : "Smart Lazy Loading",
      description: isPortuguese 
        ? "Componentes carregados sob demanda" 
        : "Components loaded on demand",
      status: "active",
      impact: "high",
      icon: Zap,
    },
    {
      id: "memory-management",
      name: isPortuguese ? "Gestão de Memória" : "Memory Management",
      description: isPortuguese 
        ? "Limpeza automática e prevenção de vazamentos" 
        : "Automatic cleanup and leak prevention",
      status: "active",
      impact: "medium",
      icon: Shield,
    },
    {
      id: "connection-adaptation",
      name: isPortuguese ? "Adaptação de Conexão" : "Connection Adaptation",
      description: isPortuguese 
        ? "Qualidade automática baseada na conexão" 
        : "Automatic quality based on connection",
      status: "active",
      impact: "medium",
      icon: Wifi,
    },
    {
      id: "micro-interactions",
      name: isPortuguese ? "Micro-interações Premium" : "Premium Micro-interactions",
      description: isPortuguese 
        ? "Animações otimizadas para dispositivos" 
        : "Device-optimized animations",
      status: "active",
      impact: "high",
      icon: Sparkles,
    },
    {
      id: "mobile-optimization",
      name: isPortuguese ? "Otimização Mobile" : "Mobile Optimization",
      description: isPortuguese 
        ? "Experiência otimizada para dispositivos móveis" 
        : "Optimized mobile device experience",
      status: "active",
      impact: "high",
      icon: Smartphone,
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 90) return "from-green-500 to-emerald-600";
    if (score >= 75) return "from-blue-500 to-indigo-600";
    if (score >= 60) return "from-yellow-500 to-orange-600";
    return "from-red-500 to-red-600";
  };

  const getOptimizationLevelText = () => {
    switch (optimizationLevel) {
      case "excellent":
        return isPortuguese ? "Excelente" : "Excellent";
      case "good":
        return isPortuguese ? "Bom" : "Good";
      case "average":
        return isPortuguese ? "Médio" : "Average";
      case "poor":
        return isPortuguese ? "Fraco" : "Poor";
      default:
        return isPortuguese ? "Avaliando" : "Evaluating";
    }
  };

  return (
    <LuxuryCard 
      variant={variant} 
      className="p-0 overflow-hidden"
      hoverable={true}
      glowEffect={true}
    >
      {/* Header */}
      <div className={`p-6 text-white relative overflow-hidden ${
        variant === "elite" 
          ? "bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500"
          : "bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"
      }`}>
        {/* Background elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="bg-white/20 p-3 rounded-xl backdrop-blur-sm"
            >
              <Gauge className="w-8 h-8" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold mb-1">
                {isPortuguese ? "Performance Premium" : "Premium Performance"}
              </h2>
              <p className="text-white/80">
                {isPortuguese ? "Otimizações de Luxo Ativas" : "Luxury Optimizations Active"}
              </p>
            </div>
          </div>
          
          {variant === "elite" && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-white/20 p-3 rounded-xl"
            >
              <Crown className="w-6 h-6" />
            </motion.div>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Performance Score */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {isPortuguese ? "Pontuação de Performance" : "Performance Score"}
            </h3>
            <div className={`text-2xl font-bold ${getScoreColor(performanceScore)}`}>
              {Math.round(performanceScore)}/100
            </div>
          </div>
          
          <LuxuryProgress 
            progress={performanceScore}
            variant={variant}
            animated={true}
            showPercentage={false}
          />
          
          <div className="flex items-center justify-between mt-2 text-sm">
            <span className="text-gray-600">
              {isPortuguese ? "Nível de Otimização:" : "Optimization Level:"}
            </span>
            <span className={`font-semibold ${getScoreColor(performanceScore)}`}>
              {getOptimizationLevelText()}
            </span>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Clock className="w-6 h-6 mx-auto mb-2 text-primary-600" />
            <div className="text-lg font-bold text-gray-900">
              {Math.round(metrics.loadTime)}ms
            </div>
            <div className="text-xs text-gray-600">
              {isPortuguese ? "Carregamento" : "Load Time"}
            </div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-secondary-600" />
            <div className="text-lg font-bold text-gray-900">
              {Math.round(metrics.renderTime)}ms
            </div>
            <div className="text-xs text-gray-600">
              {isPortuguese ? "Renderização" : "Render Time"}
            </div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Monitor className="w-6 h-6 mx-auto mb-2 text-accent-600" />
            <div className="text-lg font-bold text-gray-900">
              {Math.round(metrics.memoryUsage)}MB
            </div>
            <div className="text-xs text-gray-600">
              {isPortuguese ? "Memória" : "Memory"}
            </div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Wifi className="w-6 h-6 mx-auto mb-2 text-action-600" />
            <div className="text-lg font-bold text-gray-900 capitalize">
              {metrics.connectionType || 'auto'}
            </div>
            <div className="text-xs text-gray-600">
              {isPortuguese ? "Conexão" : "Connection"}
            </div>
          </div>
        </div>

        {/* Active Optimizations */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {isPortuguese ? "Otimizações Ativas" : "Active Optimizations"}
          </h3>
          
          <div className="grid gap-3">
            {optimizations.map((optimization, index) => {
              const IconComponent = optimization.icon;
              
              return (
                <motion.div
                  key={optimization.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      optimization.impact === "high" 
                        ? "bg-green-100 text-green-600"
                        : "bg-blue-100 text-blue-600"
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {optimization.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {optimization.description}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      optimization.impact === "high"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {optimization.impact === "high" 
                        ? (isPortuguese ? "Alto" : "High")
                        : (isPortuguese ? "Médio" : "Medium")
                      }
                    </span>
                    
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Performance Tips */}
        <div className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-200">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary-600" />
            <span className="font-semibold text-primary-700">
              {isPortuguese ? "Dica Premium" : "Premium Tip"}
            </span>
          </div>
          <p className="text-sm text-primary-600">
            {isPortuguese 
              ? "Todas as otimizações estão funcionando automaticamente para proporcionar a melhor experiência possível na sua conexão."
              : "All optimizations are working automatically to provide the best possible experience on your connection."
            }
          </p>
        </div>
      </div>
    </LuxuryCard>
  );
}