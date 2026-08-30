import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("home page has canonical metadata and no client scripts", async () => {
  const html = await readFile("dist/index.html", "utf8");
  assert.match(html, /<link rel="canonical" href="https:\/\/index-us\.com\/"/);
  assert.match(html, /Latest intelligence/);
  assert.doesNotMatch(html, /<script[^>]+src=/);
});

test("article renders answer-first content and structured data", async () => {
  const html = await readFile("dist/articles/verify-ai-tool-announcements/index.html", "utf8");
  assert.match(html, /Key takeaways/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /BlogPosting/);
  assert.match(html, /Last reviewed/);
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
