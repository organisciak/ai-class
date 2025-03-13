---
marp: true
theme: custom-theme
paginate: true
header: "AI/IA"
footer: "Agents"
---

# Agents

----

## Administration

- AI Gallery
- High-level feedback on Portfolio Drafts
- Review of Class Goals
- Lab today?

----

## Course Evaluations

- 10 minutes for course evaluations

----

# Agents

An agent is anything that can be viewed as perceiving its environment through sensors and acting upon that environment through actuators.

- Russel & Norvig 1995

---

## Agents: Core Concepts (Huyen, 2025)

- An agent is characterized by:
  - The **environment** it operates in
  - The **set of actions** it can perform
- AI is the "brain" that:
  - Processes tasks
  - Plans sequences of actions
  - Determines task completion

---

The terminology of 'agents' has been muddled in AI community - there are many things that people call agents

We'll focus on large language models that can *plan* the necessarily actions to complete a task, have access to one or more tools to *execute* those actions, and summarize or *use* the outputs of those actions

---

## Exercise: Planning a Task

<div class="columns">

<div class="column text-sm">

**Tasks**

- Prepare a literature review on library services for non-binary youth
- Develop a collection development plan for a graphic novel section in an academic library
- Organize a community workshop on digital privacy tools for seniors
- Create a research survey and sampling strategy to assess student information literacy skills
- Design a metadata schema for a digital collection of historical photographs
- Develop a recipe book with family favorites that accommodates dietary restrictions

</div>

<div class="column text-sm">

1. Break into small groups (3-4 people)
2. **Spend 5 minutes listing the specific steps you would take to complete this task**
3. For each step, identify:
   - What information you need
   - What tools or actions would be involved
   - What output you expect, and how you'd combined the prior parts
4. Share your approach with another group (on Zoom, ping me when you're at this step)
5. Discuss: How much of this can be approached by an AI Agent?

</div>

</div>

---

## Agent Components

- **Environment**: Defines where the agent operates (web, code editor, game, etc.)
- **Tools**: Extend the agent's capabilities
  - Knowledge augmentation - add access to source documents, rather than relying on model's learned nowledge (e.g. retrieval augmented execution)
  - Capability extension - the things that Language Models can't do themselves (e.g. calculator, code execution, image generation)
  - Write actions (file editing, sending emails)
- **Planning**: The agent's ability to reason about how to accomplish tasks

<p class="footnote">
Huyen, 2025
</p>

---

## We've Seen Agents in Class Already

- Retrieval-Augmented Generation -> Giving an LLM access to web search, or search over your own database
- DALL-E -> Currently, GPT doesn't generate images itself - If you ask for an image, it generates a text-to-image prompt and sends that prompt to a separate image generation tool
- Code Interpreter -> In our class about classification, we saw that you can visual your data at the end of a  (e.g. our 'sentiment classification' exercise). There, the LLM is *writing the code* to visualize the data, then sending that code to a separate tool to run, then returning and interpreting the result.

---

## The Future of Agents

- Autonomous assistants for complex tasks
- Potential to save human time despite computational costs
- Continuous improvement through:
  - Better planning capabilities
  - More sophisticated tools
  - Enhanced security measures

----

## The risks of agents

- Real-world harm
- Unauthorized and highly-sensitive actions (financial transactions, data deletion)
- Privacy violations through excessive data access
- Security vulnerabilities from tool misuse
- Resource depletion (lots of read/write)
- Accountability gaps (who's responsible when agents make mistakes?)
- Amplification of existing biases in decision-making
- Unpredictable behaviors in complex environments

----

## Agents Need More Powerful Models 

- **Compound mistakes**: Errors multiply across multiple steps, so agents need 
  - 95% accuracy per step → 60% accuracy over 10 steps
- **Higher stakes**: With tools, agents can perform more impactful tasks
  - You likely don't want to give access to your email or bank to any machine, but *especially* not to a poor, error-prone model

----

## Agent Failure Modes

- **Planning failures**: Incorrect reasoning, missing steps
- **Tool failures**: Incorrect tool selection, misuse of tools
- **Efficiency issues**: Too many steps, redundant actions

----

## Limits of red teaming

> Since the model has access to the internet, the external red teamers were advised to avoid prompting the model to complete tasks that could cause real-world harm. In certain cases, they created test environments—such as mock websites, databases, or emails—to safely demonstrate possible exploits. Given this constraint, their findings may not fully capture the worst-case real-world risks, but still identified key vulnerabilities that informed additional mitigations

- OpenAI - [Operator System Card](https://openai.com/index/operator-system-card/)

----

# Agents-lite

Code-using LLMs are a basic - but powerful - form of tool-use agent

- see 'code interpreter' in ChatGPT, Javascript artifacts in Claude

![bg left:60% 100%](/slides/images/05/strawberry2.png)

----

# Langchain

![Langchain](/slides/images/05/langchain.png)

----

## Problem: Limits to bespoke tools


Some tools are very valuable, like web search or being able to run Python code. Other tools are easy to implement, like a calculator.

But there's a whole lot of actions you may want to do, and building a tool for each one can get challenging.

Solutions?

----

# Computer Use

![bg](/slides/images/10/computer-use.png)

- Claude Computer Use
- OpenAI Operator
- Google Mariner

----

<video src="/slides/images/10/deepresearch-recording-fast.mp4" controls height="550px"></video>

## Deep Research

----

<video src="/slides/images/10/claude-command-line-3x.mp4" controls height="550px"></video>

## Claude Code

----

<video src="/slides/images/10/aider-demo.mp4" controls height="550px"></video>

## Aider

----

<video src="/slides/images/10/browser-use-demo.mp4" controls height="550px"></video>

## Browser Use

---

![](/slides/images/10/lisbon-itinerary.png)

----

## Code Interpreter / Claude Artifacts 

<div class="text-sm">

In ChatGPT, you can add more instructions to use the tools by saying "use Python to..."

In Claude, You can ask it to "use JavaScript" or "create a React artifact"

ChatGPT's version can run code start to finish to get an output, Claude artifacts can be interactive widgets

Exercise: In pairs, try some of the following 'write and run code' tasks with ChatGPT or Claude

- Upload a CSV dataset and analyze or visualize it
- Create an interactive map showing population data by region
- Build a simple game (like tic-tac-toe or hangman)
- Create a text analyzer that provides readability metrics
- Create a password strength checker
- Make a simple weather data plain-language interpreter
- Build an image resizer

</div>

----

## The Big Quiz

See Canvas. We'll do the quiz in pairs. Remember - it's just review, *unless* you include in your Portfolio.