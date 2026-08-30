import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const directory = new URL("../src/content/articles/", import.meta.url);
const files = (await readdir(directory)).filter((file) => file.endsWith(".md"));
const banned = /\b(revolutionary|game-changing|mind-blowing|insane)\b/i;

for (const file of files) {
  const source = await readFile(join(directory.pathname, file), "utf8");
  if (banned.test(source)) throw new Error(`${file}: contains hype language`);
  if (!source.includes("sources:")) throw new Error(`${file}: missing sources`);
  if (!source.includes("updatedAt:")) throw new Error(`${file}: missing updatedAt`);
}

console.log(`Validated ${files.length} article files.`);
