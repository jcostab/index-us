---
title: "Cloudflare separates AI training refusal from search crawler blocking"
description: "Cloudflare's Disallow AI Training setting keeps designated mixed-use crawlers accessible for search while publishing a training preference. Bing and AI summaries remain separate."
publishedAt: 2026-09-16T06:12:02+10:00
updatedAt: 2026-09-16T06:12:02+10:00
author: Index Us Editorial
category: Analysis
tags: [AI-crawlers, search, training, Cloudflare, robots-txt, publishing]
featured: false
draft: false
readingMinutes: 9
keyTakeaways:
  - "Cloudflare's Disallow AI Training setting publishes a no-training preference while allowing designated mixed-use crawlers to continue search access; its Block settings now stop those crawlers, including ordinary search."
  - "Existing Training Block selections are migrated to Disallow AI Training to preserve their previous practical effect, so operators should inspect the resulting Search, Training and Agent settings and their published robots.txt."
  - "Google-Extended and Applebot-Extended are documented use controls, but Cloudflare says its new setting does not yet convey a Bing no-training preference through robots.txt; AI summary controls are separate."
sources:
  - label: "Cloudflare — Accountable mixed-use AI crawlers announcement"
    url: "https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/"
  - label: "Cloudflare — July AI traffic options"
    url: "https://blog.cloudflare.com/content-independence-day-ai-options/"
  - label: "Cloudflare — Bot Preference Sync"
    url: "https://blog.cloudflare.com/bot-preference-sync/"
  - label: "Cloudflare Developers — Bot Management update API"
    url: "https://developers.cloudflare.com/api/resources/bot_management/methods/update/"
  - label: "Apple Support — Applebot controls"
    url: "https://support.apple.com/en-us/119829"
  - label: "Google Developers — common crawlers and Google-Extended"
    url: "https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers"
  - label: "Microsoft Bing — NOARCHIVE and AI use"
    url: "https://blogs.bing.com/webmaster/september-2023/Announcing-new-options-for-webmasters-to-control-usage-of-their-content-in-Bing-Chat"
  - label: "RFC Editor — Robots Exclusion Protocol"
    url: "https://www.rfc-editor.org/rfc/rfc9309.html"
newsroom:
  runId: "20260915T200258Z"
  storyId: "cloudflare-ai-training-search-crawler-choice"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

Cloudflare has introduced a control for publishers who want ordinary search indexing without consenting to model training through the same mixed-use crawler. **Disallow AI Training** publishes a no-training preference while leaving designated crawlers able to reach the site for search. A network block would refuse access to both uses when they share one crawler identity.

In its [15 September announcement](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/), published at 13:00 UTC, Cloudflare also changed what **Block** means. Blocking Training now includes Applebot, Bingbot and Googlebot; their ordinary search access is blocked too. Disallow gives operators a way to state a use preference and retain that access. The preference cannot guarantee that content will never enter a model or an AI answer.

<figure style="margin: 2.5rem 0;">
  <svg viewBox="0 0 800 560" width="800" height="560" role="img" aria-labelledby="crawler-choice-art-title crawler-choice-art-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#f5f3ed;" preserveAspectRatio="xMidYMid meet">
    <title id="crawler-choice-art-title">One mixed-use crawler route divided into search access and a published training preference</title>
    <desc id="crawler-choice-art-desc">A single cobalt crawler enters from the left and splits into two geometric routes. The upper route remains open toward a search index. The lower vermilion route reaches a declaration plate rather than a network stop. The framed paths represent a site operator's policy choice, not measured crawler behaviour.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <g stroke="#20221f" stroke-width="1" opacity=".13">
      <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800"/>
      <path d="M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560"/>
    </g>
    <rect x="44" y="52" width="712" height="456" fill="none" stroke="#20221f"/>
    <path d="M64 32H104M84 12V52M696 528H736M716 508V548" stroke="#20221f"/>
    <circle cx="170" cy="280" r="82" fill="#345dcc" stroke="#20221f" stroke-width="3"/>
    <path d="M139 280H201M170 249V311" stroke="#f5f3ed" stroke-width="8"/>
    <path d="M252 280H345" stroke="#345dcc" stroke-width="15"/>
    <circle cx="345" cy="280" r="24" fill="#20221f"/>
    <path d="M345 280C410 280 410 166 476 166H662" stroke="#345dcc" stroke-width="15" fill="none"/>
    <path d="M345 280C410 280 410 394 476 394H608" stroke="#ed512f" stroke-width="15" fill="none"/>
    <path d="M476 166H662" stroke="#f5f3ed" stroke-width="2" stroke-dasharray="11 12"/>
    <rect x="643" y="101" width="82" height="130" rx="41" fill="#cbd3c0" stroke="#20221f" stroke-width="3"/>
    <path d="M668 158L682 172L702 147" fill="none" stroke="#20221f" stroke-width="7"/>
    <rect x="588" y="344" width="133" height="100" fill="#f5f3ed" stroke="#20221f" stroke-width="3"/>
    <path d="M609 367H701M609 384H685M609 401H694M609 418H665" stroke="#ed512f" stroke-width="6"/>
    <path d="M573 394H588" stroke="#ed512f" stroke-width="15"/>
    <path d="M519 146V186M510 146H528M510 186H528M519 374V414M510 374H528M510 414H528" stroke="#20221f" stroke-width="2"/>
    <path d="M82 102H143M82 110H126M657 468H719M678 476H719" stroke="#20221f" stroke-width="2"/>
    <circle cx="107" cy="449" r="8" fill="#ed512f"/>
    <circle cx="132" cy="449" r="8" fill="#cbd3c0" stroke="#20221f"/>
  </svg>
  <figcaption><em>Original illustrative graphic: one crawler identity carries separate search and training uses. The open search route and declared training preference are a conceptual policy choice, not a network trace or proof of compliant crawler behaviour.</em></figcaption>
</figure>

## The choice changes because one crawler can have two uses

Cloudflare classifies crawler activity as **Search**, **Training** or **Agent**. Search builds an index; Training feeds model development; Agent refers to a user-directed fetch or browser-use visit. The announcement addresses Search and Training when one crawler combines them. Cloudflare did not add a Disallow option for Agent traffic, citing the absence of an established preference directive comparable to a training opt-out.

Before this change, Cloudflare's [July AI traffic options](https://blog.cloudflare.com/content-independence-day-ai-options/) planned to subject mixed-use crawlers to the most restrictive applicable behaviour setting from 15 September. If a site blocked training, that approach could also stop a shared search crawler. The new arrangement distinguishes refusal of **use** from refusal of **access**. Under Disallow AI Training, Cloudflare says its [Bot Preference Sync](https://blog.cloudflare.com/bot-preference-sync/) publishes applicable no-training directives in `robots.txt`, allows designated "Accountable" mixed-use crawlers for search, and blocks other training crawlers. Cloudflare's designation includes operators with current controls or a commitment to provide them; it should not be read as an independent audit of every downstream use.

Choosing **Block** takes the access route instead. Cloudflare says both Block and **Block on pages with ads** now apply to mixed-use crawlers. A full Training Block stops Applebot, Bingbot and Googlebot from reaching the site, including for ordinary search. The ads-only setting blocks them on pages Cloudflare detects as serving ads, so those pages also lose crawler access. Search and Agent controls, another firewall rule or a manually maintained robots policy can impose additional limits. A Training choice alone does not override those other settings.

There is a technical boundary between those routes. The [Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309.html) defines crawler-access preferences in `robots.txt`; RFC 9309 says it is not access authorisation or a substitute for application security. A published no-training rule cannot identify the requestor, verify what a crawler later does with data, or stop a client that ignores it. Cloudflare can classify and block traffic at its edge. An operator needs to distinguish that access refusal from a use preference honoured by a cooperating crawler.

## Migration preserves the old effect, but the labels have changed

An existing AI blocking selection may have changed its label. Cloudflare says domains using granular Search, Training and Agent controls retain the practical effect of their selections: previous Training **Block** and **Block on pages with ads** choices migrate to **Disallow AI Training**. Search and Agent selections carry over. The mapping avoids suddenly removing search access from sites whose old training rule did not block mixed-use crawlers. An operator who now wants to stop those crawlers needs to select the new Block deliberately.

For domains that used only the legacy **Block AI Bots** switch, Cloudflare's [transition table](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/) maps the old Block or ads-only choice to Search **Allow**, Training **Disallow AI Training** and Agent **Block on pages with ads**. A previously unselected switch maps all three to Allow. Cloudflare is deprecating its earlier Managed Robots.txt feature in favour of Bot Preference Sync. It says it will prompt existing Managed Robots.txt customers to review and confirm their preferences before transitioning. The [Bot Management API documentation](https://developers.cloudflare.com/api/resources/bot_management/methods/update/) now exposes `ai_training: "disallow"` and `bot_preference_sync_enabled`. Those documented fields and the announcement establish the intended product configuration; Index Us did not sign in to a customer dashboard or verify any individual domain's migrated state.

For new domains, Cloudflare's recommended preset depends on whether the site monetises pages using ads. Its published table offers Search Allow for both types. For ad-supported sites it offers Training Disallow AI Training and Agent Block on pages with ads; for other sites it offers Allow for those two categories. These are editable recommendations, not an assertion that every site will receive a permanent policy. An operator should inspect the resulting settings after onboarding, especially when its existing `robots.txt` includes custom crawler rules.

## Apple and Google have documented use controls; Bing remains a gap

The mixed-use route depends on each crawler operator's stated separation of uses. [Apple's Applebot documentation](https://support.apple.com/en-us/119829) says a `robots.txt` rule for **Applebot-Extended** controls use of Applebot-crawled pages for training Apple's foundation models. Applebot-Extended does not make separate page requests; it acts as a use signal. Apple says disallowing it does not remove pages from search results or affect Apple Search ranking. Apple's page-level `nosnippet` and paywall signals govern parts of generative output separately, so a training opt-out is not a general summary opt-out.

[Google's crawler documentation](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) similarly describes **Google-Extended** as a `robots.txt` product token rather than a separate HTTP user agent. Google says its preference governs training future Gemini models and grounding certain Gemini products from the Search index, without affecting inclusion or ranking in Google Search. That makes the practical consequence broader than model training alone for those named Gemini uses. It does not establish how every Google AI search feature will treat a site, and Cloudflare's mention of a separate generative-search toggle should not be mistaken for the Disallow AI Training setting.

The unresolved exception is Bing. Cloudflare says Microsoft's documented **NOARCHIVE** page meta tag can express a no-training preference and that Microsoft is working on domain-level `robots.txt` support targeted for early 2027. Until then, Cloudflare says selecting Disallow AI Training **does not automatically convey a Bing no-training preference through `robots.txt`**. This is the same practical gap its earlier Training Block had for Bingbot. Microsoft's [2023 NOARCHIVE explanation](https://blogs.bing.com/webmaster/september-2023/Announcing-new-options-for-webmasters-to-control-usage-of-their-content-in-Bing-Chat) says tagged content is excluded from Bing Chat answers and foundation-model training while ordinary Bing search can still index it. A publisher who also wants AI answer inclusion faces a separate tradeoff. Because that explanation is dated, a site deciding today should recheck current Bing controls and its page metadata before changing policy.

## Check the resulting policy against the outcome you want

For a publisher, the immediate work is to define the desired result per channel before moving a setting. Traditional search discovery, model training and AI-generated summaries are different uses. A site may want search referrals while refusing training; it may also want to appear in AI summaries with citations, or refuse excerpts from a particular page. Cloudflare's new setting does not settle all three choices at once, and it does not give the site control over material already collected.

Start with the domain's current Search, Training and Agent selections, then compare them with Cloudflare's migration table. Inspect the public `robots.txt` that Bot Preference Sync emits, preserving unrelated custom directives. Check representative ad-supported and non-ad pages for the intended network treatment; the ads-only option relies on Cloudflare's page classification. Check the site in ordinary search before and after any change, and use the crawler operators' documented dashboards or controls to verify their stated handling of training and generated answers. Log what was observed rather than treating an announced migration as proof that a particular account changed correctly.

There is also a decision about trust. Disallow AI Training is a suitable preference when the operator is willing to rely on a mixed-use crawler's documented separation of uses while keeping its search access. Block is the stronger access refusal but can remove ordinary search visibility. The Bing exception needs a page-level or operator-specific decision for now. Cloudflare's release makes that tradeoff explicit; it does not eliminate the need to test the settings, read each crawler's actual terms and decide what exposure the site can accept.

This analysis is based on the linked public announcements and documentation. Index Us did not test Cloudflare dashboard rollout, migrate a customer account, inspect private crawler logs or verify downstream training behaviour.
