<script lang="ts">
  import { T, useLoader, useThrelte } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  import type { Camera, AABB, CameraSettings } from '$lib/types';
  import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
  import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
  import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
  import * as THREE from 'three';
  import { cameraSettings, orbitControlsRef } from '$lib/stores';
  import { onMount } from 'svelte';

  export let camera: Camera;
  export let aabb: AABB;
  const initCamSettings: CameraSettings = { camera, aabb };
  $cameraSettings = initCamSettings;
  export let mtl: string;
  export let obj: string;

  let perspectiveCameraRef: THREE.PerspectiveCamera;

  onMount(() => {
    cameraSettings.subscribe((newSettings) => {
      perspectiveCameraRef.lookAt(
        (newSettings.aabb.min.x + newSettings.aabb.max.x) / 2,
        (newSettings.aabb.max.y + newSettings.aabb.min.y) / 2,
        (newSettings.aabb.max.z + newSettings.aabb.min.z) / 2
      );
      $orbitControlsRef.target.set(
        (newSettings.aabb.min.x + newSettings.aabb.max.x) / 2,
        (newSettings.aabb.max.y + newSettings.aabb.min.y) / 2,
        (newSettings.aabb.max.z + newSettings.aabb.min.z) / 2
      );
    });
  });

  function getHashUrl(hash: string) {
    let st = 31;
    for (let i = 0; i < hash.length; i++) {
      st ^= hash[i].charCodeAt(0);
    }
    return `https://t${(st % 8).toString()}.rbxcdn.com/${hash}`;
  }

  const { load: loadMTL } = useLoader(MTLLoader, {
    extend: (loader) => {
      loader.manager.setURLModifier((url) => {
        if (!url.includes('rbxcdn.com/')) return url;
        const id = url.split('com/')[1];
        return getHashUrl(id);
      });
    },
  });

  const { load: loadOBJ } = useLoader(OBJLoader, {
    extend: async (loader) => {
      const mats = await loadMTL(getHashUrl(mtl));
      loader.setMaterials(mats);
    },
  });

  const avatar = loadOBJ(getHashUrl(obj), {
    transform: (object) => {
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const shinyMaterial = new THREE.MeshStandardMaterial({
            map: child.material.map,
            color: 0xffffff,
            roughness: 0.0,
            metalness: 0.2,
          });

          child.material = shinyMaterial;
        }
      });
      return object;
    },
  });

  const { scene, renderer } = useThrelte();

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  new RGBELoader()
    .setDataType(THREE.HalfFloatType)
    .load('/studio.hdr', function (texture) {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      // scene.background = envMap;
      scene.environment = envMap;
      texture.dispose();
      pmremGenerator.dispose();
    });

  export function getDataURL() {
    return renderer.domElement.toDataURL("image/png", 1.0);
  }
</script>

{#if $avatar}
  <T is={$avatar} rotation.y={Math.PI} />
{/if}

<T.PerspectiveCamera
  makeDefault
  fov={$cameraSettings.camera.fov ?? 70}
  position={[
    -$cameraSettings.camera.position.x,
    $cameraSettings.camera.position.y,
    -$cameraSettings.camera.position.z,
  ]}
  on:create={({ ref }) => {
    perspectiveCameraRef = ref;
    ref.lookAt(
      ($cameraSettings.aabb.min.x + $cameraSettings.aabb.max.x) / 2,
      ($cameraSettings.aabb.max.y + $cameraSettings.aabb.min.y) / 2,
      ($cameraSettings.aabb.max.z + $cameraSettings.aabb.min.z) / 2
    );
  }}
>
  <OrbitControls
    enableDamping
    dampingFactor={0.3}
    enablePan={true}
    minDistance={1}
    maxDistance={110}
    on:create={({ ref }) => {
      orbitControlsRef.set(ref);
      ref.target.set(
        ($cameraSettings.aabb.min.x + $cameraSettings.aabb.max.x) / 2,
        ($cameraSettings.aabb.max.y + $cameraSettings.aabb.min.y) / 2,
        ($cameraSettings.aabb.max.z + $cameraSettings.aabb.min.z) / 2
      );
    }}
  />
</T.PerspectiveCamera>
