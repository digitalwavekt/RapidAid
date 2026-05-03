/**
 * RapidAid - SeverityBadge Component
 * Displays emergency severity with color-coded badge
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONTS } from '../styles/theme';
import { getSeverityColor } from '../utils/helpers';

const SeverityBadge = ({ severity, size = 'medium' }) => {
  const color = getSeverityColor(severity);

  const sizeStyles = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  };

  const textSizeStyles = {
    small: styles.textSmall,
    medium: styles.textMedium,
    large: styles.textLarge,
  };

  return (
    <View style={[styles.container, sizeStyles[size], { backgroundColor: color }]}>
      <Text style={[styles.text, textSizeStyles[size]]}>
        {severity?.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.sm,
    alignSelf: 'flex-start',
  },
  small: {
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
  },
  medium: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  large: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  text: {
    color: COLORS.textInverse,
    fontWeight: '700',
  },
  textSmall: {
    fontSize: FONTS.sizes.xs,
  },
  textMedium: {
    fontSize: FONTS.sizes.sm,
  },
  textLarge: {
    fontSize: FONTS.sizes.base,
  },
});

export default SeverityBadge;
