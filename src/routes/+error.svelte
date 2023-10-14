<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="grid h-full px-4 place-content-center">
  <div class="text-center">
    <h1 class="font-black text-9xl">{$page.status}</h1>

    <p class="text-2xl font-bold tracking-tight text-surface-900 sm:text-4xl">
      {$page.error?.message}
    </p>

    <a href="/" class="btn btn-accent mt-6"> Go Back Home </a>
  </div>
</div>
