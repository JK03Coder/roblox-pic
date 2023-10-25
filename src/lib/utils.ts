import { tick } from 'svelte';

// don't forget to add the view-transition-name css property to the transitioning elements
export function executeViewTransition(callback: Function) {
  // @ts-ignore
  if (!document.startViewTransition) {
    callback();
  }

  // @ts-ignore
  return document.startViewTransition(async () => {
    callback();
    await tick();
  });
}
