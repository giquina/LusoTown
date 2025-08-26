/**
 * Mobile Widget Positioning Verification Utility
 * 
 * This utility helps verify that widgets are properly positioned on mobile
 * and don't overlap with each other or navigation elements.
 */

export interface WidgetPosition {
  element: HTMLElement;
  component: string;
  zIndex: number;
  bottom: number;
  right: number;
  left: number;
  visible: boolean;
}

export interface PositioningReport {
  widgets: WidgetPosition[];
  overlaps: string[];
  recommendations: string[];
  mobileOptimized: boolean;
}

/**
 * Analyzes current widget positioning on the page
 */
export function analyzeWidgetPositioning(): PositioningReport {
  if (typeof window === 'undefined') {
    return {
      widgets: [],
      overlaps: [],
      recommendations: ['Run this analysis in a browser environment'],
      mobileOptimized: false
    };
  }

  const widgets: WidgetPosition[] = [];
  const overlaps: string[] = [];
  const recommendations: string[] = [];

  // Define selectors for key widgets
  const widgetSelectors = {
    lusobot: '[class*="z-[40]"], [class*="z-40"]',
    liveFeed: '[class*="z-[45]"], [class*="z-45"]',
    pwaPrompt: '[class*="z-[60]"], [class*="z-60"]',
    mobileNav: '[class*="z-[15]"], [class*="z-15"]'
  };

  // Analyze each widget
  Object.entries(widgetSelectors).forEach(([component, selector]) => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      const computedStyle = window.getComputedStyle(htmlElement);
      const rect = htmlElement.getBoundingClientRect();
      
      const position: WidgetPosition = {
        element: htmlElement,
        component,
        zIndex: parseInt(computedStyle.zIndex) || 0,
        bottom: parseInt(computedStyle.bottom) || 0,
        right: parseInt(computedStyle.right) || 0,
        left: parseInt(computedStyle.left) || 0,
        visible: rect.width > 0 && rect.height > 0
      };
      
      widgets.push(position);
    });
  });

  // Sort widgets by z-index for overlap analysis
  const sortedWidgets = widgets.sort((a, b) => a.zIndex - b.zIndex);

  // Check for overlaps
  for (let i = 0; i < sortedWidgets.length; i++) {
    for (let j = i + 1; j < sortedWidgets.length; j++) {
      const widget1 = sortedWidgets[i];
      const widget2 = sortedWidgets[j];
      
      if (widget1.visible && widget2.visible) {
        const rect1 = widget1.element.getBoundingClientRect();
        const rect2 = widget2.element.getBoundingClientRect();
        
        // Check for overlap
        const overlap = !(rect1.right < rect2.left || 
                         rect2.right < rect1.left || 
                         rect1.bottom < rect2.top || 
                         rect2.bottom < rect1.top);
        
        if (overlap && widget1.zIndex === widget2.zIndex) {
          overlaps.push(`${widget1.component} and ${widget2.component} have same z-index (${widget1.zIndex}) and overlap`);
        }
      }
    }
  }

  // Generate recommendations
  const isMobile = window.innerWidth < 768;
  
  if (isMobile) {
    // Check mobile-specific positioning
    const lusoBotWidgets = widgets.filter(w => w.component === 'lusobot');
    const liveFeedWidgets = widgets.filter(w => w.component === 'liveFeed');
    
    lusoBotWidgets.forEach(widget => {
      if (widget.bottom < 96) { // Less than bottom-24 (96px)
        recommendations.push(`LusoBot widget should use bottom-24 (96px) on mobile, currently at ${widget.bottom}px`);
      }
    });
    
    liveFeedWidgets.forEach(widget => {
      if (widget.bottom < 112) { // Less than bottom-28 (112px)
        recommendations.push(`LiveFeed widget should use bottom-28 (112px) on mobile, currently at ${widget.bottom}px`);
      }
    });
    
    // Check z-index hierarchy
    const lusoBotZ = Math.max(...lusoBotWidgets.map(w => w.zIndex));
    const liveFeedZ = Math.max(...liveFeedWidgets.map(w => w.zIndex));
    
    if (lusoBotZ >= liveFeedZ) {
      recommendations.push(`LiveFeed z-index (${liveFeedZ}) should be higher than LusoBot (${lusoBotZ})`);
    }
  }

  // Check for accessibility
  widgets.forEach(widget => {
    const rect = widget.element.getBoundingClientRect();
    if (rect.width < 44 || rect.height < 44) {
      recommendations.push(`${widget.component} widget is smaller than 44px touch target`);
    }
  });

  const mobileOptimized = isMobile && overlaps.length === 0 && recommendations.length === 0;

  return {
    widgets,
    overlaps,
    recommendations,
    mobileOptimized
  };
}

/**
 * Runs real-time monitoring of widget positions
 */
export function startPositionMonitoring(): () => void {
  if (typeof window === 'undefined') return () => {};

  let animationFrameId: number;
  
  const monitor = () => {
    const report = analyzeWidgetPositioning();
    
    if (report.overlaps.length > 0 || report.recommendations.length > 0) {
      console.group('🚨 Widget Positioning Issues Detected');
      
      if (report.overlaps.length > 0) {
        console.error('Overlaps:', report.overlaps);
      }
      
      if (report.recommendations.length > 0) {
        console.warn('Recommendations:', report.recommendations);
      }
      
      console.table(report.widgets.map(w => ({
        component: w.component,
        zIndex: w.zIndex,
        bottom: w.bottom + 'px',
        visible: w.visible
      })));
      
      console.groupEnd();
    }
    
    animationFrameId = requestAnimationFrame(monitor);
  };
  
  monitor();
  
  return () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  };
}

/**
 * Visual debugging overlay for widget positions
 */
export function showWidgetDebugOverlay(): () => void {
  if (typeof window === 'undefined') return () => {};

  const overlay = document.createElement('div');
  overlay.id = 'widget-debug-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 10px;
    left: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px;
    border-radius: 8px;
    font-family: monospace;
    font-size: 12px;
    z-index: 9999;
    max-width: 300px;
    line-height: 1.4;
  `;

  document.body.appendChild(overlay);

  const update = () => {
    const report = analyzeWidgetPositioning();
    
    overlay.innerHTML = `
      <div><strong>🔧 Widget Debug Info</strong></div>
      <div>Mobile: ${window.innerWidth < 768 ? 'Yes' : 'No'}</div>
      <div>Optimized: ${report.mobileOptimized ? '✅' : '❌'}</div>
      <div>Widgets: ${report.widgets.length}</div>
      <div>Overlaps: ${report.overlaps.length}</div>
      <div>Issues: ${report.recommendations.length}</div>
      ${report.widgets.map(w => 
        `<div>${w.component}: z${w.zIndex} b${w.bottom}px ${w.visible ? '👁️' : '❌'}</div>`
      ).join('')}
      ${report.overlaps.length > 0 ? `<div style="color: red">⚠️ ${report.overlaps.length} overlaps</div>` : ''}
    `;
  };

  update();
  const interval = setInterval(update, 1000);

  return () => {
    clearInterval(interval);
    document.body.removeChild(overlay);
  };
}

/**
 * Quick test function for development
 */
export function testWidgetPositioning(): void {
  console.group('🧪 Widget Positioning Test');
  
  const report = analyzeWidgetPositioning();
  
  console.log('📊 Analysis Results:');
  console.log('- Widgets detected:', report.widgets.length);
  console.log('- Mobile optimized:', report.mobileOptimized);
  console.log('- Overlaps:', report.overlaps.length);
  console.log('- Recommendations:', report.recommendations.length);
  
  if (report.widgets.length > 0) {
    console.table(report.widgets.map(w => ({
      Component: w.component,
      'Z-Index': w.zIndex,
      Bottom: w.bottom + 'px',
      Visible: w.visible ? '✅' : '❌'
    })));
  }
  
  if (report.overlaps.length > 0) {
    console.error('🚨 Overlaps Found:', report.overlaps);
  }
  
  if (report.recommendations.length > 0) {
    console.warn('💡 Recommendations:', report.recommendations);
  }
  
  console.groupEnd();
}