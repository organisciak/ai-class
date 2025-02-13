function validateInputs(predictions: number[], actuals: number[]): boolean {
    if (!predictions?.length || !actuals?.length || predictions.length !== actuals.length) {
        return false;
    }
    return true;
}

function filterNullPairs(predictions: number[], actuals: number[]): [number, number][] {
    return predictions.reduce((pairs, pred, i) => {
        if (pred != null && actuals[i] != null) {
            pairs.push([pred, actuals[i]]);
        }
        return pairs;
    }, [] as [number, number][]);
}

/**
 * Calculates the Root Mean Square Error (RMSE) between predicted and actual values
 * @param predictions Array of predicted values
 * @param actuals Array of actual (ground truth) values
 * @returns RMSE value or null if inputs are invalid
 */
export function calculateRMSE(predictions: number[], actuals: number[]): number | null {
    // Validate inputs
    if (!validateInputs(predictions, actuals)) {
        return null;
    }

    // Filter out pairs where either value is null/undefined
    const validPairs = filterNullPairs(predictions, actuals);

    if (validPairs.length === 0) {
        return null;
    }

    const n = validPairs.length;
    const sumSquaredDiff = validPairs.reduce((sum, [pred, actual]) => {
        const diff = pred - actual;
        return sum + (diff * diff);
    }, 0);

    return Math.sqrt(sumSquaredDiff / n);
}

/**
 * Calculates the Pearson correlation coefficient between predicted and actual values
 * @param predictions Array of predicted values
 * @param actuals Array of actual (ground truth) values
 * @returns Pearson r value or null if inputs are invalid
 */
export function calculatePearsonR(predictions: number[], actuals: number[]): number | null {
    // Validate inputs
    if (!validateInputs(predictions, actuals)) {
        return null;
    }

    // Filter out pairs where either value is null/undefined
    const validPairs = filterNullPairs(predictions, actuals);

    if (validPairs.length === 0) {
        return null;
    }

    const n = predictions.length;
    
    // Calculate means
    const predMean = predictions.reduce((sum, val) => sum + val, 0) / n;
    const actualMean = actuals.reduce((sum, val) => sum + val, 0) / n;
    
    // Calculate covariance and standard deviations
    let covariance = 0;
    let predSquaredDiff = 0;
    let actualSquaredDiff = 0;
    
    for (let i = 0; i < n; i++) {
        const predDiff = predictions[i] - predMean;
        const actualDiff = actuals[i] - actualMean;
        
        covariance += predDiff * actualDiff;
        predSquaredDiff += predDiff * predDiff;
        actualSquaredDiff += actualDiff * actualDiff;
    }
    
    // Avoid division by zero
    if (predSquaredDiff === 0 || actualSquaredDiff === 0) {
        return null;
    }
    
    return covariance / Math.sqrt(predSquaredDiff * actualSquaredDiff);
}

/**
 * Utility type for validation statistics
 */
export interface ValidationStats {
    rmse: number | null;
    pearsonR: number | null;
}

/**
 * Calculates both RMSE and Pearson r metrics
 * @param predictions Array of predicted values
 * @param actuals Array of actual (ground truth) values
 * @returns Object containing both metrics
 */
export function calculateMetrics(predictions: number[], actuals: number[]): ValidationStats {
    return {
        rmse: calculateRMSE(predictions, actuals),
        pearsonR: calculatePearsonR(predictions, actuals)
    };
}
