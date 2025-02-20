export const CORE_COMPETENCIES = [
    "Critical Analysis, Fluency, and Evaluation",
    "Technical Understanding",
    "Skilling and Productivity",
    "Art and Creativity",
    "Society, Ethics and Policy"
] as const;

export type CoreCompetency = typeof CORE_COMPETENCIES[number]; 