import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, CommonStyles } from '../../constants/Styles';
import { supabase } from '../../lib/supabase';

interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  subscription_tier: 'free' | 'community' | 'ambassador' | 'familia';
  badges_earned: number;
  events_attended: number;
  connections_made: number;
  community_streak: number;
}

const MOCK_USER: UserProfile = {
  id: '1',
  first_name: 'Maria',
  last_name: 'Silva',
  avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616c41cf7a9?w=150',
  subscription_tier: 'community',
  badges_earned: 3,
  events_attended: 17,
  connections_made: 23,
  community_streak: 12,
};

export default function ProfileScreen({ navigation }) {
  const { t } = useTranslation();
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [loading, setLoading] = useState(false);

  const subscriptionTiers = {
    free: { name: 'Free', namePortuguese: 'Grátis', color: Colors.textSecondary },
    community: { name: 'Community', namePortuguese: 'Comunidade', color: Colors.primary },
    ambassador: { name: 'Ambassador', namePortuguese: 'Embaixador', color: Colors.warning },
    familia: { name: 'Família', namePortuguese: 'Família', color: Colors.success },
  };

  const menuItems = [
    {
      id: 'subscription',
      title: 'Subscription Plan',
      titlePortuguese: 'Plano de Subscrição',
      subtitle: subscriptionTiers[user.subscription_tier].name,
      subtitlePortuguese: subscriptionTiers[user.subscription_tier].namePortuguese,
      icon: 'star',
      iconColor: subscriptionTiers[user.subscription_tier].color,
      onPress: () => navigation.navigate('SubscriptionScreen'),
      premium: user.subscription_tier === 'free',
    },
    {
      id: 'badges',
      title: 'Community Badges',
      titlePortuguese: 'Distintivos da Comunidade',
      subtitle: `${user.badges_earned} badges earned`,
      subtitlePortuguese: `${user.badges_earned} distintivos conquistados`,
      icon: 'trophy',
      iconColor: Colors.warning,
      onPress: () => navigation.navigate('CommunityBadgesScreen'),
    },
    {
      id: 'edit_profile',
      title: 'Edit Profile',
      titlePortuguese: 'Editar Perfil',
      subtitle: 'Update your information',
      subtitlePortuguese: 'Atualize as suas informações',
      icon: 'person-circle',
      iconColor: Colors.primary,
      onPress: () => Alert.alert('Coming Soon', 'Edit profile functionality coming soon!'),
    },
    {
      id: 'settings',
      title: 'Settings',
      titlePortuguese: 'Configurações',
      subtitle: 'App preferences & privacy',
      subtitlePortuguese: 'Preferências da app e privacidade',
      icon: 'settings',
      iconColor: Colors.textSecondary,
      onPress: () => navigation.navigate('Settings'),
    },
    {
      id: 'help',
      title: 'Help & Support',
      titlePortuguese: 'Ajuda e Apoio',
      subtitle: 'FAQ, contact support',
      subtitlePortuguese: 'FAQ, contactar apoio',
      icon: 'help-circle',
      iconColor: Colors.textSecondary,
      onPress: () => Alert.alert('Help & Support', 'Contact support: help@lusotown.com'),
    },
    {
      id: 'logout',
      title: 'Log Out',
      titlePortuguese: 'Terminar Sessão',
      subtitle: 'Sign out of your account',
      subtitlePortuguese: 'Terminar sessão da sua conta',
      icon: 'log-out',
      iconColor: Colors.error,
      onPress: () => {
        Alert.alert(
          'Log Out',
          'Are you sure you want to log out?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Log Out', style: 'destructive', onPress: () => console.log('Logout') }
          ]
        );
      },
      destructive: true,
    },
  ];

  const renderStatCard = (title: string, value: number, icon: string) => (
    <View style={styles.statCard}>
      <Ionicons name={icon as any} size={24} color={Colors.primary} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  const renderMenuItem = (item: typeof menuItems[0]) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.menuItem, item.destructive && styles.destructiveMenuItem]}
      onPress={item.onPress}
    >
      <View style={[styles.menuIcon, { backgroundColor: `${item.iconColor}15` }]}>
        <Ionicons name={item.icon as any} size={20} color={item.iconColor} />
      </View>
      <View style={styles.menuContent}>
        <View style={styles.menuTextContainer}>
          <Text style={[styles.menuTitle, item.destructive && styles.destructiveText]}>
            {item.title}
          </Text>
          <Text style={styles.menuSubtitle}>
            {item.subtitle}
          </Text>
        </View>
        {item.premium && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>Premium</Text>
          </View>
        )}
        <Ionicons
          name="chevron-forward"
          size={20}
          color={item.destructive ? Colors.error : Colors.textSecondary}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {user.avatar_url ? (
              <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Ionicons name="person" size={32} color={Colors.textSecondary} />
              </View>
            )}
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user.first_name} {user.last_name}</Text>
          <View style={styles.subscriptionBadge}>
            <Ionicons name="star" size={14} color={subscriptionTiers[user.subscription_tier].color} />
            <Text style={[styles.subscriptionText, { color: subscriptionTiers[user.subscription_tier].color }]}>
              {subscriptionTiers[user.subscription_tier].namePortuguese}
            </Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          {renderStatCard('Events', user.events_attended, 'calendar')}
          {renderStatCard('Connections', user.connections_made, 'people')}
          {renderStatCard('Badges', user.badges_earned, 'trophy')}
          {renderStatCard('Streak', user.community_streak, 'flame')}
        </View>
      </View>

      {/* Menu Section */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Account</Text>
        {menuItems.slice(0, 2).map(renderMenuItem)}

        <Text style={styles.sectionTitle}>Settings</Text>
        {menuItems.slice(2, 5).map(renderMenuItem)}

        <Text style={styles.sectionTitle}>Account Management</Text>
        {menuItems.slice(5).map(renderMenuItem)}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>LusoTown v1.0.0</Text>
        <Text style={styles.footerText}>Made with ❤️ for the Portuguese-speaking community</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.white,
    paddingTop: 60,
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
  },
  userName: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: 6,
  },
  subscriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  subscriptionText: {
    ...Typography.caption,
    fontWeight: '600',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    ...Typography.h2,
    color: Colors.text,
    fontWeight: '700',
    marginTop: 6,
    marginBottom: 2,
  },
  statTitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  menuSection: {
    marginTop: 20,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  menuItem: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginVertical: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  destructiveMenuItem: {
    marginTop: 8,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: '500',
    marginBottom: 2,
  },
  menuSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  destructiveText: {
    color: Colors.error,
  },
  premiumBadge: {
    backgroundColor: Colors.warning,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 8,
  },
  premiumText: {
    ...Typography.caption,
    color: Colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 20,
  },
  footerText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});