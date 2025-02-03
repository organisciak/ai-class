<script lang="ts">
    import MisalignedText from '../components/ui/misalignedText/MisalignedText.svelte';
    import TripleHr from '../components/ui/tripleHr/TripleHr.svelte';
</script>

<header class="workbench-gfont container mx-auto p-2">
    <a href="/"><MisalignedText
    element="span"
    size="text-lg"
    class_name="inline-block cursor-pointer"
    chaotic={false}
    mouseTracking={false}
  >AI Literacy Class</MisalignedText></a>
    <a href="/" class="hover:text-blue-500">&lt; Back</a>
    <TripleHr lines={3} width="100%" />
    
</header>