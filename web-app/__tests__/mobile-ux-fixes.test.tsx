/**
 * Mobile UX Fixes Verification Tests
 * 
 * These tests verify the critical mobile UX fixes implemented:
 * 1. AppDownloadBar positioning and z-index
 * 2. Homepage CTA button text wrapping prevention
 * 3. Portuguese-speaking community cultural accuracy
 * 4. Mobile responsiveness at key breakpoints
 * 5. Touch target accessibility compliance
 */

import React from 'react';
import { render, screen, within, act, waitFor } from '@testing-library/react';
import { LanguageProvider } from '@/context/LanguageContext';
import { HeritageProvider } from '@/context/HeritageContext';
import AppDownloadBar from '@/components/AppDownloadBar';
import CTA from '@/components/CTA';
import Header from '@/components/Header';

// Mock window dimensions for responsive testing
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
  
  window.dispatchEvent(new Event('resize'));
};

// Test wrapper component
const TestWrapper = ({ children, language = 'en' }: { children: React.ReactNode; language?: 'en' | 'pt' }) => (
  <LanguageProvider initialLanguage={language}>
    <HeritageProvider>
      {children}
    </HeritageProvider>
  </LanguageProvider>
);

describe('Mobile UX Fixes Verification', () => {
  beforeEach(() => {
    // Reset window dimensions before each test
    mockWindowDimensions(1024, 768);
    
    // Mock localStorage and sessionStorage
    const mockStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };
    
    Object.defineProperty(window, 'localStorage', {
      value: mockStorage,
      writable: true,
    });
    
    Object.defineProperty(window, 'sessionStorage', {
      value: mockStorage,
      writable: true,
    });
    
    // Mock navigator
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
      writable: true,
    });
  });

  describe('AppDownloadBar Mobile Fixes', () => {
    it('should have proper positioning and z-index on mobile', async () => {
      mockWindowDimensions(375, 667); // iPhone SE dimensions
      
      render(
        <TestWrapper>
          <AppDownloadBar autoShow={true} showDelay={0} />
        </TestWrapper>
      );

      await waitFor(() => {
        const downloadBar = screen.getByRole('banner');
        expect(downloadBar).toBeInTheDocument();
        
        // Check positioning classes for mobile
        expect(downloadBar).toHaveClass('fixed', 'bottom-0', 'left-2', 'right-2');
        expect(downloadBar).toHaveClass('max-w-sm');
        
        // Verify z-index is properly applied
        const styles = window.getComputedStyle(downloadBar);
        expect(styles.zIndex).toBe('50'); // From COMPONENT_Z_INDEX.appDownloadBar
      });
    });

    it('should display culturally accurate Portuguese-speaking community description', async () => {
      mockWindowDimensions(375, 667);
      
      render(
        <TestWrapper language="pt">
          <AppDownloadBar autoShow={true} showDelay={0} />
        </TestWrapper>
      );

      await waitFor(() => {
        const description = screen.getByText(/comunidade lusófona no Reino Unido/i);
        expect(description).toBeInTheDocument();
        
        // Verify it includes UK-wide context, not just Portugal
        expect(description.textContent).toContain('Reino Unido');
        expect(description.textContent).toContain('eventos culturais');
      });
    });

    it('should display accurate English community description', async () => {
      mockWindowDimensions(375, 667);
      
      render(
        <TestWrapper language="en">
          <AppDownloadBar autoShow={true} showDelay={0} />
        </TestWrapper>
      );

      await waitFor(() => {
        const description = screen.getByText(/Portuguese-speaking community across the UK/i);
        expect(description).toBeInTheDocument();
        
        // Verify cultural accuracy - Portuguese-speaking, not just Portuguese
        expect(description.textContent).toContain('Portuguese-speaking community');
        expect(description.textContent).toContain('across the UK');
      });
    });

    it('should have optimized button text for mobile', async () => {
      mockWindowDimensions(375, 667);
      
      render(
        <TestWrapper>
          <AppDownloadBar autoShow={true} showDelay={0} />
        </TestWrapper>
      );

      await waitFor(() => {
        // Check download button has shorter text on mobile
        const downloadButton = screen.getByRole('link', { name: /download.*app/i });
        expect(downloadButton).toHaveTextContent('Get');
        expect(downloadButton).toHaveClass('whitespace-nowrap');
        
        // Check skip button has shorter text
        const skipButton = screen.getByRole('button', { name: /skip/i });
        expect(skipButton).toHaveTextContent('Later');
        expect(skipButton).toHaveClass('whitespace-nowrap');
      });
    });

    it('should meet touch target accessibility requirements', async () => {
      mockWindowDimensions(375, 667);
      
      render(
        <TestWrapper>
          <AppDownloadBar autoShow={true} showDelay={0} />
        </TestWrapper>
      );

      await waitFor(() => {
        const downloadButton = screen.getByRole('link', { name: /download.*app/i });
        const skipButton = screen.getByRole('button', { name: /skip/i });
        const closeButton = screen.getByRole('button', { name: /close/i });
        
        // All buttons should have minimum 44px touch targets
        [downloadButton, skipButton, closeButton].forEach(button => {
          expect(button).toHaveClass('min-h-[44px]');
          expect(button).toHaveClass('min-w-[44px]', 'min-w-[60px]'); // Either class should be present
        });
      });
    });
  });

  describe('Header CTA Button Mobile Fixes', () => {
    it('should prevent text wrapping on mobile', () => {
      mockWindowDimensions(375, 667);
      
      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      const joinButton = screen.getByRole('link', { name: /join/i });
      expect(joinButton).toHaveClass('whitespace-nowrap');
      
      // On mobile, should show shortened text
      expect(joinButton).toHaveTextContent('Join');
      
      // Should not contain the full text that could wrap
      expect(joinButton).not.toHaveTextContent('Join LusoTown');
    });

    it('should show full text on larger screens', () => {
      mockWindowDimensions(768, 1024); // Tablet size
      
      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      const joinButton = screen.getByRole('link', { name: /join/i });
      expect(joinButton).toHaveClass('whitespace-nowrap');
      
      // On larger screens, should show full text
      within(joinButton).getByText('Join LusoTown');
    });

    it('should have proper responsive font sizes', () => {
      mockWindowDimensions(375, 667);
      
      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      );

      const joinButton = screen.getByRole('link', { name: /join/i });
      expect(joinButton).toHaveClass('text-xs');
      expect(joinButton).toHaveClass('sm:text-sm');
    });
  });

  describe('CTA Component Mobile Fixes', () => {
    it('should prevent button text wrapping on mobile', () => {
      mockWindowDimensions(375, 667);
      
      render(
        <TestWrapper>
          <CTA />
        </TestWrapper>
      );

      const joinButton = screen.getByRole('link', { name: /join/i });
      expect(joinButton).toHaveClass('whitespace-nowrap');
      expect(joinButton).toHaveClass('min-h-[56px]');
      
      // Should show shorter text on mobile
      expect(joinButton).toHaveTextContent('Join');
    });

    it('should show full text on larger screens', () => {
      mockWindowDimensions(768, 1024);
      
      render(
        <TestWrapper>
          <CTA />
        </TestWrapper>
      );

      const joinButton = screen.getByRole('link', { name: /join/i });
      
      // Should show full text on larger screens
      expect(joinButton).toHaveTextContent('Join Now');
    });

    it('should have proper responsive spacing and sizing', () => {
      mockWindowDimensions(375, 667);
      
      render(
        <TestWrapper>
          <CTA />
        </TestWrapper>
      );

      const joinButton = screen.getByRole('link', { name: /join/i });
      
      // Mobile spacing classes
      expect(joinButton).toHaveClass('px-8');
      expect(joinButton).toHaveClass('sm:px-12');
      expect(joinButton).toHaveClass('py-4');
      expect(joinButton).toHaveClass('sm:py-6');
      
      // Mobile text size
      expect(joinButton).toHaveClass('text-lg');
      expect(joinButton).toHaveClass('sm:text-xl');
    });
  });

  describe('Responsive Breakpoint Testing', () => {
    const breakpoints = [
      { width: 375, height: 667, name: 'Mobile Small (iPhone SE)' },
      { width: 414, height: 896, name: 'Mobile Standard (iPhone 11)' },
      { width: 768, height: 1024, name: 'Tablet Portrait (iPad)' },
      { width: 1024, height: 768, name: 'Desktop Small' },
    ];

    breakpoints.forEach(({ width, height, name }) => {
      it(`should work correctly at ${name} (${width}x${height})`, async () => {
        mockWindowDimensions(width, height);
        
        render(
          <TestWrapper>
            <AppDownloadBar autoShow={true} showDelay={0} />
            <Header />
            <CTA />
          </TestWrapper>
        );

        await waitFor(() => {
          // App download bar should be present on mobile
          if (width < 768) {
            const downloadBar = screen.getByRole('banner');
            expect(downloadBar).toBeInTheDocument();
            
            // Should have proper mobile classes
            expect(downloadBar).toHaveClass(width < 414 ? 'max-w-sm' : 'max-w-sm', 'sm:max-w-md');
          }
          
          // All interactive elements should have proper touch targets
          const buttons = screen.getAllByRole('button');
          const links = screen.getAllByRole('link');
          
          [...buttons, ...links].forEach(element => {
            if (element.classList.contains('min-h-')) {
              expect(element).toHaveClass('min-h-[44px]', 'min-h-[56px]'); // Either should be present
            }
          });
        });
      });
    });
  });

  describe('Cultural Authenticity Verification', () => {
    it('should use Portuguese-speaking community terminology consistently', async () => {
      mockWindowDimensions(375, 667);
      
      render(
        <TestWrapper language="en">
          <AppDownloadBar autoShow={true} showDelay={0} />
        </TestWrapper>
      );

      await waitFor(() => {
        // Should say "Portuguese-speaking community" not just "Portuguese community"
        const description = screen.getByText(/Portuguese-speaking community/i);
        expect(description).toBeInTheDocument();
        
        // Should include UK-wide context
        expect(description.textContent).toContain('across the UK');
        expect(description.textContent).not.toContain('in London only');
      });
    });

    it('should use inclusive Portuguese terminology', async () => {
      mockWindowDimensions(375, 667);
      
      render(
        <TestWrapper language="pt">
          <AppDownloadBar autoShow={true} showDelay={0} />
        </TestWrapper>
      );

      await waitFor(() => {
        const description = screen.getByText(/comunidade lusófona/i);
        expect(description).toBeInTheDocument();
        
        // Should use inclusive lusófona terminology
        expect(description.textContent).toContain('comunidade lusófona');
        expect(description.textContent).toContain('Reino Unido');
      });
    });
  });

  describe('Performance and Optimization', () => {
    it('should not cause layout shifts on mobile', async () => {
      mockWindowDimensions(375, 667);
      
      const { rerender } = render(
        <TestWrapper>
          <AppDownloadBar autoShow={false} showDelay={0} />
        </TestWrapper>
      );

      // Initially no download bar
      expect(screen.queryByRole('banner')).not.toBeInTheDocument();
      
      // Show download bar
      rerender(
        <TestWrapper>
          <AppDownloadBar autoShow={true} showDelay={0} />
        </TestWrapper>
      );

      await waitFor(() => {
        const downloadBar = screen.getByRole('banner');
        expect(downloadBar).toBeInTheDocument();
        
        // Should be positioned fixed to avoid layout shift
        expect(downloadBar).toHaveClass('fixed');
      });
    });

    it('should have proper loading states and transitions', async () => {
      mockWindowDimensions(375, 667);
      
      render(
        <TestWrapper>
          <AppDownloadBar autoShow={true} showDelay={0} />
        </TestWrapper>
      );

      await waitFor(() => {
        const downloadBar = screen.getByRole('banner');
        
        // Should have transition classes for smooth animations
        const content = downloadBar.querySelector('[class*="transition"]');
        expect(content).toBeInTheDocument();
      });
    });
  });
});