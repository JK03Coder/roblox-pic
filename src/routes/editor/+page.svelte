<script lang="ts">
  import type { PageData } from './$types';
  import { Scene, Steps, CameraControls } from '$lib/components';
  import { Title, BgCanv } from '$lib/components';
  import { orbitControlsRef } from '$lib/stores';
  import { combineImages } from '$lib/utils';

  export let data: PageData;
  const tabTitle = ['Camera Controls', 'Background Gradient', 'Final step'];

  let step = 0;

  $: if (step === 0) {
    if ($orbitControlsRef) $orbitControlsRef.enabled = true;
  } else {
    if ($orbitControlsRef) $orbitControlsRef.enabled = false;
  }

  let { camera, aabb, mtl, obj } = data;

  let backgroundCanvas: any;
  let sceneCanvas: any;

  let rotation: number = 90;
  let color1: string = '#00cafd';
  let color2: string = '#5149fc';
  let linearToggle: boolean = false;
  let innerRadius: number = 50;
  let outerRadius: number = 50;

  function swapColors() {
    [color1, color2] = [color2, color1];
  }

  async function downloadImage(_event: Event) {
    let downloadDataUri: string | void = await combineImages(
      backgroundCanvas.getDataUri(),
      sceneCanvas.getDataUri()
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
  }

  async function getDataUris() {
    console.log(backgroundCanvas.getDataUri().slice(0, 50));
    console.log(sceneCanvas.getDataUri().slice(0, 50));

    combineImages(backgroundCanvas.getDataUri(), sceneCanvas.getDataUri())
      .then((combinedDataURI) => {
        console.log('Combined image data URI:', combinedDataURI.slice(0, 50));
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  }
</script>

<Title name="Editor" />

<div
  class="flex flex-col lg:flex-row items-center lg:justify-center h-full gap-2 lg:gap-8 p-8"
>
  <div
    class="relative bg-base-200 w-[45vh] h-[45vh] lg:w-[45vw] lg:h-[45vw] shadow-xl"
  >
    {#if camera && aabb && mtl && obj}
      <Scene bind:this={sceneCanvas} {camera} {aabb} {mtl} {obj} />
      <BgCanv
        bind:this={backgroundCanvas}
        {step}
        {rotation}
        {color1}
        {color2}
        {linearToggle}
        {innerRadius}
        {outerRadius}
      />
    {:else}
      <h1>Something went wrong</h1>
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
          <label>
            Linear or Radial:
            <input type="checkbox" class="toggle" bind:checked={linearToggle} />
          </label>

          {#if linearToggle}
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
          {:else}
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

          <label>
            Color 1:
            <input type="color" name="Color1" bind:value={color1} />
          </label>

          <label>
            Color 2:
            <input type="color" name="Color2" bind:value={color2} />
          </label>

          <label>
            Swap Colors:
            <button type="button" on:click={swapColors} class="btn">Swap</button
            >
          </label>
        </div>
        {#if step === 2}
          <a
            href={backgroundCanvas.getDataUri()}
            download="background.png"
            class="btn btn-primary">Background Image</a
          >
          <a
            href={sceneCanvas.getDataUri()}
            download="scene.png"
            class="btn btn-secondary">Scene Image</a
          >
          <button type="button" class="btn btn-accent" on:click={downloadImage}
            >Final Image</button
          >
          <button class="btn btn-neutral" on:click={getDataUris}>Log</button>
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
