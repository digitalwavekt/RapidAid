/**
 * RapidAid - ProgressBar Component
 * Shows step completion progress
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONTS } from '../styles/theme';

const ProgressBar = ({ current, total, showPercentage = true }) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View 
          style={[
            styles.fill, 
            { width: `${percentage}%` }
          ]} 
        />
      </View>
      {showPercentage && (
        <Text style={styles.percentage}>{percentage}%</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  track: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.full,
  },
  percentage: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
    minWidth: 40,
    textAlign: 'right',
  },
});

export default ProgressBar;
