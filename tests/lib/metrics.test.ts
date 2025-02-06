import { describe, it, expect } from 'vitest';
import { calculateRMSE, calculatePearsonR, calculateMetrics } from '$lib/metrics';

describe('Metrics Calculations', () => {
    describe('calculateRMSE', () => {
        it('should calculate RMSE correctly for simple cases', () => {
            const predictions = [1, 2, 3];
            const actuals = [1, 2, 3];
            expect(calculateRMSE(predictions, actuals)).toBe(0);
            
            const predictions2 = [2, 3, 4];
            const actuals2 = [1, 2, 3];
            expect(calculateRMSE(predictions2, actuals2)).toBe(1);
        });

        it('should handle floating point numbers', () => {
            const predictions = [1.5, 2.5, 3.5];
            const actuals = [1.0, 2.0, 3.0];
            expect(calculateRMSE(predictions, actuals)).toBe(0.5);
        });

        it('should return null for invalid inputs', () => {
            expect(calculateRMSE([], [])).toBe(null);
            expect(calculateRMSE([1, 2], [1])).toBe(null);
            expect(calculateRMSE([], [1])).toBe(null);
            expect(calculateRMSE([1], [])).toBe(null);
            expect(calculateRMSE(null as any, [1])).toBe(null);
            expect(calculateRMSE([1], null as any)).toBe(null);
        });
    });

    describe('calculatePearsonR', () => {
        it('should calculate perfect correlation correctly', () => {
            const predictions = [1, 2, 3, 4, 5];
            const actuals = [1, 2, 3, 4, 5];
            expect(calculatePearsonR(predictions, actuals)).toBe(1);

            const predictions2 = [1, 2, 3, 4, 5];
            const actuals2 = [5, 4, 3, 2, 1];
            expect(calculatePearsonR(predictions2, actuals2)).toBe(-1);
        });

        it('should calculate partial correlation correctly', () => {
            const predictions = [1, 2, 3];
            const actuals = [2, 2.5, 4];
            const result = calculatePearsonR(predictions, actuals);
            expect(result).toBeCloseTo(0.9608, 4);
        });

        it('should handle zero variance case', () => {
            const predictions = [2, 2, 2];
            const actuals = [1, 2, 3];
            expect(calculatePearsonR(predictions, actuals)).toBe(null);

            const predictions2 = [1, 2, 3];
            const actuals2 = [2, 2, 2];
            expect(calculatePearsonR(predictions2, actuals2)).toBe(null);
        });

        it('should return null for invalid inputs', () => {
            expect(calculatePearsonR([], [])).toBe(null);
            expect(calculatePearsonR([1, 2], [1])).toBe(null);
            expect(calculatePearsonR([], [1])).toBe(null);
            expect(calculatePearsonR([1], [])).toBe(null);
            expect(calculatePearsonR(null as any, [1])).toBe(null);
            expect(calculatePearsonR([1], null as any)).toBe(null);
        });
    });

    describe('calculateMetrics', () => {
        it('should calculate both metrics correctly', () => {
            const predictions = [1, 2, 3];
            const actuals = [1, 2, 3];
            const result = calculateMetrics(predictions, actuals);
            
            expect(result.rmse).toBe(0);
            expect(result.pearsonR).toBe(1);
        });

        it('should handle invalid inputs', () => {
            const result = calculateMetrics([], []);
            expect(result.rmse).toBe(null);
            expect(result.pearsonR).toBe(null);
        });
    });
}); 