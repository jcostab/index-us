---
title: "Gemini 4 Argon leads one independent suite, but access is still restricted"
description: "Gemini 4 Argon has a strong independent benchmark result, but most teams cannot test it yet. Treat the score as a trial prompt, not a deployment decision."
publishedAt: 2026-10-01T18:08:10+10:00
updatedAt: 2026-10-01T18:08:10+10:00
author: Index Us Editorial
category: Analysis
tags: [models, evaluation, procurement, google, cybersecurity]
featured: false
draft: false
readingMinutes: 10
keyTakeaways:
  - "Vals independently placed Gemini 4 Argon first on its composite index, but the model's results vary materially across the component tasks."
  - "Google is initially limiting Argon to approved cyber defenders; the public Gemini API catalogue did not list an Argon endpoint when checked."
  - "Use the independent result to design a future workload trial, while keeping access route, model version, reasoning settings, cost and acceptance criteria in the record."
sources:
  - label: "Google — Gemini 4 Argon announcement"
    url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/"
  - label: "Google DeepMind — Fairwind Program"
    url: "https://deepmind.google/fairwind-program/"
  - label: "Google AI for Developers — Gemini API model catalogue"
    url: "https://ai.google.dev/gemini-api/docs/models"
  - label: "Vals AI — Gemini 4 Argon evaluation"
    url: "https://www.vals.ai/models/google_gemini-4-argon"
  - label: "Vals AI — Vals Index methodology and leaderboard"
    url: "https://www.vals.ai/benchmarks/vals_index"
  - label: "Vals AI — Evaluation methodology"
    url: "https://www.vals.ai/methodology"
  - label: "Axios — Google unveils Gemini 4"
    url: "https://www.axios.com/2026/09/30/google-gemini-4"
  - label: "Ars Technica — Gemini 4 Argon is not broadly available"
    url: "https://arstechnica.com/google/2026/09/google-announces-gemini-4-argon-ai-model-but-you-cant-use-it-yet/"
newsroom:
  runId: "20261001T080344Z"
  storyId: "gemini-4-argon-evaluation-access-boundary"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

Google announced Gemini 4 Argon at 20:00 UTC on 30 September 2026. Google published its own capability claims, while Vals had already run the model through an independently operated evaluation suite. That gives technical buyers more to work with than a vendor benchmark table. It does not yet give most teams a reason to buy because Google has restricted initial access.

[Vals reports][s4] that Argon scored 68.90 per cent, with a standard error of 0.97 points, on its composite Vals Index. That is the highest displayed score among 41 models, although the component results vary substantially. [Google's launch][s1] says access is starting with selected cyber defenders through the Fairwind Program, and the [public Gemini API model catalogue][s3] did not list an Argon endpoint when Index Us checked it.

The practical decision is to prepare a workload trial without treating the leaderboard as a reason to migrate. Teams outside the restricted program cannot yet verify latency, behaviour, tool use, failure modes or cost in their own systems. Teams with access still need to distinguish Google's internal examples from independently run results.

<figure style="margin:2.5rem 0;">
  <svg viewBox="0 0 800 560" width="800" height="560" role="img" aria-labelledby="argon-access-art-title argon-access-art-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#f5f3ed;" preserveAspectRatio="xMidYMid meet">
    <title id="argon-access-art-title">A model chamber measured from outside while its deployment gate remains closed</title>
    <desc id="argon-access-art-desc">An off-white technical grid contains a cobalt model chamber with a vermilion core on the left. Six uneven measuring vanes fan towards a charcoal dial in the centre. A separate sage deployment field sits behind a narrow closed gate on the right, showing that an evaluation result and public access are different decisions.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <g stroke="#20221f" stroke-width="1" opacity=".13">
      <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800"/>
      <path d="M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560"/>
    </g>
    <rect x="43" y="48" width="714" height="464" fill="none" stroke="#20221f" stroke-width="2"/>
    <path d="M22 91H64M43 70V112M736 449H778M757 428V470" stroke="#20221f" stroke-width="2"/>
    <rect x="91" y="123" width="216" height="314" rx="18" fill="#345dcc" stroke="#20221f" stroke-width="3"/>
    <rect x="126" y="158" width="146" height="244" rx="73" fill="#20221f"/>
    <circle cx="199" cy="280" r="51" fill="#ed512f" stroke="#f5f3ed" stroke-width="4"/>
    <circle cx="199" cy="280" r="12" fill="#f5f3ed"/>
    <path d="M183 280H215M199 264V296" stroke="#20221f" stroke-width="3"/>
    <g fill="#cbd3c0" stroke="#20221f" stroke-width="2">
      <path d="M307 146L407 196L386 222L307 184Z"/>
      <path d="M307 190L423 224L410 253L307 226Z"/>
      <path d="M307 236L430 253L426 285L307 272Z"/>
      <path d="M307 282L430 282L430 314L307 318Z"/>
      <path d="M307 328L426 311L430 343L307 364Z"/>
      <path d="M307 374L410 343L423 372L307 410Z"/>
    </g>
    <circle cx="443" cy="280" r="93" fill="#f5f3ed" stroke="#20221f" stroke-width="3"/>
    <circle cx="443" cy="280" r="64" fill="none" stroke="#20221f" stroke-width="2"/>
    <path d="M443 280L493 237" stroke="#ed512f" stroke-width="8"/>
    <circle cx="443" cy="280" r="16" fill="#20221f"/>
    <g stroke="#20221f" stroke-width="2">
      <path d="M443 187V211M489 199L477 220M524 234L503 246M536 280H512M524 326L503 314M489 361L477 340M443 373V349M397 361L409 340"/>
    </g>
    <rect x="570" y="111" width="146" height="338" fill="#cbd3c0" stroke="#20221f" stroke-width="3"/>
    <path d="M570 170H716M570 390H716" stroke="#20221f" stroke-width="2" stroke-dasharray="8 7"/>
    <rect x="548" y="208" width="44" height="144" fill="#20221f"/>
    <rect x="559" y="231" width="22" height="98" fill="#f5f3ed"/>
    <path d="M570 252H592M570 308H592" stroke="#ed512f" stroke-width="8"/>
    <path d="M536 280H548" stroke="#20221f" stroke-width="5" stroke-dasharray="6 7"/>
    <circle cx="647" cy="280" r="52" fill="#f5f3ed" stroke="#20221f" stroke-width="3"/>
    <path d="M619 280H675M647 252V308" stroke="#345dcc" stroke-width="5"/>
    <path d="M88 473H196M88 484H151M615 75H716M648 86H716" stroke="#20221f" stroke-width="2"/>
    <circle cx="91" cy="123" r="7" fill="#ed512f"/>
    <circle cx="716" cy="449" r="7" fill="#345dcc"/>
  </svg>
  <figcaption><em>Original illustrative graphic: an external evaluation measures a restricted model chamber while a separate deployment field remains behind a closed gate. It is a conceptual distinction between benchmark evidence and access, not a benchmark chart, model architecture or measured result.</em></figcaption>
</figure>

## What the independent result establishes

Vals's [model page][s4] lists high reasoning effort, a temperature of 1 and 262,144 maximum output tokens as Argon's default hyperparameters. The page also warns that some benchmarks may use a different provider and parameters. Its results place Argon first on the Vals Index and Finance Agent v2, and equal first on an informatics olympiad evaluation. It places second on Vibe Code Bench, Code Migration, Tax Agent Bench and CyberBench.

Argon's 4.83 per cent result on CUA-bench ranked seventh of eight models, while its MedScribe result ranked fifteenth. The composite lead therefore cannot establish that the model leads every kind of work. In particular, strong software or finance results say little about performance in a computer-use workflow.

The [Vals Index][s5] combines finance, coding, legal and tax evaluations, weighting those sectors by their share of US gross domestic product. Six component benchmarks are private and two are public. The design aims to reduce test-set leakage and connect the index to economically relevant work, but it remains a particular editorial and statistical construction. It is not a neutral summary of every task a buyer might care about.

Vals sets out useful boundaries in its [methodology][s6]. It says model evaluations can call models through a fixed, controlled harness, while agent evaluations may use native agents or custom scaffolds. Private evaluations retain closed test sets. Its standard errors do not cover variation across prompts, seeds, deployment settings or the stochastic behaviour of model generation. The 1.86-point displayed gap between Argon and the second-ranked Claude Sonnet 5.5 is a result from this version of the suite. It is not proof that Argon is generally better.

An outside evaluator obtained access, ran Argon across many tasks and found both strengths and weak spots. That makes the evidence more useful than a vendor-only launch table and gives teams credible hypotheses for a future trial. The trial itself is still necessary.

## Availability is the first procurement constraint

Google's [launch post][s1] says Argon is rolling out to a set of trusted cyber defenders through Fairwind while the company gathers feedback and strengthens guardrails. Broader access is described as coming later, beginning with paid API customers and Google AI Ultra subscribers, but the announcement gives no date.

The [Fairwind page][s2] describes a controlled program rather than ordinary Gemini access. It prioritises governments, critical-infrastructure operators and core technology platforms. Participating organisations must restrict access to approved security teams, use named identity and phishing-resistant authentication controls, track access and keep the model within permitted defensive or research tasks. Google also says selected defenders receive an Argon variant without cyber guardrails so they can perform authorised vulnerability work.

This service boundary differs materially from a general API model. It affects who can use the system, what work is permitted, how access is governed and which safeguards are active. Any result obtained through Fairwind should name that route rather than be treated as interchangeable with a future public endpoint.

Independent reporting reached the same availability boundary. [Axios reported][s7] that Google was unveiling Argon to a small group of cybersecurity partners and planned to expand access after testing. [Ars Technica noted][s8] that Google had announced API pricing while withholding broad access and a firm availability date. Neither report supplies an independent production test; their value here is confirming that the restricted rollout is a central part of the launch rather than a footnote.

The public API catalogue provides another useful boundary. At 08:10:52 UTC on 1 October, Google's [Gemini API model list][s3] documented Gemini 3 models and endpoints but did not list Gemini 4 Argon. Absence from that page does not prove that no approved partner can call the model. A general developer should still avoid planning around an inferred endpoint, stable alias or release status.

## Pricing and limits need a versioned record

Google says Argon will start at US$2 per million input tokens and US$10 per million output tokens, with cached input priced at a 95 per cent discount. Its footnote says the rates will later become US$4 and US$20. The announcement does not specify when the introductory period ends.

Vals reports US$15.68 per test on its composite index and displays the later US$4 and US$20 rates for its calculation. The Argon page lists 262,144 maximum output tokens as a default setting, while Google advertises a one-million-token output limit for the service. The default does not establish that every benchmark used the same cap; Vals warns that provider and parameter choices may differ. An evaluator can also cap output below a service maximum and calculate cost using a long-run price rather than a temporary discount. These records need benchmark, provider, endpoint and version verification before anyone treats the differences as contradictions. They also show why a benchmark cost belongs with the exact rates and settings used.

Google's internal examples need the same discipline. The company says Argon helped free more than 300 TiB of memory after identified optimisations were deployed and assisted large C++-to-Rust migrations, including work on the Zircon kernel. These are Google-reported outcomes from internal workflows. The public launch does not provide the task set, rejected changes, human review load or a reproducible comparison that would let another organisation forecast the same result.

## Prepare the trial before making a migration decision

A useful evaluation can be designed before access arrives. Start with a small set of work that reflects the proposed deployment: ordinary tasks, difficult cases, known failures and examples where a polished but wrong answer would be costly. Define acceptance before running the model, including required evidence, allowed tools, prohibited actions, review time and the conditions that require a person to stop or take over.

When Argon becomes available through the intended route, record:

- the exact model identifier, access program, endpoint and release status;
- reasoning settings, temperature, context construction and output cap;
- prompts, tools, permissions, retries, timeouts and stopping rules;
- accepted-result rate, failure categories, latency, token use and review time;
- cache behaviour and the token rates actually billed; and
- safety controls, logging and any difference between Fairwind and public safeguards.

Compare Argon with the current production model through the same harness. The strongest Vals components can suggest hypotheses, but they should not dictate the local trial. Include the organisation's real failure modes and check whether the result survives repeated runs.

Index Us did not test Gemini 4 Argon, and most teams cannot yet do so through the public Gemini API. Vals gives them credible hypotheses to test once access opens. For now, the defensible action is to prepare the evaluation contract and wait for a named, supported access route before making a deployment decision.

[s1]: https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/
[s2]: https://deepmind.google/fairwind-program/
[s3]: https://ai.google.dev/gemini-api/docs/models
[s4]: https://www.vals.ai/models/google_gemini-4-argon
[s5]: https://www.vals.ai/benchmarks/vals_index
[s6]: https://www.vals.ai/methodology
[s7]: https://www.axios.com/2026/09/30/google-gemini-4
[s8]: https://arstechnica.com/google/2026/09/google-announces-gemini-4-argon-ai-model-but-you-cant-use-it-yet/
