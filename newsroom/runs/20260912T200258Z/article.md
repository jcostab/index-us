---
title: "OpenAI’s Habitat shows why bounded work matters at scale"
description: "OpenAI’s storage engineering account shows how constrained queries, scheduler visibility and connection-pool feedback can matter more than a headline throughput figure."
publishedAt: 2026-09-13T06:10:27+10:00
updatedAt: 2026-09-13T06:10:27+10:00
author: Index Us Editorial
category: Analysis
tags: [infrastructure, storage, reliability, performance, architecture]
featured: false
draft: false
readingMinutes: 11
keyTakeaways:
  - "OpenAI says Habitat keeps online requests predictable through a deliberately constrained object-and-edge API, while complex analytical queries move to a separate change-data-capture path."
  - "Its Python service exposed two different tail-latency risks: CPU work delayed ready coroutines, and a LIFO connection pool repeatedly directed work towards already-slow processes."
  - "The reusable lesson is to bound request cost, measure scheduling and per-instance load directly, and test whether pooling, retries or deployments reinforce overload."
sources:
  - label: "OpenAI — News RSS"
    url: "https://openai.com/news/rss.xml"
  - label: "OpenAI — Rapidly scaling online storage"
    url: "https://openai.com/index/scaling-storage-one-billion-users-part-one"
  - label: "Google Research — The Tail at Scale"
    url: "https://research.google/pubs/the-tail-at-scale/"
  - label: "Google SRE — Addressing Cascading Failures"
    url: "https://sre.google/sre-book/addressing-cascading-failures/"
  - label: "Meta Engineering — Solving the Mystery of Link Imbalance"
    url: "https://engineering.fb.com/2014/11/14/production-engineering/solving-the-mystery-of-link-imbalance-a-metastable-failure-state-at-scale/"
  - label: "USENIX — TAO distributed graph store paper"
    url: "https://www.usenix.org/system/files/conference/atc13/atc13-bronson.pdf"
  - label: "Envoy — Connection pooling"
    url: "https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/connection_pooling"
  - label: "Envoy — Circuit breaking"
    url: "https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/circuit_breaking"
  - label: "Microsoft Learn — Azure Cosmos DB partitioning"
    url: "https://learn.microsoft.com/en-us/azure/cosmos-db/partitioning"
newsroom:
  runId: "20260912T200258Z"
  storyId: "openai-habitat-bounded-work-feedback-loops"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

OpenAI’s account of Habitat, the online storage platform behind ChatGPT, Codex and other products, points to a useful operating decision: audit how much work one request can create, and where that work can wait, before approving more capacity or a language rewrite. Its largest numbers attract attention, but the transferable evidence is in the controls and failure mechanisms.

The [OpenAI News RSS feed](https://openai.com/news/rss.xml) timestamps the article at 10:00 UTC on 11 September 2026. OpenAI’s [current engineering post](https://openai.com/index/scaling-storage-one-billion-users-part-one) says Habitat serves products used by more than one billion people each week, handles more than 70 million requests per second across almost 40 geographic regions and holds more than 500 petabytes of data. Those are company-reported production figures; Index Us has not independently verified them.

There is also a live source discrepancy. The RSS item’s description says 22 million requests per second, while the current article says more than 70 million. The feed does not explain whether its summary is stale, refers to an earlier point in the system’s growth or is simply wrong. This analysis therefore does not treat either throughput figure as an independently established launch metric. The underlying engineering account remains useful because its mechanisms do not depend on choosing one number.

<figure style="margin: 2.5rem 0;">
  <svg viewBox="0 0 800 560" width="800" height="560" role="img" aria-labelledby="habitat-bounded-art-title habitat-bounded-art-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#f5f3ed;" preserveAspectRatio="xMidYMid meet">
    <title id="habitat-bounded-art-title">Bounded requests passing through a service gate towards stable and unstable storage paths</title>
    <desc id="habitat-bounded-art-desc">A field of cobalt request tokens enters a narrow charcoal service gate. Above, a sage FIFO path distributes work across three storage partitions. Below, a vermilion LIFO loop repeatedly returns work to one overloaded partition. Fine grids and registration marks frame the conceptual system.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <g stroke="#20221f" stroke-width="1" opacity=".13">
      <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800"/>
      <path d="M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560"/>
    </g>
    <rect x="42" y="48" width="716" height="464" fill="none" stroke="#20221f"/>
    <path d="M62 28H102M82 8V48M698 532H738M718 512V552" stroke="#20221f"/>
    <g fill="#345dcc" stroke="#20221f" stroke-width="2">
      <circle cx="105" cy="174" r="19"/><circle cx="151" cy="174" r="19"/><circle cx="197" cy="174" r="19"/>
      <circle cx="105" cy="229" r="19"/><circle cx="151" cy="229" r="19"/><circle cx="197" cy="229" r="19"/>
      <circle cx="105" cy="284" r="19"/><circle cx="151" cy="284" r="19"/><circle cx="197" cy="284" r="19"/>
      <circle cx="105" cy="339" r="19"/><circle cx="151" cy="339" r="19"/><circle cx="197" cy="339" r="19"/>
    </g>
    <path d="M222 256H300" stroke="#20221f" stroke-width="7"/>
    <path d="M222 304H300" stroke="#20221f" stroke-width="2" stroke-dasharray="9 8"/>
    <path d="M286 242L306 256L286 270Z" fill="#20221f"/>
    <rect x="306" y="118" width="92" height="324" fill="#20221f"/>
    <path d="M329 149H375M329 164H362M329 398H375M329 413H354" stroke="#f5f3ed" stroke-width="3"/>
    <circle cx="352" cy="280" r="24" fill="#ed512f"/>
    <path d="M342 280H362M352 270V290" stroke="#f5f3ed" stroke-width="3"/>
    <path d="M398 210H468V126H706" fill="none" stroke="#345dcc" stroke-width="6"/>
    <path d="M691 112L713 126L691 140Z" fill="#345dcc"/>
    <path d="M398 350H468V438H625" fill="none" stroke="#ed512f" stroke-width="6"/>
    <path d="M611 424L633 438L611 452Z" fill="#ed512f"/>
    <g stroke="#20221f" stroke-width="3">
      <rect x="486" y="166" width="70" height="104" fill="#cbd3c0"/>
      <rect x="581" y="166" width="70" height="104" fill="#cbd3c0"/>
      <rect x="676" y="166" width="70" height="104" fill="#cbd3c0"/>
      <path d="M499 190H543M499 207H532M594 190H638M594 207H627M689 190H733M689 207H722"/>
    </g>
    <path d="M521 166V126M616 166V126M711 166V126" stroke="#345dcc" stroke-width="4"/>
    <g stroke="#20221f" stroke-width="3">
      <rect x="486" y="306" width="70" height="104" fill="#e9dfcd"/>
      <rect x="581" y="306" width="70" height="104" fill="#ed512f"/>
      <rect x="676" y="306" width="70" height="104" fill="#e9dfcd"/>
      <path d="M499 330H543M499 347H532M594 330H638M594 347H627M689 330H733M689 347H722"/>
    </g>
    <path d="M626 438C736 491 779 369 711 358" fill="none" stroke="#ed512f" stroke-width="6"/>
    <path d="M723 344L700 356L719 372Z" fill="#ed512f"/>
    <circle cx="616" cy="358" r="39" fill="none" stroke="#20221f" stroke-width="2" stroke-dasharray="7 7"/>
    <path d="M78 90H168M78 100H139M646 474H722M674 484H722" stroke="#20221f" stroke-width="2"/>
  </svg>
  <figcaption><em>Original illustrative graphic: bounded requests pass through a shared service choke point, then separate into a stable distribution path and a self-reinforcing overload loop. It is a conceptual comparison, not OpenAI’s architecture, operational telemetry or measured evidence.</em></figcaption>
</figure>

## Start with a request budget

Habitat began as a Python client library connected to Azure Cosmos DB. OpenAI says that by mid-2025, coordinated updates across dozens of services had become brittle. Moving the logic into a standalone service centralised deployment, observability, routing, access controls and storage policy. From an operator’s perspective, the important change was the new choke point: storage behaviour could be controlled in one service rather than coordinated through library updates across product code.

The service exposes a constrained NoSQL interface for client-defined objects and edges. It does not accept arbitrary SQL, complex joins or unrestricted graph traversal. An object and its outgoing edges share a storage-level partition, although the remote object named by an edge may be in another account or region. Complex analytical and search access goes through change data capture into separate Rockset instances owned and scaled by client teams.

This gives the online path a more predictable request budget, at the cost of expressiveness and extra responsibility for product teams. Some graph operations become inefficient by design. The choice only works when those restrictions match the service’s real access patterns.

Two independent sources help define that trade-off without validating Habitat. The [2013 TAO paper](https://www.usenix.org/system/files/conference/atc13/atc13-bronson.pdf), which OpenAI cites as an inspiration, describes objects, associations, a fixed query set, bounded range calls and sharding that maps a request to one cache server. Current [Azure Cosmos DB partitioning documentation](https://learn.microsoft.com/en-us/azure/cosmos-db/partitioning) explains the corresponding database risk: uneven request distribution can create hot partitions, while a key that does not match read patterns can force cross-partition work. OpenAI has not published enough configuration detail for an external audit of its partition choices. The useful review question is whether the API contract and partition key bound the same work.

## Look for waiting that CPU averages hide

OpenAI says one user action can generate hundreds of database calls. In that shape of system, one delayed call can become visible to the user. Google Research’s [The Tail at Scale](https://research.google/pubs/the-tail-at-scale/) gives the broader context: growth and higher utilisation make temporary latency outliers increasingly important to the response time of a large interactive service.

Habitat’s Python traces reportedly showed that the database was not always where the request waited. `asyncio` allowed I/O to overlap, but routing, compression, encryption, checksumming, health checks, shadowing and hedging still consumed CPU. OpenAI says some high-percentile requests waited for their coroutine to be scheduled again even after the storage response was ready.

The team measured scheduler delay by comparing when periodic work should have run with when it actually ran. OpenAI reports jitter of hundreds of milliseconds at high utilisation and seconds in some edge cases. It kept concurrency low in each process and increased the worker-process count instead.

That response exposed another source of delay. A feature-flag client refreshed a large configuration every minute without jitter, across as many as eight Python processes in each pod. OpenAI says the synchronised JSON parsing stalled all workers. Targeting a smaller configuration, extending the refresh interval and adding jitter removed that identified spike. Aggregate CPU alone would not have explained either problem. Scheduler delay and coordinated background work need their own measurements.

## Trace feedback, not just slow instances

The next failure was not a uniformly overloaded fleet. OpenAI says client-side pooling left some Habitat processes handling five to ten times the average concurrency. After a burst, a subset continued to degrade after the originating client had stopped.

Its explanation is a feedback loop in `aiohttp` connection reuse. A slow process returned its connection later; last-in, first-out reuse then chose that recently returned connection for more work. Capping connection reuse duration reportedly limited the degradation. OpenAI says a first-in, first-out patch broke the loop and reduced steady-state request variance, and that Habitat now relies mainly on Istio and Envoy for pooling and server-load-aware balancing.

A separate [Meta engineering account](https://engineering.fb.com/2014/11/14/production-engineering/solving-the-mystery-of-link-imbalance-a-metastable-failure-state-at-scale/) from 2014 documents a related mechanism in a different system. Its most-recently-used pool kept selecting connections returned over a congested link, preserving the congestion after the initiating event. Meta adopted a least-recently-used policy with a maximum connection age, then repeatedly triggered both the old and new behaviours.

The common lesson is diagnostic, rather than a universal preference for FIFO. Google’s SRE guidance on [cascading failures](https://sre.google/sre-book/addressing-cascading-failures/) describes overload as positive feedback: slower work raises in-flight requests and resource use, while retries or redistribution can intensify the problem. It also describes cases where LIFO request queues can favour work that is still useful. Queue and reuse policies therefore need to be tested against the actual work and feedback path. Realistic overload tests, early rejection and small queues may help, but only where the traffic shape supports them.

## One fix can spend another capacity budget

Reducing concurrency within each Python process increased the number of processes, which then multiplied downstream connections. OpenAI says deployments could produce CPU churn as connections cycled, and a connection leak could exhaust a network address translation gateway. Habitat used Envoy to combine HTTP/1 connections from those processes, multiplex upstream traffic over HTTP/2, and apply central rate limits and circuit breakers.

The current [Envoy pooling documentation](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/connection_pooling) says HTTP/2 pools can carry concurrent requests over one connection, subject to configured limits. Its [circuit-breaking documentation](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/circuit_breaking) covers limits for connections, pending and active requests, retries and concurrent pools. These are descriptions of available controls. They do not disclose OpenAI’s configuration or demonstrate how well it worked.

This is a practical warning for much smaller services. Process count, process concurrency, open connections and downstream capacity are separate budgets. A change that protects the scheduler can consume connection or dependency capacity instead. Tests should include routine deployments, restart waves, leaked connections and retry storms while the dependency is near its limit, not just steady throughput on a healthy system.

## Ask for matched evidence before rewriting

OpenAI says two engineers, using Codex and GPT-5.5, rewrote Habitat in Rust in the second quarter of 2026. The company reports that the Rust service now handles 95 per cent of production requests, uses CPU six times as efficiently and memory 15 times as efficiently as the Python version, and has lower average and tail latency.

The post does not provide the matched workload, hardware baseline, benchmark method or underlying measurements needed to reproduce those comparisons. The figures are OpenAI’s internal results, not a forecast for another service. More useful is the reported sequence: stabilise the service boundary, identify where time and resources are going, address the more urgent feedback risks, then compare implementations against the same accepted workload.

A review before approving a rewrite can be short, but it should cover the whole request path:

1. Enumerate request shapes and reject or isolate work with unbounded fan-out.
2. Measure scheduler delay, queue time and per-instance concurrency alongside aggregate CPU and memory.
3. Slow one destination and observe connection reuse, load balancing, retries and health checks.
4. Exercise deployments and recovery near dependency limits, with circuit breakers and load shedding visible.
5. Review partition keys against access patterns; even distribution and efficient reads may require different choices.

This analysis is based on public documentation. Index Us did not access Habitat, inspect OpenAI’s configuration, reproduce its failures or independently verify its scale and efficiency figures. Independent sources establish that bounded queries, tail latency, hot partitions and feedback failures are established design concerns; they do not verify OpenAI’s account. The immediate action is to audit one latency-sensitive service for unbounded work, hidden waiting and self-reinforcing load before treating a rewrite or more capacity as the primary fix.
