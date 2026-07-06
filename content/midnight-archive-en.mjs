const liaozhaiSourceUrl = "https://zh.wikisource.org/wiki/聊齋志異";
const souShenSourceUrl = "https://zh.wikisource.org/wiki/搜神記";

const commonLiaozhaiRights =
  "The classical Chinese source text is public domain. This English page is an original Midnight Archive editorial translation, retelling, and reading guide, with the source link retained for verification.";

const commonTranslatorNote =
  "Prepared by the Midnight Archive Editorial Desk as an original English editorial translation, retelling, and guide from the public-domain Chinese text. It is not copied from a modern English translation.";

const commonZhiguaiRights =
  "The classical Chinese source tradition is public domain. This English page is an original Midnight Archive editorial retelling and reading guide, with the source link retained and the exact version to be checked before scholarly use.";

export const englishSite = {
  slug: "midnight-archive",
  name: "Midnight Archive",
  shortName: "Midnight Archive",
  tagline: "Chinese strange tales, carefully retold",
  description:
    "The English edition of Midnight Archive: public-domain Chinese strange tales, source notes, literary retellings, and editorial reading guides.",
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
        "Primary source for the first English wave: selected stories are translated, retold, and annotated one by one with source transparency."
    },
    {
      title: "Soushen ji and related zhiguai traditions (搜神记相关志怪传统)",
      originalAuthor: "Gan Bao (干宝) and traditional attributions",
      era: "Eastern Jin and later transmission",
      sourceUrl: souShenSourceUrl,
      sourceRights:
        "Public-domain classical Chinese source tradition. Pages using it are editorial guides and should keep version-check notes visible.",
      usePlan:
        "Used for older legend and anomaly stories where attribution and version history require more visible caution."
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
  heroEyebrow: "English edition",
  primaryCta: "Read the featured tale",
  secondaryCta: "Browse themes",
  stats: [
    { value: "18", label: "English story guides" },
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
          "Every English story keeps its Chinese title, source text, author, era, rights note, and editorial mode in view."
      },
      {
        index: "03",
        title: "Slow expansion",
        body:
          "The first English wave now covers the full Chinese story set, but future additions should still be edited one page at a time."
      }
    ]
  },
  themes: {
    eyebrow: "Theme routes",
    title: "Start with routes, not a wall of titles"
  },
  stories: {
    eyebrow: "English archive",
    title: "First-wave English stories"
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
    title: "Move beyond the first story wave",
    target: "25-35 stories",
    description:
      "Add new English story guides only after the Chinese source and editorial angle are clear, keeping source links, rights notes, and translator notes visible."
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
      "For the English edition, Painted Skin anchors the archive's route through disguise and recognition. It is a frightening story, but its best terror is cognitive. The reader recognizes the delay before judgment because it belongs to human life, not only to monsters.",
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
      "That makes the page useful for the English edition's balance. It gives new readers a comic doorway into Liaozhai while still showing the archive's larger method: source, scene, theme, and modern readability working together."
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
      "In the English edition, Wang Liulang balances the darker selections. After Xi Fangping's courts and Painted Skin's deception, the river ghost lets the archive breathe. Night remains, but it is not empty of kindness.",
      "That quiet kindness is not decorative. It proves that a strange-tale archive can build trust with readers by preserving tonal range, not just by escalating fear from page to page."
    ],
    notes: [
      "Best placed in the gentle strange tales route.",
      "The page treats river-ghost folklore as background while keeping the story's friendship at the center."
    ]
  },
  {
    slug: "yingning",
    title: "Yingning: Laughter, Blossoms, and the Fox Girl Who Will Not Be Solved",
    deck:
      "A bright Liaozhai tale whose laughter is not shallow: Yingning's charm comes from the way she resists being completely explained.",
    sourceBook: "Strange Tales from a Chinese Studio (Liaozhai zhiyi, 聊斋志异)",
    sourceTitle: "婴宁 (Yingning)",
    originalAuthor: "Pu Songling (蒲松龄)",
    era: "Qing dynasty",
    sourceUrl: liaozhaiSourceUrl,
    sourceRights: commonLiaozhaiRights,
    editorialMode:
      "Original English editorial translation, retelling, and character-focused reading guide",
    translatorNote:
      "This is an original Midnight Archive English retelling and guide to Yingning (婴宁). It keeps the tale's brightness while reading the laughter as a literary problem, not a decorative trait.",
    editor: "Midnight Archive Editorial Desk",
    lastReviewed: "2026-07-06",
    category: "Fox girl and blossoms",
    mood: "flowers / laughter / resistant clarity",
    readingTime: "8 min",
    coverTone: "ivory",
    tags: ["Liaozhai", "fox girl", "character guide"],
    summary:
      "Wang Zifu encounters Yingning, whose laughter seems at first like pure innocence. The story becomes richer when that laughter enters household order and begins to change meaning.",
    paragraphs: [
      "Yingning (婴宁) enters Liaozhai with flowers and laughter rather than thunder. She is one of the collection's most luminous figures, and that brightness can mislead a reader into treating her as simple.",
      "Her laughter is not merely cute. It unsettles social speech. At times it looks like innocence; at other times it feels like a refusal to answer the world in the world's own careful language.",
      "Wang Zifu is drawn toward her because she seems both present and unreachable. He sees beauty, freshness, and oddness. The reader sees how quickly a male gaze tries to turn an unfamiliar woman into a legible story.",
      "The tale becomes more complicated after Yingning enters a household. Laughter that felt free among flowers can become embarrassing under family discipline. The same gesture changes because the room around it has changed.",
      "That movement is the heart of the story. Yingning is not interesting because she can be decoded as fox, girl, innocent, trickster, or wife. She is interesting because every explanation leaves something still laughing beyond it.",
      "An English reading should resist polishing away this ambiguity. The old tale keeps her partly wild, partly social, partly knowing, partly untrained. Its charm depends on not forcing those parts into a single modern category.",
      "Yingning pairs naturally with Nie Xiaoqian. Xiaoqian struggles to leave a violent command and return to human life; Yingning enters human order while keeping a strange surplus of self that order cannot entirely absorb.",
      "For the archive, this page belongs to the character route. It shows how a bright story can still carry pressure: beauty, laughter, marriage, and social discipline all meet under the same flowering branch."
    ],
    notes: [
      "The page reads laughter as structure: first encounter, social disruption, household pressure, and unresolved selfhood.",
      "Modern adaptation notes should remain secondary to the public-domain tale and avoid protected dialogue or imagery."
    ]
  },
  {
    slug: "mountain-market",
    title: "Mountain Market: The City That Appears Like a Dream",
    deck:
      "A brief, airy Liaozhai piece about watching an impossible city form in the distance, sharpen, and vanish.",
    sourceBook: "Strange Tales from a Chinese Studio (Liaozhai zhiyi, 聊斋志异)",
    sourceTitle: "山市 (Mountain Market)",
    originalAuthor: "Pu Songling (蒲松龄)",
    era: "Qing dynasty",
    sourceUrl: liaozhaiSourceUrl,
    sourceRights: commonLiaozhaiRights,
    editorialMode:
      "Original English editorial translation, retelling, and landscape-focused reading guide",
    translatorNote:
      "This page is an original English editorial guide to Mountain Market (山市). It preserves the tale's visual wonder without reducing it to a simple natural-science explanation.",
    editor: "Midnight Archive Editorial Desk",
    lastReviewed: "2026-07-06",
    category: "Visionary landscape",
    mood: "distant city / mirage / disappearance",
    readingTime: "5 min",
    coverTone: "teal",
    tags: ["Liaozhai", "mirage", "short tale"],
    summary:
      "A city appears in the mountains: towers, walls, figures, details. The wonder lies in the act of watching, and in the sadness of seeing clarity vanish.",
    paragraphs: [
      "Mountain Market (山市) is short, but it should not be treated as thin. It has almost no plot in the ordinary sense. Its event is an act of seeing.",
      "A city appears where no city should be. At first it is remote and uncertain; then the shapes gather detail. Buildings, walls, and tiny human traces seem to pull themselves out of air.",
      "The pleasure of the piece is sequential. The reader watches the vision become more believable line by line. Pu Songling lets distance harden into architecture, then lets architecture loosen back into absence.",
      "A modern note may mention mirage, atmosphere, and optical illusion, but explanation should not flatten the literary effect. The story is not valuable only because it can be explained. It is valuable because it organizes wonder with such clean timing.",
      "The vanishing is as important as the appearance. A strange tale can frighten by bringing something near, but this one unsettles by making the world briefly more spacious, then taking that spaciousness away.",
      "For English readers, Mountain Market also reads like a miniature lesson in attention. Nothing is solved, rescued, punished, or married. The page asks the reader to remain with perception itself.",
      "That makes it an important counterweight in the archive. After underworld lawsuits and painted skins, this tale opens a window. The uncanny can be clear air, not only danger.",
      "The English guide should therefore be spare but not bare: scene, sequence, disappearance, and afterimage. The old text leaves a city in the reader's mind precisely because it refuses to keep it on the horizon."
    ],
    notes: [
      "This story is useful for low-horror reading routes and pages about vision, landscape, and disappearance.",
      "Any scientific note should support the reading rather than replace the literary experience."
    ]
  },
  {
    slug: "lu-pan",
    title: "Lu Pan: After the Heart and Head Are Changed, Who Remains?",
    deck:
      "A grotesque and brilliant Liaozhai tale about talent, appearance, power, and whether a person improved by force is still the same person.",
    sourceBook: "Strange Tales from a Chinese Studio (Liaozhai zhiyi, 聊斋志异)",
    sourceTitle: "陆判 (Lu Pan)",
    originalAuthor: "Pu Songling (蒲松龄)",
    era: "Qing dynasty",
    sourceUrl: liaozhaiSourceUrl,
    sourceRights: commonLiaozhaiRights,
    editorialMode:
      "Original English editorial translation, retelling, and identity-focused reading guide",
    translatorNote:
      "This is an original English editorial guide to Lu Pan (陆判). It treats the strange body-changing episodes as ethical questions, not as spectacle alone.",
    editor: "Midnight Archive Editorial Desk",
    lastReviewed: "2026-07-06",
    category: "Underworld anomaly",
    mood: "judge / body / altered fate",
    readingTime: "8 min",
    coverTone: "violet",
    tags: ["Liaozhai", "identity", "underworld"],
    summary:
      "Zhu Erdan befriends Lu Pan, an underworld judge whose power can alter bodies, talent, and destiny. The gift feels generous until the reader asks who bears its cost.",
    paragraphs: [
      "Lu Pan (陆判) begins with a fascination that is easy to understand: what if fate could be repaired by someone with access to the underworld's hidden workshop?",
      "Zhu Erdan receives changes that seem at first like blessings. Talent, status, appearance, and marriage all become open to supernatural revision. A life that felt fixed can suddenly be edited.",
      "But the tale's unease comes from how easily the editing happens. Lu Pan is charming, forceful, and almost casual. What he can cut and replace, living people must inhabit as body, reputation, and consequence.",
      "The story should not be read only for its grotesque operations. The sharper question is authority: who has the right to improve a person, and who gets to define what improvement means?",
      "Zhu benefits from alteration, but not every affected person has equal voice. Pu Songling lets the reader enjoy the uncanny generosity while feeling the moral chill that follows it.",
      "For English readers, Lu Pan may feel startlingly modern. It touches appearance anxiety, education anxiety, social mobility, and the fantasy that a single intervention can make a life finally acceptable.",
      "Yet the tale resists becoming a simple warning. Lu Pan is not merely a villain, and Zhu is not merely a victim. Their friendship is warm enough to make the power more troubling, not less.",
      "In this archive, Lu Pan belongs beside Xi Fangping and Kao Chenghuang. All three imagine underworld offices, but each asks a different question: justice, examination, and the frightening ease with which power may rewrite a life."
    ],
    notes: [
      "This page should keep body-change material readable without leaning on gore.",
      "Pairs well with underworld, identity, and object/surface routes."
    ]
  },
  {
    slug: "song-dingbo",
    title: "Song Dingbo Catches a Ghost: Fear Answered with Questions",
    deck:
      "A compact zhiguai tale in which a night traveler survives not by strength, but by making the ghost explain its own rules.",
    sourceBook: "Zhiguai tradition associated with Soushen ji (搜神记相关志怪传统)",
    sourceTitle: "宋定伯捉鬼 (Song Dingbo Catches a Ghost)",
    originalAuthor: "Traditional zhiguai text",
    era: "Circulated from the Six Dynasties tradition onward",
    sourceUrl: souShenSourceUrl,
    sourceRights: commonZhiguaiRights,
    editorialMode:
      "Original English editorial retelling, source-aware guide, and version-check note",
    translatorNote:
      "This is an original Midnight Archive English retelling and guide to Song Dingbo Catches a Ghost (宋定伯捉鬼). Because the tale circulates through older zhiguai traditions, the page keeps attribution cautious.",
    editor: "Midnight Archive Editorial Desk",
    lastReviewed: "2026-07-06",
    category: "Six Dynasties zhiguai",
    mood: "night road / wit / reversal",
    readingTime: "5 min",
    coverTone: "teal",
    tags: ["zhiguai", "wit", "version note"],
    summary:
      "Song Dingbo meets a ghost on the road and refuses to let fear set the terms. By asking questions, he turns the unknown into a negotiable opponent.",
    paragraphs: [
      "Song Dingbo Catches a Ghost (宋定伯捉鬼) is built like a small mechanism. A traveler meets a ghost, and the night seems to belong to the supernatural at once.",
      "Song Dingbo's advantage is not force. It is composure. Instead of freezing, fleeing, or accepting the ghost's mystery, he begins to ask questions.",
      "The questions matter because they make the ghost enter human language. Once the ghost explains how it moves, what it fears, and what its limits are, it stops being pure darkness.",
      "This is one of the pleasures of early zhiguai: a brief tale can reverse power with astonishing economy. The unknown becomes rule-bound, and rules can be used.",
      "The story is not modern detective fiction, but it shares one durable insight with it. Naming conditions changes the situation. Fear becomes smaller when it is forced to answer.",
      "For this archive, the page also carries a source lesson. Older short tales often travel through collections, retellings, and variant attributions. A responsible English guide should show that uncertainty rather than pretending every path is settled.",
      "The English title keeps the directness of the tradition. The tale does not need decoration. Its wit lies in how quickly a ghost can become awkward once the human traveler refuses to be only frightened.",
      "Placed in the night-road route, Song Dingbo gives readers a brisk counterpoint to ruined-temple and old-house stories. The road is dangerous, but language can still keep a person upright."
    ],
    notes: [
      "Attribution and version details should be checked again before using this page as a scholarly source.",
      "Useful as a method page for how the archive handles traditional-source uncertainty."
    ]
  },
  {
    slug: "seed-pear",
    title: "Seed Pear: How a Tree Grows from a Sleeve",
    deck:
      "A street-side wonder about a pear, a stingy seller, and the way small selfishness becomes public comedy.",
    sourceBook: "Strange Tales from a Chinese Studio (Liaozhai zhiyi, 聊斋志异)",
    sourceTitle: "种梨 (Seed Pear)",
    originalAuthor: "Pu Songling (蒲松龄)",
    era: "Qing dynasty",
    sourceUrl: liaozhaiSourceUrl,
    sourceRights: commonLiaozhaiRights,
    editorialMode:
      "Original English editorial translation, retelling, and fable-like reading guide",
    translatorNote:
      "This is an original English editorial guide to Seed Pear (种梨). It keeps the street-performance energy of the tale while reading the wonder as social satire.",
    editor: "Midnight Archive Editorial Desk",
    lastReviewed: "2026-07-06",
    category: "Street magic",
    mood: "market / illusion / public laughter",
    readingTime: "5 min",
    coverTone: "ivory",
    tags: ["Liaozhai", "illusion", "fable"],
    summary:
      "A performer asks a pear seller for fruit and is refused. Before the crowd, he plants a pear seed and makes a tree appear, turning ordinary stinginess into spectacle.",
    paragraphs: [
      "Seed Pear (种梨) is light on the surface, and that lightness is part of its craft. A market, a pear, a performer, a seller, and a crowd are enough.",
      "The seller's fault is not grand evil. It is ordinary tight-fistedness, the kind of small refusal a marketplace can absorb every day without becoming a tragedy.",
      "The performer changes the scale. By making a tree grow in public, he turns a private calculation into a shared event. The street becomes a theater where stinginess is made visible.",
      "Pu Songling often understands that satire does not always need a villain large enough for history. Sometimes a small selfishness, placed under the right light, reveals a whole social mood.",
      "The wonder itself should be allowed to remain graceful. A seed, a tree, fruit, and astonishment: the tale gives the reader the pleasure of impossible growth before the joke closes.",
      "For English readers, the story works as a short fable without losing its local texture. It belongs to markets, crowds, and the quick moral weather of public life.",
      "It also pairs well with The Taoist of Laoshan. One story shows a man who wants magic without discipline; the other shows a magician using wonder to expose a very ordinary human habit.",
      "The archive needs pieces like this. They keep the strange from becoming monotonously dark and prove that a brief tale can still carry source, scene, and editorial value."
    ],
    notes: [
      "A later version could add a short note on market crowds and public performance in strange-tale narration.",
      "Best used in gentle, satire, and object/surface routes."
    ]
  },
  {
    slug: "qingfeng",
    title: "Qingfeng: Recognition in the Lamplight of a Fox House",
    deck:
      "A fox-woman tale where love is not simply an encounter, but a negotiation with family, fear, and exposed identity.",
    sourceBook: "Strange Tales from a Chinese Studio (Liaozhai zhiyi, 聊斋志异)",
    sourceTitle: "青凤 (Qingfeng)",
    originalAuthor: "Pu Songling (蒲松龄)",
    era: "Qing dynasty",
    sourceUrl: liaozhaiSourceUrl,
    sourceRights: commonLiaozhaiRights,
    editorialMode:
      "Original English editorial translation, retelling, and fox-woman character guide",
    translatorNote:
      "This is an original English editorial guide to Qingfeng (青凤). It reads the romance through household space, kinship pressure, and the risk of recognition.",
    editor: "Midnight Archive Editorial Desk",
    lastReviewed: "2026-07-06",
    category: "Fox house lamplight",
    mood: "old house / fox kin / difficult love",
    readingTime: "8 min",
    coverTone: "jade",
    tags: ["Liaozhai", "fox woman", "old house"],
    summary:
      "A scholar enters the space of a fox family and meets Qingfeng. Affection does not erase fear; it has to move through family power and the danger of being known.",
    paragraphs: [
      "Qingfeng (青凤) has the materials of romance: an old house, lamplight, a hidden family, and a woman whose identity crosses the human boundary.",
      "But the tale is richer when it is not treated as an easy encounter. The fox household is not a decorative setting. It is a social world with elders, rules, and fears of its own.",
      "Qingfeng is not only a beloved figure; she belongs to a kinship system. That means affection must pass through more than private feeling. It has to survive exposure.",
      "The human scholar's desire is therefore tested by knowledge. It is one thing to love a mysterious woman in the glow of secrecy, another to remain when the structure around her becomes visible.",
      "Pu Songling often gives fox figures both charm and social gravity. They are not merely interruptions of human life. They bring their own households, debts, loyalties, and vulnerabilities.",
      "For English readers, the tale offers a useful correction to the generic phrase fox spirit. Qingfeng is not a type. She is a person in a narrative situation, and the pressure of that situation matters.",
      "The old house makes the story feel intimate and unsafe at once. Walls protect meetings, but they also hold family authority. Lamplight reveals, but it never reveals without risk.",
      "In the archive's character route, Qingfeng stands between Yingning's bright resistance and Nie Xiaoqian's dangerous escape. She shows how love in strange tales often has to negotiate with a whole unseen household."
    ],
    notes: [
      "This page should keep the fox-family setting visible rather than reducing the story to romance.",
      "Pairs naturally with Yingning, Xiangyu, Nie Xiaoqian, and night/old-house routes."
    ]
  },
  {
    slug: "xiangyu",
    title: "Xiangyu: The Flower Spirit Who Remembers a Promise",
    deck:
      "A tender Liaozhai story in which flowers are not background but living vessels of memory, grief, and return.",
    sourceBook: "Strange Tales from a Chinese Studio (Liaozhai zhiyi, 聊斋志异)",
    sourceTitle: "香玉 (Xiangyu)",
    originalAuthor: "Pu Songling (蒲松龄)",
    era: "Qing dynasty",
    sourceUrl: liaozhaiSourceUrl,
    sourceRights: commonLiaozhaiRights,
    editorialMode:
      "Original English editorial translation, retelling, and flower-spirit reading guide",
    translatorNote:
      "This is an original English editorial guide to Xiangyu (香玉). It emphasizes the tale's floral imagery and emotional memory rather than treating the spirit as a simple marvel.",
    editor: "Midnight Archive Editorial Desk",
    lastReviewed: "2026-07-06",
    category: "Flower-spirit vow",
    mood: "garden / memory / tender strangeness",
    readingTime: "8 min",
    coverTone: "ivory",
    tags: ["Liaozhai", "flower spirit", "gentle strange tale"],
    summary:
      "Xiangyu is bound to flowers, and the tale lets affection follow the rhythms of bloom, loss, and remembrance. Its strangeness is quiet, floral, and deeply felt.",
    paragraphs: [
      "Xiangyu (香玉) is one of the archive's gentlest doorways into Liaozhai. It does not depend on terror. It asks the reader to imagine that flowers can remember.",
      "The flower spirit is not a metaphor that cancels the story's literal wonder. She is both person and blossom, feeling and plant, presence and seasonal vulnerability.",
      "That double existence gives the tale its tenderness. To care for Xiangyu is also to care for the living sign of her being. Emotion is not abstract; it has a stem, a color, a season, and a risk of withering.",
      "Pu Songling often lets nonhuman figures expose human failure, but here the emphasis falls on memory and promise. The question is not whether the spirit is real enough. It is whether human attention is faithful enough.",
      "For English readers, the story may feel delicate, but delicacy should not be confused with thinness. The page needs to hold the relation between love, botany, mourning, and return.",
      "Xiangyu also helps balance the fox-woman route. Not every uncanny woman in Liaozhai is written through seduction or danger. Some figures enter the archive through fragrance, patience, and the ache of preservation.",
      "The garden setting matters. It is an emotional archive: what grows there can be lost, tended, recognized, or forgotten. A flower is brief, but that brevity is why memory gathers around it.",
      "Placed beside Wang Liulang and Mountain Market, Xiangyu proves that gentle strange tales are not decorative pauses. They carry a different intensity, one that works through care rather than alarm."
    ],
    notes: [
      "This page belongs to both the fox/female-figure route and gentle strange tales.",
      "A later version could add a short motif note on flowers as memory-bearing beings in classical tales."
    ]
  },
  {
    slug: "cuzhi",
    title: "The Cricket: A Tiny Insect Under an Empire of Pressure",
    deck:
      "A devastating Liaozhai satire in which a cricket becomes the weight of official demand, household fear, and a family's fate.",
    sourceBook: "Strange Tales from a Chinese Studio (Liaozhai zhiyi, 聊斋志异)",
    sourceTitle: "促织 (Cuzhi / The Cricket)",
    originalAuthor: "Pu Songling (蒲松龄)",
    era: "Qing dynasty",
    sourceUrl: liaozhaiSourceUrl,
    sourceRights: commonLiaozhaiRights,
    editorialMode:
      "Original English editorial translation, retelling, and social-satire reading guide",
    translatorNote:
      "This is an original English editorial guide to The Cricket (促织). It reads the insect as a pressure point where official demand and family terror meet.",
    editor: "Midnight Archive Editorial Desk",
    lastReviewed: "2026-07-06",
    category: "Small creature, large fate",
    mood: "tax / fear / household pressure",
    readingTime: "9 min",
    coverTone: "crimson",
    tags: ["Liaozhai", "satire", "social pressure"],
    summary:
      "A cricket is made to carry impossible importance by orders from above. The tale's cruelty lies in how a small creature becomes the measure of a family's survival.",
    paragraphs: [
      "The Cricket (促织) is not really about an insect. It is about a system that can make an insect larger than a human life.",
      "The demand comes from above, but its pain settles below: in a household, in a parent's fear, in the search for a tiny creature that has become an official necessity.",
      "Pu Songling's satire is cold because the absurdity is not free-floating. The premise may look strange, but the mechanism is familiar. Power turns desire into order; order turns downward into panic.",
      "The cricket itself becomes a terrible object. It is small enough to lose, fragile enough to die, and important enough to crush an entire family under expectation.",
      "For English readers, the story should be read with attention to scale. The disproportion is the point. A minor courtly pleasure becomes a village disaster because the chain of command has no proportion.",
      "The tale also resists easy comfort. Even moments of marvel do not erase the pressure that created them. Wonder appears inside a damaged social field, not above it.",
      "This page belongs at the center of the satire route. It shows that Liaozhai's sharpest social writing does not always need direct accusation. It can let one small chirping creature reveal the cruelty of an order.",
      "The English guide should keep the emotional center in the family. Without that household fear, the cricket becomes a curiosity. With it, the tale becomes one of Pu Songling's strongest examples of worldly pressure made strange."
    ],
    notes: [
      "This page should avoid making the cricket merely symbolic; the story's force comes from the concrete pressure around it.",
      "Pairs with Luocha Haishi, Jiangcheng, Seed Pear, and The Taoist of Laoshan in the satire route."
    ]
  },
  {
    slug: "luocha-haishi",
    title: "Luocha Haishi: When Beauty Turns Upside Down",
    deck:
      "A strange-seas satire where standards of beauty reverse, forcing a traveler to ask who defines ugliness, dignity, and success.",
    sourceBook: "Strange Tales from a Chinese Studio (Liaozhai zhiyi, 聊斋志异)",
    sourceTitle: "罗刹海市 (Luocha Haishi)",
    originalAuthor: "Pu Songling (蒲松龄)",
    era: "Qing dynasty",
    sourceUrl: liaozhaiSourceUrl,
    sourceRights: commonLiaozhaiRights,
    editorialMode:
      "Original English editorial translation, retelling, and aesthetic-reversal reading guide",
    translatorNote:
      "This is an original English editorial guide to Luocha Haishi (罗刹海市). It keeps the pinyin title because the place-name is part of the tale's strangeness.",
    editor: "Midnight Archive Editorial Desk",
    lastReviewed: "2026-07-06",
    category: "Foreign-land satire",
    mood: "sea market / reversed beauty / estrangement",
    readingTime: "9 min",
    coverTone: "teal",
    tags: ["Liaozhai", "sea market", "aesthetic reversal"],
    summary:
      "Ma Ji enters a foreign realm where beauty and ugliness no longer follow familiar rules. The wonder becomes satire when social value itself turns inside out.",
    paragraphs: [
      "Luocha Haishi (罗刹海市) sends its traveler into a world where the mirror no longer agrees with home. Standards that seemed natural are suddenly provincial.",
      "The reversal of beauty and ugliness is comic at first, but the comedy has teeth. If a whole society rewards what another society despises, then appearance is not as stable as it pretends to be.",
      "Ma Ji's journey is therefore not only geographical. It is an estrangement from the judgments that once organized his confidence, embarrassment, and ambition.",
      "Pu Songling uses the foreign realm as a satirical device. By moving standards elsewhere, he reveals how arbitrary and coercive standards can be everywhere.",
      "For English readers, the tale should not be reduced to exotic spectacle. The point is not that the other land is strange in a simple sense. The point is that strangeness returns to judge the reader's own world.",
      "The sea market also matters as a threshold space. It suggests trade, display, and exchange, a place where value is performed and negotiated rather than simply discovered.",
      "The best reading keeps the story's humor alive while noticing its discomfort. A person who succeeds under reversed standards may feel triumphant and diminished at the same time.",
      "In the archive, Luocha Haishi belongs with stories of satire and worldly pressure. It asks how much of identity depends on the crowd that happens to be looking."
    ],
    notes: [
      "The pinyin title is retained because the place-name carries genre atmosphere and cultural specificity.",
      "Pairs well with The Cricket and Jiangcheng as stories about social judgment."
    ]
  },
  {
    slug: "kao-chenghuang",
    title: "Examination for City God: Another Test After Death",
    deck:
      "A quietly absurd underworld tale that extends the examination life of the scholar into the world after death.",
    sourceBook: "Strange Tales from a Chinese Studio (Liaozhai zhiyi, 聊斋志异)",
    sourceTitle: "考城隍 (Examination for City God)",
    originalAuthor: "Pu Songling (蒲松龄)",
    era: "Qing dynasty",
    sourceUrl: liaozhaiSourceUrl,
    sourceRights: commonLiaozhaiRights,
    editorialMode:
      "Original English editorial translation, retelling, and examination-underworld reading guide",
    translatorNote:
      "This is an original English editorial guide to Examination for City God (考城隍). It reads the underworld test through examination culture and official imagination.",
    editor: "Midnight Archive Editorial Desk",
    lastReviewed: "2026-07-06",
    category: "Underworld examination",
    mood: "exam hall / city god / afterlife office",
    readingTime: "7 min",
    coverTone: "violet",
    tags: ["Liaozhai", "examination", "underworld"],
    summary:
      "A man dies and still finds himself facing an examination. The joke is gentle, but it understands how deeply examination shaped the scholar's sense of fate.",
    paragraphs: [
      "Examination for City God (考城隍) begins from an almost comic extension of a scholar's life: even after death, there may be another test.",
      "The underworld here is not only a place of punishment. It is an administrative space, complete with offices, ranks, and procedures that resemble the living world.",
      "That resemblance is the point. Pu Songling imagines death not as escape from worldly structures, but as a place where those structures return in altered form.",
      "The examination carries both absurdity and pathos. For a reader shaped by examination culture, the test is not merely a plot device. It is a way of measuring destiny.",
      "The title's calmness is part of the tale's charm. To be examined for a city-god post sounds strange, but the system around it feels bureaucratically plausible.",
      "For English readers, the page should briefly explain that the civil examination world was not just education. It organized ambition, family hope, status, and failure.",
      "Read beside Xi Fangping, the tale shows another face of the underworld. One story imagines petitions and injustice; this one imagines recruitment, office, and merit after death.",
      "The archive uses the tale to build an underworld route that is not only dark. The afterlife can be terrifying, comic, procedural, and painfully familiar all at once."
    ],
    notes: [
      "This page benefits from a concise explanation of examination culture for English readers.",
      "Pairs with Xi Fangping and Lu Pan in the underworld route."
    ]
  },
  {
    slug: "jiangcheng",
    title: "Jiangcheng: A Marriage Fable with Teeth",
    deck:
      "A difficult Liaozhai marriage tale that should not be flattened into a comic 'shrew' story; its real subject is power inside the household.",
    sourceBook: "Strange Tales from a Chinese Studio (Liaozhai zhiyi, 聊斋志异)",
    sourceTitle: "江城 (Jiangcheng)",
    originalAuthor: "Pu Songling (蒲松龄)",
    era: "Qing dynasty",
    sourceUrl: liaozhaiSourceUrl,
    sourceRights: commonLiaozhaiRights,
    editorialMode:
      "Original English editorial translation, retelling, and marriage-power reading guide",
    translatorNote:
      "This is an original English editorial guide to Jiangcheng (江城). It avoids treating the tale as a simple joke about a fierce wife and instead reads its household power dynamics.",
    editor: "Midnight Archive Editorial Desk",
    lastReviewed: "2026-07-06",
    category: "Marriage anomaly",
    mood: "household / power / difficult comedy",
    readingTime: "8 min",
    coverTone: "amber",
    tags: ["Liaozhai", "marriage", "household"],
    summary:
      "Jiangcheng is forceful enough to dominate the story around her. The more interesting reading asks who has the right to define, discipline, or remake another person in marriage.",
    paragraphs: [
      "Jiangcheng (江城) is easy to mishandle. A thin reading turns it into a joke about a difficult wife. A better reading asks why the household becomes a battlefield of definition.",
      "The character's force is undeniable, but force alone is not interpretation. The tale is interested in marriage as a place where temperament, authority, fear, and correction all press against one another.",
      "Pu Songling's domestic stories can be sharp because the home is not a refuge from power. It is one of power's most intimate theaters.",
      "Jiangcheng's strength disturbs expectations, and that disturbance can tempt readers to laugh too quickly. The archive should slow the laugh down long enough to notice what it is doing.",
      "Who gets called excessive? Who gets corrected? Who benefits when a household is declared disordered? These questions make the tale more durable than a stock caricature.",
      "For English readers, the guide should keep historical distance without using that distance as an excuse to flatten the woman at the center. The point is not to modernize her into comfort, but to read the pressure clearly.",
      "The story also belongs to the satire route because household life is part of worldly pressure. Public status and private order are not separate in Liaozhai; they echo each other.",
      "Jiangcheng may not be gentle, but she is useful. She forces the archive to admit that strange tales about marriage can be ethically awkward, socially revealing, and worth reading precisely because they resist easy sympathy."
    ],
    notes: [
      "This page should avoid using misogynistic shorthand as an explanatory frame.",
      "Pairs with Yingning and Luocha Haishi around social judgment, gendered expectation, and household order."
    ]
  },
  {
    slug: "ganjiang-moye",
    title: "Ganjiang and Moye: Swords, Names, and the Memory of Revenge",
    deck:
      "An old sword legend about command, sacrifice, revenge, and how names survive violence by entering story.",
    sourceBook: "Zhiguai tradition associated with Soushen ji (搜神记相关志怪传统)",
    sourceTitle: "干将莫邪 (Ganjiang and Moye)",
    originalAuthor: "Traditional zhiguai text; associated with Gan Bao (干宝)",
    era: "Eastern Jin tradition",
    sourceUrl: souShenSourceUrl,
    sourceRights: commonZhiguaiRights,
    editorialMode:
      "Original English editorial retelling, legend-motif guide, and version-check note",
    translatorNote:
      "This is an original Midnight Archive English retelling and guide to Ganjiang and Moye (干将莫邪). It treats the tale as a public-domain legend tradition and keeps version-check caution visible.",
    editor: "Midnight Archive Editorial Desk",
    lastReviewed: "2026-07-06",
    category: "Famous swords and revenge",
    mood: "forge / command / remembered names",
    readingTime: "8 min",
    coverTone: "crimson",
    tags: ["Soushen ji", "swords", "revenge"],
    summary:
      "The legend of Ganjiang and Moye is not only about swords. It is about how violence, craft, family, and revenge become attached to names that refuse to disappear.",
    paragraphs: [
      "Ganjiang and Moye (干将莫邪) belongs to an older legendary current than the Liaozhai tales, and it carries a different weight. The world is harder, more ancestral, more bound to command and revenge.",
      "The swords are famous, but they are not ordinary objects. They concentrate labor, danger, royal power, and the cost of obedience into metal.",
      "A ruler's command is at the center of the story's violence. The making of a weapon is never simply craft when power demands it and death waits behind the demand.",
      "The names Ganjiang and Moye survive because the tale binds them to memory. A sword can be hidden, inherited, drawn, or lost; a name can move through retelling.",
      "The revenge pattern should not be treated as simple excitement. It is a way for a damaged moral order to answer itself when ordinary justice is unavailable.",
      "For English readers, this page should keep the source note cautious. The legend appears in traditional materials and later retellings, and a future scholarly version should compare variants.",
      "As an archive piece, Ganjiang and Moye opens the object route beyond Liaozhai. It shows how a thing can hold human intention, family grief, and political terror all at once.",
      "The story's force is not only in bloodshed. It is in the sense that certain names become impossible to silence once they are attached to an object made under unbearable pressure."
    ],
    notes: [
      "This page keeps a version-check note because the legend circulates through multiple traditional forms.",
      "Best paired with Painted Skin, Lu Pan, and Seed Pear in the object/surface route."
    ]
  },
  {
    slug: "hanping-fufu",
    title: "Han Ping and His Wife: Twin Tombs and the Tree of Longing",
    deck:
      "A tragic legend in which private love, political force, death, and trees become one of the old world's ways of remembering grief.",
    sourceBook: "Zhiguai tradition associated with Soushen ji (搜神记相关志怪传统)",
    sourceTitle: "韩凭夫妇 (Han Ping and His Wife)",
    originalAuthor: "Traditional zhiguai text; associated with Gan Bao (干宝)",
    era: "Eastern Jin tradition",
    sourceUrl: souShenSourceUrl,
    sourceRights: commonZhiguaiRights,
    editorialMode:
      "Original English editorial retelling, tragic-motif guide, and version-check note",
    translatorNote:
      "This is an original Midnight Archive English retelling and guide to Han Ping and His Wife (韩凭夫妇). It focuses on the legend's transformation of grief into landscape and memory.",
    editor: "Midnight Archive Editorial Desk",
    lastReviewed: "2026-07-06",
    category: "Twin tombs and longing",
    mood: "love / coercion / remembered grief",
    readingTime: "8 min",
    coverTone: "amber",
    tags: ["Soushen ji", "love legend", "longing tree"],
    summary:
      "Han Ping and his wife are separated by power, but the legend reunites them through tombs, trees, and folk memory. The landscape becomes the form grief takes after death.",
    paragraphs: [
      "Han Ping and His Wife (韩凭夫妇) is a love legend shaped by coercion. It begins from a private bond and a public power strong enough to violate it.",
      "The tragedy would be bleak if it ended only in separation. What makes the story memorable is the way grief refuses to remain private or silent.",
      "Twin tombs, trees, and the image of joined longing transform the lovers' suffering into landscape. The earth itself becomes an archive of the wrong done to them.",
      "This movement from human grief to natural sign is central to many old legends. A tree can stand where testimony fails. It can grow after the court, the ruler, and the household have finished speaking.",
      "For English readers, the tale should be presented carefully. It is not only a romance, and not only a ghostly marvel. It is a story about power, memory, and the folk imagination's need to repair separation symbolically.",
      "The word longing matters. The legend does not undo death, but it gives grief a visible form that can be revisited and retold.",
      "Placed beside Xiangyu, the tale deepens the archive's gentle route. Both stories let plants hold memory, but Han Ping's world is harsher, marked by political force and irreversible loss.",
      "The page should keep its version note visible because older legends often exist in several transmitted forms. The archive's role is to guide readers transparently, not to pretend every branch of the story has already been settled."
    ],
    notes: [
      "This page belongs to gentle strange tales, but its gentleness is tragic rather than soft.",
      "A future version should compare transmitted forms and identify the specific source passage more precisely."
    ]
  }
];

export const englishThemeCollections = [
  {
    slug: "fox-and-female-figures",
    title: "Fox Spirits, Ghost Women, and Difficult Agency",
    deck:
      "From Yingning and Nie Xiaoqian to Qingfeng, Xiangyu, Painted Skin, and Jiangcheng: uncanny women are never one simple type.",
    description:
      "This route keeps female and uncanny figures from being flattened into one romantic type. Some are trapped, some resist explanation, some belong to nonhuman households, and some expose how beauty, marriage, or social judgment can become a pressure system.",
    tone: "jade",
    storySlugs: ["yingning", "nie-xiaoqian", "qingfeng", "xiangyu", "painted-skin", "jiangcheng"],
    editorialNote:
      "Use this route as the English character index, with notes that return readers to the public-domain source rather than later protected adaptations."
  },
  {
    slug: "underworld-and-justice",
    title: "Underworld and Justice",
    deck:
      "Xi Fangping, Lu Pan, and Examination for City God show an afterlife full of courts, offices, examinations, and unsettling authority.",
    description:
      "Underworld stories are not only about ghosts. They ask whether justice can survive office, hierarchy, punishment, delay, examination, and arbitrary power. The route moves from complaint to body-change to official recruitment after death.",
    tone: "violet",
    storySlugs: ["xifangping", "lu-pan", "kao-chenghuang"],
    editorialNote:
      "This route should eventually gain short glossary entries for city gods, judges, clerks, petitions, and examination culture."
  },
  {
    slug: "gentle-strange-tales",
    title: "Gentle Strange Tales",
    deck:
      "Wang Liulang, Xiangyu, Seed Pear, Mountain Market, and Han Ping and His Wife keep the archive tender without making it harmless.",
    description:
      "This route balances the archive's darker cases with loyalty, flowers, market wonder, visionary landscape, and tragic memory. The uncanny does not always arrive to devour someone; sometimes it preserves a promise or lets the world briefly open.",
    tone: "ivory",
    storySlugs: ["wang-liulang", "xiangyu", "seed-pear", "mountain-market", "hanping-fufu"],
    editorialNote:
      "Keep this route visible for new readers who want literary strangeness without a purely horror-driven entry point."
  },
  {
    slug: "satire-and-worldly-pressure",
    title: "Satire and Worldly Pressure",
    deck:
      "The Cricket, The Taoist of Laoshan, Seed Pear, Luocha Haishi, and Jiangcheng turn worldly pressure into strange-tale form.",
    description:
      "Pu Songling's satire often turns human impatience, vanity, official demand, aesthetic standards, and household order into visible absurdity. This route keeps the social bite of the tales close to the reading experience.",
    tone: "amber",
    storySlugs: ["cuzhi", "laoshan-daoshi", "seed-pear", "luocha-haishi", "jiangcheng"],
    editorialNote:
      "This route is useful for showing that the English edition is not only translating atmosphere; it is preserving the stories' social intelligence."
  },
  {
    slug: "objects-and-legends",
    title: "Objects, Surfaces, and Legends",
    deck:
      "Swords, skins, altered bodies, and impossible fruit make hidden pressure visible.",
    description:
      "Objects in strange tales are not ordinary props. Swords hold command and revenge, a painted skin turns surface into danger, altered bodies raise questions about identity, and a pear tree makes small selfishness visible in public.",
    tone: "crimson",
    storySlugs: ["ganjiang-moye", "lu-pan", "painted-skin", "seed-pear"],
    editorialNote:
      "This route can later seed a wider object archive: swords, mirrors, seals, lamps, skins, and tools as carriers of story."
  },
  {
    slug: "night-road-and-old-house",
    title: "Night Roads, Ruined Temples, and Old Houses",
    deck:
      "Song Dingbo, Nie Xiaoqian, Qingfeng, The Taoist of Laoshan, and Mountain Market show how place tests fear, desire, and attention.",
    description:
      "This route organizes the uncanny by scene: night road, ruined temple, old house, mountain, and distant vision. Place is never passive in these tales; it changes what people dare to ask, trust, desire, or see.",
    tone: "teal",
    storySlugs: ["song-dingbo", "nie-xiaoqian", "qingfeng", "laoshan-daoshi", "mountain-market"],
    editorialNote:
      "This route is the best home for scene-driven navigation and future short glossary notes on ruined temples, old houses, roads, mountains, and thresholds."
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
  ],
  yingning: [
    "A fuller version should trace the changing function of laughter: first as charm, then as social disruption, then as something household order tries to interpret or contain.",
    "Yingning should remain partly unresolved. Over-explaining her would damage the tale's strongest effect: the sense that her brightness is also a form of resistance.",
    "The page can later add a comparison with Nie Xiaoqian and Qingfeng to show three different ways Liaozhai writes uncanny women entering human order.",
    "A useful expansion would create a laughter timeline. It could mark where the laugh feels free, where it embarrasses others, where it becomes socially dangerous, and where silence begins to matter.",
    "For English readers, the key is to avoid turning Yingning into a simple symbol of natural innocence. The tale is more interesting when innocence, knowledge, and refusal remain braided together.",
    "The guide can also explain why brightness deserves close reading. A cheerful surface in Liaozhai may still carry social difficulty, and Yingning's laughter becomes most revealing when it moves from open air into the managed space of family life."
  ],
  "mountain-market": [
    "A visual sequence would suit this page: distant form, sharpening detail, city-like fullness, and disappearance. The structure matters more than plot summary.",
    "Any note on mirage or atmospheric illusion should stay modest. The literary experience depends on wonder surviving explanation.",
    "This tale is a strong low-horror entry point because it proves that strangeness can be spacious, quiet, and observational.",
    "A later page could use short section headings for each visual stage rather than adding heavy commentary. The point is to let readers feel the city forming and dissolving.",
    "Mountain Market is also a good place to explain the archive's editorial method for very short classical pieces. A short source text still deserves context, pacing, and a reason to keep reading.",
    "The English page should resist padding the story with invented drama. Its strength lies in disciplined attention: who watches, what appears, how detail accumulates, and why disappearance leaves a stronger impression than possession.",
    "A useful sidebar could invite readers to notice scale: mountain, city, building, people, and then nothing. That shrinking and vanishing sequence is the entire emotional movement of the tale."
  ],
  "lu-pan": [
    "The key question for an expanded page is not simply what Lu Pan changes, but who has consent, who receives benefit, and who bears consequence.",
    "The tale can connect to examination and class anxiety: talent is treated almost like a removable organ, something fate or power might redistribute.",
    "A later object/body route could pair Lu Pan with Painted Skin: one tale wears a surface, the other surgically rewrites the self.",
    "The guide should also keep Zhu Erdan's desire visible. The story is not only about supernatural power acting on him; it is about the human wish to become socially legible through sudden improvement.",
    "Lu Pan's friendliness is part of the problem. If he were only monstrous, the ethics would be easy. The tale unsettles because warmth and arbitrary power can occupy the same figure.",
    "A fuller reading should also notice how improvement is measured. The tale assumes a world where talent, beauty, and marriage prospects are social currencies, so supernatural surgery becomes a grotesque shortcut through very ordinary ambitions."
  ],
  "song-dingbo": [
    "This page should keep its version note visible. Older zhiguai tales often move through several collections and attributions, so certainty has to be earned.",
    "The reading can center on questions as a defensive method. Song Dingbo wins by forcing the ghost to become rule-bound and therefore vulnerable.",
    "A compact glossary note on zhiguai would help English readers understand the tale's brevity and mechanical elegance.",
    "A fuller version could chart each exchange as a tactical step: naming identity, learning rules, testing weight, discovering weakness, and converting terror into advantage.",
    "The story is also useful for readers who expect ghost tales to be atmospheric. Here the atmosphere is stripped down so that wit and rule-discovery can do the narrative work.",
    "Because the plot is brief, the English page needs to supply editorial value through structure rather than length alone. It should show how each question reduces uncertainty and how the final reversal depends on information gathered calmly.",
    "A later version could also compare this tale with other night-road stories where speech matters. Some travelers survive by ritual or strength; Song Dingbo survives because he keeps the conversation under control."
  ],
  "seed-pear": [
    "The market crowd is important. The wonder is not private magic but a public exposure of a small social habit.",
    "This page can stay short while still being substantial if it keeps scene, satire, and object logic clearly separated.",
    "Seed Pear links three routes at once: gentle wonder, social satire, and objects made strange.",
    "A later version could slow down the crowd's role. The spectators are not just decoration; they turn the trick into public judgment and make the seller's refusal impossible to hide.",
    "The pear tree should remain delightful. Satire works better here when the impossible growth is genuinely charming before the reader notices how precisely the charm has exposed a fault.",
    "This story can also teach the site how to handle light pieces. The page should not inflate the fable into heavy doctrine, but it can still give enough scene, social context, and source transparency to avoid thinness.",
    "The ending works best when the reader can feel both amusement and discomfort. The trick is funny, but the laughter depends on watching a petty refusal return in a form too large to ignore.",
    "That balance is why the page should be playful without becoming trivial."
  ],
  qingfeng: [
    "An expanded version should map the fox household rather than focusing only on the lovers. Kinship pressure is central to the tale's shape.",
    "Qingfeng works well as a corrective to generic fox-spirit language. The guide should insist on her particular situation and obligations.",
    "The old-house setting can become a scene glossary entry later, linking Qingfeng to ruined temples, night roads, and other threshold spaces.",
    "The page should also ask what recognition costs. To know Qingfeng more fully is not only to solve a mystery; it is to enter the risk carried by her family and form of life.",
    "A later character index could compare Qingfeng's obligations with Yingning's partial wildness and Nie Xiaoqian's constrained agency. That comparison would make the route feel curated rather than merely grouped.",
    "The English page can also explain why fox-house stories are not only tales of seduction. They often ask how human desire behaves when it discovers that the beloved comes with another kinship order and another set of fears.",
    "That makes Qingfeng a strong route page rather than a standalone romance. Her story helps the archive show that nonhuman households can have their own ethics, dangers, and claims on loyalty."
  ],
  xiangyu: [
    "The flower should be treated as both literal presence and emotional vessel. Reducing it to a symbol would flatten the tale.",
    "A later version could compare Xiangyu with Han Ping and His Wife: both let plants hold memory, but one is tender and one is tragic.",
    "This page helps keep the English edition tonally varied, especially for readers who enter through gentle strange tales.",
    "The guide can add a short paragraph on care. In this tale, affection is not only feeling but attention to the fragile conditions under which a beloved presence survives.",
    "Xiangyu is also useful for resisting a narrow definition of the supernatural. The strange does not have to attack, deceive, or judge; it can bloom, fade, and ask to be remembered.",
    "For long-term expansion, Xiangyu could anchor a small botanical route: flowers, trees, fragrance, seasonal loss, and the way plant life lets classical tales imagine memory outside human speech.",
    "The English guide should keep the prose gentle but not vague. Xiangyu needs concrete details of care, bloom, loss, and return so that tenderness feels earned rather than merely atmospheric."
  ],
  cuzhi: [
    "An expanded page should keep scale at the center: a tiny cricket becomes unbearable because official desire travels downward without proportion.",
    "The household perspective matters. Without family fear, the story risks becoming a curiosity about courtly taste rather than social pressure.",
    "This is one of the strongest satire pages for showing that Liaozhai's monsters are sometimes administrative rather than supernatural.",
    "A later version could map the chain of pressure from ruler to official to local household. That map would show how absurdity becomes practical terror at the lowest level.",
    "The cricket itself should remain vividly small. The more delicate the creature feels, the more grotesque the surrounding system becomes.",
    "The English guide should also name the emotional movement from absurdity to dread. At first the premise can seem comic; then the reader feels how quickly a whim from above becomes a household emergency.",
    "A later version could add a short note on cricket fighting and elite taste, but the main page should stay with the family. Social history should clarify the pressure, not distract from it."
  ],
  "luocha-haishi": [
    "The route through reversed beauty should not become a simple exotic joke. The satire works because it returns judgment to the reader's own world.",
    "A later page can add a short note on sea markets and foreign-land imagination without treating the setting as mere fantasy geography.",
    "This story pairs well with Jiangcheng and The Cricket because all three ask how social standards remake private life.",
    "The guide should keep Ma Ji's unstable self-image visible. He is not merely observing a strange society; he is being revalued by it, and that revaluation changes how he understands himself.",
    "A useful expansion would compare visible beauty with social usefulness. The tale's comedy depends on the fact that a body can become valuable or ridiculous when the judging crowd changes.",
    "The guide can later add a note on estrangement as satire. By sending the traveler elsewhere, Pu Songling makes familiar judgments look constructed, temporary, and faintly absurd rather than natural.",
    "The English title keeps the pinyin place-name because translation alone would dull the foreignness. The page can explain the title while letting the name remain a threshold into the tale.",
    "Keeping that threshold visible helps readers feel the satire before they reduce it to a lesson."
  ],
  "kao-chenghuang": [
    "A concise note on civil examination culture would make this page much clearer for English readers without overloading the story.",
    "The underworld here is procedural rather than purely punitive. That makes it a useful companion to Xi Fangping's darker court system.",
    "Future glossary links could explain city gods, office-holding after death, and why bureaucratic afterlives recur in Liaozhai.",
    "The humor should stay gentle but edged. The idea of another exam after death is funny because it feels absurdly excessive; it is painful because it feels socially believable.",
    "A fuller page could explain that the city god is not just a ghostly title but part of a local religious and administrative imagination. That context makes the examination feel less random.",
    "The story also helps English readers understand why bureaucracy appears so often in Chinese strange tales. The supernatural world inherits the paperwork, rankings, and anxieties of the human one.",
    "A strong English version should balance explanation with pace. Too much institutional background would bury the joke, but too little would leave readers missing why an exam after death feels both ridiculous and painfully apt.",
    "The page can later include a simple note distinguishing city gods from generic ghosts. That one clarification would help readers understand why this is a tale of office, not only afterlife."
  ],
  jiangcheng: [
    "The page should avoid easy caricature. Jiangcheng is difficult, but that difficulty is exactly why the story can expose household power.",
    "An expanded reading can ask who receives the authority to name someone excessive and who benefits from that naming.",
    "This story should remain in both the female-figure route and satire route because marriage is treated as a social system, not only a private plot.",
    "The English guide should name discomfort without smoothing it over. Some classical domestic tales are ethically awkward; responsible reading means explaining the pressure rather than pretending it is harmless.",
    "A later route note could compare Jiangcheng with Yingning. Both stories involve women entering or disturbing household order, but their tones and moral problems are sharply different.",
    "The story also gives the English edition a chance to model careful framing. A page can acknowledge the historical tale's harsh gender assumptions while still reading its domestic power struggle with precision.",
    "That care matters because English readers may arrive with different assumptions about marriage tales. The guide should give enough context to read critically without pretending the story is morally tidy."
  ],
  "ganjiang-moye": [
    "The swords should be treated as memory-bearing objects. They concentrate craft, royal command, family grief, and revenge.",
    "Version-check notes are important here because Ganjiang and Moye circulate as a broader legend tradition, not only a single stable page.",
    "A later object route can compare these swords with Painted Skin's manufactured surface and Seed Pear's impossible tree.",
    "The expanded page should slow down the relation between making and violence. A weapon is crafted, but the command behind the craft already contains death.",
    "The tale also asks how names survive political force. Ganjiang and Moye are remembered not because power protected them, but because story carried them past power.",
    "For English readers, the page should explain why the legend feels older and harder than Liaozhai's domestic tales. Its world is closer to mythic command, ancestral memory, and revenge as the only available answer to broken justice.",
    "A later version should also keep Moye visible, not let the story become only a sword-maker's revenge. The paired names are part of how the legend remembers craft, marriage, and loss together.",
    "That paired memory is one reason the legend still feels larger than a weapon catalog."
  ],
  "hanping-fufu": [
    "The strongest expansion would focus on transformation from private grief to public landscape: tombs, trees, and retold memory.",
    "This page should explain longing without making the legend sentimental. The political force behind the tragedy must stay visible.",
    "It pairs naturally with Xiangyu, because both stories let plants remember what human institutions fail to protect.",
    "A later version could discuss why legends often let trees, birds, or tombs answer coercion. Nature becomes a witness when human institutions refuse justice.",
    "The page should keep its grief spare. The legend is powerful because it gives suffering a visible form without pretending that symbolic reunion cancels the violence that made reunion impossible.",
    "For the English archive, this story also broadens the meaning of gentle tales. Gentleness here is not comfort; it is the persistence of memory after coercion, and the refusal to let political violence have the final shape of the story.",
    "The page can later add a compact motif note on paired tombs and transformed plants. Such notes help English readers see how private tragedy becomes a public landmark in older legends."
  ]
};

export const englishStaticPages = [
  {
    slug: "about",
    title: "About",
    description: "About the English edition of Midnight Archive.",
    body:
      "<p>Midnight Archive is a bilingual editorial archive for public-domain Chinese strange tales. The first English wave now covers the full current story set, and each story page keeps a clear source, a rights note, and an original editorial translation or retelling.</p><p>The site does not copy modern protected translations. When public-domain or openly licensed references are used in the future, they should be identified clearly on the relevant page.</p>"
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
      "<p>Every English story page should identify the source text, original author or traditional attribution, era, rights note, editorial mode, and review date. Pages without a source do not belong in the publication queue.</p><p>The English edition favors source-led retellings, reading guides, and commentary over raw copying. Modern online stories, blog posts, social media posts, and paid material must not be reproduced without clear permission.</p><p>Chinese and English pages keep separate stable URLs, with /en/ used for the English edition and hreflang alternates connecting matching pages.</p>"
  },
  {
    slug: "sources",
    title: "Sources",
    description: "Source pool, rights notes, and use plan for the English edition.",
    body:
      "<p class=\"lead\">This page records the source pool used by the English edition. Story pages should keep their own source link and rights note so readers can verify where the material comes from.</p>"
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
