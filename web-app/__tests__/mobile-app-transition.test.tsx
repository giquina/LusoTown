/**
 * Mobile App Transition Tests
 * 
 * Tests for Phase 1 implementation of mobile app transition strategy,
 * including device detection, app download prompts, and PWA functionality
 * for the Portuguese-speaking community.
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { jest } from '@jest/globals';
import { MobileDeviceDetector, getDeviceInfo, checkAppInstallation } from '@/lib/mobile-detection';
import MobileRedirectProvider, { MobileDownloadPrompt, useMobileRedirect } from '@/components/MobileRedirectProvider';
import AppDownloadLanding from '@/components/AppDownloadLanding';
import { LanguageProvider } from '@/context/LanguageContext';
import { MOBILE_APP_CONFIG } from '@/config/mobile-app';

// Mock Next.js dynamic imports
jest.mock('next/dynamic', () => (fn: any) => fn());

// Mock user agent for different devices
const mockUserAgent = (userAgent: string) => {
  Object.defineProperty(navigator, 'userAgent', {
    value: userAgent,
    configurable: true,
  });
};

// Mock localStorage
const mockLocalStorage = () => {
  const storage: Record<string, string> = {};
  return {
    getItem: (key: string) => storage[key] || null,
    setItem: (key: string, value: string) => {
      storage[key] = value;
    },
    removeItem: (key: string) => {
      delete storage[key];
    },
    clear: () => {
      Object.keys(storage).forEach(key => delete storage[key]);
    }
  };
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage(),
});

// Mock window properties
Object.defineProperty(window, 'innerWidth', {
  value: 375,
  configurable: true,
});

Object.defineProperty(window, 'innerHeight', {
  value: 667,
  configurable: true,
});

// Test component for using mobile redirect context
function TestComponent() {
  const {
    deviceInfo,
    showDownloadPrompt,
    showLandingPage,
    triggerAppDownload,
    dismissPrompt
  } = useMobileRedirect();

  return (
    <div>
      <div data-testid="device-type">
        {deviceInfo?.isMobile ? 'mobile' : deviceInfo?.isTablet ? 'tablet' : 'desktop'}
      </div>
      <div data-testid="show-prompt">{showDownloadPrompt ? 'true' : 'false'}</div>
      <div data-testid="show-landing">{showLandingPage ? 'true' : 'false'}</div>
      <button onClick={() => triggerAppDownload()} data-testid="download-btn">
        Download App
      </button>
      <button onClick={dismissPrompt} data-testid="dismiss-btn">
        Dismiss
      </button>
    </div>
  );
}

describe('MobileDeviceDetector', () => {
  let detector: MobileDeviceDetector;

  beforeEach(() => {
    detector = MobileDeviceDetector.getInstance();
    detector.resetCache();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Device Detection', () => {
    test('detects iOS mobile devices', () => {
      mockUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15');
      
      const deviceInfo = detector.getDeviceInfo();
      
      expect(deviceInfo.isMobile).toBe(true);
      expect(deviceInfo.isIOS).toBe(true);
      expect(deviceInfo.isAndroid).toBe(false);
      expect(deviceInfo.isDesktop).toBe(false);
    });

    test('detects Android mobile devices', () => {
      mockUserAgent('Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36');
      
      const deviceInfo = detector.getDeviceInfo();
      
      expect(deviceInfo.isMobile).toBe(true);
      expect(deviceInfo.isAndroid).toBe(true);
      expect(deviceInfo.isIOS).toBe(false);
      expect(deviceInfo.isDesktop).toBe(false);
    });

    test('detects desktop devices', () => {
      mockUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
      Object.defineProperty(window, 'innerWidth', { value: 1024 });
      
      const deviceInfo = detector.getDeviceInfo();
      
      expect(deviceInfo.isDesktop).toBe(true);
      expect(deviceInfo.isMobile).toBe(false);
      expect(deviceInfo.isTablet).toBe(false);
    });

    test('detects tablet devices', () => {
      mockUserAgent('Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15');
      Object.defineProperty(window, 'innerWidth', { value: 768 });
      
      const deviceInfo = detector.getDeviceInfo();
      
      expect(deviceInfo.isTablet).toBe(true);
      expect(deviceInfo.isMobile).toBe(false);
      expect(deviceInfo.isDesktop).toBe(false);
    });
  });

  describe('App Store URLs', () => {
    test('returns iOS App Store URL for iOS devices', () => {
      mockUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)');
      
      const url = detector.getAppStoreUrl();
      
      expect(url).toBe(MOBILE_APP_CONFIG.stores.ios.url);
    });

    test('returns Google Play Store URL for Android devices', () => {
      mockUserAgent('Mozilla/5.0 (Linux; Android 11; SM-G991B)');
      
      const url = detector.getAppStoreUrl();
      
      expect(url).toBe(MOBILE_APP_CONFIG.stores.android.url);
    });
  });

  describe('Download Choice Tracking', () => {
    test('tracks user download choice', () => {
      mockUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)');
      
      detector.trackDownloadChoice('download_app', 'ios');
      
      const choice = detector.getPreviousDownloadChoice();
      expect(choice).toBeTruthy();
      expect(choice?.choice).toBe('download_app');
      expect(choice?.platform).toBe('ios');
    });

    test('respects user choice to continue with web', () => {
      detector.trackDownloadChoice('continue_web');
      
      const shouldShow = detector.shouldShowDownloadPrompt();
      
      expect(shouldShow).toBe(false);
    });

    test('does not show prompt on desktop', () => {
      mockUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
      Object.defineProperty(window, 'innerWidth', { value: 1024 });
      
      const shouldShow = detector.shouldShowDownloadPrompt();
      
      expect(shouldShow).toBe(false);
    });
  });
});

describe('MobileRedirectProvider', () => {
  const renderWithLanguageProvider = (component: React.ReactNode) => {
    return render(
      <LanguageProvider>
        <MobileRedirectProvider>
          {component}
        </MobileRedirectProvider>
      </LanguageProvider>
    );
  };

  beforeEach(() => {
    mockUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)');
    Object.defineProperty(window, 'innerWidth', { value: 375 });
    localStorage.clear();
  });

  test('provides mobile redirect context', async () => {
    renderWithLanguageProvider(<TestComponent />);
    
    await waitFor(() => {
      expect(screen.getByTestId('device-type')).toHaveTextContent('mobile');
    });
  });

  test('tracks download attempts', async () => {
    const mockOpen = jest.spyOn(window, 'open').mockImplementation(() => null);
    
    renderWithLanguageProvider(<TestComponent />);
    
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('download-btn'));
    });
    
    expect(mockOpen).toHaveBeenCalledWith(
      MOBILE_APP_CONFIG.stores.ios.url,
      '_blank'
    );
    
    mockOpen.mockRestore();
  });

  test('dismisses prompts correctly', async () => {
    renderWithLanguageProvider(<TestComponent />);
    
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('dismiss-btn'));
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('show-prompt')).toHaveTextContent('false');
      expect(screen.getByTestId('show-landing')).toHaveTextContent('false');
    });
  });
});

describe('MobileDownloadPrompt', () => {
  const renderPrompt = (forceShow = true) => {
    return render(
      <LanguageProvider>
        <MobileRedirectProvider forceShow={forceShow}>
          <MobileDownloadPrompt />
        </MobileRedirectProvider>
      </LanguageProvider>
    );
  };

  beforeEach(() => {
    mockUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)');
    Object.defineProperty(window, 'innerWidth', { value: 375 });
  });

  test('renders download prompt for mobile users', async () => {
    renderPrompt();
    
    await waitFor(() => {
      expect(screen.getByText('Get the LusoTown App')).toBeInTheDocument();
      expect(screen.getByText('Better experience for Portuguese community')).toBeInTheDocument();
    });
  });

  test('shows appropriate download button', async () => {
    renderPrompt();
    
    await waitFor(() => {
      expect(screen.getByText('Get App')).toBeInTheDocument();
    });
  });

  test('includes dismiss option', async () => {
    renderPrompt();
    
    await waitFor(() => {
      expect(screen.getByText('Not now')).toBeInTheDocument();
    });
  });
});

describe('AppDownloadLanding', () => {
  const renderLanding = () => {
    return render(
      <LanguageProvider>
        <MobileRedirectProvider forceShow={true}>
          <AppDownloadLanding />
        </MobileRedirectProvider>
      </LanguageProvider>
    );
  };

  beforeEach(() => {
    mockUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)');
    Object.defineProperty(window, 'innerWidth', { value: 375 });
  });

  test('renders full landing page content', async () => {
    renderLanding();
    
    await waitFor(() => {
      // Check hero content
      expect(screen.getByText(/Get the LusoTown App/)).toBeInTheDocument();
      expect(screen.getByText(/Join 2,750\+ Portuguese speakers/)).toBeInTheDocument();
    });
  });

  test('displays community statistics', async () => {
    renderLanding();
    
    await waitFor(() => {
      expect(screen.getByText('2,750+')).toBeInTheDocument();
      expect(screen.getByText('Portuguese Speakers')).toBeInTheDocument();
      expect(screen.getByText('450+')).toBeInTheDocument();
      expect(screen.getByText('Cultural Events')).toBeInTheDocument();
    });
  });

  test('shows Portuguese cultural elements', async () => {
    renderLanding();
    
    await waitFor(() => {
      // Check for Portuguese cultural flags/emojis in the background
      const culturalElements = document.querySelectorAll('[style*="🇵🇹"], [style*="🇧🇷"]');
      expect(culturalElements.length).toBeGreaterThan(0);
    });
  });

  test('includes app store download buttons', async () => {
    renderLanding();
    
    await waitFor(() => {
      // Should show iOS App Store button for iPhone
      expect(screen.getByText('App Store')).toBeInTheDocument();
    });
  });

  test('displays testimonials from Portuguese community', async () => {
    renderLanding();
    
    await waitFor(() => {
      expect(screen.getByText('What Our Community Says')).toBeInTheDocument();
      // Should have testimonial content
      const testimonials = screen.getByText(/Manchester|London|Edinburgh/);
      expect(testimonials).toBeInTheDocument();
    });
  });

  test('shows trust signals', async () => {
    renderLanding();
    
    await waitFor(() => {
      expect(screen.getByText('Trusted by the Portuguese Community')).toBeInTheDocument();
      expect(screen.getByText('8 University Partnerships')).toBeInTheDocument();
      expect(screen.getByText('180+ Portuguese Business Partners')).toBeInTheDocument();
    });
  });
});

describe('Portuguese Language Support', () => {
  const renderWithPortuguese = () => {
    return render(
      <LanguageProvider defaultLanguage="pt">
        <MobileRedirectProvider forceShow={true}>
          <AppDownloadLanding />
        </MobileRedirectProvider>
      </LanguageProvider>
    );
  };

  test('displays Portuguese text when language is set to Portuguese', async () => {
    renderWithPortuguese();
    
    await waitFor(() => {
      expect(screen.getByText(/Baixe o App LusoTown/)).toBeInTheDocument();
      expect(screen.getByText(/Falantes de Português/)).toBeInTheDocument();
    });
  });
});

describe('Mobile App Configuration', () => {
  test('has correct app store URLs', () => {
    expect(MOBILE_APP_CONFIG.stores.ios.url).toBe('https://apps.apple.com/app/lusotown/id123456789');
    expect(MOBILE_APP_CONFIG.stores.android.url).toBe('https://play.google.com/store/apps/details?id=com.lusotown.android');
  });

  test('includes Portuguese cultural features', () => {
    expect(MOBILE_APP_CONFIG.features).toHaveLength(6);
    
    const eventsFeature = MOBILE_APP_CONFIG.features.find(f => f.id === 'events_discovery');
    expect(eventsFeature).toBeDefined();
    expect(eventsFeature?.title.en).toBe('Discover Portuguese Events');
    expect(eventsFeature?.title.pt).toBe('Descubra Eventos Portugueses');
  });

  test('includes community statistics', () => {
    expect(MOBILE_APP_CONFIG.stats.totalMembers).toBe(2750);
    expect(MOBILE_APP_CONFIG.stats.portugueseEvents).toBe(450);
    expect(MOBILE_APP_CONFIG.stats.universityPartners).toBe(8);
  });

  test('has A/B testing configuration', () => {
    expect(MOBILE_APP_CONFIG.testing.enabled).toBe(true);
    expect(MOBILE_APP_CONFIG.testing.variants).toHaveLength(2);
  });
});

describe('Integration Tests', () => {
  test('full mobile app transition flow', async () => {
    // Mock iPhone user agent
    mockUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)');
    
    // Start with no previous choice
    localStorage.clear();
    
    render(
      <LanguageProvider>
        <MobileRedirectProvider forceShow={true}>
          <TestComponent />
          <MobileDownloadPrompt />
          <AppDownloadLanding />
        </MobileRedirectProvider>
      </LanguageProvider>
    );
    
    // Should detect mobile device
    await waitFor(() => {
      expect(screen.getByTestId('device-type')).toHaveTextContent('mobile');
    });
    
    // Should show prompts for new users
    await waitFor(() => {
      expect(screen.getByText('Get the LusoTown App')).toBeInTheDocument();
    });
  });
});

// Mock analytics tracking
describe('Analytics Tracking', () => {
  beforeEach(() => {
    (window as any).gtag = jest.fn();
  });

  test('tracks download attempts', () => {
    mockUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)');
    
    const detector = MobileDeviceDetector.getInstance();
    detector.trackDownloadChoice('download_app', 'ios');
    
    // Should have stored the choice
    const choice = detector.getPreviousDownloadChoice();
    expect(choice?.choice).toBe('download_app');
    expect(choice?.platform).toBe('ios');
  });
});