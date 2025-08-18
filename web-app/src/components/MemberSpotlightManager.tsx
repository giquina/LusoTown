"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  VideoCameraIcon, 
  UserIcon,
  CalendarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlayCircleIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import YouTubeAPIService from '@/services/YouTubeAPIService';

interface MemberSpotlight {
  id: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  storyType: 'immigration_journey' | 'business_success' | 'cultural_preservation' | 'community_leadership' | 'intergenerational_story';
  culturalBackground: 'portugal' | 'brazil' | 'angola' | 'mozambique' | 'cape_verde' | 'guinea_bissau' | 'sao_tome_principe' | 'east_timor' | 'mixed';
  storyTitle: string;
  storyDescription: string;
  keyMessages: string[];
  consentGiven: boolean;
  privacyLevel: 'public' | 'community_only' | 'anonymous';
  scheduledDate?: string;
  recordingDate?: string;
  videoUrl?: string;
  youtubeVideoId?: string;
  status: 'pending_consent' | 'consent_given' | 'scheduled' | 'recorded' | 'edited' | 'published' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

interface SpotlightTemplate {
  storyType: string;
  title_pt: string;
  title_en: string;
  description_pt: string;
  description_en: string;
  suggestedQuestions_pt: string[];
  suggestedQuestions_en: string[];
  culturalFocus: string[];
  estimatedDuration: number; // in minutes
}

export default function MemberSpotlightManager() {
  const { language, t } = useLanguage();
  const [spotlights, setSpotlights] = useState<MemberSpotlight[]>([]);
  const [selectedSpotlight, setSelectedSpotlight] = useState<MemberSpotlight | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [templates] = useState<SpotlightTemplate[]>([
    {
      storyType: 'immigration_journey',
      title_pt: 'Jornada de Imigração: De Portugal para Londres',
      title_en: 'Immigration Journey: From Portugal to London',
      description_pt: 'Compartilhe a sua experiência de mudança para Londres, os desafios enfrentados e como se adaptou à vida no Reino Unido.',
      description_en: 'Share your experience of moving to London, the challenges faced and how you adapted to life in the UK.',
      suggestedQuestions_pt: [
        'O que o trouxe para Londres?',
        'Quais foram os maiores desafios iniciais?',
        'Como manteve a sua cultura portuguesa?',
        'Que conselhos daria a outros portugueses?',
        'O que mais ama em Londres agora?'
      ],
      suggestedQuestions_en: [
        'What brought you to London?',
        'What were the biggest initial challenges?',
        'How did you maintain your Portuguese culture?',
        'What advice would you give to other Portuguese?',
        'What do you love most about London now?'
      ],
      culturalFocus: ['adaptation', 'heritage_preservation', 'community_building'],
      estimatedDuration: 15
    },
    {
      storyType: 'business_success',
      title_pt: 'Sucesso Empresarial: Empreendedorismo Português em Londres',
      title_en: 'Business Success: Portuguese Entrepreneurship in London',
      description_pt: 'Conte a história do seu negócio, desde a ideia inicial até ao sucesso, inspirando outros empreendedores portugueses.',
      description_en: 'Tell the story of your business, from initial idea to success, inspiring other Portuguese entrepreneurs.',
      suggestedQuestions_pt: [
        'Como surgiu a ideia do negócio?',
        'Quais foram os principais obstáculos?',
        'Como a sua herança portuguesa influenciou o negócio?',
        'Que apoio recebeu da comunidade?',
        'Quais são os seus planos futuros?'
      ],
      suggestedQuestions_en: [
        'How did the business idea come about?',
        'What were the main obstacles?',
        'How did your Portuguese heritage influence the business?',
        'What support did you receive from the community?',
        'What are your future plans?'
      ],
      culturalFocus: ['entrepreneurship', 'innovation', 'community_support'],
      estimatedDuration: 20
    },
    {
      storyType: 'cultural_preservation',
      title_pt: 'Preservação Cultural: Mantendo Vivas as Tradições Portuguesas',
      title_en: 'Cultural Preservation: Keeping Portuguese Traditions Alive',
      description_pt: 'Mostre como preserva e partilha tradições portuguesas com a comunidade em Londres.',
      description_en: 'Show how you preserve and share Portuguese traditions with the London community.',
      suggestedQuestions_pt: [
        'Que tradições considera mais importantes?',
        'Como as partilha com os filhos/comunidade?',
        'Que mudanças observou ao longo dos anos?',
        'Como adapta tradições ao contexto londrino?',
        'Qual o futuro das tradições portuguesas aqui?'
      ],
      suggestedQuestions_en: [
        'What traditions do you consider most important?',
        'How do you share them with children/community?',
        'What changes have you observed over the years?',
        'How do you adapt traditions to the London context?',
        'What is the future of Portuguese traditions here?'
      ],
      culturalFocus: ['traditions', 'heritage', 'intergenerational_transmission'],
      estimatedDuration: 18
    },
    {
      storyType: 'community_leadership',
      title_pt: 'Liderança Comunitária: Construindo Pontes Culturais',
      title_en: 'Community Leadership: Building Cultural Bridges',
      description_pt: 'Destaque o seu papel na liderança e desenvolvimento da comunidade portuguesa em Londres.',
      description_en: 'Highlight your role in leading and developing the Portuguese community in London.',
      suggestedQuestions_pt: [
        'Como se envolveu na liderança comunitária?',
        'Que projetos considera mais importantes?',
        'Como conecta diferentes gerações?',
        'Que desafios enfrenta a comunidade?',
        'Qual a sua visão para o futuro?'
      ],
      suggestedQuestions_en: [
        'How did you get involved in community leadership?',
        'What projects do you consider most important?',
        'How do you connect different generations?',
        'What challenges does the community face?',
        'What is your vision for the future?'
      ],
      culturalFocus: ['leadership', 'community_development', 'bridge_building'],
      estimatedDuration: 25
    },
    {
      storyType: 'intergenerational_story',
      title_pt: 'História Intergeracional: Passando o Testemunho',
      title_en: 'Intergenerational Story: Passing the Torch',
      description_pt: 'Explore como diferentes gerações da sua família vivenciaram a experiência portuguesa em Londres.',
      description_en: 'Explore how different generations of your family have experienced the Portuguese journey in London.',
      suggestedQuestions_pt: [
        'Como chegaram os primeiros familiares?',
        'Que mudanças observou entre gerações?',
        'Como mantêm a língua portuguesa viva?',
        'Que tradições permanecem/mudaram?',
        'Que legado quer deixar?'
      ],
      suggestedQuestions_en: [
        'How did the first family members arrive?',
        'What changes have you observed between generations?',
        'How do you keep the Portuguese language alive?',
        'What traditions remain/have changed?',
        'What legacy do you want to leave?'
      ],
      culturalFocus: ['family_history', 'generational_change', 'legacy'],
      estimatedDuration: 30
    }
  ]);

  useEffect(() => {
    loadSpotlights();
  }, []);

  const loadSpotlights = async () => {
    try {
      setIsLoading(true);
      // In a real implementation, this would fetch from Supabase
      // For now, we'll use mock data
      const mockSpotlights: MemberSpotlight[] = [
        {
          id: '1',
          memberId: 'user123',
          memberName: 'Maria Silva',
          memberEmail: 'maria@example.com',
          storyType: 'business_success',
          culturalBackground: 'portugal',
          storyTitle: 'Do Sonho ao Sucesso: A Minha Pastelaria em Londres',
          storyDescription: 'Como transformei a paixão pelos pastéis de nata numa pastelaria de sucesso em Borough Market.',
          keyMessages: ['Perseverança', 'Qualidade Autêntica', 'Conexão Cultural'],
          consentGiven: true,
          privacyLevel: 'public',
          scheduledDate: '2025-08-25',
          status: 'scheduled',
          createdAt: '2025-08-18T10:00:00Z',
          updatedAt: '2025-08-18T15:30:00Z'
        },
        {
          id: '2',
          memberId: 'user456',
          memberName: 'João Santos',
          memberEmail: 'joao@example.com',
          storyType: 'cultural_preservation',
          culturalBackground: 'portugal',
          storyTitle: 'Mantendo o Fado Vivo em Londres',
          storyDescription: 'A importância de preservar a tradição do Fado na comunidade portuguesa de Londres.',
          keyMessages: ['Preservação Cultural', 'Música Tradicional', 'Identidade'],
          consentGiven: false,
          privacyLevel: 'community_only',
          status: 'pending_consent',
          createdAt: '2025-08-17T14:20:00Z',
          updatedAt: '2025-08-18T09:15:00Z'
        }
      ];
      setSpotlights(mockSpotlights);
    } catch (error) {
      console.error('Error loading spotlights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSpotlight = async (spotlightData: Partial<MemberSpotlight>) => {
    try {
      // In a real implementation, this would create in Supabase
      const newSpotlight: MemberSpotlight = {
        id: Date.now().toString(),
        memberId: spotlightData.memberId || 'current_user',
        memberName: spotlightData.memberName || 'Current User',
        memberEmail: spotlightData.memberEmail || 'user@example.com',
        storyType: spotlightData.storyType || 'immigration_journey',
        culturalBackground: spotlightData.culturalBackground || 'portugal',
        storyTitle: spotlightData.storyTitle || '',
        storyDescription: spotlightData.storyDescription || '',
        keyMessages: spotlightData.keyMessages || [],
        consentGiven: false,
        privacyLevel: spotlightData.privacyLevel || 'community_only',
        status: 'pending_consent',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setSpotlights(prev => [newSpotlight, ...prev]);
      setShowCreateForm(false);
      
      // Send consent request email (would be implemented with email service)
      await sendConsentRequest(newSpotlight);
    } catch (error) {
      console.error('Error creating spotlight:', error);
    }
  };

  const handleConsentUpdate = async (spotlightId: string, consentGiven: boolean) => {
    try {
      setSpotlights(prev => prev.map(spotlight => 
        spotlight.id === spotlightId 
          ? { 
              ...spotlight, 
              consentGiven,
              status: consentGiven ? 'consent_given' : 'cancelled',
              updatedAt: new Date().toISOString()
            }
          : spotlight
      ));

      if (consentGiven) {
        // Schedule the recording
        await scheduleRecording(spotlightId);
      }
    } catch (error) {
      console.error('Error updating consent:', error);
    }
  };

  const handlePublishToYouTube = async (spotlight: MemberSpotlight) => {
    try {
      if (!spotlight.videoUrl) {
        throw new Error('No video file available for upload');
      }

      const template = templates.find(t => t.storyType === spotlight.storyType);
      if (!template) {
        throw new Error('Template not found');
      }

      // Prepare YouTube upload options
      const uploadOptions = {
        title: spotlight.storyTitle,
        description: spotlight.storyDescription,
        tags: [
          'LusoTown',
          'Portuguese Community',
          'London',
          'Success Story',
          ...spotlight.keyMessages,
          spotlight.culturalBackground,
          spotlight.storyType
        ],
        categoryId: '22', // People & Blogs
        language: 'pt' as const,
        privacy: spotlight.privacyLevel === 'public' ? 'public' as const : 'unlisted' as const,
        culturalContext: spotlight.culturalBackground === 'portugal' ? 'portugal' as const : 
                        spotlight.culturalBackground === 'brazil' ? 'brazil' as const : 'universal' as const,
        portugueseCulturalFocus: true
      };

      // This would upload the video file to YouTube
      // const videoFile = await fetch(spotlight.videoUrl).then(r => r.blob());
      // const youtubeVideo = await YouTubeAPIService.uploadVideo(videoFile, uploadOptions);

      // For now, simulate the upload
      const youtubeVideoId = `mock_video_${Date.now()}`;
      
      setSpotlights(prev => prev.map(s => 
        s.id === spotlight.id 
          ? { 
              ...s, 
              youtubeVideoId,
              status: 'published',
              updatedAt: new Date().toISOString()
            }
          : s
      ));

      // Add to Portuguese cultural playlist
      // await addToSpotlightPlaylist(youtubeVideoId, spotlight.storyType);

    } catch (error) {
      console.error('Error publishing to YouTube:', error);
    }
  };

  const sendConsentRequest = async (spotlight: MemberSpotlight) => {
    // This would send an email with consent form link
    console.log('Sending consent request to:', spotlight.memberEmail);
  };

  const scheduleRecording = async (spotlightId: string) => {
    // This would integrate with calendar/scheduling system
    console.log('Scheduling recording for spotlight:', spotlightId);
  };

  const addToSpotlightPlaylist = async (videoId: string, storyType: string) => {
    // This would add the video to the appropriate playlist
    console.log('Adding to playlist:', videoId, storyType);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'pending_consent': 'text-yellow-600 bg-yellow-100',
      'consent_given': 'text-blue-600 bg-blue-100',
      'scheduled': 'text-purple-600 bg-purple-100',
      'recorded': 'text-indigo-600 bg-indigo-100',
      'edited': 'text-pink-600 bg-pink-100',
      'published': 'text-green-600 bg-green-100',
      'cancelled': 'text-gray-600 bg-gray-100'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      'pending_consent': ExclamationTriangleIcon,
      'consent_given': CheckCircleIcon,
      'scheduled': CalendarIcon,
      'recorded': VideoCameraIcon,
      'edited': DocumentTextIcon,
      'published': GlobeAltIcon,
      'cancelled': ExclamationTriangleIcon
    };
    const Icon = icons[status as keyof typeof icons] || ExclamationTriangleIcon;
    return <Icon className="w-4 h-4" />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {language === 'pt' ? 'Histórias em Destaque' : 'Member Spotlights'}
          </h1>
          <p className="text-gray-600 mt-2">
            {language === 'pt' 
              ? 'Celebre e partilhe histórias inspiradoras da comunidade portuguesa'
              : 'Celebrate and share inspiring stories from the Portuguese community'
            }
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <VideoCameraIcon className="w-5 h-5" />
          {language === 'pt' ? 'Nova História' : 'New Story'}
        </button>
      </div>

      {/* Spotlights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {spotlights.map((spotlight) => (
          <motion.div
            key={spotlight.id}
            layout
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{spotlight.memberName}</h3>
                  <p className="text-sm text-gray-500">{spotlight.culturalBackground}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(spotlight.status)}`}>
                {getStatusIcon(spotlight.status)}
                {language === 'pt' ? 'Estado' : 'Status'}
              </div>
            </div>

            <h4 className="font-medium text-gray-900 mb-2">{spotlight.storyTitle}</h4>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{spotlight.storyDescription}</p>

            {/* Key Messages */}
            <div className="flex flex-wrap gap-2 mb-4">
              {spotlight.keyMessages.map((message, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {message}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {spotlight.scheduledDate && (
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    {new Date(spotlight.scheduledDate).toLocaleDateString()}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <HeartIcon className="w-4 h-4" />
                  {spotlight.privacyLevel}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {spotlight.status === 'pending_consent' && (
                  <>
                    <button
                      onClick={() => handleConsentUpdate(spotlight.id, true)}
                      className="text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      {language === 'pt' ? 'Aprovar' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleConsentUpdate(spotlight.id, false)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      {language === 'pt' ? 'Recusar' : 'Decline'}
                    </button>
                  </>
                )}

                {spotlight.status === 'edited' && (
                  <button
                    onClick={() => handlePublishToYouTube(spotlight)}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-lg font-medium"
                  >
                    {language === 'pt' ? 'Publicar' : 'Publish'}
                  </button>
                )}

                {spotlight.youtubeVideoId && (
                  <button
                    onClick={() => window.open(`https://youtube.com/watch?v=${spotlight.youtubeVideoId}`, '_blank')}
                    className="text-red-600 hover:text-red-700"
                  >
                    <PlayCircleIcon className="w-5 h-5" />
                  </button>
                )}

                <button
                  onClick={() => setSelectedSpotlight(spotlight)}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  {language === 'pt' ? 'Ver Detalhes' : 'View Details'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Form Modal */}
      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowCreateForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {language === 'pt' ? 'Nova História em Destaque' : 'New Member Spotlight'}
                </h2>

                {/* Story Type Templates */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    {language === 'pt' ? 'Tipo de História' : 'Story Type'}
                  </label>
                  {templates.map((template) => (
                    <div
                      key={template.storyType}
                      className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 cursor-pointer transition-colors"
                      onClick={() => {
                        const newSpotlight = {
                          storyType: template.storyType as any,
                          storyTitle: language === 'pt' ? template.title_pt : template.title_en,
                          storyDescription: language === 'pt' ? template.description_pt : template.description_en,
                          keyMessages: template.culturalFocus,
                          culturalBackground: 'portugal' as const
                        };
                        handleCreateSpotlight(newSpotlight);
                      }}
                    >
                      <h4 className="font-medium text-gray-900 mb-2">
                        {language === 'pt' ? template.title_pt : template.title_en}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">
                        {language === 'pt' ? template.description_pt : template.description_en}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>~{template.estimatedDuration} {language === 'pt' ? 'minutos' : 'minutes'}</span>
                        <div className="flex flex-wrap gap-1">
                          {template.culturalFocus.slice(0, 3).map((focus, index) => (
                            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                              {focus}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {language === 'pt' ? 'Cancelar' : 'Cancel'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedSpotlight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedSpotlight(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedSpotlight.storyTitle}</h2>
                  <button
                    onClick={() => setSelectedSpotlight(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                {/* Spotlight Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {language === 'pt' ? 'Membro' : 'Member'}
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium">{selectedSpotlight.memberName}</p>
                        <p className="text-sm text-gray-500">{selectedSpotlight.memberEmail}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {language === 'pt' ? 'Descrição' : 'Description'}
                    </h3>
                    <p className="text-gray-600">{selectedSpotlight.storyDescription}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {language === 'pt' ? 'Mensagens-Chave' : 'Key Messages'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSpotlight.keyMessages.map((message, index) => (
                        <span
                          key={index}
                          className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                        >
                          {message}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedSpotlight.youtubeVideoId && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {language === 'pt' ? 'Vídeo Publicado' : 'Published Video'}
                      </h3>
                      <a
                        href={`https://youtube.com/watch?v=${selectedSpotlight.youtubeVideoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-red-600 hover:text-red-700"
                      >
                        <PlayCircleIcon className="w-5 h-5" />
                        {language === 'pt' ? 'Ver no YouTube' : 'Watch on YouTube'}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}