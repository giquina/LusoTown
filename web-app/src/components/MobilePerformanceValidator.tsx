"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'poor';
  threshold: {
    good: number;
    warning: number;
  };
}

interface TouchTestResult {
  elementId: string;
  size: { width: number; height: number };
  meets44px: boolean;
  hasSpacing: boolean;
  isAccessible: boolean;
}

interface MobilePerformanceValidatorProps {
  enabled?: boolean;
  showInProduction?: boolean;
  className?: string;
}

export default function MobilePerformanceValidator({
  enabled = process.env.NODE_ENV === 'development',
  showInProduction = false,
  className = ''
}: MobilePerformanceValidatorProps) {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [touchTargets, setTouchTargets] = useState<TouchTestResult[]>([]);
  const [portugueseTextChecks, setPortugueseTextChecks] = useState<{
    overflowElements: number;
    longTexts: number;
    truncatedElements: number;
  }>({ overflowElements: 0, longTexts: 0, truncatedElements: 0 });
  const [responsiveChecks, setResponsiveChecks] = useState<{
    viewport: string;
    density: number;
    orientation: string;
    safeAreaSupport: boolean;
  }>({ viewport: '', density: 0, orientation: '', safeAreaSupport: false });

  const isPortuguese = language === 'pt';

  // Don't render in production unless explicitly enabled
  if (!enabled && !showInProduction && process.env.NODE_ENV === 'production') {
    return null;
  }

  useEffect(() => {
    // Performance metrics collection
    const collectPerformanceMetrics = () => {
      if (typeof window === 'undefined') return;

      const metrics: PerformanceMetric[] = [];
      
      // First Contentful Paint
      const fcpEntries = performance.getEntriesByName('first-contentful-paint');
      if (fcpEntries.length > 0) {
        const fcp = fcpEntries[0].startTime;
        metrics.push({
          name: 'First Contentful Paint',
          value: Math.round(fcp),
          unit: 'ms',
          status: fcp < 1800 ? 'good' : fcp < 3000 ? 'warning' : 'poor',
          threshold: { good: 1800, warning: 3000 }
        });
      }

      // Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        let lcp = 0;
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          lcp = lastEntry.startTime;
          
          const lcpMetric: PerformanceMetric = {
            name: 'Largest Contentful Paint',
            value: Math.round(lcp),
            unit: 'ms',
            status: lcp < 2500 ? 'good' : lcp < 4000 ? 'warning' : 'poor',
            threshold: { good: 2500, warning: 4000 }
          };
          
          setPerformanceMetrics(prev => {
            const filtered = prev.filter(m => m.name !== 'Largest Contentful Paint');
            return [...filtered, lcpMetric];
          });
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      }

      // Memory usage (if available)
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        metrics.push({
          name: 'JS Heap Used',
          value: Math.round(memory.usedJSHeapSize / 1024 / 1024),
          unit: 'MB',
          status: memory.usedJSHeapSize < 50 * 1024 * 1024 ? 'good' : 
                  memory.usedJSHeapSize < 100 * 1024 * 1024 ? 'warning' : 'poor',
          threshold: { good: 50, warning: 100 }
        });
      }

      setPerformanceMetrics(metrics);
    };

    // Touch target validation
    const validateTouchTargets = () => {
      const interactiveElements = document.querySelectorAll(
        'button, a, input, select, textarea, [role="button"], [role="tab"], .luxury-touch-target, .elite-nav-item'
      );

      const results: TouchTestResult[] = [];
      
      interactiveElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        
        const meets44px = rect.width >= 44 && rect.height >= 44;
        const hasSpacing = parseInt(style.marginTop) >= 8 || parseInt(style.marginBottom) >= 8;
        const isAccessible = element.hasAttribute('aria-label') || 
                           element.hasAttribute('aria-describedby') ||
                           element.textContent?.trim().length > 0;

        results.push({
          elementId: element.id || `element-${index}`,
          size: { width: Math.round(rect.width), height: Math.round(rect.height) },
          meets44px,
          hasSpacing,
          isAccessible
        });
      });

      setTouchTargets(results);
    };

    // Portuguese text validation
    const validatePortugueseText = () => {
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
      let overflowElements = 0;
      let longTexts = 0;
      let truncatedElements = 0;

      textElements.forEach(element => {
        const text = element.textContent || '';
        const style = window.getComputedStyle(element);
        
        // Check for text overflow
        if (element.scrollWidth > element.clientWidth) {
          overflowElements++;
        }
        
        // Check for very long Portuguese text
        if (isPortuguese && text.length > 200) {
          longTexts++;
        }
        
        // Check for truncated text
        if (style.textOverflow === 'ellipsis' || element.classList.contains('line-clamp-1')) {
          truncatedElements++;
        }
      });

      setPortugueseTextChecks({ overflowElements, longTexts, truncatedElements });
    };

    // Responsive design validation
    const validateResponsive = () => {
      const viewport = `${window.innerWidth}x${window.innerHeight}`;
      const density = window.devicePixelRatio || 1;
      const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
      const safeAreaSupport = CSS.supports('padding', 'env(safe-area-inset-top)');

      setResponsiveChecks({ viewport, density, orientation, safeAreaSupport });
    };

    // Run all validations
    const runValidations = () => {
      collectPerformanceMetrics();
      validateTouchTargets();
      validatePortugueseText();
      validateResponsive();
    };

    // Initial run
    setTimeout(runValidations, 1000);

    // Re-run on resize
    window.addEventListener('resize', validateResponsive);
    
    return () => {
      window.removeEventListener('resize', validateResponsive);
    };
  }, [isPortuguese]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const totalTouchTargets = touchTargets.length;
  const validTouchTargets = touchTargets.filter(t => t.meets44px).length;
  const touchTargetScore = totalTouchTargets > 0 ? Math.round((validTouchTargets / totalTouchTargets) * 100) : 0;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-4 right-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        title="Mobile Performance Validator"
        style={{ fontSize: '12px', width: '40px', height: '40px' }}
      >
        📱
      </button>

      {/* Performance Panel */}
      <motion.div
        className={`fixed top-16 right-4 w-80 max-h-96 overflow-y-auto bg-white rounded-lg shadow-2xl border z-40 ${className}`}
        initial={{ opacity: 0, x: 100, scale: 0.95 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          x: isVisible ? 0 : 100,
          scale: isVisible ? 1 : 0.95
        }}
        style={{ display: isVisible ? 'block' : 'none' }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="p-4">
          <h3 className="text-lg font-bold mb-4 text-gray-800">
            {isPortuguese ? 'Validador Mobile' : 'Mobile Validator'}
          </h3>

          {/* Performance Metrics */}
          <div className="mb-4">
            <h4 className="font-semibold text-sm mb-2 text-gray-700">Performance</h4>
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="flex justify-between items-center p-2 rounded mb-1">
                <span className="text-xs text-gray-600">{metric.name}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(metric.status)}`}>
                  {metric.value}{metric.unit}
                </span>
              </div>
            ))}
          </div>

          {/* Touch Targets */}
          <div className="mb-4">
            <h4 className="font-semibold text-sm mb-2 text-gray-700">
              {isPortuguese ? 'Alvos de Toque' : 'Touch Targets'}
            </h4>
            <div className="flex justify-between items-center p-2 rounded mb-1">
              <span className="text-xs text-gray-600">
                {isPortuguese ? 'Conformidade 44px' : '44px Compliance'}
              </span>
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                touchTargetScore >= 90 ? getStatusColor('good') :
                touchTargetScore >= 70 ? getStatusColor('warning') :
                getStatusColor('poor')
              }`}>
                {touchTargetScore}% ({validTouchTargets}/{totalTouchTargets})
              </span>
            </div>
          </div>

          {/* Portuguese Text Checks */}
          {isPortuguese && (
            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-2 text-gray-700">Texto Português</h4>
              <div className="space-y-1">
                <div className="flex justify-between items-center p-2 rounded">
                  <span className="text-xs text-gray-600">Transbordamentos</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    portugueseTextChecks.overflowElements === 0 ? getStatusColor('good') : getStatusColor('warning')
                  }`}>
                    {portugueseTextChecks.overflowElements}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded">
                  <span className="text-xs text-gray-600">Textos Longos</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    portugueseTextChecks.longTexts < 5 ? getStatusColor('good') : getStatusColor('warning')
                  }`}>
                    {portugueseTextChecks.longTexts}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded">
                  <span className="text-xs text-gray-600">Truncados</span>
                  <span className="text-xs font-medium px-2 py-1 rounded text-blue-600 bg-blue-50">
                    {portugueseTextChecks.truncatedElements}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Responsive Checks */}
          <div className="mb-4">
            <h4 className="font-semibold text-sm mb-2 text-gray-700">
              {isPortuguese ? 'Design Responsivo' : 'Responsive'}
            </h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Viewport:</span>
                <span className="font-medium">{responsiveChecks.viewport}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">DPR:</span>
                <span className="font-medium">{responsiveChecks.density}x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {isPortuguese ? 'Orientação' : 'Orientation'}:
                </span>
                <span className="font-medium">{responsiveChecks.orientation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Safe Area:</span>
                <span className={`font-medium ${
                  responsiveChecks.safeAreaSupport ? 'text-green-600' : 'text-red-600'
                }`}>
                  {responsiveChecks.safeAreaSupport ? '✓' : '✗'}
                </span>
              </div>
            </div>
          </div>

          {/* Overall Score */}
          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">
                {isPortuguese ? 'Pontuação Mobile' : 'Mobile Score'}
              </span>
              <span className={`text-sm font-bold px-3 py-1 rounded ${
                touchTargetScore >= 90 ? 'text-green-600 bg-green-100' :
                touchTargetScore >= 70 ? 'text-yellow-600 bg-yellow-100' :
                'text-red-600 bg-red-100'
              }`}>
                {touchTargetScore}/100
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}