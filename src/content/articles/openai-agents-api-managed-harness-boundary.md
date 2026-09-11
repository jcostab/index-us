---
title: "OpenAI’s Agents API moves the harness into the platform"
description: "OpenAI now manages agent sessions, compaction and recovery, while builders still own tools, environments, authority, data policy and outcome checks."
publishedAt: 2026-09-11T18:15:00+10:00
updatedAt: 2026-09-11T18:15:00+10:00
author: Index Us Editorial
category: Analysis
tags: [agents, api, orchestration, evaluation, security]
featured: false
draft: false
readingMinutes: 10
keyTakeaways:
  - "The public-beta Agents API puts sessions, orchestration, context compaction and recovery behind an OpenAI-managed interface."
  - "Builders still choose the tools and execution environment, define authority, verify resulting state and decide whether the API’s data controls fit the workload."
  - "Evaluate complete workflows across repeated long runs, failures, cancellation, side effects and total cost before replacing an existing harness."
sources:
  - label: "OpenAI — News RSS"
    url: "https://openai.com/news/rss.xml"
  - label: "OpenAI — Introducing the Agents API"
    url: "https://openai.com/index/introducing-the-agents-api/"
  - label: "OpenAI Developers — Agents API overview"
    url: "https://developers.openai.com/api/docs/guides/agents-api/overview"
  - label: "OpenAI Developers — OpenAI-hosted sandboxes"
    url: "https://developers.openai.com/api/docs/guides/agents-api/environments/openai-hosted"
  - label: "OpenAI Developers — Self-hosted sandboxes"
    url: "https://developers.openai.com/api/docs/guides/agents-api/environments/self-hosted"
  - label: "OpenAI Developers — Sandbox security"
    url: "https://developers.openai.com/api/docs/guides/agents-api/environments/security"
  - label: "OpenAI Developers — Manage sessions"
    url: "https://developers.openai.com/api/docs/guides/agents-api/sessions/manage"
  - label: "OpenAI Developers — Observability and usage"
    url: "https://developers.openai.com/api/docs/guides/agents-api/observability"
  - label: "Ding and colleagues — WildClawBench preprint"
    url: "https://arxiv.org/abs/2605.10912"
  - label: "Mittal — long-horizon agent degradation preprint"
    url: "https://arxiv.org/abs/2609.01660"
  - label: "METR — Task-completion time horizons"
    url: "https://metr.org/time-horizons/"
newsroom:
  runId: "20260911T080412Z"
  storyId: "openai-agents-api-managed-harness-boundary"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

OpenAI has released the Agents API in public beta, moving the orchestration layer behind Codex into a managed service for developers. A team can create a durable session, attach tools, choose an execution environment and let the service coordinate context, recovery and subagents. Part of the application’s operating loop now sits behind a platform API, which makes this a more substantial change than another agent SDK.

The [OpenAI News RSS feed](https://openai.com/news/rss.xml) timestamps the release at 00:00 UTC on 10 September 2026. OpenAI’s [launch announcement](https://openai.com/index/introducing-the-agents-api/) says the beta is available to all developers and adds no separate Agents API fee. Model tokens, OpenAI tools and hosted sandbox compute are still charged at their applicable rates. Any adoption case turns on whether the managed harness improves completed work enough to justify a new dependency, data boundary and control surface.

<figure style="margin: 2.5rem 0;">
  <svg viewBox="0 0 800 560" width="800" height="560" role="img" aria-labelledby="agents-api-boundary-art-title agents-api-boundary-art-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#f5f3ed;" preserveAspectRatio="xMidYMid meet">
    <title id="agents-api-boundary-art-title">A managed agent harness between an application and two bounded environments</title>
    <desc id="agents-api-boundary-art-desc">A vermilion orchestration ring surrounds a charcoal session core. A cobalt application boundary on the left feeds tools and approvals through the ring, while sage hosted and self-hosted environments on the right remain separately bounded. Registration marks and a stop gate show that control and verification stay outside the managed loop.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <g stroke="#20221f" stroke-width="1" opacity=".13">
      <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800"/>
      <path d="M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560"/>
    </g>
    <rect x="46" y="60" width="708" height="440" fill="none" stroke="#20221f"/>
    <path d="M66 40H106M86 20V60M694 520H734M714 500V540" stroke="#20221f"/>
    <rect x="82" y="126" width="176" height="308" fill="#345dcc" stroke="#20221f" stroke-width="3"/>
    <path d="M110 163H228M110 183H198M110 224H228M110 244H212M110 365H228M110 385H188" stroke="#f5f3ed" stroke-width="8"/>
    <rect x="117" y="279" width="106" height="48" fill="#f5f3ed" stroke="#20221f" stroke-width="2"/>
    <path d="M136 303H204" stroke="#ed512f" stroke-width="7"/>
    <path d="M258 280H304" stroke="#20221f" stroke-width="5"/>
    <circle cx="408" cy="280" r="128" fill="#ed512f" stroke="#20221f" stroke-width="3"/>
    <circle cx="408" cy="280" r="79" fill="#f5f3ed" stroke="#20221f" stroke-width="3"/>
    <circle cx="408" cy="280" r="34" fill="#20221f"/>
    <path d="M408 152V201M408 359V408M280 280H329M487 280H536" stroke="#20221f" stroke-width="5"/>
    <path d="M380 280H436M408 252V308" stroke="#f5f3ed" stroke-width="4"/>
    <path d="M332 204A96 96 0 0 1 484 204M484 356A96 96 0 0 1 332 356" fill="none" stroke="#20221f" stroke-width="8"/>
    <path d="M476 191L493 211L465 215ZM340 369L323 349L351 345Z" fill="#20221f"/>
    <path d="M536 280H566M566 280V184M566 280V376" fill="none" stroke="#20221f" stroke-width="4"/>
    <g fill="#cbd3c0" stroke="#20221f" stroke-width="3">
      <rect x="566" y="120" width="150" height="128"/>
      <rect x="566" y="312" width="150" height="128"/>
    </g>
    <path d="M591 151H691M591 170H666M591 197H691M591 343H691M591 362H658M591 389H691" stroke="#20221f" stroke-width="7"/>
    <circle cx="641" cy="226" r="13" fill="#345dcc" stroke="#20221f" stroke-width="2"/>
    <circle cx="641" cy="418" r="13" fill="#f5f3ed" stroke="#20221f" stroke-width="2"/>
    <path d="M304 280V458H504" fill="none" stroke="#20221f" stroke-width="3" stroke-dasharray="8 9"/>
    <rect x="504" y="432" width="40" height="52" fill="#ed512f" stroke="#20221f" stroke-width="3"/>
    <path d="M514 445L534 471M534 445L514 471" stroke="#f5f3ed" stroke-width="5"/>
    <path d="M84 468H183M604 87H716M626 96H716" stroke="#20221f" stroke-width="2"/>
  </svg>
  <figcaption><em>Original illustrative graphic: a managed session loop sits between the application’s tools and approvals and two separately bounded execution environments. It is a conceptual system map, not a product architecture diagram or measured result.</em></figcaption>
</figure>

## The service manages continuity, not the whole product

The [Agents API overview](https://developers.openai.com/api/docs/guides/agents-api/overview) assigns sessions, orchestration, context compaction and recovery to OpenAI. The application supplies tools and selects the execution environment. A session can receive new input, stream events, pause for a required action, resume a session where it left off and delegate work to subagents. Skills, MCP servers, web search and programmatic tool calls can be configured around the model.

The platform takes on a real engineering burden. Long-running agent applications otherwise need to persist task state, trim or summarise growing context, reconnect workers, identify delegated work and decide when to retry. Standardising those mechanics can make prototypes easier to operate and give production teams a clearer lifecycle than a collection of background jobs.

The application retains the business decisions: what data enters a session, which tools are available, which actions require approval and how an output is checked against external state. If an agent claims it updated a ticket, reconciled a file or fixed a service, the resulting system remains the authority. A durable conversation records what the agent attempted. Task success must be confirmed in the system it was meant to change.

Stopping work also remains an application responsibility. The [session-management documentation](https://developers.openai.com/api/docs/guides/agents-api/sessions/manage) separates cancelling an active turn from deleting its saved session. The hosted-sandbox guide says closing an event stream does not cancel the task. Applications need an explicit control path from a user’s stop request to the active turn and then to any external action already started.

## Hosted and self-hosted environments create different boundaries

OpenAI’s [launch material](https://openai.com/index/introducing-the-agents-api/) lists three compute routes: its hosted Linux sandbox, the builder’s own infrastructure and supported sandbox partners. This analysis compares the OpenAI-hosted and self-hosted options documented in detail. The [hosted-sandbox documentation](https://developers.openai.com/api/docs/guides/agents-api/environments/openai-hosted) describes a workspace with Python, Node.js, command-line tools, supplied files, packages, skills and plugins. Outbound network access is enabled by default unless a template applies another policy. It can be disabled or restricted to a list of exact hosts.

That default deserves attention because retrieved pages, package metadata, repository files and tool output can all influence an agent. A first trial should begin with network access disabled or narrowly allowlisted, then add destinations only when the task requires them. Apply the same constraint to input files and packages: assemble the smallest environment that can complete the test rather than copying a production workspace into a general-purpose sandbox.

With a [self-hosted environment](https://developers.openai.com/api/docs/guides/agents-api/environments/self-hosted), OpenAI runs the harness while an executor runs inside the builder’s laptop, container or remote sandbox. The connection is outbound. OpenAI recommends a restricted executor key that can connect environments but cannot authorise other API actions, while the broader application key remains outside the environment.

Self-hosting provides more control over the image, compute and private network. Session state remains subject to a different boundary. [The Agents API overview](https://developers.openai.com/api/docs/guides/agents-api/overview) states that Agents API session state currently has United States data residency and does not support Zero Data Retention, including when the sandbox is self-hosted. That can rule out the API for regulated, contractual or highly sensitive workloads before model quality is considered.

Permissions also remain separate from compute placement. OpenAI’s [sandbox security guidance](https://developers.openai.com/api/docs/guides/agents-api/environments/security) says agent-generated code can access the files, credentials and network available to its environment. It recommends isolating workloads, keeping third-party credentials outside the sandbox and brokering approved requests where possible. Teams still need separate environments, narrow identities and revocable authority when the executor is self-hosted.

## A durable run does not prove dependable work

The launch page presents reliability and long-running operation as benefits of the managed harness. Those are platform claims, and Index Us has not tested the beta. Independent agent research helps define what a useful pilot should measure, although none of it evaluates the Agents API.

Two preprints identify different risks. [WildClawBench](https://arxiv.org/abs/2605.10912) tested 60 human-authored tasks in containerised CLI environments using 19 frontier models, with tasks averaging more than 20 tool calls. Its authors report a best overall score of 62.2 per cent and a change of up to 18 percentage points for one model when the harness changed. A separate [long-horizon degradation study](https://arxiv.org/abs/2609.01660) analysed 10,664 trajectories across nine models and four task families. Its author reports that success on the agentic task fell from near-perfect to near zero within 16 dependent steps for every tested model. Taken together, the reported results indicate that orchestration choices can materially affect outcomes and that preserving context does not remove accumulated decision risk. Both are preprints, and the long-horizon paper is a controlled study rather than a production audit.

METR’s [time-horizon work](https://metr.org/time-horizons/) clarifies a separate measurement issue. A reported time horizon refers to task difficulty measured by the time a human expert would need, not how long an agent can remain connected. METR also says its current measurements above 16 hours are unreliable and that its suite is concentrated in clean, well-specified software, machine-learning and cybersecurity tasks. Infrastructure that runs for days has demonstrated endurance, not success on every day-long business process.

## Compare completed workflows under failure

A useful pilot should run the same representative work through the current harness and the Agents API. Keep the model, tools, instructions, data and success criteria as stable as practical. If the trial changes the model, environment and orchestration together, it will be difficult to tell which change caused a different result.

Measure at least seven things:

1. **Outcome accuracy.** Check the final database, repository, document or service state with deterministic tests or a separate review. Do not score the agent’s completion message as the outcome.
2. **Step reliability.** Retain the complete sequence of tool calls, retries, hand-offs and approvals. Group results by task length so a strong short run does not hide deterioration on longer work.
3. **Recovery.** Inject an executor disconnect, tool timeout, malformed response and expired sandbox. Confirm that the application can identify the state, resume safely and avoid repeating a side effect.
4. **Authority.** Give tools read-only access first. Add writes behind narrow scopes, idempotency keys and explicit approvals. Test what happens when a retrieved page or file asks the agent to exceed the task.
5. **Cancellation.** Verify that cancelling a turn stops new work, that external operations have their own cancellation or compensation path, and that a closed client connection is never treated as a stop signal.
6. **Data handling.** Map what crosses into session state, the hosted or self-hosted environment, tool providers and retained artifacts. Confirm that residency and retention match the actual data class.
7. **Total cost and latency.** OpenAI’s [observability guide](https://developers.openai.com/api/docs/guides/agents-api/observability) says an agent may make several model calls and that usage can be incomplete or change as accounting arrives. Count root and subagent tokens, retries, tools, container time, third-party services and review effort per accepted result.

The public beta also has observability limits. [OpenAI’s observability documentation](https://developers.openai.com/api/docs/guides/agents-api/observability) says session events and history expose progress, turn outcomes and delegated work, while detailed trace retrieval and external trace exporters are not part of the beta customer API. Teams with established audit pipelines should confirm that dashboard-only detail and best-effort usage records meet their operational needs.

The Agents API is a credible option when maintaining the harness is undifferentiated work and the application can operate within the current data and platform constraints. A small, reversible pilot can establish whether managed compaction, recovery and delegation improve the tasks that matter. Keep tools, permissions, cancellation, external-state checks and cost measurement outside the model’s own judgement. Those controls remain part of the product, even when the loop around them is managed.

This analysis is based on OpenAI’s launch material and current public-beta documentation plus independent agent-evaluation research. Index Us did not call the Agents API, inspect its infrastructure, reproduce the cited studies or verify OpenAI’s customer examples.
