import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { cp, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";

async function checkout(t) {
  const directory = await mkdtemp(join(tmpdir(), "index-us-newsroom-test-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  await Promise.all([
    cp("scripts", join(directory, "scripts"), { recursive: true }),
    cp("newsroom/config.json", join(directory, "newsroom/config.json"), { recursive: true }),
    cp("src/content/articles", join(directory, "src/content/articles"), { recursive: true }),
    symlink(resolve("node_modules"), join(directory, "node_modules")),
  ]);
  execFileSync("git", ["init", "--quiet"], { cwd: directory });
  return directory;
}

function run(directory, ...args) {
  return spawnSync(process.execPath, ["scripts/newsroom.mjs", ...args], { cwd: directory, encoding: "utf8" });
}

test("new public article cannot bypass provenance by omitting newsroom metadata", async (t) => {
  const directory = await checkout(t);
  const source = await readFile(join(directory, "src/content/articles/verify-ai-tool-announcements.md"), "utf8");
  await writeFile(join(directory, "src/content/articles/unreviewed-new-story.md"), source);
  const result = run(directory, "validate");
  assert.equal(result.status, 1);
  assert.match(result.stderr, /new publications require a matching approved newsroom record/);
});

test("status reads completed outcomes without trying to read retained artifact directories as files", async (t) => {
  const directory = await checkout(t);
  const id = "20260906T010000Z";
  const state = join(directory, ".git/index-us-newsroom/runs");
  await mkdir(join(state, id), { recursive: true });
  await writeFile(join(state, `${id}.json`), JSON.stringify({ runId: id, outcome: "skip", reason: "No qualifying event." }));
  await writeFile(join(state, id, "draft.md"), "Synthetic retained fixture.");
  const result = run(directory, "status");
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).recentOutcomes[0].outcome, "skip");
});

test("finish retains pending article and evidence before releasing a held run", async (t) => {
  const directory = await checkout(t);
  const id = "20260906T010000Z";
  const state = join(directory, ".git/index-us-newsroom");
  await mkdir(join(state, "lock"), { recursive: true });
  await writeFile(join(state, "lock/owner.json"), JSON.stringify({ runId: id, worktree: directory }));
  const evidence = join(directory, "newsroom/runs", id);
  await mkdir(evidence, { recursive: true });
  const articlePath = "src/content/articles/verify-ai-tool-announcements.md";
  await writeFile(join(evidence, "record.json"), JSON.stringify({ runId: id, articlePath, decision: { kind: "hold" } }));
  const result = run(directory, "finish", id, "hold", "Waiting for independent evidence.");
  assert.equal(result.status, 0, result.stderr);
  assert.equal(await readFile(join(state, "runs", id, "pending-article.md"), "utf8"), await readFile(join(directory, articlePath), "utf8"));
  assert.match(await readFile(join(state, "runs", id, "evidence/record.json"), "utf8"), /hold/);
  await assert.rejects(readFile(join(state, "lock/owner.json")), { code: "ENOENT" });
});

test("finish cannot report publication or release another run without its verified receipt", async (t) => {
  const directory = await checkout(t);
  const id = "20260906T010000Z";
  const lock = join(directory, ".git/index-us-newsroom/lock");
  await mkdir(lock, { recursive: true });
  await writeFile(join(lock, "owner.json"), JSON.stringify({ runId: id, worktree: directory }));
  assert.equal(run(directory, "finish", id, "published", "Not verified.").status, 1);
  assert.equal(run(directory, "finish", "20260906T020000Z", "hold", "Wrong owner.").status, 1);
  assert.match(await readFile(join(lock, "owner.json"), "utf8"), new RegExp(id));
});
