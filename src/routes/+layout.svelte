<script lang="ts">
  import '../app.postcss';
  import type { LayoutData } from './$types';
  import { DarkModeToggle, RobloxLogo } from '$lib/components';

  export let data: LayoutData;
</script>

<div class="h-screen flex flex-col">
  <nav class="navbar bg-base-200 px-4 sticky top-0 z-50 shadow-md">
    <div class="flex-1">
      <a href="/" class="font-semibold normal-case text-3xl" draggable="false"
        >RoboGrafx</a
      >
    </div>
    <div class="flex-none">
      {#if data.isAuth}
        <details class="dropdown dropdown-end">
          <summary class="btn btn-ghost normal-case text-xl mr-4">Hello, {data.username}</summary>
          <ul
            class="p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box w-52 mr-4 mt-3"
          >
            <li><a href="/logout">Logout</a></li>
          </ul>
        </details>
      {:else}
        <a
          href="/login/roblox"
          class="btn btn-neutral normal-case shadow-md text-xl mr-4"
          draggable="false"><RobloxLogo />Sign in</a
        >
      {/if}
      <DarkModeToggle />
    </div>
  </nav>
  <main class="flex-grow">
    <slot />
  </main>
</div>
