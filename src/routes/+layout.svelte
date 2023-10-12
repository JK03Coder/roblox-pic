<script land="ts">
  import '../app.postcss';
  import { onMount } from 'svelte';
  import { themeChange } from 'theme-change';
  import LucideSun from '~icons/lucide/sun';
  onMount(() => {
    themeChange(false);
  });
</script>

<div class="h-screen flex flex-col">
  <nav class="navbar bg-base-200 px-4 sticky top-0 z-50">
    <div class="flex-1">
      <a href="/" class="font-semibold normal-case text-3xl">RoboGrafx</a>
    </div>
    <div class="flex-none">
      <LucideSun />
      <a href="/login" class="btn btn-primary normal-case text-xl">Sign in</a>
    </div>
  </nav>
  <main class="flex-grow">
    <slot />
  </main>
</div>
