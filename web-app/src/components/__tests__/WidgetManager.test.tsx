import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { WidgetManager, useWidgetManager, useWidget } from '../WidgetManager';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = mockLocalStorage as any;

// Mock sessionStorage
const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.sessionStorage = mockSessionStorage as any;

// Mock custom events
const mockDispatchEvent = jest.fn();
global.window.addEventListener = jest.fn();
global.window.removeEventListener = jest.fn();
global.window.dispatchEvent = mockDispatchEvent;

// Test component to use the context
function TestWidget({ type, id }: { type: 'chat' | 'notification' | 'fab'; id: string }) {
  const { isAppBarVisible, classes, zIndex, bottomOffset } = useWidget(id, type);
  
  return (
    <div data-testid={`widget-${id}`}>
      <div data-testid="app-bar-visible">{isAppBarVisible ? 'visible' : 'hidden'}</div>
      <div data-testid="classes">{classes}</div>
      <div data-testid="z-index">{zIndex}</div>
      <div data-testid="bottom-offset">{bottomOffset}</div>
    </div>
  );
}

function TestManagerActions() {
  const { setAppBarVisible, registerWidget, unregisterWidget } = useWidgetManager();
  
  return (
    <div>
      <button 
        data-testid="show-app-bar" 
        onClick={() => setAppBarVisible(true)}
      >
        Show App Bar
      </button>
      <button 
        data-testid="hide-app-bar" 
        onClick={() => setAppBarVisible(false)}
      >
        Hide App Bar
      </button>
      <button 
        data-testid="register-widget" 
        onClick={() => registerWidget('test-widget', 'chat')}
      >
        Register Widget
      </button>
      <button 
        data-testid="unregister-widget" 
        onClick={() => unregisterWidget('test-widget')}
      >
        Unregister Widget
      </button>
    </div>
  );
}

describe('WidgetManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
    mockSessionStorage.getItem.mockReturnValue(null);
  });

  it('renders children correctly', () => {
    render(
      <WidgetManager>
        <div data-testid="child">Test Child</div>
      </WidgetManager>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('provides correct initial app bar state', () => {
    render(
      <WidgetManager>
        <TestWidget type="chat" id="test-chat" />
      </WidgetManager>
    );

    expect(screen.getByTestId('app-bar-visible')).toHaveTextContent('hidden');
  });

  it('manages app bar visibility correctly', () => {
    render(
      <WidgetManager>
        <TestManagerActions />
        <TestWidget type="chat" id="test-chat" />
      </WidgetManager>
    );

    // Initially app bar should be hidden
    expect(screen.getByTestId('app-bar-visible')).toHaveTextContent('hidden');

    // Show app bar
    fireEvent.click(screen.getByTestId('show-app-bar'));
    expect(screen.getByTestId('app-bar-visible')).toHaveTextContent('visible');

    // Hide app bar
    fireEvent.click(screen.getByTestId('hide-app-bar'));
    expect(screen.getByTestId('app-bar-visible')).toHaveTextContent('hidden');
  });

  it('provides correct z-index values', () => {
    render(
      <WidgetManager>
        <TestWidget type="chat" id="test-chat" />
        <TestWidget type="notification" id="test-notification" />
        <TestWidget type="fab" id="test-fab" />
      </WidgetManager>
    );

    // Chat widget should have highest z-index (70)
    expect(screen.getByTestId('widget-test-chat').querySelector('[data-testid="z-index"]'))
      .toHaveTextContent('70');

    // FAB should be 65
    expect(screen.getByTestId('widget-test-fab').querySelector('[data-testid="z-index"]'))
      .toHaveTextContent('65');

    // Notification should be 60
    expect(screen.getByTestId('widget-test-notification').querySelector('[data-testid="z-index"]'))
      .toHaveTextContent('60');
  });

  it('adjusts positioning when app bar is visible', () => {
    render(
      <WidgetManager>
        <TestManagerActions />
        <TestWidget type="chat" id="test-chat" />
      </WidgetManager>
    );

    const chatWidget = screen.getByTestId('widget-test-chat');

    // Initially with app bar hidden - should have bottom-24
    expect(chatWidget.querySelector('[data-testid="classes"]'))
      .toHaveTextContent('fixed transition-all duration-300 bottom-24 md:bottom-6 right-4 z-[70]');

    // Show app bar
    fireEvent.click(screen.getByTestId('show-app-bar'));

    // With app bar visible - should have bottom-40
    expect(chatWidget.querySelector('[data-testid="classes"]'))
      .toHaveTextContent('fixed transition-all duration-300 bottom-40 md:bottom-6 right-4 z-[70]');
  });

  it('provides correct bottom offset values', () => {
    render(
      <WidgetManager>
        <TestManagerActions />
        <TestWidget type="chat" id="test-chat" />
      </WidgetManager>
    );

    const chatWidget = screen.getByTestId('widget-test-chat');

    // Initially with app bar hidden
    expect(chatWidget.querySelector('[data-testid="bottom-offset"]'))
      .toHaveTextContent('6rem');

    // Show app bar
    fireEvent.click(screen.getByTestId('show-app-bar'));

    // With app bar visible - should increase offset
    expect(chatWidget.querySelector('[data-testid="bottom-offset"]'))
      .toHaveTextContent('10rem');
  });

  it('manages widget registration', () => {
    render(
      <WidgetManager>
        <TestManagerActions />
      </WidgetManager>
    );

    // Register a widget
    fireEvent.click(screen.getByTestId('register-widget'));
    
    // Unregister a widget
    fireEvent.click(screen.getByTestId('unregister-widget'));
    
    // No errors should occur
    expect(mockDispatchEvent).not.toHaveBeenCalled();
  });

  it('handles localStorage app bar state correctly', () => {
    // Mock app bar as dismissed
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === 'lusotown_app_download_bar_dismissed') return 'true';
      return null;
    });

    render(
      <WidgetManager>
        <TestWidget type="chat" id="test-chat" />
      </WidgetManager>
    );

    // App bar should be hidden when dismissed in localStorage
    expect(screen.getByTestId('app-bar-visible')).toHaveTextContent('hidden');
  });

  it('handles sessionStorage app bar state correctly', () => {
    // Mock app bar as shown in session but not dismissed permanently
    mockSessionStorage.getItem.mockImplementation((key) => {
      if (key === 'lusotown_app_download_shown') return 'true';
      return null;
    });
    mockLocalStorage.getItem.mockReturnValue(null); // Not dismissed permanently

    render(
      <WidgetManager>
        <TestWidget type="chat" id="test-chat" />
      </WidgetManager>
    );

    // App bar should be visible when shown in session and not dismissed permanently
    expect(screen.getByTestId('app-bar-visible')).toHaveTextContent('visible');
  });

  it('shows development debug info in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(
      <WidgetManager>
        <div>Test content</div>
      </WidgetManager>
    );

    // Should show debug info in development
    expect(screen.getByText('App Bar:')).toBeInTheDocument();
    expect(screen.getByText('Z-Index Hierarchy:')).toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  it('hides debug info in production mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    render(
      <WidgetManager>
        <div>Test content</div>
      </WidgetManager>
    );

    // Should not show debug info in production
    expect(screen.queryByText('App Bar:')).not.toBeInTheDocument();
    expect(screen.queryByText('Z-Index Hierarchy:')).not.toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });
});

describe('useWidget hook', () => {
  it('throws error when used outside WidgetManager', () => {
    const TestComponent = () => {
      useWidget('test', 'chat');
      return <div>Test</div>;
    };

    // Wrap in error boundary to catch the error
    const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
      try {
        return <>{children}</>;
      } catch (error) {
        return <div>Error caught</div>;
      }
    };

    expect(() => {
      render(
        <ErrorBoundary>
          <TestComponent />
        </ErrorBoundary>
      );
    }).toThrow('useWidgetManager must be used within a WidgetManager');
  });
});