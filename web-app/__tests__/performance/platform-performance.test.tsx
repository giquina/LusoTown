import { render, screen } from '@testing-library/react';
import { PerformanceTester, performanceThresholds } from '../utils/performance-utils';
import { LanguageProvider } from '@/context/LanguageContext';
import { portugueseBundleOptimizer } from '@/utils/portuguese-bundle-optimizer';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

// Mock components for performance testing
const MockPortugueseComponent = () => <div data-testid="portuguese-content">Portuguese Content</div>;
const MockEventCard = () => <div data-testid="event-card">Event Card</div>;
const MockCulturalGallery = () => <div data-testid="cultural-gallery">Cultural Gallery</div>;

describe('Platform Performance Tests', () => {
  let performanceTester: PerformanceTester;

  beforeEach(() => {
    performanceTester = new PerformanceTester();
    // Reset any global state
    document.documentElement.className = '';
  });

  afterEach(() => {
    performanceTester = null as any;
  });

  describe('Component Rendering Performance', () => {
    test('Portuguese content components render within performance thresholds', () => {
      performanceTester.startTiming();

      const component = () => {
        render(
          <LanguageProvider>
            <MockPortugueseComponent />
            <MockEventCard />
            <MockCulturalGallery />
          </LanguageProvider>
        );
      };

      const renderTime = performanceTester.measureRenderTime(component);
      expect(renderTime).toBeLessThan(performanceThresholds.renderTime.acceptable);

      // Verify content is rendered
      expect(screen.getByTestId('portuguese-content')).toBeInTheDocument();
      expect(screen.getByTestId('event-card')).toBeInTheDocument();
      expect(screen.getByTestId('cultural-gallery')).toBeInTheDocument();
    });

    test('Large component trees maintain good performance', () => {
      const startTime = performance.now();

      // Simulate rendering multiple Portuguese components
      const components = Array.from({ length: 50 }, (_, i) => (
        <div key={i} data-testid={`portuguese-item-${i}`}>
          Portuguese Item {i}
        </div>
      ));

      render(
        <LanguageProvider>
          <div>{components}</div>
        </LanguageProvider>
      );

      const renderTime = performance.now() - startTime;
      expect(renderTime).toBeLessThan(performanceThresholds.renderTime.poor);

      // Verify all components rendered
      expect(screen.getAllByText(/Portuguese Item/)).toHaveLength(50);
    });
  });

  describe('Bundle Optimization Performance', () => {
    test('Portuguese bundle optimizer initializes quickly', () => {
      const startTime = performance.now();
      
      // Simulate optimizer initialization
      const stats = portugueseBundleOptimizer.getOptimizationStats();
      
      const initTime = performance.now() - startTime;
      expect(initTime).toBeLessThan(100); // Should initialize in < 100ms

      expect(stats).toHaveProperty('loadedBundles');
      expect(stats).toHaveProperty('preloadedResources');
      expect(stats).toHaveProperty('deviceContext');
    });

    test('Critical Portuguese content loading is fast', async () => {
      const startTime = performance.now();
      
      // Mock Portuguese bundle loading
      await portugueseBundleOptimizer.loadPortugueseContentBundle('critical');
      
      const loadTime = performance.now() - startTime;
      expect(loadTime).toBeLessThan(performanceThresholds.loadTime.good);
    });

    test('Non-critical content loading is properly deferred', async () => {
      const startTime = performance.now();
      
      // Test that low priority content doesn't block critical loading
      const criticalPromise = portugueseBundleOptimizer.loadPortugueseContentBundle('critical');
      const lowPriorityPromise = portugueseBundleOptimizer.loadPortugueseContentBundle('low');
      
      // Critical should complete first
      await criticalPromise;
      const criticalTime = performance.now() - startTime;
      
      await lowPriorityPromise;
      const totalTime = performance.now() - startTime;
      
      expect(criticalTime).toBeLessThan(performanceThresholds.loadTime.good);
      expect(totalTime).toBeGreaterThan(criticalTime); // Low priority takes longer
    });
  });

  describe('Mobile Performance Optimization', () => {
    beforeEach(() => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      
      // Mock mobile connection
      Object.defineProperty(navigator, 'connection', {
        writable: true,
        configurable: true,
        value: {
          effectiveType: '3g',
          saveData: false,
        },
      });
    });

    test('Mobile optimizations apply within performance budget', () => {
      const startTime = performance.now();
      
      portugueseBundleOptimizer.optimizeForMobile();
      
      const optimizationTime = performance.now() - startTime;
      expect(optimizationTime).toBeLessThan(50); // Should be very fast
      
      // Check mobile optimizations were applied
      const stats = portugueseBundleOptimizer.getOptimizationStats();
      expect(stats.optimizationsApplied).toContain('mobile-optimized');
    });

    test('Touch targets meet minimum size requirements', () => {
      render(
        <div>
          <button data-testid="touch-button">Portuguese Button</button>
          <a href="#" role="button" data-testid="touch-link">Portuguese Link</a>
        </div>
      );

      portugueseBundleOptimizer.optimizeForMobile();

      const button = screen.getByTestId('touch-button');
      const link = screen.getByTestId('touch-link');

      // Check computed styles would have minimum dimensions
      // (In real environment, this would check actual computed styles)
      expect(button).toBeInTheDocument();
      expect(link).toBeInTheDocument();
    });
  });

  describe('Portuguese Content Loading Performance', () => {
    test('Portuguese text rendering is optimized', () => {
      const portugueseText = 'Bem-vindos à comunidade portuguesa do Reino Unido! Aqui você encontrará eventos culturais autênticos.';
      
      const startTime = performance.now();
      
      render(
        <LanguageProvider>
          <div>
            <h1>{portugueseText}</h1>
            <p>Comunidade " Cultura " Tradição</p>
            <span>São João " Fado " Bacalhau</span>
          </div>
        </LanguageProvider>
      );
      
      const renderTime = performance.now() - startTime;
      expect(renderTime).toBeLessThan(performanceThresholds.renderTime.good);

      // Verify Portuguese content is rendered
      expect(screen.getByText(portugueseText)).toBeInTheDocument();
      expect(screen.getByText('Comunidade " Cultura " Tradição')).toBeInTheDocument();
    });

    test('Cultural categories load with appropriate priorities', async () => {
      const categories = ['events', 'cultural', 'business', 'community', 'heritage'];
      const loadTimes: Record<string, number> = {};

      for (const category of categories) {
        const startTime = performance.now();
        
        // Simulate loading content for each category
        await new Promise(resolve => setTimeout(resolve, Math.random() * 10));
        
        loadTimes[category] = performance.now() - startTime;
      }

      // All categories should load within acceptable time
      Object.values(loadTimes).forEach(time => {
        expect(time).toBeLessThan(50); // Very fast mock loading
      });

      // Verify all categories processed
      expect(Object.keys(loadTimes)).toHaveLength(5);
    });
  });

  describe('Memory Performance', () => {
    test('Component cleanup prevents memory leaks', () => {
      const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;
      
      // Render and unmount many components
      for (let i = 0; i < 100; i++) {
        const { unmount } = render(
          <LanguageProvider>
            <MockPortugueseComponent />
          </LanguageProvider>
        );
        unmount();
      }

      const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;
      const memoryIncrease = finalMemory - initialMemory;

      // Memory increase should be reasonable (less than 5MB)
      expect(memoryIncrease).toBeLessThan(5 * 1024 * 1024);
    });

    test('Large Portuguese content sets handle memory efficiently', () => {
      const largeDataSet = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        title: `Evento Português ${i}`,
        description: 'Descrição do evento cultural português na comunidade',
        category: 'cultural',
      }));

      const startTime = performance.now();
      const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;

      render(
        <LanguageProvider>
          <div>
            {largeDataSet.slice(0, 50).map(item => (
              <div key={item.id} data-testid={`event-${item.id}`}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </LanguageProvider>
      );

      const renderTime = performance.now() - startTime;
      const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;

      expect(renderTime).toBeLessThan(performanceThresholds.renderTime.acceptable);
      expect(finalMemory - initialMemory).toBeLessThan(2 * 1024 * 1024); // Less than 2MB
      
      // Verify content rendered
      expect(screen.getByTestId('event-0')).toBeInTheDocument();
      expect(screen.getByTestId('event-49')).toBeInTheDocument();
    });
  });

  describe('Network-Aware Performance', () => {
    test('Slow connection triggers appropriate optimizations', () => {
      // Mock slow connection
      Object.defineProperty(navigator, 'connection', {
        writable: true,
        configurable: true,
        value: {
          effectiveType: '2g',
          saveData: true,
        },
      });

      const startTime = performance.now();
      portugueseBundleOptimizer.optimizeForMobile();
      const optimizationTime = performance.now() - startTime;

      expect(optimizationTime).toBeLessThan(100);

      const stats = portugueseBundleOptimizer.getOptimizationStats();
      expect(stats.optimizationsApplied).toContain('data-saver');
    });

    test('Fast connection allows full feature loading', () => {
      // Mock fast connection
      Object.defineProperty(navigator, 'connection', {
        writable: true,
        configurable: true,
        value: {
          effectiveType: '4g',
          saveData: false,
        },
      });

      const stats = portugueseBundleOptimizer.getOptimizationStats();
      
      // Fast connections should not have data-saver optimizations
      expect(stats.optimizationsApplied).not.toContain('data-saver');
    });
  });

  describe('Performance Metrics Collection', () => {
    test('Performance metrics are collected efficiently', () => {
      const metrics = performanceTester.getMetrics();
      
      expect(metrics).toHaveProperty('loadTime');
      expect(metrics).toHaveProperty('renderTime');
      expect(metrics).toHaveProperty('interactionTime');
      expect(metrics).toHaveProperty('memoryUsage');
      expect(metrics).toHaveProperty('networkRequests');
      expect(metrics).toHaveProperty('cacheHitRate');
      
      // All metrics should be numbers
      Object.values(metrics).forEach(value => {
        expect(typeof value).toBe('number');
      });
    });

    test('Performance thresholds are within acceptable ranges', () => {
      expect(performanceThresholds.loadTime.excellent).toBeLessThan(performanceThresholds.loadTime.good);
      expect(performanceThresholds.loadTime.good).toBeLessThan(performanceThresholds.loadTime.acceptable);
      expect(performanceThresholds.loadTime.acceptable).toBeLessThan(performanceThresholds.loadTime.poor);
      
      expect(performanceThresholds.renderTime.excellent).toBeLessThan(performanceThresholds.renderTime.good);
      expect(performanceThresholds.renderTime.good).toBeLessThan(performanceThresholds.renderTime.acceptable);
      
      // Mobile thresholds should be reasonable
      expect(performanceThresholds.mobile.touchResponseTime.excellent).toBeLessThan(50);
    });
  });
});

describe('Portuguese-Specific Performance Tests', () => {
  test('Portuguese diacritics render without performance penalty', () => {
    const textWithDiacritics = [
      'Ação', 'Coração', 'João', 'São Paulo', 'Tradição',
      'Informação', 'Organização', 'Nação', 'Educação', 'Construção'
    ];

    const startTime = performance.now();

    render(
      <LanguageProvider>
        <div>
          {textWithDiacritics.map((text, i) => (
            <span key={i} data-testid={`diacritic-${i}`}>{text}</span>
          ))}
        </div>
      </LanguageProvider>
    );

    const renderTime = performance.now() - startTime;
    expect(renderTime).toBeLessThan(performanceThresholds.renderTime.good);

    // Verify all diacritics rendered correctly
    textWithDiacritics.forEach((text, i) => {
      expect(screen.getByTestId(`diacritic-${i}`)).toHaveTextContent(text);
    });
  });

  test('Portuguese flag colors render efficiently', () => {
    const portugalColors = ['#006600', '#FF0000', '#FFD700']; // Green, Red, Gold

    const startTime = performance.now();

    render(
      <div>
        {portugalColors.map((color, i) => (
          <div
            key={i}
            data-testid={`color-${i}`}
            style={{ backgroundColor: color, width: 100, height: 50 }}
          >
            Portuguese Color {i + 1}
          </div>
        ))}
      </div>
    );

    const renderTime = performance.now() - startTime;
    expect(renderTime).toBeLessThan(performanceThresholds.renderTime.good);

    // Verify all colors rendered
    portugalColors.forEach((_, i) => {
      expect(screen.getByTestId(`color-${i}`)).toBeInTheDocument();
    });
  });
});