import { mkdir, writeFile, copyFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  expansionPlan,
  site,
  stories,
  storyDeepDives,
  themeCollections
} from "../content/midnight-archive.mjs";
import {
  englishExpansionPlan,
  englishHomeContent,
  englishSite,
  englishStaticPages,
  englishStories,
  englishStoryDeepDives,
  englishThemeCollections
} from "../content/midnight-archive-en.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distRoot = path.join(root, "dist");
const siteRoot = path.join(distRoot, site.slug);
const publicRoot = path.join(root, "public");

function relativeRoot(pathName = "") {
  const clean = pathName.replace(/^\/+|\/+$/g, "");
  if (!clean) return "./";
  if (/\.[a-z0-9]+$/i.test(clean)) return "./";
  return "../".repeat(clean.split("/").length);
}

await rm(siteRoot, { recursive: true, force: true });
await mkdir(path.join(siteRoot, "stories"), { recursive: true });
await mkdir(path.join(siteRoot, "themes"), { recursive: true });
await mkdir(path.join(siteRoot, "en", "stories"), { recursive: true });
await mkdir(path.join(siteRoot, "en", "themes"), { recursive: true });
await mkdir(path.join(siteRoot, "assets"), { recursive: true });

await copyFile(
  path.join(publicRoot, "assets", "midnight.css"),
  path.join(siteRoot, "assets", "midnight.css")
);
await copyFile(
  path.join(publicRoot, "assets", "midnight.js"),
  path.join(siteRoot, "assets", "midnight.js")
);
await copyFile(
  path.join(publicRoot, "assets", "logo-midnight-archive.svg"),
  path.join(siteRoot, "assets", "logo-midnight-archive.svg")
);

const heroSource = path.join(publicRoot, "assets", "hero-midnight-archive.png");
if (existsSync(heroSource)) {
  await copyFile(heroSource, path.join(siteRoot, "assets", "hero-midnight-archive.png"));
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function cleanPagePath(pathName = "") {
  const clean = pathName.replace(/^\/+/, "");
  if (!clean) return "";
  if (/\.[a-z0-9]+$/i.test(clean)) return clean;
  return clean.replace(/\/?$/, "/");
}

function absoluteUrl(pathName = "") {
  return `${site.canonicalOrigin}${site.basePath}${cleanPagePath(pathName)}`;
}

function urlFor(href) {
  if (href.startsWith("http")) return href;
  if (href.startsWith(site.basePath)) return href.slice(site.basePath.length);
  if (href.startsWith("/")) return href.slice(1);
  return href;
}

function relativeHref(rootRel, pathName = "") {
  return `${rootRel}${urlFor(`${site.basePath}${cleanPagePath(pathName)}`)}`;
}

const zhStaticPages = [
  {
    slug: "about",
    title: "关于本站",
    description: "子夜故事档案馆的定位、内容来源和编辑责任。",
    body:
      "<p>子夜故事档案馆是一个公版志怪导读站。我们不追求低成本堆量，而是把每篇故事做成可追溯、可阅读、可继续扩展的档案页。</p><p>站内文本以公版古籍、明确授权来源和编辑部原创导读为基础。任何现代网络故事都必须有可核验授权，或仅以链接评论、采访整理和原创报道的方式呈现。</p>"
  },
  {
    slug: "contact",
    title: "联系",
    description: "联系子夜故事档案馆编辑部。",
    body:
      '<p>如需提供授权故事、指出来源问题或申请删除内容，可以先通过 GitHub 仓库提交 Issue：<a class="plain-link" href="https://github.com/ZhenGtai123/midnight-archive/issues" rel="nofollow noopener" target="_blank">midnight-archive issues</a>。</p><p>提交时请附上页面地址、权利说明和可核验的联系方式。正式域名和编辑邮箱确定后，本页会更新为长期联系渠道。</p>'
  },
  {
    slug: "privacy",
    title: "隐私政策",
    description: "子夜故事档案馆的隐私政策。",
    body:
      "<p>本站当前样板不收集账户信息，不开放评论，也不要求用户提交个人资料。服务器可能保留基础访问日志，用于安全、性能和错误排查。</p><p>如果未来接入 Google AdSense、统计或邮件订阅，将在上线前更新本页，列明数据类型、用途、第三方服务、Cookie 使用方式和退出方式。</p>"
  },
  {
    slug: "terms",
    title: "使用条款",
    description: "子夜故事档案馆的使用条款和版权说明。",
    body:
      "<p>本站原创导读、改写、注释和页面设计归本站编辑部所有，除非另有说明。公版原典仍属于公共领域或相应来源页面所标注的授权范围。</p><p>引用本站内容时，请保留页面链接、标题和编辑说明。若发现内容来源标注错误，请联系编辑部修正。</p>"
  },
  {
    slug: "advertising-policy",
    title: "广告与赞助说明",
    description: "子夜故事档案馆的广告、赞助和商业合作披露原则。",
    body:
      "<p>本站样板当前未启用广告代码，也不展示伪装广告位。若未来接入 Google AdSense 或其他广告服务，广告会与正文内容保持清晰区分，不会伪装成导航、下载按钮或故事卡片。</p><p>广告或赞助内容不会影响故事来源说明、编辑判断和版权处理。任何付费合作都应在页面中明确标注。</p><p>AdSense 发布商 ID 获批后，才会在配置中启用广告脚本和 ads.txt；上线前不得使用虚假的发布商信息。</p>"
  },
  {
    slug: "editorial-policy",
    title: "编辑原则",
    description: "子夜故事档案馆的内容选择、来源核验和更新原则。",
    body:
      "<p>每篇故事必须具备明确来源、作者或传统归属、年代说明、处理方式和最近复核日期。没有来源的故事不进入正式发布队列。</p><p>我们优先发布有导读价值的页面：能解释文本背景、主题、版本差异或现代阅读意义，而不是简单复制原文。页面如被发现过薄，会退回补写或下线。</p><p>现代网络故事必须获得授权。未经许可的论坛、博客、社交媒体和付费内容不会整篇转载。</p>"
  },
  {
    slug: "sources",
    title: "来源库",
    description: "子夜故事档案馆的公开来源、授权说明和使用计划。",
    body:
      "<p class=\"lead\">这里记录每一类可复用故事来源。正式扩量前，每个具体篇目都需要继续核验原文链接、版本、授权和署名方式。</p>"
  },
  {
    slug: "authors",
    title: "作者与编辑",
    description: "原典作者、现代编辑和站点内容责任说明。",
    body: ""
  },
  {
    slug: "content-roadmap",
    title: "内容扩展路线",
    description: "子夜故事档案馆的故事扩展方向、栏目规划和内容厚度标准。",
    body:
      "<p class=\"lead\">申请 AdSense 前，建议把站点扩展到至少 25-35 篇有来源、有导读、有内链的文章。每篇正式文章应接近 1200-1800 中文字，并包含来源说明、主题解读和继续阅读入口。</p>"
  }
];

const zhHomeContent = {
  heroEyebrow: "Public-domain strange tales",
  primaryCta: "读今日夜谈",
  secondaryCta: "进入专题地图",
  stats: [
    { value: String(stories.length), label: "篇样稿" },
    { value: String(themeCollections.length), label: "条专题" },
    { value: "0", label: "未署名转载" }
  ],
  intro: {
    eyebrow: "Night index",
    title: "把旧书里的异闻，整理成可以穿行的夜色地图",
    features: [
      {
        index: "01",
        title: "故事星图",
        body: "按人物、器物、地点和情绪串联篇目，让读者从一个夜谈自然走向另一个夜谈。"
      },
      {
        index: "02",
        title: "来源灯牌",
        body: "出处、年代、作者和处理方式藏在每篇旁栏里，读得顺，也查得到。"
      },
      {
        index: "03",
        title: "深夜阅读",
        body: "长文用高对比正文、进度条和安静动效服务阅读，而不是抢走故事本身。"
      }
    ]
  },
  themes: {
    eyebrow: "Theme routes",
    title: "先做几条能留住读者的夜读路径"
  },
  stories: {
    eyebrow: "Archive",
    title: "第一批夜谈样稿"
  },
  roadmap: {
    eyebrow: "Next expansion",
    title: "下一步不是铺量，是把栏目做成网络",
    linkLabel: "查看完整扩展路线"
  },
  sources: {
    eyebrow: "Sources",
    title: "可扩展的来源池"
  }
};

const zhUi = {
  skipLink: "跳到正文",
  homeAria: (name) => `${name}首页`,
  navLabel: "主导航",
  footerNavLabel: "页脚导航",
  languageSwitchLabel: "English",
  openSource: "来源链接",
  sourceOpen: "查看公开来源",
  sourcePanel: {
    eyebrow: "Source",
    heading: "来源与编辑说明",
    originalTitle: "原题",
    source: "出处",
    author: "作者",
    era: "年代",
    editorialMode: "处理方式",
    reviewed: "复核日期",
    translatorNote: "翻译 / 编辑说明"
  },
  story: {
    backToList: "返回故事列表",
    deepEyebrow: "Deep reading",
    deepHeading: "深读补充",
    notesEyebrow: "Notes",
    notesHeading: "编辑札记",
    themeLinks: "所属专题",
    nextEyebrow: "Next reads",
    nextHeading: "继续夜读",
    readLabel: (title) => `阅读${title}`
  },
  theme: {
    indexEyebrow: "Theme routes",
    indexTitle: "专题索引",
    indexDescription: "把单篇故事连成可继续阅读的路径：人物、阴司、世情、器物、夜路和温柔志怪。",
    route: "Theme route",
    count: (count) => `${count} 篇`,
    backToIndex: "返回专题索引",
    statsStories: (count) => `${count} 篇故事`,
    editorRoute: "Editor's route",
    descriptionHeading: "专题说明",
    readingOrder: "Reading order",
    readingHeading: "从这些篇目开始",
    openLabel: (title) => `进入${title}专题`
  }
};

const enUi = {
  skipLink: "Skip to content",
  homeAria: (name) => `${name} home`,
  navLabel: "Primary navigation",
  footerNavLabel: "Footer navigation",
  languageSwitchLabel: "中文",
  openSource: "Open source",
  sourceOpen: "View public source",
  sourcePanel: {
    eyebrow: "Source",
    heading: "Source and editorial note",
    originalTitle: "Original title",
    source: "Source",
    author: "Author",
    era: "Era",
    editorialMode: "Editorial mode",
    reviewed: "Reviewed",
    translatorNote: "Translator/editor note"
  },
  story: {
    backToList: "Back to story list",
    deepEyebrow: "Deep reading",
    deepHeading: "Further reading",
    notesEyebrow: "Notes",
    notesHeading: "Editorial notes",
    themeLinks: "Reading routes",
    nextEyebrow: "Next reads",
    nextHeading: "Continue reading",
    readLabel: (title) => `Read ${title}`
  },
  theme: {
    indexEyebrow: "Theme routes",
    indexTitle: "Theme Index",
    indexDescription:
      "English reading routes for the pilot edition: character studies, underworld justice, gentle tales, satire, objects, and night places.",
    route: "Theme route",
    count: (count) => `${count} ${count === 1 ? "story" : "stories"}`,
    backToIndex: "Back to theme index",
    statsStories: (count) => `${count} ${count === 1 ? "story" : "stories"}`,
    editorRoute: "Editor's route",
    descriptionHeading: "Route note",
    readingOrder: "Reading order",
    readingHeading: "Available in English",
    openLabel: (title) => `Open ${title}`
  }
};

const zhContext = {
  locale: site.locale,
  hreflang: "zh-CN",
  pathPrefix: "",
  site: {
    ...site,
    footerDescription: "公版故事导读、来源核验和现代阅读札记。每篇文章都应有来源和编辑说明。",
    footerLinks: [
      { label: "关于", href: "/midnight-archive/about/" },
      { label: "联系", href: "/midnight-archive/contact/" },
      { label: "隐私", href: "/midnight-archive/privacy/" },
      { label: "广告说明", href: "/midnight-archive/advertising-policy/" },
      { label: "条款", href: "/midnight-archive/terms/" },
      { label: "站点地图", href: "/midnight-archive/sitemap.xml" }
    ]
  },
  home: zhHomeContent,
  staticPages: zhStaticPages,
  stories,
  storyDeepDives,
  themeCollections,
  expansionPlan,
  ui: zhUi
};

const enContext = {
  locale: englishSite.locale,
  hreflang: "en",
  pathPrefix: englishSite.pathPrefix,
  site: englishSite,
  home: englishHomeContent,
  staticPages: englishStaticPages,
  stories: englishStories,
  storyDeepDives: englishStoryDeepDives,
  themeCollections: englishThemeCollections,
  expansionPlan: englishExpansionPlan,
  ui: enUi
};

for (const context of [zhContext, enContext]) {
  context.storyBySlug = new Map(context.stories.map((story) => [story.slug, story]));
  context.staticPageBySlug = new Map(context.staticPages.map((page) => [page.slug, page]));
}

const englishStorySlugs = new Set(englishStories.map((story) => story.slug));
const englishThemeSlugs = new Set(englishThemeCollections.map((theme) => theme.slug));
const englishStaticSlugs = new Set(englishStaticPages.map((page) => page.slug));

function storiesForTheme(theme, context) {
  return theme.storySlugs.map((slug) => context.storyBySlug.get(slug)).filter(Boolean);
}

function englishPathForZh(pathName = "") {
  const clean = cleanPagePath(pathName);
  if (!clean) return "en/";
  if (clean === "themes/") return "en/themes/";
  if (clean.startsWith("themes/")) {
    const slug = clean.split("/")[1];
    return englishThemeSlugs.has(slug) ? `en/${clean}` : null;
  }
  if (clean.startsWith("stories/")) {
    const slug = clean.split("/")[1];
    return englishStorySlugs.has(slug) ? `en/${clean}` : null;
  }
  const slug = clean.replace(/\/$/, "");
  return englishStaticSlugs.has(slug) ? `en/${clean}` : null;
}

function zhPathForEn(pathName = "") {
  const clean = cleanPagePath(pathName);
  if (!clean.startsWith("en/")) return null;
  return clean.slice(3);
}

function languageAlternatePath(pathName, context) {
  if (context.locale === "en") return zhPathForEn(pathName);
  return englishPathForZh(pathName);
}

function alternatesFor(pathName, context) {
  const clean = cleanPagePath(pathName);
  const zhPath = context.locale === "en" ? zhPathForEn(clean) : clean;
  const enPath = context.locale === "en" ? clean : englishPathForZh(clean);
  const links = [];

  if (zhPath !== null) links.push({ hreflang: "zh-CN", href: absoluteUrl(zhPath) });
  if (enPath !== null) links.push({ hreflang: "en", href: absoluteUrl(enPath) });
  if (zhPath !== null) links.push({ hreflang: "x-default", href: absoluteUrl(zhPath) });

  return links.filter(
    (link, index, array) =>
      array.findIndex((item) => item.hreflang === link.hreflang && item.href === link.href) === index
  );
}

function pageShell({ context = zhContext, title, description, body, pathName = "", structuredData = [] }) {
  const cleanPath = cleanPagePath(pathName);
  const canonical = absoluteUrl(cleanPath);
  const rootRel = relativeRoot(cleanPath);
  const ogType = cleanPath.includes("stories/") ? "article" : "website";
  const ogImage = `${site.canonicalOrigin}${site.basePath}assets/hero-midnight-archive.png`;
  const adsenseScript =
    context.site.adsense?.enabled && context.site.adsense.publisherId
      ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${esc(context.site.adsense.publisherId)}" crossorigin="anonymous"></script>`
      : "";
  const jsonLd = structuredData
    .map((item) => `<script type="application/ld+json">${JSON.stringify(item)}</script>`)
    .join("\n");
  const alternateLinks = alternatesFor(cleanPath, context)
    .map((item) => `<link rel="alternate" hreflang="${esc(item.hreflang)}" href="${esc(item.href)}">`)
    .join("\n  ");
  const languagePath = languageAlternatePath(cleanPath, context);
  const languageSwitch =
    languagePath !== null
      ? `<a class="language-link" href="${relativeHref(rootRel, languagePath)}" hreflang="${context.locale === "en" ? "zh-CN" : "en"}">${esc(context.ui.languageSwitchLabel)}</a>`
      : "";
  const navLinks = [
    ...context.site.nav.map((item) => `<a href="${rootRel}${esc(urlFor(item.href))}">${esc(item.label)}</a>`),
    languageSwitch
  ].filter(Boolean);
  const homeHref = relativeHref(rootRel, context.pathPrefix);
  const rssPath = `${context.pathPrefix}rss.xml`;
  const adsenseLine = adsenseScript ? `  ${adsenseScript}\n` : "";
  const jsonLdLines = jsonLd ? `  ${jsonLd.replaceAll("\n", "\n  ")}\n` : "";

  return `<!doctype html>
<html lang="${context.locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index,follow">
  <meta name="theme-color" content="#060706">
  <link rel="canonical" href="${esc(canonical)}">
  ${alternateLinks}
  <link rel="alternate" type="application/rss+xml" title="${esc(context.site.name)} RSS" href="${relativeHref(rootRel, rssPath)}">
  <link rel="icon" href="${rootRel}assets/logo-midnight-archive.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${rootRel}assets/midnight.css">
${adsenseLine}  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:url" content="${esc(canonical)}">
  <meta property="og:site_name" content="${esc(context.site.name)}">
  <meta property="og:locale" content="${esc(context.locale.replace("-", "_"))}">
  <meta property="og:image" content="${esc(ogImage)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${esc(ogImage)}">
${jsonLdLines}</head>
<body>
  <a class="skip-link" href="#main">${esc(context.ui.skipLink)}</a>
  <div class="reading-progress" aria-hidden="true"></div>
  <div class="cursor-glow" aria-hidden="true"></div>
  <header class="site-header">
    <a class="brand" href="${homeHref}" aria-label="${esc(context.ui.homeAria(context.site.name))}">
      <img class="brand-logo" src="${rootRel}assets/logo-midnight-archive.svg" alt="" aria-hidden="true">
      <span>
        <strong>${esc(context.site.shortName)}</strong>
        <small>${esc(context.site.tagline)}</small>
      </span>
    </a>
    <nav class="nav" aria-label="${esc(context.ui.navLabel)}">
      ${navLinks.join("")}
    </nav>
  </header>
  <main id="main">
${body.trim()}
  </main>
  <footer class="site-footer">
    <div>
      <strong>${esc(context.site.name)}</strong>
      <p>${esc(context.site.footerDescription)}</p>
    </div>
    <nav aria-label="${esc(context.ui.footerNavLabel)}">
      ${context.site.footerLinks.map((item) => `<a href="${rootRel}${esc(urlFor(item.href))}">${esc(item.label)}</a>`).join("")}
    </nav>
  </footer>
  <script src="${rootRel}assets/midnight.js" defer></script>
</body>
</html>`;
}

function storyCard(story, index, rootRel = "./", context = zhContext) {
  return `<article class="story-card tone-${story.coverTone}" style="--card-index:${index}">
    <a href="${rootRel}${context.pathPrefix}stories/${story.slug}/" aria-label="${esc(context.ui.story.readLabel(story.title))}">
      <div class="card-topline">
        <span>${esc(story.category)}</span>
        <span>${esc(story.readingTime)}</span>
      </div>
      <h3>${esc(story.title)}</h3>
      <p>${esc(story.deck)}</p>
      <div class="tag-row">${story.tags.map((tag) => `<span>${esc(tag)}</span>`).join("")}</div>
    </a>
  </article>`;
}

function themeCard(theme, index, rootRel = "./", context = zhContext) {
  const themeStories = storiesForTheme(theme, context);
  return `<article class="theme-card tone-${theme.tone}" style="--card-index:${index}">
    <a href="${rootRel}${context.pathPrefix}themes/${theme.slug}/" aria-label="${esc(context.ui.theme.openLabel(theme.title))}">
      <div class="card-topline">
        <span>${esc(context.ui.theme.route)}</span>
        <span>${esc(context.ui.theme.count(themeStories.length))}</span>
      </div>
      <h3>${esc(theme.title)}</h3>
      <p>${esc(theme.deck)}</p>
      <div class="theme-mini-list">
        ${themeStories.slice(0, 5).map((story) => `<span>${esc(story.sourceTitle)}</span>`).join("")}
      </div>
    </a>
  </article>`;
}

function sourceBadge(story, context = zhContext) {
  const labels = context.ui.sourcePanel;
  const translatorRow = story.translatorNote
    ? `      <div><dt>${esc(labels.translatorNote)}</dt><dd>${esc(story.translatorNote)}</dd></div>
`
    : "";
  return `<aside class="source-panel" aria-label="${esc(labels.heading)}">
    <div>
      <span class="eyebrow">${esc(labels.eyebrow)}</span>
      <h2>${esc(labels.heading)}</h2>
    </div>
    <dl>
      <div><dt>${esc(labels.originalTitle)}</dt><dd>${esc(story.sourceTitle)}</dd></div>
      <div><dt>${esc(labels.source)}</dt><dd>${esc(story.sourceBook)}</dd></div>
      <div><dt>${esc(labels.author)}</dt><dd>${esc(story.originalAuthor)}</dd></div>
      <div><dt>${esc(labels.era)}</dt><dd>${esc(story.era)}</dd></div>
      <div><dt>${esc(labels.editorialMode)}</dt><dd>${esc(story.editorialMode)}</dd></div>
      <div><dt>${esc(labels.reviewed)}</dt><dd>${esc(story.lastReviewed)}</dd></div>
${translatorRow}    </dl>
    <p>${esc(story.sourceRights)}</p>
    <a class="text-link" href="${esc(story.sourceUrl)}" rel="nofollow noopener" target="_blank">${esc(context.ui.sourceOpen)}</a>
  </aside>`;
}

function homePage(context = zhContext) {
  const featured = context.stories[0];
  const rootRel = relativeRoot(context.pathPrefix);
  const home = context.home;
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: context.site.name,
    url: absoluteUrl(context.pathPrefix)
  };

  const body = `
  <section class="hero">
    <img class="hero-image" src="${rootRel}assets/hero-midnight-archive.png" alt="${context.locale === "en" ? "Rainy old archive entrance with warm lantern light" : "雨夜旧书馆入口与暖色灯光"}">
    <div class="hero-overlay"></div>
    <div class="rain-field" aria-hidden="true"></div>
    <div class="lantern-orbit" aria-hidden="true"></div>
    <div class="hero-content">
      <p class="eyebrow">${esc(home.heroEyebrow)}</p>
      <h1>${esc(context.site.name)}</h1>
      <p class="hero-copy">${esc(context.site.description)}</p>
      <div class="hero-actions">
        <a class="primary-link" href="${rootRel}${context.pathPrefix}stories/${featured.slug}/">${esc(home.primaryCta)}</a>
        <a class="secondary-link" href="${rootRel}${context.pathPrefix}themes/">${esc(home.secondaryCta)}</a>
      </div>
    </div>
    <div class="hero-strip" aria-label="${context.locale === "en" ? "Site data" : "站点数据"}">
      ${home.stats.map((item) => `<span><strong>${esc(item.value)}</strong> ${esc(item.label)}</span>`).join("")}
    </div>
  </section>

  <section class="intro-band reveal">
    <div class="section-heading">
      <span class="eyebrow">${esc(home.intro.eyebrow)}</span>
      <h2>${esc(home.intro.title)}</h2>
    </div>
    <div class="feature-grid">
      ${home.intro.features
        .map(
          (item) => `<article>
            <span>${esc(item.index)}</span>
            <h3>${esc(item.title)}</h3>
            <p>${esc(item.body)}</p>
          </article>`
        )
        .join("")}
    </div>
  </section>

  <section class="theme-band reveal" id="themes">
    <div class="section-heading">
      <span class="eyebrow">${esc(home.themes.eyebrow)}</span>
      <h2>${esc(home.themes.title)}</h2>
    </div>
    <div class="theme-grid">
      ${context.themeCollections.map((theme, index) => themeCard(theme, index, rootRel, context)).join("")}
    </div>
  </section>

  <section class="story-section reveal" id="stories">
    <div class="section-heading">
      <span class="eyebrow">${esc(home.stories.eyebrow)}</span>
      <h2>${esc(home.stories.title)}</h2>
    </div>
    <div class="story-grid">
      ${context.stories.map((story, index) => storyCard(story, index, rootRel, context)).join("")}
    </div>
  </section>

  <section class="roadmap-band reveal">
    <div class="section-heading">
      <span class="eyebrow">${esc(home.roadmap.eyebrow)}</span>
      <h2>${esc(home.roadmap.title)}</h2>
    </div>
    <div class="roadmap-strip">
      ${context.expansionPlan
        .map(
          (item) => `<article>
            <span>${esc(item.target)}</span>
            <h3>${esc(item.title)}</h3>
            <p>${esc(item.description)}</p>
          </article>`
        )
        .join("")}
    </div>
    <a class="text-link" href="${rootRel}${context.pathPrefix}content-roadmap/">${esc(home.roadmap.linkLabel)}</a>
  </section>

  <section class="source-band reveal">
    <div class="section-heading">
      <span class="eyebrow">${esc(home.sources.eyebrow)}</span>
      <h2>${esc(home.sources.title)}</h2>
    </div>
    <div class="source-list">
      ${context.site.sources
        .map(
          (source) => `<article>
            <span>${esc(source.era)}</span>
            <h3>${esc(source.title)}</h3>
            <p>${esc(source.usePlan)}</p>
            <a href="${esc(source.sourceUrl)}" rel="nofollow noopener" target="_blank">${esc(context.ui.openSource)}</a>
          </article>`
        )
        .join("")}
    </div>
  </section>`;

  return pageShell({
    context,
    title: `${context.site.name} | ${context.site.tagline}`,
    description: context.site.description,
    pathName: context.pathPrefix,
    body,
    structuredData: [organization]
  });
}

function storyPage(story, context = zhContext) {
  const pathName = `${context.pathPrefix}stories/${story.slug}/`;
  const rootRel = relativeRoot(pathName);
  const deepDive = context.storyDeepDives[story.slug] || [];
  const linkedThemes = context.themeCollections.filter((theme) => theme.storySlugs.includes(story.slug));
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description: story.deck,
    author: { "@type": "Organization", name: context.site.editor },
    publisher: { "@type": "Organization", name: context.site.name },
    dateModified: story.lastReviewed,
    inLanguage: context.locale,
    about: story.tags,
    isBasedOn: story.sourceUrl
  };

  const related = context.stories.filter((item) => item.slug !== story.slug).slice(0, 3);
  const body = `
  <article class="article-page tone-${story.coverTone}">
    <header class="article-hero">
      <div>
        <a class="back-link" href="${rootRel}${context.pathPrefix}#stories">${esc(context.ui.story.backToList)}</a>
        <p class="eyebrow">${esc(story.category)} · ${esc(story.readingTime)}</p>
        <h1>${esc(story.title)}</h1>
        <p>${esc(story.deck)}</p>
        <div class="tag-row">${story.tags.map((tag) => `<span>${esc(tag)}</span>`).join("")}</div>
      </div>
      ${sourceBadge(story, context)}
    </header>
    <div class="article-layout">
      <div class="article-body">
        <p class="lead">${esc(story.summary)}</p>
        ${story.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}
        ${
          deepDive.length
            ? `<section class="deep-dive">
              <span class="eyebrow">${esc(context.ui.story.deepEyebrow)}</span>
              <h2>${esc(context.ui.story.deepHeading)}</h2>
              ${deepDive.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}
            </section>`
            : ""
        }
      </div>
      <aside class="note-panel">
        <span class="eyebrow">${esc(context.ui.story.notesEyebrow)}</span>
        <h2>${esc(context.ui.story.notesHeading)}</h2>
        <ul>${story.notes.map((note) => `<li>${esc(note)}</li>`).join("")}</ul>
        ${
          linkedThemes.length
            ? `<div class="theme-links">
              <span>${esc(context.ui.story.themeLinks)}</span>
              ${linkedThemes
                .map((theme) => `<a href="${rootRel}${context.pathPrefix}themes/${theme.slug}/">${esc(theme.title)}</a>`)
                .join("")}
            </div>`
            : ""
        }
      </aside>
    </div>
  </article>
  <section class="story-section compact">
    <div class="section-heading">
      <span class="eyebrow">${esc(context.ui.story.nextEyebrow)}</span>
      <h2>${esc(context.ui.story.nextHeading)}</h2>
    </div>
    <div class="story-grid three">
      ${related.map((item, index) => storyCard(item, index, rootRel, context)).join("")}
    </div>
  </section>`;

  return pageShell({
    context,
    title: `${story.title} | ${context.site.name}`,
    description: story.deck,
    body,
    pathName,
    structuredData: [articleLd]
  });
}

function themesPage(context = zhContext) {
  const pathName = `${context.pathPrefix}themes/`;
  const rootRel = relativeRoot(pathName);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${context.site.name} theme index`,
    itemListElement: context.themeCollections.map((theme, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: theme.title,
      url: absoluteUrl(`${context.pathPrefix}themes/${theme.slug}/`)
    }))
  };
  const body = `<section class="plain-page theme-index-page">
    <div class="section-heading">
      <span class="eyebrow">${esc(context.ui.theme.indexEyebrow)}</span>
      <h1>${esc(context.ui.theme.indexTitle)}</h1>
      <p>${esc(context.ui.theme.indexDescription)}</p>
    </div>
    <div class="theme-grid">
      ${context.themeCollections.map((theme, index) => themeCard(theme, index, rootRel, context)).join("")}
    </div>
  </section>`;

  return pageShell({
    context,
    title: `${context.ui.theme.indexTitle} | ${context.site.name}`,
    description: context.ui.theme.indexDescription,
    pathName,
    body,
    structuredData: [itemList]
  });
}

function themePage(theme, context = zhContext) {
  const pathName = `${context.pathPrefix}themes/${theme.slug}/`;
  const rootRel = relativeRoot(pathName);
  const themeStories = storiesForTheme(theme, context);
  const uniqueSources = themeStories
    .map((story) => story.sourceBook)
    .filter((value, index, array) => array.indexOf(value) === index);
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: theme.title,
    description: theme.deck,
    url: absoluteUrl(pathName),
    inLanguage: context.locale,
    hasPart: themeStories.map((story) => ({
      "@type": "Article",
      headline: story.title,
      url: absoluteUrl(`${context.pathPrefix}stories/${story.slug}/`)
    }))
  };
  const body = `<section class="theme-hero tone-${theme.tone}">
    <a class="back-link" href="${rootRel}${context.pathPrefix}themes/">${esc(context.ui.theme.backToIndex)}</a>
    <span class="eyebrow">${esc(context.ui.theme.route)}</span>
    <h1>${esc(theme.title)}</h1>
    <p>${esc(theme.deck)}</p>
    <div class="theme-stats">
      <span>${esc(context.ui.theme.statsStories(themeStories.length))}</span>
      <span>${esc(uniqueSources.join(" / "))}</span>
    </div>
  </section>

  <section class="theme-layout">
    <aside class="source-panel tone-${theme.tone}">
      <span class="eyebrow">${esc(context.ui.theme.editorRoute)}</span>
      <h2>${esc(context.ui.theme.descriptionHeading)}</h2>
      <p>${esc(theme.description)}</p>
      <p>${esc(theme.editorialNote)}</p>
    </aside>
    <div>
      <div class="section-heading tight">
        <span class="eyebrow">${esc(context.ui.theme.readingOrder)}</span>
        <h2>${esc(context.ui.theme.readingHeading)}</h2>
      </div>
      <div class="story-grid theme-story-grid">
        ${themeStories.map((story, index) => storyCard(story, index, rootRel, context)).join("")}
      </div>
    </div>
  </section>`;

  return pageShell({
    context,
    title: `${theme.title} | ${context.site.name}`,
    description: theme.deck,
    pathName,
    body,
    structuredData: [collectionLd]
  });
}

function simplePage({ slug, title, description, body }, context = zhContext) {
  return pageShell({
    context,
    title: `${title} | ${context.site.name}`,
    description,
    pathName: `${context.pathPrefix}${slug}/`,
    body: `<section class="plain-page">
      <div class="section-heading">
        <span class="eyebrow">${esc(context.site.shortName)}</span>
        <h1>${esc(title)}</h1>
      </div>
      <div class="plain-body">${body}</div>
    </section>`
  });
}

function notFoundPage() {
  const rootRel = relativeRoot("404.html");
  return pageShell({
    context: zhContext,
    title: `页面未找到 | ${site.name}`,
    description: "子夜故事档案馆的页面未找到提示页。",
    pathName: "404.html",
    body: `<section class="plain-page not-found-page">
      <div class="section-heading">
        <span class="eyebrow">404</span>
        <h1>这条夜路暂时没有档案</h1>
      </div>
      <div class="plain-body">
        <p class="lead">可能是链接已经调整，也可能是这个故事还没有整理上线。</p>
        <p>你可以回到首页，从专题索引或故事列表继续阅读。</p>
        <p class="not-found-actions">
          <a class="primary-link" href="${rootRel}">返回首页</a>
          <a class="secondary-link" href="${rootRel}themes/">查看专题</a>
        </p>
      </div>
    </section>`
  });
}

function sourcesPage(context = zhContext) {
  const page = context.staticPageBySlug.get("sources");
  const rows = context.site.sources
    .map(
      (source) => `<article class="source-row">
        <div>
          <span>${esc(source.era)}</span>
          <h2>${esc(source.title)}</h2>
          <p>${esc(source.sourceRights)}</p>
        </div>
        <div>
          <p>${esc(source.usePlan)}</p>
          <a class="text-link" href="${esc(source.sourceUrl)}" rel="nofollow noopener" target="_blank">${esc(context.ui.openSource)}</a>
        </div>
      </article>`
    )
    .join("");

  return simplePage(
    {
      ...page,
      body: `${page.body}${rows}`
    },
    context
  );
}

function authorsPage(context = zhContext) {
  const page = context.staticPageBySlug.get("authors");
  const cards = context.site.authors
    .map(
      (author) => `<article class="author-card">
        <h2>${esc(author.name)}</h2>
        <span>${esc(author.role)}</span>
        <p>${esc(author.bio)}</p>
      </article>`
    )
    .join("");

  return simplePage(
    {
      ...page,
      body: `${page.body}<div class="author-grid">${cards}</div>`
    },
    context
  );
}

function contentRoadmapPage(context = zhContext) {
  const page = context.staticPageBySlug.get("content-roadmap");
  const rows = context.expansionPlan
    .map(
      (item) => `<article class="source-row">
        <div>
          <span>${esc(item.target)}</span>
          <h2>${esc(item.title)}</h2>
        </div>
        <div>
          <p>${esc(item.description)}</p>
        </div>
      </article>`
    )
    .join("");

  return simplePage(
    {
      ...page,
      body: `${page.body}${rows}`
    },
    context
  );
}

function rssXml(context = zhContext) {
  const items = context.stories
    .map(
      (story) => `<item>
  <title>${esc(story.title)}</title>
  <link>${absoluteUrl(`${context.pathPrefix}stories/${story.slug}/`)}</link>
  <guid>${absoluteUrl(`${context.pathPrefix}stories/${story.slug}/`)}</guid>
  <description>${esc(story.deck)}</description>
  <pubDate>${new Date(story.lastReviewed).toUTCString()}</pubDate>
</item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>${esc(context.site.name)}</title>
  <link>${absoluteUrl(context.pathPrefix)}</link>
  <description>${esc(context.site.description)}</description>
${items}
</channel>
</rss>`;
}

function sitemapXml() {
  const zhUrls = [
    "",
    "themes/",
    "content-roadmap/",
    "sources/",
    "authors/",
    ...zhStaticPages
      .filter((page) => !["content-roadmap", "sources", "authors"].includes(page.slug))
      .map((page) => `${page.slug}/`),
    ...themeCollections.map((theme) => `themes/${theme.slug}/`),
    ...stories.map((story) => `stories/${story.slug}/`)
  ];
  const enUrls = [
    "en/",
    "en/themes/",
    ...englishStaticPages.map((page) => `en/${page.slug}/`),
    ...englishThemeCollections.map((theme) => `en/themes/${theme.slug}/`),
    ...englishStories.map((story) => `en/stories/${story.slug}/`)
  ];
  const urls = [...zhUrls, ...enUrls].filter(
    (item, index, array) => array.findIndex((candidate) => candidate === item) === index
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map((item) => {
    const context = item.startsWith("en/") ? enContext : zhContext;
    const alternateXml = alternatesFor(item, context)
      .map(
        (link) =>
          `    <xhtml:link rel="alternate" hreflang="${esc(link.hreflang)}" href="${esc(link.href)}" />`
      )
      .join("\n");
    return `  <url>
    <loc>${absoluteUrl(item)}</loc>
${alternateXml}
    <lastmod>2026-07-06</lastmod>
  </url>`;
  })
  .join("\n")}
</urlset>`;
}

function adsTxt() {
  if (site.adsense?.enabled && site.adsense.publisherId) {
    const pubId = site.adsense.publisherId.replace(/^ca-/, "");
    return `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`;
  }

  return [
    "# AdSense is not enabled for this static preview.",
    "# After approval, set site.adsense.enabled to true and publisherId to ca-pub-xxxxxxxxxxxxxxxx.",
    "# The generated line will look like:",
    "# google.com, pub-xxxxxxxxxxxxxxxx, DIRECT, f08c47fec0942fa0",
    ""
  ].join("\n");
}

async function writePage(relativePath, html) {
  const dir = path.join(siteRoot, relativePath);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), html.replace(/[ \t]+$/gm, ""), "utf8");
}

async function writeContext(context) {
  await writePage(context.pathPrefix.replace(/\/$/, ""), homePage(context));
  await writePage(path.join(context.pathPrefix, "themes"), themesPage(context));
  await writePage(path.join(context.pathPrefix, "content-roadmap"), contentRoadmapPage(context));
  await writePage(path.join(context.pathPrefix, "sources"), sourcesPage(context));
  await writePage(path.join(context.pathPrefix, "authors"), authorsPage(context));

  for (const page of context.staticPages.filter(
    (item) => !["content-roadmap", "sources", "authors"].includes(item.slug)
  )) {
    await writePage(path.join(context.pathPrefix, page.slug), simplePage(page, context));
  }

  for (const story of context.stories) {
    await writePage(path.join(context.pathPrefix, "stories", story.slug), storyPage(story, context));
  }

  for (const theme of context.themeCollections) {
    await writePage(path.join(context.pathPrefix, "themes", theme.slug), themePage(theme, context));
  }

  const rssDir = path.join(siteRoot, context.pathPrefix);
  await mkdir(rssDir, { recursive: true });
  await writeFile(path.join(rssDir, "rss.xml"), rssXml(context), "utf8");
}

await writeContext(zhContext);
await writeContext(enContext);

await writeFile(path.join(siteRoot, "sitemap.xml"), sitemapXml(), "utf8");
await writeFile(
  path.join(siteRoot, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${site.canonicalOrigin}${site.basePath}sitemap.xml\n`,
  "utf8"
);
await writeFile(path.join(siteRoot, "ads.txt"), adsTxt(), "utf8");
await writeFile(path.join(siteRoot, "404.html"), notFoundPage(), "utf8");
await writeFile(path.join(siteRoot, ".nojekyll"), "", "utf8");

console.log(`Built ${site.name} at ${siteRoot}`);
