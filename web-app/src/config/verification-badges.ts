/**
 * Simple Community Verification for Portuguese Platform
 * Basic verification badges for authentic community representation
 */

export interface CommunityBadge {
  id: string
  name: string
  namePortuguese: string
  emoji: string
  color: string
}

// Simple community verification badges
export const COMMUNITY_BADGES: Record<string, CommunityBadge> = {
  heritage_verified: {
    id: 'heritage_verified',
    name: 'Heritage Verified',
    namePortuguese: 'Herança Verificada',
    emoji: '🇵🇹',
    color: '#228B22'
  },
  business_owner: {
    id: 'business_owner', 
    name: 'Business Owner',
    namePortuguese: 'Proprietário de Negócio',
    emoji: '🏢',
    color: '#4169E1'
  },
  community_member: {
    id: 'community_member',
    name: 'Community Member', 
    namePortuguese: 'Membro da Comunidade',
    emoji: '👥',
    color: '#32CD32'
  },
  student_verified: {
    id: 'student_verified',
    name: 'Student Verified',
    namePortuguese: 'Estudante Verificado',
    emoji: '🎓',
    color: '#FF6347'
  }
};

// Simple verification helper
export const getBadgeById = (id: string): CommunityBadge | undefined => {
  return COMMUNITY_BADGES[id];
};

// Get badges for signup page display
export const getSignupPageBadges = (): CommunityBadge[] => {
  return [
    COMMUNITY_BADGES.heritage_verified,
    COMMUNITY_BADGES.community_member,
    COMMUNITY_BADGES.student_verified
  ];
};