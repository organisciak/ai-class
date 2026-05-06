import { createPromptStore } from '$lib/storage.svelte';
import { describe, expect, beforeEach, test, vi } from 'vitest';

describe('Storage Functions', () => {
    beforeEach(() => {
        if (typeof localStorage.clear !== 'function') {
            const values = new Map<string, string>();
            vi.stubGlobal('localStorage', {
                getItem: (key: string) => values.get(key) ?? null,
                setItem: (key: string, value: string) => values.set(key, value),
                removeItem: (key: string) => values.delete(key),
                clear: () => values.clear()
            });
        }
        localStorage.clear();
        createPromptStore().clearHistory();
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
            mode: 'quick' as const,
            dataset: 'Test dataset',
            rawResponse: null,
            results: [],
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
            mode: 'quick' as const,
            dataset: 'Test dataset',
            rawResponse: null,
            results: [],
            metrics: { rmse: 0.5, pearsonR: 0.8 }
        };

        store.saveRun(run);
        store.clearHistory();

        expect(store.getHistory()).toEqual([]);
    });

    test('updateRunNote edits an existing run', () => {
        const store = createPromptStore();
        const run = {
            id: 'run-1',
            timestamp: Date.now(),
            prompt: 'Test prompt',
            note: 'First note',
            mode: 'quick' as const,
            dataset: 'Test dataset',
            rawResponse: null,
            results: [],
            metrics: { rmse: 0.5, pearsonR: 0.8 }
        };

        store.saveRun(run);
        store.updateRunNote('run-1', 'Updated note');

        expect(store.getHistory()[0].note).toBe('Updated note');
    });

    test('deleteRun removes one run and preserves the rest', () => {
        const store = createPromptStore();
        const firstRun = {
            id: 'run-1',
            timestamp: Date.now(),
            prompt: 'First prompt',
            mode: 'quick' as const,
            dataset: 'Test dataset',
            rawResponse: null,
            results: [],
            metrics: { rmse: 0.5, pearsonR: 0.8 }
        };
        const secondRun = {
            id: 'run-2',
            timestamp: Date.now(),
            prompt: 'Second prompt',
            mode: 'full' as const,
            dataset: 'Test dataset',
            rawResponse: null,
            results: [],
            metrics: { rmse: 0.4, pearsonR: 0.9 }
        };

        store.saveRun(firstRun);
        store.saveRun(secondRun);
        store.deleteRun('run-1');

        expect(store.getHistory()).toEqual([secondRun]);
    });
});
