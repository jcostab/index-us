# Operating the automated newsroom

The editorial method is in [newsroom-editorial-workflow.md](newsroom-editorial-workflow.md). The [scheduled-task prompt](newsroom-task-prompt.md) supplies the four daily runs. Configuration is in [newsroom/config.json](../newsroom/config.json). `enabled: true` permits the publisher to operate; it does not register a Codex schedule.

## Standing scope and prerequisites

The owner has requested automatic research, long-form writing, editing with `edit-johns-content`, and publication four times a day. A qualifying article can proceed through the existing branch → PR → passing checks → squash merge → Cloudflare deployment without per-article approval. This permission covers article files and their public-safe evidence. It does not authorise changes to infrastructure, permissions, editorial gates, dependencies or unrelated content during a scheduled run.

Use Node 22 or later, dependencies installed with `npm ci`, authenticated `gh` access to `jcostab/index-us`, Git push access, live browsing, three distinct agent roles and the local editing skill with both references. Prefer the scheduled task's isolated worktree; never mix a run with unfinished user changes. Native task permissions must allow the documented repository actions, Git's shared state, network research and GitHub publication. Unattended tasks cannot stop to approve blocked commands. If a required permission is absent, record a hold and surface it; do not change the sandbox or fall back to broad access.

No separate API key, CMS or hosted generation service is required by these scripts. Codex performs the research and writing; existing GitHub Actions and Cloudflare publish the static site. Desktop scheduling requires the computer to remain on and Codex to remain running. The task's configured timezone follows Melbourne daylight saving; do not replace it with a fixed UTC offset. Use one task with the four daily times, not four competing tasks.

## Start and recover

1. Run `npm run newsroom -- status`. Check the shared lock, recent outcomes and published story identities. Inspect the article archive and any unresolved run before research.
2. Run `npm run newsroom -- begin`. It refuses a dirty checkout, a different repository, a concurrent lock or an open newsroom PR; fetches `origin/main`; and creates `newsroom/<runId>`. It prints the run ID and working directory. Do not make up a replacement ID.
3. Keep the lock for the entire research, editing and publication sequence. It lives under the repository's common Git directory, so all worktrees share it. The owner is a run, not the short-lived `begin` process; a dead PID does not prove that a run is over. No automatic expiry removes a live lock.
4. If a previous run stopped, inspect its owner, local outcome, PR, branch and deployment. Resume its publisher or record the precise hold/failure and finish that run. Only release its lock after establishing that no worker is still acting. Never start a duplicate story just because a previous run timed out.

`begin` will fail if scheduled-task permissions cannot write Git state or authenticate to GitHub. This is a capability failure, not permission to bypass the guard. The task's first successful unattended run is the confirmation that its permissions work.

## Research, draft and review

Use the configured source seeds as discovery starting points, not an endorsement list or a closed set of publishers. Verify that each page is still current and relevant. Consult the underlying primary record for technical behaviour. Prioritise reader impact and evidence over a vendor's announcement frequency. Record rejected candidates as well as the selected one.

Use actual UTC timestamps from the clock. Do not infer an exact event time from a date-only article. If uncertainty about an event date straddles the freshness boundary, hold or choose another story. Known older evidence can establish context; the selected new development must pass the 48-hour publication gate. There is no bootstrap exception or catch-up article quota.

Keep working files in `.newsroom-work/<runId>/`: `record.json`, `research-brief.md`, `draft.md`, `preservation.md`, `editorial-review.md` and `factual-review.md`. These are ignored by Git. Retain the original draft before the editor changes the publication copy. The final article goes in `src/content/articles/<slug>.md`; follow the current content schema and preserve a stable story identity across updates. Existing launch articles are a fixed legacy allowlist; the automated publisher can update articles already carrying a newsroom record. Hold corrections to untracked legacy coverage for a separate reviewed change instead of inventing historical provenance.

Use the three actual agent identifiers in the record. Sequential passes by one agent do not qualify as independent reviewers. The editor must read the full specified skill and its two references. The factual reviewer must inspect public evidence and the final wording, including title, description and takeaways. Record the rationale for the score, known limits, checked source locations and all material claim decisions. A machine can validate the record's structure; it cannot establish that a claim is true or that the writing is useful.

Inspect the rendered page at a mobile width no greater than 480 px and desktop width at least 1,024 px. Check text wrapping, heading hierarchy, sources, disclosure, artwork, navigation and horizontal overflow. Retain each width, result and meaningful notes. Use the site's existing artwork system; do not fetch images without reuse rights or portray generated art as reporting evidence.

## Publication record

Create `newsroom/runs/<runId>/record.json` only for a qualifying article, with these fields. The executable authority is [newsroom-validation.mjs](../scripts/newsroom-validation.mjs); its tests demonstrate valid and invalid records. All values must describe work actually performed.

| Field | Contents |
| --- | --- |
| `schemaVersion`, `runId` | `1`, the ID from `begin` |
| `startedAt`, `completedAt`, `timeZone`, `window` | Actual UTC times, Melbourne timezone and research window |
| `candidates`, `decision` | Candidates with direct source URLs and selection/rejection reasons; `{kind: "new" or "update", reason}` |
| `story` | Stable slug `id`, verified ISO `eventDate`, direct HTTPS `canonicalUrls` identifying the development |
| `articlePath`, `articleSha256` | Relative article path and SHA-256 of the complete final UTF-8 file |
| `sources` | At least two entries with `id`, `url`, `title`, `publisher`, `kind` (`primary` or `independent`), `independenceGroup`, `publishedAt`, `eventDate`, `retrievedAt`, `locator`. Dates may be `unknown` where allowed; retrieval must be an actual time. At least one primary source and two genuinely independent groups. |
| `claims` | Every material claim, with `id`, exact `text`, `type` (`fact`, `attributed_claim`, `inference`), `sourceIds`, `sourceLocator`, `status` (`supported` or `qualified`). Explain the premises and boundary of inferences. The five-claim machine minimum is not permission to omit claims. |
| `drafting` | Actual drafter `agentId` |
| `editorial` | Distinct `agentId`, `skill: "edit-johns-content"`, actual `reviewedAt`, final `articleSha256`, nonempty `notes` array |
| `factCheck` | Third distinct `agentId`, actual `reviewedAt`, final `articleSha256`, `status: "passed"`, `claimsCoverage: true` only after a complete review |
| `quality` | Scores for `evidence`, `context`, `originalValue`, `voice`, `presentation`; rationale in the retained review |
| `riskFlags`, `quotes` | Empty unresolved risk list to publish; quote entries `{sourceId, words}` with cumulative source limits. Retain source-derived word allowances and speaker/context in the review. |
| `checks` | `desktop` and `mobile`, each `{status: "passed", width, notes}` from an actual rendered inspection |

The article frontmatter includes `author: Index Us Editorial`, `draft: false` and `newsroom: {runId, storyId, disclosure}`. Copy the exact disclosure from `AUTOMATION_DISCLOSURE` in the validator. The public article renders it near the byline. Include every ledger source in the frontmatter sources and use citations beside the claims they support.

`npm run newsroom -- digest src/content/articles/<slug>.md` prints the hash, body word count and reading estimate. Set metadata and disclosure before reviewers approve that hash. Do not automatically replace old review hashes after changing the copy; obtain renewed review. Once the final record passes, run `npm run newsroom -- snapshot <runId>` to validate and retain the exact approved article as `newsroom/runs/<runId>/article.md`.

Public run files may contain concise original briefs and review notes, direct links, evidence locations and the final article snapshot. They must contain no private skill text, credentials, private correspondence, raw transcripts, full fetched articles or copied source images. Do not put raw working drafts in the evidence folder. Public snapshots preserve historical approvals when an article later receives an update.

## Publish and verify

Run `npm run newsroom:publish -- <runId>`. The publisher validates freshness and final-copy hashes, runs the complete tests and deployment dry run, stages only the article and this run's public evidence, commits and pushes the run branch, creates or reuses its PR, and waits for successful quality and Cloudflare build checks. It checks the PR's current commit before the squash merge. It then waits for production workflows and verifies the public article, disclosure, canonical URL, archive, RSS and sitemap. A new article must also appear on the homepage.

The process records progress in `.newsroom-work/<runId>/publication.json`. A failure retains its step and reason. Re-running resumes an existing matching PR or verifies a recorded merge; never open another PR for the same story. An authentication error, failed check or unverified deployment leaves the run unfinished. Investigate the exact failure without relaxing gates. If `main` advanced, merge current `origin/main` into the run branch, resolve only the authorised article/evidence changes, rerun reviews for any copy change, and restart all checks. Preserve pushed history; do not force-push. If safe reconciliation requires broader changes, hold.

After verified publication, run `npm run newsroom -- finish <runId> published "Published and verified <URL>"`. For other outcomes use `skip`, `hold` or `failed` and a precise reason. The command retains the run outcome, receipt and named working editorial artifacts in the common Git directory before releasing the lock. Do not mark a run published merely because its branch was pushed or merged. The final scheduled-task report must show the actual verified state and any outstanding failure.

Skip/hold records stay in local shared state and the scheduled-task result; they do not create empty public PRs. If a skip or hold created no tracked changes, a later `begin` can start a fresh run from this finished branch. `finish` also retains the pending article and public evidence before worktree cleanup. It must run in the owning worktree; if that worktree is already missing, inspect the durable state and explicitly recover it before releasing the lock. Preserve unfinished article work for recovery.

## Pause, corrections and oversight

Pause the task in Codex Scheduled to stop future runs. Setting `enabled: false` in configuration also stops `begin` and the publication freshness gate. Neither action cancels an already running GitHub deployment; inspect an in-progress run separately.

For updates, retain `publishedAt`, substantively re-verify `updatedAt`, use the same story ID and path, and add a dated update/correction note. The new event must be newer than earlier records. Prioritise material corrections, never quietly erase an error or refresh a date cosmetically. The full article may remain up to the site's 6,000-word limit after an update; new articles remain 1,200–2,400 words.

Review skipped/held runs, source diversity, corrections and reader usefulness regularly. A working schedule and a passing score are operational evidence, not a promise that the site is trusted. Public publisher identity and a corrections contact remain separate owner decisions; do not invent them.
