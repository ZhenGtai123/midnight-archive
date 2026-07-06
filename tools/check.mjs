import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { site, stories, storyDeepDives, themeCollections } from "../content/midnight-archive.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const siteRoot = path.join(root, "dist", site.slug);

const requiredPages = [
  "index.html",
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
  "assets/midnight.css",
  "assets/midnight.js",
  "assets/logo-midnight-archive.svg",
  "assets/hero-midnight-archive.png"
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

const failures = [];
const warnings = [];
const storySlugs = new Set(stories.map((story) => story.slug));

async function exists(relativePath) {
  try {
    await access(path.join(siteRoot, relativePath));
    return true;
  } catch {
    return false;
  }
}

for (const page of requiredPages) {
  if (!(await exists(page))) failures.push(`Missing output: ${page}`);
}

for (const story of stories) {
  for (const field of requiredStoryFields) {
    if (!story[field] || (Array.isArray(story[field]) && story[field].length === 0)) {
      failures.push(`Story ${story.slug || story.title} missing ${field}`);
    }
  }

  const storyLength = `${(story.paragraphs || []).join("")}${(storyDeepDives[story.slug] || []).join("")}`.length;
  if (storyLength < 650) {
    failures.push(`Story ${story.slug} is too thin`);
  } else if (storyLength < 1200) {
    warnings.push(`Story ${story.slug} is still a draft-length article (${storyLength} chars)`);
  }

  if (!story.sourceUrl.startsWith("https://")) {
    failures.push(`Story ${story.slug} sourceUrl must be https`);
  }

  const storyPath = `stories/${story.slug}/index.html`;
  if (!(await exists(storyPath))) failures.push(`Missing story page: ${storyPath}`);
}

for (const theme of themeCollections) {
  for (const field of ["slug", "title", "deck", "description", "tone", "storySlugs", "editorialNote"]) {
    if (!theme[field] || (Array.isArray(theme[field]) && theme[field].length === 0)) {
      failures.push(`Theme ${theme.slug || theme.title} missing ${field}`);
    }
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

const homeHtml = await readFile(path.join(siteRoot, "index.html"), "utf8");
for (const text of ["隐私", "联系", "来源", "专题", "编辑原则"]) {
  if (!homeHtml.includes(text)) failures.push(`Home page missing ${text}`);
}

if (homeHtml.includes("未命名") || homeHtml.includes("TODO")) {
  failures.push("Home page contains placeholder text");
}

if (failures.length) {
  console.error(failures.map((item) => `- ${item}`).join("\n"));
  process.exitCode = 1;
} else {
  if (warnings.length) {
    console.warn(warnings.map((item) => `- ${item}`).join("\n"));
  }
  console.log(
    `Quality check passed for ${site.name}: ${stories.length} stories, ${themeCollections.length} themes, ${requiredPages.length} required files.`
  );
}
