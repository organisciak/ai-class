---
marp: true
theme: custom-theme
paginate: true
header: "AI/IA"
footer: "Multimodal Models"
backgroundImage: "images/09/latentscape.png"
---

# Multimodal Models

---

## What's Happening in AI?

*Student presentation — Week 10*

After the presentation, consider:

- How does this connect to how AI handles images, audio, video, or other modalities?

---

## Introduction to Multimodal AI

AI systems that process and generate multiple types of data (text, images, audio, video)

-----

## Text-to-Image Models

- Key milestones:
  - GANs → Diffusion Models → Transformer-based approaches
  - CLIP (Contrastive Language-Image Pre-training)
  - ViT (Vision Transformer)
  - DALL-E and its iterations, Stable Diffusion, Midjourney
  - GPT-4v - and combining transformers with vision transformers

Let's discuss these in turn.

-----

## Generative Adversarial Networks (GANs, 2014)

GANs are a type of generative model that uses two neural networks:

- A generator network that generates fake data
- A discriminator network that tries to distinguish between real and fake data

For images, the generator network takes a random noise vector and generates an image. The discriminator network takes an image and tries to determine if it's real or fake.

![bg left:30%](/slides/images/09/gan-goodfellow.png)

<span class="footnote">
Image: Goodfellow et al. 2020
</span>

----

## CLIP (Contrastive Language-Image Pre-training, Radford et al., 2021)

![](/slides/images/09/clip.png)

CLIP is a multimodal model that understands the relationship between text and images.

*It's not a generative model - it allows you to measure the similarity between text and images*

----

[LatentScape](https://latentscape.com): Explore a Latent Image Space

![bg](/slides/images/09/latentscape.png)

-----

# Take a moment to think about this

Why would a model that *measures* distance between text and images be useful in *generating* images?

----

Think back to the GAN 'discriminator' network.

Having a *measurable* relationship between an image and text means you can start training a generator, and automatically score if it's generating good or bad images.

You can use that as a *reward* to train your generator.

----

## Before we consider generative models, let's discuss what else we can do with CLIP

----

## DALL-E (OpenAI, 2021)

DALL-E 1 is a text-to-image generation model that uses CLIP and a trained transformer model.

![bg right:60%](/slides/images/09/dalle.png)

<p class="footnote">
Subsequent versions of DALL-E were 'diffusion' models, which generate 'noise' that is iteratively refined into an image.
</p>

----

## Other Generation Models

- Stable Diffusion / FLUX (open source)
- Midjourney (aesthetic quality)
- Ideogram (text in images)
- Nano Banana 2 / Gemini (Google)

![bg right](/slides/images/09/angry-ocean.png)

![bg right](/slides/images/09/mountaintop.png)

![bg right](/slides/images/09/meadow.png)

<p class="footnote">
Images: <a href="https://replicate.com/organisciak/rad-posters">an SDXL fine-tune</a>
</p>

-----

## GPT-4o: Native Image Generation

<!-- TODO: add screenshot image here -->

Launched **March 2025** — a new axis for thinking about image generators:

- **Instruction-following**: follows complex, specific prompts with high fidelity
- **Context-aware**: understands and preserves context across multi-turn edits
- **Reference image uploads**: accepts your own images as input
- **Precise editing**: modify specific parts of an image without touching the rest

> **Midjourney** optimizes for *aesthetic quality*
> **GPT-4o** optimizes for *instruction precision*

Two different tools for different creative goals.

-----

## The Studio Ghibli Moment

<!-- TODO: add screenshot image here -->

**March 2025**: GPT-4o image generation launched → millions of users generated images in the style of Studio Ghibli

- Hayao Miyazaki had famously called AI art **"an insult to life"**
- Now his studio's distinctive visual style was being replicated at massive scale

Became a cultural flashpoint about:
- Can artistic **style** be protected by copyright? (legally: no — but ethically?)
- What does it mean to be an artist when style is instantly replicable?
- Is this **homage or appropriation**?

*Good discussion question: Where do you land on this?*

-----

## Nano Banana: Google's Image Model Family

<!-- TODO: add screenshot image here -->

An unusual name for a powerful model family — the codename stuck:

- **Nano Banana** *(Aug 2025)*: Debuted anonymously on Arena (chatbot benchmark platform); later revealed as a Google DeepMind model
- **Nano Banana Pro** *(Nov 2025)*: More capable version
- **Nano Banana 2** *(Feb 26, 2026)*: Integrated into Gemini, Google Search AI Mode, and Google Lens; built on Gemini Flash Image architecture; strong instruction-following image editing

The name itself is a good class moment: AI model naming is sometimes arbitrary — codenames that were never meant to be public sometimes stick.

-----

## Video Generation

<!-- TODO: add screenshot image here -->

Video went from "impressive demo" to **production tool** in 2025:

- **Veo 2/3** (Google): production-grade video generation from text prompts
- **Runway Gen-4**: professional film quality, used by actual productions
- **Kling 2.0**: competitive alternative with strong motion quality

> Key shift: In 2024 these were party tricks. By 2025, filmmakers were shipping work made with these tools.

*Note: The next slide covers OpenAI's Sora specifically.*

-----

## [Sora](https://openai.com/index/sora/?video=913353498)

[![bg cover](/slides/images/09/sora-otter.png)](https://openai.com/index/sora/?video=913353498)

<p class="footnote">
Sora launched publicly <strong>December 2024</strong> (previously preview-only) — now a production product.
</p>

----

# [Oasis](https://oasis.decart.ai/)

![bg contain](/slides/images/09/oasis.png)

----

# Beyond Generation

-----

This is an AI literacy class. How is this something that we end up using?

Unlike with text where generative models proved to be extremely useful, with visual language the generative capabilities tend to be more *fun* or *specialized* (e.g. art and film; stock photography).

Visually, interpretive capabilities tend to be more broadly practically useful.

-----

## Vision Transformers

![bg left:40% 100%](/slides/images/09/vit.png)

Vision Transformers (ViT; Dosovitskiy et al. 2020) are a type of transformer model that are specifically designed to process images.

<p class="footnote">
DALL-E was a transformer-based *autoregressive* (i.e. decoder-only generative model) model - here, we're talking about an *encoder* model - which can be used to understand images.
</p>

----

The Vision Transformer approach makes clear that images can be treated the same way as text, so why not use them together?

> **GPT-4V** (OpenAI, 2023); **Claude 3 Vision** (Anthropic, 2024); **Gemini** (Google, 2023); **LLaMA 3** (Meta, 2024)

----

![bg left:57%](/slides/images/09/describe-image.png)

>What makes this composition particularly compelling is the juxtaposition of the dog's natural solemnity against the playful absurdity of being dressed as the very food item that shares its colloquial name.

----

![bg contain](/slides/images/09/dog-koan.png)

----

<div class="column text-sm">

`Order on Jonathan Sergeant, Treasurer, to pay £17 19s. 10 1/2 d. to Richard Scott, for work done about the college, according to the within account.`

</div>

![bg left](/slides/images/09/nypl-letter.png)

----

![bg contain](/slides/images/09/nypl-letter.png)

![bg contain](/slides/images/09/nypl-transcription.png)

----

### What do we use it for?

- Image classification and recognition
- Object detection and segmentation
- Scene understanding and visual reasoning
- Zero-shot visual recognition
- Accessibility

----

... And just like that...

----

![bg fit](/slides/images/09/gpt4o.svg)


----

Short Exercise: Try GPT Voice Mode

** In groups of 3-4, try out the new voice mode in GPT-4o, around one phone (onsite) or following with a single group leader (on Zoom) **

----

# Creative Applications

----

[Whisk](https://labs.google/fx/tools/whisk)

![bg left:15%](/slides/images/09/whisk1.png)

![](/slides/images/09/whisk2.png)

----

Whisk: Example of clever application design
  - Generating images based on example style, scene, and subject images
  - Using analyzed text descriptions from examples to create prompts
  - Demonstrates how application design can simplify complex technology

----

[Artbreeder Splicer](https://www.artbreeder.com/splicer)

![](/slides/images/09/artbreeder.png)

----

## [*Suno*](https://suno.com/explore)

![bg cover](/slides/images/09/suno.png)

----

## [*MusicFX*](https://labs.google/fx/tools/music-fx)

![bg](/slides/images/09/musicfx.png)

----

### Ethical Considerations
- Image rights and copyright challenges
- Deepfakes and potential misuse
- Consent and privacy issues
- Bias and representation issues in generated imagery
- Content safety measures and limitations

----

### The Copyright Landscape for AI (2025)

Courts are actively working out the rules — expect continued uncertainty.

**Emerging key principle: competitive substitution**
- Does the AI compete with the original creator's market?
- Training to produce something transformative ≠ training to reproduce or replace the original
- *How* you acquire training data matters, not just *what* you do with it

----

### Key Cases (2025)

- **Thomson Reuters v. ROSS Intelligence** (Feb 2025): ROSS built a legal AI trained on Westlaw content — **not fair use** because it competed directly with the original
- **Bartz v. Anthropic** (June 2025): Training on books found "spectacularly transformative" (fair use), BUT acquiring books from pirate sources (LibGen) was not; Anthropic settled ~$1.5B
- **Kadrey v. Meta** (June 2025): Training on books was fair use — narrow, fact-specific ruling; contrast with Thomson Reuters on the question of competitive substitution
- **US Copyright Office** (May 2025): Current AI training practices likely do not qualify as fair use when they compete with human creators' markets

----

### What This Means

- The law is still being made — uncertainty is real and litigation is ongoing
- **For LIS professionals**: sourcing matters — licensed data vs. scraped or pirated content carries different legal risk
- **For AI developers**: the "competitive substitution" test is the emerging standard
- 74% of professional visual artists report lost income from AI substitution (Artists Rights Alliance, 2025)

*Discussion: Who bears responsibility — the model maker, the platform, or the user?*

---

![bg left:50%](/slides/images/09/david-attenborough.png)

---

### Is It a Tool or an Fake Artist?

Consider:
- Bad AI art doesn't preclude good art with AI in your toolkit
- How artists leverage AI tools for creative expression
- The interplay between human direction and AI capabilities
- Practical approaches to using AI in creative workflows

----

## [Lab: AI Art Exhibition and Critique](/labs/ai-art-exhibition)

-----

[References](https://ai.porg.dev/notes/references)

