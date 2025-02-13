## Classification Prompt Battle

*Week 6*

Competencies: **Technical Understanding**, Critical Analysis, Skilling and Productivity

### Overview

Design and refine prompts for an AI system to classify data, with iterative testing against both a validation datasets.

### Details

You'll be writing prompts to ask a larger language model to score data against a dataset.

Use the following page:

https://ai.porg.dev/tools/classify

For the main task, you'll be writing a prompt to classify or score the originality of responses to creativity tests. 

The model's classifcation outputs, after it has been given your prompt, will be evaluated against a validation dataset of ground truth, and you get a final score for how good your prompt is using two metrics:

1. *Root Mean Squared Error (RMSE)*. This is a measure of how far away overall your scored responses are from the ground truth. 
2. *Pearson correlation (r).* This is a measure of how well the machine output correlates with humans, where 1 is perfect correlation, and zero means no correlation. It is less sensitive and more prone to quirks related to the dataset size, but more readable.

Your goal:

- Choose a dataset
- Develop prompts to classify originality in creativity test responses
- Test prompts against provided validation dataset with immediate feedback
    - Start with the ‘Quick’ run, which only tests 20 responses. Use full when you feel confident in your data.
- Iterate your prompt.

Since you’re iterating after seeing the results, this might be considered ‘training’ data. To prevent over-fixating on certain data, a typical classification process is compared at the end against a held-out test dataset. You don’t need to worry about that here.

### Completion Details

Share your best results on the forum - but *without* the prompt. Keep the prompt - we’ll share our prompts in class.

In the ‘History’ panel, you can copy your results to clipboard. 

### Portfolio Details

*Size: 2 points*

If including in portfolio:

- Share the ‘Copy to Clipboard’ results string for three different datasets, using the 'full' run.

For grading, your prompt will be run against a hidden test dataset (as measured by RMSE) and compared to some bad, okay, and good prompts that I will write. A good grade will perform similarly to my good prompts, or better.

The *target* metrics for how well your prompts have to perform will be posted the week of the class where we share our results.