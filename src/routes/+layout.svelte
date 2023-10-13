<script lang="ts">
  import '../app.postcss';
  import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
</script>

<div class="h-screen flex flex-col">
  <nav class="navbar bg-base-200 px-4 sticky top-0 z-50">
    <div class="flex-1">
      <a href="/" class="font-semibold normal-case text-3xl">RoboGrafx</a>
    </div>
    <div class="flex-none">
      <a href="/login" class="btn btn-primary normal-case text-xl mr-4"
        >Sign in</a
      >
      <DarkModeToggle />
    </div>
  </nav>
  <main class="flex-grow">
    <slot />
  </main>
</div>
