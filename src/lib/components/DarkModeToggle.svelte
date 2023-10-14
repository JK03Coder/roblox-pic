<script lang="ts">
  import LucideSun from '~icons/lucide/sun';
  import LucideMoon from '~icons/lucide/moon';
  import { onMount } from 'svelte';

  const storageKey = 'user-theme';

  let preference: string;

  $: preference && localStorage.setItem(storageKey, JSON.stringify(preference));
  $: preference &&
    document.documentElement.setAttribute('data-theme', preference);

  function toggle() {
    preference = preference === 'light' ? 'dark' : 'light';
  }

  onMount(() => {
    preference = JSON.parse(localStorage.getItem(storageKey) ?? '');
    if (!preference) {
      preference = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({ matches: isDark }) => {
        preference = isDark ? 'dark' : 'light';
      });
  });
</script>

<svelte:head>
  <script lang="ts">
    const theme = JSON.parse(localStorage.getItem('user-theme') ?? '');
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  </script>
</svelte:head>

<button
  class="swap swap-rotate text-2xl"
  on:click={toggle}
  class:swap-active={preference !== 'light'}
>
  <LucideSun class="swap-off" />
  <LucideMoon class="swap-on" />
</button>
