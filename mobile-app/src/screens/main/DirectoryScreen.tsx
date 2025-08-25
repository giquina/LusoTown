import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors, Typography, CommonStyles } from '../../constants/Styles';

export default function DirectoryScreen() {
  const { t } = useTranslation();

  return (
    <View style={CommonStyles.centerContainer}>
      <Text style={styles.title}>{t('directory.title')}</Text>
      <Text style={styles.subtitle}>{t('directory.subtitle')}</Text>
      <Text style={styles.comingSoon}>🏪 Coming Soon!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    ...Typography.h1,
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  comingSoon: {
    ...Typography.h2,
    textAlign: 'center',
  },
});