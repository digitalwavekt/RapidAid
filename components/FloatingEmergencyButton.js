/**
 * RapidAid - FloatingEmergencyButton
 * Fixed emergency button that stays visible on all screens
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../styles/theme';
import { callEmergencyNumber } from '../utils/helpers';

const FloatingEmergencyButton = ({ 
  number = '108',
  visible = true,
  onPress,
}) => {
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onPress ? onPress() : callEmergencyNumber(number)}
          activeOpacity={0.8}
          accessibilityLabel="Call emergency services"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="phone" size={28} color={COLORS.textInverse} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: SPACING.xl,
    right: SPACING.lg,
    zIndex: 1000,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.emergency,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.emergency,
  },
});

export default FloatingEmergencyButton;
