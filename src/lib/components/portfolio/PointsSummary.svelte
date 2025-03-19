<script lang="ts">
    import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
    
    // Props
    export let points: number = 0;
    export let minPoints: number = 9;
    export let maxPoints: number = 11;
    
    // Determine if points are in valid range
    $: isValidRange = points >= minPoints && points <= maxPoints;
    
    // Calculate how far from valid range
    $: pointsNeeded = points < minPoints ? minPoints - points : 0;
    $: pointsExcess = points > maxPoints ? points - maxPoints : 0;
</script>

<Card class={isValidRange ? 'bg-green-100' : 'bg-red-50'}>
    <CardHeader>
        <CardTitle class="josefin-sans-gfont flex items-center justify-between">
            <span>Total Points: {points}</span>
            {#if isValidRange}
                <span class="text-green-600 text-sm">✓ Valid</span>
            {:else}
                <span class="text-red-600 text-sm">❌ Invalid</span>
            {/if}
        </CardTitle>
    </CardHeader>
    <CardContent>
        <div class="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div class="absolute top-0 left-0 h-full bg-gray-400" style="width: 100%;"></div>
            <div class="absolute top-0 left-0 h-full bg-green-400" 
                 style="width: {Math.min(100, (points / maxPoints) * 100)}%;"></div>
            <div class="absolute top-0 left-0 h-full border-r-2 border-green-600" 
                 style="left: {(minPoints / maxPoints) * 100}%;"></div>
            <div class="absolute top-0 left-0 h-full border-r-2 border-green-600" 
                 style="left: 100%;"></div>
        </div>
        
        <p class="text-sm mt-2">
            {#if isValidRange}
                Valid point range ({minPoints}-{maxPoints})
            {:else if points < minPoints}
                Please add {pointsNeeded} more point{pointsNeeded > 1 ? 's' : ''} to reach the minimum of {minPoints}
            {:else}
                Please remove {pointsExcess} point{pointsExcess > 1 ? 's' : ''} to stay within maximum of {maxPoints}
            {/if}
        </p>
    </CardContent>
</Card> 