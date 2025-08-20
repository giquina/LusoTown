// Centralized content configuration
// Use these constants instead of hardcoded strings to avoid drift and ensure consistency

export const CONTENT = {
  region: {
    short: "U.K.",
    long: "United Kingdom", 
    prepositioned: "the U.K."
  },
  streaming: {
    heroTitle: "Do you want to become a streamer?",
    heroSubtitle: "Become a content creator and grow your audience in the U.K.",
    ctaPrimary: "Start creating",
    ctaSecondary: "Learn more",
    seoTitle: "Become a content creator",
    seoDescription: "Start streaming and grow your audience across the U.K."
  }
} as const

export type ContentKey = keyof typeof CONTENT
export type RegionKey = keyof typeof CONTENT.region
export type StreamingKey = keyof typeof CONTENT.streaming