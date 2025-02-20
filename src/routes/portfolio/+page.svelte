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
    const selectedLabs = writable<string[]>([]);
    let chart: Chart | null = null;

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

    $: totalPoints = calculateTotalPoints($selectedLabs);
    $: isValidPointRange = totalPoints >= 9 && totalPoints <= 11;

    function updateChart() {
        if (!chart) return;
        
        const scores = calculateCompetencyScores();
        chart.data.datasets[0].data = CORE_COMPETENCIES.map(comp => scores[comp]);
        chart.update();
    }

    onMount(() => {
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

            <Card class={isValidPointRange ? 'bg-green-100' : ' text-red-800'}>
                <CardHeader>
                    <CardTitle class="josefin-sans-gfont">Total Points: {totalPoints}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p class="text-sm">
                        {isValidPointRange ? 'Valid point range (9-11)' : 'Please adjust your selection to have 9-11 points'}
                    </p>
                </CardContent>
            </Card>

            
            <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {#each labs as lab}
                    <Card>
                        <CardHeader>
                            <CardTitle class="text-sm flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    id={lab.original}
                                    value={lab.original}
                                    on:change={(e) => {
                                        selectedLabs.update(labs => {
                                            if (e.currentTarget.checked) {
                                                return [...labs, lab.original];
                                            } else {
                                                return labs.filter(id => id !== lab.original);
                                            }
                                        });
                                        updateChart();
                                    }}
                                />
                                <label for={lab.original}>
                                    {lab.title}
                                </label>
                            </CardTitle>
                            <!--<CardDescription class="text-xs workbench-gfont">
                                Week {lab.week === 0 ? 'Ongoing' : lab.week}
                            </CardDescription>-->
                        </CardHeader>
                        <CardContent class="flex flex-col gap-2 text-xs">
                            <div class="mt-1">{lab.description}</div>
                            <!--<div class="mt-1">
                                <span class="text-xs text-gray-500">
                                    Core competencies: {lab.coreCompetencies.join(', ')}
                                </span>
                            </div>-->
                        </CardContent>
                    </Card>
                {/each}
            </div>
        </div>
        
        <div>
            <h3 class="text-lg font-semibold josefin-sans-gfont">Competency Coverage</h3>
            <p class="text-sm italic josefin-sans-gfont mb-4">This chart is just for your reference. It is not used for grading, just for tracking which competencies you're specializing in.</p>
            <canvas id="radar-chart"></canvas>
        </div>
    </div>
</div> 