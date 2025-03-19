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
    import type { Grades } from '$lib/types';
    import { Button } from "$lib/components/ui/button";
    const selectedLabs = writable<string[]>([]);
    let chart: Chart | null = null;
    let isGradingMode = false;
    
    // Store for grades and comments
    const labGrades = writable<Grades>({});

    function calculateCompetencyScores() {
        const scores = Object.fromEntries(
            CORE_COMPETENCIES.map(comp => [comp, 0])
        );

        $selectedLabs.forEach(labId => {
            const lab = labs.find(l => l.original === labId);
            if (!lab) return;

            lab.coreCompetencies.forEach((comp, index) => {
                // First competency counts double
                scores[comp] += index === 0 ? 2 : 1;
            });
        });

        return scores;
    }

    function calculateTotalPoints(selected: string[]) {
        return selected.reduce((total, labId) => {
            const lab = labs.find(l => l.original === labId);
            return total + (lab?.pts || 0);
        }, 0);
    }
    // Calculate the weighted total score for grading
    function calculateTotalScore(grades: Grades) {
        let totalWeightedScore = 0;
        let totalPossibleWeightedScore = 0;
        
        $selectedLabs.forEach(labId => {
            const lab = labs.find(l => l.original === labId);
            if (!lab) return;
            
            let gradePercentage;
            if (lab.original === "big-quiz.md") {
                // For Big Quiz, use the direct percentage
                gradePercentage = (grades[labId]?.directPercentage || 0) / 100;
            } else if (lab.original === "classification.md") {
                // For Classification, use the calculated average percentage
                gradePercentage = calculateClassificationScore(grades[labId]) / 100;
            } else {
                // For other labs, calculate from inverted grade
                const grade = 20 - (grades[labId]?.grade || 0);
                gradePercentage = grade / 20;
            }
            
            const weight = lab.pts;
            
            totalWeightedScore += gradePercentage * weight;
            totalPossibleWeightedScore += weight;
        });
        
        // Ensure minimum denominator of 9 points
        totalPossibleWeightedScore = Math.max(totalPossibleWeightedScore, 9);
        
        // Calculate weighted percentage and multiply by 650
        const weightedPercentage = totalWeightedScore / totalPossibleWeightedScore;
        
        return Math.round(weightedPercentage * 650);
    }
    
    // Get percentage grade for a numeric grade
    function getPercentageGrade(grade: number): number {
        return Math.round((grade / 20) * 100);
    }
    
    // Generate copy-pasteable grading text
    function generateGradingText() {
        let text = "# Grading Rubric\n\n";
        
        $selectedLabs.forEach(labId => {
            const lab = labs.find(l => l.original === labId);
            if (!lab) return;
            
            let percentage;
            if (lab.original === "big-quiz.md") {
                // For Big Quiz, use the direct percentage
                percentage = $labGrades[labId]?.directPercentage || 0;
            } else if (lab.original === "classification.md") {
                // For Classification, include detailed RMSE metrics
                percentage = Math.round(calculateClassificationScore($labGrades[labId]));
                
                text += `## ${lab.title} (${lab.pts} pt${lab.pts > 1 ? 's' : ''})\n`;
                text += `Criteria: "${lab.gradingCriteria}"\n\n`;
                text += `Dataset metrics:\n`;
                
                if ($labGrades[labId]?.brickRMSE !== undefined && $labGrades[labId]?.brickRMSE !== null) {
                    const brickRMSE = $labGrades[labId]?.brickRMSE;
                    const brickPercent = Math.round($labGrades[labId]?.brickPercent || 50);
                    text += `- AUT Brick: RMSE ${brickRMSE} (${brickPercent}%)\n`;
                }
                
                if ($labGrades[labId]?.boxRMSE !== undefined && $labGrades[labId]?.boxRMSE !== null) {
                    const boxRMSE = $labGrades[labId]?.boxRMSE;
                    const boxPercent = Math.round($labGrades[labId]?.boxPercent || 50);
                    text += `- AUT Box: RMSE ${boxRMSE} (${boxPercent}%)\n`;
                }
                
                if ($labGrades[labId]?.knifeRMSE !== undefined && $labGrades[labId]?.knifeRMSE !== null) {
                    const knifeRMSE = $labGrades[labId]?.knifeRMSE;
                    const knifePercent = Math.round($labGrades[labId]?.knifePercent || 50);
                    text += `- AUT Knife: RMSE ${knifeRMSE} (${knifePercent}%)\n`;
                }
                
                if ($labGrades[labId]?.toxicRMSE !== undefined && $labGrades[labId]?.toxicRMSE !== null) {
                    const toxicRMSE = $labGrades[labId]?.toxicRMSE;
                    const toxicPercent = Math.round($labGrades[labId]?.toxicPercent || 50);
                    text += `- Reddit Toxicity: RMSE ${toxicRMSE} (${toxicPercent}%)\n`;
                }
                
                text += `\nOverall Grade: ${percentage}%\n`;
                
                const comments = $labGrades[labId]?.comments || '';
                if (comments) {
                    text += `Comments: ${comments}\n\n`;
                }
                
                return; // Skip the standard output below
            } else {
                // For other labs, calculate percentage from inverted grade
                const grade = 20 - ($labGrades[labId]?.grade || 0);
                percentage = getPercentageGrade(grade);
            }
            
            // Standard format for other labs
            const comments = $labGrades[labId]?.comments || '';
            
            text += `## ${lab.title} (${lab.pts} pt${lab.pts > 1 ? 's' : ''})\n`;
            text += `Criteria: "${lab.gradingCriteria}"\n`;
            text += `Grade: ${percentage}%\n`;
            if (comments) {
                text += `Comments: ${comments}\n\n`;
            }
        });
        
        text += `## Total Score: ${calculateTotalScore($labGrades)}/650\n`;
        
        return text;
    }

    $: totalPoints = calculateTotalPoints($selectedLabs);
    $: isValidPointRange = totalPoints >= 9 && totalPoints <= 11;
    $: totalScore = calculateTotalScore($labGrades);

    function updateChart() {
        if (!chart) return;
        
        const scores = calculateCompetencyScores();
        chart.data.datasets[0].data = CORE_COMPETENCIES.map(comp => scores[comp]);
        chart.update();
    }

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

    // Calculate percentage based on RMSE value
    function calculateRMSEPercentage(value: number, bottomEnd: number, topEnd: number): number {
        // If worse than bottom end, cap at 50%
        if (value >= bottomEnd) return 50;
        // If better than top end, cap at 100%
        if (value <= topEnd) return 100;
        
        // Linear scale between bottom (50%) and top (100%)
        const range = bottomEnd - topEnd;
        const improvement = bottomEnd - value;
        return 50 + (improvement / range) * 50;
    }
    
    // Calculate overall classification score from submitted datasets only
    function calculateClassificationScore(grades: any): number {
        if (!grades) return 50;
        
        let totalScore = 0;
        let datasetCount = 0;
        
        // Only count datasets that have been filled in
        if (grades.brickRMSE !== undefined && grades.brickRMSE !== null) {
            totalScore += grades.brickPercent || 50;
            datasetCount++;
        }
        
        if (grades.boxRMSE !== undefined && grades.boxRMSE !== null) {
            totalScore += grades.boxPercent || 50;
            datasetCount++;
        }
        
        if (grades.knifeRMSE !== undefined && grades.knifeRMSE !== null) {
            totalScore += grades.knifePercent || 50;
            datasetCount++;
        }
        
        if (grades.toxicRMSE !== undefined && grades.toxicRMSE !== null) {
            totalScore += grades.toxicPercent || 50;
            datasetCount++;
        }
        
        // Require at least 3 datasets
        if (datasetCount < 3) {
            return 50; // Default score if fewer than 3 datasets
        }
        
        return totalScore / datasetCount;
    }
    
    // Update classification grades
    function updateClassificationGrades(labId: string, updates: any) {
        labGrades.update(grades => {
            const current = grades[labId] || { 
                comments: '',
                brickRMSE: null, brickPercent: null,
                boxRMSE: null, boxPercent: null,
                knifeRMSE: null, knifePercent: null,
                toxicRMSE: null, toxicPercent: null
            };
            
            const updated = { ...current, ...updates };
            
            // Calculate overall percentage and set the grade
            const overallPercent = calculateClassificationScore(updated);
            // Reverse the grade (0-20 scale, 0 = 100%, 20 = 0%)
            updated.grade = Math.round(20 - (overallPercent / 100 * 20));
            updated.directPercentage = Math.round(overallPercent);
            
            return { ...grades, [labId]: updated };
        });
    }

    // Handle grade change from StandardGradeSlider
    function handleGradeChange(event) {
        const { labId, grade } = event.detail;
        labGrades.update(grades => ({
            ...grades,
            [labId]: {
                grade: grade,
                comments: grades[labId]?.comments || '',
                directPercentage: grades[labId]?.directPercentage
            }
        }));
    }

    // Handle quiz grade changes from QuizGradeInput
    function handleQuizGradeChange(event) {
        const { labId, directPercentage, grade } = event.detail;
        labGrades.update(grades => ({
            ...grades,
            [labId]: {
                grade,
                directPercentage,
                comments: grades[labId]?.comments || ''
            }
        }));
    }

    // Handle comments updates
    function handleCommentsChange(labId: string, comments: string) {
        labGrades.update(grades => ({
            ...grades,
            [labId]: {
                grade: grades[labId]?.grade || 0,
                directPercentage: grades[labId]?.directPercentage,
                comments: comments
            }
        }));
    }

    // Handle lab selection/deselection
    function handleLabSelection(event) {
        const { labId, selected } = event.detail;
        
        selectedLabs.update(labs => {
            if (selected) {
                return [...labs, labId];
            } else {
                return labs.filter(id => id !== labId);
            }
        });
    }

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
                points={totalPoints} 
                minPoints={9} 
                maxPoints={11} 
            />
            
            <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {#each labs as lab}
                    <LabCard 
                        {lab} 
                        selected={$selectedLabs.includes(lab.original)}
                        on:select={handleLabSelection}
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
                                        on:change={handleQuizGradeChange}
                                    />
                                {:else if lab.original === "classification.md"}
                                    <ClassificationTable
                                        labId={labId}
                                        values={$labGrades[labId] || {}}
                                        on:change={(e) => updateClassificationGrades(labId, e.detail)}
                                    />
                                {:else}
                                    <StandardGradeSlider
                                        labId={labId}
                                        value={$labGrades[labId]?.grade || 0}
                                        on:change={handleGradeChange}
                                    />
                                {/if}
                                
                                <CommentsInput
                                    labId={labId}
                                    value={$labGrades[labId]?.comments || ''}
                                    on:change={(e) => handleCommentsChange(labId, e.detail)}
                                />
                            </CardContent>
                        </Card>
                    {/if}
                {/each}
            </div>
            
            <GradeSummary
                score={totalScore}
                totalPoints={totalPoints}
                maxScore={650}
            />
            
            <div class="mt-8">
                <h3 class="text-xl font-semibold mb-4">Copy-Paste Grading Report</h3>
                <textarea
                    class="w-full h-64 font-mono text-sm p-4 border rounded"
                    readonly
                    value={generateGradingText()}
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