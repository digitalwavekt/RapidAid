/**
 * RapidAid - Storage Service
 * AsyncStorage wrapper for offline data persistence
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';

class StorageService {
  /**
   * Save data to AsyncStorage
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   */
  static async setItem(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      console.error(`Storage setItem error [${key}]:`, error);
      return false;
    }
  }

  /**
   * Get data from AsyncStorage
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if not found
   * @returns {any} Stored value or default
   */
  static async getItem(key, defaultValue = null) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
    } catch (error) {
      console.error(`Storage getItem error [${key}]:`, error);
      return defaultValue;
    }
  }

  /**
   * Remove data from AsyncStorage
   * @param {string} key - Storage key
   */
  static async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Storage removeItem error [${key}]:`, error);
      return false;
    }
  }

  /**
   * Clear all app data
   */
  static async clearAll() {
    try {
      const keys = Object.values(STORAGE_KEYS);
      await AsyncStorage.multiRemove(keys);
      return true;
    } catch (error) {
      console.error('Storage clearAll error:', error);
      return false;
    }
  }

  // Medical Profile
  static async saveMedicalProfile(profile) {
    return this.setItem(STORAGE_KEYS.MEDICAL_PROFILE, profile);
  }

  static async getMedicalProfile() {
    return this.getItem(STORAGE_KEYS.MEDICAL_PROFILE, {});
  }

  // Emergency Contacts
  static async saveEmergencyContacts(contacts) {
    return this.setItem(STORAGE_KEYS.EMERGENCY_CONTACTS, contacts);
  }

  static async getEmergencyContacts() {
    return this.getItem(STORAGE_KEYS.EMERGENCY_CONTACTS, []);
  }

  // Language
  static async saveLanguage(language) {
    return this.setItem(STORAGE_KEYS.LANGUAGE, language);
  }

  static async getLanguage() {
    return this.getItem(STORAGE_KEYS.LANGUAGE, 'en');
  }

  // Settings
  static async saveSettings(settings) {
    return this.setItem(STORAGE_KEYS.SETTINGS, settings);
  }

  static async getSettings() {
    return this.getItem(STORAGE_KEYS.SETTINGS, {});
  }

  // Disclaimer
  static async setDisclaimerAccepted(accepted) {
    return this.setItem(STORAGE_KEYS.DISCLAIMER_ACCEPTED, accepted);
  }

  static async isDisclaimerAccepted() {
    return this.getItem(STORAGE_KEYS.DISCLAIMER_ACCEPTED, false);
  }

  // First Launch
  static async setFirstLaunchComplete() {
    return this.setItem(STORAGE_KEYS.FIRST_LAUNCH, false);
  }

  static async isFirstLaunch() {
    const value = await this.getItem(STORAGE_KEYS.FIRST_LAUNCH, true);
    return value;
  }
}

export default StorageService;
