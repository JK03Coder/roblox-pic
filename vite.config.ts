import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
  ssr: {
    noExternal: ['three']
  },
  plugins: [
    sveltekit(),
    Icons({
      compiler: 'svelte',
    }),
  ],
});
