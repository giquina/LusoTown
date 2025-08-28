'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import MatchesSystem from '@/components/matches/MatchesSystem';
import MessagingInterface from '@/components/MessagingInterface';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Heart, Users, Shield, Sparkles } from 'lucide-react';

export default function CulturalMatchesPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [currentView, setCurrentView] = useState<'matches' | 'chat'>('matches');
  const [selectedMatch, setSelectedMatch] = useState<{
    id: string;
    name: string;
    image?: string;
    location?: string;
    bio?: string;
  } | null>(null);

  const translations = {
    en: {
      title: 'Cultural Matching',
      subtitle: 'Find meaningful connections in the Portuguese-speaking community',
      backToMatches: 'Back to All Matches',
      features: {
        cultural: 'Cultural Compatibility',
        culturalDesc: 'Match with people who share your Portuguese heritage and interests',
        safe: 'Safe & Verified',
        safeDesc: 'All profiles are verified for your security and peace of mind',
        community: 'Community Focus',
        communityDesc: 'Connect with Portuguese speakers across the UK',
        authentic: 'Authentic Connections',
        authenticDesc: 'Share your culture, language, and traditions with like-minded people'
      }
    },
    pt: {
      title: 'Matching Cultural',
      subtitle: 'Encontre conexões significativas na comunidade lusófona',
      backToMatches: 'Voltar a Todos os Matches',
      features: {
        cultural: 'Compatibilidade Cultural',
        culturalDesc: 'Conecte-se com pessoas que partilham a sua herança e interesses portugueses',
        safe: 'Seguro e Verificado',
        safeDesc: 'Todos os perfis são verificados para sua segurança e tranquilidade',
        community: 'Foco na Comunidade',
        communityDesc: 'Conecte-se com lusófonos em todo o Reino Unido',
        authentic: 'Conexões Autênticas',
        authenticDesc: 'Partilhe a sua cultura, idioma e tradições com pessoas afins'
      }
    }
  };

  const tr = translations[language];

  const handleStartConversation = (matchId: string, matchName: string, matchImage?: string, matchLocation?: string, matchBio?: string) => {
    setSelectedMatch({
      id: matchId,
      name: matchName,
      image: matchImage,
      location: matchLocation,
      bio: matchBio
    });
    setCurrentView('chat');
  };

  const handleBackToMatches = () => {
    setCurrentView('matches');
    setSelectedMatch(null);
  };

  if (currentView === 'chat' && selectedMatch) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <MessagingInterface
            targetUserId={selectedMatch.id}
            targetUserName={selectedMatch.name}
            targetUserImage={selectedMatch.image}
            targetUserLocation={selectedMatch.location}
            targetUserBio={selectedMatch.bio}
            onBack={handleBackToMatches}
            className="h-[600px]"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-primary-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <button
              onClick={() => router.push('/matches')}
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{tr.backToMatches}</span>
            </button>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {tr.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {tr.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {tr.features.cultural}
              </h3>
              <p className="text-sm text-gray-600">
                {tr.features.culturalDesc}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {tr.features.safe}
              </h3>
              <p className="text-sm text-gray-600">
                {tr.features.safeDesc}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {tr.features.community}
              </h3>
              <p className="text-sm text-gray-600">
                {tr.features.communityDesc}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {tr.features.authentic}
              </h3>
              <p className="text-sm text-gray-600">
                {tr.features.authenticDesc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Matches System */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MatchesSystem 
            onStartConversation={(matchId, matchName, matchImage, matchLocation, matchBio) => 
              handleStartConversation(matchId, matchName, matchImage, matchLocation, matchBio)
            }
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}