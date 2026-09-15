---
title: "ZGCM-1 releases a 7B model and training recipe, with conditions on data access"
description: "ZGCM-1 publishes weights, code and a large training-data collection. Its open-release claim needs a closer reading of the dataset gate, upstream rights and unreplicated results."
publishedAt: 2026-09-15T18:14:32+10:00
updatedAt: 2026-09-15T18:14:32+10:00
author: Index Us Editorial
category: Analysis
tags: [models, open-source, training-data, evaluation, agentic-search]
featured: false
draft: false
readingMinutes: 9
keyTakeaways:
  - "ZGCM-1's MIT-labelled weights and training code are public; its training dataset requires an access request and carries source-level rights that need separate checking."
  - "The team's 4.2-times training figure is an estimated 16K time-to-loss comparison assembled from four factors, not a measured saving for every training run."
  - "Reported maths and search scores are promising but developer-produced, and several cross-model web-search figures use different reports and protocols."
  - "A useful first trial checks model behaviour with the intended tools, while a training-reproduction plan first checks access, rights, exact stages and compute."
sources:
  - label: "arXiv — cs.AI announcement RSS"
    url: "https://rss.arxiv.org/rss/cs.AI"
  - label: "ZGCM team — technical preprint"
    url: "https://arxiv.org/abs/2609.13356"
  - label: "ZGCM team — model and weights"
    url: "https://huggingface.co/zgcagi/ZGCM-1-7B"
  - label: "ZGCM team — training dataset and access terms"
    url: "https://huggingface.co/datasets/zgcagi/ZGCM-1-Data"
  - label: "ZGCM team — training code"
    url: "https://github.com/zgcagi/ZGCM-1"
  - label: "Hugging Face — gated dataset documentation"
    url: "https://huggingface.co/docs/hub/datasets-gated"
  - label: "Open Source Initiative — Open Source AI Definition 1.0"
    url: "https://opensource.org/ai/open-source-ai-definition"
  - label: "Allen Institute for AI — Olmo 3 release"
    url: "https://allenai.org/blog/olmo3"
newsroom:
  runId: "20260915T080410Z"
  storyId: "zgcm-open-model-data-access"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

The ZGCM team has released a 7.39-billion-parameter model alongside training code and a large staged dataset. The [model weights](https://huggingface.co/zgcagi/ZGCM-1-7B) and [code](https://github.com/zgcagi/ZGCM-1) are public and labelled MIT. The [training dataset](https://huggingface.co/datasets/zgcagi/ZGCM-1-Data) requires a logged-in access request, and some underlying sources carry separate terms. Researchers can inspect more than a checkpoint, but reproducing the training calls for a data-access and rights inventory first.

The [technical preprint](https://arxiv.org/abs/2609.13356) calls ZGCM-1 “fully open”. That is the team's description, not an independent certification. The release is a plausible candidate for local evaluation. Its public record does not yet show that an outside team can replay the entire training run or reproduce the reported advantage with another search tool.

[arXiv's cs.AI RSS item](https://rss.arxiv.org/rss/cs.AI) announced `arXiv:2609.13356v1` as new at **04:00 UTC on 15 September 2026**. The manuscript was submitted earlier, on 11 September at 17:18:04 UTC. The feed announcement dates this news event; it does not date the team's training or experiments. This analysis examines the public report and repositories. Index Us did not download the weights, request dataset access, run a benchmark or reproduce training.

<figure class="story-illustration">
  <svg width="800" height="560" style="display:block;width:100%;height:auto;" viewBox="0 0 800 560" role="img" aria-labelledby="zgcm-access-title zgcm-access-desc" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <title id="zgcm-access-title">Three release layers with a conditional data doorway</title>
    <desc id="zgcm-access-desc">A fine technical grid frames three offset plates. A cobalt weights plate and vermilion code plate are reached by uninterrupted charcoal lines. A sage data plate sits behind a narrow doorway with a visible request marker and smaller source-rights compartments. The drawing is conceptual and contains no measurements.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <g stroke="#20221f" stroke-width=".7" opacity=".16"><path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560"/></g>
    <rect x="45" y="45" width="710" height="470" fill="none" stroke="#20221f" stroke-width="1.5"/>
    <path d="M30 77H70M50 57V97M730 463H770M750 443V483" stroke="#20221f" stroke-width="2"/>
    <path d="M68 415H162V176H245M68 445H338V309H432M68 475H484" fill="none" stroke="#20221f" stroke-width="3"/>
    <circle cx="68" cy="415" r="9" fill="#20221f"/><circle cx="68" cy="445" r="9" fill="#20221f"/><circle cx="68" cy="475" r="9" fill="#20221f"/>
    <g stroke="#20221f" stroke-width="2.5"><rect x="245" y="107" width="240" height="139" fill="#345dcc"/><rect x="432" y="261" width="245" height="139" fill="#ed512f"/><rect x="484" y="406" width="216" height="79" fill="#cbd3c0"/></g>
    <g fill="none" stroke="#f5f3ed" stroke-width="2"><circle cx="363" cy="176" r="38"/><circle cx="363" cy="176" r="22"/><path d="M363 123V147M363 205V229M310 176H334M392 176H416"/><path d="M478 296H628M478 311H609M478 326H622M478 341H577"/></g>
    <path d="M510 442H559M510 454H545" stroke="#20221f" stroke-width="2"/>
    <path d="M484 475H451V421H484" fill="none" stroke="#20221f" stroke-width="2"/><circle cx="451" cy="448" r="8" fill="#ed512f" stroke="#20221f" stroke-width="2"/>
    <path d="M593 406V485M648 406V485" stroke="#20221f" stroke-width="1.5"/><path d="M609 431H630M609 444H625M663 431H686M663 444H681" stroke="#20221f" stroke-width="2"/>
    <path d="M704 129V208M714 129V178M724 129V193" stroke="#20221f" stroke-width="1.3"/><circle cx="102" cy="129" r="7" fill="#ed512f"/>
  </svg>
  <figcaption><em>Original illustrative graphic: public weights and code lead to a data layer with an access request and distinct source rights. The plates show release choices, not the model's architecture, training proportions or measured results.</em></figcaption>
</figure>

## What the repositories let a reader inspect

The [model card](https://huggingface.co/zgcagi/ZGCM-1-7B) describes a dense decoder model trained from scratch, with 32 layers, a 262,144-token maximum context and a hybrid attention design: 27 gated sliding-window layers and five global layers. Its published files include four weight shards, configuration, a tokenizer and custom modelling code. The repository metadata showed an ungated public model and about 16.52 GB of stored material when checked on 15 September. A licence label and a downloadable checkpoint make a local evaluation possible; neither proves that a particular serving stack will support the full context efficiently.

The [GitHub training repository](https://github.com/zgcagi/ZGCM-1) separates data processing, pretraining, mid-training, supervised fine-tuning and reinforcement learning into top-level directories with configurations and runtime documentation. A researcher can inspect how data was grouped, where each stage begins and which training system the commands expect. The paper also points to intermediate checkpoints, recipes and telemetry. Those materials make the method easier to investigate, but a reproduction still needs to identify the exact experiment and its inputs. The repository is not one push-button replay.

The public dataset metadata showed about 5.74 TB of stored material. Its card describes six Parquet configurations: two pretraining stages, three mid-training lengths and supervised fine-tuning. The [dataset card](https://huggingface.co/datasets/zgcagi/ZGCM-1-Data) says full-text records carry source and licence fields, while some records are indexes only. These provide locators without the training text, including for sources requiring a separate agreement or approval. Some code-derived records point to the source repository instead of redistributing its code.

The dataset page asks visitors to log in, share contact information and accept access conditions. Its API reports manual gating, an author-controlled approval setting described in [Hugging Face's documentation](https://huggingface.co/docs/hub/datasets-gated). The card uses the top-level licence label `other`; item-level upstream licences still apply. A public file list therefore does not grant permission to download or reuse every item. Equally, the access gate does not mean the whole dataset is closed. The rights have to be checked for the records a research group intends to use.

The [Open Source Initiative's AI definition](https://opensource.org/ai/open-source-ai-definition) distinguishes parameters, code and detailed data information without requiring redistribution of every raw training item. It provides a way to ask about these layers, but we have not audited ZGCM-1 against the complete definition or certified its status. [Ai2's Olmo 3](https://allenai.org/blog/olmo3) offers another independently produced example of a release spanning weights, code and data. It illustrates release design; it does not validate ZGCM-1.

## What the efficiency figures measure

The team combines architecture, training precision and optimiser choices in its efficiency argument. Gated local attention keeps most tokens within a sliding window while five layers attend globally. In the [paper's architecture experiments](https://arxiv.org/html/2609.13356), the authors report 3.94-times throughput and a 6.4-times smaller key-value cache at a 256K context, compared with full attention under their specified conditions. That is the team's architecture result, not an independent serving benchmark.

The headline 4.2-times figure describes a different calculation. In the [pretraining section](https://arxiv.org/html/2609.13356), the authors estimate 16K time-to-loss against a comparable 7B BF16/AdamW baseline. They multiply a 1.4-times attention throughput gain, roughly 1.5 from FP8 and systems configuration, roughly 1.8 in step-to-loss efficiency from Muon, and an estimated 1.1 data-efficiency factor from exploratory evidence. The product is about 4.2. It is an estimate for that comparison at 16K, not measured end-to-end time or cost across pretraining, long-context mid-training and later tuning.

The implementation and component reasoning are detailed enough to guide a targeted check. They do not turn 4.2-times into an accelerator-budget estimate. Dataset access, the later stages, cluster setup, failed runs and verification effort would all affect the cost of reproducing the training. A smaller checkpoint does not remove the compute needed to repeat trillions of training tokens.

## Read benchmark scores with the test setup

The [report's evaluation](https://arxiv.org/html/2609.13356) uses the released 256K supervised fine-tuning checkpoint in thinking mode. For most non-agentic tests, the team reports mean pass-on-one over 32 runs, with stated exceptions for some comparator models. Its reported scores are 75.00 per cent on AIME 2026, 97.13 per cent on MATH-500 and 70.42 per cent on HMMT 2025. These are developer-run results. In the same table, ZGCM-1 scores 73.88 on MMLU, 47.87 on GPQA-Diamond and 75.42 on IFEval; several compared 7B–8B models do better on those knowledge and instruction measures. The maths results do not amount to a general model-quality verdict.

For web research, the team reports 63.09 per cent on WebWalkerQA, 19.43 on BrowseComp and 42.52 on text-only GAIA. Its harness allows up to 64 search-and-read steps. The [paper's setup](https://arxiv.org/html/2609.13356) says many cross-model web baselines were taken from other public reports, while one specialised baseline was evaluated under the shared harness. Models, tools and search environments therefore were not held constant across the wider comparison. ZGCM-1's reported score is useful for selecting a local trial, but it does not predict its rank in another search stack.

In the [paper's agentic evaluation](https://arxiv.org/html/2609.13356), the team also reports 31 exact function-entry matches out of 50 Binary Function Search tasks using a Ghidra-based tool protocol. The authors say the ten projects sampled for that subset were excluded from training. They plan to release the benchmark dataset, so an outside reproduction cannot yet assume the exact evaluation tasks are public. The team also acknowledges that broader repository engineering and unstructured terminal work remain difficult, and that noisy observations or tool-format deviations can disrupt long runs.

## Two different trials to plan

For a team considering the model as a tool, pin the public checkpoint and test it in the intended search or mathematical workflow. Use representative questions with answer checks hidden from the model; record accepted outcomes, tool failures, elapsed time, retries and review effort. Test thinking and direct-response modes separately. The [model card](https://huggingface.co/zgcagi/ZGCM-1-7B) loading example uses `trust_remote_code=True`, so inspect and control the custom modelling code before executing it in a sensitive environment. A paper score gives a reason to evaluate; it cannot substitute for the team's own accepted outcomes.

For a research group considering training reproduction, start with the exact checkpoint and stage, code revision, data configuration, index-only components, upstream access requirements, item licences, tokenizer and accelerator setup. Decide whether the goal is to run the published weights, repeat an efficiency ablation or reconstruct the training run. Each requires different evidence and expense. Any eventual reproducibility claim should state which was completed and retain the method and result.

ZGCM-1 puts a compact maths-and-search model and much of its training method within reach of local scrutiny. The next useful evidence is narrower: an outside evaluation in a representative tool workflow, or a stage-specific reproduction that accounts for the gated data and source rights. Either result would tell readers more than the developer's release figures alone.

This analysis is based on public documentation, repository metadata and the developer's preprint. Index Us did not request access to the training data, run the model, verify source-level licence compliance, reproduce the benchmark scores or measure training and serving costs.
