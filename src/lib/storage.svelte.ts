import type { PromptRun } from './types';

const STORAGE_KEY = 'ai-prompt-scorer-history';

let sharedHistory = $state<PromptRun[]>(getHistory());
const subscribers = new Set<(value: PromptRun[]) => void>();

function notifySubscribers(): void {
    const snapshot = [...sharedHistory];
    subscribers.forEach((callback) => callback(snapshot));
}

function persistHistory(): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sharedHistory));
    }
}

/**
 * Creates a store for managing prompt history
 */
export function createPromptStore() {
    return {
        subscribe: (callback: (value: PromptRun[]) => void) => {
            subscribers.add(callback);
            callback([...sharedHistory]);
            return () => subscribers.delete(callback);
        },
        saveRun: (run: PromptRun) => {
            sharedHistory.unshift(run);
            persistHistory();
            notifySubscribers();
        },
        updateRunNote: (id: string, note: string) => {
            const run = sharedHistory.find((historyRun) => historyRun.id === id);
            if (!run) return;

            run.note = note;
            persistHistory();
            notifySubscribers();
        },
        deleteRun: (id: string) => {
            const index = sharedHistory.findIndex((historyRun) => historyRun.id === id);
            if (index === -1) return;

            sharedHistory.splice(index, 1);
            persistHistory();
            notifySubscribers();
        },
        getHistory: () => [...sharedHistory],
        clearHistory() {
            sharedHistory.length = 0;
            localStorage.removeItem(STORAGE_KEY);
            notifySubscribers();
        }
    };
}

// Private helper functions
function getHistory(): PromptRun[] {
    try {
        // Check if we're in the browser environment
        if (typeof window === 'undefined' || typeof localStorage?.getItem !== 'function') return [];

        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Error reading history from localStorage:', e);
        return [];
    }
}
