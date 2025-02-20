---
marp: true
theme: custom-theme
paginate: true
header: "AI/IA"
footer: "Ethics and Bias in AI Systems, Safety Considerations"
---

# Ethics and Bias in AI Systems, Safety Considerations

----

## Labs Discussion

- reminder about completion of labs
- Prompt & Circumstance
- Classification Prompt Battle

----

# In, Out, and About

Helpful to consider challenges *in* the models (e.g. bias, error), *out* - i.e. their use, and *about* - the external impacts of AI adoption

----

# Inside the Model <!--fit-->

---

## Algorithms are not neutral

Algorithms support the status quo
e.g. [gender classifier](https://www.kaggle.com/datasets/crowdflower/twitter-user-gender-classification)

![bg right:50% 100%](/slides/images/07/twitter-gender.png)

----

## Adverse or Unknown Effects

- algorithmic bias - these systems are trained on human data, and *inherit human biases without the human accountability*
- we are still exploring the potential for adverse effects

---

![width:900](/slides/images/07/pred-pol.png)

Lum and Isaac (2016) found that PredPol sends police to black neighbourhoods to police drug crimes.

----

![bg right:40% 60%](/slides/images/07/arrest-ads.png)

Research from Harvard (in 2013) showed that black names on Google are more likely to retrieve ads for arrest records

(Sweeney, L. 2013)

----

## Indirect Discrimination

"Applicant tracking systems—Issues with natural language processing algorithms can produce biased results within applicant tracking systems. For example, Amazon stopped using a hiring algorithm after finding it favored applicants based on words like “executed” or “captured,” which were more commonly found on men’s resumes."
- IBM: [Shedding light on AI bias with real world examples](https://www.ibm.com/think/topics/shedding-light-on-ai-bias-with-real-world-examples)

----

## Tips

- avoid high-stakes uses, or approach with caution
- inspect outputs and errors
- be accountable for the outputs
- consult best practices (e.g. EU AI Act)

<!--
- "'the black box' said it" is not a good defense - and use AI with that accountability in mind
-->

----

## Social Biases

----

> Starting with who is contributing to these Internet text collections, we see that Internet access itself is not evenly distributed, resulting in Internet data overrepresenting younger users and those from developed countries

(Bender et al., 2021)

----

## Cognitive Biases
![](/slides/images/07/cognitive-biases.png)

([Koo et al., 2023](https://arxiv.org/pdf/2309.17012))

----

![](/slides/images/07/cognitive-results.png)

----

## Adverserial Use & Jailbreaks: Overview

- LLMs are highly sensitive to the phrasing of input.
- Jailbreaks involve crafting inputs to bypass or neutralize safety measures.
- They exploit the model's tendency to follow user instructions even if that conflicts with built-in guidelines.
- Adversarial inputs (e.g. "Disregard Previous Instructions") can override internal safeguards
- ![bg left:40% 100%](/slides/images/07/shuttle-disaster.png)

---

![](/slides/images/07/tangerine-poem.png)

----

![height:540](/slides/images/07/grandma-trick.png)

Jailbreaking Discord's Chatbot ([via](https://trans.enby.town/notice/AUjhC6QLd2dQzsVXe4))

----

## Safety mitigations in Generative AI

- Generative AI is uniquely challenging among AI models because it's unrestrained.
- The typical approach then is to develop mitigations either through training the model or assessing the model's outputs.

![bg right:50% 100%](/slides/images/07/openai-safety-training.png)

----

## Red Teaming

- Red Teaming is a technique used to test the safety robustness of a system through an adversarial team
  
- OpenAI value of red teaming (Ahmad et al., 2024):
  -  Discovery of novel risks
  -  stress testing mitigations
  -  augmenting risk assessment with domain expertise,
  -  and independent assessment

----

![bg 50%](/slides/images/gpt-4o-redteaming.png)

-----

Models scheming in Red team tests ([Apollo Research](https://www.apolloresearch.ai/research/scheming-reasoning-evaluations))

![](/slides/images/07/claude-scheming.png)

-----

## Removing all biases isn't always preferred

We* don't want to import the harmful biases of the world, though we also want to be able to accurately *describe* and *understand* the world.

But what does that mean?

> our tuning to ensure that Gemini showed a range of people failed to account for cases that should clearly not show a range. 

([Google](https://blog.google/products/gemini/gemini-image-generation-issue/), "Gemini image generation got it wrong. We'll do better")

 ![bg right:30% 100%](/slides/images/07/image-of-pope.png)

 <!--Gemini result for a pope-->

 <div class="footnote">
  *Well, most of us.
 </div>

----

## Well intentioned fixes are tricky

Example from Bender et al. (2021) about the Colossal Clean Crawled Corpus (C4), which trained T5, is a cleaned dataset that removed any page containing one of a list of about 400 “Dirty, Naughty, Obscene or Otherwise Bad Words”:
> This list is overwhelmingly words related to sex, with a handful of racial slurs and words related to white supremacy (e.g. swastika, white power) included. While possibly effective at removing documents containing pornography (and the associated problematic stereotypes encoded in the language of such sites and certain kinds of hate speech, this approach will also undoubtedly attenuate, by suppressing such words as *twink*, the influence of online spaces built by and for LGBTQ people.

----

# Challenges of Use <!--fit-->

-----

## Bad Operators

There are many possible *unethical* uses of AI - not inherent to the technology, but to it's *applications*

- e.g. cheating, spam, harrassment, misinformation, content farming, etc.

-----

## Exercise: Where Do We Draw the Line?

In groups of 3-5, collaboratively generate three distinct AI use cases, considering 'good/bad/borderline' from the perspective of *ethics*, *safety*, and *risk*

1. 	**Clearly Ethical (“Good”)**: An AI use case where benefits are obvious and risks minimal
2. 	**Clearly Unethical/Inappropriate (“Bad”)**: A use case where the negative impact or misuse is evident
3. 	**Borderline/Gray Area**: A scenario that isn’t immediately obvious and could be seen as both ethical and problematic

----

## Step 2: Sharing your responses

Paste your list, in no particular order, into the spreadsheet (link shared in class)

-----

## Step 3: Voting

*Let's take a 3 minute break, while I randomize the list and paste into Mentimeter - then we vote!*

-----

## Discussion/Debate

----

## AI Slop
 
> Slop describes AI-generated content that is both *unrequested* and *unreviewed*.

([Simon Willison](https://simonwillison.net/2024/Dec/31/llms-in-2024/#the-year-of-slop))

-----

## Problems with Machine Learning in the Real World

*Non-malicious edition*

- Too bad classification
  - A classifier for finding criminals with 99.9% precision can cause a lot of trouble for that final 0.1% - especially if we trust the hits more than misses.
- Too good classification
  - Identifying pseudonymous authors
  - Identifying sexual orientation
- Learning the private from the public
  - scraping public OKCupid profiles
  - political leaning extraction
- Decision-making from incomplete or imperfect information

----

## Accountability Gap

- Unaccountability of black boxes
A person can hide behind a machine's opaque set of decisions (the accountability gap)
  - e.g.
    - easier to reject a job applicant if text mining their social media
    - easier to assign a poor grade if the essay marking bot says so

![bg right:50% 100%](/slides/images/07/accountability-gap.png)

----

## Rules for your applications

- Code of ethics
  - Rules aren't always clear cut, but give you a framework to think about potential problems
  - e.g. @CancelThatCard vs. @NeedADebitCard
- Showing and explaining the decisions of a system
  - EU GDPR: data controllers must disclose significance and envisaged consequences in clear and plain language (Mittelstadt et al. 2016)
- Coders/designers taking responsibility for algorithms
  - Don't hide behind your algorithm's choices

----

### Challenges of communicating what a model is to a user

Should LLMs talk like people? Should a text model say 'I'?

----

Anthropic, on Claude's '[Character Training](https://www.anthropic.com/research/claude-character)':

<div class="text-sm">

> Adopting the views of whoever you’re talking with is pandering and insincere. If we train models to adopt "middle" views, we are still training them to accept a single political and moral view of the world, albeit one that is not generally considered extreme. Finally, because language models acquire biases and opinions throughout training—both intentionally and inadvertently—if we train them to say they have no opinions on political matters or values questions only when asked about them explicitly, we’re training them to imply they are more objective and unbiased than they are.

> We want people to know that they’re interacting with a language model and not a person. But we also want them to know they’re interacting with an imperfect entity with its own biases and with a disposition towards some opinions more than others. Importantly, we want them to know they’re not interacting with an objective and infallible source of truth.

</div>


-----

# About the Model <!--fit-->

----

## Environmental Costs

Framing
-> Model training vs. inference (i.e. when you use a trained model)
-> Individual models vs. the industry

-----

## Inference Costs

The environmental cost of *use* (i.e. your specific prompt) is small, and plummeting.

- GPT-3 Davinci in Mar 2022: $60.00/1M tokens
- GPT-4o-mini in Feb 2024: $0.15/1M tokens 

<span class="text-sm">
Notes: 1) Companies are vague, but usage costs tend not to run at a loss; 2) usage costs would be a mix of hardware+infrastructure+energy.
</span>

![bg right:40% 80%](/slides/images/07/4o-mini-costs.png)

----

## Training 

- Training: the process of creating a model

Big models with disclosed CO2 costs:
- GPT-3: 608 tonnes CO2eq emissions
- Llama 2: 539 tonnes CO2eq emissions

Comparison:
- Boeing 747: ~35 tonnes CO2/hour (i.e. ~525 tonnes round trip NYC to London)
- US per-capita annual fossil fuel emissions ([2023](https://ourworldindata.org/co2-emissions)): 14.3t CO2/year

----

## Aggregate-level Costs

Problem: It's not just *one* company training models.

> OpenAI, Microsoft, Amazon, Alphabet, Meta, Anthropic, Alibaba, Deepseek, etc...

Problem #2: Companies are tooling for an large resource-use future (Deepseek news tempers this?)

![bg left:40% 100%](/slides/images/07/nuclear-msft.png)

----

## In sum

Environment impact estimates are tricky, because:

- It's not just a single model in isolation
- information is vague on the backend use (e.g. R&D, test model training, etc.)
- Energy use is electric, and electric grid impact is variable by region and data center
- And *physical* resources are very complex to estimate (e.g. mining costs for GPUs, energy use of production, etc.)

---

## A few things we know

- costs (environmental and real) are falling
- Lots of redundancy in the industry
- A prompt for a trained model is low impact
- Better hardware is more efficient - improving our chips reduces wasted energy

----

## Lab: Bias Analysis

This lab is a set of exercises for exploring bias in a language model or another generative AI model.

<https://ai.porg.dev/labs/bias-analysis>

---

[References](https://ai.porg.dev/notes/references)
