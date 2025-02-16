<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import SimpleHeader from '$lib/interface/SimpleHeader.svelte';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
    import { Separator } from "$lib/components/ui/separator";
    import { Brain, History, CheckCircle2, XCircle } from "lucide-svelte";
    import { classifyBatch } from "$lib/api";
    import { calculateMetrics } from "$lib/metrics";
    import { createPromptStore } from "$lib/storage.svelte";
    import { onMount } from 'svelte';
    import { loadDataset } from '$lib/data/datasetLoader';

    import PromptInput from "$lib/components/PromptInput.svelte";
    import ResultsDisplay from "$lib/components/ResultsDisplay.svelte";
    import HistoryDisplay from "$lib/components/HistoryDisplay.svelte";
	import type { PromptRunResultVsTruth } from "$lib/types";

    import * as Select from "$lib/components/ui/select";
    import * as Collapsible from "$lib/components/ui/collapsible";
    import { ChevronDown } from "lucide-svelte";
    import MisalignedH1 from '$lib/components/ui/misalignedText/MisalignedH1.svelte';

    let inProgress = $state(false);
    let error: string | null = $state(null);
    let completedBatches = $state(0);
    let totalBatches = $state(0);
    let isPaused = $state(false);
    let metrics: ValidationStats = $state({ rmse: null, pearsonR: null });

    const promptStore = createPromptStore();

    let datasets = $state({});
    let isLoading = $state(true);

    onMount(async () => {
        try {
            const [aut_brick, aut_box, aut_knife] = await Promise.all([
                loadDataset('aut_brick'),
                loadDataset('aut_box'),
                loadDataset('aut_knife')
            ]);
            
            datasets = {
                "Alternate Uses Task: Brick": aut_brick,
                "Alternate Uses Task: Box": aut_box,
                "Alternate Uses Task: Knife": aut_knife
            };
        } catch (error) {
            console.error('Failed to load datasets:', error);
        } finally {
            isLoading = false;
        }
    });

    // Update the derived values to handle the loading state
    let selectedDataset = $state(Object.keys(datasets)[0] || '');
    let currentExamples = $derived(datasets[selectedDataset]?.examples || [] as LabeledExample[]);
    let description = $derived(datasets[selectedDataset]?.description || '');
    let trainDataUrl = $derived(datasets[selectedDataset]?.train_data_url || '');

    // For the Select component
    let selected = $derived({
        value: selectedDataset,
        label: selectedDataset
    });

    async function handleClassify(event: CustomEvent<{ prompt: string; mode: 'quick' | 'full' }>) {
        const { prompt, mode } = event.detail;
        
        // Use the examples based on the mode that was clicked
        const selectedExamples = mode === 'quick' 
            ? currentExamples.slice(0, 20) 
            : currentExamples;
        
        // Reset state
        inProgress = true;
        error = null;
        completedBatches = 0;
        isPaused = false;
        metrics = { rmse: null, pearsonR: null };

        try {
            // Generate example texts based on mode
            const batchSize = 5;
            const batches = [];
            
            // Split examples into batches using the mode-specific examples
            for (let i = 0; i < selectedExamples.length; i += batchSize) {
                batches.push(selectedExamples.slice(i, i + batchSize));
            }
            
            totalBatches = batches.length;
            const allResults = [];
            const predictions: number[] = [];
            const actuals: number[] = [];
            const rawResponses: string[] = [];

            // Process each batch
            for (let i = 0; i < batches.length; i++) {
                const batchExamples = batches[i].map(example => ({ text: example.text }));
                const request = { prompt, examples: batchExamples };
                
                const response = await classifyBatch(request);
                allResults.push(...response.classifications);
                
                // Store raw responses
                rawResponses.push(response.metadata.rawResponse);
                
                response.classifications.forEach((result, idx) => {
                    predictions.push(result.score);
                    const actual = parseFloat(batches[i][idx].truth);
                    actuals.push(actual);
                });
                
                metrics = calculateMetrics(predictions, actuals);
                completedBatches = i + 1;
                
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            const results: PromptRunResultVsTruth[] = allResults.map((result, index) => ({
                text: result.text,
                score: result.score,
                truth: actuals[index]
            }));

            // After all batches are processed, save the run to history
            promptStore.saveRun({
                id: crypto.randomUUID(),
                prompt,
                mode,
                dataset: selectedDataset,
                metrics,
                timestamp: Date.now(),
                results,
                rawResponse: rawResponses.join('\n\n------\n\n')
            });

        } catch (e) {
            error = e instanceof Error ? e.message : 'An error occurred';
        } finally {
            inProgress = false;
        }
    }
</script>

<SimpleHeader />
<div class="container mx-auto p-6 max-w-5xl">
    <!-- Header -->
    <div class="flex items-center gap-2 mb-6">
        <Brain class="h-6 w-6" />
        <MisalignedH1 class_name="text-2xl font-bold josefin-sans-gfont">
            Classification Tool
        </MisalignedH1>
        <a href="/labs/classification" class="workbench-gfont text-sm text-muted-foreground hover:underline ml-2">
            View Lab Details  →
        </a>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6">
        <!-- Left Column: Input and Controls -->
        <div class="space-y-6">
            <!-- Prompt Input Card -->
             <Card>
                <CardHeader>
                    <CardTitle class="josefin-sans-gfont">Dataset</CardTitle>
                </CardHeader>
                <CardContent>
                    {#if isLoading}
                        <p>Loading datasets...</p>
                    {:else}
                        <Select.Root
                            selected={selected}
                            onSelectedChange={(v) => {
                                if (v) selectedDataset = v.value;
                            }}
                        >
                            <Select.Trigger>
                                <Select.Value placeholder="Select a dataset" />
                            </Select.Trigger>
                            <Select.Content>
                                <Select.Group>
                                    <Select.Label>Available Datasets</Select.Label>
                                    {#each Object.keys(datasets) as dataset}
                                        <Select.Item 
                                            value={dataset}
                                            label={dataset}
                                        >
                                            {dataset}
                                        </Select.Item>
                                    {/each}
                                </Select.Group>
                            </Select.Content>
                        </Select.Root>
                    {/if}
                    {#if trainDataUrl}
                        <a href={trainDataUrl} target="_blank" class="text-xs text-muted-foreground hover:underline">
                            View train data (you can peek at this in writing your prompt) →
                        </a>
                    {/if}

                    {#if description}
                        <Collapsible.Root class="mt-4">
                            <div class="flex items-center space-x-2">
                                <Collapsible.Trigger
                                    class="flex items-center gap-2 text-xs hover:underline"
                                >
                                    <span>Show dataset description</span>
                                    <ChevronDown class="h-4 w-4" />
                                </Collapsible.Trigger>
                            </div>
                            <Collapsible.Content class="mt-2">
                                <div class="dataset-description">
                                    <p class="text-xs">{description}</p>
                                    
                                    
                                </div>
                            </Collapsible.Content>
                        </Collapsible.Root>
                    {/if}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle class="josefin-sans-gfont">Input Text</CardTitle>
                    <CardDescription>Enter the text you want to classify</CardDescription>
                </CardHeader>
                <CardContent>
                    <PromptInput 
                        on:classify={handleClassify} 
                        disabledButtons={!!selectedDataset}
                    />
                </CardContent>
            </Card>

            <!-- Classification Details Card -->
            <Card>
                <CardHeader>
                    <CardTitle class="josefin-sans-gfont">Classification Setup Details</CardTitle>
                    <CardDescription>Important information about the classification process</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul class="text-sm space-y-2">
                        <li>Examples are processed in batches of 5</li>
                        <li>Classification uses the `gpt-4o-mini` model</li>
                        <li>Each batch has a 30-second timeout</li>
                        <li class="text-muted-foreground text-xs mt-2">Note: Prompts requesting very long outputs may result in timeout errors</li>
                    </ul>
                </CardContent>
            </Card>
        </div>

        <!-- Right Column: Results and History -->
        <div class="space-y-6">
            <!-- Current Results Card -->
            <Card>
                <CardHeader>
                    <CardTitle class="josefin-sans-gfont">Results</CardTitle>
                    <CardDescription>Current classification results</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResultsDisplay 
                        {error}
                        {isPaused}
                        {inProgress}
                        {completedBatches}
                        {totalBatches}
                        {metrics}
                    />
                </CardContent>
            </Card>

            <!-- History Card -->
            <Card>
                <CardHeader>
                    <div class="flex items-center justify-between">
                        <CardTitle class="josefin-sans-gfont">History</CardTitle>
                        <History class="h-5 w-5 text-muted-foreground" />
                    </div>
                </CardHeader>
                <CardContent>
                    <HistoryDisplay />
                </CardContent>
            </Card>
        </div>
    </div>
</div>

<style>

</style>
