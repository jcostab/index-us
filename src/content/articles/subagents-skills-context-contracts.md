---
title: "Subagents outperform inline skills only when the hand-off is clear"
description: "A new agent study finds that isolated subagents can beat inline skills under context pressure, but only when procedures have explicit input and output contracts."
publishedAt: 2026-09-11T00:14:00+10:00
updatedAt: 2026-09-11T00:14:00+10:00
author: Index Us Editorial
category: Analysis
tags: [agents, skills, subagents, evaluation, context-windows]
featured: false
draft: false
readingMinutes: 9
keyTakeaways:
  - "Subagents outperformed inline skill execution in this study only after skill packages were rewritten as self-contained procedures with explicit input and output contracts."
  - "Keeping subtask work in separate context windows reduced peak context pressure for stronger models, while increasing total token use through repeated hand-offs."
  - "Choose the execution pattern per procedure, then compare completion, cost, latency, hand-off loss and review effort on representative local tasks."
sources:
  - label: "arXiv — cs.AI updates RSS"
    url: "https://rss.arxiv.org/rss/cs.AI"
  - label: "Piriyakulkij and colleagues — Subagents vs Agent Skills"
    url: "https://arxiv.org/abs/2609.09233"
  - label: "SkillsBench — Introducing SkillsBench"
    url: "https://www.skillsbench.ai/blogs/introducing-skillsbench"
  - label: "SkillsBench — current benchmark registry"
    url: "https://www.skillsbench.ai/"
  - label: "ACL Anthology — Context Length Alone Hurts LLM Performance Despite Perfect Retrieval"
    url: "https://aclanthology.org/2025.findings-emnlp.1264/"
newsroom:
  runId: "20260910T140337Z"
  storyId: "subagents-skills-context-contracts"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

A new study of long-running agents finds that moving a reusable procedure into a subagent can improve task completion only after the procedure has been designed for delegation. With existing skill packages that mostly supplied loose knowledge, keeping the skill in the main agent matched or beat the subagent approach. The result reversed when the researchers replaced those packages with self-contained procedures and explicit input and output contracts.

The [cs.AI RSS feed](https://rss.arxiv.org/rss/cs.AI) timestamped the public announcement of [“Subagents vs Agent Skills”](https://arxiv.org/abs/2609.09233) at 04:00 UTC on 10 September 2026. The preprint was submitted on 7 September and has not been independently replicated. It gives teams a specific design choice to test — whether a procedure belongs inside the main context or behind a narrow hand-off — rather than establishing that more agents are universally better.

<figure style="margin: 2.5rem 0;">
  <svg viewBox="0 0 800 560" width="800" height="560" role="img" aria-labelledby="subagent-contract-art-title subagent-contract-art-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#f5f3ed;" preserveAspectRatio="xMidYMid meet">
    <title id="subagent-contract-art-title">One crowded context separated into contracted subagent workspaces</title>
    <desc id="subagent-contract-art-desc">A cobalt monolithic context on the left contains overlapping procedure blocks. A vermilion input-output gate in the centre sends three bounded tasks into separate sage subagent windows on the right, which return compact charcoal outputs.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560" stroke="#20221f" stroke-width="1" opacity=".14"/>
    <rect x="46" y="72" width="708" height="416" fill="none" stroke="#20221f"/>
    <path d="M66 52H106M86 32V72M694 508H734M714 488V528" stroke="#20221f"/>
    <rect x="80" y="120" width="244" height="320" rx="122" fill="#345dcc" stroke="#20221f" stroke-width="3"/>
    <g fill="#f5f3ed" stroke="#20221f" stroke-width="2">
      <rect x="119" y="162" width="158" height="68" transform="rotate(-7 198 196)"/>
      <rect x="119" y="246" width="158" height="68" transform="rotate(5 198 280)"/>
      <rect x="119" y="330" width="158" height="68" transform="rotate(-4 198 364)"/>
    </g>
    <path d="M142 184H248M142 199H229M141 267H248M141 282H218M142 351H248M142 366H234" stroke="#20221f" stroke-width="5"/>
    <path d="M324 280H382" stroke="#20221f" stroke-width="4"/>
    <rect x="382" y="207" width="76" height="146" fill="#ed512f" stroke="#20221f" stroke-width="3"/>
    <path d="M397 231H443M397 246H430M397 314H443M397 329H425" stroke="#f5f3ed" stroke-width="5"/>
    <path d="M405 280L420 265L435 280L420 295Z" fill="#20221f"/>
    <path d="M458 280H498M498 280V155M498 280V405" fill="none" stroke="#20221f" stroke-width="4"/>
    <g fill="#cbd3c0" stroke="#20221f" stroke-width="3">
      <rect x="498" y="106" width="218" height="98"/>
      <rect x="498" y="231" width="218" height="98"/>
      <rect x="498" y="356" width="218" height="98"/>
    </g>
    <g fill="#f5f3ed" stroke="#20221f" stroke-width="2">
      <circle cx="541" cy="155" r="24"/>
      <circle cx="541" cy="280" r="24"/>
      <circle cx="541" cy="405" r="24"/>
    </g>
    <path d="M541 143V167M529 155H553M541 268V292M529 280H553M541 393V417M529 405H553" stroke="#ed512f" stroke-width="5"/>
    <g fill="#20221f">
      <rect x="586" y="134" width="96" height="12"/>
      <rect x="586" y="154" width="72" height="8"/>
      <rect x="586" y="171" width="86" height="8"/>
      <rect x="586" y="259" width="96" height="12"/>
      <rect x="586" y="279" width="76" height="8"/>
      <rect x="586" y="296" width="88" height="8"/>
      <rect x="586" y="384" width="96" height="12"/>
      <rect x="586" y="404" width="68" height="8"/>
      <rect x="586" y="421" width="82" height="8"/>
    </g>
    <path d="M112 464H187M112 472H163M619 81H706M641 89H706" stroke="#20221f" stroke-width="2"/>
  </svg>
  <figcaption><em>Original illustrative graphic: a crowded shared context is split into bounded subagent workspaces through an explicit hand-off gate. It is a conceptual architecture, not benchmark evidence or measured performance.</em></figcaption>
</figure>

## The experiment changed the package and the execution mode

An agent skill is a reusable package of instructions and supporting material. In the inline pattern, invoking the skill loads its instructions into the main agent’s existing context. The main agent then follows the procedure while retaining the task history, tool results and every other instruction it has accumulated.

In the study’s subagent pattern, the main agent sends a task to a separate context initialised with the procedure and receives only that worker’s final response. Intermediate reasoning and tool output remain outside the main context. This can reduce the information any one model call must process, but it adds an interface. The parent has to send enough information, and the worker has to return the right result.

The researchers tested both patterns through a modified OpenHands harness on [SkillsBench](https://www.skillsbench.ai/), whose current registry contains 87 long-horizon tasks. They first used the benchmark’s human-authored skill packages. They then created a second package set by running GPT-5.3 Codex three times across the tasks, collecting successful trajectories and using Copilot CLI with minimal human intervention to turn those trajectories into procedures with explicit contracts. That process produced new packages for 64 tasks, and the paper’s main comparisons use that subset.

The two package sets differed in content and organisation, not only formatting. The authors therefore caution that performance across the original and rewritten sets is not a controlled measure of skill-writing quality. Their narrower controlled comparison is between inline and subagent execution within each package set.

## A subagent needs a contract, not just a topic

With the original packages, inline skills matched or outperformed subagents across every model tested. Those packages generally described relevant knowledge without specifying exactly what a caller must provide or what the procedure must return. A separate worker therefore had to reconstruct missing task context across a narrow channel.

With the contract-driven packages, subagents outperformed inline execution across the tested models. Each contract described when the procedure applied, what information it needed and what output it was expected to produce. The detailed instructions supplied a method for turning that input into the declared result.

Teams should decide whether each unit of work can be made self-contained, rather than adopting subagents as a general rule. Normalising a fixed record, checking an artefact against a stable rubric or extracting a specified schema can have a clear boundary. Investigating an ambiguous failure while requirements and evidence are still changing may depend on too much shared context to package safely.

A subagent boundary also hides its internal trajectory from the parent. This helps when the intermediate material is verbose and only a compact decision needs to survive. It creates risk when the parent needs the evidence behind the result, or when a later step must understand why an earlier attempt failed. Where that information affects the next decision, the output contract should return provenance, uncertainty and failure details instead of only a polished answer.

## Context relief is bought with more communication

The study added irrelevant tool descriptions to increase pressure on the main context. Under that condition, subagent execution with contract-driven packages degraded more gradually than inline execution. For stronger tested models including GPT-5.3 Codex and Kimi K2.6, the subagent pattern produced a lower peak context length on more than 80 per cent of tasks.

Lower peak context did not produce lower total token use. Separate workers had to receive information already known by the parent, and each worker maintained its own conversation. The paper reports substantially higher total token use for subagents. It also warns that peak-context comparisons became difficult for weaker models because some inline runs ended early. A short failed run can look efficient if completion is ignored.

Independent research supports the narrower premise that long input can damage reasoning even when retrieval succeeds. A peer-reviewed [EMNLP 2025 study](https://aclanthology.org/2025.findings-emnlp.1264/) tested five open- and closed-weight models on mathematics, question answering and coding. Its authors reported performance declines ranging from 13.9 to 85 per cent as input grew, despite perfect retrieval and lengths remaining inside the models’ advertised limits. That experiment did not test subagents. It does, however, explain why separating a procedure from a crowded history is a useful intervention to test.

## The parent benchmark already warned against universal rules

The original [SkillsBench launch analysis](https://www.skillsbench.ai/blogs/introducing-skillsbench) reached a related conclusion about reusable guidance: the effect varied by task and domain. That study began with 86 tasks and reported results on 84 after two verifier failures. Across its tested configurations, curated skills improved average completion, yet 16 of the 84 tasks showed a negative effect. Its current site documents a later 87-task registry, so results need a dataset version as well as a model and harness.

The results address different questions. SkillsBench measured whether reusable guidance helped across its tasks. The new preprint asks, on a 64-task subset, whether useful procedural knowledge should execute in the parent context or behind a delegation boundary. Its answer depended on the interface around that knowledge.

Several limits should travel with the finding. This is one preprint using one benchmark family and a modified OpenHands setup. The contract-driven packages were synthesised from successful trajectories, so they may encode benchmark-specific paths that a procedure written before any successful run would not contain. The tasks have deterministic verifiers; many workplace outcomes require judgement, negotiation or evidence review that cannot be reduced to one pass signal. The paper measures task accuracy and token behaviour, not the cost of human review, duplicated work, queueing delay or a plausible-looking subagent error passing through the contract.

## Choose the boundary with a local comparison

Treat the study as a testable architecture hypothesis. Start with a small set of repeated procedures drawn from real work. Version the task, model, harness, tools and skill package. Run the same cases inline and as subagents, with matched limits and enough repetitions to expose unstable outcomes.

For each procedure, record five things:

1. **Completion and accepted quality.** Use a deterministic verifier where the work permits one, and a documented review rubric where it does not.
2. **Total cost and latency.** Count all parent and worker tokens, retries, concurrent calls and waiting time. Lower peak context can coexist with higher total spend.
3. **Hand-off loss.** Check whether the parent omitted a required input or the worker returned too little evidence, uncertainty or state for the next step.
4. **Context relief.** Measure the main context before and after delegation, then check whether later reasoning actually improves.
5. **Operational control.** Retain worker inputs, outputs, tool permissions and failures. A separate context should not become an unaudited authority boundary.

Use inline execution when the procedure is mostly reference knowledge, depends heavily on the evolving shared state or must combine several sources of guidance. Trial a subagent when the work is substantial, internally noisy and expressible through a narrow input-output contract. A hybrid workflow is often the more plausible design: the parent keeps planning and cross-cutting judgement, while bounded procedures run in isolated contexts.

Delegation quality is determined before another model call is made. A fresh context can protect the parent from information overload, but it cannot repair an underspecified task. Write the contract first, then test whether the isolation earns its added cost.

This analysis is based on a preprint, benchmark documentation and published context-length research. Index Us did not run SkillsBench, reproduce the study, inspect the researchers’ hosted-model calls or test the two execution patterns independently.
