"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  VideoCameraIcon,
  VideoCameraSlashIcon,
  MicrophoneIcon,
  MicrophoneSlashIcon,
  ChatBubbleBottomCenterTextIcon,
  HeartIcon,
  ShareIcon,
  UserGroupIcon,
  GlobeAltIcon,
  CameraIcon,
  LanguageIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useLanguage } from '@/context/LanguageContext';

interface LiveEventStreamingProps {
  eventId: string;
  eventTitle: string;
  streamUrl?: string;
  isLive: boolean;
  viewerCount: number;
  culturalContext?: {
    origin: string;
    flagEmoji: string;
    language: 'pt' | 'en' | 'both';
    culturalElements: string[];
  };
  hostName: string;
  hostImage?: string;
  onJoinStream?: () => void;
  onLeaveStream?: () => void;
  className?: string;
}

interface StreamMessage {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  message: string;
  timestamp: Date;
  type: 'chat' | 'reaction' | 'system' | 'cultural-comment';
  language?: 'pt' | 'en';
  culturalContext?: string;
}

interface StreamStats {
  totalViewers: number;
  peakViewers: number;
  duration: number;
  chatMessages: number;
  reactions: number;
  culturalEngagement: number;
}

const LiveEventStreaming: React.FC<LiveEventStreamingProps> = ({
  eventId,
  eventTitle,
  streamUrl,
  isLive,
  viewerCount,
  culturalContext,
  hostName,
  hostImage,
  onJoinStream,
  onLeaveStream,
  className = ''
}) => {
  const { language, t } = useLanguage();
  const isPortuguese = language === 'pt';
  const videoRef = useRef<HTMLVideoElement>(null);

  // Stream state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [quality, setQuality] = useState<'auto' | '720p' | '480p' | '360p'>('auto');

  // Chat and interaction state
  const [showChat, setShowChat] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [streamMessages, setStreamMessages] = useState<StreamMessage[]>([]);
  const [reactions, setReactions] = useState(0);
  const [hasReacted, setHasReacted] = useState(false);

  // Cultural features
  const [culturalTranslation, setCulturalTranslation] = useState(false);
  const [culturalCommentary, setCulturalCommentary] = useState(true);

  // Stream stats
  const [streamStats, setStreamStats] = useState<StreamStats>({
    totalViewers: viewerCount,
    peakViewers: viewerCount,
    duration: 0,
    chatMessages: 0,
    reactions: 0,
    culturalEngagement: 85
  });

  // Initialize stream
  useEffect(() => {
    if (streamUrl && videoRef.current && isLive) {
      // In a real implementation, you'd set up HLS.js or similar
      videoRef.current.src = streamUrl;
    }
  }, [streamUrl, isLive]);

  // Update viewer count
  useEffect(() => {
    setStreamStats(prev => ({
      ...prev,
      totalViewers: viewerCount,
      peakViewers: Math.max(prev.peakViewers, viewerCount)
    }));
  }, [viewerCount]);

  // Mock chat messages for Portuguese cultural events
  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        const mockMessages: StreamMessage[] = [
          {
            id: Date.now().toString(),
            userId: 'user1',
            userName: 'Maria Santos',
            message: isPortuguese ? 'Que saudades de um bom fado!' : 'Missing good fado music!',
            timestamp: new Date(),
            type: 'cultural-comment',
            language: 'pt',
            culturalContext: 'fado appreciation'
          },
          {
            id: (Date.now() + 1).toString(),
            userId: 'user2',
            userName: 'João Silva',
            message: isPortuguese ? 'Excellent cultural presentation!' : 'Excelente apresentação cultural!',
            timestamp: new Date(),
            type: 'chat',
            language: 'en'
          }
        ];

        if (Math.random() > 0.7) {
          setStreamMessages(prev => [...prev.slice(-20), mockMessages[Math.floor(Math.random() * mockMessages.length)]]);
          setStreamStats(prev => ({ ...prev, chatMessages: prev.chatMessages + 1 }));
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isLive, isPortuguese]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        onJoinStream?.();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleFullscreen = () => {
    const container = videoRef.current?.parentElement;
    if (!isFullscreen && container) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage: StreamMessage = {
        id: Date.now().toString(),
        userId: 'current-user',
        userName: 'You',
        message: chatMessage,
        timestamp: new Date(),
        type: 'chat',
        language: isPortuguese ? 'pt' : 'en'
      };
      
      setStreamMessages(prev => [...prev, newMessage]);
      setChatMessage('');
      setStreamStats(prev => ({ ...prev, chatMessages: prev.chatMessages + 1 }));
    }
  };

  const handleReaction = () => {
    if (!hasReacted) {
      setReactions(prev => prev + 1);
      setHasReacted(true);
      setStreamStats(prev => ({ ...prev, reactions: prev.reactions + 1 }));
      
      // Reset after 5 seconds
      setTimeout(() => setHasReacted(false), 5000);
    }
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}:${minutes.toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}` 
                     : `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  if (!isLive && !streamUrl) {
    return (
      <div className={`bg-gray-900 rounded-2xl overflow-hidden ${className}`}>
        <div className="aspect-video flex items-center justify-center">
          <div className="text-center text-white">
            <VideoCameraSlashIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold mb-2">
              {isPortuguese ? 'Transmissão Não Disponível' : 'Stream Not Available'}
            </h3>
            <p className="text-gray-400">
              {isPortuguese 
                ? 'Este evento não tem transmissão ao vivo'
                : 'This event doesn\'t have live streaming'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-900 rounded-2xl overflow-hidden ${className}`}>
      {/* Stream Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isLive && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-white font-bold text-sm">
                  {isPortuguese ? 'AO VIVO' : 'LIVE'}
                </span>
              </div>
            )}
            
            {culturalContext && (
              <div className="flex items-center gap-2 text-white">
                <span className="text-lg">{culturalContext.flagEmoji}</span>
                <span className="text-sm font-medium">{culturalContext.origin}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 text-white">
            <div className="flex items-center gap-1">
              <UserGroupIcon className="w-4 h-4" />
              <span className="text-sm font-medium">{viewerCount.toLocaleString()}</span>
            </div>
            
            {culturalContext?.language === 'both' && (
              <button
                onClick={() => setCulturalTranslation(!culturalTranslation)}
                className={`p-2 rounded-lg transition-colors ${
                  culturalTranslation ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
                title={isPortuguese ? 'Tradução automática' : 'Auto translation'}
              >
                <LanguageIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Video Player */}
        <div className="aspect-video bg-black relative group">
          {streamUrl ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls={false}
              autoPlay={false}
              muted={isMuted}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-white">
                <VideoCameraIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400">
                  {isPortuguese ? 'Carregando transmissão...' : 'Loading stream...'}
                </p>
              </div>
            </div>
          )}

          {/* Video Controls Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlayPause}
                className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors"
              >
                {isPlaying ? (
                  <PauseIcon className="w-8 h-8 text-white" />
                ) : (
                  <PlayIcon className="w-8 h-8 text-white ml-1" />
                )}
              </button>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <button onClick={handleMuteToggle} className="hover:text-gray-300">
                    {isMuted ? (
                      <SpeakerXMarkIcon className="w-5 h-5" />
                    ) : (
                      <SpeakerWaveIcon className="w-5 h-5" />
                    )}
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                      className="w-20 h-1 bg-white/30 rounded-lg appearance-none slider"
                    />
                  </div>

                  <select
                    value={quality}
                    onChange={(e) => setQuality(e.target.value as any)}
                    className="bg-white/20 backdrop-blur-sm rounded text-sm px-2 py-1 border-none"
                  >
                    <option value="auto">{isPortuguese ? 'Auto' : 'Auto'}</option>
                    <option value="720p">720p</option>
                    <option value="480p">480p</option>
                    <option value="360p">360p</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm">{formatDuration(streamStats.duration)}</span>
                  
                  <button
                    onClick={handleFullscreen}
                    className="hover:text-gray-300"
                  >
                    {isFullscreen ? (
                      <ArrowsPointingInIcon className="w-5 h-5" />
                    ) : (
                      <ArrowsPointingOutIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stream Stats Overlay */}
          <div className="absolute top-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
                <div className="flex items-center gap-4">
                  <span>{viewerCount} {isPortuguese ? 'espectadores' : 'viewers'}</span>
                  {culturalContext && (
                    <span className="text-green-400">
                      {streamStats.culturalEngagement}% {isPortuguese ? 'engajamento cultural' : 'cultural engagement'}
                    </span>
                  )}
                </div>
              </div>

              {/* Reactions */}
              <div className="flex items-center gap-2">
                <AnimatePresence>
                  {reactions > 0 && (
                    <motion.div
                      initial={{ scale: 0, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0, y: -20 }}
                      className="bg-red-500 text-white rounded-full px-3 py-1 text-sm font-bold"
                    >
                      ❤️ {reactions}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <button
                  onClick={handleReaction}
                  disabled={hasReacted}
                  className={`bg-black/50 backdrop-blur-sm rounded-lg p-2 transition-colors ${
                    hasReacted ? 'text-red-400' : 'text-white hover:text-red-400'
                  }`}
                >
                  {hasReacted ? (
                    <HeartSolid className="w-5 h-5" />
                  ) : (
                    <HeartIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-gray-800/95 backdrop-blur-sm text-white">
            <div className="h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold flex items-center gap-2">
                    <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
                    {isPortuguese ? 'Chat Cultural' : 'Cultural Chat'}
                  </h3>
                  <button
                    onClick={() => setShowChat(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ×
                  </button>
                </div>
                
                {culturalTranslation && (
                  <div className="mt-2 text-xs text-green-400 flex items-center gap-1">
                    <LanguageIcon className="w-3 h-3" />
                    {isPortuguese ? 'Tradução ativa' : 'Translation active'}
                  </div>
                )}
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {streamMessages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-2 rounded-lg ${
                      msg.type === 'cultural-comment' 
                        ? 'bg-green-900/30 border-l-2 border-green-400' 
                        : msg.type === 'system'
                        ? 'bg-blue-900/30 border-l-2 border-blue-400'
                        : 'bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{msg.userName}</span>
                      {msg.language && (
                        <span className="text-xs text-gray-400 uppercase">
                          {msg.language}
                        </span>
                      )}
                      {msg.type === 'cultural-comment' && (
                        <span className="text-xs text-green-400">🇵🇹</span>
                      )}
                    </div>
                    <p className="text-sm">{msg.message}</p>
                    {culturalTranslation && msg.language !== language && (
                      <p className="text-xs text-gray-400 mt-1 italic">
                        {msg.language === 'pt' ? 
                          'Translation: Missing good fado music!' :
                          'Tradução: Excelente apresentação cultural!'
                        }
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={isPortuguese ? 'Enviar mensagem...' : 'Send message...'}
                    className="flex-1 bg-gray-700 rounded-lg px-3 py-2 text-sm placeholder-gray-400 border-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!chatMessage.trim()}
                    className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                  >
                    {isPortuguese ? 'Enviar' : 'Send'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Toggle Button (when hidden) */}
        {!showChat && (
          <button
            onClick={() => setShowChat(true)}
            className="absolute top-4 right-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg p-3 shadow-lg transition-colors"
          >
            <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Stream Info */}
      <div className="p-4 bg-gray-800 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {hostImage && (
              <img src={hostImage} alt={hostName} className="w-8 h-8 rounded-full" />
            )}
            <div>
              <h3 className="font-bold text-lg">{eventTitle}</h3>
              <p className="text-gray-400 text-sm">
                {isPortuguese ? 'Apresentado por' : 'Hosted by'} {hostName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
              <ShareIcon className="w-4 h-4" />
              {isPortuguese ? 'Compartilhar' : 'Share'}
            </button>
            
            <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
              <CameraIcon className="w-4 h-4" />
              {isPortuguese ? 'Screenshot' : 'Screenshot'}
            </button>
          </div>
        </div>

        {/* Cultural Context */}
        {culturalContext && (
          <div className="mt-4 p-3 bg-green-900/20 border border-green-700 rounded-lg">
            <h4 className="font-semibold text-green-400 mb-2">
              {isPortuguese ? 'Contexto Cultural' : 'Cultural Context'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {culturalContext.culturalElements.map((element, index) => (
                <span key={index} className="bg-green-700/30 text-green-300 px-2 py-1 rounded-full text-xs">
                  {element}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveEventStreaming;