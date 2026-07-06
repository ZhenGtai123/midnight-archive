const liaozhaiSourceUrl = "https://zh.wikisource.org/wiki/聊齋志異";

const commonLiaozhaiRights =
  "The classical Chinese source text is public domain. This English page is an original Midnight Archive editorial translation, retelling, and reading guide, with the source link retained for verification.";

const commonTranslatorNote =
  "Prepared by the Midnight Archive Editorial Desk as an original English editorial translation, retelling, and guide from the public-domain Chinese text. It is not copied from a modern English translation.";

export const englishSite = {
  slug: "midnight-archive",
  name: "Midnight Archive",
  shortName: "Midnight Archive",
  tagline: "Chinese strange tales, carefully retold",
  description:
    "An English pilot edition of Midnight Archive: public-domain Chinese strange tales, source notes, literary retellings, and editorial reading guides.",
  locale: "en",
  pathPrefix: "en/",
  basePath: "/midnight-archive/",
  canonicalOrigin: "https://zhengtai123.github.io",
  editor: "Midnight Archive Editorial Desk",
  heroImage: "/assets/hero-midnight-archive.png",
  logoImage: "/assets/logo-midnight-archive.svg",
  adsense: {
    enabled: false,
    publisherId: "",
    notes:
      "Keep AdSense disabled until there is a real approved publisher ID. Do not ship placeholder ad code."
  },
  nav: [
    { label: "Stories", href: "/midnight-archive/en/#stories" },
    { label: "Themes", href: "/midnight-archive/en/themes/" },
    { label: "Sources", href: "/midnight-archive/en/sources/" },
    { label: "Editorial", href: "/midnight-archive/en/editorial-policy/" }
  ],
  footerDescription:
    "Public-domain tale guides, source checks, and original editorial notes. Every English page keeps a visible source and translation note.",
  footerLinks: [
    { label: "About", href: "/midnight-archive/en/about/" },
    { label: "Contact", href: "/midnight-archive/en/contact/" },
    { label: "Privacy", href: "/midnight-archive/en/privacy/" },
    { label: "Advertising", href: "/midnight-archive/en/advertising-policy/" },
    { label: "Terms", href: "/midnight-archive/en/terms/" },
    { label: "Sitemap", href: "/midnight-archive/sitemap.xml" }
  ],
  sources: [
    {
      title: "Strange Tales from a Chinese Studio (Liaozhai zhiyi, 聊斋志异)",
      originalAuthor: "Pu Songling (蒲松龄)",
      era: "Qing dynasty",
      sourceUrl: liaozhaiSourceUrl,
      sourceRights:
        "Public-domain classical Chinese text. English pages on this site are original editorial retellings and guides, not copied modern translations.",
      usePlan:
        "Primary source for the English pilot: selected stories are translated, retold, and annotated one by one with source transparency."
    },
    {
      title: "Chinese Wikisource",
      originalAuthor: "Volunteer transcription project",
      era: "Digital public-domain source access",
      sourceUrl: "https://zh.wikisource.org/",
      sourceRights:
        "Used as a public source access point. Each story page keeps a direct source link and should be checked again before major expansion.",
      usePlan:
        "Useful for source verification, title checks, and later comparison against specific editions."
    },
    {
      title: "Project Gutenberg",
      originalAuthor: "Public-domain catalog",
      era: "Public-domain catalog",
      sourceUrl: "https://www.gutenberg.org/",
      sourceRights:
        "Each book has its own license notes. Any future English public-domain material must be checked title by title.",
      usePlan:
        "Reserved for future cross-cultural public-domain ghost-story guides, not for copying modern protected translations."
    }
  ],
  authors: [
    {
      name: "Pu Songling (蒲松龄)",
      role: "Qing-dynasty author of Liaozhai zhiyi",
      bio:
        "Pu Songling gathered and shaped many of the tales known in English as Strange Tales from a Chinese Studio. English pages here identify his authorship and keep the Chinese source visible."
    },
    {
      name: "Midnight Archive Editorial Desk",
      role: "English retelling, translation notes, and reading guides",
      bio:
        "The desk prepares original English editorial translations, retellings, and guides from public-domain source texts, with a preference for transparency over bulk publication."
    }
  ]
};

export const englishHomeContent = {
  heroEyebrow: "English pilot edition",
  primaryCta: "Read the featured tale",
  secondaryCta: "Browse themes",
  stats: [
    { value: "5", label: "English pilot stories" },
    { value: "6", label: "reading routes" },
    { value: "0", label: "borrowed modern translations" }
  ],
  intro: {
    eyebrow: "Night index",
    title: "A bilingual archive for old tales that still know how to unsettle a room",
    features: [
      {
        index: "01",
        title: "Editorial retellings",
        body:
          "The English pages are shaped for modern readers without flattening the old stories into plot summaries."
      },
      {
        index: "02",
        title: "Visible sources",
        body:
          "Every pilot story keeps its Chinese title, source text, author, era, rights note, and editorial mode in view."
      },
      {
        index: "03",
        title: "Slow expansion",
        body:
          "The first English release covers five strong pages. The rest of the archive will be translated only when each page can be handled properly."
      }
    ]
  },
  themes: {
    eyebrow: "Theme routes",
    title: "Start with routes, not a wall of titles"
  },
  stories: {
    eyebrow: "English archive",
    title: "Pilot stories"
  },
  roadmap: {
    eyebrow: "Next expansion",
    title: "The English edition grows by editorial quality, not by bulk translation",
    linkLabel: "View the roadmap"
  },
  sources: {
    eyebrow: "Sources",
    title: "Transparent source pool"
  }
};

export const englishExpansionPlan = [
  {
    title: "Complete the Liaozhai core",
    target: "18 stories",
    description:
      "Translate and edit the remaining Chinese story guides one by one, keeping source links, rights notes, and editorial notes visible."
  },
  {
    title: "Add term and character indexes",
    target: "8-12 entries",
    description:
      "Build short explainers for recurring terms such as underworld office, fox spirit, ruined temple, river ghost, and judgment."
  },
  {
    title: "Deepen source verification",
    target: "ongoing",
    description:
      "Move from general source links toward story-level version notes where public-domain editions can be checked responsibly."
  }
];

export const englishStories = [
  {
    slug: "xifangping",
    title: "Xi Fangping: The Man Who Would Not Withdraw His Complaint",
    deck:
      "A ghost story sharpened into a case file: justice does not arrive simply because the dead have entered another court.",
    sourceBook: "Strange Tales from a Chinese Studio (Liaozhai zhiyi, 聊斋志异)",
    sourceTitle: "席方平 (Xi Fangping)",
    originalAuthor: "Pu Songling (蒲松龄)",
    era: "Qing dynasty",
    sourceUrl: liaozhaiSourceUrl,
    sourceRights: commonLiaozhaiRights,
    editorialMode:
      "Original English editorial translation, retelling, and justice-themed reading guide",
    translatorNote:
      "This page gives an original English editorial retelling and guide to Xi Fangping (席方平), preserving the name in pinyin and Chinese at first mention. It emphasizes the tale's legal and moral pressure rather than treating it as a revenge fantasy.",
    editor: "Midnight Archive Editorial Desk",
    lastReviewed: "2026-07-06",
    category: "Underworld justice",
    mood: "appeal / pain / stubborn justice",
    readingTime: "8 min",
    coverTone: "crimson",
    tags: ["Liaozhai", "underworld", "justice"],
    summary:
      "Xi Fangping pursues a wrong done to his father into the courts of the dead. The terror lies less in monsters than in the discovery that another world can repeat the failures of this one.",
    paragraphs: [
      "Xi Fangping (席方平) begins with a hope that many unjust worlds quietly depend on: if human courts fail, surely some higher court must be waiting. Pu Songling lets that hope enter the underworld, then makes it walk through office after office until hope becomes endurance.",
      "The story is not frightening because ghosts appear. It is frightening because the dead have clerks, gates, punishments, influence, delays, and room for bribery. The underworld does not reverse the human world. It reflects it, with the lamps turned lower.",
      "Xi Fangping goes on because the wrong done to his father cannot be allowed to disappear into procedure. Each appeal should bring him closer to justice, yet each step exposes another layer of resistance. The tale's rhythm matters: one refusal would be plot; repeated refusal becomes a system.",
      "That is why this page keeps the English title plain and forceful. Xi is not a hero because he is certain of victory. He is a hero because he refuses to let pain be translated into silence by officials who would prefer a quieter case.",
      "The punishments in the story are harsh, but they are not the whole point. Pu Songling is more interested in what happens to a person who keeps speaking after power has made speaking costly. Xi Fangping's body becomes the document that the courts try, and fail, to erase.",
      "For English readers, the tale is best approached as a moral pressure chamber. It uses the architecture of the afterlife to ask a worldly question: what remains of justice when every office can be bent by fear, favor, or money?",
      "The story should not be rushed into a satisfying revenge arc. Its force comes from delay, humiliation, and the dreadful possibility that even the dead may have to learn how to petition upward. The eventual turn matters because the road to it has been made so exhausting.",
      "Read beside other Liaozhai underworld tales, Xi Fangping becomes one of the archive's central cases. It shows how a ghost story can carry civic anger without losing its literary darkness."
    ],
    notes: [
      "This English guide keeps the pinyin name Xi Fangping while retaining the original Chinese title in the source panel.",
      "Best paired with underworld and justice routes, especially later English pages for Lu Pan and Kao Chenghuang."
    ]
  },
  {
    slug: "nie-xiaoqian",
    title: "Nie Xiaoqian: The Woman Brought Back from the Ruined Temple",
    deck:
      "A ruined-temple encounter becomes a story about restraint, trust, and a ghost who is not identical with the violence that trapped her.",
    sourceBook: "Strange Tales from a Chinese Studio (Liaozhai zhiyi, 聊斋志异)",
    sourceTitle: "聂小倩 (Nie Xiaoqian)",
    originalAuthor: "Pu Songling (蒲松龄)",
    era: "Qing dynasty",
    sourceUrl: liaozhaiSourceUrl,
    sourceRights: commonLiaozhaiRights,
    editorialMode:
      "Original English editorial translation, retelling, and character-focused reading guide",
    translatorNote:
      "This is an original Midnight Archive English retelling and guide to Nie Xiaoqian (聂小倩). It deliberately returns to the public-domain tale rather than borrowing from modern film, television, or translated adaptations.",
    editor: "Midnight Archive Editorial Desk",
    lastReviewed: "2026-07-06",
    category: "Ruined temple",
    mood: "moonlight / restraint / return",
    readingTime: "7 min",
    coverTone: "jade",
    tags: ["Liaozhai", "ghost woman", "character guide"],
    summary:
      "Ning Caichen spends the night in a ruined temple and meets Nie Xiaoqian, a ghost pressed into a predatory order. The tale turns on the difficult grace of boundaries kept under danger.",
    paragraphs: [
      "Nie Xiaoqian (聂小倩) has often been remembered through later romance and spectacle, but the older tale is quieter and more exacting. A scholar arrives at a ruined temple; a woman appears at night; the reader is invited to expect seduction, danger, and perhaps punishment.",
      "Ning Caichen matters because he does not turn the encounter into a game. His restraint is not a decorative virtue. It changes the story's available future. In a place where social order has thinned and ordinary witnesses are gone, he still treats the stranger before him as a person with a boundary.",
      "Xiaoqian is not merely a beautiful ghost. She is caught inside a command she did not invent. When she warns Ning of the danger around him, she begins to separate herself from the machinery that uses her. The act is small, but in this story small acts are how a life reopens.",
      "That is the emotional center of the tale: not rescue as a single gesture, but rescue as a chain of choices. Xiaoqian chooses disclosure at risk to herself. Ning chooses trust without possession. Each choice gives the other one more step away from the ruined temple.",
      "The temple setting is important. It is a place outside household law and official protection, a pocket of night where people must reveal what they are willing to do without an audience. Pu Songling lets the space test both fear and desire.",
      "English retellings can easily make Xiaoqian too simple: either an alluring spirit or an innocent victim. The original story is stronger when she remains more complicated. She has been used to harm, but she is not reducible to harm. She is frightened, calculating, grateful, and active.",
      "The tale's tenderness comes from the fact that neither character is safe at the moment trust begins. It is not a fantasy of danger made pretty. It is a story about how one person may help another leave a pattern of violence without pretending the pattern was harmless.",
      "For this archive, Nie Xiaoqian is a model character page. Her story links naturally to ruined temples, ghost women, moral restraint, and the long afterlife of Liaozhai in popular imagination, while keeping the source text at the center."
    ],
    notes: [
      "Modern adaptations made Nie Xiaoqian famous, but this page discusses the public-domain tale and original editorial interpretation.",
      "Pairs well with Painted Skin: both begin with night encounters, but one turns on deception and the other on a trapped person choosing truth."
    ]
  },
  {
    slug: "painted-skin",
    title: "Painted Skin: The Lovely Face That Hid a Hunger",
    deck:
      "A classic Liaozhai tale about beauty, warning signs, and the dangerous stories people tell themselves before they believe what they have seen.",
    sourceBook: "Strange Tales from a Chinese Studio (Liaozhai zhiyi, 聊斋志异)",
    sourceTitle: "画皮 (Painted Skin)",
    originalAuthor: "Pu Songling (蒲松龄)",
    era: "Qing dynasty",
    sourceUrl: liaozhaiSourceUrl,
    sourceRights: commonLiaozhaiRights,
    editorialMode:
      "Original English editorial translation, retelling, and modern reading note",
    translatorNote:
      "This page is an original English editorial retelling and guide to Painted Skin (画皮). It does not reproduce any protected modern translation or adaptation.",
    editor: "Midnight Archive Editorial Desk",
    lastReviewed: "2026-07-06",
    category: "Liaozhai night reading",
    mood: "rain / disguise / delayed judgment",
    readingTime: "7 min",
    coverTone: "crimson",
    tags: ["Liaozhai", "disguise", "classic strange tale"],
    summary:
      "Wang Sheng meets a vulnerable-looking woman and lets desire supply the missing explanations. By the time the skin is seen for what it is, the warning has already been ignored.",
    paragraphs: [
      "Painted Skin (画皮) is famous because its image is unforgettable: a beautiful surface can be taken off, repaired, and worn. Yet the story's deeper unease begins before the skin is revealed, in the gap between warning and belief.",
      "Wang Sheng does not step into danger because he has no information. He steps into it because the information arrives in a form he does not want to accept. A lonely woman appears; pity and desire rush forward; every awkward detail is folded into a kinder explanation.",
      "The Taoist's warning functions like a cold lantern in the story. It does not make Wang virtuous, and it does not instantly save him. It merely gives him a chance to admit that what he wants may be less trustworthy than what he has seen.",
      "The demon's painted skin is therefore not only a horror device. It is a picture of collaboration between deception and self-deception. The monster paints a face, but Wang helps keep the painting believable by supplying a story around it.",
      "Pu Songling's cruelty is precise. Danger does not always enter with claws exposed. It may first learn the gestures of distress, gentleness, and need. By the time the terrifying form is visible, the moral failure has already unfolded in ordinary rooms.",
      "A modern reading should resist turning the tale into a simple moral about beauty. The issue is not that beauty itself is false. The issue is that Wang allows beauty to overrule behavior, warning, and proportion. He wants the face to tell the whole truth.",
      "That delay makes the tale less moralistic and more unsettling. Wang is not fooled once in a clean dramatic instant; he is fooled repeatedly, by preference, embarrassment, and the wish to remain the sort of man his own story has already made him.",
      "The title's verb matters. The skin is painted. Surface has been manufactured, not merely inherited. That makes the tale feel startlingly current: it asks how much evidence people will discard in order to protect an image they have chosen to trust.",
      "For the English pilot, Painted Skin anchors the archive's route through disguise and recognition. It is a frightening story, but its best terror is cognitive. The reader recognizes the delay before judgment because it belongs to human life, not only to monsters.",
      "The English version should therefore keep its attention on the sequence of choices. The monster matters, but the archive's value comes from showing how desire makes a false surface persuasive before any supernatural violence arrives."
    ],
    notes: [
      "The English page treats the tale as an original reading guide, not as a substitute for a scholarly translation.",
      "Useful as the first English node for themes of disguise, surface, warning, and self-deception."
    ]
  },
  {
    slug: "laoshan-daoshi",
    title: "The Taoist of Laoshan: Wanting Magic Without the Discipline",
    deck:
      "A light, sharp tale about a seeker who loves the spectacle of transcendence but not the labor that might make him worthy of it.",
    sourceBook: "Strange Tales from a Chinese Studio (Liaozhai zhiyi, 聊斋志异)",
    sourceTitle: "崂山道士 (The Taoist of Laoshan)",
    originalAuthor: "Pu Songling (蒲松龄)",
    era: "Qing dynasty",
    sourceUrl: liaozhaiSourceUrl,
    sourceRights: commonLiaozhaiRights,
    editorialMode:
      "Original English editorial translation, retelling, and satire-focused reading guide",
    translatorNote:
      "This is an original English editorial retelling and guide to The Taoist of Laoshan (崂山道士). It keeps the comic structure of the public-domain tale while translating the reading context for English readers.",
    editor: "Midnight Archive Editorial Desk",
    lastReviewed: "2026-07-06",
    category: "Mountain magic",
    mood: "training / spectacle / satire",
    readingTime: "6 min",
    coverTone: "jade",
    tags: ["Liaozhai", "cultivation", "satire"],
    summary:
      "A man goes to Laoshan to learn immortal arts. He admires banquets, spells, and wall-walking, but the daily work of discipline is another matter.",
    paragraphs: [
      "The Taoist of Laoshan (崂山道士) is one of Pu Songling's most approachable satires. It has mountain air, magical banquets, and the famous trick of walking through walls. It also has a student who wants the shining result without the dull apprenticeship.",
      "Wang, the would-be seeker, is not rejected at the gate. That detail gives the comedy its bite. The mountain does not immediately close itself to him. He is given a place, tasks, time, and the chance to learn what kind of person he is when wonder becomes routine.",
      "He fails at the routine. Cutting wood, enduring discomfort, and waiting through unglamorous days do not match the picture of transcendence he carried up the mountain. He wanted magic to confirm his importance, not discipline to expose his impatience.",
      "The Taoist master is written with a dry intelligence. He does not need a speech about humility. He lets labor and temptation do the teaching. When Wang begs for a portable miracle, the master gives him exactly enough to reveal what he has not learned.",
      "The wall-walking scene is funny because it is so perfectly measured. Wang receives a skill before he has received a transformation. Back at home, the spell becomes performance, and performance meets the solid wall of ordinary reality.",
      "The collision is more than a punch line. It restores weight to a man who wanted spiritual lightness as a possession. The wall teaches what the mountain could not make him accept: a borrowed wonder cannot carry an unchanged self very far.",
      "English readers may hear a familiar modern anxiety in the tale: the desire to skip practice and arrive at mastery already impressive. The story is not a productivity lesson, though. Its wisdom is more comic and more severe. A person who wants only evidence of attainment may turn even magic into vanity.",
      "The tale also widens the emotional range of this archive. Not every strange tale must be grim. Some are bright, brisk, and embarrassing in the best way. Laughter becomes the instrument by which the story returns a foolish seeker to the ground.",
      "Placed beside darker Liaozhai pages, The Taoist of Laoshan reminds readers that the uncanny can expose ordinary habits as cleanly as it can open graves. The supernatural event is brief; the human flaw is durable.",
      "That makes the page useful for the English pilot's balance. It gives new readers a comic doorway into Liaozhai while still showing the archive's larger method: source, scene, theme, and modern readability working together."
    ],
    notes: [
      "This page works well as a low-horror English entry point into Liaozhai.",
      "Pairs naturally with future pages on illusion, cultivation, and the wish for shortcuts."
    ]
  },
  {
    slug: "wang-liulang",
    title: "Wang Liulang: A Ghost at the River Who Refused a Victim",
    deck:
      "A gentle strange tale in which the expected water-ghost horror is turned toward friendship, restraint, and the refusal to pass suffering on.",
    sourceBook: "Strange Tales from a Chinese Studio (Liaozhai zhiyi, 聊斋志异)",
    sourceTitle: "王六郎 (Wang Liulang)",
    originalAuthor: "Pu Songling (蒲松龄)",
    era: "Qing dynasty",
    sourceUrl: liaozhaiSourceUrl,
    sourceRights: commonLiaozhaiRights,
    editorialMode:
      "Original English editorial translation, retelling, and theme commentary",
    translatorNote:
      "This is an original Midnight Archive English retelling and guide to Wang Liulang (王六郎). It keeps the public-domain source visible and does not borrow from any protected modern English translation.",
    editor: "Midnight Archive Editorial Desk",
    lastReviewed: "2026-07-06",
    category: "River ghost",
    mood: "riverbank / wine / old friendship",
    readingTime: "6 min",
    coverTone: "amber",
    tags: ["Liaozhai", "friendship", "river ghost"],
    summary:
      "A ghost by the water does not become a simple predator. Wang Liulang's story turns a dangerous folk motif into a quiet argument for loyalty and moral choice.",
    paragraphs: [
      "Wang Liulang (王六郎) begins near a familiar fear. In many water-ghost tales, the drowned dead wait for a replacement so they can escape their place of death. The riverbank is not just scenery. It is a border with a debt attached.",
      "Pu Songling lets that shadow remain, then writes against it. Wang Liulang is strange, but he is not merely a rule in ghostly form. He drinks, visits, keeps company, and slowly becomes legible as a friend rather than a threat.",
      "The quietness matters. Nothing in the story needs thunder. A relationship forms through ordinary gestures, and the reader begins to feel how thin the line can be between the living and the dead when both sides still understand hospitality.",
      "The crucial moment arrives when release seems possible at another person's expense. This is where a lesser horror story would let the old mechanism close. Wang Liulang refuses to pass his suffering forward, and that refusal gives the tale its warmth.",
      "The refusal also changes how the river feels. What first seemed like a dangerous border becomes a place where an ethical choice can be made quietly, without witnesses or reward. The tale's gentleness depends on that privacy.",
      "The ghost is memorable because he retains choice. He is not free in every sense, but he is free enough to decline cruelty. Pu Songling often finds humanity in figures who should, by genre expectation, have become pure danger.",
      "For English readers, the tale offers a useful correction to the idea that strange tales are only about fright. They can also preserve tenderness, delayed gratitude, and the moral dignity of someone with very little power left.",
      "A later expanded page could add a short note on the replacement motif in water-ghost stories. The key is to keep the note in service of the tale's feeling. Folklore background should sharpen the gentleness here, not bury it under terminology.",
      "In the English pilot, Wang Liulang balances the darker selections. After Xi Fangping's courts and Painted Skin's deception, the river ghost lets the archive breathe. Night remains, but it is not empty of kindness.",
      "That quiet kindness is not decorative. It proves that a strange-tale archive can build trust with readers by preserving tonal range, not just by escalating fear from page to page."
    ],
    notes: [
      "Best placed in the gentle strange tales route.",
      "The page treats river-ghost folklore as background while keeping the story's friendship at the center."
    ]
  }
];

export const englishThemeCollections = [
  {
    slug: "fox-and-female-figures",
    title: "Fox Spirits, Ghost Women, and Difficult Agency",
    deck:
      "Nie Xiaoqian and Painted Skin begin with night encounters, but they lead to sharply different questions about danger, coercion, and recognition.",
    description:
      "This route keeps female and uncanny figures from being flattened into one romantic type. Some characters are trapped, some deceive, and some force readers to ask whether beauty is a person, a performance, or a warning sign.",
    tone: "jade",
    storySlugs: ["nie-xiaoqian", "painted-skin"],
    editorialNote:
      "The English pilot starts with two contrastive pages. Later translations can add Yingning, Qingfeng, Xiangyu, and other character studies."
  },
  {
    slug: "underworld-and-justice",
    title: "Underworld and Justice",
    deck:
      "Xi Fangping shows that the courts of the dead can reproduce the failures of the living.",
    description:
      "Underworld stories are not only about ghosts. They ask whether justice can survive office, hierarchy, punishment, and delay. The English route begins with Xi Fangping as its central case.",
    tone: "violet",
    storySlugs: ["xifangping"],
    editorialNote:
      "Future English pages should add Lu Pan and Kao Chenghuang to build a fuller underworld reading route."
  },
  {
    slug: "gentle-strange-tales",
    title: "Gentle Strange Tales",
    deck:
      "Wang Liulang proves that night stories can be tender without becoming harmless.",
    description:
      "This route balances the archive's darker cases with tales of loyalty, quiet wonder, and moral restraint. The uncanny does not always arrive to devour someone.",
    tone: "ivory",
    storySlugs: ["wang-liulang"],
    editorialNote:
      "The route will expand well with Seed Pear, Mountain Market, Xiangyu, and other low-horror pieces."
  },
  {
    slug: "satire-and-worldly-pressure",
    title: "Satire and Worldly Pressure",
    deck:
      "The Taoist of Laoshan makes supernatural comedy out of a very human wish for shortcuts.",
    description:
      "Pu Songling's satire often turns human impatience, vanity, and social hunger into visible absurdity. This English route starts with a seeker who wants magic more than discipline.",
    tone: "amber",
    storySlugs: ["laoshan-daoshi"],
    editorialNote:
      "Later pages can add Cuzhi, Luocha Haishi, Seed Pear, and Jiangcheng for a broader satire route."
  },
  {
    slug: "objects-and-legends",
    title: "Objects, Surfaces, and Legends",
    deck:
      "Painted Skin turns a surface into an object that can be worn, repaired, and trusted too late.",
    description:
      "Objects in strange tales often make inner danger visible. A skin, a sword, a mirror, or a spell can reveal what ordinary social life tries to keep unseen.",
    tone: "crimson",
    storySlugs: ["painted-skin"],
    editorialNote:
      "This route is a seed for later object-focused pages, including Ganjiang and Moye, Lu Pan, and Seed Pear."
  },
  {
    slug: "night-road-and-old-house",
    title: "Night Roads, Ruined Temples, and Old Houses",
    deck:
      "Nie Xiaoqian and The Taoist of Laoshan show how place can test desire, restraint, and self-knowledge.",
    description:
      "This route organizes the uncanny by scene: road, temple, mountain, old house, and threshold. Place is never passive in these tales; it changes what people dare to become.",
    tone: "teal",
    storySlugs: ["nie-xiaoqian", "laoshan-daoshi"],
    editorialNote:
      "Future English pages can add Song Dingbo, Qingfeng, Mountain Market, and other scene-driven tales."
  }
];

export const englishStoryDeepDives = {
  xifangping: [
    "A fuller English version should map the appeal structure step by step. The story's pressure comes from repetition: every higher office promises distance from corruption, then reveals another version of it.",
    "The tale also belongs in a broader history of underworld imagination, but the guide should avoid turning the page into a reference dump. Background should clarify why the ghostly bureaucracy feels so worldly.",
    "The central reading question is not whether Xi Fangping wins. It is what kind of person continues to make a claim when the system has already made pain the price of speech."
  ],
  "nie-xiaoqian": [
    "A later expansion should give Xiaoqian a character timeline: forced participation, warning, trust, relocation, and return to human life. That structure helps keep her agency visible.",
    "The ruined temple deserves its own short note. It is both a danger zone and a place where ordinary social scripts loosen enough for a different moral choice to occur.",
    "Any discussion of later adaptations should remain careful. This archive can discuss influence, but it should not import protected dialogue, images, or scene design."
  ],
  "painted-skin": [
    "The strongest long-form version would separate three layers: the demon's disguise, Wang Sheng's desire to believe, and the Taoist's warning as a test of judgment.",
    "A useful keyword index could connect skin, surface, disguise, warning, and delay to other archive pages. This would make the story a route node rather than an isolated classic.",
    "The page should avoid the thin moral that beauty is dangerous. The sharper point is that desire can teach a person to ignore behavior and evidence."
  ],
  "laoshan-daoshi": [
    "A compact table could trace the comic ladder: arrival, labor, spectacle, impatience, borrowed spell, and collision. The structure is simple, but that simplicity is why the satire lands.",
    "The modern connection should stay light. The story speaks clearly to shortcut culture, but it should remain a literary reading rather than a motivational essay.",
    "As the English archive expands, this page can lead readers toward low-horror and comic tales that still carry real moral intelligence."
  ],
  "wang-liulang": [
    "A later version can add a careful note on replacement in water-ghost lore. The note should make Wang Liulang's refusal more striking without reducing the story to folklore mechanics.",
    "The riverbank can be read as a threshold: a workplace, a social meeting place, and a boundary between worlds. That layered setting explains why the friendship feels both ordinary and fragile.",
    "This story is valuable for tone. It lets the English edition prove that the archive is not only collecting fear, but also forms of loyalty that survive inside fear."
  ]
};

export const englishStaticPages = [
  {
    slug: "about",
    title: "About",
    description: "About the English pilot edition of Midnight Archive.",
    body:
      "<p>Midnight Archive is a bilingual editorial archive for public-domain Chinese strange tales. The English edition starts small on purpose: each story page should have a clear source, a rights note, and an original editorial translation or retelling.</p><p>The site does not copy modern protected translations. When public-domain or openly licensed references are used in the future, they should be identified clearly on the relevant page.</p>"
  },
  {
    slug: "contact",
    title: "Contact",
    description: "Contact the Midnight Archive editorial desk.",
    body:
      '<p>For source corrections, rights concerns, or suggestions, use the GitHub repository issues page: <a class="plain-link" href="https://github.com/ZhenGtai123/midnight-archive/issues" rel="nofollow noopener" target="_blank">midnight-archive issues</a>.</p><p>Please include the page URL, the source or rights concern, and a verifiable way to follow up. A permanent editorial email can be added after the project moves to its final domain.</p>'
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    description: "Privacy policy for Midnight Archive.",
    body:
      "<p>This static preview does not provide user accounts, comments, or submission forms. Basic server logs may exist for security, performance, and troubleshooting.</p><p>If analytics, advertising, newsletter tools, or other third-party services are added later, this page should be updated before launch to describe data types, purposes, cookies, third-party services, and opt-out choices.</p>"
  },
  {
    slug: "terms",
    title: "Terms",
    description: "Terms of use and copyright notes for Midnight Archive.",
    body:
      "<p>Original editorial introductions, English retellings, notes, and page design belong to the Midnight Archive editorial desk unless otherwise stated. Classical source texts remain public-domain or subject to the terms shown at their source pages.</p><p>When quoting or referencing this site, keep the page title, URL, and editorial note visible. If a source label is wrong, contact the editorial desk so it can be corrected.</p>"
  },
  {
    slug: "advertising-policy",
    title: "Advertising and Sponsorship",
    description: "Advertising and sponsorship disclosure for Midnight Archive.",
    body:
      "<p>This preview does not enable advertising code and does not display fake ad placements. If Google AdSense or another advertising service is added later, advertising must remain clearly separate from story content, navigation, and source notes.</p><p>Advertising or sponsorship must not determine source labels, rights notes, or editorial judgment. Paid collaborations should be disclosed on the relevant page.</p>"
  },
  {
    slug: "editorial-policy",
    title: "Editorial Policy",
    description: "Editorial standards for the English edition of Midnight Archive.",
    body:
      "<p>Every English story page should identify the source text, original author or traditional attribution, era, rights note, editorial mode, and review date. Pages without a source do not belong in the publication queue.</p><p>The English edition favors source-led retellings, reading guides, and commentary over raw copying. Modern online stories, blog posts, social media posts, and paid material must not be reproduced without clear permission.</p><p>Because this is a pilot, untranslated Chinese pages remain available at their original URLs while English pages receive their own stable /en/ URLs.</p>"
  },
  {
    slug: "sources",
    title: "Sources",
    description: "Source pool, rights notes, and use plan for the English edition.",
    body:
      "<p class=\"lead\">This page records the source pool used by the English pilot. Story pages should keep their own source link and rights note so readers can verify where the material comes from.</p>"
  },
  {
    slug: "authors",
    title: "Authors and Editors",
    description: "Original authors and the Midnight Archive editorial role.",
    body:
      "<p class=\"lead\">The archive distinguishes classical authorship, traditional attribution, and modern editorial work. English pages are prepared by the Midnight Archive Editorial Desk as original retellings and guides.</p>"
  },
  {
    slug: "content-roadmap",
    title: "Content Roadmap",
    description: "Roadmap for expanding the English edition of Midnight Archive.",
    body:
      "<p class=\"lead\">The English edition should expand slowly. A polished bilingual site is more valuable than a large batch of rough machine translation.</p>"
  }
];
