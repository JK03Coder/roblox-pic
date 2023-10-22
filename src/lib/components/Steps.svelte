<script lang="ts">
  import LucideCamera from '~icons/lucide/camera';
  import LucideImage from '~icons/lucide/image';
  import LucideCheckSquare from '~icons/lucide/check-square';

  export let step = 0;
</script>

<ul class="steps">
  <li data-content="" class="step step-neutral text-neutral-200">
    <LucideCamera class="relative -top-[1.925rem] z-10 text-lg" />
  </li>
  <li
    data-content=""
    class="step"
    class:step-neutral={step >= 1}
    class:text-neutral-200={step >= 1}
  >
    <LucideImage class="relative -top-[1.925rem] z-10 text-lg" />
  </li>
  <li
    data-content=""
    class="step"
    class:step-neutral={step >= 2}
    class:text-neutral-200={step >= 2}
  >
    <LucideCheckSquare class="relative -top-[1.925rem] z-10 text-lg" />
  </li>
</ul>

<style>
  .steps .step svg {
    z-index: 2;
    grid-column-start: 1;
    grid-row-start: 1;
  }
</style>
