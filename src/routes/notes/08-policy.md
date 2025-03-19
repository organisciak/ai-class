---
marp: true
theme: custom-theme
paginate: true
header: "AI/IA"
footer: "Society and Policy"
---

# AI in Society; Policy and Regulatory Frameworks

----

# Question

What have you used LLMs or other AI for in the past week?

----

## Lab Discussion: Bias Analysis

### Reflecting on Your Experiments

- Which models did you test, and why did you choose them?
- What surprised you most about your findings?
- Did any model perform significantly better or worse than you expected?

----

### Counterfactual Prompting Results

- What demographic variables created the most noticeable differences in outputs?
- Were there subtle differences in tone or framing that revealed potential biases?
- How consistent were the biases across different types of prompts?

----

### Role Reversal Insights

- Did models rely on stereotypes when generating content from different perspectives?
- Where did models draw the line on role-playing certain identities?
- How did "uncensored" models differ from mainstream ones in this exercise?

----

### Synthetic Data Analysis

- What patterns emerged in your synthetic data generation?
- How effective was the model at identifying its own biases in the data?
- Did the model's bias analysis align with your human evaluation?

----

### Broader Implications

- What policy challenges do these biases raise?
- What responsibility do model creators have to mitigate these biases?
- What regulatory approaches might address the issues you discovered?

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
3. 	**Borderline/Gray Area**: A scenario that isn't immediately obvious and could be seen as both ethical and problematic

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

## Labor

![bg right:78% 90%](/slides/images/08/income-inequality-piketty.png)

(Picketty 2014)

----

> Over a long period of time, the main force in favor of greater equality has been the diffusion of knowledge and skills. (Piketty 2014)

*Is AI a skilling or de-skilling technology?*

-----

### AI's Impact on Workers

The 'jagged technological frontier' - productivity gains are unevenly distributed, as are impacts

Concerns:
- **Job Displacement**: Automation of routine cognitive tasks
- **Skill Shifts**: Increasing demand for AI-adjacent skills
- **Wage Depression**: Downward pressure on wages in affected sectors
- **Skill Devaluation**: Devaluing expertise as AI systems appear to replicate it

<span class="footnote">
These are general labor concerns. Workers in the AI industry (moderation, data labeling, etc.) are a futher consideration.
</span>

----

## Policy and Law <!--fit-->

----

## The EU AI Act

- First comprehensive AI regulation in the world
- Adopted by European Parliament in March 2024
- Risk-based approach to AI regulation
- Focuses on transparency, safety, and fundamental rights
- "Brussels Effect": Influence on other jurisdictions, including Colorado

----

## EU AI Act: Risk Categories

The Act classifies AI systems based on risk level:

- **Unacceptable Risk**: Banned outright (e.g., social scoring, manipulative AI)
- **High Risk**: Strict requirements (e.g., critical infrastructure, education, hiring)
- **Limited Risk**: Transparency obligations (e.g., chatbots, emotion recognition)
- **Minimal Risk**: Minimal regulation (most AI applications)

--- 

## EU AI Act: High-Risk Use Cases

The following AI applications are considered high-risk and subject to strict requirements:

- **Biometrics**: Remote identification systems, categorization systems, emotion recognition
- **Critical Infrastructure**: Safety components for traffic, utilities, digital infrastructure
- **Education**: Systems determining access to education, evaluating outcomes, monitoring tests
- **Employment**: Recruitment tools, task allocation, performance monitoring, promotion/termination

----

## EU AI Act: High-Risk Use Cases

- **Essential Services**: Eligibility assessment for benefits, credit scoring, insurance pricing
- **Law Enforcement**: Crime risk assessment, evidence reliability evaluation, profiling
- **Migration & Border Control**: Risk assessments, application examination, identification
- **Justice & Democracy**: Legal interpretation, dispute resolution, election influence

----

## EU AI Act: What must you do if you're 'high-risk'?

- Establish a **risk management system** throughout the lifecycle
- Implement **data governance** - test for representativeness in datasets; "to the best extent possible", free of errors
- Create detailed **technical documentation** for others to determine compliance and risk
- Design systems for automatic **record-keeping** of risk-relevant events
- Provide clear **instructions for use** to downstream deployers
- Enable **human oversight** in system design
- Ensure appropriate **accuracy, robustness, and cybersecurity**
- Establish a **quality management system** for compliance

----

## EU AI Act: Foundation Model Requirements

Special provisions for general-purpose AI models (GPAIs):

- Technical documentation and risk assessments
- Copyright compliance for training data
- Energy efficiency reporting
- Stricter rules for "systemic risk" models ("when the cumulative amount of compute used for its training is greater than $10^{25}$ floating point operations")

*"Free and open licence GPAI model providers only need to comply with copyright and publish the training data summary, unless they present a systemic risk."*

----

## Discussion

- What are the potential positive impacts of the legislation as implemented in the EU AI Act?
- What are the potential concerns the EU AI Act?
- Who benefits? Who is harmed?

----

## Lab: AI Policy Framework

[Lab Details](https://ai.porg.dev/labs/policy-framework)

---

[References](https://ai.porg.dev/notes/references)