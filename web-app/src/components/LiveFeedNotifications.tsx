"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlusIcon,
  StarIcon,
  HeartIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  TruckIcon,
  VideoCameraIcon,
  BriefcaseIcon,
  SparklesIcon,
  AcademicCapIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

interface NotificationItem {
  id: string;
  type:
    | "match_made"
    | "event_created"
    | "transport_booking"
    | "stream_started"
    | "business_workshop"
    | "signup"
    | "student_joined"
    | "cultural_event"
    | "premium_upgrade"
    | "group_joined"
    | "success_story";
  name: string;
  location: string;
  action: string;
  timeAgo: string;
  icon: React.ReactNode;
  gradient: string;
}

const LiveFeedNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [currentNotification, setCurrentNotification] =
    useState<NotificationItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        window.innerWidth < 1024 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Portuguese community activities focused on real LusoTown features
  const mockNotifications = useMemo<Omit<NotificationItem, "id" | "timeAgo">[]>(
    () => [
      {
        type: "match_made",
        name: "Ana Sofia",
        location: "Westminster",
        action: "matched with a fellow Portuguese speaker for weekend activities",
        icon: <HeartIcon className="w-4 h-4 text-white" />,
        gradient: "from-pink-400 to-rose-500",
      },
      {
        type: "event_created",
        name: "Miguel Santos",
        location: "Chelsea",
        action: "created 'Fado Night at Portuguese Restaurant' event",
        icon: <CalendarIcon className="w-4 h-4 text-white" />,
        gradient: "from-primary-400 to-secondary-500",
      },
      {
        type: "stream_started",
        name: "Beatriz Ferreira",
        location: "Kensington",
        action: "started streaming 'Portuguese Cooking Class' on LusoTown TV",
        icon: <VideoCameraIcon className="w-4 h-4 text-white" />,
        gradient: "from-purple-400 to-violet-500",
      },
      {
        type: "business_workshop",
        name: "João Pereira",
        location: "Canary Wharf",
        action: "joined 'Starting Your UK Business' workshop",
        icon: <BriefcaseIcon className="w-4 h-4 text-white" />,
        gradient: "from-blue-400 to-indigo-500",
      },
      {
        type: "transport_booking",
        name: "Catarina Silva",
        location: "Clapham",
        action: "booked premium transport with Portuguese-speaking driver",
        icon: <TruckIcon className="w-4 h-4 text-white" />,
        gradient: "from-green-400 to-emerald-500",
      },
      {
        type: "cultural_event",
        name: "Ricardo Oliveira",
        location: "Brixton",
        action: "registered for 'Portuguese Heritage Walking Tour'",
        icon: <MapPinIcon className="w-4 h-4 text-white" />,
        gradient: "from-amber-400 to-orange-500",
      },
      {
        type: "signup",
        name: "Mariana Costa",
        location: "Greenwich",
        action: "joined LusoTown to connect with Portuguese community",
        icon: <UserPlusIcon className="w-4 h-4 text-white" />,
        gradient: "from-primary-400 to-secondary-500",
      },
      {
        type: "student_joined",
        name: "Pedro Almeida",
        location: "King's College",
        action: "verified as student and joined Portuguese student network",
        icon: <AcademicCapIcon className="w-4 h-4 text-white" />,
        gradient: "from-cyan-400 to-blue-500",
      },
      {
        type: "premium_upgrade",
        name: "Inês Rodrigues",
        location: "Hampstead",
        action: "upgraded to Cultural Ambassador membership",
        icon: <SparklesIcon className="w-4 h-4 text-white" />,
        gradient: "from-yellow-400 to-orange-500",
      },
      {
        type: "group_joined",
        name: "Gonçalo Martins",
        location: "Richmond",
        action: "joined 'Portuguese Professionals in London' group",
        icon: <ChatBubbleLeftRightIcon className="w-4 h-4 text-white" />,
        gradient: "from-emerald-400 to-teal-500",
      },
      {
        type: "success_story",
        name: "Sofia Mendes",
        location: "Fulham",
        action: "shared success story about finding her Portuguese mentor",
        icon: <StarIcon className="w-4 h-4 text-white" />,
        gradient: "from-pink-400 to-rose-500",
      },
      {
        type: "match_made",
        name: "Tiago Carvalho",
        location: "Shoreditch",
        action: "matched with someone for Portuguese language exchange",
        icon: <HeartIcon className="w-4 h-4 text-white" />,
        gradient: "from-red-400 to-pink-500",
      },
      {
        type: "event_created",
        name: "Lúcia Fernandes",
        location: "Camden",
        action: "organized 'Portuguese Film Night' community event",
        icon: <CalendarIcon className="w-4 h-4 text-white" />,
        gradient: "from-primary-400 to-secondary-500",
      },
      {
        type: "stream_started",
        name: "Rui Moreira",
        location: "Islington",
        action: "broadcasting live 'Portuguese Guitar Lessons'",
        icon: <VideoCameraIcon className="w-4 h-4 text-white" />,
        gradient: "from-violet-400 to-purple-500",
      },
      {
        type: "business_workshop",
        name: "Cristina Alves",
        location: "City of London",
        action: "attending 'UK Tax for Portuguese Entrepreneurs' session",
        icon: <BriefcaseIcon className="w-4 h-4 text-white" />,
        gradient: "from-indigo-400 to-blue-500",
      },
    ],
    []
  );

  // Generate time ago strings
  const getRandomTimeAgo = () => {
    const options = [
      "2 minutes ago",
      "5 minutes ago",
      "8 minutes ago",
      "12 minutes ago",
      "15 minutes ago",
      "18 minutes ago",
      "22 minutes ago",
      "25 minutes ago",
      "30 minutes ago",
      "35 minutes ago",
      "42 minutes ago",
      "48 minutes ago",
    ];
    return options[Math.floor(Math.random() * options.length)];
  };

  // Show notifications periodically
  const showNextNotification = useCallback(() => {
    const randomNotification =
      mockNotifications[Math.floor(Math.random() * mockNotifications.length)];
    const notification: NotificationItem = {
      ...randomNotification,
      id: Math.random().toString(36).substr(2, 9),
      timeAgo: getRandomTimeAgo(),
    };

    setCurrentNotification(notification);

    // Hide after 6 seconds
    setTimeout(() => {
      setCurrentNotification(null);
    }, 6000);

    // Schedule next notification (between 15-45 seconds)
    const nextDelay = Math.random() * 30000 + 15000;
    setTimeout(showNextNotification, nextDelay);
  }, [mockNotifications]);

  useEffect(() => {
    // Start after 30 seconds
    const initialDelay = setTimeout(() => {
      setIsVisible(true);
      showNextNotification();
    }, 30000);

    return () => clearTimeout(initialDelay);
  }, [showNextNotification]);

  const handleClose = () => {
    setCurrentNotification(null);
  };

  // Hide on mobile devices or if not visible
  if (!isVisible || isMobile) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-none">
      <AnimatePresence>
        {currentNotification && (
          <motion.div
            key={currentNotification.id}
            initial={{ opacity: 0, x: -100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              duration: 0.4,
            }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 max-w-sm pointer-events-auto"
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-r ${currentNotification.gradient} flex items-center justify-center flex-shrink-0`}
              >
                {currentNotification.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 leading-tight">
                      <span className="font-semibold">
                        {currentNotification.name}
                      </span>
                      <span className="text-gray-600 font-normal">
                        {" "}
                        from {currentNotification.location}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1 leading-tight">
                      {currentNotification.action}
                    </p>
                    <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      {currentNotification.timeAgo}
                    </p>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={handleClose}
                    className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                  >
                    <XMarkIcon className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 6, ease: "linear" }}
                className={`h-full bg-gradient-to-r ${currentNotification.gradient} rounded-full`}
              />
            </div>

            {/* Subtle branding */}
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-400">
                <span className="font-medium text-primary-500">
                  LusoTown London
                </span>{" "}
                • Live Activity
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating indicator when no notification is shown */}
      <AnimatePresence>
        {!currentNotification && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveFeedNotifications;
