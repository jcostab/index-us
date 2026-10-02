---
title: "Computer-use agents need whole-system speed tests"
description: "A new preprint shows why model, harness, reasoning and desktop timing must be evaluated together before a computer-use agent is deployed."
publishedAt: 2026-10-02T02:02:55Z
updatedAt: 2026-10-02T02:02:55Z
author: Index Us Editorial
category: Analysis
tags: [computer-use, agents, evaluations, deployment, benchmarks]
featured: false
draft: false
readingMinutes: 7
keyTakeaways:
  - "A new preprint standardises four computer-use benchmarks and reports task success, elapsed time and model cost for complete agent configurations rather than model names alone."
  - "In one five-seed experiment, environment processing fell sharply while total task time rose; the authors attribute the reversal to screenshots arriving before the application had settled."
  - "Reasoning effort and the agent harness changed speed as well as benchmark score, so a leaderboard result cannot be separated from the configuration that produced it."
  - "Deployment tests should version the whole stack and measure accepted completion, end-to-end time, cost and recovery work on tasks that resemble the intended workload."
sources:
  - label: "Aggarwal and colleagues — cua-speedrun abstract and submission history"
    url: "https://arxiv.org/abs/2609.40284"
  - label: "Aggarwal and colleagues — cua-speedrun full HTML preprint"
    url: "https://arxiv.org/html/2609.40284"
  - label: "Abhyankar, Qi and Zhang — OSWorld-Human"
    url: "https://arxiv.org/abs/2506.16042"
  - label: "Xie and colleagues — original OSWorld paper"
    url: "https://arxiv.org/abs/2404.07972"
  - label: "Yuan and colleagues — OSWorld 2.0"
    url: "https://arxiv.org/abs/2606.29537"
newsroom:
  runId: "20261001T150349Z"
  storyId: "computer-use-agent-speed-evaluation"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

A strong computer-use benchmark score can still conceal a poor operational choice. The agent may be slow, expensive or dependent on a particular harness. A new preprint offers a more useful unit of comparison: the complete configuration that turns a user instruction into actions on a desktop.

The [cua-speedrun preprint](https://arxiv.org/abs/2609.40284) was submitted at 17:48:06 UTC on 30 September 2026. It standardises the virtual-machine setup, execution pipeline and agent interface used to run four existing computer-use benchmarks, then reports task score, elapsed task time and model cost together. The work has not been peer reviewed or independently reproduced. Index Us did not run the benchmark, inspect every trajectory or test any named system.

The paper exposes a practical problem despite those limits. A model name is not a deployable agent. The harness controls how observations are packaged and actions are issued, while the reasoning setting changes how much planning happens between actions. The desktop environment determines when a click becomes a visible state change. Change any of these and the measured system can move to a different point on the speed, cost and completion trade-off.

<figure style="margin: 2.5rem 0;">
  <svg viewBox="0 0 800 560" width="800" height="560" role="img" aria-labelledby="cua-speed-art-title cua-speed-art-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#f5f3ed;" preserveAspectRatio="xMidYMid meet">
    <title id="cua-speed-art-title">A fast computer-use action path loops when the interface has not settled</title>
    <desc id="cua-speed-art-desc">On an off-white technical grid, three desktop panels form a horizontal relay. A thick cobalt path races towards a pale ghost panel, then curls back through a vermilion wait gate because the interface is not ready. A steadier charcoal route continues to three separate geometric checks for completion, time and cost. The illustration is conceptual and contains no benchmark measurements.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <g stroke="#20221f" stroke-width="1" opacity=".13">
      <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800"/>
      <path d="M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560"/>
    </g>
    <rect x="42" y="46" width="716" height="466" fill="none" stroke="#20221f" stroke-width="2"/>
    <path d="M22 82H62M42 62V102M738 456H778M758 436V476" stroke="#20221f" stroke-width="2"/>
    <g stroke="#20221f" stroke-width="3">
      <rect x="78" y="146" width="154" height="176" rx="8" fill="#cbd3c0"/>
      <rect x="274" y="146" width="154" height="176" rx="8" fill="#e9dfcd"/>
      <rect x="470" y="146" width="154" height="176" rx="8" fill="#f5f3ed" stroke-dasharray="10 8"/>
      <path d="M78 183H232M274 183H428M470 183H624"/>
      <circle cx="101" cy="165" r="5" fill="#ed512f" stroke="none"/>
      <circle cx="297" cy="165" r="5" fill="#345dcc" stroke="none"/>
      <circle cx="493" cy="165" r="5" fill="#cbd3c0" stroke="none"/>
    </g>
    <path d="M108 230H194M304 230H390" stroke="#20221f" stroke-width="8"/>
    <path d="M108 254H174M304 254H368" stroke="#f5f3ed" stroke-width="7"/>
    <path d="M498 230H584M498 254H558" stroke="#cbd3c0" stroke-width="8"/>
    <g fill="#345dcc" stroke="#20221f" stroke-width="2">
      <path d="M178 286L214 268L203 306Z"/>
      <path d="M374 286L410 268L399 306Z"/>
    </g>
    <path d="M214 286H374M410 286H528" fill="none" stroke="#345dcc" stroke-width="11"/>
    <path d="M528 286C584 286 602 344 552 368C508 389 455 357 472 320" fill="none" stroke="#345dcc" stroke-width="11" stroke-dasharray="18 12"/>
    <path d="M459 332L470 300L489 328Z" fill="#345dcc"/>
    <g transform="translate(549 367)">
      <rect x="-24" y="-42" width="48" height="84" rx="20" fill="#ed512f" stroke="#20221f" stroke-width="3"/>
      <path d="M-11 -15H11M-11 0H11M-11 15H11" stroke="#f5f3ed" stroke-width="5"/>
    </g>
    <path d="M155 322V419H650" fill="none" stroke="#20221f" stroke-width="6"/>
    <circle cx="155" cy="419" r="10" fill="#ed512f"/>
    <circle cx="650" cy="419" r="10" fill="#345dcc"/>
    <g transform="translate(650 419)" stroke="#20221f" stroke-width="3">
      <circle cx="0" cy="0" r="58" fill="#cbd3c0"/>
      <path d="M-58 0H58M0-58V58" fill="none"/>
      <path d="M-31 -4L-10 17L31 -25" fill="none" stroke="#345dcc" stroke-width="8"/>
      <path d="M7 13L30 36" stroke="#ed512f" stroke-width="8"/>
      <circle cx="0" cy="0" r="7" fill="#20221f"/>
    </g>
    <path d="M91 100H208M91 111H166M589 100H708M635 111H708" stroke="#20221f" stroke-width="2"/>
    <circle cx="78" cy="146" r="7" fill="#ed512f"/>
    <circle cx="624" cy="322" r="7" fill="#345dcc"/>
  </svg>
  <figcaption><em>Original illustrative graphic: a low-latency action path reaches an interface before it has settled and loops through a wait, while the full evaluation continues to separate completion, elapsed time and cost. It is a conceptual workflow, not the benchmark architecture or measured data.</em></figcaption>
</figure>

## The benchmark holds more of the system still

Computer-use evaluations are unusually sensitive to infrastructure. The agent receives screenshots and sends keyboard or mouse actions into a live desktop. Virtual-machine performance, screen capture, networking and application response times all sit between the model's decision and its next observation.

The [full preprint](https://arxiv.org/html/2609.40284) separates the agent sandbox from the task environment and uses one hosted runtime for OSWorld, OSWorld2, CUA-World and MyPCBench. It selects representative subsets of each suite to reduce evaluation cost. In the v1 paper, the main comparisons cover 50 of 295 OSWorld tasks and 52 of 63 OSWorld2 tasks, with 56 and 21 agent configurations respectively.

Those subsets are a practical compromise, not a replacement for every full benchmark run. The authors tested whether the subsets preserved rankings on held-out agents, but acknowledge that later capability changes may require revalidation. They also repeated one selected GPT-6 Astra configuration across five seeds; the wider comparison does not carry equivalent run-to-run evidence.

The definition of time is equally important. The clock starts when the instruction reaches the agent and stops when the agent terminates or hits a limit. Provisioning, task setup, agent initialisation and verification sit outside it. That isolates agent execution for comparison, but it is narrower than the time a user or production queue experiences.

## Faster input and output produced a slower task

The clearest example comes from an experimental fast input/output path. In one five-seed comparison using GPT-6 Astra at low reasoning effort, the [paper reports](https://arxiv.org/html/2609.40284) that mean environment processing fell from 12.68 seconds per task to 0.34 seconds. Total mean task time nevertheless rose from 89.5 to 99.0 seconds.

The authors' diagnosis is a timing mismatch. The faster path could return a screenshot before an application had rendered the result of the previous action. The agent then saw an old state, took extra steps or asked for longer waits. That account is supported by their trajectory analysis, but the result remains one configuration in a controlled environment. It does not show that faster infrastructure usually makes agents slower.

A component benchmark can therefore point in the wrong direction. Action latency improved dramatically while the user-relevant task became slower. An optimisation is useful only if the agent can use it without adding work elsewhere in the loop.

Reasoning effort creates another non-linear effect. For Gemini 3 Flash Preview on OSWorld, the [paper reports](https://arxiv.org/html/2609.40284) that moving from low to medium effort raised the mean score from 33.6 to 57.6 per cent while reducing mean task time from 492 to 268 seconds. The medium setting generated more tokens per task, but avoided enough unsuccessful actions to finish sooner. Other configurations in the paper show the opposite pattern: more reasoning adds time and cost without improving the score.

The example does not establish medium reasoning as a safe default. Teams need to tune reasoning effort against the task distribution and keep token latency, action latency and end-to-end completion time as separate measurements.

## The harness belongs in the result

The [preprint also compares](https://arxiv.org/html/2609.40284) the same model and reasoning setting through different agent harnesses. Scores and task times change, and neither harness is uniformly better across the tested settings. A result labelled only with the model therefore omits part of the system that produced it.

This becomes a procurement problem when a benchmark score is borrowed from a model provider but the proposed service uses another prompt, action format, batching strategy or desktop runtime. The borrowed number may be accurate for its original configuration and still be a poor estimate for the service being purchased.

Earlier independent work points in the same operational direction. The [OSWorld-Human study](https://arxiv.org/abs/2506.16042) found that model calls for planning, reflection and judging accounted for most latency in its tests, and that its 16 evaluated agents used 2.7 to 4.3 times more steps than human-derived reference trajectories. It did not reproduce cua-speedrun. Its result supports measuring the length and shape of the interaction loop instead of assuming that a faster model endpoint settles the question.

## A benchmark score is not a completed business workflow

The benchmark scope also needs care. The [original OSWorld paper](https://arxiv.org/abs/2404.07972) introduced 369 tasks across real web and desktop applications, file operations and multi-application workflows. Those tasks made execution-based evaluation more realistic than a static question set, but they remain defined tasks with benchmark verifiers.

Longer work exposes a harder gap. The [OSWorld 2.0 paper](https://arxiv.org/abs/2606.29537) reports 20.6 per cent binary completion for its strongest tested configuration under the primary 500-step setting, alongside a 54.8 per cent partial score. Those numbers belong to OSWorld 2.0, not cua-speedrun. They show why partial progress can be useful evidence about capability without amounting to a finished professional task.

The same caution applies to comparisons with people. Passing a human reference score on a bounded verifier does not establish human-level computer use, sound judgement or safe autonomy. Success, speed and model cost also do not measure whether an agent respected permissions, noticed ambiguity or caused a harmful side effect.

## Test the configuration you intend to operate

A useful local evaluation can be smaller than a public benchmark, provided its boundary is explicit.

Start with tasks that represent the intended workload, including common cases, long cases and failure-prone transitions such as downloads, save dialogs and cross-application hand-offs. Define accepted completion before the run. Partial credit can help diagnose progress, but it should not quietly become a completed job.

Version the complete configuration: model snapshot, provider, reasoning setting, harness, prompts, action format, batching, virtual-machine image, screen resolution and I/O policy. If one field changes, treat the result as a new configuration rather than inheriting the old score.

Measure at least four outcomes together:

1. **Accepted completion:** whether the final state meets the real acceptance check, with severe failures kept visible.
2. **End-to-end elapsed time:** include queueing, setup, retries, verification and any human approval that the service actually needs.
3. **Cost per accepted result:** count failed attempts and recovery, not only model tokens from successful runs.
4. **Review and recovery work:** record how long a person spends checking, correcting or safely unwinding the result.

Repeat the tasks enough to see variation and preserve failed trajectories. A mean can hide a long tail that determines whether the service fits an interactive workflow or an overnight queue. Run safety and permission tests separately; a fast successful agent has not thereby earned broader access.

cua-speedrun is useful because it makes configuration choices visible and puts elapsed time beside capability and cost. Its exact frontier will move as providers, prices, models and harnesses change. The practical decision is to choose the measured system that completes the work within the required budget and control boundary. An attractive isolated model score cannot make that decision on its own.
