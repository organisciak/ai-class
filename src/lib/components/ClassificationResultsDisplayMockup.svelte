<script lang="ts">
    import { Progress } from "$lib/components/ui/progress";
    import { Badge } from "$lib/components/ui/badge";

    // Example data structure
    interface ClassificationResult {
        category: string;
        confidence: number;
    }

    let results: ClassificationResult[] = [
        { category: "Category A", confidence: 85 },
        { category: "Category B", confidence: 45 },
        { category: "Category C", confidence: 30 }
    ];
</script>

<div class="space-y-4">
    {#each results as result}
        <div class="space-y-2">
            <div class="flex justify-between items-center">
                <span class="font-medium">{result.category}</span>
                <Badge variant={result.confidence > 50 ? "default" : "secondary"}>
                    {result.confidence}%
                </Badge>
            </div>
            <Progress value={result.confidence} />
        </div>
    {/each}
</div> 