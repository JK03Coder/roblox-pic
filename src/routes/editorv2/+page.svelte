<script lang="ts">
  import type { PageData } from './$types';
  import { Canvas } from '@threlte/core';
  import { Scene } from '$lib/components';

  export let data: PageData;

  let { camera, aabb, mtl, obj } = data;
</script>

<div class="flex justify-center mt-10">
  {#if camera && aabb && mtl && obj}
    <Canvas size={{ width: 800, height: 800 }}>
      <Scene {camera} {aabb} {mtl} {obj} />
    </Canvas>
  {:else}
    <h1>Something went wrong</h1>
  {/if}
</div>
