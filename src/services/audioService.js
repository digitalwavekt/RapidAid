/**
 * RapidAid - Audio Service (FIXED)
 * Manages pre-recorded voice guidance using Expo AV
 */

import { Audio } from 'expo-av';
import { Platform } from 'react-native';

// 🎵 AUDIO ASSET REGISTRY - Map audio filenames to require() statements
// Add all your audio files here as you add them to assets/audio/
const AUDIO_ASSETS = {
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

    // Add more audio files here...
};

class AudioService {
    constructor() {
        this.sound = null;
        this.isPlaying = false;
        this.currentStep = null;
        this.onPlaybackStatusUpdate = null;
    }

    /**
     * Initialize audio session
     */
    async initialize() {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                staysActiveInBackground: true,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                playThroughEarpieceAndroid: false,
            });
            return true;
        } catch (error) {
            console.error('Audio initialization error:', error);
            return false;
        }
    }

    /**
     * Load and play audio for a step
     * @param {string} audioFileName - Name of audio file in assets/audio
     * @param {Function} onComplete - Callback when playback completes
     */
    async playStepAudio(audioFileName, onComplete = null) {
        try {
            // Stop any currently playing audio
            await this.stop();

            const audioSource = this.getAudioSource(audioFileName);

            // ✅ FIX: Check if audio source exists
            if (!audioSource) {
                console.warn(`Audio file not found: ${audioFileName}`);
                return false;
            }

            const { sound } = await Audio.Sound.createAsync(
                audioSource,
                { shouldPlay: true },
                (status) => this.handlePlaybackStatus(status, onComplete)
            );

            this.sound = sound;
            this.isPlaying = true;
            this.currentStep = audioFileName;

            return true;
        } catch (error) {
            console.error('Audio playback error:', error);
            return false;
        }
    }

    /**
     * ✅ FIXED: Get audio source based on file name
     * Maps to actual bundled audio files using require()
     */
    getAudioSource(audioFileName) {
        // Return the required asset if it exists
        if (AUDIO_ASSETS[audioFileName]) {
            return AUDIO_ASSETS[audioFileName];
        }

        // If not found, log warning and return null
        console.warn(`Audio asset not registered: ${audioFileName}`);
        return null;
    }

    /**
     * Handle playback status updates
     */
    handlePlaybackStatus(status, onComplete) {
        if (status.didJustFinish) {
            this.isPlaying = false;
            if (onComplete) onComplete();
        }

        if (this.onPlaybackStatusUpdate) {
            this.onPlaybackStatusUpdate(status);
        }
    }

    /**
     * Pause current playback
     */
    async pause() {
        try {
            if (this.sound) {
                await this.sound.pauseAsync();
                this.isPlaying = false;
            }
            return true;
        } catch (error) {
            console.error('Audio pause error:', error);
            return false;
        }
    }

    /**
     * Resume playback
     */
    async resume() {
        try {
            if (this.sound) {
                await this.sound.playAsync();
                this.isPlaying = true;
            }
            return true;
        } catch (error) {
            console.error('Audio resume error:', error);
            return false;
        }
    }

    /**
     * Stop and unload audio
     */
    async stop() {
        try {
            if (this.sound) {
                await this.sound.stopAsync();
                await this.sound.unloadAsync();
                this.sound = null;
            }
            this.isPlaying = false;
            this.currentStep = null;
            return true;
        } catch (error) {
            console.error('Audio stop error:', error);
            return false;
        }
    }

    /**
     * Replay current audio
     */
    async replay(onComplete = null) {
        if (this.currentStep) {
            return this.playStepAudio(this.currentStep, onComplete);
        }
        return false;
    }

    /**
     * Get current playback position
     */
    async getPosition() {
        try {
            if (this.sound) {
                const status = await this.sound.getStatusAsync();
                return status.positionMillis || 0;
            }
            return 0;
        } catch (error) {
            return 0;
        }
    }

    /**
     * Check if audio is currently playing
     */
    getIsPlaying() {
        return this.isPlaying;
    }

    /**
     * Cleanup resources
     */
    async cleanup() {
        await this.stop();
        await Audio.setAudioModeAsync({
            staysActiveInBackground: false,
        });
    }
}

// Export singleton instance
export default new AudioService();