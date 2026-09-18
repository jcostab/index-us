---
title: "Google CC turns household coordination into a shared permission problem"
description: "Google’s experimental CC agent combines selected household information, memory and actions. The test is whether permission holds through sharing, retention and revocation."
publishedAt: 2026-09-18T02:10:00Z
updatedAt: 2026-09-18T02:10:00Z
author: Index Us Editorial
category: Analysis
tags: [agents, privacy, permissions, google, evaluation]
featured: false
draft: false
readingMinutes: 10
keyTakeaways:
  - "Google says each household member chooses what to share with CC, while the agent combines selected material into shared briefs, calendars, tasks and memory."
  - "An agent account makes the system visible, but it does not by itself settle who may disclose another person’s information, how inferred memory is scoped or what revocation removes."
  - "A useful household trial should test provenance, audience, confirmation, correction and departure with synthetic information before relying on the agent for sensitive logistics."
sources:
  - label: "Google Labs — The new CC, an AI agent built for families"
    url: "https://blog.google/innovation-and-ai/models-and-research/google-labs/cc-expanding-to-groups/"
  - label: "Google Labs — Original CC launch"
    url: "https://blog.google/innovation-and-ai/models-and-research/google-labs/cc-ai-agent/"
  - label: "Google Calendar Help — Privacy and sharing basics"
    url: "https://support.google.com/calendar/answer/10366125?hl=en"
  - label: "Ars Technica — Google announces experimental CC agent for families"
    url: "https://arstechnica.com/google/2026/09/google-announces-new-experimental-cc-ai-agent-for-families/"
  - label: "Zou and colleagues — CalBench preprint"
    url: "https://arxiv.org/abs/2605.09823"
newsroom:
  runId: "20260918T020329Z"
  storyId: "google-cc-household-agent-permission-boundary"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

Google has expanded its experimental CC agent from a personal daily organiser into a shared system for households. Up to six people can provide selected emails, files and calendars, plus material sent to CC by email or Google Chat. CC can use that material to assemble a common daily brief, maintain shared events and tasks, pre-fill forms and remember information that applies to the group.

The permission boundary now spans several people. A useful household agent has to combine their information without quietly turning one member’s disclosure into everyone’s knowledge, a temporary detail into durable memory, or permission to prepare an action into permission to complete it.

<figure style="margin: 2.5rem 0;">
  <svg viewBox="0 0 800 560" width="800" height="560" role="img" aria-labelledby="cc-household-art-title cc-household-art-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#f5f3ed;" preserveAspectRatio="xMidYMid meet">
    <title id="cc-household-art-title">Six personal information streams meeting at a bounded household agent</title>
    <desc id="cc-household-art-desc">Six differently marked personal tiles pass through narrow permission gates into a cobalt shared-agent frame. A separate sage memory store and a vermilion external-action stop show that sharing, retention and action are different decisions. Fine charcoal grids and registration marks frame the conceptual system.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <g stroke="#20221f" stroke-width="1" opacity=".13">
      <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800"/>
      <path d="M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560"/>
    </g>
    <path d="M34 70H78M56 48V92M722 468H766M744 446V490" stroke="#20221f" stroke-width="2"/>
    <g stroke="#20221f" stroke-width="2">
      <rect x="62" y="108" width="108" height="74" fill="#cbd3c0"/>
      <rect x="62" y="243" width="108" height="74" fill="#ed512f"/>
      <rect x="62" y="378" width="108" height="74" fill="#e9dfcd"/>
      <rect x="630" y="108" width="108" height="74" fill="#e9dfcd"/>
      <rect x="630" y="243" width="108" height="74" fill="#cbd3c0"/>
      <rect x="630" y="378" width="108" height="74" fill="#ed512f"/>
    </g>
    <g fill="#20221f">
      <circle cx="89" cy="145" r="9"/><rect x="108" y="134" width="40" height="7"/><rect x="108" y="149" width="27" height="4"/>
      <circle cx="89" cy="280" r="9"/><rect x="108" y="269" width="40" height="7"/><rect x="108" y="284" width="27" height="4"/>
      <circle cx="89" cy="415" r="9"/><rect x="108" y="404" width="40" height="7"/><rect x="108" y="419" width="27" height="4"/>
      <circle cx="657" cy="145" r="9"/><rect x="676" y="134" width="40" height="7"/><rect x="676" y="149" width="27" height="4"/>
      <circle cx="657" cy="280" r="9"/><rect x="676" y="269" width="40" height="7"/><rect x="676" y="284" width="27" height="4"/>
      <circle cx="657" cy="415" r="9"/><rect x="676" y="404" width="40" height="7"/><rect x="676" y="419" width="27" height="4"/>
    </g>
    <g stroke="#20221f" stroke-width="3" fill="none">
      <path d="M170 145H244M170 280H244M170 415H244M556 145H630M556 280H630M556 415H630"/>
    </g>
    <g fill="#f5f3ed" stroke="#20221f" stroke-width="2">
      <rect x="222" y="125" width="44" height="40"/><rect x="222" y="260" width="44" height="40"/><rect x="222" y="395" width="44" height="40"/>
      <rect x="534" y="125" width="44" height="40"/><rect x="534" y="260" width="44" height="40"/><rect x="534" y="395" width="44" height="40"/>
    </g>
    <g stroke="#ed512f" stroke-width="5"><path d="M232 145H256M232 280H256M232 415H256M544 145H568M544 280H568M544 415H568"/></g>
    <rect x="266" y="82" width="268" height="356" fill="#345dcc" stroke="#20221f" stroke-width="3"/>
    <rect x="300" y="116" width="200" height="196" fill="#f5f3ed" stroke="#20221f" stroke-width="2"/>
    <circle cx="400" cy="214" r="64" fill="#20221f"/>
    <path d="M365 214H435M400 179V249" stroke="#f5f3ed" stroke-width="10"/>
    <path d="M300 336H500" stroke="#f5f3ed" stroke-width="3"/>
    <rect x="326" y="354" width="148" height="54" fill="#cbd3c0" stroke="#20221f" stroke-width="2"/>
    <path d="M348 372H452M348 390H428" stroke="#20221f" stroke-width="5"/>
    <path d="M400 438V482H548" fill="none" stroke="#20221f" stroke-width="8"/>
    <circle cx="592" cy="482" r="44" fill="#ed512f" stroke="#20221f" stroke-width="3"/>
    <path d="M570 460L614 504M614 460L570 504" stroke="#f5f3ed" stroke-width="8"/>
    <path d="M82 493H184M82 507H148M640 64H724M666 78H724" stroke="#20221f" stroke-width="2"/>
  </svg>
  <figcaption><em>Original illustrative graphic: six personal information streams cross separate permission gates into a shared agent, with memory and external action shown as distinct boundaries. It is a conceptual evaluation map, not Google’s architecture, a product interface or evidence of CC’s performance.</em></figcaption>
</figure>

Google’s [launch page](https://blog.google/innovation-and-ai/models-and-research/google-labs/cc-expanding-to-groups/) was published at 18:15 UTC on 17 September 2026, according to its structured metadata. It describes an early Google Labs experiment for adults using personal Google accounts in the United States. Existing users are due to receive an upgrade, while other people can join a waitlist. Index Us did not receive access or test the product.

## Sharing moves beyond the calendar

The original [CC launch in December 2025](https://blog.google/innovation-and-ai/models-and-research/google-labs/cc-ai-agent/) described one person connecting Gmail, Calendar and Drive so the agent could prepare a daily briefing, draft emails and create calendar links. The new version gives CC its own verified Google account and allows as many as six members to collaborate with it.

Google says each member chooses what to provide. A person can forward one item, share a Drive file or folder, add CC to a calendar, or nominate senders whose future emails should be shared automatically. Google also says each member receives a private weekly list of new senders that could be added to that automatic route.

The outputs cross account boundaries. CC can turn contributed material into a shared daily brief, a family calendar or task list. It can pre-fill a registration PDF, create a shared document and remember preferences or routines. Google says each CC instance runs on an isolated cloud computer, and that it will not act or share outside the group without permission.

Those controls are material, but the launch post alone cannot answer several practical questions. It does not set out how long group memory persists, how a remembered item is attributed to its contributor, whether a member can limit an item to some people in the group, or precisely what is removed when an item is unshared or a person leaves. It also does not describe an activity log for changes made by the agent or distinguish the confirmation required to prepare, save and send a form.

The inspected public launch material leaves prospective users unable to verify those details. This does not establish that the controls are absent.

## Identity does not provide provenance

A separate agent account gives people a recognisable actor. A calendar edit, document or message can be associated with CC rather than appearing to come from one family member. If the product preserves useful history, that identity can improve review and accountability.

Identity does not establish where a fact came from or who may see its consequence. Consider a school email shared automatically because its sender is allowlisted. The message may contain a date that belongs on a common calendar, a child-specific health detail that should not enter a common brief, and an attachment that requires a parent’s signature. Treating the email as one permission object is too coarse for those different uses.

The same problem appears in memory. A household preference such as a regular shopping item may reasonably belong to the group. A dietary restriction, location pattern or appointment can be useful to a task while still belonging to one person. If CC infers a preference from several messages, a useful record would need to show the supporting material, intended audience and a way to correct or remove the inference.

Google’s general [Calendar privacy guidance](https://support.google.com/calendar/answer/10366125?hl=en) says personal calendar content remains private unless the user chooses to share it. It also says shared events inherit the calendar’s privacy settings, while individual event visibility can be changed. That is relevant product context, but it is not a CC-specific account of how source-level permissions carry into group briefs, tasks or memory.

## Coordination success can conceal a privacy failure

The [CalBench preprint](https://arxiv.org/abs/2605.09823) shows why task completion is too narrow a measure for a shared assistant. It places agents in a controlled scheduling task where each one sees only its own calendar. Seven model families had to coordinate meetings while limiting disruption and unnecessary disclosure.

The researchers report that task completion alone missed important failures. Agents could reach a valid schedule while imposing avoidable costs on participants. More communication did not reliably reduce that regret. Conversely, withholding information could protect privacy while preventing the group from distributing disruption fairly. The benchmark is a preprint and does not test CC, Google services, household relationships or real personal data. Its value here is the shape of the evaluation: successful coordination, fair burden and limited disclosure are separate outcomes.

That distinction is easy to lose in a household trial. An agent that correctly schedules an appointment may still expose why one person was unavailable. A complete permission slip may contain stale information drawn from memory. A shared brief may be factually accurate while revealing a private event to more people than necessary. Counting completed tasks would score each case as a success.

## Test permission as a sequence

The [independent Ars Technica report](https://arstechnica.com/google/2026/09/google-announces-new-experimental-cc-ai-agent-for-families/) confirms the public feature set and notes that CC remains a waitlisted experiment for adults with personal Google accounts. It does not provide a hands-on reliability or privacy evaluation. A household considering the experiment should therefore begin with a small trial using synthetic or low-sensitivity material.

Five checks would make that trial more informative:

1. **Trace provenance.** Share similar details through an email, calendar, image and Drive file. Check whether the resulting brief, task and memory show where each detail came from and which member supplied it.
2. **Vary the audience.** Mix genuinely shared logistics with information that should remain personal. Confirm whether the product can preserve that distinction rather than making every contributed detail visible to the full group.
3. **Separate preparation from action.** Ask CC to draft a form, save it, change it and send it as distinct steps. Record when confirmation appears, what the confirmation covers and what happens after cancellation or an error.
4. **Correct and revoke.** Change a fact at its source, remove sharing, delete a remembered preference and then ask related questions again. Check briefs, calendars, tasks, files and memory rather than assuming one removal propagates everywhere.
5. **Test membership changes.** Add and remove a test member. Check what that person could see before, what remains visible afterwards and who can inspect or reverse actions they requested.

The evidence record should include the shared source, audience, agent output, resulting Google object, confirmation screen, correction path and final state. Use invented school dates, dietary preferences and contact details until the behaviour is understood. Keep the trial bounded because this is a Labs experiment, and record failures rather than treating them as harmless.

CC’s new household mode pools selected personal context, turns that context into shared state and can prepare changes across familiar services. Google has documented useful first controls: per-member sharing choices, a distinct account, an isolated cloud computer and permission before external action or sharing outside the group. A household still needs to establish whether those controls hold across the full life of information, from contribution and inference through audience, action, correction and departure, before convenience becomes reliance.

This analysis is based on public documentation, independent reporting and a research preprint about a separate calendar-coordination benchmark. Index Us did not access CC, inspect its interface, test its permissions, review its underlying models or verify how its memory and deletion controls work in practice.
