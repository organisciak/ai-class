// src/lib/utils/gradeStore.ts
import { writable, derived } from 'svelte/store';
import type { Grades, LabGrade, Lab } from '$lib/types';
import labs from '$lib/data/labs.json';
import { calculateClassificationScore } from './gradeCalculations';

// Main stores
export const selectedLabs = writable<string[]>([]);
export const labGrades = writable<Grades>({});

// Derived store for total points based on selected labs
export const totalPoints = derived(selectedLabs, ($labs) => {
  return $labs.reduce((total, labId) => {
    const lab = labs.find(l => l.original === labId);
    return total + (lab?.pts || 0);
  }, 0);
});

// Derived store for valid point range check
export const isValidPointRange = derived(totalPoints, ($points) => {
  return $points >= 9 && $points <= 11;
});

// Derived store for total score calculation
export const totalScore = derived([selectedLabs, labGrades], ([$labs, $grades]) => {
  let totalWeightedScore = 0;
  let totalPossibleWeightedScore = 0;
  
  $labs.forEach(labId => {
    const lab = labs.find(l => l.original === labId);
    if (!lab) return;
    
    let gradePercentage;
    if (lab.original === "big-quiz.md") {
      // For Big Quiz, use the direct percentage
      gradePercentage = ($grades[labId]?.directPercentage || 0) / 100;
    } else if (lab.original === "classification.md") {
      // For Classification, use the calculated average percentage
      gradePercentage = calculateClassificationScore($grades[labId]) / 100;
    } else {
      // For other labs, calculate from inverted grade
      const grade = 20 - ($grades[labId]?.grade || 0);
      gradePercentage = grade / 20;
    }
    
    const weight = lab.pts;
    
    totalWeightedScore += gradePercentage * weight;
    totalPossibleWeightedScore += weight;
  });
  
  // Ensure minimum denominator of 9 points
  totalPossibleWeightedScore = Math.max(totalPossibleWeightedScore, 9);
  
  // Calculate weighted percentage and multiply by 650
  const weightedPercentage = totalWeightedScore / totalPossibleWeightedScore;
  
  return Math.round(weightedPercentage * 650);
});

// Update regular lab grade and comments
export function updateLabGrade(labId: string, grade: number, comments?: string) {
  labGrades.update(grades => {
    const current = grades[labId] || {};
    return {
      ...grades,
      [labId]: {
        ...current,
        grade,
        comments: comments !== undefined ? comments : current.comments || ''
      }
    };
  });
}

// Update quiz grade (direct percentage)
export function updateQuizGrade(labId: string, directPercentage: number, grade: number, comments?: string) {
  labGrades.update(grades => {
    const current = grades[labId] || {};
    return {
      ...grades,
      [labId]: {
        ...current,
        grade,
        directPercentage,
        comments: comments !== undefined ? comments : current.comments || ''
      }
    };
  });
}

// Update comments only
export function updateComments(labId: string, comments: string) {
  labGrades.update(grades => {
    const current = grades[labId] || {};
    return {
      ...grades,
      [labId]: {
        ...current,
        comments
      }
    };
  });
}

// Update classification grades with RMSE values and percentages
export function updateClassificationGrade(labId: string, updates: any) {
  labGrades.update(grades => {
    const current = grades[labId] || { 
      comments: '',
      brickRMSE: null, brickPercent: null,
      boxRMSE: null, boxPercent: null,
      knifeRMSE: null, knifePercent: null,
      toxicRMSE: null, toxicPercent: null
    };
    
    const updated = { ...current, ...updates };
    
    // Calculate overall percentage and set the grade
    const overallPercent = calculateClassificationScore(updated);
    // Reverse the grade (0-20 scale, 0 = 100%, 20 = 0%)
    updated.grade = Math.round(20 - (overallPercent / 100 * 20));
    updated.directPercentage = Math.round(overallPercent);
    
    return { ...grades, [labId]: updated };
  });
}

// Handle lab selection
export function selectLab(labId: string, isSelected: boolean) {
  selectedLabs.update(labs => {
    if (isSelected) {
      // Add lab if not already included
      return labs.includes(labId) ? labs : [...labs, labId];
    } else {
      // Remove lab if present
      return labs.filter(id => id !== labId);
    }
  });
}

// Generate grading text report
export function generateGradingText(allLabs: Lab[]) {
  let text = "# Grading Rubric\n\n";
  
  let selectedLabsValue: string[] = [];
  let labGradesValue: Grades = {};
  
  // Get current store values
  selectedLabs.subscribe(value => { selectedLabsValue = value; })();
  labGrades.subscribe(value => { labGradesValue = value; })();
  
  selectedLabsValue.forEach(labId => {
    const lab = allLabs.find(l => l.original === labId);
    if (!lab) return;
    
    let percentage;
    if (lab.original === "big-quiz.md") {
      // For Big Quiz, use the direct percentage
      percentage = labGradesValue[labId]?.directPercentage || 0;
    } else if (lab.original === "classification.md") {
      // For Classification, include detailed RMSE metrics
      percentage = Math.round(calculateClassificationScore(labGradesValue[labId]));
      
      text += `## ${lab.title} (${lab.pts} pt${lab.pts > 1 ? 's' : ''})\n`;
      text += `Criteria: "${lab.gradingCriteria}"\n\n`;
      text += `Dataset metrics:\n`;
      
      if (labGradesValue[labId]?.brickRMSE !== undefined && labGradesValue[labId]?.brickRMSE !== null) {
        const brickRMSE = labGradesValue[labId]?.brickRMSE;
        const brickPercent = Math.round(labGradesValue[labId]?.brickPercent || 50);
        text += `- AUT Brick: RMSE ${brickRMSE} (${brickPercent}%)\n`;
      }
      
      if (labGradesValue[labId]?.boxRMSE !== undefined && labGradesValue[labId]?.boxRMSE !== null) {
        const boxRMSE = labGradesValue[labId]?.boxRMSE;
        const boxPercent = Math.round(labGradesValue[labId]?.boxPercent || 50);
        text += `- AUT Box: RMSE ${boxRMSE} (${boxPercent}%)\n`;
      }
      
      if (labGradesValue[labId]?.knifeRMSE !== undefined && labGradesValue[labId]?.knifeRMSE !== null) {
        const knifeRMSE = labGradesValue[labId]?.knifeRMSE;
        const knifePercent = Math.round(labGradesValue[labId]?.knifePercent || 50);
        text += `- AUT Knife: RMSE ${knifeRMSE} (${knifePercent}%)\n`;
      }
      
      if (labGradesValue[labId]?.toxicRMSE !== undefined && labGradesValue[labId]?.toxicRMSE !== null) {
        const toxicRMSE = labGradesValue[labId]?.toxicRMSE;
        const toxicPercent = Math.round(labGradesValue[labId]?.toxicPercent || 50);
        text += `- Reddit Toxicity: RMSE ${toxicRMSE} (${toxicPercent}%)\n`;
      }
      
      text += `\nOverall Grade: ${percentage}%\n`;
      
      const comments = labGradesValue[labId]?.comments || '';
      if (comments) {
        text += `Comments: ${comments}\n\n`;
      }
      
      return; // Skip the standard output below
    } else {
      // For other labs, calculate percentage from inverted grade
      const grade = 20 - (labGradesValue[labId]?.grade || 0);
      percentage = Math.round((grade / 20) * 100);
    }
    
    // Standard format for other labs
    const comments = labGradesValue[labId]?.comments || '';
    
    text += `\n## ${lab.title} (${lab.pts} pt${lab.pts > 1 ? 's' : ''})\n`;
    text += `Criteria: "${lab.gradingCriteria}"\n`;
    text += `Grade: ${percentage}%\n`;
    if (comments) {
      text += `Comments: ${comments}\n\n`;
    }
  });
  
  let finalScore = 0;
  totalScore.subscribe(value => { finalScore = value; })();
  text += `\n## Total Score: ${finalScore}/650\n`;
  
  return text.strip();
}