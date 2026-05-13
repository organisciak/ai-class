## Supervising an Agent

*Week 7*

Competencies: **Skilling and Productivity**, Critical Analysis, Technical Understanding

### Overview

You'll give an AI coding agent a small, LIS-flavored task and *watch it work*.

This is a lab to do honestly. A clean output that came easy teaches you less than a messy output you understood as it happened.

### Pick Your Path

In class, we're using OpenAI's Codex, since there's a free tier (2025). But you can use other coding agents, such as Claude Cowork or Google's Antigravity.

### Pick a Task

Choose one of the five. Download the starter materials, unzip, and point your agent at the folder.

1. **[Messy Bibliography](/labs/supervising-an-agent/01-messy-bibliography.zip)** — ~100 citations with inconsistent author formatting, missing years, near-duplicates. Clean it into a consistent bibliography.

2. **[Metadata Crosswalk](/labs/supervising-an-agent/02-metadata-crosswalk.zip)** — 10 MARC records. Produce a clean Dublin Core conversion plus one-sentence notes per record on what got lost in translation.

3. **[Reader's Advisory Bot](/labs/supervising-an-agent/03-readers-advisory.zip)** — Build a small tool for browsing book award winners. (No starter data — sourcing it is part of the task.)

4. **Research / Study Guide Builder** — From a folder of class materials, produce a structured LibGuide-style document: background, key sources annotated, further reading. Materials are in [Canvas](https://canvas.du.edu/courses/208399/files?preview=18195899) (if that link breaks, look in Files on the course Canvas page).

5. **[Interview Simulator](/labs/supervising-an-agent/05-interview-simulator.zip)** — Set up a "bot interviewer" based on a job posting. Collect more detail about the workplace than the posting alone gives. Iterate on the interview voice; have it save your answers and suggestions.

partway through, tou may also bring **your own task** — something from your work, a side project, a real folder of files.

### Walkthrough

#### 1. Set up

- Make a folder on your computer with your starter files.
- In your agent of choice, add the folder as a project (Codex: "Add New Project"; Cowork & Antigravity have the same affordance).
- Ask the agent what's in the folder. *Just look around.*
- Tell the agent to **initialize the project** — in Codex/Antigravity it'll write `AGENTS.md`; in Cowork it's `CLAUDE.md`. Read that file. What did the agent decide about your project? Anything wrong?

#### 2. Plan first, then act

- Ask the agent to *plan* the task — not do it. Example: *"Don't make changes yet. Tell me how you'd approach [task] with what's in this folder."*
- Read the plan. Is anything missing? Anything that worries you? **Push back if so.**
- Once it looks right, tell it to go.

#### 3. Watch the loop

- As the agent works, watch for the moment it re-reads its own output and changes course. **That's the loop.**
- Note one specific moment: what did it just do, what did it notice, what did it change?
- If it never self-corrects — note that too. Some tasks don't need it; others do and the agent missed it.

#### 4. Try to break it

- With a working result in hand, re-prompt with something deliberately vague, contradictory, or out of scope.
- Watch what happens: does it ask, or does it guess?
- Note one place where a vague prompt produced a confident-but-wrong answer.

#### 5. Iterate

- Got a result? Is it good, bad, workable?
- Consider next steps — or swap to a project of *your own choosing* and see how far you get.

#### 6. Capture as you go

Keep a doc open alongside the agent. Jot down, *while you work*:

- The **plan** the agent proposed (copy/paste)
- The **one loop moment** you noticed
- The **one failure** when you tried to break it
- A screenshot or two of anything that surprised you

The reflection writes itself if you capture as you go.

### Completion Details

Prepare a reflection on the following questions - 1-2 paragraphs. We'll discuss this in class, so you can have basic notes if you don't intend to include in the portfolio.

1. Which task you picked and which agent you used
2. The plan the agent proposed (verbatim)
3. The one loop moment you observed
4. One thing that surprised you and one thing it got wrong
5. A trust question — what would you need to see before you'd let this agent work without you watching?

### Portfolio Details

*Size: 2 points*

If including in your portfolio, submit:

- The above five items as a 1–2 paragraph reflection
- The finished artifact (an output file from the task, or a zipped copy of the working folder)
- Optional: screenshots of moments that mattered

Grading focuses on the reflection — depth of observation about how the agent worked, not the polish of the output - and the quality of the final artifact.