import type { PromptRun } from './types';

const STORAGE_KEY = 'ai-prompt-scorer-history';

/**
 * Creates a store for managing prompt history
 */
export function createPromptStore() {
    // Create reactive state using $state
    const history = $state(getHistory());

    return {
        subscribe: (callback: (value: PromptRun[]) => void) => {
            // Initial call
            callback(history);
            
            // Setup effect to watch for changes
            $effect(() => {
                callback(history);
            });

            // Return unsubscribe function
            return () => {};
        },
        saveRun: (run: PromptRun) => {
            history.unshift(run);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        },
        clearHistory() {
            history.length = 0; // Clear the array
            localStorage.removeItem(STORAGE_KEY);
        }
    };
}

// Private helper functions
function getHistory(): PromptRun[] {
    try {
        // Check if we're in the browser environment
        if (typeof window === 'undefined') return [];

        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Error reading history from localStorage:', e);
        return [];
    }
}

function persistHistory(history: PromptRun[]): void {
    // Only persist if we're in the browser environment
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
}
