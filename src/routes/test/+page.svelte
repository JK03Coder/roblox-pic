<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let gradient: CanvasGradient;

  let rotation: number = 0;
  let color1: string = '#ff0000';
  let color2: string = '#0000ff';

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

    gradient = ctx.createLinearGradient(x0, y0, x1, y1);
    gradient.addColorStop(1.0, color1);
    gradient.addColorStop(0.0, color2);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);
  }

  onMount(() => {
    ctx = canvas.getContext('2d')!;
    updateCanvas(); // Draw the initial state of the canvas
  });

  // Reactivity to update the gradient rotation
  $: rotation, color1, color2, updateCanvas();

  function swapColors() {
    const temp = color1;
    color1 = color2;
    color2 = temp;
  }
</script>

<div class="flex flex-col p-10 items-center">
  <canvas
    bind:this={canvas}
    width="400"
    height="400"
    class="w-[400px] h-[400px]"
  />

  <label>
    Rotation: {rotation}
    <input
      class="range w-80 block"
      type="range"
      min="0"
      max="180"
      bind:value={rotation}
    />
  </label>

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
