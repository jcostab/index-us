---
title: "How to choose an AI model for the job"
description: "A vendor-neutral method for selecting an AI model by task quality, privacy, tool support, latency, cost and the failures your workflow can tolerate."
publishedAt: 2026-08-28
updatedAt: 2026-08-30
category: Guides
tags: [models, evaluation, procurement, workflow]
readingMinutes: 7
keyTakeaways:
  - "Define one task and its hard constraints before comparing providers or model families."
  - "Establish the quality bar with a capable model, then test smaller candidates against the same cases for cost and latency."
  - "Choose a product configuration you can operate, monitor and re-evaluate, not a model name in isolation."
sources:
  - label: "OpenAI — Model selection guide"
    url: "https://developers.openai.com/api/docs/guides/model-selection"
  - label: "OpenAI — Model catalogue"
    url: "https://developers.openai.com/api/docs/models"
  - label: "Anthropic — Claude models overview"
    url: "https://platform.claude.com/docs/en/models/overview"
  - label: "Google — Gemini models overview"
    url: "https://ai.google.dev/gemini-api/docs/models"
  - label: "NIST — AI RMF Measure guidance"
    url: "https://airc.nist.gov/airmf-resources/playbook/measure/"
---
The best AI model is the lowest-cost operable option that clears the defined quality, risk and deployment constraints for one job. A general leaderboard or provider's “flagship” label supplies too little evidence for that decision.

Model catalogues now contain reasoning models, fast models, multimodal models, specialist media models and agent products with built-in tools. Their names and prices change quickly. A durable selection process starts with the work and uses the catalogue only after the requirements are clear.

## Write down one job

“Help staff with documents” is too broad for a useful comparison. “Extract the supplier, invoice date, GST and total from Australian invoices, then flag uncertain fields for review” is testable.

Describe the input, expected output, user and consequence of error. Include the volume and response time that ordinary work requires. If the model will call tools, name those operations and identify which can change data.

A concise task record might contain:

- input: PDF invoices received by email;
- output: four structured fields and a confidence flag;
- volume: 500 documents on a busy day;
- quality gate: all totals and GST values checked against arithmetic rules;
- failure path: uncertain or inconsistent documents go to a person; and
- data boundary: documents must remain in an approved region and must not be used for provider training.

This record prevents the comparison drifting toward whatever a candidate demonstrates well.

## Remove candidates that fail hard constraints

Some requirements are not trade-offs. If policy requires local processing, a cloud-only model is out. If the workflow needs image input, text-only models are out. If the response must arrive in 300 milliseconds, a slow reasoning model may be out before quality testing begins.

Common hard constraints include:

**Data handling.** Where are prompts, files and outputs processed? How long are they retained? Are they used for training by default? Do the answers differ between consumer, team, enterprise and API products? A familiar model name does not imply the same controls on every plan.

**Deployment location.** Can the model run in the required country, cloud, private network or local device? Is an open-weight option actually supportable on the hardware available?

**Input and output.** Check supported file types, image or audio input, output format, maximum size and structured-output behaviour. A large context window is not helpful if the product cannot accept the source files.

**Tools.** Confirm the exact interface supports search, code execution, function calling or computer use. A capability described in a model announcement may not be available in the product surface you intend to buy.

**Lifecycle.** Stable and preview endpoints carry different change risk. Google's model documentation, for example, distinguishes stable, preview, latest and experimental names and explains that aliases can move. A production workflow needs a version and retirement plan, not only access to the newest label.

**Policy and licensing.** Check permitted uses, output terms, open-weight licences and any restrictions that apply to your industry or geography.

Document the reason each candidate is removed. This turns a vague preference into a decision that another person can review.

## Establish the quality bar with a capable candidate

OpenAI's current model-selection guidance recommends finding a configuration that reaches the accuracy target before optimising cost and latency. The principle applies across vendors.

Begin with a capable model that satisfies the hard constraints. Use it to learn whether the task is feasible and to expose what “good” requires. This is a baseline, not an automatic production choice.

Build a small evaluation from ordinary examples, difficult cases and failures that would be expensive or embarrassing. For each case, record required facts, prohibited errors and the expected escalation. The [twenty-case method](/articles/evaluate-ai-model-for-real-work/) gives this comparison a repeatable structure.

Run the same prompt, source material and tools for each candidate. Preserve the version, date and settings. If one system receives web search or a code interpreter, record that as a product difference rather than calling it a pure model comparison.

## Measure quality in workflow terms

Accuracy is useful when there is a clear answer, but many business tasks need more than one measure.

For document extraction, measure each field and the rate of documents sent for review. For a research assistant, check whether material claims have usable sources, whether sources support the text and how much review is needed. For an agent, score tool selection, tool-argument accuracy, successful completion, unnecessary calls and whether it stops at the correct approval boundary.

Include failure severity. A missing comma and a fabricated bank account are not equivalent errors. Weight failures according to their consequence and whether a reviewer would notice them before use.

Human correction time is often the most revealing metric. A fluent output that takes twelve minutes to verify may be less useful than a plain output that takes two. Record review time during the test instead of estimating it afterwards.

## Compare smaller and cheaper options

Once one configuration clears the quality bar, test candidates that promise lower cost or latency. Providers structure their ranges differently, but most offer a spectrum from highest-capability models to faster, lower-cost options.

The current OpenAI, Anthropic and Google catalogues make these trade-offs visible through model families or product descriptions. Use those pages to form a shortlist, then read the relevant results with the [benchmark guide](/articles/what-ai-benchmarks-can-tell-you/) before running your cases. Catalogue capability labels remain vendor claims.

Compare end-to-end cost, not only token price. Include:

- input and output tokens;
- reasoning or effort settings;
- tool and search charges;
- repeated attempts and fallbacks;
- retrieval or hosting costs;
- human review time; and
- the cost of errors and support.

A small model that retries three times and needs extensive correction may cost more per accepted result. A larger model may be wasteful on easy cases. Some systems route simple work to a fast model and escalate uncertain cases, but the routing rule needs its own evaluation.

Latency should also be measured at the task level. Time to first token can look fast while a multi-step agent takes minutes to finish. Report the median and the slow tail across realistic inputs, including tool calls.

## Decide whether local, private or shared cloud is justified

Running an open-weight model locally can improve control over data and availability. It also transfers responsibility for hardware, patches, serving software, access control, monitoring and model updates to your team.

A managed API can be easier to operate and may provide stronger models or built-in tools. It introduces provider dependency and requires careful review of plan-specific data controls. A private cloud deployment sits between those positions, with its own cost and support trade-offs.

Choose the boundary that matches the data and the team's ability to operate it. “Local” is not automatically private if logs, backups or user interfaces send data elsewhere. “Enterprise” is not automatically approved until the contract and configuration have been checked.

## Test the product, not the brochure model

Two products using the same underlying model can behave differently. System instructions, safety filters, retrieval, memory, file parsing and tool implementations all affect the result. Rate limits and regional availability may determine whether the workflow can run at all.

Run the evaluation through the interface you plan to deploy. If users will work in a desktop application, do not rely only on API results. If an internal service will use pinned API versions, do not treat a consumer chat test as the final evidence.

For agents, include degraded conditions. Make a tool return an error, provide incomplete data, create a timeout and put misleading instructions inside a retrieved page. A candidate that completes the happy path but fails unsafely under interruption has not cleared the bar.

## Set a review date before rollout

The model, product and price will change. Record the chosen version, configuration, evaluation set, result and decision owner. Define what triggers a new test: a model update, prompt change, new tool, policy change, unexpected production failure or material price movement.

Keep failed cases in the evaluation. They are a practical description of what the workflow cannot tolerate and a regression test for future candidates.

The final decision should name the intended job and its limits. “Use model X for invoice extraction with human review above the uncertainty threshold” is operational. Record that boundary, the supporting evaluation and the next review date so a later team can revisit the choice without expanding it by accident.
