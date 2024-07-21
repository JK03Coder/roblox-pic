<script lang="ts">
  import { afterUpdate } from 'svelte';
  import { FastAverageColor } from 'fast-average-color';

  export let getDataURL: Function;

  const fac = new FastAverageColor();

  let background: HTMLCanvasElement;

  async function redrawCanvas() {
    const ctx = background.getContext('2d');

    if (!ctx) return;
    if (!getDataURL) return;
    // Get the data URL of the image
    const dataURL = getDataURL();

    // Create a new image object
    const img = new Image();
    img.src = dataURL;

    // Draw the image onto the canvas
    ctx.drawImage(img, 0, 0, background.width, background.height);

    // Get the average color of the image
    const color = fac.getColor(background, { ignoredColor: [0, 0, 0, 0]});

    // Clear the canvas
    ctx.clearRect(0, 0, background.width, background.height);

    // Fill the canvas with the average color
    ctx.fillStyle = color.rgb;
    ctx.fillRect(0, 0, background.width, background.height);
  }

  afterUpdate(() => {
    redrawCanvas();
  });
</script>

<canvas
  bind:this={background}
  class="absolute top-0 h-full w-full select-none -z-10"
/>
