---
title: "Build a useful AI evaluation from twenty real cases"
description: "A practical method for creating a compact AI evaluation that measures quality, review time, cost and failure severity on work your organisation recognises."
publishedAt: 2026-08-29
updatedAt: 2026-08-30
category: Techniques
tags: [evaluation, models, workflow, risk]
readingMinutes: 8
keyTakeaways:
  - "Start with a decision and twenty representative cases, not a general model leaderboard."
  - "Score failure severity, review effort and visibility alongside output quality."
  - "Keep production failures in the set so the evaluation becomes a regression test."
sources:
  - label: "NIST AI RMF — Measure"
    url: "https://airc.nist.gov/airmf-resources/playbook/measure/"
  - label: "Anthropic — Develop tests and evaluations"
    url: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests"
  - label: "OpenAI — Model selection guide"
    url: "https://developers.openai.com/api/docs/guides/model-selection"
  - label: "Stanford HELM — Holistic Evaluation of Language Models"
    url: "https://crfm.stanford.edu/helm/"
---
A useful AI evaluation can begin with twenty cases. The difficult part is choosing cases that represent the work, writing an honest scoring rule and deciding what result would justify deployment.

Public benchmarks supply broad capability context. Workflow evidence shows whether a system extracts the right totals from your invoices, cites the policy used by your staff or stops before sending an unapproved email. Start with the [benchmark explainer](/articles/what-ai-benchmarks-can-tell-you/) if you are turning a leaderboard into a shortlist.

This method is intentionally small. It may reveal repeated failure patterns while remaining manageable for a subject-matter expert to review properly. Its purpose is a defensible decision about one job.

## Begin with the decision

Write the decision at the top of the evaluation before collecting examples. A good statement names the task, user and consequence:

> Decide whether an AI assistant can draft first-pass responses to routine supplier questions, with every response reviewed by the procurement team before sending.

That statement sets a boundary. The evaluation is not testing autonomous correspondence, contract interpretation or every form of business writing. If the intended workflow changes, the test must change with it.

Define the alternatives too. They may be two models, a model with and without retrieval, a new prompt against the current prompt, or the proposed system against a manual baseline. Include the current process when possible. A new tool can look impressive while taking longer than the work it replaces.

Then set the gate. For example:

- no invented prices, dates or contract terms;
- at least 18 of 20 drafts rated usable after minor editing;
- no severe failure hidden inside fluent prose;
- median review time below three minutes; and
- total cost below an agreed amount per accepted draft.

These thresholds should come from operational needs, not from the results after the test.

## Select twenty cases deliberately

Random examples are easy to collect and often too easy to pass. Build a set that reflects both frequency and consequence.

A practical mix is:

- ten ordinary cases that cover the common work;
- five awkward cases with ambiguity, missing information or unusual formatting;
- three cases where an incorrect answer would be costly or embarrassing; and
- two cases where the correct behaviour is to refuse, ask for clarification or escalate.

Use real cases where policy permits. Remove personal and confidential information unless the evaluation environment is approved to handle it. Preserve the structure that makes each case difficult. A perfectly cleaned document may no longer test the problem users face.

Give every case a short identifier and a reason for inclusion. Keep source files, expected facts and scoring notes together. Avoid model names in the case text so reviewers can assess outputs without knowing which candidate produced them.

Twenty is a starting point, not a statistical claim. Rare failures will be missed, and results should not be presented as a precise estimate of production performance. The value lies in exposing failure modes early and creating a repeatable comparison.

## Write the rubric before seeing outputs

For each case, state what a good result must contain, what may vary and what would make the result unusable. This reduces the temptation to favour whichever answer sounds more polished.

A response-drafting rubric could score:

| Measure | Question | Score |
| --- | --- | ---: |
| Factual support | Is every price, date and obligation supported by the supplied record? | 0–2 |
| Task completion | Does the draft address the supplier's actual question? | 0–2 |
| Instruction adherence | Does it follow the required format, tone and approval boundary? | 0–2 |
| Escalation | Does it identify missing information or high-risk issues? | 0–2 |
| Review effort | How much work is required before the draft can be used? | 0–2 |

Define each score in plain language. A score of two might mean correct and ready after a light copy edit. One might mean usable after a material correction. Zero might mean unsafe, misleading or easier to rewrite.

Do not force every task into one rubric. Structured extraction needs field-level accuracy. Research needs claim-to-source support. An agent needs tool selection, tool-argument accuracy, completion and approval-boundary checks. The structure should match the work.

## Give severe failures their own weight

An average quality score can hide the event that matters most. A missing comma and a fabricated bank account are not equivalent.

Add a severity label to every failure:

1. presentation defect with no change in meaning;
2. material error a normal reviewer is likely to catch;
3. material error that could reach a user or system without careful checking; and
4. safety, privacy, legal or financial failure with serious consequence.

Also record visibility. Some errors are obvious because the system returns nothing. Others are embedded in convincing text and require comparison with the source. A visible failure can be easier to operate than a slightly lower error rate with hidden failures.

Decide whether any severity-four result is an automatic stop. In many workflows it should be. A candidate should not compensate for a critical disclosure by writing nineteen attractive drafts.

## Hold the conditions steady

Run every candidate with the same input, prompt, available tools and output format. Record the date, model version, product surface, settings and system instructions. Save raw outputs before editing.

If one candidate receives web search, retrieval or code execution, note that clearly. You may be comparing complete products rather than base models, which is often the right operational comparison. It should not be described as a clean model-only result.

Control randomness where the interface permits it, but do not assume one run captures a probabilistic system. Repeat high-consequence and unstable cases. If results change materially, report the variation rather than choosing the best attempt.

For an agent, test degraded conditions as well as the happy path. Make a tool time out, return incomplete data or reject an argument. Put misleading instructions inside an input document. Confirm that the agent reports the problem and returns control at the intended approval point. The same cases can then inform the final choice described in the [model-selection guide](/articles/how-to-choose-an-ai-model/).

## Measure the work around the answer

Output quality is only part of the operating cost. Time the reviewer from opening the result to accepting or rejecting it. Record corrections that require a subject-matter expert rather than general editing.

Capture:

- median and slow-tail response time;
- input, output and tool usage costs;
- number of retries or fallbacks;
- review and correction time;
- rate of unusable results;
- rate of correctly escalated cases; and
- failures that would be difficult to detect.

Human review time often changes the conclusion. A cheap model that needs ten minutes of fact-checking can cost more per accepted result than a dearer model that needs two. A fast response is not fast if a multi-step task repeatedly stalls on a tool call.

Use the same measurement for the current manual process where feasible. The relevant question is whether the complete workflow improves, not whether the model produces text quickly.

## Summarise without hiding the cases

A compact results table keeps the decision legible. The figures below are illustrative:

| Candidate | Cases passing gate | Severe failures | Median review | Median task time | Cost per accepted result |
| --- | ---: | ---: | ---: | ---: | ---: |
| Current process | — | 0 | 8 min | 8 min | Staff time |
| Candidate A | 18/20 | 0 | 2.5 min | 3.1 min | $0.42 |
| Candidate B | 19/20 | 1 | 2.0 min | 2.4 min | $0.31 |

The table shows why a single pass rate is insufficient: Candidate B appears better until the severe failure is examined.

Keep a row-level record behind the summary. For each case, retain the raw output, scores, reviewer notes, duration and cost. If two reviewers disagree, discuss the rubric and preserve the disagreement. It may reveal an ambiguous requirement rather than a poor model.

Group failures by cause. Common groups include missing source information, poor prompt interpretation, retrieval failure, tool error, unsupported inference and incorrect escalation. A cluster can suggest a targeted change; isolated failures may need new cases or a tighter operating boundary.

## Make a narrow decision

Compare the results with the threshold set at the beginning. Possible decisions include:

- deploy for the defined cases with mandatory review;
- run a larger pilot because the small set passed but uncertainty remains;
- restrict the system to lower-risk inputs;
- change the prompt, retrieval or tool design and rerun; or
- stop because the failure pattern cannot be managed safely.

Document the chosen version, configuration, owner and review date. State where the result does not apply. Passing a supplier-response evaluation does not justify using the same system for contract advice.

Every production failure should become a candidate for the test set after sensitive details are handled appropriately. Add cases when the workflow, prompt, tools, policy or model changes. Over time the evaluation becomes a practical regression suite and a record of what the organisation has learned.

NIST's AI Risk Management Framework treats measurement as part of an ongoing process rather than a one-off score. That is the right posture here. The first twenty cases help you decide whether to proceed. The growing set helps you notice when a once-reasonable decision stops holding.
