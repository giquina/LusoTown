"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
  ChartBarIcon,
  BoltIcon,
  SparklesIcon,
  HeartIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  TrendingUpIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  FunnelIcon,
  RefreshIcon,
  EyeIcon,
  PlayCircleIcon,
  PauseCircleIcon,
  StopCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartSolid,
  BoltIcon as BoltSolid,
  SparklesIcon as SparklesSolid,
} from '@heroicons/react/24/solid';
import { advancedMatchingAlgorithms, type MatchingResult, type RealTimeMatchingMetrics } from '@/services/AdvancedMatchingAlgorithms';
import type { CulturalDepthProfile } from '../matches/SaudadeMatchingSystem';

interface RealTimeMatchingState {
  isActive: boolean;
  currentMatches: MatchingResult[];
  metrics: RealTimeMatchingMetrics | null;
  optimizationStatus: 'idle' | 'running' | 'complete' | 'error';
  lastUpdate: string;
  matchingSpeed: 'slow' | 'normal' | 'fast' | 'turbo';
}

interface MatchingFilters {
  focusAreas: ('cultural' | 'geographic' | 'professional' | 'events')[];
  maxDistance: number;
  minCompatibility: number;
  culturalDepthRange: [number, number];
  includeNewUsers: boolean;
  realTimeUpdates: boolean;
}

interface RealTimeMatchingDashboardProps {
  userProfile: CulturalDepthProfile;
  onMatchSelect: (match: MatchingResult) => void;
  onStartConversation: (matchId: string) => void;
  onConfigurationChange?: (config: any) => void;
  initialFilters?: Partial<MatchingFilters>;
  showAdvancedControls?: boolean;
}

export default function RealTimeMatchingDashboard({
  userProfile,
  onMatchSelect,
  onStartConversation,
  onConfigurationChange,
  initialFilters = {},
  showAdvancedControls = true,
}: RealTimeMatchingDashboardProps) {
  const { language } = useLanguage();
  const intervalRef = useRef<NodeJS.Timeout>();
  const [matchingState, setMatchingState] = useState<RealTimeMatchingState>({
    isActive: false,
    currentMatches: [],
    metrics: null,
    optimizationStatus: 'idle',
    lastUpdate: new Date().toISOString(),
    matchingSpeed: 'normal',
  });

  const [filters, setFilters] = useState<MatchingFilters>({
    focusAreas: ['cultural', 'geographic'],
    maxDistance: 25,
    minCompatibility: 70,
    culturalDepthRange: [5, 10],
    includeNewUsers: true,
    realTimeUpdates: true,
    ...initialFilters,
  });

  const [showMetrics, setShowMetrics] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [animationEnabled, setAnimationEnabled] = useState(true);

  // Real-time matching intervals based on speed
  const getUpdateInterval = (speed: typeof matchingState.matchingSpeed): number => {
    switch (speed) {
      case 'slow': return 30000; // 30 seconds
      case 'normal': return 15000; // 15 seconds
      case 'fast': return 8000; // 8 seconds
      case 'turbo': return 3000; // 3 seconds
      default: return 15000;
    }
  };

  // Initialize real-time matching
  useEffect(() => {
    if (matchingState.isActive && filters.realTimeUpdates) {
      startRealTimeMatching();
    } else {
      stopRealTimeMatching();
    }

    return () => stopRealTimeMatching();
  }, [matchingState.isActive, matchingState.matchingSpeed, filters]);

  const startRealTimeMatching = async () => {
    try {
      setMatchingState(prev => ({ ...prev, optimizationStatus: 'running' }));

      // Initial match finding
      await findMatches();

      // Set up real-time updates
      const interval = getUpdateInterval(matchingState.matchingSpeed);
      intervalRef.current = setInterval(async () => {
        await findMatches();
        await updateMetrics();
      }, interval);

      setMatchingState(prev => ({ ...prev, optimizationStatus: 'complete' }));
    } catch (error) {
      console.error('[Real-time Matching] Start error:', error);
      setMatchingState(prev => ({ ...prev, optimizationStatus: 'error' }));
    }
  };

  const stopRealTimeMatching = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  const findMatches = async () => {
    try {
      const matches = await advancedMatchingAlgorithms.findAdvancedMatches(
        userProfile.saudadeProfile.id || 'current-user',
        {
          maxResults: 20,
          focusAreas: filters.focusAreas,
          customWeights: {
            distanceFactors: {
              maxDistance: filters.maxDistance,
              distanceDecayRate: 0.7,
              transportAccessibility: 0.3,
            },
            qualityThresholds: {
              minCompatibilityScore: filters.minCompatibility,
              minCulturalDepth: filters.culturalDepthRange[0],
              minProfileCompleteness: 60,
            },
          },
        }
      );

      const filteredMatches = matches.filter(match => 
        match.culturalBondingPotential >= filters.culturalDepthRange[0] &&
        match.culturalBondingPotential <= filters.culturalDepthRange[1]
      );

      setMatchingState(prev => ({
        ...prev,
        currentMatches: filteredMatches,
        lastUpdate: new Date().toISOString(),
      }));
    } catch (error) {
      console.error('[Real-time Matching] Find matches error:', error);
    }
  };

  const updateMetrics = async () => {
    try {
      const metrics = await advancedMatchingAlgorithms.optimizeMatchingPerformance();
      setMatchingState(prev => ({ ...prev, metrics }));
    } catch (error) {
      console.error('[Real-time Matching] Metrics update error:', error);
    }
  };

  const toggleRealTimeMatching = () => {
    setMatchingState(prev => ({
      ...prev,
      isActive: !prev.isActive,
      optimizationStatus: prev.isActive ? 'idle' : 'running',
    }));
  };

  const changeMatchingSpeed = (speed: typeof matchingState.matchingSpeed) => {
    setMatchingState(prev => ({ ...prev, matchingSpeed: speed }));
    if (matchingState.isActive) {
      stopRealTimeMatching();
      setTimeout(startRealTimeMatching, 100);
    }
  };

  const handleFilterChange = (newFilters: Partial<MatchingFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onConfigurationChange?.(updatedFilters);
    
    if (matchingState.isActive) {
      findMatches(); // Immediate update
    }
  };

  const getSpeedColor = (speed: typeof matchingState.matchingSpeed) => {
    switch (speed) {
      case 'slow': return 'text-green-600 bg-green-50';
      case 'normal': return 'text-blue-600 bg-blue-50';
      case 'fast': return 'text-orange-600 bg-orange-50';
      case 'turbo': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = () => {
    switch (matchingState.optimizationStatus) {
      case 'running': return <BoltSolid className="w-5 h-5 text-yellow-500 animate-pulse" />;
      case 'complete': return <SparklesSolid className="w-5 h-5 text-green-500" />;
      case 'error': return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      default: return <BoltIcon className="w-5 h-5 text-gray-400" />;
    }
  };

  const formatTimeSince = (timestamp: string) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  return (
    <div className="space-y-6">
      {/* Real-time Control Header */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {language === 'pt' ? 'Matches Inteligentes em Tempo Real' : 'Real-Time Intelligent Matching'}
              </h2>
              <p className="text-sm text-gray-600">
                {language === 'pt' 
                  ? `${matchingState.currentMatches.length} matches encontrados • Atualizado ${formatTimeSince(matchingState.lastUpdate)}`
                  : `${matchingState.currentMatches.length} matches found • Updated ${formatTimeSince(matchingState.lastUpdate)}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {showAdvancedControls && (
              <>
                <button
                  onClick={() => setShowMetrics(!showMetrics)}
                  className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  title={language === 'pt' ? 'Ver métricas' : 'View metrics'}
                >
                  <ChartBarIcon className="w-5 h-5 text-gray-600" />
                </button>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  title={language === 'pt' ? 'Configurar filtros' : 'Configure filters'}
                >
                  <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-600" />
                </button>
              </>
            )}
            
            <button
              onClick={toggleRealTimeMatching}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                matchingState.isActive
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {matchingState.isActive ? (
                <>
                  <PauseCircleIcon className="w-5 h-5" />
                  {language === 'pt' ? 'Pausar' : 'Pause'}
                </>
              ) : (
                <>
                  <PlayCircleIcon className="w-5 h-5" />
                  {language === 'pt' ? 'Iniciar' : 'Start'}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">
            {language === 'pt' ? 'Velocidade:' : 'Speed:'}
          </span>
          <div className="flex gap-2">
            {(['slow', 'normal', 'fast', 'turbo'] as const).map((speed) => (
              <button
                key={speed}
                onClick={() => changeMatchingSpeed(speed)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  matchingState.matchingSpeed === speed
                    ? getSpeedColor(speed)
                    : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {speed.charAt(0).toUpperCase() + speed.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="ml-auto flex items-center gap-2 text-sm text-gray-600">
            <ClockIcon className="w-4 h-4" />
            {language === 'pt' ? 'Atualiza a cada' : 'Updates every'} {getUpdateInterval(matchingState.matchingSpeed) / 1000}s
          </div>
        </div>
      </div>

      {/* Metrics Panel */}
      <AnimatePresence>
        {showMetrics && matchingState.metrics && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ChartBarIcon className="w-5 h-5 text-purple-600" />
              {language === 'pt' ? 'Métricas de Performance em Tempo Real' : 'Real-Time Performance Metrics'}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {matchingState.metrics.activeUsers}
                </div>
                <div className="text-sm text-blue-700">
                  {language === 'pt' ? 'Utilizadores Ativos' : 'Active Users'}
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(matchingState.metrics.averageCompatibility)}%
                </div>
                <div className="text-sm text-green-700">
                  {language === 'pt' ? 'Compatibilidade Média' : 'Avg Compatibility'}
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(matchingState.metrics.successRate)}%
                </div>
                <div className="text-sm text-purple-700">
                  {language === 'pt' ? 'Taxa de Sucesso' : 'Success Rate'}
                </div>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {matchingState.metrics.responseTimeMs}ms
                </div>
                <div className="text-sm text-orange-700">
                  {language === 'pt' ? 'Tempo de Resposta' : 'Response Time'}
                </div>
              </div>
            </div>
            
            {/* Cultural Distribution */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-800 mb-3">
                {language === 'pt' ? 'Distribuição Cultural' : 'Cultural Distribution'}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(matchingState.metrics.culturalDepthDistribution).map(([depth, count]) => (
                  <div key={depth} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-700">{depth}</span>
                    <span className="font-medium text-gray-900">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FunnelIcon className="w-5 h-5 text-blue-600" />
              {language === 'pt' ? 'Filtros Avançados de Matching' : 'Advanced Matching Filters'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Focus Areas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'pt' ? 'Áreas de Foco' : 'Focus Areas'}
                </label>
                <div className="space-y-2">
                  {(['cultural', 'geographic', 'professional', 'events'] as const).map((area) => (
                    <label key={area} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.focusAreas.includes(area)}
                        onChange={(e) => {
                          const newAreas = e.target.checked
                            ? [...filters.focusAreas, area]
                            : filters.focusAreas.filter(a => a !== area);
                          handleFilterChange({ focusAreas: newAreas });
                        }}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700 capitalize">{area}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Distance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'pt' ? `Distância Máxima: ${filters.maxDistance}km` : `Max Distance: ${filters.maxDistance}km`}
                </label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={filters.maxDistance}
                  onChange={(e) => handleFilterChange({ maxDistance: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5km</span>
                  <span>100km</span>
                </div>
              </div>

              {/* Compatibility */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'pt' ? `Compatibilidade Mínima: ${filters.minCompatibility}%` : `Min Compatibility: ${filters.minCompatibility}%`}
                </label>
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={filters.minCompatibility}
                  onChange={(e) => handleFilterChange({ minCompatibility: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>50%</span>
                  <span>95%</span>
                </div>
              </div>

              {/* Cultural Depth Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'pt' 
                    ? `Profundidade Cultural: ${filters.culturalDepthRange[0]}-${filters.culturalDepthRange[1]}`
                    : `Cultural Depth: ${filters.culturalDepthRange[0]}-${filters.culturalDepthRange[1]}`}
                </label>
                <div className="flex gap-2">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={filters.culturalDepthRange[0]}
                    onChange={(e) => {
                      const newMin = parseInt(e.target.value);
                      handleFilterChange({
                        culturalDepthRange: [newMin, Math.max(newMin, filters.culturalDepthRange[1])]
                      });
                    }}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={filters.culturalDepthRange[1]}
                    onChange={(e) => {
                      const newMax = parseInt(e.target.value);
                      handleFilterChange({
                        culturalDepthRange: [Math.min(filters.culturalDepthRange[0], newMax), newMax]
                      });
                    }}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Toggle Options */}
            <div className="mt-6 flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.includeNewUsers}
                  onChange={(e) => handleFilterChange({ includeNewUsers: e.target.checked })}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">
                  {language === 'pt' ? 'Incluir novos utilizadores' : 'Include new users'}
                </span>
              </label>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.realTimeUpdates}
                  onChange={(e) => handleFilterChange({ realTimeUpdates: e.target.checked })}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">
                  {language === 'pt' ? 'Atualizações em tempo real' : 'Real-time updates'}
                </span>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Real-time Matches Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {language === 'pt' ? 'Matches em Tempo Real' : 'Real-Time Matches'}
          </h3>
          
          {matchingState.isActive && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              {language === 'pt' ? 'Procurando matches...' : 'Finding matches...'}
            </div>
          )}
        </div>

        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchingState.currentMatches.map((match, index) => (
              <motion.div
                key={match.userId}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  transition: { delay: animationEnabled ? index * 0.1 : 0 }
                }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                {/* Match Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                      {match.userId.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        User {match.userId.slice(-4)}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPinIcon className="w-3 h-3" />
                        <span>{match.geographicFeasibility}% feasible</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-600">
                      {match.compatibilityScore}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {language === 'pt' ? 'compatibilidade' : 'compatibility'}
                    </div>
                  </div>
                </div>

                {/* Compatibility Scores */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-red-600">
                      {match.saudadeResonance}%
                    </div>
                    <div className="text-xs text-gray-600">Saudade</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-600">
                      {match.culturalHarmony}%
                    </div>
                    <div className="text-xs text-gray-600">
                      {language === 'pt' ? 'Cultural' : 'Cultural'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-green-600">
                      {match.eventCompatibility}%
                    </div>
                    <div className="text-xs text-gray-600">
                      {language === 'pt' ? 'Eventos' : 'Events'}
                    </div>
                  </div>
                </div>

                {/* AI Insights */}
                <div className="bg-purple-50 p-3 rounded-lg mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <SparklesSolid className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-semibold text-purple-800">
                      AI {language === 'pt' ? 'Insight' : 'Insight'}
                    </span>
                  </div>
                  <p className="text-xs text-purple-700">
                    {match.reasoning.strengths[0] || (language === 'pt' ? 'Boa compatibilidade geral' : 'Good overall compatibility')}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onStartConversation(match.userId)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
                  >
                    {language === 'pt' ? 'Conversar' : 'Chat'}
                  </button>
                  <button
                    onClick={() => onMatchSelect(match)}
                    className="px-3 py-2 border border-purple-300 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors"
                  >
                    {language === 'pt' ? 'Ver' : 'View'}
                  </button>
                </div>

                {/* Real-time Indicator */}
                {matchingState.isActive && (
                  <div className="absolute top-2 right-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* Empty State */}
        {matchingState.currentMatches.length === 0 && !matchingState.isActive && (
          <div className="text-center py-12">
            <MagnifyingGlassIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {language === 'pt' ? 'Nenhum match encontrado' : 'No matches found'}
            </h3>
            <p className="text-gray-500 mb-4">
              {language === 'pt' 
                ? 'Inicie o matching em tempo real para encontrar conexões portuguesas'
                : 'Start real-time matching to find Portuguese connections'}
            </p>
            <button
              onClick={toggleRealTimeMatching}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              {language === 'pt' ? 'Iniciar Matching' : 'Start Matching'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}