/**
 * Portuguese Text Performance Monitor Component
 * 
 * Specialized component for monitoring Portuguese text rendering performance,
 * accounting for the 20-30% longer text length and special character handling
 * in the LusoTown Portuguese community platform.
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePortugueseContentPerformance } from '@/hooks/usePerformanceMonitoring';
import { trackEvent, ANALYTICS_EVENTS } from '@/config/analytics';
import { useLanguage } from '@/context/LanguageContext';

interface PortugueseTextMonitorProps {
  children: React.ReactNode;
  trackingId?: string;
  category?: 'events' | 'business' | 'profiles' | 'general';
  expectedTextLength?: 'short' | 'medium' | 'long';
  critical?: boolean;
  className?: string;
}

interface TextPerformanceMetrics {
  textLength: number;
  renderingTime: number;
  isPortuguese: boolean;
  hasSpecialCharacters: boolean;
  fontLoadTime: number;
  layoutShiftImpact: number;
}

// Portuguese character detection
const PORTUGUESE_SPECIAL_CHARS = /[àáâãçéêíóôõú]/gi;
const PORTUGUESE_WORDS = /\b(português|brasil|são|joão|maria|josé|açúcar|coração|não|estão|então|canção)\b/gi;

// Text complexity analysis
const analyzePortugueseText = (text: string): {
  isPortuguese: boolean;
  specialCharsCount: number;
  estimatedRenderingWeight: number;
} => {
  const specialCharsCount = (text.match(PORTUGUESE_SPECIAL_CHARS) || []).length;
  const portugueseWordsCount = (text.match(PORTUGUESE_WORDS) || []).length;
  
  // Heuristic to determine if text is Portuguese
  const isPortuguese = 
    specialCharsCount > 0 || 
    portugueseWordsCount > 0 || 
    text.length > 100 && (specialCharsCount / text.length > 0.02);

  // Calculate rendering weight (1.0 = baseline English)
  let renderingWeight = 1.0;
  if (isPortuguese) {
    renderingWeight += 0.25; // Base 25% increase for Portuguese
    renderingWeight += (specialCharsCount / text.length) * 0.1; // Additional weight for special chars
  }

  return {
    isPortuguese,
    specialCharsCount,
    estimatedRenderingWeight: Math.min(renderingWeight, 1.5) // Cap at 50% increase
  };
};

const PortugueseTextMonitor: React.FC<PortugueseTextMonitorProps> = ({
  children,
  trackingId,
  category = 'general',
  expectedTextLength = 'medium',
  critical = false,
  className = ''
}) => {
  const { t } = useLanguage();
  const { portugueseMetrics, isMonitoring } = usePortugueseContentPerformance(category as any);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const renderStartTime = useRef<number>(0);
  const [performanceMetrics, setPerformanceMetrics] = useState<TextPerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Extract text content from children
  const extractTextContent = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return node.toString();
    if (React.isValidElement(node)) {
      return React.Children.toArray(node.props.children)
        .map(child => extractTextContent(child))
        .join('');
    }
    if (Array.isArray(node)) {
      return node.map(child => extractTextContent(child)).join('');
    }
    return '';
  };

  // Measure text rendering performance
  const measureTextRendering = async (): Promise<void> => {
    if (!containerRef.current || !isVisible) return;

    const startTime = performance.now();
    renderStartTime.current = startTime;

    try {
      // Get text content
      const textContent = extractTextContent(children);
      const textAnalysis = analyzePortugueseText(textContent);

      // Wait for fonts to load
      const fontLoadStart = performance.now();
      await document.fonts.ready;
      const fontLoadTime = performance.now() - fontLoadStart;

      // Measure layout completion
      const element = containerRef.current;
      const rect = element.getBoundingClientRect();
      
      // Wait for next frame to ensure rendering is complete
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      const renderingTime = performance.now() - startTime;

      // Check for layout shift
      const newRect = element.getBoundingClientRect();
      const layoutShiftImpact = Math.abs(newRect.height - rect.height);

      const metrics: TextPerformanceMetrics = {
        textLength: textContent.length,
        renderingTime,
        isPortuguese: textAnalysis.isPortuguese,
        hasSpecialCharacters: textAnalysis.specialCharsCount > 0,
        fontLoadTime,
        layoutShiftImpact
      };

      setPerformanceMetrics(metrics);

      // Track performance metrics
      if (isMonitoring) {
        trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
          metric_type: 'portuguese_text_rendering',
          tracking_id: trackingId,
          category,
          text_length: metrics.textLength,
          rendering_time: metrics.renderingTime,
          is_portuguese: metrics.isPortuguese,
          special_chars: textAnalysis.specialCharsCount,
          font_load_time: metrics.fontLoadTime,
          layout_shift_impact: metrics.layoutShiftImpact,
          estimated_weight: textAnalysis.estimatedRenderingWeight,
          expected_length: expectedTextLength,
          is_critical: critical
        });
      }

      // Log performance issues
      const expectedTime = getExpectedRenderingTime(expectedTextLength, textAnalysis.estimatedRenderingWeight);
      if (renderingTime > expectedTime * 2) {
        console.warn('🐌 Slow Portuguese text rendering detected:', {
          trackingId,
          textLength: metrics.textLength,
          renderingTime: metrics.renderingTime,
          expectedTime,
          isPortuguese: metrics.isPortuguese,
          category
        });

        // Track slow rendering
        trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
          metric_type: 'slow_portuguese_text_rendering',
          tracking_id: trackingId,
          rendering_time: metrics.renderingTime,
          expected_time: expectedTime,
          performance_ratio: renderingTime / expectedTime
        });
      }

      // Log font loading issues
      if (fontLoadTime > 1000) { // More than 1 second
        console.warn('🔤 Slow Portuguese font loading detected:', {
          trackingId,
          fontLoadTime,
          isPortuguese: metrics.isPortuguese
        });

        trackEvent(ANALYTICS_EVENTS.PERFORMANCE_METRIC, {
          metric_type: 'slow_portuguese_font_loading',
          tracking_id: trackingId,
          font_load_time: fontLoadTime,
          is_portuguese: metrics.isPortuguese
        });
      }

    } catch (error) {
      console.error('Failed to measure Portuguese text rendering:', error);
    }
  };

  // Get expected rendering time based on text characteristics
  const getExpectedRenderingTime = (
    textLength: 'short' | 'medium' | 'long',
    renderingWeight: number
  ): number => {
    const baseTimes = {
      short: 50,   // 50ms for short text
      medium: 100, // 100ms for medium text
      long: 200    // 200ms for long text
    };

    return baseTimes[textLength] * renderingWeight;
  };

  // Setup intersection observer for visibility detection
  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          measureTextRendering();
        }
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '50px' // Start measuring 50px before visible
      }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isVisible]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Render performance indicator in development
  const showPerformanceIndicator = 
    process.env.NODE_ENV === 'development' && 
    performanceMetrics && 
    performanceMetrics.renderingTime > 0;

  return (
    <>
      <div
        ref={containerRef}
        className={className}
        data-portuguese-text="true"
        data-portuguese-category={category}
        data-tracking-id={trackingId}
        data-critical={critical}
      >
        {children}
      </div>

      {/* Development Performance Indicator */}
      {showPerformanceIndicator && (
        <div className="fixed bottom-4 right-4 z-50 bg-black bg-opacity-75 text-white text-xs p-2 rounded max-w-xs">
          <div className="font-medium mb-1">📊 Portuguese Text Performance</div>
          <div>Rendering: {performanceMetrics.renderingTime.toFixed(1)}ms</div>
          <div>Length: {performanceMetrics.textLength} chars</div>
          <div>Portuguese: {performanceMetrics.isPortuguese ? '✓' : '✗'}</div>
          <div>Special chars: {performanceMetrics.hasSpecialCharacters ? '✓' : '✗'}</div>
          {performanceMetrics.fontLoadTime > 0 && (
            <div>Font load: {performanceMetrics.fontLoadTime.toFixed(1)}ms</div>
          )}
          {performanceMetrics.layoutShiftImpact > 0 && (
            <div>Layout shift: {performanceMetrics.layoutShiftImpact.toFixed(1)}px</div>
          )}
          {trackingId && (
            <div className="mt-1 text-gray-300">ID: {trackingId}</div>
          )}
        </div>
      )}
    </>
  );
};

// Higher-order component for easy wrapping
export const withPortugueseTextMonitoring = <P extends object>(
  Component: React.ComponentType<P>,
  options: Partial<PortugueseTextMonitorProps> = {}
) => {
  const WrappedComponent: React.FC<P> = (props) => {
    return (
      <PortugueseTextMonitor {...options}>
        <Component {...props} />
      </PortugueseTextMonitor>
    );
  };

  WrappedComponent.displayName = `withPortugueseTextMonitoring(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

// Hook for accessing text performance metrics
export const usePortugueseTextMetrics = (trackingId?: string) => {
  const { portugueseMetrics } = usePortugueseContentPerformance();
  
  return {
    textRenderingTime: portugueseMetrics?.textRenderingTime || 0,
    averageRenderingTime: portugueseMetrics?.textRenderingTime || 0,
    isOptimal: (portugueseMetrics?.textRenderingTime || 0) < 200, // Under 200ms is optimal
    trackingId
  };
};

// Component for displaying Portuguese text performance summary
export const PortugueseTextPerformanceSummary: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  const { t } = useLanguage();
  const { portugueseMetrics } = usePortugueseContentPerformance();

  if (!portugueseMetrics) {
    return null;
  }

  const isOptimal = portugueseMetrics.textRenderingTime < 200;
  const performanceLevel = 
    portugueseMetrics.textRenderingTime < 100 ? 'excellent' :
    portugueseMetrics.textRenderingTime < 200 ? 'good' :
    portugueseMetrics.textRenderingTime < 500 ? 'fair' : 'poor';

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-900 flex items-center">
          🇵🇹 {t('performance.portugueseText.title', 'Portuguese Text Performance')}
        </h3>
        <div className={`px-2 py-1 rounded text-xs font-medium ${
          performanceLevel === 'excellent' ? 'bg-green-100 text-green-800' :
          performanceLevel === 'good' ? 'bg-blue-100 text-blue-800' :
          performanceLevel === 'fair' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {t(`performance.level.${performanceLevel}`, performanceLevel)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-600">
            {t('performance.portugueseText.renderingTime', 'Rendering Time')}
          </div>
          <div className="font-medium">
            {portugueseMetrics.textRenderingTime.toFixed(0)}ms
          </div>
        </div>
        
        <div>
          <div className="text-gray-600">
            {t('performance.portugueseText.impact', 'Portuguese Impact')}
          </div>
          <div className="font-medium">
            +{((portugueseMetrics.textRenderingTime / 400 - 1) * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      {!isOptimal && (
        <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
          <div className="text-blue-800">
            💡 {t('performance.portugueseText.tip', 'Tip')}: {
              t('performance.portugueseText.optimizationTip', 
                'Portuguese text is 25% longer than English. Consider progressive loading for long content.')
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default PortugueseTextMonitor;