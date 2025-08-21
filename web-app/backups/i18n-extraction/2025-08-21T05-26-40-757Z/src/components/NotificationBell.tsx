"use client";

import { useState } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationBellProps {
  className?: string;
  showDropdown?: boolean;
}

export default function NotificationBell({ className, showDropdown = false }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true); // Mock state

  // Mock notifications data
  const notifications = [
    { id: 1, message: 'New event "Festa Junina" was just announced!', time: '2 hours ago', read: false },
    { id: 2, message: 'Your connection request to Ana Sousa was accepted.', time: '1 day ago', read: false },
    { id: 3, message: 'Reminder: "Encontro de Fado" is starting in 1 hour.', time: '5 hours ago', read: true },
  ];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        aria-label="Notifications"
      >
        <BellIcon className="h-6 w-6" />
        {hasNotifications && (
          <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
          >
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            </div>
            <ul className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
              {notifications.map(notification => (
                <li key={notification.id} className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                  <p className="text-sm text-gray-800">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </li>
              ))}
               {notifications.length === 0 && (
                <li className="p-4 text-center text-sm text-gray-500">
                  You have no new notifications.
                </li>
              )}
            </ul>
            <div className="p-2 bg-gray-50 border-t border-gray-200 text-center">
                <a href="/notification-preferences" className="text-sm font-medium text-primary-600 hover:underline">
                    View all notifications
                </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
