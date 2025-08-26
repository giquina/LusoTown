"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClockIcon,
  UsersIcon,
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  InformationCircleIcon,
  TrophyIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useLanguage } from '@/context/LanguageContext';
import { Event, WaitlistEntry } from '@/lib/events';

interface EventWaitlistManagerProps {
  event: Event;
  userWaitlistEntry?: WaitlistEntry | null;
  onJoinWaitlist: (eventId: string, userDetails: {
    name: string;
    email: string;
    membershipTier: 'free' | 'core' | 'premium';
  }) => Promise<{ success: boolean; position?: number; error?: string }>;
  onLeaveWaitlist: (eventId: string) => Promise<{ success: boolean; error?: string }>;
  onNotifyAvailability: (eventId: string) => Promise<{ success: boolean; error?: string }>;
  className?: string;
}

interface WaitlistFormData {
  name: string;
  email: string;
  dietaryRequirements: string[];
  specialNeeds: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  culturalInterest: string;
  portugueseLanguageLevel: 'native' | 'fluent' | 'intermediate' | 'beginner' | 'none';
  marketingConsent: boolean;
}

const EventWaitlistManager: React.FC<EventWaitlistManagerProps> = ({
  event,
  userWaitlistEntry,
  onJoinWaitlist,
  onLeaveWaitlist,
  onNotifyAvailability,
  className = ''
}) => {
  const { language, t } = useLanguage();
  const isPortuguese = language === 'pt';

  // Component state
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<WaitlistFormData>({
    name: '',
    email: '',
    dietaryRequirements: [],
    specialNeeds: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    culturalInterest: '',
    portugueseLanguageLevel: 'none',
    marketingConsent: false
  });

  // Status calculations
  const isFullyBooked = event.currentAttendees >= event.maxAttendees;
  const waitlistAvailable = event.allowWaitlist && event.waitlistCount < event.maxWaitingList;
  const userOnWaitlist = !!userWaitlistEntry;
  const waitlistPosition = userWaitlistEntry?.position;

  // Portuguese cultural context
  const culturalPriority = event.tags.some(tag => 
    ['portuguese', 'brazilian', 'angolan', 'cape-verdean', 'mozambican', 'cultural'].includes(tag.toLowerCase())
  );

  const handleJoinWaitlist = async () => {
    if (!formData.name || !formData.email) {
      return;
    }

    setLoading(true);
    try {
      const result = await onJoinWaitlist(event.id, {
        name: formData.name,
        email: formData.email,
        membershipTier: 'free' // Would get from user context
      });

      if (result.success) {
        setShowWaitlistForm(false);
        // Could show success notification here
      }
    } catch (error) {
      console.error('Error joining waitlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveWaitlist = async () => {
    setLoading(true);
    try {
      await onLeaveWaitlist(event.id);
    } catch (error) {
      console.error('Error leaving waitlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const getWaitlistStatusMessage = () => {
    if (!isFullyBooked) {
      return {
        type: 'available' as const,
        message: isPortuguese 
          ? `${event.maxAttendees - event.currentAttendees} lugares disponíveis`
          : `${event.maxAttendees - event.currentAttendees} spots available`
      };
    }

    if (waitlistAvailable) {
      return {
        type: 'waitlist' as const,
        message: isPortuguese
          ? `Lista de espera disponível (${event.waitlistCount}/${event.maxWaitingList})`
          : `Waitlist available (${event.waitlistCount}/${event.maxWaitingList})`
      };
    }

    return {
      type: 'full' as const,
      message: isPortuguese ? 'Completamente lotado' : 'Completely full'
    };
  };

  const status = getWaitlistStatusMessage();

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Event Status Banner */}
      <div className={`rounded-xl p-4 border ${
        status.type === 'available' 
          ? 'bg-green-50 border-green-200 text-green-800'
          : status.type === 'waitlist'
          ? 'bg-amber-50 border-amber-200 text-amber-800'
          : 'bg-red-50 border-red-200 text-red-800'
      }`}>
        <div className="flex items-center gap-3">
          {status.type === 'available' && <CheckCircleIcon className="w-5 h-5 text-green-600" />}
          {status.type === 'waitlist' && <ClockIcon className="w-5 h-5 text-amber-600" />}
          {status.type === 'full' && <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />}
          
          <div className="flex-1">
            <p className="font-medium">{status.message}</p>
            {culturalPriority && (
              <p className="text-xs mt-1 opacity-80">
                {isPortuguese 
                  ? '🇵🇹 Evento cultural português autêntico'
                  : '🇵🇹 Authentic Portuguese cultural event'}
              </p>
            )}
          </div>

          {status.type === 'waitlist' && (
            <div className="text-right">
              <div className="text-sm font-bold">
                {Math.round((event.waitlistCount / event.maxWaitingList) * 100)}%
              </div>
              <div className="text-xs opacity-70">
                {isPortuguese ? 'ocupado' : 'full'}
              </div>
            </div>
          )}
        </div>

        {/* Progress bar for waitlist */}
        {status.type === 'waitlist' && (
          <div className="mt-3">
            <div className="w-full bg-amber-200 rounded-full h-2">
              <div 
                className="bg-amber-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(event.waitlistCount / event.maxWaitingList) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* User Waitlist Status */}
      {userOnWaitlist && userWaitlistEntry && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <TrophyIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-blue-900">
                  {isPortuguese ? 'Você está na lista de espera!' : 'You\'re on the waitlist!'}
                </p>
                <p className="text-sm text-blue-700">
                  {isPortuguese ? 'Posição:' : 'Position:'} <span className="font-bold">#{waitlistPosition}</span>
                  {userWaitlistEntry.notified && (
                    <span className="ml-2 text-green-600">
                      ✓ {isPortuguese ? 'Notificado' : 'Notified'}
                    </span>
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={handleLeaveWaitlist}
              disabled={loading}
              className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
            >
              {loading ? '...' : (isPortuguese ? 'Sair' : 'Leave')}
            </button>
          </div>

          {/* Estimated wait time */}
          <div className="mt-3 p-3 bg-blue-100 rounded-lg">
            <div className="flex items-center gap-2 text-blue-800 text-sm">
              <ClockIcon className="w-4 h-4" />
              <span className="font-medium">
                {isPortuguese ? 'Tempo estimado de espera:' : 'Estimated wait time:'}
              </span>
              <span>
                {waitlistPosition && waitlistPosition <= 3 
                  ? (isPortuguese ? '1-2 dias' : '1-2 days')
                  : waitlistPosition && waitlistPosition <= 10
                  ? (isPortuguese ? '3-7 dias' : '3-7 days')
                  : (isPortuguese ? '1-2 semanas' : '1-2 weeks')
                }
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Join Waitlist Button */}
      {isFullyBooked && !userOnWaitlist && waitlistAvailable && (
        <button
          onClick={() => setShowWaitlistForm(true)}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 px-6 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
        >
          <ClockIcon className="w-5 h-5" />
          {isPortuguese ? 'Entrar na Lista de Espera' : 'Join Waitlist'}
          {culturalPriority && <span className="text-xs opacity-90">🇵🇹</span>}
        </button>
      )}

      {/* Notify Me Button (when waitlist is also full) */}
      {isFullyBooked && !userOnWaitlist && !waitlistAvailable && (
        <button
          onClick={() => onNotifyAvailability(event.id)}
          disabled={loading}
          className="w-full bg-gray-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          <BellIcon className="w-5 h-5" />
          {loading ? '...' : (isPortuguese ? 'Notificar-me se houver Disponibilidade' : 'Notify Me if Available')}
        </button>
      )}

      {/* Book Now Button (when available) */}
      {!isFullyBooked && (
        <button
          onClick={() => {/* Handle booking */}}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
        >
          <CheckCircleIcon className="w-5 h-5" />
          {isPortuguese ? 'Reservar Agora' : 'Book Now'}
          {event.price > 0 && <span>£{event.price.toFixed(2)}</span>}
        </button>
      )}

      {/* Waitlist Form Modal */}
      <AnimatePresence>
        {showWaitlistForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {isPortuguese ? 'Entrar na Lista de Espera' : 'Join Waitlist'}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {event.title}
                  </p>
                </div>
                <button
                  onClick={() => setShowWaitlistForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Cultural Priority Notice */}
              {culturalPriority && (
                <div className="bg-gradient-to-r from-green-50 to-red-50 border border-green-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <HeartSolid className="w-5 h-5 text-red-500" />
                    <div className="text-sm">
                      <p className="font-medium text-green-800">
                        {isPortuguese ? 'Evento Cultural Português' : 'Portuguese Cultural Event'}
                      </p>
                      <p className="text-green-700 mt-1">
                        {isPortuguese 
                          ? 'Falantes de português têm prioridade na lista de espera'
                          : 'Portuguese speakers have priority on the waitlist'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isPortuguese ? 'Nome Completo' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isPortuguese ? 'Seu nome completo' : 'Your full name'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isPortuguese ? 'Email' : 'Email'}
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={isPortuguese ? 'seu.email@exemplo.com' : 'your.email@example.com'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isPortuguese ? 'Nível de Português' : 'Portuguese Level'}
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={formData.portugueseLanguageLevel}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      portugueseLanguageLevel: e.target.value as any
                    })}
                  >
                    <option value="none">{isPortuguese ? 'Não falo português' : 'I don\'t speak Portuguese'}</option>
                    <option value="beginner">{isPortuguese ? 'Iniciante' : 'Beginner'}</option>
                    <option value="intermediate">{isPortuguese ? 'Intermediário' : 'Intermediate'}</option>
                    <option value="fluent">{isPortuguese ? 'Fluente' : 'Fluent'}</option>
                    <option value="native">{isPortuguese ? 'Nativo' : 'Native'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isPortuguese ? 'Por que este evento é importante para você?' : 'Why is this event important to you?'}
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    value={formData.culturalInterest}
                    onChange={(e) => setFormData({ ...formData, culturalInterest: e.target.value })}
                    placeholder={isPortuguese 
                      ? 'Compartilhe sua conexão com a cultura portuguesa...'
                      : 'Share your connection to Portuguese culture...'
                    }
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="marketing-consent"
                    className="mt-1 text-primary-500 focus:ring-primary-400"
                    checked={formData.marketingConsent}
                    onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
                  />
                  <label htmlFor="marketing-consent" className="text-xs text-gray-600">
                    {isPortuguese 
                      ? 'Sim, quero receber notificações sobre eventos culturais portugueses similares'
                      : 'Yes, I\'d like to receive notifications about similar Portuguese cultural events'}
                  </label>
                </div>
              </div>

              {/* Expected position info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-2 text-blue-800 text-sm">
                  <InformationCircleIcon className="w-4 h-4" />
                  <span>
                    {isPortuguese 
                      ? `Posição esperada na lista: #${event.waitlistCount + 1}`
                      : `Expected waitlist position: #${event.waitlistCount + 1}`}
                  </span>
                </div>
                {formData.portugueseLanguageLevel !== 'none' && culturalPriority && (
                  <div className="flex items-center gap-2 text-green-700 text-sm mt-2">
                    <StarIcon className="w-4 h-4" />
                    <span>
                      {isPortuguese 
                        ? 'Prioridade cultural aplicada!'
                        : 'Cultural priority applied!'}
                    </span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleJoinWaitlist}
                disabled={!formData.name || !formData.email || loading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 px-6 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {isPortuguese ? 'Entrando...' : 'Joining...'}
                  </div>
                ) : (
                  isPortuguese ? 'Entrar na Lista de Espera' : 'Join Waitlist'
                )}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Waitlist Tips */}
      {isFullyBooked && (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2">
            {isPortuguese ? 'Dicas da Lista de Espera' : 'Waitlist Tips'}
          </h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
              {isPortuguese 
                ? 'Receba notificações instantâneas quando um lugar estiver disponível'
                : 'Get instant notifications when a spot becomes available'}
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
              {isPortuguese 
                ? 'Falantes de português têm prioridade em eventos culturais'
                : 'Portuguese speakers get priority for cultural events'}
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
              {isPortuguese 
                ? 'Normalmente 20-30% dos lugares ficam disponíveis antes do evento'
                : 'Usually 20-30% of spots become available before the event'}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default EventWaitlistManager;