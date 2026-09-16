---
title: "An AI patching benchmark dispute exposes an evidence gap"
description: "Trail of Bits disputes 1Password's 26% clean-fix headline. The useful lesson is to measure exploit blocking, complete repair, regressions and review separately."
publishedAt: 2026-09-16T14:36:00+10:00
updatedAt: 2026-09-16T14:36:00+10:00
author: Index Us Editorial
category: Analysis
tags: [coding-agents, security, evaluations, benchmarks, software-development]
featured: false
draft: false
readingMinutes: 10
keyTakeaways:
  - "1Password's 26% clean-fix rate and Trail of Bits' filtered 86% exploit-blocking result use different trial sets and endpoints; neither replaces the other."
  - "The original study found substantial disagreement between model graders and human review, so a benchmark result also depends on how patch quality is judged."
  - "Treat exploit reproduction, variant paths, regressions, review effort and later failures as separate evidence before an agent-authored security patch ships."
  - "Evaluate the complete local workflow on representative vulnerabilities instead of importing one headline percentage as a deployment forecast."
sources:
  - label: "Trail of Bits — 1Password's AI patching benchmark is misleading"
    url: "https://blog.trailofbits.com/2026/09/15/1passwords-ai-patching-benchmark-is-misleading/"
  - label: "Trail of Bits — blog RSS"
    url: "https://blog.trailofbits.com/index.xml"
  - label: "1Password — Why AI-generated vulnerability patches still require expert human review"
    url: "https://1password.com/blog/why-ai-generated-patches-still-require-human-review"
  - label: "1Password Off-by-1 Labs — FLAWED research paper"
    url: "https://1password.com/files/resources/frontier-models-vulnerability-patches-flawed.pdf"
  - label: "Off-by-1 Labs — FLAWED code and datasets"
    url: "https://github.com/Off-by-1-Labs/FLAWED/tree/2d3d15693b155873709bcf0daa247c2f0221d694"
  - label: "Trail of Bits — post-patch-validation skill"
    url: "https://github.com/trailofbits/skills/tree/main/plugins/post-patch-validation"
  - label: "NIST — Secure Software Development Framework 1.1"
    url: "https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-218.pdf"
newsroom:
  runId: "20260916T042851Z"
  storyId: "ai-patching-benchmark-repair-evidence"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

A dispute over an AI vulnerability-patching benchmark has put 26 per cent and 86 per cent side by side. The figures do not measure the same result.

[1Password's FLAWED study](https://1password.com/files/resources/frontier-models-vulnerability-patches-flawed.pdf) reported that 26 per cent of 6,080 classified patches completely resolved one of six selected vulnerabilities without changing intended behaviour. [Trail of Bits' reanalysis](https://blog.trailofbits.com/2026/09/15/1passwords-ai-patching-benchmark-is-misleading/) kept a filtered subset in which agents could run code and were not directed towards a wrong fix; it says 2,634 of 3,067 patches, or 86 per cent, blocked the supplied exploit.

Those endpoints are different. Blocking one exploit is useful evidence, but it does not establish that every path to the underlying weakness is closed or that the patch created no regression. Trail of Bits states that limit beside its result. The original clean-fix category asks a broader question, but its aggregate combines working conditions and prompts that do not represent one ordinary deployment.

Neither figure provides a general deployment success rate. A team needs a sequence of evidence about its own agent, codebase and review process.

The [Trail of Bits RSS feed](https://blog.trailofbits.com/index.xml) and page metadata date the critique to 11:00 UTC on 15 September 2026. The original 1Password report was published on 6 August. This article covers the critique, filtered analysis, operational patch data and release of two review skills. FLAWED itself was not rerun.

<figure>
  <svg viewBox="0 0 800 560" width="800" height="560" role="img" aria-labelledby="patch-evidence-art-title patch-evidence-art-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#f5f3ed;" preserveAspectRatio="xMidYMid meet">
    <title id="patch-evidence-art-title">A proposed security patch crossing four separate evidence gates</title>
    <desc id="patch-evidence-art-desc">An off-white technical grid contains a vermilion defect entering a cobalt patch plate. The path then crosses separate charcoal frames for the original exploit, a second route, regression checks and human review before reaching a sage release field. A broken side path shows that passing one check is not complete evidence.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <g stroke="#20221f" stroke-width="1" opacity=".13">
      <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800"/>
      <path d="M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560"/>
    </g>
    <rect x="42" y="46" width="716" height="468" fill="none" stroke="#20221f" stroke-width="1.5"/>
    <path d="M22 82H64M43 61V103M736 457H778M757 436V478" stroke="#20221f" stroke-width="2"/>
    <g stroke="#20221f" stroke-width="3">
      <circle cx="91" cy="280" r="39" fill="#ed512f"/>
      <path d="M71 260L111 300M111 260L71 300" stroke="#f5f3ed" stroke-width="7"/>
      <path d="M130 280H181"/>
      <path d="M181 215H299V345H181Z" fill="#345dcc"/>
      <path d="M204 246H276M204 270H260M204 294H276M204 318H246" stroke="#f5f3ed" stroke-width="8"/>
      <path d="M299 280H338"/>
      <rect x="338" y="103" width="93" height="354" fill="#f5f3ed"/>
      <rect x="446" y="103" width="93" height="354" fill="#f5f3ed"/>
      <rect x="554" y="103" width="93" height="354" fill="#f5f3ed"/>
      <path d="M357 168H412M357 192H395M357 280H412M357 304H395M357 392H412"/>
      <circle cx="384" cy="168" r="13" fill="#cbd3c0"/>
      <circle cx="384" cy="280" r="13" fill="#ed512f"/>
      <circle cx="384" cy="392" r="13" fill="#cbd3c0"/>
      <path d="M465 154L520 209M520 154L465 209M465 259H520M465 283H505M465 371H520M465 395H505"/>
      <circle cx="492" cy="181" r="48" fill="none" stroke="#ed512f" stroke-width="5"/>
      <path d="M576 159H625V208H576ZM576 255H625V304H576ZM576 351H625V400H576Z" fill="#cbd3c0"/>
      <path d="M588 183L598 193L615 174M588 279L598 289L615 270M588 375L598 385L615 366" fill="none"/>
      <path d="M431 280H446M539 280H554M647 280H696"/>
      <path d="M696 187H742V373H696Z" fill="#cbd3c0"/>
    </g>
    <path d="M299 280C320 280 319 72 384 72S449 72 492 72S558 72 600 72" fill="none" stroke="#20221f" stroke-width="2" stroke-dasharray="8 8"/>
    <path d="M600 72L586 64M600 72L586 82" stroke="#20221f" stroke-width="2"/>
    <path d="M384 280C430 498 526 497 600 459" fill="none" stroke="#ed512f" stroke-width="5"/>
    <path d="M600 459L578 457M600 459L589 440" stroke="#ed512f" stroke-width="5"/>
    <g fill="#20221f">
      <rect x="70" y="469" width="93" height="6"/><rect x="70" y="483" width="58" height="3"/>
      <rect x="649" y="74" width="78" height="6"/><rect x="649" y="88" width="45" height="3"/>
    </g>
  </svg>
  <figcaption><em>Original illustrative graphic: a proposed patch crosses separate gates for the supplied exploit, another route, regressions and human review. It is a conceptual validation sequence, not either team's harness, a benchmark result or measured patch quality.</em></figcaption>
</figure>

## What 1Password measured

The [FLAWED study](https://1password.com/files/resources/frontier-models-vulnerability-patches-flawed.pdf) generated patches for six recently disclosed open-source vulnerabilities using ChatGPT 5.5 at medium reasoning effort and Claude Opus 4.8 at high effort. It varied three execution modes and nine prompt templates. The one-shot mode gave the model no shell, build or test access. Iterative mode supplied a reproducer and let the agent use its output over repeated attempts. Exploratory mode allowed tools but did not supply the reproducer.

The prompts also varied what the agent was told. Two templates deliberately supplied a plausible but incomplete fix direction. Other templates provided no fix direction or increasingly detailed correct guidance. That design can reveal how agents behave under bad instructions and restricted tools. An aggregate across every condition cannot, by itself, forecast the result of a deployment that always gives an agent a build, a reproducer and reviewed root-cause information.

The paper's 26 per cent result is its S1 category: the original vulnerability is completely fixed without an unintended behaviour change. A further 20.1 per cent fell into S2, which the study defines as fixing the vulnerability while altering application behaviour. The paper reported that 4.5 per cent introduced a new vulnerability, whether or not the original problem was fixed.

These are developer-produced results from a six-vulnerability sample chosen for complex fixes. The clean-fix rate varied sharply across the selected vulnerabilities. The [released FLAWED repository and datasets](https://github.com/Off-by-1-Labs/FLAWED/tree/2d3d15693b155873709bcf0daa247c2f0221d694) make the harness and run artifacts inspectable, but Index Us did not download its multi-gigabyte datasets or reproduce the grading.

## The critique changes the question

[Trail of Bits argues](https://blog.trailofbits.com/2026/09/15/1passwords-ai-patching-benchmark-is-misleading/) that four choices make the clean-fix average a poor headline for ordinary patching: selection of six difficult fixes, deliberately wrong guidance in 22 per cent of trials, removal of build and test access in more than a third, and different default reasoning settings for the two models. Those are criticisms from a party that develops agent-assisted security patches and has an interest in showing that the tools can help defenders. They still identify real boundaries in the original design.

Its 86 per cent calculation asks a narrower question. Trail of Bits removed trials where agents could not run code, trials with deliberately wrong fix directions and runs the study flagged as having consulted the upstream fix. It then counted whether the remaining patch blocked the supplied exploit. The resulting 2,634 successes among 3,067 trials do not show an 86 per cent clean-fix rate.

One exploit is only a sample from an attack surface. The original paper reports cases in which agents stopped a supplied path while missing parallel paths or the root cause. A patch can therefore pass the reproducer and remain incomplete. Conversely, a patch can prevent exploitation yet fail the study's clean category because its behaviour differs from the upstream reference. The two measures should remain separate.

## The grader is part of the benchmark

FLAWED used both models to judge patches, then averaged their self- and cross-validation results. [Its paper reports](https://1password.com/files/resources/frontier-models-vulnerability-patches-flawed.pdf) that the two model judges assigned different five-part outcomes to 36.8 per cent of the same patches. Against human review, the model verdict matched the complete five-part outcome in 65.9 per cent of 1,052 reviewed cases. Agreement for whether the original bug was fixed was 87.7 per cent across the same 1,052 cases; agreement for whether a new bug had been introduced was 70.5 per cent across 1,059 cases.

Automated grading can still help, but these figures show why the judge, rubric and human adjudication sample belong in the result. Averaging two disagreeing judges can reduce dependence on either one, but it does not create an objective oracle for patch correctness.

[Trail of Bits supplies](https://blog.trailofbits.com/2026/09/15/1passwords-ai-patching-benchmark-is-misleading/) a different operational view, also from its own work. It says maintainers had merged 126 of 186 closed or merged Patch the Planet pull requests by 14 September. In 91 of those merged requests, its review found no security-relevant revision to the submitted fix. Maintainer acceptance is not proof of correctness, as Trail of Bits acknowledges. The organisation later inspected about 33,500 commits touching projects it had patched and reported functional, build, release and performance defects, while finding no exploitable security vulnerability in that review.

This is not a matched comparison. Trail of Bits engineers directed and checked these agent patches, which were evaluated through public maintainer decisions and a later audit. They used different vulnerabilities, agents and conditions from FLAWED. The data is useful evidence about a human-agent process, not an independent estimate of autonomous patch accuracy.

## Build a chain of evidence

Both sides support a more cautious workflow than either headline conveys. [1Password recommends expert review and local evaluation](https://1password.com/blog/why-ai-generated-patches-still-require-human-review). Trail of Bits released a [post-patch-validation skill](https://github.com/trailofbits/skills/tree/main/plugins/post-patch-validation) that requires a before-and-after reproducer, a distinct path to the same failure, regression and security checks, and an inconclusive result when the test environment is broken. The skill was not used for the Patch the Planet data in the critique, so its release is a proposed improvement rather than evidence of improved outcomes.

Independent guidance points in the same direction. [NIST's Secure Software Development Framework](https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-218.pdf) recommends testing executable code, adding tests for previously reported vulnerabilities, recording results and issues, and identifying root causes. It does not assess either benchmark or endorse an AI patching product.

A local evaluation can turn those principles into six separate gates:

1. **Reproduce the original failure.** Demonstrate that the check fails on the vulnerable revision and passes on the candidate patch.
2. **Test another path.** Derive at least one variant from the root cause rather than changing only the supplied input.
3. **Check preserved behaviour.** Run project tests and targeted regression tests for the behaviour the patch is supposed to retain.
4. **Look for new weakness.** Use the relevant sanitizer, static analysis, bounded fuzzing or property test, with failures and broken environments recorded rather than scored as success.
5. **Review independently.** Have a security-capable reviewer inspect the root cause, the complete diff and the evidence. Record revisions and unresolved uncertainty.
6. **Follow the patch.** Track maintainer acceptance, later corrective changes, incidents, reviewer time, cost and time to a releasable fix.

Each gate answers a different question. A useful scorecard keeps exploit blocking, root-cause closure, regression freedom, reviewer effort and release acceptance separate. Comparisons with humans also require the same vulnerability information, tools, time, review conditions and definition of success.

## What teams can conclude now

The new critique is strong evidence against treating 1Password's 26 per cent aggregate as a general forecast for a well-equipped patching agent. Its filtered 86 per cent result is also too narrow to establish complete repair. The disagreement clarifies the decision: agent patching performance depends on the vulnerability sample, instructions, test access, reasoning configuration, judge and endpoint.

Teams can use agents to propose and test security fixes without assuming those fixes are safe to merge. The evidence worth buying is the complete local process: how often it closes the root cause, what review catches, which regressions escape, how much engineer time it saves and what happens after release.

This analysis is based on public articles, a research paper, code repositories and a standards document. Index Us did not run FLAWED, inspect its full datasets, reproduce Trail of Bits' filtered analysis, run either released skill or assess any private security patch.
