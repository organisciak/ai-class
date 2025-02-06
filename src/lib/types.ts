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
    score: number;
}

/**
 * Response format from classification
 */
export interface ClassifyResponse {
    classifications: Classification[];
}

/**
 * Metrics for evaluating prompt performance
 */
export interface PromptMetrics {
    rmse: number;
    pearsonR: number;
}

/**
 * Record of a single prompt evaluation run
 */
export interface PromptRun {
    timestamp: number;
    prompt: string;
    metrics: PromptMetrics;
}
