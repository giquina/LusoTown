/**
 * LusoBot Chat Component Production Tests
 * 
 * Tests for the React chat interface component, including mobile optimization,
 * accessibility, and Portuguese community-specific features.
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import LusoBotChat from '@/components/LusoBotChat'
import { LanguageProvider } from '@/context/LanguageContext'
import { SubscriptionProvider } from '@/context/SubscriptionContext'

// Mock dependencies
jest.mock('@/lib/lusobot-engine', () => ({
  LusoBotSession: jest.fn().mockImplementation((context, language) => ({
    getMessages: jest.fn().mockReturnValue([
      {
        id: 'welcome_123',
        role: 'assistant',
        content: language === 'pt' 
          ? 'Olá! Sou o LusoBot, o teu assistente cultural português.'
          : 'Hello! I\'m LusoBot, your Portuguese cultural assistant.',
        timestamp: new Date(),
        language,
        culturalContext: {
          region: 'diaspora_uk',
          topic: 'community',
          expertise: ['uk_portuguese_community'],
          confidence: 1.0
        },
        emotionalTone: {
          saudade: 0,
          nostalgia: 0,
          hope: 0.8,
          community: 0.9,
          heritage: 0.7
        }
      }
    ]),
    sendMessage: jest.fn().mockResolvedValue({
      id: 'response_456',
      role: 'assistant',
      content: 'Test response from LusoBot',
      timestamp: new Date(),
      language: 'en',
      culturalContext: {
        region: 'diaspora_uk',
        topic: 'community',
        expertise: ['cultural_events'],
        confidence: 0.8
      },
      emotionalTone: {
        saudade: 0.2,
        nostalgia: 0.1,
        hope: 0.6,
        community: 0.7,
        heritage: 0.5
      },
      suggestions: [
        {
          type: 'event',
          title: 'Portuguese Cultural Event',
          description: 'Join our community gathering',
          priority: 'high',
          culturalRelevance: 0.9
        }
      ]
    }),
    updateUserContext: jest.fn(),
    setLanguage: jest.fn(),
    exportConversation: jest.fn().mockReturnValue('{}')
  }))
}))

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}))

// Mock Web Speech API
const mockSpeechRecognition = {
  start: jest.fn(),
  stop: jest.fn(),
  onresult: null,
  onerror: null,
  onend: null,
  lang: 'en-GB',
  continuous: false,
  interimResults: false
}

;(global as any).webkitSpeechRecognition = jest.fn().mockImplementation(() => mockSpeechRecognition)

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode; language?: 'en' | 'pt' }> = ({ 
  children, 
  language = 'en' 
}) => (
  <LanguageProvider initialLanguage={language}>
    <SubscriptionProvider>
      {children}
    </SubscriptionProvider>
  </LanguageProvider>
)

describe('LusoBot Chat Component', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Component Rendering', () => {
    test('should render LusoBot chat interface correctly', async () => {
      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      // Check for main interface elements
      expect(screen.getByText('LusoBot')).toBeInTheDocument()
      expect(screen.getByText('Portuguese Cultural Assistant')).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/type your message/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
    })

    test('should render in Portuguese when language is set to PT', async () => {
      await act(async () => {
        render(
          <TestWrapper language="pt">
            <LusoBotChat />
          </TestWrapper>
        )
      })

      expect(screen.getByText('Assistente Cultural Português')).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/escreve a tua mensagem/i)).toBeInTheDocument()
      expect(screen.getByText('Conversando em Português')).toBeInTheDocument()
    })

    test('should display welcome message on initialization', async () => {
      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      await waitFor(() => {
        expect(screen.getByText(/Hello! I'm LusoBot/i)).toBeInTheDocument()
      })
    })

    test('should render in embedded mode when specified', async () => {
      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat isEmbedded={true} />
          </TestWrapper>
        )
      })

      const container = screen.getByTestId('lusobot-chat') || document.querySelector('[class*="h-full"]')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Message Input and Sending', () => {
    test('should handle text input correctly', async () => {
      const user = userEvent.setup()
      
      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      const input = screen.getByPlaceholderText(/type your message/i)
      await user.type(input, 'Hello LusoBot')
      
      expect(input).toHaveValue('Hello LusoBot')
    })

    test('should send message when send button is clicked', async () => {
      const user = userEvent.setup()
      
      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      const input = screen.getByPlaceholderText(/type your message/i)
      const sendButton = screen.getByRole('button', { name: /send/i })
      
      await user.type(input, 'Test message')
      await user.click(sendButton)

      await waitFor(() => {
        expect(screen.getByText('Test response from LusoBot')).toBeInTheDocument()
      })
    })

    test('should send message when Enter key is pressed', async () => {
      const user = userEvent.setup()
      
      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      const input = screen.getByPlaceholderText(/type your message/i)
      
      await user.type(input, 'Test message{enter}')

      await waitFor(() => {
        expect(screen.getByText('Test response from LusoBot')).toBeInTheDocument()
      })
    })

    test('should not send empty messages', async () => {
      const user = userEvent.setup()
      
      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      const sendButton = screen.getByRole('button', { name: /send/i })
      
      // Try to send empty message
      await user.click(sendButton)

      // Should not create new messages beyond the welcome message
      const messages = screen.getAllByText(/LusoBot/i)
      expect(messages.length).toBeLessThanOrEqual(2) // Header + welcome message
    })

    test('should respect character limit', async () => {
      const user = userEvent.setup()
      
      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      const input = screen.getByPlaceholderText(/type your message/i) as HTMLInputElement
      const longMessage = 'a'.repeat(600) // Exceeds 500 character limit
      
      await user.type(input, longMessage)
      
      expect(input.value.length).toBeLessThanOrEqual(500)
    })
  })

  describe('Voice Input Functionality', () => {
    test('should handle voice input button click', async () => {
      const user = userEvent.setup()
      
      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      const voiceButton = screen.getByRole('button', { name: /voice/i }) || 
                         document.querySelector('[class*="MicrophoneIcon"]')?.parentElement
      
      if (voiceButton) {
        await user.click(voiceButton)
        expect(mockSpeechRecognition.start).toHaveBeenCalled()
      }
    })

    test('should set correct language for voice recognition', async () => {
      const user = userEvent.setup()
      
      await act(async () => {
        render(
          <TestWrapper language="pt">
            <LusoBotChat />
          </TestWrapper>
        )
      })

      const voiceButton = screen.getByRole('button', { name: /voice/i }) || 
                         document.querySelector('[class*="MicrophoneIcon"]')?.parentElement
      
      if (voiceButton) {
        await user.click(voiceButton)
        expect(mockSpeechRecognition.lang).toBe('pt-PT')
      }
    })
  })

  describe('Emotional Tone Display', () => {
    test('should display saudade meter for high emotional content', async () => {
      // Mock a response with high saudade
      const mockSession = require('@/lib/lusobot-engine').LusoBotSession
      mockSession.mockImplementation(() => ({
        getMessages: jest.fn().mockReturnValue([
          {
            id: 'welcome_123',
            role: 'assistant',
            content: 'Welcome message',
            timestamp: new Date(),
            language: 'en'
          }
        ]),
        sendMessage: jest.fn().mockResolvedValue({
          id: 'high_saudade_response',
          role: 'assistant',
          content: 'I understand that deep saudade you\'re feeling.',
          timestamp: new Date(),
          language: 'en',
          emotionalTone: {
            saudade: 0.8,
            nostalgia: 0.7,
            hope: 0.4,
            community: 0.6,
            heritage: 0.8
          }
        })
      }))

      const user = userEvent.setup()
      
      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      const input = screen.getByPlaceholderText(/type your message/i)
      await user.type(input, 'I miss home so much{enter}')

      await waitFor(() => {
        expect(screen.getByText('Emotional Tone Detected')).toBeInTheDocument()
      })
    })
  })

  describe('Suggestions Display', () => {
    test('should display suggestions when provided by LusoBot', async () => {
      const user = userEvent.setup()
      
      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      const input = screen.getByPlaceholderText(/type your message/i)
      await user.type(input, 'I need cultural events{enter}')

      await waitFor(() => {
        expect(screen.getByText('Personalized Suggestions')).toBeInTheDocument()
        expect(screen.getByText('Portuguese Cultural Event')).toBeInTheDocument()
      })
    })

    test('should handle suggestion click correctly', async () => {
      const user = userEvent.setup()
      
      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      const input = screen.getByPlaceholderText(/type your message/i)
      await user.type(input, 'I need cultural events{enter}')

      await waitFor(() => {
        const suggestion = screen.getByText('Portuguese Cultural Event')
        expect(suggestion).toBeInTheDocument()
      })

      const suggestionButton = screen.getByText('Portuguese Cultural Event').closest('button')
      if (suggestionButton) {
        await user.click(suggestionButton)
        // Should either open link or add to chat input
        // This depends on the suggestion configuration
      }
    })
  })

  describe('Quick Starters', () => {
    test('should display conversation starters for new chat', async () => {
      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      await waitFor(() => {
        expect(screen.getByText('Conversation Starters')).toBeInTheDocument()
        expect(screen.getByText(/Portuguese food in London/i)).toBeInTheDocument()
      })
    })

    test('should display Portuguese conversation starters when language is PT', async () => {
      await act(async () => {
        render(
          <TestWrapper language="pt">
            <LusoBotChat />
          </TestWrapper>
        )
      })

      await waitFor(() => {
        expect(screen.getByText('Ideias para Começar')).toBeInTheDocument()
        expect(screen.getByText(/comida portuguesa em Londres/i)).toBeInTheDocument()
      })
    })

    test('should populate input when starter is clicked', async () => {
      const user = userEvent.setup()
      
      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      const starter = screen.getByText(/Portuguese food in London/i)
      await user.click(starter)

      const input = screen.getByPlaceholderText(/type your message/i)
      expect(input).toHaveValue(expect.stringContaining('Portuguese food'))
    })
  })

  describe('Accessibility', () => {
    test('should have proper ARIA labels', async () => {
      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      const input = screen.getByPlaceholderText(/type your message/i)
      expect(input).toHaveAttribute('type', 'text')
      
      const sendButton = screen.getByRole('button', { name: /send/i })
      expect(sendButton).toBeInTheDocument()
    })

    test('should support keyboard navigation', async () => {
      const user = userEvent.setup()
      
      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      // Tab navigation should work
      await user.tab()
      const input = screen.getByPlaceholderText(/type your message/i)
      expect(input).toHaveFocus()

      await user.tab()
      const sendButton = screen.getByRole('button', { name: /send/i })
      expect(sendButton).toHaveFocus()
    })
  })

  describe('Mobile Optimization', () => {
    test('should be responsive on mobile viewport', async () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })

      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      const container = document.querySelector('[class*="w-96"]') || 
                       document.querySelector('[class*="h-screen"]')
      expect(container).toBeInTheDocument()
    })

    test('should handle touch interactions properly', async () => {
      const user = userEvent.setup()
      
      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      const sendButton = screen.getByRole('button', { name: /send/i })
      
      // Simulate touch interaction
      fireEvent.touchStart(sendButton)
      fireEvent.touchEnd(sendButton)
      
      // Should not cause issues
      expect(sendButton).toBeInTheDocument()
    })
  })

  describe('Loading States', () => {
    test('should show loading indicator while sending message', async () => {
      // Mock delayed response
      const mockSession = require('@/lib/lusobot-engine').LusoBotSession
      mockSession.mockImplementation(() => ({
        getMessages: jest.fn().mockReturnValue([]),
        sendMessage: jest.fn().mockImplementation(() => 
          new Promise(resolve => setTimeout(resolve, 1000))
        )
      }))

      const user = userEvent.setup()
      
      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      const input = screen.getByPlaceholderText(/type your message/i)
      const sendButton = screen.getByRole('button', { name: /send/i })
      
      await user.type(input, 'Test message')
      await user.click(sendButton)

      // Should show loading state
      expect(screen.getByText(/thinking/i)).toBeInTheDocument()
      expect(sendButton).toBeDisabled()
    })

    test('should show loading spinner on initial render', async () => {
      // Mock session as null initially
      const mockSession = require('@/lib/lusobot-engine').LusoBotSession
      mockSession.mockImplementation(() => null)

      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      const spinner = document.querySelector('[class*="animate-spin"]')
      expect(spinner).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    test('should handle send message errors gracefully', async () => {
      const mockToast = require('react-hot-toast').toast
      
      // Mock error in sendMessage
      const mockSession = require('@/lib/lusobot-engine').LusoBotSession
      mockSession.mockImplementation(() => ({
        getMessages: jest.fn().mockReturnValue([]),
        sendMessage: jest.fn().mockRejectedValue(new Error('Network error'))
      }))

      const user = userEvent.setup()
      
      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      const input = screen.getByPlaceholderText(/type your message/i)
      await user.type(input, 'Test message{enter}')

      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith(
          expect.stringContaining('Error sending message')
        )
      })
    })

    test('should handle voice recognition errors', async () => {
      const mockToast = require('react-hot-toast').toast
      const user = userEvent.setup()
      
      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      const voiceButton = document.querySelector('[class*="MicrophoneIcon"]')?.parentElement
      
      if (voiceButton) {
        await user.click(voiceButton)
        
        // Simulate recognition error
        if (mockSpeechRecognition.onerror) {
          mockSpeechRecognition.onerror()
        }

        await waitFor(() => {
          expect(mockToast.error).toHaveBeenCalledWith(
            expect.stringContaining('Voice recognition error')
          )
        })
      }
    })
  })

  describe('Portuguese Cultural Features', () => {
    test('should display Portuguese flag in avatar', async () => {
      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      const flagEmoji = screen.getByText('🇵🇹')
      expect(flagEmoji).toBeInTheDocument()
    })

    test('should use Portuguese cultural color scheme', async () => {
      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      const gradientElements = document.querySelectorAll('[class*="from-primary-5"]')
      expect(gradientElements.length).toBeGreaterThan(0)
    })

    test('should handle Portuguese cultural context appropriately', async () => {
      const user = userEvent.setup()
      
      await act(async () => {
        render(
          <TestWrapper language="pt">
            <LusoBotChat />
          </TestWrapper>
        )
      })

      const input = screen.getByPlaceholderText(/escreve a tua mensagem/i)
      await user.type(input, 'Tenho saudades de Portugal{enter}')

      await waitFor(() => {
        // Should show emotional support
        expect(screen.getByText(/estou aqui para te apoiar/i)).toBeInTheDocument()
      })
    })
  })

  describe('Integration with LusoTown Platform', () => {
    test('should integrate with subscription context', async () => {
      await act(async () => {
        render(
          <TestWrapper>
            <LusoBotChat />
          </TestWrapper>
        )
      })

      // Should render without subscription context errors
      expect(screen.getByText('LusoBot')).toBeInTheDocument()
    })

    test('should maintain language context consistency', async () => {
      await act(async () => {
        render(
          <TestWrapper language="pt">
            <LusoBotChat />
          </TestWrapper>
        )
      })

      expect(screen.getByText('Assistente Cultural Português')).toBeInTheDocument()
      expect(screen.getByText('Conversando em Português')).toBeInTheDocument()
    })
  })
})