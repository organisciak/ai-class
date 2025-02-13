<script lang="ts">
    import { ScrollArea } from "$lib/components/ui/scroll-area";
    import { Button } from "$lib/components/ui/button";
    import { Clock, Trash2, ChevronDown, AlertTriangle, ClipboardCopy } from "lucide-svelte";
    import { createPromptStore } from "$lib/storage.svelte";
    import * as Collapsible from "$lib/components/ui/collapsible";
    import * as Tabs from "$lib/components/ui/tabs";

    const store = createPromptStore();
    let currentHistory = $state([]);
    
    // Subscribe to store changes
    store.subscribe(h => {
        currentHistory = h;
    });
    
    // Derive the processed history
    let history = $derived(currentHistory
        .map(run => ({
            id: run.id,
            prompt: run.prompt,
            mode: run.mode,
            metrics: run.metrics,
            timestamp: new Date(run.timestamp).toLocaleString('en-US', {
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: false
            }),
            results: run.results,
            rawResponse: run.rawResponse,
            failedCount: run.results ? run.results.filter(r => r.score === null).length : 0,
            dataset: run.dataset
        }))
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    );

    function clearHistory() {
        store.clearHistory();
    }

    function formatHistoryItem(item) {
        const metrics = item.metrics;
        return `----
dataset: ${item.dataset}
mode: ${item.mode}
rmse: ${metrics.rmse !== null ? metrics.rmse.toFixed(3) : 'N/A'}
r: ${metrics.pearsonR !== null ? metrics.pearsonR.toFixed(3) : 'N/A'}
failures: ${item.failedCount}
----
${item.prompt}`;
    }

    async function copyToClipboard(item) {
        const text = formatHistoryItem(item);
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }
</script>

<div class="space-y-4">
    
    <ScrollArea class="h-[300px]">
        <div class="space-y-4">
            {#each history as item}
                <Collapsible.Root>
                    <div class="p-3 border rounded-lg hover:bg-muted transition-colors">
                        <div class="flex justify-between items-start mb-2">
                            <div class="flex flex-col">
                                <span class="text-sm font-medium">{item.dataset} ({item.mode})</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="flex items-center text-xs text-muted-foreground">
                                    <Clock class="h-3 w-3 mr-1" />
                                    {item.timestamp}
                                </div>
                                <Button variant="ghost" size="sm" class="h-6 w-6 p-0" on:click={() => copyToClipboard(item)}>
                                    <ClipboardCopy class="h-4 w-4" />
                                    <span class="sr-only">Copy to clipboard</span>
                                </Button>
                                <Collapsible.Trigger asChild let:builder>
                                    <Button builders={[builder]} variant="ghost" size="sm" class="h-6 w-6 p-0">
                                        <ChevronDown class="h-4 w-4" />
                                        <span class="sr-only">Toggle</span>
                                    </Button>
                                </Collapsible.Trigger>
                            </div>
                        </div>
                        <Collapsible.Content>
                            <Tabs.Root value="prompt" class="w-full">
                                <Tabs.List>
                                    <Tabs.Trigger value="prompt">Your Prompt</Tabs.Trigger>
                                    <Tabs.Trigger value="results">Results</Tabs.Trigger>
                                    <Tabs.Trigger value="raw">Raw LLM Response</Tabs.Trigger>
                                </Tabs.List>
                                <Tabs.Content value="prompt">
                                    <p class="text-sm text-muted-foreground mt-2">
                                        {item.prompt}
                                    </p>
                                </Tabs.Content>
                                <Tabs.Content value="results">
                                    <div class="space-y-2 mt-2">
                                        {#each item.results as result}
                                            <div class="flex flex-col gap-1 p-2 border rounded">
                                                <div class="flex justify-between">
                                                    <span class="text-sm font-medium">Example</span>
                                                    <span class="text-sm text-muted-foreground flex items-center gap-1">
                                                        {#if result.score === null}
                                                            <AlertTriangle class="h-4 w-4 text-warning" />
                                                            Score: N/A
                                                        {:else}
                                                            Score: {result.score.toFixed(3)}
                                                        {/if}
                                                    </span>
                                                </div>
                                                <p class="text-sm">{result.text}</p>
                                                {#if result.truth}
                                                    <div class="mt-1">
                                                        <span class="text-sm font-medium">Ground Truth</span>
                                                        <p class="text-sm text-muted-foreground">{result.truth}</p>
                                                    </div>
                                                {/if}
                                            </div>
                                        {/each}
                                    </div>
                                </Tabs.Content>
                                <Tabs.Content value="raw">
                                    <div class="mt-2">
                                        <pre class="text-xs bg-muted p-2 rounded overflow-x-auto whitespace-pre-wrap">
                                            {item.rawResponse}
                                        </pre>
                                    </div>
                                </Tabs.Content>
                            </Tabs.Root>
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

    <div class='border-t pt-2'>
        <p class="text-sm text-muted-foreground">Refresh the page to see the latest history.</p>
        <p class="text-sm text-muted-foreground">Click <ClipboardCopy class="h-4 w-4 inline-block" /> to copy the results to your clipboard.</p>
    </div>

    <div class="flex justify-end">
        <Button variant="ghost" size="sm" on:click={clearHistory}>
            <Trash2 class="h-4 w-4 mr-2" />
            Clear History
        </Button>
    </div>
</div> 