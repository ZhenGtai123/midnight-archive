import { mkdir, writeFile, copyFile } from "node:fs/promises";
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

await mkdir(path.join(siteRoot, "stories"), { recursive: true });
await mkdir(path.join(siteRoot, "themes"), { recursive: true });
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

const storyBySlug = new Map(stories.map((story) => [story.slug, story]));

function storiesForTheme(theme) {
  return theme.storySlugs.map((slug) => storyBySlug.get(slug)).filter(Boolean);
}

function urlFor(href) {
  if (href.startsWith("http")) return href;
  if (href.startsWith(site.basePath)) return href.slice(site.basePath.length);
  if (href.startsWith("/")) return href.slice(1);
  return href;
}

function pageShell({ title, description, body, pathName = "", structuredData = [] }) {
  const canonical = `${site.canonicalOrigin}${site.basePath}${pathName}`.replace(/\/+$/, "/");
  const rootRel = relativeRoot(pathName);
  const ogType = pathName.startsWith("stories/") ? "article" : "website";
  const ogImage = `${site.canonicalOrigin}${site.basePath}assets/hero-midnight-archive.png`;
  const adsenseScript =
    site.adsense?.enabled && site.adsense.publisherId
      ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${esc(site.adsense.publisherId)}" crossorigin="anonymous"></script>`
      : "";
  const jsonLd = structuredData
    .map((item) => `<script type="application/ld+json">${JSON.stringify(item)}</script>`)
    .join("\n");

  return `<!doctype html>
<html lang="${site.locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index,follow">
  <meta name="theme-color" content="#060706">
  <link rel="canonical" href="${esc(canonical)}">
  <link rel="alternate" type="application/rss+xml" title="${esc(site.name)} RSS" href="${rootRel}rss.xml">
  <link rel="icon" href="${rootRel}assets/logo-midnight-archive.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${rootRel}assets/midnight.css">
  ${adsenseScript}
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:url" content="${esc(canonical)}">
  <meta property="og:site_name" content="${esc(site.name)}">
  <meta property="og:locale" content="${esc(site.locale.replace("-", "_"))}">
  <meta property="og:image" content="${esc(ogImage)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${esc(ogImage)}">
  ${jsonLd}
</head>
<body>
  <a class="skip-link" href="#main">跳到正文</a>
  <div class="reading-progress" aria-hidden="true"></div>
  <div class="cursor-glow" aria-hidden="true"></div>
  <header class="site-header">
    <a class="brand" href="${rootRel}" aria-label="${esc(site.name)}首页">
      <img class="brand-logo" src="${rootRel}assets/logo-midnight-archive.svg" alt="" aria-hidden="true">
      <span>
        <strong>${esc(site.shortName)}</strong>
        <small>${esc(site.tagline)}</small>
      </span>
    </a>
    <nav class="nav" aria-label="主导航">
      ${site.nav.map((item) => `<a href="${rootRel}${esc(urlFor(item.href))}">${esc(item.label)}</a>`).join("")}
    </nav>
  </header>
  <main id="main">
    ${body}
  </main>
  <footer class="site-footer">
    <div>
      <strong>${esc(site.name)}</strong>
      <p>公版故事导读、来源核验和现代阅读札记。每篇文章都应有来源和编辑说明。</p>
    </div>
    <nav aria-label="页脚导航">
      <a href="${rootRel}about/">关于</a>
      <a href="${rootRel}contact/">联系</a>
      <a href="${rootRel}privacy/">隐私</a>
      <a href="${rootRel}advertising-policy/">广告说明</a>
      <a href="${rootRel}terms/">条款</a>
      <a href="${rootRel}sitemap.xml">站点地图</a>
    </nav>
  </footer>
  <script src="${rootRel}assets/midnight.js" defer></script>
</body>
</html>`;
}

function storyCard(story, index, rootRel = "./") {
  return `<article class="story-card tone-${story.coverTone}" style="--card-index:${index}">
    <a href="${rootRel}stories/${story.slug}/" aria-label="阅读${esc(story.title)}">
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

function themeCard(theme, index, rootRel = "./") {
  const themeStories = storiesForTheme(theme);
  return `<article class="theme-card tone-${theme.tone}" style="--card-index:${index}">
    <a href="${rootRel}themes/${theme.slug}/" aria-label="进入${esc(theme.title)}专题">
      <div class="card-topline">
        <span>Theme route</span>
        <span>${themeStories.length} 篇</span>
      </div>
      <h3>${esc(theme.title)}</h3>
      <p>${esc(theme.deck)}</p>
      <div class="theme-mini-list">
        ${themeStories.slice(0, 5).map((story) => `<span>${esc(story.sourceTitle)}</span>`).join("")}
      </div>
    </a>
  </article>`;
}

function sourceBadge(story) {
  return `<aside class="source-panel" aria-label="来源说明">
    <div>
      <span class="eyebrow">Source</span>
      <h2>来源与编辑说明</h2>
    </div>
    <dl>
      <div><dt>原题</dt><dd>${esc(story.sourceTitle)}</dd></div>
      <div><dt>出处</dt><dd>${esc(story.sourceBook)}</dd></div>
      <div><dt>作者</dt><dd>${esc(story.originalAuthor)}</dd></div>
      <div><dt>年代</dt><dd>${esc(story.era)}</dd></div>
      <div><dt>处理方式</dt><dd>${esc(story.editorialMode)}</dd></div>
      <div><dt>复核日期</dt><dd>${esc(story.lastReviewed)}</dd></div>
    </dl>
    <p>${esc(story.sourceRights)}</p>
    <a class="text-link" href="${esc(story.sourceUrl)}" rel="nofollow noopener" target="_blank">查看公开来源</a>
  </aside>`;
}

function homePage() {
  const featured = stories[0];
  const rootRel = relativeRoot("");
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: `${site.canonicalOrigin}${site.basePath}`
  };

  const body = `
  <section class="hero">
    <img class="hero-image" src="${rootRel}assets/hero-midnight-archive.png" alt="雨夜旧书馆入口与暖色灯光">
    <div class="hero-overlay"></div>
    <div class="rain-field" aria-hidden="true"></div>
    <div class="lantern-orbit" aria-hidden="true"></div>
    <div class="hero-content">
      <p class="eyebrow">Public-domain strange tales</p>
      <h1>${esc(site.name)}</h1>
      <p class="hero-copy">${esc(site.description)}</p>
      <div class="hero-actions">
        <a class="primary-link" href="${rootRel}stories/${featured.slug}/">读今日夜谈</a>
        <a class="secondary-link" href="${rootRel}themes/">进入专题地图</a>
      </div>
    </div>
    <div class="hero-strip" aria-label="站点数据">
      <span><strong>${stories.length}</strong> 篇样稿</span>
      <span><strong>${themeCollections.length}</strong> 条专题</span>
      <span><strong>0</strong> 未署名转载</span>
    </div>
  </section>

  <section class="intro-band reveal">
    <div class="section-heading">
      <span class="eyebrow">Night index</span>
      <h2>把旧书里的异闻，整理成可以穿行的夜色地图</h2>
    </div>
    <div class="feature-grid">
      <article>
        <span>01</span>
        <h3>故事星图</h3>
        <p>按人物、器物、地点和情绪串联篇目，让读者从一个夜谈自然走向另一个夜谈。</p>
      </article>
      <article>
        <span>02</span>
        <h3>来源灯牌</h3>
        <p>出处、年代、作者和处理方式藏在每篇旁栏里，读得顺，也查得到。</p>
      </article>
      <article>
        <span>03</span>
        <h3>深夜阅读</h3>
        <p>长文用高对比正文、进度条和安静动效服务阅读，而不是抢走故事本身。</p>
      </article>
    </div>
  </section>

  <section class="theme-band reveal" id="themes">
    <div class="section-heading">
      <span class="eyebrow">Theme routes</span>
      <h2>先做几条能留住读者的夜读路径</h2>
    </div>
    <div class="theme-grid">
      ${themeCollections.map((theme, index) => themeCard(theme, index, rootRel)).join("")}
    </div>
  </section>

  <section class="story-section reveal" id="stories">
    <div class="section-heading">
      <span class="eyebrow">Archive</span>
      <h2>第一批夜谈样稿</h2>
    </div>
    <div class="story-grid">
      ${stories.map((story, index) => storyCard(story, index, rootRel)).join("")}
    </div>
  </section>

  <section class="roadmap-band reveal">
    <div class="section-heading">
      <span class="eyebrow">Next expansion</span>
      <h2>下一步不是铺量，是把栏目做成网络</h2>
    </div>
    <div class="roadmap-strip">
      ${expansionPlan
        .map(
          (item) => `<article>
            <span>${esc(item.target)}</span>
            <h3>${esc(item.title)}</h3>
            <p>${esc(item.description)}</p>
          </article>`
        )
        .join("")}
    </div>
    <a class="text-link" href="${rootRel}content-roadmap/">查看完整扩展路线</a>
  </section>

  <section class="source-band reveal">
    <div class="section-heading">
      <span class="eyebrow">Sources</span>
      <h2>可扩展的来源池</h2>
    </div>
    <div class="source-list">
      ${site.sources
        .map(
          (source) => `<article>
            <span>${esc(source.era)}</span>
            <h3>${esc(source.title)}</h3>
            <p>${esc(source.usePlan)}</p>
            <a href="${esc(source.sourceUrl)}" rel="nofollow noopener" target="_blank">来源链接</a>
          </article>`
        )
        .join("")}
    </div>
  </section>`;

  return pageShell({
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    body,
    structuredData: [organization]
  });
}

function storyPage(story) {
  const rootRel = relativeRoot(`stories/${story.slug}/`);
  const deepDive = storyDeepDives[story.slug] || [];
  const linkedThemes = themeCollections.filter((theme) => theme.storySlugs.includes(story.slug));
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description: story.deck,
    author: { "@type": "Organization", name: site.editor },
    publisher: { "@type": "Organization", name: site.name },
    dateModified: story.lastReviewed,
    about: story.tags,
    isBasedOn: story.sourceUrl
  };

  const related = stories.filter((item) => item.slug !== story.slug).slice(0, 3);
  const body = `
  <article class="article-page tone-${story.coverTone}">
    <header class="article-hero">
      <div>
        <a class="back-link" href="${rootRel}#stories">返回故事列表</a>
        <p class="eyebrow">${esc(story.category)} · ${esc(story.readingTime)}</p>
        <h1>${esc(story.title)}</h1>
        <p>${esc(story.deck)}</p>
        <div class="tag-row">${story.tags.map((tag) => `<span>${esc(tag)}</span>`).join("")}</div>
      </div>
      ${sourceBadge(story)}
    </header>
    <div class="article-layout">
      <div class="article-body">
        <p class="lead">${esc(story.summary)}</p>
        ${story.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}
        ${
          deepDive.length
            ? `<section class="deep-dive">
              <span class="eyebrow">Deep reading</span>
              <h2>深读补充</h2>
              ${deepDive.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}
            </section>`
            : ""
        }
      </div>
      <aside class="note-panel">
        <span class="eyebrow">Notes</span>
        <h2>编辑札记</h2>
        <ul>${story.notes.map((note) => `<li>${esc(note)}</li>`).join("")}</ul>
        ${
          linkedThemes.length
            ? `<div class="theme-links">
              <span>所属专题</span>
              ${linkedThemes
                .map((theme) => `<a href="${rootRel}themes/${theme.slug}/">${esc(theme.title)}</a>`)
                .join("")}
            </div>`
            : ""
        }
      </aside>
    </div>
  </article>
  <section class="story-section compact">
    <div class="section-heading">
      <span class="eyebrow">Next reads</span>
      <h2>继续夜读</h2>
    </div>
    <div class="story-grid three">
      ${related.map((item, index) => storyCard(item, index, rootRel)).join("")}
    </div>
  </section>`;

  return pageShell({
    title: `${story.title} | ${site.name}`,
    description: story.deck,
    body,
    pathName: `stories/${story.slug}/`,
    structuredData: [articleLd]
  });
}

function themesPage() {
  const rootRel = relativeRoot("themes/");
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "子夜故事档案馆专题索引",
    itemListElement: themeCollections.map((theme, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: theme.title,
      url: `${site.canonicalOrigin}${site.basePath}themes/${theme.slug}/`
    }))
  };
  const body = `<section class="plain-page theme-index-page">
    <div class="section-heading">
      <span class="eyebrow">Theme routes</span>
      <h1>专题索引</h1>
      <p>把单篇故事连成可继续阅读的路径：人物、阴司、世情、器物、夜路和温柔志怪。</p>
    </div>
    <div class="theme-grid">
      ${themeCollections.map((theme, index) => themeCard(theme, index, rootRel)).join("")}
    </div>
  </section>`;

  return pageShell({
    title: `专题索引 | ${site.name}`,
    description: "子夜故事档案馆的专题阅读路径，按人物、空间、阴司、世情和器物组织公版志怪导读。",
    pathName: "themes/",
    body,
    structuredData: [itemList]
  });
}

function themePage(theme) {
  const rootRel = relativeRoot(`themes/${theme.slug}/`);
  const themeStories = storiesForTheme(theme);
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: theme.title,
    description: theme.deck,
    url: `${site.canonicalOrigin}${site.basePath}themes/${theme.slug}/`,
    hasPart: themeStories.map((story) => ({
      "@type": "Article",
      headline: story.title,
      url: `${site.canonicalOrigin}${site.basePath}stories/${story.slug}/`
    }))
  };
  const body = `<section class="theme-hero tone-${theme.tone}">
    <a class="back-link" href="${rootRel}themes/">返回专题索引</a>
    <span class="eyebrow">Theme route</span>
    <h1>${esc(theme.title)}</h1>
    <p>${esc(theme.deck)}</p>
    <div class="theme-stats">
      <span>${themeStories.length} 篇故事</span>
      <span>${esc(themeStories.map((story) => story.sourceBook).filter((value, index, array) => array.indexOf(value) === index).join(" / "))}</span>
    </div>
  </section>

  <section class="theme-layout">
    <aside class="source-panel tone-${theme.tone}">
      <span class="eyebrow">Editor's route</span>
      <h2>专题说明</h2>
      <p>${esc(theme.description)}</p>
      <p>${esc(theme.editorialNote)}</p>
    </aside>
    <div>
      <div class="section-heading tight">
        <span class="eyebrow">Reading order</span>
        <h2>从这些篇目开始</h2>
      </div>
      <div class="story-grid theme-story-grid">
        ${themeStories.map((story, index) => storyCard(story, index, rootRel)).join("")}
      </div>
    </div>
  </section>`;

  return pageShell({
    title: `${theme.title} | ${site.name}`,
    description: theme.deck,
    pathName: `themes/${theme.slug}/`,
    body,
    structuredData: [collectionLd]
  });
}

function simplePage({ slug, title, description, body }) {
  return pageShell({
    title: `${title} | ${site.name}`,
    description,
    pathName: `${slug}/`,
    body: `<section class="plain-page">
      <div class="section-heading">
        <span class="eyebrow">${esc(site.shortName)}</span>
        <h1>${esc(title)}</h1>
      </div>
      <div class="plain-body">${body}</div>
    </section>`
  });
}

function notFoundPage() {
  const rootRel = relativeRoot("404.html");
  return pageShell({
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

function sourcesPage() {
  const rows = site.sources
    .map(
      (source) => `<article class="source-row">
        <div>
          <span>${esc(source.era)}</span>
          <h2>${esc(source.title)}</h2>
          <p>${esc(source.sourceRights)}</p>
        </div>
        <div>
          <p>${esc(source.usePlan)}</p>
          <a class="text-link" href="${esc(source.sourceUrl)}" rel="nofollow noopener" target="_blank">打开来源</a>
        </div>
      </article>`
    )
    .join("");

  return simplePage({
    slug: "sources",
    title: "来源库",
    description: "子夜故事档案馆的公开来源、授权说明和使用计划。",
    body: `<p class="lead">这里记录每一类可复用故事来源。正式扩量前，每个具体篇目都需要继续核验原文链接、版本、授权和署名方式。</p>${rows}`
  });
}

function authorsPage() {
  const cards = site.authors
    .map(
      (author) => `<article class="author-card">
        <h2>${esc(author.name)}</h2>
        <span>${esc(author.role)}</span>
        <p>${esc(author.bio)}</p>
      </article>`
    )
    .join("");

  return simplePage({
    slug: "authors",
    title: "作者与编辑",
    description: "原典作者、现代编辑和站点内容责任说明。",
    body: `<div class="author-grid">${cards}</div>`
  });
}

function contentRoadmapPage() {
  const rows = expansionPlan
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

  return simplePage({
    slug: "content-roadmap",
    title: "内容扩展路线",
    description: "子夜故事档案馆的故事扩展方向、栏目规划和内容厚度标准。",
    body:
      `<p class="lead">申请 AdSense 前，建议把站点扩展到至少 25-35 篇有来源、有导读、有内链的文章。每篇正式文章应接近 1200-1800 中文字，并包含来源说明、主题解读和继续阅读入口。</p>${rows}`
  });
}

const staticPages = [
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
  }
];

function rssXml() {
  const items = stories
    .map(
      (story) => `<item>
  <title>${esc(story.title)}</title>
  <link>${site.canonicalOrigin}${site.basePath}stories/${story.slug}/</link>
  <guid>${site.canonicalOrigin}${site.basePath}stories/${story.slug}/</guid>
  <description>${esc(story.deck)}</description>
  <pubDate>${new Date(story.lastReviewed).toUTCString()}</pubDate>
</item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>${esc(site.name)}</title>
  <link>${site.canonicalOrigin}${site.basePath}</link>
  <description>${esc(site.description)}</description>
${items}
</channel>
</rss>`;
}

function sitemapXml() {
  const urls = [
    "",
    "themes/",
    "content-roadmap/",
    "sources/",
    "authors/",
    ...staticPages.map((page) => `${page.slug}/`),
    ...themeCollections.map((theme) => `themes/${theme.slug}/`),
    ...stories.map((story) => `stories/${story.slug}/`)
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (item) => `  <url>
    <loc>${site.canonicalOrigin}${site.basePath}${item}</loc>
    <lastmod>2026-07-06</lastmod>
  </url>`
  )
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
  await writeFile(path.join(dir, "index.html"), html, "utf8");
}

await writePage("", homePage());
await writePage("themes", themesPage());
await writePage("content-roadmap", contentRoadmapPage());
await writePage("sources", sourcesPage());
await writePage("authors", authorsPage());

for (const page of staticPages) {
  await writePage(page.slug, simplePage(page));
}

for (const story of stories) {
  await writePage(path.join("stories", story.slug), storyPage(story));
}

for (const theme of themeCollections) {
  await writePage(path.join("themes", theme.slug), themePage(theme));
}

await writeFile(path.join(siteRoot, "rss.xml"), rssXml(), "utf8");
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
