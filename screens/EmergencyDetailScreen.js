/**
 * RapidAid - EmergencyDetailScreen (FIXED)
 * Shows emergency details: symptoms, severity, dos/donts, step images, step audio
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS } from '../styles/theme';
import { useLanguage } from '../context/LanguageContext';
import DataService from '../services/dataService';
import AudioService from '../services/audioService';  // ✅ FIXED: Import default singleton

import { getLocalizedText, getSeverityColor } from '../utils/helpers';
import SeverityBadge from '../components/SeverityBadge';
import DosDonts from '../components/DosDonts';
import EmergencyButton from '../components/EmergencyButton';
import FloatingEmergencyButton from '../components/FloatingEmergencyButton';

// 🖼️ IMAGE ASSET REGISTRY - Same as StepCard
const IMAGE_ASSETS = {
  'step1_call': require('../../assets/images/steps/step1_call.png'),
  'step2_comfort': require('../../assets/images/steps/step2_comfort.png'),
  'step3_aspirin': require('../../assets/images/steps/step3_aspirin.png'),
  'step4_breathing': require('../../assets/images/steps/step4_breathing.png'),
  'step5_calm': require('../../assets/images/steps/step5_calm.png'),
  'step1_calm': require('../../assets/images/steps/step1_calm.png'),
  'step2_remove': require('../../assets/images/steps/step2_remove.png'),
  'step3_position': require('../../assets/images/steps/step3_position.png'),
  'step4_clean': require('../../assets/images/steps/step4_clean.png'),
  'step5_bandage': require('../../assets/images/steps/step5_bandage.png'),
  'step6_ambulance': require('../../assets/images/steps/step6_ambulance.png'),
  'step1_safety': require('../../assets/images/steps/step1_safety.png'),
  'step2_pull': require('../../assets/images/steps/step2_pull.png'),
  'step3_check': require('../../assets/images/steps/step3_check.png'),
  'step4_cpr': require('../../assets/images/steps/step4_cpr.png'),
  'step5_recovery': require('../../assets/images/steps/step5_recovery.png'),
  'step6_monitor': require('../../assets/images/steps/step6_monitor.png'),
};

const EmergencyDetailScreen = ({ route, navigation }) => {
  const { emergencyId } = route.params;
  const { language, t } = useLanguage();

  const emergency = DataService.getEmergencyById(emergencyId);

  const [activeTab, setActiveTab] = useState('symptoms');
  const [playingStep, setPlayingStep] = useState(null);  // ✅ Track which step audio is playing

  if (!emergency) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Emergency not found</Text>
      </SafeAreaView>
    );
  }

  const title = getLocalizedText(emergency.title, language);
  const symptoms = getLocalizedText(emergency.symptoms, language) || [];
  const hospitalTransfer = getLocalizedText(emergency.hospitalTransfer, language);
  const emergencyNumber = emergency.emergencyNumber || emergency.callFirst || '108';

  const tabs = [
    { id: 'symptoms', label: t('symptoms'), icon: 'clipboard-pulse' },
    { id: 'info', label: t('steps'), icon: 'format-list-numbered' },
  ];

  const handleStartGuide = () => {
    navigation.navigate('StepGuide', { emergencyId: emergency.id });
  };

  // ✅ FIXED: Use AudioService singleton instead of non-existent named export
  const handlePlayAudio = async (stepNo) => {
    const step = emergency.steps?.find(s => (s.stepNo || 0) === stepNo);
    if (!step || !step.audio) return;

    // Stop if already playing this step
    if (playingStep === stepNo) {
      await AudioService.stop();
      setPlayingStep(null);
      return;
    }

    setPlayingStep(stepNo);
    const success = await AudioService.playStepAudio(step.audio, () => {
      setPlayingStep(null);  // Reset when done
    });

    if (!success) {
      setPlayingStep(null);
    }
  };

  // ✅ FIXED: Get image source from registry
  const getStepImageSource = (imageName) => {
    if (!imageName) return null;
    return IMAGE_ASSETS[imageName] || null;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.textInverse} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Title Card */}
        <View style={styles.titleCard}>
          <View style={styles.titleRow}>
            <SeverityBadge severity={emergency.severity} />
            <View style={styles.titleInfo}>
              <Text style={styles.title}>{title}</Text>
              {!!emergency.estimatedTime && (
                <Text style={styles.estimatedTime}>
                  <MaterialCommunityIcons name="clock-outline" size={14} color={COLORS.textMuted} />
                  {' '}{emergency.estimatedTime}
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* Emergency Call Card */}
        <View style={styles.callCard}>
          <View style={styles.callInfo}>
            <MaterialCommunityIcons name="phone-alert" size={24} color={COLORS.emergency} />
            <View style={styles.callTextContainer}>
              <Text style={styles.callLabel}>{t('emergencyNumber')}</Text>
              <Text style={styles.callNumber}>{emergencyNumber}</Text>
            </View>
          </View>
          <EmergencyButton number={emergencyNumber} />
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.tabActive]}
              onPress={() => setActiveTab(tab.id)}
            >
              <MaterialCommunityIcons
                name={tab.icon}
                size={18}
                color={activeTab === tab.id ? COLORS.primary : COLORS.textMuted}
              />
              <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Symptoms Tab */}
        {activeTab === 'symptoms' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>{t('symptoms')}</Text>

            {symptoms.map((symptom, index) => (
              <View key={index} style={styles.symptomItem}>
                <View style={[styles.symptomBullet, { backgroundColor: getSeverityColor(emergency.severity) }]} />
                <Text style={styles.symptomText}>{symptom}</Text>
              </View>
            ))}

            {!!hospitalTransfer && (
              <View style={styles.hospitalCard}>
                <View style={styles.hospitalHeader}>
                  <MaterialCommunityIcons name="hospital-building" size={20} color={COLORS.info} />
                  <Text style={styles.hospitalTitle}>{t('hospitalTransfer')}</Text>
                </View>
                <Text style={styles.hospitalText}>{hospitalTransfer}</Text>
              </View>
            )}

            {/* Dos and Don'ts */}
            <DosDonts dos={emergency.dos} donts={emergency.donts} />
          </View>
        )}

        {/* Steps Tab */}
        {activeTab === 'info' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>{t('steps')}</Text>

            {emergency.steps?.map((step, index) => {
              const stepNo = step.stepNo || index + 1;
              const imageSource = getStepImageSource(step.image);  // ✅ FIXED: Use registry
              const isPlaying = playingStep === stepNo;

              return (
                <View key={stepNo} style={styles.stepPreview}>
                  <View style={styles.stepTopRow}>
                    <View style={styles.stepPreviewNumber}>
                      <Text style={styles.stepPreviewNumberText}>{stepNo}</Text>
                    </View>
                    <View style={styles.stepPreviewContent}>
                      <Text style={styles.stepPreviewTitle}>
                        {getLocalizedText(step.title, language)}
                      </Text>
                      <Text style={styles.stepPreviewDesc}>
                        {getLocalizedText(step.description, language)}
                      </Text>
                    </View>
                  </View>

                  {/* ✅ FIXED: Actual Image Rendering */}
                  {imageSource && (
                    <Image
                      source={imageSource}
                      style={styles.stepImage}
                      resizeMode="contain"
                      onError={() => console.warn(`Failed to load image: ${step.image}`)}
                    />
                  )}

                  {/* ✅ FIXED: Audio Button with proper state */}
                  {step.audio && (
                    <TouchableOpacity
                      style={[styles.audioButton, isPlaying && { backgroundColor: COLORS.emergency }]}
                      onPress={() => handlePlayAudio(stepNo)}
                      accessibilityRole="button"
                    >
                      <MaterialCommunityIcons
                        name={isPlaying ? 'stop' : 'play'}
                        size={20}
                        color={COLORS.textInverse}
                      />
                      <Text style={styles.audioButtonText}>
                        {isPlaying ? t('stopAudio') : t('playAudio')}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* Start Guide Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.startButton} onPress={handleStartGuide}>
          <MaterialCommunityIcons name="play-circle" size={24} color={COLORS.textInverse} />
          <Text style={styles.startButtonText}>{t('startGuide')}</Text>
        </TouchableOpacity>
      </View>

      <FloatingEmergencyButton />
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
  headerTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textInverse,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: SPACING.md,
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.base,
    paddingBottom: SPACING['4xl'],
  },
  titleCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.base,
    ...SHADOWS.base,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleInfo: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  title: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  estimatedTime: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textMuted,
  },
  callCard: {
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
  callInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  callTextContainer: {
    marginLeft: SPACING.md,
  },
  callLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  callNumber: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.emergency,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xs,
    marginBottom: SPACING.base,
    ...SHADOWS.sm,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
  },
  tabActive: {
    backgroundColor: COLORS.emergencyLight,
  },
  tabText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  tabTextActive: {
    color: COLORS.primary,
  },
  tabContent: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.base,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  symptomBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.md,
  },
  symptomText: {
    fontSize: FONTS.sizes.base,
    color: COLORS.textPrimary,
    flex: 1,
    lineHeight: 22,
  },
  hospitalCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.info,
  },
  hospitalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  hospitalTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    color: COLORS.info,
    marginLeft: SPACING.sm,
  },
  hospitalText: {
    fontSize: FONTS.sizes.base,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  stepPreview: {
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  stepTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  stepPreviewNumber: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    marginTop: SPACING.xs,
  },
  stepPreviewNumberText: {
    color: COLORS.textInverse,
    fontWeight: '700',
    fontSize: FONTS.sizes.sm,
  },
  stepPreviewContent: {
    flex: 1,
  },
  stepPreviewTitle: {
    fontSize: FONTS.sizes.base,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  stepPreviewDesc: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    lineHeight: 21,
  },
  stepImage: {
    width: '100%',
    height: 190,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  audioButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.base,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  audioButtonText: {
    color: COLORS.textInverse,
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
  },
  bottomBar: {
    backgroundColor: COLORS.background,
    padding: SPACING.base,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.md,
  },
  startButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  startButtonText: {
    color: COLORS.textInverse,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
  },
  errorText: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.error,
    textAlign: 'center',
    marginTop: SPACING.xl,
  },
});

export default EmergencyDetailScreen;