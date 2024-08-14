import { useControls } from "leva";

// Hook for Skull Model
export function useSkullControls() {
  return useControls("Default Model", {
    scaleX: { value: 1, min: 0, max: 2, step: 0.05 },
    scaleY: { value: 1, min: 0, max: 2, step: 0.05 },
    scaleZ: { value: 1, min: 0, max: 2, step: 0.05 },
    offsetX: { value: 0, min: -10, max: 10, step: 0.1 },
    offsetY: { value: 4, min: -10, max: 10, step: 0.1 },
    offsetZ: { value: 0, min: -10, max: 10, step: 0.1 },
    opacity: { value: 1, min: 0, max: 1, step: 0.01 },
  });
}
// Hook for import Model
export function useModelControls() {
  return useControls("Import Model", {
    scaleX: { value: 13.5, min: 0, max: 200, step: 0.2 },
    scaleY: { value: 13.5, min: 0, max: 200, step: 0.2 },
    scaleZ: { value: 13.5, min: 0, max: 200, step: 0.2 },
    offsetX: { value: 0, min: -10, max: 10, step: 0.1 },
    offsetY: { value: 0, min: -10, max: 10, step: 0.1 },
    offsetZ: { value: 0, min: -10, max: 10, step: 0.1 },
    opacity: { value: 1, min: 0, max: 1, step: 0.01 },
  });
}

// Hook for Skullbot Model
export function useSkullbotControls() {
  return useControls("Skullbot", {
    landmarkIndex: { value: 9, min: 0, max: 478, step: 1 },
    scale: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
  });
}
