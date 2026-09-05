import assert from "node:assert/strict";
import test from "node:test";
import {
  articleTextHash,
  assertArticleChange,
  assertLiveArticle,
  assertPullRequestReady,
  isAllowedPath,
  parseStatus,
  recoverMergeReceipt,
} from "../scripts/newsroom-publish.mjs";
import { AUTOMATION_DISCLOSURE } from "../scripts/newsroom-validation.mjs";

const runId = "20260906T120000Z";
const articlePath = "src/content/articles/reviewed-story.md";
const head = "a".repeat(40);
const mergeCommit = "b".repeat(40);
const readyPr = () => ({
  state: "OPEN", isDraft: false, mergeable: "MERGEABLE", headRefOid: head,
  statusCheckRollup: [
    { name: "test", status: "COMPLETED", conclusion: "SUCCESS" },
    { context: "Workers Builds: index-us", state: "SUCCESS" },
  ],
});

test("publisher preserves git filenames and distinguishes staged files", () => {
  assert.deepEqual(parseStatus(" M article with spaces.md\0?? evidence.json\0M  staged.md\0"), [
    { status: " M", file: "article with spaces.md", staged: false },
    { status: "??", file: "evidence.json", staged: false },
    { status: "M ", file: "staged.md", staged: true },
  ]);
  assert.throws(() => parseStatus("R  destination.md\0original.md\0"), /Renames/);
  assert.throws(() => parseStatus("UU conflicting.md\0"), /unresolved merges/);
});

test("publisher scope excludes unrelated files, other runs, raw drafts and traversal", () => {
  assert.equal(isAllowedPath(articlePath, articlePath, runId), true);
  for (const file of ["record.json", "article.md", "reviews/factual.md"]) {
    assert.equal(isAllowedPath(`newsroom/runs/${runId}/${file}`, articlePath, runId), true);
  }
  for (const file of [
    "package.json", "src/content/articles/another-story.md",
    "newsroom/runs/20260906T000000Z/record.json",
    ...["draft.md", "draft-final.md", "raw-source.json", "private/notes.md", "transcript.md", ".hidden.md", "../record.json", "image.png", "script.mjs"]
      .map((name) => `newsroom/runs/${runId}/${name}`),
  ]) assert.equal(isAllowedPath(file, articlePath, runId), false, file);
});

test("publisher refuses absent, stale or incomplete CI evidence", () => {
  assert.doesNotThrow(() => assertPullRequestReady(readyPr(), head));
  assert.throws(() => assertPullRequestReady({ ...readyPr(), headRefOid: mergeCommit }, head), /head changed/);
  assert.throws(() => assertPullRequestReady({ ...readyPr(), statusCheckRollup: [] }, head), /No GitHub checks/);
  assert.throws(() => assertPullRequestReady({ ...readyPr(), statusCheckRollup: readyPr().statusCheckRollup.slice(0, 1) }, head), /Required check is missing/);
  assert.throws(() => assertPullRequestReady({ ...readyPr(), mergeable: "UNKNOWN" }, head), /not mergeable/);
  assert.throws(() => assertPullRequestReady({ ...readyPr(), isDraft: true }, head), /open and ready/);
  for (const conclusion of ["FAILURE", "SKIPPED", "NEUTRAL", "CANCELLED", null]) {
    const pr = readyPr();
    pr.statusCheckRollup.push({ name: "extra", status: "COMPLETED", conclusion });
    assert.throws(() => assertPullRequestReady(pr, head), /has not passed/);
  }
});

test("new stories cannot overwrite a published URL and updates cannot create one", () => {
  const previous = { publishedAt: "2026-09-01T00:00:00Z", updatedAt: "2026-09-01T00:00:00Z" };
  assert.doesNotThrow(() => assertArticleChange("new", null, previous));
  assert.throws(() => assertArticleChange("new", previous, previous), /cannot overwrite/);
  assert.throws(() => assertArticleChange("update", null, previous), /already published/);
});

test("updates preserve the original publication instant and advance their review timestamp", () => {
  const previous = { publishedAt: "2026-09-01T00:00:00Z", updatedAt: "2026-09-02T00:00:00Z" };
  const next = { publishedAt: "2026-09-01T10:00:00+10:00", updatedAt: "2026-09-06T12:00:00Z" };
  assert.doesNotThrow(() => assertArticleChange("update", previous, next));
  assert.throws(() => assertArticleChange("update", previous, { ...next, publishedAt: next.updatedAt }), /original publishedAt/);
  assert.throws(() => assertArticleChange("update", previous, { ...next, updatedAt: previous.updatedAt }), /advance/);
  assert.throws(() => assertArticleChange("update", previous, { ...next, updatedAt: "2026-09-01T00:00:00Z" }), /advance/);
  assert.throws(() => assertArticleChange("update", previous, { ...next, updatedAt: "invalid" }), /valid timestamps/);
});

test("a receipt can recover a confirmed merge after an interrupted write", () => {
  const receipt = { headCommit: head };
  const merged = { state: "MERGED", headRefOid: head, headRefName: `newsroom/${runId}`, mergeCommit: { oid: mergeCommit }, mergedAt: "2026-09-06T12:45:00Z" };
  assert.equal(recoverMergeReceipt(receipt, merged, runId), true);
  assert.equal(receipt.mergeCommit, mergeCommit);
  assert.equal(receipt.mergedAt, merged.mergedAt);
  assert.equal(recoverMergeReceipt({ headCommit: head }, { state: "OPEN" }, runId), false);
  assert.throws(() => recoverMergeReceipt({ headCommit: mergeCommit }, merged, runId), /does not match/);
  assert.throws(() => recoverMergeReceipt({ headCommit: head }, { ...merged, headRefName: "some-other-branch" }, runId), /does not match/);
  assert.throws(() => recoverMergeReceipt({ headCommit: head, mergeCommit: "c".repeat(40) }, merged, runId), /different merge commit/);
});

test("live verification catches stale article text and missing production disclosures", () => {
  const title = "A researched article & its implications";
  const url = "https://index-us.com/articles/reviewed-story/";
  const html = `<link href="${url}" rel="canonical"><article data-reading-article><h1>A researched article &amp; its implications</h1><aside aria-label="How this article was produced">${AUTOMATION_DISCLOSURE}</aside><p>Evidence supports this limited finding.</p></article>`;
  const expected = { title, url, articleTextSha256: articleTextHash(html) };
  assert.doesNotThrow(() => assertLiveArticle(html, expected));
  assert.throws(() => assertLiveArticle(html.replace("limited finding", "unreviewed claim"), expected), /text differs/);
  assert.throws(() => assertLiveArticle(html.replace(AUTOMATION_DISCLOSURE, ""), expected), /disclosure/);
  assert.throws(() => assertLiveArticle(html.replace(`href="${url}"`, 'href="https://index-us.com/articles/other/"'), expected), /canonical/);
  assert.throws(() => assertLiveArticle(html.replace("&amp; its implications", "and a different title"), expected), /title differs/);
});
