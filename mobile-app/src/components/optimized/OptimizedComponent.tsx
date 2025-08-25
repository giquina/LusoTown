/**
 * Optimized Component Wrapper
 * Implements React.memo, performance tracking, and render optimization
 */

import React, { useEffect, useRef, memo, useCallback } from 'react';
import { PerformanceMonitor } from '../../utils/performance';

interface OptimizedComponentProps {
  children: React.ReactNode;
  componentName: string;
  shouldUpdate?: (prevProps: any, nextProps: any) => boolean;
  onSlowRender?: (renderTime: number) => void;
}

/**
 * Higher-order component for performance optimization
 */
export function withOptimization<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string,
  customShouldUpdate?: (prevProps: P, nextProps: P) => boolean
) {
  const OptimizedComponent = memo(
    React.forwardRef<any, P>((props, ref) => {
      const renderStartTime = useRef<number>(0);
      
      // Track render start time
      renderStartTime.current = performance.now();
      
      // Track render completion
      useEffect(() => {
        PerformanceMonitor.trackRenderTime(componentName, renderStartTime.current);
      });
      
      return <WrappedComponent ref={ref} {...props} />;
    }),
    customShouldUpdate || ((prevProps, nextProps) => {
      // Default optimization: shallow compare
      const prevKeys = Object.keys(prevProps);
      const nextKeys = Object.keys(nextProps);
      
      if (prevKeys.length !== nextKeys.length) return false;
      
      for (const key of prevKeys) {
        if ((prevProps as any)[key] !== (nextProps as any)[key]) {
          return false;
        }
      }
      
      return true;
    })
  );
  
  OptimizedComponent.displayName = `Optimized(${componentName})`;
  
  return OptimizedComponent;
}

/**
 * Portuguese cultural component optimization wrapper
 */
export const PortugueseOptimizedComponent: React.FC<OptimizedComponentProps> = memo({
  children,
  componentName,
  shouldUpdate,
  onSlowRender
}) => {
  const renderStartTime = useRef<number>(0);
  
  // Track render start
  renderStartTime.current = performance.now();
  
  // Track render completion and check for slow renders
  useEffect(() => {
    const renderTime = performance.now() - renderStartTime.current;
    PerformanceMonitor.trackRenderTime(componentName, renderStartTime.current);
    
    // Alert for slow renders (>16ms for 60fps)
    if (renderTime > 16 && onSlowRender) {
      onSlowRender(renderTime);
    }
  });
  
  return <>{children}</>;
}, (prevProps, nextProps) => {
  // Use custom shouldUpdate if provided
  if (prevProps.shouldUpdate) {
    return prevProps.shouldUpdate(prevProps, nextProps);
  }
  
  // Default Portuguese-specific optimization
  return (
    prevProps.componentName === nextProps.componentName &&
    React.Children.count(prevProps.children) === React.Children.count(nextProps.children)
  );
});

/**
 * Performance-optimized hooks
 */
export const useOptimizedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T => {
  return useCallback(callback, deps);
};

export const useOptimizedMemo = <T>(
  factory: () => T,
  deps: React.DependencyList
): T => {
  return React.useMemo(factory, deps);
};

/**
 * Portuguese cultural data memoization
 */
export const usePortugueseCulturalMemo = <T>(
  data: T,
  heritage: string[],
  language: string
): T => {
  return React.useMemo(() => {
    // Only recalculate if heritage or language changes
    return data;
  }, [data, heritage.join(','), language]);
};

/**
 * Component performance analyzer
 */
export const ComponentPerformanceAnalyzer: React.FC<{
  enabled?: boolean;
  threshold?: number; // ms
  onSlowComponent?: (componentName: string, renderTime: number) => void;
}> = ({ enabled = __DEV__, threshold = 16, onSlowComponent }) => {
  useEffect(() => {
    if (!enabled) return;
    
    const checkPerformance = () => {
      const summary = PerformanceMonitor.getPerformanceSummary();
      
      summary.slowestComponents.forEach(({ name, avgTime }) => {
        if (avgTime > threshold) {
          console.warn(`🐌 Performance Warning: ${name} renders in ${avgTime}ms (threshold: ${threshold}ms)`);
          onSlowComponent?.(name, avgTime);
        }
      });
    };
    
    const interval = setInterval(checkPerformance, 10000); // Check every 10 seconds
    
    return () => clearInterval(interval);
  }, [enabled, threshold, onSlowComponent]);
  
  return null;
};

// Pre-defined optimized components for common Portuguese cultural elements
export const OptimizedEventCard = withOptimization(
  ({ event, onPress, language }: any) => {
    // Event card implementation would go here
    return null;
  },
  'EventCard',
  (prevProps, nextProps) => (
    prevProps.event.id === nextProps.event.id &&
    prevProps.language === nextProps.language
  )
);

export const OptimizedBusinessCard = withOptimization(
  ({ business, onPress, heritage }: any) => {
    // Business card implementation would go here
    return null;
  },
  'BusinessCard',
  (prevProps, nextProps) => (
    prevProps.business.id === nextProps.business.id &&
    prevProps.heritage.join(',') === nextProps.heritage.join(',')
  )
);

export const OptimizedMatchCard = withOptimization(
  ({ match, onPress, culturalContext }: any) => {
    // Match card implementation would go here
    return null;
  },
  'MatchCard',
  (prevProps, nextProps) => (
    prevProps.match.id === nextProps.match.id &&
    prevProps.match.compatibilityScore === nextProps.match.compatibilityScore
  )
);

export default {
  withOptimization,
  PortugueseOptimizedComponent,
  useOptimizedCallback,
  useOptimizedMemo,
  usePortugueseCulturalMemo,
  ComponentPerformanceAnalyzer,
  OptimizedEventCard,
  OptimizedBusinessCard,
  OptimizedMatchCard
};
