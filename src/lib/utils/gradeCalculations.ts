import type { LabGrade } from '$lib/types';

// Calculate percentage grade from 0-20 scale
export function getPercentageGrade(grade: number): number {
  return Math.round((grade / 20) * 100);
}

// Calculate percentage based on RMSE value
export function calculateRMSEPercentage(value: number, bottomEnd: number, topEnd: number): number {
  // If worse than bottom end, cap at 50%
  if (value >= bottomEnd) return 50;
  // If better than top end, cap at 100%
  if (value <= topEnd) return 100;
  
  // Linear scale between bottom (50%) and top (100%)
  const range = bottomEnd - topEnd;
  const improvement = bottomEnd - value;
  return 50 + (improvement / range) * 50;
}

// Constants for RMSE thresholds
export const RMSE_THRESHOLDS = {
  brick: { bottomEnd: 1.450, topEnd: 0.900 },
  box: { bottomEnd: 1.680, topEnd: 0.690 },
  knife: { bottomEnd: 1.640, topEnd: 0.620 },
  toxic: { bottomEnd: 0.670, topEnd: 0.420 }
};

// Calculate overall classification score from submitted datasets only
export function calculateClassificationScore(grades: any): number {
  if (!grades) return 50;
  
  let totalScore = 0;
  let datasetCount = 0;
  
  // Only count datasets that have been filled in
  if (grades.brickRMSE !== undefined && grades.brickRMSE !== null) {
    totalScore += grades.brickPercent || 50;
    datasetCount++;
  }
  
  if (grades.boxRMSE !== undefined && grades.boxRMSE !== null) {
    totalScore += grades.boxPercent || 50;
    datasetCount++;
  }
  
  if (grades.knifeRMSE !== undefined && grades.knifeRMSE !== null) {
    totalScore += grades.knifePercent || 50;
    datasetCount++;
  }
  
  if (grades.toxicRMSE !== undefined && grades.toxicRMSE !== null) {
    totalScore += grades.toxicPercent || 50;
    datasetCount++;
  }
  
  // Require at least 3 datasets
  if (datasetCount < 3) {
    return 50; // Default score if fewer than 3 datasets
  }
  
  return totalScore / datasetCount;
}

// Count datasets in grades object
export function countDatasets(grades: LabGrade): number {
  return [
    grades.brickRMSE !== undefined && grades.brickRMSE !== null,
    grades.boxRMSE !== undefined && grades.boxRMSE !== null,
    grades.knifeRMSE !== undefined && grades.knifeRMSE !== null,
    grades.toxicRMSE !== undefined && grades.toxicRMSE !== null
  ].filter(Boolean).length;
}

// Grade interpretation based on percentage
export function interpretGrade(percentage: number): string {
  if (percentage >= 90) return "Excellent";
  if (percentage >= 80) return "Very Good";
  if (percentage >= 70) return "Good";
  if (percentage >= 60) return "Satisfactory";
  return "Needs Improvement";
}

// Calculate letter grade from percentage
export function calculateLetterGrade(percentage: number): string {
  if (percentage >= 97) return "A+";
  if (percentage >= 93) return "A";
  if (percentage >= 90) return "A-";
  if (percentage >= 87) return "B+";
  if (percentage >= 83) return "B";
  if (percentage >= 80) return "B-";
  if (percentage >= 77) return "C+";
  if (percentage >= 73) return "C";
  if (percentage >= 70) return "C-";
  if (percentage >= 67) return "D+";
  if (percentage >= 63) return "D";
  if (percentage >= 60) return "D-";
  return "F";
} 