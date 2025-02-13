<script lang="ts">
    import { Button } from "$lib/components/ui/button";
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
            const [aut_brick, aut_lightbulb, aut_book] = await Promise.all([
                loadDataset('aut_brick'),
                loadDataset('aut_lightbulb'),
                loadDataset('aut_book')
            ]);
            
            datasets = {
                "Alternate Uses Task: Brick": aut_brick,
                "Alternate Uses Task: Lightbulb": aut_lightbulb,
                "Alternate Uses Task: Book": aut_book
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
    let examples = $derived(currentExamples);

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
            const batchSize = 10;
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

<div class="container mx-auto p-6 max-w-5xl">
    <!-- Header -->
    <div class="flex items-center gap-2 mb-6">
        <Brain class="h-6 w-6" />
        <h1 class="text-2xl font-bold">Classification Tool</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6">
        <!-- Left Column: Input and Controls -->
        <div class="space-y-6">
            <!-- Prompt Input Card -->
             <Card>
                <CardHeader>
                    <CardTitle>Dataset</CardTitle>
                    <CardDescription>Select the dataset you want to classify</CardDescription>
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

                    {#if description}
                        <div class="dataset-description">
                            <p class="text-xs">{description}</p>
                        </div>
                    {/if}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Input Text</CardTitle>
                    <CardDescription>Enter the text you want to classify</CardDescription>
                </CardHeader>
                <CardContent>
                    <PromptInput 
                        on:classify={handleClassify} 
                        disabledButtons={!!selectedDataset}
                    />
                </CardContent>
            </Card>
        </div>

        <!-- Right Column: Results and History -->
        <div class="space-y-6">
            <!-- Current Results Card -->
            <Card>
                <CardHeader>
                    <CardTitle>Results</CardTitle>
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
                        <CardTitle>History</CardTitle>
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
    .dataset-description {
        margin-bottom: 2rem;
        font-style: italic;
    }
</style>
