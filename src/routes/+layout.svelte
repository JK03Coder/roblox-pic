<script lang="ts">
  import '../app.postcss';
  import type { LayoutData } from './$types';
  import { DarkModeToggle } from '$lib/components';
  import Toast from 'svelte-daisy-toast';

  export let data: LayoutData;
</script>

<Toast position="top-end" />

<div class="h-screen flex flex-col">
  <nav class="navbar bg-base-200 px-4 sticky top-0 z-50 shadow-md">
    <div class="flex-1">
      <a href="/" class="font-semibold normal-case text-md lg:text-2xl" draggable="false"
        >RoboGrafx</a
      >
    </div>
    <div class="flex-none">
      <DarkModeToggle />
    </div>
  </nav>
  <main class="flex-grow">
    <slot />
  </main>
</div>
