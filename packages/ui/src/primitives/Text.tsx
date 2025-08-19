import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { colors, typography } from '@lusotown/design-tokens';

export const Text: React.FC<TextProps & { variant?: 'body' | 'h1' }>
  = ({ style, variant = 'body', ...props }) => {
  return <RNText style={[styles[variant], style]} {...props} />;
};

const styles = StyleSheet.create({
  body: { color: colors.neutral.text, fontSize: typography.body.fontSize, lineHeight: typography.body.lineHeight },
  h1: { color: colors.neutral.text, fontSize: typography.h1.fontSize, lineHeight: typography.h1.lineHeight, fontWeight: '700' },
});
