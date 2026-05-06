<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Send, PlayCircle } from "lucide-svelte";

    let inputText = $state("");
    let runNote = $state("");
    let maxLength = 4000;
    let showAppendedText = $state(false);

    // Use $props() instead of export let
    let { disabledButtons } = $props<{
        disabledButtons: boolean;
    }>();

    // Create event dispatcher
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher<{
        classify: { prompt: string; note: string; mode: 'quick' | 'full' };
    }>();
</script>

<div class="space-y-4">
    <div>
        <label for="prompt-input" class="text-sm font-medium mb-2 block">Your Prompt</label>
        <Textarea
            id="prompt-input"
            bind:value={inputText}
            placeholder="Enter your classification prompt..."
            class="min-h-[400px] resize-y"
        />
    </div>

    <div>
        <label for="run-note" class="text-sm font-medium mb-2 block">Note to Self</label>
        <Textarea
            id="run-note"
            bind:value={runNote}
            placeholder="Optional: what you changed, what you expect, or what to inspect later. This is not sent to the model."
            class="min-h-[96px] resize-y"
        />
        <p class="mt-1 text-xs text-muted-foreground">Saved with this run only; never included in the classification prompt.</p>
    </div>

    <div class="border rounded-lg p-4">
        <button
            class="flex items-center justify-between w-full text-left"
            onclick={() => showAppendedText = !showAppendedText}
        >
            <span class="text-sm font-medium">Appended Instructions</span>
            <span class="text-muted-foreground">{showAppendedText ? '▼' : '▶'}</span>
        </button>

        {#if showAppendedText}
            <p class="text-sm text-muted-foreground italic mb-2">This is appended to your prompt. It cannot be changed.</p>
            <div class="mt-2 text-sm text-muted-foreground font-mono whitespace-pre-wrap">
## Final Output Format

Return final annotations as CSV in a single triple-backtick fenced block at the end of your response.

The CSV must have exactly two columns:

id,score

Use the exact example IDs supplied by the tool. Put only a numeric score in the score column.

</div>
        {/if}
    </div>

    <div class="flex justify-between items-center">
        <span class="text-sm text-muted-foreground">
            {inputText.length}/{maxLength} characters
        </span>
        <div class="space-x-2">
            <Button
                variant="outline"
                on:click={() => dispatch('classify', { prompt: inputText, note: runNote, mode: 'quick' })}
                disabled={!disabledButtons}
            >
                <Send class="mr-2 h-4 w-4" />
                Quick Run
            </Button>
            <Button
                on:click={() => dispatch('classify', { prompt: inputText, note: runNote, mode: 'full' })}
                disabled={!disabledButtons}
            >
                <PlayCircle class="mr-2 h-4 w-4" />
                Full Run
            </Button>
        </div>
    </div>
</div>
