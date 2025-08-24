import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LanguageProvider } from '@/context/LanguageContext';
import LusoBotWidget from '@/components/LusoBotWidget';

// Mock framer-motion for testing
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} {...props}>{children}</div>
    ),
    button: ({ children, className, onClick, ...props }: any) => (
      <button className={className} onClick={onClick} {...props}>{children}</button>
    )
  },
  AnimatePresence: ({ children }: any) => <>{children}</>
}));

// Mock window.visualViewport for keyboard detection testing
const mockVisualViewport = {
  height: 800,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn()
};

Object.defineProperty(window, 'visualViewport', {
  value: mockVisualViewport,
  writable: true
});

// Helper function to render LusoBotWidget with providers
const renderWithProviders = (props = {}) => {
  return render(
    <LanguageProvider>
      <LusoBotWidget {...props} />
    </LanguageProvider>
  );
};

// Mock window dimensions for mobile testing
const mockWindowDimensions = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
  
  // Trigger resize event
  fireEvent(window, new Event('resize'));
};

describe('LusoBotWidget Mobile Positioning', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to desktop dimensions
    mockWindowDimensions(1024, 768);
  });

  describe('Mobile Positioning', () => {
    it('should use mobile-safe positioning on mobile devices', async () => {
      // Set mobile dimensions (iPhone SE width)
      mockWindowDimensions(375, 667);
      
      renderWithProviders({ position: 'bottom-right' });
      
      // Wait for mobile detection to trigger
      await waitFor(() => {
        const widget = document.querySelector('[class*="fixed"]');
        expect(widget).toHaveClass('bottom-24'); // Above mobile nav
        expect(widget).toHaveClass('right-16'); // Avoid FloatingNavigation FAB
        expect(widget).toHaveClass('safe-area-bottom'); // iOS safe area
      });
    });

    it('should use desktop positioning on larger screens', () => {
      mockWindowDimensions(1024, 768);
      
      renderWithProviders({ position: 'bottom-right' });
      
      const widget = document.querySelector('[class*="fixed"]');
      expect(widget).toHaveClass('bottom-6');
      expect(widget).toHaveClass('right-6');
    });

    it('should have proper z-index to avoid navigation conflicts', () => {
      renderWithProviders();
      
      const widget = document.querySelector('[class*="fixed"]');
      expect(widget).toHaveClass('z-40'); // Below mobile nav z-50
    });
  });

  describe('Mobile Chat Window', () => {
    it('should use mobile-optimized dimensions on small screens', async () => {
      mockWindowDimensions(375, 667);
      
      renderWithProviders();
      
      const chatButton = screen.getByRole('button');
      fireEvent.click(chatButton);
      
      await waitFor(() => {
        const chatWindow = document.querySelector('[class*="w-\\[90vw\\]"]');
        expect(chatWindow).toBeInTheDocument();
        expect(chatWindow).toHaveClass('max-w-sm'); // Mobile max width
        expect(chatWindow).toHaveClass('h-[70vh]'); // Mobile height
        expect(chatWindow).toHaveClass('max-h-[500px]'); // Mobile max height
      });
    });

    it('should use desktop dimensions on larger screens', () => {
      mockWindowDimensions(1024, 768);
      
      renderWithProviders();
      
      const chatButton = screen.getByRole('button');
      fireEvent.click(chatButton);
      
      const chatWindow = document.querySelector('[class*="w-96"]');
      expect(chatWindow).toBeInTheDocument();
      expect(chatWindow).toHaveClass('h-[600px]'); // Desktop height
    });
  });

  describe('Mobile Keyboard Detection', () => {
    it('should hide widget when mobile keyboard is open', async () => {
      mockWindowDimensions(375, 667);
      
      renderWithProviders();
      
      const chatButton = screen.getByRole('button');
      expect(chatButton).toBeInTheDocument();
      
      // Simulate keyboard opening (viewport height reduces significantly)
      mockVisualViewport.height = 400; // Keyboard reduces viewport by 400px
      const resizeCallback = mockVisualViewport.addEventListener.mock.calls
        .find(([event]) => event === 'resize')?.[1];
      
      if (resizeCallback) {
        resizeCallback();
      }
      
      await waitFor(() => {
        expect(chatButton).not.toBeInTheDocument();
      });
    });
  });

  describe('Touch Target Accessibility', () => {
    it('should have minimum touch target size on mobile', async () => {
      mockWindowDimensions(375, 667);
      
      renderWithProviders();
      
      await waitFor(() => {
        const chatButton = screen.getByRole('button');
        expect(chatButton).toHaveClass('min-h-[44px]'); // WCAG minimum
        expect(chatButton).toHaveClass('min-w-[44px]');
      });
    });

    it('should use smaller button on mobile while maintaining touch targets', async () => {
      mockWindowDimensions(375, 667);
      
      renderWithProviders();
      
      await waitFor(() => {
        const chatButton = screen.getByRole('button');
        expect(chatButton).toHaveClass('w-14'); // Mobile size
        expect(chatButton).toHaveClass('h-14');
        expect(chatButton).toHaveClass('min-h-[44px]'); // Still meets WCAG
      });
    });
  });

  describe('Portuguese Community Branding', () => {
    it('should include Portuguese flag indicator', () => {
      renderWithProviders();
      
      const flagIndicator = screen.getByText('🇵🇹');
      expect(flagIndicator).toBeInTheDocument();
    });

    it('should have proper Portuguese accessibility labels', () => {
      renderWithProviders();
      
      const chatButton = screen.getByLabelText(/LusoBot.*Português/i);
      expect(chatButton).toBeInTheDocument();
    });

    it('should support keyboard navigation with Portuguese context', () => {
      renderWithProviders();
      
      const chatButton = screen.getByRole('button');
      
      // Test Enter key
      fireEvent.keyDown(chatButton, { key: 'Enter' });
      expect(chatButton).toHaveAttribute('tabIndex', '0');
      
      // Test Space key
      fireEvent.keyDown(chatButton, { key: ' ' });
      expect(chatButton).toHaveAttribute('role', 'button');
    });
  });

  describe('Conflict Avoidance', () => {
    it('should position away from FloatingNavigation FAB on mobile', async () => {
      mockWindowDimensions(375, 667);
      
      renderWithProviders({ position: 'bottom-right' });
      
      await waitFor(() => {
        const widget = document.querySelector('[class*="fixed"]');
        expect(widget).toHaveClass('right-16'); // Moved left to avoid FAB at right-6
      });
    });

    it('should not conflict with mobile navigation z-index', () => {
      renderWithProviders();
      
      const widget = document.querySelector('[class*="fixed"]');
      expect(widget).toHaveClass('z-40'); // Below mobile nav z-50
    });
  });
});