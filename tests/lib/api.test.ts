import { describe, it, expect, vi, beforeEach } from 'vitest';
import { classifyBatch, classifyWithRetry } from '$lib/api';

describe('API Client', () => {
    const testPrompt = "Rate how happy this text sounds on a scale of 1-10";
    const testExamples = [
        { text: "I love sunny days!" },
        { text: "This is the worst day ever." }
    ];

    beforeEach(() => {
        // Reset all mocks before each test
        vi.resetAllMocks();
        // Reset the fetch mock
        vi.stubGlobal('fetch', vi.fn());
    });

    describe('classifyBatch', () => {
        it('should return classifications for all examples', async () => {
            // Mock successful response
            const mockResponse = {
                classifications: testExamples.map(ex => ({
                    text: ex.text,
                    score: 5
                }))
            };
            
            global.fetch = vi.fn().mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockResponse)
            });

            const request = { prompt: testPrompt, examples: testExamples };
            const result = await classifyBatch(request);
            
            expect(result.classifications).toHaveLength(testExamples.length);
            result.classifications.forEach((classification, index) => {
                expect(classification.text).toBe(testExamples[index].text);
                expect(classification.score).toBeGreaterThanOrEqual(1);
                expect(classification.score).toBeLessThanOrEqual(10);
            });
        });

        it('should throw error on non-ok response', async () => {
            global.fetch = vi.fn().mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error'
            });

            const request = { prompt: testPrompt, examples: testExamples };
            await expect(classifyBatch(request))
                .rejects.toThrow('API request failed: Internal Server Error (500)');
        });
    });

    describe('classifyWithRetry', () => {
        it('should make successful API call', async () => {
            const mockResponse = {
                classifications: testExamples.map(ex => ({
                    text: ex.text,
                    score: 5
                }))
            };

            global.fetch = vi.fn().mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockResponse)
            });

            const result = await classifyWithRetry(testPrompt, testExamples);
            
            expect(result).toEqual(mockResponse);
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        it('should retry on failure with exponential backoff', async () => {
            vi.useFakeTimers();
            global.fetch = vi.fn()
                .mockRejectedValueOnce(new Error('Network error'))
                .mockResolvedValueOnce({
                    ok: true,
                    json: () => Promise.resolve({ classifications: [] })
                });

            const promise = classifyWithRetry(testPrompt, testExamples);
            
            // First attempt fails, should wait 1 second
            await vi.advanceTimersByTimeAsync(1000);
            // Second attempt succeeds
            await promise;
            
            expect(fetch).toHaveBeenCalledTimes(2);
            vi.useRealTimers();
        });
    });
}); 