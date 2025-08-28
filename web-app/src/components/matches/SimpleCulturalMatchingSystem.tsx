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
  User,
  Coffee,
  Music,
  Camera
} from 'lucide-react';

// Import configurations
import { PORTUGUESE_SPEAKING_COUNTRIES } from '@/config/portuguese-countries';
import { CULTURAL_INTEREST_CATEGORIES } from '@/config/cultural-preferences';
import { UK_PORTUGUESE_COMMUNITIES } from '@/config/cultural-preferences';

interface SimpleUserProfile {
  name: string;
  age: number;
  city: string;
  heritage: string[]; // Country codes
  interests: string[]; // Interest IDs
  bio: string;
  language: 'portuguese' | 'bilingual' | 'english';
  verified: boolean;
}

interface SimpleMatch extends SimpleUserProfile {
  id: string;
  compatibility: number;
  distance: string;
  lastActive: string;
  matchReasons: string[];
  conversationStarters: string[];
}

interface SimpleCulturalMatchingSystemProps {
  onStartConversation?: (matchId: string, matchName: string) => void;
  className?: string;
}

export default function SimpleCulturalMatchingSystem({
  onStartConversation,
  className = ''
}: SimpleCulturalMatchingSystemProps) {
  const { t, language } = useLanguage();
  const [hasProfile, setHasProfile] = useState(false);
  const [userProfile, setUserProfile] = useState<SimpleUserProfile | null>(null);
  const [matches, setMatches] = useState<SimpleMatch[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<SimpleMatch | null>(null);
  const [showSetup, setShowSetup] = useState(false);
  const [loading, setLoading] = useState(false);

  // Simple profile setup state
  const [setupStep, setSetupStep] = useState(0);
  const [profileForm, setProfileForm] = useState<SimpleUserProfile>({
    name: '',
    age: 25,
    city: 'London',
    heritage: [],
    interests: [],
    bio: '',
    language: 'bilingual',
    verified: false
  });

  const translations = {
    en: {
      title: 'Find Your Portuguese Community Match',
      subtitle: 'Connect with Portuguese speakers who share your cultural interests',
      setupProfile: 'Set Up Profile',
      findMatches: 'Find Matches',
      noProfile: {
        title: 'Welcome to Cultural Matching!',
        subtitle: 'Create your profile to connect with Portuguese speakers in your area',
        button: 'Get Started'
      },
      setup: {
        steps: ['Basic Info', 'Heritage', 'Interests', 'Complete'],
        name: 'Your Name',
        age: 'Age',
        city: 'City',
        heritage: 'Your Heritage',
        heritageHelp: 'Select countries that represent your cultural background',
        interests: 'Cultural Interests',
        interestsHelp: 'What aspects of Portuguese culture interest you?',
        bio: 'About You',
        bioPlaceholder: 'Tell us about your connection to Portuguese culture...',
        language: 'Language Preference',
        languagePortuguese: 'Mainly Portuguese',
        languageBilingual: 'Portuguese & English',
        languageEnglish: 'Mainly English',
        complete: 'Complete Profile',
        next: 'Next',
        back: 'Back'
      },
      matches: {
        compatibility: 'Match',
        away: 'away',
        reasons: 'Why you match',
        starters: 'Ice breakers',
        viewProfile: 'View Profile',
        sayHello: 'Say Hello',
        noMatches: 'No matches yet',
        noMatchesDesc: 'Try expanding your preferences or check back later'
      },
      profile: {
        from: 'From',
        interests: 'Interests',
        about: 'About',
        language: 'Languages',
        verified: 'Verified Community Member',
        close: 'Close'
      }
    },
    pt: {
      title: 'Encontre o Seu Match na Comunidade Portuguesa',
      subtitle: 'Conecte-se com lusófonos que partilham os seus interesses culturais',
      setupProfile: 'Configurar Perfil',
      findMatches: 'Encontrar Matches',
      noProfile: {
        title: 'Bem-vindo ao Matching Cultural!',
        subtitle: 'Crie o seu perfil para se conectar com lusófonos na sua área',
        button: 'Começar'
      },
      setup: {
        steps: ['Info Básica', 'Herança', 'Interesses', 'Completar'],
        name: 'Seu Nome',
        age: 'Idade',
        city: 'Cidade',
        heritage: 'Sua Herança Cultural',
        heritageHelp: 'Selecione países que representam a sua origem cultural',
        interests: 'Interesses Culturais',
        interestsHelp: 'Que aspetos da cultura portuguesa lhe interessam?',
        bio: 'Sobre Si',
        bioPlaceholder: 'Fale-nos sobre a sua ligação à cultura portuguesa...',
        language: 'Preferência de Idioma',
        languagePortuguese: 'Principalmente Português',
        languageBilingual: 'Português e Inglês',
        languageEnglish: 'Principalmente Inglês',
        complete: 'Completar Perfil',
        next: 'Próximo',
        back: 'Voltar'
      },
      matches: {
        compatibility: 'Match',
        away: 'de distância',
        reasons: 'Por que são compatíveis',
        starters: 'Para quebrar o gelo',
        viewProfile: 'Ver Perfil',
        sayHello: 'Dizer Olá',
        noMatches: 'Ainda sem matches',
        noMatchesDesc: 'Tente expandir as suas preferências ou volte mais tarde'
      },
      profile: {
        from: 'De',
        interests: 'Interesses',
        about: 'Sobre',
        language: 'Idiomas',
        verified: 'Membro Verificado da Comunidade',
        close: 'Fechar'
      }
    }
  };

  const tr = translations[language];

  // Generate mock matches based on profile
  const generateMatches = (profile: SimpleUserProfile): SimpleMatch[] => {
    const mockMatches: SimpleMatch[] = [
      {
        id: '1',
        name: 'Maria Santos',
        age: 29,
        city: 'London',
        heritage: ['PT'],
        interests: ['fado', 'portuguese_cuisine', 'community_events'],
        bio: 'Portuguese from Porto, living in London for 5 years. Love exploring the city and meeting people from our community.',
        language: 'bilingual',
        verified: true,
        compatibility: 92,
        distance: '2.5 km',
        lastActive: '1 hour ago',
        matchReasons: [
          language === 'pt' ? 'Ambos são de Portugal' : 'Both from Portugal',
          language === 'pt' ? 'Interessados em culinária portuguesa' : 'Both interested in Portuguese cuisine'
        ],
        conversationStarters: [
          language === 'pt' ? 'Qual é o seu restaurante português favorito em Londres?' : "What's your favorite Portuguese restaurant in London?",
          language === 'pt' ? 'Já foi aos Santos Populares aqui?' : 'Have you been to Santos Populares here?'
        ]
      },
      {
        id: '2',
        name: 'João Silva',
        age: 32,
        city: 'London',
        heritage: ['BR'],
        interests: ['brazilian_music', 'networking', 'community_events'],
        bio: 'Brazilian software engineer, passionate about connecting our Portuguese-speaking community in London.',
        language: 'bilingual',
        verified: true,
        compatibility: 85,
        distance: '4.2 km',
        lastActive: '3 hours ago',
        matchReasons: [
          language === 'pt' ? 'Ambos interessados em eventos comunitários' : 'Both interested in community events',
          language === 'pt' ? 'Falam português e inglês' : 'Both speak Portuguese and English'
        ],
        conversationStarters: [
          language === 'pt' ? 'Como tem sido a experiência como brasileiro em Londres?' : 'How has your experience been as a Brazilian in London?',
          language === 'pt' ? 'Conhece eventos da comunidade lusófona aqui?' : 'Do you know about Portuguese-speaking community events here?'
        ]
      },
      {
        id: '3',
        name: 'Ana Costa',
        age: 27,
        city: 'London',
        heritage: ['CV'],
        interests: ['african_lusophone_cuisine', 'cultural_education', 'community_events'],
        bio: 'Cape Verdean educator passionate about preserving our cultural heritage and building community connections.',
        language: 'bilingual',
        verified: true,
        compatibility: 78,
        distance: '6.1 km',
        lastActive: '5 hours ago',
        matchReasons: [
          language === 'pt' ? 'Ambos valorizam a educação cultural' : 'Both value cultural education',
          language === 'pt' ? 'Interessados na comunidade lusófona' : 'Both interested in Portuguese-speaking community'
        ],
        conversationStarters: [
          language === 'pt' ? 'Como celebra a cultura cabo-verdiana em Londres?' : 'How do you celebrate Cape Verdean culture in London?',
          language === 'pt' ? 'Trabalha na área da educação?' : 'Do you work in education?'
        ]
      }
    ];

    // Filter matches based on profile compatibility
    return mockMatches.filter(match => {
      // Simple compatibility logic
      const hasSharedHeritage = match.heritage.some(h => profile.heritage.includes(h));
      const hasSharedInterests = match.interests.some(i => profile.interests.includes(i));
      const languageMatch = match.language === profile.language || 
                           match.language === 'bilingual' || 
                           profile.language === 'bilingual';
      
      return hasSharedHeritage || hasSharedInterests || languageMatch;
    }).sort((a, b) => b.compatibility - a.compatibility);
  };

  const handleProfileComplete = () => {
    setUserProfile(profileForm);
    setHasProfile(true);
    setShowSetup(false);
    
    // Generate matches
    const newMatches = generateMatches(profileForm);
    setMatches(newMatches);
  };

  const renderProfileSetup = () => (
    <div className="max-w-md mx-auto bg-white rounded-lg border border-gray-200 p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {tr.setupProfile}
        </h3>
        <div className="flex justify-center space-x-2 mb-4">
          {tr.setup.steps.map((step, index) => (
            <div key={index} className={`w-8 h-1 rounded-full ${
              index <= setupStep ? 'bg-primary-500' : 'bg-gray-200'
            }`} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {setupStep === 0 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {tr.setup.name}
              </label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {tr.setup.age}
              </label>
              <input
                type="number"
                min="18"
                max="100"
                value={profileForm.age}
                onChange={(e) => setProfileForm({...profileForm, age: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {tr.setup.city}
              </label>
              <select
                value={profileForm.city}
                onChange={(e) => setProfileForm({...profileForm, city: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {UK_PORTUGUESE_COMMUNITIES.map(city => (
                  <option key={city.city} value={city.city}>{city.city}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {setupStep === 1 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {tr.setup.heritage}
              </label>
              <p className="text-sm text-gray-500 mb-3">{tr.setup.heritageHelp}</p>
              <div className="grid grid-cols-2 gap-2">
                {PORTUGUESE_SPEAKING_COUNTRIES.slice(0, 6).map(country => (
                  <button
                    key={country.code}
                    onClick={() => {
                      const isSelected = profileForm.heritage.includes(country.code);
                      setProfileForm({
                        ...profileForm,
                        heritage: isSelected
                          ? profileForm.heritage.filter(h => h !== country.code)
                          : [...profileForm.heritage, country.code]
                      });
                    }}
                    className={`p-2 rounded-lg border text-sm text-left ${
                      profileForm.heritage.includes(country.code)
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{country.flag}</span>
                      <span>{language === 'pt' ? country.namePortuguese : country.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {setupStep === 2 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {tr.setup.interests}
              </label>
              <p className="text-sm text-gray-500 mb-3">{tr.setup.interestsHelp}</p>
              <div className="space-y-3">
                {CULTURAL_INTEREST_CATEGORIES.slice(0, 4).map(category => (
                  <div key={category.id} className="border rounded-lg p-3">
                    <div className="font-medium text-sm mb-2 flex items-center space-x-1">
                      <span>{category.icon}</span>
                      <span>{language === 'pt' ? category.namePt : category.nameEn}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {category.interests.slice(0, 4).map(interest => (
                        <button
                          key={interest.id}
                          onClick={() => {
                            const isSelected = profileForm.interests.includes(interest.id);
                            setProfileForm({
                              ...profileForm,
                              interests: isSelected
                                ? profileForm.interests.filter(i => i !== interest.id)
                                : [...profileForm.interests, interest.id]
                            });
                          }}
                          className={`p-1 rounded text-xs ${
                            profileForm.interests.includes(interest.id)
                              ? 'bg-primary-100 text-primary-700'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {interest.emoji} {language === 'pt' ? interest.namePt : interest.nameEn}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {setupStep === 3 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {tr.setup.bio}
              </label>
              <textarea
                value={profileForm.bio}
                onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                placeholder={tr.setup.bioPlaceholder}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {tr.setup.language}
              </label>
              <div className="space-y-2">
                {[
                  { value: 'portuguese', label: tr.setup.languagePortuguese },
                  { value: 'bilingual', label: tr.setup.languageBilingual },
                  { value: 'english', label: tr.setup.languageEnglish }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setProfileForm({...profileForm, language: option.value as any})}
                    className={`w-full p-2 rounded-lg border text-sm text-left ${
                      profileForm.language === option.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex justify-between items-center mt-6 pt-4 border-t">
        {setupStep > 0 ? (
          <button
            onClick={() => setSetupStep(setupStep - 1)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            {tr.setup.back}
          </button>
        ) : (
          <button
            onClick={() => setShowSetup(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        )}

        <button
          onClick={() => {
            if (setupStep < 3) {
              setSetupStep(setupStep + 1);
            } else {
              handleProfileComplete();
            }
          }}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          {setupStep < 3 ? tr.setup.next : tr.setup.complete}
        </button>
      </div>
    </div>
  );

  const renderMatchCard = (match: SimpleMatch) => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start space-x-3 mb-3">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-primary-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{match.name}, {match.age}</h3>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-600">{match.compatibility}%</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{match.distance} {tr.matches.away}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{match.lastActive}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Heritage flags */}
        <div className="flex items-center space-x-1 mb-2">
          {match.heritage.map(code => {
            const country = PORTUGUESE_SPEAKING_COUNTRIES.find(c => c.code === code);
            return country ? <span key={code} className="text-lg">{country.flag}</span> : null;
          })}
          {match.verified && <Shield className="w-4 h-4 text-green-500" />}
        </div>

        {/* Bio preview */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{match.bio}</p>

        {/* Match reasons */}
        <div className="mb-3">
          <div className="flex items-center space-x-1 mb-1">
            <Sparkles className="w-3 h-3 text-primary-500" />
            <span className="text-xs font-medium text-primary-700">{tr.matches.reasons}:</span>
          </div>
          <div className="space-y-1">
            {match.matchReasons.slice(0, 2).map((reason, index) => (
              <p key={index} className="text-xs text-gray-600">• {reason}</p>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedMatch(match)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
          >
            {tr.matches.viewProfile}
          </button>
          <button
            onClick={() => onStartConversation?.(match.id, match.name)}
            className="flex-1 px-3 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 flex items-center justify-center space-x-1"
          >
            <MessageCircle className="w-3 h-3" />
            <span>{tr.matches.sayHello}</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderMatchProfile = (match: SimpleMatch) => (
    <div className="max-w-md mx-auto bg-white rounded-lg border border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{match.name}'s Profile</h3>
          <button
            onClick={() => setSelectedMatch(null)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Basic info */}
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h4 className="font-semibold">{match.name}, {match.age}</h4>
              <p className="text-sm text-gray-600">{match.city}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-600 font-medium">{match.compatibility}% {tr.matches.compatibility}</span>
              </div>
            </div>
          </div>

          {/* Heritage */}
          <div>
            <h5 className="font-medium text-gray-900 mb-2">{tr.profile.from}:</h5>
            <div className="flex flex-wrap gap-2">
              {match.heritage.map(code => {
                const country = PORTUGUESE_SPEAKING_COUNTRIES.find(c => c.code === code);
                return country ? (
                  <span key={code} className="px-2 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
                    {country.flag} {language === 'pt' ? country.namePortuguese : country.name}
                  </span>
                ) : null;
              })}
            </div>
          </div>

          {/* About */}
          <div>
            <h5 className="font-medium text-gray-900 mb-2">{tr.profile.about}:</h5>
            <p className="text-sm text-gray-600">{match.bio}</p>
          </div>

          {/* Ice breakers */}
          <div>
            <h5 className="font-medium text-gray-900 mb-2">{tr.matches.starters}:</h5>
            <div className="space-y-2">
              {match.conversationStarters.map((starter, index) => (
                <div key={index} className="p-2 bg-primary-50 rounded-lg border border-primary-100">
                  <p className="text-sm text-primary-800">"{starter}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Verification */}
          {match.verified && (
            <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-800">{tr.profile.verified}</span>
            </div>
          )}

          {/* Action button */}
          <button
            onClick={() => onStartConversation?.(match.id, match.name)}
            className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{tr.matches.sayHello}</span>
          </button>
        </div>
      </div>
    </div>
  );

  if (selectedMatch) {
    return (
      <div className={`max-w-4xl mx-auto ${className}`}>
        {renderMatchProfile(selectedMatch)}
      </div>
    );
  }

  if (showSetup) {
    return (
      <div className={`max-w-4xl mx-auto ${className}`}>
        {renderProfileSetup()}
      </div>
    );
  }

  if (!hasProfile) {
    return (
      <div className={`max-w-4xl mx-auto text-center py-12 ${className}`}>
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{tr.noProfile.title}</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">{tr.noProfile.subtitle}</p>
        <button
          onClick={() => setShowSetup(true)}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
        >
          {tr.noProfile.button}
        </button>
      </div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{tr.title}</h2>
        <p className="text-gray-600">{tr.subtitle}</p>
      </div>

      {/* Matches */}
      {matches.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.map(match => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: matches.indexOf(match) * 0.1 }}
            >
              {renderMatchCard(match)}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{tr.matches.noMatches}</h3>
          <p className="text-gray-600">{tr.matches.noMatchesDesc}</p>
        </div>
      )}

      {/* Profile management */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-center">
        <button
          onClick={() => setShowSetup(true)}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          <Settings className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>
      </div>
    </div>
  );
}