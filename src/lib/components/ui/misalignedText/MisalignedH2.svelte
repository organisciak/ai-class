
  <!-- MisalignedH2.svelte -->
  <script lang="ts">
    import MisalignedText from './MisalignedText.svelte';
    export let class_name = '';
    export let chaotic = false;
    export let mouseTracking = false;
  </script>
  
  <MisalignedText
    element="h2"
    size="text-5xl"
    {class_name}
    {chaotic}
    mouseTracking={mouseTracking}
  >
    <slot />
  </MisalignedText>