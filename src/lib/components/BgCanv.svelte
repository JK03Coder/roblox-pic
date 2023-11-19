<script lang="ts">
  import { onMount } from 'svelte';

  export let backgroundCanvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let gradient: CanvasGradient;

  export let step = 0;
  export let rotation: number = 90;
  export let color1: string = '#00cafd';
  export let color2: string = '#5149fc';
  export let linearToggle: boolean = false;
  export let innerRadius: number = 50;
  export let outerRadius: number = 50;

  onMount(() => {
    ctx = backgroundCanvas.getContext('2d')!;
    updateCanvas();

    window.addEventListener('resize', updateCanvas);
    return () => {
      window.removeEventListener('resize', updateCanvas);
    };
  });

  function updateCanvas() {
    if (!backgroundCanvas) return;
    if (!ctx) return;

    backgroundCanvas.width = backgroundCanvas.offsetWidth;
    backgroundCanvas.height = backgroundCanvas.offsetHeight;

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
        mapValueToRange(innerRadius, 0, width / 4),
        centerX,
        centerY,
        mapValueToRange(outerRadius, width / 4, width)
      );
    }

    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  $: step,
    rotation,
    color1,
    color2,
    linearToggle,
    innerRadius,
    outerRadius,
    updateCanvas();

  function mapValueToRange(
    value: number,
    rangeMin: number,
    rangeMax: number
  ): number {
    if (value < 0 || value > 100) {
      throw new Error('Value must be between 0 and 100');
    }

    return ((rangeMax - rangeMin) / (100 - 0)) * (value - 0) + rangeMin;
  }

  $: if (step !== 0) {
    nextTick(updateCanvas);
  }

  function nextTick(fn: () => void): void {
    setTimeout(fn, 0);
  }
</script>

<canvas
  bind:this={backgroundCanvas}
  class="absolute top-0 w-full h-full z-10"
  class:hidden={step === 0}
>
  Your browser does not support HTML5 Canvas
</canvas>
