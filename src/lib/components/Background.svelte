<script lang="ts">
  import { onMount } from 'svelte';
  import { FastAverageColor } from 'fast-average-color';

  export let getDataURL: Function;

  const fac = new FastAverageColor();

  let background: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;

  let isCalled = false;
  $: if (getDataURL && ctx && !isCalled) {
    drawAverageColor();
    isCalled = true;
  }

  onMount(() => {
    ctx = background.getContext('2d');
  });

  function drawAverageColor() {
    if (!ctx) return;
    if (!getDataURL) return;

    const dataURL: string = getDataURL();
    if (!dataURL) {
      console.error('getDataURL returned undefined');
      return;
    }

    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
      if (!ctx) return;
      const color = fac.getColor(img, { ignoredColor: [0, 0, 0, 0] });
      ctx.clearRect(0, 0, background.width, background.height);
      ctx.fillStyle = color.rgb;
      ctx.fillRect(0, 0, background.width, background.height);
    };
  }
</script>

<canvas
  bind:this={background}
  class="absolute top-0 h-full w-full select-none -z-10"
/>
