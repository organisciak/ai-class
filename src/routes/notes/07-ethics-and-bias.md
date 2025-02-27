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

[![bg right:50% 100%](/slides/images/07/twitter-gender.png)](https://www.kaggle.com/datasets/crowdflower/twitter-user-gender-classification)

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

## Lab: Bias Analysis

This lab is a set of exercises for exploring bias in a language model or another generative AI model.

<https://ai.porg.dev/labs/bias-analysis>

---

[References](https://ai.porg.dev/notes/references)
