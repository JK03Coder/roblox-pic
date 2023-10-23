import { writable } from "svelte/store";
import type { CameraSettings } from './types';

export const cameraSettings = writable<CameraSettings>();

export const dampingFactor = writable<number>(0.05);