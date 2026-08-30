---
title: "A small evaluation beats a large AI model leaderboard"
description: "Build a compact, repeatable test set from your own work to compare AI models on the outcomes, costs and failure modes that matter."
publishedAt: 2026-08-29
updatedAt: 2026-08-30
category: Techniques
tags: [evaluation, models, workflow]
readingMinutes: 7
keyTakeaways:
  - "Public benchmarks are useful context but cannot represent your workflow."
  - "A 20-case test set can expose recurring failures before a costly rollout."
  - "Measure review time and failure severity alongside output quality."
sources:
  - label: "NIST Artificial Intelligence Risk Management Framework"
    url: "https://www.nist.gov/itl/ai-risk-management-framework"
  - label: "Stanford HELM — Holistic Evaluation of Language Models"
    url: "https://crfm.stanford.edu/helm/"
---
Model leaderboards compress many design decisions into a convenient score. Your work contains different documents, stakes, terminology and tolerances. That gap is where disappointing deployments begin.

## Start with twenty real cases

Collect a small set that represents ordinary work, awkward edge cases and a few high-consequence failures. Remove personal or confidential information unless the test environment is approved to handle it.

For each case, write down what a good result must contain and what would make the result unusable. This simple rubric is more valuable than arguing about whether an answer “feels better.”

## Run the same conditions

Use the same prompt, tools and source material for every candidate. Record the model version, interface, date and settings. If one product gets access to web search or a larger context window, treat that as part of the product comparison rather than a pure model comparison.

## Score the expensive parts

Accuracy matters, but so do review time, latency, price and failure severity. A cheaper model that needs constant correction can cost more in practice. A polished error in a high-stakes workflow should carry more weight than an awkward sentence.

Useful measures include:

- required facts present;
- unsupported claims;
- instruction adherence;
- minutes of human correction;
- end-to-end cost; and
- whether a failure would be noticed before use.

## Keep failures in the set

When a model fails in a new way, add that case to the evaluation. The test set becomes a durable description of what your organisation expects, and it helps detect regressions when models or prompts change.

The aim is not to declare a universal winner. It is to make a defensible choice for a particular job.
