import { describe, it, expect } from 'vitest';
import { splitIntoBatches } from '$lib/validation';

describe('Validation Utils', () => {
    describe('splitIntoBatches', () => {
        it('should split array into equal batches', () => {
            const array = [1, 2, 3, 4, 5, 6];
            const result = splitIntoBatches(array, 2);
            expect(result).toEqual([[1, 2], [3, 4], [5, 6]]);
        });

        it('should handle uneven batch sizes', () => {
            const array = [1, 2, 3, 4, 5];
            const result = splitIntoBatches(array, 2);
            expect(result).toEqual([[1, 2], [3, 4], [5]]);
        });

        it('should handle empty arrays', () => {
            const result = splitIntoBatches([], 2);
            expect(result).toEqual([]);
        });

        it('should handle batch size larger than array', () => {
            const array = [1, 2, 3];
            const result = splitIntoBatches(array, 5);
            expect(result).toEqual([[1, 2, 3]]);
        });
    });
}); 