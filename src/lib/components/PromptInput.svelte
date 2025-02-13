<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Send, PlayCircle } from "lucide-svelte";

    let inputText = $state("");
    let maxLength = 1000;
    let showAppendedText = $state(false);

    // Create event dispatcher
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher<{
        classify: { prompt: string; mode: 'quick' | 'full' };
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

Include a triple-backtick-escaped CSV response with final annotations. If there were other requests, include those earlier in your response; the annotations should be at the very bottom of your response.

## Examples to Label

- &#123;...&#125;
- &#123;...&#125;

</div>
        {/if}
    </div>

    <div class="flex justify-between items-center">
        <span class="text-sm text-muted-foreground">
            {inputText.length}/{maxLength} characters
        </span>
        <div class="space-x-2">
            <Button variant="outline" on:click={() => dispatch('classify', { prompt: inputText, mode: 'quick' })}>
                <Send class="mr-2 h-4 w-4" />
                Quick Test
            </Button>
            <Button on:click={() => dispatch('classify', { prompt: inputText, mode: 'full' })}>
                <PlayCircle class="mr-2 h-4 w-4" />
                Full Validation
            </Button>
        </div>
    </div>
</div> 