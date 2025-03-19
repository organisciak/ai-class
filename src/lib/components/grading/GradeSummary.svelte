<script lang="ts">
    // Props
    export let score: number = 0;
    export let totalPoints: number = 0;
    export let maxScore: number = 650;
    
    // Calculate percentage of max score
    $: percentage = Math.round((score / maxScore) * 100);
    
    // Determine color based on score percentage
    $: colorClass = percentage >= 90 ? 'text-green-700' : 
                    percentage >= 80 ? 'text-blue-700' :
                    percentage >= 70 ? 'text-yellow-700' :
                    percentage >= 60 ? 'text-orange-700' : 'text-red-700';
</script>

<div class="p-6 bg-gray-100 rounded-lg">
    <h3 class="text-xl font-semibold mb-4">Total Score</h3>
    <div class="text-3xl font-bold {colorClass}">{score}/{maxScore}</div>
    <p class="text-sm text-gray-600 mt-2">
        Weighted by points per lab ({totalPoints} total points selected)
    </p>
    <p class="text-sm mt-1 {colorClass}">
        {percentage}% 
        {#if percentage >= 90}
            (Excellent)
        {:else if percentage >= 80}
            (Very Good)
        {:else if percentage >= 70}
            (Good)
        {:else if percentage >= 60}
            (Satisfactory)
        {:else}
            (Needs Improvement)
        {/if}
    </p>
</div> 