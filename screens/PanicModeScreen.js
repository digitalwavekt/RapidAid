/**
 * RapidAid - PanicModeScreen
 * Simplified emergency screen for panic situations
 * Large buttons, minimal text, one-tap actions
 */

import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView,
  Animated,
  Vibration,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, FONTS } from '../styles/theme';
import { useLanguage } from '../context/LanguageContext';
import { callEmergencyNumber } from '../utils/helpers';
import DataService from '../services/dataService';

const PanicModeScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Vibrate to alert user
    Vibration.vibrate([0, 500, 200, 500]);

    // Pulse animation for emergency button
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    // Glow animation
    const glow = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();
    glow.start();

    return () => {
      pulse.stop();
      glow.stop();
    };
  }, []);

  const emergencyNumbers = DataService.getEmergencyNumbers();
  const primaryNumbers = emergencyNumbers.slice(0, 4); // Show top 4

  const handleCall = (number) => {
    Vibration.vibrate(200);
    callEmergencyNumber(number);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
          accessibilityLabel="Exit panic mode"
        >
          <MaterialCommunityIcons name="arrow-left" size={28} color={COLORS.textInverse} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('panicModeActive')}</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Main Emergency Button */}
      <View style={styles.mainSection}>
        <Text style={styles.instruction}>{t('tapToCall')}</Text>

        <Animated.View 
          style={[
            styles.emergencyButtonContainer,
            { transform: [{ scale: pulseAnim }] }
          ]}
        >
          <TouchableOpacity
            style={styles.emergencyButton}
            onPress={() => handleCall('108')}
            activeOpacity={0.7}
            accessibilityLabel="Call ambulance 108"
            accessibilityRole="button"
          >
            <MaterialCommunityIcons name="ambulance" size={48} color={COLORS.emergency} />
            <Text style={styles.emergencyNumber}>108</Text>
            <Text style={styles.emergencyLabel}>{t('ambulance')}</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View 
          style={[
            styles.glowRing,
            { opacity: glowAnim }
          ]}
        />
      </View>

      {/* Quick Numbers Grid */}
      <View style={styles.numbersGrid}>
        {primaryNumbers.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.numberButton}
            onPress={() => handleCall(item.number)}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons 
              name={item.icon || 'phone'} 
              size={28} 
              color={item.color || COLORS.primary} 
            />
            <Text style={styles.numberText}>{item.number}</Text>
            <Text style={styles.numberLabel}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Emergency Types */}
      <View style={styles.quickTypes}>
        <Text style={styles.quickTypesTitle}>Quick Guides</Text>
        <View style={styles.quickTypesGrid}>
          {['heart-attack', 'snake-bite', 'drowning'].map((id) => {
            const emergency = DataService.getEmergencyById(id);
            if (!emergency) return null;
            return (
              <TouchableOpacity
                key={id}
                style={styles.quickTypeButton}
                onPress={() => navigation.navigate('StepGuide', { emergencyId: id })}
              >
                <MaterialCommunityIcons name="book-open" size={20} color={COLORS.textInverse} />
                <Text style={styles.quickTypeText}>
                  {emergency.title?.en}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.emergency,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
  },
  backButton: {
    padding: SPACING.sm,
  },
  headerTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textInverse,
  },
  headerRight: {
    width: 40,
  },
  mainSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl,
    position: 'relative',
  },
  instruction: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: SPACING.xl,
  },
  emergencyButtonContainer: {
    zIndex: 2,
  },
  emergencyButton: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: COLORS.textInverse,
    alignItems: 'center',
    justifyContent: 'center',
    ...COLORS.emergencyGlow,
  },
  emergencyNumber: {
    fontSize: FONTS.sizes['3xl'],
    fontWeight: '800',
    color: COLORS.emergency,
    marginTop: SPACING.xs,
  },
  emergencyLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  glowRing: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
    zIndex: 1,
  },
  numbersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  numberButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    minWidth: 80,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  numberText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textInverse,
    marginTop: SPACING.xs,
  },
  numberLabel: {
    fontSize: FONTS.sizes.xs,
    color: 'rgba(255,255,255,0.7)',
    marginTop: SPACING.xs,
  },
  quickTypes: {
    paddingHorizontal: SPACING.base,
    marginTop: SPACING.lg,
  },
  quickTypesTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  quickTypesGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  quickTypeButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  quickTypeText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.textInverse,
  },
});

export default PanicModeScreen;
