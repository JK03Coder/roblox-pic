<script lang="ts">
  import type { PageData } from './$types';
  import { Scene, Steps, CameraControls, ShareButton } from '$lib/components';
  import { Title, BgCanv } from '$lib/components';
  import { orbitControlsRef } from '$lib/stores';
  import { combineCanvases } from '$lib/utils';

  type GradientType = 'linear' | 'radial';

  export let data: PageData;
  const tabTitle = ['Camera Controls', 'Background Gradient', 'Final step'];

  let step = 0;

  $: if (step === 0) {
    if ($orbitControlsRef) $orbitControlsRef.enabled = true;
  } else {
    if ($orbitControlsRef) $orbitControlsRef.enabled = false;
  }

  let { camera, aabb, mtl, obj } = data;

  let backgroundCanvas: HTMLCanvasElement;
  let sceneCanvas: HTMLCanvasElement;
  let renderer: THREE.WebGLRenderer;

  let showLoading = false;

  let rotation: number = 90;
  let color1: string = '#00cafd';
  let color2: string = '#5149fc';
  let gradientType: GradientType = 'linear';
  let innerRadius: number = 50;
  let outerRadius: number = 50;

  function swapColors() {
    [color1, color2] = [color2, color1];
  }

  async function downloadImage(_event: Event) {
    showLoading = true;
    let downloadDataUri: string | void = await combineCanvases(
      backgroundCanvas,
      sceneCanvas,
      renderer,
      800,
      800
    )
      .then((combinedDataURI) => {
        return combinedDataURI;
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        return;
      });

    if (!downloadDataUri) {
      console.error('dataUri is invalid');
      return;
    }
    const anchor = document.createElement('a');
    anchor.href = downloadDataUri;
    anchor.download = 'final.png';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    showLoading = false;
  }
</script>

<Title name="Editor" />

<div
  class="flex flex-col lg:flex-row items-center lg:justify-center h-full gap-2 lg:gap-8 p-8"
>
  <div
    class="relative bg-base-200 w-[45vh] h-[45vh] lg:w-[45vw] lg:h-[45vw] shadow-xl"
  >
    <div
      class:hidden={!showLoading}
      class="bg-base-200 absolute flex items-center justify-center top-0 w-full h-full z-50"
    >
      <div class="loading loading-spinner w-[5vh] lg:w-[5vw]" />
    </div>
    {#if camera && aabb && mtl && obj}
      <Scene
        bind:canvReference={sceneCanvas}
        bind:renderer
        {camera}
        {aabb}
        {mtl}
        {obj}
      />
      <BgCanv
        bind:backgroundCanvas
        {step}
        {rotation}
        {color1}
        {color2}
        {gradientType}
        {innerRadius}
        {outerRadius}
      />
    {:else}
      <h1 class="text-center mt-4">
        Something went wrong. Try refreshing the page
      </h1>
    {/if}
  </div>
  <div class="card bg-base-200 w-[45vh] lg:h-[45vw] shadow-xl">
    <div class="card-body max-sm:pt-2">
      <Steps bind:step />
      <h1 class="card-title">{tabTitle[step]}</h1>
      <div class="flex-1">
        <!-- Camera Controls -->
        {#if camera && aabb && step === 0}
          <CameraControls {camera} {aabb} />
        {/if}
        <!-- Gradient Controls -->
        <div class:hidden={step !== 1}>
          <ul class="space-y-2">
            <li>Choose your background style</li>
          </ul>

          <div class="divider">Gradient Type</div>

          <!-- Gradient Type Radio Buttons -->
          <div class="join block text-center mb-4">
            {#each ['Linear', 'Radial'] as type}
              <input
                class="join-item btn btn-accent btn-sm btn-outline"
                type="radio"
                name="gradient-type"
                aria-label={type}
                value={type.toLowerCase()}
                bind:group={gradientType}
              />
            {/each}
          </div>

          <label
            class="label mb-2 cursor-pointer rounded-lg p-2 shadow shadow-base-content/30"
          >
            Color 1:
            <input
              type="color"
              name="Color1"
              class="w-6 h-6 border-2 border-base-content"
              bind:value={color1}
            />
          </label>

          <label
            class="label mb-4 cursor-pointer rounded-lg p-2 shadow shadow-base-content/30"
          >
            Color 2:
            <input
              type="color"
              name="Color2"
              class="w-6 h-6 border-2 border-base-content"
              bind:value={color2}
            />
          </label>

          <button
            type="button"
            on:click={swapColors}
            class="btn btn-neutral btn-sm block mb-2">Swap Colors</button
          >

          {#if gradientType === 'linear'}
            <label>
              Rotation: {rotation}
              <input
                class="range"
                type="range"
                min="0"
                max="180"
                bind:value={rotation}
              />
            </label>
          {/if}

          {#if gradientType === 'radial'}
            <label>
              Inner Radius: {innerRadius}
              <input
                class="range"
                type="range"
                min="0"
                max="100"
                bind:value={innerRadius}
              />
            </label>
            <label>
              Outer Radius: {outerRadius}
              <input
                class="range"
                type="range"
                min="0"
                max="100"
                bind:value={outerRadius}
              />
            </label>
          {/if}
        </div>
        {#if step === 2}
          <button type="button" class="btn btn-accent" on:click={downloadImage}
            >Download Image</button
          >
          <ShareButton />
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
