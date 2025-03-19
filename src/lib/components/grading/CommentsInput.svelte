<script lang="ts">
    // Props
    export let labId: string;
    export let value: string = '';
    export let rows: number = 3;
    export let placeholder: string = 'Enter grading comments here...';
    
    // Event dispatcher
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    // Handle input change
    function handleInput(e: Event) {
        const target = e.target as HTMLTextAreaElement;
        value = target.value;
        dispatch('change', value);
    }
</script>

<div>
    <label for="comments-{labId}" class="block text-sm font-medium mb-1">
        Comments:
    </label>
    <textarea
        id="comments-{labId}"
        {rows}
        class="w-full border rounded p-2 text-sm"
        {placeholder}
        {value}
        on:input={handleInput}
    ></textarea>
</div> 