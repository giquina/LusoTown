"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter, usePathname } from 'next/navigation';
import { 
  HomeIcon,
  BuildingStorefrontIcon,
  CalendarDaysIcon,
  UsersIcon,
  MapPinIcon,
  ChatBubbleBottomCenterIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  BellIcon
} from '@heroicons/react/24/outline';

interface NavigationItem {
  id: string;
  href: string;
  icon: React.ElementType;
  label: {
    en: string;
    pt: string;
  };
  description: {
    en: string;
    pt: string;
  };
  shortcut?: string;
}

interface AccessibilityEnhancedNavigationProps {
  className?: string;
  variant?: 'desktop' | 'mobile' | 'sidebar';
}

const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    href: '/',
    icon: HomeIcon,
    label: { en: 'Home', pt: 'Início' },
    description: { en: 'Go to homepage', pt: 'Ir para a página inicial' },
    shortcut: '1'
  },
  {
    id: 'business-directory',
    href: '/business-directory',
    icon: BuildingStorefrontIcon,
    label: { en: 'Business Directory', pt: 'Diretório de Negócios' },
    description: { en: 'Find Portuguese-speaking businesses', pt: 'Encontrar negócios de língua portuguesa' },
    shortcut: '2'
  },
  {
    id: 'events',
    href: '/events',
    icon: CalendarDaysIcon,
    label: { en: 'Events', pt: 'Eventos' },
    description: { en: 'Discover community events', pt: 'Descobrir eventos da comunidade' },
    shortcut: '3'
  },
  {
    id: 'matches',
    href: '/matches',
    icon: UsersIcon,
    label: { en: 'Matches', pt: 'Correspondências' },
    description: { en: 'Cultural connection matches', pt: 'Correspondências de conexão cultural' },
    shortcut: '4'
  },
  {
    id: 'community',
    href: '/community',
    icon: MapPinIcon,
    label: { en: 'Community', pt: 'Comunidade' },
    description: { en: 'Community discussions and groups', pt: 'Discussões e grupos da comunidade' },
    shortcut: '5'
  },
  {
    id: 'chat',
    href: '/chat',
    icon: ChatBubbleBottomCenterIcon,
    label: { en: 'Messages', pt: 'Mensagens' },
    description: { en: 'Private messages and conversations', pt: 'Mensagens privadas e conversas' },
    shortcut: '6'
  }
];

export default function AccessibilityEnhancedNavigation({ 
  className, 
  variant = 'desktop' 
}: AccessibilityEnhancedNavigationProps) {
  const { language, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const skipLinkRef = useRef<HTMLAnchorElement>(null);

  // Keyboard navigation handler
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.altKey) {
      const shortcut = event.key;
      const item = navigationItems.find(nav => nav.shortcut === shortcut);
      if (item) {
        event.preventDefault();
        router.push(item.href);
        // Announce navigation to screen reader
        const announcement = t('navigation.shortcut_used', 'Navigated to {{page}} using keyboard shortcut', { 
          page: item.label[language] 
        });
        announceToScreenReader(announcement);
      }
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex(prev => 
          prev < navigationItems.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : navigationItems.length - 1
        );
        break;
      case 'ArrowRight':
        if (variant === 'desktop') {
          event.preventDefault();
          setFocusedIndex(prev => 
            prev < navigationItems.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowLeft':
        if (variant === 'desktop') {
          event.preventDefault();
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : navigationItems.length - 1
          );
        }
        break;
      case 'Enter':
      case ' ':
        if (focusedIndex >= 0) {
          event.preventDefault();
          const item = navigationItems[focusedIndex];
          router.push(item.href);
        }
        break;
      case 'Escape':
        if (mobileMenuOpen) {
          event.preventDefault();
          setMobileMenuOpen(false);
          setFocusedIndex(-1);
        }
        break;
      case 'm':
        if (event.ctrlKey) {
          event.preventDefault();
          setMobileMenuOpen(!mobileMenuOpen);
        }
        break;
    }
  }, [focusedIndex, router, language, t, mobileMenuOpen, variant]);

  // Announce to screen reader
  const announceToScreenReader = useCallback((message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  }, []);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      // Focus first item when opening
      setFocusedIndex(0);
      // Announce to screen reader
      announceToScreenReader(t('navigation.mobile_menu_opened', 'Mobile menu opened. Use arrow keys to navigate.'));
    } else {
      setFocusedIndex(-1);
      announceToScreenReader(t('navigation.mobile_menu_closed', 'Mobile menu closed.'));
    }
  };

  // Check if current page
  const isCurrentPage = (href: string) => {
    return pathname === href || (href !== '/' && pathname.startsWith(href));
  };

  // Focus management for mobile menu
  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      const firstFocusableElement = mobileMenuRef.current.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (firstFocusableElement) {
        (firstFocusableElement as HTMLElement).focus();
      }
    }
  }, [mobileMenuOpen]);

  // Desktop Navigation
  if (variant === 'desktop') {
    return (
      <>
        {/* Skip Navigation Link */}
        <a
          ref={skipLinkRef}
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded z-50 focus:outline-none focus:ring-2 focus:ring-white"
        >
          {t('accessibility.skip_to_main', 'Skip to main content')}
        </a>

        <nav 
          ref={navRef}
          className={`bg-white shadow-sm border-b border-gray-200 ${className || ''}`}
          role="navigation"
          aria-label={t('navigation.main_aria_label', 'Main navigation for Portuguese community platform')}
          onKeyDown={handleKeyDown}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                {/* Logo */}
                <div className="flex-shrink-0 flex items-center">
                  <Link 
                    href="/"
                    className="text-2xl font-bold text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                    aria-label={t('navigation.logo_aria', 'LusoTown - Portuguese community platform homepage')}
                  >
                    LusoTown
                  </Link>
                </div>

                {/* Desktop Navigation Items */}
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8" role="menubar">
                  {navigationItems.map((item, index) => {
                    const Icon = item.icon;
                    const isCurrent = isCurrentPage(item.href);
                    const isFocused = focusedIndex === index;
                    
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        role="menuitem"
                        aria-current={isCurrent ? 'page' : undefined}
                        aria-describedby={`nav-desc-${item.id}`}
                        tabIndex={isFocused ? 0 : -1}
                        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                          isCurrent
                            ? 'border-primary-500 text-gray-900'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700'
                        } ${
                          isFocused ? 'ring-2 ring-primary-500 ring-offset-2' : ''
                        }`}
                        onFocus={() => setFocusedIndex(index)}
                      >
                        <Icon className="w-5 h-5 mr-2" aria-hidden="true" />
                        {item.label[language]}
                        <span id={`nav-desc-${item.id}`} className="sr-only">
                          {item.description[language]}
                          {item.shortcut && ` - ${t('navigation.shortcut_hint', 'Press Alt+{{key}} for quick access', { key: item.shortcut })}`}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Right side items */}
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 min-h-[44px] min-w-[44px]"
                  aria-label={t('navigation.search_button', 'Search Portuguese businesses and events')}
                >
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  className="ml-3 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 min-h-[44px] min-w-[44px]"
                  aria-label={t('navigation.notifications_button', 'View notifications')}
                >
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="-mr-2 flex items-center sm:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 min-h-[56px] min-w-[56px]"
                  aria-controls="mobile-menu"
                  aria-expanded={mobileMenuOpen}
                  aria-label={t('navigation.mobile_menu_button', mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu')}
                >
                  {mobileMenuOpen ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div 
              ref={mobileMenuRef}
              className="sm:hidden"
              id="mobile-menu"
              role="menu"
              aria-label={t('navigation.mobile_menu_aria', 'Mobile navigation menu')}
            >
              <div className="pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                {navigationItems.map((item, index) => {
                  const Icon = item.icon;
                  const isCurrent = isCurrentPage(item.href);
                  const isFocused = focusedIndex === index;
                  
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      role="menuitem"
                      aria-current={isCurrent ? 'page' : undefined}
                      aria-describedby={`mobile-nav-desc-${item.id}`}
                      tabIndex={isFocused ? 0 : -1}
                      className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 min-h-[56px] flex items-center ${
                        isCurrent
                          ? 'bg-primary-50 border-primary-500 text-primary-700'
                          : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 focus:bg-gray-50 focus:border-gray-300 focus:text-gray-700'
                      } ${
                        isFocused ? 'ring-2 ring-inset ring-primary-500' : ''
                      }`}
                      onFocus={() => setFocusedIndex(index)}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5 mr-3" aria-hidden="true" />
                      {item.label[language]}
                      <span id={`mobile-nav-desc-${item.id}`} className="sr-only">
                        {item.description[language]}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </nav>

        {/* Keyboard Navigation Help */}
        <div className="sr-only" role="region" aria-label={t('navigation.keyboard_help', 'Navigation keyboard shortcuts')}>
          <h2>{t('navigation.keyboard_shortcuts', 'Keyboard Shortcuts')}</h2>
          <ul>
            <li>{t('navigation.shortcut_home', 'Alt+1: Go to homepage')}</li>
            <li>{t('navigation.shortcut_business', 'Alt+2: Business directory')}</li>
            <li>{t('navigation.shortcut_events', 'Alt+3: Community events')}</li>
            <li>{t('navigation.shortcut_matches', 'Alt+4: Cultural matches')}</li>
            <li>{t('navigation.shortcut_community', 'Alt+5: Community discussions')}</li>
            <li>{t('navigation.shortcut_messages', 'Alt+6: Private messages')}</li>
            <li>{t('navigation.shortcut_mobile', 'Ctrl+M: Toggle mobile menu')}</li>
            <li>{t('navigation.shortcut_arrows', 'Arrow keys: Navigate menu items')}</li>
          </ul>
        </div>
      </>
    );
  }

  // Mobile/Sidebar variants can be implemented similarly
  return null;
}