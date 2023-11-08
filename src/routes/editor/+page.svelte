<script lang="ts">
  import type { PageData } from './$types';
  import { Scene, Steps, CameraControls } from '$lib/components';
  import { Title, BgCanvControls } from '$lib/components';
  import { orbitControlsRef } from '$lib/stores';

  export let data: PageData;

  let step = 0;

  $: if (step === 0) {
    if ($orbitControlsRef) $orbitControlsRef.enabled = true;
  } else {
    if ($orbitControlsRef) $orbitControlsRef.enabled = false;
  }

  let { camera, aabb, mtl, obj } = data;

  let backgroundCanvas: HTMLCanvasElement;

  const tabTitle = ['Camera Controls', 'Background Gradient', 'Final step'];
</script>

<Title name="Editor" />

<div
  class="flex flex-col lg:flex-row items-center lg:justify-center h-full gap-2 lg:gap-8 p-8"
>
  <div class="relative bg-base-200 w-[45vh] h-[45vh] lg:w-[45vw] lg:h-[45vw] shadow-xl">
    {#if camera && aabb && mtl && obj}
      <Scene {camera} {aabb} {mtl} {obj} />
      {#if step > 0}
        <canvas bind:this={backgroundCanvas} class="absolute flex top-0 w-full h-full z-10">
          Your browser does not support HTML5 Canvas
        </canvas>
      {/if}
    {:else}
      <h1>Something went wrong</h1>
    {/if}
  </div>
  <div class="card bg-base-200 w-[45vh] lg:h-[45vw] shadow-xl">
    <div class="card-body max-sm:pt-2">
      <Steps bind:step />
      <h1 class="card-title">{tabTitle[step]}</h1>
      <div class="flex-1">
        {#if camera && aabb && step === 0}
          <CameraControls {camera} {aabb} />
        {/if}
        {#if step === 1}
          <BgCanvControls {backgroundCanvas} />
        {/if}
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
