
  <!-- MisalignedH2.svelte -->
  <script lang="ts">
    import MisalignedText from './MisalignedText.svelte';
  interface Props {
    class_name?: string;
    chaotic?: boolean;
    mouseTracking?: boolean;
    children?: import('svelte').Snippet;
  }

  let {
    class_name = '',
    chaotic = false,
    mouseTracking = false,
    children
  }: Props = $props();
  </script>
  
  <MisalignedText
    element="h2"
    size="text-5xl"
    {class_name}
    {chaotic}
    mouseTracking={mouseTracking}
  >
    {@render children?.()}
  </MisalignedText>