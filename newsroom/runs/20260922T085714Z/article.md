---
title: "Meta Muse's local Mac flaw changes its permission-scope test"
description: "A researcher says local code can redirect Muse dictation and expose authentication material. Pause Mac expansion until Meta publishes a verified fix."
publishedAt: 2026-09-09T12:13:43+10:00
updatedAt: 2026-09-22T19:03:18+10:00
author: Index Us Editorial
category: Analysis
tags: [agents, security, privacy, meta, automation]
featured: false
draft: false
readingMinutes: 12
keyTakeaways:
  - "Patrick Wardle's public proof of concept says an unprivileged local process can redirect dictation traffic in the Muse macOS client."
  - "The attack requires code already running as the Mac user; the reviewed evidence does not establish remote compromise, in-the-wild exploitation or impact on every Muse client."
  - "The disclosure matters because local malware could potentially reuse the broader account and service access already granted to the agent."
  - "Pause new or expanded Muse use on Macs until Meta identifies a fixed version and the relevant client boundary can be verified."
sources:
  - label: "Patrick Wardle — not-a-mused disclosure and proof of concept"
    url: "https://github.com/pwardle/not-a-mused"
  - label: "GitHub — first public not-a-mused commit"
    url: "https://github.com/pwardle/not-a-mused/commit/c7db3802f80d186a6ef58f2038a1395606350f14"
  - label: "Ars Technica — Muse macOS zero-day report"
    url: "https://arstechnica.com/security/2026/09/muse-metas-extraordinarily-privileged-ai-assistant-has-a-serious-0-day/"
  - label: "The Register — Muse dictation flaw report"
    url: "https://www.theregister.com/ai-and-ml/2026/09/21/meta-muse-ai-app-flaw-lets-local-malware-redirect-dictation-traffic/5297980"
  - label: "iTnews — Australian report on the Muse disclosure"
    url: "https://www.itnews.com.au/news/security-researcher-says-dont-install-metas-muse-ai-assistant-629088"
  - label: "Meta — Introducing Muse"
    url: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/"
  - label: "Meta Research — How we built safety into Muse"
    url: "https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse"
  - label: "Meta — How we designed Muse"
    url: "https://introducing.muse.ai/"
  - label: "ASD ACSC and partners — Careful adoption of agentic AI services"
    url: "https://www.cyber.gov.au/business-government/secure-design/artificial-intelligence/careful-adoption-of-agentic-ai-services"
  - label: "TechCrunch — Meta debuts its Muse AI agent"
    url: "https://techcrunch.com/2026/09/08/meta-debuts-its-muse-ai-agent-will-consumers-trust-it/"
newsroom:
  runId: "20260922T085714Z"
  storyId: "meta-muse-permission-scope"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

Security researcher Patrick Wardle has published a proof of concept for a local vulnerability in Meta's Muse app for macOS. His [not-a-mused disclosure](https://github.com/pwardle/not-a-mused) says that an unprivileged process already running as the Mac user can redirect the endpoint used for Muse dictation. This could expose dictated prompts and authentication material or let the process abuse access already granted to the agent.

The finding does not describe a remote entry point into an otherwise uncompromised Mac. It starts with code already running locally. Its practical importance is the authority available after that foothold: Muse is designed to use connected services, work across a person's devices and act with permissions that the malicious process may not otherwise hold. Permission scope is therefore part of the immediate impact analysis for existing Mac users, rather than only a precaution before adoption.

**Update — 2026-09-22:** This article now covers Wardle's macOS-client disclosure, first published in a [GitHub commit at 14:04:46 UTC on 21 September](https://github.com/pwardle/not-a-mused/commit/c7db3802f80d186a6ef58f2038a1395606350f14). The original publication date and story identity are unchanged. The sources reviewed for this update did not identify a Meta advisory or fixed Muse version. Index Us did not run the proof of concept, inspect the client or verify the vulnerability independently.

<figure style="margin: 2.5rem 0;">
  <svg viewBox="0 0 800 560" width="800" height="560" role="img" aria-labelledby="muse-permission-art-title muse-permission-art-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#f5f3ed;" preserveAspectRatio="xMidYMid meet">
    <title id="muse-permission-art-title">A personal agent passing requests through a permission boundary</title>
    <desc id="muse-permission-art-desc">A cobalt agent sits inside a sage virtual-machine enclosure. Three paths for reading, writing and purchasing approach a charcoal Sentinel gate, while a vermilion user approval key opens only one bounded route to external services.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560" stroke="#20221f" stroke-width="1" opacity=".14"/>
    <path d="M52 75H748V485H52Z" fill="none" stroke="#20221f"/>
    <path d="M76 52V92M56 72H96M704 468V508M684 488H724" stroke="#20221f"/>
    <rect x="105" y="127" width="352" height="306" rx="153" fill="#cbd3c0" stroke="#20221f" stroke-width="2"/>
    <path d="M166 162H393M166 398H393" stroke="#20221f" stroke-width="1"/>
    <circle cx="279" cy="280" r="92" fill="#345dcc" stroke="#20221f" stroke-width="3"/>
    <path d="M279 212L338 246V314L279 348L220 314V246Z" fill="#f5f3ed" stroke="#20221f" stroke-width="2"/>
    <circle cx="279" cy="280" r="22" fill="#20221f"/>
    <path d="M371 221H500M371 280H500M371 339H500" stroke="#20221f" stroke-width="6"/>
    <circle cx="396" cy="221" r="10" fill="#f5f3ed" stroke="#20221f" stroke-width="2"/>
    <circle cx="396" cy="280" r="10" fill="#ed512f" stroke="#20221f" stroke-width="2"/>
    <circle cx="396" cy="339" r="10" fill="#f5f3ed" stroke="#20221f" stroke-width="2"/>
    <rect x="492" y="117" width="54" height="326" fill="#20221f"/>
    <rect x="492" y="264" width="54" height="32" fill="#f5f3ed" stroke="#20221f" stroke-width="2"/>
    <path d="M519 117V443" stroke="#f5f3ed" stroke-width="1" opacity=".35"/>
    <path d="M546 280H605" stroke="#ed512f" stroke-width="10"/>
    <path d="M581 261L608 280L581 299Z" fill="#ed512f" stroke="#20221f"/>
    <circle cx="519" cy="280" r="12" fill="#ed512f" stroke="#20221f" stroke-width="2"/>
    <path d="M519 240V206M519 354V320" stroke="#f5f3ed" stroke-width="4"/>
    <circle cx="519" cy="192" r="9" fill="#f5f3ed"/>
    <circle cx="519" cy="368" r="9" fill="#f5f3ed"/>
    <circle cx="506" cy="74" r="25" fill="#ed512f" stroke="#20221f" stroke-width="2"/>
    <path d="M506 99V142M494 119H518" stroke="#20221f" stroke-width="4"/>
    <rect x="620" y="168" width="105" height="70" fill="#e9dfcd" stroke="#20221f" stroke-width="2"/>
    <path d="M636 186H709M636 201H692M636 216H701" stroke="#20221f" stroke-width="4"/>
    <rect x="620" y="255" width="105" height="70" fill="#cbd3c0" stroke="#20221f" stroke-width="2"/>
    <path d="M637 272H708V308H637ZM653 259V278M691 259V278" stroke="#20221f" stroke-width="3" fill="none"/>
    <rect x="620" y="342" width="105" height="70" fill="#20221f" stroke="#20221f" stroke-width="2"/>
    <circle cx="654" cy="377" r="15" fill="#ed512f"/>
    <path d="M678 365H708M678 379H699M678 393H704" stroke="#f5f3ed" stroke-width="4"/>
    <path d="M546 221H604M546 339H604" stroke="#20221f" stroke-width="2" stroke-dasharray="5 7"/>
    <path d="M111 99H196M605 99H703M96 461H170M632 461H716" stroke="#20221f"/>
  </svg>
  <figcaption><em>Original illustrative graphic: a personal agent, an isolated workspace and a permission gate between proposed actions and connected services. It is a conceptual map, not an architecture audit or measured security result.</em></figcaption>
</figure>

## What the local disclosure changes

Wardle's repository identifies an undocumented Muse setting, `endo_voyager_dictation_endpoint`. He says an unprivileged local process can change it so dictated prompts go to an attacker-controlled endpoint. The potential outcomes he lists include captured dictation, prompt injection, theft of Muse authentication material and abuse of access the user has granted Muse.

The public repository is the researcher's disclosure, not a Meta confirmation or an independent reproduction. Index Us did not execute or audit its proof-of-concept code. The repository states the essential limit plainly: an attacker must already be able to run code as the local user. Nothing reviewed for this update establishes a drive-by remote attack, exploitation in the wild, impact on the iOS, Android or web clients, or a vulnerability across the cloud-side Muse Secure VM architecture.

Independent reporting documents the demonstration without removing those limits. [Ars Technica](https://arstechnica.com/security/2026/09/muse-metas-extraordinarily-privileged-ai-assistant-has-a-serious-0-day/) reports that Wardle demonstrated access to the token authenticating a Muse account after redirecting transcription traffic. [The Register](https://www.theregister.com/ai-and-ml/2026/09/21/meta-muse-ai-app-flaw-lets-local-malware-redirect-dictation-traffic/5297980) reports his description of the issue as a local zero-day and his argument that the agent can amplify the value of a local foothold. Both publications said Meta had not responded to their questions at publication time.

[iTnews](https://www.itnews.com.au/news/security-researcher-says-dont-install-metas-muse-ai-assistant-629088) reports a further Wardle demonstration involving a linked iPhone, including location and Bluetooth queries. This indicates potential cross-device reach. It does not establish that every connected device or permission can be used silently, or that the flaw has been exploited against other people.

A local foothold is already serious. The additional issue is whether that foothold can inherit separate authority over a microphone, camera, files, calendars, connected accounts or a linked phone. Operating systems use permission boundaries so compromising one process does not automatically transfer every authority a person has delegated elsewhere. An agent that concentrates access increases the consequence of a client-side trust failure.

Until Meta publishes an advisory that identifies affected and fixed versions, organisations should pause new Muse installations and avoid expanding permissions on existing Mac deployments. Existing users should reduce or disconnect service access where practical, review Muse activity and connected-account sessions, and follow any service-provider incident guidance. These are containment steps, not a claim that every account has been compromised.

A useful advisory would identify the vulnerable versions, explain whether unrelated local processes can still change the endpoint, state whether exposed account material is being revoked or rotated, and clarify which linked-device actions were reachable. Independent retesting of the repaired client would provide stronger evidence than a version number alone.

## What Meta says Muse can do

Muse combines a model, a persistent workspace, built-in connectors and a browser. Meta's [product-design account](https://introducing.muse.ai/) says the agent has a file system and terminal, can write code for a task and work on several jobs in the background. Users can inspect an activity log, memory files and approved permissions. Meta says the default browser experience allows ordinary browsing but stops for hard-to-undo actions such as sending an email or making a purchase.

Meta says people choose services one at a time and can separate read from write access where the service permits it. [TechCrunch reports](https://techcrunch.com/2026/09/08/meta-debuts-its-muse-ai-agent-will-consumers-trust-it/) that Muse can use built-in connectors, create a connection to a public API or use its browser when an API is unavailable. The agent may therefore process untrusted email, documents and web pages while holding authority to act elsewhere.

[TechCrunch's launch report](https://techcrunch.com/2026/09/08/meta-debuts-its-muse-ai-agent-will-consumers-trust-it/) independently described the main rollout surfaces and broad connector categories, but did not validate Meta's security architecture. Meta says Muse is rolling out in the United States rather than globally.

## Meta's security design remains vendor evidence

Meta's [security account](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse) describes a dedicated cloud virtual machine for each user. The main agent and its tools run inside a restricted runtime cell, while credential storage, built-in connector code and other security-sensitive services sit outside it.

Meta says a separate component called Sentinel is the sole permission authority for connector actions and network access. The agent proposes an action, then Sentinel allows it, denies it or asks the user. Approval requests appear through a structured interface outside the agent conversation, and grants can be limited to one action, a session, a task or a period. Meta also says credentials are inserted at the network boundary, leaving the agent to work with surrogate tokens instead of passwords and service tokens.

These boundaries address genuine risks, but the evidence is Meta's description of its own system. Wardle's disclosure concerns the Mac client and its configurable dictation route; it does not demonstrate an escape from the cloud runtime cell. The client issue still matters because it connects a user's local interaction to a Muse account with broader connected-service authority. Index Us did not inspect the implementation, run prompt-injection tests, examine private red-team results or verify that every connector enforces its stated scope.

The same evidence boundary applies to privacy. Meta says conversations and data stored in a Muse virtual machine are not shared with its advertising systems. Its security document separately says conversation and tool-use trajectories may be sanitised and used for model training unless the user opts out in settings. Meta says a later Confidential VM is intended to prevent the company from accessing the contents cryptographically. Users should not assume the launch service has that property.

## If a fixed client is verified, restart below maximum authority

The Australian Signals Directorate's Australian Cyber Security Centre, CISA, NSA and partner agencies recommend [careful adoption of agentic AI](https://www.cyber.gov.au/business-government/secure-design/artificial-intelligence/careful-adoption-of-agentic-ai-services). Their guidance says organisations should begin with low-risk, non-sensitive work and avoid broad or unrestricted access, especially to sensitive data or critical systems. It also identifies prompt injection, privilege creep, ambiguous goals and incomplete visibility into agent and tool actions as connected risks.

That advice applies even when a personal agent feels unlike enterprise software. Primary email can contain password resets, one-time codes, confidential attachments and other people's conversations. A calendar reveals locations and relationships. Health, home and payment services can turn a mistaken action into a physical, financial or privacy consequence. Connecting everything at launch makes it harder to identify which authority produced a result or contain a failure.

After a fixed client is identified and verified, a safer trial can grow in four stages.

1. **Use public information without an account connection.** Ask Muse to research a low-stakes topic or assemble options that a person will review. Check whether its browser record shows the pages used and whether it stops when information is ambiguous.
2. **Add one read-only, low-sensitivity source.** A test calendar or purpose-built email account is easier to reason about than a primary inbox. Define the task narrowly, then inspect the activity log for unrelated reads, unnecessary retention and unexpected follow-on work.
3. **Allow one bounded, reversible write action.** Create a draft event, a draft message or a shopping list rather than sending, publishing or buying. Confirm that the approval names the destination, action and scope, and that revoking the permission prevents another attempt.
4. **Treat high-impact services as a separate decision.** Payments, account settings, primary email, health data and smart-home controls should wait until lower-risk trials show consistent behaviour. Keep a human approval for every irreversible action even if the interface offers a broader grant.

This staged trial tests whether the complete service respects the authority a user intended to delegate. It is not a benchmark against another agent. Record the initial request, connected service, permission type, approval shown, actions taken, data touched, errors, intervention and final outcome. Repeat enough tasks to expose inconsistent behaviour rather than relying on one successful example.

## An approval needs enough context to be useful

An approval prompt helps only when a person can understand the consequence. “Continue?” is weaker than a request that names the recipient, amount, account, data being disclosed and whether the permission will persist. Frequent prompts can also train people to accept them without reading.

Meta says Muse uses structured approval cards and places friction around actions that are difficult to reverse. A trial should verify that claim where it matters: whether a drafted email needs another approval before sending, a changed purchase amount produces a new request, browser navigation can transmit personal data before the checkout prompt appears, and a task-scoped permission expires when the task changes.

The activity log should connect the user's request to the agent's plan, service calls, approvals, errors and result. It also needs enough detail to distinguish a mistaken model decision from a permission configuration or third-party service failure. Otherwise, it is only a history screen.

## What would justify wider use

Muse puts a persistent, tool-using agent in a mainstream consumer setting. Meta's published architecture addresses isolation, credential exposure and delegated authority. Its documentation also acknowledges that the agent can make mistakes and encounter attacks through the data it reads.

Evidence for wider trust starts with transparent resolution of this client issue: affected and fixed versions, credential handling, notification to exposed users and independent retesting. Wider deployment would also need broader independent security testing, connector-specific scope documentation, reliability results across ordinary tasks and external review of the promised Confidential VM. Users should be able to export, inspect and delete relevant data, and confirm that a training opt-out behaves as described.

For now, the permission ladder should stop on affected Mac clients until a repair is published and verified. After that, each new permission should still be earned through bounded work that remains visible, reviewable and reversible.

This analysis is based on public documentation, repository metadata and independent reporting. Index Us did not use Muse, connect an account, run Wardle's proof of concept, inspect the macOS app or independently verify Meta's capability, privacy, reliability or remediation claims.
