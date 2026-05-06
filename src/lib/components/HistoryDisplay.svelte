<script lang="ts">
    import { ScrollArea } from "$lib/components/ui/scroll-area";
    import { Button } from "$lib/components/ui/button";
    import { Badge } from "$lib/components/ui/badge";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Clock, Trash2, ChevronDown, AlertTriangle, ClipboardCopy, Maximize2, X } from "lucide-svelte";
    import { createPromptStore } from "$lib/storage.svelte";
    import type { PromptRun, PromptRunResultVsTruth } from "$lib/types";
    import * as Collapsible from "$lib/components/ui/collapsible";
    import * as Tabs from "$lib/components/ui/tabs";

    let { availableDatasets = [] }: { availableDatasets?: string[] } = $props();

    type ModeFilter = 'all' | 'quick' | 'full';
    type HistoryItem = Omit<PromptRun, 'timestamp'> & {
        rawTimestamp: number;
        timestamp: string;
        promptLength: number;
        failedCount: number;
        qualityLabel: string;
    };

    const store = createPromptStore();
    const AUTO_OPEN_KEY = 'ai-prompt-scorer-auto-open-details';
    let currentHistory = $state<PromptRun[]>([]);
    let modeFilter = $state<ModeFilter>('all');
    let datasetFilter = $state('all');
    let isModalOpen = $state(false);
    let selectedRunId = $state<string | null>(null);
    let autoOpenDetails = $state(true);
    let lastSeenRunId = $state<string | null>(null);
    let hasSeenInitialHistory = $state(false);

    store.subscribe((historyRuns) => {
        const newestRunId = historyRuns[0]?.id ?? null;

        currentHistory = historyRuns;

        if (!hasSeenInitialHistory) {
            lastSeenRunId = newestRunId;
            hasSeenInitialHistory = true;
            return;
        }

        if (autoOpenDetails && newestRunId && newestRunId !== lastSeenRunId) {
            selectedRunId = newestRunId;
            isModalOpen = true;
        }

        lastSeenRunId = newestRunId;
    });

    $effect(() => {
        if (typeof localStorage === 'undefined') return;
        autoOpenDetails = localStorage.getItem(AUTO_OPEN_KEY) !== 'false';
    });

    let datasets = $derived([
        'all',
        ...Array.from(new Set([...availableDatasets, ...currentHistory.map((run) => run.dataset)])).sort()
    ]);

    let history = $derived(currentHistory
        .map((run) => toHistoryItem(run))
        .sort((a, b) => b.rawTimestamp - a.rawTimestamp)
    );

    let filteredHistory = $derived(history.filter((item) => {
        const modeMatches = modeFilter === 'all' || item.mode === modeFilter;
        const datasetMatches = datasetFilter === 'all' || item.dataset === datasetFilter;
        return modeMatches && datasetMatches;
    }));

    let selectedRun = $derived(filteredHistory.find((item) => item.id === selectedRunId) ?? filteredHistory[0] ?? null);

    function toHistoryItem(run: PromptRun): HistoryItem {
        const failedCount = run.results?.filter((result: PromptRunResultVsTruth) => result.score === null).length ?? 0;
        return {
            ...run,
            rawTimestamp: run.timestamp,
            timestamp: new Date(run.timestamp).toLocaleString('en-US', {
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: false
            }),
            promptLength: run.prompt.length,
            failedCount,
            qualityLabel: formatQuality(run, failedCount)
        };
    }

    function formatQuality(run: PromptRun, failedCount: number): string {
        if (failedCount > 0) return `${failedCount} failed`;
        if (run.metrics.rmse !== null) return `RMSE ${run.metrics.rmse.toFixed(3)}`;
        if (run.metrics.pearsonR !== null) return `R ${run.metrics.pearsonR.toFixed(3)}`;
        return 'No score';
    }

    function clearHistory() {
        store.clearHistory();
        selectedRunId = null;
    }

    function deleteRun(item: HistoryItem) {
        if (!item.id) return;

        if (selectedRunId === item.id) {
            selectedRunId = null;
        }

        store.deleteRun(item.id);
    }

    function setAutoOpenDetails(value: boolean) {
        autoOpenDetails = value;
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(AUTO_OPEN_KEY, String(value));
        }
    }

    function updateNote(item: HistoryItem, event: Event) {
        if (!item.id) return;
        const target = event.currentTarget as HTMLTextAreaElement;
        store.updateRunNote(item.id, target.value);
    }

    function formatHistoryItem(item: HistoryItem) {
        const metrics = item.metrics;
        return `----
dataset: ${item.dataset}
mode: ${item.mode}
time: ${item.timestamp}
prompt_length: ${item.promptLength}
rmse: ${metrics.rmse !== null ? metrics.rmse.toFixed(3) : 'N/A'}
r: ${metrics.pearsonR !== null ? metrics.pearsonR.toFixed(3) : 'N/A'}
failures: ${item.failedCount}
note: ${item.note || ''}
----
${item.prompt}`;
    }

    async function copyToClipboard(item: HistoryItem) {
        const text = formatHistoryItem(item);
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }

    function openDetails(item?: HistoryItem) {
        selectedRunId = item?.id ?? filteredHistory[0]?.id ?? null;
        isModalOpen = true;
    }

    function filterButtonClass(active: boolean) {
        return active ? 'h-7 px-2 text-xs' : 'h-7 px-2 text-xs text-muted-foreground';
    }
</script>

<div class="space-y-4">
    <div class="space-y-3">
        <div>
            <div class="mb-1 text-xs font-medium text-muted-foreground">Mode</div>
            <div class="flex flex-wrap gap-1">
                {#each ['all', 'quick', 'full'] as mode}
                    <Button
                        variant={modeFilter === mode ? 'default' : 'outline'}
                        size="sm"
                        class={filterButtonClass(modeFilter === mode)}
                        on:click={() => modeFilter = mode as ModeFilter}
                    >
                        {mode}
                    </Button>
                {/each}
            </div>
        </div>

        <div>
            <div class="mb-1 text-xs font-medium text-muted-foreground">Task</div>
            <div class="flex flex-wrap gap-1">
                {#each datasets as dataset}
                    <Button
                        variant={datasetFilter === dataset ? 'default' : 'outline'}
                        size="sm"
                        class={filterButtonClass(datasetFilter === dataset)}
                        on:click={() => datasetFilter = dataset}
                    >
                        {dataset === 'all' ? 'all' : dataset.replace('Alternate Uses Task: ', '')}
                    </Button>
                {/each}
            </div>
        </div>
    </div>

    <div class="flex items-center justify-between border-t pt-3">
        <div class="text-xs text-muted-foreground">{filteredHistory.length} run{filteredHistory.length === 1 ? '' : 's'}</div>
        <Button variant="outline" size="sm" class="h-7 px-2 text-xs" on:click={() => openDetails()}>
            <Maximize2 class="mr-1 h-3.5 w-3.5" />
            Details
        </Button>
    </div>

    <ScrollArea class="h-[360px]">
        <div class="space-y-3">
            {#each filteredHistory as item}
                <Collapsible.Root>
                    <div class="rounded-lg border p-3 transition-colors hover:bg-muted">
                        <div class="mb-2 flex items-start justify-between gap-2">
                            <div class="min-w-0">
                                <div class="truncate text-sm font-medium">{item.dataset}</div>
                                <div class="mt-1 flex flex-wrap items-center gap-1">
                                    <Badge variant={item.mode === 'quick' ? 'secondary' : 'default'}>{item.mode}</Badge>
                                    <Badge variant={item.failedCount > 0 ? 'destructive' : 'outline'}>{item.qualityLabel}</Badge>
                                </div>
                            </div>
                            <div class="flex items-center gap-1">
                                <Button variant="ghost" size="sm" class="h-6 w-6 p-0" on:click={() => openDetails(item)}>
                                    <Maximize2 class="h-4 w-4" />
                                    <span class="sr-only">Open details</span>
                                </Button>
                                <Button variant="ghost" size="sm" class="h-6 w-6 p-0" on:click={() => copyToClipboard(item)}>
                                    <ClipboardCopy class="h-4 w-4" />
                                    <span class="sr-only">Copy to clipboard</span>
                                </Button>
                                <Button variant="ghost" size="sm" class="h-6 w-6 p-0" on:click={() => deleteRun(item)}>
                                    <Trash2 class="h-4 w-4" />
                                    <span class="sr-only">Delete run</span>
                                </Button>
                                <Collapsible.Trigger asChild let:builder>
                                    <Button builders={[builder]} variant="ghost" size="sm" class="h-6 w-6 p-0">
                                        <ChevronDown class="h-4 w-4" />
                                        <span class="sr-only">Toggle</span>
                                    </Button>
                                </Collapsible.Trigger>
                            </div>
                        </div>

                        <div class="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock class="h-3 w-3" />
                            {item.timestamp}
                            <span>•</span>
                            <span>{item.promptLength} chars</span>
                        </div>

                        {#if item.note}
                            <p class="mt-2 line-clamp-2 text-xs text-muted-foreground">{item.note}</p>
                        {/if}

                        <Collapsible.Content>
                            <Tabs.Root value="prompt" class="mt-3 w-full">
                                <Tabs.List>
                                    <Tabs.Trigger value="prompt">Prompt</Tabs.Trigger>
                                    <Tabs.Trigger value="results">Results</Tabs.Trigger>
                                    <Tabs.Trigger value="note">Note</Tabs.Trigger>
                                    <Tabs.Trigger value="raw">Raw</Tabs.Trigger>
                                </Tabs.List>
                                <Tabs.Content value="prompt">
                                    <p class="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{item.prompt}</p>
                                </Tabs.Content>
                                <Tabs.Content value="results">
                                    <div class="mt-2 space-y-2">
                                        {#each item.results.slice(0, 8) as result}
                                            <div class="rounded border p-2">
                                                <div class="flex justify-between gap-2">
                                                    <span class="text-sm font-medium">Example</span>
                                                    <span class="flex items-center gap-1 text-sm text-muted-foreground">
                                                        {#if result.score === null}
                                                            <AlertTriangle class="h-4 w-4 text-warning" />
                                                            Score: N/A
                                                        {:else}
                                                            Score: {result.score.toFixed(3)}
                                                        {/if}
                                                    </span>
                                                </div>
                                                <p class="mt-1 text-sm">{result.text}</p>
                                                {#if result.truth != null}
                                                    <p class="mt-1 text-xs text-muted-foreground">Truth: {result.truth}</p>
                                                {/if}
                                            </div>
                                        {/each}
                                        {#if item.results.length > 8}
                                            <p class="text-xs text-muted-foreground">Showing 8 of {item.results.length}; open details for the full table.</p>
                                        {/if}
                                    </div>
                                </Tabs.Content>
                                <Tabs.Content value="note">
                                    <Textarea
                                        value={item.note ?? ''}
                                        on:input={(event) => updateNote(item, event)}
                                        placeholder="Add a note about what worked, failed, or changed in this run."
                                        class="mt-2 min-h-[120px]"
                                    />
                                </Tabs.Content>
                                <Tabs.Content value="raw">
                                    <pre class="mt-2 overflow-x-auto whitespace-pre-wrap rounded bg-muted p-2 text-xs">{item.rawResponse}</pre>
                                </Tabs.Content>
                            </Tabs.Root>
                        </Collapsible.Content>
                    </div>
                </Collapsible.Root>
            {:else}
                <div class="rounded-lg border p-3 text-sm text-muted-foreground">No matching runs yet.</div>
            {/each}
        </div>
    </ScrollArea>

    <div class='border-t pt-2'>
        <p class="text-sm text-muted-foreground">History updates automatically after each run.</p>
        <p class="text-sm text-muted-foreground">Use <ClipboardCopy class="inline-block h-4 w-4" /> to copy a run summary.</p>
    </div>

    <div class="flex justify-end">
        <Button variant="ghost" size="sm" on:click={clearHistory}>
            <Trash2 class="mr-2 h-4 w-4" />
            Clear History
        </Button>
    </div>
</div>

{#if isModalOpen}
    <div class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" role="presentation" onclick={() => isModalOpen = false}></div>
    <div class="fixed left-1/2 top-1/2 z-50 flex max-h-[88vh] w-[min(1120px,92vw)] -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg border bg-background shadow-lg">
        <div class="flex items-center justify-between border-b px-5 py-4">
            <div>
                <h2 class="text-lg font-semibold">Run History Details</h2>
                <p class="text-sm text-muted-foreground">Facet by task and mode, then inspect prompt length, timing, quality, notes, and per-example results.</p>
            </div>
            <Button variant="ghost" size="sm" class="h-8 w-8 p-0" on:click={() => isModalOpen = false}>
                <X class="h-4 w-4" />
                <span class="sr-only">Close</span>
            </Button>
        </div>

        <div class="space-y-4 overflow-y-auto p-5">
            <div class="overflow-x-auto rounded-lg border">
                <table class="w-full text-left text-sm">
                    <thead class="bg-muted text-xs uppercase text-muted-foreground">
                        <tr>
                            <th class="px-3 py-2">Time</th>
                            <th class="px-3 py-2">Task</th>
                            <th class="px-3 py-2">Mode</th>
                            <th class="px-3 py-2 text-right">Prompt Chars</th>
                            <th class="px-3 py-2">Quality</th>
                            <th class="px-3 py-2 text-right">RMSE</th>
                            <th class="px-3 py-2 text-right">R</th>
                            <th class="px-3 py-2 text-right">Failed</th>
                            <th class="px-3 py-2">Note</th>
                            <th class="px-3 py-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each filteredHistory as item}
                            <tr
                                class={`cursor-pointer border-t hover:bg-muted/60 ${selectedRun?.id === item.id ? 'bg-muted' : ''}`}
                                onclick={() => selectedRunId = item.id ?? null}
                            >
                                <td class="whitespace-nowrap px-3 py-2">{item.timestamp}</td>
                                <td class="px-3 py-2">{item.dataset}</td>
                                <td class="px-3 py-2">{item.mode}</td>
                                <td class="px-3 py-2 text-right tabular-nums">{item.promptLength}</td>
                                <td class="px-3 py-2">{item.qualityLabel}</td>
                                <td class="px-3 py-2 text-right tabular-nums">{item.metrics.rmse === null ? '-' : item.metrics.rmse.toFixed(3)}</td>
                                <td class="px-3 py-2 text-right tabular-nums">{item.metrics.pearsonR === null ? '-' : item.metrics.pearsonR.toFixed(3)}</td>
                                <td class="px-3 py-2 text-right tabular-nums">{item.failedCount}</td>
                                <td class="max-w-[220px] truncate px-3 py-2">{item.note || '-'}</td>
                                <td class="px-3 py-2 text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        class="h-7 w-7 p-0"
                                        on:click={(event) => {
                                            event.stopPropagation();
                                            deleteRun(item);
                                        }}
                                    >
                                        <Trash2 class="h-4 w-4" />
                                        <span class="sr-only">Delete run</span>
                                    </Button>
                                </td>
                            </tr>
                        {:else}
                            <tr>
                                <td colspan="10" class="px-3 py-6 text-center text-muted-foreground">No matching runs.</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>

            {#if selectedRun}
                <div class="grid gap-4 lg:grid-cols-[1fr_1fr]">
                    <div class="space-y-3">
                        <div>
                            <h3 class="text-sm font-semibold">Selected Run</h3>
                            <p class="text-xs text-muted-foreground">{selectedRun.dataset} • {selectedRun.mode} • {selectedRun.timestamp}</p>
                        </div>
                        <Textarea
                            value={selectedRun.note ?? ''}
                            on:input={(event) => updateNote(selectedRun, event)}
                            placeholder="Add or edit your note for this run."
                            class="min-h-[120px]"
                        />
                        <pre class="max-h-[220px] overflow-y-auto whitespace-pre-wrap rounded border bg-muted p-3 text-xs">{selectedRun.prompt}</pre>
                    </div>

                    <div class="overflow-x-auto rounded-lg border">
                        <table class="w-full text-left text-sm">
                            <thead class="bg-muted text-xs uppercase text-muted-foreground">
                                <tr>
                                    <th class="px-3 py-2">Example</th>
                                    <th class="px-3 py-2 text-right">Score</th>
                                    <th class="px-3 py-2 text-right">Truth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each selectedRun.results as result}
                                    <tr class="border-t">
                                        <td class="px-3 py-2">{result.text}</td>
                                        <td class="px-3 py-2 text-right tabular-nums">{result.score === null ? '-' : result.score.toFixed(3)}</td>
                                        <td class="px-3 py-2 text-right tabular-nums">{result.truth ?? '-'}</td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            {/if}

            <div class="flex items-center justify-between border-t pt-4">
                <label class="flex items-center gap-2 text-sm text-muted-foreground">
                    <input
                        type="checkbox"
                        class="h-4 w-4"
                        checked={autoOpenDetails}
                        onchange={(event) => setAutoOpenDetails((event.currentTarget as HTMLInputElement).checked)}
                    />
                    Open this details view automatically after each run
                </label>
                <Button variant="ghost" size="sm" on:click={clearHistory}>
                    <Trash2 class="mr-2 h-4 w-4" />
                    Clear History
                </Button>
            </div>
        </div>
    </div>
{/if}
