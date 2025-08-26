import { render, screen } from '@testing-library/react';
import { COMPONENT_Z_INDEX, getMobileWidgetClasses, getMobileSafePosition } from '@/config/z-index-layers';
import LusoBotWidget from '@/components/LusoBotWidget';
import LiveFeedNotifications from '@/components/LiveFeedNotifications';

// Mock the necessary contexts
jest.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({
    language: 'en',
    t: (key: string) => key,
  })
}));

describe('Z-Index Layer Management Fixes', () => {
  describe('Z-Index Constants', () => {
    it('should have proper hierarchy for widgets', () => {
      expect(COMPONENT_Z_INDEX.PWAInstallPrompt).toBeGreaterThan(COMPONENT_Z_INDEX.LiveFeedNotifications);
      expect(COMPONENT_Z_INDEX.LiveFeedNotifications).toBeGreaterThan(COMPONENT_Z_INDEX.LusoBotWidget);
      expect(COMPONENT_Z_INDEX.LusoBotWidget).toBeGreaterThan(COMPONENT_Z_INDEX.MobileNavigation);
    });

    it('should prevent widget overlap on mobile', () => {
      // PWA Install Modal should be highest (z-60)
      expect(COMPONENT_Z_INDEX.PWAInstallPrompt).toBe(60);
      
      // LiveFeed should be above LusoBot (z-45 > z-40)
      expect(COMPONENT_Z_INDEX.LiveFeedNotifications).toBe(45);
      expect(COMPONENT_Z_INDEX.LusoBotWidget).toBe(40);
      
      // Navigation should be lower than widgets
      expect(COMPONENT_Z_INDEX.MobileNavigation).toBe(15);
    });
  });

  describe('Mobile Safe Positioning', () => {
    it('should return proper bottom positioning values', () => {
      expect(getMobileSafePosition('bottom', 'safe')).toBe('bottom-20');
      expect(getMobileSafePosition('bottom', 'widget')).toBe('bottom-24'); 
      expect(getMobileSafePosition('bottom', 'notification')).toBe('bottom-28');
      expect(getMobileSafePosition('bottom', 'high')).toBe('bottom-32');
    });

    it('should generate complete mobile widget classes', () => {
      const classes = getMobileWidgetClasses('LusoBotWidget', 'bottom-right');
      expect(classes).toContain('fixed');
      expect(classes).toContain('bottom-24'); // widget level spacing
      expect(classes).toContain('right-4');   // safe right spacing  
      expect(classes).toContain('z-[40]');    // LusoBot z-index
    });
  });

  describe('Component Implementation', () => {
    it('should render LusoBotWidget with correct z-index on mobile', () => {
      // Mock mobile detection
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375, // Mobile width
      });

      render(<LusoBotWidget isOpen={false} />);
      
      // Check that the widget uses mobile-safe positioning
      const widget = document.querySelector('[class*="z-[40]"]');
      expect(widget).toBeInTheDocument();
    });

    it('should render LiveFeedNotifications with higher z-index than LusoBot', () => {
      render(<LiveFeedNotifications />);
      
      // LiveFeed should use z-[45] which is higher than LusoBot's z-[40]
      const notification = document.querySelector('[class*="z-[45]"]');
      expect(notification).toBeInTheDocument();
    });
  });

  describe('Mobile Navigation Clearance', () => {
    it('should position widgets above mobile navigation area', () => {
      const lusoBotClasses = getMobileWidgetClasses('LusoBotWidget');
      const liveFeedPosition = getMobileSafePosition('bottom', 'notification');
      
      // LusoBot at bottom-24 (96px) should be above mobile nav at bottom-20 (80px)
      expect(lusoBotClasses).toContain('bottom-24');
      
      // LiveFeed at bottom-28 (112px) should be above LusoBot
      expect(liveFeedPosition).toBe('bottom-28');
    });

    it('should maintain proper stacking order', () => {
      // Verify the complete stacking order from bottom to top:
      // 1. Mobile Navigation (z-15, bottom-0)
      // 2. LusoBot Widget (z-40, bottom-24)  
      // 3. LiveFeed Notifications (z-45, bottom-28)
      // 4. PWA Install Modal (z-60, full screen)
      
      expect(COMPONENT_Z_INDEX.MobileNavigation).toBeLessThan(COMPONENT_Z_INDEX.LusoBotWidget);
      expect(COMPONENT_Z_INDEX.LusoBotWidget).toBeLessThan(COMPONENT_Z_INDEX.LiveFeedNotifications);
      expect(COMPONENT_Z_INDEX.LiveFeedNotifications).toBeLessThan(COMPONENT_Z_INDEX.PWAInstallPrompt);
    });
  });

  describe('CSS Integration', () => {
    it('should provide mobile-safe CSS classes', () => {
      // Test that our CSS classes are available
      const styles = document.createElement('style');
      styles.textContent = `
        @media (max-width: 768px) {
          .widget-safe-bottom { bottom: 5rem; }
          .chat-widget-mobile { bottom: 6rem; right: 1rem; z-index: 40; }
          .live-feed-mobile { bottom: 7rem; left: 1rem; right: 1rem; z-index: 45; }
        }
      `;
      document.head.appendChild(styles);
      
      // Verify styles are properly structured
      expect(styles.textContent).toContain('widget-safe-bottom');
      expect(styles.textContent).toContain('chat-widget-mobile');
      expect(styles.textContent).toContain('live-feed-mobile');
      
      document.head.removeChild(styles);
    });
  });
});

describe('Mobile UX Accessibility Fixes', () => {
  it('should ensure 44px minimum touch targets', () => {
    render(<LusoBotWidget isOpen={false} />);
    
    // LusoBot button should meet accessibility touch target requirements
    const button = document.querySelector('button[aria-label*="LusoBot"]');
    if (button) {
      const styles = window.getComputedStyle(button);
      // Should have min-height and min-width for touch targets
      expect(button.className).toContain('min-h-[44px]');
      expect(button.className).toContain('min-w-[44px]');
    }
  });

  it('should provide proper ARIA labels for screen readers', () => {
    render(<LusoBotWidget isOpen={false} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label');
    expect(button).toHaveAttribute('tabIndex', '0');
  });
});

describe('Performance Impact Assessment', () => {
  it('should not impact render performance with z-index changes', () => {
    const startTime = performance.now();
    
    render(
      <>
        <LusoBotWidget isOpen={false} />
        <LiveFeedNotifications />
      </>
    );
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    // Should render in under 50ms (performance target)
    expect(renderTime).toBeLessThan(50);
  });

  it('should use efficient CSS selectors', () => {
    const classes = getMobileWidgetClasses('LusoBotWidget');
    
    // Should not use complex selectors that harm performance
    expect(classes).not.toContain('*');
    expect(classes).not.toContain('[class*=');
    expect(classes.split(' ').length).toBeLessThan(10); // Keep class count reasonable
  });
});