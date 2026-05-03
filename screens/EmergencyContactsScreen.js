/**
 * RapidAid - EmergencyContactsScreen
 * Manage offline emergency contacts
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView,
  Alert,
  Modal,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS } from '../styles/theme';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { validatePhoneNumber, callEmergencyNumber, generateId } from '../utils/helpers';
import DataService from '../services/dataService';

const EmergencyContactsScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const { emergencyContacts, setEmergencyContacts } = useApp();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    relationship: '',
  });

  const emergencyNumbers = DataService.getEmergencyNumbers();

  const handleAddContact = () => {
    setEditingContact(null);
    setForm({ name: '', phone: '', relationship: '' });
    setModalVisible(true);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setForm({ ...contact });
    setModalVisible(true);
  };

  const handleDeleteContact = (contactId) => {
    Alert.alert(
      t('areYouSure'),
      t('deleteContactConfirm'),
      [
        { text: t('cancel'), style: 'cancel' },
        { 
          text: t('delete'), 
          style: 'destructive',
          onPress: async () => {
            const updated = emergencyContacts.filter(c => c.id !== contactId);
            await setEmergencyContacts(updated);
          }
        },
      ]
    );
  };

  const handleSaveContact = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      Alert.alert(t('fillAllFields'));
      return;
    }

    if (!validatePhoneNumber(form.phone)) {
      Alert.alert(t('invalidPhone'));
      return;
    }

    let updated;
    if (editingContact) {
      updated = emergencyContacts.map(c => 
        c.id === editingContact.id ? { ...form, id: editingContact.id } : c
      );
    } else {
      updated = [...emergencyContacts, { ...form, id: generateId() }];
    }

    await setEmergencyContacts(updated);
    setModalVisible(false);
    Alert.alert(t('contactSaved'));
  };

  const renderContactCard = (contact, isSystem = false) => (
    <View key={contact.id || contact.number} style={styles.contactCard}>
      <View style={styles.contactInfo}>
        <View style={[styles.contactIcon, isSystem && { backgroundColor: COLORS.emergency + '15' }]}>
          <MaterialCommunityIcons 
            name={isSystem ? contact.icon || 'phone' : 'account'} 
            size={24} 
            color={isSystem ? contact.color || COLORS.primary : COLORS.primary} 
          />
        </View>
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>{contact.name}</Text>
          <Text style={styles.contactPhone}>{contact.phone || contact.number}</Text>
          {contact.relationship && (
            <Text style={styles.contactRelation}>{contact.relationship}</Text>
          )}
          {contact.description && (
            <Text style={styles.contactDescription}>{contact.description}</Text>
          )}
        </View>
      </View>
      <View style={styles.contactActions}>
        <TouchableOpacity 
          style={styles.callButton}
          onPress={() => callEmergencyNumber(contact.phone || contact.number)}
        >
          <MaterialCommunityIcons name="phone" size={20} color={COLORS.success} />
        </TouchableOpacity>
        {!isSystem && (
          <>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleEditContact(contact)}
            >
              <MaterialCommunityIcons name="pencil" size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleDeleteContact(contact.id)}
            >
              <MaterialCommunityIcons name="delete" size={18} color={COLORS.error} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.textInverse} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('emergencyContacts')}</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddContact}
        >
          <MaterialCommunityIcons name="plus" size={24} color={COLORS.textInverse} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* India Emergency Numbers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('emergencyServices')}</Text>
          {emergencyNumbers.map((num) => renderContactCard(num, true))}
        </View>

        {/* Personal Contacts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Contacts</Text>
          {emergencyContacts.length > 0 ? (
            emergencyContacts.map((contact) => renderContactCard(contact))
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="account-plus" size={48} color={COLORS.textMuted} />
              <Text style={styles.emptyText}>No personal contacts added</Text>
              <Text style={styles.emptySubText}>Tap + to add emergency contacts</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add/Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingContact ? 'Edit Contact' : t('addContact')}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t('name')}</Text>
                <TextInput
                  style={styles.input}
                  value={form.name}
                  onChangeText={(text) => setForm({ ...form, name: text })}
                  placeholder="Enter name"
                  placeholderTextColor={COLORS.textMuted}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t('phone')}</Text>
                <TextInput
                  style={styles.input}
                  value={form.phone}
                  onChangeText={(text) => setForm({ ...form, phone: text })}
                  placeholder="10 digit mobile number"
                  placeholderTextColor={COLORS.textMuted}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t('relationship')}</Text>
                <TextInput
                  style={styles.input}
                  value={form.relationship}
                  onChangeText={(text) => setForm({ ...form, relationship: text })}
                  placeholder="e.g., Father, Wife, Friend"
                  placeholderTextColor={COLORS.textMuted}
                />
              </View>
            </View>

            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSaveContact}
            >
              <Text style={styles.saveButtonText}>{t('save')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  },
  addButton: {
    padding: SPACING.sm,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.base,
    paddingBottom: SPACING['4xl'],
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  contactCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.base,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...SHADOWS.sm,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactDetails: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  contactName: {
    fontSize: FONTS.sizes.base,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  contactPhone: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  contactRelation: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
  },
  contactDescription: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
  },
  contactActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.success + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
  },
  emptySubText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlayDark,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    paddingBottom: SPACING['3xl'],
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  modalTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  modalBody: {
    gap: SPACING.md,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  inputLabel: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: FONTS.sizes.base,
    color: COLORS.textPrimary,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  saveButtonText: {
    color: COLORS.textInverse,
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
  },
});

export default EmergencyContactsScreen;
