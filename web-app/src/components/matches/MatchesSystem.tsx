'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Users, 
  MapPin, 
  Star, 
  MessageCircle, 
  Filter,
  Settings,
  UserPlus,
  Globe,
  Languages,
  Sparkles,
  Shield,
  Clock,
  ChevronRight,
  X,
  User
} from 'lucide-react';
import { 
  CulturalMatchingService,
  SafeMatchingProfile,
  CulturalCompatibilityScore,
  MatchingFilters,
  DEFAULT_MATCHING_FILTERS,
  getCulturalBackgroundName,
  getPortugueseConversationStarters
} from '@/lib/cultural-matching';
import CulturalProfileSetup from './CulturalProfileSetup';
import { getCulturalInterestById } from '@/config/cultural-preferences';

interface MatchesSystemProps {
  onStartConversation?: (matchId: string, matchName: string) => void;
  className?: string;
}

interface ExtendedMatchProfile extends SafeMatchingProfile {
  compatibility: CulturalCompatibilityScore;
}

export default function MatchesSystem({
  onStartConversation,
  className = ''
}: MatchesSystemProps) {
  const { t, language } = useLanguage();
  const [currentView, setCurrentView] = useState<'matches' | 'profile-setup' | 'filters'>('matches');
  const [userProfile, setUserProfile] = useState<SafeMatchingProfile | null>(null);
  const [matches, setMatches] = useState<ExtendedMatchProfile[]>([]);
  const [filters, setFilters] = useState<MatchingFilters>(DEFAULT_MATCHING_FILTERS);
  const [loading, setLoading] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<ExtendedMatchProfile | null>(null);

  const translations = {
    en: {
      title: 'Portuguese Community Matches',
      subtitle: 'Connect with Portuguese speakers in your area',
      noProfile: {
        title: 'Set up your cultural profile',
        subtitle: 'Tell us about your Portuguese heritage to find perfect matches',
        button: 'Create Profile'
      },
      noMatches: {
        title: 'No matches found',
        subtitle: 'Try adjusting your filters or expanding your search area',
        expandSearch: 'Expand Search Area',
        adjustFilters: 'Adjust Filters'
      },
      filters: {
        title: 'Filter Matches',
        ageRange: 'Age Range',
        distance: 'Maximum Distance',
        heritage: 'Cultural Heritage',
        interests: 'Shared Interests',
        language: 'Language Preference',
        verifiedOnly: 'Verified profiles only',
        apply: 'Apply Filters',
        clear: 'Clear All'
      },
      matchCard: {
        compatibility: 'Compatibility',
        sharedInterests: 'Shared Interests',
        distance: 'km away',
        lastActive: 'Active',
        verified: 'Verified',
        viewProfile: 'View Profile',
        startChat: 'Start Conversation',
        reasons: 'Why you match',
        icebreakers: 'Conversation starters'
      },
      languages: {
        portuguese: 'Portuguese',
        bilingual: 'Bilingual',
        english: 'English'
      },
      safety: {
        title: 'Safety First',
        subtitle: 'All profiles are verified for your safety',
        report: 'Report Profile',
        block: 'Block User'
      }
    },
    pt: {
      title: 'Matches da Comunidade Portuguesa',
      subtitle: 'Conecte-se com lusófonos na sua área',
      noProfile: {
        title: 'Configure o seu perfil cultural',
        subtitle: 'Fale-nos sobre a sua herança portuguesa para encontrar matches perfeitos',
        button: 'Criar Perfil'
      },
      noMatches: {
        title: 'Nenhum match encontrado',
        subtitle: 'Tente ajustar os seus filtros ou expandir a área de pesquisa',
        expandSearch: 'Expandir Área de Pesquisa',
        adjustFilters: 'Ajustar Filtros'
      },
      filters: {
        title: 'Filtrar Matches',
        ageRange: 'Faixa Etária',
        distance: 'Distância Máxima',
        heritage: 'Herança Cultural',
        interests: 'Interesses Partilhados',
        language: 'Preferência de Idioma',
        verifiedOnly: 'Apenas perfis verificados',
        apply: 'Aplicar Filtros',
        clear: 'Limpar Tudo'
      },
      matchCard: {
        compatibility: 'Compatibilidade',
        sharedInterests: 'Interesses Partilhados',
        distance: 'km de distância',
        lastActive: 'Ativo',
        verified: 'Verificado',
        viewProfile: 'Ver Perfil',
        startChat: 'Iniciar Conversa',
        reasons: 'Por que são compatíveis',
        icebreakers: 'Ideias para conversar'
      },
      languages: {
        portuguese: 'Português',
        bilingual: 'Bilíngue',
        english: 'Inglês'
      },
      safety: {
        title: 'Segurança em Primeiro',
        subtitle: 'Todos os perfis são verificados para sua segurança',
        report: 'Reportar Perfil',
        block: 'Bloquear Utilizador'
      }
    }
  };

  const tr = translations[language];

  // Mock data for demonstration
  const generateMockMatches = (): SafeMatchingProfile[] => [
    {
      id: '1',
      userId: 'user1',
      name: 'Maria Silva',
      age: 28,
      location: {
        city: 'London',
        latitude: 51.5074,
        longitude: -0.1278
      },
      bio: 'Portuguese from Porto, love fado music and exploring London\'s Portuguese community. Work in tech and enjoy weekend football matches.',
      interests: ['fado', 'portuguese_cuisine', 'football', 'community_events'],
      culturalBackground: ['PT'],
      languageSkills: {
        portuguese: 'native',
        english: 'fluent'
      },
      isVerified: true,
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      safetyScore: 9
    },
    {
      id: '2',
      userId: 'user2',
      name: 'Carlos Santos',
      age: 32,
      location: {
        city: 'London',
        latitude: 51.4994,
        longitude: -0.1270
      },
      bio: 'Brazilian software engineer living in London for 3 years. Love Brazilian music, cooking, and meeting people from the Portuguese-speaking community.',
      interests: ['brazilian_music', 'cooking', 'networking', 'language_exchange'],
      culturalBackground: ['BR'],
      languageSkills: {
        portuguese: 'native',
        english: 'intermediate'
      },
      isVerified: true,
      lastActive: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      safetyScore: 8
    },
    {
      id: '3',
      userId: 'user3',
      name: 'Ana Costa',
      age: 26,
      location: {
        city: 'London',
        latitude: 51.5175,
        longitude: -0.0885
      },
      bio: 'From Cape Verde, passionate about African-Portuguese culture and community building. Work in education and love cultural events.',
      interests: ['african_lusophone_cuisine', 'community_events', 'cultural_education'],
      culturalBackground: ['CV'],
      languageSkills: {
        portuguese: 'fluent',
        english: 'fluent'
      },
      isVerified: true,
      lastActive: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      safetyScore: 9
    }
  ];

  useEffect(() => {
    // Simulate loading user profile and matches
    const loadMatches = async () => {
      if (!userProfile) return;
      
      setLoading(true);
      try {
        // In real implementation, this would call an API
        const mockProfiles = generateMockMatches();
        const foundMatches = CulturalMatchingService.findMatches(
          userProfile,
          mockProfiles,
          filters
        );
        setMatches(foundMatches);
      } catch (error) {
        console.error('Error loading matches:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, [userProfile, filters]);

  const handleProfileSetup = (profile: Partial<SafeMatchingProfile>) => {
    const fullProfile: SafeMatchingProfile = {
      id: 'current-user',
      userId: 'current-user-id',
      ...profile
    } as SafeMatchingProfile;
    
    setUserProfile(fullProfile);
    setCurrentView('matches');
  };

  const renderCompatibilityBadge = (score: number) => {
    let color = 'bg-gray-100 text-gray-600';
    let label = 'Low';
    
    if (score >= 80) {
      color = 'bg-green-100 text-green-700';
      label = language === 'pt' ? 'Excelente' : 'Excellent';
    } else if (score >= 70) {
      color = 'bg-blue-100 text-blue-700';
      label = language === 'pt' ? 'Muito Bom' : 'Very Good';
    } else if (score >= 60) {
      color = 'bg-yellow-100 text-yellow-700';
      label = language === 'pt' ? 'Bom' : 'Good';
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        {score}% {label}
      </span>
    );
  };

  const renderMatchCard = (match: ExtendedMatchProfile) => (
    <motion.div
      key={match.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      {/* Profile Header */}
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary-600" />
            </div>
            {match.isVerified && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {match.name}, {match.age}
              </h3>
              {renderCompatibilityBadge(match.compatibility.overall)}
            </div>
            
            <div className="flex items-center space-x-2 mt-1">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {match.location.city}
                {match.compatibility.breakdown.location > 0 && (
                  <span className="ml-1 text-primary-600">
                    • {Math.round(match.compatibility.breakdown.location / 10)} {tr.matchCard.distance}
                  </span>
                )}
              </span>
            </div>

            {/* Cultural Background */}
            <div className="flex items-center space-x-2 mt-2">
              {match.culturalBackground.map(code => (
                <span key={code} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                  {getCulturalBackgroundName(code, language)}
                </span>
              ))}
            </div>

            {/* Language Skills */}
            <div className="flex items-center space-x-2 mt-2">
              <Languages className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-600">
                {tr.languages.portuguese}: {match.languageSkills.portuguese} • 
                English: {match.languageSkills.english}
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-600 mt-4 line-clamp-3">
          {match.bio}
        </p>

        {/* Shared Elements */}
        {match.compatibility.sharedElements.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-medium text-gray-700 mb-2">
              {tr.matchCard.sharedInterests}:
            </p>
            <div className="flex flex-wrap gap-1">
              {match.compatibility.sharedElements.slice(0, 4).map(element => {
                const interest = getCulturalInterestById(element);
                return (
                  <span key={element} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {interest ? (language === 'pt' ? interest.namePt : interest.nameEn) : element}
                  </span>
                );
              })}
              {match.compatibility.sharedElements.length > 4 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  +{match.compatibility.sharedElements.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Connection Reasons */}
        {match.compatibility.connectionReasons.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center space-x-1 mb-2">
              <Sparkles className="w-4 h-4 text-primary-500" />
              <p className="text-xs font-medium text-primary-700">
                {tr.matchCard.reasons}:
              </p>
            </div>
            <div className="space-y-1">
              {match.compatibility.connectionReasons.slice(0, 2).map((reason, index) => (
                <p key={index} className="text-xs text-gray-600">
                  • {reason}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-6">
          <button
            onClick={() => setSelectedMatch(match)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {tr.matchCard.viewProfile}
          </button>
          <button
            onClick={() => onStartConversation?.(match.id, match.name)}
            className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-1"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{tr.matchCard.startChat}</span>
          </button>
        </div>

        {/* Last Active */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>
              {tr.matchCard.lastActive} {new Date(match.lastActive).toLocaleDateString(language)}
            </span>
          </div>
          {match.isVerified && (
            <div className="flex items-center space-x-1 text-xs text-green-600">
              <Shield className="w-3 h-3" />
              <span>{tr.matchCard.verified}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  const renderFilters = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{tr.filters.title}</h3>
        <button
          onClick={() => setCurrentView('matches')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Age Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {tr.filters.ageRange}
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="18"
              max="100"
              value={filters.ageRange[0]}
              onChange={(e) => setFilters({
                ...filters,
                ageRange: [parseInt(e.target.value) || 18, filters.ageRange[1]]
              })}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              min="18"
              max="100"
              value={filters.ageRange[1]}
              onChange={(e) => setFilters({
                ...filters,
                ageRange: [filters.ageRange[0], parseInt(e.target.value) || 65]
              })}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Distance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {tr.filters.distance}: {filters.maxDistance}km
          </label>
          <input
            type="range"
            min="5"
            max="100"
            value={filters.maxDistance}
            onChange={(e) => setFilters({
              ...filters,
              maxDistance: parseInt(e.target.value)
            })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Verified Only */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="verified-only"
            checked={filters.verifiedOnly}
            onChange={(e) => setFilters({
              ...filters,
              verifiedOnly: e.target.checked
            })}
            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="verified-only" className="text-sm font-medium text-gray-700">
            {tr.filters.verifiedOnly}
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-6 border-t border-gray-200">
          <button
            onClick={() => setFilters(DEFAULT_MATCHING_FILTERS)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {tr.filters.clear}
          </button>
          <button
            onClick={() => setCurrentView('matches')}
            className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            {tr.filters.apply}
          </button>
        </div>
      </div>
    </div>
  );

  const renderMatchDetail = (match: ExtendedMatchProfile) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {match.name}'s Profile
          </h3>
          <button
            onClick={() => setSelectedMatch(null)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="space-y-6">
          {/* Bio */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">About</h4>
            <p className="text-gray-600">{match.bio}</p>
          </div>

          {/* Compatibility Breakdown */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Compatibility Details</h4>
            <div className="space-y-3">
              {Object.entries(match.compatibility.breakdown).map(([key, score]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 capitalize">
                    {key.replace('_', ' ')}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-primary-500 rounded-full"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">
                      {score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversation Starters */}
          {match.compatibility.recommendedIcebreakers.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">{tr.matchCard.icebreakers}</h4>
              <div className="space-y-2">
                {match.compatibility.recommendedIcebreakers.map((icebreaker, index) => (
                  <div
                    key={index}
                    className="p-3 bg-primary-50 rounded-lg border border-primary-100"
                  >
                    <p className="text-sm text-primary-800">"{icebreaker}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-6 border-t border-gray-200">
            <button
              onClick={() => setSelectedMatch(null)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => onStartConversation?.(match.id, match.name)}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              {tr.matchCard.startChat}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (currentView === 'profile-setup') {
    return (
      <CulturalProfileSetup
        onComplete={handleProfileSetup}
        onClose={() => setCurrentView('matches')}
        className={className}
      />
    );
  }

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{tr.title}</h2>
        <p className="text-gray-600">{tr.subtitle}</p>
      </div>

      {!userProfile ? (
        /* No Profile Setup */
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {tr.noProfile.title}
          </h3>
          <p className="text-gray-600 mb-6">{tr.noProfile.subtitle}</p>
          <button
            onClick={() => setCurrentView('profile-setup')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            {tr.noProfile.button}
          </button>
        </div>
      ) : (
        <>
          {/* Action Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('filters')}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              <div className="text-sm text-gray-600">
                {matches.length} matches found
              </div>
            </div>
            <button
              onClick={() => setCurrentView('profile-setup')}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {currentView === 'filters' ? (
              <motion.div
                key="filters"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {renderFilters()}
              </motion.div>
            ) : selectedMatch ? (
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {renderMatchDetail(selectedMatch)}
              </motion.div>
            ) : (
              <motion.div
                key="matches"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                  </div>
                ) : matches.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {tr.noMatches.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{tr.noMatches.subtitle}</p>
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={() => setFilters({...filters, maxDistance: Math.min(filters.maxDistance * 2, 100)})}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {tr.noMatches.expandSearch}
                      </button>
                      <button
                        onClick={() => setCurrentView('filters')}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                      >
                        {tr.noMatches.adjustFilters}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {matches.map(match => renderMatchCard(match))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Safety Notice */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">{tr.safety.title}</h4>
            <p className="text-sm text-blue-700 mt-1">{tr.safety.subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}