---
marp: true
theme: custom-theme
paginate: true
header: "[AI/IA](https://ai.porg.dev)"
footer: "Technical Foundations of Modern AI"
backgroundImage: "images/02/byte-mag.jpg"
---

# Technical Foundations of Modern AI
## Week 2: How We Got Here

![Byte Magazine, Sept 1981 bg contain left](/slides/images/02/byte-mag.jpg)

---

# Agenda

1. Our AI Toolbelt: Getting to Know the Tools
2. Lab 1 Discussion: Tool Comparisons
3. Skill Check Quiz
4. The Evolution of Text Understanding
5. How Modern AI Works
6. Interactive Exercises
7. Looking Ahead

---

# Class Questions

- Can I work on labs with classmates?
- What chatbot should I use?
- Should I pay for a chatbot?
- How do I *cite* AI?

--- 

# Our Chat Bot Toolbelt

*what is a 'chat bot'? We'll establish some language later today - for now, let's consider it by example*

![bg:right 20%](/slides/images/02/chatgpt-splash.png)

---

![ChatGPT bg right:45%](/slides/images/02/chatgpt-mnight.png)

## ChatGPT (OpenAI)
  - Different models: GPT-4, GPT-4o, o1
  - Strong general capabilities
  - GPT-4 was state of the art for over a year
  - Integration with DALL-E for images, has a multi-modal models that use voice and video
  - extra features: custom GPTs, code interpreter, web search

Basic: https://chat.openai.com / Advanced: https://platform.openai.com/playground

---

## Claude (Anthropic)
  - Known for longer context, detailed analysis
  - Different "personalities": Haiku, Sonnet, Opus
  - Strong coding and technical capabilities
  - Extra features: projects, artifacts

Basic: https://claude.ai / Advanced: https://console.anthropic.com

---

## Gemini (Google)

  - Multiple versions
  - Particularly affordable for dev use
  - Supports video and audio


Basic: https://gemini.google.com / Advanced: https://aistudio.google.com

---

## LLaMA (Meta)

- Open source
- Different sizes, flexible
- Various tools for running - you can run (smaller) versions of this model on your own computer with Ollama (<https://ollama.com>)

---

# Key Features to Consider

*A teaser - we'll dive into these in future weeks*

- Temperature settings
- Context window size
- Multimodal capabilities
- Cost and access limitations
- API availability

---

## More Info on Labs

- 'completion' vs 'portfolio'
- how do I 'submit' -> listed in lab under 'completion details'. Some *don't* have a submission, some do

---

# Lab 1: Tool Evaluation Discussion

Group Discussion:
- What differences did you notice between tools?
- Where did they excel or struggle?
- Any surprising observations?

---

# Skill Check Quiz
*In pairs/small groups*

Take turns asking each other:
1. What are three major impacts of AI on society we discussed?
2. Why is AI literacy important right now?
3. How does AI adoption create potential divides in society?
4. What's the difference between system, use, and effect when discussing AI?

---

# The Evolution of Text Understanding

Today's class tracks the evolution of Large Language Models from the *natural language processing (NLP) side*. Concurrently, there was a rich history in machine learning and artificial intelligence, that eventually intersects with the text handling. See the [https://www.nature.com/articles/nature14539](Deep Learning) article for a good overview.

---

## Tokenization

- Tokenization is the process of breaking down unstructured data into smaller, countable units (tokens)
- In text, there's historically one type of 'token' that reigns supreme: the word
   (so much, that people often use 'token' interchangeably with 'word')

----

## Bag of Words

![bg right:62%](/slides/images/02/wordcloud-week2.png)

- Simple counting - a document is just a collection of words that represented it
- Order doesn't matter

----

## Vector Space Model (Salton, 1970s)

 - Words as coordinates
 - Similarity through distance
 - Basic relationships emerge
 - Can compare 'distance' between a document of words

---

| Document | cat | dog | pet | food | bowl |
|----------|-----|-----|-----|------|------|
| doc1.txt | 2   | 0   | 1   | 1    | 1    |
| doc2.txt | 0   | 3   | 1   | 2    | 1    |
| doc3.txt | 1   | 1   | 2   | 0    | 0    |
| doc4.txt | 2   | 3   | 2   | 0    | 0    |

---

![bg contain](/slides/images/02/cosine.png)

<span class="footnote">
Caveat: this is a simplified example. In reality, 1) we're comparing across *all* dimensions, not just cat/dog, and 2) we're using cosine distance, so these are scaled to unit vectors
</span>

---

*What problems might we run into with by thinking of text as just a jumble of words?*

---

## Problems with the Vector Space Model

- Not all words matter equally
- Synonymy and polysemy are difficult to handle
- Semantic relationships are hard to capture
- What about new words??
- Size of the matrix is the size of the vocabulary - that will get huge!
  - and the matrix is 'sparse' - most of the values are 0

---

*Thought - not all words matter equally*

'Term weighting' emerged in the early 1980s as a way to downweight common words in systems like the vector space model (e.g. the work of Sparck-Jones)

---

# Making It Smaller, Making It Smarter

![Latent Semantic Analysis (Deerwester et al. 1990) bg right:70%](/slides/images/02/lsa.png)

----

## Latent Semantic Analysis
*1980s (Deerwester, Dumais, Furnas, Landauer)*

"You shall know a word by the company it keeps" - J.R. Firth

  - Finding hidden patterns
  - Reducing complexity

----

Document-term matrix is reduced to a `document-concept` matrix and a `concept-term` matrix

e.g. a word like 'dog' might be related to concepts like 'animal', 'pet', etc.

a document about pets might represent all of the concepts that the words in the document represent

---

*Take a moment to digest this. What would the **practical** implication be of this approach?*

---

# Finding Hidden Patterns: Synonymy

"The quick brown fox jumps over the lazy dog"
"A fast dark fox leaps above the idle canine"

- LSA helps find these relationships
- Similar meaning, different words
- Understanding beyond exact matches
- Also, your document representations are now much smaller, and less sparse

----

# Word Embeddings

*2000s (Mikolov et al, Pennington et al), following two decades of interation on LSA*

  - 'embedding': a vector representation
  - word2vec/GloVe revolution
  - conceptually similar to LSA, but trained on term co-occurrence in a window, rather than term-document matrix. This allows scaling!
  - Words carry meaning

---

![Word2Vec Examples with capitals bg contain right](/slides/images/02/word2vec-capitals.png)

## King - Man + Woman = Queen

- Word embeddings capture relationships
- Words as mathematical vectors
- Enable arithmetic with meaning
- Other examples:
  - Paris - France + Italy = Rome

<span class="footnote">
(Img: <a href="https://gist.github.com/fgiobergia/b3a20e097f9b697d0a02fb17685cfd5a">Flavio Giobergia</a>)
</span>

----

## Transfer Learning

- word2vec released with a large, pre-trained model of language
- before, models were typically trained on *your specific data*
- Not a new concept, but word2vec popularized it

This was revolutionary because:
- Not everyone had massive computing resources
- Not everyone had massive datasets
- Democratized access to sophisticated NLP

---

* What *hasn't changed through all this time? Why?*

---

# Understanding Complex Language

## Sequences matter in some cases!

- Polysemy: river 'bank', 'bank' as a financial institution
- Syntactic ambiguity: "The old man the boat", "The horse raced past the barn fell"

*But: too computationally intensive to consider all possible sequences*

----

# The Bitter Lesson (Sutton, 2019)

Key Points:
- Computation beats clever algorithms
  - but algorithms that allow computation to scale are valuable
- Scale changes everything

----

## Improvements from Word Embeddings to the Models of Today

- changing tokenization (e.g. fastText) to use subwords
- adopting nueral networks innovations for efficient training(e.g. ELMO, with LSTM)
- using attention mechanisms to further allow more computation for learning

--- 

## Updates to Tokenization

  - Modern subword tokenization: BPE (Byte-Pair Encoding)
  - Balance between efficiency and meaning
  - Handles unknown words better

---

<https://tiktokenizer.vercel.app>

![](/slides/images/02/tiktokenizer.png)

---

## Attention is All You Need <!--fit-->

----

![Exbert Viz of Attention](/slides/images/02/attention-viz.png)

<https://huggingface.co/spaces/exbert-project/exbert>

---

# Transformer Models
*2017: Attention is All You Need, 2018: BERT*

- 'Transformer' proposed using self-attention for sequence modeling (Vaswani et al. 2017)
- BERT applied this to a masked training training (Devlin et al. 2018)
- T5 (Raffel et al. 2020) compared different training strategies and introduced 'Text to Text' approach
- GPT introduced decoder-only models (i.e. models that *generate* from the input rather than transformer the input to output)

---

![](/slides/images/02/t5-masked-learning.png)
(Raffel et al. 2020)

---

![](/slides/images/02/t5-text-to-text.png)
Text to Text Approach, with encoder-decoder (Raffel et al. 2020)



---

## Extra Reading

Other things we've learned through the years:

- The bigger general models get, the better they are at *few-shot learning* (Brown et al. 2020; will return to this in week 3)
- Compute is still king (Kaplan et al.'s Scaling Laws)
   - but scaling models and scaling data are a delicate balance - can't just scale up one (e.g. Hoffman et al. 2022)
- And clean input data is really important (e.g. Raffel et al. 2020)
- Reinforcement Learning from Human Feedback (RLHF) can be a powerful tool for aligning models with intended use

---

# Model Architectures

- **Decoder-Only**
  - GPT family (GPT-3, GPT-4), Claude, Llama
  - Focus: Text generation

- **Encoder-Only**
  - BERT, RoBERTa
  - Focus: Understanding/Analysis

- **Encoder-Decoder**
  - T5, BART
  - Focus: Translation, Summarization

---

## Q: *If it's just generating text, how does the computer *chat*?*

---

## A: It's faking it!

----

Input:
```
<|im_start|>system<|im_sep|>You are a helpful assistant<|im_end|>
<|im_start|>user<|im_sep|>Explain Controlled Vocabularies like I'm 5<|im_end|>
```

Output:
```
<|im_start|>assistant<|im_sep|>Okay! Imagine you have a big toy box with all kinds of toys: blocks, 
cars, dolls, and puzzles. Now, what if everyone called the toys different names? Someone might call 
the blocks "building stuff," another person might call them "squares," and someone else might say 
"colorful thingies." That would get really confusing, right?

So, we decide on special names that everyone will use for the toys. For example:

- Blocks are always called "blocks."
- Cars are always called "cars."
- Dolls are always called "dolls."
- This way, when we want a toy, everyone knows exactly what to look for.

Controlled vocabularies are like that but for words. They help everyone use the same names for things
so we can find them easily, especially in big places like libraries or on the internet!<|im_end|>
```
---

# Instruction Tuning
*2022: InstructGPT, FLAN-T5, etc.*

- Models trained on base tasks weren't naturally good at following instructions
- Additional training on instruction-following tasks
- RLHF helps align with intended use

----

## ChatGPT

- instruction-tuned GPT model
- released in November 2022
- immediately captured the public imagination - and launched the the rapid (rabid?) commercialization of artificial intelligence

---

# Beyond Text: Multi-Modal Transformers

- **Vision Transformers (ViT)**
  - Images as patches
  - Same attention mechanism
  - Used in DALL-E, Midjourney

- **Multi-Modal Models**

----

## Why does the history matter?

- Transfer learning is a double-edged sword
   - makes models general purpose and accessible to masses
   - hard to inspect, hard to match performance with your own data
   - But, don't need to train your model from scratch - try *fine-tuning* if you need to adapt to your own data
- parameterization matters for formal use of these models - we'll discussion temperature and few-shot learning in coming weeks
- commercial arms race has consequences for collaboration, reproducibility, and risks, though value for general accessibility and infrastructure

----

# Looking Ahead

- [Lab: New Hobby](/labs/new-hobby) - Covering in a couple weeks, but may be something you want to think about early!
- Next Week: Prompt Engineering Fundamentals
- Questions?

---

# Lab 2: Bot Don't Kill My Vibe

In this lab, you'll learn to use AI systems as a constructive critic to identify potential problems, weaknesses, or overlooked issues in your work. By having AI tools take an adversarial stance, you'll practice extracting valuable feedback while learning to evaluate and filter AI critiques.

[Link to Details](/labs/bot-dont-kill-my-vibe)

Post your entry on Canvas

---

[References](https://ai.porg.dev/notes/references)