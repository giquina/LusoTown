import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, CommonStyles } from '../constants/Styles';

let ButtonFromUI = null;
try {
  // Will work when Metro resolves workspace packages
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  ButtonFromUI = require('@lusotown/ui').Button;
} catch (e) {
  ButtonFromUI = null;
}

export default function SharedButton({ title, onPress, disabled }) {
  if (ButtonFromUI) {
    return <ButtonFromUI title={title} onPress={onPress} variant="primary" />;
  }
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    ...CommonStyles.button,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
  },
  text: {
    ...CommonStyles.buttonText,
    color: Colors.surface,
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: Colors.border,
  },
});
