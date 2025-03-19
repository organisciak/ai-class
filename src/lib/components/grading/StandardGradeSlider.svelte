<script lang="ts">
    export let labId: string;
    export let value: number = 0;
    
    // Helper function to calculate percentage from a numeric grade
    function getPercentageGrade(grade: number): number {
        return Math.round((grade / 20) * 100);
    }

    // Handle internal changes and dispatch to parent
    function handleChange(e: Event) {
        const target = e.target as HTMLInputElement;
        const newValue = parseInt(target.value);
        value = newValue;
        dispatch('change', { labId, grade: newValue });
    }
    
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
</script>

<div>
    <label for="grade-{labId}" class="block text-sm font-medium mb-1">
        Grade: {20 - value}/20 ({getPercentageGrade(20 - value)}%)
    </label>
    <div class="flex flex-col">
        <input 
            type="range" 
            id="grade-{labId}" 
            min="0" 
            max="20" 
            step="1"
            class="w-full" 
            {value}
            on:input={handleChange}
        />
        <div class="w-full flex justify-between text-xs text-gray-500 mt-1">
            <div class="w-1/2 flex justify-between">
                <span>Perfect (20)</span>
                <span>Excellent (18-17)</span>
                <span>Very Good (16-15)</span>
                <span>Good (14-12)</span>
                <span>Adequate (12-10)</span>
            </div>
            <span>Poor (0-9)</span>
        </div>
    </div>
</div> 