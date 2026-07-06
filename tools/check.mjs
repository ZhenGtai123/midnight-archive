import { createHash } from "node:crypto";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { site, stories, storyDeepDives, themeCollections } from "../content/midnight-archive.mjs";
import {
  englishSite,
  englishStaticPages,
  englishStories,
  englishStoryDeepDives,
  englishThemeCollections
} from "../content/midnight-archive-en.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const siteRoot = path.join(root, "dist", site.slug);
const docsRoot = path.join(root, "docs");
const strictDocs = process.argv.includes("--strict-docs");
const ignoredDocsPrefixes = ["seasonal-observatory/"];
const archivePagePaths = [
  "archive/index.html",
  "archive/people/index.html",
  "archive/beings/index.html",
  "archive/underworld/index.html",
  "archive/objects/index.html",
  "archive/relations/index.html",
  "archive/route/index.html"
];

const requiredPages = [
  "index.html",
  ...archivePagePaths,
  "themes/index.html",
  "content-roadmap/index.html",
  "about/index.html",
  "contact/index.html",
  "privacy/index.html",
  "terms/index.html",
  "advertising-policy/index.html",
  "editorial-policy/index.html",
  "authors/index.html",
  "sources/index.html",
  "sitemap.xml",
  "rss.xml",
  "robots.txt",
  "ads.txt",
  "404.html",
  ".nojekyll",
  "assets/midnight.css",
  "assets/midnight.js",
  "assets/logo-midnight-archive.svg",
  "assets/hero-midnight-archive.png",
  "assets/generated/archive-people.webp",
  "assets/generated/archive-beings.webp",
  "assets/generated/archive-underworld.webp",
  "assets/generated/archive-objects.webp",
  "assets/generated/archive-relations.webp",
  "assets/generated/story-xifangping.webp",
  "assets/generated/story-nie-xiaoqian.webp",
  "assets/generated/story-painted-skin.webp",
  "assets/generated/story-laoshan-daoshi.webp",
  "assets/generated/story-wang-liulang.webp",
  "en/index.html",
  ...archivePagePaths.map((page) => `en/${page}`),
  "en/themes/index.html",
  "en/content-roadmap/index.html",
  "en/about/index.html",
  "en/contact/index.html",
  "en/privacy/index.html",
  "en/terms/index.html",
  "en/advertising-policy/index.html",
  "en/editorial-policy/index.html",
  "en/authors/index.html",
  "en/sources/index.html",
  "en/rss.xml",
  ...englishStories.map((story) => `en/stories/${story.slug}/index.html`),
  ...englishThemeCollections.map((theme) => `en/themes/${theme.slug}/index.html`)
];

const requiredStoryFields = [
  "slug",
  "title",
  "sourceBook",
  "sourceTitle",
  "originalAuthor",
  "era",
  "sourceUrl",
  "sourceRights",
  "editorialMode",
  "editor",
  "lastReviewed",
  "paragraphs"
];

const requiredEnglishStoryFields = [
  ...requiredStoryFields,
  "translatorNote",
  "category",
  "readingTime",
  "tags",
  "summary",
  "notes"
];

const failures = [];
const warnings = [];
const storySlugs = new Set(stories.map((story) => story.slug));
const englishStorySlugs = new Set(englishStories.map((story) => story.slug));

async function exists(relativePath, base = siteRoot) {
  try {
    await access(path.join(base, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function readOutput(relativePath) {
  return readFile(path.join(siteRoot, relativePath), "utf8");
}

function canonicalUrlForHtml(relativePath) {
  const clean = relativePath.replaceAll("\\", "/");
  if (clean === "index.html") return `${site.canonicalOrigin}${site.basePath}`;
  if (clean.endsWith("/index.html")) {
    return `${site.canonicalOrigin}${site.basePath}${clean.slice(0, -"index.html".length)}`;
  }
  return `${site.canonicalOrigin}${site.basePath}${clean}`;
}

function pagePathFor(pathName) {
  if (!pathName) return "index.html";
  return `${pathName.replace(/\/?$/, "/")}index.html`;
}

function wordCount(value) {
  return String(value)
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function requireField(object, field, label) {
  if (!object[field] || (Array.isArray(object[field]) && object[field].length === 0)) {
    failures.push(`${label} missing ${field}`);
  }
}

async function checkHtmlBasics(relativePath, expectedLang, expectedAlternateLang = null) {
  if (!(await exists(relativePath))) {
    failures.push(`Missing output for HTML check: ${relativePath}`);
    return;
  }

  const html = await readOutput(relativePath);
  const canonical = canonicalUrlForHtml(relativePath);
  if (!html.includes(`<html lang="${expectedLang}">`)) {
    failures.push(`${relativePath} missing html lang ${expectedLang}`);
  }
  if (!html.includes(`<link rel="canonical" href="${canonical}">`)) {
    failures.push(`${relativePath} canonical is not self-referential`);
  }
  if (!html.includes(`hreflang="${expectedLang}"`)) {
    failures.push(`${relativePath} missing self hreflang ${expectedLang}`);
  }
  if (expectedAlternateLang && !html.includes(`hreflang="${expectedAlternateLang}"`)) {
    failures.push(`${relativePath} missing alternate hreflang ${expectedAlternateLang}`);
  }
  if (expectedAlternateLang && !html.includes('hreflang="x-default"')) {
    failures.push(`${relativePath} missing x-default hreflang`);
  }
}

function checkStoryData(story, deepDives, prefix, label, requiredFields, minLength, warningFactor = 1.5) {
  for (const field of requiredFields) {
    requireField(story, field, `${label} ${story.slug || story.title}`);
  }

  const storyLength = `${(story.paragraphs || []).join(" ")} ${(deepDives[story.slug] || []).join(" ")}`;
  const metric = prefix ? wordCount(storyLength) : storyLength.length;
  if (metric < minLength) {
    failures.push(`${label} ${story.slug} is too thin (${metric}${prefix ? " words" : " chars"})`);
  } else if (warningFactor > 1 && metric < minLength * warningFactor) {
    warnings.push(`${label} ${story.slug} is still a compact article (${metric}${prefix ? " words" : " chars"})`);
  }

  if (!story.sourceUrl?.startsWith("https://")) {
    failures.push(`${label} ${story.slug} sourceUrl must be https`);
  }

  const storyPath = `${prefix}stories/${story.slug}/index.html`;
  if (!requiredPages.includes(storyPath) && prefix) {
    failures.push(`English requiredPages missing ${storyPath}`);
  }
}

async function collectFiles(baseDir, current = "") {
  if (!(await exists(current || ".", baseDir))) return [];
  const entries = await readdir(path.join(baseDir, current), { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relative = path.posix.join(current.replaceAll("\\", "/"), entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(baseDir, relative)));
    } else if (entry.isFile()) {
      files.push(relative);
    }
  }

  return files;
}

async function fileHash(baseDir, relativePath) {
  const buffer = await readFile(path.join(baseDir, relativePath));
  return createHash("sha256").update(buffer).digest("hex");
}

async function checkDocsSync() {
  if (!(await exists("index.html", docsRoot))) {
    const message = "docs/ does not contain a generated index.html";
    if (strictDocs) failures.push(message);
    else warnings.push(message);
    return;
  }

  const distFiles = (await collectFiles(siteRoot)).sort();
  const docsFiles = (await collectFiles(docsRoot))
    .filter((file) => !ignoredDocsPrefixes.some((prefix) => file.startsWith(prefix)))
    .sort();
  const distSet = new Set(distFiles);
  const docsSet = new Set(docsFiles);
  const missing = distFiles.filter((file) => !docsSet.has(file));
  const extra = docsFiles.filter((file) => !distSet.has(file));
  const shared = distFiles.filter((file) => docsSet.has(file));
  const changed = [];

  for (const file of shared) {
    if ((await fileHash(siteRoot, file)) !== (await fileHash(docsRoot, file))) {
      changed.push(file);
    }
  }

  if (missing.length || extra.length || changed.length) {
    const summary = `docs/ is not synced with dist/${site.slug} (${missing.length} missing, ${extra.length} extra, ${changed.length} changed)`;
    if (strictDocs) {
      failures.push(
        `${summary}. Examples: ${[...missing, ...extra, ...changed].slice(0, 8).join(", ")}`
      );
    } else {
      warnings.push(`${summary}. Run node tools/sync-docs.mjs after this check.`);
    }
  }
}

for (const page of requiredPages) {
  if (!(await exists(page))) failures.push(`Missing output: ${page}`);
}

for (const story of stories) {
  checkStoryData(story, storyDeepDives, "", "Story", requiredStoryFields, 650);
  const storyPath = `stories/${story.slug}/index.html`;
  if (!(await exists(storyPath))) failures.push(`Missing story page: ${storyPath}`);
}

for (const story of englishStories) {
  checkStoryData(story, englishStoryDeepDives, "en/", "English story", requiredEnglishStoryFields, 420, 1);
  const storyPath = `en/stories/${story.slug}/index.html`;
  if (!(await exists(storyPath))) failures.push(`Missing English story page: ${storyPath}`);
}

for (const theme of themeCollections) {
  for (const field of ["slug", "title", "deck", "description", "tone", "storySlugs", "editorialNote"]) {
    requireField(theme, field, `Theme ${theme.slug || theme.title}`);
  }

  if ((theme.storySlugs || []).length < 3) {
    failures.push(`Theme ${theme.slug} should include at least 3 stories`);
  }

  for (const slug of theme.storySlugs || []) {
    if (!storySlugs.has(slug)) failures.push(`Theme ${theme.slug} references missing story ${slug}`);
  }

  const themePath = `themes/${theme.slug}/index.html`;
  if (!(await exists(themePath))) failures.push(`Missing theme page: ${themePath}`);
}

for (const theme of englishThemeCollections) {
  for (const field of ["slug", "title", "deck", "description", "tone", "storySlugs", "editorialNote"]) {
    requireField(theme, field, `English theme ${theme.slug || theme.title}`);
  }

  for (const slug of theme.storySlugs || []) {
    if (!englishStorySlugs.has(slug)) failures.push(`English theme ${theme.slug} references missing story ${slug}`);
  }

  const themePath = `en/themes/${theme.slug}/index.html`;
  if (!(await exists(themePath))) failures.push(`Missing English theme page: ${themePath}`);
}

await checkHtmlBasics("index.html", "zh-CN", "en");
await checkHtmlBasics("themes/index.html", "zh-CN", "en");
await checkHtmlBasics("en/index.html", "en", "zh-CN");
await checkHtmlBasics("en/themes/index.html", "en", "zh-CN");

for (const page of archivePagePaths) {
  await checkHtmlBasics(page, "zh-CN", "en");
  await checkHtmlBasics(`en/${page}`, "en", "zh-CN");
}

for (const page of englishStaticPages) {
  await checkHtmlBasics(pagePathFor(page.slug), "zh-CN", "en");
  await checkHtmlBasics(pagePathFor(`en/${page.slug}`), "en", "zh-CN");
}

for (const story of englishStories) {
  await checkHtmlBasics(`stories/${story.slug}/index.html`, "zh-CN", "en");
  await checkHtmlBasics(`en/stories/${story.slug}/index.html`, "en", "zh-CN");
}

for (const theme of englishThemeCollections) {
  await checkHtmlBasics(`themes/${theme.slug}/index.html`, "zh-CN", "en");
  await checkHtmlBasics(`en/themes/${theme.slug}/index.html`, "en", "zh-CN");
}

const homeHtml = await readOutput("index.html");
for (const text of ["隐私", "联系", "来源", "专题", "编辑原则"]) {
  if (!homeHtml.includes(text)) failures.push(`Home page missing ${text}`);
}

const englishHomeHtml = await readOutput("en/index.html");
for (const text of ["English edition", "Stories", "Sources", "Editorial"]) {
  if (!englishHomeHtml.includes(text)) failures.push(`English home page missing ${text}`);
}

const archiveHtml = await readOutput("archive/index.html");
for (const text of ["东方志怪资料库", "人物索引", "妖怪索引", "地府案卷", "器物谱"]) {
  if (!archiveHtml.includes(text)) failures.push(`Archive index missing ${text}`);
}
for (const asset of ["archive-people.webp", "archive-beings.webp", "archive-underworld.webp", "archive-objects.webp", "archive-relations.webp"]) {
  if (!archiveHtml.includes(asset)) {
    failures.push(`Archive index missing generated image ${asset}`);
  }
}

for (const asset of ["story-xifangping.webp", "story-nie-xiaoqian.webp", "story-painted-skin.webp", "story-laoshan-daoshi.webp", "story-wang-liulang.webp"]) {
  if (!homeHtml.includes(asset)) {
    failures.push(`Home page missing story image ${asset}`);
  }
}

const englishArchiveHtml = await readOutput("en/archive/index.html");
for (const text of ["Eastern Strange-Tale Archive", "Character Index", "Beings Index", "Underworld Dossiers", "Object Index"]) {
  if (!englishArchiveHtml.includes(text)) failures.push(`English archive index missing ${text}`);
}

const pilotStoryHtml = await readOutput("stories/xifangping/index.html");
for (const text of ["data-archive-tabs", "原文", "白话", "导读", "data-relation-graph"]) {
  if (!pilotStoryHtml.includes(text)) failures.push(`Xifangping story page missing archive feature ${text}`);
}
if (!pilotStoryHtml.includes("story-xifangping.webp")) {
  failures.push("Xifangping story page missing generated cover image");
}

const englishPilotStoryHtml = await readOutput("en/stories/xifangping/index.html");
if (!englishPilotStoryHtml.includes("story-xifangping.webp")) {
  failures.push("English Xifangping story page missing generated cover image");
}

const routeHtml = await readOutput("archive/route/index.html");
if (!routeHtml.includes("data-route-shell")) {
  failures.push("Route page missing saved-route shell");
}

const sitemap = await readOutput("sitemap.xml");
if (!sitemap.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')) {
  failures.push("Sitemap missing XHTML alternate namespace");
}
for (const story of englishStories) {
  if (!sitemap.includes(`${site.basePath}en/stories/${story.slug}/`)) {
    failures.push(`Sitemap missing English story URL ${story.slug}`);
  }
}
for (const page of ["archive/", "archive/people/", "archive/beings/", "archive/underworld/", "archive/objects/", "archive/relations/", "archive/route/"]) {
  if (!sitemap.includes(`${site.basePath}${page}`) || !sitemap.includes(`${site.basePath}en/${page}`)) {
    failures.push(`Sitemap missing bilingual archive URL ${page}`);
  }
}
if (!sitemap.includes('hreflang="zh-CN"') || !sitemap.includes('hreflang="en"')) {
  failures.push("Sitemap missing basic hreflang alternates");
}

if (homeHtml.includes("未命名") || homeHtml.includes("TODO") || englishHomeHtml.includes("TODO")) {
  failures.push("Generated pages contain placeholder text");
}

await checkDocsSync();

if (failures.length) {
  console.error(failures.map((item) => `- ${item}`).join("\n"));
  process.exitCode = 1;
} else {
  if (warnings.length) {
    console.warn(warnings.map((item) => `- ${item}`).join("\n"));
  }
  console.log(
    `Quality check passed for ${site.name}: ${stories.length} zh stories, ${englishStories.length} en stories, ${themeCollections.length} zh themes, ${englishThemeCollections.length} en themes.`
  );
  if (strictDocs) console.log("docs/ is synced with the generated dist output.");
}
