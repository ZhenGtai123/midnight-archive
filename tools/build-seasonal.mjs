import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  seasonalArticles,
  seasonalEnglishArticles,
  seasonalEnglishExpansionPlan,
  seasonalEnglishHome,
  seasonalEnglishSite,
  seasonalEnglishStaticPages,
  seasonalEnglishTopics,
  seasonalExpansionPlan,
  seasonalHome,
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
const publicAssets = path.join(root, "public", seasonalSite.slug, "assets");

const zhUi = {
  skipLink: "跳到正文",
  homeAria: (name) => `${name}首页`,
  navLabel: "主导航",
  footerNavLabel: "页脚导航",
  languageSwitchLabel: "English",
  sourceHeading: "来源与编辑说明",
  sourceEyebrow: "Source",
  termLabel: "节气",
  sourceTypeLabel: "来源类型",
  editorialModeLabel: "编辑方式",
  reviewedLabel: "复核日期",
  rightsLabel: "权利说明",
  editorNoteLabel: "编辑说明",
  viewSource: "查看公开来源",
  observeEyebrow: "Field checklist",
  observeHeading: "本节气可以这样观察",
  backHome: "返回首页",
  backArticles: "返回观察列表",
  relatedEyebrow: "Related routes",
  relatedHeading: "继续阅读",
  relatedCopy: "这篇文章被放入以下专题路径，方便从一个节气继续走向同类观察。",
  topicsEyebrow: "Reading routes",
  topicsTitle: "节气专题地图",
  topicsCopy:
    "专题负责把一年拆成可阅读的路径：城市物候、居家节气、雨水湿度、光线历法。后续内容扩展会围绕这些路径生长。",
  topicRoute: "Reading route",
  articleCount: (count) => `${count} 篇文章`,
  editorialRoute: "Editorial route",
  topicWhy: "为什么这样编排",
  backTopics: "返回专题列表",
  readArticle: (title) => `阅读 ${title}`,
  openTopic: (title) => `打开专题 ${title}`,
  notFoundTitle: "这条观察路线暂时没有记录",
  notFoundCopy: "可能是链接已经调整，也可能是这个节气页面还在编辑。你可以回到首页继续阅读。"
};

const enUi = {
  skipLink: "Skip to content",
  homeAria: (name) => `${name} home`,
  navLabel: "Primary navigation",
  footerNavLabel: "Footer navigation",
  languageSwitchLabel: "中文",
  sourceHeading: "Source and editorial note",
  sourceEyebrow: "Source",
  termLabel: "Solar term",
  sourceTypeLabel: "Source type",
  editorialModeLabel: "Editorial mode",
  reviewedLabel: "Reviewed",
  rightsLabel: "Rights note",
  editorNoteLabel: "Editor note",
  viewSource: "View public source",
  observeEyebrow: "Field checklist",
  observeHeading: "How to observe this term",
  backHome: "Back to home",
  backArticles: "Back to notes",
  relatedEyebrow: "Related routes",
  relatedHeading: "Continue reading",
  relatedCopy:
    "This note belongs to the following reading routes, so a single solar term can lead into a wider seasonal method.",
  topicsEyebrow: "Reading routes",
  topicsTitle: "Solar-Term Topic Map",
  topicsCopy:
    "Topics turn the year into readable routes: urban phenology, home-scale seasons, rain and humidity, light and calendar.",
  topicRoute: "Reading route",
  articleCount: (count) => `${count} ${count === 1 ? "article" : "articles"}`,
  editorialRoute: "Editorial route",
  topicWhy: "Why this route works",
  backTopics: "Back to topic list",
  readArticle: (title) => `Read ${title}`,
  openTopic: (title) => `Open ${title}`,
  notFoundTitle: "This observation route is not recorded yet",
  notFoundCopy: "The link may have changed, or this seasonal page may still be in editing. Return home to keep reading."
};

const zhContext = {
  site: { ...seasonalSite, pathPrefix: "" },
  home: seasonalHome,
  articles: seasonalArticles,
  topics: seasonalTopics,
  staticPages: seasonalStaticPages,
  expansionPlan: seasonalExpansionPlan,
  termCalendar: seasonalTermCalendar,
  poems: seasonalPoems,
  ui: zhUi,
  locale: "zh-CN",
  hreflang: "zh-CN",
  pathPrefix: ""
};

const enContext = {
  site: seasonalEnglishSite,
  home: seasonalEnglishHome,
  articles: seasonalEnglishArticles,
  topics: seasonalEnglishTopics,
  staticPages: seasonalEnglishStaticPages,
  expansionPlan: seasonalEnglishExpansionPlan,
  termCalendar: [],
  poems: [],
  ui: enUi,
  locale: "en",
  hreflang: "en",
  pathPrefix: seasonalEnglishSite.pathPrefix
};

for (const context of [zhContext, enContext]) {
  context.articleBySlug = new Map(context.articles.map((article) => [article.slug, article]));
  context.staticPageBySlug = new Map(context.staticPages.map((page) => [page.slug, page]));
}

const englishArticleSlugs = new Set(enContext.articles.map((article) => article.slug));
const englishTopicSlugs = new Set(enContext.topics.map((topic) => topic.slug));
const englishStaticSlugs = new Set(enContext.staticPages.map((page) => page.slug));

function cleanPagePath(pathName = "") {
  const clean = pathName.replace(/^\/+/, "");
  if (!clean) return "";
  if (/\.[a-z0-9]+$/i.test(clean)) return clean;
  return clean.replace(/\/?$/, "/");
}

function relativeRoot(pathName = "") {
  const clean = cleanPagePath(pathName);
  if (!clean) return "./";
  const parts = clean.split("/").filter(Boolean);
  const depth = /\.[a-z0-9]+$/i.test(clean) ? Math.max(0, parts.length - 1) : parts.length;
  return depth === 0 ? "./" : "../".repeat(depth);
}

function esc(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function stripHtml(value = "") {
  return String(value).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function absoluteUrl(pathName = "") {
  return `${seasonalSite.canonicalOrigin}${seasonalSite.basePath}${cleanPagePath(pathName)}`;
}

function localHref(rootRel, href, context) {
  if (href.startsWith("http") || href.startsWith("mailto:")) return href;
  if (href.startsWith("#")) return `${rootRel}${context.pathPrefix}${href}`;
  if (href.startsWith(seasonalSite.basePath)) return `${rootRel}${href.slice(seasonalSite.basePath.length)}`;
  if (href.startsWith("/")) return href;
  return `${rootRel}${href}`;
}

function enPathForZh(pathName = "") {
  const clean = cleanPagePath(pathName);
  if (!clean) return "en/";
  if (clean === "topics/") return "en/topics/";
  if (clean.startsWith("articles/")) {
    const slug = clean.split("/")[1];
    return englishArticleSlugs.has(slug) ? `en/${clean}` : null;
  }
  if (clean.startsWith("topics/")) {
    const slug = clean.split("/")[1];
    return englishTopicSlugs.has(slug) ? `en/${clean}` : null;
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
  return context.locale === "en" ? zhPathForEn(pathName) : enPathForZh(pathName);
}

function alternatesFor(pathName, context) {
  const clean = cleanPagePath(pathName);
  const zhPath = context.locale === "en" ? zhPathForEn(clean) : clean;
  const enPath = context.locale === "en" ? clean : enPathForZh(clean);
  const links = [];

  if (zhPath !== null) links.push({ hreflang: "zh-CN", href: absoluteUrl(zhPath) });
  if (enPath !== null) links.push({ hreflang: "en", href: absoluteUrl(enPath) });
  if (zhPath !== null) links.push({ hreflang: "x-default", href: absoluteUrl(zhPath) });

  return links.filter(
    (link, index, array) =>
      array.findIndex((item) => item.hreflang === link.hreflang && item.href === link.href) === index
  );
}

function topicArticles(topic, context) {
  return topic.articleSlugs.map((slug) => context.articleBySlug.get(slug)).filter(Boolean);
}

function headJson(structuredData = []) {
  return structuredData
    .map((item) => `  <script type="application/ld+json">${JSON.stringify(item)}</script>`)
    .join("\n");
}

function safeJson(data) {
  return JSON.stringify(data).replaceAll("<", "\\u003c");
}

function termDateLabel(dateValue) {
  const date = new Date(`${dateValue}T00:00:00+08:00`);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function currentTermSnapshot(calendar) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const dated = calendar.map((term) => ({
    ...term,
    time: new Date(`${term.date}T00:00:00+08:00`).getTime()
  }));
  let current = dated[0];
  let next = dated[1];

  for (let index = 0; index < dated.length; index += 1) {
    if (dated[index].time <= today) {
      current = dated[index];
      next = dated[index + 1] || dated[0];
    }
  }

  const daysToNext = Math.max(0, Math.ceil((next.time - today) / 86400000));
  const poem = seasonalPoems.find((item) => current.poemIds?.includes(item.id)) || seasonalPoems[0];

  return { current, next, daysToNext, poem };
}

function poemById(poemId, context) {
  return context.poems?.find((poem) => poem.id === poemId);
}

function termLink(term, rootRel, context) {
  return term.articleSlug
    ? `${rootRel}${context.pathPrefix}articles/${term.articleSlug}/`
    : `${rootRel}${context.pathPrefix}#poem-calendar`;
}

function termWheel(context, rootRel) {
  if (!context.termCalendar?.length) return "";
  return `<section class="section reveal term-wheel-section" id="today">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Solar term wheel</p>
        <h2>二十四节气轮盘</h2>
      </div>
      <p>把一年压成一个可点击的圆。已有长文的节气会进入文章页，其他节气先进入诗历索引。</p>
    </div>
    <div class="term-wheel-shell">
      <div class="term-wheel" aria-label="二十四节气">
        ${context.termCalendar
          .map(
            (term, index) => `<a class="term-dot" href="${termLink(term, rootRel, context)}" data-term-slug="${
              term.slug
            }" style="--i:${index};--term-color:${esc(term.color)}">
          <span>${esc(term.name)}</span>
        </a>`
          )
          .join("")}
        <div class="term-wheel-center">
          <span data-today-season>${esc(context.termCalendar[0].seasonLabel)}</span>
          <strong data-today-term>${esc(context.termCalendar[0].name)}</strong>
          <small data-today-date>${esc(termDateLabel(context.termCalendar[0].date))}</small>
        </div>
      </div>
      <aside class="today-console">
        <p class="eyebrow">Today</p>
        <h3><span data-today-term>${esc(context.termCalendar[0].name)}</span></h3>
        <p data-today-focus>${esc(context.termCalendar[0].focus)}</p>
        <dl>
          <div><dt>今年日期</dt><dd data-today-date>${esc(termDateLabel(context.termCalendar[0].date))}</dd></div>
          <div><dt>下个节气</dt><dd><span data-next-term>${esc(context.termCalendar[1].name)}</span> · <span data-days-next>0</span> 天</dd></div>
          <div><dt>今日观察</dt><dd data-today-observe>${esc(context.termCalendar[0].observe)}</dd></div>
        </dl>
      </aside>
    </div>
  </section>`;
}

function poemCalendar(context, rootRel) {
  if (!context.poems?.length) return "";
  const filters = [
    { label: "全部", value: "all" },
    { label: "春", value: "spring" },
    { label: "夏", value: "summer" },
    { label: "秋", value: "autumn" },
    { label: "冬", value: "winter" }
  ];
  const termSeason = new Map(context.termCalendar.map((term) => [term.slug, term.season]));

  return `<section class="section reveal poem-calendar" id="poem-calendar">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Poem calendar</p>
        <h2>节气诗句索引</h2>
      </div>
      <p>每首诗都绑定节气、意象和来源。这里不是诗词大全，而是把诗句变成可检索的四时地图。</p>
    </div>
    <div class="poem-filter-row" role="list" aria-label="按季节筛选诗句">
      ${filters
        .map(
          (filter, index) => `<button class="poem-filter${index === 0 ? " is-active" : ""}" type="button" data-poem-filter="${
            filter.value
          }">${esc(filter.label)}</button>`
        )
        .join("")}
    </div>
    <div class="poem-grid">
      ${context.poems
        .map((poem) => {
          const seasons = [...new Set(poem.termSlugs.map((slug) => termSeason.get(slug)).filter(Boolean))];
          const terms = poem.termSlugs
            .map((slug) => context.termCalendar.find((term) => term.slug === slug)?.name)
            .filter(Boolean);
          return `<article class="poem-card" data-poem-id="${esc(poem.id)}" data-poem-seasons="${esc(seasons.join(" "))}">
        <div>
          <p class="eyebrow">${esc(poem.dynasty)} · ${esc(poem.author)}</p>
          <h3>${esc(poem.title)}</h3>
          <blockquote>${esc(poem.excerpt)}</blockquote>
          <p>${esc(poem.note)}</p>
        </div>
        <div class="tag-row">${terms.slice(0, 4).map((term) => `<span>${esc(term)}</span>`).join("")}</div>
        <a class="text-link" href="${esc(poem.sourceUrl)}" rel="nofollow noopener" target="_blank">来源</a>
      </article>`;
        })
        .join("")}
    </div>
  </section>`;
}

function poemCardLab(context) {
  if (!context.poems?.length) return "";
  const firstPoem = context.poems[0];
  return `<section class="section reveal poem-card-lab" id="poem-card-lab">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Verse card studio</p>
        <h2>节气诗卡</h2>
      </div>
      <p>先做静态版诗卡工具。以后接入 AI 后，可以在这里生成解释、标题、配文和观察建议。</p>
    </div>
    <div class="tool-studio">
      <form class="tool-controls" aria-label="诗卡设置">
        <label>
          <span>诗句</span>
          <select data-poem-select>
            ${context.poems.map((poem) => `<option value="${esc(poem.id)}">${esc(poem.title)} · ${esc(poem.author)}</option>`).join("")}
          </select>
        </label>
        <label>
          <span>风格</span>
          <select data-card-style>
            <option value="warm">暖纸</option>
            <option value="green">青绿</option>
            <option value="night">夜色</option>
          </select>
        </label>
        <button class="primary-link" type="button" data-download-card>下载诗卡</button>
      </form>
      <div class="verse-card-preview" data-card-preview>
        <span class="eyebrow" data-card-kicker>${esc(firstPoem.dynasty)} · ${esc(firstPoem.author)}</span>
        <h3 data-card-title>${esc(firstPoem.title)}</h3>
        <blockquote data-card-excerpt>${esc(firstPoem.excerpt)}</blockquote>
        <p data-card-note>${esc(firstPoem.note)}</p>
      </div>
    </div>
  </section>`;
}

function pageShell({ context = zhContext, title, description, pathName = "", body, structuredData = [] }) {
  const cleanPath = cleanPagePath(pathName);
  const rootRel = relativeRoot(cleanPath);
  const canonical = absoluteUrl(cleanPath);
  const ogType = cleanPath.includes("articles/") ? "article" : "website";
  const jsonLd = headJson(structuredData);
  const jsonLdLines = jsonLd ? `${jsonLd}\n` : "";
  const adsenseScript =
    context.site.adsense.enabled && context.site.adsense.publisherId
      ? `  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${esc(context.site.adsense.publisherId)}" crossorigin="anonymous"></script>\n`
      : "";
  const alternateLinks = alternatesFor(cleanPath, context)
    .map((item) => `  <link rel="alternate" hreflang="${esc(item.hreflang)}" href="${esc(item.href)}">`)
    .join("\n");
  const languagePath = languageAlternatePath(cleanPath, context);
  const languageSwitch =
    languagePath !== null
      ? `<a class="language-link" href="${rootRel}${languagePath}" hreflang="${
          context.locale === "en" ? "zh-CN" : "en"
        }">${esc(context.ui.languageSwitchLabel)}</a>`
      : "";
  const navLinks = [
    ...context.site.nav.map((item) => `<a href="${localHref(rootRel, item.href, context)}">${esc(item.label)}</a>`),
    languageSwitch
  ].filter(Boolean);
  const homeHref = `${rootRel}${context.pathPrefix}`;
  const rssPath = `${context.pathPrefix}rss.xml`;
  const heroImageUrl = `${seasonalSite.canonicalOrigin}${seasonalSite.basePath}${context.site.heroImage}`;

  return `<!doctype html>
<html lang="${esc(context.locale)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index,follow">
  <meta name="theme-color" content="#f6edda">
  <link rel="canonical" href="${esc(canonical)}">
${alternateLinks}
  <link rel="alternate" type="application/rss+xml" title="${esc(context.site.name)} RSS" href="${rootRel}${rssPath}">
  <link rel="icon" href="${rootRel}${esc(context.site.logoImage)}" type="image/svg+xml">
  <link rel="stylesheet" href="${rootRel}assets/seasonal.css">
${adsenseScript}  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:url" content="${esc(canonical)}">
  <meta property="og:site_name" content="${esc(context.site.name)}">
  <meta property="og:locale" content="${esc(context.locale.replace("-", "_"))}">
  <meta property="og:image" content="${esc(heroImageUrl)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${esc(heroImageUrl)}">
${jsonLdLines}</head>
<body>
  <a class="skip-link" href="#main">${esc(context.ui.skipLink)}</a>
  <div class="reading-progress" aria-hidden="true"></div>
  <header class="site-header">
    <a class="brand" href="${homeHref}" aria-label="${esc(context.ui.homeAria(context.site.name))}">
      <img class="brand-logo" src="${rootRel}${esc(context.site.logoImage)}" alt="" aria-hidden="true">
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
      ${context.site.footerLinks
        .map((item) => `<a href="${localHref(rootRel, item.href, context)}">${esc(item.label)}</a>`)
        .join("")}
    </nav>
  </footer>
  <script src="${rootRel}assets/seasonal.js" defer></script>
</body>
</html>`;
}

function articleCard(article, rootRel = "./", context = zhContext) {
  return `<article class="article-card tone-${article.tone}">
    <a href="${rootRel}${context.pathPrefix}articles/${article.slug}/" aria-label="${esc(context.ui.readArticle(article.title))}">
      <div>
        <div class="card-topline">
          <span>${esc(article.term)}</span>
          <span>${esc(article.category)}</span>
          <span>${esc(article.readingTime)}</span>
        </div>
        <h3>${esc(article.title)}</h3>
        <p>${esc(article.deck)}</p>
      </div>
      <div class="tag-row">${article.tags.map((tag) => `<span>${esc(tag)}</span>`).join("")}</div>
    </a>
  </article>`;
}

function topicCard(topic, rootRel = "./", context = zhContext) {
  const articles = topicArticles(topic, context);
  return `<article class="topic-card tone-${topic.tone}">
    <a href="${rootRel}${context.pathPrefix}topics/${topic.slug}/" aria-label="${esc(context.ui.openTopic(topic.title))}">
      <div>
        <div class="card-topline">
          <span>${esc(context.ui.topicRoute)}</span>
          <span>${esc(context.ui.articleCount(articles.length))}</span>
        </div>
        <h3>${esc(topic.title)}</h3>
        <p>${esc(topic.deck)}</p>
      </div>
      <div class="tag-row">${articles.map((article) => `<span>${esc(article.term)}</span>`).join("")}</div>
    </a>
  </article>`;
}

function sourcePanel(article, context = zhContext) {
  const editorialMode = article.editorialMode || "公开资料核验 + 原创观察导读";
  const editorNote = article.editorNote
    ? `<div><dt>${esc(context.ui.editorNoteLabel)}</dt><dd>${esc(article.editorNote)}</dd></div>`
    : "";

  return `<aside class="source-panel tone-${article.tone}" aria-label="${esc(context.ui.sourceHeading)}">
    <span class="eyebrow">${esc(context.ui.sourceEyebrow)}</span>
    <h2>${esc(context.ui.sourceHeading)}</h2>
    <dl>
      <div><dt>${esc(context.ui.termLabel)}</dt><dd>${esc(article.term)}</dd></div>
      <div><dt>${esc(context.ui.sourceTypeLabel)}</dt><dd>${esc(article.sourceTitle)}</dd></div>
      <div><dt>${esc(context.ui.editorialModeLabel)}</dt><dd>${esc(editorialMode)}</dd></div>
      <div><dt>${esc(context.ui.reviewedLabel)}</dt><dd>${esc(article.lastReviewed)}</dd></div>
      ${editorNote}
    </dl>
    <p>${esc(article.sourceRights)}</p>
    <a class="text-link" href="${esc(article.sourceUrl)}" rel="nofollow noopener" target="_blank">${esc(context.ui.viewSource)}</a>
  </aside>`;
}

function observePanel(article, context = zhContext) {
  return `<aside class="observe-panel tone-${article.tone}">
    <span class="eyebrow">${esc(context.ui.observeEyebrow)}</span>
    <h2>${esc(context.ui.observeHeading)}</h2>
    <ul>${article.observe.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
  </aside>`;
}

function homePage(context = zhContext) {
  const featured = context.articles[0];
  const rootRel = relativeRoot(context.pathPrefix);
  const today = context.termCalendar?.length ? currentTermSnapshot(context.termCalendar) : null;
  const secondaryHref = context.poems?.length ? `${rootRel}${context.pathPrefix}#poem-card-lab` : `${rootRel}${context.pathPrefix}topics/`;
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: context.site.name,
    url: absoluteUrl(context.pathPrefix)
  };

  const body = `
  <section class="hero">
    <img class="hero-image" src="${rootRel}${context.site.heroImage}" alt="${esc(
      context.locale === "en"
        ? "Desk with seasonal notes, leaves, thermometer, and city morning light"
        : "窗边桌面上的节气观察笔记、叶片、温度计和城市晨光"
    )}">
    <div class="season-dial" aria-hidden="true"></div>
    <div class="hero-content">
      <p class="eyebrow">${esc(context.home.heroEyebrow)}</p>
      <h1>${esc(context.home.heroTitle || context.site.name)}</h1>
      <p class="hero-copy">${esc(context.site.description)}</p>
      <div class="hero-actions">
        <a class="primary-link" href="${rootRel}${context.pathPrefix}articles/${featured.slug}/">${esc(context.home.primaryCta)}</a>
        <a class="secondary-link" href="${secondaryHref}">${esc(context.home.secondaryCta)}</a>
      </div>
      ${
        today
          ? `<div class="today-brief" aria-label="今日节气">
        <span data-today-term>${esc(today.current.name)}</span>
        <strong data-today-poem>${esc(today.poem.excerpt)}</strong>
        <small><span data-next-term>${esc(today.next.name)}</span>还有 <span data-days-next>${esc(today.daysToNext)}</span> 天</small>
      </div>`
          : ""
      }
    </div>
    <div class="hero-strip" aria-label="${context.locale === "en" ? "Site data" : "站点数据"}">
      ${context.home.stats.map((item) => `<span><strong>${esc(item.value)}</strong>${esc(item.label)}</span>`).join("")}
    </div>
  </section>

  ${
    context.termCalendar?.length
      ? `<script type="application/json" id="seasonal-calendar-data">${safeJson(context.termCalendar)}</script>
  <script type="application/json" id="seasonal-poem-data">${safeJson(context.poems)}</script>`
      : ""
  }

  ${termWheel(context, rootRel)}

  ${poemCalendar(context, rootRel)}

  ${poemCardLab(context)}

  <section class="intro-band reveal">
    <div class="section-heading">
      <div>
        <p class="eyebrow">${esc(context.home.intro.eyebrow)}</p>
        <h2>${esc(context.home.intro.title)}</h2>
      </div>
      <p>${esc(
        context.home.intro.copy ||
          "每篇文章都保留节气、观察场景、来源说明和行动清单。我们更关心读者如何开始观察，而不是背下一个标准答案。"
      )}</p>
    </div>
    <div class="feature-grid">
      ${context.home.intro.features
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

  <section class="section reveal" id="articles">
    <div class="section-heading">
      <div>
        <p class="eyebrow">${esc(context.home.articles.eyebrow)}</p>
        <h2>${esc(context.home.articles.title)}</h2>
      </div>
      <p>${esc(
        context.home.articles.copy ||
          "首版不是铺满二十四个空页面，而是先把六个入口写厚：热、雨、光、露、夜和冬至房间。"
      )}</p>
    </div>
    <div class="article-grid">
      ${context.articles.map((article) => articleCard(article, rootRel, context)).join("")}
    </div>
  </section>

  <section class="section reveal">
    <div class="section-heading">
      <div>
        <p class="eyebrow">${esc(context.home.topics.eyebrow)}</p>
        <h2>${esc(context.home.topics.title)}</h2>
      </div>
      <p>${esc(
        context.home.topics.copy || "专题页负责把单篇节气文章连成阅读路径，让站点从文章集合变成内容网络。"
      )}</p>
    </div>
    <div class="topic-grid">
      ${context.topics.map((topic) => topicCard(topic, rootRel, context)).join("")}
    </div>
  </section>

  <section class="roadmap-band reveal">
    <p class="eyebrow">${esc(context.home.roadmap.eyebrow)}</p>
    <h2>${esc(context.home.roadmap.title)}</h2>
    <p>${esc(
      context.home.roadmap.copy ||
        "完整站点会继续补齐 24 个节气、四季核心页和城市观察专题。先把骨架做对，再稳稳加内容。"
    )}</p>
    <a class="text-link" href="${rootRel}${context.pathPrefix}content-roadmap/">${esc(context.home.roadmap.linkLabel)}</a>
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

function articlePage(article, context = zhContext) {
  const pathName = `${context.pathPrefix}articles/${article.slug}/`;
  const rootRel = relativeRoot(pathName);
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.deck,
    author: { "@type": "Organization", name: context.site.editor },
    publisher: { "@type": "Organization", name: context.site.name },
    dateModified: article.lastReviewed,
    inLanguage: context.locale,
    about: article.tags,
    isBasedOn: article.sourceUrl
  };
  const relatedTopics = context.topics.filter((topic) => topic.articleSlugs.includes(article.slug));

  const body = `
  <article class="article-page">
    <header class="article-hero">
      <a class="back-link" href="${rootRel}${context.pathPrefix}#articles">${esc(context.ui.backArticles)}</a>
      <p class="eyebrow">${esc(article.term)} · ${esc(article.category)} · ${esc(article.readingTime)}</p>
      <h1>${esc(article.title)}</h1>
      <p>${esc(article.deck)}</p>
      <div class="tag-row">${article.tags.map((tag) => `<span>${esc(tag)}</span>`).join("")}</div>
    </header>
    <div class="article-layout">
      <div>
        <div class="article-body">
          <p class="lead">${esc(article.lead)}</p>
          ${article.body.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}
        </div>
        <section class="section" aria-label="${esc(context.ui.relatedHeading)}">
          <div class="section-heading">
            <div>
              <p class="eyebrow">${esc(context.ui.relatedEyebrow)}</p>
              <h2>${esc(context.ui.relatedHeading)}</h2>
            </div>
            <p>${esc(context.ui.relatedCopy)}</p>
          </div>
          <div class="topic-grid">
            ${relatedTopics.map((topic) => topicCard(topic, rootRel, context)).join("")}
          </div>
        </section>
      </div>
      <div>
        ${sourcePanel(article, context)}
        ${observePanel(article, context)}
      </div>
    </div>
  </article>`;

  return pageShell({
    context,
    title: `${article.title} | ${context.site.name}`,
    description: article.deck,
    pathName,
    body,
    structuredData: [articleLd]
  });
}

function topicsIndexPage(context = zhContext) {
  const pathName = `${context.pathPrefix}topics/`;
  const rootRel = relativeRoot(pathName);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${context.site.name} topics`,
    itemListElement: context.topics.map((topic, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: topic.title,
      url: absoluteUrl(`${context.pathPrefix}topics/${topic.slug}/`)
    }))
  };
  const body = `
  <section class="page-hero">
    <a class="back-link" href="${rootRel}${context.pathPrefix}">${esc(context.ui.backHome)}</a>
    <p class="eyebrow">${esc(context.ui.topicsEyebrow)}</p>
    <h1>${esc(context.ui.topicsTitle)}</h1>
    <p>${esc(context.ui.topicsCopy)}</p>
  </section>
  <section class="section">
    <div class="topic-grid">
      ${context.topics.map((topic) => topicCard(topic, rootRel, context)).join("")}
    </div>
  </section>`;

  return pageShell({
    context,
    title: `${context.ui.topicsTitle} | ${context.site.name}`,
    description: context.ui.topicsCopy,
    pathName,
    body,
    structuredData: [itemList]
  });
}

function topicPage(topic, context = zhContext) {
  const pathName = `${context.pathPrefix}topics/${topic.slug}/`;
  const rootRel = relativeRoot(pathName);
  const articles = topicArticles(topic, context);
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: topic.title,
    description: topic.deck,
    url: absoluteUrl(pathName),
    inLanguage: context.locale,
    hasPart: articles.map((article) => ({
      "@type": "Article",
      headline: article.title,
      url: absoluteUrl(`${context.pathPrefix}articles/${article.slug}/`)
    }))
  };
  const body = `
  <section class="topic-hero tone-${topic.tone}">
    <a class="back-link" href="${rootRel}${context.pathPrefix}topics/">${esc(context.ui.backTopics)}</a>
    <p class="eyebrow">${esc(context.ui.topicRoute)}</p>
    <h1>${esc(topic.title)}</h1>
    <p>${esc(topic.description)}</p>
    <div class="theme-stats">
      <span>${esc(context.ui.articleCount(articles.length))}</span>
      <span>${articles.map((article) => esc(article.term)).join(" / ")}</span>
    </div>
  </section>
  <section class="topic-layout">
    <aside class="source-panel tone-${topic.tone}">
      <span class="eyebrow">${esc(context.ui.editorialRoute)}</span>
      <h2>${esc(context.ui.topicWhy)}</h2>
      <p>${esc(topic.editorialNote)}</p>
    </aside>
    <div class="article-grid">
      ${articles.map((article) => articleCard(article, rootRel, context)).join("")}
    </div>
  </section>`;

  return pageShell({
    context,
    title: `${topic.title} | ${context.site.name}`,
    description: topic.deck,
    pathName,
    body,
    structuredData: [collectionLd]
  });
}

function sourcesPage(context = zhContext) {
  const page = context.staticPageBySlug.get("sources");
  const body = `
  <section class="plain-page">
    <div class="section-heading">
      <div>
        <p class="eyebrow">${esc(context.site.shortName)}</p>
        <h1>${esc(page.title)}</h1>
      </div>
      <p>${esc(page.description)}</p>
    </div>
    <div class="plain-body">${page.body}</div>
  </section>
  <section class="source-list">
    <div class="source-grid">
      ${context.site.sources
        .map(
          (source) => `<article class="source-row">
        <div>
          <p class="eyebrow">${esc(source.kind)}</p>
          <h2>${esc(source.title)}</h2>
          <p>${esc(source.rights)}</p>
        </div>
        <div>
          <p>${esc(source.usePlan)}</p>
          <a class="text-link" href="${esc(source.url)}" rel="nofollow noopener" target="_blank">${esc(context.ui.viewSource)}</a>
        </div>
      </article>`
        )
        .join("")}
    </div>
  </section>`;

  return pageShell({
    context,
    title: `${page.title} | ${context.site.name}`,
    description: page.description,
    pathName: `${context.pathPrefix}sources/`,
    body
  });
}

function roadmapPage(context = zhContext) {
  const page = context.staticPageBySlug.get("content-roadmap");
  const body = `
  <section class="plain-page">
    <div class="section-heading">
      <div>
        <p class="eyebrow">${esc(context.site.shortName)}</p>
        <h1>${esc(page.title)}</h1>
      </div>
      <p>${esc(page.description)}</p>
    </div>
    <div class="plain-body">
      ${page.body}
      <ul>${context.expansionPlan.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
    </div>
  </section>`;

  return pageShell({
    context,
    title: `${page.title} | ${context.site.name}`,
    description: page.description,
    pathName: `${context.pathPrefix}content-roadmap/`,
    body
  });
}

function simplePage(page, context = zhContext) {
  const pathName = `${context.pathPrefix}${page.slug}/`;
  const body = `
  <section class="plain-page">
    <div class="section-heading">
      <div>
        <p class="eyebrow">${esc(context.site.shortName)}</p>
        <h1>${esc(page.title)}</h1>
      </div>
      <p>${esc(page.description)}</p>
    </div>
    <div class="plain-body">${page.body}</div>
  </section>`;

  return pageShell({
    context,
    title: `${page.title} | ${context.site.name}`,
    description: page.description,
    pathName,
    body
  });
}

function rssXml(context = zhContext) {
  const items = context.articles
    .map(
      (article) => `<item>
  <title>${esc(article.title)}</title>
  <link>${absoluteUrl(`${context.pathPrefix}articles/${article.slug}/`)}</link>
  <guid>${absoluteUrl(`${context.pathPrefix}articles/${article.slug}/`)}</guid>
  <description>${esc(article.deck)}</description>
  <pubDate>${new Date(`${article.lastReviewed}T00:00:00+08:00`).toUTCString()}</pubDate>
</item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${esc(context.site.name)}</title>
  <link>${absoluteUrl(context.pathPrefix)}</link>
  <description>${esc(context.site.description)}</description>
  <language>${esc(context.locale)}</language>
${items}
</channel>
</rss>`;
}

function pathsForContext(context) {
  return [
    context.pathPrefix,
    `${context.pathPrefix}topics/`,
    ...context.staticPages.map((page) => `${context.pathPrefix}${page.slug}/`),
    ...context.articles.map((article) => `${context.pathPrefix}articles/${article.slug}/`),
    ...context.topics.map((topic) => `${context.pathPrefix}topics/${topic.slug}/`)
  ];
}

function sitemapXml() {
  const paths = [...pathsForContext(zhContext), ...pathsForContext(enContext)];
  const unique = [...new Set(paths.map((item) => cleanPagePath(item)))];
  const urls = unique
    .map((pagePath) => {
      const context = pagePath.startsWith("en/") ? enContext : zhContext;
      const alternateXml = alternatesFor(pagePath, context)
        .map(
          (link) =>
            `  <xhtml:link rel="alternate" hreflang="${esc(link.hreflang)}" href="${esc(link.href)}" />`
        )
        .join("\n");
      return `<url>
  <loc>${absoluteUrl(pagePath)}</loc>
${alternateXml}
  <lastmod>2026-07-06</lastmod>
</url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;
}

function notFoundPage(context = zhContext) {
  const pathName = context.locale === "en" ? "en/404.html" : "404.html";
  const rootRel = relativeRoot(pathName);
  return pageShell({
    context,
    title: `${context.ui.notFoundTitle} | ${context.site.name}`,
    description: context.ui.notFoundCopy,
    pathName,
    body: `<section class="plain-page">
      <div class="section-heading">
        <div>
          <p class="eyebrow">404</p>
          <h1>${esc(context.ui.notFoundTitle)}</h1>
        </div>
        <p>${esc(context.ui.notFoundCopy)}</p>
      </div>
      <div class="plain-body">
        <p><a class="primary-link" href="${rootRel}${context.pathPrefix}">${esc(context.ui.backHome)}</a></p>
      </div>
    </section>`
  });
}

async function writePage(pathName, content) {
  const clean = cleanPagePath(pathName);
  const outputPath = clean
    ? /\.[a-z0-9]+$/i.test(clean)
      ? path.join(siteRoot, clean)
      : path.join(siteRoot, clean, "index.html")
    : path.join(siteRoot, "index.html");
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, content.replace(/[ \t]+$/gm, ""), "utf8");
}

async function writeContext(context) {
  await writePage(context.pathPrefix, homePage(context));
  await writePage(`${context.pathPrefix}topics/`, topicsIndexPage(context));
  await writePage(`${context.pathPrefix}sources/`, sourcesPage(context));
  await writePage(`${context.pathPrefix}content-roadmap/`, roadmapPage(context));

  for (const page of context.staticPages) {
    if (page.slug === "sources" || page.slug === "content-roadmap") continue;
    await writePage(`${context.pathPrefix}${page.slug}/`, simplePage(page, context));
  }

  for (const article of context.articles) {
    await writePage(`${context.pathPrefix}articles/${article.slug}/`, articlePage(article, context));
  }

  for (const topic of context.topics) {
    await writePage(`${context.pathPrefix}topics/${topic.slug}/`, topicPage(topic, context));
  }

  await writePage(`${context.pathPrefix}rss.xml`, rssXml(context));
  if (context.locale === "en") await writePage("en/404.html", notFoundPage(context));
}

async function main() {
  await rm(siteRoot, { recursive: true, force: true });
  await rm(docsRoot, { recursive: true, force: true });
  await mkdir(path.join(siteRoot, "assets"), { recursive: true });
  await cp(publicAssets, path.join(siteRoot, "assets"), { recursive: true });

  await writeContext(zhContext);
  await writeContext(enContext);
  await writePage("404.html", notFoundPage(zhContext));
  await writePage("sitemap.xml", sitemapXml());

  await mkdir(path.dirname(docsRoot), { recursive: true });
  await cp(siteRoot, docsRoot, { recursive: true });
  console.log(`Built ${seasonalSite.name} / ${seasonalEnglishSite.name} at ${siteRoot}`);
  console.log(`Synced preview to ${docsRoot}`);
}

await main();
