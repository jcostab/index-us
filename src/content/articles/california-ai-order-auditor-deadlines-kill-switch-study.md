---
title: "California's AI order speeds up auditor rules, not a kill-switch mandate"
description: "California has accelerated two AI-auditor programmes and ordered recommendations on frontier-model shutdown controls. It has not yet imposed a kill-switch rule."
publishedAt: 2026-09-20T12:18:00+10:00
updatedAt: 2026-09-20T12:18:00+10:00
author: Index Us Editorial
category: Analysis
tags: [california, ai-governance, audits, frontier-models, regulation]
featured: false
draft: false
readingMinutes: 7
keyTakeaways:
  - "California's Government Operations Agency must publish independent-verifier application materials by 1 May 2027 and establish an AI-auditor registry and begin its listed actions by 1 December 2027."
  - "A separate report due on 16 November 2026 must assess possible onsite evaluators, independent verification of existing filings, a frontier-model kill switch and broader incident reporting."
  - "The order does not itself require an AI company to install a kill switch, embed an evaluator or obtain independent verification; those measures remain proposals for possible legislation."
  - "Developers and buyers can prepare by separating emergency access revocation, service shutdown, deployment rollback and model-distribution controls, then defining who can trigger and verify each one."
sources:
  - label: "Governor of California — Executive-order announcement"
    url: "https://www.gov.ca.gov/2026/09/18/governor-newsom-issues-executive-order-to-accelerate-independent-oversight-and-advance-the-creation-of-an-ai-kill-switch/"
  - label: "Governor of California — Executive Order N-9-26"
    url: "https://www.gov.ca.gov/wp-content/uploads/2026/09/FINAL-N-9-26-AI-EO-9.18.26-SIGNED.pdf"
  - label: "California Legislative Information — SB 813"
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB813"
  - label: "California Legislative Information — AB 1405"
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB1405"
  - label: "Los Angeles Times — Newsom creates AI safety panel"
    url: "https://www.latimes.com/california/story/2026-09-18/newsom-creates-panel-on-ai-safety-regulation-suggests-possible-kill-switch"
  - label: "Politico — Newsom signs order to explore new AI rules"
    url: "https://www.politico.com/news/2026/09/18/newsom-california-executive-order-ai-01083826"
newsroom:
  runId: "20260920T020327Z"
  storyId: "california-ai-order-auditor-deadlines-kill-switch-study"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

California has brought forward the machinery for recognising independent AI assessors and registering AI auditors. It has also ordered a two-month study of stronger rules, including a possible emergency shutoff for frontier models. The immediate effect is administrative. AI companies do not yet face a kill-switch mandate.

The distinction matters to developers, auditors and organisations buying AI services. [Executive Order N-9-26](https://www.gov.ca.gov/wp-content/uploads/2026/09/FINAL-N-9-26-AI-EO-9.18.26-SIGNED.pdf) imposes three duties on state agencies. Two accelerate work already required by SB 813 and AB 1405. The third requires recommendations about four possible amendments to California law by 16 November 2026. None of those four proposals is made binding on an AI company by the order itself.

The [Governor of California's announcement](https://www.gov.ca.gov/2026/09/18/governor-newsom-issues-executive-order-to-accelerate-independent-oversight-and-advance-the-creation-of-an-ai-kill-switch/) carries a publication timestamp of 15:08:17 UTC on 18 September 2026, and the signed instrument is dated the same day. Its headline says the state is advancing an AI kill switch. In the signed text, officials must assess the technical feasibility and potential efficacy of requiring one, then report to the governor.

<figure style="margin: 2.5rem 0;">
  <svg viewBox="0 0 800 560" width="800" height="560" role="img" aria-labelledby="california-ai-order-art-title california-ai-order-art-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#f5f3ed;" preserveAspectRatio="xMidYMid meet">
    <title id="california-ai-order-art-title">A solid implementation track beside a dashed proposal track leading to an unactivated stop control</title>
    <desc id="california-ai-order-art-desc">On an off-white technical grid, two solid cobalt milestone discs lead into an auditor register. A separate dashed charcoal path leaves a recommendation document and ends at a hollow vermilion stop control, showing that implementation deadlines and proposed frontier safeguards are different tracks.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <g stroke="#20221f" stroke-width="1" opacity=".13">
      <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800"/>
      <path d="M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560"/>
    </g>
    <rect x="46" y="50" width="708" height="460" fill="none" stroke="#20221f"/>
    <path d="M26 80H66M46 60V100M734 460H774M754 440V480" stroke="#20221f" stroke-width="2"/>
    <rect x="92" y="102" width="216" height="356" fill="#cbd3c0" stroke="#20221f" stroke-width="3"/>
    <path d="M125 145H275M125 174H245" stroke="#20221f" stroke-width="6"/>
    <g fill="#345dcc" stroke="#20221f" stroke-width="3">
      <circle cx="151" cy="256" r="38"/>
      <circle cx="249" cy="356" r="38"/>
    </g>
    <path d="M151 294V356H211M249 318V256H189" fill="none" stroke="#20221f" stroke-width="4"/>
    <path d="M136 256H166M151 241V271M234 356H264M249 341V371" stroke="#f5f3ed" stroke-width="5"/>
    <path d="M308 280H386" stroke="#345dcc" stroke-width="12"/>
    <path d="M374 262L404 280L374 298Z" fill="#345dcc"/>
    <rect x="404" y="185" width="156" height="190" fill="#20221f" stroke="#20221f" stroke-width="3"/>
    <rect x="430" y="218" width="104" height="124" fill="#f5f3ed"/>
    <path d="M449 246H515M449 269H503M449 292H515M449 315H493" stroke="#20221f" stroke-width="5"/>
    <path d="M482 185V116H625V191" fill="none" stroke="#20221f" stroke-width="4" stroke-dasharray="10 9"/>
    <rect x="572" y="86" width="106" height="70" fill="#e9dfcd" stroke="#20221f" stroke-width="3"/>
    <path d="M592 109H658M592 129H644" stroke="#20221f" stroke-width="5"/>
    <path d="M625 191V252H650" fill="none" stroke="#20221f" stroke-width="4" stroke-dasharray="10 9"/>
    <g transform="translate(667 300)">
      <circle r="69" fill="#f5f3ed" stroke="#ed512f" stroke-width="15"/>
      <circle r="43" fill="none" stroke="#20221f" stroke-width="3"/>
      <path d="M-25 0H25" stroke="#ed512f" stroke-width="12"/>
    </g>
    <path d="M630 380H704M630 397H681M96 480H181" stroke="#20221f" stroke-width="2"/>
    <circle cx="703" cy="397" r="8" fill="#ed512f"/>
  </svg>
  <figcaption><em>Original illustrative graphic: solid milestones feed an auditor register, while a separate dashed recommendation path ends at an unactivated stop control. It is a conceptual distinction between current administrative duties and possible future rules, not a diagram of California's process, a frontier-model architecture or evidence that a kill switch works.</em></figcaption>
</figure>

## The order sets three government deadlines

The first direction concerns independent verification organisations, or IVOs. [SB 813](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB813) required the Government Operations Agency to develop application requirements, procedures and designation criteria by 1 January 2028. The order sets an earlier deadline of 1 May 2027 for completing and publicly posting that work.

The second concerns the broader AI-auditor market. [AB 1405](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB1405) required the agency to establish an online registry, set annual registration fees and create a misconduct-reporting channel by 1 January 2029. The order directs it to complete those tasks and begin the actions listed in the following subdivision by 1 December 2027.

That accelerates the administrative work, not every part of AB 1405. The statute separately says that, from 1 January 2029, a person may not offer, sell or conduct a covered AI audit without registering. The order does not give that prohibition a new date. A registry may therefore start operating before the statutory market restriction begins, unless later law changes the sequence.

The third deadline is 16 November 2026. By then, the Government Operations Agency, consulting with the Governor's Office of Emergency Services and national experts, must submit recommendations on the technical feasibility and potential efficacy of amending existing safety and security laws. The order specifies four topics: onsite IVOs for large frontier developers; independent verification of required safety frameworks, transparency reports and risk assessments; a kill switch whose efficacy is independently checked on an ongoing basis; and an expanded definition of reportable critical safety incidents.

These directions took effect immediately. They tell state officials what to prepare; they do not convert the four study topics into present duties for developers.

## The existing laws regulate assessors before they compel assessments

SB 813 and AB 1405 establish two related forms of infrastructure. SB 813 creates a designation framework for organisations with expertise in assessing AI risks and the methods used to assess them. It requires criteria covering competence, conflicts of interest, operational independence, documentation and cybersecurity. AB 1405 registers people and organisations selling audits for compliance with California law, sets reporting and recordkeeping duties, and provides a route for misconduct complaints.

Designation or registration is not proof that a specific model has passed an independent safety review. SB 813 expressly says its chapter does not require a developer, deployer or operator to engage an IVO or undergo a covered audit as a condition of operating in California. It also says designation is not a state endorsement of an AI system or model. AB 1405 governs who can sell a covered audit and how the work is documented; registration is not a verdict on the product being audited.

The recommendation phase could change the framework's practical effect. Requiring onsite access, verification of company filings or recurring tests of a shutdown control would connect qualified assessors to defined developer obligations. For now, the order asks officials to assess that connection and propose how it might work.

[Politico's reporting](https://www.politico.com/news/2026/09/18/newsom-california-executive-order-ai-01083826) similarly describes the order as exploring proposals and notes that new guardrails would require legislative follow-through. The [Los Angeles Times](https://www.latimes.com/california/story/2026-09-18/newsom-creates-panel-on-ai-safety-regulation-suggests-possible-kill-switch) reports that Newsom said a kill switch can mean different things and that the state needs to work out a usable framework. Both accounts are consistent with the signed text's narrower scope.

## A kill switch needs a defined object and a safe state

"Kill switch" sounds like one control. In a deployed AI system, it can describe several different interventions: stopping one agent run, revoking its credentials, removing network access, disabling a product endpoint, rolling back a model version, halting a training job or restricting distribution of model weights. Those actions have different operators, evidence and recovery paths.

For the term to be testable or enforceable, a rule would need to say which layer is in scope. A developer can stop an API it controls without recalling a downloaded model. An enterprise can revoke an agent's tools without disabling the underlying model for every other customer. A cloud provider can interrupt compute without deciding whether a model caused the event. A control that collapses those cases into one button would be difficult to test and easy to overstate.

Any proposal would also need to define the safe state. Abruptly stopping a system that controls a long-running business process, laboratory instrument or physical device may create a second hazard. A shutdown procedure may need to preserve evidence, complete a limited hand-off, isolate credentials and prevent automatic restart. The right behaviour depends on the system surrounding the model, not only the model itself.

Ongoing independent verification, as proposed in the order, could make a shutdown requirement more than a policy document. The test should establish which triggers were exercised, whether the system actually lost its capabilities, what remained reachable, how quickly the control took effect and whether an alternative route restored the prohibited action. The verifier would also need access sufficient to distinguish a failed control from an incomplete test.

## What developers and buyers can prepare now

Large frontier developers do not gain a new kill-switch compliance duty from this order. The order does show which questions California officials will consider over the next two months. That is enough notice to begin basic control mapping without assuming a final rule.

Developers can document each emergency control by layer: training, model serving, agent runtime, credentials, tools, network and distributed weights. For each control, name the authorised trigger, required evidence, expected time to safe state, dependencies, test frequency and conditions for restoration. Existing incident definitions should be mapped to outcomes and loss of control, not only to familiar intrusion categories.

Prospective IVOs and AI auditors can prepare for earlier state processes by separating two claims that are often blurred: professional eligibility and the result of a particular assessment. They should be ready to disclose methods, relevant expertise, financial relationships, exclusions, evidence gaps and the point at which access was insufficient to reach a conclusion.

Buyers can ask a provider for the same information before California settles the rule. A claim that a system has a kill switch is incomplete without the layer it stops, the last test date, the conditions tested, the party that can activate it and the residual capabilities after activation. An auditor's state registration or IVO designation, once available, will be useful provenance. It will not replace the scope and findings of the actual review.

## The November report is the next substantive event

The next material evidence will be the recommendations due on 16 November: their technical definitions, proposed legal mechanism, scope of covered developers, access rights for verifiers, testing standard and treatment of model weights outside a developer's control.

California has shortened the timetable for building an independent-audit ecosystem. Enforceable frontier-model shutdown duties still depend on unfinished policy work and, for the proposed amendments, legislation that has not been enacted.

This analysis is based on the governor's announcement, the signed executive order, the chaptered texts of SB 813 and AB 1405, and independent reporting. Index Us did not inspect any developer's internal controls, test a shutdown mechanism or assess an IVO or registered AI auditor.
