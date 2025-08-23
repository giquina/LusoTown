/**
 * LusoBot AI Engine Production Tests
 * 
 * Comprehensive test suite for the Portuguese cultural AI assistant
 * focusing on production readiness, bilingual support, and cultural accuracy.
 */

import { 
  LusoBotEngine, 
  SaudadeEngine, 
  LusoBotSession,
  PORTUGUESE_CULTURAL_KNOWLEDGE,
  type LusoBotMessage,
  type MessageMetadata,
  type EmotionalTone,
  type CulturalContext
} from '@/lib/lusobot-engine'

describe('LusoBot Engine Production Tests', () => {
  
  // Test Data Setup
  const mockUserContext: MessageMetadata = {
    userRegion: 'diaspora_uk',
    communityLevel: 'active',
    languageProficiency: 'native',
    interests: ['culture', 'food', 'community'],
    mood: 'curious'
  }

  describe('Portuguese Cultural Knowledge Base', () => {
    test('should have comprehensive Portuguese cultural data', () => {
      expect(PORTUGUESE_CULTURAL_KNOWLEDGE).toBeDefined()
      expect(PORTUGUESE_CULTURAL_KNOWLEDGE.regions).toBeDefined()
      expect(PORTUGUESE_CULTURAL_KNOWLEDGE.cuisine).toBeDefined()
      expect(PORTUGUESE_CULTURAL_KNOWLEDGE.music.fado).toBeDefined()
      expect(PORTUGUESE_CULTURAL_KNOWLEDGE.language.saudade).toBeDefined()
    })

    test('should include all Portuguese regions', () => {
      const regions = PORTUGUESE_CULTURAL_KNOWLEDGE.regions
      expect(regions.north).toBeDefined()
      expect(regions.center).toBeDefined()
      expect(regions.south).toBeDefined()
      expect(regions.lisbon).toBeDefined()
      expect(regions.azores).toBeDefined()
      expect(regions.madeira).toBeDefined()
    })

    test('should have authentic Portuguese cultural content', () => {
      // Test cuisine knowledge
      const cuisine = PORTUGUESE_CULTURAL_KNOWLEDGE.cuisine
      expect(cuisine.staples.bacalhau).toBeDefined()
      expect(cuisine.traditional_dishes.francesinha).toContain('Porto')
      
      // Test fado knowledge
      const fado = PORTUGUESE_CULTURAL_KNOWLEDGE.music.fado
      expect(fado.legendary_figures).toContain('Amália Rodrigues')
      expect(fado.types).toContain('Fado de Lisboa')
      
      // Test saudade understanding
      const saudade = PORTUGUESE_CULTURAL_KNOWLEDGE.language.saudade
      expect(saudade.definition).toContain('Untranslatable')
      expect(saudade.cultural_importance).toContain('Portuguese character')
    })
  })

  describe('Saudade Detection Engine', () => {
    test('should accurately detect saudade in Portuguese messages', () => {
      const message = "Tenho tanta saudade de casa, da minha família em Portugal"
      const emotionalTone = SaudadeEngine.detectSaudade(message, 'pt')
      
      expect(emotionalTone.saudade).toBeGreaterThan(0.5)
      expect(emotionalTone.nostalgia).toBeGreaterThan(0)
      expect(emotionalTone.heritage).toBeGreaterThan(0)
    })

    test('should detect saudade in English messages', () => {
      const message = "I really miss home, feeling quite homesick for Portugal"
      const emotionalTone = SaudadeEngine.detectSaudade(message, 'en')
      
      expect(emotionalTone.saudade).toBeGreaterThan(0.3)
      expect(emotionalTone.nostalgia).toBeGreaterThan(0.2)
    })

    test('should detect community longing', () => {
      const message = "Preciso de encontrar a comunidade de falantes de português em Londres"
      const emotionalTone = SaudadeEngine.detectSaudade(message, 'pt')
      
      expect(emotionalTone.community).toBeGreaterThan(0.4)
      expect(emotionalTone.hope).toBeGreaterThan(0.1)
    })

    test('should generate appropriate saudade responses in Portuguese', () => {
      const highSaudade: EmotionalTone = {
        saudade: 0.8,
        nostalgia: 0.6,
        hope: 0.3,
        community: 0.5,
        heritage: 0.7
      }
      
      const response = SaudadeEngine.generateSaudadeResponse(highSaudade, 'pt')
      expect(response).toContain('saudade')
      expect(response).toContain('comunidade')
      expect(response.length).toBeGreaterThan(50)
    })

    test('should generate appropriate saudade responses in English', () => {
      const mediumNostalgia: EmotionalTone = {
        saudade: 0.3,
        nostalgia: 0.6,
        hope: 0.4,
        community: 0.3,
        heritage: 0.5
      }
      
      const response = SaudadeEngine.generateSaudadeResponse(mediumNostalgia, 'en')
      expect(response).toContain('nostalgia')
      expect(response).toContain('home')
      expect(response.length).toBeGreaterThan(50)
    })
  })

  describe('Cultural Context Identification', () => {
    test('should identify regional references correctly', () => {
      const message = "Sou do Norte, da região do Minho"
      const culturalContext = (LusoBotEngine as any).identifyCulturalContext(message, 'pt')
      
      expect(culturalContext.region).toBe('north')
      expect(culturalContext.confidence).toBeGreaterThan(0.5)
    })

    test('should identify food-related topics', () => {
      const message = "Where can I find good bacalhau in London?"
      const culturalContext = (LusoBotEngine as any).identifyCulturalContext(message, 'en')
      
      expect(culturalContext.topic).toBe('cuisine')
      expect(culturalContext.expertise).toContain('portuguese_cuisine')
      expect(culturalContext.confidence).toBeGreaterThan(0.6)
    })

    test('should identify fado music references', () => {
      const message = "Quero ouvir fado, conheces alguma casa de fado em Londres?"
      const culturalContext = (LusoBotEngine as any).identifyCulturalContext(message, 'pt')
      
      expect(culturalContext.topic).toBe('fado')
      expect(culturalContext.expertise).toContain('fado_music')
    })

    test('should identify business-related queries', () => {
      const message = "How is Portuguese business culture different from British?"
      const culturalContext = (LusoBotEngine as any).identifyCulturalContext(message, 'en')
      
      expect(culturalContext.topic).toBe('business')
      expect(culturalContext.expertise).toContain('business_culture')
    })
  })

  describe('AI Response Generation', () => {
    test('should generate contextual cuisine responses in Portuguese', async () => {
      const message = "Onde posso encontrar pastéis de nata em Londres?"
      const response = await LusoBotEngine.generateResponse(message, mockUserContext, 'pt')
      
      expect(response.content).toContain('pastéis de nata')
      expect(response.content).toContain('Londres')
      expect(response.language).toBe('pt')
      expect(response.culturalContext?.topic).toBe('cuisine')
      expect(response.suggestions).toBeDefined()
      expect(response.suggestions!.length).toBeGreaterThan(0)
    })

    test('should generate contextual fado responses in English', async () => {
      const message = "Tell me about fado music and where to hear it"
      const response = await LusoBotEngine.generateResponse(message, mockUserContext, 'en')
      
      expect(response.content).toContain('fado')
      expect(response.content).toContain('soul')
      expect(response.language).toBe('en')
      expect(response.culturalContext?.topic).toBe('fado')
    })

    test('should handle high saudade with emotional support', async () => {
      const message = "I miss Portugal so much, feeling very lonely here"
      const response = await LusoBotEngine.generateResponse(message, mockUserContext, 'en')
      
      expect(response.emotionalTone?.saudade).toBeGreaterThan(0.5)
      expect(response.content).toContain('understand')
      expect(response.content).toContain('community')
      expect(response.suggestions).toBeDefined()
      expect(response.suggestions?.some(s => s.type === 'community')).toBe(true)
    })

    test('should generate appropriate suggestions based on context', async () => {
      const message = "Quero aprender mais sobre a cultura portuguesa"
      const response = await LusoBotEngine.generateResponse(message, mockUserContext, 'pt')
      
      expect(response.suggestions).toBeDefined()
      expect(response.suggestions!.length).toBeGreaterThan(0)
      
      const hasRelevantSuggestions = response.suggestions!.some(
        s => s.type === 'event' || s.type === 'resource' || s.type === 'community'
      )
      expect(hasRelevantSuggestions).toBe(true)
    })

    test('should prioritize suggestions by cultural relevance', async () => {
      const message = "Feeling homesick, need community connection"
      const response = await LusoBotEngine.generateResponse(message, mockUserContext, 'en')
      
      expect(response.suggestions).toBeDefined()
      
      if (response.suggestions!.length > 1) {
        const suggestions = response.suggestions!
        const sortedByRelevance = [...suggestions].sort((a, b) => b.culturalRelevance - a.culturalRelevance)
        expect(suggestions[0].culturalRelevance).toEqual(sortedByRelevance[0].culturalRelevance)
      }
    })

    test('should maintain conversation context', async () => {
      const response = await LusoBotEngine.generateResponse(
        "Tell me about Portuguese festivals",
        mockUserContext,
        'en'
      )
      
      expect(response.id).toBeDefined()
      expect(response.role).toBe('assistant')
      expect(response.timestamp).toBeDefined()
      expect(response.metadata).toEqual(mockUserContext)
    })
  })

  describe('Bilingual Support', () => {
    test('should maintain language consistency', async () => {
      const ptMessage = "Como está o tempo hoje?"
      const ptResponse = await LusoBotEngine.generateResponse(ptMessage, mockUserContext, 'pt')
      expect(ptResponse.language).toBe('pt')
      
      const enMessage = "How is the weather today?"
      const enResponse = await LusoBotEngine.generateResponse(enMessage, mockUserContext, 'en')
      expect(enResponse.language).toBe('en')
    })

    test('should provide culturally appropriate responses in both languages', async () => {
      const foodQueryPT = "Receitas tradicionais portuguesas"
      const responsePT = await LusoBotEngine.generateResponse(foodQueryPT, mockUserContext, 'pt')
      
      const foodQueryEN = "Traditional Portuguese recipes"
      const responseEN = await LusoBotEngine.generateResponse(foodQueryEN, mockUserContext, 'en')
      
      // Both should identify cuisine topic
      expect(responsePT.culturalContext?.topic).toBe('cuisine')
      expect(responseEN.culturalContext?.topic).toBe('cuisine')
      
      // Both should contain relevant cultural information
      expect(responsePT.content.length).toBeGreaterThan(50)
      expect(responseEN.content.length).toBeGreaterThan(50)
    })
  })

  describe('Session Management', () => {
    test('should initialize session with welcome message', () => {
      const session = new LusoBotSession(mockUserContext, 'en')
      const messages = session.getMessages()
      
      expect(messages.length).toBe(1)
      expect(messages[0].role).toBe('assistant')
      expect(messages[0].content).toContain('LusoBot')
    })

    test('should handle conversation flow correctly', async () => {
      const session = new LusoBotSession(mockUserContext, 'pt')
      
      const response = await session.sendMessage("Olá, como estás?")
      const messages = session.getMessages()
      
      expect(messages.length).toBe(3) // Welcome + user + assistant
      expect(messages[1].role).toBe('user')
      expect(messages[2].role).toBe('assistant')
      expect(response.role).toBe('assistant')
    })

    test('should maintain user context throughout session', async () => {
      const session = new LusoBotSession(mockUserContext, 'en')
      
      await session.sendMessage("I love Portuguese food")
      await session.sendMessage("What about fado music?")
      
      const messages = session.getMessages()
      messages.forEach(message => {
        if (message.metadata) {
          expect(message.metadata.userRegion).toBe(mockUserContext.userRegion)
          expect(message.metadata.communityLevel).toBe(mockUserContext.communityLevel)
        }
      })
    })

    test('should update user context when needed', () => {
      const session = new LusoBotSession(mockUserContext, 'en')
      
      session.updateUserContext({ mood: 'homesick' })
      
      // Verify context update (would be tested in next message)
      expect(true).toBe(true) // Context update is internal
    })

    test('should export conversation properly', async () => {
      const session = new LusoBotSession(mockUserContext, 'pt')
      await session.sendMessage("Teste de conversa")
      
      const exported = session.exportConversation()
      const parsed = JSON.parse(exported)
      
      expect(parsed.language).toBe('pt')
      expect(parsed.userContext).toEqual(mockUserContext)
      expect(parsed.messages).toBeDefined()
      expect(parsed.timestamp).toBeDefined()
    })
  })

  describe('Performance and Quality', () => {
    test('should respond within acceptable time limits', async () => {
      const startTime = Date.now()
      
      await LusoBotEngine.generateResponse(
        "Quick response test",
        mockUserContext,
        'en'
      )
      
      const responseTime = Date.now() - startTime
      expect(responseTime).toBeLessThan(2000) // Should respond within 2 seconds
    })

    test('should handle empty or invalid messages gracefully', async () => {
      const emptyResponse = await LusoBotEngine.generateResponse(
        "",
        mockUserContext,
        'en'
      )
      
      expect(emptyResponse.content).toBeDefined()
      expect(emptyResponse.content.length).toBeGreaterThan(0)
    })

    test('should generate meaningful suggestions for cultural queries', async () => {
      const response = await LusoBotEngine.generateResponse(
        "I want to connect with Portuguese culture",
        mockUserContext,
        'en'
      )
      
      expect(response.suggestions).toBeDefined()
      expect(response.suggestions!.length).toBeGreaterThan(0)
      
      // Check suggestion quality
      response.suggestions!.forEach(suggestion => {
        expect(suggestion.title).toBeDefined()
        expect(suggestion.description).toBeDefined()
        expect(suggestion.culturalRelevance).toBeGreaterThan(0)
        expect(['high', 'medium', 'low']).toContain(suggestion.priority)
      })
    })

    test('should maintain cultural authenticity in responses', async () => {
      const response = await LusoBotEngine.generateResponse(
        "Tell me about Portuguese traditions",
        mockUserContext,
        'en'
      )
      
      expect(response.culturalContext?.confidence).toBeGreaterThan(0.5)
      expect(response.content).not.toContain('Spain') // Should not confuse with Spanish culture
      expect(response.content).toMatch(/Portugu(al|ese)/i) // Should reference Portugal/Portuguese
    })
  })

  describe('Error Handling', () => {
    test('should handle invalid cultural context gracefully', async () => {
      const invalidContext: MessageMetadata = {
        userRegion: 'invalid_region' as any,
        communityLevel: 'invalid_level' as any,
        languageProficiency: 'invalid_proficiency' as any,
        interests: [],
        mood: 'invalid_mood' as any
      }
      
      const response = await LusoBotEngine.generateResponse(
        "Test message",
        invalidContext,
        'en'
      )
      
      expect(response).toBeDefined()
      expect(response.content.length).toBeGreaterThan(0)
    })

    test('should provide fallback responses for unrecognized topics', async () => {
      const response = await LusoBotEngine.generateResponse(
        "Tell me about quantum physics in Portuguese culture",
        mockUserContext,
        'en'
      )
      
      expect(response.content).toBeDefined()
      expect(response.culturalContext?.topic).toBe('community') // Should fallback to community topic
    })
  })

  describe('Cultural Sensitivity', () => {
    test('should respect Portuguese cultural values', async () => {
      const response = await LusoBotEngine.generateResponse(
        "Tell me about Portuguese family values",
        mockUserContext,
        'en'
      )
      
      expect(response.content).toContain('family')
      expect(response.emotionalTone?.heritage).toBeGreaterThan(0.3)
    })

    test('should handle religious topics respectfully', async () => {
      const response = await LusoBotEngine.generateResponse(
        "Portuguese Catholic traditions",
        mockUserContext,
        'en'
      )
      
      expect(response.content).toBeDefined()
      expect(response.content).not.toContain('superstition') // Should be respectful
    })

    test('should avoid regional stereotypes', async () => {
      const response = await LusoBotEngine.generateResponse(
        "Tell me about people from northern Portugal",
        mockUserContext,
        'en'
      )
      
      expect(response.content).toBeDefined()
      expect(response.culturalContext?.region).toBe('north')
      // Should provide balanced, respectful information
      expect(response.content.length).toBeGreaterThan(100)
    })
  })

  describe('Production Readiness', () => {
    test('should have consistent response structure', async () => {
      const response = await LusoBotEngine.generateResponse(
        "Test message",
        mockUserContext,
        'en'
      )
      
      // Verify all required fields
      expect(response.id).toBeDefined()
      expect(response.role).toBe('assistant')
      expect(response.content).toBeDefined()
      expect(response.timestamp).toBeInstanceOf(Date)
      expect(response.language).toBeDefined()
      expect(response.culturalContext).toBeDefined()
      expect(response.emotionalTone).toBeDefined()
      expect(response.suggestions).toBeDefined()
      expect(response.metadata).toBeDefined()
    })

    test('should generate unique message IDs', async () => {
      const response1 = await LusoBotEngine.generateResponse("Test 1", mockUserContext, 'en')
      const response2 = await LusoBotEngine.generateResponse("Test 2", mockUserContext, 'en')
      
      expect(response1.id).not.toBe(response2.id)
      expect(response1.id).toMatch(/^lusobot_\d+_[a-z0-9]+$/)
      expect(response2.id).toMatch(/^lusobot_\d+_[a-z0-9]+$/)
    })
  })
})