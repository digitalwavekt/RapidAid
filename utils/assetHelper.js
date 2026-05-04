/**
 * RapidAid - Asset Helper Utilities
 * Helper functions for loading images and audio assets dynamically
 */

// 🖼️ IMAGE ASSET REGISTRY
// Centralized mapping of image names to require() statements
export const IMAGE_ASSETS = {
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
};

// 🎵 AUDIO ASSET REGISTRY
export const AUDIO_ASSETS = {
    // Heart Attack
    'heart_attack_step1.mp3': require('../../assets/audio/heart_attack_step1.mp3'),
    'heart_attack_step2.mp3': require('../../assets/audio/heart_attack_step2.mp3'),
    'heart_attack_step3.mp3': require('../../assets/audio/heart_attack_step3.mp3'),
    'heart_attack_step4.mp3': require('../../assets/audio/heart_attack_step4.mp3'),
    'heart_attack_step5.mp3': require('../../assets/audio/heart_attack_step5.mp3'),

    // Snake Bite
    'snake_bite_step1.mp3': require('../../assets/audio/snake_bite_step1.mp3'),
    'snake_bite_step2.mp3': require('../../assets/audio/snake_bite_step2.mp3'),
    'snake_bite_step3.mp3': require('../../assets/audio/snake_bite_step3.mp3'),
    'snake_bite_step4.mp3': require('../../assets/audio/snake_bite_step4.mp3'),
    'snake_bite_step5.mp3': require('../../assets/audio/snake_bite_step5.mp3'),
    'snake_bite_step6.mp3': require('../../assets/audio/snake_bite_step6.mp3'),

    // Drowning
    'drowning_step1.mp3': require('../../assets/audio/drowning_step1.mp3'),
    'drowning_step2.mp3': require('../../assets/audio/drowning_step2.mp3'),
    'drowning_step3.mp3': require('../../assets/audio/drowning_step3.mp3'),
    'drowning_step4.mp3': require('../../assets/audio/drowning_step4.mp3'),
    'drowning_step5.mp3': require('../../assets/audio/drowning_step5.mp3'),
    'drowning_step6.mp3': require('../../assets/audio/drowning_step6.mp3'),
};

/**
 * Get image source by name
 * @param {string} imageName - Name of the image from JSON data
 * @returns {object|null} Image source for React Native Image component
 */
export const getImageSource = (imageName) => {
    if (!imageName) return null;
    return IMAGE_ASSETS[imageName] || null;
};

/**
 * Get audio source by filename
 * @param {string} audioFileName - Name of the audio file from JSON data
 * @returns {object|null} Audio source for Expo AV
 */
export const getAudioSource = (audioFileName) => {
    if (!audioFileName) return null;
    return AUDIO_ASSETS[audioFileName] || null;
};

/**
 * Check if image asset exists
 * @param {string} imageName - Image name to check
 * @returns {boolean}
 */
export const hasImageAsset = (imageName) => {
    return !!IMAGE_ASSETS[imageName];
};

/**
 * Check if audio asset exists
 * @param {string} audioFileName - Audio filename to check
 * @returns {boolean}
 */
export const hasAudioAsset = (audioFileName) => {
    return !!AUDIO_ASSETS[audioFileName];
};