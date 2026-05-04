/**
 * RapidAid - StepCard Component (FIXED)
 * Displays individual emergency step with audio and image
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';  // ✅ Added Image import
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS } from '../styles/theme';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedText } from '../utils/helpers';
import AudioService from '../services/audioService';

// 🖼️ IMAGE ASSET REGISTRY - Map image names to require() statements
// Add all your step images here as you add them to assets/images/
const IMAGE_ASSETS = {
  // Heart Attack Steps
  'step1_call': require('../../assets/images/steps/step1_call.png'),
  'step2_comfort': require('../../assets/images/steps/step2_comfort.png'),
  'step3_aspirin': require('../../assets/images/steps/step3_aspirin.png'),
  'step4_breathing': require('../../assets/images/steps/step4_breathing.png'),
  'step5_calm': require('../../assets/images/steps/step5_calm.png'),

  // Snake Bite Steps
  'step1_calm': require('../../assets/images/steps/step1_calm.png'),
  'step2_remove': require('../../assets/images/steps/step2_remove.png'),
  'step3_position': require('../../assets/images/steps/step3_position.png'),
  'step4_clean': require('../../assets/images/steps/step4_clean.png'),
  'step5_bandage': require('../../assets/images/steps/step5_bandage.png'),
  'step6_ambulance': require('../../assets/images/steps/step6_ambulance.png'),

  // Drowning Steps
  'step1_safety': require('../../assets/images/steps/step1_safety.png'),
  'step2_pull': require('../../assets/images/steps/step2_pull.png'),
  'step3_check': require('../../assets/images/steps/step3_check.png'),
  'step4_cpr': require('../../assets/images/steps/step4_cpr.png'),
  'step5_recovery': require('../../assets/images/steps/step5_recovery.png'),
  'step6_monitor': require('../../assets/images/steps/step6_monitor.png'),

  // Add more step images here...
};

const StepCard = ({
  step,
  stepNumber,
  totalSteps,
  isActive = false,
  onNext,
  onPrevious,
  onComplete,
  autoPlay = true,
}) => {
  const { language, t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [imageError, setImageError] = useState(false);  // ✅ Track image load errors

  const title = getLocalizedText(step.title, language);
  const description = getLocalizedText(step.description, language);

  useEffect(() => {
    if (isActive && autoPlay && !hasPlayed && step.audio) {
      playAudio();
    }
    return () => {
      if (!isActive) {
        AudioService.stop();
        setIsPlaying(false);
      }
    };
  }, [isActive]);

  const playAudio = async () => {
    setIsPlaying(true);
    setHasPlayed(true);
    const success = await AudioService.playStepAudio(step.audio, () => {
      setIsPlaying(false);
    });
    // ✅ FIX: Handle audio load failure
    if (!success) {
      setIsPlaying(false);
    }
  };

  const pauseAudio = async () => {
    await AudioService.pause();
    setIsPlaying(false);
  };

  const replayAudio = async () => {
    setIsPlaying(true);
    const success = await AudioService.replay(() => {
      setIsPlaying(false);
    });
    if (!success) {
      setIsPlaying(false);
    }
  };

  const handleAudioPress = () => {
    if (isPlaying) {
      pauseAudio();
    } else if (hasPlayed) {
      replayAudio();
    } else {
      playAudio();
    }
  };

  // ✅ FIXED: Get image source from registry
  const getImageSource = () => {
    if (step.image && IMAGE_ASSETS[step.image]) {
      return IMAGE_ASSETS[step.image];
    }
    return null;
  };

  const imageSource = getImageSource();

  return (
    <View style={[styles.container, isActive && styles.activeContainer]}>
      {/* Step Header */}
      <View style={styles.header}>
        <View style={styles.stepNumberContainer}>
          <Text style={styles.stepNumber}>{stepNumber}</Text>
        </View>
        <View style={styles.stepInfo}>
          <Text style={styles.stepTitle}>{title}</Text>
          <Text style={styles.stepCounter}>
            {t('step')} {stepNumber} {t('of')} {totalSteps}
          </Text>
        </View>

        {/* Audio Control */}
        {step.audio && (
          <TouchableOpacity
            style={styles.audioButton}
            onPress={handleAudioPress}
            accessibilityLabel={isPlaying ? t('pauseAudio') : t('playAudio')}
          >
            <MaterialCommunityIcons
              name={isPlaying ? 'pause-circle' : hasPlayed ? 'replay' : 'play-circle'}
              size={40}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Step Content */}
      <View style={styles.content}>
        {/* ✅ FIXED: Actual Image Rendering */}
        {imageSource && !imageError ? (
          <Image
            source={imageSource}
            style={styles.stepImage}
            resizeMode="contain"
            onError={() => {
              console.warn(`Failed to load image: ${step.image}`);
              setImageError(true);
            }}
            accessibilityLabel={t('stepImage')}
          />
        ) : (
          /* Fallback placeholder when image is missing */
          <View style={styles.imagePlaceholder}>
            <MaterialCommunityIcons
              name={imageError ? "image-broken" : "image"}
              size={48}
              color={COLORS.textMuted}
            />
            <Text style={styles.imagePlaceholderText}>
              {imageError ? t('imageLoadError') : step.image}
            </Text>
          </View>
        )}

        <Text style={styles.description}>{description}</Text>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, stepNumber === 1 && styles.navButtonDisabled]}
          onPress={onPrevious}
          disabled={stepNumber === 1}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={24}
            color={stepNumber === 1 ? COLORS.textMuted : COLORS.primary}
          />
          <Text style={[styles.navText, stepNumber === 1 && styles.navTextDisabled]}>
            {t('previousStep')}
          </Text>
        </TouchableOpacity>

        <View style={styles.progressDots}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index + 1 === stepNumber && styles.dotActive,
                index + 1 < stepNumber && styles.dotCompleted,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.navButton,
            stepNumber === totalSteps && styles.navButtonComplete,
          ]}
          onPress={stepNumber === totalSteps ? onComplete : onNext}
        >
          <Text
            style={[
              styles.navText,
              stepNumber === totalSteps && styles.navTextComplete,
            ]}
          >
            {stepNumber === totalSteps ? t('close') : t('nextStep')}
          </Text>
          {stepNumber !== totalSteps && (
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={COLORS.primary}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.base,
    ...SHADOWS.base,
  },
  activeContainer: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    ...SHADOWS.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  stepNumberContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  stepNumber: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textInverse,
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  stepCounter: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textMuted,
  },
  audioButton: {
    padding: SPACING.sm,
  },
  content: {
    marginBottom: SPACING.lg,
  },
  // ✅ FIXED: Added actual image styles
  stepImage: {
    width: '100%',
    height: 200,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.surface,
  },
  imagePlaceholder: {
    height: 180,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  imagePlaceholderText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textMuted,
    marginTop: SPACING.sm,
  },
  description: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textPrimary,
    lineHeight: 28,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    paddingTop: SPACING.lg,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonComplete: {
    backgroundColor: COLORS.success,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.lg,
  },
  navText: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.primary,
    marginHorizontal: SPACING.xs,
  },
  navTextDisabled: {
    color: COLORS.textMuted,
  },
  navTextComplete: {
    color: COLORS.textInverse,
  },
  progressDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
    width: 24,
  },
  dotCompleted: {
    backgroundColor: COLORS.success,
  },
});

export default StepCard;