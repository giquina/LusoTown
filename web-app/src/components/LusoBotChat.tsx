"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  HeartIcon,
  LanguageIcon,
  MapPinIcon,
  SparklesIcon,
  AcademicCapIcon,
  BuildingStorefrontIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ArrowTopRightOnSquareIcon,
  SunIcon,
  MoonIcon,
  XMarkIcon,
  MicrophoneIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import {
  LusoBotMessage,
  LusoBotSession,
  MessageMetadata,
  EmotionalTone,
  LusoBotSuggestion,
  PortugueseRegion,
} from "@/lib/lusobot-engine";
import { toast } from "react-hot-toast";

interface LusoBotChatProps {
  className?: string;
  isEmbedded?: boolean;
  onClose?: () => void;
}

interface SaudadeMeterProps {
  emotionalTone: EmotionalTone;
  language: string;
}

function SaudadeMeter({ emotionalTone, language }: SaudadeMeterProps) {
  const { saudade, nostalgia, hope, community, heritage } = emotionalTone;

  const emotions = [
    {
      key: "saudade",
      value: saudade,
      label: language === "pt" ? "Saudade" : "Longing",
      color: "from-blue-400 to-indigo-600",
    },
    {
      key: "nostalgia",
      value: nostalgia,
      label: language === "pt" ? "Nostalgia" : "Nostalgia",
      color: "from-purple-400 to-pink-600",
    },
    {
      key: "hope",
      value: hope,
      label: language === "pt" ? "Esperança" : "Hope",
      color: "from-green-400 to-emerald-600",
    },
    {
      key: "community",
      value: community,
      label: language === "pt" ? "Comunidade" : "Community",
      color: "from-orange-400 to-red-600",
    },
    {
      key: "heritage",
      value: heritage,
      label: language === "pt" ? "Património" : "Heritage",
      color: "from-amber-400 to-yellow-600",
    },
  ];

  const hasSignificantEmotions = emotions.some(
    (emotion) => emotion.value > 0.3
  );

  if (!hasSignificantEmotions) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4 mb-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <HeartSolidIcon className="w-4 h-4 text-primary-600" />
        <span className="text-sm font-medium text-primary-900">
          {language === "pt"
            ? "Tom Emocional Detectado"
            : "Emotional Tone Detected"}
        </span>
      </div>

      <div className="space-y-2">
        {emotions
          .filter((emotion) => emotion.value > 0.1)
          .map((emotion) => (
            <div key={emotion.key} className="flex items-center gap-3">
              <span className="text-xs font-medium text-gray-700 w-20 text-right">
                {emotion.label}
              </span>
              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${emotion.value * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-full bg-gradient-to-r ${emotion.color} rounded-full`}
                />
              </div>
              <span className="text-xs text-gray-500 w-8">
                {Math.round(emotion.value * 100)}%
              </span>
            </div>
          ))}
      </div>
    </motion.div>
  );
}

interface SuggestionCardProps {
  suggestion: LusoBotSuggestion;
  onSelect: (suggestion: LusoBotSuggestion) => void;
  language: string;
}

function SuggestionCard({
  suggestion,
  onSelect,
  language,
}: SuggestionCardProps) {
  const getIcon = () => {
    switch (suggestion.type) {
      case "event":
        return <CalendarDaysIcon className="w-5 h-5" />;
      case "business":
        return <BuildingStorefrontIcon className="w-5 h-5" />;
      case "community":
        return <UserGroupIcon className="w-5 h-5" />;
      case "language":
        return <LanguageIcon className="w-5 h-5" />;
      case "resource":
        return <AcademicCapIcon className="w-5 h-5" />;
      default:
        return <SparklesIcon className="w-5 h-5" />;
    }
  };

  const getPriorityColor = () => {
    switch (suggestion.priority) {
      case "high":
        return "border-l-primary-500 bg-primary-50";
      case "medium":
        return "border-l-secondary-500 bg-secondary-50";
      case "low":
        return "border-l-gray-400 bg-gray-50";
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(suggestion)}
      className={`w-full text-left p-3 rounded-lg border-l-4 ${getPriorityColor()} 
        hover:shadow-md transition-all duration-200 group`}
    >
      <div className="flex items-start gap-3">
        <div className="text-primary-600 group-hover:text-primary-700 transition-colors">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 text-sm group-hover:text-primary-900 transition-colors">
            {suggestion.title}
          </h4>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
            {suggestion.description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor()}`}
            >
              {suggestion.priority === "high"
                ? language === "pt"
                  ? "Alta"
                  : "High"
                : suggestion.priority === "medium"
                  ? language === "pt"
                    ? "Média"
                    : "Medium"
                  : language === "pt"
                    ? "Baixa"
                    : "Low"}
            </span>
            <span className="text-xs text-gray-500">
              {Math.round(suggestion.culturalRelevance * 100)}%{" "}
              {language === "pt" ? "relevante" : "relevant"}
            </span>
          </div>
        </div>
        <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
      </div>
    </motion.button>
  );
}

interface MessageBubbleProps {
  message: LusoBotMessage;
  language: string;
  isLatest: boolean;
}

function MessageBubble({ message, language, isLatest }: MessageBubbleProps) {
  const isBot = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}
    >
      <div className={`max-w-[85%] ${isBot ? "order-2" : "order-1"}`}>
        {/* Avatar */}
        {isBot && (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">🇵🇹</span>
            </div>
            <span className="text-xs font-medium text-gray-600">LusoBot</span>
          </div>
        )}

        {/* Message Content */}
        <div
          className={`
          rounded-2xl px-4 py-3 shadow-sm
          ${
            isBot
              ? "bg-white border border-gray-100 text-gray-900"
              : "bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
          }
        `}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>

          {/* Timestamp */}
          <div
            className={`text-xs mt-2 ${isBot ? "text-gray-500" : "text-white/80"}`}
          >
            {message.timestamp.toLocaleTimeString(
              language === "pt" ? "pt-PT" : "en-GB",
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            )}
          </div>
        </div>

        {/* Emotional Tone Display */}
        {isBot && message.emotionalTone && isLatest && (
          <SaudadeMeter
            emotionalTone={message.emotionalTone}
            language={language}
          />
        )}
      </div>
    </motion.div>
  );
}

export default function LusoBotChat({
  className = "",
  isEmbedded = false,
  onClose,
}: LusoBotChatProps) {
  const { language, t } = useLanguage();
  const { hasActiveSubscription } = useSubscription();

  const [session, setSession] = useState<LusoBotSession | null>(null);
  const [messages, setMessages] = useState<LusoBotMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<LusoBotSuggestion[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [stickToBottom, setStickToBottom] = useState(true);

  // Initialize chat session
  useEffect(() => {
    const userContext: MessageMetadata = {
      userRegion: "diaspora_uk" as PortugueseRegion,
      communityLevel: hasActiveSubscription ? "active" : "newcomer",
      languageProficiency: language === "pt" ? "native" : "learning",
      interests: ["community", "culture", "events"],
      mood: "curious",
    };

    const newSession = new LusoBotSession(userContext, language);
    setSession(newSession);
    setMessages(newSession.getMessages());
  }, [language, hasActiveSubscription]);

  // Auto-scroll to bottom when stickToBottom is true
  useEffect(() => {
    if (stickToBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, stickToBottom]);

  // Track user scroll to toggle stickToBottom
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const threshold = 48; // px from bottom counts as at-bottom
    const atBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight <= threshold;
    setStickToBottom(atBottom);
  }, []);

  // Update suggestions when messages change
  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    if (
      latestMessage &&
      latestMessage.role === "assistant" &&
      latestMessage.suggestions
    ) {
      setSuggestions(latestMessage.suggestions);
    }
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || !session || isLoading) return;

    const messageContent = inputValue.trim();
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await session.sendMessage(messageContent);
      setMessages(session.getMessages());

      // Show success feedback for emotional support
      if (response.emotionalTone && response.emotionalTone.saudade > 0.5) {
        toast.success(
          language === "pt"
            ? "Estou aqui para te apoiar 💙"
            : "I'm here to support you 💙"
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(
        language === "pt"
          ? "Erro ao enviar mensagem. Tenta novamente."
          : "Error sending message. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, session, isLoading, language]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const handleSuggestionSelect = useCallback(
    async (suggestion: LusoBotSuggestion) => {
      if (suggestion.link) {
        window.open(suggestion.link, "_blank");
        return;
      }

      // Handle different suggestion actions
      switch (suggestion.action) {
        case "speak":
          if (suggestion.voicePersonality && session) {
            try {
              await session.enableVoiceInteraction(suggestion.voicePersonality);
              const voiceMessage =
                language === "pt"
                  ? `Voz cultural ativada! Agora posso falar contigo com personalidade ${suggestion.title}.`
                  : `Cultural voice activated! I can now speak with you using ${suggestion.title} personality.`;

              // Speak the activation message
              await session.speakMessage(voiceMessage, "warm");

              toast.success(
                language === "pt"
                  ? "Voz cultural ativada! 🎵"
                  : "Cultural voice activated! 🎵"
              );
            } catch (error) {
              toast.error(
                language === "pt"
                  ? "Erro ao ativar voz. Verifique as permissões do microfone."
                  : "Error activating voice. Please check microphone permissions."
              );
            }
          }
          break;

        case "learn":
          if (suggestion.type === "language" && session) {
            try {
              const lesson = await session.getPersonalizedLesson(
                suggestion.title
              );
              if (lesson) {
                setInputValue(
                  language === "pt"
                    ? `Quero aprender: ${lesson.title[language]}`
                    : `I want to learn: ${lesson.title[language]}`
                );
                toast.success(
                  language === "pt"
                    ? "Lição personalizada encontrada! 📚"
                    : "Personalized lesson found! 📚"
                );
              }
            } catch (error) {
              console.error("Error loading lesson:", error);
            }
          } else {
            setInputValue(
              language === "pt"
                ? `Ensina-me sobre: ${suggestion.title}`
                : `Teach me about: ${suggestion.title}`
            );
          }
          break;

        case "practice":
          setInputValue(
            language === "pt"
              ? `Quero praticar: ${suggestion.title}`
              : `I want to practice: ${suggestion.title}`
          );
          break;

        case "support":
          setInputValue(
            language === "pt"
              ? `Preciso de apoio com: ${suggestion.title}`
              : `I need support with: ${suggestion.title}`
          );
          break;

        case "connect":
          if (suggestion.link) {
            window.open(suggestion.link, "_blank");
          } else {
            setInputValue(
              language === "pt"
                ? `Como posso conectar-me: ${suggestion.title}`
                : `How can I connect: ${suggestion.title}`
            );
          }
          break;

        default:
          // Fallback to original behavior
          setInputValue(
            language === "pt"
              ? `Conte-me mais sobre: ${suggestion.title}`
              : `Tell me more about: ${suggestion.title}`
          );
      }

      inputRef.current?.focus();
    },
    [language, session]
  );

  const handleVoiceInput = useCallback(() => {
    if (!("webkitSpeechRecognition" in window)) {
      toast.error(
        language === "pt"
          ? "Reconhecimento de voz não suportado neste navegador"
          : "Voice recognition not supported in this browser"
      );
      return;
    }

    setIsListening(true);
    const recognition = new (window as any).webkitSpeechRecognition();

    // Enhanced language detection based on user context
    const userRegion = session?.getCulturalProfile()?.region || "portugal";
    recognition.lang =
      language === "pt"
        ? userRegion.includes("brasil")
          ? "pt-BR"
          : "pt-PT"
        : "en-GB";

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 3; // Get multiple alternatives for better accuracy

    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        setInputValue(finalTranscript.trim());
        setIsListening(false);

        // Auto-send message if voice input is complete
        if (finalTranscript.trim()) {
          setTimeout(() => handleSendMessage(), 500);
        }

        // Provide pronunciation feedback for language learners
        if (
          session &&
          session.getCulturalProfile()?.languageLevel !== "native"
        ) {
          session
            .assessPronunciation(finalTranscript.trim())
            .then((assessment: any) => {
              if (assessment.accuracy > 0.8) {
                toast.success(
                  language === "pt"
                    ? `Boa pronúncia! ${Math.round(assessment.accuracy * 100)}% acerto`
                    : `Good pronunciation! ${Math.round(assessment.accuracy * 100)}% accuracy`
                );
              }
            })
            .catch(console.error);
        }
      }
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      const errorMessages = {
        network:
          language === "pt"
            ? "Erro de rede. Verifique sua conexão."
            : "Network error. Check your connection.",
        "not-allowed":
          language === "pt"
            ? "Permissão negada. Active o microfone."
            : "Permission denied. Please enable microphone.",
        "no-speech":
          language === "pt"
            ? "Nenhuma fala detectada. Tente novamente."
            : "No speech detected. Please try again.",
        "audio-capture":
          language === "pt"
            ? "Microfone não disponível."
            : "Microphone not available.",
        "language-not-supported":
          language === "pt"
            ? "Idioma não suportado."
            : "Language not supported.",
      };

      const message =
        errorMessages[event.error as keyof typeof errorMessages] ||
        (language === "pt"
          ? "Erro no reconhecimento de voz"
          : "Voice recognition error");

      toast.error(message);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    // Provide user feedback about voice activation
    toast.info(
      language === "pt"
        ? `Fale agora em ${recognition.lang}... 🎤`
        : `Speak now in ${recognition.lang}... 🎤`
    );

    recognition.start();
  }, [language, session, handleSendMessage]);

  const quickStarters = [
    {
      pt: "Sou novo no Reino Unido. Por onde começo?",
      en: "I'm new to the UK. Where do I start?",
      category: "newcomer",
      icon: "🇬🇧",
    },
    {
      pt: "Tenho saudades de casa. Como posso lidar com isso?",
      en: "I miss home. How can I deal with this?",
      category: "emotional",
      icon: "💙",
    },
    {
      pt: "Quero praticar português com sotaque autêntico",
      en: "I want to practice Portuguese with authentic accent",
      category: "language",
      icon: "🗣️",
    },
    {
      pt: "Ativa a voz cultural portuguesa para conversarmos",
      en: "Activate Portuguese cultural voice to chat",
      category: "voice",
      icon: "🎵",
    },
    {
      pt: "Ensina-me tradições portuguesas importantes",
      en: "Teach me important Portuguese traditions",
      category: "cultural",
      icon: "🇵🇹",
    },
    {
      pt: "Quero encontrar eventos portugueses este fim de semana",
      en: "Find Portuguese events this weekend",
      category: "events",
      icon: "📅",
    },
    {
      pt: "Como posso melhorar a minha pronunciação?",
      en: "How can I improve my pronunciation?",
      category: "learning",
      icon: "📚",
    },
    {
      pt: "Preciso de apoio emocional com contexto cultural",
      en: "I need emotional support with cultural context",
      category: "therapeutic",
      icon: "🤗",
    },
    {
      pt: "Quero encontrar outros portugueses/brasileiros na minha área",
      en: "Find other Portuguese/Brazilians in my area",
      category: "community",
      icon: "👥",
    },
    {
      pt: "Negócios portugueses: restaurantes, serviços, profissionais",
      en: "Portuguese businesses: restaurants, services, professionals",
      category: "business",
      icon: "🏢",
    },
  ];

  if (!session) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div
      className={`
      ${isEmbedded ? "h-full" : "h-screen max-h-screen"} 
      bg-gradient-to-br from-gray-50 to-primary-50 
      flex flex-col
      ${className}
    `}
      style={{
        overflow: "hidden",
        maxHeight: isEmbedded ? "100%" : "100vh",
      }}
    >
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">🇵🇹</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900 flex items-center gap-2">
                LusoBot
                <SparklesIcon className="w-4 h-4 text-primary-500" />
              </h1>
              <p className="text-xs text-gray-600">
                {language === "pt"
                  ? "Assistente Cultural Português"
                  : "Portuguese-speaking Cultural Assistant"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isDarkMode ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Language Indicator */}
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
          <LanguageIcon className="w-3 h-3" />
          <span>
            {language === "pt"
              ? "Conversando em Português"
              : "Chatting in English"}
          </span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 p-4 space-y-1 min-h-0"
        style={{ overflowY: "auto", WebkitOverflowScrolling: "touch" }}
        data-lusobot-chat-container
      >
        <AnimatePresence>
          {messages.map((message, index) => (
            <MessageBubble
              key={message.id}
              message={message}
              language={language}
              isLatest={index === messages.length - 1}
            />
          ))}
        </AnimatePresence>

        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start mb-4"
          >
            <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
                <span className="text-xs text-gray-500">
                  {language === "pt"
                    ? "LusoBot está a pensar..."
                    : "LusoBot is thinking..."}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Scroll-to-bottom affordance */}
      {!stickToBottom && (
        <div className="pointer-events-none absolute bottom-24 right-4 z-10">
          <button
            className="pointer-events-auto px-3 py-2 rounded-full bg-white shadow border border-gray-200 text-xs text-gray-700 hover:bg-gray-50"
            onClick={() => {
              setStickToBottom(true);
              messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Jump to latest
          </button>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="border-t border-gray-200 bg-white p-4 flex-shrink-0">
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-primary-500" />
            {language === "pt"
              ? "Sugestões Personalizadas"
              : "Personalized Suggestions"}
          </h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <SuggestionCard
                key={index}
                suggestion={suggestion}
                onSelect={handleSuggestionSelect}
                language={language}
              />
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Quick Starters for new conversations */}
      {messages.length <= 1 && (
        <div className="border-t border-gray-200 bg-white p-4 flex-shrink-0">
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-primary-500" />
            {language === "pt"
              ? "Como Posso Ajudar-te Hoje?"
              : "How Can I Help You Today?"}
          </h3>

          <div className="space-y-3">
            <div className="text-xs text-gray-600 mb-2">
              {language === "pt"
                ? "Escolhe uma área de apoio:"
                : "Choose a support area:"}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {quickStarters.slice(0, 6).map((starter, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setInputValue(
                      starter[
                        language as keyof Omit<
                          typeof starter,
                          "category" | "icon"
                        >
                      ]
                    )
                  }
                  className="text-left p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 
                    hover:from-primary-50 hover:to-secondary-50 transition-all duration-200
                    text-sm text-gray-700 border border-gray-200 hover:border-primary-300
                    hover:shadow-sm group"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg group-hover:scale-110 transition-transform">
                      {starter.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        {starter.category}
                      </p>
                      <p className="font-medium group-hover:text-primary-700 transition-colors leading-tight">
                        {
                          starter[
                            language as keyof Omit<
                              typeof starter,
                              "category" | "icon"
                            >
                          ]
                        }
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {quickStarters.length > 6 && (
              <details className="mt-3">
                <summary className="text-xs text-gray-500 cursor-pointer hover:text-primary-600 transition-colors">
                  {language === "pt"
                    ? "Ver mais opções..."
                    : "Show more options..."}
                </summary>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {quickStarters.slice(6).map((starter, index) => (
                    <button
                      key={index + 6}
                      onClick={() =>
                        setInputValue(
                          starter[
                            language as keyof Omit<
                              typeof starter,
                              "category" | "icon"
                            >
                          ]
                        )
                      }
                      className="text-left p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors
                        text-xs text-gray-600 border border-gray-200 hover:border-primary-300"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{starter.icon}</span>
                        <span>
                          {
                            starter[
                              language as keyof Omit<
                                typeof starter,
                                "category" | "icon"
                              >
                            ]
                          }
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </details>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <MicrophoneIcon className="w-3 h-3" />
              {language === "pt"
                ? "Dica: Clica no microfone para falar diretamente comigo!"
                : "Tip: Click the microphone to speak directly with me!"}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4 flex-shrink-0">
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  language === "pt"
                    ? "Escreve a tua mensagem..."
                    : "Type your message..."
                }
                disabled={isLoading}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl 
                  focus:ring-2 focus:ring-primary-500 focus:border-transparent
                  disabled:bg-gray-100 disabled:cursor-not-allowed
                  text-sm"
                maxLength={500}
              />

              {/* Voice Input Button */}
              <button
                onClick={handleVoiceInput}
                disabled={isLoading || isListening}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg
                  transition-colors ${
                    isListening
                      ? "bg-red-100 text-red-600"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <MicrophoneIcon
                  className={`w-4 h-4 ${isListening ? "animate-pulse" : ""}`}
                />
              </button>
            </div>

            {/* Character Count */}
            <div className="text-xs text-gray-500 mt-1 text-right">
              {inputValue.length}/500
            </div>
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white 
              rounded-2xl hover:from-primary-600 hover:to-secondary-600 
              disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
              flex items-center justify-center min-w-[48px] min-h-[48px]"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <PaperAirplaneIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
