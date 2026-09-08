---
title: "Harbor shows why agent benchmark scores need a version and harness"
description: "Harbor unifies dozens of agent benchmarks, but its live task set and judge have already changed. Treat every score as a versioned system result."
publishedAt: 2026-09-08T12:55:58+10:00
updatedAt: 2026-09-08T12:55:58+10:00
author: Index Us Editorial
category: Analysis
tags: [agents, evaluation, benchmarks, reproducibility, harbor]
featured: false
draft: false
readingMinutes: 8
keyTakeaways:
  - "Harbor reduces the engineering needed to run many agent benchmarks, but a score still belongs to a specific model, harness, task release, verifier and budget."
  - "The paper's 82-task Harbor-Index 1.0 and the current 80-task repository are not interchangeable, and the live judge configuration has also changed."
  - "Use Harbor-Index as a hard screening suite, then test accepted outcomes, cost and review effort on representative local work before choosing an agent."
sources:
  - label: "arXiv — cs.AI updates RSS"
    url: "https://rss.arxiv.org/rss/cs.AI"
  - label: "Harbor project — Harbor Adapters and Harbor-Index paper"
    url: "https://arxiv.org/abs/2609.04298"
  - label: "Harbor project — Introducing Harbor-Index"
    url: "https://harbor-index.org/"
  - label: "Harbor project — Current Harbor-Index repository README"
    url: "https://raw.githubusercontent.com/harbor-framework/harbor-index/main/README.md"
  - label: "Harbor project — Current Harbor-Index job configuration"
    url: "https://raw.githubusercontent.com/harbor-framework/harbor-index/main/job-config.yaml"
  - label: "NeurIPS 2025 — Measuring what Matters"
    url: "https://arxiv.org/abs/2511.04703"
  - label: "Wang, Pradel and Liu — Are Solved Issues in SWE-bench Really Solved Correctly?"
    url: "https://arxiv.org/abs/2503.15223"
  - label: "EleutherAI researchers — Lessons from the Trenches on Reproducible Evaluation"
    url: "https://arxiv.org/abs/2405.14782"
newsroom:
  runId: "20260908T024749Z"
  storyId: "harbor-agent-benchmark-versioning"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

Harbor's new preprint puts a practical problem in agent evaluation into numbers: an agent score is incomplete without the rest of the test system attached. The framework makes many different benchmarks easier to run, while the task release, model, harness, verifier and budget still determine what the result means.

The [Harbor Adapters and Harbor-Index preprint](https://arxiv.org/abs/2609.04298) describes adapters for more than 80 benchmarks. Its large evaluation covered 6,627 tasks from 54 benchmarks, eight models and 16 model–harness configurations, with three trials per setting. The authors report about 0.3 million trajectories, 226 billion tokens and more than US$300,000 in compute. They then produced Harbor-Index 1.0, an 82-task set intended to retain difficult but valid work.

The immediate benefit is less integration work. A team can connect an agent to a common task format instead of building a separate bridge for every benchmark. The results also show that the task, verifier, harness and model remain entangled.

The project itself supplies a useful demonstration. The paper and launch page describe 82 tasks. The [current repository README](https://raw.githubusercontent.com/harbor-framework/harbor-index/main/README.md), checked on 8 September 2026, describes 80 and points submissions to the Harbor-Index 1.3 leaderboard. Its [current job configuration](https://raw.githubusercontent.com/harbor-framework/harbor-index/main/job-config.yaml) uses three votes from Claude Opus 5 and documents earlier configurations using a three-model ensemble and then Claude Sonnet 5.

Both counts may be valid for their respective releases. Their difference shows why “the Harbor-Index score” is incomplete. The defensible unit is a score on a named task release, model, harness, verifier configuration, attempt count and budget.

[arXiv's cs.AI feed](https://rss.arxiv.org/rss/cs.AI) timestamped the paper's public announcement at 04:00 UTC on 7 September 2026. The submission history records the first version as lodged on 3 September at 16:26:20 UTC. The work is a preprint, not an independently replicated finding or a peer-reviewed standard.

## A common runner removes one source of friction

Agent benchmarks are harder to compare than static question sets. A coding agent may need a repository, terminal, package registry, tests and permission boundaries. A research agent may need search, documents, file output and a model judge. The interface determines what the model can observe and do.

[Harbor represents each task](https://arxiv.org/abs/2609.04298) through instructions, an execution environment, tests and a reference solution. Once a benchmark has an adapter and an agent has a Harbor integration, the same runner can connect them. The authors describe this as reducing the integration problem from every benchmark–agent pair to one adapter per benchmark and one integration per agent.

Repeating environment setup by hand creates opportunities for dependency drift, timeout differences and quiet changes to scoring. A shared runner can make those assumptions visible and reusable. [The project releases](https://arxiv.org/abs/2609.04298) adapters, evaluation tooling and execution records, giving reviewers more than a leaderboard row to inspect.

Standardisation does not make unlike tasks equivalent. A web-research problem, a repository repair and a cybersecurity exercise still measure different work. [Some free-form tasks use a model judge](https://arxiv.org/abs/2609.04298); others use unit tests, exact matching or a threshold applied to a continuous score. A single command can make those tests easier to run without turning their scores into one universal measure of agent quality.

## The harness matters, though the model mattered more here

[The paper compared](https://arxiv.org/abs/2609.04298) each model under a cross-family Terminus-2 harness and under a native option such as Codex, Claude Code or Gemini CLI. In this experiment, the model effect was larger than the harness effect: the spread of the estimated model effects was 5.2 times the corresponding spread for harnesses.

The 5.2-to-one result limits how far scaffolding can compensate for model capability in this experiment. Harness choice still affected behaviour. [Harbor's failure analysis](https://arxiv.org/abs/2609.04298) says native harnesses allowed repeated attempts and corrections, while Terminus-2 moved once from planning to execution and then completion. The paper also notes that Terminus-2 lacks built-in image and web tools, which explains part of its gap on some tasks.

The practical reading is straightforward. A buyer is evaluating a model inside an operating system for work. Change the tool interface, context handling, iteration loop or permissions and the resulting agent may behave differently even when the model name is unchanged.

A vendor score produced with its native agent therefore needs another test before it is applied to an internal wrapper. The wrapper may remove useful tools or add safer controls. Either change can alter completion rates, cost and failure modes.

## Hard failures can be benchmark failures

[Harbor-Index was built](https://arxiv.org/abs/2609.04298) to distinguish genuinely hard tasks from broken ones. The project started with 6,627 tasks, retained 1,311 that leading configurations solved no more than one-third of the time, and used an automated audit to reduce that group to 307. A three-member human panel then selected 100 tasks; an audit-and-fix loop produced the final 82, spanning 29 benchmarks.

[The paper reports](https://arxiv.org/abs/2609.04298) that roughly one-third of the hardest candidates from more than 30 benchmarks were rejected as broken rather than difficult. The examples include environments that never triggered events required by a verifier and tests that demanded details the instruction had not specified.

Independent work points in the same direction. A [study of SWE-bench Verified patches](https://arxiv.org/abs/2503.15223) found that 7.8 per cent of patches counted as correct by the benchmark failed developer-written tests. Its additional differential testing found behavioural differences in 29.6 per cent of plausible patches and estimated a 6.2 percentage-point inflation in reported resolution rates.

The SWE-bench study did not evaluate Harbor-Index. Its narrower relevance is that passing tests and satisfying the intended task can diverge. An agent can receive a false pass from weak coverage or, as [Harbor's broken-task examples](https://arxiv.org/abs/2609.04298) show, a false failure when a grader demands unspecified details.

That distinction changes how to interpret [the paper's leading Harbor-Index 1.0 result](https://arxiv.org/abs/2609.04298): 28.0 per cent for GPT-5.5 with Codex. The index deliberately selected work that contemporary agents usually failed, so the figure applies to one configuration on a curated frontier set under that release's rules. It is not a completion rate for ordinary office or engineering tasks.

## Compact does not mean representative of everything

[The paper found](https://arxiv.org/abs/2609.04298) substantial redundancy across the larger evaluation. After selecting 12 benchmarks, every remaining benchmark's model ranking correlated at 0.7 or higher with one already selected. Within benchmarks containing at least 10 tasks, three representative tasks recovered the full system ranking with a mean correlation of about 0.923.

Those results support a cheaper screening stage. Coverage of a buyer's risks still requires separate evidence: [the paper found](https://arxiv.org/abs/2609.04298) that specialised domains could resist prediction, and its experiment did not cover every model, agent design or setting.

The [Harbor launch page](https://harbor-index.org/) says the index is designed around difficult cases, not as a measure of general capability. A compact frontier set can find differences among strong systems and expose unsolved work. A local evaluation answers a different question: whether a system can perform the organisation's tasks within its controls.

The broader measurement literature reinforces that boundary. A [systematic review of 445 language-model benchmarks](https://arxiv.org/abs/2511.04703) found recurring problems in the phenomena, tasks and scoring metrics used to support claims about complex properties such as safety and robustness. The [lm-evaluation-harness researchers](https://arxiv.org/abs/2405.14782) separately document sensitivity to evaluation setup, weak comparability and missing reproducibility detail.

These independent papers do not assess Harbor. They support a broader evaluation discipline: define the decision first, then ask whether the benchmark represents it.

## Run a versioned screening test before a local trial

Harbor-Index can be useful as the first stage of an agent selection process. Treat that stage like a controlled software experiment:

1. Pin the Harbor code, dataset release, task count and job configuration instead of leaving the dataset target floating.
2. Record the exact model identifier, agent harness, reasoning setting, tool access, sandbox, timeout and retry policy.
3. Keep the verifier and judge model fixed across compared systems. Retain judge prompts and votes where their licences and data rules permit it.
4. Run multiple attempts. The current repository asks leaderboard submissions for at least five trials per task and public trajectories.
5. Report pass rate beside token use, reconstructed cost, elapsed time, infrastructure errors and the number of tasks excluded or repaired.
6. Inspect a sample of passes and failures, especially results that could be verifier exploits, brittle formatting failures or environment faults.

Then move the shortlist to representative local cases. Measure accepted outcomes, review time, corrections, security exceptions and total cost. Preserve the same production permissions and approval boundaries the agent would have after adoption.

The paper contributes infrastructure for broader, more inspectable evaluation, along with evidence that difficult tasks, harnesses and graders can distort what a score appears to say. The live project adds a practical versioning lesson: a benchmark can improve after publication, so every result needs enough detail to be reproduced or retired.

This analysis is based on public documentation, repository files and published research. Index Us did not run Harbor, reproduce the reported experiments or inspect non-public evaluation data.
