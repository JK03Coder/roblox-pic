<script lang="ts">
  import type { PageData } from './$types';
  import { Title } from '$lib/components';
  import { toast } from 'svelte-daisy-toast';

  function boop() {
    toast({
      title: 'Boop',
      message: 'Hello Svelte!',
      duration: 5000,
      type: 'success',
    });
  }
  export let data: PageData;
</script>

<Title name="Dashboard" />

<main class="flex flex-col items-center text-xl mt-20">
  <p>You should only be able to see this if you are logged in.</p>

  <p>Username: {data.username}</p>
  <p>Roblox ID: {data.robloxId}</p>

  <a href="/editor" class="btn btn-primary"> Editor </a>
  <button class="btn" on:click={boop}>send toast</button>
</main>
