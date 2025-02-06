# AI Prompt Scoring System Specification

This document specifies the design and implementation details for the AI Prompt Scoring System. The system is used to evaluate user-submitted prompts against validation data and compute performance metrics. It covers both the front-end user interactions and the back-end processing necessary for communicating with the OpenAI API, scoring responses, and persisting run history in Firebase.

---

## Overview

The scoring system is designed to support the AI class Lab where students refine LLM prompts for a creative classification task. The system provides two modes of evaluation:
- **Full Validation ("Score on Validation")**: Submits the prompt to the OpenAI API for evaluation on a full (or larger) validation dataset.
- **Quick Validation**: Performs a faster, limited evaluation for immediate feedback.

The system automatically computes scoring metrics from the API response using statistical functions to compare the AI response against ground truth values.

---

## User Interface

### Components

1. **Prompt Input Area**  
   - **Description**: A text entry field (textarea) where the user can input the LLM prompt.
   - **Validation**: Ensure non-empty and properly formatted text.
   - **Technology**: shadcn-svelte Textarea component
   - **Styling**: Tailwind classes for spacing and layout
   ```svelte
   <Textarea
     class="min-h-[200px]"
     placeholder="Enter your prompt here..."
     bind:value={prompt}
   />
   ```

2. **Action Buttons**  
   - **Score on Validation**:  
     - Triggers a full-scale evaluation by sending the prompt to the server-side API.
     - Displays a loading indicator while processing.
   - **Quick Validation**:  
     - Triggers a rapid, reduced batch evaluation for immediate feedback.
     - May use a cached smaller version of the validation data for faster results.
   - **Technology**: shadcn-svelte Button components
   - **Icons**: Lucide icons for visual feedback
   ```svelte
   <Button variant="default" on:click={handleValidation}>
     <PlayCircle class="mr-2 h-4 w-4" />
     Score on Validation
   </Button>
   ```

3. **Results Display**  
   - Displays computed metrics (RMSE and Pearson r) in real-time as batch results return
   - Shows progress indicator for batches being processed
   - Shows status messages (success, error notifications)
   ```svelte
   <Card>
     <CardHeader>
       <CardTitle>Results</CardTitle>
     </CardHeader>
     <CardContent>
       <div class="space-y-4">
         <Progress value={completedBatches} max={totalBatches} />
         <MetricsDisplay rmse={currentRMSE} pearsonR={currentPearsonR} />
         <BatchResults results={completedResults} />
       </div>
     </CardContent>
   </Card>
   ```

---

## Backend API Design

### API Endpoint

- **Endpoint**: `POST /api/classify`
- **Description**: Receives a batch of examples and the prompt, returns classifications
- **Payload Example**:
  ```json
  {
      "prompt": "Your LLM prompt here",
      "examples": [
        { "text": "Example 1 to classify" },
        { "text": "Example 2 to classify" }
      ]
  }
  ```
- **Response Example**:
  ```json
  {
      "classifications": [
          { "text": "Example 1", "score": 4.2 },
          { "text": "Example 2", "score": 7.8 }
      ]
  }
  ```

### Processing Flow

1. **Client-Side Batch Processing**
   - Validation dataset stored in client code
   - Process examples in batches of 5
   - Send each batch to `/api/classify` endpoint
   - Update metrics (RMSE, Pearson r) as each batch completes
   - Display progress and current statistics

2. **Server-Side Processing**
   - Simple endpoint that forwards requests to OpenAI API
   - Returns parsed classifications
   - Handles rate limiting and error cases

---

## Evaluation Metrics

### RMSE (Root Mean Square Error)

- **Purpose**: Measure the standard deviation of the differences between predicted values (from OpenAI API) and ground truth.
- **Calculation**:
  - Formula:  
    \[
    \text{RMSE} = \sqrt{\frac{1}{N} \sum_{i=1}^N (\text{pred}_i - \text{truth}_i)^2}
    \]
  - Implement a function that:
    1. Computes the difference for each pair of prediction and truth.
    2. Squares the differences.
    3. Averages the squares.
    4. Takes the square root of the average.

### Pearson r (Pearson Correlation Coefficient)

- **Purpose**: Measure the linear correlation between the predicted values and the ground truth.
- **Calculation**:
  - Formula:  
    \[
    r = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum (x_i - \bar{x})^2 \sum (y_i - \bar{y})^2}}
    \]
  - Implement a function that:
    1. Computes the mean of both predictions and ground truth.
    2. Sums the product of deviations from the mean.
    3. Calculates the standard deviations.
    4. Computes the Pearson correlation coefficient.

*Both metric functions should be modular, tested, and available to both full and quick validations.*

---

## Workflow Summary

1. **User Interaction**
   - Enter prompt and select evaluation mode (full vs. quick)
   - Click button to initiate evaluation

2. **Client Processing**
   - Split validation set into batches
   - Send batches to `/api/classify`
   - Update UI with progress and metrics as results return
   - Compute final RMSE and Pearson r scores

3. **Results Display**
   - Show real-time progress through batches
   - Display current metrics that update with each batch
   - Show final results when complete

## Type Definitions

```typescript
interface ClassifyRequest {
  prompt: string;
  examples: Array<{
    text: string;
  }>;
}

interface ClassifyResponse {
  classifications: Array<{
    text: string;
    score: number;
  }>;
}

interface ValidationStats {
  rmse: number;
  pearsonR: number;
  completedBatches: number;
  totalBatches: number;
}
```

## Scoring History

### Local Storage Schema

```typescript
interface PromptRun {
  timestamp: number;
  prompt: string;
  metrics: {
    rmse: number;
    pearsonR: number;
  };
}

interface StorageSchema {
  promptHistory: PromptRun[];
}
```

### History Management

1. **Storage Key**: `"ai-prompt-scorer-history"`

2. **Operations**:
   - After successful validation run, append new entry:
     ```typescript
     const saveRun = (run: PromptRun) => {
       const history = JSON.parse(localStorage.getItem("ai-prompt-scorer-history") || "[]");
       history.push(run);
       localStorage.setItem("ai-prompt-scorer-history", JSON.stringify(history));
     };
     ```
   - Retrieve history for display:
     ```typescript
     const getHistory = (): PromptRun[] => {
       return JSON.parse(localStorage.getItem("ai-prompt-scorer-history") || "[]");
     };
     ```

3. **History Display Component**
   ```svelte
   <Card>
     <CardHeader>
       <CardTitle>Previous Attempts</CardTitle>
     </CardHeader>
     <CardContent>
       <div class="space-y-2">
         {#each history as run}
           <div class="flex justify-between items-center p-2 hover:bg-muted rounded">
             <div class="flex-1">
               <div class="font-mono text-sm truncate">{run.prompt}</div>
               <div class="text-xs text-muted-foreground">
                 {new Date(run.timestamp).toLocaleString()}
               </div>
             </div>
             <div class="text-sm">
               RMSE: {run.metrics.rmse.toFixed(2)}
               r: {run.metrics.pearsonR.toFixed(2)}
             </div>
           </div>
         {/each}
       </div>
     </CardContent>
   </Card>
   ```

---

*This specification outlines the core functional and non-functional requirements for the implementation of the AI Prompt Scoring System as part of the lab assignment for the AI class. The design should ensure a seamless user experience, robust error handling, and accurate metric computation.*

## Directory Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── PromptInput.svelte      # Textarea for prompt entry
│   │   ├── ResultsDisplay.svelte   # Display for current run results
│   │   └── HistoryDisplay.svelte   # Display for previous attempts
│   ├── types.ts           # TypeScript interfaces and types
│   ├── metrics.ts         # RMSE and Pearson r calculations
│   ├── storage.svelte.ts         # localStorage management functions
│   ├── validation.ts      # Validation dataset and batch processing
│   └── api.ts            # API client functions
├── routes/
│   └── api/
│       └── classify/
│           └── +server.ts         # Server endpoint for classification
│   └── tools/
│       └── classify/
│           ├── SPEC.md            # This specification document
│           ├── +page.svelte      # Main page component
│           └── +page.server.ts   # Server endpoint for classification
└── tests/
    ├── metrics.test.ts    # Tests for metric calculations
    └── validation.test.ts # Tests for validation processing
```

## Development Plan

### Project Setup & Environment Configuration
- [x] Create a new Git branch for feature development
- [x] Initialize Project
  - Install dependencies (shadcn-svelte, Tailwind CSS, Lucide icons, Firebase)
- [x] Set Up Directory Structure
  ```
  src/lib/components
  src/lib/types.ts
  src/lib/metrics.ts
  src/lib/storage.ts
  src/lib/validation.ts
  src/lib/api.ts
  ```

### UI Layout & Initial Mockup
- [x] Design UI Wireframe
  - Sketch layout for prompt input, action buttons, results display, and history
- [x] Implement Static Mockups
  - Build static version of main page with placeholder data
  - Create component shells with dummy content
- [x] Visual Testing of Layout
  - Verify spacing and responsiveness
  - Adjust Tailwind classes as needed

### Develop UI Components
- [x] Prompt Input Component
  - Create `PromptInput.svelte` with shadcn-svelte Textarea
  - Implement input binding and validation
- [x] Results Display Component
  - Build `ResultsDisplay.svelte` with progress bar and metrics display
  - Test with dummy data
- [x] History Display Component
  - Create `HistoryDisplay.svelte` for previous runs
  - Test layout with static data

### Implement Core Functionalities
- [x] Metric Calculation Functions
  - Implement RMSE and Pearson r in `metrics.ts`
  - Write unit tests with known inputs/outputs
- [x] Client-Side Batch Processing
  - Implement batch splitting logic in `validation.ts`
  - Create dummy processing function with delays
- [x] Storage Functions for History
  - Develop `saveRun` and `getHistory` in `storage.svelte.ts`
  - Test local storage persistence

### API Integration (Dummy Phase)
- [x] Build API Client
  - Implement dummy API client functions in `api.ts`
  - Test API calls from browser console
- [x] Create Server Endpoint (Dummy)
  - Develop `/routes/api/classify/+server.ts` with mock responses
  - Validate client-server communication
- [ ] Integrate Button Actions
  - Wire up validation buttons to trigger batch processing
  - Verify UI updates with dummy responses

### Integration of UI Components & Functionality
- [ ] Connect UI with Batch Processor
  - Integrate all components in `+page.svelte`
  - Test full flow with dummy data
- [ ] Integrate History Management
  - Hook up storage functions
  - Test persistence across page reloads

### Transition to Real API Functionality
- [ ] Replace Dummy API with OpenAI API
  - Update server endpoint for OpenAI communication
  - Implement error handling and rate limiting
- [ ] Test with Real API
  - Validate with test credentials
  - Debug any response discrepancies

### Final UI Polishing and Debugging
- [ ] Refine UI/UX
  - Update styling based on testing feedback
  - Implement loading states and notifications
- [ ] End-to-End Testing
  - Test complete flow from prompt to history
  - Debug any integration issues
- [ ] Documentation & Code Cleanup
  - Update SPEC.md
  - Add inline documentation

### Deployment and Post-Deployment Testing
- [ ] Prepare Deployment Pipeline
  - Set up staging and production environments
- [ ] Deploy to Staging
  - Monitor for runtime issues
- [ ] Final User Acceptance Testing
  - Collect and address feedback
- [ ] Production Deployment
  - Deploy and monitor application health

Each step should be completed and tested before moving to the next to ensure stable, debuggable progress. Steps may be adjusted based on project needs and discoveries during development.