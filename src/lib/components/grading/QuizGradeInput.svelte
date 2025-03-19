<script lang="ts">
    // Props
    export let labId: string;
    export let value: number = 0;
    
    // Event dispatcher
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    // Handle input value change
    function handleChange(e: Event) {
        const target = e.target as HTMLInputElement;
        const newValue = parseInt(target.value);
        
        // Validate and clamp input between 0-100
        const validValue = Math.min(100, Math.max(0, newValue || 0));
        
        // Calculate the equivalent inverted slider value (100% -> 0, 0% -> 20)
        const invertedGrade = Math.round(20 - (validValue / 100 * 20));
        
        // Update local value
        value = validValue;
        
        // Dispatch event to parent
        dispatch('change', { 
            labId, 
            directPercentage: validValue, 
            grade: invertedGrade 
        });
    }
</script>

<div>
    <label for="grade-{labId}" class="block text-sm font-medium mb-1">
        Quiz Score: {value}%
    </label>
    <input 
        type="number" 
        id="grade-{labId}" 
        min="0" 
        max="100" 
        step="1"
        class="w-full border rounded p-2" 
        {value}
        on:input={handleChange}
    />
    <div class="text-xs text-gray-500 mt-1">
        Enter the percentage score directly from the quiz results
    </div>
</div> 