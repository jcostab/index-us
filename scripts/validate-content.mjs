import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const directory = new URL("../src/content/articles/", import.meta.url);
const files = (await readdir(directory)).filter((file) => file.endsWith(".md"));
const banned = /\b(revolutionary|game-changing|mind-blowing|insane)\b/i;
const minimumWords = 1_200;
const maximumWords = 6_000;

for (const file of files) {
  const source = await readFile(join(directory.pathname, file), "utf8");
  const body = source.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, "");
  const countableBody = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/\]\([^)]*\)/g, "]");
  const wordCount = countableBody.match(/\b[\p{L}\p{N}][\p{L}\p{N}’'-]*\b/gu)?.length ?? 0;
  const readingMinutes = Number(source.match(/^readingMinutes:\s*(\d+)\s*$/m)?.[1]);

  if (banned.test(source)) throw new Error(`${file}: contains hype language`);
  if (!source.includes("sources:")) throw new Error(`${file}: missing sources`);
  if (!source.includes("updatedAt:")) throw new Error(`${file}: missing updatedAt`);
  if (!Number.isInteger(readingMinutes) || readingMinutes < 6 || readingMinutes > 30) {
    throw new Error(`${file}: readingMinutes must be between 6 and 30`);
  }
  if (wordCount < minimumWords || wordCount > maximumWords) {
    throw new Error(
      `${file}: ${wordCount} body words; expected ${minimumWords}–${maximumWords} for a 6–30 minute article`,
    );
  }
  const estimatedMinutes = Math.ceil(wordCount / 200);
  if (readingMinutes !== estimatedMinutes) {
    throw new Error(
      `${file}: readingMinutes is ${readingMinutes}; expected ${estimatedMinutes} at the documented 200 words per minute`,
    );
  }
}

console.log(`Validated ${files.length} article files.`);
