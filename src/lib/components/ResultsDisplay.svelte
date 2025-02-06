<script lang="ts">
    import { Progress } from "$lib/components/ui/progress";
    import { Badge } from "$lib/components/ui/badge";
    import { Loader2, AlertCircle, Pause } from "lucide-svelte";

    interface RegressionResult {
        metric: string;
        value: number | null;
        isGood: boolean;
    }

    export let completedBatches: number = 0;
    export let totalBatches: number = 0;
    export let inProgress: boolean = false;
    export let error: string | null = null;
    export let isPaused: boolean = false;
    export let metrics: { rmse: number | null; pearsonR: number | null };

    $: results = [
        { 
            metric: "RMSE", 
            value: metrics.rmse, 
            isGood: metrics.rmse !== null && metrics.rmse < 0.5 
        },
        { 
            metric: "Pearson r", 
            value: metrics.pearsonR, 
            isGood: metrics.pearsonR !== null && metrics.pearsonR > 0.7 
        }
    ];
</script>

<div class="space-y-4">
    <!-- Batch Progress -->
    {#if totalBatches > 0}
        <div class="space-y-2">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                    {#if error}
                        <AlertCircle class="h-4 w-4 text-destructive" />
                    {:else if isPaused}
                        <Pause class="h-4 w-4 text-muted-foreground" />
                    {:else if inProgress}
                        <Loader2 class="h-4 w-4 animate-spin" />
                    {/if}
                    <span class="font-medium">
                        {#if error}
                            Error: {error}
                        {:else if isPaused}
                            Processing Paused
                        {:else}
                            Processing Batches
                        {/if}
                    </span>
                </div>
                <Badge variant={error ? "destructive" : "secondary"}>
                    {completedBatches}/{totalBatches}
                </Badge>
            </div>
            <Progress 
                value={(completedBatches / totalBatches) * 100} 
                class={error ? "bg-destructive/25" : isPaused ? "opacity-50" : ""}
            />
        </div>
    {/if}

    <!-- Metrics -->
    {#each results as result}
        <div class="space-y-2">
            <div class="flex justify-between items-center">
                <span class="font-medium">{result.metric}</span>
                <Badge 
                    variant={inProgress ? "secondary" : (result.isGood ? "default" : "destructive")}
                    class={inProgress ? "opacity-50" : ""}
                >
                    {result.value === null ? '-' : result.value.toFixed(3)}
                </Badge>
            </div>
        </div>
    {/each}
</div> 