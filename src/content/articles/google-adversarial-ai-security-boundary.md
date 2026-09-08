---
title: "Google’s adversarial-AI report shifts the security boundary beyond the model"
description: "Google reports faster agent-assisted attacks, hostile workspace instructions and stolen AI compute. Defenders need controls around the whole operating system."
publishedAt: 2026-09-09T00:10:13+10:00
updatedAt: 2026-09-09T00:10:13+10:00
author: Index Us Editorial
category: Analysis
tags: [security, agents, threat-intelligence, cloud, software-supply-chain]
featured: false
draft: false
readingMinutes: 8
keyTakeaways:
  - "Google’s report describes agent-assisted credential harvesting completed in under six hours, but does not establish fully autonomous attacks against targets in the wild."
  - "The observed risk crosses model, workspace, identity and infrastructure boundaries: hostile project files can steer tools, while stolen credentials and compute can sustain attacker workflows."
  - "Defenders should give each agent a bounded identity, constrain its tools and network paths, and retain activity records that connect prompts, actions, credentials and cloud changes."
sources:
  - label: "Google Threat Intelligence — report RSS"
    url: "https://feeds.feedburner.com/threatintelligence/pvexyqv7v0v"
  - label: "Google Threat Intelligence Group — From Prompting to Autonomy"
    url: "https://cloud.google.com/blog/topics/threat-intelligence/from-prompting-to-autonomy-the-evolution-of-adversarial-ai/"
  - label: "Sysdig Threat Research Team — LLMjacking evolved"
    url: "https://www.sysdig.com/blog/llmjacking-evolved-attackers-are-using-stolen-ai-compute-to-build-offensive-agentic-tools"
  - label: "NIST NCCoE — Agent identity and authorisation concept paper"
    url: "https://www.nccoe.nist.gov/sites/default/files/2026-02/accelerating-the-adoption-of-software-and-ai-agent-identity-and-authorization-concept-paper.pdf"
  - label: "NIST CAISI — AI agent security red-teaming findings"
    url: "https://www.nist.gov/blogs/caisi-research-blog/insights-ai-agent-security-large-scale-red-teaming-competition"
  - label: "SiliconANGLE — reporting on Google’s report"
    url: "https://siliconangle.com/2026/09/08/google-says-attackers-used-ai-agents-to-steal-credentials-in-under-six-hours/"
newsroom:
  runId: "20260908T140141Z"
  storyId: "google-adversarial-ai-security-boundary"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

Google’s latest threat-intelligence report describes a suspected financially motivated actor turning a compromised cloud resource into a credential-harvesting operation in less than six hours. Google does not claim that an AI system carried out the entire attack. Its evidence is narrower and more useful for defenders: agents compressed familiar tasks such as planning, scanning, troubleshooting and infrastructure rotation into one operating loop.

The [Google Threat Intelligence Group report](https://cloud.google.com/blog/topics/threat-intelligence/from-prompting-to-autonomy-the-evolution-of-adversarial-ai/) was published on 8 September 2026; Google’s [Threat Intelligence RSS feed](https://feeds.feedburner.com/threatintelligence/pvexyqv7v0v) timestamped it at 14:00 UTC. The report brings together Mandiant incident response, platform-abuse observations and threat-actor tracking from the second quarter. Its details are Google’s observations and assessments, not incidents independently reproduced by Index Us.

<figure style="margin: 2.5rem 0;">
  <svg viewBox="0 0 800 560" width="800" height="560" role="img" aria-labelledby="adversarial-ai-art-title adversarial-ai-art-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#f5f3ed;" preserveAspectRatio="xMidYMid meet">
    <title id="adversarial-ai-art-title">An agent workflow crossing code, identity and compute boundaries</title>
    <desc id="adversarial-ai-art-desc">A conceptual technical diagram. A vermilion instruction enters a cobalt agent loop, branches across three control gates and approaches a charcoal credential store and compute block.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <path d="M0 60H800M0 120H800M0 180H800M0 240H800M0 300H800M0 360H800M0 420H800M0 480H800M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560" stroke="#20221f" stroke-width="1" opacity=".16"/>
    <rect x="52" y="72" width="696" height="416" fill="none" stroke="#20221f"/>
    <path d="M224 72V488M536 72V488" stroke="#20221f" stroke-dasharray="5 8"/>
    <path d="M83 280H286" stroke="#ed512f" stroke-width="20"/>
    <path d="M252 251L290 280L252 309Z" fill="#ed512f" stroke="#20221f"/>
    <rect x="84" y="204" width="106" height="62" fill="#20221f"/>
    <path d="M100 222H174M100 237H154M100 252H165" stroke="#f5f3ed" stroke-width="4"/>
    <circle cx="398" cy="280" r="123" fill="#345dcc" stroke="#20221f" stroke-width="2"/>
    <circle cx="398" cy="280" r="76" fill="#f5f3ed" stroke="#20221f"/>
    <path d="M398 204A76 76 0 0 1 474 280" fill="none" stroke="#ed512f" stroke-width="15"/>
    <path d="M468 253L483 282L452 285Z" fill="#ed512f"/>
    <circle cx="398" cy="280" r="19" fill="#20221f"/>
    <path d="M517 238H595M517 322H595" stroke="#20221f" stroke-width="3"/>
    <circle cx="540" cy="238" r="13" fill="#cbd3c0" stroke="#20221f"/>
    <circle cx="569" cy="322" r="13" fill="#cbd3c0" stroke="#20221f"/>
    <rect x="595" y="183" width="112" height="92" fill="#20221f"/>
    <rect x="595" y="309" width="112" height="68" fill="#20221f"/>
    <circle cx="630" cy="222" r="15" fill="#f5f3ed"/>
    <path d="M630 237V252H680V230" stroke="#f5f3ed" stroke-width="4" fill="none"/>
    <circle cx="680" cy="220" r="11" fill="#ed512f"/>
    <path d="M614 331H689M614 349H667" stroke="#f5f3ed" stroke-width="7"/>
    <path d="M29 52H69M49 32V72M731 508H771M751 488V528M78 518H162M640 42H722" stroke="#20221f"/>
  </svg>
  <figcaption><em>Original illustrative graphic: a bounded agent workflow crossing code, identity and compute controls. It is a conceptual diagram, not measured incident data.</em></figcaption>
</figure>

For teams deploying coding, security or operations agents, model safety covers only part of the risk. Attach a safe model to an untrusted workspace, a broad service account and an unmonitored cloud project, and the resulting system can still be unsafe. Controls need to cover the model, its instructions, tools, identities, data paths and infrastructure.

## What changed: faster orchestration

Google says the under-six-hour campaign began after the attacker had already compromised an organisation’s cloud infrastructure. The actor then used an AI coding chatbot, a prompt and markdown instruction sets to build and run a multi-agent framework. According to the report, that framework managed vulnerability scanning, real-time troubleshooting, credential harvesting and IP rotation, and compromised thousands of third-party credentials.

Google separately describes an exposed command-and-control server that developed into a dashboard for organising and validating more than 23,800 harvested secrets, including cloud and AI-service API keys. Because the report presents the dashboard as a separate example, it should not be folded into the under-six-hour incident.

The report also sets a firm limit on what it establishes. Google describes attempts by a PRC-linked group to design an agentic penetration-testing framework, but says the activity remained at the build stage and that it disabled the associated assets. Later, GTIG says it has not observed threat actors deploying fully autonomous pipelines against targets in the wild.

Independent research points in the same direction without verifying Google’s cases. In June, the [Sysdig Threat Research Team](https://www.sysdig.com/blog/llmjacking-evolved-attackers-are-using-stolen-ai-compute-to-build-offensive-agentic-tools) observed an exposed Ollama server powering a staged offensive-security tool. Its targets were private practice ranges, the tool was still being developed and the operator’s ultimate intent remained uncertain. The observation supports the emergence of agentic offensive tooling, not a claim that autonomous attacks were conducted against public victims.

## A project directory is now part of the security boundary

One of Google’s clearest examples concerns DUSTMAKER, credential-stealing malware associated by GTIG with the group it tracks as UNC6780. Google says samples placed or modified files inside hidden workspace directories used by coding tools and IDEs, including `.claude`, `.vscode` and `.cursor`. Those files could create build or startup commands and instruct an assistant to execute scripts during ordinary developer work.

The same malware family also placed adversarial instructions in JavaScript comments. Google assesses that the wording was intended to trigger safety refusals in LLM-based security scanners so the malicious code underneath would be skipped. The attacker was targeting models in two roles: steering a tool towards attacker-selected work and discouraging a scanner from inspecting it.

That observation does not mean every coding agent or model scanner fails in this way. Google says the activity triggered Gemini safety responses. It does mean repository content, configuration and tool descriptions must remain untrusted inputs.

An agent deployment should make that boundary explicit. Workspace-specific instruction files need review and provenance. Startup hooks should not gain trust because they sit in a familiar directory. Security scanning should have a deterministic fallback when a model refuses or returns no finding; refusal is not a clean bill of health.

This is consistent with [NIST CAISI’s agent-hijacking research](https://www.nist.gov/blogs/caisi-research-blog/insights-ai-agent-security-large-scale-red-teaming-competition). Its March 2026 summary says a public competition produced more than 250,000 attack attempts from over 400 participants across 13 frontier models, with at least one successful hijacking attack found against every target model. Results varied substantially by model and did not track general model capability uniformly. General capability alone is therefore a poor proxy for the safety of a tool-using workflow.

## Identity and compute connect the AI stack to ordinary cloud risk

The report’s AI-specific details sit beside a familiar initial-access failure. In an April intrusion investigated by Mandiant, Google says an exposed GitHub personal access token opened a victim cloud environment. The attacker then provisioned unauthorised AI services and compute, created a service account with broad privileges, queried for further credentials and requested larger hardware quotas.

The incident shows AI infrastructure functioning as a target and a tool. Model API keys, prompts, source code, weights, service accounts, quota and GPU capacity need owners and controls like other sensitive assets. Monitoring model outputs alone would miss the access token, privilege changes and quota requests.

NIST’s draft [agent identity and authorisation concept paper](https://www.nccoe.nist.gov/sites/default/files/2026-02/accelerating-the-adoption-of-software-and-ai-agent-identity-and-authorization-concept-paper.pdf) supplies a practical frame. It proposes distinguishing agent identities from human identities, controlling delegated rights, linking actions to the non-human identity that performed them and retaining visibility into actions, data and outcomes. The paper is a project concept, not a finished implementation standard, but its control questions fit the incidents Google describes.

## Build controls around the whole operating loop

A generic instruction to “secure the AI” gives an operator little to act on. Connected controls across the full workflow can interrupt a fast attack and leave enough evidence to explain what happened afterwards.

1. **Give each agent its own bounded identity.** Avoid shared developer tokens. Scope credentials to a task, environment and short lifetime where the platform supports it. Record the human or service that delegated authority.
2. **Constrain tools as well as prompts.** Allow only required commands, repositories, destinations and cloud actions. Put destructive operations, identity changes and quota increases behind separate approval.
3. **Treat the workspace as an input surface.** Review instruction files, IDE settings, hooks, MCP servers and dependency changes. Surface hidden-file changes in code review and integrity monitoring.
4. **Keep deterministic security checks.** A model refusal, timeout or empty result should route suspicious content to another control, not silently skip it. Test scanners with adversarial instructions as well as known malicious code.
5. **Join model and infrastructure records.** Connect agent identity, prompt or task ID, tool calls, repository changes, token use, network destinations, service-account events and quota changes on one timeline. The purpose is accountable investigation, not indiscriminate retention of sensitive prompt content.
6. **Set machine-speed containment.** Alert on new public inference endpoints, unusual model traffic, mass secret access, rapid IP rotation, privilege escalation and unexpected accelerator provisioning. Predefine which credentials or services can be revoked automatically and which require a human decision.

These controls are proportionate to the evidence. Agents can connect steps, credentials can cross boundaries, and stolen infrastructure can finance or conceal continued activity, even without end-to-end autonomy.

Security teams do not need to wait for a fully autonomous attack before changing their controls. Google’s measured claim remains modest: one reported campaign completed agent-assisted credential harvesting in under six hours, while GTIG has not observed fully autonomous pipelines deployed against targets in the wild. That is enough reason to constrain the operating loop around the model before faster orchestration joins ordinary weaknesses into one path.

This analysis is based on public threat reporting, a draft NIST concept paper and published research. Index Us did not inspect the affected systems, reproduce the attacks, test the named tools or independently verify Google’s incident telemetry.
