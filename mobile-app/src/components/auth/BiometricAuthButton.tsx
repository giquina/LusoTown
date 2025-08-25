import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import * as LocalAuthentication from 'expo-local-authentication';
import { Colors, Typography } from '../../constants/Styles';

interface BiometricAuthButtonProps {
  onPress: () => void;
  email: string;
}

export default function BiometricAuthButton({ onPress, email }: BiometricAuthButtonProps) {
  const { t } = useTranslation();
  const [biometricType, setBiometricType] = React.useState<string>('');

  React.useEffect(() => {
    getBiometricType();
  }, []);

  const getBiometricType = async () => {
    const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
    
    if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
      setBiometricType(Platform.OS === 'ios' ? 'Face ID' : 'Face Recognition');
    } else if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
      setBiometricType(Platform.OS === 'ios' ? 'Touch ID' : 'Fingerprint');
    } else if (supportedTypes.includes(LocalAuthentication.AuthenticationType.IRIS)) {
      setBiometricType('Iris Scan');
    } else {
      setBiometricType('Biometric');
    }
  };

  const getBiometricIcon = () => {
    if (biometricType.includes('Face')) {
      return '👤';
    } else if (biometricType.includes('Touch') || biometricType.includes('Fingerprint')) {
      return '👆';
    } else if (biometricType.includes('Iris')) {
      return '👁️';
    } else {
      return '🔒';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{getBiometricIcon()}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>
          {t('auth.biometric.login', { type: biometricType })}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {email}
        </Text>
      </View>
      <View style={styles.arrow}>
        <Text style={styles.arrowIcon}>→</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.primary + '20',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    ...Typography.subtitle,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: 2,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  arrow: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});