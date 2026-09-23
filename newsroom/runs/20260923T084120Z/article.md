---
title: "Claude Opus 5.5 cuts token prices, but its API migration changes agent behaviour"
description: "Claude Opus 5.5 is cheaper per token, but breaking request, thinking, tool and fallback changes make it a tested migration rather than a model-ID swap."
publishedAt: 2026-09-23T18:41:21+10:00
updatedAt: 2026-09-23T18:41:21+10:00
author: Index Us Editorial
category: Analysis
tags: [models, agents, api, evaluation, claude]
featured: false
draft: false
readingMinutes: 11
keyTakeaways:
  - "Claude Opus 5.5 lowers input, output and cache-read prices, but several Opus 5 request shapes now fail and the default effort changes from high to medium."
  - "Anthropic's safety routing can send selected requests to another model, so a product or fallback-enabled benchmark measures the deployed system rather than Opus 5.5 alone."
  - "A safe migration should preflight request compatibility, pin effort and surface, trace tool and refusal paths, then compare accepted work and whole-task cost before rollout."
sources:
  - label: "Anthropic on X — Claude Opus 5.5 availability"
    url: "https://x.com/AnthropicAI/status/2102435703535939725"
  - label: "Anthropic — Introducing Claude Opus 5.5"
    url: "https://www.anthropic.com/claude-opus-5-5"
  - label: "Claude Platform Docs — What's new in Claude Opus 5.5"
    url: "https://platform.claude.com/docs/en/models/opus-5-5/whats-new-opus-5-5"
  - label: "Anthropic — Claude Opus 5.5 system card"
    url: "https://anthropic.com/claude-opus-5-5-system-card"
  - label: "Artificial Analysis — Claude Opus 5.5 evaluation"
    url: "https://artificialanalysis.ai/articles/claude-opus-5-5"
  - label: "Artificial Analysis — Claude Opus 5.5 model page"
    url: "https://artificialanalysis.ai/models/claude-opus-5-5"
  - label: "Sonar — Claude Opus 5.5 evaluation review"
    url: "https://www.sonarsource.com/blog/claude-opus-5-5-an-evaluation/"
newsroom:
  runId: "20260923T084120Z"
  storyId: "claude-opus-5-5-api-migration-controls"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

Claude Opus 5.5 is cheaper per token than Opus 5, but it is not a drop-in replacement for an existing API integration. Several request shapes now return errors, the default reasoning effort has moved, progress text arrives differently, and some safety paths can route a request to another model.

Teams moving production work need to test the API contract, agent loop, safeguards and task economics together. A benchmark score or lower price per million tokens cannot show that an existing integration will keep using tools, streaming updates and handling refusals as intended.

Anthropic's [official launch post][s1] says the model was available at **16:31:47 UTC on 22 September 2026**. The [launch page][s2] lists standard prices of $4 per million input tokens, $20 per million output tokens and $0.20 per million cache reads. Opus 5 was $5, $25 and $0.50 respectively. Those tariff reductions justify an evaluation; they do not settle whether a production migration will cost less or behave correctly.

<figure style="margin:2.5rem 0;">
  <svg viewBox="0 0 800 560" width="800" height="560" role="img" aria-labelledby="opus-migration-art-title opus-migration-art-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#f5f3ed;" preserveAspectRatio="xMidYMid meet">
    <title id="opus-migration-art-title">A model cartridge crossing compatibility sockets, a calibration drum and a split safeguard route</title>
    <desc id="opus-migration-art-desc">An off-white technical grid contains a cobalt cartridge with four pins. One vermilion pin stops before a socket while three continue into a sage calibration drum. A charcoal route and a vermilion safeguard route then cross a split frame and converge at one circular acceptance aperture. Registration marks frame the conceptual migration bench.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <g stroke="#20221f" stroke-width="1" opacity=".12">
      <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800"/>
      <path d="M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560"/>
    </g>
    <rect x="42" y="44" width="716" height="472" fill="none" stroke="#20221f" stroke-width="2"/>
    <g fill="none" stroke="#20221f" stroke-width="2">
      <path d="M22 84H62M42 64V104M738 456H778M758 436V476"/>
      <circle cx="42" cy="44" r="6" fill="#ed512f"/>
      <circle cx="758" cy="516" r="6" fill="#345dcc"/>
    </g>
    <g stroke="#20221f" stroke-width="3">
      <path d="M96 175L230 125L260 174V386L230 435L96 385Z" fill="#345dcc"/>
      <path d="M120 199L206 167L226 196V364L206 393L120 361Z" fill="#f5f3ed"/>
      <circle cx="164" cy="280" r="30" fill="#cbd3c0"/>
      <path d="M148 280H180M164 264V296" fill="none" stroke-width="2"/>
    </g>
    <g stroke="#20221f" stroke-width="3">
      <path d="M260 196H326M260 252H326M260 308H326"/>
      <path d="M260 364H298" stroke="#ed512f" stroke-width="9"/>
      <rect x="326" y="182" width="18" height="28" fill="#20221f"/>
      <rect x="326" y="238" width="18" height="28" fill="#20221f"/>
      <rect x="326" y="294" width="18" height="28" fill="#20221f"/>
      <rect x="326" y="350" width="18" height="28" fill="#f5f3ed"/>
      <path d="M298 342V386M286 342H310M286 386H310" fill="none" stroke="#ed512f"/>
    </g>
    <g stroke="#20221f" stroke-width="3">
      <circle cx="420" cy="280" r="98" fill="#cbd3c0"/>
      <circle cx="420" cy="280" r="66" fill="#f5f3ed"/>
      <circle cx="420" cy="280" r="16" fill="#20221f"/>
      <path d="M420 214V246M420 314V346M354 280H386M454 280H486"/>
      <path d="M420 280L468 238" stroke="#ed512f" stroke-width="8"/>
      <circle cx="468" cy="238" r="8" fill="#ed512f"/>
    </g>
    <path d="M344 196H388M344 252H365M344 308H365" stroke="#20221f" stroke-width="5"/>
    <g fill="none" stroke="#20221f" stroke-width="3">
      <rect x="542" y="126" width="88" height="308" fill="#f5f3ed"/>
      <path d="M542 280H630"/>
      <path d="M486 252H542V196H604V252H660" stroke-width="7"/>
      <path d="M486 308H520V364H604V308H660" stroke="#ed512f" stroke-width="7"/>
      <path d="M518 146H552M518 414H552" stroke-width="1" stroke-dasharray="5 6"/>
    </g>
    <g stroke="#20221f" stroke-width="3">
      <circle cx="704" cy="280" r="54" fill="#20221f"/>
      <circle cx="704" cy="280" r="30" fill="#f5f3ed"/>
      <path d="M688 280L699 291L721 266" fill="none" stroke="#345dcc" stroke-width="7"/>
      <path d="M660 252V308M660 280H650" fill="none"/>
    </g>
    <path d="M86 92H174M86 104H142M658 470H724M682 482H724" stroke="#20221f" stroke-width="2"/>
  </svg>
  <figcaption><em>Original illustrative graphic: a model cartridge meets changed compatibility sockets, calibration and a split safeguard route before one acceptance check. It is a conceptual migration map, not Anthropic's architecture, API telemetry or measured routing data.</em></figcaption>
</figure>

## Changing the model ID can fail before the first answer

Anthropic's [Opus 5.5 documentation][s3] identifies four breaking changes for code already running on Opus 5.

Thinking can no longer be disabled. Opus 5 accepted either disabled thinking or a manually assigned thinking-token budget under some settings. Opus 5.5 requires adaptive thinking. Sending the old disabled or manually budgeted form returns a 400 `invalid_request_error`.

Forced tool choice is also no longer supported. A request that requires any tool, or names one tool that must run, returns a 400 error. Automatic and no-tool choices remain supported. Strict tool schemas can constrain the arguments when a tool is selected, but they do not restore the old guarantee that the model will call a particular tool. An agent that relies on a mandatory validation, retrieval or transaction step needs a deterministic host-side check rather than a prompt-level assumption.

Thinking blocks are bound to the model and conversation. Opus 5.5 can read thinking blocks from earlier Opus, Sonnet and Haiku models, but not from the Fable or Mythos families. Some switches in the other direction also lose the earlier reasoning. For newer accounts, changing an earlier system prompt, tool definition or message before replaying a preserved thinking block can produce another 400 error unless the application deliberately opts into dropping the block. A router that changes models mid-conversation therefore needs a compatibility test as well as a list of available model IDs.

Provider surface changes the computer-use work. The earlier `computer_20251124` tool is rejected on the Claude API and Google Cloud, where the newer computer toolset and a corresponding agent-loop update are required. Anthropic says Amazon Bedrock continues to accept the earlier tool with Opus 5.5. The same model name therefore creates different migration work across providers.

These failures are straightforward to catch in a staging preflight. Send representative production request envelopes before measuring output quality. Include every tool-choice form, thinking setting, computer tool, beta header and model-switch path the integration uses. A successful plain-text request proves very little about a tool-using agent.

## Successful requests can still behave differently

Other changes do not fail loudly. Opus 5.5 defaults to `medium` effort, while Opus 5 defaulted to `high`. Anthropic also says the new model tends to think more at the same named effort, especially at `xhigh` and `max`. Leaving effort implicit changes both the model and its configuration. Copying `high` across versions holds the label still, but not necessarily the amount of computation.

Set effort explicitly and test more than one level. The useful setting is the lowest one that clears the acceptance threshold for the team's actual work without unacceptable delay, token use or failure severity, regardless of which setting wins a public average.

Streaming interfaces need a separate check. Text written between tool calls now arrives in thinking blocks. With the default display setting, the returned thinking field is empty. An interface that previously showed those notes as progress can appear silent during a long tool loop even though the request continues normally. This is a usability and operations issue: a person may cancel a healthy run, or leave a stalled one untouched, if the interface no longer distinguishes work from silence.

The response contract also treats a safety refusal as a completed HTTP request. The documentation says it returns HTTP 200 with `stop_reason: "refusal"` and structured stop details. Code that equates status 200 with a usable answer can pass an empty or partial result downstream. Refusal handling belongs in the success path, with an explicit decision to stop, ask for different input or use an approved fallback.

## A fallback-enabled result belongs to the routed system

The [system card][s4] shows why the model label alone can be incomplete. Anthropic's first-party products can automatically route selected cyber, biology and frontier-AI-development requests to another model. On the Claude API, the developer must opt in to server-side fallback or implement a retry path. Other provider surfaces may behave differently.

That routing is part of some published safety evaluations. In Gray Swan's static indirect-prompt-injection benchmark, 18 per cent of Opus 5.5 rollouts were served by Opus 4.8 after a classifier trigger. The share reached 46 per cent in the coding scenarios. None of the 1,310 fallback-served rollouts produced a successful attack in that configuration.

An adaptive coding evaluation produced a different boundary. Without Anthropic's prompt-injection probes, 64 per cent of valid requests were served by Opus 4.8. The reported attack success rate was 85.73 per cent within that fallback subset, while none of the 2,872 requests answered directly by Opus 5.5 succeeded. With the probes enabled, the overall rate fell substantially and every observed success again came from a fallback-served request.

These are evaluation figures, not production incident rates. The two tests use different attacks and safeguard configurations, so neither supports a universal claim that fallback is safe or unsafe. Their practical value is narrower: routing can materially change which model handles a task, and the surrounding probes can materially change the result. Evaluate and monitor the whole path that will ship.

This extends the lesson from recent independent [coding-agent monitor research](/articles/coding-agent-blocking-monitor-red-team/): a model, monitor, router, tool policy and containment boundary form one deployed control system. A strong result from one layer does not validate the others.

## Independent results show task-level trade-offs

[Artificial Analysis][s5] measured Opus 5.5 at max effort with default fallback at 58 on its ten-evaluation Intelligence Index, the highest result it had recorded. Its [model page][s7] reports that the same configuration averaged $5.98 per task. Its release analysis reports about 119,000 output tokens per index task for Opus 5.5 max, compared with about 73,000 for Opus 5 max. The lower token tariff left the two configurations level on task cost at that setting because the new model generated more output.

Artificial Analysis also found four of five Opus 5.5 effort levels on its intelligence-versus-cost frontier. The price cut remains real, but its task-level effect depends on effort and workload. “Twenty per cent cheaper per token” and “cheaper for this completed task” are different statements.

[Sonar's independent Java evaluation][s6] adds a useful workload contrast. Opus 5.5 High passed 87.68 per cent of 544 HumanEval and MBPP tasks with executable tests, against 88.6 per cent for its Opus 5 Thinking baseline. It used 40 per cent fewer output tokens and generated 27.5 per cent less code. Absolute bugs, vulnerabilities and code smells fell, and several blocker-level finding categories improved. Bug density per line rose 11.8 per cent, however, and concurrency findings per million lines rose 44 per cent.

In Sonar's setup, similar functional pass rates came with much less output and fewer total findings, alongside some denser failure categories. Teams whose work involves concurrent Java code should not average that warning away. Teams paying heavily to review verbose output have a plausible efficiency gain to test.

## Run the migration as a controlled change

Start by inventorying the current integration. Record the provider surface, model ID, effort, thinking configuration, tool-choice rules, computer-use version, beta headers, prompt-cache behaviour, retry policy and any cross-model conversation switches. Mark which fields can fail at request validation and which can change behaviour after a successful response.

Then build a small shadow evaluation from real, permitted work. Include routine tasks, long tool loops, a task that must use a specific tool, a conversation that crosses the intended model route, a safe request close to a safeguard boundary and at least one failure that would be costly if it reached production. Define acceptance and prohibited outcomes before running either version.

For each attempt, retain:

- request validation result and structured refusal details;
- explicit effort, input, cache-read and output usage;
- tool calls, schema failures and host-side enforcement;
- progress events and the final response shape;
- configured fallback path and the model that produced each retained result where the surface exposes it;
- elapsed time, retries and human review or correction time; and
- whether the result met the pre-written acceptance rule.

Compare total cost per accepted result, not only token rates. Run enough repeated cases to expose variable failures. Test the same explicit effort across versions, then sweep lower and higher settings where the workload justifies it. Keep Claude API, Bedrock, Google Cloud and Microsoft Foundry results separate because supported tools and fallback behaviour are not identical.

Roll out behind a reversible route. Begin with low-risk traffic, watch validation errors, refusals, silent intervals, tool-selection failures and cost per accepted task, then expand only if the migration thresholds hold. Preserve the Opus 5 route until the rollback test has passed.

This analysis is based on public documentation and independently published evaluations. Index Us did not call the Claude API, run Opus 5 or 5.5, reproduce either benchmark, inspect private tasks or independently verify Anthropic's internal safety findings.

The lower rates and early independent results justify a controlled trial. Production confidence still depends on the complete migration path: request validation, tool use, safeguard routing, accepted-result quality and a tested rollback route.

[s1]: https://x.com/AnthropicAI/status/2102435703535939725
[s2]: https://www.anthropic.com/claude-opus-5-5
[s3]: https://platform.claude.com/docs/en/models/opus-5-5/whats-new-opus-5-5
[s4]: https://anthropic.com/claude-opus-5-5-system-card
[s5]: https://artificialanalysis.ai/articles/claude-opus-5-5
[s6]: https://www.sonarsource.com/blog/claude-opus-5-5-an-evaluation/
[s7]: https://artificialanalysis.ai/models/claude-opus-5-5
