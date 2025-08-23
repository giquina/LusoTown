"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartIcon, 
  CalendarDaysIcon, 
  UserGroupIcon, 
  MapPinIcon,
  PhotoIcon,
  PlusIcon,
  ShareIcon,
  ChatBubbleLeftRightIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';

import { 
  LuxuryRipple, 
  LuxurySwipe, 
  LuxuryPullToRefresh, 
  LuxuryLongPress,
  LuxuryFAB,
  LuxuryModal
} from '@/components/LuxuryMobileInteraction';

import { 
  LuxurySkeleton, 
  LuxurySpinner, 
  LuxuryProgress, 
  LuxuryContentLoading,
  LuxuryPlaceholder
} from '@/components/LuxuryLoadingStates';

import FavoriteButton from '@/components/FavoriteButton';
import ReactionButton from '@/components/ReactionButton';

export default function MobilePreviewPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  // Mock data for Portuguese events
  const mockEvents = [
    {
      id: '1',
      title: 'Noite de Fado em Camden',
      description: 'Uma noite especial de música tradicional portuguesa com artistas locais',
      location: 'Camden Market, London',
      date: '2024-01-25',
      time: '19:30',
      image: '/api/placeholder/300/200',
      attendees: 45,
      reactions: { heart: 12, smile: 8, party: 15 }
    },
    {
      id: '2',
      title: 'Festival da Sardinha',
      description: 'Celebração da cultura portuguesa com comida tradicional e música',
      location: 'Stockwell, London',
      date: '2024-01-28',
      time: '14:00',
      image: '/api/placeholder/300/200',
      attendees: 89,
      reactions: { heart: 23, smile: 12, party: 8 }
    },
    {
      id: '3',
      title: 'Aulas de Português para Crianças',
      description: 'Ensino da língua portuguesa para a nova geração em Londres',
      location: 'Portuguese Centre, London',
      date: '2024-01-30',
      time: '10:00',
      image: '/api/placeholder/300/200',
      attendees: 28,
      reactions: { heart: 18, smile: 15, party: 5 }
    }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleEventSwipeLeft = (eventId: string) => {
    console.log(`Swiped left on event ${eventId} - Quick share`);
  };

  const handleEventSwipeRight = (eventId: string) => {
    console.log(`Swiped right on event ${eventId} - Quick favorite`);
  };

  const handleLongPress = (eventId: string) => {
    setSelectedEvent(eventId);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-secondary-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-lg border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">
            Luxury Mobile Preview
          </h1>
          <div className="flex gap-2">
            <LuxurySpinner size="sm" variant="portuguese" />
          </div>
        </div>
      </div>

      {/* Pull to Refresh Container */}
      <LuxuryPullToRefresh onRefresh={handleRefresh}>
        <div className="p-4 space-y-6">
          
          {/* Loading States Demo */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 luxury-portuguese-accent">
              Loading States
            </h2>
            
            <div className="space-y-4">
              <LuxuryContentLoading type="event" />
              <LuxuryContentLoading type="profile" />
            </div>

            <div className="flex gap-4 items-center">
              <LuxurySpinner variant="portuguese" />
              <LuxurySpinner variant="dots" />
              <LuxurySpinner variant="pulse" />
            </div>

            <LuxuryProgress 
              progress={progress} 
              variant="portuguese" 
              showPercentage 
              label="Loading Portuguese Events"
            />
          </section>

          {/* Interactive Components Demo */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 luxury-portuguese-accent">
              Luxury Interactions
            </h2>

            {/* Buttons with luxury ripple effects */}
            <div className="grid grid-cols-2 gap-3">
              <LuxuryRipple 
                className="luxury-btn-primary text-center"
                hapticFeedback="medium"
                onClick={() => console.log('Primary action clicked')}
              >
                Primary Action
              </LuxuryRipple>
              
              <LuxuryRipple 
                className="luxury-btn-secondary text-center"
                hapticFeedback="light"
                onClick={() => console.log('Secondary action clicked')}
              >
                Secondary Action
              </LuxuryRipple>
            </div>

            {/* Reaction buttons */}
            <div className="flex gap-2 flex-wrap">
              <ReactionButton 
                emoji="❤️" 
                count={12} 
                isActive={false} 
                onClick={() => console.log('Heart reaction')}
                tooltip="Love this!"
              />
              <ReactionButton 
                emoji="😊" 
                count={8} 
                isActive={true} 
                onClick={() => console.log('Smile reaction')}
                tooltip="Makes me happy"
              />
              <ReactionButton 
                emoji="🎉" 
                count={15} 
                isActive={false} 
                onClick={() => console.log('Party reaction')}
                tooltip="Let's celebrate!"
              />
            </div>

            {/* Favorite button demo */}
            <div className="flex gap-4 items-center">
              <FavoriteButton
                itemId="demo-1"
                itemType="event"
                itemTitle="Demo Event"
                itemDescription="This is a demo event"
                size="lg"
                variant="default"
              />
              <span className="text-sm text-gray-600">Luxury Favorite Button</span>
            </div>
          </section>

          {/* Portuguese Events with Swipe Gestures */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 luxury-portuguese-accent">
              Portuguese-speaking community Events
            </h2>
            
            <div className="space-y-4">
              {mockEvents.map((event) => (
                <LuxurySwipe
                  key={event.id}
                  onSwipeLeft={() => handleEventSwipeLeft(event.id)}
                  onSwipeRight={() => handleEventSwipeRight(event.id)}
                >
                  <LuxuryLongPress
                    onLongPress={() => handleLongPress(event.id)}
                    className="luxury-card overflow-hidden"
                  >
                    <div className="relative">
                      {/* Event Image */}
                      <div className="h-48 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black bg-opacity-20" />
                        <div className="absolute top-4 right-4">
                          <FavoriteButton
                            itemId={event.id}
                            itemType="event"
                            itemTitle={event.title}
                            itemDescription={event.description}
                            variant="overlay"
                          />
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <div className="flex items-center gap-2 text-sm">
                            <CalendarDaysIcon className="w-4 h-4" />
                            <span>{event.date} • {event.time}</span>
                          </div>
                        </div>
                      </div>

                      {/* Event Content */}
                      <div className="p-4 space-y-3">
                        <h3 className="text-lg font-bold text-gray-900">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {event.description}
                        </p>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPinIcon className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-1">
                            <UserGroupIcon className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {event.attendees} attending
                            </span>
                          </div>

                          <div className="flex gap-1">
                            <ReactionButton 
                              emoji="❤️" 
                              count={event.reactions.heart} 
                              isActive={false} 
                              onClick={() => console.log('Heart reaction')}
                            />
                            <ReactionButton 
                              emoji="😊" 
                              count={event.reactions.smile} 
                              isActive={false} 
                              onClick={() => console.log('Smile reaction')}
                            />
                            <ReactionButton 
                              emoji="🎉" 
                              count={event.reactions.party} 
                              isActive={false} 
                              onClick={() => console.log('Party reaction')}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </LuxuryLongPress>
                </LuxurySwipe>
              ))}
            </div>

            {/* Load More Button */}
            <LuxuryRipple
              className="luxury-btn-secondary w-full text-center"
              onClick={handleLoadMore}
              hapticFeedback="medium"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <LuxurySpinner size="sm" variant="dots" />
                  <span>Loading more events...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <PlusIcon className="w-5 h-5" />
                  <span>Load More Events</span>
                </div>
              )}
            </LuxuryRipple>
          </section>

          {/* Empty State Demo */}
          <section className="space-y-4">
            <LuxuryPlaceholder
              icon={<CalendarDaysIcon className="w-full h-full" />}
              title="No Events Found"
              description="There are no Portuguese events in your area right now. Be the first to create one!"
              action={{
                label: "Create Event",
                onClick: () => console.log('Create event clicked')
              }}
            />
          </section>

        </div>
      </LuxuryPullToRefresh>

      {/* Floating Action Button */}
      <LuxuryFAB
        icon={<PlusIcon className="w-6 h-6" />}
        onClick={() => setModalOpen(true)}
        variant="primary"
        size="large"
        tooltip="Create new content"
        badge={3}
      />

      {/* Modal Demo */}
      <LuxuryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Event Actions"
        size="medium"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Choose an action for the selected Portuguese-speaking community event.
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            <LuxuryRipple 
              className="luxury-btn-primary text-center py-3"
              onClick={() => {
                console.log('Share event');
                setModalOpen(false);
              }}
            >
              <ShareIcon className="w-5 h-5 mx-auto mb-1" />
              Share Event
            </LuxuryRipple>
            
            <LuxuryRipple 
              className="luxury-btn-secondary text-center py-3"
              onClick={() => {
                console.log('Message organizer');
                setModalOpen(false);
              }}
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5 mx-auto mb-1" />
              Message
            </LuxuryRipple>
          </div>

          <LuxuryRipple 
            className="luxury-btn-secondary w-full text-center py-3"
            onClick={() => setModalOpen(false)}
          >
            Close
          </LuxuryRipple>
        </div>
      </LuxuryModal>

      {/* Instructions */}
      <div className="fixed bottom-24 left-4 right-4 bg-black bg-opacity-80 text-white text-xs p-3 rounded-lg">
        <p className="font-semibold mb-1">Luxury Mobile Interactions:</p>
        <ul className="space-y-1 text-xs">
          <li>• Pull down to refresh</li>
          <li>• Swipe events left/right for quick actions</li>
          <li>• Long press events for context menu</li>
          <li>• Tap buttons for luxury ripple effects</li>
          <li>• FAB button for quick actions</li>
        </ul>
      </div>
    </div>
  );
}