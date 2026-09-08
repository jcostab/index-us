---
title: "Arm AI Portal puts hardware fit beside model choice"
description: "Arm's new AI Portal links optimised models to target hardware, runtimes and deployment paths. Use it to shortlist, then test the complete system."
publishedAt: 2026-09-08T18:16:30+10:00
updatedAt: 2026-09-08T18:16:30+10:00
author: Index Us Editorial
category: Tools
tags: [edge-ai, models, deployment, arm, mcp]
featured: false
draft: false
readingMinutes: 8
keyTakeaways:
  - "Arm AI Portal combines model discovery, hardware targets, runtime information, comparison data and deployment examples in one public workflow."
  - "Its public catalogue and MCP endpoint are available to inspect now, while bring-your-own-model optimisation remains an early-access service."
  - "Treat portal results as a shortlist: repeat quality, latency, memory, power and sustained-load tests on the exact device and software stack you plan to ship."
sources:
  - label: "Arm — Arm AI Portal launch announcement"
    url: "https://newsroom.arm.com/news/arm-unveils-arm-ai-portal"
  - label: "Arm Developer — AI Portal model comparison"
    url: "https://developer.arm.com/ai/models?page=1&compareX=latency&compareY=peakMemoryMb&compareSize=sizeMb&view=compare"
  - label: "Arm Community — Technical introduction to AI Portal"
    url: "https://developer.arm.com/community/arm-community-blogs/b/ai-blog/posts/meet-arm-ai-portal-the-launchpad-for-your-next-ai-application"
  - label: "Tummalapalli and colleagues — Sustained edge-LLM inference preprint"
    url: "https://arxiv.org/abs/2603.23640"
newsroom:
  runId: "20260908T080452Z"
  storyId: "arm-ai-portal-hardware-fit"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

Arm has launched a model catalogue built around the hardware that will run each model. [Arm AI Portal](https://newsroom.arm.com/news/arm-unveils-arm-ai-portal) brings optimised models, target-device information, performance data, code examples and deployment workflows into one place. Its launch page was published at 02:00:02 UTC on 8 September 2026.

The portal connects a model to its device class, runtime and numerical format, rather than presenting another list of names. The [public comparison view](https://developer.arm.com/ai/models?page=1&compareX=latency&compareY=peakMemoryMb&compareSize=sizeMb&view=compare) showed 84 results when checked on 8 September, with performance, memory and model-size axes for models sharing a task and evaluation target.

That can shorten discovery, but it cannot settle a deployment choice. An optimised model is a system result: model version, converted graph, quantisation, runtime, kernels, operating system, device, workload and thermal conditions all contribute. The sensible use of the portal is to produce a credible shortlist, then test it on the exact system a team intends to ship.

Arm's public pages are also split between what can be inspected now and what remains early access. The catalogue, comparison interface, code links and an MCP endpoint are published. [Arm says](https://newsroom.arm.com/news/arm-unveils-arm-ai-portal) tools for bringing and optimising proprietary models will come later, while agent-ready resources are in early access ahead of general release. A public setup command should therefore not be read as a general-availability commitment for every agent workflow.

## Model selection becomes a model-and-target decision

The portal groups work by task and target instead of presenting one league table. Its [technical introduction](https://developer.arm.com/community/arm-community-blogs/b/ai-blog/posts/meet-arm-ai-portal-the-launchpad-for-your-next-ai-application) says developers can filter by task, device class, runtime and format, then compare candidates using measures including benchmark score, latency, peak memory and average memory. Individual entries can include training-data provenance, benchmark conditions, runtime and test-device information.

At launch, Arm names Qwen, Gemma and YOLO among the available model families, with ExecuTorch, LiteRT and ONNX Runtime among the supported runtimes. That range matters because saying a model runs on Arm is not a useful deployment specification. A cloud CPU, Raspberry Pi, mobile CPU and embedded NPU have different memory, power, latency and software constraints even when they share an instruction-set family.

The comparison interface encourages a better first question: which model artifact has evidence on the target closest to mine? Starting there reduces the risk of choosing the highest general benchmark score, only to find that its runtime lacks an efficient operator, its memory peak exceeds the device budget or its numerical format changes output quality.

Arm's examples show why the configuration belongs beside the result. [The company reports](https://newsroom.arm.com/news/arm-unveils-arm-ai-portal) more than a fourfold speed-up for Qwen3-TTS on a vivo X300 using single-thread execution, a Q8_0 talker with a code predictor, mixed quantisation and SME2 acceleration. [It separately reports](https://newsroom.arm.com/news/arm-unveils-arm-ai-portal) more than 40 per cent improvement for YOLO26n in two configurations: single-thread FP16 versus FP32 on a vivo X300 with SME2, and mixed FP16 and INT8 quantisation versus FP32 on a Raspberry Pi 5 with NEON. These are Arm's measurements, not results reproduced by Index Us. They should not be detached from their model, device, precision and acceleration conditions.

The practical benefit is that the portal makes those conditions easier to find before a developer downloads an artifact. Performance work often disappears into a model card, repository issue, framework example or hardware guide. Putting the pieces together can reduce repeated investigation, provided the record remains current and specific.

## Optimisation can change both speed and behaviour

Optimisation is not one switch. [Arm's technical post](https://developer.arm.com/community/arm-community-blogs/b/ai-blog/posts/meet-arm-ai-portal-the-launchpad-for-your-next-ai-application) describes exporting an upstream checkpoint, mapping its operators, converting or restructuring the graph, choosing kernels and reducing numerical precision. Each step can change the executable artifact. Quantisation may reduce memory and improve speed, but it can also affect task quality. A graph conversion may expose an operation to an accelerated backend or leave it on a slower fallback path.

This makes a base-model label insufficient. A team needs to retain the source checkpoint, converted artifact, runtime version, backend, quantisation method and target device. If any of those changes, the earlier result becomes context rather than a direct comparison.

Output quality also needs a task-specific measure. Word error rate may suit speech recognition. Mean average precision can help with object detection. A small language model may need accepted-answer checks, hallucination review or an application-specific rubric. An accuracy figure without a dataset, metric and acceptance threshold is not enough to approve an optimisation.

Size and latency need the same scrutiny. A smaller artifact may still produce an unacceptable memory peak during inference. Median latency can hide a long tail, while a fast first request can degrade under sustained work once a phone heats up. Portal data helps expose candidates and reported conditions, but the buyer still owns the production test.

## Sustained performance is not the launch benchmark

Independent research supplies a useful boundary. A March 2026 [preprint on sustained edge-LLM inference](https://arxiv.org/abs/2603.23640), last revised in June, tested a 4-bit Qwen 2.5 1.5B model across a Raspberry Pi 5 with a Hailo-10H NPU, a Samsung Galaxy S24 Ultra, an iPhone 16 Pro and a laptop RTX 4050 GPU. The researchers ran 20 warm-condition iterations on each platform.

The results varied sharply by platform. The iPhone's throughput fell 41.5 per cent from its peak before settling at about 23.7 tokens per second. A deliberately tuned S24 configuration declined about 15 per cent and settled near 10 tokens per second. The NPU configuration was much slower in absolute terms but stable under the tested sustained workload, while the laptop result was constrained by battery power.

Those figures do not evaluate Arm AI Portal. They demonstrate why a portal result cannot be generalised beyond its conditions. The paper used different inference frameworks and quantisation formats across devices. Its power measurements also came from different instruments and system boundaries, which the authors say prevents direct energy comparison. The experiment covered one model, one prompt type and one device of each kind.

For procurement, that limitation matters. Real deployments combine hardware and software, and the system's limiting factor may be temperature, memory bandwidth, power management, runtime behaviour or application contention. Peak speed during a short benchmark may answer a different question from responsiveness under sustained continuous use.

## MCP makes the catalogue reachable from a coding agent

Arm has made the portal available through a Model Context Protocol endpoint. The [portal page](https://developer.arm.com/ai/models?page=1&compareX=latency&compareY=peakMemoryMb&compareSize=sizeMb&view=compare) publishes setup commands for Codex, Claude Code and GitHub Copilot, and describes the server as a way for an agent to discover models, code examples and deployment paths for a target device.

This can remove a tedious hand-off. A developer can ask for a model suited to a task and hardware target inside the coding environment, then use the returned deployment material while implementing the application. Machine-readable discovery also helps retain more of the target context in the request.

Review remains necessary because an agent may choose a plausible artifact while missing a licence condition, version mismatch, unsupported operator, security boundary or application-quality requirement. Generated configuration and code need the same inspection as material copied manually from a portal. The MCP connection provides access to evidence and workflows; it does not establish that the resulting application is correct.

For cautious adoption, start with catalogue and documentation queries. Record what the server returned, the date, model artifact and target. Review the proposed commands and dependencies before execution, and keep deployment credentials and production changes behind the project's existing approval controls.

## A practical evaluation path

The portal can make the first half of model selection cheaper if the second half stays local and controlled.

1. **Define the workload before filtering.** Record the task, representative inputs, required output quality, response-time target, concurrency, offline needs and data-handling boundary.
2. **Name the complete target.** Include the device and chip, operating-system version, runtime and backend, available memory, power mode and whether the workload is bursty or sustained.
3. **Build a small shortlist.** Use portal filters and comparison data to find artifacts with evidence on a close target. Keep the base checkpoint, artifact version, format and licence attached.
4. **Reproduce the reported path.** Follow the documented deployment workflow first. Record dependency versions, conversion steps and any operator fallbacks before changing the configuration.
5. **Test the workload that will ship.** Measure output acceptance, cold and warm latency, sustained throughput, peak memory, power or battery impact, temperature and failure rate. Repeat enough runs to expose variability.
6. **Compare the optimisation with a baseline.** Use the same inputs and acceptance criteria. A speed gain is useful only if output quality and system behaviour remain inside the product's limits.
7. **Retain a decision record.** Pin the chosen artifact and environment, note rejected candidates and define which changes require a fresh test.

This process also gives a coding agent a sensible role: gathering candidates, scaffolding a reproducible test and organising results. The person responsible for the system should still define the acceptance criteria, inspect exceptions and approve production access.

Arm AI Portal moves hardware fit closer to the moment a model is chosen, instead of leaving deployment as cleanup after a leaderboard decision. Its value will depend on the depth, freshness and comparability of the published records. For now, it provides a better starting point for testing, not a substitute for it.

This analysis is based on public documentation and published research. Index Us did not run a portal model, connect the Arm MCP server, reproduce Arm's performance figures or test the early-access optimisation service.
