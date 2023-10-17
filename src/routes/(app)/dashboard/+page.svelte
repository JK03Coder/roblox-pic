<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Roblox Pic | Dashboard</title>
</svelte:head>

<main class="flex flex-col items-center text-xl mt-20">
  <p>
    You should only be able to see this if you are logged in.
  </p>

  <p>Username: {data.username}</p>
  <p>Roblox ID: {data.robloxId}</p>

  <a href="/editor" class="btn btn-primary">
    Editor
  </a>

</main>