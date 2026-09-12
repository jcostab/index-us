---
title: "terms.txt proposes a negotiation layer for agentic web access"
description: "A new preprint proposes a web-access exchange for identity, purpose, delegation, payment and receipts. The boundary is useful; interoperability and production evidence are limited."
publishedAt: 2026-09-13T00:08:41+10:00
updatedAt: 2026-09-13T00:08:41+10:00
author: Index Us Editorial
category: Analysis
tags: [agents, web-access, protocols, standards, content-licensing]
featured: false
draft: false
readingMinutes: 8
keyTakeaways:
  - "terms.txt combines a readable policy file with signed identity and intent, optional delegation and payment, and origin-signed receipts; none of those pieces proves what happens to content after delivery."
  - "Its reference implementation is a v0.1 prototype tested on one shared CPU over loopback, without TLS or live settlement, so its latency figures do not establish production performance."
  - "Use the proposal as a requirements checklist for machine access, while treating robots.txt and AIPREF as preferences, Web Bot Auth as draft identity work and payment as a separate commercial system."
sources:
  - label: "arXiv — cs.AI updates RSS"
    url: "https://rss.arxiv.org/rss/cs.AI"
  - label: "Chowdhury — terms.txt preprint"
    url: "https://arxiv.org/html/2609.11152"
  - label: "terms.txt — v0.1 reference implementation"
    url: "https://github.com/rch0wdhury/terms-txt"
  - label: "IETF — Web Bot Auth protocol draft"
    url: "https://datatracker.ietf.org/doc/draft-ietf-webbotauth-httpsig-protocol/"
  - label: "IETF — Web Bot Auth working-group charter"
    url: "https://datatracker.ietf.org/wg/webbotauth/about/"
  - label: "IETF — AIPREF vocabulary draft"
    url: "https://datatracker.ietf.org/doc/draft-ietf-aipref-vocab/"
  - label: "IETF — AIPREF HTTP attachment draft"
    url: "https://datatracker.ietf.org/doc/draft-ietf-aipref-attach/"
  - label: "RFC Editor — Robots Exclusion Protocol"
    url: "https://www.rfc-editor.org/rfc/rfc9309.html"
  - label: "Cloudflare — Introducing Pay Per Crawl"
    url: "https://blog.cloudflare.com/introducing-pay-per-crawl/"
  - label: "Cloudflare — New AI traffic options"
    url: "https://blog.cloudflare.com/content-independence-day-ai-options/"
  - label: "Pew Research Center — AI summaries and search clicks"
    url: "https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/"
newsroom:
  runId: "20260912T140303Z"
  storyId: "terms-txt-agentic-web-access"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

`robots.txt` can tell a co-operative crawler where not to go. It cannot verify who is asking, distinguish a research assistant from a training crawler on the same path, negotiate a price or produce evidence of the terms under which a response was served.

A new preprint proposes putting those decisions into one origin-controlled exchange. The [arXiv cs.AI feed](https://rss.arxiv.org/rss/cs.AI) announced Rajarshi Chowdhury’s [`terms.txt` paper](https://arxiv.org/html/2609.11152) at 04:00 UTC on 12 September 2026. Its design combines a readable policy file with Web Bot Auth signatures, a signed statement of intended use, optional user delegation and payment vouchers, plus signed receipts.

The useful contribution is the way the proposal exposes the joins between those mechanisms. The paper remains a single-author preprint, and the accompanying software describes itself as a version 0.1 prototype. The inspected sources do not establish adoption, a deployed market or truthful declarations from automated clients. Teams deciding how agents may use their sites should treat it as a concrete requirements proposal to test and debate, not a protocol to install unchanged.

<figure style="margin: 2.5rem 0;">
  <svg viewBox="0 0 800 560" width="800" height="560" role="img" aria-labelledby="terms-txt-art-title terms-txt-art-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#f5f3ed;" preserveAspectRatio="xMidYMid meet">
    <title id="terms-txt-art-title">A signed machine request crossing identity, terms and payment gates</title>
    <desc id="terms-txt-art-desc">A cobalt request token moves from an automated client through three distinct geometric gates for identity, access terms and payment. A vermilion refusal route stops outside the origin, while a sage receipt path returns to an append-only ledger. Fine grids and registration marks frame the conceptual exchange.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <g stroke="#20221f" stroke-width="1" opacity=".13">
      <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800"/>
      <path d="M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560"/>
    </g>
    <rect x="42" y="52" width="716" height="456" fill="none" stroke="#20221f"/>
    <path d="M62 32H102M82 12V52M698 528H738M718 508V548" stroke="#20221f"/>
    <g stroke="#20221f" stroke-width="3">
      <circle cx="102" cy="280" r="52" fill="#345dcc"/>
      <path d="M82 280L96 294L124 266" fill="none" stroke="#f5f3ed" stroke-width="7"/>
      <path d="M154 280H658" fill="none"/>
      <rect x="184" y="164" width="76" height="232" fill="#cbd3c0"/>
      <circle cx="222" cy="280" r="22" fill="#f5f3ed"/>
      <path d="M222 263V297M205 280H239"/>
      <rect x="342" y="164" width="76" height="232" fill="#e9dfcd"/>
      <path d="M363 247H397V313H363Z" fill="#f5f3ed"/>
      <path d="M371 265H389M371 280H389M371 295H384"/>
      <rect x="500" y="164" width="76" height="232" fill="#ed512f"/>
      <circle cx="538" cy="280" r="24" fill="#f5f3ed"/>
      <path d="M538 258V302M523 269H548M523 291H548"/>
      <path d="M658 222L720 280L658 338L596 280Z" fill="#20221f"/>
      <circle cx="658" cy="280" r="15" fill="#cbd3c0" stroke="#cbd3c0"/>
    </g>
    <path d="M222 164V115H604" fill="none" stroke="#ed512f" stroke-width="5" stroke-dasharray="10 9"/>
    <path d="M604 115L584 101V129Z" fill="#ed512f"/>
    <g transform="translate(594 74)" stroke="#20221f" stroke-width="2">
      <rect width="122" height="76" fill="#f5f3ed"/>
      <path d="M17 21H105M17 36H88M17 51H62"/>
      <circle cx="101" cy="57" r="8" fill="#ed512f"/>
    </g>
    <path d="M658 338V452H273" fill="none" stroke="#345dcc" stroke-width="5"/>
    <path d="M273 452L295 438V466Z" fill="#345dcc"/>
    <g transform="translate(86 414)" stroke="#20221f" stroke-width="2">
      <rect width="187" height="76" fill="#cbd3c0"/>
      <path d="M22 21H165M22 37H138M22 53H154"/>
      <circle cx="164" cy="53" r="8" fill="#f5f3ed"/>
    </g>
    <path d="M380 396V462" stroke="#ed512f" stroke-width="4" stroke-dasharray="8 8"/>
    <path d="M366 444L380 464L394 444" fill="none" stroke="#ed512f" stroke-width="4"/>
    <path d="M74 92H144M74 101H121M642 470H724M666 479H724" stroke="#20221f" stroke-width="2"/>
  </svg>
  <figcaption><em>Original illustrative graphic: a machine request crosses separate identity, terms and payment gates before the origin returns a receipt. It is a conceptual exchange, not the proposed protocol’s architecture, a deployment record or measured performance evidence.</em></figcaption>
</figure>

## One exchange joins five different decisions

The proposed file lives at `/.well-known/terms.txt`. A site can set rules by path and purpose, including whether an unsigned request is allowed or challenged, whether search or agent access is allowed, whether training is denied or charged, and whether a delegated entitlement is required.

The file does not enforce itself. In the [paper’s exchange](https://arxiv.org/html/2609.11152), an automated client signs the HTTP request with its operator key and covers an `Access-Intent` header declaring purpose and use. It can also attach a user-delegation token and a payment voucher. The origin verifies those inputs, evaluates the applicable terms and either serves content with a signed receipt, asks for payment with HTTP 402, rejects an identity failure with 401 or refuses the policy decision with 403.

Receipts are intended to record who received which path, under which declared purpose, terms version and timestamp. The proposal chains them locally so later changes are detectable. This gives an origin a better audit trail than a line in `robots.txt`, but it does not observe downstream training, copying or redistribution. A valid signature establishes control of a published signing key. A signed purpose establishes who made the declaration, not whether the declaration is honest.

The [released repository](https://github.com/rch0wdhury/terms-txt) makes the proposal inspectable. It contains a dependency-free Node.js implementation, a parser, an origin policy point, a local key-directory resolver, 24 harness checks and raw benchmark results. It also states the missing pieces directly: the grammar, delegation token and receipt format remain open for standardisation.

## The adjacent standards cover narrower problems

The mechanisms composed by `terms.txt` are at different stages of development and cover narrower parts of the exchange.

The current [Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309.html) standardises `User-agent`, `Allow` and `Disallow` matching. RFC 9309 says those rules are not access authorisation and warns that the file is not a substitute for application-layer security. It remains useful as a crawler preference and discovery convention; it cannot authenticate the named crawler or charge it.

The IETF AI Preferences work adds a more expressive vocabulary. The current [vocabulary draft](https://datatracker.ietf.org/doc/draft-ietf-aipref-vocab/) defines categories including model training and search, while the companion [attachment draft](https://datatracker.ietf.org/doc/draft-ietf-aipref-attach/) puts preferences into an HTTP `Content-Usage` field or `robots.txt`. Both are active Internet-Drafts, not RFCs. The vocabulary also states that it does not ensure preferences are followed or decide the legal, technical or contractual mechanism behind compliance.

Web Bot Auth addresses identity. Its current [working-group protocol draft](https://datatracker.ietf.org/doc/draft-ietf-webbotauth-httpsig-protocol/) uses HTTP Message Signatures and an HTTPS key directory so an origin can verify that a holder of a key published for a URL signed the covered request. The draft explicitly leaves authorisation, delegation and trust out of scope. The [working-group charter](https://datatracker.ietf.org/wg/webbotauth/about/) also excludes end-user authentication and a vocabulary for bot intent. An origin can use verified identity in its own policy, but the draft does not supply the policy.

Together, these documents leave identity, stated preference, authorisation, commercial settlement and evidence of delivery as distinct questions. `terms.txt` is an author’s proposed way to join them at the request boundary. It is not an IETF document, and the adjacent IETF documents can change or expire before becoming standards.

## Cloudflare combines related controls without supplying interoperability

Cloudflare already combines several related controls at its edge. Its [Pay Per Crawl private beta](https://blog.cloudflare.com/introducing-pay-per-crawl/) lets a publisher allow, block or set a site-wide price for an authenticated crawler. A charged crawler can receive HTTP 402 with a price and retry with a `crawler-exact-price` header confirming the stated price. Cloudflare records successful charged requests, bills the crawler, pays the publisher and acts as merchant of record.

Its newer [AI traffic options](https://blog.cloudflare.com/content-independence-day-ai-options/) separate Search, Agent and Training classifications. Cloudflare says those controls are live, while its `use=immediate`, `reference` or `full` addition to Content Signals remains a preference in managed `robots.txt`. It plans different defaults for new domains from 15 September 2026 and says multi-purpose crawlers will be governed by the most restrictive applicable setting.

These are Cloudflare product rules, not a vendor-neutral exchange that any origin and crawler already understand. Cloudflare’s design shows one way to stretch the old allow-or-disallow model across identity, purpose, access and compensation. It also shows why protocol design should not freeze the current commercial unit: Cloudflare’s system starts with a price per fetch, while the value of an answer, transaction or delegated task may not track request count.

The underlying economic concern is not only a vendor claim. [Pew Research Center](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/) analysed 68,879 Google searches by 900 consenting US adults in March 2025. It found a traditional-result click in 8 per cent of visits with an AI summary, compared with 15 per cent without one; links cited inside a summary were clicked in 1 per cent of visits with a summary. The study does not establish causation, and it reconstructed result pages in April rather than capturing the exact page each participant saw. It supports the narrower conclusion that referrals can differ when answer-like summaries appear, not that a particular access or payment protocol will repair publisher economics.

## The performance result is a laboratory baseline

The [preprint reports](https://arxiv.org/html/2609.11152) added median latency from 0.201 milliseconds for identity only to 0.650 milliseconds for a charged request with voucher, receipt and log. Those numbers are specific to the author’s benchmark: five runs at concurrency one and five at 32, with 10,000 measured requests per scenario after 3,000 warm-ups.

The benchmark shared one 2.1 GHz Xeon vCPU between the load generator and server processes. Requests travelled over loopback without TLS. Headers were pre-signed, so client signing was excluded. In the [reference implementation](https://github.com/rch0wdhury/terms-txt), the key directory was fetched from a local resolver, payment vouchers stood in for settlement, and receipts were written to a local hash chain rather than an externally anchored store. The inspected sources report no multi-origin interoperability exercise or field deployment.

The author’s results show where cryptographic work occurs in the reference path under those conditions. They do not establish Internet latency, production throughput, settlement reliability or the operational cost of remote key discovery, TLS termination, persistent storage, abuse handling and key rotation. Index Us did not run the code or reproduce the figures.

## Use the proposal as a requirements checklist

For a site operator, the proposal is most useful today as a requirements checklist. Start by checking whether machine access is still being treated as one undifferentiated crawler problem.

Separate the decisions the proposal makes visible:

1. **Identity:** decide which automated clients need to identify an operator cryptographically and what unsigned clients may access. If piloting Web Bot Auth, pin the draft version and test key rotation, expiry, replay, discovery failure and proxy rewriting.
2. **Purpose and use:** record distinct policy for search indexing, model training, real-time agent retrieval and delegated actions. Treat purpose as a declaration that can support auditing and revocation, not a verified description of future behaviour.
3. **Delegation:** define how an agent proves that a user is entitled to a protected resource without turning the bot operator’s identity into the user’s identity. Scope tokens to an audience, path or action and short lifetime; do not assume Web Bot Auth supplies this layer.
4. **Enforcement:** keep public preferences separate from the controls that actually return content, challenge a request or refuse it. A readable policy file is useful for discovery, but the origin, gateway or CDN still makes the decision.
5. **Accounting:** decide what a receipt proves, who stores it, how both sides reconcile it and what happens after misuse. Do not confuse evidence of delivery with evidence of compliant use, or a payment event with a licence that enforces itself.

A responsible trial would begin in observation mode on non-sensitive paths. Measure signature-verification cost, directory failures, false refusals, cache effects and the proportion of traffic that participates. Test at least two independent clients and two origin implementations over real TLS before making interoperability claims. Keep commercial terms and legal interpretation under separate review.

The proposal becomes materially stronger if a standards venue takes up a grammar, request-intent field, delegation model and receipt format; independent implementations interoperate; and a field study measures remote discovery, settlement and misuse under real traffic. Until then, use it to draw the system boundary and keep each component open to replacement. Automated web access needs more than a preference file, but combining the missing pieces remains a design argument rather than an established protocol.
