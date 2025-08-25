import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, CommonStyles } from '../../constants/Styles';
import { supabase } from '../../lib/supabase';

interface Badge {
  id: string;
  name: string;
  namePortuguese: string;
  type: 'business' | 'cultural' | 'personal' | 'achievement' | 'heritage';
  emoji: string;
  color: string;
  backgroundColor: string;
  description: string;
  descriptionPortuguese: string;
  criteria: string;
  culturalImportance: string;
  trustLevel: number;
  popularityScore: number;
  communityRespect: number;
  isEarned: boolean;
  earnedDate?: string;
  progress?: number; // 0-100 for badges in progress
}

interface CommunityStats {
  eventsAttended: number;
  connectionsMade: number;
  businessesSupported: number;
  culturalContributions: number;
  communityStreak: number;
  totalEngagementScore: number;
}

const COMMUNITY_BADGES: Badge[] = [
  {
    id: 'portuguese-heritage-verified',
    name: 'Lusophone Heritage Verified',
    namePortuguese: 'Herança Portuguesa Verificada',
    type: 'heritage',
    emoji: '🇵🇹',
    color: '#DC2626',
    backgroundColor: '#FEF2F2',
    description: 'Verified connection to Portuguese cultural heritage',
    descriptionPortuguese: 'Conexão verificada com herança cultural portuguesa',
    criteria: 'Submit documentation of Portuguese heritage or demonstrate deep cultural involvement',
    culturalImportance: 'Validates authentic Portuguese cultural connection for community trust',
    trustLevel: 9,
    popularityScore: 91,
    communityRespect: 89,
    isEarned: true,
    earnedDate: '2024-08-15',
  },
  {
    id: 'business-owner-verified',
    name: 'Business Owner Verified',
    namePortuguese: 'Proprietário de Negócio Verificado',
    type: 'business',
    emoji: '🏢',
    color: '#059669',
    backgroundColor: '#D1FAE5',
    description: 'Verified Portuguese-speaking business owner',
    descriptionPortuguese: 'Proprietário de negócio lusófono verificado',
    criteria: 'Own or co-own a registered business serving Portuguese-speaking community',
    culturalImportance: 'Celebrates Portuguese entrepreneurial excellence',
    trustLevel: 9,
    popularityScore: 95,
    communityRespect: 92,
    isEarned: false,
    progress: 75,
  },
  {
    id: 'community-ambassador',
    name: 'Community Ambassador',
    namePortuguese: 'Embaixador Comunitário',
    type: 'cultural',
    emoji: '🌟',
    color: '#DC2626',
    backgroundColor: '#FEE2E2',
    description: 'Recognized leader promoting Portuguese cultural unity',
    descriptionPortuguese: 'Líder reconhecido promovendo unidade cultural portuguesa',
    criteria: 'Demonstrate significant community leadership and cultural event organization',
    culturalImportance: 'Recognizes individuals who preserve Portuguese cultural heritage',
    trustLevel: 10,
    popularityScore: 88,
    communityRespect: 96,
    isEarned: false,
    progress: 45,
  },
  {
    id: 'cultural-explorer',
    name: 'Cultural Explorer',
    namePortuguese: 'Explorador Cultural',
    type: 'achievement',
    emoji: '🗺️',
    color: '#7C3AED',
    backgroundColor: '#EDE9FE',
    description: 'Attended 10+ Portuguese cultural events',
    descriptionPortuguese: 'Participou em 10+ eventos culturais portugueses',
    criteria: 'Attend 10 or more Portuguese cultural events',
    culturalImportance: 'Shows commitment to exploring Portuguese culture',
    trustLevel: 7,
    popularityScore: 82,
    communityRespect: 78,
    isEarned: true,
    earnedDate: '2024-08-01',
  },
  {
    id: 'kizomba-community-verified',
    name: 'Kizomba Community Leader',
    namePortuguese: 'Líder da Comunidade de Kizomba',
    type: 'achievement',
    emoji: '💃',
    color: '#7C2D12',
    backgroundColor: '#FEF3C7',
    description: 'Recognized leader in London\'s Kizomba dance community',
    descriptionPortuguese: 'Líder reconhecido na comunidade de dança Kizomba de Londres',
    criteria: 'Demonstrate advanced Kizomba skills and community leadership',
    culturalImportance: 'Preserves authentic Angolan Kizomba traditions',
    trustLevel: 8,
    popularityScore: 79,
    communityRespect: 86,
    isEarned: false,
    progress: 30,
  },
  {
    id: 'single-culturally-connected',
    name: 'Single & Culturally Connected',
    namePortuguese: 'Solteiro e Culturalmente Conectado',
    type: 'personal',
    emoji: '💕',
    color: '#EC4899',
    backgroundColor: '#FCE7F3',
    description: 'Single Portuguese speaker seeking meaningful connections',
    descriptionPortuguese: 'Lusófono solteiro procurando conexões significativas',
    criteria: 'Be single and actively participate in Portuguese cultural events',
    culturalImportance: 'Facilitates authentic cultural connections',
    trustLevel: 8,
    popularityScore: 82,
    communityRespect: 79,
    isEarned: true,
    earnedDate: '2024-07-20',
  },
  {
    id: 'event-enthusiast',
    name: 'Event Enthusiast',
    namePortuguese: 'Entusiasta de Eventos',
    type: 'achievement',
    emoji: '🎉',
    color: '#F59E0B',
    backgroundColor: '#FEF3C7',
    description: 'Attended 25+ community events',
    descriptionPortuguese: 'Participou em 25+ eventos comunitários',
    criteria: 'Attend 25 or more Portuguese community events',
    culturalImportance: 'Shows exceptional commitment to community participation',
    trustLevel: 8,
    popularityScore: 89,
    communityRespect: 85,
    isEarned: false,
    progress: 68,
  },
  {
    id: 'community-connector',
    name: 'Community Connector',
    namePortuguese: 'Conector Comunitário',
    type: 'achievement',
    emoji: '🤝',
    color: '#10B981',
    backgroundColor: '#D1FAE5',
    description: 'Connected 50+ community members',
    descriptionPortuguese: 'Conectou 50+ membros da comunidade',
    criteria: 'Successfully introduce and connect 50+ community members',
    culturalImportance: 'Builds strong Portuguese community networks',
    trustLevel: 9,
    popularityScore: 87,
    communityRespect: 91,
    isEarned: false,
    progress: 34,
  },
];

const MOCK_STATS: CommunityStats = {
  eventsAttended: 17,
  connectionsMode: 23,
  businessesSupported: 8,
  culturalContributions: 5,
  communityStreak: 12,
  totalEngagementScore: 2450,
};

export default function CommunityBadgesScreen({ navigation }) {
  const { t } = useTranslation();
  const [badges, setBadges] = useState<Badge[]>(COMMUNITY_BADGES);
  const [stats, setStats] = useState<CommunityStats>(MOCK_STATS);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'earned' | 'available' | 'progress'>('earned');

  const earnedBadges = badges.filter(badge => badge.isEarned);
  const availableBadges = badges.filter(badge => !badge.isEarned && !badge.progress);
  const progressBadges = badges.filter(badge => !badge.isEarned && badge.progress);

  const renderBadgeCard = (badge: Badge, showProgress = false) => (
    <TouchableOpacity
      key={badge.id}
      style={[
        styles.badgeCard,
        badge.isEarned && styles.earnedBadgeCard,
        !badge.isEarned && styles.unearnedBadgeCard
      ]}
      onPress={() => setSelectedBadge(badge)}
    >
      <View style={[styles.badgeIcon, { backgroundColor: badge.backgroundColor }]}>
        <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
        {badge.isEarned && (
          <View style={styles.earnedIndicator}>
            <Ionicons name="checkmark" size={12} color={Colors.white} />
          </View>
        )}
      </View>
      
      <View style={styles.badgeInfo}>
        <Text style={[
          styles.badgeName,
          !badge.isEarned && styles.unearnedBadgeName
        ]}>
          {badge.name}
        </Text>
        <Text style={styles.badgeNamePortuguese}>
          {badge.namePortuguese}
        </Text>
        <Text style={[
          styles.badgeDescription,
          !badge.isEarned && styles.unearnedBadgeDescription
        ]}>
          {badge.description}
        </Text>
        
        {badge.isEarned && badge.earnedDate && (
          <Text style={styles.earnedDate}>
            Earned {new Date(badge.earnedDate).toLocaleDateString()}
          </Text>
        )}
        
        {showProgress && badge.progress && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${badge.progress}%`, backgroundColor: badge.color }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{badge.progress}%</Text>
          </View>
        )}
      </View>

      <View style={styles.badgeMetrics}>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{badge.trustLevel}</Text>
          <Text style={styles.metricLabel}>Trust</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{badge.communityRespect}</Text>
          <Text style={styles.metricLabel}>Respect</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderBadgeModal = () => {
    if (!selectedBadge) return null;

    return (
      <Modal
        visible={!!selectedBadge}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedBadge(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setSelectedBadge(null)}
            >
              <Ionicons name="close" size={24} color={Colors.text} />
            </TouchableOpacity>

            <View style={[styles.modalBadgeIcon, { backgroundColor: selectedBadge.backgroundColor }]}>
              <Text style={styles.modalBadgeEmoji}>{selectedBadge.emoji}</Text>
              {selectedBadge.isEarned && (
                <View style={styles.modalEarnedIndicator}>
                  <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
                </View>
              )}
            </View>

            <Text style={styles.modalBadgeName}>{selectedBadge.name}</Text>
            <Text style={styles.modalBadgeNamePortuguese}>{selectedBadge.namePortuguese}</Text>
            
            <View style={styles.modalBadgeType}>
              <Text style={[styles.badgeTypeText, { color: selectedBadge.color }]}>
                {selectedBadge.type.toUpperCase()}
              </Text>
            </View>

            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Description</Text>
                <Text style={styles.modalSectionText}>{selectedBadge.description}</Text>
                <Text style={styles.modalSectionTextPortuguese}>{selectedBadge.descriptionPortuguese}</Text>
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>How to Earn</Text>
                <Text style={styles.modalSectionText}>{selectedBadge.criteria}</Text>
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Cultural Importance</Text>
                <Text style={styles.modalSectionText}>{selectedBadge.culturalImportance}</Text>
              </View>

              <View style={styles.modalMetrics}>
                <View style={styles.modalMetric}>
                  <Text style={styles.modalMetricValue}>{selectedBadge.trustLevel}/10</Text>
                  <Text style={styles.modalMetricLabel}>Trust Level</Text>
                </View>
                <View style={styles.modalMetric}>
                  <Text style={styles.modalMetricValue}>{selectedBadge.popularityScore}</Text>
                  <Text style={styles.modalMetricLabel}>Popularity</Text>
                </View>
                <View style={styles.modalMetric}>
                  <Text style={styles.modalMetricValue}>{selectedBadge.communityRespect}</Text>
                  <Text style={styles.modalMetricLabel}>Community Respect</Text>
                </View>
              </View>

              {selectedBadge.isEarned && selectedBadge.earnedDate && (
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Achievement Date</Text>
                  <Text style={styles.modalSectionText}>
                    {new Date(selectedBadge.earnedDate).toLocaleDateString('en-GB', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Text>
                </View>
              )}

              {selectedBadge.progress && (
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Progress</Text>
                  <View style={styles.modalProgressContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { width: `${selectedBadge.progress}%`, backgroundColor: selectedBadge.color }
                        ]} 
                      />
                    </View>
                    <Text style={styles.modalProgressText}>{selectedBadge.progress}% Complete</Text>
                  </View>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  const renderStatsSection = () => (
    <View style={styles.statsContainer}>
      <Text style={styles.sectionTitle}>Community Statistics</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.eventsAttended}</Text>
          <Text style={styles.statLabel}>Events Attended</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.connectionsMode}</Text>
          <Text style={styles.statLabel}>Connections Made</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.businessesSupported}</Text>
          <Text style={styles.statLabel}>Businesses Supported</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.communityStreak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </View>
    </View>
  );

  const renderTabBar = () => (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'earned' && styles.activeTab]}
        onPress={() => setActiveTab('earned')}
      >
        <Text style={[styles.tabText, activeTab === 'earned' && styles.activeTabText]}>
          Earned ({earnedBadges.length})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'progress' && styles.activeTab]}
        onPress={() => setActiveTab('progress')}
      >
        <Text style={[styles.tabText, activeTab === 'progress' && styles.activeTabText]}>
          In Progress ({progressBadges.length})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'available' && styles.activeTab]}
        onPress={() => setActiveTab('available')}
      >
        <Text style={[styles.tabText, activeTab === 'available' && styles.activeTabText]}>
          Available ({availableBadges.length})
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Community Badges</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStatsSection()}
        
        <View style={styles.badgesSection}>
          <Text style={styles.sectionTitle}>Your Portuguese Community Journey</Text>
          <Text style={styles.sectionSubtitle}>
            Earn badges by participating in Portuguese cultural activities and connecting with the community
          </Text>
          
          {renderTabBar()}

          <View style={styles.badgesList}>
            {activeTab === 'earned' && earnedBadges.map(badge => renderBadgeCard(badge))}
            {activeTab === 'progress' && progressBadges.map(badge => renderBadgeCard(badge, true))}
            {activeTab === 'available' && availableBadges.map(badge => renderBadgeCard(badge))}
          </View>

          {activeTab === 'earned' && earnedBadges.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="trophy-outline" size={48} color={Colors.textSecondary} />
              <Text style={styles.emptyStateText}>No badges earned yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Start participating in Portuguese cultural activities to earn your first badge!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {renderBadgeModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    ...Typography.h2,
    color: Colors.text,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    backgroundColor: Colors.white,
    margin: 16,
    padding: 20,
    borderRadius: 16,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: 4,
  },
  sectionSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: Colors.primaryLight,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    ...Typography.h1,
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 28,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 4,
  },
  badgesSection: {
    margin: 16,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.white,
  },
  badgesList: {
    gap: 12,
  },
  badgeCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  earnedBadgeCard: {
    borderWidth: 2,
    borderColor: Colors.success,
  },
  unearnedBadgeCard: {
    opacity: 0.7,
  },
  badgeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  badgeEmoji: {
    fontSize: 24,
  },
  earnedIndicator: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: Colors.success,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  badgeInfo: {
    flex: 1,
    marginRight: 12,
  },
  badgeName: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: 2,
  },
  unearnedBadgeName: {
    color: Colors.textSecondary,
  },
  badgeNamePortuguese: {
    ...Typography.caption,
    color: Colors.primary,
    fontStyle: 'italic',
    marginBottom: 6,
  },
  badgeDescription: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  unearnedBadgeDescription: {
    color: Colors.textSecondary,
    opacity: 0.7,
  },
  earnedDate: {
    ...Typography.caption,
    color: Colors.success,
    marginTop: 6,
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  badgeMetrics: {
    alignItems: 'center',
  },
  metric: {
    alignItems: 'center',
    marginBottom: 8,
  },
  metricValue: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  metricLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 10,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    ...Typography.h3,
    color: Colors.textSecondary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxHeight: '80%',
    position: 'relative',
  },
  modalClose: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  modalBadgeIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  modalBadgeEmoji: {
    fontSize: 36,
  },
  modalEarnedIndicator: {
    position: 'absolute',
    bottom: -8,
    right: -8,
  },
  modalBadgeName: {
    ...Typography.h1,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  modalBadgeNamePortuguese: {
    ...Typography.body,
    color: Colors.primary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  modalBadgeType: {
    alignItems: 'center',
    marginBottom: 24,
  },
  badgeTypeText: {
    ...Typography.caption,
    fontWeight: '600',
    letterSpacing: 1,
  },
  modalScroll: {
    maxHeight: 400,
  },
  modalSection: {
    marginBottom: 20,
  },
  modalSectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: 8,
  },
  modalSectionText: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 4,
  },
  modalSectionTextPortuguese: {
    ...Typography.body,
    color: Colors.primary,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  modalMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  modalMetric: {
    alignItems: 'center',
  },
  modalMetricValue: {
    ...Typography.h2,
    color: Colors.primary,
    fontWeight: '600',
  },
  modalMetricLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  modalProgressContainer: {
    marginTop: 8,
  },
  modalProgressText: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
});