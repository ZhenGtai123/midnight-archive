# Project Memory

This repository is the working lab for building multiple high-quality content sites that can later be deployed and reviewed for AdSense. Keep new sites in this folder so the same generator, editorial rules, GitHub workflow, and quality checks can be reused.

## Owner And GitHub

- GitHub user: `ZhenGtai123`
- Repository: `https://github.com/ZhenGtai123/midnight-archive`
- GitHub Pages preview: `https://zhengtai123.github.io/midnight-archive/`
- Git remote currently uses SSH: `git@github.com:ZhenGtai123/midnight-archive.git`.
- Git identity on this computer:
  - `user.name`: `ZhenGtai123`
  - `user.email`: `1755061678@qq.com`

## Current Strategy

- Use `C:\app\adsense-sites-lab` as a multi-site publishing lab.
- Build one strong site first, then replicate the proven structure into new niches.
- Do not promise AdSense approval. Build toward review readiness: original editorial value, clear sourcing, policy pages, navigation, contact information, sitemap, RSS, and no copied modern copyrighted stories.
- Prefer public-domain texts, clearly licensed sources, interviews, link commentary, or original editorial writing.
- Modern online stories must not be copied unless permission is clear. Use commentary, summaries, interviews, or links instead.

## Active Site

- Slug: `midnight-archive`
- Name: `子夜故事档案馆`
- Topic: public-domain Chinese strange tales, source-led retellings, editorial reading notes.
- Current content shape: 18 substantial story pages and 6 themed reading routes.
- English edition: independent `/en/` URLs with all 18 current story guides in edited English form, English theme routes, self-canonical metadata, and zh-CN/en/x-default hreflang alternates.
- Biggest content goal before AdSense review: expand toward 25-35 substantial articles, ideally 1200-1800 Chinese characters each, with visible source and editorial-mode metadata.
- Temporary preview deployment uses GitHub Pages from the `docs/` folder on `main`. A custom domain can replace it later before serious AdSense review.

## Second Site Prototype

- Slug: `seasonal-observatory`
- Name: `节气观察室`
- Topic: Chinese solar terms, public-domain seasonal poetry, urban phenology, home observation, seasonal light, humidity, and daily rituals.
- Preview path: `https://zhengtai123.github.io/midnight-archive/seasonal-observatory/`
- English path: `https://zhengtai123.github.io/midnight-archive/seasonal-observatory/en/`
- Current content shape: 6 original long-form Chinese observation guides, 24 Chinese solar-term detail pages, 6 edited English observation guides, 4 bilingual topic routes, 24-term interactive wheel, 10 public-domain poem cards, a browser-based poem-card generator, bilingual static policy pages, source library, RSS feeds, multilingual sitemap alternates, visible language switching, and generated bitmap hero asset.
- Build command: `node tools/build-seasonal.mjs`
- Quality command: `node tools/check-seasonal.mjs`
- Biggest content goal before AdSense review: expand the 24 solar-term detail pages into fuller long-form articles, add 8-12 evergreen topic articles, and move to its own repo/domain if it becomes an independent AdSense candidate.

## Reusable Site Pattern

- Content data lives in `content/`.
- Shared static assets live in `public/assets/`.
- Generated output lives in `dist/<site-slug>/`.
- Public preview output is copied into `docs/` for GitHub Pages.
- Build command: `node tools/build.mjs`
- Quality command: `node tools/check.mjs`
- GitHub Pages sync command: `node tools/sync-docs.mjs`
- Recommended full build order: `node tools/build.mjs`, `node tools/build-seasonal.mjs`, `node tools/sync-docs.mjs`, `node tools/check.mjs --strict-docs`, `node tools/check-seasonal.mjs`.
- Second-site build writes `dist/seasonal-observatory/` and `docs/seasonal-observatory/` directly; `tools/sync-docs.mjs` also preserves/copies the built Seasonal subsite after syncing the Midnight root.
- The quality check now validates required static pages, all story pages, all theme pages, source URLs, article thickness, and broken theme-to-story references.
- The quality checks also validate English required pages, English metadata, html lang/canonical/hreflang basics, visible language switches, sitemap multilingual alternates, and `docs/` sync status.
- Commit and push after each meaningful milestone.

## Candidate Next Sites

- Public-domain folktale atlas: regional legends with source notes and map-like navigation.
- Classical poetry night desk: public-domain poems with translation notes, imagery index, and author pages.
- Old craft and object archive: public-domain manuals, museum links, object histories, and image-led explainers.
- Historical mystery notes: public-domain cases, court records where available, and source-aware commentary.

## Product Direction

- Make each site feel premium and editorial, not like a thin content farm.
- Fancy UI is welcome when it helps reading: subtle motion, rich typography, image-led hero sections, progress indicators, thematic navigation.
- Avoid fake AI features. AI API features can be added later only when they create real value, such as reading-route generation, glossary assistance, source comparison, or editorial draft review.
