"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HomeIcon, 
  CalendarDaysIcon, 
  UserGroupIcon, 
  HeartIcon, 
  UserIcon,
  PlusIcon,
  BellIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeSolidIcon, 
  CalendarDaysIcon as CalendarSolidIcon, 
  UserGroupIcon as UserGroupSolidIcon, 
  HeartIcon as HeartSolidIcon, 
  UserIcon as UserSolidIcon,
  BellIcon as BellSolidIcon,
  ChatBubbleLeftRightIcon as ChatSolidIcon
} from '@heroicons/react/24/solid';
import { usePathname } from 'next/navigation';
import { LuxuryRipple, LuxuryFAB } from './LuxuryMobileInteraction';
import { ROUTES } from '@/config/routes';
import { COMPONENT_Z_INDEX } from '@/config/z-index-layers';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  solidIcon: React.ComponentType<any>;
  color: string;
  badge?: number;
}

const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: ROUTES.home,
    icon: HomeIcon,
    solidIcon: HomeSolidIcon,
    color: 'text-secondary-600'
  },
  {
    id: 'events',
    label: 'Events',
    href: ROUTES.events,
    icon: CalendarDaysIcon,
    solidIcon: CalendarSolidIcon,
    color: 'text-primary-600'
  },
  {
    id: 'community',
    label: 'Community',
    href: ROUTES.community,
    icon: UserGroupIcon,
    solidIcon: UserGroupSolidIcon,
    color: 'text-accent-600'
  },
  {
    id: 'favorites',
    label: 'Saved',
    href: ROUTES.favorites,
    icon: HeartIcon,
    solidIcon: HeartSolidIcon,
    color: 'text-action-600'
  },
  {
    id: 'profile',
    label: 'Profile',
    href: ROUTES.profile,
    icon: UserIcon,
    solidIcon: UserSolidIcon,
    color: 'text-premium-600'
  }
];

interface LuxuryMobileNavProps {
  className?: string;
  user?: any;
  notifications?: number;
  onCreateNew?: () => void;
}

export default function LuxuryMobileNav({ 
  className = '',
  user,
  notifications = 0,
  onCreateNew 
}: LuxuryMobileNavProps) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auto-hide navigation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Update active tab based on pathname
  useEffect(() => {
    const currentItem = navItems.find(item => 
      pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
    );
    if (currentItem) {
      setActiveTab(currentItem.id);
    }
  }, [pathname]);

  const handleNavItemClick = (item: NavItem) => {
    setActiveTab(item.id);
    window.location.href = item.href;
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.nav
        className={`luxury-mobile-nav ${isVisible ? '' : 'luxury-mobile-nav-hidden'} ${className}`}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center justify-around px-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const IconComponent = isActive ? item.solidIcon : item.icon;
            
            return (
              <LuxuryRipple
                key={item.id}
                className={`luxury-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNavItemClick(item)}
                hapticFeedback="light"
                rippleColor="rgba(197, 40, 47, 0.2)"
              >
                <motion.div
                  className="relative"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={isActive ? { y: -2 } : { y: 0 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <IconComponent 
                      className={`luxury-nav-icon ${isActive ? item.color : 'text-gray-500'}`} 
                    />
                  </motion.div>
                  
                  {/* Badge for notifications */}
                  {item.id === 'profile' && notifications > 0 && (
                    <motion.div
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      {notifications > 9 ? '9+' : notifications}
                    </motion.div>
                  )}
                </motion.div>
                
                <motion.span
                  className={`luxury-nav-label ${isActive ? item.color : ''}`}
                  animate={isActive ? { fontWeight: 600 } : { fontWeight: 400 }}
                >
                  {item.label}
                </motion.span>
                
                {/* Active indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-current rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    />
                  )}
                </AnimatePresence>
              </LuxuryRipple>
            );
          })}
        </div>
      </motion.nav>

      {/* Floating Action Button for creating new content */}
      {onCreateNew && (
        <LuxuryFAB
          icon={<PlusIcon className="w-6 h-6" />}
          onClick={onCreateNew}
          variant="primary"
          size="medium"
          tooltip="Create New"
          className="fixed bottom-24 right-6 z-[${COMPONENT_Z_INDEX.fabButton}]"
        />
      )}

      {/* Quick Actions Menu (appears on long press of FAB) */}
      <AnimatePresence>
        {/* This could be expanded to show a quick actions menu */}
      </AnimatePresence>
    </>
  );
}

// Context-aware navigation component that shows different items based on user state
interface ContextualMobileNavProps {
  user?: any;
  className?: string;
}

export function ContextualMobileNav({ user, className }: ContextualMobileNavProps) {
  const [quickActions, setQuickActions] = useState(false);
  
  const handleCreateNew = () => {
    setQuickActions(!quickActions);
  };

  const quickActionItems = [
    {
      label: 'Create Event',
      icon: CalendarDaysIcon,
      href: '/events/create',
      color: 'bg-primary-500'
    },
    {
      label: 'New Post',
      icon: ChatBubbleLeftRightIcon,
      href: '/feed/create',
      color: 'bg-secondary-500'
    },
    {
      label: 'Start Group',
      icon: UserGroupIcon,
      href: '/groups/create',
      color: 'bg-accent-500'
    }
  ];

  return (
    <>
      <LuxuryMobileNav
        user={user}
        notifications={user?.unreadNotifications || 0}
        onCreateNew={user ? handleCreateNew : undefined}
        className={className}
      />

      {/* Quick Actions Overlay */}
      <AnimatePresence>
        {quickActions && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-[${COMPONENT_Z_INDEX.modal}] flex items-end justify-center pb-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickActions(false)}
          >
            <motion.div
              className="bg-white rounded-t-3xl p-6 w-full max-w-md mx-4"
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
                <p className="text-sm text-gray-600">What would you like to create?</p>
              </div>
              
              <div className="space-y-3">
                {quickActionItems.map((action, index) => (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <LuxuryRipple
                      className="flex items-center gap-4 p-4 rounded-2xl border border-gray-200 hover:border-gray-300 w-full"
                      onClick={() => {
                        window.location.href = action.href;
                        setQuickActions(false);
                      }}
                      hapticFeedback="medium"
                    >
                      <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-semibold text-gray-900">{action.label}</h4>
                        <p className="text-sm text-gray-600">Share with the Portuguese-speaking community</p>
                      </div>
                    </LuxuryRipple>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}