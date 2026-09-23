---
title: "Google's private AI memory design keeps device-held keys, with two audit gaps"
description: "Google designed persistent cloud memory around device-held keys and attested enclaves. A commissioned audit leaves deletion and response-hash limits to verify."
publishedAt: 2026-09-24T06:10:47+10:00
updatedAt: 2026-09-24T06:10:47+10:00
author: Index Us Editorial
category: Analysis
tags: [privacy, security, memory, agents, google]
featured: false
draft: false
readingMinutes: 10
keyTakeaways:
  - "Google says Private AI Compute will add persistent, per-user memory that can be decrypted only inside attested hardware with keys held on a person's devices."
  - "A Google-commissioned Trail of Bits review found no employee path to plaintext in the code it examined, but deletion rollback and hashed response chunks outside the trusted boundary remained unresolved."
  - "Before enabling a memory-backed assistant, verify the actual product, client and build against the reviewed design, then test device recovery, revocation, deletion and telemetry behaviour."
sources:
  - label: "Google DeepMind — Advancing Private AI Compute with secure, server-side memory"
    url: "https://deepmind.google/blog/advancing-private-ai-compute-with-secure-server-side-memory/"
  - label: "Google — Private AI Compute technical brief"
    url: "https://services.google.com/fh/files/misc/private_ai_compute_technical_brief.pdf"
  - label: "Trail of Bits — Google Private AI Compute secure server-side memory assessment"
    url: "https://github.com/trailofbits/publications/blob/master/reviews/2026-09-google-secure-memory-securityreview.pdf"
  - label: "Project Oak — private memory source"
    url: "https://github.com/project-oak/oak/tree/main/oak_private_memory"
newsroom:
  runId: "20260923T200455Z"
  storyId: "google-private-ai-memory-verification-boundary"
  disclosure: "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication."
---

Google has published a design for giving cloud-hosted AI assistants persistent memory while keeping the decryption keys on a person's devices. The change matters because Private AI Compute was built around short-lived processing. A memory-backed assistant needs to retain context between requests, across sessions and potentially across devices.

The security claim is stronger than ordinary encryption at rest. Google says its new per-user memory can be decrypted only inside approved confidential-computing workloads after attestation. A [commissioned Trail of Bits assessment][s3] found no mechanism in the reviewed code for Google employees to read user data. It also found limits that should remain visible in any product decision: the reviewed system could not cryptographically prove that a deleted memory would never return, and hashes derived from some response text still left the trusted computing boundary.

Google published the [architecture page][s1] at 16:00:57 UTC on 23 September 2026, but it is not a general product-availability notice. The post says Google is sharing how it *will* bring private server-side memory to the platform. It does not identify the first consumer feature, its launch date or the controls a user will receive. Buyers and security teams can evaluate the design now. They cannot yet assume that every future Google assistant carrying a memory label uses the reviewed path.

<figure style="margin:2.5rem 0;">
  <svg viewBox="0 0 800 560" width="800" height="560" role="img" aria-labelledby="private-memory-art-title private-memory-art-desc" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#f5f3ed;" preserveAspectRatio="xMidYMid meet">
    <title id="private-memory-art-title">A device key opens an attested memory vault while two audit paths remain outside the seal</title>
    <desc id="private-memory-art-desc">An off-white technical grid frames a cobalt device key, a sage attestation gate and a charcoal circular vault holding encrypted records. A vermilion loop returns one deleted record towards storage, while a dotted cobalt path carries small hash blocks across the trusted boundary. Registration marks and measurement ticks surround the conceptual system.</desc>
    <rect width="800" height="560" fill="#f5f3ed"/>
    <g stroke="#20221f" stroke-width="1" opacity=".12">
      <path d="M0 56H800M0 112H800M0 168H800M0 224H800M0 280H800M0 336H800M0 392H800M0 448H800M0 504H800"/>
      <path d="M80 0V560M160 0V560M240 0V560M320 0V560M400 0V560M480 0V560M560 0V560M640 0V560M720 0V560"/>
    </g>
    <rect x="42" y="44" width="716" height="472" fill="none" stroke="#20221f" stroke-width="2"/>
    <g fill="none" stroke="#20221f" stroke-width="2">
      <path d="M22 86H62M42 66V106M738 454H778M758 434V474"/>
      <circle cx="42" cy="44" r="6" fill="#ed512f"/>
      <circle cx="758" cy="516" r="6" fill="#345dcc"/>
    </g>
    <g stroke="#20221f" stroke-width="3">
      <path d="M92 250L158 184L224 250L158 316Z" fill="#345dcc"/>
      <circle cx="158" cy="250" r="24" fill="#f5f3ed"/>
      <path d="M158 226V274M134 250H182" stroke="#345dcc" stroke-width="8"/>
      <path d="M224 250H286" fill="none" stroke="#20221f" stroke-width="13"/>
      <path d="M262 250V224H286V276H262" fill="#f5f3ed"/>
    </g>
    <g stroke="#20221f" stroke-width="3">
      <rect x="286" y="151" width="88" height="198" rx="42" fill="#cbd3c0"/>
      <path d="M310 199H350M310 224H350M310 276H350M310 301H350"/>
      <circle cx="330" cy="250" r="18" fill="#ed512f"/>
      <path d="M374 250H416" stroke-width="13"/>
    </g>
    <g stroke="#20221f" stroke-width="3">
      <circle cx="520" cy="250" r="132" fill="#20221f"/>
      <circle cx="520" cy="250" r="99" fill="#e9dfcd"/>
      <circle cx="520" cy="250" r="65" fill="#f5f3ed"/>
      <path d="M478 209H562V291H478Z" fill="#cbd3c0"/>
      <path d="M491 225H549M491 250H549M491 275H536" stroke-width="7"/>
      <circle cx="520" cy="250" r="11" fill="#ed512f"/>
    </g>
    <path d="M416 250H455" stroke="#20221f" stroke-width="13"/>
    <path d="M651 116V384" stroke="#20221f" stroke-width="3" stroke-dasharray="8 8"/>
    <path d="M638 140H664M638 360H664" stroke="#20221f" stroke-width="2"/>
    <g fill="#345dcc" stroke="#20221f" stroke-width="2">
      <rect x="669" y="208" width="24" height="24"/>
      <rect x="704" y="238" width="18" height="18"/>
      <rect x="674" y="273" width="28" height="28"/>
    </g>
    <path d="M600 214C628 214 638 220 669 220M604 250C642 250 656 247 704 247M600 284C632 284 647 287 674 287" fill="none" stroke="#345dcc" stroke-width="3" stroke-dasharray="7 7"/>
    <path d="M543 381C543 445 449 462 394 421C361 396 374 356 414 344" fill="none" stroke="#ed512f" stroke-width="10"/>
    <path d="M399 330L424 340L407 361Z" fill="#ed512f" stroke="#20221f" stroke-width="2"/>
    <rect x="509" y="365" width="36" height="31" fill="#f5f3ed" stroke="#20221f" stroke-width="3"/>
    <path d="M515 374H539M515 383H532" stroke="#20221f" stroke-width="3"/>
    <path d="M84 112H176M84 124H142M612 432H716M646 444H716" stroke="#20221f" stroke-width="2"/>
    <path d="M257 390V452M249 390H265M249 452H265" stroke="#20221f" stroke-width="2"/>
  </svg>
  <figcaption><em>Original illustrative graphic: a device-held key, an attested memory vault, a deletion rollback loop and response-derived hashes crossing a marked boundary. It is a conceptual audit map, not Google's system diagram, proof of exploitation or measured product telemetry.</em></figcaption>
</figure>

## What changes when private inference remembers

Private AI Compute originally handled a request inside protected cloud infrastructure and discarded the plaintext state when the session finished. Persistent memory changes the threat model because the encrypted records remain useful only if a later request can find and decrypt the right user's history.

Google's [updated technical brief][s2] describes a per-user database running in a hardware trusted execution environment. Records are encrypted with per-user keys. An orchestrator, the memory server and the inference pipeline authenticate one another over encrypted channels, and keys are released only when the memory enclave presents approved attestation evidence. Google says the surrounding cloud can store, replicate and back up ciphertext without seeing the underlying plaintext.

The memory service is built on Project Oak. Google has published the [Oak private-memory source][s4] and says reproducible builds, a public ledger of approved binary digests and enclave attestation connect inspectable source to production code. Those mechanisms matter because a source repository alone does not show what is running for a particular request.

The stateful design necessarily gives up one property of the earlier service. For stateless inference, IP-blinding and anonymous tokens were intended to prevent a request from being linked to a user. The brief says a persistent store needs a stable per-user identifier so the request reaches the right database. It therefore does not claim network-level non-targetability for memory requests. Its security claim is narrower: targeting the store should yield ciphertext that remains unreadable without the user's keys and an approved enclave.

That trade changes what a customer should ask. A private computation and a private historical profile are not the same asset. Retention, identity resolution, backup, deletion, key recovery and device enrolment become part of the system's privacy boundary.

## The audit supports part of Google's claim

Google hired Trail of Bits to build a threat model and review the secure-memory implementation. Four consultants worked for five engineer-weeks between 4 June and 17 July 2026, followed by a fix review from 5 to 7 August. The final public report is dated 21 September. The review used private Google source code, configuration and documentation as well as open-source components.

Within that scope, [Trail of Bits reports][s3] that it found no mechanism by which Google employees could access user data in the reviewed code. It commended the choice to hold memory encryption keys on user devices and make plaintext available in trusted server hardware only during active use.

Trail of Bits did not conduct a complete review of Private AI Compute, the hardened TPU platform or Oak's infrastructure. It relied on an earlier NCC Group review for parts of that foundation. Its report is a point-in-time assessment commissioned by Google, not a standing guarantee. It also notes that extensive parts of the system remain closed source and that Google can change the service after the reviewed snapshot.

The audit identified ten issues: two high, one medium, two low and five informational. The fix review marked eight resolved. Two remained unresolved.

One unresolved issue concerns deletion rollback. An attacker with persistent privileged access to the untrusted storage layer could restore an older encrypted database snapshot after a person deleted a memory. Google fixed a related substitution problem by cryptographically binding record identifiers to ciphertext, but accepted the remaining rollback risk while investigating client-assisted state verification. The audit rates it low severity because exploitation requires privileged storage access and a later user session. Deletion removed the current record, but the reviewed design did not provide a cryptographic guarantee that an old encrypted state could never be presented again.

The other unresolved issue sits in recitation checking. The system sent truncated 96-bit hashes of response chunks to an out-of-enclave service used to detect reproduction of indexed material. Trail of Bits rated the issue high while describing exploitation as technically difficult and dependent on privileged internal access. The report does not say raw prompts or plaintext responses leave the trusted boundary through this path. Google told the auditors it planned an in-enclave Bloom-filter check so only likely matches would trigger an external hash query, but the final fix review still listed the issue as unresolved.

The findings do not show that staff can casually read memories or document an external compromise. Their practical value is in the boundary they draw around Google's headline privacy promise: a privileged rollback is treated differently from plaintext access, and response-derived hashes are treated differently from raw content.

## The verification roadmap is not the current control set

Google describes several ways outsiders can inspect the system: published source for the memory service, reproducible builds, binary digests in a ledger and third-party audits. Its brief also lists stronger measures as future work, including client-side verification of server attestation and a transparency log witnessed and co-signed by independent parties.

For procurement, a roadmap to user-verifiable attestation should not be recorded as a control already available in every client. A public audit should be tied to the version, binary identity and product route that will process the organisation's data. If a product cannot expose that relationship, the assessment remains evidence about a reviewed design rather than the deployed instance.

Before approving a memory-backed assistant, ask for a feature-specific answer to six questions:

1. Which product, client version and workload route use the audited memory service?
2. How does a user enrol a second device, revoke a lost device and recover access without giving the provider an equivalent decryption path?
3. What does deletion remove from the active database, replicas and backups, and how is rollback detected?
4. Which telemetry or safety services receive plaintext, hashes or other response-derived data outside the trusted boundary?
5. Can the client verify the enclave, approved binary digest and ledger entry before releasing a key?
6. Which audit findings and mitigations apply to the exact build now in production, and who rechecks them after a material change?

Then test the controls a normal user can see. Create a distinctive, non-sensitive memory; retrieve it across the supported clients; delete it; revoke one device; and check whether the service documents each state transition. This cannot reproduce the cryptographic review, but it can expose gaps between the architecture and the user-facing lifecycle.

Index Us did not run Private AI Compute, inspect Google's private code, verify a production binary, test deletion or reproduce the Trail of Bits findings. The audit was paid for by Google and time-boxed, although Trail of Bits authored the public findings and recorded unresolved issues. The reviewed evidence supports taking the design seriously. It does not remove the need to identify the actual product path and verify how memory, keys and deletion behave when the feature ships.

[s1]: https://deepmind.google/blog/advancing-private-ai-compute-with-secure-server-side-memory/
[s2]: https://services.google.com/fh/files/misc/private_ai_compute_technical_brief.pdf
[s3]: https://github.com/trailofbits/publications/blob/master/reviews/2026-09-google-secure-memory-securityreview.pdf
[s4]: https://github.com/project-oak/oak/tree/main/oak_private_memory
