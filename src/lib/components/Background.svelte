<script lang="ts">
  import { afterUpdate } from 'svelte';

  let background: HTMLCanvasElement;

  function redrawCanvas() {
    const ctx = background.getContext('2d');

    if (!ctx) return;
    // ctx.clearRect(0, 0, background.width, background.height);

    // Create a linear gradient
    const gradient = ctx.createLinearGradient(0, 0, background.width, 0);

    // Define gradient colors and their positions
    gradient.addColorStop(0, 'yellow'); // Start color (position 0)
    gradient.addColorStop(1, 'purple'); // End color (position 1)

    // Fill a rectangle with the gradient
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, background.width, background.height);
  }

  afterUpdate(() => {
    redrawCanvas();
  });
</script>

<canvas bind:this={background} class="absolute top-0 h-full w-full select-none -z-10" />