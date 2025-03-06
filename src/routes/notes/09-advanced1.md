---
marp: true
theme: custom-theme
paginate: true
header: "AI/IA"
footer: "Advanced and Emerging Topics"
---

# Advanced and Emerging Topics 1: Multimodal Models

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

- Stable Diffusion
- Midjourney
- Ideogram
- Gemini
- FLUX

![bg right](/slides/images/09/angry-ocean.png)

![bg right](/slides/images/09/mountaintop.png)

![bg right](/slides/images/09/meadow.png)

<p class="footnote">
Images: <a href="https://replicate.com/organisciak/rad-posters">an SDXL fine-tune</a>
</p>

-----

## [Sora](https://openai.com/index/sora/?video=913353498)

[![bg cover](/slides/images/09/sora-otter.png)](https://openai.com/index/sora/?video=913353498)

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