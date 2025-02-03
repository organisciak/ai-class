<script lang="ts">
    export let color = "#0066cc"; // Commodore-style blue
    export let width = "100%";
    export let class_name = "";
    export let lines = 3;
    $: isFullWidth = width === "100%" || width === "100vw";
</script>
  
<div class="flex flex-col {isFullWidth ? '' : 'mx-auto'} {class_name}" style="width: {width}">
    {#if lines >= 4}
        <div class="mt-1 mb-1 border-t-4 border-solid" style="border-color: {color}"></div>
    {/if}
    {#if lines >= 3}
        <div class="border-t-3 border-solid" style="border-color: {color}"></div>
    {/if}
    {#if lines >= 2}
        <div class="mt-1 border-t-2 border-solid opacity-85" style="border-color: {color}"></div>
    {/if}
    {#if lines >= 1}
        <div class="mt-1 border-t-1 border-solid opacity-70" style="border-color: {color}"></div>
    {/if}
    
</div>