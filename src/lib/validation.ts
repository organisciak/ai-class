import type { ClassifyRequest, ClassifyResponse } from './types';

/**
 * Splits an array into batches of specified size
 * @param array Array to split into batches
 * @param batchSize Size of each batch
 * @returns Array of batches
 */
export function splitIntoBatches<T>(array: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < array.length; i += batchSize) {
        batches.push(array.slice(i, i + batchSize));
    }
    return batches;
}

/**
 * Creates a classify request for a batch of examples
 * @param prompt The LLM prompt to use
 * @param examples Array of example texts to classify
 * @returns ClassifyRequest object
 */
export function createBatchRequest(prompt: string, examples: string[]): ClassifyRequest {
    return {
        prompt,
        examples: examples.map(text => ({ text }))
    };
}

/**
 * Simulates processing delay for development/testing
 * @param ms Milliseconds to delay
 */
export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
