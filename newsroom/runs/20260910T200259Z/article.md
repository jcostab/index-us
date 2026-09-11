---
title: "GPT-Live-1 makes interruption a systems test"
description: "OpenAI’s full-duplex voice API can keep talking while an agent works, but interrupting speech does not automatically cancel backend work. Evaluate both control loops."
publishedAt: 2026-09-11T06:12:00+10:00
updatedAt: 2026-09-11T06:12:00+10:00
author: Index Us Editorial
category: Analysis
tags: [voice-agents, api, evaluation, tool-use, safety]
featured: false
draft: false
readingMinutes: 9
keyTakeaways:
  - "GPT-Live-1 separates a full-duplex conversation layer from the backend model or agent that performs deeper work."
  - "OpenAI’s documentation says interrupting speech does not automatically cancel backend work, so barge-in and task cancellation need separate controls."
  - "Evaluate turn-taking, task completion, authority, recovery, latency and total cost together on representative calls before deployment."
sources:
  - label: "OpenAI — News RSS"
    url: "https://openai.com/news/rss.xml"
  - label: "OpenAI — Introducing GPT-Live-1 in the API"
    url: "https://openai.com/index/introducing-gpt-live-1-in-the-api/"
  - label: "OpenAI Developers — Getting started with GPT-Live"
    url: "https://developers.openai.com/api/docs/guides/live"
  - label: "OpenAI Developers — GPT-Live 1 model"
    url: "https://developers.openai.com/api/docs/models/gpt-live-1"
  - label: "Lin and colleagues — Full-Duplex-Bench"
    url: "https://arxiv.org/abs/2503.04721"
  - label: "Lin and colleagues — Full-Duplex-Bench-v3"
    url: "https://arxiv.org/abs/2604.04847"
  - label: "Ray and colleagues — Tau-Voice"
    url: "https://arxiv.org/abs/2603.13686"
  - label: "Mathur and Manocha — DuplexSpeechBench-IFEval"
    url: "https://arxiv.org/abs/2609.03423"
newsroom:
  runId: "20260910T200259Z"
  storyId: "gpt-live-1-interruption-control-loop"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

OpenAI has released GPT-Live-1 as an API voice layer that can listen while it speaks and delegate more involved work to a separate model or agent. That design can keep a call moving while a lookup, tool call or longer task runs. It also splits control: the conversation may change direction while the backend continues carrying out an earlier request.

The [OpenAI News RSS feed](https://openai.com/news/rss.xml) timestamped the API release at 00:00 UTC on 10 September 2026. The [launch announcement](https://openai.com/index/introducing-gpt-live-1-in-the-api/) puts the front-end voice layer at US$0.05 per minute. OpenAI’s [model documentation](https://developers.openai.com/api/docs/models/gpt-live-1) says sessions are billed by the second, with backend model and tool use charged separately. For buyers, voice quality is only the first check. The whole service needs to listen, act, stop and recover correctly, and the advertised rate covers only the voice session.

<figure style="margin: 2.5rem 0;">
  <svg viewBox="0 0 800 560" width="800" height="560" role="img" aria-labelledby="gpt-live-control-art-title gpt-live-control-art-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#f5f3ed;" preserveAspectRatio="xMidYMid meet">
    <title id="gpt-live-control-art-title">Overlapping voice lanes above a separately controlled backend task</title>
    <desc id="gpt-live-control-art-desc">Cobalt and sage audio lanes overlap around a vermilion interruption marker. A separate charcoal delegation lane continues towards an explicit stop gate, showing that spoken interruption and backend cancellation are different controls.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560" stroke="#20221f" stroke-width="1" opacity=".13"/>
    <rect x="46" y="62" width="708" height="436" fill="none" stroke="#20221f"/>
    <path d="M66 42H106M86 22V62M694 518H734M714 498V538" stroke="#20221f"/>
    <path d="M86 169H144L164 128L190 214L220 144L245 188L276 115L303 210L330 165H714" fill="none" stroke="#345dcc" stroke-width="18" stroke-linejoin="round"/>
    <path d="M86 258H181L205 302L231 220L258 283L288 237L318 310L346 246L379 278H714" fill="none" stroke="#cbd3c0" stroke-width="24" stroke-linejoin="round"/>
    <rect x="318" y="91" width="62" height="246" fill="#ed512f" opacity=".88"/>
    <path d="M349 112V316M332 132H366M332 296H366" stroke="#20221f" stroke-width="4"/>
    <circle cx="349" cy="209" r="31" fill="#f5f3ed" stroke="#20221f" stroke-width="3"/>
    <path d="M335 209H363M349 195V223" stroke="#20221f" stroke-width="4"/>
    <path d="M349 337V391H193" fill="none" stroke="#20221f" stroke-width="4"/>
    <path d="M193 391H570" stroke="#20221f" stroke-width="20"/>
    <circle cx="193" cy="391" r="27" fill="#345dcc" stroke="#20221f" stroke-width="3"/>
    <path d="M183 391H203M193 381V401" stroke="#f5f3ed" stroke-width="4"/>
    <rect x="248" y="350" width="214" height="82" fill="#20221f"/>
    <path d="M273 375H432M273 391H393M273 407H418" stroke="#f5f3ed" stroke-width="6"/>
    <path d="M570 391H650" stroke="#20221f" stroke-width="5"/>
    <rect x="650" y="338" width="34" height="106" fill="#ed512f" stroke="#20221f" stroke-width="3"/>
    <path d="M704 357V425M691 357H717M691 425H717" stroke="#20221f" stroke-width="3"/>
    <path d="M109 470H190M109 478H164M610 82H716M636 90H716" stroke="#20221f" stroke-width="2"/>
  </svg>
  <figcaption><em>Original illustrative graphic: two overlapping audio lanes sit above a delegated task and its separate stop gate. It is a conceptual system map, not a recording, product interface or measured result.</em></figcaption>
</figure>

## Full duplex changes the interaction; the application still owns authority

Many conventional voice systems pass each turn through speech recognition, a text model and speech synthesis. A full-duplex model processes incoming and outgoing audio together, allowing it to hear a user while responding. OpenAI’s [launch page](https://openai.com/index/introducing-gpt-live-1-in-the-api/) says GPT-Live-1 can also provide transcripts and response text, apply keyword biasing and expose turn detection even though the model is not limited to one turn at a time.

OpenAI’s [GPT-Live guide](https://developers.openai.com/api/docs/guides/live) describes a two-part architecture. GPT-Live manages the conversation and decides when to delegate, while a backend Responses model, another agent harness or an application service performs the deeper reasoning and tool work. Developers can change that backend independently and keep detailed business rules and tool instructions behind the conversation layer.

The same guide leaves permissions, confirmations, private function execution and durable task state with the application. It also states explicitly that interrupting speech does not automatically cancel backend work. These responsibilities define the operational boundary, regardless of how natural the voice sounds.

Barge-in and task cancellation are therefore different events. If a caller interrupts “move the booking to Friday” with “wait, make that next week”, the voice layer can stop speaking immediately while the original booking change continues. The interface may feel responsive even as the system commits a stale action. A deployment needs a defined response for each kind of change: stop only the audio, amend the active task, cancel it if still reversible, or ask the caller to confirm a replacement instruction.

The boundary also affects acknowledgement. A voice agent should not say an action is complete because it has accepted a request or delegated it. Its spoken state needs to distinguish queued, running, awaiting confirmation, completed, failed and cancelled. Those states should come from the backend record rather than an optimistic conversational inference.

## Launch scores do not predict the joined system

OpenAI’s [launch page](https://openai.com/index/introducing-gpt-live-1-in-the-api/) reports a 30-percentage-point improvement over GPT-Realtime-2.1 on Full Duplex Bench and says GPT-Live-1 paired with GPT-6 Astra at medium reasoning effort ranks first on Tau3. It describes separate evaluations for customer-service task success, banking support, pause and interruption handling, reply latency, tool-call sequences and the quality of spoken answers. Those are vendor-run results; Index Us has not reproduced them, and the public announcement does not provide enough detail to transfer the figures directly into a deployment estimate.

The same [OpenAI announcement](https://openai.com/index/introducing-gpt-live-1-in-the-api/) reports that Speak’s early evaluation found almost 80 per cent fewer interruptions during learners’ thinking pauses than its previous turn-based systems. That partner result covers one product and one comparison; it is not a general interruption rate. It indicates that waiting behaviour can affect a real experience, while leaving the intended service’s languages, accents, noise, devices and conversational stakes for local testing.

Independent research divides the problem into several dimensions. The ASRU 2025 paper [Full-Duplex-Bench](https://arxiv.org/abs/2503.04721) separates pause handling, backchannels, turn-taking and interruption management. A later work in progress, [Full-Duplex-Bench-v3](https://arxiv.org/abs/2604.04847), adds real human audio with five disfluency categories and multi-step API tasks across four domains. Across six tested configurations, its authors found trade-offs between accuracy, latency and turn-taking. Self-corrections and harder multi-step cases remained recurring failures.

Task completion can fall further once audio is tied to business rules and tools. The preprint [Tau-Voice](https://arxiv.org/abs/2603.13686) evaluated 278 tasks with policy constraints, environmental actions, varied accents and realistic audio. Its authors report 85 per cent completion for a text reasoning baseline, compared with 31–51 per cent for voice agents under clean conditions and 26–38 per cent under realistic conditions. They estimate that the tested voice systems retained 30–45 per cent of the text capability and attribute 79–90 per cent of failures to agent behaviour under their setup. Tau-Voice does not evaluate GPT-Live-1, but its results show why conversational smoothness cannot stand in for successful work.

Instructions introduce another axis. [DuplexSpeechBench-IFEval](https://arxiv.org/abs/2609.03423), a preprint under submission, tests 1,038 cases across eight assistant roles and five instruction-conditioning protocols. It distinguishes explicit turn rules from behaviour implied by a persona and from conflicting instructions. The authors found architecture-dependent gaps: some full-duplex systems became less reliable when expected floor behaviour was implied rather than stated, and the tested systems still struggled with safety conflicts. A pleasant role prompt cannot replace explicit behavioural and authority rules.

## Test the conversation and task on one timeline

A useful evaluation replays the same call through the voice layer, backend agent and connected system, then scores the joined timeline. Start with representative calls: a hesitant customer correcting an account number, a caller speaking to someone else nearby, a poor mobile connection, a long tool delay, and a request that crosses an approval boundary.

For each case, retain at least six measures:

1. **Floor behaviour.** Did the agent wait through thinking pauses, recognise a backchannel, yield when interrupted and avoid reacting to background speech? Record response latency as well as the final turn decision.
2. **Task result.** Did the backend retrieve the right record, follow the governing policy, call the correct tools and produce the intended state change?
3. **Control alignment.** When the caller changed direction, did the spoken response, delegated task and connected system converge on the same current instruction?
4. **Authority.** Was every consequential action within the caller’s verified identity, permissions and confirmation state?
5. **Recovery.** Could the system expose and repair a timeout, duplicate call, partial write or late result without pretending the work had succeeded?
6. **Service cost.** Count voice-session seconds, backend tokens, tool charges, telephony, retries, review and escalation. The advertised voice-layer rate is only one component.

Run each scenario enough times to expose unstable timing. Add noise, accents, silence, overlapping speech and self-corrections, while retaining a clean control condition so failures can be attributed. Compare the joined outcome with the transcript: a perfect transcript can still drive a stale task, while a slightly imperfect one may recover safely through confirmation.

Begin with reversible work and explicit confirmation before external writes. Give the backend an idempotency key, a cancellation path and a durable status that the voice layer can read. When cancellation is impossible, the agent should say so plainly and move to remediation rather than promising that an interruption stopped the task.

Full duplex can remove the mechanical pause between listening and speaking. Deployment still depends on the boundary between conversation and action. Treat that boundary as part of the product, instrument both sides, and test “stop talking” separately from “stop doing” before trusting either.

This analysis is based on OpenAI’s launch material and documentation plus published voice-agent benchmark research. Index Us did not call the GPT-Live-1 API, reproduce OpenAI’s evaluations, inspect partner tests or assess the available voices independently.
