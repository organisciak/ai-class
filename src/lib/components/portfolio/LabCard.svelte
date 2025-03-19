<script lang="ts">
    import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
    import { createEventDispatcher } from 'svelte';
    
    // Props
    export let lab: {
        original: string;
        title: string;
        description: string;
        pts: number;
        gradingCriteria: string;
        coreCompetencies: string[];
    };
    export let selected: boolean = false;
    
    // Event dispatcher
    const dispatch = createEventDispatcher();
    
    // Handle checkbox change
    function handleChange(e: Event) {
        const target = e.target as HTMLInputElement;
        dispatch('select', {
            labId: lab.original,
            selected: target.checked
        });
    }
</script>

<Card>
    <CardHeader>
        <CardTitle class="text-sm flex items-start gap-2">
            <input
                type="checkbox"
                id={lab.original}
                value={lab.original}
                checked={selected}
                on:change={handleChange}
            />
            <label for={lab.original}>
                {lab.title}
            </label>
        </CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col gap-2 text-xs">
        <div class="mt-1">{lab.description}</div>
        <div class="text-xs text-gray-500 mt-1">Points: {lab.pts}</div>
        <details class="mt-2">
            <summary class="cursor-pointer text-blue-600 hover:text-blue-800">
                Grading Criteria
            </summary>
            <div class="mt-2 pl-2 text-gray-600 border-l-2 border-gray-200">
                {lab.gradingCriteria}
            </div>
        </details>
        <details class="mt-1">
            <summary class="cursor-pointer text-blue-600 hover:text-blue-800">
                Core Competencies
            </summary>
            <ul class="mt-2 pl-2 text-gray-600 border-l-2 border-gray-200">
                {#each lab.coreCompetencies as competency, index}
                    <li class={index === 0 ? "font-semibold" : ""}>
                        {competency}{index === 0 ? " (primary)" : ""}
                    </li>
                {/each}
            </ul>
        </details>
    </CardContent>
</Card> 