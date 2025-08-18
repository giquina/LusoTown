"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  VideoCameraIcon,
  PlayCircleIcon,
  CalendarDaysIcon,
  UserIcon,
  MapPinIcon,
  ClockIcon,
  LanguageIcon,
  SparklesIcon,
  DocumentTextIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/context/LanguageContext';
import { Event } from '@/types/event';
import YouTubeAPIService from '@/services/YouTubeAPIService';

interface EventPreview {
  id: string;
  eventId: string;
  event: Event;
  previewTitle: string;
  previewDescription: string;
  hostIntroScript: string;
  culturalHighlights: string[];
  expectedAtmosphere: string;
  whatToExpect: string[];
  dressCode?: string;
  languageInfo: string;
  accessibilityInfo?: string;
  videoUrl?: string;
  youtubeVideoId?: string;
  thumbnailUrl?: string;
  status: 'draft' | 'script_ready' | 'recorded' | 'edited' | 'published';
  scheduledPublishDate?: string;
  viewCount: number;
  engagementScore: number;
  createdAt: string;
  updatedAt: string;
}

interface PreviewTemplate {
  eventType: string;
  scriptTemplate_pt: string;
  scriptTemplate_en: string;
  suggestedHighlights_pt: string[];
  suggestedHighlights_en: string[];
  estimatedDuration: number;
  recommendedTags: string[];
}

export default function EventPreviewGenerator() {
  const { language, t } = useLanguage();
  const [eventPreviews, setEventPreviews] = useState<EventPreview[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<EventPreview | null>(null);
  const [showGenerator, setShowGenerator] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const [previewTemplates] = useState<PreviewTemplate[]>([
    {
      eventType: 'fado_night',
      scriptTemplate_pt: `Olá, sou {hostName} e vou ser o vosso anfitrião para uma noite mágica de Fado autêntico em {location}.

Esta noite especial vai transportar-vos para as ruas de Alfama, onde cada nota conta uma história de saudade e paixão. Vamos ter fadistas excepcionais que vão interpretar os grandes clássicos e algumas composições mais recentes.

O que vos espera:
- Performances ao vivo de Fado tradicional
- Ambiente intimista com iluminação suave
- Petiscos portugueses tradicionais
- Vinho português cuidadosamente selecionado
- Uma comunidade que partilha o amor pela cultura portuguesa

Venham preparados para sentir a alma portuguesa através da música que melhor nos representa.`,

      scriptTemplate_en: `Hello, I'm {hostName} and I'll be your host for a magical evening of authentic Fado in {location}.

This special night will transport you to the streets of Alfama, where every note tells a story of longing and passion. We'll have exceptional fadistas performing the great classics and some more recent compositions.

What awaits you:
- Live traditional Fado performances
- Intimate atmosphere with soft lighting
- Traditional Portuguese petiscos
- Carefully selected Portuguese wine
- A community that shares love for Portuguese culture

Come prepared to feel the Portuguese soul through the music that best represents us.`,

      suggestedHighlights_pt: [
        'Fadistas autênticos de Lisboa',
        'Ambiente tradicional português',
        'Petiscos e vinhos selecionados',
        'Comunidade apaixonada pelo Fado',
        'Noite de saudade e emoção'
      ],
      suggestedHighlights_en: [
        'Authentic fadistas from Lisbon',
        'Traditional Portuguese atmosphere',
        'Selected petiscos and wines',
        'Community passionate about Fado',
        'Night of saudade and emotion'
      ],
      estimatedDuration: 3,
      recommendedTags: ['Fado', 'Portuguese Music', 'Traditional', 'Cultural Heritage', 'Lisbon', 'Authentic']
    },
    {
      eventType: 'portuguese_cooking',
      scriptTemplate_pt: `Bem-vindos à nossa cozinha portuguesa! Sou {hostName} e hoje vamos embarcar numa viagem culinária pelas tradições gastronómicas de Portugal.

Vamos preparar juntos pratos que carregam séculos de história e sabor. Cada receita que vamos partilhar foi passada de geração em geração, e hoje vocês vão levar essas tradições para as vossas casas em Londres.

O que vamos cozinhar:
- {mainDish} - com todos os segredos tradicionais
- Acompanhamentos autênticos
- Sobremesa típica portuguesa
- Dicas para encontrar ingredientes em Londres

Preparem-se para uma experiência sensorial completa, onde cada aroma vos vai transportar para Portugal.`,

      scriptTemplate_en: `Welcome to our Portuguese kitchen! I'm {hostName} and today we're embarking on a culinary journey through Portugal's gastronomic traditions.

Together we'll prepare dishes that carry centuries of history and flavor. Each recipe we'll share has been passed down through generations, and today you'll take these traditions to your homes in London.

What we'll cook:
- {mainDish} - with all the traditional secrets
- Authentic accompaniments
- Typical Portuguese dessert
- Tips for finding ingredients in London

Get ready for a complete sensory experience, where each aroma will transport you to Portugal.`,

      suggestedHighlights_pt: [
        'Receitas familiares tradicionais',
        'Ingredientes autênticos portugueses',
        'Técnicas culinárias ancestrais',
        'Partilha de histórias familiares',
        'Sabores da infância em Portugal'
      ],
      suggestedHighlights_en: [
        'Traditional family recipes',
        'Authentic Portuguese ingredients',
        'Ancestral culinary techniques',
        'Sharing family stories',
        'Childhood flavors from Portugal'
      ],
      estimatedDuration: 4,
      recommendedTags: ['Portuguese Cuisine', 'Cooking Class', 'Traditional Recipes', 'Family Heritage', 'Cultural Food']
    },
    {
      eventType: 'santos_populares',
      scriptTemplate_pt: `Olá pessoal! Sou {hostName} e estou aqui para vos apresentar a nossa celebração dos Santos Populares aqui em Londres!

Vamos recriar a magia das festas de junho portuguesas, com toda a alegria, cor e tradição que caracterizam estas celebrações únicas. Mesmo longe de casa, vamos manter vivas as nossas tradições mais queridas.

O que nos espera:
- Decorações tradicionais com manjericos e bandeirolas
- Música popular portuguesa ao vivo
- Sardinhas assadas e broa de milho
- Quadras populares e marchas
- Fogueira simbólica (adaptada ao espaço londrino)

Tragam a vossa alegria e preparem-se para uma noite que vai cheirar a sardinha assada e soar a acordeão!`,

      scriptTemplate_en: `Hello everyone! I'm {hostName} and I'm here to present our Santos Populares celebration here in London!

We'll recreate the magic of Portuguese June festivals, with all the joy, color and tradition that characterize these unique celebrations. Even far from home, we'll keep alive our most beloved traditions.

What awaits us:
- Traditional decorations with basil plants and bunting
- Live Portuguese folk music
- Grilled sardines and corn bread
- Popular verses and marches
- Symbolic bonfire (adapted to London space)

Bring your joy and get ready for a night that will smell of grilled sardines and sound of accordion!`,

      suggestedHighlights_pt: [
        'Tradições de junho portuguesas',
        'Música e dança popular',
        'Gastronomia típica das festas',
        'Decoração tradicional',
        'Comunidade reunida em festa'
      ],
      suggestedHighlights_en: [
        'Portuguese June traditions',
        'Folk music and dance',
        'Traditional festival food',
        'Traditional decorations',
        'Community gathered in celebration'
      ],
      estimatedDuration: 5,
      recommendedTags: ['Santos Populares', 'Portuguese Festival', 'June Celebrations', 'Folk Tradition', 'Community']
    },
    {
      eventType: 'business_networking',
      scriptTemplate_pt: `Bem-vindos ao networking profissional da comunidade portuguesa! Sou {hostName} e acredito firmemente no poder das conexões autênticas para o sucesso empresarial.

Este evento é mais do que networking tradicional - é sobre criar uma rede de apoio dentro da nossa comunidade, onde partilhamos não apenas oportunidades de negócio, mas também os valores e a perspetiva portuguesa no mundo empresarial britânico.

O que vos espera:
- Apresentações de negócios inovadores portugueses
- Sessões de networking estruturado
- Partilha de experiências e desafios
- Oportunidades de mentoria
- Ambiente descontraído com petiscos portugueses

Venham preparados para conectar, colaborar e crescer juntos!`,

      scriptTemplate_en: `Welcome to the Portuguese community professional networking! I'm {hostName} and I firmly believe in the power of authentic connections for business success.

This event is more than traditional networking - it's about creating a support network within our community, where we share not just business opportunities, but also Portuguese values and perspective in the British business world.

What awaits you:
- Presentations of innovative Portuguese businesses
- Structured networking sessions
- Sharing experiences and challenges
- Mentoring opportunities
- Relaxed atmosphere with Portuguese petiscos

Come prepared to connect, collaborate and grow together!`,

      suggestedHighlights_pt: [
        'Empreendedorismo português em Londres',
        'Oportunidades de colaboração',
        'Mentoria e apoio profissional',
        'Valores empresariais portugueses',
        'Rede de contactos qualificada'
      ],
      suggestedHighlights_en: [
        'Portuguese entrepreneurship in London',
        'Collaboration opportunities',
        'Mentoring and professional support',
        'Portuguese business values',
        'Qualified contact network'
      ],
      estimatedDuration: 3,
      recommendedTags: ['Business Networking', 'Portuguese Professionals', 'Entrepreneurship', 'London Business', 'Professional Growth']
    }
  ]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      
      // Load upcoming events (mock data)
      const mockEvents: Event[] = [
        {
          id: 1,
          title: 'Noite de Fado Autêntico',
          description: 'Uma noite mágica de Fado tradicional com fadistas de Lisboa',
          location: 'Soho Cultural Centre',
          date: '2025-08-25',
          time: '19:30',
          attendees: 25,
          maxAttendees: 40,
          price: 35,
          category: 'Música Tradicional',
          image: '/events/fado-night.jpg',
          status: 'available',
          portugueseCulturalFocus: true,
          culturalCategory: 'traditional_music',
          heritageCelebration: 'Fado Heritage'
        },
        {
          id: 2,
          title: 'Workshop de Culinária Portuguesa',
          description: 'Aprenda a cozinhar pratos tradicionais portugueses',
          location: 'Community Kitchen',
          date: '2025-08-28',
          time: '14:00',
          attendees: 12,
          maxAttendees: 16,
          price: 45,
          category: 'Culinária',
          image: '/events/cooking-class.jpg',
          status: 'available',
          portugueseCulturalFocus: true,
          culturalCategory: 'gastronomy'
        }
      ];

      // Load existing previews (mock data)
      const mockPreviews: EventPreview[] = [
        {
          id: '1',
          eventId: '1',
          event: mockEvents[0],
          previewTitle: 'Prévia: Noite de Fado Autêntico - O que esperar',
          previewDescription: 'Conheça os detalhes da nossa próxima noite de Fado e prepare-se para uma experiência inesquecível',
          hostIntroScript: 'Olá, sou Maria Fernandes e vou ser a vossa anfitriã...',
          culturalHighlights: ['Fadistas autênticos', 'Ambiente tradicional', 'Petiscos portugueses'],
          expectedAtmosphere: 'Intimista e emocional, como nas casas de Fado de Lisboa',
          whatToExpect: ['Fado tradicional', 'Petiscos', 'Vinho português', 'Ambiente acolhedor'],
          languageInfo: 'Evento em português com tradução disponível',
          status: 'published',
          youtubeVideoId: 'mock_preview_123',
          viewCount: 156,
          engagementScore: 8.5,
          createdAt: '2025-08-18T10:00:00Z',
          updatedAt: '2025-08-18T15:30:00Z'
        }
      ];

      setUpcomingEvents(mockEvents);
      setEventPreviews(mockPreviews);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePreviewScript = (event: Event): EventPreview => {
    // Find appropriate template based on event category
    let template = previewTemplates.find(t => 
      event.culturalCategory?.includes(t.eventType.replace('_', '')) ||
      event.category.toLowerCase().includes(t.eventType.replace('_', ''))
    );

    // Default to business networking if no specific template found
    if (!template) {
      template = previewTemplates.find(t => t.eventType === 'business_networking')!;
    }

    const script = language === 'pt' ? template.scriptTemplate_pt : template.scriptTemplate_en;
    const highlights = language === 'pt' ? template.suggestedHighlights_pt : template.suggestedHighlights_en;

    // Replace placeholders in script
    const personalizedScript = script
      .replace('{hostName}', 'Maria Fernandes') // Would come from event host info
      .replace('{location}', event.location)
      .replace('{mainDish}', 'Bacalhau à Brás'); // Would be dynamic based on cooking event

    return {
      id: Date.now().toString(),
      eventId: event.id.toString(),
      event,
      previewTitle: language === 'pt' 
        ? `Prévia: ${event.title} - O que esperar`
        : `Preview: ${event.title} - What to expect`,
      previewDescription: language === 'pt'
        ? `Conheça todos os detalhes sobre ${event.title} e prepare-se para uma experiência inesquecível.`
        : `Learn all the details about ${event.title} and get ready for an unforgettable experience.`,
      hostIntroScript: personalizedScript,
      culturalHighlights: highlights,
      expectedAtmosphere: language === 'pt' 
        ? 'Ambiente acolhedor e autenticamente português'
        : 'Warm and authentically Portuguese atmosphere',
      whatToExpect: [
        event.description,
        language === 'pt' ? 'Comunidade portuguesa acolhedora' : 'Welcoming Portuguese community',
        language === 'pt' ? 'Experiência cultural autêntica' : 'Authentic cultural experience'
      ],
      languageInfo: event.languageRequirements === 'portuguese_only' 
        ? (language === 'pt' ? 'Evento em português' : 'Event in Portuguese')
        : (language === 'pt' ? 'Evento bilingue (PT/EN)' : 'Bilingual event (PT/EN)'),
      status: 'script_ready',
      viewCount: 0,
      engagementScore: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  };

  const handleGeneratePreview = async (event: Event) => {
    try {
      setIsGenerating(true);
      const newPreview = generatePreviewScript(event);
      setEventPreviews(prev => [newPreview, ...prev]);
      setShowGenerator(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error generating preview:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublishToYouTube = async (preview: EventPreview) => {
    try {
      // In a real implementation, this would create and upload a video
      // For now, we'll simulate the process
      
      const uploadOptions = {
        title: preview.previewTitle,
        description: preview.previewDescription + '\n\n' + preview.hostIntroScript,
        tags: [
          'LusoTown',
          'Portuguese Events',
          'London',
          'Event Preview',
          preview.event.category,
          ...(preview.event.tags || [])
        ],
        categoryId: '22', // People & Blogs
        language: 'pt' as const,
        privacy: 'public' as const,
        culturalContext: 'universal' as const,
        portugueseCulturalFocus: true
      };

      // Simulate upload
      const youtubeVideoId = `preview_${Date.now()}`;
      
      setEventPreviews(prev => prev.map(p => 
        p.id === preview.id 
          ? { 
              ...p, 
              youtubeVideoId,
              status: 'published',
              updatedAt: new Date().toISOString()
            }
          : p
      ));

    } catch (error) {
      console.error('Error publishing preview:', error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'draft': 'text-gray-600 bg-gray-100',
      'script_ready': 'text-blue-600 bg-blue-100',
      'recorded': 'text-purple-600 bg-purple-100',
      'edited': 'text-indigo-600 bg-indigo-100',
      'published': 'text-green-600 bg-green-100'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-100';
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
            {language === 'pt' ? 'Prévias de Eventos' : 'Event Previews'}
          </h1>
          <p className="text-gray-600 mt-2">
            {language === 'pt' 
              ? 'Crie vídeos de prévia para eventos culturais portugueses'
              : 'Create preview videos for Portuguese cultural events'
            }
          </p>
        </div>
        <button
          onClick={() => setShowGenerator(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <VideoCameraIcon className="w-5 h-5" />
          {language === 'pt' ? 'Nova Prévia' : 'New Preview'}
        </button>
      </div>

      {/* Event Previews Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {eventPreviews.map((preview) => (
          <motion.div
            key={preview.id}
            layout
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{preview.previewTitle}</h3>
                <p className="text-sm text-gray-500">{preview.event.title}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(preview.status)}`}>
                {preview.status}
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {preview.previewDescription}
            </p>

            {/* Event Details */}
            <div className="space-y-2 mb-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CalendarDaysIcon className="w-4 h-4" />
                {preview.event.date} às {preview.event.time}
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4" />
                {preview.event.location}
              </div>
              <div className="flex items-center gap-2">
                <LanguageIcon className="w-4 h-4" />
                {preview.languageInfo}
              </div>
            </div>

            {/* Cultural Highlights */}
            <div className="flex flex-wrap gap-2 mb-4">
              {preview.culturalHighlights.slice(0, 3).map((highlight, index) => (
                <span
                  key={index}
                  className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full"
                >
                  {highlight}
                </span>
              ))}
            </div>

            {/* Stats */}
            {preview.status === 'published' && (
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <PlayCircleIcon className="w-4 h-4" />
                  {preview.viewCount} {language === 'pt' ? 'visualizações' : 'views'}
                </div>
                <div className="flex items-center gap-1">
                  <SparklesIcon className="w-4 h-4" />
                  {preview.engagementScore}/10
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                onClick={() => setSelectedPreview(preview)}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                {language === 'pt' ? 'Ver Script' : 'View Script'}
              </button>

              <div className="flex items-center gap-2">
                {preview.status === 'script_ready' && (
                  <button
                    onClick={() => handlePublishToYouTube(preview)}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-lg font-medium"
                  >
                    {language === 'pt' ? 'Publicar' : 'Publish'}
                  </button>
                )}

                {preview.youtubeVideoId && (
                  <button
                    onClick={() => window.open(`https://youtube.com/watch?v=${preview.youtubeVideoId}`, '_blank')}
                    className="text-red-600 hover:text-red-700"
                  >
                    <PlayCircleIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Generate Preview Modal */}
      <AnimatePresence>
        {showGenerator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowGenerator(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {language === 'pt' ? 'Gerar Prévia de Evento' : 'Generate Event Preview'}
                </h2>

                {/* Upcoming Events */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {language === 'pt' ? 'Próximos Eventos' : 'Upcoming Events'}
                  </h3>
                  
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`border border-gray-200 rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedEvent?.id === event.id ? 'border-primary-500 bg-primary-50' : 'hover:border-primary-300'
                      }`}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/events/default.jpg';
                          }}
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{event.title}</h4>
                          <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <CalendarDaysIcon className="w-4 h-4" />
                              {event.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPinIcon className="w-4 h-4" />
                              {event.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <UserIcon className="w-4 h-4" />
                              {event.attendees}/{event.maxAttendees}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowGenerator(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {language === 'pt' ? 'Cancelar' : 'Cancel'}
                  </button>
                  <button
                    onClick={() => selectedEvent && handleGeneratePreview(selectedEvent)}
                    disabled={!selectedEvent || isGenerating}
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isGenerating 
                      ? (language === 'pt' ? 'Gerando...' : 'Generating...')
                      : (language === 'pt' ? 'Gerar Prévia' : 'Generate Preview')
                    }
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Script Detail Modal */}
      <AnimatePresence>
        {selectedPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedPreview(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedPreview.previewTitle}</h2>
                  <button
                    onClick={() => setSelectedPreview(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      {language === 'pt' ? 'Script do Anfitrião' : 'Host Script'}
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <pre className="text-gray-700 whitespace-pre-wrap font-sans text-sm">
                        {selectedPreview.hostIntroScript}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      {language === 'pt' ? 'Destaques Culturais' : 'Cultural Highlights'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPreview.culturalHighlights.map((highlight, index) => (
                        <span
                          key={index}
                          className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      {language === 'pt' ? 'O que Esperar' : 'What to Expect'}
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {selectedPreview.whatToExpected.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {language === 'pt' ? 'Ambiente Esperado' : 'Expected Atmosphere'}
                      </h3>
                      <p className="text-gray-700">{selectedPreview.expectedAtmosphere}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {language === 'pt' ? 'Informação de Idioma' : 'Language Information'}
                      </h3>
                      <p className="text-gray-700">{selectedPreview.languageInfo}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}