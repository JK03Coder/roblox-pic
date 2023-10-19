<script lang="ts">
  import { T, useLoader, useThrelte } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  import type { Camera, AABB } from '$lib/types';
  import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
  import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
  import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
  import * as THREE from 'three'

  export let camera: Camera;
  export let aabb: AABB;
  export let mtl: string;
  export let obj: string;

  function getHashUrl(hash: string) {
    let st = 31;
    for (let i = 0; i < hash.length; i++) {
      st ^= hash[i].charCodeAt(0);
    }
    return `https://t${(st % 8).toString()}.rbxcdn.com/${hash}`;
  }

  const { load } = useLoader(MTLLoader, {
    extend: (loader) => {
      loader.manager.setURLModifier((url) => {
        if (!url.includes('rbxcdn.com/')) return url;
        const id = url.split('com/')[1];
        return getHashUrl(id);
      });
    },
  });

  const avatar = useLoader(OBJLoader, {
    extend: async (loader) => {
      loader.setMaterials(await load(getHashUrl(mtl)));
    },
  }).load(getHashUrl(obj), {
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
</script>

{#if $avatar}
  <T is={$avatar} rotation.y={Math.PI}/>
{/if}

<T.PerspectiveCamera
  makeDefault
  fov={camera.fov ?? 70}
  position={[-camera.position.x, camera.position.y, -camera.position.z]}
  on:create={({ ref }) => {
    ref.lookAt(
      (aabb.min.x + aabb.max.x) / 2,
      (aabb.max.y + aabb.min.y) / 2,
      (aabb.max.z + aabb.min.z) / 2
    );
  }}
>
  <OrbitControls
    enableDamping
    enablePan={false}
    on:create={({ ref }) => {
      ref.target.set(
        (aabb.min.x + aabb.max.x) / 2,
        (aabb.max.y + aabb.min.y) / 2,
        (aabb.max.z + aabb.min.z) / 2
      );
    }}
  />
</T.PerspectiveCamera>