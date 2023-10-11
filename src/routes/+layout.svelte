<script>
  import '../app.postcss';
</script>

<div class="h-screen flex flex-col">
  <nav class="navbar bg-base-200 sticky top-0 z-50">
    <div class="flex-1">
      <a href="/" class="font-semibold normal-case text-4xl">Roblox Pic</a>
    </div>
    <div class="flex-none">
      <a href="/login" class="btn btn-accent normal-case text-xl"
        >Login with ROBLOX</a
      >
    </div>
  </nav>
  <main class="flex-grow">
    <slot />
  </main>
</div>
