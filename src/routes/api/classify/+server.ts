import type { RequestEvent } from '@sveltejs/kit';
import type { ClassifyRequest, ClassifyResponse } from '$lib/types';
import { OpenAI } from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { env } from '$env/dynamic/private';
import {
    buildClassificationPrompt,
    DEFAULT_CLASSIFICATION_MODEL,
    parseClassifications
} from '$lib/server/classification';

/*
TEST
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Classify the Sentiment of these sentences from 1.0 (extremely negative)-5.0 (extremely positive), with 1 level of precision.","examples":[{"text":"I hate this show"},{"text":"This is pretty good"}]}' \
  http://localhost:5173/api/classify

RESPONSE:
{"classifications":[{"text":"I hate this show","score":1},{"text":"This is pretty good","score":4}]}
*/

export async function POST({ request }: RequestEvent) {
    const DEBUG = false;  // Debug flag - set to true to enable logging

    // Parse the incoming request body
    const data: ClassifyRequest = await request.json();

    if (!data.prompt?.trim() || !Array.isArray(data.examples)) {
        return new Response(JSON.stringify({ error: 'Prompt and examples are required' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const client = new OpenAI({
        apiKey: env.OPENAI_API_KEY,
    });

    try {

        const fullPrompt = buildClassificationPrompt(data);

        if (DEBUG) console.log("fullPrompt", fullPrompt);
        const messages: ChatCompletionMessageParam[] = [
            {
                role: 'system',
                content: "You are a careful classification assistant. Follow the user's classification rubric, label only the examples listed under 'Examples to Label', and put final annotations in the required CSV format."
            },
            {
                role: 'user',
                content: fullPrompt
            }
        ];
        if (DEBUG) console.log(messages[1]);

        const results = await client.chat.completions.create({
                    messages: messages,
                    seed: 1234567890,
                    model: env.OPENAI_CLASSIFICATION_MODEL || DEFAULT_CLASSIFICATION_MODEL,
                    temperature: 0,
                    max_completion_tokens: 2048,
                    frequency_penalty: 0,
                    presence_penalty: 0
                });

        //if (DEBUG) console.log(results.choices[0]);

        const content = results.choices[0].message?.content || '';
        //if (DEBUG) console.log("content", content);
        const classifications = parseClassifications(content, data.examples);
        if (DEBUG) console.log("classifications", classifications);

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
