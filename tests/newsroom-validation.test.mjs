import test from "node:test";
import assert from "node:assert/strict";
import { stringify } from "yaml";
import { AUTOMATION_DISCLOSURE, articleDigest, countArticleWords, validateRecord } from "../scripts/newsroom-validation.mjs";

const now = new Date("2026-09-06T12:00:00Z");

function fixture() {
  const articlePath = "src/content/articles/a-documented-model-release.md";
  const runId = "20260906T110000Z";
  const metadata = {
    title: "A documented model release and its operational limits",
    description: "A source-led examination of a documented release, its access requirements, the available evidence and the limits of the claims.",
    publishedAt: "2026-09-06T11:45:00Z",
    updatedAt: "2026-09-06T11:45:00Z",
    author: "Index Us Editorial",
    category: "News",
    tags: ["models", "evaluation"],
    draft: false,
    readingMinutes: 6,
    keyTakeaways: ["The release is documented.", "Independent context identifies limitations."],
    sources: [
      { label: "Official release", url: "https://openai.com/index/documented-release/" },
      { label: "Independent context", url: "https://arxiv.org/abs/2609.12345" },
    ],
    newsroom: { runId, storyId: "documented-model-release", disclosure: AUTOMATION_DISCLOSURE },
  };
  const body = "Evidence ".repeat(1200).trim();
  const articleSource = `---\n${stringify(metadata)}---\n${body}\n`;
  const digest = articleDigest(articleSource);
  const record = {
    schemaVersion: 1,
    runId,
    startedAt: "2026-09-06T11:00:00Z",
    completedAt: "2026-09-06T11:45:00Z",
    decision: { kind: "new", reason: "A material documented release with meaningful independent context." },
    story: { id: "documented-model-release", eventDate: "2026-09-06T04:00:00Z", canonicalUrls: [metadata.sources[0].url] },
    articlePath,
    articleSha256: digest,
    sources: metadata.sources.map((source, index) => ({
      id: `s${index + 1}`,
      url: source.url,
      title: source.label,
      publisher: index === 0 ? "OpenAI" : "Independent researchers",
      kind: index === 0 ? "primary" : "independent",
      independenceGroup: index === 0 ? "openai" : "independent-research-team",
      publishedAt: "2026-09-06",
      eventDate: index === 0 ? "2026-09-06T04:00:00Z" : "unknown",
      retrievedAt: "2026-09-06T11:10:00Z",
      locator: "Release details, first paragraph",
    })),
    claims: Array.from({ length: 5 }, (_, index) => ({
      id: `c${index + 1}`,
      text: `Material claim ${index + 1} supported by the recorded evidence.`,
      type: "fact",
      sourceIds: [index % 2 === 0 ? "s1" : "s2"],
      sourceLocator: "Release details, first paragraph",
      status: "supported",
    })),
    drafting: { agentId: "/run/drafter" },
    editorial: { agentId: "/run/editor", skill: "edit-johns-content", reviewedAt: "2026-09-06T11:30:00Z", articleSha256: digest, notes: ["Preserved the evidence boundary and removed repeated conclusions."] },
    factCheck: { agentId: "/run/fact-review", reviewedAt: "2026-09-06T11:40:00Z", articleSha256: digest, status: "passed", claimsCoverage: true },
    quality: { evidence: 30, context: 18, originalValue: 18, voice: 13, presentation: 9 },
    checks: {
      desktop: { status: "passed", width: 1440, notes: "Inspected readable body, headings, links and disclosure." },
      mobile: { status: "passed", width: 390, notes: "Inspected wrapping, navigation and source links without overflow." },
    },
    riskFlags: [],
    quotes: [],
  };
  return { record, metadata, body, articleSource, articlePath, now, forPublication: true };
}

function errors(item) {
  return validateRecord(item.record, item);
}

function rewrite(item, change) {
  change(item.metadata);
  item.articleSource = `---\n${stringify(item.metadata)}---\n${item.body}\n`;
  const digest = articleDigest(item.articleSource);
  item.record.articleSha256 = digest;
  item.record.editorial.articleSha256 = digest;
  item.record.factCheck.articleSha256 = digest;
}

test("complete independent attestations pass without implying their claims are proven by code", () => {
  assert.deepEqual(errors(fixture()), []);
});

test("word count ignores metadata, code and URL destinations while retaining visible link text", () => {
  const source = "---\ntitle: Excluded words\n---\nUseful [source evidence](https://example.com/path) here. `hidden code`\n```js\nignored words\n```\nhttps://example.com/another\n";
  assert.equal(countArticleWords(source), 4);
  assert.equal(articleDigest("abc"), "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
});

test("a post-review edit invalidates the file approval", () => {
  const item = fixture();
  item.articleSource += "Changed.";
  assert(errors(item).some((error) => error.includes("does not match the article file")));
  item.record.articleSha256 = articleDigest(item.articleSource);
  assert(errors(item).some((error) => error.includes("editorial.articleSha256")));
  assert(errors(item).some((error) => error.includes("factCheck.articleSha256")));
});

test("sequential self-review cannot masquerade as distinct agents", () => {
  const item = fixture();
  item.record.factCheck.agentId = item.record.drafting.agentId;
  assert(errors(item).some((error) => error.includes("three distinct")));
});

test("rubric floors cannot be offset by higher scores elsewhere", () => {
  const item = fixture();
  item.record.quality = { evidence: 27, context: 20, originalValue: 20, voice: 15, presentation: 10 };
  assert(errors(item).some((error) => error.includes("quality.evidence")));
  assert(!errors(item).some((error) => error.includes("quality total")));
});

test("independent context cannot substitute for primary evidence or distinct source families", () => {
  const item = fixture();
  item.record.sources[0].kind = "independent";
  assert(errors(item).some((error) => error.includes("primary source")));
  item.record.sources[0].kind = "primary";
  item.record.sources[1].independenceGroup = " OPENAI ";
  assert(errors(item).some((error) => error.includes("two source independenceGroups")));
});

test("unresolved or untraceable material claims block publication", () => {
  const item = fixture();
  item.record.claims[0].status = "unresolved";
  item.record.claims[1].sourceIds = ["missing"];
  item.record.claims[2].sourceIds = [];
  assert(errors(item).some((error) => error.includes("unresolved claims")));
  assert.equal(errors(item).filter((error) => error.includes("sourceIds must reference")).length, 2);
});

test("a new story cannot reuse a prior event or a tracking variant of its canonical URL", () => {
  const item = fixture();
  const prior = structuredClone(item.record);
  prior.runId = "20260906T050000Z";
  prior.startedAt = "2026-09-06T05:00:00Z";
  item.records = [prior];
  assert(errors(item).some((error) => error.includes("story.id has already")));
  item.record.story.id = "different-title-same-event";
  rewrite(item, (metadata) => { metadata.newsroom.storyId = item.record.story.id; });
  item.record.story.canonicalUrls = ["https://openai.com/index/documented-release?utm_source=feed#details"];
  assert(errors(item).some((error) => error.includes("canonical URL has already")));
});

test("the main event needs an exact timestamp and a source that was actually checked", () => {
  const item = fixture();
  item.record.story.eventDate = "2026-09-06";
  assert(errors(item).some((error) => error.includes("story.eventDate must be an exact ISO timestamp")));
  item.record.story.eventDate = "2026-09-06T04:00:00Z";
  item.record.story.canonicalUrls = ["https://openai.com/index/an-unchecked-release/"];
  assert(errors(item).some((error) => error.includes("included among the checked sources")));
  item.record.story.canonicalUrls = ["https://openai.com/index/documented-release?utm_source=feed#details"];
  assert.deepEqual(errors(item), []);
});

test("a new event cannot overwrite an article address used for a different story", () => {
  const item = fixture();
  const prior = structuredClone(item.record);
  prior.runId = "20260905T110000Z";
  prior.startedAt = "2026-09-05T11:00:00Z";
  prior.story = { id: "a-different-model-release", eventDate: "2026-09-05T04:00:00Z", canonicalUrls: ["https://anthropic.com/news/a-different-release"] };
  item.records = [prior];
  assert(errors(item).some((error) => error.includes("new articlePath has already been used")));
  assert(!errors(item).some((error) => error.includes("story.id has already") || error.includes("canonical URL has already")));
});

test("same-start records use a deterministic run ID order to block duplicate coverage", () => {
  const earlier = fixture();
  const later = fixture();
  later.record.runId = "20260906T110001Z";
  rewrite(later, (metadata) => { metadata.newsroom.runId = later.record.runId; });
  later.records = [earlier.record];
  assert(errors(later).some((error) => error.includes("story.id has already")));
  earlier.records = [later.record];
  assert.deepEqual(errors(earlier), []);
});

test("later records do not retroactively invalidate an earlier publication", () => {
  const item = fixture();
  const later = structuredClone(item.record);
  later.runId = "20260906T170000Z";
  later.startedAt = "2026-09-06T17:00:00Z";
  item.records = [later, structuredClone(item.record)];
  assert.deepEqual(errors(item), []);
});

test("an update needs the existing URL and a genuinely newer recorded event date", () => {
  const item = fixture();
  const prior = structuredClone(item.record);
  prior.runId = "20260905T110000Z";
  prior.startedAt = "2026-09-05T11:00:00Z";
  prior.story.eventDate = "2026-09-05T04:00:00Z";
  item.record.decision.kind = "update";
  item.records = [prior];
  rewrite(item, (metadata) => { metadata.publishedAt = "2026-09-05T11:45:00Z"; });
  assert.deepEqual(errors(item), []);
  item.record.story.eventDate = prior.story.eventDate;
  assert(errors(item).some((error) => error.includes("newer development")));
  item.record.story.eventDate = "2026-09-06T04:00:00Z";
  prior.articlePath = "src/content/articles/original-address.md";
  assert(errors(item).some((error) => error.includes("preserve the existing articlePath")));
  item.records = [];
  assert(errors(item).some((error) => error.includes("previously recorded story.id")));
});

test("stale reviews or event dates hold a fresh publication but remain valid historical records", () => {
  const item = fixture();
  item.now = new Date("2026-09-09T12:00:00Z");
  assert(errors(item).some((error) => error.includes("stale for publication")));
  assert(errors(item).some((error) => error.includes("story.eventDate is stale")));
  item.forPublication = false;
  assert.deepEqual(errors(item), []);
});

test("future evidence and publication timestamps fail the publication gate", () => {
  const item = fixture();
  item.record.story.eventDate = "2026-09-06T12:10:00Z";
  item.record.sources[0].retrievedAt = "2026-09-06T12:10:00Z";
  rewrite(item, (metadata) => { metadata.updatedAt = "2026-09-06T12:10:00Z"; });
  assert.equal(errors(item).filter((error) => error.includes("in the future")).length, 3);
});

test("the factual review follows editing and uses sources freshly checked during that run", () => {
  const item = fixture();
  item.forPublication = false;
  item.record.factCheck.reviewedAt = "2026-09-06T11:20:00Z";
  assert(errors(item).some((error) => error.includes("factCheck.reviewedAt must not precede editorial.reviewedAt")));
  item.record.factCheck.reviewedAt = "2026-09-06T11:40:00Z";
  item.record.sources[0].retrievedAt = "2026-09-06T10:59:00Z";
  item.record.sources[1].retrievedAt = "2026-09-06T11:41:00Z";
  assert(errors(item).some((error) => error.includes("sources[0].retrievedAt must not precede startedAt")));
  assert(errors(item).some((error) => error.includes("sources[1].retrievedAt must not follow factCheck.reviewedAt")));
  item.record.sources[0].retrievedAt = item.record.startedAt;
  item.record.sources[1].retrievedAt = item.record.factCheck.reviewedAt;
  assert.deepEqual(errors(item), []);
});

test("new publication timestamps are bound to the run and permit only five minutes of completion tolerance", () => {
  const item = fixture();
  item.forPublication = false;
  rewrite(item, (metadata) => { metadata.publishedAt = "2026-09-06"; });
  assert(errors(item).some((error) => error.includes("publishedAt must be an ISO timestamp for new articles")));
  rewrite(item, (metadata) => { metadata.publishedAt = "2026-09-06T10:59:00Z"; });
  assert(errors(item).some((error) => error.includes("new article publishedAt must not precede startedAt")));
  rewrite(item, (metadata) => {
    metadata.publishedAt = "2026-09-06T11:50:00Z";
    metadata.updatedAt = "2026-09-06T11:50:00Z";
  });
  assert.deepEqual(errors(item), []);
  rewrite(item, (metadata) => {
    metadata.publishedAt = "2026-09-06T11:50:01Z";
    metadata.updatedAt = "2026-09-06T11:50:01Z";
  });
  assert(errors(item).some((error) => error.includes("article publishedAt must not follow completedAt")));
  assert(errors(item).some((error) => error.includes("article updatedAt must not follow completedAt")));
});

test("updates retain their publication history but need a new precise update timestamp", () => {
  const item = fixture();
  const prior = structuredClone(item.record);
  prior.runId = "20260905T110000Z";
  prior.startedAt = "2026-09-05T11:00:00Z";
  prior.story.eventDate = "2026-09-05T04:00:00Z";
  item.records = [prior];
  item.record.decision.kind = "update";
  item.forPublication = false;
  rewrite(item, (metadata) => {
    metadata.publishedAt = "2026-09-05";
    metadata.updatedAt = "2026-09-06T10:59:00Z";
  });
  assert(errors(item).some((error) => error.includes("article updatedAt must not precede startedAt")));
  rewrite(item, (metadata) => { metadata.updatedAt = "2026-09-06"; });
  assert(errors(item).some((error) => error.includes("article updatedAt must be an ISO timestamp")));
  rewrite(item, (metadata) => { metadata.updatedAt = "2026-09-06T11:45:00Z"; });
  assert.deepEqual(errors(item), []);
});

test("archiving a run cannot legitimise event or source dates after its completion", () => {
  const item = fixture();
  item.forPublication = false;
  item.now = new Date("2026-09-10T12:00:00Z");
  item.record.story.eventDate = "2026-09-06T12:10:00Z";
  item.record.sources[0].publishedAt = "2026-09-07";
  item.record.sources[1].eventDate = "2026-09-07T04:00:00Z";
  assert(errors(item).some((error) => error.includes("story.eventDate must not follow completedAt")));
  assert(errors(item).some((error) => error.includes("sources[0].publishedAt must not follow completedAt")));
  assert(errors(item).some((error) => error.includes("sources[1].eventDate must not follow completedAt")));
});

test("skip and hold retain an accountable decision without fabricating an article or reviews", () => {
  for (const kind of ["skip", "hold"]) {
    const record = { schemaVersion: 1, runId: "20260906T110000Z", startedAt: "2026-09-06T11:00:00Z", completedAt: "2026-09-06T11:30:00Z", decision: { kind, reason: "No event met the evidence threshold." } };
    assert.deepEqual(validateRecord(record, { now, forPublication: true }), []);
    record.decision.reason = " ";
    assert(validateRecord(record).some((error) => error.includes("decision.reason")));
  }
});

test("private URLs, credentials, literal IPs and encoded IPs cannot enter the source register", () => {
  for (const url of ["http://openai.com/news", "https://name:secret@openai.com/news", "https://localhost/news", "https://service.internal/news", "https://127.0.0.1/news", "https://2130706433/news", "https://[::1]/news", "https://8.8.8.8/news"]) {
    const item = fixture();
    item.record.sources[0].url = url;
    assert(errors(item).some((error) => error.includes("sources[0].url")), url);
  }
});

test("quotation limits accumulate across excerpts from one source", () => {
  const item = fixture();
  item.record.quotes = [{ sourceId: "s1", words: 15 }, { sourceId: "s1", words: 11 }];
  assert(errors(item).some((error) => error.includes("exceed 25 words")));
  item.record.quotes[1].words = 10;
  assert.deepEqual(errors(item), []);
});

test("mobile and desktop render checks must be explicitly recorded at appropriate widths", () => {
  const item = fixture();
  delete item.record.checks;
  assert(errors(item).some((error) => error.includes("checks.desktop.status")));
  assert(errors(item).some((error) => error.includes("checks.mobile.status")));
  item.record.checks = { desktop: { status: "passed", width: 390, notes: "Inspected" }, mobile: { status: "passed", width: 1440, notes: "Inspected" } };
  assert.equal(errors(item).filter((error) => error.includes(".width must record")).length, 2);
});

test("a tracking variant cannot pretend to be a second independent source", () => {
  const item = fixture();
  item.record.sources[1].url = "https://openai.com/index/documented-release?utm_campaign=news";
  assert(errors(item).some((error) => error.includes("repeats another source URL")));
});

test("new articles have a tighter word ceiling than substantive updates", () => {
  const item = fixture();
  item.body = "Evidence ".repeat(2401).trim();
  rewrite(item, (metadata) => { metadata.readingMinutes = 13; });
  assert(errors(item).some((error) => error.includes("1200–2400 words")));
  const prior = structuredClone(item.record);
  prior.runId = "20260905T110000Z";
  prior.startedAt = "2026-09-05T11:00:00Z";
  prior.story.eventDate = "2026-09-05T04:00:00Z";
  item.records = [prior];
  item.record.decision.kind = "update";
  assert.deepEqual(errors(item), []);
});

test("authorship, disclosure, source coverage and reading length are bound to the reviewed file", () => {
  const item = fixture();
  rewrite(item, (metadata) => {
    metadata.author = "John";
    metadata.newsroom.disclosure = "Reviewed by our team.";
    metadata.sources.pop();
    metadata.readingMinutes = 7;
  });
  const result = errors(item);
  for (const expected of ["author must be", "automation disclosure", "include every record source", "readingMinutes must equal"]) assert(result.some((error) => error.includes(expected)), expected);
});

test("malformed records fail with diagnostic messages instead of throwing", () => {
  for (const record of [null, [], {}, { decision: { kind: "new" }, sources: [null], claims: [null], quotes: [null], story: null }]) {
    assert.doesNotThrow(() => validateRecord(record));
    assert(validateRecord(record).length > 0);
  }
});

test("YAML duplicate fields and invalid calendar dates are rejected", () => {
  const item = fixture();
  item.articleSource = item.articleSource.replace("author: Index Us Editorial", "author: Index Us Editorial\nauthor: Someone else");
  assert(errors(item).some((error) => error.includes("valid YAML with unique keys")));
  item.record.startedAt = "2026-02-30T11:00:00Z";
  assert(errors(item).some((error) => error.includes("startedAt must be an ISO timestamp")));
});
