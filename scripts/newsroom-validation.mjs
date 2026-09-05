import { createHash } from "node:crypto";
import { isIP } from "node:net";
import { parse } from "yaml";

export const AUTOMATION_DISCLOSURE = "This article was researched, drafted, edited and fact-checked using AI tools against the linked sources. It was published automatically under the Index Us editorial policy and was not reviewed by a human before publication.";

export function articleDigest(source) {
  return createHash("sha256").update(source, "utf8").digest("hex");
}

// Keep this identical to the publication's existing body-word calculation.
export function countArticleWords(source) {
  const body = source.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, "");
  const countableBody = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/\]\([^)]*\)/g, "]");
  return countableBody.match(/\b[\p{L}\p{N}][\p{L}\p{N}’'-]*\b/gu)?.length ?? 0;
}

const object = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const text = (value) => typeof value === "string" && value.trim().length > 0;
const hash = (value) => typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
const slug = (value) => typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
const pathPattern = /^src\/content\/articles\/[a-z0-9]+(?:-[a-z0-9]+)*\.md$/;
const timePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/;
const dayPattern = /^\d{4}-\d{2}-\d{2}$/;

function dateTime(value, { day = false, unknown = false } = {}) {
  if (unknown && value === "unknown") return null;
  if (typeof value !== "string" || !(timePattern.test(value) || (day && dayPattern.test(value)))) return NaN;
  const date = Date.parse(value);
  const calendarDay = Date.parse(value.slice(0, 10));
  if (!Number.isFinite(date) || !Number.isFinite(calendarDay) || new Date(calendarDay).toISOString().slice(0, 10) !== value.slice(0, 10)) return NaN;
  return date;
}

function publicURL(value) {
  if (typeof value !== "string" || value.trim() !== value) return false;
  try {
    const url = new URL(value);
    const hostname = url.hostname.replace(/^\[|\]$/g, "").replace(/\.$/, "").toLowerCase();
    return url.protocol === "https:" && !url.username && !url.password && !isIP(hostname) && hostname.includes(".") &&
      !/(^|\.)(localhost|local|internal|intranet|lan|home|test|invalid|onion)$/.test(hostname);
  } catch {
    return false;
  }
}

function canonicalURL(value) {
  try {
    const url = new URL(value);
    url.hash = "";
    for (const key of [...url.searchParams.keys()]) {
      if (/^(utm_.+|fbclid|gclid|msclkid)$/i.test(key)) url.searchParams.delete(key);
    }
    url.searchParams.sort();
    url.pathname = url.pathname.replace(/\/$/, "") || "/";
    return url.toString();
  } catch {
    return value;
  }
}

/** Validate recorded attestations and file integrity; this cannot establish source truth. */
export function validateRecord(record, { articleSource, articlePath, records = [], now = new Date(), forPublication = false } = {}) {
  const errors = [];
  const check = (valid, message) => { if (!valid) errors.push(message); };
  if (!object(record)) return ["record must be an object"];
  check(record.schemaVersion === 1, "schemaVersion must be 1");
  check(typeof record.runId === "string" && /^[0-9]{8}T[0-9]{6}Z$/.test(record.runId), "runId must use YYYYMMDDTHHMMSSZ");
  const started = dateTime(record.startedAt);
  const completed = dateTime(record.completedAt);
  check(Number.isFinite(started), "startedAt must be an ISO timestamp");
  check(Number.isFinite(completed), "completedAt must be an ISO timestamp");
  check(!Number.isFinite(started) || !Number.isFinite(completed) || completed >= started, "completedAt must not precede startedAt");
  const kind = record.decision?.kind;
  check(["new", "update", "skip", "hold"].includes(kind), "decision.kind must be new, update, skip or hold");
  check(text(record.decision?.reason), "decision.reason must be nonempty");

  const time = now instanceof Date ? now.getTime() : Date.parse(now);
  if (forPublication) {
    check(Number.isFinite(time), "now must be a valid date");
    check(!Number.isFinite(started) || started <= time + 300_000, "startedAt is in the future");
    check(!Number.isFinite(completed) || completed <= time + 300_000, "completedAt is in the future");
    check(!Number.isFinite(completed) || time - completed <= 86_400_000, "completedAt is stale for publication (over 24 hours)");
  }
  if (!["new", "update"].includes(kind)) return errors;

  const story = object(record.story) ? record.story : {};
  check(slug(story.id), "story.id must be a lowercase slug");
  const eventDate = dateTime(story.eventDate);
  check(Number.isFinite(eventDate), "story.eventDate must be an exact ISO timestamp");
  check(Array.isArray(story.canonicalUrls) && story.canonicalUrls.length > 0 && story.canonicalUrls.every(publicURL), "story.canonicalUrls must contain public HTTPS URLs without credentials or IP addresses");
  check(!Number.isFinite(eventDate) || !Number.isFinite(completed) || eventDate <= completed + 300_000, "story.eventDate must not follow completedAt by more than five minutes");
  if (forPublication && Number.isFinite(eventDate)) {
    check(eventDate <= time + 300_000, "story.eventDate is in the future");
    check(time - eventDate <= 172_800_000, "story.eventDate is stale for publication (over 48 hours)");
  }
  check(typeof record.articlePath === "string" && pathPattern.test(record.articlePath), "articlePath must name a Markdown article inside src/content/articles");
  if (articlePath !== undefined) check(articlePath === record.articlePath, "articlePath does not match the supplied article path");
  check(hash(record.articleSha256), "articleSha256 must be a SHA-256 digest");
  check(typeof articleSource === "string", "articleSource is required for new or update records");
  const digest = typeof articleSource === "string" ? articleDigest(articleSource) : undefined;
  if (digest) check(record.articleSha256 === digest, "articleSha256 does not match the article file");

  const sources = Array.isArray(record.sources) ? record.sources : [];
  check(sources.length >= 2, "at least two sources are required");
  const sourceIds = new Set();
  const sourceURLs = new Set();
  const families = new Set();
  const editorialReviewed = dateTime(record.editorial?.reviewedAt);
  const factReviewed = dateTime(record.factCheck?.reviewedAt);
  let primary = false;
  for (const [index, item] of sources.entries()) {
    const source = object(item) ? item : {};
    const prefix = `sources[${index}]`;
    check(text(source.id) && !sourceIds.has(source.id), `${prefix}.id must be nonempty and unique`);
    sourceIds.add(source.id);
    check(publicURL(source.url), `${prefix}.url must be a public HTTPS URL without credentials or an IP address`);
    const url = canonicalURL(source.url);
    check(!sourceURLs.has(url), `${prefix}.url repeats another source URL`);
    sourceURLs.add(url);
    for (const field of ["title", "publisher", "independenceGroup", "locator"]) check(text(source[field]), `${prefix}.${field} must be nonempty`);
    check(["primary", "independent"].includes(source.kind), `${prefix}.kind must be primary or independent`);
    primary ||= source.kind === "primary";
    if (text(source.independenceGroup)) families.add(source.independenceGroup.trim().toLowerCase());
    for (const field of ["publishedAt", "eventDate", "retrievedAt"]) {
      const value = dateTime(source[field], { day: field !== "retrievedAt", unknown: field !== "retrievedAt" });
      check(value === null || Number.isFinite(value), `${prefix}.${field} must be an ISO date${field === "retrievedAt" ? "time" : " or unknown"}`);
      check(!Number.isFinite(value) || !Number.isFinite(completed) || value <= completed + 300_000, `${prefix}.${field} must not follow completedAt by more than five minutes`);
      if (field === "retrievedAt") {
        check(!Number.isFinite(value) || !Number.isFinite(started) || value >= started, `${prefix}.retrievedAt must not precede startedAt; sources need a fresh check in this run`);
        check(!Number.isFinite(value) || !Number.isFinite(factReviewed) || value <= factReviewed, `${prefix}.retrievedAt must not follow factCheck.reviewedAt`);
      }
      if (forPublication && Number.isFinite(value)) check(value <= time + 300_000, `${prefix}.${field} is in the future`);
    }
  }
  check(primary, "at least one primary source is required");
  check(families.size >= 2, "at least two source independenceGroups are required");
  check(Array.isArray(story.canonicalUrls) && story.canonicalUrls.every((url) => sourceURLs.has(canonicalURL(url))), "story.canonicalUrls must be included among the checked sources");

  const claims = Array.isArray(record.claims) ? record.claims : [];
  const claimIds = new Set();
  check(claims.length >= 5, "at least five checked material claims are required");
  for (const [index, item] of claims.entries()) {
    const claim = object(item) ? item : {};
    const prefix = `claims[${index}]`;
    check(text(claim.id) && !claimIds.has(claim.id), `${prefix}.id must be nonempty and unique`);
    claimIds.add(claim.id);
    check(text(claim.text), `${prefix}.text must be nonempty`);
    check(["fact", "attributed_claim", "inference"].includes(claim.type), `${prefix}.type must be fact, attributed_claim or inference`);
    check(["supported", "qualified"].includes(claim.status), `${prefix}.status must be supported or qualified; unresolved claims block publication`);
    check(Array.isArray(claim.sourceIds) && claim.sourceIds.length > 0 && claim.sourceIds.every((id) => typeof id === "string" && sourceIds.has(id)), `${prefix}.sourceIds must reference supporting sources`);
    check(text(claim.sourceLocator), `${prefix}.sourceLocator must be nonempty`);
  }

  const agentIds = [record.drafting?.agentId, record.editorial?.agentId, record.factCheck?.agentId];
  check(agentIds.every(text) && new Set(agentIds).size === 3, "drafting, editorial and factCheck require three distinct nonempty agentIds");
  check(record.editorial?.skill === "edit-johns-content", "editorial.skill must be edit-johns-content");
  check(Array.isArray(record.editorial?.notes) && record.editorial.notes.length > 0 && record.editorial.notes.every(text), "editorial.notes must contain nonempty notes");
  check(record.factCheck?.status === "passed", "factCheck.status must be passed");
  check(record.factCheck?.claimsCoverage === true, "factCheck.claimsCoverage must attest all material final claims were reviewed");
  check(!Number.isFinite(editorialReviewed) || !Number.isFinite(factReviewed) || factReviewed >= editorialReviewed, "factCheck.reviewedAt must not precede editorial.reviewedAt");
  for (const role of ["editorial", "factCheck"]) {
    const review = record[role];
    const reviewed = dateTime(review?.reviewedAt);
    check(Number.isFinite(reviewed), `${role}.reviewedAt must be an ISO timestamp`);
    check(!Number.isFinite(reviewed) || !Number.isFinite(started) || reviewed >= started, `${role}.reviewedAt must not precede startedAt`);
    check(!Number.isFinite(reviewed) || !Number.isFinite(completed) || reviewed <= completed, `${role}.reviewedAt must not follow completedAt`);
    check(hash(review?.articleSha256) && review.articleSha256 === record.articleSha256, `${role}.articleSha256 must match the final article digest`);
    if (forPublication && Number.isFinite(reviewed)) {
      check(reviewed <= time + 300_000, `${role}.reviewedAt is in the future`);
      check(time - reviewed <= 86_400_000, `${role}.reviewedAt is stale for publication (over 24 hours)`);
    }
  }

  const rubric = { evidence: [28, 35], context: [16, 20], originalValue: [16, 20], voice: [12, 15], presentation: [8, 10] };
  let total = 0;
  for (const [field, [minimum, maximum]] of Object.entries(rubric)) {
    const score = record.quality?.[field];
    check(Number.isFinite(score) && score >= minimum && score <= maximum, `quality.${field} must be between ${minimum} and ${maximum}`);
    if (Number.isFinite(score)) total += score;
  }
  check(total >= 85, "quality total must be at least 85");
  for (const [surface, validWidth] of [["desktop", (width) => width >= 1_024], ["mobile", (width) => width > 0 && width <= 480]]) {
    const result = record.checks?.[surface];
    check(result?.status === "passed", `checks.${surface}.status must be passed`);
    check(Number.isInteger(result?.width) && validWidth(result.width), `checks.${surface}.width must record a ${surface === "desktop" ? "desktop viewport of at least 1024" : "mobile viewport from 1 to 480"} pixels`);
    check(text(result?.notes), `checks.${surface}.notes must describe the render verification`);
  }
  check(Array.isArray(record.riskFlags) && record.riskFlags.length === 0, "riskFlags must be an empty array before publication");
  check(Array.isArray(record.quotes), "quotes must be an array, including when no quotations are used");
  const quoteWords = new Map();
  for (const [index, quote] of (Array.isArray(record.quotes) ? record.quotes : []).entries()) {
    check(sourceIds.has(quote?.sourceId) && typeof quote?.sourceId === "string", `quotes[${index}].sourceId must reference a source`);
    check(Number.isInteger(quote?.words) && quote.words >= 0, `quotes[${index}].words must be a nonnegative integer`);
    if (Number.isInteger(quote?.words) && quote.words >= 0) {
      const totalWords = (quoteWords.get(quote.sourceId) ?? 0) + quote.words;
      quoteWords.set(quote.sourceId, totalWords);
      check(totalWords <= 25, `quotes for ${quote.sourceId} exceed 25 words`);
    }
  }

  if (typeof articleSource === "string") {
    const match = articleSource.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
    let metadata;
    try { metadata = match ? parse(match[1], { maxAliasCount: 20 }) : undefined; } catch { errors.push("article frontmatter must be valid YAML with unique keys"); }
    check(object(metadata), "article must have a frontmatter mapping");
    if (object(metadata)) {
      check(metadata.author === "Index Us Editorial", "article author must be Index Us Editorial");
      check(metadata.draft === false, "article draft must explicitly be false");
      check(metadata.newsroom?.runId === record.runId, "article newsroom.runId must match the run record");
      check(metadata.newsroom?.storyId === story.id, "article newsroom.storyId must match story.id");
      check(metadata.newsroom?.disclosure === AUTOMATION_DISCLOSURE, "article newsroom.disclosure must use the required automation disclosure");
      const listedSources = new Set((Array.isArray(metadata.sources) ? metadata.sources : []).map((source) => source?.url));
      check(sources.every((source) => listedSources.has(source?.url)), "article sources must include every record source URL");
      const words = countArticleWords(articleSource);
      check(words >= 1_200 && words <= (kind === "new" ? 2_400 : 6_000), `article body must contain 1200–${kind === "new" ? 2400 : 6000} words (found ${words})`);
      check(Number.isInteger(metadata.readingMinutes) && metadata.readingMinutes === Math.ceil(words / 200), "article readingMinutes must equal body words divided by 200, rounded up");
      const published = dateTime(metadata.publishedAt, { day: kind === "update" });
      const updated = dateTime(metadata.updatedAt);
      check(Number.isFinite(published), `article publishedAt must be an ISO ${kind === "new" ? "timestamp for new articles" : "date or timestamp"}`);
      check(Number.isFinite(updated), "article updatedAt must be an ISO timestamp");
      check(!Number.isFinite(published) || !Number.isFinite(updated) || updated >= published, "article updatedAt must not precede publishedAt");
      if (kind === "new") check(!Number.isFinite(published) || !Number.isFinite(started) || published >= started, "new article publishedAt must not precede startedAt");
      check(!Number.isFinite(updated) || !Number.isFinite(started) || updated >= started, "article updatedAt must not precede startedAt");
      check(!Number.isFinite(published) || !Number.isFinite(completed) || published <= completed + 300_000, "article publishedAt must not follow completedAt by more than five minutes");
      check(!Number.isFinite(updated) || !Number.isFinite(completed) || updated <= completed + 300_000, "article updatedAt must not follow completedAt by more than five minutes");
      if (forPublication) {
        check(!Number.isFinite(published) || published <= time + 300_000, "article publishedAt is in the future");
        check(!Number.isFinite(updated) || updated <= time + 300_000, "article updatedAt is in the future");
      }
    }
  }

  const earlier = (Array.isArray(records) ? records : []).filter((prior) => {
    if (!object(prior) || typeof prior.runId !== "string" || prior.runId === record.runId || !["new", "update"].includes(prior.decision?.kind)) return false;
    const priorStarted = dateTime(prior.startedAt);
    return priorStarted < started || (priorStarted === started && prior.runId < record.runId);
  });
  const sameStory = earlier.filter((prior) => prior.story?.id === story.id);
  if (kind === "new") {
    check(sameStory.length === 0, "new story.id has already been covered; use an update");
    check(!earlier.some((prior) => prior.articlePath === record.articlePath), "new articlePath has already been used; preserve existing coverage through an update");
    const eventURLs = new Set((Array.isArray(story.canonicalUrls) ? story.canonicalUrls : []).map(canonicalURL));
    check(!earlier.some((prior) => (Array.isArray(prior.story?.canonicalUrls) ? prior.story.canonicalUrls : []).some((url) => eventURLs.has(canonicalURL(url)))), "new story canonical URL has already been covered; use an update");
  } else {
    check(sameStory.length > 0, "update requires a previously recorded story.id");
    check(sameStory.length === 0 || sameStory.every((prior) => prior.articlePath === record.articlePath), "update must preserve the existing articlePath");
    check(sameStory.length === 0 || sameStory.every((prior) => eventDate > dateTime(prior.story?.eventDate)), "update story.eventDate must identify a newer development");
  }
  return errors;
}
