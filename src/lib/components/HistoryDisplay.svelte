<script lang="ts">
    import { ScrollArea } from "$lib/components/ui/scroll-area";
    import { Button } from "$lib/components/ui/button";
    import { Clock, Trash2, ChevronDown } from "lucide-svelte";
    import { createPromptStore } from "$lib/storage.svelte";
    import * as Collapsible from "$lib/components/ui/collapsible";

    const promptStore = createPromptStore();
    let history = $state([]);
    let expandedId = $state<string | null>(null);

    $effect(() => {
        history = promptStore.getHistory()
            .map(run => ({
                id: run.id,
                prompt: run.prompt,
                mode: run.mode,
                metrics: run.metrics,
                timestamp: new Date(run.timestamp).toLocaleString(),
                failedCount: run.results ? run.results.filter(r => r.score === null).length : 0
            }))
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    });

    function clearHistory() {
        promptStore.clearHistory();
    }

    function toggleExpand(id: string) {
        expandedId = expandedId === id ? null : id;
    }
</script>

<div class="space-y-4">
    <div class="flex justify-end">
        <Button variant="ghost" size="sm" on:click={clearHistory}>
            <Trash2 class="h-4 w-4 mr-2" />
            Clear History
        </Button>
    </div>
    
    <ScrollArea class="h-[300px]">
        <div class="space-y-4">
            {#each history as item}
                <Collapsible.Root>
                    <div class="p-3 border rounded-lg hover:bg-muted transition-colors">
                        <div class="flex justify-between items-start mb-2">
                            <span class="font-medium">{item.mode} run</span>
                            <div class="flex items-center gap-2">
                                <div class="flex items-center text-sm text-muted-foreground">
                                    <Clock class="h-3 w-3 mr-1" />
                                    {item.timestamp}
                                </div>
                                <Collapsible.Trigger asChild let:builder>
                                    <Button builders={[builder]} variant="ghost" size="sm" class="h-6 w-6 p-0">
                                        <ChevronDown class="h-4 w-4" />
                                        <span class="sr-only">Toggle</span>
                                    </Button>
                                </Collapsible.Trigger>
                            </div>
                        </div>
                        <Collapsible.Content>
                            <p class="text-sm text-muted-foreground">
                                <span class="font-medium">Your Prompt:</span>
                                {item.prompt}
                            </p>
                        </Collapsible.Content>
                        {#if item.metrics.rmse !== null}
                            <div class="mt-2 text-sm text-muted-foreground">
                                RMSE: {item.metrics.rmse.toFixed(3)}
                                {#if item.metrics.pearsonR !== null}
                                    • R: {item.metrics.pearsonR.toFixed(3)}
                                {/if}
                                {#if item.failedCount > 0}
                                    • Failed: {item.failedCount}
                                {/if}
                            </div>
                        {/if}
                    </div>
                </Collapsible.Root>
            {/each}
        </div>
    </ScrollArea>
</div> 