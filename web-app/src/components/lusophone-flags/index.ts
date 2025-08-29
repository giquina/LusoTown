/**
 * Lusophone Flag System - Celebrating All 8 Portuguese-speaking Nations
 * 
 * A comprehensive flag display system that respectfully showcases the cultural
 * diversity of the Portuguese-speaking community with rotating displays,
 * subtle background patterns, and cultural accent elements.
 * 
 * Features:
 * - Rotating flag displays for headers, footers, and cultural sections
 * - Respectful flag background patterns 
 * - Cultural accent strips for cards and events
 * - Full accessibility support with ARIA labels
 * - Portuguese heritage color coordination
 * - Cultural authenticity through respectful symbol usage
 */

// Main rotating flag display component
export { default as RotatingFlagDisplay } from './RotatingFlagDisplay';

// Preset flag display variants
export { 
  HeaderFlag, 
  FooterFlag, 
  CulturalFlag, 
  CardFlag 
} from './RotatingFlagDisplay';

// Background pattern components
export { default as FlagBackgroundPattern } from './FlagBackgroundPattern';
export { 
  SubtleFlagBackground,
  CulturalMosaicBackground,
  HeritageWaveBackground,
  FlagGradientBackground
} from './FlagBackgroundPattern';

// Flag accent strip components
export { default as FlagAccentStrip } from './FlagAccentStrip';
export {
  CardHeaderAccent,
  CardFooterAccent,
  SidebarAccent,
  SectionDividerAccent,
  EventCardAccent,
  SuccessStoryAccent
} from './FlagAccentStrip';

// Configuration exports
export {
  LUSOPHONE_FLAGS,
  FLAG_ROTATION_CONFIGS,
  FLAG_SIZES,
  FLAG_ANIMATIONS,
  CULTURAL_RESPECT_GUIDELINES,
  type LusophoneFlag
} from '@/config/lusophone-flags';

/**
 * Usage Examples:
 * 
 * // Header integration
 * <HeaderFlag enableClick={true} className="ml-4" />
 * 
 * // Cultural section background
 * <div className="relative">
 *   <SubtleFlagBackground opacity={0.1} />
 *   <YourContent />
 * </div>
 * 
 * // Event card accent
 * <div className="relative bg-white rounded-lg">
 *   <EventCardAccent />
 *   <EventContent />
 * </div>
 * 
 * // Success story with cultural background
 * <section className="relative py-12">
 *   <HeritageWaveBackground 
 *     opacity={0.05} 
 *     primaryNationsOnly={true} 
 *   />
 *   <SuccessStories />
 * </section>
 */