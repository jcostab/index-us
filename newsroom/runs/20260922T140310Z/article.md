---
title: "Grok 4.7 keeps its token price, but task cost still needs measuring"
description: "SpaceXAI kept Grok 4.7's token rates unchanged. Independent tests show where it improved — and why output use, harness and caching still decide task cost."
publishedAt: 2026-09-23T00:21:00+10:00
updatedAt: 2026-09-23T00:21:00+10:00
author: Index Us Editorial
category: Analysis
tags: [models, evaluation, agents, cost, grok]
featured: false
draft: false
readingMinutes: 11
keyTakeaways:
  - "Grok 4.7 and 4.6 have the same listed token rates, but an independent evaluation measured more than twice the output tokens per task for 4.7 at xhigh effort."
  - "The larger gains appeared in selected long-horizon work and a native Grok Build coding harness, so they should not be transferred to another wrapper or workload without testing."
  - "An upgrade trial should pin effort, harness, context tier and caching, then compare accepted results, total usage, latency and review rather than token price alone."
sources:
  - label: "SpaceXAI on X — Grok 4.7 launch"
    url: "https://x.com/SpaceXAI/status/2102069815225586149"
  - label: "SpaceXAI — Introducing Grok 4.7"
    url: "https://x.ai/news/grok-4-7"
  - label: "SpaceXAI Docs — Grok 4.7"
    url: "https://docs.x.ai/developers/grok-4-7"
  - label: "SpaceXAI Docs — Release Notes"
    url: "https://docs.x.ai/developers/release-notes"
  - label: "Artificial Analysis — Benchmarking Grok 4.7"
    url: "https://artificialanalysis.ai/articles/benchmarking-grok-4-7"
  - label: "SpaceXAI Docs — Pricing"
    url: "https://docs.x.ai/developers/pricing"
newsroom:
  runId: "20260922T140310Z"
  storyId: "grok-4-7-task-cost-evaluation"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

SpaceXAI has released Grok 4.7 with the same listed API token rates as Grok 4.6. An independent evaluation makes the upgrade decision less straightforward: at the same xhigh reasoning setting, Grok 4.7 used more than twice as many output tokens per task on Artificial Analysis's Intelligence Index while improving its overall score by two points.

That result does not mean Grok 4.7 will double a production bill. It shows why the tariff cannot answer the deployment question by itself. The useful comparison is cost per accepted result through the interface, effort setting, tools and review process a team will actually use.

The [official SpaceXAI launch post][s1] was published at 16:17:53 UTC on 21 September 2026, inside this newsroom run's priority window. The accompanying [launch page][s2] and [API release notes][s4] make the model available now. Teams considering an upgrade can test a live product rather than plan around a preview.

<figure style="margin:2.5rem 0;">
  <svg viewBox="0 0 800 560" width="800" height="560" role="img" aria-labelledby="grok-task-cost-art-title grok-task-cost-art-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#f5f3ed;" preserveAspectRatio="xMidYMid meet">
    <title id="grok-task-cost-art-title">Equal price gates feeding different work paths towards one acceptance check</title>
    <desc id="grok-task-cost-art-desc">An off-white technical grid holds two identical cobalt entry gates. A short charcoal route and a longer vermilion route pass through a sage harness frame and converge on the same circular acceptance aperture. Registration marks and token-like blocks make the composition technical without representing measured values.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <g stroke="#20221f" stroke-width="1" opacity=".12">
      <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800"/>
      <path d="M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560"/>
    </g>
    <rect x="46" y="48" width="708" height="464" fill="none" stroke="#20221f" stroke-width="2"/>
    <g stroke="#20221f" stroke-width="2" fill="none">
      <path d="M26 80H66M46 60V100M734 460H774M754 440V480"/>
      <circle cx="46" cy="48" r="6" fill="#ed512f"/>
      <circle cx="754" cy="512" r="6" fill="#345dcc"/>
    </g>
    <g stroke="#20221f" stroke-width="3">
      <rect x="92" y="126" width="132" height="94" rx="2" fill="#345dcc"/>
      <rect x="92" y="340" width="132" height="94" rx="2" fill="#345dcc"/>
      <rect x="111" y="149" width="94" height="48" fill="#f5f3ed"/>
      <rect x="111" y="363" width="94" height="48" fill="#f5f3ed"/>
      <path d="M126 173H190M126 387H190" stroke="#20221f" stroke-width="6"/>
    </g>
    <rect x="302" y="86" width="278" height="388" fill="#cbd3c0" stroke="#20221f" stroke-width="3"/>
    <rect x="326" y="110" width="230" height="340" fill="#f5f3ed" stroke="#20221f" stroke-width="2" stroke-dasharray="8 8"/>
    <g fill="#20221f">
      <rect x="270" y="158" width="36" height="30"/>
      <rect x="338" y="158" width="44" height="30"/>
      <rect x="416" y="158" width="44" height="30"/>
      <rect x="494" y="158" width="50" height="30"/>
    </g>
    <path d="M224 173H270M306 173H338M382 173H416M460 173H494M544 173H616" fill="none" stroke="#20221f" stroke-width="6"/>
    <g fill="#ed512f" stroke="#20221f" stroke-width="2">
      <rect x="266" y="372" width="40" height="30"/>
      <rect x="340" y="314" width="42" height="30"/>
      <rect x="414" y="372" width="42" height="30"/>
      <rect x="488" y="256" width="42" height="30"/>
      <rect x="488" y="372" width="42" height="30"/>
    </g>
    <path d="M224 387H266M306 387H340V329H382V387H414M456 387H488M530 387H554V271H530M488 271H472V387H616" fill="none" stroke="#ed512f" stroke-width="7" stroke-linejoin="round"/>
    <g stroke="#20221f" stroke-width="3">
      <path d="M616 130V430"/>
      <circle cx="674" cy="280" r="62" fill="#20221f"/>
      <circle cx="674" cy="280" r="36" fill="#f5f3ed"/>
      <path d="M641 280H616M616 173H594M616 387H594" fill="none"/>
      <path d="M657 280L670 293L694 263" fill="none" stroke="#ed512f" stroke-width="8" stroke-linecap="square"/>
    </g>
    <g fill="#20221f">
      <circle cx="270" cy="120" r="4"/><circle cx="286" cy="120" r="4"/><circle cx="270" cy="440" r="4"/><circle cx="286" cy="440" r="4"/>
    </g>
    <path d="M70 280H270M590 98H730M590 462H730" stroke="#20221f" stroke-width="1" stroke-dasharray="6 7"/>
  </svg>
  <figcaption><em>Original illustrative graphic: identical entry gates feed different work paths before a result reaches an acceptance check. It is a conceptual cost model, not a benchmark chart or measured Grok output.</em></figcaption>
</figure>

## The tariff stayed still; the evaluation did not

The [SpaceXAI release notes][s4] list the same standard rates for Grok 4.7 and Grok 4.6. Below 200,000 prompt tokens, both cost $2 per million input tokens, $0.50 per million cached input tokens and $6 per million output tokens. Above that prompt threshold, each rate doubles to $4, $1 and $12 respectively.

Those are tariff rates. They do not estimate the cost of a task, which depends on the uncached input, cached input, generated output and whether the prompt crosses the 200,000-token tier. An agent may add tool charges, failed attempts and repeated context. Human review and correction add to the cost of reaching a usable result.

Artificial Analysis supplies a current warning against collapsing those layers. Its [Grok 4.7 evaluation][s5] reports a score of 46 on its Intelligence Index, two points above Grok 4.6. At xhigh effort, it measured approximately 81,000 output tokens per task for 4.7, compared with 38,000 for 4.6 at xhigh.

The suite used more than twice the output tokens for 4.7. That does not establish that 4.7 costs more than twice as much in every workflow. The tasks, stopping conditions and prompt mix belong to Artificial Analysis. A local workload may receive a better answer sooner, avoid a retry or use a lower effort setting. It may also produce long answers without improving the acceptance rate. Both possibilities need measurement.

## The improvement is concentrated, not uniform

Artificial Analysis found larger movement in particular kinds of work. On its Coding Agent Index, Grok 4.7 at xhigh with the native Grok Build harness scored 56, up from 47 for Grok 4.6 at xhigh. The report also records a substantial gain on its private long-horizon professional-work benchmark.

Other movements were smaller or negative. Artificial Analysis says 4.7 broadly matched 4.6 high outside agentic knowledge work, with improvements on Terminal-Bench and GDP.pdf but regressions on AA-LCR and AutomationBench-AA. These are evaluation results, not expected production rates, and some comparisons use different effort settings.

That distribution matters more than the label “new model”. A team whose expensive failures resemble multi-step coding or long-horizon knowledge work has a stronger reason to test. A team running short extraction or classification tasks cannot infer the same benefit.

The native coding result covers a complete system. Artificial Analysis explicitly separates Grok Build from the standardised harness used for its general index. Index Us has previously covered why a [model score needs its harness, task release, verifier and budget](/articles/harbor-agent-benchmark-versioning/), and why [same-model harness comparisons can change with workload and accounting](/articles/coding-agent-native-harness-average-advantage/). A Grok Build result should not be relabelled as an API result for an internal agent with different tools, context management or stopping behaviour.

## Reasoning effort is part of the model name in practice

The [Grok 4.7 API documentation][s3] offers low, medium, high and xhigh reasoning effort, with high as the default. Artificial Analysis used xhigh for its 4.7 Intelligence Index evaluation and supplies a like-for-like xhigh output-use comparison with 4.6.

SpaceXAI's own launch table needs similar care. Its main headings compare Grok 4.7 xHigh with Grok 4.6 High, while an asterisk says the displayed 4.7 DeepSWE result used high effort. The table is useful evidence about the vendor's chosen configurations, but it is not one controlled 4.7-versus-4.6 experiment with every setting held fixed.

An upgrade trial should name the effort setting in every result. Testing only the default high setting may miss where xhigh helps a difficult case, while testing only xhigh may exaggerate the cost of ordinary work. A sensible design tests at least one common setting across both versions and adds xhigh where the extra reasoning has a plausible job.

## Caching and context can change the arithmetic

The two models share a 500,000-token context window, but the pricing threshold arrives at 200,000 prompt tokens. A long agent history can therefore double token rates before it fills the advertised window.

SpaceXAI also recommends setting a `prompt_cache_key` for the Responses API, or the corresponding conversation header for Chat Completions. Its documentation says this routes a conversation to the same server, making cache hits reliable; without it, requests often pay full input price on a cache-cold server. For long loops, the provider recommends context compaction. The Responses API also returns encrypted reasoning items that should be passed back unchanged in the next request.

These configuration details belong in the migration test. A 4.6 comparison with warm cache reuse against a cache-cold 4.7 integration would measure routing quality as much as the model. A client that drops reasoning state or lets a tool trace grow without compaction may create cost and quality differences that the launch tariff cannot show.

Product surface matters too. Grok 4.7 Fast is limited to Cursor and Grok Build rather than the public xAI API. SpaceXAI describes it as twice the standard token rates, but its [current pricing table][p1] lists $4/$1/$12 per million tokens below 200,000 prompt tokens and $6/$1.50/$18 above that threshold. The long-context figures are 1.5 times the standard 4.7 long-context rates, so teams should verify billing for the surface they plan to use. The US regional endpoint carries a 10 per cent token-price premium. Record the surface and service tier beside the model version, especially when a proof of concept and production deployment use different routes.

## Run an upgrade trial that can answer yes or no

Start with a small set of real tasks that includes ordinary work, difficult work and failures that currently cause retries or substantial review. Use inputs your data policy allows in the chosen service. Define acceptance before running either model: required facts, permitted tools, prohibited errors, deliverables and the point at which a person must intervene.

Then compare Grok 4.6 and 4.7 through the same production-intended harness. Pin the system prompt, tools, permissions, context construction, cache key, timeout, retry policy and grader. Run repeated trials where nondeterminism matters. Test the same effort on both versions before adding a separate high-versus-xhigh comparison.

For each task, retain:

- whether the result was accepted after review;
- uncached input, cached input and output tokens;
- tool calls, retries and fallback use;
- elapsed task time and time spent reviewing;
- whether the prompt stayed below or crossed 200,000 tokens; and
- material failure severity, not only a pass or fail label.

Run representative conversations once with a cold cache and again with the intended reuse pattern. Separate Fast, regional and third-party gateway results rather than mixing their rates. Reconcile telemetry against billed usage before reporting a cost ratio.

The primary outcome is total cost per accepted result. A larger output bill can be worthwhile if 4.7 solves cases that 4.6 sends through repeated attempts or lengthy review. A higher benchmark score brings no operational gain if the production task was already accepted and the additional generation changes nothing.

Set the switching rule in advance. For example, require a defined improvement in accepted results without a material increase in severe failures, then compare the added model cost with saved retries and review. If 4.7 helps only a difficult slice, route that slice instead of replacing 4.6 for every request. The site's broader [model-selection guide](/articles/how-to-choose-an-ai-model/) explains how to retain this decision as a versioned operating record.

SpaceXAI says Grok 4.7 uses a larger base model, longer reinforcement learning and new safeguards. Those remain provider claims in the checked material. Index Us did not call the API, run Grok 4.6 or 4.7, reproduce either organisation's evaluations, inspect private benchmark tasks or independently validate the safety claims.

The launch gives teams working on difficult, long-horizon tasks a reason to test the upgrade. Whether Grok 4.7 is economical still has to be shown through accepted work in the configuration the team will operate.

[s1]: https://x.com/SpaceXAI/status/2102069815225586149
[s2]: https://x.ai/news/grok-4-7
[s3]: https://docs.x.ai/developers/grok-4-7
[s4]: https://docs.x.ai/developers/release-notes
[s5]: https://artificialanalysis.ai/articles/benchmarking-grok-4-7
[p1]: https://docs.x.ai/developers/pricing
