import type { RequestEvent } from '@sveltejs/kit';
import type { Classification, ClassifyRequest, ClassifyResponse } from '$lib/types';
import { OpenAI } from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

/*
TEST
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Classify the Sentiment of these sentences from 1.0 (extremely negative)-5.0 (extremely positive), with 1 level of precision.","examples":[{"text":"I hate this show"},{"text":"This is pretty good"}]}' \
  http://localhost:5173/api/classify

RESPONSE:
{"classifications":[{"text":"Example 1","score":0.1},{"text":"Example 2","score":0.8}]}
*/

export async function POST({ request }: RequestEvent) {
    const DEBUG = true;  // Debug flag - set to true to enable logging
    
    // Parse the incoming request body
    const data: ClassifyRequest = await request.json();
    
    const client = new OpenAI({
        apiKey: OPENAI_API_KEY,
    });

    try {

        const fullPrompt = `${data.prompt}

## Final Output Format

Include a triple-backtick-escaped CSV response with final annotations. If there were other requests, include those earlier in your response; the annotations should be at the very bottom of your response.

## Examples to Label

**Label each of these examples**

${data.examples.map(ex => `- ${ex.text}`).join('\n')}

`;

        if (DEBUG) console.log("fullPrompt", fullPrompt);
        const messages = [
            {
                role: 'system',
                content: "You are a helpful classification assistant. You respond in markdown-escaped CSV, and classify the examples listed under  'Examples to Label'."
            },
            {
                role: 'user',
                content: fullPrompt
            }
        ];
        if (DEBUG) console.log(messages[1]);

        const results = await client.chat.completions.create({
                    messages: messages,
                    model: 'gpt-4o-mini',
                    temperature: 0.01,
                    max_completion_tokens: 2048,
                    top_p: 0.01,
                    frequency_penalty: 0,
                    presence_penalty: 0
                });

        //if (DEBUG) console.log(results.choices[0]);

        const content = results.choices[0].message?.content || '';
        //if (DEBUG) console.log("content", content);
        
        // Extract content between triple backticks
        const match = content.match(/```(?:csv)?\s*([\s\S]*?)```/);
        const csvContent = match ? match[1].trim() : content.trim();
        if (DEBUG) console.log("csvContent", csvContent);

        // Split into rows and handle potential header
        const rows: string[] = csvContent.split('\n').map(row => row.trim()).filter(row => row.length > 0);
        const hasHeader: boolean = rows.length > data.examples.length;
        const dataRows: string[] = hasHeader ? rows.slice(1) : rows;
        
        const classifications: Classification[] = data.examples.map((example, index) => {
            // Get the corresponding row for this example
            const row = dataRows[index];
            const columns = row ? row.split(',').map(col => col.trim()) : [];
            const score = columns.length > 0 ? parseFloat(columns[columns.length - 1]) : null;
            
            if (DEBUG) console.log("score", score);

            return {
                text: example.text,
                score: score
            };
        });

        const responseData: ClassifyResponse = {
            classifications,
            metadata: {
                rawResponse: content,
                fullPrompt: fullPrompt,
                originalPrompt: data.prompt
            }
        };

        return new Response(JSON.stringify(responseData), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('OpenAI API Error:', error);
        return new Response(JSON.stringify({ error: 'Classification failed' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
} 