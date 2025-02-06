import type { PromptRun } from './types';

const STORAGE_KEY = 'ai-prompt-scorer-history';

/**
 * Creates a reactive state object for managing prompt history
 */
export function createPromptStore() {
    // Initialize state with existing history or empty array
    const history = $state(getHistory());
    
    return {
        /**
         * Adds a new prompt run to history
         */
        saveRun(run: PromptRun) {
            history.push(run);
            persistHistory(history);
        },

        /**
         * Gets the current history array
         */
        getHistory() {
            return history;
        },

        /**
         * Clears all history
         */
        clearHistory() {
            history.length = 0;
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
        if (!stored) return [];
        
        const history = JSON.parse(stored);
        if (!Array.isArray(history)) return [];
        
        return history;
    } catch (error) {
        console.error('Error reading prompt history:', error);
        return [];
    }
}

function persistHistory(history: PromptRun[]): void {
    // Only persist if we're in the browser environment
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
}
