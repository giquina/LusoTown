import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import {
  SPEECH_TO_TEXT_CONFIG,
  VOICE_API_CONFIG,
  getSpeechToTextForDialect
} from '@/config/voice-messaging'

// Helper function to validate audio for transcription
function validateAudioForTranscription(file: File): { isValid: boolean; error?: string } {
  const allowedTypes = ['audio/webm', 'audio/wav', 'audio/mp3', 'audio/m4a', 'audio/ogg']
  
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `Invalid audio format. Supported formats: ${allowedTypes.join(', ')}`
    }
  }

  // Check file size (max 25MB for transcription)
  const maxSize = 25 * 1024 * 1024
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'Audio file too large for transcription. Maximum size: 25MB'
    }
  }

  return { isValid: true }
}

// Mock transcription function (replace with actual speech-to-text API)
async function transcribeAudio(
  audioBuffer: ArrayBuffer,
  dialect: string,
  options: any
): Promise<{
  transcription: string;
  confidence: number;
  detectedLanguage: string;
  words?: Array<{
    word: string;
    confidence: number;
    startTime: number;
    endTime: number;
  }>;
  alternatives?: string[];
}> {
  try {
    // This is a mock implementation
    // In production, you would integrate with:
    // - Google Speech-to-Text API
    // - Azure Speech Services
    // - AWS Transcribe
    // - AssemblyAI
    // - OpenAI Whisper API

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock transcription results based on common Portuguese phrases
    const mockTranscriptions = [
      {
        text: "Olá! Como está? Espero que esteja tudo bem.",
        confidence: 0.95,
        language: 'pt-PT'
      },
      {
        text: "Bom dia! Gostaria de saber se podemos marcar um encontro.",
        confidence: 0.88,
        language: 'pt-PT'
      },
      {
        text: "Que saudades! Quando é que nos vamos ver novamente?",
        confidence: 0.92,
        language: 'pt-PT'
      },
      {
        text: "Oi pessoal! Tudo bom? Vamos nos encontrar hoje?",
        confidence: 0.89,
        language: 'pt-BR'
      },
      {
        text: "Hello! How are you doing today?",
        confidence: 0.94,
        language: 'en-US'
      }
    ]

    // Select a random mock transcription
    const mockResult = mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)]

    // Generate word-level confidence (mock)
    const words = mockResult.text.split(' ').map((word, index) => ({
      word: word.replace(/[^\w]/g, ''),
      confidence: Math.random() * 0.3 + 0.7, // 0.7 to 1.0
      startTime: index * 0.5,
      endTime: (index + 1) * 0.5
    }))

    // Generate alternatives
    const alternatives = [
      mockResult.text.toLowerCase(),
      mockResult.text.toUpperCase(),
      mockResult.text.replace(/[.!?]/g, '')
    ].filter(alt => alt !== mockResult.text).slice(0, 2)

    return {
      transcription: mockResult.text,
      confidence: mockResult.confidence,
      detectedLanguage: mockResult.language,
      words,
      alternatives: alternatives.length > 0 ? alternatives : undefined
    }

  } catch (error) {
    console.error('Transcription error:', error)
    throw new Error('Speech-to-text service failed')
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse form data
    const formData = await request.formData()
    const audioFile = formData.get('audio') as File
    const dialect = formData.get('dialect') as string || 'pt-PT'
    const enableWordTimestamps = formData.get('enableWordTimestamps') === 'true'
    const maxAlternatives = parseInt(formData.get('maxAlternatives') as string || '3')

    if (!audioFile) {
      return NextResponse.json({ error: 'Audio file is required' }, { status: 400 })
    }

    // Validate audio file
    const validation = validateAudioForTranscription(audioFile)
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    // Get speech-to-text configuration for dialect
    const speechConfig = getSpeechToTextForDialect(dialect)

    // Convert audio to buffer
    const audioBuffer = await audioFile.arrayBuffer()

    // Transcribe audio
    const transcriptionResult = await transcribeAudio(audioBuffer, dialect, {
      language: speechConfig.language,
      continuous: speechConfig.continuous,
      interimResults: speechConfig.interimResults,
      maxAlternatives: Math.min(maxAlternatives, speechConfig.maxAlternatives),
      enableWordTimestamps
    })

    // Check confidence threshold
    const meetsMindConfidence = transcriptionResult.confidence >= speechConfig.confidenceThreshold

    // Save transcription record
    const { data: transcriptionRecord, error: saveError } = await supabase
      .from('voice_transcriptions')
      .insert({
        user_id: user.id,
        original_filename: audioFile.name,
        file_size: audioFile.size,
        dialect: dialect,
        transcription_text: transcriptionResult.transcription,
        confidence_score: transcriptionResult.confidence,
        detected_language: transcriptionResult.detectedLanguage,
        word_timestamps: enableWordTimestamps ? transcriptionResult.words : null,
        alternatives: transcriptionResult.alternatives,
        meets_confidence_threshold: meetsMindConfidence,
        processing_duration: 2.0 // Mock processing time
      })
      .select()
      .single()

    if (saveError) {
      console.error('Failed to save transcription:', saveError)
      // Don't fail the request, just log the error
    }

    // Prepare response
    const response = {
      id: transcriptionRecord?.id,
      transcription: transcriptionResult.transcription,
      confidence: transcriptionResult.confidence,
      detectedLanguage: transcriptionResult.detectedLanguage,
      dialect: dialect,
      meetsConfidenceThreshold: meetsMindConfidence,
      confidenceThreshold: speechConfig.confidenceThreshold,
      words: enableWordTimestamps ? transcriptionResult.words : undefined,
      alternatives: transcriptionResult.alternatives,
      processingInfo: {
        provider: VOICE_API_CONFIG.speechToText.provider,
        processingTime: 2.0,
        audioFormat: audioFile.type,
        audioSize: audioFile.size,
        audioDuration: transcriptionResult.words ? 
          Math.max(...transcriptionResult.words.map(w => w.endTime)) : null
      },
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Transcription API error:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Transcription failed',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { searchParams } = new URL(request.url)
    const transcriptionId = searchParams.get('id')
    const userId = searchParams.get('userId')
    const dialect = searchParams.get('dialect')
    const limit = parseInt(searchParams.get('limit') || '20')
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let query = supabase
      .from('voice_transcriptions')
      .select('*')
      .eq('user_id', user.id)

    if (transcriptionId) {
      query = query.eq('id', transcriptionId)
    }

    if (userId) {
      query = query.eq('user_id', userId)
    }

    if (dialect) {
      query = query.eq('dialect', dialect)
    }

    const { data: transcriptions, error } = await query
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Failed to fetch transcriptions:', error)
      return NextResponse.json(
        { error: 'Failed to fetch transcriptions' },
        { status: 500 }
      )
    }

    // Calculate statistics
    const stats = {
      total: transcriptions?.length || 0,
      averageConfidence: transcriptions?.length ? 
        transcriptions.reduce((sum, t) => sum + t.confidence_score, 0) / transcriptions.length : 0,
      dialectDistribution: transcriptions?.reduce((acc, t) => {
        acc[t.dialect] = (acc[t.dialect] || 0) + 1
        return acc
      }, {} as Record<string, number>) || {},
      highConfidenceCount: transcriptions?.filter(t => t.meets_confidence_threshold).length || 0
    }

    return NextResponse.json({
      transcriptions: transcriptions || [],
      statistics: stats
    })

  } catch (error) {
    console.error('Transcription GET API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}