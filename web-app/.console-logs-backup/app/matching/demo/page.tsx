'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  SimpleCulturalMatchingSystem,
  CulturalMessaging,
  CulturalCompatibilityForm
} from '@/components';

export default function MatchingDemoPage() {
  const { t, language } = useLanguage();
  const [currentView, setCurrentView] = useState<'matching' | 'messaging' | 'preferences'>('matching');
  const [selectedMatch, setSelectedMatch] = useState<{ id: string; name: string } | null>(null);

  const handleStartConversation = (matchId: string, matchName: string) => {
    setSelectedMatch({ id: matchId, name: matchName });
    setCurrentView('messaging');
  };

  const handleCloseMessaging = () => {
    setSelectedMatch(null);
    setCurrentView('matching');
  };

  const handlePreferencesComplete = (preferences: any) => {
    console.log('Preferences saved:', preferences);
    setCurrentView('matching');
  };

  const translations = {
    en: {
      title: 'Portuguese Community Matching Demo',
      subtitle: 'Experience our simple cultural matching system',
      nav: {
        matching: 'Find Matches',
        preferences: 'Set Preferences',
        messaging: 'Messaging'
      },
      description: `
        This demo showcases our Simple Cultural Matching System designed specifically 
        for the Portuguese-speaking community in the UK. Features include:
        • Cultural heritage-based matching
        • Portuguese regional preferences
        • Simple interest compatibility
        • Safe community messaging
        • Bilingual support (Portuguese/English)
      `
    },
    pt: {
      title: 'Demo de Matching da Comunidade Portuguesa',
      subtitle: 'Experimente o nosso sistema simples de matching cultural',
      nav: {
        matching: 'Encontrar Matches',
        preferences: 'Definir Preferências',
        messaging: 'Mensagens'
      },
      description: `
        Esta demo mostra o nosso Sistema Simples de Matching Cultural desenhado especificamente 
        para a comunidade lusófona no Reino Unido. Funcionalidades incluem:
        • Matching baseado na herança cultural
        • Preferências regionais portuguesas
        • Compatibilidade simples de interesses
        • Mensagens seguras da comunidade
        • Suporte bilingue (Português/Inglês)
      `
    }
  };

  const tr = translations[language];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{tr.title}</h1>
          <p className="text-gray-600 mb-6">{tr.subtitle}</p>
          
          {/* Description */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <pre className="text-sm text-primary-800 whitespace-pre-wrap font-sans">
                {tr.description}
              </pre>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setCurrentView('matching')}
              className={`px-4 py-2 rounded-lg font-medium ${
                currentView === 'matching'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {tr.nav.matching}
            </button>
            <button
              onClick={() => setCurrentView('preferences')}
              className={`px-4 py-2 rounded-lg font-medium ${
                currentView === 'preferences'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {tr.nav.preferences}
            </button>
            {selectedMatch && (
              <button
                onClick={() => setCurrentView('messaging')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  currentView === 'messaging'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {tr.nav.messaging}
              </button>
            )}
          </div>
        </div>

        {/* Demo Content */}
        <div className="max-w-6xl mx-auto">
          {currentView === 'matching' && (
            <SimpleCulturalMatchingSystem 
              onStartConversation={handleStartConversation}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            />
          )}

          {currentView === 'messaging' && selectedMatch && (
            <div className="flex justify-center">
              <CulturalMessaging
                matchId={selectedMatch.id}
                matchName={selectedMatch.name}
                onClose={handleCloseMessaging}
                className="max-w-md mx-auto shadow-lg"
              />
            </div>
          )}

          {currentView === 'preferences' && (
            <div className="flex justify-center">
              <CulturalCompatibilityForm
                onComplete={handlePreferencesComplete}
                onClose={() => setCurrentView('matching')}
                className="shadow-lg"
              />
            </div>
          )}
        </div>

        {/* Footer note */}
        <div className="text-center mt-12">
          <div className="max-w-lg mx-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Demo Note:</strong> This is a demonstration of the cultural matching system. 
                All profiles and matches are simulated for testing purposes. The actual system will 
                connect real Portuguese community members across the UK.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}