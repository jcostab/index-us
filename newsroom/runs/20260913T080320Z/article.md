---
title: "Agentforce’s long-horizon runtime changes what operators must test"
description: "Salesforce says Hunter can pursue goals for weeks, but remains in pilot. Buyers should test recovery, approvals, memory and stopping conditions before its planned November release."
publishedAt: 2026-09-13T08:12:02Z
updatedAt: 2026-09-13T08:12:02Z
author: Index Us Editorial
category: Analysis
tags: [salesforce, agentforce, agents, reliability, governance]
featured: false
draft: false
readingMinutes: 10
keyTakeaways:
  - "Salesforce says six named job agents are generally available now, while Hunter remains in pilot with general availability planned for November 2026."
  - "Hunter is the only agent using the new long-horizon runtime at launch; running for weeks describes persistence, not a verified success rate on weeks-long work."
  - "A useful pilot should test checkpoint recovery, stale approvals, memory integrity, duplicate actions, stopping conditions and business outcomes before production access expands."
sources:
  - label: "Salesforce — Agentforce job-ready agents announcement"
    url: "https://www.salesforce.com/news/stories/agentforce-job-ready-ai-agents/"
  - label: "Salesforce — Hunter outbound sales agent"
    url: "https://www.salesforce.com/sales/ai-sales-agent/outbound/"
  - label: "Salesforce — Agent Script"
    url: "https://www.salesforce.com/agentforce/script/"
  - label: "Salesforce — Agent Script repository"
    url: "https://github.com/salesforce/agentscript"
  - label: "SiliconANGLE — Salesforce introduces new AI agents"
    url: "https://siliconangle.com/2026/09/11/salesforce-introduces-new-ai-agents-to-automate-sales-support-tasks/"
  - label: "METR — Task-completion time horizons"
    url: "https://metr.org/time-horizons/"
  - label: "OWASP — Memory is an attack surface"
    url: "https://genai.owasp.org/2026/05/13/memory-is-a-feature-it-is-also-an-attack-surface/"
  - label: "NIST — Identity and authority of software agents"
    url: "https://www.nist.gov/news-events/news/2026/02/new-concept-paper-identity-and-authority-software-agents"
newsroom:
  runId: "20260913T080320Z"
  storyId: "salesforce-agentforce-long-horizon-runtime"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

Salesforce has introduced seven named agents for sales, service, commerce, employee support and supply-chain work. Six are generally available now. The seventh, Hunter, is in pilot, with general availability planned for November 2026. Salesforce says Hunter is also the first agent to use its new long-horizon runtime.

The [announcement was published at 12:00 UTC on 11 September 2026](https://www.salesforce.com/news/stories/agentforce-job-ready-ai-agents/), according to the page’s `article:published_time` and structured metadata. Salesforce says the runtime gives Hunter memory across sessions, durable execution that can resume or change course, and dynamic steering from user feedback. Its example is a sales agent that works towards a goal over days and weeks, adjusting a plan as buyer information and priorities change.

The operational change is persistence across conversations. Such a system becomes part of an operating process: it must preserve state, decide when old approval still applies, avoid repeating external actions and stop when the goal or surrounding facts change. Salesforce has described those mechanisms, but the checked sources do not supply a product evaluation, reliability distribution or failure analysis for the new runtime. Index Us did not test Hunter or Agentforce.

<figure>
  <svg viewBox="0 0 800 560" width="800" role="img" aria-labelledby="agentforce-horizon-art-title agentforce-horizon-art-desc" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" focusable="false">
    <title id="agentforce-horizon-art-title">A persistent goal crossing time checkpoints, approval gates and a durable resume loop</title>
    <desc id="agentforce-horizon-art-desc">A cobalt goal path travels through three off-white time checkpoints inside a charcoal frame. Vermilion approval gates interrupt the route, while a sage loop returns an interrupted task to an earlier checkpoint before it can continue. Fine grids, registration marks and a terminal stop block frame the conceptual control path.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <g stroke="#20221f" stroke-width="1" opacity=".13">
      <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800"/>
      <path d="M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560"/>
    </g>
    <rect x="42" y="50" width="716" height="460" fill="none" stroke="#20221f"/>
    <path d="M24 74H64M44 54V94M736 466H776M756 446V486" stroke="#20221f" stroke-width="2"/>
    <path d="M82 117H174M82 126H142M626 462H716M653 471H716" stroke="#20221f" stroke-width="2"/>
    <path d="M122 281H688" stroke="#20221f" stroke-width="3"/>
    <path d="M106 281L156 231L206 281L156 331Z" fill="#345dcc" stroke="#20221f" stroke-width="3"/>
    <circle cx="156" cy="281" r="15" fill="#f5f3ed"/>
    <path d="M156 265V297M140 281H172" stroke="#345dcc" stroke-width="5"/>
    <g stroke="#20221f" stroke-width="3">
      <rect x="245" y="225" width="72" height="112" fill="#f5f3ed"/>
      <rect x="382" y="225" width="72" height="112" fill="#f5f3ed"/>
      <rect x="519" y="225" width="72" height="112" fill="#f5f3ed"/>
      <path d="M261 250H301M261 268H291M261 302H301M398 250H438M398 268H428M398 302H438M535 250H575M535 268H565M535 302H575"/>
    </g>
    <path d="M339 185V377M476 185V377" stroke="#ed512f" stroke-width="12"/>
    <path d="M326 207H352M326 228H352M463 314H489M463 335H489" stroke="#f5f3ed" stroke-width="4"/>
    <path d="M418 337V420H281V337" fill="none" stroke="#cbd3c0" stroke-width="13"/>
    <path d="M296 352L281 330L266 352Z" fill="#cbd3c0"/>
    <circle cx="349" cy="420" r="26" fill="#cbd3c0" stroke="#20221f" stroke-width="3"/>
    <path d="M337 420H361M349 408V432" stroke="#20221f" stroke-width="3"/>
    <path d="M591 281H651" stroke="#345dcc" stroke-width="9"/>
    <path d="M641 266L666 281L641 296Z" fill="#345dcc"/>
    <rect x="666" y="213" width="48" height="136" fill="#20221f"/>
    <path d="M678 239H702M678 258H695M678 304H702M678 323H691" stroke="#f5f3ed" stroke-width="4"/>
    <circle cx="281" cy="191" r="7" fill="#345dcc"/>
    <circle cx="418" cy="191" r="7" fill="#ed512f"/>
    <circle cx="555" cy="191" r="7" fill="#cbd3c0" stroke="#20221f"/>
  </svg>
  <figcaption><em>Original illustrative graphic: a persistent goal crosses time checkpoints and approval gates, with a durable loop for resuming interrupted work. It is a control concept, not Salesforce’s runtime architecture, Hunter telemetry or evidence of product performance.</em></figcaption>
</figure>

## The launch contains two availability stories

Salesforce’s launch page lists Casey, Paige, Carter, Marshall, Piper and Fin as generally available. It lists Hunter as being in pilot, with general availability planned for November 2026. [SiliconANGLE’s independent report](https://siliconangle.com/2026/09/11/salesforce-introduces-new-ai-agents-to-automate-sales-support-tasks/) confirms the shape of the launch and notes that the long-horizon runtime is limited to Hunter at launch, while attributing the capability details to Salesforce.

The job-agent portfolio and the new runtime are separate adoption decisions. A buyer can examine the six generally available agents against their bounded service, employee, shopping, supply-chain and customer-experience workflows now. Hunter is the appropriate place to test the claim that an agent can continue working towards an outcome over weeks and months. Salesforce says other agents will move to the runtime over time and that customers will eventually be able to build long-horizon agents themselves, but its announcement gives no dates for those extensions.

The Hunter product page sets out the intended boundary. Salesforce says [Hunter ties goals, memory and actions to accounts, contacts and opportunities](https://www.salesforce.com/sales/ai-sales-agent/outbound/), rather than leaving state in a chat window. It says customer-facing actions such as outreach or proposals can require seller approval and that actions are logged. These design claims do not establish that state remains accurate, approvals remain appropriately scoped or every action can be reconstructed after a failure.

## Persistence is not a reliability result

“Long horizon” has two different meanings in current agent discussions. Salesforce uses it to describe calendar persistence: an agent can retain a goal and resume work across sessions over days or weeks. Evaluation researchers use the term to measure task difficulty and reliability.

[METR defines a task-completion time horizon](https://metr.org/time-horizons/) as the human-expert task duration at which an agent is predicted to succeed at a stated reliability level. Its 50 per cent horizon is a difficulty measure, not the wall-clock time an agent stays active. METR also cautions that its suite is concentrated in self-contained, well-specified software, machine-learning and cybersecurity work. Real jobs often depend on tacit context, interactions with people and outcomes that cannot be scored automatically.

No checked source connects Hunter’s ability to persist for weeks with a measured probability of completing a sales objective correctly. The evidence supports a narrower conclusion: the runtime expands the period over which Agentforce can retain state and initiate or coordinate actions. Persistence alone does not establish that the underlying model makes better decisions, that each intermediate state is correct or that a business outcome was caused by the agent.

A pilot therefore needs to test more than the agent’s latest answer or proposed tool call. For a continuing agent, the state between turns matters: what was saved, what became stale, what external action actually occurred and which person or policy authorised the next step.

## Persistence turns intermediate state into production data

Salesforce identifies memory, durable execution and dynamic steering as the three mechanisms under its new runtime. Those mechanisms create different failure boundaries.

Memory must preserve useful context without treating every earlier observation as permanently true. A buyer may change roles, an opportunity may close, a consent record may expire or a seller may correct a mistaken account note. [OWASP’s Agentic Security Initiative describes retained context as an attack surface](https://genai.owasp.org/2026/05/13/memory-is-a-feature-it-is-also-an-attack-surface/) because poisoned or untrusted material can influence later reasoning and actions. For Hunter, a useful control would record the source, time and policy status of consequential facts, then force revalidation before customer-facing action.

Durable execution must resume from a known checkpoint. Network failures, delayed webhooks and worker restarts make “continue the plan” ambiguous unless each step has an identifier and an observed result. An outreach email sent before a crash must not be sent again merely because the agent’s local state missed the acknowledgement. The same applies to CRM updates, proposals and hand-offs. Idempotency, reconciliation and a human-readable event trail are more useful pilot evidence than a smooth end-to-end demonstration.

Dynamic steering must not quietly enlarge authority. A user’s feedback can improve the plan while still conflicting with organisation-wide policy, customer consent or a prior approval boundary. [NIST’s concept work on software-agent identity and authority](https://www.nist.gov/news-events/news/2026/02/new-concept-paper-identity-and-authority-software-agents) identifies identification, authorisation, auditing and non-repudiation as issues that enterprise agent deployments need to resolve. A long-running process should evaluate permissions again at the moment of action, not assume that the user and authority present at planning time remain valid weeks later.

## Agent Script describes control, but the runtime enforces it

Salesforce presents Agent Script as the way to combine deterministic workflow rules with model reasoning. Its [product documentation](https://www.salesforce.com/agentforce/script/) says builders can store variables, define logic, inspect traces and simulate behaviour before release. That can make control decisions reviewable and versioned, particularly when a team records which script governed each action.

The open-source material stops short of the execution runtime. The [Agent Script repository](https://github.com/salesforce/agentscript) contains the specification, parser, linter, compiler, language tooling and editor integrations under Apache 2.0. Its README says the execution runtime is not open source and that running agents requires Salesforce’s environment. The specification can show what an agent is intended to do; external inspection of the repository does not verify how the managed runtime schedules, recovers or enforces a weeks-long plan.

Salesforce’s language around guaranteed consistency and reduced failures remains a product claim. Deterministic branches can narrow choices, but they do not make input data current, external services reliable or a non-deterministic reasoning step correct. Stronger evidence would connect a script version, runtime trace and business-side effect in a reproducible test.

## Use the pilot to test the joins

A Hunter pilot can produce useful evidence before the planned November release when it tests failure and recovery, as well as a successful journey.

1. **Define the terminal state.** Give each goal a measurable outcome, deadline, stop condition and owner. Test whether the agent stops when the opportunity closes, consent changes or the expected value falls below a threshold.
2. **Interrupt every stage.** Pause the runtime before and after research, plan changes, approval and external action. Confirm exactly which checkpoint resumes and whether completed steps remain completed.
3. **Age the context.** Change account ownership, contact status, customer preference and policy while the plan is dormant. Measure whether Hunter detects the change before acting.
4. **Expire authority.** Revoke a seller’s access, narrow a permission and withdraw an approval. Verify enforcement at action time, including through every connected channel.
5. **Force duplicate signals.** Deliver the same webhook twice, delay an acknowledgement and make a downstream service time out after accepting a request. Confirm that the audit trail distinguishes retry, duplicate and completed action.
6. **Compare the alternative.** Run the same cohort with existing workflow automation or seller-managed tasks. Measure qualified outcomes, manual review time, corrections, duplicate contacts, opt-outs and cost—not only agent activity.

Salesforce says it has delivered 7 billion Agentic Work Units across Agentforce and Slack, including 3.2 billion in its second quarter. It also says 60 per cent of Perk’s sales pipeline is built by Hunter. These are vendor-reported scale and customer-outcome claims. The launch page does not define Agentic Work Units or publish cohort details, baselines or a method that would let a buyer reproduce the reported figures, and the independent report does not validate them.

Buyers should request local, matched evidence: how many goals entered the pilot, how many reached a predefined terminal outcome, how often people intervened, what actions were reversed or duplicated, how long state remained dormant, which policy version applied and what the comparable non-agent workflow achieved. Averages should be accompanied by failure distributions, because a small number of stale or repeated customer actions can matter more than high routine completion.

For buyers, the launch creates two decisions. The six generally available agents can be assessed against their current workflows and controls. Hunter remains the evidence-gathering stage for the long-horizon runtime. Until Salesforce publishes fuller runtime and evaluation detail, operators should validate persistence as an expanded control surface before allowing it to become expanded authority.

This analysis is based on public announcements, product pages, documentation, source code and independent reporting. Index Us did not access Agentforce, Hunter, Salesforce customer environments or pilot telemetry, and did not independently verify Salesforce’s adoption, performance or customer-outcome claims.
