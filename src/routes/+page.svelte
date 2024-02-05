<script lang="ts">
  // import type { PageData } from './$types';

  // export let data: PageData;
</script>

<svelte:head>
  <title>RoboGrafx</title>
</svelte:head>

<div class="hero min-h-full">
  <div class="hero-content flex-col lg:flex-row">
    <div>
      <h1 class="text-6xl font-bold uppercase">
        Generate stunning avatar photos fast
      </h1>
      <p class="py-6">
        Transform your Roblox characters into eye-catching images perfect for
        profile pics, banners, or game icons with just a few clicks! Our tool
        makes it super easy and fun to bring your avatar to life in any setting.
        Get ready to stand out and impress your friends!
      </p>
      <a
        href="/search"
        class="btn btn-primary"
        draggable="false"
        data-sveltekit-preload-data="hover">Get Started</a
      >
    </div>
    <img
      src="hero.png"
      class="sm:max-w-sm rounded-lg shadow-2xl"
      alt="roblox avatars"
    />
  </div>
</div>
