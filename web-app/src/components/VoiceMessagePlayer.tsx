"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Languages,
  MoreVertical,
  Download,
  Flag,
  Copy,
  Repeat,
  SkipForward,
  SkipBack,
  Settings,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  VOICE_MESSAGE_UI,
  PORTUGUESE_AUDIO_PREFERENCES,
} from "@/config/voice-messaging";
import { PORTUGUESE_COLORS } from "@/config/brand";

interface VoiceMessage {
  id: string;
  audioUrl: string;
  duration: number;
  transcription?: string;
  translation?: string;
  senderName: string;
  senderAvatar?: string;
  timestamp: string;
  dialect?: string;
  confidence?: number;
  isRead?: boolean;
}

interface VoiceMessagePlayerProps {
  message: VoiceMessage;
  isOwn?: boolean;
  showTranscription?: boolean;
  showTranslation?: boolean;
  onTranslate?: (messageId: string) => void;
  onReport?: (messageId: string) => void;
  onDownload?: (messageId: string) => void;
  className?: string;
}

export default function VoiceMessagePlayer({
  message,
  isOwn = false,
  showTranscription = true,
  showTranslation = true,
  onTranslate,
  onReport,
  onDownload,
  className = "",
}: VoiceMessagePlayerProps) {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const waveformRef = useRef<HTMLCanvasElement | null>(null);

  const translations = {
    en: {
      play: "Play voice message",
      pause: "Pause voice message",
      mute: "Mute",
      unmute: "Unmute",
      transcription: "Transcription",
      translation: "Translation",
      translate: "Translate to English",
      download: "Download voice message",
      report: "Report message",
      copy: "Copy transcription",
      playbackSpeed: "Playback speed",
      forward: "Skip forward 10s",
      backward: "Skip backward 10s",
      repeat: "Repeat message",
      settings: "Voice settings",
      errorLoading: "Error loading voice message",
      noTranscription: "Transcription not available",
      confidence: "Transcription confidence",
    },
    pt: {
      play: "Reproduzir mensagem de voz",
      pause: "Pausar mensagem de voz",
      mute: "Silenciar",
      unmute: "Ativar som",
      transcription: "Transcrição",
      translation: "Tradução",
      translate: "Traduzir para português",
      download: "Descarregar mensagem",
      report: "Reportar mensagem",
      copy: "Copiar transcrição",
      playbackSpeed: "Velocidade de reprodução",
      forward: "Avançar 10s",
      backward: "Retroceder 10s",
      repeat: "Repetir mensagem",
      settings: "Configurações de voz",
      errorLoading: "Erro ao carregar mensagem de voz",
      noTranscription: "Transcrição não disponível",
      confidence: "Confiança da transcrição",
    },
  };

  const t = translations[language];

  // Initialize audio element
  useEffect(() => {
    if (message.audioUrl) {
      const audio = new Audio(message.audioUrl);
      audioRef.current = audio;

      audio.addEventListener("loadedmetadata", () => {
        setError(null);
      });

      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });

      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });

      audio.addEventListener("error", (e) => {
        setError(t.errorLoading);
        console.error("Audio loading error:", e);
      });

      return () => {
        audio.pause();
        audio.remove();
      };
    }
  }, [message.audioUrl, t.errorLoading]);

  const drawWaveform = useCallback(() => {
    const canvas = waveformRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const barWidth = 3;
    const barGap = 1;
    const numBars = Math.floor(width / (barWidth + barGap));

    ctx.clearRect(0, 0, width, height);

    // Generate pseudo-random waveform based on message ID
    const seed = message.id
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const random = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    // Draw waveform bars
    for (let i = 0; i < numBars; i++) {
      const barHeight = (random(seed + i) * 0.7 + 0.3) * height * 0.8;
      const x = i * (barWidth + barGap);
      const y = (height - barHeight) / 2;

      // Progress color
      const progress = currentTime / message.duration;
      const isPlayed = i / numBars <= progress;

      ctx.fillStyle = isPlayed
        ? PORTUGUESE_COLORS.red[500]
        : `${VOICE_MESSAGE_UI.waveformColor}40`; // 40% opacity

      ctx.fillRect(x, y, barWidth, barHeight);
    }
  }, [currentTime, message.duration, message.id]);

  // Draw waveform visualization
  useEffect(() => {
    if (waveformRef.current && message.audioUrl) {
      drawWaveform();
    }
  }, [message.audioUrl, drawWaveform]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (!audioRef.current) return;

    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const handleSpeedChange = (speed: number) => {
    if (!audioRef.current) return;

    setPlaybackSpeed(speed);
    audioRef.current.playbackRate = speed;
  };

  const skipForward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(
      audioRef.current.currentTime + 10,
      message.duration
    );
  };

  const skipBackward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(
      audioRef.current.currentTime - 10,
      0
    );
  };

  const handleProgressClick = (event: React.MouseEvent) => {
    if (!audioRef.current || !progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * message.duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const copyTranscription = () => {
    if (message.transcription) {
      navigator.clipboard.writeText(message.transcription);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getDialectFlag = (dialect?: string): string => {
    const flags: Record<string, string> = {
      "pt-PT": "🇵🇹",
      "pt-BR": "🇧🇷",
      "pt-CV": "🇨🇻",
      "pt-AO": "🇦🇴",
      "pt-MZ": "🇲🇿",
    };
    return flags[dialect || "pt-PT"] || "🇵🇹";
  };

  return (
    <div className={`voice-message-player ${className}`}>
      <div
        className={`
        flex items-start space-x-3 p-4 rounded-lg max-w-md
        ${
          isOwn
            ? "bg-primary-600 text-white ml-auto flex-row-reverse space-x-reverse"
            : "bg-white border border-gray-200"
        }
  `}
        style={isOwn ? { backgroundColor: PORTUGUESE_COLORS.red[500] } : {}}
      >
        {/* User Avatar */}
        {!isOwn && (
          <img
            src={message.senderAvatar || "/images/default-avatar.png"}
            alt={message.senderName}
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
          />
        )}

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              {message.dialect && (
                <span className="text-sm">
                  {getDialectFlag(message.dialect)}
                </span>
              )}
              <span
                className={`text-sm font-medium ${isOwn ? "text-white" : "text-gray-900"}`}
              >
                {isOwn ? "You" : message.senderName}
              </span>
            </div>

            <div className="flex items-center space-x-1">
              <span
                className={`text-xs ${isOwn ? "text-white/70" : "text-gray-500"}`}
              >
                {formatTime(message.duration)}
              </span>

              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className={`p-1 rounded-full hover:bg-black/10 ${isOwn ? "text-white" : "text-gray-600"}`}
                >
                  <MoreVertical className="w-4 h-4" />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10"
                    >
                      {onTranslate && (
                        <button
                          onClick={() => {
                            onTranslate(message.id);
                            setShowMenu(false);
                          }}
                          className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <Languages className="w-4 h-4" />
                          <span>{t.translate}</span>
                        </button>
                      )}

                      {message.transcription && (
                        <button
                          onClick={() => {
                            copyTranscription();
                            setShowMenu(false);
                          }}
                          className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <Copy className="w-4 h-4" />
                          <span>{t.copy}</span>
                        </button>
                      )}

                      {onDownload && (
                        <button
                          onClick={() => {
                            onDownload(message.id);
                            setShowMenu(false);
                          }}
                          className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>{t.download}</span>
                        </button>
                      )}

                      {onReport && !isOwn && (
                        <button
                          onClick={() => {
                            onReport(message.id);
                            setShowMenu(false);
                          }}
                          className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                        >
                          <Flag className="w-4 h-4" />
                          <span>{t.report}</span>
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                disabled={!!error}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center transition-colors
                  ${
                    isOwn
                      ? "bg-white/20 hover:bg-white/30 text-white"
                      : "bg-primary-100 hover:bg-primary-200 text-primary-700"
                  }
                  ${error ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" />
                )}
              </button>

              {/* Waveform/Progress */}
              <div className="flex-1 h-12 relative">
                <canvas
                  ref={waveformRef}
                  width={200}
                  height={VOICE_MESSAGE_UI.waveformHeight}
                  className="w-full h-full cursor-pointer rounded"
                  onClick={handleProgressClick}
                />

                {/* Progress overlay */}
                <div
                  ref={progressRef}
                  className="absolute inset-0 cursor-pointer"
                  onClick={handleProgressClick}
                />
              </div>

              {/* Time Display */}
              <div
                className={`text-xs font-mono ${isOwn ? "text-white/70" : "text-gray-500"}`}
              >
                {formatTime(currentTime)} / {formatTime(message.duration)}
              </div>
            </div>

            {/* Additional Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {/* Skip Backward */}
                <button
                  onClick={skipBackward}
                  className={`p-1 rounded hover:bg-black/10 ${isOwn ? "text-white/70" : "text-gray-600"}`}
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                {/* Skip Forward */}
                <button
                  onClick={skipForward}
                  className={`p-1 rounded hover:bg-black/10 ${isOwn ? "text-white/70" : "text-gray-600"}`}
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                {/* Speed Control */}
                <select
                  value={playbackSpeed}
                  onChange={(e) => handleSpeedChange(Number(e.target.value))}
                  className={`
                    text-xs px-1 py-0.5 rounded border-0 bg-transparent cursor-pointer
                    ${isOwn ? "text-white/70" : "text-gray-600"}
                  `}
                >
                  {VOICE_MESSAGE_UI.playbackSpeed.map((speed) => (
                    <option key={speed} value={speed} className="text-gray-900">
                      {speed}x
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                {/* Volume Control */}
                <button
                  onClick={toggleMute}
                  className={`p-1 rounded hover:bg-black/10 ${isOwn ? "text-white/70" : "text-gray-600"}`}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="w-16 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div
              className={`mt-2 p-2 rounded text-xs ${isOwn ? "bg-white/20 text-white" : "bg-red-50 text-red-600"}`}
            >
              {error}
            </div>
          )}

          {/* Transcription */}
          {showTranscription && message.transcription && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className={`mt-3 p-2 rounded text-xs ${isOwn ? "bg-white/20" : "bg-gray-50"}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`font-medium ${isOwn ? "text-white/80" : "text-gray-600"}`}
                >
                  {t.transcription}
                </span>
                {message.confidence && (
                  <span
                    className={`text-xs ${isOwn ? "text-white/60" : "text-gray-500"}`}
                  >
                    {Math.round(message.confidence * 100)}%
                  </span>
                )}
              </div>
              <p
                className={`italic ${isOwn ? "text-white/90" : "text-gray-800"}`}
              >
                "{message.transcription}"
              </p>
            </motion.div>
          )}

          {/* Translation */}
          {showTranslation && message.translation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className={`mt-2 p-2 rounded text-xs ${isOwn ? "bg-white/20" : "bg-blue-50"}`}
            >
              <div className="flex items-center space-x-1 mb-1">
                <Languages className="w-3 h-3" />
                <span
                  className={`font-medium ${isOwn ? "text-white/80" : "text-blue-600"}`}
                >
                  {t.translation}
                </span>
              </div>
              <p
                className={`italic ${isOwn ? "text-white/90" : "text-blue-800"}`}
              >
                "{message.translation}"
              </p>
            </motion.div>
          )}

          {/* Timestamp */}
          <div
            className={`mt-2 text-xs ${isOwn ? "text-white/60" : "text-gray-500"}`}
          >
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
