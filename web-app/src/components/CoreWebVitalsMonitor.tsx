'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
interface CoreWebVitalsMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  cls: number | null; // Cumulative Layout Shift
  fid: number | null; // First Input Delay
  inp: number | null; // Interaction to Next Paint (INP)
  ttfb: number | null; // Time to First Byte
}
interface PerformanceThresholds {
  fcp: { good: number; needsImprovement: number };
  lcp: { good: number; needsImprovement: number };
  cls: { good: number; needsImprovement: number };
  fid: { good: number; needsImprovement: number };
  inp: { good: number; needsImprovement: number };
  ttfb: { good: number; needsImprovement: number };
}
interface CoreWebVitalsMonitorProps {
  enableReporting?: boolean;
  enableNotifications?: boolean;
  reportingEndpoint?: string;
  className?: string;
}
// Core Web Vitals thresholds (75th percentile)
const THRESHOLDS: PerformanceThresholds = {
  fcp: { good: 1800, needsImprovement: 3000 },
  lcp: { good: 2500, needsImprovement: 4000 },
  cls: { good: 0.1, needsImprovement: 0.25 },
  fid: { good: 100, needsImprovement: 300 },
  inp: { good: 200, needsImprovement: 500 },
  ttfb: { good: 800, needsImprovement: 1800 },
};
// Lusophone-specific performance context
const PORTUGUESE_PERFORMANCE_CONTEXT = {
  criticalPages: ['/events', '/community', '/matches', '/business-directory'],
  culturalContent: ['portuguese-events', 'cultural-calendar', 'community-feed'],
  mobileUsageRate: 0.73, // 73% of Portuguese-speaking community uses mobile
};
export default function CoreWebVitalsMonitor({
  enableReporting = true,
  enableNotifications = false,
  reportingEndpoint = '/api/performance/vitals',
  className = ''
}: CoreWebVitalsMonitorProps) {
  const { language, t } = useLanguage();
  // State management
  const [metrics, setMetrics] = useState<CoreWebVitalsMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    inp: null,
    ttfb: null,
  });
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [pageScore, setPageScore] = useState<number | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  // Refs
  const observersRef = useRef<Map<string, PerformanceObserver>>(new Map());
  const metricsCollectedRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    initializeMonitoring();
    return () => {
      cleanup();
    };
  }, []);
  useEffect(() => {
    if (hasAllCriticalMetrics()) {
      calculatePageScore();
      generateRecommendations();
      if (enableReporting) {
        reportMetrics();
      }
    }
  }, [metrics, enableReporting]);
  const initializeMonitoring = () => {
    setIsMonitoring(true);
    // Measure initial navigation timing
    measureNavigationTiming();
    // Set up performance observers for Core Web Vitals
    setupFCPObserver();
    setupLCPObserver();
    setupCLSObserver();
    setupFIDObserver();
    setupINPObserver();
  };
  const measureNavigationTiming = () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      const ttfb = navigation.responseStart - navigation.requestStart;
      setMetrics(prev => ({ ...prev, ttfb }));
      metricsCollectedRef.current.add('ttfb');
    }
    // Measure paint timing
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    if (fcpEntry) {
      setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }));
      metricsCollectedRef.current.add('fcp');
    }
  };
  const setupFCPObserver = () => {
    if (!('PerformanceObserver' in window)) return;
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry && !metricsCollectedRef.current.has('fcp')) {
          setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }));
          metricsCollectedRef.current.add('fcp');
          observer.disconnect();
        }
      });
      observer.observe({ entryTypes: ['paint'] });
      observersRef.current.set('fcp', observer);
    } catch (error) {
      }
  };
  const setupLCPObserver = () => {
    if (!('PerformanceObserver' in window)) return;
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
          metricsCollectedRef.current.add('lcp');
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      observersRef.current.set('lcp', observer);
    } catch (error) {
      }
  };
  const setupCLSObserver = () => {
    if (!('PerformanceObserver' in window)) return;
    let clsValue = 0;
    let clsEntries: any[] = [];
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries() as any[];
        for (const entry of entries) {
          if (!entry.hadRecentInput) {
            const firstSessionEntry = clsEntries[0];
            const lastSessionEntry = clsEntries[clsEntries.length - 1];
            if (!firstSessionEntry || 
                entry.startTime - lastSessionEntry.startTime < 1000 ||
                entry.startTime - firstSessionEntry.startTime < 5000) {
              clsEntries.push(entry);
              clsValue += entry.value;
            } else {
              clsEntries = [entry];
              clsValue = entry.value;
            }
            setMetrics(prev => ({ ...prev, cls: clsValue }));
            metricsCollectedRef.current.add('cls');
          }
        }
      });
      observer.observe({ entryTypes: ['layout-shift'] });
      observersRef.current.set('cls', observer);
    } catch (error) {
      }
  };
  const setupFIDObserver = () => {
    if (!('PerformanceObserver' in window)) return;
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        for (const entry of entries) {
          if (entry.name === 'first-input' && !metricsCollectedRef.current.has('fid')) {
            const fid = (entry as any).processingStart - entry.startTime;
            setMetrics(prev => ({ ...prev, fid }));
            metricsCollectedRef.current.add('fid');
            observer.disconnect();
            break;
          }
        }
      });
      observer.observe({ entryTypes: ['first-input'] });
      observersRef.current.set('fid', observer);
    } catch (error) {
      }
  };
  const setupINPObserver = () => {
    if (!('PerformanceObserver' in window)) return;
    let maxINP = 0;
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries() as any[];
        for (const entry of entries) {
          if (entry.interactionId) {
            const inp = entry.processingStart - entry.startTime;
            maxINP = Math.max(maxINP, inp);
            setMetrics(prev => ({ ...prev, inp: maxINP }));
            metricsCollectedRef.current.add('inp');
          }
        }
      });
      observer.observe({ entryTypes: ['event'] });
      observersRef.current.set('inp', observer);
    } catch (error) {
      }
  };
  const hasAllCriticalMetrics = (): boolean => {
    return !!(metrics.fcp && metrics.lcp && metrics.cls !== null);
  };
  const calculatePageScore = useCallback(() => {
    let score = 100;
    // Score FCP
    if (metrics.fcp) {
      if (metrics.fcp > THRESHOLDS.fcp.needsImprovement) score -= 25;
      else if (metrics.fcp > THRESHOLDS.fcp.good) score -= 10;
    }
    // Score LCP
    if (metrics.lcp) {
      if (metrics.lcp > THRESHOLDS.lcp.needsImprovement) score -= 30;
      else if (metrics.lcp > THRESHOLDS.lcp.good) score -= 15;
    }
    // Score CLS
    if (metrics.cls !== null) {
      if (metrics.cls > THRESHOLDS.cls.needsImprovement) score -= 25;
      else if (metrics.cls > THRESHOLDS.cls.good) score -= 10;
    }
    // Score FID/INP
    const interactionDelay = metrics.inp || metrics.fid;
    if (interactionDelay) {
      const threshold = metrics.inp ? THRESHOLDS.inp : THRESHOLDS.fid;
      if (interactionDelay > threshold.needsImprovement) score -= 20;
      else if (interactionDelay > threshold.good) score -= 8;
    }
    // Score TTFB
    if (metrics.ttfb) {
      if (metrics.ttfb > THRESHOLDS.ttfb.needsImprovement) score -= 15;
      else if (metrics.ttfb > THRESHOLDS.ttfb.good) score -= 5;
    }
    setPageScore(Math.max(0, score));
  }, [metrics]);
  const generateRecommendations = useCallback(() => {
    const newRecommendations: string[] = [];
    if (metrics.fcp && metrics.fcp > THRESHOLDS.fcp.good) {
      newRecommendations.push(
        language === 'pt' 
          ? 'Otimizar carregamento de conteúdo português inicial'
          : 'Optimize initial Lusophone content loading'
      );
    }
    if (metrics.lcp && metrics.lcp > THRESHOLDS.lcp.good) {
      newRecommendations.push(
        language === 'pt'
          ? 'Otimizar imagens e elementos culturais grandes'
          : 'Optimize large cultural images and elements'
      );
    }
    if (metrics.cls !== null && metrics.cls > THRESHOLDS.cls.good) {
      newRecommendations.push(
        language === 'pt'
          ? 'Estabilizar layout dos eventos portugueses'
          : 'Stabilize Lusophone events layout'
      );
    }
    const interactionDelay = metrics.inp || metrics.fid;
    const threshold = metrics.inp ? THRESHOLDS.inp : THRESHOLDS.fid;
    if (interactionDelay && interactionDelay > threshold.good) {
      newRecommendations.push(
        language === 'pt'
          ? 'Melhorar responsividade das interações da comunidade'
          : 'Improve community interaction responsiveness'
      );
    }
    if (metrics.ttfb && metrics.ttfb > THRESHOLDS.ttfb.good) {
      newRecommendations.push(
        language === 'pt'
          ? 'Otimizar tempo de resposta do servidor'
          : 'Optimize server response time'
      );
    }
    setRecommendations(newRecommendations);
  }, [metrics, language]);
  const reportMetrics = useCallback(async () => {
    if (!hasAllCriticalMetrics()) return;
    try {
      const reportData = {
        url: window.location.href,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        connectionType: (navigator as any).connection?.effectiveType,
        deviceMemory: (navigator as any).deviceMemory,
        metrics,
        pageScore,
        isPortuguesePage: PORTUGUESE_PERFORMANCE_CONTEXT.criticalPages
          .some(page => window.location.pathname.startsWith(page)),
        isMobile: window.innerWidth <= 768,
        language,
      };
      const response = await fetch(reportingEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });
      if (!response.ok) {
        }
    } catch (error) {
      }
  }, [metrics, pageScore, reportingEndpoint, language]);
  const cleanup = () => {
    observersRef.current.forEach(observer => {
      observer.disconnect();
    });
    observersRef.current.clear();
    setIsMonitoring(false);
  };
  const getMetricStatus = (value: number | null, thresholds: { good: number; needsImprovement: number }): 'good' | 'needs-improvement' | 'poor' | null => {
    if (value === null) return null;
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.needsImprovement) return 'needs-improvement';
    return 'poor';
  };
  const formatMetricValue = (metric: keyof CoreWebVitalsMetrics, value: number | null): string => {
    if (value === null) return '-';
    switch (metric) {
      case 'cls':
        return value.toFixed(3);
      case 'fcp':
      case 'lcp':
      case 'fid':
      case 'inp':
      case 'ttfb':
        return value < 1000 ? `${Math.round(value)}ms` : `${(value / 1000).toFixed(1)}s`;
      default:
        return value.toString();
    }
  };
  const getScoreColor = (score: number | null): string => {
    if (score === null) return 'text-gray-500';
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };
  const getMetricColor = (status: 'good' | 'needs-improvement' | 'poor' | null): string => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'needs-improvement': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-400';
    }
  };
  // Only show in development or when explicitly enabled
  if (process.env.NODE_ENV !== 'development' && !enableNotifications) {
    return null;
  }
  return (
    <div className={`fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm z-50 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">
          {language === 'pt' ? 'Core Web Vitals' : 'Core Web Vitals'}
        </h3>
        <div className="flex items-center space-x-2">
          {isMonitoring && (
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          )}
          {pageScore !== null && (
            <span className={`text-sm font-bold ${getScoreColor(pageScore)}`}>
              {pageScore}/100
            </span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex justify-between">
          <span>FCP:</span>
          <span className={getMetricColor(getMetricStatus(metrics.fcp, THRESHOLDS.fcp))}>
            {formatMetricValue('fcp', metrics.fcp)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>LCP:</span>
          <span className={getMetricColor(getMetricStatus(metrics.lcp, THRESHOLDS.lcp))}>
            {formatMetricValue('lcp', metrics.lcp)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>CLS:</span>
          <span className={getMetricColor(getMetricStatus(metrics.cls, THRESHOLDS.cls))}>
            {formatMetricValue('cls', metrics.cls)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>{metrics.inp !== null ? 'INP' : 'FID'}:</span>
          <span className={getMetricColor(getMetricStatus(metrics.inp || metrics.fid, metrics.inp !== null ? THRESHOLDS.inp : THRESHOLDS.fid))}>
            {formatMetricValue(metrics.inp !== null ? 'inp' : 'fid', metrics.inp || metrics.fid)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>TTFB:</span>
          <span className={getMetricColor(getMetricStatus(metrics.ttfb, THRESHOLDS.ttfb))}>
            {formatMetricValue('ttfb', metrics.ttfb)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>{language === 'pt' ? 'Estado:' : 'Status:'}</span>
          <span className={isMonitoring ? 'text-green-600' : 'text-gray-400'}>
            {isMonitoring ? (language === 'pt' ? 'Ativo' : 'Active') : (language === 'pt' ? 'Inativo' : 'Inactive')}
          </span>
        </div>
      </div>
      {recommendations.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">
            {language === 'pt' ? 'Recomendações:' : 'Recommendations:'}
          </h4>
          <ul className="text-xs text-gray-600 space-y-1">
            {recommendations.slice(0, 2).map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-1">•</span>
                <span className="line-clamp-2">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}