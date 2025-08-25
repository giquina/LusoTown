/**
 * Welcome System Integration Tests
 * 
 * Tests the complete welcome popup integration including context,
 * storage, routing, and component interaction.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { LanguageProvider } from '@/context/LanguageContext';
import { WelcomeProvider, useWelcome } from '@/context/WelcomeContext';
import WelcomePopup from '@/components/WelcomePopup';
import WelcomeBanner from '@/components/WelcomeBanner';
import { 
  clearWelcomePreferences,
  shouldShowWelcomePopup,
  markWelcomePopupShown,
  markWelcomeFlowCompleted,
  shouldShowWelcomeBanner
} from '@/utils/welcomeStorage';
import { WELCOME_ANALYTICS_EVENTS } from '@/config/welcome-popup';

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Test wrapper with providers
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <LanguageProvider>
    <WelcomeProvider>
      {children}
    </WelcomeProvider>
  </LanguageProvider>
);

// Test component to access context
const WelcomeTestComponent = () => {
  const welcome = useWelcome();
  return (
    <div>
      <span data-testid="popup-visible">{welcome.isPopupVisible.toString()}</span>
      <span data-testid="banner-visible">{welcome.isBannerVisible.toString()}</span>
      <span data-testid="first-time">{welcome.isFirstTime.toString()}</span>
      <button onClick={welcome.showPopup} data-testid="show-popup">Show Popup</button>
      <button onClick={welcome.skipPopup} data-testid="skip-popup">Skip Popup</button>
      <button onClick={() => welcome.completeWelcomeFlow('PT', ['cultural_events'])} data-testid="complete-flow">
        Complete Flow
      </button>
    </div>
  );
};

describe('Welcome System Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    mockPush.mockClear();
  });

  afterEach(() => {
    // Clear any welcome preferences between tests
    clearWelcomePreferences();
  });

  describe('Context Integration', () => {
    it('should initialize welcome context correctly for first-time users', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      render(<WelcomeTestComponent />, { wrapper: TestWrapper });

      await waitFor(() => {
        expect(screen.getByTestId('first-time')).toHaveTextContent('true');
      });
    });

    it('should show popup for eligible users', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      render(
        <TestWrapper>
          <WelcomeTestComponent />
          <WelcomePopup />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('popup-visible')).toHaveTextContent('true');
      });
    });

    it('should not show popup for users who completed welcome', async () => {
      const completedPrefs = JSON.stringify({
        preferences: {
          completedWelcome: true,
          country: 'PT',
          interests: ['cultural_events'],
          displayCount: 1
        },
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      
      localStorageMock.getItem.mockReturnValue(completedPrefs);

      render(<WelcomeTestComponent />, { wrapper: TestWrapper });

      await waitFor(() => {
        expect(screen.getByTestId('popup-visible')).toHaveTextContent('false');
      });
    });
  });

  describe('Welcome Popup Component Integration', () => {
    it('should handle welcome flow completion', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      render(
        <TestWrapper>
          <WelcomeTestComponent />
          <WelcomePopup />
        </TestWrapper>
      );

      // Wait for popup to show
      await waitFor(() => {
        expect(screen.getByTestId('popup-visible')).toHaveTextContent('true');
      });

      // Complete the welcome flow
      fireEvent.click(screen.getByTestId('complete-flow'));

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('/events'));
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'lusotown_welcome_popup',
          expect.stringContaining('completedWelcome":true')
        );
      });
    });

    it('should handle skip functionality', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      render(
        <TestWrapper>
          <WelcomeTestComponent />
          <WelcomePopup />
        </TestWrapper>
      );

      // Skip the popup
      fireEvent.click(screen.getByTestId('skip-popup'));

      await waitFor(() => {
        expect(screen.getByTestId('popup-visible')).toHaveTextContent('false');
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'lusotown_welcome_popup',
          expect.stringContaining('skippedAt')
        );
      });
    });

    it('should show banner after explore first action', async () => {
      // Simulate user who saw popup but didn't complete
      const incompletePrefs = JSON.stringify({
        preferences: {
          completedWelcome: false,
          displayCount: 1,
          interests: [],
          lastShownAt: Date.now()
        },
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'lusotown_welcome_popup') return incompletePrefs;
        if (key === 'lusotown_welcome_banner_dismissed') return null;
        return null;
      });

      render(
        <TestWrapper>
          <WelcomeTestComponent />
          <WelcomeBanner />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('banner-visible')).toHaveTextContent('true');
      });
    });
  });

  describe('Welcome Banner Component Integration', () => {
    it('should render banner with correct content', async () => {
      const incompletePrefs = JSON.stringify({
        preferences: {
          completedWelcome: false,
          displayCount: 1,
          interests: []
        },
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'lusotown_welcome_popup') return incompletePrefs;
        return null;
      });

      render(<WelcomeBanner />, { wrapper: TestWrapper });

      await waitFor(() => {
        expect(screen.getByText(/New here\?/)).toBeInTheDocument();
        expect(screen.getByText('Quick Tour')).toBeInTheDocument();
        expect(screen.getByText('How it works')).toBeInTheDocument();
      });
    });

    it('should handle banner dismissal', async () => {
      const incompletePrefs = JSON.stringify({
        preferences: {
          completedWelcome: false,
          displayCount: 1,
          interests: []
        },
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'lusotown_welcome_popup') return incompletePrefs;
        return null;
      });

      render(<WelcomeBanner />, { wrapper: TestWrapper });

      const dismissButton = await screen.findByLabelText(/dismiss/i);
      fireEvent.click(dismissButton);

      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'lusotown_welcome_banner_dismissed',
          'true'
        );
      });
    });
  });

  describe('Storage Integration', () => {
    it('should correctly determine when to show popup', () => {
      // First time user
      localStorageMock.getItem.mockReturnValue(null);
      expect(shouldShowWelcomePopup()).toBe(true);

      // Completed user
      const completedPrefs = JSON.stringify({
        preferences: { completedWelcome: true },
        version: 1
      });
      localStorageMock.getItem.mockReturnValue(completedPrefs);
      expect(shouldShowWelcomePopup()).toBe(false);
    });

    it('should correctly determine when to show banner', () => {
      // User who hasn't interacted with popup
      localStorageMock.getItem.mockReturnValue(null);
      expect(shouldShowWelcomeBanner()).toBe(false);

      // User who saw popup but didn't complete
      const incompletePrefs = JSON.stringify({
        preferences: {
          completedWelcome: false,
          displayCount: 1
        },
        version: 1
      });
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'lusotown_welcome_popup') return incompletePrefs;
        if (key === 'lusotown_welcome_banner_dismissed') return null;
        return null;
      });
      expect(shouldShowWelcomeBanner()).toBe(true);
    });

    it('should handle welcome flow completion correctly', () => {
      localStorageMock.getItem.mockReturnValue(null);
      
      markWelcomeFlowCompleted('PT', ['cultural_events']);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'lusotown_welcome_popup',
        expect.stringContaining('"completedWelcome":true')
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'lusotown_welcome_popup',
        expect.stringContaining('"country":"PT"')
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'lusotown_welcome_popup',
        expect.stringContaining('"interests":["cultural_events"]')
      );
    });
  });

  describe('Analytics Integration', () => {
    let mockGtag: jest.Mock;

    beforeEach(() => {
      mockGtag = jest.fn();
      (window as any).gtag = mockGtag;
    });

    afterEach(() => {
      delete (window as any).gtag;
    });

    it('should track popup shown event', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      render(<WelcomeTestComponent />, { wrapper: TestWrapper });

      // Manually trigger popup show to test analytics
      fireEvent.click(screen.getByTestId('show-popup'));

      await waitFor(() => {
        expect(mockGtag).toHaveBeenCalledWith('event', WELCOME_ANALYTICS_EVENTS.POPUP_SHOWN, {
          event_category: 'welcome_flow',
          manual: true,
          displayCount: expect.any(Number)
        });
      });
    });

    it('should track welcome flow completion', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      render(<WelcomeTestComponent />, { wrapper: TestWrapper });

      fireEvent.click(screen.getByTestId('complete-flow'));

      await waitFor(() => {
        expect(mockGtag).toHaveBeenCalledWith('event', WELCOME_ANALYTICS_EVENTS.FLOW_COMPLETED, {
          event_category: 'welcome_flow',
          country: 'PT',
          interests: ['cultural_events'],
          interestCount: 1
        });
      });
    });
  });

  describe('Routing Integration', () => {
    it('should navigate to correct route after completion', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      render(<WelcomeTestComponent />, { wrapper: TestWrapper });

      fireEvent.click(screen.getByTestId('complete-flow'));

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('/events'));
      });
    });

    it('should include country filter in route when applicable', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      render(<WelcomeTestComponent />, { wrapper: TestWrapper });

      fireEvent.click(screen.getByTestId('complete-flow'));

      await waitFor(() => {
        const calledUrl = mockPush.mock.calls[0][0];
        expect(calledUrl).toContain('country=portugal');
      });
    });
  });
});