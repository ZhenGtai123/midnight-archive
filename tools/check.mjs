import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { site, stories, storyDeepDives } from "../content/midnight-archive.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const siteRoot = path.join(root, "dist", site.slug);

const requiredPages = [
  "index.html",
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
  } else if (storyLength < 1000) {
    warnings.push(`Story ${story.slug} is still a draft-length article (${storyLength} chars)`);
  }

  if (!story.sourceUrl.startsWith("https://")) {
    failures.push(`Story ${story.slug} sourceUrl must be https`);
  }

  const storyPath = `stories/${story.slug}/index.html`;
  if (!(await exists(storyPath))) failures.push(`Missing story page: ${storyPath}`);
}

const homeHtml = await readFile(path.join(siteRoot, "index.html"), "utf8");
for (const text of ["隐私", "联系", "来源", "编辑原则"]) {
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
  console.log(`Quality check passed for ${site.name}: ${stories.length} stories, ${requiredPages.length} required files.`);
}
