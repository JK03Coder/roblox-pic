<script lang="ts">
  import type { PageData } from './$types';
  import { Canvas } from '@threlte/core';
  import { Scene, Steps } from '$lib/components';

  export let data: PageData;

  let { camera, aabb, mtl, obj } = data;
</script>

<!-- <div class="flex justify-center mt-10">
  {#if camera && aabb && mtl && obj}
    <Canvas size={{ width: 800, height: 800 }}>
      <Scene {camera} {aabb} {mtl} {obj} />
    </Canvas>
  {:else}
    <h1>Something went wrong</h1>
  {/if}
</div> -->
<div
  class="flex flex-col lg:flex-row items-center lg:justify-center h-full gap-8 p-8"
>
  <div class="bg-base-200 w-[40vh] h-[40vh] lg:w-[40vw] lg:h-[40vw] shadow-xl">
    {#if camera && aabb && mtl && obj}
      <Canvas>
        <Scene {camera} {aabb} {mtl} {obj} />
      </Canvas>
    {:else}
      <h1>Something went wrong</h1>
    {/if}
  </div>
  <div class="card bg-base-200 w-[40vh] lg:h-[40vw] shadow-xl">
    <div class="card-body">
      <Steps step={0}/>
      <h1 class="card-title">Editor</h1>
      <p>Edit the stuff yo</p>
    </div>
  </div>
</div>
