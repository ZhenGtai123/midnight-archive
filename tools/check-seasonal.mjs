import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  seasonalArticles,
  seasonalEnglishArticles,
  seasonalEnglishSite,
  seasonalEnglishStaticPages,
  seasonalEnglishTopics,
  seasonalPoems,
  seasonalSite,
  seasonalStaticPages,
  seasonalTermCalendar,
  seasonalTopics
} from "../content/seasonal-observatory.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const siteRoot = path.join(root, "dist", seasonalSite.slug);
const docsRoot = path.join(root, "docs", seasonalSite.slug);
const errors = [];
const coreTermSlugs = ["chunfen", "xiazhi", "qiufen", "dongzhi"];

function fail(message) {
  errors.push(message);
}

function stripHtml(value = "") {
  return String(value).replace(/<[^>]*>/g, "").replace(/\s+/g, "");
}

function wordCount(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

async function readGenerated(relativePath) {
  const fullPath = path.join(siteRoot, relativePath);
  if (!existsSync(fullPath)) {
    fail(`Missing generated file: ${relativePath}`);
    return "";
  }
  return readFile(fullPath, "utf8");
}

async function walk(dir, base = dir) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full, base)));
    else files.push(path.relative(base, full).replaceAll("\\", "/"));
  }
  return files.sort();
}

async function hashFile(filePath) {
  const data = await readFile(filePath);
  return createHash("sha256").update(data).digest("hex");
}

function canonicalUrlFor(relativePath) {
  const clean = relativePath.replaceAll("\\", "/");
  if (clean === "index.html") return `${seasonalSite.canonicalOrigin}${seasonalSite.basePath}`;
  if (clean.endsWith("/index.html")) {
    return `${seasonalSite.canonicalOrigin}${seasonalSite.basePath}${clean.slice(0, -"index.html".length)}`;
  }
  return `${seasonalSite.canonicalOrigin}${seasonalSite.basePath}${clean}`;
}

function checkPageMeta(html, { locale, htmlLang, relativePath }) {
  const alternateLang = htmlLang === "en" ? "zh-CN" : "en";
  if (!html.includes(`<html lang="${htmlLang}">`)) fail(`${locale}:${relativePath} must use ${htmlLang} html lang.`);
  if (!html.includes(`<link rel="canonical" href="${canonicalUrlFor(relativePath)}">`)) {
    fail(`${locale}:${relativePath} canonical is not self-referential.`);
  }
  if (!html.includes(`hreflang="${htmlLang}"`)) fail(`${locale}:${relativePath} missing self hreflang.`);
  if (!html.includes(`hreflang="${alternateLang}"`)) fail(`${locale}:${relativePath} missing alternate hreflang.`);
  if (!html.includes('hreflang="x-default"')) fail(`${locale}:${relativePath} missing x-default hreflang.`);
  if (!html.includes("language-link")) fail(`${locale}:${relativePath} missing visible language switch.`);
}

function checkArticleModel(articles, { locale, minLength, metric = "chars" }) {
  for (const article of articles) {
    const articleText = [article.lead, ...article.body, ...article.observe].join(" ");
    const measured = metric === "words" ? wordCount(articleText) : stripHtml(articleText).length;
    if (measured < minLength) fail(`${locale}:${article.slug} is too thin (${measured} ${metric}).`);
    if (!article.sourceUrl?.startsWith("https://")) fail(`${locale}:${article.slug} needs a public https source URL.`);
    if (!article.sourceRights || article.sourceRights.length < 30) fail(`${locale}:${article.slug} needs source rights text.`);
    if (locale === "en" && (!article.editorialMode || !article.editorNote)) {
      fail(`${locale}:${article.slug} needs English editorialMode and editorNote.`);
    }
    if (!article.observe || article.observe.length < 3) fail(`${locale}:${article.slug} needs at least 3 observation prompts.`);
    if (!article.lastReviewed) fail(`${locale}:${article.slug} needs lastReviewed.`);
  }
}

function checkTopicModel(topics, articles, locale) {
  const articleSlugs = new Set(articles.map((article) => article.slug));
  for (const topic of topics) {
    const missing = topic.articleSlugs.filter((slug) => !articleSlugs.has(slug));
    if (missing.length) fail(`${locale}:${topic.slug} references missing articles: ${missing.join(", ")}`);
    if (topic.articleSlugs.length < 3) fail(`${locale}:${topic.slug} should link at least 3 articles.`);
  }
}

function checkStaticPages(staticPages, locale) {
  const required = [
    "about",
    "authors",
    "contact",
    "privacy",
    "terms",
    "advertising-policy",
    "editorial-policy",
    "sources",
    "content-roadmap"
  ];
  const slugs = new Set(staticPages.map((page) => page.slug));
  for (const slug of required) {
    if (!slugs.has(slug)) fail(`${locale}: missing static page ${slug}`);
  }
}

function checkCoreTermModel() {
  for (const slug of coreTermSlugs) {
    const term = seasonalTermCalendar.find((item) => item.slug === slug);
    if (!term) {
      fail(`Missing core solar term data: ${slug}`);
      continue;
    }
    const sections = term.coreEssay?.sections || [];
    const checklist = term.coreEssay?.checklist || [];
    const essayText = [
      term.coreEssay?.title,
      term.coreEssay?.deck,
      ...sections.flatMap((section) => [section.heading, ...(section.body || [])]),
      ...checklist
    ].join("");
    if (sections.length < 4) fail(`${slug} core essay should have at least 4 sections.`);
    if (checklist.length < 3) fail(`${slug} core essay should include at least 3 checklist items.`);
    if (stripHtml(essayText).length < 1200) fail(`${slug} core essay is too thin.`);
  }
}

async function checkGeneratedContext({ locale, prefix, htmlLang, articles, topics, staticPages, sourceLabel, checklistLabel }) {
  const indexPath = `${prefix}index.html`;
  const requiredPages = [
    indexPath,
    `${prefix}topics/index.html`,
    `${prefix}sources/index.html`,
    `${prefix}content-roadmap/index.html`,
    `${prefix}rss.xml`,
    ...staticPages.map((page) => `${prefix}${page.slug}/index.html`),
    ...articles.map((article) => `${prefix}articles/${article.slug}/index.html`),
    ...topics.map((topic) => `${prefix}topics/${topic.slug}/index.html`)
  ];

  for (const page of new Set(requiredPages)) {
    if (!existsSync(path.join(siteRoot, page))) fail(`Missing required page: ${page}`);
  }

  const home = await readGenerated(indexPath);
  checkPageMeta(home, { locale, htmlLang, relativePath: indexPath });
  if (!home.includes("hero-seasonal-observatory.png")) fail(`${locale}: home page must reference the hero image.`);

  const supportingPages = [
    `${prefix}topics/index.html`,
    `${prefix}sources/index.html`,
    `${prefix}content-roadmap/index.html`,
    ...staticPages.map((page) => `${prefix}${page.slug}/index.html`),
    ...topics.map((topic) => `${prefix}topics/${topic.slug}/index.html`)
  ];

  for (const page of new Set(supportingPages)) {
    const html = await readGenerated(page);
    checkPageMeta(html, { locale, htmlLang, relativePath: page });
  }

  for (const article of articles) {
    const articlePath = `${prefix}articles/${article.slug}/index.html`;
    const html = await readGenerated(articlePath);
    checkPageMeta(html, { locale, htmlLang, relativePath: articlePath });
    if (!html.includes(article.title)) fail(`${locale}:${article.slug} page missing title.`);
    if (!html.includes(sourceLabel)) fail(`${locale}:${article.slug} page missing source panel.`);
    if (!html.includes(checklistLabel)) fail(`${locale}:${article.slug} page missing observation checklist.`);
    if (!html.includes(article.sourceUrl)) fail(`${locale}:${article.slug} page missing source URL.`);
    if (!html.includes('<script type="application/ld+json">')) fail(`${locale}:${article.slug} page missing Article JSON-LD.`);
  }
}

async function checkSolarTermPages() {
  const indexHtml = await readGenerated("solar-terms/index.html");
  if (!indexHtml.includes("二十四节气地图")) fail("Solar-term index missing title.");
  if (!indexHtml.includes(`<link rel="canonical" href="${canonicalUrlFor("solar-terms/index.html")}">`)) {
    fail("solar-terms/index.html canonical is not self-referential.");
  }

  for (const term of seasonalTermCalendar) {
    const pagePath = `solar-terms/${term.slug}/index.html`;
    const html = await readGenerated(pagePath);
    if (!html.includes(`<html lang="zh-CN">`)) fail(`${pagePath} must use zh-CN html lang.`);
    if (!html.includes(`<link rel="canonical" href="${canonicalUrlFor(pagePath)}">`)) {
      fail(`${pagePath} canonical is not self-referential.`);
    }
    if (!html.includes(term.name)) fail(`${pagePath} missing term name.`);
    if (!html.includes(term.focus)) fail(`${pagePath} missing term focus.`);
    if (!html.includes("三步观察")) fail(`${pagePath} missing observation steps.`);
    if (!html.includes("来源与处理方式")) fail(`${pagePath} missing source note.`);
    if (!html.includes("香港天文台")) fail(`${pagePath} missing public source link.`);
    if (!html.includes('<script type="application/ld+json">')) fail(`${pagePath} missing WebPage JSON-LD.`);
    if (coreTermSlugs.includes(term.slug)) {
      if (!html.includes(term.coreEssay.title)) fail(`${pagePath} missing core essay title.`);
      if (!html.includes("记录模板")) fail(`${pagePath} missing core essay checklist.`);
      if (stripHtml(html).length < 1800) fail(`${pagePath} generated core page is too thin.`);
    }
  }
}

async function checkSitemap() {
  const sitemap = await readGenerated("sitemap.xml");
  if (!sitemap.includes("xhtml:link")) fail("Sitemap should include multilingual alternate links.");
  for (const article of seasonalArticles) {
    if (!sitemap.includes(`/articles/${article.slug}/`)) fail(`Sitemap missing zh article ${article.slug}.`);
  }
  if (!sitemap.includes("/solar-terms/")) fail("Sitemap missing solar-term index.");
  for (const term of seasonalTermCalendar) {
    if (!sitemap.includes(`/solar-terms/${term.slug}/`)) fail(`Sitemap missing solar-term page ${term.slug}.`);
  }
  for (const article of seasonalEnglishArticles || []) {
    if (!sitemap.includes(`/en/articles/${article.slug}/`)) fail(`Sitemap missing en article ${article.slug}.`);
  }
}

async function checkWhitespace() {
  const files = await walk(siteRoot);
  for (const file of files) {
    if (!/\.(html|xml|css|js|svg)$/i.test(file)) continue;
    const content = await readFile(path.join(siteRoot, file), "utf8");
    const lines = content.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (/[ \t]+$/.test(line)) fail(`${file}:${index + 1} has trailing whitespace.`);
    });
  }
}

async function compareDistAndDocs() {
  const distFiles = await walk(siteRoot);
  const docsFiles = await walk(docsRoot);
  const distSet = new Set(distFiles);
  const docsSet = new Set(docsFiles);
  const missing = distFiles.filter((file) => !docsSet.has(file));
  const extra = docsFiles.filter((file) => !distSet.has(file));
  const changed = [];

  for (const file of distFiles) {
    if (!docsSet.has(file)) continue;
    const distHash = await hashFile(path.join(siteRoot, file));
    const docsHash = await hashFile(path.join(docsRoot, file));
    if (distHash !== docsHash) changed.push(file);
  }

  if (missing.length || extra.length || changed.length) {
    fail(
      `docs/${seasonalSite.slug} is not synced with dist/${seasonalSite.slug} (${missing.length} missing, ${extra.length} extra, ${changed.length} changed).`
    );
  }
}

if (seasonalArticles.length < 6) fail("Seasonal site should start with at least 6 zh articles.");
if (seasonalTopics.length < 4) fail("Seasonal site should start with at least 4 zh topic routes.");
if (seasonalTermCalendar.length !== 24) fail("Seasonal site should define all 24 solar terms.");
if (seasonalPoems.length < 8) fail("Seasonal poem calendar should start with at least 8 sourced poems.");
checkCoreTermModel();
checkArticleModel(seasonalArticles, { locale: "zh", minLength: 900 });
checkTopicModel(seasonalTopics, seasonalArticles, "zh");
checkStaticPages(seasonalStaticPages, "zh");

if (seasonalEnglishArticles?.length) {
  if (seasonalEnglishArticles.length < 6) fail("English seasonal site should mirror at least 6 pilot articles.");
  checkArticleModel(seasonalEnglishArticles, { locale: "en", minLength: 360, metric: "words" });
  checkTopicModel(seasonalEnglishTopics, seasonalEnglishArticles, "en");
  checkStaticPages(seasonalEnglishStaticPages, "en");
}

await checkGeneratedContext({
  locale: "zh",
  prefix: "",
  htmlLang: "zh-CN",
  articles: seasonalArticles,
  topics: seasonalTopics,
  staticPages: seasonalStaticPages,
  sourceLabel: "来源与编辑说明",
  checklistLabel: "本节气可以这样观察"
});

const zhHome = await readGenerated("index.html");
if (!zhHome.includes("id=\"poem-calendar\"")) fail("Home page missing poem calendar section.");
if (!zhHome.includes("id=\"poem-card-lab\"")) fail("Home page missing poem card lab.");
if (!zhHome.includes("seasonal-calendar-data")) fail("Home page missing solar-term JSON data.");
if (!zhHome.includes("seasonal-poem-data")) fail("Home page missing poem JSON data.");
if (!zhHome.includes("data-download-card")) fail("Home page missing poem-card download control.");
if (!zhHome.includes("solar-terms/")) fail("Home page missing solar-term page links.");

const seasonalCss = await readGenerated("assets/seasonal.css");
if (!seasonalCss.includes(".poem-card[hidden]")) fail("Seasonal CSS must hide filtered poem cards.");
if (!seasonalCss.includes(".term-map-card")) fail("Seasonal CSS missing solar-term map cards.");

await checkSolarTermPages();

if (seasonalEnglishArticles?.length) {
  await checkGeneratedContext({
    locale: "en",
    prefix: `${seasonalEnglishSite.pathPrefix}`,
    htmlLang: "en",
    articles: seasonalEnglishArticles,
    topics: seasonalEnglishTopics,
    staticPages: seasonalEnglishStaticPages,
    sourceLabel: "Source and editorial note",
    checklistLabel: "How to observe this term"
  });
}

await checkSitemap();
await checkWhitespace();
await compareDistAndDocs();

if (errors.length) {
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Seasonal quality check passed for ${seasonalSite.name}: ${seasonalArticles.length} zh articles, ${seasonalEnglishArticles?.length || 0} en articles, ${seasonalTopics.length} zh topics.`
);
console.log(`docs/${seasonalSite.slug} is synced with dist/${seasonalSite.slug}.`);
