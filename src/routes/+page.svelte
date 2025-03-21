<script lang="ts">
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
    import slides from "$lib/data/slides.json";
    import labs from "$lib/data/labs.json";
    import { onMount } from 'svelte';
    import MisalignedH1 from '$lib/components/ui/misalignedText/MisalignedH1.svelte';
    import { Button } from "$lib/components/ui/button";
    import { MetaTags } from 'svelte-meta-tags';
    import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "$lib/components/ui/collapsible";

    let debug = $state(false);
    let showBackToTop = $state(false);

    onMount(() => {
        debug = new URLSearchParams(window.location.search).get('debug') === 'true';
        console.log('Debug mode:', debug);

        // Add scroll listener for back to top button
        window.addEventListener('scroll', () => {
            showBackToTop = window.scrollY > 300;
        });
    });

    // Calculate which lectures have happened (first class Jan 9, 2024, weekly on Thursday)
    const startDate = new Date('2025-01-09');
    const now = new Date();

    let isLectureAvailable = $derived((slideNumber: string) => {
        if (debug) return true;

        const weekNumber = parseInt(slideNumber) - 1;
        const lectureDate = new Date(startDate);
        lectureDate.setDate(startDate.getDate() + (weekNumber * 7));
        return now >= lectureDate;
    })

    let isLabAvailable = $derived((week: number) => {
        if (debug) return true;
        if (week === 0) return true; // Always available if week is 0

        const weekNumber = week - 1;
        const labDate = new Date(startDate);
        labDate.setDate(startDate.getDate() + (weekNumber * 7));

        return now >= labDate;
    })

    // Add new function for smooth scrolling
    function scrollToSection(id: string) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Add function to generate random scanline offset
    function getRandomScanlineOffset() {
        return Math.floor(Math.random() * 40) + 30; // Random number between 30-70%
    }
</script>

<MetaTags
    title="AI/IA - AI in the Information Age"
    titleTemplate="%s"
    description="Course materials for Artificial Intelligence in the Information Age. Explore slides, labs, and resources about AI literacy, technical foundations, and societal impact."
    openGraph={{
        title: "AI/IA - Artificial Intelligence in the Information Age",
        description: "Course materials for Artificial Intelligence in the Information Age. Explore slides, labs, and resources about AI literacy, technical foundations, and societal impact.",
        type: 'website'
    }}
    twitter={{
        cardType: 'summary',
        title: "AI/IA - Artificial Intelligence in the Information Age",
        description: "Course materials for Artificial Intelligence in the Information Age. Explore slides, labs, and resources about AI literacy, technical foundations, and societal impact."
    }}
/>

<div class="container mx-auto p-8">
    <MisalignedH1 class_name="workbench-gfont mb-8 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
        AI/IA - Artificial Intelligence in the Information Age
    </MisalignedH1>

    <!-- Syllabus Section -->
    <div class="mb-8 josefin-sans-gfont">
        An AI Literacy class for information professionals, at the University of Denver. See the <a href="/syllabus" class="underline">Syllabus</a>.
    </div>

    <!-- Table of Contents - only visible on smaller screens -->
    <div class="lg:hidden mb-8">
        <h2 class="josefin-sans-gfont mb-4 text-lg font-bold hidden">Quick Navigation</h2>
        <div class="flex gap-4 workbench-gfont">
            <Button
                variant="outline"
                on:click={() => scrollToSection('slides-section')}
                class="flex-1">
                Slides
            </Button>
            <Button
                variant="outline"
                on:click={() => scrollToSection('tools-section')}
                class="flex-1">
                Tools
            </Button>
            <Button
                variant="outline"
                on:click={() => scrollToSection('labs-section')}
                class="flex-1">
                Labs
            </Button>
        </div>
    </div>

    <div class="lg:grid lg:grid-cols-2 lg:gap-8">
        <div class="lg:border-r lg:pr-8">
            <h2 id="slides-section" class="josefin-sans-gfont mt-4 mb-4 scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl">
                Slides
            </h2>

            <div class="grid gap-6 md:grid-cols-2">
                {#each slides as slide}
                    {@const slideNumber = slide.original.split('-')[0]}
                    {@const available = isLectureAvailable(slideNumber)}

                    <Card class={!available ? 'opacity-50 relative overflow-hidden' : 'relative overflow-hidden'}>
                        {#if slide.backgroundImage}
                            {@const scanline1 = getRandomScanlineOffset()}
                            {@const scanline2 = getRandomScanlineOffset()}
                            <div 
                                class="absolute inset-0 z-0 opacity-30"
                                style="background-image: url({slide.backgroundImage}); 
                                       background-size: cover; 
                                       background-position: center;
                                       mask-image: linear-gradient(to bottom, 
                                           rgba(0,0,0,0) 0%, 
                                           rgba(0,0,0,1) 40%,
                                           rgba(0,0,0,1) 75%,
                                           rgba(0,0,0,0.5) 100%);"
                            ></div>
                            <!-- Black scanline div -->
                            <div 
                                class="absolute inset-0 z-0 opacity-30"
                                style="background-image: url({slide.backgroundImage}); 
                                       background-size: cover; 
                                       background-position: center;
                                       mask-image: linear-gradient(to bottom, 
                                           rgba(0,0,0,0) 0%,
                                           rgba(0,0,0,0) {scanline1}%,
                                           rgba(0,0,0,1) calc({scanline1}% + 2px),
                                           rgba(0,0,0,0) calc({scanline1}% + 3px),
                                           rgba(0,0,0,0) 100%);"
                            ></div>
                        {/if}
                        <CardHeader class="relative z-10">
                            {#if available}
                                <CardTitle class="text-lg group">
                                    <a href={slide.slidePath} class="flex items-center gap-2 hover:underline">
                                        {slide.title === slide.original.replace('.md', '')
                                            ? `Lecture ${slideNumber}`
                                            : slide.title}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="opacity-40 group-hover:opacity-100 transition-opacity">
                                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                        </svg>
                                    </a>
                                </CardTitle>
                            {:else}
                                <CardTitle class="text-lg">
                                    {slide.title === slide.original.replace('.md', '')
                                        ? `Lecture ${slideNumber}`
                                        : slide.title}
                                </CardTitle>
                            {/if}
                            <CardDescription class="text-sm">
                                <span class="hidden">{slide.original.replace('.md', '')}</span>
                                {#if !available}
                                    <span class="block text-sm text-muted-foreground">
                                        Slides will be available on their week.
                                    </span>
                                {/if}
                                {#if available}
                                    <div class="flex gap-4 workbench-gfont">
                                        <a href={slide.slidePath} class="text-muted-foreground hover:text-foreground transition-colors">
                                            Slides →
                                        </a>
                                        <a href={slide.docPath} class="text-muted-foreground hover:text-foreground transition-colors">
                                            Notes →
                                        </a>
                                    </div>
                                {/if}
                            </CardDescription>
                        </CardHeader>
                        <CardContent class="flex flex-col gap-2 text-sm">

                        </CardContent>
                    </Card>
                {/each}
            </div>
        </div>

        <div class="mt-8 lg:mt-0 lg:pl-8">
            <!-- Add Tools section before Labs -->
            <h2 id="tools-section" class="josefin-sans-gfont mt-4 mb-4 scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl">
                Tools
            </h2>

            <div class="grid gap-6 md:grid-cols-2 mb-12">
                <Card>
                    <CardHeader>
                        <CardTitle class="text-md group">
                            <a href="/tools/classify" class="flex items-center gap-2 hover:underline">
                                Classification Tool
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="opacity-40 group-hover:opacity-100 transition-opacity">
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                </svg>
                            </a>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p class="text-sm">
                            Part of <a href="/labs/classification" class="underline">Lab: Classification Prompt Battle</a>
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle class="text-md group">
                            <a href="https://aivote.streamlit.app" class="flex items-center gap-2 hover:underline">
                                AI Ethics Voting Tool
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="opacity-40 group-hover:opacity-100 transition-opacity">
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                </svg>
                            </a>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p class="text-sm">
                            An exercise for determining normative opinions on the line for ethical uses of AI, where the group generates appropriate, inappropriate, and borderline uses for AI, then ranks them.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <h2 id="labs-section" class="josefin-sans-gfont mt-4 mb-4 scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl">
                Labs
            </h2>

            <p class="text-muted-foreground text-sm mb-6">
                Labs are ungraded by default, but there is a Portfolio where you submit your best labs for assessment.
                Portfolio details are in the <a href="/syllabus" class="underline">Syllabus</a> 
                and there is a <a href="/portfolio" class="underline">Portfolio planning</a> page.
            </p>

            <div class="grid gap-6 md:grid-cols-2">
                {#each labs as lab}
                    {@const labNumber = lab.original.split('-')[0]}
                    {@const available = isLabAvailable(lab.week)}

                    <Card class={!available ? 'opacity-50' : ''}>
                        <CardHeader>
                            {#if available}
                                <CardTitle class="text-lg group">
                                    <a href={lab.docPath} class="flex items-center gap-2 hover:underline">
                                        {lab.title}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="opacity-40 group-hover:opacity-100 transition-opacity">
                                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                        </svg>
                                    </a>
                                </CardTitle>
                            {:else}
                                <CardTitle class="text-lg">
                                    {lab.title}
                                </CardTitle>
                            {/if}
                            <CardDescription class="text-sm workbench-gfont">
                                {lab.week === 0 ? 'Ongoing' : `Week ${lab.week}`}
                            </CardDescription>
                        </CardHeader>
                        <CardContent class="flex flex-col gap-2 text-sm">
                            <div class="mt-1">{lab.description}</div>
                            <div class="mt-1 flex flex-wrap gap-1 hidden">
                                <span class="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
                                    {lab.coreCompetencies[0]}
                                </span>
                            </div>
                            {#if !available}
                                <span class="block text-sm text-muted-foreground mt-1">
                                    Lab will be available on week {lab.week}.
                                </span>
                            {/if}
                        </CardContent>


                    </Card>
                {/each}
            </div>
        </div>
    </div>
</div>

<!-- Back to Top Button -->
{#if showBackToTop}
    <Button
        variant="outline"
        class="workbench-gfont text-xl fixed bottom-4 right-4 p-4 m-4 hover:text-blue-500 transition-all"
        on:click={scrollToTop}
    >
        ^ Top
    </Button>
{/if}
