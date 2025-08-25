import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors, Typography, CommonStyles } from '../../constants/Styles';

export default function SettingsScreen() {
  const { t } = useTranslation();

  return (
    <View style={CommonStyles.centerContainer}>
      <Text style={styles.title}>{t('settings.title')}</Text>
      <Text style={styles.comingSoon}>⚙️ Coming Soon!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    ...Typography.h1,
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 24,
  },
  comingSoon: {
    ...Typography.h2,
    textAlign: 'center',
  },
});