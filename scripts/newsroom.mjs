import { execFileSync } from "node:child_process";
import { copyFile, mkdir, readFile, readdir, realpath, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { articleDigest, countArticleWords, validateRecord } from "./newsroom-validation.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const config = JSON.parse(await readFile(join(root, "newsroom/config.json"), "utf8"));
const runPattern = /^\d{8}T\d{6}Z$/;
const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
const metadata = (source) => parse(source.match(/^---\s*\n([\s\S]*?)\n---/)?.[1] ?? "");

function runDirectory(id) {
  if (!runPattern.test(id ?? "")) throw new Error("Run ID must be YYYYMMDDTHHMMSSZ.");
  return join(root, config.evidenceDirectory, id);
}

async function records() {
  const directory = join(root, config.evidenceDirectory);
  const entries = await readdir(directory, { withFileTypes: true }).catch((error) => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  for (const entry of entries) {
    if (runPattern.test(entry.name) && entry.isSymbolicLink()) throw new Error("Run evidence cannot use symlinks.");
  }
  return Promise.all(entries.filter((entry) => entry.isDirectory() && runPattern.test(entry.name)).map(async (entry) => {
    if (entry.isSymbolicLink()) throw new Error("Run evidence cannot use symlinks.");
    const record = JSON.parse(await readFile(join(directory, entry.name, "record.json"), "utf8"));
    if (record.runId !== entry.name) throw new Error(`${entry.name}: record runId must match its directory.`);
    return record;
  }));
}

async function safeArticle(articlePath) {
  if (!/^src\/content\/articles\/[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(articlePath ?? "")) throw new Error("Invalid article path.");
  const path = join(root, articlePath);
  if (await realpath(path) !== path) throw new Error("Article cannot be a symlink.");
  return readFile(path, "utf8");
}

async function validateOne(record, all, { publication = false, snapshot = false } = {}) {
  let source;
  if (["new", "update"].includes(record.decision?.kind)) {
    source = snapshot
      ? await readFile(join(runDirectory(record.runId), "article.md"), "utf8")
      : await safeArticle(record.articlePath);
  }
  const errors = validateRecord(record, { articleSource: source, articlePath: record.articlePath, records: all, forPublication: publication });
  if (record.decision?.kind === "new" && config.legacyArticles.includes(record.articlePath?.split("/").at(-1)?.replace(/\.md$/, ""))) errors.push("A new story cannot overwrite a legacy article.");
  if (record.decision?.kind === "update" && source) {
    const earlier = all.filter((prior) => prior.runId !== record.runId && prior.articlePath === record.articlePath && Date.parse(prior.startedAt) < Date.parse(record.startedAt)).sort((a, b) => Date.parse(b.startedAt) - Date.parse(a.startedAt));
    if (earlier[0]) {
      const before = metadata(await readFile(join(runDirectory(earlier[0].runId), "article.md"), "utf8"));
      const after = metadata(source);
      if (Date.parse(before.publishedAt) !== Date.parse(after.publishedAt)) errors.push("Updates must preserve the original publishedAt.");
      if (!(Date.parse(after.updatedAt) > Date.parse(before.updatedAt))) errors.push("Updates must advance updatedAt after substantive re-verification.");
      if (!/^\s*(?:#{1,6}\s+|\*\*)?(?:Update|Correction)[^\n]*\d{4}-\d{2}-\d{2}/im.test(source.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, ""))) errors.push("Updates require a visible dated Update or Correction note using YYYY-MM-DD.");
    }
  }
  if (errors.length) throw new Error(`${record.runId}:\n${errors.map((error) => `- ${error}`).join("\n")}`);
}

async function validateAll() {
  const all = await records();
  for (const record of all) await validateOne(record, all, { snapshot: true });
  const byArticle = new Map();
  for (const record of all.filter((item) => ["new", "update"].includes(item.decision?.kind)).sort((a, b) => Date.parse(a.completedAt) - Date.parse(b.completedAt))) {
    byArticle.set(record.articlePath, record);
  }
  for (const [path, record] of byArticle) {
    const source = await safeArticle(path);
    if (articleDigest(source) !== record.articleSha256) throw new Error(`${path}: current article differs from its latest approved record.`);
  }
  const articleFiles = (await readdir(join(root, "src/content/articles"))).filter((file) => /\.mdx?$/.test(file));
  for (const file of articleFiles) {
    const path = `src/content/articles/${file}`;
    const source = await readFile(join(root, path), "utf8");
    const data = metadata(source);
    if (data.draft) continue;
    if (!config.legacyArticles.includes(file.replace(/\.mdx?$/, "")) || data.newsroom) {
      const record = byArticle.get(path);
      if (!record || record.runId !== data.newsroom?.runId) throw new Error(`${path}: new publications require a matching approved newsroom record.`);
    }
  }
  console.log(`Validated ${all.length} newsroom records and ${articleFiles.length} article provenance entries.`);
}

async function sharedState() {
  // Common git directory is shared by Codex worktrees, survives their cleanup,
  // and stays outside all Git staging and public assets.
  const common = resolve(root, git("rev-parse", "--git-common-dir"));
  const state = join(common, "index-us-newsroom");
  await mkdir(join(state, "runs"), { recursive: true });
  return state;
}

async function begin() {
  if (!config.enabled) throw new Error("Newsroom is paused in newsroom/config.json.");
  if (git("status", "--porcelain")) throw new Error("Checkout contains unfinished changes. Use a clean worktree.");
  if (!/github\.com[:/]jcostab\/index-us(?:\.git)?$/.test(git("remote", "get-url", "origin"))) throw new Error("Unexpected origin repository.");
  const state = await sharedState();
  const lock = join(state, "lock");
  try { await mkdir(lock); } catch (error) {
    if (error.code === "EEXIST") throw new Error(`Another run owns ${lock}. Inspect its owner.json and reconcile it; never delete a live lock.`);
    throw error;
  }
  const now = new Date();
  const id = now.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const owner = { runId: id, startedAt: now.toISOString(), worktree: root, pid: process.pid };
  try {
    await writeFile(join(lock, "owner.json"), `${JSON.stringify(owner, null, 2)}\n`);
    const open = JSON.parse(execFileSync("gh", ["pr", "list", "--repo", config.repository, "--state", "open", "--json", "headRefName,url"], { cwd: root, encoding: "utf8" }));
    const unfinished = open.filter((pr) => pr.headRefName.startsWith("newsroom/"));
    if (unfinished.length) throw new Error(`Reconcile existing newsroom PRs first: ${unfinished.map((pr) => pr.url).join(", ")}`);
    git("fetch", "origin", "main");
    const branches = git("branch", "--show-current");
    if (branches.startsWith("newsroom/")) {
      const priorId = branches.slice("newsroom/".length);
      const prior = runPattern.test(priorId) && await readFile(join(state, "runs", `${priorId}.json`), "utf8").then(JSON.parse).catch(() => null);
      if (!prior || !["skip", "hold", "failed", "published"].includes(prior.outcome)) throw new Error("Finish or reconcile the existing newsroom branch first.");
      if (git("rev-list", "--count", "origin/main..HEAD") !== "0") {
        // A squash merge does not retain the branch commit as an ancestor.
        const receipt = prior.publication;
        if (prior.outcome !== "published" || receipt?.status !== "verified" || receipt.headCommit !== git("rev-parse", "HEAD") || !/^https:\/\/github\.com\/jcostab\/index-us\/pull\/\d+$/.test(receipt.prUrl ?? "")) throw new Error("The prior branch has unpublished commits; reconcile it before beginning another run.");
        const merged = JSON.parse(execFileSync("gh", ["pr", "view", receipt.prUrl, "--repo", config.repository, "--json", "state,mergeCommit,headRefOid"], { cwd: root, encoding: "utf8" }));
        if (merged.state !== "MERGED" || merged.mergeCommit?.oid !== receipt.mergeCommit || merged.headRefOid !== receipt.headCommit) throw new Error("The prior squash merge could not be confirmed.");
      }
    }
    git("switch", "-c", `newsroom/${id}`, "origin/main");
    const workspace = join(root, config.draftDirectory, id);
    await mkdir(workspace, { recursive: true });
    const record = {
      schemaVersion: 1, runId: id, startedAt: now.toISOString(), completedAt: null,
      timeZone: config.timeZone,
      window: { start: new Date(now - config.discoveryWindowHours * 3600000).toISOString(), end: now.toISOString() },
      candidates: [], decision: { kind: "hold", reason: "Research has not completed." },
    };
    await writeFile(join(workspace, "record.json"), `${JSON.stringify(record, null, 2)}\n`);
    await writeFile(join(state, "runs", `${id}.json`), `${JSON.stringify({ ...owner, outcome: "running" }, null, 2)}\n`);
    console.log(JSON.stringify({ ...owner, branch: `newsroom/${id}`, workspace, recordTemplate: join(workspace, "record.json") }, null, 2));
  } catch (error) {
    await rm(lock, { recursive: true, force: true });
    throw error;
  }
}

async function finish(id, outcome, reason) {
  if (!runPattern.test(id ?? "")) throw new Error("Invalid run ID.");
  if (!["skip", "hold", "failed", "published"].includes(outcome) || !reason?.trim()) throw new Error("Use finish <id> skip|hold|failed|published <reason>.");
  const state = await sharedState();
  const lock = join(state, "lock");
  const owner = JSON.parse(await readFile(join(lock, "owner.json"), "utf8"));
  if (owner.runId !== id) throw new Error(`Lock belongs to ${owner.runId}.`);
  if (typeof owner.worktree !== "string" || await realpath(owner.worktree) !== await realpath(root)) throw new Error("Finish must run in the worktree that owns this run. Recover its saved state explicitly first.");
  const workspace = join(root, config.draftDirectory, id);
  const receipt = await readFile(join(workspace, "publication.json"), "utf8").then(JSON.parse).catch(() => null);
  if (outcome === "published" && receipt?.status !== "verified") throw new Error("A verified production receipt is required to finish as published.");
  const publicRecord = await readFile(join(runDirectory(id), "record.json"), "utf8").then(JSON.parse).catch(() => null);
  const research = publicRecord ?? await readFile(join(workspace, "record.json"), "utf8").then(JSON.parse).catch(() => null);
  const retained = join(state, "runs", id);
  await mkdir(retained, { recursive: true });
  for (const name of ["draft.md", "preservation.md", "editorial-review.md", "factual-review.md", "research-brief.md"]) {
    const path = join(workspace, name);
    try {
      if (await realpath(path) !== path) throw new Error("Run artifacts cannot use symlinks.");
      await copyFile(path, join(retained, name));
    } catch (error) { if (error.code !== "ENOENT") throw error; }
  }
  // A branch name alone cannot retain an uncommitted article when Codex removes
  // its worktree. Save the actual pending content before releasing the run.
  if (publicRecord?.articlePath) {
    const source = await safeArticle(publicRecord.articlePath);
    await writeFile(join(retained, "pending-article.md"), source);
  }
  async function retainEvidence(from, to) {
    const entries = await readdir(from, { withFileTypes: true }).catch((error) => { if (error.code === "ENOENT") return []; throw error; });
    await mkdir(to, { recursive: true });
    for (const entry of entries) {
      if (entry.isSymbolicLink()) throw new Error("Run evidence cannot use symlinks.");
      if (entry.isDirectory()) await retainEvidence(join(from, entry.name), join(to, entry.name));
      else if (entry.isFile() && /\.(json|md)$/.test(entry.name)) await copyFile(join(from, entry.name), join(to, entry.name));
    }
  }
  await retainEvidence(runDirectory(id), join(retained, "evidence"));
  await writeFile(join(state, "runs", `${id}.json`), `${JSON.stringify({ ...owner, completedAt: new Date().toISOString(), outcome, reason, research, publication: receipt }, null, 2)}\n`);
  await rm(lock, { recursive: true });
  console.log(`Recorded ${outcome} for ${id}; released the shared lock.`);
}

async function status() {
  const common = resolve(root, git("rev-parse", "--git-common-dir"));
  const state = join(common, "index-us-newsroom");
  const lock = await readFile(join(state, "lock/owner.json"), "utf8").then(JSON.parse).catch(() => null);
  const recent = (await readdir(join(state, "runs"), { withFileTypes: true }).catch(() => [])).filter((entry) => entry.isFile() && /^\d{8}T\d{6}Z\.json$/.test(entry.name)).map((entry) => entry.name).sort().slice(-12);
  const outcomes = await Promise.all(recent.map(async (name) => JSON.parse(await readFile(join(state, "runs", name), "utf8"))));
  const all = await records();
  const summaries = outcomes.map(({ runId, startedAt, completedAt, outcome, reason, worktree, publication }) => ({ runId, startedAt, completedAt, outcome, reason, worktree, publication: publication && { status: publication.status, step: publication.step, prUrl: publication.prUrl, articleUrl: publication.articleUrl, error: publication.error } }));
  console.log(JSON.stringify({ enabled: config.enabled, timeZone: config.timeZone, schedule: config.schedule, scheduler: "Registration must be confirmed in Codex Scheduled; repository configuration does not create a task.", lock, recentOutcomes: summaries, publishedStories: all.filter((record) => record.story).map((record) => ({ runId: record.runId, story: record.story, articlePath: record.articlePath })) }, null, 2));
}

async function main() {
  const [command = "status", id, ...args] = process.argv.slice(2);
  if (command === "status") return status();
  if (command === "begin") return begin();
  if (command === "finish") return finish(id, args[0], args.slice(1).join(" "));
  if (command === "validate" && !id) return validateAll();
  if (["validate", "snapshot"].includes(command)) {
    if (!config.enabled && args.includes("--publication")) throw new Error("Newsroom publication is paused.");
    const all = await records();
    const record = all.find((item) => item.runId === id);
    if (!record) throw new Error(`No record for ${id}.`);
    await validateOne(record, all, { publication: args.includes("--publication") || command === "snapshot" });
    if (command === "snapshot") {
      if (!["new", "update"].includes(record.decision?.kind)) throw new Error("Only publishable records have article snapshots.");
      await copyFile(join(root, record.articlePath), join(runDirectory(id), "article.md"));
    } else if (["new", "update"].includes(record.decision?.kind)) {
      const snapshot = await readFile(join(runDirectory(id), "article.md"), "utf8");
      if (articleDigest(snapshot) !== record.articleSha256) throw new Error("Approved article snapshot is missing or differs from record.");
    }
    console.log(`${id}: ${command} passed.`);
    return;
  }
  if (command === "digest") {
    const source = await safeArticle(id);
    console.log(JSON.stringify({ articleSha256: articleDigest(source), words: countArticleWords(source), readingMinutes: Math.ceil(countArticleWords(source) / 200) }, null, 2));
    return;
  }
  throw new Error("Commands: status | begin | validate [runId] [--publication] | snapshot <runId> | digest <articlePath> | finish <runId> <outcome> <reason>");
}

main().catch((error) => { console.error(error.message); process.exitCode = 1; });
