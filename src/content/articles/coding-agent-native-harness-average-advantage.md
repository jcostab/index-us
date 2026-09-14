---
title: "A private-suite coding study finds no average native-harness winner"
description: "A same-model agent study leaves the average harness winner unresolved, while workload, completion behaviour and corrected cost telemetry change the practical decision."
publishedAt: 2026-09-14T18:09:31+10:00
updatedAt: 2026-09-14T18:09:31+10:00
author: Index Us Editorial
category: Analysis
tags: [coding-agents, evaluations, harnesses, benchmarks, cost]
featured: false
draft: false
readingMinutes: 8
keyTakeaways:
  - "On a selected private task pool, neither same-model comparison resolved an average solve-rate advantage for the vendor-native harness over deepagents."
  - "The Opus result reversed direction between repository and contest tasks, but that split was chosen after seeing the data and needs a designed replication."
  - "The paper withdrew its earlier cost conclusion after finding cache-token double counting, showing why agent telemetry should be reconciled against raw events and provider billing."
  - "Choose a harness with repeated tests on the intended workload, and measure accepted output, autonomous completion, infrastructure, total usage and billed cost separately."
sources:
  - label: "arXiv — cs.AI RSS"
    url: "https://rss.arxiv.org/rss/cs.AI"
  - label: "Arjmandi — Harness or Model?"
    url: "https://arxiv.org/abs/2609.11987"
  - label: "Yao and colleagues — Harness-Bench"
    url: "https://arxiv.org/abs/2605.27922"
  - label: "Vats and Golev — The Scaffold Effect in Coding Agents"
    url: "https://arxiv.org/abs/2607.22585"
  - label: "Anthropic — Quantifying infrastructure noise in agentic coding evals"
    url: "https://www.anthropic.com/engineering/infrastructure-noise"
newsroom:
  runId: "20260914T080209Z"
  storyId: "coding-agent-native-harness-average-advantage"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

On a selected private task pool, a new preprint did not resolve an average solve-rate advantage for either vendor-native coding-agent harness. The same model can still behave differently because its surrounding harness decides which tools are available, how results return to context, when a run stops and which usage it reports.

For an engineering team, the practical question is whether one complete stack works better on its actual workload. This experiment leaves that question open: its intervals remain wide, the tested work is not representative of every coding workload, and one workload split changed the apparent winner. Non-resolution is not proof that the harnesses are equivalent.

The timing also needs care. The [cs.AI RSS feed](https://rss.arxiv.org/rss/cs.AI) listed the paper as a new announcement at 04:00 UTC on 14 September 2026. The [paper itself](https://arxiv.org/abs/2609.11987) identifies arXiv version 1 and its revision as 8 September. The feed timestamp establishes when the item entered this discovery window; it does not turn the underlying August study or 8 September manuscript into work performed on 14 September.

<figure>
  <svg viewBox="0 0 800 560" width="800" height="560" role="img" aria-labelledby="harness-contrast-art-title harness-contrast-art-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#f5f3ed;" preserveAspectRatio="xMidYMid meet">
    <title id="harness-contrast-art-title">Two fixed model cores passing through different harness frames into overlapping result bands</title>
    <desc id="harness-contrast-art-desc">An off-white technical grid holds two horizontal comparisons. In each row, one fixed circular model core is repeated inside a native charcoal frame and a neutral cobalt frame. Their output paths meet broad overlapping sage bands. A separate vermilion loop around stacked token marks represents an accounting correction, not measured magnitude.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <g stroke="#20221f" stroke-width="1" opacity=".13">
      <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800"/>
      <path d="M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560"/>
    </g>
    <rect x="46" y="48" width="708" height="464" fill="none" stroke="#20221f"/>
    <path d="M26 78H66M46 58V98M734 462H774M754 442V482" stroke="#20221f" stroke-width="2"/>
    <path d="M86 279H714" stroke="#20221f" stroke-width="1" stroke-dasharray="7 8"/>
    <g stroke="#20221f" stroke-width="3">
      <rect x="94" y="111" width="146" height="112" fill="#e9dfcd"/>
      <rect x="94" y="337" width="146" height="112" fill="#e9dfcd"/>
      <circle cx="167" cy="167" r="34" fill="#ed512f"/>
      <circle cx="167" cy="393" r="34" fill="#345dcc"/>
      <path d="M145 167H189M167 145V189M145 393H189M167 371V415" stroke="#f5f3ed" stroke-width="5"/>
      <rect x="284" y="91" width="104" height="82" fill="#20221f"/>
      <rect x="284" y="181" width="104" height="82" fill="#345dcc"/>
      <rect x="284" y="317" width="104" height="82" fill="#20221f"/>
      <rect x="284" y="407" width="104" height="82" fill="#345dcc"/>
      <circle cx="336" cy="132" r="20" fill="#ed512f"/>
      <circle cx="336" cy="222" r="20" fill="#ed512f"/>
      <circle cx="336" cy="358" r="20" fill="#345dcc"/>
      <circle cx="336" cy="448" r="20" fill="#345dcc"/>
      <path d="M240 167H270V132H284M240 167H270V222H284M240 393H270V358H284M240 393H270V448H284" fill="none"/>
      <path d="M388 132H470M388 222H470M388 358H470M388 448H470"/>
      <rect x="470" y="104" width="196" height="90" fill="#cbd3c0"/>
      <rect x="490" y="174" width="196" height="90" fill="#cbd3c0"/>
      <rect x="482" y="330" width="172" height="90" fill="#cbd3c0"/>
      <rect x="502" y="400" width="172" height="90" fill="#cbd3c0"/>
    </g>
    <g fill="#f5f3ed">
      <rect x="507" y="133" width="118" height="7"/><rect x="507" y="148" width="82" height="4"/>
      <rect x="527" y="203" width="118" height="7"/><rect x="527" y="218" width="82" height="4"/>
      <rect x="519" y="359" width="94" height="7"/><rect x="519" y="374" width="64" height="4"/>
      <rect x="539" y="429" width="94" height="7"/><rect x="539" y="444" width="64" height="4"/>
    </g>
    <g transform="translate(698 279)">
      <path d="M-35 -34H20V29H-35Z" fill="#f5f3ed" stroke="#20221f" stroke-width="2"/>
      <path d="M-22 -18H8M-22 -5H8M-22 8H8" stroke="#20221f" stroke-width="5"/>
      <path d="M18 -46A49 49 0 1 1 -44 35" fill="none" stroke="#ed512f" stroke-width="7"/>
      <path d="M-48 18L-47 42L-25 33Z" fill="#ed512f"/>
    </g>
    <path d="M75 126V202M68 126H82M68 202H82M75 352V428M68 352H82M68 428H82" stroke="#20221f"/>
  </svg>
  <figcaption><em>Original illustrative graphic: fixed model cores pass through native and neutral harness frames into overlapping result bands, while a separate accounting loop marks the telemetry correction. It is a conceptual comparison, not the study's architecture, confidence intervals or measured data.</em></figcaption>
</figure>

## What the study held fixed

The study assembled 256 tasks: 179 tasks mined from four private production codebases and 77 LeetCode or AtCoder problems published after a recorded eligibility date. Hidden tests and gold patches stayed private. Each run produced a patch that a Docker-isolated oracle graded after the agent stopped or reached a 1,200-second ceiling.

For the main comparison, the researchers selected 80 tasks and ran two repeats in four core cells. Claude Opus 4.8 used either `claude-agent-sdk` or `deepagents`; GPT-5.5 used either the OpenAI Codex SDK or `deepagents`. The same task and model were retained within each pair. Resource limits were not identical, however: the Codex core cell had 4 GiB of RAM while the other core cells had 8 GiB. The paper reports 792 graded runs from 800 planned runs across the broader six-cell matrix.

The selection improves sensitivity to differences but narrows the claim. The 80-task pool deliberately included all 24 tasks on which the two vendor-native systems disagreed during screening, so discordant cases rose from 9.4 per cent of the full suite to 30 per cent of the comparison pool. The resulting averages are conditional on that pool, not expected pass rates for an ordinary software backlog.

## The average result did not identify a winner

On Opus 4.8, the native harness solved 48.8 per cent against 50.0 per cent for `deepagents`, a native-minus-neutral difference of minus 1.25 percentage points. Its task-bootstrap 95 per cent interval ran from minus 10.0 to plus 7.5 points. On GPT-5.5, the native result was 55.6 per cent against 54.4 per cent, a plus 1.25-point difference with an interval from minus 4.4 to plus 6.9.

Those intervals include advantages in either direction. This experiment did not resolve an average winner, and it provides no evidence that the harness is irrelevant or the systems interchangeable. The paper says the reduced design was planned to detect effects of roughly 12 percentage points. Smaller differences could remain practically important when multiplied across frequent work.

This adds a narrower result to earlier research. [Harness-Bench](https://arxiv.org/abs/2605.27922) recorded 5,194 trajectories across 106 offline tasks and found substantial variation across model–harness configurations in completion, process quality, efficiency and failure behaviour. It did not make this paper's vendor-native-versus-neutral comparison. [The Scaffold Effect](https://arxiv.org/abs/2607.22585) held each of two models across three open-source harnesses on 50 Terminal-Bench Pro tasks. It reported paired pass-rate differences of zero to eight points, generally with intervals crossing zero, while tokens per solved task differed by up to about 40 times. Neither paper independently validates the new private suite; together they show why capability and operating cost need separate endpoints.

## Workload changed the apparent answer

The Opus average combined opposite task groups. The native harness trailed `deepagents` by 9.0 points on 61 repository tasks and led by 23.7 points on 19 contest tasks. A workload-label permutation test produced a p-value of 0.003.

The authors put the essential warning beside that result: the repository-versus-contest partition was chosen after inspecting the data. The contest group was small, its interval was wide, and the finding needs a study that defines and powers the split in advance. It is a hypothesis about interaction, not a basis for declaring one harness best for repositories or another best for contests.

A blended average can still hide a reversal between types of work. A team evaluating a coding agent should preserve its own workload mix rather than fill a suite with convenient, short or publicly available tasks and treat the aggregate as a deployment forecast.

## A passing patch is not a finished run

The oracle graded the patch present when time expired. Of 81 runs cancelled at the wall-clock ceiling, 22 had already produced a passing patch. The paper also reports that the neutral harness reached the ceiling more often and made roughly twice as many tool calls at similar solve rates.

A benchmark can credit correct repository state even when the agent never recognises completion, continues consuming tools or leaves a person waiting. A production evaluation should therefore record accepted output and autonomous termination separately, along with latency, tool calls, retries and the review needed before a patch can ship.

Infrastructure belongs in the same record. In a separate [Anthropic experiment](https://www.anthropic.com/engineering/infrastructure-noise), holding the Claude model, harness and Terminal-Bench 2.0 tasks fixed while changing resource headroom produced a six-point gap between the strictest and uncapped conditions. A 227-problem SWE-bench crossover showed a smaller 1.54-point increase at five times baseline RAM. That study does not assess either harness in the new paper. It shows that VM limits and enforcement can be large enough to obscure a small comparison unless they are matched and reported.

## The cost correction is part of the result

The preprint revises an August manuscript after the authors found a defect in their usage normaliser. Anthropic's native fields report input tokens separately from cache reads and writes, while OpenAI and LangChain aggregates include cached input. The study's common normaliser treated the `deepagents` data as if it used Anthropic's convention and added cache tokens again.

The revised paper withdraws the earlier claim of about 2.6 times higher cost for the neutral Opus harness and 1.8 times for the neutral GPT-5.5 harness. Re-pricing raw per-turn events at frozen list prices produced observed-usage ratios of 1.3 to 1.6 on Opus and 1.2 on GPT-5.5. Even those are not complete billing conclusions. Fifty-eight Anthropic runs left no usage record; allocating the unmatched spend to either side could move the Opus ratio from 0.7 to 2.3 and reverse the ordering.

The public paper says a replication package contains the orchestrator, grading oracle, reanalysis code, derived aggregates, revision record and claim-to-evidence table. Its appendix also says a persistent archival identifier will follow a peer-reviewed version and that the package is available from the corresponding author meanwhile. No public package URL appears in the checked paper, so Index Us did not inspect the revision memo or run the reanalysis. The private tasks, hidden tests, gold patches and canaries are not released.

## Test the decision, not the brand pairing

A useful harness comparison should start with representative tasks and one decision: whether the candidate stack produces acceptable work with less cost, waiting and review. Keep the model snapshot, prompts, tools, permissions, sandbox, resource limits, timeout, retry policy and grader as stable as practical. Run enough repeats to expose unstable outcomes.

Record at least four layers separately:

1. **Accepted output:** whether the final patch satisfies hidden tests and human acceptance criteria.
2. **Completion behaviour:** whether the agent stops correctly, how long it takes and what remains running or unresolved.
3. **Execution cost:** raw usage events, cache semantics, tool calls, retries and reviewer time per accepted result.
4. **Billed cost:** provider invoices or balances reconciled against telemetry, with unmatched spend left unresolved rather than allocated silently.

Pre-specify workload groups before looking for interactions. Retain every configuration and outcome, including infrastructure failures and ceilinged runs. If the evaluation changes the harness and the VM size together, it cannot say which change produced the result.

This preprint does not identify a universal harness winner. Its more useful contribution is to show how a small average difference can coexist with workload-specific movement, different stopping behaviour and a materially revised cost account. A buyer or operator still needs to test a versioned model–harness–infrastructure configuration on the work it will actually perform.

This analysis is based on public papers, an arXiv feed and published engineering results. Index Us did not run the agents, inspect the private tasks, obtain the replication package, reproduce the statistics or verify provider billing.
