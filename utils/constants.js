/**
 * RapidAid - Application Constants
 */

export const APP_CONFIG = {
  NAME: 'RapidAid',
  VERSION: '1.0.0',
  BUILD: 1,
  DEVELOPED_FOR: 'India',
  OFFLINE_FIRST: true,
};

export const STORAGE_KEYS = {
  LANGUAGE: '@rapidaid_language',
  MEDICAL_PROFILE: '@rapidaid_medical_profile',
  EMERGENCY_CONTACTS: '@rapidaid_emergency_contacts',
  DISCLAIMER_ACCEPTED: '@rapidaid_disclaimer_accepted',
  FIRST_LAUNCH: '@rapidaid_first_launch',
  SETTINGS: '@rapidaid_settings',
  FAVORITES: '@rapidaid_favorites',
};

export const EMERGENCY_NUMBERS = {
  AMBULANCE: '108',
  EMERGENCY: '112',
  POLICE: '100',
  FIRE: '101',
  WOMEN_HELPLINE: '181',
  CHILD_HELPLINE: '1098',
  SUICIDE_PREVENTION: '9152987821',
  DISASTER_MANAGEMENT: '1078',
  ROAD_ACCIDENT: '1073',
  SENIOR_CITIZEN: '14567',
};

export const SEVERITY_LEVELS = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};

export const SEVERITY_LABELS = {
  critical: 'CRITICAL',
  high: 'HIGH',
  medium: 'MEDIUM',
  low: 'LOW',
};

export const LANGUAGES = {
  ENGLISH: 'en',
  HINDI: 'hi',
};

export const LANGUAGE_NAMES = {
  en: 'English',
  hi: 'हिंदी',
};

export const CATEGORIES = [
  { id: 'medical', nameEn: 'Medical', nameHi: 'चिकित्सा', icon: 'medical-bag', color: '#DC2626' },
  { id: 'accident', nameEn: 'Accident & Injury', nameHi: 'दुर्घटना और चोट', icon: 'car-emergency', color: '#F59E0B' },
  { id: 'water', nameEn: 'Water Emergency', nameHi: 'जल आपातकाल', icon: 'waves', color: '#3B82F6' },
  { id: 'burn', nameEn: 'Burn & Chemical', nameHi: 'जलना और रसायन', icon: 'fire', color: '#EF4444' },
  { id: 'poisoning', nameEn: 'Poisoning & Gas', nameHi: 'जहर और गैस', icon: 'skull-crossbones', color: '#7C3AED' },
  { id: 'women-child', nameEn: 'Women & Child', nameHi: 'महिला और बच्चा', icon: 'baby-face', color: '#EC4899' },
  { id: 'environmental', nameEn: 'Environmental', nameHi: 'पर्यावरण', icon: 'sun-thermometer', color: '#F97316' },
  { id: 'disaster', nameEn: 'Disaster', nameHi: 'आपदा', icon: 'alert-octagon', color: '#1F2937' },
  { id: 'special', nameEn: 'Special Cases', nameHi: 'विशेष मामले', icon: 'shield-alert', color: '#059669' },
];

export const DEFAULT_SETTINGS = {
  language: LANGUAGES.ENGLISH,
  autoPlayAudio: true,
  hapticFeedback: true,
  panicModeShortcut: true,
  darkMode: false,
  fontSize: 'normal',
};

export const PANIC_MODE_SHORTCUT = {
  TRIGGER: 'volume_button_press_3_times',
  ACTION: 'call_emergency',
};

export default {
  APP_CONFIG,
  STORAGE_KEYS,
  EMERGENCY_NUMBERS,
  SEVERITY_LEVELS,
  SEVERITY_LABELS,
  LANGUAGES,
  LANGUAGE_NAMES,
  CATEGORIES,
  DEFAULT_SETTINGS,
  PANIC_MODE_SHORTCUT,
};
