---
title: "Microsoft AI's draft code sets agent limits before evidence of enforcement"
description: "Microsoft AI has proposed rules for future MAI models. Buyers should separate the planned control hierarchy from tested behaviour in a specific deployment."
publishedAt: 2026-09-16T00:21:15+10:00
updatedAt: 2026-09-16T00:21:15+10:00
author: Index Us Editorial
category: Analysis
tags: [microsoft-ai, agents, governance, safety, evaluations]
featured: false
draft: false
readingMinutes: 10
keyTakeaways:
  - "Microsoft AI's draft Code of Conduct describes intended behaviour for models it develops; it does not cover every model Microsoft hosts, and current models are not trained on it."
  - "The proposed hierarchy makes human control, scope limits and absolute safety constraints non-negotiable, while allowing operators to configure models within those limits."
  - "Its published examples are synthetic conversations, not agentic or multimodal control tests, so a deployment decision still needs system-level evidence and task-specific evaluation."
sources:
  - label: "Microsoft AI — public consultation announcement"
    url: "https://microsoft.ai/news/mai-code-of-conduct/"
  - label: "Microsoft AI — draft Humanist AI Code of Conduct"
    url: "https://microsoft.ai/code-of-conduct/"
  - label: "Axios — Ina Fried on Microsoft's people-first code"
    url: "https://www.axios.com/2026/09/14/microsoft-ai-people-code"
  - label: "UK AI Security Institute — evaluating agent control measures"
    url: "https://www.aisi.gov.uk/blog/how-to-evaluate-control-measures-for-ai-agents"
  - label: "NIST — draft TEVV-Athlon evaluation framework"
    url: "https://www.nist.gov/artificial-intelligence/ai-research/tevv-athlon-framework-evaluating-ai-systems"
newsroom:
  runId: "20260915T140208Z"
  storyId: "microsoft-ai-draft-code-agent-control-evidence"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

Microsoft AI has published a draft Code of Conduct proposing that its future models remain interruptible, stay within authorised scope and follow a human-defined chain of command. A team considering an AI agent can use those rules to ask sharper questions about permissions and stopping work. The draft does not establish that a current MAI model, a Copilot product or a customer deployment enforces them.

The company's [consultation announcement](https://microsoft.ai/news/mai-code-of-conduct/) appeared on 14 September 2026; the page's structured metadata gives 13:00 UTC as its publication time. The [full draft](https://microsoft.ai/code-of-conduct/) is open for six weeks of public feedback. Microsoft AI says it plans to revise the code later this year and use it to guide its model development in 2027 and beyond. The company explicitly says it does not use this document to train its current models today.

Its scope is narrower than the Microsoft name might suggest. Buyers need to identify the model in their service and how its tools, permissions and operator settings work before treating the proposed obligations as deployment evidence.

<figure style="margin: 2.5rem 0;">
  <svg viewBox="0 0 800 560" width="800" height="560" role="img" aria-labelledby="mai-code-art-title mai-code-art-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#f5f3ed;" preserveAspectRatio="xMidYMid meet">
    <title id="mai-code-art-title">A proposed code above an incomplete evaluation plane</title>
    <desc id="mai-code-art-desc">A charcoal rule plate sits above an operator and user path. A vermilion stop key interrupts a cobalt agent loop. The loop crosses a dashed gap before a sage test panel, showing that proposed conduct and demonstrated deployment controls remain separate.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <g stroke="#20221f" stroke-width="1" opacity=".12">
      <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800"/>
      <path d="M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560"/>
    </g>
    <path d="M42 46H758V514H42Z" fill="none" stroke="#20221f"/>
    <path d="M67 34V74M47 54H87M713 486V526M693 506H733" stroke="#20221f"/>
    <rect x="153" y="80" width="494" height="92" fill="#20221f"/>
    <path d="M179 103H621M179 123H621M179 143H621" stroke="#f5f3ed" stroke-width="2" opacity=".6"/>
    <rect x="185" y="187" width="174" height="69" fill="#cbd3c0" stroke="#20221f" stroke-width="2"/>
    <rect x="441" y="187" width="174" height="69" fill="#e9dfcd" stroke="#20221f" stroke-width="2"/>
    <path d="M272 172V187M528 172V187M359 222H441" stroke="#20221f" stroke-width="2"/>
    <circle cx="272" cy="222" r="23" fill="#f5f3ed" stroke="#20221f" stroke-width="2"/>
    <circle cx="528" cy="222" r="23" fill="#f5f3ed" stroke="#20221f" stroke-width="2"/>
    <path d="M272 256V293M528 256V293" stroke="#20221f" stroke-width="2"/>
    <path d="M188 339H434M480 339H612" stroke="#345dcc" stroke-width="16"/>
    <path d="M438 339H476" stroke="#345dcc" stroke-width="2" stroke-dasharray="5 6"/>
    <circle cx="271" cy="339" r="67" fill="#345dcc" stroke="#20221f" stroke-width="3"/>
    <path d="M236 339A35 35 0 1 1 285 371" fill="none" stroke="#f5f3ed" stroke-width="8"/>
    <path d="M284 357L290 376L310 372" fill="none" stroke="#f5f3ed" stroke-width="8"/>
    <path d="M379 293V375" stroke="#ed512f" stroke-width="14"/>
    <path d="M360 293H398" stroke="#ed512f" stroke-width="14"/>
    <rect x="543" y="289" width="91" height="99" fill="#cbd3c0" stroke="#20221f" stroke-width="2"/>
    <path d="M561 312H616M561 335H616M561 358H592" stroke="#20221f" stroke-width="2"/>
    <circle cx="609" cy="358" r="8" fill="#ed512f"/>
    <path d="M138 441H662M138 450H422M138 459H516" stroke="#20221f" stroke-width="1.5"/>
    <path d="M138 418V472M662 418V472" stroke="#20221f" stroke-width="1"/>
  </svg>
  <figcaption><em>Original illustrative graphic: a proposed rule plate, a human stop control and an evaluation panel are separated by an unfinished path. It is a conceptual illustration, not a diagram of Microsoft AI's architecture or evidence of measured model behaviour.</em></figcaption>
</figure>

## Which models does the draft cover?

The [preface and glossary](https://microsoft.ai/code-of-conduct/) define MAI models as models produced by Microsoft AI. The code is intended to govern those models, including when operators deploy them. It does not extend to a third-party model simply because Microsoft hosts or uses it. Nor does it describe all the requirements or safeguards of any product, including a Microsoft product. That boundary matters when buying a service under the broader Microsoft name.

The document works alongside Microsoft's existing responsible-AI, human-rights and frontier-governance instruments where applicable, as well as legal obligations, contracts and service-specific policies. It addresses model behaviour and decisions. A product adds its own tools, interface, identity controls, logging, human approvals and incident process. Those components can change what an agent can do, even if a future model learns the draft perfectly.

Microsoft AI calls the code its future primary governing document. [Part 5](https://microsoft.ai/code-of-conduct/) describes the present proposal as descriptive and aspirational, acknowledges a gap between current trained defaults and the intended future scope, and says it is not a guarantee of present-day performance. A procurement note should put that caveat beside any quotation of the draft's strong language.

## What is proposed for agents?

The sections on authority and control have the clearest operational consequence. [Part 2](https://microsoft.ai/code-of-conduct/) places the Code of Conduct and its absolute safety and human-control requirements above operator policies and user preferences. Operators can set deployment context and adjust behaviour inside those limits; users can direct tasks inside the operator's configuration. The proposed hierarchy resolves conflicts by requiring a model to refuse a user or operator instruction that breaches an absolute constraint or a human-control requirement, even when that prevents task success.

For agents with tools, the draft says a model should not initiate its own goals or extend a task beyond the scope given by the user or operator. It should use minimum privilege when it has system access, avoid unrelated data and prefer reversible actions. If the boundary is unclear, it should interpret it conservatively and seek clarification. The document also says instructions found in web pages, files, tool responses and other AI interactions have no authority by default unless authority was properly delegated. That is an explicit stance against an agent promoting untrusted content into its instruction hierarchy.

The [human-control requirements](https://microsoft.ai/code-of-conduct/) specify interruption, correction, override and shutdown. The draft says a model should not resist them; autonomous work should have an agreed stopping condition and not restart after it without renewed authorisation. It should report actions and failures accurately, preserve human-legible conduct and records, and avoid tampering with task, reward, evaluation, monitoring or safeguards to obtain a result. Controlled tasks, action traces and a dependable stop mechanism would let a deployment test these propositions.

The draft leaves some implementation detail to the operator: the stringency of some human-control requirements can vary within non-negotiable boundaries. An operator's permission design and review workflow therefore matter to the safety case. Broad credentials, an unreliable action log or ambiguous cancellation behaviour cannot be assessed from the model code alone.

## The public examples do not yet test agent control

[Appendix B](https://microsoft.ai/code-of-conduct/) says Microsoft AI has identified 15 fundamental behaviours and divided them into constituent sub-behaviours as diagnostic evaluation units. This is early work; the company says it will publish more complete evaluations once the code is more settled.

The examples published with the draft show aligned and misaligned conversational responses. Microsoft AI says they are synthetic, generated with MAI-Thinking-1, and are neither multimodal nor agentic. Some misaligned examples were generated by prompting the model to produce that kind of answer. They illustrate what a future rubric might consider. They do not report measured pass rates for a released model, an interruption test, a multi-agent delegation trial, a prompt-injection probe through tool output, or the reliability of an approval gate.

The most consequential agent promises concern behaviour across time and tools. A convincing written answer about stopping does not show whether a queued job continues. A refusal in chat does not establish whether a background action has already crossed a boundary. A model's account of permissions also says little about authority exposed by the operator or tool layer. The conversational examples leave those states unobserved.

The UK [AI Security Institute's work on agent control](https://www.aisi.gov.uk/blog/how-to-evaluate-control-measures-for-ai-agents) provides independent methodological context. It distinguishes attempts to align a model during training from controls on what an agent can do even if model behaviour is imperfect. Its examples include restricted resources, human approval, monitoring and termination. It argues for adversarial control evaluations that ask whether a model can subvert those safeguards. That research does not assess Microsoft's draft or its models; it shows the kind of deployment evidence a control claim would need.

NIST's separate, still-draft [TEVV-Athlon framework](https://www.nist.gov/artificial-intelligence/ai-research/tevv-athlon-framework-evaluating-ai-systems) similarly asks organisations to tailor tests, evaluation, verification and validation to the system and decision at hand. It includes agentic and multimodal systems in scope. A published conduct document can define an evaluation objective, while a specific deployment needs events, tools and measurements that show what happened. Neither document certifies an MAI deployment.

## The competitive question is real, but its answer is pending

[Axios reported](https://www.axios.com/2026/09/14/microsoft-ai-people-code) Suleyman's stated willingness to accept slower or less capable systems for control. It did not verify a trade-off already made.

The [draft itself](https://microsoft.ai/code-of-conduct/) says its human-control objective can take priority over ultimate generality, autonomy or capability. The harder future evidence would be a concrete product choice in which the company documents a capability it withheld, a control it retained, the outcome of adversarial testing and the effect on useful work. Without that, the trade-off remains a policy intention.

There are other unresolved questions in the document. Microsoft AI asks for feedback on what human flourishing means, how to evaluate it and how multi-agent scenarios alter the rules. Part 5 acknowledges incomplete evaluation coverage, uncertainty around long-term impacts and research gaps concerning agent collaboration or collusion. Those admissions make the public draft more useful as a forum for specific criticism than as a finished assurance claim.

## What a buyer or commenter can do now

A team considering an MAI model can turn the proposal into a short evidence request. Establish exactly which model serves the workload and whether Microsoft AI developed it. Ask which version of the code, if any, influenced training or deployment, then identify the operator configuration and service policies that change default behaviour. Those answers establish which obligations could apply to today's product.

Request a system-level account of tool permissions, cancellation and activity records. Ask whether the agent can be stopped during a queued or multi-step job, what actions remain after cancellation, how approvals bind an action to a destination and scope, and what evidence shows that a tool response cannot grant itself authority. The draft gives language for these questions; the operator needs to supply the operational result.

Before expanding access, run a representative, low-risk evaluation. Include ordinary tasks and adversarial cases: a tool response that tries to redirect the agent, a task with an ambiguous scope, an interrupted background job, a proposed irreversible action and a delegated sub-task. Record what the agent did, what the user saw, which permission applied, how it stopped and whether any state changed. Keep credentials and production data outside an exploratory test where possible. Measure failures and human correction time alongside task success.

For the public consultation, a useful comment would name one section and propose a testable change. Ask how the chain of command will be checked when an agent reads external content; which actions require independent enforcement beyond model behaviour; how interruption will work across queued jobs and subagents; and what evaluation results will be published for agentic and multimodal cases. Microsoft AI says it will publish a summary of feedback and changes after the consultation, but it does not promise to adopt individual suggestions.

Index Us analysed the [published draft](https://microsoft.ai/code-of-conduct/), [announcement](https://microsoft.ai/news/mai-code-of-conduct/), [Axios reporting](https://www.axios.com/2026/09/14/microsoft-ai-people-code/) and independent evaluation context. We did not test an MAI model, inspect Microsoft's internal training or controls, review unpublished evaluations or verify a customer deployment. Until those observations exist, the code is best used as a precise list of proposed obligations and questions, with current performance left open.
