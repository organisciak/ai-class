<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
    import { Separator } from "$lib/components/ui/separator";
    import { Brain, History, CheckCircle2, XCircle } from "lucide-svelte";
    import { classifyBatch } from "$lib/api";
    import { calculateMetrics } from "$lib/metrics";
    import { createPromptStore } from "$lib/storage.svelte";

    import PromptInput from "$lib/components/PromptInput.svelte";
    import ResultsDisplay from "$lib/components/ResultsDisplay.svelte";
    import HistoryDisplay from "$lib/components/HistoryDisplay.svelte";
	import type { PromptRunResultVsTruth } from "$lib/types";

    let inProgress = $state(false);
    let error: string | null = $state(null);
    let completedBatches = $state(0);
    let totalBatches = $state(0);
    let isPaused = $state(false);
    let metrics: ValidationStats = $state({ rmse: null, pearsonR: null });

    const promptStore = createPromptStore();

    async function handleClassify(event: CustomEvent<{ prompt: string; mode: 'quick' | 'full' }>) {
        const { prompt, mode } = event.detail;
        
        // Reset state
        inProgress = true;
        error = null;
        completedBatches = 0;
        isPaused = false;
        metrics = { rmse: null, pearsonR: null };

        try {
            // Generate example texts based on mode
            const examples = Array.from(
                { length: mode === 'quick' ? 4 : 20 },
                (_, i) => `Example ${i + 1}`
            );

            const batchSize = 2;
            const batches = [];
            
            // Split examples into batches
            for (let i = 0; i < examples.length; i += batchSize) {
                batches.push(examples.slice(i, i + batchSize));
            }
            
            totalBatches = batches.length;
            const allResults = [];
            const predictions: number[] = [];
            const actuals: number[] = [];

            // Process each batch
            for (let i = 0; i < batches.length; i++) {
                const batchExamples = batches[i].map(text => ({ text }));
                const request = { prompt, examples: batchExamples };
                
                const response = await classifyBatch(request);
                allResults.push(...response.classifications);
                
                // Update metrics for each batch
                response.classifications.forEach(result => {
                    predictions.push(result.score);
                    // Generate random actual value between 0 and 1 for testing
                    const actual = Math.random();
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
                metrics,
                timestamp: Date.now(),
                results
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

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Left Column: Input and Controls -->
        <div class="space-y-6">
            <!-- Prompt Input Card -->
            <Card>
                <CardHeader>
                    <CardTitle>Input Text</CardTitle>
                    <CardDescription>Enter the text you want to classify</CardDescription>
                </CardHeader>
                <CardContent>
                    <PromptInput on:classify={handleClassify} />
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
