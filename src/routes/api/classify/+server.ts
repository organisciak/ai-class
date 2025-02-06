import type { RequestEvent } from '@sveltejs/kit';
import type { ClassifyRequest, ClassifyResponse } from '$lib/types';

/*
TEST
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Test prompt","examples":[{"text":"Example 1"},{"text":"Example 2"}]}' \
  http://localhost:5173/api/classify

RESPONSE:
{"classifications":[{"text":"Example 1","score":0.530382126835022},{"text":"Example 2","score":0.6898424686978029}]}
*/

export async function POST({ request }: RequestEvent) {
    // Parse the incoming request body
    const data: ClassifyRequest = await request.json();
    
    // Create dummy classifications - one for each example
    const classifications = data.examples.map(example => ({
        text: example.text,
        score: Math.random() // Generate random scores between 0 and 1
    }));

    // Create mock response
    const response: ClassifyResponse = {
        classifications
    };

    return new Response(JSON.stringify(response), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
} 