'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface WidgetTestResult {
  widgetName: string;
  screenSize: string;
  zIndex: number;
  position: string;
  isVisible: boolean;
  hasOverlap: boolean;
  touchAccessible: boolean;
  issues: string[];
}

interface MobileTestingProps {
  className?: string;
}

const MOBILE_BREAKPOINTS = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 12/13', width: 390, height: 844 },
  { name: 'iPhone 14 Pro Max', width: 430, height: 932 },
  { name: 'Samsung Galaxy S21', width: 360, height: 800 },
  { name: 'iPad Mini', width: 768, height: 1024 },
  { name: 'iPad Pro', width: 1024, height: 1366 }
];

const WIDGETS_TO_TEST = [
  { selector: '[data-testid="app-download-bar"]', name: 'App Download Bar', expectedZIndex: 50 },
  { selector: '[data-testid="lusobot-widget"]', name: 'LusoBot Chat Widget', expectedZIndex: 70 },
  { selector: '.toast-container, [data-rht-toaster]', name: 'Toast Notifications', expectedZIndex: 9999 },
  { selector: '[data-testid="mobile-navigation"]', name: 'Mobile Navigation', expectedZIndex: 100 },
  { selector: '[data-testid="help-button"]', name: 'Help Button', expectedZIndex: 60 },
  { selector: '.modal, [role="dialog"]', name: 'Modal Dialogs', expectedZIndex: 100 }
];

export default function MobileWidgetTesting({ className = '' }: MobileTestingProps) {
  const { language } = useLanguage();
  const [testResults, setTestResults] = useState<WidgetTestResult[]>([]);
  const [currentBreakpoint, setCurrentBreakpoint] = useState(0);
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testComplete, setTestComplete] = useState(false);

  const runMobileTest = async () => {
    setIsRunningTest(true);
    setTestResults([]);
    const allResults: WidgetTestResult[] = [];

    for (let i = 0; i < MOBILE_BREAKPOINTS.length; i++) {
      const breakpoint = MOBILE_BREAKPOINTS[i];
      setCurrentBreakpoint(i);
      
      // Simulate viewport change
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', `width=${breakpoint.width}, initial-scale=1`);
      }
      
      // Wait for layout to adjust
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Test each widget at this breakpoint
      for (const widget of WIDGETS_TO_TEST) {
        const result = await testWidget(widget, breakpoint);
        allResults.push(result);
      }
    }
    
    setTestResults(allResults);
    setIsRunningTest(false);
    setTestComplete(true);
  };

  const testWidget = async (widget: any, breakpoint: any): Promise<WidgetTestResult> => {
    const element = document.querySelector(widget.selector);
    const issues: string[] = [];
    
    if (!element) {
      return {
        widgetName: widget.name,
        screenSize: `${breakpoint.name} (${breakpoint.width}x${breakpoint.height})`,
        zIndex: 0,
        position: 'not-found',
        isVisible: false,
        hasOverlap: false,
        touchAccessible: false,
        issues: ['Widget element not found on page']
      };
    }

    const computedStyle = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    const zIndex = parseInt(computedStyle.zIndex) || 0;
    const position = computedStyle.position;
    const isVisible = rect.width > 0 && rect.height > 0 && computedStyle.display !== 'none';
    
    // Check for viewport overflow
    if (rect.right > window.innerWidth) {
      issues.push('Overflows viewport horizontally');
    }
    if (rect.bottom > window.innerHeight) {
      issues.push('Overflows viewport vertically');
    }
    
    // Check z-index expectations
    if (Math.abs(zIndex - widget.expectedZIndex) > 50) {
      issues.push(`Z-index mismatch: expected ~${widget.expectedZIndex}, got ${zIndex}`);
    }
    
    // Check touch accessibility (minimum 44px touch target)
    if ((rect.width < 44 || rect.height < 44) && element.tagName.toLowerCase() === 'button') {
      issues.push('Touch target too small (< 44px)');
    }
    
    // Check for overlaps with other widgets
    let hasOverlap = false;
    for (const otherWidget of WIDGETS_TO_TEST) {
      if (otherWidget.selector !== widget.selector) {
        const otherElement = document.querySelector(otherWidget.selector);
        if (otherElement && isElementsOverlapping(element as HTMLElement, otherElement as HTMLElement)) {
          hasOverlap = true;
          issues.push(`Overlaps with ${otherWidget.name}`);
        }
      }
    }
    
    return {
      widgetName: widget.name,
      screenSize: `${breakpoint.name} (${breakpoint.width}x${breakpoint.height})`,
      zIndex,
      position,
      isVisible,
      hasOverlap,
      touchAccessible: rect.width >= 44 && rect.height >= 44,
      issues
    };
  };

  const isElementsOverlapping = (el1: HTMLElement, el2: HTMLElement): boolean => {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();
    
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
  };

  const getTestStatus = (result: WidgetTestResult) => {
    if (!result.isVisible) return 'error';
    if (result.issues.length > 0) return 'warning';
    return 'success';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const resetTest = () => {
    setTestResults([]);
    setTestComplete(false);
    setCurrentBreakpoint(0);
    // Reset viewport
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
    }
  };

  // Auto-run test on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isRunningTest && !testComplete) {
        runMobileTest();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'pt' ? 'Teste de Widgets Móveis' : 'Mobile Widget Testing'}
          </h2>
          <p className="text-gray-600">
            {language === 'pt' 
              ? 'Verificação automática de posicionamento de widgets em dispositivos móveis'
              : 'Automated widget positioning verification across mobile devices'
            }
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={runMobileTest}
            disabled={isRunningTest}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
          >
            {isRunningTest 
              ? (language === 'pt' ? 'Testando...' : 'Testing...') 
              : (language === 'pt' ? 'Executar Teste' : 'Run Test')
            }
          </button>
          <button
            onClick={resetTest}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            {language === 'pt' ? 'Reiniciar' : 'Reset'}
          </button>
        </div>
      </div>

      {/* Test Progress */}
      {isRunningTest && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              {language === 'pt' ? 'Testando' : 'Testing'}: {MOBILE_BREAKPOINTS[currentBreakpoint]?.name}
            </span>
            <span className="text-sm text-gray-500">
              {currentBreakpoint + 1} / {MOBILE_BREAKPOINTS.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentBreakpoint + 1) / MOBILE_BREAKPOINTS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">
            {language === 'pt' ? 'Resultados do Teste' : 'Test Results'}
          </h3>
          
          {/* Results by breakpoint */}
          {MOBILE_BREAKPOINTS.map(breakpoint => {
            const breakpointResults = testResults.filter(r => 
              r.screenSize.includes(breakpoint.name)
            );
            
            if (breakpointResults.length === 0) return null;
            
            return (
              <div key={breakpoint.name} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">
                  {breakpoint.name} ({breakpoint.width} × {breakpoint.height}px)
                </h4>
                
                <div className="space-y-2">
                  {breakpointResults.map((result, index) => (
                    <div
                      key={`${breakpoint.name}-${result.widgetName}-${index}`}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{result.widgetName}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(getTestStatus(result))}`}>
                            {getTestStatus(result)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Z-index: {result.zIndex} | Position: {result.position} | 
                          {result.isVisible ? ' Visible' : ' Hidden'} |
                          {result.touchAccessible ? ' Touch OK' : ' Touch Issue'}
                        </div>
                        {result.issues.length > 0 && (
                          <div className="mt-2">
                            {result.issues.map((issue, i) => (
                              <div key={i} className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded mb-1">
                                {issue}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {/* Summary */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <h4 className="font-medium text-primary-900 mb-2">
              {language === 'pt' ? 'Resumo do Teste' : 'Test Summary'}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {testResults.filter(r => getTestStatus(r) === 'success').length}
                </div>
                <div className="text-gray-600">
                  {language === 'pt' ? 'Sucessos' : 'Success'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {testResults.filter(r => getTestStatus(r) === 'warning').length}
                </div>
                <div className="text-gray-600">
                  {language === 'pt' ? 'Avisos' : 'Warnings'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {testResults.filter(r => getTestStatus(r) === 'error').length}
                </div>
                <div className="text-gray-600">
                  {language === 'pt' ? 'Erros' : 'Errors'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">
                  {testResults.length}
                </div>
                <div className="text-gray-600">
                  {language === 'pt' ? 'Total' : 'Total'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions for manual testing */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">
          {language === 'pt' ? 'Teste Manual Adicional' : 'Additional Manual Testing'}
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• {language === 'pt' ? 'Use as ferramentas de desenvolvedor do Chrome para simular dispositivos' : 'Use Chrome DevTools device simulation'}</li>
          <li>• {language === 'pt' ? 'Teste gestos de toque em dispositivos reais' : 'Test touch gestures on real devices'}</li>
          <li>• {language === 'pt' ? 'Verifique a orientação portrait/landscape' : 'Check portrait/landscape orientation'}</li>
          <li>• {language === 'pt' ? 'Teste com diferentes tamanhos de fonte do sistema' : 'Test with different system font sizes'}</li>
        </ul>
      </div>
    </div>
  );
}