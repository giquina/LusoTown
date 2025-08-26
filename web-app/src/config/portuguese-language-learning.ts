/**
 * Advanced Portuguese Language Learning System
 * Comprehensive language assistance with cultural context
 * Supports all Portuguese variants and cultural nuances
      {
        feature: "Closed 'e' and 'o'",
        description: {
          pt: "Sons de 'e' e 'o' mais fechados que no Brasil",
          en: "Sounds of 'e' and 'o' more closed than in Brazil"
        },
        examples: ['sede [\u02c8sed\u0268]', 'novo [\u02c8novu]']
      }
    en: string
  }
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  category: 'grammar' | 'vocabulary' | 'pronunciation' | 'culture' | 'conversation' | 'business'
  duration: number // minutes
  exercises: LanguageExercise[]
  culturalNotes: CulturalNote[]
  assessmentCriteria: AssessmentCriteria[]
}

export interface LanguageExercise {
  id: string
  type: 'pronunciation' | 'translation' | 'conversation' | 'listening' | 'cultural_context'
  prompt: {
    pt: string
    en: string
  }
  content: any
  difficulty: number // 0-1
  culturalRelevance: number // 0-1
  feedback: {
    correct: { pt: string; en: string }
    incorrect: { pt: string; en: string }
    cultural: { pt: string; en: string }
  }
}

export interface CulturalNote {
  id: string
  topic: string
  explanation: {
    pt: string
    en: string
  }
  examples: string[]
  regions: string[]
  significance: string
}

export interface AssessmentCriteria {
  skill: 'pronunciation' | 'grammar' | 'vocabulary' | 'cultural_understanding' | 'fluency'
  weight: number
  description: {
    pt: string
    en: string
  }
}

export interface PronunciationGuide {
  phoneme: string
  ipa: string
  description: {
    pt: string
    en: string
  }
  examples: {
    word: string
    ipa: string
    meaning: {
      pt: string
      en: string
    }
    audioHint: string
  }[]
  commonMistakes: {
    mistake: string
    correction: string
    explanation: {
      pt: string
      en: string
    }
  }[]
  regions: string[]
}

export interface PortugueseDialect {
  id: string
  name: {
    pt: string
    en: string
  }
  region: string
  country: string
  characteristics: {
    pt: string
    en: string
  }
  pronunciation: {
    feature: string
    description: {
      pt: string
      en: string
    }
    examples: string[]
  }[]
  vocabulary: {
    standard: string
    regional: string
    meaning: {
      pt: string
      en: string
    }
  }[]
  culturalContext: {
    pt: string
    en: string
  }
}

/**
 * Comprehensive Language Learning Modules
 */
export const LANGUAGE_LEARNING_MODULES: LanguageLessonModule[] = [
  {
    id: "saudade-emotions",
    title: {
      pt: "Saudade e Expressões Emocionais",
      en: "Saudade and Emotional Expressions",
    },
    level: "B1",
    category: "culture",
    duration: 30,
    exercises: [
      {
        id: "saudade-meaning",
        type: "cultural_context",
        prompt: {
          pt: "Como explicarias saudade a alguém que nunca ouviu esta palavra?",
          en: "How would you explain saudade to someone who has never heard this word?",
        },
        content: {
          scenarios: [
            "Missing family while living abroad",
            "Remembering childhood memories",
            "Longing for a homeland you may never see again",
            "Love for someone who is no longer present",
          ],
        },
        difficulty: 0.7,
        culturalRelevance: 1.0,
        feedback: {
          correct: {
            pt: "Excelente! Captaste a essência complexa da saudade.",
            en: "Excellent! You captured the complex essence of saudade.",
          },
          incorrect: {
            pt: 'A saudade é mais complexa que apenas "miss". Inclui beleza na melancolia.',
            en: 'Saudade is more complex than just "miss". It includes beauty in melancholy.',
          },
          cultural: {
            pt: "A saudade define a alma portuguesa - é dor e beleza simultaneamente.",
            en: "Saudade defines the Portuguese soul - it is pain and beauty simultaneously.",
          },
        },
      },
      {
        id: "saudade-expressions",
        type: "conversation",
        prompt: {
          pt: "Pratica expressões com saudade em contexto natural",
          en: "Practice saudade expressions in natural context",
        },
        content: {
          dialogues: [
            {
              context: "Talking to family back home",
              portuguese:
                "Tenho tantas saudades vossas! Quando é que nos vemos?",
              english: "I miss you all so much! When will we see each other?",
              response_options: [
                "Também temos saudades tuas, filho.",
                "Vem cá nas férias para matar saudades.",
                "As saudades são mútuas!",
              ],
            },
          ],
        },
        difficulty: 0.6,
        culturalRelevance: 0.9,
        feedback: {
          correct: {
            pt: "Perfeito! Usaste saudade com naturalidade.",
            en: "Perfect! You used saudade naturally.",
          },
          incorrect: {
            pt: 'Experimenta: "Tenho saudades" é mais natural que "sinto saudade".',
            en: 'Try: "Tenho saudades" is more natural than "sinto saudade".',
          },
          cultural: {
            pt: "Os portugueses usam saudade constantemente nas conversas familiares.",
            en: "Portuguese people use saudade constantly in family conversations.",
          },
        },
      },
    ],
    culturalNotes: [
      {
        id: "saudade-philosophy",
        topic: "Saudade as Portuguese Philosophy",
        explanation: {
          pt: "Saudade é mais que uma emoção - é uma forma de estar no mundo. Representa a capacidade portuguesa de encontrar beleza na ausência.",
          en: "Saudade is more than an emotion - it's a way of being in the world. It represents the Portuguese ability to find beauty in absence.",
        },
        examples: [
          "Fado music expressing saudade through song",
          "Literature exploring themes of longing and memory",
          "Diaspora communities maintaining cultural identity through saudade",
        ],
        regions: ["Portugal", "Brazil", "All Lusophone Nations"],
        significance: "Central to Portuguese cultural identity and expression",
      },
    ],
    assessmentCriteria: [
      {
        skill: "cultural_understanding",
        weight: 0.4,
        description: {
          pt: "Compreende a profundidade cultural da saudade",
          en: "Understands the cultural depth of saudade",
        },
      },
      {
        skill: "vocabulary",
        weight: 0.3,
        description: {
          pt: "Usa expressões com saudade corretamente",
          en: "Uses saudade expressions correctly",
        },
      },
      {
        skill: "pronunciation",
        weight: 0.3,
        description: {
          pt: "Pronuncia saudade com naturalidade",
          en: "Pronounces saudade naturally",
        },
      },
    ],
  },
  {
    id: "business-portuguese",
    title: {
      pt: "Português para Negócios",
      en: "Business Portuguese",
    },
    level: "B2",
    category: "business",
    duration: 45,
    exercises: [
      {
        id: "networking-phrases",
        type: "conversation",
        prompt: {
          pt: "Pratica conversas de networking em ambiente empresarial",
          en: "Practice networking conversations in business environment",
        },
        content: {
          scenarios: [
            {
              situation: "Meeting a potential business partner",
              formal: {
                pt: "É um prazer conhecê-lo. Posso apresentar-me? Sou...",
                en: "It's a pleasure to meet you. May I introduce myself? I'm...",
              },
              cultural_tip: {
                pt: "Em Portugal, cumprimentos são importantes. Sempre um aperto de mão firme.",
                en: "In Portugal, greetings are important. Always a firm handshake.",
              },
            },
          ],
        },
        difficulty: 0.7,
        culturalRelevance: 0.8,
        feedback: {
          correct: {
            pt: "Excelente! Mostras profissionalismo e cortesia portuguesa.",
            en: "Excellent! You show professionalism and Portuguese courtesy.",
          },
          incorrect: {
            pt: "Lembra-te: negócios portugueses valorizam relacionamentos pessoais primeiro.",
            en: "Remember: Portuguese business values personal relationships first.",
          },
          cultural: {
            pt: 'O "desenrascanço" português significa criatividade na resolução de problemas.',
            en: 'Portuguese "desenrascanço" means creativity in problem-solving.',
          },
        },
      },
    ],
    culturalNotes: [
      {
        id: "business-culture",
        topic: "Portuguese Business Culture",
        explanation: {
          pt: 'A cultura empresarial portuguesa valoriza relacionamentos pessoais, confiança mútua e o famoso "desenrascanço" - a habilidade de resolver problemas criativamente.',
          en: 'Portuguese business culture values personal relationships, mutual trust, and the famous "desenrascanço" - the ability to solve problems creatively.',
        },
        examples: [
          "Long lunches to build relationships",
          "Personal conversation before business discussion",
          "Creative problem-solving approaches",
        ],
        regions: [
          "Portugal",
          "Portuguese-speaking business communities globally",
        ],
        significance:
          "Essential for successful business relationships with Portuguese speakers",
      },
    ],
    assessmentCriteria: [
      {
        skill: "vocabulary",
        weight: 0.35,
        description: {
          pt: "Domina vocabulário empresarial português",
          en: "Masters Portuguese business vocabulary",
        },
      },
      {
        skill: "cultural_understanding",
        weight: 0.35,
        description: {
          pt: "Compreende etiqueta empresarial portuguesa",
          en: "Understands Portuguese business etiquette",
        },
      },
      {
        skill: "fluency",
        weight: 0.3,
        description: {
          pt: "Comunica eficazmente em contexto empresarial",
          en: "Communicates effectively in business context",
        },
      },
    ],
  },
  {
    id: "regional-pronunciation",
    title: {
      pt: "Sotaques e Pronuncia Regional",
      en: "Regional Accents and Pronunciation",
    },
    level: "C1",
    category: "pronunciation",
    duration: 60,
    exercises: [
      {
        id: "regional-differences",
        type: "pronunciation",
        prompt: {
          pt: "Reconhece e pratica diferentes sotaques do português",
          en: "Recognize and practice different Portuguese accents",
        },
        content: {
          regions: [
            {
              region: "Porto/Norte",
              characteristics: 'Closed vowels, distinct "v" pronunciation',
              examples: ["verde [ˈveɾdə]", "vinho [ˈviɲu]"],
            },
            {
              region: "Lisboa",
              characteristics: "Open vowels, softer consonants",
              examples: ["verde [ˈveɾdɨ]", "Lisboa [liʒˈboɐ]"],
            },
            {
              region: "Brasil",
              characteristics: "Clear vowels, different r sounds",
              examples: ["verde [ˈveɾdi]", "carro [ˈkaʁu]"],
            },
          ],
        },
        difficulty: 0.9,
        culturalRelevance: 0.8,
        feedback: {
          correct: {
            pt: "Fantástico! Reconheces as nuances regionais do português.",
            en: "Fantastic! You recognize Portuguese regional nuances.",
          },
          incorrect: {
            pt: 'Cada região tem a sua beleza. Não há sotaque "correto" - há diversidade!',
            en: "Each region has its beauty. There's no \"correct\" accent - there's diversity!",
          },
          cultural: {
            pt: "A diversidade de sotaques enriquece a língua portuguesa.",
            en: "The diversity of accents enriches the Portuguese language.",
          },
        },
      },
    ],
    culturalNotes: [
      {
        id: "accent-appreciation",
        topic: "Regional Accent Appreciation",
        explanation: {
          pt: "Cada região do mundo lusófono tem as suas características linguísticas únicas. Esta diversidade é uma riqueza, não uma dificuldade.",
          en: "Each region of the Portuguese-speaking world has its unique linguistic characteristics. This diversity is wealth, not difficulty.",
        },
        examples: [
          'Northern Portuguese "tu" vs Southern "você"',
          "Brazilian clear vowels vs Portuguese reduced vowels",
          "African Portuguese influences from local languages",
        ],
        regions: ["All Lusophone regions"],
        significance:
          "Understanding regional variation helps communication across Portuguese-speaking communities",
      },
    ],
    assessmentCriteria: [
      {
        skill: "pronunciation",
        weight: 0.5,
        description: {
          pt: "Reconhece e reproduz sotaques regionais",
          en: "Recognizes and reproduces regional accents",
        },
      },
      {
        skill: "cultural_understanding",
        weight: 0.3,
        description: {
          pt: "Aprecia diversidade linguística lusófona",
          en: "Appreciates Lusophone linguistic diversity",
        },
      },
      {
        skill: "fluency",
        weight: 0.2,
        description: {
          pt: "Adapta-se a diferentes sotaques na conversação",
          en: "Adapts to different accents in conversation",
        },
      },
    ],
  },
];

/**
 * Advanced Pronunciation Guides
 */
export const PRONUNCIATION_GUIDES: PronunciationGuide[] = [
  {
    phoneme: "ão",
    ipa: "/ɐ̃w̃/",
    description: {
      pt: "Ditongo nasal característico do português, inexistente noutras línguas",
      en: "Characteristic Portuguese nasal diphthong, non-existent in other languages",
    },
    examples: [
      {
        word: "coração",
        ipa: "/kuɾɐˈsɐ̃w̃/",
        meaning: {
          pt: "coração (órgão que bombeia sangue)",
          en: "heart (organ that pumps blood)",
        },
        audioHint:
          'Start with "ah" sound, add nasal quality, end with "oo" lip position',
      },
      {
        word: "pão",
        ipa: "/ˈpɐ̃w̃/",
        meaning: {
          pt: "pão (alimento básico)",
          en: "bread (basic food)",
        },
        audioHint: 'Quick "pah-oong" with nasal resonance',
      },
    ],
    commonMistakes: [
      {
        mistake: "Pronouncing as two separate sounds /a/ + /o/",
        correction: "Single flowing nasal diphthong /ɐ̃w̃/",
        explanation: {
          pt: "É um som único, não dois sons separados. A nasalidade é fundamental.",
          en: "It's a single sound, not two separate sounds. Nasality is fundamental.",
        },
      },
    ],
    regions: ["Portugal", "Brazil", "All Lusophone nations"],
  },
  {
    phoneme: "lh",
    ipa: "/ʎ/",
    description: {
      pt: 'Lateral palatal, som semelhante ao "lli" em italiano',
      en: 'Palatal lateral, sound similar to "lli" in Italian',
    },
    examples: [
      {
        word: "família",
        ipa: "/fɐˈmiʎɐ/",
        meaning: {
          pt: "família (grupo de parentes)",
          en: "family (group of relatives)",
        },
        audioHint:
          'Tongue touches roof of mouth, "ly" sound with more palatal contact',
      },
      {
        word: "trabalho",
        ipa: "/tɾɐˈbaʎu/",
        meaning: {
          pt: "trabalho (atividade laboral)",
          en: "work (labor activity)",
        },
        audioHint: 'Strong "ly" with tongue pressed against palate',
      },
    ],
    commonMistakes: [
      {
        mistake: "Pronouncing as separate /l/ + /i/ sounds",
        correction: "Single palatalized /ʎ/ sound",
        explanation: {
          pt: "A língua deve tocar o céu da boca num movimento único.",
          en: "The tongue should touch the roof of the mouth in a single movement.",
        },
      },
    ],
    regions: ["Portugal", "Brazil (varies by region)", "All Lusophone nations"],
  },
];

/**
 * Portuguese Dialect Variations
 */
export const PORTUGUESE_DIALECTS: PortugueseDialect[] = [
  {
    id: "european-portuguese",
    name: {
      pt: "Português Europeu",
      en: "European Portuguese",
    },
    region: "Portugal Continental",
    country: "Portugal",
    characteristics: {
      pt: "Vogais reduzidas, consoantes mais fechadas, ritmo mais rápido",
      en: "Reduced vowels, closed consonants, faster rhythm",
    },
    pronunciation: [
      {
        feature: "Vowel Reduction",
        description: {
          pt: "Vogais átonas são reduzidas ou eliminadas",
          en: "Unstressed vowels are reduced or eliminated",
        },
        examples: ["menino [mɨˈninu]", "telefone [tɨlɨˈfonɨ]"],
      },
      {
        feature: "Closed 'e' and 'o'",
        description: {
          pt: "Sons de 'e' e 'o' mais fechados que no Brasil",
          en: "Sounds of 'e' and 'o' more closed than in Brazil",
        },
        examples: ["sede [ˈsedɨ]", "novo [ˈnovu]"],
      },
    ],
    vocabulary: [
      {
        standard: "autocarro",
        regional: "bus",
        meaning: {
          pt: "veículo de transporte público",
          en: "public transport vehicle",
        },
      },
      {
        standard: "telemóvel",
        regional: "mobile phone",
        meaning: {
          pt: "telefone portátil",
          en: "portable phone",
        },
      },
    ],
    culturalContext: {
      pt: "Reflete a história europeia e influências mediterrânicas de Portugal",
      en: "Reflects European history and Mediterranean influences of Portugal",
    },
  },
  {
    id: "brazilian-portuguese",
    name: {
      pt: "Português Brasileiro",
      en: "Brazilian Portuguese",
    },
    region: "Brasil",
    country: "Brazil",
    characteristics: {
      pt: "Vogais abertas e claras, ritmo mais lento, entonação musical",
      en: "Open and clear vowels, slower rhythm, musical intonation",
    },
    pronunciation: [
      {
        feature: "Clear Vowels",
        description: {
          pt: "Todas as vogais são pronunciadas claramente",
          en: "All vowels are pronounced clearly",
        },
        examples: ["menino [meˈninu]", "telefone [teleˈfoni]"],
      },
      {
        feature: "Different R sounds",
        description: {
          pt: "R forte pronunciado como fricativa uvular",
          en: "Strong R pronounced as uvular fricative",
        },
        examples: ["carro [ˈkaʁu]", "rato [ˈʁatu]"],
      },
    ],
    vocabulary: [
      {
        standard: "ônibus",
        regional: "bus",
        meaning: {
          pt: "veículo de transporte público",
          en: "public transport vehicle",
        },
      },
      {
        standard: "celular",
        regional: "mobile phone",
        meaning: {
          pt: "telefone portátil",
          en: "portable phone",
        },
      },
    ],
    culturalContext: {
      pt: "Influenciado por línguas indígenas, africanas e diversidade regional brasileira",
      en: "Influenced by indigenous, African languages and Brazilian regional diversity",
    },
  },
];

/**
 * Language Learning Helper Functions
 */
export function getModuleByLevel(
  level: LanguageLessonModule["level"]
): LanguageLessonModule[] {
  return LANGUAGE_LEARNING_MODULES.filter((module) => module.level === level);
}

export function getModuleByCategory(
  category: LanguageLessonModule["category"]
): LanguageLessonModule[] {
  return LANGUAGE_LEARNING_MODULES.filter(
    (module) => module.category === category
  );
}

export function findPronunciationGuide(
  phoneme: string
): PronunciationGuide | null {
  return (
    PRONUNCIATION_GUIDES.find(
      (guide) =>
        guide.phoneme === phoneme ||
        guide.examples.some((example) => example.word.includes(phoneme))
    ) || null
  );
}

export function getDialectInfo(region: string): PortugueseDialect | null {
  return (
    PORTUGUESE_DIALECTS.find(
      (dialect) =>
        dialect.region.toLowerCase().includes(region.toLowerCase()) ||
        dialect.country.toLowerCase().includes(region.toLowerCase())
    ) || null
  );
}

export function generatePersonalizedLesson(
  userLevel: LanguageLessonModule["level"],
  interests: string[],
  culturalBackground: string
): LanguageLessonModule | null {
  const availableModules = LANGUAGE_LEARNING_MODULES.filter(
    (module) =>
      module.level === userLevel ||
      interests.some((interest) =>
        module.category.includes(interest.toLowerCase())
      ) ||
      module.culturalNotes.some((note) =>
        note.regions.some((region) =>
          region.toLowerCase().includes(culturalBackground.toLowerCase())
        )
      )
  );

  if (availableModules.length === 0) return null;

  // Return the module with highest cultural relevance
  return availableModules.reduce((best, current) =>
    current.exercises.reduce((sum, ex) => sum + ex.culturalRelevance, 0) >
    best.exercises.reduce((sum, ex) => sum + ex.culturalRelevance, 0)
      ? current
      : best
  );
}

export function assessPronunciation(
  userInput: string,
  targetWord: string,
  dialect: string = "european"
): {
  accuracy: number;
  feedback: { pt: string; en: string };
  improvements: string[];
} {
  // This would integrate with speech recognition in a full implementation
  // For now, provide structured feedback framework

  const dialectInfo = getDialectInfo(dialect);
  const pronunciationGuide = PRONUNCIATION_GUIDES.find((guide) =>
    guide.examples.some((example) => example.word === targetWord)
  );

  return {
    accuracy: 0.8, // Placeholder - would be calculated by speech recognition
    feedback: {
      pt: pronunciationGuide
        ? `Boa pronunciação! Lembra-te que ${pronunciationGuide.description.pt}`
        : "Continue a praticar a pronunciação!",
      en: pronunciationGuide
        ? `Good pronunciation! Remember that ${pronunciationGuide.description.en}`
        : "Keep practicing your pronunciation!",
    },
    improvements:
      pronunciationGuide?.commonMistakes.map((mistake) => mistake.correction) ||
      [],
  };
}

export function getCulturalContext(word: string, language: Language): string {
  const modules = LANGUAGE_LEARNING_MODULES.filter((module) =>
    module.exercises.some(
      (ex) =>
        ex.content &&
        JSON.stringify(ex.content).toLowerCase().includes(word.toLowerCase())
    )
  );

  if (modules.length === 0) return "";

  const culturalNotes = modules.flatMap((m) => m.culturalNotes);
  const relevantNote = culturalNotes.find((note) =>
    note.examples.some((example) =>
      example.toLowerCase().includes(word.toLowerCase())
    )
  );

  return relevantNote ? relevantNote.explanation[language] : "";
}
