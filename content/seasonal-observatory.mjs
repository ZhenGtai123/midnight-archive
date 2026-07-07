const unescoSolarTermsUrl =
  "https://ich.unesco.org/en/RL/the-twenty-four-solar-terms-knowledge-in-china-of-time-and-practices-developed-through-observation-of-the-sun-s-annual-motion-00647";

const hkoSolarTermsUrl = "https://www.hko.gov.hk/en/gts/time/24solarterms.htm";

const originalNote =
  "本站页面为节气观察室原创整理、观察建议与现代生活导读；基础知识参考公开机构资料，正文不复制来源页面。";

export const seasonalSite = {
  slug: "seasonal-observatory",
  name: "节气观察室",
  shortName: "节气室",
  tagline: "把二十四节气写回城市日常",
  description:
    "面向城市生活的节气诗历：用今日节气、古诗意象、诗卡生成和物候观察，重新理解一年如何经过身体和房间。",
  locale: "zh-CN",
  basePath: "/midnight-archive/seasonal-observatory/",
  canonicalOrigin: "https://zhengtai123.github.io",
  editor: "节气观察室编辑部",
  heroImage: "assets/hero-seasonal-observatory.png",
  logoImage: "assets/logo-seasonal-observatory.svg",
  adsense: {
    enabled: false,
    publisherId: "",
    notes: "获得真实 AdSense 发布商 ID 前不要启用广告脚本，也不要放置伪广告位。"
  },
  nav: [
    { label: "今日", href: "#today" },
    { label: "节气", href: "solar-terms/" },
    { label: "诗历", href: "#poem-calendar" },
    { label: "诗卡", href: "#poem-card-lab" },
    { label: "观察", href: "#articles" },
    { label: "专题", href: "topics/" },
    { label: "来源", href: "sources/" }
  ],
  footerDescription:
    "原创节气观察笔记、城市物候导读和来源卡片。适合长期扩展为二十四节气主题内容站。",
  footerLinks: [
    { label: "关于", href: "about/" },
    { label: "作者与编辑", href: "authors/" },
    { label: "联系", href: "contact/" },
    { label: "隐私", href: "privacy/" },
    { label: "广告说明", href: "advertising-policy/" },
    { label: "条款", href: "terms/" }
  ],
  sources: [
    {
      title: "UNESCO：二十四节气非遗条目",
      kind: "国际机构资料",
      url: unescoSolarTermsUrl,
      usePlan:
        "用于确认二十四节气作为知识体系和实践传统的公开说明，不直接复制条目正文。",
      rights: "UNESCO 官方公开页面；本站仅作链接引用与事实核验。"
    },
    {
      title: "香港天文台：二十四节气",
      kind: "公共气象资料",
      url: hkoSolarTermsUrl,
      usePlan:
        "用于核对节气按太阳视黄经划分、节气日期每年略有差异等基础历法知识。",
      rights: "香港天文台公开资料；本站以来源链接方式引用。"
    },
    {
      title: "编辑部实地观察与居家记录",
      kind: "原创资料",
      url: "https://zhengtai123.github.io/midnight-archive/seasonal-observatory/editorial-policy/",
      usePlan:
        "用于形成城市观察清单、阳台记录、食物与体感笔记、页面导读和专题路径。",
      rights: "节气观察室原创内容，后续可加入读者授权投稿和可核验访谈。"
    }
  ]
};

export const seasonalHome = {
  heroEyebrow: "Solar terms field notes",
  heroTitle: "节气诗历",
  primaryCta: "读今日观察",
  secondaryCta: "生成诗卡",
  stats: [
    { value: "24", label: "个节气页面" },
    { value: "10", label: "首诗词索引" },
    { value: "6", label: "篇首批长文" },
    { value: "1", label: "个诗卡工具" }
  ],
  intro: {
    eyebrow: "Observation method",
    title: "不把节气写成表格，而是写成可以每天看见的变化",
    features: [
      {
        index: "01",
        title: "城市物候",
        body: "从行道树、晚风、雨水和阳台植物开始，记录节气在城市里的细微出现。"
      },
      {
        index: "02",
        title: "生活切面",
        body: "食物、睡眠、通勤和室内光线都能成为观察入口，让传统知识落回日常。"
      },
      {
        index: "03",
        title: "来源透明",
        body: "每页说明参考来源和编辑方式，避免把公开资料改写成没有出处的百科拼贴。"
      }
    ]
  },
  articles: {
    eyebrow: "Seasonal notes",
    title: "第一批节气观察"
  },
  topics: {
    eyebrow: "Reading routes",
    title: "用专题把一年串起来"
  },
  roadmap: {
    eyebrow: "Next growth",
    title: "下一步扩成完整的二十四节气地图",
    linkLabel: "查看扩展路线"
  }
};

export const seasonalTermCalendar = [
  {
    slug: "xiaohan",
    name: "小寒",
    englishName: "Minor Cold",
    date: "2026-01-05",
    season: "winter",
    seasonLabel: "冬",
    color: "#6a8cb6",
    focus: "冷风、冰霜、室内保温",
    observe: "清晨看窗玻璃和阳台栏杆是否有冷凝水。",
    poemIds: ["jiangxue"]
  },
  {
    slug: "dahan",
    name: "大寒",
    englishName: "Major Cold",
    date: "2026-01-20",
    season: "winter",
    seasonLabel: "冬",
    color: "#526b95",
    focus: "极寒、围炉、年末光线",
    observe: "记录一天里第一次开灯和第一次想喝热饮的时间。",
    poemIds: ["jiangxue"]
  },
  {
    slug: "lichun",
    name: "立春",
    englishName: "Beginning of Spring",
    date: "2026-02-04",
    season: "spring",
    seasonLabel: "春",
    color: "#5fa56f",
    focus: "风向、柳色、早春光",
    observe: "找一处固定枝条，连续一周记录芽点变化。",
    poemIds: ["lichun-oucheng", "qiantanghu"]
  },
  {
    slug: "yushui",
    name: "雨水",
    englishName: "Rain Water",
    date: "2026-02-19",
    season: "spring",
    seasonLabel: "春",
    color: "#5b9fb6",
    focus: "春雨、湿土、返潮",
    observe: "雨后闻一闻树池、草地和楼道入口的气味差异。",
    poemIds: ["chunyeyuxi"]
  },
  {
    slug: "jingzhe",
    name: "惊蛰",
    englishName: "Awakening of Insects",
    date: "2026-03-05",
    season: "spring",
    seasonLabel: "春",
    color: "#6fbf7a",
    focus: "雷声、虫鸣、草木醒来",
    observe: "夜间听小区草丛和水边是否出现新的细碎声音。",
    poemIds: ["chunyeyuxi", "qiantanghu"]
  },
  {
    slug: "chunfen",
    name: "春分",
    englishName: "Spring Equinox",
    date: "2026-03-20",
    season: "spring",
    seasonLabel: "春",
    color: "#7ebf62",
    focus: "昼夜、燕子、平衡光线",
    observe: "上午和下午各拍一次同一面墙上的光斑。",
    poemIds: ["qiantanghu"]
  },
  {
    slug: "qingming",
    name: "清明",
    englishName: "Clear and Bright",
    date: "2026-04-05",
    season: "spring",
    seasonLabel: "春",
    color: "#77a86f",
    focus: "雨、行路、柳色",
    observe: "雨天观察街边行人的伞、鞋和步速变化。",
    poemIds: ["qingming"]
  },
  {
    slug: "guyu",
    name: "谷雨",
    englishName: "Grain Rain",
    date: "2026-04-20",
    season: "spring",
    seasonLabel: "春",
    color: "#4f9d69",
    focus: "雨生百谷、叶片舒展",
    observe: "记录一场雨后阳台植物新叶舒展的速度。",
    poemIds: ["chunyeyuxi"]
  },
  {
    slug: "lixia",
    name: "立夏",
    englishName: "Beginning of Summer",
    date: "2026-05-05",
    season: "summer",
    seasonLabel: "夏",
    color: "#d9a33f",
    focus: "初夏、蝉前、长日",
    observe: "傍晚记录窗边光线持续到几点。",
    poemIds: ["xiaochi"]
  },
  {
    slug: "xiaoman",
    name: "小满",
    englishName: "Grain Buds",
    date: "2026-05-21",
    season: "summer",
    seasonLabel: "夏",
    color: "#cda64f",
    focus: "未满、麦气、池水",
    observe: "看公园水面、小池和草地边缘是否变得丰盈。",
    poemIds: ["xiaochi"]
  },
  {
    slug: "mangzhong",
    name: "芒种",
    englishName: "Grain in Ear",
    date: "2026-06-05",
    season: "summer",
    seasonLabel: "夏",
    color: "#9cae50",
    focus: "雨线、湿度、谷物",
    observe: "雨前、雨中、雨后各看一次排水口的水流。",
    articleSlug: "mangzhong-rain-and-grain",
    poemIds: ["chunyeyuxi"]
  },
  {
    slug: "xiazhi",
    name: "夏至",
    englishName: "Summer Solstice",
    date: "2026-06-21",
    season: "summer",
    seasonLabel: "夏",
    color: "#e3a53f",
    focus: "最长白昼、树荫、午后热",
    observe: "中午拍同一棵树的影子，比较它和立秋后的差异。",
    poemIds: ["xiaochi", "xiari-nanting"]
  },
  {
    slug: "xiaoshu",
    name: "小暑",
    englishName: "Minor Heat",
    date: "2026-07-07",
    season: "summer",
    seasonLabel: "夏",
    color: "#e08a3e",
    focus: "热感、积云、柏油路",
    observe: "傍晚摸一摸窗台、地砖和阳台栏杆的余热。",
    articleSlug: "xiaoshu-city-heat",
    poemIds: ["xiari-nanting"]
  },
  {
    slug: "dashu",
    name: "大暑",
    englishName: "Major Heat",
    date: "2026-07-23",
    season: "summer",
    seasonLabel: "夏",
    color: "#d56f52",
    focus: "盛暑、雷雨、夜间余热",
    observe: "夜里十点记录墙面和地面的热量是否仍未散。",
    poemIds: ["xiari-nanting"]
  },
  {
    slug: "liqiu",
    name: "立秋",
    englishName: "Beginning of Autumn",
    date: "2026-08-07",
    season: "autumn",
    seasonLabel: "秋",
    color: "#c3894f",
    focus: "暑热未退、光线转向",
    observe: "连续一周记录傍晚同一时间的墙面光斑位置。",
    articleSlug: "liqiu-first-coolness",
    poemIds: ["shanjuqiuming"]
  },
  {
    slug: "chushu",
    name: "处暑",
    englishName: "End of Heat",
    date: "2026-08-23",
    season: "autumn",
    seasonLabel: "秋",
    color: "#b98c56",
    focus: "退热、云影、夜风",
    observe: "夜间开窗五分钟，记录风里是否少了闷滞。",
    poemIds: ["shanjuqiuming"]
  },
  {
    slug: "bailu",
    name: "白露",
    englishName: "White Dew",
    date: "2026-09-07",
    season: "autumn",
    seasonLabel: "秋",
    color: "#8ea7a0",
    focus: "露水、清晨、阳台",
    observe: "清晨比较金属、玻璃和叶片上的水汽。",
    articleSlug: "bailu-balcony-dew",
    poemIds: ["yueye-yishe"]
  },
  {
    slug: "qiufen",
    name: "秋分",
    englishName: "Autumn Equinox",
    date: "2026-09-23",
    season: "autumn",
    seasonLabel: "秋",
    color: "#a78b5c",
    focus: "昼夜平分、月色、清朗",
    observe: "黄昏拍一次天空，记录云边是否更清楚。",
    poemIds: ["shanjuqiuming", "yueye-yishe"]
  },
  {
    slug: "hanlu",
    name: "寒露",
    englishName: "Cold Dew",
    date: "2026-10-08",
    season: "autumn",
    seasonLabel: "秋",
    color: "#6b7f91",
    focus: "夜路、冷风、衣领",
    observe: "同一路线夜行三次，记录路灯下的叶色和风感。",
    articleSlug: "hanlu-night-walk",
    poemIds: ["yueye-yishe"]
  },
  {
    slug: "shuangjiang",
    name: "霜降",
    englishName: "Frost's Descent",
    date: "2026-10-23",
    season: "autumn",
    seasonLabel: "秋",
    color: "#6f7b73",
    focus: "初霜、叶落、晚秋",
    observe: "清晨看低矮草叶、车顶和栏杆是否出现白霜。",
    poemIds: ["shanjuqiuming"]
  },
  {
    slug: "lidong",
    name: "立冬",
    englishName: "Beginning of Winter",
    date: "2026-11-07",
    season: "winter",
    seasonLabel: "冬",
    color: "#5e748e",
    focus: "入冬、灯光、热食",
    observe: "记录一天里第一次想关窗和第一次想开灯的时间。",
    poemIds: ["handan-dongzhi"]
  },
  {
    slug: "xiaoxue",
    name: "小雪",
    englishName: "Minor Snow",
    date: "2026-11-22",
    season: "winter",
    seasonLabel: "冬",
    color: "#7188a6",
    focus: "寒云、干冷、初雪意象",
    observe: "看天空云层是否从潮湿厚云转为干冷灰白。",
    poemIds: ["jiangxue"]
  },
  {
    slug: "daxue",
    name: "大雪",
    englishName: "Major Snow",
    date: "2026-12-07",
    season: "winter",
    seasonLabel: "冬",
    color: "#7b94b5",
    focus: "雪意、静默、冬季空间",
    observe: "清晨听街道声音是否被冷空气压低。",
    poemIds: ["jiangxue"]
  },
  {
    slug: "dongzhi",
    name: "冬至",
    englishName: "Winter Solstice",
    date: "2026-12-22",
    season: "winter",
    seasonLabel: "冬",
    color: "#4567a5",
    focus: "最短白昼、房间光线、团聚",
    observe: "上午、中午、傍晚各拍一次同一张书桌的光。",
    articleSlug: "dongzhi-room-light",
    poemIds: ["handan-dongzhi"]
  }
];

export const seasonalPoems = [
  {
    id: "lichun-oucheng",
    title: "立春偶成",
    author: "张栻",
    dynasty: "宋",
    sourceTitle: "《南轩集》相关诗作",
    sourceUrl: "https://zh.wikisource.org/wiki/立春偶成",
    termSlugs: ["lichun"],
    imagery: ["东风", "草木", "春回"],
    excerpt: "律回岁晚冰霜少，春到人间草木知。",
    lines: ["律回岁晚冰霜少，春到人间草木知。", "便觉眼前生意满，东风吹水绿参差。"],
    note: "这首诗适合做立春首页诗句，因为它把“春到”写成草木先知道的变化。"
  },
  {
    id: "chunyeyuxi",
    title: "春夜喜雨",
    author: "杜甫",
    dynasty: "唐",
    sourceTitle: "《全唐诗》",
    sourceUrl: "https://zh.wikisource.org/wiki/春夜喜雨",
    termSlugs: ["yushui", "jingzhe", "guyu", "mangzhong"],
    imagery: ["春雨", "夜雨", "润物"],
    excerpt: "好雨知时节，当春乃发生。",
    lines: ["好雨知时节，当春乃发生。", "随风潜入夜，润物细无声。", "野径云俱黑，江船火独明。", "晓看红湿处，花重锦官城。"],
    note: "它不是写某一个节气，却能解释雨水、谷雨和芒种页面里的“雨怎样进入生活”。"
  },
  {
    id: "qiantanghu",
    title: "钱塘湖春行",
    author: "白居易",
    dynasty: "唐",
    sourceTitle: "《白氏长庆集》",
    sourceUrl: "https://zh.wikisource.org/wiki/錢塘湖春行",
    termSlugs: ["lichun", "jingzhe", "chunfen"],
    imagery: ["早莺", "新燕", "浅草"],
    excerpt: "几处早莺争暖树，谁家新燕啄春泥。",
    lines: ["孤山寺北贾亭西，水面初平云脚低。", "几处早莺争暖树，谁家新燕啄春泥。", "乱花渐欲迷人眼，浅草才能没马蹄。", "最爱湖东行不足，绿杨阴里白沙堤。"],
    note: "这首诗适合做早春物候索引：鸟、泥、浅草、湖面，都是可观察对象。"
  },
  {
    id: "qingming",
    title: "清明",
    author: "杜牧",
    dynasty: "唐",
    sourceTitle: "《全唐诗》",
    sourceUrl: "https://zh.wikisource.org/wiki/清明_(杜牧)",
    termSlugs: ["qingming"],
    imagery: ["雨", "行路", "杏花"],
    excerpt: "清明时节雨纷纷，路上行人欲断魂。",
    lines: ["清明时节雨纷纷，路上行人欲断魂。", "借问酒家何处有，牧童遥指杏花村。"],
    note: "它把节气、天气、行路和情绪压在同一场雨里，是节气诗卡最容易传播的句子。"
  },
  {
    id: "xiaochi",
    title: "小池",
    author: "杨万里",
    dynasty: "宋",
    sourceTitle: "《诚斋集》",
    sourceUrl: "https://zh.wikisource.org/wiki/小池",
    termSlugs: ["lixia", "xiaoman", "xiazhi"],
    imagery: ["泉眼", "树阴", "小荷"],
    excerpt: "小荷才露尖尖角，早有蜻蜓立上头。",
    lines: ["泉眼无声惜细流，树阴照水爱晴柔。", "小荷才露尖尖角，早有蜻蜓立上头。"],
    note: "这首诗适合小满和夏至，因为它写的不是盛大夏天，而是刚刚露头的丰盈。"
  },
  {
    id: "xiari-nanting",
    title: "夏日南亭怀辛大",
    author: "孟浩然",
    dynasty: "唐",
    sourceTitle: "《全唐诗》",
    sourceUrl: "https://zh.wikisource.org/wiki/夏日南亭懷辛大",
    termSlugs: ["xiazhi", "xiaoshu", "dashu"],
    imagery: ["夕阳", "池月", "晚凉"],
    excerpt: "散发乘夕凉，开轩卧闲敞。",
    lines: ["山光忽西落，池月渐东上。", "散发乘夕凉，开轩卧闲敞。", "荷风送香气，竹露滴清响。", "欲取鸣琴弹，恨无知音赏。"],
    note: "它适合小暑和大暑，因为诗里有热退之后的晚凉，也有夏夜里最具体的声音。"
  },
  {
    id: "shanjuqiuming",
    title: "山居秋暝",
    author: "王维",
    dynasty: "唐",
    sourceTitle: "《王右丞集》",
    sourceUrl: "https://zh.wikisource.org/wiki/山居秋暝",
    termSlugs: ["liqiu", "chushu", "qiufen", "shuangjiang"],
    imagery: ["秋雨", "明月", "清泉"],
    excerpt: "空山新雨后，天气晚来秋。",
    lines: ["空山新雨后，天气晚来秋。", "明月松间照，清泉石上流。", "竹喧归浣女，莲动下渔舟。", "随意春芳歇，王孙自可留。"],
    note: "这首诗给秋季页面一个安静骨架：雨后、月光、泉声、人的归来。"
  },
  {
    id: "yueye-yishe",
    title: "月夜忆舍弟",
    author: "杜甫",
    dynasty: "唐",
    sourceTitle: "《全唐诗》",
    sourceUrl: "https://zh.wikisource.org/wiki/月夜憶舍弟",
    termSlugs: ["bailu", "qiufen", "hanlu"],
    imagery: ["露", "月", "秋夜"],
    excerpt: "露从今夜白，月是故乡明。",
    lines: ["戍鼓断人行，边秋一雁声。", "露从今夜白，月是故乡明。", "有弟皆分散，无家问死生。", "寄书长不达，况乃未休兵。"],
    note: "白露不只是露水的物理现象，也有夜色、月光和思念带来的情绪层。"
  },
  {
    id: "jiangxue",
    title: "江雪",
    author: "柳宗元",
    dynasty: "唐",
    sourceTitle: "《全唐诗》",
    sourceUrl: "https://zh.wikisource.org/wiki/江雪",
    termSlugs: ["xiaohan", "dahan", "xiaoxue", "daxue"],
    imagery: ["雪", "江", "孤舟"],
    excerpt: "孤舟蓑笠翁，独钓寒江雪。",
    lines: ["千山鸟飞绝，万径人踪灭。", "孤舟蓑笠翁，独钓寒江雪。"],
    note: "它适合冬季诗卡，因为画面极简，留白强，适合做冷色视觉。"
  },
  {
    id: "handan-dongzhi",
    title: "邯郸冬至夜思家",
    author: "白居易",
    dynasty: "唐",
    sourceTitle: "《白氏长庆集》",
    sourceUrl: "https://zh.wikisource.org/wiki/邯鄲冬至夜思家",
    termSlugs: ["lidong", "dongzhi"],
    imagery: ["冬至", "灯前", "思家"],
    excerpt: "邯郸驿里逢冬至，抱膝灯前影伴身。",
    lines: ["邯郸驿里逢冬至，抱膝灯前影伴身。", "想得家中夜深坐，还应说着远行人。"],
    note: "冬至最有力量的并不只是天文，而是短白昼里人对灯、家和团聚的感受。"
  }
];

export const seasonalArticles = [
  {
    slug: "xiaoshu-city-heat",
    title: "小暑城市热感：一条街如何先知道盛夏到了",
    deck:
      "小暑不只是日历上的热字。真正可观察的变化，藏在柏油路的回温、树荫的形状、空调外机的声浪和傍晚云层里。",
    term: "小暑",
    category: "城市物候",
    readingTime: "8 min",
    tone: "sun",
    lastReviewed: "2026-07-06",
    sourceTitle: "二十四节气公开资料 + 编辑部原创城市观察",
    sourceUrl: hkoSolarTermsUrl,
    sourceRights: originalNote,
    tags: ["小暑", "城市热岛", "物候观察"],
    lead:
      "小暑通常是一年里热感开始变得有重量的时段。它提醒我们，季节不只发生在郊野，也发生在楼下便利店门口、地铁口热浪和傍晚忽然堆起来的云里。",
    body: [
      "观察小暑，第一件事不是查一个最高温数字，而是把身体放回街道。清晨出门时，路面还残留前一天的热；中午树荫变得短而硬，等红灯的人自然挤到建筑阴影里；傍晚风不再完全降温，只是把潮气从路口推到另一个路口。这些感受比温度计更早提醒人：城市的夏天已经进入主场。",
      "节气原本来自长期观察太阳周年运动与农事节律，但现代城市里，我们需要把观察对象重新排列。水泥、玻璃、车流、空调外机、楼体阴影，都是新的季节仪器。它们不属于传统物候名录，却真实改变人的体感。小暑页面要记录的，正是传统名称和现代环境之间的接口。",
      "如果想做一份小暑笔记，可以连续三天记录同一条街：早上七点树荫落在哪里，午后两点地面是否烫脚，傍晚七点有没有积云，夜里十点窗边是否仍有热风。不要追求科学论文式的精密，先追求可重复。节气观察的价值，在于让你对生活环境形成稳定注意力。",
      "记录时可以把“热”拆成几种不同感受：太阳直接晒到皮肤的刺痛，阴影里仍然不散的闷，地铁口上涌的湿热，夜里墙面和地砖慢慢释放的余温。这样写出来的小暑不是一个抽象标签，而是一组可以比较的城市现象。后续如果有多位读者在不同城市提交同样格式的记录，站点就能慢慢形成横向比较。",
      "小暑还适合观察人的行为。午休时间便利店冷柜前停留的人变多，外卖骑手选择桥下或树下短暂停车，公交站候车队伍会自动向阴影移动。节气内容如果只写自然，就会漏掉城市里最重要的物候之一：人如何被气候重新安排路线、速度和姿势。",
      "小暑也适合观察植物的耐热差异。行道树的叶片如果边缘卷曲，可能说明水分压力变大；阳台薄叶植物比厚叶植物更早垂下；公园草坪在雨后会短暂恢复亮度。把这些变化和当日湿度、降雨、风向写在一起，页面就不只是节气介绍，而是一份城市生态小档案。",
      "本站不把小暑写成养生口号。更实用的提醒是：热感不是单一温度，而是温度、湿度、辐射、风和地面材料一起作用。选择阴影路线、补水、避开午后暴晒、给阳台植物做遮阴，都是把节气知识转成行动的方法。传统节气的现代意义，正在这些细小选择里重新成立。"
    ],
    observe: [
      "连续三天拍同一棵树的中午树影，记录影子长度和行人停留位置。",
      "在早晚各摸一次窗台、地砖或阳台栏杆，记录热量滞留感。",
      "观察傍晚云层是否从低矮碎云变成高耸积云，并写下是否有雷阵雨。"
    ]
  },
  {
    slug: "mangzhong-rain-and-grain",
    title: "芒种雨线：谷物、梅雨和城市排水口的同一段时间",
    deck:
      "芒种常被写成农事节气，但在城市里，它也能通过雨线、湿气、霉味和水边植物被重新观察。",
    term: "芒种",
    category: "雨与植物",
    readingTime: "7 min",
    tone: "rain",
    lastReviewed: "2026-07-06",
    sourceTitle: "二十四节气公开资料 + 编辑部原创雨季观察",
    sourceUrl: unescoSolarTermsUrl,
    sourceRights: originalNote,
    tags: ["芒种", "雨季", "植物"],
    lead:
      "芒种的名字里有谷物的锋芒，也有潮湿季节的背景声。城市读者不一定站在田边，却可以从雨水、霉斑、河道水位和植物疯长里读到这个节气。",
    body: [
      "很多人理解芒种，会从麦收、稻作和农事忙碌开始。这当然重要，但如果一个城市内容站只重复这几句，就会变成平面百科。真正值得写的是：当农事节律远离日常生活时，芒种还如何被城市居民感知？答案常常在雨里。",
      "芒种前后，空气里的水分变得黏。衣物不容易干，厨房调料罐结块，旧书边缘开始卷起，地铁站台的冷气和外部湿气相遇，玻璃门上出现一层雾。它们不是传统物候，却是现代生活最可触摸的季节证据。把这些现象认真写下来，芒种就从农历名词变回可观察经验。",
      "雨季也改变城市植物的速度。围墙边的藤蔓突然越界，草地里的杂草几天内升高一截，河道边的芦苇和水生植物变得浓密。此时观察植物，不必急着辨认全部物种，可以先记录生长位置：排水沟边、树池边缘、桥下潮湿阴影、长期无人修剪的角落。位置本身已经说明水分如何塑造城市。",
      "芒种的另一个入口是声音。雨打在遮雨棚上，车轮碾过积水，楼道里拖鞋带进来的水声，空调除湿时持续的低频声，都会把这个时段变得密集。把声音写进页面，可以避免节气文章只剩视觉描述，也能让读者意识到季节正在通过多种感官同时发生。",
      "食物保存也能成为芒种观察。饼干变软、茶叶罐需要密封、米面要留意潮气，厨房从一个烹饪空间变成湿度管理空间。这类内容不需要夸大成危险提醒，只要提供具体、克制的记录方式：哪一天开始结块，开窗后是否改善，除湿设备工作多久。这些细节比泛泛的“注意防潮”更能留住读者。",
      "芒种页面适合加入一个小实验：选择一处固定排水口，记录一场雨前、雨中、雨后三个时段的水流、落叶、泥沙和气味变化。这样的观察不宏大，却能把节气和城市基础设施连接起来。节气不是只属于田野，也属于每一次暴雨之后的路面。",
      "从内容建设角度看，芒种可以承担整站的雨季入口。它能链接到梅雨、防潮、阳台植物、城市河道和食物保存等多个栏目。一个好的节气站不应把 24 个节气做成 24 个孤岛，而要让读者在一个节气里自然走向相关主题。"
    ],
    observe: [
      "记录家里最容易返潮的位置，并写下出现时间、气味和通风方式。",
      "雨后观察同一路段的积水消退速度，拍摄排水口附近的落叶堆积。",
      "给一盆阳台植物做一周生长记录，比较雨天和晴天的叶片状态。"
    ]
  },
  {
    slug: "liqiu-first-coolness",
    title: "立秋不等于凉：城市里第一缕秋意在哪里出现",
    deck:
      "立秋常常仍然炎热。它更像一个观察开关：提醒我们从白昼长度、夜风、植物边缘和市场食材里寻找转向。",
    term: "立秋",
    category: "光线与转折",
    readingTime: "8 min",
    tone: "leaf",
    lastReviewed: "2026-07-06",
    sourceTitle: "二十四节气公开资料 + 编辑部原创光线观察",
    sourceUrl: hkoSolarTermsUrl,
    sourceRights: originalNote,
    tags: ["立秋", "光线", "秋感"],
    lead:
      "立秋最容易被误解，因为它到来时天气往往仍热。要读懂它，需要把注意力从温度转向转折：光线的角度、夜风的边缘、叶片的细微疲态。",
    body: [
      "立秋不是天气预报里的降温按钮。很多年份里，立秋之后仍有很长一段炎热日子。如果页面只写“秋天来了”，读者会立刻觉得虚。更准确的写法，是承认立秋的复杂性：它在日历上标记季节转向，但体感上的秋意需要更细的观察才能出现。",
      "第一个值得记录的变化是光。傍晚同一时间，窗边光斑的位置会慢慢偏移；楼与楼之间的阴影变长；太阳落下后，天色从金黄到蓝灰的过渡更明显。城市读者不一定能看见完整地平线，却能从窗帘、书桌和墙面影子上读到白昼的变化。",
      "第二个变化是夜。立秋前后的白天仍可能很热，但夜风的质地会偶尔变轻。它不一定凉，却少了一点闷滞。适合在晚上九点到十点之间开窗记录：风从哪个方向来，是否带来草木或尘土气味，皮肤感到的是热、湿、干，还是短暂松动。这样的语言，比一句“天气转凉”更可信。",
      "植物也会给出边缘信号。不是所有叶子都会立刻变黄，但一些行道树下会出现零星落叶；阳台植物的生长速度可能放慢；夏季花草的盛势开始疲惫。立秋观察不追求戏剧性，正是这些“不明显”构成了季节的真实进程。",
      "立秋还适合观察市场。水果摊的主角开始变化，冷饮柜仍然热闹，但热汤、熟食和烘焙香气重新变得有吸引力。季节并不只在自然界转向，也在人的购买选择里转向。把市场货架、晚餐菜单和身体偏好放进同一篇文章，可以让立秋从抽象节令变成生活节律。",
      "写作时要保留“仍然很热”的事实。立秋文章如果急着制造秋天氛围，反而会失真。更好的结构是先承认暑热未退，再写那些微弱转向：影子变长、夜风偶尔松动、植物开始疲惫。真实的矛盾感，正是这个节气的内容价值。",
      "如果要持续做内容，可以为立秋建立一个“转折记录表”：光线、夜风、落叶、市场、睡眠、穿衣各占一栏。读者不需要每天写长文，只要每栏留下一个短句。这样的模板未来可以做成可下载表格或互动页面，但首要原则仍然是内容真实，而不是为了功能感硬加工具。",
      "从站点内容看，立秋适合承担“转折专题”的核心页。它可以连接到处暑、白露、秋分，也可以连接市场食材、室内收纳、通勤穿衣和睡眠节律。一个好的节气页，应当让读者意识到：季节不是突然切换，而是在很多细节里同时松动。"
    ],
    observe: [
      "连续一周记录傍晚六点半书桌或墙面光斑的位置。",
      "夜间开窗五分钟，写下风向、湿度感和声音变化。",
      "在同一条路上收集三种落叶照片，标注树种或大致位置。"
    ]
  },
  {
    slug: "bailu-balcony-dew",
    title: "白露阳台笔记：露水、盆土和夜间降温的细小证据",
    deck:
      "白露不是一句诗意口号。它可以从清晨栏杆的水汽、盆土表面的湿润和窗边温差里被看见。",
    term: "白露",
    category: "居家观察",
    readingTime: "7 min",
    tone: "mist",
    lastReviewed: "2026-07-06",
    sourceTitle: "二十四节气公开资料 + 编辑部原创阳台观察",
    sourceUrl: hkoSolarTermsUrl,
    sourceRights: originalNote,
    tags: ["白露", "阳台", "露水"],
    lead:
      "白露把宏大的季节转折缩小到一滴水。对于住在城市楼房里的人来说，阳台、窗台和清晨栏杆就是最方便的观察点。",
    body: [
      "白露这个节气容易被写得很美，也容易被写空。露水当然有诗意，但内容站需要让读者知道如何亲眼确认它。最简单的方式，是选择一个清晨观察点：阳台栏杆、车顶、树叶背面、空调外机上沿或靠近草地的长椅。看见水汽凝结，才算让节气从词语回到物理世界。",
      "露水出现与夜间降温、空气湿度和物体表面温度有关。本站不是气象教材，不必把公式写满页面，但可以提醒读者：同一个早晨，金属栏杆、植物叶片、木质桌面和玻璃窗上的水汽程度可能不同。不同材料的反应，就是一堂小型季节课。",
      "阳台植物也适合白露观察。盆土表面早晨是否更久保持湿润？叶片背面是否有水珠？需要浇水的时间是否从每天变成隔天？这些问题能把节气和日常照料连接起来。写节气不必总是远眺山河，也可以低头看一盆薄荷或一株迷迭香。",
      "白露的页面还可以教读者区分“看到水”和“理解水”。一滴水可能来自露、来自前夜小雨、来自空调排水，也可能只是清洁后残留。记录时最好写下前一晚是否降雨、观察位置是否靠近空调外机、表面材料是什么。这样的核验意识会让内容站显得更专业，也能避免把任何水珠都浪漫化成露水。",
      "如果没有看见露水，也不是观察失败。白露页面应允许空记录：风太大、楼层太高、空气太干、清晨起得太晚，都可能让露水不可见。把“没有出现”的条件写下来，反而能让读者理解露水需要怎样的环境，而不是把节气当成必然发生的景观。",
      "居住楼层也会影响观察。低楼层靠近草木，清晨水汽更明显；高楼层风大，栏杆可能更快变干；朝北阳台和朝南阳台的温差不同。鼓励读者写明楼层、朝向和时间，能够让一篇节气文章逐渐积累出可比较的城市生活资料。",
      "白露还提醒人调整室内节律。夜里开窗时间可以变短，薄被可能重新出现，早晨热饮比冰饮更自然。这里不需要写成夸张的养生建议，只需观察身体如何对温差做出选择。节气内容最有价值的地方，是帮助人辨认自己和环境之间的细小协商。",
      "如果未来扩展本站，白露可以成为“居家观察”专题的入口。它能链接露水、窗边温差、阳台植物、收纳换季和早晚衣物。每个链接都可以发展成独立文章，形成真正的内容网络。"
    ],
    observe: [
      "清晨拍摄三种不同材质表面的水汽，比较凝结多少。",
      "记录一盆植物在白露前后一周的浇水间隔变化。",
      "写下早晚开窗后的室内气味和皮肤体感。"
    ]
  },
  {
    slug: "hanlu-night-walk",
    title: "寒露夜行：晚风、月色和衣领之间的节气",
    deck:
      "寒露的冷不猛烈，却很清楚。它常常先出现在夜路上：手背、衣领、路灯下的叶片和回家时的一口气。",
    term: "寒露",
    category: "夜间观察",
    readingTime: "8 min",
    tone: "night",
    lastReviewed: "2026-07-06",
    sourceTitle: "二十四节气公开资料 + 编辑部原创夜间观察",
    sourceUrl: unescoSolarTermsUrl,
    sourceRights: originalNote,
    tags: ["寒露", "夜行", "秋夜"],
    lead:
      "寒露适合在夜里读。它不以骤冷取胜，而是把秋天的清意推到皮肤表面，让人第一次认真拉起衣领。",
    body: [
      "寒露和白露都写露，但气质不同。白露偏向清晨的水汽，寒露则带着夜间的冷意。城市里最容易感知寒露的地方，不是天气软件，而是下班后的路：走出办公楼，热闹灯光还在，风却已经让手背感到空。",
      "夜行观察可以很简单。选择一条固定路线，记录路灯下树叶的颜色、地面落叶的声音、骑车时耳边的风、便利店门口热气和室外冷意的差异。寒露不是抽象的“冷”，而是热源与冷空气之间的边界变得清楚。",
      "这个节气也适合观察月光和天空透明度。秋夜空气如果变干，远处楼体轮廓会更清晰，天空颜色更深，云的边缘更利落。即使城市光污染很强，仍能从云量、风和可见度里读出变化。节气观察不要求浪漫条件，只要求重复看见。",
      "寒露的记录可以加入衣物。不是为了给出穿搭建议，而是观察身体什么时候开始主动寻找领口、袖口和围巾。早晚温差让衣服从装饰重新变成气候工具。把衣物变化写进节气页，会让读者意识到传统时间体系其实一直和身体选择有关。",
      "还可以记录热源。便利店蒸柜、路边小吃摊、地铁站暖风、家门口第一盏亮起的灯，都让寒露的冷有了对照物。没有对照，冷只是一个形容词；有了对照，读者会看见夜间城市如何用光、气味和热量回应季节。",
      "最适合寒露的记录方式是复访同一路线。第一次只写冷不冷，第二次开始注意风从哪里来，第三次会看见哪盏路灯下落叶最多。重复让细节浮出来，也让节气文章具有连续阅读价值。",
      "夜间观察也要注意安全和边界。本站鼓励选择熟悉、照明良好、可重复的路线，不建议为了寻找所谓氛围去偏僻区域。一个可信的内容站应该把可执行性放在浪漫之前：能安全重复的观察，才有长期记录价值。",
      "寒露的生活建议也应保持克制。可以提醒读者留意夜间温差、骑行防风、晾晒时间、室内加湿和饮水习惯，但不把它写成万能养生清单。AdSense 友好的内容不需要夸张承诺，更需要可信、具体、可操作。",
      "从栏目结构上，寒露能把“夜间观察”撑起来。它可以连接霜降、立冬、冬至，也可以连接城市照明、夜跑、通勤和室内湿度。这样的文章比单篇百科更有留存价值，因为读者可以把自己的夜路经验放进页面里。"
    ],
    observe: [
      "同一路线夜行三次，记录风感、路灯下叶色和体感温差。",
      "比较便利店、地铁口、河边和小区门口四个位置的冷感差异。",
      "拍一张晚间天空照片，标注云量、可见度和风向。"
    ]
  },
  {
    slug: "dongzhi-room-light",
    title: "冬至房间光线：一年最短白昼怎样进入书桌",
    deck:
      "冬至可以从天文学开始，也可以从书桌上的光线开始。白昼变短不是概念，而是窗边生活节律的重新安排。",
    term: "冬至",
    category: "历法与居家",
    readingTime: "9 min",
    tone: "winter",
    lastReviewed: "2026-07-06",
    sourceTitle: "二十四节气公开资料 + 编辑部原创室内光线观察",
    sourceUrl: hkoSolarTermsUrl,
    sourceRights: originalNote,
    tags: ["冬至", "白昼", "室内光线"],
    lead:
      "冬至是最容易被天文知识解释的节气之一，但它也可以很私人：下午四点半变暗的房间、提前亮起的台灯和窗边植物的沉默。",
    body: [
      "冬至对应一年中白昼很短、太阳高度较低的时段。这样的知识并不难查，难的是把它写成读者能立即感知的页面。对于城市生活来说，冬至最直接的入口是室内光线：同一张书桌，下午的阴影来得更早，窗边亮度下降更快，室内灯具成为日常节律的一部分。",
      "观察冬至，可以从一天的三个时间点开始。上午九点看阳光是否能照进房间，中午十二点记录光线落点，下午四点半观察是否需要开灯。连续记录几天，就能看见太阳角度和房间结构如何一起决定你的冬季生活。",
      "冬至也适合观察植物。窗边植物可能生长放缓，叶片朝光方向更明显，浇水频率下降。与其写“冬季养护大全”，不如让页面引导读者先观察：盆土干得慢了吗？新叶少了吗？光线是否被楼体遮挡？这些问题比泛泛建议更有帮助。",
      "房间朝向会让冬至经验差异很大。南向房间可能获得短暂但珍贵的低角度阳光，北向房间则更依赖反射光和灯具。记录朝向、楼间距和遮挡物，可以让读者明白：同一个节气在不同房间里并不相同。节气内容如果能容纳差异，就会比统一口号更真实。",
      "冬至页面也可以建立一个光线档案：同一面墙在十二月、三月、六月、九月各拍一张。这样的跨季节记录能把单篇文章变成长期项目。读者第一次访问时读到冬至，几个月后还可以回来补春分或夏至的照片，站点因此拥有复访理由。",
      "冬至还适合把情绪写得具体。白昼短会改变人的工作节奏和晚间安排，但页面不必进行心理诊断。更好的写法是记录行为：什么时候想开灯，什么时候想喝热饮，什么时候开始把晚饭提前。把情绪落到可观察行动上，内容既温和，也更可靠。",
      "食物和家庭仪式当然是冬至的重要部分，但本站会避免把它写成单一食俗页面。饺子、汤圆、热汤都可以出现，更重要的是解释为什么人在短白昼里需要稳定感：热食、灯光、固定晚餐和家人联系，都是对冬季节律的回应。",
      "从内容扩展看，冬至是整站的结构节点。它连接天文、房间、食物、植物和情绪，也能导向小寒、大寒、立春。把冬至写厚，站点就不只是节气列表，而是有能力解释一年如何转身。"
    ],
    observe: [
      "在上午、中午、傍晚三个时间点拍摄同一张书桌的光线。",
      "记录一周内每天第一次开灯的时间。",
      "观察窗边植物的朝光方向、盆土干燥速度和新叶变化。"
    ]
  }
];

export const seasonalTopics = [
  {
    slug: "city-phenology",
    title: "城市物候",
    deck: "把街道、河道、阳台和楼间风写进节气。",
    tone: "leaf",
    articleSlugs: ["xiaoshu-city-heat", "mangzhong-rain-and-grain", "liqiu-first-coolness"],
    description:
      "城市物候不是田野物候的替代品，而是现代生活的真实观察场。它关注树影、热岛、排水口、地面材料和植物边缘变化。",
    editorialNote:
      "这个专题适合继续扩展到行道树、城市河道、雨后路面、夜间热感和社区花园。每篇都应包含可执行观察清单。"
  },
  {
    slug: "home-season",
    title: "居家节气",
    deck: "从窗台、书桌、厨房和衣柜看见季节。",
    tone: "mist",
    articleSlugs: ["bailu-balcony-dew", "dongzhi-room-light", "liqiu-first-coolness"],
    description:
      "居家节气把宏大的季节变化缩小到房间尺度。光线、湿度、霉味、植物和晚餐，都能成为观察入口。",
    editorialNote:
      "后续可以加入照片模板、家庭记录表和授权读者投稿，但必须保留编辑筛选和来源说明。"
  },
  {
    slug: "rain-and-humidity",
    title: "雨水与湿度",
    deck: "用可重复的记录理解雨季、返潮和植物疯长。",
    tone: "rain",
    articleSlugs: ["mangzhong-rain-and-grain", "bailu-balcony-dew", "xiaoshu-city-heat"],
    description:
      "这个专题把雨水从天气预报里拿出来，放到衣物、排水口、植物、霉味和居住体验里观察。",
    editorialNote:
      "适合发展为防潮、阳台植物、梅雨观察、暴雨后城市基础设施等系列文章。"
  },
  {
    slug: "light-and-calendar",
    title: "光线与历法",
    deck: "从太阳角度、白昼长度和房间影子理解节气。",
    tone: "winter",
    articleSlugs: ["dongzhi-room-light", "liqiu-first-coolness", "hanlu-night-walk"],
    description:
      "光线与历法专题解释节气为什么不是单纯民俗，而与太阳周年运动、昼夜变化和居住空间有关。",
    editorialNote:
      "后续可以为春分、夏至、秋分、冬至建立四个核心页面，再向其他节气延展。"
  }
];

export const seasonalStaticPages = [
  {
    slug: "about",
    title: "关于节气观察室",
    description: "节气观察室的定位、内容边界和长期目标。",
    body:
      "<p>节气观察室是一个面向城市生活的二十四节气观察站。我们关心传统节气如何在现代房间、街道、阳台、市场和通勤路线上继续被感知。</p><p>本站不做未经核验的养生承诺，也不复制百科条目。每篇文章都以原创观察、可执行记录方法和公开来源说明为基础。</p>"
  },
  {
    slug: "authors",
    title: "作者与编辑",
    description: "节气观察室的编辑责任、署名方式和投稿处理说明。",
    body:
      "<p>节气观察室当前由本站编辑部负责选题、写作、资料核验和页面维护。文章中的城市观察、居家记录方法和导读文字均为本站原创整理，公开机构资料仅作为事实核验和来源链接。</p><p>未来如加入读者投稿、摄影或访谈内容，页面会标注贡献者、授权方式、编辑处理范围和最近复核日期。没有授权或来源不清的素材不会进入正式页面。</p>"
  },
  {
    slug: "contact",
    title: "联系",
    description: "联系节气观察室编辑部。",
    body:
      '<p>如需提供授权观察照片、指出来源问题或建议新主题，可以通过 GitHub 仓库提交 Issue：<a class="plain-link" href="https://github.com/ZhenGtai123/midnight-archive/issues" rel="nofollow noopener" target="_blank">midnight-archive issues</a>。</p><p>投稿需说明拍摄地点、时间、授权方式和是否允许编辑改写。正式域名和编辑邮箱确认后，本页会更新长期联系方式。</p>'
  },
  {
    slug: "privacy",
    title: "隐私政策",
    description: "节气观察室的隐私政策。",
    body:
      '<p>本站当前不开放账户系统，不收集读者个人资料，也不使用评论区。服务器或托管平台可能保留基础访问日志，用于安全、性能和错误排查。</p><p>如果未来接入 Google AdSense、统计服务或邮件订阅，本页会在上线前列明数据类型、Cookie 使用方式、第三方服务和退出方式。</p><p>若启用 Google AdSense，Google 及其合作伙伴可能使用 Cookie、广告标识符、IP 地址和类似技术投放、衡量或个性化广告。读者可查看 <a class="plain-link" href="https://policies.google.com/technologies/partner-sites?hl=zh-CN" rel="nofollow noopener" target="_blank">Google 合作伙伴网站数据使用说明</a>，并通过浏览器或 Google 广告设置管理相关偏好。</p>'
  },
  {
    slug: "terms",
    title: "使用条款",
    description: "节气观察室的使用条款和版权说明。",
    body:
      "<p>本站原创文章、观察清单、页面设计和整理方式归节气观察室编辑部所有，除非页面另有说明。公开机构资料仅作为来源链接和事实核验，不构成转载。</p><p>引用本站内容时，请保留页面标题、链接和来源说明。若发现内容错误，请联系编辑部修正。</p>"
  },
  {
    slug: "advertising-policy",
    title: "广告与赞助说明",
    description: "节气观察室的广告、赞助和商业合作披露原则。",
    body:
      "<p>本站当前未启用广告代码，也不展示伪装广告位。未来如接入 Google AdSense，广告会与正文保持清晰区分，不会伪装成观察清单、下载按钮或专题卡片。</p><p>任何赞助或商业合作都不应影响来源说明、编辑判断和内容更新。涉及健康、饮食或安全的页面不会使用夸张承诺换取点击。</p>"
  },
  {
    slug: "editorial-policy",
    title: "编辑原则",
    description: "节气观察室的内容选择、来源核验和更新原则。",
    body:
      "<p>每篇文章必须明确节气对象、观察场景、资料来源、编辑方式和最近复核日期。基础历法知识优先参考公开机构资料，生活观察部分由编辑部原创整理。</p><p>本站避免无来源的民俗断言、未经验证的健康建议和拼贴式百科改写。读者投稿必须获得授权，并在页面中说明处理方式。</p><p>如果页面内容过短、来源不清或只有泛泛口号，会退回补写，不进入正式扩量队列。</p>"
  },
  {
    slug: "sources",
    title: "来源库",
    description: "节气观察室使用的公开来源、原创记录和授权计划。",
    body:
      "<p class=\"lead\">这里记录本站目前可复用的资料来源和原创记录方式。节气文章应把来源说明放在页面可见位置，而不是藏在仓库里。</p>"
  },
  {
    slug: "content-roadmap",
    title: "内容扩展路线",
    description: "节气观察室的栏目规划和内容厚度标准。",
    body:
      "<p class=\"lead\">当前版本已经生成 24 个节气资料页，并保留 6 篇可读长文作为样板。申请 AdSense 前，建议把这些资料页逐步扩写成更厚的独立长文，并增加 8-12 篇专题文章，形成稳定内链网络。</p><p>优先路线：四季核心节气页、城市物候专题、居家节气专题、雨水与湿度专题、光线与历法专题。每篇正式文章应包含原创观察、来源卡片、行动清单和继续阅读入口。</p>"
  }
];

export const seasonalExpansionPlan = [
  "把 24 个节气资料页逐步扩写为独立长文，每篇至少 1200-1800 中文字。",
  "为春分、夏至、秋分、冬至建立四个核心历法解释页。",
  "增加城市观察表、阳台植物记录模板和授权读者照片栏目。",
  "建立单独域名后，独立提交 sitemap，并避免与故事站混用品牌定位。"
];

export const seasonalEnglishSite = {
  ...seasonalSite,
  name: "Seasonal Observatory",
  shortName: "Seasonal Lab",
  tagline: "Reading the solar terms in city life",
  description:
    "An English edition of Seasonal Observatory: edited guides to China's twenty-four solar terms, urban phenology, indoor light, humidity, food, and small repeatable observations.",
  locale: "en",
  pathPrefix: "en/",
  editor: "Seasonal Observatory editors",
  nav: [
    { label: "Notes", href: "en/#articles" },
    { label: "Topics", href: "en/topics/" },
    { label: "Sources", href: "en/sources/" },
    { label: "Roadmap", href: "en/content-roadmap/" },
    { label: "Editorial", href: "en/editorial-policy/" }
  ],
  footerDescription:
    "Original seasonal field notes, source cards, and city-scale observation guides for a long-term solar-terms site.",
  footerLinks: [
    { label: "About", href: "en/about/" },
    { label: "Editors", href: "en/authors/" },
    { label: "Contact", href: "en/contact/" },
    { label: "Privacy", href: "en/privacy/" },
    { label: "Advertising", href: "en/advertising-policy/" },
    { label: "Terms", href: "en/terms/" },
    { label: "Sitemap", href: "sitemap.xml" }
  ],
  sources: [
    {
      title: "UNESCO: The Twenty-Four Solar Terms",
      kind: "International public reference",
      url: unescoSolarTermsUrl,
      usePlan:
        "Used for checking the public description of the solar terms as a knowledge system and living practice. This site links to the page rather than copying its text.",
      rights: "Public UNESCO reference page; used here as a citation and fact-checking source."
    },
    {
      title: "Hong Kong Observatory: The 24 Solar Terms",
      kind: "Public meteorological reference",
      url: hkoSolarTermsUrl,
      usePlan:
        "Used to verify the basic calendar principle that the solar terms are tied to the sun's annual motion and vary slightly by year.",
      rights: "Public Hong Kong Observatory page; quoted only through source links and short factual attribution."
    },
    {
      title: "Editorial city and home observations",
      kind: "Original editorial material",
      url: "https://zhengtai123.github.io/midnight-archive/seasonal-observatory/en/editorial-policy/",
      usePlan:
        "Used for the city walks, balcony notes, indoor-light prompts, food and humidity observations, and page commentary.",
      rights:
        "Original Seasonal Observatory editorial writing. Future reader submissions must be permissioned and labeled."
    }
  ]
};

export const seasonalEnglishHome = {
  heroEyebrow: "Solar terms field notes",
  primaryCta: "Read the current note",
  secondaryCta: "Open topics",
  stats: [
    { value: "24", label: "solar terms to map" },
    { value: "6", label: "edited starter essays" },
    { value: "0", label: "copied encyclopedia pages" }
  ],
  intro: {
    eyebrow: "Observation method",
    title: "The solar terms are not just dates. They are ways of noticing a year as it enters a room.",
    copy:
      "Each page keeps the reference sources visible, then turns the term into a repeatable observation: street shade, rain smell, window light, balcony soil, night wind, or the hour when a desk lamp becomes necessary.",
    features: [
      {
        index: "01",
        title: "Urban phenology",
        body: "Read the season through streets, drainage grates, river edges, balcony plants, shopfronts, and evening wind."
      },
      {
        index: "02",
        title: "Home-scale weather",
        body: "Humidity, food storage, window light, bedding, and indoor plants make the calendar practical without turning it into slogans."
      },
      {
        index: "03",
        title: "Transparent sourcing",
        body: "Public references are linked, editorial observations are labeled, and each article explains how it should be expanded."
      }
    ]
  },
  articles: {
    eyebrow: "Seasonal notes",
    title: "Six starting points for observing the year",
    copy:
      "The English edition begins with six carefully edited guides rather than a full set of shallow entries: heat, rain, first autumn, dew, cold nights, and winter-solstice light."
  },
  topics: {
    eyebrow: "Reading routes",
    title: "Topic paths across the calendar",
    copy:
      "Topics connect individual terms into durable reading routes, so the site can grow as a network instead of a list."
  },
  roadmap: {
    eyebrow: "Next growth",
    title: "Build the full solar-term map slowly and with sources",
    copy:
      "The next milestone is a complete set of twenty-four substantial pages, plus evergreen topic essays that link the calendar to city life.",
    linkLabel: "View the roadmap"
  }
};

export const seasonalEnglishArticles = [
  {
    slug: "xiaoshu-city-heat",
    title: "Minor Heat in the City: How One Street Learns Summer First",
    deck:
      "Xiaoshu, Minor Heat, is more than a date on a calendar. In a city it appears in warm pavement, shortened shade, loud air-conditioners, and clouds gathering after dusk.",
    term: "Xiaoshu / Minor Heat",
    category: "Urban phenology",
    readingTime: "8 min",
    tone: "sun",
    lastReviewed: "2026-07-06",
    sourceTitle: "Public solar-term references plus original city observation",
    sourceUrl: hkoSolarTermsUrl,
    sourceRights:
      "This English guide is an original editorial adaptation. Public references are linked for calendar facts; the city observations and reading notes are written for this site.",
    editorialMode: "Edited English guide and city observation note",
    editorNote:
      "This is not a translation of a public-domain English text. It is Seasonal Observatory's own English introduction to the Chinese solar term Xiaoshu.",
    tags: ["Minor Heat", "urban heat", "summer"],
    lead:
      "Minor Heat often arrives before people have the language for it. The forecast may still sound ordinary, but the street has already changed: the morning pavement keeps yesterday's warmth, the bus stop crowd presses toward shade, and evening wind no longer quite cools the skin.",
    body: [
      "The best way to read Xiaoshu is not to begin with an abstract temperature number. Begin with a route you know well. Walk it in the morning, at noon, and again near dusk. Notice where the shade falls, which walls hold heat, whether the subway entrance breathes warm damp air, and whether the same corner feels heavier at night than it did a week earlier.",
      "The solar terms grew from long attention to the sun's annual motion and seasonal work. Modern cities ask us to update the instruments. Asphalt, glass, traffic, concrete, window units, and building shadows now shape the season as strongly as fields and riverbanks do for many readers. They are not traditional phenological markers, but they are truthful ones.",
      "A useful Minor Heat notebook separates heat into different sensations. There is the sting of direct sun, the stale warmth that remains under shade, the humid lift from a subway stair, and the slow release of heat from stone after dark. Naming these differences keeps the article from becoming a vague complaint about summer.",
      "Human behavior is part of the season too. Convenience-store freezers attract longer pauses, delivery riders rest under bridges, and waiting lines drift toward a building's shadow without anyone announcing the move. City phenology includes people because people are constantly being rearranged by climate.",
      "Plants add another layer. Thin balcony leaves may droop before thick leaves do; grass turns dull until rain briefly brightens it; street trees show heat stress at their margins. A reader does not need to identify every species at first. Repeating the same observation in the same place is already a serious beginning.",
      "This page avoids turning Minor Heat into a loose health slogan. The practical lesson is narrower and more useful: heat is a compound of temperature, humidity, radiation, wind, and material surfaces. Choosing shaded routes, watering balcony plants at better hours, and noticing nighttime heat retention are small ways to make the term visible."
    ],
    observe: [
      "Photograph the shadow of the same tree at noon for three days and mark where people stand.",
      "Touch a windowsill, tile floor, or balcony rail in the morning and evening to compare retained heat.",
      "Watch whether evening clouds stay low and broken or build into taller storm clouds."
    ]
  },
  {
    slug: "mangzhong-rain-and-grain",
    title: "Grain in Ear and the Rain Line: Crops, Damp Rooms, and City Drains",
    deck:
      "Mangzhong is often introduced through farming, but city readers can find it in rain lines, mildew smells, swollen greenery, and the slow work of drainage after a storm.",
    term: "Mangzhong / Grain in Ear",
    category: "Rain and plants",
    readingTime: "7 min",
    tone: "rain",
    lastReviewed: "2026-07-06",
    sourceTitle: "UNESCO solar-term reference plus original rain-season observation",
    sourceUrl: unescoSolarTermsUrl,
    sourceRights:
      "This English guide is original editorial writing. UNESCO is linked as a public reference for the solar-term tradition; the domestic and city observations are written for this site.",
    editorialMode: "Edited English guide and rain-season observation note",
    editorNote:
      "The Chinese term Mangzhong is kept in pinyin on first mention because the agricultural image in the name is part of the concept.",
    tags: ["Grain in Ear", "rain season", "humidity"],
    lead:
      "Mangzhong carries the edge of grain in its name, but many modern readers meet it first through dampness. Clothes dry slowly, spices clump, old books curl at the edge, and rainwater teaches the city where its low places are.",
    body: [
      "It would be easy to write Grain in Ear as a short agricultural definition and stop there. That would miss the living question: when daily life is far from the field, where does this term still touch the body? In many southern cities, the answer is rain.",
      "Humidity changes rooms before it changes language. A kitchen cabinet begins to smell closed-in. A glass door fogs where cold indoor air meets wet outdoor air. Laundry that once dried overnight remains heavy in the morning. These are small facts, but they let the solar term move from a calendar label into the reader's own apartment.",
      "The city outside is also growing too quickly to ignore. Vines cross a wall, weeds jump above curb height, and riverbank plants thicken after several wet days. Rather than naming every species, record the position: drainage channel, tree pit, bridge shadow, neglected corner, riverside path. Position often explains what water is doing.",
      "Sound belongs in the notebook. Rain on awnings, tires cutting through shallow water, slippers carrying water into a hallway, and the low hum of dehumidifiers all make Mangzhong audible. Seasonal writing becomes more convincing when it uses more than sight.",
      "Food storage is another honest entry point. Biscuits soften, tea needs a tighter lid, and rice or flour must be watched with more care. The advice does not need to become alarmist. A precise record is better: when did clumping begin, where is the dampest shelf, and did ventilation actually help?",
      "For a field exercise, choose one drain or curbside inlet. Observe it before rain, during rain, and after rain. Note leaves, water speed, smell, grit, and how quickly the road clears. The solar term then links old agricultural timing to present-day infrastructure, which is exactly where a city calendar should grow."
    ],
    observe: [
      "Record the dampest place at home and note time, smell, surface, and ventilation method.",
      "After rain, watch how quickly water leaves the same curb or drain.",
      "Follow one balcony plant for a week and compare leaf condition on rainy and dry days."
    ]
  },
  {
    slug: "liqiu-first-coolness",
    title: "Beginning of Autumn Is Not Cool: Where the First Turn Appears",
    deck:
      "Liqiu often arrives while the weather is still hot. Its value is not instant coolness but a change in attention: light, night wind, leaf edges, and market shelves begin to shift.",
    term: "Liqiu / Beginning of Autumn",
    category: "Light and transition",
    readingTime: "8 min",
    tone: "leaf",
    lastReviewed: "2026-07-06",
    sourceTitle: "Hong Kong Observatory reference plus original light observation",
    sourceUrl: hkoSolarTermsUrl,
    sourceRights:
      "This page is original English editorial writing with linked public references for calendar facts.",
    editorialMode: "Edited English guide and seasonal transition note",
    editorNote:
      "The page keeps Liqiu in pinyin because the Chinese term is often mistranslated if treated as a promise of immediate autumn weather.",
    tags: ["Beginning of Autumn", "light", "transition"],
    lead:
      "Beginning of Autumn is one of the easiest solar terms to misunderstand. It may arrive in heat, sweat, and bright glare. Its truth is quieter: the year has turned, but the body needs evidence before it believes the turn.",
    body: [
      "A reliable Liqiu page should begin by admitting that it can still be hot. Without that admission, the writing becomes decorative. The term marks a seasonal pivot in the calendar, not a guarantee that the air has suddenly become gentle.",
      "The first evidence is often light. At the same hour in the evening, a patch of sun moves to a different part of the wall. Shadows between buildings lengthen. The sky after sunset passes from gold to blue-gray with a little more drama. Even without a wide horizon, a room can show the sun's changing angle.",
      "Night is the second clue. The day may remain heavy, but a late breeze sometimes loses a little of its trapped heat. Open a window for five minutes between nine and ten. Write down direction, smell, skin feeling, and whether the air is hot, wet, dry, or briefly loose.",
      "Plants signal the turn without staging a spectacle. A few leaves gather under street trees, balcony growth slows, and summer flowers begin to look tired at the edges. Liqiu is not about theatrical color. It is about small fatigue appearing inside abundance.",
      "Markets also change the calendar. Fruit displays shift, cold drinks still sell, but warm food and baked smells become attractive again. A season turns not only in nature but in what people choose to buy, cook, and crave.",
      "The article should keep contradiction visible. Heat may remain, air-conditioners may still run, and yet the angle of light has already moved. That tension is the whole value of Liqiu for modern readers: it teaches that a seasonal turn can begin before comfort changes.",
      "A good observation template for Liqiu has several columns: light, night wind, leaves, market, sleep, clothing. One short sentence in each column is enough. Over time the page can become a record of transition rather than a claim that autumn has already arrived."
    ],
    observe: [
      "Photograph the same wall or desk at 6:30 p.m. for a week and compare the light patch.",
      "Open a window at night and record wind direction, humidity, smell, and skin feeling.",
      "Notice three early fallen leaves on the same route and write where they appeared."
    ]
  },
  {
    slug: "bailu-balcony-dew",
    title: "White Dew on the Balcony: Tiny Evidence of Night Cooling",
    deck:
      "Bailu can be read in a drop of water, but only if we keep the observation precise: surface, hour, material, weather, and whether the water is truly dew.",
    term: "Bailu / White Dew",
    category: "Home observation",
    readingTime: "7 min",
    tone: "mist",
    lastReviewed: "2026-07-06",
    sourceTitle: "Hong Kong Observatory reference plus original balcony observation",
    sourceUrl: hkoSolarTermsUrl,
    sourceRights:
      "This page is an original English guide. Public references are linked for the calendar frame; the balcony method and commentary are written for this site.",
    editorialMode: "Edited English guide and home observation note",
    editorNote:
      "Bailu is introduced with pinyin and English because the poetic name is useful, but the page treats dew as an observable condition rather than a decorative image.",
    tags: ["White Dew", "balcony", "humidity"],
    lead:
      "White Dew shrinks the seasonal turn to a small surface. A balcony rail, a car roof, the back of a leaf, or the top edge of an air-conditioner can become a calendar if you look early enough.",
    body: [
      "Bailu is easy to make beautiful and easy to make empty. The task is to help readers verify what they see. Choose a morning observation point: metal rail, plant leaf, glass window, outdoor table, or a bench near grass. Time and surface matter.",
      "Dew depends on night cooling, humidity, wind, and the temperature of a surface. This site does not need to turn the page into a meteorology lesson, but it should remind readers that metal, glass, leaves, and wood may gather moisture differently on the same morning.",
      "Balcony plants make the term practical. Does the soil stay damp longer? Are droplets visible under leaves? Has watering shifted from daily to every other day? These questions connect an old calendar word to daily care.",
      "The page should also teach caution. Water on a surface may come from dew, last night's rain, nearby air-conditioner drainage, or cleaning. A good note includes whether it rained, whether the surface was under an overhang, what material was observed, and what time the photograph was taken.",
      "Not seeing dew is still useful. Wind, high floors, dry air, and late observation can erase it. A blank record helps the reader understand the conditions dew requires. Seasonal observation should make room for absence as well as appearance.",
      "Floor height changes the page. Lower balconies near grass and trees may show moisture early; higher floors often dry quickly in stronger wind. A north-facing ledge, a south-facing rail, and a shaded stairwell can all give different answers on the same morning.",
      "Bailu also changes indoor rhythm. Windows may be closed earlier, a thin blanket returns, and warm drinks feel reasonable again. The point is not to prescribe a lifestyle. It is to notice how the body begins negotiating with cooler mornings."
    ],
    observe: [
      "Compare moisture on three surfaces at the same hour: metal, glass, and leaf.",
      "Track one potted plant for a week and note whether watering intervals change.",
      "Write down morning smell, skin feeling, and whether the window was open overnight."
    ]
  },
  {
    slug: "hanlu-night-walk",
    title: "Cold Dew at Night: Wind, Lamplight, and the First Raised Collar",
    deck:
      "Hanlu does not need dramatic cold. It often appears on the way home, where night wind, clearer air, warm shopfronts, and the edge of a sleeve make autumn unmistakable.",
    term: "Hanlu / Cold Dew",
    category: "Night observation",
    readingTime: "8 min",
    tone: "night",
    lastReviewed: "2026-07-06",
    sourceTitle: "UNESCO solar-term reference plus original night-walk observation",
    sourceUrl: unescoSolarTermsUrl,
    sourceRights:
      "This page is original English editorial writing with public reference links for the solar-term framework.",
    editorialMode: "Edited English guide and night observation note",
    editorNote:
      "Hanlu is kept in pinyin on first mention because its literal translation, Cold Dew, can sound harsher than the actual early-autumn experience.",
    tags: ["Cold Dew", "night walk", "autumn"],
    lead:
      "Cold Dew is best read after dark. It is not the violence of winter but a clearer edge in the air, the moment a person who left home casually begins to look for a collar, cuff, or pocket.",
    body: [
      "Bailu and Hanlu both speak of dew, but their moods differ. White Dew belongs easily to morning surfaces; Cold Dew belongs to the walk home. You step out of a bright office or shop and the air has a clean, slightly hollow feeling against the hand.",
      "Choose a safe, familiar route and repeat it. Watch the color of leaves under lamps, the sound of dry leaves on pavement, the wind at bicycle speed, and the difference between a warm storefront and the street just beyond it. Cold becomes legible through contrast.",
      "The sky can also sharpen. When autumn air dries, distant buildings may look more defined and cloud edges more exact. Even in a city with strong light pollution, visibility, cloud shape, and wind direction are worth recording.",
      "Clothing belongs in the observation. This is not fashion advice; it is climate evidence. The first time you seek a collar, close a sleeve, or regret leaving without a light layer, the term has moved from calendar to body.",
      "Warm sources make the cold visible: steam cabinets in convenience stores, street-food stalls, subway ventilation, a lit lobby, the first warm drink after a walk. Without contrast, cold is only an adjective. With contrast, the city shows how it answers the season.",
      "The route should be repeated rather than hunted. The second or third walk often reveals more than the first: which corner is always windy, which tree drops leaves under the same lamp, and where warmth leaks from a door into the street.",
      "A trustworthy page also keeps safety in view. Night observation should use well-lit, familiar, repeatable routes. The aim is not atmosphere at any cost; it is a method that a reader can actually practice."
    ],
    observe: [
      "Walk the same safe route three times and record wind, leaf sound, and body temperature.",
      "Compare cold feeling at a river edge, subway entrance, convenience store, and residential gate.",
      "Take one night-sky photo and note cloud amount, visibility, and wind direction."
    ]
  },
  {
    slug: "dongzhi-room-light",
    title: "Winter Solstice Light: How the Shortest Day Enters a Desk",
    deck:
      "Dongzhi can begin with astronomy, but it becomes intimate when afternoon light leaves a room early and the desk lamp becomes part of the day's structure.",
    term: "Dongzhi / Winter Solstice",
    category: "Calendar and home",
    readingTime: "9 min",
    tone: "winter",
    lastReviewed: "2026-07-06",
    sourceTitle: "Hong Kong Observatory reference plus original indoor-light observation",
    sourceUrl: hkoSolarTermsUrl,
    sourceRights:
      "This page is original English editorial writing. Public references are linked for the calendar and solar-motion background.",
    editorialMode: "Edited English guide and indoor-light observation note",
    editorNote:
      "Dongzhi is introduced with pinyin because the term carries both astronomical and domestic meaning in Chinese contexts.",
    tags: ["Winter Solstice", "daylight", "home"],
    lead:
      "Winter Solstice is one of the easiest terms to explain and one of the hardest to feel unless you bring it indoors. The shortest day appears as a desk that darkens early, a lamp switched on before dinner, and a plant leaning toward a smaller square of light.",
    body: [
      "The basic fact is simple: around Dongzhi, daylight is short and the sun sits low. A good page should not stop at that fact. It should ask where the reader can see it without leaving home.",
      "Begin with three times of day. At nine in the morning, does sunlight enter the room? At noon, where does it fall? At four-thirty, do you already need a lamp? Repeat the record for several days and the room becomes a calendar instrument.",
      "Plants give slower evidence. A windowsill plant may grow less, lean more clearly toward light, and need water less often. Rather than offering a large winter-care manual, ask first: is the soil drying more slowly, are new leaves fewer, and is a neighboring building blocking the low sun?",
      "Room direction matters. A south-facing room may receive brief but valuable low-angle sun. A north-facing room may depend on reflected light and lamps. Floor height, nearby buildings, and window size all change the meaning of the same solar term.",
      "Dongzhi can also be emotional without becoming vague. Short daylight changes work rhythm, dinner time, and the desire for warm food or fixed rituals. The page should describe behavior rather than diagnose feeling: when did you turn on the lamp, when did you make tea, when did the room begin to feel evening-like?",
      "Food and family customs matter, but this site treats them as part of a larger seasonal structure. Dumplings, tangyuan, soup, light, and a shared dinner all answer the same condition: a short day asks for steadiness.",
      "As the site grows, Winter Solstice should become a structural node. It can link astronomy, indoor light, food, plants, mood, and the neighboring terms of Lesser Cold and Greater Cold. A strong Dongzhi page makes the whole calendar easier to navigate."
    ],
    observe: [
      "Photograph the same desk at morning, noon, and late afternoon.",
      "Record the first time you turn on a lamp each day for one week.",
      "Watch one windowsill plant for soil dryness, new leaves, and direction of lean."
    ]
  }
];

export const seasonalEnglishTopics = [
  {
    slug: "city-phenology",
    title: "Urban Phenology",
    deck: "Read the solar terms through streets, rivers, balconies, and wind between buildings.",
    tone: "leaf",
    articleSlugs: ["xiaoshu-city-heat", "mangzhong-rain-and-grain", "liqiu-first-coolness"],
    description:
      "Urban phenology is not a substitute for field observation; it is the actual field many readers live in. Shade, pavement, drainage, street trees, and balcony plants all record seasonal change.",
    editorialNote:
      "This route should expand into street trees, river edges, rain-soaked roads, night heat, and community gardens. Each page should keep a repeatable checklist."
  },
  {
    slug: "home-season",
    title: "Home-Scale Seasons",
    deck: "Use windowsills, desks, kitchens, bedding, and closets as seasonal instruments.",
    tone: "mist",
    articleSlugs: ["bailu-balcony-dew", "dongzhi-room-light", "liqiu-first-coolness"],
    description:
      "Home-scale seasons bring large calendar changes into rooms. Light, humidity, plant care, food storage, and evening routines make the terms practical.",
    editorialNote:
      "Future additions can include photo templates, home record sheets, and permissioned reader notes, with editorial review kept visible."
  },
  {
    slug: "rain-and-humidity",
    title: "Rain and Humidity",
    deck: "Understand wet seasons through repeatable records of rain, dampness, plants, and rooms.",
    tone: "rain",
    articleSlugs: ["mangzhong-rain-and-grain", "bailu-balcony-dew", "xiaoshu-city-heat"],
    description:
      "This route moves rain out of the forecast and into clothing, drains, plants, mildew smell, and lived space.",
    editorialNote:
      "Good future pages include dehumidifying practice, balcony plants, plum-rain notes, and city infrastructure after storms."
  },
  {
    slug: "light-and-calendar",
    title: "Light and Calendar",
    deck: "Understand the terms through sun angle, day length, room shadow, and evening sky.",
    tone: "winter",
    articleSlugs: ["dongzhi-room-light", "liqiu-first-coolness", "hanlu-night-walk"],
    description:
      "The light-and-calendar route shows why the solar terms are not only folklore. They are tied to the sun's annual motion and to the spaces where people live.",
    editorialNote:
      "The next structural pages should cover the equinoxes and solstices, then connect them to nearby terms."
  }
];

export const seasonalEnglishStaticPages = [
  {
    slug: "about",
    title: "About Seasonal Observatory",
    description: "The purpose, scope, and editorial boundaries of Seasonal Observatory.",
    body:
      "<p>Seasonal Observatory is a city-facing guide to China's twenty-four solar terms. It asks how older seasonal knowledge can still be noticed in rooms, streets, balconies, markets, and commutes.</p><p>The site does not make unverified health promises and does not copy encyclopedia entries. Each article is built from original observation, practical prompts, and visible public references.</p>"
  },
  {
    slug: "authors",
    title: "Editors and Contributors",
    description: "Editorial responsibility, bylines, and contribution handling for Seasonal Observatory.",
    body:
      "<p>Seasonal Observatory is currently written, edited, and maintained by the site editors. City observations, home-recording prompts, and reading notes are original editorial work; public institutional pages are used as linked references and fact checks.</p><p>If reader photographs, field notes, or interviews are added later, the relevant pages will identify the contributor, permission terms, editorial handling, and last-reviewed date. Unpermissioned or unclear material does not belong in the published site.</p>"
  },
  {
    slug: "contact",
    title: "Contact",
    description: "Contact the Seasonal Observatory editors.",
    body:
      '<p>To suggest a correction, propose a topic, or offer a permissioned observation photograph, use the GitHub repository issues page: <a class="plain-link" href="https://github.com/ZhenGtai123/midnight-archive/issues" rel="nofollow noopener" target="_blank">midnight-archive issues</a>.</p><p>Submissions should include location, date, permission terms, and whether editorial rewriting is allowed. A permanent editorial email can be added when the site moves to its own domain.</p>'
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    description: "Privacy policy for Seasonal Observatory.",
    body:
      '<p>This static site currently has no account system, no comment system, and no reader profile collection. The hosting platform may retain basic access logs for security, performance, and troubleshooting.</p><p>If Google AdSense, analytics, or an email subscription feature is added later, this page will be updated before launch with cookie use, third-party services, data categories, and opt-out information.</p><p>If Google AdSense is enabled, Google and its partners may use cookies, advertising identifiers, IP addresses, and similar technologies to deliver, measure, or personalize ads. Readers can review <a class="plain-link" href="https://policies.google.com/technologies/partner-sites?hl=en" rel="nofollow noopener" target="_blank">Google\'s partner sites policy</a> and manage preferences through browser settings or Google ad settings.</p>'
  },
  {
    slug: "terms",
    title: "Terms of Use",
    description: "Terms of use and copyright notes for Seasonal Observatory.",
    body:
      "<p>Original essays, observation checklists, page design, and editorial organization belong to Seasonal Observatory unless a page says otherwise. Public institutional references are used as linked sources and fact checks, not as copied articles.</p><p>When quoting this site, keep the page title, URL, and source note. Please contact the editors if a correction is needed.</p>"
  },
  {
    slug: "advertising-policy",
    title: "Advertising and Sponsorship",
    description: "Advertising, sponsorship, and disclosure principles for Seasonal Observatory.",
    body:
      "<p>This site currently does not enable advertising code and does not display fake ad placements. If Google AdSense is added later, ads must be clearly separated from articles, observation checklists, navigation, and download-style controls.</p><p>Commercial relationships must not determine source notes, editorial judgment, or content updates. Pages touching food, health, or safety should stay specific and avoid exaggerated claims.</p>"
  },
  {
    slug: "editorial-policy",
    title: "Editorial Policy",
    description: "Seasonal Observatory's standards for topic selection, sourcing, and updates.",
    body:
      "<p>Every article should identify the solar term, observation setting, source references, editorial mode, and last-reviewed date. Calendar facts should be checked against public institutional sources; city and home observations should be original editorial writing.</p><p>The site avoids unsourced folklore claims, unverified health advice, and stitched-together encyclopedia paraphrase. Reader submissions must be permissioned and labeled.</p><p>Pages that are too thin, too generic, or unclear about sources should be revised before entering the formal growth queue.</p>"
  },
  {
    slug: "sources",
    title: "Sources",
    description: "Public references, original records, and permission plans used by Seasonal Observatory.",
    body:
      "<p class=\"lead\">This page records reusable source references and editorial observation methods. Article pages should keep source notes visible to readers, not hidden only in the repository.</p>"
  },
  {
    slug: "content-roadmap",
    title: "Content Roadmap",
    description: "Column planning and quality standards for Seasonal Observatory.",
    body:
      "<p class=\"lead\">The starter edition has six substantial essays. Before a serious AdSense review, the site should expand to all twenty-four solar terms and add eight to twelve evergreen topic articles with strong internal links.</p><p>Priority routes: core seasonal-transition pages, urban phenology, home-scale seasons, rain and humidity, and light and calendar. Each formal article should include original observation, a source card, an action checklist, and onward reading.</p>"
  }
];

export const seasonalEnglishExpansionPlan = [
  "Complete all 24 solar-term pages with substantial original English guides.",
  "Build four core calendar explainers around the equinoxes and solstices.",
  "Add city observation sheets, balcony plant templates, and permissioned reader photos.",
  "Move the site to its own domain before treating it as a separate AdSense candidate."
];
