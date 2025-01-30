---
marp: true
theme: custom-theme
paginate: true
header: "[AI/IA](https://ai.porg.dev)"
footer: "Talking to Bots"

----

# How to Talk to Chat Bots

- What instruction-tuned LLMs are good at
- And constructive suggestions for the things they're *not* good at

----

## Skill Check

Take turns asking each other:

- What is transfer learning and why is it important?
- How does a token differ from a word?
- What role does context play in modern AI?
- What is the "bitter lesson" in machine learning?
- How did the Transformer architecture change AI development?
- What is instruction tuning and how does it work?
- What are the difference between full encoder-decoder Transformer models, and decoder-only models?

(some are tricky! - Okay to save those for discussion with the prof)

----

## Definitions

- *Artificial Intelligence* (AI) - a broad category of AI - encompassing modern applications of machine-learning and neural network innovations.
- *Generative AI* (GAI, GenAI, Gen AI) - a generic term referred to the class of AI that can generate text, images, audio, and other media. Generally (but not always) refers to decoder-only models.
- *Large Language Model* (LLM) - an alternative way to refer to Transformer-based text models, more specifically focusing on the 'modeling' rather than the 'generation'. As more models are becoming multi-modal, `GenAI` is growing as a more general term.

<p class="footnote">
Grounding some language that we've danced around in the previous two weeks. Note that, with the rapid pace of development, language use in the wild is varied and sometimes muddled.
</p>

----

## Caveat Emptor: Rapid Pace of Improvement

- Discussion of what LLMs are poor at is doomed to be out of date
- Important not to extrapolate 'poor now' to 'poor forever'

----

## Good and Bad: Stochastic Outputs and `Temperature`

The `temperature` setting adjusts how much the selection of next token deviates from the most likely.

- Good: It's what lends chat bots that 'human-ness'.
- Bad: It is random and can lead down garden paths

----

## Next-Token Log Probabilities

![height:600px](/slides/images/03/log-probabilities.png)

----

## Temperature

- GenAI is stochastic, with the `temperature` setting determining how much the selection of next token deviates from the most likely
- this makes them feel more 'human', but for some tasks, you want the 'best' answer, not a random sampling
- setting temperature to zero makes a model near-deterministic
- It can only be set in the API, or in advanced playgrounds like Google AI Studio (https://aistudio.google.com/), Anthropic Console (https://console.anthropic.com/), or the OpenAI Playground (https://platform.openai.com/playground/)

----

![Temperature=0](/slides/images/03/temp-0.png)

----

<style>
.columns {
  display: flex;
  gap: 1rem;
}

.column {
  flex: 1;
}
</style>

<div class="columns">
<div class="column">Temperature=1.0<img src="/slides/images/03/temp-1.png" alt="Temperature=1.0"></div>
<div class="column">Temperature=1.0, re-run<img src="/slides/images/03/temp-1-2.png" alt="Temperature=1.0, re-run"></div>
</div>

-----

Temperature=2.0
![Temperature=2.0](/slides/images/03/temp-2.png)

----

## Practical Tips: Why does temperature matter?

For many casual uses, the default temperature in chat bot front-end websites is fine.

But:

1) Regenerate! Don't settle on first responses
2) Set to 0 when appropriate: where you need the single best answer (e.g. for classification) or need reproducibility (e.g. for research)

----

## Good and Bad: Zero-Shot and Few-Shot Learning <!--fit-->

----

## Zero-Shot vs Few-Shot Learning

- *Zero-shot learning* - asking the model to perform a task without examples
  - e.g. "Classify this text as positive or negative:"
- *Few-shot learning* - providing a few examples in the prompt before the task
  - e.g. "Here are some examples of text classifications:
    'I love this!' -> positive
    'This is terrible' -> negative
    Now classify: 'It's okay I guess'"

<p class="footnote">
A less important distinction for this class, but good to note: few-shot can be used in the context of <em>training</em>, or <em>prompting</em>. For our uses, we're really talking about the latter - giving a general model a few examples of expected output.
</p>

----

LLMs are remarkably good at zero-shot and few-shot learning

**This means you can ask a *general* model to do a task, without having to train a model for that task - just prompt it!**

Good: Accessible, fast, and easy

Bad: 'Good enough' - Just because zero-shot is *good*, don't forget that few-shot is *better*.

----

## Provide examples! <!--fit-->

Show the model what you want outputs to look like.

----

## Bad: Logical Reasoning

Chat bots are poor at logical reasoning, *but*
    a. they're improving, and
    b. you can help them by **making more of the reasoning explicit** (e.g. Wei et. al 2022)

----

## Tip: Chain-of-thought Reasoning (Wei et. al 2022)

![](/slides/images/03/chainofthought.png)

---

## Tip: Work the Memory

  Think about what's in the history. Don't be afraid to go backward in the chat.

e.g.

> "Write a new scifi story about a universe where people have feet for hands"

vs.

> "Write the plot summary of a new scifi story about a universe where people have feet for hands" > "Write 10 worldbuilding snippets from the story" > "Write a SparkNotes-style character summary" > "Write the first chapter of the story" (etc.)

Each step makes more thinking explicit

---

## Tip: Use Reasoning Models Models When You Need Them

- `o1`/`o1-mini` (OpenAI), `DeepSeek-R1` (DeepSeek), `Gemini 2.0 Flash Thinking Experimental` (Google - hot off the press!)

- These models are designed to take more time to think through the problem, and then give a more thoughtful response

----

[!['Thought for 27 Seconds' width:800px](/slides/images/03/o1-example.png)](https://chatgpt.com/share/66feb239-02d8-8001-aa46-4871d370799d)

The `o1-preview` feature demonstrates how more advanced AI models can take time to process and formulate responses, following the Chain of Thought paradigm

----

*Gemini 2.0 Flash Thinking*
Thought for 7.3s

![bg right:60%](/slides/images/03/flash-thinking-example.png)

-----

Reasoning models are **slow**, but can be helpful for reasoning tasks that require more steps of thought.

They can also be great for preparing training examples or few-shot examples for training other models or crafting prompts

----

## Bad: Chat Bots are Eager to Please

Chat bots don't express uncertainty well, and may give responses that they don't know about without noting their low confidence

<p class="footnote">
This is useful sometimes for fun and creative uses, but a problem for information-seeking tasks
</p>

----

## Bad: Niche Information and Hallucinated Information

- This is the problem that research libraries are dealing with - imagined citations, imagined facts, imagined people
- solutions:
  - Human: Doublecheck and confirm!
  - System: Give the LLM access to traditional information retrieval tools (retrieval augmented generation), or other tools 

(We'll discuss this more in week 5, and week 10)

----

## The Incredulous User: Doublecheck and Confirm

Even if you don't trust the *information* that GenAI gave you, it often has given you the *language* for the information space you're in. Once you speak it, it should be easier to confirm with other sources

----

## Bad: Low Perplexity

- there's an appeal to having it write for you - but, even with 'temperature' up, often it's too predictable and dry
- Good for code, but makes for boring writing

----

## Tips: use it as a collaborative brainstormer and auditor

- LLMs *can* give voice to those that can't express themselves well in writing, and we shouldn't discount that
- Keep the writing to yourself, but use it to help you think through your ideas. 
- Have it ask questions, suggest edits, suggest structure, etc.
    - e.g. "Ask elaborative questions"; "What question do you have about this"
- Prompt for divergence: Explicitly ask for creativity, originality, out-of-the-box thinking, etc.

----

## Bad: The output is very dependent on the the input.

Sometimes, the best way to ask something isn't clear.

-----

- Style guides. e.g. Google's [Introduction to Prompt Design](https://developers.generativeai.google/guide/prompt_best_practices)
- Experimentation: Rewrite prompts, try different protocols, reorder components of your prompt, etc.

----

## Conclusion

Chat bots are like Wikipedia - often correct, but present reliability challenges, hard to identify when it's wrong, and it challenges our traditional ways of assessing reliability and trustworthiness

They requires a new kind of learned literacy

---

## Summary of Chat Bot Tips

- Use temperature to control the randomness of the output
- Regenerate!
- Use few-shot learning (i.e. examples!) to get the model to do what you want
- Use reasoning models for in-depth questions
- Use chat bots as a collaborative brainstormer and auditor
- Prompt for divergence

---

## Labs

- Bot Don't Kill My Vibe
- Make it More

Both of today's Labs have a discussion forum. Work on the labs in-class and possibly at home, and post your work there before next week's class.

----

[References](https://ai.porg.dev/notes/references)
