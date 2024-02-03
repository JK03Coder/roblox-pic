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
  <h2>Please type your avatars username in</h2>

  <a href="/editor" class="btn btn-primary"> Editor </a>
  <button class="btn" on:click={boop}>send toast</button>
</main>
