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
import { seasonalSite } from "../content/seasonal-observatory.mjs";

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

const storyVisuals = {
  xifangping: "story-xifangping.webp",
  "nie-xiaoqian": "story-nie-xiaoqian.webp",
  "painted-skin": "story-painted-skin.webp",
  "laoshan-daoshi": "story-laoshan-daoshi.webp",
  "wang-liulang": "story-wang-liulang.webp"
};

const generatedAssetFiles = [
  "archive-people.webp",
  "archive-beings.webp",
  "archive-underworld.webp",
  "archive-objects.webp",
  "archive-relations.webp",
  ...Object.values(storyVisuals)
];
await mkdir(path.join(siteRoot, "assets", "generated"), { recursive: true });
for (const file of generatedAssetFiles) {
  await copyFile(
    path.join(publicRoot, "assets", "generated", file),
    path.join(siteRoot, "assets", "generated", file)
  );
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

function storyImageFor(story) {
  return storyVisuals[story.slug] || null;
}

function storyImagePath(story) {
  const image = storyImageFor(story);
  return image ? `assets/generated/${image}` : null;
}

function storyImageAlt(story, context = zhContext) {
  return context.locale === "en" ? `Editorial cover image for ${story.title}` : `${story.title}的编辑封面图`;
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
      '<p>本站当前不收集账户信息，不开放评论，也不要求用户提交个人资料。服务器可能保留基础访问日志，用于安全、性能和错误排查。</p><p>如果未来接入 Google AdSense、统计或邮件订阅，将在上线前更新本页，列明数据类型、用途、第三方服务、Cookie 使用方式和退出方式。</p><p>若启用 Google AdSense，Google 及其合作伙伴可能使用 Cookie、广告标识符、IP 地址和类似技术投放、衡量或个性化广告。读者可查看 <a class="plain-link" href="https://policies.google.com/technologies/partner-sites?hl=zh-CN" rel="nofollow noopener" target="_blank">Google 合作伙伴网站数据使用说明</a>，并通过浏览器或 Google 广告设置管理相关偏好。</p>'
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
      "<p>本站当前未启用广告代码，也不展示伪装广告位。若未来接入 Google AdSense 或其他广告服务，广告会与正文内容保持清晰区分，不会伪装成导航、下载按钮或故事卡片。</p><p>广告或赞助内容不会影响故事来源说明、编辑判断和版权处理。任何付费合作都应在页面中明确标注。</p><p>AdSense 发布商 ID 获批后，才会在配置中启用广告脚本和 ads.txt；上线前不得使用虚假的发布商信息。</p>"
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
  archive: {
    navLabel: "档案库",
    openArchive: "进入档案库",
    nightMode: "夜读模式",
    saveStory: "收藏本篇",
    savedStory: "已收藏",
    saveShort: "收藏",
    routeLink: "我的夜读路线",
    homeEyebrow: "Archive console",
    homeTitle: "从故事列表，进入东方志怪资料库",
    homeDeck:
      "按人物、妖怪、地府、器物和故事关系重新组织旧书异闻，让读者可以沿线索穿行，而不是读完一篇就离开。",
    indexEyebrow: "Archive index",
    indexTitle: "东方志怪资料库",
    indexDescription:
      "这里把故事拆成可追踪的条目：人物、异类、阴司制度、器物意象和故事关系。每个条目都会回到具体故事页和公开来源。",
    relationTitle: "故事关系图",
    relationDescription: "按主题、人物、制度和意象连接当前故事，帮助读者找到下一条夜路。",
    routeTitle: "夜读收藏路线",
    routeDescription: "你收藏的故事会保存在本机浏览器中，方便下次继续从同一条路线读下去。",
    emptyRoute: "还没有收藏故事。",
    sourceTab: "原文",
    retellingTab: "白话",
    guideTab: "导读",
    tabsLabel: "故事阅读方式",
    sourcePaneTitle: "原典入口与来源核验",
    sourcePaneLead: (story) =>
      `本栏先定位原典：原题《${story.sourceTitle}》，见${story.sourceBook}。本站不在未逐篇校勘前整篇搬运原文；需要核对原典时，请以公开来源链接和后续版本说明为准。`,
    retellingPaneTitle: "现代白话重述",
    guidePaneTitle: "档案导读",
    facetCount: (count) => `${count} 个条目`,
    storyCount: (count) => `${count} 篇相关故事`,
    nodeStories: "相关故事",
    relationLabel: "关系线索",
    backToArchive: "返回档案库",
    openFacet: (title) => `进入${title}`,
    openNode: (title) => `查看${title}相关故事`
  },
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
  archive: {
    navLabel: "Archive",
    openArchive: "Open the archive",
    nightMode: "Night reading mode",
    saveStory: "Save this story",
    savedStory: "Saved",
    saveShort: "Save",
    routeLink: "My night route",
    homeEyebrow: "Archive console",
    homeTitle: "Browse the strange-tale archive as a living dossier",
    homeDeck:
      "Characters, beings, underworld offices, objects, and story relations turn the collection into a map instead of a list.",
    indexEyebrow: "Archive index",
    indexTitle: "Eastern Strange-Tale Archive",
    indexDescription:
      "A structured index for the current story set: characters, supernatural beings, underworld systems, objects, and relations, always linked back to source-aware story pages.",
    relationTitle: "Story Relationship Map",
    relationDescription: "Theme, character, institution, and image links that help readers choose the next tale.",
    routeTitle: "Saved Night Route",
    routeDescription: "Saved stories live in this browser only, so readers can return to the same route later.",
    emptyRoute: "No saved stories yet.",
    sourceTab: "Source",
    retellingTab: "Retelling",
    guideTab: "Guide",
    tabsLabel: "Story reading modes",
    sourcePaneTitle: "Source trail and original-text access",
    sourcePaneLead: (story) =>
      `This lane identifies the Chinese source: ${story.sourceTitle}, in ${story.sourceBook}. The archive does not invent or paste an uncollated full original text; readers should verify the source through the linked public-domain page and later version notes.`,
    retellingPaneTitle: "Readable editorial retelling",
    guidePaneTitle: "Archive reading guide",
    facetCount: (count) => `${count} ${count === 1 ? "entry" : "entries"}`,
    storyCount: (count) => `${count} ${count === 1 ? "related story" : "related stories"}`,
    nodeStories: "Related stories",
    relationLabel: "Relation thread",
    backToArchive: "Back to archive",
    openFacet: (title) => `Open ${title}`,
    openNode: (title) => `View stories linked to ${title}`
  },
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

const liaozhaiStorySlugs = [
  "laoshan-daoshi",
  "yingning",
  "xifangping",
  "mountain-market",
  "painted-skin",
  "nie-xiaoqian",
  "wang-liulang",
  "lu-pan",
  "seed-pear",
  "qingfeng",
  "xiangyu",
  "cuzhi",
  "luocha-haishi",
  "kao-chenghuang",
  "jiangcheng"
];

const souShenStorySlugs = ["song-dingbo", "ganjiang-moye", "hanping-fufu"];

const archiveFacetDefinitions = [
  {
    slug: "people",
    tone: "jade",
    image: "archive-people.webp",
    zhTitle: "人物索引",
    enTitle: "Character Index",
    zhDeck: "作者、主角、判官、书生、受困者和见证人，按故事关系重新归档。",
    enDeck: "Authors, protagonists, judges, scholars, trapped figures, and witnesses reorganized as archive entries."
  },
  {
    slug: "beings",
    tone: "ivory",
    image: "archive-beings.webp",
    zhTitle: "妖怪索引",
    enTitle: "Beings Index",
    zhDeck: "狐女、女鬼、水鬼、花魂、画皮妖和山中幻象，保留各自的文本位置。",
    enDeck: "Fox women, ghost women, water ghosts, flower spirits, painted-skin beings, and visionary presences."
  },
  {
    slug: "underworld",
    tone: "violet",
    image: "archive-underworld.webp",
    zhTitle: "地府案卷",
    enTitle: "Underworld Dossiers",
    zhDeck: "阴司、城隍、判官、死后考试、申诉阶梯，以及人间制度在异界的回声。",
    enDeck: "Underworld courts, city gods, judges, posthumous exams, appeal ladders, and echoes of human institutions."
  },
  {
    slug: "objects",
    tone: "amber",
    image: "archive-objects.webp",
    zhTitle: "器物谱",
    enTitle: "Object Index",
    zhDeck: "画皮、名剑、梨核、蟋蟀、花木和相思树，把故事里的物变成可追踪线索。",
    enDeck: "Skins, swords, pear seeds, crickets, flowers, and longing trees as trackable story objects."
  }
];

const archiveNodes = [
  {
    slug: "pu-songling",
    facet: "people",
    storySlugs: liaozhaiStorySlugs,
    zhTitle: "蒲松龄",
    enTitle: "Pu Songling (蒲松龄)",
    zhDeck: "《聊斋志异》的作者，也是本站第一批故事的主要来源人物。",
    enDeck: "Author of Liaozhai zhiyi and the central source figure for the archive's first wave."
  },
  {
    slug: "gan-bao",
    facet: "people",
    storySlugs: souShenStorySlugs,
    zhTitle: "干宝与魏晋志怪传统",
    enTitle: "Gan Bao and early zhiguai tradition",
    zhDeck: "《搜神记》相关故事的传统来源，用来把站点从清代聊斋扩展到更早志怪。",
    enDeck: "The traditional source frame that lets the site reach beyond Liaozhai into earlier strange-tale material."
  },
  {
    slug: "xi-fangping",
    facet: "people",
    storySlugs: ["xifangping"],
    zhTitle: "席方平",
    enTitle: "Xi Fangping",
    zhDeck: "为父申冤、一路上诉到阴司深处的人物，是阴司制度线的核心。",
    enDeck: "The son who pursues justice for his father through the underworld's broken offices."
  },
  {
    slug: "nie-xiaoqian-character",
    facet: "people",
    storySlugs: ["nie-xiaoqian"],
    zhTitle: "聂小倩",
    enTitle: "Nie Xiaoqian",
    zhDeck: "受制于妖物却主动求脱身的女鬼，是人物索引里的关键受困者。",
    enDeck: "A trapped ghost woman whose agency makes her more than a figure of danger."
  },
  {
    slug: "ning-caichen",
    facet: "people",
    storySlugs: ["nie-xiaoqian"],
    zhTitle: "宁采臣",
    enTitle: "Ning Caichen",
    zhDeck: "荒寺夜宿者，以克制和守信改变故事方向。",
    enDeck: "The traveler whose restraint and trust redirect the ruined-temple encounter."
  },
  {
    slug: "wang-liulang-character",
    facet: "people",
    storySlugs: ["wang-liulang"],
    zhTitle: "王六郎",
    enTitle: "Wang Liulang",
    zhDeck: "水边故鬼，不把自己的苦处转嫁给他人。",
    enDeck: "A river ghost whose kindness resists the expected replacement-death pattern."
  },
  {
    slug: "wang-sheng-seeker",
    facet: "people",
    storySlugs: ["laoshan-daoshi", "painted-skin"],
    zhTitle: "王生式人物",
    enTitle: "The Wang Sheng pattern",
    zhDeck: "求捷径、信表象、迟疑判断的人物类型，可连接《崂山道士》和《画皮》。",
    enDeck: "A figure type drawn toward shortcuts, surfaces, and delayed judgment."
  },
  {
    slug: "fox-women",
    facet: "beings",
    storySlugs: ["yingning", "qingfeng"],
    zhTitle: "狐女",
    enTitle: "Fox women",
    zhDeck: "狐女不是单一诱惑符号，而是家庭、礼法、选择和身份之间的复杂角色。",
    enDeck: "Fox women as complex figures of household order, desire, choice, and social recognition."
  },
  {
    slug: "ghost-women",
    facet: "beings",
    storySlugs: ["nie-xiaoqian"],
    zhTitle: "女鬼",
    enTitle: "Ghost women",
    zhDeck: "从危险入口转向求助者处境，帮助读者区分诱惑叙事和困境叙事。",
    enDeck: "A thread that separates danger imagery from the trapped person's actual choices."
  },
  {
    slug: "water-ghosts",
    facet: "beings",
    storySlugs: ["wang-liulang"],
    zhTitle: "水鬼",
    enTitle: "Water ghosts",
    zhDeck: "围绕替身、河岸、生死边界和义气展开的民间想象。",
    enDeck: "Replacement-death lore, riverbanks, boundary crossings, and unexpected loyalty."
  },
  {
    slug: "painted-skin-being",
    facet: "beings",
    storySlugs: ["painted-skin"],
    zhTitle: "画皮妖",
    enTitle: "Painted-skin being",
    zhDeck: "把欲望、伪装和识人迟疑变成可见怪物的经典形象。",
    enDeck: "A visible monster made from desire, disguise, and the delay before recognition."
  },
  {
    slug: "flower-spirits",
    facet: "beings",
    storySlugs: ["xiangyu", "hanping-fufu"],
    zhTitle: "花魂与草木有情",
    enTitle: "Flower spirits and feeling plants",
    zhDeck: "花魂、相思树和草木记忆，串联温柔志怪与悲剧传说。",
    enDeck: "Flower spirits, longing trees, and plant memory across gentle tales and tragic legend."
  },
  {
    slug: "underworld-courts",
    facet: "underworld",
    storySlugs: ["xifangping", "lu-pan", "kao-chenghuang"],
    zhTitle: "阴司官署",
    enTitle: "Underworld offices",
    zhDeck: "阴间不是抽象彼岸，而是有官署、判官、文书和失灵制度的空间。",
    enDeck: "The afterlife as offices, judges, documents, tests, and institutional failure."
  },
  {
    slug: "appeal-ladder",
    facet: "underworld",
    storySlugs: ["xifangping"],
    zhTitle: "申诉阶梯",
    enTitle: "Appeal ladder",
    zhDeck: "从人间冤屈到阴司上诉，把苦痛写成不断推进的程序。",
    enDeck: "A procedural path from earthly injustice into repeated underworld appeals."
  },
  {
    slug: "city-god-exam",
    facet: "underworld",
    storySlugs: ["kao-chenghuang"],
    zhTitle: "城隍考试",
    enTitle: "City-god examination",
    zhDeck: "死后仍需应试，显示科举压力如何被想象到另一个世界。",
    enDeck: "The civil-exam imagination carried into death and official selection beyond life."
  },
  {
    slug: "judge-lu-pan",
    facet: "underworld",
    storySlugs: ["lu-pan"],
    zhTitle: "陆判",
    enTitle: "Judge Lu Pan",
    zhDeck: "判官不仅审案，也能改写身体、资质和命运，令人不安。",
    enDeck: "A judge whose power reaches beyond verdicts into body, talent, and fate."
  },
  {
    slug: "painted-skin-object",
    facet: "objects",
    storySlugs: ["painted-skin"],
    zhTitle: "画皮",
    enTitle: "Painted skin",
    zhDeck: "被制作、披挂、修补的表面，是伪装专题的核心器物。",
    enDeck: "A made, worn, and repaired surface at the center of the disguise route."
  },
  {
    slug: "famous-swords",
    facet: "objects",
    storySlugs: ["ganjiang-moye"],
    zhTitle: "名剑",
    enTitle: "Named swords",
    zhDeck: "剑不仅是兵器，也是冤屈、承诺和复仇记忆的容器。",
    enDeck: "Swords as vessels of grievance, oath, memory, and delayed revenge."
  },
  {
    slug: "pear-seed-tree",
    facet: "objects",
    storySlugs: ["seed-pear"],
    zhTitle: "梨核与梨树",
    enTitle: "Pear seed and tree",
    zhDeck: "街市幻术把袖中小物变成当众生长的奇观。",
    enDeck: "A street-performance object that grows from tiny seed into public marvel."
  },
  {
    slug: "cricket",
    facet: "objects",
    storySlugs: ["cuzhi"],
    zhTitle: "促织",
    enTitle: "Cricket",
    zhDeck: "小虫承受制度压力，是世情讽刺线的重要器物。",
    enDeck: "A small creature burdened with institutional pressure and household terror."
  },
  {
    slug: "trees-and-flowers",
    facet: "objects",
    storySlugs: ["yingning", "xiangyu", "hanping-fufu"],
    zhTitle: "花木与相思树",
    enTitle: "Flowers and longing trees",
    zhDeck: "花、树、枝叶让情感和记忆获得可见形态。",
    enDeck: "Flowers, branches, and trees giving visible form to feeling and memory."
  }
];

const archiveRelations = [
  {
    from: "xifangping",
    to: "lu-pan",
    tone: "violet",
    zhLabel: "阴司权力",
    enLabel: "Underworld power",
    zhNote: "一篇写申诉如何受阻，一篇写判官如何改写命运。",
    enNote: "One follows blocked appeals; the other shows a judge altering fate."
  },
  {
    from: "xifangping",
    to: "kao-chenghuang",
    tone: "violet",
    zhLabel: "阴司制度",
    enLabel: "Underworld institutions",
    zhNote: "冤案、考核和官署共同说明阴间常复制人间规则。",
    enNote: "Injustice, exams, and offices show the afterlife copying human systems."
  },
  {
    from: "painted-skin",
    to: "nie-xiaoqian",
    tone: "crimson",
    zhLabel: "夜遇女子的两种读法",
    enLabel: "Two night-encounter readings",
    zhNote: "同是夜色相逢，一篇写伪装，一篇写被困者的求脱身。",
    enNote: "Both begin with nocturnal encounter; one is disguise, the other captivity and escape."
  },
  {
    from: "laoshan-daoshi",
    to: "seed-pear",
    tone: "jade",
    zhLabel: "幻术与速成",
    enLabel: "Magic and shortcuts",
    zhNote: "一篇讽刺求术者，一篇让街市日常突然失灵。",
    enNote: "One satirizes the shortcut-seeker; the other makes a marketplace briefly impossible."
  },
  {
    from: "wang-liulang",
    to: "nie-xiaoqian",
    tone: "amber",
    zhLabel: "异类的道德选择",
    enLabel: "Moral choice among the uncanny",
    zhNote: "水鬼与女鬼都不只负责吓人，而是在规则中做选择。",
    enNote: "Both figures are more than threats; each chooses within a binding rule."
  },
  {
    from: "yingning",
    to: "qingfeng",
    tone: "jade",
    zhLabel: "狐女与家宅秩序",
    enLabel: "Fox women and household order",
    zhNote: "两篇都关心异类女性如何进入、抵抗或重组家庭规则。",
    enNote: "Both ask how nonhuman women enter, resist, or reshape household rules."
  },
  {
    from: "yingning",
    to: "jiangcheng",
    tone: "amber",
    zhLabel: "家宅中的女性力量",
    enLabel: "Female force inside household order",
    zhNote: "婴宁的笑与江城的强悍都让家庭秩序暴露出需要被重新阅读的边界。",
    enNote: "Yingning's laughter and Jiangcheng's force both expose boundaries inside household order."
  },
  {
    from: "xiangyu",
    to: "hanping-fufu",
    tone: "ivory",
    zhLabel: "草木记忆",
    enLabel: "Plant memory",
    zhNote: "花魂和相思树都让情感变成可见、可保存的形态。",
    enNote: "Flower spirit and longing tree both preserve feeling as visible form."
  },
  {
    from: "cuzhi",
    to: "xifangping",
    tone: "crimson",
    zhLabel: "制度失灵",
    enLabel: "Institutional failure",
    zhNote: "一篇写压力向下传导，一篇写冤屈向上申诉。",
    enNote: "One tracks pressure downward; the other pushes grievance upward."
  },
  {
    from: "ganjiang-moye",
    to: "hanping-fufu",
    tone: "crimson",
    zhLabel: "暴力之后的记忆",
    enLabel: "Memory after violence",
    zhNote: "剑与树都是传说保存冤屈和姓名的方式。",
    enNote: "Sword and tree both preserve wronged names inside legend."
  },
  {
    from: "mountain-market",
    to: "luocha-haishi",
    tone: "teal",
    zhLabel: "海市与幻景",
    enLabel: "Mirage and visionary city",
    zhNote: "一篇写幻城出现又消散，一篇写人进入颠倒世界。",
    enNote: "One watches a phantom city appear; the other enters a reversed world."
  },
  {
    from: "lu-pan",
    to: "luocha-haishi",
    tone: "violet",
    zhLabel: "身份如何被改写",
    enLabel: "How identity is rewritten",
    zhNote: "一个通过身体与资质，一个通过评价标准改变人。",
    enNote: "One changes body and talent; the other changes the system of judgment."
  },
  {
    from: "song-dingbo",
    to: "wang-liulang",
    tone: "teal",
    zhLabel: "人与鬼的谈判",
    enLabel: "Negotiating with ghosts",
    zhNote: "一个靠机智反制，一个靠交往建立信义。",
    enNote: "One resists through wit; the other builds trust through repeated meeting."
  }
];

const archivePageSlugs = new Set(["", ...archiveFacetDefinitions.map((facet) => facet.slug), "relations", "route"]);

const zhContext = {
  locale: site.locale,
  hreflang: "zh-CN",
  pathPrefix: "",
  site: {
    ...site,
    nav: [
      { label: "档案库", href: "/midnight-archive/archive/" },
      ...site.nav
    ],
    footerDescription: "公版故事导读、来源核验和现代阅读札记。每篇文章都应有来源和编辑说明。",
    footerLinks: [
      { label: "档案库", href: "/midnight-archive/archive/" },
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
  site: {
    ...englishSite,
    nav: [
      { label: "Archive", href: "/midnight-archive/en/archive/" },
      ...englishSite.nav
    ],
    footerLinks: [
      { label: "Archive", href: "/midnight-archive/en/archive/" },
      ...englishSite.footerLinks
    ]
  },
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

function localizeField(item, context, field) {
  const prefix = context.locale === "en" ? "en" : "zh";
  const key = `${prefix}${field[0].toUpperCase()}${field.slice(1)}`;
  return item[key] ?? item[field] ?? "";
}

function localizedFacet(facet, context) {
  return {
    ...facet,
    title: localizeField(facet, context, "title"),
    deck: localizeField(facet, context, "deck")
  };
}

function localizedNode(node, context) {
  const storyObjects = node.storySlugs.map((slug) => context.storyBySlug.get(slug)).filter(Boolean);
  return {
    ...node,
    title: localizeField(node, context, "title"),
    deck: localizeField(node, context, "deck"),
    stories: storyObjects
  };
}

function localizedRelation(relation, context) {
  return {
    ...relation,
    label: localizeField(relation, context, "label"),
    note: localizeField(relation, context, "note"),
    fromStory: context.storyBySlug.get(relation.from),
    toStory: context.storyBySlug.get(relation.to)
  };
}

function archiveNodesForFacet(facetSlug, context) {
  return archiveNodes
    .filter((node) => node.facet === facetSlug)
    .map((node) => localizedNode(node, context))
    .filter((node) => node.stories.length);
}

function archiveNodesForStory(story, context) {
  return archiveNodes
    .filter((node) => node.storySlugs.includes(story.slug))
    .map((node) => localizedNode(node, context))
    .filter((node) => node.stories.length);
}

function archiveRelationsForStory(story, context) {
  return archiveRelations
    .filter((relation) => relation.from === story.slug || relation.to === story.slug)
    .map((relation) => localizedRelation(relation, context))
    .filter((relation) => relation.fromStory && relation.toStory);
}

function relatedStoriesFor(story, context, limit = 3) {
  const relationStories = archiveRelationsForStory(story, context)
    .map((relation) => (relation.from === story.slug ? relation.toStory : relation.fromStory))
    .filter(Boolean);
  const themeStories = context.themeCollections
    .filter((theme) => theme.storySlugs.includes(story.slug))
    .flatMap((theme) => theme.storySlugs)
    .filter((slug) => slug !== story.slug)
    .map((slug) => context.storyBySlug.get(slug))
    .filter(Boolean);
  const fallback = context.stories.filter((item) => item.slug !== story.slug);
  const seen = new Set();

  return [...relationStories, ...themeStories, ...fallback].filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  }).slice(0, limit);
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
  if (clean === "archive/") return "en/archive/";
  if (clean.startsWith("archive/")) {
    const slug = clean.slice("archive/".length).replace(/\/$/, "");
    return archivePageSlugs.has(slug) ? `en/${clean}` : null;
  }
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

function pageShell({ context = zhContext, title, description, body, pathName = "", structuredData = [], imagePath = null }) {
  const cleanPath = cleanPagePath(pathName);
  const canonical = absoluteUrl(cleanPath);
  const rootRel = relativeRoot(cleanPath);
  const ogType = cleanPath.includes("stories/") ? "article" : "website";
  const ogImage = absoluteUrl(imagePath || "assets/hero-midnight-archive.png");
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
    <div class="header-actions">
      <nav class="nav" aria-label="${esc(context.ui.navLabel)}">
        ${navLinks.join("")}
      </nav>
      <button class="reading-mode-toggle" type="button" aria-pressed="false" aria-label="${esc(context.ui.archive.nightMode)}" title="${esc(context.ui.archive.nightMode)}">◐</button>
    </div>
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
  const storyImage = storyImageFor(story);
  return `<article class="story-card${storyImage ? " has-visual" : ""} tone-${story.coverTone}" style="--card-index:${index}">
    <a href="${rootRel}${context.pathPrefix}stories/${story.slug}/" aria-label="${esc(context.ui.story.readLabel(story.title))}">
      <div class="card-topline">
        <span>${esc(story.category)}</span>
        <span>${esc(story.readingTime)}</span>
      </div>
      ${
        storyImage
          ? `<figure class="story-card-visual">
        <img src="${rootRel}assets/generated/${esc(storyImage)}" alt="" loading="lazy" decoding="async">
      </figure>`
          : ""
      }
      <h3>${esc(story.title)}</h3>
      <p>${esc(story.deck)}</p>
      <div class="tag-row">${story.tags.map((tag) => `<span>${esc(tag)}</span>`).join("")}</div>
    </a>
    <button class="save-story-button card-save" type="button" data-story-slug="${esc(story.slug)}" data-story-title="${esc(story.title)}" data-story-url="${esc(`${site.basePath}${context.pathPrefix}stories/${story.slug}/`)}" data-save-label="${esc(context.ui.archive.saveShort)}" data-saved-label="${esc(context.ui.archive.savedStory)}">${esc(context.ui.archive.saveShort)}</button>
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

function archiveFacetCard(facet, index, rootRel = "./", context = zhContext) {
  const item = localizedFacet(facet, context);
  const nodes = archiveNodesForFacet(facet.slug, context);
  return `<article class="archive-facet-card tone-${facet.tone}" style="--card-index:${index}">
    <a href="${rootRel}${context.pathPrefix}archive/${facet.slug}/" aria-label="${esc(context.ui.archive.openFacet(item.title))}">
      <figure class="card-visual">
        <img src="${rootRel}assets/generated/${esc(facet.image)}" alt="" loading="lazy" decoding="async">
      </figure>
      <div class="card-topline">
        <span>${esc(context.ui.archive.facetCount(nodes.length))}</span>
        <span>${esc(context.ui.archive.storyCount(new Set(nodes.flatMap((node) => node.storySlugs)).size))}</span>
      </div>
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.deck)}</p>
      <div class="theme-mini-list">
        ${nodes.slice(0, 5).map((node) => `<span>${esc(node.title)}</span>`).join("")}
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

function sourceLedger(story, context = zhContext) {
  const labels = context.ui.sourcePanel;
  const translatorRow = story.translatorNote
    ? `<div><dt>${esc(labels.translatorNote)}</dt><dd>${esc(story.translatorNote)}</dd></div>`
    : "";
  return `<dl class="source-ledger">
    <div><dt>${esc(labels.originalTitle)}</dt><dd>${esc(story.sourceTitle)}</dd></div>
    <div><dt>${esc(labels.source)}</dt><dd>${esc(story.sourceBook)}</dd></div>
    <div><dt>${esc(labels.author)}</dt><dd>${esc(story.originalAuthor)}</dd></div>
    <div><dt>${esc(labels.era)}</dt><dd>${esc(story.era)}</dd></div>
    <div><dt>${esc(labels.editorialMode)}</dt><dd>${esc(story.editorialMode)}</dd></div>
    <div><dt>${esc(labels.reviewed)}</dt><dd>${esc(story.lastReviewed)}</dd></div>
    ${translatorRow}
  </dl>`;
}

function storySaveButton(story, context = zhContext, className = "") {
  return `<button class="save-story-button ${className}" type="button" data-story-slug="${esc(story.slug)}" data-story-title="${esc(story.title)}" data-story-url="${esc(`${site.basePath}${context.pathPrefix}stories/${story.slug}/`)}" data-save-label="${esc(context.ui.archive.saveStory)}" data-saved-label="${esc(context.ui.archive.savedStory)}">${esc(context.ui.archive.saveStory)}</button>`;
}

function storyRelationGraph(story, context = zhContext, rootRel = "./") {
  const relations = archiveRelationsForStory(story, context);
  if (!relations.length) return "";

  return `<section class="relation-graph tone-${story.coverTone}" data-relation-graph>
    <div class="section-heading tight">
      <span class="eyebrow">${esc(context.ui.archive.relationLabel)}</span>
      <h3>${esc(context.ui.archive.relationTitle)}</h3>
    </div>
    <div class="relation-map">
      <a class="relation-node is-center" href="${rootRel}${context.pathPrefix}stories/${story.slug}/">${esc(story.sourceTitle)}</a>
      ${relations
        .map((relation) => {
          const other = relation.from === story.slug ? relation.toStory : relation.fromStory;
          return `<a class="relation-node tone-${relation.tone}" href="${rootRel}${context.pathPrefix}stories/${other.slug}/">
            <span>${esc(relation.label)}</span>
            <strong>${esc(other.sourceTitle)}</strong>
          </a>`;
        })
        .join("")}
    </div>
    <div class="relation-thread-list">
      ${relations
        .map((relation) => {
          const other = relation.from === story.slug ? relation.toStory : relation.fromStory;
          return `<article class="relation-thread tone-${relation.tone}">
            <span>${esc(relation.label)}</span>
            <h4><a href="${rootRel}${context.pathPrefix}stories/${other.slug}/">${esc(other.title)}</a></h4>
            <p>${esc(relation.note)}</p>
          </article>`;
        })
        .join("")}
    </div>
  </section>`;
}

function storyArchiveTabs(story, context, rootRel, deepDive, linkedThemes) {
  const tabPrefix = `story-${story.slug}`;
  const tabLabels = [
    { key: "source", label: context.ui.archive.sourceTab },
    { key: "retelling", label: context.ui.archive.retellingTab },
    { key: "guide", label: context.ui.archive.guideTab }
  ];
  const nodes = archiveNodesForStory(story, context);
  const nodeLinks = nodes.length
    ? `<div class="archive-node-chip-row">
        ${nodes
          .map(
            (node) =>
              `<a href="${rootRel}${context.pathPrefix}archive/${node.facet}/#${node.slug}" aria-label="${esc(context.ui.archive.openNode(node.title))}">${esc(node.title)}</a>`
          )
          .join("")}
      </div>`
    : "";
  const themeLinks = linkedThemes.length
    ? `<div class="archive-node-chip-row">
        ${linkedThemes
          .map((theme) => `<a href="${rootRel}${context.pathPrefix}themes/${theme.slug}/">${esc(theme.title)}</a>`)
          .join("")}
      </div>`
    : "";

  return `<section class="archive-tabs" data-archive-tabs>
    <div class="tab-list" role="tablist" aria-label="${esc(context.ui.archive.tabsLabel)}">
      ${tabLabels
        .map(
          (tab) =>
            `<button type="button" role="tab" id="${tabPrefix}-${tab.key}-tab" aria-controls="${tabPrefix}-${tab.key}-panel" aria-selected="${tab.key === "retelling" ? "true" : "false"}" data-tab-target="${tabPrefix}-${tab.key}-panel">${esc(tab.label)}</button>`
        )
        .join("")}
    </div>

    <section class="archive-tab-panel source-pane" id="${tabPrefix}-source-panel" role="tabpanel" aria-labelledby="${tabPrefix}-source-tab">
      <div class="article-body">
        <span class="eyebrow">${esc(context.ui.archive.sourceTab)}</span>
        <h2>${esc(context.ui.archive.sourcePaneTitle)}</h2>
        <p class="lead">${esc(context.ui.archive.sourcePaneLead(story))}</p>
        ${sourceLedger(story, context)}
        <p>${esc(story.sourceRights)}</p>
        <p><a class="text-link" href="${esc(story.sourceUrl)}" rel="nofollow noopener" target="_blank">${esc(context.ui.sourceOpen)}</a></p>
      </div>
    </section>

    <section class="archive-tab-panel is-active" id="${tabPrefix}-retelling-panel" role="tabpanel" aria-labelledby="${tabPrefix}-retelling-tab">
      <div class="article-body">
        <span class="eyebrow">${esc(context.ui.archive.retellingTab)}</span>
        <h2>${esc(context.ui.archive.retellingPaneTitle)}</h2>
        <p class="lead">${esc(story.summary)}</p>
        ${story.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}
      </div>
    </section>

    <section class="archive-tab-panel guide-pane" id="${tabPrefix}-guide-panel" role="tabpanel" aria-labelledby="${tabPrefix}-guide-tab">
      <div class="article-body">
        <span class="eyebrow">${esc(context.ui.archive.guideTab)}</span>
        <h2>${esc(context.ui.archive.guidePaneTitle)}</h2>
        ${
          deepDive.length
            ? `<section class="deep-dive compact-dive">
              <span class="eyebrow">${esc(context.ui.story.deepEyebrow)}</span>
              <h3>${esc(context.ui.story.deepHeading)}</h3>
              ${deepDive.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}
            </section>`
            : ""
        }
        <section class="deep-dive compact-dive">
          <span class="eyebrow">${esc(context.ui.story.notesEyebrow)}</span>
          <h3>${esc(context.ui.story.notesHeading)}</h3>
          <ul class="guide-note-list">${story.notes.map((note) => `<li>${esc(note)}</li>`).join("")}</ul>
        </section>
        ${
          nodeLinks || themeLinks
            ? `<section class="deep-dive compact-dive">
              <span class="eyebrow">${esc(context.ui.archive.indexEyebrow)}</span>
              <h3>${esc(context.ui.archive.nodeStories)}</h3>
              ${nodeLinks}
              ${themeLinks}
            </section>`
            : ""
        }
        ${storyRelationGraph(story, context, rootRel)}
      </div>
    </section>
  </section>`;
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
        <a class="secondary-link" href="${rootRel}${context.pathPrefix}archive/">${esc(context.ui.archive.openArchive)}</a>
      </div>
    </div>
    <div class="hero-strip" aria-label="${context.locale === "en" ? "Site data" : "站点数据"}">
      ${home.stats.map((item) => `<span><strong>${esc(item.value)}</strong> ${esc(item.label)}</span>`).join("")}
    </div>
  </section>

  <section class="archive-console reveal" id="archive">
    <div class="archive-console-head">
      <div class="section-heading">
        <span class="eyebrow">${esc(context.ui.archive.homeEyebrow)}</span>
        <h2>${esc(context.ui.archive.homeTitle)}</h2>
        <p>${esc(context.ui.archive.homeDeck)}</p>
      </div>
      <div class="archive-quick-actions">
        <a class="secondary-link" href="${rootRel}${context.pathPrefix}archive/relations/">${esc(context.ui.archive.relationTitle)}</a>
        <a class="secondary-link" href="${rootRel}${context.pathPrefix}archive/route/">${esc(context.ui.archive.routeLink)}</a>
      </div>
    </div>
    <div class="archive-facet-grid">
      ${archiveFacetDefinitions.map((facet, index) => archiveFacetCard(facet, index, rootRel, context)).join("")}
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
  const nodes = archiveNodesForStory(story, context);
  const storyImage = storyImageFor(story);
  const articleImagePath = storyImagePath(story);
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
  if (articleImagePath) articleLd.image = absoluteUrl(articleImagePath);

  const related = relatedStoriesFor(story, context, 3);
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
    ${
      storyImage
        ? `<figure class="story-visual-banner">
      <img src="${rootRel}assets/generated/${esc(storyImage)}" alt="${esc(storyImageAlt(story, context))}" loading="eager" decoding="async">
    </figure>`
        : ""
    }
    <div class="article-layout">
      <div>
        ${storyArchiveTabs(story, context, rootRel, deepDive, linkedThemes)}
      </div>
      <aside class="note-panel archive-sidecar">
        ${storySaveButton(story, context, "panel-save")}
        <a class="secondary-link route-link" href="${rootRel}${context.pathPrefix}archive/route/">${esc(context.ui.archive.routeLink)}</a>
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
        ${
          nodes.length
            ? `<div class="theme-links">
              <span>${esc(context.ui.archive.indexTitle)}</span>
              ${nodes
                .map((node) => `<a href="${rootRel}${context.pathPrefix}archive/${node.facet}/#${node.slug}">${esc(node.title)}</a>`)
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
    structuredData: [articleLd],
    imagePath: articleImagePath
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

function archiveIndexPage(context = zhContext) {
  const pathName = `${context.pathPrefix}archive/`;
  const rootRel = relativeRoot(pathName);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: context.ui.archive.indexTitle,
    description: context.ui.archive.indexDescription,
    url: absoluteUrl(pathName),
    inLanguage: context.locale,
    hasPart: archiveFacetDefinitions.map((facet) => ({
      "@type": "CollectionPage",
      name: localizeField(facet, context, "title"),
      url: absoluteUrl(`${context.pathPrefix}archive/${facet.slug}/`)
    }))
  };
  const body = `<section class="plain-page archive-index-page">
    <div class="archive-page-lead">
      <div class="section-heading">
        <span class="eyebrow">${esc(context.ui.archive.indexEyebrow)}</span>
        <h1>${esc(context.ui.archive.indexTitle)}</h1>
        <p>${esc(context.ui.archive.indexDescription)}</p>
      </div>
      <figure class="archive-lead-visual tone-violet">
        <img src="${rootRel}assets/generated/archive-relations.webp" alt="" loading="eager" decoding="async">
      </figure>
    </div>
    <div class="archive-facet-grid">
      ${archiveFacetDefinitions.map((facet, index) => archiveFacetCard(facet, index, rootRel, context)).join("")}
    </div>
    <div class="archive-hub-grid">
      <article class="archive-hub-card tone-violet">
        <a href="${rootRel}${context.pathPrefix}archive/relations/">
          <span class="eyebrow">${esc(context.ui.archive.relationLabel)}</span>
          <h2>${esc(context.ui.archive.relationTitle)}</h2>
          <p>${esc(context.ui.archive.relationDescription)}</p>
        </a>
      </article>
      <article class="archive-hub-card tone-amber">
        <a href="${rootRel}${context.pathPrefix}archive/route/">
          <span class="eyebrow">${esc(context.ui.archive.routeLink)}</span>
          <h2>${esc(context.ui.archive.routeTitle)}</h2>
          <p>${esc(context.ui.archive.routeDescription)}</p>
        </a>
      </article>
    </div>
  </section>`;

  return pageShell({
    context,
    title: `${context.ui.archive.indexTitle} | ${context.site.name}`,
    description: context.ui.archive.indexDescription,
    pathName,
    body,
    structuredData: [itemList]
  });
}

function archiveFacetPage(facet, context = zhContext) {
  const item = localizedFacet(facet, context);
  const pathName = `${context.pathPrefix}archive/${facet.slug}/`;
  const rootRel = relativeRoot(pathName);
  const nodes = archiveNodesForFacet(facet.slug, context);
  const body = `<section class="theme-hero archive-facet-hero tone-${facet.tone}">
    <a class="back-link" href="${rootRel}${context.pathPrefix}archive/">${esc(context.ui.archive.backToArchive)}</a>
    <div class="archive-page-lead">
      <div>
        <span class="eyebrow">${esc(context.ui.archive.indexEyebrow)}</span>
        <h1>${esc(item.title)}</h1>
        <p>${esc(item.deck)}</p>
        <div class="theme-stats">
          <span>${esc(context.ui.archive.facetCount(nodes.length))}</span>
          <span>${esc(context.ui.archive.storyCount(new Set(nodes.flatMap((node) => node.storySlugs)).size))}</span>
        </div>
      </div>
      <figure class="archive-lead-visual tone-${facet.tone}">
        <img src="${rootRel}assets/generated/${esc(facet.image)}" alt="" loading="eager" decoding="async">
      </figure>
    </div>
  </section>

  <section class="archive-node-section">
    <div class="archive-node-grid">
      ${nodes
        .map(
          (node) => `<article class="archive-node-card tone-${facet.tone}" id="${esc(node.slug)}">
            <span class="eyebrow">${esc(item.title)}</span>
            <h2>${esc(node.title)}</h2>
            <p>${esc(node.deck)}</p>
            <div class="archive-node-stories">
              <span>${esc(context.ui.archive.nodeStories)}</span>
              ${node.stories
                .map((story) => `<a href="${rootRel}${context.pathPrefix}stories/${story.slug}/">${esc(story.title)}</a>`)
                .join("")}
            </div>
          </article>`
        )
        .join("")}
    </div>
  </section>`;

  return pageShell({
    context,
    title: `${item.title} | ${context.site.name}`,
    description: item.deck,
    pathName,
    body,
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: item.title,
        description: item.deck,
        url: absoluteUrl(pathName),
        inLanguage: context.locale
      }
    ]
  });
}

function archiveRelationsPage(context = zhContext) {
  const pathName = `${context.pathPrefix}archive/relations/`;
  const rootRel = relativeRoot(pathName);
  const relations = archiveRelations
    .map((relation) => localizedRelation(relation, context))
    .filter((relation) => relation.fromStory && relation.toStory);
  const storyNodes = [...new Set(relations.flatMap((relation) => [relation.from, relation.to]))]
    .map((slug) => context.storyBySlug.get(slug))
    .filter(Boolean);
  const body = `<section class="plain-page archive-relations-page">
    <div class="archive-page-lead">
      <div class="section-heading">
        <a class="back-link" href="${rootRel}${context.pathPrefix}archive/">${esc(context.ui.archive.backToArchive)}</a>
        <span class="eyebrow">${esc(context.ui.archive.relationLabel)}</span>
        <h1>${esc(context.ui.archive.relationTitle)}</h1>
        <p>${esc(context.ui.archive.relationDescription)}</p>
      </div>
      <figure class="archive-lead-visual tone-violet">
        <img src="${rootRel}assets/generated/archive-relations.webp" alt="" loading="eager" decoding="async">
      </figure>
    </div>
    <div class="relation-constellation" aria-label="${esc(context.ui.archive.relationTitle)}">
      ${storyNodes
        .map(
          (story, index) =>
            `<a class="relation-node tone-${story.coverTone}" style="--node-index:${index}" href="${rootRel}${context.pathPrefix}stories/${story.slug}/"><span>${esc(story.category)}</span><strong>${esc(story.sourceTitle)}</strong></a>`
        )
        .join("")}
    </div>
    <div class="relation-thread-list large">
      ${relations
        .map(
          (relation) => `<article class="relation-thread tone-${relation.tone}">
            <span>${esc(relation.label)}</span>
            <h2><a href="${rootRel}${context.pathPrefix}stories/${relation.fromStory.slug}/">${esc(relation.fromStory.sourceTitle)}</a> / <a href="${rootRel}${context.pathPrefix}stories/${relation.toStory.slug}/">${esc(relation.toStory.sourceTitle)}</a></h2>
            <p>${esc(relation.note)}</p>
          </article>`
        )
        .join("")}
    </div>
  </section>`;

  return pageShell({
    context,
    title: `${context.ui.archive.relationTitle} | ${context.site.name}`,
    description: context.ui.archive.relationDescription,
    pathName,
    body
  });
}

function archiveRoutePage(context = zhContext) {
  const pathName = `${context.pathPrefix}archive/route/`;
  const rootRel = relativeRoot(pathName);
  const body = `<section class="plain-page route-page">
    <div class="archive-page-lead">
      <div class="section-heading">
        <a class="back-link" href="${rootRel}${context.pathPrefix}archive/">${esc(context.ui.archive.backToArchive)}</a>
        <span class="eyebrow">${esc(context.ui.archive.routeLink)}</span>
        <h1>${esc(context.ui.archive.routeTitle)}</h1>
        <p>${esc(context.ui.archive.routeDescription)}</p>
      </div>
      <figure class="archive-lead-visual tone-amber">
        <img src="${rootRel}assets/generated/archive-people.webp" alt="" loading="eager" decoding="async">
      </figure>
    </div>
    <div class="saved-route-shell" data-route-shell data-empty-text="${esc(context.ui.archive.emptyRoute)}">
      <div class="route-empty" data-route-empty>${esc(context.ui.archive.emptyRoute)}</div>
      <div class="route-list" data-route-list></div>
    </div>
    <div class="archive-hub-grid">
      <article class="archive-hub-card tone-jade">
        <a href="${rootRel}${context.pathPrefix}archive/people/">
          <span class="eyebrow">${esc(localizeField(archiveFacetDefinitions[0], context, "title"))}</span>
          <h2>${esc(context.ui.archive.openFacet(localizeField(archiveFacetDefinitions[0], context, "title")))}</h2>
          <p>${esc(localizeField(archiveFacetDefinitions[0], context, "deck"))}</p>
        </a>
      </article>
      <article class="archive-hub-card tone-violet">
        <a href="${rootRel}${context.pathPrefix}archive/relations/">
          <span class="eyebrow">${esc(context.ui.archive.relationLabel)}</span>
          <h2>${esc(context.ui.archive.relationTitle)}</h2>
          <p>${esc(context.ui.archive.relationDescription)}</p>
        </a>
      </article>
    </div>
  </section>`;

  return pageShell({
    context,
    title: `${context.ui.archive.routeTitle} | ${context.site.name}`,
    description: context.ui.archive.routeDescription,
    pathName,
    body
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
  const archiveUrls = [
    "archive/",
    ...archiveFacetDefinitions.map((facet) => `archive/${facet.slug}/`),
    "archive/relations/",
    "archive/route/"
  ];
  const zhUrls = [
    "",
    ...archiveUrls,
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
    ...archiveUrls.map((url) => `en/${url}`),
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
    "# AdSense is not enabled for this static site.",
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
  await writePage(path.join(context.pathPrefix, "archive"), archiveIndexPage(context));
  for (const facet of archiveFacetDefinitions) {
    await writePage(path.join(context.pathPrefix, "archive", facet.slug), archiveFacetPage(facet, context));
  }
  await writePage(path.join(context.pathPrefix, "archive", "relations"), archiveRelationsPage(context));
  await writePage(path.join(context.pathPrefix, "archive", "route"), archiveRoutePage(context));
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
  [
    "User-agent: *",
    "Allow: /",
    `Sitemap: ${site.canonicalOrigin}${site.basePath}sitemap.xml`,
    `Sitemap: ${seasonalSite.canonicalOrigin}${seasonalSite.basePath}sitemap.xml`,
    ""
  ].join("\n"),
  "utf8"
);
await writeFile(path.join(siteRoot, "ads.txt"), adsTxt(), "utf8");
await writeFile(path.join(siteRoot, "404.html"), notFoundPage(), "utf8");
await writeFile(path.join(siteRoot, ".nojekyll"), "", "utf8");

console.log(`Built ${site.name} at ${siteRoot}`);
