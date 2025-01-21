<script lang="ts">    
    export let data;
</script>

<div class="container mx-auto py-8 px-4">
    <article class="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-m-20 prose-h1:text-4xl prose-h1:font-extrabold prose-h2:text-3xl prose-h2:font-semibold prose-h3:text-2xl prose-h3:font-semibold prose-h4:text-xl prose-h4:font-semibold prose-a:text-primary prose-img:max-h-[600px] prose-img:max-w-[800px] prose-img:object-contain">
        {#if data?.content}
            <svelte:component this={data.content} />
        {:else}
            <p>No content loaded</p>
        {/if}
    </article>
</div> 