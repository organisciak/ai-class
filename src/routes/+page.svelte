<script lang="ts">
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
    import slides from "$lib/data/slides.json";
    import { onMount } from 'svelte';
    
    let debug = false;
    
    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        debug = urlParams.get('debug') === 'true';
    });
    
    // Calculate which lectures have happened (first class Jan 9, 2024, weekly on Thursday)
    const startDate = new Date('2025-01-09');
    const now = new Date();
    
    function isLectureAvailable(slideNumber: string) {
        if (debug) return true;
        
        const weekNumber = parseInt(slideNumber) - 1;
        const lectureDate = new Date(startDate);
        lectureDate.setDate(startDate.getDate() + (weekNumber * 7));
        return now >= lectureDate;
    }
</script>

<div class="container mx-auto p-8">
    <h1 class="mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        AI/IA - Artificial Intelligence in the Information Age
    </h1>
    
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {#each slides as slide}
            {@const slideNumber = slide.original.split('-')[0]}
            {@const available = isLectureAvailable(slideNumber)}
            
            <Card class={!available ? 'opacity-50' : ''}>
                <CardHeader>
                    <CardTitle class="text-xl">
                        {slide.title === slide.original.replace('.md', '') 
                            ? `Lecture ${slideNumber}` 
                            : slide.title}
                    </CardTitle>
                    <CardDescription>
                        {slide.original.replace('.md', '')}
                        {#if !available}
                            <span class="block text-sm text-muted-foreground">
                                Slides will be available on their week.
                            </span>
                        {/if}
                    </CardDescription>
                </CardHeader>
                <CardContent class="flex gap-4">
                    {#if available}
                        <a 
                            href={slide.slidePath} 
                            class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            View Slides
                        </a>
                        <a 
                            href={slide.docPath}
                            class="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            Read Notes
                        </a>
                    {:else}
                        <span class="inline-flex items-center justify-center rounded-md bg-muted px-4 py-2 text-sm font-medium text-muted-foreground">
                            View Slides
                        </span>
                        <span class="inline-flex items-center justify-center rounded-md bg-muted px-4 py-2 text-sm font-medium text-muted-foreground">
                            Read Notes
                        </span>
                    {/if}
                </CardContent>
            </Card>
        {/each}
    </div>
</div>
