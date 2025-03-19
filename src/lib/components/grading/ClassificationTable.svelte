<script lang="ts">
    // Props
    export let labId: string;
    export let values: any = {
        brickRMSE: null, brickPercent: null,
        boxRMSE: null, boxPercent: null,
        knifeRMSE: null, knifePercent: null,
        toxicRMSE: null, toxicPercent: null
    };
    
    // Event dispatcher
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
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
    
    // Handle input for a specific dataset
    function handleDatasetInput(dataset: string, value: number | null, bottomEnd: number, topEnd: number) {
        let percentField = `${dataset}Percent`;
        let updates: any = {
            [`${dataset}RMSE`]: value
        };
        
        if (value !== null) {
            updates[percentField] = calculateRMSEPercentage(value, bottomEnd, topEnd);
        } else {
            updates[percentField] = null;
        }
        
        dispatch('change', updates);
    }
    
    // Calculate dataset count - reactive function
    $: datasetCount = [
        values.brickRMSE !== undefined && values.brickRMSE !== null,
        values.boxRMSE !== undefined && values.boxRMSE !== null,
        values.knifeRMSE !== undefined && values.knifeRMSE !== null,
        values.toxicRMSE !== undefined && values.toxicRMSE !== null
    ].filter(Boolean).length;
    
    // Calculate overall score - reactive function 
    $: overallScore = calculateOverallScore(values, datasetCount);
    
    function calculateOverallScore(grades: any, count: number): number {
        if (!grades) return 50;
        
        let totalScore = 0;
        
        // Only count datasets that have been filled in
        if (grades.brickRMSE !== undefined && grades.brickRMSE !== null) {
            totalScore += grades.brickPercent || 50;
        }
        
        if (grades.boxRMSE !== undefined && grades.boxRMSE !== null) {
            totalScore += grades.boxPercent || 50;
        }
        
        if (grades.knifeRMSE !== undefined && grades.knifeRMSE !== null) {
            totalScore += grades.knifePercent || 50;
        }
        
        if (grades.toxicRMSE !== undefined && grades.toxicRMSE !== null) {
            totalScore += grades.toxicPercent || 50;
        }
        
        // Require at least 3 datasets
        if (count < 3) {
            return 50; // Default score if fewer than 3 datasets
        }
        
        return totalScore / count;
    }
</script>

<div class="space-y-4">
    <div class="text-sm font-medium">
        Enter RMSE values for at least 3 of the 4 datasets:
    </div>
    
    <table class="w-full border-collapse">
        <thead>
            <tr class="bg-gray-100">
                <th class="p-2 text-left">Dataset</th>
                <th class="p-2 text-left">RMSE Value</th>
                <th class="p-2 text-left">Score</th>
                <th class="p-2 text-left">Target Range</th>
            </tr>
        </thead>
        <tbody>
            <!-- AUT Brick Dataset -->
            <tr class="border-b">
                <td class="p-2">AUT Brick</td>
                <td class="p-2">
                    <input 
                        type="number" 
                        min="0" 
                        max="3" 
                        step="0.001"
                        class="w-full border rounded p-1" 
                        value={values.brickRMSE || ''}
                        placeholder="(Optional)"
                        on:input={(e) => {
                            const value = e.currentTarget.value ? 
                                Math.max(0, parseFloat(e.currentTarget.value)) : 
                                null;
                            handleDatasetInput('brick', value, 1.450, 0.900);
                        }}
                    />
                </td>
                <td class="p-2">
                    {values.brickPercent ? 
                        `${Math.round(values.brickPercent)}%` : 
                        '—'}
                </td>
                <td class="p-2 text-xs text-gray-500">
                    1.450 → 0.900
                </td>
            </tr>
            
            <!-- AUT Box Dataset -->
            <tr class="border-b">
                <td class="p-2">AUT Box</td>
                <td class="p-2">
                    <input 
                        type="number" 
                        min="0" 
                        max="3" 
                        step="0.001"
                        class="w-full border rounded p-1" 
                        value={values.boxRMSE || ''}
                        placeholder="(Optional)"
                        on:input={(e) => {
                            const value = e.currentTarget.value ? 
                                Math.max(0, parseFloat(e.currentTarget.value)) : 
                                null;
                            handleDatasetInput('box', value, 1.680, 0.690);
                        }}
                    />
                </td>
                <td class="p-2">
                    {values.boxPercent ? 
                        `${Math.round(values.boxPercent)}%` : 
                        '—'}
                </td>
                <td class="p-2 text-xs text-gray-500">
                    1.680 → 0.690
                </td>
            </tr>
            
            <!-- AUT Knife Dataset -->
            <tr class="border-b">
                <td class="p-2">AUT Knife</td>
                <td class="p-2">
                    <input 
                        type="number" 
                        min="0" 
                        max="3" 
                        step="0.001"
                        class="w-full border rounded p-1" 
                        value={values.knifeRMSE || ''}
                        placeholder="(Optional)"
                        on:input={(e) => {
                            const value = e.currentTarget.value ? 
                                Math.max(0, parseFloat(e.currentTarget.value)) : 
                                null;
                            handleDatasetInput('knife', value, 1.640, 0.620);
                        }}
                    />
                </td>
                <td class="p-2">
                    {values.knifePercent ? 
                        `${Math.round(values.knifePercent)}%` : 
                        '—'}
                </td>
                <td class="p-2 text-xs text-gray-500">
                    1.640 → 0.620
                </td>
            </tr>
            
            <!-- Reddit Toxicity Dataset -->
            <tr>
                <td class="p-2">Reddit Toxicity</td>
                <td class="p-2">
                    <input 
                        type="number" 
                        min="0" 
                        max="1" 
                        step="0.001"
                        class="w-full border rounded p-1" 
                        value={values.toxicRMSE || ''}
                        placeholder="(Optional)"
                        on:input={(e) => {
                            const value = e.currentTarget.value ? 
                                Math.max(0, parseFloat(e.currentTarget.value)) : 
                                null;
                            handleDatasetInput('toxic', value, 0.670, 0.420);
                        }}
                    />
                </td>
                <td class="p-2">
                    {values.toxicPercent ? 
                        `${Math.round(values.toxicPercent)}%` : 
                        '—'}
                </td>
                <td class="p-2 text-xs text-gray-500">
                    0.670 → 0.420
                </td>
            </tr>
        </tbody>
    </table>
    
    <div class="p-3 bg-blue-50 rounded">
        <div class="font-medium">Overall Classification Score:</div>
        <div class="text-xl">
            {Math.round(overallScore)}%
        </div>
        <div class="text-xs text-gray-600">
            {datasetCount >= 3 ? 
                `Average of ${datasetCount} dataset scores` : 
                `Please enter at least 3 datasets (${datasetCount}/3 entered)`}
        </div>
    </div>
</div> 