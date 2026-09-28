---
title: "NVIDIA OpenShell ships now, while Sentry remains a reference design"
description: "NVIDIA has paired a released agent sandbox with a BlueField watchdog design. Teams can test OpenShell now, but Sentry still needs product evidence."
publishedAt: 2026-09-29T01:34:03+10:00
updatedAt: 2026-09-29T01:34:03+10:00
author: Index Us Editorial
category: Analysis
tags: [agent-security, nvidia, sandboxes, deployment]
featured: false
draft: false
readingMinutes: 9
keyTakeaways:
  - "OpenShell is available now as versioned open-source software, with a stable release channel and supported Linux and Apple Silicon configurations."
  - "NVIDIA describes Sentry as a BlueField-4 reference system design; the announcement does not provide a separate Sentry release, availability date or independent result."
  - "Evaluate the software boundary and the hardware watchdog separately: verify policy coverage, credential isolation, denial behaviour, audit trails and failure handling on the system you will run."
sources:
  - label: "NVIDIA — Open Agent Safety Platform announcement"
    url: "https://www.globenewswire.com/news-release/2026/09/28/3369606/0/en/nvidia-launches-open-agent-safety-platform-to-secure-agents-from-testing-to-deployment.html"
  - label: "NVIDIA Technical Blog — Add Runtime Controls to AI Agents with OpenShell"
    url: "https://developer.nvidia.com/blog/add-runtime-controls-to-ai-agents-with-nvidia-openshell/"
  - label: "NVIDIA OpenShell — v0.1.2 release"
    url: "https://github.com/NVIDIA/OpenShell/releases/tag/v0.1.2"
  - label: "NVIDIA OpenShell — support matrix"
    url: "https://docs.nvidia.com/openshell/latest/about/support-matrix"
  - label: "CNBC — Nvidia releases software platform to stop AI agents from misbehaving"
    url: "https://www.cnbc.com/2026/09/28/nvidia-releases.html"
  - label: "WIRED — Nvidia's Answer to Rogue Agents Is an Open-Source AI Security System"
    url: "https://www.wired.com/story/nvidias-answer-to-rogue-agents-is-an-open-source-ai-security-system/"
newsroom:
  runId: "20260928T142647Z"
  storyId: "nvidia-openshell-sentry-deployment-boundary"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

NVIDIA announced its Open Agent Safety Platform at 09:00 UTC on 28 September 2026. The announcement brings together two controls at different stages: OpenShell, a released open-source runtime that can be tested now, and Sentry, a hardware-backed watchdog presented as part of a reference system design.

Teams deciding how to contain agents that can run code, call external services and keep working for long periods need to keep those release states separate. NVIDIA's announcement describes Sentry stopping an agent in milliseconds, but provides no standalone Sentry release, availability date or independent measurements. OpenShell has a public repository, versioned binaries, current documentation and a stated production support boundary. The evidence for the two components is not equivalent.

<figure style="margin: 2.5rem 0;">
  <svg viewBox="0 0 800 560" width="800" height="560" role="img" aria-labelledby="openshell-sentry-art-title openshell-sentry-art-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#f5f3ed;" preserveAspectRatio="xMidYMid meet">
    <title id="openshell-sentry-art-title">An agent inside a released software boundary beside a separate hardware watchdog design</title>
    <desc id="openshell-sentry-art-desc">An off-white technical grid frames a vermilion agent inside nested sage and charcoal software boundaries on the left. Approved cobalt service paths pass through a supervisor gate while a blocked path ends at a stop bar. On the right, a separate cobalt hardware plate scans the boundary from outside it, connected by a dashed line to show that the watchdog is a reference design rather than the released software.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <g stroke="#20221f" stroke-width="1" opacity=".13">
      <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800"/>
      <path d="M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560"/>
    </g>
    <rect x="42" y="48" width="716" height="464" fill="none" stroke="#20221f" stroke-width="2"/>
    <path d="M22 88H62M42 68V108M738 452H778M758 432V472" stroke="#20221f" stroke-width="2"/>
    <rect x="82" y="105" width="390" height="350" rx="18" fill="#cbd3c0" stroke="#20221f" stroke-width="3"/>
    <rect x="125" y="148" width="218" height="264" rx="108" fill="#f5f3ed" stroke="#20221f" stroke-width="3"/>
    <path d="M174 280L234 220L294 280L234 340Z" fill="#ed512f" stroke="#20221f" stroke-width="3"/>
    <circle cx="234" cy="280" r="22" fill="#20221f"/>
    <path d="M222 280H246M234 268V292" stroke="#f5f3ed" stroke-width="5"/>
    <rect x="343" y="148" width="86" height="264" fill="#20221f"/>
    <path d="M364 190H408M364 211H395M364 350H408M364 371H392" stroke="#f5f3ed" stroke-width="6"/>
    <circle cx="386" cy="280" r="24" fill="#345dcc"/>
    <path d="M374 280H398M386 268V292" stroke="#f5f3ed" stroke-width="4"/>
    <path d="M294 280H343" stroke="#20221f" stroke-width="7"/>
    <path d="M429 224H516M429 336H492" stroke="#345dcc" stroke-width="8"/>
    <path d="M503 211L526 224L503 237ZM479 323L502 336L479 349Z" fill="#345dcc"/>
    <path d="M429 280H510" stroke="#ed512f" stroke-width="8"/>
    <rect x="510" y="255" width="18" height="50" fill="#ed512f" stroke="#20221f" stroke-width="2"/>
    <path d="M514 265L524 295M524 265L514 295" stroke="#f5f3ed" stroke-width="4"/>
    <rect x="572" y="119" width="146" height="322" fill="#345dcc" stroke="#20221f" stroke-width="3"/>
    <rect x="597" y="151" width="96" height="258" fill="#20221f"/>
    <g fill="none" stroke="#f5f3ed" stroke-width="3">
      <path d="M614 199C636 177 670 177 692 199"/>
      <path d="M614 235C636 213 670 213 692 235"/>
      <path d="M614 271C636 249 670 249 692 271"/>
    </g>
    <circle cx="653" cy="316" r="38" fill="#cbd3c0" stroke="#f5f3ed" stroke-width="3"/>
    <circle cx="653" cy="316" r="13" fill="#ed512f"/>
    <path d="M653 278V250M653 354V382M615 316H587M691 316H719" stroke="#f5f3ed" stroke-width="4"/>
    <path d="M472 175C521 111 550 111 597 175" fill="none" stroke="#20221f" stroke-width="4" stroke-dasharray="9 9"/>
    <path d="M583 157L603 172L579 181Z" fill="#20221f"/>
    <path d="M94 477H190M94 487H154M602 83H716M648 93H716" stroke="#20221f" stroke-width="2"/>
    <circle cx="109" cy="105" r="7" fill="#ed512f"/>
    <circle cx="718" cy="441" r="7" fill="#cbd3c0" stroke="#20221f"/>
  </svg>
  <figcaption><em>Original illustrative graphic: a released software boundary mediates an agent's service paths while a separate hardware watchdog design observes from outside. It is a conceptual control map, not NVIDIA's architecture, proof of containment or measured response time.</em></figcaption>
</figure>

## What is available now

[NVIDIA's launch announcement][s1] calls OpenShell “broadly available”. The stronger evidence is in the release trail. GitHub lists [OpenShell v0.1.2][s3] as the latest stable release, published at 03:58 UTC on 28 September, with packaged command-line, gateway, policy-prover, sandbox and supervisor artefacts. The same day's [technical guide][s2] describes the 0.1 series rather than a private preview.

The [support matrix][s4] says stable releases are intended for production use within the configurations it lists. Linux on x86-64 and Arm64 is supported. Apple Silicon Macs are supported through Docker Desktop. Windows on WSL2 with Docker Desktop is experimental. Docker, rootless Podman, Kubernetes and a MicroVM runtime are listed as supported compute paths, subject to their stated prerequisites.

The release is enough to begin an evaluation, but it does not establish that OpenShell will contain every agent or fit every host. The sandbox relies on specific Linux kernel facilities, including Landlock and seccomp behaviour, and on a supported runtime delivering the trusted sandbox component separately from the agent image. A team must verify that its real deployment matches those assumptions.

Index Us did not install or test OpenShell for this article. The conclusions here come from the published release artefacts, documentation and independent reporting.

## The useful control is outside the agent

OpenShell's architecture addresses a recurring weakness in agent systems: instructions inside the same process are not a dependable permission boundary. An agent can start a shell, generate code or launch a child process. If the only rule is another instruction in its prompt, the agent and the rule still share the same decision-making path.

NVIDIA's [technical description][s2] divides the system into a gateway, a supervisor paired with each sandbox, and the sandboxed workload. The workload has no network path except through the supervisor. The supervisor can inspect configured HTTP, GraphQL and Model Context Protocol traffic, allowing a read while denying a write against the same service. Filesystem and process restrictions sit at the kernel boundary.

Credential handling follows the same separation. The agent uses a placeholder while the supervisor substitutes the real credential only for an authorised endpoint. The receiving service still applies the permissions on that credential, so OpenShell is an additional control rather than a replacement for narrow API scopes.

By default, the policy workflow also keeps permission escalation outside the running agent. An agent can propose a new network or file rule after a denial, but the proposal remains pending for human review and the agent cannot approve its own request. The policy prover can then check whether the modelled permissions fit an operator-defined boundary.

“Modelled” is the important limit. Formal analysis can establish properties of the policy and routes represented in its model. It does not show that an omitted service, parser bug, runtime failure or incorrectly scoped external credential is harmless. Teams still need adversarial tests and failure handling around the enforcement layer.

## Sentry is a different procurement decision

NVIDIA documents the second component, Sentry, separately from the OpenShell package. It is described as an out-of-band watchdog running on BlueField-4 data processing units. The company says DOCA software lets it inspect requests and responses, verify agent identity, produce attested telemetry and quarantine an agent in milliseconds when it crosses a boundary.

Those are vendor claims for a reference system design. The announcement's availability section links to OpenShell software and skills. It does not link to a Sentry repository, binary, supported-product matrix, price, release date or reproducible test. It also contains NVIDIA's general warning that some described products and features may remain at different stages and be offered only if and when available.

Independent reports reinforce the need to keep this boundary visible. [CNBC][s5] described Sentry as part of a reference design that partners are expected to turn into market offerings. [WIRED][s6] reported that the hardware layer is intended for BlueField and noted that the extent of adoption across NVIDIA's long partner list was unclear. Neither report provides an independent containment test or validates the millisecond figure.

Hardware compatibility alone does not establish that a tested Sentry control has been deployed. A procurement brief should name the component, hardware generation, software version, enforcement path, supported agent runtime and delivery date. It should also state whether a partner product detects, blocks or merely records a boundary crossing.

## How to evaluate OpenShell without borrowing Sentry's claims

Start with one bounded workflow and a current stable OpenShell release. Give it a narrow credential and a policy that permits the required reads while denying writes. Then test the boundary through each route the agent can use: direct API calls, shell commands, generated code, child processes and any delegated sub-agent.

The evidence record should include:

- the OpenShell and runtime versions, host platform and kernel prerequisites;
- the policy, credential scopes and services reachable through the supervisor;
- allowed and denied requests, including the audit event for each decision;
- behaviour when the supervisor, gateway or upstream service is unavailable;
- the process for reviewing proposed permission changes; and
- any route that the policy prover does not model.

Run the same task without the expected service, with a write-capable credential behind a read-only rule, and with a child process attempting the denied action. These tests should establish whether the external control continues to hold when the workload changes tactics.

If a vendor later offers Sentry, test that separately. Ask what signal causes quarantine, where enforcement occurs, what happens to in-flight work, how false positives are recovered and whether the control still operates when the host or agent misreports its state. Require results on the proposed hardware and workload rather than accepting the reference design's response-time claim as a service-level guarantee.

## The decision now

OpenShell gives teams a concrete control to investigate: versioned software that places network, credential, filesystem and process policy outside an agent workload. This moves the boundary away from instructions that ask a model to observe its own limits.

The wider platform announcement goes further than the currently inspectable evidence. Sentry may become a useful independent enforcement layer, especially for fleets whose agents share infrastructure. Today, its published status is a reference system design tied to BlueField-4, not a generally downloadable control with public performance evidence.

Teams can evaluate OpenShell now on a non-production workflow. Sentry belongs in a separate procurement column until a specific implementation, supported configuration and independently checked result exist.

[s1]: https://www.globenewswire.com/news-release/2026/09/28/3369606/0/en/nvidia-launches-open-agent-safety-platform-to-secure-agents-from-testing-to-deployment.html
[s2]: https://developer.nvidia.com/blog/add-runtime-controls-to-ai-agents-with-nvidia-openshell/
[s3]: https://github.com/NVIDIA/OpenShell/releases/tag/v0.1.2
[s4]: https://docs.nvidia.com/openshell/latest/about/support-matrix
[s5]: https://www.cnbc.com/2026/09/28/nvidia-releases.html
[s6]: https://www.wired.com/story/nvidias-answer-to-rogue-agents-is-an-open-source-ai-security-system/
