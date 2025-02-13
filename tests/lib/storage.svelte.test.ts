import { createPromptStore } from '$lib/storage.svelte';
import { describe, expect, beforeEach, test } from 'vitest';

describe('Storage Functions', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('store starts empty when no history exists', () => {
        const store = createPromptStore();
        expect(store.getHistory()).toEqual([]);
    });

    test('saveRun stores a prompt run', () => {
        const store = createPromptStore();
        const run = {
            timestamp: Date.now(),
            prompt: 'Test prompt',
            metrics: {
                rmse: 0.5,
                pearsonR: 0.8
            }
        };

        store.saveRun(run);
        const history = store.getHistory();
        
        expect(history).toHaveLength(1);
        expect(history[0]).toEqual(run);
    });

    test('clearHistory removes all stored runs', () => {
        const store = createPromptStore();
        const run = {
            timestamp: Date.now(),
            prompt: 'Test prompt',
            metrics: { rmse: 0.5, pearsonR: 0.8 }
        };

        store.saveRun(run);
        store.clearHistory();
        
        expect(store.getHistory()).toEqual([]);
    });
}); 