/**
 * RapidAid - StepGuideScreen
 * Step-by-step emergency guide with audio and navigation
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS } from '../styles/theme';
import { useLanguage } from '../context/LanguageContext';
import DataService from '../services/dataService';
import AudioService from '../services/audioService';
import { getLocalizedText } from '../utils/helpers';
import StepCard from '../components/StepCard';
import ProgressBar from '../components/ProgressBar';
import EmergencyButton from '../components/EmergencyButton';
import FloatingEmergencyButton from '../components/FloatingEmergencyButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const StepGuideScreen = ({ route, navigation }) => {
  const { emergencyId } = route.params;
  const { language, t } = useLanguage();

  const emergency = DataService.getEmergencyById(emergencyId);
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    return () => {
      AudioService.stop();
    };
  }, []);

  if (!emergency) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Emergency not found</Text>
      </SafeAreaView>
    );
  }

  const steps = emergency.steps || [];
  const currentStep = steps[currentStepIndex];
  const emergencyNumber = emergency.emergencyNumber || '108';
  const title = getLocalizedText(emergency.title, language);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCompletedSteps([...completedSteps, currentStepIndex]);
      setCurrentStepIndex(currentStepIndex + 1);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  const handleComplete = () => {
    AudioService.stop();
    navigation.navigate('EmergencyComplete', {
      emergencyId: emergency.id,
      emergencyTitle: title,
    });
  };

  const handleStepPress = (index) => {
    setCurrentStepIndex(index);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            AudioService.stop();
            navigation.goBack();
          }}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.textInverse} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
          <ProgressBar
            current={currentStepIndex + 1}
            total={steps.length}
          />
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            AudioService.stop();
            // ✅ FIXED
            navigation.navigate('MainTabs', { screen: 'Home' });
          }}
        >
          <MaterialCommunityIcons name="close" size={24} color={COLORS.textInverse} />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Current Step Card */}
          {currentStep && (
            <StepCard
              step={currentStep}
              stepNumber={currentStepIndex + 1}
              totalSteps={steps.length}
              isActive={true}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onComplete={handleComplete}
              autoPlay={true}
            />
          )}

          {/* Emergency Call Reminder */}
          <View style={styles.reminderCard}>
            <MaterialCommunityIcons name="phone-alert" size={20} color={COLORS.emergency} />
            <Text style={styles.reminderText}>
              {t('emergencyNumber')}: {emergencyNumber}
            </Text>
            <EmergencyButton
              number={emergencyNumber}
              label={t('callNow')}
              size="small"
            />
          </View>

          {/* Step Navigator */}
          <View style={styles.stepNavigator}>
            <Text style={styles.navigatorTitle}>{t('steps')}</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.stepList}
            >
              {steps.map((step, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.stepItem,
                    index === currentStepIndex && styles.stepItemActive,
                    completedSteps.includes(index) && styles.stepItemCompleted,
                  ]}
                  onPress={() => handleStepPress(index)}
                >
                  <Text style={[
                    styles.stepItemText,
                    index === currentStepIndex && styles.stepItemTextActive,
                    completedSteps.includes(index) && styles.stepItemTextCompleted,
                  ]}>
                    {index + 1}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navButton, currentStepIndex === 0 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentStepIndex === 0}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={24}
            color={currentStepIndex === 0 ? COLORS.textMuted : COLORS.primary}
          />
          <Text style={[styles.navText, currentStepIndex === 0 && styles.navTextDisabled]}>
            {t('previousStep')}
          </Text>
        </TouchableOpacity>

        <View style={styles.stepIndicator}>
          <Text style={styles.stepIndicatorText}>
            {currentStepIndex + 1} / {steps.length}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.navButton, currentStepIndex === steps.length - 1 && styles.navButtonComplete]}
          onPress={currentStepIndex === steps.length - 1 ? handleComplete : handleNext}
        >
          <Text style={[styles.navText, currentStepIndex === steps.length - 1 && styles.navTextComplete]}>
            {currentStepIndex === steps.length - 1 ? t('close') : t('nextStep')}
          </Text>
          {currentStepIndex !== steps.length - 1 && (
            <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.primary} />
          )}
        </TouchableOpacity>
      </View>

      <FloatingEmergencyButton number={emergencyNumber} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.emergency,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
  },
  backButton: {
    padding: SPACING.sm,
  },
  headerCenter: {
    flex: 1,
    marginHorizontal: SPACING.md,
  },
  headerTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    color: COLORS.textInverse,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  closeButton: {
    padding: SPACING.sm,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.base,
    paddingBottom: SPACING['4xl'],
  },
  reminderCard: {
    backgroundColor: COLORS.emergencyLight,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.base,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.emergency,
  },
  reminderText: {
    flex: 1,
    fontSize: FONTS.sizes.base,
    fontWeight: '600',
    color: COLORS.emergency,
    marginLeft: SPACING.sm,
  },
  stepNavigator: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.base,
  },
  navigatorTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  stepList: {
    gap: SPACING.sm,
  },
  stepItem: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  stepItemActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  stepItemCompleted: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  stepItemText: {
    fontSize: FONTS.sizes.base,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  stepItemTextActive: {
    color: COLORS.textInverse,
  },
  stepItemTextCompleted: {
    color: COLORS.textInverse,
  },
  bottomNav: {
    backgroundColor: COLORS.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.base,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.md,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
    minWidth: 100,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonComplete: {
    backgroundColor: COLORS.success,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },
  navText: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.primary,
  },
  navTextDisabled: {
    color: COLORS.textMuted,
  },
  navTextComplete: {
    color: COLORS.textInverse,
  },
  stepIndicator: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  stepIndicatorText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  errorText: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.error,
    textAlign: 'center',
    marginTop: SPACING.xl,
  },
});

export default StepGuideScreen;
