<script lang="ts">
  import LucideCamera from '~icons/lucide/camera';
  import LucideImage from '~icons/lucide/image';
  import LucideCheckSquare from '~icons/lucide/check-square';

  export let step = 0;

  function setStep(newStep: number) {
    step = newStep;
  }
</script>

<ul class="steps">
  <button
    type="button"
    aria-label="camera step"
    on:click={() => {
      setStep(0);
    }}
    data-content=""
    class="step step-neutral text-neutral-200"
  >
    <LucideCamera class="z-10 text-lg col-start-1 row-start-1" />
  </button>
  <button
    type="button"
    aria-label="background step"
    on:click={() => {
      setStep(1);
    }}
    data-content=""
    class="step"
    class:step-neutral={step >= 1}
    class:text-neutral-200={step >= 1}
  >
    <LucideImage class="z-10 text-lg col-start-1 row-start-1" />
  </button>
  <button
    type="button"
    aria-label="final step"
    on:click={() => {
      setStep(2);
    }}
    data-content=""
    class="step"
    class:step-neutral={step >= 2}
    class:text-neutral-200={step >= 2}
  >
    <LucideCheckSquare class="z-10 text-lg col-start-1 row-start-1" />
  </button>
</ul>