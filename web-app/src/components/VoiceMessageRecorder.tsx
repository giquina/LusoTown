'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Square, 
  Send, 
  Trash2, 
  Volume2,
  Settings,
  Languages,
  Waveform,
  Timer,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { 
  VOICE_RECORDING_CONFIG, 
  SPEECH_TO_TEXT_CONFIG, 
  VOICE_MESSAGE_CATEGORIES,
  getVoiceConfigForTier,
  getSpeechToTextForDialect
} from '@/config/voice-messaging'
import { PORTUGUESE_COLORS } from '@/config/brand'

interface VoiceMessageRecorderProps {
  onSendVoiceMessage: (audioBlob: Blob, transcription: string, duration: number) => void
  membershipTier?: string
  preferredDialect?: string
  disabled?: boolean
  className?: string
}

interface RecordingState {
  isRecording: boolean
  isPaused: boolean
  isPlaying: boolean
  duration: number
  audioBlob: Blob | null
  audioUrl: string | null
  transcription: string
  confidence: number
}

export default function VoiceMessageRecorder({
  onSendVoiceMessage,
  membershipTier = 'standard',
  preferredDialect = 'pt-PT',
  disabled = false,
  className = ''
}: VoiceMessageRecorderProps) {
  const { language } = useLanguage()
  const [recordingState, setRecordingState] = useState<RecordingState>({
    isRecording: false,
    isPaused: false,
    isPlaying: false,
    duration: 0,
    audioBlob: null,
    audioUrl: null,
    transcription: '',
    confidence: 0
  })
  const [selectedCategory, setSelectedCategory] = useState('casual')
  const [showSettings, setShowSettings] = useState(false)
  const [transcriptionEnabled, setTranscriptionEnabled] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const recognitionRef = useRef<any>(null)

  const voiceConfig = getVoiceConfigForTier(membershipTier)
  const speechConfig = getSpeechToTextForDialect(preferredDialect)

  const translations = {
    en: {
      holdToRecord: 'Hold to record voice message',
      tapToRecord: 'Tap to record voice message',
      recording: 'Recording...',
      paused: 'Paused',
      playRecording: 'Play recording',
      deleteRecording: 'Delete recording',
      sendVoiceMessage: 'Send voice message',
      transcription: 'Transcription',
      voiceSettings: 'Voice settings',
      category: 'Message category',
      enableTranscription: 'Enable transcription',
      dialect: 'Portuguese dialect',
      quality: 'Recording quality',
      maxDuration: 'Max duration',
      recordingError: 'Recording failed. Please check microphone permissions.',
      transcriptionError: 'Transcription failed. Voice message will be sent without text.',
      microphonePermission: 'Microphone permission required',
      maxDurationReached: 'Maximum recording duration reached'
    },
    pt: {
      holdToRecord: 'Pressione para gravar mensagem de voz',
      tapToRecord: 'Toque para gravar mensagem de voz',
      recording: 'Gravando...',
      paused: 'Pausado',
      playRecording: 'Reproduzir gravação',
      deleteRecording: 'Eliminar gravação',
      sendVoiceMessage: 'Enviar mensagem de voz',
      transcription: 'Transcrição',
      voiceSettings: 'Configurações de voz',
      category: 'Categoria da mensagem',
      enableTranscription: 'Ativar transcrição',
      dialect: 'Dialeto português',
      quality: 'Qualidade da gravação',
      maxDuration: 'Duração máxima',
      recordingError: 'Falha na gravação. Verifique as permissões do microfone.',
      transcriptionError: 'Falha na transcrição. Mensagem será enviada sem texto.',
      microphonePermission: 'Permissão do microfone necessária',
      maxDurationReached: 'Duração máxima de gravação atingida'
    }
  }

  const t = translations[language]

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      
      const recognition = recognitionRef.current
      recognition.continuous = speechConfig.continuous
      recognition.interimResults = speechConfig.interimResults
      recognition.lang = speechConfig.language
      recognition.maxAlternatives = speechConfig.maxAlternatives

      recognition.onresult = (event: any) => {
        let transcript = ''
        let confidence = 0

        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript
            confidence = Math.max(confidence, event.results[i][0].confidence)
          }
        }

        if (transcript && confidence >= speechConfig.confidenceThreshold) {
          setRecordingState(prev => ({
            ...prev,
            transcription: transcript.trim(),
            confidence
          }))
        }
      }

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error)
      }
    }
  }, [preferredDialect])

  // Timer function
  const startTimer = useCallback(() => {
    const startTime = Date.now()
    
    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      
      setRecordingState(prev => ({
        ...prev,
        duration: elapsed
      }))

      // Auto-stop at max duration
      if (elapsed >= voiceConfig.maxDuration) {
        stopRecording()
      }
    }, 100)
  }, [voiceConfig.maxDuration])

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const startRecording = async () => {
    try {
      setError(null)
      
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: voiceConfig.sampleRate,
          channelCount: voiceConfig.channelCount,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      })

      streamRef.current = stream

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: voiceConfig.mimeType,
        audioBitsPerSecond: voiceConfig.bitRate
      })

      mediaRecorderRef.current = mediaRecorder

      const chunks: BlobPart[] = []
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: voiceConfig.mimeType })
        const audioUrl = URL.createObjectURL(audioBlob)
        
        setRecordingState(prev => ({
          ...prev,
          audioBlob,
          audioUrl,
          isRecording: false
        }))
      }

      mediaRecorder.start(100) // Collect data every 100ms
      
      setRecordingState(prev => ({
        ...prev,
        isRecording: true,
        isPaused: false,
        duration: 0,
        transcription: '',
        confidence: 0
      }))

      startTimer()

      // Start speech recognition if enabled
      if (transcriptionEnabled && recognitionRef.current) {
        recognitionRef.current.start()
      }

    } catch (error) {
      console.error('Error starting recording:', error)
      setError(t.recordingError)
    }
  }

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && recordingState.isRecording) {
      mediaRecorderRef.current.stop()
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch (e) {
        // Recognition might already be stopped
      }
    }

    stopTimer()
  }, [recordingState.isRecording, stopTimer])

  const pauseRecording = () => {
    if (mediaRecorderRef.current && recordingState.isRecording) {
      mediaRecorderRef.current.pause()
      stopTimer()
      
      setRecordingState(prev => ({
        ...prev,
        isPaused: true
      }))
    }
  }

  const resumeRecording = () => {
    if (mediaRecorderRef.current && recordingState.isPaused) {
      mediaRecorderRef.current.resume()
      startTimer()
      
      setRecordingState(prev => ({
        ...prev,
        isPaused: false
      }))
    }
  }

  const playRecording = () => {
    if (recordingState.audioUrl && audioPlayerRef.current) {
      audioPlayerRef.current.play()
      
      setRecordingState(prev => ({
        ...prev,
        isPlaying: true
      }))
    }
  }

  const pausePlayback = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause()
      
      setRecordingState(prev => ({
        ...prev,
        isPlaying: false
      }))
    }
  }

  const deleteRecording = () => {
    if (recordingState.audioUrl) {
      URL.revokeObjectURL(recordingState.audioUrl)
    }

    setRecordingState({
      isRecording: false,
      isPaused: false,
      isPlaying: false,
      duration: 0,
      audioBlob: null,
      audioUrl: null,
      transcription: '',
      confidence: 0
    })
  }

  const sendVoiceMessage = () => {
    if (recordingState.audioBlob) {
      onSendVoiceMessage(
        recordingState.audioBlob,
        recordingState.transcription,
        recordingState.duration
      )
      deleteRecording()
    }
  }

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={`voice-message-recorder ${className}`}>
      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2"
          >
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recording Interface */}
      {!recordingState.audioBlob ? (
        <div className="flex items-center space-x-4">
          {/* Record Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            disabled={disabled}
            className={`
              relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200
              ${recordingState.isRecording 
                ? 'bg-red-500 animate-pulse' 
                : 'bg-primary-600 hover:bg-primary-700'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            style={{
              backgroundColor: recordingState.isRecording ? '#ef4444' : PORTUGUESE_COLORS.primary
            }}
          >
            {recordingState.isRecording ? (
              <Square className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
            
            {/* Recording indicator */}
            {recordingState.isRecording && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute -inset-1 rounded-full border-2 border-red-300"
              />
            )}
          </motion.button>

          {/* Recording Status */}
          {recordingState.isRecording && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-700">
                  {recordingState.isPaused ? t.paused : t.recording}
                </span>
              </div>
              
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Timer className="w-4 h-4" />
                <span>{formatDuration(recordingState.duration)}</span>
                <span>/</span>
                <span>{formatDuration(voiceConfig.maxDuration)}</span>
              </div>

              {/* Pause/Resume Button */}
              <button
                onClick={recordingState.isPaused ? resumeRecording : pauseRecording}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
              >
                {recordingState.isPaused ? (
                  <Play className="w-4 h-4" />
                ) : (
                  <Pause className="w-4 h-4" />
                )}
              </button>
            </motion.div>
          )}

          {/* Settings Button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      ) : (
        /* Playback Interface */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Audio Player (hidden) */}
          <audio
            ref={audioPlayerRef}
            src={recordingState.audioUrl || undefined}
            onEnded={() => setRecordingState(prev => ({ ...prev, isPlaying: false }))}
          />

          {/* Playback Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={recordingState.isPlaying ? pausePlayback : playRecording}
              className="w-12 h-12 bg-primary-600 hover:bg-primary-700 rounded-full flex items-center justify-center text-white transition-colors"
              style={{ backgroundColor: PORTUGUESE_COLORS.primary }}
            >
              {recordingState.isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>

            <div className="flex-1">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Volume2 className="w-4 h-4" />
                <span>{formatDuration(recordingState.duration)}</span>
                <Waveform className="w-4 h-4" />
              </div>
              
              {/* Progress Bar Placeholder */}
              <div className="mt-1 h-1 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-primary-600 rounded-full transition-all duration-100"
                  style={{ 
                    width: recordingState.isPlaying ? '100%' : '0%',
                    backgroundColor: PORTUGUESE_COLORS.primary
                  }}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={deleteRecording}
                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendVoiceMessage}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
                style={{ backgroundColor: PORTUGUESE_COLORS.primary }}
              >
                <Send className="w-4 h-4" />
                <span className="text-sm font-medium">{t.sendVoiceMessage}</span>
              </motion.button>
            </div>
          </div>

          {/* Transcription Display */}
          {transcriptionEnabled && recordingState.transcription && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Languages className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{t.transcription}</span>
                </div>
                
                {recordingState.confidence > 0 && (
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-gray-600">
                      {Math.round(recordingState.confidence * 100)}%
                    </span>
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-800 italic">
                "{recordingState.transcription}"
              </p>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4"
          >
            <h4 className="font-medium text-gray-900">{t.voiceSettings}</h4>
            
            {/* Message Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.category}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {Object.entries(VOICE_MESSAGE_CATEGORIES).map(([key, category]) => (
                  <option key={key} value={key}>
                    {category.icon} {category.label[language]}
                  </option>
                ))}
              </select>
            </div>

            {/* Transcription Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                {t.enableTranscription}
              </label>
              <button
                onClick={() => setTranscriptionEnabled(!transcriptionEnabled)}
                className={`
                  relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                  ${transcriptionEnabled ? 'bg-primary-600' : 'bg-gray-200'}
                `}
              >
                <span
                  className={`
                    pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out
                    ${transcriptionEnabled ? 'translate-x-5' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>

            {/* Max Duration Display */}
            <div className="text-sm text-gray-600">
              <span className="font-medium">{t.maxDuration}:</span> {formatDuration(voiceConfig.maxDuration)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}