---
title: "A2ABreak maps security gaps beyond A2A’s mandatory authorisation"
description: "A new protocol analysis argues that authenticated A2A calls still need explicit context ownership, delegation lineage and capability assurance."
publishedAt: 2026-09-12T12:24:00+10:00
updatedAt: 2026-09-12T12:24:00+10:00
author: Index Us Editorial
category: Analysis
tags: [agents, security, A2A, protocols, authorisation]
featured: false
draft: false
readingMinutes: 9
keyTakeaways:
  - "The current A2A specification requires authorisation checks on every protocol operation, but leaves each agent to define the access model that gives a context identifier ownership meaning."
  - "A2ABreak reports 11 specification-level findings; its released formal models cover three representative gaps, not deployed A2A services."
  - "Treat context admission, delegation provenance and capability assurance as explicit application controls, then test both attacks and ordinary tasks on the implementation you plan to operate."
sources:
  - label: "arXiv — cs.CR updates RSS"
    url: "https://rss.arxiv.org/rss/cs.CR"
  - label: "Lotfi and colleagues — A2ABreak paper"
    url: "https://arxiv.org/html/2609.10871"
  - label: "A2ABreak — released artifact repository"
    url: "https://github.com/arlotfi79/A2ABreak"
  - label: "A2ABreak — formal verification artifacts"
    url: "https://github.com/arlotfi79/A2ABreak/tree/main/formal_verification"
  - label: "A2A Project — specification at f63dbb482719"
    url: "https://github.com/a2aproject/A2A/blob/f63dbb48271940ca5bd421f87e27e4d6ec002795/docs/specification.md"
  - label: "A2A Project — protocol data model at f63dbb482719"
    url: "https://github.com/a2aproject/A2A/blob/f63dbb48271940ca5bd421f87e27e4d6ec002795/specification/a2a.proto"
  - label: "A2A Project — specification commit history"
    url: "https://github.com/a2aproject/A2A/commits/main/docs/specification.md"
  - label: "Li and colleagues — A2ASecBench"
    url: "https://safo-lab.github.io/A2ASecBench/"
newsroom:
  runId: "20260912T021235Z"
  storyId: "a2a-protocol-security-invariants"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

A2ABreak reports 11 security findings in the Agent2Agent protocol, but its most useful contribution is narrower than that headline number. Authentication and authorisation do not by themselves define who owns shared context, whose identity must survive a delegation chain or whether a signed capability claim is true.

The [arXiv cryptography and security feed](https://rss.arxiv.org/rss/cs.CR) announced [A2ABreak](https://arxiv.org/html/2609.10871) at 04:00 UTC on 11 September 2026. The paper uses an LLM-assisted pipeline to turn the A2A specification into a finite-state machine, then searches that model for attacks that remain possible when participants comply with the written protocol. Its authors report 11 findings across discovery, task initiation, execution and interruption.

That result does not establish that every A2A implementation is vulnerable. The paper did not test production deployments or audit a sample of servers and clients. Its central contribution is a set of claims about missing protocol invariants: relationships that a secure implementation may enforce, but which the specification does not encode in a uniform, interoperable form.

<figure style="margin: 2.5rem 0;">
  <svg viewBox="0 0 800 560" width="800" height="560" role="img" aria-labelledby="a2a-trust-gates-art-title a2a-trust-gates-art-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#f5f3ed;" preserveAspectRatio="xMidYMid meet">
    <title id="a2a-trust-gates-art-title">An agent delegation chain crossing three explicit trust gates</title>
    <desc id="a2a-trust-gates-art-desc">Four abstract organisation nodes share a continuous cobalt transport line. Between them, three different gates represent context ownership, delegation lineage and capability assurance. Open vermilion tokens show trust information that point-to-point authentication alone does not supply, while bounded sage tokens show controls made explicit by the application.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <g stroke="#20221f" stroke-width="1" opacity=".13">
      <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800"/>
      <path d="M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560"/>
    </g>
    <rect x="42" y="54" width="716" height="452" fill="none" stroke="#20221f"/>
    <path d="M62 34H102M82 14V54M698 526H738M718 506V546" stroke="#20221f"/>
    <path d="M92 280H708" stroke="#345dcc" stroke-width="16"/>
    <path d="M92 280H708" stroke="#f5f3ed" stroke-width="2" stroke-dasharray="10 10"/>
    <g stroke="#20221f" stroke-width="3">
      <rect x="66" y="226" width="76" height="108" rx="38" fill="#20221f"/>
      <circle cx="104" cy="280" r="12" fill="#f5f3ed"/>
      <rect x="260" y="218" width="82" height="124" fill="#cbd3c0"/>
      <path d="M280 245H322V315H280Z" fill="#f5f3ed"/>
      <rect x="466" y="218" width="82" height="124" transform="rotate(45 507 280)" fill="#ed512f"/>
      <circle cx="507" cy="280" r="25" fill="#f5f3ed"/>
      <path d="M685 225L735 280L685 335L635 280Z" fill="#20221f"/>
      <circle cx="685" cy="280" r="14" fill="#cbd3c0"/>
    </g>
    <g stroke="#20221f" stroke-width="3">
      <rect x="176" y="154" width="58" height="252" fill="#f5f3ed"/>
      <circle cx="205" cy="280" r="31" fill="#cbd3c0"/>
      <path d="M205 264V296M189 280H221"/>
      <rect x="378" y="154" width="58" height="252" fill="#f5f3ed"/>
      <path d="M391 280L407 264L423 280L407 296Z" fill="#cbd3c0"/>
      <path d="M391 280H375M423 280H439"/>
      <rect x="580" y="154" width="58" height="252" fill="#f5f3ed"/>
      <path d="M609 253L617 270L636 272L622 285L626 304L609 295L592 304L596 285L582 272L601 270Z" fill="#cbd3c0"/>
    </g>
    <g fill="none" stroke="#ed512f" stroke-width="4" stroke-dasharray="7 7">
      <circle cx="205" cy="112" r="25"/>
      <circle cx="407" cy="112" r="25"/>
      <circle cx="609" cy="112" r="25"/>
    </g>
    <g fill="#cbd3c0" stroke="#20221f" stroke-width="2">
      <path d="M190 452L205 437L220 452L205 467Z"/>
      <path d="M392 452L407 437L422 452L407 467Z"/>
      <path d="M594 452L609 437L624 452L609 467Z"/>
    </g>
    <path d="M72 461H140M72 470H121M658 88H730M680 97H730" stroke="#20221f" stroke-width="2"/>
  </svg>
  <figcaption><em>Original illustrative graphic: an authenticated transport path crosses separate gates for context ownership, delegation lineage and capability assurance. It is a conceptual security model, not an A2A architecture diagram or evidence of a measured attack.</em></figcaption>
</figure>

## The current specification already requires authorisation

Any assessment has to start with what the A2A specification says now. At the current public specification revision inspected for this article, commit [`f63dbb482719`](https://github.com/a2aproject/A2A/blob/f63dbb48271940ca5bd421f87e27e4d6ec002795/docs/specification.md), section 13.1 requires servers to perform authorisation checks on every protocol-operation request. It also requires results to stay within the authenticated caller’s authorised boundaries, including when a request omits a `contextId` filter. Task retrieval, cancellation, subscription and notification configuration receive specific access-control requirements.

The requirement is stronger than merely authenticating a bearer token and accepting any identifier the caller supplies. A2ABreak should not be read as evidence that compliant servers can ignore authorisation.

The remaining question is what the authorisation model must contain. The specification says each agent defines those boundaries. A `contextId` is an optional grouping value rather than a resource with a protocol-defined owner. Servers may accept a client-provided identifier; clients may provide one without a `taskId` to start a new task in an existing conversational context; and an agent may use the shared identifier to retain history or model context. The data model does not supply a context creator, owner or access token.

A2ABreak’s claim is therefore not that section 13.1 is absent. It is that the general authorisation requirement does not define the relationship a server should check before admitting a new task into an existing context. A careful implementation can treat context admission as an authorised resource operation and reject a caller that is outside the context’s tenant, project or principal boundary. Another implementation can apply task-level checks after accepting the new task, while still lacking a consistent context-ownership rule. The protocol leaves that distinction to the agent’s access model.

The project’s [specification history](https://github.com/a2aproject/A2A/commits/main/docs/specification.md) matters here because the document is changing. It added clarification of in-task authorisation scope in July and received further documentation fixes through the pinned 28 August commit. The visible A2ABreak paper refers to A2A v1.0 and the live specification, but does not identify an immutable specification commit. This article pins its comparison so later changes can be separated from the text reviewed today.

## Three gaps show where application policy begins

Three findings show where the protocol leaves trust policy to the application.

First, who may enter a context? The paper’s cross-client scenario assumes an authenticated caller has obtained another context identifier and the server uses that context to retain state. The attack does not retrieve the victim’s protected task directly. It creates a new task inside the shared context, allowing the response or later state to be influenced by history belonging to a different caller. The released [formal-verification notes](https://github.com/arlotfi79/A2ABreak/tree/main/formal_verification) say their bounded Alloy model produces a counterexample while the section 13.1 task rule still holds, then finds no counterexample within the tested scope after adding a context-owner relation.

Making identifiers hard to guess is not sufficient. Bind every context to an explicit principal, tenant, project or authorised set; check that binding before context state is read or a new task is admitted; and decide how delegated callers inherit, narrow or lose that right. Opaque identifiers can reduce accidental discovery, but they are not an access-control decision.

Second, whose authority survives a chain? A2A establishes identity at each transport hop and explicitly allows an agent handling a task to pass an authorisation requirement back through another A2A agent. The current specification warns that in-band credentials can be exposed to every agent in such a chain and recommends binding credentials to the agent that originated the request. It also states that the scope and representation of the authorisation decision are defined by the implementation, issuer or an extension.

A2ABreak argues that no standard principal or delegation-lineage object connects those hops. Its TLA+ artifacts model provenance propagation and credential audience-binding as separate protections: knowing the origin does not itself stop an intermediary using a bearer credential, and binding a credential without reliable origin information does not reconstruct the delegation chain. A deployment that permits multi-hop authorisation should carry an auditable origin, chain and requested scope, then issue credentials for a narrow audience and operation. Those are proposed controls, not current A2A guarantees.

Third, what does an advertised skill prove? An A2A Agent Card can be signed, and its `AgentSkill` fields describe names, tags, examples and supported media. With a trusted verification key, a signature can establish that a particular publisher issued an unchanged card. It does not demonstrate that the publisher can perform a claimed skill safely or well. The repository’s second Alloy model expresses that distinction: signing the assertion and attesting the underlying capability are different properties.

Teams still need a trust source for agent selection. That might combine a curated registry, organisation identity, contractual assurance, capability-specific tests, versioned evidence and limits on the data released before a remote agent proves useful. A cryptographically authentic advertisement remains an advertisement.

## The formal result is useful but bounded

The method also needs scrutiny. The authors say their pipeline extracted 929 verified statements, reduced them to a finite-state machine with 37 states and 76 transitions, then ran adversarial checks over candidate vulnerabilities. A zero-shot model produced nine candidates across two runs, all rejected because existing normative rules prevented them.

Formal grounding did not remove false positives. Across five analysis runs, the paper says its discovery stage produced 17 unique candidates. Its adversarial stage accepted 16; expert manual review then marked one as a duplicate and rejected four more because existing rules prevented them. The resulting 11 non-duplicate findings produce the reported 73.3 per cent precision and 84.6 per cent F1 score. For the state-machine extraction step, the authors used TCP from PSMBench as a proxy because there is no equivalent A2A ground truth, recovering all 11 states and 19 of 20 transitions while also producing six extra transitions.

The [released repository](https://github.com/arlotfi79/A2ABreak) supports inspection beyond the paper. It contains the curated 11-finding file, pipeline outputs and source, plus machine-generated receipts for Alloy 6 and TLA+ checks. The formal folder models only the three findings discussed in detail: context ownership, skill attestation and multi-hop identity loss. These bounded models can show a counterexample under the encoded assumptions and show that a proposed relation closes it within the search scope. They do not measure exploit frequency, implementation quality or the behaviour of an unmodelled production system. Index Us did not rerun the pipeline or the formal tools.

Independent work supplies implementation context. The ICLR 2026 [A2ASecBench](https://safo-lab.github.io/A2ASecBench/) paper defines six attack families and evaluates protocol-aware attacks and matched benign tasks on official A2A demonstration systems across travel, healthcare and finance. Its attacks include Agent Card spoofing, capability cloaking, unsafe peer-supplied resources, artifact-triggered script injection, cyclic delegation and retained half-open tasks. That benchmark does not confirm A2ABreak’s 11 specification findings. It does reinforce the practical need to measure security and ordinary usefulness together instead of treating a protocol checklist as an end-to-end result.

## Turn protocol invariants into acceptance tests

An A2A deployment decision should begin with the existing mandatory controls, then make the unspecified relationships testable.

1. **Context admission:** create two authorised users or tenants, obtain a valid context under one and attempt to continue it from the other. Check the database lookup, model-context assembly, logs and response for leakage or contamination. Repeat with a valid task ID paired with the wrong context and with a context-only request.
2. **Delegation lineage:** build a three-agent chain and inspect what the final agent, credential issuer and user approval surface can see. Change the requested scope at the middle hop. Confirm that the origin, audience, depth and approved operation are preserved and that a credential cannot be replayed elsewhere.
3. **Capability assurance:** compare the signed Agent Card with a controlled set of benign and adversarial tasks. Confirm which registry or organisation identity is trusted, what the signature authenticates and what evidence supports each high-risk capability claim.
4. **Lifecycle controls:** test revocation during a long stream, reconnection during chunked artifacts, concurrent task updates, webhook ownership and abandoned interrupted tasks. These cover other A2ABreak findings without assuming that the paper has reproduced them on your stack.
5. **Compatibility:** run matched ordinary tasks and record completion, latency, false rejections and operator burden. A protection that blocks legitimate collaboration by default can move risk rather than resolve it.

Use section 13.1 as the floor for an A2A deployment. Make context ownership, delegated identity, credential scope and capability evidence explicit in the application’s security model, then retain tests that prove those relationships for each implementation and version you deploy. The paper provides a useful test agenda; it does not establish that A2A should be avoided or that every compliant implementation shares the reported gaps.

This analysis is based on the public A2A specification pinned to commit `f63dbb482719`, the A2ABreak paper and released artifacts, and independent A2ASecBench material. The public A2ABreak text reviewed here is the arXiv v1 preprint and has not been independently replicated in the sources reviewed here. Index Us did not test an A2A deployment, reproduce its 11 findings or rerun the released formal models.
