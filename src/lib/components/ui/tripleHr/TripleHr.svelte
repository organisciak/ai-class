<script lang="ts">
  interface Props {
    color?: string; // Commodore-style blue
    width?: string;
    class_name?: string;
    lines?: number;
  }

  let {
    color = "#0066cc",
    width = "100%",
    class_name = "",
    lines = 3
  }: Props = $props();
    let isFullWidth = $derived(width === "100%" || width === "100vw");
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