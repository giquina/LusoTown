// Centralized content and region configuration

export type RegionConfig = {
  code: "uk";
  labelShort: "U.K.";
  labelLong: "United Kingdom";
  emoji: "🇬🇧";
};

export const REGION: RegionConfig = {
  code: "uk",
  labelShort: "U.K.",
  labelLong: "United Kingdom",
  emoji: "🇬🇧",
} as const;

export const STREAMING_COPY = {
  hero: {
    title: "Live Streaming",
    subtitle: `Real-time shows, interviews, and community events across the ${REGION.labelShort}.`,
    ctaPrimary: "Start watching",
    ctaSecondary: "Learn more",
  },
  features: [
    "Reliable, low-latency streaming",
    "VOD replays and highlights",
    "Creator-friendly chat tools",
  ],
} as const;
