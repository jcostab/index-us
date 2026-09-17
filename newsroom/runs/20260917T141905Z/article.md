---
title: "OpenAI Sponsored Agents turn an ad click into a commercial conversation"
description: "OpenAI is testing advertiser-sponsored agents in ChatGPT. Operators should test persistent disclosure, claim accuracy, data boundaries and safe completion."
publishedAt: 2026-09-17T14:25:31Z
updatedAt: 2026-09-17T14:25:31Z
author: Index Us Editorial
category: Analysis
tags: [openai, advertising, agents, governance, evaluation]
featured: false
draft: false
readingMinutes: 9
keyTakeaways:
  - "Sponsored Agents continue an ad click as a separate, labelled conversation with an advertiser's AI representative; OpenAI is testing the format with selected US advertisers in a limited alpha."
  - "OpenAI's terms make the advertiser responsible for the agent's content, configuration, actions and output, so campaign review has to extend beyond the opening ad creative."
  - "A useful pilot should test whether commercial identity and disclosures persist, product claims stay grounded, data boundaries are clear, and hand-offs or attempted actions end safely."
sources:
  - label: "OpenAI — Reimagining advertising with AI"
    url: "https://openai.com/index/reimagining-advertising-with-ai/"
  - label: "OpenAI — News RSS"
    url: "https://openai.com/news/rss.xml"
  - label: "OpenAI Help Center — Sponsored Agents in ChatGPT Ads"
    url: "https://help.openai.com/en/articles/20001524-sponsored-agents-in-chatgpt-ads"
  - label: "OpenAI — Ad Tools Terms"
    url: "https://openai.com/policies/ad-tools-terms/"
  - label: "OpenAI — Advertising Terms"
    url: "https://openai.com/policies/advertising-terms/"
  - label: "OpenAI — Service terms"
    url: "https://openai.com/policies/service-terms/"
  - label: "OpenAI — Ad policies"
    url: "https://openai.com/policies/ad-policies/"
  - label: "OpenAI — ChatGPT Privacy Settings"
    url: "https://openai.com/consumer-privacy/"
  - label: "Federal Trade Commission — Native Advertising: A Guide for Businesses"
    url: "https://www.ftc.gov/business-guidance/resources/native-advertising-guide-businesses"
  - label: "Lurie et al. — The Beginning of ChatGPT Ads"
    url: "https://arxiv.org/abs/2608.05008"
newsroom:
  runId: "20260917T141905Z"
  storyId: "openai-sponsored-agents-commercial-conversation"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

OpenAI is testing a type of advertisement that does not end when someone clicks it. A Sponsored Agent opens a separate conversation with an AI representative of the advertiser, where a person can ask follow-up questions and then choose whether to visit the business's website.

The [launch announcement](https://openai.com/index/reimagining-advertising-with-ai/) says this conversation will be clearly labelled, distinct from ChatGPT's independent answers and separate from the original ChatGPT conversation. The [OpenAI News RSS feed](https://openai.com/news/rss.xml) timestamps the announcement at 13:00 UTC on 16 September 2026. OpenAI's [help page](https://help.openai.com/en/articles/20001524-sponsored-agents-in-chatgpt-ads) describes a limited alpha for selected advertisers in the United States and says early-access requests are not open.

For an advertiser, that changes the unit that needs to be evaluated. A click-through rate measures whether the opening placement attracted attention, but it cannot show whether the ensuing agent kept its commercial identity visible, answered accurately, handled data appropriately or stopped at the right boundary. Those questions sit across the whole multi-turn system.

<figure style="margin: 2.5rem 0;">
  <svg viewBox="0 0 800 560" width="800" height="560" role="img" aria-labelledby="sponsored-agent-art-title sponsored-agent-art-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#f5f3ed;" preserveAspectRatio="xMidYMid meet">
    <title id="sponsored-agent-art-title">A sponsored message crossing a disclosure gate into a bounded commercial conversation</title>
    <desc id="sponsored-agent-art-desc">A vermilion advertising tile enters a cobalt disclosure gate, then becomes a sequence of alternating message shapes inside a charcoal conversation boundary. A sage data boundary sits below, while a separate hand-off path ends at a visible stop control. Fine grids and registration marks frame the conceptual system.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <g stroke="#20221f" stroke-width="1" opacity=".14">
      <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800"/>
      <path d="M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560"/>
    </g>
    <path d="M38 76H82M60 54V98M718 462H762M740 440V484" stroke="#20221f" stroke-width="2"/>
    <rect x="54" y="174" width="150" height="150" rx="5" fill="#ed512f" stroke="#20221f" stroke-width="3"/>
    <circle cx="129" cy="249" r="42" fill="#f5f3ed" stroke="#20221f" stroke-width="2"/>
    <path d="M106 249H152M129 226V272" stroke="#ed512f" stroke-width="8"/>
    <path d="M204 249H282" stroke="#20221f" stroke-width="12"/>
    <rect x="282" y="120" width="58" height="258" fill="#345dcc" stroke="#20221f" stroke-width="3"/>
    <path d="M298 150H324M298 174H324M298 198H324M298 222H324M298 246H324M298 270H324M298 294H324M298 318H324M298 342H324" stroke="#f5f3ed" stroke-width="5"/>
    <rect x="340" y="92" width="406" height="318" fill="none" stroke="#20221f" stroke-width="3"/>
    <path d="M376 132H710M376 370H710" stroke="#20221f" stroke-width="1.5" opacity=".55"/>
    <path d="M390 160H522Q542 160 542 180V198Q542 218 522 218H390Z" fill="#20221f"/>
    <circle cx="410" cy="189" r="8" fill="#f5f3ed"/>
    <path d="M570 238H692V296H590Q570 296 570 276Z" fill="#cbd3c0" stroke="#20221f" stroke-width="2"/>
    <circle cx="668" cy="267" r="8" fill="#20221f"/>
    <path d="M390 316H548Q568 316 568 336V348H390Z" fill="#345dcc"/>
    <path d="M394 410V470H624" fill="none" stroke="#20221f" stroke-width="10"/>
    <rect x="440" y="432" width="94" height="54" fill="#cbd3c0" stroke="#20221f" stroke-width="2"/>
    <path d="M458 449H516M458 462H498" stroke="#20221f" stroke-width="3"/>
    <circle cx="624" cy="470" r="44" fill="#ed512f" stroke="#20221f" stroke-width="3"/>
    <path d="M602 448L646 492M646 448L602 492" stroke="#f5f3ed" stroke-width="8"/>
    <path d="M85 390H202M85 404H168M648 72H718M670 58V86" stroke="#20221f" stroke-width="2"/>
    <circle cx="224" cy="470" r="9" fill="#345dcc"/>
    <circle cx="252" cy="470" r="9" fill="#cbd3c0" stroke="#20221f"/>
  </svg>
  <figcaption><em>Original illustrative graphic: an ad crosses a visible disclosure gate into a bounded conversation, with a separate data boundary and stop or hand-off control. It is a conceptual evaluation map, not OpenAI's architecture, an interface capture or evidence of agent performance.</em></figcaption>
</figure>

## The commercial source has to remain visible

OpenAI describes the Sponsored Agent as separate from ChatGPT's answer and from the user's original conversation. A pilot still needs to test whether that separation remains clear across the whole interaction.

The US Federal Trade Commission's [native advertising guidance](https://www.ftc.gov/business-guidance/resources/native-advertising-guide-businesses) predates conversational AI, but its underlying test is relevant to this US alpha. The FTC says the overall impression matters and that commercial content should not imply it is independent or comes from a source other than the sponsor. It also says a disclosure may need to appear again on the page reached after a click, close to the advertising message it explains.

A conversational pilot therefore needs to check more than the launch button. The advertiser's identity and commercial purpose should remain obvious after several turns, after scrolling, when an answer is copied or shared, and when the agent refers to products that resemble an independent recommendation. This applies the FTC's general guidance as a test; it is not a finding that the current interface is deceptive. Index Us has not seen the alpha interface.

## Responsibility extends to the agent's answers

The public terms do not treat the agent as a neutral wrapper around approved ad copy. OpenAI's [Ad Tools Terms](https://openai.com/policies/ad-tools-terms/) say the advertiser is deemed the builder and remains responsible for the Sponsored Agent's content, configuration, Actions and output. The agent is also covered by the builder provisions in OpenAI's [Service terms](https://openai.com/policies/service-terms/), which require published information about a GPT to be complete, accurate and not misleading.

The wider [Advertising Terms](https://openai.com/policies/advertising-terms/) place responsibility for campaign settings, instructions, destinations and AI-generated outputs on the customer. They require disclosures and substantiation of claims. OpenAI's [ad policies](https://openai.com/policies/ad-policies/) separately prohibit misleading claims about capabilities, pricing, outcomes, affiliations and comparisons, and require ads to remain distinguishable from the ChatGPT product experience.

Ordinary creative approval is too narrow for this format. A product team should build a claim register for the conversation: prices, availability, dimensions, compatibility, delivery dates, warranties, performance claims and comparisons. For each claim, identify the authoritative source, how often it changes, what the agent should say when data is missing and which claims require a person to approve the response. Test adversarial wording as well as ordinary shopping questions. A compliant opening message does not compensate for an unsupported answer five turns later.

## The privacy boundary needs an interaction map

OpenAI's [consumer privacy page](https://openai.com/consumer-privacy/) says advertisers do not have access to a person's chats, chat history, memories or personal details, and that people can manage ad personalisation. The launch post adds that the Sponsored Agent conversation is separate from the original ChatGPT conversation.

The inspected public launch and help pages do not explain what information from the new sponsored conversation an advertiser can receive, what reporting is available, how long the conversation is retained, or what happens if an agent uses an Action or sends someone to an external site. The terms establish advertiser responsibility for Actions if configured; they do not document the alpha's actual action set.

Before a campaign is judged ready, draw the data path for each transition: original chat to ad, ad to sponsored conversation, sponsored conversation to any connected service, and conversation to website or human follow-up. At each boundary, record what the user sees, what data moves, who receives it, why it is needed, how long it persists and how deletion or correction works. Where the public documentation is silent, the safe conclusion is that the boundary still needs confirmation, not that data either does or does not flow.

## Earlier ad research is a baseline, not a result for agents

The independent preprint [The Beginning of ChatGPT Ads](https://arxiv.org/abs/2608.05008) provides a useful snapshot of the first advertising format. Its authors created 91 controlled accounts and collected more than 3,000 ads from 186 advertisers across 335 prompts. They reported that the ads were clearly separated from ChatGPT's response text and mostly sent users towards an advertiser rather than a specific product.

That study's data collection began in February 2026, and its first version was submitted in August. It did not evaluate Sponsored Agents announced in September. Its value here is methodological: an ad system can be studied across many accounts, prompts and observed outcomes rather than through a handful of screenshots. A conversational format requires an expanded audit unit that includes turns, claims, disclosures, data transfers and completion states.

## Test the path, not only the opening

A small alpha pilot can still produce useful evidence if the acceptance criteria follow the whole interaction.

1. **Commercial identity and disclosure.** Test short and long conversations, mobile and desktop layouts, scrolling, copied excerpts and return visits. Ask independent participants who they think is speaking and whether they understand that the exchange is advertising.
2. **Source and claim control.** Use a fixed set of product questions with known answers, stale catalogue entries, unavailable items and ambiguous requests. Record unsupported claims, incorrect prices, invented policies and failures to express uncertainty.
3. **Data boundaries.** Use synthetic test data to observe every permitted transition. Do not place real customer or sensitive information into an alpha simply to discover where it goes. Confirm the documented retention, access and deletion position before live use.
4. **Actions and hand-off.** If any external action is available, test explicit confirmation, duplicate prevention, cancellation, permission failure and recovery. Test how the agent hands a person to the business, what context follows them and whether the hand-off is clearly identified.
5. **Completion and stop states.** Define what counts as a successful answer, website referral, human escalation, abandonment and failure. Confirm that the agent does not imply a booking, purchase, quote or follow-up is complete when it has only supplied information or a link.
6. **Auditability and outcomes.** Retain the prompt, response, cited business data, policy version, configured tools, transitions and final state. Measure accurate resolved enquiries and safe escalations alongside engagement. A longer conversation is not automatically a better commercial outcome.

OpenAI has announced a limited alpha; it has not published evidence that Sponsored Agents answer accurately or improve sales. Its public terms put substantial responsibility on the advertiser, while the product pages leave important operating details for participants to confirm. Before joining a pilot, a business should decide whether it can evaluate the full sponsored conversation with the same care it applies to claims, privacy and transaction systems. Click-through can remain a campaign metric, but it is no longer the boundary of the campaign.

This analysis is based on public documentation and independent research about the earlier ChatGPT ad format. Index Us did not access or test Sponsored Agents, inspect a live alpha conversation, run a campaign, or verify advertiser-side data and reporting.
