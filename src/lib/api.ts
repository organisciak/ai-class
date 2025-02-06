import type { ClassifyRequest, ClassifyResponse } from './types';
import { splitIntoBatches, createBatchRequest, delay } from './validation';

/**
 * Makes the actual API request to the server endpoint
 * @param request The classification request data
 * @returns Promise containing the API response
 */
export async function classifyBatch(request: ClassifyRequest): Promise<ClassifyResponse> {
    const apiUrl = `/api/classify`;
    
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText} (${response.status})`);
    }

    return response.json();
}

/**
 * Error handler wrapper for API calls
 * @param prompt The LLM prompt
 * @param examples Array of examples to classify
 * @returns Promise containing the classification results
 */
export async function classifyWithRetry(
    prompt: string,
    examples: Array<{ text: string }>,
    maxRetries = 3
): Promise<ClassifyResponse> {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            console.log(`Classification attempt ${attempt + 1}/${maxRetries}`);
            const request: ClassifyRequest = { prompt, examples };
            const response = await Promise.race([
                classifyBatch(request),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Request timed out after 30s')), 30000)
                )
            ]);
            console.log('Classification successful');
            return response as ClassifyResponse;
        } catch (error) {
            lastError = error as Error;
            const waitTime = Math.pow(2, attempt) * 1000;
            console.error(`Attempt ${attempt + 1} failed:`, {
                error: lastError.message,
                nextRetryIn: `${waitTime/1000}s`,
                remainingAttempts: maxRetries - attempt - 1
            });
            // Wait before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
    }

    const errorMessage = `Classification failed after ${maxRetries} attempts. Last error: ${lastError?.message}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
}