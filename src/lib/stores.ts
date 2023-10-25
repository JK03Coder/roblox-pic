import { writable } from 'svelte/store';
import type { CameraSettings } from './types';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const cameraSettings = writable<CameraSettings>();

export const orbitControlsRef = writable<OrbitControls>();
