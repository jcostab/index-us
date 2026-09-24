---
title: "Anthropic's ART result makes data access part of agent evaluation"
description: "Claude agents found a new bacteriophage sequence pattern, but ten reruns missed it. Scientific-agent evaluations need evidence-access and reproducibility checks."
publishedAt: 2026-09-25T00:08:56+10:00
updatedAt: 2026-09-25T00:08:56+10:00
author: Index Us Editorial
category: Analysis
tags: [anthropic, agents, scientific-discovery, evaluation, biology]
featured: false
draft: false
readingMinutes: 9
keyTakeaways:
  - "Anthropic reports that a 949-session Claude campaign identified a previously uncharacterised bacteriophage system, but the biological function of the system remains unknown."
  - "Ten reruns missed the defining DNA array because none read the relevant upstream sequence; fixed-input tests also performed worse when file-based agents failed to bring enough DNA into context."
  - "Teams evaluating research agents should retain evidence-access traces, repeat full campaigns and keep computational anomaly detection separate from experimental validation."
sources:
  - label: "Anthropic — Claude discovers a novel enzyme system with CRISPR-like repeats"
    url: "https://www.anthropic.com/news/claude-discovers-novel-enzyme-system"
  - label: "Anthropic researchers — Autonomous AI agents discover reverse transcriptases with tandem repeat arrays"
    url: "https://www-cdn.anthropic.com/22573675ada52a8ca8a97a1a4b4326b2f208a071.pdf"
  - label: "Anthropic on X — exact-timestamped ART announcement"
    url: "https://x.com/AnthropicAI/status/2102824959827742916"
  - label: "Reuters via KSL — Anthropic says Claude AI helped discover novel enzyme system"
    url: "https://www.ksl.com/article/51627805/anthropic-says-claude-ai-helped-discover-novel-enzyme-system"
  - label: "Journal of Virology — Comparative genomics of three novel jumbo bacteriophages"
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8428398/"
  - label: "Microorganisms — Interactions between jumbo phage SA1 and Staphylococcus"
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9414953/"
  - label: "Gautam Parab — Claude found the enzyme system in one campaign out of eleven"
    url: "https://gautamparab.com/writing/one-campaign-in-eleven/"
newsroom:
  runId: "20260924T140332Z"
  storyId: "anthropic-art-agent-context-evidence"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

Anthropic says a large Claude-agent campaign found a previously uncharacterised enzyme system in bacteriophages. The most useful operational result sits in the failed repetitions: ten reruns of the campaign missed the DNA pattern that defined the finding.

The defining difference was whether the relevant upstream sequence reached model context. In follow-up tests, the same paper found that giving an agent more tools and files could reduce recognition when the agent failed to open enough of the raw DNA.

For operators, this is evidence that a research agent's apparent capability depends on the route from stored data to model context. An evaluation that records only the model, tools and final answer can miss the control that changed the result.

Anthropic [announced the work on X](https://x.com/AnthropicAI/status/2102824959827742916) at 18:18:33.678 UTC on 23 September 2026 and published a company-authored [technical preprint][s2]. It has not been peer reviewed or independently replicated. Anthropic's researchers performed the experimental work, and the function of the system they call array-associated reverse transcriptases, or ART, remains unknown.

<figure style="margin:2.5rem 0;">
  <svg viewBox="0 0 800 560" width="800" height="560" role="img" aria-labelledby="art-context-title art-context-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#f5f3ed;" preserveAspectRatio="xMidYMid meet">
    <title id="art-context-title">A sequence archive passes through a narrow context aperture before reaching a laboratory check</title>
    <desc id="art-context-desc">A technical grid holds a charcoal sequence archive, a cobalt context gate and a sage laboratory frame. Repeating vermilion markers are visible only inside a circular aperture, while several abstract paths stop before the aperture. Registration marks and measurement lines surround the conceptual workflow.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <g stroke="#20221f" stroke-width="1" opacity=".12">
      <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800"/>
      <path d="M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560"/>
    </g>
    <rect x="43" y="45" width="714" height="470" fill="none" stroke="#20221f" stroke-width="2"/>
    <path d="M24 93H64M44 73V113M736 466H776M756 446V486" stroke="#20221f" stroke-width="2"/>
    <circle cx="44" cy="45" r="6" fill="#ed512f" stroke="#20221f" stroke-width="2"/>
    <circle cx="756" cy="515" r="6" fill="#345dcc" stroke="#20221f" stroke-width="2"/>
    <rect x="81" y="124" width="241" height="312" fill="#20221f"/>
    <g stroke="#f5f3ed" stroke-width="3" opacity=".72">
      <path d="M105 158H295M105 188H251M105 218H282M105 248H235M105 278H295M105 308H260M105 338H287M105 368H244M105 398H295"/>
    </g>
    <g fill="#ed512f" stroke="#20221f" stroke-width="1">
      <rect x="121" y="238" width="15" height="50"/><rect x="158" y="238" width="15" height="50"/><rect x="195" y="238" width="15" height="50"/><rect x="232" y="238" width="15" height="50"/><rect x="269" y="238" width="15" height="50"/>
    </g>
    <rect x="322" y="98" width="164" height="364" fill="#345dcc" stroke="#20221f" stroke-width="3"/>
    <circle cx="404" cy="280" r="100" fill="#f5f3ed" stroke="#20221f" stroke-width="4"/>
    <path d="M322 178H486M322 382H486" stroke="#f5f3ed" stroke-width="2" opacity=".75"/>
    <g fill="#ed512f" stroke="#20221f" stroke-width="2">
      <rect x="344" y="255" width="18" height="50"/><rect x="383" y="255" width="18" height="50"/><rect x="422" y="255" width="18" height="50"/><rect x="461" y="255" width="18" height="50"/>
    </g>
    <g fill="none" stroke="#20221f" stroke-width="4">
      <path d="M486 280H535"/>
      <path d="M101 469C171 469 246 486 322 449" stroke-dasharray="8 8"/>
      <path d="M110 91C180 91 255 76 322 111" stroke-dasharray="8 8"/>
      <path d="M170 94V124M235 94V124M286 448V478"/>
    </g>
    <rect x="535" y="145" width="181" height="270" rx="88" fill="#cbd3c0" stroke="#20221f" stroke-width="3"/>
    <path d="M581 188H670M581 210H648" stroke="#20221f" stroke-width="4"/>
    <path d="M604 239V300L575 355H677L648 300V239" fill="#f5f3ed" stroke="#20221f" stroke-width="4"/>
    <path d="M590 331H663L650 354H578Z" fill="#ed512f"/>
    <path d="M616 254H636M609 275H643" stroke="#345dcc" stroke-width="5"/>
    <circle cx="626" cy="376" r="8" fill="#345dcc" stroke="#20221f" stroke-width="2"/>
    <path d="M75 492H179M75 481H145M619 78H719M649 89H719" stroke="#20221f" stroke-width="2"/>
    <path d="M508 105V154M500 105H516M500 154H516" stroke="#20221f" stroke-width="2"/>
  </svg>
  <figcaption><em>Original illustrative graphic: an abstract sequence archive passes through a context aperture before a human-run laboratory check. The highlighted repeats are a conceptual account of evidence access, not Anthropic's workflow diagram, DNA sequence, success-rate chart or proof of biological function.</em></figcaption>
</figure>

## What the campaign did

The [preprint][s2] describes a multi-agent genome-mining system built around Claude Mythos 5. A launch agent divided the work into stages. Worker agents planned and ran analyses, supervisors reviewed them and opened follow-up tasks, curators maintained shared findings, and editor agents reviewed reports.

Across 21.5 hours of wall-clock time, the campaign used 949 agent sessions, 119 tasks, 76.9 agent-hours and 215.6 million tokens. It surveyed reverse transcriptases across about 1.9 billion protein clusters, recovered 198,290 RT clusters after filtering and produced 19 reports from promoted candidates and follow-up observations.

ART emerged through a follow-up rather than directly from the original candidate search. The campaign first followed an apparent relationship between an RT and a phage RNA-polymerase gene. A worker rejected that association but queued the RT for follow-up. Its supervisor then asked the next worker to inspect the upstream region; that worker loaded the DNA into context, noticed a regularly spaced repeat array and checked whether the pattern matched known systems.

Anthropic's later human-directed analysis identified 95 ART-family RT clusters. Detectable repeat arrays sat upstream of 28 of them, with a partner gene downstream. The researchers found that the arrays were expressed as short RNAs during infection and when a selected ART region was expressed in *E. coli*.

The independent record helps locate what was already known. A [2021 Journal of Virology paper][s5] described the MarsHill jumbo phage and its predicted RNA-dependent DNA polymerase, while saying the polymerase's function was unclear. A separate [2022 transcriptomic study][s6] produced the SA1 infection data that Anthropic later reanalysed. Those papers support the provenance of the phage genomes and expression dataset. They do not independently verify Anthropic's ART classification, agent transcript or experimental interpretation.

## The result is not a CRISPR replacement

The comparison with CRISPR describes an architectural resemblance: ART loci contain repeated non-coding DNA beside an enzyme and a partner gene. It does not establish a gene-editing tool.

The preprint says the team has not shown that the RT is active, that the short RNAs are its substrates, that the RT interacts with the partner protein or what the system does for the phage. Its model of a retron-like system with a bank of distinct RNAs is a hypothesis. [Reuters' account][s4] also keeps the central limit visible: ART's function remains unknown.

The sequence analysis and expression work support treating ART as a previously uncharacterised system worth investigating. They do not yet support a claim that it cuts, copies or pastes DNA in a programmable way.

## Ten reruns exposed the evidence-access dependency

The authors reran the same broad campaign ten times. Nearly every completed run sampled ART loci during the census, and workers in two runs investigated the lineage as a follow-up. None read the relevant upstream DNA. All ten missed the repeat array.

[Gautam Parab's independent close reading][s7] centres these reruns rather than the launch claim and cautions that eleven campaigns are too few to estimate a stable discovery rate. The result demonstrates a possible path to a finding and exposes why it failed to recur, but it does not establish how often another campaign will succeed.

The paper then replaced the open-ended campaign with fixed-input tests. Seven Claude models received ART material at five levels, ranging from loci placed directly in context to files accompanied by analysis tools, predicted structures, literature and web access. A Mythos 5 judge scored 100 attempts per model and level against ten curated features.

The four most capable models recognised the array in at least 90 per cent of attempts when the relevant loci were placed directly in context. Performance could fall to 32 per cent in file-and-tool conditions. Across file-based attempts by those models, 39 per cent never read a contiguous DNA stretch of at least 200 nucleotides. For each model, recognition was 16 to 32 percentage points higher when at least that much DNA entered context.

These are internally designed benchmarks, run on Anthropic models and scored by an Anthropic model against an Anthropic-authored rubric. They are useful diagnostics, not an independent measure of scientific capability. The direction of the result is still operationally important: tool access did not guarantee evidence access, and a more elaborate environment sometimes made the defining pattern less likely to reach the model.

## Evaluate the route to evidence

Teams using agents for research should treat evidence access as a measured part of the system. A retained final report and a list of available tools are insufficient. The evaluation needs to show which files, records and sequence ranges were retrieved, what entered model context, which queries returned empty or partial results and why a promising path stopped.

For a similar discovery workflow, four checks would make the evidence more decision-ready:

1. **Instrument observation.** Retain file-open events, database query identifiers, sequence ranges and the evidence attached to each claim. Measure whether the agent inspected the material needed to make the judgement.
2. **Pair deterministic coverage with model judgement.** Use scripts to flag repeated structures, missing regions and unvisited candidates, while leaving the model to interpret why an anomaly may matter. Neither route should silently substitute for the other.
3. **Repeat the full campaign.** Report how often the system reaches the same candidate from the original brief, not only how well it recognises the answer after the relevant evidence is supplied.
4. **Keep validation outside the discovery agent.** Confirm provenance, rerun key computations and use appropriate experiments before promoting a model-generated hypothesis to a biological finding.

A successful trial should show more than one agent finding an anomaly once. It should establish that the system reliably gives the model a chance to observe the anomaly, records the path and produces a claim that another team can check.

Anthropic's report is useful because it includes the failure mode alongside the successful trace. The next evidence to watch is independent biological replication, peer review, release of enough campaign artefacts to test the discovery path and a clear account of whether other models and harnesses can recover ART from the original brief.

Index Us did not run the campaign, access Mythos 5, analyse the sequence data, reproduce the benchmark or perform laboratory work. This assessment is based on Anthropic's company-authored preprint and announcement, independent reporting, and the earlier peer-reviewed phage studies that supplied part of the underlying record.

[s2]: https://www-cdn.anthropic.com/22573675ada52a8ca8a97a1a4b4326b2f208a071.pdf
[s4]: https://www.ksl.com/article/51627805/anthropic-says-claude-ai-helped-discover-novel-enzyme-system
[s5]: https://pmc.ncbi.nlm.nih.gov/articles/PMC8428398/
[s6]: https://pmc.ncbi.nlm.nih.gov/articles/PMC9414953/
[s7]: https://gautamparab.com/writing/one-campaign-in-eleven/
