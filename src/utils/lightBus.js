let lightsOn = false;
const listeners = new Set();

export const getLightsOn = () => lightsOn;

export const toggleLights = () => {
    lightsOn = !lightsOn;
    listeners.forEach((cb) => cb(lightsOn));
};

export const subscribeLights = (cb) => {
    listeners.add(cb);
    return () => listeners.delete(cb);
};
