# Index Us

An independent, static-first AI publication for `index-us.com`, built with Astro and deployed as a Cloudflare Worker with static assets.

## Why this architecture

- Prerendered HTML keeps pages fast, resilient and indexable.
- Markdown content collections validate editorial metadata at build time.
- The Worker streams Cloudflare assets and applies one security-header policy to every response.
- There is no client-side JavaScript, analytics, CMS or database in the launch scaffold.
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

Read `EDITORIAL.md`, then add a Markdown file under `src/content/articles/`. The validated frontmatter drives listings, dates, source links, social metadata, RSS and structured data.

The initial ten-article queue is in `docs/editorial-roadmap.md`.

## GitHub → Cloudflare deployment

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
