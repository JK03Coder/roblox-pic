<script lang="ts">
  import LucideSearch from '~icons/lucide/search'
  import type { ActionData, PageData } from './$types';
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
  // export let data: PageData;
  export let form: ActionData;
</script>

<Title name="Dashboard" />

<main class="flex flex-col items-center text-xl mt-20">
  <h2>Please type your avatars username in</h2>

  <form method="POST" action="?/search">
    <div class="join">
      <input
        type="search"
        name="search"
        class="join-item input input-bordered"
        autocomplete="off"
      />
      <button type="submit" class="join-item btn"><LucideSearch/></button>
    </div>
  </form>
  {#if form}
    {JSON.stringify(form.users)}
  {/if}
  <a href="/editor?id=189226906" class="btn btn-primary"> Editor </a>
  <button class="btn" on:click={boop}>send toast</button>
</main>
