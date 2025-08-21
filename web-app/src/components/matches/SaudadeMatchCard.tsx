"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
  HeartIcon,
  HandHeartIcon,
  HomeIcon,
  MusicalNoteIcon,
  SparklesIcon,
  MapPinIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  XMarkIcon,
  CheckIcon,
  FaceSmileIcon,
  GlobeAltIcon,
  UserGroupIcon,
  SunIcon,
  CloudIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartSolid,
  StarIcon as StarSolid,
} from '@heroicons/react/24/solid';
import type { SaudadeProfile, CulturalDepthProfile, SaudadeCompatibilityResult } from './SaudadeMatchingSystem';

interface SaudadeMatchCardProps {
  match: {
    id: string;
    name: string;
    age: number;
    photo: string;
    bio?: string;
    distance?: number;
    lastActive?: string;
    saudadeProfile: SaudadeProfile;
    culturalProfile: CulturalDepthProfile;
    compatibilityResult: SaudadeCompatibilityResult;
  };
  onLike: () => void;
  onPass: () => void;
  onStartConversation: () => void;
  showDetailedView?: boolean;
  userSaudadeProfile: SaudadeProfile;
}

export default function SaudadeMatchCard({
  match,
  onLike,
  onPass,
  onStartConversation,
  showDetailedView = false,
  userSaudadeProfile,
}: SaudadeMatchCardProps) {
  const { language } = useLanguage();
  const [showSaudadeDetails, setShowSaudadeDetails] = useState(false);
  const [showCulturalDepth, setShowCulturalDepth] = useState(false);

  const getConnectionTypeLabel = (type: SaudadeCompatibilityResult['connectionType']) => {
    const labels = {
      saudade_soulmate: language === 'pt' ? 'Alma Gémea de Saudade' : 'Saudade Soulmate',
      cultural_healer: language === 'pt' ? 'Curador Cultural' : 'Cultural Healer',
      heritage_guardian: language === 'pt' ? 'Guardião da Herança' : 'Heritage Guardian',
      integration_partner: language === 'pt' ? 'Parceiro de Integração' : 'Integration Partner',
      gentle_companion: language === 'pt' ? 'Companheiro Gentil' : 'Gentle Companion',
    };
    return labels[type];
  };

  const getConnectionTypeIcon = (type: SaudadeCompatibilityResult['connectionType']) => {
    switch (type) {
      case 'saudade_soulmate':
        return HeartSolid;
      case 'cultural_healer':
        return HandHeartIcon;
      case 'heritage_guardian':
        return HomeIcon;
      case 'integration_partner':
        return UserGroupIcon;
      default:
        return SparklesIcon;
    }
  };

  const getConnectionTypeColor = (type: SaudadeCompatibilityResult['connectionType']) => {
    switch (type) {
      case 'saudade_soulmate':
        return 'from-red-500 to-pink-500';
      case 'cultural_healer':
        return 'from-green-500 to-emerald-500';
      case 'heritage_guardian':
        return 'from-blue-500 to-indigo-500';
      case 'integration_partner':
        return 'from-purple-500 to-violet-500';
      default:
        return 'from-gray-500 to-slate-500';
    }
  };

  const getSaudadeIntensityEmoji = (intensity: number) => {
    if (intensity >= 9) return '💔';
    if (intensity >= 7) return '😢';
    if (intensity >= 5) return '🥺';
    if (intensity >= 3) return '😊';
    return '😌';
  };

  const getFrequencyLabel = (frequency: SaudadeProfile['frequency']) => {
    const labels = {
      constant: language === 'pt' ? 'Constante' : 'Constant',
      weekly: language === 'pt' ? 'Semanal' : 'Weekly',
      monthly: language === 'pt' ? 'Mensal' : 'Monthly',
      seasonal: language === 'pt' ? 'Sazonal' : 'Seasonal',
      rare: language === 'pt' ? 'Raro' : 'Rare',
    };
    return labels[frequency];
  };

  const getTriggerEmoji = (trigger: string) => {
    const emojis: Record<string, string> = {
      fado_music: '🎭',
      family_voices: '📞',
      childhood_foods: '🍲',
      portuguese_countryside: '🌾',
      ocean_waves: '🌊',
      church_bells: '🔔',
      santos_populares: '🎪',
      grandmother_recipes: '👵',
      portuguese_language: '📚',
      childhood_friends: '👦',
      portuguese_films: '🎬',
      festival_memories: '🎊',
    };
    return emojis[trigger] || '✨';
  };

  const getCopingEmoji = (coping: string) => {
    const emojis: Record<string, string> = {
      cook_portuguese: '👩‍🍳',
      call_family: '📱',
      listen_fado: '😢',
      portuguese_community: '👥',
      visit_portugal: '✈️',
      portuguese_media: '📺',
      write_journal: '✍️',
      talk_portuguese_friends: '💬',
      portuguese_markets: '🛒',
      embrace_sadness: '🤗',
      share_culture: '🎭',
      keep_busy: '🏃',
    };
    return emojis[coping] || '💙';
  };

  const sharedTriggers = userSaudadeProfile.triggers.filter(trigger => 
    match.saudadeProfile.triggers.includes(trigger)
  );

  const sharedCoping = userSaudadeProfile.copingMechanisms.filter(coping => 
    match.saudadeProfile.copingMechanisms.includes(coping)
  );

  const IconComponent = getConnectionTypeIcon(match.compatibilityResult.connectionType);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden max-w-sm mx-auto"
    >
      {/* Header Image with Connection Type Overlay */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={match.photo}
          alt={match.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Connection Type Badge */}
        <div className={`absolute top-4 left-4 px-3 py-2 rounded-full bg-gradient-to-r ${getConnectionTypeColor(match.compatibilityResult.connectionType)} text-white text-sm font-semibold flex items-center gap-2`}>
          <IconComponent className="w-4 h-4" />
          <span className="hidden sm:inline">{getConnectionTypeLabel(match.compatibilityResult.connectionType)}</span>
        </div>

        {/* Compatibility Score */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2">
          <div className="flex items-center gap-1">
            <HeartSolid className="w-4 h-4 text-coral-500" />
            <span className="text-sm font-bold text-gray-900">
              {match.compatibilityResult.compatibilityScore}%
            </span>
          </div>
        </div>

        {/* Basic Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{match.name}</h3>
              <div className="flex items-center gap-3 text-white/90 text-sm">
                <span>{match.age} anos</span>
                {match.distance && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{match.distance}km</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            {match.lastActive && (
              <div className="text-xs text-white/80 bg-black/30 px-2 py-1 rounded">
                {match.lastActive}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Saudade Profile Summary */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <HeartSolid className="w-5 h-5 text-coral-500" />
              {language === 'pt' ? 'Perfil de Saudade' : 'Saudade Profile'}
            </h4>
            <button
              onClick={() => setShowSaudadeDetails(!showSaudadeDetails)}
              className="text-sm text-coral-600 hover:text-red-700 font-medium"
            >
              {showSaudadeDetails ? 
                (language === 'pt' ? 'Menos' : 'Less') : 
                (language === 'pt' ? 'Mais' : 'More')
              }
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-1">{getSaudadeIntensityEmoji(match.saudadeProfile.saudadeIntensity)}</div>
              <div className="font-medium text-secondary-700">
                {language === 'pt' ? 'Intensidade' : 'Intensity'}
              </div>
              <div className="text-coral-600 font-bold">{match.saudadeProfile.saudadeIntensity}/10</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">📅</div>
              <div className="font-medium text-secondary-700">
                {language === 'pt' ? 'Frequência' : 'Frequency'}
              </div>
              <div className="text-coral-600 font-bold text-xs">
                {getFrequencyLabel(match.saudadeProfile.frequency)}
              </div>
            </div>
          </div>

          <AnimatePresence>
            {showSaudadeDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-3"
              >
                {/* Shared Triggers */}
                {sharedTriggers.length > 0 && (
                  <div>
                    <div className="text-xs font-medium text-secondary-600 mb-2">
                      {language === 'pt' ? 'Gatilhos Partilhados:' : 'Shared Triggers:'}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {sharedTriggers.slice(0, 3).map((trigger, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs px-2 py-1 rounded"
                        >
                          <span>{getTriggerEmoji(trigger)}</span>
                          <span>{trigger.replace('_', ' ')}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shared Coping */}
                {sharedCoping.length > 0 && (
                  <div>
                    <div className="text-xs font-medium text-secondary-600 mb-2">
                      {language === 'pt' ? 'Estratégias Partilhadas:' : 'Shared Coping:'}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {sharedCoping.slice(0, 3).map((coping, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 bg-blue-100 text-primary-700 text-xs px-2 py-1 rounded"
                        >
                          <span>{getCopingEmoji(coping)}</span>
                          <span>{coping.replace('_', ' ')}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cultural Compatibility Breakdown */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-blue-50 rounded-lg p-2">
            <div className="text-lg font-bold text-primary-600">
              {match.compatibilityResult.saudadeAlignment}%
            </div>
            <div className="text-xs text-primary-700">
              {language === 'pt' ? 'Saudade' : 'Saudade'}
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-2">
            <div className="text-lg font-bold text-action-600">
              {match.compatibilityResult.emotionalSupport}%
            </div>
            <div className="text-xs text-green-700">
              {language === 'pt' ? 'Apoio' : 'Support'}
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-2">
            <div className="text-lg font-bold text-purple-600">
              {match.compatibilityResult.culturalDepth}%
            </div>
            <div className="text-xs text-purple-700">
              {language === 'pt' ? 'Cultura' : 'Culture'}
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-2">
            <div className="text-lg font-bold text-orange-600">
              {match.compatibilityResult.heritageAlignment}%
            </div>
            <div className="text-xs text-orange-700">
              {language === 'pt' ? 'Herança' : 'Heritage'}
            </div>
          </div>
        </div>

        {/* Regional Connection */}
        <div className="bg-primary-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <GlobeAltIcon className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-800">
              {language === 'pt' ? 'Ligação Regional' : 'Regional Connection'}
            </span>
          </div>
          <div className="text-sm text-primary-700">
            {match.saudadeProfile.regionalIdentity.region === 'porto_norte' && 
              (language === 'pt' ? 'Porto/Norte - Orgulho Nortista' : 'Porto/North - Northern Pride')}
            {match.saudadeProfile.regionalIdentity.region === 'lisboa_area' && 
              (language === 'pt' ? 'Lisboa - Energia da Capital' : 'Lisbon - Capital Energy')}
            {match.saudadeProfile.regionalIdentity.region === 'acores_island' && 
              (language === 'pt' ? 'Açores - Identidade Insular' : 'Azores - Island Identity')}
            {/* Add more regional mappings */}
          </div>
        </div>

        {/* Quick Compatibility Insights */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-secondary-700 flex items-center gap-2">
            <SparklesIcon className="w-4 h-4" />
            {language === 'pt' ? 'Conexão Especial' : 'Special Connection'}
          </h4>
          <div className="text-sm text-secondary-600">
            {match.compatibilityResult.supportStrengths[0] || 
              (language === 'pt' ? 'Compreensão cultural profunda' : 'Deep cultural understanding')}
          </div>
        </div>

        {/* Bio */}
        {match.bio && (
          <div className="text-sm text-secondary-600 italic border-l-3 border-primary-300 pl-3">
            "{match.bio}"
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-6 pt-0">
        <div className="grid grid-cols-3 gap-3">
          {/* Pass */}
          <button
            onClick={onPass}
            className="flex items-center justify-center p-3 bg-secondary-100 hover:bg-secondary-200 rounded-xl transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-secondary-600" />
          </button>

          {/* Message */}
          <button
            onClick={onStartConversation}
            className="flex items-center justify-center p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-colors"
          >
            <ChatBubbleLeftRightIcon className="w-6 h-6" />
          </button>

          {/* Like */}
          <button
            onClick={onLike}
            className="flex items-center justify-center p-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl transition-all"
          >
            <HeartSolid className="w-6 h-6" />
          </button>
        </div>

        {/* Saudade-Based Conversation Starter */}
        <div className="mt-4 p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-100">
          <div className="text-xs font-medium text-red-800 mb-1">
            {language === 'pt' ? 'Iniciador de Conversa Cultural:' : 'Cultural Conversation Starter:'}
          </div>
          <div className="text-sm text-red-700">
            {sharedTriggers.includes('fado_music') ?
              (language === 'pt' ? 
                'Que música de fado mais desperta a sua saudade?' :
                'Which fado song most awakens your saudade?') :
            sharedCoping.includes('cook_portuguese') ?
              (language === 'pt' ?
                'Qual é o prato português que mais lhe lembra casa?' :
                'What Portuguese dish most reminds you of home?') :
              (language === 'pt' ?
                'Como sente a saudade vivendo em Londres?' :
                'How do you experience saudade living in London?')
            }
          </div>
        </div>
      </div>
    </motion.div>
  );
}