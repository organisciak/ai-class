---
marp: true
theme: custom-theme
paginate: true
header: "AI/IA"
footer: "Policy and Regulatory Frameworks"
---

# Policy and Regulatory Frameworks

----

## What's Happening in AI?

*Student presentation — Week 9 (Policy)*

After the presentation, consider:

- What regulatory or policy responses might this development prompt?

----

## The EU AI Act

- First comprehensive AI regulation in the world
- Adopted by European Parliament in March 2024; entered into force August 2024
- Risk-based approach to AI regulation
- Focuses on transparency, safety, and fundamental rights
- "Brussels Effect": Influence on other jurisdictions, including Colorado

----

## EU AI Act: Now in Force — Implementation Timeline

The Act is rolling out in phases. Key dates:

| Date | What Takes Effect |
|------|-------------------|
| **Feb 2, 2025** ✅ | **Prohibited practices BANNED** (social scoring, manipulative AI, biometric ID in public) |
| **Aug 2, 2025** ✅ | **GPAI obligations NOW ACTIVE** (documentation, copyright summaries, transparency) |
| **Aug 2, 2026** 🔜 | **High-risk rules** (hiring, credit, healthcare, education AI) |

Penalties for prohibited practices: up to €35 million or 7% of global annual turnover.

----

## EU AI Act: Risk Categories

The Act classifies AI systems based on risk level:

- **Unacceptable Risk**: Banned outright (e.g., social scoring, manipulative AI) — *now enforced*
- **High Risk**: Strict requirements (e.g., critical infrastructure, education, hiring) — *rules coming Aug 2026*
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

Special provisions for general-purpose AI models (GPAIs) — *active since August 2, 2025*:

- Technical documentation and risk assessments
- Copyright compliance for training data
- Energy efficiency reporting
- Stricter rules for "systemic risk" models ("when the cumulative amount of compute used for its training is greater than $10^{25}$ floating point operations")

*"Free and open licence GPAI model providers only need to comply with copyright and publish the training data summary, unless they present a systemic risk."*


----

## US Regulatory Contrast: A Very Different Direction

While the EU rolled out the AI Act, the US took a sharp turn:

- **January 20, 2025**: Trump rescinds Biden's AI Executive Order (EO 14110) — *Day 1 of new administration*
- **January 23, 2025**: EO 14179 — "Removing Barriers to American Leadership in AI"
  - Deregulation framing; emphasizes competitiveness over risk mitigation
  - Directs agencies to review and revise policies that restrict AI development
- **July 2025**: "Winning the Race: America's AI Action Plan" released
- **December 11, 2025**: New EO challenging state-level AI laws

----

## US: Institutional Shifts

Key changes inside the federal government:

- **NIST AI Safety Institute** → renamed **Center for AI Standards and Innovation (CAISI)** (June 2025)
  - Mission shift: from safety-first to "pro-innovation, pro-science"
  - Focus narrows to voluntary standards, national security evaluations, and industry partnerships
- Biden-era AI reporting requirements for frontier models: rescinded
- AI Safety Institute had been conducting safety evaluations of frontier models before public release — status of that program now uncertain

----

## US: The State Law Battle

With no federal law, states stepped in — and the federal government pushed back:

- **December 11, 2025**: Trump EO directs DOJ to form "AI Litigation Task Force" to challenge state AI laws in court
- **July 2025**: Senate budget bill included a proposed **10-year moratorium** on all state AI regulation
  - **Senate voted 99–1** to strip the moratorium from the bill (July 1, 2025)
  - Only Sen. Thom Tillis voted to keep the moratorium
  - The final "One Big Beautiful Bill Act" (signed July 4) includes no restrictions on state AI laws
- EO preemption attempts face legal limits: only Congress can constitutionally preempt state law

----

## State-Level AI: The New Regulatory Frontier

In the absence of federal law, states have become the primary regulatory arena:

| State | Law | In Effect |
|-------|-----|-----------|
| **Illinois** | HB 3773 — prohibits AI discrimination in employment (amends Human Rights Act) | Jan 1, 2026 |
| **California** | Transparency in Frontier AI Act — frontier model risk frameworks, safety incident reporting | Jan 1, 2026 |
| **Texas** | Responsible AI Governance Act (RAIGA) — consumer protections, AI sandbox program | Jan 1, 2026 |
| **Colorado** | SB 24-205 — high-risk AI impact assessments, anti-discrimination rules | *see next slide* |

Over 40 states introduced AI legislation in 2025.

----

## Colorado AI Act (SB 24-205): Local Context

Colorado was the **first state** to pass comprehensive AI legislation (signed May 2024):

- Modeled partly on the EU AI Act's risk-based approach
- Covers "high-risk" AI systems used in consequential decisions (employment, housing, credit, education, healthcare)
- Requires: impact assessments, anti-discrimination safeguards, consumer notices, developer documentation

**Timeline of delays:**
- Original effective date: **February 1, 2026**
- Gov. Polis signed SB 25B-004 (Aug 28, 2025) → delayed to **June 30, 2026**
- 2026 legislative session: active negotiations on repeal-and-replace; fate still uncertain as of March 2026
- Trump Dec 2025 EO adds federal pressure; White House compiling list of "onerous" state AI laws

*Bottom line: The law is on the books but its final form is in flux.*

----

## US vs. EU: Two Models of AI Governance

| Dimension | European Union | United States |
|-----------|---------------|---------------|
| **Approach** | Precautionary, rights-based | Innovation-first, deregulatory |
| **Federal law** | AI Act — comprehensive, binding | None (Biden EO rescinded) |
| **Enforcement** | Mandatory, with fines up to 7% revenue | Voluntary standards (CAISI) |
| **State/member laws** | EU harmonizes across members | States filling the vacuum |
| **Transparency** | Required for high-risk & GPAI | Largely voluntary |

The EU AI Act is now the de facto global baseline — companies that sell into Europe must comply regardless of home country.

----

## Discussion

- What are the potential positive impacts of the EU AI Act?
- What are the potential concerns with the EU AI Act?
- **Who benefits from the EU approach? Who benefits from the US approach?**
- **Who is at risk under each model?**
- The Senate voted 99–1 against a federal moratorium on state AI laws. What does that tell us about political will?
- Colorado passed a law, then delayed it under industry pressure. Is that democracy working, or captured regulation?

----

## Lab: AI Policy Framework

[Lab Details](https://ai.porg.dev/labs/policy-framework)

---

[References](https://ai.porg.dev/notes/references)
