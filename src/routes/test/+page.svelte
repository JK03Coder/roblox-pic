<script lang="ts">
  import { onMount } from 'svelte';

  let backgroundCanvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let gradient: CanvasGradient;

  let rotation: number = 90;
  let color1: string = '#00cafd';
  let color2: string = '#5149fc';
  let linearToggle: boolean = false;
  let innerRadius: number = 50;
  let outerRadius: number = 250;

  // A function to update the canvas
  function updateCanvas() {
    if (!ctx) return;
    if (rotation < 0 || rotation > 180) return;
    const radians = (rotation * Math.PI) / 180; // Convert degrees to radians
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    // Assuming you want to rotate around the center of the canvas
    const x0 = 200 + 200 * cos;
    const y0 = 200 - 200 * sin;
    const x1 = 200 - 200 * cos;
    const y1 = 200 + 200 * sin;

    if (linearToggle) {
      gradient = ctx.createLinearGradient(x0, y0, x1, y1);
    } else {
      gradient = ctx.createRadialGradient(
        200,
        200,
        innerRadius,
        200,
        200,
        outerRadius
      );
    }
    gradient.addColorStop(0.0, color1);
    gradient.addColorStop(1.0, color2);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);
  }

  onMount(() => {
    ctx = backgroundCanvas.getContext('2d')!;
    updateCanvas(); // Draw the initial state of the canvas
  });

  // Reactivity to update the gradient rotation
  $: rotation,
    color1,
    color2,
    linearToggle,
    innerRadius,
    outerRadius,
    updateCanvas();

  function swapColors() {
    const temp = color1;
    color1 = color2;
    color2 = temp;
  }
</script>

<div class="flex flex-col p-10 items-center">
  <canvas bind:this={backgroundCanvas} class="block w-full h-full z-10">
    Your browser does not support HTML5 Canvas
  </canvas>

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
        min="100"
        max="400"
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
    <button type="button" on:click={swapColors} class="btn">Swap</button>
  </label>
</div>
