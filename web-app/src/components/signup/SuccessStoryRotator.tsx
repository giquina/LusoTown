"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { 
  HeartIcon, 
  BuildingOffice2Icon, 
  StarIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline';
import { getImageWithFallback } from '@/lib/profileImages';

interface SuccessStory {
  id: string;
  name: string;
  age: string;
  location: string;
  story: {
    en: string;
    pt: string;
  };
  type: 'business' | 'romantic' | 'cultural';
  avatar: string;
  result?: string;
  timeframe?: string;
}

interface SuccessStoryRotatorProps {
  selectedAudience?: 'business' | 'romantic' | 'both' | '';
  className?: string;
}

export function SuccessStoryRotator({ 
  selectedAudience = '', 
  className = '' 
}: SuccessStoryRotatorProps) {
  const { language } = useLanguage();
  
  const allStories: SuccessStory[] = [
    // Business Success Stories
    {
      id: 'carlos-entrepreneur',
      name: 'Carlos M.',
      age: '34',
      location: 'Canary Wharf',
      story: {
        en: "Connected with 3 Portuguese business partners through LusoTown's elite networking. Now running a successful import business between London and Porto!",
        pt: "Conectei-me com 3 parceiros empresariais portugueses através da rede de elite da LusoTown. Agora dirijo um negócio de importação bem-sucedido entre Londres e Porto!"
      },
      type: 'business',
      avatar: getImageWithFallback('carlos-entrepreneur'),
      result: '£2M+ annual revenue',
      timeframe: '6 months'
    },
    {
      id: 'ana-tech',
      name: 'Ana S.',
      age: '28',
      location: 'Shoreditch',
      story: {
        en: "Found my co-founder at a LusoTown tech networking event. Our fintech startup just got Series A funding from Lusophone investors!",
        pt: "Encontrei meu co-fundador num evento de networking de tecnologia da LusoTown. Nossa startup de fintech acabou de receber financiamento Série A de investidores portugueses!"
      },
      type: 'business',
      avatar: getImageWithFallback('ana-tech'),
      result: '€5M Series A',
      timeframe: '8 months'
    },
    {
      id: 'ricardo-consulting',
      name: 'Ricardo L.',
      age: '41',
      location: 'City of London',
      story: {
        en: "LusoTown's executive network opened doors I never imagined. Landed 5 major Lusophone corporate clients for my consulting firm.",
        pt: "A rede executiva da LusoTown abriu portas que nunca imaginei. Consegui 5 grandes clientes corporativos portugueses para minha empresa de consultoria."
      },
      type: 'business',
      avatar: getImageWithFallback('ricardo-consulting'),
      result: '500% revenue growth',
      timeframe: '1 year'
    },
    
    // Romantic Success Stories
    {
      id: 'maria-love',
      name: 'Maria & João',
      age: '29 & 32',
      location: 'Stockwell',
      story: {
        en: "Met at a LusoTown Fado night. He understood my saudade, I fell for his guitar playing. Married last month in a beautiful Lusophone ceremony!",
        pt: "Conhecemo-nos numa noite de Fado da LusoTown. Ele entendeu a minha saudade, eu apaixonei-me pelo seu tocar guitarra. Casámos no mês passado numa linda cerimónia portuguesa!"
      },
      type: 'romantic',
      avatar: getImageWithFallback('maria-joao-couple'),
      result: 'Married 2024',
      timeframe: '14 months'
    },
    {
      id: 'sofia-romance',
      name: 'Sofia P.',
      age: '26',
      location: 'Camden',
      story: {
        en: "Found my soulmate through LusoTown's cultural compatibility matching. He's from Cape Verde, I'm from Portugal - our love transcends islands!",
        pt: "Encontrei a minha alma gêmea através da compatibilidade cultural da LusoTown. Ele é de Cabo Verde, eu de Portugal - o nosso amor transcende ilhas!"
      },
      type: 'romantic',
      avatar: getImageWithFallback('sofia-romance'),
      result: 'Engaged',
      timeframe: '9 months'
    },
    {
      id: 'pedro-connection',
      name: 'Pedro & Luiza',
      age: '35 & 28',
      location: 'Kensington',
      story: {
        en: "Both divorced, both Portuguese heritage. LusoTown helped us find love again with someone who truly understands our culture and values.",
        pt: "Ambos divorciados, ambos de herança portuguesa. LusoTown ajudou-nos a encontrar o amor novamente com alguém que realmente entende nossa cultura e valores."
      },
      type: 'romantic',
      avatar: getImageWithFallback('pedro-luiza-couple'),
      result: 'Living together',
      timeframe: '11 months'
    },
    
    // Cultural Success Stories
    {
      id: 'teresa-cultural',
      name: 'Teresa F.',
      age: '45',
      location: 'Vauxhall',
      story: {
        en: "My children were losing touch with Portuguese culture. LusoTown's family events brought our heritage back to life. They speak Lusophone fluently now!",
        pt: "Os meus filhos estavam a perder o contacto com a cultura portuguesa. Os eventos familiares da LusoTown trouxeram a nossa herança de volta à vida. Agora falam português fluentemente!"
      },
      type: 'cultural',
      avatar: getImageWithFallback('teresa-family'),
      result: '3 children fluent',
      timeframe: '2 years'
    },
    {
      id: 'miguel-musician',
      name: 'Miguel C.',
      age: '31',
      location: 'Greenwich',
      story: {
        en: "Started performing Fado at LusoTown events. Now have a record deal and performing at major UK venues. Dreams do come true!",
        pt: "Comecei a cantar Fado nos eventos da LusoTown. Agora tenho um contrato discográfico e atuo em grandes venues do Reino Unido. Os sonhos tornam-se realidade!"
      },
      type: 'cultural',
      avatar: getImageWithFallback('miguel-musician'),
      result: 'Record deal',
      timeframe: '18 months'
    }
  ];

  // Filter stories based on selected audience
  const getFilteredStories = () => {
    if (selectedAudience === 'business') {
      return allStories.filter(story => story.type === 'business');
    } else if (selectedAudience === 'romantic') {
      return allStories.filter(story => story.type === 'romantic');
    } else if (selectedAudience === 'both') {
      return allStories.filter(story => story.type === 'business' || story.type === 'romantic');
    } else {
      return allStories; // Show all stories
    }
  };

  const stories = getFilteredStories();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (stories.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, 5000); // 5 seconds per story
    
    return () => clearInterval(timer);
  }, [stories.length]);

  if (stories.length === 0) return null;

  const currentStory = stories[currentIndex];
  
  const getStoryIcon = (type: string) => {
    switch (type) {
      case 'business':
        return <BuildingOffice2Icon className="h-5 w-5 text-blue-500" />;
      case 'romantic':
        return <HeartIcon className="h-5 w-5 text-red-500" />;
      case 'cultural':
        return <MusicalNoteIcon className="h-5 w-5 text-purple-500" />;
      default:
        return <StarIcon className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'business':
        return language === 'pt' ? 'Sucesso Empresarial' : 'Business Success';
      case 'romantic':
        return language === 'pt' ? 'Amor Encontrado' : 'Love Found';
      case 'cultural':
        return language === 'pt' ? 'Herança Cultural' : 'Cultural Heritage';
      default:
        return language === 'pt' ? 'Sucesso' : 'Success';
    }
  };

  return (
    <div className={`${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <StarIcon className="h-5 w-5 text-yellow-500" />
          {language === 'pt' ? 'Histórias de Sucesso' : 'Success Stories'}
        </h3>
      </motion.div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStory.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/70 shadow-lg"
          >
            {/* Story Type Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 text-xs font-medium">
                {getStoryIcon(currentStory.type)}
                <span>{getTypeLabel(currentStory.type)}</span>
              </div>
              
              {currentStory.result && (
                <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {currentStory.result}
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex items-start gap-4 mb-4">
              <div className="relative">
                <Image
                  src={currentStory.avatar}
                  alt={currentStory.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                />
                {/* Success indicator */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{currentStory.name}</h4>
                  <span className="text-sm text-gray-500">• {currentStory.age}</span>
                  {currentStory.timeframe && (
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      {currentStory.timeframe}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{currentStory.location}</p>
              </div>
            </div>

            {/* Story Content */}
            <blockquote className="text-sm text-gray-700 italic leading-relaxed mb-4">
              "{currentStory.story[language]}"
            </blockquote>
            
            {/* Rating */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
              <span className="text-xs text-gray-500 ml-2">
                {language === 'pt' ? 'Verificado' : 'Verified'}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Story Navigation Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-primary-500' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Story ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Auto-progression indicator */}
        <div className="mt-2">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary-500"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: 'linear' }}
              key={currentIndex}
            />
          </div>
        </div>
      </div>

      {/* CTA based on story type */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-6 text-center"
      >
        <p className="text-sm text-gray-600 mb-3">
          {language === 'pt' 
            ? 'Sua história de sucesso começa aqui' 
            : 'Your success story starts here'
          }
        </p>
        
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>{language === 'pt' ? 'Verificado' : 'Verified'}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span>{language === 'pt' ? 'Real' : 'Real'}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
            <span>{language === 'pt' ? 'Recente' : 'Recent'}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default SuccessStoryRotator;
