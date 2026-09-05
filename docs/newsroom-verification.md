# Newsroom setup verification — 6 September 2026

The repository workflow is implemented. The Codex scheduled task is **not registered by this change**. No scheduled-task creation tool was available in this session, and computer control of `com.openai.codex` was denied by the application. The [task prompt and exact schedule](newsroom-task-prompt.md) are prepared for activation in Codex Scheduled. Verify the next run times, required capabilities and the first unattended outcome there.

## Verified locally

- `npm run deploy:dry`: passed, including generated Worker types, Astro checks/build and Wrangler asset preparation.
- `npm test`: 46 tests passed; Astro reported zero errors, warnings or hints.
- Publication guardrails reject changed article digests, unsupported review attestations, unresolved claims, duplicate events, reused article URLs, stale/future evidence, incomplete CI, unrelated files and missing disclosure.
- Recovery tests cover retained work, lock ownership, completed run directories and an interrupted merge receipt.
- A temporary article fixture outside the repository exercised the actual Astro disclosure rendering at 1,440 × 1,000 and 390 × 844. The disclosure and policy link were readable near the byline; neither viewport had horizontal overflow. The fixture was not committed or published.
- A live discovery pilot inspected public sources and retained a [candidate/decision record](research/newsroom-pilot-2026-09-06.md). It held publication because shortlisted events did not satisfy the exact freshness evidence requirement; no article or review approval was fabricated.

The pure publication checks were tested without making a synthetic article public. A complete unattended research → three-agent review → article publication run remains to be observed after scheduler activation. Machine validation checks recorded evidence and integrity; it does not establish factual truth, review independence beyond recorded identifiers or editorial quality by itself.

## Activation acceptance

Create one isolated-worktree task for 00:00, 06:00, 12:00 and 18:00 in `Australia/Melbourne`. Ensure the skill and both references, live browsing, separate agents, Git/GitHub authentication and scoped publication permissions are available to that task. Leave the computer on and Codex running for desktop scheduling. Confirm the next four times in Scheduled, run the task once manually, and inspect its persistent outcome. A justified skip or hold is acceptable; a permission failure requires fixing the task capability rather than weakening publication gates.
