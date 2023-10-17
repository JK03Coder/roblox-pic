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
        <div class="dropdown dropdown-end">
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label tabindex="0" class="btn btn-ghost normal-case text-xl mr-4"
            >Hello, {data.username}</label
          >
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <ul
            tabindex="0"
            class="p-2 shadow menu dropdown-content z-[1] bg-base-200 text-lg rounded-box w-52 mr-4 mt-3"
          >
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/logout">Logout</a></li>
          </ul>
        </div>
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
