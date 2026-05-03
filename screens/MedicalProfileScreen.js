/**
 * RapidAid - MedicalProfileScreen
 * Offline medical profile for emergency responders
 */

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS } from '../styles/theme';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'];

const MedicalProfileScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const { medicalProfile, setMedicalProfile } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: '',
    age: '',
    bloodGroup: '',
    allergies: '',
    medications: '',
    medicalConditions: '',
    emergencyContact: '',
    emergencyContactName: '',
    ...medicalProfile,
  });

  const handleSave = async () => {
    await setMedicalProfile(form);
    setIsEditing(false);
    Alert.alert(t('profileSaved'));
  };

  const renderField = (label, value, icon, editable = true) => (
    <View style={styles.fieldContainer}>
      <View style={styles.fieldLabelRow}>
        <MaterialCommunityIcons name={icon} size={18} color={COLORS.primary} />
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>
      {isEditing && editable ? (
        <TextInput
          style={styles.input}
          value={form[value]}
          onChangeText={(text) => setForm({ ...form, [value]: text })}
          placeholder={`Enter ${label.toLowerCase()}`}
          placeholderTextColor={COLORS.textMuted}
          multiline={value === 'allergies' || value === 'medications' || value === 'medicalConditions'}
          numberOfLines={value === 'allergies' || value === 'medications' || value === 'medicalConditions' ? 3 : 1}
        />
      ) : (
        <Text style={styles.fieldValue}>
          {form[value] || 'Not specified'}
        </Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.textInverse} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('medicalProfile')}</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            <MaterialCommunityIcons 
              name={isEditing ? 'check' : 'pencil'} 
              size={24} 
              color={COLORS.textInverse} 
            />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Info Banner */}
          <View style={styles.infoBanner}>
            <MaterialCommunityIcons name="information" size={20} color={COLORS.info} />
            <Text style={styles.infoText}>
              This information can be shown to emergency responders. Keep it updated.
            </Text>
          </View>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.avatar}>
                <MaterialCommunityIcons name="account" size={40} color={COLORS.textInverse} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{form.name || 'Your Name'}</Text>
                <Text style={styles.profileDetail}>
                  {form.age ? `${form.age} years` : 'Age not set'}
                </Text>
              </View>
            </View>
          </View>

          {/* Blood Group Selector */}
          {isEditing && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{t('bloodGroup')}</Text>
              <View style={styles.bloodGroupGrid}>
                {BLOOD_GROUPS.map((group) => (
                  <TouchableOpacity
                    key={group}
                    style={[
                      styles.bloodGroupButton,
                      form.bloodGroup === group && styles.bloodGroupButtonActive,
                    ]}
                    onPress={() => setForm({ ...form, bloodGroup: group })}
                  >
                    <Text style={[
                      styles.bloodGroupText,
                      form.bloodGroup === group && styles.bloodGroupTextActive,
                    ]}>
                      {group}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Fields */}
          <View style={styles.card}>
            {renderField('Full Name', 'name', 'account')}
            {renderField('Age', 'age', 'calendar')}
            {!isEditing && renderField('Blood Group', 'bloodGroup', 'water')}
            {renderField('Allergies', 'allergies', 'alert-circle')}
            {renderField('Current Medications', 'medications', 'pill')}
            {renderField('Medical Conditions', 'medicalConditions', 'heart-pulse')}
          </View>

          {/* Emergency Contact */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Emergency Contact</Text>
            {renderField('Contact Name', 'emergencyContactName', 'account-heart')}
            {renderField('Contact Phone', 'emergencyContact', 'phone')}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
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
  },
  editButton: {
    padding: SPACING.sm,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.base,
    paddingBottom: SPACING['4xl'],
  },
  infoBanner: {
    backgroundColor: COLORS.info + '15',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.base,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.info,
  },
  infoText: {
    flex: 1,
    fontSize: FONTS.sizes.sm,
    color: COLORS.info,
    marginLeft: SPACING.sm,
    lineHeight: 20,
  },
  profileCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.base,
    ...SHADOWS.base,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  profileName: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  profileDetail: {
    fontSize: FONTS.sizes.base,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.base,
    ...SHADOWS.base,
  },
  cardTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  fieldContainer: {
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  fieldLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  fieldLabel: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginLeft: SPACING.sm,
  },
  fieldValue: {
    fontSize: FONTS.sizes.base,
    color: COLORS.textPrimary,
    lineHeight: 22,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: FONTS.sizes.base,
    color: COLORS.textPrimary,
    textAlignVertical: 'top',
  },
  bloodGroupGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  bloodGroupButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    minWidth: 60,
    alignItems: 'center',
  },
  bloodGroupButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  bloodGroupText: {
    fontSize: FONTS.sizes.base,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  bloodGroupTextActive: {
    color: COLORS.textInverse,
  },
});

export default MedicalProfileScreen;
