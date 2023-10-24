<script lang="ts">
  import LucideMouse from '~icons/lucide/mouse';
  import LucideMousePointerSquare from '~icons/lucide/mouse-pointer-square';
  import LucideMousePointerSquareDashed from '~icons/lucide/mouse-pointer-square-dashed';
  import type { AABB, Camera, CameraSettings } from '$lib/types';
  import { onMount } from 'svelte';
  import { cameraSettings } from '$lib/stores';

  export let camera: Camera;
  export let aabb: AABB;

  let initCamSettings: CameraSettings;

  onMount(() => {
    if (camera && aabb) {
      initCamSettings = { camera, aabb };
    }
  });

  function handleCameraPreset(type: string | undefined = undefined) {
    switch (type) {
      case 'bust':
        cameraSettings.set({
          camera: {
            ...initCamSettings.camera,
            position: {
              x: 0.0,
              y: 104.0,
              z: -4.0,
            },
          },
          aabb: {
            min: {
              x: -1.5,
              y: 104.0,
              z: -1.0,
            },
            max: {
              x: 1.5,
              y: 104.0,
              z: 1.0,
            },
          },
        });
        break;
      case 'mug':
        cameraSettings.set({
          camera: {
            ...initCamSettings.camera,
            position: {
              x: -1.37704,
              y: 104.044,
              z: -1.68909,
            },
          },
          aabb: {
            min: {
              x: -1.50447,
              y: 103.9437,
              z: -0.795158,
            },
            max: {
              x: 1.55444,
              y: 104.324,
              z: 1.06602,
            },
          },
        });
        break;
      default:
        cameraSettings.set(initCamSettings);
        break;
    }
  }
</script>

<ul class="space-y-2">
          <li>
            <LucideMousePointerSquare class="inline-block mr-2" />Hold left
            click to rotate
          </li>
          <li>
            <LucideMousePointerSquareDashed class="inline-block mr-2" />Hold
            right click to pan
          </li>
          <li>
            <LucideMouse class="inline-block mr-2" />Scroll to zoom in and out
          </li>
        </ul>
        <div class="divider">Presets</div>
        <div class="grid grid-cols-3 gap-2">
          <button
            class="btn bg-base-100"
            on:click={() => {
              handleCameraPreset();
            }}>Default</button
          >
          <button
            class="btn bg-base-100"
            on:click={() => {
              handleCameraPreset('bust');
            }}>Bust</button
          >
          <button
            class="btn bg-base-100"
            on:click={() => {
              handleCameraPreset('mug');
            }}>Mug</button
          >
        </div>

