<script lang="ts">
    import MisalignedH3 from '../components/ui/misalignedText/MisalignedH3.svelte';
    import TripleHr from '../components/ui/tripleHr/TripleHr.svelte';
</script>

<footer class="mt-8 container mx-auto p-8">
    <TripleHr class_name="mb-4" lines={4} width="100%" />

    <MisalignedH3 mouseTracking={true} class_name="workbench-gfont text-xl">
        Peter Organisciak
    </MisalignedH3>
    <p class="text-muted-foreground workbench-gfont">
        Associate Professor, University of Denver<br>
        <a href="https://porg.dev" class="hover:underline text-blue-500">porg.dev</a>
    </p>
</footer>