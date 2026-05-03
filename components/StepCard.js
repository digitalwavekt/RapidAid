/**
 * RapidAid - StepCard Component
 * Displays individual emergency step with audio controls
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS } from '../styles/theme';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedText } from '../utils/helpers';
import AudioService from '../services/audioService';

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
    await AudioService.playStepAudio(step.audio, () => {
      setIsPlaying(false);
    });
  };

  const pauseAudio = async () => {
    await AudioService.pause();
    setIsPlaying(false);
  };

  const replayAudio = async () => {
    setIsPlaying(true);
    await AudioService.replay(() => {
      setIsPlaying(false);
    });
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
            accessibilityLabel={isPlaying ? 'Pause audio' : 'Play audio'}
          >
            <MaterialCommunityIcons 
              name={isPlaying ? 'pause-circle' : hasPlayed ? 'replay' : 'play-circle'} 
              size={36} 
              color={COLORS.primary} 
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Step Content */}
      <View style={styles.content}>
        {/* Placeholder for step image/animation */}
        <View style={styles.imagePlaceholder}>
          <MaterialCommunityIcons 
            name="image-outline" 
            size={48} 
            color={COLORS.textMuted} 
          />
          <Text style={styles.imagePlaceholderText}>
            {step.image}
          </Text>
        </View>

        <Text style={styles.description}>{description}</Text>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, stepNumber === 1 && styles.navButtonDisabled]}
          onPress={onPrevious}
          disabled={stepNumber === 1}
          accessibilityLabel="Previous step"
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
          style={[styles.navButton, stepNumber === totalSteps && styles.navButtonComplete]}
          onPress={stepNumber === totalSteps ? onComplete : onNext}
          accessibilityLabel={stepNumber === totalSteps ? 'Complete guide' : 'Next step'}
        >
          <Text style={[styles.navText, stepNumber === totalSteps && styles.navTextComplete]}>
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
