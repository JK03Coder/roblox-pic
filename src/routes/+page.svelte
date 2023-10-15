<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="hero min-h-full">
  <div class="hero-content flex-col lg:flex-row">
    <div>
      <h1 class="text-6xl font-bold uppercase">Generate a stunning gfx</h1>
      <p class="py-6">
        This tool allows you to create beautiful renders of Roblox characters in
        any scenario for profile pictures, banners, or game icons.
      </p>
      <a
        href={data.isAuth ? "/dashboard" : "/login"}
        class="btn btn-primary"
        draggable="false"
        data-sveltekit-preload-data="hover">Get Started</a
      >
    </div>
    <img
      src="temphero.jpg"
      class="max-w-sm rounded-lg shadow-2xl"
      alt="roblox avatars"
    />
  </div>
</div>
