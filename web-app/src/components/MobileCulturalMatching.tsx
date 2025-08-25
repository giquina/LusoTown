"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { 
  HeartIcon,
  XMarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  StarIcon,
  MapPinIcon,
  LanguageIcon,
  MusicalNoteIcon,
  CakeIcon,
  BuildingOffice2Icon,
  AcademicCapIcon,
  HandRaisedIcon,
  SparklesIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon,
  FireIcon as FireSolidIcon
} from '@heroicons/react/24/solid';
import { useLanguage } from '@/context/LanguageContext';

// Lusophone Cultural Matching Interface with Swipe Gestures
interface CulturalMatchingProps {
  profiles?: Array<{
    id: string;
    name: string;
    age: number;
    heritage: string;
    heritageFlag: string;
    location: string;
    languages: string[];
    culturalInterests: string[];
    photo: string;
    compatibility: number;
    culturalConnection: string;
    profession?: string;
    education?: string;
    bio?: string;
    isVerified?: boolean;
  }>;
  onLike?: (profileId: string) => void;
  onPass?: (profileId: string) => void;
  onSuperLike?: (profileId: string) => void;
  onMessage?: (profileId: string) => void;
}

export function MobileCulturalMatching({
  profiles = [],
  onLike,
  onPass,
  onSuperLike,
  onMessage
}: CulturalMatchingProps) {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for drag interactions
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-30, 0, 30]);
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 1, 1, 1, 0]);

  // Sample profiles following Lusophone cultural authenticity
  const sampleProfiles = [
    {
      id: '1',
      name: 'Maria Santos',
      age: 28,
      heritage: 'Portugal/Brazil',
      heritageFlag: '🇵🇹🇧🇷',
      location: 'South London',
      languages: ['Lusophone', 'English', 'Spanish'],
      culturalInterests: ['Fado', 'Bossa Nova', 'Lusophone Literature', 'Brazilian Cuisine'],
      photo: '/api/placeholder/400/600',
      compatibility: 94,
      culturalConnection: language === 'pt' ? 'Forte ligação cultural' : 'Strong cultural connection',
      profession: 'Cultural Events Manager',
      education: 'King\'s College London',
      bio: language === 'pt' 
        ? 'Adoro explorar a riqueza cultural lusófona. Organizo eventos que celebram nossa herança diversa!'
        : 'Love exploring Lusophone cultural richness. I organize events celebrating our diverse heritage!',
      isVerified: true
    },
    {
      id: '2',
      name: 'João Mendes',
      age: 32,
      heritage: 'Cape Verde',
      heritageFlag: '🇨🇻',
      location: 'East London',
      languages: ['Lusophone', 'Crioulo', 'English', 'French'],
      culturalInterests: ['Morna', 'Coladeira', 'Cape Verdean Poetry', 'Island Culture'],
      photo: '/api/placeholder/400/600',
      compatibility: 89,
      culturalConnection: language === 'pt' ? 'Conexão através da música' : 'Connection through music',
      profession: 'Music Producer',
      education: 'University of Arts London',
      bio: language === 'pt'
        ? 'A música cabo-verdiana é a minha paixão. Vamos descobrir os ritmos lusófonos juntos?'
        : 'Cape Verdean music is my passion. Let\'s discover Lusophone rhythms together?',
      isVerified: true
    },
    {
      id: '3',
      name: 'Carla Silva',
      age: 26,
      heritage: 'Angola',
      heritageFlag: '🇦🇴',
      location: 'North London',
      languages: ['Lusophone', 'Kimbundu', 'English'],
      culturalInterests: ['Kizomba', 'Kuduro', 'African Literature', 'Angolan History'],
      photo: '/api/placeholder/400/600',
      compatibility: 92,
      culturalConnection: language === 'pt' ? 'Partilha de raízes africanas' : 'Shared African roots',
      profession: 'International Development',
      education: 'LSE',
      bio: language === 'pt'
        ? 'Orgulhosa das minhas raízes angolanas. Procuro alguém que valorize a diversidade lusófona.'
        : 'Proud of my Angolan roots. Looking for someone who values Lusophone diversity.',
      isVerified: false
    },
    {
      id: '4',
      name: 'Pedro Almeida',
      age: 30,
      heritage: 'Mozambique/Portugal',
      heritageFlag: '🇲🇿🇵🇹',
      location: 'West London',
      languages: ['Lusophone', 'Changana', 'English'],
      culturalInterests: ['Marrabenta', 'Traditional Dance', 'Lusophone Poetry', 'Football'],
      photo: '/api/placeholder/400/600',
      compatibility: 87,
      culturalConnection: language === 'pt' ? 'Herança mista rica' : 'Rich mixed heritage',
      profession: 'Software Engineer',
      education: 'Imperial College',
      bio: language === 'pt'
        ? 'Herança moçambicana e portuguesa. Adoro futebol e música tradicional!'
        : 'Mozambican and Portuguese heritage. Love football and traditional music!',
      isVerified: true
    }
  ];

  const displayProfiles = profiles.length > 0 ? profiles : sampleProfiles;
  const currentProfile = displayProfiles[currentIndex];

  const handleDragEnd = (info: PanInfo) => {
    const threshold = 150;
    const direction = info.offset.x > threshold ? 'right' : info.offset.x < -threshold ? 'left' : null;
    
    if (direction) {
      setIsAnimating(true);
      setDragDirection(direction);
      
      if (direction === 'right') {
        onLike?.(currentProfile.id);
      } else {
        onPass?.(currentProfile.id);
      }
      
      setTimeout(() => {
        moveToNext();
      }, 300);
    } else {
      x.set(0);
    }
  };

  const moveToNext = () => {
    if (currentIndex < displayProfiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to start for demo
    }
    setIsAnimating(false);
    setDragDirection(null);
    x.set(0);
  };

  const handleLike = () => {
    setIsAnimating(true);
    setDragDirection('right');
    onLike?.(currentProfile.id);
    setTimeout(moveToNext, 300);
  };

  const handlePass = () => {
    setIsAnimating(true);
    setDragDirection('left');
    onPass?.(currentProfile.id);
    setTimeout(moveToNext, 300);
  };

  const handleSuperLike = () => {
    onSuperLike?.(currentProfile.id);
    // Add special animation for super like
  };

  const getCulturalCompatibilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  if (!currentProfile) {
    return (
      <div className="flex items-center justify-center h-96 text-center">
        <div>
          <div className="text-6xl mb-4">💝</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {language === 'pt' ? 'Sem mais perfis' : 'No more profiles'}
          </h3>
          <p className="text-gray-600">
            {language === 'pt'
              ? 'Volte mais tarde para descobrir novos membros lusófonos!'
              : 'Come back later to discover new Portuguese-speaking members!'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-cultural-matching relative h-[600px] mx-4">
      {/* Cultural Matching Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2 responsive-portuguese-heading">
          {language === 'pt' ? 'Descobrir Lusófonos' : 'Discover Lusophone Speakers'}
        </h2>
        <p className="text-gray-600 responsive-portuguese-text">
          {language === 'pt'
            ? 'Conecte-se através da cultura e língua portuguesa'
            : 'Connect through Portuguese culture and language'}
        </p>
      </motion.div>

      {/* Profile Card Stack */}
      <div className="relative h-full max-w-sm mx-auto">
        {/* Background Cards for Stack Effect */}
        {displayProfiles.slice(currentIndex + 1, currentIndex + 3).map((profile, index) => (
          <motion.div
            key={`bg-${profile.id}`}
            className="absolute inset-0 bg-white rounded-3xl shadow-lg border border-gray-200"
            style={{
              zIndex: -index - 1,
              scale: 1 - (index + 1) * 0.05,
              y: (index + 1) * 10,
            }}
          />
        ))}

        {/* Main Profile Card */}
        <motion.div
          ref={cardRef}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => handleDragEnd(info)}
          style={{
            x,
            rotate,
            opacity: isAnimating ? (dragDirection === 'right' ? 0 : dragDirection === 'left' ? 0 : 1) : opacity
          }}
          animate={isAnimating ? {
            x: dragDirection === 'right' ? 300 : dragDirection === 'left' ? -300 : 0,
            opacity: dragDirection ? 0 : 1
          } : {}}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute inset-0 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden cursor-grab active:cursor-grabbing"
        >
          {/* Profile Photo */}
          <div className="relative h-2/3 overflow-hidden">
            <div 
              className="w-full h-full bg-gradient-to-br from-red-100 via-yellow-50 to-green-100 flex items-center justify-center"
            >
              <div className="text-8xl">{currentProfile.heritageFlag}</div>
            </div>
            
            {/* Verification Badge */}
            {currentProfile.isVerified && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg"
              >
                <StarSolidIcon className="w-5 h-5" />
              </motion.div>
            )}

            {/* Cultural Compatibility Score */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-4 left-4"
            >
              <div className={`px-3 py-2 rounded-full font-bold text-sm ${getCulturalCompatibilityColor(currentProfile.compatibility)}`}>
                {currentProfile.compatibility}% {language === 'pt' ? 'Compatível' : 'Match'}
              </div>
            </motion.div>

            {/* Drag Indicators */}
            <AnimatePresence>
              {dragDirection && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className={`absolute inset-0 flex items-center justify-center ${
                    dragDirection === 'right' 
                      ? 'bg-green-500/80 text-white' 
                      : 'bg-red-500/80 text-white'
                  }`}
                >
                  <div className="text-center">
                    {dragDirection === 'right' ? (
                      <>
                        <HeartSolidIcon className="w-16 h-16 mx-auto mb-2" />
                        <p className="text-xl font-bold">
                          {language === 'pt' ? 'GOSTO!' : 'LIKE!'}
                        </p>
                      </>
                    ) : (
                      <>
                        <XMarkIcon className="w-16 h-16 mx-auto mb-2" />
                        <p className="text-xl font-bold">
                          {language === 'pt' ? 'PRÓXIMO' : 'PASS'}
                        </p>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Info */}
          <div className="p-6 h-1/3 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900 responsive-portuguese-title">
                  {currentProfile.name}, {currentProfile.age}
                </h3>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{currentProfile.location}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl mb-1">{currentProfile.heritageFlag}</div>
                <p className="text-xs text-gray-500">{currentProfile.heritage}</p>
              </div>
            </div>

            {/* Cultural Connection */}
            <div className="bg-gradient-to-r from-red-50 to-green-50 rounded-xl p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <SparklesIcon className="w-4 h-4 text-red-500" />
                <span className="font-semibold text-sm text-gray-800">
                  {language === 'pt' ? 'Conexão Cultural' : 'Cultural Connection'}
                </span>
              </div>
              <p className="text-sm text-gray-700">{currentProfile.culturalConnection}</p>
            </div>

            {/* Languages */}
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <LanguageIcon className="w-4 h-4 text-gray-600" />
                <span className="font-semibold text-sm text-gray-800">
                  {language === 'pt' ? 'Línguas' : 'Languages'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {currentProfile.languages.map((lang, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Cultural Interests */}
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <MusicalNoteIcon className="w-4 h-4 text-gray-600" />
                <span className="font-semibold text-sm text-gray-800">
                  {language === 'pt' ? 'Interesses Culturais' : 'Cultural Interests'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {currentProfile.culturalInterests.slice(0, 3).map((interest, index) => (
                  <span
                    key={index}
                    className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {interest}
                  </span>
                ))}
                {currentProfile.culturalInterests.length > 3 && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                    +{currentProfile.culturalInterests.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Bio */}
            {currentProfile.bio && (
              <div className="mb-4">
                <p className="text-sm text-gray-700 leading-relaxed responsive-portuguese-text">
                  {currentProfile.bio}
                </p>
              </div>
            )}

            {/* Professional Info */}
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
              {currentProfile.profession && (
                <div className="flex items-center gap-1">
                  <BuildingOffice2Icon className="w-3 h-3" />
                  <span>{currentProfile.profession}</span>
                </div>
              )}
              {currentProfile.education && (
                <div className="flex items-center gap-1">
                  <AcademicCapIcon className="w-3 h-3" />
                  <span>{currentProfile.education}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center justify-center gap-6 mt-8"
      >
        {/* Pass Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePass}
          className="w-14 h-14 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200 lusophone-touch-target"
          aria-label={language === 'pt' ? 'Próximo perfil' : 'Pass profile'}
        >
          <XMarkIcon className="w-7 h-7" />
        </motion.button>

        {/* Super Like Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSuperLike}
          className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg lusophone-touch-target"
          aria-label={language === 'pt' ? 'Super gosto' : 'Super like'}
        >
          <StarSolidIcon className="w-6 h-6" />
        </motion.button>

        {/* Like Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-full flex items-center justify-center shadow-lg lusophone-touch-target"
          aria-label={language === 'pt' ? 'Gostar do perfil' : 'Like profile'}
        >
          <HeartSolidIcon className="w-7 h-7" />
        </motion.button>

        {/* Message Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onMessage?.(currentProfile.id)}
          className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg lusophone-touch-target"
          aria-label={language === 'pt' ? 'Enviar mensagem' : 'Send message'}
        >
          <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" />
        </motion.button>
      </motion.div>

      {/* Progress Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center mt-6"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {currentIndex + 1} / {displayProfiles.length}
          </span>
          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 to-green-500"
              initial={{ width: 0 }}
              animate={{ 
                width: `${((currentIndex + 1) / displayProfiles.length) * 100}%` 
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Cultural Tip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200"
      >
        <div className="flex items-center gap-2 mb-2">
          <FireSolidIcon className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-sm text-blue-800">
            {language === 'pt' ? 'Dica Cultural' : 'Cultural Tip'}
          </span>
        </div>
        <p className="text-sm text-blue-700 responsive-portuguese-text">
          {language === 'pt'
            ? 'Deslize para a direita se há conexão cultural, para a esquerda para próximo perfil!'
            : 'Swipe right for cultural connection, left for next profile!'}
        </p>
      </motion.div>
    </div>
  );
}

export default MobileCulturalMatching;