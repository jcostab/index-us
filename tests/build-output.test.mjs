import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

test("home page keeps canonical metadata and a small first-party enhancement budget", async () => {
  const html = await readFile("dist/index.html", "utf8");
  assert.match(html, /<link rel="canonical" href="https:\/\/index-us\.com\/"/);
  assert.match(html, /Latest intelligence/);
  const scripts = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((match) => match[1]);
  let scriptBytes = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)]
    .filter((match) => !match[1].includes('application/ld+json'))
    .reduce((total, match) => total + Buffer.byteLength(match[2]), 0);
  for (const script of scripts) {
    assert.match(script, /^\/_astro\/[^/]+\.js$/, 'Client scripts must be bundled and served locally');
    scriptBytes += (await readFile(`dist${script}`)).byteLength;
  }
  assert.ok(scriptBytes < 5000, `Home enhancement scripts exceed 5 KB: ${scriptBytes} bytes`);
  assert.doesNotMatch(html, /<astro-island/, 'Reading must not depend on hydrated components');
});

test("article renders answer-first content and structured data", async () => {
  const html = await readFile("dist/articles/verify-ai-tool-announcements/index.html", "utf8");
  assert.match(html, /Key takeaways/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /BlogPosting/);
  assert.match(html, /\"citation\":\[/);
  assert.match(html, /Last reviewed/);
});

test("the complete launch library is generated", async () => {
  const slugs = await readdir("dist/articles");
  const expected = [
    "ai-news-week-24-30-august-2026",
    "cloudflare-kitesurf-review",
    "evaluate-ai-model-for-real-work",
    "how-to-choose-an-ai-model",
    "mcp-explained-without-protocol-soup",
    "read-ai-news-without-hype",
    "verify-ai-tool-announcements",
    "what-ai-benchmarks-can-tell-you",
  ];

  assert.deepEqual(slugs.filter((slug) => !slug.includes(".")).sort(), expected);
});

test("internal article links resolve in the generated site", async () => {
  const slugs = (await readdir("dist/articles")).filter((slug) => !slug.includes("."));

  for (const slug of slugs) {
    const html = await readFile(`dist/articles/${slug}/index.html`, "utf8");
    const links = [...html.matchAll(/href="(\/[^"#?]*)/g)].map((match) => match[1]);

    for (const link of new Set(links)) {
      const outputPath = link.endsWith("/") ? `${link}index.html` : link;
      await assert.doesNotReject(
        access(`dist${outputPath}`),
        `${slug} links to missing generated path ${link}`,
      );
    }
  }
});

test("discovery files are generated", async () => {
  const [rss, sitemap, robots] = await Promise.all([
    readFile("dist/rss.xml", "utf8"),
    readFile("dist/sitemap-index.xml", "utf8"),
    readFile("dist/robots.txt", "utf8"),
  ]);
  assert.match(rss, /<rss/);
  assert.match(sitemap, /<sitemapindex/);
  assert.match(robots, /Sitemap: https:\/\/index-us\.com\/sitemap-index\.xml/);
});

test("a useful 404 page is generated and excluded from search", async () => {
  const html = await readFile("dist/404.html", "utf8");
  assert.match(html, /This signal went missing/);
  assert.match(html, /name="robots" content="noindex, nofollow"/);
});

test("Cloudflare configuration owns the apex and routes www traffic", async () => {
  const config = await readFile("wrangler.jsonc", "utf8");
  assert.match(config, /"pattern": "index-us\.com"/);
  assert.match(config, /"pattern": "www\.index-us\.com\/\*"/);
  assert.match(config, /"zone_name": "index-us\.com"/);
  assert.equal((config.match(/"custom_domain": true/g) ?? []).length, 1);
});
