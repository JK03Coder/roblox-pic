<script lang="ts">
  import { onMount } from 'svelte';

  export let backgroundCanvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let gradient: CanvasGradient;

  let rotation: number = 90;
  let color1: string = '#00cafd';
  let color2: string = '#5149fc';
  let linearToggle: boolean = false;
  let innerRadius: number = 50;
  let outerRadius: number = 250;

  onMount(() => {
    const updateCanvasSize = () => {
      if (backgroundCanvas) {
        backgroundCanvas.width = backgroundCanvas.clientWidth;
        backgroundCanvas.height = backgroundCanvas.clientHeight;
        updateCanvas();
      }
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  });

  function updateCanvas() {
    if (!backgroundCanvas) {
      console.error('Canvas is not available');
      return;
    }
    ctx = backgroundCanvas.getContext('2d')!;

    const width = backgroundCanvas.width;
    const height = backgroundCanvas.height;

    if (linearToggle) {
      // Calculate gradient direction based on rotation
      const angle = (Math.PI / 180) * rotation;
      const x0 = width / 2 + (Math.cos(angle) * width) / 2;
      const y0 = height / 2 - (Math.sin(angle) * height) / 2;
      const x1 = width / 2 - (Math.cos(angle) * width) / 2;
      const y1 = height / 2 + (Math.sin(angle) * height) / 2;
      gradient = ctx.createLinearGradient(x0, y0, x1, y1);
    } else {
      // Create radial gradient
      const centerX = width / 2;
      const centerY = height / 2;
      gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        innerRadius,
        centerX,
        centerY,
        outerRadius
      );
    }

    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  $: if (backgroundCanvas) {
    ctx = backgroundCanvas.getContext('2d')!;
    updateCanvas();
  }

  $: if (ctx) {
    updateCanvas();
  }

  $: rotation,
    color1,
    color2,
    linearToggle,
    innerRadius,
    outerRadius,
    updateCanvas();

  function swapColors() {
    [color1, color2] = [color2, color1];
  }
</script>

<label>
  Linear or Radial:
  <input type="checkbox" class="toggle" bind:checked={linearToggle} />
</label>

{#if linearToggle}
  <label>
    Rotation: {rotation}
    <input class="range" type="range" min="0" max="180" bind:value={rotation} />
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
