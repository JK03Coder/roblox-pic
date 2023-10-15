<script lang="ts">
  import '../app.postcss';
  import { DarkModeToggle, RobloxLogo } from '$lib/components';
</script>

<div class="h-screen flex flex-col">
  <nav class="navbar bg-base-200 px-4 sticky top-0 z-50 shadow-md">
    <div class="flex-1">
      <a href="/" class="font-semibold normal-case text-3xl" draggable="false">RoboGrafx</a>
    </div>
    <div class="flex-none">
      <a
        href="/login"
        class="btn btn-neutral normal-case shadow-md text-xl mr-4"
        draggable="false"><RobloxLogo />Sign in</a
      >
      <DarkModeToggle />
    </div>
  </nav>
  <main class="flex-grow">
    <slot />
  </main>
</div>
