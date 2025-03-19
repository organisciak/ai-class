<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import Chart from 'chart.js/auto';
    import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale } from 'chart.js';
    ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);
    
    // Props
    export let competencies: string[] = [];
    export let selectedLabs: string[] = [];
    export let labs: any[] = [];
    
    let chart: Chart | null = null;
    let chartContainer: HTMLCanvasElement;
    
    // Calculate competency scores
    function calculateCompetencyScores() {
        const scores = Object.fromEntries(
            competencies.map(comp => [comp, 0])
        );

        selectedLabs.forEach(labId => {
            const lab = labs.find(l => l.original === labId);
            if (!lab) return;

            lab.coreCompetencies.forEach((comp: string, index: number) => {
                // First competency counts double
                scores[comp] += index === 0 ? 2 : 1;
            });
        });

        return scores;
    }
    
    // Update the chart with new data
    function updateChart() {
        if (!chart) return;
        
        const scores = calculateCompetencyScores();
        chart.data.datasets[0].data = competencies.map(comp => scores[comp]);
        chart.update();
    }
    
    // Create or update chart when props change
    $: if (selectedLabs && chart) {
        updateChart();
    }
    
    onMount(() => {
        // Initialize chart
        chart = new Chart(chartContainer, {
            type: 'radar',
            data: {
                labels: competencies,
                datasets: [{
                    label: 'Competency Coverage',
                    data: competencies.map(() => 0),
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
        
        // Initialize with current data
        updateChart();
    });
    
    onDestroy(() => {
        if (chart) {
            chart.destroy();
        }
    });
</script>

<div>
    <h3 class="text-lg font-semibold josefin-sans-gfont">Competency Coverage</h3>
    <p class="text-sm italic josefin-sans-gfont mb-4">
        This chart is just for your reference. It is not used for grading, 
        just for tracking which competencies you're specializing in.
    </p>
    <canvas bind:this={chartContainer}></canvas>
</div> 