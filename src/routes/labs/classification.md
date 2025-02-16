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

### Some Extra Detail about the System and Clasification in General

#### Model and Batches

The model used for classification is `gpt-4o-mini`. It's one of the smaller models, fairly cheap, but it won't perform as well as some other models. However, that gives you a lot to work with because its baseline (i.e. how it works out of the box) is lower.

The batch size is set to 5. When you write a prompt, how many items do you classify with that prompt? One item, two items, five items, ten items? All of that is the batch size. A bigger batch size is quicker because you're classifying more in response, but it's more likely to go down a garden path, get affected by it's other responses (for better or worse) or get confused.

#### Temperature and Stochasticity

The system is set to temperature=0. While setting the temperature to zero reduces randomness as much as possible, these models are inherently random (or 'stochastic'), and especially with the newer models, there is variation even with `temperature=0`. So you'll see that with GPT-4o-mini, if you rerun your classifications, you might get slightly different results.

You can think of it this way. The temperature affects *intentionally introduced* randomness, where having the temperature set to zero leaves only the randomness that comes from the internal processes.

#### Training Data

I put up examples of training data, which are linked to when you select a dataset. Training data is data that you can look at in preparing your prompt. Want to know what the dataset looks like? It's not cheating to look at this data, since the evaluation is against other responses.

E.g. [aut_brick_analysis.md](https://github.com/organisciak/ai-class/blob/main/static/datasets/aut_brick_analysis.md)

Remember few-shot - you can use some of these as examples for your prompt. Just note that a prompt that's too long might lead to the model getting confused, especially a smaller model like the one used here.

### Completion Details

Share your best results on the forum - but *without* the prompt. Keep the prompt - we’ll share our prompts in class.

In the ‘History’ panel, you can copy your results to clipboard. 

### Portfolio Details

*Size: 2 points*

If including in portfolio:

- Share the ‘Copy to Clipboard’ results string for three different datasets, using the 'full' run.

For grading, your prompt will be run against a hidden test dataset (as measured by RMSE) and compared to some bad, okay, and good prompts that I will write. A good grade will perform similarly to my good prompts, or better.

The *target* metrics for how well your prompts have to perform will be posted the week of the class where we share our results.