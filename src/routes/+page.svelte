<script lang="ts">
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
    import slides from "$lib/data/slides.json";
    import { onMount } from 'svelte';
    import MisalignedH1 from '$lib/components/ui/misalignedText/MisalignedH1.svelte';
    import MisalignedH2 from '$lib/components/ui/misalignedText/MisalignedH2.svelte';
    import { Button } from "$lib/components/ui/button";
    import TripleHr from '$lib/components/ui/tripleHr/TripleHr.svelte'; 
    
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
    <MisalignedH1 class_name="workbench-gfont mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        AI/IA - Artificial Intelligence in the Information Age
    </MisalignedH1>


    

    <h2 class="josefin-sans-gfont mt-4 mb-4 scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
        Slides
    </h2>
    
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
                        <Button href={slide.slidePath} class="shadow-misprint hover:shadow-misprint-hover">
                            View Slides
                        </Button>
                        <Button href={slide.docPath} variant="secondary" class="shadow-misprint hover:shadow-misprint-hover">
                            Read Notes
                        </Button>
                    {:else}
                        <Button disabled variant="outline">
                            View Slides
                        </Button>
                        <Button disabled variant="outline">
                            Read Notes
                        </Button>
                    {/if}
                </CardContent>
            </Card>
        {/each}
    </div>

    <TripleHr class_name="mt-8" lines={4} width="100%" />
</div>
