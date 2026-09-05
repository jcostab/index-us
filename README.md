# Index Us

An independent, static-first AI publication for `index-us.com`, built with Astro and deployed as a Cloudflare Worker with static assets.

## Why this architecture

- Prerendered HTML keeps pages fast, resilient and indexable.
- Markdown content collections validate editorial metadata at build time.
- The Worker streams Cloudflare assets and applies one security-header policy to every response.
- Small, first-party scripts enhance motion controls, article search and reading progress. All articles remain available without JavaScript. There is no analytics, CMS or database.
- GitHub Actions tests every change and deploys every merge to `main`.

## Local development

Requirements: Node.js 22 or newer.

```sh
npm install
npm run dev
```

Run the complete gate:

```sh
npm test
```

Preview the built site through the Worker:

```sh
npm run build
npm run preview
```

## Publishing

The magazine design, motion behaviour and refresh validation are documented in [`docs/design-refresh.md`](docs/design-refresh.md). Typography is self-hosted; the font licences live in `public/fonts/`.

Read `EDITORIAL.md`, then add a Markdown file under `src/content/articles/`. The validated frontmatter drives listings, dates, source links, social metadata, RSS and structured data.

The initial ten-article queue is in `docs/editorial-roadmap.md`.

## Automated newsroom

The [editorial workflow](docs/newsroom-editorial-workflow.md) covers four daily research opportunities, original long-form writing, the required `edit-johns-content` edit and independent AI source review. Articles publish only after evidence, disclosure, final-copy hashes, rendering and repository checks pass. The publisher opens and merges a scoped PR and verifies Cloudflare's live output.

Use the [runbook](docs/newsroom-runbook.md) to operate or recover a run. The [scheduled-task prompt](docs/newsroom-task-prompt.md) is ready for Codex Scheduled at 00:00, 06:00, 12:00 and 18:00 Melbourne time. Saving repository configuration does not register that task; confirm activation in Codex. Desktop runs require the computer and app to remain running.

```sh
npm run newsroom -- status
npm run check:newsroom
```

`newsroom/config.json` contains source starting points and the pause switch. Reviewed publication records live in `newsroom/runs/`; temporary drafts are ignored. New articles must carry matching newsroom provenance. Human-directed exceptions to this publication contract require an explicit repository change.

## GitHub → Cloudflare deployment

`npm run build` generates the Cloudflare Worker types before Astro checks the project, so it also works in a fresh Cloudflare Builds checkout. The generated types remain untracked. Quality CI runs the deployment dry run before `npm test` to catch any missing build prerequisites.

The deploy workflow requires two GitHub Actions repository secrets:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN` — use a narrowly scoped token that can edit Workers Scripts for the target account.

After those are configured, every push to `main` runs the full test suite and deploys `index-us`. The workflow can also be run manually.

## Domain setup

Wrangler manages `index-us.com` as the canonical Worker custom domain and routes `www.index-us.com/*` to the same Worker. A proxied `www` DNS record activates that route. The Worker permanently redirects `www` requests to the apex in one hop while retaining the path and query string.

## Pre-launch decisions

- Named publisher/editor and public contact address
- Final logo/social image (the current SVG system is production-safe but intentionally foundational)
- Analytics choice, if any, with consent and privacy review
- Newsletter provider and double-opt-in flow, if desired
