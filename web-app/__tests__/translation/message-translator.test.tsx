/**
 * Message Translator Component Tests
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import MessageTranslator from '@/components/MessageTranslator'
import { LanguageProvider } from '@/context/LanguageContext'
import { 
  PORTUGUESE_DIALECTS,
  TRANSLATION_QUALITY,
  isPortugueseIdiom,
  translateIdiom
} from '@/config/portuguese-translation'

// Mock fetch for translation API
global.fetch = jest.fn()

// Mock speechSynthesis
Object.defineProperty(window, 'speechSynthesis', {
  value: {
    speak: jest.fn(),
    cancel: jest.fn(),
    getVoices: jest.fn().mockReturnValue([
      { lang: 'pt-PT', name: 'Portuguese Voice' },
      { lang: 'pt-BR', name: 'Brazilian Voice' },
      { lang: 'en-US', name: 'English Voice' }
    ])
  },
  writable: true
})

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined)
  }
})

const renderWithLanguage = (component: React.ReactElement, language: 'en' | 'pt' = 'en') => {
  return render(
    <LanguageProvider initialLanguage={language}>
      {component}
    </LanguageProvider>
  )
}

const mockTranslationResponse = {
  originalText: 'Olá! Como está?',
  translatedText: 'Hello! How are you?',
  sourceLanguage: 'pt-PT',
  targetLanguage: 'en',
  dialect: 'pt-PT',
  confidence: 0.95,
  quality: {
    score: 0.95,
    label: { en: 'Excellent', pt: 'Excelente' },
    color: '#22c55e',
    icon: '✅'
  },
  provider: 'DeepL',
  alternatives: ['Hi! How are you?', 'Hello! How are you doing?'],
  cultural: {
    markers: ['saudações'],
    idioms: [],
    formality: 'casual',
    regionalExpressions: []
  },
  timestamp: '2023-12-01T12:00:00Z'
}

describe('MessageTranslator', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockTranslationResponse)
    })
  })

  describe('Rendering', () => {
    it('renders translator interface', async () => {
      renderWithLanguage(
        <MessageTranslator originalMessage="Olá! Como está?" />
      )

      await waitFor(() => {
        expect(screen.getByText(/translating/i)).toBeInTheDocument()
      })

      await waitFor(() => {
        expect(screen.getByText('Hello! How are you?')).toBeInTheDocument()
      })
    })

    it('shows language indicators', async () => {
      renderWithLanguage(
        <MessageTranslator 
          originalMessage="Olá! Como está?"
          dialect="pt-PT"
          targetLanguage="en"
        />
      )

      await waitFor(() => {
        expect(screen.getByText(/🇵🇹.*→.*🇬🇧/)).toBeInTheDocument()
      })
    })

    it('displays confidence indicator', async () => {
      renderWithLanguage(
        <MessageTranslator originalMessage="Olá! Como está?" />
      )

      await waitFor(() => {
        expect(screen.getByText('95%')).toBeInTheDocument()
      })
    })
  })

  describe('Translation Process', () => {
    it('calls translation API with correct parameters', async () => {
      renderWithLanguage(
        <MessageTranslator 
          originalMessage="Bom dia!"
          sourceLanguage="pt"
          targetLanguage="en"
          dialect="pt-PT"
        />
      )

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: 'Bom dia!',
            source: 'pt',
            target: 'en',
            dialect: 'pt-PT',
            includeCulturalContext: true
          })
        })
      })
    })

    it('auto-detects source language when not specified', async () => {
      renderWithLanguage(
        <MessageTranslator 
          originalMessage="Hello world"
          sourceLanguage="auto"
        />
      )

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          '/api/translate',
          expect.objectContaining({
            body: JSON.stringify(
              expect.objectContaining({
                source: 'auto',
                text: 'Hello world'
              })
            )
          })
        )
      })
    })

    it('handles translation errors gracefully', async () => {
      ;(fetch as jest.Mock).mockRejectedValue(new Error('API Error'))

      renderWithLanguage(
        <MessageTranslator originalMessage="Test message" />
      )

      await waitFor(() => {
        expect(screen.getByText(/translation failed/i)).toBeInTheDocument()
      })
    })
  })

  describe('Content Toggle', () => {
    beforeEach(async () => {
      renderWithLanguage(
        <MessageTranslator originalMessage="Olá! Como está?" />
      )

      await waitFor(() => {
        expect(screen.getByText('Hello! How are you?')).toBeInTheDocument()
      })
    })

    it('toggles between original and translated text', async () => {
      const toggleButton = screen.getByText(/show original/i)

      await act(async () => {
        fireEvent.click(toggleButton)
      })

      expect(screen.getByText('Olá! Como está?')).toBeInTheDocument()
      expect(screen.getByText(/show translation/i)).toBeInTheDocument()
    })

    it('shows appropriate content based on toggle state', async () => {
      // Initially showing translation
      expect(screen.getByText('Hello! How are you?')).toBeInTheDocument()

      const toggleButton = screen.getByText(/show original/i)

      await act(async () => {
        fireEvent.click(toggleButton)
      })

      // Now showing original
      expect(screen.getByText('Olá! Como está?')).toBeInTheDocument()
    })
  })

  describe('Voice Playback', () => {
    beforeEach(async () => {
      renderWithLanguage(
        <MessageTranslator 
          originalMessage="Olá! Como está?"
          enableVoicePlayback={true}
        />
      )

      await waitFor(() => {
        expect(screen.getByText('Hello! How are you?')).toBeInTheDocument()
      })
    })

    it('provides voice playback controls', () => {
      const voiceButtons = screen.getAllByLabelText(/play/i)
      expect(voiceButtons).toHaveLength(2) // One for original, one for translation
    })

    it('plays original text in Portuguese', async () => {
      const toggleButton = screen.getByText(/show original/i)
      
      await act(async () => {
        fireEvent.click(toggleButton)
      })

      const playButton = screen.getByLabelText(/play original/i)
      
      await act(async () => {
        fireEvent.click(playButton)
      })

      expect(window.speechSynthesis.speak).toHaveBeenCalledWith(
        expect.objectContaining({
          text: 'Olá! Como está?',
          lang: 'pt-PT'
        })
      )
    })

    it('plays translated text in target language', async () => {
      const playButton = screen.getByLabelText(/play translated/i)
      
      await act(async () => {
        fireEvent.click(playButton)
      })

      expect(window.speechSynthesis.speak).toHaveBeenCalledWith(
        expect.objectContaining({
          text: 'Hello! How are you?',
          lang: 'en-US'
        })
      )
    })
  })

  describe('Copy Functionality', () => {
    beforeEach(async () => {
      renderWithLanguage(
        <MessageTranslator originalMessage="Olá! Como está?" />
      )

      await waitFor(() => {
        expect(screen.getByText('Hello! How are you?')).toBeInTheDocument()
      })
    })

    it('copies translation to clipboard', async () => {
      const copyButton = screen.getByLabelText(/copy translation/i)
      
      await act(async () => {
        fireEvent.click(copyButton)
      })

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Hello! How are you?')
    })

    it('copies original text to clipboard', async () => {
      // Switch to original view
      const toggleButton = screen.getByText(/show original/i)
      
      await act(async () => {
        fireEvent.click(toggleButton)
      })

      const copyButton = screen.getByLabelText(/copy original/i)
      
      await act(async () => {
        fireEvent.click(copyButton)
      })

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Olá! Como está?')
    })

    it('shows copy confirmation', async () => {
      const copyButton = screen.getByLabelText(/copy translation/i)
      
      await act(async () => {
        fireEvent.click(copyButton)
      })

      expect(screen.getByText(/copied/i)).toBeInTheDocument()
    })
  })

  describe('Cultural Context', () => {
    it('displays detected idioms', async () => {
      const idiomResponse = {
        ...mockTranslationResponse,
        cultural: {
          ...mockTranslationResponse.cultural,
          idioms: [{
            original: 'saudade',
            translation: 'deep longing',
            explanation: 'Traditional Portuguese expression'
          }]
        }
      }

      ;(fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(idiomResponse)
      })

      renderWithLanguage(
        <MessageTranslator 
          originalMessage="Tenho saudades de casa"
          showCulturalContext={true}
        />
      )

      await waitFor(() => {
        expect(screen.getByText(/portuguese idiom detected/i)).toBeInTheDocument()
        expect(screen.getByText('saudade')).toBeInTheDocument()
      })
    })

    it('shows cultural notes', async () => {
      const culturalResponse = {
        ...mockTranslationResponse,
        cultural: {
          ...mockTranslationResponse.cultural,
          markers: ['fado', 'azulejo']
        }
      }

      ;(fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(culturalResponse)
      })

      renderWithLanguage(
        <MessageTranslator 
          originalMessage="Gosto muito de fado e azulejos"
          showCulturalContext={true}
        />
      )

      await waitFor(() => {
        expect(screen.getByText(/cultural context/i)).toBeInTheDocument()
      })
    })

    it('displays formality indicators', async () => {
      const formalResponse = {
        ...mockTranslationResponse,
        cultural: {
          ...mockTranslationResponse.cultural,
          formality: 'formal'
        }
      }

      ;(fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(formalResponse)
      })

      renderWithLanguage(
        <MessageTranslator 
          originalMessage="Vossa Excelência está bem?"
          showCulturalContext={true}
        />
      )

      await waitFor(() => {
        expect(screen.getByText(/formal portuguese context/i)).toBeInTheDocument()
      })
    })
  })

  describe('Quality Indicators', () => {
    it('shows excellent quality indicator', async () => {
      renderWithLanguage(
        <MessageTranslator originalMessage="Olá! Como está?" />
      )

      await waitFor(() => {
        expect(screen.getByText('95%')).toBeInTheDocument()
        expect(screen.getByText('✅')).toBeInTheDocument()
      })
    })

    it('shows poor quality warning', async () => {
      const poorQualityResponse = {
        ...mockTranslationResponse,
        confidence: 0.5
      }

      ;(fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(poorQualityResponse)
      })

      renderWithLanguage(
        <MessageTranslator originalMessage="Complex Portuguese text" />
      )

      await waitFor(() => {
        expect(screen.getByText('50%')).toBeInTheDocument()
      })
    })
  })

  describe('Alternative Translations', () => {
    it('displays alternative translations when available', async () => {
      renderWithLanguage(
        <MessageTranslator originalMessage="Olá! Como está?" />
      )

      await waitFor(() => {
        expect(screen.getByText(/alternative translations/i)).toBeInTheDocument()
        expect(screen.getByText('Hi! How are you?')).toBeInTheDocument()
        expect(screen.getByText('Hello! How are you doing?')).toBeInTheDocument()
      })
    })

    it('limits number of alternatives shown', async () => {
      const manyAlternatives = {
        ...mockTranslationResponse,
        alternatives: [
          'Alternative 1',
          'Alternative 2', 
          'Alternative 3',
          'Alternative 4',
          'Alternative 5'
        ]
      }

      ;(fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(manyAlternatives)
      })

      renderWithLanguage(
        <MessageTranslator originalMessage="Test message" />
      )

      await waitFor(() => {
        const alternatives = screen.getAllByText(/Alternative \d/)
        expect(alternatives).toHaveLength(3) // Should limit to 3
      })
    })
  })

  describe('Portuguese Dialects', () => {
    it('handles Portugal Portuguese dialect', async () => {
      renderWithLanguage(
        <MessageTranslator 
          originalMessage="Que fixe!"
          dialect="pt-PT"
        />
      )

      await waitFor(() => {
        expect(screen.getByText('🇵🇹')).toBeInTheDocument()
      })
    })

    it('handles Brazilian Portuguese dialect', async () => {
      renderWithLanguage(
        <MessageTranslator 
          originalMessage="Que legal!"
          dialect="pt-BR"
        />
      )

      await waitFor(() => {
        expect(screen.getByText('🇧🇷')).toBeInTheDocument()
      })
    })

    it('handles Cape Verdean dialect', async () => {
      renderWithLanguage(
        <MessageTranslator 
          originalMessage="Modi ku bu stá?"
          dialect="pt-CV"
        />
      )

      await waitFor(() => {
        expect(screen.getByText('🇨🇻')).toBeInTheDocument()
      })
    })
  })

  describe('Translation Callbacks', () => {
    it('calls onTranslationComplete when translation finishes', async () => {
      const mockOnComplete = jest.fn()

      renderWithLanguage(
        <MessageTranslator 
          originalMessage="Olá! Como está?"
          onTranslationComplete={mockOnComplete}
        />
      )

      await waitFor(() => {
        expect(mockOnComplete).toHaveBeenCalledWith(
          expect.objectContaining({
            originalText: 'Olá! Como está?',
            translatedText: 'Hello! How are you?',
            confidence: 0.95
          })
        )
      })
    })
  })

  describe('Accessibility', () => {
    it('provides proper ARIA labels for buttons', async () => {
      renderWithLanguage(
        <MessageTranslator 
          originalMessage="Olá! Como está?"
          enableVoicePlayback={true}
        />
      )

      await waitFor(() => {
        const copyButton = screen.getByLabelText(/copy translation/i)
        const playButton = screen.getByLabelText(/play translated/i)
        
        expect(copyButton).toBeInTheDocument()
        expect(playButton).toBeInTheDocument()
      })
    })

    it('supports keyboard navigation', async () => {
      renderWithLanguage(
        <MessageTranslator originalMessage="Olá! Como está?" />
      )

      await waitFor(() => {
        const toggleButton = screen.getByText(/show original/i)
        
        await act(async () => {
          toggleButton.focus()
          fireEvent.keyDown(toggleButton, { key: 'Enter' })
        })

        expect(screen.getByText('Olá! Como está?')).toBeInTheDocument()
      })
    })
  })
})

// Configuration and utility function tests
describe('Translation Configuration', () => {
  describe('Portuguese Dialects', () => {
    it('provides complete dialect information', () => {
      expect(PORTUGUESE_DIALECTS['pt-PT']).toEqual({
        name: { en: 'European Portuguese', pt: 'Português Europeu' },
        country: 'Portugal',
        flag: '🇵🇹',
        culturalContext: 'formal',
        commonPhrases: {
          'you': 'tu/você',
          'bathroom': 'casa de banho',
          'mobile': 'telemóvel',
          'cool': 'fixe',
          'okay': 'está bem'
        }
      })
    })

    it('supports all major lusophone countries', () => {
      const expectedDialects = ['pt-PT', 'pt-BR', 'pt-CV', 'pt-AO', 'pt-MZ']
      
      expectedDialects.forEach(dialect => {
        expect(PORTUGUESE_DIALECTS[dialect]).toBeDefined()
        expect(PORTUGUESE_DIALECTS[dialect].name).toBeDefined()
        expect(PORTUGUESE_DIALECTS[dialect].flag).toBeDefined()
      })
    })
  })

  describe('Translation Quality', () => {
    it('provides quality thresholds', () => {
      expect(TRANSLATION_QUALITY.excellent.threshold).toBe(0.95)
      expect(TRANSLATION_QUALITY.good.threshold).toBe(0.85)
      expect(TRANSLATION_QUALITY.fair.threshold).toBe(0.75)
      expect(TRANSLATION_QUALITY.poor.threshold).toBe(0.6)
    })

    it('includes visual indicators', () => {
      Object.values(TRANSLATION_QUALITY).forEach(quality => {
        expect(quality.color).toMatch(/^#[0-9a-f]{6}$/i)
        expect(quality.icon).toBeDefined()
        expect(quality.label).toEqual({
          en: expect.any(String),
          pt: expect.any(String)
        })
      })
    })
  })

  describe('Portuguese Idioms', () => {
    it('detects Portuguese idioms correctly', () => {
      expect(isPortugueseIdiom('Tenho saudades de casa', 'pt-PT')).toBe(true)
      expect(isPortugueseIdiom('Hello world', 'pt-PT')).toBe(false)
    })

    it('translates common idioms', () => {
      const translation = translateIdiom('Está tudo bem', 'pt-PT')
      expect(translation).toBe('Everything is fine')
    })

    it('returns null for unknown idioms', () => {
      const translation = translateIdiom('Unknown phrase', 'pt-PT')
      expect(translation).toBeNull()
    })
  })
})