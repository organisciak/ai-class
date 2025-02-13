/**
 * Example text to be classified
 */
export interface Example {
    text: string;
}

/**
 * Request format for classification
 */
export interface ClassifyRequest {
    prompt: string;
    examples: Example[];
}

/**
 * Classification result for a single example
 */
export interface Classification {
    text: string;
    score: number | null;
}

/**
 * Response format from classification
 */
export interface ClassifyResponse {
    classifications: Classification[];
    metadata: {
        rawResponse: string;
        fullPrompt: string;
        originalPrompt: string;
    };
}

/**
 * Metrics for evaluating prompt performance
 */
export interface PromptMetrics {
    rmse: number;
    pearsonR: number;
}

export interface PromptRunResultVsTruth {
    text: string;
    score: number | null;
    truth: number | null;
}

/**
 * Record of a single prompt evaluation run
 */
export interface PromptRun {
    id?: string;
    timestamp: number;
    prompt: string;
    mode: "quick" | "full";
    metrics: PromptMetrics;
    results: PromptRunResultVsTruth[];
}
