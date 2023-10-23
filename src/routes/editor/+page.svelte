<script lang="ts">
  import type { PageData } from './$types';
  import { Canvas } from '@threlte/core';
  import { Scene, Steps } from '$lib/components';

  import LucideMouse from '~icons/lucide/mouse';
  import LucideMousePointerSquare from '~icons/lucide/mouse-pointer-square';
  import LucideMousePointerSquareDashed from '~icons/lucide/mouse-pointer-square-dashed';

  export let data: PageData;

  let { camera, aabb, mtl, obj } = data;

  let step = 0;
</script>

<div
  class="flex flex-col lg:flex-row items-center lg:justify-center h-full gap-2 lg:gap-8 p-8"
>
  <div class="bg-base-200 w-[45vh] h-[45vh] lg:w-[45vw] lg:h-[45vw] shadow-xl">
    {#if camera && aabb && mtl && obj}
      <Canvas>
        <Scene {camera} {aabb} {mtl} {obj} />
      </Canvas>
    {:else}
      <h1>Something went wrong</h1>
    {/if}
  </div>
  <div class="card bg-base-200 w-[45vh] lg:h-[45vw] shadow-xl">
    <div class="card-body max-sm:pt-2">
      <Steps bind:step />
      <h1 class="card-title">Camera Controls</h1>
      <div class="flex-1">
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
          <button class="btn btn-ghost">Default</button>
          <button class="btn btn-ghost">Mug</button>
          <button class="btn btn-ghost">Bust</button>
        </div>
      </div>
      <div class="card-actions justify-between">
        <button
          on:click={() => {
            step--;
          }}
          class="btn btn-neutral normal-case"
          disabled={step <= 0}>Back</button
        >
        <button
          on:click={() => {
            step++;
          }}
          class="btn btn-neutral normal-case"
          disabled={step >= 2}>Next</button
        >
      </div>
    </div>
  </div>
</div>
