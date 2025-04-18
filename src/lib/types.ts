/**
 * Example text to be classified
 */
export interface Example {
    text: string;
}

/**
 * Request format for classification
 */
export interface ClassifyRequest {
    prompt: string;
    examples: Example[];
}

/**
 * Classification result for a single example
 */
export interface Classification {
    text: string;
    score: number | null;
}

export interface Lab {
    original: string;
    title: string;
    description: string;
    pts: number;
    coreCompetencies: string[];
    gradingCriteria: string;
    docPath?: string;
    week?: number;
}

export interface LabGrade {
    grade?: number;
    comments?: string;
    directPercentage?: number;
    
    // Classification specific fields
    brickRMSE?: number | null;
    brickPercent?: number | null;
    boxRMSE?: number | null;
    boxPercent?: number | null;
    knifeRMSE?: number | null;
    knifePercent?: number | null;
    toxicRMSE?: number | null;
    toxicPercent?: number | null;
}

export type Grades = Record<string, LabGrade>;

export interface LabeledExample {
    text: string;
    truth: string;
}

/**
 * Response format from classification
 */
export interface ClassifyResponse {
    classifications: Classification[];
    metadata: {
        rawResponse: string;
        fullPrompt: string;
        originalPrompt: string;
    };
}

/**
 * Metrics for evaluating prompt performance
 */
export interface PromptMetrics {
    rmse: number;
    pearsonR: number;
}

export interface PromptRunResultVsTruth {
    text: string;
    score: number | null;
    truth: number | null;
}

/**
 * Record of a single prompt evaluation run
 */
export interface PromptRun {
    id?: string;
    timestamp: number;
    prompt: string;
    mode: "quick" | "full";
    dataset: string;
    rawResponse: string | null;
    metrics: PromptMetrics;
    results: PromptRunResultVsTruth[];
}

export interface GradeEvent {
    labId: string;
    grade: number;
}

export interface QuizGradeEvent {
    labId: string;
    directPercentage: number;
    grade: number;
}

export interface ClassificationUpdate {
    brickRMSE?: number | null;
    brickPercent?: number | null;
    boxRMSE?: number | null;
    boxPercent?: number | null;
    knifeRMSE?: number | null;
    knifePercent?: number | null;
    toxicRMSE?: number | null;
    toxicPercent?: number | null;
}

export interface LabSelectionEvent {
    labId: string;
    selected: boolean;
}
