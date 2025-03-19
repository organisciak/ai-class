<script lang="ts">
    import { CORE_COMPETENCIES } from '$lib/data/coreCompetencies';
    import labs from '$lib/data/labs.json';
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale } from 'chart.js';
    ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);
    import { writable } from 'svelte/store';
    import SimpleHeader from '$lib/interface/SimpleHeader.svelte';
    import MisalignedH1 from '$lib/components/ui/misalignedText/MisalignedH1.svelte';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '$lib/components/ui/card';
    import StandardGradeSlider from '$lib/components/grading/StandardGradeSlider.svelte';
    import QuizGradeInput from '$lib/components/grading/QuizGradeInput.svelte';
    import ClassificationTable from '$lib/components/grading/ClassificationTable.svelte';
    import CommentsInput from '$lib/components/grading/CommentsInput.svelte';
    import GradeSummary from '$lib/components/grading/GradeSummary.svelte';
    import LabCard from '$lib/components/portfolio/LabCard.svelte';
    import CompetencyChart from '$lib/components/portfolio/CompetencyChart.svelte';
    import PointsSummary from '$lib/components/portfolio/PointsSummary.svelte';
    import { Button } from "$lib/components/ui/button";
    import { derived } from 'svelte/store';
    let chart: Chart | null = null;
    let isGradingMode = false;
    import { totalPoints, labGrades, selectedLabs, updateClassificationGrade, 
        updateComments, updateQuizGrade, updateLabGrade, selectLab,
        maxScore,
        generateGradingText, totalScore } from '$lib/utils/gradeStore';

    const gradingReportText = derived([labGrades, selectedLabs], () => {
        return generateGradingText(labs);
    });

    onMount(() => {
        // Check for grading mode in URL params
        const urlParams = new URLSearchParams(window.location.search);
        isGradingMode = urlParams.get('grading') === 'true';
        
        // Initialize chart
        const ctx = document.getElementById('radar-chart') as HTMLCanvasElement;
        chart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: CORE_COMPETENCIES,
                datasets: [{
                    label: 'Competency Coverage',
                    data: CORE_COMPETENCIES.map(() => 0),
                    fill: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(54, 162, 235)'
                }]
            },
            options: {
                scales: {
                    r: {
                        beginAtZero: true,
                        ticks: {
                            display: false
                        }
                    }
                }
            }
        });
    });

    function toggleGradingMode() {
        isGradingMode = !isGradingMode;
        const url = new URL(window.location.href);
        if (isGradingMode) {
            url.searchParams.set('grading', 'true');
        } else {
            url.searchParams.delete('grading');
        }
        window.history.pushState({}, '', url);
    }
</script>

<SimpleHeader />
<div class="container mx-auto p-4">
    <MisalignedH1 class_name="font-bold workbench-gfont">
        Portfolio
    </MisalignedH1>
    <!--<h2 class="text-2xl font-semibold josefin-sans-gfont mb-4">
        Details
    </h2>
    <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        Details
    </div>-->
    
    <h2 class="text-2xl font-semibold josefin-sans-gfont mb-4">
        Planning
    </h2>
    <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        <div class="lg:col-span-2 space-y-4">
            <h3 class="text-lg font-semibold josefin-sans-gfont">Select Labs</h3>

            <PointsSummary 
                points={$totalPoints} 
                minPoints={9} 
                maxPoints={11} 
            />
            
            <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {#each labs as lab}
                    <LabCard 
                        {lab} 
                        selected={$selectedLabs.includes(lab.original)}
                        on:select={ (e) => selectLab( e.detail.labId, e.detail.selected)}
                    />
                {/each}
            </div>
        </div>
        
        <div>
            <CompetencyChart
                competencies={CORE_COMPETENCIES}
                selectedLabs={$selectedLabs}
                labs={labs}
            />
        </div>
    </div>
    
    {#if isGradingMode && $selectedLabs.length > 0}
        <div class="mt-12 border-t-2 pt-8">
            <h2 class="text-2xl font-semibold josefin-sans-gfont mb-4">Grading Rubric</h2>
            
            <div class="space-y-8">
                {#each $selectedLabs as labId}
                    {@const lab = labs.find(l => l.original === labId)}
                    {#if lab}
                        <Card>
                            <CardHeader>
                                <CardTitle class="flex justify-between">
                                    <span>{lab.title}</span>
                                    <span class="text-sm font-normal">({lab.pts} pt{lab.pts > 1 ? 's' : ''})</span>
                                </CardTitle>
                                <CardDescription>
                                    {lab.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent class="space-y-4">
                                <div class="text-sm border-l-4 border-blue-200 pl-4 py-2 bg-blue-50">
                                    <strong>Grading Criteria:</strong> {lab.gradingCriteria}
                                </div>
                                
                                {#if lab.original === "big-quiz.md"}
                                    <QuizGradeInput
                                        labId={labId}
                                        value={$labGrades[labId]?.directPercentage || 0}
                                        on:change={(e) => updateQuizGrade(labId, e.detail.directPercentage, e.detail.grade)}
                                    />
                                {:else if lab.original === "classification.md"}
                                    <ClassificationTable
                                        labId={labId}
                                        values={$labGrades[labId] || {}}
                                        on:change={(e) => updateClassificationGrade(labId, e.detail)}
                                    />
                                {:else}
                                    <StandardGradeSlider
                                        labId={labId}
                                        value={$labGrades[labId]?.grade || 0}
                                        on:change={(event) => updateLabGrade(event.detail.labId, event.detail.grade)}
                                    />
                                {/if}
                                
                                <CommentsInput
                                    labId={labId}
                                    value={$labGrades[labId]?.comments || ''}
                                    on:change={(e) => updateComments(labId, e.detail)}
                                />
                            </CardContent>
                        </Card>
                    {/if}
                {/each}
            </div>
            
            <GradeSummary
                score={$totalScore}
                totalPoints={$totalPoints}
                maxScore={maxScore}
            />
            
            <div class="mt-8">
                <h3 class="text-xl font-semibold mb-4">Copy-Paste Grading Report</h3>
                <textarea
                    class="w-full h-64 font-mono text-sm p-4 border rounded"
                    readonly
                    value={$gradingReportText}
                ></textarea>
            </div>
        </div>
    {:else if isGradingMode && $selectedLabs.length === 0}
        <div class="mt-12 border-t-2 pt-8">
            <h2 class="text-2xl font-semibold josefin-sans-gfont mb-4">Grading Rubric</h2>
            <div class="p-8 text-center bg-gray-50 rounded-lg border border-gray-200">
                <p class="text-lg text-gray-600">Please select at least one lab to show the grading rubric.</p>
            </div>
        </div>
    {/if}

    <div class="mt-8">
        <Button on:click={toggleGradingMode} variant="outline">
            {#if !isGradingMode}
                View Grading Form
            {:else}
                Close Grading Form
            {/if}
        </Button>
    </div>
</div> 