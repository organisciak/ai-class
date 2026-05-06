import { describe, expect, it } from 'vitest';
import { buildClassificationPrompt, parseClassifications } from '$lib/server/classification';

describe('classification helpers', () => {
    const examples = [
        { text: 'A text with, a comma' },
        { text: 'Second text' }
    ];

    it('builds prompts with stable example IDs', () => {
        const prompt = buildClassificationPrompt({
            prompt: 'Rate from 1 to 5.',
            examples
        });

        expect(prompt).toContain('example_1: A text with, a comma');
        expect(prompt).toContain('example_2: Second text');
        expect(prompt).toContain('id,score');
    });

    it('parses final fenced id-score CSV output', () => {
        const content = `Reasoning goes here.

\`\`\`csv
id,score
example_1,1.5
example_2,4
\`\`\``;

        expect(parseClassifications(content, examples)).toEqual([
            { text: 'A text with, a comma', score: 1.5 },
            { text: 'Second text', score: 4 }
        ]);
    });

    it('falls back to row order when IDs are absent', () => {
        const content = `\`\`\`csv
text,score
"A text with, a comma",2
"Second text",3
\`\`\``;

        expect(parseClassifications(content, examples)).toEqual([
            { text: 'A text with, a comma', score: 2 },
            { text: 'Second text', score: 3 }
        ]);
    });

    it('returns null for missing or nonnumeric scores', () => {
        const content = `\`\`\`csv
id,score
example_1,unclear
\`\`\``;

        expect(parseClassifications(content, examples)).toEqual([
            { text: 'A text with, a comma', score: null },
            { text: 'Second text', score: null }
        ]);
    });
});
