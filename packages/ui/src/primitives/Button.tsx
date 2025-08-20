import React from "react";
import { Pressable, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { colors, spacing, radii } from "@lusotown/design-tokens";
import { Text } from "./Text";

type Props = {
  title: string;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  variant?: "primary" | "secondary";
};

export const Button: React.FC<Props> = ({
  title,
  onPress,
  style,
  textStyle,
  variant = "primary",
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  primary: { backgroundColor: colors.primary[500] },
  secondary: { backgroundColor: colors.secondary[500] },
  pressed: { opacity: 0.85 },
  text: { color: "#fff", fontWeight: "600" },
});
