/**
 * RapidAid - Helper Utilities
 * Common utility functions used across the app
 */

import { Linking, Platform, Alert } from 'react-native';
import { COLORS } from '../styles/theme';

/**
 * Make a phone call to emergency number
 * @param {string} phoneNumber - Number to call
 */
export const callEmergencyNumber = async (phoneNumber) => {
  const url = Platform.select({
    ios: `telprompt:${phoneNumber}`,
    android: `tel:${phoneNumber}`,
  });

  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Phone call not supported on this device');
    }
  } catch (error) {
    console.error('Failed to make call:', error);
    Alert.alert('Error', 'Failed to initiate call');
  }
};

/**
 * Get color based on severity level
 * @param {string} severity - Severity level
 * @returns {string} Color code
 */
export const getSeverityColor = (severity) => {
  const severityMap = {
    critical: COLORS.critical,
    high: COLORS.high,
    medium: COLORS.medium,
    low: COLORS.low,
  };
  return severityMap[severity?.toLowerCase()] || COLORS.medium;
};

/**
 * Get localized text based on current language
 * @param {object} textObj - Object with language keys
 * @param {string} language - Current language code
 * @returns {string} Localized text
 */
export const getLocalizedText = (textObj, language = 'en') => {
  if (!textObj) return '';
  if (typeof textObj === 'string') return textObj;
  return textObj[language] || textObj['en'] || Object.values(textObj)[0] || '';
};

/**
 * Format phone number for display
 * @param {string} phone - Raw phone number
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  if (cleaned.length > 10) {
    return `+${cleaned.slice(0, cleaned.length - 10)} ${cleaned.slice(-10, -5)} ${cleaned.slice(-5)}`;
  }
  return phone;
};

/**
 * Validate phone number (Indian format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Is valid
 */
export const validatePhoneNumber = (phone) => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phone.replace(/\D/g, ''));
};

/**
 * Debounce function for search input
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Get emergency number based on type
 * @param {string} type - Emergency type
 * @returns {string} Emergency number
 */
export const getEmergencyNumber = (type = 'ambulance') => {
  const numbers = {
    ambulance: '108',
    emergency: '112',
    police: '100',
    fire: '101',
    women: '181',
    child: '1098',
    suicide: '9152987821',
    disaster: '1078',
    road: '1073',
    senior: '14567',
  };
  return numbers[type] || '108';
};

/**
 * Check if object is empty
 * @param {object} obj - Object to check
 * @returns {boolean} Is empty
 */
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Max length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Get step completion percentage
 * @param {number} currentStep - Current step number
 * @param {number} totalSteps - Total steps
 * @returns {number} Percentage
 */
export const getProgressPercentage = (currentStep, totalSteps) => {
  if (totalSteps === 0) return 0;
  return Math.round((currentStep / totalSteps) * 100);
};

/**
 * Deep clone an object
 * @param {object} obj - Object to clone
 * @returns {object} Cloned object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export default {
  callEmergencyNumber,
  getSeverityColor,
  getLocalizedText,
  formatPhoneNumber,
  validatePhoneNumber,
  debounce,
  getEmergencyNumber,
  isEmpty,
  generateId,
  truncateText,
  getProgressPercentage,
  deepClone,
};
