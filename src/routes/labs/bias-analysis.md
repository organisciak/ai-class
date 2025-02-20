## Bias Analysis

*Week 7*

Competencies: **Society Ethics and Policy,** Critical Analysis, Fluency, and Evaluation

### **Overview**

This lab is a set of exercises for exploring bias in a language model or another generative AI model.

### Details

Choose a model (either a hosted online LLM, or a smaller local LLM, or a multimodal model) and go through each of the exercises.

**Counterfactual Prompting**

*Qualitative*

1. Create pairs of prompts that are identical except for a single demographic or contextual detail (e.g., changing names, pronouns, or cultural markers).
2. Compare the outputs to see if there are systematic differences in tone, detail, or quality.

**Role Reversal and Perspective Switching** 

*Qualitative*

1. Ask the model to generate content from the perspective of various characters, drawing out their profile (e.g. gender, socioeconomic background, etc). Challenge it to “role-play” or simulate conversations between personas with different identities.
2. Chat with the model to assess if it relies on nuanced or simplistic stereotypes. Does this model even allow you to pursue this exercise? If not, can you tease out the ‘line’?

**Synthetic Data Generation and Bias Awareness**

*Quantitative*

1. Prep: Generate a dataset of people across varied demographic details. This can be done with another model, or a separate chat with the same model. Ideally, you can generate the dataset as ‘comma separated values’, or a CSV, to structure the data as a table.
2. In a new chat, paste in your dataset, and ask the LLM to create synthetic data for each entity. That is, you’re adding a ‘column’ to your dataset (e.g. job application feedback; professor course evaluations; recommendation profile)
3. In another new chat, ask a model to tag the synthetic data for bias-related fields, as appropriate. For example, for job applications, you can tag sentiment of the feedback. Then ask it to programmatically analyze the dataset to see if there are trends by demographics.

Consider two questions with this exercise. 1) Were there demographic biases in the synthetic data analysis uncovered by the analysis? Are they acceptable or unacceptable? 2) Does the analysis align with your own impressions? I.e. was the *tagging of bias* good, or not?

### Notes

- Step #1 of each exercise is a creative exercise in itself -  engage with it as such.
- Don’t adopt stereotypes yourself - be agnostic in what you ask of the model, and see what it puts out.
- It’s okay for a model to ‘pass’. We’re trying to test the models, not excoriate them.
- Compare your chosen model to models that are supposedly ‘uncensored’.

### Completion Details

We’ll discuss this in class, no submission necessary. For structuring that discussion, I recommend preparing a report card in the style of the ‘Portfolio Details’ - though it’s not necessary unless you’re actually including in your portfolio.

### Portfolio Details

*Size: 2 points*

If including in portfolio, 1) document your experiments (i.e. types of prompts you used), and 2) prepare a ‘report card’ for your model.

Experiment card template:

```json
Experiment Name: [Name of specific bias test]

Model Tested: [Model name and version]
Test Category: [e.g., Gender Bias, Cultural Sensitivity]

Experimental design:
[e.g. list your prompt pairs; or explain what you compared 
for roleplaying; or outline what type of synthetic data 
you generated]
```

Prepare a report card template (adjust categories and structure as necessary):

```json
Model Name: [Name]
Test Date: [Date]

Categories Tested:

- Demographic Representation (Grade: A-F)
- Cultural Sensitivity (Grade: A-F)
- Gender Bias (Grade: A-F)
- Socioeconomic Bias (Grade: A-F)
- Bias Awareness (Grade: A-F)

Overall Grade: [A-F]

Comments / Details (be brief):

- Strengths:
- Areas for Improvement:
- Notes:
```

Grading will focus on the clarity of documentation, quality of analysis, and demonstrated understanding of bias detection methodologies.