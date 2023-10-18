<script lang="ts">
  import { T, useLoader } from '@threlte/core';
  import { OrbitControls, Environment } from '@threlte/extras';
  import type { Camera, AABB } from '$lib/types';
  import * as THREE from 'three';
  import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
  import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

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

  const materials = useLoader(MTLLoader).load(getHashUrl(mtl));
  const model = useLoader(OBJLoader).load(getHashUrl(obj));
</script>

<T.PerspectiveCamera
  makeDefault
  fov={camera.fov ?? 70}
  position={[camera.position.x, camera.position.y, camera.position.z]}
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

{#if $model}
  <T is={$model} >
    {#if $materials}
      <T is={$materials} />
    {/if}
  </T>
{/if}

<Environment
  path="/"
  files="studio.hdr"
  isBackground={true}
  format="hdr"
  groundProjection={{
    radius: 200,
    height: 5,
    scale: { x: 100, y: 100, z: 100 },
  }}
/>
