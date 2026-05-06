import type { Classification, ClassifyRequest } from '$lib/types';

export const DEFAULT_CLASSIFICATION_MODEL = 'gpt-4.1-mini';

const EXAMPLE_ID_PREFIX = 'example_';

export function buildClassificationPrompt(data: ClassifyRequest): string {
    const examples = data.examples
        .map((example, index) => `${EXAMPLE_ID_PREFIX}${index + 1}: ${example.text}`)
        .join('\n\n');

    return `${data.prompt.trim()}

## Required Final Output Format

Return final annotations as CSV in a single triple-backtick fenced block at the end of your response.

The CSV must have exactly two columns:

id,score

Use the exact example IDs below. Put only a numeric score in the score column. Do not include the source text in the CSV.

## Examples to Label

${examples}
`;
}

export function parseClassifications(content: string, examples: ClassifyRequest['examples']): Classification[] {
    const csvContent = extractFinalCsvBlock(content);
    const rows = csvContent
        .split(/\r?\n/)
        .map((row) => row.trim())
        .filter(Boolean);

    const scoresByIndex = new Map<number, number | null>();
    let fallbackIndex = 0;

    for (const row of rows) {
        const columns = parseCsvRow(row);
        if (columns.length < 2 || isHeaderRow(columns)) {
            continue;
        }

        const id = normalizeCell(columns[0]);
        const score = parseScore(columns[columns.length - 1]);
        const idIndex = parseExampleIndex(id);

        if (idIndex !== null) {
            scoresByIndex.set(idIndex, score);
        } else if (fallbackIndex < examples.length) {
            scoresByIndex.set(fallbackIndex, score);
            fallbackIndex += 1;
        }
    }

    return examples.map((example, index) => ({
        text: example.text,
        score: scoresByIndex.get(index) ?? null
    }));
}

function extractFinalCsvBlock(content: string): string {
    const fencedBlocks = Array.from(content.matchAll(/```(?:csv)?\s*([\s\S]*?)```/gi));
    const finalBlock = fencedBlocks.at(-1);
    return (finalBlock?.[1] ?? content).trim();
}

function parseCsvRow(row: string): string[] {
    const cells: string[] = [];
    let cell = '';
    let inQuotes = false;

    for (let i = 0; i < row.length; i += 1) {
        const char = row[i];
        const next = row[i + 1];

        if (char === '"' && inQuotes && next === '"') {
            cell += '"';
            i += 1;
        } else if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            cells.push(cell.trim());
            cell = '';
        } else {
            cell += char;
        }
    }

    cells.push(cell.trim());
    return cells;
}

function isHeaderRow(columns: string[]): boolean {
    const first = normalizeCell(columns[0]).toLowerCase();
    const last = normalizeCell(columns[columns.length - 1]).toLowerCase();
    return ['id', 'text', 'example'].includes(first) && last === 'score';
}

function normalizeCell(cell: string): string {
    return cell.trim().replace(/^['"]|['"]$/g, '');
}

function parseExampleIndex(id: string): number | null {
    const exampleIdMatch = id.match(/^example[_\s-]?(\d+)$/i);
    if (exampleIdMatch) {
        return Number(exampleIdMatch[1]) - 1;
    }

    const numericMatch = id.match(/^(\d+)$/);
    if (numericMatch) {
        return Number(numericMatch[1]) - 1;
    }

    return null;
}

function parseScore(value: string): number | null {
    const score = Number.parseFloat(normalizeCell(value));
    return Number.isFinite(score) ? score : null;
}
