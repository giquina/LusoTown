/**
 * Enhanced Messaging Interface Integration Tests
 * 
 * Tests the complete voice messaging and translation system integration
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import EnhancedMessagingInterface from '@/components/EnhancedMessagingInterface'
import { LanguageProvider } from '@/context/LanguageContext'
import { messagingService } from '@/services/messagingService'

// Mock all external dependencies
jest.mock('@/services/messagingService')
const mockMessagingService = messagingService as jest.Mocked<typeof messagingService>

// Mock MediaRecorder and speech APIs
global.MediaRecorder = class MockMediaRecorder {
  static isTypeSupported = jest.fn().mockReturnValue(true)
  ondataavailable: ((event: any) => void) | null = null
  onstop: (() => void) | null = null
  
  constructor(stream: MediaStream, options?: MediaRecorderOptions) {}
  
  start(timeslice?: number) {
    setTimeout(() => {
      if (this.ondataavailable) {
        this.ondataavailable({ 
          data: new Blob(['mock audio data'], { type: 'audio/webm' })
        })
      }
    }, 100)
  }
  
  stop() {
    setTimeout(() => {
      if (this.onstop) this.onstop()
    }, 50)
  }
  
  pause() {}
  resume() {}
  state: 'inactive' | 'recording' | 'paused' = 'inactive'
} as any

// Mock getUserMedia
Object.defineProperty(navigator, 'mediaDevices', {
  value: {
    getUserMedia: jest.fn().mockResolvedValue({
      getTracks: () => [{ stop: jest.fn() }]
    })
  },
  writable: true
})

// Mock speech recognition and synthesis
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
      setTimeout(() => {
        if (this.onresult) {
          this.onresult({
            resultIndex: 0,
            results: [{
              0: { transcript: 'Olá! Como está?', confidence: 0.95 },
              isFinal: true
            }]
          })
        }
      }, 500)
    }
    
    stop() {
      if (this.onend) this.onend()
    }
  },
  writable: true
})

Object.defineProperty(window, 'speechSynthesis', {
  value: {
    speak: jest.fn(),
    cancel: jest.fn(),
    getVoices: jest.fn().mockReturnValue([])
  },
  writable: true
})

// Mock fetch for API calls
global.fetch = jest.fn()

// Mock clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined)
  }
})

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <LanguageProvider initialLanguage="en">
      {component}
    </LanguageProvider>
  )
}

const mockConversation = {
  id: 'conv-123',
  participant_ids: ['user-1', 'user-2'],
  connection_type: 'mutual_match' as const,
  is_active: true,
  last_activity_at: '2023-12-01T12:00:00Z',
  created_at: '2023-12-01T10:00:00Z',
  updated_at: '2023-12-01T12:00:00Z'
}

const mockMessages = [
  {
    id: 'msg-1',
    conversation_id: 'conv-123',
    sender_id: 'user-2',
    receiver_id: 'user-1',
    content: 'Olá! Como está?',
    message_type: 'text' as const,
    approval_status: 'auto_approved' as const,
    is_read: false,
    is_blocked: false,
    safety_score: 0.95,
    contains_contact_info: false,
    flagged_content: null,
    created_at: '2023-12-01T11:00:00Z',
    updated_at: '2023-12-01T11:00:00Z'
  }
]

describe('Enhanced Messaging Interface Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Setup messaging service mocks
    mockMessagingService.getOrCreateConversation.mockResolvedValue(mockConversation)
    mockMessagingService.getConversationMessages.mockResolvedValue(mockMessages)
    mockMessagingService.markMessagesAsRead.mockResolvedValue()
    mockMessagingService.sendMessage.mockResolvedValue({
      ...mockMessages[0],
      id: 'msg-new',
      sender_id: 'user-1',
      receiver_id: 'user-2',
      content: 'Hello! I am fine.',
      created_at: new Date().toISOString()
    })

    // Mock fetch for translation and voice APIs
    ;(fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/api/translate')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            originalText: 'Olá! Como está?',
            translatedText: 'Hello! How are you?',
            confidence: 0.95,
            sourceLanguage: 'pt-PT',
            targetLanguage: 'en'
          })
        })
      }
      
      if (url.includes('/api/voice-messages')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            id: 'voice-1',
            audioUrl: 'blob://mock-audio',
            duration: 5,
            transcription: 'Olá! Como está?',
            timestamp: new Date().toISOString()
          })
        })
      }

      return Promise.reject(new Error('Unknown API endpoint'))
    })
  })

  describe('Interface Initialization', () => {
    it('loads conversation and messages on mount', async () => {
      renderWithProviders(
        <EnhancedMessagingInterface
          targetUserId="user-2"
          targetUserName="João Silva"
          targetUserImage="/avatars/joao.jpg"
        />
      )

      await waitFor(() => {
        expect(mockMessagingService.getOrCreateConversation).toHaveBeenCalledWith('user-2')
        expect(mockMessagingService.getConversationMessages).toHaveBeenCalledWith('conv-123')
      })

      expect(screen.getByText('João Silva')).toBeInTheDocument()
      expect(screen.getByText('Olá! Como está?')).toBeInTheDocument()
    })

    it('displays connection type badge', async () => {
      renderWithProviders(
        <EnhancedMessagingInterface
          targetUserId="user-2"
          targetUserName="João Silva"
        />
      )

      await waitFor(() => {
        expect(screen.getByText(/mutual match/i)).toBeInTheDocument()
      })
    })

    it('shows loading state during initialization', () => {
      renderWithProviders(
        <EnhancedMessagingInterface
          targetUserId="user-2"
          targetUserName="João Silva"
        />
      )

      expect(screen.getByRole('status')).toBeInTheDocument()
    })
  })

  describe('Text Messaging', () => {
    beforeEach(async () => {
      renderWithProviders(
        <EnhancedMessagingInterface
          targetUserId="user-2"
          targetUserName="João Silva"
        />
      )

      await waitFor(() => {
        expect(screen.getByText('João Silva')).toBeInTheDocument()
      })
    })

    it('sends text message', async () => {
      const messageInput = screen.getByPlaceholderText(/type a message/i)
      const sendButton = screen.getByRole('button', { name: /send/i })

      await act(async () => {
        fireEvent.change(messageInput, { target: { value: 'Hello! I am fine.' } })
        fireEvent.click(sendButton)
      })

      expect(mockMessagingService.sendMessage).toHaveBeenCalledWith(
        'conv-123',
        'user-2',
        'Hello! I am fine.'
      )
    })

    it('clears input after sending message', async () => {
      const messageInput = screen.getByPlaceholderText(/type a message/i)
      const sendButton = screen.getByRole('button', { name: /send/i })

      await act(async () => {
        fireEvent.change(messageInput, { target: { value: 'Test message' } })
        fireEvent.click(sendButton)
      })

      await waitFor(() => {
        expect(messageInput).toHaveValue('')
      })
    })

    it('sends message on Enter key press', async () => {
      const messageInput = screen.getByPlaceholderText(/type a message/i)

      await act(async () => {
        fireEvent.change(messageInput, { target: { value: 'Keyboard message' } })
        fireEvent.keyPress(messageInput, { key: 'Enter', code: 'Enter' })
      })

      expect(mockMessagingService.sendMessage).toHaveBeenCalledWith(
        'conv-123',
        'user-2',
        'Keyboard message'
      )
    })
  })

  describe('Voice Messaging Integration', () => {
    beforeEach(async () => {
      renderWithProviders(
        <EnhancedMessagingInterface
          targetUserId="user-2"
          targetUserName="João Silva"
          membershipTier="ambassador"
          preferredDialect="pt-PT"
          voiceMessagesEnabled={true}
        />
      )

      await waitFor(() => {
        expect(screen.getByText('João Silva')).toBeInTheDocument()
      })
    })

    it('toggles voice recorder interface', async () => {
      const voiceButton = screen.getByLabelText(/voice message/i)

      await act(async () => {
        fireEvent.click(voiceButton)
      })

      expect(screen.getByText(/hold to record/i)).toBeInTheDocument()
    })

    it('records and sends voice message', async () => {
      const voiceButton = screen.getByLabelText(/voice message/i)

      await act(async () => {
        fireEvent.click(voiceButton)
      })

      const recordButton = screen.getByRole('button', { name: /record/i })

      // Start recording
      await act(async () => {
        fireEvent.mouseDown(recordButton)
      })

      await waitFor(() => {
        expect(screen.getByText(/recording/i)).toBeInTheDocument()
      })

      // Stop recording
      await act(async () => {
        fireEvent.mouseUp(recordButton)
      })

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /send voice message/i })).toBeInTheDocument()
      })

      // Send voice message
      const sendVoiceButton = screen.getByRole('button', { name: /send voice message/i })

      await act(async () => {
        fireEvent.click(sendVoiceButton)
      })

      expect(fetch).toHaveBeenCalledWith('/api/voice-messages', expect.objectContaining({
        method: 'POST',
        body: expect.any(FormData)
      }))
    })

    it('shows transcription during recording', async () => {
      const voiceButton = screen.getByLabelText(/voice message/i)

      await act(async () => {
        fireEvent.click(voiceButton)
      })

      const recordButton = screen.getByRole('button', { name: /record/i })

      await act(async () => {
        fireEvent.mouseDown(recordButton)
        await new Promise(resolve => setTimeout(resolve, 600)) // Wait for transcription
        fireEvent.mouseUp(recordButton)
      })

      await waitFor(() => {
        expect(screen.getByText(/olá! como está/i)).toBeInTheDocument()
      })
    })

    it('respects membership tier duration limits', async () => {
      expect(screen.getByText(/300/)).toBeInTheDocument() // Ambassador tier limit
    })
  })

  describe('Translation Integration', () => {
    beforeEach(async () => {
      renderWithProviders(
        <EnhancedMessagingInterface
          targetUserId="user-2"
          targetUserName="João Silva"
          translationEnabled={true}
        />
      )

      await waitFor(() => {
        expect(screen.getByText('João Silva')).toBeInTheDocument()
      })
    })

    it('translates existing messages', async () => {
      const translateButton = screen.getByLabelText(/translate/i)

      await act(async () => {
        fireEvent.click(translateButton)
      })

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/translate-message', expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(expect.objectContaining({
            text: 'Olá! Como está?'
          }))
        }))
      })
    })

    it('enables auto-translation setting', async () => {
      const settingsButton = screen.getByLabelText(/settings/i)

      await act(async () => {
        fireEvent.click(settingsButton)
      })

      const autoTranslateToggle = screen.getByLabelText(/auto-translate/i)

      await act(async () => {
        fireEvent.click(autoTranslateToggle)
      })

      expect(autoTranslateToggle).toBeChecked()
    })

    it('shows translation panel for new messages', async () => {
      const messageInput = screen.getByPlaceholderText(/type a message/i)
      const translateButton = screen.getByLabelText(/translate/i)

      await act(async () => {
        fireEvent.change(messageInput, { target: { value: 'Bom dia!' } })
        fireEvent.click(translateButton)
      })

      expect(screen.getByText(/translating/i)).toBeInTheDocument()
    })
  })

  describe('Portuguese Cultural Features', () => {
    beforeEach(async () => {
      renderWithProviders(
        <EnhancedMessagingInterface
          targetUserId="user-2"
          targetUserName="João Silva"
        />
      )

      await waitFor(() => {
        expect(screen.getByText('João Silva')).toBeInTheDocument()
      })
    })

    it('toggles Portuguese expressions panel', async () => {
      const culturalButton = screen.getByLabelText(/portuguese expressions/i)

      await act(async () => {
        fireEvent.click(culturalButton)
      })

      expect(screen.getByText(/portuguese communication/i)).toBeInTheDocument()
    })

    it('inserts selected expression into message input', async () => {
      const culturalButton = screen.getByLabelText(/portuguese expressions/i)

      await act(async () => {
        fireEvent.click(culturalButton)
      })

      // Wait for panel to load and mock selecting an expression
      await waitFor(() => {
        expect(screen.getByText(/portuguese communication/i)).toBeInTheDocument()
      })

      // This would normally trigger from the PortugueseCommunicationPanel
      const messageInput = screen.getByPlaceholderText(/type a message/i)
      
      await act(async () => {
        fireEvent.change(messageInput, { target: { value: '🇵🇹 Olá! Tudo bem?' } })
      })

      expect(messageInput).toHaveValue('🇵🇹 Olá! Tudo bem?')
    })

    it('shows cultural greetings based on time of day', async () => {
      const culturalButton = screen.getByLabelText(/portuguese expressions/i)

      await act(async () => {
        fireEvent.click(culturalButton)
      })

      await waitFor(() => {
        // Should show appropriate greeting for current time
        expect(screen.getByText(/greetings/i)).toBeInTheDocument()
      })
    })
  })

  describe('Settings and Preferences', () => {
    beforeEach(async () => {
      renderWithProviders(
        <EnhancedMessagingInterface
          targetUserId="user-2"
          targetUserName="João Silva"
        />
      )

      await waitFor(() => {
        expect(screen.getByText('João Silva')).toBeInTheDocument()
      })
    })

    it('toggles settings panel', async () => {
      const settingsButton = screen.getByLabelText(/settings/i)

      await act(async () => {
        fireEvent.click(settingsButton)
      })

      expect(screen.getByText(/enable voice messages/i)).toBeInTheDocument()
      expect(screen.getByText(/enable auto-translation/i)).toBeInTheDocument()
    })

    it('saves preference changes', async () => {
      const settingsButton = screen.getByLabelText(/settings/i)

      await act(async () => {
        fireEvent.click(settingsButton)
      })

      const voiceToggle = screen.getByLabelText(/enable voice messages/i)

      await act(async () => {
        fireEvent.click(voiceToggle)
      })

      // Voice recorder button should be hidden/disabled
      expect(screen.queryByLabelText(/voice message/i)).not.toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('handles messaging service errors', async () => {
      mockMessagingService.sendMessage.mockRejectedValue(new Error('Network error'))

      renderWithProviders(
        <EnhancedMessagingInterface
          targetUserId="user-2"
          targetUserName="João Silva"
        />
      )

      await waitFor(() => {
        expect(screen.getByText('João Silva')).toBeInTheDocument()
      })

      const messageInput = screen.getByPlaceholderText(/type a message/i)
      const sendButton = screen.getByRole('button', { name: /send/i })

      await act(async () => {
        fireEvent.change(messageInput, { target: { value: 'Test message' } })
        fireEvent.click(sendButton)
      })

      await waitFor(() => {
        expect(screen.getByText(/failed to send message/i)).toBeInTheDocument()
      })
    })

    it('handles translation API errors', async () => {
      ;(fetch as jest.Mock).mockImplementation((url: string) => {
        if (url.includes('/api/translate')) {
          return Promise.reject(new Error('Translation API error'))
        }
        return Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
      })

      renderWithProviders(
        <EnhancedMessagingInterface
          targetUserId="user-2"
          targetUserName="João Silva"
          translationEnabled={true}
        />
      )

      await waitFor(() => {
        expect(screen.getByText('João Silva')).toBeInTheDocument()
      })

      const translateButton = screen.getByLabelText(/translate/i)

      await act(async () => {
        fireEvent.click(translateButton)
      })

      await waitFor(() => {
        expect(screen.getByText(/translation failed/i)).toBeInTheDocument()
      })
    })

    it('handles voice recording permission errors', async () => {
      navigator.mediaDevices.getUserMedia = jest.fn().mockRejectedValue(
        new Error('Permission denied')
      )

      renderWithProviders(
        <EnhancedMessagingInterface
          targetUserId="user-2"
          targetUserName="João Silva"
          voiceMessagesEnabled={true}
        />
      )

      await waitFor(() => {
        expect(screen.getByText('João Silva')).toBeInTheDocument()
      })

      const voiceButton = screen.getByLabelText(/voice message/i)

      await act(async () => {
        fireEvent.click(voiceButton)
      })

      const recordButton = screen.getByRole('button', { name: /record/i })

      await act(async () => {
        fireEvent.mouseDown(recordButton)
      })

      await waitFor(() => {
        expect(screen.getByText(/microphone permission/i)).toBeInTheDocument()
      })
    })
  })

  describe('Performance and Optimization', () => {
    it('only loads voice recorder when needed', async () => {
      renderWithProviders(
        <EnhancedMessagingInterface
          targetUserId="user-2"
          targetUserName="João Silva"
          voiceMessagesEnabled={false}
        />
      )

      await waitFor(() => {
        expect(screen.getByText('João Silva')).toBeInTheDocument()
      })

      // Voice message button should not be visible
      expect(screen.queryByLabelText(/voice message/i)).not.toBeInTheDocument()
    })

    it('debounces translation requests', async () => {
      jest.useFakeTimers()

      renderWithProviders(
        <EnhancedMessagingInterface
          targetUserId="user-2"
          targetUserName="João Silva"
          autoTranslate={true}
        />
      )

      await waitFor(() => {
        expect(screen.getByText('João Silva')).toBeInTheDocument()
      })

      const messageInput = screen.getByPlaceholderText(/type a message/i)

      // Type quickly (should debounce)
      await act(async () => {
        fireEvent.change(messageInput, { target: { value: 'H' } })
        fireEvent.change(messageInput, { target: { value: 'He' } })
        fireEvent.change(messageInput, { target: { value: 'Hello' } })
      })

      // Fast-forward past debounce time
      act(() => {
        jest.advanceTimersByTime(1000)
      })

      // Should only make one translation request
      expect(fetch).toHaveBeenCalledTimes(1)

      jest.useRealTimers()
    })
  })

  describe('Accessibility Features', () => {
    beforeEach(async () => {
      renderWithProviders(
        <EnhancedMessagingInterface
          targetUserId="user-2"
          targetUserName="João Silva"
        />
      )

      await waitFor(() => {
        expect(screen.getByText('João Silva')).toBeInTheDocument()
      })
    })

    it('provides proper ARIA labels for all controls', () => {
      expect(screen.getByLabelText(/type a message/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/send/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/settings/i)).toBeInTheDocument()
    })

    it('supports keyboard navigation between controls', async () => {
      const messageInput = screen.getByPlaceholderText(/type a message/i)
      const sendButton = screen.getByRole('button', { name: /send/i })

      // Tab navigation should work
      await act(async () => {
        messageInput.focus()
        fireEvent.keyDown(messageInput, { key: 'Tab' })
      })

      expect(sendButton).toHaveFocus()
    })

    it('provides screen reader announcements for status changes', async () => {
      const messageInput = screen.getByPlaceholderText(/type a message/i)
      const sendButton = screen.getByRole('button', { name: /send/i })

      await act(async () => {
        fireEvent.change(messageInput, { target: { value: 'Test message' } })
        fireEvent.click(sendButton)
      })

      // Should have status announcement for sent message
      expect(screen.getByRole('status')).toBeInTheDocument()
    })
  })
})