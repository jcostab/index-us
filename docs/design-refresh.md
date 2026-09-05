# Index Us magazine refresh

Implemented September 2026. This refresh changes the presentation and discovery experience; existing article text, publication dates, sources and editorial metadata are preserved.

## Review and direction

The original homepage gave most of its first screen to an introductory statement, followed by three uniform text cards. Coverage pills were not links, the archive had no search or filters, and article pages offered little help with navigation or continued reading.

The refresh uses a large publication masthead, warm paper, ink, vermilion and sage, fine rules, and distinct story layouts. Newsreader provides expressive editorial headlines and readable article text; Manrope handles navigation and supporting information. The variable fonts are self-hosted, with OFL licences in `public/fonts/`.

The homepage now includes a featured lead story, three recent articles, an editorial standards feature, essential reading and linked category collections. The lead uses the published `featured` field, with a latest-article fallback. Article titles and visible edition dates remain tied to the existing content.

## Discovery and reading

- The archive filters by category and searches titles, descriptions and tags. Category and search state use `?category=Analysis&q=MCP`; result counts and empty states are accessible. Reset returns the complete index. The primary navigation reflects the selected category.
- The reading layout includes article artwork, generated contents links, key takeaways, original sources and review dates, a reading progress indicator, and three related articles ranked by category and shared tags.
- Mobile navigation uses a native details disclosure. Wide article tables scroll within their column. Visible focus styles, the skip link and heading hierarchy are preserved.
- Without JavaScript, all eight articles remain visible and readable. Search controls are hidden and a short message explains that the full index is displayed.

## Artwork and motion

`ArticleArtwork.astro` contains five original, decorative inline SVG compositions. Categories determine the design; benchmark and news-literacy articles have specific variants. No image service, video, animation framework or runtime dependency is required.

Card artwork has a finite opening animation of less than five seconds and a small hover response. With JavaScript enabled, the homepage lead orbit rotates over 45 seconds, and the editorial standards illustration rotates over 60 seconds. The header motion control pauses them in place; its preference is stored for the browser session. Continuous animation is enabled only after the control initialises. Text never depends on animation to become readable.

The operating system's reduced-motion preference disables animations, transitions, smooth scrolling and the reading progress display. The site control does not override that preference. Without JavaScript, automatic decorative motion is finite.

## Validation

- `npm test`: Cloudflare type generation, Astro diagnostics, TypeScript, all eight articles' content checks, static build and seven repository tests passed.
- `npm run deploy:dry`: passed; no production upload performed.
- The previous zero-script homepage test now enforces a 5 KB first-party enhancement budget, including inline scripts, and rejects hydrated component islands. Current generated inline JavaScript is approximately 0.9 KB on the homepage, 2.6 KB on the archive and 1.3 KB on an article.
- Visually inspected the homepage, archive and article page at desktop and 390 px mobile widths. Verified mobile navigation, category deep links, search, empty/reset states, article contents targets, and table overflow containment.
- Verified that the pause control changes animation play state, the OS reduced-motion setting disables artwork animation, and disabling JavaScript leaves all eight archive articles visible with no continuous artwork loops.
- Checked the built archive through local Wrangler with production security headers: filters, active navigation and self-hosted fonts worked, with no browser console errors observed.
- Article routes, canonical metadata, structured data, RSS, sitemap, security headers and domain configuration remain intact.

## Handoff

Run `npm run dev` for editing. To review the built version with the Worker security headers, run `npm run build` followed by `npm run preview` (normally `http://localhost:8787`). Merging to `main` runs the existing GitHub Actions test and Cloudflare deployment workflow.

The pre-existing About and Privacy pages still describe a scaffold and need the publisher's name and public contact details. This design change does not invent those details or introduce subscriptions, analytics or marketing cookies.
