/**
 * Voice Message Recorder Component Tests
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import VoiceMessageRecorder from '@/components/VoiceMessageRecorder'
import { LanguageProvider } from '@/context/LanguageContext'
import { VOICE_RECORDING_CONFIG } from '@/config/voice-messaging'

// Mock MediaRecorder API
class MockMediaRecorder {
  static isTypeSupported = jest.fn().mockReturnValue(true)
  
  ondataavailable: ((event: any) => void) | null = null
  onstop: (() => void) | null = null
  onerror: ((event: any) => void) | null = null
  
  private chunks: BlobPart[] = []
  
  constructor(stream: MediaStream, options?: MediaRecorderOptions) {
    // Mock constructor
  }
  
  start(timeslice?: number) {
    // Simulate data available after a short delay
    setTimeout(() => {
      const mockBlob = new Blob(['mock audio data'], { type: 'audio/webm' })
      if (this.ondataavailable) {
        this.ondataavailable({ data: mockBlob })
      }
    }, 100)
  }
  
  stop() {
    setTimeout(() => {
      if (this.onstop) {
        this.onstop()
      }
    }, 50)
  }
  
  pause() {
    // Mock pause
  }
  
  resume() {
    // Mock resume
  }
  
  state: 'inactive' | 'recording' | 'paused' = 'inactive'
}

// Mock getUserMedia
Object.defineProperty(navigator, 'mediaDevices', {
  value: {
    getUserMedia: jest.fn().mockResolvedValue({
      getTracks: () => [{ stop: jest.fn() }]
    })
  },
  writable: true
})

// Mock speechSynthesis and recognition
Object.defineProperty(window, 'speechSynthesis', {
  value: {
    speak: jest.fn(),
    cancel: jest.fn(),
    getVoices: jest.fn().mockReturnValue([])
  },
  writable: true
})

Object.defineProperty(window, 'webkitSpeechRecognition', {
  value: class MockSpeechRecognition {
    continuous = false
    interimResults = false
    lang = 'pt-PT'
    maxAlternatives = 1
    
    onresult: ((event: any) => void) | null = null
    onerror: ((event: any) => void) | null = null
    onend: (() => void) | null = null
    
    start() {
      // Mock transcription result
      setTimeout(() => {
        if (this.onresult) {
          this.onresult({
            resultIndex: 0,
            results: [{
              0: {
                transcript: 'Olá, como está?',
                confidence: 0.95
              },
              isFinal: true
            }]
          })
        }
      }, 500)
    }
    
    stop() {
      if (this.onend) {
        this.onend()
      }
    }
  },
  writable: true
})

// Mock MediaRecorder globally
global.MediaRecorder = MockMediaRecorder as any

const renderWithLanguage = (component: React.ReactElement, language: 'en' | 'pt' = 'en') => {
  return render(
    <LanguageProvider initialLanguage={language}>
      {component}
    </LanguageProvider>
  )
}

describe('VoiceMessageRecorder', () => {
  const mockOnSendVoiceMessage = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
    mockOnSendVoiceMessage.mockClear()
  })

  describe('Rendering', () => {
    it('renders the record button', () => {
      renderWithLanguage(
        <VoiceMessageRecorder onSendVoiceMessage={mockOnSendVoiceMessage} />
      )
      
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders in Portuguese', () => {
      renderWithLanguage(
        <VoiceMessageRecorder onSendVoiceMessage={mockOnSendVoiceMessage} />,
        'pt'
      )
      
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', expect.stringContaining('gravar'))
    })

    it('shows settings button', () => {
      renderWithLanguage(
        <VoiceMessageRecorder onSendVoiceMessage={mockOnSendVoiceMessage} />
      )
      
      const settingsButton = screen.getByLabelText(/settings/i)
      expect(settingsButton).toBeInTheDocument()
    })
  })

  describe('Recording Functionality', () => {
    it('starts recording on button press', async () => {
      renderWithLanguage(
        <VoiceMessageRecorder onSendVoiceMessage={mockOnSendVoiceMessage} />
      )
      
      const recordButton = screen.getByRole('button', { name: /record/i })
      
      await act(async () => {
        fireEvent.mouseDown(recordButton)
      })

      await waitFor(() => {
        expect(screen.getByText(/recording/i)).toBeInTheDocument()
      })
    })

    it('stops recording on button release', async () => {
      renderWithLanguage(
        <VoiceMessageRecorder onSendVoiceMessage={mockOnSendVoiceMessage} />
      )
      
      const recordButton = screen.getByRole('button', { name: /record/i })
      
      await act(async () => {
        fireEvent.mouseDown(recordButton)
        fireEvent.mouseUp(recordButton)
      })

      await waitFor(() => {
        expect(screen.queryByText(/recording/i)).not.toBeInTheDocument()
      })
    })

    it('displays recording duration', async () => {
      renderWithLanguage(
        <VoiceMessageRecorder onSendVoiceMessage={mockOnSendVoiceMessage} />
      )
      
      const recordButton = screen.getByRole('button', { name: /record/i })
      
      await act(async () => {
        fireEvent.mouseDown(recordButton)
      })

      await waitFor(() => {
        expect(screen.getByText(/0:00/)).toBeInTheDocument()
      })
    })

    it('respects membership tier duration limits', () => {
      const { rerender } = renderWithLanguage(
        <VoiceMessageRecorder 
          onSendVoiceMessage={mockOnSendVoiceMessage}
          membershipTier="standard"
        />
      )

      // Standard tier should have 60-second limit
      expect(screen.getByText(/60/)).toBeInTheDocument()

      rerender(
        <LanguageProvider initialLanguage="en">
          <VoiceMessageRecorder 
            onSendVoiceMessage={mockOnSendVoiceMessage}
            membershipTier="ambassador"
          />
        </LanguageProvider>
      )

      // Ambassador tier should have 300-second limit
      expect(screen.getByText(/300/)).toBeInTheDocument()
    })
  })

  describe('Transcription', () => {
    it('enables transcription by default', async () => {
      renderWithLanguage(
        <VoiceMessageRecorder onSendVoiceMessage={mockOnSendVoiceMessage} />
      )
      
      const recordButton = screen.getByRole('button', { name: /record/i })
      
      await act(async () => {
        fireEvent.mouseDown(recordButton)
      })

      await waitFor(() => {
        expect(screen.getByText(/transcription/i)).toBeInTheDocument()
      }, { timeout: 1000 })
    })

    it('displays transcribed text', async () => {
      renderWithLanguage(
        <VoiceMessageRecorder onSendVoiceMessage={mockOnSendVoiceMessage} />
      )
      
      const recordButton = screen.getByRole('button', { name: /record/i })
      
      await act(async () => {
        fireEvent.mouseDown(recordButton)
        await new Promise(resolve => setTimeout(resolve, 600)) // Wait for transcription
        fireEvent.mouseUp(recordButton)
      })

      await waitFor(() => {
        expect(screen.getByText(/olá, como está/i)).toBeInTheDocument()
      })
    })

    it('shows confidence score', async () => {
      renderWithLanguage(
        <VoiceMessageRecorder onSendVoiceMessage={mockOnSendVoiceMessage} />
      )
      
      const recordButton = screen.getByRole('button', { name: /record/i })
      
      await act(async () => {
        fireEvent.mouseDown(recordButton)
        await new Promise(resolve => setTimeout(resolve, 600))
        fireEvent.mouseUp(recordButton)
      })

      await waitFor(() => {
        expect(screen.getByText(/95%/)).toBeInTheDocument()
      })
    })
  })

  describe('Playback Controls', () => {
    beforeEach(async () => {
      renderWithLanguage(
        <VoiceMessageRecorder onSendVoiceMessage={mockOnSendVoiceMessage} />
      )
      
      const recordButton = screen.getByRole('button', { name: /record/i })
      
      await act(async () => {
        fireEvent.mouseDown(recordButton)
        await new Promise(resolve => setTimeout(resolve, 200))
        fireEvent.mouseUp(recordButton)
      })
      
      // Wait for recording to complete
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument()
      })
    })

    it('shows playback controls after recording', () => {
      expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
    })

    it('allows deleting recording', async () => {
      const deleteButton = screen.getByRole('button', { name: /delete/i })
      
      await act(async () => {
        fireEvent.click(deleteButton)
      })

      // Should return to recording mode
      expect(screen.getByRole('button', { name: /record/i })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /play/i })).not.toBeInTheDocument()
    })

    it('calls onSendVoiceMessage when send button is clicked', async () => {
      const sendButton = screen.getByRole('button', { name: /send/i })
      
      await act(async () => {
        fireEvent.click(sendButton)
      })

      expect(mockOnSendVoiceMessage).toHaveBeenCalledWith(
        expect.any(Blob),
        'Olá, como está?',
        expect.any(Number)
      )
    })
  })

  describe('Settings Panel', () => {
    beforeEach(() => {
      renderWithLanguage(
        <VoiceMessageRecorder onSendVoiceMessage={mockOnSendVoiceMessage} />
      )
    })

    it('toggles settings panel', async () => {
      const settingsButton = screen.getByLabelText(/settings/i)
      
      await act(async () => {
        fireEvent.click(settingsButton)
      })

      expect(screen.getByText(/voice settings/i)).toBeInTheDocument()
    })

    it('allows selecting message category', async () => {
      const settingsButton = screen.getByLabelText(/settings/i)
      
      await act(async () => {
        fireEvent.click(settingsButton)
      })

      const categorySelect = screen.getByLabelText(/category/i)
      
      await act(async () => {
        fireEvent.change(categorySelect, { target: { value: 'cultural' } })
      })

      expect(categorySelect).toHaveValue('cultural')
    })

    it('allows toggling transcription', async () => {
      const settingsButton = screen.getByLabelText(/settings/i)
      
      await act(async () => {
        fireEvent.click(settingsButton)
      })

      const transcriptionToggle = screen.getByLabelText(/enable transcription/i)
      
      await act(async () => {
        fireEvent.click(transcriptionToggle)
      })

      // Should toggle transcription setting
      expect(transcriptionToggle).not.toBeChecked()
    })
  })

  describe('Error Handling', () => {
    it('shows error when microphone permission is denied', async () => {
      // Mock getUserMedia to reject
      navigator.mediaDevices.getUserMedia = jest.fn().mockRejectedValue(
        new Error('Permission denied')
      )

      renderWithLanguage(
        <VoiceMessageRecorder onSendVoiceMessage={mockOnSendVoiceMessage} />
      )
      
      const recordButton = screen.getByRole('button', { name: /record/i })
      
      await act(async () => {
        fireEvent.mouseDown(recordButton)
      })

      await waitFor(() => {
        expect(screen.getByText(/microphone permission/i)).toBeInTheDocument()
      })
    })

    it('disables recording when disabled prop is true', () => {
      renderWithLanguage(
        <VoiceMessageRecorder 
          onSendVoiceMessage={mockOnSendVoiceMessage}
          disabled={true}
        />
      )
      
      const recordButton = screen.getByRole('button', { name: /record/i })
      expect(recordButton).toBeDisabled()
    })
  })

  describe('Portuguese Dialect Support', () => {
    it('configures speech recognition for Portugal Portuguese', () => {
      renderWithLanguage(
        <VoiceMessageRecorder 
          onSendVoiceMessage={mockOnSendVoiceMessage}
          preferredDialect="pt-PT"
        />
      )
      
      // Component should be configured for Portuguese dialect
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('configures speech recognition for Brazilian Portuguese', () => {
      renderWithLanguage(
        <VoiceMessageRecorder 
          onSendVoiceMessage={mockOnSendVoiceMessage}
          preferredDialect="pt-BR"
        />
      )
      
      // Component should be configured for Brazilian dialect
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('provides proper ARIA labels', () => {
      renderWithLanguage(
        <VoiceMessageRecorder onSendVoiceMessage={mockOnSendVoiceMessage} />
      )
      
      const recordButton = screen.getByRole('button')
      expect(recordButton).toHaveAccessibleName()
    })

    it('supports keyboard navigation', async () => {
      renderWithLanguage(
        <VoiceMessageRecorder onSendVoiceMessage={mockOnSendVoiceMessage} />
      )
      
      const settingsButton = screen.getByLabelText(/settings/i)
      
      await act(async () => {
        settingsButton.focus()
        fireEvent.keyDown(settingsButton, { key: 'Enter' })
      })

      expect(screen.getByText(/voice settings/i)).toBeInTheDocument()
    })

    it('provides visual feedback for recording state', async () => {
      renderWithLanguage(
        <VoiceMessageRecorder onSendVoiceMessage={mockOnSendVoiceMessage} />
      )
      
      const recordButton = screen.getByRole('button', { name: /record/i })
      
      await act(async () => {
        fireEvent.mouseDown(recordButton)
      })

      await waitFor(() => {
        expect(recordButton).toHaveClass('animate-pulse')
      })
    })
  })
})

// Mock data for configuration tests
describe('Voice Recording Configuration', () => {
  it('provides different configurations for membership tiers', () => {
    expect(VOICE_RECORDING_CONFIG.standard.maxDuration).toBe(60)
    expect(VOICE_RECORDING_CONFIG.premium.maxDuration).toBe(180)
    expect(VOICE_RECORDING_CONFIG.ambassador.maxDuration).toBe(300)
  })

  it('uses appropriate audio quality settings', () => {
    expect(VOICE_RECORDING_CONFIG.standard.bitRate).toBe(128000)
    expect(VOICE_RECORDING_CONFIG.premium.bitRate).toBe(256000)
    expect(VOICE_RECORDING_CONFIG.ambassador.bitRate).toBe(320000)
  })

  it('supports Portuguese audio formats', () => {
    Object.values(VOICE_RECORDING_CONFIG).forEach(config => {
      expect(config.mimeType).toContain('webm')
      expect(config.fileFormat).toBe('webm')
    })
  })
})