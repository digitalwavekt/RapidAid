/**
 * RapidAid - EmergencyButton Component
 * Large, high-visibility emergency call button
 * Always visible on critical screens
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS } from '../styles/theme';
import { callEmergencyNumber } from '../utils/helpers';

const EmergencyButton = ({ 
  number = '108', 
  label = 'Call Emergency',
  size = 'large',
  style,
  onPress,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    // Pulse animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (onPress) {
      onPress();
    } else {
      callEmergencyNumber(number);
    }
  };

  const sizeStyles = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <TouchableOpacity
        style={[styles.container, sizeStyles[size]]}
        onPress={handlePress}
        activeOpacity={0.8}
        accessibilityLabel={`Call emergency number ${number}`}
        accessibilityRole="button"
      >
        <MaterialCommunityIcons 
          name="phone-alert" 
          size={size === 'large' ? 32 : 24} 
          color={COLORS.textInverse} 
        />
        <Text style={styles.text}>{label}</Text>
        <Text style={styles.number}>{number}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.emergency,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.emergency,
  },
  small: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  medium: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  large: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    minHeight: 80,
    gap: SPACING.xs,
  },
  text: {
    color: COLORS.textInverse,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  number: {
    color: COLORS.textInverse,
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
  },
});

export default EmergencyButton;
