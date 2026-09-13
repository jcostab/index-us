---
title: "Anthropic commits to embedded evaluators as OpenAI says it will follow"
description: "Anthropic has promised outside evaluators ongoing internal access and publication rights. The test is whether access, independence and redactions become inspectable practice."
publishedAt: 2026-09-13T02:37:49Z
updatedAt: 2026-09-13T02:37:49Z
author: Index Us Editorial
category: Analysis
tags: [anthropic, openai, evaluations, governance, ai-safety]
featured: false
draft: false
readingMinutes: 11
keyTakeaways:
  - "Anthropic says it will give an external review team ongoing access comparable to internal risk assessors, including workspaces, tools and employee conversations, while allowing the reviewers to publish findings without Anthropic editorial control."
  - "Sam Altman says OpenAI will adopt independent evaluators with employee-like access, but neither company has yet published a completed engagement, named review team, start date or first report under the new commitment."
  - "Operators and procurers should ask for the evaluator’s mandate, actual access, exclusions, conflicts, publication rights, redaction record and evidence that findings changed decisions."
sources:
  - label: "Dario Amodei — We Must Pace the Frontier"
    url: "https://darioamodei.com/post/we-must-pace-the-frontier"
  - label: "Dario Amodei on X — Anthropic’s evaluator commitment"
    url: "https://x.com/DarioAmodei/status/2098773920774074715"
  - label: "Sam Altman on X — OpenAI will do the same"
    url: "https://x.com/sama/status/2098811563415150910"
  - label: "X documentation — Snowflake identifiers"
    url: "https://docs.x.com/fundamentals/x-ids"
  - label: "Associated Press — Anthropic CEO calls for safety measures to catch up"
    url: "https://apnews.com/article/anthropic-ai-dario-amodei-d59552edcb27892d8ee4d98a48397706"
  - label: "Axios — Anthropic and OpenAI CEOs call for slowdown"
    url: "https://www.axios.com/2026/09/12/anthropic-ai-amodei-pacing"
  - label: "METR — How independent researchers could investigate AI incidents"
    url: "https://metr.org/blog/2026-07-28-investigating-ai-propensities-after-incidents/"
  - label: "METR — Frontier Risk Report pilot process"
    url: "https://metr.org/blog/2026-05-19-frontier-risk-report/"
  - label: "OpenAI — A shared playbook for trustworthy third-party evaluations"
    url: "https://openai.com/index/trustworthy-third-party-evaluations-foundations/"
  - label: "Anthropic — An alignment assessment of recent cybersecurity incidents"
    url: "https://www.anthropic.com/research/alignment-assessment-cybersecurity-incidents"
newsroom:
  runId: "20260913T020228Z"
  storyId: "anthropic-embedded-evaluator-access"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

Anthropic says an outside review team will receive ongoing, employee-like access to its safety work, be able to report incidents and publish findings without Anthropic controlling the conclusion. Sam Altman then said OpenAI would adopt the same basic idea. The promise is specific enough to check without accepting Anthropic’s wider forecasts about where AI is heading.

[METR’s May Frontier Risk Report](https://metr.org/blog/2026-05-19-frontier-risk-report/) says third-party evaluations of frontier AI have largely focused on individual models before public deployment. The new commitment is broader. It is meant to let an independent team inspect whether safety practices are followed across training, deployment and operations, rather than only testing a finished model presented for review.

That programme is not operating in public view yet. Anthropic says it intends to invite a team in the near future. The announcement does not name that team, supply a start date or publish the contract. Altman’s response gives even less implementation detail. Buyers, operators and policymakers now need evidence that embedded review is independent, adequately informed and able to tell the public what it found.

<figure>
  <svg viewBox="0 0 800 560" width="800" role="img" aria-labelledby="embedded-evaluator-art-title embedded-evaluator-art-desc" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <title id="embedded-evaluator-art-title">An external reviewer entering a layered system and publishing through a bounded redaction channel</title>
    <desc id="embedded-evaluator-art-desc">A cobalt reviewer path enters a framed, layered charcoal and sage system through a narrow access gate. A separate path leaves the reviewer for an off-white public report, crossing a marked vermilion redaction boundary that remains visible rather than disappearing. Fine grids and registration marks frame the conceptual arrangement.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <g stroke="#20221f" stroke-width="1" opacity=".13">
      <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800"/>
      <path d="M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560"/>
    </g>
    <rect x="44" y="50" width="712" height="460" fill="none" stroke="#20221f"/>
    <path d="M26 74H66M46 54V94M734 466H774M754 446V486" stroke="#20221f" stroke-width="2"/>
    <path d="M84 132H160M640 452H716" stroke="#20221f" stroke-width="2"/>
    <g stroke="#20221f" stroke-width="3">
      <path d="M112 308L170 250L228 308L170 366Z" fill="#345dcc"/>
      <circle cx="170" cy="308" r="20" fill="#f5f3ed"/>
      <path d="M170 286V330M148 308H192" stroke="#345dcc" stroke-width="7"/>
      <path d="M228 308H310" fill="none" stroke="#345dcc" stroke-width="12"/>
      <rect x="310" y="228" width="42" height="160" fill="#ed512f"/>
      <path d="M323 254H339M323 278H339M323 302H339M323 326H339M323 350H339" stroke="#f5f3ed" stroke-width="5"/>
      <path d="M352 308H424" fill="none" stroke="#345dcc" stroke-width="12"/>
      <rect x="424" y="166" width="250" height="284" fill="#e9dfcd"/>
      <rect x="456" y="198" width="186" height="54" fill="#cbd3c0"/>
      <rect x="456" y="276" width="186" height="54" fill="#f5f3ed"/>
      <rect x="456" y="354" width="186" height="54" fill="#20221f"/>
      <path d="M476 225H616M476 303H596M476 381H616" stroke="#20221f" stroke-width="6"/>
      <path d="M170 250V134H452" fill="none" stroke="#345dcc" stroke-width="7"/>
      <path d="M452 134L432 120V148Z" fill="#345dcc"/>
      <rect x="452" y="88" width="220" height="92" fill="#f5f3ed"/>
      <path d="M480 112H644M480 132H620M480 152H635" stroke="#20221f" stroke-width="5"/>
    </g>
    <path d="M384 104V180" stroke="#ed512f" stroke-width="5" stroke-dasharray="9 8"/>
    <path d="M366 118L384 99L402 118" fill="none" stroke="#ed512f" stroke-width="4"/>
    <circle cx="384" cy="134" r="26" fill="#f5f3ed" stroke="#ed512f" stroke-width="4"/>
    <path d="M372 134H396" stroke="#ed512f" stroke-width="5"/>
    <path d="M690 196V420" stroke="#20221f" stroke-width="2" stroke-dasharray="6 8"/>
    <circle cx="690" cy="225" r="8" fill="#ed512f"/>
    <circle cx="690" cy="303" r="8" fill="#345dcc"/>
    <circle cx="690" cy="381" r="8" fill="#cbd3c0"/>
  </svg>
  <figcaption><em>Original illustrative graphic: an external reviewer receives a bounded path into a layered system and a separate publication channel with a visible redaction boundary. It is a governance concept, not either company’s architecture, an appointed evaluator or evidence that the commitment has been implemented.</em></figcaption>
</figure>

## The commitment is more specific than a call for “external testing”

Dario Amodei announced the essay in [an X post](https://x.com/DarioAmodei/status/2098773920774074715) on 12 September. X documents that its Snowflake identifiers encode an object’s creation timestamp; decoding the status ID places the post at 14:01:10 UTC. At 16:30:45 UTC, [Sam Altman responded](https://x.com/sama/status/2098811563415150910) that OpenAI would also use independent evaluators with employee-like access and would provide more detail later. The public X embed confirms the authors and wording; the exact times come from the identifiers’ timestamp field.

In [Amodei’s full proposal](https://darioamodei.com/post/we-must-pace-the-frontier), Anthropic commits unilaterally to the embedded-evaluator step while asking other frontier developers to match it. The intended remit covers adherence to safety practices and commitments, incident reporting, completed models and the processes used to train them.

Anthropic also describes the access it intends to provide. The external team would have office desks, badges and company laptops. Its workspaces, tools and permissions would be mostly comparable to those of internal risk-assessment teams, with live access to employees. Exceptions could apply where law, contracts or the private information of customers and partners require them.

Publication rights are part of the proposed arrangement. Anthropic says reviewers should be able to publish significant findings about risks, incidents, practices and the access they did or did not receive, without the company exercising editorial control. Anthropic reserves a narrow redaction power for security-sensitive, legally privileged, commercially sensitive or third-party confidential material, but says unfavourable findings alone would not justify a redaction. Reviewers would be allowed to state when a redaction materially affected their conclusions.

Those details are more concrete than a generic promise to consult experts, but they remain intended terms. The essay does not say that a contract has been signed, that credentials have been issued or that an evaluator has begun continuous work. It mentions METR as an example of the kind of organisation that might perform the role, not as a confirmed appointment.

[AP reported](https://apnews.com/article/anthropic-ai-dario-amodei-d59552edcb27892d8ee4d98a48397706) the physical-access details and Altman’s response on the same day. [Axios independently reported](https://www.axios.com/2026/09/12/anthropic-ai-amodei-pacing) that Anthropic was committing to the evaluator measure and that OpenAI would follow. Neither report supplies evidence that the arrangements are already in operation.

Anthropic has separately signed a time-limited agreement with METR. In a [9 September alignment assessment](https://www.anthropic.com/research/alignment-assessment-cybersecurity-incidents), Anthropic said METR would independently investigate four cybersecurity incidents under an initial eight-week agreement, extendable by mutual agreement. It gives METR wide-ranging access to transcripts beyond the incident window and to employees permitted to share confidential information.

That agreement is evidence of substantial outside access for a defined incident investigation. Anthropic does not identify it as the permanent embedded-review role promised on 12 September, and the checked sources still do not name a team appointed to that broader role.

## Ongoing access changes what can be examined

A one-off model evaluation can answer a narrow question well. It can test whether a specific configuration completes a set of tasks, whether a safeguard resists a defined attack or whether a monitor catches a known behaviour. It cannot, by itself, show that a developer followed the same safety process across later training runs, changed a deployment after an incident or disclosed all material exceptions.

An embedded team could follow those joins over time. It could compare written commitments with internal decisions, inspect the configuration that produced a result, talk with people who ran an evaluation and revisit an issue after remediation. That continuity is the main practical change in the proposal.

Access still has to match the question. [METR’s public outline for independent incident investigations](https://metr.org/blog/2026-07-28-investigating-ai-propensities-after-incidents/) says a thorough investigation may require the relevant models, full transcripts or reproducible environments, employee interviews, sufficient inference budget and time, and sometimes ways to examine whether similar behaviour appeared during training. More limited access may answer a subset of questions but cannot support the same assurance.

METR’s [Frontier Risk Report](https://metr.org/blog/2026-05-19-frontier-risk-report/) also shows why the engagement terms need their own evidence. Its cross-company pilot recorded whether evaluators had adequate technical access and resources, disclosed conflicts, retained methodological and editorial autonomy, and made redaction authority visible. METR reported both strengths and limitations in its process, including that it had not applied a formal personnel conflict-of-interest policy at the start of that pilot.

METR has not been appointed to Anthropic’s new role in the checked sources, and one evaluator design will not suit every risk. Its published process does provide a more useful standard for reading future reports: independence depends on operating conditions, not a label supplied by the company being assessed.

## OpenAI’s existing evaluations are narrower evidence

OpenAI already works with outside evaluators. In its [May evaluation playbook](https://openai.com/index/trustworthy-third-party-evaluations-foundations/), the company said METR and Apollo had received reasoning traces and intermediate artefacts where needed for work on GPT-5-era systems. It argued that trustworthy reports should identify the claim being tested, the system and harness, the resource budget, elicitation methods and validity checks.

Those existing relationships provide a precedent for Altman’s response, but they do not show that the new commitment has been implemented. Employee-like, ongoing access across safety practice, incidents and training processes is broader than access to a model and selected artefacts for a defined evaluation. OpenAI has not yet published how closely its planned arrangement will match Anthropic’s access, publication or redaction terms.

“Third-party evaluated” can describe very different arrangements. An evaluator may receive a public API, an unreleased checkpoint, a specialist harness, internal documentation, interviews or access to operational systems. The resulting report is only as broad as the evidence and mandate behind it.

## A checklist for evaluating the evaluators

Procurement and governance teams do not need access to a frontier lab to ask better questions about an external-safety-review claim. The same questions apply when a vendor says a model, agent platform or deployment process has been independently assessed.

1. **Who selected and pays the evaluator?** Name the legal entity and the people responsible for the work. Ask about contingent fees, other commercial relationships, funding concentration, personal conflicts and recusal rules.
2. **What is the mandate?** Define whether the work covers model capability, safeguards, training processes, deployment controls, internal use, incident response or compliance with a published policy. A report about one of these should not be used as assurance about all of them.
3. **What access was actually used?** Record model versions, safeguards, tools, workspaces, logs, intermediate states, interviews, compute and time. List requested access that was refused or unavailable, along with the effect on the conclusion.
4. **Can the evaluator choose methods and follow evidence?** A company can set legitimate security boundaries without choosing the tests, excluding inconvenient incidents or narrowing the audience after seeing the result. The report should explain who controlled scope and methodology.
5. **Who controls publication?** Establish the evaluator’s right to publish findings, the review timetable and any company right to delay or redact. Redactions need defined categories, a visible summary and a way for the evaluator to say when missing material changed what it could support.
6. **Where do incidents go?** Specify which events must be reported, how quickly the evaluator can reach the board or another oversight body, who preserves evidence and how affected third parties are notified. A route that ends with the team being evaluated is not independent escalation.
7. **What changed because of the review?** Look for dated reports, remediation decisions, unresolved disagreements and later verification. A badge, laptop or contract shows access was provisioned; it does not show that findings influenced a launch or corrected a control.

These questions separate useful assurance from borrowed credibility. They also make proportional review possible. A limited API evaluation may be suitable for a limited capability claim. A claim about organisation-wide safety practice needs wider and more durable access.

## The next evidence should be operational

Anthropic has stated an unusually concrete intended access model and given the evaluator public reporting rights. OpenAI’s rapid agreement could turn the idea into a competitive expectation across frontier developers.

Implementation is now the test. Useful evidence would include the appointed team’s identity, engagement date, mandate, conflict policy, access categories and exclusions, publication and redaction terms, incident-escalation route, and the evaluator’s own account of what it could inspect. The first public report should state the period covered and distinguish verified practice from company representations.

Until then, the development is a commitment by Anthropic and a public promise from OpenAI’s chief executive. It is not proof of continuous oversight, a completed independent audit or safer models. The practical advance is that both promises now give outsiders something precise enough to verify.

This analysis is based on public statements, documentation and independent reporting. Index Us did not inspect either company’s internal systems, contracts or evaluator access, and did not conduct an evaluation of Anthropic or OpenAI.
