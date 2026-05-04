import imageMapFile from "../data/image_map.json";
import audioMapFile from "../data/audio_map.json";
import { imageAssets, audioAssets } from "./assetRegistry";

export const getStepImage = (emergencyId, stepNo) => {
    const path = imageMapFile.image_map?.[emergencyId]?.[`step_${stepNo}`];
    return imageAssets[path] || null;
};

export const getStepAudio = (emergencyId, stepNo, language = "hi") => {
    const path = audioMapFile.audio_map?.[emergencyId]?.[`step_${stepNo}`]?.[language];
    return audioAssets[path] || null;
};