<script lang="ts">
  import { onMount, tick } from 'svelte';

  export let backgroundCanvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let gradient: CanvasGradient;

  let rotation: number = 90;
  let color1: string = '#00cafd';
  let color2: string = '#5149fc';
  let linearToggle: boolean = false;
  let innerRadius: number = 50;
  let outerRadius: number = 250;

  let width: number;

  onMount(() => {
    window.addEventListener('resize', updateCanvas);
    return () => {
      window.removeEventListener('resize', updateCanvas);
    };
  });

  function updateCanvas() {
    if (!ctx) {
      console.error('Context is invalid', ctx);
      return;
    }
    if (rotation < 0 || rotation > 180) {
      console.error('rotation is invalid');
      return;
    }
    width = backgroundCanvas.parentElement!.offsetWidth;
    console.log(width);

    if (!width) {
      console.error('width is invalid', width);
      return;
    }
    const radians = (rotation * Math.PI) / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    const x0 = width / 2 + (width / 2) * cos;
    const y0 = width / 2 - (width / 2) * sin;
    const x1 = width / 2 - (width / 2) * cos;
    const y1 = width / 2 + (width / 2) * sin;

    if (linearToggle) {
      gradient = ctx.createLinearGradient(x0, y0, x1, y1);
    } else {
      gradient = ctx.createRadialGradient(
        width / 2,
        width / 2,
        innerRadius,
        width / 2,
        width / 2,
        outerRadius
      );
    }
    gradient.addColorStop(0.0, color1);
    gradient.addColorStop(1.0, color2);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, width);
  }

  $: if (backgroundCanvas) {
    initComponent();
  }
  async function initComponent() {
    await tick();
    ctx = backgroundCanvas.getContext('2d')!;
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
    const temp = color1;
    color1 = color2;
    color2 = temp;
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
