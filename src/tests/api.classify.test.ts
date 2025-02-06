import { describe, it, expect } from 'vitest';
import type { ClassifyRequest, ClassifyResponse } from '$lib/types';

describe('POST /api/classify', () => {
    it('should return classifications for each example', async () => {
        const testRequest: ClassifyRequest = {
            prompt: "Test prompt",
            examples: [
                { text: "Example 1" },
                { text: "Example 2" }
            ]
        };

        const response = await fetch('http://localhost:5173/api/classify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testRequest)
        });

        expect(response.ok).toBe(true);
        expect(response.headers.get('content-type')).toContain('application/json');

        const data: ClassifyResponse = await response.json();
        
        expect(data.classifications).toHaveLength(2);
        expect(data.classifications[0]).toEqual(
            expect.objectContaining({
                text: "Example 1",
                score: expect.any(Number)
            })
        );
        expect(data.classifications[1]).toEqual(
            expect.objectContaining({
                text: "Example 2",
                score: expect.any(Number)
            })
        );

        // Verify scores are between 0 and 1
        data.classifications.forEach(classification => {
            expect(classification.score).toBeGreaterThanOrEqual(0);
            expect(classification.score).toBeLessThanOrEqual(1);
        });
    });

    it('should handle empty examples array', async () => {
        const testRequest: ClassifyRequest = {
            prompt: "Test prompt",
            examples: []
        };

        const response = await fetch('http://localhost:5173/api/classify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testRequest)
        });

        expect(response.ok).toBe(true);
        const data: ClassifyResponse = await response.json();
        expect(data.classifications).toHaveLength(0);
    });
}); 