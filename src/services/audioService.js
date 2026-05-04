import { Audio } from "expo-av";

let currentSound = null;

export const playStepAudio = async (audioSource) => {
    try {
        if (!audioSource) return;

        if (currentSound) {
            await currentSound.stopAsync();
            await currentSound.unloadAsync();
            currentSound = null;
        }

        const { sound } = await Audio.Sound.createAsync(audioSource);
        currentSound = sound;

        await currentSound.playAsync();
    } catch (error) {
        console.log("Audio play error:", error);
    }
};

export const stopStepAudio = async () => {
    try {
        if (currentSound) {
            await currentSound.stopAsync();
            await currentSound.unloadAsync();
            currentSound = null;
        }
    } catch (error) {
        console.log("Audio stop error:", error);
    }
};