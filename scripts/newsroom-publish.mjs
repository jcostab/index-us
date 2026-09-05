#!/usr/bin/env node
/** Publish one reviewed newsroom run. No drafting, editorial overrides or infrastructure repair. */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import { AUTOMATION_DISCLOSURE } from "./newsroom-validation.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPOSITORY = "jcostab/index-us";
const SITE = "https://index-us.com";
const MAX_CHECK_WAIT_MS = 10 * 60 * 1000;
const MAX_LIVE_WAIT_MS = 3 * 60 * 1000;
const INTERVAL_MS = 20 * 1000;
const REQUIRED_CHECKS = ["test", "Workers Builds: index-us"];
const REQUIRED_WORKFLOWS = ["Quality", "Deploy to Cloudflare"];
const environment = {
  ...process.env,
  WRANGLER_LOG_PATH: process.env.WRANGLER_LOG_PATH || "/private/tmp/index-us-wrangler.log",
  XDG_CACHE_HOME: process.env.XDG_CACHE_HOME || "/private/tmp/index-us-gh-cache",
  GH_PROMPT_DISABLED: "1",
  GIT_TERMINAL_PROMPT: "0",
};

function insist(condition, message) {
  if (!condition) throw new Error(message);
}

function command(program, args, { inherit = false, timeout = 120_000 } = {}) {
  try {
    return execFileSync(program, args, {
      cwd: ROOT,
      env: environment,
      encoding: "utf8",
      stdio: inherit ? "inherit" : ["ignore", "pipe", "pipe"],
      timeout,
      maxBuffer: 16 * 1024 * 1024,
    }) || "";
  } catch (error) {
    const detail = String(error.stderr || error.message || "Command failed").trim();
    throw new Error(`${program} ${args.slice(0, 3).join(" ")} failed: ${detail}`, { cause: error });
  }
}

function git(...args) { return command("git", args); }
function gh(...args) { return command("gh", [...args, "--repo", REPOSITORY]); }
function ghJson(...args) { return JSON.parse(gh(...args)); }
function sha256(value) { return createHash("sha256").update(value).digest("hex"); }
function pause(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

/** NUL-delimited status retains spaces and unusual characters without shell parsing. */
export function parseStatus(output) {
  const fields = output.split("\0");
  const entries = [];
  for (let index = 0; index < fields.length; index += 1) {
    const field = fields[index];
    if (!field) continue;
    insist(field.length >= 4 && field[2] === " ", "Unrecognised git status output.");
    const status = field.slice(0, 2);
    insist(!/[RCU]/u.test(status), "Renames, copies and unresolved merges require a separate review.");
    entries.push({ status, file: field.slice(3), staged: status[0] !== " " && status !== "??" });
  }
  return entries;
}

export function isAllowedPath(file, articlePath, runId) {
  if (file === articlePath) return true;
  const prefix = `newsroom/runs/${runId}/`;
  if (!file.startsWith(prefix)) return false;
  const relative = file.slice(prefix.length);
  return relative.length > 0 && !relative.split("/").some((part) => !part || part === "." || part === ".." || part.startsWith("."))
    && /\.(?:json|md)$/u.test(relative)
    && !/(?:^|[\/_.-])(?:drafts?|raw|transcripts?|private)(?:[\/_.-]|$)/iu.test(relative);
}

function ensureSafeFile(file) {
  const absolute = path.resolve(ROOT, file);
  insist(absolute.startsWith(`${ROOT}${path.sep}`), `Path leaves the repository: ${file}`);
  if (!existsSync(absolute)) return; // A reviewed deletion may be staged, but the article itself must exist.
  insist(lstatSync(absolute).isFile() && !lstatSync(absolute).isSymbolicLink(), `Only regular evidence files may be published: ${file}`);
  insist(realpathSync(absolute) === absolute, `Symlinked paths cannot be published: ${file}`);
}

function assertScope(articlePath, runId, { cleanIndex = false, completelyClean = false } = {}) {
  const entries = parseStatus(git("status", "--porcelain=v1", "-z", "--untracked-files=all"));
  for (const entry of entries) {
    insist(isAllowedPath(entry.file, articlePath, runId), `Unrelated working-tree change: ${entry.file}`);
    insist(!cleanIndex || !entry.staged, "The index must be empty before the publisher stages its own files.");
    ensureSafeFile(entry.file);
  }
  insist(!completelyClean || entries.length === 0, "The committed article or evidence changed during publication.");
  const branchFiles = git("diff", "--name-only", "-z", "origin/main...HEAD").split("\0").filter(Boolean);
  for (const file of branchFiles) {
    insist(isAllowedPath(file, articlePath, runId), `Unrelated commit on the publication branch: ${file}`);
    ensureSafeFile(file);
  }
  return entries.map(({ file }) => file);
}

function assertRepository() {
  insist(realpathSync(git("rev-parse", "--show-toplevel").trim()) === realpathSync(ROOT), "Run this publisher from its own repository.");
  const remote = git("remote", "get-url", "origin").trim();
  insist(/^(?:https:\/\/github\.com\/|git@github\.com:|ssh:\/\/git@github\.com\/)jcostab\/index-us(?:\.git)?\/?$/u.test(remote), "Origin is not the authorised jcostab/index-us repository.");
}

function assertRunLock(runId) {
  const commonGitDirectory = path.resolve(ROOT, git("rev-parse", "--git-common-dir").trim());
  const ownerPath = path.join(commonGitDirectory, "index-us-newsroom", "lock", "owner.json");
  insist(existsSync(ownerPath), "No newsroom run lock exists. Start this run through newsroom begin.");
  const owner = JSON.parse(readFileSync(ownerPath, "utf8"));
  insist(owner.runId === runId && typeof owner.worktree === "string" && realpathSync(owner.worktree) === realpathSync(ROOT), "Another run or worktree owns the newsroom publication lock.");
}

function articleMetadata(source) {
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/u)?.[1];
  insist(frontmatter, "The article has no YAML frontmatter.");
  const metadata = parseYaml(frontmatter);
  insist(metadata && typeof metadata === "object", "The article frontmatter is not an object.");
  return metadata;
}

function readBaseArticle(articlePath) {
  try {
    execFileSync("git", ["cat-file", "-e", `origin/main:${articlePath}`], {
      cwd: ROOT, env: environment, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], timeout: 120_000,
    });
  } catch (error) {
    // Distinguish an absent path from a failed git invocation or a corrupt object.
    const tracked = git("ls-tree", "--name-only", "origin/main", "--", articlePath).trim();
    if ([1, 128].includes(error.status) && tracked === "") return null;
    throw new Error(`Could not inspect the production article: ${articlePath}`, { cause: error });
  }
  return articleMetadata(git("show", `origin/main:${articlePath}`));
}

/** New stories cannot overwrite a published URL; updates retain their original date. */
export function assertArticleChange(kind, previousMetadata, nextMetadata) {
  insist(["new", "update"].includes(kind), "Unrecognised publication kind.");
  if (kind === "new") {
    insist(previousMetadata === null, "A new article cannot overwrite an article already published on main. Use an update run.");
    return;
  }
  insist(previousMetadata !== null, "An update must refer to an article already published on main.");
  const previousPublished = new Date(previousMetadata.publishedAt).valueOf();
  const nextPublished = new Date(nextMetadata.publishedAt).valueOf();
  const previousUpdated = new Date(previousMetadata.updatedAt).valueOf();
  const nextUpdated = new Date(nextMetadata.updatedAt).valueOf();
  insist([previousPublished, nextPublished, previousUpdated, nextUpdated].every(Number.isFinite), "Article publication and update dates must be valid timestamps.");
  insist(nextPublished === previousPublished, "Updates must preserve the original publishedAt timestamp.");
  insist(nextUpdated > previousUpdated, "Updates must advance the updatedAt timestamp.");
}

/** A merge can succeed even if the process stops before saving its receipt. */
export function recoverMergeReceipt(receipt, pr, runId) {
  if (pr.state !== "MERGED") return false;
  insist(/^[a-f0-9]{40}$/u.test(receipt.headCommit || "") && pr.headRefOid === receipt.headCommit && pr.headRefName === `newsroom/${runId}`, "The merged PR does not match the reviewed publication run.");
  insist(/^[a-f0-9]{40}$/u.test(pr.mergeCommit?.oid || ""), "GitHub did not return a valid merged commit.");
  insist(!receipt.mergeCommit || receipt.mergeCommit === pr.mergeCommit.oid, "The publication receipt records a different merge commit.");
  receipt.mergeCommit = pr.mergeCommit.oid;
  receipt.mergedAt = pr.mergedAt;
  return true;
}

/** Require real, successful checks on the exact reviewed head, including Cloudflare. */
export function assertPullRequestReady(pr, head) {
  insist(pr.headRefOid === head, "The pull-request head changed after local validation.");
  insist(pr.state === "OPEN" && !pr.isDraft, "The publication PR must be open and ready for review.");
  insist(pr.mergeable === "MERGEABLE", `The publication PR is not mergeable (${pr.mergeable}).`);
  const checks = pr.statusCheckRollup;
  insist(Array.isArray(checks) && checks.length > 0, "No GitHub checks were reported; publication is held.");
  const names = new Set();
  for (const check of checks) {
    const name = check.name || check.context;
    names.add(name);
    const passed = check.context
      ? check.state === "SUCCESS"
      : check.status === "COMPLETED" && check.conclusion === "SUCCESS";
    insist(passed, `Check ${name || "(unnamed)"} has not passed: ${check.conclusion || check.state || check.status}.`);
  }
  for (const required of REQUIRED_CHECKS) insist(names.has(required), `Required check is missing: ${required}.`);
}

export function decodeHtml(value) {
  return value.replace(/&(?:#(\d+)|#x([\da-f]+)|(amp|lt|gt|quot|apos|nbsp));/giu, (match, decimal, hex, named) => {
    if (decimal || hex) {
      const code = Number.parseInt(decimal || hex, decimal ? 10 : 16);
      return code >= 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
    }
    return { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " }[named.toLowerCase()];
  });
}

function textContent(html) {
  return decodeHtml(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/giu, " ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/giu, " ").replace(/<[^>]+>/gu, " "))
    .replace(/\s+/gu, " ").trim();
}

export function articleTextHash(html) {
  const article = html.match(/<article\b[^>]*\bdata-reading-article\b[^>]*>([\s\S]*?)<\/article>/iu)?.[1];
  insist(article, "The rendered page has no article body.");
  return sha256(textContent(article));
}

export function assertLiveArticle(html, { url, title, articleTextSha256, disclosure = AUTOMATION_DISCLOSURE }) {
  const canonicalTags = html.match(/<link\b[^>]*>/giu) || [];
  const canonical = canonicalTags.find((tag) => /\brel=["']canonical["']/iu.test(tag));
  const href = canonical?.match(/\bhref=["']([^"']+)["']/iu)?.[1];
  insist(href && decodeHtml(href) === url, "The live article canonical URL is incorrect.");
  const heading = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/iu)?.[1];
  insist(heading && textContent(heading) === title, "The live article title differs from the reviewed article.");
  const productionNote = html.match(/<aside\b[^>]*\baria-label=["']How this article was produced["'][^>]*>([\s\S]*?)<\/aside>/iu)?.[1];
  insist(productionNote && textContent(productionNote).includes(disclosure), "The live article is missing its automation disclosure.");
  insist(articleTextHash(html) === articleTextSha256, "The live article text differs from the tested build.");
}

function hasArticleLink(html, url) {
  return [...html.matchAll(/\bhref=["']([^"']+)["']/giu)].some((match) => {
    try { return new URL(decodeHtml(match[1]), SITE).href === url; } catch { return false; }
  });
}

async function fetchText(url) {
  const response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(20_000), headers: { "Cache-Control": "no-cache" } });
  insist(response.status === 200, `Production returned HTTP ${response.status}: ${url}`);
  insist(new URL(response.url).origin === SITE, `Production redirected outside Index Us: ${url}`);
  return response.text();
}

async function verifyProduction(receipt, save) {
  receipt.step = "production-workflows";
  save();
  const deadline = Date.now() + MAX_CHECK_WAIT_MS;
  while (true) {
    const runs = ghJson("run", "list", "--commit", receipt.mergeCommit, "--limit", "100", "--json", "databaseId,workflowName,status,conclusion,headSha");
    const selected = REQUIRED_WORKFLOWS.map((workflowName) => runs
      .filter((run) => run.workflowName === workflowName && run.headSha === receipt.mergeCommit)
      .sort((a, b) => b.databaseId - a.databaseId)[0]);
    for (const run of selected.filter(Boolean)) {
      insist(run.status !== "completed" || run.conclusion === "success", `Production workflow ${run.workflowName} failed (${run.conclusion}).`);
    }
    if (selected.every((run) => run?.status === "completed" && run.conclusion === "success")) {
      receipt.workflows = selected;
      break;
    }
    insist(Date.now() < deadline, "Timed out waiting for both Quality and Deploy to Cloudflare on the merged commit.");
    console.log("Waiting for production Quality and Deploy to Cloudflare workflows…");
    await pause(INTERVAL_MS);
  }
  receipt.step = "live-verification";
  save();
  const liveDeadline = Date.now() + MAX_LIVE_WAIT_MS;
  while (true) {
    try {
      const [article, home, archive, rss, sitemap] = await Promise.all([
        fetchText(receipt.articleUrl), fetchText(`${SITE}/`), fetchText(`${SITE}/articles/`),
        fetchText(`${SITE}/rss.xml`), fetchText(`${SITE}/sitemap-0.xml`),
      ]);
      assertLiveArticle(article, { url: receipt.articleUrl, title: receipt.title, articleTextSha256: receipt.articleTextSha256 });
      insist(receipt.kind !== "new" || hasArticleLink(home, receipt.articleUrl), "The new article is not linked from the homepage.");
      insist(hasArticleLink(archive, receipt.articleUrl), "The article is not linked from the archive.");
      insist(decodeHtml(rss).includes(`<link>${receipt.articleUrl}</link>`), "The article is missing from RSS.");
      insist(decodeHtml(sitemap).includes(`<loc>${receipt.articleUrl}</loc>`), "The article is missing from the sitemap.");
      receipt.liveVerifiedAt = new Date().toISOString();
      receipt.status = "verified";
      receipt.step = "complete";
      delete receipt.error;
      save();
      console.log(`Published and verified: ${receipt.articleUrl}\n${receipt.prUrl}`);
      return;
    } catch (error) {
      if (Date.now() >= liveDeadline) throw error;
      console.log(`Waiting for live verification: ${error.message}`);
      await pause(INTERVAL_MS);
    }
  }
}

export async function publish(runId) {
  insist(/^\d{8}T\d{6}Z$/u.test(runId || ""), "Usage: node scripts/newsroom-publish.mjs <YYYYMMDDTHHMMSSZ>");
  assertRepository();
  const receiptPath = path.join(ROOT, ".newsroom-work", runId, "publication.json");
  git("check-ignore", "-q", "--", path.relative(ROOT, receiptPath));
  let receipt = existsSync(receiptPath) ? JSON.parse(readFileSync(receiptPath, "utf8")) : {
    schemaVersion: 1, runId, repository: REPOSITORY, startedAt: new Date().toISOString(), status: "running", step: "preflight",
  };
  insist(receipt.runId === runId && receipt.repository === REPOSITORY, "The publication receipt does not match this run and repository.");
  const save = () => {
    mkdirSync(path.dirname(receiptPath), { recursive: true });
    receipt.updatedAt = new Date().toISOString();
    writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, { mode: 0o600 });
  };
  const step = (name) => { receipt.step = name; receipt.status = "running"; save(); console.log(`Newsroom publication: ${name}`); };
  try {
    if (receipt.prUrl && !receipt.mergeCommit) {
      insist(/^https:\/\/github\.com\/jcostab\/index-us\/pull\/\d+$/u.test(receipt.prUrl), "The saved PR URL is malformed.");
      const existing = ghJson("pr", "view", receipt.prUrl, "--json", "state,mergeCommit,mergedAt,headRefOid,headRefName");
      if (recoverMergeReceipt(receipt, existing, runId)) save();
      else insist(existing.state === "OPEN", "The publication PR was closed without merging. Reconcile this run before retrying.");
    }
    if (receipt.mergeCommit) {
      insist(/^[a-f0-9]{40}$/u.test(receipt.mergeCommit) && /^https:\/\/github\.com\/jcostab\/index-us\/pull\/\d+$/u.test(receipt.prUrl || ""), "The merge receipt is malformed.");
      insist(/^https:\/\/index-us\.com\/articles\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/u.test(receipt.articleUrl || "") && /^[a-f0-9]{64}$/u.test(receipt.articleTextSha256 || "") && typeof receipt.title === "string", "The live-verification receipt is malformed.");
      const merged = ghJson("pr", "view", receipt.prUrl, "--json", "state,mergeCommit,headRefOid,headRefName");
      insist(merged.state === "MERGED" && merged.mergeCommit?.oid === receipt.mergeCommit && merged.headRefOid === receipt.headCommit && merged.headRefName === `newsroom/${runId}`, "The recorded merge is not confirmed by GitHub.");
      await verifyProduction(receipt, save);
      return receipt;
    }
    step("preflight");
    assertRunLock(runId);
    const branch = `newsroom/${runId}`;
    insist(git("branch", "--show-current").trim() === branch, `Publication requires the isolated branch ${branch}.`);
    const recordPath = `newsroom/runs/${runId}/record.json`;
    ensureSafeFile(recordPath);
    const record = JSON.parse(readFileSync(path.join(ROOT, recordPath), "utf8"));
    const articlePath = record.articlePath;
    insist(/^src\/content\/articles\/[a-z0-9]+(?:-[a-z0-9]+)*\.md$/u.test(articlePath || ""), "The run has no safe articlePath.");
    insist(["new", "update"].includes(record.decision?.kind), "Only a publishable new or updated article can enter the publisher.");
    ensureSafeFile(articlePath);
    const source = readFileSync(path.join(ROOT, articlePath), "utf8");
    const metadata = articleMetadata(source);
    insist(typeof metadata.title === "string" && metadata.title.length >= 20 && metadata.title.length <= 90 && !/[\r\n\u0000-\u001f]/u.test(metadata.title), "The article title is invalid.");
    insist(metadata.newsroom?.disclosure === AUTOMATION_DISCLOSURE, "The article must carry the standard automation disclosure.");
    const contentSha256 = sha256(source);
    receipt = { ...receipt, kind: record.decision.kind, title: metadata.title, articlePath, articleUrl: `${SITE}/articles/${path.basename(articlePath, ".md")}/`, contentSha256 };
    save();
    git("fetch", "--quiet", "origin", "main");
    git("merge-base", "--is-ancestor", "origin/main", "HEAD");
    assertArticleChange(receipt.kind, readBaseArticle(articlePath), metadata);
    assertScope(articlePath, runId, { cleanIndex: true });
    step("editorial-validation");
    command(process.execPath, ["scripts/newsroom.mjs", "validate", runId, "--publication"], { inherit: true });
    step("local-checks");
    command("npm", ["test"], { inherit: true, timeout: 20 * 60 * 1000 });
    command("npm", ["run", "deploy:dry"], { inherit: true, timeout: 20 * 60 * 1000 });
    receipt.articleTextSha256 = articleTextHash(readFileSync(path.join(ROOT, "dist", "articles", path.basename(articlePath, ".md"), "index.html"), "utf8"));
    insist(sha256(readFileSync(path.join(ROOT, articlePath))) === contentSha256, "The article changed while the local checks ran.");
    command(process.execPath, ["scripts/newsroom.mjs", "validate", runId, "--publication"], { inherit: true });
    step("commit-and-push");
    const files = assertScope(articlePath, runId, { cleanIndex: true });
    if (files.length) {
      git("add", "--", ...files);
      git("commit", "-m", `${receipt.kind === "update" ? "Update" : "Publish"}: ${metadata.title}`);
    }
    insist(git("rev-list", "--count", "origin/main..HEAD").trim() !== "0", "The publication branch contains no changes.");
    assertScope(articlePath, runId, { completelyClean: true });
    const head = git("rev-parse", "HEAD").trim();
    receipt.headCommit = head;
    save();
    git("push", "--set-upstream", "origin", branch);
    step("pull-request");
    const existing = ghJson("pr", "list", "--head", branch, "--base", "main", "--state", "open", "--json", "number,url");
    insist(existing.length <= 1, "Multiple open PRs refer to this run.");
    if (existing.length) {
      receipt.prUrl = existing[0].url;
    } else {
      const temporary = mkdtempSync(path.join(tmpdir(), "index-us-newsroom-pr-"));
      try {
        const bodyFile = path.join(temporary, "body.md");
        writeFileSync(bodyFile, `${receipt.kind === "update" ? "Updates" : "Publishes"} “${metadata.title}” with source-backed reporting, a separate factual review and an editorial pass through edit-johns-content. The article discloses its automated production.\n\nThe public evidence record is [newsroom/runs/${runId}/record.json](https://github.com/${REPOSITORY}/blob/${head}/${recordPath}). It identifies the reviewed article hash, sources, claim checks and editorial decisions.\n\nValidation: newsroom publication gate, npm test and npm run deploy:dry passed locally. This PR must also pass Quality and Cloudflare Workers Builds before the publisher merges the exact reviewed commit.\n`, { mode: 0o600 });
        receipt.prUrl = gh("pr", "create", "--base", "main", "--head", branch, "--title", `${receipt.kind === "update" ? "Update" : "Publish"}: ${metadata.title}`, "--body-file", bodyFile).trim();
      } finally { rmSync(temporary, { recursive: true, force: true }); }
    }
    insist(/^https:\/\/github\.com\/jcostab\/index-us\/pull\/\d+$/u.test(receipt.prUrl), "GitHub did not return a publication PR URL.");
    save();
    step("github-checks");
    const registrationDeadline = Date.now() + 2 * 60 * 1000;
    while (true) {
      const registration = ghJson("pr", "view", receipt.prUrl, "--json", "headRefOid,statusCheckRollup");
      insist(registration.headRefOid === head, "The pull-request head changed before checks registered.");
      const names = new Set((registration.statusCheckRollup || []).map((check) => check.name || check.context));
      if (REQUIRED_CHECKS.every((name) => names.has(name))) break;
      insist(Date.now() < registrationDeadline, "Required Quality and Cloudflare checks did not register; publication is held.");
      console.log("Waiting for required GitHub checks to register…");
      await pause(INTERVAL_MS);
    }
    command("gh", ["pr", "checks", receipt.prUrl, "--watch", "--interval", "20", "--fail-fast", "--repo", REPOSITORY], { inherit: true, timeout: MAX_CHECK_WAIT_MS });
    let pr = ghJson("pr", "view", receipt.prUrl, "--json", "headRefOid,statusCheckRollup,mergeable,number,url,state,isDraft");
    assertPullRequestReady(pr, head);
    step("final-validation");
    assertRunLock(runId);
    git("fetch", "--quiet", "origin", "main");
    git("merge-base", "--is-ancestor", "origin/main", "HEAD");
    assertArticleChange(receipt.kind, readBaseArticle(articlePath), metadata);
    assertScope(articlePath, runId, { completelyClean: true });
    insist(git("rev-parse", "HEAD").trim() === head, "The local commit changed while GitHub checks ran.");
    insist(sha256(readFileSync(path.join(ROOT, articlePath))) === contentSha256, "The approved article changed before merge.");
    command(process.execPath, ["scripts/newsroom.mjs", "validate", runId, "--publication"], { inherit: true });
    pr = ghJson("pr", "view", receipt.prUrl, "--json", "headRefOid,statusCheckRollup,mergeable,number,url,state,isDraft");
    assertPullRequestReady(pr, head);
    step("merge");
    let mergeError;
    try { gh("pr", "merge", receipt.prUrl, "--squash", "--delete-branch", "--match-head-commit", head); }
    catch (error) { mergeError = error; }
    const merged = ghJson("pr", "view", receipt.prUrl, "--json", "state,mergeCommit,mergedAt,headRefOid");
    if (merged.state !== "MERGED" && mergeError) throw mergeError;
    insist(merged.headRefOid === head, "The merged PR did not contain the reviewed commit.");
    insist(merged.state === "MERGED" && /^[a-f0-9]{40}$/u.test(merged.mergeCommit?.oid || ""), "GitHub has not confirmed the squash merge.");
    receipt.mergeCommit = merged.mergeCommit.oid;
    receipt.mergedAt = merged.mergedAt;
    if (mergeError) receipt.cleanupWarning = "GitHub confirmed the merge, but gh reported a local branch-cleanup error. Inspect the worktree before removing it.";
    save();
    await verifyProduction(receipt, save);
    return receipt;
  } catch (error) {
    receipt.status = receipt.mergeCommit ? "merged-verification-failed" : "held";
    receipt.error = error.message;
    save();
    console.error(`Publication ${receipt.status} at ${receipt.step}: ${error.message}\nReceipt: ${receiptPath}`);
    error.newsroomReported = true;
    throw error;
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  publish(process.argv[2]).catch((error) => {
    if (!error.newsroomReported) console.error(`Publication held: ${error.message}`);
    process.exitCode = 1;
  });
}
