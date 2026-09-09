---
title: "ChatGPT Images 2.5 makes repeatable editing the claim to test"
description: "OpenAI's new image models promise faster, more controlled edits. Teams should measure preservation, accepted-asset cost and provenance before switching."
publishedAt: 2026-09-09T19:20:00+10:00
updatedAt: 2026-09-09T19:20:00+10:00
author: Index Us Editorial
category: Tools
tags: [image-generation, image-editing, evaluation, openai, provenance]
featured: false
draft: false
readingMinutes: 9
keyTakeaways:
  - "OpenAI now offers Flare for faster everyday generation and Sunburst for precision-oriented editing, while ChatGPT adds sketching, templates and comments on images."
  - "The central quality and latency claims come from OpenAI; a useful comparison must follow complete edit sequences and count the work needed to reach an accepted asset."
  - "Pin the dated model, define what must not change, record token use and refusals, and check whether provenance survives the actual delivery pipeline."
sources:
  - label: "OpenAI — News RSS"
    url: "https://openai.com/news/rss.xml"
  - label: "OpenAI — Introducing ChatGPT Images 2.5"
    url: "https://openai.com/index/introducing-chatgpt-images-2-5/"
  - label: "OpenAI — ChatGPT Images 2.5 system card"
    url: "https://deploymentsafety.openai.com/chatgpt-images-2-5"
  - label: "OpenAI Developers — GPT-Image-2.5 Flare model"
    url: "https://developers.openai.com/api/docs/models/gpt-image-2.5-flare"
  - label: "OpenAI Developers — GPT-Image-2.5 Sunburst model"
    url: "https://developers.openai.com/api/docs/models/gpt-image-2.5-sunburst"
  - label: "OpenAI Developers — Image generation guide"
    url: "https://developers.openai.com/api/docs/guides/image-generation"
  - label: "Ma and colleagues — I2EBench2.0 preprint"
    url: "https://arxiv.org/abs/2606.15570"
  - label: "NIST — Reducing risks posed by synthetic content"
    url: "https://www.nist.gov/publications/reducing-risks-posed-synthetic-content-overview-technical-approaches-digital-content"
newsroom:
  runId: "20260909T091029Z"
  storyId: "chatgpt-images-2-5-workflow-evaluation"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

OpenAI has released ChatGPT Images 2.5 and two API models with a practical promise: a requested edit should change the intended part of an image without disturbing the rest. The company's [RSS feed](https://openai.com/news/rss.xml) timestamped the announcement at 11:30 UTC on 8 September 2026. Its [launch post](https://openai.com/index/introducing-chatgpt-images-2-5/) says generation latency is up to 50 per cent lower than Images 2.0, while subjects, composition and details are more likely to survive repeated edits.

The promise concerns the whole workflow. Creative work commonly continues after a good first result: a team changes copy, moves a product, tries another background and restores details that drifted. The useful adoption question is whether Flare or Sunburst reduces the combined cost of failed edits, retries and manual repair for the assets a team actually delivers.

<figure style="margin: 2.5rem 0;">
  <svg viewBox="0 0 800 560" width="800" height="560" role="img" aria-labelledby="images-25-workflow-art-title images-25-workflow-art-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#f5f3ed;" preserveAspectRatio="xMidYMid meet">
    <title id="images-25-workflow-art-title">A bounded edit window moving across a stable image</title>
    <desc id="images-25-workflow-art-desc">A cobalt image field sits on a fine technical grid. A vermilion edit window highlights one region while sage corner locks and registration marks indicate that the surrounding composition should remain fixed.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <g stroke="#20221f" stroke-width="1" opacity=".14">
      <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800"/>
      <path d="M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560"/>
    </g>
    <path d="M50 76H750V484H50Z" fill="none" stroke="#20221f"/>
    <path d="M64 60H104M84 40V80M696 500H736M716 480V520" stroke="#20221f"/>
    <rect x="121" y="116" width="558" height="328" fill="#345dcc" stroke="#20221f" stroke-width="3"/>
    <circle cx="400" cy="280" r="128" fill="#f5f3ed" stroke="#20221f" stroke-width="2"/>
    <path d="M311 280L400 191L489 280L400 369Z" fill="#cbd3c0" stroke="#20221f" stroke-width="3"/>
    <circle cx="400" cy="280" r="34" fill="#20221f"/>
    <g fill="#cbd3c0" stroke="#20221f" stroke-width="2">
      <path d="M121 116H181V136H141V176H121Z"/>
      <path d="M679 116H619V136H659V176H679Z"/>
      <path d="M121 444H181V424H141V384H121Z"/>
      <path d="M679 444H619V424H659V384H679Z"/>
    </g>
    <rect x="436" y="214" width="149" height="112" fill="#ed512f" fill-opacity=".88" stroke="#20221f" stroke-width="3"/>
    <path d="M451 229H570M451 245H536M451 294H570M451 310H548" stroke="#f5f3ed" stroke-width="5"/>
    <path d="M585 270H714" stroke="#20221f" stroke-width="4" stroke-dasharray="8 9"/>
    <path d="M689 251L717 270L689 289Z" fill="#20221f"/>
    <circle cx="240" cy="280" r="21" fill="#e9dfcd" stroke="#20221f" stroke-width="2"/>
    <path d="M240 241V319M201 280H279" stroke="#20221f"/>
    <path d="M92 210H107M92 225H107M92 240H107M693 340H708M693 355H708M693 370H708" stroke="#20221f" stroke-width="4"/>
  </svg>
  <figcaption><em>Original illustrative graphic: an edit window changes one bounded region while registration locks mark the composition that should remain stable. It is a conceptual workflow, not model output or measured performance.</em></figcaption>
</figure>

## The release changes both the model and the controls

ChatGPT gains Sketch, format templates, comments placed directly on an image and an option to include a prompt when sharing. OpenAI says Images 2.5 is rolling out across ChatGPT, ChatGPT Work and Codex on desktop, mobile and web. These controls can make direction and review easier, but their usefulness should be assessed separately from the quality of the generated pixels.

The API now presents two choices. OpenAI positions [GPT-Image-2.5 Flare](https://developers.openai.com/api/docs/models/gpt-image-2.5-flare) as its fast model for everyday generation and [GPT-Image-2.5 Sunburst](https://developers.openai.com/api/docs/models/gpt-image-2.5-sunburst) as the more capable choice when editing precision matters. Both accept text and image input, produce images, support five named quality settings from `low` through `max` plus `auto`, and provide dated 8 September model snapshots.

The [image generation guide](https://developers.openai.com/api/docs/guides/image-generation) distinguishes two integration paths. The Image API handles a generation or edit from one prompt. The Responses API supports conversational and multi-step flows, including repeated edits in context. A fair evaluation should pin the dated image model and record which surrounding API and mainline model were used. Otherwise, a later comparison may silently measure a changed model or a different orchestration path.

OpenAI currently lists the same token rates for Flare and Sunburst: US$5 per million text input tokens, US$1.25 per million cached text input tokens, US$8 per million image input tokens, US$2 per million cached image input tokens and US$30 per million image output tokens. The guide warns that equal rates do not mean equal cost per image because token consumption can vary by model and quality setting. Input tokens, streamed partial images and retries also add cost.

## Preservation needs an explicit score

OpenAI's examples show the direction of the claimed improvement, but they do not establish a success rate for a reader's assets. The launch page does not publish an independent Images 2.5 benchmark for selective or multi-round editing.

The independent [I2EBench2.0 preprint](https://arxiv.org/abs/2606.15570) is useful here as a measurement framework, not a verdict on this release. It separates single-round and multi-round editing and evaluates precision and consistency across 16 single-round and seven multi-round dimensions. Images 2.5 was released after the paper's June submission and is not tested in it.

Score two things after every edit: whether the requested change happened and whether the declared invariants survived. For a product photograph, the change might be the background colour while the logo, package geometry, shadows and printed copy must stay fixed. For a layout, one panel may move while hierarchy, spacing and legibility remain stable. For a consented portrait, clothing may change while the person's recognisable features and pose remain within an agreed tolerance.

A first output can be attractive and still fail the task. One edit can also pass while a five-step sequence drifts. Teams should therefore define the complete sequence before generating, keep every intermediate image and avoid selecting only the most flattering run.

## Measure the accepted asset, not the quickest preview

The reported latency reduction is OpenAI's claim. The launch post does not provide a distribution across resolutions, quality levels, edit types or unsuccessful attempts. Faster generation is valuable only when it shortens the path to an approved result.

Start timing at the initial request and stop when the asset passes the same review used in normal production. Record generation time, model calls, token consumption, rejected variants, policy refusals and human correction time. Then calculate time and model cost per accepted asset, rather than per API response.

This can change the choice between Flare and Sunburst. Flare may win when many disposable concepts are needed quickly. Sunburst may justify longer generation if it prevents several repair rounds on a controlled campaign asset. The model names describe OpenAI's positioning; the trial establishes which one fits a particular workflow.

Keep ChatGPT and API results in separate rows. Sketch, templates and image comments alter the interface around the model. An API workflow adds its own resizing, storage, compression, approval and export steps. Combining the two surfaces into one score would hide where the improvement or failure occurred.

## The safety figures have a narrow meaning

OpenAI's [system card](https://deploymentsafety.openai.com/chatgpt-images-2-5) says increased realism could enable more convincing deepfakes without safeguards. It describes checks before generation, monitoring of prompt and image inputs, and output blocking before an image is shown.

OpenAI tested the end-to-end stack on a fixed set of adversarial prompts designed to elicit policy violations. It reports unsafe images presented at 1.09 per cent for Sunburst, 1.41 per cent for Flare and 1.64 per cent for Images 2.0. The same card says none of the unsafe-presented differences met its significance threshold. Automated labels may be wrong, sample size affects precision, and the prompt set is not representative of production traffic.

Those results support a bounded statement: OpenAI evaluated a layered safety system and published its method limits. They do not show that Images 2.5 is uniformly safer for every workload.

An adoption trial should include authorised cases near the organisation's real policy boundary, including text-heavy graphics, brand assets and consented reference images of people. Record false refusals as well as unsafe, inaccurate or misleading completions. A control can reduce risk and still make a legitimate workflow impractical if it blocks too much of the work.

## Provenance has to reach the destination

OpenAI says Images 2.5 uses C2PA metadata and SynthID invisible watermarking across ChatGPT, Codex and the API. The system card also says there is no single solution to provenance.

[NIST's synthetic-content report](https://www.nist.gov/publications/reducing-risks-posed-synthetic-content-overview-technical-approaches-digital-content) explains why that boundary matters. Provenance and watermarking can provide useful origin information, but no technique is comprehensive on its own. Robustness depends on whether markers survive ordinary changes such as compression, filtering, cropping and scaling, while a valid marker does not prove the content is trustworthy or presented in context.

The check therefore belongs at every stage of the real delivery path: API response, local export, design tool, content-management system, image optimiser, CDN and social platform. If a required marker disappears, teams need a deliberate fallback such as retaining a signed original, changing the export path or adding a visible disclosure. Generator-level support alone does not establish downstream traceability.

## A compact evaluation plan

Choose a set of consented source assets that represents the intended work: products, people, transparent elements, text, layouts and difficult backgrounds. Write three to five edit sequences for each asset and define the requested change plus the invariants before running a model.

Run the same sequences through the current baseline, Flare and Sunburst with matched dimensions and explicit quality settings. Review the outputs without model labels. Score instruction adherence, preservation, text accuracy, layout, visual quality and failures across rounds. Keep all outputs, not only the preferred examples.

For each accepted asset, calculate elapsed time, calls, tokens, refusals and human correction time. Inspect provenance after every delivery transformation. Retain the prompts, source permissions, dated model ID, output settings and approval decision so that a later rerun can explain what changed.

Revision is often the expensive middle of creative work. Images 2.5 therefore earns a controlled trial, but not an automatic switch. The decision should follow repeatable evidence from the team's own assets and delivery chain.

This analysis is based on public documentation, a system card and independent evaluation research. Index Us did not use ChatGPT Images 2.5, call the Flare or Sunburst APIs, inspect OpenAI's internal evaluations or independently verify its quality, latency, safety or provenance claims.
