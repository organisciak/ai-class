---
marp: true
html: true
theme: custom-theme
paginate: true
header: "AI/IA"
footer: "AI in Information Behavior"

---


# AI in Information Behavior

----

## In the News

- o3-mini, o3-mini-high -> Reasoning models getting cheaper and more efficient
- OpenAI releases a deep research model -> cool, doesn't anybody want it?
- S1 paper (Muennighoff et al. 2025):
![bg:right:30% width:500px](/slides/images/05/s1.png)

Will 2025 be the year of improving smaller models?


----

## Skill Check

- What is the AI Effect and why is it relevant to discussions of AI creativity?
- What are the three 'voices' typically recognized by instruction-tuned models?
- How might AI enhance or limit different aspects of creativity (e.g., originality vs flexibility)?
- What makes a good creative partnership between humans and AI?

----

## Today

Information Behavior and AI:
1. LLMs *for* information seeking
2. LLMs and AI-tools as *part* of information retrieval

We'll discuss our [*New Hobby*](/labs/new-hobby) outcomes in the middle.

----

## From Document Retrieval to Information Retrieval

<p class="text-sm">
"As a medium for the display of information, the printed page is superb... With respect to retrievability they are poor. And when it comes to organizing the body of knowledge, books by themselves make no active contribution at all. ...If human interaction with the body of knowledge is a dynamic process involving repeated examinations and intercomparisons of very many small and scattered parts, then any concept of a library that begins with books on shelves is sure to encounter trouble"
</p>

<p class="text-sm italics">
"We need to substitute for the book a device that will make it easy to transmit information without transporting material, and that will not only present information to people but also process it for them, following procedures they specify, apply, monitor, and, if necessary, revise and reapply."
</p>

![JCR Licklider's *Libraries of the Future* (1965) bg right:37%](/slides/images/05/librariesofthefuture.png)

<!--
Also see Bush's As We May Think (1945)
-->

----

# AI Tools and Generative AI in Research and Information Behavior

<!--
Here I aim to be constructive. We'll cover challenges, and tips to work around.
-->

----

## AI Information Retrieval For Ready Reference

- Chat bots are good at information retrieval, *but*

    a. they're not perfect, and
    b. their reliability is selective

- Good for standard advice, common information, ready reference
- Worse for niche or very specific information

-----

## e.g. Research Methods Advice

- Which statistical test to use?
- How to write a literature review?
- What sections would you expect in a research paper on **topic X**?

*If it's something that you expect to be findable online but want to bring it up quickly and responsive to how exactly you're thinking about your problem, try a chat bot*

----

![](/slides/images/05/vocabulary-problem.png)

----

## Speaking Your Language

- For most information seeking, you have to speak the language - a language that you may not know. Chat bots let you speak *your* language.

<!--
 (Furnas et al. 1987)

"If everyone always agreed on what to call things, the user's word would be the designer's word would be the system's word... Unfortunately, people often disagree on the words they use."
-->

----

## Example: Vague Questions, Vague Memories

![New post to 'What's the Name of That Book???' forums bg right:60%](/slides/images/05/goodreads.png)

----

![GPT-4 speculation](/slides/images/05/goodreads-response.png)

----

## Example: Highly-customized Information Seeking

![Cocktail Menu. Depending on how it's prompted it can retrieve real recipes or invent new ones](/slides/images/05/cocktail-example.png)

----

## Coding Assistance

Because of the logical structure of that form of writing, generative AI is particularly effective at helping you write code
- Github Copilot and Cursor, are good implementations of an LLM coding assistant

---

*But I don't code!*

Think about highly structured formats that you use in your professional life

- Stats software (Mplus, R, SAS, Stata)
- Retrieval languages (SQL, SPARQL); complex boolean queries
- Markup languages (HTML, XML, Markdown, JSON, JSON-LD)

---

From my scripting class, *Strategies for Pair Programming with Chat Bots*

[![Strategies for Pair Programming with Chat Bots - https://links.porg.dev/chat-strategies](/slides/images/05/programming.png)](https://links.porg.dev/chat-strategies)

----

## From Last week: Niche and Hallucinated Information

LLMs are not always trustworthy, and *their trustworthiness is variable in different ways than **our** trustworthiness*, making validation a challenge

![width: 100px](/slides/images/05/strawberry1.png)

<!--
- Ask audience about their experience with hallucinated information
-->

-----

## Intermission <!--fit-->

---
## Sharing Our '[*New Hobby*](/labs/new-hobby)' Outcomes
Let's discuss your experiences learning something new with AI assistance:

As a class:
- What new skill or hobby did you explore, and what AI tools did you use?

In groups:
- Share more detail about your project! Not every conversation needs to be about the *tools* - take some show and tell time!
- Did AI help you overcome the "vocabulary problem" in learning something new?
- What were the strengths and limitations of using AI as a learning assistant?
- How did the AI-assisted learning experience compare to traditional learning methods?
- What surprised you most about using AI to learn a new skill?

-----

## Information Retrieval in the Age of LLMs <!--fit-->

----

![Information Retrieval Process](/slides/images/05/framing.svg)

-----

## INDEXING | USER INPUT <!--fit-->
## RETRIEVAL | OUTPUT <!--fit-->

----

What can change?

- A newly designed AI-first retrieval system can design at any step
- *BUT* AI-tools can also be wrapped around an existing system - at varying levels of complexity - to still ease that system's use

-----

## The current AI standard for retrieval

Coming full circle - **AI-based embedding models**

Models derived from the exemplary language understanding of LLMs, trained to put text in a geometric space where *similar text is close together*.

-> just like the vector space model in the 70s
-> just like latent semantic indexing in the 80s

----


## Use traditional information retrieval systems with an AI-first approach

Many traditional search systems that use LLMs in their indexing, access, and document processing

----

## Embedding-based retrieval systems

Ranked Retrieval Model -> not *boolean*, but with grades of *relevance* - the most relevant documents at the top

![Diagram of embedding models height:500](/slides/images/05/embedding-models.svg)

----

![Example from OpenAI](/slides/images/05/embed-example-openai.png)

----

## The Tools

**Embedding Models**: The process that  makes 'text' into 'embeddings'

- Sentence-Transformers, OpenAI Embeddings, Google Gecko, Nomic Embed

**The retrieval system**: The system that can quickly find and rank the document embeddings from a query embeding

-----

![](/slides/images/05/retrieval-systems.png)

----

## Working with existing systems

![Diagram of working with existing systems height:500](/slides/images/05/framing-existing-systems.svg)

----

## Automating Manual Processes (INDEXING > DATA PREP)

LLMs can be implemented into the data preparation process

----

![bg fit](/slides/images/05/aza-classification.png)

----

Project: `To assist, enhance and promote the Attwater Prairie Chicken National Wildlife Refuge’s goal of recovering the endangered Attwater’s prairie chicken and restoring native Texas coastal prairie for the benefit of present and future generations.`

Output:

```
biome_habitat='Grassland'
taxon=['Bird']
common_species_name="Attwater's Prairie Chicken"
```

----

## User Language instead of System Language

![](/slides/images/05/userlang-diagram.svg)

----

Pipeline: Using an LLM to *translate* to the system

![Diagram of retrieval pipeline](/slides/images/05/retrieval-pipeline.svg)

----

## Example: SparQL query over DBPedia (Wikipedia)

1. User: ```Where are the Gothic buildings in the world```

2. LLM: ```SELECT ?building ?location WHERE { ?building dbo:architecturalStyle dbr:Gothic_architecture ; dbo:location ?location . }```

![](/slides/images/05/sparql-query.png)

----

## Result Parsing

![Diagram of result parsing](/slides/images/05/output-parsing.svg)

----

- Examples: SearchGPT (openAI), Perplexity, Google Search

Controversial for web search, because a) cannibalizes effort of a broad swath of creators online and b) *is* convenient, keeping people from leaving search

For your own databases there is the value without the ethical harm (though quality risks remain)

![](/slides/images/05/search-gpt.png)

----

## Elicit

[https://elicit.org/](https://elicit.org/)

![Elicit enables natural language search (and summarization) over peer-reviewed literature](/slides/images/05/elicit.png)

----
## Consensus.app

[https://consensus.app/](https://consensus.app/)

![](/slides/images/05/consensus.png)

----
## SciSpace

[https://typeset.io/](https://typeset.io/)

![](/slides/images/05/scispace.png)

----

## Semantic Scholar

[https://www.semanticscholar.org](https://www.semanticscholar.org/)

![Semantic Scholar is a research search and tracking tool with effective recommendation (passive search)](/slides/images/05/semanticscholar.png)

----

## RAG - Retrieval Augmented Generation

Combines INPUT and OUTPUT parsing with AI - using a chat model, but giving it access to a search engine.* 

Broadly, an example of an AGENT. (by one definition, an AGENT is a system that can take actions in the world)

>- e.g. "What is 1 + 1?" vs "What is 1 + 1? If the question requires a calculator, you can call it with `calculator('1+1')`?" - the latter lets the model offload functions that it's not good. 

<span class="footnote">*This is what the little globe icon in ChatGPT does</span>

----

## Example prompt

*this information is usually abstracted away, but behind the scenes, RAG is really just a prompt*

![RAG Diagram bg left:62%](/slides/images/05/rag-diagram.svg)

----

## You can implement other tools in the 'chain'

*Recall the system prompts we looked at*

![Langchain](/slides/images/05/langchain.png)

----

## Code Interpreter

![](/slides/images/05/strawberry2.png) ![](/slides/images/05/strawberry2.png)


----

# Conclusion

Machine learning can help database searching and information retrieval at every step of the process. LLMs themselves are useful for information behavior *sometimes*, but often more valuable as part of a bigger system.

- Fundamentally, innovations in text-based language modelling allow our interactions with database systems to be more *human*

----

# Today's Lab: [*Prompt & Circumstance*](/labs/prompt-and-circumstance)

> Design a self-contained interactive experience (game, tool, or interface) that lives entirely within a single AI prompt. The experience should activate when a user types 'START' and maintain its designed behavior throughout the interaction.

I've been creating some examples to model this.

- [Phone Adventure](https://chatgpt.com/g/g-679bcae93b9481919ba974889f97e04d-phone-adventure) ([prompt](https://gist.github.com/organisciak/8004bf3ca10a30e11ee5741905d7d4d7))
- [Recipe Master](https://chatgpt.com/g/g-679bc913e62881918e3184610ee78c74-recipe-master) ([prompt](https://gist.githubusercontent.com/organisciak/bf065f30beed8f8d468d0995b59f8eb8/raw/875f6c91523495d32a30c92f16a5cd9331b9a438/gistfile1.txt))
- [Poster Parser](https://chatgpt.com/g/g-md7NjNgW7-poster-parser) ([prompt](https://gist.githubusercontent.com/organisciak/d6348559374ac06b4634e9ebe8195a65/raw/eb074f3636225ac145f3e279cab404f4b029bf9e/gistfile1.txt))

----

[References](/notes/references)